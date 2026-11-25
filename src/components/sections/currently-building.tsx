"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { content } from "@/data/content";
import type { FeaturedProject } from "@/data/content";

const caseStudyRows = (project: FeaturedProject) => [
  { label: "Problem", text: project.caseStudy.problem },
  { label: "Solution", text: project.caseStudy.solution },
  { label: "Result", text: project.caseStudy.result },
];

const BuildingProjectCard = ({ project, index }: { project: FeaturedProject; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
    viewport={{ once: true, margin: "-60px" }}
    className="group flex h-full flex-col rounded-2xl border border-border/60 bg-white/60 p-6 backdrop-blur-sm transition-colors hover:border-foreground/30 dark:bg-black/50 sm:p-7"
  >
    <div className="flex items-start justify-between gap-4">
      <span aria-hidden="true" className="text-3xl">{project.icon}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Case Study
      </span>
    </div>

    <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground">
      {project.title}
    </h3>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
      {project.summary}
    </p>

    <div className="mt-5 flex flex-wrap gap-2">
      {project.tech.map((tech) => (
        <span
          key={tech}
          className="rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-xs font-medium text-foreground/80"
        >
          {tech}
        </span>
      ))}
    </div>

    <div className="mt-6 space-y-3 border-t border-border/60 pt-5">
      {caseStudyRows(project).map((row) => (
        <div key={row.label} className="grid grid-cols-[4.5rem_1fr] gap-3">
          <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {row.label}
          </dt>
          <dd className="text-sm leading-relaxed text-foreground/80">{row.text}</dd>
        </div>
      ))}
    </div>

    <Link
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
    >
      View on GitHub
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </Link>
  </motion.article>
);

const CurrentlyBuildingSection = () => {
  const { building, featuredProjects, site } = content;

  return (
    <SectionWrapper id="building" className="min-h-screen max-w-7xl mx-auto px-4 py-20">
      <SectionHeader
        id="building"
        title={building.title}
        desc={building.description}
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.items.map((project, index) => (
          <BuildingProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href={site.githubReposUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/more inline-flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-secondary/50"
        >
          View More on GitHub
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/more:translate-x-0.5 group-hover/more:-translate-y-0.5" />
        </Link>
      </div>
    </SectionWrapper>
  );
};

export default CurrentlyBuildingSection;
