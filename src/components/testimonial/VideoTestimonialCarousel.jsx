'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { TESTIMONIALS as DEFAULT_TESTIMONIALS } from '@/data/testimonials';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * VideoTestimonialCarousel
 * ─────────────────────────────────────────────────────────────────────────────
 * Baseline viewport : 1440px  (design canvas: 1440 × 664)
 * Fluid range       : 375px → 1920px
 *
 * clamp() formula
 *   vw_value = (DESIGN_PX / 1440) × 100
 *   result   = clamp(MOBILE_FLOOR, vw_value vw, DESKTOP_CEIL)
 *
 * Figma specs (1440px design):
 *   Section        : bg:#EDE7DE  border-top:1px solid #21232533
 *   Card (frame)   : w:302  h:498
 *   Row gap        : 17
 *   Play button    : w:56  h:56  (centered on the card)
 *   Bottom content : w:253.71  h:146.2  top:325  left:24.15 (of the card)
 *   Quote glyph    : w:22.18  h:16.43  top:10.95  left:0 (of bottom content)
 *   Stars          : w:55.67  h:11.13
 *   Quote text     : w:236.37 h:60  font-size:13.7  line-height:14.94  letter-spacing:-0.3
 *   Avatar row     : w:118.64 h:35.09  gap:7.3
 *   Avatar         : w:27.38  h:27.38
 *   Name           : font-size:14.6  line-height:20.31  letter-spacing:-0.34  capitalize
 *   Role           : font-size:10.95 line-height:14.94  letter-spacing:-0.3  color: rgba(255,255,255,.6)
 *
 * The row runs edge-to-edge with no side gutter. Cards use
 * `flex: 0 0 clamp(...)` — a fixed 302×498 size at 1440px that never grows
 * or shrinks; the row scrolls horizontally (`.scrollbar-hide`) once cards
 * overflow it, matching the bleed-off-the-edge look of the 5-card Figma
 * frame. No changes needed as cards are added or removed from the data file.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const QuoteIcon = ({ width, height }) => (
  <svg viewBox="0 0 25 18" style={{ width, height, flexShrink: 0 }} fill="none">
    <path
      d="M24.3 18H13.7574V10.1636L18.2959 0H22.4563L18.7687 9.40365H24.3V18ZM10.5899 18H0V10.1636L4.5858 0H8.74611L5.05856 9.40365H10.5899V18Z"
      fill="#FFFFFF"
    />
  </svg>
);

const StarIcon = ({ size, filled = true }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size, height: size, flexShrink: 0 }}
    fill={filled ? '#FFC107' : 'rgba(255,255,255,0.35)'}
  >
    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 7.1-1.01L12 2z" />
  </svg>
);

function VideoCard({ item }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || !item.video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      video.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <div
      className="relative overflow-hidden"
      style={{
        flex:   '0 0 clamp(220px, 20.972vw, 302px)',
        width:  'clamp(220px, 20.972vw, 302px)',
        height: 'clamp(360px, 34.583vw, 498px)',
        scrollSnapAlign: 'start',
      }}
    >
      {/* Background — the video itself, no poster: the card shows the video's
          own first frame and plays in place on click. `item.video` always
          resolves (backend value or the shared local fallback), so there is
          no case where dropping the poster leaves the card blank. */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="auto"
        onEnded={() => setPlaying(false)}
      >
        <source src={item.video} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 39%), linear-gradient(0deg, rgba(0,0,0,0.14), rgba(0,0,0,0.14))',
        }}
      />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? 'Pause video' : 'Play video'}
        className="absolute rounded-full border-none cursor-pointer transition-opacity duration-300"
        style={{
          top:            '50%',
          left:           '50%',
          transform:      'translate(-50%, -50%)',
          width:          'clamp(40px, 3.889vw, 56px)',
          height:         'clamp(40px, 3.889vw, 56px)',
          opacity:        playing ? 0 : 1,
        }}
      >
        <Image src="/icons/Vector (17).svg" alt="" fill />
      </button>

      {/* Bottom content — quote glyph + stars, quote text, avatar row */}
      <div
        className="absolute flex flex-col"
        style={{ top: '68.26%', left: '12%', width: '84%', gap: 'clamp(10px, 1.141vw, 16.43px)' }}
      >
        {/* `justify-content: space-between` instead of a fixed/clamped gap
            — the glyph and stars need to sit flush at opposite edges of
            this row *whatever* its actual rendered width ends up being
            (it tracks the card's 84%, and the card itself is clamped down
            on narrow viewports). A vw-driven gap was tuned for one card
            width and overflowed at others, pushing the stars out past the
            content box instead of staying pinned to its right edge. */}
        <div className="flex items-center justify-between">
          <div style={{ position: 'relative', top: 'clamp(4px, 0.556vw, 8px)' }}>
            <QuoteIcon width="clamp(14px, 1.54vw, 22.18px)" height="clamp(10px, 1.141vw, 16.43px)" />
          </div>
          <div className="flex items-center" style={{ gap: 'clamp(1px, 0.1vw, 2px)' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} size="clamp(8px, 0.773vw, 11.13px)" filled={i < (item.rating || 5)} />
            ))}
          </div>
        </div>

        <div className="flex flex-col" style={{ gap: 'clamp(14px, 1.521vw, 21.9px)' }}>
          <p
            className="font-sans m-0 overflow-hidden"
            style={{
              color:           '#FFFFFF',
              fontWeight:      400,
              fontSize:        'clamp(11px, 0.951vw, 13.7px)',
              lineHeight:      'clamp(12px, 1.038vw, 14.94px)',
              letterSpacing:   '-0.3px',
              display:         '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {item.quote}
          </p>

          <div className="flex items-center" style={{ gap: 'clamp(5px, 0.507vw, 7.3px)' }}>
            <div
              className="relative flex-shrink-0 overflow-hidden rounded-full"
              style={{ width: 'clamp(20px, 1.901vw, 27.38px)', height: 'clamp(20px, 1.901vw, 27.38px)' }}
            >
              <Image src={item.avatar} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <p
                className="font-sans m-0 capitalize"
                style={{
                  color:         '#FFFFFF',
                  fontWeight:    400,
                  fontSize:      'clamp(12px, 1.014vw, 14.6px)',
                  lineHeight:    'clamp(16px, 1.410vw, 20.31px)',
                  letterSpacing: '-0.34px',
                }}
              >
                {item.name}
              </p>
              <p
                className="font-sans m-0"
                style={{
                  color:         'rgba(255,255,255,0.6)',
                  fontWeight:    400,
                  fontSize:      'clamp(9px, 0.76vw, 10.95px)',
                  lineHeight:    'clamp(12px, 1.038vw, 14.94px)',
                  letterSpacing: '-0.3px',
                }}
              >
                {item.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared placeholder until a per-testimonial clip is uploaded — same local
// asset the Kiwano brand-story / 360-tour sections fall back to.
const FALLBACK_VIDEO = '/videos/kiwano-hero.mp4';

export default function VideoTestimonialCarousel({ reviews }) {
  const DATA = reviews?.cards?.length
    ? reviews.cards.map((c, i) => ({
        id: i + 1,
        img: c.image || DEFAULT_TESTIMONIALS[i % DEFAULT_TESTIMONIALS.length]?.img,
        video: c.video || FALLBACK_VIDEO,
        avatar: c.image || DEFAULT_TESTIMONIALS[i % DEFAULT_TESTIMONIALS.length]?.avatar,
        name: c.name,
        quote: c.quote,
        role: c.role,
        rating: c.rating || 5,
      }))
    : DEFAULT_TESTIMONIALS.map((t) => ({ ...t, video: t.video || FALLBACK_VIDEO }));

  return (
    <section
      className="relative w-full"
      style={{ background: '#EDE7DE' }}
    >
      <div
        className="flex overflow-x-auto scrollbar-hide"
        style={{
          paddingTop:    'clamp(40px, 5.795vw, 83.45px)',
          paddingBottom: 'clamp(40px, 5.795vw, 83.45px)',
          gap:           'clamp(10px, 1.181vw, 17px)',
          scrollSnapType: 'x mandatory',
        }}
      >
        {DATA.map((item) => (
          <VideoCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
