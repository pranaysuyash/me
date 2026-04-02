# FIXES REQUIRED BEFORE LAUNCH

**Live Site:** https://c94cf808.pranay-4wy.pages.dev  
**Date:** April 2, 2026  
**Status:** 🔴 P0 Issue Blocks Launch

---

## CRITICAL FIX (P0) - DO THIS NOW

### Fix: "10+ years" → "14 years"

**Impact:** HIGH - Undermines credibility, contradicts resume
**Effort:** 5 minutes
**Files to Edit:** 5 locations

#### File 1: src/app/page.tsx
```diff
// Line 14 - Meta description
- "I turn document-heavy workflows into applied AI systems and fast, usable prototypes. 10+ years across product, engineering, and regulated SaaS."
+ "I turn document-heavy workflows into applied AI systems and fast, usable prototypes. 14 years across product, engineering, and regulated SaaS."

// Line 43 - Hero subhead
- 10+ years across product, engineering, and regulated SaaS.
+ 14 years across product, engineering, and regulated SaaS.

// Line 98 - Proof strip
- <span className="font-semibold text-foreground">10+</span> years
+ <span className="font-semibold text-foreground">14</span> years
```

#### File 2: src/app/hire-me/page.tsx
```diff
// Line 22 - Description in metadata (if present)
- 10+ years
+ 14 years

// Line 70 - Subhead paragraph
- 10+ years across product, engineering, and regulated SaaS.
+ 14 years across product, engineering, and regulated SaaS.

// ALSO: Update hero text to add transition narrative
- "Best fit for applied AI, workflow systems, product/platform work..."
+ "YC S20 alum returning to hands-on technical work after 5+ years building healthcare AI from zero to $1M ARR."
```

#### File 3: src/app/layout.tsx
```diff
// Line 44 - Root metadata description
- "I turn document-heavy workflows into applied AI systems and fast, usable prototypes. 10+ years across product, engineering, and regulated SaaS."
+ "I turn document-heavy workflows into applied AI systems and fast, usable prototypes. 14 years across product, engineering, and regulated SaaS."
```

---

## HIGH PRIORITY FIXES (P1) - THIS WEEK

### Fix 2: "Why are you here?" → "How I can help"

**File:** src/app/page.tsx  
**Location:** Line ~116, section header  
**Reason:** Too transactional, undermines senior IC positioning

```diff
- <h2 className="text-sm font-mono text-muted-foreground tracking-widest uppercase mb-10">
-   Why are you here?
- </h2>
+ <h2 className="text-sm font-mono text-muted-foreground tracking-widest uppercase mb-10">
+   How I can help
+ </h2>
```

**Alternative:** Remove entirely, let "Selected work" flow directly

---

### Fix 3: CTA Touch Target Sizing

**Issue:** 15 elements fail WCAG 44x44px minimum  
**Files:** Multiple  
**Impact:** Accessibility violation, mobile UX

**Fix Pattern:**
```css
/* Add to globals.css or component styles */
.min-touch-target {
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**Elements to Fix:**
1. PS Logo in header (currently 32x32px)
2. Footer social icons (currently 16x16px)
3. Footer navigation links
4. "Browse selected work" link in hero
5. Project card footer links

---

### Fix 4: Proof Strip Enhancement

**File:** src/app/page.tsx  
**Location:** Proof strip section (~line 98)

```diff
  <span className="font-semibold text-foreground tracking-wide">
-   MedPiper (YC S20)
+   YC S20 alum
  </span>
  <span className="text-border hidden sm:inline">·</span>
  <span className="text-muted-foreground">
-   <span className="font-semibold text-foreground">14</span> years
+   <span className="font-semibold text-foreground">14 years</span> experience
  </span>
  <span className="text-border hidden sm:inline">·</span>
+ <span className="text-muted-foreground">
+   <span className="font-semibold text-foreground">$1M ARR</span> track record
+ </span>
+ <span className="text-border hidden sm:inline">·</span>
  <span className="text-muted-foreground">
    <span className="font-semibold text-foreground">45K+</span> fields
  </span>
```

---

### Fix 5: Add "Available Immediately" Signal

**File:** src/app/hire-me/page.tsx  
**Location:** Hero section

```diff
  <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
-   Best fit for applied AI, workflow systems, product/platform work...
+   YC S20 alum returning to hands-on technical work after 5+ years building 
+   healthcare AI from zero to $1M ARR. Available immediately for the right role.
  </p>
```

---

## MEDIUM PRIORITY (P2) - NICE TO HAVE

### Fix 6: Google Calendar → Calendly

**File:** src/app/contact/page.tsx  
**Issue:** Google Calendar iframe blocked by X-Frame-Options

**Options:**
A. Replace with Calendly embed
B. Replace with direct Calendly link button
C. Use Calendly popup widget

**Recommended (Option B - Simplest):**
```diff
- <iframe src={bookingUrl} ... />
+ <Button asChild variant="outline" className="rounded-full">
+   <a href="https://calendly.com/YOUR_LINK" target="_blank">
+     Book a 15-min call <ExternalLink className="ml-2 h-4 w-4" />
+   </a>
+ </Button>
```

---

### Fix 7: Add Contact to Navigation

**File:** src/components/layout/navbar.tsx  
**Location:** Navigation array (line ~9-13)

```diff
const navigation = [
  { name: "Work", href: "/work" },
  { name: "Hire Me", href: "/hire-me" },
+ { name: "Work With Me", href: "/work-with-me" },
  { name: "About", href: "/about" },
+ { name: "Contact", href: "/contact" },
];
```

---

### Fix 8: Form Success State Improvement

**File:** src/app/contact/page.tsx  
**Location:** Form submission handler (~line 228)

```diff
{status === "success" && (
- <p className="text-sm text-green-600 dark:text-green-400 text-center">
-   Thank you! Your message has been sent. I'll respond within 24 hours.
- </p>
+ <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
+   <CheckCircle className="h-5 w-5" />
+   <div>
+     <p className="font-medium">Message sent!</p>
+     <p className="text-sm">I'll respond within 24 hours.</p>
+   </div>
+ </div>
)}
```

---

## TECHNICAL DEBT FIXES

### Fix 9: Fix Duplicate CSS

**File:** src/app/globals.css  
**Lines:** 93-107

```diff
- .gradient-border { /* defined twice */
-   background: linear-gradient(135deg, #0066cc 0%, #cc6600 100%);
- }
- .gradient-border { /* second definition */
-   background: linear-gradient(135deg, #005eff 0%, #ff7e00 100%);
- }

+ .gradient-border {
+   background: linear-gradient(135deg, #005eff 0%, #ff7e00 100%);
+ }
```

---

### Fix 10: NeutralBadge Light Mode

**File:** src/components/ui/badge.tsx  
**Lines:** 41-46

```diff
export function NeutralBadge({ children }: { children: ReactNode }) {
  return (
-   <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border border-white/10 bg-white/[0.03] text-white/65">
+   <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border border-border bg-muted text-muted-foreground">
      {children}
    </span>
  );
}
```

---

## POST-LAUNCH ENHANCEMENTS (NOT BLOCKING)

### Enhancement 1: Add Testimonials Section

**Location:** Homepage or /hire-me page  
**Content Needed:** 2-3 testimonials from:
- Past colleagues at MedPiper
- EY clients
- YC batchmates
- Consulting clients

**Format:**
```tsx
<section className="py-16 bg-muted/30">
  <div className="container max-w-[1280px] mx-auto px-4">
    <h2 className="text-2xl font-bold mb-8">What people say</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Testimonial cards */}
    </div>
  </div>
</section>
```

---

### Enhancement 2: Interactive Demo

**New Page:** /demo/extract  
**Purpose:** Live document extraction demo  
**Approach:** Mock demo (fastest) → Real backend (later)

**Components Needed:**
1. Document upload area
2. Processing animation
3. Results display
4. CTA to contact

---

### Enhancement 3: ROI Calculator

**New Page:** /calculator  
**Purpose:** Show potential savings from automation

**Inputs:**
- Documents per month
- Current processing time
- Hourly cost

**Output:**
- Current monthly cost
- With automation cost
- Monthly savings
- Annual savings

---

### Enhancement 4: Medium Blog Integration

**Location:** Homepage or /blog page  
**Approach:** RSS feed embed or manual curation

**Implementation:**
```tsx
// Fetch from Medium RSS
const mediumPosts = await fetch(
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@pranaysuyash'
);
```

---

## PRIORITY MATRIX

| Priority | Fix | Effort | Impact |
|----------|-----|--------|--------|
| **P0** | "10+ years" → "14 years" | 5 min | **CRITICAL** |
| **P1** | "Why are you here?" change | 2 min | High |
| **P1** | CTA touch targets | 1 hour | Medium |
| **P1** | Proof strip enhancement | 5 min | Medium |
| **P1** | "Available immediately" | 2 min | High |
| **P2** | Google Calendar fix | 30 min | Medium |
| **P2** | Add Contact to nav | 5 min | Low |
| **P2** | Form success state | 10 min | Low |
| **P3** | Duplicate CSS | 2 min | Low |
| **P3** | NeutralBadge fix | 5 min | Low |

---

## DEPLOYMENT CHECKLIST

### Pre-Deploy (Do Now)
- [ ] Fix "10+ years" → "14 years" in all 5 locations
- [ ] Run `npm run build` (verify passes)
- [ ] Test locally
- [ ] Commit changes

### Deploy
- [ ] Push to main branch
- [ ] Verify Vercel deploys successfully
- [ ] Check live site loads

### Post-Deploy Verification
- [ ] Verify "14 years" on homepage hero
- [ ] Verify "14 years" on homepage proof strip
- [ ] Verify "14 years" in Hire Me page
- [ ] Verify meta description updated
- [ ] Test contact form
- [ ] Test all navigation links
- [ ] Test mobile view

### This Week
- [ ] Fix remaining P1 issues
- [ ] Fix P2 issues if time permits
- [ ] Announce launch

---

## COPY PASTE READY

### Git Commit Message
```
fix: correct years of experience (14 years), improve narrative

- Fix "10+ years" → "14 years" across all pages
- Add "returning to IC work" narrative on hire-me
- Update proof strip to lead with YC S20
- Add "available immediately" signal

Fixes critical credibility issue blocking launch.
```

---

**END OF FIXES DOCUMENT**

**Action Required:** Fix P0 issue NOW (5 minutes), then deploy.
