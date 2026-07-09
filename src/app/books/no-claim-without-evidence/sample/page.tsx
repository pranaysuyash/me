import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { noClaimEbook } from "@/lib/ebook";

export const metadata: Metadata = {
  title: `${noClaimEbook.title} sample chapter`,
  description:
    "Read a sample from No Claim Without Evidence: how the book turns unsupported AI output into evidence-backed workflow decisions.",
  alternates: {
    canonical: "https://pranaysuyash.com/books/no-claim-without-evidence/sample",
  },
};

const sampleSections = [
  {
    eyebrow: "Opening thesis",
    title: "Clean output is not the same thing as trustworthy output.",
    body: "The sample starts from the book's central line: a schema can pass, a dashboard can glow green, and the workflow can still be wrong if the source never supported the value.",
  },
  {
    eyebrow: "Running example",
    title: "The airline-ticket case study keeps the failure concrete.",
    body: "A terminal that appears in the JSON but not in the source document is the exact kind of unsupported inference the book teaches you to catch before it becomes a product decision.",
  },
  {
    eyebrow: "Method",
    title: "Evidence, review, and release gates appear together.",
    body: "The sample shows how the extraction layer, the evidence record, the review path, and the release rule fit together as one operating system rather than four separate ideas.",
  },
] as const;

const sampleCode = `{
  "field": "terminal",
  "value": null,
  "status": "not_present_in_document",
  "evidence": [],
  "decision": "accept_with_warning"
}`;

export default function SampleChapterPage() {
  return (
    <PageLayout>
      <section className="border-b bg-[#08111a] text-white">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-18 md:px-6 md:py-24 lg:grid-cols-[1fr_420px] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Sample chapter
            </p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Read a real excerpt before you buy the full ebook.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74 md:text-xl">
              This sample is excerpted from the manuscript for{" "}
              {noClaimEbook.title}. It gives you the core idea, the airline
              ticket example, and the evidence habit that the rest of the book
              builds on.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href={noClaimEbook.path}>
                  Back to the book page
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/28 bg-white/5 px-8 text-white hover:bg-white/10"
              >
                <Link href={noClaimEbook.consultingUrl}>
                  Ask about consulting
                </Link>
              </Button>
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
            <div className="mt-4 rounded-[10px] border border-white/12 bg-white/6 p-4 text-sm leading-7 text-white/76 backdrop-blur">
              The book is designed as a practical operating guide, not a theory
              survey. The sample shows the tone, structure, and evidence-first
              method before the full release.
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-background py-16 md:py-20">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Card className="border bg-card shadow-sm">
              <CardContent className="p-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  The sample in one line
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  A small excerpt, enough to show the method without giving away
                  the whole book.
                </h2>
                <p className="mt-5 max-w-2xl text-muted-foreground leading-8">
                  The excerpt focuses on the first principle of the book:
                  whether the AI output can point back to evidence. If it cannot,
                  the system should not pretend otherwise.
                </p>
                <div className="mt-7 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border bg-muted/35 p-4">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold">
                      Evidence first
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      The excerpt shows why unsupported claims must stay visible.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-muted/35 p-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold">Practical</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      It uses the same airline ticket example from the manuscript.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-muted/35 p-4">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold">
                      Product-minded
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      The goal is a workflow decision, not just a model answer.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card shadow-sm">
              <CardContent className="p-7">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Sample content
                </p>
                <div className="space-y-5">
                  {sampleSections.map((section) => (
                    <div key={section.eyebrow} className="rounded-lg border p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {section.eyebrow}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold">
                        {section.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {section.body}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Sample excerpt
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                What the evidence habit looks like in practice.
              </h2>
              <p className="mt-5 max-w-2xl text-muted-foreground leading-8">
                The book&apos;s point is not that AI should never fill a blank. The
                point is that the system should tell you exactly what it knows,
                what it inferred, and what it could not prove from the source.
              </p>
            </div>

            <Card className="border bg-card shadow-sm">
              <CardContent className="p-6">
                <pre className="overflow-x-auto rounded-xl border bg-background p-5 text-sm leading-7 text-foreground">
                  <code>{sampleCode}</code>
                </pre>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  That is a smaller-looking answer, but it is the one a product
                  team can operate. The book teaches how to get from there to a
                  reliable workflow, not just a prettier response.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="rounded-full px-7">
                    <Link href={noClaimEbook.path}>
                      See the full book page
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full px-7"
                  >
                    <Link href={noClaimEbook.consultingUrl}>
                      Ask about consulting
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
