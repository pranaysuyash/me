"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  FileSearch,
  ImageDown,
  ScanSearch,
  ShieldCheck,
  View,
  type LucideIcon,
} from "lucide-react";
import { DocumentExtractionMechanism } from "./document-extraction-mechanism";
import { SignatureCleanupMechanism } from "./signature-cleanup-mechanism";
import { SpatialVisibilityMechanism } from "./spatial-visibility-mechanism";
import { VisualInspectionMechanism } from "./visual-inspection-mechanism";

type MechanismId = "extraction" | "cleanup" | "inspection" | "visibility";

interface MechanismDefinition {
  id: MechanismId;
  label: string;
  eyebrow: string;
  title: string;
  summary: string;
  boundary: string;
  caseHref: string;
  caseLabel: string;
  icon: LucideIcon;
}

const mechanisms: MechanismDefinition[] = [
  {
    id: "extraction",
    label: "Evidence extraction",
    eyebrow: "Document intelligence",
    title: "Turn labelled text into reviewable fields with source evidence.",
    summary:
      "Edit the synthetic invoice, run a narrow deterministic parser, inspect the exact source line behind each field, and record a review decision.",
    boundary:
      "This is a real browser-side parser for a constrained invoice pattern. It is not the MetaExtract model stack, OCR layer, table parser, or production evaluation system.",
    caseHref: "/work/metaextract",
    caseLabel: "Inspect the MetaExtract case",
    icon: FileSearch,
  },
  {
    id: "cleanup",
    label: "Local image cleanup",
    eyebrow: "Local-first image processing",
    title: "Clean a noisy signature image without sending it to a server.",
    summary:
      "Use the synthetic scan or choose a local image, then adjust threshold, transparent background, and content cropping while Canvas performs the pixel transformation in this tab.",
    boundary:
      "This mechanism demonstrates image cleanup only. It does not claim identity verification, certified signing, PDF placement, packaging, or the full SignKit desktop workflow.",
    caseHref: "/work/sig-ext-fastapi",
    caseLabel: "Inspect the SignKit case",
    icon: ImageDown,
  },
  {
    id: "inspection",
    label: "Visual inspection",
    eyebrow: "Browser-side visual analysis",
    title: "Measure a scene before asking a model to explain it.",
    summary:
      "Inspect real image dimensions, luminance, contrast, dominant colour family, edge density, and the strongest boundary region using local pixel analysis.",
    boundary:
      "This is real pixel-level inspection, not object detection or semantic scene understanding. It demonstrates the deterministic evidence layer that can sit beneath a vision model.",
    caseHref: "/work/metaextract",
    caseLabel: "Review evidence-led visual systems",
    icon: ScanSearch,
  },
  {
    id: "visibility",
    label: "Spatial visibility",
    eyebrow: "Deterministic spatial reasoning",
    title: "Move one obstruction and recompute what the camera can see.",
    summary:
      "Drag the shelf or use keyboard-friendly position controls. The mechanism recomputes line-of-sight to the entrance and counter using geometric intersection tests.",
    boundary:
      "This is a two-dimensional visibility mechanism, not SentinelTwin's full 3D coverage, DORI, temporal simulation, calibration, path replay, or optimisation stack.",
    caseHref: "/work/sentineltwin",
    caseLabel: "Inspect the SentinelTwin case",
    icon: View,
  },
];

function MechanismPanel({ id }: { id: MechanismId }) {
  if (id === "extraction") return <DocumentExtractionMechanism />;
  if (id === "cleanup") return <SignatureCleanupMechanism />;
  if (id === "inspection") return <VisualInspectionMechanism />;
  return <SpatialVisibilityMechanism />;
}

export function CapabilityLab() {
  const [activeId, setActiveId] = useState<MechanismId>("extraction");
  const active = mechanisms.find((mechanism) => mechanism.id === activeId) ?? mechanisms[0];
  const ActiveIcon = active.icon;

  return (
    <div
      data-capability-lab
      className="overflow-hidden rounded-2xl border bg-background shadow-sm"
    >
      <div className="border-b bg-muted/25 p-3 md:p-4">
        <div
          role="tablist"
          aria-label="Choose a working mechanism"
          className="grid grid-cols-2 gap-2 lg:grid-cols-4"
        >
          {mechanisms.map((mechanism) => {
            const Icon = mechanism.icon;
            const selected = mechanism.id === activeId;
            return (
              <button
                key={mechanism.id}
                id={`capability-tab-${mechanism.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`capability-panel-${mechanism.id}`}
                onClick={() => setActiveId(mechanism.id)}
                className={`flex min-h-20 items-start gap-3 rounded-xl border px-3 py-3 text-left transition-colors md:px-4 ${
                  selected
                    ? "border-primary/40 bg-background text-foreground shadow-sm"
                    : "border-transparent text-muted-foreground hover:border-border hover:bg-background/65 hover:text-foreground"
                }`}
              >
                <Icon
                  className={`mt-0.5 h-4 w-4 shrink-0 ${selected ? "text-primary" : ""}`}
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-sm font-semibold leading-5">
                    {mechanism.label}
                  </span>
                  <span className="mt-1 hidden text-xs leading-5 text-muted-foreground sm:block">
                    {mechanism.eyebrow}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <section
        id={`capability-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`capability-tab-${active.id}`}
      >
        <div className="grid gap-6 border-b px-4 py-6 md:px-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
          <div>
            <div className="flex items-center gap-3 text-primary">
              <ActiveIcon className="h-5 w-5" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                {active.eyebrow}
              </p>
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
              {active.title}
            </h3>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
              {active.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.11em]">
              <span className="inline-flex items-center gap-1.5 rounded-full border bg-primary/[0.04] px-3 py-1.5 text-primary">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Runs in this browser
              </span>
              <span className="rounded-full border px-3 py-1.5 text-muted-foreground">
                Synthetic by default
              </span>
              <span className="rounded-full border px-3 py-1.5 text-muted-foreground">
                No model claim
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-7">
          <MechanismPanel id={active.id} />
        </div>

        <div className="grid gap-4 border-t bg-muted/25 px-4 py-5 md:px-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <p className="max-w-4xl text-xs leading-6 text-muted-foreground">
            <span className="font-semibold text-foreground">Claim boundary.</span>{" "}
            {active.boundary}
          </p>
          <Link
            href={active.caseHref}
            className="inline-flex items-center text-sm font-semibold text-primary"
          >
            {active.caseLabel}
            <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
