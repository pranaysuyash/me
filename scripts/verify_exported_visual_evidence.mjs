#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "out");
const failures = [];

const visuals = [
  "assets/projects/signkit/workflow.svg",
  "assets/projects/metaextract/workflow.svg",
  "assets/projects/echopanel/workflow.svg",
  "assets/projects/sentineltwin/workflow.svg",
];

if (!fs.existsSync(out)) {
  console.error("Exported visual validation failed: out/ does not exist");
  process.exit(1);
}

for (const relative of visuals) {
  const absolute = path.join(out, relative);
  if (!fs.existsSync(absolute)) {
    failures.push(`export is missing visual evidence: ${relative}`);
    continue;
  }
  if (fs.statSync(absolute).size < 1500) {
    failures.push(`exported visual evidence is unexpectedly small: ${relative}`);
  }
}

const resolveRoute = (...candidates) => {
  const match = candidates.find((candidate) => fs.existsSync(path.join(out, candidate)));
  if (!match) {
    failures.push(`missing exported route: ${candidates.join(" or ")}`);
    return "";
  }
  return fs.readFileSync(path.join(out, match), "utf8");
};

const home = resolveRoute("index.html");
const work = resolveRoute("work.html", "work/index.html");
const signKit = resolveRoute("work/sig-ext-fastapi.html", "work/sig-ext-fastapi/index.html");
const metaExtract = resolveRoute("work/metaextract.html", "work/metaextract/index.html");
const echoPanel = resolveRoute("work/echopanel.html", "work/echopanel/index.html");
const sentinelTwin = resolveRoute("work/sentineltwin.html", "work/sentineltwin/index.html");
const productLab = resolveRoute("product-lab/index.html");

for (const [name, html, expected] of [
  ["home", home, [visuals[0], visuals[1], visuals[3]]],
  ["work", work, visuals],
  ["SignKit", signKit, [visuals[0]]],
  ["MetaExtract", metaExtract, [visuals[1]]],
  ["EchoPanel", echoPanel, [visuals[2]]],
  ["SentinelTwin", sentinelTwin, [visuals[3]]],
]) {
  for (const visual of expected) {
    if (!html.includes(`/${visual}`)) {
      failures.push(`${name} export does not reference /${visual}`);
    }
  }
  if (!html.includes("Workflow map")) {
    failures.push(`${name} export does not label workflow-map evidence`);
  }
}

const combined = [home, work, signKit, metaExtract, echoPanel, sentinelTwin].join("\n");
for (const forbidden of [
  "/assets/projects/signkit/hero.jpg",
  "/assets/projects/signkit/detail1.jpg",
  "/assets/projects/echopanel/hero.jpg",
  "/assets/projects/echopanel/detail1.jpg",
  "raw.githubusercontent.com/pranaysuyash/SentinelTwin",
]) {
  if (combined.includes(forbidden)) {
    failures.push(`export contains obsolete or remote visual dependency: ${forbidden}`);
  }
}

for (const required of [
  'display: grid',
  '#lab[data-ready="true"] .fallback',
  'MutationObserver',
  '/product-lab/scene.js',
  'Review audited case studies instead',
]) {
  if (!productLab.includes(required)) {
    failures.push(`product-lab export missing progressive fallback token: ${required}`);
  }
}

if (failures.length) {
  console.error(`Exported visual validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Exported visual validation passed: all audited evidence maps are present and labelled, obsolete image paths are absent, and the lab fails open to case studies.",
);
