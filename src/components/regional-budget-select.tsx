"use client";

import { usePricingRegion } from "@/hooks/use-pricing-region";
import { engagements } from "@/lib/engagements";

interface RegionalBudgetSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function RegionalBudgetSelect({
  value,
  onChange,
}: RegionalBudgetSelectProps) {
  const { region } = usePricingRegion();

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
      {engagements.map((engagement) => (
        <option key={engagement.id} value={engagement.id}>
          {engagement.title} · {engagement.prices[region].budgetLabel}
        </option>
      ))}
    </select>
  );
}
