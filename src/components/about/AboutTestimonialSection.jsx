'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';

const STATIC_TESTIMONIALS = [
  { id: 1, quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."', name: 'Richard', role: 'Entrepreneur', img: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png', avatar: 'https://i.pravatar.cc/80?img=11' },
  { id: 2, quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."', name: 'Haruto & Aiko', role: 'Tech Startup Founders', img: '/dummyimages/7bceb1a3a08e49797c18d0a236cd66cd0abf999b.png', avatar: 'https://i.pravatar.cc/80?img=14' },
  { id: 3, quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."', name: 'Priya Menon', role: 'Interior Designer', img: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png', avatar: 'https://i.pravatar.cc/80?img=47' },
  { id: 4, quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."', name: 'James Keller', role: 'Real Estate Investor', img: '/dummyimages/7bceb1a3a08e49797c18d0a236cd66cd0abf999b.png', avatar: 'https://i.pravatar.cc/80?img=52' },
];

/* ─── Fluid card dimensions — ported from Home's TestimonialsSection ────
 *  Base (1440px / 3xl): cardW=800, cardH=550, sideH=467.5, gap=20
 *  Mobile (< 640px): Figma reference frame is 390px wide with a 310px-wide
 *  card (40px side margins, ~10.26% peek on each side). Scaled continuously
 *  off that ratio so narrower phones keep the same peek proportion instead
 *  of the card filling the whole viewport edge-to-edge.
 * ────────────────────────────────────────────────────────────────────── */
function useCardDimensions() {
  const [dims, setDims] = useState({ cardW: 500, cardH: 550, sideH: 467.5, gap: 20, arrowScale: 1, cardRadius: 12 * (500 / 800), mobileScale: 1, isMobile: false });

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      if (vw < 640) {
        const peekRatio   = 40 / 390;
        const cardW       = vw * (1 - 2 * peekRatio);
        const cardH       = cardW * (473.6111145019531 / 310);
        const mobileScale = cardW / 310;
        setDims({
          cardW,
          cardH,
          sideH: cardH * (473.61 / 495),
          gap: 12 * mobileScale,
          arrowScale: (34.12 / 40) * mobileScale,
          cardRadius: 10.33 * mobileScale,
          mobileScale,
          isMobile: true,
        });
        return;
      }
      const lerp = (min, max) => Math.round(Math.min(max, Math.max(min, min + (max - min) * ((vw - 375) / (1920 - 375)))));
      const cardW = lerp(320, 1067);
      setDims({
        cardW,
        cardH: lerp(260, 733),
        sideH: lerp(220, 623),
        gap:   lerp(12,  27),
        arrowScale: cardW / 800,
        cardRadius: 12 * (cardW / 800),
        mobileScale: 1,
        isMobile: false,
      });
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return dims;
}

export default function AboutTestimonialSection({ testimonialSection }) {
  const TESTIMONIALS = testimonialSection?.cards?.length
    ? testimonialSection.cards.map((c, i) => ({
        id: i + 1,
        quote: c.quote,
        name: c.name,
        role: c.designation,
        img: c.cardImage || STATIC_TESTIMONIALS[i % STATIC_TESTIMONIALS.length]?.img,
        avatar: c.image || STATIC_TESTIMONIALS[i % STATIC_TESTIMONIALS.length]?.avatar,
      }))
    : STATIC_TESTIMONIALS;
  const total = TESTIMONIALS.length;
  const [current, setCurrent]                     = useState(total);
  const [containerW, setContainerW]               = useState(1440);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const wrapperRef = useRef(null);
  const { cardW, cardH, sideH, gap, arrowScale, cardRadius, mobileScale, isMobile } = useCardDimensions();

  const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current) setContainerW(wrapperRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const next = useCallback(() => setCurrent((c) => c + 1), []);
  const prev = useCallback(() => setCurrent((c) => c - 1), []);

  const handleTransitionEnd = useCallback((e) => {
    // Ignore bubbled clip-path/opacity events from child cards
    if (e.target !== e.currentTarget) return;
    if (current >= total * 2) {
      setTransitionEnabled(false);
      setCurrent(current - total);
    } else if (current < total) {
      setTransitionEnabled(false);
      setCurrent(current + total);
    }
  }, [current, total]);

  useEffect(() => {
    if (!transitionEnabled) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransitionEnabled(true))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [transitionEnabled]);

  const centerOffset = (containerW - cardW) / 2;
  const trackX       = centerOffset - current * (cardW + gap);
  const scale        = cardW / 800;
  const arrowTop     = cardH / 2 - 20 * arrowScale;

  // Arrows normally straddle the card edge (half outside), but on narrow viewports
  // there isn't room for that overhang — clamp so they stay fully on-screen instead of clipping.
  const arrowSize      = 40 * arrowScale;
  const leftArrowLeft  = Math.max(4, centerOffset - 20 * arrowScale);
  const rightArrowLeft = Math.min(containerW - arrowSize - 4, centerOffset + cardW - 20 * arrowScale);

  return (
    <section
      className="w-full bg-[#EDE7DE] overflow-hidden flex flex-col mx-auto items-center relative"
      style={{
        paddingTop:    'clamp(40px, 4.17vw, 60px)',
        paddingBottom: 'clamp(40px, 4.17vw, 60px)',
        gap:           'clamp(16px, 1.67vw, 24px)',
      }}
    >
      {/* ── 1 — Header ──────────────────────────────────────────────────── */}
      <div
        className="w-full mx-auto flex flex-col items-center text-center"
        style={{
          width: 'clamp(390px, 90.28vw, 1300px)',
          gap:   'clamp(10px, 1.11vw, 16px)',
        }}
      >
        <div
          className="flex flex-col items-center justify-center"
          style={{ width: 'clamp(358px, 42.22vw, 608px)', gap: 'clamp(6px, 0.69vw, 10px)' }}
        >
          {/* Badge */}
          <div
            className="flex items-center justify-center rounded-[90px] self-center"
            style={{
              width:  'clamp(90px, 9.04vw, 130.2px)',
              height: 'clamp(22px, 2.14vw, 30.8px)',
              gap:    'clamp(5px, 0.5vw, 7.2px)',
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
            TESTIMONIAL
          </span>
          </div>

          {/* Heading */}
          <h2
            className="font-medium capitalize text-[#1A1A1A] text-center m-0 flex items-center justify-center"
            style={{
              fontFamily:    "var(--font-roundo, 'Roundo'), system-ui, sans-serif",
              fontSize:      'clamp(32px, 4.17vw, 66px)',
              lineHeight:    'clamp(36.6px, 4.17vw, 60px)',
              letterSpacing: 'clamp(-0.73px, -0.06vw, -0.9px)',
              width:         'clamp(358px, 42.22vw, 648px)',
              minHeight:     'clamp(37px, 4.17vw, 60px)',
              whiteSpace:    'pre-line',
            }}
          >
            {testimonialSection?.heading || 'What Our Clients Says'}
          </h2>

          {/* Sub-heading */}
          <p
            className="font-sans font-normal text-[#1C1C1C] text-center m-0 flex items-center justify-center"
            style={{
              fontSize:      'clamp(14px, 1.39vw, 20px)',
              lineHeight:    'clamp(21px, 1.83vw, 26.4px)',
              letterSpacing: 'clamp(0px, -0.03vw, -0.44px)',
              width:         'clamp(286px, 42.22vw, 608px)',
              whiteSpace:    'pre-line',
            }}
          >
            {testimonialSection?.subheading ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'}
          </p>
        </div>
      </div>

      {/* ── 2 — Carousel ────────────────────────────────────────────────── */}
      <div
        ref={wrapperRef}
        className="relative overflow-hidden w-full"
        style={{ height: `${cardH}px` }}
      >
        {/* Sliding track */}
        <div
          className="flex"
          style={{
            alignItems: 'center',
            gap:        `${gap}px`,
            transform:  `translateX(${trackX}px)`,
            transition: transitionEnabled ? 'transform 900ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedTestimonials.map((item, i) => {
            const dist     = Math.abs(i - current);
            const isCenter = dist === 0;
            const opacity  = isCenter ? 1 : dist === 1 ? 0.6 : 0;
            const clipPct  = isCenter ? 0 : ((1 - sideH / cardH) / 2) * 100;
            const r        = cardRadius.toFixed(2);
            // the gradient/quote/profile overlay is anchored to the card's true (unclipped) bottom edge,
            // so it has to shift up by the same amount trimmed off the bottom or it gets clipped away
            const bottomTrimPx = (clipPct / 100) * cardH;

            return (
              <div
                key={i}
                className="relative flex-shrink-0 overflow-hidden"
                style={{
                  width:      `${cardW}px`,
                  height:     `${cardH}px`,
                  clipPath:   `inset(${clipPct.toFixed(2)}% 0 ${clipPct.toFixed(2)}% 0 round ${r}px)`,
                  opacity,
                  transition: transitionEnabled
                    ? 'clip-path 900ms cubic-bezier(0.4,0,0.2,1), opacity 900ms ease'
                    : 'none',
                }}
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  style={{
                    objectFit: 'cover',
                    transform:  isCenter ? 'scale(1)' : 'scale(1.1)',
                    transition: transitionEnabled
                      ? 'transform 900ms cubic-bezier(0.4,0,0.2,1)'
                      : 'none',
                  }}
                />

                {isMobile ? (
                  /* Bottom gradient + text block — sized to fit the full quote, however many lines it wraps to */
                  <div
                    className="absolute left-0 right-0 bottom-0 flex flex-col"
                    style={{
                      padding:    `${20.68 * mobileScale}px ${12.05 * mobileScale}px ${16 * mobileScale}px`,
                      gap:        `${10 * mobileScale}px`,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.75) 55%, transparent 100%)',
                      transform:  `translateY(-${bottomTrimPx}px)`,
                      transition: transitionEnabled ? 'transform 900ms cubic-bezier(0.4,0,0.2,1)' : 'none',
                    }}
                  >
                    <p
                      className="text-white m-0"
                      style={{
                        fontFamily:    "var(--font-geist, 'Geist'), system-ui, sans-serif",
                        fontWeight:    500,
                        fontSize:      `${18.94 * mobileScale}px`,
                        lineHeight:    `${22.73 * mobileScale}px`,
                        letterSpacing: '0%',
                      }}
                    >
                      {item.quote}
                    </p>
                    <div className="flex items-center" style={{ gap: `${10 * mobileScale}px` }}>
                      <div className="flex-shrink-0 overflow-hidden" style={{ width: `${34 * mobileScale}px`, height: `${34 * mobileScale}px`, borderRadius: `${4 * mobileScale}px` }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.avatar} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <p className="m-0" style={{ fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif", fontWeight: 400, fontSize: `${15.84 * mobileScale}px`, lineHeight: `${24.11 * mobileScale}px`, color: '#FFFFFF', letterSpacing: '0%' }}>
                          {item.name}
                        </p>
                        <p className="m-0" style={{ fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif", fontWeight: 500, fontSize: `${11.19 * mobileScale}px`, lineHeight: `${16.53 * mobileScale}px`, color: '#FFFFFF', letterSpacing: '0%' }}>
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Bottom gradient */}
                    <div
                      style={{
                        position:   'absolute',
                        left: 0, right: 0, bottom: 0,
                        height:     '50%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
                        zIndex:     1,
                        pointerEvents: 'none',
                        transform:  `translateY(-${bottomTrimPx}px)`,
                        transition: transitionEnabled ? 'transform 900ms cubic-bezier(0.4,0,0.2,1)' : 'none',
                      }}
                    />

                    {/* Content */}
                    <div
                      style={{
                        position:      'absolute',
                        left: 0, bottom: 0,
                        width:         '100%',
                        padding:       `clamp(16px, 1.67vw, 24px)`,
                        display:       'flex',
                        flexDirection: 'column',
                        gap:           'clamp(16px, 1.67vw, 24px)',
                        zIndex:        2,
                        transform:     `translateY(-${bottomTrimPx}px)`,
                        transition:    transitionEnabled ? 'transform 900ms cubic-bezier(0.4,0,0.2,1)' : 'none',
                      }}
                    >
                      <p
                        style={{
                          fontFamily:       "var(--font-geist, 'Geist'), system-ui, sans-serif",
                          fontWeight:       500,
                          fontSize:         `${26.1 * scale}px`,
                          lineHeight:       1.4,
                          color:            '#FFFFFF',
                          margin:           0,
                          display:          '-webkit-box',
                          WebkitLineClamp:  2,
                          WebkitBoxOrient:  'vertical',
                          overflow:         'hidden',
                        }}
                      >
                        {item.quote}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: `${12 * scale}px` }}>
                        <div
                          style={{
                            position:     'relative',
                            width:        `${45 * scale}px`,
                            height:       `${45 * scale}px`,
                            borderRadius: `${5 * scale}px`,
                            overflow:     'hidden',
                            flexShrink:   0,
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.avatar} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <p style={{ fontFamily: "var(--font-geist,'Geist'),sans-serif", fontWeight: 600, fontSize: `${16 * scale}px`, lineHeight: 1.3, color: '#FFFFFF', margin: 0 }}>
                            {item.name}
                          </p>
                          <p style={{ fontFamily: "var(--font-geist,'Geist'),sans-serif", fontWeight: 400, fontSize: `${13 * scale}px`, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Left Arrow ──────────────────────────────────────────────── */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute z-20 flex items-center justify-center bg-[#334454] hover:bg-[#6B859E] transition-colors duration-300 border-none cursor-pointer"
          style={{
            width:        `${arrowSize}px`,
            height:       `${arrowSize}px`,
            borderRadius: `${7.11 * arrowScale}px`,
            top:          `${arrowTop}px`,
            left:         `${leftArrowLeft}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: `${18 * arrowScale}px`, height: `${18 * arrowScale}px` }}>
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* ── Right Arrow ─────────────────────────────────────────────── */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute z-20 flex items-center justify-center bg-[#334454] hover:bg-[#6B859E] transition-colors duration-300 border-none cursor-pointer"
          style={{
            width:        `${arrowSize}px`,
            height:       `${arrowSize}px`,
            borderRadius: `${7.11 * arrowScale}px`,
            top:          `${arrowTop}px`,
            left:         `${rightArrowLeft}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: `${18 * arrowScale}px`, height: `${18 * arrowScale}px` }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── 3 — Learn More ──────────────────────────────────────────────── */}
      <div className="w-full flex justify-center" style={{ marginTop: 'clamp(10px, 1.39vw, 20px)' }}>
        <button
          className="group relative flex items-center border-none cursor-pointer overflow-hidden transition-colors duration-500 bg-[#6B859E] hover:bg-[#4a6074]"
          style={{
            width:        'clamp(118.6px, 11.6vw, 222.6px)',
            height:       'clamp(36.9px, 3.61vw, 69.3px)',
            borderRadius: 'clamp(8.5px, 0.83vw, 16px)',
          }}
        >
          {/* Sliding text */}
          <div
            style={{
              position:  'absolute',
              left:      'clamp(8.5px, 0.83vw, 16px)',
              top:       '50%',
              transform: 'translateY(-50%)',
              height:    'clamp(16.3px, 1.6vw, 30.6px)',
              overflow:  'hidden',
            }}
          >
            <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
              {['Learn More', 'Learn More'].map((label, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily:  "var(--font-geist, 'Geist'), system-ui, sans-serif",
                    fontWeight:  500,
                    fontSize:    'clamp(10.6px, 1.04vw, 20px)',
                    color:       '#FFFFFF',
                    height:      'clamp(16.3px, 1.6vw, 30.6px)',
                    display:     'flex',
                    alignItems:  'center',
                    whiteSpace:  'nowrap',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow box */}
          <div
            className="absolute transition-colors duration-500 overflow-hidden bg-white group-hover:bg-[#EDE7DE]"
            style={{
              right:        'clamp(8.5px, 0.83vw, 16px)',
              width:        'clamp(21.3px, 2.08vw, 40px)',
              height:       'clamp(21.3px, 2.08vw, 40px)',
              borderRadius: 'clamp(5px, 0.49vw, 9.3px)',
              top:          '50%',
              transform:    'translateY(-50%)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
              <svg width="clamp(10px, 0.97vw, 18.6px)" height="clamp(10px, 0.97vw, 18.6px)" viewBox="0 0 24 24" fill="none" stroke="#6B859E" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
              <svg width="clamp(10px, 0.97vw, 18.6px)" height="clamp(10px, 0.97vw, 18.6px)" viewBox="0 0 24 24" fill="none" stroke="#6B859E" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
