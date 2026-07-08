# No Claim Without Evidence Dodo Checkout

Date: 2026-07-07

## Decision

Host the ebook sales page on `pranaysuyash.com` and use Dodo Payments as the checkout and digital-delivery layer.

## Context

The book package exists as PDF + EPUB in `/Users/pranay/Projects/evidence-based-ai-engineering-ebook`. The public site should own the positioning, SEO, and launch story, while the payment provider should handle checkout, tax/compliance, and file delivery.

Dodo Payments has a no-code checkout and digital product delivery surface, and positions itself as a Merchant of Record. That makes it a better launch fit than building a custom Stripe/download flow for this first ebook.

## Implementation

The checkout URL is controlled by:

```bash
NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL
```

When the variable is present at build time, the page CTA says `Buy with Dodo Payments` and links to that checkout URL.

When the variable is absent, the page CTA falls back to the contact form so the site remains usable before the live Dodo product link is created.

## Affected Files

- `src/lib/ebook.ts`
- `src/app/books/no-claim-without-evidence/page.tsx`
- `src/app/page.tsx`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `public/sitemap.xml`
- `public/books/no-claim-without-evidence/cover.png`
- `public/books/no-claim-without-evidence/checkout-image.jpg`
- `docs/marketing/no-claim-dodo-product-setup.md`
- `docs/marketing/no-claim-without-evidence-launch-posts.md`

## Validation Plan

- `npm run typecheck`
- `npm run build`
- Browser proof of `/books/no-claim-without-evidence` on desktop and mobile.
- Confirm all route assets return 200 or cache-valid 304.
- Set `NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL` in the deployment environment before launch checkout goes live.

## Product Setup Artifact

Paste-ready Dodo product fields live in:

`docs/marketing/no-claim-dodo-product-setup.md`

Use `public/books/no-claim-without-evidence/checkout-image.jpg` for the Dodo product image because it is square and below the 3MB upload limit.

The ebook page itself should not suggest a waitlist. It should show a purchase CTA when the Dodo checkout URL is configured and an enquiry CTA otherwise.
