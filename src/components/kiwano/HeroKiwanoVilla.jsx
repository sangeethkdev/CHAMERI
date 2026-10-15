"use client";

import NewNavbar from "../common/NewNavbar";
import useFrameSequence from "@/hooks/useFrameSequence";

/* ─────────────────────────────────────────────────────────────────────────────
 * HeroKiwanoVilla — scroll-driven villa "video" built from still frames
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  1. Page opens  → hero fills the screen showing frame_0001; heading hidden.
 *  2. User scrolls → hero stays pinned, frames advance with scroll so the
 *                    villa video appears to play.
 *  3. 82% → 96%    → heading fades in and rises 28px.
 *  4. 100%         → hero unpins, page continues to KiwanoLuxuryVillas.
 *
 * Frames live in /public/frames/kiwano:
 *   landscape — frame_0001.webp … frame_0217.webp (1920px wide, desktop/tablet)
 *   portrait  — portrait/frame_0001.webp …       (1170×2080, phones upright)
 * useFrameSequence picks the set by viewport shape, decimates on phones and
 * keeps only a small window of decoded frames resident so iOS Safari doesn't
 * kill the tab.
 *
 * iPhone viewport note: `100vh` on iOS is the *large* viewport (toolbar
 * hidden), so with the toolbar showing, the bottom of a 100vh box sits under
 * it. The pinned image uses lvh (no gaps when the toolbar collapses) while
 * the heading is centred inside an svh box — the area that is always
 * visible — so it never hides behind Safari's toolbar. Both fall back to vh
 * on browsers without the new units.
 */

const FRAME_COUNT = 217;
const FRAME_BASE  = "/frames/kiwano";

// Heading reveal window, as a fraction of the pinned scroll (82% → 96%).
const TEXT_FADE_START = 0.82;
const TEXT_FADE_SPAN  = 0.14;

export default function HeroKiwanoVilla({ hero }) {
  const { wrapperRef, canvasRef, textRef, staticOnly } = useFrameSequence({
    frameBase:     FRAME_BASE,
    frameCount:    FRAME_COUNT,
    textFadeStart: TEXT_FADE_START,
    textFadeSpan:  TEXT_FADE_SPAN,
  });

  const heading = hero?.heading || "Elegant Spaces For Built Views Photo Frame";

  return (
    <>
      <NewNavbar />

      {/* Scroll track. 500 viewports tall → the hero stays pinned for ~400
          viewports of scroll while the frames play (longer = slower video;
          300 felt rushed). Collapses to a single
          screen when the sequence is skipped (reduced motion / low memory). */}
      <section
        ref={wrapperRef}
        aria-label="Kiwano Villas"
        className={
          staticOnly
            ? "relative w-full h-screen supports-[height:100lvh]:h-lvh"
            : "relative w-full h-[500vh] supports-[height:100lvh]:h-[500lvh]"
        }
      >
        {/* Pinned stage. The first frame is a CSS background, served per
            orientation, so the very first paint is already correct before
            any JS runs. */}
        <div
          className="sticky top-0 w-full overflow-hidden h-screen supports-[height:100lvh]:h-lvh bg-cover bg-center bg-no-repeat bg-[url('/frames/kiwano/frame_0001.webp')] portrait:bg-[url('/frames/kiwano/portrait/frame_0001.webp')]"
        >
          {/* Frame canvas — cover-fit drawing handled by the hook. */}
          {!staticOnly && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 block w-full h-full"
              style={{ zIndex: 0 }}
            />
          )}

          {/* Dark tint for text legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.2)", zIndex: 1 }}
          />

          {/* Heading — opacity/transform driven by the hook's GSAP ticker.
              Sized to the always-visible viewport (svh) so it stays centred
              above the iOS toolbar. */}
          <div
            ref={textRef}
            className="absolute inset-x-0 top-0 flex items-center justify-center pointer-events-none h-screen supports-[height:100svh]:h-svh"
            style={{
              zIndex:     2,
              opacity:    staticOnly ? 1 : 0,
              transform:  staticOnly ? "none" : "translateY(28px)",
              willChange: "opacity, transform",
              paddingLeft:   "max(24px, env(safe-area-inset-left))",
              paddingRight:  "max(24px, env(safe-area-inset-right))",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <h1
              className="m-0 text-center text-white capitalize w-[min(298px,84vw)] md:w-[clamp(280px,50.37vw,698px)] text-[38px] leading-[42px] tracking-[-2px] md:text-[clamp(28px,4.167vw,60px)] md:leading-[1.1] md:tracking-[-0.05em]"
              style={{
                fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                fontWeight: 500,
                textShadow: "0 4px 24px rgba(0,0,0,0.45)",
                textWrap:   "balance",
              }}
            >
              {heading}
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
