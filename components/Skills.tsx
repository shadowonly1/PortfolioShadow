import { skillGroups } from "@/lib/data";
import { BackgroundType } from "./BackgroundType";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

export function Skills() {
  return (
    <section id="skills" className="section overflow-hidden">
      <BackgroundType word="Stack" className="bottom-10 text-[42vw]" outline drift={120} />
      <Container>
        <SectionIntro
          index="04"
          label="Tech stack"
          title={["Tech", "Stack"]}
          aside="Du langage au pixel : les outils avec lesquels je conçois, construis et mets en production."
        />

        <div className="mt-16 sm:mt-24">
          {skillGroups.map((group, gi) => (
            <Reveal
              key={group.title}
              delay={gi * 0.05}
              className="grid gap-6 border-t py-10 lg:grid-cols-12 lg:gap-8 lg:py-14"
            >
              <div className="lg:col-span-3">
                <p className="label flex gap-3">
                  <span className="text-foreground">{String(gi + 1).padStart(2, "0")}</span>
                  {group.title}
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{group.description}</p>
              </div>

              <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-1 sm:gap-x-12 lg:col-span-9">
                {group.items.map((item, i) => (
                  <li key={item} className="group/item relative">
                    <span className="display inline-block text-[clamp(2.5rem,6.5vw,6rem)] leading-[0.95] text-foreground/85 transition-[color,transform] duration-500 ease-editorial hover:-translate-y-1 hover:text-foreground">
                      {item}
                    </span>
                    <sup
                      aria-hidden
                      className="ml-1 align-super font-mono text-[10px] text-muted transition-colors duration-500 group-hover/item:text-accent-soft"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </sup>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
