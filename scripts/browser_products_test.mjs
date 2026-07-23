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

    async function navigate(pathname = "/products", width = 1440, height = 1000, mobile = false) {
      await browser.send(
        "Emulation.setDeviceMetricsOverride",
        { width, height, deviceScaleFactor: 1, mobile },
        sessionId,
      );
      const loaded = browser.waitForEvent("Page.loadEventFired", sessionId);
      await browser.send(
        "Page.navigate",
        { url: `${staticExport.baseUrl}${pathname}` },
        sessionId,
      );
      await loaded;
      await wait(800);
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
    const desktop = await evaluate(`(() => {
      const signkit = document.querySelector('article#signkit');
      const book = document.querySelector('article#no-claim-without-evidence');
      const signkitCheckout = signkit?.querySelector('a[href="https://pranaysuyash.gumroad.com/l/signkit-v1"]');
      const bookCheckout = book?.querySelector('a[href^="https://checkout.dodopayments.com/buy/"]');
      const primaryProductsNav = document.querySelector('nav[aria-label="Primary navigation"] a[href="/products"]');
      const candidateSection = Array.from(document.querySelectorAll('section')).find((section) =>
        (section.textContent || '').includes('Smaller paid workflows')
      );
      return {
        h1: document.querySelector('h1')?.textContent || '',
        products: [signkit, book].filter(Boolean).length,
        signkitPrice: signkit?.textContent?.includes('$29') || false,
        signkitCheckout: Boolean(signkitCheckout),
        signkitTarget: signkitCheckout?.getAttribute('target') || '',
        bookCheckout: Boolean(bookCheckout),
        nav: Boolean(primaryProductsNav),
        navCurrent: primaryProductsNav?.getAttribute('aria-current') || '',
        fakeCandidateCheckout: Boolean(candidateSection?.querySelector('a[href*="checkout"], a[href*="gumroad"]')),
        candidateBoundary: candidateSection?.textContent?.includes('will not be listed for purchase until the actual package and delivery flow exist') || false,
        overflow: document.documentElement.scrollWidth - innerWidth,
      };
    })()`);

    assert(
      desktop.h1.includes("Buy a finished product") && desktop.products === 2,
      "products route does not expose exactly two current product cards",
      failures,
    );
    assert(desktop.signkitPrice, "SignKit card does not display the $29 price", failures);
    assert(
      desktop.signkitCheckout && desktop.signkitTarget === "_blank",
      "SignKit does not expose the direct external Gumroad checkout",
      failures,
    );
    assert(desktop.bookCheckout, "ebook card does not expose the Dodo checkout", failures);
    assert(
      desktop.nav && desktop.navCurrent === "page",
      "Products is missing or inactive in primary navigation",
      failures,
    );
    assert(
      !desktop.fakeCandidateCheckout && desktop.candidateBoundary,
      "future workflow candidates are purchasable or lack the non-sale boundary",
      failures,
    );
    assert(desktop.overflow <= 1, `desktop products route overflows by ${desktop.overflow}px`, failures);
    await screenshot("16-products-desktop");

    await navigate("/products", 390, 844, true);
    const mobile = await evaluate(`({
      products: [
        document.querySelector('article#signkit'),
        document.querySelector('article#no-claim-without-evidence')
      ].filter(Boolean).length,
      signkitCheckout: Boolean(document.querySelector('article#signkit a[href="https://pranaysuyash.gumroad.com/l/signkit-v1"]')),
      overflow: document.documentElement.scrollWidth - innerWidth,
    })`);
    assert(mobile.products === 2, "mobile products route loses a current product", failures);
    assert(mobile.signkitCheckout, "mobile products route loses the SignKit checkout", failures);
    assert(mobile.overflow <= 1, `mobile products route overflows by ${mobile.overflow}px`, failures);
    await screenshot("17-products-mobile");

    await navigate("/work/sig-ext-fastapi");
    await evaluate(`(() => {
      const ribbon = document.querySelector('[data-case-product-ribbon]');
      ribbon?.scrollIntoView({ block: 'center', behavior: 'instant' });
      return Boolean(ribbon);
    })()`);
    await wait(250);
    const signkitCase = await evaluate(`(() => {
      const ribbon = document.querySelector('[data-case-product-ribbon]');
      const checkout = ribbon?.querySelector('a[data-product-checkout="signkit"]');
      return {
        ribbon: Boolean(ribbon),
        productId: ribbon?.getAttribute('data-product-id') || '',
        price: ribbon?.textContent?.includes('$29 one time') || false,
        checkout: checkout?.getAttribute('href') || '',
        target: checkout?.getAttribute('target') || '',
        boundary: ribbon?.textContent?.includes('does not verify identity') || false,
        details: Boolean(ribbon?.querySelector('a[href="/products#signkit"]')),
        overflow: document.documentElement.scrollWidth - innerWidth,
      };
    })()`);
    assert(
      signkitCase.ribbon && signkitCase.productId === "signkit",
      "SignKit audited case does not expose its canonical product ribbon",
      failures,
    );
    assert(signkitCase.price, "SignKit case product ribbon loses the one-time price", failures);
    assert(
      signkitCase.checkout === "https://pranaysuyash.gumroad.com/l/signkit-v1" &&
        signkitCase.target === "_blank",
      "SignKit case product ribbon does not expose the direct external checkout",
      failures,
    );
    assert(
      signkitCase.boundary && signkitCase.details,
      "SignKit case product ribbon loses its claim boundary or product-details path",
      failures,
    );
    assert(
      signkitCase.overflow <= 1,
      `SignKit case product ribbon overflows by ${signkitCase.overflow}px`,
      failures,
    );
    await screenshot("18-signkit-product-ribbon");

    await navigate("/work/metaextract");
    const unrelatedCase = await evaluate(
      `Boolean(document.querySelector('[data-case-product-ribbon]'))`,
    );
    assert(!unrelatedCase, "product purchase ribbon leaks onto a non-product case", failures);

    for (const runtimeError of [...new Set(runtimeErrors)]) {
      if (/favicon\.ico/i.test(runtimeError)) continue;
      failures.push(`products browser runtime error: ${runtimeError}`);
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
      .filter((name) => /^(?:16|17|18)-.*\.png$/.test(name)),
  };
  fs.writeFileSync(
    path.join(artifactsDir, "products-report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );

  if (report.failures.length) {
    console.error(`Products browser verification failed:\n${report.failures.join("\n")}`);
    process.exit(1);
  }

  console.log(
    `Products browser verification passed: exactly two current products, direct SignKit and ebook checkout links, primary navigation, future-product boundaries, the SignKit case purchase ribbon, non-product isolation, and desktop/mobile containment are intact. Screenshots: ${report.screenshots.length}.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exit(1);
});
