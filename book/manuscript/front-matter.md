# No Claim Without Evidence

## How to Build AI Systems You Can Verify

By Pranay Suyash

---

## Copyright Page

Copyright (c) 2026 Pranay Suyash. All rights reserved.

No part of this book may be reproduced or distributed without permission, except brief quotations used in reviews, commentary, or educational discussion.

This book is practical engineering commentary, not legal, financial, medical, or compliance advice. Apply the ideas with the judgment required by your product, users, data, and operating environment.

---

## Table Of Contents

1. Introduction: The Evidence Habit
2. Chapter 1: No Claim Without Evidence
3. Chapter 2: Premature Confidence Is The Real Bug
4. Chapter 3: Narrow Questions Beat Broad Prompts
5. Chapter 4: The Pipeline Matters More Than The Model
6. Chapter 5: Deterministic Gates Before Model Calls
7. Chapter 6: One Good Output Does Not Mean Your Prompt Works
8. Chapter 7: Ground Truth Is A Product Contract
9. Chapter 8: Not All Extraction Errors Are Equal
10. Chapter 9: Accuracy Alone Is Not An Eval Strategy
11. Chapter 10: Cost, Latency, And Review Effort Belong In The Eval
12. Chapter 11: Fallbacks, Routing, And Stop Conditions Need Evals
13. Chapter 12: Eval Logs Matter More Than Scores
14. Chapter 13: Your Eval Set Is Product Memory
15. Chapter 14: Confidence, Evidence, And Human Review Build Trust
16. Chapter 15: Test The Pipeline, Not Just The Model
17. Chapter 16: Observability Is The Product Interface
18. Chapter 17: Agents Need Action Evals
19. Chapter 18: Data And Configuration Are Product Code
20. Chapter 19: Your Eval Should Become A Release Gate
21. Appendix A: The Airline Ticket Extraction Case Study
22. Appendix B: Practical Templates
23. Notes And Sources

---

## Introduction: The Evidence Habit

Most AI product mistakes do not start with a bad model.

They start with an unsupported claim.

The prompt worked once, so the prompt works.

The JSON parsed, so the extraction is correct.

The model sounded confident, so the answer is trustworthy.

The demo looked good, so the feature is ready.

The eval score went up, so the product improved.

Every one of those sentences may be true. None of them is proven by the sentence itself.

This book is about the habit that separates a promising AI demo from a system you can improve, operate, and ship:

> No claim without evidence.

That rule sounds simple. It is not. It changes how you write prompts, design schemas, build fallbacks, structure review, read eval scores, and decide whether a release is safe enough to ship.

The context for this book is practical. Imagine a system that extracts structured fields from airline tickets, receipts, invoices, medical documents, customer emails, or support transcripts. The user does not care that the model generated clean JSON. The user cares whether the flight number, PNR, terminal, amount, passenger name, and date are correct enough for the next workflow step.

A clean output is not the same as a true output.

An LLM can produce a field that looks plausible but is not supported by the source document. A fallback model can fill a blank field by guessing. A reviewer can accept a value because it feels right. A benchmark can report high accuracy while hiding the one failure mode that would damage user trust.

That is why AI engineering needs more than prompts. It needs evidence paths.

OpenAI's evals documentation frames evaluations as tests that check whether model outputs meet criteria you define, especially when changing models or applications.[^openai-evals-docs] NIST's AI Risk Management Framework places validity, reliability, accountability, transparency, and explainability inside the larger question of trustworthy AI systems.[^nist-ai-rmf] Google's production ML guidance describes systems made of data, validation, serving, monitoring, and feedback components rather than a model alone.[^google-prod-ml]

Those sources point in the same direction: the product is not the model call. The product is the system around it.

This book is a field guide for that system. Each chapter has a learning promise, a concrete implementation pattern, an artifact you can reuse, an exercise, common failure modes, and a bridge to the next design decision. One airline-ticket workflow develops across the book so that the ideas compound instead of resetting chapter by chapter.

It starts with the evidence habit, then moves through LLM pipelines, eval design, extraction errors, review workflows, product memory, agent actions, observability, data and configuration discipline, and release gates. It is written for builders who are close enough to the work to feel the pain: solo founders, AI engineers, product-minded developers, PMs who want real technical leverage, and operators who need AI output they can actually trust.

The goal is not to prove that a model is impressive.

The goal is to decide whether the system is safe enough to trust, improve, or ship.
