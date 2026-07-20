import { Building2, Layers, Smartphone, Users } from "lucide-react";
import type { Project } from "@/lib/data";

const themes = [
  { from: "from-accent/50", via: "via-accent-electric/25", icon: Smartphone },
  { from: "from-emerald-500/40", via: "via-accent/25", icon: Building2 },
  { from: "from-amber-500/35", via: "via-accent-electric/25", icon: Users },
  { from: "from-fuchsia-500/35", via: "via-accent/25", icon: Layers },
];

export function ProjectVisual({ project, index }: { project: Project; index: number }) {
  const theme = themes[index % themes.length];
  const Icon = theme.icon;

  return (
    <div
      className={`relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-gradient-to-br ${theme.from} ${theme.via} to-surface`}
      role="img"
      aria-label={project.imageAlt}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,243,247,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(242,243,247,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 75%)",
        }}
      />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-background/40 text-foreground backdrop-blur-sm">
        <Icon size={26} aria-hidden />
      </div>
      <p className="relative mt-4 font-display text-lg font-semibold text-foreground/90">
        {project.name}
      </p>
      <p className="relative mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
        {project.stack.slice(0, 3).join(" · ")}
      </p>
    </div>
  );
}
