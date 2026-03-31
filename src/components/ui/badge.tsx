import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        "border-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function GradientBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium"
      style={{
        background:
          "linear-gradient(#0d1422,#0d1422) padding-box, linear-gradient(90deg,rgba(59,130,246,0.6),rgba(139,92,246,0.6),rgba(245,158,11,0.5)) border-box",
        color: "rgba(255,255,255,0.85)",
        border: "1px solid transparent",
      }}
    >
      {children}
    </span>
  );
}

export function NeutralBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border border-white/10 bg-white/[0.03] text-white/65">
      {children}
    </span>
  );
}
