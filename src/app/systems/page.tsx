import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Info } from "lucide-react";
import { CapabilityLab } from "@/components/capability-lab/capability-lab";
import { PageLayout } from "@/components/layout/page-layout";
import { SectionIndex } from "@/components/section-index";
import { Button } from "@/components/ui/button";
import { auditedProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Working Systems Lab | Pranay Suyash",
  description:
    "Operate small browser-contained mechanisms for evidence extraction, local image cleanup, visual inspection, and spatial reasoning, then inspect the audited product systems behind them.",
  alternates: { canonical: "https://pranaysuyash.com/systems" },
  openGraph: {
    title: "Working Systems Lab | Pranay Suyash",
    description:
      "Four real browser-executed mechanisms, one illustrative spatial explainer, and audited product cases with explicit claim boundaries.",
    url: "https://pranaysuyash.com/systems",
    type: "website",
  },
};

const systemsSections = [
  {
    label: "Working mechanisms",
    href: "#working-mechanisms" as const,
    description: "Extraction, image processing, visual inspection, and spatial reasoning",
  },
  {
    label: "Spatial explainer",
    href: "#spatial-explainer" as const,
    description: "Illustrative Three.js product loops",
  },
  {
    label: "Audited cases",
    href: "#audited-cases" as const,
    description: "Maturity, decisions, constraints, and implementation evidence",
  },
] as const;

export default function SystemsPage() {
  return (
    <PageLayout>
      <section className="border-b bg-[#071013] text-white">
        <div className="container mx-auto max-w-[1440px] px-4 pb-12 pt-14 md:px-6 md:pb-16 md:pt-20 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100/70">
                Working systems lab
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.04em] sm:text-5xl md:text-6xl">
                Operate a small mechanism, then inspect the larger system behind it.
              </h1>
            </div>
            <div className="max-w-3xl lg:justify-self-end">
              <p className="text-base leading-8 text-white/68 md:text-lg">
                The first layer below executes real, bounded work in your browser: deterministic extraction,
                local Canvas processing, pixel inspection, and geometric visibility. The second layer remains
                an illustrative spatial model. Neither replaces the audited product case.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-md">
                  <Link href="/contact?type=project&source=systems-lab">
                    Discuss a related system <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-md border-white/25 bg-white/[0.04] text-white hover:bg-white/[0.09]"
                >
                  <Link href="/work">Browse audited work</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionIndex items={systemsSections} label="Systems lab sections" />

      <section id="working-mechanisms" className="scroll-mt-24 py-14 md:py-20">
        <div className="container mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mb-8 grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Working mechanisms
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                Small enough to inspect. Real enough to operate.
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground lg:justify-self-end md:text-base md:leading-8">
              Synthetic inputs keep the surface safe and repeatable. Where a local file can be selected, it is
              decoded and processed by browser APIs in the current tab. Each mechanism exposes its boundary so
              a useful interaction is not mistaken for the full product.
            </p>
          </div>
          <CapabilityLab />
        </div>
      </section>

      <section id="spatial-explainer" className="scroll-mt-24 bg-[#071013] pb-10 pt-14 text-white md:pb-14 md:pt-20">
        <div className="container mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mb-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/70">
                Illustrative spatial explainer
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                Inspect simplified product loops, then verify the real case study.
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-white/62 lg:justify-self-end md:text-base md:leading-8">
              Switch systems and operating views inside the Three.js layer. Its controls are functional and its
              geometry is illustrative; current maturity and shipped capability remain defined by the case pages.
            </p>
          </div>

          <div className="overflow-hidden border-y border-white/10 bg-[#071013] sm:rounded-2xl sm:border">
            <iframe
              src="/product-lab/"
              title="Illustrative product systems lab for SentinelTwin, SignKit, MetaExtract, and EchoPanel"
              className="h-[620px] w-full border-0 bg-[#071013] md:h-[720px] xl:h-[780px]"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
            />
          </div>
          <div className="mt-4 flex items-start gap-3 text-xs leading-6 text-white/45">
            <Info className="mt-1 h-4 w-4 shrink-0" />
            <p>
              The HTML controls are functional and the Three.js scenes are interactive, but the geometry is
              illustrative. Product maturity and shipped capabilities are defined only on the linked case-study pages.
            </p>
          </div>
        </div>
      </section>

      <section id="audited-cases" className="scroll-mt-24 border-y bg-muted/30 py-14 md:py-20">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Audited case studies
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              The mechanism opens the conversation. The case study remains the source of truth.
            </h2>
          </div>

          <div className="divide-y border-y">
            {auditedProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group grid gap-4 py-7 md:grid-cols-[180px_1fr_auto] md:items-center"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {project.maturity}
                </span>
                <div>
                  <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {project.summary}
                  </p>
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
