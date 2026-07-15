# Publishing Checklist

Book: **No Claim Without Evidence: How to Build AI Systems You Can Verify**

## Ready Assets

- [x] Canonical manuscript: `book/manuscript/no-claim-without-evidence.md`
- [x] Customer PDF: `dist/no-claim-without-evidence.pdf`
- [x] Customer EPUB: `dist/no-claim-without-evidence.epub`
- [x] HTML proof: `dist/no-claim-without-evidence.html`
- [x] Static sales-page proof: `dist/sales-page.html`
- [x] Checkout cover: `public/books/no-claim-without-evidence/cover.png`
- [x] Four deterministic teaching diagrams: `book/assets/diagrams/*.svg`
- [x] Reproducible build and validation commands

## Verified

- [x] Exactly 19 chapters and two appendices.
- [x] 28,696 tokenized manuscript words.
- [x] Citation references resolve to bibliography definitions.
- [x] Full-page cover and no visible running furniture on the cover.
- [x] Contents fits on one page.
- [x] Every chapter begins on a fresh page with a complete learning opening.
- [x] PDF has visible body page numbers and no draft-date residue.
- [x] Code blocks, comparison tables, and diagrams were inspected in rendered pages.
- [x] PDF is 181 pages at 6x9-inch trim with embedded fonts and 23 bookmarks.
- [x] EPUB is reflowable, chapter-split, XML-valid, navigable, and includes accessibility metadata.
- [x] Customer citations render as numbered notes rather than manuscript identifiers.
- [x] PDF text selection preserves key hyphenated terms without ligature artifacts.
- [x] HTML proof is standalone with embedded cover and diagram assets.
- [x] Historical source and customer files are protected by checksums, package hashes, tracked-file checks, and CI.

## Dodo Payments Listing

- Product name: `No Claim Without Evidence - PDF + EPUB`
- Brand: `Pranay Suyash`
- Tax category: the Dodo category for ebooks/digital publications
- Pricing type: one time
- India price: `₹799`, tax inclusive through localized checkout
- Global price: `$14.99`, localized by Dodo where supported
- Files entitlement: both `dist/no-claim-without-evidence.pdf` and `dist/no-claim-without-evidence.epub`
- Product image: `public/books/no-claim-without-evidence/checkout-image.jpg`
- Description: `A practical 19-chapter field guide to evidence-linked AI outputs, eval contracts, routing, human review, observability, agent action tests, and release gates. Includes the 181-page PDF and reflowable EPUB.`

## Commercial Activation Still Required

- [ ] Create or finish the Dodo product in the authenticated dashboard.
- [ ] Upload both customer files as protected entitlements.
- [ ] Confirm tax classification and tax-inclusive localized pricing in Dodo.
- [ ] Copy the live payment link into `NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL`.
- [ ] Run one real or test-mode checkout and verify both file entitlements are delivered.
- [ ] Rebuild and deploy the site after the checkout URL is configured.
