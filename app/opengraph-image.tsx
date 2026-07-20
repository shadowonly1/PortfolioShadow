import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const runtime = "edge";
export const alt = "Elimane Ba — Développeur Web, Mobile & Backend";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#08090D",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(79,93,255,0.55), transparent 55%), radial-gradient(circle at 85% 85%, rgba(94,234,255,0.35), transparent 50%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            color: "#5EEAFF",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: "#5EEAFF",
            }}
          />
          {profile.location}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 28,
            fontSize: 86,
            fontWeight: 800,
            color: "#F2F3F7",
            lineHeight: 1.05,
          }}
        >
          <span>{profile.name}</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 10,
            fontSize: 42,
            fontWeight: 600,
            backgroundImage: "linear-gradient(90deg, #7B85FF, #4F5DFF)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {profile.role}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 26,
            color: "#8B8FA3",
            maxWidth: 900,
          }}
        >
          {profile.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
