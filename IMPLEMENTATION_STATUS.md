# Portfolio Implementation Status — 2026-03-31

## What was done

### Nav identity

- PS monogram + "Pranay" text label on desktop, PS only on mobile
- Theme toggle moved after Work With Me CTA, before GitHub icon
- Nav order on desktop: Work · Hire Me · About · Work With Me (CTA) · [theme toggle] · [GitHub]

### Favicon

- Dark square (#18181b) with white PS text, no gradient

### Homepage

- Eyebrow: `Document AI · Workflow automation · Fast prototypes`
- Headline: `I turn document-heavy workflows into applied AI systems and fast, usable prototypes.`
- Proof strip: `MedPiper (YC S20) · 10+ years · 45K+ fields extracted · Paid product shipped`
- Section title: `Selected work`
- Path labels: `Hiring path` / `Project path`
- Footer tagline: `Document AI, workflow automation, and product systems.`

### About page

- Complete intro rewrite — removed false "left to focus on independent work" narrative
- MedPiper framed as current role: "scaled to roughly $1M ARR while I was working across those functions"
- Parallel work: "Alongside my work at MedPiper..."
- "Book a Call" → "Contact"
- Closing CTA: "Two ways to work with me"

### Hire Me page

- Title, intro refreshed
- New: "Why I'm a strong hire now" + "How I work inside teams"
- `Selected proof` → `Selected work` in proof strip section (found via visual QA)

### Work With Me page

- Fully rewritten with new structure
- Hero with provided copy
- Workflow compression section (Before/After + "How it typically goes")
- Engagement cards: Best fit → Timeline → Starting scope "$X+" hierarchy
- Delivery flow: Discovery → Scope → Build → Handoff
- FAQ: 4 calm, specific questions
- Disclaimer note below pricing cards

### Work page

- `Selected proof` → `Selected work` on section heading (line 141, found via visual QA)
- Working category filter pills (All, AI & ML, Computer Vision, macOS & Native, Developer Tools, Product, Data, Mobile)
- Projects grouped by category with color-coded badges
- Featured cards respect active filter — clicking a category shows only relevant featured projects
- Empty sections hidden when filtering

### Projects data (major cleanup)

- Fixed years: MetaExtract → 2025, EchoPanel → 2026, PhotoSearch Exp. → 2025
- `Speech Experiments` → `model-lab`
- `Guus` → `Appscript Work`
- `signature-extractor-pro` → `SignKit` (slug: `sig-ext-fastapi`, links to `sig_ext_fastapi_react`, live at signkit.work)
- `photosearch` → `photosearch-experiment` (old repo 404)
- Removed: chrome-tab-manager, sig-ext, medpiper-dashboard
- Added: Waste Segregation App, Insurance RAG, ShowMeTime, Kenya SHIF, File Info Explorer, model-lab, agents, avia_new, AI Glossary Pro, SceneGuide v3
- Pricing removed from public cards (SignKit: no "$12-30/mo", no "tiered paid plans"; Codecollector: no "41 GitHub stars")
- Featured 4: MetaExtract, SignKit, EchoPanel, PhotoSearch Exp.

### Page titles (consistent)

- Homepage: `Pranay Suyash | Document AI, Workflow Automation, Fast Prototypes`
- About: `About | Pranay Suyash`
- Hire Me: `Hire Me | Pranay Suyash`
- Work With Me: `Work With Me | Pranay Suyash`
- Work: `%s | Pranay Suyash`

### Footer

- Tagline: `Document AI, workflow automation, and product systems.`
- Nav: Work, Hire Me, Work With Me, About, Contact
- Horizontal compact layout on desktop

## Build

- `npm run build` ✅ succeeds — 37 static pages generated

## Still pending

### P0

- **Per-project SEO metadata** on `/work/[slug]` pages — needs `generateMetadata` export per slug

### P2 (needs user input)

- **OG image / social card** — no og:image set, needs design decision
- **Contact page Google Calendar** — env var `NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL` not set
- **Live demo for MetaExtract** — separate technical track, not part of this pass
