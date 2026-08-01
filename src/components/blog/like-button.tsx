"use client";

import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function LikeButton({ slug }: { slug: string }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const likedKey = `blog:liked:${slug}`;
    const countKey = `blog:likes:${slug}`;
    setLiked(localStorage.getItem(likedKey) === "1");
    const stored = parseInt(localStorage.getItem(countKey) || "0", 10);
    if (Number.isFinite(stored)) setCount(stored);
  }, [slug]);

  function toggle() {
    const likedKey = `blog:liked:${slug}`;
    const countKey = `blog:likes:${slug}`;
    const next = !liked;
    const base = parseInt(localStorage.getItem(countKey) || "0", 10) || 0;
    const nextCount = next ? base + 1 : Math.max(0, base - 1);
    localStorage.setItem(likedKey, next ? "1" : "0");
    localStorage.setItem(countKey, String(nextCount));
    setLiked(next);
    setCount(nextCount);
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        "flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm transition-all",
        liked
          ? "border-[hsl(20,100%,70%)]/40 text-[hsl(20,100%,70%)] bg-[hsl(20,100%,70%)]/10"
          : "border-border/50 text-muted-foreground hover:text-[hsl(20,100%,70%)] hover:border-[hsl(20,100%,70%)]/40 bg-card/30"
      )}
    >
      <Heart className={cn("w-4 h-4", liked && "fill-current")} />
      {count}
    </button>
  );
}
