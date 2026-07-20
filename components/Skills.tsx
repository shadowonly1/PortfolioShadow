import type { CSSProperties } from "react";
import { skillGroups } from "@/lib/data";
import SectionGlow from "./backgrounds/SectionGlow";
import { Container } from "./Container";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { SectionNumberBg } from "./SectionNumberBg";
import { getTechIcon } from "./techIcons";

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden border-t border-border/60 py-24 sm:py-32">
      <SectionGlow color="rgba(123, 133, 255, 0.16)" position="right" />
      <SectionNumberBg number="02" />

      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="02 — Compétences"
            title="Une boîte à outils complète"
            description="Du langage au pixel : ce qui me permet de livrer un produit sans dépendre d'une équipe pour chaque étage."
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group, i) => (
            <ScrollReveal key={group.title} delay={i * 0.08}>
              <div className="glass-panel group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-electric/40 sm:p-7">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {group.title}
                  </h3>
                  <span className="font-mono text-[11px] text-muted">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <p className="relative mt-2 text-sm text-muted">{group.description}</p>

                <div className="relative mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                  {group.items.map((item, itemIndex) => {
                    const { Icon, color } = getTechIcon(item);
                    return (
                      <div
                        key={item}
                        style={{ "--brand": color, animationDelay: `${itemIndex * 60}ms` } as CSSProperties}
                        className="group/tile animate-tile-in relative flex flex-col items-center justify-center gap-2 rounded-xl border border-border/70 bg-background/40 px-2 py-3.5 text-center opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--brand)] hover:bg-background/70 hover:shadow-[0_0_24px_-4px_var(--brand)]"
                      >
                        <Icon
                          size={24}
                          className="shrink-0 text-muted transition-all duration-300 group-hover/tile:scale-110 group-hover/tile:text-[color:var(--brand)]"
                        />
                        <span className="text-[10.5px] font-medium leading-tight text-muted transition-colors duration-300 group-hover/tile:text-foreground">
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
