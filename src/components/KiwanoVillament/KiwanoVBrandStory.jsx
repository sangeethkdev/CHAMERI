"use client";

import { useRef, useState } from "react";
import Image from "next/image";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * KiwanoVBrandStory — "Creating spaces that elevate life" video showcase
 * Desktop only (hidden below md) — sits between Gallery and Amenities.
 *
 * Figma (1440 basis):
 *   SECTION            w:1440  h:1063
 *   HEADER ROW         w:1440  h:141   pt:60 pr:80 pl:93 gap:26  bg:#EDE7DE
 *     TITLE            w:369.49  "Creating spaces that elevate life"
 *                       Roundo 500 46.48px / 46.48px  ls:-0.7px  color:#000
 *     SUBTITLE         w:505.11  Geist 400 18px / 21.8px  ls:-0.44px  color:#222F30CC
 *   CONTENT AREA        w:1440  h:939
 *     BORDER FRAME      w:1287  h:849.1965  border:1.02px solid #000
 *       INNER FRAME     w:1225.037  h:780.266  gap:9.14
 *         VIDEO         w:1225.037  h:575.9502  + centred play button (60.947⌀, #FFFFFFBD)
 *         THUMB STRIP   w:1225.037  h:195.1736  justify-content:space-between, 4 images
 * ─────────────────────────────────────────────────────────────────────────────
 */

const DEFAULT_IMAGES = [
  { id: 1, src: "/dummyimages/Figure → Hepburn-20-480x320.jpg.svg", alt: "Kiwano villa moment 1" },
  { id: 2, src: "/dummyimages/e273958d502607f06d62edd61792f48b69b84f3e.jpg", alt: "Kiwano villa moment 2" },
  { id: 3, src: "/dummyimages/ab2a95a06e83c0793c45aa84bc54cd800e1c8716.jpg", alt: "Kiwano villa moment 3" },
  { id: 4, src: "/dummyimages/af18e0d9d8fdfe4f4a5d97f4fbf9edd12b1ff9df.png", alt: "Kiwano villa moment 4" },
];

export default function KiwanoVBrandStory({ brandStory }) {
  const heading = brandStory?.heading || "Creating spaces that elevate life";
  const subheading =
    brandStory?.subheading ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.";
  const videoSrc = brandStory?.video || "/videos/kiwano-hero.mp4";
  const images = brandStory?.images?.length
    ? brandStory.images.map((src, i) => ({ id: i + 1, src, alt: `Kiwano villa moment ${i + 1}` }))
    : DEFAULT_IMAGES;

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    el.play().catch(() => {});
  };

  return (
    <div className="hidden md:block">
      <section
        style={{
          width: "100%",
          background: "#EDE7DE",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "100%", maxWidth: "clamp(100%, 100%, 100%)", margin: "0 auto", boxSizing: "border-box" }}>
          {/* ══════════════════════════════════════════════════════════════
              HEADER ROW — Figma: w:1440 h:141 pt:60 pr:80 pl:93 gap:26
          ══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px, 1.806vw, 26px)",
              paddingTop: "clamp(36px, 4.167vw, 60px)",
              paddingRight: "clamp(32px, 2.556vw, 80px)",
              paddingLeft: "clamp(32px, 3.558vw, 73px)",
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
                gap: "clamp(20px, 2.778vw, 40px)",
              }}
            >
              {/* Title — Roundo 500 46.48px / 46.48px ls:-0.7px */}
              <h2
                style={{
                  width: "clamp(240px, 25.66vw, 429.49px)",
                  fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                  fontWeight: 500,
                  fontStyle: "normal",
                  fontSize: "clamp(26px, 3.228vw, 58.48px)",
                  lineHeight: "1",
                  letterSpacing: "-0.7px",
                  textTransform: "capitalize",
                  color: "#000000",
                  margin: 0,
                }}
              >
                {heading}
              </h2>

              {/* Subtitle — Geist 400 18px / 21.8px ls:-0.44px */}
              <p
                style={{
                  width: "clamp(280px, 35.08vw, 515.11px)",
                  fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.25vw, 22px)",
                  lineHeight: "21.8px",
                  letterSpacing: "-0.44px",
                  color: "#222F30CC",
                  margin: 0,
                  paddingTop: "7px",
                  paddingBottom: "7px",
                }}
              >
                {subheading}
              </p>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              CONTENT AREA — Figma: w:1440 h:939
          ══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingTop: "clamp(20px, 2.378vw, 34.28px)",
              paddingBottom: "clamp(28px, 3.856vw, 55.52px)",
              paddingLeft: "clamp(24px, 4.236vw, 61px)",
              paddingRight: "clamp(24px, 4.236vw, 61px)",
              boxSizing: "border-box",
            }}
          >
            {/* BORDER FRAME — Figma: w:1287 h:849.1965 border:1.02px solid #000 */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "clamp(100%,100%,100%)",
                aspectRatio: "1287 / 849.1965",
                border: "1.02px solid #000000",
                boxSizing: "border-box",
              }}
            >
              {/* INNER FRAME — Figma: w:1225.037 h:780.266 top:34.47 left:31.49 gap:9.14 */}
              <div
                style={{
                  position: "absolute",
                  top: "4.06%",
                  left: "2.446%",
                  width: "95.19%",
                  height: "91.89%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(6px, 0.635vw, 9.14px)",
                }}
              >
                {/* VIDEO — Figma: w:1225.037 h:575.9502 (~73.81% of inner frame height) */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "73.81%",
                    overflow: "hidden",
                    // background: "#000",
                  }}
                >
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    loop
                    playsInline
                    controls={isPlaying}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />

                  {/* Play button — 60.947⌀, centred — only shown until playback starts */}
                  {!isPlaying && (
                    <button
                      type="button"
                      aria-label="Play video"
                      onClick={handlePlayClick}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "clamp(44px, 4.233vw, 60.947px)",
                        height: "clamp(44px, 4.233vw, 60.947px)",
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        cursor: "pointer",
                      }}
                    >
                      <Image
                        src="/icons/ion_play-sharp.svg"
                        alt=""
                        fill
                        sizes="61px"
                      />
                    </button>
                  )}
                </div>

                {/* THUMB STRIP — Figma: w:1225.037 h:195.1736 justify-content:space-between */}
                <div
                  style={{
                    width: "100%",
                    height: "25.01%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {images.slice(0, 4).map((img) => (
                    <div
                      key={img.id}
                      style={{
                        position: "relative",
                        width: "24.28%",
                        height: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 1440px) 25vw, 300px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
