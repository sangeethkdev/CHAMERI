"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * KiwanoAmenities — Surrounding amenities list and map toggle
 * ─────────────────────────────────────────────────────────────────────────────
 */

// `query` is the string handed to Google Maps — a searchable place name, not a
// coordinate. Pinning by raw lat/lng dropped the marker on open ground with no
// place record behind it, which is what produced "Place info couldn't load".
// Letting Google geocode the name lands on the real place and its info card.
//
// Generic names ("Railway Station", "Downtown Mall") carry a locality so they
// do not resolve to a same-named place elsewhere in Kerala. "NH 66" is a
// 1600km highway with no single pin, so it targets the Thalassery bypass.
const AMENITIES = [
  { id: 1,  name: "Kannur international airport",       time: "45 Minutes Away", icon: "airport",  query: "Kannur International Airport, Mattannur, Kerala" },
  { id: 2,  name: "Aster MIMS Kannur",                  time: "25 Minutes Away", icon: "hospital", query: "Aster MIMS Kannur, Kerala" },
  { id: 3,  name: "Chinmaya Vidyalaya",                 time: "25 Minutes Away", icon: "school",   query: "Chinmaya Vidyalaya, Thalassery, Kerala" },
  { id: 4,  name: "Ammayum Kunjum Hospital",            time: "8 Minutes Away", icon: "hospital", query: "Ammayum Kunjum Hospital Thalassery" },
  { id: 5,  name: "Railway Station",                    time: "10 Minutes Away", icon: "train",    query: "TLY Thalassery Railway Station" },
  { id: 6,  name: "Indira Gandhi Cooperative Hospital", time: "7 Minutes Away",  icon: "hospital", query: "Indira Gandhi Co-operative Hospital, Thalassery, Kerala" },
  { id: 7,  name: "Downtown Mall",                      time: "12 Minutes Away", icon: "cart",     query: "Downtown Mall, Thalassery, Kerala" },
  { id: 8,  name: "Amrita Vidyalayam",                  time: "15 Minutes Away", icon: "school",   query: "Amrita Vidyalayam, Kannur, Kerala" },
  { id: 9,  name: "Mahe Dental College",                time: "10 Minutes Away", icon: "tooth",    query: "Mahe Institute of Dental Sciences and Hospital, Mahe" },
  { id: 10, name: "Malabar Cancer Centre",              time: "5 Minutes Away",  icon: "hospital", query: "Malabar Cancer Centre, Thalassery, Kerala" },
  // NOTE: Google has no place record for this school under any name tried —
  // the embed will show the Thalassery area rather than a pinned building.
  // Correct the name here, or the map stays approximate for this one entry.
  { id: 11, name: "Genesis International School",       time: "4 Minutes Away",  icon: "school",   query: "Genesis International School, Thalassery, Kerala" },
  { id: 12, name: "NH 66",                              time: "4 Minutes Away",  icon: "road",     query: "Thalassery Bypass, Kerala" },
];

// Mobile shows a 2-column grid — chunk the flat list into pairs.
const AMENITY_ROWS = [];
for (let i = 0; i < AMENITIES.length; i += 2) AMENITY_ROWS.push(AMENITIES.slice(i, i + 2));

/* ── SVG Icons ───────────────────────────────────────────────────────────── */

function IconWrapper({ children }) {
  return (
    <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {children}
    </div>
  );
}

function ListIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
      <line x1="9" y1="3" x2="9" y2="18"></line>
      <line x1="15" y1="6" x2="15" y2="21"></line>
    </svg>
  );
}

function getAmenityIcon(type) {
  switch (type) {
    case "airport":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222F30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l5.5 4L5 15.5 3 15l-1 1 3 3 3 3 1-1-.5-2 3.5-3.5 4 5.5c.2.4.7.7 1.2.6l1.2-.7c.4-.2.7-.6.6-1.1z"/>
        </svg>
      );
    case "hospital":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222F30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-2" />
          <path d="M9 11v4" />
          <path d="M7 13h4" />
        </svg>
      );
    case "school":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222F30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "train":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222F30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="16" rx="2" />
          <path d="M4 11h16" />
          <path d="M12 3v8" />
          <path d="M8 19l-2 3" />
          <path d="M18 22l-2-3" />
          <path d="M8 15h0" />
          <path d="M16 15h0" />
        </svg>
      );
    case "cart":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222F30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );
    case "tooth":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222F30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20s-3-2-3-6a3 3 0 0 1 6 0c0 4-3 6-3 6Z" />
          <path d="M9 14s-3-2-3-6a3 3 0 0 1 6 0" />
          <path d="M15 14s3-2 3-6a3 3 0 0 0-6 0" />
        </svg>
      );
    case "road":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222F30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22L10 2" />
          <path d="M20 22L14 2" />
          <path d="M12 6v2" />
          <path d="M12 12v2" />
          <path d="M12 18v2" />
        </svg>
      );
    default:
      return null;
  }
}

const DEFAULT_MAP_SRC = "https://www.google.com/maps?q=Kiwano+Villas,+Mahe,+Kerala&ll=11.755,75.498&z=14&output=embed";

// Chameri Builders & Developers — same origin used in ContactLocations.jsx
const CHAMERI_ORIGIN = { lat: 11.7485921, lng: 75.5322851, name: "Chameri Builders & Developers" };

// Destination goes by name too — the old lat/lng routed to the wrong spot.
function getDirectionsUrl(destination) {
  return `https://www.google.com/maps/dir/?api=1&origin=${CHAMERI_ORIGIN.lat},${CHAMERI_ORIGIN.lng}&destination=${encodeURIComponent(destination.query)}&travelmode=driving`;
}

export default function KiwanoAmenities({ amenities }) {
  const [viewMode, setViewMode] = useState("list"); // 'list' | 'map'
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  // Desktop: the card highlight and the map pin both read from `selectedAmenity`,
  // so the two can never drift apart — selecting drives both at once.
  const handleAmenitySelect = (amenity) => {
    setSelectedAmenity(amenity);
    setViewMode("map");
  };

  // Mobile renders the list only — there is no map view to open there, so a tap
  // still hands off to Google Maps directions the way it did before.
  const openDirections = (amenity) => {
    window.open(getDirectionsUrl(amenity), "_blank", "noopener,noreferrer");
  };

  // Same `q=<place name>&output=embed` form the default map already uses, so the
  // embed resolves a real place and renders its info card.
  const mapSrc = selectedAmenity
    ? `https://www.google.com/maps?q=${encodeURIComponent(selectedAmenity.query)}&z=16&output=embed`
    : DEFAULT_MAP_SRC;

  return (
    <>
    {/* ══════════════════════════════════════════════════════════════════════
        MOBILE — iPhone 13/14 (390px) baseline, fluid across small screens.
        List/Map toggle and map view are hidden on mobile — list only.
    ═══════════════════════════════════════════════════════════════════════ */}
    <section
      className="flex md:hidden"
      style={{
        flexDirection: "column",
        width:         "100%",
        background:    "#EDE7DE",
        paddingTop:    "40px",
        paddingRight:  "22px",
        paddingBottom: "40px",
        paddingLeft:   "22px",
        gap:           "20px",
        boxSizing:     "border-box",
      }}
    >
      {/* Header — Figma: w:346.5 h:173 gap:10 */}
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
              fontSize:      "12px",
              lineHeight:    "19.44px",
              letterSpacing: "-0.32px",
              textTransform: "uppercase",
              color:         "#000000",
              whiteSpace:    "nowrap",
            }}
          >
            Surrounding Amenities
          </span>
        </div>

        {/* Title + subtitle — Figma: w:346.5 h:143 gap:6 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
          <h2
            style={{
              width:         "100%",
              fontFamily:    "var(--font-roundo), 'Roundo', system-ui, sans-serif",
              fontWeight:    500,
              fontSize:      "clamp(24px, 8.2vw, 32px)",
              lineHeight:    "36.6px",
              letterSpacing: "-0.73px",
              color:         "#000000",
              margin:        0,
            }}
          >
            {amenities?.heading || 'Proven Trust Value Modern Homes Leader'}
          </h2>
          <p
            style={{
              width:         "100%",
              fontFamily:    "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
              fontWeight:    400,
              fontSize:      "14px",
              lineHeight:    "21px",
              letterSpacing: "0",
              color:         "#000000CC",
              margin:        0,
            }}
          >
            {amenities?.subheading || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.'}
          </p>
        </div>
      </div>

      {/* 2-column amenity grid — Figma: w:365 h:1122 gap:26 padding:10, 6 rows of 2 */}
      <div
        style={{
          width:      "100%",
          display:    "flex",
          flexDirection: "column",
          gap:        "26px",
          padding:    "10px",
          boxSizing:  "border-box",
        }}
      >
        {AMENITY_ROWS.map((row, i) => (
          <div key={i} style={{ display: "flex", width: "100%", gap: "21px" }}>
            {row.map((amenity) => (
              <div
                key={amenity.id}
                onClick={() => openDirections(amenity)}
                style={{
                  flex:          1,
                  minWidth:      0,
                  display:       "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap:           "12px",
                  padding:       "10px",
                  borderBottom:  "1px solid #6B859E",
                  boxSizing:     "border-box",
                  cursor:        "pointer",
                }}
              >
                {/* Icon + name — Figma: w:142 h:112 gap:6 */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {getAmenityIcon(amenity.icon)}
                  <h3
                    style={{
                      fontFamily:    "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                      fontWeight:    500,
                      fontSize:      "clamp(15px, 4.6vw, 18px)",
                      lineHeight:    "25.92px",
                      letterSpacing: "0",
                      color:         "#000000",
                      margin:        0,
                    }}
                  >
                    {amenity.name}
                  </h3>
                </div>

                {/* Time — Figma: w:127 h:21  Geist 400 16px  color:#4A5452 —
                    sits at the card's bottom edge, its border-bottom reads as the underline */}
                <span
                  style={{
                    fontFamily:    "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                    fontWeight:    400,
                    fontSize:      "clamp(13px, 4.1vw, 16px)",
                    lineHeight:    "100%",
                    letterSpacing: "0",
                    color:         "#4A5452",
                    textTransform: "capitalize",
                    paddingBottom: "8px",
                  }}
                >
                  {amenity.time}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>

    {/* ── DESKTOP ──────────────────────────────────────────────────────────── */}
    <div className="hidden md:block">
    <section
      style={{
        width: "100%",
        background: "#EDE7DE",
        paddingTop: "clamp(40px, 4.167vw, 60px)",
        paddingBottom: "clamp(40px, 4.167vw, 60px)",
        boxSizing: "border-box",
        overflowX: "hidden", // We'll handle horizontal scroll in the inner container
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "clamp(375px, 97.222vw, 1920px)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(20px, 2.08vw, 30px)",
          boxSizing: "border-box",
        }}
      >
        {/* ══════════════════════════════════════════════════════════════════
            HEADER
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(10px, 1.04vw, 15px)",
            paddingLeft: "clamp(20px, 3.96vw, 57px)",
            paddingRight: "clamp(20px, 3.96vw, 57px)",
            boxSizing: "border-box",
          }}
        >
          {/* Tag Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7.2px",
              padding: "5.4px 7.2px",
              borderRadius: "90px",
              background: "transparent",
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: "clamp(14px, 14px, 14px)",
                height: "clamp(14px, 14px, 14px)",
                borderRadius: "3px",
                background: "#334454",
                padding: "3.6px",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(12px, 1.125vw, 16px)",
                lineHeight: "1.2",
                letterSpacing: "-0.32px",
                textTransform: "uppercase",
                color: "#222F30",
              }}
            >
              Surrounding Amenities
            </span>
          </div>

          {/* Title Row */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* Title */}
            <h2
              style={{
                fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(24px, 3.425vw, 60px)",
                lineHeight: "clamp(26px, 3.425vw, 60px)",
                letterSpacing: "-0.9px",
                color: "#222F30",
                maxWidth: "clamp(250px, 33.847vw, 553px)",
                margin: 0,
              }}
            >
              {amenities?.heading || 'Luxury Smart Living Villa Feature Hubs'}
            </h2>

            {/* Subtitle — direct sibling of the title & toggle so
                justify-content:space-between pins the toggle to the far
                right of the row instead of hugging the subtitle's edge */}
            <p
              style={{
                fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.389vw, 20px)",
                lineHeight: "clamp(18px, 1.514vw, 21.8px)",
                letterSpacing: "-0.44px",
                color: "#222F30CC",
                maxWidth: "clamp(300px, 41.667vw, 505px)",
                minWidth: 0,
                flex: "1 1 auto",
                margin: 0,
              }}
            >
              {amenities?.subheading || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.'}
            </p>

            {/* Toggle Buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "25px",
                padding: "8px 12px",
                borderRadius: "5px",
                border: "1px solid #6B859E",
                background: "transparent",
                flexShrink: 0,
                marginLeft: "auto",
              }}
            >
              <button
                onClick={() => setViewMode("list")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: viewMode === "list" ? 1 : 0.48,
                  padding: 0,
                  color: "#222F30",
                  transition: "opacity 0.2s ease",
                }}
              >
                <IconWrapper><ListIcon /></IconWrapper>
                <span
                  style={{
                    fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(14px, 1.389vw, 20px)",
                    lineHeight: "1.09",
                    letterSpacing: "-0.44px",
                  }}
                >
                  List
                </span>
              </button>

              <button
                /* Keeps the current selection — clearing it here would show the
                   default pin while a card still reads as active. */
                onClick={() => setViewMode("map")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: viewMode === "map" ? 1 : 0.48,
                  padding: 0,
                  color: "#222F30",
                  transition: "opacity 0.2s ease",
                }}
              >
                <IconWrapper><MapIcon /></IconWrapper>
                <span
                  style={{
                    fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(14px, 1.389vw, 20px)",
                    lineHeight: "1.09",
                    letterSpacing: "-0.44px",
                  }}
                >
                  Map
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CONTENT AREA (LIST OR MAP)
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            width: "100%",
            position: "relative",
            minHeight: "400px",
            paddingTop: "10px",
            paddingBottom: "10px",
            boxSizing: "border-box",
          }}
        >
          {viewMode === "list" ? (
            /* ── LIST VIEW ─────────────────────────────────────────────────── */
            <div
              style={{
                width: "100%",
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
                paddingLeft: "clamp(20px, 3.96vw, 57px)",
                paddingRight: "clamp(20px, 3.96vw, 57px)",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  maxWidth: "clamp(100vw, 600px, 1920px)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* We have 12 items. Render them in 3 rows of 4 items each */}
                {[0, 1, 2].map((rowIndex) => (
                  <div
                    key={rowIndex}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      /* No row rule — each card draws its own underline beneath
                         its distance text, so a full-width one doubled up. */
                      paddingTop: "21.6px",
                      paddingBottom: "21.6px",
                    }}
                  >
                    {AMENITIES.slice(rowIndex * 4, rowIndex * 4 + 4).map((amenity) => (
                      <div
                        key={amenity.id}
                        onClick={() => handleAmenitySelect(amenity)}
                        style={{
                          width: "clamp(260px, 36.111vw, 520px)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          gap: "15px",
                          padding: "10px",
                          cursor: "pointer",
                          borderRadius: "8px",
                          background: selectedAmenity?.id === amenity.id ? "rgba(107, 133, 158, 0.18)" : "transparent",
                          transition: "transform 0.2s ease, background 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                      >
                        {/* Icon & Title */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {getAmenityIcon(amenity.icon)}
                          <h3
                            style={{
                              fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                              fontWeight: 500,
                              fontSize: "clamp(18px, 1.667vw, 24px)",
                              lineHeight: 1.08,
                              color: "#222F30",
                              margin: 0,
                            }}
                          >
                            {amenity.name}
                          </h3>
                        </div>

                        {/* Distance & Underline */}
                        <div style={{ marginTop: "auto" }}>
                          <span
                            style={{
                              fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                              fontWeight: 400,
                              fontSize: "clamp(14px, 1.25vw, 18px)",
                              lineHeight: "100%",
                              color: "#222F30",
                              textTransform: "capitalize",
                              display: "block",
                              marginBottom: "8px",
                            }}
                          >
                            {amenity.time}
                          </span>
                          {/* Underline picks up the accent on the active card —
                              height stays 1px so nothing shifts on selection. */}
                          <div
                            style={{
                              width: "100%",
                              height: "1px",
                              background:
                                selectedAmenity?.id === amenity.id ? "#6B859E" : "rgba(34, 47, 48, 0.2)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ── MAP VIEW ──────────────────────────────────────────────────── */
            <div
              style={{
                width: "100%",
                height: "clamp(420px, 41.67vw, 600px)",
                borderRadius: "16px",
                position: "relative",
                overflow: "hidden",
                margin: "0 auto",
                maxWidth: "calc(100% - clamp(40px, 7.92vw, 114px))",
                boxShadow: "0 8px 40px rgba(34,47,48,.12)",
              }}
            >
              {/* Google Maps — pinned to the Kiwano project site, or the amenity the user clicked */}
              <iframe
                key={selectedAmenity?.id ?? "default"}
                title={selectedAmenity ? selectedAmenity.name : "Kiwano Villas Location"}
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </div>
    </section>
    </div>
    </>
  );
}
