import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

export function Process({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).process;
  const { processSteps } = getContent(lang);
  return (
    <section id="process" className="section">
      <Container>
        <SectionIntro
          index="06"
          label={t.label}
          title={t.title}
          aside={t.aside}
        />

        <ol className="mt-16 grid border-l border-t sm:mt-24 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.step}
              delay={(i % 3) * 0.08}
              className="group relative flex flex-col justify-between gap-10 border-b border-r p-6 transition-colors duration-700 ease-editorial hover:bg-surface sm:min-h-[17rem] sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-[clamp(4.5rem,8vw,7rem)] leading-[0.8] text-outline transition-colors duration-700 group-hover:text-accent">
                  {step.step}
                </span>
                <span aria-hidden className="font-mono text-accent">+</span>
              </div>
              <div>
                <h3 className="display text-display-sm">{step.title}</h3>
                <p className="label mt-2 text-accent-soft">{step.subtitle}</p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
