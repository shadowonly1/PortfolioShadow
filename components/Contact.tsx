"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/data";
import { BackgroundType } from "./BackgroundType";
import { Container } from "./Container";
import { FloatingInput, FloatingTextarea } from "./FloatingField";
import { EASE, Hairline, Plus, Reveal, RevealText } from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

const FORMSUBMIT_EMAIL = "elimaneba3@gmail.com";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false },
  { label: "LinkedIn", value: "in/elimane-ba", href: profile.linkedin, external: true },
  { label: "GitHub", value: "shadowonly1", href: profile.github, external: true },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}`, external: false },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    // Honeypot : un humain ne voit pas ce champ, un bot le remplit.
    if (String(data.get("_honey") || "")) {
      setStatus("success");
      form.reset();
      return;
    }

    if (!name || !email || !message) {
      setStatus("error");
      setError("Merci de remplir le nom, l'email et le message avant d'envoyer.");
      return;
    }

    setStatus("submitting");
    try {
      const payload = new FormData();
      payload.append("name", name);
      payload.append("email", email);
      payload.append("subject", subject || "Nouveau message via le portfolio");
      payload.append("message", message);
      payload.append("_subject", `Portfolio — message de ${name}`);
      payload.append("_template", "box");
      payload.append("_captcha", "false");
      payload.append("_honey", "");

      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      if (!response.ok) throw new Error("Envoi échoué");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Une erreur est survenue. Réessaie ou écris directement par email.");
    }
  }

  return (
    <section id="contact" className="section overflow-hidden pb-16 sm:pb-20">
      <BackgroundType word="Contact" className="top-20 text-[36vw]" outline drift={100} />
      <Container>
        <div className="flex items-center gap-4">
          <span className="label whitespace-nowrap">
            <span className="text-foreground">09</span> / Contact
          </span>
          <Hairline className="flex-1" />
          <Plus />
        </div>

        <RevealText
          lines={["Let's build", <span key="s">something<span className="text-accent">.</span></span>]}
          className="display mt-12 text-display-xl sm:mt-16"
        />

        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <p className="label flex items-center gap-3 text-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-pulse-glow" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for projects — {profile.location}
          </p>
          <a
            href={`mailto:${profile.email}`}
            data-cursor="Mail"
            className="group inline-flex items-center gap-3 bg-foreground px-7 py-4 font-mono text-label uppercase text-background transition-colors duration-500 hover:bg-accent hover:text-white"
          >
            Get in touch
            <span aria-hidden className="transition-transform duration-500 ease-editorial group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>

        <div className="mt-20 grid gap-16 sm:mt-28 lg:grid-cols-12 lg:gap-8">
          <ul className="border-t lg:col-span-6">
            {channels.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 0.06} className="border-b">
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group grid grid-cols-12 items-baseline gap-3 py-6"
                >
                  <span className="label col-span-3 sm:col-span-2">{c.label}</span>
                  <span className="col-span-8 break-all font-display text-[clamp(1.75rem,4vw,3rem)] uppercase leading-none transition-transform duration-700 ease-editorial group-hover:translate-x-2 sm:col-span-9">
                    {c.value}
                  </span>
                  <span
                    aria-hidden
                    className="col-span-1 text-right text-muted transition-all duration-500 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-soft"
                  >
                    ↗
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="label mb-4 text-foreground">Ou écris-moi ici</p>
            <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-6">
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    role="status"
                    className="absolute inset-0 z-10 flex flex-col items-start justify-center gap-4 bg-background"
                  >
                    <p className="display text-display-sm">
                      Message envoyé<span className="text-accent">.</span>
                    </p>
                    <p className="text-sm text-muted">Merci — je reviens vers toi rapidement.</p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="link-underline pb-1 font-mono text-label uppercase text-foreground"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="_honey">Ne pas remplir</label>
                <input id="_honey" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <FloatingInput id="name" name="name" label="Nom" type="text" autoComplete="name" required />
                <FloatingInput id="email" name="email" label="Email" type="email" autoComplete="email" required />
              </div>
              <FloatingInput id="subject" name="subject" label="Sujet" type="text" autoComplete="off" />
              <FloatingTextarea id="message" name="message" label="Message" rows={4} required />

              {status === "error" && error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group mt-2 flex items-center justify-between border-b border-foreground pb-3 font-display text-3xl uppercase text-foreground transition-colors duration-500 hover:border-accent hover:text-accent-soft disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "submitting" ? "Envoi…" : "Envoyer le message"}
                <span aria-hidden className="transition-transform duration-500 ease-editorial group-hover:translate-x-2">
                  →
                </span>
              </button>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
