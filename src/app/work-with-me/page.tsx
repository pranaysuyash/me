import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  FileSearch,
  Map,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { RegionalPricing } from "@/components/regional-pricing";

export const metadata: Metadata = {
  title: "Services | Document Workflows, Internal Tools, and Local-first Products",
  description:
    "Scoped product and system engagements for document-heavy workflows, AI-assisted internal tools, local-first desktop products, and advanced simulation systems.",
  alternates: { canonical: "https://pranaysuyash.com/work-with-me" },
};

const serviceHierarchy = [
  {
    icon: FileSearch,
    level: "Primary",
    title: "Document workflow systems",
    body: "For recurring PDFs, scans, records, forms, invoices, signed documents, or packets that currently require manual review, copy-paste, and exception handling.",
    href: "/document-workflows",
    action: "Review document workflow offer",
  },
  {
    icon: Workflow,
    level: "Primary",
    title: "AI-assisted internal tools",
    body: "For intake, triage, extraction, approvals, case work, dashboards, and operational automation where model output must remain inspectable.",
    href: "/contact?type=project&source=internal-tools",
    action: "Discuss an internal tool",
  },
  {
    icon: Boxes,
    level: "Specialist",
    title: "Local-first desktop products",
    body: "For privacy-sensitive, file-heavy, offline, or low-latency workflows where direct filesystem access and user control make a cloud-only product the wrong default.",
    href: "/work/sig-ext-fastapi",
    action: "Review local-first product evidence",
  },
  {
    icon: Map,
    level: "Advanced product work",
    title: "Spatial and simulation systems",
    body: "For editors, digital twins, path analysis, scene alignment, comparison, and decision surfaces that require deterministic spatial reasoning.",
    href: "/work/sentineltwin",
    action: "Review spatial system evidence",
  },
] as const;

const workingModel = [
  {
    title: "Start with the operating workflow",
    body: "Users, inputs, handoffs, exceptions, and the cost of failure define the product boundary before a model or framework does.",
  },
  {
    title: "Keep uncertainty inspectable",
    body: "AI output receives evidence, confidence, review states, fallbacks, and an explicit route to human judgment.",
  },
  {
    title: "Define acceptance before implementation",
    body: "A scope includes the useful user path, quality bar, exclusions, delivery evidence, and what must be true for the engagement to be complete.",
  },
  {
    title: "Ship the operating system around the feature",
    body: "State, errors, permissions, observability, deployment, documentation, and handoff are part of the product rather than optional cleanup.",
  },
] as const;

const faq = [
  {
    question: "Do you only build AI products?",
    answer: "No. AI is one component when it improves the workflow. Deterministic software, rules, search, data pipelines, and operator tools are often equally important.",
  },
  {
    question: "Can you work inside an existing product and codebase?",
    answer: "Yes. A bounded workflow, subsystem, architecture correction, or difficult operator surface inside an existing stack is often a better engagement than starting from zero.",
  },
  {
    question: "What makes a project a poor fit?",
    answer: "No access to real examples or users, success defined as vague AI novelty, or a fixed deadline with no willingness to narrow scope. Those conditions make honest delivery impossible.",
  },
  {
    question: "Who contracts the commercial engagement?",
    answer: "Custom project and advisory work is scoped separately and may be contracted through PSRS Technologies Private Limited. The personal site remains the proof-of-work and professional context surface.",
  },
] as const;

export default function WorkWithMePage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b bg-[#0d1718] text-white">
        <div className="ledger-grid absolute inset-0 opacity-45" aria-hidden />
        <div className="container relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100/70">
              Scoped product and system engagements
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl md:text-6xl">
              Build the system behind the workflow, not another disconnected feature.
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-white/70">
              I work best where the business problem is real, the current process is fragmented,
              and the useful software boundary is not obvious yet. The engagement connects workflow
              discovery, product decisions, implementation, and operating evidence.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-md px-7">
                <Link href="/contact?type=project&source=services">
                  Discuss a workflow <ArrowRight className="ml-2 h-4 w-4" />
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

          <aside className="border-y border-white/14 py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-100/65">Best fit</p>
            <p className="mt-4 text-lg font-semibold leading-7">
              The workflow is valuable enough to fix, but too messy to translate into a clean feature list.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/60">
              Start with users, source material, handoffs, failures, and what a useful outcome would change.
              A polished requirements document is not necessary.
            </p>
          </aside>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-12 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Service hierarchy</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Lead with document and workflow systems. Use advanced capabilities where the problem demands them.
            </h2>
          </div>

          <div className="divide-y border-y">
            {serviceHierarchy.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="grid gap-6 py-8 md:grid-cols-[180px_1fr_auto] md:items-center">
                  <div className="flex items-center gap-3 text-primary">
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-semibold uppercase tracking-[0.14em]">{service.level}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">{service.title}</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{service.body}</p>
                  </div>
                  <Link href={service.href} className="inline-flex items-center text-sm font-semibold text-primary">
                    {service.action} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How the work is run</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Product judgment and implementation stay together.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                The engagement is not a sequence of presentation cycles. Progress stays visible through decisions,
                working software, quality evidence, and explicit boundaries.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
              {workingModel.map((item, index) => (
                <div key={item.title} className="bg-background p-6">
                  <span className="font-mono text-xs text-primary">0{index + 1}</span>
                  <h3 className="mt-5 font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Engagements and pricing</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Buy a decision, a focused build, a production system, or sustained ownership.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Starting scopes create an honest floor before either side invests in calls. Final scope depends on
              workflow risk, integrations, quality requirements, delivery speed, and the amount of unknown product work.
            </p>
          </div>
          <RegionalPricing />
        </div>
      </section>

      <section className="border-y bg-[#0d1718] py-14 text-white">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center md:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-teal-100/70">
              <ShieldCheck className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Start with evidence</p>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
              Review the ownership, decisions, constraints, and maturity behind the portfolio claims.
            </h2>
          </div>
          <Button asChild variant="outline" className="border-white/25 bg-white/[0.04] text-white hover:bg-white/[0.09]">
            <Link href="/work">Review selected work <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">Questions buyers usually ask</h2>
          <div className="mt-8 divide-y border-y">
            {faq.map((item) => (
              <div key={item.question} className="py-6">
                <h3 className="font-semibold">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="rounded-md px-8">
              <Link href="/contact?type=project&source=services-bottom">
                Send the workflow <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
