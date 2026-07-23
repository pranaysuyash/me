#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { runPinnedNpm, toolchain } from "./lib/toolchain.mjs";

const root = process.cwd();
const manifestPath = path.join(root, "package.json");
const lockPath = path.join(root, "package-lock.json");
const diagnosticPath = path.join(
  root,
  "browser-artifacts",
  `package-lock.npm-${toolchain.npm}.generated.json`,
);

if (!fs.existsSync(manifestPath) || !fs.existsSync(lockPath)) {
  console.error("Lockfile verification requires package.json and package-lock.json.");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const lock = JSON.parse(fs.readFileSync(lockPath, "utf8"));
const rootPackage = lock.packages?.[""] || {};

for (const key of ["dependencies", "devDependencies"]) {
  const expected = manifest[key] || {};
  const actual = rootPackage[key] || {};
  try {
    assert.deepStrictEqual(actual, expected);
  } catch {
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

const temporaryRoot = fs.mkdtempSync(
  path.join(os.tmpdir(), "portfolio-lock-verification-"),
);
try {
  fs.copyFileSync(manifestPath, path.join(temporaryRoot, "package.json"));
  fs.copyFileSync(lockPath, path.join(temporaryRoot, "package-lock.json"));

  runPinnedNpm(
    [
      "install",
      "--package-lock-only",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
    ],
    { cwd: temporaryRoot },
  );

  const reproducedText = fs.readFileSync(
    path.join(temporaryRoot, "package-lock.json"),
    "utf8",
  );
  const reproduced = JSON.parse(reproducedText);
  try {
    assert.deepStrictEqual(reproduced, lock);
  } catch {
    fs.mkdirSync(path.dirname(diagnosticPath), { recursive: true });
    fs.writeFileSync(diagnosticPath, reproducedText);
    console.error(
      `package-lock.json is stale under canonical npm ${toolchain.npm}. The exact isolated reproduction was written to ${path.relative(root, diagnosticPath)} for review.`,
    );
    process.exitCode = 1;
  }
} finally {
  fs.rmSync(temporaryRoot, { recursive: true, force: true });
}

if (process.exitCode) process.exit(process.exitCode);

fs.rmSync(diagnosticPath, { force: true });
console.log(
  `Lockfile validation passed: npm ${toolchain.npm} reproduced the v${lock.lockfileVersion} dependency graph in an isolated directory and the root manifest contains ${Object.keys(manifest.dependencies || {}).length} runtime plus ${Object.keys(manifest.devDependencies || {}).length} development dependencies.`,
);
