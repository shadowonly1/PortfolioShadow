"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDone(true);
      return;
    }

    let raf: number;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 350);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (done) {
      document.documentElement.style.overflow = "";
    } else if (mounted) {
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [done, mounted]);

  if (!mounted || prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-background"
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "var(--mesh-gradient)",
              opacity: 0.5,
              filter: "blur(60px)",
            }}
          />

          <motion.span
            initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-electric font-display text-xl font-bold text-white shadow-[0_0_40px_rgba(79,93,255,0.6)]"
          >
            EB
          </motion.span>

          <div className="relative flex flex-col items-center gap-3">
            <span className="font-mono text-4xl font-bold tabular-nums text-foreground sm:text-5xl">
              {progress}
              <span className="text-accent-electric">%</span>
            </span>
            <div className="h-px w-40 overflow-hidden bg-border sm:w-56">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent-electric"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              Chargement de l&apos;expérience
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
