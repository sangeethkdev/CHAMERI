/* Shared plan for the scroll-scrubbed Kiwano hero frame sequences.
 *
 * Lives outside useFrameSequence so RoutePrefetcher (mounted in the root
 * layout) can compute exactly the same frame URLs the hero will request —
 * same orientation set, same mobile stride — without pulling GSAP into every
 * page's bundle. If the two disagreed, the prefetcher would warm files the
 * hero never asks for. */

/* Viewport width at or below which the sequence is decimated. Matches the
 * canvas DPR breakpoint in useFrameSequence's resizeCanvas. */
export const MOBILE_MAX_WIDTH = 900;

/* Frame stride on small viewports — every Nth source frame is used. */
export const MOBILE_STRIDE = 3;

/* Which extraction to use, and how coarsely to sample it.
 *
 * The orientation test is deliberately `innerHeight > innerWidth` rather than
 * a `(orientation: portrait)` media query: on iOS that query also matches
 * transient states like the keyboard being up. */
export function pickFramePlan(frameBase, frameCount) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const isPortrait = h > w;
  const isMobile   = w <= MOBILE_MAX_WIDTH;
  const stride     = isMobile ? MOBILE_STRIDE : 1;

  return {
    set: isPortrait
      ? { dir: `${frameBase}/portrait`, ext: "webp" }
      : { dir: frameBase,               ext: "jpg"  },
    key:    `${isPortrait ? "portrait" : "landscape"}@${stride}`,
    stride,
    isMobile,
    // Indices into the *source* sequence, in playback order.
    indices: Array.from(
      { length: Math.ceil(frameCount / stride) },
      (_, n) => Math.min(n * stride, frameCount - 1)
    ),
  };
}

export function frameUrl(set, srcIndex) {
  return `${set.dir}/frame_${String(srcIndex + 1).padStart(4, "0")}.${set.ext}`;
}

/* True on connections where downloading a whole sequence ahead of time would
 * cost the visitor more than it saves: Data Saver on, or slower than 4G.
 * Safari has no navigator.connection, so it is treated as unconstrained. */
export function isConstrainedConnection() {
  const c = typeof navigator !== "undefined" ? navigator.connection : null;
  if (!c) return false;
  if (c.saveData === true) return true;
  return /^(slow-2g|2g|3g)$/.test(c.effectiveType || "");
}

/* Pull files into the HTTP cache, a few at a time, at low priority. The
 * frames are served `immutable` for a year (next.config.mjs), so once warmed
 * the hero's <img> requests are answered from disk with no network wait.
 * `shouldStop` lets the caller abandon the queue (unmount, page change). */
export async function warmUrls(urls, { concurrency = 4, shouldStop = () => false } = {}) {
  let next = 0;
  const worker = async () => {
    while (next < urls.length && !shouldStop()) {
      const url = urls[next++];
      try {
        await fetch(url, { priority: "low" });
      } catch {
        /* a failed warm just means the hero fetches it itself later */
      }
    }
  };
  await Promise.all(Array.from({ length: concurrency }, worker));
}
