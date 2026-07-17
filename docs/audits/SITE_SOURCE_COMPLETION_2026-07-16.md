# Site source completion — 16 July 2026

## Scope

This record separates repository-controlled site work from evidence and operations that can only be completed against the deployed domain, authenticated third-party services, real products, or permissioned external people.

## Repository-controlled work completed

### Professional identity and audience paths

- One professional identity: product leader and hands-on systems builder.
- Hiring means sustained internal ownership.
- Commercial work means a bounded workflow, system, subsystem, or decision.
- Home, About, Experience, Services, Work, Contact, resumes, machine-readable files, and the GitHub profile use the same distinction.

### Navigation and page length

Accessible horizontal section indexes now cover every long professional page:

- Home;
- About;
- Experience;
- Commercial Engagements;
- Selected Work;
- Proof Ledger;
- No Claim Without Evidence.

Content remains available as normal HTML; navigation does not hide evidence behind accordions or carousels.

### Commercial pricing architecture

- `src/lib/engagements.ts` is the single catalogue for scope, timeline, fit, inclusions, and India/global price books.
- `src/hooks/use-pricing-region.ts` is the single region resolver and persistence layer.
- Cloudflare country detection falls back to browser timezone/language hints.
- Manual region choice is persisted and synchronized across components and tabs.
- Services and Contact use the same engagement IDs and prices.
- Regional prices remain separate price books rather than live exchange-rate conversion.

### Contact resilience

- Contact visibly supports senior roles and bounded commercial engagements.
- JavaScript-enabled submission retains adaptive fields, source attribution, loading, success, and failure states.
- The form has a normal HTML `action` and `method=POST` fallback.
- A `noscript` notice provides separately addressed role and commercial email paths.
- Privacy and sensitive-information warnings remain visible.

### Book experience

- The book page is shorter and section-indexed.
- Sample, thesis, method, audience, pricing, checkout, consulting, delivery, refunds, terms, and privacy boundaries remain present.
- The one-time digital product remains separate from consulting and implementation services.
- Existing Dodo and social-preview claim boundaries are unchanged.

### Protected publication recovery

- The PDF, EPUB, self-contained HTML, sales page, cover, archive, and protected publication sources remain tracked in Git and checksum-pinned.
- `scripts/restore_protected_publication.py` restores only missing protected files from the current `HEAD`.
- Existing and locally modified files are never overwritten.
- `npm run book:restore` is available for explicit recovery.
- `book:validate` automatically restores missing protected files before cleanup, freshness, manuscript, and package checks.
- The repository's own cleanup remains allowlisted to `.next/` and `out/`; restoration protects against unrelated system cleanup tools that delete tracked publication outputs.

### Local release workflow

- `npm run site:local` runs the canonical release contract and a local HTTP smoke test.
- `npm run site:serve` serves the generated `out/` directory on port 4173.
- `scripts/smoke_local_export.mjs` checks actual HTTP resolution and required copy across Home, Experience, Services, Contact, Work, Proof, Book, Product Lab, and `build-info.json`.
- `docs/LOCAL_RELEASE_RUNBOOK.md` contains setup, protected-publication recovery, development, verification, preview, Cloudflare authentication, deployment, post-deployment checks, and manual transaction tests.

### Continuous verification

- Main CI runs `npm run site:verify` and the HTTP smoke test.
- Manual main-only diagnostics run the same build and smoke test.
- Commit-status publication is non-authoritative and cannot override the actual verification outcome during a transient GitHub API failure.
- Verification logs and the generated export remain retained artifacts.

## What cannot be completed from repository source alone

The following are still required before an honest 10/10 production claim:

1. Deploy the current verified `main` export to the intended Cloudflare Pages project and make `live-deployment` green.
2. Capture current direct-use screenshots or recordings for SignKit, MetaExtract, EchoPanel, and SentinelTwin, tied to reviewed revisions.
3. Obtain permissioned third-party and customer evidence.
4. Add an authentic portrait or working-context photograph supplied or approved by Pranay.
5. Align and manually inspect LinkedIn, X, search snippets, and live social previews.
6. Complete real Role and Commercial form submissions and verify inbox metadata.
7. Complete Cal.com booking, cancellation, rescheduling, and timezone checks.
8. Complete India and global Dodo purchase, tax, invoice, entitlement, PDF/EPUB delivery, support, and refund tests.
9. Run production browser, keyboard, screen-reader, zoom, reduced-motion, high-contrast, Core Web Vitals, and security-header testing.
10. Add privacy-respecting conversion measurement only after defining the data boundary and updating the privacy policy.
11. Test ten-second identity and work-mode comprehension with target recruiters, founders, and operators.

## Completion rule

No additional generic redesign, copy polishing, animation, or internal audit should take priority over deployment and external evidence. Further source work should be driven by a failed release check, direct product evidence, production transaction evidence, or observed user behavior.
