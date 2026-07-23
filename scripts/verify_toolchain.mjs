#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pinnedNpmOutput, toolchain } from "./lib/toolchain.mjs";

const root = process.cwd();
const failures = [];
const actualNode = process.versions.node;

if (actualNode !== toolchain.node) {
  failures.push(
    `Node ${actualNode} is active; this repository requires ${toolchain.node}. Activate or install the exact version declared in toolchain.json and .nvmrc with any compatible Node version manager or installer.`,
  );
}

const nvmrcPath = path.join(root, ".nvmrc");
const nvmrc = fs.existsSync(nvmrcPath)
  ? fs.readFileSync(nvmrcPath, "utf8").trim()
  : "";
if (nvmrc !== toolchain.node) {
  failures.push(`.nvmrc reports ${nvmrc || "<missing>"}; expected ${toolchain.node}`);
}

try {
  const pinnedNpm = pinnedNpmOutput(["--version"]);
  if (pinnedNpm !== toolchain.npm) {
    failures.push(`Pinned npm resolved to ${pinnedNpm}; expected ${toolchain.npm}`);
  }
} catch (error) {
  failures.push(
    `Pinned npm ${toolchain.npm} could not be resolved: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
}

if (failures.length) {
  console.error(`Toolchain validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  `Toolchain validation passed: Node ${toolchain.node}, npm ${toolchain.npm}, and Wrangler ${toolchain.wrangler} are the canonical release versions.`,
);
