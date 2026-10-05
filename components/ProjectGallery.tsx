import Image from "next/image";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ClipReveal } from "./Reveal";

/** Galerie éditoriale : premier visuel pleine largeur, les suivants sur deux colonnes. */
export function ProjectGallery({ project, visualLabel }: { project: Project; visualLabel: string }) {
  const images = project.images ?? [];
  const phone = project.deviceType === "phone";

  const screens = project.screens ?? [];

  return (
    <div className="flex flex-col gap-10 sm:gap-16">
      {screens.length > 0 && (
        <figure>
          <ClipReveal className="relative overflow-hidden bg-surface px-6 py-10 sm:px-12 sm:py-16">
            <ul className="grid grid-cols-2 justify-items-center gap-6 sm:gap-10 lg:grid-cols-4">
              {screens.map((src, i) => (
                <li
                  key={src}
                  className="relative aspect-[37/80] w-full max-w-[15rem] overflow-hidden rounded-[1.6rem] border border-line/15 bg-black p-1.5 shadow-2xl shadow-black/40"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[1.25rem]">
                    <Image
                      src={src}
                      alt={i === 0 ? project.imageAlt : `${project.name} — ${visualLabel} ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 240px, 45vw"
                      className="object-cover object-top"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </ClipReveal>
          <figcaption className="label mt-3 flex justify-between">
            <span>{project.name}</span>
            <span>App</span>
          </figcaption>
        </figure>
      )}
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
      {images.map((src, i) => {
        const wide = i === 0 || (images.length % 2 === 0 && i === images.length - 1 && images.length > 2);
        return (
          <figure key={src} className={cn(wide && "sm:col-span-2")}>
            <ClipReveal
              className={cn(
                "relative w-full overflow-hidden bg-surface",
                wide ? (phone ? "aspect-[4/3]" : "aspect-[16/9]") : phone ? "aspect-[4/5]" : "aspect-[4/3]"
              )}
            >
              <Image
                src={src}
                alt={i === 0 ? project.imageAlt : `${project.name} — ${visualLabel} ${i + 1}`}
                fill
                sizes={wide ? "(min-width: 1440px) 1344px, 100vw" : "(min-width: 640px) 50vw, 100vw"}
                className="object-contain p-4 sm:p-8"
              />
            </ClipReveal>
            <figcaption className="label mt-3 flex justify-between">
              <span>{project.name}</span>
              <span>Fig. {String(i + 1).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        );
      })}
    </div>
    </div>
  );
}
