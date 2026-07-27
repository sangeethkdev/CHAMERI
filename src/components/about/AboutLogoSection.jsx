'use client';

import React from 'react';
import Image from 'next/image';

/**
 * AboutLogoSection
 * Design baseline : 1440px Figma canvas
 * Fluid range     : 375px → 1920px
 * Formula         : fluid_vw  = (value_at_1440 / 1440) * 100
 *                   clamp_min = value_at_1440 * (375  / 1440)   ← ~0.26×
 *                   clamp_max = value_at_1440 * (1920 / 1440)   ← ~1.33×
 */
const STATIC_LOGOS = [
  '/dummyimages/Logo.png',
  '/dummyimages/Logo (1).png',
  '/dummyimages/Logo (2).png',
  '/dummyimages/Logo (3).png',
  '/dummyimages/Logo (4).png',
  '/dummyimages/Logo (5).png',
  '/dummyimages/Logo (6).png',
];

export default function AboutLogoSection({ workLogos }) {
  const logos = (workLogos && workLogos.length > 0) ? workLogos : STATIC_LOGOS;

  // Multiple sets for seamless scroll
  const scrollLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <>
      {/* ── Mobile (iPhone 13/14-sized screens) ── */}
      <section
        className="block md:hidden"
        style={{
          backgroundColor: '#EDE7DE',
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: '100%',
            paddingTop: 25,
            paddingBottom: 25,
            paddingLeft: 18,
            paddingRight: 18,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '19.44px',
              letterSpacing: '-0.32px',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              margin: 0,
              textAlign: 'center',
            }}
          >
            Architects We Work With
          </h3>

          <div
            style={{
              width: '100%',
              height: '79.7px',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            <div
              className="flex animate-marquee whitespace-nowrap"
              style={{ gap: '10px' }}
            >
              {scrollLogos.map((logo, index) => (
                <div
                  key={index}
                  style={{
                    flexShrink: 0,
                    position: 'relative',
                    width: '86px',
                    height: '36px',
                  }}
                >
                  <Image
                    src={logo}
                    alt={`Client Logo ${index}`}
                    fill
                    className="object-contain grayscale opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Desktop — existing fluid layout ── */}
      <section
        className="hidden md:block"
        style={{
          backgroundColor: '#EDE7DE',
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: '100%',
            // height: 'clamp(164px, 11.39vw, 219px)',
            /* 16px @ 1440 → 1.11vw */
            paddingTop: 'clamp(4px, 1.11vw, 21px)',
            paddingBottom: 'clamp(4px, 1.11vw, 21px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            /* 10px @ 1440 → 0.69vw */
            gap: 'clamp(3px, 0.69vw, 13px)',
            overflow: 'hidden',
          }}
        >
          {/* ── Title ──────────────────────────────────────────────────────── */}
          <h3
            style={{
              fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
              fontWeight: 400,
              /* 16.2px @ 1440 → 1.125vw */
              fontSize: 'clamp(11px, 1.125vw, 22px)',
              lineHeight: '19.44px',
              letterSpacing: '-0.32px',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              margin: 0,
              textAlign: 'center',
            }}
          >
            Architects We Work With
          </h3>

          {/* ── Marquee container ─────────────────────────────────────── */}
          <div
            style={{
              /* 1200px @ 1440 → 83.33vw */
              width: 'clamp(312px, 87.33vw, 1800px)',
              /* 111px @ 1440 → 7.71vw */
              height: 'clamp(29px, 7.71vw, 148px)',
              /* 30px @ 1440 → 2.08vw */
              paddingTop: 'clamp(8px, 2.08vw, 40px)',
              paddingBottom: 'clamp(8px, 2.08vw, 40px)',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            {/* ── Scrolling strip ──────────────────────────────────────────── */}
            <div
              className="flex animate-marquee whitespace-nowrap"
              style={{
                /* Gap 53px @ 1440 → 3.68vw */
                gap: 'clamp(14px, 3.68vw, 71px)',
              }}
            >
              {scrollLogos.map((logo, index) => (
                <div
                  key={index}
                  style={{
                    flexShrink: 0,
                    position: 'relative',
                    /* Fallback width logic since it wasn't specified. Assuming typical logo aspect ratio */
                    width: 'clamp(40px, 10.42vw, 200px)',
                    /* Inner height 51px @ 1440 → 3.54vw */
                    height: 'clamp(13px, 3.54vw, 68px)',
                  }}
                >
                  <Image
                    src={logo}
                    alt={`Client Logo ${index}`}
                    fill
                    className="object-contain grayscale opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
