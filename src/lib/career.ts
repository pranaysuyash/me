export const careerProfile = {
  name: "Pranay Suyash",
  title: "Product leader and hands-on systems builder",
  roleLine: "AI, workflow, internal tools, and local-first products",
  location: "Bengaluru, India · Remote and distributed teams",
  currentContext: "Co-Founder / Head of Product & Platforms at MedPiper (YC S20)",
  headline: "I turn messy operational workflows into reviewable AI and product systems.",
  summary: "I work across product strategy, workflow design, architecture, and implementation. My background spans software engineering, Big Four transformation, and product leadership inside a YC-backed healthcare company.",
  targetRoles: [
    "AI Product Lead",
    "Principal Product Manager",
    "Product Systems Lead",
    "Head of Product for workflow-heavy products",
    "Founding product and engineering operator",
  ],
  availability: "Open to selective senior product conversations and bounded build or advisory engagements. Current commitments and transition timing are discussed directly.",
  proofPoints: [
    { value: "14+ years", label: "Software, consulting, product, and operating leadership" },
    { value: "~4 weeks → ~10 days", label: "Insurance workflow turnaround after redesign and automation" },
    { value: "~$1M ARR", label: "Helped build and scale MedPiper's product platform" },
    { value: "Paid product shipped", label: "SignKit moved from workflow pain to commercial desktop software" },
  ],
  roleFit: [
    {
      environment: "Ambiguous operational product",
      ownership: "Map the real process, choose the useful system boundary, and ship the core workflow.",
      evidence: "MedPiper insurance operations and product platform work.",
    },
    {
      environment: "Applied AI with review risk",
      ownership: "Design evidence, confidence, fallback, and human-review paths around model output.",
      evidence: "Document intelligence, extraction, and evaluation systems.",
    },
    {
      environment: "Lean or founder-stage team",
      ownership: "Keep product judgment and implementation close enough to move from ambiguity to working software.",
      evidence: "SignKit and other independently shipped product systems.",
    },
  ],
  audiencePaths: [
    {
      label: "For hiring teams",
      title: "Senior product ownership with visible execution",
      body: "Role fit, leadership scope, experience, and a resume for teams evaluating product-system leadership.",
      href: "/hire-me",
      action: "Review experience",
    },
    {
      label: "For founders and operators",
      title: "A scoped system for a real workflow",
      body: "Document workflows, internal tools, local-first products, and decision systems delivered through a separate commercial engagement.",
      href: "/work-with-me",
      action: "Review engagement paths",
    },
  ],
} as const;

export const medpiperCaseStudy = {
  slug: "medpiper-workflow",
  title: "MedPiper insurance workflow transformation",
  eyebrow: "Professional case study · Sanitized operating evidence",
  status: "Production workflow transformation",
  role: "Co-Founder / Head of Product & Platforms",
  timeframe: "2020–present",
  context: "A regulated healthcare and insurance environment with fragmented handoffs, document-heavy work, and multiple teams participating in one customer journey.",
  problem: "Insurance sales and operations moved through manual coordination, documentation, scheduling, and onboarding steps. The elapsed turnaround was roughly four weeks, with too much work hidden between teams.",
  approach: [
    "Mapped the end-to-end workflow and separated customer-visible stages from internal operating states.",
    "Tightened ownership, handoffs, documentation, scheduling, and onboarding around one operating flow.",
    "Used software and automation where they removed recurring work, while keeping exception handling visible to operators.",
    "Kept regulated-context controls and security programmes part of the product operating model rather than an afterthought.",
  ],
  outcomes: [
    "Reduced the insurance sales and operations turnaround from roughly four weeks to roughly ten days.",
    "Helped build the product platform as MedPiper scaled to approximately $1M ARR.",
    "Owned product strategy and platform work across three product lines during the company's growth.",
    "Led or supported ISO 27001 recertification and SOC 2 programmes in a regulated operating context.",
  ],
  before: ["Fragmented ownership", "Manual handoffs", "Long elapsed turnaround", "Low workflow visibility"],
  after: ["Explicit stages and ownership", "Tighter operating workflow", "~10-day turnaround", "Visible exception handling"],
  disclosure: "This case study is intentionally sanitized. It presents aggregate workflow and ownership evidence without exposing customer, patient, or confidential operating data.",
} as const;

export const experienceTimeline = [
  {
    company: "MedPiper Technologies",
    role: "Co-Founder / Head of Product & Platforms",
    period: "2020 — Present",
    location: "Bengaluru, India",
    context: "YC S20 · Healthcare and insurance product platform",
    scope: "Product strategy, platform architecture, workflow automation, new verticals, AI experimentation, growth initiatives, and regulated-context operating programmes.",
    highlights: [
      "Helped build the platform from the ground up and scale the company to approximately $1M ARR.",
      "Reduced insurance sales and operations turnaround from roughly four weeks to roughly ten days.",
      "Owned three product lines and worked across product, engineering, operations, and later-stage AI experiments.",
      "Helped grow the organisation from two co-founders to 45 people at peak.",
      "Led or supported ISO 27001 recertification and SOC 2 programmes.",
    ],
  },
  {
    company: "EY India",
    role: "Senior Business Consultant — SAP Sales & Distribution",
    period: "2015 — 2020",
    location: "Bengaluru, India",
    context: "Big Four transformation and enterprise delivery",
    scope: "Requirements, process mapping, blueprinting, solution design, testing, rollout, and end-user enablement for retail and consumer businesses.",
    highlights: [
      "Delivered SAP Sales & Distribution implementations for retail and consumer clients.",
      "Contributed to more than $2M in savings through process re-engineering and workflow improvement initiatives.",
      "Received multiple EY Excellence Awards for client delivery and team contributions.",
    ],
  },
  {
    company: "Wipro Technologies",
    role: "Software Engineer",
    period: "2010 — 2013",
    location: "Greater Noida, India",
    context: "Software engineering and automation",
    scope: "Automation frameworks, document processing, data pipelines, and metadata layers for telecom systems.",
    highlights: [
      "Built automation that reduced repetitive telecom document-processing work.",
      "Implemented data pipelines and metadata layers for network inventory workflows.",
    ],
  },
] as const;

export const education = [
  { institution: "FORE School of Management", credential: "PGDM", period: "2013 — 2015" },
  { institution: "Amity School of Engineering & Technology", credential: "B.Tech, Computer Science", period: "2006 — 2010" },
] as const;
