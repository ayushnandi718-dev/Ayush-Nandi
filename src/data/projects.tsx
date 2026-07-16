import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";

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

const PROJECT_SKILLS = {
  html: brand("HTML", <SiHtml5 />),
  css: brand("CSS", <SiCss3 />),
  js: brand("JavaScript", <SiJavascript />),
  react: brand("React", <SiReact />),
  nextjs: brand("Next.js", <SiNextdotjs />),
  ts: brand("TypeScript", <SiTypescript />),
  tailwind: brand("Tailwind", <SiTailwindcss />),
};

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
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

const projects: Project[] = [
  {
    id: "carbonmind",
    category: "AI Platform",
    title: "CarbonMind AI",
    src: `${BASE_PATH}/carbonmind/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.nextjs,
      ],
      backend: [],
    },
    live: "https://carbonmind-ai.vercel.app/",
    github: "https://github.com/ayushnandi718-dev/carbonmind-ai",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Track your carbon footprint, get AI-powered insights, and reduce your environmental impact.
          </TypographyP>
          <TypographyP className="font-mono">
            CarbonMind AI is a modern web application built with React, Next.js, TypeScript, and Tailwind CSS. It helps users understand and reduce their carbon footprint through intelligent tracking and AI-driven recommendations.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Key Features</TypographyH3>
          <p className="font-mono mb-2">
            Real-time carbon footprint tracking with interactive dashboards, AI-powered suggestions for reducing emissions, and a clean modern UI built with Tailwind CSS. Open to contributions from the community.
          </p>
        </div>
      );
    },
  },
  {
    id: "galaxy-gym",
    category: "Web Design",
    title: "Galaxy Gym Website",
    src: `${BASE_PATH}/galaxy-gym/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
        PROJECT_SKILLS.js,
      ],
      backend: [],
    },
    live: "https://galaxy-gym-website.vercel.app",
    github: "https://github.com/ayushnandi718-dev/galaxy-gym-website",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A modern fitness website featuring sleek design and smooth interactions.
          </TypographyP>
          <TypographyP className="font-mono">
            A modern portfolio website featuring web development projects, creative designs, and digital creations. Built with clean HTML, CSS, and JavaScript for a responsive, engaging user experience.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Design Focus</TypographyH3>
          <p className="font-mono mb-2">
            Focused on modern UI/UX principles with responsive layouts, smooth animations, and a dark-themed aesthetic that fits the fitness brand identity.
          </p>
        </div>
      );
    },
  },
  {
    id: "royal-cravings",
    category: "Food Website",
    title: "Royal Cravings",
    src: `${BASE_PATH}/royal-cravings/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
        PROJECT_SKILLS.js,
      ],
      backend: [],
    },
    live: "https://ayushnandi718-dev.github.io/FOOD-WEBSITE/",
    github: "https://github.com/ayushnandi718-dev/FOOD-WEBSITE",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A full food delivery landing page with cart system, menu, reviews & newsletter.
          </TypographyP>
          <TypographyP className="font-mono">
            Royal Cravings (RCB) is a beautifully designed food delivery landing page featuring a complete cart system, menu browsing, customer reviews, and newsletter signup — all in one royal experience.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Features</TypographyH3>
          <p className="font-mono mb-2">
            Interactive menu with item cards, functional cart system with add/remove capabilities, customer review section, and a newsletter subscription form. Responsive design that works across all devices.
          </p>
        </div>
      );
    },
  },
  {
    id: "todo-list",
    category: "Productivity App",
    title: "To-Do List App",
    src: `${BASE_PATH}/todo-list/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
        PROJECT_SKILLS.js,
      ],
      backend: [],
    },
    live: "https://ayushnandi718-dev.github.io/TO-DO-LIST/",
    github: "https://github.com/ayushnandi718-dev/TO-DO-LIST",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A clean task manager to add, check off and delete tasks with minimal UI.
          </TypographyP>
          <TypographyP className="font-mono">
            A clean and minimal task manager built with pure HTML, CSS, and JavaScript. Add tasks, mark them complete, and delete them with smooth interactions.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Design Philosophy</TypographyH3>
          <p className="font-mono mb-2">
            Minimal UI with smooth interactions. Focused on usability and clean code — no frameworks, just pure HTML, CSS, and JavaScript.
          </p>
        </div>
      );
    },
  },
  {
    id: "cake-website",
    category: "Demo App",
    title: "Cake Selling Website",
    src: `${BASE_PATH}/cake-website/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
        PROJECT_SKILLS.js,
      ],
      backend: [],
    },
    live: "https://ayushnandi718-dev.github.io/Cake-Website-Demo/",
    github: "https://github.com/ayushnandi718-dev/Cake-Website-Demo",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A beautifully designed cake shop website with elegant visuals and smooth animations.
          </TypographyP>
          <TypographyP className="font-mono">
            A beautifully designed cake shop website featuring elegant visuals, smooth animations, and a modern responsive layout. Crafted using HTML, CSS, and JavaScript for a delightful user experience.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Visual Design</TypographyH3>
          <p className="font-mono mb-2">
            Elegant color palette, smooth scroll animations, and responsive product cards that showcase the cakes beautifully across all screen sizes.
          </p>
        </div>
      );
    },
  },
  {
    id: "school-album",
    category: "Album Website",
    title: "School Album Website",
    src: `${BASE_PATH}/school-album/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
        PROJECT_SKILLS.js,
      ],
      backend: [],
    },
    live: "https://ayushnandi718-dev.github.io/SCHOOL-NOSTALGIC-/",
    github: "https://github.com/ayushnandi718-dev/SCHOOL-NOSTALGIC-",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Celebrate growth, honor friendships, and preserve school memories.
          </TypographyP>
          <TypographyP className="font-mono">
            A nostalgic school album website that celebrates growth, honors friendships, and preserves the legacy of school life. Each image and caption marks a moment in time — brotherhood, laughs, mischief, and shared glory.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Sentimental Design</TypographyH3>
          <p className="font-mono mb-2">
            Built with love and HTML, CSS, JavaScript. A heartfelt tribute to school memories with photo galleries, captions, and a warm nostalgic feel throughout.
          </p>
        </div>
      );
    },
  },
];

export default projects;
