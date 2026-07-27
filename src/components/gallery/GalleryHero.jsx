'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const STATIC_GALLERY_DATA = [
  { id: 1, image: "/dummyimages/image 14 (3) 1.svg", text: "Crafting Timeless Villas &\nLandmark Spaces" },
  { id: 2, image: "/dummyimages/image 14 (3) 3.svg", text: "Building Elegant Homes,\nDesigning Lasting Impressions" },
  { id: 3, image: "/dummyimages/Overlay.png", text: "Crafting Timeless Villas &\nLandmark Spaces" },
];

// dir: 1 = scroll down (enter from bottom, exit to top)
//      -1 = scroll up   (enter from top,    exit to bottom)
const textVariants = {
  initial: (dir) => ({ opacity: 0, y: dir * 50 }),
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir) => ({
    opacity: 0,
    y: dir * -50,
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
  }),
};

export default function GalleryHero({ heroSection }) {
  const apiSlides = [heroSection?.first, heroSection?.second, heroSection?.third];
  const hasData = apiSlides.some(s => s?.image);
  const galleryData = hasData
    ? apiSlides.map((s, i) => ({
        id: i + 1,
        image: s?.image || STATIC_GALLERY_DATA[i].image,
        text: s?.text || STATIC_GALLERY_DATA[i].text,
      }))
    : STATIC_GALLERY_DATA;
  const N = galleryData.length;
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevIndexRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(0.9999, latest));
    const newIndex = Math.floor(clamped * N);
    if (newIndex !== prevIndexRef.current) {
      setDirection(newIndex > prevIndexRef.current ? 1 : -1);
      prevIndexRef.current = newIndex;
      setActiveIndex(newIndex);
    }
  });

  // Sync on mount in case the page loads mid-section
  useEffect(() => {
    const clamped = Math.max(0, Math.min(0.9999, scrollYProgress.get()));
    setActiveIndex(Math.floor(clamped * N));
  }, [scrollYProgress]);

  return (
    // Outer scroll track: N × 100vh gives each slide ~1 viewport of scroll travel
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${N * 100}vh` }}
    >
      {/*
        Mobile (≤767px) typography override — Figma mobile spec (390px frame):
        font-size 38px, line-height 42px, letter-spacing -2px, capitalize,
        width 298.41px. Uses !important because the desktop clamp() values
        are set inline on the h2 below, and only !important in a stylesheet
        rule can win over an inline style.
      */}
      <style>{`
        @media (max-width: 767px) {
          .gallery-hero-heading {
            width: min(298.41px, 90vw) !important;
            font-size: 38px !important;
            line-height: 42px !important;
            letter-spacing: -2px !important;
            text-transform: capitalize !important;
          }
        }
      `}</style>
      {/* ── Sticky viewport ──────────────────────────────────────────── */}
      <section
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100vh' }}
      >

        {/*
          ── IMAGE STACK ──────────────────────────────────────────────
          All images share the same absolute position (inset-0).
          Only one is mounted at a time via AnimatePresence.

          Enter : opacity 0 → 1,  scale 0.96 → 1    (0.5 s easeOut)
          Exit  : opacity 1 → 0,  scale 1   → 1.04  (0.4 s easeIn)
        */}
        <div className="absolute inset-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={`img-${activeIndex}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.6, ease: 'easeOut' },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.6, ease: 'easeIn' },
              }}
            >
              <Image
                src={galleryData[activeIndex].image}
                alt={`Gallery Slide ${activeIndex + 1}`}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={activeIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div
            className="flex flex-col items-center justify-center text-center"
            style={{ width: 'clamp(300px, 65.27vw, 940px)' }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.h2
                key={`text-${activeIndex}`}
                custom={direction}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-white whitespace-pre-wrap gallery-hero-heading"
                style={{
                  fontFamily: "var(--font-roundo),'Roundo',system-ui,sans-serif",
                  fontWeight: 500,
                  width: 'clamp(300px, 46.36vw, 667.67px)',
                  fontSize: 'clamp(32px, 4.16vw, 60px)',
                  lineHeight: 'clamp(40px, 4.59vw, 66.14px)',
                  letterSpacing: 'clamp(-3.05px, -0.21vw, -1px)',
                  margin: 0,
                  padding: 0,
                }}
              >
                {galleryData[activeIndex].text}
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>

      </section>
    </div>
  );
}
