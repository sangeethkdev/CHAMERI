// 'use client';

// import React from 'react';
// import Image from 'next/image';

// const boardMembers = [
//   {
//     id: 1,
//     name: 'John Doe',
//     designation: 'Designation',
//     // Replace with the actual image path for the board members
//     image: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png',
//   },
//   {
//     id: 2,
//     name: 'John Doe',
//     designation: 'Designation',
//     image: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png',
//   },
//   {
//     id: 3,
//     name: 'John Doe',
//     designation: 'Designation',
//     image: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png',
//   },
//   {
//     id: 4,
//     name: 'John Doe',
//     designation: 'Designation',
//     image: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png',
//   },
// ];

// export default function AboutBoardSection() {
//   return (
//     <section
//       className="w-full flex flex-col"
//       style={{
//         backgroundColor: '#EDE7DE',
//         paddingTop: 'clamp(40px, 5.28vw, 76px)',
//         paddingBottom: 'clamp(40px, 5.28vw, 76px)',
//         paddingLeft: 'clamp(20px, 5.56vw, 80px)',
//         paddingRight: 'clamp(20px, 5.56vw, 80px)',
//         gap: 'clamp(20px, 2.78vw, 40px)', // Gap between header and cards
//       }}
//     >
//       {/* ── Header Row ──────────────────────────────────────────────────────── */}
//       <div
//         className="w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-start"
//         style={{
//           maxWidth: '1280px',
//           paddingLeft: 'clamp(0px, 0.69vw, 10px)',
//           paddingRight: 'clamp(0px, 0.69vw, 10px)',
//           gap: '20px',
//         }}
//       >
//         {/* Title */}
//         <h2
//           style={{
//             fontFamily: "var(--font-roundo, 'Roundo'), system-ui, sans-serif",
//             fontWeight: 500,
//             fontSize: 'clamp(32px, 4.17vw, 60px)',
//             lineHeight: 1.1,
//             letterSpacing: 'clamp(-1.5px, -0.21vw, -3.05px)',
//             color: '#1A1A1A',
//             maxWidth: '668px',
//             margin: 0,
//           }}
//         >
//           Elegant Spaces For Built Views Photo Frame
//         </h2>

//         {/* Pill Label */}
//         <div
//           style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: 'clamp(4px, 0.5vw, 7.2px)',
//             padding: 'clamp(4px, 0.38vw, 5.4px) clamp(6px, 0.5vw, 7.2px)',
//             borderRadius: '90px',
//             marginTop: 'clamp(0px, 1vw, 10px)', // Align slightly down if needed
//           }}
//         >
//           {/* Square Icon */}
//           <div
//             style={{
//               width: 'clamp(10px, 0.97vw, 14px)',
//               height: 'clamp(10px, 0.97vw, 14px)',
//               backgroundColor: '#334454',
//               borderRadius: '3px',
//               flexShrink: 0,
//             }}
//           />
//           {/* Text */}
//           <span
//             style={{
//               fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
//               fontWeight: 400,
//               fontSize: 'clamp(11px, 1.13vw, 16.2px)',
//               lineHeight: 1.2,
//               letterSpacing: '-0.32px',
//               textTransform: 'uppercase',
//               color: '#1A1A1A',
//               whiteSpace: 'nowrap',
//             }}
//           >
//             Board of Directors
//           </span>
//         </div>
//       </div>

//       {/* ── Cards Grid ──────────────────────────────────────────────────────── */}
//       <div
//         className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
//         style={{
//           maxWidth: '1260px',
//           gap: 'clamp(10px, 1.37vw, 19.77px)',
//           marginTop: 'clamp(20px, 2.78vw, 40px)',
//         }}
//       >
//         {boardMembers.map((member) => (
//           <div
//             key={member.id}
//             style={{
//               position: 'relative',
//               width: '100%',
//               aspectRatio: '300.17 / 394.47', // Maintains the proportion from Figma
//               borderRadius: 'clamp(6px, 0.63vw, 9.02px)',
//               overflow: 'hidden',
//             }}
//           >
//             {/* Image */}
//             <Image
//               src={member.image}
//               alt={member.name}
//               fill
//               style={{
//                 objectFit: 'cover',
//                 objectPosition: 'center',
//               }}
//             />

//             {/* Gradient Overlay for Text Readability */}
//             <div
//               style={{
//                 position: 'absolute',
//                 inset: 0,
//                 background:
//                   'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 25%, transparent 50%)',
//                 zIndex: 1,
//                 pointerEvents: 'none',
//               }}
//             />

//             {/* Text Content */}
//             <div
//               style={{
//                 position: 'absolute',
//                 bottom: '0',
//                 left: '0',
//                 width: '100%',
//                 paddingBottom: 'clamp(10px, 1.04vw, 15.04px)',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'flex-end',
//                 zIndex: 2,
//                 gap: 'clamp(4px, 0.47vw, 6.73px)',
//               }}
//             >
//               <h3
//                 style={{
//                   fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
//                   fontWeight: 400,
//                   fontSize: 'clamp(16px, 1.51vw, 21.8px)',
//                   lineHeight: 1.1,
//                   letterSpacing: '-0.06px',
//                   color: '#FFFFFF',
//                   margin: 0,
//                   textAlign: 'center',
//                 }}
//               >
//                 {member.name}
//               </h3>
//               <p
//                 style={{
//                   fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
//                   fontWeight: 400,
//                   fontSize: 'clamp(10px, 0.88vw, 12.6px)',
//                   lineHeight: 1.1,
//                   letterSpacing: '0px',
//                   color: '#FFFFFF',
//                   margin: 0,
//                   textAlign: 'center',
//                 }}
//               >
//                 {member.designation}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// -----------------------------------------

'use client';

import React from 'react';
import Image from 'next/image';

/**
 * Design baseline  : 1440px  (3xl)
 * Viewport range   : 375px – 1920px
 * clamp() formula  : clamp(MIN, VALUE÷1440×100vw, MAX)
 *
 * Every sizing property (padding, gap, margin, font-size, border-radius,
 * width, height, letter-spacing …) uses clamp() so the section scales
 * fluidly across the full viewport range.
 *
 * Card font-size floors are raised above the vw-computed value so text
 * remains legible when cards are narrow (4-col @ 1024px → ~228px card).
 */

const STATIC_BOARD = [
  { id: 1, name: 'John Doe', designation: 'Designation', image: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png' },
  { id: 2, name: 'John Doe', designation: 'Designation', image: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png' },
  { id: 3, name: 'John Doe', designation: 'Designation', image: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png' },
  { id: 4, name: 'John Doe', designation: 'Designation', image: '/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png' },
];

export default function AboutBoardSection({ boardSection }) {
  const boardMembers = boardSection
    ? ['first', 'second', 'third', 'fourth'].map((key, i) => ({
        id: i + 1,
        name: boardSection[key]?.name || STATIC_BOARD[i].name,
        designation: boardSection[key]?.designation || STATIC_BOARD[i].designation,
        image: boardSection[key]?.image || STATIC_BOARD[i].image,
      }))
    : STATIC_BOARD;

  const title = boardSection?.title;

  return (
    <>
      <style>{`
        .board-mobile { display: none !important; }
        @media (max-width: 767px) {
          .board-desktop { display: none !important; }
          .board-mobile  { display: block !important; }
        }
      `}</style>

      <MobileBoardSection boardMembers={boardMembers} title={title} />

    <section
      className="w-full flex flex-col board-desktop"
      style={{
        backgroundColor: '#EDE7DE',

        /*
         * Section vertical padding
         * Design : 76px @ 1440 → 76÷1440×100 = 5.28vw
         */
        paddingTop:    'clamp(24px, 5.28vw, 76px)',
        paddingBottom: 'clamp(24px, 5.28vw, 76px)',

        /*
         * Section horizontal padding
         * Design : 80px @ 1440 → 80÷1440×100 = 5.56vw
         */
        paddingLeft:  'clamp(20px, 5.56vw, 80px)',
        paddingRight: 'clamp(20px, 5.56vw, 80px)',

        /*
         * Section gap — header row ↔ cards grid
         * Design : 40px @ 1440 → 2.78vw
         */
        gap: 'clamp(24px, 2.78vw, 40px)',
      }}
    >

      {/* ── Header Row ────────────────────────────────────────────────────── */}
      <div
        className="w-full mx-auto flex flex-col md:flex-row md:justify-between md:items-start"
        style={{
          /*
           * maxWidth — inner content boundary
           * Design : 1280px (hard cap, no fluid scaling needed)
           */
          maxWidth: 'clamp(280px, 89vw, 1920px)',

          /*
           * Optical inner padding
           * Design : 10px @ 1440 → 0.694vw
           */
          paddingLeft:  'clamp(0px, 0.69vw, 10px)',
          paddingRight: 'clamp(0px, 0.69vw, 10px)',

          /*
           * Gap — title ↔ pill
           * Design : 20px @ 1440 → 1.39vw
           */
          gap: 'clamp(12px, 1.39vw, 20px)',
        }}
      >

        {/* ── Title ──────────────────────────────────────────────────────── */}
        <h2
          style={{
            fontFamily: "var(--font-roundo, 'Roundo'), system-ui, sans-serif",
            fontWeight: 500,

            /*
             * fontSize
             * Design : 60px @ 1440 → 4.17vw
             * Floor  : 26px (legible at 375px mobile)
             */
            fontSize: 'clamp(26px, 4.17vw, 80px)',

            lineHeight: 1.1,

            /*
             * letterSpacing (negative)
             * Design : -3.05px @ 1440 → -0.212vw
             * clamp for negative: most-negative = min, least-negative = max
             */
            letterSpacing: 'clamp(-3.05px, -0.212vw, -1.2px)',

            color: '#1A1A1A',

            /*
             * maxWidth — title line-length cap
             * Design : 668px @ 1440 → 46.39vw
             * Floor  : 260px
             */
            maxWidth: 'clamp(260px, 46.39vw, 850px)',
            margin: 0,
          }}
        >
          {title || 'Elegant Spaces For Built Views Photo Frame'}
        </h2>

        {/* ── Pill Label ─────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            flexShrink: 0,

            /*
             * gap — icon ↔ text
             * Design : 7.2px @ 1440 → 0.5vw
             */
            gap: 'clamp(4px, 0.5vw, 7.2px)',

            /*
             * Pill padding
             * Vertical  : 5.4px @ 1440 → 0.375vw
             * Horizontal: 7.2px @ 1440 → 0.5vw
             */
            padding: 'clamp(3px, 0.38vw, 5.4px) clamp(4px, 0.5vw, 7.2px)',

            /*
             * borderRadius
             * Design : 90px (fully rounded pill — hard cap is fine)
             */
            borderRadius: 'clamp(40px, 6.25vw, 90px)',

            /*
             * marginTop — optical alignment to title cap-height in row layout
             * Collapses to 0 on mobile (stacked layout)
             */
            marginTop: 'clamp(0px, 1vw, 10px)',
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
            Board of Directors
          </span>
        </div>
      </div>

      {/* ── Cards Grid ────────────────────────────────────────────────────── */}
      {/*
       * Column layout:
       *   < sm  (< 640px)  : 1 col
       *   sm–lg (640–1023px): 2 cols
       *   ≥ lg  (≥ 1024px) : 4 cols
       *
       * Effective card widths at key breakpoints:
       *   375px  1-col : ~335px
       *   640px  2-col : ~295px
       *   768px  2-col : ~354px
       *   1024px 4-col : ~228px   ← drives font floor decisions
       *   1440px 4-col : ~300px   ← design baseline
       *   1920px 4-col : ~437px
       */}
      <div
        className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{
          /*
           * maxWidth — grid boundary
           * Design : 1260px
           */
          // maxWidth: 'clamp(300px, 100vw, 1920px)',


          /*
           * gap — between cards
           * Design : 19.77px @ 1440 → 1.373vw
           */
          gap: 'clamp(8px, 2vw, 12px)',

          /*
           * marginTop — extra header ↔ grid separation
           * Design : ~20px @ 1440 → 1.39vw
           */
          marginTop: 'clamp(8px, 1.39vw, 20px)',
        }}
      >
        {boardMembers.map((member) => (
          <div
            key={member.id}
            className="group"
            style={{
              position: 'relative',
              // width: 'clamp(400px, 10vw, 1290px)',
              // width: 'clamp(100px, 80vw, 1920px)',

              /*
               * aspectRatio — portrait proportion from Figma
               * 300.17 ÷ 394.47 ≈ 0.761
               */
              aspectRatio: '300.17 / 394.47',

              /*
               * borderRadius
               * Design : 9.02px @ 1440 → 0.626vw
               */
              borderRadius: 'clamp(6px, 0.63vw, 9px)',
              overflow: 'hidden',
            }}
          >
            {/* Card image */}
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="transition-transform duration-700 ease-in-out group-hover:scale-105"
              style={{
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />

            {/* Bottom-heavy gradient overlay for text legibility */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 30%, transparent 55%)',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />

            {/* ── Card text block ───────────────────────────────────────── */}
            {/*
             * FONT SIZE RATIONALE — vw is viewport-relative, not card-relative.
             *
             * Name  : Design = 21.8px @ 1440 → 1.514vw
             *   1024px (4-col, ~228px card) → 15.5px → floor governs → 16px
             *
             * Designation : Design = 12.6px @ 1440 → 0.875vw
             *   1024px → 8.96px → floor governs → 11px
             */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',

                /*
                 * paddingBottom
                 * Design : 15.04px @ 1440 → 1.044vw
                 */
                paddingBottom: 'clamp(10px, 1.04vw, 15px)',

                /*
                 * paddingLeft / Right
                 * Design : 12px @ 1440 → 0.833vw
                 */
                paddingLeft:  'clamp(8px, 0.83vw, 12px)',
                paddingRight: 'clamp(8px, 0.83vw, 12px)',

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 2,

                /*
                 * gap — name ↔ designation
                 * Design : 6.73px @ 1440 → 0.467vw
                 */
                gap: 'clamp(4px, 0.47vw, 7px)',
              }}
            >
              {/* Name */}
              <h3
                style={{
                  fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
                  fontWeight: 400,

                  /*
                   * fontSize
                   * Design : 21.8px @ 1440 → 1.514vw
                   * Floor  : 16px (legible on ~228px card @ 1024px)
                   */
                  fontSize: 'clamp(16px, 1.514vw, 31.8px)',

                  lineHeight: 1.15,

                  /*
                   * letterSpacing
                   * Design : -0.06px — fixed; negligible
                   */
                  letterSpacing: '-0.06px',

                  color: '#FFFFFF',
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                {member.name}
              </h3>

              {/* Designation */}
              <p
                style={{
                  fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
                  fontWeight: 400,

                  /*
                   * fontSize
                   * Design : 12.6px @ 1440 → 0.875vw
                   * Floor  : 11px (minimum legible on narrow cards)
                   */
                  fontSize: 'clamp(11px, 0.875vw, 16.6px)',

                  lineHeight: 1.2,
                  letterSpacing: '0px',
                  color: '#FFFFFF',
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                {member.designation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}

/* ── Mobile (≤767px) version ─────────────────────────────────────────
   Design baseline: 390 × 666.22.
   Section: padding 48/16/20/16, gap 4.73.
   Header: pill (icon + "BOARD OF DIRECTORS") above the heading, gap 10.
   Grid: 2 × 2 cards, row-gap 11.95, column-gap 10.57, full-bleed
   (breaks out of the section's 16px side padding). */
function MobileBoardSection({ boardMembers, title }) {
  return (
    <section
      className="board-mobile"
      style={{
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#EDE7DE',
        paddingTop: 48,
        paddingRight: 16,
        paddingBottom: 20,
        paddingLeft: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 4.73,
      }}
    >
      {/* ── Header: pill + heading ───────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7.2,
            paddingLeft: 7.2,
            paddingRight: 7.2,
            height: 20,
            borderRadius: 90,
            flexShrink: 0,
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
              fontSize: 12,
              lineHeight: '19.44px',
              letterSpacing: '-0.32px',
              textTransform: 'uppercase',
              color: '#000000',
              whiteSpace: 'nowrap',
            }}
          >
            Board of Directors
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-roundo,'Roundo'),system-ui,sans-serif",
            fontWeight: 500,
            fontSize: 32,
            lineHeight: '36.6px',
            letterSpacing: '-0.73px',
            color: '#000000',
            margin: 0,
          }}
        >
          {title || 'Elegant Spaces For Built Views Photo Frame'}
        </h2>
      </div>

      {/* ── Cards grid: full-bleed, breaks out of the 16px side padding ── */}
      <div
        style={{
          marginLeft: -16,
          marginRight: -16,
          padding: 10,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            rowGap: 11.95,
            columnGap: 10.57,
          }}
        >
          {boardMembers.map((member) => (
            <div
              key={member.id}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '174.72 / 229.60',
                borderRadius: 5.24,
                overflow: 'hidden',
              }}
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />

              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(0deg, #000000 0%, rgba(0,0,0,0) 39%)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />

              {/* Text block */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  paddingTop: 4.37,
                  paddingBottom: 8.74,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2.94,
                  zIndex: 2,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-inter,'Inter'),system-ui,sans-serif",
                    fontWeight: 400,
                    fontSize: 12,
                    lineHeight: '10.48px',
                    letterSpacing: '-0.03px',
                    color: '#FFFFFF',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter,'Inter'),system-ui,sans-serif",
                    fontWeight: 400,
                    fontSize: 6.5,
                    lineHeight: '6.11px',
                    letterSpacing: '0px',
                    color: '#FFFFFF',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  {member.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
