import Image from "next/image";

export default function HeroVideoBackground() {
  return (
    <div aria-hidden className="noise-overlay absolute inset-0 -z-10 overflow-hidden bg-background">
      {/* Blurred backdrop — the clip is portrait, so on wide screens object-contain
          leaves empty bars either side; this fills them instead of flat black. */}
      <Image
        src="/images/elimane dev.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-110 object-cover opacity-30 blur-2xl"
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/elimane dev.jpg"
        className="absolute inset-0 h-full w-full object-contain"
      >
        <source src="/images/video.MP4" type="video/mp4" />
      </video>
      {/* Legibility vignette anchored on the name/role, which now sits at the
          bottom of the frame — the rest of the footage stays uncovered. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 88%, rgba(8,9,13,0.85), transparent 72%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
    </div>
  );
}
