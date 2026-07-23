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

function parseJson(relativePath) {
  const source = read(relativePath);
  if (!source) return {};
  try {
    return JSON.parse(source);
  } catch (error) {
    failures.push(
      `${relativePath} is not valid JSON: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return {};
  }
}

const toolchain = parseJson("toolchain.json");
for (const key of ["node", "npm", "wrangler"]) {
  if (typeof toolchain[key] !== "string" || !/^\d+\.\d+\.\d+$/.test(toolchain[key])) {
    failures.push(`toolchain.json ${key} must be an exact semantic version`);
  }
}

const allowedActionRepositories = new Set([
  "actions/checkout",
  "actions/download-artifact",
  "actions/setup-node",
  "actions/setup-python",
  "actions/upload-artifact",
  "cloudflare/wrangler-action",
]);
const workflowDirectory = path.join(root, ".github", "workflows");
for (const fileName of fs.readdirSync(workflowDirectory).filter((name) => /\.ya?ml$/.test(name))) {
  const relativePath = `.github/workflows/${fileName}`;
  const source = read(relativePath);
  const lines = source.split(/\r?\n/);
  lines.forEach((line, index) => {
    const usesMatch = line.match(/^\s*uses:\s*(.+?)\s*$/);
    if (!usesMatch) return;

    const referenceText = usesMatch[1];
    if (referenceText.startsWith("./")) return;

    const externalMatch = referenceText.match(
      /^([^@\s]+)@([a-f0-9]{40})\s+#\s+(v\d+(?:\.\d+){0,2})$/,
    );
    if (!externalMatch) {
      failures.push(
        `${relativePath}:${index + 1} must use owner/repository@<full-sha> # <version> for every external action`,
      );
      return;
    }

    const [, repository] = externalMatch;
    if (!allowedActionRepositories.has(repository)) {
      failures.push(`${relativePath}:${index + 1} uses an unreviewed external action repository: ${repository}`);
    }
  });
}

requireTokens(".nvmrc", [toolchain.node]);
requireTokens("scripts/lib/toolchain.mjs", [
  "runPinnedNpm",
  "runPinnedWrangler",
  "--package=npm@",
  "--package=wrangler@",
]);
requireTokens("scripts/verify_toolchain.mjs", [
  "Node ${actualNode} is active",
  "Pinned npm resolved",
  "any compatible Node version manager or installer",
  "Toolchain validation passed",
]);
requireTokens("scripts/verify_lockfile.mjs", [
  "runPinnedNpm",
  "canonical npm ${toolchain.npm}",
  "npm ${toolchain.npm} reproduced",
]);
requireTokens("scripts/deploy_cloudflare.mjs", [
  "runPinnedNpm",
  "runPinnedWrangler",
  "--project-name=pranay",
  "--branch=main",
  "--commit-hash=",
  "LIVE_VERIFY_ATTEMPTS",
  "Cloudflare deployment complete and live verification passed",
]);

requireTokens("scripts/verify_live_deployment.mjs", [
  "EXPECTED_SHA",
  "/build-info.json",
  "career-platform-v2",
  "I turn document-heavy, exception-heavy workflows into AI systems people can review and run.",
  'path: "/products"',
  "Buy a finished product. Use the workflow proof free. Commission only what needs adapting.",
  "Buy SignKit for $29",
  "https://pranaysuyash.gumroad.com/l/signkit-v1",
  "Gumroad fulfils SignKit. Dodo Payments is Merchant of Record for the ebook.",
  'path: "/workflows"',
  "Choose the workflow first. Then decide whether to download, try, verify, or build it.",
  "Download a starter",
  "Try a live mechanism",
  "Review an audited case",
  "Scope a custom build",
  "Book a consultation",
  "/workflows/document-extraction-starter.md",
  "/workflows/meeting-capture-starter.md",
  "five explicit workflow paths",
  'path: "/systems"',
  "Small enough to inspect. Real enough to operate.",
  "img-src 'self' data: blob:",
  "browser-local upload CSP",
  "/books/no-claim-without-evidence/sample",
  "₹799 in India · $14.99 elsewhere",
  "https://checkout.dodopayments.com/buy/",
  "still contains obsolete production copy",
  "one-region ebook pricing",
  "direct sample checkout",
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

requireTokens(".github/workflows/site-build.yml", [
  `PINNED_NPM_VERSION: "${toolchain.npm}"`,
  `node-version: "${toolchain.node}"`,
  'npm exec --yes --package="npm@$PINNED_NPM_VERSION" -- npm ci',
  'npm exec --yes --package="npm@$PINNED_NPM_VERSION" -- npm run site:verify',
]);
requireTokens(".github/workflows/site-diagnostics.yml", [
  `PINNED_NPM_VERSION: "${toolchain.npm}"`,
  `node-version: "${toolchain.node}"`,
  'npm exec --yes --package="npm@$PINNED_NPM_VERSION" -- npm run site:browser',
]);

requireTokens(".github/workflows/cloudflare-production-deploy.yml", [
  "Cloudflare production deploy",
  "workflow_run:",
  'workflows: ["Site build"]',
  "github.event.workflow_run.conclusion == 'success'",
  "github.event.workflow_run.head_branch == 'main'",
  "github.event.workflow_run.repository.full_name == github.repository",
  `node-version: "${toolchain.node}"`,
  "actions/download-artifact@d3f86a106a0bac45b974a628896c90dbdf5c8093 # v4",
  "verified-static-site-${{ github.event.workflow_run.head_sha }}",
  "out/build-info.json",
  'manifest.releaseContract !== "career-platform-v2"',
  `toolchain.wrangler !== "${toolchain.wrangler}"`,
  "CLOUDFLARE_API_TOKEN",
  "CLOUDFLARE_ACCOUNT_ID",
  "cloudflare/wrangler-action@9acf94ace14e7dc412b076f2c5c20b8ce93c79cd # v3",
  `wranglerVersion: "${toolchain.wrangler}"`,
  "pages deploy out",
  "--project-name=pranay",
  "--branch=main",
  "--commit-hash=${{ github.event.workflow_run.head_sha }}",
  "node scripts/verify_live_deployment.mjs 2>&1 | tee live-verify.log",
  'context "cloudflare-deployment"',
  'context "live-deployment"',
  "Cloudflare deployment secrets are missing or empty",
  "deployment-metadata.json",
  "cloudflare-deployment-${{ github.event.workflow_run.head_sha }}",
  "Fail when deployment or production verification failed",
]);
forbidTokens(".github/workflows/cloudflare-production-deploy.yml", [
  "pull_request:",
  "push:",
  "npm run build",
  "npm run site:verify",
]);

requireTokens(".github/workflows/live-deployment-audit.yml", [
  "workflow_dispatch:",
  "schedule:",
  "Check out current main",
  "ref: main",
  "node scripts/verify_live_deployment.mjs 2>&1 | tee live-verify.log",
  "Upload live verification log",
  "live-verify-log-${{ steps.target.outputs.sha }}",
  'context "live-deployment"',
  "Fail when live deployment is stale",
]);
forbidTokens(".github/workflows/live-deployment-audit.yml", [
  "pull_request:",
  "push:",
  "workflow_run:",
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
  "Verified artifact deployment",
  "Live deployment audit",
  "/build-info.json",
  "canonical-site-verify",
  "cloudflare-deployment",
  "live-deployment",
  "CLOUDFLARE_API_TOKEN",
  "CLOUDFLARE_ACCOUNT_ID",
  "Cloudflare Pages project",
  "`pranay`",
]);

requireTokens("docs/LOCAL_RELEASE_RUNBOOK.md", [
  "Deployment provenance guard",
  "npm run deploy:guard",
  "Do not bypass this check with Wrangler's `--commit-dirty=true`.",
  "local `HEAD` exactly equals `origin/main`",
  "Automated production deployment",
  "Do not rebuild between canonical verification and automated deployment.",
]);

requireTokens("docs/RELEASE_TOOLCHAIN.md", [
  "Canonical configuration: `toolchain.json`",
  `"node": "${toolchain.node}"`,
  `"npm": "${toolchain.npm}"`,
  `"wrangler": "${toolchain.wrangler}"`,
  "no specific version manager is required",
  "npm run toolchain:verify",
]);

requireTokens("docs/security/GITHUB_ACTIONS_SUPPLY_CHAIN.md", [
  "full 40-character commit SHA",
  "version comment",
  "main-only",
  "manual review cadence",
  "cloudflare/wrangler-action",
]);

requireTokens("src/components/layout/footer.tsx", [
  '{ name: "Build identity", href: "/build-info.json" }',
  "Portfolio evidence reviewed 16 July 2026.",
  "Gumroad fulfils SignKit.",
]);

requireTokens("package.json", [
  '"toolchain:verify": "node scripts/verify_toolchain.mjs"',
  '"postsite:browser": "node scripts/browser_deep_release_test.mjs && node scripts/browser_capability_lab_test.mjs && node scripts/browser_workflow_library_test.mjs && node scripts/browser_products_test.mjs"',
  '"live:verify": "node scripts/verify_live_deployment.mjs"',
  '"presite:verify": "node scripts/verify_live_release_contract.mjs"',
  '"deploy:guard": "node scripts/verify_deploy_source.mjs"',
  '"deploy:cloudflare": "node scripts/deploy_cloudflare.mjs"',
  `"wrangler:version": "npm exec --yes --package=wrangler@${toolchain.wrangler} -- wrangler --version"`,
]);

if (failures.length) {
  console.error(`Live release contract validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Live release contract validation passed: the product catalogue and SignKit checkout are release-gated; Node, npm, and Wrangler are exact and shared across local and CI paths; every external workflow action is immutable and allowlisted; the exact verified artifact is handed to Cloudflare; deployment and custom-domain outcomes remain separate; scheduled drift evidence is retained; and public build identity is structurally bound to main.",
);
