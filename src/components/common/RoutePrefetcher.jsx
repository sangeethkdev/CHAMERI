"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

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
 * visitor has Data Saver on or is on a 2G-class connection.
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

/* Kiwano hero frames to warm: the poster plus the first stretch of the
   scrub, in the same set (orientation) and stride useFrameSequence will use,
   so the first scroll on those pages is already cached. */
const FRAME_SETS   = ["/frames/kiwano", "/frames/kiwano-villament"];
const WARM_FRAMES  = 12;
const MOBILE_MAX_W = 900; // matches useFrameSequence
const MOBILE_STRIDE = 3;  // matches useFrameSequence

const STATIC_ASSETS = [
  "/images/about-hero-sketch.webp",
  "/images/about-hero-render.webp",
  "/videos/services-hero-poster.webp",
];

function isConstrainedConnection() {
  const c = navigator.connection;
  if (!c) return false;
  return c.saveData === true || /(^|-)2g$/.test(c.effectiveType || "");
}

function frameUrls() {
  const isPortrait = window.innerHeight > window.innerWidth;
  const stride     = window.innerWidth <= MOBILE_MAX_W ? MOBILE_STRIDE : 1;
  const urls = [];
  for (const base of FRAME_SETS) {
    const dir = isPortrait ? `${base}/portrait` : base;
    const ext = isPortrait ? "webp" : "jpg";
    for (let n = 0; n < WARM_FRAMES; n += 1) {
      const idx = String(n * stride + 1).padStart(4, "0");
      urls.push(`${dir}/frame_${idx}.${ext}`);
    }
  }
  return urls;
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

        // 2. Heavy above-the-fold assets, a few at a time at low priority.
        const assets = [...STATIC_ASSETS, ...frameUrls()];
        const CONCURRENCY = 4;
        for (let i = 0; i < assets.length && !cancelled; i += CONCURRENCY) {
          await Promise.all(
            assets.slice(i, i + CONCURRENCY).map((url) =>
              fetch(url, { priority: "low" }).catch(() => {})
            )
          );
        }
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
