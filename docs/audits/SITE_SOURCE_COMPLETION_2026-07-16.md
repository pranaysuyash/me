# Site source completion — 16 July 2026

## Scope

This record separates repository-controlled site work from evidence and operations that can only be completed against the deployed domain, authenticated third-party services, real products, observed visitors, or permissioned external people.

## Repository-controlled work completed

### Professional identity and audience paths

- One professional identity: product leader and hands-on systems builder.
- Hiring means sustained internal ownership.
- Commercial work means a bounded workflow, system, subsystem, or decision.
- Home, About, Experience, Services, Work, Contact, resumes, and machine-readable files use the same distinction.

### Navigation and page length

Accessible horizontal section indexes cover every long professional or publication page:

- Home;
- About;
- Experience;
- Commercial Engagements;
- Selected Work;
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

### Contact resilience

- Contact visibly supports senior roles and bounded commercial engagements.
- JavaScript-enabled submission retains adaptive fields, source attribution, loading, success, and failure states.
- The form has a normal HTML `action` and `method=POST` fallback.
- A `noscript` notice provides separately addressed role and commercial email paths.
- Privacy and sensitive-information warnings remain visible.

### Book experience

- The book page is shorter and section-indexed.
- The separate sample route is a substantive, typeset online reading experience rather than a synopsis or circular navigation page.
- Excerpts cover the evidence habit, unsupported claims, pipeline diagnosis, release gates, and a reusable ledger.
- The reading sample leads directly to secure checkout while preserving a secondary route back to the book overview.
- Thesis, method, audience, selected regional price, checkout, consulting, delivery, refunds, terms, and privacy boundaries remain present.
- The one-time digital product remains separate from consulting and implementation services.

### Protected publication recovery

- The PDF, EPUB, self-contained HTML, sales page, cover, archive, and protected publication sources remain tracked in Git and checksum-pinned.
- `scripts/restore_protected_publication.py` restores only missing protected files from the current `HEAD`.
- Existing and locally modified files are never overwritten.
- `npm run book:restore` is available for explicit recovery.
- `book:validate` automatically restores missing protected files before cleanup, freshness, manuscript, and package checks.
- The repository's own cleanup remains allowlisted to `.next/` and `out/`; restoration protects against unrelated system cleanup tools that delete tracked publication outputs.

### Local release workflow

- `npm run site:local` runs source validation, the production build, the local HTTP smoke test, and hydrated browser verification.
- `npm run site:serve` serves the generated `out/` directory through the same dependency-free Node static server used by release checks.
- `scripts/smoke_local_export.mjs` checks actual HTTP resolution and required content across Home, Experience, Services, Contact, Work, Proof, Book, Sample, Product Lab, and `build-info.json`.
- `scripts/lib/static_export_server.mjs` is the one reusable server implementation for preview and verification.
- `docs/LOCAL_RELEASE_RUNBOOK.md` contains setup, protected-publication recovery, development, source/HTTP/browser verification, preview, Cloudflare authentication, deployment provenance, post-deployment checks, and manual transaction tests.

### Hydrated browser verification

- `scripts/browser_release_test.mjs` launches an installed Chrome-family browser through the Chrome DevTools Protocol without adding a browser automation package to the shipped application.
- Desktop and mobile pages are rendered after hydration rather than inspected only as source or exported strings.
- The release test exercises audience routing, selected-work evidence, India/global pricing selection, contact-mode switching, the book/sample purchase path, the mobile modal menu, responsive overflow, form labels, image alt text, named links, product-lab fallback, and browser runtime errors.
- Browser screenshots and `report.json` are retained as CI evidence and ignored as local generated output.
- CI cannot publish a green canonical release status unless source validation, HTTP smoke testing, and hydrated browser verification all pass.

### Deployment provenance

- `npm run deploy:guard` requires the current branch to be `main`.
- The working tree must be clean, including untracked files.
- Local `HEAD` must be a full SHA and exactly equal `origin/main`.
- The guard runs before and after the complete release verification so the generated `build-info.json` identifies the actual source being deployed.
- Wrangler's dirty-commit override is explicitly prohibited by the runbook and operating contract.
- `npm run deploy:cloudflare` restores protected files, proves clean pushed source, runs the source/HTTP/browser release path, rechecks provenance, and only then publishes `out/`.

### Continuous verification

- Main CI runs source validation, the HTTP smoke test, and hydrated desktop/mobile browser verification.
- Manual main-only diagnostics run the same source, HTTP, and browser checks.
- Commit-status publication is non-authoritative and cannot override the actual verification outcome during a transient GitHub API failure.
- Verification logs, browser screenshots/report, and the generated export remain retained artifacts.

## What cannot be completed from repository source alone

The following are still required before an honest 10/10 production and persuasion claim:

1. Deploy the current verified `main` export to the intended Cloudflare Pages project and make `live-deployment` green.
2. Capture current direct-use screenshots or recordings for SignKit, MetaExtract, EchoPanel, and SentinelTwin, tied to reviewed revisions.
3. Obtain permissioned third-party and customer evidence.
4. Add an authentic portrait or working-context photograph supplied or approved by Pranay.
5. Align and manually inspect LinkedIn, X, search snippets, and live social previews.
6. Complete real Role and Commercial form submissions and verify inbox metadata.
7. Complete Cal.com booking, cancellation, rescheduling, and timezone checks.
8. Complete India and global Dodo purchase, tax, invoice, entitlement, PDF/EPUB delivery, support, and refund tests.
9. Run production screen-reader, 200%/400% zoom, platform high-contrast, Core Web Vitals, and external security-header checks. Source, local Chrome, keyboard-relevant controls, responsive overflow, reduced-motion, contrast, and release behavior are automated; platform assistive-technology evidence still requires real environments.
10. Add privacy-respecting conversion measurement only after defining the data boundary and updating the privacy policy.
11. Test ten-second identity and work-mode comprehension with target recruiters, founders, and operators.
12. Observe real enquiry, interview, booking, purchase, and qualified-conversation outcomes before claiming commercial conversion success.

## Completion rule

No additional generic redesign, copy polishing, animation, or internal audit should take priority over direct product evidence, independent human evidence, real production transactions, and observed visitor behavior. Further source work should be driven by a failed release check, a concrete evidence-capture workflow, production transaction evidence, or measured user comprehension.
