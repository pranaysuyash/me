# Ebook And Site Hardening Merge - 2026-07-15

## Scope

Merged the concurrent `origin/main` portfolio hardening sequence through `c6985c7` with local commit `0b707af`, which publishes the expanded 19-chapter ebook and customer PDF/EPUB files. Both histories were preserved through a normal merge; no rebase, force push, branch deletion, stash operation, or history rewrite was used.

## Preserved Remote Work

The remote sequence adds legal policies, accessible form feedback, skip navigation, reduced-motion and focus support, generated sitemap and robots metadata, security headers, image handling, explicit ebook prelaunch states, checkout environment documentation, and repository guidance. The fake public admin route and superseded hand-maintained metadata files remain removed.

## Merge Fix

The generated `robots.ts` and `sitemap.ts` routes initially failed the repository's static-export contract. Both canonical metadata routes now declare `export const dynamic = "force-static"`; the old public XML and text files were not restored, avoiding duplicate sources of truth.

## Verification

- `npm run build`: passed; 43 static routes exported.
- `npm run typecheck`: passed after clearing stale `.next` route types.
- `npm run book:validate`: passed; 19 chapters, 28,712 tokenized words, 184 PDF pages, 23 PDF bookmarks, four diagrams, and valid chapter-split EPUB structure.
- One existing non-blocking Next warning remains in `src/app/work/sentineltwin/page.tsx` for a raw `<img>` element; this merge did not introduce it.

## Commercial Boundary

No payment activation was added. The site exposes a buy action only when `NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL` is configured. Dodo Payments product creation, tax classification, receipt behavior, and both file entitlements still require an authenticated end-to-end test before that environment variable is set in production.
