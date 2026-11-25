import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { content } from "@/data/content";
import type { Cta } from "@/data/content";
import { useLenis } from "@/lib/lenis";
import SectionWrapper from "../ui/section-wrapper";

const CtaButton = ({ cta }: { cta: Cta }) => {
  const lenis = useLenis();
  const isExternal = cta.href.startsWith("http");
  const isAnchor = cta.href.startsWith("#");

  const button = (
    <Button
      variant={cta.variant === "outline" ? "outline" : "default"}
      className="w-full justify-center gap-2"
      aria-label={cta.label}
      onClick={isAnchor ? () => lenis?.scrollTo(cta.href) : undefined}
    >
      {cta.variant === "github" && <SiGithub size={20} />}
      {cta.variant === "linkedin" && <SiLinkedin size={20} />}
      {cta.label}
    </Button>
  );

  if (isExternal) {
    return (
      <Link href={cta.href} target="_blank" rel="noopener noreferrer" className="flex-1">
        {button}
      </Link>
    );
  }

  if (isAnchor) {
    return <Link href={cta.href} className="flex-1">{button}</Link>;
  }

  return <div className="flex-1">{button}</div>;
};

const HeroSection = () => {
  const { hero } = content;
  const nameParts = hero.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const renderAffiliation = (line: string) => {
    if (!hero.auxStudioUrl || !line.includes("AUX Studio")) return line;
    const [before, after] = line.split("AUX Studio");
    return (
      <>
        {before}
        <a
          href={hero.auxStudioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
        >
          AUX Studio ↗
        </a>
        {after}
      </>
    );
  };

  return (
    <SectionWrapper id="hero" className={cn("relative w-full min-h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "min-h-[calc(100dvh-3rem)] md:min-h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 sm:pb-16 md:p-20 lg:p-24 xl:p-28"
          )}
        >
          <div className="flex flex-col">
            <div>
              {/* Original live-site heading: small greeting, big outlined name, small tagline. */}
              <BlurIn delay={0.7}>
                <p className="md:self-start mt-4 font-medium text-md text-slate-500 dark:text-zinc-400 cursor-default sm:text-xl md:text-xl whitespace-nowrap bg-clip-text">
                  {hero.greeting}
                </p>
              </BlurIn>

              <BlurIn delay={1}>
                <h1
                  className={cn(
                    "-ml-[6px] leading-none text-transparent text-slate-800 text-left",
                    "font-bold text-6xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl",
                    "cursor-default text-edge-outline font-display"
                  )}
                >
                  <span className="sr-only">{hero.name} — {hero.tagline}</span>
                  <span aria-hidden="true">
                    {firstName}
                    <br />
                    {lastName}
                  </span>
                </h1>
              </BlurIn>

              <BlurIn delay={1.2}>
                <p className="md:self-start md:mt-3 font-medium text-md text-slate-600 dark:text-zinc-300 cursor-default sm:text-lg md:text-xl">
                  {hero.role}
                </p>
              </BlurIn>

              <BlurIn delay={1.3}>
                <p className="md:self-start md:mt-1 font-medium text-md text-slate-500 dark:text-zinc-400 cursor-default sm:text-lg md:text-xl whitespace-nowrap bg-clip-text">
                  {hero.tagline}
                </p>
              </BlurIn>
            </div>

            <BlurIn delay={1.45}>
              <div className="mt-5 max-w-xl space-y-1 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {hero.description.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </BlurIn>

            <BlurIn delay={1.6}>
              <div className="mt-4 space-y-1 text-sm font-medium text-foreground/90 sm:text-base">
                <p>{hero.stackLine}</p>
                {hero.affiliations.map((line) => (
                  <p key={line} className="text-muted-foreground">{renderAffiliation(line)}</p>
                ))}
              </div>
            </BlurIn>

            <div className="mt-6 flex w-full max-w-xl flex-wrap gap-3">
              {hero.ctas.map((cta, i) => (
                <BoxReveal key={cta.label} delay={1.75 + i * 0.1} width="100%">
                  <CtaButton cta={cta} />
                </BoxReveal>
              ))}
            </div>
          </div>
        </div>
        <div className="grid col-span-1" />
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
