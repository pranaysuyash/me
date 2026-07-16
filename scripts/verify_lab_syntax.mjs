#!/usr/bin/env node

import fs from "node:fs";
import { spawnSync } from "node:child_process";

const targets = ["out/product-lab/scene.js", "out/scene.js"];
const failures = [];

for (const target of targets) {
  if (!fs.existsSync(target)) {
    failures.push(`missing lab module: ${target}`);
    continue;
  }

  const source = fs.readFileSync(target, "utf8");
  const result = spawnSync(
    process.execPath,
    ["--input-type=module", "--check"],
    {
      input: source,
      encoding: "utf8",
    },
  );

  if (result.status !== 0) {
    failures.push(
      `${target} failed module syntax validation:\n${result.stderr || result.stdout}`,
    );
  }
}

if (failures.length) {
  console.error(`Product lab syntax validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Product lab syntax validation passed for ${targets.length} modules.`);
