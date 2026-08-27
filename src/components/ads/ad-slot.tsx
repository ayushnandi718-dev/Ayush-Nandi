"use client";

import { useEffect, useRef } from "react";
import { config } from "@/data/config";
import { useConsent } from "@/hooks/use-consent";

/**
 * A single, tasteful Google AdSense ad unit.
 *
 * Rendering is fully gated by BOTH `config.ads.enabled` AND the visitor's
 * explicit consent (via `useConsent`). While either is false (the default until
 * the account is approved and a visitor accepts), this component renders
 * nothing — so you can place it anywhere without ads showing prematurely.
 *
 * The Google `adsbygoogle.js` script is loaded once in the root layout. Each
 * rendered slot declares an `<ins class="adsbygoogle">` block and pushes it via
 * `(adsbygoogle = window.adsbygoogle || []).push({})`.
 */
export const AdSlot = ({
  layoutKey,
  className,
}: {
  /** Optional custom Google "layout" key for a specific ad unit format. */
  layoutKey?: string;
  className?: string;
}) => {
  const { consent } = useConsent();
  const renderedRef = useRef(false);
  const shouldRender =
    config.ads.enabled && consent === "accepted";

  useEffect(() => {
    if (!shouldRender) return;
    if (renderedRef.current) return;
    renderedRef.current = true;

    try {
      const w = window as unknown as {
        adsbygoogle?: Array<unknown>;
      };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      // Ignore ad-network errors; the slot simply stays empty.
    }
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      className={"flex min-h-[100px] w-full items-center justify-center overflow-hidden " + (className ?? "")}
      data-ads-slot
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={config.ads.publisherId}
        data-ad-slot={config.ads.adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
      />
    </div>
  );
};

export default AdSlot;
