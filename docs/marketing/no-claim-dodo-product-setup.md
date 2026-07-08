# No Claim Without Evidence - Dodo Product Setup

Use these values when creating the product in Dodo Payments.

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

Launch Price:

```text
19 USD
```

India / WhatsApp local launch reference:

```text
₹1,499
```

Standard Price After Launch:

```text
29 USD
```

India / WhatsApp local standard reference:

```text
₹2,499
```

Discount Applicable:

```text
0%
```

Prefer setting the actual launch price directly instead of using a checkout discount. It keeps the offer simpler: launch price now, standard price later.

## Credits

Add Credits:

```text
No
```

This is an ebook purchase, not usage-based software.

## Entitlements

Access:

```text
Files & Templates
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
launch_price_usd = 19
standard_price_usd = 29
launch_price_inr = 1499
standard_price_inr = 2499
site_url = https://pranaysuyash.com/books/no-claim-without-evidence
version = 1.0
author = Pranay Suyash
```

## After Dodo Product Creation

Copy the Dodo checkout/payment link and set it in the site deployment environment:

```bash
NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL=<dodo checkout url>
```

Then redeploy the site. The page CTA will automatically change from the enquiry fallback to `Buy with Dodo Payments`.
