"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * KiwanoOtherProjects — "Explore Our Other Projects" section
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function KiwanoOtherProjects({ otherProjects }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
    {/* ══════════════════════════════════════════════════════════════════════
        MOBILE — iPhone 13/14 (390px) baseline, fluid across small screens
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
      {/* Header — Figma: w:390 h:172 pt:40 pr:16 pb:6 pl:16 gap:10 */}
      <div
        style={{
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          width:         "100%",
          paddingTop:    "40px",
          paddingRight:  "16px",
          paddingBottom: "6px",
          paddingLeft:   "16px",
          gap:           "10px",
          boxSizing:     "border-box",
        }}
      >
        <h2
          style={{
            width:         "100%",
            maxWidth:      "358px",
            fontFamily:    "var(--font-roundo), 'Roundo', system-ui, sans-serif",
            fontWeight:    500,
            fontSize:      "clamp(24px, 8.2vw, 32px)",
            lineHeight:    "36.6px",
            letterSpacing: "-0.73px",
            textAlign:     "center",
            textTransform: "capitalize",
            color:         "#000000",
            margin:        0,
          }}
        >
          {otherProjects?.heading || 'Explore Our Other Projects'}
        </h2>
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
            color:         "#000000CC",
            margin:        0,
          }}
        >
          {otherProjects?.subheading || 'Explore crafted villa spaces with modern comfort built beautifully'}
        </p>
      </div>

      {/* Project card — Figma: image w:349 h:495 top:12.24 left:20 radius:8 */}
      <div
        style={{
          width:          "100%",
          background:     "#EDE7DE",
          display:        "flex",
          justifyContent: "center",
          paddingTop:     "12.24px",
          paddingBottom:  "30px",
          paddingLeft:    "20px",
          paddingRight:   "20px",
          boxSizing:      "border-box",
        }}
      >
        <div
          style={{
            position:     "relative",
            width:        "100%",
            maxWidth:     "349px",
            aspectRatio:  "349 / 495",
            borderRadius: "8px",
            overflow:     "hidden",
            background:   "#1a1a1a",
          }}
        >
          <Image
            src={otherProjects?.image || "/dummyimages/e273958d502607f06d62edd61792f48b69b84f3e.jpg"}
            alt="Kiwano Villa"
            fill
            sizes="349px"
            style={{ objectFit: "cover" }}
          />

          {/* Gradient overlay for text readability */}
          <div
            style={{
              position:   "absolute",
              inset:      0,
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 55%)",
            }}
          />

          {/* Overlay content — Figma: title top:312 left:78, body top:369 left:18, button top:427 left:103 */}
          <div
            style={{
              position:       "absolute",
              left:           0,
              right:          0,
              bottom:         "26px",
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              gap:            "10px",
              paddingLeft:    "18px",
              paddingRight:   "18px",
              boxSizing:      "border-box",
              textAlign:      "center",
            }}
          >
            <h3
              style={{
                fontFamily:    "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                fontWeight:    500,
                fontSize:      "clamp(28px, 10.3vw, 40px)",
                lineHeight:    "1.1",
                letterSpacing: "-3.05px",
                color:         "#FFFFFF",
                margin:        0,
              }}
            >
              kiwano Villa
            </h3>
            <p
              style={{
                width:         "100%",
                maxWidth:      "312px",
                fontFamily:    "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                fontWeight:    400,
                fontSize:      "12px",
                lineHeight:    "16px",
                letterSpacing: "-0.04px",
                color:         "#FFFFFF",
                margin:        0,
              }}
            >
              Discover crafted living spaces where modern design meets timeless comfort for every family with smart layouts bright views and premium details built to inspire daily today always now us
            </p>

            <button
              type="button"
              style={{
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                gap:            "8px",
                width:          "clamp(118.6px,11.6vw,167px)",
                height:         "clamp(36.9px,3.61vw,52px)",
                borderRadius:   "clamp(8.5px,0.83vw,12px)",
                background:     "#6B859E",
                border:         "none",
                cursor:         "pointer",
                marginTop:      "6px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize:   "clamp(13px,1.04vw,15px)",
                  color:      "#EDE7DE",
                  whiteSpace: "nowrap",
                }}
              >
                Learn More
              </span>
              <div
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  width:          "clamp(21.3px,2.08vw,30px)",
                  height:         "clamp(21.3px,2.08vw,30px)",
                  borderRadius:   "4px",
                  background:     "#EDE7DE",
                  flexShrink:     0,
                }}
              >
                <svg
                  viewBox="0 0 32 24" fill="none" stroke="#000000" strokeWidth="2.5"
                  style={{ width: "18px", height: "18px" }}
                >
                  <path d="M8 12h18M20 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
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
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "clamp(375px, 89.2vw, 1920px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(30px, 3.47vw, 50px)",
          paddingLeft: "clamp(20px, 5.28vw, 76px)",
          paddingRight: "clamp(20px, 5.28vw, 76px)",
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
            alignItems: "center",
            gap: "14px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 4.167vw, 60px)",
              lineHeight: "clamp(36px, 4.59vw, 66.14px)",
              letterSpacing: "-2.05px",
              color: "#222F30",
              margin: 0,
              textTransform: "capitalize",
            }}
          >
            {otherProjects?.heading || 'Explore Our Other Projects'}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(16px, 1.389vw, 20px)",
              lineHeight: "clamp(22px, 1.833vw, 26.4px)",
              letterSpacing: "-0.44px",
              color: "#222F30CC",
              margin: 0,
              maxWidth: "clamp(375px, 89.2vw, 693px)",
            }}
          >
            {otherProjects?.subheading || 'Explore crafted villa spaces with modern comfort built beautifully'}
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            PROJECT CARD
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(400px, 50vw, 720px)",
            borderRadius: "15.12px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "clamp(20px, 2.62vw, 37.79px) clamp(16px, 2vw, 20px)",
            boxSizing: "border-box",
          }}
        >
          {/* Background Image */}
          <Image
            src={otherProjects?.image || "/dummyimages/e273958d502607f06d62edd61792f48b69b84f3e.jpg"}
            alt="Kiwano Villaments"
            fill
            style={{
              objectFit: "cover",
              zIndex: 0,
            }}
            sizes="(max-width: 1440px) 100vw, 1285px"
          />

          {/* Gradient Overlay for Text Readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
              zIndex: 1,
            }}
          />

          {/* Content Overlay */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "clamp(12px, 1.3vw, 18.97px)",
              maxWidth: "575px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-roundo), 'Roundo', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(36px, 4.167vw, 60px)",
                lineHeight: "clamp(40px, 4.59vw, 66.14px)",
                letterSpacing: "-3.05px",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              kiwano Villaments
            </h3>

            <p
              style={{
                fontFamily: "var(--font-geist-sans), 'Geist', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.389vw, 20px)",
                lineHeight: "clamp(20px, 1.36vw, 19.6px)",
                letterSpacing: "-0.06px",
                color: "#FFFFFF",
                opacity: 0.9,
                margin: 0,
              }}
            >
              Discover crafted living spaces where modern design meets timeless comfort for every family with smart layouts bright views and premium details built to inspire daily today always now us
            </p>

            {/* Submit button */}
            <div className="flex items-center justify-center w-full">
              <button
                type="submit"
                className="group relative flex items-center justify-center bg-[#6B859E] hover:bg-[#4a6074] transition-colors duration-500 overflow-hidden cursor-pointer border-none w-[clamp(118.6px,11.6vw,167px)] h-[clamp(36.9px,3.61vw,52px)]"
                style={{
                  borderRadius: 'clamp(8.5px, 0.83vw, 12px)',
                }}
              >
                {/* Sliding text */}
                <div
                  className="absolute overflow-hidden"
                  style={{
                    top:    'clamp(10px, 1.01vw, 14.5px)',
                    left:   'clamp(10px, 1.83vw, 22px)',
                    width:  'clamp(70px, 6.74vw, 97px)',
                    height: 'clamp(18px, 1.6vw, 23px)',
                  }}
                >
                  <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
                    {['Contact Us', 'Contact Us'].map((label, i) => (
                      <span
                        key={i}
                        className="font-sans font-medium text-[#EDE7DE] whitespace-nowrap flex items-center"
                        style={{
                          height:   'clamp(18px, 1.6vw, 23px)',
                          fontSize: 'clamp(13px, 1.04vw, 15px)',
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow box */}
                <div
                  className="absolute bg-[#EDE7DE] group-hover:bg-[#EDE7DE] transition-colors duration-500 overflow-hidden"
                  style={{
                    right:        'clamp(8.5px, 0.83vw, 12px)',
                    width:        'clamp(21.3px, 2.08vw, 30px)',
                    height:       'clamp(21.3px, 2.08vw, 30px)',
                    borderRadius: 'clamp(5px, 0.49vw, 7px)',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
                    <svg
                      viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      className="text-black"
                      style={{ width: 'clamp(10px, 1.97vw, 22px)', height: 'clamp(10px, 1.97vw, 22px)' }}
                    >
                      <path d="M8 12h18M20 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
                    <svg
                      viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      className="text-black"
                      style={{ width: 'clamp(10px, 1.97vw, 22px)', height: 'clamp(10px, 1.97vw,22px)' }}
                    >
                      <path d="M8 12h18M20 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
    </>
  );
}
