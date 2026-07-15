export function SpatialSystemMap() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/12 bg-[#081012] shadow-2xl shadow-black/25">
      <iframe
        src="/spatial-portfolio/index.html"
        title="Interactive map of flagship product systems"
        loading="eager"
        className="h-[520px] w-full border-0 md:h-[560px]"
        sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
      />
      <div className="border-t border-white/10 bg-[#0b1517] px-4 py-3 text-xs leading-5 text-white/55">
        Drag to inspect the product map. Open a label or 3D node to review the corresponding case study.
      </div>
    </div>
  );
}
