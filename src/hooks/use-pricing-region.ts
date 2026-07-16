"use client";

import { useCallback, useEffect, useState } from "react";
import {
  isPricingRegion,
  pricingRegionChangeEvent,
  pricingRegionStorageKey,
  type PricingRegion,
} from "@/lib/engagements";

function parseCloudflareCountry(value: string) {
  return value
    .split("\n")
    .find((line) => line.startsWith("loc="))
    ?.slice(4)
    .trim()
    .toUpperCase();
}

function detectBrowserRegion(): PricingRegion {
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

function readStoredRegion(): PricingRegion | null {
  try {
    const stored = window.localStorage.getItem(pricingRegionStorageKey);
    return isPricingRegion(stored) ? stored : null;
  } catch {
    return null;
  }
}

function persistRegion(region: PricingRegion) {
  try {
    window.localStorage.setItem(pricingRegionStorageKey, region);
  } catch {
    // Storage can be unavailable in hardened or private browsing contexts.
  }

  window.dispatchEvent(
    new CustomEvent<PricingRegion>(pricingRegionChangeEvent, { detail: region }),
  );
}

export function usePricingRegion() {
  const [region, setRegion] = useState<PricingRegion>("global");
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const applyRegion = (nextRegion: PricingRegion) => {
      if (cancelled) return;
      setRegion(nextRegion);
      setResolved(true);
    };

    const stored = readStoredRegion();
    if (stored) {
      applyRegion(stored);
    } else {
      const resolveRegion = async () => {
        let nextRegion = detectBrowserRegion();

        try {
          const response = await fetch("/cdn-cgi/trace", { cache: "no-store" });
          if (response.ok) {
            const country = parseCloudflareCountry(await response.text());
            if (country) nextRegion = country === "IN" ? "india" : "global";
          }
        } catch {
          // Browser hints remain the local-development and non-Cloudflare fallback.
        }

        applyRegion(nextRegion);
      };

      void resolveRegion();
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== pricingRegionStorageKey || !isPricingRegion(event.newValue)) {
        return;
      }
      applyRegion(event.newValue);
    };

    const handleRegionChange = (event: Event) => {
      const nextRegion = (event as CustomEvent<PricingRegion>).detail;
      if (isPricingRegion(nextRegion)) applyRegion(nextRegion);
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(pricingRegionChangeEvent, handleRegionChange);

    return () => {
      cancelled = true;
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(pricingRegionChangeEvent, handleRegionChange);
    };
  }, []);

  const selectRegion = useCallback((nextRegion: PricingRegion) => {
    setRegion(nextRegion);
    setResolved(true);
    persistRegion(nextRegion);
  }, []);

  return { region, resolved, selectRegion } as const;
}
