# Named commercial case-study intake and publication gate

## Why this exists

Published engagement prices imply a serious commercial delivery standard. A named case study should demonstrate that standard with a real customer, approved context, direct product evidence, and an observable result.

A sales conversation, proposal, speculative concept, internal experiment, unpaid favour, or unapproved customer project is not a named commercial case.

## Minimum eligibility

A case may enter intake only when all are true:

- the customer or organisation is real;
- the commercial or contractual relationship is accurately described;
- the work reached a usable delivery or a clearly stated bounded stage;
- Pranay's scope and ownership can be distinguished from the customer's and collaborators' work;
- the customer can approve public wording;
- direct screenshots, recordings, diagrams, or artifacts can be published or recreated safely with synthetic data;
- at least one observable result, decision, or operational change can be stated honestly;
- confidentiality, security, personal-data, and logo constraints are known.

## Intake record

### Organisation and permission

```yaml
case_id:
organisation_name:
organisation_description:
industry:
country_or_market:
customer_contact_role:
relationship_type: paid_project | paid_advisory | paid_product | partnership
contracting_entity:
engagement_start:
engagement_end_or_status:
permission_status: not_requested | wording_review | approved | declined | withdrawn
logo_permission: false
name_permission: false
screenshots_permission: false
quote_permission: false
approved_public_surfaces: []
confidentiality_boundaries: []
```

### Original workflow

Record concrete behavior rather than an abstract market problem.

```yaml
primary_user:
trigger:
inputs:
current_steps: []
handoffs: []
exceptions: []
current_tools: []
where_time_breaks:
where_accuracy_or_trust_breaks:
frequency:
consequence_of_failure:
baseline_measurement:
baseline_evidence:
```

Questions:

- Who did the work before?
- What arrived, in what format, and how often?
- Which steps were manual, repeated, ambiguous, or hidden?
- Where did people wait, re-enter data, chase approvals, or make irreversible decisions?
- Which failures mattered to customers or operators?
- What evidence exists for the baseline?

### Agreed commercial scope

```yaml
engagement_shape: mapping | focused_build | production_system | embedded_partner | custom
commercial_status:
scope_statement:
in_scope: []
out_of_scope: []
acceptance_criteria: []
customer_dependencies: []
third_party_dependencies: []
security_and_privacy_requirements: []
quality_requirements: []
delivery_evidence: []
```

Do not rewrite an exploratory brief after delivery to make the engagement appear better defined than it was. Preserve meaningful scope changes and why they occurred.

### Pranay's ownership

```yaml
product_decisions: []
workflow_design:
interface_work:
architecture_work:
implementation_work:
evaluation_and_quality:
deployment_and_operations:
documentation_and_handoff:
customer_or_user_collaboration:
collaborators_and_their_ownership: []
```

The public case must not imply sole authorship when meaningful work belonged to customer teams, contractors, open-source maintainers, or other collaborators.

### Important decisions and trade-offs

For each decision:

```yaml
decision:
context:
alternatives_considered: []
why_chosen:
tradeoff:
reversal_or_fallback:
evidence:
```

At least one decision should show a rejected approach or limitation. A case containing only successful choices is not credible.

### Delivered system

```yaml
user_path:
components: []
integrations: []
data_and_state:
ai_or_automation_role:
deterministic_rules:
human_review:
error_and_exception_states:
permissions:
observability:
deployment:
current_operating_boundary:
```

State explicitly:

- what works now;
- what requires operator review;
- what remains manual;
- what is simulated or inferred;
- what is not supported;
- which product maturity label applies.

### Direct evidence

```yaml
source_revision_or_release:
product_url_if_public:
visual_manifest: []
recording_manifest: []
architecture_or_decision_records: []
test_or_evaluation_records: []
runbook_or_handoff_records: []
customer_approved_redactions: []
```

Required minimum:

- one end-to-end product-use recording;
- three direct screenshots representing input, decision/review, and output/result;
- one implementation or architecture record;
- one quality, test, evaluation, or acceptance record;
- one explicit limitation.

### Result

```yaml
observable_result:
measurement_definition:
baseline:
post_delivery:
measurement_window:
data_source:
who_verified:
confounders_or_limits: []
ongoing_status:
```

Acceptable result types include:

- elapsed time;
- manual steps or handoffs;
- review volume;
- error or exception visibility;
- throughput;
- adoption by the intended team;
- completion of a previously impossible workflow;
- a decision made safely because evidence became available.

Avoid claiming ROI, accuracy, savings, or adoption without a defined denominator and source.

### Customer voice

```yaml
source_wording:
proposed_public_wording:
attribution:
relationship_context:
permission_received_at:
approved_surfaces: []
withdrawal_path:
```

A case can be useful without a quote, but it cannot invent customer sentiment from continued usage, payment, or silence.

## Case-study structure

A published case should use this order:

1. **What changed** — one concrete sentence and the best verified result.
2. **Who did the work** — the primary user and context.
3. **The original workflow** — inputs, steps, handoffs, exceptions, and cost of failure.
4. **The boundary chosen** — what the engagement did and did not include.
5. **What Pranay owned** — product, workflow, architecture, implementation, quality, and handoff, with collaborators named where relevant.
6. **Decisions and trade-offs** — at least two decisions with a limitation or rejected alternative.
7. **The working system** — direct screenshots/recording and current maturity.
8. **Evidence and quality** — tests, evaluation, review, observability, or acceptance records.
9. **Result and measurement boundary** — what was observed and what cannot be concluded.
10. **Customer-approved statement** — optional but preferred.
11. **Current status** — live, in use, handed off, paused, replaced, or still being developed.

## Publication gate

The case must not be added to the flagship portfolio until all gates pass.

### Identity and permission

- organisation name approved;
- relationship accurately stated;
- exact wording approved;
- logo, quote, screenshot, and recording permissions treated separately;
- withdrawal path recorded.

### Evidence

- direct product evidence exists and is legible;
- source/release revision is pinned;
- every metric has a definition and source;
- every external statement has permission;
- limitations and maturity are visible;
- no confidential or personal information remains.

### Commercial credibility

- the case represents actual paid or contracted value;
- scope, exclusions, and delivery evidence are explicit;
- the case shows repeatable judgment, not only technical novelty;
- the result is relevant to the published commercial offer;
- customer/team dependencies are not credited solely to Pranay.

### Technical quality

- the system is reproducible or its operating status is accurately stated;
- screenshots and recordings match the reviewed release;
- important failure/review states are included;
- tests/evals/acceptance evidence support the claim;
- deployment and handoff boundaries are stated.

### Site release

- evidence record status is `approved`;
- case route and metadata are added to sitemap and internal links;
- static budgets remain within limits;
- browser release verification includes the case's primary path;
- `npm run site:local` passes;
- production identity and routes are verified after deployment.

## Redacted fallback

A redacted case can be published only when it still contains enough evidence to be useful:

- real industry and workflow category;
- exact role and scope;
- real direct product evidence using approved synthetic/redacted data;
- observable result with a valid measurement boundary;
- a clear explanation of why identity is withheld.

Do not call an anonymous case “named,” and do not use a customer-like pseudonym that implies permission.

## Completion target

The portfolio's commercial proof gap is materially closed when at least one case passes this gate and demonstrates a paid, bounded engagement from real workflow through working system, direct evidence, measured result, and customer-approved context.
