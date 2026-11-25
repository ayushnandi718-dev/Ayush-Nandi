import { content } from "./content";

const config = {
  title: content.seo.title,
  description: {
    long: content.seo.descriptionLong,
    short: content.seo.descriptionShort,
  },
  keywords: content.seo.keywords,
  author: content.site.author,
  email: content.site.email,
  site: content.site.url,
  githubUsername: content.site.githubUsername,
  githubRepo: content.site.githubRepo,

  // Static copyright year (no runtime `new Date()` in SSR/prerender — Next.js 16
  // blocks current-time reads in Server Components). Editable in the admin portal.
  copyrightYear: content.site.copyrightYear,

  // GitHub repositories page — destination for the Projects section "See More" link.
  githubReposUrl: content.site.githubReposUrl,

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
  social: content.socials,
};

export { config };
