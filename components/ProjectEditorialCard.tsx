import Link from "next/link";
import { getContent } from "@/lib/content";
import type { Project } from "@/lib/data";
import { getDictionary } from "@/lib/dictionary";
import { projectCovers, projectDisciplines, type ProjectCover } from "@/lib/editorial";
import { localePath, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ProjectCoverStage } from "./ProjectCoverStage";
import { ClipReveal, Reveal } from "./Reveal";

export function ProjectEditorialCard({
  project,
  index,
  lang,
  className,
}: {
  project: Project;
  index: number;
  lang: Lang;
  className?: string;
}) {
  const t = getDictionary(lang).work;
  const { projectCategory } = getContent(lang);
  const cover: ProjectCover = projectCovers[project.slug] ?? {
    frame: "landscape",
    kind: project.images?.length ? "browser" : "type",
    images: project.images ?? [],
  };
  const number = String(index + 1).padStart(2, "0");
  const disciplines = projectDisciplines(project);

  return (
    <article className={cn("group relative", className)}>
      <Link
        href={localePath(lang, `/projects/${project.slug}`)}
        data-cursor={t.view}
        className="block focus-visible:outline-offset-8"
      >
        <div className="mb-4 flex items-center justify-between gap-4 font-mono text-label uppercase">
          <span className="text-foreground transition-transform duration-700 ease-editorial group-hover:translate-x-2">
            {number}
          </span>
          <span className="text-muted">
            {project.conceptual ? t.concept : project.featured ? t.featured : projectCategory[project.slug]}
          </span>
        </div>

        <ClipReveal
          className={cn(
            "relative w-full overflow-hidden bg-surface",
            cover.frame === "portrait" ? "aspect-[4/5]" : "aspect-[4/3]"
          )}
        >
          <ProjectCoverStage project={project} cover={cover} lang={lang} />
          <div
            aria-hidden
            className="absolute inset-0 bg-background/0 transition-colors duration-700 ease-editorial group-hover:bg-background/15"
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
              {t.caseStudy}
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
