import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { Container } from "./Container";
import { SectionIntro } from "./SectionIntro";

/** Parcours compact : postes, expériences antérieures et formation dans une seule frise. */
export function Experience({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).experience;
  const { earlierExperiences, experiences, education, certifications } = getContent(lang);
  const training = [...education, ...certifications];

  return (
    <section id="experience" className="section">
      <Container>
        <SectionIntro size="md" index="04" label={t.label} title={t.title} />

        <ol className="mt-14 border-t sm:mt-20">
          {experiences.map((exp) => (
            <li key={exp.company} className="grid gap-3 border-b py-8 lg:grid-cols-12 lg:gap-8 lg:py-10">
              <p className="text-sm text-muted lg:col-span-3">
                {exp.period}
                {exp.current && <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" aria-hidden />}
              </p>
              <div className="lg:col-span-9">
                <h3 className="text-2xl font-semibold text-foreground">{exp.company}</h3>
                <p className="mt-1 text-base text-foreground/80">{exp.role}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{exp.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="label text-foreground">{t.earlier}</h3>
            <ul className="mt-4 border-t">
              {earlierExperiences.map((e) => (
                <li key={e.company} className="flex items-baseline justify-between gap-4 border-b py-3">
                  <span className="font-medium text-foreground">{e.company}</span>
                  <span className="text-sm text-muted">
                    {e.role}
                    {e.period && ` · ${e.period}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div id="certifications">
            <h3 className="label text-foreground">{t.training}</h3>
            <ul className="mt-4 border-t">
              {training.map((e) => (
                <li key={e.name} className="border-b py-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-medium text-foreground">{e.name}</span>
                    <span className="shrink-0 text-sm text-muted">{e.date}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{e.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
