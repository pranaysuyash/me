import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { careerProfile, experienceTimeline } from "@/lib/career";

export const metadata: Metadata = {
  title: "About | Pranay Suyash",
  description:
    "The career path, operating principles, and professional context behind Pranay Suyash's product leadership and hands-on system building.",
  alternates: { canonical: "https://pranaysuyash.com/about" },
};

const principles = [
  {
    title: "Start from the operating reality",
    body: "Users, documents, handoffs, constraints, and failure states define the product boundary before a framework or model does.",
  },
  {
    title: "Keep product judgment close to implementation",
    body: "Architecture and interface decisions improve when they are tested against working software rather than separated by long handoff chains.",
  },
  {
    title: "Balance technical quality with usefulness",
    body: "The system should remain maintainable, but it must also survive real users, regulated context, imperfect inputs, and day-to-day operations.",
  },
  {
    title: "Make uncertainty visible",
    body: "AI-assisted products need evidence, review states, fallbacks, and explicit release boundaries instead of confidence theatre.",
  },
] as const;

export default function AboutPage() {
  return (
    <PageLayout>
      <section className="border-b bg-[#0d1718] text-white">
        <div className="container mx-auto grid max-w-[1180px] grid-cols-1 gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[340px_1fr] lg:px-8">
          <aside className="border-y border-white/14 py-7">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-teal-100/20 bg-teal-100/[0.06] text-3xl font-bold tracking-tight text-teal-50">
              PS
            </div>
            <h1 className="mt-6 text-2xl font-bold">Pranay Suyash</h1>
            <p className="mt-2 text-sm leading-6 text-white/62">{careerProfile.title}</p>
            <p className="mt-5 text-sm leading-7 text-white/55">{careerProfile.location}</p>

            <div className="mt-7 flex gap-4">
              <Link href="https://github.com/pranaysuyash" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/55 hover:text-white">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com/in/pranaysuyash" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/55 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="https://x.com/pranaysuyash" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-white/55 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="mailto:pranay.suyash@gmail.com" aria-label="Email" className="text-white/55 hover:text-white">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </aside>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/70">Career narrative</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] sm:text-5xl md:text-6xl">
              From software engineering to enterprise transformation to product leadership.
            </h2>
            <div className="mt-8 max-w-4xl space-y-5 text-base leading-8 text-white/70 md:text-lg">
              <p>
                I began as a software engineer at Wipro, building automation and data layers for telecom workflows. That gave me a technical foundation, but the more important lesson was how often useful software depends on understanding the process around it.
              </p>
              <p>
                At EY, I worked on SAP Sales & Distribution transformations for retail and consumer businesses. Five years of requirements, process studies, blueprinting, testing, rollout, and training made operational ownership as important to me as system design.
              </p>
              <p>
                At MedPiper, a YC-backed healthcare company, product strategy, platform work, operations, compliance, and hands-on building came together. I helped build the platform from the ground up, owned three product lines, worked across a growing cross-functional organisation, and reduced an insurance workflow from roughly four weeks to roughly ten days.
              </p>
              <p>
                I now stay close to execution through independent products in document intelligence, local-first desktop software, audio workflows, evaluation systems, and spatial simulation. The common thread is not a specific model. It is turning ambiguity into a system people can operate and verify.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 md:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How the career connects</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Each chapter added a different kind of ownership.
            </h2>
          </div>
          <div className="space-y-0 border-y">
            {experienceTimeline.map((experience, index) => (
              <div key={experience.company} className="grid gap-5 border-t py-7 first:border-t-0 md:grid-cols-[72px_220px_1fr]">
                <span className="font-mono text-xs text-primary">0{index + 1}</span>
                <div>
                  <p className="font-semibold">{experience.company}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{experience.period}</p>
                </div>
                <div>
                  <p className="font-semibold">{experience.role}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{experience.scope}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Operating principles</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Useful systems need judgment, not just implementation speed.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
              {principles.map((principle) => (
                <div key={principle.title} className="bg-background p-6">
                  <h3 className="font-semibold">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{principle.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-[1180px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link href="/hire-me" className="group border-y py-8 md:px-6">
              <BriefcaseBusiness className="h-5 w-5 text-primary" />
              <h2 className="mt-5 text-2xl font-bold tracking-tight">For hiring teams</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Role fit, leadership scope, experience, and professional evidence.
              </p>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
                Review experience <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
            <Link href="/work-with-me" className="group border-y py-8 md:px-6">
              <ArrowRight className="h-5 w-5 text-primary" />
              <h2 className="mt-5 text-2xl font-bold tracking-tight">For founders and operators</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Engagement paths for document workflows, internal systems, and local-first products.
              </p>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
                Review services <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
          </div>
          <div className="mt-10 text-center">
            <Button asChild>
              <Link href="/contact">Start a conversation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
