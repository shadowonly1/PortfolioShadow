import { Award, GraduationCap } from "lucide-react";
import { certifications, education } from "@/lib/data";
import { Container } from "./Container";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { SectionNumberBg } from "./SectionNumberBg";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-border/60 py-24 sm:py-32"
    >
      <SectionNumberBg number="07" />
      <Container>
        <ScrollReveal>
          <SectionHeading eyebrow="07 — Formation" title="Formation validée" />
        </ScrollReveal>

        <div className="mt-10 flex flex-col gap-4">
          {education.map((edu, i) => (
            <ScrollReveal key={edu.name} delay={i * 0.08}>
              <div className="glass-panel group flex items-center gap-4 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-electric/40">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-bright transition-all duration-300 group-hover:bg-accent-electric/20 group-hover:text-accent-electric group-hover:shadow-[0_0_20px_rgba(94,234,255,0.35)]"
                  aria-hidden
                >
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{edu.name}</p>
                  <p className="font-mono text-xs text-muted">
                    {edu.issuer} — {edu.date}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.name} delay={(education.length + i) * 0.08}>
              <div className="glass-panel group flex items-center gap-4 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-electric/40">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-bright transition-all duration-300 group-hover:bg-accent-electric/20 group-hover:text-accent-electric group-hover:shadow-[0_0_20px_rgba(94,234,255,0.35)]"
                  aria-hidden
                >
                  <Award size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{cert.name}</p>
                  <p className="font-mono text-xs text-muted">
                    {cert.issuer} — {cert.date}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
