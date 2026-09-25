import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

// Champ éditorial : simple filet bas, label flottant en monospace.
const baseField =
  "peer w-full border-0 border-b border-line/20 bg-transparent px-0 pb-3 pt-7 text-base text-foreground outline-none transition-colors duration-500 focus:border-accent focus:shadow-[0_1px_0_0_rgb(var(--accent))] focus-visible:outline-none";

const baseLabel =
  "pointer-events-none absolute left-0 top-7 font-mono text-label uppercase text-muted transition-all duration-300 ease-editorial peer-focus:top-1 peer-focus:text-accent-soft peer-[:not(:placeholder-shown)]:top-1";

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
