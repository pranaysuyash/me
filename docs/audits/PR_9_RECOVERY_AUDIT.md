# Pull request 9 recovery audit

Status: recovered and superseded on `main`

Reviewed pull request: `#9` — **Verify expanded 10/10 career platform contract**

This document records why the pull request was closed without merging, what was recovered, what was deliberately rejected, and which `main` files are now canonical.

## Repository graph reviewed

- Pull-request merge base: `bcb3f4a6ee60d1ebe1cd3ec05fd7308336622626`
- First pull-request commit: `4030218657a9f25bd591d20c25fc4866d73d94e9`
- Final pull-request head: `7033defaeb61eead30cc957c474941734ab81351`
- Final `main` source used by GitHub's synthetic merge: `d1173b56a84150bcb8103c3cabc49b9d67fe4511`
- Synthetic merge commit tested by GitHub Actions: `1cf91458abdd4015a3e66f1a438f16889704d51b`
- Pull-request history length: 13 commits from the merge base, with 12 descendants after the first pull-request commit

Two independent graph comparisons were reviewed:

1. Merge base to final pull-request head
2. First pull-request commit to final pull-request head

Both resolve to the same surviving change surface: one verification marker and one diagnostic workflow. GitHub's synthetic merge commit against the then-current `main` also contains only those two file patches.

## Complete surviving file inventory

| Pull-request path | Pull-request intent | Decision on `main` |
| --- | --- | --- |
| `.github/career-platform-10-check.txt` | Record a source revision and broad verification scope | Replaced with a durable quality contract that names `main` as canonical, avoids stale hard-coded source revisions, and requires recovery of any superior PR-only work before closure |
| `.github/workflows/site-diagnostics.yml` | Re-run the release sequence and upload diagnostics | Replaced with a manual, `main`-only diagnostic workflow that calls the single canonical `npm run site:verify` entry point and retains its log and static export |

No application source, product copy, conventional documentation, visual asset, test, or release script remained unique in the final pull-request change set.

## Why the pull-request workflow was not merged

The PR workflow reproduced the release pipeline step by step instead of delegating to the canonical repository command. That creates two definitions of release readiness that can drift.

The pull-request workflow also called `python3 scripts/prune_web_export.py`. That duplicate pruning path was later removed from `main`; the canonical build lifecycle uses the Node-based post-build checks and the established export-pruning path.

The final pull-request runs were not green:

- `Site build` run `#223` failed during career and portfolio source validation.
- `Site diagnostics` run `#12` failed during source-contract validation before publication validation or static export.
- The diagnostic workflow then attempted to upload a build log that had never been created because the build step was skipped.

Therefore the PR was not evidence of a clean release. It was evidence that the source contract and lifecycle commands had drifted.

## Recovery and improvement on `main`

The following `main` commits carried forward the useful intent while removing the structural problems:

- `873d48511fdda95be9397d51eb014b042bc7631b` — preserved and expanded the career-platform quality contract.
- `35e27d04a18002c8fb218bafa43d507f749d2564` — added a manual `main`-only diagnostic workflow using the canonical validation command.
- `b0f8ff366f1db43aff178ead791d9b1a29df466f` — restored one canonical web-export pruning path.
- `eb65f3dcb16fb221ea2e3a1403e52dd0f4980c51` — removed the duplicate Python pruner.
- `d902eef942a3b99afdcb071c4eb7f1faf90c5ed4` — made ESLint part of the canonical release gate.
- `b83eb2c4597701af12c0e7d4b9457a94dc3ef362` — added portable product-lab syntax validation.

The canonical release command is now responsible for linting, TypeScript, portfolio contracts, publication validation, the production build, exported-site checks, and product-lab syntax.

## Historical-work conclusion

The 13-commit count must not be interpreted as 13 independent product improvements. It represents the pull-request history, while the final recoverable branch surface is two files. Equally, the count must not be dismissed without review: both files contained useful intent and were preserved in stronger, non-duplicative forms on `main`.

The correct disposition is:

- do not merge pull request `#9`
- retain the stronger quality contract on `main`
- retain one manual diagnostic workflow on `main`
- use one canonical release command
- preserve this audit as the durable recovery record

## Operating rule going forward

All portfolio work is performed directly on `main`. No new pull request is used as a work queue or verification mechanism. If an old PR is discovered, its complete final diff, graph relationship, run history, documents, and failure evidence must be reviewed before closure. Any missing or superior artifact is recovered to `main`; duplicate or weaker implementations are documented and rejected.