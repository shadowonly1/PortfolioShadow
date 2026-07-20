"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const words = ["Web", "Mobile", "Backend"];

export function TypingRole() {
  const prefersReducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    if (prefersReducedMotion) return;

    let cancelled = false;
    let index = 0;
    let charIndex = 0;
    let phase: "typing" | "pausing" | "deleting" = "typing";

    function tick() {
      if (cancelled) return;
      const word = words[index];

      if (phase === "typing") {
        charIndex += 1;
        setText(word.slice(0, charIndex));
        setWordIndex(index);
        if (charIndex >= word.length) {
          phase = "pausing";
          setTimeout(tick, 1400);
          return;
        }
        setTimeout(tick, 90 + Math.random() * 60);
        return;
      }

      if (phase === "pausing") {
        phase = "deleting";
        setTimeout(tick, 400);
        return;
      }

      // deleting
      charIndex -= 1;
      setText(word.slice(0, charIndex));
      if (charIndex <= 0) {
        index = (index + 1) % words.length;
        phase = "typing";
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, 45);
    }

    const start = setTimeout(tick, 600);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <span className="font-serif italic text-accent-electric">Web, Mobile &amp; Backend</span>
    );
  }

  return (
    <span className="inline-flex items-baseline" aria-live="off">
      <span key={wordIndex} className="font-serif italic text-accent-electric">
        {text}
      </span>
      <span className="animate-blink ml-0.5 inline-block w-[2px] self-stretch bg-accent-electric" aria-hidden />
      <span className="sr-only">Web, Mobile &amp; Backend</span>
    </span>
  );
}
