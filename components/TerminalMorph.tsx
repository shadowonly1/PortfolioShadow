"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Code2, MapPin, Sparkles } from "lucide-react";
import { heroCodeLines, profile } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";

const stages = ["Idée", "Code", "Produit"];

/**
 * The site's single signature moment: a terminal block types out a short
 * object literal, then morphs into a live "profile card" UI — a literal
 * visualization of going from code to interface.
 */
export function TerminalMorph({
  className = "mx-auto w-full max-w-md",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<"typing" | "card">(prefersReduced ? "card" : "typing");
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const hasStarted = useRef(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    if (prefersReduced || hasStarted.current) return;
    hasStarted.current = true;

    let lineIndex = 0;
    let charIndex = 0;
    let cancelled = false;

    function typeNextChar() {
      if (cancelled) return;
      const currentLine = heroCodeLines[lineIndex];

      if (charIndex <= currentLine.length) {
        setTypedLines((prev) => {
          const next = [...prev];
          next[lineIndex] = currentLine.slice(0, charIndex);
          return next;
        });
        charIndex += 1;
        setTimeout(typeNextChar, 18 + Math.random() * 22);
        return;
      }

      lineIndex += 1;
      charIndex = 0;

      if (lineIndex < heroCodeLines.length) {
        setTimeout(typeNextChar, 120);
      } else {
        setTimeout(() => !cancelled && setPhase("card"), 900);
      }
    }

    const startTimeout = setTimeout(typeNextChar, 400);
    return () => {
      cancelled = true;
      clearTimeout(startTimeout);
    };
  }, [prefersReduced]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || phase !== "card") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 12);
    rotateX.set(py * -12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const activeStageIndex = phase === "typing" ? 1 : 2;

  return (
    <div className={`relative ${className}`} style={{ perspective: 1000 }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <AnimatePresence mode="wait">
          {phase === "typing" ? (
            <motion.div
              key="terminal"
              layoutId="signature-shell"
              className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/40"
              role="img"
              aria-label={`Extrait de code : ${heroCodeLines.join(" ")}`}
            >
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-3 font-mono text-xs text-muted">profile.ts</span>
              </div>
              <div
                className={`${compact ? "min-h-[120px] p-4 text-xs" : "min-h-[220px] p-5 text-sm"} font-mono leading-relaxed text-foreground/90`}
              >
                {heroCodeLines.map((line, i) => (
                  <div key={i} className="whitespace-pre">
                    {typedLines[i] ?? ""}
                    {typedLines[i] !== undefined && typedLines[i].length < line.length && (
                      <span className="animate-blink text-accent-bright">▍</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="card"
              layoutId="signature-shell"
              className="overflow-hidden rounded-xl border border-accent/40 bg-surface shadow-2xl shadow-accent/10"
            >
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                <Sparkles size={14} className="text-accent-bright" aria-hidden />
                <span className="font-mono text-xs text-muted">interface.tsx — compilé</span>
              </div>
              <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent-bright"
                    aria-hidden
                  >
                    <Code2 size={20} />
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-foreground">
                      {profile.name}
                    </p>
                    <p className="font-mono text-xs text-muted">{profile.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted">
                  <MapPin size={14} aria-hidden />
                  {profile.location}
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  Aussi designer graphique certifié Adobe — le code n&apos;est que la moitié du métier.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-5 flex items-center justify-center gap-3" aria-hidden>
        {stages.map((stage, index) => (
          <div key={stage} className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                index <= activeStageIndex ? "bg-accent-bright" : "bg-border"
              }`}
            />
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-500 ${
                index <= activeStageIndex ? "text-muted" : "text-border"
              }`}
            >
              {stage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
