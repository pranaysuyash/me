# Copy Inventory — Strategic Correction Pass

Last updated: 3 April 2026

This document maps key copy used across pages/components, including intent, placement, and strategic role.

## Global identity and navigation

| Location                                    | Copy                                                | Purpose                                              |
| ------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------- |
| `src/components/layout/navbar.tsx`          | `Pranay Suyash`                                     | Strong name recall/trust in header identity          |
| `src/components/layout/navbar.tsx`          | `Portfolio` (eyebrow)                               | Context marker without overpowering name             |
| `src/components/layout/navbar.tsx`          | `Work`, `Work With Me`, `Hire Me`, `About`          | Priority-aligned nav routing (commercial path first) |
| `src/components/layout/navbar.tsx` (mobile) | `Work With Me` primary CTA, `Hire Me` secondary CTA | Preserve pilot-first strategy in mobile menu         |

## Homepage (`src/app/page.tsx`)

### Hero

| Copy                                                                  | Purpose                                                  |
| --------------------------------------------------------------------- | -------------------------------------------------------- |
| `Pranay Suyash · Product / Workflow / Practical AI Systems`           | Immediate positioning without engineer-first framing     |
| `I turn messy workflows and unstructured inputs into usable systems.` | Core promise and differentiation                         |
| `I work at the intersection of product delivery...`                   | Practical scope framing; avoids generic AI buzzword soup |
| CTA: `Start a pilot`                                                  | Primary side-income/scoped work route                    |
| CTA: `Hiring me for delivery roles`                                   | Secondary hiring route                                   |

### Proof strip

| Copy                                          | Purpose                              |
| --------------------------------------------- | ------------------------------------ |
| `MedPiper (YC S20)`                           | Credibility signal                   |
| `14 years product + workflow delivery`        | Experience signal in correct framing |
| `Paid product with early customer validation` | SignKit commercial proof wording     |
| `Large modular extraction system`             | Safe MetaExtract public phrasing     |
| `~$1M ARR platform growth context`            | Outcome context without overclaiming |

### Flagship section

| Copy pattern                       | Purpose                                 |
| ---------------------------------- | --------------------------------------- |
| `Flagship work`                    | Editorial hierarchy over archive feel   |
| `What this proves: ...` (per card) | Explicit proof-layer for rapid scanning |

### Closing split

| Copy                                                | Purpose                   |
| --------------------------------------------------- | ------------------------- |
| `For founders & teams` + `Start a pilot`            | Primary conversion lane   |
| `For hiring teams` + `Hiring me for delivery roles` | Secondary conversion lane |

## Work page (`src/app/work/page.tsx`)

| Section copy                                            | Purpose                                              |
| ------------------------------------------------------- | ---------------------------------------------------- |
| `Flagship work (fixed order)`                           | Prevent equal-weight card sprawl                     |
| `Technical depth`                                       | Keep serious secondary credibility accessible        |
| `More work`                                             | Preserve archive discoverability with lower emphasis |
| `Secondary archive (filters kept here for navigation).` | Clarifies filter scope and hierarchy                 |

## Project data source (`src/content/projects.json`)

### Flagship proof roles

| Project     | `proofRole`                                        | Strategic function       |
| ----------- | -------------------------------------------------- | ------------------------ |
| EchoPanel   | `Platform breadth + real product use case`         | Front-door proof anchor  |
| SignKit     | `Productization + early commercial validation`     | Commercial utility proof |
| MetaExtract | `Systems depth / extraction moat`                  | Depth anchor             |
| PhotoSearch | `Local-first multimodal search + product thinking` | Product/multimodal proof |

### Sensitive phrasing controls

| Project     | Current safe phrasing                                                | Notes                                             |
| ----------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| SignKit     | `Paid product with early customer validation`                        | Avoid weak `1 sale` phrasing and overclaims       |
| MetaExtract | `Large modular extraction system`                                    | Avoid disputed giant field-count front-door claim |
| PhotoSearch | `Local-first natural language media search and analysis workstation` | Face clustering is supporting layer, not thesis   |
| model-lab   | `Audio pipeline evaluation workbench...`                             | Secondary technical credibility (non-flagship)    |

## Project detail page template (`src/app/work/[slug]/page.tsx`)

| Section title                 | Purpose                                                 |
| ----------------------------- | ------------------------------------------------------- |
| `What this proves`            | Fast proof read before technical deep-dive              |
| `What it is`                  | Product/workflow framing first                          |
| `Why it exists`               | Problem grounding                                       |
| `Workflow and build approach` | Practical delivery narrative                            |
| `Proof`                       | Outcomes highlighted before implementation detail       |
| `What was built`              | Technical detail remains available but not front-loaded |
| `Visual proof surface`        | Placeholder-safe note for future richer demo modules    |

## Work With Me (`src/app/work-with-me/page.tsx`)

| Copy                                        | Purpose                                                    |
| ------------------------------------------- | ---------------------------------------------------------- |
| `Build a scoped pilot in weeks`             | Side-income primary objective support                      |
| `Workflow audit & advisory`                 | Reframes generic consulting toward scoped decision support |
| `Starting scope` labels (`$10K+`, etc.)     | Public pricing without hourly-freelancer positioning       |
| `From operational drag to a working system` | Workflow-led framing over service-menu copy                |

## Hire Me (`src/app/hire-me/page.tsx`)

| Copy                                                   | Purpose                                          |
| ------------------------------------------------------ | ------------------------------------------------ |
| `Best fit for product systems, workflow automation...` | Role-fit clarity, non-principal-engineer framing |
| `Role fit` section                                     | Concrete role alignment without resume dump tone |
| `The same flagship proofs used across the site...`     | Strategic consistency with homepage/work         |

## About (`src/app/about/page.tsx`)

| Copy                                                    | Purpose                          |
| ------------------------------------------------------- | -------------------------------- |
| Narrative paragraphs (consulting → YC operator-builder) | Story/worldview lane             |
| `I don’t optimize for technical theater...`             | Intentional positioning boundary |
| `Two ways to work with me` with scoped-build first CTA  | Keeps route hierarchy consistent |

## Hero proof panel component (`src/components/hero-system-panel.tsx`)

| Copy                                                      | Purpose                                 |
| --------------------------------------------------------- | --------------------------------------- |
| `workflow_signal_router` / `Product Ops Console`          | Non-insurance domain language           |
| Pipeline labels (`Input captured`, `Signal parsing`, ...) | Generic workflow processing readability |
| Extracted modal label `Extracted Context`                 | Output artifact framing                 |

## Theme toggle hydration-safe text (`src/components/theme-toggle.tsx`)

| Copy                                      | Purpose                  |
| ----------------------------------------- | ------------------------ |
| `Theme toggle` (pre-mount aria)           | Stable SSR placeholder   |
| `Current theme: {theme}, click to toggle` | Accessible mounted state |

## Deferred copy artifacts

- Rich per-project visual annotations (future screenshot/video modules)
- Live proof module explanatory microcopy (MetaExtract + EchoPanel)
- Route-level variant labeling copy for A/B test views (pilot-first vs hiring-first)
