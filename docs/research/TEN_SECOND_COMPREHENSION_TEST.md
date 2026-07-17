# Ten-second portfolio comprehension test

## Purpose

The site should not be judged only by whether its author believes the positioning is clear. A recruiter, founder, or technical/product operator should be able to form a broadly correct first impression after a brief exposure.

This test measures comprehension. It is not a usability interview, design preference survey, or invitation to rewrite the site by committee.

## Primary hypothesis

After ten seconds on the homepage, a target visitor should understand that Pranay is:

- a senior product leader who stays close to implementation;
- strongest in document-heavy and operational AI systems;
- experienced in turning messy workflows into reviewable working systems;
- available through two distinct paths: sustained internal ownership or bounded commercial work.

No one needs to repeat the exact headline. They do need to preserve its meaning.

## Participant groups

Recruit at least five people in each group.

### A. Hiring audience

Examples:

- senior recruiter or talent partner for product/AI roles;
- VP Product, CPO, product director, founder hiring a senior product leader;
- engineering leader who regularly interviews product leaders;
- operator evaluating a Head of Product or Principal PM profile.

### B. Commercial buyer audience

Examples:

- founder or operator with a document-heavy workflow;
- agency or service company owner with internal operational friction;
- product/operations leader considering an internal tool or workflow system;
- technical buyer who can approve a $2.5K–$22K engagement.

### C. Technical/product peer audience

Examples:

- senior engineer, product engineer, technical PM, AI engineer, or architect;
- product builder capable of judging hands-on credibility;
- collaborator who has not previously reviewed the portfolio.

Exclude people who helped write or design the current site from the first round.

## Test setup

Use the live production homepage in a normal browser.

Record:

```yaml
portfolio_release_sha:
test_date:
participant_group:
participant_role:
familiar_with_pranay_before_test: none | limited | substantial
device: desktop | mobile
screen_width_or_device:
```

Do not explain the intended positioning before exposure.

## Ten-second task

1. Open the homepage at the top.
2. Give the participant ten seconds without scrolling.
3. Remove the page or ask them to look away.
4. Ask the first four questions without showing answer options.
5. Reopen the site for the action-finding task.

## Questions

Ask in this order.

1. **What do you think this person does?**
2. **What kind of problems or products do you think he is strongest at?**
3. **What seniority or working level did you infer?**
4. **What is the one thing you remember?**
5. **Who do you think this site is for?**
6. **Where would you click if you were hiring him?**
7. **Where would you click if you wanted to buy a bounded project?**
8. **What claim would you want proved before taking the next step?**

For commercial participants also ask:

9. **What would make you hesitate before contacting him?**
10. **Does the published engagement range feel plausible, too low, too high, or impossible to judge? Why?**

For hiring participants also ask:

9. **Which role would you consider him for first?**
10. **What makes the profile feel focused or unfocused?**

## Scoring rubric

Score the unaided response, not whether the participant eventually finds the right page.

### Identity accuracy — 0 to 3

- **3:** recognises a senior product leader who is also hands-on/technical.
- **2:** recognises senior product or technical product work but misses one half.
- **1:** sees a generic developer, consultant, founder, or AI builder.
- **0:** cannot identify a professional role.

### Problem-space accuracy — 0 to 3

- **3:** identifies document-heavy/operational workflows, internal tools, or review-heavy AI systems.
- **2:** identifies workflow/AI/product systems broadly.
- **1:** identifies only generic AI/software.
- **0:** infers an unrelated speciality.

### Seniority accuracy — 0 to 2

- **2:** senior/principal/head/founding product leadership.
- **1:** mid-level or unclear product/developer seniority.
- **0:** junior/freelancer-only/student impression.

### Path accuracy — 0 to 2

- **2:** can distinguish and find both hiring and commercial routes.
- **1:** finds one correct route or confuses the two.
- **0:** cannot identify a next action.

Maximum: **10**.

## Success thresholds

Repository copy should not be declared fully comprehensible until:

- median total score is at least **8/10** in every participant group;
- at least 80% identify senior product leadership plus hands-on execution;
- at least 70% mention operational workflow, document-heavy work, internal systems, or reviewable AI without prompting;
- at least 90% can locate the hiring route after reopening;
- at least 90% can locate the commercial route after reopening;
- fewer than 20% describe the identity primarily as a generic freelancer, agency, AI generalist, or developer-for-hire;
- no participant mistakes a workflow map for a real product screenshot after reviewing Work;
- price objections are classified as evidence/fit/scope concerns rather than merely collected as preferences.

## Observation sheet

Use one row per participant in a private copy of this schema:

```csv
participant_id,group,device,prior_familiarity,identity_score,problem_score,seniority_score,path_score,first_description,remembered_phrase,hiring_route_found,commercial_route_found,proof_requested,hesitation,role_or_offer_inferred,notes
```

Do not store names or contact details in the research sheet unless needed for follow-up and kept separately.

## Interpretation rules

### Change the site when

- the same wrong identity appears in at least three participants;
- a target group consistently misses the primary problem space;
- hiring and commercial paths are repeatedly confused;
- people remember a secondary product more strongly than the professional identity;
- visitors ask for evidence the site claims already to provide but cannot find;
- a phrase is consistently interpreted differently from its intended meaning.

### Do not change the site merely because

- one participant prefers different colours;
- someone proposes a broad title that weakens the primary wedge;
- a participant outside the target audience wants an unrelated service;
- one person cannot repeat the exact language;
- the suggestion conflicts with verified evidence or creates an unsupported claim;
- a change would hide a limitation to improve first impressions.

## Follow-up evidence test

After the ten-second test, give the participant up to three minutes on the route relevant to them.

Ask:

- What do you now believe Pranay has actually done?
- Which evidence changed your confidence?
- What still feels self-asserted?
- Which screenshot, recording, quote, case, or result is missing?
- Would you start a conversation? Why or why not?

This second phase should be repeated after direct product evidence and permissioned external evidence are added.

## Decision log

After each round, record:

```yaml
round:
release_sha:
participants_by_group:
median_scores:
repeated_misinterpretations: []
repeated_proof_requests: []
changes_approved: []
changes_rejected: []
reasoning:
next_test_date:
```

Tie every approved copy/navigation change to a repeated observation. Do not say “users were confused” without the count and wording that demonstrated confusion.

## 10/10 condition

The persuasion/comprehension finding is closed only after the live site meets the thresholds across all three target groups and the evidence-depth phase shows that qualified visitors can find enough proof to take the intended next action.
