import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "SentinelTwin | Physical Security Digital Twin | Pranay Suyash",
  description:
    "An AI-native physical-security digital twin for coverage analysis, incident replay, comparison, governance, and evidence-backed hardening decisions.",
  openGraph: {
    title: "SentinelTwin | Pranay Suyash",
    description:
      "A complex spatial product system combining interactive editing, deterministic simulation, evidence, and operational workflows.",
    type: "article",
  },
};

const screenshots = [
  {
    src: "https://raw.githubusercontent.com/pranaysuyash/SentinelTwin/main/shot-map.png",
    alt: "SentinelTwin studio map view",
  },
  {
    src: "https://raw.githubusercontent.com/pranaysuyash/SentinelTwin/main/shot-camera-view.png",
    alt: "SentinelTwin camera coverage view",
  },
  {
    src: "https://raw.githubusercontent.com/pranaysuyash/SentinelTwin/main/shot-path-replay.png",
    alt: "SentinelTwin path replay view",
  },
  {
    src: "https://raw.githubusercontent.com/pranaysuyash/SentinelTwin/main/shot-compare.png",
    alt: "SentinelTwin comparison view",
  },
];

const productSpine = [
  "Intake flows for scan, floor plan, JSON import, and AI-assisted drafts",
  "Map, camera, wall, path replay, comparison, report, and governance surfaces",
  "Deterministic coverage and evidence computation rather than untraceable visual claims",
  "Sensor and live-metadata ingest seams for future scene-to-reality alignment",
  "Local-first workspace persistence, archive, recovery, and operator history",
];

const architecture = [
  {
    title: "Spatial editor",
    body: "Scene, wall, camera, zone, object, and path editing with selection, transforms, snapping, inspection, and persistent document state.",
  },
  {
    title: "Simulation engine",
    body: "Coverage, visibility, DORI-style reasoning, adversarial paths, replay, redundancy, and temporal conditions computed from scene state.",
  },
  {
    title: "Intelligence layer",
    body: "AI-assisted scene drafting, recommendations, explanations, and tool-driven analysis grounded in deterministic product state.",
  },
  {
    title: "Evidence and governance",
    body: "Comparison, reports, provenance, review states, audit surfaces, and explicit separation between implemented, preview, and planned behavior.",
  },
];

const tradeoffs = [
  "Built the platform spine instead of optimizing only for a visually impressive camera editor.",
  "Kept core coverage and evidence deterministic so AI can explain or recommend without becoming the source of truth.",
  "Used local-first persistence early to make complex scene work recoverable before adding account and collaboration complexity.",
  "Separated current behavior from preview and planned surfaces to avoid turning roadmap intent into misleading product claims.",
];

export default function SentinelTwinPage() {
  return (
    <PageLayout>
      <article className="py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <Link
            href="/work"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to selected work
          </Link>

          <header className="animate-fade-up">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
                Spatial intelligence
              </span>
              <span className="text-xs text-muted-foreground">2026</span>
              <span className="rounded bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
                Active product build
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              SentinelTwin
            </h1>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-muted-foreground md:text-xl">
              An AI-native physical-security digital twin for coverage failure analysis,
              incident replay, comparison, governance, and evidence-backed hardening decisions.
            </p>

            <div className="mt-8 rounded-xl border bg-muted/25 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                What this project proves
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/90">
                I can take a broad, ambiguous domain and build a coherent product spine
                across interactive editing, simulation, data modeling, evidence, governance,
                persistence, and AI-assisted workflows without reducing the product to one demo surface.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {["React", "TypeScript", "Three.js", "React Three Fiber", "Zustand", "Spatial simulation"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-primary/5 px-3 py-1 font-mono text-sm text-primary"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link
                  href="https://github.com/pranaysuyash/SentinelTwin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View public repository <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild>
                <Link href="/contact?type=project&source=sentineltwin">
                  Discuss a related system <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </header>

          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-semibold">Product surfaces</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {screenshots.map((screenshot, index) => (
                <div
                  key={screenshot.src}
                  className={`overflow-hidden rounded-xl border bg-muted/30 ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className="h-auto w-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="mt-16 space-y-14">
            <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Why it exists
                </p>
                <p className="leading-8 text-muted-foreground">
                  Camera planning and security audits are usually fragmented across floor
                  plans, vendor tools, spreadsheets, video review, and subjective judgment.
                  Teams can place devices, but they struggle to explain coverage failure,
                  compare alternatives, replay movement, or preserve evidence behind a recommendation.
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Product thesis
                </p>
                <p className="leading-8 text-muted-foreground">
                  The valuable product is not a 3D camera configurator. It is a living
                  security decision system where scene state, coverage, paths, incidents,
                  evidence, governance, and recommended changes stay connected over time.
                </p>
              </div>
            </section>

            <section className="border-y py-12">
              <h2 className="text-2xl font-semibold">Current product spine</h2>
              <ul className="mt-6 space-y-3">
                {productSpine.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 leading-8 text-muted-foreground"
                  >
                    <span className="mt-1.5 text-primary">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">System architecture</h2>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                {architecture.map((item) => (
                  <div key={item.title} className="rounded-lg border bg-card p-5 shadow-sm">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold">Important trade-offs</h2>
              <ul className="space-y-3">
                {tradeoffs.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 leading-8 text-muted-foreground"
                  >
                    <span className="mt-1.5 text-primary">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border bg-muted/30 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Current status
              </p>
              <p className="mt-3 text-lg leading-8 text-foreground">
                The repository contains the product spine and working studio surfaces.
                The next phase is continued full-app buildout, hardening, removal of placeholders,
                stronger deployment and governance, and deeper alignment between simulated scenes and live evidence.
              </p>
            </section>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
            <Link
              href="/work"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              ← Back to selected work
            </Link>
            <Button asChild>
              <Link href="/contact?type=project&source=sentineltwin-bottom">
                Discuss a spatial or simulation product <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
