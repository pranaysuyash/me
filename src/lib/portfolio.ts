export type ProjectMaturity =
  | "Commercial product"
  | "Working product build"
  | "Active platform build"
  | "Working prototype";

export interface AuditedProject {
  slug: string;
  title: string;
  category: string;
  maturity: ProjectMaturity;
  year: string;
  summary: string;
  primaryUser: string;
  role: string;
  outcome: string;
  whatExists: string[];
  decisions: Array<{ decision: string; reason: string; tradeoff: string }>;
  constraints: string[];
  technologies: string[];
  screenshots: string[];
  links: { label: string; href: string }[];
}

export const auditedProjects: AuditedProject[] = [
  {
    slug: "sig-ext-fastapi",
    title: "SignKit",
    category: "Local-first document workflow",
    maturity: "Commercial product",
    year: "2025",
    summary:
      "A desktop workflow for extracting handwritten signature images, cleaning them, and placing them into PDFs without requiring sensitive files to be uploaded to a server.",
    primaryUser:
      "People and small teams handling signature images inside sensitive, file-heavy document workflows.",
    role: "Product owner and hands-on builder across workflow design, desktop UX, image processing, PDF handling, packaging, and sales iteration.",
    outcome:
      "Moved from a recurring workflow problem to a paid desktop product with early customer validation.",
    whatExists: [
      "Local desktop file handling",
      "Signature-image extraction and cleanup",
      "PDF placement workflow",
      "Cross-platform Python/Qt application surface",
      "Commercial distribution and customer feedback loop",
    ],
    decisions: [
      {
        decision: "Keep document processing local.",
        reason:
          "The workflow involves sensitive PDFs and direct filesystem access; privacy and user control are part of the product value.",
        tradeoff:
          "Desktop packaging, updates, and platform-specific behaviour are harder than a web uploader.",
      },
      {
        decision: "Treat signatures as visual assets, not certified e-signatures.",
        reason:
          "The product solves extraction and placement. It does not claim identity verification or legal-signature certification.",
        tradeoff:
          "The scope stays honest and useful, but excludes regulated e-signature verification.",
      },
    ],
    constraints: [
      "No cloud upload as the default workflow",
      "Imperfect scans, photos, and mixed backgrounds",
      "Desktop reliability for non-technical users",
    ],
    technologies: ["Python", "PySide6", "OpenCV", "PyMuPDF", "Qt"],
    screenshots: [
      "/assets/projects/signkit/hero.jpg",
      "/assets/projects/signkit/detail1.jpg",
      "/assets/projects/signkit/detail2.jpg",
    ],
    links: [
      { label: "Open product site", href: "https://signkit.work" },
      { label: "View repository", href: "https://github.com/pranaysuyash/sig_ext_fastapi_react" },
    ],
  },
  {
    slug: "metaextract",
    title: "MetaExtract",
    category: "Document and file intelligence",
    maturity: "Working product build",
    year: "2025",
    summary:
      "A structured workspace for inspecting files and documents, extracting high-coverage metadata, and keeping outputs reviewable instead of hiding them behind one opaque model response.",
    primaryUser:
      "Operators, analysts, and technical teams that need structured file evidence, provenance, and exportable metadata.",
    role: "Product and system design across extraction coverage, data structure, access control, review surfaces, and operator workflow.",
    outcome:
      "Built a working foundation for broad file-metadata inspection and structured export, with the product still under active refinement.",
    whatExists: [
      "Multi-format file inspection",
      "Structured metadata extraction",
      "Operator-facing review surfaces",
      "Access-control and usage concepts",
      "Extensible extraction architecture",
    ],
    decisions: [
      {
        decision: "Separate extraction coverage from confidence and provenance.",
        reason:
          "A large field count is not useful unless operators can understand where values came from and what needs review.",
        tradeoff:
          "The product surface becomes more complex than a single upload-and-answer screen.",
      },
      {
        decision: "Design for heterogeneous files rather than one document template.",
        reason:
          "Real collections contain mixed formats, layouts, and embedded metadata families.",
        tradeoff:
          "Coverage expands incrementally and requires clear capability boundaries by file type.",
      },
    ],
    constraints: [
      "Different file types expose different metadata families",
      "High field coverage must not be confused with verified correctness",
      "Long-running extraction needs visible progress and failure states",
    ],
    technologies: ["Python", "TypeScript", "Document parsing", "Metadata", "Access control"],
    screenshots: [],
    links: [
      { label: "View repository", href: "https://github.com/pranaysuyash/metaextract" },
    ],
  },
  {
    slug: "echopanel",
    title: "EchoPanel",
    category: "Local-first audio product",
    maturity: "Working prototype",
    year: "2026",
    summary:
      "A macOS recording and transcript workflow designed around local capture, private processing, and finding the exact moment later.",
    primaryUser:
      "People recording meetings, interviews, or research sessions who want searchable memory without defaulting to cloud storage.",
    role: "Product design and prototype implementation across capture flow, local transcription, transcript navigation, and retrieval.",
    outcome:
      "Built a working native-product direction that connects capture, transcription, and retrieval; system-audio setup and production packaging remain active work.",
    whatExists: [
      "Native macOS product surface",
      "Recording workflow",
      "Local transcription experiments",
      "Transcript navigation and search direction",
      "Export-oriented local storage design",
    ],
    decisions: [
      {
        decision: "Make capture a lightweight native action.",
        reason:
          "The product only becomes useful when recording starts with very little friction.",
        tradeoff:
          "Native audio permissions and system-audio capture require platform-specific handling.",
      },
      {
        decision: "Prefer local storage and inference where practical.",
        reason:
          "Meeting audio can be sensitive, and local-first behaviour creates a clearer trust boundary.",
        tradeoff:
          "Model size, performance, and hardware variance become product constraints.",
      },
    ],
    constraints: [
      "macOS microphone and system-audio permissions",
      "Transcription latency on local hardware",
      "Clear failure states when capture sources are unavailable",
    ],
    technologies: ["Swift", "AVFoundation", "CoreAudio", "Whisper", "SQLite"],
    screenshots: [
      "/assets/projects/echopanel/hero.jpg",
      "/assets/projects/echopanel/detail1.jpg",
      "/assets/projects/echopanel/detail2.jpg",
    ],
    links: [
      { label: "View repository", href: "https://github.com/pranaysuyash/EchoPanel" },
    ],
  },
  {
    slug: "sentineltwin",
    title: "SentinelTwin",
    category: "Spatial intelligence and simulation",
    maturity: "Active platform build",
    year: "2026",
    summary:
      "A physical-security digital twin for camera planning, coverage analysis, incident paths, comparison, and evidence-backed hardening decisions.",
    primaryUser:
      "Security planners, auditors, operators, and teams reasoning about physical spaces before changing hardware or policy.",
    role: "Product architecture and hands-on platform development across editor state, scene interaction, coverage simulation, path analysis, and evidence surfaces.",
    outcome:
      "Built the active platform spine for editable scenes, security objects, coverage reasoning, and counterfactual product workflows.",
    whatExists: [
      "Editable spatial scene",
      "Camera and zone product objects",
      "Coverage and blind-zone reasoning",
      "Path and scenario simulation foundations",
      "Evidence-led comparison direction",
    ],
    decisions: [
      {
        decision: "Separate deterministic simulation from AI explanation.",
        reason:
          "Coverage and path claims should be computed and inspectable before an AI layer explains or proposes changes.",
        tradeoff:
          "The platform requires a deeper simulation and data-model foundation than a visual-only 3D viewer.",
      },
      {
        decision: "Treat the scene as an operating model, not a static render.",
        reason:
          "Security decisions change with obstructions, zones, time, movement, and policy.",
        tradeoff:
          "State management, calibration, and verification become core product work.",
      },
    ],
    constraints: [
      "Coverage must remain explainable and reproducible",
      "Scene edits must update analysis without hidden state",
      "The product must distinguish simulated claims from verified real-world observations",
    ],
    technologies: ["React", "TypeScript", "Three.js", "React Three Fiber", "Zustand"],
    screenshots: [
      "https://raw.githubusercontent.com/pranaysuyash/SentinelTwin/main/shot-map.png",
    ],
    links: [
      { label: "View repository", href: "https://github.com/pranaysuyash/SentinelTwin" },
    ],
  },
];

export const auditedProjectBySlug = Object.fromEntries(
  auditedProjects.map((project) => [project.slug, project]),
) as Record<string, AuditedProject>;

export const maturityOrder: ProjectMaturity[] = [
  "Commercial product",
  "Working product build",
  "Active platform build",
  "Working prototype",
];
