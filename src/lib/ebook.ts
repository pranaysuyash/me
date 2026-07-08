const ebookCheckoutUrl =
  process.env.NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL?.trim() ?? "";

export const noClaimEbook = {
  title: "No Claim Without Evidence",
  subtitle: "How to Build AI Systems You Can Verify",
  price: "$19 launch price",
  standardPrice: "$29 standard price after launch",
  format: "PDF + EPUB",
  cover: "/books/no-claim-without-evidence/cover.png",
  path: "/books/no-claim-without-evidence",
  checkoutUrl: ebookCheckoutUrl || "/contact?type=project&source=book",
  checkoutLabel: ebookCheckoutUrl
    ? "Buy with Dodo Payments"
    : "Send an enquiry",
  consultingUrl: "/contact?type=project&source=book",
  consultingLabel: "Ask about consulting",
  fulfillmentLabel: ebookCheckoutUrl
    ? "Dodo checkout and digital delivery"
    : "Enquiry form for access and consulting",
  hasCheckout: Boolean(ebookCheckoutUrl),
  description:
    "A practical field guide for building LLM workflows with evidence links, evals, review rules, action traces, and release gates.",
} as const;
