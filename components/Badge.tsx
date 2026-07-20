import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={style}
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted transition-all duration-300",
        className
      )}
    >
      {children}
    </span>
  );
}
