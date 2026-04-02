# Senior Product Designer UX Audit: pranaysuyash.com

**Date:** 2026-04-02
**Focus:** Interaction Correctness & Clarity (Senior Audit)

---

## 1. Broken Interactions (Critical UX Flaws)

### **Vanishing Filter Bar (Work Page)**
- **Behavior:** On the `/work` page, selecting any filter (e.g., "AI & Machine Learning") causes all other filter category buttons to disappear from the DOM/UI, leaving only "All" and the active filter.
- **UX Impact:** This breaks the standard mental model of a toggle-based filter system. It forces a user to click "All" to restore the list before they can explore another category.
- **Priority:** High. This is a severe exploration friction point.

---

## 2. Inconsistent Patterns

### **Navigation Orientation (Active States)**
- **Behavior:** Standard text-only navigation items like "Work," "Hire Me," and "About" have clear visual indicators (active color/weight) when selected. However, the **"Work With Me" primary button** in the top-right remains static and identical regardless of whether you are on that page or not.
- **UX Impact:** Users lose their sense of place ("You Are Here" indicator) when navigating through the primary CTA paths.

### **Back Button Placement**
- **Behavior:** The "Back to all projects" button's weight and placement feel slightly inconsistent between project pages versus the clear navigation pattern used on the main landing surfaces.

---

## 3. Template-like Elements

### **Rigid Case Study Structure**
- Each project page follows an identical vertical stack:
  1. Title/Subtitle
  2. Problem
  3. Approach
  4. Technology
- **Perception:** While functional and clear, the lack of layout variation (e.g., side-by-side images, varied text densities) makes the portfolio feel somewhat "templated" rather than a custom-built narrative for each unique project. It masks the "seniority" of the individual projects by forced uniformity.

---

## 4. Hierarchy Failures (Visual Competition)

### **Split-Brain Hero CTAs**
- **Observation:** The homepage hero presents two primary buttons—"Join your team full-time" and "Build a pilot together"—with nearly identical visual weight and size.
- **Hierarchy Failure:** By presenting two "Primary" actions of equal weight, the design fails to guide the user's focus. It creates a binary choice before the user has even seen the work, forcing a split in the mental model.
- **Visual Competition:** These two large blocks compete directly with the "Selected Work" section immediately below, which is arguably the more important proof of credibility.

### **Buried "Browse Work" Link**
- **Observation:** Next to the high-weight primary buttons, the "Browse selected work" link is a small, low-contrast text link.
- **Hierarchy Failure:** For a hiring manager or founder, seeing the work is the P0 goal. By burying this secondary action next to two massive primary headers, the design makes it harder for high-intent survivors to skip the "hire/contract" choice and go straight to the evidence.

---

## 5. Interaction Correctness Summary

| Element | Status | Note |
| :--- | :--- | :--- |
| **Filters** | ⚠️ Broken | Filters disappear on select; high reset friction. |
| **Global Nav** | 🟡 Partial | Standard links show active state; Primary CTA doesn't. |
| **Project Links** | ✅ Functional | All tested links (MetaExtract, SignKit, EchoPanel) load correctly. |
| **Resumes/External** | ✅ Functional | CV downloads and GitHub links are directed correctly. |
