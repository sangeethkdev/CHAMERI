'use client';

import React, { useRef, useState, useEffect } from 'react';

const HEADING_WORDS = [
  "We're", "create", "luxury", "trusted", "modern", "builders",
  "creating", "timeless", "spaces", "for", "future", "through", "smart",
  "we", "build", "modern", "luxury", "homes", "with", "trusted", "the",
  "design", "craft", "every", "detail", "matters", "day", "move", "choice.",
];

const MOBILE_HEADING_TEXT =
  "Since 1985, we have built residential and commercial work with founder leadership and in house execution. Over 40 years one principle guides us: A home where life can take root, and become entirely and truly yours. That is our promise";
const MOBILE_HEADING_WORDS = MOBILE_HEADING_TEXT.split(' ');

const DEFAULT_STATS = [
  { val: '30%', label: 'Lorem ipsum dolor' },
  { val: '20%', label: 'Lorem ipsum' },
  { val: '25%', label: 'Lorem ipsum dolor' },
  { val: '96%', label: 'Lorem ipsum dolor sit' },
];

const AboutSection = ({ aboutUs }) => {
  const STATS = aboutUs
    ? [
        { val: aboutUs.count1, label: aboutUs.count1Text },
        { val: aboutUs.count2, label: aboutUs.count2Text },
        { val: aboutUs.count3, label: aboutUs.count3Text },
        { val: aboutUs.count4, label: aboutUs.count4Text },
      ].filter((s) => s.val)
    : DEFAULT_STATS;
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
        paddingBottom: 'clamp(28px, 5.556vw, 80px)', // 80px @ 1440px
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
              className="bg-[#334454] rounded-[3px] flex-shrink-0"
              style={{
                width:   'clamp(10px, 0.972vw, 18px)', // 14px @ 1440px
                height:  'clamp(10px, 0.972vw, 18px)',
                padding: 'clamp(2px, 0.25vw, 3.6px)',  // 3.6px @ 1440px
              }}
            />
            {/* Label */}
            <span
              className="font-sans font-normal uppercase text-[#000000] tracking-[-0.32px] flex items-center justify-center"
              style={{
                fontSize:   'clamp(11px, 1.389vw, 20px)', // 16.2px @ 1440px
                lineHeight: '1.2',
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

        {/* ══════════════════════════════════════════════════════════════════
            STATS ROW — desktop/tablet (>= sm)
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="hidden sm:flex w-full flex-wrap md:flex-nowrap items-center justify-between"
          style={{
            paddingTop:    'clamp(14px, 1.875vw, 27px)',   // 27px   @ 1440px
            paddingBottom: 'clamp(14px, 1.875vw, 27px)',
            paddingLeft:   'clamp(10px, 1.389vw, 20px)',   // 20px   @ 1440px
            paddingRight:  'clamp(10px, 1.389vw, 20px)',   // 20px   @ 1440px
            minHeight:     'clamp(100px, 7.361vw, 106px)', // 106px  @ 1440px
            borderRadius:  'clamp(8px, 1vw, 14.4px)',      // 14.4px @ 1440px
            gap:           'clamp(16px, 2.222vw, 32px)',    // 32px   @ 1440px
          }}
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-start w-[45%] md:w-auto">
              {/* Stat value */}
              <span
                className="font-roundo font-medium text-[#192026]"
                style={{
                  fontSize:      'clamp(28px, 3.125vw, 45px)', // 45px @ 1440px
                  lineHeight:    '1',
                  letterSpacing: 'clamp(-0.5px, -0.063vw, -0.9px)',
                }}
              >
                {stat.val}
              </span>
              {/* Stat label */}
              <span
                className="font-sans font-normal text-[#333333] tracking-[-0.32px]"
                style={{
                  fontSize:   'clamp(12px, 1.111vw, 16px)', // 16px @ 1440px
                  lineHeight: 'clamp(16px, 1.35vw, 19.44px)',
                  marginTop:  'clamp(4px, 0.556vw, 8px)',   // 8px  @ 1440px
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            STATS GRID — mobile (< sm)
            Figma frame: 390×220  padding:27/19/27/19
              Inner: 338×166 gap:20, containing 2 rows (338×73, justify-between)
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="sm:hidden w-full"
          style={{
            paddingTop:    'clamp(25px, 6.923vw, 30px)',  /* 27/390 */
            paddingBottom: 'clamp(25px, 6.923vw, 30px)',
            paddingLeft:   'clamp(17px, 4.872vw, 21px)',   /* 19/390 */
            paddingRight:  'clamp(17px, 4.872vw, 21px)',
          }}
        >
          <div
            className="flex flex-col w-full"
            style={{
              maxWidth: '372px',
              gap:      'clamp(18px, 5.128vw, 22px)',   /* 20/390 */
            }}
          >
            {Array.from({ length: Math.ceil(STATS.length / 2) }, (_, row) => (
              <div key={row} className="w-full flex items-center justify-between">
                {STATS.slice(row * 2, row * 2 + 2).map((stat, i) => (
                  <div key={i} className="flex flex-col items-start">
                    <span
                      className="font-roundo font-medium text-[#1A1A1A]"
                      style={{
                        fontSize: 'clamp(28px, 3.125vw, 45px)',
                        lineHeight: '1',
                        letterSpacing: 'clamp(-0.5px, -0.063vw, -0.9px)',
                      }}
                    >
                      {stat.val}
                    </span>
                    <span
                      className="font-sans font-normal text-black/60 tracking-[-0.32px]"
                      style={{ fontSize: '13px', lineHeight: '1.35', marginTop: '6px' }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;

// -----------------------------------------------

// 'use client';

// import React, { useRef, useState, useEffect } from 'react';

// const HEADING_WORDS = [
//   "We're", "create", "luxury", "trusted", "modern", "builders",
//   "creating", "timeless", "spaces", "for", "future", "through", "smart",
//   "we", "build", "modern", "luxury", "homes", "with", "trusted", "the",
//   "design", "craft", "every", "detail", "matters", "day", "move", "choice.",
// ];

// const STATS = [
//   { val: '30%', label: 'Lorem ipsum dolor' },
//   { val: '20%', label: 'Lorem ipsum' },
//   { val: '25%', label: 'Lorem ipsum dolor' },
//   { val: '96%', label: 'Lorem ipsum dolor sit' },
// ];

// const AboutSection = () => {
//   const sectionRef = useRef(null);
//   const headingRef = useRef(null);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const el = headingRef.current;
//       if (!el) return;
//       const rect   = el.getBoundingClientRect();
//       const windowH = window.innerHeight || document.documentElement.clientHeight;
//       const start  = windowH * 0.55;
//       const end    = windowH * 0.05;
//       const raw    = (start - rect.top) / (start - end);
//       setProgress(Math.min(1, Math.max(0, raw)));
//     };
//     window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
//     window.addEventListener('resize', handleScroll);
//     handleScroll();
//     return () => {
//       window.removeEventListener('scroll', handleScroll, { capture: true });
//       window.removeEventListener('resize', handleScroll);
//     };
//   }, []);

//   const darkCount = Math.round(progress * HEADING_WORDS.length);

//   return (
//     <section
//       ref={sectionRef}
//       className="w-full bg-[#EDE7DE] flex flex-col items-center overflow-hidden"
//       style={{
//         paddingTop:    'clamp(28px, 5.556vw, 80px)',
//         paddingBottom: 'clamp(28px, 5.556vw, 80px)',
//       }}
//     >
//       <div
//         className="w-full mx-auto flex flex-col items-center"
//         style={{
//           paddingLeft:  'clamp(10px, 2.083vw, 30px)', // 30px @ 1440px (adjusted from 20px to account for removal of breakpoint-based padding)
//           paddingRight: 'clamp(10px, 2.083vw, 30px)',
//           maxWidth:     'clamp(675px, 100vw, 1920px)', // Caps at max content width
//         }}
//       >

//         {/* ══════════════════════════════════════════════════════════════════
//             ABOUT US HEADER (Top Row)
//         ══════════════════════════════════════════════════════════════════ */}
//         <div
//           className="w-full flex flex-col items-start justify-between gap-6"
//           style={{
//             maxWidth:      'clamp(375px, 100vw, 1920px)',
//             minHeight:     'clamp(160px, 22.847vw, 329px)',
//             paddingLeft:   'clamp(10px, 1.389vw, 20px)',
//             paddingRight:  'clamp(10px, 1.389vw, 20px)',
//             gap:           'clamp(20px, 4.167vw, 60px)', // Fluid gap that increases on larger screens
//           }}
//         >

//           {/* ── About Us Badge ───────────────────────────────────────────── */}
//           <div
//             className="flex items-center flex-shrink-0 rounded-full"
//             style={{
//               width:         'clamp(80px, 7.819vw, 112.6px)',
//               height:        'clamp(14px, 1.389vw, 20px)',
//               gap:           'clamp(4px, 0.5vw, 7.2px)',
//               paddingLeft:   'clamp(4px, 0.5vw, 7.2px)',
//               paddingRight:  'clamp(4px, 0.5vw, 7.2px)',
//               backgroundColor: 'transparent',
//               // border:        '1px solid #1A1A1A',
//             }}
//           >
//             {/* Dot */}
//             <div
//               className="bg-[#1A1A1A] rounded-sm flex-shrink-0"
//               style={{
//                 width:   'clamp(10px, 0.972vw, 14px)',
//                 height:  'clamp(10px, 0.972vw, 14px)',
//               }}
//             />
//             {/* Label */}
//             <span
//               className="font-sans font-normal uppercase text-[#1A1A1A]"
//               style={{
//                 fontSize:      'clamp(11px, 1.125vw, 16.2px)',
//                 lineHeight:    '1.2',
//                 letterSpacing: 'clamp(-0.5px, -0.063vw, -0.9px)',
//               }}
//             >
//               About Us
//             </span>
//           </div>

//           {/* ── Heading Text Box ─────────────────────────────────────────── */}
//           <div
//             className="w-full flex flex-col justify-start"
//             style={{
//               maxWidth:  'clamp(250px, 85vw, 970.91px)',
//               minHeight: 'clamp(80px, 20.833vw, 300px)',
//             }}
//           >
//             <h2
//               ref={headingRef}
//               className="font-roundo font-medium"
//               style={{
//                 fontSize:      'clamp(28px, 3.333vw, 48px)',
//                 lineHeight:    'clamp(34px, 4vw, 57.6px)',
//                 letterSpacing: 'clamp(-2px, -0.167vw, -4px)',
//                 textIndent:    'clamp(40px, 8.333vw, 120px)',
//                 margin:        '0',
//               }}
//             >
//               {HEADING_WORDS.map((word, i) => (
//                 <span
//                   key={i}
//                   className="transition-colors duration-300 inline"
//                   style={{
//                     color: i < darkCount ? '#334454' : '#6B7E8F',
//                   }}
//                 >
//                   {word}
//                   {i < HEADING_WORDS.length - 1 ? ' ' : ''}
//                 </span>
//               ))}
//             </h2>
//           </div>
//         </div>

//         {/* ══════════════════════════════════════════════════════════════════
//             STATS ROW
//         ══════════════════════════════════════════════════════════════════ */}
//         <div
//           className="w-full flex flex-wrap items-center justify-between"
//           style={{
//             paddingTop:    'clamp(14px, 1.875vw, 27px)',
//             paddingBottom: 'clamp(14px, 1.875vw, 27px)',
//             paddingLeft:   'clamp(10px, 1.389vw, 20px)',
//             paddingRight:  'clamp(10px, 1.389vw, 20px)',
//             minHeight:     'clamp(100px, 7.361vw, 106px)',
//             borderRadius:  'clamp(8px, 1vw, 14.4px)',
//             gap:           'clamp(16px, 3.125vw, 45px)', // Increased gap on larger screens
//           }}
//         >
//           {STATS.map((stat, i) => (
//             <div
//               key={i}
//               className="flex flex-col items-start"
//               style={{
//                 width: 'clamp(140px, 20vw, 280px)', // Fluid width for stat items
//               }}
//             >
//               {/* Stat value */}
//               <span
//                 className="font-roundo font-medium text-[#1A1A1A]"
//                 style={{
//                   fontSize:      'clamp(28px, 3.125vw, 45px)',
//                   lineHeight:    '1',
//                   letterSpacing: 'clamp(-0.5px, -0.063vw, -0.9px)',
//                 }}
//               >
//                 {stat.val}
//               </span>
//               {/* Stat label */}
//               <span
//                 className="font-sans font-normal text-black/60"
//                 style={{
//                   fontSize:      'clamp(12px, 1.111vw, 16px)',
//                   lineHeight:    'clamp(16px, 1.35vw, 19.44px)',
//                   letterSpacing: 'clamp(-0.32px, -0.032vw, -0.5px)',
//                   marginTop:     'clamp(4px, 0.556vw, 8px)',
//                 }}
//               >
//                 {stat.label}
//               </span>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default AboutSection;
