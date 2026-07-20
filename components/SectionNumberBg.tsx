export function SectionNumberBg({ number }: { number: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -left-10 top-16 select-none font-display text-[14rem] font-bold leading-none text-white/[0.025] sm:text-[18rem]"
    >
      {number}
    </span>
  );
}
