import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const baseField =
  "peer w-full rounded-lg border border-border bg-background/60 px-4 pb-2 pt-5 text-sm text-foreground outline-none transition-all duration-300 focus:border-accent-electric focus:shadow-[0_0_0_3px_rgba(94,234,255,0.15)]";

const baseLabel =
  "pointer-events-none absolute left-4 top-3.5 text-sm text-muted transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-accent-electric peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]";

export function FloatingInput({
  id,
  label,
  className = "",
  ...props
}: { id: string; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <input id={id} placeholder=" " className={`${baseField} ${className}`} {...props} />
      <label htmlFor={id} className={baseLabel}>
        {label}
      </label>
    </div>
  );
}

export function FloatingTextarea({
  id,
  label,
  className = "",
  ...props
}: { id: string; label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="relative">
      <textarea id={id} placeholder=" " className={`${baseField} resize-none ${className}`} {...props} />
      <label htmlFor={id} className={baseLabel}>
        {label}
      </label>
    </div>
  );
}
