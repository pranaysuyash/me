# PROJECT SCOPING & PRICING BY TYPE

**How to scope, price, and deliver different types of consulting projects**

---

## TYPE 1: AI/ML PROTOTYPES

### Sub-Type 1A: Document Extraction/OCR

**Scope Questions:**
- How many document types? (Single vs. multiple)
- What's the volume? (10/day vs. 10,000/day)
- What's the accuracy requirement? (90% vs. 99%)
- Do you need human review workflow?
- Integration requirements? (API, webhook, batch)

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | Single doc type, simple fields, API only | $3-5K | 1-2 weeks |
| **Professional** | Multiple doc types, complex fields, validation | $6-10K | 2-3 weeks |
| **Enterprise** | Custom models, high volume, human-in-loop | $12-20K | 4-6 weeks |

**Deliverables:**
- Working extraction pipeline
- API endpoint
- Documentation
- Accuracy report
- Deployment guide

**Case Study:** MetaExtract
- Scope: 45K+ metadata fields, multiple file types
- Price: Would charge $15-20K today
- Timeline: 4-5 weeks
- Tech: Python, FastAPI, Tesseract, PostgreSQL

---

### Sub-Type 1B: Voice AI / Transcription

**Scope Questions:**
- Real-time or batch processing?
- Audio quality? (Clean studio vs. noisy call)
- Languages? (Single vs. multiple)
- On-device or cloud?
- Speaker identification needed?

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | Batch transcription, single language, cloud API | $3-5K | 1-2 weeks |
| **Professional** | Real-time, multiple languages, basic diarization | $6-10K | 2-3 weeks |
| **Enterprise** | On-device, custom models, advanced diarization | $12-18K | 4-6 weeks |

**Deliverables:**
- Transcription service
- API/frontend
- Audio preprocessing pipeline
- Accuracy benchmarks
- Deployment docs

**Case Study:** EchoPanel
- Scope: macOS app, real-time transcription, entity extraction
- Price: Would charge $10-12K
- Timeline: 3-4 weeks
- Tech: Swift, Whisper, FastAPI

---

### Sub-Type 1C: RAG (Retrieval Augmented Generation)

**Scope Questions:**
- How many documents? (100s vs. 100,000s)
- Document formats? (PDF, web, database)
- Update frequency? (Static vs. real-time)
- Multi-turn conversation needed?
- Custom knowledge graphs?

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | 1K docs, single source, basic Q&A | $5-8K | 2-3 weeks |
| **Professional** | 10K docs, multiple sources, citations | $10-15K | 3-4 weeks |
| **Enterprise** | 100K+ docs, real-time sync, multi-modal | $20-35K | 6-10 weeks |

**Deliverables:**
- RAG pipeline
- Vector database setup
- Chat interface
- Evaluation framework
- Monitoring dashboard

**Case Study:** Healthcare RAG
- Scope: 30+ client docs, healthcare Q&A, HIPAA considerations
- Price: Would charge $15-20K
- Timeline: 4-5 weeks
- Tech: Python, LangChain, Pinecone, OpenAI

---

### Sub-Type 1D: AI Agents / Automation

**Scope Questions:**
- Single agent or multi-agent?
- What tasks? (Simple vs. complex reasoning)
- Human approval points?
- Tool integrations? (APIs, databases, etc.)
- Error handling requirements?

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | Single agent, 2-3 tools, simple workflow | $4-6K | 2 weeks |
| **Professional** | Multi-agent, 5+ tools, complex reasoning | $10-15K | 3-4 weeks |
| **Enterprise** | Multi-agent swarm, human-in-loop, audit trails | $20-40K | 6-10 weeks |

**Deliverables:**
- Agent system
- Tool integrations
- Human oversight UI
- Logging/audit system
- Documentation

**Case Study:** Agents Platform
- Scope: Multi-agent, human-gated risk tiers, multiple LLM support
- Price: Would charge $25-35K
- Timeline: 6-8 weeks
- Tech: TypeScript, LangGraph, OpenAI, Anthropic

---

## TYPE 2: WORKFLOW AUTOMATION

### Sub-Type 2A: Document Processing Pipeline

**Scope Questions:**
- Input sources? (Email, upload, API, etc.)
- Processing steps? (OCR, classify, extract, validate, route)
- Output destinations? (Database, CRM, storage)
- Error handling? (Retry, notify, quarantine)
- Volume? (10s vs. 1000s per day)

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | 2-3 steps, single source, basic error handling | $3-5K | 1-2 weeks |
| **Professional** | 5+ steps, multiple sources, retry logic | $6-10K | 2-3 weeks |
| **Enterprise** | Complex routing, approval workflows, audit logs | $12-20K | 4-6 weeks |

**Deliverables:**
- Automation pipeline
- Error handling system
- Monitoring dashboard
- Documentation
- Training session

**Case Study:** MedPiper Insurance Workflow
- Scope: Email → OCR → Extract → Validate → CRM
- Price: Would charge $8-12K
- Timeline: 3-4 weeks
- Impact: Reduced processing by 2 days

---

### Sub-Type 2B: Data Pipeline / ETL

**Scope Questions:**
- Source systems? (Database, API, files, etc.)
- Data volume? (GBs vs. TBs)
- Transformation complexity? (Simple mapping vs. complex logic)
- Destination? (Warehouse, lake, database)
- Frequency? (Real-time, hourly, daily)

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | 1-2 sources, simple transforms, daily batch | $2-4K | 1 week |
| **Professional** | 3-5 sources, complex transforms, hourly | $5-8K | 2-3 weeks |
| **Enterprise** | 10+ sources, real-time, complex orchestration | $12-20K | 4-6 weeks |

**Deliverables:**
- Data pipeline
- Transformation logic
- Error handling
- Monitoring/alerting
- Documentation

---

### Sub-Type 2C: Integration Automation

**Scope Questions:**
- Which systems? (CRM, ERP, marketing tools, etc.)
- Data flow direction? (One-way vs. bi-directional)
- Sync frequency? (Real-time vs. batch)
- Conflict resolution? (Master data rules)
- Error handling requirements?

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | 2 systems, one-way, daily sync | $2-4K | 1 week |
| **Professional** | 3-4 systems, bi-directional, hourly | $5-10K | 2-3 weeks |
| **Enterprise** | 5+ systems, real-time, complex logic | $12-25K | 4-8 weeks |

**Deliverables:**
- Integration workflows
- Data mapping
- Error handling
- Monitoring
- Documentation

---

## TYPE 3: TECHNICAL ADVISORY

### Sub-Type 3A: Architecture Review

**Scope Questions:**
- Current architecture state? (Greenfield vs. legacy)
- Scale requirements? (Current vs. 10x growth)
- Team size? (Solo vs. 50+ engineers)
- Compliance needs? (SOC 2, HIPAA, etc.)
- Timeline for recommendations? (Urgent vs. strategic)

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | Single system review, written report | $2-3K | 1 week |
| **Professional** | Full architecture review, roadmap, presentation | $4-6K | 2-3 weeks |
| **Enterprise** | Multi-system, compliance, hands-on implementation | $10-15K | 4-6 weeks |

**Deliverables:**
- Architecture assessment
- Recommendations report
- Implementation roadmap
- Presentation to stakeholders
- Follow-up Q&A

---

### Sub-Type 3B: AI Strategy

**Scope Questions:**
- Current AI maturity? (Exploring vs. production)
- Use cases? (Customer-facing vs. internal)
- Data availability? (Clean vs. messy)
- Team capabilities? (AI experts vs. generalists)
- Budget for implementation? (Pilot vs. full build)

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | Use case prioritization, vendor recommendations | $2-3K | 1 week |
| **Professional** | Full strategy, roadmap, POC plan | $4-7K | 2-3 weeks |
| **Enterprise** | Strategy + POC build + team training | $10-20K | 4-8 weeks |

**Deliverables:**
- AI strategy document
- Use case prioritization
- Vendor/technology recommendations
- Implementation roadmap
- POC specification

---

### Sub-Type 3C: Fractional CTO/Technical Advisor

**Scope Questions:**
- Stage? (Seed, Series A, B, etc.)
- Team size? (5 vs. 50 engineers)
- Hours needed? (5 vs. 20 per week)
- Duration? (3 months vs. ongoing)
- Focus areas? (Hiring, architecture, process, etc.)

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | 5 hrs/week, advisory only | $2-3K/month | Ongoing |
| **Professional** | 10-15 hrs/week, hands-on | $5-8K/month | Ongoing |
| **Enterprise** | 20+ hrs/week, embedded | $10-15K/month | Ongoing |

**Deliverables:**
- Weekly check-ins
- Architecture guidance
- Code reviews
- Hiring support
- Strategic advice

---

## TYPE 4: PRODUCT MANAGEMENT (Consulting)

### Sub-Type 4A: Product Strategy

**Scope Questions:**
- Current state? (Idea vs. MVP vs. scaling)
- Market clarity? (Known vs. uncertain)
- Competitive landscape? (Crowded vs. blue ocean)
- Resources? (Solo founder vs. funded team)
- Timeline? (Next quarter vs. next year)

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | Market analysis, opportunity sizing | $2-4K | 1-2 weeks |
| **Professional** | Full strategy, roadmap, metrics framework | $5-8K | 2-4 weeks |
| **Enterprise** | Strategy + execution support + team training | $10-15K | 4-8 weeks |

**Deliverables:**
- Market analysis
- Product strategy
- Roadmap (6-12 months)
- Success metrics
- Presentation

---

### Sub-Type 4B: Technical Product Management

**Scope Questions:**
- Team composition? (Engineers, designers, etc.)
- Process maturity? (Chaos vs. structured)
- Backlog state? (Empty vs. overwhelming)
- Stakeholder complexity? (Few vs. many)
- Timeline for improvements?

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | Process audit, recommendations | $2-3K | 1 week |
| **Professional** | Process implementation, 4-week embed | $6-10K | 4-6 weeks |
| **Enterprise** | Full TPM function, 3-month embed | $15-25K | 3 months |

**Deliverables:**
- Process documentation
- Backlog grooming
- Sprint planning
- Stakeholder management
- Team training

---

## TYPE 5: BUSINESS ANALYSIS / DATA

### Sub-Type 5A: Data Analysis & Insights

**Scope Questions:**
- Data sources? (Database, files, APIs)
- Data quality? (Clean vs. messy)
- Analysis complexity? (Descriptive vs. predictive)
- Visualization needs? (Dashboard vs. report)
- Stakeholder audience? (Technical vs. executive)

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | Single dataset, descriptive analysis, report | $1-2K | 3-5 days |
| **Professional** | Multiple sources, predictive analysis, dashboard | $3-5K | 1-2 weeks |
| **Enterprise** | Complex analysis, ML models, ongoing monitoring | $8-15K | 3-4 weeks |

**Deliverables:**
- Cleaned dataset
- Analysis notebooks
- Visualizations
- Written report
- Presentation

---

### Sub-Type 5B: Dashboard Development

**Scope Questions:**
- Data sources? (Count, type, update frequency)
- Users? (Technical vs. non-technical, count)
- Real-time needs? (Live vs. daily refresh)
- Interactivity? (Static vs. drill-down)
- Platform preference? (Tableau, PowerBI, custom)

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | 2-3 data sources, 5-10 metrics, static | $2-3K | 1 week |
| **Professional** | 5+ sources, 20+ metrics, interactive | $4-7K | 2-3 weeks |
| **Enterprise** | 10+ sources, custom real-time, embedded | $10-15K | 4-6 weeks |

**Deliverables:**
- Working dashboard
- Data pipelines
- Documentation
- Training session

---

### Sub-Type 5C: Process Analysis & Optimization

**Scope Questions:**
- Process complexity? (Simple vs. multi-department)
- Current documentation? (None vs. outdated)
- Data availability? (Metrics vs. gut feel)
- Change readiness? (Resistant vs. eager)
- Implementation support needed?

**Pricing Tiers:**

| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| **Starter** | Single process, analysis, recommendations | $2-3K | 1-2 weeks |
| **Professional** | Multiple processes, implementation support | $5-8K | 3-4 weeks |
| **Enterprise** | Full organization, change management | $12-20K | 6-10 weeks |

**Deliverables:**
- Process maps (current state)
- Bottleneck analysis
- Optimization recommendations
- Future state design
- Implementation plan

---

## SCOPING FRAMEWORK (Universal)

### The 5-Question Scoper

For ANY project type, ask:

1. **WHAT is the desired outcome?**
   - "Reduce processing time by 50%"
   - "Automate X workflow"
   - "Get AI strategy roadmap"

2. **WHO is the user/stakeholder?**
   - Internal team? Customers? Executives?
   - Technical vs. non-technical?

3. **WHERE will this live?**
   - Cloud? On-prem? Hybrid?
   - Integration requirements?

4. **WHEN do you need it?**
   - Urgent (1-2 weeks)? Standard (3-4)? Strategic (6+)?
   - Rush pricing: +30-50%

5. **WHY is this worth doing?**
   - Business impact? Cost savings? Revenue?
   - Helps determine value-based pricing

---

## PRICING PSYCHOLOGY

### Anchoring Strategy

**Always offer 3 tiers:**

| Tier | Price | Psychology |
|------|-------|------------|
| **Basic** | $3K | "Too simple for my needs" |
| **Professional** | $7K | "This feels right" |
| **Enterprise** | $15K | "Maybe overkill, but good to see" |

**Most clients choose middle tier.**

---

### Value-Based Pricing Formula

**Price = (Business Value × 0.2) + (Time × Rate)**

**Example:**
- Automation saves $100K/year
- 20% of value: $20K
- Time: 3 weeks × $2K/week = $6K
- **Price: $15-20K**

---

### Emergency Pricing (Need Cash Fast)

**Reduce scope, not price:**

**Instead of:**
- "I'll do it for $5K" (lowers value perception)

**Say:**
- "I can build an MVP for $3K that solves the core problem. Full solution would be $8K. Want to start with MVP?"

**Or offer payment plan:**
- "Total is $10K. We can do 3 payments: $3K to start, $3K at midpoint, $4K on completion."

---

## RED FLAGS (Don't Take the Project)

**Walk away if:**
- ❌ Can't define desired outcome
- ❌ Scope keeps changing
- ❌ "We'll figure out budget later"
- ❌ Previous 3 vendors failed
- ❌ Won't pay 50% upfront
- ❌ Gut says "trouble"

**Your time is valuable. Protect it.**

---

**Bottom Line:** Scope tight, price based on value, deliver fast. 30+ projects/year at $5-10K average = ₹1.5-3Cr revenue.
