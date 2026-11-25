"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import HeroSection from "@/components/sections/hero";
import ProjectsSection from "@/components/sections/projects";
import CurrentlyBuildingSection from "@/components/sections/currently-building";
import BuilderMetricsSection from "@/components/sections/builder-metrics";
import AboutSection from "@/components/sections/about";
import SkillsSection from "@/components/sections/skills";
import ContactSection from "@/components/sections/contact";
import AdSlot from "@/components/ads/ad-slot";

function MainPage() {
  return (
    <SmoothScroll>
      <AnimatedBackground />
      <main className={cn("bg-slate-100 dark:bg-transparent canvas-overlay-mode")}>
        <HeroSection />
        <ProjectsSection />
        <CurrentlyBuildingSection />
        <BuilderMetricsSection />
        <div className="mx-auto max-w-7xl px-6 py-4">
          <AdSlot />
        </div>
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}

export default MainPage;
