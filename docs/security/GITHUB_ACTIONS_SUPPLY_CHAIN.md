# GitHub Actions supply-chain policy

Date established: 2026-07-23

## Purpose

The portfolio release chain verifies source, creates deployable artifacts, receives Cloudflare credentials, publishes commit statuses, and deploys production. A compromised action in that chain could read release inputs, alter artifacts, misuse repository permissions, or exfiltrate deployment credentials.

Every external action used under `.github/workflows/` therefore follows an immutable-reference policy.

## Required reference format

Each external action must use:

1. an allowlisted upstream repository;
2. a full 40-character commit SHA;
3. a version comment on the same line for maintainability.

Example:

```yaml
uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4
```

A floating branch, major tag, minor tag, or release tag is not accepted by the release contract. Tags can move; the full SHA identifies the exact reviewed action content.

The version comment is documentation only. Execution is controlled by the immutable SHA.

## Current allowlist and reviewed references

| Action | Immutable SHA | Version context | Use |
|---|---|---|---|
| `actions/checkout` | `11d5960a326750d5838078e36cf38b85af677262` | `v4` | Exact source checkout |
| `actions/setup-node` | `49933ea5288caeca8642d1e84afbd3f7d6820020` | `v4` | Node.js 22 setup and npm cache |
| `actions/setup-python` | `a26af69be951a213d495a4c3e4e4022e16d87065` | `v5` | Python 3.12 setup |
| `actions/upload-artifact` | `ea165f8d65b6e75b540449e92b4886f43607fa02` | `v4` | Retained verification and deployment evidence |
| `actions/download-artifact` | `d3f86a106a0bac45b974a628896c90dbdf5c8093` | `v4` | Exact cross-workflow static artifact handoff |
| `cloudflare/wrangler-action` | `9acf94ace14e7dc412b076f2c5c20b8ce93c79cd` | `v3` | Cloudflare Pages production deployment |

These SHAs were observed as the exact upstream resolutions in successful or structurally successful GitHub Actions runs on 2026-07-23. The repository's source verifier independently rejects non-allowlisted action repositories and non-SHA references.

## Privileged workflow boundary

`cloudflare-production-deploy.yml` uses `workflow_run`, repository status writes, deployment writes, and Cloudflare secrets. It may run only when:

- the triggering workflow is **Site build**;
- that workflow concluded successfully;
- the source branch is `main`;
- the triggering repository equals the current repository;
- the artifact identity matches the triggering SHA and release contract.

The repository does not run this privileged path for pull requests or forked content.

## Update process

This repository is main-only and does not rely on Dependabot pull requests for GitHub Action updates.

Use this manual review cadence:

1. review action security advisories and upstream releases at least quarterly;
2. review immediately when GitHub, Cloudflare, or an action maintainer announces a security or runtime migration;
3. resolve the intended release or major tag to its exact upstream commit SHA;
4. verify the SHA belongs to the canonical action repository, not a fork;
5. inspect the release notes and relevant action source changes;
6. update every use of that action plus this table in one coherent change;
7. retain the human-readable version comment;
8. run the canonical source, HTTP, and browser release contract;
9. observe the exact action resolution in the resulting GitHub Actions log;
10. confirm production deployment and custom-domain verification separately.

Do not update only the version comment. Do not copy an unverified SHA from a third-party snippet.

## Enforcement

`scripts/verify_live_release_contract.mjs` scans every YAML workflow and fails when:

- an external action repository is outside the allowlist;
- a reference is not a lowercase full 40-character commit SHA;
- a pinned action lacks a `vN`, `vN.N`, or `vN.N.N` version comment.

This gate runs before the canonical site verification and therefore before a release artifact can be treated as valid.

## Residual risk

Immutable references reduce tag-movement and dependency-substitution risk. They do not prove an action is harmless, guarantee the pinned version has no vulnerability, or replace least-privilege permissions, trusted-trigger boundaries, artifact identity checks, secret scoping, logs, and periodic review.
