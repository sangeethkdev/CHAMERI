'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScroll, useTransform, motion } from 'framer-motion';
import Text from './Text';

/**
 * Section — one full-screen case-study panel.
 *
 * Figma: the panel is a rounded card (radius 3.82px) inset from its own
 * 100vh slot by padding (30px top/bottom, 10px left/right at the 1440
 * baseline), with the section's #EDE7DE background showing through that
 * padding — not a full-bleed edge-to-edge image.
 *
 * The background image is `position: fixed` (pinned to the viewport) inside
 * the card's `overflow: hidden` + `border-radius` box — that box is what
 * actually clips the fixed image to this card's own on-screen bounds, so as
 * the page scrolls the image appears to stay in place rather than scrolling
 * with it. `useScroll`/`useTransform` add a further ±10vh drift on top for
 * a subtle parallax as the section passes by. No reveal/wipe effect — every
 * card's image is fully visible immediately, before any scrolling happens.
 */
export default function Section({ project }) {
  const scrollTarget = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-10vh', '10vh']);

  return (
    <div ref={scrollTarget} className="relative w-full" style={{ height: '100vh', background: '#EDE7DE' }}>
      {/* Padded frame — #EDE7DE shows through here, around the rounded card */}
      <div
        className="absolute inset-0"
        style={{
          paddingTop: 'clamp(5px, 1.083vw, 10px)',
          paddingBottom: 'clamp(5px, 2.083vw, 30px)',
          paddingLeft: 'clamp(6px, 2.694vw, 35px)',
          paddingRight: 'clamp(6px, 2.394vw, 35px)',
          boxSizing: 'border-box',
        }}
      >
        <Link
          href={project.href}
          aria-label={project.title || project.tag}
          className="relative w-full h-full flex items-center justify-center overflow-hidden no-underline"
          style={{
            background: '#101010',
            borderRadius: 'clamp(2px, 0.265vw, 3.82px)',
            // `overflow: hidden` alone doesn't reliably clip `position:
            // fixed` descendants (Text below, and the background image) to
            // this box's current on-screen rect once it's scrolled well out
            // of view — they can keep painting over whatever's now on
            // screen instead. A static (never-animated) clip-path forces
            // the same clipping path that stayed solid throughout the
            // scroll-scrubbed reveal version, with none of that version's
            // wipe motion.
            clipPath: 'inset(0% 0% 0% 0%)',
          }}
        >
          <Text project={project} />

          <div className="fixed left-0 w-full" style={{ top: '-10vh', height: '120vh', zIndex: 0 }}>
            <motion.div style={{ y }} className="relative w-full h-full">
              <Image
                src={project.image}
                alt=""
                fill
                // Every project image is a candidate the very first frame:
                // Lenis makes it trivial to fling straight past the fold,
                // so relying on lazy-loading's "scrolled near viewport"
                // heuristic (which assumes normal-paced scrolling) leaves a
                // blank gap if a later section's image hasn't started
                // fetching yet by the time it comes into view.
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </Link>
      </div>
    </div>
  );
}
