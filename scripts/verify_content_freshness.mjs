#!/usr/bin/env node

import fs from "node:fs";

const failures = [];
const now = new Date();
const maxAgeDays = 180;

const portfolio = fs.readFileSync("src/lib/portfolio.ts", "utf8");
const resume = JSON.parse(fs.readFileSync("public/resume.json", "utf8"));
const llms = fs.readFileSync("public/llms.txt", "utf8");
const footer = fs.readFileSync("src/components/layout/footer.tsx", "utf8");

const dates = [...portfolio.matchAll(/evidenceReviewedAt:\s*"(\d{4}-\d{2}-\d{2})"/g)].map(
  (match) => match[1],
);

if (dates.length !== 4) {
  failures.push(`expected 4 audited evidence review dates, found ${dates.length}`);
}

for (const date of dates) {
  const reviewed = new Date(`${date}T00:00:00Z`);
  const ageDays = Math.floor((now.getTime() - reviewed.getTime()) / 86_400_000);
  if (!Number.isFinite(ageDays) || ageDays < 0) {
    failures.push(`invalid or future evidence review date: ${date}`);
  } else if (ageDays > maxAgeDays) {
    failures.push(`audited evidence is stale: ${date} is ${ageDays} days old`);
  }
}

const revisions = [...portfolio.matchAll(/sourceRevision:\s*"([a-f0-9]{40})"/g)].map(
  (match) => match[1],
);
if (revisions.length !== 4 || new Set(revisions).size !== 4) {
  failures.push("each audited project must have one unique 40-character source revision");
}

for (const revision of revisions) {
  if (!portfolio.includes(`/blob/${revision}/`)) {
    failures.push(`implementation evidence is not pinned to source revision ${revision}`);
  }
}

const evidenceLinks = [...portfolio.matchAll(/href:\s*"(https:\/\/github\.com\/[^\"]+\/blob\/[a-f0-9]{40}\/[^\"]+)"/g)].map(
  (match) => match[1],
);
if (evidenceLinks.length < 16) {
  failures.push(`expected at least 16 pinned implementation evidence links, found ${evidenceLinks.length}`);
}
if (new Set(evidenceLinks).size !== evidenceLinks.length) {
  failures.push("implementation evidence links must be unique");
}

const resumeReview = resume.meta?.lastReviewed;
if (!dates.includes(resumeReview)) {
  failures.push(`JSON Resume review date ${resumeReview ?? "missing"} does not match audited evidence dates`);
}

for (const token of [
  "Last evidence review: 2026-07-16",
  "Professional proof ledger",
  "JSON Resume",
]) {
  if (!llms.includes(token)) failures.push(`llms.txt missing ${token}`);
}

if (!footer.includes("Portfolio evidence reviewed 16 July 2026")) {
  failures.push("footer freshness statement is missing or inconsistent");
}

if (failures.length) {
  console.error(`Content freshness validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  `Content freshness validation passed: ${dates.length} audited projects, ${evidenceLinks.length} pinned implementation records, maximum age ${maxAgeDays} days.`,
);
