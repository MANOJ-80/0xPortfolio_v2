import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} (${site.handle}) — ${site.role}`;
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
          background: "#08090a",
          color: "#e8e9e3",
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(232,233,227,0.10) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10, fontSize: 25, letterSpacing: -0.5 }}>
            <span style={{ color: "#c2f24a" }}>0x</span>
            <span>Echo</span>
            <span style={{ color: "#83867c" }}>~/</span>
          </div>
          <div style={{ fontSize: 17, letterSpacing: 4, color: "#83867c" }}>
            MANOJGANESAN.DEV
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 5,
              color: "#c2f24a",
              marginBottom: 22,
            }}
          >
            SOFTWARE ENGINEER
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 104,
              fontWeight: 600,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            Manoj Ganesan
            <span style={{ color: "#c2f24a" }}>.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#a9aca2",
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Backend systems, security tooling and AI agent infrastructure.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(232,233,227,0.18)",
            paddingTop: 24,
            fontSize: 18,
            letterSpacing: 2,
            color: "#83867c",
          }}
        >
          <span>PYTHON · FASTAPI · TYPESCRIPT · POSTGRES · AWS</span>
          <span style={{ color: "#c2f24a" }}>OPEN TO WORK</span>
        </div>
      </div>
    ),
    size,
  );
}
