# Copy Change Log: Second-Pass Correction

## Date: 2026-04-04

## Branch: strategic-correction-pass

## Stats: 11 files changed, 1042 insertions, 1252 deletions

---

## 1. projects.json

**File:** `src/content/projects.json`
**Scope:** All 4 flagship projects (EchoPanel, SignKit, MetaExtract, PhotoSearch) + Model Lab + all archive projects + services data

### Changes:

- **EchoPanel (#1):** Tagline from "Local-first meeting intelligence" to "Record a meeting, find what was said later". Description rewritten to be more conversational. Problem reframed around the actual pain (replaying recordings). Approach simplified. Outcomes softened ("Real-time" → "On-device"). Constraints made more honest.
- **SignKit (#2):** Tagline from "Signature extraction & PDF signing — commercial desktop product" to "Signature extraction and PDF signing, shipped as a paid desktop product". Proof summary rewritten to emphasize commercial validation. Problem reframed around "nobody wants three apps for what should be one flow". Accuracy percentages removed from outcomes.
- **MetaExtract (#3):** Tagline from "Large modular extraction system" to "Modular extraction system for messy, inconsistent document workflows". All specific throughput/accuracy claims removed. Description made more operational and less marketing-sounding.
- **PhotoSearch (#4):** Tagline from "Local-first natural language media search and analysis workstation" to "Search your photos by describing what is in them". Description rewritten to be user-action-led. "10K+" and "sub-second" claims removed. People clustering positioned as supporting feature, not primary.
- **Model Lab:** Proof summary rewritten from generic to specific: "Built the infrastructure to compare models fairly: same harness, same data, same metrics."
- **Archive projects (17 projects):** All descriptions trimmed for brevity. Removed redundant "demonstrates ability to..." language. Tightened problem statements.
- **Services data:** Removed "Applied AI" from service titles and descriptions. Replaced with more operational language.

---

## 2. Homepage (page.tsx)

**File:** `src/app/page.tsx`

### Changes:

- **Metadata title:** "Workflow Systems · Document AI · YC S20" → "Product & Workflow Systems"
- **Metadata description:** Removed "including reducing insurance processing from 4 weeks to 10 days" (moved to proof strip)
- **Eyebrow:** "Pranay Suyash · Product / Workflow / Practical AI Systems" → "Pranay Suyash"
- **Headline:** "I turn messy workflows and unstructured inputs into usable systems." → "I take messy workflows and turn them into software that actually works."
- **Subheadline:** Removed "intersection of product delivery, workflow design, and AI-enabled execution". Replaced with direct description of the actual work context.
- **Proof strip:** Replaced "~$1M ARR platform growth context" and "Paid product with early customer validation" with concrete "Insurance processing: ~4 weeks to ~10 days" and "SignKit shipped as paid product"
- **Flagship intro:** From "Curated proof of product delivery..." to "Four projects that show the range: a local-first meeting tool, a paid desktop product, a modular extraction pipeline, and a natural language photo search workstation."
- **Closing CTA (founders):** "Need a scoped pilot or workflow build?" → "Have a workflow problem that needs a working first version?"
- **Closing CTA (hiring):** "Hiring for product/workflow/AI delivery roles?" → "Looking for someone who can own messy product-workflow problems?"
- **CTA buttons:** Simplified "Hiring me for delivery roles" → "See role fit". Removed variant system (homeVariant/ctaVariants).
- **"What this proves:"** → **"Why it matters:"**
- **All em dashes removed**

---

## 3. Hero System Panel (hero-system-panel.tsx)

**File:** `src/components/hero-system-panel.tsx`

### Changes:

- **Complete rewrite.** Removed fabricated "Product Ops Console" with fake metrics (pipeline health, modules active, processing rate, etc.)
- Replaced with EchoPanel-inspired transcript recording surface showing realistic meeting dialogue
- Shows: meeting title, duration, speakers with timestamps, searchable transcript
- Includes search bar, filter chips, and export actions
- No fake data, no fabricated metrics
- 597 → ~280 lines (significant reduction)

---

## 4. Work Page (work/page.tsx)

**File:** `src/app/work/page.tsx`

### Changes:

- **Intro paragraph:** "Curated proof first, then technical depth. This is not an archive of equal-weight projects." → "The strongest projects first. Everything else is below."
- **Section header:** "Flagship work (fixed order)" → "Flagship"
- **Archive subtitle:** "Secondary archive (filters kept here for navigation)" → "Older projects, experiments, and client work."

---

## 5. Project Detail Template (work/[slug]/page.tsx)

**File:** `src/app/work/[slug]/page.tsx`

### Changes:

- Removed entire "Visual proof surface" placeholder box (was a grey box with "Visual proof surface — screenshot or demo coming soon")
- **"What this proves"** → **"Why it matters"**

---

## 6. Work With Me Page (work-with-me/page.tsx)

**File:** `src/app/work-with-me/page.tsx`

### Changes:

- **Hero headline:** "Build a scoped pilot in weeks" → "Turn a workflow problem into a working first version"
- **Engagement cards:** Made more problem-led
- **Buyer proof titles:** Sharpened
- **"Not sure where to start?" card:** Rewritten to be more direct
- **Metadata description:** Cleaned of generic language
- **All em dashes removed**
- **All "applied AI" references removed**

---

## 7. Hire Me Page (hire-me/page.tsx)

**File:** `src/app/hire-me/page.tsx`

### Changes:

- **Hero subheadline:** Generic "applied AI" language replaced with "Not a pure engineer role, not a product manager role, not a consulting role."
- **Role fit categories:** Made more specific and less jargon-heavy
- **Strengths items:** Sharpened from generic to operational
- **Closing CTA:** "Ready to talk?" → "Want to explore fit?"
- **"What this proves:"** → **"Why it matters:"**
- **All em dashes removed**

---

## 8. About Page (about/page.tsx)

**File:** `src/app/about/page.tsx`

### Changes:

- **Subtitle:** "Product/workflow operator-builder" → "I build products, workflows, and systems"
- **Body copy:** Rewritten paragraph by paragraph to be more personal, authored, and less resume-like
- **Avatar:** Upgraded from plain grey circle to gradient circle with border

---

## 9. Navbar (navbar.tsx)

**File:** `src/components/layout/navbar.tsx`

### Changes:

- **"Portfolio" label** replaced with **"Product & workflow systems"** in both desktop and mobile menus

---

## 10. Footer (footer.tsx)

**File:** `src/components/layout/footer.tsx`

### Changes:

- **Tagline:** "Document AI, workflow automation, and product systems." → "Products, workflows, and systems."

---

## 11. Root Layout (layout.tsx)

**File:** `src/app/layout.tsx`

### Changes:

- **Title:** "Product · Document AI · YC S20" → "Product & Workflow Systems"
- **Description:** Rewritten to remove generic AI language
- **Keywords:** Cleaned of buzzwords
- **Duplicate twitter section:** Fixed
- **Missing template property:** Restored

---

## Build Verification

`npm run build` passes clean. All 35 pages generated successfully. No TypeScript errors.
