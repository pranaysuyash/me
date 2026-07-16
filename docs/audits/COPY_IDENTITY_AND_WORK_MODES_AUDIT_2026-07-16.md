# Copy, identity, and work-mode audit — 16 July 2026

## Question being answered

Does the site give a visitor a useful mental model of Pranay Suyash, and does it clearly distinguish hiring him into a sustained senior role from engaging him for bounded commercial work?

## Verdict before this pass

The copy was strong at explaining the work and unusually disciplined about evidence. It was weaker at explaining the person.

A visitor could understand that Pranay works on operational workflows, AI-assisted systems, internal tools, and local-first products. They had to infer:

- what it feels like to work with him;
- why product leadership and hands-on building belong together;
- whether the site represented a job search, consulting business, independent-product portfolio, or all three;
- when a company should hire him into the team versus buy a bounded engagement;
- how current MedPiper commitments affect role and project availability;
- how the personal site relates to PSRS Technologies Private Limited.

The hire and commercial paths existed in the information architecture, but the relationship between them was buried and inconsistent. The generic navigation CTA still defaulted to project work, neutral Contact links defaulted to the project form, and the Contact page did not allow visitors to switch modes visibly.

## First-principles identity model

The site now uses one identity and two commitment models.

### One identity

**Product leader and hands-on systems builder.**

The value is not that Pranay performs several unrelated jobs. The value is that product judgment, operational understanding, interface decisions, architecture, and enough implementation skill remain close enough to produce better systems.

### One working style

- asks for real artefacts and constraints early;
- moves between commercial goal, workflow, interface, architecture, and code;
- separates known facts, inference, and unresolved risk;
- prefers working software and visible decisions to long presentation cycles;
- takes responsibility for error states, packaging, documentation, release gates, and handoff;
- does not present model output, prototypes, or future directions as stronger evidence than they are.

### Two commitment models

1. **Hire for sustained internal ownership**
   - ongoing product direction;
   - platform decisions;
   - team and cross-functional leadership;
   - repeated decisions after launch;
   - accountability for what the organisation learns over time.

2. **Engage for a bounded commercial outcome**
   - a defined workflow, system, subsystem, correction, or decision;
   - explicit scope, acceptance boundary, delivery evidence, and end condition;
   - separate commercial terms through PSRS Technologies Private Limited where applicable;
   - not a disguised full-time role or unlimited fractional mandate.

The capability is the same. The accountability horizon is different.

## Dimensions audited

| Dimension | Before | After this pass | Judgment |
| --- | ---: | ---: | --- |
| Ten-second identity clarity | 8.8 | 9.5 | Senior product leadership plus hands-on system building is explicit and supported by career evidence. |
| Sense of the person behind the work | 7.2 | 9.0 | About now communicates curiosity, directness, end-to-end ownership, and cross-layer working style. Authentic visual and third-party evidence remain missing. |
| Hire versus commercial distinction | 7.6 | 9.7 | Both paths now define different accountability horizons and link to each other explicitly. |
| Generic navigation neutrality | 7.8 | 9.5 | Generic routes no longer make project consulting the default identity. Role, Services, and Book routes retain specific actions. |
| Contact self-routing | 6.8 | 9.6 | Visitors can visibly choose a senior internal role or bounded commercial engagement; mode is preserved in URL and submission data. |
| Current-role and availability honesty | 8.7 | 9.5 | Role transition timing, capacity, confidentiality, conflicts, and delivery constraints are stated rather than implied away. |
| Personal versus company commercial boundary | 8.8 | 9.6 | The personal site remains the identity and proof surface; PSRS is named only for separate commercial contracting where applicable. |
| Tone and specificity | 8.6 | 9.2 | Copy is more concrete about artefacts, decisions, implementation, and ownership. Some repeated workflow/evidence vocabulary remains. |
| Claim honesty | 9.7 | 9.8 | The new language preserves maturity, evidence, and uncertainty boundaries. |
| Distinctiveness | 8.5 | 8.9 | The voice is more ownable, but the visual category and lack of authentic imagery still limit memorability. |

## Changes made

### Central identity source

`src/lib/career.ts` now owns:

- the more personal summary;
- role-specific availability;
- the shared work-mode principle;
- four concrete working-style statements;
- explicit hiring and commercial audience paths.

### About

`src/app/about/page.tsx` now explains:

- the accumulated career story;
- personal working temperament;
- what working together feels like;
- two explicit commitment models with different accountability horizons.

### Experience

`src/app/hire-me/page.tsx` now states that the page is for sustained internal ownership and points bounded work to commercial engagements. Role CTAs use the explicit `role` contact mode.

### Commercial engagements

`src/app/work-with-me/page.tsx` now states that the offer is bounded commercial work, not a disguised ongoing leadership role. It explains current-capacity constraints and the PSRS commercial boundary.

### Contact

`src/app/contact/page.tsx` now exposes an explicit two-choice selector:

- Senior internal role;
- Bounded commercial engagement.

The selected mode updates visible copy, form fields, budget and timeline requirements, URL state, and submission metadata.

### Navigation

`src/components/layout/navbar.tsx` now uses a neutral generic CTA: **Choose how to work together**. Hiring, Services, and Book routes retain their specific actions.

### Regression protection

`scripts/verify_positioning_contract.mjs` checks the identity, working style, work-mode distinction, Contact selector, commercial boundary, and neutral generic navigation. It runs automatically through the `preportfolio:validate` lifecycle before the canonical portfolio validation command.

## What is still preventing 10/10

Copy alone cannot close the remaining gaps.

### 1. Public deployment remains stale

The custom domain must serve the current audited source and report the correct `/build-info.json` commit. Until `live-deployment` is green, visitors do not receive these copy improvements.

### 2. Direct product-use evidence remains thin

Workflow diagrams explain thinking. Real screenshots and recordings prove operating software. SignKit, MetaExtract, EchoPanel, and SentinelTwin still need dated direct-use evidence tied to reviewed source revisions.

### 3. Permissioned third-party proof is absent

The site needs selected recommendations or attributable evidence from a former co-founder, engineering or operations stakeholder, EY colleague or client, and external customer where permitted.

### 4. Personal visual identity is incomplete

The site explains working style but still uses a monogram rather than an authentic portrait or working-context photograph. A professional image would improve recognition and human trust more than another decorative motif.

### 5. External identity consistency is unverified

LinkedIn, GitHub profile copy, resume, social previews, and the deployed site should express the same identity and work-mode distinction. The public LinkedIn preview has previously carried outdated marketing and retail-oriented language.

### 6. Real conversion paths remain unverified

FormBold delivery, Cal.com destinations, Dodo checkout and file delivery, refund and support paths, and live mobile interactions require production evidence.

### 7. Long-page effort remains

The stronger copy adds clarity but does not solve the long mobile pages. Work, Experience, Services, proof, and the book still need compact section navigation and repeated contextual actions.

## Current copy verdict

The site now gives a credible and specific professional picture:

> Pranay is a senior product leader with enough technical depth and implementation proximity to turn messy operational work into a product system. He is direct about uncertainty, prefers real artefacts to abstract requirements, and takes work through the unglamorous release and operating details. A company should hire him when the mandate is ongoing and organisational. It should use a commercial engagement when the outcome is bounded and contractible.

That mental model is now explicit rather than inferred.

## Completion boundary

This pass is complete at the static source-contract level when:

- `positioning:validate` passes;
- TypeScript and lint pass;
- the canonical site release is green;
- the generated export visibly renders the new About, Experience, Services, Contact, and navigation copy;
- the custom domain is deployed and the independent live audit turns green.

The final two items remain production evidence, not copy assumptions.
