#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, "package.json");
const lockPath = path.join(root, "package-lock.json");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

if (!fs.existsSync(manifestPath) || !fs.existsSync(lockPath)) {
  console.error("Lockfile verification requires package.json and package-lock.json.");
  process.exit(1);
}

const before = fs.readFileSync(lockPath, "utf8");
execFileSync(
  npmCommand,
  [
    "install",
    "--package-lock-only",
    "--ignore-scripts",
    "--no-audit",
    "--no-fund",
  ],
  { cwd: root, stdio: "inherit" },
);
const after = fs.readFileSync(lockPath, "utf8");

if (before !== after) {
  console.error(
    "package-lock.json was stale and has been regenerated. Commit the updated lockfile before releasing.",
  );
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const lock = JSON.parse(after);
const rootPackage = lock.packages?.[""] || {};

for (const key of ["dependencies", "devDependencies"]) {
  const expected = manifest[key] || {};
  const actual = rootPackage[key] || {};
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    console.error(`package-lock root ${key} does not exactly match package.json.`);
    process.exit(1);
  }
}

for (const dependency of [
  "axios",
  "framer-motion",
  "react-hook-form",
  "zustand",
  "@shadcn/ui",
]) {
  if (Object.hasOwn(lock.packages || {}, `node_modules/${dependency}`)) {
    console.error(`package-lock retains removed direct dependency: ${dependency}`);
    process.exit(1);
  }
}

console.log(
  `Lockfile validation passed: npm reproduced package-lock.json without changes and the root manifest contains ${Object.keys(manifest.dependencies || {}).length} runtime plus ${Object.keys(manifest.devDependencies || {}).length} development dependencies.`,
);
