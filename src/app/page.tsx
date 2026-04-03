import { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import projectsData from "@/content/projects.json";
import { HeroSystemPanel } from "@/components/hero-system-panel";
import { GradientBadge, NeutralBadge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Pranay Suyash | Workflow Systems · Practical AI · YC S20",
  description:
    "I turn messy workflows and unstructured inputs into working systems. Most recently at MedPiper (YC S20). Available for scoped builds, pilots, and the right full-time role.",
  openGraph: {
    title: "Pranay Suyash | Workflow Systems · Practical AI · YC S20",
    description:
      "I turn messy workflows and unstructured inputs into working systems. Available for scoped pilots and select full-time roles.",
    type: "website",
  },
};

type Project = (typeof projectsData.projects)[0] & {
  featuredOrder?: number;
  proofRole?: string;
};

export default function Home() {
  // Sort featured projects by featuredOrder for consistent display
  // A/B variant: to test hiring-first, swap CTA order in the hero and closing section below
  const featuredProjects = (projectsData.projects as Project[])
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 lg:items-start">
            <div className="animate-fade-up">
              <p className="text-sm text-muted-foreground mb-5">
                Bengaluru &middot; ex-MedPiper (YC S20) &middot; open for scoped builds and the right role
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-7">
                I turn messy workflows and{" "}
                <span className="gradient-text">unstructured inputs</span> into
                working systems.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                Most recently at MedPiper (YC S20), where I scaled a healthcare
                platform and built workflow systems that reduced insurance
                processing from 4 weeks to 10 days. I work best in the gap
                between a broken workflow and something genuinely usable.
              </p>

              {/*
               * CTA WEIGHTING: pilot-first (primary), hiring secondary.
               * A/B variant: swap order to test hiring-first. Do not delete either path.
               */}
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href="/work-with-me">
                    Start a pilot{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="rounded-full px-8"
                >
                  <Link href="/hire-me">Exploring full-time roles</Link>
                </Button>
                <Link
                  href="/work"
                  className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline transition-colors ml-1"
                >
                  View selected work
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex lg:justify-end">
              <HeroSystemPanel />
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof strip — conservative, specific, defensible ── */}
      <section className="py-10 border-y">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm">
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">MedPiper</span>
              {" "}· YC S20
            </span>
            <span className="text-border hidden sm:inline">&middot;</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">~$1M ARR</span>
              {" "}scaled at MedPiper
            </span>
            <span className="text-border hidden sm:inline">&middot;</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">Paid product</span>
              {" "}· early customer validation
            </span>
            <span className="text-border hidden sm:inline">&middot;</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">14 years</span>
              {" "}across product & engineering
            </span>
          </div>
        </div>
      </section>

      {/* ── Flagship work ── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Flagship work
              </h2>
              <p className="text-muted-foreground max-w-lg">
                Four proof anchors — platform breadth, commercial validation,
                systems depth, and local-first product thinking.
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
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      {project.category === "AI/ML" ||
                      project.category === "Computer Vision" ? (
                        <GradientBadge>{project.category}</GradientBadge>
                      ) : (
                        <NeutralBadge>{project.category}</NeutralBadge>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {project.tagline}
                    </p>
                    {/* What this proves — subtle annotation, not a marketing label */}
                    {project.proofRole && (
                      <p className="text-xs text-primary/60 mt-3 pt-3 border-t border-border/50 leading-relaxed">
                        {project.proofRole}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono bg-primary/5 text-primary px-2 py-0.5 rounded"
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

      {/* ── Intent routing — commercial path LEFT (primary), hiring RIGHT (secondary) ──
       *  A/B variant: swap column order to test hiring-first layout
       */}
      <section className="py-20 md:py-28 border-t">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Primary: scoped work / pilots */}
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                For founders & teams
              </p>
              <h3 className="text-xl font-bold mb-3">
                Need a scoped pilot or workflow build?
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Workflow problems, document extraction, internal tools — scoped
                and built in weeks. Clear brief, clear output, clear handoff.
              </p>
              <Button asChild className="rounded-full px-7">
                <Link href="/work-with-me">
                  Start a pilot <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Secondary: hiring */}
            <div className="md:border-l md:pl-10">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                For employers
              </p>
              <h3 className="text-xl font-bold mb-3">
                Hiring for a product or workflow role?
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Role fit, ownership scope, and proof for product systems,
                workflow automation, and applied AI delivery roles.
              </p>
              <Button variant="outline" asChild className="rounded-full px-7">
                <Link href="/hire-me">
                  See role fit <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
