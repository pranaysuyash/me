# Portfolio deployment guide

**Primary domain:** https://pranaysuyash.com  
**Hosting:** Cloudflare Pages  
**Cloudflare Pages project:** `pranay`  
**Repository:** `pranaysuyash/me`  
**Canonical branch:** `main`  
**Build model:** Next.js static export to `out/`

This guide defines the production handoff for the career platform, services, proof ledger, workflow library, systems lab, and digital book. Repository health, deployment completion, and public custom-domain health are separate claims.

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
- workflow-library source and browser contracts;
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
3. smoke-tests the static export over HTTP;
4. exercises hydrated desktop and mobile flows in Chrome;
5. uploads the complete logs, browser evidence, and verified static export;
6. publishes the durable commit status `canonical-site-verify`.

A green `canonical-site-verify` proves that exact commit produced a valid release package. It does not prove that the package reached Cloudflare or that the custom domain serves it.

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

## 4. Verified artifact deployment

`.github/workflows/cloudflare-production-deploy.yml` runs only after a successful **Site build** on the repository's own `main` branch.

It does not rebuild the site. It:

1. checks out the exact SHA verified by **Site build**;
2. downloads `verified-static-site-<sha>` from the triggering workflow run;
3. verifies `out/build-info.json` contains the same full SHA and `career-platform-v2` release contract;
4. confirms the required Cloudflare credentials are present;
5. deploys the already-verified `out/` directory to the `pranay` Pages project;
6. attaches `main` and the exact commit hash to the Cloudflare deployment;
7. verifies `https://pranaysuyash.com` serves that exact release;
8. publishes `cloudflare-deployment` and `live-deployment` commit statuses;
9. retains deployment metadata and the live-verification log.

This exact-artifact handoff prevents a second build from producing a package different from the one that passed the canonical release contract.

### Required GitHub Actions secrets

Configure these repository secrets before expecting automated deployment to pass:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The API token should be scoped to the Cloudflare account and Pages deployment access required for the `pranay` project. Never commit tokens, account identifiers, or generated credential files.

### Manual fallback

The canonical manual deployment command remains:

```bash
npm run deploy:cloudflare
```

It performs:

```bash
npm run site:verify
wrangler pages deploy out --project-name pranay --branch main
```

Wrangler must be authenticated to the Cloudflare account that owns the `pranay` Pages project. Manual deployment is a recovery path, not the normal production handoff.

Cloudflare Pages Git integration may also be connected. Do not run two uncontrolled production paths. The repository workflow is canonical because it deploys the exact artifact already verified by GitHub Actions.

## 5. Live deployment audit

`.github/workflows/live-deployment-audit.yml` is a scheduled and manually dispatchable drift audit.

It runs once per day and may be run on demand. Post-deployment verification belongs to `cloudflare-production-deploy.yml`; the scheduled audit does not race the deployment workflow.

The audit:

1. checks out current `main`;
2. resolves its full SHA;
3. runs `scripts/verify_live_deployment.mjs` against `https://pranaysuyash.com`;
4. compares `/build-info.json` with current `main`;
5. verifies current route and content signatures;
6. uploads a retained `live-verify.log` artifact;
7. refreshes the durable `live-deployment` status;
8. fails when the custom domain is stale, incomplete, or mapped to the wrong project.

A share-ready release requires all three statuses on the exact current commit:

- `canonical-site-verify`: green;
- `cloudflare-deployment`: green;
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
- `/workflows`
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

### Workflow starters

- `/workflows/document-extraction-starter.md`
- `/workflows/signature-document-starter.md`
- `/workflows/visual-inspection-starter.md`
- `/workflows/spatial-coverage-starter.md`
- `/workflows/meeting-capture-starter.md`

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

- homepage: `I turn document-heavy, exception-heavy workflows into AI systems people can review and run.`;
- Workflows: `Choose the workflow first. Then decide whether to download, try, verify, or build it.`;
- Work: `Four products, each labelled by what actually exists today.`;
- Experience: `Product leader and hands-on builder for AI, workflow, and internal systems.`;
- Services: `Buy a decision, a focused build, a production system, or sustained ownership.`;
- Contact: `Enough context for a useful fit assessment`;
- Systems: `Small enough to inspect. Real enough to operate.`;
- proof ledger: `90-day maximum review window`;
- book: `Clean AI output is not the same thing as a trustworthy system.`

The verifier also requires all five workflow acquisition labels, direct starter downloads, one-region ebook pricing, and direct sample checkout.

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
- workflow-library deep links and Contact handoff;
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
- sitemap entries for projects, workflows, proof, accessibility, book, and policies;
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
5. allow the exact verified artifact to deploy or use the documented manual fallback;
6. confirm `canonical-site-verify`, `cloudflare-deployment`, and `live-deployment` are green.

Do not diagnose production from repository state alone. Compare the public build identity, route signatures, external transactions, and custom-domain mapping with the exact intended commit.
