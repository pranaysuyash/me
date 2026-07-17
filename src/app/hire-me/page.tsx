import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  Download,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { SectionIndex } from "@/components/section-index";
import { Button } from "@/components/ui/button";
import { careerProfile, education, experienceTimeline } from "@/lib/career";

export const metadata: Metadata = {
  title: "Experience | Product Leadership and Hands-on System Building",
  description:
    "Role fit, leadership scope, experience, outcomes, and selected evidence for sustained senior product, AI product, and product-systems ownership.",
  alternates: { canonical: "https://pranaysuyash.com/hire-me" },
  openGraph: {
    title: "Experience | Pranay Suyash",
    description:
      "14+ years across software, Big Four transformation, product leadership, and hands-on system building.",
    url: "https://pranaysuyash.com/hire-me",
    type: "website",
  },
};

const experienceSections = [
  { label: "Role fit", href: "#role-fit" as const, description: "Target roles, environments, ownership, and evidence" },
  { label: "Experience", href: "#experience" as const, description: "Wipro, EY, and MedPiper career evidence" },
  { label: "Credentials", href: "#credentials" as const, description: "Education and published operating thesis" },
  { label: "Conversation", href: "#role-conversation" as const, description: "Start a sustained-role conversation" },
] as const;

export default function HireMePage() {
  return (
    <PageLayout>
      <section className="border-b bg-[#0d1718] text-white">
        <div className="container mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100/70">
            For hiring teams · sustained internal ownership
          </p>
          <div className="mt-5 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
            <div>
              <h1 className="max-w-5xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl md:text-6xl">
                Product leader and hands-on builder for AI, workflow, and internal systems.
              </h1>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-white/70">
                I am strongest where product judgment and visible execution sit in the same person:
                ambiguous operational problems, incomplete requirements, multiple stakeholders, and a
                need to turn all of that into working software.
              </p>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-teal-50/58">
                This page is for teams considering an ongoing internal mandate across product direction,
                platform choices, cross-functional execution, and what the organisation learns after launch.
                For a bounded workflow, subsystem, or advisory outcome, <Link href="/work-with-me" className="font-semibold text-teal-100 underline underline-offset-4">review commercial engagements instead</Link>.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-md px-7">
                  <Link href="/contact?type=role&source=experience">
                    Start a role conversation <Calendar className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-md border-white/30 bg-white/5 px-7 text-white hover:bg-white/10"
                >
                  <a href="/pranay-suyash-resume.pdf" download>
                    Download resume PDF <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="px-5 text-white/70 hover:bg-white/8 hover:text-white"
                >
                  <Link href="/work">Selected work</Link>
                </Button>
              </div>
              <p className="mt-4 text-xs leading-5 text-white/45">
                The PDF is generated from a version-controlled career record during every production build.
                A browser-printable version remains available at{" "}
                <a href="/pranay_resume.html" className="underline underline-offset-4 hover:text-white">
                  /pranay_resume.html
                </a>
                .
              </p>
            </div>

            <aside className="border-y border-white/14 py-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-teal-200" />
                <div>
                  <p className="text-sm font-semibold">{careerProfile.location}</p>
                  <p className="mt-2 text-sm leading-6 text-white/58">{careerProfile.availability}</p>
                </div>
              </div>
              <div className="mt-6 border-t border-white/12 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-100/65">Current context</p>
                <p className="mt-3 text-sm leading-6 text-white/72">{careerProfile.currentContext}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b bg-background">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-4 lg:px-8">
          {careerProfile.proofPoints.map((point, index) => (
            <div key={point.value} className={`py-7 sm:px-5 ${index > 0 ? "border-t sm:border-l sm:border-t-0" : ""}`}>
              <p className="text-lg font-bold tracking-tight">{point.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionIndex items={experienceSections} label="Experience sections" />

      <section id="role-fit" className="scroll-mt-24 py-16 md:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Role fit</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Standard role language, specific operating value.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Strongest fit for senior product roles where workflow complexity, AI uncertainty,
                platform decisions, and hands-on execution need to stay connected.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {careerProfile.targetRoles.map((role) => (
                  <span key={role} className="rounded-full border px-3 py-1.5 text-xs text-muted-foreground">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border">
              <div className="hidden grid-cols-[0.8fr_1.2fr_1fr] bg-muted/50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground md:grid">
                <span>Environment</span>
                <span>What I own</span>
                <span>Evidence</span>
              </div>
              {careerProfile.roleFit.map((row) => (
                <div key={row.environment} className="grid gap-4 border-t px-5 py-6 first:border-t-0 md:grid-cols-[0.8fr_1.2fr_1fr]">
                  <p className="font-semibold">{row.environment}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{row.ownership}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{row.evidence}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="scroll-mt-24 border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 md:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Experience</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Software engineering, enterprise transformation, and product leadership.
            </h2>
          </div>

          <div className="space-y-12">
            {experienceTimeline.map((experience, index) => (
              <article key={experience.company} className="grid gap-7 border-t pt-8 md:grid-cols-[220px_1fr]">
                <div>
                  <p className="font-mono text-xs text-primary">0{index + 1}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{experience.period}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{experience.location}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{experience.role}</h3>
                  <p className="mt-1 font-medium text-primary">{experience.company}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{experience.context}</p>
                  <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">{experience.scope}</p>
                  <ul className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                        <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  {index === 0 && (
                    <Link href="/work/medpiper-workflow" className="mt-6 inline-flex items-center text-sm font-semibold text-primary">
                      Review sanitized workflow case <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="credentials" className="scroll-mt-24 py-16 md:py-24">
        <div className="container mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Education</p>
            <div className="mt-6 space-y-6">
              {education.map((item) => (
                <div key={item.institution} className="border-t pt-5">
                  <p className="font-semibold">{item.institution}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.credential} · {item.period}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-7 shadow-sm">
            <div className="flex items-center gap-3 text-primary">
              <BookOpen className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">Published operating thesis</p>
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight">No Claim Without Evidence</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              A 19-chapter field guide to evidence links, eval contracts, review rules,
              action traces, and release gates for AI-assisted workflows.
            </p>
            <Link href="/books/no-claim-without-evidence" className="mt-6 inline-flex items-center text-sm font-semibold text-primary">
              Review the book <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="role-conversation" className="scroll-mt-24 border-y bg-[#0d1718] py-14 text-white">
        <div className="container mx-auto grid max-w-[1180px] grid-cols-1 gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center md:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-teal-100/70">
              <BriefcaseBusiness className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Next conversation</p>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
              Share the role, product problem, and where sustained ownership currently breaks down.
            </h2>
          </div>
          <Button asChild variant="outline" className="border-white/25 bg-white/[0.04] text-white hover:bg-white/[0.09]">
            <Link href="/contact?type=role&source=experience-bottom">
              Start a role conversation <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
