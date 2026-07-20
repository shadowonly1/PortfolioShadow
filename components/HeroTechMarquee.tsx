import { skillGroups } from "@/lib/data";
import { getTechIcon } from "./techIcons";

const items = skillGroups.flatMap((group) => group.items);
const track = [...items, ...items];

export function HeroTechMarquee() {
  return (
    <div className="glass-panel relative w-full max-w-md overflow-hidden rounded-3xl py-6">
      <h3 className="mb-4 px-6 font-mono text-xs uppercase tracking-[0.15em] text-muted">
        Stack du quotidien
      </h3>

      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="animate-marquee flex gap-8 whitespace-nowrap px-4 hover:[animation-play-state:paused]">
          {track.map((name, i) => {
            const { Icon, color } = getTechIcon(name);
            return (
              <div
                key={`${name}-${i}`}
                className="flex shrink-0 items-center gap-2 opacity-60 grayscale transition-all duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
              >
                <Icon size={20} style={{ color }} />
                <span className="text-sm font-medium text-foreground">{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
