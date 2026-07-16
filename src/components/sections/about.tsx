"use client";

import { motion } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { config } from "@/data/config";
import { MapPin, Mail } from "lucide-react";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Motion Design",
  "Creative Branding",
  "Video Editing",
  "AI Apps",
  "Full-Stack Developer",
];

const services = [
  {
    title: "Full-Stack Web Development",
    desc: "I build modern, responsive websites and web applications using React, Next.js, TypeScript, and Tailwind CSS. From landing pages to complex SaaS dashboards, I deliver fast, scalable, and accessible products.",
  },
  {
    title: "AI-Powered Applications",
    desc: "I integrate AI and machine learning capabilities into web apps, building intelligent features like chatbots, content generators, and data-driven dashboards using modern AI APIs and frameworks.",
  },
  {
    title: "Motion Design & Video Editing",
    desc: "I create engaging motion graphics, animated logos, explainer videos, and social media reels using After Effects and Premiere Pro. Visual storytelling is at the core of every project I take on.",
  },
  {
    title: "Creative Branding & UI/UX",
    desc: "I design brand identities, logos, and user interfaces that stand out. My approach combines clean aesthetics with intuitive user experience to create memorable digital products.",
  },
];

const AboutSection = () => {
  return (
    <SectionWrapper
      id="about"
      className="flex flex-col items-center justify-center min-h-screen py-20"
    >
      <div className="w-full max-w-5xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="about"
          title="About Me"
          desc=""
          className="mb-12 md:mb-20 mt-0"
        />

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — Main quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-light leading-relaxed text-foreground">
              Hi, I am{" "}
              <motion.span
                className="font-semibold text-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                Ayush Nandi
              </motion.span>
              , a{" "}
              <motion.span
                className="font-semibold text-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                Full-Stack Developer
              </motion.span>{" "}
              and{" "}
              <motion.span
                className="font-semibold text-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                Digital Creator
              </motion.span>{" "}
              based in Alipurduar, West Bengal, India, designing and developing{" "}
              <motion.span
                className="font-semibold text-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
              >
                high-performance digital experiences
              </motion.span>
              .
            </h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-muted-foreground leading-relaxed"
            >
              My work blends modern web technologies like React, Next.js, and TypeScript with
              professional Motion Design to build fast, immersive web applications and AI-powered
              products built with attention to every detail. I specialize in creating responsive
              frontends, RESTful APIs, and full-stack solutions that perform at scale.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-muted-foreground leading-relaxed"
            >
              As a freelance web developer, I have delivered projects for startups, local
              businesses, and personal brands. Whether it is a restaurant website, a gym
              landing page, an AI platform, or a school album app, I approach every project
              with the same commitment to quality, performance, and visual polish.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-muted-foreground leading-relaxed"
            >
              Beyond web development, I am also a creative video editor and motion graphics
              artist. I produce reels, explainer videos, and branded content for social media
              platforms. My dual expertise in code and creative production allows me to
              deliver end-to-end digital solutions under one roof.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-muted-foreground leading-relaxed"
            >
              Looking for a remote Full-Stack Developer or Freelance Video Editor? Let's
              collaborate on your next digital project. I am always open to exciting
              opportunities and creative partnerships.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Alipurduar, West Bengal, India</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{config.email}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Skills pill grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap gap-3"
          >
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-5 py-2.5 rounded-full border border-border/60 bg-secondary/30 backdrop-blur-sm text-sm font-medium text-foreground/80 hover:text-foreground hover:border-foreground/30 hover:bg-secondary/50 transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
              What I Do
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Services I offer as a Full-Stack Developer, Video Editor, and Digital Creator
              based in Alipurduar, West Bengal, India.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-border/40 bg-secondary/20 backdrop-blur-sm hover:border-primary/20 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
