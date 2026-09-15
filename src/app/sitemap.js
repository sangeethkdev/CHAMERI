import { ROUTES, SITE_URL } from "@/lib/siteConfig";

/**
 * Served at /sitemap.xml. The audit found both /sitemap.xml and
 * /sitemap_index.xml returning 404, which left /testimonial (linked from only
 * two pages) hard to discover.
 *
 * lastModified is the build time: these are ISR pages rebuilt on deploy, so
 * the build is the most honest "last changed" signal available without
 * tracking per-page edit dates in the CMS.
 */
export default function sitemap() {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
