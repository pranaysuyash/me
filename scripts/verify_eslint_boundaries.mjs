#!/usr/bin/env node

import { ESLint } from "eslint";

const eslint = new ESLint({ cwd: process.cwd() });
const failures = [];

const generatedPaths = [
  ".next/server/app/generated.js",
  "out/_next/static/chunks/generated.js",
  "dist/generated.js",
  "coverage/generated.js",
  "tmp/generated.js",
  ".wrangler/generated.js",
  "public/vendor/three/0.179.1/three.core.js",
];

const authoredPaths = [
  "eslint.config.mjs",
  "src/app/page.tsx",
  "src/components/regional-pricing.tsx",
  "public/product-lab/scene.js",
  "scripts/verify_live_deployment.mjs",
];

for (const relativePath of generatedPaths) {
  if (!(await eslint.isPathIgnored(relativePath))) {
    failures.push(`generated artifact is still linted: ${relativePath}`);
  }
}

for (const relativePath of authoredPaths) {
  if (await eslint.isPathIgnored(relativePath)) {
    failures.push(`authored source is unexpectedly ignored: ${relativePath}`);
  }
}

if (failures.length) {
  console.error(`ESLint boundary validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "ESLint boundary validation passed: generated build, publication, coverage, Wrangler, and vendored Three.js artifacts are ignored while authored site, product-lab, and verification source remains linted.",
);
