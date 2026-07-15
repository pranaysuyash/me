import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleGauge,
  FileDown,
  FileText,
  Mail,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
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
];

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
];

const previewPoints = [
  "A clean JSON field can still be unsupported.",
  "The airline-ticket example shows how extraction, inference, and review diverge.",
  "The sample chapter gives you the operating pattern before the full book.",
] as const;

const deliveryNotes = noClaimEbook.hasCheckout
  ? [
      "PDF + EPUB editions",
      "Dodo-powered checkout and secure file delivery",
      "Built for builders, operators, and teams",
    ]
  : [
      "PDF + EPUB editions in final production",
      "Purchase opens only after checkout and delivery tests pass",
      "Sample chapter available now",
    ];

const consultingNotes = [
  "Workflow review and scoping",
  "Implementation help for AI extraction or review systems",
  "Team workshops and productized advisory",
];

export default function NoClaimWithoutEvidencePage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b bg-[#071017] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(35,190,255,0.22),transparent_34%),linear-gradient(120deg,rgba(255,197,94,0.12),transparent_36%)]" />
        <div className="container relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-20 md:px-6 lg:grid-cols-[1fr_420px] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              {noClaimEbook.hasCheckout
                ? "Ebook for AI builders"
                : "Sample available · full ebook in final production"}
            </p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {noClaimEbook.title}
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-cyan-50/88 md:text-2xl">
              {noClaimEbook.subtitle}
            </p>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
              A field guide for building LLM workflows where every important
              output can be traced, tested, reviewed, or blocked before it
              reaches a user.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {noClaimEbook.hasCheckout ? (
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href={noClaimEbook.checkoutUrl}>
                    {noClaimEbook.checkoutLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : null}
              <Button
                asChild
                variant={noClaimEbook.hasCheckout ? "secondary" : "default"}
                size="lg"
                className={`rounded-full px-8 ${
                  noClaimEbook.hasCheckout ? "text-foreground" : ""
                }`}
              >
                <Link href={noClaimEbook.sampleUrl}>
                  {noClaimEbook.sampleLabel}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-white/30 bg-white/5 px-8 text-white hover:bg-white/10"
              >
                <Link href={noClaimEbook.consultingUrl}>
                  {noClaimEbook.consultingLabel}
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
              <span>{noClaimEbook.priceSummary}</span>
              <span className="text-white/30">/</span>
              <span>{noClaimEbook.format}</span>
              <span className="text-white/30">/</span>
              <span>{noClaimEbook.pricingNote}</span>
              <span className="text-white/30">/</span>
              <span>{noClaimEbook.fulfillmentLabel}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="mx-auto w-full max-w-[360px] lg:max-w-none">
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

      <section id="inside" className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="mb-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                The thesis
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Clean AI output is not the same thing as a trustworthy system.
              </h2>
              <p className="mt-5 leading-8 text-muted-foreground">
                The book starts from a small airline-ticket extraction failure:
                the source document does not show a terminal, but the model
                confidently returns one. From there, it builds the operating
                discipline needed for serious AI products.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {chapters.map((chapter) => (
                <div
                  key={chapter}
                  className="flex gap-3 rounded-lg border bg-card p-4 text-sm shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{chapter}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="sample" className="border-y bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 md:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Sample chapter
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Read the part that makes the whole book click.
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">
              The sample shows the book in motion: an unsupported terminal
              field, the distinction between extraction and inference, and the
              evidence habit that turns a clean-looking answer into a
              trustworthy workflow.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-8">
                <Link href={noClaimEbook.sampleUrl}>
                  Open the sample
                  <FileDown className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link href={noClaimEbook.consultingUrl}>
                  Ask about consulting
                </Link>
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
                  <p className="text-sm font-semibold">Preview inside</p>
                  <p className="text-sm text-muted-foreground">
                    Enough to feel the method before you buy.
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                {previewPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 overflow-hidden rounded-xl border bg-background">
                <Image
                  src={noClaimEbook.checkoutImage}
                  alt={`${noClaimEbook.title} preview image`}
                  width={1200}
                  height={1200}
                  className="h-auto w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y bg-muted/35 py-16 md:py-20">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {principles.map((item) => (
              <Card key={item.title} className="bg-background/90">
                <CardContent className="p-6">
                  <item.icon className="mb-5 h-6 w-6 text-primary" />
                  <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {item.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <p className="mb-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Who it is for
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Builders who need AI systems to survive contact with real users.
            </h2>
            <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">
              Written for solo founders, AI engineers, product-minded
              developers, PMs, and operators building extraction, review,
              automation, or agent workflows. It is deliberately practical:
              short chapters, concrete examples, and reusable patterns.
            </p>
          </div>

          <Card className="border bg-card shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="mt-2 text-3xl font-bold">
                {noClaimEbook.indiaPrice} in India
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {noClaimEbook.globalPrice} elsewhere.{" "}
                {noClaimEbook.hasCheckout
                  ? "Includes PDF and EPUB editions."
                  : "Planned PDF and EPUB editions; purchase is not open yet."}
              </p>
              {noClaimEbook.hasCheckout ? (
                <Button asChild className="mt-6 w-full rounded-full">
                  <Link href={noClaimEbook.checkoutUrl}>
                    {noClaimEbook.checkoutLabel}
                  </Link>
                </Button>
              ) : (
                <Button asChild className="mt-6 w-full rounded-full">
                  <Link href={noClaimEbook.sampleUrl}>
                    {noClaimEbook.sampleLabel}
                  </Link>
                </Button>
              )}
              <Button
                asChild
                variant="outline"
                className="mt-3 w-full rounded-full"
              >
                <Link href={noClaimEbook.consultingUrl}>
                  {noClaimEbook.consultingLabel}
                </Link>
              </Button>
              <p className="mt-4 text-xs leading-6 text-muted-foreground">
                {noClaimEbook.hasCheckout
                  ? "Dodo Payments handles payment, applicable tax, receipt, and secure file delivery. Consulting is scoped separately."
                  : "Purchase opens only after the checkout, tax, invoice, and both file-delivery paths have been tested. The sample chapter is available now."}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t pt-4 text-xs">
                <Link href="/delivery-policy" className="text-primary hover:underline">
                  Delivery
                </Link>
                <Link href="/refund-policy" className="text-primary hover:underline">
                  Refunds
                </Link>
                <Link href="/terms" className="text-primary hover:underline">
                  Terms
                </Link>
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y bg-background py-16 md:py-20">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Card className="bg-card shadow-sm">
              <CardContent className="p-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  For consulting
                </p>
                <h3 className="text-2xl font-bold tracking-tight">
                  Need help shaping the same kind of workflow for your team?
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  The enquiry path is for custom work, workshops, or scoped
                  advisory. Use it when you want a human review of your
                  workflow, not just the ebook.
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
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Purchase and delivery
                </p>
                <h3 className="text-xl font-semibold">
                  A standard digital product, separate from custom work.
                </h3>
                <ul className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                  <li>One-time regional price with no recurring subscription.</li>
                  <li>
                    {noClaimEbook.hasCheckout
                      ? "Secure PDF and EPUB access is delivered after successful payment."
                      : "Checkout remains disabled until both final files and delivery entitlements are verified."}
                  </li>
                  <li>
                    Payment, applicable tax, invoice, and refunds are handled through the
                    checkout provider where enabled.
                  </li>
                  <li>Consulting and implementation services require a separate written scope.</li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Link href="/delivery-policy" className="font-medium text-primary hover:underline">
                    Delivery policy
                  </Link>
                  <Link href="/refund-policy" className="font-medium text-primary hover:underline">
                    Refund policy
                  </Link>
                  <Link href="/terms" className="font-medium text-primary hover:underline">
                    Terms
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
