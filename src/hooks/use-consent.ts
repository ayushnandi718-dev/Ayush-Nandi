"use client";

import { useEffect, useState, useCallback } from "react";
import { config } from "@/data/config";

export type Consent = "accepted" | "declined" | null;

/**
 * Reads the stored visitor consent decision. `null` means the visitor has not
 * decided yet (the consent banner should be shown).
 */
function readConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(config.consentStorageKey);
    if (raw === "accepted" || raw === "declined") return raw;
  } catch {
    // localStorage unavailable — treat as undecided.
  }
  return null;
}

/**
 * Tracks the visitor's consent to personalized advertising / cookies.
 * Ad slots should only render once consent has been explicitly accepted.
 */
export function useConsent() {
  const [consent, setConsent] = useState<Consent>(() =>
    typeof window === "undefined" ? null : readConsent(),
  );

  useEffect(() => {
    // Keep the stored value in sync if it changes in another tab.
    const onStorage = (e: StorageEvent) => {
      if (e.key === config.consentStorageKey) setConsent(readConsent());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const accept = useCallback(() => {
    try {
      window.localStorage.setItem(config.consentStorageKey, "accepted");
    } catch {
      /* ignore */
    }
    setConsent("accepted");
  }, []);

  const decline = useCallback(() => {
    try {
      window.localStorage.setItem(config.consentStorageKey, "declined");
    } catch {
      /* ignore */
    }
    setConsent("declined");
  }, []);

  return { consent, accept, decline };
}
