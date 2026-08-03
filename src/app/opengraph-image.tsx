import { ImageResponse } from "next/og";
import { BRAND } from "@/shared/config/brand";

export const runtime = "edge";
export const alt = `${BRAND.name} — Web, App & Automation Services`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginBottom: 16,
          }}
        >
          {BRAND.name}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a0a0a0",
            letterSpacing: "0.5px",
          }}
        >
          Web · App · Automation
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 18,
            color: "#555555",
          }}
        >
          {BRAND.url}
        </div>
      </div>
    ),
    { ...size }
  );
}
