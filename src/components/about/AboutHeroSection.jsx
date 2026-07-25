'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * AboutHeroSection — Full-width hero for the About Us page with pin-and-reveal animation.
 */
export default function AboutHeroSection({ hero }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [stickyStart, setStickyStart] = useState(0.28);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const sectionHeight = Math.min(vw * 0.86806, 1250);
        const revealDistance = vh; // 100vh
        const totalScrollRange = sectionHeight + revealDistance - vh;
        const startScroll = sectionHeight - vh;
        if (totalScrollRange > 0 && startScroll > 0) {
          setStickyStart(startScroll / totalScrollRange);
        } else {
          setStickyStart(0);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clipPath = useTransform(
    scrollYProgress,
    [0, stickyStart, 1],
    ['inset(100% 0 0 0)', 'inset(100% 0 0 0)', 'inset(0% 0 0 0)']
  );

  return (
    <>
      {/* Mobile hero (iPhone 13/14-sized screens) — static frame, no scroll-pin animation */}
      <section
        className="block md:hidden"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#EDE7DE',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 76,
            paddingBottom: 24,
            gap: 8,
          }}
        >
          <h1
            style={{
              width: 'min(341px, 90vw)',
              fontFamily:
                "var(--font-roundo), 'Roundo', var(--font-outfit), system-ui, sans-serif",
              fontWeight: 500,
              fontSize: '36.6px',
              lineHeight: '36.6px',
              letterSpacing: '-0.73px',
              textAlign: 'center',
              color: '#1A1A1A',
              margin: 0,
              padding: 0,
            }}
          >
            {hero?.heading || 'Crafting Timeless Villas & Landmark Spaces'}
          </h1>

          <p
            style={{
              width: 'min(341px, 90vw)',
              fontFamily:
                "var(--font-roundo), 'Roundo', var(--font-outfit), system-ui, sans-serif",
              fontWeight: 500,
              fontSize: '22.6px',
              lineHeight: '41.6px',
              letterSpacing: '-0.83px',
              textAlign: 'center',
              color: '#1A1A1A',
              margin: 0,
              padding: 0,
            }}
          >
            {hero?.subheading || 'since 1985'}
          </p>
        </div>

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'min(86.806vw, 1250px)',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/image 9.svg"
            alt="Chameri architectural villa sketch"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        </div>
      </section>

      {/* Desktop hero — pin-and-reveal scroll animation */}
      <section
        className="hidden md:block"
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: 'calc(min(86.806vw, 1250px) + 100vh)',
          backgroundColor: '#EDE7DE',
        }}
      >
      <div
        style={{
          position: 'sticky',
          top: 'calc(100vh - min(86.806vw, 1250px))',
          width: '100%',
          height: 'min(86.806vw, 1250px)',
          overflow: 'hidden',
          backgroundColor: '#EDE7DE',
        }}
      >
        {/* Background image (sketch) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/image 9.svg"
          alt="Chameri architectural villa sketch"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />

        {/* Colored Final Render (Scroll Revealed) */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1, // Above sketch, below text/gradient
            clipPath,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ad2b2e784dade57173773fcdb50ec2a988877826 (1).png"
            alt="Chameri fully rendered villa"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        </motion.div>

        {/* Subtle gradient overlay for text legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(237,231,222,0.60) 0%, rgba(237,231,222,0.15) 40%, rgba(237,231,222,0.00) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Text container */}
        <div
          style={{
            position: 'absolute',
            top: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(min(341px, 90vw), 46.37vw, 667.67px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
            zIndex: 10,
          }}
        >
          {/* Heading */}
          <h1
            style={{
              fontFamily:
                "var(--font-roundo), 'Roundo', var(--font-outfit), system-ui, sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(36.6px, 4.167vw, 60px)',
              lineHeight: 'clamp(36.6px, 4.593vw, 66.14px)',
              letterSpacing: 'clamp(-3.05px, -0.212vw, -0.6px)',
              textAlign: 'center',
              color: '#1A1A1A',
              margin: 0,
              padding: 0,
            }}
          >
            {hero?.heading || 'Crafting Timeless Villas & Landmark Spaces'}
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontFamily:
                "var(--font-roundo), 'Roundo', var(--font-outfit), system-ui, sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(22.6px, 2.778vw, 40px)',
              lineHeight: 'clamp(41.6px, 4.593vw, 66.14px)',
              letterSpacing: 'clamp(-3.05px, -0.212vw, -0.6px)',
              textAlign: 'center',
              color: '#1A1A1A',
              margin: 0,
              padding: 0,
            }}
          >
            {hero?.subheading || 'since 1985'}
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
