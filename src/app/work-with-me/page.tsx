import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  FileSearch,
  Gauge,
  Map,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RegionalPricing } from "@/components/regional-pricing";

export const metadata: Metadata = {
  title: "Services | Product and AI Systems | Pranay Suyash",
  description:
    "Scoped product engineering for document intelligence, operational workflows, local-first AI tools, and simulation-heavy systems.",
  openGraph: {
    title: "Services | Product and AI Systems | Pranay Suyash",
    description:
      "From unclear operational problem to usable, reviewable product system.",
    type: "website",
  },
};

const capabilities = [
  {
    title: "Document and media intelligence",
    body: "Extraction, OCR, semantic structure, multimodal search, RAG, confidence scoring, and reviewer workflows for messy source material.",
    icon: FileSearch,
  },
  {
    title: "Operational product systems",
    body: "Internal tools, approvals, case workflows, dashboards, and automation that replace fragmented spreadsheets and manual handoffs.",
    icon: Workflow,
  },
  {
    title: "Local-first AI products",
    body: "Desktop and native tools where privacy, file access, offline use, latency, or user control make cloud-only architecture the wrong default.",
    icon: Boxes,
  },
  {
    title: "Spatial and simulation products",
    body: "Interactive editors, digital twins, coverage analysis, pathfinding, scene alignment, and evidence-backed spatial decision systems.",
    icon: Map,
  },
] as const;

const workingPrinciples = [
  {
    title: "Start from the operator",
    body: "The actual user, edge cases, handoffs, and failure states define the product. The model or framework comes later.",
    icon: Gauge,
  },
  {
    title: "Make uncertainty inspectable",
    body: "AI output gets confidence, evidence, review states, and explicit fallbacks before it is allowed to drive a decision.",
    icon: ShieldCheck,
  },
  {
    title: "Ship a system, not a screen",
    body: "The work includes data flow, state, error handling, deployment, and operating notes, not just the visible interface.",
    icon: Boxes,
  },
] as const;

const proof = [
  {
    title: "MedPiper",
    result: "Compressed an insurance-processing workflow from about four weeks to about ten days.",
  },
  {
    title: "SignKit",
    result: "Took signature extraction and PDF signing from workflow pain to a paid desktop product.",
  },
  {
    title: "MetaExtract",
    result: "Built a modular extraction system for variable documents with normalized, reviewable output.",
  },
  {
    title: "SentinelTwin",
    result: "Built the product spine for a physical-security digital twin with coverage, replay, comparison, and evidence surfaces.",
  },
] as const;

const faq = [
  {
    question: "Why are India and global prices different?",
    answer:
      "They are separate regional price books, not a currency conversion. The difference reflects buyer context and local market conditions while preserving a senior, outcome-based scope. Funded or enterprise teams may price above the displayed starting points in either region.",
  },
  {
    question: "Do you only build AI products?",
    answer:
      "No. AI is useful when it improves the workflow. I also build conventional product systems, desktop tools, data pipelines, editors, simulations, and automation where deterministic software is the better answer.",
  },
  {
    question: "Can you work inside an existing codebase?",
    answer:
      "Yes. A bounded subsystem, difficult workflow, architecture correction, or product surface inside an existing stack is often a better engagement than starting from zero.",
  },
  {
    question: "What makes a project a poor fit?",
    answer:
      "No access to real users or examples, success defined as vague AI novelty, or a fixed deadline with no willingness to reduce scope. Those conditions make honest delivery impossible.",
  },
] as const;

export default function WorkWithMePage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b bg-[#10191a] text-white">
        <div className="ledger-grid absolute inset-0 opacity-50" aria-hidden />
        <div className="container relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-20 md:px-6 md:py-24 lg:grid-cols-[1fr_360px] lg:px-8 lg:py-28">
          <div className="max-w-4xl animate-fade-up">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-teal-100/75">
              Product and AI systems for founders and teams
            </p>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Build the system behind the workflow, not another disconnected feature.
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              I take operational work that is still manual, fragmented, or hard to
              specify and turn it into usable software. That can mean document
              intelligence, a local-first desktop product, an internal operating
              tool, or a simulation-heavy product surface.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-md px-7">
                <Link href="/contact?type=project&source=services">
                  Discuss a build <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-md border-white/30 bg-white/5 px-7 text-white hover:bg-white/10"
              >
                <Link href="#pricing">See engagement scopes</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/[0.04] p-6 lg:self-end">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-100/70">
              Best fit
            </p>
            <p className="mt-3 text-lg font-semibold">
              The business problem is real. The right software shape is not obvious yet.
            </p>
            <p className="mt-3 text-sm leading-7 text-white/62">
              That ambiguity is part of the work. I map the actual process, choose
              the narrowest useful system boundary, and keep progress visible through
              working software rather than presentation cycles.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b bg-background py-8">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-4 lg:px-8">
          {proof.map((item) => (
            <div key={item.title} className="evidence-rule py-2">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {item.result}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              What I build
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Four capability areas, one operating pattern.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The common thread is not a specific framework. It is turning messy
              inputs, uncertain decisions, and fragmented work into a coherent product
              people can operate and verify.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <Card key={capability.title} className="h-full border shadow-sm">
                  <CardContent className="p-6">
                    <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-semibold">{capability.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {capability.body}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/35 py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                How I work
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Product judgment and implementation stay together.
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                You do not need to translate a business problem into a perfect ticket
                backlog before we start. I can own the path from workflow discovery to
                architecture, interface, implementation, and handoff.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {workingPrinciples.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div key={principle.title} className="rounded-lg border bg-background p-5 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-mono text-xs text-muted-foreground">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold">{principle.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {principle.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Engagements and pricing
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Buy a decision, a build, or sustained ownership.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              These are starting scopes, not rigid packages. The displayed price is a
              useful floor for deciding whether the engagement shape matches the
              problem before either side spends time on calls.
            </p>
          </div>
          <RegionalPricing />
        </div>
      </section>

      <section className="border-y bg-[#10191a] py-16 text-white">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center md:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/70">
              Start with evidence
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              Review the systems, trade-offs, and ownership behind the claims.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65 md:text-base">
              The work pages are organized around the problem, architecture, constraints,
              and what changed, not screenshots and technology badges alone.
            </p>
          </div>
          <Button asChild variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10">
            <Link href="/work">
              See selected work <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">Questions buyers usually ask</h2>
          <div className="mt-8 space-y-6">
            {faq.map((item) => (
              <div key={item.question} className="border-b pb-6">
                <h3 className="font-semibold">{item.question}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-16">
        <div className="container mx-auto max-w-[1280px] px-4 text-center md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Send the problem before you send the feature list.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Include who does the work today, where it breaks, examples of the inputs,
            the deadline, and what a useful outcome would change. I will reply with a
            fit assessment and a concrete next step.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-md px-8">
            <Link href="/contact?type=project&source=services">
              Send a project brief <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
