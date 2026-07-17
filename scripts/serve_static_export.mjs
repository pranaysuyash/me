#!/usr/bin/env node

import { createStaticExportServer } from "./lib/static_export_server.mjs";

const port = Number(process.env.PORT || 4173);
const staticExport = await createStaticExportServer({ port });

console.log(`Serving the verified static export at ${staticExport.baseUrl}`);

async function shutdown() {
  await staticExport.close();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
