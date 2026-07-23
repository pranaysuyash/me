#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { runPinnedNpm, runPinnedWrangler, toolchain } from "./lib/toolchain.mjs";

function git(...args) {
  return execFileSync("git", args, {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

const commit = git("rev-parse", "HEAD");
if (!/^[a-f0-9]{40}$/.test(commit)) {
  throw new Error(`Cannot deploy without a full Git commit SHA: ${commit}`);
}

console.log(
  `Preparing verified Cloudflare deployment for ${commit} with npm ${toolchain.npm} and Wrangler ${toolchain.wrangler}.`,
);

runPinnedNpm(["run", "book:restore"]);
runPinnedNpm(["run", "deploy:guard"]);
runPinnedNpm(["run", "site:local"]);
runPinnedNpm(["run", "deploy:guard"]);

runPinnedWrangler([
  "pages",
  "deploy",
  "out",
  "--project-name=pranay",
  "--branch=main",
  `--commit-hash=${commit}`,
  `--commit-message=Verified portfolio release ${commit}`,
]);

runPinnedNpm(
  ["run", "live:verify"],
  {
    env: {
      ...process.env,
      EXPECTED_SHA: commit,
      LIVE_SITE_URL: process.env.LIVE_SITE_URL || "https://pranaysuyash.com",
      LIVE_VERIFY_ATTEMPTS: process.env.LIVE_VERIFY_ATTEMPTS || "8",
      LIVE_VERIFY_DELAY_MS: process.env.LIVE_VERIFY_DELAY_MS || "15000",
    },
  },
);

console.log(
  `Cloudflare deployment complete and live verification passed for ${commit}.`,
);
