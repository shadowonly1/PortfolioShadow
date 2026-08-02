"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";
import { profile } from "@/lib/data";
import SectionGlow from "./backgrounds/SectionGlow";
import { Container } from "./Container";
import { FloatingInput, FloatingTextarea } from "./FloatingField";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { SectionNumberBg } from "./SectionNumberBg";

type Status = "idle" | "submitting" | "success" | "error";

const FORMSUBMIT_EMAIL = "elimaneba3@gmail.com";

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

    if (!name || !email || !message) {
      setStatus("error");
      setError("Merci de remplir tous les champs avant d'envoyer.");
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
    <section id="contact" className="relative overflow-hidden border-t border-border/60 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/images/shad.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>
      <SectionGlow color="rgba(123, 133, 255, 0.2)" position="center" />
      <SectionNumberBg number="08" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(94,234,255,0.08), transparent 70%)",
        }}
      />

      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-accent-electric/40 shadow-[0_0_20px_rgba(94,234,255,0.25)]">
              <Image
                src="/images/Elimane.png"
                alt={profile.name}
                fill
                sizes="56px"
                className="object-cover object-top"
              />
            </div>
            <SectionHeading
              eyebrow="08 — Contact"
              title="Entrons en studio"
              description="Basé à Dakar, disponible pour des missions à distance ou sur site — une idée, un brief, un projet à cadrer ensemble."
            />
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent-electric"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent-electric/50 group-hover:bg-accent-electric/10">
                <Mail size={15} aria-hidden />
              </span>
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent-electric"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent-electric/50 group-hover:bg-accent-electric/10">
                <Phone size={15} aria-hidden />
              </span>
              {profile.phone}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent-electric"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent-electric/50 group-hover:bg-accent-electric/10">
                <Linkedin size={15} aria-hidden />
              </span>
              LinkedIn
            </a>
            <p className="flex items-center gap-3 text-sm text-muted">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
                <MapPin size={15} aria-hidden />
              </span>
              {profile.location}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass-panel relative flex flex-col gap-5 overflow-hidden rounded-2xl p-6 sm:p-8"
          >
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-panel absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                  >
                    <CheckCircle2 size={44} className="text-accent-electric" aria-hidden />
                  </motion.div>
                  <p className="font-display text-lg font-semibold text-foreground">
                    Message envoyé
                  </p>
                  <p className="max-w-xs text-sm text-muted">
                    Merci — je reviens vers vous rapidement.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-xs font-medium text-accent-electric underline-offset-4 hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <FloatingInput id="name" name="name" label="Nom" type="text" autoComplete="name" required />
            <FloatingInput id="email" name="email" label="Email" type="email" autoComplete="email" required />
            <FloatingInput id="subject" name="subject" label="Sujet" type="text" autoComplete="off" />
            <FloatingTextarea id="message" name="message" label="Message" rows={5} required />

            {status === "error" && error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(79,93,255,0.45)] transition-colors hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{status === "submitting" ? "Envoi..." : "Envoyer le message"}</span>
              <Send size={16} aria-hidden className="relative" />
            </button>
          </form>
        </ScrollReveal>
      </Container>
    </section>
  );
}
