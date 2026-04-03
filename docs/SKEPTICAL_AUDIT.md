# Skeptical Audit: pranaysuyash.com

**Date:** 2026-04-03
**Role:** Professional Skeptic / Technical Due Diligence
**Focus:** Finding the "Holes" in the Narrative

---

## 1. What feels real? (The "Unfaked" Signals)

- **The MetaExtract Undersell:** Most portfolios claim 100% of an outcome. You claim "45,000+ fields," but internal documentation (**FIELD_INVENTORY_ACTUAL_NUMBERS.md**) verifies **131,858 fields**. In a world of overstatement, understating your primary technical achievement by ~65% is the ultimate credibility signal.
- **The YC Pedigree:** MedPiper (YC S20) is verified. This isn't just a label; the complexity of the accompanying work (document forensics) matches the caliber expected from a YC-backed technical founder.
- **Architecture Depth:** The separation between "Bitstream Forensics" and "Persona Engine" is too specific to be "LLM-generated fluff." It reflects real-world experience in building deterministic systems for regulated industries.

---

## 2. What feels inflated? (The "Marketing Gloss")

- **The "14-Year" Timeline:** While technically accurate (B.Tech 2012), the 5 years at EY were in **SAP/Business Consulting**. While "enterprise-grade," it's a different technical DNA than the "FastAPI/Next.js/AI" persona currently being projected. The 14-year claim is a "career length" metric, not a "modern stack experience" metric.
- **"Applied AI" and "Working Systems":** These phrases are used as repetitive safety blankets. They fill space without adding technical density (addressed in the Copy Audit).

---

## 3. What proof is missing? (The "Trust Gaps")

- **SignKit Legal/Business Infrastructure:** The product has a functional checkout, but the `Terms of Service` and `Privacy Policy` links are broken anchors (`#`). For a tool that handles sensitive signatures/PDFs, the absence of a legal framework is a significant "solo-preneur" red flag for enterprise buyers.
- **Performance Histograms:** You claim "sub-second retrieval" for PhotoSearch. A skeptic asks: *At what N?* Retrieval over 1,000 images is easy; retrieval over 1,000,000 images on a mid-range Android device is an engineering feat. The "N" is missing.

---

## 4. The Final Verdict: Would I trust you with a real system?

**Verdict: YES.**

**Reasoning:**
I approached this assuming the "45,000 fields" was a buzzword. Finding that you actually have **131,000+ verified fields** documented with Bitstream-level detail flipped my perspective. 

You suffer from **"Engineer's Blindness"**: you over-engineer the core logic (forensics, vector search, async queues) to an elite level, but under-invest in the "boring" business surface (TOS pages, legal links, marketing micro-copy). 

For a hiring manager or a founder, this is the "good" kind of problem. It means you are a high-density engineer who prioritizes systemic truth over marketing polish.

---

### **Actionable Advice to Kill the Skepticism:**
1. **Update the Hero Metric:** Change "45,000+ fields" to "130,000+ fields." If you've done the work, claim the credit.
2. **Fix the SignKit "Red Flags":** Deploy basic TOS/Privacy pages. They don't need to be perfect, but they cannot be `#` if you want to be taken seriously as a product builder.
3. **Clarify the "14 Years":** Own the "Consulting to Founder" pivot more clearly. The 5 years at EY gave you the "Enterprise Operational Context" that most startup engineers lack. Frame it as a strength, not just a time-adder.
