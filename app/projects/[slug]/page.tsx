import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { Container } from "@/components/Container";
import AuroraMesh from "@/components/backgrounds/AuroraMesh";
import { Footer } from "@/components/Footer";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectVisual } from "@/components/ProjectVisual";
import { SubpageHeader } from "@/components/SubpageHeader";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const index = projects.findIndex((p) => p.slug === params.slug);
  const project = projects[index];
  if (!project) notFound();

  return (
    <>
      <SubpageHeader />
      <main>
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div aria-hidden className="noise-overlay absolute inset-0 -z-10">
            <AuroraMesh />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          </div>

          <Container>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-electric">
              {project.role}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>

            {project.links && project.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(79,93,255,0.45)] transition-colors hover:bg-accent-bright"
                  >
                    {link.label}
                    <ExternalLink size={15} aria-hidden />
                  </a>
                ))}
              </div>
            )}
          </Container>
        </section>

        <section className="pb-16">
          <Container>
            {project.images && project.images.length > 0 ? (
              <ProjectGallery project={project} />
            ) : (
              <div className="mx-auto max-w-3xl">
                <ProjectVisual project={project} index={index} />
              </div>
            )}
          </Container>
        </section>

        <section className="border-t border-border/60 py-16 sm:py-20">
          <Container className="grid gap-10 lg:grid-cols-2">
            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-accent-bright">
                <Target size={18} aria-hidden />
                <h2 className="font-display text-lg font-semibold text-foreground">Le problème</h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted">{project.problem}</p>
            </div>
            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-accent-electric">
                <Lightbulb size={18} aria-hidden />
                <h2 className="font-display text-lg font-semibold text-foreground">La solution</h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted">{project.solution}</p>
            </div>
          </Container>
        </section>

        {project.architecture && (
          <section className="border-t border-border/60 py-16 sm:py-20">
            <Container>
              <div className="glass-panel rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2.5 text-accent-bright">
                  <Sparkles size={18} aria-hidden />
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Architecture
                  </h2>
                </div>
                <p className="mt-4 text-base leading-relaxed text-muted">{project.architecture}</p>
              </div>
            </Container>
          </section>
        )}

        {project.challenges && project.challenges.length > 0 && (
          <section className="border-t border-border/60 py-16 sm:py-20">
            <Container>
              <div className="flex items-center gap-2.5 text-accent-electric">
                <ShieldAlert size={18} aria-hidden />
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Défis techniques relevés
                </h2>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.challenges.map((c) => (
                  <li
                    key={c}
                    className="glass-panel flex items-start gap-3 rounded-xl p-4 text-sm leading-relaxed text-muted"
                  >
                    <ShieldAlert size={18} className="mt-0.5 shrink-0 text-accent-electric" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}

        <section className="border-t border-border/60 py-16 sm:py-20">
          <Container>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Points forts
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="glass-panel flex items-start gap-3 rounded-xl p-4 text-sm leading-relaxed text-muted"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-electric" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {project.results && project.results.length > 0 && (
          <section className="border-t border-border/60 py-16 sm:py-20">
            <Container>
              <div className="flex items-center gap-2.5 text-accent-bright">
                <TrendingUp size={18} aria-hidden />
                <h2 className="font-display text-2xl font-semibold text-foreground">Résultats</h2>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.results.map((r) => (
                  <li
                    key={r}
                    className="glass-panel flex items-start gap-3 rounded-xl p-4 text-sm leading-relaxed text-muted"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-bright" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}

        {project.lessons && (
          <section className="border-t border-border/60 py-16 sm:py-20">
            <Container>
              <div className="glass-panel rounded-2xl border-accent-electric/20 p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-electric">
                  Leçon apprise
                </p>
                <p className="mt-4 font-serif text-xl italic leading-relaxed text-foreground/90 sm:text-2xl">
                  "{project.lessons}"
                </p>
              </div>
            </Container>
          </section>
        )}

        <section className="border-t border-border/60 py-16 sm:py-24">
          <Container className="flex flex-col items-center gap-6 text-center">
            <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Un projet similaire en tête ?
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(79,93,255,0.45)] transition-colors hover:bg-accent-bright"
              >
                En discuter
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent-electric hover:text-accent-electric"
              >
                Voir les autres projets
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
