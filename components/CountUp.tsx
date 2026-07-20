"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function CountUp({
  value,
  duration = 1600,
  delay = 0,
}: {
  value: string;
  duration?: number;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const target = parseInt(value, 10);
  const suffix = value.replace(/^-?\d+/, "");
  const [count, setCount] = useState(prefersReducedMotion || Number.isNaN(target) ? target : 0);

  useEffect(() => {
    if (prefersReducedMotion || Number.isNaN(target)) return;

    let raf: number;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    const timeout = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion, target, duration, delay]);

  if (Number.isNaN(target)) return <>{value}</>;

  return (
    <>
      {count}
      {suffix}
    </>
  );
}
