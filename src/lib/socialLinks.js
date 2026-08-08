/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Official Chameri social profiles — single source for every icon on the site.
 * ─────────────────────────────────────────────────────────────────────────────
 * Keyed by the `label` each component already uses for its icon, so the footer,
 * the contact page and the slide-out menu all read from here rather than
 * carrying their own copies.
 *
 * Every icon rendered on the site has a URL here. `socialHref()` returns
 * undefined for anything not listed, which makes the components render that
 * icon unlinked rather than pointing it at a dead "#".
 */
export const SOCIAL_LINKS = {
  Instagram: 'https://www.instagram.com/chameribuilders/',
  Facebook:  'https://www.facebook.com/chameribuilders',
  YouTube:   'https://www.youtube.com/@ChameriBuildersDevelopers',
  LinkedIn:  'https://www.linkedin.com/company/chameri/',
  // wa.me takes the number in international format, digits only.
  WhatsApp:  'https://wa.me/919188913114',
};

/** URL for an icon label, or undefined when no profile is configured. */
export function socialHref(label) {
  return SOCIAL_LINKS[label];
}
