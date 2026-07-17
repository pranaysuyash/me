import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleGauge,
  FileText,
  Mail,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { BookRegionalPrice } from "@/components/book-regional-price";
import { PageLayout } from "@/components/layout/page-layout";
import { SectionIndex } from "@/components/section-index";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { noClaimEbook } from "@/lib/ebook";

export const metadata: Metadata = {
  title: `${noClaimEbook.title}: ${noClaimEbook.subtitle}`,
  description: noClaimEbook.description,
  alternates: {
    canonical: "https://pranaysuyash.com/books/no-claim-without-evidence",
  },
  openGraph: {
    title: `${noClaimEbook.title}: ${noClaimEbook.subtitle}`,
    description: noClaimEbook.description,
    type: "website",
    url: "https://pranaysuyash.com/books/no-claim-without-evidence",
    images: [
      {
        url: "https://pranaysuyash.com/books/no-claim-without-evidence/cover.png",
        width: 1024,
        height: 1536,
        alt: `${noClaimEbook.title} cover`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: noClaimEbook.title,
    description: noClaimEbook.description,
    images: [
      "https://pranaysuyash.com/books/no-claim-without-evidence/cover.png",
    ],
  },
};

const chapters = [
  "Evidence records for LLM outputs",
  "Extraction vs inference vs normalization",
  "Eval sets, scorecards, and error taxonomies",
  "Review workflows and release gates",
  "Observability for AI product decisions",
  "Agent action evals and pipeline tests",
] as const;

const sampleContents = [
  "Introduction: the evidence habit",
  "Chapter 1: the unsupported airline-ticket fields",
  "Chapter 15: testing the pipeline instead of blaming the model",
  "Chapter 19: turning evals into a release gate",
  "A reusable claim-evidence ledger",
] as const;

const principles = [
  {
    icon: ShieldCheck,
    title: "Evidence before confidence",
    body: "Treat every AI output as a claim. Accept it only when the system can show source evidence, status, and the action taken.",
  },
  {
    icon: Workflow,
    title: "Evaluate the pipeline",
    body: "The model call is only one layer. The book covers prompts, schemas, fallback rules, review policy, data/config, and release gates.",
  },
  {
    icon: FileText,
    title: "Use practical artifacts",
    body: "Includes field-record patterns, eval manifests, error taxonomy examples, and an airline-ticket extraction case study.",
  },
] as const;

const deliveryNotes = [
  "PDF and EPUB editions",
  "Secure Dodo checkout and file delivery",
  "One-time purchase with no subscription",
] as const;

const consultingNotes = [
  "Workflow review and scoping",
  "Implementation help for AI extraction or review systems",
  "Team workshops and productized advisory",
] as const;

const bookSections = [
  { label: "Inside", href: "#inside" as const },
  { label: "Reading sample", href: "#sample" as const },
  { label: "Method", href: "#method" as const },
  { label: "Audience & price", href: "#audience" as const },
  { label: "Consulting & delivery", href: "#consulting-delivery" as const },
] as const;

export default function NoClaimWithoutEvidencePage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b bg-[#071017] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(35,190,255,0.22),transparent_34%),linear-gradient(120deg,rgba(255,197,94,0.12),transparent_36%)]" />
        <div className="container relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-16 md:px-6 md:py-20 lg:grid-cols-[1fr_380px] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Ebook for AI builders
            </p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {noClaimEbook.title}
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-cyan-50/88 md:text-2xl">
              {noClaimEbook.subtitle}
            </p>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
              A field guide for building LLM workflows where every important output can be traced, tested, reviewed, or blocked before it reaches a user.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href={noClaimEbook.checkoutUrl}>
                  {noClaimEbook.checkoutLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="rounded-full px-8 text-foreground">
                <Link href={noClaimEbook.sampleUrl}>{noClaimEbook.sampleLabel}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-white/30 bg-white/5 px-8 text-white hover:bg-white/10"
              >
                <Link href={noClaimEbook.consultingUrl}>{noClaimEbook.consultingLabel}</Link>
              </Button>
            </div>
            <BookRegionalPrice tone="dark" compact className="mt-6" />
          </div>

          <div className="space-y-4">
            <div className="mx-auto w-full max-w-[330px] lg:max-w-none">
              <div className="rounded-[10px] border border-white/12 bg-white/8 p-3 shadow-2xl shadow-cyan-950/70">
                <Image
                  src={noClaimEbook.cover}
                  alt={`${noClaimEbook.title} cover`}
                  width={1024}
                  height={1536}
                  priority
                  className="h-auto w-full rounded-[6px]"
                />
              </div>
            </div>
            <div className="rounded-[10px] border border-white/12 bg-white/6 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/80">
                What you get
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-white/78">
                {deliveryNotes.map((note) => (
                  <li key={note} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SectionIndex items={bookSections} label="Book sections" />

      <section id="inside" className="scroll-mt-24 py-16 md:py-20">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="mb-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              The thesis
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Clean AI output is not the same thing as a trustworthy system.
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              The book starts from a small airline-ticket extraction failure: the source document does not show a terminal, but the model confidently returns one. From there, it builds the operating discipline needed for serious AI products.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {chapters.map((chapter) => (
              <div key={chapter} className="flex gap-3 rounded-lg border bg-card p-4 text-sm shadow-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{chapter}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sample" className="scroll-mt-24 border-y bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 md:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Curated reading sample
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Judge the writing, examples, and operating method before you buy.
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">
              This is a real web-formatted reading sample, not a synopsis. It brings together selected excerpts from the introduction, three chapters, and a reusable template so you can evaluate the book across field-level evidence, pipeline diagnosis, and release decisions.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-8">
                <Link href={noClaimEbook.sampleUrl}>
                  Open the reading sample <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link href={noClaimEbook.checkoutUrl}>Buy the full book</Link>
              </Button>
            </div>
          </div>

          <Card className="border bg-card shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 border-b pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CircleGauge className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Inside the sample</p>
                  <p className="text-sm text-muted-foreground">Five substantial selections, properly formatted for reading.</p>
                </div>
              </div>
              <ol className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                {sampleContents.map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-mono text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="method" className="scroll-mt-24 border-b bg-muted/35 py-16 md:py-20">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-9 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Operating method</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Evidence, pipeline evaluation, and practical artifacts.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {principles.map((item) => (
              <Card key={item.title} className="bg-background/90">
                <CardContent className="p-6">
                  <item.icon className="mb-5 h-6 w-6 text-primary" />
                  <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="audience" className="scroll-mt-24 py-16 md:py-20">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          <div>
            <p className="mb-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Who it is for
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Builders who need AI systems to survive contact with real users.
            </h2>
            <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">
              Written for solo founders, AI engineers, product-minded developers, PMs, and operators building extraction, review, automation, or agent workflows. It is deliberately practical: short chapters, concrete examples, and reusable patterns.
            </p>
          </div>

          <Card className="border bg-card shadow-sm">
            <CardContent className="p-6">
              <BookRegionalPrice />
              <Button asChild className="mt-6 w-full rounded-full">
                <Link href={noClaimEbook.checkoutUrl}>{noClaimEbook.checkoutLabel}</Link>
              </Button>
              <Button asChild variant="outline" className="mt-3 w-full rounded-full">
                <Link href={noClaimEbook.sampleUrl}>{noClaimEbook.sampleLabel}</Link>
              </Button>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t pt-4 text-xs">
                <Link href="/delivery-policy" className="text-primary hover:underline">Delivery</Link>
                <Link href="/refund-policy" className="text-primary hover:underline">Refunds</Link>
                <Link href="/terms" className="text-primary hover:underline">Terms</Link>
                <Link href="/privacy" className="text-primary hover:underline">Privacy</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="consulting-delivery" className="scroll-mt-24 border-y bg-background py-16 md:py-20">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Card className="bg-card shadow-sm">
              <CardContent className="p-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">For consulting</p>
                <h3 className="text-2xl font-bold tracking-tight">Need help shaping the same kind of workflow for your team?</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  The enquiry path is for custom work, workshops, or scoped advisory. Use it when you want a human review of your workflow, not just the ebook.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-foreground">
                  {consultingNotes.map((note) => (
                    <li key={note} className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 rounded-full px-8">
                  <Link href={noClaimEbook.consultingUrl}>
                    Send an enquiry <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-muted/35 shadow-sm">
              <CardContent className="p-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Purchase and delivery</p>
                <h3 className="text-xl font-semibold">A standard digital product, separate from custom work.</h3>
                <ul className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                  <li>One-time regional price with no recurring subscription.</li>
                  <li>Secure PDF and EPUB access is delivered after successful payment.</li>
                  <li>Dodo Payments handles payment, applicable tax, receipt, and secure file delivery.</li>
                  <li>Consulting and implementation services require a separate written scope.</li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Link href="/delivery-policy" className="font-medium text-primary hover:underline">Delivery policy</Link>
                  <Link href="/refund-policy" className="font-medium text-primary hover:underline">Refund policy</Link>
                  <Link href="/terms" className="font-medium text-primary hover:underline">Terms</Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
