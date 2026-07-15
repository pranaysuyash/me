import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { medpiperCaseStudy } from "@/lib/career";

export const metadata: Metadata = {
  title: "MedPiper Insurance Workflow Transformation | Pranay Suyash",
  description:
    "A sanitized professional case study covering workflow redesign, product ownership, regulated-context delivery, and a turnaround reduction from roughly four weeks to roughly ten days.",
  alternates: {
    canonical: "https://pranaysuyash.com/work/medpiper-workflow",
  },
  openGraph: {
    title: "MedPiper Insurance Workflow Transformation | Pranay Suyash",
    description:
      "Sanitized evidence of product leadership across workflow redesign, automation, ownership, and regulated healthcare operations.",
    url: "https://pranaysuyash.com/work/medpiper-workflow",
    type: "article",
  },
};

export default function MedPiperWorkflowPage() {
  return (
    <PageLayout>
      <article>
        <header className="border-b bg-[#0d1718] text-white">
          <div className="container mx-auto max-w-[1120px] px-4 py-16 md:px-6 md:py-24 lg:px-8">
            <Link
              href="/work"
              className="inline-flex items-center text-sm text-white/58 transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to selected work
            </Link>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/70">
              {medpiperCaseStudy.eyebrow}
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-bold tracking-[-0.04em] sm:text-5xl md:text-6xl">
              {medpiperCaseStudy.title}
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-white/70">
              {medpiperCaseStudy.context}
            </p>
            <div className="mt-9 grid grid-cols-1 border-y border-white/14 sm:grid-cols-3">
              <div className="py-5 sm:pr-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">Role</p>
                <p className="mt-2 text-sm font-semibold">{medpiperCaseStudy.role}</p>
              </div>
              <div className="border-t py-5 sm:border-l sm:border-t-0 sm:px-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">Timeframe</p>
                <p className="mt-2 text-sm font-semibold">{medpiperCaseStudy.timeframe}</p>
              </div>
              <div className="border-t py-5 sm:border-l sm:border-t-0 sm:pl-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">Status</p>
                <p className="mt-2 text-sm font-semibold">{medpiperCaseStudy.status}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-[1120px] px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">The operating problem</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                  Elapsed time was created between teams, not inside one task.
                </h2>
              </div>
              <p className="text-base leading-8 text-muted-foreground md:text-lg">
                {medpiperCaseStudy.problem}
              </p>
            </div>

            <div className="mt-14 grid overflow-hidden rounded-xl border bg-border md:grid-cols-[1fr_auto_1fr]">
              <div className="bg-background p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Before</p>
                <ul className="mt-5 space-y-4">
                  {medpiperCaseStudy.before.map((item) => (
                    <li key={item} className="text-sm leading-7 text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center border-y bg-background px-5 py-4 text-primary md:border-x md:border-y-0">
                <ArrowRight className="h-5 w-5" />
              </div>
              <div className="bg-primary/[0.045] p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">After</p>
                <ul className="mt-5 space-y-4">
                  {medpiperCaseStudy.after.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-7">
                      <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto max-w-[1120px] px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <Workflow className="h-7 w-7 text-primary" />
                <h2 className="mt-5 text-3xl font-bold tracking-tight">What I owned</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Product judgment, workflow design, platform direction, and cross-functional operating change stayed connected.
                </p>
              </div>
              <div className="divide-y border-y">
                {medpiperCaseStudy.approach.map((item, index) => (
                  <div key={item} className="grid grid-cols-[48px_1fr] gap-4 py-6">
                    <span className="font-mono text-xs text-primary">0{index + 1}</span>
                    <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-[1120px] px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Evidence and outcomes</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                The result was operational, commercial, and organisational.
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-2">
              {medpiperCaseStudy.outcomes.map((outcome) => (
                <div key={outcome} className="bg-background p-7 text-sm leading-7 text-muted-foreground">
                  {outcome}
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/[0.035] p-6">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm leading-7 text-muted-foreground">{medpiperCaseStudy.disclosure}</p>
            </div>
          </div>
        </section>

        <section className="border-t py-14">
          <div className="container mx-auto flex max-w-[1120px] flex-col gap-5 px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
            <div>
              <p className="text-sm font-semibold">Evaluating role fit or a related workflow?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Use the experience page for hiring context or send the current workflow for a scoped discussion.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href="/hire-me">Review experience</Link>
              </Button>
              <Button asChild>
                <Link href="/contact?type=project&source=medpiper-case">
                  Discuss a workflow <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
