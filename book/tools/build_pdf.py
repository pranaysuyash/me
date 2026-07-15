#!/usr/bin/env python3
"""Build a PDF from the HTML preview using installed Google Chrome."""

from __future__ import annotations

import subprocess
import re
from pathlib import Path

import build_html
from pypdf import PdfReader, PdfWriter


ROOT = Path(__file__).resolve().parents[2]
HTML = ROOT / "dist" / "no-claim-without-evidence.html"
OUT = ROOT / "dist" / "no-claim-without-evidence.pdf"
CHROME = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")


def add_metadata_and_bookmarks() -> None:
    reader = PdfReader(OUT)
    writer = PdfWriter(clone_from=reader)
    writer.add_metadata(
        {
            "/Title": "No Claim Without Evidence",
            "/Author": "Pranay Suyash",
            "/Subject": "How to Build AI Systems You Can Verify",
            "/Keywords": "AI engineering, LLM evaluation, evidence, observability, release gates",
        }
    )

    manuscript = build_html.MANUSCRIPT.read_text(encoding="utf-8")
    titles = re.findall(
        r"^## ((?:Introduction:|Chapter \d+:|Appendix [AB]:|Notes And Sources).*)$",
        manuscript,
        flags=re.MULTILINE,
    )
    page_text = [(page.extract_text() or "")[:500] for page in reader.pages]
    for title in titles:
        key = re.match(r"(?:Introduction:|Chapter \d+:|Appendix [AB]:|Notes And Sources)", title)
        if not key:
            continue
        for page_index, text in enumerate(page_text):
            if key.group(0) in text:
                writer.add_outline_item(title, page_index)
                break

    temporary = OUT.with_suffix(".bookmarked.pdf")
    with temporary.open("wb") as handle:
        writer.write(handle)
    temporary.replace(OUT)


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
    add_metadata_and_bookmarks()
    print(OUT)


if __name__ == "__main__":
    main()
