import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
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

export default function NoClaimWithoutEvidencePage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b bg-[#071017] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(35,190,255,0.22),transparent_34%),linear-gradient(120deg,rgba(255,197,94,0.12),transparent_36%)]" />
        <div className="container relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-20 md:px-6 lg:grid-cols-[1fr_420px] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              New ebook for AI builders
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
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href={noClaimEbook.checkoutUrl}>
                  {noClaimEbook.checkoutLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-white/30 bg-white/5 px-8 text-white hover:bg-white/10"
              >
                <Link href="#inside">See what is inside</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
              <span>{noClaimEbook.price}</span>
              <span className="text-white/30">/</span>
              <span>{noClaimEbook.format}</span>
              <span className="text-white/30">/</span>
              <span>Dodo checkout and digital delivery</span>
            </div>
          </div>

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
        </div>
      </section>

      <section id="inside" className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                The thesis
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Clean AI output is not the same thing as a trustworthy system.
              </h2>
              <p className="mt-5 text-muted-foreground leading-8">
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
                  className="flex gap-3 rounded-lg border bg-card p-4 text-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{chapter}</span>
                </div>
              ))}
            </div>
          </div>
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
            <p className="mt-5 max-w-3xl text-muted-foreground leading-8">
              Written for solo founders, AI engineers, product-minded
              developers, PMs, and operators building extraction, review,
              automation, or agent workflows. It is deliberately practical:
              short chapters, concrete examples, and reusable patterns.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Launch offer</p>
            <p className="mt-2 text-3xl font-bold">{noClaimEbook.price}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {noClaimEbook.standardPrice}. Includes PDF and EPUB editions.
            </p>
            <Button asChild className="mt-6 w-full rounded-full">
              <Link href={noClaimEbook.checkoutUrl}>
                {noClaimEbook.checkoutLabel}
              </Link>
            </Button>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              Checkout and file delivery are intended to run through Dodo
              Payments. If the checkout link is not yet live, this button opens
              a direct request email.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
