#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

const visuals = [
  {
    project: "SignKit",
    source: "/assets/projects/signkit/workflow.svg",
    file: "public/assets/projects/signkit/workflow.svg",
    tokens: ["SignKit", "LOCAL DOCUMENT WORKFLOW", "Files stay on the device"],
  },
  {
    project: "MetaExtract",
    source: "/assets/projects/metaextract/workflow.svg",
    file: "public/assets/projects/metaextract/workflow.svg",
    tokens: ["MetaExtract", "EVIDENCE-LINKED DOCUMENT INTELLIGENCE", "Coverage ≠ correctness"],
  },
  {
    project: "EchoPanel",
    source: "/assets/projects/echopanel/workflow.svg",
    file: "public/assets/projects/echopanel/workflow.svg",
    tokens: ["EchoPanel", "LOCAL CAPTURE", "Local-first trust boundary"],
  },
  {
    project: "SentinelTwin",
    source: "/assets/projects/sentineltwin/workflow.svg",
    file: "public/assets/projects/sentineltwin/workflow.svg",
    tokens: ["SentinelTwin", "DETERMINISTIC SECURITY DECISION SYSTEM", "Simulation is the claim layer"],
  },
];

const portfolioPath = path.join(root, "src/lib/portfolio.ts");
const portfolio = fs.existsSync(portfolioPath)
  ? fs.readFileSync(portfolioPath, "utf8")
  : "";

if (!portfolio) failures.push("missing audited portfolio source");
if (!portfolio.includes("visualEvidence: ProjectVisualEvidence[]")) {
  failures.push("audited portfolio does not expose typed visual evidence");
}
if (portfolio.includes("screenshots:")) {
  failures.push("audited portfolio still uses the ambiguous screenshots field");
}
if (/raw\.githubusercontent\.com|github\.com\/.*\.(png|jpe?g|webp)/i.test(portfolio)) {
  failures.push("audited portfolio contains a remote runtime image dependency");
}

for (const visual of visuals) {
  const absolute = path.join(root, visual.file);
  if (!fs.existsSync(absolute)) {
    failures.push(`${visual.project} visual is missing: ${visual.file}`);
    continue;
  }

  const stat = fs.statSync(absolute);
  if (stat.size < 1500) {
    failures.push(`${visual.project} visual is unexpectedly small: ${stat.size} bytes`);
  }

  const svg = fs.readFileSync(absolute, "utf8");
  for (const required of ["<svg", "<title", "<desc", ...visual.tokens]) {
    if (!svg.includes(required)) {
      failures.push(`${visual.file} missing required SVG evidence token: ${required}`);
    }
  }

  if (!portfolio.includes(visual.source)) {
    failures.push(`${visual.project} audited record does not reference ${visual.source}`);
  }
}

for (const renderer of [
  "src/app/page.tsx",
  "src/app/work/page.tsx",
  "src/app/work/[slug]/page.tsx",
]) {
  const absolute = path.join(root, renderer);
  const content = fs.existsSync(absolute) ? fs.readFileSync(absolute, "utf8") : "";
  for (const token of [
    "visualEvidence",
    "visual.src",
    "visual.alt",
    "visual.caption",
    "visual.kind",
  ]) {
    if (!content.includes(token)) {
      failures.push(`${renderer} does not consume typed visual evidence token: ${token}`);
    }
  }
  if (content.includes("project.screenshots") || content.includes("project interface")) {
    failures.push(`${renderer} still treats all evidence as product screenshots`);
  }
}

const homepage = fs.readFileSync(path.join(root, "src/app/page.tsx"), "utf8");
if (homepage.includes('className="animate-fade-up"')) {
  failures.push("homepage career hero still hides critical content behind opacity animation");
}

if (failures.length) {
  console.error(`Visual evidence validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

await import("./verify_product_evidence_capture.mjs");

console.log(
  "Visual evidence validation passed: all audited products retain self-hosted, accessible, typed, captioned workflow maps; direct product screenshots and recordings are governed by revision-pinned capture, redaction, file, and approval rules before public promotion.",
);
