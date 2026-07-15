import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function HeroSystemPanel() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="overflow-hidden rounded-xl border border-white/12 bg-[#071013] shadow-2xl shadow-black/30">
        <iframe
          src="/product-lab/index.html"
          title="Interactive product lab for SentinelTwin, SignKit, MetaExtract, and EchoPanel"
          className="h-[560px] w-full border-0 bg-[#071013] md:h-[610px]"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
        />
      </div>

      <div className="mt-3 flex items-start justify-between gap-4 px-1">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-100/55">
            Interactive product lab
          </p>
          <p className="mt-1 max-w-[340px] text-[11px] leading-5 text-white/42">
            Switch systems and operating views. The controls are real HTML; the product surfaces are spatial.
          </p>
        </div>
        <Link
          href="/systems"
          className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-100/70 transition-colors hover:text-white"
        >
          Full lab <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
