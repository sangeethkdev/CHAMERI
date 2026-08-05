"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * KiwanoFeatures — Horizontal-scroll feature cards section
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Figma canvas: 1440px
 *
 * SECTION
 *   w:1440  h:825.8  bg:#EDE7DE  pt:60px  pb:60px  gap:30px
 *   overflow-x: scroll (horizontal)
 *
 * ROW 1 — Header  (w:1440  h:135.8  gap:15px  px:57px)
 *   ├── Tag pill   (w:150.6  h:30.8)
 *   │     ├── Square  14×14  br:3px  bg:#334454  p:3.6px
 *   │     └── "OUR FEATURES"  Geist 400  16.2px  ls:-0.32px  uppercase
 *   └── Row (w:1326  h:90  space-between)
 *         ├── Title  473×90  Roundo 500 45px/45px  ls:-0.9px
 *         └── Body   558×66  Geist 400  20px/21.8px  ls:-0.44px
 *
 * ROW 2 — Cards strip  (w:1440  h:540)
 *   Inner track: w:4016.9  h:498.5  gap:25px  left:57px
 *   Each card: 379.7×498.2
 *     ├── Image fills card (border-radius 12px)
 *     └── Text panel: bg:#FFF  w:345  h:128  absolute bottom left:17.16
 *           ├── Title row  w:345  h:30  gap:11.41  (feature name  Geist 400 24.7px)
 *           └── Sub text   w:336  h:88  Geist 400 20px/21.8px
 * ─────────────────────────────────────────────────────────────────────────────
 */

const STATIC_FEATURES = [
  {
    id: 1,
    title: "Clubhouse",
    description:
      "A premium social hub with world-class amenities designed for community living and relaxation.",
    image: "/dummyimages/Frame 2121454280.png",
  },
  {
    id: 2,
    title: "Swimming Pool",
    description:
      "Temperature-controlled infinity pool with dedicated lanes for leisure and fitness swimming.",
    image: "/dummyimages/af18e0d9d8fdfe4f4a5d97f4fbf9edd12b1ff9df.png",
  },
  {
    id: 3,
    title: "Kids Play Area",
    description:
      "Safe and vibrant play zones designed to nurture creativity and active development in children.",
    image: "/dummyimages/d18115bcf5e039e1b2d60bfa8c4e93e2c4b1ea1f.png",
  },
  {
    id: 4,
    title: "Curated Landscapes",
    description:
      "Thoughtfully designed green corridors and garden pockets that breathe life into every corner.",
    image: "/dummyimages/b41115b835e2232a8e61bd8d04a193c1d7a5d351.png",
  },
  {
    id: 5,
    title: "Gymnasium",
    description:
      "State-of-the-art fitness centre equipped with modern machines and personal training spaces.",
    image: "/dummyimages/efcc547d69243e62a8f3adcf2b12bcd01e5f552c.png",
  },
  {
    id: 6,
    title: "Indoor Play Area",
    description:
      "All-weather entertainment zone for families featuring recreational games and activities.",
    image: "/dummyimages/6bdc232e1c143f702a3a37c1909ea6a7c38d0002.png",
  },
  {
    id: 7,
    title: "2 Car Parking",
    description:
      "Dedicated two-car covered parking per villa with seamless access and EV readiness.",
    image: "/dummyimages/8276099377b328194b10337a1dc6e4999a4103d5.png",
  },
  {
    id: 8,
    title: "EV Charging Point",
    description:
      "Future-ready electric vehicle charging infrastructure integrated into every parking bay.",
    image: "/dummyimages/Container.png",
  },
  {
    id: 9,
    title: "24×7 Power Backup",
    description:
      "Uninterrupted power supply round the clock, ensuring comfort and security at all times.",
    image: "/dummyimages/Overlay.png",
  },
  {
    id: 10,
    title: "Private Gardens",
    description:
      "Exclusive landscaped private gardens for each villa — your personal green sanctuary.",
    image: "/dummyimages/Frame 2121454280.png",
  },
];

// ── Reusable drag-to-scroll binding — one instance per horizontal track ──────
function useDragScroll() {
  const ref = useRef(null);
  const isDragging = useRef(false);
  const startX     = useRef(0);
  const scrollLeft = useRef(0);
  const touchStartX = useRef(0);
  const touchScrollLeft = useRef(0);

  const onMouseDown = useCallback((e) => {
    isDragging.current = true;
    startX.current     = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
    ref.current.style.cursor = "grabbing";
  }, []);

  const onMouseLeave = useCallback(() => {
    isDragging.current = false;
    if (ref.current) ref.current.style.cursor = "grab";
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (ref.current) ref.current.style.cursor = "grab";
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x    = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    ref.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onTouchStart = useCallback((e) => {
    touchStartX.current    = e.touches[0].pageX;
    touchScrollLeft.current = ref.current.scrollLeft;
  }, []);

  const onTouchMove = useCallback((e) => {
    const diff = touchStartX.current - e.touches[0].pageX;
    ref.current.scrollLeft = touchScrollLeft.current + diff;
  }, []);

  return { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove, onTouchStart, onTouchMove };
}

export default function KiwanoFeatures({ features }) {
  const FEATURES = (features?.features?.length > 0)
    ? features.features.map((f, i) => ({
        id: i + 1,
        title: f.name || STATIC_FEATURES[i % STATIC_FEATURES.length]?.title,
        description: f.description || STATIC_FEATURES[i % STATIC_FEATURES.length]?.description,
        image: f.image || STATIC_FEATURES[i % STATIC_FEATURES.length]?.image,
      }))
    : STATIC_FEATURES;

  const {
    ref:          desktopTrackRef,
    onMouseDown:  onDesktopMouseDown,
    onMouseLeave: onDesktopMouseLeave,
    onMouseUp:    onDesktopMouseUp,
    onMouseMove:  onDesktopMouseMove,
    onTouchStart: onDesktopTouchStart,
    onTouchMove:  onDesktopTouchMove,
  } = useDragScroll();

  const {
    ref:          mobileTrackRef,
    onMouseDown:  onMobileMouseDown,
    onMouseLeave: onMobileMouseLeave,
    onMouseUp:    onMobileMouseUp,
    onMouseMove:  onMobileMouseMove,
    onTouchStart: onMobileTouchStart,
    onTouchMove:  onMobileTouchMove,
  } = useDragScroll();

  return (
    <>
    {/* ══════════════════════════════════════════════════════════════════════
        MOBILE — stacked header + horizontal peek cards with overlapping
        white caption panel (no hover on touch, so info is always visible)
    ═══════════════════════════════════════════════════════════════════════ */}
    <section
      className="flex md:hidden"
      style={{
        flexDirection: "column",
        width:         "100%",
        background:    "#EDE7DE",
        paddingTop:    "24px",
        paddingBottom: "24px",
        paddingLeft:   "22px",
        paddingRight:  "22px",
        gap:           "20px",
        boxSizing:     "border-box",
        overflowX:     "hidden",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
        {/* Tag pill */}
        <div
          style={{
            display:      "inline-flex",
            alignItems:   "center",
            gap:          "7.2px",
            height:       "20px",
            padding:      "0 7.2px",
            borderRadius: "90px",
            width:        "fit-content",
          }}
        >
          <span
            style={{
              width:        "10px",
              height:       "10px",
              borderRadius: "3px",
              background:   "#334454",
              flexShrink:   0,
            }}
          />
          <span
            style={{
              fontFamily:    "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
              fontWeight:    400,
              fontSize:      "11px",
              letterSpacing: "-0.32px",
              textTransform: "uppercase",
              color:         "#334454",
              whiteSpace:    "nowrap",
            }}
          >
            Our Features
          </span>
        </div>

        {/* Title + body */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
          <h2
            style={{
              fontFamily:    "var(--font-roundo), 'Roundo', system-ui, sans-serif",
              fontWeight:    500,
              fontSize:      "32px",
              lineHeight:    "36.6px",
              letterSpacing: "-0.73px",
              textTransform: "capitalize",
              color:         "#000000",
              margin:        0,
            }}
          >
            {features?.heading || 'Luxury Smart Living Villa Feature Hubs'}
          </h2>

          <p
            style={{
              fontFamily:    "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
              fontWeight:    400,
              fontSize:      "14px",
              lineHeight:    "21px",
              letterSpacing: "0%",
              color:         "#000000CC",
              margin:        0,
            }}
          >
            {features?.subheading || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.'}
          </p>
        </div>
      </div>

      {/* Horizontal peek-card strip */}
      <div
        ref={mobileTrackRef}
        onMouseDown={onMobileMouseDown}
        onMouseLeave={onMobileMouseLeave}
        onMouseUp={onMobileMouseUp}
        onMouseMove={onMobileMouseMove}
        onTouchStart={onMobileTouchStart}
        onTouchMove={onMobileTouchMove}
        style={{
          display:         "flex",
          alignItems:      "flex-start",
          gap:             "18px",
          width:           "calc(100% + 44px)",
          marginLeft:      "-22px",
          paddingLeft:     "22px",
          paddingBottom:   "8px",
          overflowX:       "auto",
          overflowY:       "hidden",
          cursor:          "grab",
          scrollbarWidth:  "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          boxSizing:       "border-box",
          userSelect:      "none",
        }}
      >
        {FEATURES.map((feature) => (
          <MobileFeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>

    {/* ── DESKTOP ──────────────────────────────────────────────────────────── */}
    <div className="hidden md:block">
    {/* ── OUTER SECTION ───────────────────────────────────────────────────── */}
    <section
      style={{
        width:           "100%",
        maxWidth:        "clamp(450px, 100vw, 1920px)",
        margin:          "0 auto",
        paddingTop:      "clamp(32px, 4.167vw, 60px)",
        paddingBottom:   "clamp(32px, 4.167vw, 60px)",
        background:      "#EDE7DE",
        display:         "flex",
        flexDirection:   "column",
        gap:             "clamp(16px, 2.083vw, 30px)",
        overflowX:       "hidden",
        boxSizing:       "border-box",
      }}
    >
      {/* ══════════════════════════════════════════════════════════════════════
          ROW 1 — HEADER
          Figma: w:1440  h:135.8  gap:15px  px:57px
      ═══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          width:         "100%",
          minHeight:     "clamp(90px, 9.431vw, 135.8px)",
          paddingLeft:   "clamp(20px, 3.958vw, 57px)",
          paddingRight:  "clamp(20px, 3.958vw, 57px)",
          display:       "flex",
          flexDirection: "column",
          gap:           "clamp(8px, 1.042vw, 15px)",
          boxSizing:     "border-box",
        }}
      >
        {/* ── TAG PILL ────────────────────────────────────────────────────── */}
        {/* Figma: w:150.6  h:30.8 */}
        <div
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        "clamp(5px, 0.556vw, 8px)",
            width:      "fit-content",
            height:     "clamp(22px, 2.139vw, 30.8px)",
          }}
        >
          {/* Square: 14×14  br:3px  bg:#334454  p:3.6px */}
          <div
            style={{
              width:           "clamp(10px, 0.972vw, 14px)",
              height:          "clamp(10px, 0.972vw, 14px)",
              borderRadius:    "3px",
              background:      "#334454",
              padding:         "clamp(2px, 0.25vw, 3.6px)",
              flexShrink:      0,
              boxSizing:       "border-box",
            }}
          />
          {/* "OUR FEATURES" text  Geist 400  16.2px */}
          <span
            style={{
              fontFamily:    "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
              fontWeight:    400,
              fontSize:      "clamp(11px, 1.125vw, 16.2px)",
              lineHeight:    "clamp(14px, 1.35vw, 19.44px)",
              letterSpacing: "-0.32px",
              textTransform: "uppercase",
              color:         "#334454",
              whiteSpace:    "nowrap",
            }}
          >
            Our Features
          </span>
        </div>

        {/* ── TITLE + BODY ROW ───────────────────────────────────────────── */}
        {/* Figma: w:1326  h:90  justify-content:space-between */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            gap:            "clamp(16px, 2.222vw, 32px)",
            flexWrap:       "wrap",
          }}
        >
          {/* Title: 473×90  Roundo 500  45px/45px  ls:-0.9px */}
          <h2
            style={{
              fontFamily:    "var(--font-roundo), 'Roundo', system-ui, sans-serif",
              fontWeight:    500,
              fontSize:      "clamp(24px, 3.125vw, 45px)",
              lineHeight:    "clamp(26px, 3.125vw, 45px)",
              letterSpacing: "-0.9px",
              textTransform: "capitalize",
              color:         "#222F30",
              margin:        0,
              maxWidth:      "clamp(220px, 32.878vw, 473px)",
              flexShrink:    0,
            }}
          >
            {features?.heading || 'Luxury Smart Living Villa Feature Hubs'}
          </h2>

          {/* Body: 558×66  Geist 400  20px/21.8px  ls:-0.44px */}
          <p
            style={{
              fontFamily:    "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
              fontWeight:    400,
              fontSize:      "clamp(13px, 1.389vw, 20px)",
              lineHeight:    "clamp(15px, 1.514vw, 21.8px)",
              letterSpacing: "-0.44px",
              color:         "#222F30CC",
              margin:        0,
              maxWidth:      "clamp(240px, 38.75vw, 558px)",
            }}
          >
            {features?.subheading || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.'}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          ROW 2 — HORIZONTAL SCROLL CARDS STRIP
          Figma: w:1440  h:540
          Inner track: w:4016.9  h:498.5  gap:25px  left:57px
      ═══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          width:    "100%",
          height:   "clamp(360px, 37.5vw, 540px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Scrollable track */}
        <div
          ref={desktopTrackRef}
          onMouseDown={onDesktopMouseDown}
          onMouseLeave={onDesktopMouseLeave}
          onMouseUp={onDesktopMouseUp}
          onMouseMove={onDesktopMouseMove}
          onTouchStart={onDesktopTouchStart}
          onTouchMove={onDesktopTouchMove}
          style={{
            position:        "absolute",
            top:             "clamp(12px, 1.444vw, 20.76px)",
            left:            0,
            right:           0,
            bottom:          0,
            display:         "flex",
            alignItems:      "flex-start",
            gap:             "clamp(14px, 1.736vw, 25px)",
            paddingLeft:     "clamp(20px, 3.958vw, 57px)",
            paddingRight:    "clamp(20px, 3.958vw, 57px)",
            overflowX:       "auto",
            overflowY:       "hidden",
            cursor:          "grab",
            scrollbarWidth:  "none",     /* Firefox */
            msOverflowStyle: "none",     /* IE/Edge */
            WebkitOverflowScrolling: "touch",
            boxSizing:       "border-box",
            userSelect:      "none",
          }}
        >
          {/* Hide webkit scrollbar via inline pseudo — handled in globals */}
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
    </div>
    </>
  );
}

function MobileFeatureCard({ feature }) {
  return (
    <div style={{ position: "relative", width: "clamp(260px, 79vw, 340px)", flexShrink: 0 }}>
      {/* Image */}
      <div
        style={{
          position:     "relative",
          width:        "100%",
          height:       "340px",
          overflow:     "hidden",
          background:   "#1a1a1a",
        }}
      >
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          sizes="260px"
          style={{ objectFit: "cover", objectPosition: "center" }}
          draggable={false}
        />
      </div>

      {/* White caption panel — overlaps the bottom of the image, title only */}
      <div
        style={{
          position:     "relative",
          marginTop:    "-44px",
          marginLeft:   "12px",
          marginRight:  "12px",
          borderRadius: "8px",
          overflow:     "hidden",
        }}
      >
        <div style={{ padding: "14px 16px" }}>
          <span
            style={{
              display:       "block",
              fontFamily:    "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
              fontWeight:    400,
              fontSize:      "22px",
              lineHeight:    "26px",
              letterSpacing: "-0.44px",
              textTransform: "capitalize",
              color:         "#ffffff",
            }}
          >
            {feature.title}
          </span>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ feature }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:     "relative",
        width:        "clamp(220px, 26.367vw, 379.68px)",
        height:       "clamp(320px, 34.597vw, 498.16px)",
        flexShrink:   0,
        borderRadius: "clamp(8px, 0.833vw, 12px)",
        overflow:     "hidden",
        background:   "#1a1a1a",
        cursor:       "pointer",
      }}
    >
      {/* ── IMAGE ───────────────────────────────────────────────────────── */}
      <Image
        src={feature.image}
        alt={feature.title}
        fill
        sizes="(max-width: 768px) 240px, 380px"
        style={{
          objectFit:      "cover",
          objectPosition: "center",
          transition:     "transform 0.6s ease",
          transform:      hovered ? "scale(1.05)" : "scale(1)",
        }}
        draggable={false}
      />

      {/* ── GRADIENT ────────────────────────────────────────────────────── */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
          zIndex:     1,
          opacity:    hovered ? 1 : 0.75,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* ── TITLE — static, always visible, no reveal animation ──────────── */}
      <div
        style={{
          position:      "absolute",
          bottom:        0,
          left:          "clamp(14px, 1.319vw, 19px)",
          right:         "clamp(14px, 1.319vw, 19px)",
          paddingBottom: "clamp(16px, 1.736vw, 25px)",
          zIndex:        2,
        }}
      >
        <span
          style={{
            fontFamily:    "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
            fontWeight:    400,
            fontSize:      "clamp(14px, 1.715vw, 24.7px)",
            lineHeight:    "clamp(18px, 2.058vw, 29.64px)",
            letterSpacing: "-0.49px",
            color:         "#FFFFFF",
          }}
        >
          {feature.title}
        </span>
      </div>
    </div>
  );
}
