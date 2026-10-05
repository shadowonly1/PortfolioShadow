"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import Image from "next/image";
import { profile } from "@/lib/data";
import { buildFaq, findFaqAnswer } from "@/lib/chatbotFaq";
import { getDictionary } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
};

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

export function ChatBot({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).chat;
  const [faq] = useState(() => buildFaq(lang));
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [pastHero, setPastHero] = useState(false);

  // Le bouton n'apparaît qu'après le hero pour ne pas couvrir sa composition.
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: nextId(), role: "bot", text: t.greeting }]);
    }
  }, [open, messages.length, t.greeting]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  function respond(userText: string, matchedId?: string) {
    setMessages((prev) => [...prev, { id: nextId(), role: "user", text: userText }]);
    setIsTyping(true);

    const match = matchedId
      ? faq.find((f) => f.id === matchedId)
      : findFaqAnswer(faq, lang, userText);

    setTimeout(
      () => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "bot", text: match ? match.answer : t.fallback },
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
        ref={toggleRef}
        type="button"
        tabIndex={pastHero || open ? 0 : -1}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-[60] flex h-12 items-center gap-2 rounded-full border border-line/15 bg-background/80 px-4 font-mono text-label uppercase text-foreground backdrop-blur-md transition-[opacity,transform,border-color] duration-500 hover:border-line/40 sm:bottom-7 sm:right-7 ${
          pastHero || open ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        whileTap={{ scale: 0.92 }}
      >
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
              <X size={16} aria-hidden />
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
              <span className="flex items-center gap-2">
                <MessageCircle size={15} aria-hidden />
                {t.button}
              </span>
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
            aria-label={t.dialog}
            className="glass-panel fixed bottom-24 right-5 z-[60] flex h-[30rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-border/70 shadow-2xl shadow-black/40 sm:bottom-28 sm:right-7"
          >
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-accent/40">
                <Image src="/images/Elimane.png" alt={profile.name} fill sizes="36px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {t.title(profile.name)}
                </p>
                <p className="text-xs text-muted">{t.sub}</p>
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
                        ? "rounded-br-sm bg-accent text-accent-ink"
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
                ref={inputRef}
                type="text"
                aria-label={t.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                className="min-w-0 flex-1 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-foreground outline-none transition-all focus:border-accent-electric focus:shadow-[0_0_0_3px_rgb(var(--accent)/0.25)]"
              />
              <button
                type="submit"
                aria-label={t.send}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink transition-colors hover:opacity-90"
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
