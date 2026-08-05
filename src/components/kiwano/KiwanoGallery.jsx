"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * KiwanoGallery — Tabbed masonry photo gallery section
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Root bugs fixed:
 *  1. Section was capped at clamp(375px…1920px) via maxWidth — image grid
 *     was double-constrained and never reached full 1440px.
 *     Fix: section = width:100% NO maxWidth. Children use their own padding.
 *
 *  2. Typo "clamp(320px, 72.vw, 1040px)" — "72." is invalid CSS, browser
 *     silently dropped the entire clamp → title collapsed to min-content.
 *     Fix: removed the bad clamp, let the title div be width:100%.
 *
 *  3. Order was Title → Tabs → Grid (user reordered).
 *     Correct Figma order: Tabs (sticky) → Title → Grid.
 *
 * SECTION  w:1440  h:1766  bg:#EDE7DE  (full-bleed, clamp padding for 1920)
 * DIV 1 — STICKY TAB BAR  w:506.92  h:91  centred  position:sticky top:~16px
 * DIV 2 — TITLE  "A Visual Journey Through Premium Living"  Roundo 500 60px
 * DIV 3 — IMAGE GRID  3-column masonry  px:61px  gap:30px
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Image data per tab ──────────────────────────────────────────────────── */
const GALLERY_DATA = {
  Exterior: {
    col1: [
      { id: 1, src: "/dummyimages/Figure → Hepburn-20-480x320.jpg.svg", alt: "Exterior 1", w: 441, h: 512 },
      { id: 3, src: "/dummyimages/e273958d502607f06d62edd61792f48b69b84f3e.jpg", alt: "Exterior 3", w: 441, h: 483 },
      { id: 6, src: "/dummyimages/ab2a95a06e83c0793c45aa84bc54cd800e1c8716.jpg", alt: "Exterior 6", w: 441, h: 489 },
    ],
    col2: [
      { id: 2,  src: "/dummyimages/Figure → Argo-5-480x720.jpg.svg",     alt: "Exterior 2",  w: 349, h: 336 },
      { id: 4,  src: "/dummyimages/b41115b835e2232a8e61bd8d04a193c1d7a5d351.png", alt: "Exterior 4",  w: 349, h: 384 },
      { id: 10, src: "/dummyimages/81b44908c049fd8e0792ca40e0fdee715ba1f7b0.jpg", alt: "Exterior 10", w: 349, h: 433 },
      { id: 9,  src: "/dummyimages/87e89594da613bb98c472da2cf1f7376200c358b.jpg", alt: "Exterior 9",  w: 348, h: 301 },
    ],
    col3: [
      { id: 5, src: "/dummyimages/af18e0d9d8fdfe4f4a5d97f4fbf9edd12b1ff9df.png", alt: "Exterior 5", w: 441, h: 512 },
      { id: 7, src: "/dummyimages/6bdc232e1c143f702a3a37c1909ea6a7c38d0002.png",  alt: "Exterior 7", w: 440, h: 449 },
      { id: 8, src: "/dummyimages/4366c570846f17b0de12329eb1fab383893fbc5c.jpg",   alt: "Exterior 8", w: 440, h: 522 },
    ],
  },
  Interior: {
    col1: [
      { id: 1, src: "/dummyimages/af18e0d9d8fdfe4f4a5d97f4fbf9edd12b1ff9df.png", alt: "Interior 1", w: 441, h: 512 },
      { id: 3, src: "/dummyimages/b41115b835e2232a8e61bd8d04a193c1d7a5d351.png", alt: "Interior 3", w: 441, h: 483 },
      { id: 6, src: "/dummyimages/Figure → Argo-5-480x720.jpg.svg",              alt: "Interior 6", w: 441, h: 489 },
    ],
    col2: [
      { id: 2,  src: "/dummyimages/Figure → Hepburn-20-480x320.jpg.svg", alt: "Interior 2",  w: 349, h: 336 },
      { id: 4,  src: "/dummyimages/6bdc232e1c143f702a3a37c1909ea6a7c38d0002.png", alt: "Interior 4",  w: 349, h: 384 },
      { id: 10, src: "/dummyimages/87e89594da613bb98c472da2cf1f7376200c358b.jpg",  alt: "Interior 10", w: 349, h: 433 },
      { id: 9,  src: "/dummyimages/ab2a95a06e83c0793c45aa84bc54cd800e1c8716.jpg",  alt: "Interior 9",  w: 348, h: 301 },
    ],
    col3: [
      { id: 5, src: "/dummyimages/e273958d502607f06d62edd61792f48b69b84f3e.jpg", alt: "Interior 5", w: 441, h: 512 },
      { id: 7, src: "/dummyimages/81b44908c049fd8e0792ca40e0fdee715ba1f7b0.jpg",  alt: "Interior 7", w: 440, h: 449 },
      { id: 8, src: "/dummyimages/4366c570846f17b0de12329eb1fab383893fbc5c.jpg",   alt: "Interior 8", w: 440, h: 522 },
    ],
  },
  Amenities: {
    col1: [
      { id: 1, src: "/dummyimages/6bdc232e1c143f702a3a37c1909ea6a7c38d0002.png", alt: "Amenities 1", w: 441, h: 512 },
      { id: 3, src: "/dummyimages/81b44908c049fd8e0792ca40e0fdee715ba1f7b0.jpg",  alt: "Amenities 3", w: 441, h: 483 },
      { id: 6, src: "/dummyimages/87e89594da613bb98c472da2cf1f7376200c358b.jpg",  alt: "Amenities 6", w: 441, h: 489 },
    ],
    col2: [
      { id: 2,  src: "/dummyimages/af18e0d9d8fdfe4f4a5d97f4fbf9edd12b1ff9df.png", alt: "Amenities 2",  w: 349, h: 336 },
      { id: 4,  src: "/dummyimages/Figure → Hepburn-20-480x320.jpg.svg",           alt: "Amenities 4",  w: 349, h: 384 },
      { id: 10, src: "/dummyimages/b41115b835e2232a8e61bd8d04a193c1d7a5d351.png",  alt: "Amenities 10", w: 349, h: 433 },
      { id: 9,  src: "/dummyimages/ab2a95a06e83c0793c45aa84bc54cd800e1c8716.jpg",  alt: "Amenities 9",  w: 348, h: 301 },
    ],
    col3: [
      { id: 5, src: "/dummyimages/Figure → Argo-5-480x720.jpg.svg",              alt: "Amenities 5", w: 441, h: 512 },
      { id: 7, src: "/dummyimages/e273958d502607f06d62edd61792f48b69b84f3e.jpg", alt: "Amenities 7", w: 440, h: 449 },
      { id: 8, src: "/dummyimages/4366c570846f17b0de12329eb1fab383893fbc5c.jpg",  alt: "Amenities 8", w: 440, h: 522 },
    ],
  },
};

const TABS = ["Exterior", "Interior", "Amenities"];

/* ── Single tab button ───────────────────────────────────────────────────── */
function Tab({ label, active, isFirst, isLast, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        flex:                    1,
        height:                  "44px",
        display:                 "flex",
        alignItems:              "center",
        justifyContent:          "center",
        gap:                     "clamp(8px, 0.967vw, 13.92px)",
        paddingTop:              "12px",
        paddingBottom:           "12px",
        paddingLeft:             "clamp(16px, 2.43vw, 35px)",
        paddingRight:            "clamp(16px, 2.43vw, 35px)",
        background:              active ? "#334454" : "#6B859E",
        border:                  "none",
        cursor:                  "pointer",
        borderTopLeftRadius:     isFirst ? "8.35px" : 0,
        borderBottomLeftRadius:  isFirst ? "8.35px" : 0,
        borderTopRightRadius:    isLast  ? "8.35px" : 0,
        borderBottomRightRadius: isLast  ? "8.35px" : 0,
        transition:              "background 0.22s ease",
        whiteSpace:              "nowrap",
        boxSizing:               "border-box",
      }}
    >
      {/* White square — active tab only */}
      {active && (
        <div
          style={{
            width:        "10px",
            height:       "10px",
            borderRadius: "3px",
            background:   "#FFFFFF",
            flexShrink:   0,
          }}
        />
      )}

      {/* Label  Geist 400  18px */}
      <span
        style={{
          fontFamily:    "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
          fontWeight:    400,
          fontSize:      "clamp(13px, 1.25vw, 18px)",
          lineHeight:    "19.49px",
          letterSpacing: "0",
          color:         "#FFFFFF",
          userSelect:    "none",
        }}
      >
        {label}
      </span>
    </button>
  );
}

/* ── Mobile tab button — sized to the iPhone 13/14 (390px) Figma spec ─────────
   Below 375px there isn't enough room for the spec's padding + active square,
   so a media query shrinks padding/gap/font and lets the tab go to equal
   thirds (min-width:0) only at that breakpoint — 390px still renders the
   exact Figma numbers untouched. */
function MobileTab({ label, active, isFirst, isLast, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="kiwano-gallery-tab"
      style={{
        flex:                    1,
        height:                  "100%",
        display:                 "flex",
        alignItems:              "center",
        justifyContent:          "center",
        gap:                     "10.59px",
        paddingTop:              "9.13px",
        paddingBottom:           "9.13px",
        paddingLeft:             "26.63px",
        paddingRight:            "26.63px",
        background:              active ? "#334454" : "#6B859E",
        border:                  "none",
        cursor:                  "pointer",
        borderTopLeftRadius:     isFirst ? "6.35px" : 0,
        borderBottomLeftRadius:  isFirst ? "6.35px" : 0,
        borderTopRightRadius:    isLast  ? "6.35px" : 0,
        borderBottomRightRadius: isLast  ? "6.35px" : 0,
        transition:              "background 0.22s ease",
        whiteSpace:              "nowrap",
        boxSizing:               "border-box",
      }}
    >
      {active && (
        <div
          style={{
            width:        "7.61px",
            height:       "7.61px",
            borderRadius: "2.28px",
            background:   "#FFFFFF",
            flexShrink:   0,
          }}
        />
      )}
      <span
        className="kiwano-gallery-tab-label"
        style={{
          fontFamily:    "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
          fontWeight:    400,
          fontSize:      "13.69px",
          lineHeight:    "14.83px",
          letterSpacing: "0",
          color:         "#FFFFFF",
          userSelect:    "none",
          overflow:      "hidden",
          textOverflow:  "ellipsis",
        }}
      >
        {label}
      </span>
    </button>
  );
}

function toColumns(urls, tabLabel) {
  if (!urls || urls.length === 0) return null;
  const filtered = urls.filter(Boolean);
  if (filtered.length === 0) return null;
  const all = filtered.map((src, i) => ({ id: i + 1, src, alt: `${tabLabel} ${i + 1}`, w: 441, h: 512 }));
  return {
    col1: all.filter((_, i) => i % 3 === 0),
    col2: all.filter((_, i) => i % 3 === 1),
    col3: all.filter((_, i) => i % 3 === 2),
  };
}

export default function KiwanoGallery({ gallery }) {
  const [activeTab, setActiveTab] = useState("Exterior");
  const apiData = {
    Exterior:  toColumns(gallery?.exteriorImages,  'Exterior'),
    Interior:  toColumns(gallery?.interiorImages,  'Interior'),
    Amenities: toColumns(gallery?.amenitiesImages, 'Amenities'),
  };
  const { col1, col2, col3 } = apiData[activeTab] || GALLERY_DATA[activeTab];
  // Mobile shows one stacked column — flatten and restore original numeric order.
  const mobileImages = [...col1, ...col2, ...col3].sort((a, b) => a.id - b.id);

  return (
    <>
    {/* ══════════════════════════════════════════════════════════════════════
        MOBILE — iPhone 13/14 (390px) baseline, sticky tab bar + single-column
        stacked masonry (each image keeps its own aspect ratio, full width)
    ═══════════════════════════════════════════════════════════════════════ */}
    <section
      className="flex md:hidden"
      style={{
        flexDirection: "column",
        width:         "100%",
        background:    "#EDE7DE",
        boxSizing:     "border-box",
      }}
    >
      {/* Header + sticky tabs — Figma: w:390 h:189.26 pt:30 pr:16 pb:6 pl:16 gap:10 */}
      <div
        style={{
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          width:         "100%",
          paddingTop:    "30px",
          paddingRight:  "16px",
          paddingBottom: "6px",
          paddingLeft:   "16px",
          gap:           "10px",
          background:    "#EDE7DE",
          boxSizing:     "border-box",
        }}
      >
        <h2
          style={{
            width:         "100%",
            maxWidth:      "306px",
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
          {gallery?.heading || 'A Visual Journey Through Premium Living'}
        </h2>

        {/* Sticky tab bar — Figma: w:360 h:33.26 */}
        <div
          style={{
            position:  "sticky",
            top:       "12px",
            zIndex:    50,
            width:     "100%",
            maxWidth:  "360px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width:        "100%",
              height:       "33.26px",
              display:      "flex",
              alignItems:   "stretch",
              overflow:     "hidden",
              borderRadius: "6.35px",
            }}
          >
            {TABS.map((tab, i) => (
              <MobileTab
                key={tab}
                label={tab}
                active={activeTab === tab}
                isFirst={i === 0}
                isLast={i === TABS.length - 1}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 375px) {
            .kiwano-gallery-tab {
              min-width: 0 !important;
              padding-left: 10px !important;
              padding-right: 10px !important;
              gap: 4px !important;
            }
            .kiwano-gallery-tab-label {
              font-size: 10.5px !important;
            }
          }
        `}</style>
      </div>

      {/* Image stack — Figma: w:390 h:2034, first frame w:353.14 h:410 top:15 left:18 */}
      <div
        style={{
          width:         "100%",
          background:    "#EDE7DE",
          display:       "flex",
          flexDirection: "column",
          gap:           "15px",
          paddingTop:    "15px",
          paddingBottom: "30px",
          paddingLeft:   "18px",
          paddingRight:  "18px",
          boxSizing:     "border-box",
        }}
      >
        {mobileImages.map((img) => (
          <div
            key={img.id}
            style={{
              position:     "relative",
              width:        "100%",
              aspectRatio:  `${img.w} / ${img.h}`,
              overflow:     "hidden",
              // borderRadius: "6px",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 480px) 100vw, 360px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </section>

    {/* ── DESKTOP ──────────────────────────────────────────────────────────── */}
    <div className="hidden md:block">
    {/*
     * ── ROOT SECTION ────────────────────────────────────────────────────────
     * width:100% — full bleed, NO maxWidth on the section itself.
     * Individual children control their own centering / padding.
     * bg:#EDE7DE matches the rest of the Kiwano page.
     */}
    <section
      style={{
        width:         "100%",
        background:    "#EDE7DE",
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        boxSizing:     "border-box",
      }}
    >

            {/* ════════════════════════════════════════════════════════════════════
          DIV 2 — TITLE
          Figma: w:806.49  h:133
                 "A Visual Journey Through Premium Living"
                 Roundo 500  60px / 66.14px  ls:-3.05px  center
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          width:     "100%",
          maxWidth:  "clamp(320px, 56vw, 806px)",
          padding:   "clamp(12px, 1.111vw, 16px) 10px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
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
          {gallery?.heading || 'A Visual Journey Through Premium Living'}
        </h2>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          DIV 1 — STICKY TAB BAR
          Figma: w:506.92  h:91  gap:10px  p:10px
                 top:109.53 → sticky top clamp
          Centred via margin:auto (no left offset needed in flow layout)
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position:      "sticky",
          top:           "clamp(12px, 1.111vw, 16px)",
          zIndex:        50,
          width:         "clamp(400px, 35.2vw, 506.92px)",
          padding:       "10px",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          boxSizing:     "border-box",
        }}
      >
        {/* TAB PILL  w:486.92  h:44  br:8.35px ──────────────────────── */}
        <div
          style={{
            width:        "100%",
            height:       "44px",
            display:      "flex",
            alignItems:   "stretch",
            overflow:     "hidden",
            borderRadius: "8.35px",
          }}
        >
          {TABS.map((tab, i) => (
            <Tab
              key={tab}
              label={tab}
              active={activeTab === tab}
              isFirst={i === 0}
              isLast={i === TABS.length - 1}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>
      </div>



      {/* ════════════════════════════════════════════════════════════════════
          DIV 3 — IMAGE GRID  w:1440  h:1742
          3-column masonry, same structure as GalleryGrid.
          FIX: this div is width:100% with its own padding — NOT capped by
               a maxWidth that would shrink the grid on wide screens.
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          width:         "100%",
          paddingLeft:   "clamp(20px, 4.23vw, 61px)",
          paddingRight:  "clamp(20px, 4.23vw, 61px)",
          paddingBottom: "clamp(30px, 3.54vw, 51px)",
          paddingTop:    "clamp(16px, 1.632vw, 23.53px)",
          boxSizing:     "border-box",
        }}
      >
        {/* Three-column flex row */}
        <div
          style={{
            width:   "100%",
            display: "flex",
            flexDirection: "row",
            gap:     "clamp(15px, 2.08vw, 30px)",
            alignItems: "flex-start",
          }}
        >

          {/* Column 1 — flexBasis 30.625% */}
          <div
            style={{
              flexBasis:     "30.625%",
              flexShrink:    0,
              flexGrow:      1,
              display:       "flex",
              flexDirection: "column",
              gap:           "clamp(15px, 2.08vw, 30px)",
            }}
          >
            {col1.map((img) => (
              <div
                key={img.id}
                style={{
                  position:     "relative",
                  width:        "100%",
                  aspectRatio:  `${img.w} / ${img.h}`,
                  overflow:     "hidden",
                  // borderRadius: "clamp(4px, 0.42vw, 6px)",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  style={{
                    objectFit:  "cover",
                  }}
                  className="hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>

          {/* Column 2 — flexBasis 24.236% */}
          <div
            style={{
              flexBasis:     "24.236%",
              flexShrink:    0,
              flexGrow:      1,
              display:       "flex",
              flexDirection: "column",
              gap:           "clamp(15px, 2.08vw, 30px)",
            }}
          >
            {col2.map((img) => (
              <div
                key={img.id}
                style={{
                  position:     "relative",
                  width:        "100%",
                  aspectRatio:  `${img.w} / ${img.h}`,
                  overflow:     "hidden",
                  // borderRadius: "clamp(4px, 0.42vw, 6px)",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 24vw"
                  style={{
                    objectFit:  "cover",
                  }}
                  className="hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>

          {/* Column 3 — flexBasis 30.625% */}
          <div
            style={{
              flexBasis:     "30.625%",
              flexShrink:    0,
              flexGrow:      1,
              display:       "flex",
              flexDirection: "column",
              gap:           "clamp(15px, 2.08vw, 30px)",
            }}
          >
            {col3.map((img) => (
              <div
                key={img.id}
                style={{
                  position:     "relative",
                  width:        "100%",
                  aspectRatio:  `${img.w} / ${img.h}`,
                  overflow:     "hidden",
                  // borderRadius: "clamp(4px, 0.42vw, 6px)",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  style={{
                    objectFit:  "cover",
                  }}
                  className="hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
    </div>
    </>
  );
}
