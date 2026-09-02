// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import Image from "next/image";
// import Navbar from "../common/Navbar";

// // ─── Easing helpers ────────────────────────────────────────────────────────────
// const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

// const mapRange = (value, inMin, inMax, outMin, outMax) => {
//   const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
//   return outMin + t * (outMax - outMin);
// };

// const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
// const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
// const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

// export default function HeroSection() {
//   const sectionRef = useRef(null);

//   const [progress, setProgress] = useState(0);
//   const [animState, setAnimState] = useState("intro"); // "intro", "waiting", "outro", "done"

//   // 1. Intro Animation Effect (0 to 60% automatically on mount)
//   useEffect(() => {
//     if ('scrollRestoration' in window.history) {
//       window.history.scrollRestoration = 'manual';
//     }
//     window.scrollTo(0, 0);

//     document.body.style.overflow = "hidden";

//     let start;
//     const duration = 2500;

//     const step = (timestamp) => {
//       if (!start) start = timestamp;
//       const elapsed = timestamp - start;
//       const t = clamp(elapsed / duration, 0, 1);

//       const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
//       setProgress(easedT * 0.6);

//       if (t < 1.0) {
//         requestAnimationFrame(step);
//       } else {
//         setAnimState("waiting");
//       }
//     };

//     requestAnimationFrame(step);

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, []);

//   // 2. Outro Animation (60 to 100% on click)
//   const handleClick = () => {
//     if (animState !== "waiting") return;
//     setAnimState("outro");

//     let start;
//     const duration = 2800; // 2.8 seconds for super smooth, majestic zoom

//     const step = (timestamp) => {
//       if (!start) start = timestamp;
//       const elapsed = timestamp - start;
//       const t = clamp(elapsed / duration, 0, 1);

//       const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
//       setProgress(0.6 + easedT * 0.4);

//       if (t < 1.0) {
//         requestAnimationFrame(step);
//       } else {
//         setAnimState("done");
//         document.body.style.overflow = ""; // Unlock scroll!
//       }
//     };

//     requestAnimationFrame(step);
//   };

//   // ── Derived values ────────────────────────────────────────────────────────────
//   const pct = Math.round(progress * 100);

//   // Animation phases
//   // Phase 1 (0.00 - 0.40): Logo scales UP. (Solid blue screen)
//   const phase1T = easeOutCubic(mapRange(progress, 0.0, 0.4, 0, 1));
//   // Phase 2 (0.40 - 0.60): Beige screen slides up from bottom to 140px. Logo moves up and scales down.
//   const phase2T = easeInOutCubic(mapRange(progress, 0.4, 0.6, 0, 1));
//   // Phase 3 (0.60 - 1.00): House scales smoothly across the entire outro duration.
//   const phase3T = mapRange(progress, 0.6, 1.0, 0, 1); // Linear interpolation, inherits the smooth easedT from handleClick!
//   // Phase 4 (0.80 - 1.00): Text fades in.
//   const phase4T = easeOutCubic(mapRange(progress, 0.80, 1.0, 0, 1));

//   // 1. Logo Morph
//   const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
//   const vh = typeof window !== "undefined" ? window.innerHeight : 1110;
//   const effectiveVw = clamp(vw, 320, 1440);

//   const scaleCenter = effectiveVw / 1440;
//   const scaleNavbar = 117.08 / 600;

//   // Instead of scaling the group up from 0 to 40%, we hold it at scaleCenter,
//   // and animate the intrinsic widths and heights below to handle the different aspect ratio changes.
//   const groupScale = progress <= 0.4
//     ? scaleCenter
//     : scaleCenter - phase2T * (scaleCenter - scaleNavbar);

//   // Interpolate intrinsic sizes from State 0 (140px width) to State 1 (Max zoom)
//   const markWidth = 140 + phase1T * (201.61 - 140);
//   const markHeight = 156.95 + phase1T * (226.03 - 156.95);

//   const textWidth = 140 + phase1T * (600 - 140);
//   const textHeight = 17.82 + phase1T * (76.39 - 17.82);

//   const logoGap = 11.31 + phase1T * (31.09 - 11.31);

//   const figmaCenterY = vh * 0.4056;
//   const navbarCenterY = 48.19;
//   const driftToNavbar = navbarCenterY - figmaCenterY;
//   const driftStart = vh * 0.05;

//   const groupY = progress <= 0.4
//     ? driftStart * (1 - phase1T)
//     : phase2T * driftToNavbar;

//   // 2. The Beige Curtain & House Scale
//   // The dark blue background is static. The beige background slides UP to cover it.
//   let beigeClipTopPx = vh;
//   if (progress > 0.4 && progress <= 0.6) {
//     beigeClipTopPx = vh - phase2T * (vh - 140);
//   } else if (progress > 0.6) {
//     beigeClipTopPx = 140 - phase3T * 140;
//   }
//   const beigeClipPath = `inset(${beigeClipTopPx}px 0 0 0)`;

//   // House image scales UP from 0.5 to 1.0 during Phase 3
//   const bgScale = 0.5 + phase3T * 0.5;

//   // Waves gently drift
//   const waveDrift = mapRange(progress, 0.0, 0.6, 20, -20);

//   // 3. Staggered Content Reveal
//   const head1T = easeOutQuart(mapRange(progress, 0.78, 0.90, 0, 1));
//   const head2T = easeOutQuart(mapRange(progress, 0.81, 0.92, 0, 1));
//   const lineT = easeOutQuart(mapRange(progress, 0.84, 0.94, 0, 1));
//   const sub1T = easeOutQuart(mapRange(progress, 0.87, 0.96, 0, 1));
//   const sub2T = easeOutQuart(mapRange(progress, 0.90, 0.98, 0, 1));

//   // Navbar elements fade in while the beige curtain covers the blue bar (Phase 3)
//   const navOpacity = phase3T;

//   // Percentage Counter fades out at the very end
//   const counterOpacity = progress < 0.95 ? 1 : mapRange(progress, 0.95, 1.0, 1, 0);

//   return (
//     <>
//       {/* ── Sticky Background (House Image) ───────────────────────────────────── */}
//       <div
//         className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none -z-10"
//       >

//         {/* Layer 0: Static Dark Blue Background & Waves */}
//         <div className="absolute inset-0 w-full h-full -z-30 overflow-hidden pointer-events-none bg-[#2A3A4A]">
//           <svg
//             viewBox="0 0 1440 1110"
//             preserveAspectRatio="xMidYMid slice"
//             className="absolute inset-0 w-full h-full opacity-50"
//             style={{ transform: `translateY(${waveDrift}px)` }}
//           >
//             <image href="/icons/Vector (1).svg" x="-15.98" y="-110" width="1453.91" height="313.69" />
//             <image href="/icons/Vector (2).svg" x="-16" y="53.02" width="1455.59" height="482.03" />
//             <image href="/icons/Vector (3).svg" x="-16" y="382.24" width="1456" height="482.43" />
//             <image href="/icons/Vector (4).svg" x="658.34" y="711.44" width="781.16" height="298.4" />
//           </svg>
//         </div>

//         {/* Layer 1: Sliding Beige Curtain & House Image */}
//         <div
//           className="absolute inset-0 w-full h-full -z-20 bg-[#EDE7DE]"
//           style={{ clipPath: beigeClipPath, WebkitClipPath: beigeClipPath }}
//         >
//           {/* House Image Container scales from center bottom */}
//           <div
//             className="absolute inset-0 w-full h-full origin-bottom"
//             style={{ transform: `scale3d(${bgScale}, ${bgScale}, 1)`, transformOrigin: "center bottom" }}
//           >
//             <Image
//               src="/dummyimages/Frame 2121454280.png"
//               alt="Chameri villa exterior"
//               fill
//               sizes="100vw"
//               className="object-cover object-[center_top]"
//               priority
//             />
//           </div>
//         </div>
//       </div>

//       {/* ── Sticky Header (Logo & Navbar) ─────────────────────────────────────── */}
//       <div
//         className="sticky top-0 left-0 w-full h-screen pointer-events-none z-50 overflow-visible"
//         style={{ marginTop: "-100vh" }}
//       >
//         <div className="absolute top-0 left-0 w-full h-screen pointer-events-none">
//           {/* Layer 2: The Animated Logo Group */}
//           <div
//             className="absolute z-30 flex flex-col items-center"
//             style={{
//               left: "50%",
//               top: "40.56vh",
//               gap: `${logoGap}px`,
//               transform: `translate(-50%, -50%) translateY(${groupY}px) scale(${groupScale})`,
//               transformOrigin: "center center",
//             }}
//           >
//             <div style={{ position: "relative", width: `${markWidth}px`, height: `${markHeight}px` }}>
//               <Image src="/icons/logo (6).svg" alt="Chameri mark" fill sizes="400px" style={{ objectFit: "contain" }} priority />
//             </div>
//             <div style={{ position: "relative", width: `${textWidth}px`, height: `${textHeight}px` }}>
//               <Image src="/icons/logo (7).svg" alt="CHAMERI" fill sizes="800px" style={{ objectFit: "contain" }} priority />
//             </div>
//           </div>

//         </div>

//         {/* Layer 3: Navbar Header Layer (Menu, Contact) */}
//         <Navbar opacity={navOpacity} />
//       </div>

//       {/* ── Scrolling Content (Text) ────────────────────────────────────────── */}
//       <section
//         id="hero"
//         ref={sectionRef}
//         className={`relative w-full z-20 pointer-events-auto ${animState === 'waiting' ? 'cursor-pointer' : ''}`}
//         style={{
//           marginTop: "-100vh",
//           /* Figma canvas is 1440×1024 — use a 1024/1440 aspect ratio for the section */
//           height: "100vh",
//         }}
//         onClick={handleClick}
//       >
//         {/* ── Bottom gradient for text readability ── */}
//         <div
//           className="absolute inset-x-0 bottom-0 pointer-events-none"
//           style={{
//             height: "45%",
//             background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)",
//             opacity: head1T,
//           }}
//         />

//         {/* ══════════════════════════════════════════════════════════
//             GROUP DIV  — Figma: w:1043.5 h:387.55  top:602.47 left:329.5
//             Canvas: 1440×1024  →  top=58.83%  left=22.88%
//             ══════════════════════════════════════════════════════════ */}
//         <div
//           className="absolute pointer-events-none"
//           style={{
//             /* Position as % of the 1440×1024 canvas */
//             top: "58.83%",
//             left: "22.88%",
//             width: "72.47%",     /* 1043.5/1440 */
//             /* height intentionally auto — children define it */
//             opacity: head1T,
//             transform: `translateY(${40 * (1 - head1T)}px)`,
//           }}
//         >
//           {/* ── Heading line 1: "Premium residence for those"
//               Figma: w:780 h:65  top:602.47 left:329.5
//               Relative to group top-left → offset = 0,0
//               font: Roundo 500 60.41px / 64.08px / ls:-1.92px ── */}
//           <h1
//             style={{
//               fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
//               fontWeight: 500,
//               /* clamp: mobile 28px → tablet 42px → desktop ~60px based on vw */
//               fontSize: "clamp(28px, 4.195vw, 60.41px)",
//               lineHeight: "1.06",
//               letterSpacing: "-0.032em",
//               color: "#ffffff",
//               textAlign: "left",
//               margin: 0,
//               padding: 0,
//               whiteSpace: "nowrap",
//               textShadow: "0 2px 16px rgba(0,0,0,0.25)",
//             }}
//           >
//             Premium residence for those
//           </h1>

//           {/* ── Heading line 2: "who seek refined living."
//               Figma: w:611 h:65  top:667.01 left:414.19
//               Relative to group (top:602.47, left:329.5):
//                 offsetTop = 667.01-602.47 = 64.54px  → ~64.08px (≈ 1 line-height)
//                 offsetLeft = 414.19-329.5 = 84.69px  → 8.09% of 1440
//               ── */}
//           <h1
//             style={{
//               fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
//               fontWeight: 500,
//               fontSize: "clamp(28px, 4.157vw, 59.86px)",
//               lineHeight: "1.07",
//               letterSpacing: "-0.032em",
//               color: "#ffffff",
//               textAlign: "left",
//               margin: 0,
//               padding: 0,
//               paddingLeft: "clamp(12px, 5.88vw, 84.69px)",   /* 84.69/1440 = 5.88% */
//               whiteSpace: "nowrap",
//               textShadow: "0 2px 16px rgba(0,0,0,0.25)",
//             }}
//           >
//             who seek refined living.
//           </h1>
//         </div>

//         {/* ══════════════════════════════════════════════════════════
//             HORIZONTAL DIVIDER
//             Figma: w:701 h:1  top:866 left:672
//             Canvas: 1440×1024  →  top=84.57%  left=46.67%  width=48.68%
//             ══════════════════════════════════════════════════════════ */}
//         <div
//           className="absolute pointer-events-none"
//           style={{
//             top: "84.57%",
//             left: "46.67%",
//             width: "48.68%",    /* 701/1440 */
//             height: "1px",
//             backgroundColor: "rgba(255,255,255,0.4)",
//             opacity: lineT,
//           }}
//         />

//         {/* ══════════════════════════════════════════════════════════
//             LABEL: "YOUR VILLA PARTNER"
//             Figma: w:170 h:17  top:884.38 left:674.79
//             Canvas: 1440×1024  →  top=86.36%  left=46.86%
//             font: Geist 600 14px / 16.38px / ls:1.26px  uppercase  center
//             ══════════════════════════════════════════════════════════ */}
//         <div
//           className="absolute pointer-events-none"
//           style={{
//             top: "86.36%",
//             left: "46.86%",
//             width: "11.81%",   /* 170/1440 */
//             opacity: sub1T,
//             transform: `translateY(${20 * (1 - sub1T)}px)`,
//           }}
//         >
//           <span
//             style={{
//               fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
//               fontWeight: 600,
//               fontSize: "clamp(10px, 0.972vw, 14px)",
//               lineHeight: "16.38px",
//               letterSpacing: "1.26px",
//               textTransform: "uppercase",
//               textAlign: "center",
//               color: "rgba(255,255,255,0.9)",
//               display: "block",
//               whiteSpace: "nowrap",
//             }}
//           >
//             Your Villa Partner
//           </span>
//         </div>

//         {/* ══════════════════════════════════════════════════════════
//             DESCRIPTION CONTAINER
//             Figma: w:270.75 h:105  top:885.02 left:1102.25
//             Canvas: 1440×1024  →  top=86.43%  left=76.54%  width=18.80%
//             text: Geist 400 15.4px / 21px / ls:0%
//             ══════════════════════════════════════════════════════════ */}
//         <div
//           className="absolute pointer-events-none"
//           style={{
//             top: "86.43%",
//             left: "76.54%",
//             width: "18.80%",   /* 270.75/1440 */
//             opacity: sub2T,
//             transform: `translateY(${20 * (1 - sub2T)}px)`,
//           }}
//         >
//           <p
//             style={{
//               fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
//               fontWeight: 400,
//               fontSize: "clamp(11px, 1.069vw, 15.4px)",
//               lineHeight: "21px",
//               letterSpacing: "0",
//               color: "rgba(255,255,255,0.85)",
//               margin: 0,
//               padding: 0,
//             }}
//           >
//             We design and install bespoke glass systems for ambitious architectural projects. Every pane reflects our commitment to clarity, quality, and collaboration.
//           </p>
//         </div>

//         {/* ── Percentage Counter ── */}
//         <div
//           className="absolute pointer-events-none"
//           style={{
//             top: "85vh",
//             right: "6vw",
//             opacity: counterOpacity,
//           }}
//         >
//           <span className="font-outfit font-light text-white/90 leading-none tabular-nums"
//             style={{ fontSize: "clamp(34px,3.61vw,80px)", letterSpacing: "-0.06vw" }}>
//             {pct}%
//           </span>
//         </div>

//       </section>
//     </>
//   );
// }


// -----------------------------------------------------

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NewNavbar from "../common/NewNavbar";

// ─── Easing helpers ────────────────────────────────────────────────────────────
const clampVal = (v, min, max) => Math.min(Math.max(v, min), max);

const mapRange = (value, inMin, inMax, outMin, outMax) => {
  const t = clampVal((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
};

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

// The exact curve the Testimonial "Clients Notes" carousel uses for its quote
// reveal (TestimonialCarousel.jsx `revealVariants`: ease [0.65, 0, 0.35, 1]).
// Framer Motion consumes that as a cubic-bezier; this animation is driven by a
// RAF progress value rather than by Framer, so the same curve is applied as an
// explicit bezier solve. Symmetric ease-in-out — gentle start, gentle stop.
// That slow settle is what makes the testimonial text read as smooth, and
// reproducing it (rather than an easeOut) is what makes the hero text match.
const cubicBezier = (p1x, p1y, p2x, p2y) => {
  const A = (a, b) => 1 - 3 * b + 3 * a;
  const B = (a, b) => 3 * b - 6 * a;
  const C = (a) => 3 * a;
  const calc = (t, a, b) => ((A(a, b) * t + B(a, b)) * t + C(a)) * t;
  const slope = (t, a, b) => 3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a);
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    // Newton-Raphson: solve calc(t) = x for t, then evaluate the y curve at t.
    let t = x;
    for (let k = 0; k < 8; k++) {
      const d = slope(t, p1x, p2x);
      if (Math.abs(d) < 1e-6) break;
      t -= (calc(t, p1x, p2x) - x) / d;
    }
    return calc(t, p1y, p2y);
  };
};

// Named after its source so the link back to the carousel stays obvious.
const easeTestimonialReveal = cubicBezier(0.65, 0, 0.35, 1);

// Inverse of easeInOutCubic. The outro bakes that curve into `progress`, so
// recovering linear time is what lets a second curve be applied cleanly instead
// of compounding with it. Both halves are solved in closed form.
const inverseEaseInOutCubic = (y) => {
  if (y <= 0) return 0;
  if (y >= 1) return 1;
  return y < 0.5
    ? Math.cbrt(y / 4)
    : 1 - Math.cbrt((1 - y) / 4);
};

export default function HeroSection({ hero }) {
  const sectionRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [animState, setAnimState] = useState("intro"); // "intro" | "waiting" | "outro" | "done"
  const [viewport, setViewport] = useState({ vw: 1440, vh: 1110 });

  // Keep the logo's scale/position in sync with the viewport. Without this,
  // resizing (e.g. DevTools responsive mode) after the animation has settled
  // leaves the logo's transform frozen at the old viewport size, since
  // nothing else triggers a re-render once `progress` stops changing.
  //
  // Real mobile devices only: `window.innerHeight` (and CSS `100vh`) report
  // the browser's "layout viewport" — its height with the address bar
  // collapsed — even while the bar is still on screen shrinking the actually
  // visible area. That gap doesn't exist in desktop Chrome or in DevTools'
  // emulated mobile mode (no real address bar to hide/show), which is why
  // the logo lines up fine there but sits too low, straddling the navy/cream
  // handoff, on a real phone. `visualViewport.height` tracks the true
  // visible height instead, so the mobile branch below reads from it (and
  // re-measures on visualViewport's own resize event, which fires as the
  // address bar animates) while desktop keeps using `window.innerHeight`.
  useEffect(() => {
    const updateViewport = () => {
      const vv = window.visualViewport;
      const isMobileWidth = window.innerWidth < 640;
      const vh = isMobileWidth && vv ? vv.height : window.innerHeight;
      setViewport({ vw: window.innerWidth, vh });
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    window.visualViewport?.addEventListener("resize", updateViewport);
    return () => {
      window.removeEventListener("resize", updateViewport);
      window.visualViewport?.removeEventListener("resize", updateViewport);
    };
  }, []);

  // The reveal is user-driven. These are refs, not state, because the gesture
  // listeners below have to read the current values synchronously — a burst of
  // wheel events all fires before React can re-render, so a state-based guard
  // would let the outro start several times over.
  const introDoneRef = useRef(false);
  const revealStartedRef = useRef(false);
  const pendingRevealRef = useRef(false);

  // 1. Outro Animation (60 → 100%) — plays once, then unlocks the page
  const startReveal = useCallback(() => {
    if (revealStartedRef.current) return;
    revealStartedRef.current = true;
    setAnimState("outro");

    let start;
    const duration = 1000;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const t = clampVal(elapsed / duration, 0, 1);
      const easedT = easeInOutCubic(t);
      setProgress(0.6 + easedT * 0.4);

      if (t < 1.0) {
        requestAnimationFrame(step);
      } else {
        setAnimState("done");
        document.body.style.overflow = "";
      }
    };

    requestAnimationFrame(step);
  }, []);

  // A gesture that lands mid-intro is remembered rather than dropped, so an
  // impatient first scroll still counts — it fires the moment the intro settles.
  const requestReveal = useCallback(() => {
    if (revealStartedRef.current) return;
    if (!introDoneRef.current) {
      pendingRevealRef.current = true;
      return;
    }
    startReveal();
  }, [startReveal]);

  // 2. Intro Animation (0 → 60%) on mount
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    let start;
    let rafId;
    const duration = 2500;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const t = clampVal(elapsed / duration, 0, 1);
      const easedT = easeInOutCubic(t);
      setProgress(easedT * 0.6);

      if (t < 1.0) {
        rafId = requestAnimationFrame(step);
      } else {
        introDoneRef.current = true;
        setAnimState("waiting");
        if (pendingRevealRef.current) startReveal();
      }
    };

    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
    };
  }, [startReveal]);

  // 3. A single scroll gesture triggers the reveal. Native scrolling is locked
  // (body overflow is hidden until the outro finishes) so the `scroll` event
  // never fires here — wheel, touch and keys are the only signals available.
  //
  // The 8px touchmove threshold alone isn't reliable on every mobile browser
  // (gesture-nav swipe interception, gesture-event timing, gesture cancels
  // fired before enough delta accumulates, …) — any of those leave a visitor
  // stuck on the half-revealed frame with the page's scroll still locked.
  // touchend is a second, coarser signal: it fires once the gesture completes
  // even if touchmove never reported enough travel, so any upward-ish touch —
  // swipe or plain tap — still gets through.
  useEffect(() => {
    if (animState === "outro" || animState === "done") return;

    let touchStartY = null;

    const onWheel = (e) => {
      if (e.deltaY > 0) requestReveal();
    };

    const onTouchStart = (e) => {
      touchStartY = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e) => {
      if (touchStartY === null) return;
      // Swiping the finger up is a downward scroll. 8px of travel filters out
      // the jitter of a stationary touch.
      if (touchStartY - (e.touches[0]?.clientY ?? touchStartY) > 8) requestReveal();
    };

    const onTouchEnd = () => {
      // Reaching here at all means touchmove's threshold never fired —
      // treat the completed gesture (swipe or tap) as intent to continue.
      touchStartY = null;
      requestReveal();
    };

    const onKeyDown = (e) => {
      if (["ArrowDown", "PageDown", "End", " ", "Spacebar"].includes(e.key)) {
        requestReveal();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [animState, requestReveal]);

  // 4. Safety net: if no gesture is ever detected — the swipe/tap fails to
  // register at all on some mobile browser/device combination — the page
  // would otherwise stay scroll-locked on the half-revealed frame forever.
  // Auto-advance a few seconds after the intro settles so no visitor can get
  // permanently stuck, even if every gesture signal above somehow misses.
  useEffect(() => {
    if (animState !== "waiting") return;
    const id = setTimeout(() => requestReveal(), 4000);
    return () => clearTimeout(id);
  }, [animState, requestReveal]);

  // ── Derived values ─────────────────────────────────────────────────────────
  // `progress` spans both the intro (0→0.6) AND the outro reveal (0.6→1.0),
  // so displaying it directly reads as "60%" the whole time the page sits in
  // the "waiting" state — looking stuck/unfinished right when the intro has
  // actually finished loading. Rescale just the intro's own 0→0.6 span to a
  // 0–100% counter instead, so it reads 100% once settled and stays there
  // through the outro (rather than resuming a live 60→100% count on scroll,
  // which would contradict having just shown 100%).
  const pct = Math.min(100, Math.round((progress / 0.6) * 100));

  const phase1T = easeOutCubic(mapRange(progress, 0.00, 0.40, 0, 1));
  const phase2T = easeInOutCubic(mapRange(progress, 0.40, 0.60, 0, 1));
  const phase3T = mapRange(progress, 0.60, 1.00, 0, 1);

  // ── Logo morph ─────────────────────────────────────────────────────────────
  const { vw, vh } = viewport;
  const effectiveVw = clampVal(vw, 320, 1440);

  // Below the `sm` breakpoint, NewNavbar renders its own compact glass-pill
  // logo (mark 29.5×33.2, wordmark 85.93px wide, pill centered at top:13px
  // height:74px) instead of the desktop pill logo (wordmark 117.08px wide,
  // pill height ~96.38px). The outro must shrink into whichever one is
  // actually on screen, or the hand-off leaves an oversized logo floating
  // above a tiny navbar.
  const isMobile = vw < 640;

  const scaleCenter = effectiveVw / 1440;
  const scaleNavbar = isMobile ? 85.93 / 600 : 117.08 / 600;

  const groupScale = progress <= 0.4
    ? scaleCenter
    : scaleCenter - phase2T * (scaleCenter - scaleNavbar);

  // Intrinsic logo sizes — interpolated with phase1T
  // clamp ensures they never exceed Figma max on very wide viewports
  const markWidth = 140 + phase1T * (201.61 - 140);
  const markHeight = 156.95 + phase1T * (226.03 - 156.95);
  const textWidth = 140 + phase1T * (600 - 140);
  const textHeight = 17.82 + phase1T * (76.39 - 17.82);
  const logoGap = 11.31 + phase1T * (31.09 - 11.31);

  // Logo Y drift
  const figmaCenterY = vh * 0.5;
  const navbarCenterY = isMobile ? 50 : 48.19;
  const driftToNavbar = navbarCenterY - figmaCenterY;
  const driftStart = vh * 0.05;

  const groupY = progress <= 0.4
    ? driftStart * (1 - phase1T)
    : phase2T * driftToNavbar;

  // ── Beige curtain ──────────────────────────────────────────────────────────
  // Navbar height per Figma: padding-top 14 + inner 68.38 + padding-bottom 14 = 96.38px
  // (mobile: glass-pill top offset 13px + pill height 74px = 87px)
  const NAVBAR_H = isMobile ? 87 : 96.37937927246094;
  let beigeClipTopPx = vh;
  if (progress > 0.4 && progress <= 0.6) {
    beigeClipTopPx = vh - phase2T * (vh - NAVBAR_H);
  } else if (progress > 0.6) {
    beigeClipTopPx = NAVBAR_H - phase3T * NAVBAR_H;
  }
  const beigeClipPath = `inset(${beigeClipTopPx}px 0 0 0)`;

  // ── House image scale: always fills viewport, subtle zoom-in during outro ──────────
  // Starts at 1.0 (full viewport) and zooms to 1.08 — never appears as a small box
  const bgScale = 0.7 + phase3T * 0.3;

  // ── Waves ──────────────────────────────────────────────────────────────────
  const waveDrift = mapRange(progress, 0.0, 0.6, 20, -20);

  // ── Staggered content reveal ───────────────────────────────────────────────
  const head1T = easeOutQuart(mapRange(progress, 0.78, 0.90, 0, 1));
  const lineT = easeOutQuart(mapRange(progress, 0.84, 0.94, 0, 1));
  const sub1T = easeOutQuart(mapRange(progress, 0.87, 0.96, 0, 1));
  const sub2T = easeOutQuart(mapRange(progress, 0.90, 0.98, 0, 1));

  const counterOpacity = progress < 0.95 ? 1 : mapRange(progress, 0.95, 1.0, 1, 0);

  // The new top/bottom info rows use fixed dark/light text colors matched to
  // the cream-and-photo backdrop that's only actually on screen once the
  // beige curtain has mostly risen. Before that (progress 0–0.5) the full
  // viewport is still the dark navy intro background, where that text
  // wouldn't read — so fade the rows in over the same span the curtain
  // finishes revealing, rather than showing them from progress 0.
  const infoRowT = mapRange(progress, 0.5, 0.65, 0, 1);

  // ── Top row: the Testimonial "Clients Notes" upward reveal ───────────────
  //
  // Matching that carousel means matching three things, not merely "moves up":
  //
  //   easing   — cubic-bezier(0.65, 0, 0.35, 1), taken verbatim from
  //              TestimonialCarousel's `revealVariants`. Symmetric ease-in-out,
  //              so the text eases in gently and eases to a stop just as gently.
  //   distance — the carousel travels in PERCENT of the element's own height
  //              (100% → 0% → -100%), never in pixels, so the motion stays
  //              proportional to the text instead of being a fixed nudge. The
  //              transform below uses the same unit.
  //   masking  — each quote line sits in a fixed-height `overflow: hidden`
  //              slot, so the text is clipped as it travels rather than
  //              drifting freely across the page. The row's wrapper does the
  //              same, which is why it is split into two elements below.
  //
  // What necessarily differs: the carousel runs on Framer's own 1.1s timer,
  // while this has to stay locked to the image reveal. So the same curve is fed
  // `phase3T` — the 0.60→1.00 value that already opens the curtain
  // (beigeClipTopPx) and zooms the house (bgScale). The text shares one
  // timeline with the image and cannot drift out of sync, while the motion
  // itself — curve, unit, and masking — is the carousel's.
  // `progress` is already eased — the outro writes 0.6 + easeInOutCubic(t) * 0.4
  // — so phase3T is a pre-eased value, not linear time. Feeding it straight to
  // another curve would double-ease it: the earlier attempt did exactly that and
  // squeezed nearly all the travel into a ~200ms burst mid-reveal, which is the
  // opposite of the carousel's even glide. Undoing the outro's easing recovers
  // linear time, so the bezier below is the ONLY curve applied and the result is
  // the carousel's motion exactly.
  const revealLinearT = inverseEaseInOutCubic(phase3T);
  const revealLiftT = easeTestimonialReveal(revealLinearT);

  // -100% at full progress mirrors the carousel's `exit: { y: '-100%' }`: the
  // text rises by exactly its own height and is clipped away by the mask.
  const topRowLiftPct = -100 * revealLiftT;

  // Once the auto-reveal (outro) fully finishes, hand off from this animated
  // logo to NewNavbar's own logo: the big logo fades out and only then does
  // the navbar (with its own logo) fade in — they're never both visible.
  const isDone = animState === "done";

  return (
    <>
      {/* ── Sticky Background ─────────────────────────────────────────────── */}
      <div className="sticky top-0 left-0 w-full h-dvh overflow-hidden pointer-events-none -z-10">

        {/* Layer 0: Dark blue + waves */}
        <div className="absolute inset-0 w-full h-full -z-30 overflow-hidden pointer-events-none bg-[#2A3A4A]">
          <svg
            viewBox="0 0 1440 1110"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full opacity-50"
            style={{ transform: `translateY(${waveDrift}px)` }}
          >
            <image href="/icons/Vector (1).svg" x="-15.98" y="-110" width="1453.91" height="313.69" />
            <image href="/icons/Vector (2).svg" x="-16" y="53.02" width="1455.59" height="482.03" />
            <image href="/icons/Vector (3).svg" x="-16" y="382.24" width="1456" height="482.43" />
            <image href="/icons/Vector (4).svg" x="658.34" y="711.44" width="781.16" height="298.4" />
          </svg>
        </div>

        {/* Layer 1: Beige curtain + house */}
        <div
          className="absolute inset-0 w-full h-full -z-20 bg-[#EDE7DE]"
          style={{ clipPath: beigeClipPath, WebkitClipPath: beigeClipPath }}
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              transform: `scale3d(${bgScale}, ${bgScale}, 1)`,
              transformOrigin: "center bottom",
            }}
          >
            {/*
             * Two crops of the same villa, one per orientation. A single
             * landscape source object-cover'd into a tall phone viewport
             * crops to the middle of the house and loses the framing, so
             * mobile gets a portrait crop composed for that shape.
             *
             * Both are rendered and toggled with CSS rather than swapped on a
             * JS breakpoint: this is the LCP image, so the correct one has to
             * be in the initial HTML for the preloader to fetch it. `sizes`
             * is what keeps that from costing anything — the hidden one
             * matches no media condition, so the browser never downloads it.
             */}
            {/* hero-mobile.png is a renamed copy of "iPhone 13 & 14 - 10.png"
                — the original name's spaces and "&" broke the image URL on
                the production host (the & reads as a query-string separator
                unless every proxy in front encodes it), so the served file
                carries a URL-safe name. */}
            <Image
              src="/images/hero-mobile.png"
              alt="Chameri villa exterior"
              fill
              sizes="(max-width: 767px) 100vw, 0px"
              className="object-cover object-[center_top] md:hidden"
              priority
            />
            {/* alt="" — the mobile copy above already carries the description,
                so this one is decorative to avoid a duplicate announcement. */}
            <Image
              src="/dummyimages/Frame 2121454280.png"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 767px) 0px, 100vw"
              className="object-cover object-[center_top] hidden md:block"
              priority
            />
          </div>
        </div>
      </div>

      {/* ── Sticky Header (Logo & Navbar) ─────────────────────────────────── */}
      <div
        className="sticky top-0 left-0 w-full h-dvh pointer-events-none z-50 overflow-visible"
        style={{ marginTop: "-100dvh" }}
      >
        <div className="absolute top-[1%]  left-0 w-full h-dvh pointer-events-none">

          {/* Layer 2: Animated logo group — fades out once the reveal is
              done, handing off to NewNavbar's own logo below */}
          <div
            className="absolute z-30 flex flex-col items-center"
            style={{
              left: "50%",
              top: "clamp(42%, 48%, 52%)",
              gap: `${logoGap}px`,
              transform: `translate(-50%, -50%) translateY(${groupY}px) scale(${groupScale})`,
              transformOrigin: "center center",
              opacity: isDone ? 0 : 1,
              transition: "opacity 0.4s ease",
            }}
          >
            <div style={{ position: "relative", width: `${markWidth}px`, height: `${markHeight}px` }}>
              <Image
                src="/icons/logo (6).svg"
                alt="Chameri mark"
                fill
                sizes={isMobile ? "200px" : "400px"}
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div style={{ position: "relative", width: `${textWidth}px`, height: `${textHeight}px` }}>
              <Image
                src="/icons/logo (7).svg"
                alt="CHAMERI"
                fill
                sizes={isMobile ? "400px" : "800px"}
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* Layer 3: Navbar — only fades in (with its own logo) once the
            animated logo above has fully hidden itself */}
        <NewNavbar opacity={isDone ? 1 : 0}  />

        {/* ══════════════════════════════════════════════════════════════════════
            TOP INFO ROW — quick links (left) + tagline heading (right)
            Figma canvas: 1440 × 900px
            Row: w:1360  h:58  top:175  left:40  justify-content:space-between
            Converted → top: 175/900 = 19.44vh   left/right: 40/1440 = 2.78vw
            Lives in the viewport-pinned Sticky Header (like the logo/navbar
            above it), not in the `<section>` below — that section is offset
            by a scroll-rig negative margin so its own percentages don't
            correspond to actual viewport position; this does. Desktop only,
            matching the sm:block content block below — the mobile hero has
            its own, separately-designed stacked layout.
        ════════════════════════════════════════════════════════════════════════ */}
        {/* Outer: positioning, fade and the clipping mask. Kept separate from
            the moving layer because one element cannot both be the mask and be
            the thing sliding inside it — the carousel solves this the same way,
            with a fixed-height `overflow: hidden` slot per quote line. */}
        <div
          className="hidden sm:block absolute pointer-events-auto"
          style={{
            top: "clamp(90px, 13.44vh, 155px)",
            left: "clamp(20px, 2.78vw, 40px)",
            right: "clamp(20px, 2.78vw, 40px)",
            opacity: infoRowT * counterOpacity,
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Inner: the layer that actually travels, in percent of its own
              height — the carousel's unit — so both marked elements rise
              together and are clipped by the mask above. The original 20px
              fade-in settle is preserved and simply added to the lift. */}
          <div
            className="flex items-center justify-between"
            style={{
              transform: `translateY(calc(${20 * (1 - infoRowT)}px + ${topRowLiftPct}%))`,
              willChange: "transform",
            }}
          >
            {/* Quick links — Figma: w:200 h:21 gap:16 */}
            <nav
              className="flex items-center"
              style={{ gap: "clamp(10px, 1.11vw, 16px)", marginBottom: "20px" }}
            >
              {[
                { label: "Projects", href: "/project-list" },
                { label: "Service", href: "/services" },
                { label: "Gallery", href: "/gallery" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="hover:opacity-70 transition-opacity"
                  style={{
                    fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1.11vw, 16px)",
                    lineHeight: "100%",
                    letterSpacing: "0",
                    textAlign: "center",
                    textTransform: "capitalize",
                    color: "#000000",
                    whiteSpace: "nowrap",

                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Tagline heading — Figma: w:346 h:58, Roundo 500 24px, right-aligned */}
            <p
              style={{
                width: "clamp(220px, 26.43vw, 396px)",
                margin: 0,
                fontFamily: "var(--font-roundo), 'Roundo', var(--font-outfit), system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(18px, 1.667vw, 24px)",
                lineHeight: "100%",
                letterSpacing: "0",
                textAlign: "right",
                textTransform: "capitalize",
                color: "#000000",
                paddingTop:'20px',
              }}
            >
              Premium residences for those who seek refined living.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            BOTTOM INFO ROW — "Scroll down" hint (left) + live percentage (right)
            Figma canvas: 1440 × 900px
            Row: w:1375  h:41  top:694  left:32  justify-content:space-between
            Converted → top: 694/900 = 77.11vh   left/right: 32/1440 ≈ 2.22vw
            Figma calls for #00000080 (black/50%) text, but early in the
            animation this row sits over the still-navy intro background
            (before the curtain has risen this far down), and later over the
            photo — black text isn't reliably readable against either, so it
            keeps the same translucent-white treatment the rest of the hero
            uses over dark/photo backdrops. */}
        <div
          className="hidden sm:flex absolute items-center justify-between pointer-events-none"
          style={{
            top: "clamp(340px, 95.11vh, 994px)",
            left: "clamp(16px, 2.22vw, 32px)",
            right: "clamp(16px, 2.29vw, 33px)",
            opacity: infoRowT * counterOpacity,
            transform: `translateY(${20 * (1 - infoRowT)}px)`,
          }}
        >
          {/* "Scroll down" + chevron — Figma: w:132 h:41 gap:4 padding:10 */}
          <div
            className="flex items-center"
            style={{ gap: "clamp(3px, 0.28vw, 4px)", padding: "clamp(6px, 0.69vw, 10px)" }}
          >
            <span
              className="tabular-nums"
              style={{
                fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(13px, 1.11vw, 16px)",
                lineHeight: "100%",
                letterSpacing: "0",
                textAlign: "center",
                color: "#00000080",
              }}
            >
              Scroll down
            </span>
            <svg
              viewBox="0 0 19 8.3125"
              fill="none"
              style={{ width: "clamp(14px, 1.32vw, 19px)", height: "clamp(6px, 0.577vw, 8.3125px)" }}
            >
              <path d="M1 1L9.5 7.3125L18 1" stroke="#00000080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Live percentage — Figma: w:52 h:26 Geist 500 20.29px */}
          <span
            className="tabular-nums"
            style={{
              fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(16px, 1.409vw, 20.29px)",
              lineHeight: "100%",
              letterSpacing: "0",
              textAlign: "center",
              color: "#00000080",
            }}
          >
            {pct}%
          </span>
        </div>
      </div>

      {/* ── Scrolling Content ─────────────────────────────────────────────── */}
      <section
        id="hero"
        ref={sectionRef}
        className={`relative w-full z-20 pointer-events-auto ${animState === "waiting" ? "cursor-pointer" : ""}`}
        style={{ marginTop: "-60vh", height: "85vh" }}
        onClick={requestReveal}
      >

        {/* Bottom gradient for text readability */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "45%",
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)",
            opacity: head1T,
          }}
        />

        {/* ══════════════════════════════════════════════════════════════════════
            SINGLE PARENT CONTAINER
            Figma canvas: 1440 × 1024px
            Container:  w:1043.5  h:387.55  top:602.47  left:329.5
            Converted → top: 602.47/1024 = 58.83vh
                        left: 329.5/1440 = 22.88vw
                        width: 1043.5/1440 = 72.47vw
                        height: 387.55/1024 = 37.85vh
            overflow:visible so divider/label/description (below 387.55px)
            are not clipped.
        ════════════════════════════════════════════════════════════════════════ */}
        <div
          className="hidden sm:block absolute pointer-events-none"
          style={{
            top: "40.83%",         /* 602.47 / 1024 */
            left: "50%",            /* centered on the viewport instead of the Figma-literal 22.88% left offset, which put the heading right-of-center */
            width: "72.47%",         /* 1043.5 / 1440 */
            height: "37.85%",        /* 387.55 / 1024 */
            overflow: "visible",
            opacity: head1T,
            transform: `translate(-50%, ${40 * (1 - head1T)}px)`,
          }}
        >

          {/* ── Heading — "Premium residence for those who seek refined living."
              Rendered as ONE h1 (single sentence) with each line stacked in a
              centered flex column, so the block stays centered within its
              container no matter how long the admin-provided text is
              (the old absolute left-offsets were tuned to the default copy's
              exact word widths and went ragged/left-anchored with other text).
          ─────────────────────────────────────────────────────── */}
          <h1 style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* ── Line 1: "Premium residence for those" ── */}
            <span
              style={{
                maxWidth: "clamp(200px, 90vw, 1200px)",
                fontFamily: "var(--font-roundo), 'Roundo', var(--font-outfit), system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(20px, 4.095vw, 70.41px)",
                lineHeight: "1.06",   /* 64.08/60.41 — a fixed ratio scales with fontSize instead of drifting apart from it */
                letterSpacing: "clamp(-0.8px, -0.133vw, -1.92px)",
                color: "#ffffff",
                textAlign: "center",
                margin: 0,
                padding: 0,
                whiteSpace: "nowrap",
                textShadow: "0 2px 16px rgba(0,0,0,0.30)",
              }}
            >
              {hero?.heading || "Premium residence for those"}
            </span>

            {/* ── Line 2: "who seek refined living." ── */}
            <span
              style={{
                maxWidth: "clamp(160px, 80vw, 1000px)",
                fontFamily: "var(--font-roundo), 'Roundo'",
                fontWeight: 500,
                fontSize: "clamp(20px, 4.095vw, 70.41px)",
                lineHeight: "1.06",
                letterSpacing: "clamp(-0.8px, -0.133vw, -1.92px)",
                color: "#ffffff",
                textAlign: "center",
                margin: 0,
                padding: 0,
                whiteSpace: "nowrap",
                textShadow: "0 2px 16px rgba(0,0,0,0.30)",
              }}
            >
              {hero?.subheading1 || "who seek refined living."}
            </span>
          </h1>

          {/* ── Horizontal Divider
              Figma: w:701  h:1  top:866  left:672
              Relative to parent (602.47, 329.5):
                top = 866 - 602.47 = 263.53px
                left = 672 - 329.5 = 342.5px
          ─────────────────────────────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              top: "clamp(160px, 25.74vh, 263.53px)",  /* 263.53/1024 */
              left: "clamp(120px, 23.78vw, 342.5px)",   /* 342.5/1440  */
              width: "clamp(200px, 48.68vw, 850px)",     /* 701/1440    */
              height: "1px",
              borderTop: "1px solid rgba(255,255,255,0.45)",
              opacity: lineT,
            }}
          />

          {/* ── Label: "YOUR VILLA PARTNER"
              Figma: w:170  h:17  top:884.38  left:674.79
              Relative to parent (602.47, 329.5):
                top = 884.38 - 602.47 = 281.91px
                left = 674.79 - 329.5 = 345.29px
          ─────────────────────────────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              top: "clamp(170px, 27.53vh, 281.91px)",  /* 281.91/1024 */
              left: "clamp(120px, 23.98vw, 345.29px)",  /* 345.29/1440 */
              width: "clamp(100px, 13.81vw, 200px)",     /* 170/1440    */
              height: "clamp(14px, 1.66vh, 17px)",        /* 17/1024     */
              opacity: sub1T,
              transform: `translateY(${20 * (1 - sub1T)}px)`,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(10px, 0.972vw, 14px)",
                lineHeight: "clamp(12px, 1.600vh, 16.38px)",  /* 16.38/1024 */
                letterSpacing: "clamp(0.8px, 0.0875vw, 1.26px)",
                textTransform: "uppercase",
                textAlign: "center",
                color: "rgba(255,255,255,0.9)",
                display: "block",
                whiteSpace: "nowrap",
              }}
            >
              {hero?.tagline || "WHERE LIFE SETTLES"}
            </span>
          </div>

          {/* ── Description Container
              Figma container: w:270.75  h:105  top:885.02  left:1102.25
              Figma text:      w:256     h:105
              Relative to parent (602.47, 329.5):
                top = 885.02 - 602.47 = 282.55px
                left = 1102.25 - 329.5 = 772.75px
          ─────────────────────────────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              top: "clamp(170px, 27.59vh, 282.55px)",  /* 282.55/1024 */
              left: "clamp(240px, 53.66vw, 772.75px)",  /* 772.75/1440 */
              width: "clamp(140px, 21.80vw, 650.75px)",  /* 270.75/1440 */
              height: "clamp(80px, 12.55vh, 250px)",      /* 105/1024    */
              opacity: sub2T,
              transform: `translateY(${20 * (1 - sub2T)}px)`,
            }}
          >
            <p
              style={{
                width: "clamp(50px, 21.78vw, 660px)",  /* 256/1440 */
                height: "clamp(80px, 12.55vh, 250px)",
                fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(11px, 1.169vw, 20.4px)",
                lineHeight: "clamp(15px, 2.551vh, 25px)",    /* 21/1024  */
                letterSpacing: "0",
                color: "rgba(255,255,255,0.85)",
                margin: 0,
                padding: 0,
              }}
            >
              {hero?.subheading2 || "We design and install bespoke glass systems for ambitious architectural projects. Every pane reflects our commitment to clarity, quality, and collaboration."}
            </p>
          </div>

        </div>{/* ── end single parent container ── */}

        {/* ══════════════════════════════════════════════════════════════════════
            MOBILE CONTENT (< sm) — Figma frame: 390×933, padding 40 top/bottom
            Content anchored to the bottom: title(147) + gap(149) + info(132) = 428
            → top of content = 933 - 40 - 428 = 465px (49.8% of frame height)
            Reproduced with a bottom-anchored flex column instead of raw offsets.
        ════════════════════════════════════════════════════════════════════════ */}
        <div
          className="sm:hidden absolute inset-x-0 bottom-0 flex flex-col items-center pointer-events-none"
          style={{
            paddingBottom: "clamp(32px, 10.256vw, 40px)",  /* 40/390 */
            gap: "clamp(110px, 38.205vw, 149px)",            /* 149/390 */
          }}
        >
          {/* ── Title: "Every Home Begins as Dream, brick by brick into reality"
              Figma: w:300 h:147  font: Roundo 500 36.6px/36.6px  ls:-0.73px  center
          ─────────────────────────────────────────────────────── */}
          <h1
            style={{
              width: "clamp(260px, 76.923vw, 300px)",  /* 300/390 */
              opacity: head1T,
              transform: `translateY(${40 * (1 - head1T)}px)`,
              fontFamily: "var(--font-roundo), 'Roundo', var(--font-outfit), system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(30px, 9.385vw, 36.6px)",   /* 36.6/390 */
              lineHeight: "clamp(30px, 9.385vw, 36.6px)",
              letterSpacing: "-0.73px",
              color: "#ffffff",
              textAlign: "center",
              margin: 0,
              padding: 0,
              textShadow: "0 2px 16px rgba(0,0,0,0.30)",
            }}
          >
            Every Home Begins as Dream, brick by brick into reality
          </h1>

          {/* ── Info block: divider + "your villa partner" + description
              Figma: w:348 h:132  gap:18
          ─────────────────────────────────────────────────────── */}
          <div
            className="flex flex-col items-start"
            style={{
              width: "clamp(300px, 89.231vw, 348px)",   /* 348/390 */
              gap: "clamp(14px, 4.615vw, 18px)",
            }}
          >
            {/* Divider — Figma: w:348 h:1 */}
            <div
              style={{
                width: "100%",
                height: "1px",
                borderTop: "1px solid rgba(255,255,255,0.45)",
                opacity: lineT,
              }}
            />

            {/* Figma: w:348 h:113 gap:12 */}
            <div className="flex flex-col items-start" style={{ width: "100%", gap: "clamp(10px, 3.077vw, 12px)" }}>
              {/* Label — Figma: w:150 h:17  Instrument Sans 600 12px/16.38px ls:1.26px uppercase */}
              <div
                style={{
                  opacity: sub1T,
                  transform: `translateY(${20 * (1 - sub1T)}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-instrument-sans), 'Instrument Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "16.38px",
                    letterSpacing: "1.26px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.9)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {hero?.tagline || "Your Villa Partner"}
                </span>
              </div>

              {/* Description — Figma: w:348 h:84  Geist 400 14px/21px */}
              <div
                style={{
                  width: "100%",
                  opacity: sub2T,
                  transform: `translateY(${20 * (1 - sub2T)}px)`,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "21px",
                    letterSpacing: "0",
                    color: "rgba(255,255,255,0.85)",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {hero?.subheading2 || "We design and install bespoke glass systems for ambitious architectural projects. Every pane reflects our commitment to clarity, quality, and collaboration."}
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
