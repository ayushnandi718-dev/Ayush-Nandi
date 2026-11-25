"use client";

import { motion } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { MapPin, Mail } from "lucide-react";
import ProfileCard from "../profile-card/ProfileCard";
import { useLenis } from "@/lib/lenis";
import { content } from "@/data/content";

const AboutSection = () => {
  const lenis = useLenis();
  const { journey, site } = content;

  return (
    <SectionWrapper id="about" className="min-h-screen py-20">
      <div className="w-full max-w-5xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="about"
          title={journey.heading}
          desc={journey.description}
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-light leading-relaxed text-foreground md:text-3xl">
              {journey.paragraphs[0]}
            </h3>

            {journey.paragraphs.slice(1).map((paragraph, i) => (
              <motion.p
                key={paragraph}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {journey.location}
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {site.email}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center justify-center"
          >
            <ProfileCard
              avatarUrl="/assets/meeee.jpg"
              miniAvatarUrl="/assets/meeee.jpg"
              innerGradient="linear-gradient(145deg,#ffffff 0%,#f1f5f9 100%)"
              behindGlowEnabled={false}
              name={site.author}
              title={journey.profileTitle}
              handle={journey.handle}
              status={journey.status}
              onContactClick={() => lenis?.scrollTo("#contact")}
            />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
