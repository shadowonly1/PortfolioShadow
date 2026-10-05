import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

export function Education({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).education;
  const { certifications, education } = getContent(lang);
  const entries = [
    ...education.map((e) => ({ ...e, kind: t.degree })),
    ...certifications.map((c) => ({ ...c, kind: t.certification })),
  ];
  return (
    <section id="certifications" className="section">
      <Container>
        <SectionIntro index="08" label={t.label} title={t.title} />

        <ol className="mt-16 border-t sm:mt-24">
          {entries.map((entry, i) => (
            <Reveal
              as="li"
              key={entry.name}
              delay={i * 0.06}
              className="group grid grid-cols-12 items-baseline gap-4 border-b py-8 sm:py-10"
            >
              <span className="label col-span-12 sm:col-span-2">
                <span className="text-foreground">0{i + 1}</span> / {entry.kind}
              </span>
              <h3 className="display col-span-12 text-display-sm transition-transform duration-700 ease-editorial group-hover:translate-x-2 sm:col-span-6">
                {entry.name}
              </h3>
              <p className="col-span-8 text-sm text-muted sm:col-span-3">{entry.issuer}</p>
              <p className="label col-span-4 text-right text-foreground sm:col-span-1">{entry.date}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
