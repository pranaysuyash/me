# External evidence request pack

## Purpose

The portfolio already explains how Pranay thinks and links to his own source. Its largest credibility gap is independent human evidence from people who directly experienced the work.

This pack is designed to gather narrow, fact-checkable, permissioned evidence. It is not a request for generic praise.

The canonical status register is:

```text
docs/evidence/external-evidence-register.json
```

No response may be published until the exact public wording, attribution, surfaces, and permission scope are approved.

## Evidence standard

A useful external statement contains:

1. the source's direct relationship to the work;
2. one concrete problem or context;
3. Pranay's specific ownership or behavior;
4. one observed change, strength, or limitation;
5. wording the source can personally verify;
6. explicit permission for the exact proposed public use.

Avoid:

- “great to work with” without an example;
- unverified revenue, user, savings, quality, or time claims;
- confidential customer, patient, contract, security, personnel, or internal-company detail;
- claims about technical implementation the source did not observe;
- statements written entirely by Pranay and rubber-stamped without review;
- anonymous quotes presented as strong market proof;
- logo use inferred from quote permission.

## Request workflow

For each target record:

1. Choose one record from `external-evidence-register.json`.
2. Send the relevant first request below.
3. Store the source response outside the public repository unless the source explicitly permits public archival.
4. Set status to `received-unverified`.
5. Check every factual claim against the source, available records, and confidentiality limits.
6. Draft a shorter `proposedPublicWording` without improving the substance.
7. Send the exact wording and attribution for approval.
8. Record the agreed `permissionScope`, including surfaces and whether editing is allowed.
9. Set status to `approved` only after written permission.
10. Add the public quote/case to the site through an evidence-ID-bound component or record, never as untracked page copy.

## Request: senior MedPiper stakeholder

**Subject:** Request to verify a short public statement about our work

Hi [Name],

I am strengthening the evidence behind my professional portfolio and would value a short, factual statement from someone who directly saw my product and platform work at MedPiper.

I am not looking for broad praise or confidential detail. The most useful response would cover one or two of these:

- what I actually owned across product, platform, operations, or implementation;
- an example of how I connected an unclear workflow to a product or system decision;
- something you observed about my judgment, hands-on involvement, or follow-through;
- whether you would trust me with a comparable product mandate again.

A few sentences in your own words are enough. Please avoid customer, patient, insurer, security, personnel, or other confidential information.

I will send back any shortened public wording and the proposed attribution for your explicit approval before publishing it. You can choose full name/role/company, a narrower attribution, private-reference-only, or no use at all.

Thank you,
Pranay

## Request: MedPiper engineering or operations collaborator

**Subject:** Could you verify one concrete example of how we worked together?

Hi [Name],

I am building a more evidence-led account of my work and would like to include a concrete collaborator perspective rather than only my own description.

Could you describe one workflow or delivery situation we worked on together, focusing on:

- what was difficult or fragmented before;
- what I specifically did across product, process, engineering, or rollout;
- what became clearer, faster, safer, or easier to operate;
- any important trade-off or limitation that remained.

Please keep it sanitized and within what you are authorised to discuss. I do not need internal numbers or confidential customer detail.

I will not publish your raw response automatically. I will send the exact proposed wording, attribution, and page placement for written approval first.

Thank you,
Pranay

## Request: former EY colleague or client-side stakeholder

**Subject:** Request for a bounded reference on enterprise transformation work

Hi [Name],

I am updating my portfolio to represent my enterprise transformation work with more independent evidence. Would you be comfortable sharing a short factual statement about work you directly observed?

The useful scope is narrow:

- the kind of process or delivery problem involved;
- my role in requirements, process mapping, blueprinting, testing, rollout, or adoption;
- one concrete delivery strength or contribution;
- a result that can be stated without identifying a confidential client or breaching policy.

Please exclude anything covered by client confidentiality, firm policy, or information you are not authorised to disclose. A private reference is also useful; I will not imply that it is public.

Before any public use, I will send the exact proposed wording and attribution for your approval.

Thank you,
Pranay

## Request: paying SignKit customer

**Subject:** Would you share a short, honest account of how you use SignKit?

Hi [Name],

Thank you for using SignKit. I am improving the product's public evidence and would value a short account from a real customer.

I am interested in the workflow, not generic praise:

- what you did before using SignKit;
- which parts you actually use—extraction, cleanup, saving assets, or PDF placement;
- whether it changed time, privacy, repeated effort, or result quality in a concrete way;
- what remains imperfect, or who you think the product is not for.

Please do not send documents, signatures, identity information, or confidential examples. A few sentences are enough.

I will draft a concise version only after receiving your response and will send the exact wording, attribution, and proposed page placement for approval. Permission to quote you does not imply permission to use your logo, documents, or signatures.

Thank you,
Pranay

## Exact-wording permission follow-up

**Subject:** Approval request for the exact public wording

Hi [Name],

Thank you for the response. Below is the exact wording I propose to publish:

> [Exact proposed quote or case statement]

Proposed attribution:

> [Name / role / company or another agreed attribution]

Proposed surfaces:

- [portfolio page];
- [case-study page];
- [optional LinkedIn or proposal use];
- no paid advertising unless separately approved.

Please reply with one of the following:

1. **Approved exactly as written** for the listed surfaces.
2. **Approved with these edits:** [edits].
3. **Private reference only; do not publish.**
4. **Not approved.**

You may also ask me to remove or update the statement later. Logo, image, document, recording, and customer-data use are excluded unless separately specified.

Thank you,
Pranay

## Permission record

For an approved record, retain:

```yaml
external_evidence_id:
source_relationship:
source_wording:
proposed_public_wording:
attribution:
permission_received_at:
permission_channel:
permission_scope:
  portfolio: true | false
  case_study: true | false
  proposals: true | false
  linkedin: true | false
  paid_advertising: false
logo_permission: false
image_permission: false
editing_permission: exact_only | factual_shortening_with_reapproval
confidentiality_boundaries: []
withdrawal_contact_path:
fact_checked_by:
evidence_location:
```

Do not store private email addresses, raw message exports, or confidential attachments in the public repository.

## Publication review

Before adding external evidence to the portfolio:

- confirm the register status is `approved`;
- confirm the public wording exactly matches the approved version;
- confirm the source has direct knowledge of each claim;
- separate personal observation from company-wide or customer outcome claims;
- avoid turning one person's statement into a universal claim;
- retain limitations when they materially affect interpretation;
- link to an independent public source where the evidence is already public;
- show the relationship and date so visitors can judge relevance;
- remove or revise the statement when permission is withdrawn or the underlying fact changes.

## Completion target

The external credibility layer is materially complete when the site has, at minimum:

- one approved senior stakeholder statement about sustained product/platform ownership;
- one approved collaborator statement about cross-functional execution;
- one approved paying-customer account of actual SignKit use;
- one named and permissioned commercial case study with direct product evidence and an observable result;
- no untracked quote, logo, or endorsement elsewhere in the site.
