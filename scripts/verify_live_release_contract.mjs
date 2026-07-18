#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    failures.push(`missing live release contract file: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(fullPath, "utf8");
}

function requireTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (!source.includes(token)) {
      failures.push(`${relativePath} missing live release token: ${token}`);
    }
  }
  return source;
}

function forbidTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (source.includes(token)) {
      failures.push(`${relativePath} contains forbidden live release token: ${token}`);
    }
  }
}

requireTokens("scripts/verify_live_deployment.mjs", [
  "EXPECTED_SHA",
  "/build-info.json",
  "career-platform-v2",
  "I turn document-heavy, exception-heavy workflows into AI systems people can review and run.",
  'path: "/systems"',
  "Small enough to inspect. Real enough to operate.",
  "img-src 'self' data: blob:",
  "browser-local upload CSP",
  "/books/no-claim-without-evidence/sample",
  "90-day maximum review window",
  "Live deployment verification failed",
]);

requireTokens("public/_headers", [
  "Content-Security-Policy:",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://formbold.com",
  "frame-src 'self'",
]);

requireTokens("scripts/verify_deploy_source.mjs", [
  'git("branch", "--show-current")',
  'git("rev-parse", "origin/main")',
  'git("status", "--porcelain=v1", "--untracked-files=all")',
  "the working tree is dirty",
  "Generated build identity can truthfully name this SHA",
]);

requireTokens(".github/workflows/live-deployment-audit.yml", [
  "workflow_dispatch:",
  "schedule:",
  "workflow_run:",
  'workflows: ["Site build"]',
  "Check out deployment target",
  "github.event.workflow_run.head_sha",
  "node scripts/verify_live_deployment.mjs 2>&1 | tee live-verify.log",
  "Upload live verification log",
  "live-verify-log-${{ steps.target.outputs.sha }}",
  'context "live-deployment"',
  "Fail when live deployment is stale",
]);
forbidTokens(".github/workflows/live-deployment-audit.yml", [
  "pull_request:",
  "push:",
]);

requireTokens("docs/audits/PORTFOLIO_AUDIT_2026-07-16.md", [
  "Current source platform:",
  "Public custom-domain experience:",
  "Deploy the verified release to the actual custom domain",
  "Replace workflow-map-only proof with direct product-use evidence",
  "Reduce long-page mobile effort",
]);

requireTokens("DEPLOYMENT_GUIDE.md", [
  "Canonical validation command",
  "Live deployment audit",
  "/build-info.json",
  "canonical-site-verify",
  "live-deployment",
  "Cloudflare Pages project",
  "`pranay`",
]);

requireTokens("docs/LOCAL_RELEASE_RUNBOOK.md", [
  "Deployment provenance guard",
  "npm run deploy:guard",
  "Do not bypass this check with Wrangler's `--commit-dirty=true`.",
  "local `HEAD` exactly equals `origin/main`",
]);

requireTokens("src/components/layout/footer.tsx", [
  '{ name: "Build identity", href: "/build-info.json" }',
  "Portfolio evidence reviewed 16 July 2026.",
]);

requireTokens("package.json", [
  '"live:verify": "node scripts/verify_live_deployment.mjs"',
  '"presite:verify": "node scripts/verify_live_release_contract.mjs"',
  '"deploy:guard": "node scripts/verify_deploy_source.mjs"',
]);

if (failures.length) {
  console.error(`Live release contract validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Live release contract validation passed: narrowed route signatures, working systems deployment, browser-local upload CSP, clean pushed-source provenance, deployment identity, exact post-build and daily drift audit, retained diagnostics, durable status, public build identity, current audit record, and Cloudflare handoff are structurally bound to main.",
);
