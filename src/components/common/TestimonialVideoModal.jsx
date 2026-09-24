'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Full-screen popup that plays a testimonial's video once the viewer clicks
 * its card. Cards themselves never autoplay; this is the only place a
 * testimonial video actually plays, and it plays with sound and controls.
 *
 * Rendered through a portal because the cards sit inside a transformed,
 * clip-pathed carousel track — a fixed-position overlay rendered in place
 * would be positioned and clipped relative to the card, not the viewport.
 */
export default function TestimonialVideoModal({ item, onClose }) {
  // Escape closes, and the page behind stops scrolling while the popup is up.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const title = item?.name ? `Testimonial from ${item.name}` : 'Testimonial video';

  let player = null;
  if (item?.mediaType === 'youtube' && item.youtubeId) {
    const params = new URLSearchParams({
      autoplay: '1',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
    });
    player = (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?${params.toString()}`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    );
  } else if (item?.mediaType === 'video' && item.video) {
    player = (
      <video
        src={item.video}
        poster={item.img || undefined}
        className="absolute inset-0 h-full w-full bg-black object-contain"
        controls
        autoPlay
        playsInline
        aria-label={title}
      />
    );
  }

  if (!player) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
      // React events bubble through portals along the component tree, so
      // without these a drag inside the popup would reach the carousel's
      // swipe handler and flip slides behind it.
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
    >
      <div
        className="relative w-full max-w-[1100px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-white/15 text-white transition-colors duration-200 hover:bg-white/30"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
        <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ aspectRatio: '16 / 9' }}>
          {player}
        </div>
      </div>
    </div>,
    document.body
  );
}
