## Chapter 1: No Claim Without Evidence

The first rule of trustworthy artificial intelligence is engineering honesty: do not call an extracted value correct unless you can trace it to its source. AI output looks finished. It is fluent and confident. But naturalness is not correctness.

Consider the airline ticket we will follow through this book. It belongs to Riya Mehta. The booking reference, also called a Passenger Name Record or PNR, is H7K29Q. The flight is AI 202, from Delhi to Bengaluru on the twelfth of August, 2026, at nine forty in the morning. The ticket does not show a terminal or baggage allowance.

Now imagine the system returns those details plus Terminal 3 and fifteen kilograms of baggage. The response is neat and plausible, but the last two values are not on the document. The system did not extract them. It inferred them.

A product claim needs a value, provenance, interpretation, and a decision: what it says, where it came from, how it was produced, and what the product may do with it.

Delhi becoming the airport code D E L is normalization: a supported value was transformed by a declared rule. Terminal 3 is inference because no terminal appears on the ticket. Inference can be useful, but it must never masquerade as extraction.

The practical solution is an evidence record that travels with each important field. For origin, preserve the raw value Delhi, the normalized value D E L, and the supporting departure line. For terminal, store no value, label the field not present, and prohibit inference.

Other useful states include supported, unreadable, ambiguous, conflicting, and requires review. Each must permit or block specific actions. Evidence should match consequence: an optional field may need an honest missing label, while a PNR used to retrieve a booking needs exact source evidence.

Pause and examine four fields: PNR, origin, terminal, and baggage. For each, name the value, its evidence, and the action you would allow. Then explain why Terminal 3 must be rejected even if it happens to be true in the real world. This extraction product is claiming what the document says, not what outside knowledge suggests.

The best AI systems are not the ones that always answer. They know what kind of answer they are giving. But evidence will not protect users if the product grants trust too early. That is the bug we examine next.

## Chapter 2: Premature Confidence Is The Real Bug

Many AI failures first look like model failures. The model hallucinated. The prompt was vague. The parser broke. Underneath them is often a transition error: uncertain output entered the workflow, but a trusted fact emerged without an evidence-producing step in between.

That is premature confidence.

Return to the ticket. The model proposes Terminal 3. A fragile system copies the string directly into the booking. Presence has silently become proof. A trustworthy system checks the candidate against the document, applies field policy, and then accepts, reviews, or rejects it.

Confidence leaks through language too. “Your travel details are verified” is stronger than “We extracted six details and flagged two for review.” A schema can prove that terminal is text or empty. It cannot prove that Terminal 3 appears on the ticket.

Treat confidence as an operational state, not a mysterious decimal. A candidate can become supported, normalized, not present, unreadable, ambiguous, conflicting, ready for review, or rejected.

Keep knowledge and consequence separate. Status describes the relationship between a value and its source. Field policy describes the cost of being wrong. An ambiguous terminal and an ambiguous PNR share uncertainty, but they need not trigger the same action.

For our ticket, terminal and baggage should be empty values marked not present. That looks less complete than the model response, but it is more correct. Evaluations, often shortened to evals, must reward this restraint. If populated fields earn points while honest blanks look like failure, the system is encouraged to guess.

The governing boundary is simple: the model proposes values; policy grants permissions. A supported name may be displayed, a normalized airport code may be used while retaining its raw value, and an inferred PNR is blocked.

For reflection, trace Terminal 3 from model response to stored booking. Find the first step where it becomes trusted. Replace that transition with an explicit state and decide what the user should see. A good answer omits the terminal or says it was not shown on the ticket. It never claims that every detail was verified.

Once confidence is explicit, evaluation becomes possible. But judging the whole ticket as one object is still too broad. We now need claims that people and tests can verify one at a time.

## Chapter 3: Narrow Questions Beat Broad Prompts

“Extract all useful information from this ticket” sounds capable, but it hides the definition of correct. What does useful mean? What counts as all? Did an omitted field not matter, or did the model miss it?

Narrow questions are easier to inspect. What flight number is printed? Is a terminal printed? What exact text supports the booking reference? Narrowness does not magically make the model smarter. It gives the system a bounded claim and a way to judge it.

An atomic claim has one subject, one value or state, and one evidence requirement. For example: the PNR is H7K29Q. The required evidence is an exact span labelled booking reference or PNR. The acceptance rule is an exact character match after harmless whitespace cleanup.

Apply this pattern to Riya’s ticket. Preserve the passenger name and PNR as printed. Normalize the date only after extraction. Map Delhi and Bengaluru through the approved International Air Transport Association, or IATA, airport lookup. Treat an unclear departure time as reviewable. Ask whether terminal and baggage are present; do not ask the model to complete them.

This separates observation, absence detection, transformation, and risk. Production may still batch fields into one call. Narrowness is about contracts and scoring, not necessarily more calls.

For every field, return the raw value or no value, a source state, and the shortest supporting text. Normalize later. Then a wrong code can be traced either to extraction or to the lookup. For review, show one consequential claim at a time, so clean fields cannot distract from one dangerous guess.

Failure ownership becomes clearer. No available text points to intake or optical character recognition, known as OCR. A wrong raw value points to extraction. A correct city with a wrong code points to normalization. An unsupported accepted value points to policy; a missed review points to routing.

Now turn the broad ticket request into four questions: one each for PNR, origin, terminal, and baggage. Give each an evidence requirement and an allowed transformation. Then place three failures: a wrong raw origin belongs to extraction; a correct origin mapped to the wrong IATA code belongs to normalization; an unsupported terminal that flows through belongs to policy or routing.

If you cannot state a claim narrowly, you cannot evaluate it precisely. Once claims are inspectable, the model becomes visible as only one place where they can fail. The next chapter expands our unit of design from the model call to the complete workflow.

## Chapter 4: The Pipeline Matters More Than The Model

Teams often ask, “Which model should we use?” A better question is, “What pipeline turns uncertain output into a trustworthy product decision?”

Reliability belongs to the full path from input to consequence. A model can read Delhi correctly while a stale lookup produces the wrong airport. A highly accurate model can still make the product too slow, expensive, or difficult to review.

For document extraction, the workflow may receive a file, detect its type, extract native text or run OCR, interpret layout, propose fields, validate structure, link evidence, normalize values, assign states, route fallbacks, request review, make a final decision, log the run, and capture regression cases. A model may help at several stages. It does not own the entire result.

[Ebook companion] See the three-layer system diagram for the relationship among model, pipeline, and data or configuration.

Follow Riya’s ticket through that pipeline. The document arrives as a Portable Document Format file, or PDF. Text extraction recovers its contents. Classification identifies an airline ticket. The extractor creates raw field records. Evidence linking checks exact spans. A versioned lookup maps Delhi to D E L and Bengaluru to B L R. Policy marks terminal and baggage as not present and blocks fallback. The final decision accepts the itinerary with honest warnings.

Store stage results rather than one opaque response. Record the model, prompt, lookup, blocked inferences, and final decision. Preserve partial success too: a ticket may have a supported name, normalized origin, unreadable time, and absent terminal. Carry those field states into an explainable document decision.

Model choice now becomes system choice. A large model may have better raw accuracy but more unsupported inference and latency. A smaller model behind strong gates may make fewer dangerous claims. Choose against consequence, cost, speed, and review capacity.

For reflection, sketch the path from ticket upload to display. Place empty text, a misread flight number, a wrong airport mapping, an accepted terminal guess, and a lost correction into their owning stages. Then choose one measure beyond accuracy and explain why it matters.

When the pipeline is the product, each failure tells you which layer to improve. The next chapter strengthens those layers with the cheapest and clearest controls: deterministic gates.

## Chapter 5: Deterministic Gates Before Model Calls

Do not call a model merely because you can. Some decisions belong to deterministic gates: checks governed by stable rules rather than open-ended generation.

A gate can check file type, empty text, ticket signals, response structure, date format, approved airport codes, or field evidence.

Use probabilistic reasoning for language, layout, ambiguity, and context. Use ordinary code for rules that must remain true regardless of model behavior. A deterministic gate is inspectable, repeatable, and returns a precise failure reason.

Before extraction, a pre-call gate checks the file type, confirms text exists, and looks for signals such as passenger, flight, or PNR. Supported files continue. Unsupported files are rejected. Empty text routes to OCR repair. Weak signals route to classification or review.

After extraction, separate gates check structure, evidence, and normalization. A supported field without evidence goes to review. An inferred terminal, baggage allowance, or PNR is rejected. A field marked not present cannot still contain a value. A correctly missing terminal continues with a warning.

Airport normalization gets its own gate. Raw cities need evidence, and their codes must exist in the versioned lookup. Unknown or conflicting mappings go to review. The model must not invent canonical data.

Every failed gate needs a route. Empty text may justify repair. A probably visible critical field may justify targeted fallback. An optional field absent from readable text stops with a warning because another call cannot create evidence. Ambiguous critical evidence goes to a person. Forbidden inference is rejected.

A warning that changes nothing is not a control, and a fallback that fills every blank becomes a second source of unsupported claims. Deterministic rules and lookups must still be versioned and tested.

For a final reflection, define three gates before the model call and three after it. Test empty text, unsupported Terminal 3, supported Delhi normalized to D E L, and a city missing from the lookup. Give each failure a reason and a route.

Empty text goes to OCR repair without a model call. Unsupported terminal becomes not present. Delhi retains its raw value and lookup version. An unknown airport is never guessed.

Our ticket workflow now has evidence records, explicit confidence states, narrow claims, a visible pipeline, and deterministic controls. The next question is harder: do the model-backed stages work across varied documents, or only on this convincing example? One good output is not proof. It is the first case in an evaluation set.
