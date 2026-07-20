import Image from "next/image";
import type { Project } from "@/lib/data";

function DeviceChrome({ type }: { type: "browser" | "phone" }) {
  if (type === "phone") {
    return (
      <div
        aria-hidden
        className="flex h-6 shrink-0 items-center justify-center rounded-t-[inherit] bg-surfaceRaised"
      >
        <span className="h-1.5 w-10 rounded-full bg-border" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="flex h-7 shrink-0 items-center gap-1.5 rounded-t-[inherit] bg-surfaceRaised px-3"
    >
      <span className="h-2 w-2 rounded-full bg-destructive/60" />
      <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
      <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
    </div>
  );
}

export function ProjectGallery({ project }: { project: Project }) {
  const images = project.images ?? [];
  const deviceType = project.deviceType ?? "browser";

  if (images.length === 1) {
    return (
      <div className="relative flex flex-col overflow-hidden rounded-xl border border-border bg-background">
        <DeviceChrome type={deviceType} />
        <Image
          src={images[0]}
          alt={project.imageAlt}
          width={1600}
          height={1000}
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-auto w-full object-contain"
        />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="flex flex-col gap-2 sm:gap-3">
        {images.map((src, i) => (
          <div
            key={src}
            className="relative flex flex-col overflow-hidden rounded-xl border border-border bg-background"
          >
            <DeviceChrome type={deviceType} />
            <Image
              src={src}
              alt={`${project.name} — visuel ${i + 1}`}
              width={1600}
              height={1000}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="h-auto w-full object-contain"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {images.map((src, i) => (
        <div
          key={src}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all duration-500 hover:z-10 hover:scale-105 hover:border-accent/50"
        >
          <DeviceChrome type={deviceType} />
          <div className="relative flex aspect-video items-center justify-center p-2">
            <Image
              src={src}
              alt={`${project.name} — visuel ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 420px, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
