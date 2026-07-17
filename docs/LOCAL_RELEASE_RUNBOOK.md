# Local verification and Cloudflare release runbook

## Purpose

This is the canonical local command sequence for `pranaysuyash/me`.

The repository is main-only. Do not create a branch or pull request for verification. Local validation should reproduce the same release contract used by GitHub Actions, then exercise the generated static export through HTTP before deployment.

## Prerequisites

- macOS or Linux
- Node.js 22
- npm
- Python 3.12
- `uv` for the local Python environment
- Cloudflare Wrangler only when deploying

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

The Python environment is needed for book package validation, generated resume output, build identity, and vendoring the same-origin Three.js runtime.

## Protected publication recovery

The ebook PDF, EPUB, self-contained HTML, sales page, cover, and other protected publication files are tracked in Git and checksum-pinned. They are already backed up by the repository history; a second copy inside the same repository would only duplicate large binaries.

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

Open:

```text
http://localhost:3000
```

## Complete local release verification

```bash
npm run site:local
```

This runs:

1. zero-warning ESLint;
2. strict TypeScript;
3. positioning and PR-recovery contracts;
4. audited portfolio, freshness, experience, pricing, accessibility, and contrast checks;
5. restoration and validation of protected publication files;
6. generated resume, build identity, and same-origin Three.js vendoring;
7. the production Next.js static export;
8. visual-evidence, page-budget, route, policy, checkout-copy, redirect, sitemap, and internal-link checks;
9. product-lab module syntax validation;
10. a local HTTP smoke test across Home, Experience, Commercial Engagements, Contact, Work, Proof, Book, Product Lab, and `build-info.json`.

A successful run leaves the deployable export in:

```text
out/
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
open 'http://127.0.0.1:4173/contact?type=role&source=local-review'
open 'http://127.0.0.1:4173/contact?type=project&source=local-review'
open http://127.0.0.1:4173/work
open http://127.0.0.1:4173/proof
open http://127.0.0.1:4173/books/no-claim-without-evidence
open http://127.0.0.1:4173/product-lab/
open http://127.0.0.1:4173/build-info.json
```

Stop the server with `Ctrl+C`.

## Cloudflare authentication check

```bash
npx wrangler whoami
```

If Wrangler is not authenticated:

```bash
npx wrangler login
npx wrangler whoami
```

Confirm that the authenticated account owns the intended Pages project named `pranay` before deploying.

## Production deployment

Run local verification first:

```bash
npm run site:local
```

Then deploy the exact generated export:

```bash
npm run deploy:cloudflare
```

The deployment script re-runs the canonical verification before calling:

```bash
wrangler pages deploy out --project-name pranay --branch main
```

## Post-deployment verification

```bash
npm run live:verify
```

Also inspect the deployed build identity:

```bash
curl --fail --silent --show-error https://pranaysuyash.com/build-info.json | python3 -m json.tool
```

The deployed `commit` must equal the commit that was just verified and deployed.

Check the important routes:

```bash
for route in \
  / \
  /hire-me \
  /work-with-me \
  /contact \
  /work \
  /proof \
  /books/no-claim-without-evidence \
  /product-lab/ \
  /build-info.json
do
  curl --fail --silent --show-error --output /dev/null \
    --write-out '%{http_code} %{url_effective}\n' \
    "https://pranaysuyash.com${route}"
done
```

## Manual production transactions

Commands cannot prove third-party transactions. After deployment, complete these manually with real destinations and reversible test data:

1. Submit the Role form and confirm inbox delivery with `mode=role` and the correct `source`.
2. Submit the Commercial form and confirm inbox delivery with `mode=project`, timeline, and engagement ID.
3. Complete a 15-minute and a 30-minute Cal.com booking; verify timezone, confirmation, cancellation, and rescheduling.
4. Complete India and global Dodo checkout paths; verify price, tax, invoice/receipt, PDF and EPUB entitlement, delivery, support, and refund behavior.
5. Verify the custom domain, apex/`www` mapping, social previews, and the `live-deployment` GitHub status.

## Main-only operating rule

- Work directly on `main`.
- Do not create verification branches or pull requests.
- Do not deploy an export that did not pass `npm run site:local`.
- Do not claim a live transaction or external integration works until the real production path has completed.
