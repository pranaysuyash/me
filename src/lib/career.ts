export const careerProfile = {
  name: "Pranay Suyash",
  title: "Product leader and hands-on systems builder",
  roleLine: "Document-heavy workflows, operational AI, and internal tools",
  location: "Bengaluru, India · Remote and distributed teams",
  currentContext: "Co-Founder / Head of Product & Platforms at MedPiper (YC S20)",
  headline: "I turn document-heavy, exception-heavy workflows into AI systems people can review and run.",
  summary:
    "I start with the files, handoffs, decisions, and failure states that make an operational workflow hard to run. Then I shape the product boundary, interface, architecture, and implementation needed to make it usable and reviewable. My background spans software engineering, Big Four transformation, and product leadership inside a YC-backed healthcare company.",
  targetRoles: [
    "AI Product Lead",
    "Principal Product Manager — operational AI",
    "Product Systems Lead",
    "Head of Product for workflow-heavy products",
  ],
  availability:
    "Open to selective senior product roles with a clear long-term mandate, meaningful ownership, and room to stay close to implementation. Transition timing is discussed directly.",
  workModePrinciple:
    "The capability is the same; the accountability horizon is different. Hire me for sustained internal ownership. Use a commercial engagement for a bounded workflow, system, or decision.",
  workingStyle: [
    {
      title: "I ask for the real artefacts early",
      body: "Files, screens, calls, data, support cases, constraints, and edge conditions are more useful than polished requirements created at a distance.",
    },
    {
      title: "I move between layers",
      body: "I am comfortable discussing the commercial goal, mapping the workflow, shaping the interface, reviewing architecture, and writing enough code to test the decision.",
    },
    {
      title: "I am direct about uncertainty",
      body: "I separate what is known, inferred, and still risky. I would rather narrow a claim or scope than decorate it with confidence theatre.",
    },
    {
      title: "I like taking things end to end",
      body: "The work includes the unglamorous parts: error states, packaging, documentation, release gates, handoff, and the follow-through required for people to use the product.",
    },
  ],
  proofPoints: [
    { value: "14+ years", label: "Software, consulting, product, and operating leadership" },
    { value: "~4 weeks → ~10 days", label: "Insurance workflow turnaround after redesign and automation" },
    { value: "~$1M ARR", label: "Helped build and scale MedPiper's product platform" },
    { value: "Paid product shipped", label: "SignKit moved from workflow pain to commercial desktop software" },
  ],
  roleFit: [
    {
      environment: "Document-heavy operational workflow",
      ownership: "Map the real process, choose the useful system boundary, and ship the core workflow with exceptions visible.",
      evidence: "MedPiper insurance operations, SignKit, and document-intelligence systems.",
    },
    {
      environment: "Applied AI with review risk",
      ownership: "Design evidence, status, fallback, and human-review paths around model output.",
      evidence: "Extraction, evaluation, provenance, and release-gate work.",
    },
    {
      environment: "Lean team with an unclear product boundary",
      ownership: "Keep product judgment and implementation close enough to move from real artefacts to working software.",
      evidence: "Independently shipped local-first and spatial product systems.",
    },
  ],
  audiencePaths: [
    {
      label: "For hiring teams",
      title: "Sustained ownership inside the team",
      body: "Hire me when the need is ongoing: product direction, platform decisions, cross-functional execution, and a team that must keep learning after launch.",
      href: "/hire-me",
      action: "Review role fit and experience",
    },
    {
      label: "For commercial engagements",
      title: "A defined document, workflow, or operational AI system",
      body: "Use a separate engagement when the outcome is bounded: map the operating workflow, build a focused system, or correct a difficult subsystem. Commercial terms are handled separately through PSRS Technologies Private Limited where applicable.",
      href: "/work-with-me",
      action: "Review commercial engagements",
    },
  ],
} as const;

export const publicEvidence = [
  {
    publisher: "MediCircle",
    title: "Healthcare Startup Series: MedPiper Technologies",
    date: "April 2022",
    href: "https://medicircle.in/medpiper-building-pipeline-opportunities-healthcare-professionals",
    note: "Independent public interview covering MedPiper's early products, market thesis, and operating context.",
  },
  {
    publisher: "GitHub",
    title: "Public product and systems repositories",
    date: "Ongoing",
    href: "https://github.com/pranaysuyash",
    note: "Source, commit history, and technical artifacts for the independent product work represented on this site.",
  },
] as const;

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
