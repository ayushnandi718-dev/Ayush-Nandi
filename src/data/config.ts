const config = {
  title: "Ayush Nandi | Digital Creator & Web Developer",
  description: {
    long: "Explore the portfolio of Ayush Nandi, a digital creator and web developer from Alipurduar, West Bengal. Specializing in modern web design, motion graphics, and creative branding. Discover my latest projects, including CarbonMind AI, Royal Cravings, Galaxy Gym Website, and more.",
    short:
      "Discover the portfolio of Ayush Nandi, a digital creator and web developer building modern, creative web experiences.",
  },
  keywords: [
    "Ayush Nandi",
    "portfolio",
    "digital creator",
    "web developer",
    "web design",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "JavaScript",
    "motion graphics",
    "creative branding",
    "Alipurduar",
    "West Bengal",
  ],
  author: "Ayush Nandi",
  email: "ayushnandi718@gmail.com",
  site: "https://ayushapd.dpdns.org",

  githubUsername: "ayushnandi718-dev",
  githubRepo: "Ayush-Nandi",

  get ogImg() {
    return this.site + "/assets/seo/og_preview.png";
  },
  social: {
    twitter: "https://x.com/rva_creates",
    linkedin: "https://www.linkedin.com/in/ayush-nandi-apdj-india/",
    instagram: "https://instagram.com/rva.creates/",
    facebook: "https://www.facebook.com/1rva.creates/",
    github: "https://github.com/ayushnandi718-dev",
    youtube: "https://www.youtube.com/@rva.creates",
  },
};
export { config };
