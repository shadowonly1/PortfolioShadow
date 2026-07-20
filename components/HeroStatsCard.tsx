"use client";

import { Award, Code2, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { certifications, projects, skillGroups } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { CountUp } from "./CountUp";

const techCount = skillGroups.reduce((total, group) => total + group.items.length, 0);

const miniStats = [
  { value: "6+", label: "Ans" },
  { value: `${techCount}+`, label: "Technos" },
  { value: `${certifications.length}`, label: "Certifs" },
];

export function HeroStatsCard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="glass-panel relative w-full max-w-md overflow-hidden rounded-3xl p-6 shadow-2xl sm:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 rounded-full bg-accent-electric/10 blur-3xl"
      />

      <div className="relative z-10">
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/15 ring-1 ring-accent-electric/30">
            <Code2 size={22} className="text-accent-electric" aria-hidden />
          </div>
          <div>
            <div className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <CountUp value={`${projects.length}`} delay={1400} />
            </div>
            <p className="text-sm text-muted">Projets livrés</p>
          </div>
        </div>

        <div className="mb-7 space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted">Fiabilité en production</span>
            <span className="font-medium text-foreground">100%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
            <motion.div
              initial={prefersReducedMotion ? { width: "100%" } : { width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-electric"
            />
          </div>
        </div>

        <div className="mb-6 h-px w-full bg-border" />

        <div className="grid grid-cols-3 gap-2 text-center">
          {miniStats.map((stat, i) => (
            <div key={stat.label} className="flex items-center justify-center gap-2">
              {i > 0 && <span className="h-8 w-px bg-border" aria-hidden />}
              <div>
                <p className="font-display text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-wide text-muted">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Disponible
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-muted">
            <Crown size={11} className="text-yellow-500" aria-hidden />
            Certifié Adobe
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-muted">
            <Award size={11} className="text-accent-electric" aria-hidden />
            6 ans d&apos;xp
          </div>
        </div>
      </div>
    </div>
  );
}
