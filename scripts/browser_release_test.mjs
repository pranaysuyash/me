#!/usr/bin/env node

import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createStaticExportServer } from "./lib/static_export_server.mjs";

const artifactsDir = path.join(process.cwd(), "browser-artifacts");
fs.rmSync(artifactsDir, { recursive: true, force: true });
fs.mkdirSync(artifactsDir, { recursive: true });

function findBrowser() {
  if (process.env.BROWSER_EXECUTABLE_PATH) return process.env.BROWSER_EXECUTABLE_PATH;

  const macCandidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  ];
  for (const candidate of macCandidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  for (const command of [
    "google-chrome-stable",
    "google-chrome",
    "chromium",
    "chromium-browser",
    "microsoft-edge",
  ]) {
    try {
      return execFileSync("which", [command], { encoding: "utf8" }).trim();
    } catch {
      // Try the next known browser executable.
    }
  }

  throw new Error(
    "Headless browser verification requires Chrome, Chromium, or Edge. Set BROWSER_EXECUTABLE_PATH when it is installed in a non-standard location.",
  );
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function launchBrowser(executablePath) {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-browser-"));
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=0",
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ];
  if (typeof process.getuid === "function" && process.getuid() === 0) {
    args.unshift("--no-sandbox");
  }

  const processHandle = spawn(executablePath, args, {
    stdio: ["ignore", "ignore", "pipe"],
  });
  processHandle.stderr.setEncoding("utf8");

  let websocketUrl = "";
  let startupOutput = "";
  processHandle.stderr.on("data", (chunk) => {
    startupOutput += chunk;
    const match = startupOutput.match(/DevTools listening on (ws:\/\/[^\s]+)/);
    if (match) websocketUrl = match[1];
  });

  for (let attempt = 0; attempt < 120 && !websocketUrl; attempt += 1) {
    if (processHandle.exitCode !== null) break;
    await wait(50);
  }
  if (!websocketUrl) {
    processHandle.kill("SIGKILL");
    throw new Error(`Browser did not expose a DevTools endpoint.\n${startupOutput}`);
  }

  const socket = new WebSocket(websocketUrl);
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });

  let nextId = 1;
  const pending = new Map();
  const eventListeners = new Set();

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    }
    for (const listener of eventListeners) listener(message);
  };

  function send(method, params = {}, sessionId) {
    const id = nextId;
    nextId += 1;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      socket.send(
        JSON.stringify({
          id,
          method,
          params,
          ...(sessionId ? { sessionId } : {}),
        }),
      );
    });
  }

  function waitForEvent(method, sessionId, timeout = 15_000) {
    return new Promise((resolve, reject) => {
      const listener = (message) => {
        if (message.method === method && (!sessionId || message.sessionId === sessionId)) {
          cleanup();
          resolve(message.params);
        }
      };
      const timer = setTimeout(() => {
        cleanup();
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeout);
      const cleanup = () => {
        clearTimeout(timer);
        eventListeners.delete(listener);
      };
      eventListeners.add(listener);
    });
  }

  async function close() {
    try {
      await send("Browser.close");
    } catch {
      processHandle.kill("SIGKILL");
    }
    socket.close();
    fs.rmSync(userDataDir, { recursive: true, force: true });
  }

  return { send, waitForEvent, eventListeners, close };
}

function assert(condition, message, failures) {
  if (!condition) failures.push(message);
}

async function main() {
  const staticExport = await createStaticExportServer();
  const browser = await launchBrowser(findBrowser());
  const failures = [];
  const runtimeProblems = [];
  let currentRoute = "about:blank";

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
        runtimeProblems.push(
          `${currentRoute}: ${message.params.exceptionDetails?.text || "uncaught browser exception"}`,
        );
      }
      if (message.method === "Log.entryAdded" && message.params.entry?.level === "error") {
        const text = String(message.params.entry.text || "");
        if (!text.includes("cdn-cgi/trace")) runtimeProblems.push(`${currentRoute}: ${text}`);
      }
      if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
        const text = (message.params.args || [])
          .map((argument) => argument.value || argument.description || "")
          .join(" ");
        if (!text.includes("cdn-cgi/trace")) runtimeProblems.push(`${currentRoute}: ${text}`);
      }
    });

    async function evaluate(expression) {
      const result = await browser.send(
        "Runtime.evaluate",
        {
          expression,
          awaitPromise: true,
          returnByValue: true,
        },
        sessionId,
      );
      if (result.exceptionDetails) {
        throw new Error(result.exceptionDetails.text || "Browser evaluation failed");
      }
      return result.result?.value;
    }

    async function setViewport(width, height, mobile = false) {
      await browser.send(
        "Emulation.setDeviceMetricsOverride",
        { width, height, deviceScaleFactor: 1, mobile },
        sessionId,
      );
    }

    async function navigate(route, { width = 1440, height = 1000, mobile = false } = {}) {
      currentRoute = route;
      await setViewport(width, height, mobile);
      const loaded = browser.waitForEvent("Page.loadEventFired", sessionId);
      await browser.send(
        "Page.navigate",
        { url: `${staticExport.baseUrl}${route}` },
        sessionId,
      );
      await loaded;
      await wait(900);
    }

    async function visibleText() {
      return evaluate("document.body?.innerText || ''");
    }

    async function pageHealth(label) {
      const health = await evaluate(`(() => {
        const controls = Array.from(document.querySelectorAll('input, select, textarea')).filter((element) => element.type !== 'hidden');
        const unlabeled = controls.filter((element) => {
          if (element.getAttribute('aria-label') || element.getAttribute('aria-labelledby')) return false;
          if (!element.id) return true;
          return !document.querySelector('label[for="' + CSS.escape(element.id) + '"]');
        });
        return {
          h1Count: document.querySelectorAll('h1').length,
          missingAlt: Array.from(document.querySelectorAll('img')).filter((image) => !image.hasAttribute('alt') || !image.alt.trim()).length,
          emptyLinks: Array.from(document.querySelectorAll('a[href]')).filter((link) => !(link.textContent || '').trim() && !link.getAttribute('aria-label')).length,
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
      fs.writeFileSync(
        path.join(artifactsDir, `${name}.png`),
        Buffer.from(result.data, "base64"),
      );
    }

    await navigate("/");
    let text = await visibleText();
    assert(
      text.includes(
        "I turn document-heavy, exception-heavy workflows into AI systems people can review and run.",
      ),
      "homepage operational AI positioning headline is missing after hydration",
      failures,
    );
    assert(
      text.includes("For hiring teams") && text.includes("Commercial engagements"),
      "homepage audience routing is missing",
      failures,
    );
    await pageHealth("desktop homepage");
    await screenshot("01-home-desktop");

    await navigate("/work");
    const work = await evaluate(`({
      cases: document.querySelectorAll('a[href^="/work/"]').length,
      workflowMaps: Array.from(document.querySelectorAll('figure')).filter((figure) => figure.innerText.includes('Workflow map')).length,
      text: document.body.innerText,
    })`);
    assert(
      work.text.includes("Four products, each labelled by what actually exists today."),
      "selected work does not explain maturity boundaries",
      failures,
    );
    assert(work.cases >= 4, `selected work exposes only ${work.cases} case-study links`, failures);
    assert(
      work.workflowMaps >= 4,
      `selected work labels only ${work.workflowMaps} workflow-map figures`,
      failures,
    );
    await pageHealth("selected work");
    await screenshot("02-work-desktop");

    await navigate("/work-with-me");
    await evaluate(`localStorage.setItem('pricing-region', 'global')`);
    await navigate("/work-with-me");
    text = await visibleText();
    assert(text.includes("$2,500+"), "global engagement price is not rendered", failures);
    assert(
      !text.includes("₹95,000+"),
      "global pricing view also exposes the India mapping price",
      failures,
    );
    const selectedIndia = await evaluate(`(() => {
      const button = Array.from(document.querySelectorAll('button')).find((item) => (item.textContent || '').includes('India'));
      if (!button) return false;
      button.click();
      return true;
    })()`);
    assert(selectedIndia, "India pricing selector is not operable", failures);
    await wait(250);
    text = await visibleText();
    assert(text.includes("₹95,000+"), "India pricing does not appear after selection", failures);
    assert(
      !text.includes("$2,500+"),
      "India pricing view also exposes the global mapping price",
      failures,
    );
    await pageHealth("commercial engagements");
    await screenshot("03-services-india");

    await navigate("/contact?type=role&source=browser-release");
    let contact = await evaluate(`({
      rolePressed: Array.from(document.querySelectorAll('button')).find((item) => (item.textContent || '').includes('Senior internal role'))?.getAttribute('aria-pressed'),
      budgetVisible: Boolean(document.querySelector('#budget')),
      action: document.querySelector('form')?.getAttribute('action'),
    })`);
    assert(contact.rolePressed === "true", "role contact route does not select role mode", failures);
    assert(
      contact.budgetVisible === false,
      "role contact mode exposes the commercial budget control",
      failures,
    );
    assert(
      contact.action === "https://formbold.com/s/6QZJn",
      "contact form lost its standard HTML fallback action",
      failures,
    );
    const selectedProject = await evaluate(`(() => {
      const button = Array.from(document.querySelectorAll('button')).find((item) => (item.textContent || '').includes('Bounded commercial engagement'));
      if (!button) return false;
      button.click();
      return true;
    })()`);
    assert(selectedProject, "commercial contact selector is not operable", failures);
    await wait(200);
    contact = await evaluate(`({
      projectPressed: Array.from(document.querySelectorAll('button')).find((item) => (item.textContent || '').includes('Bounded commercial engagement'))?.getAttribute('aria-pressed'),
      budgetVisible: Boolean(document.querySelector('#budget')),
    })`);
    assert(
      contact.projectPressed === "true",
      "commercial contact mode does not become selected",
      failures,
    );
    assert(
      contact.budgetVisible === true,
      "commercial contact mode does not expose regional scope",
      failures,
    );
    await pageHealth("contact flow");

    await navigate("/books/no-claim-without-evidence");
    text = await visibleText();
    assert(
      text.includes("Choose ebook pricing region"),
      "book page lacks a regional price control",
      failures,
    );
    assert(
      text.includes("Open the reading sample"),
      "book page lacks a clear sample path",
      failures,
    );
    assert(
      !text.includes("₹799 in India · $14.99 elsewhere"),
      "book page combines both regional prices",
      failures,
    );
    await pageHealth("book sales page");

    await navigate("/books/no-claim-without-evidence/sample");
    const sample = await evaluate(`({
      text: document.body.innerText,
      sections: document.querySelectorAll('main section[id]').length,
      buyHref: Array.from(document.querySelectorAll('a')).find((link) => (link.textContent || '').includes('Buy the full book'))?.href || '',
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
    assert(
      sample.sections >= 5,
      `reading sample exposes only ${sample.sections} substantive section(s)`,
      failures,
    );
    assert(
      sample.buyHref.startsWith("https://checkout.dodopayments.com/"),
      "reading sample does not lead directly to secure checkout",
      failures,
    );
    assert(
      !sample.text.includes("See the full book page"),
      "reading sample retains circular navigation copy",
      failures,
    );
    await pageHealth("reading sample");
    await screenshot("04-reading-sample");

    await navigate("/", { width: 390, height: 844, mobile: true });
    const mobile = await evaluate(`({
      menu: Array.from(document.querySelectorAll('button')).find((button) => (button.textContent || '').includes('Open main menu'))?.getAttribute('aria-expanded'),
      width: document.documentElement.scrollWidth - innerWidth,
    })`);
    assert(
      mobile.menu === "false",
      "mobile navigation trigger is missing or incorrectly initialized",
      failures,
    );
    const openedMenu = await evaluate(`(() => {
      const trigger = Array.from(document.querySelectorAll('button')).find((button) => (button.textContent || '').includes('Open main menu'));
      if (!trigger) return false;
      trigger.click();
      return true;
    })()`);
    assert(openedMenu, "mobile menu trigger is not operable", failures);
    await wait(200);
    const mobileMenu = await evaluate(`({
      dialog: Boolean(document.querySelector('[role="dialog"][aria-modal="true"]')),
      bodyLocked: document.body.style.overflow === 'hidden',
      activeText: document.activeElement?.textContent || '',
    })`);
    assert(
      mobileMenu.dialog,
      "mobile menu does not expose an accessible modal dialog",
      failures,
    );
    assert(mobileMenu.bodyLocked, "mobile menu does not lock background scrolling", failures);
    assert(
      Boolean(mobileMenu.activeText.trim()),
      "mobile menu does not move focus into the dialog",
      failures,
    );
    await pageHealth("mobile homepage");
    await screenshot("05-home-mobile-menu");

    await navigate("/books/no-claim-without-evidence/sample", {
      width: 390,
      height: 844,
      mobile: true,
    });
    await pageHealth("mobile reading sample");
    await screenshot("06-reading-sample-mobile");

    await navigate("/product-lab/");
    text = await visibleText();
    assert(
      text.includes("Review audited case studies instead"),
      "product lab lacks its resilient fallback path",
      failures,
    );
    await pageHealth("product lab");

    for (const problem of [...new Set(runtimeProblems)]) {
      failures.push(`browser runtime error: ${problem}`);
    }
  } finally {
    await browser.close();
    await staticExport.close();
  }

  const report = {
    generatedAt: new Date().toISOString(),
    failures,
    screenshots: fs.readdirSync(artifactsDir).filter((name) => name.endsWith(".png")),
  };
  fs.writeFileSync(
    path.join(artifactsDir, "report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );

  if (failures.length) {
    console.error(`Headless browser release verification failed:\n${failures.join("\n")}`);
    process.exit(1);
  }

  console.log(
    `Headless browser release verification passed: hydrated desktop and mobile pages, narrowed operational AI positioning, regional pricing, contact routing, book conversion, responsive overflow, accessibility basics, mobile navigation, product-lab fallback, and browser runtime health are intact. Screenshots: ${report.screenshots.length}.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exit(1);
});
