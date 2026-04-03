"use client";

import { useState } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import projectsData from "@/content/projects.json";

type Project = (typeof projectsData.projects)[0] & {
  featuredOrder?: number;
  proofRole?: string;
};

const FLAGSHIP_SLUGS = [
  "echopanel",
  "sig-ext-fastapi",
  "metaextract",
  "photosearch-experiment",
];
const TECHNICAL_DEPTH_SLUGS = ["model-lab"];

const CATEGORY_ORDER = [
  { key: "AI/ML", label: "AI & Machine Learning" },
  { key: "Computer Vision", label: "Computer Vision" },
  { key: "macOS", label: "macOS & Native" },
  { key: "Developer Tools", label: "Developer Tools" },
  { key: "Product", label: "Product & Other" },
  { key: "Data", label: "Data & Analytics" },
  { key: "Mobile", label: "Mobile" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "AI/ML": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Computer Vision": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  macOS: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "Developer Tools": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Product: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  Data: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Mobile: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
};

function FlagshipCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="block">
      <Card className="hover-lift h-full border shadow-sm bg-card">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`text-xs font-mono px-2 py-1 rounded ${
                CATEGORY_COLORS[project.category] ||
                "bg-muted text-muted-foreground"
              }`}
            >
              {project.category}
            </span>
            <span className="text-xs text-muted-foreground ml-auto">
              {project.year}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {project.tagline}
          </p>
          {/* Proof role — what this demonstrates */}
          {project.proofRole && (
            <p className="text-xs text-primary/60 mt-3 pt-3 border-t border-border/50 leading-relaxed">
              {project.proofRole}
            </p>
          )}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono bg-primary/5 text-primary px-2 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-4 text-xs text-primary font-medium">
            View case study <ArrowRight className="h-3 w-3 ml-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function TechnicalDepthCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="block max-w-2xl">
      <Card className="h-full border border-dashed shadow-none bg-muted/20 hover:bg-muted/40 transition-colors">
        <CardContent className="p-5 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
              {project.category}
            </span>
            <span className="text-xs text-muted-foreground ml-auto">
              {project.year}
            </span>
          </div>
          <h3 className="text-base font-semibold mb-1">{project.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-muted-foreground/70 px-2 py-0.5 rounded border border-border/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function CompactCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="block">
      <Card className="hover-lift h-full border shadow-sm bg-card">
        <CardContent className="p-5 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded ${
                CATEGORY_COLORS[project.category] ||
                "bg-muted text-muted-foreground"
              }`}
            >
              {project.category}
            </span>
            <span className="text-xs text-muted-foreground ml-auto">
              {project.year}
            </span>
          </div>
          <h3 className="text-sm font-semibold mb-1">{project.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed flex-1">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-1 mt-3">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono bg-primary/5 text-primary px-1.5 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const allProjects = projectsData.projects as Project[];

  // Flagship 4 — in confirmed order via featuredOrder
  const flagshipProjects = FLAGSHIP_SLUGS.map(
    (slug) => allProjects.find((p) => p.slug === slug)!
  ).filter(Boolean);

  // Technical depth — Model Lab
  const technicalDepthProjects = TECHNICAL_DEPTH_SLUGS.map(
    (slug) => allProjects.find((p) => p.slug === slug)!
  ).filter(Boolean);

  // More work — everything else
  const moreWorkProjects = allProjects.filter(
    (p) => !FLAGSHIP_SLUGS.includes(p.slug) && !TECHNICAL_DEPTH_SLUGS.includes(p.slug)
  );

  const filteredMoreWork = activeFilter
    ? moreWorkProjects.filter((p) => p.category === activeFilter)
    : moreWorkProjects;

  const availableCategories = CATEGORY_ORDER.filter((c) =>
    moreWorkProjects.some((p) => p.category === c.key)
  );

  return (
    <PageLayout>
      <section className="py-20 md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          {/* Page header */}
          <div className="max-w-3xl animate-fade-up mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Selected <span className="gradient-text">work</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Scoped builds, workflow systems, and practical AI across four flagship
              proof anchors — plus secondary technical depth and a broader archive.
            </p>
          </div>

          {/* ── Flagship section — editorial, no filters ── */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest shrink-0">
                Flagship work
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {flagshipProjects.map((project) => (
                <FlagshipCard key={project.slug} project={project} />
              ))}
            </div>
          </div>

          {/* ── Technical depth — Model Lab ── */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest shrink-0">
                Technical depth
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
              Evaluation infrastructure and pipeline rigor — not commercial products,
              but evidence of how I think about model selection, reliability, and
              systematic testing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technicalDepthProjects.map((project) => (
                <TechnicalDepthCard key={project.slug} project={project} />
              ))}
            </div>
          </div>

          {/* ── More work — with category filters ── */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest shrink-0">
                More work
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Filters only in this section */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button
                variant={activeFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(null)}
                className="text-xs"
              >
                All
              </Button>
              {availableCategories.map((cat) => (
                <Button
                  key={cat.key}
                  variant={activeFilter === cat.key ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setActiveFilter(activeFilter === cat.key ? null : cat.key)
                  }
                  className="text-xs"
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMoreWork.map((project) => (
                <CompactCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
