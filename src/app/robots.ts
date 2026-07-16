# Optimized robots.txt for https://dpdns.org
User-agent: *
Allow: /

# Block sensitive or unnecessary directories
Disallow: /cgi-bin/
Disallow: /tmp/
Disallow: /admin/
Disallow: /private/
Disallow: /backup/

# Sitemap reference (important for SEO)
Sitemap: https://dpdns.org/sitemap.xml
