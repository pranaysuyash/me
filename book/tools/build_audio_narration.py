#!/usr/bin/env python3
"""Build individual plain-text narration tracks from the audio adaptation."""

from __future__ import annotations

import hashlib
import html
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
AUDIO = ROOT / "book/audio"
SCRIPT_DIR = AUDIO / "scripts"
OUT = AUDIO / "generated/narration"
MANIFEST = AUDIO / "generated/narration-manifest.json"
SOURCE_FILES = [
    SCRIPT_DIR / "00-introduction.md",
    SCRIPT_DIR / "chapters-01-05.md",
    SCRIPT_DIR / "chapters-06-10.md",
    SCRIPT_DIR / "chapters-11-15.md",
    SCRIPT_DIR / "chapters-16-19.md",
    SCRIPT_DIR / "20-closing.md",
]


def slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def spoken_text(markdown: str) -> str:
    text = re.sub(r"```.*?```", "The exact implementation is available in the ebook companion.", markdown, flags=re.DOTALL)
    text = re.sub(r"!\[([^]]*)\]\([^)]+\)", r"In the ebook companion, see \1.", text)
    text = re.sub(r"\[\^[-A-Za-z0-9_]+\]", "", text)
    text = re.sub(r"\[([^]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*(?:[-*]|\d+\.)\s+", "", text, flags=re.MULTILINE)
    text = text.replace("[Ebook companion]", "In the ebook companion,")
    text = re.sub(r"[*_`]", "", text)
    text = html.unescape(text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip() + "\n"


def sections(path: Path) -> list[tuple[str, str]]:
    source = path.read_text(encoding="utf-8")
    matches = list(re.finditer(r"^##\s+(.+)$", source, flags=re.MULTILINE))
    result: list[tuple[str, str]] = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(source)
        result.append((match.group(1).strip(), source[match.start():end].strip()))
    return result


def main() -> None:
    missing = [str(path.relative_to(ROOT)) for path in SOURCE_FILES if not path.is_file()]
    if missing:
        raise SystemExit(f"missing audio scripts: {', '.join(missing)}")

    tracks: list[dict[str, object]] = []
    for path in SOURCE_FILES:
        for title, section in sections(path):
            tracks.append({"title": title, "source": str(path.relative_to(ROOT)), "text": spoken_text(section)})

    chapter_numbers = [int(match.group(1)) for track in tracks if (match := re.match(r"Chapter (\d+):", str(track["title"])))]
    if chapter_numbers != list(range(1, 20)):
        raise SystemExit(f"audio adaptation must contain Chapters 1-19 in order: {chapter_numbers}")
    if len(tracks) != 21:
        raise SystemExit(f"audio adaptation must contain 21 tracks, found {len(tracks)}")

    OUT.mkdir(parents=True, exist_ok=True)
    manifest_tracks: list[dict[str, object]] = []
    for index, track in enumerate(tracks):
        text = str(track.pop("text"))
        filename = f"{index:02d}-{slug(str(track['title']))}.txt"
        target = OUT / filename
        target.write_text(text, encoding="utf-8")
        manifest_tracks.append(
            {
                **track,
                "index": index,
                "file": str(target.relative_to(ROOT)),
                "characters": len(text),
                "words": len(re.findall(r"\b[\w'-]+\b", text)),
                "sha256": hashlib.sha256(text.encode()).hexdigest(),
            }
        )

    expected = {Path(str(track["file"])).name for track in manifest_tracks}
    for stale in OUT.glob("*.txt"):
        if stale.name not in expected:
            stale.unlink()

    payload = {
        "version": 1,
        "edition": "listening-first-v1",
        "track_count": len(manifest_tracks),
        "characters": sum(int(track["characters"]) for track in manifest_tracks),
        "words": sum(int(track["words"]) for track in manifest_tracks),
        "tracks": manifest_tracks,
    }
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"tracks: {payload['track_count']}")
    print(f"characters: {payload['characters']}")
    print(f"words: {payload['words']}")


if __name__ == "__main__":
    main()
