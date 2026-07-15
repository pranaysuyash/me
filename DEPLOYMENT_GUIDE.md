# Portfolio deployment guide

**Primary domain:** https://pranaysuyash.com  
**Hosting:** Cloudflare Pages  
**Cloudflare Pages project:** `pranay`  
**Build model:** Next.js static export to `out/`  
**Default branch:** `main`

This document is the deployment contract for the portfolio and digital-product site.

## 1. Local verification

Use Node.js 22 and install the locked dependency tree.

```bash
npm ci
npm run typecheck
npm run build
```

A successful build must create a non-empty `out/` directory.

`.github/workflows/site-build.yml` repeats the typecheck and static build on every push to `main`. It verifies:

- homepage, Work, Systems, Services, Contact, SentinelTwin, policy, and metadata routes;
- the custom 404 output;
- the exported interactive product-lab shell and JavaScript module;
- ES-module syntax for the product-lab scene;
- presence of the four product-specific scene builders;
- required policy and Systems URLs inside the generated sitemap;
- that the removed `/admin` route has not reappeared.

CI is a release gate, not a production deployment.

## 2. Production deployment

The canonical manual deployment command is:

```bash
npm run deploy:cloudflare
```

It runs:

```bash
npm run build
wrangler pages deploy out --project-name pranay --branch main
```

Wrangler must be authenticated to the Cloudflare account that owns the `pranay` Pages project. Never commit Cloudflare tokens, account identifiers, or generated credential files.

If Cloudflare Pages Git integration is enabled, a push to `main` may create a deployment automatically. Do not assume it did. Verify the deployed commit, Pages URL, and custom domain.

### Custom-domain identity check

The generated deployment URL and `pranaysuyash.com` must serve the same release.

If the generated `*.pages.dev` URL shows the new site while `pranaysuyash.com` still shows an older site:

1. open Cloudflare Dashboard → Workers & Pages;
2. select the `pranay` Pages project used by Wrangler;
3. open **Custom domains**;
4. confirm `pranaysuyash.com` is attached and active on that exact project;
5. check whether the domain is still attached to an older Pages project;
6. verify the apex and any `www` hostname intentionally resolve to the same project;
7. redeploy only after the project/domain mapping is unambiguous.

Do not treat a successful upload to a preview URL as proof that the custom domain was updated.

## 3. Required production routes

Verify both the generated Pages URL and the custom domain.

Core routes:

- `/`
- `/work`
- `/systems`
- `/work-with-me`
- `/contact`
- `/about`
- `/hire-me`
- `/work/sentineltwin`
- `/work/sig-ext-fastapi`
- `/work/metaextract`
- `/work/echopanel`
- `/books/no-claim-without-evidence`
- `/books/no-claim-without-evidence/sample`

Interactive static assets:

- `/product-lab/index.html`
- `/product-lab/scene.js`

Policy and metadata routes:

- `/privacy`
- `/terms`
- `/refund-policy`
- `/delivery-policy`
- `/sitemap.xml`
- `/robots.txt`
- a branded 404 response for an unknown route

`/admin` must return 404. The site has no public or simulated admin application.

## 4. Content and conversion checks

Check the actual product experience, not merely HTTP status codes:

- homepage headline begins with “Product systems for work”;
- desktop navigation includes Work, Systems, Services, About, and Writing;
- homepage product lab switches among SentinelTwin, SignKit, MetaExtract, and EchoPanel;
- every product exposes three distinct operating views rather than decorative motion only;
- `/systems` provides the same lab at a larger inspection size;
- Work separates flagship systems from the archive and renders product previews;
- project case studies render screenshots, canonical metadata, and project-specific social previews;
- Services shows an India INR / Global USD switch;
- Contact shows regional engagement scopes and submits successfully;
- SentinelTwin renders its case study and remote product images;
- footer policy links resolve and merchant roles are described accurately.

## 5. Regional service-pricing checks

Pricing uses two regional price books, not live exchange-rate conversion.

### India

- System mapping sprint: ₹95,000+
- Focused product build: ₹3.5L+
- Production system build: ₹8L+
- Embedded product partner: ₹2.75L/month+

### Global

- System mapping sprint: $2,500+
- Focused product build: $9,000+
- Production system build: $22,000+
- Embedded product partner: $7,500/month+

Detection order:

1. explicit visitor selection stored in `localStorage`;
2. Cloudflare same-origin `/cdn-cgi/trace` country value;
3. browser timezone and language hints;
4. Global USD as the safe initial render.

Manual switching must remain available. Confirm the Contact form uses the same stored region.

## 6. Contact and scheduling checks

The Contact page submits to FormBold. Before declaring a release healthy:

1. submit one real test project brief;
2. confirm it reaches the expected inbox;
3. verify success and error states;
4. verify the 15-minute and 30-minute Cal.com links;
5. verify source query parameters are included in the submitted form;
6. confirm no private phone number is exposed unintentionally.

## 7. Ebook publication gate

Do not enable the purchase CTA until all of these are true:

1. the final PDF and EPUB exist;
2. both files are uploaded as Dodo entitlements;
3. the India price resolves to ₹799;
4. the global base price resolves to $14.99 or the explicitly accepted adaptive-currency equivalent;
5. tax-inclusive display and the generated invoice are correct;
6. a real test purchase delivers both files;
7. refund, delivery, privacy, terms, and support links are visible;
8. `NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL` is set for the production build.

Until then, the ebook page remains sample-first and must not present a nonfunctional purchase control.

## 8. Visual, interaction, and accessibility checks

Test at minimum:

- mobile width around 375px;
- tablet width around 768px;
- desktop width around 1440px;
- light and dark themes;
- mobile menu open, close, and route selection;
- Work archive filters;
- product-lab project and mode controls with mouse, touch, and keyboard;
- product-lab drag and zoom do not steal page scrolling unexpectedly;
- reduced-motion mode does not continuously animate the product scenes;
- WebGL failure leaves readable fallback and standard case-study links;
- local and remote project images;
- no horizontal scrolling;
- keyboard focus visibility on links, buttons, selects, and inputs;
- policy pages remain readable at narrow widths.

## 9. Search, metadata, and headers

After deployment, verify:

- page-specific titles and descriptions;
- canonical URLs on project and Systems pages;
- Open Graph and Twitter metadata;
- Person and WebSite JSON-LD on the site shell;
- generated sitemap entries for projects, Systems, and policies;
- generated robots output points to the canonical sitemap;
- Cloudflare serves the headers defined in `public/_headers`;
- the same-origin product-lab iframe is not blocked by frame headers;
- static Next assets receive immutable caching;
- the global title does not append “Pranay Suyash” twice.

## 10. Rollback

Cloudflare Pages keeps prior deployments. If production is broken:

1. promote the previous healthy Pages deployment;
2. fix `main`;
3. rerun `npm ci`, `npm run typecheck`, and `npm run build`;
4. redeploy and repeat this checklist.

Do not diagnose production from repository state alone. Compare the deployed commit or build timestamp with the current `main` head.
