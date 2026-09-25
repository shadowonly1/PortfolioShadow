import { services } from "@/lib/editorial";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

export function Services() {
  return (
    <section id="services" className="section">
      <Container>
        <SectionIntro
          index="03"
          label="Services"
          title={["What", "I build"]}
          aside="Du serveur à l'app, du logo à l'interface : ce qui me permet de livrer un produit complet."
        />

        <ol className="mt-16 border-t sm:mt-24">
          {services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={i * 0.05} className="group relative border-b">
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-editorial group-hover:scale-x-100"
              />
              <div className="grid grid-cols-12 items-baseline gap-4 py-8 sm:py-10">
                <span className="col-span-2 font-mono text-label text-muted transition-colors duration-500 group-hover:text-accent-soft sm:col-span-1">
                  0{i + 1}
                </span>
                <h3 className="display col-span-10 text-display-md transition-transform duration-700 ease-editorial group-hover:translate-x-3 sm:col-span-11 lg:col-span-6">
                  {service.title}
                </h3>
                <p className="col-span-10 col-start-3 max-w-md text-sm leading-relaxed text-muted sm:col-start-2 lg:col-span-3 lg:col-start-auto">
                  {service.description}
                </p>
                <p className="col-span-10 col-start-3 font-mono text-label uppercase text-muted/70 sm:col-start-2 lg:col-span-2 lg:col-start-auto lg:text-right">
                  {service.stack.join(" · ")}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
