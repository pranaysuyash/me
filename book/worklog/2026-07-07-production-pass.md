# 2026-07-07 Production Pass

## Scope

Create a sellable ebook package from Pranay's daily writing on evidence, LLM evals, extraction systems, review, and release gates.

## Source Inputs

- `/Users/pranay/.codex/attachments/87044f48-5569-408b-a13c-1abda6b654fb/pasted-text-1.txt`
- `/Users/pranay/.codex/attachments/87044f48-5569-408b-a13c-1abda6b654fb/pasted-text-2.txt`
- User goal in Codex thread.

## Decisions

### Title

Chosen title:

**No Claim Without Evidence**

Subtitle:

**How to Build AI Systems You Can Verify**

Rationale: the pasted source clarified that the larger arc starts before the explicit eval series. The stronger book is not only about LLM evals, but about evidence-backed AI engineering across prompts, pipelines, evals, review, and release gates.

### Structure

The ebook uses a 19-chapter short-book structure:

1. evidence habit
2. premature confidence
3. narrow questions
4. pipeline over model
5. deterministic gates
6. prompt evals
7. ground truth
8. extraction error taxonomy
9. scoring strategy
10. cost, latency, review effort
11. fallback, routing, stop conditions
12. eval logs
13. product memory
14. confidence, evidence, review
15. pipeline evals
16. observability
17. agent action evals
18. data/configuration discipline
19. release gates

### Case Study

Use airline-ticket extraction as the running example because it makes unsupported inference concrete:

- terminal absent from source
- fallback invents terminal
- correct behavior is `not_present_in_document` or review, not cleaner JSON

## Pass Notes

### Pass 1 - Immediate Correctness And Completeness

Checked the user goal, pasted source files, skill availability, and project-local instruction stack. Created the project package, main manuscript, design direction, marketing copy, cover candidate, and verification helper. The package now covers manuscript, launch, visual direction, and validation rather than only an outline.

### Pass 2 - Architecture And Long-Term Viability

Kept one canonical manuscript path and one verification tool. Avoided scattering assets outside the project by copying generated cover output into `assets/cover/`. Treated generated cover as a candidate, not final proof. Added durable notes so later work can continue with the same product thesis.

### Pass 3 - Rule Compliance And Supervision Readiness

Loaded global, project-level, repo-local, generated context, and local motto surfaces. Used relevant skills from `/Users/pranay/Projects/skills` and system `imagegen`. Remaining requirement before final sale: proof exported PDF/EPUB layout and citation links manually.

### PDF Proofing Pass - Layout And Professional Polish

Rendered the PDF to text and page images, then fixed the visible publishing issues found in the first proof:

- Removed the draft date from the front matter.
- Converted the PDF layout to a 6 x 9 inch book trim.
- Made the cover a full-page first page instead of a centered inline image.
- Added explicit front matter and chapter wrappers for reliable page breaks.
- Added body page numbers while keeping the cover/front matter clean.
- Added deterministic keep-with-next wrapping for prose lead-ins before code examples and block quotes.
- Fixed Markdown quote rendering so quoted rules are semantic block quotes in HTML/PDF/EPUB.
- Rebuilt PDF, EPUB, HTML, and sales page after the proofing changes.

Visual proof images are kept in `dist/proof-pages-final/` for review evidence.
The extracted PDF text proof is kept at `dist/proof-pages-final/pdf-text-proof.txt`.

## Evidence

- Manuscript file created: `manuscript/no-claim-without-evidence.md`
- Cover candidate copied: `assets/cover/no-claim-without-evidence-cover-candidate-1.png`
- Visual system created: `design/visual-system.md`
- Launch copy created: `marketing/sales-page-copy.md`
- Verification tool created: `tools/check_manuscript.py`
- HTML preview builder created: `tools/build_html.py`
- EPUB builder created: `tools/build_epub.py`
- PDF builder created: `tools/build_pdf.py`
- Sales page builder created: `tools/build_sales_page.py`
- Package verifier created: `tools/check_package.py`
- HTML preview generated: `dist/no-claim-without-evidence.html`
- EPUB generated: `dist/no-claim-without-evidence.epub`
- PDF generated: `dist/no-claim-without-evidence.pdf`
- Static sales page generated: `dist/sales-page.html`
- Sales page screenshot generated: `dist/sales-page.png`
- Deterministic SVG diagrams created in `assets/diagrams/`
- Final PDF proof pages rendered in `dist/proof-pages-final/`

## Verification Run

Commands run on 2026-07-07:

```bash
python3 tools/check_manuscript.py
python3 tools/build_html.py
python3 tools/build_epub.py
python3 tools/build_pdf.py
python3 tools/build_sales_page.py
python3 tools/check_package.py
file assets/cover/no-claim-without-evidence-cover-candidate-1.png
sips -g pixelWidth -g pixelHeight -g format assets/cover/no-claim-without-evidence-cover-candidate-1.png
rg -n "<ol>|<li>Introduction: The Evidence Habit|</ol>" dist/no-claim-without-evidence.html
pdftotext -layout dist/no-claim-without-evidence.pdf dist/no-claim-without-evidence.txt
pdftoppm -png -f 1 -l 16 -r 120 dist/no-claim-without-evidence.pdf dist/proof-pages-final/page
```

Observed outcomes:

- Manuscript verification passed.
- Manuscript stats after final proofing: 19 chapters, 7 citation definitions, 8,522 words.
- HTML preview generated at `dist/no-claim-without-evidence.html`.
- EPUB generated at `dist/no-claim-without-evidence.epub`.
- PDF generated at `dist/no-claim-without-evidence.pdf`.
- HTML table of contents renders as an ordered list after fixing `tools/build_html.py`.
- Cover image verified as PNG, 1024 x 1536, RGB.
- Package verification passed after proofing: HTML 74,506 bytes; EPUB 1,877,721 bytes; PDF 3,174,946 bytes; 4 diagrams; PDF 91 pages.
- `pdftotext` proofing found no remaining `Draft date` text in the PDF.
- Final proof page images confirmed full-page cover, body page numbers, and Chapter 1/example pagination.
- Static sales page verification passed and screenshot was manually inspected for first-viewport layout.

## Remaining Gaps

- Need decide sales platform link and final price.
- Need optional Gumroad/Medium/LinkedIn preview images exported at platform-specific sizes.
