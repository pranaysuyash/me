export const noClaimEbook = {
  title: "No Claim Without Evidence",
  subtitle: "How to Build AI Systems You Can Verify",
  price: "$19 launch price",
  standardPrice: "$29 standard price after launch",
  format: "PDF + EPUB",
  cover: "/books/no-claim-without-evidence/cover.png",
  path: "/books/no-claim-without-evidence",
  checkoutUrl:
    process.env.NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL ||
    "mailto:pranay.suyash@gmail.com?subject=No%20Claim%20Without%20Evidence%20ebook",
  checkoutLabel: process.env.NEXT_PUBLIC_NO_CLAIM_EBOOK_CHECKOUT_URL
    ? "Buy with Dodo Payments"
    : "Join the launch list",
  description:
    "A practical field guide for building LLM workflows with evidence links, evals, review rules, action traces, and release gates.",
} as const;
