#!/usr/bin/env python3
"""Verify the generated ebook package artifacts."""

from __future__ import annotations

import re
import subprocess
import sys
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
HTML = DIST / "no-claim-without-evidence.html"
EPUB = DIST / "no-claim-without-evidence.epub"
PDF = DIST / "no-claim-without-evidence.pdf"
SALES_PAGE = DIST / "sales-page.html"
COVER = ROOT / "assets" / "cover" / "no-claim-without-evidence-cover-candidate-1.png"
DIAGRAM_DIR = ROOT / "assets" / "diagrams"


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
        "Eval loop diagram",
        "Release gate diagram",
        "Chapter 19: Your Eval Should Become A Release Gate",
    ]:
        if expected not in html_text:
            fail(f"HTML missing expected content: {expected}")
    for expected in ["Get the ebook", "Clean JSON is not trust", "no-claim-without-evidence.pdf"]:
        if expected not in sales_text:
            fail(f"sales page missing expected content: {expected}")

    with zipfile.ZipFile(EPUB) as z:
        names = z.namelist()
        required = [
            "mimetype",
            "META-INF/container.xml",
            "OEBPS/package.opf",
            "OEBPS/content.xhtml",
            "OEBPS/nav.xhtml",
            "OEBPS/style.css",
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

    file_output = subprocess.check_output(["file", str(PDF)], text=True)
    if "PDF document" not in file_output:
        fail("PDF file command did not identify a PDF")

    mdls = subprocess.run(
        ["mdls", "-name", "kMDItemNumberOfPages", str(PDF)],
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    pages = re.search(r"=\s*(\d+)", mdls.stdout)
    if pages and int(pages.group(1)) < 40:
        fail(f"PDF page count unexpectedly low: {pages.group(1)}")

    print("OK: package verification passed")
    print(f"html: {HTML.stat().st_size} bytes")
    print(f"epub: {EPUB.stat().st_size} bytes")
    print(f"pdf: {PDF.stat().st_size} bytes")
    print(f"sales_page: {SALES_PAGE.stat().st_size} bytes")
    print(f"diagrams: {len(diagrams)}")
    if pages:
        print(f"pdf_pages: {pages.group(1)}")


if __name__ == "__main__":
    main()
