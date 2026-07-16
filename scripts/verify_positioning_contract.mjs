#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    failures.push(`missing positioning source: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(fullPath, "utf8");
}

function requireTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (!source.includes(token)) {
      failures.push(`${relativePath} missing positioning token: ${token}`);
    }
  }
  return source;
}

function forbidTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (source.includes(token)) {
      failures.push(`${relativePath} contains ambiguous positioning token: ${token}`);
    }
  }
}

requireTokens("src/lib/career.ts", [
  "Product leader and hands-on systems builder",
  "The capability is the same; the accountability horizon is different.",
  "Hire me for sustained internal ownership.",
  "Use a commercial engagement for a bounded workflow, system, or decision.",
  "I ask for the real artefacts early",
  "I move between layers",
  "I am direct about uncertainty",
  "I like taking things end to end",
  "Sustained ownership inside the team",
  "For commercial engagements",
]);

requireTokens("src/app/about/page.tsx", [
  "What working with me feels like",
  "Two ways to work together",
  "Same operating capability, different accountability horizon.",
  "Hire for sustained internal ownership",
  "Engage for a bounded system or workflow",
  'id="ways-to-work"',
]);

requireTokens("src/app/hire-me/page.tsx", [
  "For hiring teams · sustained internal ownership",
  "ongoing internal mandate",
  "review commercial engagements instead",
  "/contact?type=role&source=experience",
  "Start a role conversation",
]);

requireTokens("src/app/work-with-me/page.tsx", [
  "Bounded commercial engagements",
  "This page is for a defined commercial outcome.",
  "Is this the same as hiring you into a role?",
  "How do current commitments affect availability?",
  "Discuss a commercial engagement",
  "PSRS Technologies Private Limited",
]);

requireTokens("src/app/contact/page.tsx", [
  "Choose the commitment model",
  "Role or commercial engagement?",
  "Senior internal role",
  "Bounded commercial engagement",
  "selectMode",
  "aria-pressed",
  'name="mode"',
  "Send commercial project brief",
]);

requireTokens("src/components/layout/navbar.tsx", [
  "Choose how to work together",
  "/about#ways-to-work",
  "Start role conversation",
  "Discuss a workflow",
  "Buy the book",
]);
forbidTokens("src/components/layout/navbar.tsx", ['label: "Discuss a project"']);

requireTokens("public/llms.txt", [
  "## Professional identity",
  "## Work modes",
  "Senior internal role: sustained ownership",
  "Bounded commercial engagement:",
  "PSRS Technologies Private Limited",
  "Contact and explicit work-mode selector",
]);

requireTokens("docs/audits/COPY_IDENTITY_AND_WORK_MODES_AUDIT_2026-07-16.md", [
  "One identity and two commitment models",
  "The capability is the same. The accountability horizon is different.",
  "What is still preventing 10/10",
  "Current copy verdict",
]);

requireTokens("package.json", [
  '"positioning:validate": "node scripts/verify_positioning_contract.mjs"',
  '"preportfolio:validate": "npm run positioning:validate"',
]);

if (failures.length) {
  console.error(`Positioning contract validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Positioning contract validation passed: personal working style, sustained-role ownership, bounded commercial engagements, explicit contact self-routing, neutral generic navigation, and machine-readable identity remain distinct and coherent.",
);
