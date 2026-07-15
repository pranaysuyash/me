## Introduction: The Evidence Habit

Welcome to *No Claim Without Evidence: The Audio Edition*.

I am Pranay Suyash. This listening-first edition was adapted from the ebook and uses AI-assisted narration. The ebook remains the reference manual for code, schemas, tables, diagrams, exercises, and sources.

Most artificial intelligence projects do not begin with a bad model. They begin with an unsupported claim. A prompt worked once, so the team says the prompt works. A model produced clean structured data, so the team says the extraction is correct. A demo looked convincing, so the team says the product is ready.

None of those conclusions follows from the evidence.

This book starts with a simple rule: no important claim should reach a user, an operator, or another system unless the product can explain what supports it. That explanation might be a source span, a deterministic calculation, a validated lookup, a test result, a review decision, or a policy gate. The exact evidence changes by domain. The habit does not.

Across the next nineteen chapters, we will build one cumulative example: a system that extracts useful information from an airline ticket. It must preserve passenger and itinerary details, normalize city names, distinguish absence from uncertainty, route difficult cases, support human review, and stop when another model call cannot create new evidence.

The airline ticket is only the teaching surface. The same design applies to invoices, receipts, medical documents, support conversations, agent actions, and any workflow where a plausible answer is not enough.

You do not need the ebook open while listening. When a visual schema or template matters, I will point you to the ebook companion. The audio will focus on the reasoning: what the system claims, what supports the claim, what can fail, who owns the failure, and what must happen before the result is trusted.

The goal is not to make an artificial intelligence system that always answers. The goal is to make one that knows what kind of answer it is giving, can show why the answer deserves trust, and can stop honestly when the evidence runs out.
