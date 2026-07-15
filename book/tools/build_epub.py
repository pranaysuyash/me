#!/usr/bin/env python3
"""Build a reflowable, chapter-split EPUB 3 package from the manuscript."""

from __future__ import annotations

import html
import json
import mimetypes
import re
import shutil
import tempfile
import zipfile
from pathlib import Path

import build_html


BOOK = Path(__file__).resolve().parents[1]
ROOT = Path(__file__).resolve().parents[2]
MANUSCRIPT = BOOK / "manuscript" / "no-claim-without-evidence.md"
METADATA = BOOK / "metadata.json"
COVER = ROOT / "public" / "books" / "no-claim-without-evidence" / "cover.png"
OUT = ROOT / "dist" / "no-claim-without-evidence.epub"


def media_type(path: Path) -> str:
    if path.suffix.lower() == ".svg":
        return "image/svg+xml"
    guessed, _ = mimetypes.guess_type(path.name)
    return guessed or "application/octet-stream"


def slug(text: str, fallback: str) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return value or fallback


def chapter_sections(markdown: str) -> list[tuple[str, str]]:
    pattern = re.compile(
        r"(?=^## (?:Introduction:|Chapter \d+:|Appendix [A-Z]:|Notes And Sources))",
        flags=re.MULTILINE,
    )
    chunks = [chunk.strip() for chunk in pattern.split(markdown) if chunk.strip()]
    sections: list[tuple[str, str]] = []
    front = chunks.pop(0)
    sections.append(("Front Matter", front))
    for chunk in chunks:
        heading = re.search(r"^##\s+(.+)$", chunk, flags=re.MULTILINE)
        sections.append((heading.group(1) if heading else "Section", chunk))
    return sections


def xhtml_document(title: str, body: str) -> str:
    return f'''<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en" lang="en">
<head><meta charset="utf-8"/><title>{html.escape(title)}</title><link rel="stylesheet" type="text/css" href="../styles/book.css"/></head>
<body>{body}</body></html>'''


def rewrite_images(rendered: str, images: dict[str, Path]) -> str:
    def replace(match: re.Match[str]) -> str:
        src = html.unescape(match.group(1))
        if re.match(r"^https?://", src):
            return match.group(0)
        source = (ROOT / "dist" / src).resolve()
        if source.exists():
            images[source.name] = source
            return f'src="../images/{html.escape(source.name)}"'
        return match.group(0)

    return re.sub(r'src="([^"]+)"', replace, rendered)


def main() -> None:
    metadata = json.loads(METADATA.read_text(encoding="utf-8"))
    markdown = MANUSCRIPT.read_text(encoding="utf-8")
    sections = chapter_sections(markdown)
    if sum(title.startswith("Chapter ") for title, _ in sections) != 19:
        raise SystemExit("EPUB build requires exactly 19 chapter sections")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        meta_inf = root / "META-INF"
        oebps = root / "OEBPS"
        text_dir = oebps / "text"
        style_dir = oebps / "styles"
        image_dir = oebps / "images"
        for directory in (meta_inf, text_dir, style_dir, image_dir):
            directory.mkdir(parents=True, exist_ok=True)

        (root / "mimetype").write_text("application/epub+zip", encoding="ascii")
        (meta_inf / "container.xml").write_text(
            '<?xml version="1.0" encoding="utf-8"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/package.opf" media-type="application/oebps-package+xml"/></rootfiles></container>',
            encoding="utf-8",
        )

        shutil.copy2(COVER, image_dir / "cover.png")
        cover_body = '<section epub:type="cover" class="cover"><img src="../images/cover.png" alt="Cover of No Claim Without Evidence by Pranay Suyash"/></section>'
        (text_dir / "cover.xhtml").write_text(xhtml_document(metadata["title"], cover_body), encoding="utf-8")

        css = """
        body { font-family: serif; font-size: 1rem; line-height: 1.55; color: #10242c; margin: 5%; }
        h1, h2, h3 { font-family: sans-serif; line-height: 1.2; break-after: avoid; }
        h1 { font-size: 2rem; } h2 { font-size: 1.55rem; margin-top: 1.8em; } h3 { font-size: 1.2rem; margin-top: 1.5em; }
        p { margin: 0 0 .8em; } li { margin-bottom: .35em; }
        pre { white-space: pre-wrap; overflow-wrap: anywhere; background: #102027; color: #e8f4f4; padding: 1em; }
        code { font-family: monospace; } blockquote { background: #e8f2f3; padding: .8em 1em; margin: 1.2em 0; }
        figure { margin: 1.5em 0; break-inside: avoid; } img { max-width: 100%; height: auto; } figcaption { text-align: center; color: #5d6b70; font-size: .85rem; }
        table { border-collapse: collapse; width: 100%; font-family: sans-serif; font-size: .85rem; }
        th, td { border: 1px solid #b8c8cc; padding: .45em; text-align: left; vertical-align: top; }
        th { background: #dcecef; } tr:nth-child(even) { background: #f4f7f5; }
        .cover { margin: 0; padding: 0; text-align: center; } .cover img { width: 100%; max-height: 100vh; object-fit: contain; }
        .footnote { font-size: .88rem; color: #5d6b70; }
        """
        (style_dir / "book.css").write_text(css, encoding="utf-8")

        images: dict[str, Path] = {}
        manifest: list[str] = [
            '<item id="cover" href="text/cover.xhtml" media-type="application/xhtml+xml"/>',
            '<item id="cover-image" href="images/cover.png" media-type="image/png" properties="cover-image"/>',
            '<item id="css" href="styles/book.css" media-type="text/css"/>',
            '<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>',
        ]
        spine = ['<itemref idref="cover" linear="yes"/>']
        nav_items: list[str] = []
        landmarks: list[str] = ['<li><a epub:type="cover" href="text/cover.xhtml">Cover</a></li>']

        for index, (title, source) in enumerate(sections):
            section_id = slug(title, f"section-{index:02d}")
            filename = f"{index:02d}-{section_id}.xhtml"
            rendered = build_html.render_markdown(source)
            rendered = rewrite_images(rendered, images)
            epub_type = "frontmatter" if index == 0 else "chapter"
            if title.startswith("Appendix"):
                epub_type = "appendix"
            elif title == "Notes And Sources":
                epub_type = "bibliography"
            body = f'<section epub:type="{epub_type}">{rendered}</section>'
            (text_dir / filename).write_text(xhtml_document(title, body), encoding="utf-8")
            item_id = f"section-{index:02d}"
            manifest.append(f'<item id="{item_id}" href="text/{filename}" media-type="application/xhtml+xml"/>')
            spine.append(f'<itemref idref="{item_id}"/>')
            nav_items.append(f'<li><a href="text/{filename}">{html.escape(title)}</a></li>')
            if index == 0:
                landmarks.append(f'<li><a epub:type="frontmatter" href="text/{filename}">Front matter</a></li>')
            elif title.startswith("Chapter 1:"):
                landmarks.append(f'<li><a epub:type="bodymatter" href="text/{filename}">Start of content</a></li>')
            elif title == "Notes And Sources":
                landmarks.append(f'<li><a epub:type="bibliography" href="text/{filename}">Notes and sources</a></li>')

        for index, (name, source) in enumerate(sorted(images.items())):
            shutil.copy2(source, image_dir / name)
            manifest.append(f'<item id="image-{index}" href="images/{html.escape(name)}" media-type="{media_type(source)}"/>')

        nav = f'''<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en"><head><title>Contents</title></head><body>
<nav epub:type="toc" id="toc"><h1>Contents</h1><ol>{''.join(nav_items)}</ol></nav>
<nav epub:type="landmarks" hidden="hidden"><h2>Landmarks</h2><ol>{''.join(landmarks)}</ol></nav>
</body></html>'''
        (oebps / "nav.xhtml").write_text(nav, encoding="utf-8")

        subjects = "".join(f"<dc:subject>{html.escape(value)}</dc:subject>" for value in metadata["subjects"])
        modified = f'{metadata["publication_date"]}T00:00:00Z'
        package = f'''<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid" xml:lang="en" prefix="schema: http://schema.org/">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
<dc:identifier id="bookid">{html.escape(metadata["identifier"])}</dc:identifier>
<dc:title id="title">{html.escape(metadata["title"])}</dc:title><meta refines="#title" property="title-type">main</meta>
<dc:title id="subtitle">{html.escape(metadata["subtitle"])}</dc:title><meta refines="#subtitle" property="title-type">subtitle</meta>
<dc:creator id="creator">{html.escape(metadata["author"])}</dc:creator><meta refines="#creator" property="role" scheme="marc:relators">aut</meta>
<dc:language>{metadata["language"]}</dc:language><dc:publisher>{html.escape(metadata["publisher"])}</dc:publisher>
<dc:date>{metadata["publication_date"]}</dc:date><dc:rights>{html.escape(metadata["rights"])}</dc:rights>
<dc:description>{html.escape(metadata["description"])}</dc:description>{subjects}
<meta property="dcterms:modified">{modified}</meta><meta property="schema:bookEdition">{html.escape(metadata["edition"])}</meta>
<meta property="schema:accessMode">textual</meta><meta property="schema:accessMode">visual</meta>
<meta property="schema:accessModeSufficient">textual</meta><meta property="schema:accessibilityFeature">structuralNavigation</meta>
<meta property="schema:accessibilityFeature">tableOfContents</meta><meta property="schema:accessibilityFeature">alternativeText</meta>
<meta property="schema:accessibilityHazard">none</meta><meta property="schema:accessibilitySummary">{html.escape(metadata["accessibility_summary"])}</meta>
</metadata><manifest>{''.join(manifest)}</manifest><spine>{''.join(spine)}</spine></package>'''
        (oebps / "package.opf").write_text(package, encoding="utf-8")

        if OUT.exists():
            OUT.unlink()
        with zipfile.ZipFile(OUT, "w") as archive:
            archive.write(root / "mimetype", "mimetype", compress_type=zipfile.ZIP_STORED)
            for path in sorted(root.rglob("*")):
                if path.is_file() and path.name != "mimetype":
                    archive.write(path, path.relative_to(root), compress_type=zipfile.ZIP_DEFLATED)
    print(OUT)


if __name__ == "__main__":
    main()
