# Local signature and document handling — starter kit

Use this artifact to scope a privacy-sensitive workflow for isolating signature imagery, cleaning it, placing it into a PDF or document, and exporting the result under user control.

This is not identity verification, a digital-signature certificate system, legal advice, or a guarantee that a signature is authentic or enforceable.

## 1. Workflow purpose

- What source contains the signature or mark?
- Is the goal reusable image extraction, one-time placement, or both?
- Must files remain local or inside a controlled environment?
- Which document types receive the result?
- Does the workflow need a human confirmation before export?

## 2. Input contract

Record:

| Input | Allowed types | Typical size | Colour/background | Failure examples |
|---|---|---:|---|---|
| Signature scan | PNG, JPEG, PDF page | 1–10 MB | white/off-white | shadow, ruled paper, crop |
| Target document | PDF | 1–100 pages | mixed | rotated pages, password |

Never assume that every dark region is part of the intended mark.

## 3. Processing stages

1. Open local source
2. Select page or region
3. Estimate background
4. Apply threshold and optional denoise
5. Preserve stroke edges
6. Make background transparent when requested
7. Crop to content with padding
8. Preview at intended placement size
9. Place, move, resize, and confirm
10. Export a new file without overwriting the source by default

## 4. Cleanup controls

A useful operator surface should expose:

- threshold
- despeckle strength
- transparent/opaque background
- crop padding
- invert option for unusual scans
- undo/reset
- before/after preview
- foreground pixel or content-boundary feedback

## 5. Placement record

```json
{
  "source_asset": "signature-cleaned.png",
  "target_document": "agreement.pdf",
  "page": 3,
  "x": 412,
  "y": 688,
  "width": 148,
  "height": 52,
  "rotation": 0,
  "confirmed_by_user": true
}
```

## 6. Failure and recovery checks

Test:

- no foreground detected
- multiple disconnected marks
- low contrast
- coloured paper
- source file locked or corrupt
- target PDF encrypted
- placement outside page bounds
- rotated page
- export destination unavailable
- repeated export and filename collision
- application close before save

## 7. Privacy boundary

Document:

- whether any file leaves the device
- where temporary files are created
- when temporary files are deleted
- whether previews are cached
- how crash recovery works
- whether telemetry contains filenames or document content

## 8. Acceptance checks

- source remains unchanged
- cleaned asset is visibly faithful at target scale
- background behavior matches user choice
- crop does not cut strokes
- placement is recoverable before final export
- exported PDF opens in an independent viewer
- no hidden network upload occurs in local mode
- errors explain what the user can do next

## 9. Scoping packet

Bring:

- representative source images
- representative target PDFs
- expected placement rules
- local/cloud policy
- supported operating systems
- packaging and update expectations
- whether reusable asset storage is required
- any legal or compliance review already completed

Related surfaces:

- Live cleanup mechanism: `/systems#capability-tab-cleanup`
- Audited case: `/work/sig-ext-fastapi`
