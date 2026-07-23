# Local verification and Cloudflare release runbook

## Purpose

This is the canonical local and production release sequence for `pranaysuyash/me`.

The repository is main-only. Do not create a branch or pull request for verification. Local validation must reproduce the same release contract used by GitHub Actions, exercise the generated static export over HTTP and in a real browser, and prove that the deployed SHA identifies the exact source being published.

## Prerequisites

- macOS or Linux
- Node.js 22
- npm
- Python 3.12
- `uv` for the local Python environment
- Google Chrome, Chromium, or Microsoft Edge for hydrated browser verification
- Cloudflare Wrangler only for manual deployment recovery

When the browser is installed outside its normal system location, set `BROWSER_EXECUTABLE_PATH` to the executable.

## First-time setup

```bash
cd /path/to/me
git switch main
git pull --ff-only origin main

uv venv .venv
source .venv/bin/activate
uv pip install -r requirements-book.txt

npm ci
```

The Python environment is needed for book validation, generated resume output, build identity, and vendoring the same-origin Three.js runtime. Browser verification uses the installed Chrome-family browser directly and adds no browser-testing dependency to the application bundle.

## Protected publication recovery

The ebook PDF, EPUB, self-contained HTML, sales page, cover, and other protected publication files are tracked in Git and checksum-pinned. They are already backed up by repository history; a second copy inside the same repository would only duplicate large binaries.

If an external system cleanup removes tracked publication files, restore every missing protected file from the current checked-out commit with:

```bash
npm run book:restore
```

`book:validate` and therefore `site:local` run this restore automatically before validation. The recovery script:

- restores only files covered by `cleanup-protection.json`;
- restores only paths that are missing;
- reads exact bytes from the current `HEAD`;
- never overwrites an existing or modified file;
- still runs checksum and package validation immediately afterwards.

The repository's own cleanup command is allowlisted and removes only `.next/` and `out/`:

```bash
npm run clean:safe
npm run clean:safe:apply
```

A system-wide cleanup tool should also exclude this repository's tracked `dist/`, `book/`, and `public/books/no-claim-without-evidence/` paths, but the restore command protects local verification even when that exclusion is missing.

## Normal local development

```bash
cd /path/to/me
git switch main
git pull --ff-only origin main
source .venv/bin/activate
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Complete local release verification

```bash
npm run site:local
```

This runs:

1. zero-warning ESLint over authored source, excluding generated vendor/build surfaces;
2. strict TypeScript;
3. positioning and PR-recovery contracts;
4. audited portfolio, freshness, experience, pricing, accessibility, and contrast checks;
5. workflow-library source, deep-link, acquisition-path, and starter contracts;
6. restoration and validation of protected publication files;
7. generated resume, build identity, and same-origin Three.js vendoring;
8. the production Next.js static export;
9. visual-evidence, page-budget, route, policy, checkout-copy, redirect, sitemap, and internal-link checks;
10. product-lab module syntax validation;
11. an HTTP smoke test across the professional, commercial, workflow, proof, book, sample, and product-lab routes;
12. dependency-free headless Chrome verification of hydrated desktop and mobile pages, regional pricing interaction, workflow recommendations, contact-mode switching, mobile navigation, responsive overflow, accessibility basics, runtime errors, and direct book conversion.

Browser screenshots and machine-readable reports are written to the ignored local directory:

```text
browser-artifacts/
```

A successful run leaves the deployable export in `out/`.

The individual browser command is:

```bash
npm run site:browser
```

## Inspect the generated site manually

```bash
npm run site:serve
```

Then open:

```bash
open http://127.0.0.1:4173
open http://127.0.0.1:4173/hire-me
open http://127.0.0.1:4173/work-with-me
open http://127.0.0.1:4173/workflows
open 'http://127.0.0.1:4173/workflows?input=spatial&priority=simulation&path=live'
open 'http://127.0.0.1:4173/contact?type=role&source=local-review'
open 'http://127.0.0.1:4173/contact?type=project&source=local-review'
open http://127.0.0.1:4173/work
open http://127.0.0.1:4173/systems
open http://127.0.0.1:4173/proof
open http://127.0.0.1:4173/books/no-claim-without-evidence
open http://127.0.0.1:4173/books/no-claim-without-evidence/sample
open http://127.0.0.1:4173/product-lab/
open http://127.0.0.1:4173/build-info.json
```

Stop the server with `Ctrl+C`.

## Deployment provenance guard

A manual release must come from clean, pushed `main`. Before deployment, the guard checks:

- the current branch is `main`;
- the working tree has no tracked or untracked changes;
- local `HEAD` is a full SHA;
- local `HEAD` exactly equals `origin/main`.

Run it directly with:

```bash
npm run deploy:guard
```

Do not bypass this check with Wrangler's `--commit-dirty=true`. A dirty export could contain bytes that are not represented by `build-info.json`, which would invalidate the site's evidence and provenance claims.

## Automated production deployment

The normal production path is repository-driven:

1. push the intended release to `main`;
2. **Site build** validates the exact commit and uploads `verified-static-site-<sha>`;
3. **Cloudflare production deploy** downloads that exact artifact rather than rebuilding;
4. the workflow verifies `out/build-info.json` against the source SHA;
5. the artifact is deployed to the Cloudflare Pages project `pranay`;
6. the custom domain is checked against the exact SHA;
7. deployment metadata and the live-verification log are retained;
8. `canonical-site-verify`, `cloudflare-deployment`, and `live-deployment` are published on the source commit.

Configure these GitHub Actions repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Use a Cloudflare API token scoped to the intended account and the Pages deployment access required by `pranay`. Never commit either value.

A missing or invalid secret is an explicit deployment failure. It must not silently fall back to assuming Cloudflare Git integration deployed the site.

## Manual Cloudflare authentication check

Manual recovery uses the locally authenticated Wrangler account:

```bash
npx wrangler whoami
```

If Wrangler is not authenticated:

```bash
npx wrangler login
npx wrangler whoami
```

Confirm that the authenticated account owns the intended Pages project named `pranay` before deploying.

## Manual production fallback

Use manual deployment only when the automated path cannot be repaired immediately.

Pull and confirm the pushed main commit:

```bash
git pull --ff-only origin main
git rev-parse HEAD
```

Then run:

```bash
npm run deploy:cloudflare
```

The command restores missing protected publication files, proves the source tree is clean and pushed, runs the full source/HTTP/browser release contract, proves the tree is still clean, and only then calls:

```bash
wrangler pages deploy out --project-name pranay --branch main
```

After a manual fallback, run the live audit and confirm the custom domain. Do not leave the automated deployment path broken merely because one manual upload succeeded.

## Post-deployment verification

```bash
EXPECTED_SHA="$(git rev-parse HEAD)" npm run live:verify
```

Also inspect the deployed build identity:

```bash
curl --fail --silent --show-error https://pranaysuyash.com/build-info.json | python3 -m json.tool
```

The deployed `commit` must equal the clean pushed commit that was verified and deployed.

Check the important routes:

```bash
for route in \
  / \
  /hire-me \
  /work-with-me \
  /workflows \
  /contact \
  /work \
  /systems \
  /proof \
  /books/no-claim-without-evidence \
  /books/no-claim-without-evidence/sample \
  /product-lab/ \
  /build-info.json
do
  curl --fail --silent --show-error --output /dev/null \
    --write-out '%{http_code} %{url_effective}\n' \
    "https://pranaysuyash.com${route}"
done
```

The scheduled **Live deployment audit** is a drift detector. It checks current `main` once per day and does not replace post-deployment verification.

## Manual production transactions

Commands and synthetic browser checks cannot prove third-party transactions. After deployment, complete these manually with real destinations and reversible test data:

1. Submit the Role form and confirm inbox delivery with `mode=role` and the correct `source`.
2. Submit the Commercial form and confirm inbox delivery with `mode=project`, timeline, engagement scope, and any selected workflow context.
3. Complete a 15-minute and a 30-minute Cal.com booking; verify timezone, confirmation, cancellation, and rescheduling.
4. Complete India and global Dodo checkout paths; verify price, tax, invoice/receipt, PDF and EPUB entitlement, delivery, support, and refund behavior.
5. Verify the custom domain, apex/`www` mapping, social previews, and all three GitHub commit statuses.

## Main-only operating rule

- Work directly on `main`.
- Do not create verification branches or pull requests.
- Do not deploy an export that did not pass `npm run site:local` or the canonical **Site build**.
- Do not deploy from dirty or unpushed source.
- Do not rebuild between canonical verification and automated deployment.
- Do not claim a live transaction or external integration works until the real production path has completed.
