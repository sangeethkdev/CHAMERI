/**
 * Single source of truth for the canonical origin and the page inventory.
 *
 * The audit found no canonical tags, no sitemap and no Open Graph tags
 * anywhere. All three need the same absolute origin, so it lives here rather
 * than being repeated (and drifting) across robots, sitemap and metadata.
 */
export const SITE_URL = "https://chameribuilders.com";

export const SITE_NAME = "Chameri Builders & Developers";

/**
 * Every publicly reachable route, with the change frequency hint the sitemap
 * exposes. `priority` is relative within the site: the home page and the two
 * project pages are the ones that should be crawled most often.
 */
export const ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/project-list", changeFrequency: "weekly", priority: 0.9 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.7 },
  { path: "/testimonial", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  { path: "/kiwano", changeFrequency: "weekly", priority: 0.9 },
  { path: "/kiwano-villament", changeFrequency: "weekly", priority: 0.9 },
];
