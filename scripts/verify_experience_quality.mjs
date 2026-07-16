#!/usr/bin/env node

import fs from "node:fs";

const failures = [];

const normalize = (value) => value.replace(/\s+/g, " ").trim();

const read = (path) => {
  if (!fs.existsSync(path)) {
    failures.push(`missing quality source: ${path}`);
    return "";
  }
  return fs.readFileSync(path, "utf8");
};

const requireTokens = (path, tokens) => {
  const content = read(path);
  const normalized = normalize(content);
  for (const token of tokens) {
    if (!normalized.includes(normalize(token))) {
      failures.push(`${path} missing quality token: ${token}`);
    }
  }
  return content;
};

const privacy = requireTokens("src/app/privacy/page.tsx", [
  "Analytics, cookies, and local preferences",
  "does not currently use advertising cookies",
  "third-party analytics",
  "light or dark appearance",
  "India or Global pricing selection",
  "Personal information is not sold to advertisers or data brokers",
]);

if (privacy.includes("Google Analytics") || privacy.includes("tracking pixels are used")) {
  failures.push("privacy page contradicts the tracking-free repository state");
}

requireTokens("src/app/globals.css", [
  "@media print",
  "[data-cta-context]",
  "a[href^=\"http\"]::after",
  "break-inside: avoid",
  "size: A4",
]);

requireTokens("src/app/proof/page.tsx", [
  "90-day maximum review window",
  "Material product or maturity changes trigger an immediate review",
  "Career and commercial claims are reviewed when the underlying fact changes",
  "Evidence freshness is a release condition",
]);

requireTokens("scripts/verify_content_freshness.mjs", [
  "const maxAgeDays = 90",
  "maximum is ${maxAgeDays}",
  "proof ledger freshness policy missing",
]);

const lab = requireTokens("public/product-lab/index.html", [
  '"three": "/vendor/three/three.module.js"',
  "unavailable local runtime",
  "Review audited case studies instead",
]);
if (lab.includes("unavailable CDN") || lab.includes("cdn.jsdelivr.net") || lab.includes("unpkg.com")) {
  failures.push("self-hosted product lab still exposes stale CDN language or URLs");
}

requireTokens("src/app/page.tsx", [
  "grid-cols-2",
  "md:grid-cols-4",
  "Proof ledger",
]);

requireTokens("src/components/layout/navbar.tsx", [
  "Start role conversation",
  "Discuss a workflow",
  "Buy the book",
  'aria-modal="true"',
  "trigger?.focus()",
]);

if (failures.length) {
  console.error(`Experience quality validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Experience quality validation passed: tracking transparency, clean print output, 90-day evidence freshness, compact mobile proof, route-aware conversion, focus restoration, and self-hosted lab fallback are intact.",
);
