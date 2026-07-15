# Visual System

Book: **No Claim Without Evidence: How to Build AI Systems You Can Verify**

Date: 2026-07-07

## Design Principle

The visual language should make evidence feel inspectable, not magical.

Avoid robots, glowing brains, vague AI clouds, and generic SaaS gradients. The book is about engineering trust through evidence, review, evals, and release gates. The visuals should feel precise, editorial, technical, and calm.

## Cover Candidate

Current candidate:

![No Claim Without Evidence cover candidate 1](../assets/cover/no-claim-without-evidence-cover-candidate-1.png)

Source generation:

- Built-in image generation tool.
- Original generated file: `/Users/pranay/.codex/generated_images/019f3c78-9abd-7a32-a330-b4a4901cd554/ig_09f0443872954390016a4ced535e0081979511c5cb0e34e4e9.png`
- Project copy: `/Users/pranay/Projects/evidence-based-ai-engineering-ebook/assets/cover/no-claim-without-evidence-cover-candidate-1.png`

Manual inspection:

- Title text: correct.
- Subtitle text: correct.
- Author text: correct.
- Visual metaphor: evidence inputs flow into a release gate.
- Risk: generated small text inside cards is decorative and should not be treated as exact copy.

## Palette

Use a restrained technical palette:

```text
Graphite: #071017
Ink: #101820
Warm white: #F7F2E8
Paper: #EFE7D8
Evidence cyan: #21C4F3
Review amber: #D8A33A
Pass green: #4FD08A
Risk red: #D9534F
```

Do not let the package become a one-note blue/purple AI theme. Cyan is the evidence signal, amber is the review signal, and graphite is the trust surface.

## Typography

Recommended:

- Cover/display: Inter Tight, Satoshi, or Helvetica Now Display.
- Body: Source Serif 4, Charter, or Georgia for ebook/PDF readability.
- Code/data blocks: JetBrains Mono or IBM Plex Mono.

Rules:

- Keep chapter headings direct and readable.
- Use mono blocks for eval records, JSON, YAML, and release gates.
- Do not over-decorate technical examples. The credibility comes from clarity.

## Diagram System

Use simple, repeatable diagram motifs:

1. Evidence Trail
   - Claim
   - Source
   - Evidence link
   - Status
   - Action

2. Three-Layer AI System
   - Model
   - Pipeline
   - Data/configuration

3. Extraction Decision Tree
   - Supported
   - Not present
   - Ambiguous
   - Unreadable
   - Conflicting
   - Review

4. Eval Improvement Loop
   - Run eval
   - Log failure
   - Create work item
   - Fix owning layer
   - Add regression
   - Release gate

5. Release Gate
   - Prompt/model/schema change
   - Eval set
   - Thresholds
   - Waivers
   - Ship/block decision

For final publication, these diagrams are better as deterministic SVG/HTML or designed vector art, not generated raster images with text. Generated images are useful for chapter-heading mood pieces; exact diagrams should be manually typeset.

## Chapter Heading Image Prompts

Use the built-in image generation path for atmospheric chapter openers if desired. Keep generated images mostly text-free to avoid typography errors.

### Part 1: The Evidence Habit

```text
Use case: scientific-educational
Asset type: ebook chapter opener
Primary request: abstract evidence trail showing a claim card connected to highlighted source snippets and a verification check.
Style/medium: modern editorial technical illustration, no text, no logos.
Composition/framing: wide banner with left-to-right flow and generous negative space.
Color palette: graphite, warm white, cyan evidence highlights, restrained amber review marks.
Constraints: no readable text, no robots, no human faces, no watermark.
```

### Part 2: From AI Output To AI Systems

```text
Use case: infographic-diagram
Asset type: ebook chapter opener
Primary request: layered AI system metaphor with three translucent layers: model, pipeline, and data/configuration, connected by clean evidence paths.
Style/medium: premium technical editorial illustration, text-free.
Composition/framing: wide banner, three horizontal layers, precise and calm.
Color palette: graphite, paper white, cyan, amber.
Constraints: no readable text, no robots, no cloud cliches, no watermark.
```

### Part 3: The Eval Contract

```text
Use case: scientific-educational
Asset type: ebook chapter opener
Primary request: a structured eval manifest, golden cases, and evidence pins arranged like a quality-control bench.
Style/medium: polished technical nonfiction illustration, text-free.
Composition/framing: overhead desk composition, clean grid.
Color palette: warm paper, graphite, cyan checkmarks, amber review markers.
Constraints: no readable text, no fake brand names, no watermark.
```

### Part 4: Workflow Evals

```text
Use case: productivity-visual
Asset type: ebook chapter opener
Primary request: branching workflow showing continue, stop, fallback, review, and release-gate paths as abstract nodes.
Style/medium: high-end systems diagram illustration, text-free.
Composition/framing: wide pipeline with one branch stopping cleanly and another going to review.
Color palette: graphite, cyan, amber, muted green.
Constraints: no readable text, no robots, no watermark.
```

### Part 5: Release Discipline

```text
Use case: ads-marketing
Asset type: ebook chapter opener
Primary request: a release gate lit by evidence trails, with check records flowing into a clear ship/block decision point.
Style/medium: premium editorial technology illustration, no readable text.
Composition/framing: cinematic but restrained, release gate on right, evidence trail from left.
Color palette: graphite, cyan evidence, amber review, warm white.
Constraints: no readable text, no fake UI brands, no watermark.
```

## Infographic Ideas

### Infographic 1: Clean JSON Is Not Truth

Message: "A valid schema can still contain an unsupported field."

Structure:

- Left: source document with terminal absent.
- Middle: clean JSON with terminal filled.
- Right: corrected field record with `not_present_in_document`.

Use in Chapter 2 or Chapter 8.

### Infographic 2: What An Eval Should Measure

Message: "Accuracy is only one axis."

Axes:

- Critical-field accuracy
- Unsupported inference rate
- Evidence coverage
- Cost
- Latency
- Review effort
- Regression pass rate

Use in Chapter 9 or Chapter 10.

### Infographic 3: The Eval Loop

Message: "Scores compare. Logs improve."

Loop:

Eval run -> failure log -> work item -> fix owning layer -> regression case -> release gate.

Use in Chapter 12 or Chapter 16.

## Publication Asset Checklist

- [x] Cover candidate image generated and copied into project.
- [x] Cover text manually inspected.
- [x] Final PDF cover presence proofed through Quick Look thumbnail.
- [x] Deterministic diagrams produced as SVG.
- [ ] Chapter openers generated only if they improve the paid package.
- [ ] Gumroad/Medium/LinkedIn preview images exported at platform sizes.
