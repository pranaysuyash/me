import { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import projectsData from "@/content/projects.json";
import { HeroSystemPanel } from "@/components/hero-system-panel";
import { GradientBadge, NeutralBadge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Pranay Suyash | Document AI, Workflow Automation, Fast Prototypes",
  description:
    "I turn document-heavy workflows into applied AI systems and fast, usable prototypes. 10+ years across product, engineering, and regulated SaaS.",
  openGraph: {
    title: "Pranay Suyash | Document AI, Workflow Automation, Fast Prototypes",
    description:
      "I turn document-heavy workflows into applied AI systems and fast, usable prototypes.",
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
                Document AI &middot; Workflow automation &middot; Fast
                prototypes
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-7">
                I turn document-heavy workflows into{" "}
                <span className="gradient-text">applied AI systems</span> and
                fast, usable prototypes.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                10+ years across product, engineering, and regulated SaaS.
                I&apos;ve worked across document workflows, internal tools, and
                applied AI systems, and I&apos;m strongest where ambiguous
                problems need to become working software.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href="/hire-me">
                    Hire me for a role <ArrowRight className="ml-2 h-4 w-4" />
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
                  <Link href="/work-with-me">Work with me on a pilot</Link>
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
              <span className="font-semibold text-foreground">10+</span> years
            </span>
            <span className="text-border hidden sm:inline">·</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">45K+</span> fields
              extracted
            </span>
            <span className="text-border hidden sm:inline">·</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">
                Paid product
              </span>{" "}
              shipped
            </span>
          </div>
        </div>
      </section>

      {/* ── Choose your path ── */}
      <section className="py-20 md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-sm font-mono text-muted-foreground tracking-widest uppercase mb-10">
            Why are you here?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/hire-me" className="group">
              <Card className="hover-lift border-2 hover:border-primary/40 transition-colors h-full bg-card">
                <CardContent className="p-8">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                    Hiring path
                  </p>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    I&apos;m hiring
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    You&apos;re a hiring manager or recruiter looking for
                    applied AI, product, workflow automation, prototyping, or
                    technical operator roles. See role fit, proof, and resume.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    See role fit <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link href="/work-with-me" className="group">
              <Card className="hover-lift border hover:border-accent/40 transition-colors h-full bg-card">
                <CardContent className="p-8">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                    Project path
                  </p>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                    I need a pilot built
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    You&apos;re a founder or team that needs a focused AI
                    prototype, internal tool, automation workflow, or fast MVP.
                    Send a brief and I&apos;ll tell you if there&apos;s a fit.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    See what I offer <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
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
              All projects <ArrowUpRight className="h-4 w-4" />
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
                Hiring for an applied AI or product role?
              </p>
              <h3 className="text-xl font-bold mb-3">
                See role fit, selected work, and resume.
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Best fit for applied AI product roles, founding engineer roles,
                and technical operator positions where execution and product
                judgment matter.
              </p>
              <Button asChild className="rounded-full px-7">
                <Link href="/hire-me">
                  Hire me for a role <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="md:border-l md:pl-10">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                Need a focused prototype or pilot?
              </p>
              <h3 className="text-xl font-bold mb-3">
                Send a brief. I&apos;ll tell you if there&apos;s a fit.
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                AI prototypes, document extraction workflows, internal tools,
                and automation systems. Scoped in weeks, not months.
              </p>
              <Button variant="outline" asChild className="rounded-full px-7">
                <Link href="/work-with-me">
                  Work with me on a pilot{" "}
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
