import { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  Rocket,
  Zap,
  Wrench,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import projectsData from "@/content/projects.json";
import { FAQ } from "@/components/faq";

export const metadata: Metadata = {
  title: "Work With Pranay Suyash — AI Prototypes, Automation & Internal Tools",
  description:
    "Scoped AI prototypes, document extraction workflows, and internal tools — delivered in 2–4 weeks. Built by a YC-backed operator who ships working software weekly, not at the end.",
  openGraph: {
    title: "Work With Pranay Suyash",
    description:
      "AI prototypes, document extraction, workflow automation. Scoped in weeks.",
    type: "website",
  },
};

const serviceIcons: Record<string, React.ElementType> = {
  prototypes: Rocket,
  automation: Wrench,
  advisory: MessageSquare,
};

export default function WorkWithMePage() {
  const { services, process } = projectsData;

  return (
    <PageLayout>
      <section className="py-20 md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-sm font-mono text-muted-foreground mb-4 tracking-wide uppercase">
              For founders &amp; teams
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Build a scoped <span className="gradient-text">pilot</span> in
              weeks
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              I work with founders and lean teams who need practical momentum: a
              clear scope, weekly visible progress, and usable software at the
              end of the sprint — not a consulting deck.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact">
                  Send a short brief <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                size="lg"
                className="rounded-full px-8"
              >
                <Link href="/work">See My Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Best-fit engagements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = serviceIcons[service.id] || Zap;
              return (
                <Card
                  key={service.id}
                  className="hover-lift border shadow-sm h-full"
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <Icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <div className="space-y-2 border-t pt-4 mt-auto">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Timeline</span>
                        <span className="font-medium">{service.timeline}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">From</span>
                        <span className="font-semibold text-primary">
                          {service.priceFrom}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step) => (
              <div key={step.step} className="relative">
                <span className="text-5xl font-bold text-primary/10 mb-2 block">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            What You Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id}>
                <h3 className="font-semibold mb-3">{service.title}</h3>
                <ul className="space-y-2">
                  {service.deliverables.map((d) => (
                    <li
                      key={d}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-primary mt-1">&#10003;</span>
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 italic">
                  Ideal for: {service.idealFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container max-w-2xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <FAQ items={projectsData.faq} />
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Send a brief. I&apos;ll tell you if there&apos;s a fit.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Share the problem, constraints, timeline, and what "done" looks
            like. If it&apos;s a match, I&apos;ll reply with a concrete
            next-step plan.
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/contact">
              Send a short brief <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
