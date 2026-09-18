"use client";

import NewNavbar from "../common/NewNavbar";
import useFrameSequence from "@/hooks/useFrameSequence";

// Total frames extracted by FFmpeg (24 fps × 9.04 s = 217)
const FRAME_COUNT = 217;

/* Two extractions of the same 217 frames, chosen by viewport orientation.
 *
 * landscape — the original 1920×1208 JPEGs. Fine on desktop, where the frame
 *   is shown close to 1:1.
 * portrait  — a 9:16 centre crop at 1170×2080 (WebP) taken from the ~3600px
 *   source video. A phone held upright only ever displays a narrow vertical
 *   slice of the landscape frame — roughly 560 source pixels stretched across
 *   1179 physical pixels on an iPhone — which is why the hero looked soft on
 *   real phones. The portrait set hands the phone the pixels it actually
 *   shows, at about 1:1. It is also the smaller download of the two.
 */
const FRAME_BASE = "/frames/kiwano";

export default function KiwanoHero({ hero }) {
  /* Canvas sizing, frame residency and the GSAP scrub ticker all live in
     useFrameSequence, which this and KiwanoVHero share. The engine used to be
     duplicated in both files, and both copies preloaded all 217 frames and
     never released one — around 2 GB of decoded bitmaps, which is what was
     getting the tab killed on iPhones. See the hook for the full note. */
  const { wrapperRef, canvasRef, textRef, staticOnly } = useFrameSequence({
    frameBase:  FRAME_BASE,
    frameCount: FRAME_COUNT,
  });

  return (
    <>
      <NewNavbar />

      {/* 300 vh wrapper — sticky canvas pins for ~200 vh of actual scroll.
          When the sequence is skipped (reduced-motion, or a device that
          reports very little RAM) there is nothing to scrub through, so the
          section collapses to a single viewport showing the poster. */}
      <div
        ref={wrapperRef}
        style={{ position: "relative", width: "100%", height: staticOnly ? "100vh" : "300vh" }}
      >
        {/* Poster (first frame) shown until the canvas paints. Served per
            orientation through Tailwind's `portrait:` variant so a phone's
            very first paint is already the sharp portrait crop — no flash of
            the soft landscape frame while JS decides which set to load. */}
        <div
          className="bg-cover bg-center bg-[url('/frames/kiwano/frame_0001.jpg')] portrait:bg-[url('/frames/kiwano/portrait/frame_0001.webp')]"
          style={{
            position:            "sticky",
            top:                 0,
            width:               "100%",
            height:              "100vh",
            overflow:            "hidden",
          }}
        >
          {/* Dark tint */}
          <div
            style={{
              position:      "absolute",
              inset:         0,
              background:    "rgba(0,0,0,0.2)",
              zIndex:        1,
              pointerEvents: "none",
            }}
          />

          {/* Frame canvas — fills viewport, cover behaviour handled in drawCover().
              Omitted entirely when the sequence is skipped, so no canvas
              backing store is allocated and the CSS poster above shows
              through on its own. */}
          {!staticOnly && (
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                inset:    0,
                width:    "100%",
                height:   "100%",
                zIndex:   0,
                display:  "block",
              }}
            />
          )}

          {/* Text overlay — driven imperatively by the GSAP ticker. With the
              sequence skipped nothing drives it, so it starts fully visible
              rather than waiting for a fade that will never run. */}
          <div
            ref={textRef}
            style={{
              position:      "absolute",
              inset:         0,
              zIndex:        2,
              opacity:       staticOnly ? 1 : 0,
              transform:     staticOnly ? "none" : "translateY(28px)",
              willChange:    "opacity, transform",
              pointerEvents: "none",
            }}
          >
            {/* Mobile — 390×725 frame, text box 298.41×168, centered in the padded (50px/50px) frame */}
            <div
              className="flex md:hidden"
              style={{
                position:       "absolute",
                inset:          0,
                paddingTop:     "50px",
                paddingBottom:  "50px",
                alignItems:     "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width:          "min(298.41px, 84vw)",
                  height:         "168px",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                }}
              >
                <h1
                  style={{
                    fontFamily:    "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                    fontWeight:    500,
                    fontSize:      "38px",
                    lineHeight:    "42px",
                    letterSpacing: "-2px",
                    textAlign:     "center",
                    textTransform: "capitalize",
                    color:         "#ffffff",
                    margin:        0,
                    textShadow:    "0 4px 24px rgba(0,0,0,0.45)",
                  }}
                >
                  {hero?.heading || "Elegant Spaces For Built Views Photo Frame"}
                </h1>
              </div>
            </div>

            {/* Desktop */}
            <div
              className="hidden md:flex"
              style={{
                position:       "absolute",
                top:            "42.70%",
                left:           "50%",
                transform:      "translateX(-50%)",
                width:          "clamp(280px, 50.37vw, 697.67px)",
                height:         "133px",
                alignItems:     "center",
                justifyContent: "center",
              }}
            >
              <h1
                style={{
                  fontFamily:    "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                  fontWeight:    500,
                  fontSize:      "clamp(28px, 4.167vw, 60px)",
                  lineHeight:    1.1,
                  letterSpacing: "-0.05em",
                  textAlign:     "center",
                  color:         "#ffffff",
                  margin:        0,
                  textShadow:    "0 4px 24px rgba(0,0,0,0.45)",
                }}
              >
                {hero?.heading || "Elegant Spaces For Built Views Photo Frame"}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
