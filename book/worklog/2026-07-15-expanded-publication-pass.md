# Expanded Publication Pass - 2026-07-15

## Decision

The sale edition is a 19-chapter learning book, not a collection of lightly edited social posts. The historical chapter sequence remains the spine, while each chapter now teaches a specific capability and advances one cumulative airline-ticket workflow.

## Recovery

The earlier source project was found at `/Users/pranay/Projects/evidence-based-ai-engineering-ebook`. Its 19-chapter manuscript and production utilities existed, but its generated `dist/` directory had been removed during cleanup and had never been migrated into this website repository. Valuable source and design assets were recovered into the canonical `book/` tree; the old partial rewrite was preserved under `book/archive/`.

## Implementation

- Expanded the manuscript to 28,696 tokenized words.
- Preserved all 19 historical chapter titles.
- Added four source modules, explicit front matter, and one canonical bibliography.
- Added a deterministic manuscript assembler.
- Added Markdown-table support shared by PDF, HTML, and EPUB.
- Built a chapter-split EPUB 3 package with navigation and accessibility metadata.
- Added PDF metadata and 23 navigation bookmarks.
- Kept the full-page cover, four diagrams, code blocks, exercises, and templates.
- Aligned commercial copy to ₹799 India and $14.99 global.

## Verification

`npm run book:build` rebuilt all formats from source. `npm run book:validate` passed manuscript and package checks. The PDF is 181 pages at 432x648 points, has embedded fonts, tagged text, body page numbers, and no draft residue. EPUB ZIP integrity and every XML document passed. High-resolution rendered spot pages and contact sheets were manually reviewed.

## Commercial Boundary

The publication files are ready. Payment activation remains an authenticated Dodo Payments operation: create the one-time digital-publication product, attach both files as protected entitlements, set the localized prices, copy the checkout URL into `NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL`, and verify one complete test purchase before production promotion.

## Preservation Addendum

The original July 7 production scripts were initially left only in the recovered
external project while their evolved replacements became canonical here. That was
too weak for durable history. The exact original toolchain is now preserved under
`book/archive/2026-07-07-original-production/` with provenance and SHA-256
checksums. Superseded source-worthy scripts must be archived rather than deleted;
only rebuildable caches remain disposable.

## Final QA And Cleanup Contract

The final pass converted internal citation keys to numbered notes, fixed the
Chapter 12 JSON overflow and page flow, removed copy-hostile PDF ligatures,
confirmed standalone HTML packaging, and removed the only verbatim repeated
teaching paragraph. A full rendered-page sweep covered front matter, chapter
openings, diagrams, tables, code, the corrected structured log, release gate,
appendices, and sources.

Publication preservation is now mechanical rather than advisory. The root
cleanup contract protects book source, active tools, historical archives,
covers, and customer files. Archive checksums and a source/output package hash
manifest are validated in CI. `npm run clean:safe` is a dry run;
`npm run clean:safe:apply` can delete only `.next/` and `out/`.
