# COMPREHENSIVE TEST PROMPTS - pranaysuyash.com

**Live URL:** https://c94cf808.pranay-4wy.pages.dev  
**Test Date:** April 1, 2026  
**Scope:** Full site validation across all dimensions

---

## PROMPT 1: CROSS-BROWSER COMPATIBILITY TEST

```
Test the website https://c94cf808.pranay-4wy.pages.dev across multiple browsers and viewport sizes.

TEST MATRIX:
| Browser | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Chrome | 1920x1080 | 768x1024 | 375x667 |
| Safari | 1920x1080 | 768x1024 | 375x667 |
| Firefox | 1920x1080 | 768x1024 | 375x667 |

VALIDATION CHECKLIST:
□ Layout doesn't break at any viewport
□ All text remains readable
□ CTAs remain clickable
□ Navigation works properly
□ No horizontal scrolling on mobile
□ Images load correctly
□ Animations play smoothly
□ Dark/light mode toggle works
□ Fonts render correctly

CRITICAL PATHS TO TEST:
1. Homepage → Hire Me → Contact
2. Homepage → Work With Me → Contact
3. Work → Any project → Back to Work
4. About → Download resume
5. Mobile menu open/close

REPORT:
- Screenshot of any issues found
- Browser/version where issue occurs
- Severity (Critical/Medium/Low)
- Recommended fix
```

---

## PROMPT 2: MOBILE RESPONSIVENESS & TOUCH TEST

```
Test the website https://c94cf808.pranay-4wy.pages.dev specifically on mobile devices (real or emulated).

DEVICES TO TEST:
- iPhone 14 Pro (393x852)
- iPhone SE (375x667)
- Samsung Galaxy S21 (384x854)
- iPad Pro (1024x1366)

TOUCH INTERACTION TESTS:
□ Tap targets are at least 44x44px
□ Buttons respond to touch immediately
□ No "hover" dependent features
□ Swipe gestures work if applicable
□ Pinch zoom allowed where appropriate
□ No accidental taps (elements too close)

MOBILE-SPECIFIC CHECKS:
□ Hero section not excessively tall (min-h issue)
□ Text doesn't require zooming to read
□ Forms are usable with on-screen keyboard
□ Navigation menu works smoothly
□ Footer is accessible without excessive scrolling
□ No horizontal scroll
□ Viewport meta tag correct

PERFORMANCE ON MOBILE:
□ Page loads under 3 seconds
□ Images optimized
□ No render-blocking resources
□ First Contentful Paint < 1.8s
□ Time to Interactive < 3.8s

REPORT:
- List of touch/UX issues
- Performance metrics
- Recommendations for mobile improvements
```

---

## PROMPT 3: ACCESSIBILITY (WCAG 2.1 AA) AUDIT

```
Conduct a comprehensive accessibility audit of https://c94cf808.pranay-4wy.pages.dev against WCAG 2.1 AA standards.

AUTOMATED TESTS (use axe, WAVE, Lighthouse):
□ Color contrast ratio (minimum 4.5:1 for text)
□ Missing alt text on images
□ Empty links or buttons
□ Missing form labels
□ Invalid ARIA usage
□ Heading hierarchy (no skipped levels)
□ Keyboard navigation traps
□ Focus indicators visible

MANUAL TESTS:
□ Navigate entire site using only Tab key
□ Test with screen reader (NVDA/VoiceOver)
□ Check skip navigation link exists
□ Verify form error messages announced
□ Test reduced motion preferences respected
□ Verify alt text quality (not just "image")
□ Check color isn't only way to convey info
□ Landmarks properly used (nav, main, footer)

SPECIFIC ELEMENTS TO CHECK:
- Navigation menu
- Contact form fields
- Project cards
- CTAs and buttons
- Mobile menu toggle
- Theme toggle

TOOLS TO USE:
- axe DevTools
- WAVE browser extension
- Lighthouse accessibility audit
- Screen reader testing

REPORT:
- Violations found (critical/serious/moderate/minor)
- WCAG success criteria affected
- Specific remediation steps
- Overall accessibility score
```

---

## PROMPT 4: PERFORMANCE & CORE WEB VITALS TEST

```
Test the performance of https://c94cf808.pranay-4wy.pages.dev focusing on Core Web Vitals.

PAGES TO TEST:
- Homepage (/)
- Hire Me (/hire-me)
- Work With Me (/work-with-me)
- Work (/work)
- Project Detail (/work/metaextract)
- Contact (/contact)

CORE WEB VITALS TARGETS:
□ LCP (Largest Contentful Paint) < 2.5s
□ FID (First Input Delay) < 100ms
□ CLS (Cumulative Layout Shift) < 0.1
□ FCP (First Contentful Paint) < 1.8s
□ TTFB (Time to First Byte) < 600ms
□ TTI (Time to Interactive) < 3.8s

TESTING TOOLS:
- Google PageSpeed Insights
- Lighthouse (mobile & desktop)
- WebPageTest
- GTmetrix
- Chrome DevTools Performance tab

PERFORMANCE CHECKS:
□ Images optimized (WebP/AVIF)
□ Fonts loading efficiently (swap)
□ JavaScript bundles not excessive
□ No render-blocking resources
□ Proper caching headers
□ Gzip/Brotli compression enabled
□ Lazy loading for below-fold images
□ Preconnect to required origins

MOBILE PERFORMANCE:
□ Test on 3G/4G throttling
□ Check data usage
□ Battery impact assessment

REPORT:
- Performance scores for each page
- Specific opportunities identified
- Bundle size analysis
- Resource loading waterfall
- Prioritized optimization recommendations
```

---

## PROMPT 5: SEO VALIDATION & RANKING FACTORS

```
Conduct a comprehensive SEO audit of https://c94cf808.pranay-4wy.pages.dev.

TECHNICAL SEO:
□ Sitemap.xml accessible and valid
□ Robots.txt configured correctly
□ Canonical URLs present
□ HTTPS enforced
□ No broken links (404s)
□ No redirect chains
□ Proper status codes (200, 301, 404)
□ hreflang tags if applicable
□ Pagination handled correctly

ON-PAGE SEO (per page):
□ Unique title tag (50-60 chars)
□ Meta description (150-160 chars)
□ Single H1 per page
□ Proper heading hierarchy
□ Image alt attributes
□ Internal linking structure
□ Schema.org structured data
□ Open Graph tags
□ Twitter Card tags
□ Keywords in first 100 words

CONTENT ANALYSIS:
□ Content uniqueness
□ Keyword density appropriate
□ Freshness of content
□ Reading level appropriate
□ Broken grammar/spelling

INDEXABILITY:
□ robots meta tags correct
□ Noindex where appropriate
□ No canonical loops
□ XML sitemap submitted (check)

MOBILE SEO:
□ Mobile-friendly test passes
□ Same content on mobile/desktop
□ Structured data on mobile
□ AMP not required but checked

LOCAL SEO:
□ NAP consistency (if applicable)
□ Local business schema
□ Google Business Profile linked

TOOLS:
- Google Search Console
- Screaming Frog
- Ahrefs/SEMrush (if available)
- MozBar
- Rich Results Test

REPORT:
- SEO score per page
- Critical issues blocking indexing
- Content optimization opportunities
- Competitive keyword analysis
- Recommended meta tag improvements
```

---

## PROMPT 6: UX & NAVIGATION FLOW TEST

```
Test user experience and navigation flows on https://c94cf808.pranay-4wy.pages.dev.

USER PERSONA TESTS:

Persona 1: Hiring Manager
Task: Evaluate candidate for AI Engineer role
Path: Homepage → Hire Me → Review experience → Contact
Time goal: < 3 minutes to decision

Persona 2: Startup Founder
Task: Find consultant for document AI project
Path: Homepage → Work With Me → Services → Contact
Time goal: < 5 minutes to understand offerings

Persona 3: Portfolio Reviewer
Task: Assess technical capabilities
Path: Homepage → Work → Project detail → GitHub
Time goal: < 2 minutes per project

UX HEURISTICS CHECK:
□ Visibility of system status (loading states)
□ Match between system and real world
□ User control and freedom (back button works)
□ Consistency and standards
□ Error prevention
□ Recognition rather than recall
□ Flexibility and efficiency of use
□ Aesthetic and minimalist design
□ Help users recognize, diagnose, recover from errors
□ Help and documentation

NAVIGATION TESTS:
□ Can reach any page in < 3 clicks
□ Breadcrumb navigation where appropriate
□ Back button works correctly
□ Footer links all functional
□ No orphaned pages
□ Clear active state indicators
□ Consistent nav across all pages

CONVERSION OPTIMIZATION:
□ CTAs visible above fold
□ Clear value proposition
□ Social proof placement
□ Form friction minimal
□ Clear next steps after actions

TEST SCENARIOS:
1. First-time visitor → What do they understand in 5 seconds?
2. Returning visitor → Can they find what they need quickly?
3. Mobile user → Complete contact form on phone
4. International user → Site works from different location

REPORT:
- User journey maps
- Pain points identified
- Conversion funnel analysis
- Recommendations for UX improvements
- A/B test suggestions
```

---

## PROMPT 7: FORM & INTERACTION FUNCTIONALITY TEST

```
Test all forms and interactive elements on https://c94cf808.pranay-4wy.pages.dev.

CONTACT FORM TESTS:
□ Form loads correctly
□ All required fields marked
□ Validation works (empty submission blocked)
□ Email format validation
□ Error messages clear and helpful
□ Success message displayed
□ Email actually sends (check inbox)
□ Honeypot field prevents spam
□ CSRF protection present
□ Rate limiting functional

FORM EDGE CASES:
□ Very long inputs (1000+ chars)
□ Special characters in name/email
□ Unicode/emojis in message
□ SQL injection attempts (security)
□ XSS attempts in message field
□ Submit form multiple times rapidly
□ Network interruption during submit

TAB COMPONENT (Contact page):
□ Tabs switch correctly
□ Content updates appropriately
□ Active state visually clear
□ URL reflects tab state (optional)
□ Back button respects tab selection

BUTTON & LINK TESTS:
□ All buttons clickable
□ All links functional
□ External links open in new tab
□ Download resume works
□ GitHub links correct
□ LinkedIn links correct
□ No broken anchor links
□ Hover states work
□ Focus states visible

MOBILE FORM TESTS:
□ Keyboard types appropriate (email, tel)
□ Form scrolls when keyboard opens
□ Submit button accessible with keyboard open
□ Auto-capitalize appropriate

SECURITY TESTS:
□ No sensitive data in URLs
□ HTTPS enforced
□ Secure cookies if used
□ No mixed content warnings

REPORT:
- Forms that fail validation
- Links that return errors
- Security vulnerabilities
- UX improvements for forms
- Cross-browser form issues
```

---

## PROMPT 8: VISUAL DESIGN & BRAND CONSISTENCY TEST

```
Test visual design consistency across https://c94cf808.pranay-4wy.pages.dev.

DESIGN SYSTEM VALIDATION:
□ Colors match brand palette
□ Typography scale consistent
□ Spacing/padding consistent
□ Border radius consistent
□ Shadow styles consistent
□ Icon usage consistent (all Lucide)

TYPOGRAPHY CHECKS:
□ Font loading (no FOUT/FOIT issues)
□ Text readable at all sizes
□ Line height appropriate
□ No text truncation issues
□ Heading hierarchy visually clear

COLOR CHECKS:
□ Dark mode colors appropriate
□ Light mode colors appropriate
□ Gradient usage consistent
□ Sufficient contrast everywhere
□ Color psychology appropriate for brand

SPACING CHECKS:
□ Section padding consistent
□ Card padding consistent
□ Grid gaps consistent
□ Responsive spacing works
□ No cramped elements

VISUAL HIERARCHY:
□ Most important elements stand out
□ CTAs visually prominent
□ Secondary actions de-emphasized
□ Information scent clear

ANIMATION CHECKS:
□ Animations smooth (60fps)
□ No janky scroll
□ Reduced motion respected
□ Animation duration consistent
□ Loading states clear

DARK MODE TESTS:
□ Toggle works on all pages
□ Preference persists
□ No flash of wrong theme
□ All elements visible in dark mode
□ Images adjusted for dark mode if needed

RESPONSIVE DESIGN:
□ Breakpoints appropriate
□ No awkward in-between states
□ Content reflows gracefully
□ Images scale properly
□ Tables readable on mobile

REPORT:
- Design inconsistencies found
- Visual hierarchy issues
- Animation performance problems
- Brand guideline violations
- Recommendations for visual improvements
```

---

## PROMPT 9: CONTENT & COPY AUDIT

```
Audit all content and copy on https://c94cf808.pranay-4wy.pages.dev.

COPY QUALITY CHECKS:
□ No spelling errors
□ No grammar errors
□ Consistent tone of voice
□ Clear and concise messaging
□ Jargon explained or avoided
□ Value proposition clear
□ CTAs action-oriented

CONTENT ACCURACY:
□ Years of experience consistent (10+ vs 14+ years)
□ Job titles accurate
□ Company names correct
□ Dates accurate
□ Technical claims verifiable
□ Project descriptions accurate

CONSISTENCY CHECKS:
□ "Hire Me" vs "Work With Me" clear distinction
□ Pricing consistent across pages
□ Timeline estimates consistent
□ Contact information consistent
□ Social links consistent

PROOF POINTS:
□ YC S20 badge displayed
□ $1M ARR mentioned where appropriate
□ 45K+ fields extracted quantified
□ 24 projects showcased
□ 14 years experience cited

SEO COPY CHECKS:
□ Title tags optimized
□ Meta descriptions compelling
□ H1s unique per page
□ Keywords naturally integrated
□ Internal linking present

CONVERSION COPY:
□ Headlines compelling
□ Benefit-focused language
□ Objections addressed
□ Social proof prominent
□ Urgency/scarcity where appropriate

READABILITY:
□ Flesch Reading Ease score
□ Sentence length appropriate
□ Paragraph length scannable
□ Bullet points used effectively

REPORT:
- Typos/grammar errors found
- Inconsistencies identified
- Copy improvement suggestions
- A/B test ideas for headlines
- Content gaps noted
```

---

## PROMPT 10: SECURITY & PRIVACY AUDIT

```
Conduct security and privacy audit of https://c94cf808.pranay-4wy.pages.dev.

SECURITY HEADERS:
□ X-Frame-Options (clickjacking protection)
□ X-Content-Type-Options
□ X-XSS-Protection
□ Referrer-Policy
□ Content-Security-Policy
□ Strict-Transport-Security (HSTS)
□ Permissions-Policy

SSL/TLS CHECKS:
□ HTTPS enforced
□ Valid SSL certificate
□ TLS 1.2+ required
□ No mixed content
□ Secure cookies
□ HSTS preload ready

FORM SECURITY:
□ CSRF tokens present
□ Input sanitization
□ SQL injection protection
□ XSS protection
□ Rate limiting
□ File upload restrictions (if applicable)

PRIVACY COMPLIANCE:
□ Privacy policy present
□ Cookie consent if using cookies
□ GDPR compliance (if EU traffic)
□ Data retention disclosure
□ Contact info protection

THIRD-PARTY CHECKS:
□ External scripts secure
□ CDN resources integrity hashes
□ Analytics privacy-compliant
□ Social widgets don't leak data

REPORT:
- Security headers missing
- Vulnerabilities found
- Privacy compliance gaps
- Recommended security hardening
- SSL configuration issues
```

---

## PROMPT 11: BROKEN LINKS & RESOURCE VALIDATION

```
Test all links and resources on https://c94cf808.pranay-4wy.pages.dev.

INTERNAL LINKS:
□ All navigation links
□ All footer links
□ All CTA buttons
□ All project card links
□ All "Back" links
□ All pagination links
□ Download resume link

EXTERNAL LINKS:
□ GitHub profile
□ LinkedIn profile
□ Twitter/X profile
□ Medium blog
□ All project GitHub repos
□ All project live demos
□ Social sharing links

RESOURCE VALIDATION:
□ All images load
□ All fonts load
□ CSS files load
□ JavaScript files load
□ Favicon loads
□ No 404s for resources

SPECIFIC LINKS TO VERIFY:
- https://github.com/pranaysuyash/metaextract
- https://github.com/pranaysuyash
- https://linkedin.com/in/pranaysuyash
- https://x.com/pranaysuyash
- https://signkit.work (if linked)

TOOLS:
- W3C Link Checker
- Broken Link Checker
- Screaming Frog
- Manual verification

REPORT:
- List of broken links (404s)
- Redirect chains found
- Slow-loading resources
- Missing alt text on images
- External links opening wrong
```

---

## PROMPT 12: COMPETITIVE COMPARISON TEST

```
Compare https://c94cf808.pranay-4wy.pages.dev with 3-5 competitor portfolios in similar space.

COMPETITORS TO ANALYZE:
1. Other YC alum portfolio sites
2. Applied AI engineer portfolios
3. Technical founder portfolios
4. Freelance consultant sites

COMPARISON CRITERIA:

FIRST IMPRESSION (5-second test):
□ Value proposition clarity
□ Visual appeal
□ Professional credibility
□ Unique positioning

CONTENT DEPTH:
□ Number of projects showcased
□ Detail level per project
□ Case study structure
□ Technical specificity
□ Proof of results

CONVERSION ELEMENTS:
□ Clear CTAs
□ Contact ease
□ Trust signals
□ Social proof
□ Pricing transparency

TECHNICAL QUALITY:
□ Load speed
□ Mobile experience
□ Accessibility
□ SEO optimization

DIFFERENTIATION:
□ Unique selling proposition
□ Memorable elements
□ Personal brand strength
□ Thought leadership

STRENGTHS ANALYSIS:
□ What do competitors do better?
□ Where do you have advantage?
□ Content gaps to fill?
□ Features to add?

REPORT:
- Competitive positioning map
- Your unique advantages
- Areas to improve vs competition
- Feature recommendations
- Content strategy suggestions
```

---

## AGENT DEPLOYMENT ORDER

### Phase 1: Critical Tests (Parallel)
1. Cross-browser compatibility
2. Mobile responsiveness
3. Broken links validation
4. Form functionality

### Phase 2: Quality Tests (Parallel)
5. Accessibility audit
6. Performance test
7. SEO validation

### Phase 3: UX & Content (Parallel)
8. UX/navigation flow
9. Visual design consistency
10. Content/copy audit

### Phase 4: Advanced (Sequential)
11. Security audit
12. Competitive comparison

---

## AGGREGATION REPORT STRUCTURE

After all tests complete, compile:

1. **Executive Summary**
   - Overall site health score
   - Critical issues count
   - Launch readiness verdict

2. **Issue Matrix**
   | Issue | Severity | Category | Page | Fix Complexity |

3. **Priority Actions**
   - Must fix before launch
   - Should fix in week 1
   - Nice to have

4. **Strengths Highlight**
   - What's working well
   - Competitive advantages
   - Don't change these

5. **Recommendations Roadmap**
   - Week 1 fixes
   - Month 1 enhancements
   - Quarter 1 features
