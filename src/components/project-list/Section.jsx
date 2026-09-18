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
export default function Section({ project, index = 0 }) {
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
                /* Only the first section is `priority`.

                   Every section used to carry it, on the reasoning that Lenis
                   makes it easy to fling past the fold faster than lazy
                   loading reacts. But `priority` does not mean "fetch early" —
                   it emits a <link rel=preload> and opts the image out of
                   lazy loading entirely, so all of these multi-MB project
                   images were preloaded at the highest priority during the
                   initial load, competing with each other and with the page's
                   own render-blocking assets. That is what kept the page busy
                   long enough for auditing crawlers to record a timeout.

                   `priority` is also deprecated in Next.js 16 (see the note in
                   KiwanoBrandStory), so the first section asks for an eager,
                   high-priority fetch instead, and the rest lazy-load as they
                   are scrolled to. */
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
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
