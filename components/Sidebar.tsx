"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronLeft,
  Code2,
  FolderKanban,
  Mail,
  Palette,
  User,
} from "lucide-react";
import Image from "next/image";
import { profile } from "@/lib/data";

const links = [
  { href: "#about", label: "À propos", icon: User },
  { href: "#skills", label: "Compétences", icon: Code2 },
  { href: "#experience", label: "Expérience", icon: Briefcase },
  { href: "#projects", label: "Projets", icon: FolderKanban },
  { href: "#design", label: "Design", icon: Palette },
  { href: "#contact", label: "Contact", icon: Mail },
];

const EXPANDED = 272;
const COLLAPSED = 84;

export function Sidebar({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeHref, setActiveHref] = useState("#about");

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lg:flex">
      <motion.aside
        animate={{ width: collapsed ? COLLAPSED : EXPANDED }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-border/70 lg:flex"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu principal
        </a>

        <div className="flex flex-1 flex-col overflow-hidden">
        <a href="#top" className="flex items-center gap-3 px-5 py-6">
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-electric font-display text-xs font-bold text-white shadow-[0_0_20px_rgba(79,93,255,0.5)]">
            EB
          </span>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap font-display text-sm font-semibold text-foreground"
              >
                {profile.name}
              </motion.span>
            )}
          </AnimatePresence>
        </a>

        <div className="mx-5 h-px bg-border/70" aria-hidden />

        <nav
          aria-label="Navigation principale"
          className="mt-4 flex flex-1 flex-col gap-1 px-3"
        >
          {links.map((link) => {
            const isActive = activeHref === link.href;
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 rounded-xl bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/[0.08]"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 rounded-xl bg-white/[0.03] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                )}

                <span
                  className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                    isActive ? "bg-accent-electric/15 text-accent-electric" : "text-muted group-hover:text-foreground"
                  }`}
                >
                  <Icon size={16} aria-hidden />
                </span>

                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.2 }}
                      className="relative overflow-hidden whitespace-nowrap"
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {isActive && !collapsed && (
                  <span
                    className="relative ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-accent-electric shadow-[0_0_8px_rgba(94,234,255,0.8)]"
                    aria-hidden
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="mx-3 mb-3 mt-4 h-px bg-border/70" aria-hidden />

        <a
          href="#contact"
          className={`mx-3 mb-4 flex items-center justify-center gap-2 rounded-xl bg-accent px-3 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(79,93,255,0.4)] transition-colors hover:bg-accent-bright ${
            collapsed ? "px-0" : ""
          }`}
        >
          <Mail size={16} aria-hidden />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Me contacter
              </motion.span>
            )}
          </AnimatePresence>
        </a>

        <div className="flex items-center gap-3 border-t border-border/60 px-4 py-4">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-accent/40">
            <Image src="/images/Elimane.png" alt={profile.name} fill sizes="36px" className="object-cover" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <p className="text-xs font-medium text-foreground">{profile.name}</p>
                <p className="text-[11px] text-muted">{profile.location}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>

        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Déplier la navigation" : "Réduire la navigation"}
          className="glass-panel absolute -right-3 top-9 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border text-muted shadow-lg transition-colors hover:text-accent-electric"
        >
          <motion.span
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex"
          >
            <ChevronLeft size={13} aria-hidden />
          </motion.span>
        </button>
      </motion.aside>

      <div
        aria-hidden
        className="hidden shrink-0 transition-[width] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:block"
        style={{ width: collapsed ? COLLAPSED : EXPANDED }}
      />

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
