# pranaysuyash.com Live Site Audit — Critical Issues

**Audit Date:** 2026-04-02  
**Auditor:** Hiring manager / Founder evaluation  
**Scope:** Live production site vs. expected implementation

---

## Executive Summary

The Cloudflare Pages deployment at `pranaysuyash.com` does **not match** the implementation described in code review. Several critical features are missing or broken on the live site, creating a poor first impression for visitors.

**Overall Assessment:** ❌ Site has critical functionality gaps that undermine credibility.

---

## Critical Issue #1: Contact Page — COMPLETELY BROKEN

**URL:** https://pranaysuyash.com/contact

**Expected:**

- Two tabs: "Book a Call" and "Tell Me About Your Project"
- Cal.com CTA cards (15-min and 30-min) with links to https://cal.com/pranaysuyash/15min
- FormBold contact form for project briefs
- Direct contact info (email, phone)

**Actual:**

- **Blank page with no content**
- Page title loads: "Pranay Suyash | Product · Document AI · YC S20"
- No visible contact interface
- Next.js hydration error in console (`BAILOUT_TO_CLIENT_SIDE_RENDERING`)
- Cloudflare security challenge injected

**Impact:**

- ❌ **CRITICAL** — Visitors cannot contact you
- ❌ No Cal.com integration visible
- ❌ No FormBold form visible
- ❌ No way to book calls or submit project briefs

**Evidence:**

```
<!--$!--><template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template>
<div></div><!--/$-->
```

---

## Critical Issue #2: Dual CTA Confusion Still Present

**Expected (per recommendations):** Pick one primary CTA path  
**Actual:** Both "Hire Me" and "Work With Me" remain equally prominent

| Element                                | Status          | Location       |
| -------------------------------------- | --------------- | -------------- |
| "Hire Me" nav item                     | ✅ Present      | Top navigation |
| "Work With Me" nav item                | ✅ Present      | Top navigation |
| "Join your team full-time" hero button | ✅ Present      | Homepage hero  |
| "Build a pilot together" hero button   | ✅ Present      | Homepage hero  |
| Footer CTAs                            | ✅ Both present | Footer         |

**Impact:**

- ⚠️ MEDIUM — Confuses visitors about which path to take
- Hiring managers see consulting options; founders see job-seeking signals

---

## Critical Issue #3: Contact Methods — Inconsistent

**What's missing from live site:**

| Feature                | Status in Code | Status on Live Site                         |
| ---------------------- | -------------- | ------------------------------------------- |
| Cal.com 15-min booking | ✅ Implemented | ❌ **NOT VISIBLE**                          |
| Cal.com 30-min booking | ✅ Implemented | ❌ **NOT VISIBLE**                          |
| FormBold contact form  | ✅ Implemented | ❌ **BROKEN**                               |
| Direct email link      | ✅ Implemented | ❌ **BROKEN (Cloudflare email protection)** |
| Phone number display   | ✅ Implemented | ❌ **NOT VISIBLE**                          |

**Email Protection Issue:**
The email link is wrapped in Cloudflare's email protection:

```html
</cdn-cgi/l/email-protection#b6c6c4d7d8d7cf98c5c3cfd7c5def6d1dbd7dfda98d5d9db">
```

This obscures the actual email address and may not work properly.

---

## What's Working

| Feature                  | Status | Evidence                                                   |
| ------------------------ | ------ | ---------------------------------------------------------- |
| Homepage loads           | ✅     | Full content visible                                       |
| Hero section updated     | ✅     | New positioning: "messy workflows and unstructured inputs" |
| System preview animation | ✅     | Present on homepage                                        |
| Work page                | ✅     | All 24 projects listed                                     |
| Individual project pages | ✅     | Problem/Approach/Result format                             |
| About page               | ✅     | Full bio and timeline                                      |
| Hire Me page             | ✅     | Resume and role fit info                                   |
| Work With Me page        | ✅     | Services and pricing visible                               |
| GitHub links             | ✅     | Working on project pages                                   |
| Footer navigation        | ✅     | All links functional                                       |

---

## Root Cause Analysis

**Contact Page Failure:**

1. Next.js static export may have failed for the contact page
2. Possible hydration error causing client-side bailout
3. Cloudflare Pages deployment may be serving stale or incomplete build
4. Cloudflare security challenge injection may be interfering with rendering

**Recommendation:** Rebuild and redeploy the contact page specifically.

---

## Comparison: Dev Implementation vs. Live Site

| Aspect               | Dev Build (pages.dev) | Live Site (pranaysuyash.com) |
| -------------------- | --------------------- | ---------------------------- |
| Contact page loads   | ✅ Yes                | ❌ **Broken**                |
| Cal.com CTAs visible | ✅ Yes                | ❌ **Missing**               |
| FormBold form works  | ✅ Yes                | ❌ **Broken**                |
| Email link clear     | ✅ Yes                | ❌ **Obfuscated**            |
| Dual CTAs            | ⚠️ Present            | ⚠️ Present (unchanged)       |
| Project examples     | ✅ Complete           | ✅ Complete                  |

---

## User Impact Scenarios

### Scenario 1: Founder wants to book a pilot call

**Expected flow:**

1. Visit site → Click "Work With Me"
2. Click "Build a pilot together"
3. Arrive at contact page → See Cal.com 15-min option
4. Book call

**Actual flow:**

1. Visit site → Click "Work With Me"
2. Click "Build a pilot together"
3. Arrive at **blank contact page**
4. **Dead end** — cannot book, cannot submit form

**Result:** Lost lead. Visitor bounces.

---

### Scenario 2: Hiring manager wants to reach out

**Expected flow:**

1. Visit site → Click "Hire Me"
2. Review resume → Click "Book a 15-min call"
3. Cal.com opens → Schedule intro

**Actual flow:**

1. Visit site → Click "Hire Me"
2. Review resume → Click "Book a 15-min call"
3. Arrive at **blank contact page**
4. **Dead end** — no booking interface

**Result:** Lost opportunity. Hiring manager moves on.

---

## Recommendations

### Immediate (Fix Today)

1. **Rebuild and redeploy contact page**

   ```bash
   npm run build
   # Verify out/contact.html exists and has content
   wrangler pages deploy out --project-name pranay
   ```

2. **Verify contact page locally before deploy**

   ```bash
   npx serve out
   # Check http://localhost:3000/contact loads correctly
   ```

3. **Disable Cloudflare email protection** or verify it works
   - Current: `</cdn-cgi/l/email-protection#...>` (obfuscated)
   - Should be: `mailto:pranay.suyash@gmail.com` (clear)

### Short-term (This Week)

4. **Pick one primary CTA** (per earlier recommendations)

   - Remove "Hire Me" from nav if consulting is focus
   - Or keep both but make hierarchy clear

5. **Add deployment checks** to CI/CD
   - Verify all pages render with content
   - Verify contact forms submit correctly
   - Verify external links (Cal.com) resolve

---

## Conclusion

The live site at `pranaysuyash.com` has a **critical functionality gap**: the contact page is completely non-functional. This undermines the entire purpose of the site — generating project inquiries or job conversations.

**Credibility impact:** HIGH  
A broken contact page signals: "This person doesn't test their own work."

**Recommended action:** Fix contact page deployment before sharing URL with prospects.

---

## Appendix: Expected vs. Actual Screenshots

**Expected Contact Page (from dev build):**

- Two tabs: "Book a Call" / "Tell Me About Your Project"
- Two Cal.com cards: 15-min and 30-min
- FormBold form with fields
- Direct email: pranay.suyash@gmail.com
- Phone: +91 99104 03502

**Actual Contact Page (live):**

- Blank white screen
- Page title only
- No interactive elements
- No contact methods visible

**Status:** ❌ **DEPLOYMENT FAILURE**
