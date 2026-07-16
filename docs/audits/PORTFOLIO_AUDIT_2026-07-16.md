# Portfolio audit — 16 July 2026

## Audit boundary

This audit separates three surfaces that must not be conflated:

1. **Current `main` source** — the canonical repository state.
2. **Verified static export** — the exact artifact produced by the canonical release workflow and visually reviewed at desktop and 390px mobile widths.
3. **Public custom domain** — `https://pranaysuyash.com`, which was still serving the previous portfolio generation during this audit.

The repository and verified export are substantially stronger than the public deployment. Ratings therefore distinguish source quality from public production readiness.

## Executive verdict

- **Current source platform:** **9.2 / 10**
- **Current verified export:** **9.1 / 10**
- **Public custom-domain experience:** **6.6 / 10**
- **Combined share-readiness today:** **7.5 / 10**

The repository is no longer the main constraint. The largest risk is deployment identity: the URL seen by a recruiter, founder, or buyer does not yet represent the product that `main` verifies.

## Verified release result

Commit `73a4b4d54a790473bd3b977343ea868853476f3b` produced two independent durable statuses:

- `canonical-site-verify`: **success**;
- `live-deployment`: **failure**.

This is the correct result. It proves the current source can produce a valid release while the custom domain is stale. Production readiness must not be inferred from repository health alone.

## Ratings

| Area | Rating | Current judgment |
| --- | ---: | --- |
| Professional positioning | 9.4 | The identity is senior, specific, and coherent: product leadership plus hands-on system building around operational workflows. |
| Hiring-manager conversion | 9.2 | Strong role language, measurable outcomes, current context, resume, role-fit framing, and a dedicated conversation path. |
| Client conversion | 9.1 | Clear service hierarchy, regional price books, fit boundaries, engagement shapes, and a workflow-first contact form. |
| Career narrative | 9.5 | Wipro → EY → MedPiper → independent systems reads as one accumulated operating capability rather than disconnected roles. |
| Project credibility | 8.6 | Maturity labels, pinned source revisions, tests, runbooks, and claim boundaries are excellent; direct product-use visuals remain thin. |
| Visual design | 9.0 | Coherent editorial system, strong hierarchy, restrained palette, credible density, and responsive layouts. Repeated section rhythms reduce distinctiveness. |
| Navigation and information architecture | 9.3 | Work, Experience, Services, Book, About, proof, archive, and systems lab have clear roles. Long pages still need faster internal navigation. |
| Mobile experience | 8.7 | Responsive and readable with no observed horizontal overflow. Several core pages remain long and dense at 390px. |
| Accessibility engineering | 9.2 | Automated contrast, alt text, landmarks, focus restoration, reduced motion, print, and fallback contracts are strong. Full keyboard and assistive-technology testing remains external evidence. |
| Performance | 9.0 | First-load JavaScript is approximately 119–125 kB on core pages and homepage HTML is about 111 kB. The systems lab is isolated, but self-hosted Three.js increases total export size. |
| Search and machine discovery | 9.5 | Metadata, canonicals, sitemap, robots, JSON-LD, JSON Resume, `llms.txt`, social previews, and evidence links are unusually complete. |
| Release engineering | 9.8 | Lint, TypeScript, content boundaries, evidence freshness, contrast, publication validation, budgets, exact-commit CI, build identity, retained logs, and durable source/live statuses are integrated. |
| Live deployment integrity | 4.5 | The custom domain is serving the previous site generation and cannot be treated as proof of the current release. |

## What is working well

### One professional thesis governs the site

The homepage, Experience, Work, Services, proof ledger, book, and machine-readable profile reinforce one capability:

> Turn ambiguous operational work into a reviewable product system, keep uncertainty visible, and ship with evidence.

This is materially stronger than a generic “AI builder” position or an undifferentiated repository catalogue.

### Claims are narrower and more believable

The flagship cases distinguish:

- professional production outcomes;
- a paid commercial product;
- working product builds;
- active platform work;
- prototypes;
- workflow diagrams versus product screenshots;
- extraction versus inference;
- visual-signature placement versus certified e-signatures;
- deterministic simulation versus AI explanation.

The proof ledger and 90-day evidence gate make this release discipline rather than copy discipline.

### Hiring and commercial paths are separated

Route-aware actions distinguish:

- a senior product-role conversation;
- a scoped workflow or system engagement;
- the book as a standard digital product.

The contact page separates role context from project context and retains scheduling, email, and no-JavaScript fallbacks.

### The repository has a credible release contract

The canonical release verifies:

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
- generated resume, social metadata, and build identity.

## Pending work, ordered by leverage

### P0 — Deploy the verified release to the actual custom domain

The live homepage still identifies the site as the older “Operator-Builder for Workflow Systems” generation, and the live Work page still exposes the older large project catalogue. The public URL therefore bypasses the current audited maturity model, navigation, proof ledger, service structure, and metadata.

Completion evidence:

1. deploy current `main` to the correct Cloudflare Pages project;
2. verify `/build-info.json` reports the deployed commit;
3. verify the generated `*.pages.dev` URL and `pranaysuyash.com` serve the same release;
4. verify apex and `www` mappings;
5. obtain a green `live-deployment` status.

### P1 — Replace workflow-map-only proof with direct product-use evidence

All four audited product records currently use honestly labelled workflow maps. That proves product reasoning, but not the complete operating surface.

Minimum evidence target:

- **SignKit:** current app shell, source loaded, selection/extraction result, signature library, and PDF placement state.
- **MetaExtract:** intake, structured output, provenance or field evidence, and reviewer state.
- **EchoPanel:** capture state, transcript timeline, search result, and local-storage boundary.
- **SentinelTwin:** editor state, coverage result, path/comparison result, and evidence or explanation surface.

Each visual must be dated, captioned, tied to a reviewed source revision, and typed as screenshot, recording, benchmark, or diagram.

### P1 — Add permissioned third-party professional proof

The site correctly refuses to invent testimonials. The remaining gap is evidence acquisition:

- one former co-founder or CEO recommendation;
- one engineering or operations stakeholder recommendation;
- one EY client or senior-colleague reference where permitted;
- one external paid-customer case with scope, timeline, and outcome.

### P1 — Verify real production transactions

Repository validation cannot prove third-party outcomes. Complete one real test for each:

- FormBold project submission and inbox receipt;
- role-context submission;
- 15-minute and 30-minute Cal.com destinations;
- Dodo purchase, invoice, PDF delivery, and EPUB delivery;
- refund and support paths;
- mobile menu and theme interaction on the deployed domain.

### P1 — Reduce long-page mobile effort

Static rendering at a 390px CSS viewport produced approximate content heights of:

- homepage: 8,835 pixels;
- Work: 8,147;
- Experience: 8,990;
- proof ledger: 9,609;
- book: 9,762;
- Services: 6,824;
- Document Workflows: 6,846;
- Contact: 3,819.

The pages are readable, but later proof and actions require substantial scrolling.

Recommended correction:

- add a compact in-page section index to Work, Experience, Services, proof, and book;
- keep evidence in accessible HTML rather than opaque carousels;
- collapse optional detail only when the summary preserves the claim boundary;
- repeat the primary action after major sections.

### P2 — Make the personal brand more human and visually ownable

The design is polished but remains adjacent to the premium AI/product-consulting category: charcoal, teal, oversized type, monospaced labels, workflow maps, and bordered matrices.

The next differentiation should come from authentic assets:

- a professional portrait or working-context photograph;
- direct product-use captures;
- occasional annotated source or evaluation artifacts;
- a visual motif derived from evidence traces, workflow states, or inspected documents.

## Changes completed from this audit

1. Added `scripts/verify_live_deployment.mjs` to compare the custom domain against an exact release SHA and current route signatures.
2. Added `.github/workflows/live-deployment-audit.yml` after every green Site build, daily, and by manual dispatch.
3. Post-build audits evaluate the exact commit that passed the canonical release workflow.
4. Added retained `live-verify.log` artifacts and the durable `live-deployment` status.
5. Exposed `/build-info.json` through the footer as **Build identity**.
6. Rewrote the deployment guide around current routes, release identity, Cloudflare mapping, production transactions, and dual source/live statuses.
7. Bound the live-release workflow, audit, guide, footer identity, and scripts into the structural release contract.
8. Preserved this audit as the prioritisation record.

## Next implementation sequence

1. Promote or deploy current `main` on the correct Cloudflare Pages project and obtain a green `live-deployment` status.
2. Capture and add direct SignKit product evidence first because it is the strongest commercial proof case.
3. Add compact section navigation to the five longest professional pages.
4. Validate FormBold, Cal.com, and Dodo on the live domain.
5. Acquire permissioned third-party evidence.

## Evidence limits

- Visual review used the exact verified static export, rendered at desktop and 390px mobile widths. JavaScript interaction quality still requires a real browser session.
- Automated checks support accessibility claims but do not establish complete WCAG conformance.
- No customer, employer, checkout, inbox, scheduler, or delivery claim was treated as verified without direct production evidence.
