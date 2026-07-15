#!/usr/bin/env python3
"""Build a PDF from the HTML preview using installed Google Chrome."""

from __future__ import annotations

import subprocess
from pathlib import Path

import build_html


ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "dist" / "no-claim-without-evidence.html"
OUT = ROOT / "dist" / "no-claim-without-evidence.pdf"
CHROME = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")


def main() -> None:
    build_html.main()
    if not CHROME.exists():
        raise SystemExit(f"Google Chrome not found at {CHROME}")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        str(CHROME),
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={OUT}",
        HTML.resolve().as_uri(),
    ]
    subprocess.run(cmd, check=True)
    print(OUT)


if __name__ == "__main__":
    main()
