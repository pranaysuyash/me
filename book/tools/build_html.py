#!/usr/bin/env python3
"""Build a print-friendly HTML preview from the Markdown manuscript."""

from __future__ import annotations

import html
import os
import re
from pathlib import Path


BOOK = Path(__file__).resolve().parents[1]
ROOT = Path(__file__).resolve().parents[2]
MANUSCRIPT = BOOK / "manuscript" / "no-claim-without-evidence.md"
COVER = ROOT / "public" / "books" / "no-claim-without-evidence" / "cover.png"
OUT = ROOT / "dist" / "no-claim-without-evidence.html"


def inline_markdown(text: str) -> str:
    escaped = html.escape(text)
    escaped = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(r"\*(.+?)\*", r"<em>\1</em>", escaped)
    escaped = re.sub(r"`([^`]+)`", r"<code>\1</code>", escaped)
    escaped = re.sub(
        r"(?<![\"'=])(https://[^\s<]+?)(?=[.,;:]?(?:\s|$))",
        r'<a href="\1">\1</a>',
        escaped,
    )
    escaped = re.sub(
        r"\[\^([A-Za-z0-9_-]+)\]",
        r'<a class="footnote-ref" href="#fn-\1">[\1]</a>',
        escaped,
    )
    return escaped


def render_markdown(markdown: str) -> str:
    lines = markdown.splitlines()
    blocks: list[str] = []
    paragraph: list[str] = []
    in_code = False
    code_lines: list[str] = []
    list_kind: str | None = None

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            blocks.append(f"<p>{inline_markdown(' '.join(paragraph))}</p>")
            paragraph = []

    def close_list() -> None:
        nonlocal list_kind
        if list_kind:
            blocks.append(f"</{list_kind}>")
            list_kind = None

    index = 0
    while index < len(lines):
        line = lines[index]
        if line.startswith("```"):
            flush_paragraph()
            close_list()
            if in_code:
                blocks.append("<pre><code>" + html.escape("\n".join(code_lines)) + "</code></pre>")
                code_lines = []
                in_code = False
            else:
                in_code = True
            index += 1
            continue

        if in_code:
            code_lines.append(line)
            index += 1
            continue

        if not line.strip():
            flush_paragraph()
            close_list()
            index += 1
            continue

        if line.startswith("---"):
            flush_paragraph()
            close_list()
            blocks.append("<hr/>")
            index += 1
            continue

        if (
            line.startswith("|")
            and index + 1 < len(lines)
            and re.match(r"^\|(?:\s*:?-+:?\s*\|)+$", lines[index + 1])
        ):
            flush_paragraph()
            close_list()

            def cells(row: str) -> list[str]:
                return [cell.strip() for cell in row.strip().strip("|").split("|")]

            headers = cells(line)
            rows: list[list[str]] = []
            index += 2
            while index < len(lines) and lines[index].startswith("|"):
                rows.append(cells(lines[index]))
                index += 1
            head = "".join(f"<th>{inline_markdown(cell)}</th>" for cell in headers)
            body_rows = "".join(
                "<tr>" + "".join(f"<td>{inline_markdown(cell)}</td>" for cell in row) + "</tr>"
                for row in rows
            )
            blocks.append(f'<div class="table-wrap"><table><thead><tr>{head}</tr></thead><tbody>{body_rows}</tbody></table></div>')
            continue

        image = re.match(r"^!\[([^\]]*)\]\(([^)]+)\)$", line)
        if image:
            flush_paragraph()
            close_list()
            alt = image.group(1)
            target = image.group(2)
            if re.match(r"^https?://", target):
                src = target
            else:
                image_path = (MANUSCRIPT.parent / target).resolve()
                src = os.path.relpath(image_path, OUT.parent)
            blocks.append(
                f'<figure><img src="{html.escape(src)}" alt="{html.escape(alt)}"/>'
                f"<figcaption>{inline_markdown(alt)}</figcaption></figure>"
            )
            index += 1
            continue

        footnote = re.match(r"^\[\^([A-Za-z0-9_-]+)\]:\s*(.*)$", line)
        if footnote:
            flush_paragraph()
            close_list()
            blocks.append(
                f'<p class="footnote" id="fn-{footnote.group(1)}">'
                f"<sup>{html.escape(footnote.group(1))}</sup> {inline_markdown(footnote.group(2))}</p>"
            )
            index += 1
            continue

        heading = re.match(r"^(#{1,6})\s+(.*)$", line)
        if heading:
            flush_paragraph()
            close_list()
            level = len(heading.group(1))
            text = inline_markdown(heading.group(2))
            blocks.append(f"<h{level}>{text}</h{level}>")
            index += 1
            continue

        quote = re.match(r"^>\s+(.*)$", line)
        if quote:
            flush_paragraph()
            close_list()
            blocks.append(f"<blockquote><p>{inline_markdown(quote.group(1))}</p></blockquote>")
            index += 1
            continue

        bullet = re.match(r"^-\s+(.*)$", line)
        if bullet:
            flush_paragraph()
            if list_kind != "ul":
                close_list()
                blocks.append("<ul>")
                list_kind = "ul"
            blocks.append(f"<li>{inline_markdown(bullet.group(1))}</li>")
            index += 1
            continue

        numbered = re.match(r"^\d+\.\s+(.*)$", line)
        if numbered:
            flush_paragraph()
            if list_kind != "ol":
                close_list()
                blocks.append("<ol>")
                list_kind = "ol"
            blocks.append(f"<li>{inline_markdown(numbered.group(1))}</li>")
            index += 1
            continue

        close_list()
        paragraph.append(line.strip())
        index += 1

    flush_paragraph()
    close_list()
    rendered = "\n".join(blocks)
    rendered = re.sub(
        r"(<p>(?:(?!</p>).){0,420}:</p>\n<pre><code>.*?</code></pre>)",
        r'<div class="keep-with-next">\1</div>',
        rendered,
        flags=re.DOTALL,
    )
    rendered = re.sub(
        r"(<p>(?:(?!</p>).){0,220}:</p>\n<blockquote>.*?</blockquote>)",
        r'<div class="keep-with-next">\1</div>',
        rendered,
        flags=re.DOTALL,
    )
    return rendered


def structure_book(body: str) -> str:
    """Wrap title/front matter/chapter sections for reliable PDF pagination."""
    parts = body.split("<hr/>")
    if len(parts) < 4:
        return body

    title = parts[0].strip()
    copyright_page = parts[1].strip()
    toc = parts[2].strip()
    rest = "<hr/>".join(parts[3:]).strip()

    chapter_pattern = re.compile(
        r"(?=<h2>(?:Introduction:|Chapter \d+:|Appendix [A-Z]:|Notes And Sources))"
    )
    chapter_chunks = [chunk.strip() for chunk in chapter_pattern.split(rest) if chunk.strip()]

    def wrap_chapter(chunk: str, index: int) -> str:
        opener = re.match(
            r"(?P<open><h2>.*?</h2>\s*(?:<p>.*?</p>\s*){1,2})",
            chunk,
            flags=re.DOTALL,
        )
        if opener:
            chunk = f'<div class="chapter-opening">{opener.group("open")}</div>' + chunk[opener.end():]
        kind = "introduction" if index == 0 else "chapter"
        return f'<section class="chapter {kind} chapter-{index}">\n{chunk}\n</section>'

    chapters = "\n".join(wrap_chapter(chunk, index) for index, chunk in enumerate(chapter_chunks))

    return "\n".join(
        [
            f'<section class="title-page">\n{title}\n</section>',
            f'<section class="copyright-page">\n{copyright_page}\n</section>',
            f'<section class="toc-page">\n{toc}\n</section>',
            chapters,
        ]
    )


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    body = structure_book(render_markdown(MANUSCRIPT.read_text(encoding="utf-8")))
    cover_rel = os.path.relpath(COVER, OUT.parent)
    html_doc = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>No Claim Without Evidence</title>
  <style>
    :root {{
      --ink: #101820;
      --muted: #5f6872;
      --paper: #fffdf8;
      --rule: #d9d2c3;
      --cyan: #169ec7;
      --amber: #b27a17;
    }}
    @page {{
      size: 6in 9in;
      margin: 0.70in 0.65in 0.75in 0.80in;
      @bottom-center {{
        content: counter(page);
        color: #6f7880;
        font-family: -apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", Arial, sans-serif;
        font-size: 9pt;
      }}
    }}
    @page cover {{
      margin: 0;
      @bottom-center {{ content: ""; }}
    }}
    @page front {{
      @bottom-center {{ content: ""; }}
    }}
    @page :blank {{
      @bottom-center {{ content: ""; }}
    }}
    body {{
      margin: 0;
      background: #ebe6dc;
      color: var(--ink);
      font-family: "New York", "Iowan Old Style", Charter, Georgia, serif;
      line-height: 1.42;
    }}
    main {{
      max-width: 760px;
      margin: 0 auto;
      background: var(--paper);
      padding: 48px 64px 80px;
      box-shadow: 0 24px 80px rgba(16, 24, 32, 0.18);
    }}
    .cover {{
      display: block;
      width: min(420px, 80%);
      margin: 0 auto 48px;
      border-radius: 4px;
      box-shadow: 0 18px 50px rgba(0, 0, 0, 0.24);
    }}
    .cover-page {{
      page: cover;
      break-after: page;
      height: 9in;
      width: 6in;
      margin: 0;
      padding: 0;
      background: #071017;
    }}
    .cover-page img {{
      display: block;
      width: 6in;
      height: 9in;
      object-fit: cover;
      margin: 0;
      border-radius: 0;
      box-shadow: none;
    }}
    .title-page, .copyright-page, .toc-page {{
      page: front;
      break-after: page;
    }}
    .toc-page li {{
      font-family: "SF Pro Text", "Avenir Next", "Helvetica Neue", sans-serif;
      font-size: 8.5pt;
      line-height: 1.15;
      margin-bottom: 0.14em;
    }}
    .title-page {{
      min-height: 7.5in;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }}
    .title-page h1 {{
      font-size: 42px;
      margin-bottom: 20px;
    }}
    .title-page h2 {{
      break-before: auto;
      font-size: 22px;
      margin: 0 0 32px;
      color: #34424c;
    }}
    .title-page p {{
      font-family: "SF Pro Display", "Avenir Next", "Helvetica Neue", sans-serif;
      font-size: 14px;
      color: #5f6872;
    }}
    .chapter {{
      break-before: right;
    }}
    .chapter-opening {{
      break-inside: avoid;
      min-height: 2.15in;
    }}
    .chapter > h2:first-child {{
      margin-top: 0;
      padding-top: 0.18in;
    }}
    h1, h2, h3 {{
      font-family: "SF Pro Display", "Avenir Next", "Helvetica Neue", sans-serif;
      line-height: 1.1;
      letter-spacing: 0;
    }}
    h1 {{
      font-size: 46px;
      margin: 0 0 12px;
    }}
    h2 {{
      font-size: 26pt;
      line-height: 1.12;
      margin: 36px 0 18px;
      break-after: avoid;
    }}
    h3 {{
      font-size: 13pt;
      line-height: 1.25;
      margin: 25px 0 9px;
      break-after: avoid;
    }}
    p, li {{
      font-size: 10.75pt;
      orphans: 3;
      widows: 3;
    }}
    p {{
      margin: 0 0 0.68em;
    }}
    li {{
      margin-bottom: 0.28em;
    }}
    p:has(+ pre) {{
      break-after: avoid;
    }}
    p:has(+ blockquote) {{
      break-after: avoid;
    }}
    hr {{
      border: 0;
      border-top: 1px solid var(--rule);
      margin: 36px 0;
    }}
    pre {{
      overflow-x: auto;
      background: #0c131a;
      color: #edf7fb;
      padding: 12px;
      border-radius: 6px;
      font-size: 8.4pt;
      line-height: 1.36;
      break-inside: avoid;
      break-before: avoid;
      white-space: pre-wrap;
    }}
    .keep-with-next {{
      break-inside: avoid;
    }}
    code {{
      font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
    }}
    p code, li code {{
      background: #f0ece3;
      color: #4b3b16;
      padding: 1px 4px;
      border-radius: 4px;
    }}
    blockquote {{
      border: 1px solid #a8c7cf;
      background: #edf6f7;
      margin: 14px 0 18px;
      padding: 12px 14px;
      color: var(--muted);
      break-inside: avoid;
    }}
    .table-wrap {{
      margin: 16px 0 20px;
      break-inside: avoid;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      font-family: "SF Pro Text", "Avenir Next", "Helvetica Neue", sans-serif;
      font-size: 8.5pt;
      line-height: 1.32;
    }}
    th, td {{
      border: 1px solid #c7d2d5;
      padding: 6px 7px;
      text-align: left;
      vertical-align: top;
    }}
    th {{
      background: #dcecef;
      color: #17343d;
      font-weight: 700;
    }}
    tbody tr:nth-child(even) {{ background: #f4f7f5; }}
    .footnote, .footnote a {{
      color: var(--muted);
      font-size: 14px;
    }}
    figure {{
      margin: 38px 0;
      padding: 0;
      break-inside: avoid;
    }}
    figure img {{
      max-width: 100%;
      height: auto;
      display: block;
      border-radius: 6px;
      border: 1px solid var(--rule);
    }}
    figcaption {{
      color: var(--muted);
      font-family: "SF Pro Display", "Avenir Next", "Helvetica Neue", sans-serif;
      font-size: 13px;
      margin-top: 8px;
      text-align: center;
    }}
    @media print {{
      body {{ background: white; }}
      main {{ box-shadow: none; max-width: none; padding: 0; background: white; }}
      .cover {{ box-shadow: none; }}
      a {{ color: inherit; text-decoration: none; }}
    }}
  </style>
</head>
<body>
  <main>
    <section class="cover-page">
      <img src="{html.escape(str(cover_rel))}" alt="No Claim Without Evidence cover">
    </section>
    {body}
  </main>
</body>
</html>
"""
    OUT.write_text(html_doc, encoding="utf-8")
    print(OUT)


if __name__ == "__main__":
    main()
