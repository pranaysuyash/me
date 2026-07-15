#!/usr/bin/env python3
"""Plan and generate the ElevenLabs audio edition without duplicate charges."""

from __future__ import annotations

import argparse
import fcntl
import hashlib
import json
import math
import os
import re
import tempfile
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
AUDIO = ROOT / "book/audio"
CONFIG_PATH = AUDIO / "production-config.json"
NARRATION_MANIFEST = AUDIO / "generated/narration-manifest.json"
RAW = AUDIO / "generated/raw"
AUDITIONS = AUDIO / "generated/auditions"
LOCK_PATH = Path(tempfile.gettempdir()) / "no-claim-without-evidence-elevenlabs.lock"


def load_env(path: Path) -> None:
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line or line.lstrip().startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def api_json(url: str, api_key: str) -> dict[str, object]:
    request = urllib.request.Request(url, headers={"xi-api-key": api_key})
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def subscription(api_key: str) -> dict[str, object]:
    return api_json("https://api.elevenlabs.io/v1/user/subscription", api_key)


def available_credits(api_key: str) -> tuple[int, str]:
    live = subscription(api_key)
    remaining = int(live["character_limit"]) - int(live["character_count"])
    reset_unix = int(live.get("next_character_count_reset_unix") or 0)
    reset_at = datetime.fromtimestamp(reset_unix).astimezone().isoformat() if reset_unix else "unknown"
    return remaining, reset_at


def atomic_write(path: Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(dir=path.parent, delete=False) as handle:
        handle.write(data)
        temporary = Path(handle.name)
    temporary.replace(path)


def request_speech(
    *, api_key: str, voice_id: str, text: str, model_id: str, output_format: str, settings: dict[str, object]
) -> tuple[bytes, dict[str, str]]:
    query = urllib.parse.urlencode({"output_format": output_format})
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{urllib.parse.quote(voice_id)}?{query}"
    body = json.dumps(
        {
            "text": text,
            "model_id": model_id,
            "voice_settings": settings,
            "apply_text_normalization": "on",
        }
    ).encode()
    request = urllib.request.Request(
        url,
        data=body,
        method="POST",
        headers={"xi-api-key": api_key, "Content-Type": "application/json", "Accept": "audio/mpeg"},
    )
    try:
        with urllib.request.urlopen(request, timeout=180) as response:
            headers = {key.lower(): value for key, value in response.headers.items()}
            return response.read(), headers
    except urllib.error.HTTPError as error:
        detail = error.read().decode(errors="replace")[:2_000]
        raise SystemExit(f"ElevenLabs request failed ({error.code}): {detail}") from error


def generation_record(path: Path) -> dict[str, object] | None:
    if not path.is_file():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


def write_generation(
    *, directory: Path, stem: str, text: str, voice: dict[str, str], model: str, config: dict[str, object], api_key: str
) -> dict[str, object]:
    audio_path = directory / f"{stem}.mp3"
    record_path = directory / f"{stem}.json"
    script_hash = hashlib.sha256(text.encode()).hexdigest()
    previous = generation_record(record_path)
    if previous and previous.get("script_sha256") == script_hash and previous.get("status") == "complete" and audio_path.is_file():
        print(f"skip complete: {stem}")
        return previous
    if previous and previous.get("status") == "started":
        raise SystemExit(f"ambiguous prior request for {stem}; inspect {record_path} before retrying")

    started = {
        "status": "started",
        "script_sha256": script_hash,
        "characters": len(text),
        "voice_id": voice["voice_id"],
        "voice_name": voice["name"],
        "model_id": model,
        "output_format": config["output_format"],
    }
    record_path.parent.mkdir(parents=True, exist_ok=True)
    record_path.write_text(json.dumps(started, indent=2) + "\n", encoding="utf-8")
    audio, headers = request_speech(
        api_key=api_key,
        voice_id=voice["voice_id"],
        text=text,
        model_id=model,
        output_format=str(config["output_format"]),
        settings=dict(config["voice_settings"]),
    )
    if len(audio) < 10_000:
        raise SystemExit(f"provider returned unexpectedly small audio for {stem}: {len(audio)} bytes")
    atomic_write(audio_path, audio)
    complete = {
        **started,
        "status": "complete",
        "bytes": len(audio),
        "request_id": headers.get("request-id"),
        "character_cost": headers.get("character-cost"),
        "content_type": headers.get("content-type"),
        "audio_sha256": hashlib.sha256(audio).hexdigest(),
    }
    record_path.write_text(json.dumps(complete, indent=2) + "\n", encoding="utf-8")
    print(f"generated: {stem} ({len(text)} characters, {len(audio)} bytes)")
    return complete


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("plan", "audition", "generate"))
    args = parser.parse_args()
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    load_env(Path(str(config["environment_file"])))
    api_key = os.environ.get("ELEVENLABS_API_KEY", "").strip()
    if not api_key:
        raise SystemExit("ELEVENLABS_API_KEY is missing")
    remaining, reset_at = available_credits(api_key)

    lock = LOCK_PATH.open("w")
    if args.command != "plan":
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError as error:
            raise SystemExit(f"another local audiobook generation process holds {LOCK_PATH}") from error

    if args.command == "audition":
        text = (AUDIO / "audition-script.txt").read_text(encoding="utf-8").strip()
        total_cost = len(text) * len(config["audition_voices"])
        if remaining - total_cost < int(config["minimum_credit_reserve"]):
            raise SystemExit("auditions would breach the configured credit reserve")
        voices = list(config["audition_voices"])
        for index, voice in enumerate(voices):
            remaining_now, reset_now = available_credits(api_key)
            remaining_cost = len(text) * (len(voices) - index)
            if remaining_now - remaining_cost < int(config["minimum_credit_reserve"]):
                raise SystemExit(f"live balance changed during auditions; retry after {reset_now}")
            stem = re.sub(r"[^a-z0-9]+", "-", str(voice["name"]).lower()).strip("-")
            write_generation(
                directory=AUDITIONS,
                stem=stem,
                text=text,
                voice=voice,
                model="eleven_multilingual_v2",
                config=config,
                api_key=api_key,
            )
        return

    narration = json.loads(NARRATION_MANIFEST.read_text(encoding="utf-8"))
    pending: list[dict[str, object]] = []
    for track in narration["tracks"]:
        stem = Path(str(track["file"])).stem
        record = generation_record(RAW / f"{stem}.json")
        if not (record and record.get("status") == "complete" and record.get("script_sha256") == track["sha256"]):
            pending.append(track)
    pending_characters = sum(int(track["characters"]) for track in pending)
    estimated_cost = math.ceil(pending_characters * float(config["credit_multiplier"]))
    print(f"live remaining credits: {remaining}")
    print(f"pending tracks: {len(pending)}")
    print(f"pending characters: {pending_characters}")
    print(f"estimated credits: {estimated_cost}")
    print(f"post-generation reserve: {remaining - estimated_cost}")
    print(f"next credit reset: {reset_at}")
    if args.command == "plan":
        return
    selected = config.get("selected_voice")
    if not selected:
        raise SystemExit("selected_voice is not locked in production-config.json")
    if remaining - estimated_cost < int(config["minimum_credit_reserve"]):
        raise SystemExit(f"generation would breach the configured credit reserve; retry after {reset_at}")
    for index, track in enumerate(pending):
        remaining_now, reset_now = available_credits(api_key)
        remaining_characters = sum(int(item["characters"]) for item in pending[index:])
        remaining_cost = math.ceil(remaining_characters * float(config["credit_multiplier"]))
        if remaining_now - remaining_cost < int(config["minimum_credit_reserve"]):
            raise SystemExit(
                "live balance changed during generation; stopping before the next paid request "
                f"with {remaining_now} credits remaining. Retry after {reset_now}"
            )
        text = (ROOT / str(track["file"])).read_text(encoding="utf-8").strip()
        write_generation(
            directory=RAW,
            stem=Path(str(track["file"])).stem,
            text=text,
            voice=selected,
            model=str(config["model_id"]),
            config=config,
            api_key=api_key,
        )


if __name__ == "__main__":
    main()
