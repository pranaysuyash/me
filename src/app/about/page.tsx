import { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Download,
  Github,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, worldview, and how Pranay approaches messy workflows and product systems.",
  openGraph: {
    title: "About | Pranay Suyash",
    description:
      "Background, worldview, and how Pranay approaches messy workflows and product systems.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <PageLayout>
      <section className="py-20 md:py-28">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div className="animate-fade-up">
              <div className="w-40 h-40 rounded-full flex items-center justify-center text-5xl font-bold text-foreground mb-6 bg-gradient-to-br from-primary/20 via-primary/10 to-muted border-2 border-primary/20">
                PS
              </div>
              <p className="name-display text-xl font-semibold mb-1">
                Pranay Suyash
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                I find the mess and build the thing that fixes it
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  asChild
                  className="rounded-full w-full"
                >
                  <a
                    href="/pranay_resume.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" /> Resume
                  </a>
                </Button>
                <Button asChild className="rounded-full w-full">
                  <Link href="/contact">
                    <Calendar className="mr-2 h-4 w-4" /> Contact
                  </Link>
                </Button>
              </div>
              <div className="flex gap-3 mt-6">
                <Link
                  href="https://github.com/pranaysuyash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://linkedin.com/in/pranaysuyash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="https://x.com/pranaysuyash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="mailto:pranay.suyash@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                About
              </h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I started out in enterprise consulting at EY, working on SAP
                  implementations for retail and consumer clients. Five years of
                  watching how large organizations actually run (and where work
                  gets stuck) taught me something useful: most operational drag
                  is not a technology problem. It is a process and ownership
                  problem.
                </p>
                <p>
                  That changed when I joined MedPiper, a YC-backed healthcare
                  startup. I moved from consulting into product, platform,
                  workflow design, compliance, and hands-on system building. The
                  distance between a plan and something usable went from months
                  to weeks. That changed how I think about software.
                </p>
                <p>
                  At MedPiper, I have worked across product, platform, data
                  workflows, and security/compliance. We scaled to roughly $1M
                  ARR while I was working across those functions. The main thing
                  I learned: speed matters, but only if what you ship actually
                  survives real users and messy operations. Shipping fast and
                  shipping something that works are not the same thing.
                </p>
                <p>
                  What I care about now is the gap between a messy workflow and
                  a working system. That gap is where most teams lose time,
                  money, and momentum. I work best there: understanding what is
                  actually happening, reducing ambiguity, and building software
                  that is clear, useful, and shippable.
                </p>
                <p>
                  I do not optimize for technical elegance. I optimize for
                  useful systems with clear inputs, safe outputs, and workflows
                  that teams can actually trust day to day.
                </p>
                <p>
                  Alongside MedPiper, I have built and shipped independent
                  products to stay close to execution reality. Based in
                  Bengaluru, India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Two ways to work together
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-full px-8">
              <Link href="/work-with-me">
                Start a pilot <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full px-8">
              <Link href="/hire-me">Explore role fit</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
