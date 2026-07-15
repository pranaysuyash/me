#!/usr/bin/env python3
"""Embed local image assets so the generated HTML proof is self-contained."""

from __future__ import annotations

import base64
import html
import mimetypes
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
HTML = ROOT / "dist" / "no-claim-without-evidence.html"


def as_data_uri(path: Path) -> str:
    mime_type, _ = mimetypes.guess_type(path.name)
    if path.suffix.lower() == ".svg":
        mime_type = "image/svg+xml"
    if not mime_type:
        raise ValueError(f"cannot determine media type for {path}")
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime_type};base64,{encoded}"


def main() -> None:
    source = HTML.read_text(encoding="utf-8")
    embedded = 0

    def replace(match: re.Match[str]) -> str:
        nonlocal embedded
        original = html.unescape(match.group(1))
        if original.startswith(("data:", "http://", "https://")):
            return match.group(0)
        asset = (HTML.parent / original).resolve()
        try:
            asset.relative_to(ROOT)
        except ValueError as error:
            raise ValueError(f"HTML asset escapes repository root: {original}") from error
        if not asset.is_file():
            raise FileNotFoundError(f"HTML asset not found: {asset}")
        embedded += 1
        return f'src="{as_data_uri(asset)}"'

    output = re.sub(r'src="([^"]+)"', replace, source)
    if embedded < 5:
        raise ValueError(f"expected to embed at least 5 local assets, embedded {embedded}")
    HTML.write_text(output, encoding="utf-8")
    print(f"{HTML} ({embedded} assets embedded)")


if __name__ == "__main__":
    main()
