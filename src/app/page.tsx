import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  FileCheck2,
  Map,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { SectionIndex } from "@/components/section-index";
import { Button } from "@/components/ui/button";
import { careerProfile, medpiperCaseStudy } from "@/lib/career";
import { auditedProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Pranay Suyash | Product Leader and Hands-on Systems Builder",
  description:
    "Product leadership and hands-on system building across AI, operational workflows, internal tools, local-first products, and spatial simulation.",
  alternates: { canonical: "https://pranaysuyash.com" },
  openGraph: {
    title: "Pranay Suyash | Product Leader and Hands-on Systems Builder",
    description:
      "From ambiguous operational problem to working, reviewable product system.",
    type: "website",
    url: "https://pranaysuyash.com",
  },
};

const featuredProducts = auditedProjects.filter((project) =>
  ["sig-ext-fastapi", "metaextract", "sentineltwin"].includes(project.slug),
);

const homeSections = [
  { label: "Professional case", href: "#professional-case" as const },
  { label: "Product systems", href: "#product-systems" as const },
  { label: "Systems lab", href: "#systems-lab" as const },
  { label: "Ways to work", href: "#ways-to-work" as const },
  { label: "Book", href: "#book" as const },
  { label: "Contact", href: "#contact" as const },
] as const;

export default function Home() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b bg-[#0d1718] text-white">
        <div className="ledger-grid absolute inset-0 opacity-45" aria-hidden />
        <div className="container relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100/75">
              {careerProfile.title}
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-[1.03] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl">
              {careerProfile.headline}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {careerProfile.summary}
            </p>
            <p className="mt-4 text-sm leading-7 text-teal-50/62">
              {careerProfile.currentContext} · {careerProfile.location}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-md px-7">
                <Link href="/hire-me">
                  For hiring teams <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-md border-white/30 bg-white/5 px-7 text-white hover:bg-white/10"
              >
                <Link href="/work-with-me">Commercial engagements</Link>
              </Button>
              <Link
                href="/work"
                className="inline-flex items-center px-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
              >
                Selected work <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="border-y border-white/12 py-6 lg:border-l lg:border-y-0 lg:py-0 lg:pl-8" aria-label="Professional profile summary">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-100/65">
              Best-fit roles
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {careerProfile.targetRoles.slice(0, 4).map((role) => (
                <li key={role} className="flex items-start gap-3 text-sm leading-6 text-white/78">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                  {role}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/12 pt-5 text-sm leading-7 text-white/62">
              Product strategy, workflow design, architecture, interface decisions, implementation, and cross-functional delivery stay connected.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-b bg-background">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-2 px-4 md:grid-cols-4 md:px-6 lg:px-8">
          {careerProfile.proofPoints.map((point, index) => (
            <div
              key={point.value}
              className={`py-5 ${index % 2 ? "border-l pl-4" : "pr-4"} ${index > 1 ? "border-t md:border-t-0" : ""} md:border-l md:px-5 md:py-7 md:first:border-l-0`}
            >
              <p className="text-lg font-bold tracking-tight text-foreground md:text-xl">{point.value}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionIndex items={homeSections} label="Homepage sections" />

      <section id="professional-case" className="scroll-mt-24 py-14 md:py-20">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Professional case study</p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] md:text-5xl">{medpiperCaseStudy.title}</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">{medpiperCaseStudy.problem}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild variant="outline" className="rounded-md">
                  <Link href="/work/medpiper-workflow">
                    Review full case <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Link href="/proof" className="inline-flex items-center px-2 text-sm font-semibold text-primary">
                  Proof ledger <FileCheck2 className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-stretch overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="p-5 md:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Before</p>
                  <ul className="mt-4 space-y-3">
                    {medpiperCaseStudy.before.map((item) => (
                      <li key={item} className="text-sm leading-6 text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center border-x px-2 text-primary md:px-3">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div className="bg-primary/[0.045] p-5 md:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">After</p>
                  <ul className="mt-4 space-y-3">
                    {medpiperCaseStudy.after.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-6 text-foreground/82">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
                {medpiperCaseStudy.outcomes.map((outcome) => (
                  <div key={outcome} className="bg-background p-4 text-sm leading-7 text-muted-foreground">{outcome}</div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-6 text-muted-foreground">{medpiperCaseStudy.disclosure}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="product-systems" className="scroll-mt-24 border-y bg-muted/30 py-14 md:py-20">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-9 grid grid-cols-1 gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Independent product systems</p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] md:text-5xl">Commercial proof, applied AI, and frontier systems.</h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground lg:justify-self-end md:text-base md:leading-8">
              Maturity is explicit. Workflow maps are labelled as diagrams, and each case links to pinned source, tests, runbooks, or architecture records.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {featuredProducts.map((project) => {
              const visual = project.visualEvidence[0];
              return (
                <article key={project.slug} className="group overflow-hidden rounded-xl border bg-background shadow-sm">
                  <figure className="bg-[#0d1718]">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={visual.src}
                        alt={visual.alt}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className={visual.kind === "product-screenshot" ? "object-cover object-top" : "object-contain p-2"}
                      />
                      <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.13em] text-white/72 backdrop-blur-sm">
                        {visual.kind === "product-screenshot" ? "Product screenshot" : "Workflow map"}
                      </span>
                    </div>
                    <figcaption className="border-t border-white/10 px-4 py-2.5 text-[11px] leading-5 text-white/50">{visual.caption}</figcaption>
                  </figure>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-semibold uppercase tracking-[0.13em] text-primary">{project.category}</span>
                      <span className="rounded-full border px-2.5 py-1 text-[11px] text-muted-foreground">{project.maturity}</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold tracking-tight">{project.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.summary}</p>
                    <p className="mt-4 text-xs text-muted-foreground">{project.implementationEvidence.length} inspectable implementation records</p>
                    <Link href={`/work/${project.slug}`} className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
                      Inspect the case <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link href="/work" className="inline-flex items-center text-sm font-semibold text-primary">
              Review all selected work <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="systems-lab" className="scroll-mt-24 bg-[#0d1718] py-12 text-white md:py-16">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-7 px-4 md:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/70">Systems playground</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight md:text-4xl">Inspect simplified product loops without making the 3D scene the proof.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65 md:text-base">The lab is progressive enhancement. Each scene routes back to an audited HTML case study.</p>
          </div>
          <Button asChild variant="outline" className="border-white/25 bg-white/[0.04] text-white hover:bg-white/[0.09]">
            <Link href="/systems">Launch systems lab <Map className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <section id="ways-to-work" className="scroll-mt-24 py-14 md:py-20">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 border-y md:grid-cols-2">
            {careerProfile.audiencePaths.map((path, index) => (
              <Link key={path.label} href={path.href} className={`group py-7 md:p-8 ${index ? "border-t md:border-l md:border-t-0" : ""}`}>
                <div className="flex items-center gap-3 text-primary">
                  {index === 0 ? <BriefcaseBusiness className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">{path.label}</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold tracking-tight">{path.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{path.body}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                  {path.action} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="scroll-mt-24 border-y bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center md:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-primary">
              <BookOpen className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Published operating thesis</p>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">No Claim Without Evidence</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">A 19-chapter field guide to evidence links, eval contracts, review rules, action traces, and release gates for AI-assisted workflows.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/books/no-claim-without-evidence">Review the book <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 py-14 md:py-20">
        <div className="container mx-auto max-w-[920px] px-4 text-center md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Start with the real workflow</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">Tell me who does the work, where it breaks, and what a better system would change.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">A workflow, representative file, screen recording, or existing tool list is more useful than a polished feature specification.</p>
          <Button asChild size="lg" className="mt-7 rounded-md px-8">
            <Link href="/contact?type=project&source=home-bottom">Send the problem <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
