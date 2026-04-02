# PROMPTS LIBRARY

**Saved Prompts for Testing and Development**

---

## PROMPT 1: CROSS-BROWSER & MOBILE TEST

```
Test the website https://c94cf808.pranay-4wy.pages.dev across multiple browsers and viewport sizes.

TEST MATRIX:
| Browser | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Chrome | 1920x1080 | 768x1024 | 375x667 |
| Safari | 1920x1080 | 768x1024 | 375x667 |
| Firefox | 1920x1080 | 768x1024 | 375x667 |

CRITICAL PATHS:
1. Homepage → Scroll → Hire Me
2. Hire Me → Download resume
3. Work → Project → GitHub
4. Contact → Form fields
5. Mobile menu open/close

REPORT:
- Screenshots of issues
- Device/browser where found
- Severity (Critical/Medium/Low)
- Fix recommendations
```

---

## PROMPT 2: CONTENT CONSISTENCY AUDIT

```
Test https://c94cf808.pranay-4wy.pages.dev for content consistency.

CONTEXT: Pranay Suyash, YC S20 alum, 14 years experience (not 10+), transitioning from MedPiper co-founder to IC roles. 60-day urgent job search.

CHECK:
□ "10+ years" vs "14 years" (5 locations)
□ MedPiper timeline accuracy
□ YC S20 branding
□ $1M ARR mentioned
□ 45K+ fields extracted
□ 24 projects showcased
□ Pricing tiers ($10K/$5K/$3K)
□ "Returning to IC" narrative

REPORT:
- All inconsistencies with file/line references
- Copy suggestions
- Narrative improvements
```

---

## PROMPT 3: ACCESSIBILITY AUDIT

```
Conduct WCAG 2.1 AA accessibility audit of https://c94cf808.pranay-4wy.pages.dev

CHECK:
□ Color contrast ratios (4.5:1 minimum)
□ Missing alt text
□ Form labels
□ Heading hierarchy
□ Keyboard navigation
□ Focus indicators
□ ARIA usage

TOOLS: axe DevTools, WAVE, Lighthouse

REPORT:
- Violations (critical/serious/moderate/minor)
- WCAG criteria affected
- Specific fixes
- Overall score
```

---

## PROMPT 4: PERFORMANCE TEST

```
Test performance of https://c94cf808.pranay-4wy.pages.dev

TARGETS:
- LCP < 2.5s
- FCP < 1.8s
- CLS < 0.1
- TTI < 3.8s

PAGES:
- / (Homepage)
- /hire-me
- /work-with-me
- /work
- /contact

TOOLS: PageSpeed Insights, Lighthouse, WebPageTest

REPORT:
- Scores per page
- Optimization opportunities
- Bundle size analysis
```

---

## PROMPT 5: SEO AUDIT

```
Test SEO of https://c94cf808.pranay-4wy.pages.dev

CHECK:
□ Sitemap.xml valid
□ Robots.txt correct
□ Title tags (50-60 chars)
□ Meta descriptions (150-160 chars)
□ Single H1 per page
□ Open Graph tags
□ Twitter Cards
□ Canonical URLs

REPORT:
- SEO score per page
- Missing elements
- Recommendations
```

---

## PROMPT 6: CONVERSION OPTIMIZATION

```
Test conversion flows on https://c94cf808.pranay-4wy.pages.dev

PERSONAS:
1. Hiring Manager → Homepage → Hire Me → Contact
2. Founder → Homepage → Work With Me → Contact
3. Portfolio Reviewer → Homepage → Work → Project

CHECK:
□ CTAs clear and prominent
□ Value proposition in 5 seconds
□ Contact in < 3 clicks
□ Pricing transparent
□ Resume easy to download

REPORT:
- Friction points
- UX issues
- Quick wins
```

---

## PROMPT 7: FORM & LINK TESTING

```
Test forms and links on https://c94cf808.pranay-4wy.pages.dev

FORMS:
- Contact form validation
- Submit functionality
- Success/error messages

LINKS:
- All navigation
- All footer links
- Project GitHub links
- Resume download
- Social links

REPORT:
- Broken links
- Form issues
- Security concerns
```

---

## PROMPT 8: VISUAL DESIGN AUDIT

```
Test visual design of https://c94cf808.pranay-4wy.pages.dev

CHECK:
□ Color consistency
□ Typography scale
□ Spacing
□ Mobile responsiveness
□ Dark mode
□ Animations

REPORT:
- Inconsistencies
- Mobile issues
- Design improvements
```

---

## PROMPT 9: NARRATIVE ALIGNMENT (CONTEXT-RICH)

```
Test https://c94cf808.pranay-4wy.pages.dev for narrative alignment.

OWNER CONTEXT:
- Name: Pranay Suyash
- Experience: 14 years (2010-2024)
- Current: Co-founder exiting MedPiper (YC S20)
- Transition: CTO → Hands-on IC
- Urgency: 60-day runway
- Financial: ₹20L current, ₹70L+ target
- Family: 2.9yo child, home loan
- Location: Bengaluru, open to remote

KEY PROOF:
- YC S20
- $1M ARR
- 45K+ fields extracted
- 24 projects
- 41 GitHub stars (CodeCollector)

TARGET ROLES:
- Staff AI Engineer ($180-250K)
- Technical PM ($160-220K)
- Founding Engineer ($130-170K)

VALIDATE:
□ Years correct (14 not 10+)
□ YC S20 prominent
□ $1M ARR visible
□ "Returning to IC" clear
□ No desperation signals
□ Professional tone

REPORT:
- Inconsistencies
- Narrative gaps
- Suggested improvements
```

---

## PROMPT 10: URGENCY VS DESPERATION TONE CHECK

```
Test https://c94cf808.pranay-4wy.pages.dev for tone balance.

CONTEXT: 60-day financial runway, family responsibilities, must not appear desperate.

URGENCY SIGNALS (Appropriate):
□ "Available immediately"
□ "Open to new opportunities"
□ "Transitioning to hands-on work"

DESPERATION RED FLAGS (Avoid):
□ Financial pressure mentioned
□ "Need job urgently"
□ Salary complaints
□ Negative past employer mentions

CONFIDENCE SIGNALS:
□ "YC alum with $1M ARR"
□ "14 years across product and engineering"
□ "24 projects built"
□ "Available for the right opportunity"

REPORT:
- Tone score (Confident vs Desperate)
- Phrases to modify
- Recommended changes
```

---

## HOW TO USE THESE PROMPTS

### With AI Agents
```
/agent prompt="[PASTE PROMPT HERE]" description="Test [area]"
```

### With Claude/Cursor
Copy-paste into new chat

### For Documentation
Save as test specifications

---

**Library Version:** 1.0  
**Last Updated:** April 2, 2026
