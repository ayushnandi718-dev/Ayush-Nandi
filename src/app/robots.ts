import type { MetadataRoute } from "next";
import { config } from "@/data/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cgi-bin/", "/tmp/", "/admin/", "/private/", "/backup/"],
    },
    sitemap: `${config.site}/sitemap.xml`,
  };
}
