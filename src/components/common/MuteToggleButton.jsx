'use client';

/**
 * The small speaker button that sits on a testimonial card's video media.
 *
 * Cards autoplay muted (browsers block autoplay with sound), so this is the
 * one affordance that lets a viewer actually hear a testimonial. It is shared
 * by the three carousels that use TestimonialCardMedia and by the Client
 * Review carousel, which renders its own card markup.
 */

// Sizes come through as CSS lengths (plain px or a clamp() expression), so
// they are applied as style rather than width/height attributes, which only
// accept plain numbers.
const SpeakerOnIcon = ({ size }) => (
  <svg viewBox="0 0 24 24" style={{ width: size, height: size }} fill="none" aria-hidden="true">
    <path
      d="M11 5 6 9H3v6h3l5 4V5Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M15.5 8.5a4.5 4.5 0 0 1 0 7M18.5 5.5a8.5 8.5 0 0 1 0 13"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const SpeakerOffIcon = ({ size }) => (
  <svg viewBox="0 0 24 24" style={{ width: size, height: size }} fill="none" aria-hidden="true">
    <path
      d="M11 5 6 9H3v6h3l5 4V5Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="m16 9.5 5 5m0-5-5 5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export default function MuteToggleButton({
  muted,
  onToggle,
  size = 36,
  iconSize = 18,
  className = '',
  style = {},
}) {
  return (
    <button
      type="button"
      // The card sits inside a carousel that advances on click/swipe, so the
      // event must not bubble up to those handlers.
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      aria-label={muted ? 'Unmute video' : 'Mute video'}
      aria-pressed={!muted}
      title={muted ? 'Unmute' : 'Mute'}
      className={`absolute z-20 flex items-center justify-center rounded-full border-0 cursor-pointer text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/75 ${className}`}
      style={{
        width: size,
        height: size,
        background: 'rgba(0,0,0,0.55)',
        ...style,
      }}
    >
      {muted ? <SpeakerOffIcon size={iconSize} /> : <SpeakerOnIcon size={iconSize} />}
    </button>
  );
}
