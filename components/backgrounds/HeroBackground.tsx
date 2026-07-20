import Image from "next/image";
import AuroraMesh from "./AuroraMesh";
import FloatingLights from "./FloatingLights";
import ParticleField from "./ParticleField";

export default function HeroBackground() {
  return (
    <div aria-hidden className="noise-overlay absolute inset-0 -z-10 overflow-hidden">
      <Image
        src="/images/elimane dev.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-110 object-cover opacity-[0.45] blur-2xl"
      />
      <div className="absolute inset-0 bg-background/60" />
      <AuroraMesh />
      <div
        className="animate-grid-pan absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123,133,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(123,133,255,0.14) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)",
        }}
      />
      <ParticleField density={70} />
      <FloatingLights />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
