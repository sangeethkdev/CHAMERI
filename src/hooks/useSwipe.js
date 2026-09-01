'use client';

import { useRef, useMemo } from 'react';

/**
 * useSwipe — horizontal swipe/drag navigation for the testimonial carousels.
 *
 * Returns a set of props to spread onto the element that should respond to the
 * gesture:
 *
 *   const swipe = useSwipe({ onSwipeLeft: next, onSwipeRight: prev });
 *   <div {...swipe.handlers} style={{ touchAction: 'pan-y' }} />
 *
 * Params:
 *   onSwipeLeft  {function} – fired on a right-to-left swipe (advance)
 *   onSwipeRight {function} – fired on a left-to-right swipe (go back)
 *   threshold    {number}   – px of travel required to count (default 50)
 *   enabled      {boolean}  – set false to ignore gestures entirely
 *
 * Notes on the implementation:
 *
 * - Pointer Events are used rather than touch events so one code path covers
 *   touchscreens, pens and mouse-drag on desktop. `pointerdown` is only tracked
 *   when it is a touch/pen, or a mouse primary button, so right-clicks and
 *   scroll-wheel presses do not start a drag.
 *
 * - The gesture must be predominantly HORIZONTAL to fire. Comparing |dx| to
 *   |dy| means a vertical page scroll that happens to start on the carousel
 *   never flips a slide — without that check the carousel steals ordinary
 *   scrolling on mobile, which is worse than having no swipe at all.
 *
 * - State lives in a ref, not useState: the pointer handlers must read the
 *   start coordinates synchronously during a move/up that can fire many times
 *   before React re-renders, and tracking this in state would also re-render
 *   the carousel on every frame of a drag.
 *
 * - The caller is expected to set `touchAction: 'pan-y'` on the same element,
 *   which lets the browser keep handling vertical scrolling natively while
 *   horizontal intent is left to this hook.
 */
export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  enabled = true,
} = {}) {
  const startRef = useRef(null);

  // Memoised so spreading `handlers` doesn't hand the element brand-new
  // function identities on every render.
  const handlers = useMemo(() => {
    if (!enabled) return {};

    const onPointerDown = (e) => {
      const isTouchLike = e.pointerType === 'touch' || e.pointerType === 'pen';
      if (!isTouchLike && e.button !== 0) return;
      startRef.current = { x: e.clientX, y: e.clientY };
    };

    const finish = (e) => {
      const start = startRef.current;
      startRef.current = null;
      if (!start) return;

      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;

      // Ignore mostly-vertical gestures so page scrolling still works.
      if (Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy)) return;

      if (dx < 0) onSwipeLeft?.();
      else onSwipeRight?.();
    };

    return {
      onPointerDown,
      onPointerUp: finish,
      // A pointer that leaves the element or is taken over by the browser
      // (native scroll, gesture nav) must clear the start point, or the next
      // unrelated pointerup would be measured against a stale origin.
      onPointerCancel: () => { startRef.current = null; },
      onPointerLeave: () => { startRef.current = null; },
      // Dragging over images/text would otherwise start a native drag and
      // swallow the pointerup that ends the swipe.
      onDragStart: (e) => e.preventDefault(),
    };
  }, [enabled, onSwipeLeft, onSwipeRight, threshold]);

  return { handlers };
}
