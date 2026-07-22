"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Download,
  FileSearch,
  Hammer,
  ImageDown,
  Mic2,
  PlayCircle,
  RotateCcw,
  ScanSearch,
  ShieldCheck,
  View,
  type LucideIcon,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  workflowDefinitions,
  workflowInputOptions,
  workflowPathOptions,
  workflowPriorityOptions,
  type WorkflowDefinition,
  type WorkflowInput,
  type WorkflowPath,
  type WorkflowPriority,
} from "@/lib/workflow-library";

type InputChoice = WorkflowInput | "any";
type PriorityChoice = WorkflowPriority | "any";

const workflowIcons: Record<string, LucideIcon> = {
  "document-extraction-review": FileSearch,
  "signature-document-handling": ImageDown,
  "visual-evidence-inspection": ScanSearch,
  "spatial-coverage-review": View,
  "meeting-capture-retrieval": Mic2,
};

const pathIcons: Record<WorkflowPath, LucideIcon> = {
  download: Download,
  live: PlayCircle,
  case: BookOpen,
  project: Hammer,
  consultation: CalendarDays,
};

function supportsPath(workflow: WorkflowDefinition, path: WorkflowPath) {
  if (path === "live") return Boolean(workflow.liveHref);
  return true;
}

function selectedAction(workflow: WorkflowDefinition, path: WorkflowPath) {
  if (path === "download") {
    return { href: workflow.starterHref, label: workflow.starterLabel, download: true };
  }
  if (path === "live") {
    return {
      href: workflow.liveHref || workflow.caseHref,
      label: workflow.liveLabel || workflow.caseLabel,
      download: false,
    };
  }
  if (path === "case") {
    return { href: workflow.caseHref, label: workflow.caseLabel, download: false };
  }
  if (path === "project") {
    return { href: workflow.projectHref, label: "Scope this workflow", download: false };
  }
  return {
    href: workflow.consultationHref,
    label: "Book a workflow consultation",
    download: false,
  };
}

function matchReasons(
  workflow: WorkflowDefinition,
  input: InputChoice,
  priority: PriorityChoice,
  path: WorkflowPath,
) {
  const reasons: string[] = [];
  if (input !== "any" && workflow.input === input) reasons.push("matches your source material");
  if (priority !== "any" && workflow.priorities.includes(priority)) {
    reasons.push(`supports ${workflowPriorityOptions.find((item) => item.id === priority)?.label.toLowerCase()}`);
  }
  if (path === "live" && workflow.liveHref) reasons.push("has a working browser mechanism");
  if (path === "download") reasons.push("includes an ungated starter artifact");
  if (path === "case") reasons.push("has an audited case study");
  if (path === "project") reasons.push("can be scoped as a bounded build");
  if (path === "consultation") reasons.push("can start with a focused review call");
  return reasons.length ? reasons : ["available across the workflow library"];
}

function scoreWorkflow(
  workflow: WorkflowDefinition,
  input: InputChoice,
  priority: PriorityChoice,
  path: WorkflowPath,
) {
  let score = 0;
  if (input === "any") score += 1;
  else if (workflow.input === input) score += 8;
  else score -= 8;

  if (priority === "any") score += 1;
  else if (workflow.priorities.includes(priority)) score += 5;

  if (supportsPath(workflow, path)) score += 3;
  else score -= 20;

  if (workflow.id === "document-extraction-review") score += 1;
  return score;
}

function FilterGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: readonly { id: string; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected === option.id}
            onClick={() => onSelect(option.id)}
            className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
              selected === option.id
                ? "border-primary/45 bg-primary/[0.08] text-primary"
                : "bg-background text-muted-foreground hover:border-primary/25 hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function WorkflowAction({
  href,
  label,
  icon: Icon,
  download = false,
  primary = false,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  download?: boolean;
  primary?: boolean;
}) {
  const className = cn(
    buttonVariants({ variant: primary ? "default" : "outline", size: "sm" }),
    "h-auto min-h-9 whitespace-normal text-center",
  );

  if (download) {
    return (
      <a href={href} download className={className}>
        {label} <Icon className="ml-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label} <Icon className="ml-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </Link>
  );
}

export function WorkflowLibraryExplorer() {
  const [input, setInput] = useState<InputChoice>("any");
  const [priority, setPriority] = useState<PriorityChoice>("any");
  const [path, setPath] = useState<WorkflowPath>("download");

  const ranked = useMemo(
    () =>
      workflowDefinitions
        .filter((workflow) => input === "any" || workflow.input === input)
        .filter((workflow) => supportsPath(workflow, path))
        .map((workflow) => ({
          workflow,
          score: scoreWorkflow(workflow, input, priority, path),
          reasons: matchReasons(workflow, input, priority, path),
        }))
        .sort((a, b) => b.score - a.score || a.workflow.title.localeCompare(b.workflow.title)),
    [input, path, priority],
  );

  const SelectedPathIcon = pathIcons[path];

  return (
    <div data-workflow-library data-selected-path={path}>
      <div className="rounded-2xl border bg-muted/25 p-5 shadow-sm md:p-7">
        <div className="grid gap-7 xl:grid-cols-[1fr_1fr_1.05fr_auto] xl:items-end">
          <FilterGroup
            label="1. What enters the workflow?"
            options={workflowInputOptions}
            selected={input}
            onSelect={(value) => setInput(value as InputChoice)}
          />
          <FilterGroup
            label="2. What matters most?"
            options={workflowPriorityOptions}
            selected={priority}
            onSelect={(value) => setPriority(value as PriorityChoice)}
          />
          <FilterGroup
            label="3. What do you need next?"
            options={workflowPathOptions}
            selected={path}
            onSelect={(value) => setPath(value as WorkflowPath)}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setInput("any");
              setPriority("any");
              setPath("download");
            }}
          >
            Reset <RotateCcw className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-y py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
          Showing <span className="font-semibold text-foreground">{ranked.length}</span> matching workflow{ranked.length === 1 ? "" : "s"}.
        </p>
        <p className="inline-flex items-center gap-2 text-xs leading-6 text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
          Starter downloads are direct and ungated. No email address is required.
        </p>
      </div>

      {ranked.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed p-8 text-center">
          <h3 className="text-xl font-semibold">No live mechanism matches that exact combination.</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Change the next-step choice to a starter, case, project, or consultation. The library does not fabricate a live surface where one does not exist.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {ranked.map(({ workflow, reasons }, index) => {
            const Icon = workflowIcons[workflow.id] || FileSearch;
            const action = selectedAction(workflow, path);
            return (
              <article
                key={workflow.id}
                data-workflow-id={workflow.id}
                className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm ${
                  index === 0 ? "border-primary/35 ring-1 ring-primary/10" : ""
                }`}
              >
                <div className="border-b bg-muted/25 p-6">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-3 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                          {workflow.category}
                        </p>
                      </div>
                      <h3 className="mt-4 text-2xl font-bold tracking-tight">{workflow.title}</h3>
                    </div>
                    {index === 0 && (
                      <span className="shrink-0 rounded-full border border-primary/30 bg-primary/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                        Best match
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{workflow.summary}</p>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        The operating problem
                      </p>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{workflow.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Why it matched
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                        {reasons.map((reason) => (
                          <li key={reason} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 border-y py-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Operating loop
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {workflow.stages.map((stage, stageIndex) => (
                        <span key={stage} className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs text-muted-foreground">
                          {String(stageIndex + 1).padStart(2, "0")} · {stage}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-5 text-xs leading-6 text-muted-foreground">
                    <span className="font-semibold text-foreground">Claim boundary.</span>{" "}
                    {workflow.boundary}
                  </p>

                  <div className="mt-auto pt-6">
                    <WorkflowAction
                      href={action.href}
                      label={action.label}
                      icon={SelectedPathIcon}
                      download={action.download}
                      primary
                    />
                    <div className="mt-3 flex flex-wrap gap-2">
                      <WorkflowAction
                        href={workflow.starterHref}
                        label="Starter"
                        icon={Download}
                        download
                      />
                      {workflow.liveHref && workflow.liveLabel && (
                        <WorkflowAction href={workflow.liveHref} label="Try live" icon={PlayCircle} />
                      )}
                      <WorkflowAction href={workflow.caseHref} label="Case" icon={BookOpen} />
                      <WorkflowAction href={workflow.projectHref} label="Project" icon={Hammer} />
                      <WorkflowAction
                        href={workflow.consultationHref}
                        label="Consultation"
                        icon={CalendarDays}
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border bg-[#0d1718] p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-teal-100/65">
            Still not sure where the boundary is?
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight">
            Bring the source material, current handoff, failure examples, and desired outcome.
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/58">
            A consultation is for clarifying the workflow and next decision. A project is a separate bounded scope with implementation and acceptance evidence.
          </p>
        </div>
        <Link
          href="/contact?type=project&source=workflow-library-general"
          className="inline-flex shrink-0 items-center text-sm font-semibold text-teal-100"
        >
          Discuss the workflow <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
