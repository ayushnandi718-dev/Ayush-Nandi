"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Send } from "lucide-react";

const NEWSLETTER_EMAIL = "ayushnandi718.dev@gmail.com";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    const subject = encodeURIComponent("Newsletter subscription request");
    const body = encodeURIComponent(
      `Hey Ayush,\n\nPlease add ${email.trim()} to your newsletter list.\n\nThanks!`
    );
    window.location.href = `mailto:${NEWSLETTER_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="border border-border/50 rounded-2xl p-6 md:p-8 bg-card/20 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2 text-xs font-medium tracking-[0.2em] uppercase text-[hsl(20,100%,70%)]">
        <Send className="w-4 h-4" />
        Newsletter
      </div>
      <h3 className="font-display text-xl mb-2">Get new posts in your inbox</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-sans">
        No spam. Just a short email whenever I publish something worth reading.
      </p>

      {sent ? (
        <div className="flex items-center gap-3 text-sm text-[hsl(20,100%,70%)] font-sans">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          Opening your email app to finish subscribing…
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 rounded-full bg-muted/30 border border-border/50 focus:outline-none focus:border-[hsl(20,100%,70%)]/50 text-sm font-sans placeholder:text-muted-foreground/50"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[hsl(20,100%,70%)] text-background font-medium text-sm hover:bg-[hsl(20,100%,80%)] transition-colors"
          >
            Subscribe
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
