import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/page-layout";
import projectsData from "@/content/projects.json";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

type Project = (typeof projectsData.projects)[0] & {
  demonstrates?: string;
  proofRole?: string;
};

export function generateStaticParams() {
  return projectsData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = projectsData.projects.find((p) => p.slug === slug) as Project | undefined;

  if (!project) {
    notFound();
  }

  const linkEntries = project.links
    ? Object.entries(project.links).filter(([, url]) => url && url !== "#")
    : [];

  const hasTechnicalDepth =
    "technicalDepth" in project && project.technicalDepth;
  const hasOutcomes = "outcomes" in project && project.outcomes;
  const hasOwnership = "ownership" in project && project.ownership;
  const hasConstraints = "constraints" in project && project.constraints;
  const hasTradeoffs = "tradeoffs" in project && project.tradeoffs;
  const hasWhatChanged = "whatChanged" in project && project.whatChanged;
  const hasArtifacts = "artifacts" in project && project.artifacts;

  return (
    <PageLayout>
      <article className="py-20 md:py-28">
        <div className="container max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <Link
            href="/work"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all projects
          </Link>

          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                {project.category}
              </span>
              <span className="text-xs text-muted-foreground">
                {project.year}
              </span>
              {project.featured && (
                <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-sm font-mono bg-primary/5 text-primary px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {linkEntries.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-10">
                {linkEntries.map(([label, url]) => (
                  <Button
                    key={label}
                    variant="outline"
                    asChild
                    className="rounded-full"
                  >
                    <Link href={url} target="_blank" rel="noopener noreferrer">
                      {label === "github"
                        ? "View on GitHub"
                        : label.charAt(0).toUpperCase() + label.slice(1)}
                      <ExternalLink className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                ))}
              </div>
            )}

            <div className="mb-10" />

            <div className="space-y-10">
              <section>
                <h2 className="text-xl font-semibold mb-3">Problem</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.problem}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Approach</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.approach}
                </p>
              </section>

              {/* Outcomes before technical depth for featured/flagship projects */}
              {hasOutcomes && (
                <section>
                  <h2 className="text-xl font-semibold mb-3">Outcomes</h2>
                  <ul className="space-y-2">
                    {project.outcomes?.map((outcome, index) => (
                      <li
                        key={index}
                        className="text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-primary mt-1.5">→</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Technical Depth Section */}
              {hasTechnicalDepth && (
                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    Technical Implementation
                  </h2>
                  <div className="space-y-4">
                    {project.technicalDepth?.architecture && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          Architecture
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.technicalDepth.architecture}
                        </p>
                      </div>
                    )}
                    {project.technicalDepth?.cvPipeline && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          CV Pipeline
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.technicalDepth.cvPipeline}
                        </p>
                      </div>
                    )}
                    {project.technicalDepth?.ocrPipeline && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          OCR Pipeline
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.technicalDepth.ocrPipeline}
                        </p>
                      </div>
                    )}
                    {project.technicalDepth?.audioCapture && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          Audio Capture
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.technicalDepth.audioCapture}
                        </p>
                      </div>
                    )}
                    {project.technicalDepth?.transcription && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          Transcription
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.technicalDepth.transcription}
                        </p>
                      </div>
                    )}
                    {project.technicalDepth?.normalization && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          Schema Normalization
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.technicalDepth.normalization}
                        </p>
                      </div>
                    )}
                    {project.technicalDepth?.storage && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          Storage & Search
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.technicalDepth.storage}
                        </p>
                      </div>
                    )}
                    {project.technicalDepth?.performance && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          Performance
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.technicalDepth.performance}
                        </p>
                      </div>
                    )}
                    {project.technicalDepth?.backend && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          Backend
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.technicalDepth.backend}
                        </p>
                      </div>
                    )}
                    {project.technicalDepth?.signing && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          Digital Signing
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.technicalDepth.signing}
                        </p>
                      </div>
                    )}
                    {project.technicalDepth?.monetization && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          Monetization
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.technicalDepth.monetization}
                        </p>
                      </div>
                    )}
                    {project.technicalDepth?.distribution && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          Distribution
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.technicalDepth.distribution}
                        </p>
                      </div>
                    )}
                    {project.technicalDepth?.ux && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          UX Design
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.technicalDepth.ux}
                        </p>
                      </div>
                    )}
                    {project.technicalDepth?.integration && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          Integration
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.technicalDepth.integration}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Outcomes suppressed here — shown after Approach above for all projects */}

              {hasOwnership && (
                <section>
                  <h2 className="text-xl font-semibold mb-3">Ownership & scope</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.ownership as string}
                  </p>
                </section>
              )}

              {hasConstraints && (
                <section>
                  <h2 className="text-xl font-semibold mb-3">Constraints</h2>
                  <ul className="space-y-2">
                    {(project.constraints as string[]).map((item, index) => (
                      <li
                        key={index}
                        className="text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-primary mt-1.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {hasTradeoffs && (
                <section>
                  <h2 className="text-xl font-semibold mb-3">Trade-offs</h2>
                  <ul className="space-y-2">
                    {(project.tradeoffs as string[]).map((item, index) => (
                      <li
                        key={index}
                        className="text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-primary mt-1.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {hasWhatChanged && (
                <section>
                  <h2 className="text-xl font-semibold mb-3">What changed</h2>
                  <ul className="space-y-2">
                    {(project.whatChanged as string[]).map((item, index) => (
                      <li
                        key={index}
                        className="text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-primary mt-1.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {hasArtifacts && (
                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    Workflow artifacts
                  </h2>
                  <ul className="space-y-2">
                    {(project.artifacts as string[]).map((item, index) => (
                      <li
                        key={index}
                        className="text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-primary mt-1.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h2 className="text-xl font-semibold mb-3">Result</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.result}
                </p>
              </section>

              {/* What this demonstrates — flagship projects only */}
              {project.featured && (project as Project & { demonstrates?: string }).demonstrates && (
                <section className="border-t pt-8">
                  <h2 className="text-xl font-semibold mb-3">What this demonstrates</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {(project as Project & { demonstrates?: string }).demonstrates}
                  </p>
                </section>
              )}
            </div>
          </div>

          <div className="border-t mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              href="/work"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to all projects
            </Link>
            <div className="flex gap-3">
              <Button asChild className="rounded-full">
                <Link href="/work-with-me">Start a pilot</Link>
              </Button>
              <Button variant="outline" asChild className="rounded-full">
                <Link href="/hire-me">Hire Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
