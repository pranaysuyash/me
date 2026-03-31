import { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Download,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import projectsData from "@/content/projects.json";

export const metadata: Metadata = {
  title: "Hire Me | Pranay Suyash",
  description:
    "Best fit for applied AI, workflow systems, product/platform work, and prototyping roles where ambiguous problems need to become clear, working software.",
  openGraph: {
    title: "Hire Me | Pranay Suyash",
    description:
      "Applied AI, workflow systems, and product execution. 10+ years across product, engineering, and regulated SaaS.",
    type: "website",
  },
};

const skillsNarrative = [
  {
    area: "AI/ML engineering",
    detail:
      "Whisper, CLIP, LangChain, OpenAI — for transcription, semantic search, and LLM pipelines",
  },
  {
    area: "Document extraction",
    detail:
      "FastAPI, Tesseract OCR, PostgreSQL — production pipelines handling thousands of documents",
  },
  {
    area: "macOS native",
    detail:
      "Swift, SwiftUI, AVFoundation — menu bar apps, audio capture, system automation",
  },
  {
    area: "Cloud & DevOps",
    detail:
      "AWS, Docker — containerized deployments, CI/CD, production infrastructure",
  },
];

export default function HireMePage() {
  const { experience, education, certifications, awards } = projectsData;

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
              Best fit for applied AI, workflow systems, product/platform work,
              and prototyping roles where ambiguous problems need to become
              clear, working software.
            </p>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              10+ years across product, engineering, and regulated SaaS.
              I&apos;ve worked across document workflows, internal tools, and
              applied AI systems. I&apos;m strongest where ambiguous problems
              need to become working software.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact">
                  <Calendar className="mr-2 h-4 w-4" /> Book a 15-min call
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="rounded-full px-8"
              >
                <Link href="/pranay_resume.html" target="_blank">
                  <Download className="mr-2 h-4 w-4" /> Download resume
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold tracking-tight mb-3">Role fit</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl">
              I am strongest in roles that combine commercial judgment with
              technical execution.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Applied AI / AI Product",
                "Workflow Automation",
                "Document Intelligence",
                "Internal Tools Engineering",
                "Technical Product Manager",
                "Founding Engineer / Staff",
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
                Why I&apos;m a strong hire now
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I&apos;m strongest in roles where product judgment, workflow
                understanding, and hands-on execution all matter. My background
                spans enterprise process work, startup operating reality,
                platform thinking, compliance-heavy environments, and
                independent product shipping. That mix is useful when a team
                needs someone who can reduce ambiguity, make practical
                trade-offs, and turn a messy workflow into a working system.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-3">
                How I work inside teams
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I work well across product, engineering, operations, and
                leadership, especially in environments where the real work sits
                between functions rather than neatly inside one role. I&apos;m
                comfortable with process-heavy and regulated contexts, but I
                care about keeping execution concrete and moving. My bias is
                toward clarity, weekly progress, and software that holds up
                under real usage.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-base font-semibold mb-3">
              Open to remote &amp; distributed roles
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Open to roles in Bengaluru, across India, and remote or
              distributed teams where strong written communication and
              independent execution matter.
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
                How I work
              </h2>
              <div className="space-y-4">
                {skillsNarrative.map((s) => (
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

              <div>
                <h3 className="text-lg font-semibold mb-3">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <span
                      key={cert}
                      className="text-sm bg-accent/10 text-accent px-3 py-1 rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

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
            point of view on your role, team context, and immediate execution
            needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/contact">
                <Calendar className="mr-2 h-4 w-4" /> Book a 15-min call
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
        </div>
      </section>
    </PageLayout>
  );
}
