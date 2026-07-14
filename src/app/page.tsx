import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  Boxes,
  FileSearch,
  Map,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSystemPanel } from "@/components/hero-system-panel";

export const metadata: Metadata = {
  title: "Pranay Suyash | Product Engineer for AI and Operational Systems",
  description:
    "I design and build document intelligence, local-first AI tools, operational workflows, and simulation-heavy product systems.",
  openGraph: {
    title: "Pranay Suyash | Product Engineer for AI and Operational Systems",
    description:
      "From unclear operational problem to usable, reviewable product system.",
    type: "website",
  },
};

const proofPoints = [
  {
    signal: "14 years",
    result: "Across product, engineering, operations, and founder-level execution.",
  },
  {
    signal: "~4 weeks → ~10 days",
    result: "Insurance-processing turnaround after workflow redesign and tooling.",
  },
  {
    signal: "Paid product shipped",
    result: "SignKit moved from workflow pain to a commercial desktop application.",
  },
  {
    signal: "Local-first + reviewable",
    result: "Privacy, evidence, fallbacks, and human review are designed into the system.",
  },
] as const;

const capabilityPillars = [
  {
    title: "Document and media intelligence",
    body: "OCR, extraction, semantic structure, multimodal search, RAG, evaluation, and reviewer workflows for messy source material.",
    icon: FileSearch,
  },
  {
    title: "Operational product systems",
    body: "Internal tools, approvals, case workflows, automation, and dashboards that replace fragmented manual work.",
    icon: Workflow,
  },
  {
    title: "Local-first AI products",
    body: "Desktop and native software for private files, on-device models, low-latency interaction, and offline-capable workflows.",
    icon: Boxes,
  },
  {
    title: "Spatial and simulation products",
    body: "Interactive editors, digital twins, coverage analysis, pathfinding, scene alignment, and evidence-backed spatial decisions.",
    icon: Map,
  },
] as const;

const selectedSystems = [
  {
    title: "SentinelTwin",
    category: "Spatial intelligence",
    stage: "Active product build",
    summary:
      "A physical-security digital twin for coverage analysis, incident replay, comparison, governance, and evidence-backed hardening decisions.",
    proves:
      "Complex product architecture, simulation, interactive editors, and long-horizon system design.",
    href: "/work/sentineltwin",
    external: false,
    icon: Map,
  },
  {
    title: "SignKit",
    category: "Computer vision · desktop",
    stage: "Paid product",
    summary:
      "Signature extraction and PDF signing combined into one local file-heavy workflow for people who should not need three separate tools.",
    proves:
      "Productization, cross-platform desktop delivery, computer vision, billing, packaging, and commercial validation.",
    href: "/work/sig-ext-fastapi",
    external: false,
    icon: ShieldCheck,
  },
  {
    title: "MetaExtract",
    category: "Document intelligence",
    stage: "Production workflow system",
    summary:
      "A modular extraction system for variable PDFs, scans, and document types with normalized output and confidence-led review.",
    proves:
      "Applied AI architecture that stays inspectable, operable, and extensible as document variability grows.",
    href: "/work/metaextract",
    external: false,
    icon: FileSearch,
  },
  {
    title: "EchoPanel",
    category: "Local-first audio AI",
    stage: "Native product system",
    summary:
      "A macOS meeting recorder that captures audio, transcribes locally, and makes conversations searchable when the user needs them later.",
    proves:
      "Native UX, audio pipelines, on-device inference, private storage, and retrieval in one coherent product flow.",
    href: "/work/echopanel",
    external: false,
    icon: AudioLines,
  },
] as const;

const engagementPaths = [
  {
    title: "Map the system",
    body: "For a real problem whose product boundary, architecture, or riskiest assumptions are still unclear.",
    note: "5 to 7 working days",
  },
  {
    title: "Build the core product path",
    body: "For an AI-assisted product, internal tool, or local-first workflow that needs to become usable by real people.",
    note: "3 to 5 weeks",
  },
  {
    title: "Own a production workstream",
    body: "For larger systems that need integrations, evaluation, governance, deployment, and sustained senior execution.",
    note: "6 to 12 weeks or monthly",
  },
] as const;

export default function Home() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b bg-[#10191a] text-white">
        <div className="ledger-grid absolute inset-0 opacity-55" aria-hidden />
        <div className="container relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-20 md:px-6 md:py-24 lg:grid-cols-[1fr_460px] lg:px-8 lg:py-28">
          <div className="animate-fade-up">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-teal-100/75">
              Pranay Suyash · product engineer and systems builder
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Product systems for work that is still manual, fragmented, or hard to trust.
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              I design and build document intelligence, local-first AI tools,
              operational workflows, and spatial simulations. The work starts with
              the real process and ends with usable software, review states, evidence,
              and a credible path beyond the first release.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-md px-7">
                <Link href="/contact?type=project&source=home">
                  Discuss a build <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-md border-white/30 bg-white/5 px-7 text-white hover:bg-white/10"
              >
                <Link href="/work">See selected systems</Link>
              </Button>
              <Link
                href="/hire-me"
                className="text-sm font-medium text-white/62 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Considering me for a role?
              </Link>
            </div>
          </div>

          <div className="hidden md:block lg:pt-2">
            <HeroSystemPanel />
          </div>
        </div>
      </section>

      <section className="border-b bg-background py-8">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-3 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-4 lg:px-8">
          {proofPoints.map((point) => (
            <div key={point.signal} className="evidence-rule py-2">
              <p className="text-sm font-semibold text-foreground">
                {point.signal}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {point.result}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Capability map
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                The model is a component. The product is the system around it.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground lg:justify-self-end">
              I am most useful where product judgment, architecture, interface design,
              data or model pipelines, and operational reality need to stay connected.
              The technology changes by problem; the operating discipline does not.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {capabilityPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.title} className="h-full border bg-card shadow-sm">
                  <CardContent className="p-6">
                    <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-semibold">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {pillar.body}
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
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Selected systems
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                A smaller set of projects, each proving something different.
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Browse the full archive <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {selectedSystems.map((system) => {
              const Icon = system.icon;
              return (
                <Link
                  key={system.title}
                  href={system.href}
                  target={system.external ? "_blank" : undefined}
                  rel={system.external ? "noopener noreferrer" : undefined}
                  className="group"
                >
                  <Card className="hover-lift h-full border bg-background shadow-sm">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="text-right">
                          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                            {system.category}
                          </p>
                          <p className="mt-1 text-xs text-primary">{system.stage}</p>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-primary">
                        {system.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {system.summary}
                      </p>
                      <p className="evidence-rule mt-5 text-sm leading-7 text-muted-foreground">
                        <span className="font-semibold text-foreground">
                          What it proves:
                        </span>{" "}
                        {system.proves}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        Review the system <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Ways to work together
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Start at the level of uncertainty you actually have.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Do not buy a large build when the first problem is scope. Do not buy an
              audit when the decision is already clear and execution is the bottleneck.
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-md">
              <Link href="/work-with-me">
                See regional pricing and scopes <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {engagementPaths.map((path, index) => (
              <div key={path.title} className="rounded-lg border bg-card p-5 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-xs text-primary">0{index + 1}</span>
                  <span className="text-xs text-muted-foreground">{path.note}</span>
                </div>
                <h3 className="font-semibold">{path.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {path.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-[#10191a] py-16 text-white">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-7 px-4 md:grid-cols-[1fr_auto] md:px-6 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/75">
              Writing and operating discipline
            </p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              No Claim Without Evidence
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72 md:text-base">
              A practical field guide to evidence links, evals, review rules, action
              traces, and release gates for AI-assisted workflows.
            </p>
          </div>
          <Button asChild variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10">
            <Link href="/books/no-claim-without-evidence">
              Read about the book <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1000px] px-4 text-center md:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            The useful first message
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Tell me who does the work today, where it breaks, and what a better system would change.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            A rough workflow, sample document, screen recording, or existing tool list
            is more useful than a polished feature specification.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-md px-8">
            <Link href="/contact?type=project&source=home-bottom">
              Send the problem <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
