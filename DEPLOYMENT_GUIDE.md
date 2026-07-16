# Portfolio deployment guide

**Primary domain:** https://pranaysuyash.com  
**Hosting:** Cloudflare Pages  
**Cloudflare Pages project:** `pranay`  
**Repository:** `pranaysuyash/me`  
**Canonical branch:** `main`  
**Build model:** Next.js static export to `out/`

This guide defines the production handoff for the career platform, services, proof ledger, systems lab, and digital book. Repository health and public deployment health are separate claims.

## 1. Canonical validation command

Use Node.js 22 and the locked dependency tree.

```bash
npm ci
npm run site:verify
```

`npm run site:verify` is the single release-readiness command. Its lifecycle runs:

- structural live-release contract validation;
- ESLint with zero warnings;
- strict TypeScript;
- career, portfolio, evidence, freshness, contrast, privacy, print, and interaction contracts;
- book source and package validation;
- generated resume and build identity;
- production static export;
- exported route, metadata, internal-link, visual-evidence, and size-budget checks;
- product-lab module syntax validation.

Do not reproduce this sequence in another workflow or script. Automated and diagnostic workflows delegate to this command.

## 2. Repository release status

`.github/workflows/site-build.yml` runs on each push to `main` and on manual dispatch.

It:

1. checks out the exact triggering commit;
2. runs `npm run site:verify`;
3. uploads the complete log and verified static export;
4. publishes the durable commit status `canonical-site-verify`.

A green `canonical-site-verify` proves that exact commit produced a valid release package. It does not prove the custom domain serves that package.

For manual source diagnosis, `.github/workflows/site-diagnostics.yml` checks out current `main`, calls the same canonical command, and retains its log and export.

## 3. Build identity

Every build generates:

```text
/build-info.json
```

The file records:

- repository;
- branch;
- full and short commit SHA;
- build timestamp;
- evidence-review date;
- release contract identifier `career-platform-v2`.

The deployed `commit` must equal the release being evaluated. A visually correct page with the wrong build identity is stale.

The footer exposes **Build identity** so human reviewers can inspect the deployed release directly.

## 4. Production deployment

The canonical manual deployment command is:

```bash
npm run deploy:cloudflare
```

It performs:

```bash
npm run site:verify
wrangler pages deploy out --project-name pranay --branch main
```

Wrangler must be authenticated to the Cloudflare account that owns the `pranay` Pages project. Never commit Cloudflare tokens, account identifiers, or generated credential files.

Cloudflare Pages Git integration may also deploy a push to `main`. Do not assume it did. Verify the deployment commit, generated Pages URL, and custom domain.

## 5. Live deployment audit

`.github/workflows/live-deployment-audit.yml` runs:

- after every successful **Site build** workflow;
- once per day;
- by manual dispatch.

Post-build runs evaluate the exact SHA that passed `canonical-site-verify`. Scheduled and manual runs evaluate current `main`.

The workflow:

1. resolves the deployment target SHA;
2. runs `scripts/verify_live_deployment.mjs` against `https://pranaysuyash.com`;
3. compares `/build-info.json` with the target SHA;
4. verifies current release signatures on the homepage, Work, Experience, Services, Contact, proof ledger, and book routes;
5. uploads a retained `live-verify.log` artifact;
6. publishes the durable commit status `live-deployment`;
7. fails when the custom domain is stale, incomplete, or mapped to the wrong project.

A share-ready release requires both statuses:

- `canonical-site-verify`: green;
- `live-deployment`: green.

Run the same network check locally with a full expected SHA:

```bash
EXPECTED_SHA="$(git rev-parse HEAD)" npm run live:verify
```

An alternate Pages URL can be checked without weakening the production contract:

```bash
LIVE_SITE_URL="https://example.pages.dev" \
EXPECTED_SHA="$(git rev-parse HEAD)" \
npm run live:verify
```

## 6. Custom-domain identity

The generated `*.pages.dev` deployment and `pranaysuyash.com` must serve the same release.

When the Pages URL is current but the custom domain is stale:

1. open Cloudflare Dashboard → Workers & Pages;
2. select the `pranay` project used by Wrangler;
3. open **Custom domains**;
4. confirm `pranaysuyash.com` is active on that exact project;
5. check whether the domain remains attached to an older project;
6. verify the apex and intended `www` hostname resolve to the same project;
7. promote or redeploy the correct production release;
8. run the Live deployment audit until `live-deployment` is green.

A successful upload to a preview URL is not proof that the custom domain changed.

## 7. Required production routes

### Professional and commercial

- `/`
- `/work`
- `/hire-me`
- `/work-with-me`
- `/document-workflows`
- `/proof`
- `/about`
- `/contact`
- `/systems`
- `/labs`

### Audited case studies

- `/work/medpiper-workflow`
- `/work/sig-ext-fastapi`
- `/work/metaextract`
- `/work/echopanel`
- `/work/sentineltwin`

### Book

- `/books/no-claim-without-evidence`
- `/books/no-claim-without-evidence/sample`

### Static, policy, and discovery

- `/product-lab/`
- `/product-lab/scene.js`
- `/pranay-suyash-resume.pdf`
- `/resume.json`
- `/llms.txt`
- `/build-info.json`
- `/privacy`
- `/terms`
- `/refund-policy`
- `/delivery-policy`
- `/accessibility`
- `/sitemap.xml`
- `/robots.txt`
- a branded unknown-route response

`/admin` must return 404. The site has no public or simulated administration product.

## 8. Current release signatures

The live verifier uses durable copy signatures rather than fragile visual selectors:

- homepage: `I turn messy operational workflows into reviewable AI and product systems.`;
- Work: `Four products, each labelled by what actually exists today.`;
- Experience: `Product leader and hands-on builder for AI, workflow, and internal systems.`;
- Services: `Buy a decision, a focused build, a production system, or sustained ownership.`;
- Contact: `Enough context for a useful fit assessment`;
- proof ledger: `90-day maximum review window`;
- book: `Clean AI output is not the same thing as a trustworthy system.`

Update the verifier deliberately when positioning changes. Never weaken it merely to make a stale deployment pass.

## 9. Regional service pricing

Pricing uses separate regional price books, not live exchange-rate conversion.

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

Manual switching must remain available, and Contact must respect the stored choice.

## 10. Production interaction checks

Static validation cannot prove third-party services completed their work.

### Contact and scheduling

1. submit a real project brief through FormBold;
2. confirm inbox receipt and preserved source fields;
3. submit one role-context enquiry;
4. verify success, validation, failure, and no-JavaScript fallback states;
5. verify the 15-minute and 30-minute Cal.com destinations;
6. confirm email and social links are not broken by Cloudflare rewriting.

### Ebook purchase and delivery

1. confirm PDF and EPUB entitlements;
2. confirm India and global pricing;
3. complete one real purchase;
4. verify tax and invoice behavior;
5. verify both files are delivered;
6. verify refund, support, privacy, terms, and delivery paths.

### Browser and accessibility

Test at minimum:

- mobile around 375–390px;
- tablet around 768px;
- desktop around 1440px;
- light and dark themes;
- mobile menu focus trapping and restoration;
- keyboard focus visibility;
- reduced-motion handling;
- pricing selection and persistence;
- product-lab keyboard, pointer, scrolling, and fallback behavior;
- no horizontal overflow;
- readable policy and proof pages at narrow widths.

## 11. Search, metadata, and headers

After deployment, verify:

- page-specific titles and descriptions;
- canonical URLs;
- Open Graph and Twitter images;
- Person and WebSite JSON-LD;
- JSON Resume and `llms.txt` discovery;
- sitemap entries for projects, proof, accessibility, book, and policies;
- robots output points to the canonical sitemap;
- Cloudflare serves `public/_headers`;
- same-origin product-lab framing remains allowed;
- static Next assets receive immutable caching;
- the global title does not duplicate the site name.

## 12. Rollback

If production is broken:

1. promote the last known healthy Cloudflare Pages deployment;
2. verify its `/build-info.json` identity;
3. fix `main`;
4. rerun `npm ci` and `npm run site:verify`;
5. deploy the corrected export;
6. confirm both `canonical-site-verify` and `live-deployment` are green.

Do not diagnose production from repository state alone. Compare the public build identity, route signatures, external transactions, and custom-domain mapping with the exact intended commit.
