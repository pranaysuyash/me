# Narrator Selection QA

## Decision

Use **Daniel - Steady Broadcaster** (`onwK4e9ZLuTAKqWW03F9`) for the listening-first edition.

The production pace is `1.02`. The audition used `0.96`; the small increase keeps the deliberate technical delivery while reducing drag across a long-form listen.

## Evidence

Three paid auditions were generated with Eleven Multilingual v2 at 44.1 kHz and 192 kbps. Each was checked with `ffprobe`, EBU R128 loudness analysis, and a local Whisper base-English round-trip transcription.

| Voice | Duration | Input loudness | Round-trip result |
| --- | ---: | ---: | --- |
| Daniel | 52.80 s | -24.42 LUFS | Complete and essentially verbatim |
| Eric | 41.24 s | -24.29 LUFS | One short bridge omitted by transcription |
| George | 40.82 s | -24.27 LUFS | Transcript stopped after the opening section |

The round-trip test is an intelligibility check, not a substitute for human listening. The three audition MP3s remain in `book/audio/generated/auditions/` for final taste review.

## Mastering Target

Customer tracks are mastered to mono, 44.1 kHz, -18 LUFS integrated, and -3 dB true peak. The release includes tagged chapter MP3s and a chaptered M4B with cover art.
