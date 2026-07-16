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

const vendoredRuntime = [
  {
    relative: "vendor/three/0.179.1/three.module.js",
    minimumSize: 500_000,
    tokens: ["./three.core.js", "WebGLRenderer", "PerspectiveCamera"],
  },
  {
    relative: "vendor/three/0.179.1/three.core.js",
    minimumSize: 900_000,
    tokens: ["REVISION", "class Matrix4", "class Object3D"],
  },
  {
    relative: "vendor/three/0.179.1/addons/controls/OrbitControls.js",
    minimumSize: 20_000,
    tokens: ["class OrbitControls", "from 'three'"],
  },
  {
    relative: "vendor/three/0.179.1/addons/renderers/CSS2DRenderer.js",
    minimumSize: 3_000,
    tokens: ["class CSS2DObject", "class CSS2DRenderer"],
  },
];

const wrappers = [
  {
    relative: "vendor/three/three.module.js",
    token: "0.179.1/three.module.js",
  },
  {
    relative: "vendor/three/addons/controls/OrbitControls.js",
    token: "0.179.1/addons/controls/OrbitControls.js",
  },
  {
    relative: "vendor/three/addons/renderers/CSS2DRenderer.js",
    token: "0.179.1/addons/renderers/CSS2DRenderer.js",
  },
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

for (const specification of vendoredRuntime) {
  const absolute = path.join(out, specification.relative);
  if (!fs.existsSync(absolute)) {
    failures.push(`export is missing versioned Three.js runtime: ${specification.relative}`);
    continue;
  }
  const size = fs.statSync(absolute).size;
  if (size < specification.minimumSize) {
    failures.push(
      `vendored Three.js file is unexpectedly small: ${specification.relative} (${size} bytes)`,
    );
    continue;
  }
  const content = fs.readFileSync(absolute, "utf8");
  for (const token of specification.tokens) {
    if (!content.includes(token)) {
      failures.push(`vendored Three.js file ${specification.relative} is missing ${token}`);
    }
  }
}

for (const wrapper of wrappers) {
  const absolute = path.join(out, wrapper.relative);
  if (!fs.existsSync(absolute)) {
    failures.push(`export is missing stable Three.js wrapper: ${wrapper.relative}`);
    continue;
  }
  const content = fs.readFileSync(absolute, "utf8");
  if (!content.includes("export * from") || !content.includes(wrapper.token)) {
    failures.push(`Three.js wrapper does not resolve to the pinned runtime: ${wrapper.relative}`);
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
const headers = resolveRoute("_headers");

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

for (const [name, html] of [
  ["SignKit", signKit],
  ["MetaExtract", metaExtract],
  ["EchoPanel", echoPanel],
  ["SentinelTwin", sentinelTwin],
]) {
  if (!html.includes("Inspectable implementation evidence")) {
    failures.push(`${name} export does not expose implementation evidence`);
  }
  const links = html.match(/https:\/\/github\.com\/[^"<]+\/blob\/[a-f0-9]{40}\//g) || [];
  if (links.length < 4) {
    failures.push(`${name} export exposes only ${links.length} revision-pinned evidence links`);
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
  "display: grid",
  '#lab[data-ready="true"] .fallback',
  "MutationObserver",
  "/product-lab/scene.js",
  "/vendor/three/three.module.js",
  "/vendor/three/addons/",
  "Review audited case studies instead",
]) {
  if (!productLab.includes(required)) {
    failures.push(`product-lab export missing progressive or same-origin token: ${required}`);
  }
}

if (productLab.includes("cdn.jsdelivr.net") || productLab.includes("unpkg.com")) {
  failures.push("product-lab export still contains an external JavaScript runtime dependency");
}

for (const required of [
  "Content-Security-Policy:",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://formbold.com",
  "frame-src 'self'",
  "/vendor/three/*",
]) {
  if (!headers.includes(required)) {
    failures.push(`Cloudflare headers missing security or vendor policy: ${required}`);
  }
}

if (failures.length) {
  console.error(`Exported visual validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Exported visual validation passed: audited maps and revision-pinned implementation evidence are labelled, the complete Three.js runtime is versioned behind stable same-origin wrappers, obsolete remote assets are absent, CSP is present, and the lab fails open to case studies.",
);
