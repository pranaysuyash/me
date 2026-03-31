# VISUAL DESIGN AUDIT REPORT
## Portfolio Site: pranaysuyash.com

**Date:** Tuesday, March 31, 2026
**Scope:** Visual Design System Review
**Auditor:** AI Audit Agent

---

## 1. EXECUTIVE SUMMARY

The portfolio site demonstrates a modern, clean visual design with some inconsistencies that should be addressed for optimal professional presentation. The design leverages a dark-mode-first aesthetic with consistent spacing patterns, but has typography and gradient inconsistencies that need refinement.

**Overall Grade: B+** (Good foundation, needs refinement)

---

## 2. TYPOGRAPHY SYSTEM

### 2.1 Font Stack Configuration

**File:** `tailwind.config.ts` (lines 52-56)
```typescript
fontFamily: {
  sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
  display: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
  mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
},
```

**Issue: DUPLICATE FONT ASSIGNMENT**
- **Location:** `tailwind.config.ts:53-54`
- **Severity:** LOW
- **Problem:** Both `sans` and `display` use the same Plus Jakarta Sans font, making the `display` utility redundant
- **Recommendation:** Either differentiate display typography or consolidate

### 2.2 Typography Scale Issues

**Inconsistent Heading Sizes Across Pages:**

| Page | Hero H1 | Section H2 | Size Pattern |
|------|---------|------------|--------------|
| Home | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` | `text-2xl md:text-3xl` | Consistent |
| About | `text-4xl md:text-5xl` | `text-2xl` | Consistent |
| Hire Me | `text-4xl md:text-5xl` | `text-2xl` | Consistent |
| Work With Me | `text-4xl md:text-5xl` | `text-2xl md:text-3xl` | Inconsistent |
| Contact | `text-4xl md:text-5xl` | `text-xl` | Hero only |

**Issues Found:**

1. **Inconsistent Section Headings**
   - **File:** `/src/app/work-with-me/page.tsx:177`
   - **Pattern:** Uses `text-2xl md:text-3xl` for section headings
   - **File:** `/src/app/hire-me/page.tsx:99`
   - **Pattern:** Uses `text-2xl` only (no responsive scaling)
   - **Recommendation:** Standardize to `text-2xl md:text-3xl font-bold tracking-tight` for all section H2s

### 2.3 Monospace Font Usage

**Inconsistent Application:**
- Used for labels (`text-xs font-mono tracking-widest uppercase`)
- Used for tech stack badges
- Should be used consistently for code snippets, dates, or technical data only

---

## 3. COLOR USAGE & PALETTE

### 3.1 CSS Variable Definitions

**File:** `src/app/globals.css` (lines 5-48)

**Light Mode:**
- `--primary: 217 100% 50%` (Bright blue #0066ff)
- `--accent: 25 100% 39%` (Orange-brown #a64a00)

**Dark Mode:**
- `--primary: 217 100% 62%` (Lighter blue #3d8aff)
- `--accent: 27 90% 56%` (Orange #f5a623)

### 3.2 Color Inconsistency Issues

**Critical Issue: Gradient Badge Color Mismatch**

**File:** `src/components/ui/badge.tsx` (lines 25-39)
```tsx
export function GradientBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium"
      style={{
        background:
          "linear-gradient(#0d1422,#0d1422) padding-box, linear-gradient(90deg,rgba(59,130,246,0.6),rgba(139,92,246,0.6),rgba(245,158,11,0.5)) border-box",
        color: "rgba(255,255,255,0.85)",
        border: "1px solid transparent",
      }}
    >
```

- **Severity:** MEDIUM
- **Issue:** Hardcoded hex colors don't match the CSS variable palette
- **Expected:** Should use HSL variables for consistency
- **Colors used:** 
  - Blue: rgba(59,130,246,0.6) - Tailwind blue-500
  - Purple: rgba(139,92,246,0.6) - Tailwind violet-500
  - Orange: rgba(245,158,11,0.5) - Tailwind amber-500

**File:** `src/app/globals.css` (lines 75-98)
```css
.gradient-text {
  background: linear-gradient(135deg, #0066cc 0%, #cc6600 100%);
}

.gradient-border {
  background: linear-gradient(135deg, #005eff 0%, #ff7e00 100%);
}
```

- **Severity:** MEDIUM
- **Issue:** Gradient colors don't match the defined primary/accent variables
- **Expected:** Should use HSL(var(--primary)) and HSL(var(--accent))

### 3.3 Background Color Issues

**File:** `src/components/ui/badge.tsx` (lines 41-46)
```tsx
export function NeutralBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border border-white/10 bg-white/[0.03] text-white/65">
```

- **Severity:** HIGH
- **Issue:** Hardcoded white values with opacity don't adapt to dark/light mode
- **Impact:** In light mode, this will render poorly
- **Recommendation:** Replace with theme-aware colors

---

## 4. SPACING & VISUAL RHYTHM

### 4.1 Container Configuration

**File:** `tailwind.config.ts` (lines 11-15)
```typescript
container: {
  center: true,
  padding: { DEFAULT: "1rem", md: "1.5rem", lg: "2rem" },
  screens: { "2xl": "1280px" },
},
```

**Issue:** Container width only defined for `2xl` breakpoint, missing smaller breakpoints

### 4.2 Padding Inconsistencies

**Page Section Padding Comparison:**

| Page | Section | Vertical Padding |
|------|---------|-------------------|
| Home | Hero | `py-16 md:py-24 lg:py-32` |
| Home | Proof strip | `py-10` |
| Home | Choose path | `py-20 md:py-28` |
| Home | Selected work | `py-20 md:py-28` |
| Home | Closing CTA | `py-20 md:py-28` |
| About | Main | `py-20 md:py-28` |
| About | Timeline | `py-16` |
| About | Education | `py-16` |
| About | CTA | `py-16` |

**Finding:** Generally consistent pattern of `py-20 md:py-28` for major sections, `py-16` for secondary sections

### 4.3 Border Radius Configuration

**File:** `tailwind.config.ts` (lines 57-61)
```typescript
borderRadius: {
  lg: "var(--radius)",
  md: "calc(var(--radius) - 2px)",
  sm: "calc(var(--radius) - 4px)",
},
```

**CSS Variable:**
**File:** `src/app/globals.css` (line 25)
```css
--radius: 0.75rem;
```

**Finding:** Consistent border-radius system using CSS variables

### 4.4 Card Padding Inconsistency

**File:** `src/components/ui/card.tsx` (line 63)
```tsx
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
```

- **Severity:** LOW
- **Issue:** CardContent has asymmetric padding (p-6 pt-0)
- **Impact:** May cause alignment issues with CardHeader

---

## 5. RESPONSIVE DESIGN ISSUES

### 5.1 Navigation Responsive Behavior

**File:** `src/components/layout/navbar.tsx`

**Issue: Mobile Menu Missing Contact Link**
- **Severity:** MEDIUM
- **Location:** Lines 9-13
```typescript
const navigation = [
  { name: "Work", href: "/work" },
  { name: "Hire Me", href: "/hire-me" },
  { name: "About", href: "/about" },
];
```
- **Missing:** Contact page link in primary navigation
- **Impact:** Contact page only accessible via footer or CTAs

### 5.2 Hero Section Responsive Issues

**File:** `src/app/page.tsx` (line 29)
```tsx
<section className="py-16 md:py-24 lg:py-32 min-h-[1200px]">
```

- **Severity:** HIGH
- **Issue:** Fixed `min-h-[1200px]` causes excessive whitespace on mobile
- **Recommendation:** Use dynamic min-height or remove constraint

**File:** `src/app/page.tsx` (lines 78-80)
```tsx
<div className="hidden lg:flex lg:justify-end">
  <HeroSystemPanel />
</div>
```

- **Issue:** HeroSystemPanel hidden on mobile/tablet (< 1024px)
- **Impact:** Mobile users miss key visual element
- **Recommendation:** Create mobile-friendly version

### 5.3 Grid Layout Issues

**File:** `src/app/hire-me/page.tsx` (lines 234-236)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
```

**File:** `src/app/page.tsx` (lines 56-58, CTA buttons)
```tsx
<div className="flex flex-wrap items-center gap-4">
```

**Finding:** Generally uses responsive grid patterns, but some layouts could benefit from `sm:` breakpoint

---

## 6. VISUAL HIERARCHY

### 6.1 Hero Section Hierarchy

**Current Structure:**
1. Mono label (smallest - establishes context)
2. H1 with gradient highlight (largest)
3. Description paragraph (medium)
4. CTAs (buttons)

**Assessment:** Good visual hierarchy, but could benefit from:
- The "10+ years" credibility signal could be more prominent
- Project count metric could use visual treatment

### 6.2 Card Hierarchy

**File:** `src/components/ui/card.tsx` (lines 36-43)
```tsx
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
```

**Issue:** CardTitle hardcoded to H3 even when used in different contexts
- **Recommendation:** Make heading level configurable via prop

### 6.3 Button Hierarchy

**Primary Button:** `bg-primary text-primary-foreground`
**Secondary/Outline:** `border border-input bg-background`
**Ghost:** `hover:bg-muted`

**Finding:** Clear button hierarchy exists

---

## 7. ANIMATION & TRANSITION USAGE

### 7.1 CSS Animations

**File:** `src/app/globals.css` (lines 121-135)
```css
@layer utilities {
  .animate-fade-up {
    animation: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

**Tailwind Configuration:**
**File:** `tailwind.config.ts` (lines 62-70)
```typescript
keyframes: {
  "fade-up": {
    "0%": { opacity: "0", transform: "translateY(12px)" },
    "100%": { opacity: "1", transform: "translateY(0)" },
  },
},
animation: {
  "fade-up": "fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
},
```

**Issue: DUPLICATE ANIMATION DEFINITIONS**
- **Severity:** LOW
- **Location:** Same animation defined in both Tailwind config and globals.css
- **Recommendation:** Remove one to avoid redundancy

### 7.2 Framer Motion Usage

**File:** `src/components/hero-system-panel.tsx`
- Uses Framer Motion for sequential animations
- Good use of staggered delay for progressive disclosure

**File:** `src/components/layout/navbar.tsx`
```tsx
transition-all duration-300 backdrop-blur-md
```

**Finding:** Tailwind transitions used for UI state changes, Framer Motion for complex sequences

### 7.3 Hover Effects

**File:** `src/app/globals.css` (lines 109-118)
```css
.hover-lift {
  transition:
    transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(0, 94, 255, 0.12);
}
```

- **Issue:** Hardcoded blue color in shadow
- **Recommendation:** Use CSS variable for theme consistency

---

## 8. ICONOGRAPHY

### 8.1 Icon Library

**Source:** Lucide React (`lucide-react`)

**Usage Pattern:**
- All icons imported from lucide-react
- Consistent sizing (h-4 w-4, h-5 w-5, h-6 w-6)
- Used inline with text or as standalone buttons

### 8.2 Favicon

**File:** `src/app/layout.tsx` (line 68)
```tsx
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
```

**Finding:** SVG favicon with proper type declaration

### 8.3 Icon Usage Inconsistencies

**CTA Icons:**
- Most CTAs use `ArrowRight` for forward navigation
- Some use `ArrowUpRight` for external links (correct)
- Inconsistent placement (sometimes before text, sometimes after)

**Recommendation:** Standardize icon placement: `Icon + Text` or `Text + Icon`

---

## 9. COMPONENT CONSISTENCY

### 9.1 Card Usage Patterns

**Home Page Project Cards:**
```tsx
<Card className="hover-lift border shadow-sm bg-card">
  <CardContent className="p-6">
```

**Work Page Project Cards:**
```tsx
<Card className="hover-lift h-full transition-all duration-200">
  <CardContent className="p-6 flex flex-col h-full">
```

**Hire Me Page Selected Work Cards:**
```tsx
<Card className="hover-lift border shadow-sm h-full">
  <CardContent className="p-5">
```

**Finding:** Card padding inconsistent across pages (p-6 vs p-5)

### 9.2 Button Variants

**File:** `src/components/ui/button.tsx`

All button variants defined, but usage patterns vary:
- Home page: `size="lg"` with explicit px-8
- About page: Default size with explicit width classes

### 9.3 Badge Components

**Three badge variants defined:**
1. `Badge` - Standard bordered badge
2. `GradientBadge` - For AI/ML projects
3. `NeutralBadge` - For other categories

**Usage Pattern:**
```tsx
{project.category === "AI/ML" || project.category === "Computer Vision" ? (
  <GradientBadge>{project.category}</GradientBadge>
) : (
  <NeutralBadge>{project.category}</NeutralBadge>
)}
```

**File:** `src/app/page.tsx` (lines 191-196)

**Finding:** Color-coding by category provides visual distinction

---

## 10. GRADIENT USAGE ISSUES

### 10.1 Gradient Definitions

**Duplicated CSS Rule:**
**File:** `src/app/globals.css` (lines 83-97)
```css
.gradient-border {
  position: relative;
  border-radius: 9999px;
  overflow: hidden;
  padding: 1.5px;
  background: linear-gradient(135deg, #0066cc 0%, #cc6600 100%);
}

.gradient-border {
  position: relative;
  border-radius: 9999px;
  overflow: hidden;
  padding: 1.5px;
  background: linear-gradient(135deg, #005eff 0%, #ff7e00 100%);
}
```

**Severity:** MEDIUM
- **Issue:** `.gradient-border` defined twice with different colors
- **Line:** Lines 83-89 and 91-97
- **Impact:** Second definition overrides the first, potentially causing confusion

### 10.2 Gradient Line Component

**File:** `src/app/globals.css` (lines 104-107)
```css
.gradient-line {
  height: 2px;
  background: linear-gradient(90deg, #005eff 0%, #ff7e00 100%);
}
```

**Finding:** Gradient colors consistent with second .gradient-border definition

---

## 11. RECOMMENDATIONS

### HIGH PRIORITY

1. **Fix NeutralBadge Hardcoded Colors**
   - Replace `bg-white/[0.03]` and `text-white/65` with theme-aware variables
   - **File:** `src/components/ui/badge.tsx`

2. **Remove Duplicate gradient-border CSS Rule**
   - Remove lines 83-89 in `src/app/globals.css`

3. **Standardize Card Padding**
   - Use consistent `p-6` across all CardContent usages

### MEDIUM PRIORITY

4. **Update Gradient Colors to Match CSS Variables**
   - Replace hardcoded hex values with HSL variables
   - **Files:** `badge.tsx`, `globals.css`

5. **Fix Mobile Hero Height**
   - Remove or make responsive: `min-h-[1200px]`
   - **File:** `src/app/page.tsx`

6. **Add Contact to Navigation**
   - Include `/contact` link in navbar

### LOW PRIORITY

7. **Remove Duplicate Animation Definitions**
   - Consolidate into Tailwind config only

8. **Standardize Section Heading Sizes**
   - Apply consistent responsive sizing across pages

9. **Fix Heading Level in CardTitle**
   - Make configurable via prop

---

## 12. POSITIVE FINDINGS

1. **Consistent Container Usage** - `max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8` repeated consistently
2. **Proper Color Variables** - CSS variables properly defined for theming
3. **Dark Mode Support** - Complete dark mode implementation with CSS variables
4. **Animation Quality** - Smooth, subtle animations with proper easing
5. **Accessibility Considerations** - `sr-only` classes for screen readers
6. **Font Loading** - Google Fonts loaded with proper subsets and display swap

---

## 13. FILE-BY-FILE SUMMARY

| File | Issues | Severity |
|------|--------|----------|
| `globals.css` | Duplicate gradient-border, hardcoded colors | MEDIUM |
| `badge.tsx` | Hardcoded white values for dark mode | HIGH |
| `page.tsx` (home) | Excessive hero height, missing mobile panel | MEDIUM |
| `navbar.tsx` | Missing Contact link | LOW |
| `tailwind.config.ts` | Duplicate animation, font redundancy | LOW |
| `card.tsx` | Asymmetric padding | LOW |
| Component files | Inconsistent heading sizes | LOW |

---

## APPENDIX: Color Reference

### Light Mode Palette
- Background: #f8fafc (slate-50)
- Foreground: #0f172a (slate-900)
- Primary: #0066ff (blue-600)
- Accent: #a64a00 (orange-700)
- Muted: #f1f5f9 (slate-100)

### Dark Mode Palette
- Background: #080d17
- Foreground: #f8fafc (slate-50)
- Primary: #3d8aff (blue-400)
- Accent: #f5a623 (amber-500)
- Muted: #1e293b (slate-800)
