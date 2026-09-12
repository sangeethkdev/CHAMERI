'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import MuteToggleButton from './MuteToggleButton';
import useExclusiveAudio from '@/hooks/useExclusiveAudio';

/**
 * Renders a testimonial card's background media, which the admin panel lets
 * an editor set to an uploaded image, an uploaded video, or a YouTube link.
 *
 * All three render edge-to-edge inside the card's existing clip-path frame,
 * so each carousel's sizing and animation code stays untouched.
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

export default function TestimonialCardMedia({
  item,
  isCenter,
  transitionEnabled = true,
  className = 'object-cover',
}) {
  const videoRef = useRef(null);
  const youtubeRef = useRef(null);
  /* Autoplay is only permitted while muted, so every card starts muted and the
     viewer opts into sound via the speaker button. The slot is page-wide, so
     unmuting this card silences whichever one had sound before — two
     testimonials never talk over each other. */
  const [soundOn, toggleSound, releaseSound] = useExclusiveAudio();

  // Sound is derived rather than stored, so a card that scrolls away from the
  // centre goes silent on its own — otherwise an unmuted card would keep
  // playing audio from off-screen.
  const muted = !(isCenter && soundOn);

  const transform = isCenter ? 'scale(1)' : 'scale(1.1)';
  const transition = transitionEnabled
    ? 'transform 900ms cubic-bezier(0.4,0,0.2,1)'
    : 'none';

  // Only the centre card is worth streaming; the side cards are peeking
  // slivers, so they stay paused until they scroll into the middle.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (isCenter) {
      // play() rejects if the element unmounts mid-transition or the browser
      // blocks autoplay; neither is actionable, so the rejection is ignored.
      el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [isCenter, item?.video]);

  /* Scrolling a card away from the centre hands the audio slot back, rather
     than leaving it held by a card that is no longer visible or playing —
     otherwise the next card could not take sound without two clicks. */
  useEffect(() => {
    if (!isCenter && soundOn) releaseSound();
  }, [isCenter, soundOn, releaseSound]);

  // Keep the <video> element in sync with the mute state.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  // YouTube embeds can't be muted through the DOM — the player is driven via
  // the IFrame API's postMessage channel, which needs no extra script as long
  // as the embed URL carries enablejsapi=1.
  useEffect(() => {
    const frame = youtubeRef.current;
    if (!frame?.contentWindow) return;
    frame.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: muted ? 'mute' : 'unMute', args: [] }),
      '*'
    );
  }, [muted]);

  if (item?.mediaType === 'video' && item.video) {
    return (
      <>
        <video
          ref={videoRef}
          src={item.video}
          poster={item.img || undefined}
          className={`absolute inset-0 h-full w-full ${className}`}
          // muted is what makes autoplay permissible at all; the speaker
          // button below lets a viewer turn sound on deliberately.
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={item.name ? `Testimonial from ${item.name}` : 'Testimonial video'}
          style={{ transform, transition }}
        />
        {/* Only the centre card is playing, so only it offers sound. */}
        {isCenter && (
          <MuteToggleButton
            muted={muted}
            onToggle={toggleSound}
            style={{ right: '5%', bottom: '5%' }}
          />
        )}
      </>
    );
  }

  if (item?.mediaType === 'youtube' && item.youtubeId) {
    // The player only mounts for the centre card — one iframe per slide would
    // load a full YouTube player for every card and tank scroll performance.
    if (!isCenter) {
      return (
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
    }

    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      loop: '1',
      playlist: item.youtubeId, // a single video only loops if it names itself here
      controls: '0',
      modestbranding: '1',
      rel: '0',
      playsinline: '1',
      enablejsapi: '1', // required for the mute/unMute postMessage commands
      // enablejsapi makes the player treat itself as interactive, which brings
      // back the centre play/pause/skip overlay that controls=0 alone hides.
      // These strip the remaining chrome so only the card's own button shows.
      disablekb: '1',
      fs: '0',
      iv_load_policy: '3',
    });

    return (
      <>
        <div className="absolute inset-0 overflow-hidden" style={{ transform, transition }}>
          {/* Oversized so YouTube's letterboxing is cropped away by the card frame */}
          <iframe
            ref={youtubeRef}
            src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?${params.toString()}`}
            title={item.name ? `Testimonial from ${item.name}` : 'Testimonial video'}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="pointer-events-none absolute left-1/2 top-1/2 border-0"
            style={{
              width: '177.78vh',
              height: '56.25vw',
              minWidth: '100%',
              minHeight: '100%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          {/* Transparent shield over the player. enablejsapi=1 keeps the embed
              interactive, so without this YouTube shows its own play/pause/skip
              overlay on hover — the card is decorative and drives playback
              itself, so no pointer event should ever reach the iframe. */}
          <div className="absolute inset-0" aria-hidden="true" />
        </div>
        {/* Sits outside the oversized wrapper so it anchors to the card frame
            rather than the cropped-away iframe bounds. */}
        {isCenter && (
          <MuteToggleButton
            muted={muted}
            onToggle={toggleSound}
            style={{ right: '5%', bottom: '5%' }}
          />
        )}
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
