# Portfolio deployment guide

**Primary domain:** https://pranaysuyash.com  
**Hosting:** Cloudflare Pages  
**Cloudflare Pages project:** `pranay`  
**Build model:** Next.js static export to `out/`  
**Default branch:** `main`

This document is the current deployment contract for the portfolio. It replaces the earlier mixed Vercel and Cloudflare instructions.

## 1. Local verification

Use Node.js 22 and install the locked dependencies.

```bash
npm ci
npm run typecheck
npm run build
```

A successful build must create a non-empty `out/` directory.

The repository also contains `.github/workflows/site-build.yml`. On every push to `main`, it:

1. installs dependencies with `npm ci`;
2. runs the static build;
3. checks that the exported homepage, Work, Services, Contact, and SentinelTwin routes exist and are non-empty.

The CI build is a gate, not a production deployment.

## 2. Production deployment

The package script is the canonical manual deployment command:

```bash
npm run deploy:cloudflare
```

It runs:

```bash
npm run build
wrangler pages deploy out --project-name pranay --branch main
```

Wrangler must already be authenticated to the Cloudflare account that owns the `pranay` Pages project. Do not commit Cloudflare tokens, account identifiers, or generated credential files.

If Cloudflare Pages Git integration is enabled for this repository, a push to `main` may also create a production deployment automatically. Do not assume that happened. Verify the resulting deployment and the custom domain.

## 3. Critical route checks

Verify both the Cloudflare deployment URL and the custom domain.

Required routes:

- `/`
- `/work`
- `/work-with-me`
- `/contact`
- `/work/sentineltwin`
- `/work/sig-ext-fastapi`
- `/work/metaextract`
- `/work/echopanel`
- `/sitemap.xml`
- `/robots.txt`

Check for the current positioning, not merely a `200` response:

- homepage headline begins with “Product systems for work”;
- desktop navigation includes Work, Services, About, and Writing;
- Services shows an India INR / Global USD switch;
- Contact shows regional engagement scopes;
- Work separates flagship systems from the project archive;
- SentinelTwin renders its case-study route and product images.

## 4. Regional-pricing checks

Pricing uses two regional price books, not live currency conversion.

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

1. a visitor's explicit selection stored in `localStorage`;
2. Cloudflare's same-origin `/cdn-cgi/trace` country value;
3. browser timezone and language hints;
4. Global USD as the safe initial render.

Manual switching must always remain available. Test both price books and confirm that the Contact form uses the same regional choice.

## 5. Form and conversion checks

The Contact page submits to the configured FormBold endpoint. Before declaring a release healthy:

1. submit one test project brief;
2. confirm it reaches the expected inbox;
3. verify the success and error states;
4. verify the 15-minute and 30-minute Cal.com links;
5. verify source query parameters are preserved in the submitted form.

Do not publish a phone number unless it is intentionally meant to be public.

## 6. Visual and interaction checks

Test at minimum:

- mobile width around 375px;
- tablet width around 768px;
- desktop width around 1440px;
- light and dark themes;
- mobile menu open, close, and route selection;
- Work archive filters;
- project screenshots and external repository links;
- no horizontal scrolling;
- keyboard focus visibility on links, buttons, selects, and inputs.

## 7. Search and social checks

After deployment, inspect the generated HTML for:

- the page-specific `<title>`;
- meta description;
- canonical origin through `metadataBase`;
- Open Graph title and description;
- Twitter card metadata;
- updated sitemap entries, especially `/work/sentineltwin`.

The global title must not append “Pranay Suyash” twice.

## 8. Rollback

Cloudflare Pages keeps prior deployments. If the new production build is broken:

1. promote the previous healthy Pages deployment in the Cloudflare dashboard;
2. fix the repository on `main`;
3. run the local typecheck and build again;
4. redeploy and repeat the critical-route checks.

Do not diagnose a production issue from repository state alone. Compare the deployed commit or build timestamp with the current `main` head.
