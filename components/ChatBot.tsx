"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import Image from "next/image";
import { profile } from "@/lib/data";
import { faq, findFaqAnswer } from "@/lib/chatbotFaq";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
};

const GREETING =
  "Salut 👋 Je suis l'assistant d'Elimane. Pose-moi une question sur son parcours, ses projets ou ses services — ou choisis un sujet ci-dessous.";

const FALLBACK =
  "Je n'ai pas de réponse toute faite pour ça 🙂 Essaie l'un des sujets ci-dessous, ou écris directement à Elimane via le formulaire de contact.";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

export function ChatBot() {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: nextId(), role: "bot", text: GREETING }]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  function respond(userText: string, matchedId?: string) {
    setMessages((prev) => [...prev, { id: nextId(), role: "user", text: userText }]);
    setIsTyping(true);

    const match = matchedId
      ? faq.find((f) => f.id === matchedId)
      : findFaqAnswer(userText);

    setTimeout(
      () => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "bot", text: match ? match.answer : FALLBACK },
        ]);
        if (match) setAskedIds((prev) => Array.from(new Set([...prev, match.id])));
      },
      500 + Math.random() * 400
    );
  }

  function handleQuickReply(id: string, question: string) {
    respond(question, id);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    respond(trimmed);
    setInput("");
  }

  const remainingFaq = faq.filter((f) => !askedIds.includes(f.id));

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-electric text-white shadow-[0_0_30px_rgba(79,93,255,0.55)] transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
        whileTap={{ scale: 0.92 }}
      >
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-accent-electric/40"
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <X size={22} aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle size={22} aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24, scale: 0.95 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Assistant conversationnel"
            className="glass-panel fixed bottom-24 right-5 z-[60] flex h-[30rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-border/70 shadow-2xl shadow-black/40 sm:bottom-28 sm:right-7"
          >
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-accent/40">
                <Image src="/images/Elimane.png" alt={profile.name} fill sizes="36px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  Assistant de {profile.name}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                  En ligne
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "rounded-br-sm bg-accent text-white"
                        : "rounded-bl-sm border border-border/70 bg-surface text-foreground/90"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border/70 bg-surface px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-muted"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {!isTyping && remainingFaq.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {remainingFaq.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => handleQuickReply(f.id, f.question)}
                      className="inline-flex items-center gap-1 rounded-full border border-border/70 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent-electric/50 hover:text-accent-electric"
                    >
                      <Sparkles size={11} aria-hidden />
                      {f.question}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border/60 p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écris ta question…"
                className="min-w-0 flex-1 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-foreground outline-none transition-all focus:border-accent-electric focus:shadow-[0_0_0_3px_rgba(94,234,255,0.15)]"
              />
              <button
                type="submit"
                aria-label="Envoyer"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-bright"
              >
                <Send size={15} aria-hidden />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
