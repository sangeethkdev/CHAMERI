'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const STATIC_COL1 = [
  { id: 1, src: '/dummyimages/Figure → Hepburn-20-480x320.jpg.svg', alt: 'Gallery Image 1', w: 441, h: 512 },
  { id: 3, src: '/dummyimages/e273958d502607f06d62edd61792f48b69b84f3e.jpg', alt: 'Gallery Image 3', w: 441, h: 483 },
  { id: 6, src: '/dummyimages/ab2a95a06e83c0793c45aa84bc54cd800e1c8716.jpg', alt: 'Gallery Image 6', w: 441, h: 489 },
];
const STATIC_COL2 = [
  { id: 2, src: '/dummyimages/Figure → Argo-5-480x720.jpg.svg', alt: 'Gallery Image 2', w: 349, h: 336 },
  { id: 4, src: '/dummyimages/b41115b835e2232a8e61bd8d04a193c1d7a5d351.png', alt: 'Gallery Image 4', w: 349, h: 384 },
  { id: 10, src: '/dummyimages/81b44908c049fd8e0792ca40e0fdee715ba1f7b0.jpg', alt: 'Gallery Image 10', w: 349, h: 433 },
  { id: 9, src: '/dummyimages/87e89594da613bb98c472da2cf1f7376200c358b.jpg', alt: 'Gallery Image 9', w: 348, h: 301 },
];
const STATIC_COL3 = [
  { id: 5, src: '/dummyimages/af18e0d9d8fdfe4f4a5d97f4fbf9edd12b1ff9df.png', alt: 'Gallery Image 5', w: 441, h: 512 },
  { id: 7, src: '/dummyimages/6bdc232e1c143f702a3a37c1909ea6a7c38d0002.png', alt: 'Gallery Image 7', w: 440, h: 449 },
  { id: 8, src: '/dummyimages/4366c570846f17b0de12329eb1fab383893fbc5c.jpg', alt: 'Gallery Image 8', w: 440, h: 522 },
];

// Splits a flat list of images into the 3-column masonry (desktop) and the
// single naturally-ordered column (mobile) that both the legacy flat pool
// and each individual event render with.
function splitColumns(images) {
  const col1 = images.filter((_, i) => i % 3 === 0);
  const col2 = images.filter((_, i) => i % 3 === 1);
  const col3 = images.filter((_, i) => i % 3 === 2);
  const flat = [...col1, ...col2, ...col3].sort((a, b) => a.id - b.id);
  return { col1, col2, col3, flat };
}

/** One masonry block — shared by the legacy flat pool and each event. */
function MasonryBlock({ col1, col2, col3, flat }) {
  return (
    <>
      {/* Mobile: single naturally-ordered column (1, 2, 3, 4, 5…) */}
      <div className="flex md:hidden flex-col w-full" style={{ gap: 'clamp(15px, 2.08vw, 30px)' }}>
        {flat.map((img) => (
          <div key={img.id} className="relative w-full overflow-hidden" style={{ aspectRatio: `${img.w} / ${img.h}` }}>
            <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-cover" />
          </div>
        ))}
      </div>

      {/* Desktop/tablet: 3-column masonry */}
      <div className="hidden md:flex w-full" style={{ gap: 'clamp(15px, 2.08vw, 30px)' }}>
        {[col1, col2, col3].map((col, ci) => (
          <div key={ci} className="flex flex-col flex-1" style={{ gap: 'clamp(15px, 2.08vw, 30px)' }}>
            {col.map((img) => (
              <div key={img.id} className="relative w-full overflow-hidden" style={{ aspectRatio: `${img.w} / ${img.h}` }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

/** One event's own masonry block (no visible title/date on the public page —
    grouping is only for the admin's own organization). */
function EventSection({ event }) {
  const images = (event.images || [])
    .filter(Boolean)
    .map((src, i) => ({ id: i + 1, src, alt: `${event.title || 'Gallery'} image ${i + 1}`, w: 441, h: 512 }));
  if (images.length === 0) return null;

  return <MasonryBlock {...splitColumns(images)} />;
}

/** Chevron icon — 24×24, matches the "ALL" filter pill's dropdown affordance. */
function ChevronIcon({ open }) {
  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="#EDE7DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{
        flexShrink: 0,
        transition: 'transform 0.2s ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/** Event filter dropdown — "All" plus one entry per event, fetched from the backend. */
function EventFilterDropdown({ events, selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onOutsideClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, []);

  const label = selected === null ? 'All' : events[selected]?.title || 'All';

  return (
    <div ref={rootRef} className="relative" style={{ minWidth: '245px', maxWidth: '1893.27px' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center w-full"
        style={{
          justifyContent: 'space-between',
          borderRadius: '6px',
          paddingTop:    '8px',
          paddingRight:  '15px',
          paddingBottom: '8px',
          paddingLeft:   '15px',
          background:    '#334454',
          border:        'none',
          cursor:        'pointer',
          marginTop: '10px'
        }}
      >
        <span
          className="font-geist uppercase"
          style={{
            fontWeight:    400,
            fontSize:      '14px',
            lineHeight:    '19.49px',
            letterSpacing: '0%',
            color:         '#EDE7DE',
            whiteSpace:    'nowrap',
          }}
        >
          {label}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-20 overflow-hidden"
          style={{
            top:          'calc(100% + 6px)',
            minWidth:     '100%',
            borderRadius: '6px',
            background:   '#334454',
            boxShadow:    '0 8px 24px rgba(0,0,0,0.18)',
          }}
        >
          <button
            type="button"
            role="option"
            aria-selected={selected === null}
            onClick={() => { onSelect(null); setOpen(false); }}
            className="font-geist w-full text-left hover:bg-white/10 transition-colors"
            style={{
              fontSize: 'clamp(12px,1vw,14px)', color: '#EDE7DE', padding: '10px 19px',
              background: selected === null ? 'rgba(255,255,255,0.08)' : 'transparent',
              border: 'none', cursor: 'pointer',
            }}
          >
            All
          </button>
          {events.map((event, i) => (
            <button
              key={i}
              type="button"
              role="option"
              aria-selected={selected === i}
              onClick={() => { onSelect(i); setOpen(false); }}
              className="font-geist w-full text-left hover:bg-white/10 transition-colors"
              style={{
                fontSize: '16px', color: '#EDE7DE', padding: '10px 19px',
                background: selected === i ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: 'none', cursor: 'pointer',
              }}
            >
              {event.title || `Event ${i + 1}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function GalleryGrid({ galleryImages, galleryEvents }) {
  const [selectedEvent, setSelectedEvent] = useState(null); // null = "All"
  const events = (galleryEvents || []).filter((e) => (e.images || []).some(Boolean));

  // Legacy flat pool — only used as a fallback when no events exist yet
  // (older documents, or a freshly-created one), so nothing that was
  // already live disappears the moment events are introduced.
  let legacyBlock = null;
  if (events.length === 0) {
    let col1, col2, col3, flat;
    if (galleryImages && galleryImages.length > 0) {
      const all = galleryImages
        .filter((src) => src)
        .map((src, i) => ({ id: i + 1, src, alt: `Gallery Image ${i + 1}`, w: 441, h: 512 }));
      ({ col1, col2, col3, flat } = all.length > 0
        ? splitColumns(all)
        : { col1: STATIC_COL1, col2: STATIC_COL2, col3: STATIC_COL3, flat: [...STATIC_COL1, ...STATIC_COL2, ...STATIC_COL3].sort((a, b) => a.id - b.id) });
    } else {
      col1 = STATIC_COL1;
      col2 = STATIC_COL2;
      col3 = STATIC_COL3;
      flat = [...STATIC_COL1, ...STATIC_COL2, ...STATIC_COL3].sort((a, b) => a.id - b.id);
    }
    legacyBlock = <MasonryBlock col1={col1} col2={col2} col3={col3} flat={flat} />;
  }

  return (
    <section className="w-full flex flex-col items-center" style={{ backgroundColor: '#EDE7DE' }}>

      {/* Header Container — pill on the left, event filter dropdown on the right. */}
      <div
        className="w-full flex flex-wrap justify-between items-center gap-4"
        style={{
          maxWidth: 'clamp(375px, 100vw, 1920px)',
          paddingTop: 'clamp(19px, 1.3vw, 19px)',
          paddingBottom: 'clamp(20px, 8.48vw, 48px)',
          paddingLeft: 'clamp(20px, 5.13vw, 74px)',
          paddingRight: 'clamp(20px, 5.13vw, 74px)',
        }}
      >
        {/* Gallery Pill */}
        <div
          className="flex items-center"
          style={{
            paddingTop: 'clamp(0px, 3.5vw, 30.2px)',
            paddingBottom: 'clamp(0px, 0.5vw, 7.2px)',
            paddingLeft: 'clamp(2px, 1vw, 14px)',
            paddingRight: 'clamp(2px, 1vw, 14px)',
            height: 'clamp(20px, 2.3vw, 33.4px)',
            borderRadius: '90px',
            gap: 'clamp(7.2px, 0.7vw, 10px)',
            backgroundColor: '#EDE7DE',
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

        {/* Event filter — "All" plus one entry per event fetched from the backend */}
        {events.length > 0 && (
          <EventFilterDropdown events={events} selected={selectedEvent} onSelect={setSelectedEvent} />
        )}
      </div>

      {/* Grid — either event sections (grouped) or the legacy flat pool */}
      <div
        className="w-full flex flex-col items-center"
        style={{
          maxWidth: 'clamp(375px, 100vw, 1920px)',
          paddingLeft: 'clamp(20px, 4.23vw, 61px)',
          paddingRight: 'clamp(20px, 4.23vw, 61px)',
          paddingBottom: 'clamp(30px, 3.54vw, 51px)',
          gap: 'clamp(15px, 2.08vw, 30px)',
        }}
      >
        {events.length > 0
          ? (selectedEvent === null ? events : events.filter((_, i) => i === selectedEvent))
              .map((event, i) => <EventSection key={selectedEvent === null ? i : selectedEvent} event={event} />)
          : legacyBlock}
      </div>
    </section>
  );
}
