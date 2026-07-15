#!/usr/bin/env python3
"""Build a PDF from the HTML preview using installed Google Chrome."""

from __future__ import annotations

import re
import subprocess
from pathlib import Path

import build_html
from pypdf import PdfReader, PdfWriter


ROOT = Path(__file__).resolve().parents[2]
HTML = ROOT / "dist" / "no-claim-without-evidence.html"
OUT = ROOT / "dist" / "no-claim-without-evidence.pdf"
CHROME = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
FRONT_MATTER_PAGE_COUNT = 4


def chapter_titles() -> list[str]:
    manuscript = build_html.MANUSCRIPT.read_text(encoding="utf-8")
    return re.findall(
        r"^## ((?:Introduction:|Chapter \d+:|Appendix [AB]:|Notes And Sources).*)$",
        manuscript,
        flags=re.MULTILINE,
    )


def normalize_heading(text: str) -> str:
    replacements = {
        "\ufb00": "ff",
        "\ufb01": "fi",
        "\ufb02": "fl",
        "\ufb03": "ffi",
        "\ufb04": "ffl",
        "\u00ad": "",
    }
    for source, replacement in replacements.items():
        text = text.replace(source, replacement)
    return re.sub(r"\s+", " ", text).strip().casefold()


def find_heading_page(reader: PdfReader, title: str) -> int:
    """Find a chapter opening, excluding the front-matter table of contents."""
    target = normalize_heading(title)
    for page_index in range(FRONT_MATTER_PAGE_COUNT, len(reader.pages)):
        text = reader.pages[page_index].extract_text() or ""
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        if lines and re.fullmatch(r"\d+", lines[0]):
            lines = lines[1:]
        heading_window = normalize_heading(" ".join(lines[:5]))
        if heading_window.startswith(target):
            return page_index
    raise ValueError(f"could not locate PDF chapter opening: {title}")


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

    destinations: list[int] = []
    for title in chapter_titles():
        page_index = find_heading_page(reader, title)
        destinations.append(page_index)
        writer.add_outline_item(title, page_index)

    if destinations != sorted(destinations) or len(destinations) != len(set(destinations)):
        raise ValueError(f"bookmark destinations are not unique and ordered: {destinations}")

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
