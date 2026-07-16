# Pull request #1–#16 recovery audit

**Repository:** `pranaysuyash/me`  
**Canonical branch:** `main`  
**Audit date:** 16 July 2026  
**Comparison main:** `4ab214c5402b44941a653e2562118c512177270f`  
**Validated recovery head:** `be40e817ebfa0340d4efda7da80bbfa1c14f1d49` (`canonical-site-verify`: success)  
**Status:** complete — all surviving files reviewed in full, every useful item recovered or superseded on `main`, all actionable review threads resolved, all PRs closed, and all audited PR branches deleted

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

No PR branch contained application code that was both absent from and superior to current `main`.

The complete recoverable set was:

- eleven historical marker files, preserved verbatim in the raw archive;
- historical diagnostic workflows, preserved verbatim but not executable;
- a 15-minute diagnostic job timeout, accepted and added to the main-only diagnostic workflow;
- removal of `const interactiveMeshes = [];` from the product lab, already present on `main`;
- review findings that support the main-only architecture and reject PR-triggered or branch-to-main mutation workflows.

No pull-request branch was merged wholesale. Recovery happened intentionally on `main` after file-level and review-level decisions.

## Per-PR ledger

| PR | Head branch | Current-main relation at audit | Full surviving files | Final decision |
| ---: | --- | --- | --- | --- |
| #1 | `career-platform-verification` | Behind by 165; ahead by 0 | None | No recovery needed. PR remained closed; shared branch deleted. |
| #2 | `career-platform-verification` | Diverged; ahead by 1 marker commit, behind by 165 | `.github/career-platform-verification.txt` | Marker preserved verbatim in archive; shared branch deleted. |
| #3 | `career-platform-verification-3` | Diverged; ahead by 1 marker, behind by 161 | `.github/career-platform-verification-3.txt` | Marker preserved; branch deleted. |
| #4 | `career-platform-verification-4` | Diverged; ahead by 1 marker, behind by 160 | `.github/career-platform-verification-4.txt` | Marker preserved; branch deleted. |
| #5 | `career-platform-verification-5` | Diverged; ahead by 1 marker, behind by 158 | `.github/career-platform-verification-5.txt` | Marker preserved; branch deleted. |
| #6 | `career-platform-visual-verification` | Diverged; ahead by 1 marker, behind by 157 | `.github/career-platform-visual-verification.txt` | Marker preserved; branch deleted. |
| #7 | `career-platform-visual-fix-verification` | Diverged; ahead by 1 marker, behind by 143 | `.github/career-platform-visual-fix-verification.txt` | Marker preserved; branch deleted. |
| #8 | `career-platform-final-proof` | Diverged; ahead by 1 marker, behind by 140 | `.github/site-build-check.txt` | Marker preserved; branch deleted. |
| #9 | `career-platform-10-verification` | Diverged; ahead by 13, behind by 108; final surviving surface was 2 files | marker and diagnostic workflow | Existing `PR_9_RECOVERY_AUDIT.md` remains valid. Marker and workflow archived; stronger main contract retained; branch deleted. |
| #10 | `career-platform-quality-verification` | Behind by 82; ahead by 0 | None | No recovery needed; reused branch deleted after #10–#12 review. |
| #11 | `career-platform-quality-verification` | Behind by 81; ahead by 0 | None | No recovery needed; shared branch deleted. |
| #12 | `career-platform-quality-verification` | Behind by 77; ahead by 0 | None | No recovery needed; shared branch deleted. |
| #13 | `career-platform-10-final-verification` | Diverged; ahead by 4, behind by 72 | marker and duplicated diagnostic workflow | Files archived. Duplicated release pipeline and removed Python pruner rejected. Timeout recovered. Review thread resolved. Branch deleted. |
| #14 | `career-platform-canonical-verification` | Diverged; ahead by 2, behind by 70 | marker and PR-triggered diagnostic workflow | Files archived. PR trigger and branch-selectable diagnostics rejected. Timeout recovered. Three threads resolved. PR closed without merge; branch deleted. |
| #15 | `career-platform-d902-verification` | Diverged; ahead by 2, behind by 65 | marker and same PR-triggered diagnostic workflow as #14 | Files archived. Unpinned marker semantics and PR trigger rejected. Timeout recovered. Two threads resolved. PR closed without merge; branch deleted. |
| #16 | `career-platform-final-gate` | Diverged; ahead by 4, behind by 62 | marker, branch diagnostic workflow, direct-main cleanup workflow | All files archived. Scene cleanup already present. Direct-main writer and duplicate status pipeline rejected. Five threads resolved. PR closed without merge; branch deleted. |

## File-level decisions

### Historical markers

All markers are documentation artifacts. Their SHA values are intentionally stale historical references and therefore were not restored as active `.github` truth files. They are preserved verbatim in the raw archive.

### `site-diagnostics.yml`

Current `main` is superior because it:

- is manual and main-only;
- checks out `main` explicitly;
- uses read-only contents permission;
- delegates to the single canonical `npm run site:verify` command;
- retains the verification log and static export;
- does not publish a duplicate canonical status;
- does not reproduce the release pipeline;
- does not call the removed `scripts/prune_web_export.py` path;
- includes the recovered 15-minute timeout.

### `apply-scene-lint-cleanup.yml`

The intended code change—removing one unused `interactiveMeshes` declaration—is present on `main`; repository search and full file inspection show no remaining declaration.

The workflow itself was rejected because it:

- granted `contents: write`;
- ran from a verification branch;
- wrote directly to `main` through the Contents API;
- separated the code mutation from the source being verified;
- could race without concurrency protection;
- bypassed the main-only integration rule.

It is preserved only as a fenced historical artifact.

## Review and thread audit

### PRs without actionable inline threads

#1–#12 except #9 had no actionable inline threads. Submitted reviews were absent or stated that no issues were found. PR #9 had no review submissions or inline threads; its separate recovery audit covers its historical graph.

### PR #13

One thread identified that the duplicated workflow stopped at source validation because the source contract and package script had drifted.

**Final disposition:** valid historical finding. Current main source contracts are aligned, the canonical release is green, the duplicated workflow was rejected, and the thread was resolved.

### PR #14

Three threads:

1. PR-triggered diagnostics would run a known-red contract.  
   **Final disposition:** valid; current main is green and PR triggers are prohibited.
2. Manual diagnostics no longer pinned `main`.  
   **Final disposition:** valid; current main workflow explicitly checks out `main`.
3. Marker SHA did not match the tree actually verified.  
   **Final disposition:** valid; stale marker archived; main uses generated build identity and exact-commit CI.

All three threads were resolved after the green recovery build.

### PR #15

Two threads:

1. Marker claimed `d902...` while checkout verified a merge or selected ref.  
   **Final disposition:** valid; marker archived and active verification uses exact commits.
2. PR diagnostic could not pass because the source contract was stale.  
   **Final disposition:** valid historically; fixed on main and the green recovery build proves resolution.

Both threads were resolved.

### PR #16

Five threads:

1. Verification branch writes directly to `main`.  
   **Final disposition:** valid P1; writer workflow rejected entirely.
2. Duplicate direct-main mutation concern from a second reviewer.  
   **Final disposition:** valid; same rejection.
3. Status publication could fail a successful verification.  
   **Final disposition:** valid for the branch workflow; current manual diagnostics do not publish duplicate status.
4. Unused `issues: write`.  
   **Final disposition:** valid; current workflow does not grant it.
5. Writer has no concurrency protection.  
   **Final disposition:** valid but made moot by rejecting the writer rather than hardening an unnecessary mutation pipeline.

All five threads were resolved after the safer architecture passed canonical validation.

## Motto v3 review

### Pass 1 — correctness and completeness

- Enumerated PRs #1–#16, open and closed.
- Enumerated every surviving changed filename.
- Read every surviving file in full.
- Inspected every review submission and inline thread state.
- Compared every PR head with current `main`.
- Preserved every document, marker, and rejected workflow as an artifact.

### Pass 2 — long-term architecture

- Preserved historical information without restoring stale active configuration.
- Kept one canonical release command.
- Kept one main-only diagnostic workflow.
- Rejected shadow CI, duplicate pipelines, stale SHA markers, and branch-triggered writers.
- Accepted the bounded timeout improvement.
- Added an executable PR recovery contract to prevent regression.

### Pass 3 — supervision and cleanup completion

Completed:

- added the timeout to main diagnostics;
- bound the audit and raw archive into the quality contract;
- obtained a green canonical release on the recovery head;
- resolved all eleven actionable review threads;
- closed #14–#16 without merging stale branches;
- verified zero open PRs;
- deleted all thirteen known PR head branches;
- verified every deleted branch by requesting `package.json` at the ref and receiving GitHub's `No commit found for the ref` response;
- removed the one-time branch-cleanup workflow from `main`.

## Deleted branch set

The following refs were deleted and directly verified absent:

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

`main` was never deleted or force-moved during cleanup.

## Continuing operating rule

- Work directly on `main`.
- Do not create pull requests or verification branches for this repository.
- Before any historical branch or PR is removed, preserve superior code and every document/artifact on `main`.
- Keep active workflows least-privileged, main-only, and delegated to one canonical validation command.
