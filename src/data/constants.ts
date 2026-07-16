export enum SkillNames {
  HTML = "html",
  CSS = "css",
  JS = "js",
  TS = "ts",
  REACT = "react",
  VUE = "vue",
  NEXTJS = "nextjs",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  GIT = "git",
  GITHUB = "github",
  PRETTIER = "prettier",
  NPM = "npm",
  FIREBASE = "firebase",
  WORDPRESS = "wordpress",
  LINUX = "linux",
  DOCKER = "docker",
  NGINX = "nginx",
  AWS = "aws",
  GCP = "gcp",
  VIM = "vim",
  VERCEL = "vercel",
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.HTML]: {
    id: 1,
    name: "html",
    label: "HTML",
    shortDescription: "The backbone of every web page, one tag at a time.",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  [SkillNames.CSS]: {
    id: 2,
    name: "css",
    label: "CSS",
    shortDescription: "Turning plain pages into visual experiences.",
    color: "#563d7c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  [SkillNames.JS]: {
    id: 3,
    name: "js",
    label: "JavaScript",
    shortDescription: "Bringing interactivity and life to every project.",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  [SkillNames.TS]: {
    id: 4,
    name: "ts",
    label: "TypeScript",
    shortDescription: "Type-safe code that catches bugs before they ship.",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  [SkillNames.REACT]: {
    id: 5,
    name: "react",
    label: "React",
    shortDescription: "Component-driven UIs that scale beautifully.",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  [SkillNames.VUE]: {
    id: 6,
    name: "vue",
    label: "",
    shortDescription: "",
    color: "transparent",
    icon: "",
  },
  [SkillNames.NEXTJS]: {
    id: 7,
    name: "nextjs",
    label: "Next.js",
    shortDescription: "Full-stack React with server-side rendering and speed.",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  [SkillNames.TAILWIND]: {
    id: 8,
    name: "tailwind",
    label: "Tailwind CSS",
    shortDescription: "Utility-first styling that makes design effortless.",
    color: "#38bdf8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  },
  [SkillNames.NODEJS]: {
    id: 9,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "JavaScript on the server — fast and scalable.",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  [SkillNames.EXPRESS]: {
    id: 10,
    name: "express",
    label: "",
    shortDescription: "",
    color: "transparent",
    icon: "",
  },
  [SkillNames.POSTGRES]: {
    id: 11,
    name: "postgres",
    label: "",
    shortDescription: "",
    color: "transparent",
    icon: "",
  },
  [SkillNames.MONGODB]: {
    id: 12,
    name: "mongodb",
    label: "",
    shortDescription: "",
    color: "transparent",
    icon: "",
  },
  [SkillNames.GIT]: {
    id: 13,
    name: "git",
    label: "Git",
    shortDescription: "Version control for tracking code changes.",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  [SkillNames.GITHUB]: {
    id: 14,
    name: "github",
    label: "GitHub",
    shortDescription: "Collaboration and code hosting platform.",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  [SkillNames.PRETTIER]: {
    id: 15,
    name: "prettier",
    label: "",
    shortDescription: "",
    color: "transparent",
    icon: "",
  },
  [SkillNames.NPM]: {
    id: 16,
    name: "npm",
    label: "NPM",
    shortDescription: "Package manager for JavaScript dependencies.",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  },
  [SkillNames.FIREBASE]: {
    id: 17,
    name: "firebase",
    label: "",
    shortDescription: "",
    color: "transparent",
    icon: "",
  },
  [SkillNames.WORDPRESS]: {
    id: 18,
    name: "wordpress",
    label: "",
    shortDescription: "",
    color: "transparent",
    icon: "",
  },
  [SkillNames.LINUX]: {
    id: 19,
    name: "linux",
    label: "",
    shortDescription: "",
    color: "transparent",
    icon: "",
  },
  [SkillNames.DOCKER]: {
    id: 20,
    name: "docker",
    label: "",
    shortDescription: "",
    color: "transparent",
    icon: "",
  },
  [SkillNames.NGINX]: {
    id: 21,
    name: "nginx",
    label: "",
    shortDescription: "",
    color: "transparent",
    icon: "",
  },
  [SkillNames.AWS]: {
    id: 22,
    name: "aws",
    label: "",
    shortDescription: "",
    color: "transparent",
    icon: "",
  },
  [SkillNames.GCP]: {
    id: 25,
    name: "gcp",
    label: "",
    shortDescription: "",
    color: "transparent",
    icon: "",
  },
  [SkillNames.VIM]: {
    id: 23,
    name: "vim",
    label: "",
    shortDescription: "",
    color: "transparent",
    icon: "",
  },
  [SkillNames.VERCEL]: {
    id: 24,
    name: "vercel",
    label: "Vercel",
    shortDescription: "Deploy and host web apps with ease.",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "2023",
    endDate: "Present",
    title: "Digital Creator & Web Developer",
    company: "Freelance",
    description: [
      "Building modern, responsive websites with React, Next.js, and Tailwind CSS.",
      "Running a personal brand on Instagram (@rva.creates) focused on creative content.",
      "Delivering freelance web design projects for startups and local businesses.",
      "Combining motion graphics, web design, and creative branding into cohesive digital experiences.",
    ],
    skills: [
      SkillNames.REACT,
      SkillNames.NEXTJS,
      SkillNames.TAILWIND,
      SkillNames.JS,
      SkillNames.TS,
    ],
  },
  {
    id: 2,
    startDate: "2023",
    endDate: "2024",
    title: "Content Creator",
    company: "Instagram (@rva.creates)",
    description: [
      "Created and managed content for a growing personal brand on Instagram.",
      "Developed visual storytelling skills through reels, posts, and creative edits.",
      "Built an engaged community through consistent, quality content.",
      "Collaborated with startups like Em Aur, Zentrivia, and SkillStreet on brand content.",
    ],
    skills: [SkillNames.GITHUB, SkillNames.GIT, SkillNames.NPM],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thank you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
