import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import projectsData from "@/content/projects.json";

const bestFitLanes = [
  {
    title: "Applied AI prototypes",
    description:
      "Focused AI product and workflow prototypes that move from idea to usable system fast. No hand-wavy demos — working software with a defined scope.",
  },
  {
    title: "Document extraction & structured outputs",
    description:
      "Build and validate extraction flows for reports, PDFs, forms, and document-heavy operations. Production-grade, not one-off scripts.",
  },
  {
    title: "Internal tools & workflow automation",
    description:
      "Small systems that reduce manual work, improve retrieval, and support operational speed. Best where business context and technical execution both matter.",
  },
];

export default function Home() {
  const featuredProjects = projectsData.projects.filter((p) => p.featured);

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="py-24 md:py-36 lg:py-44">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-sm font-mono text-muted-foreground mb-5 tracking-widest uppercase">
              Founder-operator &middot; Applied AI &middot; Workflow Tools
              &middot; Product Systems
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-7">
              I build{" "}
              <span className="gradient-text">AI-powered document systems</span>{" "}
              and ship fast prototypes for teams who can&apos;t afford to move
              slow.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              10+ years across product, engineering, and regulated SaaS.
              Principal Data & Data Security at a YC-backed healthcare SaaS.
              Built a paid product on Gumroad. I work best where ambiguity needs
              to become a working system fast.
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
        </div>
      </section>

      {/* ── Proof strip ── */}
      <section className="py-10 border-y">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm">
            <span className="font-semibold text-foreground tracking-wide">
              Wipro
            </span>
            <span className="text-border hidden sm:inline">·</span>
            <span className="font-semibold text-foreground tracking-wide">
              EY
            </span>
            <span className="text-border hidden sm:inline">·</span>
            <span className="font-semibold text-foreground tracking-wide">
              MedPiper{" "}
              <span className="font-normal text-muted-foreground text-xs">
                (YC S20)
              </span>
            </span>
            <span className="text-border hidden md:inline">|</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">10+</span> years
            </span>
            <span className="text-border hidden sm:inline">·</span>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">64</span> public
              repos
            </span>
            <span className="text-border hidden sm:inline">·</span>
            <span className="text-muted-foreground">paid product shipped</span>
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
                    Primary path
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
                    Secondary path
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

      {/* ── Selected proof ── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Selected proof
              </h2>
              <div className="gradient-line w-16 mb-5" />
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
                      <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                        {project.category}
                      </span>
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

      {/* ── Best fit lanes ── */}
      <section className="py-20 md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Best fit
            </h2>
            <div className="gradient-line w-16 mb-5" />
            <p className="text-muted-foreground max-w-lg">
              Where I consistently add the most value — commercially and
              technically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestFitLanes.map((lane, i) => (
              <div
                key={lane.title}
                className="relative pl-6 border-l-2 border-border hover:border-primary transition-colors"
              >
                <span className="absolute left-3 -translate-x-1/2 top-0 text-xs font-mono text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold mb-2">{lane.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lane.description}
                </p>
              </div>
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
                Best fit for roles in applied AI, product, workflow automation,
                prototyping, or technical operations. Strong where business
                context and execution both matter.
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
                Best for scoped AI prototypes, document/data extraction
                workflows, internal tools, or fast MVPs where you need someone
                who can scope and ship.
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
