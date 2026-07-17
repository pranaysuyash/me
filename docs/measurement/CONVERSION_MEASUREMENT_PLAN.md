# Portfolio conversion measurement plan

## Objective

The portfolio should not be called successful because its copy is coherent or its release checks are green. Success means it produces qualified role conversations, qualified commercial opportunities, book orders, and eventually accepted role or paid engagement outcomes.

Measurement must remain proportionate to a personal professional site. The site does not need behavioral surveillance to answer whether it is working.

The canonical event definitions are:

```text
docs/measurement/conversion-events.json
```

The aggregation template is:

```text
docs/measurement/WEEKLY_FUNNEL_TEMPLATE.csv
```

Never commit a filled ledger containing personal, customer, or confidential commercial data to the public repository.

## Current measurement boundary

The current site deliberately does not use:

- third-party page-view analytics;
- advertising cookies;
- tracking pixels;
- session replay;
- cross-site identifiers;
- cursor, scroll, or keystroke capture;
- fingerprinting;
- behavioral profiles.

Current measurable outcomes come from systems already required to complete the visitor's requested action:

- FormBold/inbox for role and commercial enquiries;
- Cal.com for completed bookings and standard UTM attribution;
- Dodo Payments for succeeded orders and refunds;
- a manual, aggregate qualification/outcome review.

## Attribution design

### Contact form

The site already sends:

- `source` — the route or CTA context;
- `mode` — `role` or `project`;
- timeline and budget/engagement scope for commercial enquiries.

The aggregate ledger records only counts by source/mode. It must not copy names, email addresses, message content, company-confidential detail, or raw FormBold exports.

### Cal.com

Cal.com officially stores the standard UTM fields included on booking links:

- `utm_source`;
- `utm_medium`;
- `utm_campaign`;
- `utm_term`;
- `utm_content`.

Portfolio booking links use:

```text
utm_source=pranaysuyash.com
utm_medium=portfolio
utm_campaign=role-conversation | commercial-engagement
utm_content=<specific CTA and duration>
```

The weekly ledger records only aggregate booking counts by campaign/content. Do not copy attendee identity or meeting notes.

### Dodo Payments

The existing book link is a static hosted checkout link. Do not assume arbitrary URL query parameters become reliable payment metadata.

Dodo officially supports metadata on API-created checkout sessions and returns that metadata through API responses and webhooks. A future attributed checkout should therefore use a server-side or protected edge function to create short-lived checkout sessions with static metadata such as:

```json
{
  "source": "pranaysuyash.com",
  "medium": "portfolio",
  "campaign": "book",
  "content": "book-primary",
  "site_release_sha": "<verified release SHA>"
}
```

Do not put secrets in the static export. Do not migrate the current checkout until:

- Dodo sandbox and production credentials are available in a protected runtime;
- return and cancel URLs exist;
- metadata is verified in completed-session/payment records;
- India/global price and tax behavior are tested;
- PDF/EPUB entitlements and delivery still work;
- privacy and terms are updated for any new data processing;
- the static fallback purchase path remains clear during migration.

Until then, measure book orders and refunds through Dodo's own product/payment records without source-level attribution.

## Qualification rules

### Qualified role conversation

Count a role conversation as qualified only when the available evidence supports all of the following:

- the role level is plausibly senior enough for the target profile;
- the mandate includes meaningful product ownership;
- the product/company context is real and sufficiently understood;
- product judgment and execution are relevant to the need;
- location/remote and transition constraints are not immediately incompatible;
- there is an agreed next step.

Do not count recruiter outreach, generic networking, an informational chat, or an obviously mismatched role merely because a call occurred.

### Qualified commercial opportunity

Count a commercial opportunity as qualified only when:

- a real workflow, system, or decision problem exists;
- a decision owner or credible internal champion is involved;
- the buyer can provide real examples, users, or operating evidence;
- a plausible budget exists relative to the published engagement floor;
- timing and access make honest delivery possible;
- there is an agreed next step.

Do not count a vague AI idea, unpaid brainstorming request, mass outreach response, or project with no access to evidence/users.

## Weekly process

Once per week:

1. Copy `WEEKLY_FUNNEL_TEMPLATE.csv` to a private operating location.
2. Record the currently deployed `build-info.json` SHA.
3. Count role and commercial form submissions by source/mode.
4. Count completed Cal.com bookings by UTM campaign/content.
5. Count qualified conversations using the versioned rules above.
6. Count Dodo orders by region/currency and refunds separately.
7. Add only aggregate, non-identifying notes such as “three commercial enquiries were below the published scope floor.”
8. Compare against the previous four weeks, not one isolated week.

## Monthly review

Review five questions:

1. **Comprehension:** Do visitors choose the intended role/commercial path, or do enquiries remain confused?
2. **Evidence:** Which case or artifact is referenced by qualified people?
3. **Fit:** Which roles and workflow categories produce genuinely qualified conversations?
4. **Friction:** Where do people ask questions the site should already answer?
5. **Outcome:** Are qualified conversations moving to interviews, proposals, wins, orders, or clear no-fit decisions?

Source changes should follow observed evidence:

- confused role/project enquiries → improve routing or copy;
- many qualified enquiries but few bookings → inspect scheduling/CTA friction;
- bookings but low qualification → tighten positioning and entry criteria;
- qualified commercial conversations but no proposals → inspect offer/scoping fit;
- proposals but no wins → inspect proof, price-to-trust ratio, or delivery boundary;
- book sample reads but no orders cannot be inferred without actual sample/open tracking; use direct customer feedback and order trends rather than inventing a conversion rate.

## Reporting metrics

Use counts and bounded ratios only when denominators are valid:

- enquiries by mode and source;
- booking-to-enquiry ratio where the same source cohort can be matched without storing personal data in the ledger;
- qualified-conversation rate;
- role interview/offer outcomes;
- commercial proposal/win outcomes;
- book gross orders, refunds, and net orders by region;
- median days from enquiry to material outcome;
- stated no-fit reasons by non-identifying category.

Do not report:

- site “conversion rate” without a trustworthy visit denominator;
- anonymous traffic estimates as real visitors;
- a booking as a qualified opportunity automatically;
- revenue or ARR from gross checkout volume without refunds/taxes/fees and a defined period;
- testimonial sentiment as product adoption.

## Data retention

- Keep the public repository limited to schemas, definitions, and empty templates.
- Store the filled aggregate ledger privately.
- Keep raw enquiries, bookings, and transactions only in their operational systems for the minimum useful/legal period.
- Do not export message bodies or attendee/customer identity into the measurement ledger.
- Review the privacy policy before adding any new analytics or runtime collection.

## 10/10 success condition

Repository-controlled measurement readiness is complete when:

- contact source/mode is verified in real submissions;
- Cal.com UTM fields are verified in real booking records;
- Dodo orders/refunds are reconciled by region;
- qualification rules are used consistently for four weeks;
- the site and evidence roadmap are changed from observed outcomes rather than internal preference.

Portfolio persuasion cannot honestly receive a 10/10 success score until measured outcomes show that target recruiters, founders, or buyers understand the positioning and take qualified action.
