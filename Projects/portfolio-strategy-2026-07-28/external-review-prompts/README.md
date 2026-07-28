# Independent external-review prompt pack

Use these prompts with current repository heads. Do not allow reviewers to accept the supplied ranking without recomputing it.

## Shared instruction

You are an independent reviewer. Read current repository head and all instruction files before judging. Use repository/file evidence for product claims and current primary public sources for market claims. Distinguish code/product proof from customer, payment, retention and channel proof. Return: thesis, score by the shared rubric, strongest case for focus, strongest case for kill, buyer/job, narrow paid test, launch blockers, stop rule, uncertainty, and exact evidence references. Do not mutate git or create branches/PRs.

## Codex: technical-commercial repository auditor

Inspect current heads of the active repositories. Identify what is actually shipped, launch blockers, duplicate systems, maintenance drag, security/privacy risks and reusable components. Prioritize truth over roadmap claims. Produce machine-readable JSON plus a concise markdown verdict per repository family.

## Claude Code: product red team

Attack positioning, PMF assumptions, unsafe claims, scope and false confidence created by documentation volume. Propose the smallest paid evidence test and explicitly identify what must be removed from the product promise.

## Kimi: market and pricing analyst

Compare current substitutes, buyer budgets, service alternatives, acquisition channels and price anchors in India and globally. Avoid generic TAM. Give bottom-up first-year scenarios with assumptions and sensitivity.

## Gemini: industry buyer council

Act as a council of actual buyers: accounting/legal operations, insurance/benefits operations, travel agency owner, e-commerce catalog manager, security integrator and healthcare AI leader. For each relevant project, state procurement objections, required proof, acceptable pilot, data/security requirements and why you would not buy.

## Synthesis judge

Given the internal report and all independent reviews, preserve disagreements. Recompute the portfolio allocation using evidence quality, not reviewer confidence. Output changes to status, scores, wedges, allocation, kill criteria and the next 90-day plan. Flag every unsupported market number or claim.
