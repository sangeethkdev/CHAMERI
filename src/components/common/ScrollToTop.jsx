'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scrolls to the top whenever the route changes.
 *
 * Next normally handles this itself, but the home hero sets
 * `window.history.scrollRestoration = "manual"` to keep its intro animation
 * from being fought by the browser restoring a previous scroll position.
 * That flag is global and persists for the whole session, so after a visitor
 * has been to the home page once, every later navigation kept whatever scroll
 * offset the previous page had — most visibly when jumping from a footer link
 * (bottom of the page) to a new route, which then opened part-way down.
 *
 * Two details this has to work around:
 *
 * 1. `globals.css` sets `html { scroll-behavior: smooth }`, which turns a
 *    plain scrollTo into an *animated* scroll. Travelling the full height of
 *    a long page (About, Project List) takes long enough that the route
 *    swap interrupts it mid-flight, stranding the next page part-way down.
 *    Passing `behavior: 'instant'` opts this one call out of that.
 *
 * 2. iOS Safari restores scroll asynchronously after paint, so a single
 *    synchronous reset during the render pass can still be overwritten. The
 *    rAF below re-applies it on the next frame, after that restore lands.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // An in-page anchor (/contact#form) is a deliberate request to land
    // somewhere other than the top — leave those alone.
    if (window.location.hash) return;

    // `behavior: 'instant'` is what defeats the global smooth-scroll; the
    // documentElement/body writes are a fallback for older iOS Safari, which
    // ignores the options object on window.scrollTo entirely.
    const jump = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    jump();

    const rafId = requestAnimationFrame(jump);
    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
}
