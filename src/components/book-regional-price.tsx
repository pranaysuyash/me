"use client";

import { usePricingRegion } from "@/hooks/use-pricing-region";
import { pricingRegions, type PricingRegion } from "@/lib/engagements";
import { noClaimEbook } from "@/lib/ebook";

interface BookRegionalPriceProps {
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
}

const regionOrder: PricingRegion[] = ["india", "global"];

export function BookRegionalPrice({
  tone = "light",
  compact = false,
  className = "",
}: BookRegionalPriceProps) {
  const { region, resolved, selectRegion } = usePricingRegion();
  const price = region === "india" ? noClaimEbook.indiaPrice : noClaimEbook.globalPrice;
  const dark = tone === "dark";

  return (
    <div className={className}>
      <div className={compact ? "flex flex-wrap items-center gap-x-3 gap-y-2" : "space-y-1"}>
        <p
          aria-live="polite"
          className={compact ? "text-sm font-semibold" : "text-3xl font-bold tracking-tight"}
        >
          {resolved ? price : "Checking your regional price…"}
        </p>
        <p className={`text-sm ${dark ? "text-white/65" : "text-muted-foreground"}`}>
          One-time purchase · PDF + EPUB
        </p>
      </div>

      <div
        className={`mt-3 inline-flex rounded-lg border p-1 ${
          dark ? "border-white/15 bg-white/5" : "bg-muted/40"
        }`}
        role="group"
        aria-label="Choose ebook pricing region"
      >
        {regionOrder.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => selectRegion(option)}
            aria-pressed={region === option}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              region === option
                ? dark
                  ? "bg-white text-[#071017]"
                  : "bg-background text-foreground shadow-sm"
                : dark
                  ? "text-white/60 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {pricingRegions[option].label.replace(" pricing", "")}
          </button>
        ))}
      </div>

      {!compact && (
        <p className={`mt-3 text-xs leading-6 ${dark ? "text-white/55" : "text-muted-foreground"}`}>
          Secure checkout with PDF and EPUB delivery after payment. The displayed price follows your selected region; taxes, when applicable, are shown at checkout.
        </p>
      )}
    </div>
  );
}
