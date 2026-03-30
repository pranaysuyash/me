# Design System — Pranay Suyash Portfolio

## Product Context
- **What this is:** Personal portfolio and service site for Pranay Suyash, a technical founder-operator who builds AI-powered products.
- **Who it's for:** Two audiences: (1) hiring managers/recruiters for applied AI, product, and automation roles, (2) founders/teams needing AI prototypes, internal tools, or workflow automation
 - **Space/industry:** Applied AI, product engineering, workflow automation, internal tools
 document extraction
 fast prototyping
 early-stage consulting
 - **Project type:** Marketing/portfolio site with conversion focus

## Aesthetic Direction
- **Direction:** Premium Minimal with earned visual moments
 Clean, modern, credible. Not cold, Not trend-chasing.
 Warm without being casual.
 The restraint signals taste and selectivity.
 Every element earns its place.
 95% clean structure, 5% distinctive visual accents.
 A few gradient moments, generous whitespace.
 Strong type hierarchy does Nothing gratuitous.
 Serious about craft.
 Technical but human.
- **Decoration level:** Intentional. Subtle texture on dark mode. Clean surfaces on light mode. Gradient accents on exactly 3 places.
 No noise.
 No clutter. No stock photos. No generic patterns.
- **Mood:** Like walking into a well-designed office. Everything has a place. The visitor immediately understands who you are, what you do, and where to go next. Technical credibility meets human warmth. The site feels built by someone who ships products, not someone who tinkers with side projects.
 This is a working professional with opinions.

## Typography
- **Display/Hero:** Satoshi (Bold, geometric sans personality. Warm but technical. Professional without being corporate.) Loads from Fontshare. 
- **Body:** Plus Jakarta Sans (excellent readability at warm but professional. Good x-height rendering. Accessible. Pairs well with Satoshi.)
 Loads from Google Fonts.
- **UI/Labels:** Same as body (Plus Jakarta Sans)
- **Data/Tables:** JetBrains Mono (tabular nums, technical credibility for code and data contexts. Pairs well with Plus Jakarta Sans.
- **Code:** JetBrains Mono (technical badge context, code snippets)
- **Loading:** Google Fonts CDN. Satoshi via `@fontsource/plus-jakarta-sans`, or CDN. Plus Jakarta Sans via `@fontsource/plus-jakarta-sans`. JetBrains Mono for technical elements.
- **Scale:**
  - Hero: 72px / 4.5rem (bold, editorial)
  - H1: 48px / 3rem (section headers)
  - H2: 36px / 2.25rem (card titles)
  - H3: 30px / 1.875rem (subtitles)
  - Body Large: 20px / 1.25rem (lead paragraphs)
  - Body: 16px / 1rem (standard body)
  - Small: 14px / 0.875rem (captions, badges)
  - XS: 12px / 0.75rem (meta text)

## Color
- **Approach:** Restrained. Color is rare and meaningful. Most of the site is neutral with blue used as a quiet accent.
 Blue and orange appear together in exactly 3 places as the signature gradient.
 Never on backgrounds. Never as fills.
 Never as decorative elements. Only on text, CTAs, and accents.
- **Primary:** `#005EFF` (trust, technology, authority. Used for text, CTAs, active states, links)
- **Accent:** `#FF7E00` (energy. warmth. approachability. Used as secondary CTAs and accent highlights)
- **Signature Gradient:** `#005EFF → #FF7E00` (used on: hero heading text, primary CTA border, section divider line. Never as background fill.)
 Never as decorative element.
- **Neutrals (Light):**
  - Background: `#FAFAFA`
  - Surface: `#FFFFFF`
  - Surface-hover: `#F1F5F9`
  - Border: `#E2E8F0`
  - Text-primary: `#0F172A`
  - Text-secondary: `#475569`
  - Text-muted: `#94A3B8`
- **Neutrals (Dark):**
  - Background: `#0F172A`
  - Surface: `#1E293B`
  - Surface-hover: `#334155`
  - Border: `#475569`
  - Text-primary: `#F8FAFC`
  - Text-secondary: `#94A3B8`
  - Text-muted: `#64748B`
- **Semantic:**
  - Success: `#10B981`
  - Warning: `#F59E0B`
  - Error: `#EF4444`
  - Info: `#3B82F6`
- **Dark mode strategy:** Surfaces shift navy. Reduce primary saturation slightly. Same gradient. Same accent colors. No redesign needed.

 Subtle paper texture on dark surfaces via CSS noise.

 Smooth transitions.

## Spacing
- **Base unit:** 4px
- **Density:** Comfortable. Generous on hero and section breaks. Tighter in cards and data.
- **Scale:**
  - 2xs: 4px (tight gaps inside components)
  - xs: 8px (small gaps)
  - sm: 12px (component padding)
  - md: 16px (standard spacing)
  - lg: 24px (section spacing)
  - xl: 32px (large gaps)
  - 2xl: 48px (section breaks)
  - 3xl: 64px (major sections)
  - 4xl: 96px (hero padding)
- **Container:** max-width 1280px, centered with auto padding

px-4 md:px-6 lg:px-8

## Layout
- **Approach:** Grid-disciplined. Predictable alignment. Consistent rhythm.
 Asymmetric hero (60/40 split text to visual, grid content elsewhere).
- **Grid:** 12 columns desktop, 8 tablet, 4 mobile. All breakpoints collapse to single column on mobile.
 Content max-width 672px for text-heavy pages.
- **Max content width:** 1280px
- **Border radius:**
  - sm: 4px (badges, tags)
  - md: 8px (cards, inputs)
  - lg: 12px (large cards, mod containers)
  - full: 9999px (pills, buttons, avatars)

## Motion
- **Approach:** Intentional. Only transitions that aid comprehension or add polish. Nothing gratuitous.
- **Easing:**
  - enter: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out)
 subtle)
  - exit: `cubic-bezier(0.7, 0, 0.84, 1)` (ease-in, quick)
  - move: `cubic-bezier(0.45, 0, 0.55, 0.94, 1)` (smooth)
- **Duration:**
  - micro: 50-100ms (toggles, hover states)
  - short: 150-250ms (entrance animations, menu transitions)
  - medium: 250-400ms (card interactions, page transitions)

## Component Patterns
- **Cards:** White bg (light) / `#1E293B` bg (dark). 8px radius. Subtle border. Hover: translateY(-2px) with shadow lift. No colored circles behind icons. Icon directly inline as SVG.
 Text next to icon.
 Badge below card title. Short description. Link in card footer.
 Use sharp CTA.
- **Buttons:**
  - Primary: Blue bg. White text. 8px radius. Hover: darken 2%. Focus ring on focus. Subtle scale on active.
 Always rounded-full (pill shape).
  - Secondary: White bg. Blue text + border. Same shape. Hover: light blue bg. Same rounded-full shape.
  - Ghost: Transparent bg. Blue text. Same shape. Hover: subtle blue bg.
- **Navigation:** Fixed top. Subtle backdrop blur on scroll. Clean links. Active link has thin underline accent. No background on active link (transparent nav). Logo on left. Theme toggle + social links on right. "Hire Me" and "Work With Me" as primary nav links, visually distinct from other nav items.
 Mobile: hamburger menu with full-screen slide.

## Safe Choices (your peers expect these)
- Clean sans-serif stack with geometric display font (Satoshi)
 
- Blue primary (trust, tech, professional) - Dark mode support
- Responsive, mobile-first
- Single-column mobile fallback
- Accessible, semantic HTML

 - Fast load times
 optimized images

## Risks (where your site gets its own face)
- **Dual-path hero with intent-based CTAs.** Most portfolios have one generic "View my work / Contact me." Yours immediately routes: "Hire me" path (hiring managers) or "Work with me" path (founders). "Browse work" as tertiary option. This is the conversion architecture, not a design choice. It directly communicates who you serve and what action you take.
 The dual CTAs tell the story before the content does.
- **Case study pages over project cards.** Each project gets a full page with: problem, approach, result, tech stack. Shows depth. Shows thinking. Shows real work. Most portfolios link to GitHub repos or live demos. You show the full story with screenshots, architecture decisions, and outcomes. The detail pages make the site a portfolio, not a gallery.
 They are proof of delivery for your services and capabilities.
- **The gradient as signature,** not decoration. Used on exactly 3 places: hero heading text, CTA borders, section dividers. Never as backgrounds. Never as fills. This makes it memorable through scarcity. When someone sees that blue-to-orange gradient on a heading, they think "Pranay." That is brand recognition. Most people use gradients everywhere. You use it nowhere. That is the difference.

 No gradient backgrounds. No gradient overlays on cards. Just the text and the border.

## Information Architecture
- **Hero:** Name, one-line tagline, brief description of what you do, three CTAs
- **Social proof strip:** 3-4 companies with logos (Wipro, EY, MedPiper/YC)
- **Featured work:** 2-3 project cards as proof of delivery
- **Quick stats:** 10+ years, 64 repos, etc. Numbers that establish credibility without bragging
- **Footer CTA:** One more conversion point

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-30 | Initial design system | Created by /design-consultation based on full workspace audit + user requirements |
| 2026-03-30 | Dual-path hero architecture | Conversion-focused, not gallery-focused. Hiring + project paths from first screen. |
| 2026-03-30 | Case study pages over project cards | Shows depth and thinking, not just links |
| 2026-03-30 | Gradient used as text accent only | Restraint makes it memorable through scarcity |
