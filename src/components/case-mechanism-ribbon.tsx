"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, FlaskConical } from "lucide-react";

const mechanismByPath = {
  "/work/metaextract": {
    href: "/systems#capability-tab-extraction",
    label: "Try evidence extraction",
    title: "Operate the bounded extraction-and-review mechanism.",
    description:
      "Edit synthetic invoice text, rerun deterministic extraction, inspect exact evidence lines, and record review decisions before returning to the larger MetaExtract case.",
  },
  "/work/sig-ext-fastapi": {
    href: "/systems#capability-tab-cleanup",
    label: "Try local image cleanup",
    title: "Operate the browser-local image cleanup mechanism.",
    description:
      "Adjust threshold, transparency, and crop against a synthetic signature scan or a local image without sending the file to a server.",
  },
  "/work/sentineltwin": {
    href: "/systems#capability-tab-visibility",
    label: "Try spatial visibility",
    title: "Operate a bounded visibility and obstruction mechanism.",
    description:
      "Move a shelf and recompute camera-to-target visibility using deterministic geometry before reviewing the wider 3D platform boundary.",
  },
} as const;

export function CaseMechanismRibbon() {
  const pathname = usePathname();
  const mechanism = mechanismByPath[pathname as keyof typeof mechanismByPath];

  if (!mechanism) return null;

  return (
    <section
      data-case-mechanism-ribbon
      className="border-t bg-[#102022] py-10 text-white"
      aria-labelledby="case-mechanism-title"
    >
      <div className="container mx-auto grid max-w-[1120px] gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center md:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-3 text-teal-100/70">
            <FlaskConical className="h-5 w-5" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">
              Working mechanism · synthetic by default
            </p>
          </div>
          <h2 id="case-mechanism-title" className="mt-3 text-2xl font-bold tracking-tight">
            {mechanism.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60">
            {mechanism.description}
          </p>
        </div>
        <Link
          href={mechanism.href}
          data-mechanism-context={pathname}
          className="inline-flex items-center font-semibold text-teal-100 transition-colors hover:text-white"
        >
          {mechanism.label} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
