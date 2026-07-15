# No Claim Without Evidence: Audio Edition

This directory contains the listening-first adaptation of the canonical ebook.
It is not a verbatim reading. Code, tables, schemas, URLs, and visual templates
are explained for listeners while the ebook remains the reference edition.

## Production Contract

- One introduction, 19 chapter tracks, and one closing track.
- The chapter titles and argument order follow the canonical manuscript.
- No citation identifiers, URLs, Markdown syntax, or code punctuation are read.
- Visual artifacts are summarized and identified as ebook companion material.
- Paid generation is chapter-based, resumable, hash-addressed, and credit-gated.
- Raw provider output, mastered tracks, QA reports, and request metadata are
  preserved separately.
- The API key is loaded from `/Users/pranay/Projects/media_experiments/.env.local`
  and is never copied into this repository.

## Commands

```bash
npm run book:audio:build
npm run book:audio:plan
npm run book:audio:generate
npm run book:audio:master
npm run book:audio:validate
```

`plan` is read-only. `generate` makes paid ElevenLabs requests.
Generation refuses to start when the live balance cannot cover the complete
remaining plan plus the configured reserve.

The source adaptation lives in `book/audio/scripts/`. Generated narration text,
provider responses, request records, QA transcripts, and mastered tracks live in
`book/audio/generated/`. Customer-ready outputs are written to `dist/audio/`:

- a chaptered, covered M4B;
- a ZIP of covered and tagged chapter MP3s;
- a release manifest with duration, mastering targets, sizes, and SHA-256 hashes.

## Current Production State

The 21-track adaptation is complete at 51,195 characters and 7,824 words.
Daniel was selected after three paid auditions and a local speech-to-text
round-trip check; see `VOICE_QA.md`. Full narration is intentionally pending
until the live provider balance resets on July 16, 2026 at 2:40 PM IST.

## Product Language

Until every mastered track passes listening QA, market this as an **audio
companion**. After full track-by-track listening QA, it can be sold as **No
Claim Without Evidence: The Audio Edition** alongside the ebook.
