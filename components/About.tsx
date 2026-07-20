import { Award, Calendar, Code2, Download, Layers } from "lucide-react";
import Image from "next/image";
import { about, certifications, profile, projects, skillGroups } from "@/lib/data";
import SectionGlow from "./backgrounds/SectionGlow";
import { Container } from "./Container";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { SectionNumberBg } from "./SectionNumberBg";

const stats = [
  { icon: Calendar, value: "6+", label: "Ans d'expérience" },
  { icon: Code2, value: `${projects.length}`, label: "Projets livrés" },
  {
    icon: Layers,
    value: `${skillGroups.reduce((total, group) => total + group.items.length, 0)}+`,
    label: "Technologies maîtrisées",
  },
  { icon: Award, value: `${certifications.length}`, label: "Certification(s)" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <SectionGlow color="rgba(94, 234, 255, 0.14)" position="left" />
      <SectionNumberBg number="01" />

      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <ScrollReveal>
          <SectionHeading eyebrow="01 — À propos" title="Code et design, même métier" />

          <ScrollReveal delay={0.1} className="mt-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Disponible pour missions
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="mt-8 hidden lg:block">
            <div className="glass-panel group relative w-fit overflow-hidden rounded-2xl p-2">
              <div className="relative h-72 w-72 overflow-hidden rounded-xl xl:h-80 xl:w-80">
                <Image
                  src="/images/shadow.jpeg"
                  alt={`Photo de profil de ${profile.name}`}
                  fill
                  sizes="320px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
              <p className="px-3 py-4 text-sm leading-snug text-muted">
                {profile.alias}
                <span className="mt-1 block text-base font-medium text-foreground/80">
                  {profile.role}
                </span>
              </p>
            </div>
          </ScrollReveal>
        </ScrollReveal>

        <div className="flex flex-col gap-6">
          {about.paragraphs.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <p className="text-lg leading-relaxed text-muted">{p}</p>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={0.2} className="lg:hidden">
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-border bg-surface p-5">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-accent/40">
                <Image
                  src="/images/shadow.jpeg"
                  alt={`Photo de profil de ${profile.name}`}
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </div>
              <p className="text-sm text-muted">
                {profile.alias} — {profile.role}.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.28}>
            <div className="mt-2 grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="glass-panel group flex items-center gap-3 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-electric/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-bright transition-all duration-300 group-hover:bg-accent-electric/20 group-hover:text-accent-electric group-hover:shadow-[0_0_20px_rgba(94,234,255,0.35)]">
                    <Icon size={18} aria-hidden />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-foreground">{value}</p>
                    <p className="text-xs leading-snug text-muted">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.34}>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href="/cv/CV_Elimane_BA_FR.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(79,93,255,0.35)] transition-colors hover:bg-accent-bright"
              >
                <Download size={15} aria-hidden />
                Télécharger CV (FR)
              </a>
              <a
                href="/cv/CV_Elimane_BA_EN.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent-electric hover:text-accent-electric"
              >
                <Download size={15} aria-hidden />
                CV (EN)
              </a>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
