import { Home } from "lucide-react";
import Link from "next/link";
import AuroraMesh from "@/components/backgrounds/AuroraMesh";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div aria-hidden className="noise-overlay absolute inset-0 -z-10">
        <AuroraMesh />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <Container className="flex flex-col items-center text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-electric">
          Erreur 404
        </p>
        <h1 className="text-glow mt-4 font-display text-7xl font-bold tracking-tight text-foreground sm:text-8xl">
          404
        </h1>
        <p className="mt-4 max-w-md font-mono text-sm text-muted">
          {"// TODO: cette page n'existe pas encore.\n// return <NotFound />;"}
        </p>
        <p className="mt-2 max-w-md text-base text-muted">
          La page que tu cherches a probablement été déplacée, supprimée, ou n&apos;a jamais existé.
        </p>

        <Link
          href="/"
          className="group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(79,93,255,0.55)] transition-all hover:scale-105 hover:bg-accent-bright"
        >
          <Home size={16} aria-hidden />
          Retour à l&apos;accueil
        </Link>
      </Container>
    </section>
  );
}
