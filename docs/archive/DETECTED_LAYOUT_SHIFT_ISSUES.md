# Layout Shift Issues - Analysis & Fix Plan

**Detected via screenshots scr2.png / scr3.png at:** Desktop/screenshots  
**App Location:** /Users/pranay/Projects/pranay (Next.js 15 portfolio)  
**Report Date:** March 31, 2026

## Layout Issues Identified

### 1. CRITICAL: Top Navigation Height Changes After Scroll (CLS)
**File:** `src/components/layout/navbar.tsx` lines 20-24, 28-30

**Problem:**
- Navbar starts with `bg-background/60` (transparent-ish) and NO border
- After scrolling 10px, it switches to `bg-background/95` WITH `border-b shadow-sm`
- This border bottom adds height to the element, causing layout shift

```tsx
// PROBLEMATIC CODE (line 28-30):
className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-md ${
  scrolled ? "bg-background/95 shadow-sm border-b" : "bg-background/60"
}`}
```

**Fix:** Add border from the start, just change the color/opacity.

---

### 2. CRITICAL: Hero System Panel Height Changes During Render (CLS)
**File:** `src/components/hero-system-panel.tsx` lines 142-167, 266-297

**Problem:**
- Panel content renders with animation delays (`initial={{ opacity: 0 }}`)
- The "Structured output" section has `min-h-[96px]` but content conditionally renders via `showOutput` state
- Framer Motion animations cause content to "grow" after mount
- No fixed container size before hydration

```tsx
// PROBLEMATIC (lines 266-297):
<div className="rounded-lg border... min-h-[96px] flex flex-col justify-center">
  {showOutput ? (
    // Content with animations that shifts layout
  ) : (
    <p className="text-sm text-white/25">Waiting for routing...</p>
  )}
</div>
```

**Fix:** Reserve full panel height immediately with `aspect-ratio` or fixed `height`.

---

### 3. MEDIUM: Theme Toggle Hydration Mismatch (CLS)
**File:** `src/components/theme-toggle.tsx` lines 11-25

**Problem:**
- `mounted` state starts as `false`, renders placeholder button with Moon icon
- After hydration (`useEffect`), switches to actual theme-aware button
- Can cause 1-2px size difference and icon flash

```tsx
if (!mounted) {
  return (
    <Button variant="ghost" size="icon" disabled>
      <Moon className="h-5 w-5" />  // Wrong icon during SSR
    </Button>
  );
}
```

**Fix:** Use SSR-safe theme detection or suppress hydration warning.

---

### 4. LOW: Mobile Menu Button Conditional Render (CLS)
**File:** `src/components/layout/navbar.tsx` lines 45-54, 89-161

**Problem:**
- Mobile menu button appears after hydration check (`hidden lg:flex` vs `flex lg:hidden`)
- The slide-in panel removes itself from DOM when closed, then re-adds
- State changes can cause content to reflow

---

### 5. POTENTIAL: Font Loading Flash (FOUT/FOIT)
**File:** `src/app/layout.tsx` lines 6-16

**Problem:**
- Uses `next/font` with `display: "swap"` which is correct
- BUT if fonts aren't preloaded properly, fallback font may cause text reflow
- No `size-adjust` in font-face declaration

```tsx
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap", // Good, but...  
});
```

**Check:** Ensure fonts are being preloaded in `<head>`.

---

### 6. HIGHER-ORDER: Next.js Dev Tools Toast (Confirmed via DOM)
**Root Cause:** Next.js Development Mode

**Problem:**
- Screenshot shows `next-dev-tools` toast button at top of DOM
- In dev mode, this renders in-flow and pushes content down when it appears
- NOT present in production builds

**Evidence:**
- User mentioned "dev-tools toast button at the top level" visible in DOM
- This is the React DevTools / Next.js Dev indicator

**Fix:** Only affects dev mode. For production: verify it's disabled.

---

## Automated Fix Implementation

Running gstack benchmark to capture actual CLS metrics...

(Note: Screenshots show visual differences - we need to compare what changed)
