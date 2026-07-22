# Visual evidence inspection — starter kit

Use this artifact to define a deterministic evidence layer for an image workflow before asking a model to classify, describe, extract, or decide.

This is not an object detector, OCR system, segmentation model, or production vision pipeline.

## 1. Decision being supported

- What will a person or system do with the result?
- Which mistakes are expensive or irreversible?
- Which properties can be measured directly from pixels?
- Which outputs require semantic inference?
- What evidence must remain visible to a reviewer?

## 2. Source contract

Record:

| Source family | Format | Dimensions | Colour space | Typical defects | Sensitive content |
|---|---|---:|---|---|---|
| Example scene | JPEG | 1920×1080 | sRGB | blur, glare | faces |

Include representative low-light, rotated, compressed, cropped, duplicated, and adversarial examples.

## 3. Deterministic evidence layer

Possible measurements:

- width and height
- aspect ratio
- colour channels and dominant family
- mean luminance
- contrast range
- clipping or near-white/near-black ratio
- blur proxy
- edge density
- strongest boundary region
- file metadata and capture time when trustworthy

## 4. Evidence-to-model contract

```json
{
  "source_id": "scene-0042",
  "pixel_evidence": {
    "width": 1920,
    "height": 1080,
    "mean_luminance": 0.42,
    "edge_density": 0.18,
    "strongest_boundary_region": "upper-right"
  },
  "model_claim": {
    "label": "loading-bay obstruction",
    "confidence": 0.78
  },
  "review_policy": "review_if_confidence_below_0.85_or_low_light"
}
```

## 5. Workflow states

1. Decode source
2. Validate file and dimensions
3. Measure deterministic evidence
4. Generate derived views such as edge map or crop
5. Run semantic model when needed
6. Link model claim to source region and deterministic evidence
7. Apply policy
8. Review exception
9. Export result and audit trail

## 6. Review surface requirements

Show:

- original image
- derived evidence view
- selected source region
- model claim and confidence
- reason for routing
- alternative candidates where relevant
- accept, correct, reject, or defer
- source/model/pipeline versions

## 7. Failure tests

- corrupt image
- unsupported format
- huge dimensions
- all-black/all-white source
- low light
- glare
- repeated compression
- rotated source
- duplicate source
- model timeout
- model returns valid structure with unsupported claim
- no evidence region
- conflicting deterministic and semantic signals

## 8. Acceptance gate

Define separate measures for:

- source decode success
- deterministic metric correctness
- region/evidence coverage
- class precision and recall
- unsupported-claim rate
- review rate
- latency and cost
- critical regression cases

## 9. Privacy boundary

Decide whether images:

- remain in-browser or on-device
- enter a controlled backend
- reach a third-party model provider
- are retained for evaluation
- contain faces, IDs, medical data, or customer material

## 10. Scoping packet

Bring:

- 30–100 representative images
- target decisions or fields
- known failure examples
- required evidence/region behavior
- acceptable review rate
- privacy and retention policy
- target latency and device constraints

Related surfaces:

- Live pixel mechanism: `/systems#capability-tab-inspection`
- Evidence-led case: `/work/metaextract`
