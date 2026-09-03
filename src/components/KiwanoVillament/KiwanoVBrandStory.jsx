"use client";

import { useEffect, useRef, useState } from "react";
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
  { id: 1, src: "/dummyimages/Figure → Hepburn-20-480x320.jpg.svg", alt: "Kiwano Villament moment 1" },
  { id: 2, src: "/dummyimages/e273958d502607f06d62edd61792f48b69b84f3e.jpg", alt: "Kiwano Villament moment 2" },
  { id: 3, src: "/dummyimages/ab2a95a06e83c0793c45aa84bc54cd800e1c8716.jpg", alt: "Kiwano Villament moment 3" },
  { id: 4, src: "/dummyimages/af18e0d9d8fdfe4f4a5d97f4fbf9edd12b1ff9df.png", alt: "Kiwano Villament moment 4" },
];

/** The construction-timeline months shown under the thumb strip — the full
 *  twelve, so the placeholder timeline covers a whole year. Used only when the
 *  admin data carries no months of its own. */
const DEFAULT_MONTHS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

/**
 * Audio-waveform strip: 140 bars, heights 0-1, derived per render.
 *
 * The shape is a 16-bar cone (linear ramps — the straight-edged taper is
 * what reads as a cone) standing on an even textured baseline. The cone's
 * peak FOLLOWS the selected month: peak position interpolates across the
 * strip with timeline progress, and because each bar keeps its identity
 * between renders and transitions its height, the cone glides to the new
 * month rather than jumping.
 *
 * Decorative — not a readout of the video's audio — so the strip carries
 * `aria-hidden`. The baseline uses a deterministic sin() texture, identical
 * on server and client, so hydration never mismatches.
 */
const WAVE_BAR_COUNT = 140;
const WAVE_BASE = 0.13;
/** Bars on each side of the peak; the full cone is twice this. */
const WAVE_CONE_HALF = 8;
/** Peak index for a 0-1 timeline progress — inset by the cone's half-width
 *  so the cone is never clipped by either end of the strip. */
const waveConePeak = (progress) =>
  Math.round(WAVE_CONE_HALF + 5 + progress * (WAVE_BAR_COUNT - 1 - 2 * (WAVE_CONE_HALF + 5)));

const waveBarHeight = (i, peakIndex) => {
  const distance = Math.abs(i - peakIndex);
  if (distance < WAVE_CONE_HALF) {
    return WAVE_BASE + (1 - distance / WAVE_CONE_HALF) * (1 - WAVE_BASE);
  }
  return WAVE_BASE * (0.82 + 0.3 * Math.abs(Math.sin(i * 1.9)));
};

const DEFAULT_VIDEO = "/videos/kiwano-hero.mp4";

/**
 * Normalises the admin payload into the timeline this component renders:
 * one stage per month, each owning its own video, thumbnails and date badge.
 *
 * Three shapes have to work:
 *   1. `months[]` — what the admin panel saves now.
 *   2. Legacy top-level `video`/`images`/`date` with no months — rendered as
 *      a single stage against the default labels, so documents saved before
 *      the timeline existed still show their media.
 *   3. No data at all — the built-in placeholder stages.
 *
 * A month that leaves its media blank inherits the section-level media rather
 * than rendering an empty stage, so a partially-filled timeline degrades
 * gracefully instead of going black.
 */
function buildStages(brandStory) {
  const fallbackVideo = brandStory?.video || DEFAULT_VIDEO;
  const fallbackImages = brandStory?.images?.length ? brandStory.images : null;

  const toImages = (urls, monthLabel) =>
    (urls && urls.length ? urls : null)?.map((src, i) => ({
      id: `${monthLabel}-${i}`,
      src,
      alt: `Kiwano Villament ${monthLabel} moment ${i + 1}`,
    })) || null;

  const months = Array.isArray(brandStory?.months) ? brandStory.months : [];

  if (months.length) {
    return months.map((month, i) => {
      const label = month?.label?.trim() || `MONTH ${i + 1}`;
      return {
        label,
        date: month?.date?.trim() || brandStory?.date || "",
        video: month?.video || fallbackVideo,
        images:
          toImages(month?.images, label) ||
          toImages(fallbackImages, label) ||
          DEFAULT_IMAGES,
      };
    });
  }

  /* No months saved — fall back to the legacy single-stage fields, repeated
     across the placeholder labels so the timeline still reads as a timeline. */
  return DEFAULT_MONTHS.map((label) => ({
    label,
    date: brandStory?.date || "May 2026",
    video: fallbackVideo,
    images: toImages(fallbackImages, label) || DEFAULT_IMAGES,
  }));
}

export default function KiwanoVBrandStory({ brandStory }) {
  const heading = brandStory?.heading || "Creating spaces that elevate life";
  const subheading =
    brandStory?.subheading ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.";

  const stages = buildStages(brandStory);
  const months = stages.map((s) => s.label);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMonth, setActiveMonth] = useState(0);

  /* Lightbox: a clicked thumbnail opens full-size over the page, dismissed by
     clicking anywhere or pressing Escape. `src` outlives `visible` so closing
     can animate out — unmounting on close would just pop. */
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);

  /* The active stage drives every piece of media on screen — large video,
     thumb strip and date badge all come from this one object, so moving the
     timeline swaps them together. */
  const activeStage = stages[Math.min(activeMonth, stages.length - 1)] || stages[0];
  const monthImages = activeStage?.images || [];
  const videoSrc = activeStage?.video || DEFAULT_VIDEO;

  const handlePlayClick = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    el.play().catch(() => {});
  };

  const handleThumbClick = (src) => {
    /* Pause rather than keep playing behind the lightbox — audio continuing
       under a full-screen still would read as a bug. */
    if (isPlaying) videoRef.current?.pause();
    setLightboxSrc(src);
    setLightboxVisible(true);
  };

  const closeLightbox = () => setLightboxVisible(false);

  /* One entry point for every way of changing month (labels + both arrows):
     moving the timeline returns the large display to the video, so each
     stage starts from the same state. */
  const selectMonth = (i) => {
    setActiveMonth(Math.max(0, Math.min(months.length - 1, i)));
    setLightboxVisible(false);
    /* The new stage's video mounts paused, so the play button has to come
       back — the remounted element fires no `pause` event to do it for us. */
    setIsPlaying(false);
  };
  const goPrev = () => selectMonth(activeMonth - 1);
  const goNext = () => selectMonth(activeMonth + 1);

  /* Escape closes the lightbox, and the page behind it is frozen while it is
     open so a scroll gesture doesn't drift the content under the image.
     The previous `overflow` is restored rather than assumed to be "" — Lenis
     smooth scroll also writes to it. */
  useEffect(() => {
    if (!lightboxVisible) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxVisible]);

  /* 0..1 position along the timeline, driving the waveform fill. */
  const progress = months.length > 1 ? activeMonth / (months.length - 1) : 0;

  /* ── Cone peak: MEASURED from the active label, not estimated ──────────
     The month row is space-between with unequal label widths plus arrow
     gutters, so no linear formula lands the peak under every label. Instead
     the effect reads the active label's centre and the waveform strip's box
     from the DOM and converts that into a bar index. Re-measured on month
     change and on resize; the linear fallback only covers the first paint
     (SSR has no boxes to measure). */
  const monthRefs = useRef([]);
  const waveRef = useRef(null);
  const [peakIndex, setPeakIndex] = useState(waveConePeak(0));

  useEffect(() => {
    const measure = () => {
      const wave = waveRef.current?.getBoundingClientRect();
      const label = monthRefs.current[activeMonth]?.getBoundingClientRect();
      if (!wave || !label || wave.width === 0) {
        setPeakIndex(waveConePeak(progress));
        return;
      }
      const frac = (label.left + label.width / 2 - wave.left) / wave.width;
      const raw = Math.round(frac * (WAVE_BAR_COUNT - 1));
      /* Clamp so the cone is never clipped by either end of the strip. */
      setPeakIndex(Math.max(WAVE_CONE_HALF, Math.min(WAVE_BAR_COUNT - 1 - WAVE_CONE_HALF, raw)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeMonth, progress, months.length]);

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
                  width: "clamp(340px, 28.66vw, 529.49px)",
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
                  fontSize: "clamp(12px, 1.25vw, 18px)",
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
            {/* BORDER FRAME — Figma: w:1287 h:968 border:1.02px solid #000
                (was 849.1965 tall; the extra height carries the month
                navigator and waveform rows added below the thumb strip) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "clamp(100%,100%,100%)",
                aspectRatio: "1287 / 968",
                border: "1.02px solid #000000",
                boxSizing: "border-box",
              }}
            >
              {/* INNER FRAME — Figma: w:1225.037 h:780.266 top:34.47 left:31.49 gap:9.14
                  Heights re-derived against the taller 968 frame: the block
                  keeps its original pixel size, so its percentages shrink. */}
              <div
                style={{
                  position: "absolute",
                  top: "3.562%",
                  left: "2.446%",
                  width: "95.19%",
                  height: "80.612%",
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
                    background: "#000",
                  }}
                >
                  {/* key={videoSrc} — swapping `src` alone leaves the already
                      buffered stream playing in some browsers, so the element
                      is remounted when the month's video changes. */}
                  <video
                    key={videoSrc}
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

                  {/* Date badge — Figma: w:96 h:20 top:542.98 left:12.51 (of the 1225.037×575.9502 video)
                      No fixed width: the Figma 96px fits "MAY 2026" but not a
                      longer month, so "MARCH 2026" wrapped onto two lines. The
                      badge is absolutely positioned, so it can size to its own
                      text; `nowrap` keeps any month on one line. */}
                  <span
                    style={{
                      position: "absolute",
                      left: "1.02%",
                      bottom: "2.25%",
                      whiteSpace: "nowrap",
                      fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(14px, 1.389vw, 20px)",
                      lineHeight: "19.6px",
                      letterSpacing: "-0.06px",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                      pointerEvents: "none",
                    }}
                  >
                    {activeStage?.date || "May 2026"}
                  </span>
                </div>

                {/* THUMB STRIP — Figma: w:1225.037 h:195.1736 justify-content:space-between
                    key={activeMonth} remounts the strip when the timeline
                    moves, replaying the fade/lift entrance so the stage
                    change reads as a transition, not a swap. */}
                <div
                  key={activeMonth}
                  className="timeline-fade"
                  style={{
                    width: "100%",
                    height: "25.01%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {monthImages.slice(0, 4).map((img) => (
                    <button
                      key={img.id}
                      type="button"
                      aria-label={`Show ${img.alt} in the main display`}
                      onClick={() => handleThumbClick(img.src)}
                      style={{
                        position: "relative",
                        width: "24.28%",
                        height: "100%",
                        overflow: "hidden",
                        border: "none",
                        /* `contain` letterboxes anything that isn't the
                           slot's ratio; the section ground shows through
                           those gaps rather than the black video frame. */
                        background: "#EDE7DE",
                        padding: 0,
                        cursor: "pointer",
                      }}
                    >
                      {/* `contain`, not `cover`: the slot is a wide ~1.5:1 box
                          and `cover` scaled wider photos up to fill it, slicing
                          the top and bottom off. `contain` fits the whole frame
                          in, so nothing is cropped. */}
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 1440px) 25vw, 300px"
                        style={{ objectFit: "contain" }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* ══════════════════════════════════════════════════════════
                  MONTH NAVIGATOR — Figma: w:1213 h:20 top:850 left:37
                  justify-content:space-between
                  Arrows sit at the row's outer edges; the months are a
                  1038-wide (85.573% of this row) space-between group
                  between them.
              ══════════════════════════════════════════════════════════ */}
              <div
                style={{
                  position: "absolute",
                  top: "87.810%",
                  left: "2.875%",
                  width: "94.250%",
                  height: "2.066%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Left arrow — Figma: 20×20, the same chevron rotated 180° */}
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={goPrev}
                  disabled={activeMonth === 0}
                  style={{
                    position: "relative",
                    width: "clamp(14px, 1.389vw, 20px)",
                    height: "clamp(14px, 1.389vw, 20px)",
                    flexShrink: 0,
                    border: "none",
                    background: "transparent",
                    padding: 0,
                    cursor: activeMonth === 0 ? "default" : "pointer",
                    opacity: activeMonth === 0 ? 0.35 : 1,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <Image
                    src="/icons/Vector (8).png"
                    alt=""
                    fill
                    sizes="20px"
                    style={{ objectFit: "contain", transform: "rotate(0deg)" }}
                  />
                </button>

                {/* MONTHS — Figma: w:1038 h:20 justify-content:space-between */}
                <div
                  style={{
                    width: "85.573%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {months.map((month, i) => (
                    <button
                      key={`${month}-${i}`}
                      ref={(el) => { monthRefs.current[i] = el; }}
                      type="button"
                      onClick={() => selectMonth(i)}
                      aria-current={i === activeMonth ? "true" : undefined}
                      style={{
                        /* Figma: Geist 400 20px / 19.6px ls:-0.06px, centred, #334454.
                              Scaled down from 20px: twelve month labels across the
                              1038px row leave only ~7px between words at 20px, where
                              14px keeps a comfortable gap. The active month is
                              weighted rather than recoloured, so the row keeps one
                              colour; opacity is what transitions, since font-weight
                              cannot animate. */
                        fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                        fontWeight: i === activeMonth ? 600 : 400,
                        fontSize: "clamp(11px, 0.972vw, 14px)",
                        lineHeight: "19.6px",
                        letterSpacing: "-0.06px",
                        textAlign: "center",
                        verticalAlign: "middle",
                        color: "#334454",
                        opacity: i === activeMonth ? 1 : 0.7,
                        transition: "opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
                        whiteSpace: "nowrap",
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        cursor: "pointer",
                      }}
                    >
                      {month}
                    </button>
                  ))}
                </div>

                {/* Right arrow — Figma: 20×20, 0° */}
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={goNext}
                  disabled={activeMonth === months.length - 1}
                  style={{
                    position: "relative",
                    width: "clamp(14px, 1.389vw, 20px)",
                    height: "clamp(14px, 1.389vw, 20px)",
                    flexShrink: 0,
                    border: "none",
                    background: "transparent",
                    padding: 0,
                    cursor: activeMonth === months.length - 1 ? "default" : "pointer",
                    opacity: activeMonth === months.length - 1 ? 0.35 : 1,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <Image
                    src="/icons/Vector (9).png"
                    alt=""
                    fill
                    sizes="20px"
                    style={{ objectFit: "contain" }}
                  />
                </button>
              </div>

              {/* ══════════════════════════════════════════════════════════
                  AUDIO WAVEFORM — Figma: w:1156 h:38 top:900 left:66
                  justify-content:space-between
                  Decorative, so aria-hidden: it conveys nothing a screen
                  reader needs and would otherwise read as 140 empty nodes.
              ══════════════════════════════════════════════════════════ */}
              <div
                ref={waveRef}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "92.975%",
                  left: "5.128%",
                  width: "89.821%",
                  height: "3.926%",
                  display: "flex",
                  /* flex-end, not center: every bar sits on one shared bottom
                     baseline and grows upward only, so the cone points up —
                     centring mirrors the tall bars downward and reads as a
                     two-sided waveform, which the design doesn't have. */
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                {Array.from({ length: WAVE_BAR_COUNT }, (_, i) => (
                  <span
                    key={i}
                    style={{
                      /* Bars are 1px hairlines — the row's space-between
                         distributes the gaps, so the strip fills any width
                         without re-tuning the count. Each bar keeps its key
                         across renders, so the height transition below is
                         what animates the cone gliding to the new month. */
                      width: "1px",
                      /* toFixed keeps float noise (53.300000000000004%) out
                         of the rendered style attribute. */
                      height: `${(waveBarHeight(i, peakIndex) * 100).toFixed(1)}%`,
                      /* One colour at full opacity for every bar — the cone's
                         position alone indicates the month. An opacity-based
                         progress fill used to sit here, but it left the
                         active month's own cone faded (everything "ahead" of
                         MAY is the whole strip), which read as a bug. */
                      background: "#334454",
                      transition: "height 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          LIGHTBOX — a clicked thumbnail opens full-size over the page.
          Clicking anywhere (backdrop or the image itself) closes it, as does
          Escape. Kept mounted once opened so the close can animate out, and
          made inert while hidden so it never swallows clicks on the page. */}
      {lightboxSrc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged project image"
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(20px, 4vw, 64px)",
            background: "rgba(0, 0, 0, 0.88)",
            opacity: lightboxVisible ? 1 : 0,
            transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            /* `visibility` (not `display`) so the fade-out actually runs;
               once hidden the layer stops intercepting pointer events. */
            visibility: lightboxVisible ? "visible" : "hidden",
            pointerEvents: lightboxVisible ? "auto" : "none",
            cursor: "zoom-out",
          }}
        >
          {/* Close affordance — the whole backdrop already closes, so this is
              a visual cue rather than the only way out. */}
          <button
            type="button"
            aria-label="Close enlarged image"
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: "clamp(16px, 2.5vw, 32px)",
              right: "clamp(16px, 2.5vw, 32px)",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.12)",
              color: "#FFFFFF",
              fontSize: "26px",
              lineHeight: 1,
              cursor: "pointer",
              transition: "background 0.25s ease",
            }}
          >
            &times;
          </button>

          {/* The image scales to fit inside the padded viewport, so tall and
              wide shots are both fully visible — no cropping in the popup. */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transform: lightboxVisible ? "scale(1)" : "scale(0.96)",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Image
              src={lightboxSrc}
              alt="Enlarged project moment"
              fill
              sizes="100vw"
              style={{ objectFit: "contain" }}
              /* `priority` is deprecated in Next.js 16; the lightbox image only
                 needs to load at once when opened, not be document-preloaded. */
              loading="eager"
            />
          </div>
        </div>
      )}
    </div>
  );
}
