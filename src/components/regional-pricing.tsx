"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Globe2, IndianRupee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Region = "india" | "global";

type Engagement = {
  id: string;
  title: string;
  description: string;
  timeline: string;
  bestFor: string;
  indiaPrice: string;
  globalPrice: string;
  includes: string[];
  featured?: boolean;
};

const engagements: Engagement[] = [
  {
    id: "mapping",
    title: "System mapping sprint",
    description:
      "Turn an unclear workflow or product idea into a buildable system plan with the riskiest assumptions exposed.",
    timeline: "5 to 7 working days",
    bestFor:
      "A real operational problem exists, but the first useful product boundary is still unclear.",
    indiaPrice: "₹95,000+",
    globalPrice: "$2,500+",
    includes: [
      "Workflow and user-state map",
      "Technical options and trade-offs",
      "Prioritized build scope and acceptance criteria",
    ],
  },
  {
    id: "focused-build",
    title: "Focused product build",
    description:
      "Design and ship the core working path for an AI-assisted product, internal tool, or local-first workflow.",
    timeline: "3 to 5 weeks",
    bestFor:
      "You need a usable product surface that real users can operate, review, and react to.",
    indiaPrice: "₹3.5L+",
    globalPrice: "$9,000+",
    includes: [
      "Product flow, interface, and implementation",
      "Core AI, data, or automation pipeline",
      "Review states, error handling, and handoff notes",
    ],
    featured: true,
  },
  {
    id: "production-system",
    title: "Production system build",
    description:
      "Build a larger operational system with integrations, evaluation, governance, and a credible path beyond the first release.",
    timeline: "6 to 12 weeks",
    bestFor:
      "The workflow is business-critical and needs more than a polished prototype or isolated feature.",
    indiaPrice: "₹8L+",
    globalPrice: "$22,000+",
    includes: [
      "Architecture and end-to-end implementation",
      "Integrations, observability, and quality gates",
      "Deployment, documentation, and transition plan",
    ],
  },
  {
    id: "embedded",
    title: "Embedded product partner",
    description:
      "Ongoing product and engineering ownership for a bounded workstream, without adding a full-time senior hire immediately.",
    timeline: "Monthly",
    bestFor:
      "A founder or small team needs sustained senior execution across product decisions and implementation.",
    indiaPrice: "₹2.75L/mo+",
    globalPrice: "$7,500/mo+",
    includes: [
      "Weekly priorities and visible shipping cadence",
      "Product, architecture, and implementation ownership",
      "Async decision logs and direct founder collaboration",
    ],
  },
];

function parseCloudflareCountry(value: string) {
  return value
    .split("\n")
    .find((line) => line.startsWith("loc="))
    ?.slice(4)
    .trim()
    .toUpperCase();
}

export function RegionalPricing() {
  const [region, setRegion] = useState<Region>("global");
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const resolveRegion = async () => {
      const stored = window.localStorage.getItem("pricing-region");
      if (stored === "india" || stored === "global") {
        if (!cancelled) {
          setRegion(stored);
          setResolved(true);
        }
        return;
      }

      let detected: Region = "global";

      try {
        const response = await fetch("/cdn-cgi/trace", { cache: "no-store" });
        if (response.ok) {
          const country = parseCloudflareCountry(await response.text());
          if (country === "IN") detected = "india";
        }
      } catch {
        // Local development and non-Cloudflare hosts fall through to browser hints.
      }

      if (detected === "global") {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const languages = navigator.languages?.length
          ? navigator.languages
          : [navigator.language];

        if (
          timeZone === "Asia/Kolkata" ||
          timeZone === "Asia/Calcutta" ||
          languages.some((language) => /(^|-)IN$/i.test(language))
        ) {
          detected = "india";
        }
      }

      if (!cancelled) {
        setRegion(detected);
        setResolved(true);
      }
    };

    void resolveRegion();
    return () => {
      cancelled = true;
    };
  }, []);

  const label = useMemo(
    () => (region === "india" ? "India pricing" : "Global pricing"),
    [region],
  );

  const selectRegion = (nextRegion: Region) => {
    setRegion(nextRegion);
    setResolved(true);
    window.localStorage.setItem("pricing-region", nextRegion);
  };

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
            {resolved ? label : "Checking your region"}
          </p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Separate regional price books, not a live exchange-rate conversion.
            Final pricing depends on scope, risk, integrations, and delivery speed.
          </p>
        </div>
        <div
          className="inline-flex w-fit rounded-lg border bg-muted/40 p-1"
          aria-label="Choose pricing region"
        >
          <button
            type="button"
            onClick={() => selectRegion("india")}
            aria-pressed={region === "india"}
            className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
              region === "india"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            India · INR
          </button>
          <button
            type="button"
            onClick={() => selectRegion("global")}
            aria-pressed={region === "global"}
            className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
              region === "global"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Global · USD
          </button>
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
                  {region === "india"
                    ? engagement.indiaPrice
                    : engagement.globalPrice}
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
    </div>
  );
}
