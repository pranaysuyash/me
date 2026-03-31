import { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Download,
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
import projectsData from "@/content/projects.json";

export const metadata: Metadata = {
  title: "About | Pranay Suyash",
  description:
    "From Big 4 consultant to YC-backed operator. I build AI prototypes and automation systems.",
  openGraph: {
    title: "About | Pranay Suyash",
    description:
      "From Big 4 consultant to YC-backed operator. I build AI prototypes and automation systems.",
    type: "website",
  },
};

export default function AboutPage() {
  const { experience, education, certifications, awards } = projectsData;

  return (
    <PageLayout>
      <section className="py-20 md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div className="animate-fade-up">
              <div className="w-40 h-40 bg-muted rounded-full flex items-center justify-center text-4xl font-bold text-primary mb-6">
                PS
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  asChild
                  className="rounded-full w-full"
                >
                  <Link href="/pranay_resume.html" target="_blank">
                    <Download className="mr-2 h-4 w-4" /> Resume
                  </Link>
                </Button>
                <Button asChild className="rounded-full w-full">
                  <Link href="/contact">
                    <Calendar className="mr-2 h-4 w-4" /> Contact
                  </Link>
                </Button>
              </div>
              <div className="flex gap-3 mt-6">
                <Link
                  href="https://github.com/pranaysuyash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://linkedin.com/in/pranaysuyash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="https://x.com/pranaysuyash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="mailto:pranay.suyash@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                About
              </h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I started out in enterprise consulting, working on SAP
                  implementations and large process-heavy systems. That taught
                  me how organizations actually run, where work gets stuck, and
                  how much time disappears between a plan and something that is
                  genuinely usable.
                </p>
                <p>
                  That changed when I joined MedPiper, a YC-backed healthcare
                  startup, and had to operate much closer to the work itself. I
                  moved from process and delivery into product, platform,
                  workflow design, compliance, and hands-on system building. The
                  work stopped being theoretical very quickly.
                </p>
                <p>
                  At MedPiper, I&apos;ve worked across product, platform, data
                  workflows, and security/compliance, helping build systems that
                  support real healthcare and insurance operations. We scaled to
                  roughly $1M ARR while I was working across those functions,
                  and that experience changed how I think about software: speed
                  matters, but only if what you ship actually survives real
                  users, real constraints, and messy operations.
                </p>
                <p>
                  What I care about now is the gap between a messy workflow and
                  a working system. That is where most teams lose time, money,
                  and momentum. I work best in that gap: understanding the
                  workflow, reducing ambiguity, and turning it into software
                  that is clear, useful, and shippable.
                </p>
                <p>
                  Alongside my work at MedPiper, I&apos;ve also built and
                  shipped independent tools and paid products. That parallel
                  work matters to me because it keeps me honest about execution:
                  turning ideas into something real, useful, and shippable.
                  Based in Bengaluru.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Timeline</h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div
                key={exp.company + exp.role}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-4">Education</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.institution}>
                    <p className="font-medium">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.degree} &middot; {edu.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Certifications</h3>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <p key={cert} className="text-sm text-muted-foreground">
                    {cert}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Awards</h3>
              <div className="space-y-2">
                {awards.map((award) => (
                  <p key={award} className="text-sm text-muted-foreground">
                    {award}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Two ways to work with me
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-full px-8">
              <Link href="/hire-me">
                Hiring me for a role <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full px-8">
              <Link href="/work-with-me">Work with me on a project</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
