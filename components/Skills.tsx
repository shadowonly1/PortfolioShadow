import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { Container } from "./Container";
import { getTechIcon } from "./techIcons";

/** Stack technique : le logo officiel de chaque technologie, groupé par famille. */
export function Skills({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).skills;
  const { skillGroups } = getContent(lang);
  return (
    <section id="skills" className="border-t py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <h2 className="label text-foreground">{t.label}</h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{t.aside}</p>
          </div>
          <div className="grid gap-8 lg:col-span-9">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs uppercase tracking-wide text-muted">{group.title}</h3>
                <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                  {group.items.map((item) => {
                    const { Icon, color } = getTechIcon(item);
                    return (
                      <li
                        key={item}
                        className="flex flex-col items-center justify-center gap-2 rounded-xl border border-line/10 bg-surface/60 px-2 py-4 text-center transition-colors duration-300 hover:border-line/30"
                      >
                        <span aria-hidden className="text-foreground">
                          <Icon size={28} style={{ color }} />
                        </span>
                        <span className="text-xs leading-tight text-foreground">{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
