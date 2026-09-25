import Image from "next/image";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ClipReveal } from "./Reveal";

/** Galerie éditoriale : premier visuel pleine largeur, les suivants sur deux colonnes. */
export function ProjectGallery({ project }: { project: Project }) {
  const images = project.images ?? [];
  const phone = project.deviceType === "phone";

  return (
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
                alt={i === 0 ? project.imageAlt : `${project.name} — visuel ${i + 1}`}
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
  );
}
