const config = {
  title: "Ayush Nandi | Full Stack Developer, AI Builder & Open Source Contributor"
,
  description: {
    long: "Portfolio of Ayush Nandi, Full Stack Developer & AI Builder from India. Building scalable web applications, AI-powered products, and open-source projects using React.js, Next.js, TypeScript, Python, and modern web technologies.",
    short:
      "Full Stack Developer & AI Builder specializing in React.js, Next.js, Python, AI-powered applications, and modern web development.",
  },
 keywords: [
  "Ayush Nandi",
  "Full Stack Developer",
  "AI Builder",
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Python",
  "Node.js",
  "Tailwind CSS",
  "Open Source Contributor",
  "Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "AI Applications",
  "Software Engineer",
  "Portfolio",
  "Alipurduar",
  "West Bengal",
  "India",
]
  author: "Ayush Nandi",
  email: "ayushnandi718@gmail.com",
  site: "https://ayushapd.dpdns.org",

  githubUsername: "ayushnandi718-dev",
  githubRepo: "Ayush-Nandi",

  // Static copyright year (no runtime `new Date()` in SSR/prerender — Next.js 16
  // blocks current-time reads in Server Components). Bump manually each year.
  copyrightYear: 2026,

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
