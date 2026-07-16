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
  "I turn messy operational workflows into reviewable AI and product systems.",
  "90-day maximum review window",
  "Live deployment verification failed",
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

requireTokens("src/components/layout/footer.tsx", [
  '{ name: "Build identity", href: "/build-info.json" }',
  "Portfolio evidence reviewed 16 July 2026.",
]);

requireTokens("package.json", [
  '"live:verify": "node scripts/verify_live_deployment.mjs"',
  '"presite:verify": "node scripts/verify_live_release_contract.mjs"',
]);

if (failures.length) {
  console.error(`Live release contract validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Live release contract validation passed: deployment identity, route signatures, exact post-build and daily drift audit, retained diagnostics, durable status, public build identity, current audit record, and Cloudflare handoff are structurally bound to main.",
);
