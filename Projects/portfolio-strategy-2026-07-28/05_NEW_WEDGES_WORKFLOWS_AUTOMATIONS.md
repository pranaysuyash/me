# New wedges, workflows and automations

## Ranked new opportunity map

### 1. Policy Change Intelligence
**Build from:** insurance_q + Kenya SHIF + MetaExtract + RAG + rule engines.  
**Buyer:** insurer/TPA/broker/employer-benefits/product/compliance teams.  
**Outcome:** traceable old-new change pack, conflicts, affected operations and evidence.  
**Why stronger than a new standalone project:** reuses domain and code while creating an enterprise buyer and recurring update loop.

### 2. Document Intake Quality Gate
**Build from:** SignKit + MetaExtract + extraction/evaluation components.  
**Buyer:** accounting, legal, HR, insurance and compliance operations.  
**Outcome:** reject or route incomplete packets before expensive downstream work.  
**Workflow:** ingest → classify → required-field/signature checks → confidence → human review queue → audit export.

### 3. Renewal Evidence Pack
**Build from:** insurance_q.  
**Buyer:** employer benefits, brokers, TPAs and policyholders.  
**Outcome:** exact dates, terms, obligations, contacts, missing documents and source-linked questions before renewal.  
**Boundary:** no product recommendation or sales commission.

### 4. Claims/Policy AI Evaluation Harness
**Build from:** insurance_q, RadBridge, ICML reproduction and benchmark patterns.  
**Buyer:** insurtech and health-AI product teams.  
**Outcome:** structured gold sets, hallucination/source checks, abstention, latency/cost and regression dashboards.  
**Commercial model:** paid evaluation project and recurring release gate.

### 5. Travel Inquiry Normalizer
**Build from:** Waypoint.  
**Buyer:** boutique agencies/DMCs.  
**Outcome:** structured trip packet, missing questions and CRM/itinerary handoff.  
**Do not build:** full CRM, accounting or supplier system.

### 6. Marketplace Launch Operator
**Build from:** AdShot.  
**Buyer:** one product category first.  
**Outcome:** product-truth intake, approved asset set, factual copy and channel package.  
**Do not build:** another generic generation UI.

### 7. Remote CCTV Coverage Audit
**Build from:** SentinelTwin + FieldCanvas.  
**Buyer:** integrators and multi-site operators.  
**Outcome:** assumptions, blind spots, evidence views, revised layout and report.  
**Constraint:** customer-supplied plan/photos/device data; no Pranay field work.

### 8. Local Sensitive-Audio Intake
**Build from:** EchoPanel family.  
**Buyer:** legal/clinical/research teams only when local processing is mandatory.  
**Outcome:** local capture/transcription → structured case or research packet.  
**Do not build:** general meeting notes.

## Portfolio automations

### A. Weekly evidence ledger
Pull repository activity, live deployment status, customer conversations, supplied data, proposals, paid work, revenue and blockers into one record. Git commits are shown but never treated as progress by themselves.

### B. Evidence-gate bot
Every planned task must declare: project, current evidence tier, next evidence, customer/user source, expected decision and stop rule. Tasks without these fields go to backlog quarantine.

### C. Customer-signal inbox
Capture email/interview/call notes, classify by job, pain, frequency, workaround, buyer, objection, willingness to pay and requested outcome. Link each signal to the project scorecard.

### D. Paid-pilot margin tracker
For each delivery: human minutes, API/model cost, revisions, errors, turnaround, price and reusable percentage. The system flags bespoke work exceeding 30% after the third customer.

### E. Launch health monitor
Payment success, installer/download success, activation, critical errors, support requests and refund/churn signals for launched products.

### F. Monthly competitor and regulatory delta
Only for the three active bets. Record what changed, whether it affects pricing, scope, compliance or wedge, and the decision taken. Avoid broad “AI news” collection.

### G. Portfolio proof generator
Extract verified screenshots, tests, benchmarks, customer outcomes and release notes into case-study drafts for `me`. Human review is mandatory before publishing.

### H. Independent review council
Run the model-specific prompts in `external-review-prompts/`; require evidence references, disconfirming arguments and structured scores. Store raw outputs and synthesis under `reviews/YYYY-MM-DD/`.
