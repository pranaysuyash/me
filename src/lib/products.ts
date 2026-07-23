import { noClaimEbook } from "@/lib/ebook";

export type PortfolioProductKind = "Desktop software" | "Field guide";

export interface PortfolioProduct {
  id: string;
  title: string;
  kind: PortfolioProductKind;
  availability: "Available now";
  price: string;
  pricingNote: string;
  summary: string;
  audience: string;
  checkoutUrl: string;
  checkoutLabel: string;
  productUrl: string;
  productUrlLabel: string;
  evidenceUrl: string;
  delivery: string;
  merchant: string;
  support: string;
  claimBoundary: string;
  features: string[];
  platforms?: string[];
}

export const signKitProduct: PortfolioProduct = {
  id: "signkit",
  title: "SignKit",
  kind: "Desktop software",
  availability: "Available now",
  price: "$29",
  pricingNote: "One-time purchase · no subscription",
  summary:
    "Extract handwritten signature images, clean them, keep a reusable local library, and place them into PDFs without uploading sensitive files to a server.",
  audience:
    "Individuals and small teams that repeatedly handle signature images and PDF placement and want a local, understandable workflow.",
  checkoutUrl: "https://pranaysuyash.gumroad.com/l/signkit-v1",
  checkoutLabel: "Buy SignKit for $29",
  productUrl: "https://signkit.work",
  productUrlLabel: "Open SignKit product site",
  evidenceUrl: "/work/sig-ext-fastapi",
  delivery:
    "macOS, Windows, and Linux downloads are delivered through the buyer's Gumroad account after purchase.",
  merchant: "Gumroad handles payment, download access, and buyer delivery for SignKit.",
  support: "Purchase and product support: pranay.suyash@gmail.com.",
  claimBoundary:
    "SignKit handles signature-image extraction, cleanup, storage, and PDF placement. It does not verify identity, create a certified electronic signature, or provide legal assurance.",
  features: [
    "Offline desktop processing",
    "Signature extraction and cleanup",
    "Reusable local signature library",
    "PDF signature placement",
    "Future minor updates included",
  ],
  platforms: ["macOS", "Windows", "Linux"],
};

export const noClaimProduct: PortfolioProduct = {
  id: "no-claim-without-evidence",
  title: noClaimEbook.title,
  kind: "Field guide",
  availability: "Available now",
  price: `${noClaimEbook.indiaPrice} India · ${noClaimEbook.globalPrice} elsewhere`,
  pricingNote: "One-time purchase · PDF + EPUB",
  summary: noClaimEbook.description,
  audience:
    "Product, engineering, operations, and AI teams building extraction or LLM workflows that need evidence, evals, review gates, and explainable release decisions.",
  checkoutUrl: noClaimEbook.checkoutUrl,
  checkoutLabel: noClaimEbook.checkoutLabel,
  productUrl: noClaimEbook.path,
  productUrlLabel: "Review the book",
  evidenceUrl: noClaimEbook.sampleUrl,
  delivery: noClaimEbook.fulfillmentLabel,
  merchant: "Dodo Payments is Merchant of Record for the ebook purchase and delivery flow.",
  support: "Order and delivery support: pranay.suyash@gmail.com.",
  claimBoundary:
    "The book is a practical operating guide. It is not a certification, legal opinion, model guarantee, or substitute for evaluation on a buyer's own data and workflow.",
  features: [
    "PDF and EPUB formats",
    "Claim-evidence ledger",
    "Evaluation and release-gate patterns",
    "Extraction quality and review design",
    "Real excerpt available before purchase",
  ],
};

export const portfolioProducts: PortfolioProduct[] = [signKitProduct, noClaimProduct];

export const portfolioProductById = Object.fromEntries(
  portfolioProducts.map((product) => [product.id, product]),
) as Record<string, PortfolioProduct>;

export const productByProjectSlug: Record<string, PortfolioProduct | undefined> = {
  "sig-ext-fastapi": signKitProduct,
};
