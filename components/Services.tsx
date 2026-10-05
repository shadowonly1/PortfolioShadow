import Image from "next/image";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { Container } from "./Container";
import { ClipReveal, Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

export function Services({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).services;
  const { services } = getContent(lang);

  return (
    <section id="services" className="section">
      <Container>
        <SectionIntro index="03" label={t.label} title={t.title} aside={t.aside} />

        <ol className="mt-16 border-t sm:mt-24">
          {services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={i * 0.05} className="group relative border-b">
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-editorial group-hover:scale-x-100"
              />
              <div className="grid grid-cols-12 items-center gap-x-4 gap-y-6 py-8 sm:py-10">
                <span className="col-span-2 self-start pt-3 font-mono text-label text-muted transition-colors duration-500 group-hover:text-accent-soft sm:col-span-1">
                  0{i + 1}
                </span>
                <div className="col-span-10 sm:col-span-6 lg:col-span-6">
                  <h3 className="display text-display-md transition-transform duration-700 ease-editorial group-hover:translate-x-3">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{service.description}</p>
                  <p className="mt-3 font-mono text-label uppercase text-muted/70">{service.stack.join(" · ")}</p>
                </div>
                <ClipReveal
                  className="relative col-span-10 col-start-3 aspect-[16/10] overflow-hidden bg-surface sm:col-span-5 sm:col-start-auto lg:col-span-4 lg:col-start-9"
                  delay={0.1}
                >
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 80vw"
                    className="object-cover object-top transition-transform duration-1000 ease-editorial group-hover:scale-[1.04]"
                  />
                </ClipReveal>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
