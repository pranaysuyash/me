# Release toolchain

Date established: 2026-07-23  
Canonical configuration: `toolchain.json`

## Purpose

Local release verification previously depended on whichever npm and Wrangler versions happened to be active on the operator machine. The same `package-lock.json` passed GitHub Actions but failed local reproduction, and manual Cloudflare deployment used an older Wrangler than the automated path.

The release toolchain is now explicit and shared across local verification, GitHub Actions, lock reproduction, and Cloudflare deployment.

## Canonical versions

```json
{
  "node": "22.16.0",
  "npm": "10.9.2",
  "wrangler": "4.113.0"
}
```

`toolchain.json` is the source of truth. `.nvmrc` mirrors the Node version for local version managers. Scripts read the JSON rather than maintaining separate hidden defaults.

## Local setup

Activate the repository Node version:

```bash
nvm install
nvm use
node --version
```

Install dependencies with the canonical npm without changing the globally installed npm:

```bash
npm exec --yes --package=npm@10.9.2 -- npm ci
```

Validate the active and resolvable toolchain:

```bash
npm run toolchain:verify
```

The check fails when the active Node version differs from `.nvmrc` or canonical npm cannot be resolved exactly.

## Lockfile reproduction

```bash
npm run lock:verify
```

The lock verifier uses npm `10.9.2` inside an isolated temporary directory. It no longer uses ambient npm to decide whether the committed lockfile is stale.

Do not regenerate `package-lock.json` merely because a different global npm produces different bytes. A real lockfile update must be generated and reviewed through the canonical npm version.

## Local Cloudflare deployment

```bash
npm run wrangler:version
npm run wrangler:whoami
npm run deploy:cloudflare
```

`deploy:cloudflare` now performs one controlled sequence:

1. resolve the exact clean pushed `main` SHA;
2. restore protected publication files;
3. run the deployment provenance guard;
4. run the complete source, build, HTTP, and browser release contract with pinned npm;
5. re-run the provenance guard;
6. deploy `out/` with Wrangler `4.113.0` and attach the exact commit SHA;
7. verify the custom domain against that same SHA.

The operator should not need to run `live:verify` separately after a successful command.

## GitHub Actions

The Site build and diagnostics workflows use:

- Node `22.16.0` through `actions/setup-node`;
- npm `10.9.2` through `npm exec --package`;
- immutable full-SHA action references.

The Cloudflare workflow uses Wrangler `4.113.0` through the `wranglerVersion` input and verifies the checked-out `toolchain.json` before deployment.

## Updating a tool version

Treat a toolchain update as a release change, not local maintenance.

1. Review the official release notes and compatibility requirements.
2. Change `toolchain.json`.
3. Update `.nvmrc` when Node changes.
4. Update hard pins in GitHub workflow configuration and package scripts.
5. Update source validators that bind those values.
6. Run lock reproduction with the proposed npm.
7. Run the complete canonical release.
8. Observe the exact resolved versions in GitHub Actions logs.
9. Complete deployment and custom-domain verification separately.

Do not update only one path. Local and CI versions must move together.

## Failure interpretation

- **Toolchain validation fails:** activate/install the version declared in `toolchain.json`.
- **Lock reproduction fails under canonical npm:** the lockfile or manifest genuinely needs review.
- **Wrangler authentication fails:** repair local Cloudflare authentication; do not weaken source guards.
- **Upload passes but live verification fails:** inspect Pages production selection and custom-domain mapping.
- **GitHub automated deployment fails at credentials:** configure the repository secrets; local authentication cannot satisfy GitHub Actions.

## Anything else?

Yes.

- Exact version pins reduce drift but require deliberate update review.
- `npm exec` may download the pinned package when it is absent from the local npm cache, so first use requires network access.
- The application dependency tree remains controlled by `package-lock.json`; npm and Wrangler are release tools, not runtime dependencies shipped to visitors.
- The public build identity proves source SHA, not the tool versions by itself. Retained GitHub logs and deployment metadata remain the toolchain evidence.
