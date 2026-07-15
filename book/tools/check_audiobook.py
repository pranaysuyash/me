#!/usr/bin/env python3
"""Validate narration scripts and any generated audiobook tracks."""

from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
AUDIO = ROOT / "book/audio"
MANIFEST = AUDIO / "generated/narration-manifest.json"
RAW = AUDIO / "generated/raw"
MASTERED = AUDIO / "generated/mastered"
RELEASE = ROOT / "dist/audio/release-manifest.json"


def fail(message: str) -> None:
    raise SystemExit(f"FAIL: {message}")


def main() -> None:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if data.get("track_count") != 21:
        fail(f"expected 21 narration tracks, found {data.get('track_count')}")
    if not 30_000 <= int(data["characters"]) <= 55_000:
        fail(f"narration character budget is out of range: {data['characters']}")
    forbidden = [r"https?://", r"\[\^", r"```", r"\{\s*\"", r"^\s*\|.+\|\s*$"]
    for track in data["tracks"]:
        path = ROOT / track["file"]
        text = path.read_text(encoding="utf-8")
        if len(text) != track["characters"]:
            fail(f"character count drift: {path}")
        for pattern in forbidden:
            if re.search(pattern, text, flags=re.MULTILINE):
                fail(f"narration contains non-spoken artifact {pattern}: {path}")

    complete_records = sorted(RAW.glob("*.json")) if RAW.exists() else []
    durations: list[float] = []
    for record_path in complete_records:
        record = json.loads(record_path.read_text(encoding="utf-8"))
        if record.get("status") != "complete":
            fail(f"incomplete generation record: {record_path}")
        audio_path = record_path.with_suffix(".mp3")
        if not audio_path.is_file() or audio_path.stat().st_size < 10_000:
            fail(f"missing generated audio: {audio_path}")
        probe = subprocess.check_output(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "json", str(audio_path)],
            text=True,
        )
        durations.append(float(json.loads(probe)["format"]["duration"]))
    print(f"OK: {data['track_count']} narration scripts, {data['characters']} characters")
    print(f"generated tracks: {len(complete_records)}")
    if durations:
        print(f"generated duration: {sum(durations) / 60:.1f} minutes")
    if complete_records and len(complete_records) != data["track_count"]:
        fail(f"partial provider generation: {len(complete_records)} of {data['track_count']} tracks")

    mastered = sorted(MASTERED.glob("*.mp3")) if MASTERED.exists() else []
    if mastered and len(mastered) != data["track_count"]:
        fail(f"partial mastered set: {len(mastered)} of {data['track_count']} tracks")
    if RELEASE.is_file():
        release = json.loads(RELEASE.read_text(encoding="utf-8"))
        if release.get("track_count") != data["track_count"]:
            fail("release manifest track count does not match narration manifest")
        for output in release.get("outputs", []):
            path = ROOT / output["file"]
            if not path.is_file() or path.stat().st_size != output["bytes"]:
                fail(f"release output missing or size drifted: {path}")
        print(f"release outputs: {len(release.get('outputs', []))}")


if __name__ == "__main__":
    main()
