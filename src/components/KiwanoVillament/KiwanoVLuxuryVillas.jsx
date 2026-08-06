"use client";

import { useState, useRef, useEffect, useCallback, cloneElement } from "react";

// ─── Spec icons ───────────────────────────────────────────────────────────────

// 1. Configuration → classic house outline with peaked roof + door gap
function IconHome() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#334454" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Outer house silhouette */}
      <path d="M3 10.5L12 3L21 10.5V21H15V14.5H9V21H3V10.5Z" />
    </svg>
  );
}

// 2. Built-up Area → architectural floor-plan: outer rectangle divided into 3 rooms
function IconArea() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#334454" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Outer border */}
      <rect x="2" y="4" width="20" height="16" rx="1" />
      {/* Vertical wall — splits left room from right column */}
      <line x1="11" y1="4" x2="11" y2="20" />
      {/* Horizontal wall — splits right column into 2 rooms */}
      <line x1="11" y1="12" x2="22" y2="12" />
    </svg>
  );
}

// 3. Plot Range → horizontal measurement: ← [box] →
function IconPlot() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#334454" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Centre rectangle */}
      <rect x="7.5" y="9" width="9" height="6" rx="0.5" />
      {/* Left shaft + arrowhead */}
      <line x1="7.5" y1="12" x2="2.5" y2="12" />
      <polyline points="5.5,9.5 2.5,12 5.5,14.5" />
      {/* Right shaft + arrowhead */}
      <line x1="16.5" y1="12" x2="21.5" y2="12" />
      <polyline points="18.5,9.5 21.5,12 18.5,14.5" />
    </svg>
  );
}

// 4. Number of Units → house silhouette + 3 outward signal arcs on the right
function IconUnits() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#334454" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Left wing of house (peaked roof + body) */}
      <path d="M2 11.5L7 5.5V21H2V11.5Z" />
      {/* Right wing / second wall */}
      <path d="M7 8.5H12V21H7" />
      {/* Signal arc 1 — small, close */}
      <path d="M14.5 10.5C15.8 11.8 15.8 14.2 14.5 15.5" fill="none" />
      {/* Signal arc 2 — medium */}
      <path d="M17 8C19.4 10.4 19.4 15.6 17 18" fill="none" />
      {/* Signal arc 3 — large */}
      <path d="M19.5 5.5C23 9 23 17 19.5 20.5" fill="none" />
    </svg>
  );
}

// 5. Design Style → crossed pencil ✕ ruler (pencil: ↗ to ↙ / ruler: ↖ to ↘)
function IconDesign() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#334454" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Pencil — top-right → bottom-left, pointed tip at bottom-left */}
      <path d="M16.5 3.5L20.5 7.5L8 20L4 21.5L5.5 17.5L18 5L16.5 3.5Z" />
      {/* Ruler — top-left → bottom-right, rectangular body */}
      <path d="M3.5 7.5L7.5 3.5L20.5 16.5L16.5 20.5L3.5 7.5Z" />
      {/* Ruler tick marks */}
      <line x1="8.5" y1="8.5" x2="10"   y2="7"   />
      <line x1="12"  y1="12"  x2="13.5" y2="10.5" />
      <line x1="15.5" y1="15.5" x2="17" y2="14"   />
    </svg>
  );
}

// 6. Expected Completion → calendar: outer rect + ring tabs + divider + filled date cells
function IconCalendar() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#334454" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Body */}
      <rect x="2" y="4" width="20" height="18" rx="2" />
      {/* Header divider */}
      <line x1="2" y1="10" x2="22" y2="10" />
      {/* Ring tabs */}
      <line x1="7"  y1="2" x2="7"  y2="6" />
      <line x1="17" y1="2" x2="17" y2="6" />
      {/* Filled date cells */}
      <rect x="5"    y="13"   width="3.5" height="2.5" rx="0.4" fill="#334454" stroke="none" />
      <rect x="10.5" y="13"   width="3.5" height="2.5" rx="0.4" fill="#334454" stroke="none" />
      <rect x="10.5" y="17.5" width="3.5" height="2.5" rx="0.4" fill="#334454" stroke="none" />
    </svg>
  );
}

// 7. Parking → car side-view: body + roof-line + two wheel circles
function IconCar() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#334454" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Car body outline */}
      <path d="M4 17H2V12.5L5.5 7H18.5L22 12.5V17H20" />
      {/* Chassis line */}
      <line x1="4" y1="17" x2="20" y2="17" />
      {/* Windshield / cabin roof line */}
      <line x1="5.5" y1="12.5" x2="18.5" y2="12.5" />
      {/* Wheels */}
      <circle cx="7"  cy="17" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
    </svg>
  );
}

const ICON_MAP = {
  home: <IconHome />,
  area: <IconArea />,
  plot: <IconPlot />,
  units: <IconUnits />,
  design: <IconDesign />,
  calendar: <IconCalendar />,
  car: <IconCar />,
};

const SPECS = [
  { icon: "home",     label: "Configuration:",      value: "4BHK" },
  { icon: "area",     label: "Built-up Area:",       value: "2806 Sq.ft" },
  { icon: "plot",     label: "Plot Range:",          value: "6.59 Cents to 7.01 Cents" },
  { icon: "units",    label: "Number of Units:",     value: "9 Units" },
  { icon: "design",   label: "Design Style:",        value: "Tropical Modernism" },
  { icon: "calendar", label: "Expected Completion:", value: "March 2027" },
  { icon: "car",      label: "Parking:",             value: "2 Cars" },
];

// ─── Zoomable / pannable site-plan image ──────────────────────────────────────
//
// The source PNG (1901×2110) is portrait, with the dark access road running
// along its BOTTOM edge. Figma shows it rotated +90deg (clockwise) so the road
// ends up vertical along the LEFT edge and the plan reads as landscape.
// Rotating the other way (-90deg) mirrors the layout — road on the right.
//
// Key geometry trick:
//   Container is W × H. After rotating the inner wrapper 90deg its visual
//   width = wrapper's HEIGHT and visual height = wrapper's WIDTH.
//   So set wrapper to (H × W) and it will fill the container exactly at scale=1.
//   We measure the live container size via ResizeObserver so this stays correct
//   at every responsive breakpoint.

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const ZOOM_STEP = 1.15;

function ZoomableSitePlan() {
  const containerRef = useRef(null);
  const [cSize, setCSize] = useState({ w: 559, h: 443 }); // fallback = Figma size
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOrigin = useRef(null); // { cx, cy } — cursor minus current pan at drag-start
  const pinchRef = useRef(null);  // { dist, scale } at pinch-start

  // ── Track container dimensions ──────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setCSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Clamp pan so the image never leaves the container ───────────────────────
  const clampPan = useCallback(
    (x, y, s) => {
      const maxX = (cSize.w * (s - 1)) / 2;
      const maxY = (cSize.h * (s - 1)) / 2;
      return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y)),
      };
    },
    [cSize]
  );

  // Re-clamp pan whenever scale changes (e.g. after wheel)
  useEffect(() => {
    if (scale <= MIN_SCALE) {
      setPan({ x: 0, y: 0 });
    } else {
      setPan((p) => clampPan(p.x, p.y, scale));
    }
  }, [scale, clampPan]);

  // ── Mouse-wheel zoom ─────────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e) => {
      e.preventDefault();
      setScale((s) =>
        Math.max(MIN_SCALE, Math.min(MAX_SCALE, s * (e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP)))
      );
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  // ── Mouse drag ───────────────────────────────────────────────────────────────
  const onMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(true);
      dragOrigin.current = { cx: e.clientX - pan.x, cy: e.clientY - pan.y };
    },
    [pan]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!dragging || !dragOrigin.current) return;
      const raw = { x: e.clientX - dragOrigin.current.cx, y: e.clientY - dragOrigin.current.cy };
      setPan(clampPan(raw.x, raw.y, scale));
    },
    [dragging, scale, clampPan]
  );

  const onMouseUp = useCallback(() => {
    setDragging(false);
    dragOrigin.current = null;
  }, []);

  // ── Touch pinch-to-zoom + drag ───────────────────────────────────────────────
  const onTouchStart = useCallback(
    (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchRef.current = { dist: Math.hypot(dx, dy), scale };
        dragOrigin.current = null;
      } else {
        pinchRef.current = null;
        dragOrigin.current = { cx: e.touches[0].clientX - pan.x, cy: e.touches[0].clientY - pan.y };
      }
    },
    [pan, scale]
  );

  const onTouchMove = useCallback(
    (e) => {
      e.preventDefault();
      if (e.touches.length === 2 && pinchRef.current) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, pinchRef.current.scale * (dist / pinchRef.current.dist)));
        setScale(next);
      } else if (e.touches.length === 1 && dragOrigin.current) {
        const raw = { x: e.touches[0].clientX - dragOrigin.current.cx, y: e.touches[0].clientY - dragOrigin.current.cy };
        setPan(clampPan(raw.x, raw.y, scale));
      }
    },
    [scale, clampPan]
  );

  const onTouchEnd = useCallback(() => {
    pinchRef.current = null;
    dragOrigin.current = null;
    setDragging(false);
  }, []);

  // ── Zoom buttons ─────────────────────────────────────────────────────────────
  const zoomIn  = () => setScale((s) => Math.min(MAX_SCALE, s * ZOOM_STEP));
  const zoomOut = () => setScale((s) => Math.max(MIN_SCALE, s / ZOOM_STEP));

  // wrapper is H×W so after rotate(90deg) it fills W×H exactly
  const wW = cSize.h;
  const wH = cSize.w;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Interactive pan/zoom layer */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius: "inherit",
          cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "default",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        {/* Image wrapper — dimensions swapped so rotation fills container */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: `${wW}px`,
            height: `${wH}px`,
            transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px) scale(${scale}) rotate(90deg)`,
            transformOrigin: "center",
            willChange: "transform",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/db98af1a8b2a5f0c0de07f9eff4b0564860775be.png"
            alt="Kiwano site plan"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Caption */}
      <span
        style={{
          position: "absolute",
          bottom: "18px",
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "18px",
          letterSpacing: "-0.36px",
          color: "#000000",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        Tap to Zoom • Drag to Explore
      </span>

      {/* Zoom controls */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          zIndex: 3,
        }}
      >
        {[{ label: "+", fn: zoomIn }, { label: "−", fn: zoomOut }].map(({ label, fn }) => (
          <button
            key={label}
            onClick={fn}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "6px",
              border: "1px solid rgba(0,0,0,0.15)",
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(4px)",
              cursor: "pointer",
              fontFamily: "system-ui, sans-serif",
              fontSize: "18px",
              lineHeight: 1,
              color: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function KiwanoVLuxuryVillas({ luxuryVillas }) {
  const [brochureHovered, setBrochureHovered] = useState(false);

  return (
    <section
      style={{
        width: "100%",
        background: "#EDE7DE",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* ══════════════════════════════════════════════════════════════
          MOBILE — stacked layout (logo, description, specs, map, brochure)
      ══════════════════════════════════════════════════════════════ */}
      <div className="flex md:hidden" style={{ flexDirection: "column", width: "100%", boxSizing: "border-box" }}>
        {/* Logo + description */}
        <div
          style={{
            width: "100%",
            maxWidth: "393px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "7px",
            padding: "32px 22px 24px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "299px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "18px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/Kiwano-Logo-Color-2-Copy-e1772083713999-1024x219.png.svg"
              alt="Kiwano Luxury Villas"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          <p
            style={{
              width: "100%",
              maxWidth: "349px",
              fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "18px",
              letterSpacing: "-0.64px",
              textAlign: "center",
              color: "#333333",
              margin: 0,
            }}
          >
            {luxuryVillas?.heading ||
              "A modern residential concept that combines the privacy of a villa with the convenience of apartment living. Kiwano Villaments are designed for families seeking spacious homes, shared amenities, and a well-connected community environment."}
          </p>
        </div>

        {/* Specs + map + brochure */}
        <div
          style={{
            width: "100%",
            maxWidth: "393px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "0 22px 24px",
            boxSizing: "border-box",
          }}
        >
          {/* Spec rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", paddingBottom: "8px" }}>
            {SPECS.map((spec, i) => (
              <div
                key={spec.label}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  paddingTop: "10px",
                  paddingBottom: "14px",
                  /* last row has no rule — the list ends, it isn't separated from anything */
                  borderBottom: i === SPECS.length - 1 ? "none" : "1px solid rgba(0,0,0,0.2)",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: "clamp(18px, 5.6vw, 24px)",
                      height: "clamp(18px, 5.6vw, 24px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {cloneElement(ICON_MAP[spec.icon], { width: 18, height: 18, stroke: "#334454" })}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(13px, 4.5vw, 18px)",
                      lineHeight: 1.6,
                      letterSpacing: "-0.05em",
                      color: "#333333",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {spec.label}
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 4.5vw, 18px)",
                    lineHeight: 1.6,
                    letterSpacing: "-0.05em",
                    color: "#333333",
                    textAlign: "right",
                    flexShrink: 0,
                    marginLeft: "8px",
                  }}
                >
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Map card */}
          <div
            style={{
              width: "100%",
              aspectRatio: "360 / 285.3",
              borderRadius: "5.15px",
              background: "#FFFFFF",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <ZoomableSitePlan />
          </div>

          {/* Caption + brochure link */}
          <div style={{ opacity: 0.8, display: "flex", flexDirection: "column", gap: "2px", paddingTop: "4px" }}>
            <p
              style={{
                fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "16.14px",
                lineHeight: "121%",
                letterSpacing: "0%",
                color: "#000000",
                margin: 0,
              }}
            >
              {luxuryVillas?.subheading || 'Lorem ipsum dolor sit amet, consectetur'}
            </p>

            <div
              onMouseEnter={() => setBrochureHovered(true)}
              onMouseLeave={() => setBrochureHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                borderBottom: "1px solid #000000",
                paddingBottom: "2px",
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "16.14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#041D35",
                }}
              >
                Download Brochure
              </span>

              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                style={{
                  transform: brochureHovered ? "rotate(0deg)" : "rotate(-45deg)",
                  transition: "transform 0.25s ease",
                  transformOrigin: "center",
                  flexShrink: 0,
                }}
              >
                <line x1="2" y1="10" x2="16" y2="10" stroke="#041D35" strokeWidth="1.8" strokeLinecap="round" />
                <polyline points="10,4 16,10 10,16" stroke="#041D35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          DESKTOP
      ══════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
      {/* ══════════════════════════════════════════════════════════════
          FIRST MAIN DIV — Logo + Description
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          width: "100%",
          paddingLeft: "clamp(20px, 6.25vw, 90px)",
          paddingRight: "clamp(20px, 6.25vw, 90px)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            // width: "100%",
            maxWidth: "clamp(375px, 89.2vw, 1920px)",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "clamp(30px, 6.94vw, 100px)",
            paddingTop: "clamp(40px, 5.56vw, 80px)",
            paddingBottom: "clamp(30px, 4.44vw, 64px)",
            boxSizing: "border-box",
          }}
        >
          {/* Logo */}
          <div style={{ width: "clamp(160px, 29.17vw, 460px)", flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/Kiwano-Logo-Color-2-Copy-e1772083713999-1024x219.png.svg"
              alt="Kiwano Luxury Villas"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          {/* Description */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.67vw, 26px)",
                lineHeight: "1.2",
                letterSpacing: "-1.2px",
                color: "#000000",
                margin: 0,
              }}
            >
              {luxuryVillas?.heading ||
                "A modern residential concept that combines the privacy of a villa with the convenience of apartment living. Kiwano Villaments are designed for families seeking spacious homes, shared amenities, and a well-connected community environment."}
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECOND MAIN DIV — Floor plan + Specs
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          width: "100%",
          paddingLeft: "clamp(20px, 6.28vw, 90.5px)",
          paddingRight: "clamp(20px, 6.25vw, 90px)",
          paddingBottom: "clamp(40px, 5.56vw, 80px)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          gap: "clamp(24px, 7.08vw, 102px)",
          alignItems: "center",
        }}
      >
        {/* ── LEFT: floor plan card + brochure ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", flexShrink: 0 }}>
          {/* Card */}
          <div
            style={{
              width: "clamp(260px, 38.82vw, 590px)",
              height: "clamp(200px, 30.76vw, 443px)",
              borderRadius: "8px",
              background: "#FFFFFF",
              overflow: "hidden",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <ZoomableSitePlan />
          </div>

          {/* Brochure */}
          <div style={{ opacity: 0.8, display: "flex", flexDirection: "column", gap: "2px" , maxWidth: "clamp(260px, 38.82vw, 590px)" }}>
            <p
              style={{
                fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.25vw, 18px)",
                lineHeight: "121%",
                color: "#000000",
                margin: 0,
              }}
            >
              {luxuryVillas?.subheading || 'Lorem ipsum dolor sit amet, consectetur'}
            </p>

            <div
              onMouseEnter={() => setBrochureHovered(true)}
              onMouseLeave={() => setBrochureHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                borderBottom: "1px solid #000000",
                paddingBottom: "2px",
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(14px, 1.25vw, 18px)",
                  lineHeight: "100%",
                  color: "#041D35",
                }}
              >
                Download Brochure
              </span>

              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                style={{
                  transform: brochureHovered ? "rotate(0deg)" : "rotate(-45deg)",
                  transition: "transform 0.25s ease",
                  transformOrigin: "center",
                  flexShrink: 0,
                }}
              >
                <line x1="2" y1="10" x2="16" y2="10" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
                <polyline points="10,4 16,10 10,16" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Spec rows ── */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            paddingBottom: "72px",
          }}
        >
          {SPECS.map((spec, i) => (
            <div
              key={spec.label}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "clamp(6px, 1.04vw, 30px)",
                paddingRight: "10px",
                paddingBottom: "clamp(8px, 1.56vw, 30px)",
                paddingLeft: "10px",
                /* last row has no rule — the list ends, it isn't separated from anything */
                borderBottom: i === SPECS.length - 1 ? "none" : "1px solid rgba(0,0,0,0.2)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                {ICON_MAP[spec.icon]}
                <span
                  style={{
                    fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(14px, 1.67vw, 24px)",
                    lineHeight: "1.2",
                    letterSpacing: "-1.2px",
                    color: "#333333",
                  }}
                >
                  {spec.label}
                </span>
              </div>

              <span
                style={{
                  fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.67vw, 24px)",
                  lineHeight: "1.2",
                  letterSpacing: "-1.2px",
                  color: "#000000",
                  textAlign: "right",
                }}
              >
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
