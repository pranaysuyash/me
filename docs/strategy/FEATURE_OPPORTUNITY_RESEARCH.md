# Feature Opportunity Research: Pranay Suyash Portfolio Site

## Inputs Found vs. Not Found

### FOUND (via Codebase Analysis):

| Input | Value Found | Source |
|-------|-------------|--------|
| **App name** | "Pranay Suyash Portfolio" | README.md, package.json |
| **Repo path** | `/Users/pranay/Projects/pranay` | Current directory |
| **Primary purpose** | Personal portfolio showcasing Document AI, Workflow Automation, and Fast Prototypes work | Hero section `page.tsx:38-40`, metadata |
| **Primary users** | (1) Hiring managers/recruiters, (2) Founders/teams seeking AI/product consulting | Dual-path architecture: `/hire-me` and `/work-with-me` |
| **Current stage** | Live production site (Next.js 15.3.1, Tailwind v4 beta) | package.json, build artifacts present |
| **What the app already does** | See detailed capability map below | Multiple page files analyzed |
| **Known competitors** | Not explicitly documented in repo | **NOT FOUND - will infer** |
| **Adjacent/complementary tools** | Medium (RSS), GitHub (pinned repos), Google Calendar (booking) | `contact/page.tsx`, `api/github-pinned/route.ts` |
| **Business model** | Personal branding + consulting lead gen + potential hiring | Page structure implies dual conversion paths |
| **Distribution model** | Web (Next.js), potential SEO/organic | No paid distribution channels found |
| **Existing docs** | DESIGN.md, README.md, multiple audit reports | Audit docs present (COMPREHENSIVE_PORTFOLIO_AUDIT_MASTER.md, etc.) |
| **Out of scope** | Not explicitly defined | **NOT FOUND - will infer** |

### NOT FOUND (Requires Research/Inference):

| Input | Status | Approach |
|-------|--------|----------|
| **Direct competitors** | MISSING | Will research portfolio sites of similar AI/Product professionals |
| **Indirect competitors** | MISSING | Will identify: LinkedIn profiles, PDF resumes, Notion portfolios |
| **Competitor feature analysis** | MISSING | Will conduct web research |
| **User personas** | MISSING | Will infer from dual-path architecture |
| **Usage analytics** | MISSING | No visible PostHog/Vercel Analytics implementation |
| **Revenue/conversion metrics** | MISSING | Not tracked in codebase |
| **User feedback/requests** | MISSING | No issues.md or feedback mechanism found |

---

## Current Product Capability Map (RECONSTRUCTED FROM CODEBASE)

### Core Capabilities

| Capability | Location | Status | Confidence |
|------------|----------|--------|------------|
| **Hero section with dual-path CTAs** | `page.tsx:29-83` | Existing | High |
| **Proof strip with metrics** | `page.tsx:86-110` | Existing | High |
| **Featured projects grid** | `page.tsx:112-190` | Existing | High |
| **Project detail pages** | `work/[slug]/page.tsx` | Existing | High |
| **JSON-based content management** | `content/projects.json` | Existing | High |
| **GitHub pinned repos integration** | `api/github-pinned/route.ts` | Existing | High |
| **Medium RSS feed (intended)** | README mentions | Partial | Medium |
| **Contact form with email** | `contact/page.tsx`, `api/contact/route.ts` | Existing | High |
| **Calendar booking integration** | `contact/page.tsx:96-110` | Existing | High |
| **Dark mode toggle** | `theme-toggle.tsx`, `theme-provider.tsx` | Existing | High |
| **Admin panel structure** | `admin/page.tsx` | Partial/Present | High |
| **Responsive navigation** | `layout/navbar.tsx` | Existing | High |
| **Project categorization/filtering** | `work/page.tsx:10-19` | Existing | High |
| **Animated UI components** | Framer Motion usage | Existing | High |
| **shadcn/ui component library** | `components/ui/` | Existing | High |

### Partial/Implied Capabilities

| Capability | Evidence | Status | Confidence |
|------------|----------|--------|------------|
| **Admin CRUD operations** | Admin panel UI exists but auth disabled | Partial | High |
| **Medium RSS integration** | Mentioned in README, not visible in code | Implied | Medium |
| **GitHub OAuth authentication** | NextAuth deps present, `page.tsx` refs | Partial | High |
| **Resume download** | `/hire-me` page exists, HTML resume in public | Existing | High |
| **Analytics tracking** | No visible implementation | Missing | High |
| **SEO optimization beyond basic** | Basic meta tags only | Partial | High |
| **Performance monitoring** | None visible | Missing | High |

---

## Core Jobs-to-be-Done Analysis

### Primary JTBD: "Help hiring managers understand if I'm right for their role"

**Current implementation:**
- `/hire-me` page with role fit information
- Resume download
- Contact/booking for interviews
- Skills/projects showcase

### Secondary JTBD: "Help founders/teams understand if I can help with their project"

**Current implementation:**
- `/work-with-me` page with pricing and engagement types
- Project case studies
- Contact form with budget selection
- Direct booking calendar

### Tertiary JTBD: "Establish credibility and expertise in Document AI/Workflow Automation"

**Current implementation:**
- Featured projects with technical depth
- YC S20 affiliation prominently displayed
- Metrics proof strip (45K+ fields, etc.)
- Technical blog integration (Medium RSS - intended)

---

## Initial Observation: This is a High-Stakes Portfolio

The site reveals a **premium personal brand** targeting:
1. **High-value hiring** (AI/ML/Product roles)
2. **Consulting engagements** (Document AI workflows)

The owner is positioned as a **"sold founder turned consultant"** with:
- Y Combinator S20 background
- Shipping track record ($1M ARR mentioned)
- Technical depth + product leadership combo

This context is critical for feature recommendations.

---

## Next Steps: Research Phase

1. **Competitor Analysis**: Research portfolio sites of similar profiles
   - AI/ML product engineers
   - YC alumni consultants
   - Document AI specialists
   
2. **Adjacent Tool Research**:
   - Portfolio/site builders (Framer, Webflow, etc.)
   - Professional presence tools (LinkedIn, Polywork)
   - Consulting lead-gen platforms

3. **Missing Capability Identification**:
   - Where do hiring managers currently validate candidates?
   - Where do founders find AI consultants?
   - What would accelerate trust-building?

---
