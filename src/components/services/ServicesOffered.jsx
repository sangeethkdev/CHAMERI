"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ServicesOffered — "Our Services" header + horizontal-scroll service cards
 * ─────────────────────────────────────────────────────────────────────────────
 * Baseline viewport : 1440px  (design canvas: header 1440×247, cards 1440×494)
 * Fluid range       : 375px → 1920px
 *
 * clamp() formula
 *   vw_value = (DESIGN_PX / 1440) × 100
 *   result   = clamp(MOBILE_FLOOR, vw_value vw, DESKTOP_CEIL)
 *
 * MOBILE — iPhone 13/14 (390px) baseline, own fixed-px layout (Figma spec),
 * reusing the same drag-to-scroll interaction as desktop for the card strip.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const STATIC_SERVICES = [
  {
    number: "01.",
    title: "AC replacement and servicing",
    description:
      "Every Tropica home begins with thoughtful architecture. Spaces are designed to breathe with the tropics — open layouts, seamless indoor-outdoor flow, and timeless modern lines that frame the natural environment.",
    image: "/dummyimages/e9922a6e4df1537989a5aa9537cc175d7d5b4493.png",
  },
  {
    number: "02.",
    title: "MEP repair and maintenance",
    description:
      "Every Tropica home begins with thoughtful architecture. Spaces are designed to breathe with the tropics — open layouts, seamless indoor-outdoor flow, and timeless modern lines that frame the natural environment.",
    image: "/dummyimages/e9922a6e4df1537989a5aa9537cc175d7d5b4493.png",
  },
  {
    number: "03.",
    title: "General handyman solutions",
    description:
      "Every Tropica home begins with thoughtful architecture. Spaces are designed to breathe with the tropics — open layouts, seamless indoor-outdoor flow, and timeless modern lines that frame the natural environment.",
    image: "/dummyimages/68de01d498421b4e83d9a6e24ebe57bd5e9ea354.png",
  },
  {
    number: "04.",
    title: "Drywall and painting works",
    description:
      "Every Tropica home begins with thoughtful architecture. Spaces are designed to breathe with the tropics — open layouts, seamless indoor-outdoor flow, and timeless modern lines that frame the natural environment.",
    image: "/dummyimages/9cc8f812ff9a30e2649494975a6aa4e15be80110.png",
  },
  {
    number: "05.",
    title: "Plumbing and drainage solutions",
    description:
      "Every Tropica home begins with thoughtful architecture. Spaces are designed to breathe with the tropics — open layouts, seamless indoor-outdoor flow, and timeless modern lines that frame the natural environment.",
    image: "/dummyimages/8a51027ffc750b020c8330c0712fcccc89239b6a.jpg",
  },
  {
    number: "06.",
    title: "Landscaping and exterior finishing",
    description:
      "Every Tropica home begins with thoughtful architecture. Spaces are designed to breathe with the tropics — open layouts, seamless indoor-outdoor flow, and timeless modern lines that frame the natural environment.",
    image: "/dummyimages/3eafafff123ffeea63c4f0c4b3f28a865852219c.jpg",
  },
  {
    number: "07.",
    title: "Post-handover maintenance support",
    description:
      "Every Tropica home begins with thoughtful architecture. Spaces are designed to breathe with the tropics — open layouts, seamless indoor-outdoor flow, and timeless modern lines that frame the natural environment.",
    image: "/dummyimages/e9922a6e4df1537989a5aa9537cc175d7d5b4493.png",
  },
];

// ── Reusable drag-to-scroll binding — one instance per horizontal track ──────
function useDragScroll() {
  const ref = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const touchStartX = useRef(0);
  const touchScrollLeft = useRef(0);

  const onMouseDown = useCallback((e) => {
    isDragging.current = true;
    startX.current = e.pageX - ref.current.offsetLeft;
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
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    ref.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].pageX;
    touchScrollLeft.current = ref.current.scrollLeft;
  }, []);

  const onTouchMove = useCallback((e) => {
    const diff = touchStartX.current - e.touches[0].pageX;
    ref.current.scrollLeft = touchScrollLeft.current + diff;
  }, []);

  return { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove, onTouchStart, onTouchMove };
}

export default function ServicesOffered({ cardsSection }) {
  const heading = cardsSection?.heading || "Exceptional glazing for who build with vision.";
  const subheading =
    cardsSection?.subheading ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.";

  const filledCards = cardsSection?.cards?.filter((c) => c.heading || c.subheading) || [];
  const services = filledCards.length
    ? filledCards.map((c, i) => ({
        number: String(i + 1).padStart(2, "0") + ".",
        title: c.heading,
        description: c.subheading,
        image: c.image || STATIC_SERVICES[i % STATIC_SERVICES.length]?.image,
      }))
    : STATIC_SERVICES;

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
          MOBILE — iPhone 13/14 (390px) baseline
          Figma: w:390 gap:20 pt:40 pb:40 pl:22 pr:22 bg:#EDE7DE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="flex md:hidden"
        style={{
          flexDirection: "column",
          width: "100%",
          background: "#EDE7DE",
          gap: "20px",
          paddingTop: "40px",
          paddingBottom: "0px",
          paddingLeft: "22px",
          paddingRight: "22px",
          boxSizing: "border-box",
        }}
      >
        {/* ── HEADER — Figma: w:346.5 h:173 gap:10 ─────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
          {/* Tag pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7.2px",
              height: "20px",
              paddingLeft: "7.2px",
              paddingRight: "7.2px",
              borderRadius: "90px",
              width: "fit-content",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "3px",
                background: "#334454",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "19.44px",
                letterSpacing: "-0.32px",
                textTransform: "uppercase",
                color: "#000000",
                whiteSpace: "nowrap",
              }}
            >
              Our Services
            </span>
          </div>

          {/* Title + subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
            <h2
              style={{
                width: "100%",
                fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "36.6px",
                letterSpacing: "-0.73px",
                color: "#000000",
                margin: 0,
              }}
            >
              {heading}
            </h2>
            <p
              style={{
                width: "100%",
                fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "21px",
                letterSpacing: "0",
                color: "#000000CC",
                margin: 0,
              }}
            >
              {subheading}
            </p>
          </div>
        </div>

        {/* ── CARD STRIP — full-bleed, same drag-to-scroll as desktop ──────── */}
        <div
          style={{
            width: "calc(100% + 44px)",
            marginLeft: "-22px",
            marginRight: "-22px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            ref={mobileTrackRef}
            onMouseDown={onMobileMouseDown}
            onMouseLeave={onMobileMouseLeave}
            onMouseUp={onMobileMouseUp}
            onMouseMove={onMobileMouseMove}
            onTouchStart={onMobileTouchStart}
            onTouchMove={onMobileTouchMove}
            style={{
              display: "flex",
              overflowX: "auto",
              overflowY: "hidden",
              cursor: "grab",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              userSelect: "none",
            }}
          >
            {services.map((service) => (
              <MobileServiceCard key={service.number} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── DESKTOP ──────────────────────────────────────────────────────────── */}
      <div className="hidden md:block">
      <section style={{ width: "100%", background: "#EDE7DE" }}>
        {/* ══════════════════════════════════════════════════════════════════════
            HEADER ROW
            Figma: w:1440  h:247  pt:18 pr:40 pb:20 pl:47  border-top:1px
        ═══════════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            width: "100%",
            paddingTop: "clamp(12px, 3.95vw, 57px)",
            paddingRight: "clamp(24px, 2.778vw, 40px)",
            paddingBottom: "clamp(14px, 1.389vw, 20px)",
            paddingLeft: "clamp(28px, 3.264vw, 47px)",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "clamp(16px, 2.222vw, 32px)",
            }}
          >
            {/* ── LEFT: tag pill + heading ─────────────────────────────────── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(6px, 0.694vw, 10px)",
                maxWidth: "clamp(280px, 55.66vw, 801.56px)",
              }}
            >
              {/* Tag pill: square + "OUR SERVICES" */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(4px, 1.5vw, 10.6px)",
                  width: "fit-content",
                }}
              >
          <div
            className="bg-[#334454] flex-shrink-0"
            style={{
              width:        'clamp(10px, 0.97vw, 18.6px)',
              height:       'clamp(10px, 0.97vw, 18.6px)',
              borderRadius: 'clamp(2px, 0.21vw, 4px)',
            }}
          />
          {/* Figma @1440: Geist 400, 16.2px / 19.44px, ls -0.32px, uppercase.
              vw = DESIGN_PX / 1440 × 100 → 1.125vw / 1.35vw. */}
          <span
            className="font-sans font-normal uppercase text-[#000000] flex items-center justify-center"
            style={{
              fontSize:      'clamp(12px, 1.125vw, 16.2px)',
              lineHeight:    'clamp(14px, 1.35vw, 19.44px)',
              letterSpacing: '-0.32px',
            }}
          >
            Our Services
          </span>
              </div>

              {/* Heading */}
              <h2
                style={{
                  fontFamily: "var(--font-roundo), 'Roundo'",
                  fontWeight: 450,
                  fontSize: "clamp(30px, 4.167vw, 60px)",
                  lineHeight: "clamp(36px, 4.593vw, 66.14px)",
                  letterSpacing: "clamp(-3.05px, -0.212vw, -1.2px)",
                  color: "#1A1A1A",
                  margin: 0,
                }}
              >
                {heading}
              </h2>
            </div>

            {/* ── RIGHT: lorem paragraph ───────────────────────────────────── */}
            <p
              style={{
                fontFamily: "var(--font-geist-sans), 'Geist'",
                fontWeight: 400,
                fontSize: "clamp(13px, 1.389vw, 20px)",
                lineHeight: "clamp(15px, 1.514vw, 21.8px)",
                letterSpacing: "-0.44px",
                color: "#222F30CC",
                margin: 0,
                maxWidth: "clamp(240px, 32.056vw, 461.61px)",
              }}
            >
              {subheading}
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            HORIZONTAL SCROLL CARDS STRIP
            Figma: w:1440  h:494  |  track: w:3010 h:545  left:61
        ═══════════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            width: "100%",
            height: "clamp(380px, 40.569vw, 601px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            ref={desktopTrackRef}
            onMouseDown={onDesktopMouseDown}
            onMouseLeave={onDesktopMouseLeave}
            onMouseUp={onDesktopMouseUp}
            onMouseMove={onDesktopMouseMove}
            onTouchStart={onDesktopTouchStart}
            onTouchMove={onDesktopTouchMove}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              paddingLeft: "clamp(30px, 4.236vw, 61px)",
              paddingRight: "clamp(30px, 4.236vw, 61px)",
              overflowX: "auto",
              overflowY: "hidden",
              cursor: "grab",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              boxSizing: "border-box",
              userSelect: "none",
            }}
          >
            {services.map((service, i) => (
              <ServiceCard key={service.number} service={service} isFirst={i === 0} />
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

function MobileServiceCard({ service }) {
  /* The number HANGS in the card's left padding instead of occupying a gutter,
     so title / description / image all start on the card's 22px content edge —
     the same edge as the section header above, with an equal 22px on the right.

     It hangs via a negative margin equal to its own width plus the gap. That
     total has to stay within the card's 22px padding or the number runs off
     screen, because the strip is full-bleed and card #1 starts at viewport x=0.
     "01." renders ~19px at 13.57px, which leaves only 3px for the gap. */
  const NUM_W      = "19px";
  const NUM_GAP    = "3px";
  const NUM_OFFSET = `calc(-1 * (${NUM_W} + ${NUM_GAP}))`;

  return (
    <div
      style={{
        width: "min(389px, 100vw)",
        height: "489.44px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "19.9px",
        paddingTop: "39.8px",
        /* Symmetric 22px, matching the section's own paddingLeft/Right, so the
           card's content column is centred and shares the header's edges. It
           was 21.71 / 11.76, which pushed everything ~5px right of centre. */
        paddingRight: "40px",
        paddingBottom: "39.8px",
        paddingLeft: "40px",
        borderLeft: "0.9px solid #00000047",
        background: "#EDE7DE",
        boxSizing: "border-box",
      }}
    >
      {/* Number + title (row) + description + Learn More */}
      <div style={{ display: "flex", flexDirection: "column", gap: "9.05px" }}>
        {/* Number + title */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: NUM_GAP,
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "13.57px",
              lineHeight: "20.35px",
              color: "#6B859E",
              /* Pulled out into the card's left padding so the title beside it
                 lands on the 22px content edge rather than after a gutter. */
              marginLeft: NUM_OFFSET,
              width: NUM_W,
              flexShrink: 0,
            }}
          >
            {service.number}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "29.85px",
              lineHeight: "34.33px",
              letterSpacing: "-0.6px",
              color: "#000000",
              margin: 0,
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {service.title}
          </h3>
        </div>

        {/* Description + Learn More — no padding of its own, so it spans the
            card's full content box: the same 22px→353px column as the title
            above and the image below. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.9px",
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "13.57px",
              lineHeight: "20.35px",
              color: "#000000CC",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {service.description}
          </p>

          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4.52px",
              paddingTop: "5.43px",
              paddingBottom: "5.43px",
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "13.57px",
                lineHeight: "20.35px",
                color: "#000000",
                textDecoration: "underline",
              }}
            >
              Learn More
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image — fills the card's content box, matching the title and
         description column exactly on both edges. */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "183.64px",
          // borderRadius: "8px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="295px"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

function ServiceCard({ service }) {
  /* The number occupies a fixed-width gutter, so the title starts at the same x
     on every card regardless of the digits. Description and image are pushed in
     by that identical amount (INNER_PAD + gutter + gap), which is what lines all
     three left edges up under the title. */
  const INNER_PAD    = "clamp(6px, 0.694vw, 10px)";
  const NUM_W        = "clamp(18px, 1.736vw, 25px)";
  const NUM_GAP      = "clamp(8px, 0.833vw, 12px)";
  const TITLE_INDENT = `calc(${INNER_PAD} + ${NUM_W} + ${NUM_GAP})`;

  return (
    <div
      style={{
        width: "clamp(260px, 29.861vw, 430px)",
        height: "clamp(360px, 37.569vw, 521px)",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "clamp(14px, 1.528vw, 22px)",
        paddingTop: "clamp(8px, 3.016vw, 20px)",
        paddingRight: "clamp(8px, 0.903vw, 13px)",
        paddingBottom: "clamp(24px, 3.056vw, 44px)",
        paddingLeft: "clamp(16px, 1.667vw, 24px)",
        borderLeft: "1px solid #00000047",
        background: "#EDE7DE",
        boxSizing: "border-box",
      }}
    >
      {/* Number + Title — number sits in a left gutter alongside the title, the
         same arrangement the mobile card uses. `flex-start` keeps the number on
         the title's first line; its smaller line box lifts it to cap height.
         Height is pinned to two title lines so short headings never let the
         card content below shift upward. */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: NUM_GAP,
          paddingLeft: INNER_PAD,
          paddingRight: INNER_PAD,
          height: "clamp(48px, 5.27vw, 75.9px)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-sans), 'Geist'",
            paddingTop: "clamp(5px, 1.016vw, 5px)",
            fontWeight: 400,
            fontSize: "clamp(11px, 1.042vw, 15px)",
            lineHeight: "clamp(16px, 1.5625vw, 22.5px)",
            color: "#6B859E",
            width: NUM_W,
            flexShrink: 0,
          }}
        >
          {service.number}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-roundo), 'Roundo'",
            fontWeight: 500,
            fontSize: "clamp(20px, 2.292vw, 33px)",
            lineHeight: "clamp(24px, 2.635vw, 37.95px)",
            letterSpacing: "clamp(-0.66px, -0.0458vw, -0.3px)",
            color: "#1A1A1A",
            margin: 0,
            flex: 1,
            minWidth: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {service.title}
        </h3>
      </div>

      {/* Description + Learn More — indented to the title's left edge. Fixed
         height (4-line description) so short or long descriptions never move
         the image below */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          paddingLeft: TITLE_INDENT,
          paddingRight: INNER_PAD,
          height: "clamp(89px, 8.438vw, 121.5px)",
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-sans), 'Geist'",
            fontWeight: 400,
            fontSize: "clamp(11px, 1.042vw, 15px)",
            lineHeight: "clamp(16px, 1.5625vw, 22.5px)",
            color: "#000000CC",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {service.description}
        </p>

        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(4px, 0.347vw, 5px)",
            paddingTop: "clamp(4px, 0.417vw, 6px)",
            paddingBottom: "clamp(4px, 0.417vw, 6px)",
            background: "none",
            border: "none",
            cursor: "pointer",
            width: "fit-content",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-sans), 'Geist'",
              fontWeight: 400,
              fontSize: "clamp(11px, 1.042vw, 15px)",
              lineHeight: "clamp(16px, 1.5625vw, 22.5px)",
              color: "#1A1A1A",
              textDecoration: "underline",
            }}
          >
            Learn More
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Image — same left edge as the title and description. maxWidth accounts
         for the indent so the fixed width can't push past the card's padding. */}
      <div
        style={{
          position: "relative",
          width: "clamp(200px, 22.639vw, 326px)",
          maxWidth: `calc(100% - ${TITLE_INDENT})`,
          marginLeft: TITLE_INDENT,
          height: "clamp(120px, 14.097vw, 203px)",
          // borderRadius: "clamp(6px, 0.556vw, 8px)",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 240px, 326px"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
