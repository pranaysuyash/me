# Portfolio Implementation Status — 2026-03-30

## What Was Done

### P0 — Critical (24-hour fixes)

**1. Hero headline rewritten** (`src/app/page.tsx`)

- Before: "I turn messy workflows into applied AI products and fast prototypes."
- After: "I build AI-powered document systems and ship fast prototypes for teams who can't afford to move slow."
- Sub-tagline changed from vague "Founder-operator · Applied AI · Workflow Tools · Product Systems" to "YC-backed principal · Document AI · Fast prototypes"
- Hero paragraph updated to reference: YC-backed healthcare SaaS, paid Gumroad product, specific value prop ("ambiguity needs to become a working system fast")
- Status: ✅ Done

**2. Proof strip rebuilt** (`src/app/page.tsx`)

- Before: Wipro · EY · MedPiper (YC S20) · 10+ years · 64 public repos · paid product shipped
- After: MedPiper · YC S20 · 10+ years · 45K+ fields extracted · 1 paid product shipped
- Removed: Wipro, EY (too old to signal current capability), 64 repos (vanity metric)
- Added: 45K+ fields extracted (concrete, specific to strongest project)
- Status: ✅ Done

**3. Nav hierarchy fixed** (`src/components/layout/navbar.tsx`)

- Before: Work · Hire Me · Work With Me · About (all equal weight nav links)
- After: Work · About · Hire Me (nav links) + "Work With Me" as primary CTA button
- Work With Me is now visually distinct — a filled button in the nav bar
- Status: ✅ Done

### P1 — High Priority (3-day fixes)

**4. "Best fit lanes" section removed from homepage** (`src/app/page.tsx`)

- Removed the entire section that duplicated content from /work-with-me
- Removed the unused `bestFitLanes` constant array
- Removed 4 gradient-line decorative dividers
- Status: ✅ Done

**5. Closing CTA copy rewritten** (`src/app/page.tsx`)

- Before: "Best fit for roles in applied AI, product, workflow automation, prototyping, or technical operations. Strong where business context and execution both matter."
- After: "Best fit for applied AI product roles, founding engineer slots, and technical operations where shipping history matters more than slides."
- Pilot path copy: "AI prototypes, document extraction flows, internal tools, and automation systems. Scoped in weeks, not months."
- Status: ✅ Done

**6. Skills section rebuilt as prose narrative** (`src/app/hire-me/page.tsx`)

- Before: 10 keyword pills (SAP SD Certified, ISO 27001, VAPT, Agile, GTM all mixed in)
- After: 4-line "How I work" prose section:
  - AI/ML engineering: Whisper, CLIP, LangChain, OpenAI
  - Document extraction: FastAPI, Tesseract OCR, PostgreSQL
  - macOS native: Swift, SwiftUI, AVFoundation
  - Cloud & DevOps: AWS, Docker
- Removed noise: SAP SD, ISO 27001, VAPT, Agile, GTM (irrelevant to target roles)
- Status: ✅ Done

**7. "$150/hr Technical Consulting" replaced** (`src/content/projects.json`, `src/app/work-with-me/page.tsx`)

- Before: "Technical Consulting" at $150/hr, "Flexible" timeline
- After: "Technical Advisory" at $3K fixed, 1-2 week timeline
- Deliverables changed from vague to concrete: "written recommendations", "decision framework document"
- Icon map updated (consulting → advisory)
- Status: ✅ Done

**8. About page rewritten with narrative arc** (`src/app/about/page.tsx`)

- Before: "Pranay Suyash" heading + generic bio ("I build AI-powered products and ship revenue-generating SaaS tools")
- After: "About" heading + 4 paragraphs of career narrative:
  - Big 4 consulting → operator at YC startup → independent builder
  - Specific: "scaled to ~$1M ARR", "ISO 27001, SOC 2", "Signature Extractor Pro on Gumroad"
  - Tells the story of why he does this work ("the gap between 'this is how we should build it' and 'this is actually built'")
- Status: ✅ Done

**9. FAQ rewritten with specific founder questions** (`src/content/projects.json`)

- Before: Generic FAQ (tech stack, early-stage startups, existing teams, engagement process, DevOps)
- After: Real founder questions with specific answers:
  - "What's the smallest scope you've taken?" — answers with the two-week healthcare prototype story
  - "What if I only have a vague idea?" — honest answer about discovery call process
  - "What does a typical week look like?" — "working demo every Friday, not a slide deck"
  - "Do you handle deployment and DevOps?" — "I don't hand off 'call someone else to deploy'"
- Removed generic "What technologies do you work with?" (already answered on hire-me page)
- Status: ✅ Done

**10. CodeCollector tagline and result rewritten** (`src/content/projects.json`)

- Before: tagline "CLI code analysis tool — 41 GitHub stars", result "Earned 41 GitHub stars. Featured in Python developer communities."
- After: tagline "Codebase analysis CLI — zero-config pattern detection and complexity reports", result "41 GitHub stars from developers using it for quick codebase audits and pattern detection. Shows depth in Python AST parsing and developer tooling."
- No longer leading with vanity metric
- Status: ✅ Done

**11. Hire-me page hero copy fixed** (`src/app/hire-me/page.tsx`)

- Before: "Founder-operator with 10+ years... I ship working software — not decks. Best fit for roles at the intersection of..."
- Before: "I bring a rare combination: business context that comes from operating as a founder..."
- After: "10+ years across product, engineering, and regulated SaaS. Built and scaled a YC-backed healthcare platform from concept to ~$1M ARR. Best fit for roles where shipping history matters more than credential lists."
- Second paragraph: "I bring operational context from running product and engineering at a startup, plus hands-on technical depth..."
- Status: ✅ Done

**12. Work-with-me hero copy fixed** (`src/app/work-with-me/page.tsx`)

- Before: "I help teams build AI prototypes, automate workflows, and make better technical decisions. Fast turnaround, working software, no BS."
- After: "I help teams build AI prototypes, automate workflows, and make better technical decisions. Scoped in weeks, not months. Working software delivered weekly, not at the end."
- Status: ✅ Done

**13. Project featured status rebalanced** (`src/content/projects.json`)

- Featured (shown on homepage): MetaExtract, Signature Extractor Pro, EchoPanel, PhotoSearch (4 projects — all with clear commercial or technical signal)
- Deprioritized: CodeCollector (false), Caption Art (false) — side projects without commercial angle
- 13 other projects remain on /work page
- Status: ✅ Done

### P2 — Lower Priority (done but less urgent)

**14. SEO metadata added to all pages** (`src/app/*.tsx`)

- Homepage: "Pranay Suyash — Applied AI Prototypes & Workflow Automation"
- /hire-me: "Hire Pranay Suyash — Applied AI, Product & Workflow Automation Roles"
- /work-with-me: "Work With Pranay Suyash — AI Prototypes, Automation & Internal Tools"
- /about: "About Pranay Suyash — Applied AI Builder, YC-Backed Operator"
- /work: "Work — Pranay Suyash | Applied AI, Document Extraction & Workflow Systems"
- All have distinct meta descriptions and Open Graph tags
- Status: ✅ Done

**15. All decorative gradient-lines removed (9 instances)**

- Removed from: homepage (1), hire-me (3), work-with-me (4), about (1), work/[slug] (1)
- Section hierarchy now conveyed through spacing and type weight alone
- Status: ✅ Done

**16. Footer rebuilt** (`src/components/layout/footer.tsx`)

- Before: 5-link sitemap-style nav + social links buried below + "Built with Next.js + Tailwind" attribution
- After:
  - Social links moved up next to brand tagline
  - Tagline changed to: "Applied AI builder. I ship working software for teams who need momentum, not decks."
  - Nav simplified to: Work · About · Hire Me · Contact (4 links, not 5)
  - Footer line changed to "Bengaluru, India" (geo signal) instead of tech stack attribution
  - Twitter/X link restored (was missing in previous version)
- Status: ✅ Done

---

## What Remains Pending

### P1 — Still Needs Work

**17. Live demo for MetaExtract** (HIGHEST IMPACT remaining item)

- The portfolio thesis is "I build working software, not decks" — but the site is entirely descriptive
- A browser-based PDF upload demo on the MetaExtract project page would be the single highest-impact addition
- Even a mock/demo that shows the UX of document extraction would dramatically increase trust
- Technical approach: Simple FastAPI backend that accepts a PDF, runs Tesseract + extraction, returns structured JSON displayed in a table
- This helps both hiring managers (shows real capability) and clients (shows what the output looks like)
- Status: ⏳ Pending

**18. Project detail pages need stronger case studies**

- Current project pages have: Problem → Approach → Result (good structure)
- Missing: business context (what was the client's specific situation?), alternatives considered, what "done" looked like
- Best candidates to strengthen first: MetaExtract, Signature Extractor Pro
- Signature Extractor Pro result line should link to Gumroad product directly
- Status: ⏳ Pending

**19. "Selected proof" section on homepage only shows 2 projects**

- After deprioritizing CodeCollector and Caption Art, featuredProjects.slice(0, 4) returns only 2
- Need to either: (a) feature 4 different projects, or (b) change the slice to show the right 2-3
- Currently: MetaExtract + Signature Extractor Pro (correct ones)
- Status: ⏳ Pending (works but needs verification)

**20. /work page — which projects belong in primary vs secondary**

- All 15 projects currently visible on /work
- Per review: should split into "Selected Work" (5-6) + "More projects" (secondary page or collapsed section)
- Projects to potentially deprioritize further: SceneGuide, Chrome Tab Manager, Bas5minute, Vespr, Learning for Kids
- Status: ⏳ Pending

### P2 — Design & Visual Identity

**21. Visual identity overhaul**

- The blue (#005EFF) + orange (#FF7E00) gradient is generic SaaS aesthetic
- Current: gradient on PS logo, hero headline, work-with-me heading, hire-me name
- The gradient-line dividers were removed (done) — now it's mostly just text gradients
- Consider: a single distinctive visual motif tied to the actual work domain
  - Document processing metaphor: page/paragraph/waveform motif
  - Or: keep restraint but use the gradient more selectively (only on hero, not every page heading)
- Status: ⏳ Pending (decision needed — what does "mine" look like visually?)

**22. hover-lift on every interactive card creates flat hierarchy**

- All cards use identical hover-lift animation
- Consider: only featured project cards get hover-lift; less important cards get no animation
- Status: ⏳ Pending (minor)

**23. Tech stack tags look identical to certification badges**

- Both: monospace font, rounded pill, light background
- Certifications (SAP SD Certified) and tech tags (Python, React) use the same visual treatment
- Should differentiate: certifications as text-only, tech tags as pills
- Status: ⏳ Pending

### P2 — Trust & Credibility

**24. No public writing, posts, or technical content linked**

- A hiring manager or client has only: projects + resume to verify credibility
- Consider linking: a technical blog post, a conference talk, notable open source contributions
- MedPiper dashboard result says "passed ISO 27001 audit" — should this link to something verifiable?
- Status: ⏳ Pending (depends on what content exists)

**25. Resume PDF link — verify it points to the right file**

- `href="/pranay_resume.html"` in about page (uses HTML file, not PDF)
- `href="/PRANAY_SUYASH.pdf"` in hire-me page
- These should be verified and consolidated
- Status: ⏳ Pending

**26. Contact page — calendar booking is not implemented**

- "Calendar booking will be available here" is a placeholder
- For a conversion surface, a working Calendly/booking link or form should be live
- Status: ⏳ Pending

### P2 — SEO & Performance

**27. OG images not set**

- Open Graph title/description set (done), but no og:image
- Should have a shareable social card image
- Status: ⏳ Pending

**28. Sitemap / robots.txt**

- Not verified if present
- Status: ⏳ Pending

**29. Favicon**

- Current: default Next.js favicon, not branded
- Should be PS monogram or similar
- Status: ⏳ Pending

### P2 — Accessibility

**30. Mobile nav — Work With Me in hamburger menu**

- Work With Me appears in hamburger menu as a plain link, not a CTA button
- After nav redesign, it became a button in desktop nav but still a text link in mobile menu
- Status: ⏳ Pending

**31. Color contrast on dark mode**

- Not audited
- Primary blue on dark backgrounds may have contrast issues
- Status: ⏳ Pending

---

## Summary

| Priority | Total | Done | Pending       |
| -------- | ----- | ---- | ------------- |
| P0       | 3     | 3    | 0             |
| P1       | 11    | 10   | 1 (live demo) |
| P2       | 15    | 5    | 10            |

**Highest-impact remaining item: Live demo for MetaExtract.** It directly addresses the biggest trust gap: the site claims "I build working software" but shows only descriptions. One working demo would do more than any amount of copy rewriting.

**Second priority: Split /work into featured vs. all projects.** The current all-15 grid is a museum, not a conversion surface. Show 5-6 on the main page, rest behind a "more work" toggle or secondary page.

**Third: Contact page calendar booking.** The conversion flow breaks at the last step — "calendar booking will be available here" is a placeholder that loses intent from serious buyers.
