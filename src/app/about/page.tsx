import { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Pranay Suyash",
  description:
    "I work in the gap between a broken workflow and a working system — 14 years building products, most recently at MedPiper (YC S20).",
  openGraph: {
    title: "About | Pranay Suyash",
    description:
      "I work in the gap between a broken workflow and a working system. Based in Bengaluru.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Story + identity */}
      <section className="py-20 md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start">
            {/* Left: identity + links */}
            <div className="animate-fade-up">
              <div className="w-40 h-40 bg-muted rounded-full flex items-center justify-center text-4xl font-bold text-primary mb-3">
                PS
              </div>
              <p className="font-semibold text-foreground mb-1">Pranay Suyash</p>
              <p className="text-sm text-muted-foreground mb-6">Bengaluru, India</p>
              <div className="flex flex-col gap-3 mb-6">
                <Button asChild className="rounded-full w-full">
                  <Link href="/work-with-me">
                    Start a pilot <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="rounded-full w-full">
                  <Link href="/hire-me">Hire Me</Link>
                </Button>
                <Button variant="outline" asChild className="rounded-full w-full">
                  <a href="/pranay_resume.html" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" /> Resume
                  </a>
                </Button>
              </div>
              <div className="flex gap-3">
                <Link
                  href="https://github.com/pranaysuyash"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://linkedin.com/in/pranaysuyash"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="https://x.com/pranaysuyash"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="mailto:pranay.suyash@gmail.com"
                  aria-label="Email"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Right: story */}
            <div className="animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                About
              </h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I started out in enterprise consulting, working on SAP
                  implementations and large process-heavy systems. That taught
                  me how organizations actually run, where work gets stuck, and
                  how much time disappears between a plan and something that is
                  genuinely usable.
                </p>
                <p>
                  That changed when I joined MedPiper, a YC-backed healthcare
                  startup, and had to operate much closer to the work itself. I
                  moved from process and delivery into product, platform,
                  workflow design, compliance, and hands-on system building. The
                  work stopped being theoretical very quickly.
                </p>
                <p>
                  At MedPiper, I worked across product, platform, data
                  workflows, and security/compliance, helping build systems that
                  support real healthcare and insurance operations. We scaled to
                  roughly $1M ARR while I was working across those functions,
                  and that experience changed how I think about software: speed
                  matters, but only if what you ship actually survives real
                  users, real constraints, and messy operations.
                </p>
                <p>
                  Alongside my work at MedPiper, I have built and shipped
                  independent tools and paid products. That parallel work matters
                  to me because it keeps me honest about execution: turning ideas
                  into something real, useful, and shippable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Worldview — how I think about this work */}
      <section className="py-16 border-y bg-muted/30">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight mb-8">
              How I think about this work
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold mb-2">
                  Messy workflows are a systems problem, not a UI problem
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Most organizations don&apos;t have a software problem — they have a
                  process problem that software keeps papering over. The real
                  work is understanding where inputs are unstructured, where
                  routing is ambiguous, and where decisions are being made by
                  hand that shouldn&apos;t be. Getting that right matters more than
                  picking the right framework.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold mb-2">
                  Useful, not just impressive
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A lot of AI work right now is impressive in demos and
                  frustrating in production. I care about the gap between the
                  two: reliable extraction, explainable outputs, confidence
                  scores that operators can actually trust, and exception flows
                  that handle reality rather than the happy path.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold mb-2">
                  Ship first, optimize second
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I bias toward usable first versions with visible weekly
                  progress. The goal is always something real that a team can
                  react to — not a long speculative build that produces a demo
                  six months later. Once something works in practice, then
                  precision matters.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold mb-2">
                  Local-first and privacy-conscious where it matters
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A lot of the most useful AI work happens on sensitive or
                  regulated data. I think carefully about what leaves the device
                  or the network — not as a compliance checkbox, but because
                  systems that users and operators can actually trust are more
                  useful long-term than systems that are slightly faster but
                  opaque.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — commercial path first */}
      <section className="py-16">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Primary: scoped work */}
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                For founders & teams
              </p>
              <h3 className="text-xl font-bold mb-3">
                Need a scoped pilot or workflow build?
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Scoped builds, workflow systems, and applied AI — built in weeks
                with a clear brief and clear handoff.
              </p>
              <Button asChild className="rounded-full px-7">
                <Link href="/work-with-me">
                  Start a pilot <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Secondary: hiring */}
            <div className="md:border-l md:pl-10">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                For employers
              </p>
              <h3 className="text-xl font-bold mb-3">
                Looking for role fit and proof?
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Experience, execution context, and selected work for product
                systems and workflow delivery roles.
              </p>
              <Button variant="outline" asChild className="rounded-full px-7">
                <Link href="/hire-me">
                  See role fit <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
