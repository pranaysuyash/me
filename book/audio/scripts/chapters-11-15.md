## Chapter 11: Fallbacks, Routing, And Stop Conditions Need Evals

Fallback may repair an output or produce a cleaner hallucination. Safety depends on whether the next step can recover evidence and whether the system knows when to stop.

An artificial intelligence system turns document evidence into claims. Another step can recover missed text, but cannot make an absent fact appear. It therefore needs three decisions: accept a result that meets the contract, continue when a bounded step can recover evidence, or stop when automation cannot resolve uncertainty safely. Routing chooses the path; stop conditions prevent unsafe continuation. Both need evaluations, or evals.

Return to Riya Mehta's ticket. It shows her passenger name record, or P N R, flight A I two-oh-two, Delhi, Bengaluru, and a departure time of nine forty. Terminal and baggage are absent and must not be inferred.

If optical character recognition, or O C R, misses the visible flight number, a targeted crop can recover evidence. But fallback has no job when terminal is empty because the source contains none. Returning Terminal Three would violate the contract.

Do not route on blankness. Ask why the field is empty. Evidence may be supported, likely present, absent, unreadable, ambiguous, conflicting, or not applicable. A likely-present critical field can justify a bounded retry. A conflict can justify narrow review. An absent do-not-infer field must stop.

Policy order matters. A do-not-infer prohibition must win before a generic missing-field rule. Put prohibitions first, recovery second, review third, optional handling fourth, and an explicit default last. Record the matched rule and action. [Ebook companion] See the route-decision record for the full structure.

Reflect on four states: a missed visible flight number, absent terminal, conflicting departure times, and unnecessary absent baggage. Choose each action, attempt limit, and acceptance proof. Then test against unnecessary fallback. The pattern is bounded recovery, stop, review, and accepted absence.

A trustworthy system knows why it must stop. Once that decision is explicit, the next question is how to explain failures well enough to fix the right layer. That requires logs.

## Chapter 12: Eval Logs Matter More Than Scores

A score tells you that something happened. A log tells you what to do next.

Eighty-four percent accuracy reveals imperfection, but not whether to change the prompt, optical character recognition, schema, lookup data, routing, or product contract. Scores compare; logs diagnose.

An eval log preserves the input, versions, decisions, output, expected behavior, failure owner, and next action. Measurement observes; learning retains context for improvement.

On our ticket, the extractor reads Delhi correctly, but normalization converts it to B S L instead of D E L. A final-value log makes this look like a model error, although the airport lookup owns it. In another failure, fallback invents Terminal Three. Routing owns that error because it should have stopped.

Separate three layers. The model proposes values and evidence. The pipeline handles validation, routing, stopping, and review. Data and configuration own schemas, dictionaries, and policies. This prevents prompt edits for defects elsewhere.

Store each run as an append-only record, perhaps one JavaScript Object Notation record per line, known as JSON Lines. Include identifiers, input family, component versions, expected and actual values, evidence state, retries, cost, errors, owners, and recommended work. Preserve observable events, not hidden reasoning.

Derive summaries from case records so every count is traceable. Three wrong airport mappings should create one task requiring Delhi to map to D E L, Bengaluru to B L R, raw values to survive, unknown cities to remain unknown, and regressions to pass. Use sanitized cases and avoid needless copies of travel data.

For your reflection, diagnose three failures: Delhi becomes B S L; fallback invents Terminal Three; and optical character recognition turns A I two-oh-two into A L two-oh-two. Name the error, owning layer, impact, work item, and two acceptance criteria. They belong to normalization data, routing policy, and optical character recognition or character repair.

Scores help you compare. Logs help you learn. To retain that learning across releases, the cases need purpose and stewardship. The eval set must become product memory.

## Chapter 13: Your Eval Set Is Product Memory

An eval set is not a folder of examples. It is product memory. It remembers user formats, important fields, difficult layouts, values that must not be inferred, settled ambiguities, and failures that once escaped.

Scale can mislead. A small set chosen for distinct risks may teach more than a thousand convenient files. Preserve obligations and known failure boundaries.

Our airline case, A I R zero-zero-one, exists because terminal and baggage are missing while both airports need normalization. It protects three rules: do not infer terminal, do not infer baggage, and normalize Delhi and Bengaluru without losing their raw values. Without a manifest, someone may fill the blanks or delete the case as incomplete. The incompleteness is the point.

Record each case's identifier, source, layout, risks, expected route, protected behavior, owner, and review date. Synthetic, licensed, and sanitized production cases need different handling. Never present a constructed ticket as production data. [Ebook companion] See the case manifest for full fields.

Build a portfolio: clean cases, difficult scans, inference traps, routing and normalization cases, earlier regressions, and recent drift probes. Weight them by frequency, impact, and uncertainty.

Use counterexamples: an absent terminal stops, a visible one passes, and a blurry but likely-present one goes to review. Together they protect the boundary. A coverage matrix exposes missing combinations of layout and risk.

Version membership, ground truth, schema, scoring, routing, normalization, and review policy. When an expectation changes, record why and who authorized it. Silent edits make a moved goalpost look like progress.

Add cases for new risks, recurring patterns, contract decisions, or escaped failures. Review for stale policy, duplicates, and missing layouts. Retire only with a preserved reason and replacement.

Now design a twelve-case airline memory with ordinary cases, inference traps, routing and normalization cases, plus multi-passenger, poor-image, and regression coverage. Every case needs a reason. Define the manifest for A I R zero-zero-one, an addition trigger, a retirement criterion, and reproducible versions.

Memory alone cannot decide what to trust at runtime. Every field needs an honest relationship among value, evidence, uncertainty, and action. That is the next chapter.

## Chapter 14: Confidence, Evidence, And Human Review Build Trust

Confidence is not correctness. A model can be confidently wrong; a correct value can look uncertain on a blurry scan; and a field can be absent rather than unknown.

Trust comes from making uncertainty inspectable and assigning each state an honest action.

An extracted field contains four claims. The value claim says what it contains. The evidence claim says where the source supports it. The status claim says whether it is supported, normalized, absent, unreadable, ambiguous, or conflicting. The workflow claim records the resulting action. Keep them separate.

On the airline ticket, for P N R H seven K two nine Q, preserve value, source line, location, status, and action. For terminal, keep value and evidence empty and mark it absent. For a blurry flight number, preserve the uncertain reading and request review. Ninety-nine percent confidence without evidence still fails a do-not-infer policy.

Human review turns unresolved uncertainty into a controlled decision. Show the candidate, evidence in context, field policy, route reason, allowed decisions, and correction reasons. If two departure times appear, ask which belongs to flight A I two-oh-two on that date, allowing either candidate, unresolved, or not applicable. Never ask whether the whole document looks okay.

Reviewer disagreement may reveal unclear ground truth, weak instructions, missing context, or genuine ambiguity. Calibrate on shared cases. Fix the rule or preserve unresolved. Solo builders should define rules first and shuffle old and new outputs to reduce bias.

Track review time, evidence opened, correction reason, and whether a decision was possible. Use those signals to improve routing and presentation, not to pressure reviewers.

A deterministic validator should reject contradictions before review. A supported value requires evidence. An absent field cannot contain a value. A normalized status requires a normalized value. Ambiguous, conflicting, or unreadable states must lead to review or stop. This is a contract guard, not a truth detector.

For your reflection, classify a supported P N R, an absent terminal, conflicting departure times, and Delhi correctly extracted but normalized as B S L. The P N R should pass. Terminal remains absent unless downstream policy requires review. Conflicting times need narrow review. The airport error needs deterministic lookup correction, not re-extraction.

Trust comes from inspectable behavior. Yet a perfect field record can emerge from a broken workflow. The next chapter widens the evaluated object from one output to the complete user path.

## Chapter 15: Test The Pipeline, Not Just The Model

When an artificial intelligence workflow fails, the model is only one suspect. The defect may live in upload, optical character recognition, layout, validation, evidence linking, normalization, routing, review, storage, or a downstream application programming interface, or A P I.

The user does not experience a model in isolation. The user experiences the pipeline.

The ticket moves through classification, optical character recognition, extraction, schema checks, evidence linking, normalization, routing, review when needed, and storage.

Every transition can lose truth. Optical character recognition can change A I two-oh-two to A L two-oh-two. Chunking can separate passenger and flight. Repair can drop evidence. Normalization can map Delhi incorrectly. Routing can accept a conflict because the record is well formed. Valid structure does not imply valid meaning.

Diagnose three layers. The model owns prompts, extraction, and evidence selection. The pipeline owns intake, validation, routing, review, storage, and audit. Data and configuration own schemas, maps, policies, and scoring. A model upgrade does not repair a lookup table.

For A I R zero-zero-one, test that classification identifies a ticket; optical character recognition preserves booking reference and flight; extraction marks terminal absent; supported fields have evidence; normalization maps Delhi to D E L and Bengaluru to B L R; routing avoids terminal fallback; and storage invents nothing. [Ebook companion] See the pipeline-eval specification.

Keep expected results independent from the lookup and model under test. Use the source, versioned contract, and reviewed expectations. For ambiguity, require an allowed set or review instead of inventing one answer.

Test corrupt uploads, poor optical character recognition, invalid structure, timeouts, unsupported fallback, stale lookups, conflicts, duplicates, and failed writes. A retry must not create two itineraries. If storage fails after extraction, report the partial state and recovery action.

Layer the tests. Check mappings and policies as components, downstream behavior with recorded outputs, several real stages through integration evals, and the complete path end to end. Match depth to the changed layer and cost of failure.

For the final reflection, vary A I R zero-zero-one so optical character recognition changes the flight, the lookup maps Delhi to B S L, and fallback invents Terminal Three. Name each failing layer, expected action, visible evidence, and regression test. They belong to optical character recognition, data and configuration, and routing.

Testing the pipeline closes the gap between a promising output and a trustworthy workflow. The next chapter moves from evaluation to operation: observability as the interface for understanding success, retries, failure, and recovery.
