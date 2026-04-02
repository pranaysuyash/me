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
  const featuredProjects = projectsData.projects.filter((p) => p.featured);

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 lg:items-start">
            <div className="animate-fade-up">
              <p className="text-sm font-mono text-muted-foreground mb-5 tracking-widest uppercase">
                Workflow systems &middot; Document AI &middot; YC S20
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-7">
                I turn messy workflows and{" "}
                <span className="gradient-text">unstructured inputs</span> into
                working systems.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                14 years shipping products, most recently at MedPiper (YC S20).
                I build operational software where workflows are broken, inputs
                are messy, and teams need something usable fast — including
                reducing insurance processing from 4 weeks to 10 days.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href="/hire-me">
                    Join your team full-time{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="rounded-full px-8"
                  style={{
                    border: "1px solid transparent",
                    background:
                      "linear-gradient(#0d1422,#0d1422) padding-box, linear-gradient(90deg,rgba(59,130,246,0.5),rgba(139,92,246,0.5),rgba(245,158,11,0.4)) border-box",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  <Link href="/work-with-me">
                    Build a pilot together{" "}
                    <span className="text-xs opacity-60 ml-1">
                      (2-min form)
                    </span>
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
              experience
            </span>
            <span className="text-border hidden sm:inline">·</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">45K+</span> fields
              extracted
            </span>
            <span className="text-border hidden sm:inline">·</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">Shipped</span>{" "}
              paid product
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
                Selected work
              </h2>
              <p className="text-muted-foreground max-w-lg">
                A few projects that show how I scope, build, and ship applied AI
                and workflow-heavy systems.
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
                    <p className="text-sm text-muted-foreground mb-1 leading-relaxed font-medium">
                      {project.tagline}
                    </p>
                    {project.result && (
                      <p className="text-xs text-primary/80 mt-2 mb-4 leading-relaxed">
                        ↳ {project.result.split(".")[0]}.
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.techStack.slice(0, 4).map((tech) => (
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

      {/* ── Closing CTA ── */}
      <section className="py-20 md:py-28 border-t">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                For employers
              </p>
              <h3 className="text-xl font-bold mb-3">
                Hiring for a full-time role?
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                See role fit, ownership scope, selected work, and direct contact
                details in one place.
              </p>
              <Button asChild className="rounded-full px-7">
                <Link href="/hire-me">
                  Join your team full-time{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="md:border-l md:pl-10">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                For founders & teams
              </p>
              <h3 className="text-xl font-bold mb-3">
                Need a scoped pilot build?
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                AI prototypes, workflow automation, and internal tools scoped
                for measurable first outcomes.
              </p>
              <Button variant="outline" asChild className="rounded-full px-7">
                <Link href="/work-with-me">
                  Build a pilot together{" "}
                  <span className="text-xs opacity-60 ml-1">(2-min form)</span>
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
