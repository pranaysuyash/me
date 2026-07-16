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
  failures.push("homepage references the publication-only print cover");
}

const book = read(routeFiles.book);
if (!book.includes("/books/no-claim-without-evidence/cover.svg")) {
  failures.push("book page does not use the lightweight vector cover");
}
if (book.includes("/books/no-claim-without-evidence/cover.png")) {
  failures.push("book page still references the publication-only print cover");
}

const webCover = path.join(out, "books/no-claim-without-evidence/cover.svg");
if (!fs.existsSync(webCover)) {
  failures.push("lightweight web cover is missing from export");
} else if (fs.statSync(webCover).size > 30_000) {
  failures.push(`web cover exceeds 30 KB: ${fs.statSync(webCover).size} bytes`);
}

const printCover = path.join(out, "books/no-claim-without-evidence/cover.png");
if (fs.existsSync(printCover)) {
  failures.push(`publication-only print cover remains in web export: ${fs.statSync(printCover).size} bytes`);
}

const generatedMetadataImages = [];
const walkImages = (directory) => {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walkImages(full);
    else if (/^(?:opengraph-image|twitter-image)(?:\.[a-z0-9]+)?$/i.test(entry.name)) {
      generatedMetadataImages.push(full);
    }
  }
};
walkImages(out);

if (!generatedMetadataImages.some((candidate) => fs.statSync(candidate).size > 10_000)) {
  failures.push("generated social metadata images are missing or unexpectedly small");
}
if (generatedMetadataImages.length < 3) {
  failures.push(`expected root and book social metadata images, found ${generatedMetadataImages.length}`);
}

for (const required of ["resume.json", "llms.txt", "pranay-suyash-resume.pdf", "build-info.json"]) {
  const file = path.join(out, required);
  if (!fs.existsSync(file) || fs.statSync(file).size < 100) {
    failures.push(`machine-readable or downloadable professional asset missing: ${required}`);
  }
}

const totalExportBytes = (() => {
  let total = 0;
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const full = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(full);
      else total += fs.statSync(full).size;
    }
  };
  walk(out);
  return total;
})();
if (totalExportBytes > 6_000_000) {
  failures.push(`static export exceeds 6 MB budget: ${totalExportBytes} bytes`);
}

if (failures.length) {
  console.error(`Static budget validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  `Static budget validation passed: homepage ${fs.statSync(path.join(out, routeFiles.home)).size} bytes, referenced JS ${firstLoadJs} bytes, web cover ${fs.statSync(webCover).size} bytes, social images ${generatedMetadataImages.length}, total export ${totalExportBytes} bytes.`,
);
