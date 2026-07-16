#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    failures.push(`missing pricing source: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(fullPath, "utf8");
}

function requireTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (!source.includes(token)) {
      failures.push(`${relativePath} missing pricing token: ${token}`);
    }
  }
  return source;
}

function forbidTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (source.includes(token)) {
      failures.push(`${relativePath} contains duplicated pricing logic: ${token}`);
    }
  }
}

requireTokens("src/lib/engagements.ts", [
  'export type PricingRegion = "india" | "global"',
  'pricingRegionStorageKey = "pricing-region"',
  'pricingRegionChangeEvent = "pricing-region-change"',
  'id: "mapping"',
  'display: "₹95,000+"',
  'display: "$2,500+"',
  'id: "focused-build"',
  'display: "₹3.5L+"',
  'display: "$9,000+"',
  'id: "production-system"',
  'display: "₹8L+"',
  'display: "$22,000+"',
  'id: "embedded"',
  'display: "₹2.75L/mo+"',
  'display: "$7,500/mo+"',
  "Separate regional price books",
]);

requireTokens("src/hooks/use-pricing-region.ts", [
  'fetch("/cdn-cgi/trace"',
  'timeZone === "Asia/Kolkata"',
  "readStoredRegion",
  "persistRegion",
  "pricingRegionChangeEvent",
  'window.addEventListener("storage"',
  "CustomEvent<PricingRegion>",
]);

requireTokens("src/components/regional-pricing.tsx", [
  'import { engagements, pricingRegions, type PricingRegion } from "@/lib/engagements"',
  'import { usePricingRegion } from "@/hooks/use-pricing-region"',
  "engagement.prices[region].display",
  'role="group"',
  "aria-pressed",
]);

requireTokens("src/components/regional-budget-select.tsx", [
  'import { engagements } from "@/lib/engagements"',
  'import { usePricingRegion } from "@/hooks/use-pricing-region"',
  "engagement.prices[region].budgetLabel",
]);

forbidTokens("src/components/regional-pricing.tsx", [
  "const engagements",
  "function parseCloudflareCountry",
  'localStorage.getItem("pricing-region")',
]);
forbidTokens("src/components/regional-budget-select.tsx", [
  "function detectBrowserRegion",
  'fetch("/cdn-cgi/trace"',
  'localStorage.getItem("pricing-region")',
  "₹95K+",
  "$2.5K+",
]);

if (failures.length) {
  console.error(`Pricing contract validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Pricing contract validation passed: Services and Contact share one engagement catalogue, regional price books, persisted override, Cloudflare/browser resolution, and synchronized region state.",
);
