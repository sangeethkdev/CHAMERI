"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NewNavbar from "../common/NewNavbar";

gsap.registerPlugin(ScrollTrigger);

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
const FRAME_BASE = "/frames/kiwano-villament";
const FRAME_SETS = {
  landscape: { dir: FRAME_BASE,               ext: "jpg"  },
  portrait:  { dir: `${FRAME_BASE}/portrait`, ext: "webp" },
};
const PORTRAIT_QUERY = "(orientation: portrait)";

// Lerp factor — how fast smoothProgress chases raw scroll.
// 0.06 = cinematic/floaty  |  0.10 = balanced  |  0.16 = snappy
const LERP = 0.08;

// Draw image with object-fit:cover behaviour on the canvas
function drawCover(ctx, img, cw, ch) {
  const iw = img.naturalWidth  || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;

  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;
  ctx.drawImage(img, dx, dy, dw, dh);
}

export default function KiwanoVHero({ hero }) {
  const wrapperRef     = useRef(null);
  const canvasRef      = useRef(null);
  const textRef        = useRef(null);
  const framesRef      = useRef([]);      // Image[]
  const drawnFrameRef  = useRef(-1);      // last frame index drawn

  /* Bumped when the viewport flips between portrait and landscape (a phone
     rotating), which re-runs the frame effect below so it reloads the frame
     set that matches the new orientation. */
  const [orientationKey, setOrientationKey] = useState(0);
  useEffect(() => {
    const mq = window.matchMedia(PORTRAIT_QUERY);
    const onChange = () => setOrientationKey((k) => k + 1);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Draw a specific frame index to the canvas
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = framesRef.current[index];
    if (!img?.complete || img.naturalWidth === 0) return;
    if (drawnFrameRef.current === index) return; // skip redraw of same frame

    const ctx = canvas.getContext("2d");
    /* The 1920px frames are scaled DOWN into the canvas; the high-quality
       resampler keeps fine detail (railings, roof slats) from aliasing. */
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    drawCover(ctx, img, canvas.width, canvas.height);
    drawnFrameRef.current = index;
  }, []);

  /* Size the canvas backing store in DEVICE pixels, not CSS pixels.
     Phones report devicePixelRatio 2–3, so a canvas sized in CSS pixels holds
     a third of the detail the screen can show and the browser upscales it —
     which is why the hero looked soft on mobile but sharp on desktop (DPR 1).
     The portrait frames are 1170px wide, so there is real detail to recover.
     The DPR cap depends on the viewport: phones (DPR 3) get the full 3 —
     their CSS area is small, so even at 3× the canvas is ~3M pixels, no more
     than a 1080p desktop at 2×. Wider viewports stay capped at 2, where a
     4K-class canvas would make every scroll-tick redraw noticeably costly. */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;
    const dprCap = cssW <= 900 ? 3 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const nextW = Math.round(cssW * dpr);
    const nextH = Math.round(cssH * dpr);

    /* Writing width/height clears the canvas, so only touch them on a real
       size change — otherwise every ResizeObserver tick would blank the
       frame. The drawnFrame reset forces the redraw below to actually run,
       since drawFrame() skips repeats of the same index. */
    if (canvas.width !== nextW || canvas.height !== nextH) {
      canvas.width  = nextW;
      canvas.height = nextH;
      drawnFrameRef.current = -1;
    }

    drawFrame(Math.max(drawnFrameRef.current, 0));
  }, [drawFrame]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas  = canvasRef.current;
    const textEl  = textRef.current;
    if (!wrapper || !canvas) return;

    /* Read the orientation synchronously here rather than from state, so a
       phone picks the portrait set on its very first run and never starts
       downloading the landscape set only to throw it away. On a re-run after
       rotation, frames from the previous set are dropped and the drawn index
       reset so the first frame of the new set actually paints. */
    const frameSet = window.matchMedia(PORTRAIT_QUERY).matches
      ? FRAME_SETS.portrait
      : FRAME_SETS.landscape;
    framesRef.current = [];
    drawnFrameRef.current = -1;

    // ── 1. Size canvas ───────────────────────────────────────────────────
    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvas);

    // ── 2. Preload frames — frame 0 first (high priority), then the rest ─
    //   Loading all 217 at once floods the browser queue and delays frame 0.
    //   We load frame 0 with fetchPriority "high", draw it immediately, then
    //   kick off the remaining 216 in parallel.
    const makeImg = (i) => {
      const img = new Image();
      const n   = String(i + 1).padStart(4, "0");
      img.src   = `${frameSet.dir}/frame_${n}.${frameSet.ext}`;
      framesRef.current[i] = img;
      return img;
    };

    // Frame 0 — highest priority, draw as soon as it arrives
    const first = makeImg(0);
    first.fetchPriority = "high";
    first.onload = () => drawFrame(0);

    // Remaining frames — load in parallel after a short yield so frame 0
    // gets a head-start in the network queue
    let restRAF = 0;
    restRAF = requestAnimationFrame(() => {
      for (let i = 1; i < FRAME_COUNT; i++) makeImg(i);
    });

    // ── 3. Scroll tracking + lerp loop ──────────────────────────────────
    let rawProgress    = 0;
    let smoothProgress = 0;

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start:   "top top",
      end:     "bottom bottom",
      onUpdate: (self) => { rawProgress = self.progress; },
    });

    const onTick = () => {
      // Lerp with settle guard (prevents infinite micro-seeks near the end)
      const diff = rawProgress - smoothProgress;
      smoothProgress = Math.abs(diff) < 0.0002
        ? rawProgress
        : smoothProgress + diff * LERP;

      // Frame index
      const idx = Math.min(
        Math.floor(smoothProgress * (FRAME_COUNT - 1)),
        FRAME_COUNT - 1
      );
      drawFrame(idx);

      // Text overlay — fades in during the last 14 % of scroll travel
      if (textEl) {
        const tp    = Math.max(0, Math.min(1, (smoothProgress - 0.82) / 0.14));
        const eased = tp * tp * (3 - 2 * tp); // smoothstep
        textEl.style.opacity   = eased;
        textEl.style.transform = `translateY(${(1 - eased) * 28}px)`;
      }
    };

    gsap.ticker.add(onTick);
    gsap.ticker.fps(60);

    return () => {
      cancelAnimationFrame(restRAF);
      ro.disconnect();
      st.kill();
      gsap.ticker.remove(onTick);
    };
  }, [drawFrame, resizeCanvas, orientationKey]);

  return (
    <>
      <NewNavbar />

      {/* 300 vh wrapper — sticky canvas pins for ~200 vh of actual scroll */}
      <div
        ref={wrapperRef}
        style={{ position: "relative", width: "100%", height: "300vh" }}
      >
        {/* Poster (first frame) shown until the canvas paints. Served per
            orientation through Tailwind's `portrait:` variant so a phone's
            very first paint is already the sharp portrait crop — no flash of
            the soft landscape frame while JS decides which set to load. */}
        <div
          className="bg-cover bg-center bg-[url('/frames/kiwano-villament/frame_0001.jpg')] portrait:bg-[url('/frames/kiwano-villament/portrait/frame_0001.webp')]"
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

          {/* Frame canvas — fills viewport, cover behaviour handled in drawCover() */}
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

          {/* Text overlay — driven imperatively by the GSAP ticker */}
          <div
            ref={textRef}
            style={{
              position:      "absolute",
              inset:         0,
              zIndex:        2,
              opacity:       0,
              transform:     "translateY(28px)",
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
