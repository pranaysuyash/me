#!/usr/bin/env python3
"""Verify the generated ebook package artifacts."""

from __future__ import annotations

import re
import subprocess
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

from pypdf import PdfReader


BOOK = Path(__file__).resolve().parents[1]
ROOT = Path(__file__).resolve().parents[2]
DIST = ROOT / "dist"
HTML = DIST / "no-claim-without-evidence.html"
EPUB = DIST / "no-claim-without-evidence.epub"
PDF = DIST / "no-claim-without-evidence.pdf"
SALES_PAGE = DIST / "sales-page.html"
COVER = ROOT / "public" / "books" / "no-claim-without-evidence" / "cover.png"
DIAGRAM_DIR = BOOK / "assets" / "diagrams"


def fail(message: str) -> None:
    print(f"FAIL: {message}")
    sys.exit(1)


def require_file(path: Path, min_bytes: int = 1) -> None:
    if not path.exists():
        fail(f"missing file: {path}")
    if path.stat().st_size < min_bytes:
        fail(f"file too small: {path} ({path.stat().st_size} bytes)")


def main() -> None:
    require_file(HTML, 10_000)
    require_file(EPUB, 100_000)
    require_file(PDF, 100_000)
    require_file(SALES_PAGE, 5_000)
    require_file(COVER, 100_000)

    diagrams = sorted(DIAGRAM_DIR.glob("*.svg"))
    if len(diagrams) < 4:
        fail(f"expected at least 4 SVG diagrams, found {len(diagrams)}")

    html_text = HTML.read_text(encoding="utf-8")
    sales_text = SALES_PAGE.read_text(encoding="utf-8")
    for expected in [
        "Evidence trail diagram",
        "Three-layer AI system diagram",
        "Evaluation loop diagram",
        "Release gate diagram",
        "Chapter 19: Your Eval Should Become A Release Gate",
        "<table>",
    ]:
        if expected not in html_text:
            fail(f"HTML missing expected content: {expected}")
    for expected in ["Get the ebook", "Clean JSON is not trust", "₹799 India / $14.99 global"]:
        if expected not in sales_text:
            fail(f"sales page missing expected content: {expected}")

    with zipfile.ZipFile(EPUB) as z:
        names = z.namelist()
        required = [
            "mimetype",
            "META-INF/container.xml",
            "OEBPS/package.opf",
            "OEBPS/nav.xhtml",
            "OEBPS/styles/book.css",
            "OEBPS/text/cover.xhtml",
        ]
        missing = [item for item in required if item not in names]
        if missing:
            fail(f"EPUB missing required entries: {missing}")
        if names[0] != "mimetype":
            fail("EPUB mimetype entry must be first")
        if not any(name.endswith(COVER.name) for name in names):
            fail("EPUB missing cover image")
        if sum(name.endswith(".svg") for name in names) < 4:
            fail("EPUB missing diagram SVG assets")
        chapter_files = [name for name in names if re.search(r"/\d+-chapter-\d+-", name)]
        if len(chapter_files) != 19:
            fail(f"EPUB must contain 19 chapter XHTML files, found {len(chapter_files)}")
        nav = z.read("OEBPS/nav.xhtml").decode("utf-8")
        package = z.read("OEBPS/package.opf").decode("utf-8")
        for expected in ["Chapter 1:", "Chapter 19:", "epub:type=\"landmarks\""]:
            if expected not in nav:
                fail(f"EPUB navigation missing: {expected}")
        for expected in ["schema:accessibilitySummary", "cover-image", "67cbe0b4-283f-52b5-ac52-72d592f2a082"]:
            if expected not in package:
                fail(f"EPUB package metadata missing: {expected}")
        for name in names:
            if name.endswith((".xhtml", ".opf", ".xml")):
                try:
                    ET.fromstring(z.read(name))
                except ET.ParseError as error:
                    fail(f"invalid EPUB XML in {name}: {error}")

    file_output = subprocess.check_output(["file", str(PDF)], text=True)
    if "PDF document" not in file_output:
        fail("PDF file command did not identify a PDF")

    reader = PdfReader(PDF)
    if len(reader.pages) < 120:
        fail(f"PDF page count unexpectedly low: {len(reader.pages)}")
    width = float(reader.pages[0].mediabox.width)
    height = float(reader.pages[0].mediabox.height)
    if (round(width), round(height)) != (432, 648):
        fail(f"PDF trim size is not 6x9 inches: {width}x{height} points")
    if len(reader.outline) < 22:
        fail(f"PDF navigation outline unexpectedly short: {len(reader.outline)} entries")
    all_text = "\n".join((page.extract_text() or "") for page in reader.pages)
    if re.search(r"\bDraft\b", all_text, flags=re.IGNORECASE):
        fail("PDF contains draft residue")
    for chapter in range(1, 20):
        if f"Chapter {chapter}:" not in all_text:
            fail(f"PDF missing Chapter {chapter}")

    print("OK: package verification passed")
    print(f"html: {HTML.stat().st_size} bytes")
    print(f"epub: {EPUB.stat().st_size} bytes")
    print(f"pdf: {PDF.stat().st_size} bytes")
    print(f"sales_page: {SALES_PAGE.stat().st_size} bytes")
    print(f"diagrams: {len(diagrams)}")
    print(f"pdf_pages: {len(reader.pages)}")
    print(f"pdf_outline_entries: {len(reader.outline)}")


if __name__ == "__main__":
    main()
