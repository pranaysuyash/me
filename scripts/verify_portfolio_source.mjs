#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

const read = (relativePath) => {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`missing source file: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(absolutePath, "utf8");
};

const requireText = (relativePath, values) => {
  const content = read(relativePath);
  for (const value of values) {
    if (!content.includes(value)) {
      failures.push(`${relativePath} missing required text: ${value}`);
    }
  }
  return content;
};

const forbidText = (relativePath, values) => {
  const content = read(relativePath);
  for (const value of values) {
    if (content.includes(value)) {
      failures.push(`${relativePath} contains forbidden text: ${value}`);
    }
  }
  return content;
};

const career = requireText("src/lib/career.ts", [
  "Product leader and hands-on systems builder",
  "AI Product Lead",
  "~4 weeks → ~10 days",
  "~$1M ARR",
  "Sanitized operating evidence",
  "~10-day turnaround",
  "This case study is intentionally sanitized",
]);

const portfolio = requireText("src/lib/portfolio.ts", [
  'maturity: "Commercial product"',
  'maturity: "Working product build"',
  'maturity: "Active platform build"',
  'maturity: "Working prototype"',
  "Treat signatures as visual assets, not certified e-signatures",
  "High field coverage must not be confused with verified correctness",
  "system-audio setup and production packaging remain active work",
]);

for (const forbidden of [
  "embedded certificate chains",
  "Stripe integration for subscription billing",
  "PostgreSQL for user accounts",
  "14-day trial",
]) {
  if (portfolio.includes(forbidden)) {
    failures.push(`audited portfolio contains unsupported SignKit claim: ${forbidden}`);
  }
}

const homepage = requireText("src/app/page.tsx", [
  'from "@/lib/career"',
  'from "@/lib/portfolio"',
  "For hiring teams",
  "/work/medpiper-workflow",
]);
for (const forbidden of ["HeroSystemPanel", "<iframe", "projectsData"]) {
  if (homepage.includes(forbidden)) failures.push(`homepage bypasses career architecture: ${forbidden}`);
}

const work = requireText("src/app/work/page.tsx", [
  'from "@/lib/career"',
  'from "@/lib/portfolio"',
  "/work/medpiper-workflow",
  "/labs",
]);
if (work.includes("projectsData")) {
  failures.push("selected Work page must not render historical project marketing data");
}

const dynamicCase = requireText("src/app/work/[slug]/page.tsx", [
  "auditedProjectBySlug",
  "Object.keys(auditedProjectBySlug)",
  "project.decisions.map",
  "This archive page intentionally does not repeat historical claims",
  "Key product decisions",
]);
if (dynamicCase.includes("proofSummary") || dynamicCase.includes("demonstrates")) {
  failures.push("dynamic case-study route must not consume historical proof marketing fields");
}

requireText("src/lib/portfolio.ts", [
  'slug: "sentineltwin"',
  'maturity: "Active platform build"',
  "Separate deterministic simulation from AI explanation.",
]);

requireText("src/app/work/medpiper-workflow/page.tsx", [
  'from "@/lib/career"',
  "medpiperCaseStudy.outcomes",
  "medpiperCaseStudy.disclosure",
  "What I owned",
]);

requireText("src/app/hire-me/page.tsx", [
  "Download resume PDF",
  "/pranay-suyash-resume.pdf",
  "Current context",
]);

requireText("src/app/work-with-me/page.tsx", [
  "Document workflow systems",
  "AI-assisted internal tools",
  "Local-first desktop products",
  "Spatial and simulation systems",
]);

requireText("src/app/document-workflows/page.tsx", [
  "The product is not OCR",
  "Review exceptions",
  "do-not-infer policy",
]);

requireText("src/app/systems/page.tsx", [
  'src="/product-lab/"',
  "geometry is illustrative",
  "case study is the source of truth",
]);

requireText("src/app/labs/page.tsx", [
  "without flagship inflation",
  "do not claim current production use",
]);

const experience = forbidText("src/app/hire-me/page.tsx", [
  'type: "profile"',
  "Not a specialist role. Not a generalist role.",
]);
if (experience.includes("Download resume (PDF)")) {
  failures.push("Experience page contains the old resume label mismatch");
}

requireText("scripts/generate_resume_pdf.py", [
  "Product Leader and Hands-on Systems Builder",
  "PAGE_WIDTH = 595",
  "PAGE_HEIGHT = 842",
  "SignKit - Commercial product",
]);

requireText("package.json", [
  '"prebuild": "python3 scripts/generate_resume_pdf.py"',
  '"resume:build": "python3 scripts/generate_resume_pdf.py"',
  '"portfolio:validate": "node scripts/verify_portfolio_source.mjs"',
]);

const navbar = requireText("src/components/layout/navbar.tsx", [
  '{ name: "Work", href: "/work" }',
  '{ name: "Experience", href: "/hire-me" }',
  '{ name: "Services", href: "/work-with-me" }',
]);
if (navbar.includes('{ name: "Systems", href: "/systems" }')) {
  failures.push("Systems must not compete with Experience in primary navigation");
}

requireText("src/app/layout.tsx", [
  'jobTitle: "Product Leader and Hands-on Systems Builder"',
  'name: "MedPiper Technologies"',
]);

if (career.includes("Founder, PSRS") || career.includes("Founder of PSRS")) {
  failures.push("personal career identity must not be replaced by a PSRS founder title");
}

if (failures.length) {
  console.error(`Portfolio source validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log("Portfolio source validation passed: canonical career data, audited product maturity, route boundaries, resume generation, and navigation are intact.");
