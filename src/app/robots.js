import { SITE_URL } from "@/lib/siteConfig";

/**
 * Served at /robots.txt. The audit found this returning 404, which left
 * crawlers with no pointer to the sitemap and no stated policy.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Route handlers, not pages — nothing here is useful in an index.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
