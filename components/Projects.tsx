import { projects } from "@/lib/data";
import SectionGlow from "./backgrounds/SectionGlow";
import { Container } from "./Container";
import { ProjectCard } from "./ProjectCard";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { SectionNumberBg } from "./SectionNumberBg";

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden border-t border-border/60 py-24 sm:py-32">
      <SectionGlow color="rgba(94, 234, 255, 0.12)" position="center" />
      <SectionNumberBg number="05" />
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="05 — Projets phares"
            title="Ce que j'ai construit"
            description="Une sélection de projets représentatifs — du produit VTC complet à la refonte institutionnelle."
          />
        </ScrollReveal>

        <div className="mt-14 flex flex-col gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} delay={i * 0.05} />
          ))}
        </div>
      </Container>
    </section>
  );
}
