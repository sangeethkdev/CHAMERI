

// ------------------------------------------------


'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const STATIC_VILLAS = [
  { id: 1, name: 'VILLA 01',  location: 'Calicut , Kerala',       year: '2024', img: '/dummyimages/Frame 2121454280.png', alt: '/dummyimages/Container.png',           side: 'left'  },
  { id: 2, name: 'Villa 1',   location: 'Calicut, Kerala',        year: '2025', img: '/dummyimages/Container.png',        alt: '/dummyimages/Frame 2121454280.png',    side: 'right' },
  { id: 3, name: 'Villa No3', location: 'Calicut, Kerala',        year: '2025', img: '/dummyimages/Overlay.png',          alt: '/dummyimages/Frame 2121454280.png',    side: 'left'  },
  { id: 4, name: 'Villa No4', location: 'Calicut, Kerala',        year: '2024', img: '/dummyimages/Container.png',        alt: '/dummyimages/Frame 2121454280.png',    side: 'right' },
  { id: 5, name: 'Villa No5', location: 'Lorum Ipsum sit',        year: '2025', img: '/dummyimages/Overlay.png',          alt: '/dummyimages/Frame 2121454280.png',    side: 'right' },
  { id: 6, name: 'Villa No6', location: 'Lorum Ipsum sit consit', year: '2024', img: '/dummyimages/Frame 2121454280.png', alt: '/dummyimages/Overlay.png',             side: 'left'  },
  { id: 7, name: 'Villa No7', location: 'Lorum Ipsum consit',     year: '2023', img: '/dummyimages/Container.png',        alt: '/dummyimages/Frame 2121454280.png',    side: 'right' },
];

/**
 * Clamp helper — converts a pixel value designed at 1440px viewport
 * into a fluid clamp() expression.
 *
 * clamp(minPx, fluid vw, maxPx)
 *
 * The fluid value is:  value / 1440 * 100vw
 * Min is capped at ~320px (mobile), max is the design value (1440px).
 *
 * Usage:  style={{ fontSize: clamp(14, 20) }}
 *         → clamp(14px, 1.389vw, 20px)
 *
 * @param {number} min      - minimum pixel value (at ~320-640px viewport)
 * @param {number} design   - pixel value at 1440px (the Figma design width)
 * @param {number} [max]    - maximum pixel value (defaults to design value)
 */
const clamp = (min, design, max = design) =>
  `clamp(${min}px, ${((design / 1440) * 100).toFixed(4)}vw, ${max}px)`;

/** Maps an admin-selected project key to its live project page, falling
 * back to the general gallery when no project was chosen. */
const projectHref = (project) => {
  if (project === 'kiwano') return '/kiwano';
  if (project === 'kiwano-villament') return '/kiwano-villament';
  return '/gallery';
};

/**
 * Mobile gallery layout — Figma frame 390×1509.
 * top/left/width converted to percentages of that frame so the whole
 * staggered arrangement scales proportionally at any mobile viewport
 * (the frame itself is reproduced via aspect-ratio: 390/1509).
 *
 * villaIndex maps into VILLAS. VILLAS only ever has 5 entries (indices
 * 0-4) once a `gallery` prop is supplied (it's built from card1..card5),
 * so this must stay within 0-4 — it cannot assume the 7-item
 * STATIC_VILLAS fallback, or the last cards silently fail to render.
 */
/* Original Figma tops packed the cards tighter than the caption row (added
 * below each image in flow) actually needs, so adjacent cards nearly
 * touched. Tops below are shifted down by a cumulative gap (~27px at the
 * 390px design width, i.e. a healthy visible gap after every caption) and
 * re-normalized against the taller MOBILE_FRAME_HEIGHT below — see the
 * aspect-ratio wrapper that consumes these two together. */
const MOBILE_FRAME_HEIGHT = 1584;
const MOBILE_CARDS = [
  { key: 'v1', villaIndex: 1, top: 1.560,  left: 29.433, width: 64.778, ratio: 252.636 / 235.019 },
  { key: 'v2', villaIndex: 0, top: 19.791, left: 4.774,  width: 67.835, ratio: 264.556 / 240.114 },
  { key: 'v3', villaIndex: 2, top: 38.344, left: 12.108, width: 80.553, ratio: 314.156 / 266.170 },
  { key: 'v4', villaIndex: 3, top: 58.541, left: 6.595,  width: 53.554, ratio: 208.862 / 194.297 },
  { key: 'v5', villaIndex: 4, top: 74.199, left: 21.431, width: 72.983, ratio: 284.635 / 258.338 },
];

/* Purely decorative — the whole card (see ProjectCard below) is the actual
 * link, so this can't be an <a>/<Link> itself (anchors can't nest). */
const ViewProjectBtn = ({ position }) => (
  <div
    className="group/btn absolute z-50 flex items-center justify-center overflow-hidden shadow-sm opacity-0 invisible transition-[opacity,visibility,background-color] duration-500 bg-[#6B859E] group-hover:bg-white group-hover:opacity-100 group-hover:visible"
    style={{
      left:            position.x,
      top:             position.y,
      transform:       'translate(-50%, -50%)',
      width:           clamp(120, 161),
      height:          clamp(24, 31),
      borderRadius:    '4px',
    }}
  >
    <span
      className="absolute z-0 font-sans font-medium text-white transition-colors duration-500 group-hover:text-[#334454]"
      style={{ fontSize: clamp(10, 13) }}
    >
      View Project
    </span>

    {/* Left arrow box */}
    <div
      className="absolute z-20 overflow-hidden bg-[#334454]"
      style={{
        top:          clamp(4, 5.5),
        left:         clamp(5, 6.8),
        width:        clamp(15, 20),
        height:       clamp(15, 20),
        borderRadius: '4.4px',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover/btn:-translate-x-full">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EDE7DE" strokeWidth="2.5" className="rotate-180">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out translate-x-full group-hover/btn:translate-x-0">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EDE7DE" strokeWidth="2.5" className="rotate-180">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>

    {/* Right arrow box */}
    <div
      className="absolute z-20 overflow-hidden bg-[#334454]"
      style={{
        top:          clamp(4, 5.9),
        right:        clamp(5, 6.8),
        width:        clamp(15, 20),
        height:       clamp(15, 20),
        borderRadius: '4.4px',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover/btn:translate-x-full">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EDE7DE" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out -translate-x-full group-hover/btn:translate-x-0">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EDE7DE" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
);

/** Reusable caption row under each project image */
const Caption = ({ villa, gap = 3.31 }) => (
  <div className="flex justify-between items-center" style={{ marginTop: clamp(10, 15) }}>
    <div className="flex items-center" style={{ gap: clamp(2, gap) }}>
      <span className="font-geist text-[#000000]" style={{ fontSize: clamp(11, 14), lineHeight: '1.42', letterSpacing: '-0.4px' }}>{villa.name}</span>
      <span className="font-geist text-[#0A0A0A]" style={{ fontSize: clamp(11, 14), lineHeight: '1.42', letterSpacing: '-0.4px' }}>—</span>
      <span className="font-geist text-[#737373]" style={{ fontSize: clamp(11, 14), lineHeight: '1.42', letterSpacing: '-0.4px' }}>{villa.location}</span>
    </div>
    <span className="font-geist text-[#000000]" style={{ fontSize: clamp(11, 14), lineHeight: '1.42', letterSpacing: '-0.4px' }}>{villa.year}</span>
  </div>
);

/** Reusable project image card */
const ProjectCard = ({ villa, height }) => {
  const containerRef = useRef(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: '50%' });

  const trackCursor = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setBtnPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const resetCursor = () => setBtnPos({ x: 0, y: '50%' });

  return (
    <Link
      href={projectHref(villa.project)}
      ref={containerRef}
      className="relative group overflow-hidden block"
      style={{ height }}
      onMouseEnter={trackCursor}
      onMouseMove={trackCursor}
      onMouseLeave={resetCursor}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image src={villa.img} alt={villa.name} fill className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" />
        <Image src={villa.alt} alt={`${villa.name} alt`} fill className="object-cover transition-all duration-700 ease-in-out opacity-0 group-hover:scale-105 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <ViewProjectBtn position={btnPos} />
    </Link>
  );
};

const GalleryNew = ({ gallery }) => {
  const VILLAS = gallery
    ? ['card1', 'card2', 'card3', 'card4', 'card5']
        .map((key, i) => {
          const c = gallery[key];
          if (!c) return null;
          return {
            id: i + 1,
            name: c.name || `Villa ${String(i + 1).padStart(2, '0')}`,
            location: c.place || '',
            year: c.date || '',
            img: c.images?.[0] || STATIC_VILLAS[i]?.img || '/dummyimages/Frame 2121454280.png',
            alt: c.images?.[1] || STATIC_VILLAS[i]?.alt || '/dummyimages/Container.png',
            project: c.project || '',
            side: i % 2 === 0 ? 'left' : 'right',
          };
        })
        .filter(Boolean)
    : STATIC_VILLAS;

  return (
    <section className="w-full bg-[#EDE7DE] flex flex-col items-center overflow-hidden">
      {/* ─── Outer wrapper: px scales from 16px (mobile) → 82px (1440px) ─── */}
      <div
        className="hidden sm:block mx-auto w-full"
        style={{
          maxWidth:      'clamp(300px,100vw,1920px)',
          paddingTop:    clamp(32, 60),
          paddingBottom: clamp(32, 60),
          paddingLeft:   clamp(16, 82),
          paddingRight:  clamp(16, 82),
        }}
      >
        {/* ─── Inner wrapper ─── */}
        <div
          className="mx-auto flex flex-col"
          style={{
            width:        '100%',
            maxWidth:     'clamp(200px,100vw,1920px)',
            paddingLeft:  clamp(8, 18.17),
            paddingRight: clamp(8, 18.17),
            gap:          clamp(36, 72.68),
          }}
        >

          {/* ══════════════════════════════════════════
              1) TITLE CONTAINER
          ══════════════════════════════════════════ */}
          {/*
            Desktop + Tablet (≥768px): side-by-side flex row (original layout)
            Mobile (<768px): stack vertically, smaller text
          */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-6 md:gap-0">

            {/* Gallery Badge — left */}
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
            GALLERY
          </span>
        </div>

            {/* H2 Title — center */}
            <div style={{ maxWidth: clamp(380, 758) }}>
              <h2
                className="font-roundo font-medium text-[#000000]"
                style={{
                  fontSize: "clamp(20px, 3.700vw, 60px)",
                  marginLeft: "clamp(30px, 5vw, 60px)",
                  lineHeight:    '1.1',
                  letterSpacing: clamp(-1, -3.05),
                }}
              >
                {gallery?.heading ? (
                  <span style={{ whiteSpace: 'pre-line' }}>{gallery.heading}</span>
                ) : (
                  <>Elegant Spaces For Built<br />Views Photo Frame</>
                )}
              </h2>
            </div>

            {/* Description — right */}
            <div className="self-start md:self-end" style={{ maxWidth: clamp(200, 284) }}>
              <p
                className="font-geist text-[#334454]"
                style={{
                  fontSize:      clamp(10, 18),
                  lineHeight:    '1.09',
                  letterSpacing: '-0.44px',
                  whiteSpace:    'pre-line',
                }}
              >
                {gallery?.subheading ||
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'}
              </p>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              2) PROJECT GRID
          ══════════════════════════════════════════ */}
          <div
            className="flex flex-col w-full"
            style={{ gap: clamp(24, 50.87) }}
          >

            {/* ─── ROW 1: two items side-by-side ─── */}
            {/*
              Mobile:  stacked
              ≥768px:  side-by-side
              The left item has a top offset (paddingTop) to stagger heights (original design).
            */}
            <div
              className="flex flex-col md:flex-row md:justify-between w-full gap-6 md:gap-0"
            >
              {/* Item 1 — left, pushed down */}
              <div
                className="w-full md:w-[44.5%]"
                style={{ paddingTop: clamp(0, 148.74) }}
              >
                <ProjectCard villa={VILLAS[0]} height={clamp(240, 508.86)} />
                <Caption villa={VILLAS[0]} gap={3.31} />
              </div>

              {/* Item 2 — right, sits at top */}
              <div className="w-full md:w-[41%]">
                <ProjectCard villa={VILLAS[1]} height={clamp(220, 480.05)} />
                <Caption villa={VILLAS[1]} gap={3.63} />
              </div>
            </div>

            {/* ─── ROW 2: single wide item, right-aligned ─── */}
            <div className="flex justify-end w-full">
              <div
                className="w-full md:w-[53%]"
              >
                <ProjectCard villa={VILLAS[2]} height={clamp(260, 586.86)} />
                <Caption villa={VILLAS[2]} gap={2.57} />
              </div>
            </div>

            {/* ─── ROW 3: two items side-by-side ─── */}
            <div
              className="flex flex-col md:flex-row md:justify-between w-full gap-6 md:gap-0"
            >
              {/* Item 4 — left, sits at top */}
              <div className="w-full md:w-[41%]">
                <ProjectCard villa={VILLAS[3]} height={clamp(220, 476.05)} />
                <Caption villa={VILLAS[3]} gap={3.63} />
              </div>

              {/* Item 5 — right, pushed down */}
              <div
                className="w-full md:w-[49%]"
                style={{ paddingTop: clamp(0, 163.52) }}
              >
                <ProjectCard villa={VILLAS[4]} height={clamp(260, 583.27)} />
                <Caption villa={VILLAS[4]} gap={3.63} />
              </div>
            </div>

            {/* ─── ROW 4: "Learn More" button ───
                A link, matching the mobile CTA and the per-villa hover buttons,
                which already point at /gallery. This one was a bare button
                element with no handler, so it did nothing when clicked. */}
            <div className="flex justify-center w-full">
              <Link
                href="/project-list"
                aria-label="View the full gallery"
                className="group relative flex items-center justify-center no-underline bg-[#6B859E] hover:bg-[#4a6074] transition-colors duration-500 overflow-hidden cursor-pointer border-none"
                style={{
                  width:        clamp(130, 167),
                  height:       clamp(42, 52),
                  borderRadius: clamp(8, 12),
                }}
              >
                {/* Sliding text */}
                <div
                  className="absolute overflow-hidden"
                  style={{
                    top:    'clamp(10px, 1.01vw, 14.5px)',
                    left:   'clamp(10px, 1.83vw, 22px)',
                    width:  'clamp(70px, 6.74vw, 97px)',
                    height: 'clamp(18px, 1.6vw, 23px)',
                  }}
                >
                  <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
                    {['Learn More', 'Learn More'].map((label, i) => (
                      <span
                        key={i}
                        className="font-sans font-medium text-[#EDE7DE] whitespace-nowrap flex items-center"
                        style={{
                          height:   'clamp(18px, 1.6vw, 23px)',
                          fontSize: 'clamp(13px, 1.04vw, 15px)',
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow box */}
                <div
                  className="absolute bg-[#EDE7DE] group-hover:bg-[#EDE7DE] transition-colors duration-500 overflow-hidden"
                  style={{
                    right:        'clamp(8px, 0.83vw, 12px)',
                    width:        'clamp(22px, 2.08vw, 30px)',
                    height:       'clamp(22px, 2.08vw, 30px)',
                    borderRadius: 'clamp(5px, 0.49vw, 7px)',
                  }}
                >
                  {/* Arrow slide out */}
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
                    <svg
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className="text-[#000000]"
                      style={{ width: 'clamp(15px, 1.97vw, 20px)', height: 'clamp(15px, 1.97vw, 20px)' }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  {/* Arrow slide in */}
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
                    <svg
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className="text-[#000000]"
                      style={{ width: 'clamp(15px, 1.97vw, 20px)', height: 'clamp(15px, 1.97vw, 20px)' }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>

          </div>{/* /PROJECT GRID */}
        </div>{/* /Inner wrapper */}
      </div>{/* /Outer wrapper */}

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE LAYOUT (< sm) — Figma frame 390×~1509
          Header: 390×221  padding 28/17/0/18  border-top 1px
            → inner: 390×193  padding 0/21/16/21  gap 10
              → badge 81.6×20 · title 348×74 (Roundo 500 32/36.6 ls-0.73)
              → desc 322×63 (Geist 400 14/21)
          Gallery: 390×1509 (relative, scaled via aspect-ratio so every
            image/button keeps its Figma top/left/width proportion)
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="sm:hidden w-full">
        {/* Header */}
        <div
          className="w-full "
          style={{ paddingTop: '28px', paddingRight: '4px', paddingLeft: '4px' }}
        >
          <div
            className="flex flex-col"
            style={{ paddingRight: '21px', paddingBottom: '16px', paddingLeft: '21px', gap: '10px' }}
          >
            {/* Badge */}
            <div className="flex items-center" style={{ width: '81.6px', height: '20px', gap: '6px' }}>
              <div className="bg-[#334454] flex-shrink-0" style={{ width: '10px', height: '10px', borderRadius: '2px' }} />
              <span className="font-geist uppercase text-[#334454]" style={{ fontSize: '12px', letterSpacing: '-0.24px' }}>
                GALLERY
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-roundo font-medium text-black m-0"
              style={{ width: '348px', maxWidth: '100%', fontSize: '32px', lineHeight: '36.6px', letterSpacing: '-0.73px', whiteSpace: 'pre-line' }}
            >
              {gallery?.heading || 'Elegant Spaces For Built Views Photo Frame'}
            </h2>

            {/* Description */}
            <p
              className="font-geist text-[#334454] m-0"
              style={{ width: '322px', maxWidth: '100%', fontSize: '14px', lineHeight: '21px', whiteSpace: 'pre-line' }}
            >
              {gallery?.subheading ||
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'}
            </p>
          </div>
        </div>

        {/* Staggered image gallery — proportionally scaled Figma frame */}
        <div className="relative w-full" style={{ aspectRatio: `390 / ${MOBILE_FRAME_HEIGHT}` }}>
          {MOBILE_CARDS.map((card) => {
            const villa = VILLAS[card.villaIndex];
            if (!villa) return null;
            return (
              <div
                key={card.key}
                className="absolute"
                style={{ top: `${card.top}%`, left: `${card.left}%`, width: `${card.width}%` }}
              >
                <Link href={projectHref(villa.project)} className="relative block w-full overflow-hidden" style={{ aspectRatio: card.ratio }}>
                  <Image src={villa.img} alt={villa.name} fill className="object-cover" />
                </Link>
                <Caption villa={villa} gap={3} />
              </div>
            );
          })}

          {/* Learn More button — same markup/style as TestimonialsSection's CTA */}
          <Link
            href="/gallery"
            aria-label="View the full gallery"
            className="group absolute no-underline flex items-center border-none cursor-pointer overflow-hidden transition-colors duration-500 bg-[#6B859E] hover:bg-[#4a6074]"
            style={{ top: '93.9%', left: '31.8%', width: '136px', height: '40px', borderRadius: '12px' }}
          >
            {/* Sliding text */}
            <div
              className="absolute overflow-hidden"
              style={{ top: '50%', transform: 'translateY(-50%)', left: '14px', height: '17px' }}
            >
              <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
                {['Learn More', 'Learn More'].map((label, i) => (
                  <span
                    key={i}
                    className="font-sans font-medium text-[#EDE7DE] whitespace-nowrap flex items-center"
                    style={{ height: '17px', fontSize: '14px' }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Arrow box */}
            <div
              className="absolute bg-[#EDE7DE] group-hover:bg-[#EDE7DE] transition-colors duration-500 overflow-hidden"
              style={{ right: '8px', width: '24px', height: '24px', borderRadius: '6px', top: '50%', transform: 'translateY(-50%)' }}
            >
              {/* Arrow slide out */}
              <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#000000] w-[14.8px] h-[14.8px]">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              {/* Arrow slide in */}
              <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#000000] w-[15px] h-[15px]">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryNew;
