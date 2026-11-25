"use client";

import React from "react";
import SocialMediaButtons from "../social/social-media-icons";
import { config } from "@/data/config";
import { content } from "@/data/content";
import Link from "next/link";

function Footer({ year }: { year?: number }) {
  const { footer } = content;

  return (
    <footer className="flex w-full shrink-0 flex-col gap-6 border-t border-border px-4 py-8 md:px-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-2">
        <p className="text-lg font-display font-bold text-foreground">{footer.name}</p>
        <p className="text-sm font-medium text-foreground/80">{footer.role}</p>
        <p className="text-sm text-muted-foreground">{footer.stackLine}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-sm text-muted-foreground">
          {footer.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{footer.location}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>© {year} {config.author}. All rights reserved.</span>
          <Link
            href="/privacy"
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
      <SocialMediaButtons />
    </footer>
  );
}

export default Footer;
