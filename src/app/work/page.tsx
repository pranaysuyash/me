import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Archive, ExternalLink } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { careerProfile, medpiperCaseStudy } from "@/lib/career";
import { auditedProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Selected Work | Product Systems and Professional Outcomes",
  description:
    "Selected professional and independent product work, organised by ownership, maturity, decisions, and evidence rather than repository count.",
  alternates: { canonical: "https://pranaysuyash.com/work" },
};

export default function WorkPage() {
  return (
    <PageLayout>
      <section className="border-b bg-[#0d1718] text-white">
        <div className="container mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100/70">
            Selected work
          </p>
          <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl md:text-6xl">
              Evidence of ownership, product judgment, and hands-on system building.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-white/68 lg:justify-self-end md:text-lg">
              The primary case studies separate production outcomes, commercial software,
              working product builds, active platforms, and prototypes. Earlier experiments
              remain available in the archive without diluting the main signal.
            </p>
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

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-2xl border bg-card shadow-sm lg:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-[#102123] p-8 text-white md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/70">
                {medpiperCaseStudy.status}
              </p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
                {medpiperCaseStudy.title}
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/68 md:text-base">
                {medpiperCaseStudy.problem}
              </p>
              <div className="mt-8 border-y border-white/12 py-5">
                <p className="text-3xl font-bold text-teal-100">~4 weeks → ~10 days</p>
                <p className="mt-2 text-sm text-white/55">Insurance sales and operations turnaround</p>
              </div>
              <Link
                href="/work/medpiper-workflow"
                className="mt-7 inline-flex items-center text-sm font-semibold text-teal-100"
              >
                Review professional case study <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">What it proves</p>
              <ul className="mt-6 divide-y border-y">
                {medpiperCaseStudy.outcomes.map((outcome) => (
                  <li key={outcome} className="py-5 text-sm leading-7 text-muted-foreground">
                    {outcome}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-6 text-muted-foreground">{medpiperCaseStudy.disclosure}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-12 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Independent product systems
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Four products, each labelled by what actually exists today.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
              Every case study includes the current maturity, primary user, ownership,
              constraints, and decisions. Planned directions are not presented as shipped outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {auditedProjects.map((project) => {
              const screenshot = project.screenshots[0];
              return (
                <article key={project.slug} className="group overflow-hidden rounded-xl border bg-background shadow-sm">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#0d1718]">
                    {screenshot ? (
                      <Image
                        src={screenshot}
                        alt={`${project.title} product interface`}
                        fill
                        unoptimized
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-8 text-center text-sm text-white/45">
                        Product build documented through architecture and workflow evidence
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                        {project.category}
                      </span>
                      <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                        {project.maturity}
                      </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-bold tracking-tight">{project.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.summary}</p>
                    <p className="mt-5 border-l-2 border-primary pl-4 text-sm leading-7 text-foreground/82">
                      <strong>Outcome:</strong> {project.outcome}
                    </p>
                    <Link
                      href={`/work/${project.slug}`}
                      className="mt-6 inline-flex items-center text-sm font-semibold text-primary"
                    >
                      Review case study <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 md:px-6 lg:grid-cols-2 lg:px-8">
          <Link href="/systems" className="group border-y py-8 md:px-6">
            <ExternalLink className="h-5 w-5 text-primary" />
            <h2 className="mt-5 text-2xl font-bold tracking-tight">Interactive systems lab</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Inspect simplified product loops for coverage, extraction, signatures, and local audio.
            </p>
            <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
              Launch the lab <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Link>
          <Link href="/labs" className="group border-y py-8 md:px-6">
            <Archive className="h-5 w-5 text-primary" />
            <h2 className="mt-5 text-2xl font-bold tracking-tight">Earlier projects and experiments</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              A separate archive preserves technical range without presenting every repository as flagship evidence.
            </p>
            <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
              Browse archive <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      <section className="border-t py-14">
        <div className="container mx-auto flex max-w-[1280px] flex-col gap-5 px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <div>
            <p className="text-lg font-semibold">Evaluating fit for a role or a related build?</p>
            <p className="mt-2 text-sm text-muted-foreground">
              The experience page gives hiring context; the services page gives commercial scope and regional pricing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline"><Link href="/hire-me">Review experience</Link></Button>
            <Button asChild><Link href="/contact?type=project&source=work">Discuss a project <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
