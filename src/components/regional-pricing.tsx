"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2, IndianRupee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { usePricingRegion } from "@/hooks/use-pricing-region";
import { engagements, pricingRegions, type PricingRegion } from "@/lib/engagements";

export function RegionalPricing() {
  const { region, resolved, selectRegion } = usePricingRegion();

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold">
            {region === "india" ? (
              <IndianRupee className="h-4 w-4 text-primary" />
            ) : (
              <Globe2 className="h-4 w-4 text-primary" />
            )}
            {resolved ? pricingRegions[region].label : "Checking your region"}
          </p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Separate regional price books, not a live exchange-rate conversion.
            Final pricing depends on scope, risk, integrations, and delivery speed.
          </p>
        </div>
        <div
          className="inline-flex w-fit rounded-lg border bg-muted/40 p-1"
          role="group"
          aria-label="Choose pricing region"
        >
          {(Object.keys(pricingRegions) as PricingRegion[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => selectRegion(option)}
              aria-pressed={region === option}
              className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                region === option
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {pricingRegions[option].controlLabel}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {engagements.map((engagement) => (
          <Card
            key={engagement.id}
            className={`h-full border shadow-sm ${
              engagement.featured ? "border-primary/35 bg-primary/[0.025]" : ""
            }`}
          >
            <CardContent className="flex h-full flex-col p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  {engagement.featured && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      Most common starting point
                    </p>
                  )}
                  <h3 className="text-xl font-semibold">{engagement.title}</h3>
                </div>
                <p className="shrink-0 text-right text-lg font-semibold text-primary">
                  {engagement.prices[region].display}
                </p>
              </div>

              <p className="text-sm leading-7 text-muted-foreground">
                {engagement.description}
              </p>

              <div className="mt-5 grid gap-3 border-y py-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Typical timeline
                  </p>
                  <p className="mt-1 font-medium">{engagement.timeline}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Best for
                  </p>
                  <p className="mt-1 leading-6 text-muted-foreground">
                    {engagement.bestFor}
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-2">
                {engagement.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 border-y py-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-semibold">Prefer to operate something before discussing scope?</p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
            Run the browser-contained evidence extraction mechanism, inspect its claim boundary, and then compare it with the larger audited MetaExtract product case.
          </p>
        </div>
        <Link
          href="/systems#capability-tab-extraction"
          className="inline-flex items-center text-sm font-semibold text-primary"
        >
          Try evidence extraction <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
