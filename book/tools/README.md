# Tools

## `check_manuscript.py`

Purpose: lightweight manuscript verification for the ebook package.

Usage:

```bash
python3 tools/check_manuscript.py
```

Checks:

- manuscript file exists
- no unresolved TODO/TK placeholders
- expected top-level title exists
- chapter count is substantial enough for the intended short ebook
- citation references in the manuscript have definitions
- basic word count is reported

This is not a replacement for editorial review, citation review, or PDF/EPUB proofing. It is a fast guardrail before packaging or publishing.

It also rejects code lines over 120 characters because they are likely to overflow the 6x9 print layout.

## `build_html.py`

Purpose: build a print-friendly HTML preview from the Markdown manuscript using Python stdlib only.

Usage:

```bash
python3 tools/build_html.py
```

Output:

```text
dist/no-claim-without-evidence.html
```

Open the HTML file in a browser to proof the reading flow or print to PDF. For a production EPUB/PDF, use a dedicated book toolchain such as Pandoc, Vellum, Atticus, Reedsy, or a designed InDesign/Figma workflow.

## `build_epub.py`

Purpose: build a simple EPUB 3 package from the manuscript and local assets using Python stdlib only.

Usage:

```bash
python3 tools/build_epub.py
```

Output:

```text
dist/no-claim-without-evidence.epub
```

## `build_pdf.py`

Purpose: build a PDF from the HTML preview using installed Google Chrome's headless print mode.

Usage:

```bash
python3 tools/build_pdf.py
```

Output:

```text
dist/no-claim-without-evidence.pdf
```

## `check_package.py`

Purpose: verify that the generated HTML, EPUB, PDF, cover, and diagram assets exist and contain expected package structure/content.

The checks include standalone HTML assets, numbered citations, EPUB link and fragment integrity, PDF bookmarks, copy-safe text extraction, trim size, and customer-facing package metadata.

Usage:

```bash
python3 tools/check_package.py
```

## Cleanup protection

`cleanup-protection.json` is the machine-readable boundary between protected publication assets and reproducible caches. `check_cleanup_protection.py` verifies that the book source, historical archive, cover assets, and customer deliverables are present, tracked, not ignored, and checksum-valid.

Preview the allowlisted cleanup command:

```bash
npm run clean:safe
```

Apply that exact plan explicitly with `npm run clean:safe:apply`. It may remove only `.next/` and `out/`. Both the validator and deletion tool reject any cleanup path that overlaps protected content. They cannot remove `dist/`, `book/archive/`, manuscripts, drafts, tools, diagrams, covers, or publication records. Generic commands such as `rm -rf dist` are outside the project cleanup contract.

`write_package_manifest.py` records SHA-256 hashes for publication inputs and customer outputs at the end of `npm run book:build`. Validation fails when source or deliverable hashes drift, so CI cannot approve a stale package.

## `build_sales_page.py`

Purpose: build a static sales-page preview for the ebook.

Usage:

```bash
python3 tools/build_sales_page.py
```

Output:

```text
dist/sales-page.html
```
