"use client";

import { useState } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import projectsData from "@/content/projects.json";

const CATEGORY_ORDER = [
  { key: "featured", label: "Featured" },
  { key: "AI/ML", label: "AI & Machine Learning" },
  { key: "Computer Vision", label: "Computer Vision" },
  { key: "macOS", label: "macOS & Native" },
  { key: "Developer Tools", label: "Developer Tools" },
  { key: "Product", label: "Product & Other" },
  { key: "Data", label: "Data & Analytics" },
  { key: "Mobile", label: "Mobile" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "AI/ML":
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Computer Vision":
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  macOS:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "Developer Tools":
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Product: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  Data: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Mobile: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  Featured: "bg-primary/10 text-primary",
};

type Project = (typeof projectsData.projects)[0];

function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <Link key={project.slug} href={`/work/${project.slug}`} className="block">
      <Card
        className={`hover-lift h-full transition-all duration-200 ${
          featured
            ? "border-2 border-primary/20 bg-card"
            : "border shadow-sm bg-card"
        }`}
      >
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className={`text-xs font-mono px-2 py-1 rounded ${
                CATEGORY_COLORS[project.category] ||
                "bg-muted text-muted-foreground"
              }`}
            >
              {project.category}
            </span>
            {featured && (
              <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                Featured
              </span>
            )}
            <span className="text-xs text-muted-foreground ml-auto">
              {project.year}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
            {project.tagline}
          </p>
          <p className="text-xs text-primary/80 leading-relaxed mb-4">
            {project.result}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono bg-primary/5 text-primary px-2 py-0.5 rounded"
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

  const allFeatured = projectsData.projects.filter((p: Project) => p.featured);
  const allNonFeatured = projectsData.projects.filter(
    (p: Project) => !p.featured,
  );

  const filteredFeatured = activeFilter
    ? allFeatured.filter((p: Project) => p.category === activeFilter)
    : allFeatured;

  const groupedNonFeatured = allNonFeatured.reduce(
    (acc, project) => {
      const cat = project.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(project);
      return acc;
    },
    {} as Record<string, Project[]>,
  );

  const filteredGrouped = activeFilter
    ? (Object.fromEntries(
        Object.entries(groupedNonFeatured)
          .map(([cat, projects]) => [
            cat,
            (projects as Project[]).filter(
              (p: Project) => p.category === activeFilter,
            ),
          ])
          .filter(([, projects]) => (projects as Project[]).length > 0),
      ) as Record<string, Project[]>)
    : groupedNonFeatured;

  const categories = CATEGORY_ORDER.filter((c) =>
    c.key === "featured"
      ? allFeatured.length > 0
      : Boolean(groupedNonFeatured[c.key]),
  );

  return (
    <PageLayout>
      <section className="py-20 md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Selected <span className="gradient-text">work</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A few projects that show how I scope, build, and ship applied AI
              and workflow-heavy systems.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            <Button
              variant={activeFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(null)}
              className="text-xs"
            >
              All
            </Button>
            {categories.map((cat) =>
              cat.key !== "featured" ? (
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
              ) : null,
            )}
          </div>

          {categories.map((cat) => {
            const isFeatured = cat.key === "featured";
            if (isFeatured && filteredFeatured.length === 0) return null;
            const projects = isFeatured
              ? filteredFeatured
              : filteredGrouped[cat.key] || [];

            if (projects.length === 0) return null;

            return (
              <div key={cat.key} className="mb-12">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                  {isFeatured ? "Featured" : cat.label}
                  <span className="ml-2 text-muted-foreground/50">
                    ({projects.length})
                  </span>
                </h2>
                <div
                  className={
                    isFeatured
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  }
                >
                  {projects.map((project: Project) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      featured={isFeatured}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}
