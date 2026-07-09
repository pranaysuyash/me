const ebookCheckoutUrl =
  process.env.NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL?.trim() ?? "";

export const noClaimEbook = {
  title: "No Claim Without Evidence",
  subtitle: "How to Build AI Systems You Can Verify",
  price: "$19 launch price",
  standardPrice: "$29 standard price after launch",
  format: "PDF + EPUB",
  cover: "/books/no-claim-without-evidence/cover.png",
  checkoutImage: "/books/no-claim-without-evidence/checkout-image.jpg",
  path: "/books/no-claim-without-evidence",
  sampleUrl: "/books/no-claim-without-evidence/sample",
  sampleLabel: "Read sample chapter",
  checkoutUrl: ebookCheckoutUrl || "/contact?type=project&source=book",
  checkoutLabel: ebookCheckoutUrl
    ? "Buy with Dodo Payments"
    : "Request book access",
  consultingUrl: "/contact?type=project&source=book",
  consultingLabel: "Ask about consulting",
  fulfillmentLabel: ebookCheckoutUrl
    ? "Dodo checkout and digital delivery"
    : "Access request form for now",
  hasCheckout: Boolean(ebookCheckoutUrl),
  description:
    "A practical field guide for building LLM workflows with evidence links, evals, review rules, action traces, and release gates.",
} as const;
