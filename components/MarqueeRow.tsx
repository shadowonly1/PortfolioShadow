import Image from "next/image";
import type { DesignWork } from "@/lib/data";

export function MarqueeRow({
  items,
  reverse = false,
}: {
  items: DesignWork[];
  reverse?: boolean;
}) {
  const track = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        className={`flex w-max gap-5 hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {track.map((work, i) => (
          <div
            key={`${work.src}-${i}`}
            className="group relative flex h-36 w-52 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-lg shadow-black/30 transition-transform duration-500 hover:-translate-y-1.5 hover:scale-[1.03] sm:h-44 sm:w-64"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[0_0_35px_rgba(94,234,255,0.45)] transition-opacity duration-500 group-hover:opacity-100"
            />
            <Image
              src={work.src}
              alt={work.alt}
              fill
              sizes="256px"
              className="object-contain p-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
