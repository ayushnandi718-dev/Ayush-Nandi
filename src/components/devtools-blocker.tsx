"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function DevToolsBlocker() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isBlockedPage = pathname === "/devtools-blocked";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12") { e.preventDefault(); return; }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["I","i","J","j","C","c"].includes(e.key)) { e.preventDefault(); return; }
      if ((e.ctrlKey || e.metaKey) && e.key.toUpperCase() === "U") { e.preventDefault(); return; }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) { e.preventDefault(); return; }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    let blocked = false;
    let checkCount = 0;

    const detectDevTools = () => {
      const threshold = 100;
      const width差 = window.outerWidth - window.innerWidth;
      const height差 = window.outerHeight - window.innerHeight;

      const isOpen = width差 > threshold || height差 > threshold;

      if (isOpen) {
        if (!isBlockedPage && !blocked) {
          blocked = true;
          window.location.replace("/devtools-blocked");
        }
        return;
      }

      if (isBlockedPage && !isOpen && checkCount > 2) {
        window.location.replace("/");
      }

      checkCount++;
    };

    const onKeyDownGlobal = (e: KeyboardEvent) => {
      if (e.key === "F12" || e.key === "F11") {
        setTimeout(detectDevTools, 50);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keydown", onKeyDownGlobal);
    window.addEventListener("contextmenu", onContextMenu);

    detectDevTools();
    const interval = setInterval(detectDevTools, 300);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keydown", onKeyDownGlobal);
      window.removeEventListener("contextmenu", onContextMenu);
      clearInterval(interval);
    };
  }, [router, pathname]);

  return null;
}
