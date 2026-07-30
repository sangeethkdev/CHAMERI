/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ServicesHero
 * ─────────────────────────────────────────────────────────────────────────────
 * Baseline viewport : 1440px  (design canvas: 1440 × 821)
 * Fluid range       : 375px → 1920px
 *
 * clamp() formula
 *   vw_value = (DESIGN_PX / 1440) × 100
 *   result   = clamp(MOBILE_FLOOR, vw_value vw, DESKTOP_CEIL)
 *
 * Position (top/left) of the heading, divider and caption is expressed as a
 * percentage of the section's own width/height, so it scales in lockstep with
 * the section even though the section's height itself is clamp()-driven.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function ServicesHero({ hero }) {
  const heading = hero?.heading || "Let's Build Your Dream\nSomething More Exceptional.";
  const subheading =
    hero?.subheading || "Creating destinations that inspire, engage and endure";
  const videoSrc =
    hero?.video ||
    "/videos/Save these budget-friendly ways to style your dog birthday that look high-end but stay practical designed to feel inspiring useful and easy to - Pin-655766395787350160_1.mp4";

  return (
    <>
    {/* ══════════════════════════════════════════════════════════════════════
        MOBILE — iPhone 13/14 (390px) baseline
        Figma: w:390 h:725 gap:11 pt:50 pb:50
    ═══════════════════════════════════════════════════════════════════════ */}
    <section
      className="flex md:hidden relative w-full overflow-hidden isolate"
      style={{
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        height:         "725px",
        gap:            "11px",
        paddingTop:     "50px",
        paddingBottom:  "50px",
        boxSizing:      "border-box",
      }}
    >
      {/* ── BACKGROUND VIDEO ───────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <video
          key={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </div>

      {/* ── HEADING — Figma: w:298.41 h:168  Roundo 500 38px/42px ls:-2px */}
      <h1
        className="whitespace-pre-wrap font-roundo"
        style={{
          width:         "278.41px",
          maxWidth:      "100%",
          fontWeight:    500,
          fontSize:      "38px",
          lineHeight:    "42px",
          letterSpacing: "-2px",
          textAlign:     "center",
          textTransform: "capitalize",
          color:         "#FFFFFF",
          margin:        0,
          padding:       0,
          textShadow:    "0 2px 16px rgba(0,0,0,0.25)",
        }}
      >
        {heading}
      </h1>
    </section>

    {/* ── DESKTOP ──────────────────────────────────────────────────────────── */}
    <div className="hidden md:block">
    <section
      className="relative w-full overflow-hidden isolate"
      style={{
        height: "clamp(430px, 57.014vw, 961px)",
      }}
    >
      {/* ── BACKGROUND VIDEO ───────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <video
          key={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </div>

      {/* ── HEADING
       * Figma: w:619  h:133  top:346  left:410.01  (centered)
       * top  = 346/821  = 42.144%
       * width = 619/1440 = 42.986vw
       */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "42.144%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(300px, 42.986vw, 619px)",
          textAlign: "center",
        }}
      >
        <h1
          className="whitespace-pre-wrap font-roundo font-medium"
          style={{
            // fontFamily: "var(--font-roundo), 'Roundo'",
            fontWeight: 400,
            fontSize: "clamp(26px, 3.472vw, 50px)",
            lineHeight: "clamp(34px, 4.593vw, 66.14px)",
            letterSpacing: "clamp(-3.05px, -0.212vw, -1.2px)",
            color: "#ffffff",
            margin: 0,
            padding: 0,
            textShadow: "0 2px 16px rgba(0,0,0,0.25)",
          }}
        >
          {heading}
        </h1>
      </div>

      {/* ── HORIZONTAL DIVIDER
       * Figma: w:1370.66  h:1  top:744.71  left:34.63  (centered)
       * top   = 744.71/821  = 90.708%
       * width = 1370.66/1440 = 95.185vw
       */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "90.708%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(280px, 95.185vw, 1370.66px)",
          height: "1px",
          background: "#FBFBF959",
        }}
      />

      {/* ── CAPTION: "CREATING DESTINATIONS THAT INSPIRE, ENGAGE AND ENDURE"
       * Figma: w:430  h:15  top:775  left:508  (centered)
       * top   = 775/821  = 94.397%
       * width = 430/1440 = 29.861vw
       */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "94.397%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(260px, 29.861vw, 460px)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-instrument-sans), 'Instrument Sans', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(10px, 0.833vw, 12px)",
            lineHeight: "clamp(12px, 1.042vw, 15px)",
            letterSpacing: "clamp(0.8px, 0.0833vw, 1.2px)",
            textTransform: "uppercase",
            color: "#FBFBF9",
            display: "block",
            boxShadow: "0px 0px 1px 0px #00000003",
          }}
        >
          {subheading}
        </span>
      </div>
    </section>
    </div>
    </>
  );
}
