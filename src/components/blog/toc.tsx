"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ListTree } from "lucide-react";
import type { TocItem } from "@/lib/blog-utils";

export function TocList({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;
    const ids = items.map((i) => i.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "text-sm py-1 border-l border-border/50 pl-3 transition-all duration-200 hover:text-[hsl(20,100%,70%)] hover:border-[hsl(20,100%,70%)]/50",
            item.level === 3 && "pl-7",
            activeId === item.id
              ? "text-[hsl(20,100%,70%)] border-[hsl(20,100%,70%)] font-medium"
              : "text-muted-foreground"
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}

export function TableOfContents({ items, title = "Contents" }: { items: TocItem[]; title?: string }) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-[hsl(20,100%,70%)]">
        <ListTree className="w-4 h-4" />
        {title}
      </div>
      <TocList items={items} />
    </div>
  );
}

export function MobileToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden lg:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-muted-foreground hover:text-[hsl(20,100%,70%)] transition-colors bg-card/30"
      >
        <span className="flex items-center gap-2 font-medium">
          <ListTree className="w-4 h-4 text-[hsl(20,100%,70%)]" />
          Contents
        </span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-4 pb-4">
          <TocList items={items} />
        </div>
      )}
    </div>
  );
}
