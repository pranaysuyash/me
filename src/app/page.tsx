import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Rocket,
  FolderOpen,
  Zap,
  Shield,
  Database,
} from "lucide-react";
import projectsData from "@/content/projects.json";

const stats = [
  { label: "Years Experience", value: "10+" },
  { label: "GitHub Repos", value: "64" },
  { label: "Products Shipped", value: "15+" },
  { label: "Paid Product", value: "Gumroad" },
];

const capabilities = [
  {
    icon: Zap,
    title: "Applied AI & ML",
    description:
      "Document extraction, NLP, computer vision, and generative AI. Production-grade, not notebooks.",
  },
  {
    icon: Database,
    title: "Workflow Automation",
    description:
      "Internal tools, data pipelines, and dashboards that save teams hours every week.",
  },
  {
    icon: Shield,
    title: "Data Security",
    description:
      "ISO 27001 compliance, access controls, audit logging. Built for regulated industries.",
  },
];

export default function Home() {
  const featuredProjects = projectsData.projects.filter((p) => p.featured);

  return (
    <PageLayout>
      <section className="py-20 md:py-32 lg:py-40">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-sm font-mono text-muted-foreground mb-4 tracking-wide uppercase">
              Applied AI Builder &middot; Product Engineer
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              I build{" "}
              <span className="gradient-text">AI-powered products</span> that
              ship and sell.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              10+ years across product, engineering, and applied AI. Currently
              leading data &amp; data security at a YC-backed healthcare SaaS.
              I help teams go from idea to working software, fast.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/hire-me">
                  Hire Me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="rounded-full px-8"
              >
                <Link href="/work-with-me">Work With Me</Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                size="lg"
                className="rounded-full px-8"
              >
                <Link href="/work">Browse Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Wipro</span>
            <span className="font-medium text-foreground">EY</span>
            <span className="font-medium text-foreground">
              MedPiper <span className="text-xs text-muted-foreground">(YC S20)</span>
            </span>
            <span className="hidden sm:inline text-border">|</span>
            {stats.map((stat) => (
              <span key={stat.label}>
                <span className="font-semibold text-foreground">
                  {stat.value}
                </span>{" "}
                {stat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              What I Do
            </h2>
            <div className="gradient-line w-16 mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <Card
                key={cap.title}
                className="hover-lift border shadow-sm bg-card"
              >
                <CardContent className="p-6">
                  <cap.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cap.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Featured Work
              </h2>
              <div className="gradient-line w-16 mb-6" />
              <p className="text-muted-foreground max-w-lg">
                A selection of projects that demonstrate applied AI, product
                thinking, and shipping velocity.
              </p>
            </div>
            <Button variant="ghost" asChild className="rounded-full">
              <Link href="/work">
                View all projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.slice(0, 4).map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`}>
                <Card className="hover-lift border shadow-sm bg-card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                        {project.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {project.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
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

      <section className="py-20 md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Ready to build something?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Whether you need a full-time hire, a prototype built fast, or
            technical guidance — let&apos;s talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/hire-me">
                <Briefcase className="mr-2 h-4 w-4" /> Hire Me
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="rounded-full px-8"
            >
              <Link href="/work-with-me">
                <Rocket className="mr-2 h-4 w-4" /> Work With Me
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              size="lg"
              className="rounded-full px-8"
            >
              <Link href="/work">
                <FolderOpen className="mr-2 h-4 w-4" /> Browse Work
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
