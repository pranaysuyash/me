# PR #1–#16 surviving file archive

**Repository:** `pranaysuyash/me`  
**Canonical branch:** `main`  
**Archive date:** 16 July 2026

This document preserves the complete surviving contents of every file that remained unique on pull-request branches #1 through #16 when they were audited against current `main`.

The archive is deliberately non-executable. Historical workflows are stored in fenced code blocks so obsolete or unsafe automation cannot run. Marker files are preserved verbatim even when their source SHA is stale.

## PR #1 — `career-platform-verification`

No surviving changed files. The PR head equalled its old base commit.

## PR #2 — `.github/career-platform-verification.txt`

```text
Career platform verification trigger
Source head: c5313343b8ec89ebfafb0f646b27674dac44045c
Purpose: run the complete Site build workflow against the current audited career, claim, resume, publication, route, visual-evidence, and interaction contract.
```

## PR #3 — `.github/career-platform-verification-3.txt`

```text
Career platform verification trigger
Source head: b91ad00d6858cdb3aa2a550ae9ca04f5bd6cd9a9
Purpose: execute strict TypeScript, semantic source validation, publication checks, static export, generated resume verification, audited route checks, product-lab checks, and ebook checkout checks.
```

## PR #4 — `.github/career-platform-verification-4.txt`

```text
Career platform verification trigger
Source head: fb18f52bb0d9dcdd727045be07f78146b412cbaa
Purpose: execute strict TypeScript, canonical source validation, publication checks, static export, generated resume verification, audited route checks, product-lab checks, and ebook checkout checks.
```

## PR #5 — `.github/career-platform-verification-5.txt`

```text
Career platform verification trigger
Source head: 86241d0486b9f16d0760bfd18872c08f0cc9c286
Purpose: execute strict TypeScript, canonical source validation, publication checks, static export, generated resume verification, audited route checks, product-lab checks, and ebook checkout checks.
```

## PR #6 — `.github/career-platform-visual-verification.txt`

```text
Career platform visual verification trigger
Source head: 25309fdb369102796530173dc7e13dac97dcfae7
Purpose: run the complete build contract and upload the exact static export for multi-viewport visual QA.
```

## PR #7 — `.github/career-platform-visual-fix-verification.txt`

```text
Career platform visual-fix verification trigger
Source head: 9a561bcb0a027af7966df4b3dc2470c0abe1d395
Purpose: execute strict TypeScript, career and visual source validation, publication checks, static export, postbuild asset verification, generated resume checks, audited route checks, lab checks, and ebook checkout checks.
```

## PR #8 — `.github/site-build-check.txt`

```text
Site build verification marker
Source: c5313343b8ec89ebfafb0f646b27674dac44045c
Runs the complete automated verification workflow for the current main source.
```

## PR #9 — `.github/career-platform-10-check.txt`

```text
Expanded career platform verification
Source: d1173b56a84150bcb8103c3cabc49b9d67fe4511
Checks the complete source, evidence, accessibility, runtime, performance, export, publication, and deployment contract.
```

## PR #9 — `.github/workflows/site-diagnostics.yml`

```yaml
name: Site diagnostics

on:
  pull_request:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  diagnose:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - name: Install Python validation dependency
        run: python -m pip install -r requirements-book.txt
      - name: Install Node dependencies
        run: npm ci
      - name: Type-check
        run: npm run typecheck
      - name: Validate source contracts
        run: npm run portfolio:validate
      - name: Validate book package
        run: npm run book:validate
      - name: Vendor Three.js
        run: python3 scripts/vendor_three.py
      - name: Generate resume
        run: python3 scripts/generate_resume_pdf.py
      - name: Generate build identity
        run: python3 scripts/generate_build_manifest.py
      - name: Export Next.js site without lifecycle hooks
        id: nextbuild
        continue-on-error: true
        run: npx next build > next-build.log 2>&1
      - name: Upload raw build log
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: next-build-log-${{ github.sha }}
          path: next-build.log
          if-no-files-found: error
          retention-days: 1
      - name: Fail when Next build failed
        if: steps.nextbuild.outcome == 'failure'
        run: |
          tail -n 120 next-build.log
          exit 1
      - name: Prune publication-only web assets
        run: python3 scripts/prune_web_export.py
      - name: Verify exported visual evidence
        run: node scripts/verify_exported_visual_evidence.mjs
      - name: Verify static budgets
        run: node scripts/verify_static_budget.mjs
      - name: Verify expanded release contract
        run: node scripts/verify_release_contract.mjs
      - name: Upload diagnostic export
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: diagnostic-static-site-${{ github.sha }}
          path: out
          if-no-files-found: warn
          retention-days: 1
```

## PR #10

No surviving changed files. The PR head was an old `main` commit.

## PR #11

No surviving changed files. The PR head was an old `main` commit.

## PR #12

No surviving changed files. The PR head was an old `main` commit.

## PR #13 — `.github/career-platform-10-final-check.txt`

```text
Final expanded career platform verification
Source: d1173b56a84150bcb8103c3cabc49b9d67fe4511
Run: 2
Checks the complete source, evidence, accessibility, runtime, performance, export, publication, redirect, and deployment contract.
```

## PR #13 — `.github/workflows/site-diagnostics.yml`

```yaml
name: Site diagnostics

on:
  pull_request:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  diagnose:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - name: Install Python validation dependency
        run: python -m pip install -r requirements-book.txt
      - name: Install Node dependencies
        run: npm ci
      - name: Type-check
        run: npm run typecheck
      - name: Validate source contracts
        run: npm run portfolio:validate
      - name: Validate book package
        run: npm run book:validate
      - name: Vendor Three.js
        run: python3 scripts/vendor_three.py
      - name: Generate resume
        run: python3 scripts/generate_resume_pdf.py
      - name: Generate build identity
        run: python3 scripts/generate_build_manifest.py
      - name: Export Next.js site without lifecycle hooks
        id: nextbuild
        continue-on-error: true
        run: npx next build > next-build.log 2>&1
      - name: Upload raw build log
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: next-build-log-${{ github.sha }}
          path: next-build.log
          if-no-files-found: error
          retention-days: 1
      - name: Fail when Next build failed
        if: steps.nextbuild.outcome == 'failure'
        run: |
          tail -n 120 next-build.log
          exit 1
      - name: Prune publication-only web assets
        run: python3 scripts/prune_web_export.py
      - name: Verify exported visual evidence
        run: node scripts/verify_exported_visual_evidence.mjs
      - name: Verify static budgets
        run: node scripts/verify_static_budget.mjs
      - name: Verify expanded release contract
        run: node scripts/verify_release_contract.mjs
      - name: Upload diagnostic export
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: diagnostic-static-site-${{ github.sha }}
          path: out
          if-no-files-found: warn
          retention-days: 1
```

## PR #14 — `.github/career-platform-canonical-verification.txt`

```text
Canonical career platform verification
Source: 35e27d04a18002c8fb218bafa43d507f749d2564
Command: npm run site:verify
```

## PR #14 — `.github/workflows/site-diagnostics.yml`

```yaml
name: Site diagnostics

on:
  pull_request:
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: site-diagnostics-${{ github.ref }}
  cancel-in-progress: true

jobs:
  diagnose:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - name: Check out verification ref
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install book validation dependencies
        run: python -m pip install -r requirements-book.txt

      - name: Install Node dependencies
        run: npm ci

      - name: Run canonical site verification with a retained log
        shell: bash
        run: |
          set -o pipefail
          npm run site:verify 2>&1 | tee site-verify.log

      - name: Upload diagnostic log
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: site-verify-log-${{ github.sha }}
          path: site-verify.log
          if-no-files-found: error
          retention-days: 3

      - name: Upload diagnostic static export
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: diagnostic-static-site-${{ github.sha }}
          path: out
          if-no-files-found: warn
          retention-days: 3
```

## PR #15 — `.github/career-platform-d902-check.txt`

```text
Canonical verification
Source: d902eef942a3b99afdcb071c4eb7f1faf90c5ed4
Command: npm run site:verify
```

## PR #15 — `.github/workflows/site-diagnostics.yml`

This file is byte-for-byte identical to the PR #14 workflow preserved above.

## PR #16 — `.github/career-platform-final-gate.txt`

```text
Canonical release verification
Source: 9c1185951263dd9c07e7126fb387e4b1f73e45d5
Command: npm run site:verify
```

## PR #16 — `.github/workflows/apply-scene-lint-cleanup.yml`

```yaml
name: Apply exact scene lint cleanup

on:
  push:
    branches: [career-platform-final-gate]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  patch:
    runs-on: ubuntu-latest
    steps:
      - name: Remove the one unused declaration on main
        env:
          GH_TOKEN: ${{ github.token }}
        run: |
          python3 - <<'PY'
          import base64
          import json
          import os
          import urllib.request

          repository = os.environ["GITHUB_REPOSITORY"]
          token = os.environ["GH_TOKEN"]
          path = "public/product-lab/scene.js"
          expected_blob = "600aad6f26f7c924af8b34de6a7f09c3513f56d8"
          needle = "const interactiveMeshes = [];\n"
          api = f"https://api.github.com/repos/{repository}/contents/{path}"
          headers = {
              "Accept": "application/vnd.github+json",
              "Authorization": f"Bearer {token}",
              "X-GitHub-Api-Version": "2022-11-28",
              "User-Agent": "career-platform-verification",
          }

          request = urllib.request.Request(f"{api}?ref=main", headers=headers)
          with urllib.request.urlopen(request, timeout=30) as response:
              current = json.load(response)

          if current.get("sha") != expected_blob:
              raise SystemExit(
                  f"refusing patch: expected blob {expected_blob}, found {current.get('sha')}"
              )

          source = base64.b64decode(current["content"]).decode("utf-8")
          if source.count(needle) != 1:
              raise SystemExit(
                  f"refusing patch: expected one unused declaration, found {source.count(needle)}"
              )

          updated = source.replace(needle, "")
          payload = json.dumps(
              {
                  "message": "Remove unused product-lab mesh declaration\n\nMotto-Reviewed: full\nEvidence-Tier: 4\nRisk-Class: low",
                  "content": base64.b64encode(updated.encode("utf-8")).decode("ascii"),
                  "sha": current["sha"],
                  "branch": "main",
              }
          ).encode("utf-8")
          put = urllib.request.Request(api, data=payload, headers=headers, method="PUT")
          with urllib.request.urlopen(put, timeout=30) as response:
              result = json.load(response)

          print(result["commit"]["sha"])
          PY
```

## PR #16 — `.github/workflows/site-diagnostics.yml`

```yaml
name: Verification branch diagnostics

on:
  push:
    branches: [career-platform-final-gate]
  workflow_dispatch:

permissions:
  contents: read
  statuses: write
  issues: write

concurrency:
  group: verification-branch-${{ github.ref }}
  cancel-in-progress: true

jobs:
  verify:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - name: Check out verification source
        uses: actions/checkout@v4

      - name: Upload exact lint source files
        uses: actions/upload-artifact@v4
        with:
          name: lint-source-${{ github.sha }}
          path: |
            public/product-lab/scene.js
            tailwind.config.ts
          if-no-files-found: error
          retention-days: 1

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install publication validation dependencies
        run: python -m pip install -r requirements-book.txt

      - name: Install application dependencies
        run: npm ci

      - name: Run canonical release contract
        id: canonical
        continue-on-error: true
        shell: bash
        run: |
          set -o pipefail
          npm run site:verify 2>&1 | tee site-verify.log

      - name: Publish verification status
        if: always()
        shell: bash
        env:
          GH_TOKEN: ${{ github.token }}
          VERIFY_OUTCOME: ${{ steps.canonical.outcome }}
        run: |
          if [ "$VERIFY_OUTCOME" = "success" ]; then
            STATE="success"
            DESCRIPTION="Canonical npm run site:verify passed"
          else
            STATE="failure"
            DESCRIPTION="Canonical npm run site:verify failed"
          fi

          jq -n \
            --arg state "$STATE" \
            --arg context "canonical-site-verify" \
            --arg description "$DESCRIPTION" \
            --arg target_url "https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}" \
            '{state:$state,context:$context,description:$description,target_url:$target_url}' \
            > status.json

          curl --fail-with-body --silent --show-error \
            -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer $GH_TOKEN" \
            -H "X-GitHub-Api-Version: 2022-11-28" \
            "https://api.github.com/repos/${{ github.repository }}/statuses/${{ github.sha }}" \
            --data-binary @status.json

      - name: Upload exact export and retained log
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: canonical-verification-${{ github.sha }}
          path: |
            site-verify.log
            out
          if-no-files-found: warn
          retention-days: 3

      - name: Fail workflow when canonical verification failed
        if: steps.canonical.outcome == 'failure'
        run: exit 1
```

## Preservation rule

This archive is historical evidence only. Executable behavior must come from current `main`, principally:

- `.github/workflows/site-build.yml`
- `.github/workflows/site-diagnostics.yml`
- `.github/workflows/live-deployment-audit.yml`
- `npm run site:verify`

No archived workflow is authorised to run or mutate the repository.
