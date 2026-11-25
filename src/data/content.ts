import raw from "./portfolio.json";

export type Cta = {
  label: string;
  href: string;
  variant: "primary" | "outline" | "github" | "linkedin";
};

export type FeaturedProject = {
  id: string;
  icon: string;
  title: string;
  summary: string;
  tech: string[];
  caseStudy: {
    problem: string;
    solution: string;
    result: string;
  };
  href: string;
};

export const PROJECT_SKILL_KEYS = [
  "html",
  "css",
  "js",
  "react",
  "nextjs",
  "ts",
  "tailwind",
  "vite",
  "gsap",
  "chrome",
] as const;

export type ProjectSkillKey = (typeof PROJECT_SKILL_KEYS)[number];

export type PortfolioProject = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: {
    frontend: ProjectSkillKey[];
    backend: ProjectSkillKey[];
  };
  tagline: string;
  description: string;
  featuresHeading: string;
  features: string;
  live: string;
  github?: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type BuildingItem = {
  icon: string;
  title: string;
  detail: string;
};

export type TechGroup = {
  title: string;
  items: string[];
};

export type PortfolioContent = {
  seo: {
    title: string;
    descriptionLong: string;
    descriptionShort: string;
    keywords: string[];
    jobTitle: string;
    twitterHandle: string;
  };
  site: {
    author: string;
    email: string;
    url: string;
    githubUsername: string;
    githubRepo: string;
    githubReposUrl: string;
    copyrightYear: number;
  };
  hero: {
    greeting: string;
    name: string;
    role: string;
    tagline: string;
    description: string[];
    stackLine: string;
    affiliations: string[];
    auxStudioUrl: string;
    ctas: Cta[];
  };
  featuredProjects: {
    title: string;
    description: string;
    items: FeaturedProject[];
  };
  projects: {
    title: string;
    items: PortfolioProject[];
  };
  building: {
    title: string;
    description: string;
    items: BuildingItem[];
  };
  metrics: {
    title: string;
    description: string;
    items: Metric[];
  };
  journey: {
    heading: string;
    description: string;
    paragraphs: string[];
    location: string;
    profileTitle: string;
    handle: string;
    status: string;
  };
  techStack: {
    title: string;
    description: string;
    groups: TechGroup[];
  };
  socials: Record<string, string>;
  footer: {
    name: string;
    role: string;
    stackLine: string;
    lines: string[];
    location: string;
  };
  contact: {
    heading: string;
    title: string;
    intro: string;
    whatsapp: string;
    whatsappLabel: string;
    email: string;
    location: string;
    linktree: string;
  };
};

export const content = raw as PortfolioContent;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function mergeWithDefaults<T>(fallback: T, value: unknown): T {
  if (isPlainObject(fallback) && isPlainObject(value)) {
    const result: Record<string, unknown> = { ...(fallback as Record<string, unknown>) };
    for (const [key, next] of Object.entries(value)) {
      if (next === undefined || next === null) continue;
      const previous = result[key];
      result[key] = previous !== undefined ? mergeWithDefaults(previous, next) : next;
    }
    return result as T;
  }
  return (value === undefined || value === null ? fallback : value) as T;
}

/** Fill in sections added after a committed JSON file was written. */
export function mergeContentWithDefaults(value: unknown): PortfolioContent {
  return isPlainObject(value) ? mergeWithDefaults<PortfolioContent>(content, value) : content;
}

export default content;
