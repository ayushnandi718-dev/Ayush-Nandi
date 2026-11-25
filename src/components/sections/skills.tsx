"use client";

import { motion } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { content } from "@/data/content";

/**
 * Tech stack, deliberately text-first. No giant icons — the story and the work
 * come before the tools. The 3D keyboard behind the site is decorative only.
 */
const SkillsSection = () => {
  const { techStack } = content;

  return (
    <SectionWrapper
      id="skills"
      className="flex min-h-screen w-full flex-col justify-center py-24"
    >
      <div className="mx-auto w-full max-w-4xl px-4">
        <SectionHeader
          id="skills"
          title={techStack.title}
          desc={techStack.description}
          className="static mb-14"
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {techStack.groups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: groupIndex * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="rounded-xl border border-border/60 bg-white/60 p-6 backdrop-blur-sm dark:bg-black/50"
            >
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="text-base font-medium text-foreground/90 sm:text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
