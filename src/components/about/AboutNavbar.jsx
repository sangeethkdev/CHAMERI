// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';

// /**
//  * AboutNavbar — Sticky navigation bar for the About Us page.
//  *
//  * Figma specs:
//  *   width: 1440   height: 84
//  *   padding: 14px 80px
//  *   background: #D8D8D8
//  *   position: sticky  top: 0
//  *
//  * Layout: Menu (left) | Logo (center) | Contact Us (right)
//  */
// export default function AboutNavbar() {
//   return (
//     <nav
//       style={{
//         position: 'sticky',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '84px',
//         background: '#EDE7DE',
//         zIndex: 50,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: '14px',
//         paddingBottom: '14px',
//         paddingLeft: 'clamp(16px, 5.56vw, 80px)',
//         paddingRight: 'clamp(16px, 5.56vw, 80px)',
//         gap: '10px',
//       }}
//     >
//       <div
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           width: '100%',
//           maxWidth: '1280px',
//           height: '56px',
//         }}
//       >
//         {/* ── Left: Menu Button ────────────────────────────────────────────── */}
//         <div className="relative z-50 group" style={{ width: '125px', height: '56px' }}>
//           {/* Expanding Morphing Container */}
//           <div
//             className="absolute top-0 left-0 bg-[#1e293b]/40 backdrop-blur-md border border-white/10 text-white transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden w-[125px] h-[56px] group-hover:w-[260px] group-hover:h-[298px]"
//             style={{ borderRadius: '10px', padding: '9px 10px' }}
//           >
//             {/* Inner Content Box */}
//             <div
//               className="relative bg-[#334454] transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden w-[105px] h-[38px] group-hover:w-[240px] group-hover:h-[280px]"
//               style={{ borderRadius: '6px' }}
//             >
//               {/* Default State: Menu icon + text */}
//               <div className="absolute inset-0 flex items-center justify-center gap-[10px] transition-opacity duration-300 opacity-100 group-hover:opacity-0 group-hover:pointer-events-none">
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#6B859E"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   style={{ borderRadius: '10px' }}
//                 >
//                   <line x1="3" y1="12" x2="21" y2="12" />
//                   <line x1="3" y1="6" x2="21" y2="6" />
//                   <line x1="3" y1="18" x2="21" y2="18" />
//                 </svg>
//                 <span
//                   style={{
//                     fontFamily: 'Geist, sans-serif',
//                     fontSize: '16px',
//                     fontWeight: 400,
//                     color: 'white',
//                     textTransform: 'capitalize',
//                     letterSpacing: '0%',
//                     lineHeight: '100%',
//                   }}
//                 >
//                   Menu
//                 </span>
//               </div>

//               {/* Expanded State: Nav links */}
//               <div className="absolute inset-0 flex flex-col transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
//                 {[
//                   { label: 'Home', href: '/' },
//                   { label: 'About', href: '/about' },
//                   { label: 'Project', href: '/#gallery' },
//                   { label: 'Service', href: '/#services' },
//                   { label: 'Gallery', href: '/#gallery' },
//                 ].map((item) => (
//                   <Link
//                     key={item.label}
//                     href={item.href}
//                     className="group/item flex items-center justify-between px-6 flex-1 text-[#6B859E] hover:text-white transition-colors"
//                   >
//                     <span
//                       style={{
//                         fontFamily: 'Geist, sans-serif',
//                         fontSize: '20px',
//                         fontWeight: 400,
//                         letterSpacing: '0.5px',
//                       }}
//                     >
//                       {item.label}
//                     </span>
//                     <svg
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="opacity-70 group-hover/item:opacity-100 transition-all group-hover/item:translate-x-1 duration-300"
//                     >
//                       <line x1="5" y1="12" x2="19" y2="12" />
//                       <polyline points="12 5 19 12 12 19" />
//                     </svg>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Center: Logo ─────────────────────────────────────────────────── */}
//         <Link
//           href="/"
//           style={{
//             position: 'absolute',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             gap: '6px',
//             textDecoration: 'none',
//             pointerEvents: 'auto',
//           }}
//         >
//           {/* Logo mark */}
//           <div style={{ position: 'relative', width: '34px', height: '38px' }}>
//             <Image
//               src="/icons/logo (6).svg"
//               alt="Chameri mark"
//               fill
//               sizes="40px"
//               style={{ objectFit: 'contain' }}
//               priority
//             />
//           </div>
//           {/* Wordmark */}
//           <div style={{ position: 'relative', width: '100px', height: '13px' }}>
//             <Image
//               src="/icons/logo (7).svg"
//               alt="CHAMERI"
//               fill
//               sizes="120px"
//               style={{ objectFit: 'contain' }}
//               priority
//             />
//           </div>
//         </Link>

//         {/* ── Right: Contact Us Button ─────────────────────────────────────── */}
//         <button
//           className="group flex items-center justify-between bg-white hover:bg-[#334454] transition-colors duration-300 overflow-hidden cursor-pointer border-none z-50"
//           style={{
//             width: '150px',
//             height: '52px',
//             paddingLeft: '16px',
//             paddingRight: '16px',
//             borderRadius: '12px',
//           }}
//           onClick={() => {
//             // Navigate to contact section on homepage or open contact modal
//             window.location.href = '/#contact';
//           }}
//         >
//           {/* Sliding text */}
//           <div className="relative overflow-hidden" style={{ height: '23px', flex: 1 }}>
//             <div className="flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1/2">
//               <span
//                 className="font-sans text-[16px] font-medium text-black whitespace-nowrap flex items-center"
//                 style={{ height: '23px' }}
//               >
//                 Contact Us
//               </span>
//               <span
//                 className="font-sans text-[16px] font-medium text-white whitespace-nowrap flex items-center"
//                 style={{ height: '23px' }}
//               >
//                 Contact Us
//               </span>
//             </div>
//           </div>

//           {/* Arrow icon */}
//           <div
//             className="relative overflow-hidden flex items-center justify-center shrink-0"
//             style={{ width: '21px', height: '20px', marginLeft: '8px' }}
//           >
//             {/* Original arrow — flies out right on hover */}
//             <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-full">
//               <svg
//                 width="21"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="text-black"
//               >
//                 <path d="M5 12h14M12 5l7 7-7 7" />
//               </svg>
//             </div>
//             {/* New arrow — comes in from left on hover */}
//             <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] -translate-x-full group-hover:translate-x-0">
//               <svg
//                 width="21"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="text-white"
//               >
//                 <path d="M5 12h14M12 5l7 7-7 7" />
//               </svg>
//             </div>
//           </div>
//         </button>
//       </div>
//     </nav>
//   );
// }
// ------------------------------------

'use client';

import Image from 'next/image';
import Link from 'next/link';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * AboutNavbar — Sticky navigation bar for the About Us page.
 * ─────────────────────────────────────────────────────────────────────────────
 * Baseline viewport : 1440px  (3xl)
 * Fluid range       : 375px → 1920px
 *
 * clamp() formula
 *   vw_value = (DESIGN_PX / 1440) × 100
 *   result   = clamp(MOBILE_FLOOR, vw_value vw, DESKTOP_CEIL)
 *
 * Figma specs (1440px):
 *   nav height   : 84px  → 5.833vw   floor 56px  ceil 84px
 *   nav paddingV : 14px  → 0.972vw   floor 10px  ceil 14px
 *   nav paddingH : 80px  → 5.556vw   floor 16px  ceil 80px
 *   inner maxW   : 1280px (hard cap)
 *   inner height : 56px  → 3.889vw   floor 40px  ceil 56px
 *
 * Menu button (1440px):
 *   collapsed  w: 125px  → 8.681vw   floor 96px  ceil 125px
 *   collapsed  h: 56px   → 3.889vw   floor 40px  ceil 56px
 *   expanded   w: 260px  → 18.056vw  floor 220px ceil 260px
 *   expanded   h: 298px  → 20.694vw  floor 260px ceil 298px
 *   outer pad  : 9px 10px → 0.625vw / 0.694vw
 *   inner w    : 105px  → 7.292vw   floor 80px  ceil 105px
 *   inner h    : 38px   → 2.639vw   floor 28px  ceil 38px
 *   inner exp w: 240px  → 16.667vw  floor 200px ceil 240px
 *   inner exp h: 280px  → 19.444vw  floor 240px ceil 280px
 *   borderRadius outer: 10px → 0.694vw  floor 7px  ceil 10px
 *   borderRadius inner: 6px  → 0.417vw  floor 4px  ceil 6px
 *
 * Logo (1440px):
 *   mark  w: 34px  → 2.361vw   floor 26px  ceil 34px
 *   mark  h: 38px  → 2.639vw   floor 29px  ceil 38px
 *   word  w: 100px → 6.944vw   floor 76px  ceil 100px
 *   word  h: 13px  → 0.903vw   floor 10px  ceil 13px
 *   gap     : 6px  → 0.417vw   floor 4px   ceil 6px
 *
 * Contact button (1440px):
 *   w: 150px → 10.417vw  floor 120px ceil 150px
 *   h:  52px →  3.611vw  floor  40px ceil  52px
 *   paddingH: 16px → 1.111vw  floor 12px  ceil 16px
 *   borderRadius: 12px → 0.833vw  floor 8px  ceil 12px
 *   fontSize: 16px → 1.111vw  floor 13px  ceil 16px
 *   icon w: 21px → 1.458vw  floor 16px  ceil 21px
 *   icon h: 20px → 1.389vw  floor 16px  ceil 20px
 *   icon marginLeft: 8px → 0.556vw  floor 6px  ceil 8px
 *   text height: 23px → 1.597vw  floor 18px  ceil 23px
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function AboutNavbar() {
  return (
    <>
      {/*
       * ── NAV ────────────────────────────────────────────────────────────────
       * height         84px  → 5.833vw   floor 56px  ceil 84px
       * paddingTop/Bot 14px  → 0.972vw   floor 10px  ceil 14px
       * paddingL/R     80px  → 5.556vw   floor 16px  ceil 80px
       * gap            10px  → 0.694vw   floor 6px   ceil 10px
       */}
      <nav
      style={{
        position:       'sticky',
        top:            0,
        left:           0,
        width:          '100%',
        height:         'clamp(56px, 5.833vw, 124px)',
        background:     'transparent',
        zIndex:         50,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        paddingTop:     'clamp(10px, 0.972vw, 14px)',
        paddingBottom:  'clamp(10px, 0.972vw, 14px)',
        paddingLeft:    'clamp(16px, 5.556vw, 80px)',
        paddingRight:   'clamp(16px, 5.556vw, 80px)',
        gap:            'clamp(6px, 0.694vw, 10px)',
      }}
    >

      {/*
       * ── INNER ROW ──────────────────────────────────────────────────────
       * maxWidth  1280px (hard cap)
       * height    56px  → 3.889vw   floor 40px  ceil 56px
       */}
      <div
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          width:          '100%',
          maxWidth:       '1920px',
          height:         'clamp(40px, 5.889vw, 66px)',
        }}
      >

        {/* ── LEFT: MENU BUTTON ───────────────────────────────────────────
         * Collapsed container
         *   w: 125px → 8.681vw   floor 96px   ceil 125px
         *   h:  56px → 3.889vw   floor 40px   ceil  56px
         *
         * Expanded container (on hover via Tailwind group)
         *   w: 260px → 18.056vw  floor 220px  ceil 260px
         *   h: 298px → 20.694vw  floor 260px  ceil 298px
         *
         * Outer pad
         *   v: 9px → 0.625vw   floor 6px   ceil 9px
         *   h:10px → 0.694vw   floor 7px   ceil 10px
         *
         * Outer borderRadius  10px → 0.694vw  floor 7px  ceil 10px
         *
         * Inner collapsed
         *   w: 105px → 7.292vw  floor 80px  ceil 105px
         *   h:  38px → 2.639vw  floor 28px  ceil  38px
         *
         * Inner expanded
         *   w: 240px → 16.667vw floor 200px ceil 240px
         *   h: 280px → 19.444vw floor 240px ceil 280px
         *
         * Inner borderRadius  6px → 0.417vw  floor 4px  ceil 6px
         *
         * Menu icon  24px → 1.667vw  floor 18px  ceil 24px
         * Menu text  16px → 1.111vw  floor 13px  ceil 16px
         * Nav link text 20px → 1.389vw floor 15px ceil 20px
         * Nav link icon 20px → 1.389vw floor 15px ceil 20px
         * Link paddingH  24px → 1.667vw floor 16px ceil 24px
         */}
        <div
          className="relative z-50 group"
          style={{
            width:  'clamp(96px, 8.681vw, 125px)',
            height: 'clamp(40px, 3.889vw, 56px)',
          }}
        >
          {/* Morphing outer container */}
          <div
            className="absolute top-0 left-0 bg-[#1e293b]/40 backdrop-blur-md border border-white/10 text-white transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden w-[clamp(96px,8.681vw,125px)] h-[clamp(40px,3.889vw,56px)] group-hover:w-[clamp(220px,18.056vw,260px)] group-hover:h-[clamp(260px,20.694vw,298px)]"
            style={{
              borderRadius: 'clamp(7px, 0.694vw, 10px)',
              padding:      'clamp(6px, 0.625vw, 9px) clamp(7px, 0.694vw, 10px)',
            }}
          >
            {/* Inner content box */}
            <div
              className="relative bg-[#334454] transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden w-[clamp(80px,7.292vw,105px)] h-[clamp(28px,2.639vw,38px)] group-hover:w-[clamp(200px,16.667vw,240px)] group-hover:h-[clamp(240px,19.444vw,280px)]"
              style={{
                borderRadius: 'clamp(4px, 0.417vw, 6px)',
              }}
            >
              {/* Default state: icon + "Menu" text */}
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0 group-hover:pointer-events-none"
                style={{ gap: 'clamp(6px, 0.694vw, 10px)' }}
              >
                <svg
                  width="clamp(18px, 1.667vw, 24px)"
                  height="clamp(18px, 1.667vw, 24px)"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B859E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ borderRadius: 'clamp(7px, 0.694vw, 10px)', flexShrink: 0 }}
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6"  x2="21" y2="6"  />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                <span
                  style={{
                    fontFamily:    'Geist, sans-serif',
                    fontSize:      'clamp(13px, 1.111vw, 16px)',
                    fontWeight:    400,
                    color:         'white',
                    textTransform: 'capitalize',
                    letterSpacing: '0%',
                    lineHeight:    '100%',
                    whiteSpace:    'nowrap',
                  }}
                >
                  Menu
                </span>
              </div>

              {/* Expanded state: nav links */}
              <div className="absolute inset-0 flex flex-col transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                {[
                  { label: 'Home',    href: '/'          },
                  { label: 'About',   href: '/about'     },
                  { label: 'Project', href: '/#gallery'  },
                  { label: 'Service', href: '/#services' },
                  { label: 'Gallery', href: '/#gallery'  },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group/item flex items-center justify-between flex-1 text-[#6B859E] hover:text-white transition-colors"
                    style={{ paddingLeft: 'clamp(16px, 1.667vw, 24px)', paddingRight: 'clamp(16px, 1.667vw, 24px)' }}
                  >
                    <span
                      style={{
                        fontFamily:    'Geist, sans-serif',
                        fontSize:      'clamp(15px, 1.389vw, 20px)',
                        fontWeight:    400,
                        letterSpacing: '0.5px',
                      }}
                    >
                      {item.label}
                    </span>
                    <svg
                      width="clamp(15px, 1.389vw, 20px)"
                      height="clamp(15px, 1.389vw, 20px)"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-70 group-hover/item:opacity-100 transition-all group-hover/item:translate-x-1 duration-300"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>



        {/* ── RIGHT: CONTACT US BUTTON ────────────────────────────────────
         * w:            150px → 10.417vw  floor 120px  ceil 150px
         * h:             52px →  3.611vw  floor  40px  ceil  52px
         * paddingH:      16px →  1.111vw  floor  12px  ceil  16px
         * borderRadius:  12px →  0.833vw  floor   8px  ceil  12px
         * fontSize:      16px →  1.111vw  floor  13px  ceil  16px
         * text height:   23px →  1.597vw  floor  18px  ceil  23px
         * icon w:        21px →  1.458vw  floor  16px  ceil  21px
         * icon h:        20px →  1.389vw  floor  16px  ceil  20px
         * icon marginL:   8px →  0.556vw  floor   6px  ceil   8px
         */}
        <button
          className="group flex items-center justify-between bg-white hover:bg-[#334454] transition-colors duration-300 overflow-hidden cursor-pointer border-none z-50"
          style={{
            width:        'clamp(120px, 10.417vw, 150px)',
            height:       'clamp(40px, 3.611vw, 52px)',
            paddingLeft:  'clamp(12px, 1.111vw, 16px)',
            paddingRight: 'clamp(12px, 1.111vw, 16px)',
            borderRadius: 'clamp(8px, 0.833vw, 12px)',
          }}
          onClick={() => { window.location.href = '/#contact'; }}
        >
          {/* Sliding text */}
          <div
            className="relative overflow-hidden"
            style={{ height: 'clamp(18px, 1.597vw, 23px)', flex: 1 }}
          >
            <div className="flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1/2">
              <span
                className="font-sans font-medium text-black whitespace-nowrap flex items-center"
                style={{
                  fontSize: 'clamp(13px, 1.111vw, 16px)',
                  height:   'clamp(18px, 1.597vw, 23px)',
                }}
              >
                Contact Us
              </span>
              <span
                className="font-sans font-medium text-white whitespace-nowrap flex items-center"
                style={{
                  fontSize: 'clamp(13px, 1.111vw, 16px)',
                  height:   'clamp(18px, 1.597vw, 23px)',
                }}
              >
                Contact Us
              </span>
            </div>
          </div>

          {/* Arrow icon wrapper */}
          <div
            className="relative overflow-hidden flex items-center justify-center shrink-0"
            style={{
              width:      'clamp(16px, 1.458vw, 21px)',
              height:     'clamp(16px, 1.389vw, 20px)',
              marginLeft: 'clamp(6px, 0.556vw, 8px)',
            }}
          >
            {/* Original arrow — flies out right on hover */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-full">
              <svg
                width="clamp(16px, 1.458vw, 21px)"
                height="clamp(16px, 1.389vw, 20px)"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            {/* Replacement arrow — comes in from left on hover */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] -translate-x-full group-hover:translate-x-0">
              <svg
                width="clamp(16px, 1.458vw, 21px)"
                height="clamp(16px, 1.389vw, 20px)"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>

      </div>
    </nav>

      {/* ── STICKY LOGO LAYER ─────────────────────────────────────────── */}
      <div
        className="mix-blend-difference pointer-events-none"
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: 0,
          zIndex: 51,
          marginTop: 'calc(-1 * clamp(56px, 5.833vw, 124px))',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 'clamp(56px, 5.833vw, 124px)',
          }}
        >
          <Link
            href="/"
            style={{
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              gap:            'clamp(4px, 0.417vw, 6px)',
              textDecoration: 'none',
              pointerEvents:  'auto',
            }}
          >
            <div
              style={{
                position: 'relative',
                width:    'clamp(26px, 2.361vw, 34px)',
                height:   'clamp(29px, 2.639vw, 38px)',
              }}
            >
              <Image
                src="/icons/logo (6).svg"
                alt="Chameri mark"
                fill
                sizes="40px"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div
              style={{
                position: 'relative',
                width:    'clamp(76px, 6.944vw, 100px)',
                height:   'clamp(10px, 0.903vw, 13px)',
              }}
            >
              <Image
                src="/icons/logo (7).svg"
                alt="CHAMERI"
                fill
                sizes="120px"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
