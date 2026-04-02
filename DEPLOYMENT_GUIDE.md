# DEPLOYMENT GUIDE

**Site:** pranaysuyash.com  
**Live URL:** https://c94cf808.pranay-4wy.pages.dev  
**Platform:** Vercel (via Git integration)  
**Date:** April 2, 2026

---

## PRE-DEPLOYMENT CHECKLIST

### Code Status
- [ ] All TypeScript errors fixed
- [ ] All ESLint errors fixed
- [ ] Build passes locally (`npm run build`)
- [ ] No console errors
- [ ] No broken links

### Critical Content (P0)
- [ ] "10+ years" changed to "14 years" (5 locations)
- [ ] "Why are you here?" changed to "How I can help"
- [ ] "Available immediately" added

### Assets Ready
- [ ] Resume PDF/HTML in public/
- [ ] Favicon working
- [ ] All project GitHub links working
- [ ] MetaExtract repo public (verified ✓)

### SEO Ready
- [ ] Sitemap.xml generated
- [ ] Robots.txt generated
- [ ] Meta descriptions updated
- [ ] OpenGraph tags present

---

## DEPLOYMENT STEPS

### Step 1: Final Verification

```bash
cd /Users/pranay/Projects/pranay

# Check current branch
git branch

# Should be: main (or master)
```

### Step 2: Make P0 Fixes

Edit these files:

1. **src/app/page.tsx** - 3 changes
2. **src/app/hire-me/page.tsx** - 2+ changes  
3. **src/app/layout.tsx** - 1 change

See FIXES_REQUIRED_BEFORE_LAUNCH.md for exact code.

### Step 3: Test Build

```bash
# Install dependencies (if needed)
npm install

# Run build
npm run build

# Expected output:
# ✓ Compiled successfully
# ✓ Linting and checking validity of types
# ✓ Collecting page data
# ✓ Generating static pages (39/39)
# ✓ Finalizing page optimization
```

**If build fails:**
- Fix errors shown
- Re-run until passes

### Step 4: Commit Changes

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "fix: correct years of experience (14 years), improve narrative

- Fix '10+ years' → '14 years' across all pages (5 locations)
- Add YC S20 alum narrative to hire-me page
- Update proof strip to emphasize track record
- Add 'available immediately' signal
- Change 'Why are you here?' to 'How I can help'

Fixes critical credibility issue for job search."

# Push to remote
git push origin main
```

### Step 5: Monitor Vercel Deployment

```bash
# Check Vercel dashboard
# URL: https://vercel.com/dashboard

# Or use CLI
vercel --version  # check if installed
vercel
```

**Watch for:**
- Build started
- Build completed
- Deployment successful

### Step 6: Verify Live Site

```bash
# Test homepage
curl -s https://c94cf808.pranay-4wy.pages.dev | grep "14 years"

# Expected output: Should find "14 years" text

# Test sitemap
curl -s https://c94cf808.pranay-4wy.pages.dev/sitemap.xml | head -20

# Test robots.txt
curl -s https://c94cf808.pranay-4wy.pages.dev/robots.txt
```

---

## POST-DEPLOYMENT VERIFICATION

### Browser Testing

**Desktop (Chrome):**
- [ ] Homepage loads
- [ ] "14 years" visible in hero
- [ ] "14 years" visible in proof strip
- [ ] Navigation works
- [ ] Dark mode toggle works
- [ ] Contact form loads

**Mobile (iPhone SE size):**
- [ ] Homepage loads
- [ ] No horizontal scroll
- [ ] Mobile menu opens/closes
- [ ] Text readable
- [ ] CTAs clickable

### Page-by-Page Check

**Homepage (/)**
- [ ] Hero shows "14 years"
- [ ] Proof strip shows "14 years"
- [ ] "How I can help" section (or removed)
- [ ] CTA buttons work
- [ ] Project cards clickable

**Hire Me (/hire-me)**
- [ ] Shows "14 years"
- [ ] Shows "returning to hands-on" narrative
- [ ] Resume download works
- [ ] Book call CTA works

**Work With Me (/work-with-me)**
- [ ] Pricing shows ($10K+, $5K+, $3K+)
- [ ] Process explained
- [ ] FAQ visible
- [ ] Contact CTA works

**Work (/work)**
- [ ] All 24 projects listed
- [ ] Filter buttons work
- [ ] Project cards clickable

**Contact (/contact)**
- [ ] Form loads
- [ ] Tab switching works
- [ ] Form validation works
- [ ] Submit button clickable

**About (/about)**
- [ ] Timeline accurate
- [ ] Experience correct
- [ ] Resume download works

**Project Detail (/work/metaextract)**
- [ ] MetaExtract loads
- [ ] GitHub link works
- [ ] Back button works

### SEO Verification

```bash
# Check meta tags
curl -s https://c94cf808.pranay-4wy.pages.dev | grep -o '<title>.*</title>'
curl -s https://c94cf808.pranay-4wy.pages.dev | grep -o 'name="description" content="[^"]*"'

# Check OpenGraph
curl -s https://c94cf808.pranay-4wy.pages.dev | grep "og:"

# Check sitemap accessible
curl -I https://c94cf808.pranay-4wy.pages.dev/sitemap.xml
# Should return: HTTP/2 200
```

### Performance Check

```bash
# Lighthouse CI (if installed)
lighthouse https://c94cf808.pranay-4wy.pages.dev --output=json

# Or use Chrome DevTools
# - Open DevTools → Lighthouse tab
# - Run audit (Mobile + Desktop)
# - Check scores: Performance, Accessibility, SEO
```

---

## ROLLBACK PLAN

If deployment breaks:

```bash
# Revert last commit
git revert HEAD

# Push revert
git push origin main

# Or use Vercel dashboard
# - Go to Deployments
# - Find previous working deployment
# - Click "Promote to Production"
```

---

## ANNOUNCEMENT TEMPLATE

### LinkedIn Post

```
New portfolio is live 🚀

After 5+ years building MedPiper (YC S20) from zero to $1M ARR, 
I'm returning to hands-on technical work.

Built 24 AI projects exploring document extraction, voice AI, 
and workflow automation. Check them out at pranaysuyash.com

Open to:
→ Staff AI Engineer roles
→ Technical Product Management  
→ Founding Engineer positions
→ Consulting ($10K+ projects)

If you're hiring for applied AI or need a focused prototype 
built in 2-4 weeks, let's talk.

#AI #MachineLearning #Startup #Hiring #OpenToWork
```

### Twitter/X Post

```
New portfolio: pranaysuyash.com

14 years. YC S20. $1M ARR track record. 
24 AI projects. Returning to hands-on IC work.

Open for Staff AI Eng / Technical PM / Founding Eng roles.
Also consulting ($10K+ prototypes in 2-4 weeks).

DMs open 🚀
```

### YC Slack (#jobs)

```
YC S20 alum looking for next role

Built MedPiper from zero to $1M ARR over 5.5 years. 
Now returning to hands-on technical work.

Expertise:
• Document AI / OCR (45K+ fields extracted)
• Voice AI (Whisper, macOS native)
• Workflow automation (4 weeks → 10 days)
• FastAPI, Python, React, Swift

Target: Staff AI Engineer, Technical PM, or Founding Engineer
Location: Bengaluru / Remote US

Portfolio: https://c94cf808.pranay-4wy.pages.dev
Resume: Available on request

DM me or email pranay.suyash@gmail.com
```

---

## MONITORING POST-LAUNCH

### Week 1 Metrics

| Metric | Target | How to Check |
|--------|--------|--------------|
| Homepage visitors | 200 | Vercel Analytics |
| /hire-me views | 50 | Vercel Analytics |
| Resume downloads | 10 | Event tracking |
| Contact submissions | 5 | Form backend |
| Calendly bookings | 3 | Calendly dashboard |

### Tools to Set Up

1. **Vercel Analytics**
   - Already included in Pro plan
   - Check: Dashboard → Analytics

2. **Google Analytics 4** (optional)
   ```bash
   npm install @vercel/analytics
   ```
   Add to layout.tsx

3. **Calendly Integration**
   - Set up account
   - Get embed code
   - Replace Google Calendar iframe

---

## TROUBLESHOOTING

### Build Fails

```bash
# Check TypeScript
npx tsc --noEmit

# Check ESLint
npx next lint

# Clear cache
rm -rf .next
npm run build
```

### 404 Errors

```bash
# Check if page exists
ls src/app/[page]/page.tsx

# Check routing
# Dynamic routes: [slug]/page.tsx
# Static routes: page.tsx
```

### Styles Not Applied

```bash
# Check Tailwind config
cat tailwind.config.ts

# Check CSS imports
# globals.css should import Tailwind
```

### Contact Form Not Working

```bash
# Check API route
ls src/app/api/contact/route.ts

# Check environment variables
# .env should have: RESEND_API_KEY, CONTACT_EMAIL
```

---

## EMERGENCY CONTACTS

| Issue | Contact | Method |
|-------|---------|--------|
| Vercel down | Vercel Status | https://status.vercel.com |
| DNS issues | Domain registrar | Support portal |
| Build failures | Vercel Support | Dashboard → Help |

---

**END OF DEPLOYMENT GUIDE**

**Status:** Ready to deploy after P0 fixes
**Next Step:** Fix "10+ years" → "14 years", commit, push
