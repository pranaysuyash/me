const productionEbookCheckoutUrl =
  "https://checkout.dodopayments.com/buy/pdt_0NjEOVHvnzb642S2qjsCg?quantity=1";

const ebookCheckoutUrl =
  process.env.NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL?.trim() ||
  productionEbookCheckoutUrl;

export const noClaimEbook = {
  title: "No Claim Without Evidence",
  subtitle: "How to Build AI Systems You Can Verify",
  indiaPrice: "₹799",
  globalPrice: "$14.99",
  format: "PDF + EPUB",
  cover: "/books/no-claim-without-evidence/cover.svg",
  checkoutImage: "/books/no-claim-without-evidence/checkout-image.jpg",
  path: "/books/no-claim-without-evidence",
  sampleUrl: "/books/no-claim-without-evidence/sample",
  sampleLabel: "Read a real excerpt",
  checkoutUrl: ebookCheckoutUrl,
  checkoutLabel: "Buy now",
  consultingUrl: "/contact?type=project&source=book",
  consultingLabel: "Ask about consulting",
  fulfillmentLabel: "Secure PDF + EPUB delivery",
  hasCheckout: true,
  description:
    "A practical field guide for building LLM workflows with evidence links, evals, review rules, action traces, and release gates.",
} as const;
