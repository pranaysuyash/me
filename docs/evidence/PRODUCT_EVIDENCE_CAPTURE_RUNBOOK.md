# Direct product evidence capture runbook

## Purpose

Workflow maps explain product boundaries. They do not prove the current interface, interaction quality, failure states, or end-to-end product behavior.

This runbook turns the four flagship products into revision-bound visual evidence without exposing customer data, inventing polished states, or calling a simulation result real-world verification.

The canonical asset plan is:

```text
docs/evidence/product-evidence-capture.json
```

The build validates that plan through:

```text
scripts/verify_product_evidence_capture.mjs
```

## Non-negotiable rules

1. Capture the exact reviewed revision or update the audited portfolio revision first.
2. Use synthetic documents, people, signatures, meetings, facilities, and identifiers.
3. Do not hide genuine loading, unsupported, warning, permission, failure, or review states to make the product look more complete.
4. Do not compose a fake interface in Figma or an image editor and call it a screenshot.
5. Cropping, compression, neutral background cleanup, and redaction are allowed. Adding capabilities, values, metrics, controls, or results is not.
6. A screenshot proves only the state visible in the frame. A recording proves only the uninterrupted behavior it visibly exercises.
7. Product screenshots must never inherit claims from the workflow map automatically.
8. A simulated SentinelTwin scene must remain labelled as synthetic/illustrative and must not expose a real security layout.
9. A SignKit visual must describe image extraction and PDF placement, not certified e-signature or identity verification.
10. No file is referenced by `src/lib/portfolio.ts` until its manifest status is `approved`.

## Capture environment

Before each product:

```bash
cd /path/to/product-repository
git status --short
git rev-parse HEAD
```

Required conditions:

- the working tree state is understood;
- the current SHA equals the manifest `sourceRevision`, or the portfolio and manifest are updated to a newly reviewed SHA before capture;
- synthetic fixtures are prepared;
- desktop notifications, account names, API keys, tokens, filesystem paths, recent-file lists, browser profiles, and unrelated applications are hidden;
- the product is run through its normal local setup rather than a one-off mocked screen.

## File format and dimensions

Screenshots:

- preferred format: WebP;
- desktop target: 1600–2200 px wide;
- retain enough resolution for text to remain readable when opened;
- use the native product aspect ratio rather than forcing every surface into 16:9;
- do not add device frames unless the frame helps explain a genuinely native interaction;
- target 80 KB–500 KB after lossless or visually lossless compression.

Recordings:

- MP4 H.264 or WebM;
- 1080p where practical;
- 35–75 seconds, depending on the manifest;
- one uninterrupted core flow;
- cursor visible when it clarifies interaction;
- no background music;
- narration optional, but every spoken claim must be visibly demonstrated;
- trim dead time, not failures that are part of the real flow.

## Destination layout

Create only the directory for the product being captured:

```text
public/assets/projects/signkit/evidence/
public/assets/projects/metaextract/evidence/
public/assets/projects/echopanel/evidence/
public/assets/projects/sentineltwin/evidence/
```

Use filenames exactly as declared in `product-evidence-capture.json`.

## Capture sequence

For every declared asset:

1. Reproduce the `requiredState` in the current product.
2. Capture the screenshot or uninterrupted recording.
3. Apply only permitted crop/compression/redaction.
4. Inspect the final file at 100% zoom.
5. Confirm that the supplied `alt` describes what is visible, not what was intended.
6. Confirm that the `caption` states the claim and boundary supported by the visual.
7. Change manifest status from `planned` to `captured`.
8. Set `captureRevision` to the full product repository SHA.
9. Set `capturedAt` to the calendar date in `YYYY-MM-DD`.
10. Run the portfolio validation.

```bash
npm run portfolio:validate
```

A captured asset remains private to the repository and cannot appear in the public portfolio until approval.

## Approval review

Review each captured asset against five gates.

### 1. Authenticity

- Does this come from the real product at the stated revision?
- Is the flow reproducible?
- Is the screenshot free of invented controls, data, or metrics?

### 2. Privacy and security

- Is every document, person, signature, meeting, and facility synthetic?
- Are usernames, paths, notifications, secrets, and account details absent?
- For SentinelTwin, could the visual help someone exploit a real location? If yes, reject it.

### 3. Claim boundary

- Does the caption claim only what the visual proves?
- Is maturity consistent with `src/lib/portfolio.ts`?
- Does the visual avoid implying production adoption, accuracy, certification, or customer outcomes that are not evidenced?

### 4. Legibility and product judgment

- Can a visitor understand the important state without zooming into decorative chrome?
- Does the image show a decision, review state, exception, or end-to-end result rather than an empty dashboard?
- Does the set demonstrate both capability and operational honesty?

### 5. Accessibility

- Is the alt text specific and concise enough for the image's purpose?
- Is essential meaning also present in nearby page text/caption?
- Does the screenshot avoid using color as the only explanation where the product surface allows alternatives?

Approval outcome:

- `approved`: may be added to `visualEvidence` with `kind: "product-screenshot"`;
- `captured`: file exists but remains unpublished pending review;
- `rejected`: retain the manifest record, state the problem in the commit message or review notes, and recapture rather than editing the defect away.

## Promoting approved evidence

After an asset becomes `approved`, add it to the matching project's `visualEvidence` array in `src/lib/portfolio.ts`.

Example shape:

```ts
{
  src: "/assets/projects/signkit/evidence/03-cleanup-compare.webp",
  alt: "SignKit before and after cleanup view for a synthetic handwritten signature image",
  caption: "Cleanup remains operator-visible so the extracted asset can be corrected before reuse.",
  kind: "product-screenshot",
}
```

Keep the workflow map as an architecture/boundary visual unless the case page has enough direct evidence to make it redundant. Do not replace the map merely because one screenshot exists.

Then run:

```bash
npm run site:local
```

The release will fail when:

- a promoted file is absent;
- a file is too small to be credible evidence;
- capture SHA/date is missing;
- a captured but unapproved file is referenced publicly;
- an approved file is not present in the audited portfolio;
- the public path or filename drifts from the manifest;
- alt, caption, redaction rule, or required state is missing.

## Product-specific acceptance

### SignKit

The full set must show source import, candidate review, visible cleanup, local asset retention, and PDF placement. The recording must make the local-first boundary and non-certified-signature boundary clear.

### MetaExtract

The full set must show mixed-file intake, progress/failure visibility, structured results, provenance/review, and downstream export. At least one unsupported or exception state must remain visible.

### EchoPanel

The full set must show source/permission state, active recording, transcript timeline, search-to-timestamp, and local export. The recording must use scripted audio and must not conceal current system-audio or packaging limitations.

### SentinelTwin

The full set must show the editor, deterministic coverage, a blind-zone/path state, baseline/candidate comparison, and provenance. Every scene must be synthetic; simulation must not be described as verified real-world observation.

## Completion definition

Direct product evidence is complete only when:

- all 20 screenshot states have been captured and reviewed;
- all four core-flow recordings have been captured and reviewed;
- every public visual is bound to a reviewed product SHA;
- every product case contains enough direct evidence to judge both capability and operating boundary;
- workflow maps remain correctly labelled wherever retained;
- the complete site passes `npm run site:local` and the production release path.
