import { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Scoped project work: workflow builds, AI prototypes, internal tools, and automation. Focused first versions in a few weeks.",
  openGraph: {
    title: "Work With Me | Pranay Suyash",
    description:
      "Scoped builds for workflow problems, AI prototypes, and internal tools. Focused first versions in a few weeks.",
    type: "website",
  },
};

const engagements = [
  {
    id: "prototypes",
    title: "AI workflow prototype",
    body: "A focused first version of an AI product or extraction flow, built around review gates instead of demo-only magic.",
    bestFit:
      "You have an idea for an AI product and need something real to test with users or stakeholders.",
    timeline: "2 to 4 weeks",
    price: "$10K+",
  },
  {
    id: "automation",
    title: "Workflow build sprint",
    body: "A practical internal tool or automation path that turns a manual process into a usable system.",
    bestFit:
      "Manual work, document handling, approval flows, or coordination that is slowing a team down.",
    timeline: "1 to 3 weeks",
    price: "$5K+",
  },
  {
    id: "advisory",
    title: "Workflow audit and advisory",
    body: "A short diagnostic sprint for teams that need sharper scope, architecture, and risk judgment before committing to a build.",
    bestFit:
      "You have operational pain but need a clearer first-build plan before spending real money.",
    timeline: "1 to 2 weeks",
    price: "$3K+",
  },
];

const deliverySteps = [
  {
    title: "Discovery",
    body: "We get clear on the problem, the constraints, the users, and what a useful first version actually needs to do.",
  },
  {
    title: "Scope",
    body: "I turn that into a concrete scope with deliverables, timeline, and clear boundaries. No vague plan.",
  },
  {
    title: "Build",
    body: "I work in short milestones so progress is visible early. The goal is working solutions, not long status cycles.",
  },
  {
    title: "Handoff",
    body: "You get something usable, documented, and understandable, with a short support window to close the loop properly.",
  },
];

const fitSignals = [
  {
    title: "Good fit",
    items: [
      "A workflow is already costing time, money, or trust",
      "There is a real user or operator who can react to a first version",
      "You want a working system and a clear next decision",
    ],
    icon: ClipboardCheck,
  },
  {
    title: "Poor fit",
    items: [
      "The goal is a vague AI demo without a workflow owner",
      "Success depends on a giant rewrite before anything can ship",
      "Nobody can provide examples, edge cases, or operational context",
    ],
    icon: FileSearch,
  },
] as const;

const deliverables = [
  {
    id: "prototypes",
    title: "AI prototype",
    outcome: "A working first version that proves the flow, not just the idea.",
    items: [
      "Usable prototype with the core interaction or AI workflow in place",
      "Technical direction clear enough for the next build decision",
      "Basic documentation and handoff notes",
    ],
    idealFor:
      "Teams that need to validate quickly before investing in a larger build",
  },
  {
    id: "automation",
    title: "Workflow automation or internal tool",
    outcome:
      "A cleaner process with less manual work and a system people can actually use.",
    items: [
      "Working internal tool or automation flow",
      "Integration with the existing process or stack where needed",
      "Basic operational documentation",
    ],
    idealFor:
      "Teams losing time to repetitive work, document handling, or process bottlenecks",
  },
  {
    id: "advisory",
    title: "Workflow audit and advisory",
    outcome:
      "A sharper decision before time and money get committed in the wrong direction.",
    items: [
      "Architecture or implementation review",
      "Trade-off analysis and written recommendation",
      "Feasibility view tied to the actual product or workflow context",
    ],
    idealFor:
      "Teams that need better judgment before choosing architecture, stack, or AI approach",
  },
];

const faqItems = [
  {
    question: "What is the smallest scope you take?",
    answer:
      "Usually something with a clear workflow, a real user need, and a narrow first version that can be built in weeks rather than months.",
  },
  {
    question: "What if the idea is still vague?",
    answer:
      "That is fine as long as there is a real problem underneath it. Part of the early work is turning a vague request into a tighter scope.",
  },
  {
    question: "Do you work with existing teams?",
    answer:
      "Yes. That is often the best setup. I can plug into an existing product, engineering, or operations context and help move a specific build forward.",
  },
  {
    question: "What does a typical week look like?",
    answer:
      "Clear milestone, visible progress, and working output. I prefer short feedback loops over long reporting cycles.",
  },
];

const buyerProof = [
  {
    title: "Insurance processing turnaround",
    detail:
      "Reduced insurance processing from ~4 weeks to ~10 days by replacing manual handoffs with a tighter workflow system.",
    shape:
      "Engagement shape: workflow diagnosis → scoped internal build → iteration with ops feedback",
  },
  {
    title: "Extraction system for variable documents",
    detail:
      "Built a modular extraction system for documents that never come in the same format twice.",
    shape:
      "Engagement shape: narrow first version for core document types, then expand coverage with confidence scoring",
  },
  {
    title: "From idea to paid product",
    detail:
      "Built SignKit from idea to paid product, including extraction, signing workflow, and billing.",
    shape:
      "Engagement shape: focused product slice with clear handoff, not a long open-ended build",
  },
];

export default function WorkWithMePage() {
  return (
    <PageLayout>
      <section className="border-b bg-[#10191a] py-20 text-white md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-sm font-semibold text-teal-100/75 mb-4 tracking-[0.2em] uppercase">
              For founders & teams
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
              Turn a painful workflow into a reviewable first system.
            </h1>
            <p className="text-lg text-white/72 mb-8 leading-relaxed">
              I work best when the business pain is real but the software shape
              is still fuzzy: documents, approvals, extraction, internal tools,
              AI review loops, or process handoffs that need a credible first
              version.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-md px-8">
                <Link href="/contact?type=project">
                  Send a short brief{" "}
                  <span className="text-xs opacity-60 ml-1">(2-min form)</span>{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="rounded-md border-white/30 bg-white/5 px-8 text-white hover:bg-white/10"
              >
                <Link href="/contact?type=call">
                  Book a 15-min call{" "}
                  <span className="text-xs opacity-60 ml-1">
                    (opens scheduler)
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 border-b">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {fitSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <div
                  key={signal.title}
                  className="rounded-md border bg-card p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="text-lg font-semibold">{signal.title}</h2>
                  </div>
                  <ul className="space-y-2">
                    {signal.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Workflow compression ── */}
      <section className="py-16 border-y">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                What changes
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                You know the problem. The question is what the first version
                should actually do. That is where I start.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Before</p>
                    <p className="text-sm text-muted-foreground">
                      Scattered tools, manual steps, unclear ownership, and too
                      much time lost between &ldquo;we should build this&rdquo;
                      and something people can actually use.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="font-medium text-sm">After</p>
                    <p className="text-sm text-muted-foreground">
                      A scoped first version with clear inputs, working logic,
                      usable output, and a realistic path to iteration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8 border">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                How it typically goes
              </p>
              <div className="space-y-3">
                {[
                  { label: "01", step: "Problem", detail: "Scoped build brief" },
                  {
                    label: "02",
                    step: "Build",
                    detail: "Working first version",
                  },
                  {
                    label: "03",
                    step: "Iterate",
                    detail: "Usable system",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 items-start"
                  >
                    <span className="text-primary font-mono text-sm pt-0.5">
                      {item.label}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{item.step}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Best-fit engagements ── */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-3">
              Best-fit engagements
            </h2>
            <p className="text-muted-foreground text-sm">
              These are the kinds of projects where I&apos;m usually most
              useful.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagements.map((engagement) => (
              <Card
                key={engagement.id}
                className="hover-lift border shadow-sm h-full"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-lg font-semibold mb-2">
                    {engagement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                    {engagement.body}
                  </p>
                  <div className="space-y-3 border-t pt-4 mt-auto">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        Best fit
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {engagement.bestFit}
                      </p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Typical timeline
                      </span>
                      <span className="font-medium">{engagement.timeline}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Starting scope
                      </span>
                      <span className="font-medium text-primary">
                        {engagement.price}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            These are starting scopes, not fixed package prices. Final scope
            depends on the workflow, constraints, integrations, and delivery
            expectations.
          </p>
        </div>
      </section>

      {/* ── Delivery flow ── */}
      <section className="py-16">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight mb-10">
            How the work runs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {deliverySteps.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
                {i < deliverySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 border-t border-dashed border-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight mb-10">
            What you get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deliverables.map((item) => (
              <div key={item.id}>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-primary mb-4">{item.outcome}</p>
                <ul className="space-y-2 mb-4">
                  {item.items.map((d) => (
                    <li
                      key={d}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground italic">
                  Ideal for: {item.idealFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Buyer-facing proof ── */}
      <section className="py-16 border-y">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-3">
              What this work looks like
            </h2>
            <p className="text-sm text-muted-foreground">
              Examples of the kind of problems this work addresses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {buyerProof.map((proof) => (
              <Card key={proof.title} className="border shadow-sm h-full">
                <CardContent className="p-6">
                  <h3 className="text-base font-semibold mb-2">
                    {proof.title}
                  </h3>
                  <p className="text-sm text-primary mb-3 leading-relaxed">
                    {proof.detail}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {proof.shape}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ambiguity-friendly entry path ── */}
      <section className="py-16">
        <div className="container max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <Card className="border bg-muted/30">
            <CardContent className="p-7 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
                Not sure where to start?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                If the problem is real but the scope is not clear yet, that is a
                fine starting point. Part of the work is figuring out what the
                first version should actually do.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-6">
                  <Link href="/contact?type=project">
                    Describe the problem{" "}
                    <span className="text-xs opacity-60 ml-1">
                      (2-min form)
                    </span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="rounded-full px-6">
                  <Link href="/contact?type=call">
                    Start with the workflow{" "}
                    <span className="text-xs opacity-60 ml-1">
                      (opens scheduler)
                    </span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16">
        <div className="container max-w-2xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question} className="border-b pb-6">
                <h3 className="text-base font-medium mb-2">{item.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="py-16 border-t">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Have a problem in mind?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Share the problem, the constraints, the timeline, and what
            &ldquo;done&rdquo; needs to look like. If it&apos;s a fit, I&apos;ll
            reply with a concrete next-step plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/contact?type=project">
                Send a short brief{" "}
                <span className="text-xs opacity-60 ml-1">(2-min form)</span>{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="rounded-full px-8"
            >
              <Link href="/contact?type=call">
                Book a 15-min call{" "}
                <span className="text-xs opacity-60 ml-1">
                  (opens scheduler)
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
