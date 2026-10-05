import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import { projectCovers } from "@/lib/editorial";
import type { Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { BackgroundType } from "./BackgroundType";
import { Container } from "./Container";
import { ProjectEditorialCard } from "./ProjectEditorialCard";
import { SectionIntro } from "./SectionIntro";

export function SelectedWork({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).work;
  const { projects } = getContent(lang);
  return (
    <section id="work" className="section overflow-hidden">
      <BackgroundType word={t.label} className="top-24 text-[40vw]" outline />
      <Container>
        <SectionIntro
          index="02"
          label={t.label}
          title={t.title}
          aside={t.aside(String(projects.length).padStart(2, "0"))}
        />

        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-20 sm:mt-28 lg:grid-cols-12 lg:gap-y-32">
          {projects.map((project, i) => {
            const frame = projectCovers[project.slug]?.frame ?? "landscape";
            return (
              <ProjectEditorialCard
                key={project.slug}
                project={project}
                index={i}
                lang={lang}
                className={cn(
                  frame === "portrait" ? "lg:col-span-5" : "lg:col-span-7",
                  i % 2 === 1 && "lg:mt-40"
                )}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
