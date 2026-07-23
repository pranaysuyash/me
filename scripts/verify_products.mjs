#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    failures.push(`missing product source: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(fullPath, "utf8");
}

function requireTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (!source.includes(token)) {
      failures.push(`${relativePath} missing product invariant: ${token}`);
    }
  }
  return source;
}

function forbidTokens(relativePath, tokens) {
  const source = read(relativePath);
  for (const token of tokens) {
    if (source.includes(token)) {
      failures.push(`${relativePath} contains forbidden product pattern: ${token}`);
    }
  }
  return source;
}

const catalogue = requireTokens("src/lib/products.ts", [
  'id: "signkit"',
  'title: "SignKit"',
  'price: "$29"',
  'pricingNote: "One-time purchase · no subscription"',
  'checkoutUrl: "https://pranaysuyash.gumroad.com/l/signkit-v1"',
  'productUrl: "https://signkit.work"',
  'merchant: "Gumroad handles payment, download access, and buyer delivery for SignKit."',
  "It does not verify identity, create a certified electronic signature, or provide legal assurance.",
  'id: "no-claim-without-evidence"',
  "noClaimEbook.indiaPrice",
  "noClaimEbook.globalPrice",
  "Dodo Payments is Merchant of Record",
  '"sig-ext-fastapi": signKitProduct',
]);

if ((catalogue.match(/\n  availability: "Available now",/g) || []).length !== 2) {
  failures.push("the public product catalogue must expose exactly two currently purchasable product records");
}
forbidTokens("src/lib/products.ts", [
  "Coming soon",
  "Waitlist",
  "certified e-signature",
  "identity verification included",
]);

requireTokens("src/app/products/page.tsx", [
  "Buy a finished product. Use the workflow proof free. Commission only what needs adapting.",
  "Buy SignKit for $29",
  "Two products with direct purchase and delivery.",
  "Gumroad fulfils SignKit. Dodo Payments is Merchant of Record for the ebook.",
  "Document Extraction Review Kit",
  "Local File Evidence Inspector",
  "It will not be listed for purchase until the actual package and delivery flow exist.",
  "No fake catalogue volume",
  "portfolioProducts.map",
  'href="/workflows"',
  "products-bottom",
]);

requireTokens("src/components/case-product-ribbon.tsx", [
  '"/work/sig-ext-fastapi": signKitProduct',
  "data-case-product-ribbon",
  "data-product-id={product.id}",
  "Available product · {product.price} one time",
  "The audited case is also a product you can buy and use now.",
  "data-product-checkout={product.id}",
  'href="/products#signkit"',
]);
requireTokens("src/components/layout/page-layout.tsx", [
  'import { CaseProductRibbon } from "@/components/case-product-ribbon"',
  "<CaseProductRibbon />",
  "<CaseMechanismRibbon />",
]);

requireTokens("src/components/layout/navbar.tsx", [
  '{ name: "Products", href: "/products" }',
  'pathname.startsWith("/products")',
  'label: "Buy SignKit"',
  "signKitProduct.checkoutUrl",
]);
forbidTokens("src/components/layout/navbar.tsx", ['{ name: "Book", href:']);

requireTokens("src/components/layout/footer.tsx", [
  '{ name: "Products", href: "/products" }',
  "Gumroad fulfils SignKit.",
  "Dodo is Merchant of Record for ebooks.",
]);

requireTokens("src/app/sitemap.ts", ['url: `${baseUrl}/products`']);
requireTokens("public/llms.txt", [
  "- Products: https://pranaysuyash.com/products",
  "- SignKit: US$29 one-time desktop software purchase through Gumroad.",
  "- Checkout: https://pranaysuyash.gumroad.com/l/signkit-v1",
  "A product is listed for purchase only when price, checkout, delivery, merchant, support, and claim boundaries exist.",
]);

requireTokens("docs/research/PORTFOLIO_PRODUCTS_AND_PAID_WORKFLOWS_2026-07-23.md", [
  "Create a first-class **Products** surface.",
  "SignKit should be listed directly for sale",
  "Document Extraction Review Kit",
  "Local File Evidence Inspector",
  "## Anything else?",
]);

if (failures.length) {
  console.error(`Product catalogue validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  "Product catalogue validation passed: SignKit and the ebook have canonical prices, checkout and merchant boundaries; Products is discoverable; the SignKit case exposes the same canonical checkout; free workflows remain distinct; and unfinished workflow products are not represented as purchasable.",
);
