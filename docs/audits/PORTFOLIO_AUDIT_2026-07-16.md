# Portfolio audit — 16 July 2026

## Audit boundary

This audit separates three surfaces that must not be conflated:

1. **Current `main` source** — the canonical repository state.
2. **Verified static export** — the artifact produced by the green `canonical-site-verify` run for `d78e913edd757d42ba4926af432dc4bd1632b5ce`; the next commit only declared the existing toolchain as ESM and did not change the rendered site.
3. **Public custom domain** — `https://pranaysuyash.com`, which was independently inspected during this audit and was still serving the previous portfolio generation.

The current source and verified export are substantially stronger than the public deployment. Ratings therefore distinguish **source quality** from **public production readiness**.

## Executive verdict

- **Current source platform:** **9.2 / 10**
- **Current verified export:** **9.1 / 10**
- **Public custom-domain experience:** **6.6 / 10**
- **Combined share-readiness today:** **7.5 / 10**

The repository is no longer the main constraint. The largest risk is deployment identity: the URL a recruiter, founder, or buyer sees does not yet represent the product that `main` verifies.

## Ratings

| Area | Rating | Current judgment |
| --- | ---: | --- |
| Professional positioning | 9.4 | The identity is senior, specific, and coherent: product leadership plus hands-on system building around operational workflows. |
| Hiring-manager conversion | 9.2 | Strong role language, measurable outcomes, current context, resume, role-fit framing, and a dedicated conversation path. |
| Client conversion | 9.1 | Clear service hierarchy, regional price books, fit boundaries, engagement shapes, and a workflow-first contact form. |
| Career narrative | 9.5 | Wipro → EY → MedPiper → independent systems reads as one accumulated operating capability rather than disconnected roles. |
| Project credibility | 8.6 | Maturity labels, pinned source revisions, tests, runbooks, and explicit claim boundaries are excellent; direct product-use visuals remain thin. |
| Visual design | 9.0 | Coherent editorial system, strong hierarchy, restrained palette, credible density, and responsive layouts. Repeated section rhythms reduce distinctiveness. |
| Navigation and information architecture | 9.3 | Work, Experience, Services, Book, About, proof, archive, and systems lab have clear roles. The long pages still need faster internal navigation. |
| Mobile experience | 8.7 | Responsive and readable with no observed horizontal overflow. Several core pages remain long and dense on a 390px viewport. |
| Accessibility engineering | 9.2 | Automated contrast, alt text, landmarks, focus restoration, reduced-motion, print, and fallback contracts are strong. Full keyboard and assistive-technology testing is still external evidence. |
| Performance | 9.0 | First-load JS is approximately 119–125 kB on core pages and the homepage HTML is about 111 kB. The systems lab is isolated, but the total export remains heavier because of self-hosted Three.js. |
| Search and machine discovery | 9.5 | Page metadata, canonical URLs, sitemap, robots, JSON-LD, JSON Resume, `llms.txt`, social previews, and evidence links are unusually complete. |
| Release engineering | 9.8 | Lint, TypeScript, content boundaries, evidence freshness, contrast, publication package, static budgets, link contracts, exact-commit CI, and durable statuses are integrated. |
| Live deployment integrity | 4.5 | The custom domain is serving the previous site generation and cannot be treated as proof of the current green release. |

## What is working well

### 1. One professional thesis now governs the site

The homepage, Experience, Work, Services, proof ledger, book, and machine-readable profile all reinforce the same capability:

> Turn ambiguous operational work into a reviewable product system, keep uncertainty visible, and ship with evidence.

This is materially stronger than a generic “AI builder” or a catalogue of unrelated repositories.

### 2. Claims are narrower and more believable

The current flagship cases explicitly distinguish:

- production professional outcomes;
- a paid commercial product;
- working product builds;
- active platform work;
- prototypes;
- workflow diagrams versus product screenshots;
- extraction versus inference;
- visual-signature placement versus certified e-signature claims;
- deterministic simulation versus AI explanation.

The proof ledger and 90-day evidence-review gate turn this from copy discipline into a release discipline.

### 3. Hiring and commercial paths no longer collapse into one CTA

The navigation and route-aware actions distinguish:

- a senior product-role conversation;
- a scoped workflow or system engagement;
- the book as a standard digital product.

The contact page also separates role context from project context while retaining direct scheduling and email fallbacks.

### 4. The repository has a credible release contract

The green release run verifies:

- ESLint with zero warnings;
- strict TypeScript;
- audited career and product boundaries;
- four current product records and sixteen pinned implementation records;
- 90-day evidence freshness;
- light and dark contrast pairs;
- publication package integrity;
- 51 static pages;
- route and internal-link contracts;
- same-origin Three.js wrappers and product-lab syntax;
- static size budgets;
- generated resume and social metadata.

## Pending work, ordered by leverage

### P0 — Deploy the verified release to the actual custom domain

The current live homepage still identifies the site as “Operator-Builder for Workflow Systems,” and the live Work page still exposes the older large project catalogue. That means the public site bypasses the current audited maturity model, current navigation, proof ledger, regional service structure, and current metadata.

Required completion evidence:

1. deploy current `main` to the correct Cloudflare Pages project;
2. verify `/build-info.json` reports the deployed commit;
3. verify the generated `*.pages.dev` deployment and `pranaysuyash.com` serve the same release;
4. verify the apex and `www` mapping;
5. run the new `Live deployment audit` workflow until the `live-deployment` commit status is green.

### P1 — Replace workflow-map-only proof with direct product-use evidence

All four audited product records currently use typed and honestly labelled workflow maps. That proves product reasoning, but not the complete operating surface.

Minimum evidence target:

- **SignKit:** current app shell, source loaded, selection/extraction result, signature library, and PDF placement state.
- **MetaExtract:** file intake, structured output, provenance or field evidence, and reviewer state.
- **EchoPanel:** capture state, transcript timeline, search result, and local-storage boundary.
- **SentinelTwin:** editor state, coverage result, path/comparison result, and evidence or explanation surface.

Each visual should be dated, captioned, tied to the reviewed source revision, and clearly marked as screenshot, recording, benchmark, or diagram.

### P1 — Add permissioned third-party professional proof

The site correctly refuses to invent testimonials. The remaining gap is therefore an evidence-acquisition task, not a copy task.

High-value additions:

- one former co-founder or CEO recommendation;
- one engineering or operations stakeholder recommendation;
- one EY client or senior colleague reference where permitted;
- one external paid-customer or delivery case with scope, timeline, and outcome.

### P1 — Verify real production transactions

Repository validation cannot prove third-party outcomes. Complete one real test for each:

- FormBold project submission and inbox receipt;
- role-context submission;
- 15-minute and 30-minute Cal.com destinations;
- Dodo purchase, invoice, PDF delivery, and EPUB delivery;
- refund and support path;
- mobile menu and theme interaction on the deployed domain.

### P1 — Reduce long-page mobile effort

Static rendering at a 390px CSS viewport produced approximate content heights of:

- homepage: 8,835 rendered pixels;
- Work: 8,147;
- Experience: 8,990;
- proof ledger: 9,609;
- book: 9,762;
- Services: 6,824;
- Document Workflows: 6,846;
- Contact: 3,819.

The pages are readable, but the user must scroll through multiple proof and policy blocks before reaching later actions.

Recommended correction:

- add a compact in-page section index to Work, Experience, Services, proof, and book pages;
- preserve all evidence in HTML rather than hiding it behind opaque carousels;
- allow optional details to collapse only when the summary still communicates the claim and evidence boundary;
- keep the primary action available after major sections.

### P2 — Make the personal brand more human and visually ownable

The current design is polished but still adjacent to the premium AI/product-consulting category: charcoal, teal, oversized type, monospaced labels, workflow maps, and bordered matrices.

The strongest next differentiators are authentic assets rather than more decoration:

- a professional portrait or working-context photograph;
- real product-use captures;
- occasional annotated source or evaluation artifacts;
- a more distinctive visual motif derived from evidence traces, workflow states, or inspected documents.

### P2 — Keep deployment documentation current

The deployment guide still contains old homepage, navigation, and product-lab expectations from a prior site generation. It should describe the current canonical release, live drift audit, proof ledger, current role and service paths, and exact build-identity check.

## Changes started from this audit

1. Added `scripts/verify_live_deployment.mjs` to compare the custom domain against the exact current `main` SHA and current route signatures.
2. Added `.github/workflows/live-deployment-audit.yml` for daily and manual production drift checks.
3. The workflow publishes a durable `live-deployment` commit status and fails when the custom domain is stale.
4. This audit is preserved as the current prioritisation record.

## Next implementation sequence

1. Update the deployment guide and bind live-deployment verification into repository contracts.
2. Deploy current `main` and obtain a green `live-deployment` status.
3. Add direct SignKit product screenshots first because it is the strongest commercial proof case.
4. Add compact section navigation to the five longest professional pages.
5. Validate FormBold, Cal.com, and Dodo on the live domain.
6. Acquire permissioned third-party evidence.

## Evidence limits

- Visual review used the exact verified static export, rendered at desktop and 390px mobile widths. JavaScript-only interaction quality still requires a real browser session.
- Automated checks support accessibility claims but do not establish complete WCAG conformance.
- No customer, employer, checkout, inbox, or scheduler claim was treated as verified without direct production evidence.
