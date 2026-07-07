# Mobile UX Audit: pranaysuyash.com

**Date:** 2026-04-03
**Device Profile:** Mid-range Android / iPhone 13 (390x844 Viewport)
**Focus:** Touch Ergonomics, Legibility, and Structural Integrity

---

## 1. Visual & Interactive Stability

### **Q1: What breaks or feels cramped?**
- **Filter Row wrapping:** On the `/work` page, the 7 category filters wrap into two dense rows. This creates a "wall of buttons" that feels visually heavy and reduces the perceived simplicity of the interface.
- **Tech Stack Tags:** Inside project cards, the font size for tech tags (`text-xs`) combined with tight padding makes them difficult to scan on high-density mobile screens.
- **Footer Navigation:** Core links in the footer have insufficient horizontal clearance. A user's thumb could easily trigger the adjacent link.

### **Q2: What is hard to tap or read?**
- **Tap Target Height:** The filter buttons are **36px** tall. Modern mobile standards (iOS/Android) recommend **44px** minimum for primary interactions to avoid "fat-finger" errors.
- **Micro-copy Legibility:** Smaller text elements (e.g., "2-min form" in buttons or status indicators in `HeroSystemPanel`) fall below the recommended 12px-14px threshold for mobile legibility.
- **Browse Work Link:** On the homepage hero, the "Browse selected work" link is close to the bottom of the "Build a pilot together" button, increasing the risk of mis-taps.

### **Q3: Does hierarchy still hold?**
**Yes.**
- **Headings:** The 7xl headings successfully downscale/wrap without breaking words or overflowing the container.
- **CTA Prominence:** The primary conversion buttons ("Hire Me" / "Work With Me") stay centered and weighted, maintaining the "Founder-Engineer" funnel.
- **Stats Strip:** The metrics row ("14 years," "45K+ fields") transitions well to a centered flex column/row that remains readable.

---

## 2. Technical Findings (Root Causes)

| Component | Observation | Root Cause |
| :--- | :--- | :--- |
| **Hero Title** | Good wrapping. | CSS `leading-[1.08]` and `tracking-tight` maintain impact at smaller scales. |
| **Work Filters** | Tap-risk at 36px. | Standard Tailwind `h-9` (36px) used instead of an mobile-optimized `h-11` (44px). |
| **Project Cards** | Dense tech tags. | `gap-1.5` and `px-2` are too tight for comfortable visual separation on 390px widths. |
| **Footer** | Link density. | Horizontal `flex-wrap` without responsive vertical stacking on smallest devices. |

---

## 3. High-Priority Mobile Fixes (Proposed)

1. **Increase Tap Targets:** Upscale `/work` filter buttons to `h-11` (44px) on mobile screens.
2. **Horizontal Scrolling for Filters:** Consider a single-row horizontal scroll for categories on mobile instead of two-row wrapping to clean up the page header.
3. **Responsive Footer:** Change footer links to a 2-column or list layout below 480px to increase tap clearance.
4. **Tag Padding:** Increase `gap-2` for tech tags to prevent them from looking like a single block of text.
