import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Download,
  ExternalLink,
  Laptop,
  PackageCheck,
  ShieldCheck,
  Workflow,
  Wrench,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { portfolioProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products | SignKit, Field Guides, and Workflow Tools",
  description:
    "Buy finished products from Pranay Suyash, including SignKit desktop software and No Claim Without Evidence. Explore free workflow starters or scope a custom adaptation when a product does not fit.",
  alternates: { canonical: "https://pranaysuyash.com/products" },
  openGraph: {
    title: "Products | Pranay Suyash",
    description:
      "Finished software and field guides with direct pricing, delivery, support, and explicit claim boundaries.",
    url: "https://pranaysuyash.com/products",
    type: "website",
  },
};

const productIcons = {
  "Desktop software": Laptop,
  "Field guide": BookOpen,
} as const;

const productPrinciples = [
  {
    icon: PackageCheck,
    title: "Finished product",
    body: "A real price, checkout, delivery path, support contact, and current product boundary. No waitlist presented as a purchase.",
  },
  {
    icon: Workflow,
    title: "Free workflow proof",
    body: "Use the workflow chooser, direct starter files, and browser mechanisms before deciding whether a product or custom build is appropriate.",
  },
  {
    icon: Wrench,
    title: "Custom adaptation",
    body: "Use a bounded engagement when your inputs, integrations, policies, users, or acceptance evidence do not fit the finished product.",
  },
] as const;

function external(href: string) {
  return href.startsWith("http");
}

export default function ProductsPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Products by Pranay Suyash",
    itemListElement: portfolioProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: external(product.productUrl)
        ? product.productUrl
        : `https://pranaysuyash.com${product.productUrl}`,
      name: product.title,
    })),
  };

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="relative overflow-hidden border-b bg-[#071013] text-white">
        <div className="ledger-grid absolute inset-0 opacity-40" aria-hidden />
        <div className="container relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100/70">
              Products
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl md:text-6xl">
              Buy a finished product. Use the workflow proof free. Commission only what needs adapting.
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-white/70">
              The catalogue separates products from case studies and consulting. Every item for sale has a real price, checkout, delivery path, support boundary, and explicit non-claims.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-md px-7">
                <a
                  href="https://pranaysuyash.gumroad.com/l/signkit-v1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy SignKit for $29 <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-md border-white/30 bg-white/5 px-7 text-white hover:bg-white/10"
              >
                <Link href="/workflows">Explore free workflows</Link>
              </Button>
            </div>
          </div>

          <aside className="border-y border-white/14 py-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-teal-200" aria-hidden="true" />
              <div>
                <p className="font-semibold">Current catalogue boundary</p>
                <p className="mt-3 text-sm leading-7 text-white/58">
                  SignKit and the ebook are the only products currently listed for purchase. Workflow ideas remain free proof or clearly labelled future product directions until their deliverables exist.
                </p>
              </div>
            </div>
            <div className="mt-6 border-t border-white/12 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-100/65">
                Merchant boundary
              </p>
              <p className="mt-3 text-sm leading-7 text-white/68">
                Gumroad fulfils SignKit. Dodo Payments is Merchant of Record for the ebook. Custom work is a separate engagement.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Available now
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                Two products with direct purchase and delivery.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground lg:justify-self-end">
              Product pages explain the operating boundary before checkout. Audited cases remain available when you want to inspect the product judgment and implementation evidence behind the offer.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {portfolioProducts.map((product) => {
              const Icon = productIcons[product.kind];
              return (
                <article
                  key={product.id}
                  id={product.id}
                  className="flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm"
                >
                  <div className="border-b bg-muted/25 p-6 md:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                          {product.kind}
                        </p>
                      </div>
                      <span className="rounded-full border border-primary/30 bg-primary/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                        {product.availability}
                      </span>
                    </div>
                    <h2 className="mt-5 text-3xl font-bold tracking-tight">{product.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{product.summary}</p>
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <div className="grid gap-5 border-b pb-6 sm:grid-cols-[0.75fr_1.25fr]">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Price
                        </p>
                        <p className="mt-2 text-2xl font-bold tracking-tight">{product.price}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {product.pricingNote}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Best for
                        </p>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{product.audience}</p>
                      </div>
                    </div>

                    <ul className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {product.platforms && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {product.platforms.map((platform) => (
                          <span key={platform} className="rounded-full border px-3 py-1.5 text-xs text-muted-foreground">
                            {platform}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 space-y-3 border-y py-5 text-xs leading-6 text-muted-foreground">
                      <p>
                        <span className="font-semibold text-foreground">Delivery.</span> {product.delivery}
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">Merchant.</span> {product.merchant}
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">Boundary.</span> {product.claimBoundary}
                      </p>
                    </div>

                    <div className="mt-auto pt-6">
                      <Button asChild className="w-full rounded-md sm:w-auto">
                        <a href={product.checkoutUrl} target="_blank" rel="noopener noreferrer">
                          {product.checkoutLabel} <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                        <Link
                          href={product.productUrl}
                          target={external(product.productUrl) ? "_blank" : undefined}
                          rel={external(product.productUrl) ? "noopener noreferrer" : undefined}
                          className="font-semibold text-primary hover:underline"
                        >
                          {product.productUrlLabel}
                        </Link>
                        <Link href={product.evidenceUrl} className="font-semibold text-primary hover:underline">
                          Review evidence
                        </Link>
                      </div>
                      <p className="mt-4 text-xs leading-6 text-muted-foreground">{product.support}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Product ladder
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Not every useful workflow should become a custom project.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              The site now exposes three distinct commitment levels. The buyer can inspect the workflow first, purchase a finished product when one fits, or bring the workflow for adaptation when the operating context is genuinely specific.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border bg-border lg:grid-cols-3">
            {productPrinciples.map((principle) => (
              <article key={principle.title} className="bg-background p-7">
                <principle.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold">{principle.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid max-w-[1280px] gap-10 px-4 md:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Smaller paid workflows
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Future products need a real operational object, not a prettier starter document.
            </h2>
          </div>
          <div className="divide-y border-y">
            <div className="py-6">
              <h3 className="font-semibold">Document Extraction Review Kit</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                The first candidate: schemas, synthetic fixtures, evidence links, exception taxonomy, benchmark scripts, review states, and acceptance gates. It will not be listed for purchase until the actual package and delivery flow exist.
              </p>
            </div>
            <div className="py-6">
              <h3 className="font-semibold">Local File Evidence Inspector</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                A candidate batch utility for local file intake, deterministic metadata and evidence inspection, unsupported-file reporting, and CSV or JSON export.
              </p>
            </div>
            <div className="py-6">
              <h3 className="font-semibold">No fake catalogue volume</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Current workflow starters remain free and ungated. A future paid workflow must add executable processing, batch capability, export, validation, maintained assets, or a supported product surface.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-[#0d1718] py-14 text-white">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center md:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-teal-100/70">
              <Download className="h-5 w-5" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                Product does not fit?
              </p>
            </div>
            <h2 className="mt-4 max-w-4xl text-2xl font-bold tracking-tight md:text-3xl">
              Bring the actual files, handoffs, failures, and required outcome. The adaptation can stay bounded.
            </h2>
          </div>
          <Button asChild variant="outline" className="border-white/25 bg-white/[0.04] text-white hover:bg-white/[0.09]">
            <Link href="/contact?type=project&source=products-bottom">
              Discuss an adaptation <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
