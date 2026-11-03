import Image from "next/image";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { Container } from "./Container";
import { ClipReveal, Hairline, Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

/**
 * Services + méthode réunis sur une bande sombre : casse le rythme des sections
 * claires et regroupe « ce que je fais » et « comment je le fais ».
 */
export function Expertise({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang);
  const t = dict.services;
  const { services, processSteps } = getContent(lang);

  return (
    <section id="services" data-theme="dark" className="section bg-surface text-foreground">
      <Container>
        <SectionIntro index="03" label={t.label} title={t.title} aside={t.aside} />

        <ul className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <li
              key={service.title}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-line/10 bg-background ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <ClipReveal className={`relative w-full overflow-hidden ${i === 0 ? "aspect-[16/9] lg:aspect-[2.4/1]" : "aspect-[16/9]"}`}>
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
                  className="object-cover object-top transition-transform duration-1000 ease-editorial group-hover:scale-[1.03]"
                />
              </ClipReveal>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-2xl font-semibold text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                <p className="mt-auto pt-5 text-xs text-accent-soft">{service.stack.join(" · ")}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Méthode : version compacte, sur une ligne */}
        <div className="mt-20 sm:mt-28">
          <div className="flex items-center gap-4">
            <span className="label whitespace-nowrap text-foreground">{dict.process.label}</span>
            <Hairline className="flex-1" />
            <span className="label hidden whitespace-nowrap sm:inline">{dict.process.intro}</span>
          </div>
          <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.step} delay={(i % 6) * 0.06} className="group">
                <span className="block text-sm font-medium text-accent">{step.step}</span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-0.5 text-xs text-accent-soft">{step.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
