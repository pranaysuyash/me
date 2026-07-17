#!/usr/bin/env node

import fs from "node:fs";
import { builtinModules } from "node:module";
import path from "node:path";

const root = process.cwd();
const failures = [];
const packageJson = JSON.parse(
  fs.readFileSync(path.join(root, "package.json"), "utf8"),
);
const dependencies = packageJson.dependencies || {};
const devDependencies = packageJson.devDependencies || {};
const nodeBuiltins = new Set(
  builtinModules.flatMap((module) => [module, module.replace(/^node:/, "")]),
);

const forbiddenHistoricalDependencies = [
  "axios",
  "framer-motion",
  "react-hook-form",
  "zustand",
  "@shadcn/ui",
];
for (const dependency of forbiddenHistoricalDependencies) {
  if (dependency in dependencies || dependency in devDependencies) {
    failures.push(`unused historical dependency is declared: ${dependency}`);
  }
}

const productLabImportMapPath = path.join(
  root,
  "public/product-lab/index.html",
);
const productLabImportMap = fs.existsSync(productLabImportMapPath)
  ? fs.readFileSync(productLabImportMapPath, "utf8")
  : "";
const browserImportMapPackages = new Set(["three"]);
for (const token of [
  '"three": "/vendor/three/three.module.js"',
  '"three/addons/": "/vendor/three/examples/jsm/"',
]) {
  if (!productLabImportMap.includes(token)) {
    failures.push(`product-lab self-hosted import map is missing: ${token}`);
  }
}
if ("three" in dependencies || "three" in devDependencies) {
  failures.push(
    "Three.js must remain a self-hosted product-lab import-map runtime, not an application npm dependency",
  );
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (
      ["node_modules", ".next", "out", "dist", "browser-artifacts"].includes(
        entry.name,
      )
    ) {
      continue;
    }
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else if (/\.(?:ts|tsx|js|mjs|cjs)$/.test(entry.name)) files.push(fullPath);
  }
  return files;
}

function packageName(specifier) {
  if (
    !specifier ||
    specifier.startsWith(".") ||
    specifier.startsWith("/") ||
    specifier.startsWith("@/") ||
    specifier.startsWith("node:") ||
    nodeBuiltins.has(specifier)
  ) {
    return null;
  }
  if (specifier.startsWith("@")) {
    return specifier.split("/").slice(0, 2).join("/");
  }
  return specifier.split("/")[0];
}

const sourceFiles = [
  ...walk(path.join(root, "src")),
  ...walk(path.join(root, "scripts")),
  ...[
    "eslint.config.mjs",
    "next.config.ts",
    "postcss.config.mjs",
    "tailwind.config.ts",
  ]
    .map((relative) => path.join(root, relative))
    .filter((file) => fs.existsSync(file)),
];

const importedPackages = new Set();
for (const file of sourceFiles) {
  const source = fs.readFileSync(file, "utf8");
  const patterns = [
    /\bfrom\s+["']([^"']+)["']/g,
    /\bimport\s*["']([^"']+)["']/g,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
    /\brequire\s*\(\s*["']([^"']+)["']\s*\)/g,
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const name = packageName(match[1]);
      if (name) importedPackages.add(name);
    }
  }
}

const frameworkRuntime = new Set(["next", "react", "react-dom"]);
for (const dependency of Object.keys(dependencies)) {
  if (!importedPackages.has(dependency) && !frameworkRuntime.has(dependency)) {
    failures.push(
      `runtime dependency is declared but not imported by authored source: ${dependency}`,
    );
  }
}

for (const imported of importedPackages) {
  if (browserImportMapPackages.has(imported)) continue;
  if (
    !(imported in dependencies) &&
    !(imported in devDependencies) &&
    !frameworkRuntime.has(imported)
  ) {
    failures.push(`authored source imports undeclared package: ${imported}`);
  }
}

const requiredRuntime = [
  "@radix-ui/react-slot",
  "class-variance-authority",
  "clsx",
  "lucide-react",
  "next",
  "next-themes",
  "react",
  "react-dom",
  "tailwind-merge",
];
for (const dependency of requiredRuntime) {
  if (!(dependency in dependencies)) {
    failures.push(`required runtime dependency is missing: ${dependency}`);
  }
}

const requiredDev = [
  "@eslint/eslintrc",
  "@tailwindcss/postcss",
  "@tailwindcss/typography",
  "@types/node",
  "@types/react",
  "@types/react-dom",
  "eslint",
  "eslint-config-next",
  "prettier",
  "tailwindcss",
  "tailwindcss-animate",
  "typescript",
];
for (const dependency of requiredDev) {
  if (!(dependency in devDependencies)) {
    failures.push(`required development dependency is missing: ${dependency}`);
  }
}

const packageScripts = Object.values(packageJson.scripts || {}).join("\n");
for (const [dependency, token] of [
  ["eslint", "eslint . --max-warnings=0"],
  ["prettier", "prettier --write ."],
  ["typescript", "tsc --noEmit"],
  ["next", "next build"],
]) {
  if (!packageScripts.includes(token)) {
    failures.push(
      `${dependency} is declared but its canonical script token is missing: ${token}`,
    );
  }
}

if (failures.length) {
  console.error(`Dependency surface validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  `Dependency surface validation passed: ${Object.keys(dependencies).length} runtime and ${Object.keys(devDependencies).length} development packages remain; historical unused libraries are absent, Node built-ins and the self-hosted Three.js browser import map are excluded from npm accounting, and authored package imports are declared.`,
);
