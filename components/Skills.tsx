import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import { coreSkills } from "@/lib/editorial";
import type { Lang } from "@/lib/i18n";
import { BackgroundType } from "./BackgroundType";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

export function Skills({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).skills;
  const { skillGroups } = getContent(lang);
  return (
    <section id="skills" className="section overflow-hidden">
      <BackgroundType word="Stack" className="bottom-10 text-[42vw]" outline drift={120} />
      <Container>
        <SectionIntro
          index="04"
          label={t.label}
          title={t.title}
          aside={t.aside}
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

              <div className="lg:col-span-9">
                <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-1 sm:gap-x-12">
                  {group.items
                    .filter((item) => coreSkills.has(item))
                    .map((item, i) => (
                      <li key={item} className="group/item relative">
                        <span className="display inline-block text-[clamp(2.5rem,6.5vw,6rem)] leading-[0.95] text-foreground/85 transition-[color,transform] duration-500 ease-editorial hover:-translate-y-1 hover:text-foreground">
                          {item}
                        </span>
                        <sup
                          aria-hidden
                          className="ml-1 align-super font-mono text-[11px] text-muted transition-colors duration-500 group-hover/item:text-accent-soft"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </sup>
                      </li>
                    ))}
                </ul>
                {group.items.some((item) => !coreSkills.has(item)) && (
                  <p className="label mt-5 flex flex-wrap gap-x-2 gap-y-1">
                    <span className="text-foreground">{t.also}</span>
                    {group.items.filter((item) => !coreSkills.has(item)).join(" · ")}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
