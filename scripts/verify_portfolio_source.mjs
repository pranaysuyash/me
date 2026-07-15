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

const homepage = requireTokens("src/app/page.tsx", [
  "@/lib/career",
  "@/lib/portfolio",
  "For hiring teams",
  "/work/medpiper-workflow",
]);
for (const forbidden of ["HeroSystemPanel", "<iframe", "projectsData"]) {
  if (homepage.includes(forbidden)) {
    failures.push(`homepage bypasses career architecture: ${forbidden}`);
  }
}

const work = requireTokens("src/app/work/page.tsx", [
  "@/lib/career",
  "@/lib/portfolio",
  "/work/medpiper-workflow",
  "/labs",
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

requireTokens("package.json", [
  '"prebuild": "python3 scripts/generate_resume_pdf.py"',
  '"resume:build": "python3 scripts/generate_resume_pdf.py"',
  '"portfolio:validate": "node scripts/verify_portfolio_source.mjs"',
]);

const navbar = requireTokens("src/components/layout/navbar.tsx", [
  'name: "Work"',
  'href: "/work"',
  'name: "Experience"',
  'href: "/hire-me"',
  'name: "Services"',
  'href: "/work-with-me"',
]);
if (navbar.includes('{ name: "Systems", href: "/systems" }')) {
  failures.push("Systems competes with Experience in primary navigation");
}

requireTokens("src/app/layout.tsx", [
  'jobTitle: "Product Leader and Hands-on Systems Builder"',
  'name: "MedPiper Technologies"',
]);

if (normalize(career).includes("Founder, PSRS") || normalize(career).includes("Founder of PSRS")) {
  failures.push("personal career identity was replaced by a PSRS founder title");
}

if (failures.length) {
  console.error(`Portfolio source validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Portfolio source validation passed: career identity, audited maturity, canonical route ownership, resume generation, commercial hierarchy, archive boundary, and navigation are intact.",
);
