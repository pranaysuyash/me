import type { ReactNode } from "react";
import { PageLayout } from "@/components/layout/page-layout";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalPage({
  eyebrow,
  title,
  summary,
  updated,
  sections,
}: LegalPageProps) {
  return (
    <PageLayout>
      <article>
        <header className="border-b bg-[#10191a] py-20 text-white md:py-24">
          <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-100/75">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {summary}
            </p>
            <p className="mt-5 text-xs uppercase tracking-[0.14em] text-white/50">
              Last updated {updated}
            </p>
          </div>
        </header>

        <div className="container mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title} className="border-b pb-10 last:border-b-0">
                <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
