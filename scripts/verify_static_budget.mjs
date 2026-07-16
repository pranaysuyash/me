#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const failures = [];
const out = "out";

const routeFiles = {
  home: "index.html",
  experience: "hire-me.html",
  work: "work.html",
  services: "work-with-me.html",
  documentWorkflows: "document-workflows.html",
  proof: "proof.html",
  accessibility: "accessibility.html",
  book: "books/no-claim-without-evidence.html",
};

const htmlBudgets = {
  home: 112_000,
  experience: 105_000,
  work: 105_000,
  services: 105_000,
  documentWorkflows: 90_000,
  proof: 105_000,
  accessibility: 75_000,
  book: 110_000,
};

const read = (relative) => {
  const full = path.join(out, relative);
  if (!fs.existsSync(full)) {
    failures.push(`missing exported file: ${full}`);
    return "";
  }
  return fs.readFileSync(full, "utf8");
};

for (const [name, relative] of Object.entries(routeFiles)) {
  const full = path.join(out, relative);
  const content = read(relative);
  if (!content) continue;
  const size = fs.statSync(full).size;
  if (size > htmlBudgets[name]) {
    failures.push(`${name} HTML exceeds budget: ${size} > ${htmlBudgets[name]} bytes`);
  }
}

const home = read(routeFiles.home);
const scripts = [...home.matchAll(/<script[^>]+src="([^"]+\.js)"/g)].map((match) => match[1]);
const uniqueScripts = [...new Set(scripts)];
let firstLoadJs = 0;
for (const source of uniqueScripts) {
  if (/^https?:\/\//.test(source)) {
    failures.push(`homepage contains external runtime script: ${source}`);
    continue;
  }
  const file = path.join(out, source.replace(/^\//, ""));
  if (!fs.existsSync(file)) {
    failures.push(`homepage script is missing from export: ${source}`);
    continue;
  }
  firstLoadJs += fs.statSync(file).size;
}
if (firstLoadJs > 900_000) {
  failures.push(`homepage referenced JavaScript exceeds 900 KB: ${firstLoadJs} bytes`);
}

if (home.includes("/books/no-claim-without-evidence/cover.png")) {
  failures.push("homepage references the print-master ebook cover");
}

const book = read(routeFiles.book);
if (!book.includes("/books/no-claim-without-evidence/cover.svg")) {
  failures.push("book page does not use the lightweight vector cover");
}
if (book.includes("/books/no-claim-without-evidence/cover.png")) {
  failures.push("book page still downloads the print-master PNG");
}

const webCover = path.join(out, "books/no-claim-without-evidence/cover.svg");
if (!fs.existsSync(webCover)) {
  failures.push("lightweight web cover is missing from export");
} else if (fs.statSync(webCover).size > 30_000) {
  failures.push(`web cover exceeds 30 KB: ${fs.statSync(webCover).size} bytes`);
}

const ogCandidates = [
  path.join(out, "opengraph-image.png"),
  ...fs.existsSync(out)
    ? fs.readdirSync(out)
        .filter((name) => name.startsWith("opengraph-image") && name.endsWith(".png"))
        .map((name) => path.join(out, name))
    : [],
];
if (!ogCandidates.some((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).size > 10_000)) {
  failures.push("generated Open Graph image is missing or unexpectedly small");
}

for (const required of ["resume.json", "llms.txt", "pranay-suyash-resume.pdf"]) {
  const file = path.join(out, required);
  if (!fs.existsSync(file) || fs.statSync(file).size < 100) {
    failures.push(`machine-readable or downloadable professional asset missing: ${required}`);
  }
}

if (failures.length) {
  console.error(`Static budget validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  `Static budget validation passed: homepage ${fs.statSync(path.join(out, routeFiles.home)).size} bytes, referenced JS ${firstLoadJs} bytes, web cover ${fs.statSync(webCover).size} bytes.`,
);
