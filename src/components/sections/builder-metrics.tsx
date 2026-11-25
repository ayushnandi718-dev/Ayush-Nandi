"use client";

import { motion } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { content } from "@/data/content";

const BuilderMetricsSection = () => {
  const { metrics } = content;

  return (
    <SectionWrapper id="metrics" className="min-h-[70vh] max-w-6xl mx-auto px-4 py-20">
      <SectionHeader
        id="metrics"
        title={metrics.title}
        desc={metrics.description}
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.items.map((metric, index) => (
          <motion.div
            key={`${metric.label}-${index}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            viewport={{ once: true, margin: "-50px" }}
            className="rounded-xl border border-border/60 bg-white/60 p-5 text-center backdrop-blur-sm dark:bg-black/50 sm:p-7"
          >
            <p className="font-display text-xl font-bold text-foreground sm:text-3xl">
              {metric.value}
            </p>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default BuilderMetricsSection;
