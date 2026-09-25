import { cn } from "@/lib/utils";
import { Hairline, Plus, Reveal, RevealText } from "./Reveal";

/**
 * En-tête de section éditorial :
 *   01 / SELECTED WORK ─────────────── +
 *   SELECTED
 *   WORK                         [aside]
 */
export function SectionIntro({
  index,
  label,
  title,
  aside,
  className,
}: {
  index: string;
  label: string;
  title: string[];
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-4">
        <span className="label whitespace-nowrap">
          <span className="text-foreground">{index}</span> / {label}
        </span>
        <Hairline className="flex-1" />
        <Plus />
      </div>

      <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-12 lg:items-end">
        <RevealText
          lines={title}
          className="display text-display-lg lg:col-span-8"
        />
        {aside && (
          <Reveal delay={0.2} className="max-w-prose text-base leading-relaxed text-muted lg:col-span-4 lg:pb-3">
            {aside}
          </Reveal>
        )}
      </div>
    </div>
  );
}
