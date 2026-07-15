import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import projectsData from "@/content/projects.json";
import { auditedProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Project Archive and Technical Experiments | Pranay Suyash",
  description: "Earlier repositories, experiments, and technical explorations preserved separately from the primary professional case studies.",
  alternates: { canonical: "https://pranaysuyash.com/labs" },
};

const primarySlugs = new Set(auditedProjects.map((project) => project.slug));

export default function LabsPage() {
  const archive = projectsData.projects
    .filter((project) => !primarySlugs.has(project.slug))
    .sort((a, b) => Number(b.year) - Number(a.year));

  const grouped = archive.reduce<Record<string, typeof archive>>((acc, project) => {
    (acc[project.category] ||= []).push(project);
    return acc;
  }, {});

  return (
    <PageLayout>
      <section className="border-b bg-[#0d1718] text-white">
        <div className="container mx-auto max-w-[1180px] px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/70">Project archive</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-bold tracking-[-0.04em] sm:text-5xl md:text-6xl">
            Earlier repositories and technical experiments, without flagship inflation.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
            This archive preserves range and learning history. Each entry is intentionally limited to repository-level facts and does not claim current production use, customer adoption, or commercial maturity unless a dedicated audited case study says so.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 md:px-6 lg:px-8">
          <div className="space-y-16">
            {Object.entries(grouped).map(([category, projects]) => (
              <section key={category}>
                <div className="mb-7 flex items-end justify-between gap-4 border-b pb-4">
                  <h2 className="text-2xl font-bold tracking-tight">{category}</h2>
                  <span className="font-mono text-xs text-muted-foreground">
                    {projects.length} {projects.length === 1 ? "entry" : "entries"}
                  </span>
                </div>
                <div className="divide-y border-y">
                  {projects.map((project) => {
                    const links = project.links as Record<string, string>;
                    const repository = links.github;
                    const live = links.live;
                    return (
                      <article key={project.slug} className="grid gap-5 py-6 md:grid-cols-[1fr_auto] md:items-center">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <span className="rounded-full border px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
                              Archive · {project.year}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Earlier repository or experiment preserved for technical range. Review the source and commit history for its current implementation state.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-3">
                            {project.techStack.slice(0, 6).map((technology) => (
                              <span key={technology} className="text-xs text-muted-foreground">{technology}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3 md:justify-end">
                          {repository && (
                            <Link href={repository} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-primary">
                              Repository <Github className="ml-2 h-4 w-4" />
                            </Link>
                          )}
                          {live && (
                            <Link href={live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-primary">
                              Live surface <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-14">
        <div className="container mx-auto flex max-w-[1180px] flex-col gap-5 px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <div>
            <p className="font-semibold">Looking for the strongest professional evidence?</p>
            <p className="mt-2 text-sm text-muted-foreground">The selected Work page contains audited maturity, ownership, decisions, and outcomes.</p>
          </div>
          <Link href="/work" className="inline-flex items-center text-sm font-semibold text-primary">
            Return to selected work <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
