import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/page-layout";
import projectsData from "@/content/projects.json";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectsData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = projectsData.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const linkEntries = project.links
    ? Object.entries(project.links).filter(([, url]) => url && url !== "#")
    : [];

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
                      {label === "github" ? "View on GitHub" : label.charAt(0).toUpperCase() + label.slice(1)}
                      <ExternalLink className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                ))}
              </div>
            )}

            <div className="gradient-line w-16 mb-10" />

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

              <section>
                <h2 className="text-xl font-semibold mb-3">Result</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.result}
                </p>
              </section>
            </div>
          </div>

          <div className="border-t mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              href="/work"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              &larr; Back to all projects
            </Link>
            <div className="flex gap-3">
              <Button variant="outline" asChild className="rounded-full">
                <Link href="/hire-me">Hire Me</Link>
              </Button>
              <Button asChild className="rounded-full">
                <Link href="/work-with-me">Work With Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
