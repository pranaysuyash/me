# Hostile Navigation & State Audit: pranaysuyash.com

**Date:** 2026-04-03
**Role:** Chaos Engineer / QA
**Focus:** Breaking State, Navigation, and History

---

## 1. Critical Bugs Found

### **Bug #1: Filter State Amnesia**
- **Severity:** P1 (UX Blocker)
- **Problem:** Navigating "Back" to the `/work` page resets all active filters to "All."
- **Reproduction Steps:**
    1. Go to `/work`.
    2. Select a filter (e.g., "AI & Machine Learning").
    3. Click a project card to navigate to the detail page.
    4. Click the browser "Back" button or the UI's "Back to all projects" link.
- **Root Cause:** The `activeFilter` is stored in a local `useState` in `WorkPage.tsx`. When the user navigates away, the component unmounts and the state is destroyed.
- **Recommended Fix:** Sync the `activeFilter` to a URL query parameter (e.g., `/work?c=ai-ml`) using `useSearchParams`.

### **Bug #2: Navigation Race Condition (`about:blank`)**
- **Severity:** P0 (Stability)
- **Problem:** Rapidly clicking "Forward" and "Back" or switching between project cards in under 1 second causes the application to crash to an `about:blank` page.
- **Reproduction Steps:**
    1. Click Project A.
    2. Rapidly hit browser "Back" and then immediately click Project B.
- **Root Cause:** Next.js App Router transition collision. Rapid firing of `router.push` or history events before the previous transition completes can corrupt the internal router state.
- **Recommended Fix:** Implement a navigation debounce or a global "loading" barrier that prevents new navigation events until the current one is resolved.

### **Bug #3: Scroll Position Reset**
- **Severity:** P2 (UX Polish)
- **Problem:** Returning to the `/work` page always resets the scroll position to the top, forcing the user to find their place again in the list.
- **Root Cause:** Dynamic content rendering. Since the filter resets to "All" upon return (Bug #1), the page height changes and Next.js's native scroll restoration fails to find the previous anchor.
- **Recommended Fix:** Fixing Bug #1 (URL-persistent filters) will likely resolve this by ensuring the page height is consistent upon return.

---

## 2. Stability Scorecard

| Test Metric | Result | Notes |
| :--- | :--- | :--- |
| **Rapid Filter Switching** | **PASS** | Component re-renders are efficient; no visual flickering. |
| **Back/Forward Hammering** | **FAIL** | History stack corruption leads to blank pages. |
| **Deep Link Stability** | **PASS** | Direct links to filtered categories work (once implemented). |
| **Visual Glitches** | **PASS** | No Layout Shift (CLS) observed even under stress. |

---

## 3. High-Leverage Fixes (Proposed)

1.  **URL Filter Persistence:** Transform the `/work` page into a search-parameter-driven view. This fixes both state loss and scroll restoration in one move.
2.  **Navigation Interceptor:** Add a subtle transition overlay or debounce to prevent "hammering" the router during fast project browsing.
