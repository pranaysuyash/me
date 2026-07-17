import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const contentTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".epub": "application/epub+zip",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

export function resolveStaticExportPath(outDir, requestUrl, host = "127.0.0.1") {
  const url = new URL(requestUrl, `http://${host}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";

  const relative = pathname.replace(/^\/+/, "");
  if (!relative || relative.split("/").includes("..")) return null;

  const candidates = path.extname(relative)
    ? [relative]
    : [relative, `${relative}.html`, path.join(relative, "index.html")];
  const root = path.resolve(outDir);

  for (const candidate of candidates) {
    const fullPath = path.resolve(root, candidate);
    if (fullPath !== root && !fullPath.startsWith(`${root}${path.sep}`)) continue;
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) return fullPath;
  }

  return null;
}

function sendCloudflareTrace(request, response) {
  const country = String(process.env.LOCAL_TRACE_COUNTRY || "US")
    .trim()
    .toUpperCase();
  const body = `fl=local\nh=127.0.0.1\nip=127.0.0.1\nts=${Date.now()}\nvisit_scheme=http\nuag=portfolio-release-test\ncolo=LOCAL\nsliver=none\nhttp=http/1.1\nloc=${country}\ntls=off\nsni=off\nwarp=off\ngateway=off\nrbi=off\nkex=none\n`;
  response.writeHead(200, {
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(request.method === "HEAD" ? undefined : body);
}

export async function createStaticExportServer({
  outDir = path.join(process.cwd(), "out"),
  host = "127.0.0.1",
  port = 0,
} = {}) {
  if (!fs.existsSync(outDir)) {
    throw new Error("Static export server requires an existing out/ directory. Run npm run site:verify first.");
  }

  const server = http.createServer((request, response) => {
    const requestUrl = request.url || "/";
    const url = new URL(requestUrl, `http://${host}`);
    if (url.pathname === "/cdn-cgi/trace") {
      sendCloudflareTrace(request, response);
      return;
    }

    const fullPath = resolveStaticExportPath(outDir, requestUrl, host);
    if (!fullPath) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "content-type": contentTypes[path.extname(fullPath).toLowerCase()] || "application/octet-stream",
      "cache-control": "no-store",
    });
    if (request.method === "HEAD") {
      response.end();
      return;
    }
    fs.createReadStream(fullPath).pipe(response);
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, resolve);
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Could not resolve static-export server address.");
  }

  return {
    server,
    baseUrl: `http://${host}:${address.port}`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}
