## Chapter 16: Observability Is The Product Interface

**Learning promise.** By the end of this chapter, you will be able to design a run trace that explains an AI workflow's decisions to users, reviewers, operators, and builders without forcing any of them to read the source code.

A system is not trustworthy if nobody can tell what happened.

This is where many AI products quietly fail. They build a model call, a response parser, perhaps an eval notebook, and a polished interface. The happy path works. Then a user asks why a value was accepted, an operator sees an unexpected result, or a reviewer changes a field. The system has no durable answer.

Observability is often described as an engineering concern: logs, metrics, and traces used to debug software. That definition is too narrow for an AI product. When a workflow makes decisions from uncertain evidence, observability is part of the product interface. It is how the system explains what it saw, what it did, and why it stopped.

### From events to explanations

Start from first principles. A trace is not a pile of messages. It is a causal record. For any consequential output, the record should connect five things:

1. **Input:** What document, text, image, or user instruction entered the workflow?
2. **Processing:** Which parser, model, prompt, rule set, and fallback path handled it?
3. **Evidence:** What source span supported each important value?
4. **Decision:** Which validation, routing, and stop rules produced the action?
5. **Outcome:** What reached the user, reviewer, downstream tool, or final store?

If one link is missing, the team has an event history but not an explanation. A line saying `fallback_called=true` does not explain why fallback ran. A field saying `terminal=null` does not distinguish absence from unreadability. A final status of `accepted` does not show whether a reviewer corrected anything first.

The practical rule is stronger:

> If a customer-facing AI workflow fails, the operator should be able to explain what happened without reading the source code.

That requires structured state, not prose emitted after the fact.

### The airline ticket enters the trace

Continue the airline-ticket case from the previous chapter. The source is clear on six critical fields and silent on two optional or reviewable fields:

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

The extraction pipeline returns `DEL` and `BLR` after normalization. It leaves terminal and baggage empty. That final output is correct, but correctness alone is not enough. The system must preserve why those fields are empty and why no fallback was called.

```yaml
run_id: run_2026_08_01_001
case_id: AIR-001
document_id: AIR_DOC_771
pipeline_version: ticket_pipeline_v3
input:
  document_type: airline_ticket
  content_hash: sha256:example-redacted
models:
  extractor: small_extractor_v5
  fallback: not_called
gates:
  text_present: pass
  ticket_terms_present: pass
  schema_valid: pass
field_decisions:
  pnr:
    value: H7K29Q
    status: supported
    evidence_ref: ev_pnr_01
    action: accept
  terminal:
    value: null
    status: not_present_in_document
    evidence_ref: null
    policy: do_not_infer
    action: accept_with_warning
    stop_reason: no_source_evidence
  baggage:
    value: null
    status: not_present_in_document
    evidence_ref: null
    policy: do_not_infer
    action: accept_with_warning
review:
  required: false
final_decision: accepted_with_warning
```

This trace answers a subtle question: did the extractor fail to find the terminal, or did the document fail to contain it? Those are different states. The first might justify fallback or review. The second justifies stopping.

### Four views of the same truth

Different people need different levels of detail, but they should read from the same canonical trace.

- **End user:** Show the extracted itinerary and a concise notice: "Terminal and baggage were not shown on this document." Include evidence highlights when a field affects trust.
- **Reviewer:** Show the proposed value, source crop or text span, field policy, allowed decisions, and prior corrections.
- **Operator:** Show the route taken, gate results, fallback and stop reasons, review history, versions, timing, and final state.
- **Builder:** Add raw model output, prompt and schema versions, validation errors, token or cost data, and links to eval cases.

Do not dump builder logs into the user interface. More data is not automatically more clarity. But do not create four separate truth sources either. Derive each view from the same run and field-decision records, with redaction and access controls appropriate to the audience.

### Implementation pattern: decision events

A useful implementation treats each meaningful transition as an immutable event. The current status can be materialized for fast display, while events preserve the explanation.

```python
from dataclasses import dataclass
from typing import Literal

Decision = Literal["accept", "accept_with_warning", "review", "reject", "stop"]

@dataclass(frozen=True)
class FieldDecisionEvent:
    run_id: str
    field: str
    value: str | None
    evidence_ref: str | None
    status: str
    decision: Decision
    reason_code: str
    policy_version: str
    model_version: str | None


def may_accept(event: FieldDecisionEvent) -> bool:
    if event.status in {"supported", "normalized"}:
        return event.evidence_ref is not None
    if event.status == "not_present_in_document":
        return event.value is None
    return False
```

The reason code matters. Free-text notes are useful for context, but stable reason codes make runs searchable and eval-ready. `no_source_evidence`, `schema_invalid`, `conflicting_values`, and `reviewer_corrected` can be counted, compared across versions, and converted into work items.

Be deliberate about sensitive data. Store a document reference or redacted evidence span when full source text would expose personal information. Record who accessed review data. Do not log secrets, entire prompts containing private documents, or unbounded model responses merely because they might be useful later.

### Reusable artifact: the observability contract

Use this checklist before implementing a customer-facing AI workflow:

```yaml
observability_contract:
  identity:
    - run_id
    - input_reference
    - pipeline_version
  processing:
    - model_and_prompt_versions
    - gate_results
    - route_taken
    - retries_and_fallbacks
  field_decisions:
    - raw_and_normalized_value
    - evidence_reference
    - status
    - action
    - reason_code
  human_activity:
    - review_required
    - reviewer_decision
    - correction_reason
  outcome:
    - final_state
    - user_visible_message
    - downstream_action_ids
  operations:
    - latency
    - cost
    - errors
    - eval_case_link
  controls:
    - retention_policy
    - redaction_policy
    - access_policy
```

### Exercise: explain a suspicious completion

Suppose the default extractor returned no terminal, a fallback returned `Terminal 3`, and the workflow accepted it. Design the trace for that run.

1. Record the source-evidence state before fallback.
2. Record the routing rule that allowed fallback.
3. Record the fallback value and its missing evidence reference.
4. Record the validation decision and final user-visible state.
5. Name the owning layer for the failure and the regression case to create.

**Expected outcome:** Your trace should make it possible to conclude that the model produced a plausible value, but routing and validation allowed an unsupported inference. The work item belongs to evidence gating or routing policy, not vaguely to "model quality." The new regression case should assert that a do-not-infer field with no source evidence stops rather than falls back.

### Common failure modes

- **Logging output without decisions.** You can see the value but not why it was accepted.
- **Free-text reasons only.** Operators can read them, but teams cannot aggregate or gate on them.
- **Four dashboards, four truth sources.** User, reviewer, operator, and builder views drift apart.
- **Success-only instrumentation.** Failures, retries, partial work, and reviewer corrections disappear.
- **Sensitive-data overcollection.** Debug value is purchased by creating a privacy and access-control problem.
- **No version identifiers.** A run cannot be reproduced because prompt, schema, model, or policy changed.
- **Trace without recovery.** The system explains the failure but offers no next action to the operator.

Observability makes the extraction workflow explainable. The next chapter raises the stakes: what happens when the system does not merely report a field, but uses it to take action?

---

## Chapter 17: Agents Need Action Evals

**Learning promise.** By the end of this chapter, you will be able to evaluate an agent as an operational workflow: not only by what it says, but by which tools it selects, which arguments it sends, which approvals it respects, and which recovery path it leaves behind.

An agent is not only an answer generator.

An agent proposes or takes actions.

That changes the eval.

If a model answers a question incorrectly, the failure may remain inside text. If an agent calls the wrong tool, updates the wrong record, sends the wrong message, deletes the wrong file, or books the wrong itinerary, the failure becomes operational. The output to evaluate is no longer one string. It is a sequence of state transitions in the world.

Tool calling makes this explicit. The model receives available tools, emits a structured tool call, the application executes code with those arguments, and the result returns to the model before it continues.[^openai-function-calling] Every step creates a claim:

- Was a tool needed at all?
- Was the right tool available and selected?
- Were the arguments grounded in source evidence and user intent?
- Was the action permitted in this context?
- Was confirmation required before execution?
- Was the result interpreted correctly?
- Could a retry duplicate the action?
- Was the action recorded so an operator can recover it?

Those are eval questions.

### From answer correctness to transition correctness

From first principles, an action eval starts from state, policy, and allowed transitions.

The initial state includes the user's request, extracted ticket, account permissions, available alternatives, and any limits the user supplied. The policy defines which transitions are allowed. The tool call attempts a transition. The observed state after execution proves what actually happened.

This is stricter than checking the assistant's final message. An agent can say, "I changed your flight," when no booking was made. It can also say the right thing after making an unauthorized booking. Text quality cannot distinguish those cases.

### The ticket becomes an instruction

Continue `AIR-001`. The extractor has supported values for PNR `H7K29Q`, flight `AI 202`, and departure date `12 Aug 2026`. Terminal and baggage remain absent. The user now says:

```text
Change my flight to tomorrow morning if it is under $100 extra.
```

A safe agent must interpret this as a constrained request to investigate, not blanket permission to book. It may read the ticket, search eligible alternatives, and compare the price delta. It must not use an inferred terminal or baggage allowance. Most importantly, it must ask for confirmation before a consequential booking action unless the product contract explicitly grants pre-authorization.

```yaml
expected_action_sequence:
  - tool: read_ticket
    required: true
  - tool: search_flight_changes
    required: true
    arguments:
      pnr: H7K29Q
      date: 2026-08-13
      time_window: morning
  - tool: quote_change
    required: true
  - action: request_user_confirmation
    when: eligible_quote_price_delta_usd <= 100
  - tool: book_change
    allowed_only_if:
      - user_confirmation == true
      - quote_not_expired == true
      - price_delta_usd <= 100
      - idempotency_key_present == true
      - audit_log_started == true
must_not:
  - book_without_confirmation
  - infer_missing_terminal
  - promise_baggage_allowance
```

Notice that `under $100` constrains price, but it does not necessarily waive confirmation. That distinction belongs in the product policy and the eval ground truth. If the product supports fully delegated booking, the permission contract must say so explicitly.

### Implementation pattern: policy before execution

Do not rely on the model to remember every rule in prose. Put a deterministic policy gate between proposed tool calls and execution.

```python
from dataclasses import dataclass
from decimal import Decimal

@dataclass(frozen=True)
class BookingProposal:
    pnr_status: str
    evidence_ref: str | None
    price_delta: Decimal
    user_limit: Decimal
    user_confirmed_quote_id: str | None
    quote_id: str
    quote_expired: bool
    idempotency_key: str | None


def authorize_booking(p: BookingProposal) -> tuple[bool, str]:
    if p.pnr_status != "supported" or not p.evidence_ref:
        return False, "pnr_not_evidence_backed"
    if p.price_delta > p.user_limit:
        return False, "price_limit_exceeded"
    if p.user_confirmed_quote_id != p.quote_id:
        return False, "confirmation_required"
    if p.quote_expired:
        return False, "quote_expired"
    if not p.idempotency_key:
        return False, "idempotency_key_required"
    return True, "authorized"
```

This gate does not make the agent less capable. It makes the boundary between reasoning and authority explicit. The model can propose; policy decides whether the proposal may mutate state.

For side-effecting tools, test at least three outputs: the proposed call, the authorization result, and the observed external state. A mocked `200 OK` is not proof that the correct itinerary changed. When feasible, verify the booking record, payment delta, audit event, and user-visible summary against the same action ID.

### The action-eval matrix

An agent's eval set needs more than happy paths. Cover these classes:

- **Selection:** right tool, unnecessary tool, missing tool, forbidden tool.
- **Arguments:** exact identifiers, units, dates, currencies, optional defaults, unsupported extracted values.
- **Permission:** confirmation present, absent, stale, ambiguous, or granted for a different quote.
- **Execution:** success, timeout before response, timeout after side effect, partial success, provider rejection.
- **Retry:** duplicate request, same idempotency key, new idempotency key, stale result.
- **Recovery:** rollback available, compensation required, human escalation, user notification.
- **Communication:** summary matches observed state and does not overclaim.

The dangerous case is a timeout after the provider accepted the booking but before the agent received the response. Blind retry can create duplicate work or charges. The eval should expect reconciliation by idempotency key or provider action ID before another mutation.

### Reusable artifact: action-eval case

```yaml
case_id: AGENT-AIR-001
initial_state:
  ticket_case: AIR-001
  user_request: change tomorrow morning under USD 100 extra
  user_confirmation: false
available_tools:
  - read_ticket
  - search_flight_changes
  - quote_change
  - book_change
expected:
  required_calls:
    - read_ticket
    - search_flight_changes
    - quote_change
  forbidden_calls:
    - book_change
  next_user_state: awaiting_confirmation
policy_assertions:
  - source_identifiers_must_be_supported
  - absent_ticket_fields_must_not_be_inferred
  - booking_requires_confirmation
  - mutations_require_idempotency_key
failure_injections:
  - quote_timeout
  - booking_timeout_after_commit
observability:
  - proposed_action_logged
  - authorization_reason_logged
  - provider_action_id_logged
  - user_summary_matches_observed_state
```

### Exercise: evaluate the helpful-looking agent

The agent finds a flight costing $82 extra, calls `book_change` without asking, and replies: "Done. I changed your flight and your baggage allowance remains 15 kg." The provider accepted the change, but the source ticket never showed baggage.

1. List every independent claim or action to evaluate.
2. Classify each failure as extraction, action policy, execution, or communication.
3. Write the expected tool sequence.
4. Define the state that a recovery operator needs.
5. Add one retry test for a timeout after provider commit.

**Expected outcome:** You should identify at least two severe failures: booking without the required confirmation and making an unsupported baggage claim. The recovery record should preserve the original and new itinerary, quote, price delta, provider action ID, confirmation state, and whether compensation or user contact is required. The retry test should reconcile using the original idempotency key rather than issuing a second booking blindly.

### Common failure modes

- **Grading the final answer only.** Correct-sounding prose hides a forbidden action.
- **Treating tool-call syntax as success.** Valid JSON arguments can still be wrong or unauthorized.
- **Letting the prompt enforce permissions.** A model instruction is not an execution boundary.
- **No idempotency test.** Retries can repeat bookings, messages, charges, or updates.
- **Ignoring partial failure.** One tool succeeds, another fails, and the agent reports all-or-nothing success.
- **Testing mocks but not state.** The eval checks a response code rather than the changed record.
- **Unsupported data escapes downstream.** An inferred terminal becomes a customer instruction.
- **No operator recovery path.** The action happened, but nobody can explain or repair it.

An agent without action evals is a demo with hands. An agent with action evals is a workflow that can be inspected, constrained, and improved. Yet those constraints do not live only in application code. They also live in schemas, policy files, lookup tables, and thresholds. That is the product layer we examine next.

---

## Chapter 18: Data And Configuration Are Product Code

**Learning promise.** By the end of this chapter, you will be able to manage prompts, schemas, lookup tables, policies, model routes, and thresholds with the same ownership, versioning, testing, and rollback discipline as executable code.

AI systems do not only fail in the prompt.

They fail in the data and configuration layer.

That layer includes schemas, prompts, review rules, field policies, routing thresholds, model choices, fallback rules, lookup tables, label taxonomies, normalization maps, release-gate thresholds, and eval manifests. These files may look like support material. They are not. They determine product behavior.

A one-line configuration change can alter which model runs, which fields reach review, what the user is told, how much the workflow costs, and whether a release is blocked. Calling the file "config" does not reduce its blast radius.

### Why configuration is executable

From first principles, code is not defined by a `.py` or `.ts` extension. Code is any versioned instruction that changes what the system does. A YAML rule saying `terminal: do_not_infer` is executed by the router. A JSON airport map changes normalized output. A prompt changes the candidates a model produces. A threshold changes the population sent to review.

Therefore each behavior-bearing artifact needs:

- a canonical owner and location
- a version or content digest
- validation before load
- tests tied to its behavior
- review proportional to its blast radius
- a deployment record
- a rollback path
- monitoring for stale or unexpected values

Without those controls, teams create a shadow codebase: important behavior that bypasses normal engineering discipline.

### The airline case reveals the third layer

In `AIR-001`, the model extracts `Delhi` and `Bengaluru` correctly. The normalization layer maps them to `DEL` and `BLR`. Now imagine a stale or malformed lookup table maps `Bengaluru` to `BSL`.

```json
{
  "origin_raw": "Delhi",
  "origin_normalized": "DEL",
  "destination_raw": "Bengaluru",
  "destination_normalized": "BSL"
}
```

The extractor did not fail. The data layer failed. Editing the prompt would waste time and might introduce new extraction regressions.

The same distinction applies to terminal. Suppose the historical policy says missing terminals are `reviewable_if_missing`, but the team decides that terminal is a do-not-infer field: if absent, stop and accept with warning unless a downstream action explicitly requires verification. That product decision is not complete until the policy artifact, router behavior, eval ground truth, review guidance, and release checks all change together.

```yaml
field_policies:
  version: ticket_fields_2026_08_01
  terminal:
    severity: reviewable
    evidence_required_for_value: true
    absent_status: not_present_in_document
    do_not_infer: true
    absent_action: accept_with_warning
    review_when:
      - downstream_action_requires_terminal
  baggage:
    severity: optional
    evidence_required_for_value: true
    do_not_infer: true
    absent_action: accept_with_warning
```

This is the model-pipeline-data separation in practice:

- The **model** produces candidate fields and evidence references.
- The **pipeline** controls validation, routing, fallback, review, and final state.
- The **data/configuration layer** defines schemas, labels, lookup values, thresholds, and product rules.

Lookup, policy, and schema defects belong to the configuration bundle, not model tuning. The activation check must validate those relationships before the bundle can affect production behavior.

### Implementation pattern: validated, versioned bundles

Avoid loading scattered configuration fragments independently. Package mutually dependent artifacts into a versioned bundle and validate the relationships before activation.

```yaml
bundle_id: ticket_product_contract_v4
effective_from: 2026-08-01
components:
  schema: ticket_extraction_v3
  field_policy: ticket_fields_2026_08_01
  airport_lookup: iata_airports_2026_07
  routing_policy: ticket_routing_v6
  review_policy: ticket_review_v4
  eval_manifest: airline_eval_v5
compatibility:
  schema_requires_field_policy: ticket_fields_2026_08_01
  routing_requires_statuses:
    - supported
    - normalized
    - not_present_in_document
    - unreadable
    - ambiguous
activation:
  requires_eval_gate: ticket_extraction_release_v4
rollback_to: ticket_product_contract_v3
```

Validate the bundle before the process accepts traffic:

```python
def validate_bundle(bundle, schemas, policies, lookups) -> None:
    assert bundle.bundle_id
    assert schemas.exists(bundle.components.schema)
    assert policies.exists(bundle.components.field_policy)
    assert lookups.exists(bundle.components.airport_lookup)

    field_policy = policies.load(bundle.components.field_policy)
    for field in field_policy.fields:
        if field.do_not_infer:
            assert field.evidence_required_for_value
            assert field.absent_action in {"accept_with_warning", "review", "reject"}
```

The loader should fail closed on missing or incompatible critical configuration. Silent fallback to "whatever file is available" destroys reproducibility. If a noncritical optional map is unavailable, the product may preserve the raw value and mark normalization unavailable, but that fallback must be explicit and observable.

### Deploy configuration as a release

Validation at startup is necessary, but it is not enough. A syntactically valid policy can still be behaviorally wrong. Configuration activation therefore needs the same staged path as application code.

First, run static compatibility checks: required fields exist, referenced statuses are valid, lookup keys are unique, and every do-not-infer rule has a defined absent action. Second, run targeted evals against the candidate bundle. Third, compare candidate and baseline on quality, fallback, review, cost, and latency metrics. Finally, activate the bundle by immutable version, not by editing a live file in place.

For higher-risk changes, use a bounded rollout. Shadow evaluation can run the candidate policy without affecting users. A canary can apply it to a small, identifiable slice while preserving the previous bundle as an immediate rollback target. The run trace must record which bundle decided each case; otherwise a mixed rollout cannot be investigated.

Avoid long-lived environment overrides such as `TERMINAL_POLICY=permissive`. They are easy to introduce during an incident and hard to discover later. If an emergency override is unavoidable, give it an owner, an expiry, an audit event, and a corresponding config version. Operational convenience must not create an invisible fifth product layer.

### Change records make decisions durable

Every meaningful config change should answer what changed, why, which behavior moves, and how to reverse it.

```yaml
change_id: config_2026_08_01_001
decision: prohibit inference for absent terminal values
changed:
  artifact: ticket_field_policy.terminal
  from: reviewable_if_missing
  to: do_not_infer_accept_warning_if_absent
reason: repeated fallback hallucination when source documents omit terminal
affected_cases:
  - AIR-001
  - AIR-146
expected_impact:
  unsupported_inference_rate: decrease
  fallback_rate: decrease
  review_rate: may_decrease
verification:
  - schema_and_bundle_validation
  - AIR-001_regression
  - stop_condition_eval
  - normalization_eval
rollback:
  activate ticket_product_contract_v3
owner: workflow_routing
```

### Reusable artifact: data/config review card

```text
Artifact and version:
Canonical owner/location:
Readers and writers:
Behavior controlled:
Reason for change:
Cases or customers affected:
Schema/contract compatibility:
Stale-value risk:
Security or privacy impact:
Expected cost/latency/review impact:
Tests and eval cases:
Activation plan:
Monitoring signal:
Rollback target:
Decision owner:
```

### Exercise: diagnose without touching the prompt

After a release, `Bengaluru` is still extracted correctly in raw output, but 7 percent of tickets now normalize to `BSL`. At the same time, the fallback rate for absent terminal fields rises sharply.

1. Separate the two symptoms by owning layer.
2. Identify the configuration artifacts and versions to inspect.
3. Write two regression assertions.
4. Define a rollback that does not discard raw extracted values.
5. Name the metrics that should confirm recovery.

**Expected outcome:** The airport defect should route to the normalization lookup or alias map, not the model prompt. The terminal defect should route to field policy or routing configuration. Tests should assert `Bengaluru -> BLR` while preserving `raw_value`, and `terminal absent + do_not_infer -> no fallback`. Recovery metrics should include normalization correctness, unsupported inference rate, fallback rate, and review rate.

### Common failure modes

- **Scattered editable truth.** Multiple lookup tables or policy copies drift independently.
- **Config changed without evals.** The diff looks small, so behavioral impact is assumed small.
- **Prompt-only debugging.** Every failure is blamed on the model even when raw extraction is correct.
- **No raw value preservation.** A bad normalization destroys the evidence needed to recover.
- **Silent defaulting.** Missing config loads permissive defaults and changes behavior without a visible failure.
- **Version without compatibility.** Artifacts have names but no proof that schema, router, and review policy agree.
- **Rollback in theory only.** The previous bundle cannot be reactivated cleanly.
- **Threshold changes without operational review.** Cost, latency, and review volume shift unexpectedly.

Treat all four elements as the product: code, model, pipeline, and configuration. Once those pieces are versioned and testable together, the eval can do its mature job. It can decide whether a specific bundle of changes is safe enough to release.

---

## Chapter 19: Your Eval Should Become A Release Gate

**Learning promise.** By the end of this chapter, you will be able to turn an eval suite into an explicit, reproducible release decision with risk-based thresholds, blocker rules, waiver discipline, and a report that explains exactly what is shipping.

The mature end state is not an eval dashboard.

The mature end state is release discipline.

When a prompt changes, the eval runs. When a schema changes, the eval runs. When a model changes, the eval runs. When a routing rule, lookup table, review policy, or stop condition changes, the eval runs.

The release gate asks a concrete question:

**Is this version of the product workflow safe enough to ship?**

Not perfect. Safe enough for the product's users, consequences, and operating model.

### A gate is a decision, not a score

![Release gate diagram: quality, operational, and blocker evidence converge on a versioned ship, hold, or reject decision](../assets/diagrams/release-gate.svg)

From first principles, an eval score describes performance under defined conditions. A release gate combines that evidence with product policy. The distinction matters because no single aggregate score can represent all failure costs.

A system could improve average field accuracy while introducing one unsupported PNR or unauthorized booking. Averages can hide blockers. Therefore a useful gate has three layers:

1. **Quality thresholds** for rates that can be aggregated.
2. **Operational limits** for cost, latency, and review burden.
3. **Zero-tolerance blockers** for failures the product will not ship.

Thresholds must be defined before reading the candidate's results. Otherwise the team is tempted to move the line to accommodate the release.

```yaml
release_gate: ticket_extraction_v4
risk_class: high
candidate_bundle: ticket_product_contract_v4
baseline_bundle: ticket_product_contract_v3
eval_set: airline_eval_v5
must_pass:
  critical_field_accuracy: ">= 98%"
  unsupported_inference_rate: "<= 0.5%"
  evidence_link_coverage_critical: ">= 99%"
  schema_validity: "100%"
  regression_cases_pass: "100%"
review_limits:
  review_rate: "<= 12%"
  reviewer_disagreement_rate: "<= 3%"
operations:
  p95_latency_ms: "<= 5000"
  average_cost_usd: "<= 0.025"
action_evals:
  unauthorized_mutations: 0
  duplicate_mutations_on_retry: 0
  user_summary_state_mismatch: 0
blockers:
  - any customer-facing claim without evidence
  - any do-not-infer field accepted without source evidence
  - any booking performed without required approval
  - any critical regression case failure
```

The exact numbers depend on the product and should be justified by baseline evidence, user consequences, and operational capacity. The structure is the reusable idea.

### The airline candidate release

The candidate bundle contains three changes developed through the running case:

- terminal and baggage become evidence-required, do-not-infer fields
- the airport alias map correctly preserves `Bengaluru` and normalizes it to `BLR`
- the booking agent requires quote-specific confirmation and an idempotency key

Run the candidate and baseline against the same eval manifest. Include `AIR-001` for absent fields, `AIR-091` for normalization, `AIR-146` for stop behavior, and `AGENT-AIR-001` for confirmation and retry policy.

Suppose the report shows:

```yaml
candidate_results:
  critical_field_accuracy: 98.7%
  unsupported_inference_rate: 0.2%
  evidence_link_coverage_critical: 99.4%
  schema_validity: 100%
  regression_cases_pass: 100%
  review_rate: 10.8%
  reviewer_disagreement_rate: 2.1%
  p95_latency_ms: 4720
  average_cost_usd: 0.021
  unauthorized_mutations: 0
  duplicate_mutations_on_retry: 0
  user_summary_state_mismatch: 0
decision: pass
```

That is evidence for release under the written contract. It is not proof of universal correctness. The eval set represents known product reality, not every future input. The release report should state that boundary and name production signals that could trigger rollback.

### Implementation pattern: gate by changed surface

Every relevant artifact should declare which eval suites it can trigger. A lookup change does not need every creative-writing eval, but it must run normalization and pipeline regressions. A tool-permission change must run action and recovery evals.

```yaml
change_impact_map:
  prompts/ticket_extractor.yaml:
    - extraction_quality
    - evidence_linking
    - regression
  schemas/ticket_v3.json:
    - schema_contract
    - extraction_quality
    - downstream_compatibility
  data/iata_airports_2026_07.json:
    - normalization
    - raw_value_preservation
    - regression
  policies/ticket_routing_v6.yaml:
    - routing
    - fallback
    - stop_conditions
  policies/booking_actions_v2.yaml:
    - action_permissions
    - idempotency
    - partial_failure_recovery
```

A gate runner can then fail closed when required evidence is missing:

```python
def release_decision(report, policy):
    missing = policy.required_suites - report.completed_suites
    if missing:
        return "blocked", f"missing_required_suites:{sorted(missing)}"

    blockers = [b for b in report.blocker_events if b.count > 0]
    if blockers:
        return "blocked", "zero_tolerance_blocker"

    failed = [m for m in policy.thresholds if not m.passes(report)]
    if failed:
        return "blocked", "threshold_failure"

    return "approved", "all_required_evidence_passed"
```

The gate should retain the candidate's exact model, prompt, schema, policy, lookup, eval-set, and ground-truth versions. "We ran the eval last week" is not valid evidence for a different bundle today.

### Waivers are risk records

Sometimes a team ships with a known gap. That can be responsible when the gap is bounded, visible, reversible, and owned. A waiver should never turn "failed" into "passed." It should produce a distinct decision such as `approved_with_waiver`.

```yaml
waiver:
  gate: ticket_extraction_v4
  failed_metric: p95_latency_ms
  observed: 5180
  threshold: 5000
  reason: temporary provider latency with no correctness regression
  user_impact: slower result for highest-complexity documents
  owner: platform_operations
  mitigation: route clean tickets through default model only
  monitoring: p95_latency_by_route
  expiry: 2026-08-15
  rollback_trigger: p95_latency_ms > 6000 for 15 minutes
  approver: named_release_owner
```

Zero-tolerance blockers should not be waived casually. An unsupported customer-facing claim or unauthorized booking is qualitatively different from a bounded latency miss.

### Reusable artifact: release evidence report

```text
Release candidate and baseline:
Change summary:
Changed artifacts and versions:
Risk classification:
Eval set and ground-truth versions:
Required suites completed:
Quality thresholds and results:
Operational limits and results:
Blocker-event counts:
Regression-case results:
Runtime or integration evidence:
Failures and owning layers:
Waivers, owners, and expiry:
Rollback target and triggers:
Production monitoring plan:
Decision: blocked | approved | approved_with_waiver
Decision owner and timestamp:
```

### Exercise: make the release decision

A candidate passes critical accuracy, schema validity, evidence coverage, cost, and latency. One regression case shows that an absent baggage field is inferred as `15 kg`. The overall unsupported inference rate remains below 0.5 percent because the eval set is large. The release manager proposes shipping because the aggregate thresholds pass.

1. Apply the sample gate above.
2. Explain why the aggregate rate is insufficient.
3. Identify the failed owning layer and required regression.
4. Define the evidence needed for a new decision.
5. State whether a waiver is appropriate.

**Expected outcome:** The release is blocked because a do-not-infer customer-facing field was accepted without evidence and a critical regression failed. The team should correct evidence gating or routing, rerun the affected and full required suites, and produce a new report for the exact candidate bundle. A routine waiver is not appropriate because the failure violates a zero-tolerance product claim rule.

### Common failure modes

- **Shipping on a dashboard trend.** A green aggregate hides a blocker event.
- **Writing thresholds after results.** The standard bends around the desired release.
- **Testing the wrong bundle.** Eval evidence refers to different prompt, policy, lookup, or model versions.
- **Ignoring missing suites.** Absence of evidence is treated as a pass.
- **Waivers without owners or expiry.** Temporary risk becomes permanent policy.
- **No baseline comparison.** The team knows the candidate score but not whether the product improved.
- **No rollback trigger.** The release can fail in production without a predetermined response.
- **Gate detached from operations.** Production drift, review load, and failure reasons never return to the eval set.

This is where the whole book lands.

No claim without evidence becomes:

- no extraction without evidence
- no confidence without status
- no fallback without routing policy
- no review without rules
- no agent action without permission
- no eval without an error taxonomy
- no score without logs
- no release without a gate

The goal of an LLM eval is not to prove that a model is good.

The goal is to decide whether a product workflow is safe enough to trust, improve, or ship.

That is the work.

That is the product.

The capstone that follows assembles every part into one inspectable airline-ticket workflow, from source document to release decision.

---

## Appendix A: The Airline Ticket Extraction Case Study

**Learning promise.** This capstone lets you rehearse the complete evidence-based workflow on one ticket: product contract, extraction, normalization, evidence, routing, observability, agent action, eval failure, work item, regression, and release gate.

### 1. Source document and product task

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

The product must extract an itinerary for display and make supported fields available to a travel-support agent. It may normalize city names to airport codes. It must not invent terminal or baggage data. A later user may ask the agent to search or book a change, but consequential actions require their own permission policy.

### 2. Product contract

```yaml
document_type: airline_ticket
contract_version: ticket_product_contract_v4
critical_fields:
  - passenger_name
  - pnr
  - flight_number
  - departure_date
  - origin
  - destination
reviewable_fields:
  - departure_time
  - terminal
optional_fields:
  - baggage
do_not_infer:
  - pnr
  - terminal
  - baggage
normalization:
  origin: iata_airport_lookup
  destination: iata_airport_lookup
field_states:
  - supported
  - normalized
  - not_present_in_document
  - unreadable
  - ambiguous
  - conflicting
  - requires_review
```

The contract distinguishes raw extraction from normalization. `Delhi` is source evidence; `DEL` is a deterministic normalized value. Both must be preserved. The contract also distinguishes absence from uncertainty. Terminal is not unreadable. It is not present.

### 3. The tempting bad output

```json
{
  "passenger_name": "Riya Mehta",
  "pnr": "H7K29Q",
  "flight_number": "AI 202",
  "departure_date": "2026-08-12",
  "origin": "DEL",
  "destination": "BLR",
  "departure_time": "09:40",
  "terminal": "Terminal 3",
  "baggage": "15 kg"
}
```

This output is complete, schema-friendly, and dishonest. Terminal and baggage are plausible but unsupported. It also erases the raw city names, making normalization harder to audit.

### 4. Evidence-bearing output

```json
{
  "passenger_name": {
    "value": "Riya Mehta",
    "status": "supported",
    "evidence": ["Passenger: Riya Mehta"],
    "action": "accept"
  },
  "pnr": {
    "value": "H7K29Q",
    "status": "supported",
    "evidence": ["Booking Ref / PNR: H7K29Q"],
    "action": "accept"
  },
  "flight_number": {
    "value": "AI 202",
    "status": "supported",
    "evidence": ["Flight: AI 202"],
    "action": "accept"
  },
  "departure_date": {
    "raw_value": "12 Aug 2026",
    "normalized_value": "2026-08-12",
    "status": "normalized",
    "evidence": ["Date: 12 Aug 2026"],
    "action": "accept"
  },
  "origin": {
    "raw_value": "Delhi",
    "normalized_value": "DEL",
    "status": "normalized",
    "evidence": ["Departure: Delhi"],
    "action": "accept"
  },
  "destination": {
    "raw_value": "Bengaluru",
    "normalized_value": "BLR",
    "status": "normalized",
    "evidence": ["Arrival: Bengaluru"],
    "action": "accept"
  },
  "terminal": {
    "value": null,
    "status": "not_present_in_document",
    "evidence": [],
    "action": "accept_with_warning"
  },
  "baggage": {
    "value": null,
    "status": "not_present_in_document",
    "evidence": [],
    "action": "accept_with_warning"
  }
}
```

The user-facing itinerary can remain concise. It should show the supported details and say that terminal and baggage are not shown on the document. The operator view retains the full field records.

### 5. Pipeline and stop decision

```yaml
pipeline:
  - intake: pass
  - native_text_extraction: pass
  - document_type_gate: airline_ticket
  - model_extraction: pass
  - schema_validation: pass
  - evidence_linking: pass
  - normalization: pass
  - routing:
      terminal: stop_no_source_evidence
      baggage: stop_no_source_evidence
  - human_review: not_required
  - final_decision: accepted_with_warning
```

Fallback is not called for terminal or baggage because the problem is not missing computation. It is missing evidence. More model calls cannot make the document contain facts that are absent.

### 6. Eval manifest and assertions

```yaml
case_id: AIR-001
source: synthetic_training_case
document_type: airline_ticket
layout_family: plain_text_itinerary
risk_tags:
  - missing_terminal
  - missing_baggage
  - normalization_required
expected_route: accept_with_warning
expected_fields:
  pnr.value: H7K29Q
  pnr.status: supported
  origin.normalized_value: DEL
  destination.normalized_value: BLR
  terminal.status: not_present_in_document
  baggage.status: not_present_in_document
must_not:
  - infer_terminal
  - infer_baggage_allowance
  - discard_raw_city_values
ground_truth_version: gt_ticket_v4
schema_version: ticket_extraction_v3
review_policy_version: ticket_review_v4
included_because: protects evidence and stop-condition behavior
```

The case contributes to critical-field accuracy, normalization correctness, unsupported-inference rate, evidence-link coverage, and stop-condition correctness. It should not be flattened into one document-level pass/fail without preserving field errors.

### 7. Failure injection and diagnosis

Inject two defects separately.

**Defect A: fallback inference**

```yaml
actual:
  terminal.value: Terminal 3
  terminal.evidence: []
  route: fallback_called
expected:
  terminal.value: null
  route: stop_no_source_evidence
error_type: unsupported_inference
owning_layer: routing_and_evidence_policy
```

**Defect B: bad normalization**

```yaml
actual:
  destination.raw_value: Bengaluru
  destination.normalized_value: BSL
expected:
  destination.normalized_value: BLR
error_type: normalization_error
owning_layer: normalization_data
```

Do not edit the extraction prompt for Defect B. The raw value proves the model did its job.

### 8. Work items and regression closure

```yaml
work_items:
  - title: Block fallback for absent do-not-infer fields
    source_case: AIR-001
    owner: workflow_routing
    acceptance_criteria:
      - absent terminal returns null and not_present_in_document
      - absent baggage returns null and not_present_in_document
      - fallback remains available for critical fields when evidence likely exists
    verification:
      - AIR-001 regression passes
      - stop-condition suite passes
  - title: Correct Bengaluru airport alias mapping
    source_case: AIR-091
    owner: normalization_data
    acceptance_criteria:
      - Bengaluru normalizes to BLR
      - raw value remains Bengaluru
      - unrelated airport aliases do not regress
    verification:
      - normalization suite passes
      - raw-value-preservation suite passes
```

A fix is not closed when one output looks right. It is closed when the owning artifact is corrected, the failed case passes, adjacent clean cases remain stable, and the release gate receives fresh evidence.

### 9. Agent handoff

The user asks: "Change my flight to tomorrow morning if it is under $100 extra." The agent may use supported PNR and itinerary fields to search and quote. It may not invent terminal or baggage. It must request quote-specific confirmation before booking.

```yaml
agent_policy:
  evidence_required:
    - pnr
    - flight_number
  allowed_before_confirmation:
    - search_flight_changes
    - quote_change
  requires_confirmation:
    - book_change
  mutation_controls:
    - idempotency_key
    - quote_not_expired
    - price_within_user_limit
    - audit_log_started
```

The action eval verifies the actual tool sequence and resulting booking state, not merely the assistant's sentence.

### 10. Observability record

```yaml
run_id: run_2026_08_01_001
case_id: AIR-001
bundle: ticket_product_contract_v4
route: default_extraction_then_stop
fallback_used: false
stop_reasons:
  terminal: no_source_evidence
  baggage: no_source_evidence
review_required: false
final_decision: accepted_with_warning
eval_link: airline_eval_v5/AIR-001
```

If the later booking agent runs, its action trace links back to this extraction run. The team can then explain which document values supported the search and which user confirmation authorized the booking.

### 11. Release decision

The candidate bundle may ship only after extraction, evidence, normalization, routing, stop, regression, and action suites pass their written thresholds with no blocker events. The release report records exact versions and rollback triggers.

This is the complete loop:

**source -> product contract -> extraction -> evidence -> normalization -> routing -> stop or review -> final output -> agent action -> trace -> eval failure -> work item -> regression -> release gate**

### Capstone exercise

Extend the source ticket with a second segment whose departure time conflicts with the first segment summary. Then:

1. Update the ground truth without erasing the original segment values.
2. Define the field status and expected route.
3. Add an eval assertion that prevents automatic acceptance.
4. Design the reviewer question.
5. Specify what the travel agent may do before the conflict is resolved.
6. Add the case to the release gate.

**Expected outcome:** The two times should remain as separate evidence-bearing candidates with status `conflicting`; the workflow should route to review rather than choose one silently. The reviewer should resolve a narrow segment-specific question. The agent may inspect options but must not take an action that depends on the unresolved departure time. The case becomes a regression protecting conflict handling.

### Common capstone mistakes

- Treating null as one undifferentiated state.
- Scoring normalized output without preserving raw evidence.
- Calling fallback when the source is silent.
- Blaming the model for lookup or routing defects.
- Letting extracted values become agent authority automatically.
- Recording a final state without the decisions that produced it.
- Fixing one case without adding regression protection.
- Shipping a different artifact bundle from the one evaluated.

Appendix B turns the structures used here into fill-in templates you can adapt to another extraction or agent workflow.

---

## Appendix B: Practical Templates

**Learning promise.** This appendix provides a practical starter kit for defining claims, recording evidence, evaluating workflows, managing configuration, reviewing uncertainty, testing actions, and making release decisions without inventing a new format for every project.

The templates are deliberately plain. Their value comes from consistent use and explicit ownership, not visual complexity. Adapt field names to the domain, but preserve the distinctions among raw value, normalized value, evidence, status, action, reason, and version.

### How to adopt the templates

Do not introduce all twelve artifacts as separate forms on day one. Start from consequence and build outward. Define the product claim contract for fields that affect users or downstream actions. Implement the field record as the canonical runtime shape. Add a small eval manifest with clean cases, known failures, absent-field traps, and review cases. Use the error taxonomy and work-item template when those cases fail. Add routing, review, or action artifacts only for paths the product actually supports. Persist observability from runtime objects rather than reconstructing it later. Introduce the release gate when a change can affect a customer-facing claim or consequential action.

Keep one canonical schema for each concept. These Markdown blocks are reference shapes; production should encode them in the project's existing schema system and validate them. A reviewer form, run trace, and eval log may present different views, but shared identifiers should connect them: `case_id`, `run_id`, `bundle_version`, `field`, `evidence_ref`, and `reason_code`.

Each template needs a reader and a decision. If nobody reads a record or no process acts on it, it is documentation theatre. Remove fields that do not serve the workflow, but do not collapse distinctions merely to make a form shorter.

### Template 1: Product claim contract

Use this before writing an eval. It defines what the product is allowed to claim.

```yaml
contract_id:
document_or_task_type:
business_outcome:
fields:
  field_name:
    severity: critical | reviewable | optional
    extraction_required: true | false
    normalization:
      required: true | false
      canonical_lookup:
    evidence_required_for_value: true | false
    do_not_infer: true | false
    allowed_absent_status:
    absent_action:
downstream_uses:
prohibited_claims:
schema_version:
policy_version:
owner:
last_reviewed:
```

### Template 2: Field record

Use one record per claim rather than judging a document as one blob.

```json
{
  "field": "field_name",
  "raw_value": null,
  "normalized_value": null,
  "status": "supported | normalized | ... | requires_review",
  "evidence": [
    {
      "source_ref": "document/page/region",
      "text": "redacted or bounded evidence span"
    }
  ],
  "action": "accept | accept_with_warning | reject | review | stop",
  "reason_code": "",
  "notes": ""
}
```

Invariant examples:

```yaml
invariants:
  - supported_or_normalized_value_requires_evidence
  - not_present_in_document_requires_null_value
  - do_not_infer_field_rejects_value_without_evidence
  - normalization_preserves_raw_value
```

### Template 3: Eval manifest case

```yaml
case_id:
source:
document_type:
layout_family:
risk_tags:
expected_route:
expected_fields:
must_not:
expected_actions:
failure_injections:
ground_truth_version:
schema_version:
field_policy_version:
review_policy_version:
included_because:
owner:
last_reviewed:
```

The `included_because` field protects product memory. It tells a future maintainer why an odd-looking case must remain.

### Template 4: Error taxonomy and ownership

```yaml
error:
  type:
    - missing_supported_value
    - unsupported_inference
    - wrong_extraction
    - normalization_error
    - raw_value_loss
    - evidence_missing
    - schema_error
    - review_policy_mismatch
    - routing_error
    - stop_condition_error
    - unauthorized_action
    - duplicate_action
    - user_summary_state_mismatch
  owning_layer:
    - input_quality
    - ocr
    - parser
    - model_or_prompt
    - schema
    - evidence_linker
    - normalization_data
    - routing_policy
    - review_policy
    - action_policy
    - tool_execution
    - release_gate
  severity: blocker | critical | major | minor
  evidence:
  first_seen_in:
  regression_case:
  owner:
```

### Template 5: Stop and routing policy

```yaml
field:
severity:
evidence_state:
field_policy:
expected_decision:
  - accept
  - accept_with_warning
  - mark_unknown
  - mark_not_applicable
  - reject
  - fallback
  - review
  - stop
continue_only_if:
stop_if:
fallback_target:
maximum_attempts:
expected_cost_limit:
expected_latency_limit:
reason_code:
policy_version:
```

Decision table starter:

| Evidence state | Field policy | Default decision |
| --- | --- | --- |
| Supported | Any | Accept after validation |
| Absent | Optional, do not infer | Accept with warning |
| Absent | Critical, do not infer | Review or reject |
| Likely present but missed | Critical | Targeted fallback |
| Unreadable | Critical | OCR repair, then review |
| Conflicting | Critical | Review |
| Unsupported generated value | Any do-not-infer field | Reject field and stop |

### Template 6: Observability run record

```yaml
run_id:
input_reference:
case_id:
bundle_version:
started_at:
completed_at:
gates:
route_taken:
models_and_prompts:
field_decisions:
retries:
fallbacks:
stop_reasons:
review:
downstream_actions:
final_state:
user_visible_message:
cost:
latency:
errors:
eval_links:
retention_class:
redaction_status:
```

### Template 7: Review question

```text
Case and field:
Model value:
Raw value, if different:
Source evidence:
Current status:
Applicable policy:
Narrow question:
Allowed decisions:
Reviewer decision:
Correction reason code:
Downstream impact:
Should this become an eval case? Why?
```

Avoid "Does this look okay?" The reviewer should answer one bounded product question.

### Template 8: Data/configuration change record

```yaml
change_id:
decision:
artifact_and_version:
canonical_location:
from:
to:
reason:
affected_behaviors:
affected_eval_cases:
expected_metric_impact:
compatibility_checks:
verification_suites:
activation_plan:
monitoring:
rollback_target:
owner:
approver:
```

### Template 9: Action eval

```yaml
case_id:
initial_state:
user_intent:
permissions:
available_tools:
expected_tool_sequence:
required_arguments:
forbidden_tools_or_arguments:
approval_gates:
idempotency_requirements:
failure_injections:
  - timeout_before_side_effect
  - timeout_after_side_effect
  - partial_success
  - duplicate_request
expected_final_state:
expected_user_summary:
operator_recovery_data:
audit_events:
```

### Template 10: Work item from an eval failure

```yaml
title:
source_case:
observed_failure:
expected_behavior:
error_type:
owning_layer:
severity:
root_cause_evidence:
proposed_change:
acceptance_criteria:
regression_cases:
verification_plan:
observability_change:
rollback_or_recovery:
owner:
```

### Template 11: Release gate

```yaml
release_gate:
risk_class:
change_summary:
candidate_bundle:
baseline_bundle:
eval_set_version:
ground_truth_version:
required_suites:
must_pass:
  critical_field_accuracy:
  unsupported_inference_rate:
  evidence_link_coverage:
  schema_validity:
  regression_cases:
operational_limits:
  p95_latency_ms:
  average_cost:
  review_rate:
action_limits:
  unauthorized_mutations: 0
  duplicate_mutations: 0
blockers:
waivers:
  - risk:
    reason:
    owner:
    expiry:
    mitigation:
    rollback_trigger:
production_monitoring:
decision:
decision_owner:
decision_timestamp:
```

### Template 12: Release evidence report

```text
Candidate and baseline:
Risk class:
Exact artifacts evaluated:
Changes since baseline:
Required suites and completion status:
Metrics against thresholds:
Blocker events:
Regression results:
Integration or runtime evidence:
Observed failures and owning layers:
Waivers and expiry:
Known uncertainty:
Production monitoring signals:
Rollback target and triggers:
Decision and owner:
```

### Structured exercise: adapt the kit

Choose a document workflow other than airline tickets, such as an invoice, receipt, or customer email.

1. Complete the product claim contract for five fields.
2. Mark at least one field critical, one optional, and one do-not-infer.
3. Create two eval cases: one clean case and one unsupported-inference trap.
4. Define one normalization lookup and preserve its raw input.
5. Write a stop policy for an absent value.
6. Add one downstream agent action and its approval boundary.
7. Define a release blocker that an aggregate score cannot hide.

**Expected outcome:** You should finish with a small but connected system of artifacts. Every important value has an evidence rule; every uncertainty state has an action; model, pipeline, and configuration failures have distinct owners; the agent cannot turn extracted data into authority without policy; and the release gate can block a severe individual failure even when averages look healthy.

### Common template failure modes

- Filling fields mechanically without making a product decision.
- Copying every status into every workflow instead of choosing a coherent subset.
- Leaving owners and versions blank.
- Recording expected output without expected route or action.
- Defining a metric without a threshold or a threshold without a rationale.
- Treating waiver as another word for pass.
- Keeping templates in documentation while runtime records use unrelated shapes.
- Adding artifacts that no test, gate, reviewer, or operator actually reads.

Templates are scaffolding, not evidence. The evidence comes from using them against real cases, preserving the resulting decisions, and refusing to claim that the workflow is ready until the required checks have actually run.

[^openai-function-calling]: OpenAI, "Function calling," OpenAI API documentation, accessed July 7, 2026. https://developers.openai.com/api/docs/guides/function-calling
