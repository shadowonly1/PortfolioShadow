import { profile } from "@/lib/data";
import { Container } from "./Container";

const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Behance", href: profile.behance },
  { label: "Instagram", href: profile.instagram },
  { label: "X", href: profile.twitter },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t pt-12">
      <Container>
        <div className="grid gap-8 font-mono text-label uppercase text-muted sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1">
            <span className="text-foreground">{profile.name}</span>
            <span>Full-Stack Developer</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-foreground">{profile.location}</span>
            <span>14.69° N / 17.44° W</span>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 lg:col-span-2 lg:justify-end">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline pb-0.5 text-foreground">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <p
        aria-hidden
        className="mt-10 select-none whitespace-nowrap text-center font-display text-[23vw] uppercase leading-[0.75] text-foreground/[0.06]"
      >
        {profile.name}
      </p>

      <Container className="flex flex-wrap items-center justify-between gap-2 border-t pb-24 pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="text-muted/50">{profile.alias}</span>
        <a href="#main-content" className="text-foreground">
          Back to top ↑
        </a>
      </Container>
    </footer>
  );
}
