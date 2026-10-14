"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  pickFramePlan,
  frameUrl,
  isConstrainedConnection,
  warmUrls,
} from "@/lib/frameSequence";

/* ─────────────────────────────────────────────────────────────────────────────
 * RoutePrefetcher — warm every page in the background after the first load
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * <Link> only prefetches a route once its link scrolls into view, and the
 * menu links live in a closed overlay, so most pages were fetched on click —
 * which is the loading pause visitors saw. This prefetches all routes once
 * the page the visitor landed on (usually Home) has finished loading and the
 * browser is idle, so later navigations come straight from the client cache.
 *
 * It also warms the HTTP cache for the heavy above-the-fold assets that a
 * route prefetch does not cover (the Kiwano hero frames, the About and
 * Services hero art). These are served with year-long immutable cache
 * headers (next.config.mjs), so a warmed file is never fetched again.
 *
 * Nothing runs until `load` + idle, so it never competes with the current
 * page's own images, fonts or scripts. It is skipped entirely when the
 * visitor has Data Saver on or is on a connection slower than 4G.
 *
 * Note: router.prefetch is a no-op in `next dev`; check this with a
 * production build (`npm run build && npm start`).
 */

const ROUTES = [
  "/",
  "/about",
  "/project-list",
  "/kiwano-villa",
  "/kiwano-villament",
  "/services",
  "/gallery",
  "/testimonial",
  "/contact",
];

/* Kiwano hero frame sequences. The WHOLE sequence is warmed — in the same
   set (orientation) and stride the hero will use, via the shared plan in
   lib/frameSequence — because warming only the first few frames left the
   rest to download during the visitor's first scroll, which is what made it
   stutter. Download size per sequence: phones ~4–10 MB (portrait WebP,
   every 3rd frame), desktop ~27–43 MB (full landscape JPEG set). Files are
   only downloaded into the HTTP cache here, not decoded or kept in memory. */
const FRAME_SEQUENCES = [
  { base: "/frames/kiwano",           count: 217 },
  { base: "/frames/kiwano-villament", count: 217 },
];

/* Frames per sequence warmed in the first pass, before either sequence is
   finished, so whichever Kiwano page the visitor opens first already has its
   opening stretch cached. */
const FIRST_PASS = 30;

const STATIC_ASSETS = [
  "/images/about-hero-sketch.webp",
  "/images/about-hero-render.webp",
  "/videos/services-hero-poster.webp",
];

function frameUrls() {
  const lists = FRAME_SEQUENCES.map(({ base, count }) => {
    const { set, indices } = pickFramePlan(base, count);
    return indices.map((i) => frameUrl(set, i));
  });
  return [
    ...lists.flatMap((urls) => urls.slice(0, FIRST_PASS)),
    ...lists.flatMap((urls) => urls.slice(FIRST_PASS)),
  ];
}

// requestIdleCallback is missing on Safari — fall back to a short timeout.
const onIdle = (fn) =>
  "requestIdleCallback" in window
    ? window.requestIdleCallback(fn, { timeout: 2000 })
    : window.setTimeout(fn, 300);

const cancelIdle = (id) =>
  "cancelIdleCallback" in window ? window.cancelIdleCallback(id) : window.clearTimeout(id);

export default function RoutePrefetcher() {
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isConstrainedConnection()) return;

    let cancelled = false;
    let idleId = 0;

    const run = () => {
      idleId = onIdle(async () => {
        // 1. Pages — RSC payload + JS chunks for every route.
        for (const route of ROUTES) {
          if (cancelled) return;
          if (route !== pathname) router.prefetch(route);
        }

        // 2. Hero art + both Kiwano frame sequences, a few at a time, low priority.
        await warmUrls([...STATIC_ASSETS, ...frameUrls()], {
          concurrency: 4,
          shouldStop: () => cancelled,
        });
      });
    };

    if (document.readyState === "complete") {
      run();
    } else {
      window.addEventListener("load", run, { once: true });
    }

    return () => {
      cancelled = true;
      cancelIdle(idleId);
      window.removeEventListener("load", run);
    };
    // Run once per visit, not on every navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
