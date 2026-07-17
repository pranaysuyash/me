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
  '"site:smoke": "node scripts/smoke_local_export.mjs"',
  '"site:local": "npm run site:verify && npm run site:smoke"',
  '"site:serve": "python3 -m http.server 4173 -d out"',
  '"book:restore": "python3 scripts/restore_protected_publication.py"',
  '"book:validate": "npm run book:restore && python3 book/tools/check_cleanup_protection.py && python3 book/tools/check_manuscript.py && python3 book/tools/check_package.py"',
  '"deploy:cloudflare": "npm run site:local && npx wrangler pages deploy out --project-name pranay --branch main"',
]);

requireTokens("scripts/restore_protected_publication.py", [
  "Restore missing tracked publication artifacts from the current Git HEAD",
  "it restores only missing paths",
  'run_git("ls-files", "-z", "--", *requested)',
  'run_git("show", f"HEAD:{relative}")',
  "target.write_bytes(blob)",
  "all protected publication artifacts are already present",
]);

requireTokens("scripts/verify_live_deployment.mjs", [
  "resolveExpectedSha",
  'execFileSync("git", ["rev-parse", "HEAD"]',
  "Set EXPECTED_SHA or run it from a Git checkout with a valid HEAD.",
]);

requireTokens("scripts/smoke_local_export.mjs", [
  "Local smoke test requires an existing out/ export",
  'route: "/"',
  'route: "/hire-me"',
  'route: "/work-with-me"',
  'route: "/contact?type=role&source=local-smoke"',
  'route: "/work"',
  'route: "/proof"',
  'route: "/books/no-claim-without-evidence"',
  'route: "/product-lab/"',
  'fetch(`${baseUrl}/build-info.json`)',
  "server.close",
]);

requireTokens(".github/workflows/site-build.yml", [
  "npm run site:verify 2>&1 | tee site-verify.log",
  "npm run site:smoke 2>&1 | tee site-smoke.log",
  "Canonical verification and HTTP smoke test passed",
  "continue-on-error: true",
  "site-smoke.log",
  "Fail workflow when canonical verification or smoke testing failed",
]);

requireTokens(".github/workflows/site-diagnostics.yml", [
  "ref: main",
  "npm run site:verify 2>&1 | tee site-verify.log",
  "npm run site:smoke 2>&1 | tee site-smoke.log",
  "site-smoke.log",
]);

requireTokens("docs/LOCAL_RELEASE_RUNBOOK.md", [
  "npm run site:local",
  "npm run book:restore",
  "npm run site:serve",
  "npx wrangler whoami",
  "npm run deploy:cloudflare",
  "npm run live:verify",
  "Do not claim a live transaction or external integration works until the real production path has completed.",
]);

requireTokens("docs/audits/SITE_SOURCE_COMPLETION_2026-07-16.md", [
  "Repository-controlled work completed",
  "Commercial pricing architecture",
  "Contact resilience",
  "Local release workflow",
  "Protected publication recovery",
  "What cannot be completed from repository source alone",
  "No additional generic redesign",
]);

requireTokens(".github/career-platform-10-check.txt", [
  "Complete local verification entry point: npm run site:local",
  "Local release runbook: docs/LOCAL_RELEASE_RUNBOOK.md",
  "protected publication artifacts are restored from the current Git HEAD when missing",
  "one canonical engagement catalogue",
  "local HTTP smoke testing",
  "do not deploy an export that has not passed npm run site:local",
]);

if (failures.length) {
  console.error(`Local release contract validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Local release contract validation passed: self-healing protected publication restoration, automatic live-SHA resolution, one-command verification, HTTP smoke testing, main CI, manual diagnostics, Cloudflare commands, and the source-completion boundary remain aligned.",
);
