import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Download,
  FileSearch,
  Handshake,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { SectionIndex } from "@/components/section-index";
import { Button } from "@/components/ui/button";
import { WorkflowLibraryExplorer } from "@/components/workflow-library/workflow-library-explorer";

export const metadata: Metadata = {
  title: "Workflow Library | Try, Download, Verify, or Scope a System",
  description:
    "Choose a workflow by source material, priority, and next step. Download practical starters, try working mechanisms, review audited cases, or scope a custom system.",
  alternates: { canonical: "https://pranaysuyash.com/workflows" },
  openGraph: {
    title: "Workflow Library | Pranay Suyash",
    description:
      "An interactive catalogue for choosing evidence-led document, image, audio, and spatial workflows—then downloading, trying, verifying, or scoping the right next step.",
    url: "https://pranaysuyash.com/workflows",
    type: "website",
  },
};

const workflowSections = [
  {
    label: "Choose",
    href: "#choose" as const,
    description: "Filter by source material, priority, and desired next step",
  },
  {
    label: "Ways to use it",
    href: "#paths" as const,
    description: "Starter, live mechanism, case, project, or consultation",
  },
  {
    label: "Boundaries",
    href: "#boundaries" as const,
    description: "What the library proves and what still needs product work",
  },
] as const;

const paths = [
  {
    icon: Download,
    title: "Download a starter",
    body: "Take a practical operating artifact with states, contracts, failure tests, acceptance gates, and scoping questions. No email gate.",
  },
  {
    icon: PlayCircle,
    title: "Try a live mechanism",
    body: "Operate a deliberately small browser-contained function when one exists. The interface states its claim boundary instead of pretending to be the full product.",
  },
  {
    icon: BookOpen,
    title: "Review an audited case",
    body: "Inspect current maturity, source revision, product decisions, constraints, and implementation evidence before accepting the broader claim.",
  },
  {
    icon: Handshake,
    title: "Choose project or consultation",
    body: "A consultation clarifies the workflow and next decision. A custom project is a separately scoped build with acceptance evidence and an end condition.",
  },
] as const;

export default function WorkflowsPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b bg-[#071013] text-white">
        <div className="ledger-grid absolute inset-0 opacity-40" aria-hidden />
        <div className="container relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1fr_370px] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100/70">
              Interactive workflow library
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl md:text-6xl">
              Choose the workflow first. Then decide whether to download, try, verify, or build it.
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-white/70">
              Start from the source material and operating problem—not a model name or generic service menu. The library recommends a workflow and exposes the honest next paths around it.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-md px-7">
                <Link href="#choose">
                  Choose a workflow <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-md border-white/30 bg-white/5 px-7 text-white hover:bg-white/10"
              >
                <Link href="/systems">Try working mechanisms</Link>
              </Button>
            </div>
          </div>

          <aside className="border-y border-white/14 py-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-teal-200" />
              <div>
                <p className="font-semibold">One catalogue, five distinct acquisition paths</p>
                <p className="mt-3 text-sm leading-7 text-white/58">
                  Starter downloads are direct and ungated. Live mechanisms are small and claim-bounded. Cases are the source of truth for maturity. Projects and consultations remain separate commercial paths.
                </p>
              </div>
            </div>
            <div className="mt-6 border-t border-white/12 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-100/65">
                Current families
              </p>
              <p className="mt-3 text-sm leading-7 text-white/68">
                Document extraction, signature/document handling, visual inspection, spatial coverage, and meeting capture/retrieval.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <SectionIndex items={workflowSections} label="Workflow library sections" />

      <section id="choose" className="scroll-mt-24 py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Choose the operating shape
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                Three decisions narrow the library to the right next step.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground lg:justify-self-end">
              The recommendation is deterministic and runs entirely in this browser. It does not collect behavioral history or send the choices to a model.
            </p>
          </div>
          <WorkflowLibraryExplorer />
        </div>
      </section>

      <section id="paths" className="scroll-mt-24 border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Five ways to use the same workflow
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              The visitor chooses the depth of commitment instead of being forced into one funnel.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-2 lg:grid-cols-4">
            {paths.map((path) => (
              <article key={path.title} className="bg-background p-6">
                <path.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold">{path.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{path.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="boundaries" className="scroll-mt-24 py-16 md:py-24">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Trust boundary
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              A useful starter is not a production claim.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              The library makes small mechanisms and practical operating artifacts available without overstating them. Full product capability, production readiness, customer outcomes, and commercial scope remain tied to their actual evidence surfaces.
            </p>
          </div>

          <div className="divide-y border-y">
            <div className="grid gap-3 py-6 sm:grid-cols-[170px_1fr]">
              <p className="font-semibold">Working mechanisms</p>
              <p className="text-sm leading-7 text-muted-foreground">
                Real browser-executed functions with synthetic inputs and explicit limits. Review them in the <Link href="/systems" className="font-semibold text-primary hover:underline">Working Systems Lab</Link>.
              </p>
            </div>
            <div className="grid gap-3 py-6 sm:grid-cols-[170px_1fr]">
              <p className="font-semibold">Audited cases</p>
              <p className="text-sm leading-7 text-muted-foreground">
                Revision-pinned maturity, decisions, constraints, and implementation evidence. Browse <Link href="/work" className="font-semibold text-primary hover:underline">Selected Work</Link>.
              </p>
            </div>
            <div className="grid gap-3 py-6 sm:grid-cols-[170px_1fr]">
              <p className="font-semibold">Commercial work</p>
              <p className="text-sm leading-7 text-muted-foreground">
                A consultation clarifies the workflow; a project defines the useful product boundary, implementation, acceptance evidence, exclusions, and delivery terms. Review <Link href="/work-with-me" className="font-semibold text-primary hover:underline">Commercial Engagements</Link>.
              </p>
            </div>
            <div className="grid gap-3 py-6 sm:grid-cols-[170px_1fr]">
              <p className="font-semibold">Document wedge</p>
              <p className="text-sm leading-7 text-muted-foreground">
                For recurring PDFs, scans, forms, invoices, records, and signed documents, the focused offer remains <Link href="/document-workflows" className="font-semibold text-primary hover:underline">Document Workflow Systems</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-[#0d1718] py-14 text-white">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center md:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-teal-100/70">
              <FileSearch className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Bring the workflow, not a polished specification</p>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
              Source material, handoffs, failures, and the desired operating outcome are enough to start.
            </h2>
          </div>
          <Button asChild variant="outline" className="border-white/25 bg-white/[0.04] text-white hover:bg-white/[0.09]">
            <Link href="/contact?type=project&source=workflow-library-bottom">
              Discuss a workflow <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
