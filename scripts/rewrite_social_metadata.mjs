#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const candidates = [
  "out/books/no-claim-without-evidence.html",
  "out/books/no-claim-without-evidence/index.html",
];
const page = candidates.find((candidate) => fs.existsSync(candidate));

if (!page) {
  console.error(`Social metadata rewrite failed: missing ${candidates.join(" or ")}`);
  process.exit(1);
}

const oldImage =
  "https://pranaysuyash.com/books/no-claim-without-evidence/cover.png";
const socialImage =
  "https://pranaysuyash.com/books/no-claim-without-evidence/opengraph-image";

let html = fs.readFileSync(page, "utf8");
const oldReferences = html.split(oldImage).length - 1;

if (oldReferences > 0) {
  html = html.split(oldImage).join(socialImage);
  html = html.replace(
    '<meta property="og:image:width" content="1024"/>',
    '<meta property="og:image:width" content="1200"/>',
  );
  html = html.replace(
    '<meta property="og:image:height" content="1536"/>',
    '<meta property="og:image:height" content="630"/>',
  );
  html = html.replace(
    '<meta property="og:image:alt" content="No Claim Without Evidence cover"/>',
    '<meta property="og:image:alt" content="No Claim Without Evidence social preview"/>',
  );
  fs.writeFileSync(page, html, "utf8");
  console.log(
    `rewrote ${oldReferences} book metadata references from the print cover to the generated social preview`,
  );
}

const verified = fs.readFileSync(page, "utf8");
for (const token of [
  `property="og:image" content="${socialImage}"`,
  'property="og:image:width" content="1200"',
  'property="og:image:height" content="630"',
  `name="twitter:image" content="${socialImage}"`,
]) {
  if (!verified.includes(token)) {
    console.error(`Social metadata rewrite failed: exported book page missing ${token}`);
    process.exit(1);
  }
}
if (verified.includes(oldImage)) {
  console.error("Social metadata rewrite failed: print-cover URL remains in book HTML");
  process.exit(1);
}

console.log(`book social metadata verified in ${path.relative(process.cwd(), page)}`);
