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

const forbidTokens = (path, tokens) => {
  const content = read(path);
  const normalized = normalize(content);
  for (const token of tokens) {
    if (normalized.includes(normalize(token))) {
      failures.push(`${path} contains forbidden quality token: ${token}`);
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
  "Proof ledger sections",
  'id="evidence-rules"',
  'id="product-evidence"',
]);

requireTokens("scripts/verify_content_freshness.mjs", [
  "const maxAgeDays = 90",
  "maximum is ${maxAgeDays}",
  "proof ledger freshness policy missing",
]);

requireTokens("scripts/verify_color_contrast.mjs", [
  "light body text",
  "dark body text",
  "light accent button",
  "dark accent button",
  "4.5",
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
  "<SectionIndex items={homeSections}",
  'id="professional-case"',
  'id="product-systems"',
  'id="ways-to-work"',
  'id="contact"',
  "Commercial engagements",
]);

requireTokens("src/components/layout/navbar.tsx", [
  "Start role conversation",
  "Discuss a workflow",
  "Buy the book",
  'aria-modal="true"',
  "trigger?.focus()",
]);

requireTokens("src/components/section-index.tsx", [
  'aria-label={label}',
  "overflow-x-auto",
  "shrink-0 rounded-full",
  "focus-visible:ring-2",
]);

requireTokens("src/app/about/page.tsx", [
  "<SectionIndex items={aboutSections}",
  'id="career-path"',
  'id="working-style"',
  'id="ways-to-work"',
]);

requireTokens("src/app/hire-me/page.tsx", [
  "<SectionIndex items={experienceSections}",
  'id="role-fit"',
  'id="experience"',
  'id="role-conversation"',
]);

requireTokens("src/app/work-with-me/page.tsx", [
  "<SectionIndex items={serviceSections}",
  'id="capabilities"',
  'id="pricing"',
  'id="questions"',
]);

requireTokens("src/app/work/page.tsx", [
  "<SectionIndex items={workSections}",
  'id="professional-case"',
  'id="product-systems"',
  'id="evaluate-fit"',
]);

requireTokens("src/components/book-regional-price.tsx", [
  'import { usePricingRegion } from "@/hooks/use-pricing-region"',
  "Choose ebook pricing region",
  "One-time purchase · PDF + EPUB",
  "price follows your selected region",
  "noClaimEbook.indiaPrice",
  "noClaimEbook.globalPrice",
]);

requireTokens("src/app/books/no-claim-without-evidence/page.tsx", [
  "<SectionIndex items={bookSections}",
  "<BookRegionalPrice",
  "Curated reading sample",
  "Open the reading sample",
  'id="inside"',
  'id="sample"',
  'id="method"',
  'id="audience"',
  'id="consulting-delivery"',
  "Dodo Payments handles payment",
]);

requireTokens("src/app/books/no-claim-without-evidence/sample/page.tsx", [
  "<SectionIndex items={sampleSections}",
  "Most AI product mistakes do not start with a bad model.",
  "A claim is a value plus a reason to trust it",
  "Test the pipeline, not just the model",
  "Your eval should become a release gate",
  "The claim-evidence ledger",
  "ticketSource",
  "pipelineFailure",
  "releaseGate",
  "claimEvidenceLedger",
  "Buy the full book",
  'id="evidence-habit"',
  'id="unsupported-claims"',
  'id="pipeline"',
  'id="release-gates"',
  'id="ledger"',
]);

forbidTokens("src/lib/ebook.ts", [
  "priceSummary",
  "pricingNote",
  "₹799 in India · $14.99 elsewhere",
]);
forbidTokens("src/app/books/no-claim-without-evidence/page.tsx", [
  "₹799 in India · $14.99 elsewhere",
  "{noClaimEbook.indiaPrice} in India",
  "{noClaimEbook.globalPrice} elsewhere",
]);
forbidTokens("src/app/books/no-claim-without-evidence/sample/page.tsx", [
  "See the full book page",
  "A small excerpt, enough to show the method without giving away the whole book.",
  "sampleCode",
]);

requireTokens("src/app/contact/page.tsx", [
  "action={FORMBOLD_ENDPOINT}",
  'method="POST"',
  "<noscript>",
  "JavaScript is disabled",
  "Senior%20product%20role%20conversation",
  "Bounded%20commercial%20engagement",
]);

if (failures.length) {
  console.error(`Experience quality validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

await import("./verify_pricing_contract.mjs");
await import("./verify_local_release_contract.mjs");
await import("./verify_color_contrast.mjs");

console.log(
  "Experience quality validation passed: tracking transparency, clean print output, 90-day evidence freshness, compact mobile proof, accessible section navigation on every long professional page, resilient contact fallback, canonical regional pricing, one-region ebook pricing, substantive web-formatted reading excerpts, one-command local release verification, route-aware conversion, focus restoration, self-hosted lab fallback, and WCAG contrast are intact.",
);
