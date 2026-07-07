import { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import projectsData from "@/content/projects.json";
import { HeroSystemPanel } from "@/components/hero-system-panel";
import { noClaimEbook } from "@/lib/ebook";

type Project = (typeof projectsData.projects)[number] & {
  flagshipRank?: number;
  proofRole?: string;
  proofSummary?: string;
};

export const metadata: Metadata = {
  title: "Pranay Suyash | Product & Workflow Systems",
  description:
    "I turn messy workflows and unstructured inputs into working systems. 14 years building products, most recently at MedPiper (YC S20).",
  openGraph: {
    title: "Pranay Suyash | Product & Workflow Systems",
    description:
      "I turn messy workflows and unstructured inputs into working systems. 14 years building products at MedPiper (YC S20).",
    type: "website",
  },
};

export default function Home() {
  const featuredProjects = (projectsData.projects as Project[])
    .filter((p) => p.featured)
    .sort((a, b) => (a.flagshipRank ?? 99) - (b.flagshipRank ?? 99));

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 lg:items-start">
            <div className="animate-fade-up">
              <p className="text-sm text-muted-foreground mb-5 tracking-wide uppercase">
                Pranay Suyash
              </p>
              <h1
                aria-label="I take messy workflows and turn them into software that actually works."
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-7"
              >
                I take messy workflows and{" "}
                <span className="gradient-text">turn them into software</span>{" "}
                that actually works.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                Operations stuck, documents everywhere, no clear spec. I come
                in, figure out what is actually happening, and build a focused
                first version. Usually in a few weeks.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href="/work-with-me">
                    Start a pilot <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="rounded-full px-8"
                >
                  <Link href="/hire-me">See role fit</Link>
                </Button>
                <Link
                  href="/work"
                  className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline transition-colors ml-1"
                >
                  Browse selected work
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex lg:justify-end">
              <HeroSystemPanel />
            </div>
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="py-10 border-y">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm">
            <span className="font-semibold text-foreground tracking-wide">
              MedPiper (YC S20)
            </span>
            <span className="text-border hidden sm:inline">&middot;</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">14</span> years
              shipping products and untangling workflows
            </span>
            <span className="text-border hidden sm:inline">&middot;</span>
            <span className="text-muted-foreground">
              Insurance processing:{" "}
              <span className="font-semibold text-foreground">
                ~4 weeks to ~10 days
              </span>
            </span>
            <span className="text-border hidden sm:inline">&middot;</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">SignKit</span>{" "}
              went from idea to paid product
            </span>
          </div>
        </div>
      </section>

      {/* Ebook launch */}
      <section className="border-b bg-[#071017] py-14 text-white">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-7 px-4 md:grid-cols-[1fr_auto] md:px-6 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              New ebook
            </p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {noClaimEbook.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72 md:text-base">
              {noClaimEbook.description} Includes PDF + EPUB, with Dodo checkout
              ready for launch.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Button asChild className="rounded-full px-7">
              <Link href={noClaimEbook.path}>
                View the book <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/30 bg-white/5 px-7 text-white hover:bg-white/10"
            >
              <Link href={noClaimEbook.checkoutUrl}>
                {noClaimEbook.checkoutLabel}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Selected work
              </h2>
              <p className="text-muted-foreground max-w-lg">
                Four projects worth looking at. Each one solved a different kind
                of messy operational problem.
              </p>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors shrink-0"
            >
              All projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.slice(0, 4).map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`}>
                <Card className="hover-lift border shadow-sm bg-card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        {project.category}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed font-medium">
                      {project.tagline}
                    </p>
                    {(project.proofRole || project.proofSummary) && (
                      <p className="proof-angle mb-4 leading-relaxed">
                        <span className="font-medium text-foreground">
                          Why it matters:{" "}
                        </span>
                        {project.proofSummary || project.proofRole}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 md:py-28 border-t">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                For founders & teams
              </p>
              <h3 className="text-xl font-bold mb-3">
                Stuck on a workflow that should already work?
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Start with the problem. Pilot, workflow audit, or focused build.
                Tied to a real operational pain, not a wish list.
              </p>
              <Button asChild className="rounded-full px-7">
                <Link href="/work-with-me">
                  Start a pilot <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="md:border-l md:pl-10">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                For hiring teams
              </p>
              <h3 className="text-xl font-bold mb-3">
                Need someone who ships, not just plans?
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Not a pure engineer, not a product manager, not a consultant.
                Someone who takes ambiguous operational problems and ships
                working software.
              </p>
              <Button variant="outline" asChild className="rounded-full px-7">
                <Link href="/hire-me">
                  See role fit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
