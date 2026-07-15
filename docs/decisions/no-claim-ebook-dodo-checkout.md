# No Claim Without Evidence Dodo Checkout

Date: 2026-07-07

Amended: 2026-07-15

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

When the variable is present at build time, the page CTA says `Buy now` and links to that checkout URL.

When the variable is absent, the page stays sample-first and communicates that checkout is coming soon. It does not render a nonfunctional purchase button. The main book page links to `/books/no-claim-without-evidence/sample` so readers can inspect the writing before purchase.

Current behavior:

- sample-first while checkout and delivery are not live
- buy-first after the checkout URL is present at build time
- consulting stays separate

## Pricing Configuration

- Base price: $14.99 USD
- Localized pricing mode: by country
- India override: ₹799 INR
- Tax-inclusive pricing: enabled
- Discount: none

The India amount is a fixed PPP price, not an exchange-rate conversion.

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
- Manually create the Dodo product in the dashboard, copy the checkout URL, and wire it into the deployment environment.

## Product Setup Artifact

Paste-ready Dodo product fields live in:

`docs/marketing/no-claim-dodo-product-setup.md`

Use `public/books/no-claim-without-evidence/checkout-image.jpg` for the Dodo product image because it is square and below the 3MB upload limit.

The ebook page should not suggest a waitlist or expose a disabled purchase control. It should show `Buy now` when checkout is configured, and sample plus consulting paths with honest checkout-status copy otherwise.
