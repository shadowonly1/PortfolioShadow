import Image from "next/image";
import type { Project } from "@/lib/data";
import type { ProjectCover } from "@/lib/editorial";

/**
 * Scène commune à toutes les couvertures de projet : fond sombre, grille fine,
 * halo indigo discret. Seul le cadre change (téléphones, navigateur, logo, typo).
 */
export function ProjectCoverStage({ project, cover }: { project: Project; cover: ProjectCover }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-surface">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgb(var(--accent) / 0.16), transparent 70%)" }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-6 transition-transform duration-1000 ease-editorial group-hover:scale-[1.03] sm:p-10">
        {cover.kind === "phones" && <Phones project={project} images={cover.images} />}
        {cover.kind === "browser" && <Browser project={project} src={cover.images[0]} />}
        {cover.kind === "logo" && (
          <div className="relative aspect-square w-3/5 max-w-xs overflow-hidden rounded-2xl border border-line/10 shadow-2xl shadow-black/60">
            <Image src={cover.images[0]} alt={project.imageAlt} fill sizes="320px" className="object-cover" />
          </div>
        )}
        {cover.kind === "type" && <TypeCover project={project} />}
      </div>
    </div>
  );
}

function Phones({ project, images }: { project: Project; images: string[] }) {
  return (
    <div className="flex h-full items-center justify-center gap-4 sm:gap-6">
      {images.slice(0, 2).map((src, i) => (
        <div
          key={src}
          className={`relative aspect-[9/19] h-[82%] overflow-hidden rounded-[1.6rem] border border-line/15 bg-black p-1 shadow-2xl shadow-black/60 ${
            i === 1 ? "translate-y-6" : "-translate-y-2"
          }`}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[1.3rem]">
            <Image
              src={src}
              alt={i === 0 ? project.imageAlt : `${project.name} — écran ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 14vw, 40vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Browser({ project, src }: { project: Project; src: string }) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-line/15 bg-surfaceRaised shadow-2xl shadow-black/60">
      <div aria-hidden className="flex h-6 items-center gap-1.5 border-b border-line/10 px-3">
        <span className="h-2 w-2 rounded-full bg-line/20" />
        <span className="h-2 w-2 rounded-full bg-line/20" />
        <span className="h-2 w-2 rounded-full bg-line/20" />
      </div>
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={src}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function TypeCover({ project }: { project: Project }) {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <span className="label">{project.role}</span>
      <p aria-hidden className="display text-[clamp(3rem,8vw,8rem)] leading-[0.82] text-foreground/90">
        {project.name.split(" (")[0]}
      </p>
      <span className="label text-accent-soft">{project.stack.join(" · ")}</span>
    </div>
  );
}
