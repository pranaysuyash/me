"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TRANSCRIPT_LINES = [
  {
    time: "00:12",
    speaker: "Speaker 1",
    text: "the renewal process takes about three weeks right now",
  },
  {
    time: "00:18",
    speaker: "Speaker 2",
    text: "yeah and most of that is just waiting for document verification",
  },
  {
    time: "00:24",
    speaker: "Speaker 1",
    text: "can we cut that down if we auto-extract the key fields",
  },
  {
    time: "00:31",
    speaker: "Speaker 2",
    text: "probably. the bottleneck is the manual data entry on the intake side",
  },
  {
    time: "00:38",
    speaker: "Speaker 1",
    text: "let me build a quick prototype this week and test it on the last batch",
  },
] as const;

const SEARCH_QUERY = "renewal bottleneck";
const MATCH_LINE = 2;

function StatusDot({
  status,
}: {
  status: "recording" | "processing" | "done";
}) {
  if (status === "recording") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <motion.span
          className="h-2 w-2 rounded-full bg-red-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-[10px] text-red-300/80 uppercase tracking-wider">
          Recording
        </span>
      </span>
    );
  }
  if (status === "processing") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <motion.span
          className="h-2 w-2 rounded-full bg-blue-400"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-[10px] text-blue-300/80 uppercase tracking-wider">
          Transcribing
        </span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
      <span className="text-[10px] text-emerald-300/80 uppercase tracking-wider">
        Saved
      </span>
    </span>
  );
}

export function HeroSystemPanel() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<"recording" | "processing" | "done">(
    "recording",
  );
  const [searchReveal, setSearchReveal] = useState(false);

  const reset = useCallback(() => {
    setVisibleLines(0);
    setPhase("recording");
    setSearchReveal(false);
  }, []);

  useEffect(() => {
    if (visibleLines < TRANSCRIPT_LINES.length) {
      const delay = phase === "recording" ? 2200 : 600;
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
        if (visibleLines === 0) setPhase("recording");
        if (visibleLines === 2) setPhase("processing");
      }, delay);
      return () => clearTimeout(timeout);
    } else if (!searchReveal) {
      setPhase("done");
      const timeout = setTimeout(() => setSearchReveal(true), 1200);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(reset, 3000);
      return () => clearTimeout(timeout);
    }
  }, [visibleLines, phase, searchReveal, reset]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[420px]"
    >
      <div className="relative rounded-2xl border border-white/[0.1] bg-[#0b111a] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/[0.07] flex items-center justify-between bg-white/[0.015]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <span className="text-xs text-white/40 font-mono ml-2">
              echopanel
            </span>
          </div>
          <StatusDot status={phase} />
        </div>

        {/* Transcript */}
        <div className="p-4 min-h-[280px]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono">
              Transcript
            </p>
            <span className="text-[10px] text-white/30 font-mono">
              Product standup, Mar 14
            </span>
          </div>

          <div className="space-y-2.5">
            {TRANSCRIPT_LINES.slice(0, visibleLines).map((line, i) => {
              const isMatch = searchReveal && i === MATCH_LINE;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-3 text-sm ${isMatch ? "bg-white/[0.06] -mx-2 px-2 py-1.5 rounded-md" : ""}`}
                >
                  <span className="text-white/30 font-mono text-xs shrink-0 pt-0.5 w-10 text-right">
                    {line.time}
                  </span>
                  <div className="min-w-0">
                    <span className="text-white/50 text-xs">
                      {line.speaker}
                    </span>
                    <p
                      className={`leading-snug ${isMatch ? "text-white/90" : "text-white/60"}`}
                    >
                      {isMatch ? (
                        <>
                          {line.text
                            .split(new RegExp(`(${SEARCH_QUERY})`, "gi"))
                            .map((part, j) =>
                              part.toLowerCase() === SEARCH_QUERY ? (
                                <mark
                                  key={j}
                                  className="bg-amber-400/25 text-amber-200 rounded px-0.5"
                                >
                                  {part}
                                </mark>
                              ) : (
                                part
                              ),
                            )}
                        </>
                      ) : (
                        line.text
                      )}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {visibleLines < TRANSCRIPT_LINES.length && (
            <div className="mt-2.5 flex gap-3">
              <span className="w-10" />
              <div className="space-y-2 flex-1">
                <div className="h-3 w-3/4 rounded bg-white/[0.06]" />
                <div className="h-3 w-1/2 rounded bg-white/[0.04]" />
              </div>
            </div>
          )}
        </div>

        {/* Search bar reveal */}
        <AnimatePresence>
          {searchReveal && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-white/[0.07]"
            >
              <div className="px-4 py-3 flex items-center gap-2">
                <svg
                  className="h-3.5 w-3.5 text-white/30 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-sm text-white/50 font-mono">
                  {SEARCH_QUERY}
                </span>
                <span className="ml-auto text-[10px] text-emerald-300/70">
                  1 match
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-white/[0.06] bg-white/[0.02] flex items-center justify-between">
          <span className="text-[10px] text-white/30">Local · SQLite</span>
          <span className="text-[10px] text-white/30" aria-hidden="true">
            EchoPanel
          </span>
        </div>
      </div>
    </motion.div>
  );
}
