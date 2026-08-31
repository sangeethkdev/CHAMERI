'use client';

import React from 'react';

/**
 * ContactLocations component
 * Baseline viewport: 1440px
 */
const MAP_SRC =
  'https://www.google.com/maps?q=11.7488333,75.5324167(Chameri+Builders+%26+Developers)&ll=11.7488333,75.5324167&z=17&output=embed';

export default function ContactLocations() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE — iPhone 13/14 (390px) baseline
          Figma: w:390 h:678 pt/pb:40, content gap:14, header block gap:8,
                 badge w:72.2 h:20, heading Roundo 500 32px/36.6px ls:-0.73px,
                 map h:482 radius:8
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="flex md:hidden w-full justify-center bg-[#EDE7DE]">
        <div
          className="w-full flex flex-col"
          style={{ paddingTop: '40px', paddingBottom: '40px', paddingLeft: '15px', paddingRight: '15px' }}
        >
          <div className="w-full flex flex-col" style={{ gap: '14px' }}>
            {/* Header — badge above heading */}
            <div className="w-full flex flex-col" style={{ gap: '8px' }}>
              <div
                className="flex items-center flex-shrink-0"
                style={{ gap: '7.2px', borderRadius: '90px', width: 'fit-content' }}
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#334454', flexShrink: 0 }} />
                <span
                  className="uppercase"
                  style={{
                    fontFamily:    "var(--font-geist-sans), system-ui, sans-serif",
                    fontWeight:    400,
                    fontSize:      '12px',
                    lineHeight:    '19.44px',
                    letterSpacing: '-0.32px',
                    color:         '#000000',
                  }}
                >
                  Location
                </span>
              </div>

              <h2
                className="m-0"
                style={{
                  fontFamily:    "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                  fontWeight:    500,
                  fontSize:      '32px',
                  lineHeight:    '36.6px',
                  letterSpacing: '-0.73px',
                  color:         '#000000',
                  maxWidth:      '352.51px',
                }}
              >
                Elegant Spaces For Built Views Photo Frame
              </h2>
            </div>

            {/* Map */}
            <div
              className="w-full relative overflow-hidden"
              style={{ height: '482px', borderRadius: '8px', backgroundColor: '#e5e7eb' }}
            >
              <iframe
                title="Chameri Builders & Developers"
                src={MAP_SRC}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── DESKTOP ──────────────────────────────────────────────────────────── */}
      <section className="hidden md:flex w-full justify-center bg-[#EDE7DE]">
        {/* Main Section Layout */}
        <div
          className="w-full flex flex-col"
          style={{
            maxWidth: 'clamp(680px, 110.167vw, 1920px)',
            paddingTop: 'clamp(32px, 4.167vw, 60px)',
            paddingBottom: 'clamp(40px, 5.556vw, 80px)',
            paddingLeft: 'clamp(20px, 5.278vw, 76px)',
            paddingRight: 'clamp(20px, 5.278vw, 76px)',
            gap: 'clamp(16px, 1.944vw, 28px)', // Outer gap

          }}
        >
          {/* Inner Content Layout */}
          <div
            className="w-full flex flex-col"
            style={{
              maxWidth: 'clamp(680px, 110.167vw, 1920px)',
              margin: '0 auto',
              gap: 'clamp(20px, 2.361vw, 34px)', // Inner gap
            }}
          >
            {/* Header Layout */}
            <div
              className="w-full flex flex-col md:flex-row md:items-center justify-between"
              style={{
                gap: '20px', // Fallback gap for mobile wrapping
              }}
            >
              {/* LOCATIONS label */}
              <div
                className="flex items-center"
                style={{
                  gap: 'clamp(4px, 0.5vw, 7.2px)',
                  paddingTop: '5.4px',
                  paddingBottom: '5.4px',
                  borderRadius: '90px',
                  marginBottom: 'clamp(10px, 5.389vw, 50px)',
                }}
              >
                {/* Square icon */}
          <div
            className="bg-[#334454] flex-shrink-0"
            style={{
              width:        'clamp(10px, 0.97vw, 18.6px)',
              height:       'clamp(10px, 0.97vw, 18.6px)',
              borderRadius: 'clamp(2px, 0.21vw, 4px)',
            }}
          />
          {/* Figma @1440: Geist 400, 16.2px / 19.44px, ls -0.32px, uppercase.
              vw = DESIGN_PX / 1440 × 100 → 1.125vw / 1.35vw. */}
          <span
            className="font-sans font-normal uppercase text-[#000000] flex items-center justify-center"
            style={{
              fontSize:      'clamp(12px, 1.125vw, 16.2px)',
              lineHeight:    'clamp(14px, 1.35vw, 19.44px)',
              letterSpacing: '-0.32px',
            }}
          >
            LOCATIONS
          </span>
              </div>

              {/* Heading Text */}
              <h2
                style={{
                  fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(32px, 4.167vw, 64px)',
                  lineHeight: 'clamp(38px, 4.593vw, 66.14px)',
                  letterSpacing: 'clamp(-3.05px, -0.212vw, -1px)',
                  color: '#171717',
                  maxWidth: 'clamp(344.76px, 40.986vw, 700px)',
                  margin: 0,
                }}
              >
                Come Find Us in the Heart of Thalassery
              </h2>
            </div>

            {/* Map Layout */}
            <div
              className="w-full relative overflow-hidden"
              style={{
                height: 'clamp(300px, 33.472vw, 650px)',
                borderRadius: '8px',
                backgroundColor: '#e5e7eb', // fallback skeleton color
              }}
            >
              <iframe
                title="Chameri Builders & Developers"
                src={MAP_SRC}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
