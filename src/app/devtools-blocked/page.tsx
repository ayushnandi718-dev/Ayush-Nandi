"use client";

import { useEffect } from "react";

export default function DevToolsBlocked() {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12") { e.preventDefault(); return; }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["I","i","J","j","C","c"].includes(e.key)) { e.preventDefault(); return; }
      if ((e.ctrlKey || e.metaKey) && e.key.toUpperCase() === "U") { e.preventDefault(); return; }
    };
    const onContextMenu = (e: MouseEvent) => { e.preventDefault(); };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("contextmenu", onContextMenu);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("contextmenu", onContextMenu);
    };
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white select-none">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg text-gray-400 mb-2">
          Developer tools are not allowed on this site.
        </p>
        <p className="text-sm text-gray-600">
          Close DevTools to continue browsing.
        </p>
      </div>
    </div>
  );
}
