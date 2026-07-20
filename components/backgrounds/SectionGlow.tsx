type Props = {
  color?: string;
  position?: "left" | "right" | "center";
  className?: string;
};

/**
 * A single soft radial light anchored to one side of a section — the cheap
 * way to give every section its own atmosphere without a bespoke background
 * component each time.
 */
export default function SectionGlow({
  color = "rgba(79, 93, 255, 0.35)",
  position = "center",
  className = "",
}: Props) {
  const pos =
    position === "left"
      ? "left-0 -translate-x-1/3"
      : position === "right"
        ? "right-0 translate-x-1/3"
        : "left-1/2 -translate-x-1/2";

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div
        className={`absolute top-1/2 ${pos} h-[520px] w-[520px] -translate-y-1/2 rounded-full blur-[120px]`}
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
