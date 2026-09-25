import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { projectCategory, projectCovers, projectDisciplines, type ProjectCover } from "@/lib/editorial";
import { cn } from "@/lib/utils";
import { ClipReveal, Reveal } from "./Reveal";

export function ProjectEditorialCard({
  project,
  index,
  className,
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  const cover: ProjectCover = projectCovers[project.slug] ?? {
    src: project.images?.[0] ?? null,
    frame: "landscape",
    fit: "cover",
  };
  const number = String(index + 1).padStart(2, "0");
  const disciplines = projectDisciplines(project);

  return (
    <article className={cn("group relative", className)}>
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="View"
        className="block focus-visible:outline-offset-8"
        aria-label={`${project.name} — voir l'étude de cas`}
      >
        <div className="mb-4 flex items-center justify-between gap-4 font-mono text-label uppercase">
          <span className="text-foreground transition-transform duration-700 ease-editorial group-hover:translate-x-2">
            {number}
          </span>
          <span className="text-muted">
            {project.conceptual ? "Concept" : project.featured ? "Projet phare" : projectCategory[project.slug]}
          </span>
        </div>

        <ClipReveal
          className={cn(
            "relative w-full overflow-hidden bg-surface",
            cover.frame === "portrait" ? "aspect-[4/5]" : "aspect-[4/3]"
          )}
        >
          {cover.src ? (
            <Image
              src={cover.src}
              alt={project.imageAlt}
              fill
              sizes={cover.frame === "portrait" ? "(min-width: 1024px) 38vw, 100vw" : "(min-width: 1024px) 54vw, 100vw"}
              className={cn(
                "transition-transform duration-1000 ease-editorial group-hover:scale-[1.03]",
                cover.fit === "cover" ? "object-cover" : "object-contain p-8 sm:p-12"
              )}
              style={cover.position ? { objectPosition: cover.position } : undefined}
            />
          ) : (
            <TypographicCover project={project} />
          )}
          <div
            aria-hidden
            className="absolute inset-0 bg-background/0 transition-colors duration-700 ease-editorial group-hover:bg-background/25"
          />
          <span
            aria-hidden
            className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-lg text-background opacity-0 transition-all duration-700 ease-editorial group-hover:opacity-100 sm:h-16 sm:w-16"
          >
            ↗
          </span>
        </ClipReveal>

        <Reveal y={16} className="mt-6">
          <h3 className="display text-display-sm transition-transform duration-700 ease-editorial group-hover:translate-x-2">
            {project.name}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{project.summary}</p>
          <div className="mt-5 flex items-center justify-between gap-4 border-t pt-4 font-mono text-label uppercase">
            <span className="text-muted">{disciplines.join(" / ")}</span>
            <span className="flex items-center gap-2 text-foreground">
              Case study
              <span aria-hidden className="transition-transform duration-700 ease-editorial group-hover:translate-x-1.5">
                →
              </span>
            </span>
          </div>
        </Reveal>
      </Link>
    </article>
  );
}

/** Couverture sans visuel : composition purement typographique. */
function TypographicCover({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <span className="label relative">{project.role}</span>
      <p aria-hidden className="display relative text-[clamp(3rem,9vw,9rem)] leading-[0.82] text-foreground/90">
        {project.name.split(" (")[0]}
      </p>
      <span className="label relative text-accent-soft">{project.stack.join(" · ")}</span>
    </div>
  );
}
