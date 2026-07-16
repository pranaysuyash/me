import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { careerProfile, medpiperCaseStudy, publicEvidence } from "@/lib/career";
import { auditedProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Proof Ledger | Career and Product Evidence | Pranay Suyash",
  description:
    "A public record of professional claims, product maturity, review dates, source revisions, and inspectable evidence used across Pranay Suyash's portfolio.",
  alternates: { canonical: "https://pranaysuyash.com/proof" },
};

const evidenceRules = [
  "Production, commercial, active-build, and prototype states are never treated as interchangeable.",
  "A workflow diagram explains a system boundary; it is not labelled as a product screenshot.",
  "Source, tests, runbooks, architecture records, or independent public records are linked where available.",
  "Testimonials, customer counts, certification claims, and adoption metrics are omitted without permissioned evidence.",
  "Case studies state what exists now and keep future direction outside the current-outcome claim.",
] as const;

export default function ProofPage() {
  return (
    <PageLayout>
      <section className="border-b bg-[#0d1718] text-white">
        <div className="container mx-auto max-w-[1180px] px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100/70">
            Public proof ledger
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl md:text-6xl">
            The claims, boundaries, review dates, and evidence behind this portfolio.
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-white/70 md:text-lg">
            This page is designed for hiring managers, buyers, technical reviewers, and future maintainers.
            It makes the evidence model visible instead of asking visitors to trust polished copy alone.
          </p>
        </div>
      </section>

      <section className="border-b bg-background">
        <div className="container mx-auto grid max-w-[1180px] grid-cols-2 px-4 md:grid-cols-4 md:px-6 lg:px-8">
          {careerProfile.proofPoints.map((point, index) => (
            <div
              key={point.value}
              className={`py-6 pr-4 ${index % 2 ? "border-l pl-4" : ""} ${index > 1 ? "border-t md:border-t-0" : ""} md:border-l md:px-5 md:first:border-l-0`}
            >
              <p className="text-lg font-bold tracking-tight">{point.value}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-primary">
              <ShieldCheck className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Evidence rules</p>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              What this site will and will not call proof.
            </h2>
          </div>
          <div className="divide-y border-y">
            {evidenceRules.map((rule) => (
              <p key={rule} className="flex items-start gap-3 py-5 text-sm leading-7 text-muted-foreground">
                <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-primary" />
                {rule}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Professional evidence</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Career claims are separated from confidential operating detail.
            </h2>
          </div>

          <article className="grid overflow-hidden rounded-xl border bg-background lg:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-[#102022] p-7 text-white md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-100/70">
                {medpiperCaseStudy.status}
              </p>
              <h3 className="mt-5 text-3xl font-bold tracking-tight">{medpiperCaseStudy.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/65">{medpiperCaseStudy.problem}</p>
              <Link href="/work/medpiper-workflow" className="mt-6 inline-flex items-center text-sm font-semibold text-teal-100">
                Review sanitized case <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="p-7 md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Recorded outcomes</p>
              <ul className="mt-5 divide-y border-y">
                {medpiperCaseStudy.outcomes.map((outcome) => (
                  <li key={outcome} className="py-4 text-sm leading-7 text-muted-foreground">{outcome}</li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-6 text-muted-foreground">{medpiperCaseStudy.disclosure}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Audited product evidence</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Maturity, reviewed source revision, and inspectable implementation records.
            </h2>
          </div>

          <div className="divide-y border-y">
            {auditedProjects.map((project) => (
              <article key={project.slug} className="grid gap-6 py-8 lg:grid-cols-[220px_1fr_auto] lg:items-start">
                <div>
                  <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">{project.maturity}</span>
                  <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarCheck2 className="h-4 w-4 text-primary" /> Reviewed {project.evidenceReviewedAt}
                  </p>
                  <p className="mt-2 font-mono text-[10px] text-muted-foreground">{project.sourceRevision.slice(0, 12)}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{project.summary}</p>
                  <p className="mt-4 text-sm leading-7 text-foreground/82"><strong>Current outcome:</strong> {project.outcome}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {project.implementationEvidence.length} pinned implementation records · {project.visualEvidence.length} labelled visual record
                  </p>
                </div>
                <Link href={`/work/${project.slug}`} className="inline-flex items-center text-sm font-semibold text-primary">
                  Inspect evidence <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-[#102022] py-14 text-white">
        <div className="container mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-4 md:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-teal-100/70">
              <FileCheck2 className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Independent public records</p>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">External context without invented social proof.</h2>
          </div>
          <div className="divide-y divide-white/12 border-y border-white/12">
            {publicEvidence.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-4 py-6 sm:grid-cols-[140px_1fr_auto] sm:items-center"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-100/70">{item.publisher}</p>
                  <p className="mt-2 text-xs text-white/40">{item.date}</p>
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-teal-100">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/58">{item.note}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-white/40 group-hover:text-teal-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
