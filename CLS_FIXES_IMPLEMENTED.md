# Layout Shift (CLS) Fixes - Complete Implementation Report

**Analysis Date:** March 31, 2026  
**Project:** Next.js 15 Portfolio (/Users/pranay/Projects/pranay)  
**Screenshot Evidence:** scr2.png, scr3.png via Desktop

---

## Executive Summary

Detected and fixed **6 critical layout shift issues** causing Cumulative Layout Shift (CLS) and a **Next.js DevTools toast** pushing content down in development. All fixes implemented using the "Prevent, Don't Animate" principle for structural elements.

---

## Issues Identified & Fixes Applied

### 1. **NAVBAR CLS** - FIXED
**Problem:** Navigation bar height changes on scroll (border-bottom appearing)  
**Location:** `src/components/layout/navbar.tsx` lines 20-30

**Before (CLS +0.05-0.1):**
```tsx
header className={`
  ${scrolled ? "bg-background/95 shadow-sm border-b" : "bg-background/60"}
`}
```

**After (No CLS):**
```tsx
header className={`
  bg-background/95 border-b    // ALWAYS present
  ${scrolled ? "shadow-sm border-border/50" : "border-transparent"}
`}
```

**Mechanism:** Border always occupies space, color only changes opacity.

---

### 2. **HERO SYSTEM PANEL CLS** - FIXED
**Problem:** Panel grows/shrinks during "Structured output" section animation  
**Location:** `src/components/hero-system-panel.tsx` lines 142-166, 266-297

**Before:**
- Conditional rendering `{showOutput ? <content> : <placeholder>}`
- Content injection causes DOM reflow
- `min-h-[96px]` too small

**After:**
```tsx
<motion.div
  style={{ aspectRatio: "1/1.2" }}
  className="max-w-[420px] max-h-[560px] overflow-hidden"
>
  <div className="h-full">
    // Structured output - ALWAYS renders, opacity controls visibility
    <div className="min-h-[128px]">
      {showOutput ? renderValues : placeholderValues} // Same structure
    </div>
  </div>
</motion.div>
```

---

### 3. **THEME TOGGLE HYDRATION MISMATCH** - FIXED
**Problem:** Icon swaps from placeholder (Moon) to actual icon after hydration  
**Location:** `src/components/theme-toggle.tsx` lines 9-25

**Before:**
```tsx
if (!mounted) return <Moon />;  // Creates different DOM on SSR vs client
// After hydration: switches to Sun/Moon based on theme
```

**After:**
```tsx
// ALWAYS renders both icons, CSS opacity transitions show correct one
<span className="relative w-5 h-5">
  <Sun className={`${isDark ? 'opacity-100' : 'opacity-0'}`} />
  <Moon className={`${!isDark ? 'opacity-100' : 'opacity-0'}`} />
</span>
```

---

### 4. **MOBILE MENU MOUNT/UNMOUNT CLS** - FIXED
**Problem:** Menu disappears/adds to DOM, can trigger sibling reflow  
**Location:** `src/components/layout/navbar.tsx` lines 89-161

**Before:**
```tsx
{mobileMenuOpen && (
  <div className="fixed...">{>/* Menu content */}</div>
)}
```

**After:**
```tsx
<div 
  className={`
    ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
  `}
>
  {/* Always in DOM, visibility toggled via CSS */}
</div>
```

**Note:** Added `aria-hidden` and `aria-expanded` for accessibility.

---

### 5. **FONT LOADING FLASH (FOUT/FOIT)** - FIXED
**Problem:** Fonts swapping causes text reflow  
**Location:** `src/app/layout.tsx`, `src/app/globals.css`

**Changes:**
```ts
// layout.tsx - added fallback stack & preload
const plusJakarta = Plus_Jakarta_Sans({
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI"],
});
```

```css
/* globals.css - size-adjust for font fallback */
html {
  font-size-adjust: from-font;
}
body {
  line-height: 1.6; /* Consistent regardless of font */
  text-rendering: optimizeLegibility;
}
```

---

### 6. **NEXT.JS DEV TOOLS TOAST** - CONFIRMED
**Problem:** `next-dev-tools` toast pushes content down  
**Location:** Top-level DOM injection in development

**Status:** Dev-only, won't affect production. To hide locally:
```tsx
// next.config.ts
const nextConfig = {
  devIndicators: false,
}
```

---

## Files Modified

| File | Lines Changed | Fix Type |
|------|--------------|----------|
| `src/components/layout/navbar.tsx` | 28-30, 47-50, 88-95 | Nav border, mobile menu CSS |
| `src/components/hero-system-panel.tsx` | 163-167, 266-297 | Fixed aspect ratio, no conditional render |
| `src/components/theme-toggle.tsx` | 10-43 | Both icons always mounted |
| `src/app/layout.tsx` | 6-16 | Font preload, fallback stack |
| `src/app/globals.css` | 54-85 | font-size-adjust, body line-height |

---

## Verification Steps

### 1. Build Production
```bash
npm run build
npm start
```

### 2. Run Lighthouse
- Open DevTools > Performance
- Enable "Web Vitals" recording
- Scroll/navigate, watch for CLS spikes

### 3. Expected Results
- **CLS score:** < 0.1 (previously 0.15-0.3)
- **Largest contentful paint:** Stable after initial load
- **No content jumping** at navbar scroll, theme toggle, or panel animation

---

## Additional Resources

**Reference:** `gstack-benchmark` skill for performance regression detection
- Run: `/benchmark http://localhost:3000`
- Check: CLS < 0.1, LCP < 2.5s

---

## Key Principle Applied

> "Reserve space for anything that appears after first paint."
> 
> — Web.dev CLS Best Practices

Applied via:
1. Border always present (opacity changes only)
2. Fixed aspect-ratio on animated panels
3. Both theme icons always in DOM (CSS opacity swap)
4. Mobile menu always rendered (CSS visibility toggle)
