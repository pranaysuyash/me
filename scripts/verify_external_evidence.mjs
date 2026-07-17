#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registerPath = path.join(root, "docs/evidence/external-evidence-register.json");
const failures = [];

if (!fs.existsSync(registerPath)) failures.push("external evidence register is missing");
const register = fs.existsSync(registerPath)
  ? JSON.parse(fs.readFileSync(registerPath, "utf8"))
  : { records: [], allowedStatuses: [] };

const allowedStatuses = new Set(register.allowedStatuses || []);
const requiredStatuses = [
  "not-requested",
  "requested",
  "received-unverified",
  "fact-checking",
  "permission-pending",
  "approved",
  "declined",
  "withdrawn",
  "expired",
];

if (register.version !== 1) failures.push("external evidence register version must be 1");
if (!String(register.policy || "").includes("explicit permission for the exact public wording")) {
  failures.push("external evidence register lacks exact-wording permission policy");
}
if (!requiredStatuses.every((status) => allowedStatuses.has(status))) {
  failures.push("external evidence register does not declare every lifecycle status");
}
if (!Array.isArray(register.records) || register.records.length < 5) {
  failures.push("external evidence register must cover stakeholder, collaborator, customer, and named-case targets");
}

const recordsById = new Map();
for (const record of register.records || []) {
  if (!record.id || recordsById.has(record.id)) {
    failures.push(`duplicate or missing external evidence id: ${record.id || "<missing>"}`);
    continue;
  }
  recordsById.set(record.id, record);

  for (const field of ["evidenceType", "targetRelationship", "purpose", "notes"]) {
    if (!String(record[field] || "").trim()) failures.push(`${record.id} is missing ${field}`);
  }
  if (!Array.isArray(record.requestedClaims) || record.requestedClaims.length < 3) {
    failures.push(`${record.id} must request at least three concrete claims`);
  }
  if (!allowedStatuses.has(record.status)) failures.push(`${record.id} has unsupported status: ${record.status}`);

  const approved = record.status === "approved";
  if (approved) {
    for (const field of [
      "proposedPublicWording",
      "sourceWording",
      "attribution",
      "permissionScope",
      "factCheckedBy",
      "approvedAt",
      "evidenceLocation",
    ]) {
      if (!record[field] || (typeof record[field] === "string" && !record[field].trim())) {
        failures.push(`${record.id} is approved without ${field}`);
      }
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(record.approvedAt || "")) {
      failures.push(`${record.id} approvedAt must be YYYY-MM-DD`);
    }
  }

  if (["not-requested", "requested", "declined", "withdrawn", "expired"].includes(record.status)) {
    if (record.sourceWording || record.approvedAt) {
      failures.push(`${record.id} status ${record.status} conflicts with received/approved evidence fields`);
    }
  }
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (/\.(?:ts|tsx)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const publicSource = walk(path.join(root, "src"))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");
const publishedIds = new Set(
  [...publicSource.matchAll(/data-external-evidence-id=["'{]+([a-z0-9-]+)/gi)].map(
    (match) => match[1],
  ),
);

for (const id of publishedIds) {
  const record = recordsById.get(id);
  if (!record) failures.push(`public source references unregistered external evidence: ${id}`);
  else if (record.status !== "approved") {
    failures.push(`public source references external evidence that is not approved: ${id}`);
  }
}
for (const record of recordsById.values()) {
  if (record.status === "approved" && !publishedIds.has(record.id)) {
    failures.push(`approved external evidence is not bound to a public source id: ${record.id}`);
  }
}

const requestPack = path.join(root, "docs/evidence/EXTERNAL_EVIDENCE_REQUEST_PACK.md");
const namedCase = path.join(root, "docs/evidence/NAMED_COMMERCIAL_CASE_INTAKE.md");
for (const [file, tokens] of [
  [
    requestPack,
    [
      "No response may be published until the exact public wording",
      "Request: senior MedPiper stakeholder",
      "Request: paying SignKit customer",
      "Exact-wording permission follow-up",
      "Permission record",
    ],
  ],
  [
    namedCase,
    [
      "Minimum eligibility",
      "Original workflow",
      "Direct evidence",
      "Customer voice",
      "Publication gate",
      "Redacted fallback",
    ],
  ],
]) {
  if (!fs.existsSync(file)) {
    failures.push(`external evidence workflow file is missing: ${path.relative(root, file)}`);
    continue;
  }
  const content = fs.readFileSync(file, "utf8");
  for (const token of tokens) {
    if (!content.includes(token)) failures.push(`${path.relative(root, file)} missing evidence token: ${token}`);
  }
}

if (failures.length) {
  console.error(`External evidence validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

const approvedCount = [...recordsById.values()].filter((record) => record.status === "approved").length;
console.log(
  `External evidence validation passed: ${recordsById.size} registered targets, exact-wording permission gates, named-case publication criteria, and ${approvedCount} approved public evidence record(s). No unapproved quote or endorsement is bound to the site.`,
);
