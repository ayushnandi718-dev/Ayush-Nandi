import React from "react";
import Image from "next/image";
import { ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react";

const LINKS = [
  { href: "https://github.com/ayushnandi718-dev", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/ayush-nandi-apdj-india/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://instagram.com/rva.creates/", icon: Instagram, label: "Instagram" },
];

export function AuthorBio() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-border/50 rounded-2xl p-6 bg-card/20 backdrop-blur-sm">
      <div className="w-16 h-16 rounded-full shrink-0 overflow-hidden border-2 border-[hsl(20,100%,70%)]/30 bg-gradient-to-br from-[hsl(20,100%,70%)] to-[hsl(20,100%,40%)]">
        <Image
          src="/assets/me.jpg"
          alt="Ayush Nandi"
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="font-display text-lg">Ayush Nandi</p>
        <p className="text-muted-foreground text-sm leading-relaxed mt-1 font-sans">
          Building beautiful things on the internet. I write about design, code, and the
          occasional 2 AM debugging session.
        </p>
      </div>
      <div className="flex gap-2">
        {LINKS.map(({ href, icon: Icon, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-border/50 text-muted-foreground hover:text-[hsl(20,100%,70%)] hover:border-[hsl(20,100%,70%)]/40 transition-all text-sm"
          >
            <Icon className="w-4 h-4" />
            {label}
            <ArrowUpRight className="w-3 h-3" />
          </a>
        ))}
      </div>
    </div>
  );
}
