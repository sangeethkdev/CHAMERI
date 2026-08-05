// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';

// export default function ContactHero() {
//   return (
//     <section 
//       className="relative w-full flex items-center justify-center overflow-hidden"
//       style={{
//         height: 'clamp(500px, 55.69vw, 802px)', // 802/1440 = 55.69vw
//       }}
//     >
//       {/* Background Image & Gradient */}
//       <div className="absolute inset-0 w-full h-full -z-10">
//         <Image
//           src="/dummyimages/ChatGPT Image Jun 12, 2026, 11_00_29 AM 1.svg"
//           alt="Contact Hero Background"
//           fill
//           sizes="100vw"
//           className="object-cover object-[center_top]"
//           priority
//         />
//         {/* Gradients */}
//         <div 
//           className="absolute inset-0 w-full h-full"
//           style={{
//             background: `linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 48.75%, rgba(102, 102, 102, 0) 100%)`
//           }}
//         />
//       </div>

//       {/* STICKY LOGO LAYER (centered in Navbar placeholder) */}
//       {/* <div
//         className="absolute top-0 left-0 w-full pointer-events-none z-50 flex justify-center"
//         style={{
//           paddingTop: '14px', // Match navbar padding top
//         }}
//       >
//         <div style={{ height: '68.38px' }} className="flex items-center justify-center">
//           <Link
//             href="/"
//             className="pointer-events-auto flex flex-col items-center justify-center"
//             style={{
//               gap: '6px',
//             }}
//           >
//             <div style={{ position: 'relative', width: '34px', height: '38px' }}>
//               <Image src="/icons/logo (6).svg" alt="Chameri mark" fill sizes="40px" style={{ objectFit: 'contain' }} priority />
//             </div>
//             <div style={{ position: 'relative', width: '100px', height: '13px' }}>
//               <Image src="/icons/logo (7).svg" alt="CHAMERI" fill sizes="120px" style={{ objectFit: 'contain' }} priority />
//             </div>
//           </Link>
//         </div>
//       </div> */}

//       {/* Main Text */}
//       <div 
//         className="relative z-10 flex flex-col items-center text-center"
//         style={{
//           width: 'clamp(300px, 34.375vw, 495px)',
//         }}
//       >
//         <h1 
//           className="text-white whitespace-pre-wrap"
//           style={{
//             fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
//             fontWeight: 500,
//             fontSize: "clamp(32px, 3.47vw, 50px)",
//             lineHeight: "clamp(42px, 4.59vw, 66.14px)",
//             letterSpacing: "clamp(-1.5px, -0.21vw, -3.05px)",
//             margin: 0,
//             padding: 0
//           }}
//         >
//           {"Let's Create\nSomething Exceptional."}
//         </h1>
//       </div>
//     </section>
//   );
// }

// -----------------------------------

'use client';

import Image from 'next/image';
import Link from 'next/link';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ContactHero
 * ─────────────────────────────────────────────────────────────────────────────
 * Baseline viewport : 1440px  (3xl)
 * Fluid range       : 375px → 1920px
 *
 * clamp() formula
 *   vw_value = (DESIGN_PX / 1440) × 100
 *   result   = clamp(MOBILE_FLOOR, vw_value vw, DESKTOP_CEIL)
 *
 * Negative clamp (letter-spacing):
 *   Most-negative = min,  least-negative = max
 *
 * Design values @ 1440px:
 * ─────────────────────────────────────────────────────────────────────────────
 *  SECTION
 *    height        802px → 55.694vw    floor 420px   ceil 802px
 *
 *  TEXT CONTAINER
 *    width         495px → 34.375vw    floor 280px   ceil 495px
 *    gap (inner)    16px →  1.111vw    floor  10px   ceil  16px
 *
 *  H1
 *    fontSize       50px →  3.472vw    floor  26px   ceil  50px
 *    lineHeight   66.14px →  4.593vw   floor  34px   ceil  66.14px
 *    letterSpacing -3.05px → -0.212vw  (negative clamp)
 *      clamp(-3.05px, -0.212vw, -1.2px)
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function ContactHero() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE — iPhone 13/14 (390px) baseline
          Figma: w:390 h:725 pt/pb:50 gap:11, heading w:298.41 Roundo 500 38px/42px ls:-2px
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="flex md:hidden relative w-full overflow-hidden isolate"
        style={{ height: '725px' }}
      >
        {/* ── BACKGROUND IMAGE ───────────────────────────────────────────── */}
        <Image
          src="/dummyimages/ChatGPT Image Jun 12, 2026, 11_00_29 AM 1.svg"
          alt="Contact Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_top] -z-10"
        />

        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0 w-full h-full -z-10"
          style={{
            background:
              'linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 48.75%, rgba(102,102,102,0) 100%)',
          }}
        />

        {/* ── HEADING — vertically centered via the frame's pt/pb:50 padding */}
        <div
          className="flex flex-col items-center justify-center w-full pointer-events-none"
          style={{ paddingTop: '50px', paddingBottom: '50px', gap: '11px' }}
        >
          <h1
            className="whitespace-pre-wrap font-roundo"
            style={{
              width: '298.41px',
              maxWidth: 'calc(100% - 36px)',
              fontWeight: 500,
              fontSize: '38px',
              lineHeight: '42px',
              letterSpacing: '-2px',
              textAlign: 'center',
              textTransform: 'capitalize',
              color: '#FFFFFF',
              margin: 0,
              padding: 0,
              textShadow: '0 2px 16px rgba(0,0,0,0.25)',
            }}
          >
            {"Let's Build\nThe Perfect Home Together"}
          </h1>
        </div>
      </section>

      {/* ── DESKTOP ──────────────────────────────────────────────────────────── */}
      <div className="hidden md:block">
        {/*
         * ── SECTION ─────────────────────────────────────────────────────────────
         * height  802px → 55.694vw   floor 420px  ceil 802px
         *
         * Spot-check:
         *   375px  → 55.694vw = 208.8px → floor 420px ✓
         *   640px  → 55.694vw = 356.4px → floor 420px ✓
         *   754px  → 55.694vw = 420px   → fluid starts ✓
         *   1024px → 55.694vw = 570.3px → fluid ✓
         *   1280px → 55.694vw = 712.9px → fluid ✓
         *   1440px → 55.694vw = 802px   → ceil ✓
         *   1920px → ceil 802px          → ceil ✓
         */}
        <section
          className="relative w-full flex items-center justify-center overflow-hidden"
          style={{
            height: 'clamp(420px, 55.694vw, 1920px)',
          }}
        >

          {/* ── BACKGROUND LAYER ────────────────────────────────────────────────
           * Full-bleed — inherits section height via absolute inset-0.
           * No extra sizing needed; Image fill + inset-0 handles it.
           */}
          <div className="absolute inset-0 w-full h-full -z-10">
            <Image
              src="/dummyimages/ChatGPT Image Jun 12, 2026, 11_00_29 AM 1.svg"
              alt="Contact Hero Background"
              fill
              sizes="100vw"
              className="object-cover object-[center_top]"
              priority
            />

            {/* Gradient overlay — no sizing props, pure visual layer */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: `
                  linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
                  linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 48.75%, rgba(102,102,102,0) 100%)
                `,
              }}
            />
          </div>

          {/* ── MAIN TEXT CONTAINER ─────────────────────────────────────────────
           * width  495px → 34.375vw   floor 280px  ceil 495px
           *
           * Spot-check width:
           *   375px  → 34.375vw = 128.9px → floor 280px ✓
           *   640px  → 34.375vw = 220px   → floor 280px ✓
           *   815px  → 34.375vw = 280px   → fluid starts ✓
           *   1024px → 34.375vw = 352px   → fluid ✓
           *   1280px → 34.375vw = 440px   → fluid ✓
           *   1440px → 34.375vw = 495px   → ceil ✓
           *
           * gap between children (if any future items added)
           *   16px → 1.111vw   floor 10px  ceil 16px
           */}
          <div
            className="relative z-10 flex flex-col items-center text-center"
            style={{
              width: 'clamp(280px, 38.375vw, 895px)',
              gap:   'clamp(10px, 1.111vw, 16px)',
              marginBottom:'clamp(20px, 6.111vw, 150px)',
            }}
          >

            {/* ── H1 ────────────────────────────────────────────────────────────
             * fontSize       50px  →  3.472vw    floor 26px      ceil 50px
             * lineHeight   66.14px →  4.593vw    floor 34px      ceil 66.14px
             * letterSpacing -3.05px → -0.212vw   (negative clamp)
             *   Most-negative (-3.05px) = min
             *   Least-negative (-1.2px) = max
             *
             * Spot-check fontSize:
             *   375px  → 3.472vw = 13px   → floor 26px ✓
             *   640px  → 3.472vw = 22.2px → floor 26px ✓
             *   749px  → 3.472vw = 26px   → fluid starts ✓
             *   1024px → 3.472vw = 35.6px → fluid ✓
             *   1280px → 3.472vw = 44.4px → fluid ✓
             *   1440px → 3.472vw = 50px   → ceil ✓
             */}
            <h1
              className="text-white whitespace-pre-wrap font-roundo"
              style={{
                fontWeight:    500,
                fontSize:      'clamp(26px, 3.472vw, 70px)',
                lineHeight:    'clamp(34px, 4.493vw, 84.14px)',
                letterSpacing: 'clamp(-3.05px, -0.212vw, -1.2px)',
                margin:        0,
                padding:       0,
              }}
            >
              {"Let's Build\nThe Perfect Home Together"}
            </h1>
          </div>
        </section>
      </div>
    </>
  );
}
