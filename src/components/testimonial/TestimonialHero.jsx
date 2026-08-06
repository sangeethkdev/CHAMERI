import Image from "next/image";
import NewNavbar from "@/components/common/NewNavbar";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * TestimonialHero
 * ─────────────────────────────────────────────────────────────────────────────
 * Baseline viewport : 1440px  (design canvas: 1440 × 746)
 * Fluid range       : 375px → 1920px
 *
 * clamp() formula
 *   vw_value = (DESIGN_PX / 1440) × 100
 *   result   = clamp(MOBILE_FLOOR, vw_value vw, DESKTOP_CEIL)
 *
 * Figma specs (1440px design):
 *   Section : w:1440  h:746
 *   Heading : w:495 h:133  top:306.5  left:473  (centered)
 *             top   = 306.5/746 = 41.09%
 *             width = 495/1440  = 34.375vw
 *   Image   : w:1440 h:802 (cover-cropped to the section, hence taller than
 *             the 746px section height) with a flat 10% black tint plus a
 *             vertical gradient for text legibility.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function TestimonialHero({ hero }) {
  const heading = hero?.heading || "Let's Create \nSomething Exceptional.";
  const image = hero?.image || "/dummyimages/93ea3b68dd0f3cef6bc8fd39cb67ca7fed7d3057.png";

  return (
    <>
      {/* Rendered once, outside both hero sections. Those sections carry
          `isolate` for their -z-10 background layers, which creates a stacking
          context — a fixed navbar placed inside one would be trapped in it and
          painted over by every later section on the page. */}
      <NewNavbar />

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE — iPhone 13/14 (390px) baseline
          Figma: w:390 h:725 pt/pb:50 gap:11, heading w:298.41 Roundo 500 38px/42px ls:-2px
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="flex md:hidden relative w-full overflow-hidden isolate"
        style={{ height: "725px" }}
      >
        {/* ── BACKGROUND IMAGE ───────────────────────────────────────────── */}
        <Image
          src={image}
          alt="Chameri villa exterior"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-10"
        />

        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0 w-full h-full -z-10"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 48.75%, rgba(102,102,102,0) 100%)",
          }}
        />

        {/* ── HEADING — vertically centered via the frame's pt/pb:50 padding */}
        <div
          className="flex flex-col items-center justify-center w-full pointer-events-none"
          style={{ paddingTop: "50px", paddingBottom: "50px", gap: "11px" }}
        >
          <h1
            className="whitespace-pre-wrap font-roundo"
            style={{
              width: "298.41px",
              maxWidth: "calc(100% - 36px)",
              fontWeight: 500,
              fontSize: "38px",
              lineHeight: "42px",
              letterSpacing: "-2px",
              textAlign: "center",
              textTransform: "capitalize",
              color: "#FFFFFF",
              margin: 0,
              padding: 0,
              textShadow: "0 2px 16px rgba(0,0,0,0.25)",
            }}
          >
            {heading}
          </h1>
        </div>
      </section>

      {/* ── DESKTOP ──────────────────────────────────────────────────────────── */}
      <div className="hidden md:block">
        <section
          className="relative w-full overflow-hidden isolate"
          style={{ height: "clamp(400px, 51.806vw, 966px)" }}
        >
          {/* ── BACKGROUND IMAGE ───────────────────────────────────────────── */}
          <div className="absolute inset-0 w-full h-full -z-10">
            <Image
              src={image}
              alt="Chameri villa exterior"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            {/* Dark tint + vertical gradient for text legibility */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), " +
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 48.75%, rgba(102, 102, 102, 0) 100%)",
              }}
            />
          </div>

          {/* ── HEADING
           * Figma: w:495 h:133 top:306.5 left:473 (centered)
           */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "41.09%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "clamp(300px, 34.375vw, 495px)",
              textAlign: "center",
            }}
          >
            <h1
              className="whitespace-pre-wrap font-roundo"
              style={{
                fontWeight: 500,
                fontSize: "clamp(28px, 3.472vw, 50px)",
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
        </section>
      </div>
    </>
  );
}
