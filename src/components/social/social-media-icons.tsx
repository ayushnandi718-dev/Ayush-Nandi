"use client";

import { useInView } from "motion/react";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { SiGithub, SiInstagram, SiLinkedin, SiX, SiLinktree } from "react-icons/si";
import { NotebookPen } from "lucide-react";
import { config } from "@/data/config";
import Link from "next/link";

const LINKTREE_URL = "https://tr.ee/hlSnMu";

const BUTTONS = [
  {
    name: "Github",
    href: config.social.github,
    icon: <SiGithub size={"24"} color={"#fff"} />,
  },
  {
    name: "LinkedIn",
    href: config.social.linkedin,
    icon: <SiLinkedin size={"24"} color={"#fff"} />,
  },
  {
    name: "Twitter",
    href: config.social.twitter,
    icon: <SiX size={"24"} color={"#fff"} />,
  },
  {
    name: "Instagram",
    href: config.social.instagram,
    icon: <SiInstagram size={"24"} color={"#fff"} />,
  },
  {
    name: "Linktree",
    href: LINKTREE_URL,
    icon: <SiLinktree size={"24"} color={"#fff"} />,
  },
  {
    name: "Blog",
    href: "/blogs",
    icon: <NotebookPen size={"24"} color={"#fff"} />,
  },
];

const SocialMediaButtons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true });
  return (
    <div ref={ref} className="z-10">
      {show &&
        BUTTONS.map((button) => (
          <Link
            href={button.href}
            key={button.name}
            target={button.href.startsWith("/") ? undefined : "_blank"}
            rel={button.href.startsWith("/") ? undefined : "noopener noreferrer"}
          >
            <Button variant={"ghost"} aria-label={button.name}>{button.icon}</Button>
          </Link>
        ))}
    </div>
  );
};

export default SocialMediaButtons;
