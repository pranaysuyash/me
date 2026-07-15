#!/usr/bin/env python3
"""Verify the generated ebook package artifacts."""

from __future__ import annotations

import re
import subprocess
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path, PurePosixPath
from urllib.parse import urldefrag

import build_pdf
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
MANUSCRIPT = BOOK / "manuscript" / "no-claim-without-evidence.md"


def fail(message: str) -> None:
    print(f"FAIL: {message}")
    sys.exit(1)


def require_file(path: Path, min_bytes: int = 1) -> None:
    if not path.exists():
        fail(f"missing file: {path}")
    if path.stat().st_size < min_bytes:
        fail(f"file too small: {path} ({path.stat().st_size} bytes)")


def normalize_epub_target(base: PurePosixPath, target: str) -> str:
    parts: list[str] = []
    for part in (base / target).parts:
        if part == "..":
            if parts:
                parts.pop()
        elif part != ".":
            parts.append(part)
    return "/".join(parts)


def flatten_outline(items: list[object]):
    for item in items:
        if isinstance(item, list):
            yield from flatten_outline(item)
        else:
            yield item


def main() -> None:
    require_file(HTML, 1_000_000)
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

    local_html_assets = [
        source
        for source in re.findall(r'src="([^"]+)"', html_text)
        if not source.startswith(("data:", "http://", "https://"))
    ]
    if local_html_assets:
        fail(f"HTML proof is not self-contained; local assets remain: {local_html_assets}")
    if html_text.count('src="data:image/') < 5:
        fail("HTML proof does not contain all embedded cover and diagram images")
    if re.search(r">\[[A-Za-z0-9_-]+\]</a>", html_text):
        fail("HTML exposes manuscript citation identifiers instead of numbered notes")
    if not re.search(r'class="footnote-ref"><a[^>]+>1</a>', html_text):
        fail("HTML is missing numbered note references")

    with zipfile.ZipFile(EPUB) as z:
        names = z.namelist()
        name_set = set(names)
        required = [
            "mimetype",
            "META-INF/container.xml",
            "OEBPS/package.opf",
            "OEBPS/nav.xhtml",
            "OEBPS/styles/book.css",
            "OEBPS/text/cover.xhtml",
        ]
        missing = [item for item in required if item not in name_set]
        if missing:
            fail(f"EPUB missing required entries: {missing}")
        if names[0] != "mimetype":
            fail("EPUB mimetype entry must be first")
        if z.getinfo("mimetype").compress_type != zipfile.ZIP_STORED:
            fail("EPUB mimetype entry must be stored without compression")
        if z.read("mimetype") != b"application/epub+zip":
            fail("EPUB mimetype value is incorrect")
        if not any(name.endswith(COVER.name) for name in names):
            fail("EPUB missing cover image")
        if sum(name.endswith(".svg") for name in names) < 4:
            fail("EPUB missing diagram SVG assets")
        chapter_files = [name for name in names if re.search(r"/\d+-chapter-\d+-", name)]
        if len(chapter_files) != 19:
            fail(f"EPUB must contain 19 chapter XHTML files, found {len(chapter_files)}")
        nav = z.read("OEBPS/nav.xhtml").decode("utf-8")
        package = z.read("OEBPS/package.opf").decode("utf-8")
        for expected in ["Chapter 1:", "Chapter 19:", 'epub:type="landmarks"']:
            if expected not in nav:
                fail(f"EPUB navigation missing: {expected}")
        for expected in [
            "schema:accessibilitySummary",
            "cover-image",
            "67cbe0b4-283f-52b5-ac52-72d592f2a082",
        ]:
            if expected not in package:
                fail(f"EPUB package metadata missing: {expected}")

        xhtml_roots: dict[str, ET.Element] = {}
        for name in names:
            if name.endswith((".xhtml", ".opf", ".xml")):
                try:
                    root = ET.fromstring(z.read(name))
                except ET.ParseError as error:
                    fail(f"invalid EPUB XML in {name}: {error}")
                if not name.endswith(".xhtml"):
                    continue
                xhtml_roots[name] = root

        for name, root in xhtml_roots.items():
                base = PurePosixPath(name).parent
                for element in root.iter():
                    for attribute in ("href", "src"):
                        value = element.attrib.get(attribute)
                        if not value or value.startswith(("http://", "https://", "mailto:", "data:")):
                            continue
                        target, fragment = urldefrag(value)
                        resolved = name if not target else normalize_epub_target(base, target)
                        if resolved not in name_set:
                            fail(f"broken EPUB {attribute}: {name} -> {value} ({resolved})")
                        if fragment and resolved in xhtml_roots:
                            ids = {node.attrib["id"] for node in xhtml_roots[resolved].iter() if "id" in node.attrib}
                            if fragment not in ids:
                                fail(f"broken EPUB fragment: {name} -> {value}")

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

    expected_titles = build_pdf.chapter_titles()
    expected_pages = build_pdf.locate_heading_pages(reader, expected_titles)
    outline_items = [item for item in flatten_outline(reader.outline) if hasattr(item, "title")]
    actual_titles = [item.title for item in outline_items]
    if actual_titles != expected_titles:
        fail(
            "PDF outline titles do not exactly match manuscript order: "
            f"expected {len(expected_titles)}, got {len(actual_titles)}"
        )
    actual_pages = [reader.get_destination_page_number(item) for item in outline_items]
    for title, actual_page in zip(actual_titles, actual_pages, strict=True):
        expected_page = expected_pages[title]
        if actual_page != expected_page:
            fail(
                f"PDF bookmark points to wrong page for {title}: "
                f"expected {expected_page + 1}, got {actual_page + 1}"
            )
    if actual_pages != sorted(actual_pages) or len(actual_pages) != len(set(actual_pages)):
        fail(f"PDF bookmark destinations are not unique and ordered: {actual_pages}")

    metadata = reader.metadata or {}
    if metadata.get("/Title") != "No Claim Without Evidence":
        fail("PDF title metadata is incorrect")
    if metadata.get("/Author") != "Pranay Suyash":
        fail("PDF author metadata is incorrect")

    all_text = "\n".join((page.extract_text() or "") for page in reader.pages)
    if re.search(r"\bDraft\b", all_text, flags=re.IGNORECASE):
        fail("PDF contains draft residue")
    for chapter in range(1, 20):
        if f"Chapter {chapter}:" not in all_text:
            fail(f"PDF missing Chapter {chapter}")
    citation_ids = set(
        re.findall(
            r"^\[\^([A-Za-z0-9_-]+)\]:",
            MANUSCRIPT.read_text(encoding="utf-8"),
            flags=re.MULTILINE,
        )
    )
    leaked_citations = sorted(citation_id for citation_id in citation_ids if f"[{citation_id}]" in all_text)
    if leaked_citations:
        fail(f"PDF exposes manuscript citation identifiers: {', '.join(leaked_citations)}")
    forbidden_glyphs = {"\ufb01": "fi ligature", "\ufb02": "fl ligature", "\ufffe": "invalid separator"}
    present = [label for glyph, label in forbidden_glyphs.items() if glyph in all_text]
    if present:
        fail(f"PDF text extraction contains copy-hostile glyphs: {', '.join(present)}")
    for phrase in ["evidence-producing", "customer-facing", "do-not-infer"]:
        if phrase not in all_text:
            fail(f"PDF text extraction lost required hyphenation: {phrase}")

    print("OK: package verification passed")
    print(f"html: {HTML.stat().st_size} bytes")
    print(f"epub: {EPUB.stat().st_size} bytes")
    print(f"pdf: {PDF.stat().st_size} bytes")
    print(f"sales_page: {SALES_PAGE.stat().st_size} bytes")
    print(f"diagrams: {len(diagrams)}")
    print(f"pdf_pages: {len(reader.pages)}")
    print(f"pdf_outline_entries: {len(outline_items)}")


if __name__ == "__main__":
    main()
