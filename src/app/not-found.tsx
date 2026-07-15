import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageLayout>
      <section className="flex min-h-[70vh] items-center border-b bg-[#10191a] py-20 text-white">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-100/75">
            404 · Route not found
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
            This page is not part of the current system.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
            The link may be outdated, the project may have moved, or the route may never
            have existed. Use the portfolio or homepage to continue.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-md px-7">
              <Link href="/work">
                Browse selected work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-md border-white/30 bg-white/5 px-7 text-white hover:bg-white/10"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" /> Return home
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
