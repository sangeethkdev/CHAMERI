// 'use client';

// import React, { useRef, useEffect, useState } from 'react';
// import Image from 'next/image';

// // ─── Card data ─────────────────────────────────────────────────────────────
// const cards = [
//   {
//     label: 'Vision',
//     image: '/dummyimages/7bceb1a3a08e49797c18d0a236cd66cd0abf999b.png',
//     heading: 'Each project tells its own story of\u00a0precision.',
//     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.it, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
//   },
//   {
//     label: 'Mission',
//     image: '/dummyimages/8276099377b328194b10337a1dc6e4999a4103d5.png',
//     heading: 'Each project tells its own story of\u00a0precision.',
//     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.it, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
//   },
// ];

// /**
//  * AboutVisionMissionSection
//  *
//  * Two-card sticky scroll experience matching the Figma design.
//  * Design baseline: 1440 × 610 px
//  *
//  * Mechanism:
//  *  – Wrapper = 200vh tall (creates scroll track)
//  *  – Sticky div = 100vh (stays pinned while user scrolls)
//  *  – Card 1: auto-expands to full-bleed after 2s on screen entry
//  *  – Card 2: directly manipulates transform/top via scroll listener (no React state)
//  *            to guarantee smooth, lag-free animation
//  */
// export default function AboutVisionMissionSection() {
//   const wrapperRef   = useRef(null);
//   const card1Ref     = useRef(null);
//   const card2Ref     = useRef(null);
//   const [card1Phase, setCard1Phase] = useState('initial'); // 'initial' | 'expanded'
//   const hasAutoExpanded = useRef(false);
//   const timerRef = useRef(null);

//   // ── Card 1: auto-expand after 2 s ──────────────────────────────────────
//   useEffect(() => {
//     const el = wrapperRef.current;
//     if (!el) return;

//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !hasAutoExpanded.current) {
//           hasAutoExpanded.current = true;
//           timerRef.current = setTimeout(() => setCard1Phase('expanded'), 2000);
//         }
//       },
//       { threshold: 0.15 }
//     );
//     obs.observe(el);

//     return () => {
//       obs.disconnect();
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, []);

//   // ── Card 2: directly drive top position from scroll ─────────────────────
//   // This bypasses React state batching entirely to ensure the animation fires.
//   useEffect(() => {
//     const onScroll = () => {
//       const wrapper = wrapperRef.current;
//       const card2   = card2Ref.current;
//       if (!wrapper || !card2) return;

//       const rect    = wrapper.getBoundingClientRect();
//       const vh      = window.innerHeight;

//       // How many px the user has scrolled into the wrapper's scroll track.
//       // rect.top starts at 0 (section just entered viewport top),
//       // goes negative as user scrolls.
//       const scrolledIn = Math.max(0, -rect.top);
//       const trackLen   = wrapper.offsetHeight - vh; // 200vh - 100vh = 100vh

//       if (trackLen <= 0) return;

//       // progress: 0 (start) → 1 (end of track)
//       const progress = Math.min(1, scrolledIn / trackLen);

//       // Card 2 slides from +100vh to 0 as progress goes 0 → 1
//       // We start the slide at progress = 0.25 and complete at 0.75
//       const slideProgress = Math.max(0, Math.min(1, (progress - 0.25) / 0.5));

//       // translateY: from 100vh (off-screen below) to 0 (fully visible)
//       const translateY = (1 - slideProgress) * 100; // percent of its own height
//       card2.style.transform = `translateY(${translateY}%)`;
//     };

//     window.addEventListener('scroll', onScroll, { passive: true });
//     // Run on mount in case the page is already mid-scroll
//     onScroll();
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const card1Expanded = card1Phase === 'expanded';

//   return (
//     /*
//      * Outer wrapper: 200vh scroll track.
//      * Uses 100vw + negative margin to break out of any parent padding
//      * so the sticky div can render true edge-to-edge.
//      */
//     <div
//       ref={wrapperRef}
//       style={{
//         position: 'relative',
//         height: '200vh',
//         width: '100vw',
//         marginLeft: 'calc(-1 * ((100vw - 100%) / 2))',
//         backgroundColor: '#EDE7DE',
//       }}
//     >
//       {/* ── Sticky viewport ─────────────────────────────────────────────── */}
//       <div
//         style={{
//           position: 'sticky',
//           top: 0,
//           width: '100%',
//           height: '100vh',
//           backgroundColor: '#EDE7DE',
//           overflow: 'hidden',
//         }}
//       >

//         {/* ── Header: ■ VISION & MISSION ───────────────────────────────── */}
//         {/*
//          * Design at 1440px:
//          *   top: 20px → 1.39vw
//          *   left: 51px → 3.54vw
//          *   Pill: gap:7.2px, px:7.2px, br:90px, h:20px
//          *   Icon: 14×14, bg:#334454, br:3px
//          *   Text: Geist 400, 16.2px, ls:-0.32px, uppercase
//          */}
//         <div
//           style={{
//             position: 'absolute',
//             top: 'clamp(14px, 1.39vw, 24px)',
//             left: 'clamp(28px, 3.54vw, 64px)',
//             zIndex: 30,
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: 'clamp(4px, 0.5vw, 7.2px)',
//             height: 'clamp(16px, 1.39vw, 20px)',
//           }}
//         >
//           <div
//             style={{
//               width: 'clamp(10px, 0.97vw, 14px)',
//               height: 'clamp(10px, 0.97vw, 14px)',
//               backgroundColor: '#334454',
//               borderRadius: '3px',
//               flexShrink: 0,
//             }}
//           />
//           <span
//             style={{
//               fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
//               fontWeight: 400,
//               fontSize: 'clamp(11px, 1.125vw, 16.2px)',
//               lineHeight: '19.44px',
//               letterSpacing: '-0.32px',
//               textTransform: 'uppercase',
//               color: '#1A1A1A',
//               whiteSpace: 'nowrap',
//             }}
//           >
//             Vision &amp; Mission
//           </span>
//         </div>

//         {/* ── Card 1 — Vision ─────────────────────────────────────────────
//          * Initial  : inset from all four edges (matches Figma "before expand")
//          *   top ~44px, left ~52px, width & height reduced
//          * Expanded : full-bleed (top:0, left:0, w:100%, h:100%)
//          * Uses CSS transition on all positional properties.
//          */}
//         <div
//           ref={card1Ref}
//           style={{
//             position: 'absolute',
//             top:    card1Expanded ? '0' : 'clamp(40px, 3.06vw, 44px)',
//             left:   card1Expanded ? '0' : 'clamp(20px, 3.61vw, 52px)',
//             width:  card1Expanded ? '100%' : 'calc(100% - clamp(40px, 7.22vw, 104px))',
//             height: card1Expanded ? '100%' : 'calc(100% - clamp(50px, 4.17vw, 60px))',
//             zIndex: 10,
//             overflow: 'hidden',
//             borderRadius: card1Expanded ? '0px' : '8px',
//             transition: [
//               'top    0.9s cubic-bezier(0.22,1,0.36,1)',
//               'left   0.9s cubic-bezier(0.22,1,0.36,1)',
//               'width  0.9s cubic-bezier(0.22,1,0.36,1)',
//               'height 0.9s cubic-bezier(0.22,1,0.36,1)',
//               'border-radius 0.9s ease',
//             ].join(', '),
//           }}
//         >
//           <Image
//             src={cards[0].image}
//             alt={cards[0].label}
//             fill
//             style={{ objectFit: 'cover', objectPosition: 'center' }}
//             priority
//           />
//           <Overlay />
//           <CardTexts card={cards[0]} />
//         </div>

//         {/* ── Card 2 — Mission ────────────────────────────────────────────
//          * Starts off-screen at translateY(100%) (below the sticky div).
//          * The scroll handler moves it up by directly setting transform.
//          * Using transform: translateY instead of top/bottom for GPU acceleration.
//          */}
//         <div
//           ref={card2Ref}
//           style={{
//             position: 'absolute',
//             top: '0',
//             left: '0',
//             width: '100%',
//             height: '100%',
//             zIndex: 15,
//             overflow: 'hidden',
//             borderRadius: '0px',
//             transform: 'translateY(100%)', // initial: hidden below
//             /* No CSS transition — scroll handler drives this via direct style */
//             willChange: 'transform',
//           }}
//         >
//           <Image
//             src={cards[1].image}
//             alt={cards[1].label}
//             fill
//             style={{ objectFit: 'cover', objectPosition: 'center' }}
//             priority
//           />
//           <Overlay />
//           <CardTexts card={cards[1]} />
//         </div>

//       </div>
//     </div>
//   );
// }

// // ─── Gradient overlay ────────────────────────────────────────────────────────
// function Overlay() {
//   return (
//     <div
//       style={{
//         position: 'absolute',
//         inset: 0,
//         background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
//         zIndex: 1,
//         pointerEvents: 'none',
//       }}
//     />
//   );
// }

// // ─── CardTexts ───────────────────────────────────────────────────────────────
// /**
//  * Overlay texts using %-based positions relative to the expanded card.
//  *
//  * Baseline (1440 × 581.95 card):
//  *   Heading : top 313.1 / 581.95 = 53.80%, left  35.1 / 1440 = 2.44%
//  *   Body    : top 328.92 / 581.95 = 56.52%, left 912.78 / 1440 = 63.34%
//  *   Divider : top 451.69 / 581.95 = 77.61%, left  29.5 / 1440 = 2.05%
//  *   Label   : top 467.54 / 581.95 = 80.34%, left  39.88 / 1440 = 2.77%
//  *
//  * Card fills 100% of its container, so % positions scale automatically.
//  */
// function CardTexts({ card }) {
//   return (
//     <>
//       {/* Heading */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '53.80%',
//           left: '2.44%',
//           width: 'clamp(200px, 40.94vw, 590px)',
//           zIndex: 2,
//         }}
//       >
//         <h2
//           style={{
//             fontFamily: "var(--font-roundo,'Roundo'),system-ui,sans-serif",
//             fontWeight: 500,
//             fontSize: 'clamp(22px, 3.845vw, 55.38px)',
//             lineHeight: 1.1,
//             letterSpacing: 'clamp(-1.5px, -0.196vw, -2.82px)',
//             color: '#FFFFFF',
//             margin: 0,
//           }}
//         >
//           {card.heading}
//         </h2>
//       </div>

//       {/* Body text */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '56.52%',
//           left: '63.34%',
//           width: 'clamp(160px, 26.62vw, 384px)',
//           zIndex: 2,
//         }}
//       >
//         <p
//           style={{
//             fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
//             fontWeight: 400,
//             fontSize: 'clamp(11px, 1.281vw, 18.46px)',
//             lineHeight: 1.09,
//             letterSpacing: '-0.4px',
//             color: '#FFFFFF',
//             margin: 0,
//           }}
//         >
//           {card.body}
//         </p>
//       </div>

//       {/* Horizontal divider */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '77.61%',
//           left: '2.05%',
//           width: '95.9%',
//           height: 0,
//           borderTop: '0.92px solid rgba(255,255,255,0.8)',
//           zIndex: 2,
//         }}
//       />

//       {/* Card label ("VISION" / "MISSION") */}
//       <div style={{ position: 'absolute', top: '80.34%', left: '2.77%', zIndex: 2 }}>
//         <span
//           style={{
//             fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
//             fontWeight: 400,
//             fontSize: 'clamp(10px, 1.038vw, 14.95px)',
//             lineHeight: 1.2,
//             letterSpacing: '-0.3px',
//             color: '#FFFFFF',
//             textTransform: 'uppercase',
//           }}
//         >
//           {card.label}
//         </span>
//       </div>
//     </>
//   );
// }


// ----------------------------------------

'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

// ─── Card data ─────────────────────────────────────────────────────────────
const STATIC_CARDS = [
  {
    label: 'Vision',
    image: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png',
    heading: 'Each project tells its own story of\u00a0precision.',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.it, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
  },
  {
    label: 'Mission',
    image: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png',
    heading: 'Each project tells its own story of\u00a0precision.',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.it, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
  },
];

/**
 * AboutVisionMissionSection
 *
 * Breakpoint scale (from CSS vars):
 *   sm  : 640px
 *   md  : 768px
 *   lg  : 1024px
 *   xl  : 1280px
 *   2xl : 1536px
 *   3xl : 1440px  ← design baseline
 *   4xl : 1920px
 *
 * All clamp() values follow: clamp(mobile-min, fluid-vw, desktop-max)
 * Fluid midpoint is derived from (design-value / 1440) * 100vw.
 */
export default function AboutVisionMissionSection({ vision, mission }) {
  const cards = [
    {
      label:   vision?.title    || STATIC_CARDS[0].label,
      image:   vision?.image    || STATIC_CARDS[0].image,
      heading: vision?.heading  || STATIC_CARDS[0].heading,
      body:    vision?.subheading || STATIC_CARDS[0].body,
    },
    {
      label:   mission?.title    || STATIC_CARDS[1].label,
      image:   mission?.image    || STATIC_CARDS[1].image,
      heading: mission?.heading  || STATIC_CARDS[1].heading,
      body:    mission?.subheading || STATIC_CARDS[1].body,
    },
  ];

  const wrapperRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const sentinelRef = useRef(null);
  const [card1Phase, setCard1Phase] = useState('initial'); // 'initial' | 'expanded'
  const [expansionDone, setExpansionDone] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const hasAutoExpanded = useRef(false);
  const timerRef = useRef(null);

  // ── Card 1: auto-expand after 2 s ──────────────────────────────────────
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoExpanded.current) {
          hasAutoExpanded.current = true;
          timerRef.current = setTimeout(() => {
            setCard1Phase('expanded');
            // Transition takes 1.5s, wait for it to complete
            setTimeout(() => {
              setExpansionDone(true);
            }, 1500);
          }, 2000);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // ── Scroll Sentinel & Stacking State Listener ───────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (!sentinelRef.current) return;
      const rect = sentinelRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      setIsDark(rect.top <= viewportHeight / 2);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const card1Expanded = card1Phase === 'expanded';

  return (
    <>
    <style>{`
      .vm-mobile { display: none !important; }
      @media (max-width: 767px) {
        .vm-desktop { display: none !important; }
        .vm-mobile  { display: block !important; }
      }
    `}</style>

    <MobileVisionMissionSection cards={cards} />

    {/**
     * Outer wrapper: 200vh scroll track (totalCards * 100vh), full-bleed breakout.
     * negative margin trick keeps it edge-to-edge inside any padded parent.
     */}
    <div
      ref={wrapperRef}
      className="vm-desktop"
      style={{
        position: 'relative',
        height: '200vh',
        width: '100vw',
        marginLeft: 'calc(-1 * ((100vw - 100%) / 2))',
        backgroundColor: '#EDE7DE',
      }}
    >
      {/* ── Header pill (sticky over all stacked cards) ──────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '200vh',
          pointerEvents: 'none',
          zIndex: 30,
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 'clamp(6px, 0.59vw, 10px)',
              left: 'clamp(16px, 6.54vw, 130px)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'clamp(4px, 0.5vw, 8px)',
              height: 'clamp(16px, 1.39vw, 20px)',
              pointerEvents: 'auto',
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
            Vision &amp; Mission
          </span>
          </div>
        </div>
      </div>

      {/* ── Card 1 — Vision (Sticky Layer 1) ──────────────────────────── */}
      <div
        className="sticky top-0 flex items-center justify-center"
        style={{
          width: '100%',
          height: '100vh',
          zIndex: 1,
          overflow: 'hidden',
          backgroundColor: '#EDE7DE',
        }}
      >
        <div
          ref={card1Ref}
          style={{
            position: 'absolute',
            top: card1Expanded ? '3.5vw' : '8.983vw',
            left: card1Expanded ? '0' : '5vw',
            width: card1Expanded ? '100%' : '90vw',
            height: card1Expanded ? '100%' : '40.55vw',
            zIndex: 10,
            overflow: 'hidden',
            // borderRadius: card1Expanded ? '0px' : 'clamp(4px, 0.56vw, 8px)',
            transition: [
              'top           1.5s cubic-bezier(0.22,1,0.36,1)',
              'left          1.5s cubic-bezier(0.22,1,0.36,1)',
              'width         1.5s cubic-bezier(0.22,1,0.36,1)',
              'height        1.5s cubic-bezier(0.22,1,0.36,1)',
              'border-radius 1.5s ease',
            ].join(', ')
          }}
        >
          <Image
            src={cards[0].image}
            alt={cards[0].label}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <Overlay />
          <CardTexts card={cards[0]} showTexts={card1Expanded} />
        </div>
      </div>

      {/* ── Card 2 — Mission (Sticky Layer 2) ──────────────────────────── */}
      <div
        className="sticky top-0 flex items-center justify-center"
        style={{
          width: '100%',
          height: '95vh',
          top: '3.5vw',
          zIndex: 2,
          overflow: 'hidden',
          backgroundColor: '#EDE7DE',
          opacity: expansionDone ? 1 : 0,
          pointerEvents: expansionDone ? 'auto' : 'none',
          transition: 'opacity 0.6s ease',
        }}
      >
        <div
          ref={card2Ref}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: 15,
            overflow: 'hidden',
            borderRadius: '0px',
          }}
        >
          <Image
            src={cards[1].image}
            alt={cards[1].label}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <Overlay />
          <CardTexts card={cards[1]} showTexts={true} />
        </div>
      </div>

      {/* ── Scroll Sentinel (placed near the bottom) ─────────────────── */}
      <div
        ref={sentinelRef}
        style={{
          position: 'absolute',
          // bottom: '50vh',
          height: '1px',
          width: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
    </>
  );
}

/* ── Mobile (≤767px) version ─────────────────────────────────────────
   Design baseline: 390 × 610 per card.
   Same mechanism and timings as desktop:
   – 200vh scroll track, sticky 100vh layers
   – Card 1 auto-expands to full-bleed 2s after entering view
     (1.5s cubic-bezier(0.22,1,0.36,1)), texts fade in 0.6s later
   – Card 2 slides over Card 1 on scroll (sticky stacking),
     revealed only after Card 1's expansion completes */
function MobileVisionMissionSection({ cards }) {
  const wrapperRef = useRef(null);
  const [card1Phase, setCard1Phase] = useState('initial'); // 'initial' | 'expanded'
  const [expansionDone, setExpansionDone] = useState(false);
  const hasAutoExpanded = useRef(false);
  const timerRef = useRef(null);

  // ── Card 1: auto-expand after 2 s (same as desktop) ────────────────
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoExpanded.current) {
          hasAutoExpanded.current = true;
          timerRef.current = setTimeout(() => {
            setCard1Phase('expanded');
            setTimeout(() => {
              setExpansionDone(true);
            }, 1500);
          }, 2000);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const card1Expanded = card1Phase === 'expanded';

  return (
    <div
      ref={wrapperRef}
      className="vm-mobile"
      style={{
        position: 'relative',
        // 200vh scroll track (same as desktop): each 100vh sticky panel
        // gets a full viewport of dwell, so card 2 holds its final
        // position for a beat before the section releases to whatever
        // comes next — it doesn't get run over immediately.
        height: '200vh',
        width: '100vw',
        marginLeft: 'calc(-1 * ((100vw - 100%) / 2))',
        backgroundColor: '#EDE7DE',
      }}
    >
      {/* ── Header pill (sticky over all stacked cards) ─────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 30,
        }}
      >
        <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh' }}>
          <div
            style={{
              position: 'absolute',
              top: 11.58,
              left: 13.2,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7.2,
              paddingLeft: 7.2,
              paddingRight: 7.2,
              height: 20,
              borderRadius: 90,
              pointerEvents: 'auto',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: '#334454',
                borderRadius: 3,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
                fontWeight: 400,
                fontSize: 11,
                lineHeight: 1.2,
                letterSpacing: '-0.32px',
                textTransform: 'uppercase',
                color: '#1A1A1A',
                whiteSpace: 'nowrap',
              }}
            >
              Vision &amp; Mission
            </span>
          </div>
        </div>
      </div>

      {/* ── Card 1 — Vision (Sticky Layer 1) ────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          zIndex: 1,
          overflow: 'hidden',
          backgroundColor: '#EDE7DE',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: card1Expanded ? 40 : 60,
            left: card1Expanded ? 0 : 15,
            width: card1Expanded ? '100%' : 'calc(100% - 30px)',
            // Expanded fills 100% of the 100vh sticky panel (not a fixed
            // px value) so it always reaches the panel's exact bottom
            // edge, whatever the device's viewport height — this is what
            // keeps card 2 flush against it with no gap.
            height: card1Expanded ? '100%' : 780,
            zIndex: 10,
            overflow: 'hidden',
            // borderRadius: card1Expanded ? '0px' : '8px',
            transition: [
              'top           1.5s cubic-bezier(0.22,1,0.36,1)',
              'left          1.5s cubic-bezier(0.22,1,0.36,1)',
              'width         1.5s cubic-bezier(0.22,1,0.36,1)',
              'height        1.5s cubic-bezier(0.22,1,0.36,1)',
              'border-radius 1.5s ease',
            ].join(', '),
          }}
        >
          <Image
            src={cards[0].image}
            alt={cards[0].label}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <Overlay />
          <MobileCardTexts card={cards[0]} showTexts={card1Expanded} />
        </div>
      </div>

      {/* ── Card 2 — Mission (Sticky Layer 2) ───────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          zIndex: 2,
          overflow: 'hidden',
          // backgroundColor: '#EDE7DE',
          opacity: expansionDone ? 1 : 0,
          pointerEvents: expansionDone ? 'auto' : 'none',
          transition: 'opacity 0.6s ease',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 15,
            overflow: 'hidden',
          }}
        >
          <Image
            src={cards[1].image}
            alt={cards[1].label}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <Overlay />
          <MobileCardTexts card={cards[1]} showTexts={true} />
        </div>
      </div>
    </div>
  );
}

/* ── Mobile card text overlays ──────────────────────────────────────
   Positions from the 390 × 570 card spec (offsets relative to the
   card's own box; original spec offsets included the 39.81px gap
   above the card):
     Heading : top 301.78 → 52.9%, left 19.88
     Body    : top 385.88 → 67.7%, left 20, width 343
     Divider : top 529.98 → 92.9%, left 15, width 360
     Label   : top 539.82 → 94.7%, left 20
   Same fade/slide reveal + 0.6s delay as desktop CardTexts. */
function MobileCardTexts({ card, showTexts }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        opacity: showTexts ? 1 : 0,
        transform: showTexts ? 'translateY(0)' : 'translateY(12px)',
        transition: [
          'opacity   0.5s ease',
          'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
        ].join(', '),
        transitionDelay: showTexts ? '0.6s' : '0s',
        pointerEvents: 'none',
      }}
    >
      {/*
        Bottom-anchored flow stack: heading → body → divider → label.
        Elements stack in normal flow so text can never overlap, whatever
        the screen width. At 390px wide the sizes/gaps match the design
        spec; below that the fonts scale down fluidly via clamp().
      */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 40,
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: 12,
        }}
      >
        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-roundo,'Roundo'),system-ui,sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(22px, 8.2vw, 32px)',
            lineHeight: 1.145,
            letterSpacing: '-0.73px',
            color: '#FFFFFF',
            margin: '0 20px 10px',
            maxWidth: 350,
          }}
        >
          {card.heading}
        </h2>

        {/* Body text */}
        <p
          style={{
            fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(14px, 4.73vw, 18.46px)',
            lineHeight: 1.09,
            letterSpacing: '-0.4px',
            color: 'rgba(255,255,255,0.8)',
            margin: '0 20px 20px',
            maxWidth: 343.16,
          }}
        >
          {card.body}
        </p>

        {/* Horizontal divider */}
        <div
          style={{
            margin: '0 15px 10px',
            height: 0,
            borderTop: '0.92px solid #FFFFFF',
          }}
        />

        {/* Card label ("VISION" / "MISSION") */}
        <span
          style={{
            fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(12px, 3.6vw, 14px)',
            lineHeight: '17.94px',
            letterSpacing: '-0.3px',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            margin: '0 20px',
          }}
        >
          {card.label}
        </span>
      </div>
    </div>
  );
}

// ─── Gradient overlay ────────────────────────────────────────────────────────
function Overlay() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}

// ─── CardTexts ───────────────────────────────────────────────────────────────
/**
 * Text overlays for each card.
 *
 * Props:
 *   card       – { label, heading, body }
 *   showTexts  – boolean; when false the texts are opacity:0 and slightly
 *                translated down. Set to true to fade them in.
 *                Card 1 drives this from card1Expanded state.
 *                Card 2 always passes true.
 *
 * All positions are % of the card container (intrinsically fluid).
 * Baseline: 1440 × 581.95 px
 *
 *   Heading : top 53.80%, left 2.44%
 *   Body    : top 56.52%, left 63.34%
 *   Divider : top 77.61%, left 2.05%
 *   Label   : top 80.34%, left 2.77%
 */
function CardTexts({ card, showTexts }) {
  return (
    <>
      {/* Responsive body-column styles */}
      <style>{`
        .vm-body-text {
          position: absolute;
          top: 63%;
          left: 65%;
          width: clamp(140px, 28.67vw, 410px);
          z-index: 2;
        }
        @media (max-width: 640px) {
          .vm-body-text {
            top: 67%;
            left: 2.44%;
            width: 88%;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .vm-body-text {
            left: 55%;
            width: clamp(140px, 38vw, 320px);
          }
        }
      `}</style>

      {/*
       * Single wrapper drives ALL text visibility.
       * When showTexts = false  → opacity:0, translateY(12px)  (hidden below)
       * When showTexts = true   → opacity:1, translateY(0)     (fully visible)
       *
       * transitionDelay:0.6s lets the card expansion animation start first,
       * then the text fades in over 0.5s.
       */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          opacity: showTexts ? 1 : 0,
          transform: showTexts ? 'translateY(0)' : 'translateY(12px)',
          transition: [
            'opacity   0.5s ease',
            'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
          ].join(', '),
          transitionDelay: showTexts ? '0.6s' : '0s',
          pointerEvents: 'none',
        }}
      >
        {/* Heading */}
        <div
          style={{
            position: 'absolute',
            top: '58%',
            left: '6%',
            width: 'clamp(180px, 40.97vw, 600px)',
            zIndex: 2,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-roundo,'Roundo'),system-ui,sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(20px, 3.845vw, 62px)',
              lineHeight: 1.1,
              letterSpacing: 'clamp(-2.82px, -0.196vw, -1px)',
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            {card.heading}
          </h2>
        </div>

        {/* Body text */}
        <div className="vm-body-text">
          <p
            style={{
              fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(12px, 1.281vw, 21.46px)',
              lineHeight: 1.35,
              letterSpacing: '-0.4px',
              // marginBottom:'clamp(10px, 40vw, 520px)',
              marginTop:'clamp(-40px, -2vw, -30px)',
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            {card.body}
          </p>
        </div>

        {/* Horizontal divider */}
        <div
          style={{
            position: 'absolute',
            top: '82.61%',
            left: '5.9%',
            width: '84%',
            height: 0,
            borderTop: '0.92px solid rgba(255,255,255,0.8)',
            zIndex: 2,
          }}
        />

        {/* Card label ("VISION" / "MISSION") */}
        <div
          style={{
            position: 'absolute',
            top: '84.34%',
            left: '6%',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist,'Geist'),system-ui,sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(10px, 1.038vw, 17px)',
              lineHeight: 1.2,
              letterSpacing: '-0.3px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
            }}
          >
            {card.label}
          </span>
        </div>
      </div>
    </>
  );
}
