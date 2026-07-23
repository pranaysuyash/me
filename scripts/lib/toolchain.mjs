import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const toolchainPath = path.join(root, "toolchain.json");

if (!fs.existsSync(toolchainPath)) {
  throw new Error("toolchain.json is missing");
}

export const toolchain = JSON.parse(fs.readFileSync(toolchainPath, "utf8"));

for (const key of ["node", "npm", "wrangler"]) {
  if (!/^\d+\.\d+\.\d+$/.test(String(toolchain[key] || ""))) {
    throw new Error(`toolchain.json has an invalid ${key} version: ${toolchain[key]}`);
  }
}

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

export function runPinnedNpm(args, options = {}) {
  return execFileSync(
    npmCommand,
    [
      "exec",
      "--yes",
      `--package=npm@${toolchain.npm}`,
      "--",
      "npm",
      ...args,
    ],
    {
      cwd: root,
      stdio: "inherit",
      ...options,
    },
  );
}

export function pinnedNpmOutput(args, options = {}) {
  return execFileSync(
    npmCommand,
    [
      "exec",
      "--yes",
      `--package=npm@${toolchain.npm}`,
      "--",
      "npm",
      ...args,
    ],
    {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      ...options,
    },
  ).trim();
}

export function runPinnedWrangler(args, options = {}) {
  return execFileSync(
    npmCommand,
    [
      "exec",
      "--yes",
      `--package=wrangler@${toolchain.wrangler}`,
      "--",
      "wrangler",
      ...args,
    ],
    {
      cwd: root,
      stdio: "inherit",
      ...options,
    },
  );
}
