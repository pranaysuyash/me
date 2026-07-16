#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const failures = [];

const candidates = {
  home: ["index.html"],
  work: ["work.html", "work/index.html"],
  experience: ["hire-me.html", "hire-me/index.html"],
  services: ["work-with-me.html", "work-with-me/index.html"],
  documentWorkflows: ["document-workflows.html", "document-workflows/index.html"],
  proof: ["proof.html", "proof/index.html"],
  accessibility: ["accessibility.html", "accessibility/index.html"],
  about: ["about.html", "about/index.html"],
  contact: ["contact.html", "contact/index.html"],
  systems: ["systems.html", "systems/index.html"],
  labs: ["labs.html", "labs/index.html"],
  medpiper: ["work/medpiper-workflow.html", "work/medpiper-workflow/index.html"],
  signKit: ["work/sig-ext-fastapi.html", "work/sig-ext-fastapi/index.html"],
  metaExtract: ["work/metaextract.html", "work/metaextract/index.html"],
  echoPanel: ["work/echopanel.html", "work/echopanel/index.html"],
  sentinelTwin: ["work/sentineltwin.html", "work/sentineltwin/index.html"],
  book: ["books/no-claim-without-evidence.html", "books/no-claim-without-evidence/index.html"],
  productLab: ["product-lab/index.html"],
  productLabScene: ["product-lab/scene.js"],
  sceneCompatibility: ["scene.js"],
  sitemap: ["sitemap.xml"],
  robots: ["robots.txt"],
  redirects: ["_redirects"],
  resumeWeb: ["pranay_resume.html"],
  resumePdf: ["pranay-suyash-resume.pdf"],
  resumeJson: ["resume.json"],
  llms: ["llms.txt"],
  buildInfo: ["build-info.json"],
};

const resolved = {};
for (const [name, options] of Object.entries(candidates)) {
  const found = options.find((relative) => {
    const full = path.join(OUT, relative);
    return fs.existsSync(full) && fs.statSync(full).size > 10;
  });
  if (!found) failures.push(`${name} export missing: ${options.join(" or ")}`);
  else resolved[name] = found;
}

if (failures.length) {
  console.error(`Release route contract failed:\n${failures.join("\n")}`);
  process.exit(1);
}

const read = (name) => fs.readFileSync(path.join(OUT, resolved[name]), "utf8");
const requireText = (name, values) => {
  const content = read(name);
  for (const value of values) {
    if (!content.includes(value)) failures.push(`${name} missing exported text: ${value}`);
  }
  return content;
};

const home = requireText("home", [
  "Product leader and hands-on systems builder",
  "For hiring teams",
  "Proof ledger",
  "inspectable implementation records",
  "Commercial proof, applied AI, and frontier systems",
]);
if (home.includes("<iframe")) failures.push("homepage embeds the systems lab");

const experience = requireText("experience", [
  "Start role conversation",
  "Download resume PDF",
  "AI Product Lead",
  "/pranay-suyash-resume.pdf",
  'data-cta-context="hiring"',
]);
if (experience.includes(">Discuss a project<")) {
  failures.push("Experience export still exposes a project-first global CTA");
}

requireText("services", [
  "Discuss a workflow",
  "Document workflow systems",
  "AI-assisted internal tools",
  'data-cta-context="services"',
]);

const book = requireText("book", [
  "Buy now",
  "Buy the book",
  "/books/no-claim-without-evidence/cover.svg",
  'data-cta-context="book"',
]);
const redirects = read("redirects");
const legacyBookCover = "/books/no-claim-without-evidence/cover.png";
const generatedBookPreview = "/books/no-claim-without-evidence/opengraph-image";
const legacyBookRedirect = `${legacyBookCover} ${generatedBookPreview} 301`;
if (book.includes(legacyBookCover)) {
  if (!redirects.includes(legacyBookRedirect)) {
    failures.push("book metadata uses the legacy cover URL without a generated-preview redirect");
  }
} else if (!book.includes(generatedBookPreview)) {
  failures.push("book metadata does not expose the generated social preview");
}
if (fs.existsSync(path.join(OUT, legacyBookCover.slice(1)))) {
  failures.push("publication-only print cover remains in the deployable export");
}

requireText("proof", [
  "Public proof ledger",
  "What this site will and will not call proof",
  "Audited product evidence",
  "Independent public records",
]);

requireText("accessibility", [
  "Accessibility statement",
  "WCAG 2.2 AA",
  "Report a barrier",
  "Third-party checkout",
]);

for (const name of ["signKit", "metaExtract", "echoPanel", "sentinelTwin"]) {
  requireText(name, [
    "Inspectable implementation evidence",
    "Evidence reviewed",
    "2026-07-16",
    "Follow the claim into source, tests, or architecture",
  ]);
  const content = read(name);
  const pinnedLinks = content.match(/https:\/\/github\.com\/[^"<]+\/blob\/[a-f0-9]{40}\//g) || [];
  if (pinnedLinks.length < 4) {
    failures.push(`${name} exposes only ${pinnedLinks.length} pinned implementation links`);
  }
}

const lab = requireText("productLab", [
  '"three": "/vendor/three/three.module.js"',
  '"three/addons/": "/vendor/three/addons/"',
  "/product-lab/scene.js",
  "Review audited case studies instead",
]);
if (/https?:\/\/(?:cdn\.jsdelivr\.net|unpkg\.com)/.test(lab)) {
  failures.push("product lab export contains an external runtime module URL");
}

const vendorFiles = [
  ["vendor/three/0.179.1/three.module.js", 500_000, "./three.core.js"],
  ["vendor/three/0.179.1/three.core.js", 900_000, "class Matrix4"],
  ["vendor/three/0.179.1/addons/controls/OrbitControls.js", 20_000, "class OrbitControls"],
  ["vendor/three/0.179.1/addons/renderers/CSS2DRenderer.js", 3_000, "class CSS2DRenderer"],
  ["vendor/three/three.module.js", 20, "0.179.1/three.module.js"],
  ["vendor/three/addons/controls/OrbitControls.js", 20, "0.179.1/addons/controls/OrbitControls.js"],
  ["vendor/three/addons/renderers/CSS2DRenderer.js", 20, "0.179.1/addons/renderers/CSS2DRenderer.js"],
];
for (const [relative, minimum, token] of vendorFiles) {
  const full = path.join(OUT, relative);
  if (!fs.existsSync(full)) {
    failures.push(`vendored runtime file missing: ${relative}`);
    continue;
  }
  if (fs.statSync(full).size < minimum) {
    failures.push(`vendored runtime file too small: ${relative}`);
  }
  const content = fs.readFileSync(full, "utf8");
  if (!content.includes(token)) failures.push(`vendored runtime file missing ${token}: ${relative}`);
}

const resume = JSON.parse(read("resumeJson"));
if (resume.basics?.label !== "Product leader and hands-on systems builder") {
  failures.push("JSON Resume has the wrong professional label");
}
if (resume.meta?.lastReviewed !== "2026-07-16") {
  failures.push("JSON Resume review date is missing or stale");
}
if (!Array.isArray(resume.work) || resume.work.length !== 3) {
  failures.push("JSON Resume must contain exactly three career chapters");
}

requireText("llms", [
  "Product leader and hands-on systems builder",
  "Last evidence review: 2026-07-16",
  "Professional proof ledger",
  "Evidence rules",
]);

const buildInfo = JSON.parse(read("buildInfo"));
if (buildInfo.repository !== "pranaysuyash/me") failures.push("build identity has the wrong repository");
if (buildInfo.releaseContract !== "career-platform-v2") failures.push("build identity has the wrong release contract");
if (buildInfo.evidenceReviewedAt !== "2026-07-16") failures.push("build identity evidence date is stale");

const sitemap = requireText("sitemap", [
  "https://pranaysuyash.com/proof",
  "https://pranaysuyash.com/accessibility",
  "https://pranaysuyash.com/hire-me",
  "https://pranaysuyash.com/document-workflows",
  "https://pranaysuyash.com/work/medpiper-workflow",
]);
if ((sitemap.match(/<loc>/g) || []).length < 20) {
  failures.push("sitemap unexpectedly contains fewer than 20 routes");
}

const redirectSources = new Set();
for (const rawLine of redirects.split(/\r?\n/)) {
  const line = rawLine.trim();
  if (!line || line.startsWith("#")) continue;
  const [source] = line.split(/\s+/);
  if (source?.startsWith("/")) redirectSources.add(source);
}

const htmlFiles = [];
const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
};
walk(OUT);

const resolveLocal = (sourceFile, raw) => {
  let clean = raw.split("#")[0].split("?")[0];
  if (!clean || clean.startsWith("#")) return null;
  if (/^(?:https?:|mailto:|tel:|data:|javascript:)/.test(clean)) return null;
  try {
    clean = decodeURIComponent(clean);
  } catch {
    failures.push(`${path.relative(OUT, sourceFile)} contains malformed URL encoding: ${raw}`);
    return null;
  }
  const relative = clean.startsWith("/")
    ? clean.slice(1)
    : path.normalize(path.join(path.dirname(path.relative(OUT, sourceFile)), clean));
  return relative.replace(/\\/g, "/");
};

const existsAsExport = (relative) => {
  const normalized = relative.replace(/^\/+/, "");
  if (redirectSources.has(`/${normalized}`)) return true;
  const options = [
    normalized,
    `${normalized}.html`,
    path.posix.join(normalized, "index.html"),
  ];
  if (normalized.endsWith("/")) options.push(path.posix.join(normalized, "index.html"));
  return options.some((candidate) => {
    const full = path.join(OUT, candidate);
    return fs.existsSync(full) && fs.statSync(full).isFile();
  });
};

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, "utf8");
  if (!/<html[^>]+lang="en"/.test(content)) {
    failures.push(`${path.relative(OUT, file)} is missing lang=en`);
  }
  if (!/<title>[^<]+<\/title>/.test(content)) {
    failures.push(`${path.relative(OUT, file)} is missing a non-empty title`);
  }
  for (const match of content.matchAll(/<(?:a|link|script|img|source|iframe)[^>]+(?:href|src)="([^"]+)"/g)) {
    const relative = resolveLocal(file, match[1]);
    if (relative && !existsAsExport(relative)) {
      failures.push(`${path.relative(OUT, file)} has broken local reference: ${match[1]}`);
    }
  }
  for (const img of content.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\balt="[^"]*"/.test(img[1])) {
      failures.push(`${path.relative(OUT, file)} contains an image without alt text`);
    }
  }
}

for (const forbidden of ["admin.html", "admin/index.html"]) {
  if (fs.existsSync(path.join(OUT, forbidden))) failures.push(`forbidden public route exported: ${forbidden}`);
}

if (failures.length) {
  console.error(`Expanded release contract failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  `Expanded release contract passed: ${Object.keys(candidates).length} required outputs, ${htmlFiles.length} HTML files, route-aware CTAs, pinned evidence, machine profiles, redirected legacy assets, same-origin Three.js, sitemap, normalized React text, decoded Next asset URLs, and internal references verified.`,
);
