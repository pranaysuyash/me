## Chapter 11: Fallbacks, Routing, And Stop Conditions Need Evals

**Learning promise:** By the end of this chapter, you will be able to define and test a routing policy that knows when another model call can recover evidence, when human review can resolve ambiguity, and when the only honest action is to stop.

Fallback is not automatically safer.

Sometimes fallback fixes the output. Sometimes fallback creates a cleaner hallucination. The difference is not model quality alone. The difference is the routing rule that decided another call was justified, and the stop condition that decided when computation could no longer create evidence.

Start from first principles. A document-extraction system receives evidence and produces claims. A model call can transform available evidence: it can locate text the first pass missed, repair malformed structure, or interpret a difficult layout. It cannot make an absent fact become present. If a ticket does not show a terminal, a stronger model may produce a more plausible terminal, but plausibility is not support.

This gives us three distinct decisions:

1. **Accept:** the current result satisfies the product contract.
2. **Continue:** another bounded step has a credible way to improve the evidence or interpretation.
3. **Stop or review:** further automation cannot resolve the uncertainty safely.

Routing chooses among processing paths. A stop condition prevents the system from continuing when the next path has no legitimate source of information. Both are product policies, so both need evals.

### Continue Only When The Next Step Has A Job

The cumulative airline-ticket case contains this source:

```text
Passenger: Riya Mehta
Booking Ref / PNR: H7K29Q
Flight: AI 202
Date: 12 Aug 2026
Departure: Delhi
Arrival: Bengaluru
Departure Time: 09:40
Terminal: not shown
Baggage: not shown
```

The contract marks `pnr`, `terminal`, and `baggage` as do-not-infer fields. It also marks flight number as critical and terminal as reviewable. Imagine two first-pass failures.

In the first, the extractor returns no flight number even though `Flight: AI 202` is visible. An OCR crop or targeted fallback has a job: recover visible evidence that the first path missed.

In the second, the extractor returns no terminal because the source contains none. A fallback has no evidence-recovery job. If it returns `Terminal 3`, it has not repaired the extraction. It has violated the contract.

The key routing question is therefore not, “Is a field empty?” It is, “Why is the field empty, and can the next step access information that could resolve that reason?”

Useful evidence states include:

- `supported`: visible evidence supports the value.
- `likely_present`: the document region or layout suggests evidence exists but extraction missed it.
- `not_present_in_document`: the source does not contain the field.
- `unreadable`: the source may contain the field, but image quality prevents a reliable reading.
- `ambiguous`: multiple readings are supported.
- `conflicting`: the source contains incompatible values.
- `not_applicable`: the field does not apply to this document.

These states should drive actions. `likely_present` may justify OCR repair or fallback. `ambiguous` may justify narrow human review. `not_present_in_document` on a do-not-infer field should stop automation. `not_applicable` should stop without warning the user about a nonexistent problem.

### An Executable Routing Pattern

Keep routing policy outside prompt prose so it can be versioned, inspected, and tested. A compact configuration might look like this:

```yaml
routing_policy_version: route_ticket_v2
rules:
  - when:
      field_policy: do_not_infer
      evidence_status: not_present_in_document
    action: stop_and_mark_not_present

  - when:
      field_severity: critical
      evidence_status: likely_present
      attempts_lt: 2
    action: targeted_fallback

  - when:
      field_severity: critical
      evidence_status: [unreadable, ambiguous, conflicting]
    action: human_review

  - when:
      field_severity: optional
      evidence_status: not_present_in_document
    action: accept_with_warning

  - when:
      schema_status: invalid
      attempts_lt: 2
    action: schema_repair

default_action: stop_and_review_policy_gap
```

The default matters. An unmatched state should not silently fall through to “call the largest model.” It should expose a policy gap.

The eval must judge the chosen action as well as the final value:

```yaml
case_id: AIR-146
field: terminal
evidence_status: not_present_in_document
field_policy: do_not_infer
expected_action: stop_and_mark_not_present
actual_action: targeted_fallback
fallback_result: Terminal 3
final_decision: reject_unsupported_inference
route_result: fail
```

Contrast that with a justified continuation:

```yaml
case_id: AIR-147
field: flight_number
evidence_status: likely_present
field_severity: critical
expected_action: targeted_fallback
actual_action: targeted_fallback
fallback_result:
  value: AI 202
  evidence: "Flight: AI 202"
route_result: pass
```

A workflow eval should track false escalation and missed escalation. False escalation means the system continued when it should have stopped, adding cost, latency, or unsupported inference. Missed escalation means it stopped when fallback or review could have recovered a critical value.

### Make Policy Precedence Explicit

Real cases can match several rules. An absent terminal is reviewable, do-not-infer, and missing. If a generic "reviewable missing field" rule runs before the do-not-infer rule, the workflow may create unnecessary review or fallback. Define precedence as part of the policy: evidence prohibitions first, critical recovery second, ambiguity review third, optional-field handling fourth, and a visible default last.

Test collisions deliberately. For every high-risk rule, create a case that also matches a broader rule and assert which one wins. Log the matched rule identifier, not only the resulting action. This turns an invisible ordering accident into a reproducible decision. It also lets a policy reviewer answer a vital question: did the system stop because the evidence required it, or merely because a default happened to run first?

### Reusable Artifact: Route Decision Record

Use this record for every nontrivial branch:

```yaml
route_decision:
  case_id:
  field:
  field_severity: critical | reviewable | optional
  field_policy: infer_allowed | do_not_infer
  evidence_status:
  current_value:
  available_next_steps:
  selected_action:
  expected_action:
  reason:
  attempt_number:
  added_cost:
  added_latency_ms:
  final_value:
  final_evidence:
  decision_result: pass | fail
  failure_type: false_escalation | missed_escalation | none
```

This artifact makes the decision layer visible. It also gives the team a concrete object to aggregate: which fields over-trigger fallback, which layouts need OCR repair, and which review paths never change the outcome.

### Common Failure Modes

**Routing on blankness alone.** A missing critical value, an absent optional value, and an unreadable value are not the same state.

**Using model confidence as evidence status.** A low-confidence value may have clear evidence; a high-confidence value may have none. Confidence cannot tell you whether the document contains a fact.

**Unlimited retries.** Repeating the same call with the same evidence is not a recovery strategy. Bound attempts and record what changes between them.

**Fallback with a broader prompt.** More freedom often increases unsupported completion. Target the uncertain field and require evidence.

**Treating review as the universal escape hatch.** Review has cost. Optional absent fields should not consume human attention unless downstream policy requires it.

**Measuring only final accuracy.** A correct final value can hide unnecessary calls, and a plausible value can hide a policy violation.

### Exercise: Write The Stop Policy

For `AIR-001`, define expected actions for these four situations:

1. `flight_number` is empty, but the source line is visible.
2. `terminal` is empty and no terminal appears in the source.
3. `departure_time` appears once as `09:40` and once as `21:40`.
4. `baggage` is absent and no downstream workflow requires it.

For each, record field severity, evidence status, selected action, maximum attempts, and acceptance condition. Then write one negative eval that proves the route does *not* trigger in the wrong state.

**Expected outcome:** flight number routes to a bounded targeted fallback and must return evidence; terminal stops as `not_present_in_document`; conflicting departure times route to review; baggage stops with an accepted missing status. Your negative eval should catch at least one false escalation, such as calling fallback for terminal.

The system should not only know how to continue. It should know when to stop. Once those decisions are explicit, the next problem is no longer whether you can produce a score. It is whether you can explain every failure well enough to improve the correct layer. That requires logs.

## Chapter 12: Eval Logs Matter More Than Scores

**Learning promise:** By the end of this chapter, you will be able to design an eval log that converts a failed case into an owned, testable improvement instead of leaving the team with an unexplained percentage.

A score tells you that something happened. A log tells you what to do about it.

Suppose an eval reports 84 percent accuracy. You know the system is imperfect. You do not know whether to change the prompt, OCR, schema, lookup data, routing policy, reviewer instructions, or product contract. The score compresses many events into one number. That is useful for comparison and dangerous for diagnosis.

An eval log preserves the causal trail. It connects the input, versions, intermediate decisions, output, expected behavior, failure class, owning layer, and next action. From first principles, this is the difference between measurement and learning. Measurement observes a result. Learning retains enough information to change future behavior.

### Log The Decision Path, Not Just The Answer

Continue the airline-ticket case. `AIR-001` correctly extracts `Delhi`, but the normalized origin becomes `BSL` instead of `DEL`. If the log stores only expected and actual values, the failure looks like a model error. Yet the model may have returned the raw text exactly. The airport lookup table may own the defect.

Now consider an absent terminal that becomes `Terminal 3`. The final field is wrong, but the earlier error was a route decision: fallback should never have run after `not_present_in_document` was established. Fixing the prompt might reduce this one guess while leaving the policy defect intact.

The log needs enough structure to separate three layers:

- **Model:** candidate extraction and evidence selection.
- **Pipeline:** OCR, validation, retry, routing, stop, and review flow.
- **Data/configuration:** schemas, dictionaries, thresholds, labels, and policies.

This separation prevents prompt thrashing: repeatedly editing model instructions for defects that live elsewhere.

### A Structured Log Pattern

Prefer an append-only structured record over free-form notes. JSON Lines works well because each case-run remains independently parseable:

```json
{"run_id":"eval-2026-08-01-01","case_id":"AIR-001","document_type":"airline_ticket","versions":{"model":"extractor_v4","prompt":"ticket_prompt_v7","schema":"ticket_schema_v3","ground_truth":"ticket_gt_v4","routing":"route_ticket_v2","normalization":"iata_map_2026_07"},"expected":{"origin.normalized_value":"DEL","terminal.status":"not_present_in_document"},"actual":{"origin.raw_value":"Delhi","origin.normalized_value":"BSL","terminal.value":"Terminal 3"},"trace":{"fallback_used":true,"stop_decision":"continue"},"errors":[{"type":"normalization_error","owner":"normalization_data"},{"type":"unsupported_inference","owner":"routing_policy"}],"recommended_work_items":["correct Delhi mapping and add lookup regression","block fallback for absent do-not-infer fields"]}
```

One case can contain more than one error. Forcing a single label may hide the sequence that produced the failure. At the same time, do not log every internal variable. Capture what supports diagnosis, audit, and reproduction.

Good log fields include:

- stable run and case identifiers
- source and layout family
- model, prompt, schema, ground-truth, route, and data versions
- raw output and validated output
- expected output and expected route
- evidence status and evidence reference
- retries, fallback, stop, and review decisions
- cost, latency, and review effort
- error type and owning layer
- recommended work item
- whether this case already protects a previous fix

Privacy is part of log design. Production-derived tickets may contain names, booking references, and travel plans. Store sanitized case artifacts, restrict access, and avoid duplicating raw customer content into every telemetry field. A useful audit trail does not require careless replication of sensitive data.

### Preserve Chronology Without Writing A Diary

Some failures only make sense as a sequence. The first model returned invalid JSON; repair succeeded; evidence validation failed; fallback ran; the stop policy rejected its unsupported terminal. A single final record can preserve the outcome, but an ordered event list explains causality:

```yaml
events:
  - step: extraction
    outcome: schema_invalid
  - step: schema_repair
    outcome: valid
  - step: evidence_validation
    outcome: terminal_unsupported
  - step: routing
    outcome: stop_and_mark_not_present
```

Keep events bounded and machine-readable. Do not turn the log into a stream of prose or hidden model reasoning. Record system inputs, decisions, outputs, timestamps, and policy identifiers. This is enough to reproduce the workflow while keeping the diagnostic surface comprehensible.

At the end of each run, derive a summary from the case records rather than maintaining a separate hand-edited scorecard:

```yaml
run_summary:
  cases: 48
  passed: 41
  failed: 7
  errors_by_owner:
    routing_policy: 3
    normalization_data: 2
    ocr: 2
  new_regressions: [AIR-001]
  fixed_regressions: [AIR-033, AIR-091]
```

Because the summary is derived, a reader can trace every count back to cases. The dashboard remains convenient without becoming a second source of truth.

### Turn Repeated Failures Into Work

Logs become valuable when they change prioritization. Aggregate failures by error type, owner, layout family, field, and route. Then ask:

- How often does this occur?
- What is the product risk?
- Does one root cause explain multiple cases?
- Which layer can fix it without weakening another contract?
- What regression set will prove the fix holds?

For example, three failures can point to one work item:

```yaml
work_item:
  title: Correct airport normalization for city-name inputs
  source_cases: [AIR-001, AIR-091, AIR-118]
  failure_pattern: raw city preserved but IATA lookup returned wrong code
  owning_layer: normalization_data
  severity: high
  acceptance_criteria:
    - Delhi maps to DEL
    - Bengaluru maps to BLR
    - raw values remain preserved
    - unknown city names do not receive guessed codes
  verification:
    - three source cases pass
    - full normalization regression set passes
```

The source cases preserve evidence for why the work exists. The acceptance criteria prevent a vague “improve normalization” task. The regression requirement prevents the fix from becoming a one-case patch.

### Reusable Artifact: Eval Failure Card

Use this compact template during triage:

```yaml
eval_failure:
  run_id:
  case_id:
  observed_at:
  input_family:
  risk_tags: []
  versions:
    model:
    prompt:
    schema:
    ground_truth:
    routing:
    data:
  expected:
  actual:
  evidence_status:
  route_taken:
  error_types: []
  owning_layers: []
  user_impact:
  recurrence_count:
  recommended_work_item:
  acceptance_criteria: []
  regression_cases: []
  owner:
  status: observed | triaged | fixing | verified | accepted_risk
```

This card is a bridge between eval tooling and project management. It should be generated from structured logs where possible, then reviewed by a person before becoming a task. Automation can group symptoms; product judgment decides priority and ownership.

### Common Failure Modes

**Only logging failures.** Passing cases are needed to reproduce rates, compare versions, and detect damage caused by a fix.

**Overwriting runs.** Mutable logs erase history. Keep run records append-only and write corrections as new events.

**Missing version identifiers.** “The prompt failed” is not reproducible if you cannot identify the prompt, schema, routing, and data used.

**Free-form error labels.** `bad output`, `wrong`, and `hallucination-ish` cannot support reliable aggregation. Use a controlled taxonomy and a notes field for nuance.

**Assigning every failure to the model.** This hides OCR, data, policy, and review defects.

**Creating work items without acceptance criteria.** A ticket titled “improve extraction” cannot become a release check.

**Logging sensitive documents indiscriminately.** Observability that creates a privacy incident is not trustworthy engineering.

### Exercise: Diagnose Before You Fix

Create three failure cards for the airline case:

1. `origin.raw_value` is `Delhi`, but normalized value is `BSL`.
2. terminal fallback returns `Terminal 3` without evidence.
3. `Flight: AI 202` is visible, but OCR emits `Al 202` and the extractor copies it.

For each case, name the primary error type, owning layer, user impact, recommended work item, and two acceptance criteria. Do not propose a prompt change unless the model layer actually owns the failure.

**Expected outcome:** the first card routes to normalization data, the second to routing policy, and the third to OCR or character-repair logic. Each card should identify a regression case and enough version information to reproduce the run.

Scores help you compare. Logs help you learn. Regression logs help you keep what you learned. But individual logs are still episodes. To retain lessons across releases, the cases themselves need durable purpose, metadata, and stewardship. The eval set must become product memory.

## Chapter 13: Your Eval Set Is Product Memory

**Learning promise:** By the end of this chapter, you will be able to build and maintain an eval-set manifest that records what each case protects, how it should behave, and when changing or retiring it is legitimate.

An eval set is not a folder of examples. It is product memory.

It remembers what the product has learned about reality: formats users upload, fields that matter downstream, layouts that break OCR, values that should never be inferred, review decisions that settled ambiguity, and failures that once escaped. When a case is added after a production defect, it is the durable form of that lesson.

This is why random scale can be misleading. One thousand convenient, clean files may teach less than forty deliberately selected cases covering distinct risks. The purpose of an eval set is not to resemble a warehouse. It is to preserve the product’s obligations and known failure boundaries.

### Cases Need Reasons

Return to the airline-ticket workflow. `AIR-001` exists because the source omits terminal and baggage while requiring airport normalization. It protects three rules:

1. Do not infer terminal.
2. Do not infer baggage allowance.
3. Normalize `Delhi` and `Bengaluru` without losing the raw values.

If the repository stores only `air_ticket_001.pdf` and `expected.json`, a future maintainer sees an odd incomplete document. They may “clean up” the fixture, add missing terminal data, or remove it as redundant. A manifest explains that the incompleteness is the point.

```yaml
case_id: AIR-001
source: synthetic_from_documented_case
document_type: airline_ticket
layout_family: plain_text_itinerary
risk_tags:
  - missing_terminal
  - missing_baggage
  - do_not_infer
  - airport_normalization
expected_route: accept_with_warning
included_because: protects against fallback filling absent fields
protects:
  - terminal remains not_present_in_document
  - baggage remains not_present_in_document
  - Delhi maps to DEL
  - Bengaluru maps to BLR
owner: extraction_eval
last_reviewed: 2026-07-07
```

The source label matters. A synthetic case, a licensed fixture, and a sanitized production sample have different provenance and handling requirements. Do not imply that a constructed case came from production. Do not retain sensitive production data merely because it is useful.

### Design A Portfolio, Not A Pile

A useful eval set balances several roles:

- **Golden cases:** common, clean examples that protect the ordinary path.
- **Hard cases:** degraded scans, unusual layouts, multi-segment tickets, and multiple passengers.
- **Inference traps:** plausible but absent terminal, baggage, seat, or fare details.
- **Routing cases:** examples that should trigger fallback, review, warning, or immediate stop.
- **Normalization cases:** city names, airport names, code variants, and unknown values.
- **Regression cases:** failures fixed in previous releases.
- **Drift probes:** recent input formats that test whether reality has shifted.

The distribution should reflect product risk, not only traffic volume. If unsupported PNR inference is rare but severe, it still deserves strong coverage. If one airline layout represents most traffic, clean and hard cases from that layout deserve proportional presence. Selection combines frequency, impact, and known uncertainty.

Maintain a small coverage matrix beside the manifest. Rows can represent layout families; columns can represent risk tags such as missing evidence, OCR damage, multi-entity association, normalization, and review. The matrix does not prove completeness, but empty cells expose assumptions. A team may discover that it has five missing-terminal cases, all from plain-text itineraries, and no inference trap from a dense two-column PDF. That is a more actionable gap than "we need more data."

Coverage also needs counterexamples. If one case proves that an absent terminal must stop, another should prove that a visible terminal can be accepted, and a third should prove that a blurry but likely present terminal routes to review. Together they protect the boundary, not merely one side of it.

Google’s production ML material emphasizes that real-world systems include testing, monitoring, and components beyond model training.[^google-mlcc] Its production ML systems guidance similarly treats component health as part of the system rather than an afterthought.[^google-prod-ml] The practical implication here is simple: the eval set must remain connected to changing inputs, pipeline components, and product policy.

### Version The Memory

“Correct” can change. The product may add a required downstream check, split `airport` into raw and normalized fields, or change terminal from optional to reviewable. When the contract changes, ground truth and expected routes may also change.

Version at least:

- eval-set membership
- ground truth
- schema
- scoring policy
- routing policy
- normalization data
- review policy

Do not silently edit an expected output and rerun the leaderboard. Record why it changed and which decision authorized it. Otherwise an apparent improvement may be only a moved goalpost.

A release manifest can pin the complete evaluation context:

```yaml
eval_release: ticket_eval_2026_08_01
cases_manifest: air_cases_v5
ground_truth_version: ticket_gt_v4
schema_version: ticket_schema_v3
scoring_policy_version: score_ticket_v2
routing_policy_version: route_ticket_v2
normalization_version: iata_map_2026_07
review_policy_version: review_ticket_v2
case_count: 48
changes:
  added: [AIR-146, AIR-147]
  updated: [AIR-001]
  retired: []
```

### Add, Review, And Retire Deliberately

Add a case when it represents a new risk, a recurring pattern, a product-contract decision, or a failure worth preventing. Do not add every production document. Duplicate cases increase maintenance without necessarily increasing knowledge.

Review the set on a schedule and after meaningful changes. Look for missing layout families, stale policies, overrepresented easy cases, unused tags, reviewer disagreement, and cases that no longer match the product.

Retirement is legitimate when a document type is no longer supported, a contract has been intentionally removed, or several cases truly protect the same behavior. Preserve a retirement note:

```yaml
case_id: AIR-019
retired_in: air_cases_v5
reason: duplicate of AIR-004 after layout-family consolidation
replacement_case: AIR-004
approved_by: extraction_eval_owner
evidence_preserved: true
```

This avoids two extremes: carrying every historical artifact forever, and deleting inconvenient memory without explanation.

### Reusable Artifact: Eval Case Manifest

```yaml
case_id:
title:
source: synthetic | sanitized_production | licensed_fixture
source_date:
document_type:
layout_family:
risk_tags: []
expected_route:
expected_fields:
must_not: []
versions:
  ground_truth:
  schema:
  review_policy:
included_because:
protects: []
linked_failure_ids: []
privacy_classification:
owner:
created_at:
last_reviewed:
retirement_criteria:
```

Treat required fields as validation rules. A case without `included_because`, `protects`, or an owner should fail manifest validation. Product memory without context is just storage.

### Common Failure Modes

**Building from whatever files are easiest to collect.** Convenience creates a biased set that misses costly edge cases.

**Chasing case count.** More near-duplicates make the score look statistically substantial while adding little behavioral coverage.

**No clean-pass regression cases.** A fix for hard tickets can damage ordinary tickets unless both remain in the set.

**Silent ground-truth edits.** Changing expected values without versions corrupts comparisons across runs.

**Production drift ignored.** Airlines redesign emails, users switch from PDFs to screenshots, OCR behavior changes, and new model versions shift outputs.

**Fixtures without provenance.** Teams can neither assess representativeness nor apply the right privacy controls.

**Retiring weird cases because they look messy.** Mess is often the evidence that reality does not match the happy path.

### Exercise: Curate A Twelve-Case Memory

Design a twelve-case airline-ticket eval set. Include at least three golden cases, two inference traps, two routing cases, two normalization cases, one multi-passenger case, one poor-image case, and one regression case. A case may carry multiple roles, but explain each inclusion.

Write a manifest entry for `AIR-001`, then define one trigger for adding a new case and one criterion for retiring an old case. Finally, pin the versions required to reproduce a run.

**Expected outcome:** a small, intentional portfolio whose cases cover common behavior and high-risk failures. Every case has provenance, purpose, expected route, protected behavior, and ownership. The set can change without erasing why earlier cases existed.

The eval set remembers what the product has learned, but memory alone does not decide what to trust. At runtime, each field still needs an honest relationship among value, evidence, uncertainty, and action. The next chapter turns that relationship into a reviewable product contract.

## Chapter 14: Confidence, Evidence, And Human Review Build Trust

**Learning promise:** By the end of this chapter, you will be able to represent extraction uncertainty without collapsing it into one confidence number and design a narrow human-review path that produces both a safe decision and reusable feedback.

Confidence is not correctness.

A model can be confidently wrong. A correct value can receive low confidence because the scan is blurry. A value can be extracted correctly and normalized incorrectly. A field can be absent rather than unknown. These distinctions determine whether the system should accept, warn, reject, retry, or ask a person.

Trust does not come from making uncertainty disappear. It comes from making uncertainty inspectable and giving each state an honest action.

### Separate The Claims

An extracted field contains several claims that are often collapsed into one:

1. **Value claim:** what does the field say?
2. **Evidence claim:** where does the source support it?
3. **Status claim:** is it supported, normalized, absent, unreadable, ambiguous, or conflicting?
4. **Workflow claim:** what did the system do because of that status?

Keep them separate:

```json
{
  "field": "pnr",
  "raw_value": "H7K29Q",
  "normalized_value": "H7K29Q",
  "evidence": [
    {"page": 1, "text": "Booking Ref / PNR: H7K29Q", "bbox": [128, 441, 312, 463]}
  ],
  "status": "supported",
  "confidence": 0.94,
  "action": "accept"
}
```

Confidence can remain as a signal, but it does not replace evidence or status. A field with `confidence: 0.99` and no evidence still fails a do-not-infer policy.

For the missing terminal:

```json
{
  "field": "terminal",
  "raw_value": null,
  "normalized_value": null,
  "evidence": [],
  "status": "not_present_in_document",
  "confidence": null,
  "action": "accept_with_warning"
}
```

For a blurry flight number:

```json
{
  "field": "flight_number",
  "raw_value": "AI 2?2",
  "normalized_value": null,
  "evidence": [{"page": 1, "text": "AI 2?2", "bbox": [90, 280, 171, 302]}],
  "status": "unreadable",
  "confidence": 0.41,
  "action": "review"
}
```

The reviewer now knows what question to answer. They are not being asked to judge whether the whole document “looks okay.”

### Human Review Is A Product Path

Review is not where AI fails. It is where unresolved uncertainty becomes a controlled decision and structured feedback.

A good review path should show:

- the proposed value and raw value
- the exact evidence region in context
- the field’s product policy and downstream consequence
- why the system routed to review
- allowed decisions
- a correction reason
- whether the case should join the eval set

For a conflicting departure time, ask:

```text
Field: departure_time
Candidate values: 09:40, 21:40
Evidence: two highlighted source regions
Policy: departure time is reviewable; conflicts cannot be auto-accepted
Question: Which value is the scheduled departure time for AI 202 on 12 Aug 2026?
Allowed decisions: 09:40 | 21:40 | unresolved | not applicable
Correction reason: layout association | OCR error | source conflict | other
Add to eval set? yes | no
```

The narrow question reduces reviewer interpretation and creates data the system can learn from. “Does this look okay?” produces neither consistent decisions nor useful feedback.

### Calibrate The Reviewers And The Rules

Two reviewers can disagree even when both are careful. That disagreement is evidence. It may reveal unclear policy, insufficient source context, confusing labels, or a genuine product ambiguity.

Run calibration on a shared sample. Compare decisions field by field. For each disagreement, identify whether the fix belongs in:

- the ground-truth definition
- the review instruction
- the evidence shown
- the status taxonomy
- the user interface
- the product contract

Do not force agreement by hiding edge cases. Resolve the decision rule or preserve `unresolved` as an honest outcome.

Solo builders need calibration too. The risk is judging today’s output by mood, memory, or hope. Write the rule before seeing the candidate result. Review a shuffled mix of old and new outputs so knowledge of which system produced them does not bias the decision.

### Review Effort Is A Design Signal

Measure more than whether a reviewer changed the answer. A field that reviewers always accept may be eligible for safer automation. A field that takes two minutes to investigate but changes only once in a hundred reviews may need better evidence presentation or a different routing threshold. A field with frequent disagreement needs a clearer contract before more automation.

Track review duration, number of evidence regions opened, correction reason, and whether the reviewer could decide. Use those measures to improve the workflow, not to pressure reviewers into faster guesses. The goal is to remove unnecessary cognitive work while preserving the moments where human judgment protects the user.

NIST’s trustworthy AI framing includes accountability, transparency, explainability, and reliability among the characteristics that matter.[^nist-ai-rmf] A small team does not need a theatrical governance program to begin. Evidence links, explicit statuses, review records, and named decision rules are concrete starting points.

### An Implementation Boundary

The validator should reject incoherent field states before they reach a user or reviewer:

```python
def validate_field(record: dict) -> list[str]:
    errors: list[str] = []
    status = record["status"]
    evidence = record.get("evidence", [])
    value = record.get("raw_value")

    if status in {"supported", "normalized"} and not evidence:
        errors.append("supported values require source evidence")
    if status == "not_present_in_document" and value is not None:
        errors.append("not_present_in_document fields cannot contain a value")
    if status == "normalized" and record.get("normalized_value") is None:
        errors.append("normalized status requires normalized_value")
    if status in {"ambiguous", "conflicting", "unreadable"} \
            and record.get("action") not in {"review", "stop"}:
        errors.append("unresolved evidence state requires review or stop")
    return errors
```

This is not a truth detector. It is a contract guard. It prevents contradictory representations, such as a supported value with no evidence or an absent field containing a guessed value.

### Reusable Artifact: Review Decision Record

```yaml
review_decision:
  review_id:
  case_id:
  field:
  candidate_value:
  raw_value:
  evidence_references: []
  evidence_status:
  route_reason:
  field_policy:
  downstream_impact:
  question:
  allowed_decisions: []
  reviewer_decision:
  corrected_value:
  correction_reason:
  reviewer_id:
  review_duration_seconds:
  policy_version:
  add_to_eval_set: false
  notes:
```

This record supports audit, calibration, operational metrics, and case selection. Measure review rate, correction rate, disagreement rate, fields per review, and time per decision. Human effort is part of the eval, not free capacity outside it.

### Common Failure Modes

**A single confidence threshold controls everything.** Different fields and statuses carry different risks. Thresholds cannot replace policy.

**Confidence displayed as probability of correctness.** Unless calibrated for that exact claim and distribution, the number can mislead users.

**Evidence snippets without context.** A cropped phrase may support the wrong passenger or segment. Show enough surrounding structure to establish association.

**Reviewing the whole document for one uncertain field.** Broad review increases time and inconsistency.

**No `unresolved` decision.** Forcing reviewers to choose one candidate manufactures certainty.

**Corrections disappear after acceptance.** A corrected value without a reason, log, or eval case wastes the feedback.

**Reviewer disagreement treated as reviewer failure.** Repeated disagreement often means the contract is unclear.

### Exercise: Design A Narrow Review

Using the airline case, create review records for:

1. a supported PNR with clear evidence,
2. an absent terminal,
3. two conflicting departure times,
4. an origin correctly extracted as `Delhi` but incorrectly normalized as `BSL`.

Decide which cases need human review. For those that do, write the exact question, allowed decisions, correction reasons, and downstream impact. For those that do not, explain which deterministic rule resolves them.

**Expected outcome:** the supported PNR is accepted automatically; the absent terminal is marked `not_present_in_document` without review unless a downstream policy explicitly requires it; conflicting times receive narrow review; the normalization error routes to a deterministic lookup correction rather than asking a reviewer to re-extract `Delhi`.

Trust is created by inspectable behavior, not confident language. Yet even a perfect field record can be produced by a broken surrounding workflow. The final chapter in this sequence widens the evaluated object from model output to the complete path the user experiences.

## Chapter 15: Test The Pipeline, Not Just The Model

**Learning promise:** By the end of this chapter, you will be able to define a layered pipeline eval that locates failures across model, workflow, and data/configuration components and verifies the final product decision, not merely the model’s JSON.

When an AI workflow fails, the model is only one suspect.

The defect may live in document intake, OCR, layout parsing, chunking, prompt construction, model selection, schema validation, JSON repair, evidence linking, normalization data, routing, fallback, stop conditions, review instructions, or a downstream API. If the eval starts immediately before the model call and ends immediately after it, all of those components remain untested.

The user does not experience a model in isolation. The user experiences the pipeline.

### Define The Evaluated Object

From first principles, a system is a sequence of state transformations. Each stage receives an input, applies a contract, and produces an output or explicit failure. A pipeline eval asks whether each important transition preserved the evidence and policy needed by the next stage.

For airline-ticket extraction, the path might be:

```text
upload
  -> document classification
  -> OCR and layout extraction
  -> field candidate extraction
  -> schema validation
  -> evidence linking
  -> normalization
  -> routing and stop policy
  -> human review when required
  -> final decision
  -> downstream itinerary record
```

Each arrow is a possible loss of truth. OCR can change `AI 202` to `Al 202`. Chunking can separate a passenger name from the matching segment. JSON repair can drop an evidence array. Normalization can map Delhi to the wrong code. Routing can accept a conflict because the schema is valid. The final JSON may be well formed while the product behavior is wrong.

### The Three-Layer Rule

Separate the system into three layers during diagnosis:

1. **Model layer:** prompts, model choice, decoding, candidate extraction, and evidence selection.
2. **Pipeline layer:** intake, OCR flow, validation, retries, fallback, routing, review, storage, and audit.
3. **Data/configuration layer:** schemas, dictionaries, normalization maps, field policies, thresholds, templates, and scoring rules.

A model upgrade does not fix a broken lookup table. A better prompt does not fix missing review policy. A passing extraction does not prove production readiness.

Consider this case:

```yaml
case_id: AIR-088
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
failure_layer: pipeline.routing_policy
```

The model succeeded: it preserved both times. The pipeline failed by treating schema validity as permission to accept.

Another case:

```yaml
case_id: AIR-091
expected:
  origin.raw_value: Delhi
  origin.normalized_value: DEL
actual:
  origin.raw_value: Delhi
  origin.normalized_value: BSL
failure_layer: data.normalization_lookup
```

Again, rewriting the prompt attacks the wrong layer.

### Contract Tests At Every Boundary

Build assertions around high-value transitions. A pipeline case can declare stage expectations:

```yaml
case_id: AIR-001
input:
  document: fixtures/AIR-001.txt
stage_expectations:
  classification:
    document_type: airline_ticket
  ocr:
    contains:
      - "Booking Ref / PNR: H7K29Q"
      - "Flight: AI 202"
  extraction:
    pnr.raw_value: H7K29Q
    terminal.status: not_present_in_document
  evidence_linking:
    required_for: [pnr, flight_number, origin, destination]
  normalization:
    origin.normalized_value: DEL
    destination.normalized_value: BLR
  routing:
    fallback_for_terminal: false
    final_action: accept_with_warning
  final_output:
    must_not_contain_inferred: [terminal, baggage]
```

Not every case needs every stage assertion. Add assertions where the case protects a known risk. Too many incidental snapshots make tests brittle; too few boundary checks make diagnosis vague.

### Keep The Oracle Independent

An eval is only meaningful when its expected result comes from a source more trustworthy than the system being tested. Do not generate expected airport codes with the same lookup table under evaluation or let the candidate model write its own ground truth. For `AIR-001`, the oracle combines the source document, the versioned product contract, and independently reviewed normalization expectations.

When an expected result is ambiguous, encode the permitted set or required review action instead of manufacturing one exact answer. The oracle can say "route conflicting departure times to review" even when it cannot choose the correct time automatically. This preserves the distinction between testing system behavior and pretending every source has one machine-decidable truth.

At runtime, record a trace identifier across stages. The eval runner should collect stage outputs under that identifier so a final failure can be traced backward. The trace should include versions and decisions, not hidden chain-of-thought. You need reproducible system facts: which OCR text was used, which policy matched, which fallback ran, and which evidence supported acceptance.

### Test Failures, Not Only Happy Paths

Pipeline behavior under failure is part of the contract. Include tests for:

- unsupported file type and corrupt upload
- low-quality OCR and missing page
- schema-invalid model output
- timeout and retry exhaustion
- fallback returning unsupported values
- stale or missing normalization entries
- conflicting fields
- reviewer choosing `unresolved`
- duplicate processing of the same document
- downstream write failure after extraction succeeds

For duplicate processing, verify that retries do not create multiple itinerary records or duplicate review tasks. For partial failure, preserve the trace and stage status so an operator can resume or safely retry. For a downstream write failure, do not tell the user extraction failed if extraction succeeded; report the actual state and recovery action.

### Reusable Artifact: Pipeline Eval Specification

```yaml
pipeline_eval:
  case_id:
  risk_tags: []
  input_artifact:
  versions:
    classifier:
    ocr:
    model:
    prompt:
    schema:
    routing:
    normalization:
    review_policy:
  expected_stages:
    intake:
    classification:
    ocr:
    extraction:
    validation:
    evidence_linking:
    normalization:
    routing:
    review:
    persistence:
  expected_final_decision:
  must_not: []
  operational_limits:
    max_attempts:
    max_cost:
    p95_latency_ms:
  recovery_expectation:
  observability_expectation:
  owner:
```

This specification links correctness, operations, and recovery. It also makes clear which component versions produced the result.

### A Layered Test Strategy

Use different tests for different questions:

- **Component tests** check deterministic validators, mappings, and policies quickly.
- **Recorded model-output tests** exercise downstream pipeline behavior without paying for a live call.
- **Integration evals** run representative documents through multiple real stages.
- **End-to-end evals** verify upload through final stored decision and review workflow.
- **Production-like probes** use sanitized current formats to detect drift.

Do not run the most expensive suite for every edit, but do not let speed become an excuse to ship high-risk changes with component tests alone. The release gate should select depth according to the changed layer and failure cost.

### Common Failure Modes

**Testing only the final JSON.** This hides where evidence was lost and why the final decision was made.

**Mocking every boundary.** A suite can pass while real OCR, storage, or routing integration is broken.

**Only testing model changes.** Schema, data, and policy changes can alter customer behavior without touching the model.

**No version capture.** Pipeline results cannot be reproduced when one hidden configuration changed.

**Treating valid schema as valid meaning.** JSON validity says nothing about evidence support or product policy.

**No recovery assertions.** A detected failure is not operationally complete if retry, resume, or review behavior is unknown.

**End-to-end tests without stage evidence.** They detect failure but make diagnosis slow. Preserve meaningful stage outputs and route decisions.

### Exercise: Build The End-To-End Case

Write a pipeline eval specification for `AIR-001`. Add stage assertions for intake, OCR, extraction, evidence linking, normalization, routing, and final persistence. Then create three variants:

1. OCR changes `AI 202` to `Al 202`.
2. the airport lookup maps `Delhi` to `BSL`.
3. fallback fills absent terminal with `Terminal 3`.

For each variant, name the failing layer, expected system action, operator-visible evidence, and regression test that should remain after the fix.

**Expected outcome:** the base case finishes as `accept_with_warning`, preserves supported fields and evidence, maps airports correctly, and leaves terminal and baggage absent. The variants fail respectively in OCR, data/configuration, and routing. None should be mislabeled as a generic model failure, and each should leave a trace that explains what happened and what can be retried or corrected.

Testing the pipeline closes the gap between a promising model output and a trustworthy product workflow. The next chapter can now move from visibility to operation: observability as the interface through which builders and operators understand successes, retries, failures, and recovery in the running system.
