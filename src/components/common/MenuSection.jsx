'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

/* "Have we hydrated yet?" — the portal target (document.body) does not exist
   during SSR. useSyncExternalStore gives false on the server and true on the
   client without a setState-in-effect. Subscribe is a stable no-op because the
   answer never changes again after hydration. */
const noopSubscribe = () => () => {};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * MenuSection — Full-screen navigation overlay opened from the navbar's
 * hamburger icon.
 * ─────────────────────────────────────────────────────────────────────────────
 * Baseline viewport : 1440px
 * Fluid range        : 375px → 1920px
 *
 * clamp() formula
 *   vw_value = (DESIGN_PX / 1440) × 100
 *   result   = clamp(FLOOR (~70% of ceiling), vw_value vw, DESIGN_PX)
 *
 * Figma specs (1440px design):
 *   LEFT PANEL (content)   : width 727.89px, background #EDE7DE
 *   RIGHT PANEL (image)    : width 712.11px, fills remaining space
 *
 *   CLOSE BUTTON           : height 38px, top 80px, left 97px
 *                             background #334454, borderRadius 8px
 *                             icon (24×24, cross 14×14 white) + "CLOSE" label
 *                             on click → smart-animate 800ms linear
 *
 *   NAV + SOCIAL ROW        : top 183px, left 83px, height 525px
 *                             flex row, align-items: flex-end, gap 39px
 *     NAV COLUMN            : width 370px, 8 links, each frame height 41px
 *     SOCIAL ICON ROW       : width 145px, height 30px, gap 14px
 *       Instagram 23×22 · Facebook 22×22 · YouTube 30×30 · WhatsApp 28×28
 * ─────────────────────────────────────────────────────────────────────────────
 */

const NAV_LINKS = [
  { label: 'Home',             href: '/' },
  { label: 'About us',         href: '/about' },
  { label: 'Kiwano Villa',     href: '/kiwano' },
  { label: 'Kiwano Villament', href: '/kiwano-villament' },
  { label: 'Our Service',      href: '/services' },
  { label: 'Gallery',          href: '/gallery' },
  { label: 'Testimonial',      href: '/testimonial' },
  { label: 'Contact Us',       href: '/contact' },
];

const SOCIALS = [
  {
    label:  'Instagram',
    width:  'clamp(16px, 1.597vw, 23px)',
    height: 'clamp(15px, 1.528vw, 22px)',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
      </svg>
    ),
  },
  {
    label:  'Facebook',
    width:  'clamp(15px, 1.928vw, 26px)',
    height: 'clamp(15px, 1.928vw, 26px)',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label:  'YouTube',
    width:  'clamp(21px, 2.083vw, 30px)',
    height: 'clamp(21px, 2.083vw, 30px)',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label:  'WhatsApp',
    width:  'clamp(19px, 1.944vw, 24px)',
    height: 'clamp(19px, 1.944vw, 24px)',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
];

const MOBILE_NAV_LINKS = [
  { label: 'Home',        href: '/' },
  { label: 'About us',    href: '/about' },
  { label: 'Projects',    href: '/project-list' },
  { label: 'Our Service', href: '/services' },
  { label: 'Gallery',     href: '/gallery' },
  { label: 'Testimonial', href: '/testimonial' },
  { label: 'Contact Us',  href: '/contact' },
];

// Order/sizes per Figma mobile spec: Instagram 22×22, WhatsApp 24×24, Facebook 24×24, YouTube 30×30
const MOBILE_SOCIALS = [
  { label: 'Instagram', width: '22px', height: '22px', svg: SOCIALS[0].svg },
  { label: 'WhatsApp',  width: '24px', height: '24px', svg: SOCIALS[3].svg },
  { label: 'Facebook',  width: '24px', height: '24px', svg: SOCIALS[1].svg },
  { label: 'YouTube',   width: '30px', height: '30px', svg: SOCIALS[2].svg },
];

export default function MenuSection({ open = false, onClose }) {
  const navRef = useRef(null);

  // The overlay is portalled to <body> (see the return below); hold it back
  // until the client has hydrated, since document.body has no SSR equivalent.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // Panel slides down from the top; nav links stagger in shortly after.
  useEffect(() => {
    if (!open || !navRef.current) return;

    const items = navRef.current.querySelectorAll('.menu-item');
    const tween = gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out', delay: 0.25 }
    );

    return () => tween.kill();
  }, [open]);

  // Lock background page scroll while the overlay is open.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  if (!mounted) return null;

  /* Portalled to <body>. z-index only ranks siblings inside the same stacking
     context, and this overlay is rendered from NewNavbar, which several heroes
     embed inside a section carrying `isolate` (isolation: isolate). That makes
     a new stacking context, trapping zIndex:100 inside the hero — so any later
     section on the page painted straight over the open menu. Rendering into
     <body> puts it back in the root stacking context, above everything. */
  return createPortal(
    <div
      style={{
        position:      'fixed',
        top:            0,
        left:           0,
        width:          '100%',
        height:         '100dvh',
        zIndex:         100,
        opacity:        open ? 1 : 0,
        pointerEvents:  open ? 'auto' : 'none',
        transform:      open ? 'translateY(0)' : 'translateY(-100%)',
        transition:     'transform 700ms cubic-bezier(0.65, 0, 0.35, 1), opacity 400ms ease',
      }}
    >
      {/* Hover interactions for nav links: color, letter-spacing, underline, arrow reveal */}
      <style>{`
        .chameri-menu-link {
          position: relative;
          --ls: clamp(-3.05px, -0.2118vw, -2.1px);
          --lc: #141414;
          color: var(--lc);
          letter-spacing: var(--ls);
          transition: color 350ms ease, letter-spacing 350ms ease;
        }
        .chameri-menu-link:hover {
          --lc: #334454;
          --ls: clamp(-1.2px, -0.05vw, -0.4px);
        }
        .chameri-menu-underline {
          position: absolute;
          left: 0;
          bottom: 0.08em;
          height: 2px;
          width: 0%;
          background: currentColor;
          transition: width 400ms ease;
        }
        .chameri-menu-link:hover .chameri-menu-underline {
          width: 100%;
        }
        .chameri-menu-arrow {
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 350ms ease, transform 350ms ease;
        }
        .chameri-menu-link:hover .chameri-menu-arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <div className="hidden sm:flex" style={{ width: '100%', height: '100%' }}>

        {/* ── LEFT: content panel ──────────────────────────────────────────
         * Vertical rhythm is driven by dvh, not vw: the panel is 100dvh tall,
         * so sizing it off viewport *width* left a large dead gap at the bottom
         * on any aspect ratio away from the 1440×900 baseline (e.g. 1024×690).
         * Per the Figma spec the nav block sits ~centred (183px above / 192px
         * below at 900px tall). The close button stays in normal flow so the
         * nav's auto margins centre it in the space *below* the button — an
         * absolutely positioned button is out of flow, so centring ignored it
         * and the first link rode up underneath it on wide, short windows.
         */}
        <div
          style={{
            position:      'relative',
            flex:          '0 0 clamp(495px, 50.548vw, 727.89px)',
            height:        '100%',
            background:    '#EDE7DE',
            display:       'flex',
            flexDirection: 'column',
            paddingLeft:   'clamp(87px, 5.764vw, 108px)',
            paddingRight:  'clamp(24px, 2.5vw, 48px)',
            paddingTop:    'clamp(30px, 5.556vw, 50px)',
            paddingBottom: 'clamp(32px, 6dvh, 80px)',
            boxSizing:     'border-box',
            overflowY:     'auto',
          }}
        >
          {/* ── CLOSE BUTTON ──────────────────────────────────────────────
           * Dark box (38.9×38, bg #334454, borderRadius 8px) wraps ONLY the
           * X icon. The "CLOSE" label overflows outside the box, to the
           * right, sitting on the cream background — matching the design.
           * Sits in normal flow (the panel's padding supplies its top/left
           * offset) so the nav below can centre in the space that remains,
           * instead of sliding underneath an out-of-flow button.
           * marginLeft nudges the dark box a few px right of the nav text.
           */}
          <button
            onClick={onClose}
            style={{
              marginLeft:     'clamp(4px, 0.57vw, 6px)',
              height:         'clamp(26px, 2.639vw, 38px)',
              width:          'clamp(27px, 2.701vw, 38.9px)',
              display:        'flex',
              alignItems:     'center',
              gap:            'clamp(12px, 1.181vw, 17px)',
              paddingTop:     'clamp(5px, 0.486vw, 7px)',
              paddingBottom:  'clamp(5px, 0.486vw, 7px)',
              paddingLeft:    'clamp(6px, 0.556vw, 8px)',
              borderRadius:   'clamp(6px, 0.556vw, 8px)',
              background:     '#334454',
              border:         'none',
              cursor:         'pointer',
              overflow:       'visible',
              flexShrink:     0,
              transition:     'background-color 800ms linear, width 800ms linear',
            }}
          >
            {/* Cross vector icon — 24×24 box, 14×14 white cross (centred: top 5px, left 5px) */}
            <span
              style={{
                width:          'clamp(17px, 1.667vw, 24px)',
                height:         'clamp(17px, 1.667vw, 24px)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                flexShrink:     0,
              }}
            >
              <svg
                width="clamp(10px, 0.972vw, 14px)"
                height="clamp(10px, 0.972vw, 14px)"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="1" y1="1" x2="13" y2="13" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="13" y1="1" x2="1" y2="13" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>

            {/* Overflows outside the dark box onto the cream background */}
            <span
              style={{
                fontFamily:    'Geist, sans-serif',
                fontWeight:    500,
                fontSize:      'clamp(13px, 1.111vw, 16px)',
                lineHeight:    '100%',
                letterSpacing: '0%',
                color:         '#334454',
                textTransform: 'uppercase',
                whiteSpace:    'nowrap',
                flexShrink:    0,
              }}
            >
              Close
            </span>
          </button>

          {/* ── NAV + SOCIAL ROW ──────────────────────────────────────────
           * Auto margins centre the block in the leftover space below the
           * (absolutely positioned) close button, matching the Figma balance
           * without pinning it to a vw-derived offset.
           * gap: 39px → clamp(27px, 2.708vw, 39px)
           */}
          <div
            style={{
              marginTop:    'auto',
              marginBottom: 'auto',
              display:      'flex',
              alignItems:   'flex-end',
              gap:          'clamp(27px, 2.708vw, 39px)',
              flexShrink:   0,
            }}
          >
            {/* NAV COLUMN — width: 370px → clamp(255px, 25.694vw, 370px)
             * Height is intrinsic (rows + row-gap) so the column always hugs
             * its content; the gap scales with viewport height so the block
             * keeps the design's proportions on short and tall screens alike.
             */}
            <nav
              ref={navRef}
              style={{
                width:         'clamp(255px, 25.694vw, 370px)',
                display:       'flex',
                flexDirection: 'column',
                rowGap:        'clamp(4px, 2.1dvh, 19px)',
              }}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="menu-item chameri-menu-link"
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    gap:            'clamp(10px, 0.972vw, 14px)',
                    verticalAlign:  'middle',
                    fontFamily:     'Roundo, sans-serif',
                    fontWeight:     400,
                    fontSize:       'clamp(31px, 3.125vw, 55px)',
                    lineHeight:     1.2,
                    textDecoration: 'none',
                    whiteSpace:     'nowrap',
                    width:          'fit-content',
                  }}
                >
                  <span style={{ position: 'relative' }}>
                    {link.label}
                    <span className="chameri-menu-underline" />
                  </span>
                  {/* <svg
                    className="chameri-menu-arrow"
                    width="clamp(18px, 1.667vw, 24px)"
                    height="clamp(18px, 1.667vw, 24px)"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg> */}
                </Link>
              ))}
            </nav>

            {/* SOCIAL ICON ROW — width: 145px → clamp(100px, 10.069vw, 145px)
             *                    height: 30px → clamp(21px, 2.083vw, 30px)
             *                    gap: 14px → clamp(10px, 0.972vw, 14px)
             */}
            <div
              style={{
                width:      'clamp(100px, 10.069vw, 145px)',
                height:     'clamp(21px, 2.083vw, 30px)',
                display:    'flex',
                alignItems: 'center',
                gap:        'clamp(10px, 0.972vw, 14px)',
                color:      '#141414',
              }}
            >
              {SOCIALS.map((social) => (
                <span
                  key={social.label}
                  aria-label={social.label}
                  style={{ width: social.width, height: social.height, flexShrink: 0 }}
                >
                  {social.svg}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: image panel — fills remaining width ───────────────── */}
        <div
          style={{
            position:   'relative',
            flex:       '1 1 auto',
            height:     '100%',
            background: '#D9D9D9',
          }}
        >
          <Image
            src="/dummyimages/4b59d85480acc2dd4abac9efea1543bed7b49afa (1).png"
            alt="Chameri interior"
            fill
            sizes="clamp(50vw, 25.694vw, 370px)"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* ── MOBILE LAYOUT (< sm) ────────────────────────────────────────────
       * Figma (390×777 frame):
       *   Page padding : top 20px, left/right 18px, bottom 16px
       *   Nav pill     : 370×74 — logo centered, close (X) 29.41×29.41 at
       *                  top 22.29px / right 12.74px (mirrors NewNavbar's
       *                  hamburger slot)
       *   Nav rows     : 7 rows, 66px tall, "[0x]" index + Roundo label,
       *                  bottom border #00000033, 14px gap between the two
       *   Footer row   : copyright + social icons, pinned to the bottom
       */}
      <div
        className="flex sm:hidden flex-col"
        style={{
          width:         '100%',
          height:        '100%',
          background:    '#FFFFFF',
          paddingTop:    '20px',
          paddingLeft:   '18px',
          paddingRight:  '18px',
          paddingBottom: '16px',
        }}
      >
        {/* Top pill — same glass-pill navbar treatment used across the site
         * (see NewNavbar's mobile pill), with a dark logo/close icon since
         * this pill sits on a solid white page instead of a photo hero. */}
        <div
          style={{
            position:     'relative',
            width:        '100%',
            maxWidth:     '370px',
            height:       '74px',
            flexShrink:   0,
            borderRadius: '8px',
            border:       '2px solid transparent',
            background:
              'linear-gradient(110.72deg, rgba(255, 255, 255, 0.36) 1.21%, rgba(196, 196, 196, 0.06) 100%) padding-box, ' +
              'linear-gradient(110.21deg, rgba(255, 255, 255, 0.35) 2.78%, rgba(107, 133, 158, 0.455) 38.77%, rgba(107, 133, 158, 0.476) 66.35%, rgba(255, 255, 255, 0.35) 100%) border-box',
            backdropFilter:       'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
          }}
        >
          <Link
            href="/"
            onClick={onClose}
            style={{
              position:  'absolute',
              top:       '50%',
              left:      '50%',
              transform: 'translate(-50%, -50%)',
              width:     '48px',
              height:    '63.2px',
            }}
          >
            <Image src="/icons/logo (8).svg" alt="Chameri Logo" fill sizes="60px" style={{ objectFit: 'contain' }} />
          </Link>

          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              position:       'absolute',
              top:            '22.29px',
              right:          '12.74px',
              width:          '29.41px',
              height:         '29.41px',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              background:     'none',
              border:         'none',
              padding:        0,
              cursor:         'pointer',
            }}
          >
            <svg width="17.16" height="17.16" viewBox="0 0 24 24" fill="none">
              <line x1="1" y1="1" x2="23" y2="23" stroke="#334454" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="23" y1="1" x2="1" y2="23" stroke="#334454" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav rows */}
        <nav style={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
          {MOBILE_NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              style={{
                display:        'flex',
                alignItems:     'center',
                gap:            '14px',
                height:         '66px',
                borderBottom:   '1px solid #00000033',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize:   '10.59px',
                  lineHeight: '16.81px',
                  color:      '#646464',
                  flexShrink: 0,
                }}
              >
                {`[0${i + 1}]`}
              </span>
              <span
                style={{
                  fontFamily:    'Roundo, sans-serif',
                  fontWeight:    400,
                  fontSize:      'clamp(24px, 7.6vw, 29.76px)',
                  lineHeight:    1,
                  letterSpacing: '-0.88px',
                  color:         '#212325',
                }}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer — copyright + socials */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            marginTop:      'auto',
            paddingTop:     '24px',
          }}
        >
          <span
            style={{
              fontFamily:    'Instrument Sans, sans-serif',
              fontWeight:    400,
              fontSize:      '14px',
              lineHeight:    '12px',
              letterSpacing: '-0.14px',
              color:         '#000000',
            }}
          >
            © Chameri pvt limited
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px', color: '#141414' }}>
            {MOBILE_SOCIALS.map((social) => (
              <span
                key={social.label}
                aria-label={social.label}
                style={{ width: social.width, height: social.height, flexShrink: 0 }}
              >
                {social.svg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
