/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Official Chameri social profiles — single source for every icon on the site.
 * ─────────────────────────────────────────────────────────────────────────────
 * Keyed by the `label` each component already uses for its icon, so the footer,
 * the contact page and the slide-out menu all read from here rather than
 * carrying their own copies.
 *
 * NOTE: Pinterest has no URL yet. It is intentionally absent — `socialHref()`
 * returns undefined for it, and the components render that icon unlinked
 * rather than pointing it at a dead "#". Add the profile URL here and it
 * becomes a working link in all three places at once.
 */
export const SOCIAL_LINKS = {
  Instagram: 'https://www.instagram.com/chameribuilders/',
  Facebook:  'https://www.facebook.com/chameribuilders',
  YouTube:   'https://www.youtube.com/@ChameriBuildersDevelopers',
  // wa.me takes the number in international format, digits only.
  WhatsApp:  'https://wa.me/919188913114',
};

/** URL for an icon label, or undefined when no profile is configured. */
export function socialHref(label) {
  return SOCIAL_LINKS[label];
}
