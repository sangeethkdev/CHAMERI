"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Kiwano360Tour — 360° photo + video section
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * BADGE (centred over photo):
 *   ← [left arrow square]  "Drag Around"  [right arrow square] →
 *
 *   All three controls share one "grab" model — the scene follows the input,
 *   so moving left brings the RIGHT-hand side of the photo into view.
 *
 *   • Left  arrow (←) held → pans continuously, revealing the right side
 *   • Right arrow (→) held → pans continuously, revealing the left side
 *   • "Drag Around" dragged → the badge slides under the pointer and the photo
 *     pans with it 1:1 (mouse + touch); the badge eases back to centre on release
 *   • "Drag Around" clicked without moving → opens the full 360 video modal
 *   • Photo pans with CSS objectPosition; eased for the arrows, un-eased
 *     mid-drag so it tracks the pointer exactly
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Simple chevron SVGs ──────────────────────────────────────────────────── */
function ChevronLeft() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
      xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M6.5 2L3.5 5L6.5 8"
        stroke="#EDE7DE" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
      xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M3.5 2L6.5 5L3.5 8"
        stroke="#EDE7DE" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Dark icon square (left / right ends of badge) ───────────────────────── */
function ArrowSquare({ direction, onClick, pressed }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseDown={onClick}
      aria-label={direction === "left" ? "Pan left" : "Pan right"}
      style={{
        width:          "23px",
        height:         "23px",
        borderRadius:   "5px",
        background:     hov || pressed ? "#4a6070" : "#334454",
        border:         "none",
        cursor:         "pointer",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        flexShrink:     0,
        transition:     "background 0.15s ease, transform 0.1s ease",
        transform:      pressed ? "scale(0.92)" : "scale(1)",
        padding:        0,
      }}
    >
      {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
}

/* ── Shared viewer content (photo + vignette + drag badge) ───────────────────
   Used by both the mobile and desktop layouts so the pan/modal behaviour and
   badge markup stay in one place. */
function Viewer360Inner({
  src, imgPosX, borderRadius,
  pressedL, pressedR, onPressLeft, onPressRight,
  dragging, badgeX, onDragPointerDown, onDragPointerMove, onDragPointerUp, onDragPointerCancel,
}) {
  return (
    <div
      /* Marker the drag handler reads to size its sensitivity to this viewer */
      data-viewer360
      style={{
        width:        "100%",
        height:       "100%",
        position:     "relative",
        borderRadius,
        overflow:     "hidden",
        background:   "#1a1a1a",
      }}
    >
      {/* ── STATIC PHOTO (pans via objectPosition) ───────────────── */}
      <Image
        src={src}
        alt="Explore Every Angle Of Luxury Living — Kiwano Villa"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 1285px"
        style={{
          objectFit:      "cover",
          objectPosition: `${imgPosX}% 50%`,
          /* No easing mid-drag — the 0.25s ease would lag behind the pointer
             and break the sense of grabbing the scene. It stays on for the
             arrow buttons, whose stepped panning benefits from smoothing. */
          transition:     dragging ? "none" : "object-position 0.25s ease-out",
          userSelect:     "none",
          pointerEvents:  "none",
        }}
        draggable={false}
      />

      {/* Subtle bottom vignette */}
      <div
        style={{
          position:      "absolute",
          inset:         0,
          background:    "linear-gradient(to top, rgba(0,0,0,0.22) 0%, transparent 50%)",
          zIndex:        1,
          pointerEvents: "none",
        }}
      />

      {/* ── DRAG AROUND BADGE ───────────────────────────────────────
          Slides with the pointer while dragging (badgeX), then eases back to
          centre on release. No transition mid-drag so it tracks 1:1. */}
      <div
        data-drag-badge
        style={{
          position:       "absolute",
          top:            "50%",
          left:           "50%",
          transform:      `translate(-50%, -50%) translateX(${badgeX}px)`,
          transition:     dragging ? "none" : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
          zIndex:         2,
          display:        "flex",
          alignItems:     "center",
          gap:            "10px",
          padding:        "4px 6px",
          borderRadius:   "8px",
          background:     "rgba(237, 231, 222, 0.88)",
          backdropFilter: "blur(10px)",
          boxShadow:      "0 4px 20px rgba(0,0,0,0.22)",
          whiteSpace:     "nowrap",
          userSelect:     "none",
        }}
      >
        <ArrowSquare direction="left" pressed={pressedL} onClick={onPressLeft} />

        <button
          onPointerDown={onDragPointerDown}
          onPointerMove={onDragPointerMove}
          onPointerUp={onDragPointerUp}
          onPointerCancel={onDragPointerCancel}
          aria-label="Drag to look around, or click to watch the 360° villa tour"
          title="Drag to look around · click to watch the full 360° tour"
          style={{
            background:    "transparent",
            border:        "none",
            cursor:        dragging ? "grabbing" : "grab",
            /* Claim horizontal gestures so a sideways drag pans the scene
               instead of the browser treating it as a page scroll. */
            touchAction:   "none",
            padding:       "0 2px",
            fontFamily:    "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
            fontWeight:    500,
            fontSize:      "14px",
            lineHeight:    "1",
            letterSpacing: "0",
            textTransform: "capitalize",
            color:         "#334454",
          }}
        >
          Drag Around
        </button>

        <ArrowSquare direction="right" pressed={pressedR} onClick={onPressRight} />
      </div>
    </div>
  );
}

export default function Kiwano360Tour({ tour360 }) {
  /* ── Pan state (0 = centre, -40 = far left, +40 = far right) ─────────────── */
  const [panX, setPanX] = useState(0);           // percent offset
  const [pressedL, setPressedL] = useState(false);
  const [pressedR, setPressedR] = useState(false);
  const panIntervalRef = useRef(null);

  /* Mirror of panX kept in a ref so the drag handler can read the current pan
     synchronously. It needs to know how much of a pointer move the pan actually
     absorbed (nothing, once it is clamped at ±40) in order to move the badge by
     the same amount — a functional setState updater cannot report that back. */
  const panXRef = useRef(0);
  const applyPan = useCallback((next) => {
    const v = Math.min(40, Math.max(-40, next));
    panXRef.current = v;
    setPanX(v);
    return v;
  }, []);

  /* Continuous pan while arrow is held ─────────────────────────────────────── */
  const startPan = useCallback((dir) => {
    if (panIntervalRef.current) return;
    const step = dir === "left" ? -1.5 : 1.5;
    panIntervalRef.current = setInterval(() => {
      applyPan(panXRef.current + step);
    }, 30);
  }, [applyPan]);

  const stopPan = useCallback(() => {
    clearInterval(panIntervalRef.current);
    panIntervalRef.current = null;
    setPressedL(false);
    setPressedR(false);
  }, []);

  /* Cleanup on unmount */
  useEffect(() => () => clearInterval(panIntervalRef.current), []);

  /* Convert panX (-40…+40) → objectPosition ("X% 50%") ──────────────────── */
  /* panX > 0 → photo shifts right (we see left side) → objectPosition X < 50 */
  const imgPosX = 50 - panX;   // e.g. panX=+20 → 30%, panX=-20 → 70%

  /* ── Modal state ─────────────────────────────────────────────────────────── */
  const [modalOpen, setModalOpen] = useState(false);
  const modalVideoRef = useRef(null);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  }, []);

  /* ── Drag-to-pan on the badge ─────────────────────────────────────────────
     Grab semantics, matching the arrow buttons: the scene follows the pointer,
     so dragging LEFT pulls the photo left and brings the right-hand side into
     view (and vice versa). To invert, negate `dx` in the move handler.

     Sensitivity is container-relative — one full container width of drag sweeps
     the whole -40…+40 pan range — so it feels the same on mobile and desktop.

     A press that never travels more than DRAG_THRESHOLD is treated as a click
     and opens the 360 video instead, so the badge keeps both behaviours. */
  const DRAG_THRESHOLD = 4; // px

  const dragRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  /* Horizontal offset of the badge itself, in px from its centred position.
     It follows the pointer during a drag and springs back to 0 on release. */
  const [badgeX, setBadgeX] = useState(0);

  const onDragPointerDown = useCallback((e) => {
    const viewer = e.currentTarget.closest("[data-viewer360]");
    const badge  = e.currentTarget.closest("[data-drag-badge]");
    const viewerW = viewer?.offsetWidth || 600;
    const badgeW  = badge?.offsetWidth  || 160;
    dragRef.current = {
      travelled: 0,
      badge:     0,
      pctPerPx:  80 / viewerW,
      /* Keep the badge inside the frame with a 12px margin. Because one full
         viewer width of drag covers the whole pan range, this cap lands at
         roughly the same moment the pan clamps — they run out together. */
      maxTravel: Math.max(0, viewerW / 2 - badgeW / 2 - 12),
      lastX:     e.clientX,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
  }, []);

  const onDragPointerMove = useCallback((e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.lastX;
    if (dx === 0) return;
    d.lastX = e.clientX;
    d.travelled += Math.abs(dx);

    const before   = panXRef.current;
    const after    = applyPan(before + dx * d.pctPerPx);
    // Only the travel the pan actually took — 0 once it is clamped, so the
    // badge stops dead at the same instant the photo does.
    const acceptedPx = (after - before) / d.pctPerPx;

    d.badge = Math.max(-d.maxTravel, Math.min(d.maxTravel, d.badge + acceptedPx));
    setBadgeX(d.badge);
  }, [applyPan]);

  const endDrag = useCallback((e, wasCancelled) => {
    const d = dragRef.current;
    if (!d) return;
    dragRef.current = null;
    setDragging(false);
    setBadgeX(0);                       // springs home via the CSS transition
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    if (!wasCancelled && d.travelled <= DRAG_THRESHOLD) openModal();
  }, [openModal]);

  const onDragPointerUp     = useCallback((e) => endDrag(e, false), [endDrag]);
  const onDragPointerCancel = useCallback((e) => endDrag(e, true),  [endDrag]);

  useEffect(() => {
    if (modalOpen && modalVideoRef.current)
      modalVideoRef.current.play().catch(() => {});
  }, [modalOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    if (modalOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          MOBILE — iPhone 13/14 (390px) baseline, fluid across small screens
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="flex md:hidden"
        style={{
          flexDirection: "column",
          width:         "100%",
          background:    "#EDE7DE",
          boxSizing:     "border-box",
        }}
      >
        {/* Header block — Figma: w:390 h:162 pt:30 pr:16 pb:6 pl:16 gap:10 */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            alignItems:    "center",
            width:         "100%",
            paddingTop:    "12px",
            paddingRight:  "16px",
            paddingBottom: "6px",
            paddingLeft:   "16px",
            gap:           "10px",
            boxSizing:     "border-box",
          }}
        >
          {/* Title — Figma: w:358 h:74  Roundo 500 32px/36.6px ls:-0.73px */}
          <h2
            style={{
              width:         "100%",
              maxWidth:      "358px",
              fontFamily:    "var(--font-roundo), 'Roundo', system-ui, sans-serif",
              fontWeight:    500,
              fontStyle:     "normal",
              fontSize:      "clamp(24px, 8.2vw, 32px)",
              lineHeight:    "36.6px",
              letterSpacing: "-0.73px",
              textAlign:     "center",
              textTransform: "capitalize",
              color:         "#000000",
              margin:        0,
              padding:       0,
            }}
          >
            {tour360?.heading || 'Explore Every Angle Of Luxury Living'}
          </h2>

          {/* Subtitle — Figma: w:286 h:42  Geist 400 14px/21px */}
          <p
            style={{
              width:         "100%",
              maxWidth:      "286px",
              fontFamily:    "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
              fontWeight:    400,
              fontSize:      "14px",
              lineHeight:    "21px",
              letterSpacing: "0",
              textAlign:     "center",
              color:         "#333333",
              margin:        0,
            }}
          >
            {tour360?.subheading || 'Explore crafted villa spaces with modern comfort built beautifully'}
          </p>
        </div>

        {/* Viewer block — Figma: w:390 h:537, image w:341 h:495 top:12.5 left:25 */}
        <div
          style={{
            width:          "100%",
            background:     "#EDE7DE",
            display:        "flex",
            justifyContent: "center",
            paddingTop:     "12.5px",
            paddingBottom:  "24px",
            paddingLeft:    "16px",
            paddingRight:   "16px",
            boxSizing:      "border-box",
          }}
        >
          <div
            style={{
              position:     "relative",
              width:        "100%",
              maxWidth:     "341px",
              aspectRatio:  "341 / 495",
              borderRadius: "8px",
              overflow:     "hidden",
              background:   "#00000033",
            }}
          >
            <Viewer360Inner
              src={tour360?.media || "/dummyimages/allphoto-bangkok-imSqK_PD5R0-unsplash.jpg"}
              imgPosX={imgPosX}
              borderRadius="8px"
              pressedL={pressedL}
              pressedR={pressedR}
              onPressLeft={() => { setPressedL(true); startPan("left"); }}
              onPressRight={() => { setPressedR(true); startPan("right"); }}
              dragging={dragging}
              badgeX={badgeX}
              onDragPointerDown={onDragPointerDown}
              onDragPointerMove={onDragPointerMove}
              onDragPointerUp={onDragPointerUp}
              onDragPointerCancel={onDragPointerCancel}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP
          Figma: w:1436.91  h:1011.92  pt:60  pr:76  pb:110  pl:76  bg:#EDE7DE
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
      <section
        style={{
          width:         "100%",
          background:    "#EDE7DE",
          paddingTop:    "clamp(40px, 4.167vw, 60px)",
          paddingRight:  "clamp(24px, 5.278vw, 76px)",
          paddingBottom: "clamp(60px, 7.639vw, 110px)",
          paddingLeft:   "clamp(24px, 5.278vw, 76px)",
          boxSizing:     "border-box",
        }}
      >
        {/* ── CONTAINER ──────────────────────────────────────────────────────
            max-w:1440px  gap:24px
        ─────────────────────────────────────────────────────────────────── */}
        <div
          style={{
            width:         "100%",
            maxWidth:      "1920",
            margin:        "0 auto",
            display:       "flex",
            flexDirection: "column",
            gap:           "clamp(16px, 1.667vw, 24px)",
            boxSizing:     "border-box",
          }}
        >
          {/* ══════════════════════════════════════════════════════════════
              HEADER ROW
              Figma: w:1284.91  h:98  gap:16px
          ══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              width:         "100%",
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              gap:           "clamp(10px, 1.111vw, 16px)",
            }}
          >
            {/* Inner  w:938  h:98  gap:4px */}
            <div
              style={{
                width:         "clamp(320px, 65.14vw, 938px)",
                display:       "flex",
                flexDirection: "column",
                alignItems:    "center",
                gap:           "clamp(2px, 0.278vw, 4px)",
              }}
            >
              {/* Title row  w:938  h:67  gap:14px */}
              <div
                style={{
                  width:          "100%",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  gap:            "clamp(8px, 0.972vw, 14px)",
                }}
              >
                {/* h2  Roundo 500  60px / 66.14px  ls:-3.05px */}
                <h2
                  style={{
                    fontFamily:    "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                    fontWeight:    500,
                    fontStyle:     "normal",
                    fontSize:      "clamp(28px, 4.167vw, 60px)",
                    lineHeight:    "1.1",
                    letterSpacing: "-3.05px",
                    textAlign:     "center",
                    color:         "#222F30",
                    margin:        0,
                    padding:       0,
                  }}
                >
                  {tour360?.heading || 'Explore Every Angle Of Luxury Living'}
                </h2>
              </div>


              {/* Subtitle  Geist 400  20px / 26.4px  ls:-0.44px */}
              <p
                style={{
                  fontFamily:    "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                  fontWeight:    400,
                  fontSize:      "clamp(13px, 1.389vw, 20px)",
                  lineHeight:    "26.4px",
                  letterSpacing: "-0.44px",
                  textAlign:     "center",
                  color:         "#333333",
                  margin:        0,
                }}
              >
                {tour360?.subheading || 'Explore crafted villa spaces with modern comfort built beautifully'}
              </p>


            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              VIEWER — static photo, pans on arrow press
              Figma: w:1284.91  h:719.92
          ══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              width:       "100%",
              aspectRatio: "1284.91 / 719.92",
              maxHeight:   "719.92px",
            }}
          >
            {/* Viewer wrapper */}
            <div id="kiwano-360-viewer" style={{ width: "100%", height: "100%" }}>
              <Viewer360Inner
                src={tour360?.media || "/dummyimages/allphoto-bangkok-imSqK_PD5R0-unsplash.jpg"}
                imgPosX={imgPosX}
                borderRadius="clamp(8px, 0.833vw, 12px)"
                pressedL={pressedL}
                pressedR={pressedR}
                onPressLeft={() => { setPressedL(true); startPan("left"); }}
                onPressRight={() => { setPressedR(true); startPan("right"); }}
                dragging={dragging}
                badgeX={badgeX}
                onDragPointerDown={onDragPointerDown}
                onDragPointerMove={onDragPointerMove}
                onDragPointerUp={onDragPointerUp}
                onDragPointerCancel={onDragPointerCancel}
              />
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Stop pan on pointer up anywhere on page */}
      {/* (rendered as a transparent overlay only while a button is pressed) */}
      {(pressedL || pressedR) && (
        <div
          onMouseUp={stopPan}
          onTouchEnd={stopPan}
          style={{
            position:   "fixed",
            inset:      0,
            zIndex:     9998,
            cursor:     "ew-resize",
            background: "transparent",
          }}
        />
      )}

      {/* ════════════════════════════════════════════════════════════════════
          360 VIDEO MODAL — opens when "Drag Around" text is clicked
      ═══════════════════════════════════════════════════════════════════ */}
      {/* {modalOpen && (
        <div
          id="kiwano-360-modal"
          role="dialog"
          aria-modal="true"
          aria-label="360° Villa Tour"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          style={{
            position:       "fixed",
            inset:          0,
            zIndex:         9999,
            background:     "rgba(0,0,0,0.90)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            backdropFilter: "blur(6px)",
            animation:      "kiwanoFadeIn 0.22s ease forwards",
          }}
        >
          <style>{`
            @keyframes kiwanoFadeIn {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
          `}</style> */}

          {/* Inner video box */}
          {/* <div
            style={{
              position:     "relative",
              width:        "min(92vw, 1280px)",
              aspectRatio:  "16 / 9",
              borderRadius: "14px",
              overflow:     "hidden",
              background:   "#000",
              boxShadow:    "0 32px 96px rgba(0,0,0,0.7)",
            }}
          >
            <video
              ref={modalVideoRef}
              src={tour360?.media || "/videos/kiwano-hero.mp4"}
              controls
              playsInline
              style={{
                width:     "100%",
                height:    "100%",
                objectFit: "cover",
                display:   "block",
              }}
            /> */}

            {/* ✕ close */}
            {/* <button
              id="kiwano-360-close"
              onClick={closeModal}
              aria-label="Close 360 tour"
              style={{
                position:       "absolute",
                top:            "14px",
                right:          "14px",
                zIndex:         10,
                width:          "36px",
                height:         "36px",
                borderRadius:   "50%",
                border:         "none",
                background:     "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                color:          "#fff",
                fontSize:       "17px",
                lineHeight:     "1",
                cursor:         "pointer",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                transition:     "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.30)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            >
              ✕
            </button> */}
          {/* </div> */}
        {/* </div> */}
      {/* )} */}
    </>
  );
}
