#!/usr/bin/env python3
"""Verify basic manuscript readiness for the ebook package."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANUSCRIPT = ROOT / "manuscript" / "no-claim-without-evidence.md"


def fail(message: str) -> None:
    print(f"FAIL: {message}")
    sys.exit(1)


def main() -> None:
    if not MANUSCRIPT.exists():
        fail(f"missing manuscript: {MANUSCRIPT}")

    text = MANUSCRIPT.read_text(encoding="utf-8")

    if not text.startswith("# No Claim Without Evidence"):
        fail("manuscript must start with '# No Claim Without Evidence'")

    placeholders = re.findall(r"\b(?:TODO|TK|TBD)\b", text)
    if placeholders:
        fail(f"unresolved placeholders found: {len(placeholders)}")

    chapter_count = len(re.findall(r"^## Chapter \d+:", text, flags=re.MULTILINE))
    if chapter_count < 12:
        fail(f"expected at least 12 chapters, found {chapter_count}")

    refs = set(re.findall(r"\[\^([A-Za-z0-9_-]+)\]", text))
    definitions = set(re.findall(r"^\[\^([A-Za-z0-9_-]+)\]:", text, flags=re.MULTILINE))
    missing = sorted(refs - definitions)
    if missing:
        fail(f"missing citation definitions: {', '.join(missing)}")
    unused = sorted(definitions - refs)
    if unused:
        fail(f"unused citation definitions: {', '.join(unused)}")

    words = re.findall(r"[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)?", text)
    if len(words) < 7000:
        fail(f"manuscript is too short for this package: {len(words)} words")

    print("OK: manuscript verification passed")
    print(f"chapters: {chapter_count}")
    print(f"citations: {len(definitions)}")
    print(f"words: {len(words)}")


if __name__ == "__main__":
    main()
