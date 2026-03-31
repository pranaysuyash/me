import { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import projectsData from "@/content/projects.json";

export const metadata: Metadata = {
  title: "Work With Me | Pranay Suyash",
  description:
    "Scoped project work: AI prototypes, document extraction workflows, internal tools, and automation systems — delivered in 2–4 weeks.",
  openGraph: {
    title: "Work With Me | Pranay Suyash",
    description:
      "Scoped builds for document extraction, workflow automation, and applied AI prototypes.",
    type: "website",
  },
};

const engagements = [
  {
    id: "prototypes",
    title: "AI prototype",
    body: "A focused first version of an applied AI product, built to validate the workflow, the interaction, and the technical approach without overbuilding.",
    bestFit:
      "A product idea needs to become something real that a team or early users can interact with.",
    timeline: "2 to 4 weeks",
    price: "$10K+",
  },
  {
    id: "automation",
    title: "Workflow automation or internal tool",
    body: "A practical system that reduces repetitive work, cleans up a messy process, or gives a team a tool they can actually use day to day.",
    bestFit:
      "Manual work, document-heavy operations, data movement, approval flows, or internal coordination that is slowing a team down.",
    timeline: "1 to 3 weeks",
    price: "$5K+",
  },
  {
    id: "advisory",
    title: "Technical advisory",
    body: "A short, senior-level working engagement for teams that need help deciding what to build, how to scope it, or which technical direction is actually realistic.",
    bestFit:
      "A team is making a high-stakes product, architecture, or AI implementation decision and wants sharper technical judgment before committing.",
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
    body: "I work in short milestones so progress is visible early. The goal is working software, not long status cycles.",
  },
  {
    title: "Handoff",
    body: "You get something usable, documented, and understandable, with a short support window to close the loop properly.",
  },
];

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
    title: "Technical advisory",
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

export default function WorkWithMePage() {
  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="py-20 md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-sm font-mono text-muted-foreground mb-4 tracking-wide uppercase">
              For founders & teams
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Build a scoped <span className="gradient-text">pilot</span> in
              weeks
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              I work on focused builds where a workflow needs to become a usable
              system quickly: document extraction, internal tools, workflow
              automation, and applied AI prototypes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact">
                  Send a short brief <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                size="lg"
                className="rounded-full px-8"
              >
                <Link href="/work">Browse selected work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workflow compression ── */}
      <section className="py-16 border-y">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                From operational drag to a working system
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The best fit is a real workflow problem, a narrow first version,
                and a team that wants something useful quickly.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Before</p>
                    <p className="text-sm text-muted-foreground">
                      Scattered tools, manual steps, unclear ownership, and too
                      much time lost between "we should build this" and
                      something people can actually use.
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
                  "Problem → scoped build brief",
                  "Build → working first version",
                  "Iteration → usable system",
                ].map((step) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="text-primary font-mono text-sm w-6">
                      {step.split(" ")[0]}
                    </span>
                    <span className="text-sm">{step}</span>
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
            Send a brief. I&apos;ll tell you if there&apos;s a fit.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Share the problem, the constraints, the timeline, and what "done"
            needs to look like. If it&apos;s a fit, I&apos;ll reply with a
            concrete next-step plan.
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/contact">
              Send a short brief <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
