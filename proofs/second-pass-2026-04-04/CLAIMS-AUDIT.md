# Claims Audit: Second-Pass Correction

## Date: 2026-04-04

This document tracks every specific claim that was softened, removed, or rewritten during the second-pass copy correction.

---

## Removed Claims

### MetaExtract

| Original Claim                                                  | Action Taken                                                                           | Reason                                      |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------- |
| "Handles 1000+ pages/hour on single instance"                   | Replaced with "Designed for batch processing of heterogeneous document sets"           | Cannot verify exact throughput number       |
| "Sub-2s response for single-page documents"                     | Replaced with "Single-page extraction completes in a few seconds on standard hardware" | Cannot verify exact latency                 |
| "~80% manual data entry reduction"                              | Replaced with "Reduced manual data entry for core healthcare document workflows"       | Percentage unverifiable, claim too specific |
| "Deployed in production handling thousands of documents weekly" | Replaced with "Operational in production document-heavy workflows"                     | "Thousands weekly" too specific to verify   |

### SignKit

| Original Claim                                                                  | Action Taken                                                                      | Reason                                     |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------ |
| "Signature extraction accuracy >90% on clean documents, >75% on degraded scans" | Replaced with "Signature extraction handles clean and degraded scanned documents" | Accuracy percentages cannot be verified    |
| "Batch processing workflows save legal teams hours per week"                    | Replaced with "Batch processing workflows for legal and financial teams"          | "Hours per week" is vague and unverifiable |

### PhotoSearch

| Original Claim                                                         | Action Taken                                                                   | Reason                                     |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------ |
| "Semantic retrieval over 10K+ photo libraries"                         | Replaced with "Natural language retrieval across local photo libraries"        | "10K+" library size not verified           |
| "sub-second retrieval on common semantic query paths after warm cache" | Replaced with "Semantic queries return results quickly on indexed collections" | "Sub-second" too specific, cache-dependent |

### EchoPanel

| Original Claim                                          | Action Taken                                                          | Reason                                                         |
| ------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------- |
| "Real-time transcription with Whisper on Apple Silicon" | Replaced with "On-device transcription with Whisper on Apple Silicon" | "Real-time" implies latency guarantee; softened to "on-device" |
| "Real-time streaming to backend"                        | Replaced with "Streaming to backend for near-real-time processing"    | More honest about latency                                      |

### Homepage

| Original Claim                     | Action Taken                                                                 | Reason                                        |
| ---------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------- |
| "~$1M ARR platform growth context" | Removed entirely, replaced with "Insurance processing: ~4 weeks to ~10 days" | Revenue claim too sensitive to state publicly |

---

## Softened Language

| Location              | Before                                                                         | After                                                                     |
| --------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| EchoPanel tagline     | "Local-first meeting intelligence — capture, transcribe, search, and retrieve" | "Record a meeting, find what was said later"                              |
| EchoPanel description | "transcribes in near real time"                                                | "transcribes it, and makes the transcript searchable after the fact"      |
| PhotoSearch tagline   | "Local-first natural language media search and analysis workstation"           | "Search your photos by describing what is in them"                        |
| MetaExtract tagline   | "Large modular extraction system for heterogeneous document workflows"         | "Modular extraction system for messy, inconsistent document workflows"    |
| SignKit tagline       | "Signature extraction & PDF signing — commercial desktop product"              | "Signature extraction and PDF signing, shipped as a paid desktop product" |

---

## "Applied AI" Removal

All instances of "applied AI" and generic AI buzzwords were removed from:

- `src/content/projects.json` (services section)
- `src/app/page.tsx` (hero copy, metadata)
- `src/app/layout.tsx` (root metadata)
- `src/app/work-with-me/page.tsx` (hero, engagement cards)
- `src/app/hire-me/page.tsx` (hero, role descriptions)
- `src/app/about/page.tsx` (body copy)

---

## Em Dash Removal

All em dashes (—) were replaced with periods, colons, or sentence breaks across:

- Homepage hero copy
- Root metadata (layout.tsx)
- Hero system panel component
- All project descriptions in projects.json

---

## "What this proves" → "Why it matters" Changes

Every instance of the label "What this proves:" was changed to "Why it matters:" in:

- `src/app/page.tsx` (flagship project cards)
- `src/app/work/[slug]/page.tsx` (project detail pages)
