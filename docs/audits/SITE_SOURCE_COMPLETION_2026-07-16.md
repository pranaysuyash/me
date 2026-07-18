# Site source completion — 18 July 2026

## Scope

This record separates repository-controlled site work from evidence and operations that can only be completed against the deployed domain, authenticated third-party services, real products, observed visitors, or permissioned external people.

## Repository-controlled work completed

### Professional identity and audience paths

- One professional identity: product leader and hands-on systems builder.
- Hiring means sustained internal ownership.
- Commercial work means a bounded workflow, system, subsystem, or decision.
- Home, About, Experience, Services, Work, Systems, Contact, resumes, and machine-readable files use the same distinction.

### Navigation and page length

Accessible horizontal section indexes cover every long professional, systems, or publication page:

- Home;
- About;
- Experience;
- Commercial Engagements;
- Selected Work;
- Working Systems Lab;
- Proof Ledger;
- No Claim Without Evidence;
- the curated reading sample.

Content remains available as normal HTML; navigation does not hide evidence behind accordions or carousels.

### Commercial pricing architecture

- `src/lib/engagements.ts` is the single catalogue for scope, timeline, fit, inclusions, and India/global price books.
- `src/hooks/use-pricing-region.ts` is the single region resolver and persistence layer.
- Cloudflare country detection falls back to browser timezone/language hints.
- Manual region choice is persisted and synchronized across components and tabs.
- Services and Contact use the same engagement IDs and prices.
- Regional prices remain separate price books rather than live exchange-rate conversion.
- The ebook shows one selected regional price rather than presenting INR and USD together.

### Contact resilience and attribution

- Contact visibly supports senior roles and bounded commercial engagements.
- JavaScript-enabled submission retains adaptive fields, source attribution, loading, success, and failure states.
- The form has a normal HTML `action` and `method=POST` fallback.
- A `noscript` notice provides separately addressed role and commercial email paths.
- Role/commercial and 15/30-minute Cal.com links carry standard provider-supported attribution fields.
- Privacy and sensitive-information warnings remain visible.

### Book experience

- The book page is shorter and section-indexed.
- The separate sample route is a substantive, typeset online reading experience rather than a synopsis or circular navigation page.
- Excerpts cover the evidence habit, unsupported claims, pipeline diagnosis, release gates, and a reusable ledger.
- The reading sample leads directly to secure checkout while preserving a secondary route back to the book overview.
- Thesis, method, audience, selected regional price, checkout, consulting, delivery, refunds, terms, and privacy boundaries remain present.
- The one-time digital product remains separate from consulting and implementation services.

### Working systems lab

- `/systems` now begins with four real browser-contained mechanisms rather than only an illustrative scene:
  - editable evidence-linked invoice extraction and review;
  - local signature-image thresholding, despeckling, transparency, and crop;
  - local pixel statistics and edge-map visual inspection;
  - deterministic camera-target visibility with a draggable and keyboard-adjustable obstruction.
- Synthetic inputs are used by default.
- Optional local image files are decoded and processed by browser APIs in the current tab; the mechanism components contain no network or model dependency.
- Every mechanism states what it proves and what remains outside the surface.
- Each mechanism links to the relevant audited product case.
- The existing Three.js scene remains below the working mechanisms as a lazy-loaded, explicitly illustrative spatial explainer.
- The production CSP permits `blob:` only for browser-local image decoding while retaining same-origin image and frame boundaries.
- Working mechanisms do not replace real flagship screenshots, recordings, customer evidence, or product maturity records.

### Protected publication recovery

- The PDF, EPUB, self-contained HTML, sales page, cover, archive, and protected publication sources remain tracked in Git and checksum-pinned.
- `scripts/restore_protected_publication.py` restores only missing protected files from the current `HEAD`.
- Existing and locally modified files are never overwritten.
- `npm run book:restore` is available for explicit recovery.
- `book:validate` automatically restores missing protected files before cleanup, freshness, manuscript, and package checks.
- The repository's own cleanup remains allowlisted to `.next/` and `out/`; restoration protects against unrelated system cleanup tools that delete tracked publication outputs.

### Local release workflow

- `npm run site:local` runs lock reproduction, source validation, the production build, the local HTTP smoke test, and all hydrated browser verification layers.
- `npm run site:serve` serves the generated `out/` directory through the same dependency-free Node static server used by release checks.
- `scripts/smoke_local_export.mjs` checks actual HTTP resolution and required content across Home, Experience, Services, Contact, Work, Systems, Proof, Book, Sample, Product Lab, and `build-info.json`.
- `scripts/lib/static_export_server.mjs` is the one reusable server implementation for preview and verification.
- `docs/LOCAL_RELEASE_RUNBOOK.md` contains setup, protected-publication recovery, development, source/HTTP/browser verification, preview, Cloudflare authentication, deployment provenance, post-deployment checks, and manual transaction tests.

### Hydrated browser verification

- `scripts/browser_release_test.mjs` verifies core desktop/mobile routes, loaded visuals, accessibility basics, responsive overflow, pricing, Contact, book conversion, mobile navigation, and product-lab initialization or fallback.
- `scripts/browser_deep_release_test.mjs` verifies theme persistence, route-aware global CTAs, FormBold source/mode values, Cal.com attribution, shared Book/Services region choice, mobile Escape/focus restoration, and native machine-resource delivery.
- `scripts/browser_capability_lab_test.mjs` edits and reruns extraction, adjusts image cleanup, measures the visual edge map, changes spatial visibility from 50% to 100%, and verifies desktop/mobile containment.
- Chrome is launched directly through the Chrome DevTools Protocol without adding a browser automation package to the shipped application.
- Temporary Chrome profiles are deleted only after the browser process releases them.
- Browser screenshots and machine-readable reports are retained as CI evidence and ignored as local generated output.
- CI cannot publish a green canonical release status unless source validation, HTTP smoke testing, baseline browser verification, deep browser verification, and capability verification all pass.

### Performance and dependency boundaries

- Removed historical unused runtime packages remain forbidden.
- `package-lock.json` must reproduce exactly in an isolated temporary directory before release.
- The homepage, Systems route, core static export, and self-hosted Three.js runtime have separate measured budgets.
- The Systems route's browser mechanisms remain within the ordinary Next.js route budget; the larger Three.js runtime stays same-origin, lazy-loaded, and separately budgeted.

### Deployment provenance and live checks

- `npm run deploy:guard` requires the current branch to be `main`.
- The working tree must be clean, including untracked files.
- Local `HEAD` must be a full SHA and exactly equal `origin/main`.
- The guard runs before and after the complete release verification so the generated `build-info.json` identifies the actual source being deployed.
- Wrangler's dirty-commit override is explicitly prohibited by the runbook and operating contract.
- `npm run deploy:cloudflare` restores protected files, proves clean pushed source, runs the complete source/HTTP/browser release path, rechecks provenance, and only then publishes `out/`.
- `npm run live:verify` requires the exact deployed SHA, the Working Systems route, the operational-AI route signatures, and the browser-local image CSP.

### Continuous verification

- Main CI runs source validation, the HTTP smoke test, and all hydrated browser layers.
- Manual main-only diagnostics run the same source, HTTP, and browser checks.
- Commit-status publication is non-authoritative and cannot override the actual verification outcome during a transient GitHub API failure.
- Verification logs, browser screenshots/reports, and the generated export remain retained artifacts.

## What cannot be completed from repository source alone

The following are still required before an honest 10/10 production and persuasion claim:

1. Deploy the current verified `main` export to the intended Cloudflare Pages project and make `live-deployment` green.
2. Capture current direct-use screenshots or recordings for SignKit, MetaExtract, EchoPanel, and SentinelTwin, tied to reviewed revisions.
3. Obtain permissioned third-party and customer evidence, including one named paid case where possible.
4. Add an authentic portrait or working-context photograph supplied or approved by Pranay.
5. Align and manually inspect LinkedIn, GitHub profile, X, search snippets, and live social previews.
6. Complete real Role and Commercial form submissions and verify inbox metadata.
7. Complete Cal.com booking, cancellation, rescheduling, and timezone checks.
8. Complete India and global Dodo purchase, tax, invoice, entitlement, PDF/EPUB delivery, support, and refund tests.
9. Run production Safari, Firefox, Edge, iOS, Android, screen-reader, 200%/400% zoom, platform high-contrast, Core Web Vitals, and external security-header checks.
10. Populate the private aggregate outcome ledger from real FormBold, Cal.com, Dodo, hiring, and commercial records without adding behavioral page-view tracking.
11. Test ten-second identity, work-mode, and mechanism-to-product comprehension with target recruiters, founders, technical leaders, and operators.
12. Observe real enquiry, interview, booking, purchase, mechanism-to-case navigation, and qualified-conversation outcomes before claiming conversion success.

## Completion rule

No additional generic redesign, copy polishing, animation, or internal audit should take priority over deployment, direct product evidence, independent human evidence, real production transactions, cross-platform accessibility/performance evidence, and observed visitor behavior. Further source work should be driven by a failed release check, a concrete evidence-capture workflow, production transaction evidence, or measured user comprehension.
