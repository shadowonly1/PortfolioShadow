import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const runtime = "edge";
export const alt = "Elimane Ba — Développeur Web, Mobile & Backend";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photoData = await fetch(
    new URL("../public/images/shad.png", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const photoSrc = `data:image/png;base64,${Buffer.from(photoData).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#08090D",
          fontFamily: "sans-serif",
        }}
      >
        <img
          src={photoSrc}
          width={620}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 620,
            height: 630,
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, #08090D 40%, rgba(8,9,13,0.55) 62%, transparent 78%), radial-gradient(circle at 10% 10%, rgba(79,93,255,0.4), transparent 55%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px",
            maxWidth: 760,
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
      </div>
    ),
    { ...size }
  );
}
