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
        const details = message.params.exceptionDetails || {};
        runtimeErrors.push(
          `${currentRoute}: ${details.exception?.description || details.text || "Uncaught browser exception"}`,
        );
      }
      if (message.method === "Log.entryAdded" && message.params.entry?.level === "error") {
        runtimeErrors.push(
          `${currentRoute}: ${message.params.entry.url || "browser"}: ${message.params.entry.text || "error"}`,
        );
      }
      if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
        const text = (message.params.args || [])
          .map((argument) => argument.value || argument.description || "")
          .join(" ");
        runtimeErrors.push(`${currentRoute}: ${text}`);
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

    async function navigate(
      route,
      { width = 1440, height = 1000, mobile = false, settleMs = 800 } = {},
    ) {
      currentRoute = route;
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
      await wait(settleMs);
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
    const initialTheme = await evaluate(`(() => ({
      dark: document.documentElement.classList.contains('dark'),
      buttonLabel: Array.from(document.querySelectorAll('button'))
        .find((button) => (button.getAttribute('aria-label') || '').startsWith('Current theme:'))
        ?.getAttribute('aria-label') || '',
    }))()`);
    assert(Boolean(initialTheme.buttonLabel), "theme toggle is missing after hydration", failures);
    const toggled = await evaluate(`(() => {
      const button = Array.from(document.querySelectorAll('button'))
        .find((item) => (item.getAttribute('aria-label') || '').startsWith('Current theme:'));
      if (!button) return false;
      button.click();
      return true;
    })()`);
    assert(toggled, "theme toggle is not operable", failures);
    await wait(300);
    const changedTheme = await evaluate(`({
      dark: document.documentElement.classList.contains('dark'),
      stored: localStorage.getItem('theme'),
    })`);
    assert(
      changedTheme.dark !== initialTheme.dark,
      "theme toggle does not change the rendered theme",
      failures,
    );
    assert(
      changedTheme.stored === "light" || changedTheme.stored === "dark",
      "theme choice is not stored",
      failures,
    );
    await screenshot("08-theme-selection");

    await navigate("/about");
    const persistedTheme = await evaluate(`({
      dark: document.documentElement.classList.contains('dark'),
      stored: localStorage.getItem('theme'),
    })`);
    assert(
      persistedTheme.stored === changedTheme.stored &&
        persistedTheme.dark === (changedTheme.stored === "dark"),
      "theme choice does not persist across routes",
      failures,
    );

    await navigate("/hire-me");
    const hiringCta = await evaluate(`(() => {
      const link = document.querySelector('a[data-cta-context="hiring"]');
      return { text: link?.textContent || '', href: link?.getAttribute('href') || '' };
    })()`);
    assert(
      hiringCta.text.includes("Start role conversation") &&
        hiringCta.href.includes("type=role"),
      "Experience global CTA is not hiring-specific",
      failures,
    );

    await navigate("/work-with-me");
    const servicesCta = await evaluate(`(() => {
      const link = document.querySelector('a[data-cta-context="services"]');
      return { text: link?.textContent || '', href: link?.getAttribute('href') || '' };
    })()`);
    assert(
      servicesCta.text.includes("Discuss a workflow") &&
        servicesCta.href.includes("type=project"),
      "Services global CTA is not commercial-workflow-specific",
      failures,
    );

    await navigate("/books/no-claim-without-evidence");
    const bookCta = await evaluate(`(() => {
      const link = document.querySelector('a[data-cta-context="book"]');
      return { text: link?.textContent || '', href: link?.href || '' };
    })()`);
    assert(
      bookCta.text.includes("Buy the book") &&
        bookCta.href.startsWith("https://checkout.dodopayments.com/"),
      "Book global CTA does not lead to secure checkout",
      failures,
    );

    await navigate("/contact?type=role&source=deep-browser");
    let contact = await evaluate(`(() => ({
      source: document.querySelector('input[name="source"]')?.value || '',
      mode: document.querySelector('input[name="mode"]')?.value || '',
      calLinks: Array.from(document.querySelectorAll('a[href^="https://cal.com/"]'))
        .map((link) => link.href),
    }))()`);
    assert(contact.source === "deep-browser:role", "role source attribution is incorrect", failures);
    assert(contact.mode === "role", "role mode attribution is incorrect", failures);
    assert(contact.calLinks.length === 2, "role mode does not expose both Cal.com durations", failures);
    for (const href of contact.calLinks) {
      const url = new URL(href);
      assert(
        url.searchParams.get("utm_source") === "pranaysuyash.com" &&
          url.searchParams.get("utm_medium") === "portfolio" &&
          url.searchParams.get("utm_campaign") === "role-conversation" &&
          (url.searchParams.get("utm_content") || "").startsWith("contact-role-"),
        `role Cal.com attribution is incomplete: ${href}`,
        failures,
      );
    }

    const selectedProject = await evaluate(`(() => {
      const button = Array.from(document.querySelectorAll('button'))
        .find((item) => (item.textContent || '').includes('Bounded commercial engagement'));
      if (!button) return false;
      button.click();
      return true;
    })()`);
    assert(selectedProject, "commercial Contact mode cannot be selected", failures);
    await wait(250);
    contact = await evaluate(`(() => ({
      source: document.querySelector('input[name="source"]')?.value || '',
      mode: document.querySelector('input[name="mode"]')?.value || '',
      calLinks: Array.from(document.querySelectorAll('a[href^="https://cal.com/"]'))
        .map((link) => link.href),
    }))()`);
    assert(
      contact.source === "deep-browser:project" && contact.mode === "project",
      "commercial Contact attribution is incorrect",
      failures,
    );
    for (const href of contact.calLinks) {
      const url = new URL(href);
      assert(
        url.searchParams.get("utm_campaign") === "commercial-engagement" &&
          (url.searchParams.get("utm_content") || "").startsWith("contact-project-"),
        `commercial Cal.com attribution is incomplete: ${href}`,
        failures,
      );
    }
    await screenshot("09-contact-attribution");

    await evaluate("localStorage.setItem('pricing-region', 'india')");
    await navigate("/books/no-claim-without-evidence");
    let priceState = await evaluate(`({
      text: document.body.innerText,
      india: Array.from(document.querySelectorAll('button'))
        .find((button) => (button.textContent || '').trim() === 'India')
        ?.getAttribute('aria-pressed'),
      stored: localStorage.getItem('pricing-region'),
    })`);
    assert(
      priceState.india === "true" &&
        priceState.stored === "india" &&
        priceState.text.includes("₹799") &&
        !priceState.text.includes("$14.99"),
      "book India pricing is not singular and persistent",
      failures,
    );
    const selectedGlobal = await evaluate(`(() => {
      const button = Array.from(document.querySelectorAll('button'))
        .find((item) => (item.textContent || '').trim() === 'Global');
      if (!button) return false;
      button.click();
      return true;
    })()`);
    assert(selectedGlobal, "book Global pricing cannot be selected", failures);
    await wait(250);
    priceState = await evaluate(`({
      text: document.body.innerText,
      stored: localStorage.getItem('pricing-region'),
    })`);
    assert(
      priceState.stored === "global" &&
        priceState.text.includes("$14.99") &&
        !priceState.text.includes("₹799"),
      "book Global pricing is not singular and persistent",
      failures,
    );
    await screenshot("10-book-global-price");

    await navigate("/work-with-me");
    const sharedPricing = await evaluate("document.body.innerText");
    assert(
      sharedPricing.includes("$2,500+") && !sharedPricing.includes("₹95,000+"),
      "book region choice does not persist into Services pricing",
      failures,
    );

    await navigate("/", { width: 390, height: 844, mobile: true });
    const opened = await evaluate(`(() => {
      const trigger = document.querySelector('button[aria-controls="mobile-menu"]');
      if (!trigger) return false;
      trigger.click();
      return true;
    })()`);
    assert(opened, "mobile dialog cannot be opened", failures);
    await wait(250);
    let mobileState = await evaluate(`({
      dialog: Boolean(document.querySelector('[role="dialog"][aria-modal="true"]')),
      bodyLocked: document.body.style.overflow === 'hidden',
      closeFocused: document.activeElement?.textContent?.includes('Close menu') || false,
    })`);
    assert(
      mobileState.dialog && mobileState.bodyLocked && mobileState.closeFocused,
      "mobile dialog does not open with focus and scroll containment",
      failures,
    );
    await browser.send(
      "Input.dispatchKeyEvent",
      { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 },
      sessionId,
    );
    await browser.send(
      "Input.dispatchKeyEvent",
      { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 },
      sessionId,
    );
    await wait(250);
    mobileState = await evaluate(`({
      dialog: Boolean(document.querySelector('[role="dialog"]')),
      bodyUnlocked: document.body.style.overflow !== 'hidden',
      triggerFocused: document.activeElement === document.querySelector('button[aria-controls="mobile-menu"]'),
      expanded: document.querySelector('button[aria-controls="mobile-menu"]')?.getAttribute('aria-expanded'),
    })`);
    assert(
      !mobileState.dialog &&
        mobileState.bodyUnlocked &&
        mobileState.triggerFocused &&
        mobileState.expanded === "false",
      "Escape does not close the mobile dialog and restore focus/scroll state",
      failures,
    );

    await navigate("/");
    const resourceLinks = await evaluate(`Array.from(
      document.querySelectorAll('a[href="/resume.json"], a[href="/llms.txt"], a[href="/build-info.json"]'),
    ).map((link) => link.getAttribute('href'))`);
    assert(resourceLinks.length === 3, "native machine-readable resource links are incomplete", failures);
    for (const resource of ["/resume.json", "/llms.txt", "/build-info.json"]) {
      const response = await fetch(`${staticExport.baseUrl}${resource}`);
      assert(response.ok, `${resource} is not directly retrievable`, failures);
    }

    for (const runtimeError of [...new Set(runtimeErrors)]) {
      failures.push(`deep browser runtime error: ${runtimeError}`);
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
      .filter((name) => /^(?:08|09|10)-.*\.png$/.test(name)),
  };
  fs.writeFileSync(
    path.join(artifactsDir, "deep-report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );

  if (report.failures.length) {
    console.error(`Deep browser release verification failed:\n${report.failures.join("\n")}`);
    process.exit(1);
  }

  console.log(
    `Deep browser release verification passed: theme persistence, route-aware CTAs, FormBold source/mode, Cal.com UTM attribution, shared one-region book/services pricing, mobile Escape/focus restoration, and native machine-resource delivery are intact. Screenshots: ${report.screenshots.length}.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exit(1);
});
