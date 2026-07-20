import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { profile } from "@/lib/data";
import { Container } from "./Container";

export function SubpageHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-tight text-foreground"
        >
          {profile.name}
        </Link>
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-electric"
        >
          <ArrowLeft
            size={15}
            className="transition-transform group-hover:-translate-x-1"
            aria-hidden
          />
          Retour aux projets
        </Link>
      </Container>
    </header>
  );
}
