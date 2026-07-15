# Audio Edition Production Log

## July 15, 2026 - Adaptation And Voice Lock

- Adapted the canonical ebook into 21 listening-first tracks: one introduction, 19 chapters, and one closing.
- Final narration budget: 51,195 characters and 7,824 words.
- Generated paid auditions for Daniel, George, and Eric with Eleven Multilingual v2.
- Selected Daniel after file validation, loudness measurement, and local Whisper round-trip transcription.
- Locked production to Eleven Flash v2.5 at 192 kbps MP3, with a 3,500-credit reserve.
- Added idempotent generation records, two-pass loudness mastering, chapter metadata, cover embedding, M4B export, MP3 ZIP packaging, and release hashes.
- Added an exclusive local generation lock and a fresh balance check before every paid chapter request. A concurrent shared-key consumer can therefore stop the run between chapters, not silently exhaust the reserve.

## Three-Pass Review

1. **Immediate correctness and completeness:** confirmed 21 ordered tracks, exact chapter titles, 51,195 narration characters, spoken reflections, chapter bridges, no code fences, URLs, citation identifiers, or Markdown tables. Fixed the missing protected output root.
2. **Architecture and long-term viability:** preserved source scripts, generated narration, provider files, request records, QA evidence, raw audio, mastered audio, and customer outputs as separate layers. Added hash-based resume behavior, live credit gates, a local generation lock, two-pass mastering, and deterministic release manifests.
3. **Rule compliance and supervision readiness:** rebuilt and validated the canonical ebook, verified cleanup protection, preserved all paid auditions and historical scripts, kept the API key out of the repository, and recorded the exact external blocker and resume commands below.

## Shared-Credit Incident

At the beginning of the pass, the Creator account reported 30,556 credits remaining. The three controlled auditions used approximately 2,064 credits. During the same session, another process using the shared API key generated several Daniel and Jessica samples and Eleven v3 clips with different settings. The live balance fell to effectively zero before full-book generation began.

No chapter-generation request from this pipeline was sent. `book/tools/generate_audiobook.py` stopped before production because the live balance could not cover the estimated 25,598 credits plus reserve. The account reports its next reset at **July 16, 2026, 2:40:20 PM IST**.

The next production action is:

```bash
npm run book:audio:plan
npm run book:audio:generate
npm run book:audio:master
npm run book:audio:validate
```

Only run `generate` after `plan` shows a non-negative post-generation reserve. The generation records prevent completed tracks from being charged twice and halt on an ambiguous prior request.
