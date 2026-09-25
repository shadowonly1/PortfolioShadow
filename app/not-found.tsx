import Link from "next/link";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header base="/" />
      <main id="main-content" className="relative flex min-h-[100svh] items-center overflow-hidden">
        <p
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[48vw] leading-none text-outline"
        >
          404
        </p>
        <Container className="relative">
          <p className="label">Erreur 404 / Page introuvable</p>
          <h1 className="display mt-6 text-display-lg">
            Lost in
            <br />
            the grid<span className="text-accent">.</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-muted">
            La page que tu cherches a été déplacée, supprimée, ou n&apos;a jamais existé.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-3 bg-foreground px-7 py-4 font-mono text-label uppercase text-background transition-colors duration-500 hover:bg-accent hover:text-white"
          >
            ← Retour à l&apos;accueil
          </Link>
        </Container>
      </main>
    </>
  );
}
