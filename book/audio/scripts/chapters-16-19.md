## Chapter 16: Observability Is The Product Interface

A trustworthy artificial intelligence workflow must explain what happened, not only to an engineer who can read code, but to the user, reviewer, and operator affected by its result.

Observability is often reduced to logs and metrics. For an AI product, it is part of the interface. A useful trace connects the input, processing path, evidence, decision, and outcome. Without that chain, you have events, but not an explanation.

Return to Riya Mehta's ticket. The workflow extracts booking reference H7K29Q, flight AI 202, the date, route, and time. It normalizes Delhi to D E L and Bengaluru to B L R. Because the ticket shows no terminal or baggage, both remain empty and no fallback runs.

The trace records the document, pipeline and model versions, gate results, and field evidence. For terminal, it records no value, not present in the document, do not infer, and a stop reason of no source evidence. An operator can distinguish a missed value from one the document never contained.

Show each audience the right view of one canonical trace. A user needs the itinerary and honest warnings. A reviewer needs the proposal, evidence, and policy. An operator needs routing, fallbacks, reviews, versions, and final state. A builder may also need raw output, errors, and cost.

Record each transition as an immutable decision event containing value, evidence, status, action, reason, and relevant versions. Stable reasons make failures searchable. Use redacted evidence when full text exposes personal information, and never collect secrets merely for possible future debugging.

For reflection, imagine that the extractor found no terminal, a fallback proposed Terminal 3, and the workflow accepted it. Name the source state, routing rule, missing evidence, validation decision, and user message. The model guessed, but routing and evidence gating made the guess a claim. Your regression should require a do-not-infer field without evidence to stop.

Observability makes extraction explainable. The next chapter raises the consequence: what changes when the system uses a field to take action?

## Chapter 17: Agents Need Action Evals

An agent is not only an answer generator. It proposes or takes actions. That changes what an evaluation, or eval, must measure.

When a model gives a wrong answer, the failure may remain in text. When an agent calls the wrong tool, changes the wrong record, or books the wrong itinerary, the failure changes the world. The unit of evaluation is now a sequence of state transitions.

An action eval starts with state, policy, and allowed transitions. It asks whether a tool was needed, whether its arguments came from evidence and intent, whether permission existed, what changed, and whether a retry could duplicate the action. A final message can hide both imaginary success and an unauthorized booking.

Riya now says, "Change my flight to tomorrow morning if it is under one hundred dollars extra." Her supported ticket fields include booking reference H7K29Q, flight AI 202, and the date. Terminal and baggage remain absent.

A safe agent may read the ticket, search alternatives, and request a quote. It must ask Riya to confirm a qualifying quote unless she explicitly pre-authorized booking. The price limit is not blanket permission, and absent terminal or baggage details must not be invented.

Before execution, a deterministic policy gate verifies the evidence-backed booking reference, price limit, current quote confirmation, quote validity, and idempotency key. The model proposes; policy decides whether state may change.

Evaluate the proposed call, authorization result, and observed external state. A successful response code is not proof. Confirm the itinerary, charge, action identifier, and user summary.

Test wrong tools, bad arguments, stale confirmation, rejection, partial success, and recovery. After a timeout, reconcile the original idempotency key or provider action identifier before retrying; the provider may already have completed the booking.

For reflection, the agent finds an option costing eighty-two dollars extra, books without asking, and promises fifteen kilograms of baggage, though the ticket showed none. Classify booking as an action-policy failure and the baggage statement as an unsupported claim. Recovery needs both itineraries, the quote, price difference, provider action identifier, confirmation state, and required user contact.

Trustworthy agents leave actions constrained and recoverable. Those constraints also live in schemas, policies, lookup tables, and thresholds. That is where we go next.

## Chapter 18: Data And Configuration Are Product Code

AI systems do not fail only in the model or prompt. They also fail in the data and configuration layer.

Schemas, prompts, review rules, model routes, fallbacks, lookup tables, normalization maps, and eval manifests all determine behavior. A one-line change can alter which model runs, what reaches review, and what users see.

Code is any instruction that changes system behavior. A do-not-infer policy is executed by the router; an airport map changes output; a threshold changes review volume. Each artifact needs a canonical owner, version, validation, behavioral tests, monitoring, and rollback.

The airline case reveals why this third layer matters. Suppose the model correctly extracts Delhi and Bengaluru, but a stale lookup maps Bengaluru to B S L instead of B L R. The extractor did not fail. The normalization data failed. Editing the prompt would target the wrong layer.

If terminal changes from reviewable when missing to do not infer, the router, evaluation truth, review guidance, and release checks must change too. The model proposes. The pipeline validates and routes. Configuration defines schemas, mappings, thresholds, and rules.

Package dependent artifacts into one versioned bundle: schema, field policy, airport lookup, routing, review policy, and eval manifest. Before activation, verify that every artifact exists, statuses agree, and each do-not-infer field has an evidence rule and an action when absent.

Critical configuration should fail closed. A missing optional map may preserve the raw city and mark normalization unavailable, but that fallback must be visible. Silent defaults destroy reproducibility.

Treat activation as a release. Run compatibility checks and targeted evals, compare candidate and baseline, activate an immutable bundle, retain the prior version, and record the active bundle in every trace.

For reflection, Bengaluru is extracted correctly but becomes B S L, while fallback calls rise for absent terminals. The airport lookup owns the first error; field policy or routing owns the second. Regressions should preserve the raw city while requiring B L R, and require an absent do-not-infer terminal to stop.

Once models, pipelines, and configuration are versioned and tested together, the eval can decide whether an exact bundle is safe enough to release.

## Chapter 19: Your Eval Should Become A Release Gate

The mature end state is not an evaluation dashboard. It is release discipline.

When a model, prompt, schema, lookup, routing rule, review policy, or stop condition changes, the relevant evals should run. The release gate asks one concrete question: is this version of the product workflow safe enough to ship for its users, consequences, and operating model?

An eval score describes performance under defined conditions. A release gate combines evidence with policy. Because averages can hide severe failures, the gate needs quality thresholds, operational limits, and zero-tolerance blockers.

[Ebook companion] See the release-gate diagram for how quality evidence, operational evidence, and blockers converge on a ship, hold, or reject decision.

Quality thresholds cover accuracy, evidence, schema validity, and regressions. Operational limits cover review load, cost, and ninety-fifth-percentile latency. Blockers include unsupported claims, do-not-infer fields accepted without evidence, unauthorized bookings, and critical regression failures. Set these standards before seeing results.

Our candidate requires evidence for terminal and baggage, maps Bengaluru to B L R, and requires quote-specific confirmation plus an idempotency key. Compare this exact bundle with its baseline on absent fields, normalization, stopping, confirmation, and retries.

A pass supports release under the written contract; it does not prove universal correctness. Record every tested model, prompt, schema, policy, lookup, eval set, and truth version, plus rollback signals.

Match suites to the changed surface: normalization for lookup changes, stopping for routing changes, and permission, idempotency, and recovery for booking changes. Missing evidence or a blocker event stops release.

A bounded risk may be approved with a waiver, never relabelled as passed. Record its impact, owner, mitigation, monitoring, expiry, rollback trigger, and approver. Temporary latency may be waivable; unsupported claims and unauthorized bookings should not be.

For the final reflection, a candidate passes every aggregate threshold, but one regression fills an absent baggage field with fifteen kilograms. Should it ship?

No. A do-not-infer claim lacks evidence and a critical regression failed. Correct the gate or route, rerun every required suite for the exact bundle, and make a new decision. A routine waiver is inappropriate.

This is where the book lands. No extraction without evidence. No confidence without an explicit state. No fallback without routing policy. No agent action without permission. No release without a gate.

The purpose of an eval is not to prove that a model is good. It is to decide whether a product workflow is safe enough to trust, improve, or ship.
