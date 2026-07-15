const ebookCheckoutUrl =
  process.env.NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL?.trim() ?? "";

export const noClaimEbook = {
  title: "No Claim Without Evidence",
  subtitle: "How to Build AI Systems You Can Verify",
  indiaPrice: "₹799",
  globalPrice: "$14.99",
  priceSummary: "₹799 in India · $14.99 elsewhere",
  pricingNote: "Regional pricing",
  format: "PDF + EPUB",
  cover: "/books/no-claim-without-evidence/cover.png",
  checkoutImage: "/books/no-claim-without-evidence/checkout-image.jpg",
  path: "/books/no-claim-without-evidence",
  sampleUrl: "/books/no-claim-without-evidence/sample",
  sampleLabel: "Read sample chapter",
  checkoutUrl: ebookCheckoutUrl,
  checkoutLabel: "Buy now",
  consultingUrl: "/contact?type=project&source=book",
  consultingLabel: "Ask about consulting",
  fulfillmentLabel: ebookCheckoutUrl
    ? "Secure checkout and PDF + EPUB delivery"
    : "Checkout opens soon",
  hasCheckout: Boolean(ebookCheckoutUrl),
  description:
    "A practical field guide for building LLM workflows with evidence links, evals, review rules, action traces, and release gates.",
} as const;
