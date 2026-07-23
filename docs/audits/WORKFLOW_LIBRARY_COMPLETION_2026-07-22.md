# Interactive workflow library completion — 22 July 2026

## Decision

The portfolio now separates four related but non-interchangeable surfaces:

1. `/workflows` — choose a workflow and the desired acquisition path;
2. `/systems` — operate narrow browser-contained mechanisms;
3. `/work` — inspect audited product maturity and implementation evidence;
4. `/document-workflows` and `/work-with-me` — review focused commercial offers and engagement boundaries.

This avoids forcing a visitor to infer the difference between a downloadable artefact, a live mechanism, a product case, a consultation, and a custom build.

## User-facing behaviour

A visitor can choose:

- source material:
  - documents and records;
  - images and signatures;
  - meetings and audio;
  - scenes and spaces;
- operating priority:
  - evidence and review;
  - local privacy;
  - search and retrieval;
  - simulation and comparison;
  - operator speed;
- desired next step:
  - download a starter;
  - try a live mechanism where one exists;
  - review an audited case;
  - scope a custom build;
  - book a consultation.

The recommendation is deterministic and browser-side. It does not send the selection to a model and does not collect behavioural page-view history.

## Canonical workflow families

1. Evidence-linked document extraction
2. Local signature and document handling
3. Visual evidence inspection
4. Spatial visibility and coverage review
5. Meeting capture and searchable retrieval

Each record defines:

- the operating problem;
- ideal use case;
- source type and priority tags;
- workflow stages;
- expected outputs;
- starter download;
- live mechanism where available;
- audited case;
- custom-project path;
- consultation path;
- explicit claim boundary.

## Downloadable starters

The following direct, ungated Markdown files ship with the static site:

- `public/workflows/document-extraction-starter.md`
- `public/workflows/signature-document-starter.md`
- `public/workflows/visual-inspection-starter.md`
- `public/workflows/spatial-coverage-starter.md`
- `public/workflows/meeting-capture-starter.md`

Each contains practical workflow states, contracts, failure/recovery checks, acceptance gates, privacy or trust boundaries, and a scoping packet. They are planning and quality artefacts, not production implementations or guarantees.

## Honest capability boundaries

- EchoPanel has an audited case and starter download but no fabricated live recording mechanism.
- The extraction live mechanism handles a constrained synthetic pattern rather than the complete OCR/layout/model/evaluation stack.
- Signature cleanup does not claim identity verification, certified electronic signing, or legal assurance.
- Visual inspection measures real pixels but does not claim object detection, OCR, segmentation, or semantic understanding.
- Spatial visibility is a two-dimensional line-of-sight mechanism, not the complete SentinelTwin 3D, DORI, temporal, calibration, replay, or optimisation system.

## Conversion paths

The same workflow can lead to different actions without conflating them:

- `Starter` — direct file download, no email gate;
- `Try live` — browser-contained mechanism where available;
- `Case` — current maturity and revision-pinned evidence;
- `Project` — bounded implementation scope with source attribution;
- `Consultation` — workflow clarification and next-decision path.

Project and consultation URLs preserve workflow-specific source identifiers for privacy-minimal aggregate funnel measurement.

## Discovery

The workflow library is linked from:

- primary desktop and mobile navigation;
- footer navigation;
- homepage product-system follow-up links;
- sitemap;
- `public/llms.txt`.

## Release and evidence gates

### Static/source gates

- `scripts/verify_workflow_library.mjs`
  - requires exactly five canonical workflow families;
  - requires all five acquisition paths to be explained separately;
  - validates all acquisition paths and audited/live links;
  - rejects undeclared network, model, or email-gate behaviour;
  - requires substantial starter artefacts with failure, acceptance, and scoping sections;
  - binds navigation, sitemap, and browser evidence.
- `scripts/verify_portfolio_source.mjs` imports the workflow-library validator.
- `scripts/verify_static_budget.mjs`
  - budgets `/workflows` HTML and referenced JavaScript separately;
  - requires all five starter files in the export;
  - keeps the workflow catalogue within the ordinary static-site bundle rather than adding a new runtime dependency.
- `scripts/smoke_local_export.mjs`
  - verifies `/workflows` over HTTP;
  - retrieves every starter file directly;
  - continues to reject the obsolete combined ebook price string and circular sample navigation.

### Hydrated browser gate

`scripts/browser_workflow_library_test.mjs` verifies:

- five workflows on initial load;
- document extraction as the default best match;
- signature handling as the best match for image input plus local privacy;
- workflow-specific project source attribution;
- an honest no-live state for meeting capture;
- direct meeting-starter retrieval;
- no fabricated EchoPanel live mechanism;
- desktop and mobile containment;
- retained screenshots of the actual recommendation and mobile chooser.

### Live gate

`scripts/verify_live_deployment.mjs` requires:

- the exact deployed commit SHA;
- the workflow-library route signature and all five acquisition labels;
- all five substantial starter downloads;
- the existing working-systems CSP and route checks;
- one-region ebook pricing rather than the obsolete combined price line;
- a direct Dodo checkout URL on the reading sample;
- rejection of the old circular sample-navigation copy.

## Verification result

Canonical release `fd075936b14414e8e69089203689cb1042220ae5` passed source, lint, TypeScript, publication protection, build, static budgets, HTTP smoke, baseline/deep browser tests, capability-lab tests, workflow-library browser tests, homepage workflow discovery, and durable documentation checks.

Evidence tier:

- Tier 3 for the static export and integrated browser flows;
- Tier 4 for visual inspection of the retained desktop recommendation and mobile chooser screenshots;
- not Tier 5 until the exact release is deployed and exercised on the custom domain with real visitor and transaction outcomes.

## Remaining production gap

The custom domain currently serves an older release. The obsolete combined ebook price and older reading-sample behaviour observed publicly are therefore deployment drift, not the current source implementation.

Do not claim production parity until:

1. the latest canonical `main` SHA is green;
2. that exact SHA is deployed to Cloudflare Pages;
3. `/build-info.json` reports the same SHA;
4. `npm run live:verify` passes;
5. the custom domain is manually checked for regional book price, direct sample checkout, workflow recommendation, starter downloads, and mobile behaviour.

## Update — 23 July 2026

- Project and Consultation are now presented as separate acquisition paths rather than one combined explainer card.
- The workflow source contract requires all five labels and the five-column wide-screen structure.
- Live verification now fails on the exact obsolete string `₹799 in India · $14.99 elsewhere`.
- Live verification requires `Choose ebook pricing region` on the book page and the Dodo checkout URL on the reading sample.
- Canonical release `6932ccc399075a6bc7a520259b3a5ead23605af8` passed the complete source, build, HTTP, baseline/deep browser, capability-lab, and workflow-library release chain.

## Anything else?

The catalogue should not become an uncontrolled directory of generic templates. Add a workflow family only when it has a distinct operating problem, meaningful starter artefact, honest evidence path, and clear commercial or professional relevance. Real flagship screenshots, permissioned customer evidence, production transactions, cross-platform accessibility checks, and observed conversion outcomes remain higher-priority proof work than adding more catalogue volume.
