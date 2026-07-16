#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const out = path.resolve("out");
const publicationOnly = [
  "books/no-claim-without-evidence/cover.png",
];

if (!fs.existsSync(out)) {
  console.error("Static pruning failed: out/ does not exist");
  process.exit(1);
}

for (const relative of publicationOnly) {
  const target = path.resolve(out, relative);
  if (target !== out && !target.startsWith(`${out}${path.sep}`)) {
    console.error(`Static pruning refused path outside out/: ${relative}`);
    process.exit(1);
  }
  if (fs.existsSync(target)) {
    const size = fs.statSync(target).size;
    fs.unlinkSync(target);
    console.log(`pruned publication-only web artifact: ${relative} (${size} bytes)`);
  } else {
    console.log(`publication-only web artifact already absent: ${relative}`);
  }
}
