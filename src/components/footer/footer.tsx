"use client";

import React from "react";
import SocialMediaButtons from "../social/social-media-icons";
import { config } from "@/data/config";
import Link from "next/link";

function Footer({ year }: { year?: number }) {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-3 border-t border-border px-4 py-6 sm:flex-row md:px-6 sm:justify-between">
      <div className="flex flex-col items-center gap-2 sm:items-start">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {year} {config.author}. All rights reserved.
        </p>
        <Link
          href="/privacy"
          className="text-xs text-gray-500 dark:text-gray-400 underline underline-offset-2 hover:text-foreground transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
      <SocialMediaButtons />
    </footer>
  );
}

export default Footer;
