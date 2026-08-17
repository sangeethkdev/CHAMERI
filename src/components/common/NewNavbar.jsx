'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import MenuSection from './MenuSection';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * NewNavbar — Shared navigation bar for About, Contact, and Gallery pages.
 * ─────────────────────────────────────────────────────────────────────────────
 * Baseline viewport : 1440px
 * Fluid range       : 375px → 1920px
 *
 * Scroll behaviour:
 *   - Hidden (translated up) when the user scrolls DOWN
 *   - Visible (translated to 0) when the user scrolls UP
 *   - Always visible at the very top of the page (scrollY < threshold)
 *
 * clamp() formula:
 *   vw_value = (DESIGN_PX / 1440) × 100
 *   result   = clamp(MOBILE_FLOOR, vw_value vw, DESKTOP_CEIL)
 *
 * Figma specs (1280px design):
 * ─────────────────────────────────────────────────────────────────────────────
 *  OUTER NAV PILL
 *    background   : #FFFFFF1A  (10.2% white)
 *    border-radius: 15px → clamp(8px, 1.042vw, 15px)
 *    max-width    : 1280px
 *    height       : 90px → clamp(56px, 6.25vw, 90px)
 *    outer paddingH: 80px (centering wrapper provides this)
 *
 *  INNER WRAPPER (inside pill)
 *    padding-top/bottom: 11px → clamp(6px, 0.764vw, 11px)
 *    padding-left/right: 29px → clamp(14px, 2.014vw, 29px)
 *    (resulting inner width ≈ 1222px at 1280px viewport)
 *
 *  ROW 1 — height: 46px → clamp(30px, 3.194vw, 46px)
 *    justify-content: space-between
 *
 *  MENU ICON BOX — left div
 *    width : 30px → clamp(22px, 2.083vw, 30px)
 *    height: 30px → clamp(22px, 2.083vw, 30px)
 *    SVG burger: 25×17.5px, color #FFFFFF
 *    top offset: 6.25px, left offset: 2.5px (centred via flex)
 *
 *  CONTACT US BUTTON — right div
 *    button width : 147px → clamp(100px, 10.208vw, 147px)
 *    button height:  46px → clamp(30px,  3.194vw,  46px)
 *    border-radius: 12px → clamp(7px, 0.833vw, 12px)
 *    background: #FFFFFF
 *
 *  ROW 2 — logo (second main div, centred absolutely)
 *    img width : 118px → clamp(72px, 8.194vw, 118px)
 *    img height:  66px → clamp(40px, 4.583vw,  66px)
 *    positioned at left: 553px from inner edge → absolute center
 * ─────────────────────────────────────────────────────────────────────────────
 */
/**
 * @param {boolean} darkLogo  Use the dark (#334454) logo instead of the white
 *   one. The default white logo is built for the photo-backed heroes; pages
 *   whose hero is a light flat colour (about, services) would otherwise show
 *   white-on-cream and the logo would be invisible.
 */
export default function NewNavbar({ opacity = 1, showLogo = true, darkLogo = false }) {
  const logoMark     = darkLogo ? '/icons/logo-mark-dark.svg'     : '/icons/logo (6).svg';
  const logoWordmark = darkLogo ? '/icons/logo-wordmark-dark.svg' : '/icons/logo (7).svg';

  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const SCROLL_THRESHOLD = 8; // px — ignore tiny jitter

    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      if (Math.abs(diff) < SCROLL_THRESHOLD) return; // ignore tiny movements

      if (diff > 0) {
        // Scrolling DOWN → hide navbar
        setVisible(false);
      } else {
        // Scrolling UP → show navbar
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    {/*
     * ── OUTER POSITIONING WRAPPER ──────────────────────────────────────────
     * Fixed so the navbar stays at the top during scroll.
     * Transform + transition drives the hide/show animation.
     */}
    <div
      className="hidden sm:flex"
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         '100%',
        zIndex:        50,
        justifyContent:'center',
        paddingTop:    'clamp(8px, 0.764vw, 11px)',
        paddingLeft:   'clamp(16px, 5.556vw, 80px)',
        paddingRight:  'clamp(16px, 5.556vw, 80px)',
        pointerEvents: 'none',
        opacity,
        transform:     visible ? 'translateY(0)' : 'translateY(-120%)',
        transition:    'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
        willChange:    'transform, opacity',
      }}
    >
      {/*
       * ── PILL CONTAINER ─────────────────────────────────────────────────
       * background : #FFFFFF1A
       * border-radius: 15px → clamp(8px, 1.042vw, 15px)
       * height: 90px → clamp(56px, 6.25vw, 90px)
       * width: 100% capped at 1280px
       */}
      <div
        style={{
          background:    '#FFFFFF1A',
          backdropFilter:'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius:  'clamp(8px, 1.042vw, 15px)',
          width:         '100%',
          maxWidth:      '1920px',
          height:        'clamp(56px, 6.25vw, 90px)',
          pointerEvents: opacity > 0.05 ? 'auto' : 'none',
          position:      'relative',
        }}
      >
        {/*
         * ── INNER WRAPPER ────────────────────────────────────────────────
         * padding-top   : 11px → clamp(6px, 0.764vw, 11px)
         * padding-left/R: 29px → clamp(14px, 2.014vw, 29px)
         * This is the 1223px-wide content area.
         */}
        <div
          style={{
            paddingTop:   'clamp(6px, 0.764vw, 11px)',
            paddingBottom:'clamp(6px, 0.764vw, 11px)',
            paddingLeft:  'clamp(14px, 2.014vw, 29px)',
            paddingRight: 'clamp(14px, 2.014vw, 29px)',
            height:       '100%',
            position:     'relative',
            display:      'flex',
            flexDirection:'column',
            justifyContent:'center',
          }}
        >
          {/*
           * ── ROW 1: Menu (left) + Contact Us (right) ──────────────────
           * height: 46px → clamp(30px, 3.194vw, 46px)
           * justify-content: space-between
           */}
          <div
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              height:         'clamp(30px, 3.194vw, 46px)',
              position:       'relative',
              zIndex:         2,
              // This row is full-width (flex `stretch` from the column
              // parent), but only the menu icon and Contact Us button should
              // be clickable — the empty middle is otherwise a transparent
              // box sitting in front of (higher z-index than) the logo link
              // below it, silently swallowing clicks aimed at the logo.
              pointerEvents:  'none',
            }}
          >
            {/*
             * ── LEFT: MENU ICON ──────────────────────────────────────
             * Container: 30×30px, fixed (per spec)
             * On click → morphs into an X (Variant2), smart-animate,
             * linear easing, 600ms duration
             */}
            <div
              onClick={() => setMenuOpen((open) => !open)}
              style={{
                width:          'clamp(30px, 3.983vw, 50px)',
                height:         'clamp(30px, 3.983vw, 50px)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                cursor:         'pointer',
                flexShrink:     0,
                pointerEvents:  'auto',
              }}
            >
              <svg
                width="clamp(24px, 3.867vw, 38px)"
                height="clamp(24px, 3.867vw, 38px)"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                {/* Top bar → rotates to form the "\" of the X */}
                <rect
                  x="7" y="8" width="12" height="2.4" rx="1.4" fill="currentColor"
                  style={{
                    transformBox:    'fill-box',
                    transformOrigin: 'center',
                    transition:      'transform 600ms linear',
                    transform:       menuOpen ? 'translate(4px, 6.5px) rotate(45deg)' : 'translate(0, 0) rotate(0deg)',
                  }}
                />
                {/* Middle bar → fades and collapses away */}
                <rect
                  x="7" y="14.5" width="20" height="2.4" rx="1.4" fill="currentColor"
                  style={{
                    transformBox:    'fill-box',
                    transformOrigin: 'center',
                    transition:      'transform 600ms linear, opacity 600ms linear',
                    opacity:         menuOpen ? 0 : 1,
                    transform:       menuOpen ? 'scaleX(0)' : 'scaleX(1)',
                  }}
                />
                {/* Bottom bar → rotates to form the "/" of the X */}
                <rect
                  x="7" y="21" width="16" height="2.4" rx="1.4" fill="currentColor"
                  style={{
                    transformBox:    'fill-box',
                    transformOrigin: 'center',
                    transition:      'transform 600ms linear',
                    transform:       menuOpen ? 'translate(6px, -6.5px) rotate(-45deg)' : 'translate(0, 0) rotate(0deg)',
                  }}
                />
              </svg>
            </div>

            {/*
             * ── RIGHT: CONTACT US BUTTON ─────────────────────────────
             * Outer wrapper: width 150px, height 46px, gap 10px
             * Button: bg #FFFFFF, w 147px, h 46px, border-radius 12px
             *
             * Animation (same as home page ContactSection):
             *   - bg: #FFFFFF → #334454 on hover
             *   - Sliding text: two stacked spans shift -50% on hover
             *   - Arrow box (dark, right side): arrow out-right / in-left
             */}
            {/*
             * Outer wrapper — Figma: w:150 h:46 gap:10px
             */}
            <div
              style={{
                width:  'clamp(100px, 10.417vw, 150px)',
                height: 'clamp(30px, 3.194vw, 46px)',
                display:'flex',
                alignItems: 'center',
                gap:    'clamp(6px, 0.694vw, 10px)',
                pointerEvents: 'auto',
              }}
            >
              {/* Button — Figma: w:147 h:46 radius:12px
                  Rendered as a link rather than a button: it navigates rather
                  than acting, so it gains middle-click / open-in-new-tab and is
                  announced as a link. Styling is unchanged. */}
              <Link
                href="/contact"
                aria-label="Go to the contact page"
                className="group flex items-center no-underline bg-white hover:bg-[#334454] transition-colors duration-300 overflow-hidden cursor-pointer border-none z-50"
                style={{
                  width:        'clamp(98px, 10.208vw, 147px)',
                  height:       'clamp(30px, 3.194vw, 46px)',
                  justifyContent: 'space-between',
                  paddingLeft:  'clamp(8px, 0.863vw, 16.43px)',
                  paddingRight: 'clamp(6px, 0.595vw, 10.57px)',
                  borderRadius: 'clamp(7px, 0.833vw, 12px)',
                  // marginTop:"clamp(20px,1vw,10px)"
                }}
              >
                {/* Sliding text container — Figma: w:90 h:23 */}
                <div
                  className="relative overflow-hidden"
                  style={{ width: 'clamp(60px, 6.25vw, 90px)', height: 'clamp(15px, 1.597vw, 23px)' }}
                >
                  {/* Flex column of two stacked labels — Figma: w:84 */}
                  <div
                    className="flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1/2"
                    style={{ width: 'clamp(56px, 5.833vw, 84px)' }}
                  >
                    <span
                      className="font-Geist text-black whitespace-nowrap flex items-center"
                      style={{
                        height:        'clamp(11px, 1.111vw, 16px)',
                        fontSize:      'clamp(12px, 1.111vw, 16px)',
                        fontWeight:    500,
                        lineHeight:    '100%',
                        letterSpacing: '0%',
                        marginTop: "clamp(0px, 1vw, 4px)"
                      }}
                    >
                      Contact Us
                    </span>
                    <span
                      className="font-Geist text-white whitespace-nowrap flex items-center"
                      style={{
                        height:        'clamp(11px, 1.111vw, 16px)',
                        fontSize:      'clamp(12px, 1.111vw, 16px)',
                        fontWeight:    500,
                        lineHeight:    '100%',
                        letterSpacing: '0%',
                        marginTop: "clamp(0px, 1vw, 4px)"
                      }}
                    >
                      Contact Us
                    </span>
                  </div>
                </div>

                {/* Arrow box — Figma: w:36 h:36 radius:8px */}
                <div
                  className="absolute  transition-colors duration-500 overflow-hidden"
                  style={{
                    right:        'clamp(8px, 0.83vw, 12px)',
                    width:        'clamp(22px, 2.08vw, 30px)',
                    height:       'clamp(22px, 2.08vw, 30px)',
                    borderRadius: 'clamp(5px, 0.49vw, 7px)',
                  }}
                >
                  {/* Arrow slide out */}
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
                    <svg
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className="text-[#000000]"
                      style={{ width: 'clamp(10px, 1.97vw, 24px)', height: 'clamp(10px, 1.97vw, 24px)' }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  {/* Arrow slide in */}
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
                    <svg
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className="text-[#FFFFFF]"
                      style={{ width: 'clamp(10px, 1.97vw, 24px)', height: 'clamp(10px, 1.97vw, 24px)' }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/*
           * ── ROW 2: LOGO (absolutely centred over Row 1) ──────────
           * The logo is centred absolutely within the inner wrapper,
           * using absolute positioning so it sits behind the buttons
           * in z-order but visually centred.
           * img: 117.99×65.91px → clamp fluid values
           */}
          {showLogo && (
            <div
              style={{
                position:       'absolute',
                top:            0,
                left:           0,
                right:          0,
                bottom:         0,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                pointerEvents:  'none',
                zIndex:         1,
              }}
            >
              <Link
                href="/"
                style={{
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    'center',
                  gap:           'clamp(3px, 0.278vw, 4px)',
                  textDecoration:'none',
                  pointerEvents: 'auto',
                }}
              >
                {/* Logo mark (top icon) */}
                <div
                  style={{
                    position: 'relative',
                    width:    'clamp(24px, 2.361vw, 34px)',
                    height:   'clamp(26px, 2.639vw, 38px)',
                  }}
                >
                  <Image
                    src={logoMark}
                    alt="Chameri mark"
                    fill
                    sizes="40px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
                {/* Wordmark (CHAMERI text) */}
                <div
                  style={{
                    position: 'relative',
                    width:    'clamp(70px, 6.944vw, 100px)',
                    height:   'clamp(9px,  0.903vw,  13px)',
                  }}
                >
                  <Image
                    src={logoWordmark}
                    alt="CHAMERI"
                    fill
                    sizes="120px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>

    {/*
     * ── MOBILE NAV (< sm) ───────────────────────────────────────────────────
     * Figma (iPhone 13/14 frame, 390×933):
     *   Glass pill : 370×74  radius:8px  border:2px gradient  backdrop-blur:30px
     *   Hamburger  : 40×40  top:17    left:317.26 (→ right:12.74, vertically centered)
     *   Logo group : 85.93×48  centered in the pill
     *   (logo group = mark + wordmark stacked, scaled 0.8593× from the
     *    desktop pill's row-2 logo proportions)
     */}
    <div
      className="flex sm:hidden"
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         '100%',
        zIndex:        50,
        pointerEvents: 'none',
        opacity,
        transform:     visible ? 'translateY(0)' : 'translateY(-120%)',
        transition:    'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
        willChange:    'transform, opacity',
        paddingTop:    '13px',
        paddingLeft:   '10px',
        paddingRight:  '10px',
      }}
    >
      {/* Glass pill container — Figma: 370×74, radius 8px, gradient fill + gradient border, blur(30px) */}
      <div
        style={{
          position:     'relative',
          width:        '100%',
          height:       '74px',
          borderRadius: '8px',
          // border:       '2px solid transparent',
          background:
            'linear-gradient(110.72deg, rgba(255, 255, 255, 0.36) 1.21%, rgba(196, 196, 196, 0.06) 100%) padding-box, ' +
            'linear-gradient(110.21deg, rgba(255, 255, 255, 0.35) 2.78%, rgba(155, 156, 157, 0.46) 38.77%, rgba(165, 166, 166, 0.48) 66.35%, rgba(255, 255, 255, 0.35) 100%) border-box',
          backdropFilter:       'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          pointerEvents:        opacity > 0.05 ? 'auto' : 'none',
        }}
      >
        {showLogo && (
          <Link
            href="/"
            style={{
              position:      'absolute',
              top:           '50%',
              left:          '50%',
              transform:     'translate(-50%, -50%)',
              width:         '85.93px',
              height:        '48px',
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'center',
              justifyContent:'center',
              gap:           '3.7px',
              pointerEvents: 'auto',
            }}
          >
            <div style={{ position: 'relative', width: '29.5px', height: '33.2px' }}>
              <Image src={logoMark} alt="Chameri mark" fill sizes="40px" style={{ objectFit: 'contain' }} priority />
            </div>
            <div style={{ position: 'relative', width: '85.93px', height: '11.08px' }}>
              <Image src={logoWordmark} alt="CHAMERI" fill sizes="100px" style={{ objectFit: 'contain' }} priority />
            </div>
          </Link>
        )}

        <button
          onClick={() => setMenuOpen((open) => !open)}
          style={{
            position:       'absolute',
            top:            '50%',
            right:          '12.74px',
            transform:      'translateY(-50%)',
            width:          '40px',
            height:         '40px',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            cursor:         'pointer',
            background:     'none',
            border:         'none',
            pointerEvents:  'auto',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <rect
              x="15" y="8" width="12" height="2.4" rx="1.4" fill="currentColor"
              style={{
                transformBox:    'fill-box',
                transformOrigin: 'left',
                transition:      'transform 600ms linear',
                transform:       menuOpen ? 'translate(4px, 6.5px) rotate(45deg)' : 'translate(0, 0) rotate(0deg)',
              }}
            />
            <rect
              x="7" y="14.5" width="20" height="2.4" rx="1.4" fill="currentColor"
              style={{
                transformBox:    'fill-box',
                transformOrigin: 'center',
                transition:      'transform 600ms linear, opacity 600ms linear',
                opacity:         menuOpen ? 0 : 1,
                transform:       menuOpen ? 'scaleX(0)' : 'scaleX(1)',
              }}
            />
            <rect
              x="11" y="21" width="16" height="2.4" rx="1.4" fill="currentColor"
              style={{
                transformBox:    'fill-box',
                transformOrigin: 'center',
                transition:      'transform 600ms linear',
                transform:       menuOpen ? 'translate(6px, -6.5px) rotate(-45deg)' : 'translate(0, 0) rotate(0deg)',
              }}
            />
          </svg>
        </button>
      </div>
    </div>

    <MenuSection open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

