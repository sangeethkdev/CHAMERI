"use client";

import { useEffect, useRef } from "react";

/**
 * useReleaseVideoOnUnmount — hand a <video>'s decoder back to the OS.
 *
 * WHY THIS IS NEEDED
 * ──────────────────
 * Removing a <video> from the DOM is not enough on iOS. WebKit keeps the
 * element's media pipeline — the hardware decode session and its buffers —
 * alive until the element is garbage collected, and GC is not prompt. iOS
 * grants a page only a handful of those pipelines device-wide, so a page that
 * mounts videos, is navigated away from, and is returned to repeatedly can
 * accumulate orphaned sessions faster than they are collected.
 *
 * That is the "open and close the page a few times and the phone stalls"
 * shape of bug: each visit is individually fine, and the failure only appears
 * after several. On a client-side router like Next's there is no document
 * teardown between visits to reclaim them, so nothing forces the issue.
 *
 * The documented way to release one deterministically is to pause it, drop the
 * source, and call load() so WebKit tears the pipeline down immediately rather
 * than whenever GC happens to run.
 *
 * `removeAttribute("src")` handles a `src` attribute; a <video> fed by child
 * <source> elements needs those removed too, which is why both are cleared
 * before load() is called. Calling load() with no source is what actually
 * resets the element, and the resulting "empty src" abort is expected — it is
 * suppressed so it does not surface as a console error.
 *
 * Attach the returned ref to the <video>. No other change to the markup is
 * required, and nothing happens until the component unmounts.
 */
export default function useReleaseVideoOnUnmount() {
  const ref = useRef(null);

  // Captured on mount: by cleanup time React may already have detached the
  // ref, so reading ref.current there can return null.
  useEffect(() => trackVideoForRelease(ref.current), []);

  return ref;
}

/**
 * Non-hook form for components that manage their own <video> ref, or whose
 * clip changes over the component's lifetime. Returns the teardown, so it can
 * be the whole body of an effect:
 *
 *   useEffect(() => trackVideoForRelease(videoRef.current), [videoSrc]);
 *
 * Pass the element itself (read inside the effect), not the ref.
 */
export function trackVideoForRelease(el) {
  if (!el) return undefined;

  return () => {
    /* Only tear down an element that has really left the page. A real
       unmount (route change, or a `key` swap remounting the <video>) removes
       the node before effect cleanups run. React's dev-only StrictMode check
       instead runs this cleanup and then the effect again on the SAME,
       still-attached element — stripping its source there would leave the
       video permanently black, since nothing puts the src back. */
    if (el.isConnected) return;

    try {
      el.pause();

      // Drop every source the element might be using.
      el.removeAttribute("src");
      while (el.firstChild) el.removeChild(el.firstChild);

      /* Forces WebKit to tear down the media pipeline now. Without it the
         decode session can outlive the element. The load() of an element
         with no source fires an abort/error internally; that is the
         intended outcome here, not a failure. */
      el.load();
    } catch {
      /* An element already torn down by the browser can throw here. There
         is nothing to recover — the goal (no live decoder) is met either
         way — so this must not break unmounting. */
    }
  };
}
