# Workflow recommendation persistence and handoff

Date: 2026-07-23

## Problem closed

The workflow chooser previously behaved as an isolated interaction:

- source material, priority, and next-step choices disappeared on refresh;
- a recommendation could not be shared or revisited through its URL;
- project and consultation links retained only a static source label;
- selecting a priority ranked matching workflows first but still described non-matching workflows as matches.

That weakened both visitor continuity and the quality of enquiry attribution.

## Product behavior

`src/components/workflow-library/workflow-library-explorer.tsx` now:

1. validates `input`, `priority`, and `path` query parameters against the canonical workflow option sets;
2. restores valid selections after hydration;
3. removes invalid or default selection parameters instead of preserving stale state;
4. updates the current URL with `history.replaceState`, without navigation, storage, network requests, or behavioral profiling;
5. treats a selected priority as an exact catalogue filter rather than a ranking hint;
6. exposes selected input, priority, and path as testable data attributes;
7. embeds the selected workflow, source material, priority, and acquisition path into the existing `source` parameter for project and consultation links;
8. carries the current best match into the general workflow discussion CTA;
9. distinguishes a general no-match state from the narrower no-live-mechanism state.

Example deep link:

```text
/workflows?input=spatial&priority=simulation&path=live
```

Example project source context:

```text
workflow-library-signature-project--workflow-signature-document-handling--input-images--priority-privacy--path-project
```

## Privacy and measurement boundary

The URL contains only catalogue choices. It does not contain names, email addresses, files, document contents, free text, customer identifiers, or model output.

The chooser still:

- performs no `fetch` or XHR request;
- uses no model or external recommendation service;
- writes no local storage, cookie, fingerprint, or behavioral event;
- requires no email gate;
- relies on the existing Contact form `source` field only after a visitor deliberately follows a project or consultation path.

This improves aggregate enquiry context without changing the site's no-behavioral-tracking claim.

## Verification contract

`scripts/verify_workflow_library.mjs` now requires:

- selected input, priority, and path attributes;
- URL persistence copy and `history.replaceState` behavior;
- exact priority filtering;
- selected-context handoff;
- the existing no-network and no-email-gate boundaries.

`scripts/browser_workflow_library_test.mjs` now exercises:

- default selection state;
- interaction-driven URL updates;
- exact image/privacy matching;
- workflow-specific project attribution;
- honest meeting/live empty state;
- recovery to the meeting starter;
- direct hydration of a spatial/simulation/live deep link;
- desktop and mobile containment.

## Evidence and risk

- Static TypeScript/TSX syntax: checked before commit.
- Node syntax for both verification scripts: checked before commit.
- Repository source and browser tests: bound to the canonical release chain.
- Exact GitHub Actions and deployed-domain behavior: must be taken from the newest final `main` commit, not from the intermediate source commits.

Primary residual risk is browser-history or hydration behavior differing outside the automated Chrome path. Safari, Firefox, Edge, iOS Safari, and Android Chrome remain part of the wider cross-browser closure matrix.

## User, business, and operational value

- User value: recommendations can be bookmarked, shared, refreshed, and revisited without reconstructing the chooser state.
- Business value: deliberate project and consultation enquiries carry the selected workflow context, reducing first-response ambiguity.
- Operational value: source and browser contracts prevent silent regression to approximate filtering, ephemeral state, or unattributed handoff.
