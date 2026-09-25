"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { profile } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";
import { EASE, Plus } from "./Reveal";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/**
 * @param base "" sur l'accueil (ancres locales), "/" sur les sous-pages.
 */
export function Header({ base = "" }: { base?: "" | "/" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const href = (id: string) => `${base}#${id}`;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu principal
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-editorial",
          scrolled || open
            ? "border-line/10 bg-background/75 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="section-padding mx-auto flex h-[var(--header-h)] max-w-content items-center justify-between gap-6">
          <Link
            href={base || "#top"}
            aria-label={`${profile.name} — accueil`}
            className="group relative z-[70] flex flex-col leading-none"
            onClick={() => setOpen(false)}
          >
            <span className="font-display text-2xl tracking-wide text-foreground">{profile.name}</span>
            <span className="label mt-1 text-[10px]">Developer</span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden md:block">
            <ul className="flex items-center gap-10">
              {links.map((link, i) => (
                <li key={link.id}>
                  <a
                    href={href(link.id)}
                    className="group flex items-baseline gap-1.5 font-mono text-label uppercase text-muted transition-colors hover:text-foreground"
                  >
                    <span className="text-[9px] text-accent-soft opacity-0 transition-opacity group-hover:opacity-100">
                      0{i + 1}
                    </span>
                    <span className="link-underline pb-0.5">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-[70] flex items-center gap-3 font-mono text-label uppercase text-foreground md:hidden"
          >
            <span>{open ? "Fermer" : "Menu"}</span>
            <span aria-hidden className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-full bg-foreground transition-transform duration-500 ease-editorial",
                  open && "translate-y-1.5 rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full bg-foreground transition-transform duration-500 ease-editorial",
                  open && "-translate-y-1.5 -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-background md:hidden"
            initial={prefersReduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={prefersReduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            exit={prefersReduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <nav aria-label="Navigation mobile" className="section-padding flex flex-1 flex-col justify-center pt-[var(--header-h)]">
              <ul className="border-t">
                {links.map((link, i) => (
                  <li key={link.id} className="overflow-hidden border-b">
                    <motion.a
                      href={href(link.id)}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4"
                      initial={prefersReduced ? false : { y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.07 }}
                    >
                      <span className="display text-[clamp(3.5rem,18vw,6rem)] leading-[0.9]">{link.label}</span>
                      <span className="label">0{i + 1}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="section-padding flex items-end justify-between gap-4 pb-8 pt-6"
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex flex-col gap-1">
                <span className="label">{profile.location}</span>
                <a href={`mailto:${profile.email}`} className="text-sm text-foreground">
                  {profile.email}
                </a>
              </div>
              <span className="label flex items-center gap-2 text-foreground">
                Available <Plus />
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
