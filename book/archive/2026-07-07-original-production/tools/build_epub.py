#!/usr/bin/env python3
"""Build a simple EPUB 3 package from the manuscript and local assets."""

from __future__ import annotations

import html
import mimetypes
import os
import re
import shutil
import tempfile
import uuid
import zipfile
from pathlib import Path

import build_html


ROOT = Path(__file__).resolve().parents[1]
MANUSCRIPT = ROOT / "manuscript" / "no-claim-without-evidence.md"
COVER = ROOT / "assets" / "cover" / "no-claim-without-evidence-cover-candidate-1.png"
OUT = ROOT / "dist" / "no-claim-without-evidence.epub"


def media_type(path: Path) -> str:
    if path.suffix.lower() == ".svg":
        return "image/svg+xml"
    guessed, _ = mimetypes.guess_type(path.name)
    return guessed or "application/octet-stream"


def collect_image_paths(rendered: str) -> tuple[str, list[Path]]:
    image_paths: list[Path] = []

    def replace(match: re.Match[str]) -> str:
        src = html.unescape(match.group(1))
        if re.match(r"^https?://", src):
            return match.group(0)
        # build_html renders paths relative to dist; resolve from dist.
        source = (ROOT / "dist" / src).resolve()
        image_paths.append(source)
        return f'src="images/{html.escape(source.name)}"'

    updated = re.sub(r'src="([^"]+)"', replace, rendered)
    return updated, image_paths


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    markdown = MANUSCRIPT.read_text(encoding="utf-8")
    body = build_html.render_markdown(markdown)
    body, image_paths = collect_image_paths(body)
    image_paths.append(COVER)

    chapter_title = "No Claim Without Evidence"
    identifier = f"urn:uuid:{uuid.uuid5(uuid.NAMESPACE_URL, 'no-claim-without-evidence-pranay-suyash')}"

    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)
        meta_inf = tmp_path / "META-INF"
        oebps = tmp_path / "OEBPS"
        images = oebps / "images"
        meta_inf.mkdir()
        images.mkdir(parents=True)

        (tmp_path / "mimetype").write_text("application/epub+zip", encoding="utf-8")
        (meta_inf / "container.xml").write_text(
            """<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/package.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>
""",
            encoding="utf-8",
        )

        copied: dict[str, Path] = {}
        for source in image_paths:
            if source.exists() and source.name not in copied:
                dest = images / source.name
                shutil.copy2(source, dest)
                copied[source.name] = dest

        cover_name = COVER.name
        content = f"""<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <title>{html.escape(chapter_title)}</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <section class="cover-page">
    <img class="cover" src="images/{html.escape(cover_name)}" alt="No Claim Without Evidence cover"/>
  </section>
  {body}
</body>
</html>
"""
        (oebps / "content.xhtml").write_text(content, encoding="utf-8")

        (oebps / "style.css").write_text(
            """
body { font-family: Georgia, serif; line-height: 1.55; color: #101820; }
h1, h2, h3 { font-family: sans-serif; line-height: 1.15; }
pre { background: #101820; color: #f7f2e8; padding: 1em; white-space: pre-wrap; }
code { font-family: monospace; }
figure { margin: 1.6em 0; }
figure img, .cover { max-width: 100%; height: auto; }
figcaption { font-size: 0.85em; color: #5f6872; text-align: center; }
.cover-page { text-align: center; page-break-after: always; }
.footnote { font-size: 0.85em; color: #5f6872; }
""",
            encoding="utf-8",
        )

        (oebps / "nav.xhtml").write_text(
            """<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en">
<head><title>Table of Contents</title></head>
<body>
<nav epub:type="toc" id="toc">
  <h1>Table of Contents</h1>
  <ol><li><a href="content.xhtml">No Claim Without Evidence</a></li></ol>
</nav>
</body>
</html>
""",
            encoding="utf-8",
        )

        image_items = "\n".join(
            f'    <item id="img-{i}" href="images/{html.escape(name)}" media-type="{media_type(path)}"/>'
            for i, (name, path) in enumerate(sorted(copied.items()), start=1)
            if name != cover_name
        )
        (oebps / "package.opf").write_text(
            f"""<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="bookid">{identifier}</dc:identifier>
    <dc:title>No Claim Without Evidence</dc:title>
    <dc:creator>Pranay Suyash</dc:creator>
    <dc:language>en</dc:language>
    <meta property="dcterms:modified">2026-07-07T00:00:00Z</meta>
    <meta name="cover" content="cover-image"/>
  </metadata>
  <manifest>
    <item id="content" href="content.xhtml" media-type="application/xhtml+xml"/>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="css" href="style.css" media-type="text/css"/>
    <item id="cover-image" href="images/{html.escape(cover_name)}" media-type="{media_type(COVER)}" properties="cover-image"/>
{image_items}
  </manifest>
  <spine>
    <itemref idref="content"/>
  </spine>
</package>
""",
            encoding="utf-8",
        )

        if OUT.exists():
            OUT.unlink()
        with zipfile.ZipFile(OUT, "w") as epub:
            epub.write(tmp_path / "mimetype", "mimetype", compress_type=zipfile.ZIP_STORED)
            for path in sorted(tmp_path.rglob("*")):
                if path.is_file() and path.name != "mimetype":
                    epub.write(path, path.relative_to(tmp_path), compress_type=zipfile.ZIP_DEFLATED)

    print(OUT)


if __name__ == "__main__":
    main()
