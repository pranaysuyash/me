## Chapter 6: One Good Output Does Not Mean Your Prompt Works

You give a model one document. It returns clean, structured data, and the demo feels convincing. That proves the task can work on that input. It does not prove reliability across real inputs, where model, instructions, source quality, layout, and ambiguity can change. Reliability asks: what behavior must remain correct as those conditions change?

Consider the airline-ticket case we will follow through the next five chapters. The ticket belongs to Riya Mehta. It shows booking reference H seven K two nine Q, flight AI two-oh-two, travel from Delhi to Bengaluru on the twelfth of August, twenty twenty-six, and departure at nine forty. It does not show a terminal or baggage allowance.

The extraction gets visible fields right but supplies Terminal Three and fifteen kilograms of baggage. It is polished but unsafe.

Turn that failure into a designed evaluation case called AIR zero zero one. Expect terminal and baggage to be empty and marked not present in the document. Preserve Delhi and Bengaluru as raw values, then normalize them to the airport codes D E L and B L R. Explicitly forbid invented terminal and baggage information.

Build cases around clean documents and screenshots, single and multiple passengers, missing fields, rescheduled itineraries, and weak optical character recognition. Optical character recognition, or OCR, converts images into machine-readable text. Give each case expected and forbidden behavior and a route such as accept, warn, or review.

Version each run and capture the existing workflow before improving it. Retain clean passes: a rule that blocks terminal guesses must still extract a visible terminal.

For your reflection, take your best demo and name the assumptions that make it easy. Imagine four variants, each changing one assumption. Define the expected value, evidence status, route, and one forbidden behavior. Before editing the prompt, ask how the current workflow would fail.

One good output answers, can this work once? A designed evaluation begins to answer, does it behave correctly where it matters? Chapter Seven turns that word, correctly, from intuition into a product contract.

## Chapter 7: Ground Truth Is A Product Contract

Ground truth is not merely the correct answer. It is the product's versioned agreement about what counts as correct.

Documents rarely present values in the form a downstream system needs. A ticket may say Delhi while another service expects D E L. A terminal may be absent, which differs from unreadable, ambiguous, or irrelevant.

An extraction result makes several claims: what appears in the source, what field it represents, how a raw value is normalized, what evidence supports it, and whether it is safe to accept, warn about, reject, or review. One string cannot express all of that.

For AIR zero zero one, the origin's raw value is Delhi. Its normalized value is D E L. The status says normalized, the evidence points to the departure line, and the record names the airport-mapping version. For terminal, both values are empty, the status says not present in the document, and the action is accept with warning. No evidence is appropriate for a claim of absence. It would contradict a supported value.

Field policy matters. Booking reference may be critical while baggage is optional. Both baggage and terminal can be do-not-infer fields. A missing booking may block acceptance; missing baggage need not; an absent terminal must not be fabricated.

Validate relationships. Supported values need evidence; normalized values need versioned mappings; absent fields cannot contain raw values. Version ground truth, schema, review policy, and normalization data. After policy changes, create a new version and rerun the baseline, or score changes become ambiguous.

Adjudication should be source-first: locate the span, transcribe the raw value, normalize it, assign evidence status, then apply policy. AIR zero zero one's terminal is not shown, so outside knowledge cannot supply it. Record reviewer disagreement; it may reveal an incomplete contract.

For your reflection, choose one field your team corrects inconsistently. Separate transcription from normalization. Decide what happens when it is present, absent, unreadable, and ambiguous. State whether inference is allowed and what evidence is required. Could another reviewer apply the rule without asking what you meant?

Ground truth makes judgment inspectable. A right-or-wrong label still cannot tell engineering what to fix. Chapter Eight separates an error's product risk from its technical cause.

## Chapter 8: Not All Extraction Errors Are Equal

Accuracy hides risk. If an airline-ticket extractor gets nine of ten fields right, ninety percent sounds reassuring. But one error could be an optional meal preference; another could attach an itinerary to the wrong booking. The arithmetic treats them equally. The product cannot.

Classify failures on separate axes. Severity asks what happens if the failure reaches a user or workflow. Failure type asks what relationship among source, output, and policy was broken. Severity helps decide whether to block, warn, or tolerate. Failure type helps decide what to repair.

AIR zero zero one contains at least three failures. Invented terminal and baggage values are unsupported inference with high severity, initially owned by the evidence gate and routing policy. Returning D E L while losing the raw value Delhi is traceability loss owned by the output schema. Calling all three wrong extraction would send every problem back to prompt editing, although the durable fixes belong in different layers.

Use a compact taxonomy: unsupported inference, wrong extraction, entity merge, normalization error, evidence loss, policy mismatch, and routing error. Keep severity separate: critical for unsafe decisions or wrong entities; high for customer or operational damage; medium for recoverable degradation; low for presentation issues.

Context changes severity. A missing departure time may be moderate in an archive and critical in an airport-transfer workflow.

Treat the owning layer as a hypothesis. If an airport code is wrong but Delhi was extracted correctly, test the normalizer alone. For an invented terminal, ask whether parsing found evidence, validation rejected the guess, routing called fallback after absence was known, and the final decision let it through. One failure can reveal several broken defenses.

Turn causes into behavioral work. Instead of improve hallucinations, require absent do-not-infer fields to remain empty, prevent fallback without evidence, and keep visible-terminal extraction working. Now the work has an owner and regression checks.

For your reflection, classify ten failures by type, severity, owner, and consequence. Compare the most frequent group with the most dangerous one, choose a systemic fix, and add a regression case for the highest-severity failure.

The taxonomy explains what broke and what it could cost. It does not say whether the whole workflow is better. Chapter Nine replaces the one-number leaderboard with a decision-oriented scorecard.

## Chapter 9: Accuracy Alone Is Not An Eval Strategy

Accuracy is a starting point, not an evaluation strategy. Strategy begins with a decision. Are you choosing a default model, deciding whether a prompt can ship, testing fallback, measuring an evidence gate, or detecting drift? Different decisions require different evidence.

Compare two airline-ticket systems. System A has ninety-five percent field accuracy, eight percent unsupported inference, and seventy-six percent evidence coverage. System B has ninety-two percent field accuracy, one percent unsupported inference, and ninety-nine percent evidence coverage. The flat leaderboard chooses A. The product contract may correctly choose B.

On AIR zero zero one, a completion-oriented scorer rewards System A for filling terminal and baggage. System B marks them absent, preserves raw route values, and links supported fields to their source. If those fields must not be inferred, the higher score has rewarded unsafe behavior.

Keep critical correctness, unsupported inference, evidence coverage, normalization, review escalation, fallback effects, and routing visible. A weighted summary must not average away a release blocker.

Separate metrics from hard constraints. You might maximize critical-field accuracy and evidence coverage while requiring zero unsupported inference on critical fields, zero wrong-entity assignments, valid structure above an agreed threshold, and passing regression cases. A release gate should return reasons. Blocked by one wrong-entity assignment is useful. Release score eighty-one is not.

Define each metric by unit, eligible cases, numerator, denominator, missing-result treatment, and slices. Evidence coverage applies to supported fields, not fields correctly absent. Report both count and rate for unsupported inference, and retain case records beneath every chart.

A lower review rate might mean better automation or hidden uncertainty. Pair it with corrections, critical escapes, and routing. Compare candidates with a real baseline, then inspect worst cases as well as averages.

For your reflection, name the decision, baseline, and candidate. Choose no more than five metrics, define two hard constraints, and select slices that could expose regression. With higher accuracy but worse unsupported inference, does your scorecard produce a defensible adopt, continue-testing, or reject decision?

The scorecard covers correctness and risk. A technically strong workflow can still fail if every document is slow, expensive, or labor-intensive. Chapter Ten adds the operating cost of trust.

## Chapter 10: Cost, Latency, And Review Effort Belong In The Eval

An artificial-intelligence workflow can be accurate and still be wrong for the product. If it is too slow, expensive, or dependent on human review, it may not survive real use. Cost, latency, and review effort belong inside the product contract.

The useful unit is the cost of one acceptable final decision, including parsing, optical character recognition, model use, retries, fallback, lookups, queueing, review, correction, and reprocessing.

A cheap call can become expensive by escalating too many documents. Human review also varies: checking one highlighted field differs from reconstructing an itinerary from a poor scan.

Compare a small model, a large model, and a small model with an evidence gate and targeted fallback. Aggregates are insufficient.

For AIR zero zero one, the gate knows terminal and baggage are absent and must not be inferred. Fallback cannot create missing evidence. The correct route is to stop and accept with warning. Another model call adds cost, delay, and another chance to invent a value. For AIR zero zero two, weak OCR may hide a visible flight number. OCR repair or targeted fallback could recover evidence and avoid review. The real question is which evidence states justify the extra step.

Keep a per-document ledger: stage latency and cost, retries, fallback, stop reason, review requirement, final decision, and quality. For reviewed cases, separate queue time from active work and record fields presented, highlighted evidence, corrections, and disagreement.

Calculate expected cost per acceptable document by combining infrastructure cost with the probability and active cost of review and reprocessing. Do not invent a monetary cost for failures without business evidence. Mark it unknown and preserve severe escape counts as hard constraints.

Connect review to volume. At ten thousand documents per week, a twelve percent review rate and forty-five seconds per review create fifteen hours of work before queue management and rework. State assumptions, examine peaks, and slice by case type because clean tickets, poor scans, group itineraries, and missing-field traps have different economics.

For your reflection, compare two workflows on the same cases. Record cost, latency, fallback, retry, and review. Estimate active review from a stated sample. Define quality, latency, and review-capacity limits. Which workflow satisfies all three?

We can now evaluate correctness, risk, cost, latency, and human effort. Chapter Eleven asks what the workflow should do when uncertainty appears: continue, repair, fall back, review, or stop. Those choices are policies, and they must earn evidence too.
