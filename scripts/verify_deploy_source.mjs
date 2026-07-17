#!/usr/bin/env node

import { execFileSync } from "node:child_process";

function git(...args) {
  try {
    return execFileSync("git", args, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error(`Deployment source verification could not run git ${args.join(" ")}: ${detail}`);
    process.exit(1);
  }
}

const branch = git("branch", "--show-current");
const head = git("rev-parse", "HEAD");
const originMain = git("rev-parse", "origin/main");
const status = git("status", "--porcelain=v1", "--untracked-files=all");
const failures = [];

if (branch !== "main") failures.push(`deployment must run from main, not ${branch || "a detached HEAD"}`);
if (!/^[a-f0-9]{40}$/i.test(head)) failures.push("HEAD is not a full commit SHA");
if (head !== originMain) {
  failures.push(`local HEAD ${head} does not match pushed origin/main ${originMain}`);
}
if (status) {
  failures.push(
    `the working tree is dirty; commit, discard, or move these changes before deployment:\n${status}`,
  );
}

if (failures.length) {
  console.error(`Deployment source verification failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  `Deployment source verified: clean main at pushed commit ${head}. Generated build identity can truthfully name this SHA.`,
);
