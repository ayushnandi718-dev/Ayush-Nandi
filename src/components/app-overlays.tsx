"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Particles from "@/components/Particles";
import RemoteCursors from "@/components/realtime/remote-cursors";
import EasterEggs from "@/components/easter-eggs";
import ElasticCursor from "@/components/ui/ElasticCursor";
import RadialMenu from "@/components/radial-menu/index";
import MotionNudge from "@/components/motion-nudge";
import FloatingAvatars from "@/components/floating-avatars";
import Astronaut3D from "@/components/astronaut-3d";
import { usePerfProfile } from "@/hooks/use-perf-profile";

export default function AppOverlays() {
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => setMounted(true), []);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  const { particleCount, maxDpr, disableDecorative } = usePerfProfile();

  const themeReady =
    (resolvedTheme === "dark" || theme === "dark") &&
    (resolvedTheme !== undefined || theme !== undefined);

  return (
    <>
      {particleCount > 0 && (
        <Particles
          className="fixed inset-0 -z-10 animate-fade-in"
          quantity={particleCount}
          maxDpr={maxDpr}
        />
      )}
      {isHome && (mounted ? isDark : themeReady) && <Astronaut3D />}
      {isHome && <RemoteCursors />}
      {isHome && <FloatingAvatars />}
      <EasterEggs />
      {!disableDecorative && <ElasticCursor />}
      {isHome && <RadialMenu />}
      {isHome && <MotionNudge />}
    </>
  );
}
