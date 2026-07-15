## Chapter 1: No Claim Without Evidence

### Learning promise

By the end of this chapter, you will be able to separate a plausible AI output from a supported product claim. You will define a field-level evidence record, apply it to an airline-ticket extraction, and decide what the system should do when the document is silent.

The first rule is not about AI.

It is about engineering honesty.

Do not say the bug is fixed unless you reproduced the original failure and verified the new behavior. Do not say the tests pass unless the tests were run. Do not say the UI works unless it was inspected in the real surface where the user will see it. Do not say an extraction is correct unless the value can be traced to the source.

That last sentence is where the rule becomes an AI product rule.

AI systems are unusually vulnerable to unsupported claims because their output often looks finished. It has grammar. It has structure. It has confidence. It fills in missing context in a way humans find natural.

But naturalness is not correctness.

### A claim is a value plus a reason to trust it

Start from first principles. A product does not merely display values; it causes people and systems to act on them. A flight number may drive a status lookup. A departure date may schedule a notification. A baggage allowance may become a customer-facing promise. The moment an extracted value affects a decision, the value is a claim.

A claim has at least four parts:

1. **Value:** What does the system say?
2. **Provenance:** Where did that value come from?
3. **Interpretation:** Was it copied, normalized, inferred, or reviewed?
4. **Decision:** What may the product do with it?

This gives us a practical definition of correctness. A value is not ready merely because it matches a schema. It is ready when the value and its provenance satisfy the product's policy for the action that follows.

Consider the ticket we will use throughout these chapters:

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

The model returns:

```json
{
  "passenger_name": "Riya Mehta",
  "flight_number": "AI 202",
  "departure_date": "2026-08-12",
  "origin": "DEL",
  "destination": "BLR",
  "pnr": "H7K29Q",
  "terminal": "Terminal 3",
  "baggage": "15kg"
}
```

At a glance, this looks good. It is complete. It is clean. It has the right shape. But terminal and baggage are unsupported. The document explicitly does not show them.

If the workflow accepts those values, it has crossed a line. The model did not extract. It inferred.

Extraction means the value came from the source. Normalization means a supported source value was transformed under a declared rule, such as `Delhi` to `DEL`. Inference means the value came from reasoning, prior knowledge, or a guess. Inference is not always wrong; some products need it. But inference must be labeled and governed by a different contract. A ticket extractor should not quietly turn guesses into document facts.

### Implementation pattern: the evidence record

The smallest useful implementation is a field record that travels with the value:

![Evidence trail diagram: a source span supports a field record, which passes through validation and policy before becoming a product decision](../assets/diagrams/evidence-trail.svg)

```json
{
  "field": "terminal",
  "raw_value": null,
  "normalized_value": null,
  "status": "not_present",
  "evidence": [],
  "action": "accept_with_warning",
  "notes": "Do not infer from airport or route"
}
```

Compare that with a supported and normalized field:

```json
{
  "field": "origin",
  "raw_value": "Delhi",
  "normalized_value": "DEL",
  "status": "normalized",
  "evidence": ["Departure: Delhi"],
  "action": "accept",
  "notes": "Mapped with iata_airports_v2026_07"
}
```

The record does not require elaborate infrastructure. Evidence may begin as an exact text span. For images, it may become a page number and bounding box. For email, it may be a message ID and quoted span. What matters is that an operator can move backward from the product claim to the source.

Evidence also needs a negative vocabulary. An empty evidence array is ambiguous by itself. Did the linker fail? Was the source unreadable? Was the value not present? Use explicit statuses such as:

- `supported`
- `normalized`
- `inferred`
- `not_present`
- `unreadable`
- `ambiguous`
- `conflicting`
- `requires_review`

These are not decorative labels. Each should map to a permitted action. For example, `supported` may flow downstream, `normalized` may flow with both raw and normalized values preserved, `inferred` may be prohibited for a PNR, and `ambiguous` may route to review.

The strength of evidence should also match the consequence of the claim. A missing meal preference may need only an honest `not_present` label. A PNR used to retrieve or modify a booking needs exact evidence, strict character preservation, and possibly review after an OCR conflict. Evidence engineering is therefore not the demand that every field receive maximum ceremony. It is the practice of matching proof to risk.

This proportionality keeps the habit usable. If every optional field triggers review, operators learn to ignore warnings. If every critical field flows through on plausibility, users absorb the risk. Define the consequence first, then require enough evidence to authorize it. The question is not "How confident does the answer sound?" It is "What evidence must exist before this particular action is allowed?"

### Reusable artifact: the claim-evidence ledger

Use this template before deciding whether an AI output is acceptable:

```yaml
claim_id:
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
verified_at:
```

The ledger creates a discipline: every accepted claim must answer "why may the product trust this?" It also gives future evals something concrete to score: evidence coverage, unsupported inference, review decisions, and policy compliance.

### Common failure modes

**Completeness bias.** Teams reward filled fields and treat `null` as failure. The model learns, directly or indirectly, that a plausible guess looks better than honest absence.

**Evidence as explanation.** A sentence such as "Terminal 3 is common for this route" explains a guess; it does not prove the value was on the ticket. Evidence must point to the source, not to the model's rationale.

**Normalization without raw value.** Storing only `DEL` erases whether the document said `Delhi`, `DEL`, or something else. Preserve both so extraction and mapping failures can be separated.

**One confidence score.** A number such as `0.92` does not tell you whether the field was observed, inferred, normalized, or disputed. Status and provenance must carry the semantics.

**Evidence captured but ignored.** A system can store evidence and still accept values with no evidence. The decision policy must enforce the record.

### Exercise: audit the ticket claims

1. Create one ledger entry each for `pnr`, `origin`, `terminal`, and `baggage`.
2. Label each claim as extracted, normalized, or unsupported.
3. Choose an action for each field.
4. Write one sentence explaining why `Terminal 3` cannot be accepted even if it happens to be factually correct in the real world.

**Expected outcome:** `pnr` is supported and accepted; `origin` preserves raw `Delhi`, normalizes to `DEL`, and is accepted; `terminal` and `baggage` have no source evidence, become `not_present`, and are either accepted with a warning or reviewed according to product policy. Your explanation should distinguish real-world truth from document-supported truth: the extraction product is claiming what the document says, not what external knowledge suggests.

The best AI systems are not the ones that always answer. They are the ones that know what kind of answer they are giving. The next chapter examines the deeper bug that appears when a product forgets this distinction: it grants trust before the output has earned it.

## Chapter 2: Premature Confidence Is The Real Bug

### Learning promise

By the end of this chapter, you will be able to identify where uncertainty is accidentally converted into certainty. You will replace a single "valid" flag with an operational status model and design downstream permissions that reflect what the system actually knows.

Most early AI failures look like model failures.

The model hallucinated. The prompt was vague. The fallback chose the wrong field. The output parser broke.

Those may be the visible failures. Underneath them is often a deeper bug: premature confidence.

Premature confidence is what happens when a system acts as if an uncertain output has already earned trust. It is not merely a model behavior. It is a transition error in the product: uncertain input enters one side, but a trusted fact emerges without an evidence-producing step in between.

### Where confidence leaks into a system

Premature confidence appears in code:

```python
terminal = model_output["terminal"]
booking.terminal = terminal
```

The assignment silently treats presence as proof. The system should instead ask whether the value is supported and whether its status permits the write:

```python
record = verify_field(
    field="terminal",
    candidate=model_output.get("terminal"),
    source=document_text,
    policy=field_policies["terminal"],
)

if record.action == "accept":
    booking.terminal = record.normalized_value or record.raw_value
elif record.action == "review":
    review_queue.add(record)
```

It appears in product language. "Your travel details are verified" is a stronger statement than "We extracted six details and flagged two for review." The first describes a completed assurance process. The second describes the evidence that actually exists.

It appears in dashboards that show a green check because JSON parsed successfully. It appears in APIs that omit uncertainty because downstream clients prefer simple strings. It appears in demos where every blank is filled because an incomplete screen looks less impressive.

All of these collapse different questions:

- Did the model return a value?
- Did the output match the expected type?
- Does the source support the value?
- Did normalization preserve the meaning?
- May the product act on the value?

Each question requires different evidence. A JSON schema can prove that `terminal` is a string or `null`. It cannot prove that `Terminal 3` appears in the document. Type correctness is not semantic correctness, and semantic correctness is not yet authorization for a downstream action.

### Confidence is a state, not a mood

The word *confidence* often tempts teams toward a floating-point score. But a score without semantics is difficult to operate. What should a workflow do with `0.83`? Is that high for a passenger name? Low for baggage? Was the number produced by the model, an OCR engine, a calibrator, or a heuristic?

A better starting point is a finite set of states with explicit transitions:

```text
candidate
  -> supported
  -> normalized
  -> not_present
  -> unreadable
  -> ambiguous
  -> conflicting
  -> requires_review
  -> rejected
```

These states describe knowledge, not emotion. They also make policy executable. A supported passenger name can be shown. A normalized airport code can be used if the raw value is retained. An ambiguous departure time can be shown with a warning or held for review. An unsupported terminal is rejected even when the string looks plausible.

For the cumulative ticket, the schema-valid output contains two dangerous values:

```json
{
  "terminal": "Terminal 3",
  "baggage": "15kg"
}
```

Both strings satisfy their types. Neither satisfies the source contract. The honest representation is:

```json
{
  "terminal": {
    "value": null,
    "status": "not_present",
    "action": "accept_with_warning"
  },
  "baggage": {
    "value": null,
    "status": "not_present",
    "action": "accept_with_warning"
  }
}
```

The second output looks less complete. It is more correct.

This is why evals must reward restraint. If scoring rewards only populated fields, the model is penalized for saying "not present." If reviewers are asked to minimize blanks, they will approve guesses. If product copy hides review and uncertainty, the organization will optimize for a green surface instead of a trustworthy workflow.

The fix is not pessimism. The fix is explicit confidence.

There are two dimensions here that should not be collapsed. The first is **epistemic state**: what the system knows about the relationship between value and source. The second is **product consequence**: what happens if the value is wrong. A supported optional note and a supported PNR share an epistemic state but not a risk level. An ambiguous terminal and an ambiguous PNR share uncertainty but may require different actions.

Model the dimensions separately. Let status describe knowledge, field policy describe consequence, and the decision function combine them. This prevents a single threshold from pretending that all fields, users, and downstream actions have the same tolerance for error.

### Implementation pattern: status-driven permissions

Define field policy separately from model output:

```yaml
fields:
  pnr:
    allowed_statuses: [supported]
    on_violation: review
    do_not_infer: true
  origin:
    allowed_statuses: [supported, normalized]
    on_violation: review
    preserve_raw_value: true
  terminal:
    allowed_statuses: [supported, not_present]
    on_violation: reject_field
    do_not_infer: true
  baggage:
    allowed_statuses: [supported, not_present]
    on_violation: reject_field
    do_not_infer: true
```

Then make downstream behavior a pure decision over the record and policy:

```python
def decide(record: FieldRecord, policy: FieldPolicy) -> str:
    if record.status not in policy.allowed_statuses:
        return policy.on_violation
    if policy.do_not_infer and record.status == "inferred":
        return policy.on_violation
    if record.status == "not_present":
        return "accept_with_warning"
    return "accept"
```

The model proposes values. The policy grants permissions. This boundary prevents model fluency from becoming product authority.

### Reusable artifact: confidence transition table

```yaml
status: supported
meaning: exact source evidence supports the raw value
required_evidence: source locator and excerpt
allowed_actions: [display, persist, use_downstream]
forbidden_actions: []
next_states: [normalized, conflicting, requires_review]

status: inferred
meaning: value is derived without direct source support
required_evidence: derivation inputs and inference rule
allowed_actions: [display_if_labeled]
forbidden_actions: [present_as_extracted, use_for_critical_decision]
next_states: [supported, rejected, requires_review]

status: not_present
meaning: source was readable but did not contain the field
required_evidence: completed source search or extractor coverage record
allowed_actions: [display_as_missing, accept_with_warning]
forbidden_actions: [fill_by_guess]
next_states: [supported, requires_review]
```

Extend this table for every status your product uses. If a status has no defined meaning or permitted action, it is presentation, not control.

### Common failure modes

**Schema equals truth.** Schema validation proves shape, not source support.

**Model confidence equals evidence.** A model's self-reported certainty is another model output. It may inform routing, but it cannot replace provenance.

**Boolean verification.** A single `verified: true` erases whether a value was extracted, normalized, or human-corrected.

**UI stronger than the backend.** The backend says `requires_review`, while the interface says "confirmed." Customer-facing language must preserve the actual state.

**Statuses without enforcement.** Records carry `inferred`, but downstream code consumes the value anyway. States matter only when they change behavior.

**Endless review.** Routing every uncertainty to a person avoids automation rather than managing risk. Policies should distinguish critical, reviewable, and optional fields.

### Exercise: find the premature transition

1. Draw the path for `terminal` from model response to stored booking record.
2. Mark each step where the system could check evidence, apply policy, or request review.
3. Identify the first step that currently treats the string as trusted.
4. Replace that step with a status transition and an allowed action.
5. Write the exact UI sentence shown to the user.

**Expected outcome:** the raw candidate never writes directly to the booking. It becomes `not_present` after the evidence check, the policy blocks inference, and the product either omits the terminal or says that it was not shown on the ticket. The UI does not claim all details are verified.

Once confidence becomes explicit, the next challenge is evaluation. A twenty-field extraction is still too broad to judge reliably as one object. The next chapter shows how to turn an impressive-looking output into narrow claims that people and tests can actually verify.

## Chapter 3: Narrow Questions Beat Broad Prompts

### Learning promise

By the end of this chapter, you will know how to decompose a broad AI task into verifiable claims. You will build a claim matrix for the airline ticket, write narrow extraction and review questions, and use failures to identify the layer that owns the fix.

Broad prompts feel powerful:

```text
Extract all useful information from this ticket.
```

That prompt can produce a beautiful response. It can also hide the hardest question: what counts as correct?

Narrow questions are easier to verify:

```text
What is the flight number exactly as shown on the ticket?
```

```text
Is a terminal printed on the ticket?
Return only supported, not_present, unreadable, or ambiguous.
```

```text
What exact source span supports the PNR value?
```

The narrow question does not make the model smarter. It makes the task more inspectable.

### Decompose outputs into atomic claims

Verification requires a defined proposition and a way to decide whether it holds. "Extract all useful information" provides neither. *Useful* depends on the product. *All* has no practical stopping rule. A reviewer cannot know whether omitted information was irrelevant, missed, or never requested.

An atomic claim has one subject, one value or state, and one evidence requirement. For example:

```text
Claim: The PNR is H7K29Q.
Evidence requirement: an exact source span labeled PNR or booking reference.
Decision rule: exact character match after whitespace normalization.
```

The ticket output may contain twenty fields, but the eval should not treat it as one blob. Evaluate passenger name, flight number, origin, destination, departure date, departure time, terminal, PNR, baggage, and the evidence for each field as separate claims.

Each claim also has a different failure cost. A wrong PNR can break a booking lookup. A missing optional meal preference may have no downstream effect. A hallucinated baggage allowance may create a customer-facing promise that cannot be fulfilled. A normalized airport code may be correct even when it differs from the printed city name.

Narrowness reveals those differences.

### The cumulative ticket as a claim matrix

Build a claim matrix before tuning the prompt:

| Field | Narrow question | Expected source state | Transformation | Risk |
|---|---|---|---|---|
| `passenger_name` | What passenger name is printed? | supported | preserve text | critical |
| `pnr` | What booking reference is printed? | supported | trim spaces only | critical |
| `flight_number` | What flight number is printed? | supported | canonical spacing | critical |
| `departure_date` | What departure date is printed? | supported | ISO date | critical |
| `origin` | What departure location is printed? | supported | city to IATA lookup | critical |
| `destination` | What arrival location is printed? | supported | city to IATA lookup | critical |
| `departure_time` | What departure time is printed? | supported | 24-hour format | reviewable |
| `terminal` | Is a terminal printed? | not present | none | reviewable, do not infer |
| `baggage` | Is baggage allowance printed? | not present | none | optional, do not infer |

This matrix separates four contracts that broad prompts often mix together: observation, absence detection, transformation, and risk. It lets you test a model even if production uses one multi-field request, because each returned field is scored against its own question and rule.

### Implementation pattern: claim-oriented output

A prompt can require one record per claim:

```text
For each requested field:
1. Return the value exactly as shown, or null.
2. Choose one source_status: supported, not_present, unreadable, ambiguous.
3. Quote the shortest exact evidence span that supports the value.
4. Do not infer terminal, baggage, or PNR.
5. Do not normalize values in this step.

Requested fields: passenger_name, pnr, flight_number, departure_date,
origin, destination, departure_time, terminal, baggage.
```

The output schema can preserve the same shape for every field:

```json
{
  "field": "pnr",
  "raw_value": "H7K29Q",
  "source_status": "supported",
  "evidence": "Booking Ref / PNR: H7K29Q"
}
```

Then normalization runs separately. This matters because a wrong `DEL` can arise from two different failures: the extractor read the source incorrectly, or the lookup mapped a correct raw value incorrectly. If the first step returns both observation and normalization, the failure boundary disappears.

Narrow questions also improve human review. Do not ask "Does this output look correct?" Show one claim and one decision:

```text
Field: terminal
Candidate value: Terminal 3
Source evidence: none
Policy: terminal must not be inferred
Question: Is this value supported by the ticket?
Allowed decisions: accept | reject | mark unreadable | mark ambiguous
Expected action for this case: reject
```

A reviewer can answer that consistently. The broad question invites impressionistic review: correct-looking fields hide the unsupported one.

### Debugging by claim and layer

When a broad extraction fails, teams often edit the prompt first. A narrow claim lets you locate the owning layer:

- No text was available: intake or OCR.
- The source span was visible but the raw value was wrong: extraction.
- The raw value was correct but `DEL` was wrong: normalization data.
- The evidence was empty but the value was accepted: policy enforcement.
- The field should have gone to review but did not: routing.
- The reviewer made an inconsistent decision: review policy or training.

This classification avoids prompt churn. A better prompt does not repair an airport lookup table, and a larger model does not fix a review interface that hides evidence.

### Reusable artifact: claim decomposition worksheet

```yaml
field:
product_question:
atomic_claim:
source_states: [supported, not_present, unreadable, ambiguous]
expected_value:
evidence_requirement:
allowed_transformation:
do_not_infer:
risk_class: critical | reviewable | optional
acceptance_rule:
failure_owner:
review_question:
```

Complete this worksheet for every field that can affect a user, an operator, or a downstream system. Fields with no acceptance rule are not ready for reliable evaluation.

### Common failure modes

**Decomposing by JSON keys only.** A key can still combine extraction, normalization, confidence, and action. Separate the claims inside it.

**Prompt fragmentation without product logic.** Calling the model once per field may increase cost without improving evaluation. Narrowness is primarily a contract and scoring technique; production batching is a separate optimization.

**Fuzzy evidence requirements.** "The answer is somewhere on page one" is not enough for a critical field. Define exact spans or bounded regions.

**Ignoring negative claims.** Detecting that terminal is not present is a real task. Do not score only populated values.

**Same tolerance for every field.** Date punctuation may normalize harmlessly; one wrong PNR character may be a total failure.

**Reviewing the whole document at once.** Reviewers anchor on the clean majority and miss the dangerous minority.

### Exercise: turn one prompt into testable claims

1. Start with: "Extract all useful travel details from this ticket."
2. Write narrow questions for `pnr`, `origin`, `terminal`, and `baggage`.
3. Define the accepted source states and transformations for each.
4. Create one automated assertion and one reviewer question for `terminal`.
5. Assign an owning layer to these failures: wrong raw origin, correct raw origin but wrong IATA code, unsupported terminal accepted.

**Expected outcome:** each field has a bounded question, evidence requirement, and decision rule. The terminal assertion checks for `not_present` with no inferred value. Failure ownership maps respectively to extraction, normalization data, and policy or routing.

If you cannot state the claim narrowly, you cannot evaluate it precisely. Once claims are inspectable, however, another fact becomes obvious: the model is only one place where those claims can fail. The next chapter expands the unit of design from the model call to the complete product pipeline.

## Chapter 4: The Pipeline Matters More Than The Model

### Learning promise

By the end of this chapter, you will be able to map an AI feature as an end-to-end decision pipeline, locate ownership for each failure, and compare system designs using safety, cost, latency, and review effort rather than raw model accuracy alone.

A common AI product question is:

Which model should we use?

A better question is:

What pipeline turns uncertain model output into a trustworthy product decision?

The model is one component. The pipeline decides what the model sees, what it is asked to do, how its output is checked, what happens when it fails, and what evidence reaches the user or reviewer.

### The evaluated object is the workflow

From first principles, reliability is a property of the path from input to consequence. If a model extracts `Delhi` correctly but a stale lookup maps it to the wrong airport, the user still receives the wrong result. If the final output is correct but a fallback cost makes the feature economically unusable, the product still fails. If a reviewer fixes the result but the correction is never logged, the same failure returns.

For document extraction, the pipeline may include:

1. file intake
2. document type detection
3. OCR or native text extraction
4. layout parsing
5. field extraction
6. schema validation
7. evidence linking
8. normalization
9. status labeling
10. fallback routing
11. human review
12. final decision
13. audit logging
14. regression capture

The model may participate in several stages. It does not own all of them.

![Three-layer AI system diagram: model, pipeline, and data or configuration work together to produce a governed output](../assets/diagrams/three-layer-system.svg)

That is why "we upgraded the model" is rarely a complete product answer. A stronger model may reduce extraction errors while producing more plausible unsupported inference. It may change formatting, refusal, or uncertainty behavior. It may improve the clean demo while increasing latency or review effort on messy documents.

The pipeline must absorb model variation. It encodes what must be extracted, what may be missing, what must never be inferred, what can be normalized, what requires review, what blocks downstream use, and what becomes a regression case.

It must also preserve partial success. Real documents rarely fail as a single unit. The ticket may contain a supported passenger name and flight number, an airport value that needs normalization, an unreadable departure time, and an absent terminal. Treating the entire document as either passed or failed discards useful evidence or accepts too much risk.

A pipeline should therefore carry field-level states into a document-level decision. It may accept the itinerary, warn about optional absence, and route one critical claim to review. That decision must be explainable: which fields passed, which were withheld, what fallback ran, and what a person must do next. Partial failure is not an edge case to hide. It is a normal product state to design.

### Follow the cumulative ticket through the pipeline

The ticket enters as a PDF. Native text extraction yields the source shown in prior chapters. Document classification labels it `airline_ticket`. The extractor produces raw claim records. Evidence linking verifies exact spans. Normalization maps `Delhi` to `DEL` and `Bengaluru` to `BLR`. Policy marks terminal and baggage as `not_present` and blocks fallback because both are do-not-infer fields. The final decision accepts the critical itinerary fields and exposes optional absence without inventing values.

Represent the run as stage results rather than one opaque response:

```json
{
  "run_id": "RUN-AIR-001",
  "document_id": "AIR-001",
  "stages": [
    {"name": "text_extraction", "status": "passed", "output_ref": "text:v1"},
    {"name": "classification", "status": "passed", "value": "airline_ticket"},
    {"name": "claim_extraction", "status": "passed", "model": "default"},
    {"name": "evidence_linking", "status": "passed", "coverage": 1.0},
    {"name": "normalization", "status": "passed", "table": "iata_airports_v2026_07"},
    {"name": "policy", "status": "passed", "blocked_inferences": 2},
    {"name": "final_decision", "status": "accepted_with_warnings"}
  ]
}
```

Now a failure is diagnosable. If evidence coverage drops, inspect the linker. If a raw field is wrong, inspect OCR and extraction. If `Delhi` maps incorrectly, inspect the versioned lookup. If an absent terminal triggers fallback, inspect policy and routing.

### Model choice inside system choice

Suppose two configurations process the same eval set:

| Configuration | Critical accuracy | Unsupported inference | p95 latency | Review rate |
|---|---:|---:|---:|---:|
| Large model, one broad call | 98% | 4% | 4.8 s | 7% |
| Smaller model plus gates | 97% | 0.3% | 2.1 s | 9% |

There is no universally correct choice, but raw accuracy no longer settles it. If unsupported baggage claims have high customer cost, the gated pipeline may be better. If review capacity is scarce, you may improve routing rather than replacing the extractor. The useful comparison is system behavior against product risk.

A parser plus targeted model call may beat a general document prompt. A fallback that runs only when evidence likely exists may beat a fallback that fills every blank. A review path that records correction reasons may improve faster than full automation that silently accepts uncertainty.

The pipeline is where product judgment lives.

### Implementation pattern: typed stage contracts

Give every stage an input contract, output contract, failure behavior, and evidence:

```yaml
stage: normalize_airports
input:
  required: [origin.raw_value, destination.raw_value]
output:
  required: [raw_value, normalized_value, lookup_version, status]
preconditions:
  - source_status == supported
success:
  - normalized value exists in canonical IATA table
failure_routes:
  unknown_lookup: review
  conflicting_lookup: review
  missing_raw_value: stop
observability:
  - lookup_version
  - rule_id
  - latency_ms
```

Then orchestrate stages explicitly:

```python
text = extract_text(document)
doc_type = classify_document(text)
claims = extract_claims(text, schema_for(doc_type))
linked = link_evidence(claims, text)
normalized = normalize(linked, lookup_registry)
decision = apply_policy(normalized, policy_for(doc_type))
record_run(document, text, claims, normalized, decision)
```

This code is intentionally unsurprising. Reliability comes from visible contracts and controlled transitions, not from hiding the workflow inside one clever call.

### Reusable artifact: pipeline stage card

```yaml
stage_name:
purpose:
owner:
input_contract:
output_contract:
deterministic_or_model_backed:
model_and_prompt_version:
data_or_config_dependencies:
preconditions:
validation:
failure_modes:
retry_policy:
fallback_policy:
stop_conditions:
review_route:
observability:
eval_cases:
downstream_consumers:
```

Complete one card per stage. Together, the cards expose hidden ownership, duplicate logic, missing validation, and places where model behavior has been mistaken for product policy.

### Common failure modes

**Model leaderboard architecture.** The team chooses the highest-scoring model before defining the pipeline, field risks, or operational constraints.

**One prompt owns the product.** Detection, extraction, normalization, policy, and explanation are combined in one untestable call.

**Fallback as a second source of truth.** The fallback returns a replacement document object and overwrites correct default fields. Fallback should be scoped to specific failed claims.

**No stage provenance.** The final value exists, but nobody can tell which model, prompt, parser, or lookup produced it.

**Counting pipeline failures as model failures.** Empty OCR, stale dictionaries, and routing mistakes pollute model evaluation and lead to the wrong fix.

**Happy-path observability.** Success is logged, but retries, blocked inferences, partial results, and review corrections are not.

### Exercise: design the ticket workflow

1. Draw stages from ticket upload to final itinerary display.
2. For each stage, list one input, one output, one failure, and one observable event.
3. Place the model call or calls.
4. Assign these failures to stages: empty extracted text, `AI 202` read as `AI 2022`, `Delhi` mapped to the wrong code, terminal guess accepted, reviewer correction lost.
5. Choose one metric beyond accuracy that could change your model decision.

**Expected outcome:** failures map to text extraction, claim extraction, normalization, policy, and audit or feedback capture. The model is visible but not treated as the entire system. Your additional metric may be unsupported inference rate, p95 latency, per-document cost, or review rate, with a clear reason it matters.

If you treat model selection as the whole problem, every failure looks like a reason to switch models. If you treat the pipeline as the product, every failure becomes a clue about which layer needs to improve. The next chapter begins strengthening those layers with the cheapest and most explainable controls: deterministic gates.

## Chapter 5: Deterministic Gates Before Model Calls

### Learning promise

By the end of this chapter, you will be able to decide which checks belong outside generative reasoning, implement pre-call and post-call gates, and define stop and routing behavior for failed checks. You will finish the first working control plan for the airline-ticket pipeline.

Do not call a model just because you can.

Some decisions are better handled by deterministic gates.

A deterministic gate is a check whose expected behavior is defined by a rule rather than open-ended generation: file type allowed or not, document text empty or not, required page present or not, JSON schema valid or not, date parseable or not, airport code in the approved table or not, field evidence present or not.

These gates protect the model from being asked to solve problems that are really input, validation, or product-contract problems.

### Why gates come first

A model call consumes probabilistic reasoning. Use it when the system must interpret language, layout, ambiguity, or context. Do not spend it on facts the program can establish directly and reproducibly.

From first principles, a deterministic gate offers four advantages:

1. The rule is inspectable.
2. The same input produces the same decision.
3. Failure can carry a precise reason code.
4. Tests can cover the decision without model variance.

Gates can run before a model, after a model, or between model-backed stages. A pre-call gate protects input quality and avoids impossible work. A post-call gate protects downstream systems from malformed, unsupported, or disallowed output. An inter-stage gate decides whether fallback or review can actually improve the result.

The design question is not "Can code do this perfectly?" It is "Is there a stable product rule that should remain true regardless of model behavior?" If yes, encode the rule outside the prompt.

### Implementation pattern: pre-call gates for the ticket

Before asking for ticket fields, check whether extraction is possible:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class GateResult:
    passed: bool
    reason: str
    route: str

def ticket_input_gate(file_type: str, text: str) -> GateResult:
    if file_type not in {"application/pdf", "image/png", "image/jpeg"}:
        return GateResult(False, "unsupported_file_type", "reject")
    if not text.strip():
        return GateResult(False, "document_text_empty", "ocr_repair")

    terms = {"pnr", "booking ref", "flight", "passenger"}
    matches = [term for term in terms if term in text.lower()]
    if len(matches) < 2:
        return GateResult(False, "ticket_signals_insufficient", "classify_or_review")

    return GateResult(True, "ticket_input_ready", "extract")
```

For our source, text is present and several ticket signals exist, so the gate routes to extraction. If text were empty, calling the model with an empty string would add cost and could invite fabricated output. The correct next step is OCR repair or review, not a stronger prompt.

The gate should log its observed facts:

```json
{
  "gate": "ticket_input_ready",
  "passed": true,
  "observations": {
    "document_text_present": true,
    "ticket_like_terms_found": ["pnr", "flight", "passenger"]
  },
  "route": "extract"
}
```

### Post-call gates for evidence and normalization

After extraction, validate shape, source support, and known transformations. Do not combine them into one generic `valid` flag.

```python
DO_NOT_INFER = {"pnr", "terminal", "baggage"}

def evidence_gate(record: dict) -> GateResult:
    field = record["field"]
    value = record.get("raw_value")
    evidence = record.get("evidence", [])
    status = record["source_status"]

    if status == "supported" and (value is None or not evidence):
        return GateResult(False, "supported_without_evidence", "review")
    if field in DO_NOT_INFER and status == "inferred":
        return GateResult(False, "inference_forbidden", "reject_field")
    if status == "not_present" and value is not None:
        return GateResult(False, "value_present_for_absent_field", "reject_field")
    return GateResult(True, "evidence_policy_satisfied", "continue")
```

For `terminal = Terminal 3` with no evidence, the gate rejects the field. For `terminal = null`, `source_status = not_present`, it passes and allows an honest warning. Importantly, the system does not call fallback merely to fill the blank. More computation cannot recover evidence that the readable source does not contain.

Normalization gets its own gate and versioned data dependency:

```yaml
gate: airport_normalization
input:
  raw_origin: Delhi
  raw_destination: Bengaluru
lookup_table: iata_airports_v2026_07
checks:
  - raw values have supported evidence
  - normalized codes exist in the canonical table
  - mapping is unambiguous for the document context
output:
  origin: DEL
  destination: BLR
on_unknown: review
on_conflict: review
```

If the model extracts `DLH` while the source says `Delhi`, prompting it to "be more careful" does not create a dependable correction. Compare the supported raw value against the canonical lookup. If the lookup itself is wrong, the failure belongs to data configuration, not extraction.

### Gates, fallback, and stop conditions

A failed gate needs a route. Otherwise it is only a warning in a log.

Use a small decision table:

| Condition | Route | Why |
|---|---|---|
| Text empty | OCR repair | Better source evidence may become available |
| Critical field missing, evidence likely visible | Targeted fallback | Another extractor may recover it |
| Optional field absent from readable source | Stop with warning | More calls cannot create source evidence |
| Do-not-infer field returned without evidence | Reject field | Plausibility is not extraction |
| Critical evidence ambiguous | Human review | Product risk exceeds automation certainty |
| Airport lookup unknown | Review or data work item | Model should not invent canonical data |

This is the beginning of an honest routing system. It knows not only how to continue, but when to stop.

### Reusable artifact: deterministic gate specification

```yaml
gate_id:
stage: pre_model | post_model | inter_stage
purpose:
inputs:
rule:
pass_reason:
fail_reasons:
on_pass:
on_fail:
retry_allowed:
fallback_allowed:
stop_condition:
data_dependencies:
observability:
test_cases:
owner:
```

A gate specification should make three things reviewable: the invariant it enforces, the evidence it observes, and the route produced by failure. Avoid vague gates such as `quality_ok`; use reason codes that tell an operator what happened.

### Common failure modes

**Rules hidden in prompts.** "Never infer baggage" appears only in prompt text, so no downstream control catches violations.

**Gate without route.** The validator reports an error, but code continues with the original value.

**Overusing regular expressions.** Determinism is not a license to force ambiguous language into brittle parsing. Use gates for stable rules and models for genuine interpretation.

**Stale lookup tables.** Deterministic does not mean correct. Version, test, and observe data dependencies.

**Retrying absence.** Fallback is called when a readable document lacks the field. The result is a cleaner hallucination, not recovered evidence.

**One giant gate.** A single pass or fail hides whether the problem was schema, evidence, normalization, or policy.

**No adversarial tests.** Clean documents pass, but malformed files, empty OCR, conflicting codes, and unsupported values are not exercised.

### Exercise: build the first gate plan

1. Write three pre-call gates for the ticket workflow.
2. Write three post-call gates, including one for a do-not-infer field.
3. Give every failure a reason code and route.
4. Add tests for empty text, unsupported terminal, correct origin normalization, and unknown airport lookup.
5. Decide whether each failure should retry, fallback, review, reject, or stop with a warning.

**Expected outcome:** empty text routes to OCR repair without a model call; an unsupported terminal is rejected or converted to `not_present`; `Delhi` maps to `DEL` with raw value and lookup version preserved; an unknown airport does not produce a guessed code and routes to review or a data work item. Every failed gate has an observable reason and a defined next action.

A better prompt does not fix a missing validation gate. At this point, the ticket system has evidence records, explicit confidence states, narrow claims, a visible pipeline, and deterministic controls. The next chapter can now ask a harder question: how do we know whether the model-backed portions work across varied documents rather than on one convincing example? That is where one good output stops being proof and becomes the first case in an eval set.
