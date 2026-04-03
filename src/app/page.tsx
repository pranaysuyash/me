import { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import projectsData from "@/content/projects.json";
import { HeroSystemPanel } from "@/components/hero-system-panel";

type Project = (typeof projectsData.projects)[number] & {
  flagshipRank?: number;
  proofRole?: string;
  proofSummary?: string;
};

export const metadata: Metadata = {
  title: "Pranay Suyash | Workflow Systems · Document AI · YC S20",
  description:
    "I turn messy workflows and unstructured inputs into working systems. 14 years building products, most recently at MedPiper (YC S20), including reducing insurance processing from 4 weeks to 10 days.",
  openGraph: {
    title: "Pranay Suyash | Workflow Systems · Document AI · YC S20",
    description:
      "I turn messy workflows and unstructured inputs into working systems. 14 years building products with measurable outcomes.",
    type: "website",
  },
};

export default function Home() {
  const featuredProjects = (projectsData.projects as Project[])
    .filter((p) => p.featured)
    .sort((a, b) => (a.flagshipRank ?? 99) - (b.flagshipRank ?? 99));

  const homeVariant = "pilot-first" as const;
  const ctaVariants = {
    "pilot-first": {
      primary: { label: "Start a pilot", href: "/work-with-me" },
      secondary: {
        label: "Hiring me for delivery roles",
        href: "/hire-me",
      },
    },
    "hiring-first": {
      primary: { label: "Explore role fit", href: "/hire-me" },
      secondary: { label: "Discuss a scoped build", href: "/work-with-me" },
    },
  };
  const ctaConfig = ctaVariants[homeVariant];

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 lg:items-start">
            <div className="animate-fade-up">
              <p className="text-sm text-muted-foreground mb-5 tracking-wide uppercase">
                Pranay Suyash &middot; Product / Workflow / Practical AI Systems
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-7">
                I turn messy workflows and{" "}
                <span className="gradient-text">unstructured inputs</span> into
                usable systems.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                I work at the intersection of product delivery, workflow design,
                and AI-enabled execution — especially where operations are messy,
                documents are unstructured, and teams need practical outcomes
                fast.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href={ctaConfig.primary.href}>
                    {ctaConfig.primary.label}{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="rounded-full px-8">
                  <Link href={ctaConfig.secondary.href}>
                    {ctaConfig.secondary.label}
                  </Link>
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

      {/* ── Proof strip ── */}
      <section className="py-10 border-y">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm">
            <span className="font-semibold text-foreground tracking-wide">
              MedPiper (YC S20)
            </span>
            <span className="text-border hidden sm:inline">·</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">14</span> years
              product + workflow delivery
            </span>
            <span className="text-border hidden sm:inline">·</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">Paid product</span>{" "}
              with early customer validation
            </span>
            <span className="text-border hidden sm:inline">·</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">Large modular</span>{" "}
              extraction system
            </span>
            <span className="text-border hidden sm:inline">·</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">~$1M ARR</span>{" "}
              platform growth context
            </span>
          </div>
        </div>
      </section>

      {/* ── Selected work ── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Flagship work
              </h2>
              <p className="text-muted-foreground max-w-lg">
                Curated proof of product delivery, commercial execution, systems
                depth, and local-first multimodal workflow design.
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
                        <span className="font-medium text-foreground">What this proves:</span>{" "}
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

      {/* ── Closing CTA ── */}
      <section className="py-20 md:py-28 border-t">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                For founders & teams
              </p>
              <h3 className="text-xl font-bold mb-3">
                Need a scoped pilot or workflow build?
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Start with a practical scope: pilot, workflow audit, or focused
                build tied to a real operational problem.
              </p>
              <Button asChild className="rounded-full px-7">
                <Link href="/work-with-me">
                  Start a pilot{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="md:border-l md:pl-10">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                For hiring teams
              </p>
              <h3 className="text-xl font-bold mb-3">
                Hiring for product/workflow/AI delivery roles?
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Explore role fit for operator-builder execution in
                product-heavy, workflow-heavy teams.
              </p>
              <Button variant="outline" asChild className="rounded-full px-7">
                <Link href="/hire-me">
                  Hiring me for delivery roles
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
