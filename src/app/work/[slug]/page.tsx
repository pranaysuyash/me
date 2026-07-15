import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/page-layout";
import projectsData from "@/content/projects.json";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

type BaseProject = (typeof projectsData.projects)[number];
type Project = BaseProject & {
  demonstrates?: string;
  proofRole?: string;
  proofSummary?: string;
  screenshots?: string[];
  technicalDepth?: Record<string, string>;
  outcomes?: string[];
  ownership?: string;
  constraints?: string[];
  tradeoffs?: string[];
  whatChanged?: string[];
  artifacts?: string[];
};

const baseUrl = "https://pranaysuyash.com";

const TECHNICAL_LABELS: Record<string, string> = {
  architecture: "Architecture",
  cvPipeline: "Computer vision pipeline",
  ocrPipeline: "OCR and preprocessing",
  audioCapture: "Audio capture",
  transcription: "Transcription",
  normalization: "Schema normalization",
  storage: "Storage and retrieval",
  performance: "Performance",
  backend: "Backend",
  signing: "Digital signing",
  monetization: "Commercial system",
  distribution: "Distribution",
  ux: "Product experience",
  integration: "Integrations",
};

function humanizeTechnicalKey(key: string) {
  if (TECHNICAL_LABELS[key]) return TECHNICAL_LABELS[key];
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (character) => character.toUpperCase());
}

function EvidenceList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 leading-relaxed text-muted-foreground"
        >
          <span className="mt-1.5 text-primary">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function generateStaticParams() {
  return projectsData.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.projects.find(
    (item) => item.slug === slug,
  ) as Project | undefined;

  if (!project) return {};

  const canonicalUrl = `${baseUrl}/work/${project.slug}`;
  const preview = project.screenshots?.[0];

  return {
    title: `${project.title} | Work | Pranay Suyash`,
    description: project.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.title} | Pranay Suyash`,
      description: project.tagline,
      type: "article",
      url: canonicalUrl,
      images: preview
        ? [
            {
              url: preview,
              alt: `${project.title} product interface`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: preview ? "summary_large_image" : "summary",
      title: `${project.title} | Pranay Suyash`,
      description: project.tagline,
      images: preview ? [preview] : undefined,
    },
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = projectsData.projects.find(
    (item) => item.slug === slug,
  ) as Project | undefined;

  if (!project) notFound();

  const linkEntries = project.links
    ? Object.entries(project.links).filter(([, url]) => url && url !== "#")
    : [];
  const technicalEntries = project.technicalDepth
    ? Object.entries(project.technicalDepth).filter(([, value]) => Boolean(value))
    : [];

  return (
    <PageLayout>
      <article className="py-20 md:py-28">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
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
                {project.category}
              </span>
              <span className="text-xs text-muted-foreground">{project.year}</span>
              {project.featured && (
                <span className="rounded bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
                  Flagship evidence
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
              {project.tagline}
            </p>

            {(project.proofSummary || project.demonstrates || project.proofRole) && (
              <div className="mt-8 rounded-xl border bg-muted/25 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  What this project proves
                </p>
                <p className="mt-3 text-sm leading-7 text-foreground/90">
                  {project.proofSummary || project.demonstrates || project.proofRole}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-primary/5 px-3 py-1 font-mono text-sm text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>

            {linkEntries.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-3">
                {linkEntries.map(([label, url]) => (
                  <Button key={label} variant="outline" asChild>
                    <Link href={url} target="_blank" rel="noopener noreferrer">
                      {label === "github"
                        ? "View repository"
                        : label === "live"
                          ? "Open live product"
                          : label.charAt(0).toUpperCase() + label.slice(1)}
                      <ExternalLink className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </header>

          {project.screenshots && project.screenshots.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 text-xl font-semibold">Product surfaces</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.screenshots.map((screenshot, index) => (
                  <div
                    key={screenshot}
                    className={`relative aspect-[16/10] overflow-hidden rounded-xl border bg-muted/30 ${
                      index === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <Image
                      src={screenshot}
                      alt={`${project.title} product surface ${index + 1}`}
                      fill
                      unoptimized
                      priority={index === 0}
                      sizes={index === 0 ? "(min-width: 896px) 896px, 100vw" : "(min-width: 640px) 50vw, 100vw"}
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-14 space-y-12">
            <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  What it is
                </p>
                <p className="leading-8 text-muted-foreground">{project.description}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Why it exists
                </p>
                <p className="leading-8 text-muted-foreground">{project.problem}</p>
              </div>
            </section>

            <section className="border-y py-10">
              <h2 className="text-2xl font-semibold">Workflow and build approach</h2>
              <p className="mt-4 leading-8 text-muted-foreground">{project.approach}</p>
            </section>

            {project.outcomes && project.outcomes.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-semibold">Evidence and outcomes</h2>
                <EvidenceList items={project.outcomes} />
              </section>
            )}

            {technicalEntries.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold">What was built</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {technicalEntries.map(([key, value]) => (
                    <div key={key} className="rounded-lg border bg-card p-5 shadow-sm">
                      <h3 className="text-sm font-semibold">{humanizeTechnicalKey(key)}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {project.ownership && (
              <section>
                <h2 className="mb-3 text-2xl font-semibold">Ownership and scope</h2>
                <p className="leading-8 text-muted-foreground">{project.ownership}</p>
              </section>
            )}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {project.constraints && project.constraints.length > 0 && (
                <section>
                  <h2 className="mb-4 text-xl font-semibold">Constraints</h2>
                  <EvidenceList items={project.constraints} />
                </section>
              )}
              {project.tradeoffs && project.tradeoffs.length > 0 && (
                <section>
                  <h2 className="mb-4 text-xl font-semibold">Trade-offs</h2>
                  <EvidenceList items={project.tradeoffs} />
                </section>
              )}
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {project.whatChanged && project.whatChanged.length > 0 && (
                <section>
                  <h2 className="mb-4 text-xl font-semibold">What changed</h2>
                  <EvidenceList items={project.whatChanged} />
                </section>
              )}
              {project.artifacts && project.artifacts.length > 0 && (
                <section>
                  <h2 className="mb-4 text-xl font-semibold">Workflow artifacts</h2>
                  <EvidenceList items={project.artifacts} />
                </section>
              )}
            </div>

            <section className="rounded-xl border bg-muted/30 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Result
              </p>
              <p className="mt-3 text-lg leading-8 text-foreground">{project.result}</p>
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
              <Link href="/contact?type=project&source=case-study">
                Discuss a related build <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
