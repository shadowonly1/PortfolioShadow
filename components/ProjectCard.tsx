import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { Badge } from "./Badge";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectVisual } from "./ProjectVisual";
import { ScrollReveal } from "./ScrollReveal";

export function ProjectCard({
  project,
  index = 0,
  delay = 0,
}: {
  project: Project;
  index?: number;
  delay?: number;
}) {
  return (
    <ScrollReveal delay={delay}>
      <article
        className={`glass-panel group relative grid gap-8 overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-electric/40 hover:shadow-[0_0_60px_rgba(94,234,255,0.15)] sm:p-8 lg:grid-cols-2 lg:items-center ${
          project.featured ? "lg:grid-cols-[1.1fr_0.9fr]" : ""
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-electric/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:via-accent-electric/60 group-hover:opacity-100"
        />
        <span
          className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-8xl font-bold text-white/[0.03] transition-all duration-500 group-hover:scale-110 group-hover:text-accent-electric/10"
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-accent-electric/80">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-2xl font-semibold text-foreground">
              {project.name}
            </h3>
            {project.featured && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-accent-bright">
                <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent-electric" />
                Projet phare
              </span>
            )}
          </div>
          <p className="mt-1 text-sm font-medium text-accent-bright">{project.role}</p>
          <p className="mt-4 text-base leading-relaxed text-muted">{project.summary}</p>

          <div className="mt-5 flex flex-col gap-3 text-sm leading-relaxed text-muted">
            <p>
              <span className="font-semibold text-foreground">Problème — </span>
              {project.problem}
            </p>
            <p>
              <span className="font-semibold text-foreground">Solution — </span>
              {project.solution}
            </p>
          </div>

          <ul className="mt-5 flex flex-col gap-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright transition-colors hover:text-accent-electric"
            >
              Voir la case study
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>

          {project.links && project.links.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-4">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright transition-colors hover:text-accent-electric"
                >
                  {link.label}
                  <ExternalLink
                    size={14}
                    className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              ))}
            </div>
          )}
        </div>

        {project.images && project.images.length > 0 ? (
          <ProjectGallery project={project} />
        ) : (
          <div className="overflow-hidden rounded-xl transition-transform duration-500 group-hover:scale-[1.02]">
            <ProjectVisual project={project} index={index} />
          </div>
        )}
      </article>
    </ScrollReveal>
  );
}
