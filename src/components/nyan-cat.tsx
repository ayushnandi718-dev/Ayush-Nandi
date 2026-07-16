"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback, useRef } from "react";

export function spawnNyanCat(intensity: number = 1) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("nyan-spawn", { detail: { intensity } }));
}

const NyanCat = () => {
  const [cats, setCats] = useState<
    { id: string; speed: number; scale: number; y: string }[]
  >([]);

  const spawnCat = useCallback((intensity: number) => {
    const count = Math.min(Math.ceil(intensity * 2), 5);
    const newCats = Array.from({ length: count }, () => ({
      id: (Math.random() * 100000).toFixed(),
      speed: Math.max(1, 5 - intensity * 1.5),
      scale: 0.6 + intensity * 0.5,
      y: `${Math.random() * 80 + 5}vh`,
    }));
    setCats((prev) => [...prev, ...newCats]);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      spawnCat(detail?.intensity ?? 1);
    };
    window.addEventListener("nyan-spawn", handler);
    return () => window.removeEventListener("nyan-spawn", handler);
  }, [spawnCat]);

  return (
    <div className="fixed left-0 top-0 w-screen h-screen overflow-hidden pointer-events-none z-[-1]">
      {cats.map((cat) => (
        <AnimatedCat
          key={cat.id}
          speed={cat.speed}
          scale={cat.scale}
          y={cat.y}
          onCompleted={() => {
            setCats((prev) => prev.filter((c) => c.id !== cat.id));
          }}
        />
      ))}
    </div>
  );
};

const AnimatedCat = ({
  speed,
  scale,
  y,
  onCompleted,
}: {
  speed: number;
  scale: number;
  y: string;
  onCompleted: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const start = performance.now();
    const startX = -80;
    const endX = window.innerWidth + 80;
    const totalMs = speed * 1000;

    let raf: number;
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / totalMs, 1);
      const x = startX + (endX - startX) * progress;
      el.style.transform = `translateX(${x}px) scale(${scale})`;

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        onCompleted();
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [speed, scale, onCompleted]);

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none"
      style={{ top: y, left: 0, willChange: "transform" }}
    >
      <img
        src="/assets/nyan-cat.gif"
        className={cn("z-10 h-40 w-auto pointer-events-none")}
        alt=""
      />
    </div>
  );
};

export default NyanCat;
