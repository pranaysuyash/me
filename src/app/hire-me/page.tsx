import { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Download, CheckCircle2, Calendar } from "lucide-react";
import projectsData from "@/content/projects.json";

export const metadata: Metadata = {
  title: "Hire Me | Pranay Suyash",
  description:
    "Role fit, ownership scope, and proof for product systems, workflow automation, applied AI, and prototype-heavy roles.",
  openGraph: {
    title: "Hire Me | Pranay Suyash",
    description:
      "14 years across product and engineering. Most recently at MedPiper (YC S20) shipping workflow systems with measurable outcomes.",
    type: "website",
  },
};

const strengths = [
  {
    area: "Product + execution",
    detail:
      "I can scope with product context and still ship the core build. Useful when teams need fewer handoffs between planning and delivery.",
  },
  {
    area: "Workflow-heavy systems",
    detail:
      "Strong fit for document-heavy, operations-heavy, and internal tooling problems where the pain is in messy process, not just UI polish.",
  },
  {
    area: "Fast first versions",
    detail:
      "I bias toward usable first versions with visible weekly progress, then iterate from reality instead of long speculative cycles.",
  },
  {
    area: "Regulated context",
    detail:
      "Experience shipping inside healthcare and insurance contexts where compliance and operational reliability matter.",
  },
];

export default function HireMePage() {
  const { experience, education, awards } = projectsData;
  const credibilitySignals = (projectsData.certifications || []).filter((c) =>
    c.toLowerCase().includes("y combinator"),
  );

  return (
    <PageLayout>
      <section className="py-20 md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-sm font-mono text-muted-foreground mb-4 tracking-widest uppercase">
              For hiring managers &amp; recruiters
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Hire <span className="gradient-text">Pranay Suyash</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Best fit for product systems, workflow automation, applied AI, and
              prototype-heavy roles where ambiguous problems need to become
              working software quickly.
            </p>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              14 years across product and engineering. Most recently at MedPiper
              (YC S20), where I shipped workflow-heavy systems, internal tools,
              and applied AI features in a regulated healthcare context.
            </p>

            <div className="flex flex-wrap gap-4 mb-5">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact?type=call">
                  <Calendar className="mr-2 h-4 w-4" /> Book a 15-min call{" "}
                  <span className="text-xs opacity-60 ml-1">
                    (opens scheduler)
                  </span>
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="rounded-full px-8"
              >
                <a
                  href="/pranay_resume.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" /> Download resume{" "}
                  <span className="text-xs opacity-60 ml-1">(PDF)</span>
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <a
                href="mailto:pranay.suyash@gmail.com"
                className="hover:text-primary transition-colors"
              >
                pranay.suyash@gmail.com
              </a>
              <span className="opacity-50">|</span>
              <a
                href="https://linkedin.com/in/pranaysuyash"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                linkedin.com/in/pranaysuyash
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold tracking-tight mb-3">Role fit</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl">
              I am strongest in roles that combine product judgment with
              hands-on execution.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Applied AI workflows",
                "Internal tools & automation",
                "Product systems & platforms",
                "Prototyping and pilot builds",
                "Cross-functional operator roles",
              ].map((role) => (
                <div key={role} className="flex items-center gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {role}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-semibold mb-3">
                Execution context
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                At MedPiper I worked across product, platform, and operations,
                shipping workflow systems tied to real business constraints. A
                representative outcome: reducing insurance processing from ~4
                weeks to ~10 days.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-3">
                Team and collaboration style
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I work closely with product, ops, and engineering. I am
                comfortable with ownership-heavy roles where requirements are
                incomplete, trade-offs are real, and progress needs to stay
                visible week to week.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-base font-semibold mb-3">
              Open to remote &amp; distributed roles
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Open to roles in Bengaluru, across India, and remote/distributed
              teams where clear writing and independent execution matter.
            </p>
          </div>

          <h2 className="text-2xl font-bold tracking-tight mb-8 mt-14">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div
                key={exp.company}
                className="flex flex-col md:flex-row gap-4 md:gap-8"
              >
                <div className="md:w-48 shrink-0">
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                  {exp.tag && (
                    <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded mt-1 inline-block">
                      {exp.tag}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <p className="text-muted-foreground mb-3">
                    {exp.company} &middot; {exp.location}
                  </p>

                  {exp.scope && (
                    <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-muted">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Team: </span>
                          <span className="font-medium">
                            {exp.scope.teamSize}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Ownership:
                          </span>
                          <span className="font-medium">
                            {exp.scope.ownership}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Reporting:
                          </span>
                          <span className="font-medium">
                            {exp.scope.reporting}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Context:{" "}
                          </span>
                          <span className="font-medium">
                            {exp.scope.environment}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <ul className="space-y-1.5">
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6">
                How I operate
              </h2>
              <div className="space-y-4">
                {strengths.map((s) => (
                  <div key={s.area}>
                    <p className="text-sm font-semibold text-foreground">
                      {s.area}
                    </p>
                    <p className="text-sm text-muted-foreground">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Education</h3>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.institution}>
                      <p className="font-medium">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">
                        {edu.degree} &middot; {edu.period} &middot;{" "}
                        {edu.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {credibilitySignals.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Credibility signal
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {credibilitySignals.map((signal) => (
                      <span
                        key={signal}
                        className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-3">Awards</h3>
                <div className="flex flex-wrap gap-2">
                  {awards.map((award) => (
                    <span
                      key={award}
                      className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full"
                    >
                      {award}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight mb-3">
            Selected work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projectsData.projects
              .filter((p) => p.featured)
              .map((project) => (
                <Link key={project.slug} href={`/work/${project.slug}`}>
                  <Card className="hover-lift border shadow-sm h-full">
                    <CardContent className="p-5">
                      <p className="text-xs font-mono text-muted-foreground mb-2">
                        {project.category} &middot; {project.year}
                      </p>
                      <h3 className="font-semibold mb-1">{project.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {project.tagline}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Ready to talk?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Book a 15-minute call and I&apos;ll come prepared with a practical
            point of view on role fit, ownership scope, and immediate execution
            priorities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/contact?type=call">
                <Calendar className="mr-2 h-4 w-4" /> Book a 15-min call{" "}
                <span className="text-xs opacity-60 ml-1">
                  (opens scheduler)
                </span>
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="rounded-full px-8"
            >
              <Link href="/work">
                Browse selected work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 pt-6 border rounded-xl bg-muted/30 p-5">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Fast contact
            </p>
            <div className="flex flex-wrap justify-center gap-4 items-center text-sm text-muted-foreground">
              <a
                href="mailto:pranay.suyash@gmail.com"
                className="hover:text-primary transition-colors"
              >
                pranay.suyash@gmail.com
              </a>
              <span className="opacity-50">|</span>
              <a
                href="https://linkedin.com/in/pranaysuyash"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
