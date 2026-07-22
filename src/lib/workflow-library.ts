export type WorkflowInput = "documents" | "images" | "audio" | "spatial";
export type WorkflowPriority =
  | "evidence"
  | "privacy"
  | "search"
  | "simulation"
  | "operator-speed";
export type WorkflowPath = "download" | "live" | "case" | "project" | "consultation";

export interface WorkflowDefinition {
  id: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  bestFor: string;
  input: WorkflowInput;
  priorities: WorkflowPriority[];
  stages: string[];
  outputs: string[];
  starterHref: string;
  starterLabel: string;
  liveHref?: string;
  liveLabel?: string;
  caseHref: string;
  caseLabel: string;
  projectHref: string;
  consultationHref: string;
  boundary: string;
}

export const workflowInputOptions = [
  { id: "any", label: "Any input" },
  { id: "documents", label: "Documents and records" },
  { id: "images", label: "Images and signatures" },
  { id: "audio", label: "Meetings and audio" },
  { id: "spatial", label: "Scenes and spaces" },
] as const;

export const workflowPriorityOptions = [
  { id: "any", label: "Any priority" },
  { id: "evidence", label: "Evidence and review" },
  { id: "privacy", label: "Local privacy" },
  { id: "search", label: "Search and retrieval" },
  { id: "simulation", label: "Simulation and comparison" },
  { id: "operator-speed", label: "Operator speed" },
] as const;

export const workflowPathOptions = [
  { id: "download", label: "Download a starter" },
  { id: "live", label: "Try a live mechanism" },
  { id: "case", label: "Review an audited case" },
  { id: "project", label: "Scope a custom build" },
  { id: "consultation", label: "Book a consultation" },
] as const;

export const workflowDefinitions: WorkflowDefinition[] = [
  {
    id: "document-extraction-review",
    title: "Evidence-linked document extraction",
    category: "Document intelligence",
    summary:
      "Turn recurring PDFs, scans, forms, invoices, or records into structured fields with source evidence, validation, review states, and an explicit downstream action.",
    problem:
      "Teams copy fields manually, lose provenance, and discover exceptions only after incorrect data has entered another system.",
    bestFor:
      "Recurring document families where correctness, source evidence, exception handling, and operator review matter more than raw OCR throughput.",
    input: "documents",
    priorities: ["evidence", "operator-speed"],
    stages: ["Intake", "Parse", "Extract", "Validate", "Review", "Export or act"],
    outputs: ["Field schema", "Evidence links", "Review queue", "Quality gate"],
    starterHref: "/workflows/document-extraction-starter.md",
    starterLabel: "Download extraction starter",
    liveHref: "/systems#capability-tab-extraction",
    liveLabel: "Try evidence extraction",
    caseHref: "/work/metaextract",
    caseLabel: "Review MetaExtract",
    projectHref:
      "/contact?type=project&source=workflow-library-document-extraction-project",
    consultationHref:
      "/contact?type=project&source=workflow-library-document-extraction-consultation",
    boundary:
      "The starter is a scoping and quality artifact, not a production parser. The live mechanism handles a constrained synthetic pattern and does not represent the full OCR, layout, model, or evaluation stack.",
  },
  {
    id: "signature-document-handling",
    title: "Local signature and document handling",
    category: "Local-first document tools",
    summary:
      "Extract and clean signature imagery, keep processing local where appropriate, place the result into a document, and preserve an operator-controlled export path.",
    problem:
      "Sensitive files move through disconnected image editors, uploaders, and PDF tools, increasing friction and weakening user control.",
    bestFor:
      "Privacy-sensitive desktop workflows that need direct file access, image cleanup, PDF placement, and an understandable local operating model.",
    input: "images",
    priorities: ["privacy", "operator-speed"],
    stages: ["Open file", "Isolate mark", "Clean image", "Place", "Review", "Export"],
    outputs: ["Transparent asset", "Placement record", "Local export", "User-controlled files"],
    starterHref: "/workflows/signature-document-starter.md",
    starterLabel: "Download signature workflow starter",
    liveHref: "/systems#capability-tab-cleanup",
    liveLabel: "Try local image cleanup",
    caseHref: "/work/sig-ext-fastapi",
    caseLabel: "Review SignKit",
    projectHref:
      "/contact?type=project&source=workflow-library-signature-project",
    consultationHref:
      "/contact?type=project&source=workflow-library-signature-consultation",
    boundary:
      "The starter and live cleanup mechanism do not provide identity verification, certified electronic signing, legal assurance, or the complete SignKit desktop product.",
  },
  {
    id: "visual-evidence-inspection",
    title: "Visual evidence inspection",
    category: "Computer vision foundations",
    summary:
      "Measure image properties and derived evidence before using a vision model, so semantic output can be compared against deterministic dimensions, luminance, contrast, edges, and source regions.",
    problem:
      "Vision workflows often jump directly to model descriptions without retaining enough measurable evidence to diagnose failures or support review.",
    bestFor:
      "Image-heavy review, extraction, inspection, and quality workflows that need a deterministic evidence layer beneath model interpretation.",
    input: "images",
    priorities: ["evidence", "privacy"],
    stages: ["Decode locally", "Measure", "Derive edges", "Attach evidence", "Interpret", "Review"],
    outputs: ["Pixel metrics", "Edge map", "Evidence regions", "Model-review contract"],
    starterHref: "/workflows/visual-inspection-starter.md",
    starterLabel: "Download visual inspection starter",
    liveHref: "/systems#capability-tab-inspection",
    liveLabel: "Try visual inspection",
    caseHref: "/work/metaextract",
    caseLabel: "Review evidence-led extraction",
    projectHref:
      "/contact?type=project&source=workflow-library-visual-inspection-project",
    consultationHref:
      "/contact?type=project&source=workflow-library-visual-inspection-consultation",
    boundary:
      "The live mechanism performs real browser-side pixel analysis but does not claim object detection, OCR, segmentation, or semantic scene understanding.",
  },
  {
    id: "spatial-coverage-review",
    title: "Spatial visibility and coverage review",
    category: "Spatial simulation",
    summary:
      "Model cameras, targets, obstacles, and operating zones so visibility or coverage changes can be simulated before a physical or operational decision is made.",
    problem:
      "Teams place cameras or define monitored zones from intuition, then discover blind spots, redundant coverage, or operational conflicts after installation.",
    bestFor:
      "Security planning, scene review, facilities workflows, and digital-twin products that need deterministic spatial reasoning and explainable comparisons.",
    input: "spatial",
    priorities: ["simulation", "evidence"],
    stages: ["Map scene", "Place sensors", "Define targets", "Simulate", "Compare", "Record decision"],
    outputs: ["Coverage state", "Blind-spot evidence", "Scenario comparison", "Decision trace"],
    starterHref: "/workflows/spatial-coverage-starter.md",
    starterLabel: "Download spatial review starter",
    liveHref: "/systems#capability-tab-visibility",
    liveLabel: "Try spatial visibility",
    caseHref: "/work/sentineltwin",
    caseLabel: "Review SentinelTwin",
    projectHref:
      "/contact?type=project&source=workflow-library-spatial-project",
    consultationHref:
      "/contact?type=project&source=workflow-library-spatial-consultation",
    boundary:
      "The live mechanism is a two-dimensional line-of-sight example. It does not represent full 3D coverage, DORI, calibration, temporal simulation, path replay, or optimisation.",
  },
  {
    id: "meeting-capture-retrieval",
    title: "Meeting capture and searchable retrieval",
    category: "Local-first knowledge capture",
    summary:
      "Capture audio with clear consent, produce a transcript, retain source timing, make the session searchable, and export or recover the record without turning three disconnected tools into the workflow.",
    problem:
      "Meeting audio, transcripts, notes, and searchable context are split across tools, while recording state and recovery remain unclear to the operator.",
    bestFor:
      "Teams or individuals who need a local-first meeting record with transparent recording state, transcript provenance, search, and export.",
    input: "audio",
    priorities: ["privacy", "search"],
    stages: ["Consent", "Capture", "Transcribe", "Index", "Search", "Export or recover"],
    outputs: ["Audio record", "Timestamped transcript", "Search index", "Recovery path"],
    starterHref: "/workflows/meeting-capture-starter.md",
    starterLabel: "Download meeting workflow starter",
    caseHref: "/work/echopanel",
    caseLabel: "Review EchoPanel",
    projectHref:
      "/contact?type=project&source=workflow-library-meeting-capture-project",
    consultationHref:
      "/contact?type=project&source=workflow-library-meeting-capture-consultation",
    boundary:
      "No live meeting recorder is embedded on the portfolio. The starter and case explain the workflow boundary; consent, platform audio permissions, transcription quality, packaging, and recovery require the actual product environment.",
  },
];
