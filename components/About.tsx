import Image from "next/image";
import { about, certifications, deliveredProjects, profile, skillGroups } from "@/lib/data";
import { whatIDo } from "@/lib/editorial";
import { Container } from "./Container";
import { ClipReveal, Hairline, Plus, Reveal, RevealText } from "./Reveal";

const techCount = skillGroups.reduce((total, group) => total + group.items.length, 0);

const stats = [
  { value: "6+", label: "Ans d'expérience" },
  { value: String(deliveredProjects.length).padStart(2, "0"), label: "Projets livrés" },
  { value: `${techCount}+`, label: "Technologies" },
  { value: String(certifications.length).padStart(2, "0"), label: "Certification Adobe" },
];

export function About() {
  return (
    <section id="about" className="section">
      <Container>
        <div className="flex items-center gap-4">
          <span className="label whitespace-nowrap">
            <span className="text-foreground">01</span> / About — {profile.name}
          </span>
          <Hairline className="flex-1" />
          <Plus />
        </div>

        <RevealText
          lines={["I build digital products", <span key="l2" className="text-muted">from idea to production.</span>]}
          className="display mt-12 max-w-6xl text-display-md sm:mt-16"
        />

        <div className="mt-16 grid gap-12 sm:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <ClipReveal className="group relative aspect-[4/5] w-full max-w-sm overflow-hidden bg-surface">
              <Image
                src="/images/shadow.jpeg"
                alt={`Portrait de ${profile.name}`}
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

          <div className="lg:col-span-4 lg:col-start-6">
            <p className="label mb-6 text-foreground">About</p>
            <div className="flex flex-col gap-6">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08} as="p" className="text-lg leading-relaxed text-muted">
                  {p}
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <a href="/cv/CV_Elimane_BA_FR.pdf" download className="link-underline pb-1 font-mono text-label uppercase text-foreground">
                CV — Français ↓
              </a>
              <a href="/cv/CV_Elimane_BA_EN.pdf" download className="link-underline pb-1 font-mono text-label uppercase text-foreground">
                CV — English ↓
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-2 lg:col-start-11">
            <p className="label mb-6 text-foreground">What I do</p>
            <ol className="border-t">
              {whatIDo.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 0.05} y={10} className="flex items-baseline gap-3 border-b py-3">
                  <span className="label">0{i + 1}</span>
                  <span className="font-display text-2xl uppercase leading-none">{item}</span>
                </Reveal>
              ))}
            </ol>
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
