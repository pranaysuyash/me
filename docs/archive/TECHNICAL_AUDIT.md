# TECHNICAL AUDIT REPORT
## Portfolio Site: pranaysuyash.com

**Date:** Tuesday, March 31, 2026
**Scope:** Technical Implementation Review
**Auditor:** AI Audit Agent

---

## 1. EXECUTIVE SUMMARY

The portfolio site is built on Next.js 15 with Tailwind CSS and demonstrates modern development practices, but contains several technical concerns including TypeScript escape hatches, disabled build checks, and potential performance bottlenecks that should be addressed.

**Overall Grade: B** (Solid foundation, significant improvements needed)

---

## 2. PROJECT CONFIGURATION

### 2.1 Package.json Analysis

**File:** `package.json` (lines 1-48)

**Dependency Issues:**

| Dependency | Version | Issue |
|------------|---------|-------|
| `next` | 15.3.1 | Good - Latest stable |
| `react` | ^19.0.0 | Current latest |
| `react-dom` | ^19.0.0 | Matches React |
| `tailwindcss` | ^4 | Tailwind v4 in beta - potential breaking changes |
| `@tailwindcss/postcss` | ^4 | Should match Tailwind version |

**Critical Finding: Tailwind v4 in Beta**
- **Severity:** MEDIUM
- **Location:** `package.json:44`
- **Issue:** Tailwind CSS v4 is still in beta/preview mode
- **Impact:** Potential breaking changes, incomplete documentation
- **Recommendation:** Consider downgrading to v3.4.x for stability

### 2.2 Next.js Configuration

**File:** `next.config.ts` (lines 1-12)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
```

**Critical Issues:**

1. **ESLint Disabled in Builds**
   - **Severity:** HIGH
   - **Line:** 5-7
   - **Impact:** Code quality issues not caught during build
   - **Recommendation:** Remove or only ignore specific rules

2. **TypeScript Errors Ignored**
   - **Severity:** HIGH
   - **Line:** 8-10
   - **Impact:** Type safety compromised in production
   - **Recommendation:** Fix all TypeScript errors instead of ignoring

---

## 3. PERFORMANCE ISSUES

### 3.1 Image Optimization

**Finding:** No Next.js Image component usage detected in any page files

**Impact:**
- Manual img tags used instead of optimized next/image
- No automatic lazy loading
- No automatic format optimization (WebP, AVIF)
- No responsive sizing

**Recommendation:** Use `next/image` with proper sizing:
```tsx
import Image from 'next/image'

<Image src="/hero.jpg" width={800} height={600} alt="Description" />
```

### 3.2 Font Loading Strategy

**File:** `src/app/layout.tsx` (lines 6-16)
```typescript
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
```

**Good Practices Found:**
- `display: "swap"` - Prevents invisible text during loading
- CSS variables for font family reuse
- Subset loading for performance

### 3.3 Animation Performance

**File:** `src/components/hero-system-panel.tsx`

Uses Framer Motion with:
- `will-change: transform` implied by motion components
- CSS transforms for GPU acceleration
- Proper use of `transform` and `opacity` (compositor-only properties)

**Concerns:**
- Animated panel runs continuously (setInterval every 1200ms)
- May cause battery drain on mobile devices

### 3.4 JavaScript Bundle Size

**Dependencies Contributing to Bundle:**
- Framer Motion (animation library)
- Axios (HTTP client - may be redundant)
- Multiple icon libraries (only lucide-react detected)

**Recommendation:** Consider if Framer Motion is needed for simple fades

### 3.5 Critical CSS Rendering

**File:** `src/app/layout.tsx` (lines 60-94)

**Finding:** No critical CSS extraction detected
**Status:** Acceptable - Next.js handles this automatically

---

## 4. ACCESSIBILITY (WCAG) VIOLATIONS

### 4.1 Form Accessibility

**File:** `src/app/contact/page.tsx` (lines 135-193)

**Issues:**

1. **Select Element Not Using Component Library**
   - **Lines:** 179-191
   - Uses native `<select>` instead of shadcn/ui Select
   - Missing focus styles consistency

2. **Form Labels Properly Associated** ✓
   - All inputs have proper `htmlFor` attributes
   - Required fields marked with `*`

3. **Honeypot Field Hidden with aria-hidden** ✓
   ```tsx
   <div className="hidden" aria-hidden="true">
   ```

### 4.2 Interactive Elements

**File:** `src/app/contact/page.tsx` (lines 63-87)

**Tab Buttons:**
```tsx
<button
  type="button"
  onClick={() => setActiveTab("call")}
  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
    activeTab === "call"
      ? "bg-primary text-primary-foreground"
      : "bg-muted text-muted-foreground hover:text-primary"
  }`}
>
```

**Issues:**
1. Missing `aria-pressed` for toggle state
2. Missing `aria-controls` to associate with content
3. Should use `role="tab"` for proper semantics

**Recommendation:**
```tsx
<button
  role="tab"
  aria-selected={activeTab === "call"}
  aria-controls="call-panel"
  id="call-tab"
  // ... rest of props
>
```

### 4.3 Skip Navigation

**Finding:** No skip-to-content link detected
**Severity:** MEDIUM
**Recommendation:** Add before navbar:
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### 4.4 Focus Management

**File:** `src/components/layout/navbar.tsx` (lines 45-54)

**Mobile Menu Button:**
```tsx
<button
  type="button"
  className="inline-flex items-center justify-center rounded-full p-2.5 text-foreground hover:bg-muted"
  onClick={() => setMobileMenuOpen(true)}
>
  <span className="sr-only">Open main menu</span>
  <Menu className="h-6 w-6" aria-hidden="true" />
</button>
```

**Issues:**
1. No visible focus indicator (relying on default browser)
2. Missing `aria-expanded` for menu state

**File:** `src/app/contact/page.tsx` (lines 99-125)

**Iframe Calendar - Missing Title:**
```tsx
<iframe
  src={bookingUrl}
  title="Book a 15-minute call"
  className="w-full min-h-[700px]"
  loading="lazy"
/>
```

**Finding:** Good - has title attribute for screen readers

### 4.5 Color Contrast

**Needs Testing:**
- `text-muted-foreground` on various backgrounds
- Gradient text contrast (may fail on some backgrounds)

**Recommendation:** Run through axe DevTools or WAVE for full audit

### 4.6 Heading Hierarchy

**File:** `src/app/about/page.tsx` (lines 93-94)
```tsx
<h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
  About
</h1>
```

**Finding:** Single H1 per page - Good

**Potential Issue:**
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

**Issue:** CardTitle always renders H3, which may cause heading level skips

### 4.7 Screen Reader Support

**File:** `src/components/layout/navbar.tsx` (lines 34-44, 93-103)

**Logo Link:**
```tsx
<Link href="/" className="flex items-center gap-3 group">
  <div className="w-8 h-8 rounded-lg border border-border bg-muted flex items-center justify-center shrink-0 transition-opacity group-hover:opacity-80">
    <span className="text-sm font-bold tracking-tight text-foreground">
      PS
    </span>
  </div>
  <span className="hidden lg:block text-sm font-semibold text-foreground">
    Pranay
  </span>
</Link>
```

**Issue:** No aria-label for logo/home link
**Recommendation:**
```tsx
<Link href="/" aria-label="Home" className="...">
```

---

## 5. SEO PROBLEMS

### 5.1 Metadata Implementation

**File:** `src/app/layout.tsx` (lines 18-58)

**Good Practices:**
- OpenGraph configuration present
- Twitter card metadata
- Robots directives configured
- Template pattern for titles

### 5.2 Page-Specific Metadata

**File:** `src/app/page.tsx` (lines 11-21)
```typescript
export const metadata: Metadata = {
  title: "Pranay Suyash | Document AI, Workflow Automation, Fast Prototypes",
  description:
    "I turn document-heavy workflows into applied AI systems and fast, usable prototypes. 10+ years across product, engineering, and regulated SaaS.",
  openGraph: {
    title: "Pranay Suyash | Document AI, Workflow Automation, Fast Prototypes",
    description:
      "I turn document-heavy workflows into applied AI systems and fast, usable prototypes.",
    type: "website",
  },
};
```

**Missing Elements:**
1. No canonical URLs defined
2. No alternate language meta tags
3. No structured data (JSON-LD)

**Recommendation:** Add JSON-LD structured data for Person:
```tsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Pranay Suyash",
  "jobTitle": "Co-Founder",
  "url": "https://pranaysuyash.com",
  "sameAs": [
    "https://linkedin.com/in/pranaysuyash",
    "https://github.com/pranaysuyash"
  ]
}
</script>
```

### 5.3 Sitemap

**Finding:** No sitemap.xml or sitemap.ts detected
**Recommendation:** Add `src/app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next'
import projectsData from '@/content/projects.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pranaysuyash.com'
  
  const projectUrls = projectsData.projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
  }))
  
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/hire-me`, lastModified: new Date() },
    { url: `${baseUrl}/work-with-me`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/work`, lastModified: new Date() },
    ...projectUrls,
  ]
}
```

### 5.4 Robots Configuration

**Missing:** robots.ts or robots.txt
**Recommendation:** Add `src/app/robots.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://pranaysuyash.com/sitemap.xml',
  }
}
```

---

## 6. CODE QUALITY ISSUES

### 6.1 TypeScript Configuration

**File:** `tsconfig.json`

**Finding:** Standard Next.js TypeScript config
**Status:** Acceptable

### 6.2 ESLint Configuration

**File:** `.eslintrc.json` (lines 1-7)
```json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",
    "react/no-unescaped-entities": "off"
  }
}
```

**Issues:**
1. `no-explicit-any` disabled globally - reduces type safety
2. Only extends Next.js config, missing recommended rules

**Recommendation:**
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "react/no-unescaped-entities": "off"
  }
}
```

### 6.3 Component Prop Types

**File:** `src/components/layout/navbar.tsx` (line 15)
```typescript
export function Navbar() {
```

**Finding:** No props interface - acceptable for this component

### 6.4 Unused Variables

**Finding:** No ESLint errors due to disabled build checks
**Recommendation:** Enable `no-unused-vars` rule

### 6.5 Function Components

**File:** `src/components/layout/footer.tsx` (lines 25-76)
```typescript
export function Footer() {
```

No issues - clean component structure

---

## 7. DEPENDENCY CONCERNS

### 7.1 Security Audit

**Command to run:**
```bash
npm audit
```

**Notable Dependencies:**
- `axios` - Good HTTP client, but fetch API could be used instead
- `nodemailer` - Server-side email, appropriate for contact form
- `resend` - Modern email service, good choice
- `zustand` - State management installed but may be unused

### 7.2 Dependency Version Analysis

**Potential Issues:**

| Package | Version | Note |
|---------|---------|------|
| `next` | 15.3.1 | Current stable |
| `react` | ^19.0.0 | Latest, good |
| `framer-motion` | ^12.7.4 | Check for updates |
| `lucide-react` | ^0.503.0 | Active development |

### 7.3 Dev Dependencies

**Good Choices:**
- `@tailwindcss/typography` - For rich text styling
- `tailwindcss-animate` - Animation utilities

### 7.4 Missing Dependencies

**Potential Additions:**
- `@vercel/analytics` - For Vercel deployment analytics
- `@vercel/speed-insights` - Performance monitoring

---

## 8. BUILD CONFIGURATION ISSUES

### 8.1 Static Export

**Finding:** No static export configuration detected
**Current:** Dynamic server-side rendering with API routes
**Status:** Appropriate for contact form functionality

### 8.2 Optimization Settings

**Missing from next.config.ts:**
```typescript
// Not present
images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
},
```

### 8.3 Security Headers

**Recommendation:** Add security headers:
```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
  ]
}
```

---

## 9. API IMPLEMENTATION

### 9.1 Contact API

**File:** `src/app/api/contact/route.ts`

**Not reviewed in detail** - Verify:
- Rate limiting
- Input validation
- Error handling
- Logging (without PII)

### 9.2 GitHub Pinned API

**File:** `src/app/api/github-pinned/route.ts`

**Purpose:** Fetch pinned repositories
**Considerations:**
- No caching strategy found
- May hit rate limits

---

## 10. MISSING BEST PRACTICES

### 10.1 Web Vitals

**Missing:** No custom metrics or web vitals tracking
**Recommendation:** Use `useReportWebVitals` to track:
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

### 10.2 Error Handling

**Finding:** No global error boundary
**Recommendation:** Add `error.tsx` files for route segments

### 10.3 Loading States

**Finding:** No loading.tsx files for route segments
**Recommendation:** Add for better perceived performance

### 10.4 Manifest

**Missing:** manifest.ts or manifest.json
**Recommendation:** Add for PWA support and better mobile experience

### 10.5 Server Component Usage

**Finding:** Mix of Server and Client components
**Analysis:**
- Pages without "use client" are server components - Good
- Interactive elements properly marked with "use client" - Good

---

## 11. RECOMMENDATIONS BY PRIORITY

### CRITICAL

1. **Remove TypeScript Ignore Build Errors**
   - Fix all TypeScript errors instead of ignoring
   - **File:** `next.config.ts`

2. **Remove ESL Ignore During Builds**
   - Keep ESLint active in production builds
   - **File:** `next.config.ts`

### HIGH PRIORITY

3. **Add Image Optimization**
   - Implement `next/image` across the site
   - Configure next.config.ts for image domains

4. **Implement Sitemap**
   - Add `src/app/sitemap.ts`
   - Ensures proper search indexing

5. **Add Structured Data**
   - Implement JSON-LD for Person
   - Add professional information

### MEDIUM PRIORITY

6. **Fix Accessibility Issues**
   - Add skip-to-content link
   - Fix tab component ARIA attributes
   - Add aria-label to logo link

7. **Add Security Headers**
   - Configure in next.config.ts

8. **Create Error Boundaries**
   - Add error.tsx for route segments

### LOW PRIORITY

9. **Downgrade Tailwind to v3**
   - For stability and better ecosystem support

10. **Add Web Vitals Tracking**
    - Implement custom reporting

---

## 12. FILE-BY-FILE SUMMARY

| File | Issue | Severity |
|------|-------|----------|
| `next.config.ts` | ESLint and TypeScript checks disabled | CRITICAL |
| `contact/page.tsx` | Select not using accessible component | MEDIUM |
| `navbar.tsx` | Missing aria-expanded, aria-label | MEDIUM |
| `card.tsx` | Hardcoded H3 | LOW |
| `tailwind.config.ts` | Not reviewed but v4 in use | MEDIUM |
| `package.json` | Tailwind v4 beta | MEDIUM |
| No `sitemap.ts` | Missing SEO requirement | HIGH |
| No `robots.ts` | Missing SEO requirement | MEDIUM |
| No error boundaries | Missing resilience | LOW |

---

## APPENDIX: Package Audit

### Dependencies to Review
```bash
# Run these commands
npm audit
npm outdated
npm ls --depth=0 --production
```

### Recommended Additions
- `@next/bundle-analyzer` - For bundle size monitoring
- `sharp` - For image optimization (already included in Next.js)
- `eslint-config-prettier` - For consistent formatting
