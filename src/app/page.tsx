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

export default function Home() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b bg-[#0d1718] text-white">
        <div className="ledger-grid absolute inset-0 opacity-45" aria-hidden />
        <div className="container relative mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 py-16 md:px-6 md:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center lg:px-8 lg:py-24">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100/75">
              {careerProfile.title}
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-[1.03] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl">
              {careerProfile.headline}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {careerProfile.summary}
            </p>
            <p className="mt-4 text-sm leading-7 text-teal-50/62">
              {careerProfile.currentContext} · {careerProfile.location}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
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
                <Link href="/contact?type=project&source=home">Discuss a project</Link>
              </Button>
              <Link
                href="/work"
                className="inline-flex items-center px-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
              >
                Selected work <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="border-l border-white/12 pl-0 lg:pl-8" aria-label="Professional profile summary">
            <div className="border-y border-white/12 py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-100/65">
                Best-fit roles
              </p>
              <ul className="mt-5 space-y-3">
                {careerProfile.targetRoles.slice(0, 4).map((role) => (
                  <li key={role} className="flex items-start gap-3 text-sm leading-6 text-white/78">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                    {role}
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-100/65">
                Operating range
              </p>
              <p className="mt-4 text-sm leading-7 text-white/68">
                Product strategy, workflow design, architecture, interface decisions,
                hands-on implementation, and cross-functional delivery stay connected.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b bg-background">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-4 lg:px-8">
          {careerProfile.proofPoints.map((point, index) => (
            <div
              key={point.value}
              className={`py-7 sm:px-5 ${index > 0 ? "border-t sm:border-l sm:border-t-0" : ""}`}
            >
              <p className="text-xl font-bold tracking-tight text-foreground">{point.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Professional case study
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] md:text-5xl">
                {medpiperCaseStudy.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                {medpiperCaseStudy.problem}
              </p>
              <Button asChild variant="outline" className="mt-7 rounded-md">
                <Link href="/work/medpiper-workflow">
                  Review the full case <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-[1fr_auto_1fr] items-stretch overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Before
                  </p>
                  <ul className="mt-5 space-y-3">
                    {medpiperCaseStudy.before.map((item) => (
                      <li key={item} className="text-sm leading-6 text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center border-x px-3 text-primary">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div className="bg-primary/[0.045] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    After
                  </p>
                  <ul className="mt-5 space-y-3">
                    {medpiperCaseStudy.after.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-6 text-foreground/82">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
                {medpiperCaseStudy.outcomes.map((outcome) => (
                  <div key={outcome} className="bg-background p-5 text-sm leading-7 text-muted-foreground">
                    {outcome}
                  </div>
                ))}
              </div>
              <p className="text-xs leading-6 text-muted-foreground">
                {medpiperCaseStudy.disclosure}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-12 grid grid-cols-1 gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Independent product systems
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] md:text-5xl">
                Commercial proof, applied AI, and frontier system design.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground lg:justify-self-end">
              Each project is labelled by its current maturity. Shipped capabilities,
              active product work, and planned directions are not presented as the same thing.
            </p>
          </div>

          <div className="space-y-6">
            {featuredProducts.map((project, index) => {
              const screenshot = project.screenshots[0];
              return (
                <article
                  key={project.slug}
                  className="grid overflow-hidden rounded-xl border bg-background shadow-sm lg:grid-cols-[1.05fr_0.95fr]"
                >
                  <div className={`relative min-h-[300px] bg-[#0d1718] ${index % 2 ? "lg:order-2" : ""}`}>
                    {screenshot ? (
                      <Image
                        src={screenshot}
                        alt={`${project.title} product interface`}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full min-h-[300px] items-center justify-center p-10 text-center text-white/55">
                        <FileCheck2 className="h-14 w-14" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-7 md:p-9">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-semibold uppercase tracking-[0.14em] text-primary">
                        {project.category}
                      </span>
                      <span className="rounded-full border px-3 py-1 text-muted-foreground">
                        {project.maturity}
                      </span>
                    </div>
                    <h3 className="mt-5 text-3xl font-bold tracking-tight">{project.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {project.summary}
                    </p>
                    <p className="mt-5 border-l-2 border-primary pl-4 text-sm leading-7 text-foreground/82">
                      <strong>Outcome:</strong> {project.outcome}
                    </p>
                    <Link
                      href={`/work/${project.slug}`}
                      className="mt-6 inline-flex items-center text-sm font-semibold text-primary"
                    >
                      Review product decisions <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0d1718] py-16 text-white md:py-20">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 md:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/70">
              Systems playground
            </p>
            <h2 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight md:text-4xl">
              Inspect the product loops behind coverage, extraction, signatures, and local audio.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65 md:text-base">
              The interactive lab is supporting evidence, not the source of truth. Each scene links back to a factual case study and an explicit maturity state.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-white/25 bg-white/[0.04] text-white hover:bg-white/[0.09]"
          >
            <Link href="/systems">
              Launch systems lab <Map className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Two professional paths
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              The same operating discipline, evaluated for a role or a scoped engagement.
            </h2>
          </div>
          <div className="grid grid-cols-1 border-y md:grid-cols-2">
            {careerProfile.audiencePaths.map((path, index) => (
              <Link
                key={path.label}
                href={path.href}
                className={`group py-8 md:p-9 ${index ? "border-t md:border-l md:border-t-0" : ""}`}
              >
                <div className="flex items-center gap-3 text-primary">
                  {index === 0 ? <BriefcaseBusiness className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">{path.label}</span>
                </div>
                <h3 className="mt-5 text-2xl font-bold tracking-tight">{path.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{path.body}</p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
                  {path.action} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-14 md:py-18">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-7 px-4 md:grid-cols-[1fr_auto] md:items-center md:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-primary">
              <BookOpen className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Writing and operating discipline</p>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">No Claim Without Evidence</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
              A 19-chapter field guide to evidence links, eval contracts, review rules, action traces, and release gates for AI-assisted workflows.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/books/no-claim-without-evidence">
              Review the book <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[980px] px-4 text-center md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Start with the real workflow</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            Tell me who does the work today, where it breaks, and what a better system would change.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            A workflow, sample document, screen recording, or existing tool list is more useful than a polished feature specification.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-md px-8">
            <Link href="/contact?type=project&source=home-bottom">
              Send the problem <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
