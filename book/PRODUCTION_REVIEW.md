# Publication Production Review

Review date: 2026-07-15

## Pass 1 - Immediate Correctness And Completeness

- Status: complete
- Recovered the prior 19-chapter source project and identified that its generated `dist/` files had been removed during cleanup rather than migrated into this repository.
- Expanded the historical 8,504-word manuscript into a 28,712-word learning book while preserving all 19 canonical chapter titles.
- Added a cumulative airline-ticket case, implementation patterns, reusable artifacts, exercises, expected outcomes, failure modes, two appendices, four diagrams, tables, code examples, and primary-source citations.
- Removed the abandoned partial rewrite from the canonical path while preserving it under `book/archive/`.
- Outcome: the customer package contains a full PDF and a chapter-split EPUB built from one canonical manuscript.

## Pass 2 - Architecture And Long-Term Viability

- Status: complete
- Added a reproducible source pipeline: front matter, four reviewed chapter modules, bibliography, assembler, HTML renderer, EPUB builder, PDF builder, and package checks.
- Added table rendering shared by PDF/HTML and EPUB.
- Added PDF metadata and 23 bookmarks; EPUB contains separate front matter, 19 chapters, two appendices, bibliography, navigation, landmarks, cover metadata, accessibility metadata, and diagram alternatives.
- Kept stable customer filenames in the source-controlled root `dist/` directory.
- Verified that every chapter begins on a fresh PDF page. Recto-only starts are intentionally not claimed because Chromium does not consistently honor `break-before: right`.
- Outcome: the book can be revised and regenerated without manually rearranging PDF pages.

## Pass 3 - Rule Compliance And Supervision Readiness

- Status: complete for the digital publication package
- Tier 2: manuscript and package checks passed; EPUB XML, navigation, metadata, assets, chapter count, PDF trim, text, page count, and outline were inspected programmatically.
- Tier 3: one command rebuilt PDF, EPUB, HTML, and sales preview from the canonical sources, followed by package validation.
- Tier 4: rendered PDF contact sheets and high-resolution spot pages were manually inspected across cover, front matter, chapter openings, code, tables, diagrams, appendices, and sources.
- Production facts: 184 PDF pages, 6x9-inch trim, 23 PDF bookmarks, 19 EPUB chapter files, four SVG diagrams, no draft-date residue, and visible body page numbers.
- Remaining commercial step: upload the PDF and EPUB as protected Dodo Payments entitlements and set `NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL`. This is intentionally separate from publication-file readiness.

## Evidence Commands

```bash
npm run book:build
npm run book:validate
pdfinfo dist/no-claim-without-evidence.pdf
pdffonts dist/no-claim-without-evidence.pdf
unzip -t dist/no-claim-without-evidence.epub
pdftoppm -png -r 110 dist/no-claim-without-evidence.pdf tmp/book-final-review/page
```
