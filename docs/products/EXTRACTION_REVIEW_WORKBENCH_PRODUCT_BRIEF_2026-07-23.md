# Extraction Review Workbench

Date: 2026-07-23  
Status: product direction accepted; build not started  
Working name: Extraction Review Workbench  
Owner: Pranay Suyash

## Executive decision

Build the next paid workflow as a **local, vendor-neutral extraction review workbench**, not as a static document-extraction template pack.

The product should accept source documents or text, a field schema, extraction output, and optional human-reviewed labels. It should produce field-level validation, source-evidence gaps, review queues, evaluation metrics, and an exportable acceptance report.

The first release should not include its own OCR or LLM extraction model. It evaluates and operationalizes output produced by any parser, OCR engine, VLM, LLM, or manual workflow.

That boundary keeps the product:

- deterministic where it needs to be;
- local-first and provider-neutral;
- useful before a team chooses or replaces an extraction provider;
- cheaper to operate and support than a hosted model service;
- complementary to MetaExtract and custom document-workflow engagements rather than a duplicate product.

## Problem

Teams can obtain structured JSON from many document systems. They still struggle to answer:

- Is each field correct?
- Where in the source did the value come from?
- Which fields are unsupported, malformed, contradictory, or incomplete?
- Which documents can proceed automatically?
- Which documents need human review?
- Did a parser or prompt change improve the workflow?
- Can the team explain why a release was accepted?

Most extraction tools optimize for producing output. The operational gap is deciding whether that output is safe enough for the next business action.

## Buyer

### Primary buyer

Product, operations, automation, or AI teams that already have an extraction pipeline or are evaluating one.

Typical context:

- invoices, forms, statements, records, applications, policies, claims, reports, or signed documents;
- multiple document layouts;
- one or more OCR/LLM providers;
- downstream CSV, API, database, ERP, CRM, or case-management action;
- human review currently done in spreadsheets, ad hoc scripts, or provider consoles.

### Secondary buyer

Consultants and software teams delivering document workflows for multiple customers who need a reusable evaluation and acceptance layer independent of the extraction vendor.

### Poor fit

- one-off documents with no repeatable schema;
- buyers seeking a complete OCR engine in the first release;
- regulated workflows requiring a certified compliance product rather than an evaluation tool;
- teams unwilling to create any human-reviewed test set or acceptance rules.

## Existing market and gap

### Google Document AI

Google Document AI evaluates processor performance by comparing predictions with annotations in a labelled test set and reports metrics including precision and recall. Its custom validation and correction capability can execute business rules, compare rule outcomes, and evaluate pre/post-correction results, but the feature is currently private preview and remains tied to the Document AI processor model.

Sources:

- <https://docs.cloud.google.com/document-ai/docs/evaluate>
- <https://docs.cloud.google.com/document-ai/docs/ce-validation>

### Microsoft Document Intelligence

Microsoft returns confidence values for extracted words, key-value mappings, fields, tables, rows, cells, regions, signatures, and other supported elements. Microsoft explicitly recommends customer-specific evaluation, confidence thresholds, straight-through processing, and human review for lower-confidence or critical cases.

Sources:

- <https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/document-intelligence/transparency-note>
- <https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/concept/accuracy-confidence>

### Product gap

The opportunity is not to reproduce either provider console. It is to provide a portable operating layer that can:

- compare providers or parser versions;
- retain the same schema and acceptance rules while the extraction engine changes;
- validate business rules independent of provider confidence;
- attach field values to source evidence;
- combine deterministic checks, human review, and optional ground truth;
- run locally without uploading sensitive documents to another evaluation vendor;
- export a durable decision and evidence record.

## Product promise

> Turn extraction output into a reviewable release decision, independent of the model or document provider.

## Free versus paid boundary

### Existing free proof

The portfolio already provides:

- a constrained browser extraction mechanism using synthetic invoice text;
- a direct document-extraction starter;
- the MetaExtract audited case;
- the proof/evaluation concepts in No Claim Without Evidence.

These remain free and ungated.

### Paid product

The paid product must add an operationally different object:

- batch workspaces;
- custom schemas;
- reusable import mappings;
- field-level metrics;
- validation rules;
- source-evidence completeness;
- review queues and decisions;
- comparison between extraction runs;
- exportable reports;
- local persistence and recovery;
- versioned releases and support.

A formatted checklist or workbook alone is not a sufficient paid product.

## Core workflow

### 1. Create workspace

Define:

- workspace name;
- document family;
- schema version;
- extraction provider or pipeline version;
- acceptance profile;
- optional cost and latency metadata.

### 2. Import source material

First-release inputs:

- PDF;
- image files;
- plain text;
- source text plus page/line references;
- batch folder or ZIP.

The workbench may extract text deterministically where supported, but it must not imply that its own text extraction is the evaluated AI system.

### 3. Define or import schema

Support:

- simple field configuration;
- JSON Schema subset;
- field aliases;
- required/optional fields;
- type and format rules;
- per-field importance weight;
- normalization rules;
- cross-field rules.

### 4. Import extraction output

First-release adapters:

- canonical workbench JSON;
- flat or tabular CSV;
- user-defined JSON path mapping;
- optional evidence page, line, bounding box, and confidence fields.

Provider-specific adapters should follow only after the canonical import contract is stable. Google Document AI and Microsoft Document Intelligence are the first likely adapters because they expose structured entities, evidence locations, and confidence values.

### 5. Import optional ground truth

Support:

- reviewed JSON;
- reviewed CSV;
- direct review inside the workbench;
- partial labels where only critical fields are known.

The product must distinguish:

- no label exists;
- label intentionally absent;
- field not applicable;
- extracted value missing;
- extracted value rejected.

### 6. Run validation

Validation classes:

- required-field presence;
- type and format;
- enum or controlled vocabulary;
- numeric range;
- date order;
- currency and decimal normalization;
- subtotal/tax/total consistency;
- line-item sum;
- cross-document consistency;
- duplicate value or document;
- evidence present;
- evidence contains or supports the normalized value;
- extraction confidence threshold;
- custom deterministic expression.

Confidence is a routing signal, not proof of correctness.

### 7. Review exceptions

Each field receives one explicit state:

- accepted automatically;
- accepted by reviewer;
- needs review;
- rejected;
- corrected;
- not applicable;
- unsupported.

The reviewer should see:

- source document region or source text;
- extracted raw and normalized value;
- confidence if supplied;
- failed validation rules;
- prior extraction run;
- optional ground truth;
- correction history.

### 8. Compare runs

Compare two extraction runs on the same set:

- parser/provider/model/prompt version;
- field coverage;
- exact and normalized accuracy;
- evidence coverage;
- unsupported claim rate;
- review rate;
- straight-through eligibility;
- latency;
- estimated cost;
- regressions by document and field.

### 9. Export decision evidence

Export:

- reviewed JSON;
- CSV;
- field-level evaluation report;
- document-level exception report;
- run comparison;
- acceptance-gate summary;
- machine-readable audit record;
- self-contained HTML or PDF report.

## Metrics

### Label-dependent

- exact match;
- normalized match;
- precision, recall, and F1 per field;
- micro and macro aggregate;
- numeric absolute/relative error;
- date equivalence;
- line-item matching;
- document pass rate.

### Label-independent

- schema validity;
- required-field coverage;
- evidence coverage;
- evidence-value support rate;
- validation-rule pass rate;
- low-confidence rate;
- unsupported-field rate;
- review rate;
- correction rate;
- straight-through eligibility;
- failure and skipped-document rate.

### Operational

- latency per document;
- cost per document when supplied;
- reviewer time;
- unresolved exceptions;
- run-to-run regressions;
- acceptance-gate result.

Metrics must always show denominator and skipped/unlabelled counts. A high score on a small reviewed subset must not be presented as full-corpus correctness.

## Canonical data model

```ts
interface ReviewWorkspace {
  id: string;
  name: string;
  documentFamily: string;
  schemaVersion: string;
  createdAt: string;
  storageMode: "local";
}

interface FieldDefinition {
  id: string;
  label: string;
  type: "string" | "number" | "date" | "currency" | "boolean" | "array" | "object";
  required: boolean;
  aliases: string[];
  weight: number;
  normalization: string[];
  rules: ValidationRule[];
}

interface ExtractionRun {
  id: string;
  workspaceId: string;
  pipelineName: string;
  pipelineVersion: string;
  provider?: string;
  model?: string;
  createdAt: string;
  latencyMs?: number;
  estimatedCost?: number;
}

interface FieldCandidate {
  documentId: string;
  runId: string;
  fieldId: string;
  rawValue: unknown;
  normalizedValue: unknown;
  confidence?: number;
  evidence: EvidenceReference[];
}

interface EvidenceReference {
  sourceId: string;
  page?: number;
  line?: number;
  text?: string;
  boundingBox?: number[];
}

interface ValidationResult {
  documentId: string;
  runId: string;
  fieldId?: string;
  ruleId: string;
  status: "pass" | "fail" | "skipped" | "error";
  explanation: string;
}

interface ReviewDecision {
  documentId: string;
  runId: string;
  fieldId: string;
  state: "accepted" | "needs-review" | "rejected" | "corrected" | "not-applicable" | "unsupported";
  correctedValue?: unknown;
  reviewerNote?: string;
  decidedAt: string;
}
```

The model must remain provider-neutral. Provider payloads belong in adapters, not the domain schema.

## Architecture

### Recommended structure

```text
core-python/
  schema/
  normalization/
  validation/
  metrics/
  evidence/
  comparison/
  exports/

adapters/
  canonical-json/
  csv/
  json-path/
  later-google-document-ai/
  later-azure-document-intelligence/

local-api/
  workspace/
  jobs/
  files/
  reports/

ui/
  intake/
  schema/
  run-review/
  comparison/
  report/

packaging/
  desktop/
  cli/
```

### Strong recommendation

Keep the evaluation engine as a typed, testable Python package with a CLI. Build the operator UI as a separate local application surface over the same core. Do not put validation logic inside React components.

Why:

- Python has stronger document, data, and evaluation tooling;
- the CLI gives reproducibility and automation;
- the UI remains replaceable;
- custom enterprise integration can consume the same core;
- batch jobs and reports are easier to test independently.

### Local storage

- SQLite for workspace metadata and decisions;
- files remain in a user-controlled workspace directory;
- imported provider payloads retained only when the user opts in;
- exports are explicit;
- no analytics or document upload by default.

### Packaging decision

Evaluate two implementation paths before coding the UI:

1. PySide6 desktop UI over the Python core.
2. React UI with a local Python service packaged as a desktop application.

Choose based on packaging reliability, update mechanism, UI quality, file access, and support burden. Do not maintain both.

## Security and privacy boundary

- local processing by default;
- no document or extraction payload leaves the device;
- no hidden telemetry;
- secrets are unnecessary for canonical JSON/CSV review;
- provider API import, if added later, is explicit and separately configured;
- temporary files are bounded and recoverable;
- exported reports warn when they contain source text or sensitive values;
- workspace deletion must remove local metadata and derived artifacts predictably.

The product is an evaluation and review tool, not a compliance certification.

## First-release boundary

### Included

- local workspace;
- canonical JSON and CSV import;
- schema editor/import;
- deterministic field and cross-field validation;
- optional reviewed labels;
- review queue;
- field/document metrics;
- run comparison;
- CSV, JSON, and HTML report export;
- synthetic example workspace;
- recovery from interrupted import/evaluation;
- personal licence delivery.

### Excluded

- built-in OCR/VLM/LLM provider;
- hosted collaboration;
- multi-user permissions;
- cloud sync;
- automatic legal/compliance conclusions;
- provider billing management;
- model fine-tuning;
- annotation outsourcing;
- arbitrary executable user code in validation rules.

## Acceptance contract

The product is ready for sale only when:

- 100 synthetic/mixed documents can be imported as a batch without data loss;
- malformed documents and payloads are isolated rather than crashing the run;
- every metric includes denominators and skipped counts;
- every field decision can be traced to extraction run, validation rules, evidence, and reviewer action;
- two runs can be compared without mutating either source run;
- exports reproduce the visible decisions and metrics;
- restart/recovery preserves workspace state;
- no network request occurs during canonical local review;
- Windows, macOS, and Linux support is either verified or the sale page states the narrower platform list accurately;
- purchase, download, installation, update, support, and refund paths are completed end to end;
- the portfolio includes approved screenshots and a current uninterrupted recording;
- claim boundaries are release-gated.

## Pricing hypotheses

Do not publish these before the product and merchant flow exist.

### Personal licence

Hypothesis: US$39–59 one time.

Rationale:

- more operational value than a static template;
- low ongoing infrastructure cost;
- enough price to support maintenance and support;
- still easy for an individual consultant or product team member to expense.

### Team licence

Hypothesis: US$149–249 one time for a defined number of users or one team.

Do not invent a team licence before activation, update, and support rules are clear.

### Assisted setup

A separate fixed-scope engagement for schema design, adapter mapping, acceptance rules, and first benchmark. This belongs under Services and should be materially higher priced than the software.

### Custom integration

Existing Services pricing applies. Do not disguise custom provider adapters, internal system integration, or organization-specific review workflows as product support.

## Distribution path

```text
Free extraction mechanism
    ↓
Free document extraction starter
    ↓
Extraction Review Workbench product page
    ↓
Personal/team purchase
    ↓
Optional assisted setup
    ↓
Custom document workflow system
```

The free surfaces should remain useful without purchase. The paid product earns money by compressing repeated operation, comparison, and review.

## Product page requirements

- one-sentence buyer/problem promise;
- direct screenshots of batch intake, review queue, run comparison, and report;
- supported inputs and outputs;
- local/privacy boundary;
- exact platform support;
- personal/team licence distinction;
- checkout and delivery;
- update policy;
- support boundary;
- refund policy;
- comparison with the free mechanism and custom engagement;
- sample report download;
- changelog;
- claim and evidence boundary.

## Validation plan

### Synthetic fixture families

- invoices with totals and taxes;
- forms with optional/missing fields;
- statements with tables;
- records with dates and identifiers;
- noisy OCR text;
- unsupported file;
- malformed provider JSON;
- duplicate document;
- conflicting evidence;
- partially labelled test set.

### Regression suites

- normalization;
- schema validation;
- numeric/date/currency equivalence;
- line-item matching;
- cross-field rules;
- evidence references;
- metric denominators;
- skipped and failed documents;
- run comparison immutability;
- export parity;
- restart/recovery;
- large batch memory and latency.

## Demand validation

Before building provider-specific adapters, run ten structured conversations or observed tests with:

- document-AI product teams;
- automation consultants;
- operations teams using manual review;
- teams comparing two extraction providers;
- buyers already handling invoice/form output in spreadsheets.

Questions:

- What extraction output exists today?
- Where is correctness reviewed?
- What evidence reaches the reviewer?
- What decision determines straight-through processing?
- How are regressions detected?
- What report is required before changing provider/model/prompt?
- Which file formats and payloads are unavoidable?
- Who would buy software versus require an integration project?

Do not validate with “Would you buy this?” Validate by observing current artefacts, review steps, exceptions, and existing spend.

## Build order

1. Freeze canonical JSON/schema/decision contracts.
2. Implement core normalization, validation, evidence, and metric engine.
3. Add CLI and synthetic fixtures.
4. Prove run comparison and exports.
5. Test with real sanitized outputs from at least three different extraction pipelines.
6. Choose one desktop UI/packaging path.
7. Build operator review and comparison UI.
8. Complete crash recovery and local deletion.
9. Capture direct product evidence.
10. Configure checkout, delivery, licence, update, support, and refund paths.
11. Add the product to `/products` only after the release contract passes.

## Open questions

- Is source-document rendering required in the first release, or is source text/page evidence sufficient?
- Should custom JSON path mappings be created through UI, configuration file, or both?
- Which validation expression language is safe and understandable enough for non-developers?
- Is the first buyer an individual consultant, an internal product team, or an operations team?
- Does the buyer need a distributable report or a reusable local workbench more urgently?
- Which platform packaging path produces the lowest support burden?
- Should the first paid version include a team licence or prove personal usage first?
- Should SignKit and this product share one updater/licensing system later, or remain independently fulfilled?

## Anything else?

Yes.

- This product should not be called an “AI evaluator” if most of its value is deterministic validation, evidence, and review workflow.
- Provider confidence must never be converted directly into a correctness claim.
- Ground truth can itself be wrong; the workbench should retain reviewer corrections and label provenance.
- A vendor-neutral adapter boundary is a strategic asset. Do not leak Google, Microsoft, OpenAI, or another provider schema into the core model.
- The first customer-specific adapter is likely a service engagement and a reusable product input, not a free support request.
- An executable CLI plus sample report may be the fastest credible paid release for technical buyers, but the broader operations market will require a reliable desktop UI.
- Real product screenshots and a current recording remain a prerequisite for public sale on the portfolio.
