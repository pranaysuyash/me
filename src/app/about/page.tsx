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
                  <Link href="/PRANAY_SUYASH.pdf" target="_blank">
                    <Download className="mr-2 h-4 w-4" /> Resume
                  </Link>
                </Button>
                <Button asChild className="rounded-full w-full">
                  <Link href="/contact">
                    <Calendar className="mr-2 h-4 w-4" /> Book a Call
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
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
                Pranay Suyash
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Applied AI Builder &middot; Product Engineer &middot; Bengaluru,
                India
              </p>
              <div className="gradient-line w-16 mb-8" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I build AI-powered products and ship revenue-generating SaaS
                  tools. 10+ years across product, engineering, and data — from
                  enterprise consulting at EY to leading data &amp; data security
                  at a YC-backed healthcare startup.
                </p>
                <p>
                  My work sits at the intersection of applied AI, product
                  engineering, and data security. I&apos;ve built document
                  extraction engines handling 45K+ field types, macOS apps for
                  audio transcription, AI photo search workstations, and a paid
                  product on Gumroad. I ship.
                </p>
                <p>
                  Before MedPiper, I spent 5 years at EY India as a Senior
                  Business Consultant working with Fortune 500 clients on SAP
                  implementations and business process optimization. Before
                  that, software engineering at Wipro. PGDM from FORE School of
                  Management, B.Tech in Computer Science from Amity.
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
            Want to work together?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-full px-8">
              <Link href="/hire-me">
                Hire Me <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full px-8">
              <Link href="/work-with-me">Work With Me</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
