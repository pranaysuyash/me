"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STEPS = ["OCR", "Extraction", "Validation", "Routing"] as const;

function getStepState(
  index: number,
  activeIndex: number,
  cycleStart: number,
): "done" | "active" | "pending" {
  const normalizedActive =
    (((activeIndex - cycleStart) % STEPS.length) + STEPS.length) % STEPS.length;
  if (index < normalizedActive) return "done";
  if (index === normalizedActive) return "active";
  return "pending";
}

function StatusDot({ state }: { state: "done" | "active" | "pending" }) {
  if (state === "done") {
    return (
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] text-emerald-300">
        ✓
      </span>
    );
  }

  if (state === "active") {
    return (
      <motion.span
        className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-blue-400/40 bg-blue-400/15"
        animate={{
          boxShadow: [
            "0 0 0px rgba(96,165,250,0.0)",
            "0 0 8px rgba(96,165,250,0.2)",
            "0 0 0px rgba(96,165,250,0.0)",
          ],
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.span
          className="h-2 w-2 rounded-full bg-blue-400"
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.span>
    );
  }

  return (
    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/10 bg-transparent">
      <span className="h-2 w-2 rounded-full bg-white/20" />
    </span>
  );
}

function StepRow({
  label,
  state,
  delay = 0,
}: {
  label: string;
  state: "done" | "active" | "pending";
  delay?: number;
}) {
  const isActive = state === "active";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, delay }}
      className="relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5"
    >
      {isActive ? (
        <motion.div
          className="absolute inset-x-3 bottom-0 h-px bg-blue-400/70"
          animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "left center" }}
        />
      ) : null}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <StatusDot state={state} />
          <span
            className={[
              "text-sm",
              isActive
                ? "text-white"
                : state === "done"
                  ? "text-white/85"
                  : "text-white/55",
            ].join(" ")}
          >
            {label}
          </span>
        </div>

        <span
          className={[
            "text-[11px] uppercase tracking-[0.12em]",
            isActive
              ? "text-blue-300"
              : state === "done"
                ? "text-emerald-300/90"
                : "text-white/35",
          ].join(" ")}
        >
          {isActive ? "Running" : state === "done" ? "Done" : "Queued"}
        </span>
      </div>
    </motion.div>
  );
}

function OutputRow({
  field,
  value,
  delay = 0,
}: {
  field: string;
  value: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      className="flex items-center justify-between gap-4 border-b border-white/8 py-2 last:border-b-0 last:pb-0"
    >
      <span className="text-sm text-white/58">{field}</span>
      <span className="text-sm text-white/88">{value}</span>
    </motion.div>
  );
}

export function HeroSystemPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % STEPS.length;
        if (next === 3) {
          setShowOutput(true);
          setTimeout(() => setShowOutput(false), 1000);
        }
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[420px]"
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-2xl">
        <div className="rounded-xl border border-white/8 bg-[#0d1422]/90">
          <div className="border-b border-white/8 px-5 py-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.25 }}
              className="text-[11px] uppercase tracking-[0.16em] text-white/42"
            >
              System preview
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="mt-2 text-[22px] font-medium tracking-[-0.02em] text-white/92"
            >
              Document → structure
            </motion.h3>
          </div>

          <div className="space-y-4 p-4">
            <motion.section
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="rounded-xl border border-white/8 bg-white/[0.025] p-4"
            >
              <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-white/42">
                Input
              </p>

              <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3.5">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-[11px] font-medium text-orange-300">
                    PDF
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-base font-medium text-white/92">
                      quarterly_report.pdf
                    </p>
                    <p className="mt-1 text-sm text-white/52">
                      PDF · 8 pages · uploaded
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {[82, 65, 42].map((w, i) => (
                    <motion.div
                      key={w}
                      initial={{ opacity: 0, scaleX: 0.8 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.25 }}
                      style={{
                        width: `${w}%`,
                        transformOrigin: "left center",
                      }}
                      className="h-2 rounded-full bg-white/8"
                    />
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="rounded-xl border border-white/8 bg-white/[0.025] p-4"
            >
              <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-white/42">
                Processing
              </p>

              <div className="space-y-2.5">
                {STEPS.map((step, i) => (
                  <StepRow
                    key={step}
                    label={step}
                    state={getStepState(i, activeIndex, 0)}
                    delay={0.22 + i * 0.05}
                  />
                ))}
              </div>
            </motion.section>

            <motion.section className="rounded-xl border border-white/8 bg-white/[0.025] p-4">
              <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-white/42">
                Structured output
              </p>

              <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] px-4 py-3 min-h-[128px] flex flex-col">
                <div
                  className={`transition-opacity duration-300 ${!showOutput ? "opacity-40" : "opacity-100"}`}
                >
                  <OutputRow
                    field="Total Revenue"
                    value={showOutput ? "$2.4M" : "—"}
                    delay={0}
                  />
                  <OutputRow
                    field="Operating Expenses"
                    value={showOutput ? "$1.1M" : "—"}
                    delay={0}
                  />
                  <OutputRow
                    field="Net Profit"
                    value={showOutput ? "$847K" : "—"}
                    delay={0}
                  />
                  <OutputRow
                    field="Quarter"
                    value={showOutput ? "Q3 2025" : "—"}
                    delay={0}
                  />
                </div>
                <div className="mt-auto pt-2 text-sm text-white/60 min-h-[24px]">
                  {showOutput ? (
                    "✓ Fields extracted"
                  ) : (
                    <span className="text-white/25">
                      Waiting for routing...
                    </span>
                  )}
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
