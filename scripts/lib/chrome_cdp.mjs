import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function waitForProcessExit(processHandle, timeout = 1_500) {
  if (processHandle.exitCode !== null) return true;
  let timer;
  const exited = await Promise.race([
    new Promise((resolve) => {
      processHandle.once("exit", () => resolve(true));
    }),
    new Promise((resolve) => {
      timer = setTimeout(() => resolve(false), timeout);
    }),
  ]);
  if (timer) clearTimeout(timer);
  return exited;
}

async function removeDirectoryWithRetry(directory) {
  let lastError;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      fs.rmSync(directory, { recursive: true, force: true });
      return;
    } catch (error) {
      lastError = error;
      await wait(100 * (attempt + 1));
    }
  }
  throw lastError;
}

export function findChromeExecutable() {
  if (process.env.BROWSER_EXECUTABLE_PATH) return process.env.BROWSER_EXECUTABLE_PATH;

  const absoluteCandidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/microsoft-edge",
  ];
  for (const candidate of absoluteCandidates) {
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
      // Continue through the known executable names.
    }
  }

  throw new Error(
    "Headless browser verification requires Chrome, Chromium, or Edge. Set BROWSER_EXECUTABLE_PATH when it is installed in a non-standard location.",
  );
}

async function waitForDebugger(port, processHandle, startupOutput) {
  const endpoint = `http://127.0.0.1:${port}/json/version`;
  let lastError = "";

  for (let attempt = 0; attempt < 200; attempt += 1) {
    if (processHandle.exitCode !== null) break;
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      if (response.ok) {
        const version = await response.json();
        if (version.webSocketDebuggerUrl) return version.webSocketDebuggerUrl;
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await wait(100);
  }

  throw new Error(
    `Chrome did not expose ${endpoint}. ${lastError}\n${startupOutput()}`,
  );
}

export async function launchChromeCdp(executablePath = findChromeExecutable()) {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-browser-"));
  const port = 9222 + Math.floor(Math.random() * 500);
  const args = [
    "--headless",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-gpu",
    "--disable-software-rasterizer",
    "--disable-dev-shm-usage",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-extensions",
    "--disable-features=Translate,OptimizationHints,MediaRouter",
    "--disable-sync",
    "--metrics-recording-only",
    "--mute-audio",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-address=127.0.0.1",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    "data:,",
  ];

  const processHandle = spawn(executablePath, args, {
    stdio: ["ignore", "ignore", "pipe"],
    env: {
      ...process.env,
      DBUS_SESSION_BUS_ADDRESS: "disabled:",
    },
  });
  processHandle.stderr.setEncoding("utf8");
  let stderr = "";
  processHandle.stderr.on("data", (chunk) => {
    stderr += chunk;
  });

  let websocketUrl;
  try {
    websocketUrl = await waitForDebugger(port, processHandle, () => stderr);
  } catch (error) {
    processHandle.kill("SIGKILL");
    await waitForProcessExit(processHandle, 1_000);
    await removeDirectoryWithRetry(userDataDir);
    throw error;
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

  function rawSend(method, params = {}, sessionId) {
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

  async function send(method, params = {}, sessionId) {
    const result = await rawSend(method, params, sessionId);
    if (method === "Target.attachToTarget" && params.targetId) {
      await rawSend("Target.activateTarget", { targetId: params.targetId });
      if (result?.sessionId) {
        await rawSend("Page.bringToFront", {}, result.sessionId);
      }
    }
    return result;
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
      if (processHandle.exitCode === null) processHandle.kill("SIGTERM");
    }

    socket.close();
    let exited = await waitForProcessExit(processHandle, 1_500);
    if (!exited && processHandle.exitCode === null) {
      processHandle.kill("SIGTERM");
      exited = await waitForProcessExit(processHandle, 1_000);
    }
    if (!exited && processHandle.exitCode === null) {
      processHandle.kill("SIGKILL");
      await waitForProcessExit(processHandle, 1_000);
    }
    await removeDirectoryWithRetry(userDataDir);
  }

  return {
    executablePath,
    port,
    send,
    waitForEvent,
    eventListeners,
    close,
  };
}
