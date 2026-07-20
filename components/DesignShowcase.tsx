import { designWorks } from "@/lib/data";
import SectionGlow from "./backgrounds/SectionGlow";
import { Container } from "./Container";
import { MarqueeRow } from "./MarqueeRow";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { SectionNumberBg } from "./SectionNumberBg";

export function DesignShowcase() {
  const rowA = designWorks.filter((_, i) => i % 2 === 0);
  const rowB = designWorks.filter((_, i) => i % 2 === 1);

  return (
    <section
      id="design"
      className="relative overflow-hidden border-t border-border/60 py-24 sm:py-32"
    >
      <SectionGlow color="rgba(94, 234, 255, 0.14)" position="right" />
      <SectionNumberBg number="06" />

      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="06 — Design Graphique"
            title="Quand le pixel devient identité"
            description="Logos, affiches et supports de communication — l'autre moitié du métier, celle qui donne un visage aux produits que je construis."
          />
        </ScrollReveal>
      </Container>

      <div className="mt-14 flex flex-col gap-6">
        <ScrollReveal delay={0.1}>
          <MarqueeRow items={rowA} />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <MarqueeRow items={rowB} reverse />
        </ScrollReveal>
      </div>
    </section>
  );
}
