// 'use client';

// import React from 'react';

// /**
//  * AboutFounderNote
//  * Design baseline : 1440px Figma canvas
//  * Fluid range     : 375px → 1920px
//  * Formula         : fluid_vw = (value_at_1440 / 1440) * 100
//  *                   MAX      = value_at_1440 * (1920 / 1440)
//  */
// export default function AboutFounderNote() {
//   return (
//     <section
//       style={{
//         width: '100%',
//         backgroundColor: '#EDE7DE',
//         /* border-top: 1px solid #21232533 */
//         borderTop: '1px solid rgba(33, 35, 37, 0.2)',
//       }}
//     >
//       <div
//         style={{
//           width: '100%',
//           maxWidth: '1920px',
//           margin: '0 auto',
//           boxSizing: 'border-box',
//           /* 34px @ 1440 → 34/1440*100 = 2.36vw */
//           paddingTop: 'clamp(40px, 4vw, 80px)',
//           /* Replaced the massive 453px bottom padding with a normal section padding */
//           paddingBottom: 'clamp(60px, 6vw, 120px)',
//           /* 80px @ 1440 → 80/1440*100 = 5.56vw */
//           paddingLeft: 'clamp(20px, 5.56vw, 107px)',
//           paddingRight: 'clamp(20px, 5.56vw, 107px)',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 'clamp(24px, 4vw, 60px)',
//         }}
//       >
//         {/* ── Top Row: Pill ────────────────────────────────────────── */}
//         <div
//           style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: 'clamp(4px, 0.5vw, 7.2px)',
//             /* 154.6px width from design mapped to auto width with padding */
//             paddingLeft: '7.2px',
//             paddingRight: '7.2px',
//             borderRadius: '90px',
//             alignSelf: 'flex-start',
//             /* top: -1px logic can be achieved via slight negative margin if necessary */
//             marginTop: '-1px',
//           }}
//         >
//           {/* Square Icon */}
//           <div
//             style={{
//               width: '14px',
//               height: '14px',
//               borderRadius: '3px',
//               backgroundColor: '#334454',
//               flexShrink: 0,
//             }}
//           />
//           {/* Text "founder note" */}
//           <span
//             style={{
//               fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
//               fontWeight: 400,
//               /* 16.2px @ 1440 → 1.125vw */
//               fontSize: 'clamp(12px, 1.125vw, 21px)',
//               lineHeight: '19.44px',
//               letterSpacing: '-0.32px',
//               textTransform: 'uppercase',
//               color: '#1A1A1A',
//             }}
//           >
//             founder note
//           </span>
//         </div>

//         {/* ── Bottom Row: Content ──────────────────────────────────── */}
//         <div
//           style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             /* Gap between image and text block ≈ 74px @ 1440 → 5.14vw */
//             gap: 'clamp(32px, 5.14vw, 98px)',
//             alignItems: 'flex-start',
//             width: '100%',
//           }}
//         >
//           {/* Image Container */}
//           <div
//             style={{
//               flexShrink: 0,
//               /* 251px @ 1440 → 17.43vw */
//               width: 'clamp(140px, 17.43vw, 334px)',
//               aspectRatio: '251 / 330', // Maintain original aspect ratio
//               borderRadius: '6.73px',
//               overflow: 'hidden',
//               backgroundColor: '#D1CDCA', // Fallback color
//             }}
//           >
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img
//               src="/images/Frame 2121454441.svg"
//               alt="Founder"
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//               }}
//               onError={(e) => {
//                 e.currentTarget.style.display = 'none'; // Hide if missing
//               }}
//             />
//           </div>

//           {/* Text Content (Quote + Details) */}
//           <div
//             style={{
//               flex: '1 1 min(100%, 886px)',
//               display: 'flex',
//               flexDirection: 'column',
//               position: 'relative',
//             }}
//           >
//             {/* Quote SVG */}
//             <svg
//               width="25"
//               height="18"
//               viewBox="0 0 25 18"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               style={{
//                 marginBottom: 'clamp(12px, 1.5vw, 24px)',
//                 width: 'clamp(18px, 1.68vw, 32px)',
//                 height: 'auto',
//                 flexShrink: 0,
//               }}
//             >
//               <path
//                 d="M10.8242 0H6.01221C2.7041 0 0.5 2.50391 0.5 6.46875C0.5 12.3789 3.86182 17.0703 10.373 17.9297V13.8047C6.88379 13.0625 5.23438 10.5977 5.23438 7.375H10.8242V0ZM24.6211 0H19.8091C16.501 0 14.2969 2.50391 14.2969 6.46875C14.2969 12.3789 17.6587 17.0703 24.1699 17.9297V13.8047C20.6807 13.0625 19.0312 10.5977 19.0312 7.375H24.6211V0Z"
//                 fill="#1A1A1A"
//               />
//             </svg>

//             {/* Main Quote Text */}
//             <p
//               style={{
//                 fontFamily: "var(--font-roundo, 'Roundo'), system-ui, sans-serif",
//                 fontWeight: 500,
//                 /* 40px @ 1440 → 2.78vw */
//                 fontSize: 'clamp(24px, 2.78vw, 53px)',
//                 lineHeight: '100%',
//                 letterSpacing: '-2px',
//                 color: '#1A1A1A',
//                 margin: 0,
//                 /* Distance to author name: 63px @ 1440 → 4.37vw */
//                 marginBottom: 'clamp(32px, 4.37vw, 84px)',
//                 maxWidth: 'clamp(300px, 58.8vw, 1200px)', // ~847px @ 1440
//               }}
//             >
//               Unrivaled customer service, cutting edge design and quality. Fluid
//               Glass is firmly lodged in our list of prefer suppliers of glazing
//               products. cutting edge design and quality. Fluid Glass is firmly
//               lodged in our list of prefer suppliers of glazing products.
//             </p>

//             {/* Author details */}
//             <div
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '4.5px', // padding-top 4.5px in prompt
//               }}
//             >
//               <h3
//                 style={{
//                   fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
//                   fontWeight: 400,
//                   /* 19.9px @ 1440 → 1.38vw */
//                   fontSize: 'clamp(16px, 1.38vw, 26px)',
//                   lineHeight: '25.92px',
//                   color: '#1A1A1A',
//                   margin: 0,
//                 }}
//               >
//                 Vaidas Vileikis
//               </h3>
//               <span
//                 style={{
//                   fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
//                   fontWeight: 500,
//                   /* 10.8px @ 1440 → 0.75vw */
//                   fontSize: 'clamp(10px, 0.75vw, 14px)',
//                   lineHeight: '14px',
//                   letterSpacing: '0.86px',
//                   textTransform: 'uppercase',
//                   color: '#1A1A1A',
//                   opacity: 0.5,
//                 }}
//               >
//                 Founder, Name Architects
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// ---------------------------------------
'use client';

import React from 'react';

/**
 * AboutFounderNote
 * Design baseline : 1440px Figma canvas
 * Fluid range     : 375px → 1920px
 * Formula         : fluid_vw  = (value_at_1440 / 1440) * 100
 *                   clamp_min = value_at_1440 * (375  / 1440)   ← ~0.26×
 *                   clamp_max = value_at_1440 * (1920 / 1440)   ← ~1.33×
 *
 * Every numeric spacing / sizing value below is derived from this formula.
 */
export default function AboutFounderNote({ founder }) {
  return (
    <>
      {/* ── Mobile (iPhone 13/14-sized screens) — static stacked layout ── */}
      <section
        className="block md:hidden"
        style={{
          width: '100%',
          backgroundColor: '#EDE7DE',
          borderTop: '1px solid rgba(33, 35, 37, 0.2)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 24,
            paddingRight: 18,
            paddingBottom: 40,
            paddingLeft: 18,
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7.2px',
                height: 20,
                padding: '0 7.2px',
                width: 'fit-content',
                borderRadius: 90,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '2px',
                  backgroundColor: '#334454',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '12px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#1A1A1A',
                  whiteSpace: 'nowrap',
                }}
              >
                founder note
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 27 }}>
              {/* Founder image */}
              <div
                style={{
                  width: '100%',
                  maxWidth: 'clamp(385px, 42vw, 800px)',
                  height: 'clamp(394px, 42vw, 800px)',
                  borderRadius: '6.73px',
                  overflow: 'hidden',
                  backgroundColor: '#D1CDCA',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={founder?.image || "/dummyimages/8276099377b328194b10337a1dc6e4999a4103d5.png"}
                  alt="Founder"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Quote + author */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <svg
                  width="clamp(18px, 1.68vw, 32px)"
                  height="clamp(14px, 1.30vw, 24px)"
                  viewBox="0 0 25 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M10.8242 0H6.01221C2.7041 0 0.5 2.50391 0.5 6.46875C0.5 12.3789 3.86182 17.0703 10.373 17.9297V13.8047C6.88379 13.0625 5.23438 10.5977 5.23438 7.375H10.8242V0ZM24.6211 0H19.8091C16.501 0 14.2969 2.50391 14.2969 6.46875C14.2969 12.3789 17.6587 17.0703 24.1699 17.9297V13.8047C20.6807 13.0625 19.0312 10.5977 19.0312 7.375H24.6211V0Z"
                    fill="#1A1A1A"
                  />
                </svg>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
                  <p
                    style={{
                      width: '100%',
                      fontFamily: "var(--font-roundo, 'Roundo'), system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: '32px',
                      lineHeight: '33.28px',
                      letterSpacing: '-0.67px',
                      color: '#1A1A1A',
                      margin: 0,
                    }}
                  >
                    {founder?.quote || "Unrivaled customer service, cutting edge design and quality. Fluid Glass is firmly lodged in our list of prefer suppliers of glazing products."}
                  </p>

                  <div style={{ width: '181.42px', maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
                        fontWeight: 400,
                        fontSize: '19px',
                        lineHeight: '26px',
                        color: '#1A1A1A',
                        margin: 0,
                      }}
                    >
                      {founder?.name || 'Vaidas Vileikis'}
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
                        fontWeight: 500,
                        fontSize: '11px',
                        lineHeight: '14px',
                        letterSpacing: '0.86px',
                        textTransform: 'uppercase',
                        color: '#1A1A1A',
                        opacity: 0.5,
                        paddingTop: '4.5px',
                      }}
                    >
                      {founder?.role || 'Founder'}{founder?.architectsName ? `, ${founder.architectsName}` : ', Name Architects'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Desktop — existing fluid layout ── */}
      <section
        className="hidden md:block"
        style={{
          width: '100%',
          backgroundColor: '#EDE7DE',
          borderTop: '1px solid rgba(33, 35, 37, 0.2)',
        }}
      >
      {/* ── Outer wrapper ─────────────────────────────────────────── */}
      <div
        style={{
          width: '100%',
          maxWidth: '1920px',
          margin: '0 auto',
          boxSizing: 'border-box',

          /* Vertical padding
             top    : 34px  @ 1440 → 34/1440*100 = 2.36vw  | min 9px  | max 45px  */
          paddingTop:    'clamp(9px,  2.36vw, 45px)',
          /* bottom : 80px  @ 1440 → 5.56vw                | min 21px | max 107px */
          paddingBottom: 'clamp(21px, 5.56vw, 107px)',

          /* Horizontal padding
             80px @ 1440 → 5.56vw                           | min 20px | max 107px */
          paddingLeft:  'clamp(20px, 5.56vw, 107px)',
          paddingRight: 'clamp(20px, 5.56vw, 107px)',

          display: 'flex',
          flexDirection: 'column',

          /* Gap between pill row and content row
             40px @ 1440 → 2.78vw                           | min 10px | max 53px */
          gap: 'clamp(10px, 2.78vw, 53px)',
        }}
      >

        {/* ── Pill ──────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            alignSelf: 'flex-start',
            marginTop: '-1px',

            /* Pill gap: 7px @ 1440 → 0.49vw               | min 4px  | max 9px  */
            gap: 'clamp(4px, 0.49vw, 9px)',

            /* Pill horizontal padding: 7.2px @ 1440 → 0.5vw | min 4px | max 10px */
            paddingLeft:  'clamp(4px, 0.5vw, 10px)',
            paddingRight: 'clamp(4px, 0.5vw, 10px)',

            borderRadius: '90px',
          }}
        >
          {/* Icon square
              14px @ 1440 → 0.97vw                          | min 4px  | max 19px */}
          <div
            style={{
              width:  'clamp(4px, 0.97vw, 19px)',
              height: 'clamp(4px, 0.97vw, 19px)',
              borderRadius: 'clamp(2px, 0.21vw, 4px)',
              backgroundColor: '#334454',
              flexShrink: 0,
            }}
          />

          {/* "founder note" label
              16.2px @ 1440 → 1.125vw                       | min 11px | max 22px */}
          <span
            style={{
              fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
              fontWeight: 400,
              fontSize:      'clamp(11px, 1.125vw, 22px)',
              lineHeight:    1.2,
              letterSpacing: '-0.32px',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              whiteSpace: 'nowrap',
            }}
          >
            founder note
          </span>
        </div>

        {/* ── Content row ───────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',

            /* Gap between image and text block
               74px @ 1440 → 5.14vw                         | min 20px | max 99px */
            gap: 'clamp(20px, 5.14vw, 99px)',

            alignItems: 'stretch',
            width: '100%',
          }}
        >

          {/* ── Founder image ───────────────────────────────────────── */}
          <div
            style={{
              flexShrink: 0,

              /* Width: 251px @ 1440 → 17.43vw              | min 66px | max 334px */
              width: 'clamp(66px, 17.43vw, 334px)',
              marginLeft: 'clamp(20px, 1vw, 30px)',

              borderRadius: 'clamp(3px, 0.47vw, 9px)',
              overflow: 'hidden',
              backgroundColor: '#D1CDCA',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={founder?.image || "/dummyimages/8276099377b328194b10337a1dc6e4999a4103d5.png"}
              alt="Founder"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* ── Text block ──────────────────────────────────────────── */}
          <div
            style={{
              flex: '1 1 clamp(240px, 40vw, 886px)',
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
            }}
          >

             {/* Quote SVG placed inline with text */}
              <svg
                viewBox="0 0 25 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width:  'clamp(14px, 1.74vw, 33px)',
                  height: 'auto',
                  marginLeft: '-40px',
                  flexShrink: 0,
                  display: 'inline-block',
                  // marginLeft: 'clamp(-2px, -0.5vw, 2px)',
                  /* 12px right margin @ 1440 → 0.83vw */
                  // marginRight: 'clamp(6px, 0.83vw, 20px)',
                  /* Slight vertical adjustment to align with text cap height */
                  verticalAlign: 'baseline',
                  position: 'relative',
                  // top: 'clamp(-2px, -0.2vw, -4px)',
                  marginBottom: 'clamp(-30px, 2.375vw, -25px)',
                }}
              >
                <path
                  d="M10.8242 0H6.01221C2.7041 0 0.5 2.50391 0.5 6.46875C0.5 12.3789 3.86182 17.0703 10.373 17.9297V13.8047C6.88379 13.0625 5.23438 10.5977 5.23438 7.375H10.8242V0ZM24.6211 0H19.8091C16.501 0 14.2969 2.50391 14.2969 6.46875C14.2969 12.3789 17.6587 17.0703 24.1699 17.9297V13.8047C20.6807 13.0625 19.0312 10.5977 19.0312 7.375H24.6211V0Z"
                  fill="#1A1A1A"
                />
              </svg>
            {/* Quote text + SVG
                40px @ 1440 → 2.78vw                        | min 20px | max 53px */}
            <p
              style={{
                fontFamily: "var(--font-roundo, 'Roundo'), system-ui, sans-serif",
                fontWeight: 500,
                fontSize:      'clamp(20px, 2.78vw, 53px)',
                lineHeight:    1.1,
                /* Fix clamp min/max order for negative values */
                letterSpacing: 'clamp(-2px, -0.14vw, -0.8px)',
                color: '#1A1A1A',
                margin: 0,

                /* Bottom margin: 63px @ 1440 → 4.375vw     | min 24px | max 84px */
                marginBottom: 'clamp(24px, 4.375vw, 70px)',

                /* Max width: 847px @ 1440 → 58.8vw         | min 240px | max 1128px */
                maxWidth: 'clamp(240px, 64.8vw, 1158px)',
              }}
            >
              {founder?.quote || "Unrivaled customer service, cutting edge design and quality. Fluid Glass is firmly lodged in our list of prefer suppliers of glazing products."}
            </p>

            {/* Author block */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',

                /* Gap: 4.5px @ 1440 → 0.31vw               | min 3px  | max 6px  */
                gap: 'clamp(3px, 0.31vw, 6px)',
              }}
            >
              {/* Author name
                  19.9px @ 1440 → 1.38vw                    | min 13px | max 27px */}
              <h3
                style={{
                  fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize:   'clamp(13px, 1.38vw, 27px)',
                  lineHeight: 1.3,
                  color: '#1A1A1A',
                  margin: 0,
                }}
              >
                {founder?.name || 'Vaidas Vileikis'}
              </h3>

              {/* Author title
                  10.8px @ 1440 → 0.75vw                    | min 9px  | max 14px */}
              <span
                style={{
                  fontFamily:    "var(--font-geist, 'Geist'), system-ui, sans-serif",
                  fontWeight:    500,
                  fontSize:      'clamp(9px, 0.75vw, 14px)',
                  lineHeight:    1.3,
                  letterSpacing: 'clamp(0.5px, 0.06vw, 0.86px)',
                  textTransform: 'uppercase',
                  color: '#1A1A1A',
                  opacity: 0.5,
                }}
              >
                {founder?.role || 'Founder'}{founder?.architectsName ? `, ${founder.architectsName}` : ', Name Architects'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
