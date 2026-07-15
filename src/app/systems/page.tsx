import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Info } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { auditedProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Interactive Systems Lab | Pranay Suyash",
  description:
    "Illustrative spatial scenes that explain product loops across SentinelTwin, SignKit, MetaExtract, and EchoPanel, linked to audited case studies.",
  alternates: { canonical: "https://pranaysuyash.com/systems" },
  openGraph: {
    title: "Interactive Systems Lab | Pranay Suyash",
    description:
      "Four simplified product loops shown through spatial scenes, with audited case studies as the source of truth.",
    url: "https://pranaysuyash.com/systems",
    type: "website",
  },
};

export default function SystemsPage() {
  return (
    <PageLayout>
      <section className="border-b bg-[#071013] text-white">
        <div className="container mx-auto max-w-[1440px] px-4 pb-10 pt-14 md:px-6 md:pb-14 md:pt-20 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100/70">Interactive systems lab</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.04em] sm:text-5xl md:text-6xl">
                Inspect simplified product loops, then verify the real case study.
              </h1>
            </div>
            <div className="max-w-3xl lg:justify-self-end">
              <p className="text-base leading-8 text-white/68 md:text-lg">
                These scenes are explanatory models, not substitutes for the actual applications.
                Switch systems and operating views, then open the corresponding audited case study for
                current maturity, ownership, constraints, and product decisions.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-md">
                  <Link href="/contact?type=project&source=systems-lab">Discuss a related system <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" className="rounded-md border-white/25 bg-white/[0.04] text-white hover:bg-white/[0.09]">
                  <Link href="/work">Browse audited work</Link>
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
              src="/product-lab/"
              title="Illustrative product systems lab for SentinelTwin, SignKit, MetaExtract, and EchoPanel"
              className="h-[620px] w-full border-0 bg-[#071013] md:h-[720px] xl:h-[780px]"
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
            />
          </div>
          <div className="mt-4 flex items-start gap-3 px-4 text-xs leading-6 text-white/45 sm:px-0">
            <Info className="mt-1 h-4 w-4 shrink-0" />
            <p>
              The HTML controls are functional and the Three.js scenes are interactive, but the geometry is illustrative.
              Product maturity and shipped capabilities are defined only on the linked case-study pages.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-14 md:py-20">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Audited case studies</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              The interactive layer is an entry point. The case study is the source of truth.
            </h2>
          </div>

          <div className="divide-y border-y">
            {auditedProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group grid gap-4 py-7 md:grid-cols-[180px_1fr_auto] md:items-center"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{project.maturity}</span>
                <div>
                  <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">{project.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{project.summary}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
