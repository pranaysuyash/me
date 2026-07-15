#!/usr/bin/env python3
"""Master generated narration into tagged chapter MP3s and a chaptered M4B."""

from __future__ import annotations

import hashlib
import json
import subprocess
import tempfile
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
AUDIO = ROOT / "book/audio"
MANIFEST = AUDIO / "generated/narration-manifest.json"
RAW = AUDIO / "generated/raw"
MASTERED = AUDIO / "generated/mastered"
DIST = ROOT / "dist/audio"
COVER = ROOT / "public/books/no-claim-without-evidence/cover.png"
TITLE = "No Claim Without Evidence: The Audio Edition"
AUTHOR = "Pranay Suyash"


def run(command: list[str]) -> str:
    result = subprocess.run(command, check=True, capture_output=True, text=True)
    return result.stdout + result.stderr


def duration(path: Path) -> float:
    output = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "json", str(path)],
        text=True,
    )
    return float(json.loads(output)["format"]["duration"])


def loudness_measurement(path: Path) -> dict[str, str]:
    output = run(
        [
            "ffmpeg", "-hide_banner", "-nostats", "-i", str(path),
            "-af", "loudnorm=I=-18:LRA=7:TP=-3:print_format=json", "-f", "null", "-",
        ]
    )
    start = output.rfind("{")
    end = output.rfind("}")
    if start < 0 or end < start:
        raise SystemExit(f"could not parse loudness measurement for {path}")
    return json.loads(output[start : end + 1])


def master_track(source: Path, destination: Path, title: str, number: int, total: int) -> None:
    measured = loudness_measurement(source)
    loudnorm = (
        "loudnorm=I=-18:LRA=7:TP=-3:linear=true:"
        f"measured_I={measured['input_i']}:measured_LRA={measured['input_lra']}:"
        f"measured_TP={measured['input_tp']}:measured_thresh={measured['input_thresh']}:"
        f"offset={measured['target_offset']}:print_format=summary"
    )
    destination.parent.mkdir(parents=True, exist_ok=True)
    run(
        [
            "ffmpeg", "-y", "-hide_banner", "-i", str(source), "-i", str(COVER),
            "-map", "0:a:0", "-map", "1:v:0", "-af", loudnorm,
            "-c:a", "libmp3lame", "-b:a", "192k", "-ar", "44100", "-ac", "1",
            "-c:v", "mjpeg", "-disposition:v", "attached_pic",
            "-metadata", f"title={title}", "-metadata", f"album={TITLE}",
            "-metadata", f"artist={AUTHOR}", "-metadata", f"album_artist={AUTHOR}",
            "-metadata", f"track={number}/{total}", "-metadata", "genre=Audiobook",
            "-id3v2_version", "3", str(destination),
        ]
    )


def ffmetadata(tracks: list[dict[str, object]], paths: list[Path]) -> str:
    lines = [";FFMETADATA1", f"title={TITLE}", f"artist={AUTHOR}", "genre=Audiobook"]
    start_ms = 0
    for track, path in zip(tracks, paths, strict=True):
        end_ms = start_ms + round(duration(path) * 1000)
        chapter_title = str(track["title"]).replace("=", r"\=").replace(";", r"\;")
        lines.extend(
            [
                "[CHAPTER]", "TIMEBASE=1/1000", f"START={start_ms}", f"END={end_ms}",
                f"title={chapter_title}",
            ]
        )
        start_ms = end_ms
    return "\n".join(lines) + "\n"


def build_m4b(tracks: list[dict[str, object]], paths: list[Path]) -> Path:
    output = DIST / "no-claim-without-evidence-audio-edition.m4b"
    with tempfile.TemporaryDirectory() as temporary:
        temp = Path(temporary)
        concat = temp / "concat.txt"
        concat.write_text("".join(f"file '{path.as_posix()}'\n" for path in paths), encoding="utf-8")
        metadata = temp / "chapters.ffmetadata"
        metadata.write_text(ffmetadata(tracks, paths), encoding="utf-8")
        run(
            [
                "ffmpeg", "-y", "-hide_banner", "-f", "concat", "-safe", "0", "-i", str(concat),
                "-i", str(metadata), "-i", str(COVER), "-map", "0:a:0", "-map", "2:v:0",
                "-map_metadata", "1", "-map_chapters", "1", "-c:a", "aac", "-b:a", "128k",
                "-ar", "44100", "-ac", "1", "-c:v", "mjpeg", "-disposition:v", "attached_pic",
                "-metadata", f"title={TITLE}", "-metadata", f"artist={AUTHOR}",
                "-metadata", "genre=Audiobook", "-movflags", "+faststart", str(output),
            ]
        )
    return output


def package_mp3s(paths: list[Path]) -> Path:
    output = DIST / "no-claim-without-evidence-chapter-mp3s.zip"
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for path in paths:
            archive.write(path, Path("No Claim Without Evidence") / path.name)
        archive.write(AUDIO / "README.md", Path("No Claim Without Evidence") / "README.md")
    return output


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> None:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    tracks = list(data["tracks"])
    if len(tracks) != 21:
        raise SystemExit(f"expected 21 tracks, found {len(tracks)}")
    if not COVER.is_file():
        raise SystemExit(f"cover is missing: {COVER}")
    MASTERED.mkdir(parents=True, exist_ok=True)
    DIST.mkdir(parents=True, exist_ok=True)
    mastered: list[Path] = []
    for index, track in enumerate(tracks, start=1):
        stem = Path(str(track["file"])).stem
        source = RAW / f"{stem}.mp3"
        if not source.is_file():
            raise SystemExit(f"raw narration is missing: {source}")
        destination = MASTERED / f"{index:02d}-{stem}.mp3"
        master_track(source, destination, str(track["title"]), index, len(tracks))
        mastered.append(destination)
        print(f"mastered: {destination.name}")
    m4b = build_m4b(tracks, mastered)
    mp3_zip = package_mp3s(mastered)
    release = {
        "title": TITLE,
        "author": AUTHOR,
        "track_count": len(mastered),
        "duration_seconds": round(sum(duration(path) for path in mastered), 3),
        "mastering": {"integrated_lufs": -18, "true_peak_dbtp": -3, "channels": 1, "sample_rate_hz": 44100},
        "outputs": [
            {"file": str(m4b.relative_to(ROOT)), "bytes": m4b.stat().st_size, "sha256": sha256(m4b)},
            {"file": str(mp3_zip.relative_to(ROOT)), "bytes": mp3_zip.stat().st_size, "sha256": sha256(mp3_zip)},
        ],
    }
    (DIST / "release-manifest.json").write_text(json.dumps(release, indent=2) + "\n", encoding="utf-8")
    print(f"release duration: {release['duration_seconds'] / 60:.1f} minutes")
    print(f"created: {m4b}")
    print(f"created: {mp3_zip}")


if __name__ == "__main__":
    main()
