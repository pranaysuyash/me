# INTERACTIVE DEMOS & SALES TOOLS STRATEGY

**Living Document - Last Updated:** April 1, 2026  
**Purpose:** Plan, build, and deploy interactive demos that convert visitors into leads

---

## PART 1: INTERACTIVE DEMO STRATEGY

### Why Interactive Demos Matter

| Static Portfolio | Interactive Demo |
|-----------------|------------------|
| "I can do OCR" | Upload PDF → See extraction live |
| "I build AI systems" | Chat with RAG bot trained on your data |
| Trust via claims | Trust via proof |
| 2% conversion | 8-15% conversion |

### Demo Types by Funnel Stage

| Stage | Demo Type | Goal | Complexity |
|-------|-----------|------|------------|
| **Awareness** | Live widget on homepage | Capture interest | Low |
| **Interest** | Self-serve playground | Collect email | Medium |
| **Consideration** | Full-featured trial | Qualify leads | High |
| **Decision** | Custom pilot demo | Close deal | Custom |

---

## PART 2: DEMO PROJECT IDEAS

### DEMO 1: Document Extraction Playground

**Concept:** Upload a PDF/image → See AI extraction in real-time

**User Flow:**
```
1. User lands on /demo/extract
2. Sees sample documents (invoice, contract, ID)
3. Clicks "Try with your document"
4. Uploads PDF (client-side, <5MB)
5. Sees simulated extraction animation
6. Gets structured output displayed
7. CTA: "Get this for your workflow"
```

**Technical Approaches:**

**Option A: Mock Demo (Fastest)**
- Pre-defined extraction results
- Upload triggers animation
- Show hardcoded output based on file type
- **Pros:** Works instantly, no backend costs
- **Cons:** Not "real" AI
- **Time:** 1 day

**Option B: Client-Side Tesseract.js**
- Real OCR in browser
- Process image → Extract text
- **Pros:** Real extraction, privacy (no server)
- **Cons:** Limited accuracy, CPU intensive
- **Time:** 2-3 days

**Option C: FastAPI Backend + OpenAI**
- Upload to backend
- Process with GPT-4 Vision
- Return structured JSON
- **Pros:** Accurate, impressive
- **Cons:** API costs, needs backend
- **Time:** 3-5 days

**Recommended:** Start with Option A (mock), evolve to Option C

**Mock Demo Data:**
```typescript
const sampleExtractions = {
  invoice: {
    vendor: "Acme Corp",
    amount: "$12,450.00",
    date: "2025-03-15",
    invoice_number: "INV-2025-0342"
  },
  contract: {
    parties: ["Company A", "Company B"],
    effective_date: "2025-01-01",
    term: "24 months",
    value: "$500,000"
  },
  id_document: {
    name: "John Doe",
    id_number: "AB123456",
    dob: "1985-06-15",
    expiry: "2030-06-15"
  }
}
```

---

### DEMO 2: AI Chat Assistant (RAG Playground)

**Concept:** Chat with an AI trained on sample insurance/healthcare documents

**User Flow:**
```
1. User sees chat interface
2. Sample questions displayed:
   - "What's covered in the gold plan?"
   - "How do I file a claim?"
3. User types question
4. AI responds with source citations
5. Shows retrieved context chunks
```

**Technical Approach:**

**Mock Version:**
- Hardcoded Q&A pairs
- Fuzzy match user input to predefined questions
- Show "retrieved context" animation

**Real Version:**
- Vector DB with sample documents
- OpenAI embeddings + GPT-4
- Real RAG pipeline

**Sample Q&A Database:**
```typescript
const sampleQA = [
  {
    keywords: ["coverage", "gold plan", "what's covered"],
    question: "What's covered in the gold plan?",
    answer: "The Gold Plan covers: Inpatient hospitalization, Daycare procedures, Pre & post hospitalization expenses, Emergency ambulance charges, and 500+ day care procedures.",
    sources: ["Gold_Plan_Brochure.pdf", "Coverage_Details_2025.pdf"]
  },
  {
    keywords: ["claim", "file", "how to"],
    question: "How do I file a claim?",
    answer: "You can file a claim through: 1) Mobile app (fastest - approved in 2 hours), 2) Website portal, 3) Email to claims@insurance.com, or 4) Call our 24/7 helpline.",
    sources: ["Claims_Process_Guide.pdf"]
  }
]
```

---

### DEMO 3: Workflow Automation Visualizer

**Concept:** Interactive diagram showing before/after workflow transformation

**User Flow:**
```
1. User sees "before" workflow (messy)
2. Clicks "Transform"
3. Animation shows automation being applied
4. Sees "after" workflow (clean)
5. Metrics displayed: Time saved, Errors reduced
```

**Visual Elements:**
- Drag-and-drop workflow builder (simplified)
- Animated connections between steps
- Time counter showing manual vs automated
- "Add to your workflow" CTA

**Sample Workflows:**
1. **Insurance Claims Processing**
   - Before: 15 steps, 4 weeks, 8 touchpoints
   - After: 3 steps, 10 days, 2 touchpoints

2. **Document Onboarding**
   - Before: Manual data entry, 2 hours/doc
   - After: Auto-extraction, 2 mins/doc

3. **Invoice Processing**
   - Before: Email → Excel → ERP (3 days)
   - After: Email → AI → ERP (2 hours)

---

### DEMO 4: Code/API Playground

**Concept:** Try the API directly in browser

**Features:**
- Interactive API console
- Pre-filled examples
- "Run" button shows curl + response
- Copy-to-clipboard functionality

**Sample Endpoints to Showcase:**
```
POST /api/extract
{
  "document": "base64_encoded_pdf",
  "extractors": ["invoice", "line_items"]
}

Response:
{
  "vendor": "Acme Corp",
  "total": 12450.00,
  "confidence": 0.97
}
```

---

### DEMO 5: ROI Calculator

**Concept:** Input your numbers → See potential savings

**Inputs:**
- Documents processed per month
- Current processing time per document
- Hourly cost of staff
- Error rate %

**Output:**
```
Current Monthly Cost: $8,500
With Automation: $2,100
Monthly Savings: $6,400 (75%)
Annual Savings: $76,800
Payback Period: 3 weeks
```

**CTA:** "Get a detailed ROI analysis for your workflow"

---

## PART 3: SALES ENABLEMENT TOOLS

### Tool 1: Interactive Pricing Calculator

**Concept:** Transparent pricing based on scope

**Sliders/Inputs:**
- Document volume (100/mo → 100K/mo)
- Complexity (simple → complex tables)
- Integration needs (none → ERP + CRM)
- Support level (email → dedicated)

**Output:**
```
Estimated Investment: $15K - $25K
Timeline: 3-4 weeks
Includes:
✓ Core extraction pipeline
✓ API integration
✓ Basic dashboard
✓ 30-day support

[Schedule detailed scoping call]
```

---

### Tool 2: Project Scoping Wizard

**Concept:** Guided questionnaire that generates a project brief

**Questions:**
1. What type of documents? (Invoice, Contract, Form, Other)
2. How many per month? (Range)
3. Current process? (Manual, semi-automated, legacy system)
4. Integration needs? (None, API, specific software)
5. Timeline? (ASAP, 1 month, flexible)

**Output:**
- Generated project brief (PDF)
- Estimated timeline
- Ballpark investment range
- Next steps

---

### Tool 3: Competitor Comparison Matrix

**Concept:** Show how you compare to alternatives

**Table:**
| Feature | You | Traditional OCR | Manual Entry | Enterprise Solution |
|---------|-----|-----------------|--------------|---------------------|
| Setup Time | 2 weeks | 3 months | N/A | 6+ months |
| Accuracy | 95%+ | 80% | 99% | 95%+ |
| Cost | $$ | $$$ | $$$$ | $$$$$ |
| Customization | High | Low | N/A | Medium |
| API Available | ✅ | ⚠️ | ❌ | ✅ |

---

### Tool 4: Live Availability Calendar

**Concept:** Show current capacity for new projects

**Visual:**
```
May 2025
Mon Tue Wed Thu Fri
     🟢  🟢  🟢  🟢  🟡
🟢  🟢  🔴  🔴  🟢  🟢
🟢  🟢  🟢  🟢  🟢  🟡

🟢 Available  🟡 Limited  🔴 Booked

Next available slot: May 15
```

**CTA:** "Reserve your slot with a 15-min call"

---

## PART 4: IMPLEMENTATION PRIORITIES

### Phase 1: Quick Wins (Week 1)

**Demo 1: Mock Document Extraction**
- Time: 1 day
- Impact: HIGH
- Build animated upload → extraction flow
- Pre-defined results for 3 document types
- Deploy to `/demo/extract`

**Tool 1: ROI Calculator**
- Time: 1 day
- Impact: MEDIUM
- Simple JavaScript calculator
- Deploy to `/calculator`

### Phase 2: Core Demos (Week 2-3)

**Demo 2: RAG Chat Playground**
- Time: 2-3 days
- Impact: HIGH
- Mock version first
- Sample insurance domain Q&A
- Deploy to `/demo/chat`

**Demo 3: Workflow Visualizer**
- Time: 2-3 days
- Impact: MEDIUM
- Animated before/after diagrams
- 3 sample workflows
- Deploy to `/demo/workflow`

### Phase 3: Advanced (Week 4+)

**Real Document Processing**
- Time: 1 week
- Impact: VERY HIGH
- Backend with actual OCR
- Cost: OpenAI API usage

**API Playground**
- Time: 3-4 days
- Impact: MEDIUM
- For developer-focused clients

---

## PART 5: TECHNICAL ARCHITECTURE

### Demo Infrastructure

```
┌─────────────────────────────────────────┐
│           Next.js Frontend              │
│  ┌─────────┐ ┌─────────┐ ┌──────────┐  │
│  │  Mock   │ │  Real   │ │  Hybrid  │  │
│  │  Demos  │ │  Demos  │ │  Demos   │  │
│  └────┬────┘ └────┬────┘ └────┬─────┘  │
│       └───────────┼───────────┘         │
│                   │                     │
│  ┌────────────────┴────────────────┐   │
│  │      Demo State Management       │   │
│  │  (React Context / Zustand)       │   │
│  └────────────────┬────────────────┘   │
└───────────────────┼─────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
┌───────▼────────┐    ┌─────────▼────────┐
│  Mock Services │    │  Real Services   │
│  (Client-side) │    │  (FastAPI)       │
│                │    │                  │
│ • Static data  │    │ • OCR endpoint   │
│ • Simulated    │    │ • RAG endpoint   │
│   delays       │    │ • LLM calls      │
└────────────────┘    └──────────────────┘
```

### File Structure

```
src/
├── app/
│   ├── demo/
│   │   ├── page.tsx              # Demo landing page
│   │   ├── extract/
│   │   │   └── page.tsx          # Document extraction demo
│   │   ├── chat/
│   │   │   └── page.tsx          # RAG chat demo
│   │   └── workflow/
│   │       └── page.tsx          # Workflow visualizer
│   ├── calculator/
│   │   └── page.tsx              # ROI calculator
│   └── api/
│       └── demo/
│           ├── extract/route.ts  # Extraction endpoint
│           └── chat/route.ts     # Chat endpoint
├── components/
│   └── demos/
│       ├── document-upload.tsx
│       ├── extraction-viewer.tsx
│       ├── chat-interface.tsx
│       ├── workflow-diagram.tsx
│       └── roi-calculator.tsx
├── lib/
│   └── demos/
│       ├── mock-data.ts          # Sample extractions
│       ├── sample-qa.ts          # Chat responses
│       └── workflows.ts          # Workflow definitions
└── hooks/
    └── use-demo.ts               # Demo state management
```

---

## PART 6: COPY & MESSAGING FOR DEMOS

### Demo Landing Page (/demo)

**Headline:**
> See the AI in action

**Subhead:**
> Try these interactive demos to see how document AI and workflow automation work.

**Demo Cards:**

1. **Document Extraction**
   > Upload a document and watch AI extract structured data in seconds
   > [Try Demo]

2. **Intelligent Q&A**
   > Ask questions about insurance documents — get accurate, sourced answers
   > [Try Demo]

3. **Workflow Visualizer**
   > See how messy manual processes become clean automated workflows
   > [Try Demo]

### Demo-Specific Copy

**Document Extraction Demo:**
```
┌─────────────────────────────────────────┐
│ Document Extraction Demo                │
│                                         │
│ Upload a PDF or image and see AI        │
│ extract key information automatically.    │
│                                         │
│ Try a sample:                           │
│ [📄 Invoice] [📋 Contract] [🪪 ID Doc]   │
│                                         │
│ ─────────── OR ───────────              │
│                                         │
│ 📤 Drop your file here                  │
│ or click to upload (PDF, PNG, JPG)      │
│                                         │
│ Processing... ████████░░ 80%            │
│                                         │
│ ✅ Extraction Complete                  │
│                                         │
│ Vendor: Acme Corporation                │
│ Amount: $12,450.00                      │
│ Date: March 15, 2025                    │
│ Invoice #: INV-2025-0342                │
│                                         │
│ [Get this for your documents]           │
└─────────────────────────────────────────┘
```

---

## PART 7: CONVERSION OPTIMIZATION

### Demo → Lead Flow

```
User tries demo
      ↓
Sees result (success moment)
      ↓
CTA appears: "Get this for your workflow"
      ↓
Options:
  ├─ [Quick questions? Chat on WhatsApp] → Low friction
  ├─ [Book 15-min call] → Medium friction
  └─ [Get detailed proposal] → Higher friction
      ↓
Capture email before detailed results?
      ↓
Follow-up email sequence
```

### Exit-Intent Popups

**When:** User tries to leave demo page
**Message:**
> Before you go...
> 
> Want a free automation audit for your workflow?
> I'll analyze your current process and send specific recommendations.
> 
> [Email input] [Get Free Audit]

### Demo Analytics to Track

| Event | Metric | Goal |
|-------|--------|------|
| Demo started | Count | 100/week |
| Demo completed | % | 60% |
| CTA clicked | % | 15% |
| Email captured | % | 10% |
| Call booked | Count | 5/week |

---

## PART 8: COMPETITIVE ADVANTAGES

### What Makes Your Demos Different

1. **Real Healthcare/Insurance Focus**
   - Not generic OCR demos
   - Domain-specific examples
   - Shows you understand the industry

2. **YC-Grade Execution**
   - Fast, polished, no fluff
   - Ship-first mentality visible
   - "Built by someone who ships"

3. **Dual Audience Design**
   - Technical demos for engineers
   - Business value for managers
   - Both paths work

4. **Transparent Process**
   - Shows the "messy" workflow
   - Doesn't oversell
   - Realistic expectations

---

## PART 9: RESOURCE REQUIREMENTS

### Time Investment

| Phase | Time | Cost |
|-------|------|------|
| Phase 1 (Mock demos) | 2-3 days | $0 |
| Phase 2 (Real demos) | 1 week | $50-100 (API) |
| Phase 3 (Advanced) | 2 weeks | $200-500/mo |

### Tools Needed

- **OpenAI API:** GPT-4 Vision for real extraction ($0.01-0.02 per image)
- **Tesseract.js:** Free client-side OCR
- **Framer Motion:** Animations (already using)
- **Vercel:** Hosting (already using)

### Maintenance

- **Mock demos:** Zero maintenance
- **Real demos:** Monitor API costs, update models
- **Content:** Add new sample docs quarterly

---

## PART 10: SUCCESS METRICS

### Demo Performance KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| Demo visitors/week | 200 | Google Analytics |
| Demo completion rate | 50% | Custom events |
| Demo → Contact CTA % | 10% | Funnel tracking |
| Demo → Call booked | 5% | Calendly integration |
| Time on demo page | 3+ min | GA4 engagement |

### Business Impact

| Outcome | Before Demos | After Demos |
|---------|--------------|-------------|
| Lead quality | Medium | High (self-qualified) |
| Sales cycle | 4 weeks | 2 weeks |
| Conversion rate | 2% | 8% |
| Close rate | 20% | 35% |

---

## APPENDIX: SAMPLE CODE

### Document Upload Component

```typescript
// components/demos/document-upload.tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DocumentUploadProps {
  onUpload: (file: File) => void;
  isProcessing: boolean;
}

export function DocumentUpload({ onUpload, isProcessing }: DocumentUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      onUpload(file);
    }
  }, [onUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onUpload(file);
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-xl p-8 text-center
        transition-all duration-300 cursor-pointer
        ${isDragOver 
          ? "border-primary bg-primary/5" 
          : "border-border hover:border-primary/50"
        }
      `}
    >
      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <AnimatePresence mode="wait">
        {isProcessing ? (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-8"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <p className="text-muted-foreground">Analyzing document...</p>
          </motion.div>
        ) : selectedFile ? (
          <motion.div
            key="selected"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="text-4xl mb-2">📄</div>
            <p className="font-medium">{selectedFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-4xl mb-4">📤</div>
            <p className="font-medium mb-1">Drop your file here</p>
            <p className="text-sm text-muted-foreground">
              or click to browse (PDF, PNG, JPG)
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

### Extraction Result Component

```typescript
// components/demos/extraction-result.tsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle, FileText } from "lucide-react";

interface ExtractionResultProps {
  data: {
    vendor?: string;
    amount?: string;
    date?: string;
    invoice_number?: string;
    [key: string]: string | undefined;
  };
  confidence: number;
}

export function ExtractionResult({ data, confidence }: ExtractionResultProps) {
  const fields = Object.entries(data).filter(([_, value]) => value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span className="font-medium">Extraction Complete</span>
        <span className="text-sm text-muted-foreground ml-auto">
          Confidence: {(confidence * 100).toFixed(0)}%
        </span>
      </div>

      <div className="space-y-3">
        {fields.map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between py-2 border-b last:border-0"
          >
            <span className="text-sm text-muted-foreground capitalize">
              {key.replace(/_/g, " ")}
            </span>
            <span className="font-medium">{value}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t">
        <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
          Get this for your documents
        </button>
      </div>
    </motion.div>
  );
}
```

---

## NEXT STEPS

1. **Choose Phase 1 demos** (recommend: Document Extraction + ROI Calculator)
2. **Build mock versions** (2-3 days)
3. **Deploy and measure** (track analytics)
4. **Iterate based on data** (which demos get used?)
5. **Add real backend** when mock proves value

---

## PART 11: BLOG INTEGRATION STRATEGY

### Existing Blog Asset

**URL:** https://medium.com/@pranaysuyash  
**Platform:** Medium  
**Current Status:** Existing content (needs audit)

### Blog Integration Options

#### Option 1: Embed Medium Feed (Easiest)
**Implementation:**
- Use Medium RSS feed: `https://medium.com/feed/@pranaysuyash`
- Parse and display latest 3-5 articles on `/blog` or homepage
- Link out to Medium for full reading

**Pros:**
- Zero migration effort
- Keeps Medium audience
- Automatic updates when you publish

**Cons:**
- Sends traffic away from your site
- Limited customization
- Medium paywall may affect readers

**Code:**
```typescript
// app/blog/page.tsx
async function getMediumPosts() {
  const response = await fetch(
    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@pranaysuyash'
  );
  const data = await response.json();
  return data.items.slice(0, 5);
}
```

#### Option 2: Import to Your Site (SEO Best)
**Implementation:**
- Create `/blog/[slug]` pages
- Import Medium articles as MDX
- Add canonical links back to Medium

**Pros:**
- Content lives on your domain (SEO value)
- Full design control
- No Medium paywall
- Better conversion (CTAs in articles)

**Cons:**
- Migration effort
- Need to sync new posts

**Migration Process:**
```bash
# 1. Export Medium stories
# 2. Convert HTML → Markdown
# 3. Create MDX files in content/blog/
# 4. Add frontmatter (title, date, canonical_url)
```

#### Option 3: Hybrid Approach (Recommended)
**Implementation:**
- Create `/blog` page with Medium RSS feed
- Mark articles with "origin: medium" 
- Cross-post best articles to your site with canonical

**Structure:**
```
Your Site:
├─ /blog (lists all posts, Medium + original)
├─ /blog/original-post-1 (hosted on your site)
├─ /blog/original-post-2 (hosted on your site)
└─ Links to Medium for older posts
```

### Blog Content Strategy

#### Recommended Topics (Based on Your Expertise)

**Technical Deep Dives:**
- "Building OCR pipelines at scale with FastAPI"
- "Fine-tuning Whisper for domain-specific transcription"
- "RAG architecture patterns for healthcare documents"
- "From SAP consultant to YC founder: 14-year journey"

**Case Studies:**
- "How we reduced insurance TAT from 4 weeks to 10 days"
- "Building document AI for 45K+ field types"
- "YC S20 lessons: What I wish I knew"

**Practical Guides:**
- "Prototyping AI products in 2 weeks"
- "Document processing: Build vs Buy analysis"
- "Compliance-first engineering: ISO 27001 & SOC 2"

**Opinion/Thought Leadership:**
- "The future of document-heavy workflows"
- "Why most AI pilots fail (and how to fix them)"
- "Founding engineer vs CTO: career path comparison"

### Blog SEO Benefits

| Benefit | Impact | Timeline |
|---------|--------|----------|
| Long-tail keywords | High | 3-6 months |
| Backlink magnet | High | 6-12 months |
| Thought leadership | Medium | Ongoing |
| Conversion content | High | Immediate |
| Social proof | Medium | Immediate |

### Blog → Portfolio Integration

**Homepage Section:**
```
┌─────────────────────────────────────────┐
│ Latest Writing                          │
│                                         │
│ 📝 Building OCR Pipelines at Scale      │
│    How we process 45K+ fields daily    │
│    Read on Medium →                    │
│                                         │
│ 📝 YC S20: What I Learned               │
│    Lessons from 5.5 years in startup    │
│    Read on Medium →                    │
│                                         │
│ [View all articles]                     │
└─────────────────────────────────────────┘
```

**Hire Me Page:**
- Add "Technical Writing" to skills
- Link to best articles as proof of expertise
- "I write about applied AI at medium.com/@pranaysuyash"

**Structured Data Addition:**
```typescript
// Add to layout.tsx metadata
{
  "@type": "Person",
  "name": "Pranay Suyash",
  "sameAs": [
    "https://medium.com/@pranaysuyash"  // Add this
  ]
}
```

### Content Calendar (Suggested)

**Month 1 (Launch):**
- Cross-post 2 best Medium articles to your site
- Write 1 new: "Why I'm transitioning from founder to IC"

**Month 2:**
- Case study: "Document extraction at scale"
- Guide: "How to scope AI prototypes"

**Month 3:**
- Technical: "Building with FastAPI + Whisper"
- Opinion: "The state of document AI in 2025"

**Ongoing:**
- 1 article every 2 weeks
- Mix of technical + business topics
- Cross-promote on LinkedIn/Twitter

### Medium → Site Migration Priority

**High Priority (Import First):**
1. Most-read articles (check Medium stats)
2. Technical tutorials
3. Case studies with data

**Medium Only:**
- Personal/reflection pieces
- Short-form updates
- Community discussions

**Checklist for Imported Articles:**
- [ ] Add canonical link to original Medium post
- [ ] Update any outdated information
- [ ] Add CTAs ("Hire Me", "Work With Me")
- [ ] Optimize images (compress, add alt text)
- [ ] Add internal links to your projects
- [ ] Include email signup at end

---

**Document Status:** Living — update as demos are built and measured

**Assets Logged:**
- Blog: https://medium.com/@pranaysuyash
- GitHub: https://github.com/pranaysuyash
- MetaExtract: https://github.com/pranaysuyash/metaextract.git
