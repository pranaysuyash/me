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
  title: "About Pranay Suyash — Applied AI Builder, YC-Backed Operator",
  description:
    "10+ years from Big 4 consulting to YC-backed operator. Built MedPiper's data platform and security posture from zero to $1M ARR. Now building AI prototypes and automation systems independently.",
  openGraph: {
    title: "About Pranay Suyash",
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
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                About
              </h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I spent the first part of my career at Big 4 consulting doing
                  SAP implementations — good at understanding enterprise
                  processes, bad at building things that shipped. That changed
                  when I joined a YC-backed healthcare startup and had to build
                  from zero.
                </p>
                <p>
                  At MedPiper, I went from consultant to operator. I built the
                  data platform, led security compliance (ISO 27001, SOC 2),
                  shipped features across four product lines, and learned what
                  it actually means to move fast when there&apos;s real money
                  and real users on the line. We scaled to ~$1M ARR before I
                  left to focus on independent work.
                </p>
                <p>
                  What I took from that experience: the gap between &quot;this
                  is how we should build it&quot; and &quot;this is actually
                  built&quot; is where most time and money gets lost. I work in
                  that gap — scoping fast, building weekly, and delivering
                  working software.
                </p>
                <p>
                  I&apos;ve also shipped a paid product on Gumroad (Signature
                  Extractor Pro) because I wanted to prove I could take an idea
                  from concept to revenue without a company behind it. Based in
                  Bengaluru.
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
