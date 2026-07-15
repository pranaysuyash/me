import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function HeroSystemPanel() {
  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      <div className="overflow-hidden rounded-xl border border-white/12 bg-[#081012] shadow-2xl shadow-black/30">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
              Interactive system map
            </p>
            <p className="mt-1 text-xs text-white/72">
              Four product surfaces, one operating discipline
            </p>
          </div>
          <span className="rounded-full border border-teal-200/20 bg-teal-100/[0.08] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-teal-100/80">
            Three.js
          </span>
        </div>

        <iframe
          src="/spatial-portfolio/"
          title="Interactive Three.js map of Pranay Suyash's flagship product systems"
          className="h-[500px] w-full border-0 bg-[#081012]"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
        />

        <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-white/[0.025] px-4 py-3">
          <p className="text-[10px] leading-4 text-white/42">
            Drag to inspect. Product labels remain normal HTML links above the WebGL scene.
          </p>
          <Link
            href="/work"
            className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-100/75 transition-colors hover:text-white"
          >
            All work <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
