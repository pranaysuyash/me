"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw, Search, TriangleAlert } from "lucide-react";

const syntheticInvoice = `PSRS Office Systems\nGSTIN: 29ABCDE1234F1Z5\nInvoice No: INV-2026-0718\nInvoice Date: 18/07/2026\nBill To: Sample Operations Limited\n\nDocument scanner  2 x 12,500 = 25,000\nLocal OCR setup   1 x 18,000 = 18,000\nSubtotal: INR 43,000\nGST 18%: INR 7,740\nTotal: INR 50,740`;

type ReviewState = "unreviewed" | "accepted" | "needs-review";

interface ExtractedField {
  id: string;
  label: string;
  value: string;
  evidence: string;
  lineIndex: number;
  confidence: number;
  reason: string;
}

function normalizeAmount(raw: string, sourceLine: string) {
  const numeric = Number(raw.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(numeric)) return raw.trim();
  const currency = /₹|\bINR\b/i.test(sourceLine)
    ? "₹"
    : /\$|\bUSD\b/i.test(sourceLine)
      ? "$"
      : "";
  return `${currency}${numeric.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

function lastAmount(line: string) {
  const matches = [
    ...line.matchAll(/(?:₹|\$|INR\s*|USD\s*)?([0-9][0-9,]*(?:\.\d{1,2})?)/gi),
  ];
  const match = matches.at(-1);
  return match ? normalizeAmount(match[1], line) : "";
}

function extractDocument(text: string): ExtractedField[] {
  const lines = text.split(/\r?\n/);
  const fields: ExtractedField[] = [];

  const add = (
    id: string,
    label: string,
    lineIndex: number,
    value: string,
    confidence: number,
    reason: string,
  ) => {
    if (!value || fields.some((field) => field.id === id)) return;
    fields.push({
      id,
      label,
      value: value.trim(),
      evidence: lines[lineIndex]?.trim() ?? "",
      lineIndex,
      confidence,
      reason,
    });
  };

  lines.forEach((line, lineIndex) => {
    const invoice = line.match(
      /\b(?:invoice\s*(?:no|number)?|inv(?:oice)?)\s*[:#-]\s*([A-Z0-9][A-Z0-9/-]{3,})/i,
    );
    if (invoice) {
      add(
        "invoice_number",
        "Invoice number",
        lineIndex,
        invoice[1],
        0.99,
        "Exact labelled identifier",
      );
    }

    const date = line.match(
      /\b(?:invoice\s*date|date)\s*[:#-]\s*([0-3]?\d[/-][01]?\d[/-](?:20)?\d{2})/i,
    );
    if (date) {
      add(
        "invoice_date",
        "Invoice date",
        lineIndex,
        date[1],
        0.98,
        "Exact labelled date",
      );
    }

    const gstin = line.match(/\b([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]Z[A-Z0-9])\b/i);
    if (gstin) {
      add(
        "seller_gstin",
        "Seller GSTIN",
        lineIndex,
        gstin[1].toUpperCase(),
        0.99,
        "GSTIN pattern and label",
      );
    }

    const customer = line.match(/^(?:bill\s*to|customer|buyer)\s*[:#-]\s*(.+)$/i);
    if (customer) {
      add(
        "customer",
        "Customer",
        lineIndex,
        customer[1],
        0.96,
        "Exact party label",
      );
    }

    if (/\b(?:gst|tax)\b/i.test(line) && !/gstin/i.test(line)) {
      add(
        "tax_amount",
        "Tax amount",
        lineIndex,
        lastAmount(line),
        0.9,
        "Tax-labelled line; final amount selected",
      );
    }

    if (/\b(?:grand\s*total|amount\s*due|^total)\b/i.test(line) && !/subtotal/i.test(line)) {
      add(
        "total_amount",
        "Total amount",
        lineIndex,
        lastAmount(line),
        0.97,
        "Total-labelled line",
      );
    }

    const item = line.match(
      /^(.+?)\s{2,}(\d+)\s*[x×]\s*([0-9][0-9,]*(?:\.\d+)?)\s*=\s*([0-9][0-9,]*(?:\.\d+)?)\s*$/i,
    );
    if (item) {
      const itemIndex = fields.filter((field) => field.id.startsWith("line_item_")).length + 1;
      add(
        `line_item_${itemIndex}`,
        `Line item ${itemIndex}`,
        lineIndex,
        `${item[1].trim()} · ${item[2]} × ${normalizeAmount(item[3], line)} · ${normalizeAmount(item[4], line)}`,
        0.88,
        "Quantity × unit amount = line amount pattern",
      );
    }
  });

  return fields;
}

function reviewLabel(state: ReviewState) {
  if (state === "accepted") return "Accepted";
  if (state === "needs-review") return "Needs review";
  return "Unreviewed";
}

export function DocumentExtractionMechanism() {
  const [source, setSource] = useState(syntheticInvoice);
  const [fields, setFields] = useState<ExtractedField[]>(() =>
    extractDocument(syntheticInvoice),
  );
  const [selectedId, setSelectedId] = useState(fields[0]?.id ?? "");
  const [reviews, setReviews] = useState<Record<string, ReviewState>>({});

  const selected = fields.find((field) => field.id === selectedId) ?? fields[0];
  const accepted = fields.filter((field) => reviews[field.id] === "accepted").length;
  const needsReview = fields.filter(
    (field) => reviews[field.id] === "needs-review",
  ).length;
  const sourceLines = source.split(/\r?\n/);

  const jsonOutput = useMemo(
    () =>
      fields.map((field) => ({
        field: field.id,
        value: field.value,
        confidence: field.confidence,
        review: reviews[field.id] ?? "unreviewed",
        evidence_line: field.lineIndex + 1,
      })),
    [fields, reviews],
  );

  const runExtraction = () => {
    const nextFields = extractDocument(source);
    setFields(nextFields);
    setSelectedId(nextFields[0]?.id ?? "");
    setReviews({});
  };

  const reset = () => {
    const nextFields = extractDocument(syntheticInvoice);
    setSource(syntheticInvoice);
    setFields(nextFields);
    setSelectedId(nextFields[0]?.id ?? "");
    setReviews({});
  };

  const setReview = (state: ReviewState) => {
    if (!selected) return;
    setReviews((current) => ({ ...current, [selected.id]: state }));
  };

  return (
    <div data-mechanism="extraction" className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <label htmlFor="capability-document-source" className="text-sm font-semibold">
              Source text
            </label>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Edit this synthetic invoice or paste similarly labelled text.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center text-xs font-semibold text-primary"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
            Reset sample
          </button>
        </div>
        <textarea
          id="capability-document-source"
          value={source}
          onChange={(event) => setSource(event.target.value)}
          rows={15}
          spellCheck={false}
          className="mt-3 min-h-80 w-full resize-y rounded-xl border bg-[#071013] p-4 font-mono text-xs leading-6 text-white/82 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            No upload or network request is used by this mechanism.
          </p>
          <button
            type="button"
            onClick={runExtraction}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <Search className="mr-2 h-4 w-4" aria-hidden="true" />
            Run extraction
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-3 overflow-hidden rounded-xl border bg-muted/20">
          {[
            [String(fields.length), "Fields found"],
            [String(accepted), "Accepted"],
            [String(needsReview), "Needs review"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={`p-4 ${index ? "border-l" : ""}`}
            >
              <p
                className="text-xl font-bold"
                data-extracted-field-count={label === "Fields found" ? value : undefined}
              >
                {value}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.11em] text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl border">
            <div className="border-b px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                Extracted fields
              </p>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {fields.length ? (
                fields.map((field) => {
                  const active = field.id === selected?.id;
                  const state = reviews[field.id] ?? "unreviewed";
                  return (
                    <button
                      key={field.id}
                      type="button"
                      aria-pressed={active}
                      data-field-id={field.id}
                      onClick={() => setSelectedId(field.id)}
                      className={`block w-full rounded-lg px-3 py-3 text-left transition-colors ${
                        active ? "bg-primary/[0.08]" : "hover:bg-muted/50"
                      }`}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span>
                          <span className="block text-xs font-semibold text-muted-foreground">
                            {field.label}
                          </span>
                          <span className="mt-1 block text-sm font-medium" data-field-value={field.id}>
                            {field.value}
                          </span>
                        </span>
                        <span
                          className={`mt-0.5 rounded-full border px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.09em] ${
                            state === "accepted"
                              ? "border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                              : state === "needs-review"
                                ? "border-amber-500/30 text-amber-700 dark:text-amber-300"
                                : "text-muted-foreground"
                          }`}
                        >
                          {reviewLabel(state)}
                        </span>
                      </span>
                    </button>
                  );
                })
              ) : (
                <p className="p-3 text-sm leading-6 text-muted-foreground">
                  No supported labelled fields were found. Adjust the source and run extraction again.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4">
            {selected ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.13em] text-primary">
                      Evidence review
                    </p>
                    <h4 className="mt-2 text-lg font-semibold">{selected.label}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Confidence {(selected.confidence * 100).toFixed(0)}% · {selected.reason}
                    </p>
                  </div>
                  <span className="rounded-full border px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                    Line {selected.lineIndex + 1}
                  </span>
                </div>

                <pre className="mt-4 max-h-52 overflow-auto rounded-lg bg-[#071013] p-3 font-mono text-[11px] leading-6 text-white/68">
                  {sourceLines.map((line, index) => (
                    <span
                      key={`${index}-${line}`}
                      className={`block rounded px-1 ${
                        index === selected.lineIndex
                          ? "bg-teal-300/18 text-teal-100"
                          : ""
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}  {line || " "}
                    </span>
                  ))}
                </pre>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setReview("accepted")}
                    className="inline-flex items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/[0.06] px-3 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300"
                  >
                    <Check className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    Accept field
                  </button>
                  <button
                    type="button"
                    onClick={() => setReview("needs-review")}
                    className="inline-flex items-center justify-center rounded-md border border-amber-500/30 bg-amber-500/[0.06] px-3 py-2 text-xs font-semibold text-amber-700 dark:text-amber-300"
                  >
                    <TriangleAlert className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    Needs review
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Run extraction to inspect evidence.</p>
            )}
          </div>
        </div>

        <details className="rounded-xl border bg-muted/15">
          <summary className="cursor-pointer px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Structured output
          </summary>
          <pre className="max-h-64 overflow-auto border-t bg-[#071013] p-4 font-mono text-[11px] leading-5 text-teal-50/78">
            {JSON.stringify(jsonOutput, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
