import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import projectsData from "@/content/projects.json";
import { auditedProjectBySlug } from "@/lib/portfolio";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

type ArchiveProject = (typeof projectsData.projects)[number] & {
  links: Record<string, string>;
};

const baseUrl = "https://pranaysuyash.com";

export function generateStaticParams() {
  return projectsData.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const audited = auditedProjectBySlug[slug];
  const archive = projectsData.projects.find((project) => project.slug === slug);
  if (!audited && !archive) return {};

  const title = audited?.title ?? archive?.title ?? "Project";
  const description = audited?.summary ?? "Archived project repository and technical experiment.";
  const preview = audited?.screenshots[0];
  const canonical = `${baseUrl}/work/${slug}`;

  return {
    title: `${title} | Work | Pranay Suyash`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | Pranay Suyash`,
      description,
      url: canonical,
      type: "article",
      images: preview ? [{ url: preview, alt: `${title} product interface` }] : undefined,
    },
    twitter: {
      card: preview ? "summary_large_image" : "summary",
      title: `${title} | Pranay Suyash`,
      description,
      images: preview ? [preview] : undefined,
    },
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = auditedProjectBySlug[slug];
  const archive = projectsData.projects.find((item) => item.slug === slug) as
    | ArchiveProject
    | undefined;

  if (!project && !archive) notFound();

  if (!project && archive) {
    const repository = archive.links.github;
    const live = archive.links.live;
    return (
      <PageLayout>
        <article className="py-20 md:py-28">
          <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
            <Link href="/labs" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to project archive
            </Link>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Archive project · {archive.year}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{archive.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              Earlier repository or technical experiment preserved for range and learning history.
            </p>

            <div className="mt-10 rounded-xl border bg-muted/25 p-6">
              <p className="text-sm leading-7 text-muted-foreground">
                This archive page intentionally does not repeat historical claims about production use,
                adoption, customer outcomes, or current maturity. Review the repository and commit history
                for the implementation state.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {repository && (
                <Button asChild>
                  <Link href={repository} target="_blank" rel="noopener noreferrer">
                    View repository <Github className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              {live && (
                <Button asChild variant="outline">
                  <Link href={live} target="_blank" rel="noopener noreferrer">
                    Open live surface <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>

            <div className="mt-12 border-y py-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Repository technologies</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {archive.techStack.map((technology) => (
                  <span key={technology} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </PageLayout>
    );
  }

  if (!project) notFound();

  return (
    <PageLayout>
      <article>
        <header className="border-b bg-[#0d1718] text-white">
          <div className="container mx-auto max-w-[1120px] px-4 py-16 md:px-6 md:py-24 lg:px-8">
            <Link href="/work" className="inline-flex items-center text-sm text-white/58 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to selected work
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-100/70">
                {project.category}
              </span>
              <span className="rounded-full border border-white/16 px-3 py-1 text-xs text-white/65">
                {project.maturity}
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-5xl md:text-6xl">{project.title}</h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-white/70">{project.summary}</p>

            <div className="mt-9 grid grid-cols-1 border-y border-white/14 sm:grid-cols-3">
              <div className="py-5 sm:pr-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">Primary user</p>
                <p className="mt-2 text-sm leading-6 text-white/82">{project.primaryUser}</p>
              </div>
              <div className="border-t py-5 sm:border-l sm:border-t-0 sm:px-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">My role</p>
                <p className="mt-2 text-sm leading-6 text-white/82">{project.role}</p>
              </div>
              <div className="border-t py-5 sm:border-l sm:border-t-0 sm:pl-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">Current outcome</p>
                <p className="mt-2 text-sm leading-6 text-white/82">{project.outcome}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <Button key={link.href} asChild variant="outline" className="border-white/25 bg-white/[0.04] text-white hover:bg-white/[0.09]">
                  <Link href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label} <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </header>

        {project.screenshots.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto max-w-[1120px] px-4 md:px-6 lg:px-8">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Product surfaces</p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {project.screenshots.map((screenshot, index) => (
                  <figure key={screenshot} className={index === 0 ? "sm:col-span-2" : ""}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border bg-muted/30">
                      <Image
                        src={screenshot}
                        alt={`${project.title} product surface ${index + 1}`}
                        fill
                        unoptimized
                        priority={index === 0}
                        sizes={index === 0 ? "(min-width: 1120px) 1120px, 100vw" : "(min-width: 640px) 50vw, 100vw"}
                        className="object-cover object-top"
                      />
                    </div>
                    <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">
                      {index === 0
                        ? `Primary ${project.title} product surface.`
                        : `Supporting product state ${index + 1}, included as interface evidence rather than a maturity claim.`}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-y bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto grid max-w-[1120px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">What exists now</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">Current implementation boundary</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                This list is intentionally narrower than a product roadmap. It describes the current working surface used for this case study.
              </p>
            </div>
            <div className="divide-y border-y">
              {project.whatExists.map((item) => (
                <p key={item} className="py-5 text-sm leading-7 text-muted-foreground">{item}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-[1120px] px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Key product decisions</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Judgment is more useful than a technology list.
              </h2>
            </div>
            <div className="mt-10 space-y-6">
              {project.decisions.map((item, index) => (
                <article key={item.decision} className="grid gap-6 border-y py-7 md:grid-cols-[64px_1fr_1fr]">
                  <span className="font-mono text-xs text-primary">0{index + 1}</span>
                  <div>
                    <h3 className="font-semibold">{item.decision}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.reason}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Trade-off</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.tradeoff}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y bg-muted/30 py-16">
          <div className="container mx-auto grid max-w-[1120px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Constraints</h2>
              <ul className="mt-5 space-y-3">
                {project.constraints.map((constraint) => (
                  <li key={constraint} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {constraint}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Technologies used</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {project.technologies.map((technology) => (
                  <span key={technology} className="rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground">
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto flex max-w-[1120px] flex-col gap-5 px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
            <Link href="/work" className="text-sm text-muted-foreground hover:text-primary">← Back to selected work</Link>
            <Button asChild>
              <Link href={`/contact?type=project&source=${project.slug}`}>
                Discuss a related workflow <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
