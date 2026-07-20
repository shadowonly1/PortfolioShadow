"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.025, delayChildren: 0.4 },
  },
};

const letter = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.4,
    rotateX: -70,
    rotateZ: -6,
    filter: "blur(14px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateZ: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 280, damping: 18, mass: 0.9 },
  },
};

/**
 * Letter-by-letter "movie poster title" reveal: each glyph launches in from
 * below with an overshoot spring (scale + slight rotation), landing hard —
 * the cinematic, high-energy entrance for the Hero's name/role.
 */
export function KineticHeadline({
  lines,
  className = "",
}: {
  lines: { text: string; className?: string }[];
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || prefersReducedMotion) {
    return (
      <h1 className={className}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${line.className ?? ""}`}>
            {line.text}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
      style={{ perspective: 600 }}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-visible pb-1">
          {line.text.split(" ").map((w, wi) => (
            <span key={wi} className="mr-[0.28em] inline-block last:mr-0">
              {w.split("").map((char, ci) => (
                <motion.span
                  key={ci}
                  variants={letter}
                  className={`inline-block will-change-transform ${line.className ?? ""}`}
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
