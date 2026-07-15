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


def locate_heading_pages(reader: PdfReader, titles: list[str]) -> dict[str, int]:
    """Locate chapter openings in one PDF text pass, excluding front matter."""
    remaining = {normalize_heading(title): title for title in titles}
    found: dict[str, int] = {}

    for page_index in range(FRONT_MATTER_PAGE_COUNT, len(reader.pages)):
        text = reader.pages[page_index].extract_text() or ""
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        if lines and re.fullmatch(r"\d+", lines[0]):
            lines = lines[1:]
        heading_window = normalize_heading(" ".join(lines[:5]))

        for target, title in list(remaining.items()):
            if heading_window.startswith(target):
                found[title] = page_index
                del remaining[target]
                break

        if not remaining:
            break

    if remaining:
        missing = ", ".join(remaining.values())
        raise ValueError(f"could not locate PDF chapter openings: {missing}")
    return found


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

    titles = chapter_titles()
    page_by_title = locate_heading_pages(reader, titles)
    destinations = [page_by_title[title] for title in titles]
    if destinations != sorted(destinations) or len(destinations) != len(set(destinations)):
        raise ValueError(f"bookmark destinations are not unique and ordered: {destinations}")

    for title in titles:
        writer.add_outline_item(title, page_by_title[title])

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
