#!/usr/bin/env python3
"""Record source and output hashes for the committed publication package."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "book/package-manifest.json"
OUTPUTS = [
    "book/manuscript/no-claim-without-evidence.md",
    "dist/no-claim-without-evidence.pdf",
    "dist/no-claim-without-evidence.epub",
    "dist/no-claim-without-evidence.html",
    "dist/sales-page.html",
]


def source_paths() -> list[Path]:
    paths = [
        ROOT / "book/metadata.json",
        ROOT / "book/manuscript/front-matter.md",
        ROOT / "book/manuscript/sources.md",
        ROOT / "public/books/no-claim-without-evidence/cover.png",
    ]
    for pattern in ("book/drafts/*.md", "book/assets/**/*", "book/tools/*.py"):
        paths.extend(path for path in ROOT.glob(pattern) if path.is_file())
    return sorted(set(paths))


def digest(path: Path) -> str:
    if not path.is_file():
        raise SystemExit(f"package manifest input is missing: {path.relative_to(ROOT)}")
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    payload = {
        "version": 1,
        "algorithm": "sha256",
        "sources": {str(path.relative_to(ROOT)): digest(path) for path in source_paths()},
        "outputs": {relative: digest(ROOT / relative) for relative in OUTPUTS},
    }
    OUT.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(OUT)


if __name__ == "__main__":
    main()
