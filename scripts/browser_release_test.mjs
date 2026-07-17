#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { launchChromeCdp } from "./lib/chrome_cdp.mjs";
import { createStaticExportServer } from "./lib/static_export_server.mjs";

const artifactsDir = path.join(process.cwd(), "browser-artifacts");
fs.rmSync(artifactsDir, { recursive: true, force: true });
fs.mkdirSync(artifactsDir, { recursive: true });

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const assert = (condition, message, failures) => {
  if (!condition) failures.push(message);
};

function expectedProductLabError(route, text) {
  return (
    route === "/product-lab/" &&
    /THREE\.WebGLRenderer|WebGL context|Error creating WebGL context|WebGL unavailable/i.test(
      text,
    )
  );
}

async function main() {
  const staticExport = await createStaticExportServer();
  const browser = await launchChromeCdp();
  const failures = [];
  const runtimeEntries = [];
  let currentRoute = "about:blank";
  let productLabFallbackVerified = false;

  try {
    const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await browser.send("Target.attachToTarget", { targetId, flatten: true });
    await browser.send("Page.enable", {}, sessionId);
    await browser.send("Runtime.enable", {}, sessionId);
    await browser.send("Log.enable", {}, sessionId);

    browser.eventListeners.add((message) => {
      if (message.sessionId !== sessionId) return;
      if (message.method === "Runtime.exceptionThrown") {
        const details = message.params.exceptionDetails || {};
        runtimeEntries.push({
          route: currentRoute,
          url: details.url || "",
          text: String(details.exception?.description || details.exception?.value || details.text || "Uncaught"),
        });
      }
      if (message.method === "Log.entryAdded" && message.params.entry?.level === "error") {
        runtimeEntries.push({
          route: currentRoute,
          url: String(message.params.entry.url || ""),
          text: String(message.params.entry.text || "browser log error"),
        });
      }
      if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
        runtimeEntries.push({
          route: currentRoute,
          url: String(message.params.stackTrace?.callFrames?.[0]?.url || ""),
          text: (message.params.args || [])
            .map((argument) => argument.value || argument.description || "")
            .join(" "),
        });
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

    async function navigate(route, { width = 1440, height = 1000, mobile = false, settleMs = 900 } = {}) {
      currentRoute = route;
      await browser.send(
        "Emulation.setDeviceMetricsOverride",
        { width, height, deviceScaleFactor: 1, mobile },
        sessionId,
      );
      const loaded = browser.waitForEvent("Page.loadEventFired", sessionId);
      await browser.send("Page.navigate", { url: `${staticExport.baseUrl}${route}` }, sessionId);
      await loaded;
      await wait(settleMs);
    }

    const visibleText = () => evaluate("document.body?.innerText || ''");

    async function pageHealth(label) {
      const health = await evaluate(`(() => {
        const controls = Array.from(document.querySelectorAll('input, select, textarea'))
          .filter((element) => element.type !== 'hidden');
        const unlabeled = controls.filter((element) => {
          if (element.getAttribute('aria-label') || element.getAttribute('aria-labelledby')) return false;
          if (!element.id) return true;
          return !document.querySelector('label[for="' + CSS.escape(element.id) + '"]');
        });
        return {
          h1Count: document.querySelectorAll('h1').length,
          missingAlt: Array.from(document.querySelectorAll('img'))
            .filter((image) => !image.hasAttribute('alt') || !image.alt.trim()).length,
          emptyLinks: Array.from(document.querySelectorAll('a[href]'))
            .filter((link) => !(link.textContent || '').trim() && !link.getAttribute('aria-label')).length,
          unlabeledControls: unlabeled.length,
          horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
        };
      })()`);
      assert(health.h1Count === 1, `${label} must expose exactly one h1`, failures);
      assert(health.missingAlt === 0, `${label} contains ${health.missingAlt} image(s) without useful alt text`, failures);
      assert(health.emptyLinks === 0, `${label} contains ${health.emptyLinks} unnamed link(s)`, failures);
      assert(health.unlabeledControls === 0, `${label} contains ${health.unlabeledControls} unlabeled control(s)`, failures);
      assert(health.horizontalOverflow <= 1, `${label} overflows horizontally by ${health.horizontalOverflow}px`, failures);
    }

    async function screenshot(name) {
      const result = await browser.send(
        "Page.captureScreenshot",
        { format: "png", captureBeyondViewport: true, fromSurface: true },
        sessionId,
      );
      fs.writeFileSync(path.join(artifactsDir, `${name}.png`), Buffer.from(result.data, "base64"));
    }

    async function primeLazyImages() {
      const height = await evaluate("Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)");
      for (let position = 0; position < height; position += 700) {
        await evaluate(`window.scrollTo(0, ${position})`);
        await wait(70);
      }
      await evaluate("window.scrollTo(0, 0)");
      await wait(300);
    }

    await navigate("/");
    let text = await visibleText();
    assert(
      text.includes("I turn document-heavy, exception-heavy workflows into AI systems people can review and run."),
      "homepage operational-AI positioning headline is missing after hydration",
      failures,
    );
    assert(text.includes("For hiring teams") && text.includes("Commercial engagements"), "homepage audience routing is missing", failures);
    await pageHealth("desktop homepage");
    await screenshot("01-home-desktop");

    await navigate("/work");
    await primeLazyImages();
    const work = await evaluate(`(() => {
      const figures = Array.from(document.querySelectorAll('figure'));
      const images = figures.map((figure) => figure.querySelector('img')).filter(Boolean);
      return {
        cases: new Set(Array.from(document.querySelectorAll('a[href^="/work/"]')).map((link) => link.getAttribute('href'))).size,
        workflowMaps: figures.filter((figure) => (figure.innerText || '').toLowerCase().includes('workflow map')).length,
        loadedImages: images.filter((image) => image.complete && image.naturalWidth > 0).length,
        text: document.body.innerText,
      };
    })()`);
    assert(work.text.includes("Four products, each labelled by what actually exists today."), "selected work does not explain maturity boundaries", failures);
    assert(work.cases >= 5, `selected work exposes only ${work.cases} distinct case-study links`, failures);
    assert(work.workflowMaps >= 4, `selected work labels only ${work.workflowMaps} workflow-map figures`, failures);
    assert(work.loadedImages >= 4, `selected work loads only ${work.loadedImages} project visual(s)`, failures);
    await pageHealth("selected work");
    await screenshot("02-work-desktop");

    await navigate("/work-with-me");
    await evaluate("localStorage.setItem('pricing-region', 'global')");
    await navigate("/work-with-me");
    text = await visibleText();
    assert(text.includes("$2,500+"), "global engagement price is not rendered", failures);
    assert(!text.includes("₹95,000+"), "global pricing view also exposes the India mapping price", failures);
    const selectedIndia = await evaluate(`(() => {
      const button = Array.from(document.querySelectorAll('button'))
        .find((item) => (item.textContent || '').trim().startsWith('India'));
      if (!button) return false;
      button.click();
      return true;
    })()`);
    assert(selectedIndia, "India pricing selector is not operable", failures);
    await wait(250);
    text = await visibleText();
    assert(text.includes("₹95,000+"), "India pricing does not appear after selection", failures);
    assert(!text.includes("$2,500+"), "India pricing view also exposes the global mapping price", failures);
    await pageHealth("commercial engagements");
    await screenshot("03-services-india");

    await navigate("/contact?type=role&source=browser-release");
    let contact = await evaluate(`({
      rolePressed: Array.from(document.querySelectorAll('button'))
        .find((item) => (item.textContent || '').includes('Senior internal role'))?.getAttribute('aria-pressed'),
      budgetVisible: Boolean(document.querySelector('#budget')),
      action: document.querySelector('form')?.getAttribute('action'),
      source: document.querySelector('input[name="source"]')?.value,
      mode: document.querySelector('input[name="mode"]')?.value,
    })`);
    assert(contact.rolePressed === "true", "role contact route does not select role mode", failures);
    assert(contact.budgetVisible === false, "role contact mode exposes the commercial budget control", failures);
    assert(contact.action === "https://formbold.com/s/6QZJn", "contact form lost its standard HTML fallback action", failures);
    assert(contact.source === "browser-release:role", "role contact source attribution is incorrect", failures);
    assert(contact.mode === "role", "role contact hidden mode is incorrect", failures);
    const selectedProject = await evaluate(`(() => {
      const button = Array.from(document.querySelectorAll('button'))
        .find((item) => (item.textContent || '').includes('Bounded commercial engagement'));
      if (!button) return false;
      button.click();
      return true;
    })()`);
    assert(selectedProject, "commercial contact selector is not operable", failures);
    await wait(250);
    contact = await evaluate(`({
      projectPressed: Array.from(document.querySelectorAll('button'))
        .find((item) => (item.textContent || '').includes('Bounded commercial engagement'))?.getAttribute('aria-pressed'),
      budgetVisible: Boolean(document.querySelector('#budget')),
      source: document.querySelector('input[name="source"]')?.value,
      mode: document.querySelector('input[name="mode"]')?.value,
    })`);
    assert(contact.projectPressed === "true", "commercial contact mode does not become selected", failures);
    assert(contact.budgetVisible === true, "commercial contact mode does not expose regional scope", failures);
    assert(contact.source === "browser-release:project", "commercial contact source attribution is incorrect", failures);
    assert(contact.mode === "project", "commercial contact hidden mode is incorrect", failures);
    await pageHealth("contact flow");

    await navigate("/books/no-claim-without-evidence");
    const book = await evaluate(`({
      text: document.body.innerText,
      regionGroup: Boolean(document.querySelector('[role="group"][aria-label="Choose ebook pricing region"]')),
      indiaPressed: Array.from(document.querySelectorAll('button'))
        .find((item) => (item.textContent || '').trim() === 'India')?.getAttribute('aria-pressed'),
    })`);
    assert(book.regionGroup, "book page lacks an accessible regional price control", failures);
    assert(book.indiaPressed === "true", "book page does not retain the selected India region", failures);
    assert(book.text.includes("₹799"), "book page does not show the India price", failures);
    assert(!book.text.includes("$14.99"), "book page exposes both regional prices at once", failures);
    assert(book.text.includes("Open the reading sample"), "book page lacks a clear sample path", failures);
    await pageHealth("book sales page");

    await navigate("/books/no-claim-without-evidence/sample");
    const sample = await evaluate(`({
      text: document.body.innerText,
      sections: document.querySelectorAll('main section[id]').length,
      buyHref: Array.from(document.querySelectorAll('a'))
        .find((link) => (link.textContent || '').includes('Buy the full book'))?.href || '',
    })`);
    for (const required of [
      "Most AI product mistakes do not start with a bad model.",
      "A claim is a value plus a reason to trust it",
      "Test the pipeline, not just the model",
      "Your eval should become a release gate",
      "The claim-evidence ledger",
    ]) {
      assert(sample.text.includes(required), `reading sample is missing: ${required}`, failures);
    }
    assert(sample.sections >= 5, `reading sample exposes only ${sample.sections} substantive section(s)`, failures);
    assert(sample.buyHref.startsWith("https://checkout.dodopayments.com/"), "reading sample does not lead directly to secure checkout", failures);
    assert(!sample.text.includes("See the full book page"), "reading sample retains circular navigation copy", failures);
    await pageHealth("reading sample");
    await screenshot("04-reading-sample");

    await navigate("/", { width: 390, height: 844, mobile: true });
    const mobile = await evaluate(`({
      menu: document.querySelector('button[aria-controls="mobile-menu"]')?.getAttribute('aria-expanded'),
      width: document.documentElement.scrollWidth - innerWidth,
    })`);
    assert(mobile.menu === "false", "mobile navigation trigger is missing or incorrectly initialized", failures);
    const openedMenu = await evaluate(`(() => {
      const trigger = document.querySelector('button[aria-controls="mobile-menu"]');
      if (!trigger) return false;
      trigger.click();
      return true;
    })()`);
    assert(openedMenu, "mobile menu trigger is not operable", failures);
    await wait(300);
    const mobileMenu = await evaluate(`({
      dialog: Boolean(document.querySelector('[role="dialog"][aria-modal="true"]')),
      bodyLocked: document.body.style.overflow === 'hidden',
      activeInside: Boolean(document.activeElement?.closest('[role="dialog"]')),
    })`);
    assert(mobileMenu.dialog, "mobile menu does not expose an accessible modal dialog", failures);
    assert(mobileMenu.bodyLocked, "mobile menu does not lock background scrolling", failures);
    assert(mobileMenu.activeInside, "mobile menu does not move focus into the dialog", failures);
    await pageHealth("mobile homepage");
    await screenshot("05-home-mobile-menu");

    await navigate("/books/no-claim-without-evidence/sample", { width: 390, height: 844, mobile: true });
    await pageHealth("mobile reading sample");
    await screenshot("06-reading-sample-mobile");

    await navigate("/product-lab/", { settleMs: 1800 });
    const lab = await evaluate(`(() => {
      const root = document.querySelector('#lab');
      const fallback = document.querySelector('#fallback');
      return {
        ready: root?.dataset.ready === 'true',
        canvas: Boolean(root?.querySelector('canvas')),
        fallbackVisible: fallback?.getAttribute('aria-hidden') !== 'true',
        fallbackText: fallback?.innerText || '',
        fallbackHref: fallback?.querySelector('a')?.getAttribute('href') || '',
        projectButtons: document.querySelectorAll('#project-tabs button').length,
        modeButtons: document.querySelectorAll('#mode-tabs button').length,
      };
    })()`);
    if (lab.ready) {
      assert(lab.canvas, "ready product lab does not expose a canvas", failures);
      assert(lab.projectButtons === 4, `ready product lab exposes ${lab.projectButtons} project tabs`, failures);
      assert(lab.modeButtons >= 3, `ready product lab exposes only ${lab.modeButtons} mode tabs`, failures);
    } else {
      productLabFallbackVerified = true;
      assert(lab.fallbackVisible, "WebGL-unavailable product lab hides its fallback", failures);
      assert(lab.fallbackText.includes("Case studies remain available without WebGL"), "product lab fallback does not explain the non-WebGL path", failures);
      assert(lab.fallbackHref === "/work", "product lab fallback does not lead to audited work", failures);
    }
    await pageHealth("product lab");
    await screenshot("07-product-lab");

    for (const entry of runtimeEntries) {
      const value = String(entry.text || "").trim();
      if (!value) continue;
      if (expectedProductLabError(entry.route, value)) continue;
      if (entry.route === "/product-lab/" && productLabFallbackVerified && /^(Uncaught|Error)$/i.test(value)) continue;
      const location = entry.url ? ` (${entry.url})` : "";
      failures.push(`browser runtime error: ${entry.route}${location}: ${value}`);
    }
  } finally {
    await browser.close();
    await staticExport.close();
  }

  const report = {
    generatedAt: new Date().toISOString(),
    chromeExecutable: browser.executablePath,
    debuggerPort: browser.port,
    failures: [...new Set(failures)],
    screenshots: fs.readdirSync(artifactsDir).filter((name) => name.endsWith(".png")),
  };
  fs.writeFileSync(path.join(artifactsDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);

  if (report.failures.length) {
    console.error(`Headless browser release verification failed:\n${report.failures.join("\n")}`);
    process.exit(1);
  }

  console.log(
    `Headless browser release verification passed: hydrated desktop and mobile pages, regional pricing, contact routing and attribution, book conversion, responsive overflow, accessibility basics, mobile navigation, product-lab initialization or WebGL fallback, and browser runtime health are intact. Screenshots: ${report.screenshots.length}.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exit(1);
});
