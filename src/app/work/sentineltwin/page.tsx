import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { auditedProjectBySlug } from "@/lib/portfolio";

const project = auditedProjectBySlug.sentineltwin;

export const metadata: Metadata = {
  title: "SentinelTwin | Spatial Intelligence and Security Simulation | Pranay Suyash",
  description: project.summary,
  alternates: { canonical: "https://pranaysuyash.com/work/sentineltwin" },
  openGraph: {
    title: "SentinelTwin | Pranay Suyash",
    description: project.summary,
    url: "https://pranaysuyash.com/work/sentineltwin",
    type: "article",
    images: project.screenshots[0]
      ? [{ url: project.screenshots[0], alt: "SentinelTwin product interface" }]
      : undefined,
  },
};

export default function SentinelTwinPage() {
  return (
    <PageLayout>
      <article>
        <header className="border-b bg-[#0d1718] text-white">
          <div className="container mx-auto max-w-[1120px] px-4 py-16 md:px-6 md:py-24 lg:px-8">
            <Link href="/work" className="inline-flex items-center text-sm text-white/58 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to selected work
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-100/70">{project.category}</span>
              <span className="rounded-full border border-white/16 px-3 py-1 text-xs text-white/65">{project.maturity}</span>
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-5xl md:text-6xl">{project.title}</h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-white/70">{project.summary}</p>

            <div className="mt-9 grid grid-cols-1 border-y border-white/14 sm:grid-cols-3">
              <div className="py-5 sm:pr-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">Primary user</p>
                <p className="mt-2 text-sm leading-6 text-white/82">{project.primaryUser}</p>
              </div>
              <div className="border-t py-5 sm:border-l sm:border-t-0 sm:px-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">My role</p>
                <p className="mt-2 text-sm leading-6 text-white/82">{project.role}</p>
              </div>
              <div className="border-t py-5 sm:border-l sm:border-t-0 sm:pl-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">Current outcome</p>
                <p className="mt-2 text-sm leading-6 text-white/82">{project.outcome}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <Button key={link.href} asChild variant="outline" className="border-white/25 bg-white/[0.04] text-white hover:bg-white/[0.09]">
                  <Link href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label} <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </header>

        {project.screenshots[0] && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto max-w-[1120px] px-4 md:px-6 lg:px-8">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Current product surface</p>
              <figure>
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl border bg-muted/30">
                  <Image
                    src={project.screenshots[0]}
                    alt="SentinelTwin map and spatial-security interface"
                    fill
                    unoptimized
                    priority
                    sizes="(min-width: 1120px) 1120px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">
                  Working studio surface from the active platform build. The screenshot is interface evidence, not a claim that every roadmap capability is complete.
                </figcaption>
              </figure>
            </div>
          </section>
        )}

        <section className="border-y bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto grid max-w-[1120px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">What exists now</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">Active platform boundary</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Current implementation is separated from planned calibration, live-evidence alignment, and broader enterprise governance work.
              </p>
            </div>
            <div className="divide-y border-y">
              {project.whatExists.map((item) => (
                <p key={item} className="py-5 text-sm leading-7 text-muted-foreground">{item}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-[1120px] px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Key product decisions</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Deterministic claims before AI explanation.</h2>
            </div>
            <div className="mt-10 space-y-6">
              {project.decisions.map((item, index) => (
                <article key={item.decision} className="grid gap-6 border-y py-7 md:grid-cols-[64px_1fr_1fr]">
                  <span className="font-mono text-xs text-primary">0{index + 1}</span>
                  <div>
                    <h3 className="font-semibold">{item.decision}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.reason}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Trade-off</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.tradeoff}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y bg-muted/30 py-16">
          <div className="container mx-auto grid max-w-[1120px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Constraints</h2>
              <ul className="mt-5 space-y-3">
                {project.constraints.map((constraint) => (
                  <li key={constraint} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {constraint}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Technologies used</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {project.technologies.map((technology) => (
                  <span key={technology} className="rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground">{technology}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto flex max-w-[1120px] flex-col gap-5 px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
            <Link href="/work" className="text-sm text-muted-foreground hover:text-primary">← Back to selected work</Link>
            <Button asChild>
              <Link href="/contact?type=project&source=sentineltwin">
                Discuss a spatial system <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
