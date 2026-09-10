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
 * iOS Safari surfaced this the most: it restores scroll asynchronously after
 * paint, so a single synchronous scrollTo during the render pass can be
 * overwritten. The rAF below re-applies the reset on the next frame, after
 * that restore has landed.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // An in-page anchor (/contact#form) is a deliberate request to land
    // somewhere other than the top — leave those alone.
    if (window.location.hash) return;

    window.scrollTo(0, 0);

    const rafId = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
}
