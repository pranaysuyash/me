import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "No Claim Without Evidence by Pranay Suyash";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function BookOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "stretch",
          color: "#f4fbf9",
          background:
            "radial-gradient(circle at 78% 18%, rgba(89,215,203,.25), transparent 34%), linear-gradient(145deg, #102426 0%, #071013 76%)",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            width: 410,
            margin: 42,
            padding: "46px 42px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid rgba(255,255,255,.18)",
            borderRadius: 16,
            background: "rgba(255,255,255,.035)",
          }}
        >
          <div style={{ fontSize: 16, color: "#9ee8e0", letterSpacing: ".13em", textTransform: "uppercase" }}>
            AI systems field guide
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 55, lineHeight: 1.02, fontWeight: 850, letterSpacing: "-.045em" }}>
            <span>No Claim</span>
            <span>Without</span>
            <span>Evidence</span>
          </div>
          <div style={{ fontSize: 18, color: "rgba(244,251,249,.58)" }}>Pranay Suyash</div>
        </div>

        <div style={{ flex: 1, padding: "64px 64px 58px 22px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 25, color: "#9ee8e0", fontWeight: 700 }}>How to Build AI Systems You Can Verify</div>
            <div style={{ marginTop: 26, maxWidth: 650, fontSize: 42, lineHeight: 1.12, fontWeight: 780, letterSpacing: "-.03em" }}>
              Evidence links, eval contracts, review rules, action traces, and release gates.
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {["19 chapters", "PDF + EPUB", "INR 799 India", "$14.99 global"].map((item) => (
              <span
                key={item}
                style={{
                  padding: "10px 15px",
                  border: "1px solid rgba(255,255,255,.16)",
                  borderRadius: 999,
                  fontSize: 17,
                  color: "rgba(244,251,249,.72)",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, color: "rgba(244,251,249,.48)" }}>
            <span>No confidence theatre.</span>
            <span>pranaysuyash.com</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
