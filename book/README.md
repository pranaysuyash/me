# No Claim Without Evidence - Publication Source

This directory is the canonical production source for the ebook. The website,
checkout listing, PDF, and EPUB should not make claims that are absent here.

## Build

```bash
npm run book:build
npm run book:validate
```

The build writes customer-ready files to:

- `dist/no-claim-without-evidence.pdf`
- `dist/no-claim-without-evidence.epub`

## Source Of Truth

- `manuscript/front-matter.md`: title, contents, copyright, and introduction
- `drafts/chapters-*.md`: reviewed chapter and appendix modules
- `manuscript/sources.md`: canonical citation definitions and further reading
- `manuscript/no-claim-without-evidence.md`: assembled sale manuscript
- `metadata.json`: title, author, version, and ISBN state
- `assets/`: generated diagrams and shared cover input
- `tools/build_html.py`, `tools/build_pdf.py`, and `tools/build_epub.py`: publication generation
- `tools/check_manuscript.py` and `tools/check_package.py`: structural and package checks
- `archive/`: immutable historical manuscripts and production toolchains with
  provenance and checksums; these are preserved but never run by the active build

The cover source is shared with the sales page at
`public/books/no-claim-without-evidence/cover.png`. This avoids maintaining two
editable covers.

## Publication Contract

- The cover occupies the full first page and has no running furniture.
- Title, copyright, and contents pages have no visible page numbers.
- Introduction and body pages have visible page numbers.
- Every chapter starts on a fresh PDF page.
- Headings stay with at least the following body paragraph.
- Code blocks and diagrams are kept intact when possible.
- PDF and EPUB are generated from the same manuscript.
- `dist/` is committed because it is the product customers receive.

## Editorial Notes

The recovered July 7 manuscript already contains the canonical 19-chapter
structure. The current production pass expands those chapters into a cumulative
learning path, removes social-post repetition, strengthens the running
airline-ticket case, and separates model, pipeline, and data/configuration
responsibilities.

Do not edit the assembled manuscript directly. Edit the relevant source module
and run `npm run book:build` so PDF and EPUB remain synchronized.

When a script or production approach is superseded, move a byte-for-byte snapshot
into `archive/<date>-<name>/` with provenance and checksums instead of deleting it.
