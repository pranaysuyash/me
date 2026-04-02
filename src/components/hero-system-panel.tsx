"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = ["OCR", "Extraction", "Validation", "Routing"] as const;

function getStepState(
  index: number,
  activeIndex: number,
): "done" | "active" | "pending" {
  if (index < activeIndex) return "done";
  if (index === activeIndex) return "active";
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
}: {
  label: string;
  state: "done" | "active" | "pending";
}) {
  const isActive = state === "active";

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
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
    </div>
  );
}

function OutputRow({ field, value }: { field: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/8 py-2 last:border-b-0 last:pb-0">
      <span className="text-sm text-white/58">{field}</span>
      <span className="text-sm text-white/88">{value}</span>
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

type Phase = "input-processing" | "processing-output";

export function HeroSystemPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("input-processing");
  const [direction, setDirection] = useState(1);

  const advance = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % STEPS.length;
      if (next === 3) {
        setDirection(1);
        setPhase("processing-output");
      } else if (next === 0) {
        setDirection(-1);
        setPhase("input-processing");
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(advance, 2200);
    return () => clearInterval(interval);
  }, [advance]);

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

          <div className="relative overflow-hidden p-4">
            <AnimatePresence mode="popLayout" custom={direction}>
              {phase === "input-processing" ? (
                <motion.div
                  key="input-processing"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.25 },
                  }}
                  className="space-y-4"
                >
                  <section className="rounded-xl border border-white/8 bg-white/[0.025] p-4">
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
                            transition={{
                              delay: 0.2 + i * 0.06,
                              duration: 0.25,
                            }}
                            style={{
                              width: `${w}%`,
                              transformOrigin: "left center",
                            }}
                            className="h-2 rounded-full bg-white/8"
                          />
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="rounded-xl border border-white/8 bg-white/[0.025] p-4">
                    <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-white/42">
                      Processing
                    </p>

                    <div className="space-y-2.5">
                      {STEPS.map((step, i) => (
                        <StepRow
                          key={step}
                          label={step}
                          state={getStepState(i, activeIndex)}
                        />
                      ))}
                    </div>
                  </section>
                </motion.div>
              ) : (
                <motion.div
                  key="processing-output"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.25 },
                  }}
                  className="space-y-4"
                >
                  <section className="rounded-xl border border-white/8 bg-white/[0.025] p-4">
                    <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-white/42">
                      Processing
                    </p>

                    <div className="space-y-2.5">
                      {STEPS.map((step, i) => (
                        <StepRow
                          key={step}
                          label={step}
                          state={getStepState(i, activeIndex)}
                        />
                      ))}
                    </div>
                  </section>

                  <section className="rounded-xl border border-white/8 bg-white/[0.025] p-4">
                    <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-white/42">
                      Structured output
                    </p>

                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] px-4 py-3">
                      <OutputRow field="Total Revenue" value="$2.4M" />
                      <OutputRow field="Operating Expenses" value="$1.1M" />
                      <OutputRow field="Net Profit" value="$847K" />
                      <OutputRow field="Quarter" value="Q3 2025" />
                      <div className="mt-2 pt-2 text-sm text-emerald-300/80 border-t border-white/8">
                        ✓ Fields extracted
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
