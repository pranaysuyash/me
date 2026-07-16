# Pull request #1–#16 recovery audit

**Repository:** `pranaysuyash/me`  
**Canonical branch:** `main`  
**Audit date:** 16 July 2026  
**Comparison main:** `4ab214c5402b44941a653e2562118c512177270f`  
**Status:** all surviving files reviewed in full; recovery and cleanup in progress

## Mandate

All portfolio work belongs directly on `main`. No pull request may remain a shadow source of truth. Before closing or deleting a PR branch:

1. inspect every changed file in full;
2. compare the branch head with current `main`, not only its original base;
3. inspect review submissions and inline thread state;
4. carry forward every superior code path;
5. preserve every document or marker even when only historically relevant;
6. preserve rejected workflows as non-executable artifacts;
7. validate current `main` before cleanup;
8. close obsolete PRs and delete their branches.

The verbatim surviving files are preserved at:

`docs/audits/pr-artifacts/PR_1_16_FILE_ARCHIVE.md`

## Executive finding

No PR branch contains application code that is both absent from and superior to current `main`.

The complete recoverable set is:

- eleven historical marker files, preserved verbatim in the raw archive;
- historical diagnostic workflows, preserved verbatim but not executable;
- a 15-minute diagnostic job timeout, accepted as the only workflow improvement not already present;
- removal of `const interactiveMeshes = [];` from the product lab, already present on `main`;
- review findings that support the main-only architecture and reject PR-triggered or branch-to-main mutation workflows.

## Per-PR ledger

| PR | Head branch | Current-main relation at audit | Full surviving files | Decision |
| ---: | --- | --- | --- | --- |
| #1 | `career-platform-verification` | Behind by 165; ahead by 0 | None | No recovery needed. Preserve PR metadata in this ledger. Close state already correct; delete branch. |
| #2 | `career-platform-verification` | Diverged; ahead by 1 marker commit, behind by 165 | `.github/career-platform-verification.txt` | Preserve marker verbatim in archive; no executable recovery. Delete shared stale branch after all PRs using it are closed. |
| #3 | `career-platform-verification-3` | Diverged; ahead by 1 marker, behind by 161 | `.github/career-platform-verification-3.txt` | Preserve marker; delete branch. |
| #4 | `career-platform-verification-4` | Diverged; ahead by 1 marker, behind by 160 | `.github/career-platform-verification-4.txt` | Preserve marker; delete branch. |
| #5 | `career-platform-verification-5` | Diverged; ahead by 1 marker, behind by 158 | `.github/career-platform-verification-5.txt` | Preserve marker; delete branch. |
| #6 | `career-platform-visual-verification` | Diverged; ahead by 1 marker, behind by 157 | `.github/career-platform-visual-verification.txt` | Preserve marker; delete branch. |
| #7 | `career-platform-visual-fix-verification` | Diverged; ahead by 1 marker, behind by 143 | `.github/career-platform-visual-fix-verification.txt` | Preserve marker; delete branch. |
| #8 | `career-platform-final-proof` | Diverged; ahead by 1 marker, behind by 140 | `.github/site-build-check.txt` | Preserve marker; delete branch. |
| #9 | `career-platform-10-verification` | Diverged; ahead by 13, behind by 108; final surviving surface is 2 files | marker and diagnostic workflow | Existing `PR_9_RECOVERY_AUDIT.md` remains valid. Marker and workflow are archived. Current main contract and main-only diagnostics are superior. Delete branch. |
| #10 | `career-platform-quality-verification` | Behind by 82; ahead by 0 | None | No recovery needed; delete branch after #11/#12 review because the branch was reused. |
| #11 | `career-platform-quality-verification` | Behind by 81; ahead by 0 | None | No recovery needed; shared branch deletion handled once. |
| #12 | `career-platform-quality-verification` | Behind by 77; ahead by 0 | None | No recovery needed; shared branch deletion handled once. |
| #13 | `career-platform-10-final-verification` | Diverged; ahead by 4, behind by 72 | marker and duplicated diagnostic workflow | Preserve files. Reject duplicated release pipeline and removed Python pruner. Accept only the timeout concept. Delete branch. |
| #14 | `career-platform-canonical-verification` | Diverged; ahead by 2, behind by 70 | marker and PR-triggered diagnostic workflow | Preserve files. Reject PR trigger and branch-selectable manual diagnostics. Accept timeout. Delete branch. |
| #15 | `career-platform-d902-verification` | Diverged; ahead by 2, behind by 65 | marker and same PR-triggered diagnostic workflow as #14 | Preserve files. Reject unpinned/stale verification semantics and PR trigger. Accept timeout. Delete branch. |
| #16 | `career-platform-final-gate` | Diverged; ahead by 4, behind by 62 | marker, branch diagnostic workflow, direct-main cleanup workflow | Preserve all files. Cleanup result already exists on main. Reject branch-triggered writer and duplicate status pipeline. Accept timeout. Close PR and delete branch. |

## File-level decisions

### Historical markers

All markers are documentation artifacts. Their SHA values are intentionally stale historical references and therefore must not be restored as active `.github` truth files. They are preserved verbatim in the raw archive.

### `site-diagnostics.yml`

Current `main` is superior because it:

- is manual and main-only;
- checks out `main` explicitly;
- uses read-only contents permission;
- delegates to the single canonical `npm run site:verify` command;
- retains the verification log and static export;
- does not publish a duplicate canonical status;
- does not reproduce the release pipeline;
- does not call the removed `scripts/prune_web_export.py` path.

The 15-minute job timeout from PRs #13–#16 is a valid bounded-runtime improvement and must be added to the main-only workflow.

### `apply-scene-lint-cleanup.yml`

The intended code change—removing one unused `interactiveMeshes` declaration—is already present on `main`; repository search and full file inspection show no remaining declaration.

The workflow itself is rejected because it:

- grants `contents: write`;
- runs from a verification branch;
- writes directly to `main` through the Contents API;
- separates the code mutation from the source being verified;
- can race without concurrency protection;
- bypasses the main-only integration rule.

It is preserved only as a fenced historical artifact.

## Review and thread audit

### PRs without actionable inline threads

#1–#12 except #9 have no actionable inline threads. Submitted reviews are absent or state that no issues were found. PR #9 has no review submissions or inline threads; its separate recovery audit covers its historical graph.

### PR #13

One unresolved thread identified that the duplicated workflow stopped at source validation because the source contract and package script had drifted. Disposition:

- valid historical finding;
- current main source contract is aligned;
- current exact-commit canonical release is green;
- duplicated workflow is rejected rather than repaired.

### PR #14

Three unresolved threads:

1. PR-triggered diagnostics would run a known-red contract.  
   **Disposition:** valid; current main is green and PR triggers are prohibited.
2. Manual diagnostics no longer pinned `main`.  
   **Disposition:** valid; current main workflow explicitly checks out `main`.
3. Marker SHA did not match the tree actually verified.  
   **Disposition:** valid; stale marker archived; main uses generated build identity and exact-commit CI.

### PR #15

Two unresolved threads:

1. Marker claimed `d902...` while checkout verified a merge or selected ref.  
   **Disposition:** valid; marker archived and active verification uses exact commits.
2. PR diagnostic could not pass because the source contract was stale.  
   **Disposition:** valid historically; fixed on main and current green release proves resolution.

### PR #16

Five unresolved threads:

1. Verification branch writes directly to `main`.  
   **Disposition:** valid P1; writer workflow rejected entirely.
2. Duplicate direct-main mutation concern from a second reviewer.  
   **Disposition:** valid; same rejection.
3. Status publication could fail a successful verification.  
   **Disposition:** valid for the branch workflow; current manual diagnostics do not publish duplicate status.
4. Unused `issues: write`.  
   **Disposition:** valid; current workflow does not grant it.
5. Writer has no concurrency protection.  
   **Disposition:** valid but made moot by rejecting the writer rather than hardening an unnecessary mutation pipeline.

## Motto v3 review

### Pass 1 — correctness and completeness

- Enumerated PRs #1–#16, open and closed.
- Enumerated every surviving changed filename.
- Read every surviving file in full.
- Inspected review submissions and inline thread state.
- Compared every PR head with current `main`.

### Pass 2 — long-term architecture

- Preserved historical information without restoring stale active configuration.
- Kept one canonical release command.
- Kept one main-only diagnostic workflow.
- Rejected shadow CI, duplicate pipelines, stale SHA markers, and branch-triggered writers.
- Accepted only the bounded timeout improvement.

### Pass 3 — supervision and cleanup readiness

Before cleanup is complete:

- add the timeout to main diagnostics;
- bind this audit and raw archive into the quality contract;
- obtain a green canonical release on the final main head;
- resolve the eleven actionable review threads with these dispositions;
- close #14–#16 without merging stale branches;
- delete all known PR head branches;
- verify no open PR remains and no known PR head ref remains fetchable.

## Known branch cleanup set

Deduplicated branch refs:

1. `career-platform-verification`
2. `career-platform-verification-3`
3. `career-platform-verification-4`
4. `career-platform-verification-5`
5. `career-platform-visual-verification`
6. `career-platform-visual-fix-verification`
7. `career-platform-final-proof`
8. `career-platform-10-verification`
9. `career-platform-quality-verification`
10. `career-platform-10-final-verification`
11. `career-platform-canonical-verification`
12. `career-platform-d902-verification`
13. `career-platform-final-gate`

`main` is not included and must never be deleted or force-moved during cleanup.
