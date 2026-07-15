#!/usr/bin/env python3
"""Build a static sales page preview for the ebook."""

from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "dist" / "sales-page.html"


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>No Claim Without Evidence</title>
  <style>
    :root {
      --ink: #101820;
      --paper: #fffdf8;
      --muted: #5f6872;
      --cyan: #21c4f3;
      --amber: #d8a33a;
      --line: #ded6c8;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", Arial, sans-serif;
      color: var(--ink);
      background: #f0eadf;
    }
    main { background: var(--paper); }
    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
      gap: 56px;
      align-items: center;
      max-width: 1180px;
      margin: 0 auto;
      padding: 96px 32px 80px;
    }
    .eyebrow {
      color: #8d650f;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 13px;
    }
    h1 {
      font-size: clamp(48px, 7vw, 86px);
      line-height: 0.95;
      letter-spacing: 0;
      margin: 18px 0 22px;
    }
    .subtitle {
      font-size: 24px;
      line-height: 1.35;
      color: #2f3b45;
      max-width: 650px;
    }
    .cta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-top: 34px;
    }
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      padding: 0 20px;
      border: 1px solid var(--ink);
      color: var(--paper);
      background: var(--ink);
      text-decoration: none;
      font-weight: 700;
      border-radius: 6px;
    }
    .button.secondary {
      color: var(--ink);
      background: transparent;
    }
    .cover {
      width: min(100%, 420px);
      display: block;
      margin: 0 auto;
      border-radius: 6px;
      box-shadow: 0 24px 70px rgba(16, 24, 32, 0.28);
    }
    section {
      border-top: 1px solid var(--line);
      padding: 64px 32px;
    }
    .section-inner {
      max-width: 980px;
      margin: 0 auto;
    }
    h2 {
      font-size: 36px;
      line-height: 1.1;
      margin: 0 0 18px;
    }
    p, li {
      font-size: 19px;
      line-height: 1.55;
      color: #2f3b45;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 24px;
      margin-top: 28px;
    }
    .panel {
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 24px;
      background: #fffaf0;
    }
    .price {
      font-size: 42px;
      font-weight: 800;
      margin: 8px 0;
    }
    code {
      font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
      background: #f0ece3;
      padding: 2px 5px;
      border-radius: 4px;
    }
    footer {
      padding: 40px 32px;
      text-align: center;
      color: var(--muted);
    }
    @media (max-width: 840px) {
      .hero { grid-template-columns: 1fr; padding-top: 48px; }
      .grid { grid-template-columns: 1fr; }
      .cover { max-width: 340px; }
    }
  </style>
</head>
<body>
  <main>
    <div class="hero">
      <div>
        <div class="eyebrow">Practical ebook for AI builders</div>
        <h1>No Claim Without Evidence</h1>
        <p class="subtitle">How to build AI systems you can verify: evals, evidence links, review rules, agent action traces, and release gates for real product workflows.</p>
        <div class="cta-row">
          <a class="button" href="#buy">Get the ebook</a>
          <a class="button secondary" href="no-claim-without-evidence.pdf">Preview the PDF</a>
        </div>
      </div>
      <img class="cover" src="../public/books/no-claim-without-evidence/cover.png" alt="No Claim Without Evidence ebook cover">
    </div>

    <section>
      <div class="section-inner">
        <h2>Clean JSON is not trust.</h2>
        <p>The field can be filled and still be unsupported. The schema can pass and still hide a hallucination. The model can sound confident and still be wrong.</p>
        <p>This book gives builders a practical operating model for answering one question: <strong>is this AI workflow safe enough to trust, improve, or ship?</strong></p>
      </div>
    </section>

    <section>
      <div class="section-inner">
        <h2>What you will learn</h2>
        <div class="grid">
          <div class="panel"><p>Define ground truth as a product contract, not just an answer key.</p></div>
          <div class="panel"><p>Separate extraction, normalization, routing, review, and data-layer failures.</p></div>
          <div class="panel"><p>Evaluate unsupported inference, evidence coverage, cost, latency, and review effort.</p></div>
          <div class="panel"><p>Design release gates for prompt, model, schema, routing, and review-policy changes.</p></div>
          <div class="panel"><p>Build agent action evals for tool choice, arguments, approvals, and audit trails.</p></div>
          <div class="panel"><p>Treat schemas, lookup tables, thresholds, and review rules as product code.</p></div>
        </div>
      </div>
    </section>

    <section>
      <div class="section-inner">
        <h2>The running example</h2>
        <p>Airline-ticket extraction makes the failure obvious: if the ticket does not show a terminal, a fallback model returning <code>Terminal 2</code> is not an improvement. It is unsupported inference.</p>
        <p>The book turns that single example into a complete system: source evidence, field status, eval cases, stop conditions, review, regression, and release gates.</p>
      </div>
    </section>

    <section id="buy">
      <div class="section-inner">
        <h2>Get the ebook</h2>
        <p>One purchase includes both formats. Dodo Payments can present tax-inclusive localized pricing at checkout.</p>
        <div class="price">₹799 India / $14.99 global</div>
        <p>Deliver the PDF and EPUB as protected product entitlements after payment.</p>
        <div class="cta-row">
          <a class="button" href="no-claim-without-evidence.pdf">Open PDF</a>
          <a class="button secondary" href="no-claim-without-evidence.epub">Open EPUB</a>
        </div>
      </div>
    </section>
  </main>
  <footer>Copyright 2026 Pranay Suyash</footer>
</body>
</html>
""",
        encoding="utf-8",
    )
    print(OUT)


if __name__ == "__main__":
    main()
