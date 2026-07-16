#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const failures = [];
const root = process.cwd();

const normalize = (value) =>
  value
    .normalize("NFKC")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

const read = (relativePath) => {
  const full = path.join(root, relativePath);
  if (!fs.existsSync(full)) {
    failures.push(`missing source file: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(full, "utf8");
};

const requireTokens = (relativePath, tokens) => {
  const source = read(relativePath);
  const normalized = normalize(source);
  for (const token of tokens) {
    if (!normalized.includes(normalize(token))) {
      failures.push(`${relativePath} missing semantic token: ${token}`);
    }
  }
  return source;
};

const forbidTokens = (relativePath, tokens) => {
  const source = read(relativePath);
  const normalized = normalize(source);
  for (const token of tokens) {
    if (normalized.includes(normalize(token))) {
      failures.push(`${relativePath} contains forbidden token: ${token}`);
    }
  }
  return source;
};

const career = requireTokens("src/lib/career.ts", [
  "Product leader and hands-on systems builder",
  "AI Product Lead",
  "14+ years",
  "4 weeks",
  "10 days",
  "$1M ARR",
  "Sanitized operating evidence",
  "This case study is intentionally sanitized",
  "Independent public interview",
  "Public product and systems repositories",
]);

const portfolio = requireTokens("src/lib/portfolio.ts", [
  "Commercial product",
  "Working product build",
  "Active platform build",
  "Working prototype",
  "visualEvidence: ProjectVisualEvidence[]",
  "implementationEvidence: ImplementationEvidence[]",
  "evidenceReviewedAt",
  "sourceRevision",
  "2026-07-16",
  "Treat signatures as visual assets, not certified e-signatures",
  "High field coverage must not be confused with verified correctness",
  "system-audio setup and production packaging remain active work",
  "Separate deterministic simulation from AI explanation",
]);

for (const unsupported of [
  "embedded certificate chains",
  "Stripe integration for subscription billing",
  "PostgreSQL for user accounts",
  "14-day trial",
]) {
  if (normalize(portfolio).includes(normalize(unsupported))) {
    failures.push(`audited portfolio contains unsupported claim: ${unsupported}`);
  }
}
if (portfolio.includes("screenshots:")) {
  failures.push("audited portfolio uses the ambiguous screenshots field");
}

const home = requireTokens("src/app/page.tsx", [
  "@/lib/career",
  "@/lib/portfolio",
  "For hiring teams",
  "/work/medpiper-workflow",
  "/proof",
  "project.visualEvidence",
  "project.implementationEvidence.length",
  "lg:grid-cols-3",
]);
for (const forbidden of ["HeroSystemPanel", "<iframe", "projectsData", 'className="animate-fade-up"']) {
  if (home.includes(forbidden)) failures.push(`homepage contains forbidden pattern: ${forbidden}`);
}

const selectedWork = requireTokens("src/app/work/page.tsx", [
  "@/lib/career",
  "@/lib/portfolio",
  "/work/medpiper-workflow",
  "/labs",
  "project.visualEvidence",
]);
if (selectedWork.includes("projectsData")) {
  failures.push("selected Work page renders historical project marketing data");
}

const caseStudy = requireTokens("src/app/work/[slug]/page.tsx", [
  "auditedProjectBySlug",
  "Object.keys(auditedProjectBySlug)",
  "This archive page intentionally does not repeat historical claims",
  "Visual evidence",
  "Inspectable implementation evidence",
  "project.implementationEvidence",
  "project.sourceRevision",
  "Evidence reviewed",
  "Current implementation boundary",
  "Key product decisions",
]);
if (caseStudy.includes("proofSummary") || caseStudy.includes("demonstrates")) {
  failures.push("dynamic case-study route consumes historical proof marketing fields");
}
if (fs.existsSync(path.join(root, "src/app/work/sentineltwin/page.tsx"))) {
  failures.push("SentinelTwin has a duplicate route outside the audited renderer");
}

requireTokens("src/app/work/medpiper-workflow/page.tsx", [
  "medpiperCaseStudy.outcomes",
  "medpiperCaseStudy.disclosure",
  "What I owned",
]);
requireTokens("src/app/hire-me/page.tsx", [
  "careerProfile.targetRoles",
  "Download resume PDF",
  "/pranay-suyash-resume.pdf",
  "Current context",
]);
requireTokens("src/app/about/page.tsx", [
  "Independent public evidence",
  "External records, not invented social proof",
  "Testimonials and customer counts are not shown without permissioned evidence",
]);
requireTokens("src/app/work-with-me/page.tsx", [
  "Document workflow systems",
  "AI-assisted internal tools",
  "Local-first desktop products",
  "Spatial and simulation systems",
]);
requireTokens("src/app/document-workflows/page.tsx", [
  "The product is not OCR",
  "Review exceptions",
  "do-not-infer policy",
]);
requireTokens("src/app/proof/page.tsx", [
  "Public proof ledger",
  "What this site will and will not call proof",
  "project.evidenceReviewedAt",
  "project.sourceRevision",
  "Independent public records",
  "90-day maximum review window",
]);
requireTokens("src/app/accessibility/page.tsx", [
  "Accessibility statement",
  "WCAG 2.2 AA",
  "Reduced-motion handling",
  "Report a barrier",
  "Third-party checkout",
]);
requireTokens("src/app/systems/page.tsx", [
  'src="/product-lab/"',
  "geometry is illustrative",
  "case study is the source of truth",
]);
requireTokens("src/app/labs/page.tsx", [
  "without flagship inflation",
  "does not claim current production use",
]);

forbidTokens("src/app/hire-me/page.tsx", [
  'type: "profile"',
  "Not a specialist role. Not a generalist role.",
  "Download resume (PDF)",
]);

const navbar = requireTokens("src/components/layout/navbar.tsx", [
  'name: "Work"',
  'name: "Experience"',
  'name: "Services"',
  'name: "Book"',
  "Start role conversation",
  "Discuss a workflow",
  "Buy the book",
  "data-cta-context",
  'href="/proof"',
  'role="dialog"',
  'aria-modal="true"',
  "focusableSelector",
]);
if (navbar.includes('{ name: "Systems", href: "/systems" }')) {
  failures.push("Systems competes with Experience in primary navigation");
}
if (navbar.includes('{ name: "Writing"')) {
  failures.push("navigation labels a single book route as a writing index");
}

requireTokens("src/components/layout/footer.tsx", [
  "Proof ledger",
  "Accessibility",
  "JSON Resume",
  "LLM guide",
  "Portfolio evidence reviewed 16 July 2026",
]);

requireTokens("public/resume.json", [
  '"lastReviewed": "2026-07-16"',
  '"label": "Product leader and hands-on systems builder"',
  '"evidenceLedger": "https://pranaysuyash.com/proof"',
]);
requireTokens("public/llms.txt", [
  "Last evidence review: 2026-07-16",
  "Professional proof ledger",
  "JSON Resume",
  "Evidence rules",
]);
requireTokens("src/app/opengraph-image.tsx", [
  "ImageResponse",
  "1200",
  "630",
  "Product leader + hands-on systems builder",
]);

requireTokens("scripts/generate_resume_pdf.py", [
  "Product Leader and Hands-on Systems Builder",
  "PAGE_WIDTH = 595",
  "PAGE_HEIGHT = 842",
  "SignKit - Commercial product",
]);
requireTokens("scripts/vendor_three.py", [
  'VERSION = "0.179.1"',
  "three.core.js",
  "WRAPPERS",
  "same-origin wrappers",
]);
requireTokens("scripts/generate_build_manifest.py", [
  "build-info.json",
  "evidenceReviewedAt",
  "career-platform-v2",
]);
requireTokens("scripts/verify_content_freshness.mjs", [
  "maxAgeDays = 90",
  "pinned implementation records",
  "source revision",
]);
requireTokens("scripts/verify_experience_quality.mjs", [
  "Analytics, cookies, and local preferences",
  "@media print",
  "90-day maximum review window",
  "unavailable local runtime",
]);
requireTokens("scripts/verify_static_budget.mjs", [
  "htmlBudgets",
  "firstLoadJs",
  "cover.svg",
  "Open Graph image",
]);
requireTokens("scripts/verify_release_contract.mjs", [
  "route-aware CTAs",
  "pinned evidence",
  "same-origin Three.js",
  "internal references verified",
]);
requireTokens("scripts/verify_lab_syntax.mjs", [
  'const targets = ["out/product-lab/scene.js", "out/scene.js"]',
  "process.execPath",
  '"--input-type=module", "--check"',
  "Product lab syntax validation passed",
]);

requireTokens("package.json", [
  '"prebuild": "python3 scripts/vendor_three.py && python3 scripts/generate_resume_pdf.py && python3 scripts/generate_build_manifest.py"',
  '"postbuild": "node scripts/verify_exported_visual_evidence.mjs && node scripts/verify_static_budget.mjs && node scripts/verify_release_contract.mjs"',
  '"lab:validate": "node scripts/verify_lab_syntax.mjs"',
  '"portfolio:validate": "node scripts/verify_portfolio_source.mjs && node scripts/verify_visual_evidence.mjs && node scripts/verify_content_freshness.mjs && node scripts/verify_experience_quality.mjs"',
  '"site:verify": "npm run lint && npm run typecheck && npm run portfolio:validate && npm run book:validate && npm run build && npm run lab:validate"',
  '"lint": "eslint . --max-warnings=0"',
  '"deploy:cloudflare": "npm run site:verify && wrangler pages deploy out --project-name pranay --branch main"',
]);

requireTokens(".github/workflows/site-build.yml", [
  "push:",
  "branches: [main]",
  "workflow_dispatch:",
  "ref: main",
  "Run canonical career-platform release contract",
  "npm run site:verify 2>&1 | tee site-verify.log",
  "verified-static-site-${{ github.sha }}",
]);
forbidTokens(".github/workflows/site-build.yml", ["pull_request:"]);

requireTokens(".github/workflows/site-diagnostics.yml", [
  "workflow_dispatch:",
  "ref: main",
  "npm run site:verify 2>&1 | tee site-verify.log",
  "diagnostic-static-site-${{ github.sha }}",
]);
forbidTokens(".github/workflows/site-diagnostics.yml", ["pull_request:", "push:"]);

requireTokens(".github/career-platform-10-check.txt", [
  "Canonical branch: main",
  "Canonical validation entry point: npm run site:verify",
  "automated release checks run only for main pushes or explicit manual dispatch",
  "before closing an existing pull request",
  "prefer one canonical validation path",
]);
requireTokens("docs/audits/PR_9_RECOVERY_AUDIT.md", [
  "Status: recovered and superseded on `main`",
  "Complete surviving file inventory",
  "do not merge pull request `#9`",
  "All portfolio work is performed directly on `main`",
]);

requireTokens("src/lib/ebook.ts", [
  "/books/no-claim-without-evidence/cover.svg",
  "productionEbookCheckoutUrl",
]);
forbidTokens("src/lib/ebook.ts", ["/books/no-claim-without-evidence/cover.png"]);

requireTokens("src/app/layout.tsx", [
  'jobTitle: "Product Leader and Hands-on Systems Builder"',
  'name: "MedPiper Technologies"',
]);
requireTokens("src/app/sitemap.ts", [
  "${baseUrl}/proof",
  "${baseUrl}/accessibility",
]);

const productLab = requireTokens("public/product-lab/index.html", [
  "display: grid",
  '#lab[data-ready="true"] .fallback',
  "MutationObserver",
  "/product-lab/scene.js",
  "Review audited case studies instead",
  '"three": "/vendor/three/three.module.js"',
  '"three/addons/": "/vendor/three/addons/"',
  "unavailable local runtime",
]);
if (/https?:\/\/(?:cdn\.jsdelivr\.net|unpkg\.com)/.test(productLab)) {
  failures.push("interactive lab import map contains an external runtime URL");
}

if (normalize(career).includes("Founder, PSRS") || normalize(career).includes("Founder of PSRS")) {
  failures.push("personal career identity was replaced by a PSRS founder title");
}

if (failures.length) {
  console.error(`Portfolio source validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Portfolio source validation passed: career identity, route-aware conversion, public proof, accessibility, machine-readable profiles, audited maturity, pinned implementation evidence, 90-day freshness, print and privacy quality, compact homepage, complete same-origin Three.js runtime, lightweight book cover, social preview, build identity, archive boundary, canonical lint and lab validation, main-only workflows, PR recovery documentation, and deployment contract are intact.",
);