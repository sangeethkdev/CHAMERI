"use client";

import useReleaseVideoOnUnmount from "@/hooks/useReleaseVideoOnUnmount";

/**
 * A muted, looping, autoplaying background video that releases its decoder
 * when it unmounts.
 *
 * This exists as its own client component so the sections that use it can stay
 * server components: only the <video> itself needs the effect that tears the
 * media pipeline down, and dropping "use client" into a whole hero would ship
 * all of its markup to the browser for no reason.
 *
 * See useReleaseVideoOnUnmount for why removing the element from the DOM is
 * not sufficient on iOS.
 */
export default function BackgroundVideo({
  src,
  poster,
  className = "absolute inset-0 w-full h-full object-cover",
  /* "metadata" rather than the browser's autoplay default of "auto": without
     it the full file is pulled before first paint and competes with the LCP
     text for bandwidth on mobile. A poster covers the gap, so the section
     paints immediately instead of sitting blank until enough has buffered. */
  preload = "metadata",
}) {
  const videoRef = useReleaseVideoOnUnmount();

  return (
    <video
      ref={videoRef}
      // Remounts the element when the source changes rather than leaving the
      // old pipeline attached to a new src.
      key={src}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      poster={poster}
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
