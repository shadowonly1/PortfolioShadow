import Image from "next/image";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { Container } from "./Container";
import { ClipReveal, Hairline, Plus, Reveal, RevealText } from "./Reveal";

const cvLinks = [
  { lang: "fr", href: "/cv/CV_Elimane_BA_FR.pdf", label: "CV — Français ↓" },
  { lang: "en", href: "/cv/CV_Elimane_BA_EN.pdf", label: "CV — English ↓" },
];

export function About({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).about;
  const { about, certifications, profile, skillGroups, stats: figures } = getContent(lang);
  const techCount = skillGroups.reduce((total, group) => total + group.items.length, 0);
  const stats = [
    { value: figures.years, label: t.stats.years },
    { value: String(figures.deliveredProjects).padStart(2, "0"), label: t.stats.delivered },
    { value: `${techCount}+`, label: t.stats.tech },
    { value: String(certifications.length).padStart(2, "0"), label: t.stats.cert },
  ];
  // Le CV dans la langue de la page en premier.
  const cvs = [...cvLinks].sort((a) => (a.lang === lang ? -1 : 1));

  return (
    <section id="about" className="section border-t-0">
      <Container>
        <div className="flex items-center gap-4">
          <span className="label whitespace-nowrap">
            <span className="text-foreground">01</span> / {t.label}
          </span>
          <Hairline className="flex-1" />
          <Plus />
        </div>

        <RevealText
          lines={[t.headline[0], <span key="l2" className="text-muted">{t.headline[1]}</span>]}
          className="display mt-12 max-w-6xl text-display-md sm:mt-16"
        />

        <div className="mt-16 grid gap-12 sm:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <ClipReveal className="group relative aspect-[4/5] w-full max-w-sm overflow-hidden bg-surface">
              <Image
                src="/images/shadow.jpeg"
                alt={`${t.portraitAlt} ${profile.name}`}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 24rem, 100vw"
                className="object-cover object-top grayscale transition-[filter,transform] duration-1000 ease-editorial group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            </ClipReveal>
            <p className="label mt-4 flex justify-between">
              <span>{profile.alias}</span>
              <span>Fig. 01</span>
            </p>
          </div>

          <div className="max-w-2xl lg:col-span-6 lg:col-start-6">
            <p className="label mb-6 text-foreground">{t.profile}</p>
            <div className="flex flex-col gap-6">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08} as="p" className="text-lg leading-relaxed text-muted">
                  {p}
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {cvs.map((cv) => (
                <a
                  key={cv.href}
                  href={cv.href}
                  download
                  className="link-underline pb-1 font-mono text-label uppercase text-foreground"
                >
                  {cv.label}
                </a>
              ))}
            </Reveal>
          </div>

        </div>

        <dl className="mt-20 grid grid-cols-2 border-t sm:mt-28 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="flex flex-col gap-2 border-b py-8 pr-4 odd:border-r odd:pl-0 even:pl-6 lg:border-b-0 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
            >
              <dt className="label order-2">{stat.label}</dt>
              <dd className="order-1 font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.85] text-foreground">
                {stat.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
