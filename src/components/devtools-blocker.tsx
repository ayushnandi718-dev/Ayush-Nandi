"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const BLOCKED_KEYS = new Set([
  "F12",
  "I",
  "J",
  "U",
  "S",
]);

function isModified(e: KeyboardEvent): boolean {
  return e.ctrlKey || e.metaKey || e.altKey;
}

export default function DevToolsBlocker() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (isModified(e) && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j")) {
        e.preventDefault();
        return;
      }

      if (isModified(e) && e.key === "U") {
        e.preventDefault();
        return;
      }

      if (e.key === "F12") {
        e.preventDefault();
        return;
      }

      if (isModified(e) && e.key === "Shift") {
        e.preventDefault();
        return;
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    let devToolsOpen = false;
    let interval: ReturnType<typeof setInterval>;

    const detectDevTools = () => {
      const threshold = 160;
      const widthCheck = window.outerWidth - window.innerWidth > threshold;
      const heightCheck = window.outerHeight - window.innerHeight > threshold;

      if ((widthCheck || heightCheck) && !devToolsOpen) {
        devToolsOpen = true;
        router.replace("/devtools-blocked");
      }
    };

    const onResize = () => {
      detectDevTools();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("resize", onResize);

    interval = setInterval(detectDevTools, 1000);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("resize", onResize);
      clearInterval(interval);
    };
  }, [router]);

  return null;
}
