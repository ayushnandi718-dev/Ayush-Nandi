const config = {
  title: "Ayush Nandi | Digital Creator & Web Developer",
  description: {
    long: "Portfolio of Ayush Nandi — digital creator and web developer building modern web apps with React, Next.js, and Tailwind CSS.",
    short:
      "Digital creator and web developer building modern, creative web experiences with React and Next.js.",
  },
  keywords: [
    "Ayush Nandi",
    "Full-Stack Developer",
    "portfolio",
    "digital creator",
    "web developer",
    "web design",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "JavaScript",
    "Node.js",
    "motion graphics",
    "creative branding",
    "video editor",
    "AI apps",
    "freelance developer",
    "Alipurduar",
    "West Bengal",
    "India",
  ],
  author: "Ayush Nandi",
  email: "ayushnandi718@gmail.com",
  site: "https://ayushapd.dpdns.org",

  githubUsername: "ayushnandi718-dev",
  githubRepo: "Ayush-Nandi",

  // GitHub repositories page — destination for the Projects section "See More" link.
  githubReposUrl: "https://github.com/ayushnandi718-dev?tab=repositories",

  // Google AdSense — monetization.
  // `enabled` gates whether ad units render at all. Keep it false until your
  // account is approved and you've decided where ads should appear. The
  // publisher ID is public (it ships in the ad script served to every visitor).
  ads: {
    // Granted by Google when your site is approved for AdSense.
    publisherId: "ca-pub-8902731613673487",
    // Master switch: turn this on only after AdSense approval.
    enabled: false,
    // Slot ID of the ad unit created in your AdSense console. Replace
    // "0000000000" once you've created a real "Display" ad unit.
    adSlot: "0000000000",
  },
  // Cookie / privacy consent storage key (used by the consent banner).
  consentStorageKey: "ayush-visitor-consent",

  get ogImg() {
    return this.site + "/assets/seo/og_preview.png";
  },
  social: {
    twitter: "https://x.com/iitwalabanda123",
    linkedin: "https://www.linkedin.com/in/ayush-nandi-apdj-india/",
    instagram: "https://instagram.com/rva.creates/",
    facebook: "https://www.facebook.com/1rva.creates/",
    github: "https://github.com/ayushnandi718-dev",
    youtube: "https://www.youtube.com/@rva.creates",
  },
};
export { config };
