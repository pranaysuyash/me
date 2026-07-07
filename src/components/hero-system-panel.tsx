"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, FileSearch, GitBranch, ShieldCheck } from "lucide-react";

const evidenceRows = [
  {
    source: "MedPiper",
    input: "manual insurance handoffs",
    evidence: "~4 weeks to ~10 days",
    output: "workflow compression",
  },
  {
    source: "SignKit",
    input: "signature extraction pain",
    evidence: "idea to paid product",
    output: "commercial proof",
  },
  {
    source: "MetaExtract",
    input: "variable airline documents",
    evidence: "schema + review gates",
    output: "trusted extraction",
  },
  {
    source: "No Claim",
    input: "AI eval posts",
    evidence: "PDF + EPUB product",
    output: "authority asset",
  },
] as const;

const flowSteps = [
  { label: "Find the real workflow", icon: FileSearch },
  { label: "Build the reviewable path", icon: GitBranch },
  { label: "Ship with evidence", icon: ShieldCheck },
] as const;

export function HeroSystemPanel() {
  const [activeRow, setActiveRow] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const active = evidenceRows[activeRow];

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timeout = setTimeout(
      () => setActiveRow((current) => (current + 1) % evidenceRows.length),
      2200,
    );
    return () => clearTimeout(timeout);
  }, [activeRow, prefersReducedMotion]);

  const pulseTransition = useMemo(
    () => ({
      duration: 1.7,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    }),
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[460px]"
    >
      <div className="ledger-grid overflow-hidden rounded-lg border border-white/12 bg-[#11191a] shadow-2xl shadow-black/25">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
              Evidence ledger
            </p>
            <p className="mt-1 text-xs text-white/72">
              claim → proof → operating value
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            live proof
          </span>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-3 gap-2 pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">
            <span>Source</span>
            <span>Evidence</span>
            <span>Value</span>
          </div>

          <div className="space-y-2">
            {evidenceRows.map((row, index) => {
              const isActive = index === activeRow;
              return (
                <button
                  type="button"
                  key={row.source}
                  onClick={() => setActiveRow(index)}
                  className={`grid w-full grid-cols-3 gap-2 rounded-md border px-3 py-3 text-left transition-colors ${
                    isActive
                      ? "border-teal-300/35 bg-teal-200/[0.08]"
                      : "border-white/8 bg-white/[0.025] hover:bg-white/[0.045]"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white">
                      {row.source}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-white/45">
                      {row.input}
                    </span>
                  </span>
                  <span className="self-center text-xs font-medium leading-snug text-teal-100">
                    {row.evidence}
                  </span>
                  <span className="self-center text-xs leading-snug text-white/68">
                    {row.output}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-md border border-white/10 bg-black/18 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--accent))]">
                Current read
              </p>
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            </div>
            <p className="text-sm leading-6 text-white/76">
              {active.source} is here because it shows the same pattern:
              ambiguous input, a reviewable system, and a result that can be
              explained after the fact.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {flowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.label}
                  className="rounded-md border border-white/8 bg-white/[0.035] p-3"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <Icon className="h-4 w-4 text-teal-100" />
                    <span className="font-mono text-[10px] text-white/35">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="text-[11px] leading-4 text-white/68">
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.025] px-4 py-3">
          <span className="text-[10px] text-white/38">portfolio evidence</span>
          <motion.span
            className="h-1.5 w-20 rounded-full bg-teal-200/70"
            animate={prefersReducedMotion ? undefined : { opacity: [0.3, 0.9] }}
            transition={pulseTransition}
          />
          <span className="text-[10px] text-white/38">client + hiring</span>
        </div>
      </div>
    </motion.div>
  );
}
