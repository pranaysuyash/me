# Meeting capture and searchable retrieval — starter kit

Use this artifact to scope a consent-aware workflow for recording, transcription, search, retrieval, export, and recovery.

This is not legal advice about recording consent. Verify the applicable law, organisation policy, and participant expectations before recording.

## 1. Purpose and user

- Who starts and stops recording?
- What must the user see while capture is active?
- Which audio sources are required: microphone, system audio, or both?
- What should be searchable later?
- What must happen if transcription fails?

## 2. Consent and policy

Define:

- participant notice
- explicit or implied consent rule
- visible recording state
- retention period
- export/delete rights
- operator access
- cloud/provider boundary
- sensitive-topic handling

## 3. Workflow states

1. Preflight permissions
2. Consent/notice
3. Select audio sources
4. Start capture
5. Show live recording health
6. Stop and finalize audio
7. Transcribe with timestamps
8. Index transcript and metadata
9. Search and retrieve source moments
10. Export, delete, or recover

## 4. Session record

```json
{
  "session_id": "meeting-2026-07-22-001",
  "started_at": "2026-07-22T10:30:00Z",
  "ended_at": "2026-07-22T11:12:44Z",
  "sources": ["microphone", "system_audio"],
  "capture_status": "complete",
  "transcription_status": "complete",
  "transcript_model": "declared-model-version",
  "search_index_status": "ready",
  "consent_recorded": true
}
```

## 5. Operator-visible health

Show:

- microphone/system-audio permission
- active source indicators
- input level or silence warning
- elapsed time
- output location
- disk-space warning
- transcription progress
- partial failure state
- recovery action

## 6. Transcript contract

Retain:

- timestamp ranges
- speaker labels only when supported and clearly qualified
- source audio locator
- transcription model/version
- correction history
- language
- confidence or uncertainty where meaningful

## 7. Search contract

A result should include:

- matched text
- timestamp
- session title/date
- source context before and after the match
- action to play or open the source moment
- correction state

## 8. Failure and recovery checks

Test:

- permission denied
- input device disconnected
- system audio unavailable
- silent source
- disk full
- application crash during capture
- partial audio file
- transcription timeout
- unsupported language
- index failure after transcript succeeds
- duplicate session
- delete/export failure

## 9. Privacy and security boundary

Decide:

- local versus provider transcription
- encryption at rest
- whether filenames or transcript text enter telemetry
- retention and deletion
- backups
- access control
- whether embeddings leave the device
- how model/provider changes are disclosed

## 10. Acceptance gate

- recording state is unmistakable
- expected sources are captured
- audio survives interruption or recovery tests
- transcript links to source timing
- search returns relevant source moments
- export opens independently
- delete behavior is verified
- privacy and consent text matches actual implementation

## 11. Scoping packet

Bring:

- target operating systems
- required audio sources
- consent policy
- expected languages
- local/cloud preference
- representative recordings
- search/retrieval needs
- export formats
- retention and deletion requirements

Related surface:

- Audited case: `/work/echopanel`
