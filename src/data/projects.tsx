import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiGreensock, SiGooglechrome } from "react-icons/si";

import content, { type PortfolioProject, type ProjectSkillKey } from "@/data/content";

const BASE_PATH = "/assets/projects-screenshots";

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const brand = (title: string, icon: ReactNode): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon,
});

const PROJECT_SKILLS: Record<ProjectSkillKey, Skill> = {
  html: brand("HTML", <SiHtml5 />),
  css: brand("CSS", <SiCss3 />),
  js: brand("JavaScript", <SiJavascript />),
  react: brand("React", <SiReact />),
  nextjs: brand("Next.js", <SiNextdotjs />),
  ts: brand("TypeScript", <SiTypescript />),
  tailwind: brand("Tailwind", <SiTailwindcss />),
  vite: brand("Vite", <SiVite />),
  gsap: brand("GSAP", <SiGreensock />),
  chrome: brand("Chrome", <SiGooglechrome />),
};

const skillsFromKeys = (keys: ProjectSkillKey[] = []): Skill[] =>
  keys.map((key) => PROJECT_SKILLS[key]).filter((skill): skill is Skill => Boolean(skill));

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link className="font-mono underline flex gap-2" rel="noopener noreferrer" target="_blank" href={live}>
          <Button variant={"default"} size={"sm"}>
            Live Preview
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link className="font-mono underline flex gap-2" rel="noopener noreferrer" target="_blank" href={repo}>
          <Button variant={"default"} size={"sm"}>
            GitHub
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: ReactNode;
  github?: string;
  live: string;
};

const buildProject = (item: PortfolioProject): Project => ({
  id: item.id,
  category: item.category,
  title: item.title,
  src: item.src || `${BASE_PATH}/${item.id}/landing.png`,
  screenshots: item.screenshots?.length ? item.screenshots : ["landing.png"],
  skills: {
    frontend: skillsFromKeys(item.skills?.frontend),
    backend: skillsFromKeys(item.skills?.backend),
  },
  live: item.live || "#",
  github: item.github || "",
  get content() {
    return (
      <div>
        <TypographyP className="font-mono text-2xl text-center">
          {item.tagline}
        </TypographyP>
        <TypographyP className="font-mono">
          {item.description}
        </TypographyP>
        <ProjectsLinks live={item.live} repo={item.github} />
        <TypographyH3 className="my-4 mt-8">{item.featuresHeading}</TypographyH3>
        <p className="font-mono mb-2">{item.features}</p>
      </div>
    );
  },
});

const projects: Project[] = content.projects.items.map(buildProject);

export default projects;
