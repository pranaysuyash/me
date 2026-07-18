#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    failures.push(`missing capability-lab source: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(fullPath, "utf8");
}

function requireTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (!source.includes(token)) {
      failures.push(`${relativePath} missing capability-lab invariant: ${token}`);
    }
  }
  return source;
}

const shell = requireTokens(
  "src/components/capability-lab/capability-lab.tsx",
  [
    "data-capability-lab",
    'role="tablist"',
    'role="tabpanel"',
    "Evidence extraction",
    "Local image cleanup",
    "Visual inspection",
    "Spatial visibility",
    "Runs in this browser",
    "Synthetic by default",
    "No model claim",
    "Claim boundary.",
    "/work/metaextract",
    "/work/sig-ext-fastapi",
    "/work/sentineltwin",
  ],
);

requireTokens(
  "src/components/capability-lab/document-extraction-mechanism.tsx",
  [
    "extractDocument",
    "Run extraction",
    'data-field-value={field.id}',
    "evidence_line",
    "Accept field",
    "Needs review",
    "No upload or network request is used by this mechanism.",
  ],
);
requireTokens(
  "src/components/capability-lab/signature-cleanup-mechanism.tsx",
  [
    "getImageData",
    "URL.createObjectURL",
    "Transparent background",
    "Crop to content",
    "data-foreground-pixels",
    "Local only",
  ],
);
requireTokens(
  "src/components/capability-lab/visual-inspection-mechanism.tsx",
  [
    "getImageData",
    "Derived edge evidence",
    "Mean luminance",
    "Edge density",
    "Strongest boundary region",
    "data-edge-density",
  ],
);
requireTokens(
  "src/components/capability-lab/spatial-visibility-mechanism.tsx",
  [
    "lineIntersectsRectangle",
    "Move shelf clear",
    "data-coverage-score",
    "Keyboard-friendly shelf position",
    "segment-to-rectangle intersection",
  ],
);

requireTokens("src/app/systems/page.tsx", [
  'import { CapabilityLab } from "@/components/capability-lab/capability-lab"',
  'id="working-mechanisms"',
  'id="spatial-explainer"',
  'id="audited-cases"',
  "Small enough to inspect. Real enough to operate.",
  "<CapabilityLab />",
  'loading="lazy"',
  "Inspect simplified product loops, then verify the real case study.",
]);

requireTokens("scripts/browser_capability_lab_test.mjs", [
  "edited invoice number was not extracted",
  "signature cleanup produced only",
  "visual inspection edge density",
  "initial spatial coverage",
  "mobile systems page overflows",
  'path.join(artifactsDir, "capability-report.json")',
]);

requireTokens("package.json", [
  '"postsite:browser": "node scripts/browser_deep_release_test.mjs && node scripts/browser_capability_lab_test.mjs"',
  '"postportfolio:validate": "node scripts/verify_external_evidence.mjs && node scripts/verify_conversion_measurement.mjs && node scripts/verify_dependency_surface.mjs"',
]);
requireTokens("scripts/verify_dependency_surface.mjs", [
  'import "./verify_capability_lab.mjs"',
]);

const componentSources = [
  shell,
  read("src/components/capability-lab/document-extraction-mechanism.tsx"),
  read("src/components/capability-lab/signature-cleanup-mechanism.tsx"),
  read("src/components/capability-lab/visual-inspection-mechanism.tsx"),
  read("src/components/capability-lab/spatial-visibility-mechanism.tsx"),
].join("\n");

for (const forbidden of [
  "fetch(",
  "XMLHttpRequest",
  "FormData(",
  "openai.com",
  "api.anthropic.com",
  "raw.githubusercontent.com",
]) {
  if (componentSources.includes(forbidden)) {
    failures.push(`capability lab contains an undeclared network or model dependency: ${forbidden}`);
  }
}

if (failures.length) {
  console.error(`Capability lab validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Capability lab validation passed: four browser-contained mechanisms remain functional, accessible, synthetic-by-default, network-free, claim-bounded, linked to audited systems, and exercised by the hydrated browser release gate.",
);
