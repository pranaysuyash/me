import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { BookRegionalPrice } from "@/components/book-regional-price";
import { PageLayout } from "@/components/layout/page-layout";
import { SectionIndex } from "@/components/section-index";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { noClaimEbook } from "@/lib/ebook";

export const metadata: Metadata = {
  title: `${noClaimEbook.title} — reading sample`,
  description:
    "Read substantial excerpts from No Claim Without Evidence covering evidence records, pipeline evaluation, release gates, and a reusable claim-evidence ledger.",
  alternates: {
    canonical: "https://pranaysuyash.com/books/no-claim-without-evidence/sample",
  },
};

const sampleSections = [
  { label: "The evidence habit", href: "#evidence-habit" as const },
  { label: "Unsupported claims", href: "#unsupported-claims" as const },
  { label: "Test the pipeline", href: "#pipeline" as const },
  { label: "Release gates", href: "#release-gates" as const },
  { label: "Reusable ledger", href: "#ledger" as const },
] as const;

const ticketSource = `Passenger: Riya Mehta
Booking Ref / PNR: H7K29Q
Flight: AI 202
Date: 12 Aug 2026
Departure: Delhi
Arrival: Bengaluru
Departure Time: 09:40
Terminal: not shown
Baggage: not shown`;

const temptingOutput = `{
  "passenger_name": "Riya Mehta",
  "flight_number": "AI 202",
  "departure_date": "2026-08-12",
  "origin": "DEL",
  "destination": "BLR",
  "pnr": "H7K29Q",
  "terminal": "Terminal 3",
  "baggage": "15kg"
}`;

const evidenceRecord = `{
  "field": "terminal",
  "raw_value": null,
  "normalized_value": null,
  "status": "not_present",
  "evidence": [],
  "action": "accept_with_warning",
  "notes": "Do not infer from airport or route"
}`;

const pipelinePath = `upload
  -> document classification
  -> OCR and layout extraction
  -> field candidate extraction
  -> schema validation
  -> evidence linking
  -> normalization
  -> routing and stop policy
  -> human review when required
  -> final decision
  -> downstream itinerary record`;

const pipelineFailure = `case_id: AIR-088
source_facts:
  departure_time_candidates: ["09:40", "21:40"]
expected:
  final_status: review_required
  reason: conflicting_departure_times
actual:
  extracted_candidates: ["09:40", "21:40"]
  schema_status: valid
  final_status: accepted
  reason: schema_valid
failure_layer: pipeline.routing_policy`;

const releaseGate = `release_gate: ticket_extraction_v4
risk_class: high
must_pass:
  critical_field_accuracy: ">= 98%"
  unsupported_inference_rate: "<= 0.5%"
  evidence_link_coverage_critical: ">= 99%"
  schema_validity: "100%"
  regression_cases_pass: "100%"
review_limits:
  review_rate: "<= 12%"
operations:
  p95_latency_ms: "<= 5000"
  average_cost_usd: "<= 0.025"
blockers:
  - any customer-facing claim without evidence
  - any do-not-infer field accepted without source evidence
  - any booking performed without required approval
  - any critical regression case failure`;

const claimEvidenceLedger = `claim_id:
document_id:
field:
value:
claim_type: extracted | normalized | inferred | human_corrected
source_locator:
evidence_excerpt:
evidence_status: supported | not_present | unreadable | ambiguous | conflicting
product_policy:
decision: accept | accept_with_warning | reject | review
decision_reason:
verified_by:
verified_at:`;

function ReadingDivider() {
  return <div className="mx-auto my-14 h-px w-24 bg-border" aria-hidden />;
}

function CodeBlock({ children, label }: { children: string; label: string }) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border bg-[#0d1718] text-white shadow-sm">
      <figcaption className="border-b border-white/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
        {label}
      </figcaption>
      <pre className="overflow-x-auto p-5 text-sm leading-7 text-white/82">
        <code>{children}</code>
      </pre>
    </figure>
  );
}

export default function SampleChapterPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b bg-[#08111a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(35,190,255,0.2),transparent_34%),linear-gradient(120deg,rgba(255,197,94,0.1),transparent_38%)]" />
        <div className="container relative mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1fr_360px] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Curated reading sample
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] sm:text-5xl md:text-6xl">
              Read the book’s argument, examples, and operating artifacts.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              These are substantial excerpts from the manuscript—not a summary page. The selections move from the evidence habit, through a concrete extraction failure and pipeline diagnosis, to the release gate where the book’s method becomes a shipping decision.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/52">
              Selected excerpts are lightly abridged for web reading. Examples and technical artifacts retain their manuscript structure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href={noClaimEbook.checkoutUrl}>
                  Buy the full book <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/28 bg-white/5 px-8 text-white hover:bg-white/10"
              >
                <Link href={noClaimEbook.path}>Book overview</Link>
              </Button>
            </div>
          </div>

          <Card className="border-white/12 bg-white/[0.06] text-white shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <BookOpen className="h-5 w-5 text-cyan-200" />
                <div>
                  <p className="font-semibold">Inside this reading sample</p>
                  <p className="text-xs text-white/55">Five selections across the book</p>
                </div>
              </div>
              <ol className="mt-5 space-y-3 text-sm leading-6 text-white/72">
                {sampleSections.map((section, index) => (
                  <li key={section.href} className="flex gap-3">
                    <span className="font-mono text-xs text-cyan-200">{String(index + 1).padStart(2, "0")}</span>
                    <a href={section.href} className="hover:text-white hover:underline">
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
              <BookRegionalPrice tone="dark" className="mt-6 border-t border-white/10 pt-5" />
              <Button asChild className="mt-5 w-full rounded-full">
                <Link href={noClaimEbook.checkoutUrl}>Buy now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <SectionIndex items={sampleSections} label="Reading sample sections" />

      <main className="bg-background">
        <article className="mx-auto max-w-[780px] px-4 py-16 md:px-6 md:py-24">
          <header className="mb-14 border-b pb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              From the introduction
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              The evidence habit
            </h2>
          </header>

          <section id="evidence-habit" className="scroll-mt-28">
            <div className="space-y-6 font-serif text-[1.075rem] leading-9 text-foreground/88 md:text-[1.15rem]">
              <p>Most AI product mistakes do not start with a bad model.</p>
              <p>They start with an unsupported claim.</p>
              <div className="my-8 rounded-xl border bg-muted/35 p-6 font-sans text-base leading-8">
                <p>The prompt worked once, so the prompt works.</p>
                <p>The JSON parsed, so the extraction is correct.</p>
                <p>The model sounded confident, so the answer is trustworthy.</p>
                <p>The demo looked good, so the feature is ready.</p>
                <p>The eval score went up, so the product improved.</p>
              </div>
              <p>Every one of those sentences may be true. None of them is proven by the sentence itself.</p>
              <blockquote className="my-10 border-l-4 border-primary pl-6 font-sans text-2xl font-semibold leading-9 tracking-tight">
                No claim without evidence.
              </blockquote>
              <p>
                That rule changes how you write prompts, design schemas, build fallbacks, structure review, read eval scores, and decide whether a release is safe enough to ship.
              </p>
              <p>
                Imagine a system that extracts structured fields from airline tickets, receipts, invoices, medical documents, customer emails, or support transcripts. The user does not care that the model generated clean JSON. The user cares whether the flight number, PNR, terminal, amount, passenger name, and date are correct enough for the next workflow step.
              </p>
              <p>A clean output is not the same as a true output.</p>
              <p>
                An LLM can produce a field that looks plausible but is not supported by the source document. A fallback model can fill a blank field by guessing. A reviewer can accept a value because it feels right. A benchmark can report high accuracy while hiding the one failure mode that would damage user trust.
              </p>
              <p>That is why AI engineering needs more than prompts. It needs evidence paths.</p>
            </div>
          </section>

          <ReadingDivider />

          <section id="unsupported-claims" className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              From Chapter 1
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              A claim is a value plus a reason to trust it
            </h2>
            <div className="mt-7 space-y-6 font-serif text-[1.075rem] leading-9 text-foreground/88 md:text-[1.15rem]">
              <p>
                A product does not merely display values; it causes people and systems to act on them. A flight number may drive a status lookup. A departure date may schedule a notification. A baggage allowance may become a customer-facing promise. The moment an extracted value affects a decision, the value is a claim.
              </p>
              <p>A claim has at least four parts:</p>
              <ol className="space-y-3 pl-6 font-sans text-base leading-8">
                <li><strong>Value:</strong> What does the system say?</li>
                <li><strong>Provenance:</strong> Where did that value come from?</li>
                <li><strong>Interpretation:</strong> Was it copied, normalized, inferred, or reviewed?</li>
                <li><strong>Decision:</strong> What may the product do with it?</li>
              </ol>
              <p>
                A value is not ready merely because it matches a schema. It is ready when the value and its provenance satisfy the product’s policy for the action that follows.
              </p>
            </div>

            <CodeBlock label="Source document">{ticketSource}</CodeBlock>
            <CodeBlock label="Tempting model output">{temptingOutput}</CodeBlock>

            <div className="space-y-6 font-serif text-[1.075rem] leading-9 text-foreground/88 md:text-[1.15rem]">
              <p>
                At a glance, this looks good. It is complete. It is clean. It has the right shape. But terminal and baggage are unsupported. The document explicitly does not show them.
              </p>
              <p>If the workflow accepts those values, it has crossed a line. The model did not extract. It inferred.</p>
              <p>
                Extraction means the value came from the source. Normalization means a supported source value was transformed under a declared rule, such as <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">Delhi</code> to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">DEL</code>. Inference means the value came from reasoning, prior knowledge, or a guess. Inference is not always wrong, but it must be labeled and governed by a different contract.
              </p>
            </div>

            <CodeBlock label="Field-level evidence record">{evidenceRecord}</CodeBlock>

            <div className="rounded-xl border border-primary/25 bg-primary/[0.04] p-6">
              <div className="flex items-center gap-3 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <p className="font-semibold">The operational distinction</p>
              </div>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                The question is not whether “Terminal 3” happens to be true in the real world. The extraction product is claiming what the document says. Real-world plausibility cannot substitute for document evidence.
              </p>
            </div>
          </section>

          <ReadingDivider />

          <section id="pipeline" className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              From Chapter 15
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Test the pipeline, not just the model
            </h2>
            <div className="mt-7 space-y-6 font-serif text-[1.075rem] leading-9 text-foreground/88 md:text-[1.15rem]">
              <p>When an AI workflow fails, the model is only one suspect.</p>
              <p>
                The defect may live in document intake, OCR, layout parsing, chunking, prompt construction, model selection, schema validation, JSON repair, evidence linking, normalization data, routing, fallback, stop conditions, review instructions, or a downstream API.
              </p>
              <p>The user does not experience a model in isolation. The user experiences the pipeline.</p>
            </div>

            <CodeBlock label="One possible product path">{pipelinePath}</CodeBlock>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Model layer", "Prompts, model choice, decoding, candidate extraction, and evidence selection."],
                ["Pipeline layer", "Intake, OCR flow, validation, retries, fallback, routing, review, storage, and audit."],
                ["Data/configuration layer", "Schemas, dictionaries, normalization maps, field policies, thresholds, templates, and scoring rules."],
              ].map(([title, body]) => (
                <Card key={title} className="h-full">
                  <CardContent className="p-5">
                    <p className="font-semibold">{title}</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <CodeBlock label="A model success and pipeline failure">{pipelineFailure}</CodeBlock>

            <div className="space-y-6 font-serif text-[1.075rem] leading-9 text-foreground/88 md:text-[1.15rem]">
              <p>
                The model succeeded: it preserved both departure times. The pipeline failed by treating schema validity as permission to accept.
              </p>
              <p>A model upgrade does not fix a broken lookup table. A better prompt does not fix missing review policy. A passing extraction does not prove production readiness.</p>
            </div>
          </section>

          <ReadingDivider />

          <section id="release-gates" className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              From Chapter 19
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Your eval should become a release gate
            </h2>
            <div className="mt-7 space-y-6 font-serif text-[1.075rem] leading-9 text-foreground/88 md:text-[1.15rem]">
              <p>The mature end state is not an eval dashboard.</p>
              <p>The mature end state is release discipline.</p>
              <p>
                When a prompt changes, the eval runs. When a schema changes, the eval runs. When a model changes, the eval runs. When a routing rule, lookup table, review policy, or stop condition changes, the eval runs.
              </p>
              <blockquote className="my-10 border-l-4 border-primary pl-6 font-sans text-2xl font-semibold leading-9 tracking-tight">
                Is this version of the product workflow safe enough to ship?
              </blockquote>
              <p>
                A gate is a decision, not a score. No single aggregate score can represent every failure cost. A system could improve average field accuracy while introducing one unsupported PNR or unauthorized booking. Averages can hide blockers.
              </p>
              <p>A useful gate therefore combines quality thresholds, operational limits, and zero-tolerance blockers.</p>
            </div>

            <CodeBlock label="Example release gate">{releaseGate}</CodeBlock>

            <div className="rounded-xl border bg-muted/30 p-6">
              <p className="font-semibold">Where the argument lands</p>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
                {[
                  "No extraction without evidence",
                  "No confidence without status",
                  "No fallback without routing policy",
                  "No review without rules",
                  "No agent action without permission",
                  "No score without logs",
                  "No release without a gate",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <ReadingDivider />

          <section id="ledger" className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Reusable artifact
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              The claim-evidence ledger
            </h2>
            <div className="mt-7 space-y-6 font-serif text-[1.075rem] leading-9 text-foreground/88 md:text-[1.15rem]">
              <p>
                The ledger creates a discipline: every accepted claim must answer “why may the product trust this?” It also gives future evals something concrete to score—evidence coverage, unsupported inference, review decisions, and policy compliance.
              </p>
            </div>
            <CodeBlock label="Template">{claimEvidenceLedger}</CodeBlock>
          </section>

          <ReadingDivider />

          <section aria-labelledby="sample-decision" className="rounded-2xl border bg-card p-7 shadow-sm md:p-9">
            <div className="flex items-center gap-3 text-primary">
              <FileText className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Continue reading</p>
            </div>
            <h2 id="sample-decision" className="mt-4 text-3xl font-bold tracking-tight">
              The full book carries this method through 19 chapters and two appendices.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Continue into error taxonomies, eval-set design, cost and latency, fallbacks, human review, observability, agent action evals, configuration discipline, the complete airline-ticket capstone, and practical templates.
            </p>
            <BookRegionalPrice className="mt-7 border-t pt-6" />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href={noClaimEbook.checkoutUrl}>
                  Buy the full book <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8">
                <Link href={noClaimEbook.path}>Review the book overview</Link>
              </Button>
            </div>
          </section>
        </article>
      </main>
    </PageLayout>
  );
}
