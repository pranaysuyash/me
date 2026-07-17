#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, "docs/evidence/product-evidence-capture.json");
const portfolioPath = path.join(root, "src/lib/portfolio.ts");
const failures = [];

if (!fs.existsSync(manifestPath)) failures.push("product evidence capture manifest is missing");
if (!fs.existsSync(portfolioPath)) failures.push("audited portfolio source is missing");

const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  : { projects: [], allowedStatuses: [] };
const portfolio = fs.existsSync(portfolioPath)
  ? fs.readFileSync(portfolioPath, "utf8")
  : "";

const allowedStatuses = new Set(manifest.allowedStatuses || []);
const approvedPaths = new Set();
const plannedOrCapturedPaths = new Set();
const seenSlugs = new Set();
const seenDirectories = new Set();

if (manifest.version !== 1) failures.push("product evidence capture manifest version must be 1");
if (!String(manifest.policy || "").includes("never presented as shipped proof")) {
  failures.push("product evidence manifest is missing the non-promotion policy");
}
if (!["planned", "captured", "approved", "rejected"].every((status) => allowedStatuses.has(status))) {
  failures.push("product evidence manifest does not declare every supported status");
}
if (!Array.isArray(manifest.projects) || manifest.projects.length !== 4) {
  failures.push(`product evidence manifest must cover exactly four audited flagships; found ${manifest.projects?.length || 0}`);
}

for (const project of manifest.projects || []) {
  if (seenSlugs.has(project.portfolioSlug)) failures.push(`duplicate evidence project slug: ${project.portfolioSlug}`);
  seenSlugs.add(project.portfolioSlug);
  if (seenDirectories.has(project.assetDirectory)) failures.push(`duplicate evidence asset directory: ${project.assetDirectory}`);
  seenDirectories.add(project.assetDirectory);

  if (!portfolio.includes(`slug: "${project.portfolioSlug}"`)) {
    failures.push(`${project.title} evidence manifest references an unknown portfolio slug`);
  }
  if (!/^[a-f0-9]{40}$/.test(project.sourceRevision || "")) {
    failures.push(`${project.title} evidence source revision is not a full SHA`);
  }
  if (!portfolio.includes(`sourceRevision: "${project.sourceRevision}"`)) {
    failures.push(`${project.title} evidence revision does not match the audited portfolio record`);
  }
  if (!String(project.captureEnvironment || "").trim()) {
    failures.push(`${project.title} has no capture environment`);
  }
  if (!Array.isArray(project.assets) || project.assets.length < 6) {
    failures.push(`${project.title} must define at least five screenshots and one recording`);
    continue;
  }

  const projectIds = new Set();
  const projectFiles = new Set();
  const screenshotCount = project.assets.filter((asset) => asset.type === "screenshot").length;
  const videoCount = project.assets.filter((asset) => asset.type === "video").length;
  if (screenshotCount < 5) failures.push(`${project.title} defines only ${screenshotCount} screenshot states`);
  if (videoCount < 1) failures.push(`${project.title} has no direct product-use recording plan`);

  for (const asset of project.assets) {
    if (projectIds.has(asset.id)) failures.push(`${project.title} has duplicate evidence id: ${asset.id}`);
    projectIds.add(asset.id);
    if (projectFiles.has(asset.filename)) failures.push(`${project.title} has duplicate evidence filename: ${asset.filename}`);
    projectFiles.add(asset.filename);

    if (!["screenshot", "video"].includes(asset.type)) {
      failures.push(`${project.title}/${asset.id} has unsupported asset type: ${asset.type}`);
    }
    if (!allowedStatuses.has(asset.status)) {
      failures.push(`${project.title}/${asset.id} has unsupported status: ${asset.status}`);
    }
    const expectedPath = `/assets/projects/${project.assetDirectory}/evidence/${asset.filename}`;
    if (asset.publicPath !== expectedPath) {
      failures.push(`${project.title}/${asset.id} public path must be ${expectedPath}`);
    }
    for (const field of ["requiredState", "redactionRule", "alt", "caption"]) {
      if (!String(asset[field] || "").trim()) {
        failures.push(`${project.title}/${asset.id} is missing ${field}`);
      }
    }
    if (asset.alt.length < 20) failures.push(`${project.title}/${asset.id} alt text is too vague`);
    if (asset.caption.length < 30) failures.push(`${project.title}/${asset.id} caption is too vague`);
    if (asset.type === "screenshot" && !/\.(?:png|jpe?g|webp|avif)$/i.test(asset.filename)) {
      failures.push(`${project.title}/${asset.id} screenshot filename has an unsupported extension`);
    }
    if (asset.type === "video" && !/\.(?:mp4|webm)$/i.test(asset.filename)) {
      failures.push(`${project.title}/${asset.id} video filename has an unsupported extension`);
    }

    const absolute = path.join(root, "public", asset.publicPath.replace(/^\//, ""));
    if (["captured", "approved"].includes(asset.status)) {
      if (!fs.existsSync(absolute)) {
        failures.push(`${project.title}/${asset.id} is ${asset.status} but the file is missing: ${asset.publicPath}`);
      } else {
        const minSize = asset.type === "video" ? 100_000 : 15_000;
        if (fs.statSync(absolute).size < minSize) {
          failures.push(`${project.title}/${asset.id} file is unexpectedly small for ${asset.type}`);
        }
      }
      if (!/^[a-f0-9]{40}$/.test(asset.captureRevision || "")) {
        failures.push(`${project.title}/${asset.id} is ${asset.status} without a full captureRevision`);
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(asset.capturedAt || "")) {
        failures.push(`${project.title}/${asset.id} is ${asset.status} without an ISO capture date`);
      }
      plannedOrCapturedPaths.add(asset.publicPath);
    } else {
      if (asset.captureRevision !== null || asset.capturedAt !== null) {
        failures.push(`${project.title}/${asset.id} is ${asset.status} but carries capture approval metadata`);
      }
    }

    if (asset.status === "approved") approvedPaths.add(asset.publicPath);
  }
}

const portfolioEvidencePaths = new Set(
  [...portfolio.matchAll(/src:\s*"(\/assets\/projects\/[^"\s]+\/evidence\/[^"\s]+)"/g)].map(
    (match) => match[1],
  ),
);

for (const evidencePath of portfolioEvidencePaths) {
  if (!approvedPaths.has(evidencePath)) {
    failures.push(`portfolio promotes unapproved direct product evidence: ${evidencePath}`);
  }
}
for (const approvedPath of approvedPaths) {
  if (!portfolioEvidencePaths.has(approvedPath)) {
    failures.push(`approved direct product evidence is not referenced by the audited portfolio: ${approvedPath}`);
  }
}

if (portfolio.includes('kind: "product-screenshot"') && approvedPaths.size === 0) {
  failures.push("portfolio labels product screenshots even though no direct evidence is approved");
}
if (plannedOrCapturedPaths.size > 0 && portfolioEvidencePaths.size > approvedPaths.size) {
  failures.push("captured but unapproved product evidence leaked into the public portfolio");
}

if (failures.length) {
  console.error(`Product evidence capture validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

const planned = (manifest.projects || []).flatMap((project) => project.assets).filter((asset) => asset.status === "planned").length;
const captured = (manifest.projects || []).flatMap((project) => project.assets).filter((asset) => asset.status === "captured").length;
const approved = approvedPaths.size;
console.log(
  `Product evidence capture validation passed: four revision-pinned flagships, ${planned} planned assets, ${captured} captured assets awaiting approval, and ${approved} approved direct product visuals. Only approved local evidence may appear publicly.`,
);
