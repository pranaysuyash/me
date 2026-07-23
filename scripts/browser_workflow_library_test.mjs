#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { launchChromeCdp } from "./lib/chrome_cdp.mjs";
import { createStaticExportServer } from "./lib/static_export_server.mjs";

const artifactsDir = path.join(process.cwd(), "browser-artifacts");
fs.mkdirSync(artifactsDir, { recursive: true });

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const assert = (condition, message, failures) => {
  if (!condition) failures.push(message);
};

async function main() {
  const staticExport = await createStaticExportServer();
  const browser = await launchChromeCdp();
  const failures = [];
  const runtimeErrors = [];

  try {
    const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await browser.send("Target.attachToTarget", {
      targetId,
      flatten: true,
    });
    await browser.send("Page.enable", {}, sessionId);
    await browser.send("Runtime.enable", {}, sessionId);
    await browser.send("Log.enable", {}, sessionId);

    browser.eventListeners.add((message) => {
      if (message.sessionId !== sessionId) return;
      if (message.method === "Runtime.exceptionThrown") {
        const details = message.params.exceptionDetails || {};
        runtimeErrors.push(
          details.exception?.description || details.text || "Uncaught browser exception",
        );
      }
      if (message.method === "Log.entryAdded" && message.params.entry?.level === "error") {
        runtimeErrors.push(
          `${message.params.entry.url || "browser"}: ${message.params.entry.text || "error"}`,
        );
      }
      if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
        runtimeErrors.push(
          (message.params.args || [])
            .map((argument) => argument.value || argument.description || "")
            .join(" "),
        );
      }
    });

    async function evaluate(expression) {
      const result = await browser.send(
        "Runtime.evaluate",
        { expression, awaitPromise: true, returnByValue: true },
        sessionId,
      );
      if (result.exceptionDetails) {
        throw new Error(
          result.exceptionDetails.exception?.description ||
            result.exceptionDetails.text ||
            "Browser evaluation failed",
        );
      }
      return result.result?.value;
    }

    async function navigate(width = 1440, height = 1000, mobile = false, search = "") {
      await browser.send(
        "Emulation.setDeviceMetricsOverride",
        { width, height, deviceScaleFactor: 1, mobile },
        sessionId,
      );
      const loaded = browser.waitForEvent("Page.loadEventFired", sessionId);
      await browser.send(
        "Page.navigate",
        { url: `${staticExport.baseUrl}/workflows${search}` },
        sessionId,
      );
      await loaded;
      await wait(900);
    }

    async function screenshot(name) {
      const result = await browser.send(
        "Page.captureScreenshot",
        { format: "png", captureBeyondViewport: false, fromSurface: true },
        sessionId,
      );
      fs.writeFileSync(
        path.join(artifactsDir, `${name}.png`),
        Buffer.from(result.data, "base64"),
      );
    }

    async function pressChoice(text) {
      return evaluate(`(() => {
        const button = Array.from(document.querySelectorAll('button'))
          .find((item) => (item.textContent || '').trim() === ${JSON.stringify(text)});
        button?.click();
        return Boolean(button);
      })()`);
    }

    async function reveal(selector) {
      return evaluate(`(() => {
        const target = document.querySelector(${JSON.stringify(selector)});
        if (!(target instanceof HTMLElement)) return false;
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
        window.scrollBy(0, -88);
        return true;
      })()`);
    }

    await navigate();
    const initial = await evaluate(`({
      h1: document.querySelector('h1')?.textContent || '',
      library: Boolean(document.querySelector('[data-workflow-library]')),
      input: document.querySelector('[data-workflow-library]')?.getAttribute('data-selected-input') || '',
      priority: document.querySelector('[data-workflow-library]')?.getAttribute('data-selected-priority') || '',
      path: document.querySelector('[data-workflow-library]')?.getAttribute('data-selected-path') || '',
      cards: document.querySelectorAll('[data-workflow-id]').length,
      first: document.querySelector('[data-workflow-id]')?.getAttribute('data-workflow-id') || '',
      workflowNav: Boolean(document.querySelector('nav[aria-label="Primary navigation"] a[href="/workflows"]')),
      overflow: document.documentElement.scrollWidth - innerWidth,
    })`);
    assert(
      initial.h1.includes("Choose the workflow first") && initial.library,
      "workflow library exposes no interactive chooser",
      failures,
    );
    assert(
      initial.input === "any" && initial.priority === "any" && initial.path === "download",
      `default workflow selection is ${initial.input}/${initial.priority}/${initial.path}`,
      failures,
    );
    assert(initial.cards === 5, `workflow library exposes ${initial.cards} cards instead of five`, failures);
    assert(
      initial.first === "document-extraction-review",
      "document extraction is not the default best match",
      failures,
    );
    assert(initial.workflowNav, "workflow library is missing from primary navigation", failures);
    assert(initial.overflow <= 1, `desktop workflow library overflows by ${initial.overflow}px`, failures);

    assert(await pressChoice("Images and signatures"), "image input choice cannot be selected", failures);
    assert(await pressChoice("Local privacy"), "local privacy choice cannot be selected", failures);
    await wait(300);
    let state = await evaluate(`({
      cards: document.querySelectorAll('[data-workflow-id]').length,
      first: document.querySelector('[data-workflow-id]')?.getAttribute('data-workflow-id') || '',
      input: document.querySelector('[data-workflow-library]')?.getAttribute('data-selected-input') || '',
      priority: document.querySelector('[data-workflow-library]')?.getAttribute('data-selected-priority') || '',
      locationSearch: location.search,
      projectHref: document.querySelector('[data-workflow-id="signature-document-handling"] a[href*="workflow-library-signature-project"]')?.getAttribute('href') || '',
    })`);
    assert(state.cards === 2, `image workflow selection returns ${state.cards} cards instead of two`, failures);
    assert(
      state.first === "signature-document-handling",
      "signature workflow is not recommended for image input plus local privacy",
      failures,
    );
    assert(
      state.input === "images" && state.priority === "privacy",
      `workflow selection attributes are ${state.input}/${state.priority}`,
      failures,
    );
    assert(
      state.locationSearch.includes("input=images") && state.locationSearch.includes("priority=privacy"),
      `workflow selection is not preserved in the URL: ${state.locationSearch}`,
      failures,
    );
    assert(
      state.projectHref.includes("workflow-library-signature-project") &&
        state.projectHref.includes("workflow-signature-document-handling") &&
        state.projectHref.includes("input-images") &&
        state.projectHref.includes("priority-privacy") &&
        state.projectHref.includes("path-project"),
      `signature project path loses selected workflow context: ${state.projectHref}`,
      failures,
    );
    assert(
      await reveal('[data-workflow-id="signature-document-handling"]'),
      "signature recommendation cannot be revealed for retained evidence",
      failures,
    );
    await wait(200);
    await screenshot("14-workflow-library-signature");

    assert(await pressChoice("Meetings and audio"), "meeting input choice cannot be selected", failures);
    assert(await pressChoice("Try a live mechanism"), "live mechanism path cannot be selected", failures);
    await wait(250);
    state = await evaluate(`({
      cards: document.querySelectorAll('[data-workflow-id]').length,
      empty: document.body.innerText.includes('No live mechanism matches that exact combination.'),
    })`);
    assert(
      state.cards === 0 && state.empty,
      "meeting workflow incorrectly exposes a live mechanism",
      failures,
    );

    assert(await pressChoice("Any priority"), "priority cannot be reset for meeting starter", failures);
    assert(await pressChoice("Download a starter"), "starter path cannot be restored", failures);
    await wait(250);
    state = await evaluate(`({
      cards: document.querySelectorAll('[data-workflow-id]').length,
      first: document.querySelector('[data-workflow-id]')?.getAttribute('data-workflow-id') || '',
      liveLink: Boolean(document.querySelector('[data-workflow-id="meeting-capture-retrieval"] a[href*="capability-tab"]')),
      starterHref: document.querySelector('[data-workflow-id="meeting-capture-retrieval"] a[download]')?.getAttribute('href') || '',
    })`);
    assert(
      state.cards === 1 && state.first === "meeting-capture-retrieval",
      "meeting workflow is not recovered for the starter path",
      failures,
    );
    assert(!state.liveLink, "meeting workflow fabricates a working mechanism link", failures);
    assert(
      state.starterHref === "/workflows/meeting-capture-starter.md",
      `meeting starter href is incorrect: ${state.starterHref}`,
      failures,
    );

    const starterResponse = await fetch(
      `${staticExport.baseUrl}/workflows/meeting-capture-starter.md`,
    );
    const starterText = await starterResponse.text();
    assert(
      starterResponse.ok && starterText.includes("Meeting capture and searchable retrieval"),
      "starter download is not directly retrievable",
      failures,
    );

    await navigate(
      1440,
      1000,
      false,
      "?input=spatial&priority=simulation&path=live",
    );
    state = await evaluate(`({
      input: document.querySelector('[data-workflow-library]')?.getAttribute('data-selected-input') || '',
      priority: document.querySelector('[data-workflow-library]')?.getAttribute('data-selected-priority') || '',
      path: document.querySelector('[data-workflow-library]')?.getAttribute('data-selected-path') || '',
      cards: document.querySelectorAll('[data-workflow-id]').length,
      first: document.querySelector('[data-workflow-id]')?.getAttribute('data-workflow-id') || '',
      locationSearch: location.search,
    })`);
    assert(
      state.input === "spatial" && state.priority === "simulation" && state.path === "live",
      `deep-linked workflow selection hydrates as ${state.input}/${state.priority}/${state.path}`,
      failures,
    );
    assert(
      state.cards === 1 && state.first === "spatial-coverage-review",
      "deep-linked spatial simulation does not restore the exact recommendation",
      failures,
    );
    assert(
      state.locationSearch.includes("input=spatial") &&
        state.locationSearch.includes("priority=simulation") &&
        state.locationSearch.includes("path=live"),
      `deep-linked workflow URL is not retained: ${state.locationSearch}`,
      failures,
    );

    await navigate(390, 844, true);
    const mobile = await evaluate(`({
      library: Boolean(document.querySelector('[data-workflow-library]')),
      cards: document.querySelectorAll('[data-workflow-id]').length,
      overflow: document.documentElement.scrollWidth - innerWidth,
    })`);
    assert(mobile.library && mobile.cards === 5, "mobile workflow library loses its catalogue", failures);
    assert(
      mobile.overflow <= 1,
      `workflow library mobile page overflows by ${mobile.overflow}px`,
      failures,
    );
    assert(
      await reveal('[data-workflow-library]'),
      "mobile chooser cannot be revealed for retained evidence",
      failures,
    );
    await wait(200);
    await screenshot("15-workflow-library-mobile");

    for (const runtimeError of [...new Set(runtimeErrors)]) {
      if (/favicon\.ico/i.test(runtimeError)) continue;
      failures.push(`workflow library browser runtime error: ${runtimeError}`);
    }
  } finally {
    await browser.close();
    await staticExport.close();
  }

  const report = {
    generatedAt: new Date().toISOString(),
    failures: [...new Set(failures)],
    screenshots: fs
      .readdirSync(artifactsDir)
      .filter((name) => /^(?:14|15)-.*\.png$/.test(name)),
  };
  fs.writeFileSync(
    path.join(artifactsDir, "workflow-library-report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );

  if (report.failures.length) {
    console.error(`Workflow library browser verification failed:\n${report.failures.join("\n")}`);
    process.exit(1);
  }

  console.log(
    `Workflow library browser verification passed: five workflows, exact priority filtering, URL-backed recommendations, selected-context project attribution, honest live-mechanism availability, direct starter delivery, navigation, and desktop/mobile containment are intact. Screenshots: ${report.screenshots.length}.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exit(1);
});
