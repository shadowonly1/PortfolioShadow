export default function AnimatedGrid() {
  return (
    <div
      aria-hidden
      className="bg-grid absolute inset-0 animate-grid-pan opacity-70"
      style={{
        maskImage: "radial-gradient(circle at 50% 35%, black 0%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 35%, black 0%, transparent 80%)",
      }}
    />
  );
}
