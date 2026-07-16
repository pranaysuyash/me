#!/usr/bin/env node

const baseUrl = new URL(
  process.env.LIVE_SITE_URL || "https://pranaysuyash.com",
);
const expectedSha = (process.env.EXPECTED_SHA || "").trim();
const attempts = Number.parseInt(process.env.LIVE_VERIFY_ATTEMPTS || "3", 10);
const delayMs = Number.parseInt(process.env.LIVE_VERIFY_DELAY_MS || "15000", 10);
const requestTimeoutMs = Number.parseInt(
  process.env.LIVE_VERIFY_TIMEOUT_MS || "15000",
  10,
);

if (!/^[0-9a-f]{40}$/i.test(expectedSha)) {
  console.error(
    "Live deployment verification requires EXPECTED_SHA as a full 40-character commit SHA.",
  );
  process.exit(1);
}

const routeChecks = [
  {
    path: "/",
    token:
      "I turn messy operational workflows into reviewable AI and product systems.",
  },
  {
    path: "/work",
    token: "Four products, each labelled by what actually exists today.",
  },
  {
    path: "/hire-me",
    token:
      "Product leader and hands-on builder for AI, workflow, and internal systems.",
  },
  {
    path: "/work-with-me",
    token:
      "Buy a decision, a focused build, a production system, or sustained ownership.",
  },
  {
    path: "/contact",
    token: "Enough context for a useful fit assessment",
  },
  {
    path: "/proof",
    token: "90-day maximum review window",
  },
  {
    path: "/books/no-claim-without-evidence",
    token: "Clean AI output is not the same thing as a trustworthy system.",
  },
];

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

function normalize(value) {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

async function fetchWithTimeout(path, accept = "text/html") {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const url = new URL(path, baseUrl);
    const response = await fetch(url, {
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        Accept: accept,
        "User-Agent": "pranaysuyash-live-release-verifier/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`${url} returned HTTP ${response.status}`);
    }

    return {
      url,
      response,
      body: await response.text(),
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function verifyDeployment() {
  const failures = [];

  try {
    const { body, url } = await fetchWithTimeout(
      "/build-info.json",
      "application/json",
    );
    const buildInfo = JSON.parse(body);
    const deployedCommit = String(buildInfo.commit || "").trim();

    if (deployedCommit !== expectedSha) {
      failures.push(
        `${url} reports ${deployedCommit || "no commit"}; expected ${expectedSha}`,
      );
    }

    if (buildInfo.branch !== "main") {
      failures.push(
        `${url} reports branch ${String(buildInfo.branch)} instead of main`,
      );
    }

    if (buildInfo.releaseContract !== "career-platform-v2") {
      failures.push(
        `${url} reports release contract ${String(buildInfo.releaseContract)} instead of career-platform-v2`,
      );
    }
  } catch (error) {
    failures.push(
      `build identity check failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  for (const check of routeChecks) {
    try {
      const { body, url } = await fetchWithTimeout(check.path);
      if (!normalize(body).includes(normalize(check.token))) {
        failures.push(`${url} is missing release token: ${check.token}`);
      }
    } catch (error) {
      failures.push(
        `${check.path} check failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  if (failures.length) {
    throw new Error(failures.join("\n"));
  }
}

let finalError;
for (let attempt = 1; attempt <= Math.max(attempts, 1); attempt += 1) {
  try {
    await verifyDeployment();
    console.log(
      `Live deployment verified: ${baseUrl.origin} serves main commit ${expectedSha}.`,
    );
    process.exit(0);
  } catch (error) {
    finalError = error;
    console.error(
      `Live deployment attempt ${attempt}/${Math.max(attempts, 1)} failed:\n${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    if (attempt < attempts) await sleep(delayMs);
  }
}

console.error(
  `Live deployment verification failed for ${baseUrl.origin} after ${Math.max(
    attempts,
    1,
  )} attempt(s).`,
);
if (finalError instanceof Error && finalError.stack) {
  console.error(finalError.stack);
}
process.exit(1);
