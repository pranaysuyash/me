import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Pranay Suyash — Product leader and hands-on systems builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#f4fbf9",
          background:
            "radial-gradient(circle at 80% 18%, rgba(89,215,203,.19), transparent 31%), linear-gradient(145deg, #102123 0%, #071013 72%)",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 62,
                height: 62,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,.2)",
                borderRadius: 12,
                background: "rgba(255,255,255,.05)",
                fontSize: 23,
                fontWeight: 800,
              }}
            >
              PS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <div style={{ fontSize: 26, fontWeight: 750 }}>Pranay Suyash</div>
              <div style={{ fontSize: 15, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(228,244,240,.62)" }}>
                Product leader + hands-on systems builder
              </div>
            </div>
          </div>
          <div style={{ fontSize: 17, color: "rgba(228,244,240,.52)" }}>Bengaluru · Remote</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div style={{ fontSize: 64, lineHeight: 1.05, letterSpacing: "-.045em", fontWeight: 800 }}>
            I turn messy operational workflows into reviewable AI and product systems.
          </div>
          <div style={{ marginTop: 28, fontSize: 23, lineHeight: 1.45, color: "rgba(244,251,249,.68)" }}>
            14+ years across software engineering, Big Four transformation, YC-backed product leadership, and independent systems.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, alignItems: "center", color: "#9ee8e0", fontSize: 18 }}>
          <span>AI product leadership</span>
          <span style={{ color: "rgba(255,255,255,.24)" }}>·</span>
          <span>Workflow systems</span>
          <span style={{ color: "rgba(255,255,255,.24)" }}>·</span>
          <span>Inspectable evidence</span>
          <span style={{ marginLeft: "auto", color: "rgba(255,255,255,.48)" }}>pranaysuyash.com</span>
        </div>
      </div>
    ),
    size,
  );
}
