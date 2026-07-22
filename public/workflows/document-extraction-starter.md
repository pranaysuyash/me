# Evidence-linked document extraction — starter kit

Use this artifact to scope a recurring PDF, scan, form, invoice, record, or packet workflow before choosing OCR, rules, models, or infrastructure.

This is a planning and quality artifact. It is not a production parser, legal opinion, security review, or guarantee of extraction accuracy.

## 1. Operating problem

- Who receives the source files?
- Through which channels do they arrive?
- What business action depends on the extracted data?
- What is the cost of a wrong field, missing field, or delayed review?
- Which exceptions consume the most operator time?

## 2. Representative source set

Collect examples for every meaningful document family:

| Family | Native text / scan | Languages | Typical pages | Volume | Known failures |
|---|---|---|---:|---:|---|
| Example | Scan | English | 2 | 500/month | Rotated page, faint total |

Include clean examples, poor scans, handwritten additions, multipage packets, duplicates, conflicting values, and documents where a required field is genuinely absent.

## 3. Field contract

For every field, define:

| Field | Type | Required | Source location | Allowed normalization | Inference allowed | Failure action |
|---|---|---|---|---|---|---|
| invoice_number | string | yes | header | trim whitespace | no | review |

Use explicit statuses:

- `supported`
- `not_present`
- `unreadable`
- `ambiguous`
- `conflicting`
- `human_corrected`

## 4. Evidence record

```json
{
  "field": "total_amount",
  "raw_value": "INR 1,234.50",
  "normalized_value": 1234.5,
  "status": "supported",
  "source_locator": "page=1; line=18",
  "evidence_excerpt": "Total: INR 1,234.50",
  "action": "accept",
  "reviewed_by": null
}
```

## 5. Workflow states

1. Intake
2. File safety and type checks
3. Native text / metadata / OCR / layout extraction
4. Field candidate extraction
5. Schema validation
6. Evidence linking
7. Normalization
8. Policy and confidence routing
9. Human review when required
10. Export or downstream action
11. Audit record and failure visibility

## 6. Review queue requirements

A reviewer should be able to see:

- source document and exact evidence location
- extracted and normalized value
- confidence/status semantics
- conflicting candidates
- reason the item was routed
- accept, correct, reject, or defer actions
- previous decisions and timestamps

## 7. Quality gate

Define thresholds by failure cost rather than one average score.

```yaml
critical_field_accuracy: ">= 98%"
unsupported_inference_rate: "<= 0.5%"
evidence_link_coverage_critical: ">= 99%"
schema_validity: "100%"
regression_cases_pass: "100%"
zero_tolerance:
  - unsupported customer-facing field
  - silent fallback after provider failure
  - conflicting critical value accepted without review
```

## 8. Failure and recovery checks

Test:

- corrupt or encrypted file
- empty upload
- unsupported format
- duplicate document
- timeout and provider failure
- OCR failure
- valid JSON with wrong values
- partial extraction
- conflicting pages
- reviewer correction
- export failure after approval
- retry without duplicate downstream action

## 9. Production evidence to retain

- source revision
- parser/prompt/model version
- schema version
- pipeline path used
- validation result
- fallback and retry usage
- latency and cost where relevant
- reviewer decision
- downstream action result

## 10. Scoping packet

Bring these to a project or consultation:

- 20–50 representative files
- target field list
- current manual workflow
- failure examples
- downstream system or export format
- expected volume and turnaround
- privacy and retention constraints
- who reviews exceptions
- what must be true before production use

Related surfaces:

- Live constrained mechanism: `/systems#capability-tab-extraction`
- Audited case: `/work/metaextract`
- Focused offer: `/document-workflows`
