import React from "react";
import { cn } from "@/lib/utils";

function hashString(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GRADIENTS = [
  ["#0f172a", "#1e1b4b", "#7c2d12", "#f97316"],
  ["#020617", "#172554", "#4c1d95", "#f59e0b"],
  ["#0c0a1d", "#1e1b4b", "#14532d", "#fb923c"],
  ["#0b1026", "#312e81", "#831843", "#fbbf24"],
  ["#09090b", "#1c1917", "#3b0764", "#f97316"],
];

export function Cover({
  slug,
  className,
  compact = false,
}: {
  slug: string;
  className?: string;
  compact?: boolean;
}) {
  const seed = hashString(slug || "cover");
  const rand = mulberry32(seed);
  const [c1, c2, c3, accent] = GRADIENTS[seed % GRADIENTS.length];

  const stars = Array.from({ length: compact ? 24 : 60 }, () => {
    const x = rand();
    const y = rand();
    const r = 0.4 + rand() * 1.4;
    const o = 0.25 + rand() * 0.6;
    return { x: Math.round(x * 1000) / 10, y: Math.round(y * 1000) / 10, r: Math.round(r * 100) / 100, o };
  });

  const glowX = Math.round(20 + rand() * 60);
  const glowY = Math.round(15 + rand() * 60);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border/50",
        compact ? "h-28" : "h-56 md:h-72",
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)`,
      }}
    >
      <div
        className="absolute rounded-full blur-[80px] opacity-40 pointer-events-none"
        style={{
          width: compact ? "40%" : "55%",
          aspectRatio: "1",
          left: `${glowX}%`,
          top: `${glowY}%`,
          background: accent,
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <rect width="100" height="100" fill="none" />
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o} />
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  );
}
