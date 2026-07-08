import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  ClipboardCheck,
  FileSearch,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import projectsData from "@/content/projects.json";
import { HeroSystemPanel } from "@/components/hero-system-panel";
import { noClaimEbook } from "@/lib/ebook";

type Project = (typeof projectsData.projects)[number] & {
  flagshipRank?: number;
  proofRole?: string;
  proofSummary?: string;
};

export const metadata: Metadata = {
  title: "Pranay Suyash | Operator-Builder for Workflow Systems",
  description:
    "I turn messy operational workflows, unstructured documents, and ambiguous product ideas into reviewable software systems.",
  openGraph: {
    title: "Pranay Suyash | Operator-Builder for Workflow Systems",
    description:
      "Portfolio, client work, and hiring proof for workflow-heavy software, AI prototypes, and operational systems.",
    type: "website",
  },
};

const routes = [
  {
    title: "Hire me",
    body: "For teams that need someone who can own ambiguous workflow problems and ship visible progress.",
    href: "/hire-me",
    cta: "See role fit",
    icon: BriefcaseBusiness,
  },
  {
    title: "Scope a pilot",
    body: "For founders and operators with a painful process, messy documents, or an AI workflow that needs a first version.",
    href: "/work-with-me",
    cta: "Start with the problem",
    icon: Workflow,
  },
  {
    title: "Read the book",
    body: "For builders who want the operating discipline behind AI evals, extraction quality, and review gates.",
    href: noClaimEbook.path,
    cta: "Open the book page",
    icon: BookOpen,
  },
] as const;

const operatingLoop = [
  {
    label: "Map reality",
    body: "Find the actual workflow, not the meeting-room version.",
    icon: FileSearch,
  },
  {
    label: "Build review gates",
    body: "Make uncertain output inspectable before it becomes a business decision.",
    icon: ClipboardCheck,
  },
  {
    label: "Ship proof",
    body: "Tie each claim to a working surface, metric, artifact, or handoff.",
    icon: ShieldCheck,
  },
] as const;

const proofPoints = [
  {
    signal: "MedPiper (YC S20)",
    result: "Insurance processing moved from about 4 weeks to about 10 days.",
  },
  {
    signal: "14 years",
    result: "Product, engineering, operations, and founder-level execution.",
  },
  {
    signal: "SignKit",
    result: "An idea became a paid desktop workflow product.",
  },
  {
    signal: "No Claim Until Reviewed",
    result: "Daily AI eval writing turned into a sellable PDF + EPUB.",
  },
] as const;

export default function Home() {
  const featuredProjects = (projectsData.projects as Project[])
    .filter((p) => p.featured)
    .sort((a, b) => (a.flagshipRank ?? 99) - (b.flagshipRank ?? 99));

  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b bg-[#10191a] text-white">
        <div className="ledger-grid absolute inset-0 opacity-55" aria-hidden />
        <div className="container relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-20 md:px-6 md:py-24 lg:grid-cols-[1fr_460px] lg:px-8 lg:py-28">
          <div className="animate-fade-up">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-teal-100/75">
              Pranay Suyash · operator-builder
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              I turn messy workflows into software people can trust.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
              Hiring team, founder, or curious builder: the pattern is the same.
              I take ambiguous operational reality, shape it into a reviewable
              system, and ship something useful enough to change the next
              decision.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-md px-7">
                <Link href="/work-with-me">
                  Scope a pilot <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-md border-white/30 bg-white/5 px-7 text-white hover:bg-white/10"
              >
                <Link href="/hire-me">Hire me</Link>
              </Button>
              <Link
                href="/work"
                className="text-sm font-medium text-white/62 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Browse proof
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

      <section className="py-18 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Choose the right door
            </p>
            <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
              One body of proof, three ways to use it.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <Link key={route.title} href={route.href}>
                  <Card className="hover-lift h-full border bg-card shadow-sm">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-5 flex items-center justify-between">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold">{route.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                        {route.body}
                      </p>
                      <p className="mt-5 text-sm font-medium text-primary">
                        {route.cta}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/45 py-18 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Operating loop
              </p>
              <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
                I am most useful in the messy middle.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                The middle is where specs are incomplete, documents are
                inconsistent, ownership is fuzzy, and the first build needs
                judgment as much as code.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {operatingLoop.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.label}
                    className="rounded-md border bg-background p-5 shadow-sm"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-mono text-xs text-muted-foreground">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold">{step.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Case files
              </p>
              <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
                Selected work with proof attached.
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              All projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {featuredProjects.slice(0, 4).map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`}>
                <Card className="hover-lift h-full border bg-card shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        {project.category}
                      </span>
                      <span className="ml-auto font-mono text-xs text-muted-foreground">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
                      {project.tagline}
                    </p>
                    {(project.proofRole || project.proofSummary) && (
                      <p className="evidence-rule mt-5 text-sm leading-7 text-muted-foreground">
                        <span className="font-semibold text-foreground">
                          Proof:
                        </span>{" "}
                        {project.proofSummary || project.proofRole}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-[#10191a] py-16 text-white">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-7 px-4 md:grid-cols-[1fr_auto] md:px-6 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/75">
              Productized thinking
            </p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {noClaimEbook.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72 md:text-base">
              {noClaimEbook.description} The bundle includes PDF + EPUB and
              turns the daily eval/extraction writing into a durable asset.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Button asChild className="rounded-md px-7">
              <Link href={noClaimEbook.path}>
                View the book <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-md border-white/30 bg-white/5 px-7 text-white hover:bg-white/10"
            >
              <Link
                href={
                  noClaimEbook.hasCheckout
                    ? noClaimEbook.checkoutUrl
                    : noClaimEbook.consultingUrl
                }
              >
                {noClaimEbook.hasCheckout
                  ? noClaimEbook.checkoutLabel
                  : noClaimEbook.consultingLabel}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:px-8">
          <div className="rounded-md border bg-card p-7 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              For founders & operators
            </p>
            <h3 className="text-2xl font-bold tracking-tight">
              Have a workflow that should already be software?
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Start with the pain, the users, the existing tools, and what a
              useful first version needs to prove.
            </p>
            <Button asChild className="mt-6 rounded-md px-7">
              <Link href="/work-with-me">
                Start a pilot <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="rounded-md border bg-card p-7 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              For hiring teams
            </p>
            <h3 className="text-2xl font-bold tracking-tight">
              Need an operator-builder, not another clean-lane specialist?
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              I fit best where product judgment, technical execution, and
              operational reality need to sit in the same person.
            </p>
            <Button variant="outline" asChild className="mt-6 rounded-md px-7">
              <Link href="/hire-me">
                See role fit <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
