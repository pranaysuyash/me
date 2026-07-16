export type PricingRegion = "india" | "global";

export interface RegionalPrice {
  display: string;
  budgetLabel: string;
}

export interface Engagement {
  id: "mapping" | "focused-build" | "production-system" | "embedded";
  title: string;
  description: string;
  timeline: string;
  bestFor: string;
  prices: Record<PricingRegion, RegionalPrice>;
  includes: readonly string[];
  featured?: boolean;
}

export const pricingRegionStorageKey = "pricing-region";
export const pricingRegionChangeEvent = "pricing-region-change";

export const pricingRegions = {
  india: {
    label: "India pricing",
    controlLabel: "India · INR",
    currency: "INR",
  },
  global: {
    label: "Global pricing",
    controlLabel: "Global · USD",
    currency: "USD",
  },
} as const satisfies Record<
  PricingRegion,
  { label: string; controlLabel: string; currency: string }
>;

export const engagements: readonly Engagement[] = [
  {
    id: "mapping",
    title: "System mapping sprint",
    description:
      "Turn an unclear workflow or product idea into a buildable system plan with the riskiest assumptions exposed.",
    timeline: "5 to 7 working days",
    bestFor:
      "A real operational problem exists, but the first useful product boundary is still unclear.",
    prices: {
      india: { display: "₹95,000+", budgetLabel: "₹95K+" },
      global: { display: "$2,500+", budgetLabel: "$2.5K+" },
    },
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
    prices: {
      india: { display: "₹3.5L+", budgetLabel: "₹3.5L+" },
      global: { display: "$9,000+", budgetLabel: "$9K+" },
    },
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
    prices: {
      india: { display: "₹8L+", budgetLabel: "₹8L+" },
      global: { display: "$22,000+", budgetLabel: "$22K+" },
    },
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
    prices: {
      india: { display: "₹2.75L/mo+", budgetLabel: "₹2.75L/mo+" },
      global: { display: "$7,500/mo+", budgetLabel: "$7.5K/mo+" },
    },
    includes: [
      "Weekly priorities and visible shipping cadence",
      "Product, architecture, and implementation ownership",
      "Async decision logs and direct founder collaboration",
    ],
  },
] as const;

export function isPricingRegion(value: string | null): value is PricingRegion {
  return value === "india" || value === "global";
}

export function getEngagement(id: Engagement["id"]) {
  return engagements.find((engagement) => engagement.id === id);
}
