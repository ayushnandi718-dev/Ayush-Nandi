"use client";

import { motion, AnimatePresence } from "motion/react";
import { useConsent } from "@/hooks/use-consent";
import Link from "next/link";

/**
 * Non-intrusive cookie / advertising consent banner. Shown once until the
 * visitor makes a choice. Uses the site's design tokens so it works in both
 * dark and light mode, and populates the consent flag used by the ad slots.
 */
const CookieConsentBanner = () => {
  const { consent, accept, decline } = useConsent();
  const show = consent === null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 inset-x-4 z-[100] mx-auto max-w-xl rounded-xl border border-border bg-background/95 p-5 shadow-xl backdrop-blur-md"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <p className="text-sm text-muted-foreground mb-4">
            This site may use cookies and advertising to personalize content and
            measure performance. Read our{" "}
            <Link
              href="/privacy"
              className="text-primary underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={decline}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={accept}
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
