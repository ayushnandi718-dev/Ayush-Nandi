"use client";

import React, { useState } from "react";
import { Check, Link2, Linkedin, MessageCircle, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_BTN =
  "flex items-center gap-2 px-3.5 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-[hsl(20,100%,70%)] hover:border-[hsl(20,100%,70%)]/40 transition-all bg-card/30";

export function ShareBar({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : `https://ayushapd.dpdns.org/blogs/${slug}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const text = encodeURIComponent(`${title} — Ayush Nandi`);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button onClick={copy} className={cn(ICON_BTN)}>
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
        {copied ? "Copied" : "Copy link"}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={ICON_BTN}
      >
        <Twitter className="w-4 h-4" />
        Post
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={ICON_BTN}
      >
        <Linkedin className="w-4 h-4" />
        Share
      </a>
      <a
        href={`https://wa.me/?text=${text}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={ICON_BTN}
      >
        <MessageCircle className="w-4 h-4" />
        WhatsApp
      </a>
    </div>
  );
}
