"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const orbs = [
  { size: 460, color: "rgba(79, 93, 255, 0.55)", top: "6%", left: "8%", depth: 40 },
  { size: 380, color: "rgba(94, 234, 255, 0.4)", top: "50%", left: "80%", depth: 60 },
  { size: 320, color: "rgba(123, 133, 255, 0.5)", top: "72%", left: "16%", depth: 28 },
  { size: 240, color: "rgba(94, 234, 255, 0.3)", top: "20%", left: "60%", depth: 45 },
];

export default function FloatingLights() {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handlePointerMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((event.clientX / innerWidth - 0.5) * 2);
      mouseY.set((event.clientY / innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb, index) => (
        <FloatingOrb
          key={index}
          orb={orb}
          springX={springX}
          springY={springY}
          disableParallax={prefersReducedMotion}
        />
      ))}
    </div>
  );
}

function FloatingOrb({
  orb,
  springX,
  springY,
  disableParallax,
}: {
  orb: (typeof orbs)[number];
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
  disableParallax: boolean;
}) {
  const x = useTransform(springX, (value) => value * orb.depth);
  const y = useTransform(springY, (value) => value * orb.depth);

  return (
    <motion.div
      className={
        disableParallax
          ? "absolute rounded-full blur-[80px]"
          : "absolute rounded-full blur-[80px] animate-float"
      }
      style={{
        width: orb.size,
        height: orb.size,
        top: orb.top,
        left: orb.left,
        backgroundColor: orb.color,
        x: disableParallax ? 0 : x,
        y: disableParallax ? 0 : y,
      }}
    />
  );
}
