import { processSteps } from "@/lib/process";
import SectionGlow from "./backgrounds/SectionGlow";
import { Container } from "./Container";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { SectionNumberBg } from "./SectionNumberBg";

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden border-t border-border/60 py-24 sm:py-32">
      <SectionGlow color="rgba(79, 93, 255, 0.16)" position="center" />
      <SectionNumberBg number="04" />

      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="04 — Méthode"
            title="Comment je travaille"
            description="Un processus simple, répété sur chaque projet — de la petite plateforme interne à l'application multi-pays."
          />
        </ScrollReveal>

        <div className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          />
          {processSteps.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 0.08}>
              <div className="group glass-panel relative flex h-full flex-col gap-3 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-electric/40">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent-bright transition-all duration-300 group-hover:bg-accent-electric/20 group-hover:text-accent-electric group-hover:shadow-[0_0_16px_rgba(94,234,255,0.35)]">
                    {step.step}
                  </span>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
