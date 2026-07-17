"use client";

import { useEffect } from "react";

export default function DevToolsBlocker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12") { e.preventDefault(); return; }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["I","i","J","j","C","c"].includes(e.key)) { e.preventDefault(); return; }
      if ((e.ctrlKey || e.metaKey) && e.key.toUpperCase() === "U") { e.preventDefault(); return; }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("contextmenu", onContextMenu);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("contextmenu", onContextMenu);
    };
  }, []);

  return null;
}
