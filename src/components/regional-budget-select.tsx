"use client";

import { useEffect, useState } from "react";

type Region = "india" | "global";

interface RegionalBudgetSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function detectBrowserRegion(): Region {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  return timeZone === "Asia/Kolkata" ||
    timeZone === "Asia/Calcutta" ||
    languages.some((language) => /(^|-)IN$/i.test(language))
    ? "india"
    : "global";
}

export function RegionalBudgetSelect({
  value,
  onChange,
}: RegionalBudgetSelectProps) {
  const [region, setRegion] = useState<Region>("global");

  useEffect(() => {
    const stored = window.localStorage.getItem("pricing-region");
    if (stored === "india" || stored === "global") {
      setRegion(stored);
      return;
    }

    let cancelled = false;

    const resolveRegion = async () => {
      let nextRegion = detectBrowserRegion();
      try {
        const response = await fetch("/cdn-cgi/trace", { cache: "no-store" });
        if (response.ok) {
          const country = (await response.text())
            .split("\n")
            .find((line) => line.startsWith("loc="))
            ?.slice(4)
            .trim()
            .toUpperCase();
          if (country) nextRegion = country === "IN" ? "india" : "global";
        }
      } catch {
        // Browser hints already provide the local-development fallback.
      }

      if (!cancelled) setRegion(nextRegion);
    };

    void resolveRegion();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <select
      id="budget"
      name="budget"
      value={value}
      onChange={onChange}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <option value="">Select a rough scope</option>
      <option value="unsure">Not sure yet</option>
      <option value="mapping">
        System mapping sprint · {region === "india" ? "₹95K+" : "$2.5K+"}
      </option>
      <option value="focused-build">
        Focused product build · {region === "india" ? "₹3.5L+" : "$9K+"}
      </option>
      <option value="production-system">
        Production system · {region === "india" ? "₹8L+" : "$22K+"}
      </option>
      <option value="embedded">
        Embedded product partner · {region === "india" ? "₹2.75L/mo+" : "$7.5K/mo+"}
      </option>
    </select>
  );
}
