# No Claim Without Evidence - Dodo Product Setup

Use these values when creating the product in Dodo Payments.

## Status

The site is wired for a live checkout URL. Until the Dodo product and delivery flow are tested, the page remains sample-first and shows checkout as coming soon rather than presenting a nonfunctional purchase button.

## Basic Details

Product Name:

```text
No Claim Without Evidence
```

Brand:

```text
Pranay Suyash
```

If the brand does not exist yet, create/select the brand attached to `pranaysuyash.com`.

Tax Category:

```text
Digital product
```

If Dodo shows a more specific option, prefer:

```text
Ebook / Digital book
```

## Media And Description

Product Description:

```text
A practical ebook for building AI systems you can verify, not just demo.

No Claim Without Evidence shows how to design LLM workflows with evidence links, evals, review rules, action traces, and release gates. It uses an airline-ticket extraction case study to make unsupported inference concrete, then turns that into reusable patterns for AI builders.

Includes PDF and EPUB editions.
```

Shorter Description:

```text
A practical field guide for building LLM workflows with evidence links, evals, review rules, action traces, and release gates. Includes PDF and EPUB editions.
```

Product Image:

```text
public/books/no-claim-without-evidence/checkout-image.jpg
```

Image specs:

```text
1200 x 1200 JPG, 134KB
```

Use the square checkout image above for Dodo checkout and invoices. Use the portrait cover for the website and social posts.

## Pricing

Pricing Type:

```text
One Time
```

Base Price and Currency:

```text
$14.99 USD
```

Tax Inclusive Pricing:

```text
Enabled
```

Localized Pricing:

```text
Enabled
Mode: By Country
India override: IN / INR / ₹799
```

Markets without an India rule use the $14.99 USD base price. Keep Adaptive Currency disabled initially if the public page must match the exact `$14.99 elsewhere` wording. If Adaptive Currency is enabled later, non-India customers may see the base price converted into a supported local currency.

Discount Applicable:

```text
0%
```

This is a stable regional price book, not a temporary launch discount:

- India: ₹799
- Other markets: $14.99 base price

Dodo configuration notes:

- Localized Pricing sets a fixed price per country or currency.
- Tax Inclusive Pricing keeps the displayed total stable while Dodo derives and itemizes the tax portion based on the customer location and product tax category.
- Use the India override for PPP. Do not use live FX conversion to derive the ₹799 price.

## Credits

Add Credits:

```text
No
```

This is an ebook purchase, not usage-based software.

## Entitlements

Automated Entitlement:

```text
File Downloads (or Files & Templates if that is the dashboard label)
```

Files to attach:

```text
no-claim-without-evidence.pdf
no-claim-without-evidence.epub
```

Source package:

```text
/Users/pranay/Projects/evidence-based-ai-engineering-ebook/dist/no-claim-without-evidence.pdf
/Users/pranay/Projects/evidence-based-ai-engineering-ebook/dist/no-claim-without-evidence.epub
```

## Metadata

Use these key-value pairs:

```text
product_slug = no-claim-without-evidence
product_type = ebook
formats = pdf,epub
base_price_usd = 14.99
india_price_inr = 799
pricing_mode = by_country
tax_inclusive = true
site_url = https://pranaysuyash.com/books/no-claim-without-evidence
version = 1.0
author = Pranay Suyash
```

## After Dodo Product Creation

Copy the Dodo checkout/payment link and set it in the site deployment environment:

```bash
NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL=<dodo checkout url>
```

Set the variable in the Cloudflare Pages production environment, redeploy, and complete a real test purchase. After the checkout URL is present at build time, the page promotes `Buy now` as the primary action.

Before launch, verify:

1. India checkout resolves to ₹799.
2. A non-India checkout uses the $14.99 base price or the expected Adaptive Currency equivalent.
3. The displayed amount is tax inclusive and the invoice breaks out tax correctly.
4. Both PDF and EPUB downloads are granted after payment.
5. Refund and support contact details are correct.

The sample route remains available at `/books/no-claim-without-evidence/sample`.
