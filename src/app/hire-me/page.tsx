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

const skills = [
  "Python & FastAPI",
  "React / Next.js / TypeScript",
  "AI/ML — Whisper, CLIP, LangChain, OpenAI",
  "Computer Vision — OpenCV, MediaPipe",
  "Data Engineering — Pandas, SQL, ETL",
  "Cloud — AWS, Azure, GCP, Docker",
  "Security — ISO 27001, VAPT, SOC",
  "Product — Agile, GTM, A/B Testing, Roadmapping",
  "SAP SD Certified",
  "macOS — Swift, SwiftUI, AppleScript",
];

export default function HireMePage() {
  const { experience, education, certifications, awards } = projectsData;

  return (
    <PageLayout>
      <section className="py-20 md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-sm font-mono text-muted-foreground mb-4 tracking-wide uppercase">
              For hiring managers &amp; recruiters
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Hire <span className="gradient-text">Pranay Suyash</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Applied AI builder with 10+ years across product, engineering, and
              data. I ship working software, not slide decks. Currently leading
              data &amp; data security at a YC-backed healthcare SaaS.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact">
                  <Calendar className="mr-2 h-4 w-4" /> Book a 15-min Call
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="rounded-full px-8"
              >
                <Link
                  href="/PRANAY_SUYASH.pdf"
                  target="_blank"
                >
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight mb-8">
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
                Skills &amp; Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full bg-primary/5 text-primary px-3 py-1.5 text-sm font-medium"
                  >
                    {skill}
                  </span>
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
          <h2 className="text-2xl font-bold tracking-tight mb-8">
            Proof of Work
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
            Interested? Let&apos;s talk.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Book a 15-minute call to discuss how I can contribute to your team.
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/contact">
              <Calendar className="mr-2 h-4 w-4" /> Book a Call{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
