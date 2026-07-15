"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import projectsData from "@/content/projects.json";

const CATEGORY_ORDER = [
  { key: "AI/ML", label: "AI and ML" },
  { key: "Computer Vision", label: "Computer vision" },
  { key: "macOS", label: "Native and local-first" },
  { key: "Developer Tools", label: "Developer tools" },
  { key: "Product", label: "Product systems" },
  { key: "Data", label: "Data and analytics" },
  { key: "Mobile", label: "Mobile" },
];

const FLAGSHIP_SLUGS = ["sig-ext-fastapi", "metaextract", "echopanel"];
const TECHNICAL_DEPTH_SLUGS = ["model-lab", "agents"];

type Project = (typeof projectsData.projects)[number] & {
  proofRole?: string;
  proofSummary?: string;
  demonstrates?: string;
  screenshots?: string[];
};

const sentinelTwin = {
  title: "SentinelTwin",
  category: "Spatial intelligence",
  year: "2026",
  stage: "Active product build",
  tagline:
    "Physical-security digital twin for coverage analysis, incident replay, comparison, governance, and evidence-backed hardening decisions.",
  proofSummary:
    "Shows complex product architecture across interactive editors, deterministic simulation, evidence surfaces, local persistence, and a broader platform spine.",
  techStack: ["React", "TypeScript", "Three.js", "R3F", "Zustand"],
  href: "/work/sentineltwin",
  image: "https://raw.githubusercontent.com/pranaysuyash/SentinelTwin/main/shot-map.png",
};

function ProjectPreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-[16/9] overflow-hidden border-b bg-muted">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
      />
    </div>
  );
}

function ArchiveProjectCard({ project }: { project: Project }) {
  const preview = project.screenshots?.[0];

  return (
    <Link href={`/work/${project.slug}`} className="group block h-full">
      <Card className="hover-lift h-full overflow-hidden border bg-card shadow-sm">
        {preview && <ProjectPreview src={preview} alt={`${project.title} product interface`} />}
        <CardContent className="flex h-full flex-col p-5">
          <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="uppercase tracking-[0.12em]">{project.category}</span>
            <span className="ml-auto font-mono">{project.year}</span>
          </div>
          <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
            {project.tagline}
          </p>
          <p className="mt-4 text-xs leading-5 text-primary/80">{project.result}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

function ExistingFlagshipCard({ project }: { project: Project }) {
  const preview = project.screenshots?.[0];

  return (
    <Link href={`/work/${project.slug}`} className="group block h-full">
      <Card className="hover-lift h-full overflow-hidden border bg-card shadow-sm">
        {preview && <ProjectPreview src={preview} alt={`${project.title} product interface`} />}
        <CardContent className="flex h-full flex-col p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {project.category}
              </p>
              <p className="mt-1 text-xs text-primary">
                {project.proofRole || "Flagship system"}
              </p>
            </div>
            <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
          </div>
          <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.tagline}</p>
          <p className="evidence-rule mt-5 text-sm leading-7 text-muted-foreground">
            <span className="font-semibold text-foreground">What it proves:</span>{" "}
            {project.proofSummary || project.demonstrates || project.result}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
            {project.techStack.slice(0, 4).map((tech) => (
              <span key={tech} className="text-xs text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Review case file <ArrowRight className="h-4 w-4" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const projects = projectsData.projects as Project[];
  const flagshipProjects = FLAGSHIP_SLUGS.map((slug) =>
    projects.find((project) => project.slug === slug),
  ).filter((project): project is Project => Boolean(project));

  const technicalDepthProjects = TECHNICAL_DEPTH_SLUGS.map((slug) =>
    projects.find((project) => project.slug === slug),
  ).filter((project): project is Project => Boolean(project));

  const reservedSlugs = new Set([...FLAGSHIP_SLUGS, ...TECHNICAL_DEPTH_SLUGS]);
  const archiveProjects = projects.filter((project) => !reservedSlugs.has(project.slug));

  const groupedArchive = archiveProjects.reduce(
    (acc, project) => {
      if (!acc[project.category]) acc[project.category] = [];
      acc[project.category].push(project);
      return acc;
    },
    {} as Record<string, Project[]>,
  );

  const categories = CATEGORY_ORDER.filter((category) =>
    Boolean(groupedArchive[category.key]),
  );

  const filteredGrouped = activeFilter
    ? ({ [activeFilter]: groupedArchive[activeFilter] || [] } as Record<string, Project[]>)
    : groupedArchive;

  return (
    <PageLayout>
      <section className="border-b bg-[#10191a] py-20 text-white md:py-28">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl animate-fade-up">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-teal-100/75">
              Selected work
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Systems, not a repository wall.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              The strongest work is grouped by what it proves: commercial product
              ownership, document and media intelligence, local-first product design,
              and complex simulation. Older experiments remain available below without
              competing with the flagship evidence.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b py-8">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-4 px-4 md:grid-cols-3 md:px-6 lg:px-8">
          <div className="evidence-rule py-2">
            <p className="text-sm font-semibold">Commercial proof</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Paid products, client systems, and workflows tied to a real operating result.
            </p>
          </div>
          <div className="evidence-rule py-2">
            <p className="text-sm font-semibold">System depth</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Architecture, constraints, trade-offs, data flow, and reviewer or operator states.
            </p>
          </div>
          <div className="evidence-rule py-2">
            <p className="text-sm font-semibold">Exploration range</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Native apps, computer vision, audio, agents, mobile, maps, and developer tooling.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Flagship systems
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Four projects that explain the breadth without diluting the signal.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Link href={sentinelTwin.href} className="group block h-full">
              <Card className="hover-lift h-full overflow-hidden border border-primary/30 bg-primary/[0.025] shadow-sm">
                <ProjectPreview
                  src={sentinelTwin.image}
                  alt="SentinelTwin spatial-security map interface"
                />
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {sentinelTwin.category}
                      </p>
                      <p className="mt-1 text-xs text-primary">{sentinelTwin.stage}</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {sentinelTwin.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
                    {sentinelTwin.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {sentinelTwin.tagline}
                  </p>
                  <p className="evidence-rule mt-5 text-sm leading-7 text-muted-foreground">
                    <span className="font-semibold text-foreground">What it proves:</span>{" "}
                    {sentinelTwin.proofSummary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
                    {sentinelTwin.techStack.map((tech) => (
                      <span key={tech} className="text-xs text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Review SentinelTwin <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            {flagshipProjects.map((project) => (
              <ExistingFlagshipCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {technicalDepthProjects.length > 0 && (
        <section className="border-y bg-muted/35 py-16">
          <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Technical depth
              </p>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Evaluation, model infrastructure, and orchestration work.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {technicalDepthProjects.map((project) => (
                <ArchiveProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Project archive
              </p>
              <h2 className="text-3xl font-bold tracking-tight">Earlier work and experiments</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Useful range and learning evidence, deliberately separated from the primary buying signal.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(null)}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={activeFilter === category.key ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setActiveFilter(activeFilter === category.key ? null : category.key)
                  }
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            {Object.entries(filteredGrouped)
              .filter(([, projectsInCategory]) => projectsInCategory.length > 0)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([category, projectsInCategory]) => (
                <div key={category}>
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {category}{" "}
                    <span className="font-normal opacity-60">
                      ({projectsInCategory.length})
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {projectsInCategory.map((project) => (
                      <ArchiveProjectCard key={project.slug} project={project} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="border-t py-16">
        <div className="container mx-auto max-w-[1000px] px-4 text-center md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Have a related workflow or product problem?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Send the current process, sample inputs, constraints, and what a useful outcome would change.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-md px-8">
            <Link href="/contact?type=project&source=work">
              Discuss a project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
