#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "out");
const host = "127.0.0.1";
const preferredPort = Number(process.env.PORT || 4173);

if (!fs.existsSync(out)) {
  console.error("Local smoke test requires an existing out/ export. Run npm run site:verify first.");
  process.exit(1);
}

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function resolveExportPath(requestUrl) {
  const url = new URL(requestUrl, `http://${host}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";

  const relative = pathname.replace(/^\/+/, "");
  if (relative.includes("..")) return null;

  const candidates = path.extname(relative)
    ? [relative]
    : [relative, `${relative}.html`, path.join(relative, "index.html")];

  for (const candidate of candidates) {
    const fullPath = path.resolve(out, candidate);
    if (!fullPath.startsWith(`${path.resolve(out)}${path.sep}`) && fullPath !== path.resolve(out)) {
      continue;
    }
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) return fullPath;
  }

  return null;
}

const server = http.createServer((request, response) => {
  const fullPath = resolveExportPath(request.url || "/");
  if (!fullPath) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": contentTypes[path.extname(fullPath)] || "application/octet-stream",
    "cache-control": "no-store",
  });
  fs.createReadStream(fullPath).pipe(response);
});

const checks = [
  {
    route: "/",
    tokens: [
      "Product leader and hands-on systems builder",
      "Commercial engagements",
      "Homepage sections",
    ],
  },
  {
    route: "/hire-me",
    tokens: ["For hiring teams", "Experience sections", "Start a role conversation"],
  },
  {
    route: "/work-with-me",
    tokens: [
      "Bounded commercial engagements",
      "Commercial engagement sections",
      "System mapping sprint",
      "$2,500+",
    ],
  },
  {
    route: "/contact?type=role&source=local-smoke",
    tokens: [
      "Role or commercial engagement?",
      "action=\"https://formbold.com/s/6QZJn\"",
      "JavaScript is disabled",
    ],
  },
  {
    route: "/work",
    tokens: ["Selected work sections", "MedPiper insurance workflow transformation"],
  },
  {
    route: "/proof",
    tokens: ["Proof ledger sections", "Evidence freshness is a release condition"],
  },
  {
    route: "/books/no-claim-without-evidence",
    tokens: ["Book sections", "Buy now", "Dodo Payments handles payment"],
  },
  {
    route: "/product-lab/",
    tokens: ["Review audited case studies instead", "/vendor/three/three.module.js"],
  },
];

async function main() {
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(preferredPort, host, resolve);
  });

  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Could not resolve smoke-test port");
  const baseUrl = `http://${host}:${address.port}`;
  const failures = [];

  try {
    for (const check of checks) {
      const response = await fetch(`${baseUrl}${check.route}`, { redirect: "manual" });
      const body = await response.text();
      if (!response.ok) {
        failures.push(`${check.route} returned ${response.status}`);
        continue;
      }
      for (const token of check.tokens) {
        if (!body.includes(token)) failures.push(`${check.route} missing ${token}`);
      }
    }

    const buildResponse = await fetch(`${baseUrl}/build-info.json`);
    if (!buildResponse.ok) {
      failures.push(`/build-info.json returned ${buildResponse.status}`);
    } else {
      const buildInfo = await buildResponse.json();
      if (buildInfo.repository !== "pranaysuyash/me") failures.push("build-info repository mismatch");
      if (buildInfo.releaseContract !== "career-platform-v2") failures.push("build-info release contract mismatch");
      if (!/^[a-f0-9]{40}$/.test(buildInfo.commit || "")) failures.push("build-info commit is not a full SHA");
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }

  if (failures.length) {
    console.error(`Local HTTP smoke test failed:\n${failures.join("\n")}`);
    process.exit(1);
  }

  console.log(
    `Local HTTP smoke test passed at ${baseUrl}: identity, role and commercial routes, canonical prices, resilient contact fallback, selected work, proof, book checkout copy, product lab, and build identity are reachable from the static export.`,
  );
}

main().catch(async (error) => {
  if (server.listening) await new Promise((resolve) => server.close(resolve));
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
