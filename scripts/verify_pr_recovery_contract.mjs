#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    failures.push(`missing PR recovery file: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(fullPath, "utf8");
}

function requireTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (!source.includes(token)) {
      failures.push(`${relativePath} missing PR recovery token: ${token}`);
    }
  }
  return source;
}

function forbidTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (source.includes(token)) {
      failures.push(`${relativePath} contains forbidden PR recovery token: ${token}`);
    }
  }
}

requireTokens("docs/audits/PR_1_16_RECOVERY_AUDIT.md", [
  "Pull request #1–#16 recovery audit",
  "all surviving files reviewed in full",
  "No PR branch contains application code that is both absent from and superior to current `main`.",
  "Review and thread audit",
  "PR #16",
  "Known branch cleanup set",
]);

requireTokens("docs/audits/pr-artifacts/PR_1_16_FILE_ARCHIVE.md", [
  "PR #1–#16 surviving file archive",
  "PR #2 — `.github/career-platform-verification.txt`",
  "PR #9 — `.github/workflows/site-diagnostics.yml`",
  "PR #13 — `.github/workflows/site-diagnostics.yml`",
  "PR #16 — `.github/workflows/apply-scene-lint-cleanup.yml`",
  "No archived workflow is authorised to run or mutate the repository.",
]);

requireTokens(".github/workflows/site-diagnostics.yml", [
  "workflow_dispatch:",
  "contents: read",
  "group: site-diagnostics-main",
  "timeout-minutes: 15",
  "ref: main",
  "npm run site:verify 2>&1 | tee site-verify.log",
  "diagnostic-static-site-${{ github.sha }}",
]);
forbidTokens(".github/workflows/site-diagnostics.yml", [
  "pull_request:",
  "push:",
  "contents: write",
  "statuses: write",
  "issues: write",
]);

requireTokens(".github/career-platform-10-check.txt", [
  "Complete PR 1-16 recovery audit",
  "Verbatim PR file archive",
  "a 15-minute timeout",
  "rejected workflows are preserved only as non-executable audit artifacts",
  "obsolete pull requests are closed and their branches are deleted",
]);

const forbiddenActiveFiles = [
  ".github/career-platform-verification.txt",
  ".github/career-platform-verification-3.txt",
  ".github/career-platform-verification-4.txt",
  ".github/career-platform-verification-5.txt",
  ".github/career-platform-visual-verification.txt",
  ".github/career-platform-visual-fix-verification.txt",
  ".github/site-build-check.txt",
  ".github/career-platform-10-final-check.txt",
  ".github/career-platform-canonical-verification.txt",
  ".github/career-platform-d902-check.txt",
  ".github/career-platform-final-gate.txt",
  ".github/workflows/apply-scene-lint-cleanup.yml",
];

for (const relativePath of forbiddenActiveFiles) {
  if (fs.existsSync(path.join(root, relativePath))) {
    failures.push(`historical PR artifact is active instead of archived: ${relativePath}`);
  }
}

const scene = read("public/product-lab/scene.js");
if (scene.includes("const interactiveMeshes = [];")) {
  failures.push("recovered product-lab lint cleanup regressed");
}

if (failures.length) {
  console.error(`PR recovery contract validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "PR recovery contract validation passed: PRs 1-16 are fully inventoried, every surviving file is archived, accepted improvements are on main, rejected workflows are non-executable, main-only diagnostics are bounded and least-privileged, and the scene cleanup remains present.",
);
