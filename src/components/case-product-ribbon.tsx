"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, ShoppingBag, ShieldCheck } from "lucide-react";
import { signKitProduct } from "@/lib/products";

const productByPath = {
  "/work/sig-ext-fastapi": signKitProduct,
} as const;

export function CaseProductRibbon() {
  const pathname = usePathname();
  const product = productByPath[pathname as keyof typeof productByPath];

  if (!product) return null;

  return (
    <section
      data-case-product-ribbon
      data-product-id={product.id}
      className="border-t bg-background py-10"
      aria-labelledby="case-product-title"
    >
      <div className="container mx-auto grid max-w-[1120px] gap-7 px-4 md:grid-cols-[1fr_auto] md:items-center md:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-3 text-primary">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">
              Available product · {product.price} one time
            </p>
          </div>
          <h2 id="case-product-title" className="mt-3 text-2xl font-bold tracking-tight">
            The audited case is also a product you can buy and use now.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            {product.delivery} {product.merchant}
          </p>
          <p className="mt-3 flex max-w-3xl items-start gap-2 text-xs leading-6 text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{product.claimBoundary}</span>
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <Link
            href={product.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-product-checkout={product.id}
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {product.checkoutLabel} <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/products#signkit"
            className="inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            Review product details
          </Link>
        </div>
      </div>
    </section>
  );
}
