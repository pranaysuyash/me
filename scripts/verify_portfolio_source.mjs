#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import "./verify_products.mjs";
import "./verify_workflow_library.mjs";

const root = process.cwd();
const failures = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    failures.push(`missing source file: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(fullPath, "utf8");
}

function requireTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (!source.includes(token)) {
      failures.push(`${relativePath} missing source invariant: ${token}`);
    }
  }
  return source;
}

function forbidTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (source.includes(token)) {
      failures.push(`${relativePath} contains forbidden source pattern: ${token}`);
    }
  }
  return source;
}

const career = requireTokens("src/lib/career.ts", [
  'title: "Product leader and hands-on systems builder"',
  'roleLine: "Document-heavy workflows, operational AI, and internal tools"',
  "I turn document-heavy, exception-heavy workflows into AI systems people can review and run.",
  "Co-Founder / Head of Product & Platforms at MedPiper (YC S20)",
  "14+ years",
  "~4 weeks → ~10 days",
  "~$1M ARR",
  "Paid product shipped",
  "For hiring teams",
  "For commercial engagements",
]);
if ((career.match(/environment:/g) || []).length !== 3) {
  failures.push("career profile must retain three concrete role-fit environments");
}

const projectSlugs = [
  "sig-ext-fastapi",
  "metaextract",
  "echopanel",
  "sentineltwin",
];
const portfolio = requireTokens("src/lib/portfolio.ts", [
  'export type ProjectMaturity =',
  '"Commercial product"',
  '"Working product build"',
  '"Active platform build"',
  '"Working prototype"',
  'export type VisualEvidenceKind = "workflow-map" | "product-screenshot"',
  "visualEvidence: ProjectVisualEvidence[]",
  "implementationEvidence: ImplementationEvidence[]",
  "evidenceReviewedAt",
  "sourceRevision",
  "Treat signatures as visual assets, not certified e-signatures",
  "High field coverage must not be confused with verified correctness",
  "system-audio setup and production packaging remain active work",
  "Separate deterministic simulation from AI explanation",
]);
for (const slug of projectSlugs) {
  const matches = portfolio.match(new RegExp(`slug: \\"${slug}\\"`, "g")) || [];
  if (matches.length !== 1) {
    failures.push(`audited portfolio must contain exactly one canonical ${slug} record`);
  }
}
forbidTokens("src/lib/portfolio.ts", [
  "screenshots:",
  "embedded certificate chains",
  "Stripe integration for subscription billing",
  "PostgreSQL for user accounts",
  "14-day trial",
]);

requireTokens("src/app/page.tsx", [
  "careerProfile.headline",
  "careerProfile.proofPoints",
  "project.visualEvidence",
  'href="/hire-me"',
  'href="/work-with-me"',
  'href="/proof"',
]);
forbidTokens("src/app/page.tsx", ["HeroSystemPanel", "<iframe", "projectsData"]);

requireTokens("src/app/work/page.tsx", [
  "project.maturity",
  "project.visualEvidence",
  "project.outcome",
  "/work/medpiper-workflow",
]);
forbidTokens("src/app/work/page.tsx", ["projectsData"]);

const caseStudy = requireTokens("src/app/work/[slug]/page.tsx", [
  "auditedProjectBySlug",
  "generateStaticParams",
  "project.implementationEvidence",
  "project.sourceRevision",
  "project.evidenceReviewedAt",
  "project.decisions",
  "project.constraints",
  "visual.kind",
]);
if (caseStudy.includes("proofSummary") || caseStudy.includes("demonstrates")) {
  failures.push("audited case renderer must not consume historical marketing proof fields");
}
if (fs.existsSync(path.join(root, "src/app/work/sentineltwin/page.tsx"))) {
  failures.push("SentinelTwin must use the shared audited case-study renderer");
}

requireTokens("src/app/proof/page.tsx", [
  "Public proof ledger",
  "90-day maximum review window",
  "project.evidenceReviewedAt",
  "project.sourceRevision",
  "project.implementationEvidence.length",
  "Independent public records",
]);
requireTokens("src/app/hire-me/page.tsx", [
  "careerProfile.targetRoles",
  "careerProfile.availability",
  "/pranay-suyash-resume.pdf",
]);
requireTokens("src/app/work-with-me/page.tsx", [
  "Document workflow systems",
  "AI-assisted internal tools",
  "Local-first desktop products",
  "Spatial and simulation systems",
  "<RegionalPricing />",
]);
requireTokens("src/app/contact/page.tsx", [
  "FORMBOLD_ENDPOINT",
  'method="POST"',
  "RegionalBudgetSelect",
  'url.searchParams.set("utm_source", "pranaysuyash.com")',
  'mode === "role" ? "role-conversation" : "commercial-engagement"',
  "JavaScript is disabled",
]);
requireTokens("src/app/books/no-claim-without-evidence/sample/page.tsx", [
  "Most AI product mistakes do not start with a bad model.",
  "Test the pipeline, not just the model",
  "Your eval should become a release gate",
  "The claim-evidence ledger",
  "Buy the full book",
]);

requireTokens("src/components/layout/navbar.tsx", [
  'name: "Work"',
  'name: "Products"',
  'name: "Workflows"',
  'name: "Experience"',
  'name: "Services"',
  'role="dialog"',
  'aria-modal="true"',
  "focusableSelector",
  "trigger?.focus()",
]);
forbidTokens("src/components/layout/navbar.tsx", [
  '{ name: "Systems", href: "/systems" }',
  '{ name: "Writing"',
  '{ name: "Book", href:',
]);

requireTokens("src/app/layout.tsx", [
  'jobTitle: "Product Leader and Hands-on Systems Builder"',
  "Operational AI systems",
  "Document-heavy workflows",
  "application/ld+json",
]);
requireTokens("src/app/opengraph-image.tsx", [
  "ImageResponse",
  "1200",
  "630",
  "document-heavy, exception-heavy workflows",
]);
requireTokens("public/llms.txt", [
  "Primary promise: turns document-heavy, exception-heavy workflows",
  "Direct product screenshots and recordings require",
  "exact-wording permission",
  "Current paid products",
]);
requireTokens("public/resume.json", [
  '"lastReviewed": "2026-07-16"',
  '"evidenceLedger": "https://pranaysuyash.com/proof"',
]);

requireTokens("scripts/lib/chrome_cdp.mjs", [
  "findChromeExecutable",
  "launchChromeCdp",
  "--headless",
  "--no-sandbox",
  "--remote-debugging-address=127.0.0.1",
  "/json/version",
  "webSocketDebuggerUrl",
]);
requireTokens("scripts/browser_release_test.mjs", [
  'import { launchChromeCdp } from "./lib/chrome_cdp.mjs"',
  "Runtime.exceptionThrown",
  "Page.captureScreenshot",
  "horizontalOverflow",
  "role contact route does not select role mode",
  "reading sample does not lead directly to secure checkout",
  "mobile menu does not expose an accessible modal dialog",
]);
requireTokens("scripts/verify_deploy_source.mjs", [
  'git("branch", "--show-current")',
  'git("rev-parse", "origin/main")',
  'git("status", "--porcelain=v1", "--untracked-files=all")',
  "the working tree is dirty",
]);
requireTokens("scripts/verify_product_evidence_capture.mjs", [
  "Only approved local evidence may appear publicly",
  "captureRevision",
  "capturedAt",
]);
requireTokens("scripts/verify_external_evidence.mjs", [
  "exact-wording permission",
  "data-external-evidence-id",
]);
requireTokens("scripts/verify_conversion_measurement.mjs", [
  "Do not collect page-view histories",
  "Cal.com role/commercial UTM attribution",
  "no-behavioral-tracking policy",
]);
requireTokens("scripts/verify_dependency_surface.mjs", [
  "forbiddenHistoricalDependencies",
  "runtime dependency is declared but not imported",
  "historical unused libraries are absent",
]);

requireTokens("package.json", [
  '"postportfolio:validate": "node scripts/verify_external_evidence.mjs && node scripts/verify_conversion_measurement.mjs && node scripts/verify_dependency_surface.mjs"',
  '"site:browser": "node scripts/browser_release_test.mjs"',
  '"postsite:browser": "node scripts/browser_deep_release_test.mjs && node scripts/browser_capability_lab_test.mjs && node scripts/browser_workflow_library_test.mjs"',
  '"site:local": "npm run site:verify && npm run site:smoke && npm run site:browser"',
  '"deploy:guard": "node scripts/verify_deploy_source.mjs"',
]);
forbidTokens("package.json", [
  '"axios"',
  '"framer-motion"',
  '"react-hook-form"',
  '"zustand"',
  '"@shadcn/ui"',
]);

requireTokens(".github/workflows/site-build.yml", [
  "branches: [main]",
  "Check out triggering commit",
  "npm run site:verify 2>&1 | tee site-verify.log",
  "npm run site:smoke 2>&1 | tee site-smoke.log",
  "npm run site:browser 2>&1 | tee site-browser.log",
  "Source, HTTP, and hydrated browser verification passed",
  "browser-artifacts",
]);
forbidTokens(".github/workflows/site-build.yml", ["pull_request:", "ref: main"]);
requireTokens(".github/workflows/site-diagnostics.yml", [
  "workflow_dispatch:",
  "ref: main",
  "timeout-minutes: 18",
  "npm run site:browser 2>&1 | tee site-browser.log",
]);
forbidTokens(".github/workflows/site-diagnostics.yml", ["pull_request:", "push:"]);

requireTokens("public/product-lab/index.html", [
  '"three": "/vendor/three/three.module.js"',
  '"three/addons/": "/vendor/three/addons/"',
  "MutationObserver",
  "Review audited case studies instead",
  "unavailable local runtime",
]);
forbidTokens("public/product-lab/index.html", ["cdn.jsdelivr.net", "unpkg.com"]);

if (failures.length) {
  console.error(`Portfolio source validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Portfolio source validation passed: a concrete operational-AI identity, a direct product catalogue, an interactive workflow library, four canonical revision-pinned flagships, shared case rendering, route-aware conversion, privacy-minimal measurement, a pruned dependency surface, machine-readable discovery, permission-gated proof, localhost-polled browser verification, clean deployment provenance, main-only workflows, and same-origin product-lab fallback remain intact.",
);
