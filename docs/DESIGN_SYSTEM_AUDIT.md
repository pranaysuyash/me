# Design Systems Audit: pranaysuyash.com

**Date:** 2026-04-03
**Role:** Design Systems Expert
**Focus:** Spacing, Typography, Color, Gradients, and Component Consistency

---

## 1. Design Rules Observed
- **Container Geometry:** A consistent `--radius: 0.75rem` (12px) is applied to project cards and structural containers, creating a predictable rounded language.
- **Vertical Rhythm:** Core sections follow an incremental spacing logic (e.g., 28px between headers and body, 40px between body and CTAs in the hero).
- **Core Action Color:** The primary blue (`#1E69FF` / `rgb(30, 105, 255)`) is consistently mapped to highest-intent actions across the nav and landing buttons.
- **Component Classification:** Badges (Status, Tech Tags) consistently follow a "small caps" or condensed typography style with a distinct background fill, keeping them separate from body copy.

---

## 2. Where the Rules Break
- **Button Shape Collision:** There is an unresolved split between `pill-shaped` buttons (Hero CTAs) and `rounded-md` buttons (Work Filters/Header CTAs). Standard systems assign these shapes to specific hierarchies (e.g., pill = primary, rounded = secondary); here, they are mixed.
- **Global Nav Persistence:** The "Work With Me" button in the header is a static component. It does not reflect an "active" state or change appearance when the user is already on the `/work-with-me` page, breaking the "You Are Here" mental model.
- **The "Unstructured Hyphen":** Project slugs are inconsistently hyphenated. The code expects `metaextract` in some places but displays/links `meta-extract` in others, leading to navigation fragile-points.

---

## 3. Sources of Visual Noise
- **Button Micro-copy:** The inclusion of parenthetical instructions inside primary buttons (e.g., `(2-min form)`, `(opens scheduler)`, `(PDF)`) introduces unnecessary typographic clutter into high-intent surfaces.
- **Symbol Overuse:** The use of the `↳` glyph in card descriptions feels like a manual "hack" rather than a system-level component style. It creates jagged left-aligned margins that break the vertical "scan-line."
- **Badge Density:** Many project cards contain up to 5-6 distinct labels (Year, Platform, Status, 3+ Techs) in the top 20% of the card area. This creates a "checkerboard" effect that makes the actual project title compete for attention.

---

## 4. Where Hierarchy Collapses
- **The Dual-Primary Choice:** The homepage hero uses two visually identical buttons ("Join team full-time" and "Build a pilot"). By giving them equal weight, the design system fails to provide a "Default Path," forcing the user to stop and think before they've seen any evidence.
- **The Weakest Proof:** The "Browse selected work" link—arguably the most important link for establishing credibility—is styled as a low-contrast, small text link, making it the visually weakest element in the highest-value section of the site.
- **Project Header Scaling:** On project pages, the H2 headers lack sufficient top-margin (`0px` on some viewports, relying on paragraph bottom-margin). This causes the header to "float" between sections rather than clearly belonging to the block of text below it.

---

## Interaction Bug (Design System Violation)
- **The Vanishing Filter Bar:** A critical logic failure on the `/work` page. Selecting any category filter unmounts/hides all other category options. In a design system, filters should maintain state visibility (Inactive vs Active) to allow for rapid comparison/toggling.
