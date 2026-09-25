import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ClipReveal, Hairline, Plus, Reveal, RevealText } from "@/components/Reveal";
import { projects } from "@/lib/data";
import { projectCategory, projectCovers, projectDisciplines } from "@/lib/editorial";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.name, description: project.summary },
  };
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="border-t">
      {items.map((item, i) => (
        <Reveal as="li" key={item} delay={i * 0.05} className="grid grid-cols-12 gap-4 border-b py-5">
          <span className="label col-span-2 sm:col-span-1">{String(i + 1).padStart(2, "0")}</span>
          <span className="col-span-10 text-base leading-relaxed text-foreground/85 sm:col-span-11">{item}</span>
        </Reveal>
      ))}
    </ol>
  );
}

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-8 border-t py-16 sm:py-24 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="label">
          <span className="text-foreground">{index}</span> / {title}
        </p>
        <h2 className="display mt-4 text-display-sm">{title}</h2>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </section>
  );
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const index = projects.findIndex((p) => p.slug === params.slug);
  const project = projects[index];
  if (!project) notFound();

  const number = String(index + 1).padStart(2, "0");
  const next = projects[(index + 1) % projects.length];
  const cover = projectCovers[project.slug];
  const hasGallery = Boolean(project.images && project.images.length > 0);

  let section = 0;
  const nextIndex = () => String(++section).padStart(2, "0");

  return (
    <>
      <Header base="/" />
      <main id="main-content" className="pt-[var(--header-h)]">
        <Container className="pt-12 sm:pt-20">
          <div className="flex items-center gap-4">
            <Link href="/#work" className="label whitespace-nowrap transition-colors hover:text-foreground">
              ← Selected work
            </Link>
            <Hairline immediate className="flex-1" />
            <span className="label whitespace-nowrap">
              Case study <span className="text-foreground">{number}</span> / {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-12">
            <RevealText
              as="p"
              immediate
              lines={[number]}
              className="font-display text-[clamp(4rem,10vw,9rem)] leading-[0.8] text-outline lg:col-span-2"
            />
            <div className="lg:col-span-10">
              <RevealText
                as="h1"
                immediate
                delay={0.1}
                lines={[project.name]}
                className="display text-[clamp(3rem,8vw,8.5rem)] leading-[0.86]"
              />
              <Reveal immediate delay={0.4} className="mt-6 max-w-2xl">
                <p className="font-serif text-2xl italic text-foreground sm:text-3xl">{projectCategory[project.slug]}</p>
                <p className="mt-4 text-lg leading-relaxed text-muted">{project.summary}</p>
              </Reveal>
            </div>
          </div>

          <Reveal immediate delay={0.5}>
            <dl className="mt-16 grid gap-y-8 border-t pt-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="label">Role</dt>
                <dd className="mt-3 pr-6 text-sm text-foreground">{project.role}</dd>
              </div>
              <div>
                <dt className="label">Disciplines</dt>
                <dd className="mt-3 text-sm text-foreground">{projectDisciplines(project).join(" / ") || "—"}</dd>
              </div>
              <div>
                <dt className="label">Stack</dt>
                <dd className="mt-3">
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-foreground">
                    {project.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="label">{project.links?.length ? "Links" : "Status"}</dt>
                <dd className="mt-3 flex flex-col gap-2">
                  {project.links?.length ? (
                    project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline w-fit pb-0.5 font-mono text-label uppercase text-foreground"
                      >
                        {link.label} ↗
                      </a>
                    ))
                  ) : (
                    <span className="text-sm text-foreground">
                      {project.conceptual ? "Concept / architecture" : "Livré"}
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </Reveal>
        </Container>

        <Container className="mt-16 sm:mt-24">
          {hasGallery ? (
            <ProjectGallery project={project} />
          ) : (
            <ClipReveal className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-surface">
              {cover?.src ? (
                <Image src={cover.src} alt={project.imageAlt} fill sizes="100vw" className="object-contain p-8" />
              ) : (
                <p aria-hidden className="display px-6 text-center text-[clamp(3rem,12vw,12rem)] leading-[0.8] text-foreground/10">
                  {project.stack.join(" · ")}
                </p>
              )}
            </ClipReveal>
          )}
        </Container>

        <Container className="mt-16 sm:mt-24">
          <section className="grid gap-12 border-t py-16 sm:py-24 lg:grid-cols-2 lg:gap-8">
            <Reveal>
              <p className="label">
                <span className="text-foreground">{nextIndex()}</span> / The problem
              </p>
              <p className="mt-6 text-xl leading-relaxed text-foreground/90 sm:text-2xl">{project.problem}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="label">
                <span className="text-foreground">{nextIndex()}</span> / The solution
              </p>
              <p className="mt-6 text-xl leading-relaxed text-foreground/90 sm:text-2xl">{project.solution}</p>
            </Reveal>
          </section>

          {project.architecture && (
            <Block index={nextIndex()} title="Architecture">
              <Reveal as="p" className="text-lg leading-relaxed text-muted">
                {project.architecture}
              </Reveal>
            </Block>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <Block index={nextIndex()} title="Défis techniques">
              <NumberedList items={project.challenges} />
            </Block>
          )}

          <Block index={nextIndex()} title="Points forts">
            <NumberedList items={project.highlights} />
          </Block>

          {project.results && project.results.length > 0 && (
            <Block index={nextIndex()} title="Résultats">
              <NumberedList items={project.results} />
            </Block>
          )}

          {project.lessons && (
            <section className="border-t py-20 sm:py-32">
              <p className="label flex items-center gap-2">
                Leçon apprise <Plus />
              </p>
              <Reveal as="p" className="mt-8 max-w-5xl font-serif text-3xl italic leading-snug text-foreground sm:text-5xl">
                « {project.lessons} »
              </Reveal>
            </section>
          )}
        </Container>

        <Link href={`/projects/${next.slug}`} data-cursor="Next" className="group block border-t">
          <Container className="py-16 sm:py-24">
            <p className="label flex justify-between">
              <span>Next project</span>
              <span>{String(((index + 1) % projects.length) + 1).padStart(2, "0")}</span>
            </p>
            <p className="display mt-6 text-display-lg transition-transform duration-700 ease-editorial group-hover:translate-x-4">
              {next.name} <span className="text-accent">→</span>
            </p>
          </Container>
        </Link>

        <Container className="flex flex-wrap items-center justify-between gap-6 border-t py-12">
          <p className="display text-display-sm">Un projet similaire en tête ?</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 bg-foreground px-7 py-4 font-mono text-label uppercase text-background transition-colors duration-500 hover:bg-accent hover:text-white"
          >
            Get in touch →
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
