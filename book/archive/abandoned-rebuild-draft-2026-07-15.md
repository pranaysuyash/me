# No Claim Without Evidence

## How to Build AI Systems You Can Verify

Pranay Suyash

First edition

> A field guide for builders who need AI outputs to be traceable, testable, reviewable, and safe to release.

## Copyright

Copyright 2026 Pranay Suyash. All rights reserved.

No part of this publication may be reproduced, stored, or transmitted in any form without written permission from the author, except for brief quotations used in reviews or scholarly discussion.

The examples in this book are educational. They do not constitute legal, compliance, security, or financial advice. Product teams remain responsible for requirements, risk assessment, testing, and deployment decisions in their own context.

## Contents

Part I - The Evidence Habit

1. No Claim Without Evidence
2. Turn Broad Prompts Into Verifiable Questions
3. Locate Failure In Model, Pipeline, Or Data

Part II - Define The Product Contract

4. Define The Output Contract
5. Model Missingness, Uncertainty, And Conflict

Part III - Construct The Eval Contract

6. From One Good Output To Ground Truth
7. Create An Error Taxonomy
8. Score According To Failure Cost
9. Design A Representative Eval Set
10. Make Runs Reproducible And Comparable

Part IV - Workflow Evals

11. Turn Results Into Routing And Fallback Rules
12. Test When The Workflow Should Stop
13. Test The Pipeline, Not Just The Model

Part V - Product Memory

14. Make Eval Logs Produce Work Items
15. Promote Every Fix Into A Regression Test
16. Maintain The Eval Set Through Production Drift

Part VI - Trust And Review

17. Separate Confidence From Evidence
18. Design Human Review As A Product Path
19. Make Evidence The Release Gate

Appendices

A. A Minimum Viable Eval Kit
B. Field Severity And Review Templates
C. References

## Preface

This book began as a daily writing habit. I was documenting small lessons from building AI workflows: why one good output proves very little, why a missing field is not an invitation to guess, why a fallback model needs its own evaluation, and why review effort belongs in the same conversation as accuracy.

The posts were useful as observations. They were not yet a book.

A book needs a spine. The spine here is a simple rule: **no claim without evidence**. If a system says a document contains a terminal, a fare, a policy number, or a diagnosis, it should be able to show where that value came from. If a team says a workflow is ready to ship, it should be able to show the tests, thresholds, review policy, and release decision that support the claim.

The running example is airline-ticket extraction. It is deliberately ordinary. A ticket or itinerary may contain passenger names, flight numbers, dates, routes, baggage allowances, terminals, booking references, and prices. Some fields are clear. Some are absent. Some appear in multiple places. Some require normalization. This is exactly the kind of document where a polished JSON object can look right while being wrong.

The ideas apply beyond extraction. They apply to support agents, report generators, research assistants, coding agents, recommendation systems, and any workflow in which a model's output can create downstream work or user harm.

The goal is not to make models sound cautious. The goal is to build systems that can distinguish what they know, what they inferred, what they could not verify, and what must happen next.

# Part I

## The Evidence Habit

The first move is cultural before it is technical: replace confidence with a chain of proof.

# 1. No Claim Without Evidence

An AI product is a machine for making claims. A classifier claims that an email is urgent. An extractor claims that a flight departs at 18:40. A support agent claims that a refund is eligible. A coding agent claims that the tests pass.

The problem is not that models make mistakes. Every useful system makes mistakes. The problem is that fluent output hides the distance between an answer and the evidence that supports it.

Consider an itinerary with no terminal printed on it. The extractor returns:

```json
{
  "departure_airport": "DEL",
  "terminal": "3",
  "flight_number": "AI 865"
}
```

The object is clean. The terminal may even be plausible. But plausibility is not evidence. If the source does not show Terminal 3, the system has replaced missing information with unsupported inference.

The evidence habit asks four questions for every important output:

1. What exactly is the claim?
2. What source supports it?
3. What transformation was applied?
4. What decision allowed it to move downstream?

This turns a value into an evidence record:

```json
{
  "field": "departure_terminal",
  "value": null,
  "status": "not_present",
  "source": null,
  "transform": null,
  "decision": "accept_with_warning"
}
```

The second object is less complete and more useful. A downstream interface can display "Not shown on ticket." A review queue can ignore it if the terminal is optional. An operations workflow can request confirmation if the terminal is required.

Evidence is not limited to a text span. It can be a bounding box on a document, a database row, a tool result, a policy version, a test run, or a human approval. The form changes; the principle does not.

NIST's AI Risk Management Framework treats measurement as a traceable basis for management decisions and calls for documented, repeatable testing, evaluation, verification, and validation processes [1]. That is the institutional version of the same habit: claims about system trustworthiness require evidence connected to deployment context.

**Practice:** pick one customer-visible field in your product. Write down the claim, source, transform, and release decision. If any of the four is missing, the field is not yet auditable.

![The evidence chain](assets/diagrams/evidence-chain.png)

# 2. Turn Broad Prompts Into Verifiable Questions

"Is this prompt good?" is not a useful evaluation question. Good for which input, which field, which failure cost, and which downstream decision?

Broad prompts produce broad debates. One person likes the tone. Another spots a missed field. A third argues that a larger model would do better. No one has defined what success means.

Narrow questions change the discussion:

- Does the system extract the printed flight number exactly?
- Does it leave the terminal empty when the document does not show one?
- Does it normalize `15 Jul 26` to `2026-07-15` without changing the local date?
- Does it keep outbound and return baggage allowances separate?
- Does it send unreadable payment amounts to review?

Each question has a testable answer. Together they become an eval contract.

The discipline matters when using AI to build AI. "Refactor this extraction pipeline" invites a sweeping answer. "Find every path that can populate `departure_terminal`, then identify which paths lack source evidence" creates a bounded investigation. The second prompt produces work that can be checked against the repository.

A useful decomposition has three levels:

**Requirement question.** What must the product do? Example: never display an unsupported terminal as if it came from the ticket.

**Behavior question.** What observable behavior satisfies the requirement? Example: return `null` with `status=not_present` when no terminal evidence exists.

**Test question.** What fixture and assertion prove that behavior? Example: on `ticket_missing_terminal.pdf`, assert no fallback is called and the final field status is `not_present`.

This is how a product statement becomes executable evidence.

Avoid the opposite mistake: measuring only what is easy. Exact string match is convenient, but it may punish harmless formatting differences and miss dangerous semantic errors. A narrow question should isolate a real product property, not merely a convenient metric.

**Practice:** rewrite one vague quality goal into five yes-or-no questions. If a question cannot be answered from a fixture, runtime trace, or review record, narrow it again.

# Part II

## Define The Product Contract

Model quality matters, but products succeed or fail through the system wrapped around the model.

# 3. Locate Failure In Model, Pipeline, Or Data

Teams often diagnose an AI failure as "the model got it wrong." That description is usually incomplete.

An AI workflow has at least three layers:

1. **Model:** perception, language understanding, and generation.
2. **Pipeline:** preprocessing, routing, tool calls, validation, retries, fallback, review, and release.
3. **Data and configuration:** schemas, prompts, field definitions, normalization maps, thresholds, policies, and eval fixtures.

Suppose an airline ticket shows `AI-865`, but the output contains `AI 865`. Is that wrong? The answer depends on the product contract. If the raw value must preserve the source, the extractor failed. If a normalized flight-number field requires a space, the system may be correct - but only if it also retains the raw value and records the transform.

Now suppose the ticket shows no terminal and the output says `T3`. The model may have inferred from route knowledge. The pipeline failed if it allowed external knowledge for a source-grounded field. The configuration failed if the field policy never said "do not infer."

This separation prevents unproductive model swapping. A more capable model cannot repair an ambiguous schema. A new prompt cannot repair a missing validation gate. A larger eval set cannot repair a routing rule that discards evidence.

Use a layer diagnosis record:

```text
Observed failure: terminal populated without source support
Model: produced T3
Pipeline: accepted unsupported value
Data/config: terminal policy did not forbid inference
Primary fix: add evidence-required policy and validator
Regression: missing-terminal fixture must stop before fallback
```

OWASP's guidance for LLM applications similarly treats risks as application concerns rather than model-only concerns; prompt injection, insecure output handling, excessive agency, and overreliance all emerge from system design [2].

**Practice:** for the last five AI failures in your product, classify the primary cause as model, pipeline, or data/configuration. If all five are labeled "model," investigate again.

![The three-layer system](assets/diagrams/three-layers.png)

# 4. Define The Output Contract

Structured output is not the same as a contract. A JSON schema can ensure that `departure_date` is a string. It cannot tell you whether the date is supported, correctly normalized, or safe to release.

A production field contract should define:

- meaning and scope;
- raw and normalized representations;
- allowed source types;
- evidence requirement;
- whether inference is allowed;
- missing, unreadable, conflicting, and not-applicable states;
- severity if wrong;
- validation rule;
- review and fallback policy.

For example:

```yaml
field: departure_terminal
type: string | null
evidence_required: true
inference_allowed: false
missing_state: not_present
severity: reviewable
fallback_when: evidence_present_but_unreadable
review_when: required_downstream_and_missing
```

Notice the distinction between `not_present` and `unreadable`. They should not trigger the same behavior. If the field is absent, another model call cannot reveal it. If the field is visible but OCR is weak, a vision fallback may help.

The contract should also separate extraction from normalization. Preserve `raw_value`, then derive `normalized_value` through a named transform. This makes failures diagnosable:

```json
{
  "raw_value": "15 Jul 26",
  "normalized_value": "2026-07-15",
  "transform": "date_dmy_short_v2",
  "evidence": {"page": 1, "text": "15 Jul 26"}
}
```

Without that separation, a wrong date could come from OCR, model interpretation, locale assumptions, or normalization. One output field hides four possible defects.

The contract becomes the shared language between product, engineering, evaluation, and operations. It tells the model what to return, the validator what to reject, the reviewer what to inspect, and the release gate what to measure.

**Practice:** fully specify one high-risk field before adding another prompt instruction. Contracts age better than prompt folklore.

# 5. Model Missingness, Uncertainty, And Conflict

Missing values are not one condition. A field can be absent, unreadable, ambiguous, conflicting, not applicable, or available only through inference. Collapsing these states into `null` destroys the information the workflow needs to choose its next action.

Return to the airline ticket. Four documents can all produce an empty terminal:

- The first ticket does not print a terminal.
- The second prints it inside a low-resolution image.
- The third shows `T1` in one section and `T3` in another.
- The fourth is a rail ticket, so an airport terminal does not apply.

The output value is empty in every case, but the evidence state should differ:

```json
{
  "not_present": "No terminal appears in the source",
  "unreadable": "A likely terminal region exists but cannot be read",
  "conflicting": "Two supported values disagree",
  "not_applicable": "The field does not apply to this document"
}
```

These states should drive deterministic policy before another model call is considered.

| Evidence state | Default action | May call fallback? | May release? |
| --- | --- | --- | --- |
| present | validate and accept | only after validation failure | yes |
| not_present | preserve unknown | no | if optional |
| unreadable | attempt targeted recovery | yes | after recovery or review |
| ambiguous | preserve candidates | sometimes | usually review |
| conflicting | show both evidence links | not as a tie-breaker | review |
| not_applicable | mark explicitly | no | yes |

The distinction between `unknown` and `not_present` also matters. `Unknown` describes the system's knowledge. `Not present` makes a claim about the source and therefore requires enough inspection to support it. If the parser only processed page one of a three-page itinerary, it cannot honestly say a field is not present.

Conflict should remain visible. Do not ask a stronger model to choose silently between two printed flight numbers. Preserve each candidate, its location, and the rule that resolves the conflict. If no rule applies, route the field to review.

An evidence-state validator can be simple:

```python
def next_action(field):
    if field.state == "not_applicable":
        return "accept"
    if field.state == "not_present":
        return "review" if field.required else "accept_with_warning"
    if field.state == "unreadable" and field.recovery_budget > 0:
        return "targeted_fallback"
    if field.state in {"ambiguous", "conflicting"}:
        return "review"
    return "validate"
```

**Build artifact:** create an evidence-state transition table for every high-impact field. Include the states a validator may set and the actions each state permits.

**Exercise:** classify ten empty or disputed airline-ticket fields. For each, state what additional evidence would be required to change the state. A correct answer explains the decision, not only the label.

# Part III

## Construct The Eval Contract

An eval is not a leaderboard. It is an agreement about what the product must get right.

# 6. From One Good Output To Ground Truth

Ground truth sounds objective. In real workflows, it contains judgment.

An itinerary may list a marketing carrier and an operating carrier. Which one belongs in `airline`? A total price may include taxes, fees, or multiple passengers. Which amount is the booking total? A date may be printed without a year. Is year inference allowed from booking context?

Annotators cannot answer these questions consistently until the product decides what the fields mean.

Create ground truth in this order:

1. define the user decision the field supports;
2. define the field and allowed evidence;
3. define edge-case policy;
4. annotate examples;
5. adjudicate disagreements;
6. version the policy and dataset together.

Each fixture should carry provenance:

```json
{
  "document_id": "ticket_0146",
  "dataset_version": "1.3.0",
  "policy_version": "2.1.0",
  "annotator": "PS",
  "review_status": "adjudicated",
  "fields": {
    "departure_terminal": {
      "value": null,
      "status": "not_present",
      "evidence": null
    }
  }
}
```

Versioning matters because a score can change even when the model does not. If policy changes from "infer year from booking date" to "do not infer year," historical results are not directly comparable.

The HELM work argues for transparent, multi-metric evaluation across scenarios and publishes prompts and completions to make results inspectable [3]. The lesson for product teams is smaller but similar: preserve the inputs, expected outputs, model outputs, policies, and grader decisions needed to explain a score.

Start with a small, adjudicated set. Twenty representative documents with explicit policies can teach more than two thousand weakly labeled samples.

**Practice:** add `dataset_version`, `policy_version`, and `review_status` to the eval manifest. A ground-truth file without provenance is a future argument waiting to happen.

# 7. Create An Error Taxonomy

An accuracy score tells you that something failed. An error taxonomy tells you what to fix.

At minimum, separate these failure classes:

1. **Omission:** supported value was not returned.
2. **Wrong extraction:** returned value does not match the source.
3. **Unsupported inference:** returned value is plausible but not supported.
4. **Raw-value loss:** output discards material source detail.
5. **Normalization error:** extraction is correct; transform is wrong.
6. **Association error:** a value is attached to the wrong passenger, segment, or leg.
7. **Evidence-link failure:** value may be correct, but its provenance is missing or wrong.
8. **Workflow-decision error:** the system continued, stopped, reviewed, or released incorrectly.

The same visible output can belong to different classes. If `2026-07-15` is wrong because OCR read `16` as `15`, that is wrong extraction. If OCR captured `15 Jul 26` correctly and a date function produced `2026-06-15`, that is normalization. Different owner, different fix, different regression test.

Association errors deserve their own category in multi-entity documents. An itinerary can contain two passengers and four flight legs. Extracting the right baggage allowance and attaching it to the wrong passenger is not a field-level miss; it is a relationship failure.

Give error codes stable names:

```yaml
EVIDENCE_UNSUPPORTED:
  owner: validation
  severity_floor: reviewable
  regression_required: true
NORMALIZATION_DATE_LOCALE:
  owner: normalization
  severity_floor: reviewable
ASSOCIATION_WRONG_SEGMENT:
  owner: extraction_pipeline
  severity_floor: critical
```

A stable taxonomy lets teams aggregate failures without erasing detail. It also stops prompt changes from becoming the default response to every defect.

**Build artifact:** an error catalog containing code, definition, examples, owner, default severity, and likely repair layer.

**Exercise:** classify twelve failures from one eval run. If two codes seem plausible, cite the field contract and choose the earliest layer that violated it.

# 8. Score According To Failure Cost

Flat accuracy treats every field as equally important. Products do not.

An incorrect passenger name may block check-in. An incorrect payment total may create a financial dispute. A missing meal preference may be inconvenient but harmless. A terminal absent from the source should not be filled merely to improve completion rate.

Define severity before choosing metrics:

- **Critical:** wrong output can cause money movement, eligibility, safety, identity, or irreversible action.
- **Reviewable:** wrong output affects workflow decisions but can be caught before release.
- **Informational:** wrong output is inconvenient and easy to correct.
- **Optional:** absence is acceptable and should not trigger expensive recovery.

Then use a scorecard, not one number:

```text
Critical-field exactness       99.5%
Unsupported-inference rate      0.0%
Reviewable-field accuracy      97.0%
Evidence-link coverage        100.0%
P95 latency                     4.2s
Mean model cost                 $0.013
Human correction time          38s
```

The unsupported-inference rate deserves special attention. A complete but invented field can be more dangerous than an explicit unknown.

Cost and latency belong in the eval because routing decisions trade quality against resources. Human correction time belongs there because a model that scores slightly higher may produce errors that are much harder to detect.

Multi-metric evaluation is not indecision. It is how tradeoffs become visible. HELM measures dimensions beyond accuracy, including robustness and efficiency [3]. Your product scorecard should measure the dimensions that affect your users and operators.

**Practice:** write a release threshold for each critical metric and a review threshold for each operational metric. Do not average a critical failure away with easy optional fields.

![A risk-weighted scorecard](assets/diagrams/risk-scorecard.png)
