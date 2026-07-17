#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function normalize(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    failures.push(`missing measurement source: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(fullPath, "utf8");
}

function requireTokens(relativePath, tokens) {
  const source = read(relativePath);
  const normalizedSource = normalize(source);
  for (const token of tokens) {
    if (!normalizedSource.includes(normalize(token))) {
      failures.push(`${relativePath} missing measurement invariant: ${token}`);
    }
  }
  return source;
}

const taxonomyPath = "docs/measurement/conversion-events.json";
const taxonomySource = read(taxonomyPath);
const taxonomy = taxonomySource
  ? JSON.parse(taxonomySource)
  : { funnelStages: [], standardAttribution: {} };

if (taxonomy.version !== 1) failures.push("conversion taxonomy version must be 1");
if (!String(taxonomy.policy || "").includes("Do not collect page-view histories")) {
  failures.push("conversion taxonomy lacks its data-minimization boundary");
}
if (!Array.isArray(taxonomy.funnelStages) || taxonomy.funnelStages.length < 10) {
  failures.push(
    "conversion taxonomy must cover enquiries, bookings, qualification, orders, refunds, and outcomes",
  );
}
const stageIds = new Set();
for (const stage of taxonomy.funnelStages || []) {
  if (!stage.id || stageIds.has(stage.id)) {
    failures.push(`duplicate or missing funnel stage id: ${stage.id || "<missing>"}`);
  }
  stageIds.add(stage.id);
  if (!stage.definition || !stage.sourceSystem) {
    failures.push(`${stage.id} lacks definition or source system`);
  }
  if (!Array.isArray(stage.requiredFields) || !stage.requiredFields.length) {
    failures.push(`${stage.id} has no required fields`);
  }
  if (
    !Array.isArray(stage.prohibitedFieldsInLedger) ||
    !stage.prohibitedFieldsInLedger.length
  ) {
    failures.push(`${stage.id} has no prohibited-field boundary`);
  }
}
for (const required of [
  "role-enquiry",
  "commercial-enquiry",
  "role-booking",
  "commercial-booking",
  "qualified-role-conversation",
  "qualified-commercial-opportunity",
  "book-order",
  "book-refund",
  "role-outcome",
  "commercial-outcome",
]) {
  if (!stageIds.has(required)) {
    failures.push(`conversion taxonomy is missing ${required}`);
  }
}

const attribution = taxonomy.standardAttribution || {};
if (attribution.utm_source !== "pranaysuyash.com") {
  failures.push("standard UTM source must be pranaysuyash.com");
}
if (attribution.utm_medium !== "portfolio") {
  failures.push("standard UTM medium must be portfolio");
}
for (const campaign of ["role-conversation", "commercial-engagement", "book"]) {
  if (!attribution.allowedCampaigns?.includes(campaign)) {
    failures.push(`allowed UTM campaigns missing ${campaign}`);
  }
}
for (const content of [
  "contact-role-15min",
  "contact-role-30min",
  "contact-project-15min",
  "contact-project-30min",
]) {
  if (!attribution.allowedContent?.includes(content)) {
    failures.push(`allowed UTM content missing ${content}`);
  }
}

const contact = requireTokens("src/app/contact/page.tsx", [
  "function calendarUrl",
  'url.searchParams.set("utm_source", "pranaysuyash.com")',
  'url.searchParams.set("utm_medium", "portfolio")',
  'mode === "role" ? "role-conversation" : "commercial-engagement"',
  '`contact-${mode}-${duration}`',
  "Cal.com stores standard campaign parameters",
  'name="source"',
  'name="mode"',
]);
for (const forbidden of [
  "gtag(",
  "GoogleAnalytics",
  "googletagmanager.com",
  "posthog",
  "mixpanel",
  "segment.com",
  "hotjar",
  "fullstory",
]) {
  if (contact.toLowerCase().includes(forbidden.toLowerCase())) {
    failures.push(
      `contact measurement includes prohibited behavioral tracker: ${forbidden}`,
    );
  }
}

const privacy = requireTokens("src/app/privacy/page.tsx", [
  "does not currently use advertising cookies",
  "third-party analytics",
  "standard campaign parameters",
  "Cal.com",
  "booking path",
  "Personal information is not sold to advertisers or data brokers",
]);
const normalizedPrivacy = normalize(privacy).toLowerCase();
for (const affirmativeTrackingClaim of [
  "session replay is used",
  "uses session replay",
  "behavioural profiling is used",
  "uses behavioural profiling",
  "advertising cookies are used",
  "uses tracking pixels",
]) {
  if (normalizedPrivacy.includes(affirmativeTrackingClaim)) {
    failures.push(
      `privacy page contradicts the privacy-minimal boundary: ${affirmativeTrackingClaim}`,
    );
  }
}

requireTokens("docs/measurement/CONVERSION_MEASUREMENT_PLAN.md", [
  "Current measurement boundary",
  "Contact form",
  "Cal.com",
  "Dodo Payments",
  "Qualified role conversation",
  "Qualified commercial opportunity",
  "Weekly process",
  "10/10 success condition",
  "Do not put secrets in the static export.",
]);
requireTokens("docs/measurement/WEEKLY_FUNNEL_TEMPLATE.csv", [
  "site_release_sha",
  "role_enquiries",
  "commercial_enquiries",
  "qualified_role_conversations",
  "qualified_commercial_opportunities",
  "book_orders_india",
  "book_orders_global",
  "commercial_wins",
]);

const publicSourceFiles = [];
function walk(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (/\.(?:ts|tsx|js|mjs|html)$/.test(entry.name)) {
      publicSourceFiles.push(fullPath);
    }
  }
}
walk(path.join(root, "src"));
walk(path.join(root, "public"));
const publicSource = publicSourceFiles
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n")
  .toLowerCase();
for (const tracker of [
  "google-analytics.com",
  "googletagmanager.com",
  "cdn.segment.com",
  "posthog.init",
  "mixpanel.init",
  "hotjar(",
  "fullstory",
]) {
  if (publicSource.includes(tracker)) {
    failures.push(`public source contains undeclared tracker: ${tracker}`);
  }
}

if (failures.length) {
  console.error(`Conversion measurement validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Conversion measurement validation passed: FormBold source/mode, Cal.com role/commercial UTM attribution, aggregate qualification/order definitions, private weekly reporting, an explicit Dodo checkout-session migration boundary, and a no-behavioral-tracking policy remain coherent.",
);
