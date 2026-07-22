#!/usr/bin/env node

import { createStaticExportServer } from "./lib/static_export_server.mjs";

const preferredPort = Number(process.env.PORT || 4173);

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
    route: "/workflows",
    tokens: [
      "Interactive workflow library",
      "Workflow library sections",
      "Choose the workflow first. Then decide whether to download, try, verify, or build it.",
      "Starter downloads are direct and ungated",
      "Evidence-linked document extraction",
      "Meeting capture and searchable retrieval",
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
    route: "/systems",
    tokens: [
      "Working systems lab",
      "Systems lab sections",
      "Small enough to inspect. Real enough to operate.",
      "Runs in this browser",
      "Inspect simplified product loops, then verify the real case study.",
    ],
  },
  {
    route: "/books/no-claim-without-evidence",
    tokens: [
      "Book sections",
      "Choose ebook pricing region",
      "Read a real excerpt",
      "Dodo Payments handles payment",
    ],
  },
  {
    route: "/books/no-claim-without-evidence/sample",
    tokens: [
      "Reading sample sections",
      "Most AI product mistakes do not start with a bad model.",
      "A claim is a value plus a reason to trust it",
      "Test the pipeline, not just the model",
      "Your eval should become a release gate",
      "The claim-evidence ledger",
      "Buy the full book",
    ],
  },
  {
    route: "/product-lab/",
    tokens: ["Review audited case studies instead", "/vendor/three/three.module.js"],
  },
];

async function main() {
  const staticExport = await createStaticExportServer({ port: preferredPort });
  const failures = [];

  try {
    for (const check of checks) {
      const response = await fetch(`${staticExport.baseUrl}${check.route}`, {
        redirect: "manual",
      });
      const body = await response.text();
      if (!response.ok) {
        failures.push(`${check.route} returned ${response.status}`);
        continue;
      }
      for (const token of check.tokens) {
        if (!body.includes(token)) failures.push(`${check.route} missing ${token}`);
      }
    }

    const bookResponse = await fetch(
      `${staticExport.baseUrl}/books/no-claim-without-evidence`,
    );
    const bookBody = await bookResponse.text();
    if (bookBody.includes("₹799 in India · $14.99 elsewhere")) {
      failures.push("book export exposes both regional prices in one sales line");
    }
    if (bookBody.includes("See the full book page")) {
      failures.push("book or sample export retains circular sample navigation copy");
    }

    for (const starter of [
      "/workflows/document-extraction-starter.md",
      "/workflows/signature-document-starter.md",
      "/workflows/visual-inspection-starter.md",
      "/workflows/spatial-coverage-starter.md",
      "/workflows/meeting-capture-starter.md",
    ]) {
      const response = await fetch(`${staticExport.baseUrl}${starter}`);
      const body = await response.text();
      if (!response.ok || body.length < 1800) {
        failures.push(`${starter} is not a substantial direct download`);
      }
    }

    const buildResponse = await fetch(`${staticExport.baseUrl}/build-info.json`);
    if (!buildResponse.ok) {
      failures.push(`/build-info.json returned ${buildResponse.status}`);
    } else {
      const buildInfo = await buildResponse.json();
      if (buildInfo.repository !== "pranaysuyash/me") {
        failures.push("build-info repository mismatch");
      }
      if (buildInfo.releaseContract !== "career-platform-v2") {
        failures.push("build-info release contract mismatch");
      }
      if (!/^[a-f0-9]{40}$/.test(buildInfo.commit || "")) {
        failures.push("build-info commit is not a full SHA");
      }
    }
  } finally {
    await staticExport.close();
  }

  if (failures.length) {
    console.error(`Local HTTP smoke test failed:\n${failures.join("\n")}`);
    process.exit(1);
  }

  console.log(
    `Local HTTP smoke test passed at ${staticExport.baseUrl}: identity, role and commercial routes, workflow catalogue and starter downloads, canonical prices, one-region ebook pricing, substantive reading excerpts, resilient contact fallback, selected work, working systems, proof, product lab, and build identity are reachable from the static export.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
