import { earlierExperiences, experiences } from "@/lib/data";
import { Container } from "./Container";
import { Hairline, Plus, Reveal, RevealText } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

/** Première année présente dans la période (« Novembre 2022 — Aujourd'hui » → 2022). */
function startYear(period: string) {
  return period.match(/\d{4}/)?.[0] ?? "—";
}

export function Experience() {
  return (
    <section id="experience" className="section">
      <Container>
        <SectionIntro index="05" label="Experience" title={["Experience"]} />

        <ol className="mt-16 sm:mt-24">
          {experiences.map((exp, i) => (
            <li key={exp.company} className="grid gap-6 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
              <div className="lg:col-span-4">
                <RevealText
                  as="p"
                  lines={[startYear(exp.period)]}
                  className="font-display text-[clamp(5rem,14vw,12rem)] leading-[0.8] text-foreground/90"
                />
                {exp.current && (
                  <p className="label mt-3 flex items-center gap-2 text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />→ Aujourd&apos;hui
                  </p>
                )}
              </div>

              <div className="lg:col-span-8">
                <Hairline className="bg-line/20" />
                <Reveal className="pt-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <h3 className="display text-display-md">
                      <span className="mr-4 align-top font-mono text-label text-muted">0{i + 1}</span>
                      {exp.company}
                    </h3>
                    <span className="label">{exp.period}</span>
                  </div>
                  <p className="mt-4 font-serif text-2xl italic text-foreground">{exp.role}</p>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{exp.description}</p>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>

        <Reveal className="grid gap-6 border-t pt-10 lg:grid-cols-12 lg:gap-8">
          <p className="label flex items-center gap-2 lg:col-span-4">
            Expériences antérieures <Plus />
          </p>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8">
            {earlierExperiences.map((e) => (
              <li key={e.company} className="flex items-baseline justify-between border-b py-4">
                <span className="font-display text-3xl uppercase leading-none">{e.company}</span>
                <span className="label">{e.role}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
