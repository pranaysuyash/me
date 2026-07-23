#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    failures.push(`missing local release source: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(fullPath, "utf8");
}

function requireTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (!source.includes(token)) {
      failures.push(`${relativePath} missing local release token: ${token}`);
    }
  }
  return source;
}

requireTokens("package.json", [
  '"toolchain:verify": "node scripts/verify_toolchain.mjs"',
  '"site:smoke": "node scripts/smoke_local_export.mjs"',
  '"site:browser": "node scripts/browser_release_test.mjs"',
  '"postsite:browser": "node scripts/browser_deep_release_test.mjs && node scripts/browser_capability_lab_test.mjs && node scripts/browser_workflow_library_test.mjs && node scripts/browser_products_test.mjs"',
  '"site:local": "npm run site:verify && npm run site:smoke && npm run site:browser"',
  '"site:serve": "node scripts/serve_static_export.mjs"',
  '"book:restore": "python3 scripts/restore_protected_publication.py"',
  '"book:validate": "npm run book:restore && python3 book/tools/check_cleanup_protection.py && python3 book/tools/check_manuscript.py && python3 book/tools/check_package.py"',
  '"deploy:guard": "node scripts/verify_deploy_source.mjs"',
  '"deploy:cloudflare": "node scripts/deploy_cloudflare.mjs"',
  '"wrangler:version": "npm exec --yes --package=wrangler@4.113.0 -- wrangler --version"',
  '"wrangler:whoami": "npm exec --yes --package=wrangler@4.113.0 -- wrangler whoami"',
]);

requireTokens("toolchain.json", [
  '"node": "22.16.0"',
  '"npm": "10.9.2"',
  '"wrangler": "4.113.0"',
]);
requireTokens(".nvmrc", ["22.16.0"]);
requireTokens("scripts/deploy_cloudflare.mjs", [
  "runPinnedNpm",
  "runPinnedWrangler",
  'runPinnedNpm(["run", "site:local"])',
  'runPinnedNpm(["run", "deploy:guard"])',
  "--project-name=pranay",
  "--commit-hash=",
  "LIVE_VERIFY_ATTEMPTS",
]);

requireTokens(".gitignore", [
  "public/build-info.json",
  "public/pranay-suyash-resume.pdf",
  "public/vendor/three/",
  "browser-artifacts/",
]);

requireTokens("scripts/generate_build_manifest.py", [
  'OUTPUT = ROOT / "public" / "build-info.json"',
  '"releaseContract": "career-platform-v2"',
  "generated public/build-info.json",
]);

requireTokens("scripts/lib/static_export_server.mjs", [
  "resolveStaticExportPath",
  "createStaticExportServer",
  "Static export server requires an existing out/ directory",
  '"cache-control": "no-store"',
  'request.method === "HEAD"',
  'url.pathname === "/cdn-cgi/trace"',
  "LOCAL_TRACE_COUNTRY",
]);

requireTokens("scripts/serve_static_export.mjs", [
  'import { createStaticExportServer } from "./lib/static_export_server.mjs"',
  "Serving the verified static export",
  'process.on("SIGINT", shutdown)',
]);

requireTokens("scripts/restore_protected_publication.py", [
  "Restore missing tracked publication artifacts from the current Git HEAD",
  "it restores only missing paths",
  'run_git("ls-files", "-z", "--", *requested)',
  'run_git("show", f"HEAD:{relative}")',
  "target.write_bytes(blob)",
  "all protected publication artifacts are already present",
]);

requireTokens("scripts/verify_deploy_source.mjs", [
  'git("branch", "--show-current")',
  'git("rev-parse", "origin/main")',
  'git("status", "--porcelain=v1", "--untracked-files=all")',
  "the working tree is dirty",
  "does not match pushed origin/main",
  "Generated build identity can truthfully name this SHA",
]);

requireTokens("scripts/verify_live_deployment.mjs", [
  "resolveExpectedSha",
  'execFileSync("git", ["rev-parse", "HEAD"]',
  "Set EXPECTED_SHA or run it from a Git checkout with a valid HEAD.",
  'path: "/products"',
  "Buy SignKit for $29",
]);

requireTokens("scripts/smoke_local_export.mjs", [
  'import { createStaticExportServer } from "./lib/static_export_server.mjs"',
  'route: "/"',
  'route: "/hire-me"',
  'route: "/work-with-me"',
  'route: "/products"',
  'route: "/workflows"',
  'route: "/contact?type=role&source=local-smoke"',
  'route: "/work"',
  'route: "/proof"',
  'route: "/books/no-claim-without-evidence"',
  'route: "/books/no-claim-without-evidence/sample"',
  'route: "/product-lab/"',
  '`${staticExport.baseUrl}/build-info.json`',
  "await staticExport.close()",
]);

requireTokens("scripts/browser_release_test.mjs", [
  'import { launchChromeCdp } from "./lib/chrome_cdp.mjs"',
  "Runtime.exceptionThrown",
  "Page.captureScreenshot",
  "horizontalOverflow",
  "primeLazyImages",
  "loadedImages",
  "role contact route does not select role mode",
  "India pricing does not appear after selection",
  "reading sample does not lead directly to secure checkout",
  "mobile menu does not expose an accessible modal dialog",
  "expectedProductLabError",
  "WebGL-unavailable product lab hides its fallback",
  'path.join(artifactsDir, "report.json")',
]);
requireTokens("scripts/browser_products_test.mjs", [
  'url: `${staticExport.baseUrl}/products`',
  "products route does not expose exactly two current product cards",
  "SignKit does not expose the direct external Gumroad checkout",
  "future workflow candidates are purchasable or lack the non-sale boundary",
  "mobile products route overflows",
  'path.join(artifactsDir, "products-report.json")',
]);

requireTokens(".github/workflows/site-build.yml", [
  'PINNED_NPM_VERSION: "10.9.2"',
  'node-version: "22.16.0"',
  'npm exec --yes --package="npm@$PINNED_NPM_VERSION" -- npm run site:verify 2>&1 | tee site-verify.log',
  'npm exec --yes --package="npm@$PINNED_NPM_VERSION" -- npm run site:smoke 2>&1 | tee site-smoke.log',
  'npm exec --yes --package="npm@$PINNED_NPM_VERSION" -- npm run site:browser 2>&1 | tee site-browser.log',
  "Source, HTTP, and hydrated browser verification passed",
  "continue-on-error: true",
  "browser-artifacts",
  "Fail workflow when any release verification failed",
]);

requireTokens(".github/workflows/site-diagnostics.yml", [
  "ref: main",
  'PINNED_NPM_VERSION: "10.9.2"',
  'node-version: "22.16.0"',
  'npm exec --yes --package="npm@$PINNED_NPM_VERSION" -- npm run site:verify 2>&1 | tee site-verify.log',
  'npm exec --yes --package="npm@$PINNED_NPM_VERSION" -- npm run site:smoke 2>&1 | tee site-smoke.log',
  'npm exec --yes --package="npm@$PINNED_NPM_VERSION" -- npm run site:browser 2>&1 | tee site-browser.log',
  "browser-artifacts",
]);

requireTokens("docs/LOCAL_RELEASE_RUNBOOK.md", [
  "npm run site:local",
  "npm run site:browser",
  "npm run book:restore",
  "npm run deploy:guard",
  "npm run site:serve",
  "BROWSER_EXECUTABLE_PATH",
  "browser-artifacts/",
  "npm run deploy:cloudflare",
  "Do not bypass this check with Wrangler's `--commit-dirty=true`.",
  "Do not claim a live transaction or external integration works until the real production path has completed.",
]);
requireTokens("docs/RELEASE_TOOLCHAIN.md", [
  "Canonical configuration: `toolchain.json`",
  '"node": "22.16.0"',
  '"npm": "10.9.2"',
  '"wrangler": "4.113.0"',
  "npm run toolchain:verify",
  "npm run deploy:cloudflare",
  "## Anything else?",
]);

requireTokens("docs/audits/SITE_SOURCE_COMPLETION_2026-07-16.md", [
  "Repository-controlled work completed",
  "Commercial pricing architecture",
  "Contact resilience",
  "Local release workflow",
  "Hydrated browser verification",
  "Deployment provenance",
  "Protected publication recovery",
  "What cannot be completed from repository source alone",
  "No additional generic redesign",
]);

requireTokens(".github/career-platform-10-check.txt", [
  "Complete local verification entry point: npm run site:local",
  "Local release runbook: docs/LOCAL_RELEASE_RUNBOOK.md",
  "protected publication artifacts are restored from the current Git HEAD when missing",
  "hydrated desktop and mobile browser verification",
  "clean pushed main deployment provenance",
  "one canonical engagement catalogue",
  "local HTTP smoke testing",
  "do not deploy an export that has not passed npm run site:local",
]);

if (failures.length) {
  console.error(`Local release contract validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Local release contract validation passed: the exact Node/npm/Wrangler toolchain, pinned lock reproduction, self-healing publication restoration, clean pushed-main provenance, product and workflow HTTP/browser verification, ignored generated deployment identity, retained evidence, automatic Cloudflare upload and live-SHA verification, main CI, and diagnostics remain aligned.",
);
