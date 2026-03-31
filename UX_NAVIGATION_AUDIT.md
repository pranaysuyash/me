# UX/NAVIGATION AUDIT REPORT
## Portfolio Site: pranaysuyash.com

**Date:** Tuesday, March 31, 2026
**Scope:** User Experience and Navigation Review
**Auditor:** AI Audit Agent

---

## 1. EXECUTIVE SUMMARY

The portfolio site demonstrates a well-structured dual-path user journey (Hire Me vs Work With Me) with clear value propositions. Navigation is generally intuitive with some mobile UX friction points and form experience improvements needed.

**Overall Grade: A-** (Strong UX foundation, minor improvements needed)

---

## 2. NAVIGATION PATTERNS

### 2.1 Primary Navigation Structure

**File:** `src/components/layout/navbar.tsx` (lines 9-13)
```typescript
const navigation = [
  { name: "Work", href: "/work" },
  { name: "Hire Me", href: "/hire-me" },
  { name: "About", href: "/about" },
];
```

**Navigation Analysis:**

| Page | Priority | User Intent |
|------|----------|-------------|
| Work | 1 | Portfolio review, credibility building |
| Hire Me | 2 | Employment opportunity assessment |
| About | 3 | Background, biography, credentials |

**Finding:** Contact page missing from primary navigation
**Severity:** MEDIUM
**Reason:** Contact link only available through footer or CTAs

### 2.2 Navigation Visibility

**Desktop Navigation:**
- **Type:** Fixed header with scroll detection
- **Behavior:** Solid background after scrolling 10px
- **File:** `src/components/layout/navbar.tsx` (lines 20-24, 28-30)

```typescript
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 10);
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

**Animation:** `transition-all duration-300`
**Backdrop:** `backdrop-blur-md`

**Finding:** Smooth transition, appropriate threshold

### 2.3 Active State Indication

**File:** `src/components/layout/navbar.tsx` (lines 56-68)
```typescript
<Link
  key={item.name}
  href={item.href}
  className={`relative px-2 py-1 text-sm font-medium transition-colors ${
    pathname === item.href || pathname.startsWith(item.href + "/")
      ? "text-primary font-semibold"
      : "text-muted-foreground hover:text-primary"
  }`}
>
```

**Strengths:**
- Handles nested routes (e.g., /work/project-name)
- Visual distinction: primary color + font-weight
- Hover state improves discoverability

### 2.4 CTA Button Placement

**File:** `src/components/layout/navbar.tsx` (lines 69-86)
```typescript
<div className="flex items-center gap-3 ml-4 pl-4 border-l">
  <Link
    href="/work-with-me"
    className="text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
  >
    Work With Me
  </Link>
  <ThemeToggle />
  <Link href="https://github.com/pranaysuyash" ...>
    <Github className="h-5 w-5" />
  </Link>
</div>
```

**Finding:** "Work With Me" CTA prioritized in navbar (not "Hire Me")
- May reflect business priority toward project work
- Could suggest consulting over employment

---

## 3. MOBILE NAVIGATION

### 3.1 Mobile Menu Implementation

**File:** `src/components/layout/navbar.tsx` (lines 89-161)

**Mobile Menu Structure:**
1. Get Started section with two CTAs (Hire Me, Work With Me)
2. Navigation links (Work, Hire Me, About)

**Issues Found:**

1. **Missing Close Button on Desktop**
   - **Severity:** LOW
   - **Issue:** Desktop doesn't show close button for mobile menu state
   - Not a concern as mobile menu is mobile-only

2. **Mobile Menu Closes on Link Click** ✓
   - **Lines:** 121, 128, 145, 151
   - Good implementation: `onClick={() => setMobileMenuOpen(false)}`

3. **Navigation Order Confusion**
   - **Severity:** MEDIUM
   - Mobile shows: Hire Me, Work With Me (CTAs first), then Work, Hire Me, About
   - "Hire Me" appears twice on mobile
   - **Recommendation:** Consider removing "Hire Me" from navigation list since it has CTA

4. **No Contact Link in Mobile Menu**
   - **Severity:** MEDIUM
   - Same issue as desktop navigation

### 3.2 Mobile UX Friction

**Hamburger Menu Icon:**
- Uses Lucide Menu icon, standard pattern
- No custom styling (good for familiarity)

**Menu Animation:**
- **Missing:** No slide-in animation, appears instantly
- **Recommendation:** Add slide-in from right animation

**Backdrop:**
- Uses `fixed inset-0` with `bg-background/95 backdrop-blur-md`
- Good visual separation from content

---

## 4. INFORMATION ARCHITECTURE

### 4.1 Site Map

```
Homepage (/)
├── Work (/work)
│   └── [Project Detail] (/work/:slug)
├── Hire Me (/hire-me)
├── Work With Me (/work-with-me)
├── About (/about)
└── Contact (/contact)
    └── [Contact API] (/api/contact)
```

**Analysis:**
- Flat architecture, minimal depth (2 levels max)
- Clear separation by user intent
- Project detail pages under `/work/slug` - logical

### 4.2 User Journey Mapping

**Path 1: Hiring Manager**
```
Home > Hire Me > (Download Resume | Book Call) > Contact
```

**Path 2: Potential Client**
```
Home > Work With Me > (Services | Process) > Contact
```

**Path 3: Portfolio Reviewer**
```
Home > Work > [Project Detail] > Hire Me | Work With Me
```

**Finding:** "Choose your path" section (lines 112-162) explicitly guides users:
```tsx
<h2 className="text-sm font-mono text-muted-foreground tracking-widest uppercase mb-10">
  Why are you here?
</h2>
```

### 4.3 Content Hierarchy

**Homepage Sections:**
1. Hero (value proposition)
2. Proof strip (credibility)
3. Choose your path (dual CTA)
4. Selected work (portfolio preview)
5. Closing CTA (reinforcement)

**Finding:** Strong narrative flow with progressive disclosure

---

## 5. USER FLOW FRICTION POINTS

### 5.1 Homepage Hero Section

**File:** `src/app/page.tsx` (lines 28-83)

**Positive Elements:**
- Clear value proposition: "applied AI systems and fast prototypes"
- Dual CTA structure: "Hire me" vs "Work with me"
- Supporting credibility: "10+ years", "MedPiper (YC S20)"

**Frictions:**

1. **HeroSystemPanel Hidden on Mobile**
   - **Line:** 78-80
   - Mobile users miss animated demo
   - **Recommendation:** Create simplified mobile version or show always

2. **Third CTA ("Browse selected work")**
   - **Lines:** 69-74
   - Minor visual hierarchy issue - three CTAs in row
   - "Browse selected work" link has different styling

### 5.2 "Choose Your Path" Cards

**File:** `src/app/page.tsx` (lines 119-159)

**UX Strengths:**
- Different border treatments (border-2 vs border)
- Different hover colors (primary vs accent)
- Clear separation of intent

**Observation:** Cards are fully clickable (good), but hover states are subtle

### 5.3 Selected Work Section

**File:** `src/app/page.tsx` (lines 164-228)

**Positive:**
- Featured projects first (4 items)
- Category badges with color coding
- Tech stack preview (4 items)

**Friction:**
```tsx
<p className="text-xs text-primary/80 mt-2 mb-4 leading-relaxed">
  ↳ {project.result.split(".")[0]}.
</p>
```
- Result text truncated to first sentence
- May lose important information

### 5.4 Project Detail Page

**File:** `src/app/work/[slug]/page.tsx` (lines 30-141)

**Structure:**
1. Back link (navigation)
2. Category / Year / Featured badge
3. Title + Tagline
4. Tech Stack
5. External Links
6. Problem / Approach / Result
7. Bottom CTAs

**Finding:** Clear narrative structure

**Missing:**
- No previous/next project navigation
- No related projects suggestions

---

## 6. MOBILE UX ISSUES

### 6.1 Responsive Breakpoints

**Common Breakpoints Used:**
- `sm:` (640px) - Small tablets
- `md:` (768px) - Tablets
- `lg:` (1024px) - Laptops
- `lg:grid-cols-2` - Two-column layout at laptop

### 6.2 Mobile-Specific Issues

**Hero Section:**
```tsx
<section className="py-16 md:py-24 lg:py-32 min-h-[1200px]">
```
- **Issue:** Fixed min-height causes excessive whitespace on mobile
- **Impact:** Users must scroll significantly to see content

**Proof Strip:**
```tsx
<span className="text-border hidden sm:inline">·</span>
```
- **Finding:** Good - separators hidden on mobile

**Project Cards:**
- Grid correctly switches: `grid-cols-1 md:grid-cols-2`
- Proper touch targets maintained

### 6.3 Touch Target Sizes

**Button Sizing:**
- Standard: `h-10 px-4 py-2`
- Large: `h-12 px-8`

**Finding:** All touch targets appear to meet 44px minimum (WCAG 2.5.5)

### 6.4 Mobile Form Experience

**File:** `src/app/contact/page.tsx` (lines 135-193)

**Grid Layout:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
```

**Finding:** Form fields stack on mobile (<640px), side-by-side on larger screens

**Issue: Native Select Element**
```tsx
<select
  id="budget"
  name="budget"
  value={formData.budget}
  onChange={handleChange}
  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
>
```
- Uses native `<select>` on mobile
- Good - triggers native mobile picker

---

## 7. FORM UX PROBLEMS

### 7.1 Contact Form Structure

**File:** `src/app/contact/page.tsx` (lines 126-236)

**Tabs:**
```tsx
const [activeTab, setActiveTab] = useState<"call" | "project">("call");
```

**Problems:**

1. **Tab State Not Reflected in URL**
   - **Severity:** MEDIUM
   - Users can't share/bookmark specific tab state
   - Back button doesn't respect tab selection
   - **Recommendation:** Use query params or hash

2. **No Tab Indicator Animation**
   - Current implementation uses conditional classes
   - Could benefit from sliding indicator

3. **Calendar Tab Issues**
   ```tsx
   <iframe
     src={bookingUrl}
     title="Book a 15-minute call"
     className="w-full min-h-[700px]"
     loading="lazy"
   />
   ```
   - Fixed height may cause scroll issues on mobile
   - No fallback if calendar fails to load

4. **Form Submit States**
   ```tsx
   <Button type="submit" disabled={status === "loading"} className="w-full rounded-full" size="lg">
     {status === "loading" ? "Sending..." : "Send Project Inquiry"}
     <Send className="ml-2 h-4 w-4" />
   </Button>
   ```
   - Icon continues to show during loading state
   - **Recommendation:** Hide icon or show spinner

### 7.2 Form Validation

**Positive:**
- Client-side validation with `required` attributes
- Honeypot field for spam protection

**Missing:**
- Real-time validation feedback
- Field-level error messages
- Password strength (not needed for this form)

### 7.3 Form Success/Error States

**File:** `src/app/contact/page.tsx` (lines 228-235)

```tsx
{status === "success" && (
  <p className="text-sm text-green-600 dark:text-green-400 text-center">
    Thank you! Your message has been sent. I&apos;ll respond within 24 hours.
  </p>
)}
{status === "error" && (
  <p className="text-sm text-destructive text-center">{errorMessage}</p>
)}
```

**Issues:**
1. Messages appear below submit button
2. May be below fold on some screens
3. No visual distinction (just text color)
4. No icon or animation

**Recommendation:**
- Add success icon (CheckCircle)
- Position above form or use toast notification
- Add auto-clear after delay

---

## 8. PAGE HIERARCHY

### 8.1 Hire Me Page Structure

**File:** `src/app/hire-me/page.tsx` (lines 50-328)

**Sections:**
1. Hero (value prop + CTAs)
2. Role Fit (job types + description)
3. Experience Timeline
4. Skills narrative + Education/Certs
5. Selected work (4 cards)
6. Closing CTA

**Observation:** Information-heavy page, good for detailed review

### 8.2 Work With Me Page Structure

**File:** `src/app/work-with-me/page.tsx` (lines 134-388)

**Sections:**
1. Hero
2. Workflow compression (Before/After)
3. Engagement types (3 cards)
4. Delivery process (4 steps)
5. Deliverables
6. FAQ
7. Closing CTA

**Finding:** Excellent structure for convincing potential clients
FAQ section addresses objections effectively

### 8.3 About Page Structure

**File:** `src/app/about/page.tsx` (lines 30-239)

**Sections:**
1. Bio + CTAs + Social links
2. Timeline (Experience)
3. Education / Certs / Awards
4. CTA

**Finding:** Good balance of personal story + credentials

---

## 9. NAVIGATION FEEDBACK MECHANISMS

### 9.1 Hover States

**Links:**
- Text links: `hover:text-primary transition-colors`
- Cards: `hover-lift` with shadow and translate

**Finding:** Clear visual feedback on interactive elements

### 9.2 Loading States

**Contact Form:**
- Button disabled + text change to "Sending..."
- Good basic implementation

**Missing:**
- No page transition loading states
- No skeleton screens for dynamic content

### 9.3 Error States

**404 Page:**
- Uses Next.js built-in `notFound()` (line 23 in work/[slug])

**Form Errors:**
- Basic text-based error display

---

## 10. RECOMMENDATIONS

### HIGH PRIORITY

1. **Add Contact to Navigation**
   - Include `/contact` in navbar and mobile menu
   - **File:** `navbar.tsx`, line 9-13

2. **Fix Mobile Hero Height**
   - Remove or make responsive: `min-h-[1200px]`
   - **File:** `page.tsx`, line 29

3. **Fix Form Tab Persistence**
   - Add URL state for contact form tabs
   - enable sharing/bookmarking

### MEDIUM PRIORITY

4. **Add Project Navigation**
   - Previous/next links on project detail pages
   - "Related Projects" suggestions

5. **Improve Form Feedback**
   - Add success icon and better positioning
   - Consider toast notifications

6. **Mobile Hero System Panel**
   - Create mobile-optimized version
   - Don't hide entirely on mobile

### LOW PRIORITY

7. **Add Loading Skeletons**
   - For project listings
   - Improves perceived performance

8. **Tab Indicator Animation**
   - Sliding indicator for contact page tabs

9. **Remove Duplicate "Hire Me"**
   - From mobile menu navigation list
   - Keep in CTAs only

---

## 11. USER JOURNEY RECOMMENDATIONS

### Journey A: Quick Portfolio Review
**Current:** Home > Work > Browse
**Optimized:** Add project filtering to Work page (exists ✓)

### Journey B: Serious Hiring Manager
**Current:** Home > Hire Me > Resume > Contact
**Optimized:** Add downloadable resume CTA more prominent

### Journey C: Potential Client
**Current:** Home > Work With Me > Services > Contact
**Optimized:** Add case study links service descriptions

---

## 12. SUMMARY MATRIX

| Category | Score | Notes |
|----------|-------|-------|
| Navigation Structure | A | Clear, dual-path approach |
| Mobile Navigation | B+ | Works well, minor polish needed |
| Information Architecture | A | Flat, logical structure |
| Mobile UX | B | Good breakpoints, some height issues |
| Form UX | B | Functional, needs polish |
| User Flow | A- | Clear journeys, minor friction |
| Feedback | B+ | Hover states good, loading minimal |

---

## APPENDIX: User Testing Checklist

For manual verification:

- [ ] Navigate entire site on mobile (iPhone SE size)
- [ ] Navigate entire site on tablet
- [ ] Test contact form submission
- [ ] Test calendar booking flow
- [ ] Test project detail navigation
- [ ] Verify all CTAs lead to expected destinations
- [ ] Test back button behavior
- [ ] Verify no dead links
- [ ] Test in both light and dark mode
