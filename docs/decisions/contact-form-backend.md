# Contact Form Backend — Decision Document

## Problem

The contact form's "Tell Me About Your Project" tab currently uses `/api/contact` (a Next.js API route with nodemailer). This requires a Node.js server, preventing static export and S3/CDN deployment.

**Goal:** Replace the server-side API with a third-party form backend that:

- Keeps the existing custom UI (shadcn/ui form, no hosted forms)
- Has a generous free tier
- Looks professional (no third-party branding on the form)
- Requires minimal code changes

---

## Options Evaluated

### 1. Static Forms (staticforms.dev) — ✅ RECOMMENDED

| Detail               | Value                                                        |
| -------------------- | ------------------------------------------------------------ |
| **Free tier**        | 500 submissions/month (forever)                              |
| **Paid**             | $7.5/mo (25K/mo), $29/mo (200K/mo)                           |
| **Integration**      | POST to `https://api.staticforms.dev/submit` with `apiKey`   |
| **Spam protection**  | reCAPTCHA v2, Cloudflare Turnstile, Altcha, honeypot         |
| **Features**         | Email notifications, webhooks, AI auto-reply, GDPR compliant |
| **Custom UI**        | Yes — works with any form/framework                          |
| **Branding on free** | Email branding only (not on the form itself)                 |

**Pros:**

- Best free quota (500/mo — 2.5x EmailJS, 5x FormBold)
- Works with existing React form (just change the fetch URL)
- Multiple spam protection options including Altcha (privacy-first, no Google)
- Webhooks to Slack/Zapier/Make
- AI auto-reply (BYOK)

**Cons:**

- Lesser known than Formspree
- Email branding on free tier

---

### 2. EmailJS (emailjs.com)

| Detail               | Value                                                 |
| -------------------- | ----------------------------------------------------- |
| **Free tier**        | 200 requests/month                                    |
| **Paid**             | $9/mo (2K/mo), $15/mo (5-10K/mo), $40/mo (25-200K/mo) |
| **Integration**      | Client-side SDK (`@emailjs/browser`)                  |
| **Spam protection**  | Domain whitelisting (paid)                            |
| **Features**         | Email templates, CC/BCC, attachments, analytics       |
| **Custom UI**        | Yes — SDK sends data, you control the form            |
| **Branding on free** | "Sent via EmailJS.com" footer in emails               |

**Pros:**

- Client-side SDK (no fetch needed, cleaner integration)
- Email templates for auto-responses
- Well-established, good docs

**Cons:**

- Only 200 requests/mo on free (lowest of the bunch)
- No attachments on free tier
- Domain whitelisting is paid (anyone could use your service ID otherwise)
- More expensive paid tiers

---

### 3. FormBold (formbold.com)

| Detail               | Value                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| **Free tier**        | 100 submissions/month (5 forms max)                                    |
| **Paid**             | $4/mo (3K/mo), $9/mo (5K/mo), $16/mo (15K/mo)                          |
| **Integration**      | POST to form endpoint URL                                              |
| **Spam protection**  | reCAPTCHA, basic spam filter (free)                                    |
| **Features**         | Slack/Notion/Telegram/Google Sheets integrations, CSV export, webhooks |
| **Custom UI**        | Yes — works with any form                                              |
| **Branding on free** | FormBold branding in emails                                            |

**Pros:**

- Cheapest paid tier ($4/mo)
- Good integrations (Slack, Notion, Telegram, Google Sheets)
- End-to-end encrypted

**Cons:**

- Only 100 submissions/mo free (very low)
- Only 2 target email addresses on free
- No auto-responder on free
- Branding on free tier

---

### 4. Formspree (formspree.io)

| Detail               | Value                     |
| -------------------- | ------------------------- |
| **Free tier**        | ~50 submissions/month     |
| **Paid**             | ~$10/mo (varies)          |
| **Integration**      | POST to form endpoint URL |
| **Custom UI**        | Yes                       |
| **Branding on free** | Yes                       |

**Pros:**

- Most well-known, largest community
- Good docs and support

**Cons:**

- Lowest free tier (~50/mo)
- Most expensive paid tier
- Aggressive upselling

---

### 5. mailto: link (no backend)

| Detail          | Value                               |
| --------------- | ----------------------------------- |
| **Cost**        | Free                                |
| **Integration** | `mailto:email?subject=...&body=...` |
| **Custom UI**   | No — opens user's email client      |

**Pros:**

- Zero dependencies, zero cost
- No server needed

**Cons:**

- Breaks the form UX entirely
- User must manually hit send from their email app
- No validation, no spam protection
- Looks unprofessional on a portfolio
- Can't collect structured data (budget, company, etc.)

---

## Comparison Summary

| Service          | Free Quota | Custom UI | Spam Protection            | Paid Starting    | Best For          |
| ---------------- | ---------- | --------- | -------------------------- | ---------------- | ----------------- |
| **FormBold**     | 100/mo     | ✅        | reCAPTCHA                  | $4/mo (3K/mo)    | Best value        |
| **Static Forms** | 500/mo     | ✅        | reCAPTCHA/Turnstile/Altcha | $7.5/mo (25K/mo) | Overkill          |
| **EmailJS**      | 200/mo     | ✅        | Domain whitelist (paid)    | $9/mo (2K/mo)    | Template emails   |
| **Formspree**    | ~50/mo     | ✅        | reCAPTCHA                  | ~$10/mo          | Brand recognition |
| **mailto:**      | Unlimited  | ❌        | None                       | N/A              | Not recommended   |

---

## Decision: FormBold

**Why:**

1. **100 submissions/month free** — More than enough to start. A portfolio site will see ~10-20/month at most.
2. **Cheapest paid tier at $4/mo** — If we ever need to scale, 3,000 submissions/month for $4 is the best value. Static Forms charges $7.5/mo for 25K (which we'd never need for a portfolio).
3. **Fully custom UI** — The existing shadcn/ui form stays exactly as-is. Just change the `fetch` URL from `/api/contact` to the FormBold endpoint.
4. **Good integrations** — Slack, Notion, Telegram, Google Sheets — useful if we want instant notifications.
5. **Professional** — No third-party form embedding. The form looks and behaves exactly like it does now.

---

## Implementation Plan

### What changes:

1. **Delete** `src/app/api/contact/route.ts`
2. **Delete** `src/app/api/github-pinned/route.ts` (unused)
3. **Update** `src/app/contact/page.tsx` — change `handleSubmit` to POST to FormBold endpoint
4. **Update** `next.config.ts` — add `output: "export"`
5. **Remove** unused dependencies: `nodemailer`, `resend`, `rss-parser`, `next-mdx-remote`, `next-auth`
6. **Build** — `next build` should now succeed as a static export
7. **Deploy** — Upload `out/` folder to S3 + CloudFront

### Code change (contact form):

```typescript
// Before:
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});

// After:
const response = await fetch(
  "https://api.formbold.com/api/forms/{FORM_UNIQUE_ID}",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  },
);
```

### Setup steps (one-time):

1. Register at formbold.com
2. Create a form, get the unique form endpoint URL
3. Update the fetch URL in contact/page.tsx
4. That's it — form works

---

## What This Enables

After this change, the entire site becomes a static bundle (`out/` folder) that can be deployed to:

- **AWS S3 + CloudFront** (~$0.02/mo storage + CDN)
- **Cloudflare Pages** (free)
- **GitHub Pages** (free)
- **Netlify/Vercel** (free, but defeats the cost-saving purpose)

No server, no Node.js runtime, no maintenance. Just upload files.

---

## Booking Calendar — Decision Document

### Problem

The "Book a Call" tab currently embeds a Google Calendar booking URL as an iframe. This has several issues:

- **No design control** — it's Google/Calendly's UI, not ours
- **Heavy** — loads an entire separate page inside the page (~700px minimum height)
- **Looks like an embed** — breaks the seamless portfolio feel
- **Performance** — dependent on their uptime and loading speed
- **Mobile UX** — iframe doesn't adapt well to small screens

### Options Evaluated

#### 1. Keep Current Iframe

| Detail             | Value |
| ------------------ | ----- |
| **Design control** | None  |
| **Cost**           | Free  |
| **Complexity**     | Zero  |

**Pros:**

- Already implemented, works now
- No changes needed

**Cons:**

- Worst UX — heavy, unstyled, breaks design consistency
- 700px minimum height dominates the page
- Looks cheap on a portfolio

#### 2. CTA Button → Opens in New Tab

| Detail             | Value                 |
| ------------------ | --------------------- |
| **Design control** | Full (button is ours) |
| **Cost**           | Free                  |
| **Complexity**     | Zero                  |

**Pros:**

- Cleanest, simplest option
- No heavy iframe, no performance hit
- What most senior engineers do on portfolios
- Already exists as the fallback on the current page

**Cons:**

- Takes user off-site (but in a new tab, so your site stays open)
- No inline booking experience

#### 3. Calendly Popup Widget

| Detail             | Value                       |
| ------------------ | --------------------------- |
| **Design control** | Minimal (brand colors only) |
| **Cost**           | Free tier                   |
| **Complexity**     | Low (add script + trigger)  |

**Pros:**

- Lighter than iframe — loads on demand
- Popup modal feels more integrated
- Free tier sufficient

**Cons:**

- Still Calendly branding
- Adds external script dependency
- Limited theming

#### 4. Cal.com (cloud)

| Detail             | Value                                      |
| ------------------ | ------------------------------------------ |
| **Design control** | Better — dark mode, custom colors, theming |
| **Cost**           | Free tier (1 event type)                   |
| **Complexity**     | Low (similar to Calendly setup)            |

**Pros:**

- Open source, more customizable than Calendly
- Cleaner, more modern UI
- Supports popup and inline embed modes
- Better dark mode support
- Free tier is generous

**Cons:**

- Still an embed (can't fully match site design)
- External dependency

#### 5. Cal.com (self-hosted)

| Detail             | Value                           |
| ------------------ | ------------------------------- |
| **Design control** | Full — can fork and customize   |
| **Cost**           | Free (but needs your own infra) |
| **Complexity**     | Medium-High                     |

**Pros:**

- Complete control over design and UX
- Open source, no vendor lock-in
- Can match site design exactly

**Cons:**

- Defeats the "no server" goal — needs hosting
- Maintenance burden (updates, uptime)
- Overkill for a portfolio

#### 6. Custom Booking UI + Google Calendar API

| Detail             | Value                      |
| ------------------ | -------------------------- |
| **Design control** | Full                       |
| **Cost**           | Free (Google Calendar API) |
| **Complexity**     | High                       |

**Pros:**

- Perfect design match with site
- Full control over flow and UX

**Cons:**

- Requires server-side logic (can't do OAuth from static site)
- Significant development effort
- Maintenance burden

### Comparison Summary

| Option                    | Design Control | Cost       | Perf Impact | Static-Friendly | Best For                       |
| ------------------------- | -------------- | ---------- | ----------- | --------------- | ------------------------------ |
| **CTA Button**            | Full (button)  | Free       | None        | ✅              | Simplicity, senior portfolios  |
| **Calendly Popup**        | Minimal        | Free       | Low         | ✅              | Quick improvement              |
| **Cal.com (cloud)**       | Moderate       | Free       | Low         | ✅              | Best embed option              |
| **Keep Iframe**           | None           | Free       | High        | ✅              | Status quo                     |
| **Cal.com (self-hosted)** | Full           | Infra cost | N/A         | ❌              | Full control, willing to host  |
| **Custom + GCal API**     | Full           | Free       | Low         | ❌              | Custom everything, high effort |

### Decision: CTA Button (Option 2)

**Why:**

1. **Zero complexity** — just a styled button that opens the booking page in a new tab
2. **No performance cost** — no iframe, no external scripts, no heavy loads
3. **Industry standard** — most senior engineers and consultants use this pattern
4. **Already built** — the fallback UI on the current page already does this
5. **Static-friendly** — no server, no dependencies, works perfectly with S3/CDN
6. **Professional** — a well-designed CTA button ("Book a 15-min call →") looks intentional, not like a compromise

**Implementation:**

- Remove the iframe entirely
- Replace with a clean CTA section: description + button
- Button opens `NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL` in a new tab
- Keep the direct contact info below (email, phone, socials)

**Future upgrade path:**
If we ever want a more integrated booking experience, Cal.com (cloud) is the best embed option — open source, better theming, cleaner UI than Calendly. But for now, the button is the right call.

### Code change (booking tab):

```tsx
// Before: heavy inline iframe
<iframe src={bookingUrl} className="w-full min-h-[700px]" />

// After: clean CTA
<div className="text-center space-y-4">
  <p className="text-muted-foreground">
    Pick a time that works for you. 15 minutes, no pressure, no pitch.
  </p>
  <Button asChild size="lg" className="rounded-full">
    <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
      Book a 15-min call <ExternalLink className="ml-2 h-4 w-4" />
    </a>
  </Button>
</div>
```
