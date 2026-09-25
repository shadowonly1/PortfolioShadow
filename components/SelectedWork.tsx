import { projects } from "@/lib/data";
import { projectCovers } from "@/lib/editorial";
import { cn } from "@/lib/utils";
import { BackgroundType } from "./BackgroundType";
import { Container } from "./Container";
import { ProjectEditorialCard } from "./ProjectEditorialCard";
import { SectionIntro } from "./SectionIntro";

export function SelectedWork() {
  return (
    <section id="work" className="section overflow-hidden">
      <BackgroundType word="Work" className="top-24 text-[40vw]" outline />
      <Container>
        <SectionIntro
          index="02"
          label="Selected work"
          title={["Selected", "Work"]}
          aside={
            <>
              Une sélection de projets représentatifs — du produit VTC complet à la refonte
              institutionnelle. {String(projects.length).padStart(2, "0")} études de cas, de l&apos;architecture à la production.
            </>
          }
        />

        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-20 sm:mt-28 lg:grid-cols-12 lg:gap-y-32">
          {projects.map((project, i) => {
            const frame = projectCovers[project.slug]?.frame ?? "landscape";
            return (
              <ProjectEditorialCard
                key={project.slug}
                project={project}
                index={i}
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
