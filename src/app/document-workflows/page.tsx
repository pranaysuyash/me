import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch, LockKeyhole, ScanLine, ShieldCheck, Workflow } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Document Workflow Systems | Pranay Suyash",
  description: "Document workflow automation for recurring PDFs, scans, signed forms, records, invoices, and review queues. OCR is one component, not the product.",
  alternates: { canonical: "https://pranaysuyash.com/document-workflows" },
};

const workflow = [
  { title: "Intake", body: "Files arrive through the existing channel: folder, inbox, API, upload surface, or operator queue." },
  { title: "Parse and extract", body: "Use native text, metadata, OCR, layout analysis, rules, or models according to the source and field type." },
  { title: "Normalize and validate", body: "Map outputs into a stable schema, retain source evidence, and separate extraction from inference." },
  { title: "Review exceptions", body: "Route low-confidence, conflicting, missing, or policy-sensitive cases to a focused reviewer workflow." },
  { title: "Export or act", body: "Send approved data into the operational system, report, downstream API, or case workflow." },
] as const;

const fit = [
  "Teams manually copying fields from recurring PDFs, scans, forms, invoices, records, or signed documents",
  "Processes where one template-specific script breaks when the source layout changes",
  "Workflows that need evidence, confidence, exception handling, and auditability around extracted data",
  "Document handling where local or controlled processing matters",
] as const;

const nonFit = [
  "A generic OCR endpoint with no operator workflow or business action",
  "A request to infer unsupported data and present it as extracted fact",
  "A cloud uploader used only as a sales lead form",
  "A fixed automation scope without access to representative source documents or reviewers",
] as const;

const deliverables = [
  { title: "Workflow and source audit", body: "Representative files, document families, fields, failure modes, reviewer roles, and downstream actions." },
  { title: "Extraction and evidence contract", body: "Schemas, field definitions, evidence links, confidence semantics, validation rules, and do-not-infer policy." },
  { title: "Operator product surface", body: "Intake, progress, review, correction, exception, and export states that a real team can operate." },
  { title: "Quality and release evidence", body: "Eval set, scorecard, known limitations, regression checks, and an explicit production-readiness boundary." },
] as const;

export default function DocumentWorkflowsPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b bg-[#0d1718] text-white">
        <div className="ledger-grid absolute inset-0 opacity-45" aria-hidden />
        <div className="container relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100/70">Document workflow systems</p>
            <h1 className="mt-5 max-w-5xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl md:text-6xl">
              Replace document copy-paste with a reviewable operating workflow.
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-white/70">
              The product is not OCR. It is the full path from source files to structured data, evidence, validation, reviewer decisions, and the operational action that follows.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-md px-7">
                <Link href="/contact?type=project&source=document-workflows">Send representative documents <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-md border-white/30 bg-white/5 px-7 text-white hover:bg-white/10">
                <Link href="/work/metaextract">Review extraction evidence</Link>
              </Button>
            </div>
          </div>
          <aside className="border-y border-white/14 py-6">
            <div className="flex items-start gap-3">
              <LockKeyhole className="mt-1 h-5 w-5 shrink-0 text-teal-200" />
              <div>
                <p className="font-semibold">Privacy is an architecture decision</p>
                <p className="mt-3 text-sm leading-7 text-white/58">
                  Local, controlled, or cloud processing is chosen according to the source material, user environment, integration needs, and risk boundary.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-12 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The product loop</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">Five connected states, not one extraction call.</h2>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-5">
            {workflow.map((step, index) => (
              <div key={step.title} className="bg-background p-6">
                <span className="font-mono text-xs text-primary">0{index + 1}</span>
                <h3 className="mt-5 font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-primary"><CheckCircle2 className="h-5 w-5" /><p className="text-xs font-semibold uppercase tracking-[0.18em]">Strong fit</p></div>
            <ul className="mt-6 divide-y border-y">{fit.map((item) => <li key={item} className="py-5 text-sm leading-7 text-muted-foreground">{item}</li>)}</ul>
          </div>
          <div>
            <div className="flex items-center gap-3 text-primary"><ShieldCheck className="h-5 w-5" /><p className="text-xs font-semibold uppercase tracking-[0.18em]">Not the offer</p></div>
            <ul className="mt-6 divide-y border-y">{nonFit.map((item) => <li key={item} className="py-5 text-sm leading-7 text-muted-foreground">{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Delivery evidence</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">The handoff includes the system and the evidence needed to operate it.</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Scope and commercial terms are documented separately through PSRS Technologies Private Limited where applicable.</p>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
            {deliverables.map((item) => <div key={item.title} className="bg-background p-6"><h3 className="font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p></div>)}
          </div>
        </div>
      </section>

      <section className="border-y bg-[#0d1718] py-14 text-white">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center md:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-teal-100/70"><ScanLine className="h-5 w-5" /><p className="text-xs font-semibold uppercase tracking-[0.18em]">Useful first material</p></div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">Send representative files, the target fields, the current handoff, and examples of what goes wrong.</h2>
          </div>
          <Button asChild variant="outline" className="border-white/25 bg-white/[0.04] text-white hover:bg-white/[0.09]">
            <Link href="/contact?type=project&source=document-workflows-bottom">Start the workflow audit <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:px-8">
          <Link href="/work/metaextract" className="group border-y py-8 md:px-6">
            <FileSearch className="h-5 w-5 text-primary" /><h2 className="mt-5 text-2xl font-bold tracking-tight">MetaExtract</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Review the active product build for broad file metadata, provenance, and operator-facing inspection.</p>
            <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">Review case study <ArrowRight className="ml-2 h-4 w-4" /></span>
          </Link>
          <Link href="/work/sig-ext-fastapi" className="group border-y py-8 md:px-6">
            <Workflow className="h-5 w-5 text-primary" /><h2 className="mt-5 text-2xl font-bold tracking-tight">SignKit</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Review a paid local-first desktop workflow for signature-image extraction, cleanup, and PDF placement.</p>
            <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">Review case study <ArrowRight className="ml-2 h-4 w-4" /></span>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
