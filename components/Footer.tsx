import { profile } from "@/lib/data";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <Container className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. Tous droits réservés.
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted/60">
          {profile.alias}
        </p>
      </Container>
    </footer>
  );
}
