'use client';

import React, { useRef, useState, useEffect } from 'react';

// Shown only until the admin fills in Home → About Us.
const DEFAULT_HEADING =
  "We're create luxury trusted modern builders creating timeless spaces for future through smart we build modern luxury homes with trusted the design craft every detail matters day move choice.";

const DEFAULT_MOBILE_HEADING =
  "Since 1985, we have built residential and commercial work with founder leadership and in house execution. Over 40 years one principle guides us: A home where life can take root, and become entirely and truly yours. That is our promise";

/** The heading animates word by word as the section scrolls into view. */
const toWords = (text) => text.trim().split(/\s+/).filter(Boolean);

const AboutSection = ({ aboutUs }) => {
  // Same admin field drives both breakpoints; each falls back to its own copy.
  const HEADING_WORDS = toWords(aboutUs?.heading || DEFAULT_HEADING);
  const MOBILE_HEADING_WORDS = toWords(aboutUs?.heading || DEFAULT_MOBILE_HEADING);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const mobileHeadingRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Only one of the two headings is actually rendered at a given
      // breakpoint (the other is `display:none`, so offsetParent is null) —
      // pick whichever is live so the same scroll-progress math drives both.
      const el = headingRef.current?.offsetParent ? headingRef.current : mobileHeadingRef.current;
      if (!el) return;
      const rect   = el.getBoundingClientRect();
      const windowH = window.innerHeight || document.documentElement.clientHeight;
      const start  = windowH * 0.55;
      const end    = windowH * 0.05;
      const raw    = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const darkCount = Math.round(progress * HEADING_WORDS.length);
  const mobileDarkCount = Math.round(progress * MOBILE_HEADING_WORDS.length);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#EDE7DE] flex flex-col items-center overflow-hidden"
      style={{
        paddingTop:    'clamp(28px, 5.556vw, 80px)', // 80px @ 1440px
        paddingBottom: 'clamp(12px, 1.667vw, 24px)', // reduced now that the stats row (which used to fill this space) is gone
      }}
    >
      {/* <div className="
        w-full mx-auto flex flex-col items-center
        px-[20px] lg:px-0 3xl:px-[20px]
        sm:max-w-[60%] md:max-w-[70%] lg:max-w-[80%] xl:max-w-[82%] 2xl:max-w-[84%] 3xl:max-w-[1480px] 3xl:w-[1330px] 4xl:max-w-[100%]
      "> */}

      <div
        className="w-full mx-auto flex flex-col items-center"
        style={{
          paddingLeft:  'clamp(10px, 2.083vw, 30px)', // 30px @ 1440px (adjusted from 20px to account for removal of breakpoint-based padding)
          paddingRight: 'clamp(10px, 2.083vw, 30px)',
          maxWidth:     'clamp(675px, 93.5vw, 1920px)', // Caps at max content width
        }}
      >

        {/* ══════════════════════════════════════════════════════════════════
            ABOUT US HEADER (Top Row) — desktop/tablet (>= sm)
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="hidden sm:flex w-full md:flex-row items-start justify-between gap-6 md:gap-0"
          style={{
            maxWidth:      'clamp(375px, 100vw, 1920px)',
            minHeight:     'clamp(160px, 22.847vw, 329px)', // 329px @ 1440px
            paddingLeft:   'clamp(10px, 1.389vw, 20px)',    // 20px  @ 1440px
            paddingRight:  'clamp(10px, 1.389vw, 20px)',    // 20px  @ 1440px
          }}
        >

          {/* ── About Us Badge ───────────────────────────────────────────── */}
          <div
            className="flex items-center flex-shrink-0 rounded-[90px]"
            style={{
              width:         'clamp(80px, 9.167vw, 138.6px)', // 112.6px @ 1440px
              height:        'clamp(14px, 1.389vw, 28px)',    // 20px    @ 1440px
              gap:           'clamp(4px, 0.5vw, 7.2px)',      // 7.2px   @ 1440px
              paddingLeft:   'clamp(4px, 0.5vw, 7.2px)',
              paddingRight:  'clamp(4px, 0.5vw, 7.2px)',
            }}
          >
            {/* Dot */}
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
            About Us
          </span>
          </div>

          {/* ── Heading Text Box ─────────────────────────────────────────── */}
          <div
            className="w-full flex flex-col justify-start"
            style={{
              maxWidth:  'clamp(450px, 69.424vw, 1400px)', // 970.91px @ 1440px
              minHeight: 'clamp(80px, 20.833vw, 300px)',     // 300px    @ 1440px
            }}
          >
            <h2
              ref={headingRef}
              className="font-roundo font-medium"
              style={{
                fontSize:      'clamp(32px, 3.433vw, 56px)',   // 48px    @ 1440px
                lineHeight:    'clamp(34px, 4vw, 57.6px)',     // 57.6px  @ 1440px
                letterSpacing: 'clamp(-2px, -0.167vw, -4px)',
                textIndent:    'clamp(40px, 8.333vw, 120px)',  // 120px   @ 1440px
              }}
            >
              {HEADING_WORDS.map((word, i) => (
                <span
                  key={i}
                  className={`transition-colors duration-300 inline ${i < darkCount ? 'text-[#292929]' : 'text-[#6B859E]'}`}
                >
                  {word}
                  {i < HEADING_WORDS.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            ABOUT US HEADER — mobile (< sm)
            Figma frame: 390×503
              Badge : 88.6×20  top:45.5  left:22.15
              Text  : 344×581  top:-29   left:24
                      Roundo 500 33.6px/36.6px  ls:-0.73px
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="sm:hidden w-full flex flex-col"
          style={{
            /* No extra paddingTop here — the outer <section> already applies
               its own paddingTop (shared with desktop), so adding one more
               here was stacking into a large blank gap above the badge. */
            paddingLeft: 'clamp(21px, 5.897vw, 25px)',     /* ~23/390  */
            paddingRight:'clamp(21px, 5.897vw, 25px)',
          }}
        >
          {/* Badge */}
        <div
          className="flex items-center rounded-[90px] self-start"
          style={{
            paddingLeft:   'clamp(5px, 0.5vw, 7.2px)',
            paddingRight:  'clamp(5px, 0.5vw, 7.2px)',
            paddingTop:    'clamp(3.5px, 0.38vw, 5.4px)',
            paddingBottom: 'clamp(3.5px, 0.38vw, 5.4px)',
            gap:           'clamp(5px, 0.5vw, 7.2px)',
          }}
        >
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
            About Us
          </span>
        </div>

          {/* Paragraph — width fills the padded container (never a fixed
              floor wider than the viewport, which was overflowing on
              320px-wide screens) and caps out at the Figma value.
              Same scroll-triggered word-by-word reveal as the desktop heading. */}
          <p
            ref={mobileHeadingRef}
            className="font-roundo font-medium"
            style={{
              marginTop: 'clamp(10px, 3.077vw, 14px)',
              width: '100%',
              maxWidth: 'clamp(360px, 100vw, 360px)',
              fontSize: 'clamp(24px, 8.415vw, 37px)',    /* 33.6/390 */
              lineHeight: 'clamp(29px, 9.385vw, 40px)',   /* 36.6/390 */
              letterSpacing: '-0.73px',
            }}
          >
            {MOBILE_HEADING_WORDS.map((word, i) => (
              <span
                key={i}
                className={`transition-colors duration-300 inline ${i < mobileDarkCount ? 'text-[#292929]' : 'text-[#6B859E]'}`}
              >
                {word}
                {i < MOBILE_HEADING_WORDS.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;

