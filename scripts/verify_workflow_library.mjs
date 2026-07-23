#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    failures.push(`missing workflow-library source: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(fullPath, "utf8");
}

function requireTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (!source.includes(token)) {
      failures.push(`${relativePath} missing workflow-library invariant: ${token}`);
    }
  }
  return source;
}

const catalogue = requireTokens("src/lib/workflow-library.ts", [
  'id: "document-extraction-review"',
  'id: "signature-document-handling"',
  'id: "visual-evidence-inspection"',
  'id: "spatial-coverage-review"',
  'id: "meeting-capture-retrieval"',
  'type WorkflowPath = "download" | "live" | "case" | "project" | "consultation"',
  "/systems#capability-tab-extraction",
  "/systems#capability-tab-cleanup",
  "/systems#capability-tab-inspection",
  "/systems#capability-tab-visibility",
  "/work/metaextract",
  "/work/sig-ext-fastapi",
  "/work/sentineltwin",
  "/work/echopanel",
]);

if ((catalogue.match(/\nid: /g) || []).length !== 0) {
  failures.push("workflow definitions must remain object fields rather than top-level declarations");
}
if ((catalogue.match(/\n    id: "/g) || []).length !== 5) {
  failures.push("workflow library must contain exactly five canonical workflow families");
}

const explorer = requireTokens(
  "src/components/workflow-library/workflow-library-explorer.tsx",
  [
    "data-workflow-library",
    "data-selected-input",
    "data-selected-priority",
    "data-selected-path",
    "What enters the workflow?",
    "What matters most?",
    "What do you need next?",
    "Why it matched",
    "Claim boundary.",
    "Starter downloads are direct and ungated. No email address is required.",
    "The URL preserves this selection for sharing or return visits.",
    "The library does not fabricate a match or live surface where one does not exist.",
    "withSelectionContext(",
    "window.history.replaceState",
    '.filter((workflow) => priority === "any" || workflow.priorities.includes(priority))',
    "Scope this workflow",
    "Book a workflow consultation",
  ],
);

for (const forbidden of [
  "fetch(",
  "XMLHttpRequest",
  "FormData(",
  "openai.com",
  "api.anthropic.com",
  "Enter your email",
  "Unlock download",
]) {
  if (explorer.includes(forbidden)) {
    failures.push(`workflow chooser contains an undeclared network, model, or email-gate dependency: ${forbidden}`);
  }
}

requireTokens("src/app/workflows/page.tsx", [
  "Interactive workflow library",
  "Choose the workflow first. Then decide whether to download, try, verify, or build it.",
  "Five ways to use the same workflow",
  "Download a starter",
  "Try a live mechanism",
  "Review an audited case",
  "Scope a custom build",
  "Book a consultation",
  "xl:grid-cols-5",
  "<WorkflowLibraryExplorer />",
  'id="choose"',
  'id="paths"',
  'id="boundaries"',
  "/systems",
  "/work",
  "/work-with-me",
  "/document-workflows",
]);

requireTokens("src/components/layout/navbar.tsx", [
  '{ name: "Workflows", href: "/workflows" }',
  'pathname.startsWith("/workflows")',
  "Discuss selected workflow",
]);
requireTokens("src/components/layout/footer.tsx", [
  '{ name: "Workflow library", href: "/workflows" }',
]);
requireTokens("src/app/sitemap.ts", [
  'url: `${baseUrl}/workflows`',
]);

const starterFiles = [
  "public/workflows/document-extraction-starter.md",
  "public/workflows/signature-document-starter.md",
  "public/workflows/visual-inspection-starter.md",
  "public/workflows/spatial-coverage-starter.md",
  "public/workflows/meeting-capture-starter.md",
];
for (const relativePath of starterFiles) {
  const source = read(relativePath);
  if (source.length < 1800) {
    failures.push(`${relativePath} is too small to be a useful operating starter: ${source.length} characters`);
  }
  for (const token of ["Failure", "Acceptance", "Scoping"]) {
    if (!source.includes(token)) {
      failures.push(`${relativePath} missing practical starter section: ${token}`);
    }
  }
}

requireTokens("scripts/browser_workflow_library_test.mjs", [
  "workflow library exposes",
  "document extraction is not the default best match",
  "signature workflow is not recommended",
  "workflow selection is not preserved in the URL",
  "signature project path loses selected workflow context",
  "meeting workflow incorrectly exposes a live mechanism",
  "deep-linked spatial simulation does not restore the exact recommendation",
  "starter download is not directly retrievable",
  "workflow library mobile page overflows",
  'path.join(artifactsDir, "workflow-library-report.json")',
]);

if (failures.length) {
  console.error(`Workflow library validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Workflow library validation passed: five canonical workflow families, exact source/priority/path filtering, shareable URL-backed recommendations, selected-context enquiry attribution, five explicit acquisition explanations, direct ungated starter artifacts, honest live/case/project/consultation paths, source boundaries, navigation, discovery metadata, and browser verification remain intact.",
);
