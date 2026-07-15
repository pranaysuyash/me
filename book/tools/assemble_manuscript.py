#!/usr/bin/env python3
"""Assemble the canonical sale manuscript from reviewed source modules."""

from __future__ import annotations

import re
from pathlib import Path


BOOK = Path(__file__).resolve().parents[1]
PARTS = [
    BOOK / "manuscript" / "front-matter.md",
    BOOK / "drafts" / "chapters-01-05.md",
    BOOK / "drafts" / "chapters-06-10.md",
    BOOK / "drafts" / "chapters-11-15.md",
    BOOK / "drafts" / "chapters-16-19-appendices.md",
    BOOK / "manuscript" / "sources.md",
]
OUT = BOOK / "manuscript" / "no-claim-without-evidence.md"


def without_source_definitions(text: str) -> str:
    """Keep citation definitions in one canonical bibliography module."""
    return re.sub(
        r"^\[\^[A-Za-z0-9_-]+\]:.*(?:\n|$)",
        "",
        text,
        flags=re.MULTILINE,
    ).strip()


def main() -> None:
    missing = [str(path) for path in PARTS if not path.exists()]
    if missing:
        raise SystemExit(f"Missing manuscript modules: {', '.join(missing)}")

    sections = []
    for index, path in enumerate(PARTS):
        text = path.read_text(encoding="utf-8")
        sections.append(without_source_definitions(text) if 0 < index < len(PARTS) - 1 else text.strip())
    manuscript = "\n\n---\n\n".join(sections).rstrip() + "\n"
    OUT.write_text(manuscript, encoding="utf-8")
    print(OUT)


if __name__ == "__main__":
    main()
