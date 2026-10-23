/* Small SVGs used above the fold / on every page, imported through the bundler
   rather than referenced as "/icons/…" strings.

   Why: the host serves the /public folder directly, bypassing Next.js, so the
   year-long Cache-Control in next.config.mjs never reached these files and
   PageSpeed listed them with a Cache TTL of "None". An imported asset is
   emitted to /_next/static/media/<name>.<hash>.svg, which Next serves itself
   with `public, max-age=31536000, immutable` — and the content hash in the
   name means a changed file can never be served stale. */

import logoMark from "../../public/icons/logo (6).svg";
import logoWordmark from "../../public/icons/logo (7).svg";
import logoMenu from "../../public/icons/logo (8).svg";
import wave1 from "../../public/icons/Vector (1).svg";
import wave2 from "../../public/icons/Vector (2).svg";
import wave3 from "../../public/icons/Vector (3).svg";
import wave4 from "../../public/icons/Vector (4).svg";
import iconDesign from "../../public/images/692885235bac36a9a3203cd0_Group.svg (1).svg";
import iconExpertise from "../../public/images/692885226ea01d367379ce40_Frame.svg (1).svg";
import iconPeople from "../../public/images/healthicons_people-outline (1).svg";

export const LOGO_MARK = logoMark.src;
export const LOGO_WORDMARK = logoWordmark.src;
export const LOGO_MENU = logoMenu.src;
export const HERO_WAVES = [wave1.src, wave2.src, wave3.src, wave4.src];
export const ICON_DESIGN = iconDesign.src;
export const ICON_EXPERTISE = iconExpertise.src;
export const ICON_PEOPLE = iconPeople.src;
