import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import projectsData from "@/content/projects.json";

const categories = [
  "All",
  ...Array.from(new Set(projectsData.projects.map((p) => p.category))),
];

export default function WorkPage() {
  return (
    <PageLayout>
      <section className="py-20 md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Selected <span className="gradient-text">Work</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Projects that demonstrate applied AI, product thinking, and
              shipping velocity. Each one solved a real problem.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-10 mb-8">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`text-sm px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                  cat === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.projects.map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`}>
                <Card className="hover-lift border shadow-sm bg-card h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                      {project.tagline}
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
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
