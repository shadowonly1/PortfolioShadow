import Link from "next/link";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import { majorProjects, projectCovers, projectDisciplines, type ProjectCover } from "@/lib/editorial";
import { localePath, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { ProjectCoverStage } from "./ProjectCoverStage";
import { ClipReveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

/**
 * Trois projets majeurs en grand format (un écran chacun), puis une liste
 * compacte des autres : la hiérarchie dit au visiteur ce qui compte.
 */
export function SelectedWork({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).work;
  const { projects, projectCategory, shortNames, keyFacts, stats } = getContent(lang);
  const major = majorProjects
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => Boolean(p));
  const others = projects.filter((p) => !majorProjects.includes(p.slug));

  return (
    <section id="work" className="section">
      <Container>
        <SectionIntro index="02" label={t.label} title={t.title} aside={t.aside(String(stats.deliveredProjects))} />

        <div className="mt-16 flex flex-col gap-24 sm:mt-24 lg:gap-36">
          {major.map((project, i) => {
            const cover: ProjectCover = projectCovers[project.slug] ?? {
              frame: "landscape",
              kind: project.images?.length ? "browser" : "type",
              images: project.images ?? [],
            };
            const facts = keyFacts[project.slug] ?? [];
            return (
              <article key={project.slug} className="group">
                <Link
                  href={localePath(lang, `/projects/${project.slug}`)}
                  data-cursor={t.view}
                  className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
                >
                  <ClipReveal
                    className={cn(
                      "relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface lg:col-span-7",
                      i % 2 === 1 && "lg:order-2"
                    )}
                  >
                    <ProjectCoverStage project={project} cover={{ ...cover, frame: "landscape" }} lang={lang} />
                  </ClipReveal>

                  <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-1")}>
                    <p className="label">
                      <span className="text-foreground">0{i + 1}</span> — {projectCategory[project.slug]}
                    </p>
                    <h3 className="display mt-4 text-display-md transition-colors duration-500 group-hover:text-accent-soft">
                      {shortNames[project.slug] ?? project.name}
                    </h3>
                    <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{project.summary}</p>

                    {facts.length > 0 && (
                      <dl className="mt-8 grid grid-cols-3 gap-4 border-t pt-6">
                        {facts.map((f) => (
                          <div key={f.label}>
                            <dd className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground">{f.value}</dd>
                            <dt className="mt-2 text-xs leading-snug text-muted">{f.label}</dt>
                          </div>
                        ))}
                      </dl>
                    )}

                    <span className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-medium text-foreground">
                      {t.caseStudy}
                      <span aria-hidden className="transition-transform duration-500 ease-editorial group-hover:translate-x-1.5">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {others.length > 0 && (
          <div className="mt-28 sm:mt-36">
            <h3 className="label text-foreground">{t.other}</h3>
            <ul className="mt-6 border-t">
              {others.map((project) => (
                <li key={project.slug} className="border-b">
                  <Link
                    href={localePath(lang, `/projects/${project.slug}`)}
                    className="group grid grid-cols-12 items-baseline gap-4 py-5 sm:py-6"
                  >
                    <span className="col-span-12 text-xl font-medium text-foreground transition-transform duration-500 ease-editorial group-hover:translate-x-2 sm:col-span-5 sm:text-2xl">
                      {shortNames[project.slug] ?? project.name}
                    </span>
                    <span className="col-span-8 text-sm text-muted sm:col-span-4">
                      {project.conceptual ? t.concept : projectCategory[project.slug]}
                    </span>
                    <span className="col-span-3 hidden text-sm text-muted sm:block sm:col-span-2">
                      {projectDisciplines(project).join(" · ")}
                    </span>
                    <span
                      aria-hidden
                      className="col-span-4 text-right text-muted transition-colors duration-500 group-hover:text-accent-soft sm:col-span-1"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
