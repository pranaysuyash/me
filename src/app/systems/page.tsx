import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Interactive Product Systems Lab",
  description:
    "Inspect product behavior across SentinelTwin, SignKit, MetaExtract, and EchoPanel through spatial, evidence-led interactive scenes.",
  alternates: {
    canonical: "https://pranaysuyash.com/systems",
  },
  openGraph: {
    title: "Interactive Product Systems Lab | Pranay Suyash",
    description:
      "Four product systems shown through the workflows, states, and decisions that make them useful.",
    url: "https://pranaysuyash.com/systems",
    type: "website",
  },
};

const systems = [
  {
    title: "SentinelTwin",
    description: "Coverage, blind zones, incident paths, and counterfactual camera placement.",
    href: "/work/sentineltwin",
  },
  {
    title: "SignKit",
    description: "Source document, cleaned signature layer, and signed-PDF delivery path.",
    href: "/work/sig-ext-fastapi",
  },
  {
    title: "MetaExtract",
    description: "Variable documents, evidence-linked fields, normalization, and review gates.",
    href: "/work/metaextract",
  },
  {
    title: "EchoPanel",
    description: "Local capture, transcript navigation, and retrieval of the exact moment.",
    href: "/work/echopanel",
  },
] as const;

export default function SystemsPage() {
  return (
    <PageLayout>
      <section className="border-b bg-[#071013] text-white">
        <div className="container mx-auto max-w-[1440px] px-4 pb-10 pt-14 md:px-6 md:pb-14 md:pt-20 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100/70">
                Interactive product systems lab
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
                Inspect the product behavior, not just the technology stack.
              </h1>
            </div>
            <div className="max-w-3xl lg:justify-self-end">
              <p className="text-base leading-8 text-white/68 md:text-lg">
                Each scene isolates one important product loop. Switch systems, change the
                operating view, drag the spatial surface, and then open the corresponding
                case study for architecture, constraints, and evidence.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-md">
                  <Link href="/contact?type=project&source=systems-lab">
                    Discuss a system <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-md border-white/25 bg-white/[0.04] text-white hover:bg-white/[0.09]"
                >
                  <Link href="/work">Browse all work</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#071013] pb-8 md:pb-12">
        <div className="container mx-auto max-w-[1440px] px-0 sm:px-4 md:px-6 lg:px-8">
          <div className="overflow-hidden border-y border-white/10 bg-[#071013] sm:rounded-2xl sm:border">
            <iframe
              src="/product-lab/index.html"
              title="Interactive product systems lab for SentinelTwin, SignKit, MetaExtract, and EchoPanel"
              className="h-[620px] w-full border-0 bg-[#071013] md:h-[720px] xl:h-[780px]"
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
            />
          </div>
          <p className="mt-4 px-4 text-xs leading-6 text-white/42 sm:px-0">
            The interface controls and proof text are normal HTML. Three.js is used only
            where spatial inspection, state transitions, or product behavior gain from it.
            Every system remains available through its standard case-study route.
          </p>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-14 md:py-20">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Standard case studies
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              The interactive layer is an entry point, not the source of truth.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Each product still has a readable, linkable surface containing the problem,
              architecture, trade-offs, screenshots, and current product state.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {systems.map((system) => (
              <Link
                key={system.title}
                href={system.href}
                className="group rounded-xl border bg-card p-6 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
                      {system.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {system.description}
                    </p>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
