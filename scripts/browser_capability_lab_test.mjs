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

function expectedProductLabError(text) {
  return /THREE\.WebGLRenderer|WebGL context|Error creating WebGL context|WebGL unavailable/i.test(
    text,
  );
}

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

    async function navigate({
      route = "/systems",
      width = 1440,
      height = 1000,
      mobile = false,
    } = {}) {
      await browser.send(
        "Emulation.setDeviceMetricsOverride",
        { width, height, deviceScaleFactor: 1, mobile },
        sessionId,
      );
      const loaded = browser.waitForEvent("Page.loadEventFired", sessionId);
      await browser.send(
        "Page.navigate",
        { url: `${staticExport.baseUrl}${route}` },
        sessionId,
      );
      await loaded;
      await wait(1100);
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

    await navigate();
    const initial = await evaluate(`({
      h1: document.querySelector('h1')?.textContent || '',
      lab: Boolean(document.querySelector('[data-capability-lab]')),
      tabs: document.querySelectorAll('[role="tab"]').length,
      selected: document.querySelector('[role="tab"][aria-selected="true"]')?.textContent || '',
      fieldCount: Number(document.querySelector('[data-extracted-field-count]')?.getAttribute('data-extracted-field-count') || 0),
      overflow: document.documentElement.scrollWidth - innerWidth,
    })`);
    assert(
      initial.h1.includes("Operate a small mechanism") && initial.lab,
      "systems page does not expose the working capability lab",
      failures,
    );
    assert(initial.tabs === 4, `capability lab exposes ${initial.tabs} tabs instead of four`, failures);
    assert(initial.selected.includes("Evidence extraction"), "evidence extraction is not the default mechanism", failures);
    assert(initial.fieldCount >= 6, `default extraction found only ${initial.fieldCount} fields`, failures);
    assert(initial.overflow <= 1, `desktop systems page overflows by ${initial.overflow}px`, failures);

    await navigate({ route: "/systems#capability-tab-cleanup" });
    const deepLink = await evaluate(`({
      selectedId: document.querySelector('[role="tab"][aria-selected="true"]')?.id || '',
      panelLabel: document.querySelector('[role="tabpanel"]')?.getAttribute('aria-labelledby') || '',
      foregroundPixels: Number(document.querySelector('[data-foreground-pixels]')?.getAttribute('data-foreground-pixels') || 0),
    })`);
    assert(
      deepLink.selectedId === "capability-tab-cleanup" &&
        deepLink.panelLabel === "capability-tab-cleanup" &&
        deepLink.foregroundPixels > 1000,
      "cleanup deep link does not activate the working image-cleanup mechanism",
      failures,
    );

    await navigate();
    const editedInvoice = [
      "Lab Services",
      "Invoice No: LAB-9001",
      "Invoice Date: 19/07/2026",
      "Bill To: Browser Test Co",
      "GSTIN: 29ABCDE1234F1Z5",
      "Tax: INR 188.50",
      "Total: INR 1,234.50",
    ].join("\n");
    const changedSource = await evaluate(`(() => {
      const textarea = document.querySelector('#capability-document-source');
      if (!(textarea instanceof HTMLTextAreaElement)) return false;
      const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')?.set;
      setter?.call(textarea, ${JSON.stringify(editedInvoice)});
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      const run = Array.from(document.querySelectorAll('button'))
        .find((button) => (button.textContent || '').includes('Run extraction'));
      run?.click();
      return Boolean(run);
    })()`);
    assert(changedSource, "document extraction source cannot be edited and rerun", failures);
    await wait(300);
    const extracted = await evaluate(`({
      invoice: document.querySelector('[data-field-value="invoice_number"]')?.textContent || '',
      total: document.querySelector('[data-field-value="total_amount"]')?.textContent || '',
      fieldCount: Number(document.querySelector('[data-extracted-field-count]')?.getAttribute('data-extracted-field-count') || 0),
    })`);
    assert(extracted.invoice.trim() === "LAB-9001", "edited invoice number was not extracted", failures);
    assert(extracted.total.trim().startsWith("₹1,234"), "edited total was not extracted", failures);
    assert(extracted.fieldCount >= 6, `edited extraction found only ${extracted.fieldCount} fields`, failures);
    await screenshot("11-capability-extraction");

    const openedCleanup = await evaluate(`(() => {
      const tab = Array.from(document.querySelectorAll('[role="tab"]'))
        .find((item) => (item.textContent || '').includes('Local image cleanup'));
      tab?.click();
      return Boolean(tab);
    })()`);
    assert(openedCleanup, "local image cleanup tab cannot be opened", failures);
    await wait(500);
    let foregroundPixels = Number(
      await evaluate("document.querySelector('[data-foreground-pixels]')?.getAttribute('data-foreground-pixels') || 0"),
    );
    assert(foregroundPixels > 1000, `signature cleanup produced only ${foregroundPixels} foreground pixels`, failures);
    const adjustedThreshold = await evaluate(`(() => {
      const input = document.querySelector('#signature-threshold');
      if (!(input instanceof HTMLInputElement)) return false;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      setter?.call(input, '205');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    })()`);
    assert(adjustedThreshold, "signature threshold control cannot be adjusted", failures);
    await wait(350);
    foregroundPixels = Number(
      await evaluate("document.querySelector('[data-foreground-pixels]')?.getAttribute('data-foreground-pixels') || 0"),
    );
    assert(foregroundPixels > 1000, "signature cleanup loses all foreground after adjustment", failures);

    const openedInspection = await evaluate(`(() => {
      const tab = Array.from(document.querySelectorAll('[role="tab"]'))
        .find((item) => (item.textContent || '').includes('Visual inspection'));
      tab?.click();
      return Boolean(tab);
    })()`);
    assert(openedInspection, "visual inspection tab cannot be opened", failures);
    await wait(500);
    const edgeDensity = Number(
      await evaluate("document.querySelector('[data-edge-density]')?.getAttribute('data-edge-density') || 0"),
    );
    assert(edgeDensity > 0.1, `visual inspection edge density is ${edgeDensity}`, failures);

    const openedVisibility = await evaluate(`(() => {
      const tab = Array.from(document.querySelectorAll('[role="tab"]'))
        .find((item) => (item.textContent || '').includes('Spatial visibility'));
      tab?.click();
      return Boolean(tab);
    })()`);
    assert(openedVisibility, "spatial visibility tab cannot be opened", failures);
    await wait(250);
    const initialCoverage = Number(
      await evaluate("document.querySelector('[data-coverage-score]')?.getAttribute('data-coverage-score') || -1"),
    );
    assert(initialCoverage === 50, `initial spatial coverage is ${initialCoverage} instead of 50`, failures);
    const movedShelf = await evaluate(`(() => {
      const button = Array.from(document.querySelectorAll('button'))
        .find((item) => (item.textContent || '').includes('Move shelf clear'));
      button?.click();
      return Boolean(button);
    })()`);
    assert(movedShelf, "shelf clear preset cannot be operated", failures);
    await wait(250);
    const clearCoverage = Number(
      await evaluate("document.querySelector('[data-coverage-score]')?.getAttribute('data-coverage-score') || -1"),
    );
    assert(clearCoverage === 100, `clear spatial coverage is ${clearCoverage} instead of 100`, failures);
    await screenshot("12-capability-spatial");

    await navigate({ width: 390, height: 844, mobile: true });
    const mobile = await evaluate(`({
      lab: Boolean(document.querySelector('[data-capability-lab]')),
      tabs: document.querySelectorAll('[role="tab"]').length,
      overflow: document.documentElement.scrollWidth - innerWidth,
    })`);
    assert(mobile.lab && mobile.tabs === 4, "mobile systems page loses the capability lab", failures);
    assert(mobile.overflow <= 1, `mobile systems page overflows by ${mobile.overflow}px`, failures);
    await screenshot("13-capability-mobile");

    for (const runtimeError of [...new Set(runtimeErrors)]) {
      if (/favicon\.ico/i.test(runtimeError)) continue;
      if (expectedProductLabError(runtimeError)) continue;
      failures.push(`capability browser runtime error: ${runtimeError}`);
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
      .filter((name) => /^(?:11|12|13)-.*\.png$/.test(name)),
  };
  fs.writeFileSync(
    path.join(artifactsDir, "capability-report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );

  if (report.failures.length) {
    console.error(`Capability lab browser verification failed:\n${report.failures.join("\n")}`);
    process.exit(1);
  }

  console.log(
    `Capability lab browser verification passed: direct mechanism links, editable evidence extraction, local Canvas cleanup, visual edge inspection, deterministic spatial visibility, desktop/mobile containment, and runtime health are intact. Screenshots: ${report.screenshots.length}.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exit(1);
});
