/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ProjectListHero
 * ─────────────────────────────────────────────────────────────────────────────
 * Baseline viewport : 1440px  (design canvas: 1440 × 746)
 * Fluid range       : 375px → 1920px
 *
 * clamp() formula
 *   vw_value = (DESIGN_PX / 1440) × 100
 *   result   = clamp(MOBILE_FLOOR, vw_value vw, DESKTOP_CEIL)
 *
 * Position (top/left) of the heading is expressed as a percentage of the
 * section's own width/height, so it scales in lockstep with the section
 * even though the section's height itself is clamp()-driven.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Image from 'next/image';
import NewNavbar from '@/components/common/NewNavbar';

export default function ProjectListHero({ hero }) {
  const heading = hero?.heading || "Let's Build Your Dream\nSomething More Exceptional.";
  const image = hero?.image || '/dummyimages/e273958d502607f06d62edd61792f48b69b84f3e.jpg';

  return (
    <>
      <NewNavbar />

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE — iPhone 13/14 (390px) baseline
          Figma: w:390 h:725 bg image, heading positioned like desktop (~41% down)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="flex md:hidden relative w-full overflow-hidden z-50"
        style={{ height: '725px' }}
      >
        {/* ── BACKGROUND IMAGE ───────────────────────────────────────────── */}
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-10"
        />

        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0 w-full h-full -z-10"
          style={{
            background:
              'linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 48.75%, rgba(102,102,102,0) 100%)',
          }}
        />

        {/* ── HEADING — Figma: w:298.41 h:168  Roundo 500 38px/42px ls:-2px */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '41.086%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '268.41px',
            maxWidth: 'calc(100% - 36px)',
            textAlign: 'center',
          }}
        >
          <h1
            className="whitespace-pre-wrap font-roundo"
            style={{
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
            {heading}
          </h1>
        </div>
      </section>

      {/* ── DESKTOP ──────────────────────────────────────────────────────────── */}
      <div className="hidden md:block">
      <section
        className="relative w-full overflow-hidden z-50"
        style={{ height: 'clamp(390px, 51.806vw, 996px)' }}
      >
        {/* ── BACKGROUND IMAGE ───────────────────────────────────────────── */}
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-10"
        />

        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              'linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 48.75%, rgba(102,102,102,0) 100%)',
          }}
        />

        {/* ── HEADING
         * Figma: w:619  h:133  top:306.5  left:411  (centered)
         * top   = 306.5/746  = 41.086%
         * width = 619/1440   = 42.986vw
         */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '41.086%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(300px, 42.986vw, 619px)',
            textAlign: 'center',
          }}
        >
          <h1
            className="whitespace-pre-wrap font-roundo font-medium"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(26px, 3.472vw, 50px)',
              lineHeight: 'clamp(34px, 4.593vw, 66.14px)',
              letterSpacing: 'clamp(-3.05px, -0.212vw, -1.2px)',
              textAlign: 'center',
              color: '#ffffff',
              margin: 0,
              padding: 0,
              textShadow: '0 2px 16px rgba(0,0,0,0.25)',
            }}
          >
            {heading}
          </h1>
        </div>
      </section>
      </div>
    </>
  );
}
