# Portfolio products and paid-workflow strategy

Date: 2026-07-23  
Status: accepted direction, implementation in progress  
Decision owner: Pranay Suyash

## Question

How should `pranaysuyash.com` sell existing products and introduce smaller paid workflows without confusing three different visitor intents:

1. hiring Pranay into a sustained internal role;
2. buying a finished product;
3. commissioning a bounded custom workflow or system?

A second question follows: should SignKit remain only a case study, or should the portfolio list it directly as a product for sale?

## Decision

Create a first-class **Products** surface.

The public information architecture will distinguish:

- **Products** — finished offers with a real price, checkout, delivery path, support boundary, and current evidence;
- **Workflows** — free discovery, live mechanisms, starter artefacts, audited cases, and pathways into a product or custom engagement;
- **Services** — scoped implementation or sustained product ownership when an off-the-shelf product is not enough;
- **Work** — evidence and case studies, not a store catalogue.

SignKit should be listed directly for sale because it already satisfies the minimum product contract:

- current product site: <https://signkit.work/>;
- current checkout: <https://pranaysuyash.gumroad.com/l/signkit-v1>;
- public price: **US$29 one time**;
- platforms: macOS, Windows, and Linux;
- delivery and updates through Gumroad;
- explicit privacy and claim boundary: offline signature-image extraction and PDF placement, not identity verification or certified electronic signing.

The book remains the second current product, fulfilled through Dodo Payments with separate India and global pricing.

No other item may be presented as purchasable until the deliverable exists and the release contract can verify its checkout, delivery, claim boundary, and support path.

## Why this is the right model

### 1. A product should not be hidden inside a case study

SignKit is already described as a commercial product with early customer validation. Hiding its purchase path inside an external link wastes the strongest commercial proof on the site. A visitor who has the exact problem should be able to move from evidence to purchase without first entering a consulting funnel.

### 2. Products and services answer different buying questions

A product buyer asks:

- Does this solve my problem now?
- What does it cost?
- What platforms and inputs does it support?
- What happens after payment?
- What does it explicitly not do?

A services buyer asks:

- Can this person understand my workflow?
- What would the engagement include?
- What evidence defines completion?
- What is excluded?

Putting both under one generic CTA forces visitors to decode the business model.

### 3. Free proof should lead to a paid object, not be the paid object

The current workflow starters and browser mechanisms are intentionally direct and ungated. They should remain free. Charging for the same files would weaken trust.

Paid workflow products must add a materially different object, such as:

- executable local utility;
- batch-processing capability;
- exportable result;
- reusable schemas and fixtures;
- automated validation or benchmark script;
- versioned operator pack;
- supported desktop package;
- maintained integration adapter.

A prettier PDF is not enough.

## Comparable models

### Pieter Levels: product history as the resume

Pieter Levels presents a large project inventory with explicit status, commercial outcome, and direct links. The useful pattern is not the volume; it is that products are treated as the professional record rather than separated from it.

Source: <https://levels.io/projects/>

Portfolio implication:

- keep honest maturity/status;
- connect evidence to the product surface;
- let active paid products have direct commercial actions;
- keep failed, archived, and non-commercial experiments visibly distinct.

### Josh Comeau: clear product family and dedicated checkout

Josh Comeau separates free writing from premium products, gives each course a dedicated product page and checkout, states pricing and policies clearly, and supports regional pricing without turning the personal homepage into a generic store.

Sources:

- <https://www.joshwcomeau.com/courses/>
- <https://www.joshwcomeau.com/contact/>

Portfolio implication:

- a personal site can sell multiple products while retaining a strong professional identity;
- each product needs its own promise, proof, policies, and purchase path;
- regional pricing should be explicit and rule-based, not negotiated through private messages.

### Wes Bos: free and premium offers in one catalogue

Wes Bos labels courses as free or premium and uses free products as distribution into a larger paid catalogue. He also documents purchasing-power discounts as a business and access policy rather than an improvised coupon conversation.

Sources:

- <https://wesbos.com/courses>
- <https://wesbos.com/parity-purchasing-power>

Portfolio implication:

- free workflow starters can coexist with paid products;
- the distinction must be obvious at catalogue level;
- free items should demonstrate the quality and operating model of the paid offers.

### Adam Wathan: free substrate, paid adjacent product

Tailwind CSS created the free substrate and distribution; Tailwind UI became the paid adjacent product. The commercial product did not merely lock the free framework. It delivered a different, ready-to-use object.

Sources:

- <https://adamwathan.me/projects/>
- <https://adamwathan.me/tailwindcss-from-side-project-byproduct-to-multi-mullion-dollar-business/>

Portfolio implication:

- the free workflow library should remain useful;
- paid products should compress implementation or operation materially;
- paid products need stronger delivery and update expectations than public examples.

## Product ladder for pranaysuyash.com

### Level 1 — Free proof

Purpose: comprehension and trust.

Current surfaces:

- workflow chooser;
- five ungated workflow starters;
- working browser mechanisms;
- audited product cases;
- proof ledger;
- book sample.

Success condition: a visitor can understand the workflow, evidence model, and claim boundary without paying or submitting an email address.

### Level 2 — Finished products

Purpose: immediate purchase and use.

Current products:

1. **SignKit** — US$29 one-time desktop software purchase through Gumroad.
2. **No Claim Without Evidence** — PDF + EPUB through Dodo Payments with India/global pricing.

Required product contract:

- named buyer and problem;
- current price or clear pricing rule;
- direct checkout;
- delivery mechanism;
- support contact;
- refund/merchant boundary;
- version/update expectation;
- precise non-claims;
- current evidence review.

### Level 3 — Paid workflow products

Purpose: solve one narrow operational job without a custom implementation engagement.

Admission criteria:

- repeatable input contract;
- bounded output contract;
- deterministic or validated processing path;
- visible failure/exception state;
- buyer can complete the workflow without Pranay manually operating it;
- checkout and delivery are real;
- support burden is understood;
- privacy and retention are documented;
- product is materially more useful than the free starter.

### Level 4 — Custom adaptation

Purpose: handle organization-specific inputs, integrations, policies, users, and acceptance criteria.

The workflow library should route here only when the product boundary does not fit. The custom engagement starts from the selected workflow context rather than a generic contact form.

## Candidate paid workflows

### Candidate A — Document Extraction Review Kit

**Buyer:** product teams, automation consultants, and operations teams preparing a document-extraction system.

**Paid object, not just documentation:**

- versioned schema workbook;
- golden-set template;
- field-level evidence model;
- exception taxonomy;
- benchmark and acceptance scripts;
- sample synthetic document set;
- review-queue states;
- release-gate checklist;
- worked example showing failed and corrected extraction.

**Natural path:** free extraction starter → paid review kit → custom parser/system.

**Recommendation:** first workflow kit to build because it directly supports the portfolio’s document-workflow wedge and book thesis.

### Candidate B — Local File Evidence Inspector

**Buyer:** analysts and operators who need a quick local inventory of mixed files before choosing a larger extraction system.

**Paid object:**

- local desktop or browser-contained batch inspection;
- file/folder intake;
- metadata and deterministic evidence extraction;
- CSV/JSON export;
- unsupported-file and failure report;
- no cloud upload by default.

**Natural path:** free visual evidence mechanism → paid batch utility → MetaExtract/custom system.

**Recommendation:** strongest small software product after SignKit because it turns an existing capability direction into a reusable operational utility.

### Candidate C — Signature Workflow Operator Pack

**Buyer:** small teams that already own SignKit and need a controlled team process.

**Paid object:**

- synthetic SOP and review checklist;
- naming/storage convention;
- PDF-placement QA guide;
- team licence or deployment guide;
- optional onboarding session.

**Natural path:** SignKit personal licence → team/operator pack → custom document workflow.

**Recommendation:** sell only as an add-on after validating team demand. Do not fragment the core SignKit feature set into a second purchase.

### Candidate D — Meeting Capture and Recovery Pack

**Buyer:** teams operating local or consent-sensitive meeting capture.

**Paid object:** consent templates, source-selection checklist, recovery runbook, transcript provenance schema, and export conventions.

**Recommendation:** defer. EchoPanel’s platform capture and packaging constraints remain active, so selling an adjacent pack now could imply a product maturity that does not yet exist.

### Candidate E — Spatial Coverage Review Pack

**Buyer:** consultants or facilities/security planners needing a structured pre-installation review.

**Paid object:** synthetic scene template, camera inventory, coverage-state worksheet, blind-zone report schema, comparison rubric, and decision record.

**Recommendation:** use first as a lead-qualification artefact or higher-priced assisted assessment, not a low-cost self-serve product. The domain has higher liability and calibration expectations.

## Pricing posture

Do not force one pricing model across all products.

- **SignKit:** maintain the current US$29 one-time price until actual sales/support evidence justifies a change.
- **Book:** retain India/global regional pricing.
- **Downloadable workflow kit:** one-time purchase, likely lower than software but high enough to support updates and support.
- **Desktop utility:** one-time personal licence with a separately defined team licence if demand exists.
- **Pay-per-run workflow:** only after cost, abuse, storage, privacy, retries, and refund handling are implemented.
- **Custom adaptation:** fixed scope or sustained ownership through Services, not a low-ticket product checkout.

Prices for future products must not be published before the product, merchant configuration, delivery, tax, refund, and support paths exist.

## Information architecture

### Primary navigation

Add `Products` as a first-class route. Keep `Workflows` because it is a discovery and proof surface, not a synonym for products.

Recommended order:

1. Work
2. Products
3. Workflows
4. Experience
5. Services
6. About

The book remains inside Products and may retain contextual links from writing/book content. This reduces the primary-navigation crowding caused by treating one product as a permanent top-level category.

### Products page

Required sections:

1. current paid products;
2. direct price and checkout;
3. delivery/support/claim boundary;
4. free workflow resources as the lower-commitment path;
5. custom adaptation as the higher-commitment path;
6. explicit statement that unfinished products are not listed for sale.

### SignKit case page

Add a purchase block driven by canonical product data:

- price;
- one-time ownership;
- supported platforms;
- checkout button;
- product-site link;
- offline/non-certified-signature boundary.

Do not duplicate the price and checkout URL in multiple page components. Store them once in the product record and consume them from Products and the audited case renderer.

## Measurement

The first useful measurements are completed events, not page-view surveillance:

- product checkout click by product and source;
- completed order from Gumroad or Dodo provider records;
- refund/support event;
- workflow-library path selected before a product or contact action;
- qualified custom enquiry originating from a product or workflow.

Do not add session replay, behavioural profiling, or cross-site tracking to answer this question.

## Risks and controls

### Product sprawl

Control: a product must satisfy the admission contract before appearing as purchasable.

### Portfolio confusion

Control: Products, Workflows, Services, and Work each answer a distinct visitor question.

### Unsupported sales claims

Control: prices, platforms, delivery, maturity, and non-claims remain source-validated.

### Support burden

Control: every product declares support scope and update expectations before checkout.

### Privacy and sensitive files

Control: local-first products state the local boundary; future hosted workflows require a separate data-handling decision and policy.

### Marketplace temptation

Control: do not turn the workflow library into a broad template marketplace. Add only products tied to real capability, evidence, and a plausible buyer.

## Build order

1. Add canonical product-offer data and a `/products` route.
2. Surface SignKit purchase actions on Products and the SignKit case.
3. Move the book into the Products catalogue while preserving its dedicated page and checkout.
4. Add source/browser release contracts for product price, checkout, route, and claim boundaries.
5. Build the Document Extraction Review Kit as the first new paid workflow product.
6. Validate demand for the Local File Evidence Inspector before packaging it as the next software product.

## Anything else?

Yes.

- Exact production build identity currently trails `main` by the doctrine-only v4 migration commit. The public product behavior is current, but a future verified deployment should restore exact SHA parity.
- The local npm/lockfile mismatch must be fixed through a pinned toolchain rather than repeatedly regenerating the lockfile under ambient npm versions.
- Wrangler should be pinned for both manual and automated deployment paths.
- SignKit already has screenshots on its product site. The portfolio’s direct-product evidence plan should reuse approved current captures or capture equivalent revision-bound assets rather than continuing to show only a workflow map.
- Gumroad remains SignKit’s current merchant/delivery boundary; the portfolio must not imply Dodo fulfils SignKit unless a deliberate migration is completed.
