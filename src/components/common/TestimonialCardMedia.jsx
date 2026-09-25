'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import TestimonialVideoModal from './TestimonialVideoModal';

/**
 * Renders a testimonial card's background media, which the admin panel lets
 * an editor set to an uploaded image, an uploaded video, or a YouTube link.
 *
 * All three render edge-to-edge inside the card's existing clip-path frame,
 * so each carousel's sizing and animation code stays untouched.
 *
 * Video cards never autoplay. They show a still with a play button, and
 * clicking the card opens the video in a popup (TestimonialVideoModal).
 */

// Accepts the URL shapes people actually paste — watch links, youtu.be
// shorts, /embed and /shorts — and returns the bare 11-char video id.
export function getYoutubeId(url) {
  if (!url) return '';
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([A-Za-z0-9_-]{11})/,
    /(?:youtu\.be\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return /^[A-Za-z0-9_-]{11}$/.test(url.trim()) ? url.trim() : '';
}

/**
 * Normalises one admin card into the media shape the carousels consume.
 * Cards saved before this feature existed carry no cardMediaType, so they
 * fall back to 'image' and keep behaving exactly as they did.
 */
export function toCardMedia(card, fallbackImg) {
  const mediaType = card?.cardMediaType || 'image';

  if (mediaType === 'video' && card?.cardVideo) {
    return { mediaType: 'video', video: card.cardVideo, img: fallbackImg };
  }

  if (mediaType === 'youtube') {
    const youtubeId = getYoutubeId(card?.cardYoutubeUrl);
    if (youtubeId) return { mediaType: 'youtube', youtubeId, img: fallbackImg };
  }

  return { mediaType: 'image', img: card?.cardImage || fallbackImg };
}

// A press that travels further than this is a carousel swipe, not a click,
// so it must not open the popup.
const CLICK_SLOP_PX = 10;

/* Transparent layer over the whole card that opens the popup. It sits above
   the carousel's quote/profile overlay (z-10) so a click anywhere on the card
   counts, while the carousel arrows (z-20, outside the card) stay on top. */
export function PlayTrigger({ item, onOpen }) {
  const downRef = useRef(null);

  return (
    <button
      type="button"
      aria-label={item?.name ? `Play testimonial from ${item.name}` : 'Play testimonial video'}
      className="group absolute inset-0 z-10 flex cursor-pointer items-center justify-center border-0 bg-transparent p-0"
      // Not stopped: the carousel's swipe handler still needs this event.
      onPointerDown={(e) => {
        downRef.current = { x: e.clientX, y: e.clientY };
      }}
      onClick={(e) => {
        const start = downRef.current;
        downRef.current = null;
        if (
          start &&
          Math.hypot(e.clientX - start.x, e.clientY - start.y) > CLICK_SLOP_PX
        ) {
          return;
        }
        onOpen();
      }}
    >
      <span
        className="flex items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-black/70"
        style={{ width: 'clamp(48px, 5vw, 88px)', height: 'clamp(48px, 5vw, 88px)' }}
      >
        {/* The triangle's path spans x 7–21, so a 0-based viewBox already sits
            it right of centre; shifting the viewBox by 1 leaves only a small
            optical nudge toward the point, which reads as centred. */}
        <svg
          viewBox="1 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          style={{ display: 'block', width: '40%', height: '40%' }}
        >
          <path d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
        </svg>
      </span>
    </button>
  );
}

export default function TestimonialCardMedia({
  item,
  isCenter,
  transitionEnabled = true,
  className = 'object-cover',
  /* Whether this card is close enough to the centre to be worth mounting a
     real <video> for its preview frame. The carousels triple their list for
     the infinite-scroll illusion, so a 5-entry set becomes 15 cards; on iOS
     each mounted <video> holds a slot in a small, device-wide pool of decode
     pipelines, so only the cards near the centre get one. The rest show the
     poster image. Defaults to isCenter for callers that do not pass it. */
  isNearCenter,
}) {
  const mountsVideo = isNearCenter ?? isCenter;
  const videoRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const transform = isCenter ? 'scale(1)' : 'scale(1.1)';
  const transition = transitionEnabled
    ? 'transform 900ms cubic-bezier(0.4,0,0.2,1)'
    : 'none';

  /* Release the decoder when this card stops rendering a <video>. Removing
     the element from the DOM does not free its media pipeline on iOS; it has
     to be torn down explicitly, or the sessions accumulate across visits. */
  useEffect(() => {
    if (!mountsVideo) return;
    const el = videoRef.current;
    if (!el) return;

    return () => {
      try {
        el.pause();
        el.removeAttribute('src');
        while (el.firstChild) el.removeChild(el.firstChild);
        el.load();
      } catch {
        /* Already torn down by the browser — nothing to recover, and this
           must not break unmounting. */
      }
    };
  }, [mountsVideo]);

  const isVideo = item?.mediaType === 'video' && item.video;
  const isYoutube = item?.mediaType === 'youtube' && item.youtubeId;

  if (isVideo || isYoutube) {
    let still;
    if (isYoutube) {
      still = (
        <Image
          src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
          alt={item.name || 'Testimonial'}
          fill
          sizes="(max-width: 768px) 90vw, 800px"
          className={className}
          // YouTube already serves this thumbnail at a fixed 480x360, so
          // routing it through the optimizer would add a round trip without
          // shrinking it.
          unoptimized
          style={{ transform, transition }}
        />
      );
    } else if (mountsVideo) {
      /* Never played in the card — it is only here to show a real frame of
         the clip. The #t fragment makes the browser seek to (and paint) a
         frame just past the start, which is often black. */
      still = (
        <video
          ref={videoRef}
          src={`${item.video}#t=0.1`}
          className={`absolute inset-0 h-full w-full ${className}`}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          style={{ transform, transition }}
        />
      );
    } else if (item.img) {
      still = (
        <Image
          src={item.img}
          alt={item.name || 'Testimonial'}
          fill
          sizes="(max-width: 768px) 90vw, 800px"
          className={className}
          style={{ transform, transition }}
        />
      );
    } else {
      still = (
        <div
          className="absolute inset-0 bg-neutral-800"
          style={{ transform, transition }}
          aria-hidden="true"
        />
      );
    }

    return (
      <>
        {still}
        <PlayTrigger item={item} onOpen={openModal} />
        {modalOpen && <TestimonialVideoModal item={item} onClose={closeModal} />}
      </>
    );
  }

  return (
    <Image
      src={item.img}
      alt={item.name}
      fill
      // Without this, `fill` defaults to 100vw and Next serves the 3840px
      // variant to every device — many times the bytes this card can show.
      sizes="(max-width: 768px) 90vw, 800px"
      className={className}
      style={{ transform, transition }}
    />
  );
}
