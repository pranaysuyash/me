#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

const normalize = (value) =>
  value
    .normalize("NFKC")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

const read = (relativePath) => {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`missing source file: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(absolutePath, "utf8");
};

const requireTokens = (relativePath, tokens) => {
  const content = read(relativePath);
  const normalized = normalize(content);
  for (const token of tokens) {
    if (!normalized.includes(normalize(token))) {
      failures.push(`${relativePath} missing semantic token: ${token}`);
    }
  }
  return content;
};

const forbidTokens = (relativePath, tokens) => {
  const content = read(relativePath);
  const normalized = normalize(content);
  for (const token of tokens) {
    if (normalized.includes(normalize(token))) {
      failures.push(`${relativePath} contains forbidden token: ${token}`);
    }
  }
  return content;
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
  "MediCircle",
  "Independent public interview",
  "Public product and systems repositories",
]);

const portfolio = requireTokens("src/lib/portfolio.ts", [
  "Commercial product",
  "Working product build",
  "Active platform build",
  "Working prototype",
  "Treat signatures as visual assets, not certified e-signatures",
  "High field coverage must not be confused with verified correctness",
  "system-audio setup and production packaging remain active work",
  "Separate deterministic simulation from AI explanation",
  "visualEvidence: ProjectVisualEvidence[]",
  "implementationEvidence: ImplementationEvidence[]",
  "evidenceReviewedAt",
  "sourceRevision",
  "2026-07-16",
]);

for (const unsupported of [
  "embedded certificate chains",
  "Stripe integration for subscription billing",
  "PostgreSQL for user accounts",
  "14-day trial",
]) {
  if (normalize(portfolio).includes(normalize(unsupported))) {
    failures.push(`audited portfolio contains unsupported SignKit claim: ${unsupported}`);
  }
}

if (portfolio.includes("screenshots:")) {
  failures.push("audited portfolio still uses the ambiguous screenshots field");
}

const homepage = requireTokens("src/app/page.tsx", [
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
  if (homepage.includes(forbidden)) {
    failures.push(`homepage bypasses career architecture or first-paint requirements: ${forbidden}`);
  }
}

const work = requireTokens("src/app/work/page.tsx", [
  "@/lib/career",
  "@/lib/portfolio",
  "/work/medpiper-workflow",
  "/labs",
  "project.visualEvidence",
]);
if (work.includes("projectsData")) {
  failures.push("selected Work page must not render historical project marketing data");
}

const dynamicCase = requireTokens("src/app/work/[slug]/page.tsx", [
  "auditedProjectBySlug",
  "Object.keys(auditedProjectBySlug)",
  "This archive page intentionally does not repeat historical claims",
  "Current implementation boundary",
  "Key product decisions",
  "project.visualEvidence",
  "Visual evidence",
  "Inspectable implementation evidence",
  "project.implementationEvidence",
  "project.sourceRevision",
  "Evidence reviewed",
]);
if (dynamicCase.includes("proofSummary") || dynamicCase.includes("demonstrates")) {
  failures.push("dynamic case-study route consumes historical proof marketing fields");
}

if (fs.existsSync(path.join(root, "src/app/work/sentineltwin/page.tsx"))) {
  failures.push("SentinelTwin must use the canonical audited dynamic renderer, not a duplicate route");
}

requireTokens("src/app/work/medpiper-workflow/page.tsx", [
  "@/lib/career",
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
  "publicEvidence",
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
  "auditedProjects",
  "project.evidenceReviewedAt",
  "project.sourceRevision",
  "publicEvidence",
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

const experience = forbidTokens("src/app/hire-me/page.tsx", [
  'type: "profile"',
  "Not a specialist role. Not a generalist role.",
  "Download resume (PDF)",
]);
if (!experience.includes("/pranay-suyash-resume.pdf")) {
  failures.push("Experience page does not link the generated PDF resume");
}

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

requireTokens("scripts/verify_content_freshness.mjs", [
  "maxAgeDays = 180",
  "pinned implementation records",
  "source revision",
]);

requireTokens("scripts/verify_static_budget.mjs", [
  "htmlBudgets",
  "firstLoadJs",
  "cover.svg",
  "Open Graph image",
]);

requireTokens("package.json", [
  '"prebuild": "python3 scripts/vendor_three.py && python3 scripts/generate_resume_pdf.py"',
  '"postbuild": "node scripts/verify_exported_visual_evidence.mjs && node scripts/verify_static_budget.mjs"',
  '"resume:build": "python3 scripts/generate_resume_pdf.py"',
  '"three:vendor": "python3 scripts/vendor_three.py"',
  "node scripts/verify_portfolio_source.mjs && node scripts/verify_visual_evidence.mjs && node scripts/verify_content_freshness.mjs",
]);

const navbar = requireTokens("src/components/layout/navbar.tsx", [
  'name: "Work"',
  'href: "/work"',
  'name: "Experience"',
  'href: "/hire-me"',
  'name: "Services"',
  'href: "/work-with-me"',
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

requireTokens("src/lib/ebook.ts", [
  "/books/no-claim-without-evidence/cover.svg",
  "productionEbookCheckoutUrl",
]);
forbidTokens("src/lib/ebook.ts", [
  "/books/no-claim-without-evidence/cover.png",
]);

requireTokens("src/app/layout.tsx", [
  'jobTitle: "Product Leader and Hands-on Systems Builder"',
  'name: "MedPiper Technologies"',
]);

const productLab = requireTokens("public/product-lab/index.html", [
  "display: grid",
  '#lab[data-ready="true"] .fallback',
  "MutationObserver",
  "/product-lab/scene.js",
  "Review audited case studies instead",
  '"three": "/vendor/three/three.module.js"',
  '"three/addons/": "/vendor/three/addons/"',
]);
if (productLab.includes("https://cdn.jsdelivr.net")) {
  failures.push("interactive lab import map contains an external runtime CDN");
}

if (normalize(career).includes("Founder, PSRS") || normalize(career).includes("Founder of PSRS")) {
  failures.push("personal career identity was replaced by a PSRS founder title");
}

if (failures.length) {
  console.error(`Portfolio source validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Portfolio source validation passed: career identity, route-aware conversion, public proof, accessibility, machine-readable profiles, audited maturity, pinned implementation evidence, content freshness, compact homepage, self-hosted Three.js dependency chain, lightweight book cover, social preview, archive boundary, and navigation are intact.",
);
