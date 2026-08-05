// 'use client';

// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import Image from 'next/image';

// const TESTIMONIALS = [
//   {
//     id: 1,
//     quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
//     name: 'Richard',
//     role: 'Entrepreneur',
//     img: '/dummyimages/Frame 2121454280.png',
//     avatar: 'https://i.pravatar.cc/80?img=11',
//   },
//   {
//     id: 2,
//     quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
//     name: 'Haruto & Aiko',
//     role: 'Tech Startup Founders',
//     img: '/dummyimages/Container.png',
//     avatar: 'https://i.pravatar.cc/80?img=14',
//   },
//   {
//     id: 3,
//     quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
//     name: 'Priya Menon',
//     role: 'Interior Designer',
//     img: '/dummyimages/Overlay.png',
//     avatar: 'https://i.pravatar.cc/80?img=47',
//   },
//   {
//     id: 4,
//     quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
//     name: 'James Keller',
//     role: 'Real Estate Investor',
//     img: '/dummyimages/Frame 2121454280.png',
//     avatar: 'https://i.pravatar.cc/80?img=52',
//   },
// ];

// /* ─── Breakpoint-aware card dimensions ──────────────────────────────────
//  * Base (3xl / 1440px): CARD_W=800  CARD_H=550  SIDE_H=467.5  GAP=20
//  * Multipliers:  lg=0.711  xl=0.889  3xl=1.0  2xl=1.067  4xl=1.333
//  */
// function useCardDimensions() {
//   const [dims, setDims] = useState({ cardW: 800, cardH: 550, sideH: 467.5, gap: 20 });

//   useEffect(() => {
//     const update = () => {
//       const w = window.innerWidth;
//       if (w >= 1920) {
//         setDims({ cardW: 1067, cardH: 733, sideH: 623, gap: 26.6 });
//       } else if (w >= 1536) {
//         setDims({ cardW: 854, cardH: 587, sideH: 499, gap: 21.3 });
//       } else if (w >= 1440) {
//         setDims({ cardW: 800, cardH: 550, sideH: 467.5, gap: 20 });
//       } else if (w >= 1280) {
//         setDims({ cardW: 711, cardH: 489, sideH: 415.5, gap: 17.8 });
//       } else if (w >= 1024) {
//         setDims({ cardW: 569, cardH: 391, sideH: 332.4, gap: 14.2 });
//       } else {
//         // mobile: fill most of viewport
//         setDims({ cardW: Math.min(w * 0.88, 560), cardH: 380, sideH: 323, gap: 12 });
//       }
//     };
//     update();
//     window.addEventListener('resize', update);
//     return () => window.removeEventListener('resize', update);
//   }, []);

//   return dims;
// }

// const TestimonialsSection = () => {
//   const total = TESTIMONIALS.length;
//   const [current, setCurrent]             = useState(total);
//   const [containerW, setContainerW]       = useState(1440);
//   const [transitionEnabled, setTransitionEnabled] = useState(true);
//   const wrapperRef = useRef(null);
//   const { cardW, cardH, sideH, gap } = useCardDimensions();

//   const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

//   useEffect(() => {
//     const measure = () => {
//       if (wrapperRef.current) setContainerW(wrapperRef.current.offsetWidth);
//     };
//     measure();
//     window.addEventListener('resize', measure);
//     return () => window.removeEventListener('resize', measure);
//   }, []);

//   const next = useCallback(() => setCurrent((c) => c + 1), []);
//   const prev = useCallback(() => setCurrent((c) => c - 1), []);

//   const handleTransitionEnd = useCallback(() => {
//     if (current >= total * 2) {
//       setTransitionEnabled(false);
//       setCurrent(current - total);
//     } else if (current < total) {
//       setTransitionEnabled(false);
//       setCurrent(current + total);
//     }
//   }, [current, total]);

//   useEffect(() => {
//     if (!transitionEnabled) {
//       const rafId = requestAnimationFrame(() => {
//         requestAnimationFrame(() => setTransitionEnabled(true));
//       });
//       return () => cancelAnimationFrame(rafId);
//     }
//   }, [transitionEnabled]);

//   const centerOffset = (containerW - cardW) / 2;
//   const trackX       = centerOffset - current * (cardW + gap);

//   // Arrow vertical position = center of card
//   const arrowTop = cardH / 2 - 20;

//   return (
//     <section className="w-full bg-[#EDE7DE] overflow-hidden">

//       {/* ══ 1st — Header ══════════════════════════════════════════════════ */}
//       <div className="
//         w-full mx-auto flex flex-col items-center text-center
//         px-[20px] pt-[40px] pb-[16px] gap-[8px]
//         md:px-[40px] md:pt-[50px] md:pb-[18px] md:gap-[9px]
//         lg:px-[56px] lg:pt-[42.6px] lg:pb-[17px] lg:gap-[7.1px]
//         xl:px-[71px] xl:pt-[53.3px] xl:pb-[21.3px] xl:gap-[8.9px]
//         3xl:px-[80px] 3xl:pt-[60px] 3xl:pb-[24px] 3xl:gap-[10px]
//         2xl:px-[85px] 2xl:pt-[64px] 2xl:pb-[25.6px] 2xl:gap-[10.6px]
//         4xl:px-[106px] 4xl:pt-[80px] 4xl:pb-[32px] 4xl:gap-[13.3px]
//         sm:max-w-[80%] md:max-w-[85%] lg:max-w-[90%] xl:max-w-[92%] 2xl:max-w-[94%] 3xl:max-w-[96%] 4xl:max-w-[98%]
//       ">
//         {/* Badge */}
//         <div className="
//           flex items-center
//           gap-[5.1px] lg:gap-[5.1px] xl:gap-[6.4px] 3xl:gap-[7.2px] 2xl:gap-[7.7px] 4xl:gap-[9.6px]
//         ">
//           <div className="
//             bg-[#334454] flex-shrink-0
//             w-[9.9px] h-[9.9px] rounded-[2px]
//             lg:w-[9.9px] lg:h-[9.9px]
//             xl:w-[12.4px] xl:h-[12.4px] xl:rounded-[2.5px]
//             3xl:w-[14px] 3xl:h-[14px] 3xl:rounded-[3px]
//             2xl:w-[14.9px] 2xl:h-[14.9px] 2xl:rounded-[3.2px]
//             4xl:w-[18.6px] 4xl:h-[18.6px] 4xl:rounded-[4px]
//           " />
//           <span className="
//             font-sans font-normal uppercase text-[#334454]
//             text-[11.5px] tracking-wider
//             lg:text-[11.5px]
//             xl:text-[12.4px]
//             3xl:text-[14px]
//             2xl:text-[14.9px]
//             4xl:text-[18.6px]
//           ">
//             Testimonials
//           </span>
//         </div>

//         {/* Main heading */}
//         <h2 className="
//           font-roundo font-medium capitalize text-[#1A1A1A] text-center
//           text-[32px] leading-[32px] tracking-[-0.6px] max-w-[340px]
//           md:text-[42px] md:leading-[42px] md:tracking-[-0.7px] md:max-w-[440px]
//           lg:text-[42.6px] lg:leading-[42.6px] lg:tracking-[-0.64px] lg:max-w-[432px]
//           xl:text-[53.3px] xl:leading-[53.3px] xl:tracking-[-0.8px] xl:max-w-[540px]
//           3xl:text-[60px] 3xl:leading-[60px] 3xl:tracking-[-0.9px] 3xl:max-w-[608px]
//           2xl:text-[64px] 2xl:leading-[64px] 2xl:tracking-[-0.96px] 2xl:max-w-[648px]
//           4xl:text-[80px] 4xl:leading-[80px] 4xl:tracking-[-1.2px] 4xl:max-w-[810px]
//         ">
//           What Our Clients Says
//         </h2>

//         {/* Sub-heading */}
//         <p className="
//           font-sans font-normal text-[#334454]/70 text-center
//           text-[14px] leading-[18.5px] tracking-[-0.3px] max-w-[320px]
//           md:text-[16px] md:leading-[21px] md:max-w-[400px]
//           lg:text-[14.2px] lg:leading-[18.7px] lg:tracking-[-0.31px] lg:max-w-[432px]
//           xl:text-[17.7px] xl:leading-[23.4px] xl:tracking-[-0.39px] xl:max-w-[540px]
//           3xl:text-[20px] 3xl:leading-[26.4px] 3xl:tracking-[-0.44px] 3xl:max-w-[608px]
//           2xl:text-[21.3px] 2xl:leading-[28.1px] 2xl:tracking-[-0.47px] 2xl:max-w-[648px]
//           4xl:text-[26.6px] 4xl:leading-[35.1px] 4xl:tracking-[-0.58px] 4xl:max-w-[810px]
//         ">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
//         </p>
//       </div>

//       {/* ══ 2nd — Carousel ════════════════════════════════════════════════ */}
//       <div
//         ref={wrapperRef}
//         className="relative overflow-hidden w-full"
//         style={{ height: `${cardH}px` }}
//       >
//         {/* Sliding track */}
//         <div
//           className="flex"
//           style={{
//             alignItems: 'center',
//             gap: `${gap}px`,
//             transform: `translateX(${trackX}px)`,
//             transition: transitionEnabled ? 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
//           }}
//           onTransitionEnd={handleTransitionEnd}
//         >
//           {extendedTestimonials.map((item, i) => {
//             const dist     = Math.abs(i - current);
//             const isCenter = dist === 0;
//             const opacity  = isCenter ? 1 : dist === 1 ? 0.6 : 0;
//             const curCardH = isCenter ? cardH : sideH;

//             // Scale inner content proportionally to cardW vs base 800
//             const scale = cardW / 800;

//             return (
//               <div
//                 key={i}
//                 className="relative flex-shrink-0 overflow-hidden"
//                 style={{
//                   width: `${cardW}px`,
//                   height: `${curCardH}px`,
//                   borderRadius: `${12 * scale}px`,
//                   opacity,
//                   transition: 'height 500ms cubic-bezier(0.4,0,0.2,1), opacity 500ms ease',
//                 }}
//               >
//                 <Image src={item.img} alt={item.name} fill className="object-cover" />

//                 {/* Bottom gradient */}
//                 <div
//                   className="absolute left-0 right-0 bottom-0"
//                   style={{
//                     height: `${214.02 * scale}px`,
//                     background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
//                   }}
//                 />

//                 {/* Content overlay */}
//                 <div
//                   className="absolute left-0"
//                   style={{ top: `${335.99 * scale}px`, height: `${214.02 * scale}px`, width: `${cardW}px` }}
//                 >
//                   {/* Quote */}
//                   <p
//                     className="absolute text-white"
//                     style={{
//                       top: `${51 * scale}px`,
//                       left: `${24 * scale}px`,
//                       width: `${725.76 * scale}px`,
//                       height: `${70.4 * scale}px`,
//                       fontFamily: 'var(--font-geist-sans), sans-serif',
//                       fontWeight: 500,
//                       fontSize: `${26.1 * scale}px`,
//                       lineHeight: `${36.4 * scale}px`,
//                       overflow: 'hidden',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical',
//                     }}
//                   >
//                     {item.quote}
//                   </p>

//                   {/* Profile */}
//                   <div
//                     className="absolute flex items-center"
//                     style={{
//                       top: `${142.81 * scale}px`,
//                       left: `${24 * scale}px`,
//                       width: `${752 * scale}px`,
//                       height: `${47.2 * scale}px`,
//                       gap: `${12 * scale}px`,
//                     }}
//                   >
//                     <div
//                       className="flex-shrink-0 overflow-hidden"
//                       style={{ width: `${45 * scale}px`, height: `${45 * scale}px`, borderRadius: `${5 * scale}px` }}
//                     >
//                       {/* eslint-disable-next-line @next/next/no-img-element */}
//                       <img src={item.avatar} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                     </div>
//                     <div>
//                       <p className="font-sans font-semibold text-white" style={{ fontSize: `${16 * scale}px`, lineHeight: '1.3' }}>{item.name}</p>
//                       <p className="font-sans text-white/70" style={{ fontSize: `${13 * scale}px` }}>{item.role}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Left arrow */}
//         <button
//           onClick={prev}
//           aria-label="Previous"
//           className="absolute z-20 flex items-center justify-center bg-[#334454] hover:bg-[#6B859E] transition-colors duration-300 border-none cursor-pointer"
//           style={{
//             width: `${40 * (cardW / 800)}px`,
//             height: `${40 * (cardW / 800)}px`,
//             borderRadius: `${7.11 * (cardW / 800)}px`,
//             top: `${arrowTop}px`,
//             left: `${centerOffset - 20 * (cardW / 800) - 20}px`,
//           }}
//         >
//           <svg
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="white"
//             strokeWidth="2.5"
//             style={{ width: `${18 * (cardW / 800)}px`, height: `${18 * (cardW / 800)}px` }}
//           >
//             <path d="M19 12H5M12 5l-7 7 7 7" />
//           </svg>
//         </button>

//         {/* Right arrow */}
//         <button
//           onClick={next}
//           aria-label="Next"
//           className="absolute z-20 flex items-center justify-center bg-[#334454] hover:bg-[#6B859E] transition-colors duration-300 border-none cursor-pointer"
//           style={{
//             width: `${40 * (cardW / 800)}px`,
//             height: `${40 * (cardW / 800)}px`,
//             borderRadius: `${7.11 * (cardW / 800)}px`,
//             top: `${arrowTop}px`,
//             left: `${centerOffset + cardW - 20 * (cardW / 800)}px`,
//           }}
//         >
//           <svg
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="white"
//             strokeWidth="2.5"
//             style={{ width: `${18 * (cardW / 800)}px`, height: `${18 * (cardW / 800)}px` }}
//           >
//             <path d="M5 12h14M12 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>

//       {/* ══ 3rd — Learn More button ═══════════════════════════════════════ */}
//       <div className="
//         w-full mx-auto flex justify-center
//         px-[20px] pt-[16px] pb-[40px]
//         md:px-[40px] md:pt-[18px] md:pb-[50px]
//         lg:px-[56px] lg:pt-[17px] lg:pb-[42.6px]
//         xl:px-[71px] xl:pt-[21.3px] xl:pb-[53.3px]
//         3xl:px-[80px] 3xl:pt-[24px] 3xl:pb-[60px]
//         2xl:px-[85px] 2xl:pt-[25.6px] 2xl:pb-[64px]
//         4xl:px-[106px] 4xl:pt-[32px] 4xl:pb-[80px]
//       ">
//         <button className="
//           group relative flex items-center bg-[#6B859E] hover:bg-[#4a6074] transition-colors duration-500 overflow-hidden cursor-pointer border-none
//           w-[118.6px] h-[36.9px] rounded-[8.5px]
//           lg:w-[118.6px] lg:h-[36.9px] lg:rounded-[8.5px]
//           xl:w-[148.2px] xl:h-[46.1px] xl:rounded-[10.6px]
//           3xl:w-[167px] 3xl:h-[52px] 3xl:rounded-[12px]
//           2xl:w-[177.9px] 2xl:h-[55.4px] 2xl:rounded-[12.8px]
//           4xl:w-[222.6px] 4xl:h-[69.3px] 4xl:rounded-[16px]
//         ">
//           {/* Sliding text */}
//           <div className="
//             absolute overflow-hidden
//             top-[9.9px] left-[8.5px] w-[69px] h-[16.3px]
//             lg:top-[9.9px] lg:left-[8.5px] lg:w-[69px] lg:h-[16.3px]
//             xl:top-[12.4px] xl:left-[10.7px] xl:w-[86px] xl:h-[20.4px]
//             3xl:top-[14px] 3xl:left-[12px] 3xl:w-[97px] 3xl:h-[23px]
//             2xl:top-[14.9px] 2xl:left-[12.8px] 2xl:w-[103px] 2xl:h-[24.5px]
//             4xl:top-[18.6px] 4xl:left-[16px] 4xl:w-[129px] 4xl:h-[30.6px]
//           ">
//             <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
//               <span className="
//                 font-sans font-medium text-white whitespace-nowrap flex items-center
//                 text-[10.6px] h-[16.3px]
//                 lg:text-[10.6px] lg:h-[16.3px]
//                 xl:text-[13.3px] xl:h-[20.4px]
//                 3xl:text-[15px] 3xl:h-[23px]
//                 2xl:text-[16px] 2xl:h-[24.5px]
//                 4xl:text-[20px] 4xl:h-[30.6px]
//               ">Learn More</span>
//               <span className="
//                 font-sans font-medium text-white whitespace-nowrap flex items-center
//                 text-[10.6px] h-[16.3px]
//                 lg:text-[10.6px] lg:h-[16.3px]
//                 xl:text-[13.3px] xl:h-[20.4px]
//                 3xl:text-[15px] 3xl:h-[23px]
//                 2xl:text-[16px] 2xl:h-[24.5px]
//                 4xl:text-[20px] 4xl:h-[30.6px]
//               ">Learn More</span>
//             </div>
//           </div>

//           {/* Arrow box */}
//           <div className="
//             absolute bg-white group-hover:bg-[#EDE7DE] transition-colors duration-500 overflow-hidden
//             right-[8.5px] w-[21.3px] h-[21.3px] rounded-[5px]
//             lg:right-[8.5px] lg:w-[21.3px] lg:h-[21.3px]
//             xl:right-[10.7px] xl:w-[26.6px] xl:h-[26.6px] xl:rounded-[6.2px]
//             3xl:right-[12px] 3xl:w-[30px] 3xl:h-[30px] 3xl:rounded-[7px]
//             2xl:right-[12.8px] 2xl:w-[32px] 2xl:h-[32px] 2xl:rounded-[7.4px]
//             4xl:right-[16px] 4xl:w-[40px] 4xl:h-[40px] 4xl:rounded-[9.3px]
//           ">
//             <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
//               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="
//                 text-[#6B859E] transition-colors duration-500
//                 w-[10px] h-[10px] lg:w-[10px] lg:h-[10px]
//                 xl:w-[12.5px] xl:h-[12.5px]
//                 3xl:w-[14px] 3xl:h-[14px]
//                 2xl:w-[15px] 2xl:h-[15px]
//                 4xl:w-[18.6px] 4xl:h-[18.6px]
//               ">
//                 <path d="M5 12h14M12 5l7 7-7 7" />
//               </svg>
//             </div>
//             <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
//               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="
//                 text-[#6B859E] transition-colors duration-500
//                 w-[10px] h-[10px] lg:w-[10px] lg:h-[10px]
//                 xl:w-[12.5px] xl:h-[12.5px]
//                 3xl:w-[14px] 3xl:h-[14px]
//                 2xl:w-[15px] 2xl:h-[15px]
//                 4xl:w-[18.6px] 4xl:h-[18.6px]
//               ">
//                 <path d="M5 12h14M12 5l7 7-7 7" />
//               </svg>
//             </div>
//           </div>
//         </button>
//       </div>

//     </section>
//   );
// };

// export default TestimonialsSection;


// --------------------------------------------------------

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

/*
 * ─── CLAMP REFERENCE ────────────────────────────────────────────────────────
 *
 *  Formula : preferred_vw = (MAX_px - MIN_px) / (1920 - 375) * 100
 *  Viewport range: 375px (mobile) → 1920px (4xl)
 *
 *  HEADER
 *  px                  : clamp(20px,   5.59vw, 106px)
 *  pt                  : clamp(40px,   2.59vw,  80px)
 *  pb                  : clamp(16px,   1.04vw,  32px)
 *  gap                 : clamp(7.1px,  0.4vw,  13.3px)
 *
 *  Badge dot size      : clamp(9.9px,  0.56vw, 18.6px)
 *  Badge dot radius    : clamp(2px,    0.13vw,   4px)
 *  Badge gap           : clamp(5.1px,  0.29vw,   9.6px)
 *  Badge font          : clamp(11.5px, 0.46vw,  18.6px)
 *
 *  Heading font        : clamp(32px,   3.1vw,   80px)
 *  Heading lead        : clamp(32px,   3.1vw,   80px)
 *  Heading tracking    : clamp(-0.6px,-0.039vw, -1.2px)
 *  Heading max-w       : clamp(340px, 30.4vw,  810px)
 *
 *  Para font           : clamp(14px,   0.81vw,  26.6px)
 *  Para lead           : clamp(18.5px, 1.08vw,  35.1px)
 *  Para tracking       : clamp(-0.3px,-0.018vw, -0.58px)
 *  Para max-w          : clamp(320px, 31.7vw,  810px)
 *
 *  CAROUSEL — card dims driven by useCardDimensions (JS/vw, not CSS clamp)
 *  because they also control JS layout math (trackX, arrowTop, etc.)
 *  We keep the hook but replace the magic-number breakpoints with
 *  a continuous vw formula so it scales smoothly too.
 *
 *  FOOTER BUTTON (Learn More CTA)
 *  pt                  : clamp(16px,   1.04vw,  32px)
 *  pb                  : clamp(40px,   2.59vw,  80px)
 *
 *  Btn width           : clamp(118.6px,6.7vw,  222.6px)
 *  Btn height          : clamp(36.9px, 2.1vw,   69.3px)
 *  Btn radius          : clamp(8.5px,  0.49vw,  16px)
 *
 *  Text top            : clamp(9.9px,  0.57vw,  18.6px)
 *  Text left           : clamp(8.5px,  0.49vw,  16px)
 *  Text width          : clamp(69px,   3.9vw,  129px)
 *  Text height         : clamp(16.3px, 0.92vw,  30.6px)
 *  Text font           : clamp(10.6px, 0.6vw,   20px)
 *
 *  Arrow right         : clamp(8.5px,  0.49vw,  16px)
 *  Arrow box size      : clamp(21.3px, 1.21vw,  40px)
 *  Arrow box radius    : clamp(5px,    0.28vw,   9.3px)
 *  Arrow svg size      : clamp(10px,   0.56vw,  18.6px)
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

const STATIC_TESTIMONIALS = [
  {
    id: 1,
    quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
    name: 'Richard',
    role: 'Entrepreneur',
    img: '/dummyimages/Frame 2121454280.png',
    avatar: 'https://i.pravatar.cc/80?img=11',
  },
  {
    id: 2,
    quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
    name: 'Haruto & Aiko',
    role: 'Tech Startup Founders',
    img: '/dummyimages/Container.png',
    avatar: 'https://i.pravatar.cc/80?img=14',
  },
  {
    id: 3,
    quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
    name: 'Priya Menon',
    role: 'Interior Designer',
    img: '/dummyimages/Overlay.png',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    id: 4,
    quote: '"Lorem amet dolo elit nisi urna erat odio enim duis cras nunc orci ante quis arcu vero pede just urna."',
    name: 'James Keller',
    role: 'Real Estate Investor',
    img: '/dummyimages/Frame 2121454280.png',
    avatar: 'https://i.pravatar.cc/80?img=52',
  },
];

/* ─── Fluid card dimensions via continuous vw formula ───────────────────
 *  Base (1440px / 3xl): cardW=800, cardH=550, sideH=467.5, gap=20
 *  Scaling: linear vw between mobile (375) and 4xl (1920)
 *    cardW : clamp(320, 51.8vw, 1067)  → resolves to px at runtime
 *    cardH : clamp(260, 35.5vw,  733)
 *    sideH : clamp(220, 30.2vw,  623)
 *    gap   : clamp(12,   0.95vw,  26.6)
 *  We still need JS values for track-offset math, so we read
 *  them from CSS custom properties via a tiny helper.
 * ────────────────────────────────────────────────────────────────────── */
function useCardDimensions() {
  const [dims, setDims] = useState({ cardW: 500, cardH: 550, sideH: 467.5, gap: 20, arrowScale: 1, cardRadius: 12 * (500 / 800), mobileScale: 1, isMobile: false });

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      // Mobile (< sm/640px) — Figma reference frame is 390px wide with a 310px-wide
      // card (40px side margins, so adjacent cards peek in by ~10.26% of viewport width
      // on each side). Scale continuously off that ratio instead of a fixed 310px, so
      // narrower phones (320px etc.) keep the same peek proportion instead of the card
      // filling the whole viewport edge-to-edge.
      if (vw < 640) {
        const peekRatio   = 40 / 390;
        const cardW       = vw * (1 - 2 * peekRatio);
        const cardH       = cardW * (473.6111145019531 / 310);
        const mobileScale = cardW / 310;
        setDims({
          cardW,
          cardH,
          sideH: cardH * (473.61 / 495), // preserve the same center-vs-side clip ratio as before
          gap: 12 * mobileScale,
          arrowScale: (34.12 / 40) * mobileScale,
          cardRadius: 10.33 * mobileScale,
          mobileScale,
          isMobile: true,
        });
        return;
      }
      // Continuous linear interpolation matching the clamp formula
      const lerp = (min, max) => Math.round(Math.min(max, Math.max(min, min + (max - min) * ((vw - 375) / (1920 - 375)))));
      const cardW = lerp(320, 1067);
      setDims({
        cardW,
        cardH: lerp(260, 733),
        sideH: lerp(220, 623),
        gap:   lerp(12,  27),
        arrowScale: cardW / 800,
        cardRadius: 12 * (cardW / 800),
        mobileScale: 1,
        isMobile: false,
      });
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return dims;
}

const TestimonialsSection = ({ testimonial }) => {
  const TESTIMONIALS = testimonial?.cards?.length
    ? testimonial.cards.map((c, i) => ({
        id: i + 1,
        quote: c.quote,
        name: c.name,
        role: c.designation,
        img: c.cardImage || STATIC_TESTIMONIALS[i % STATIC_TESTIMONIALS.length]?.img,
        avatar: c.image || STATIC_TESTIMONIALS[i % STATIC_TESTIMONIALS.length]?.avatar,
      }))
    : STATIC_TESTIMONIALS;

  const total = TESTIMONIALS.length;
  const [current, setCurrent]                     = useState(total);
  const [containerW, setContainerW]               = useState(1440);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const wrapperRef = useRef(null);
  const { cardW, cardH, sideH, gap, arrowScale, cardRadius, mobileScale, isMobile } = useCardDimensions();

  const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current) setContainerW(wrapperRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const next = useCallback(() => setCurrent((c) => c + 1), []);
  const prev = useCallback(() => setCurrent((c) => c - 1), []);

  const handleTransitionEnd = useCallback((e) => {
    // Only respond to the track's own transform transition, not bubbled clip-path/opacity events from child cards
    if (e.target !== e.currentTarget) return;
    if (current >= total * 2) {
      setTransitionEnabled(false);
      setCurrent(current - total);
    } else if (current < total) {
      setTransitionEnabled(false);
      setCurrent(current + total);
    }
  }, [current, total]);

  useEffect(() => {
    if (!transitionEnabled) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransitionEnabled(true))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [transitionEnabled]);

  const centerOffset = (containerW - cardW) / 2;
  const trackX       = centerOffset - current * (cardW + gap);
  const scale        = cardW / 800;
  const arrowTop     = cardH / 2 - 20 * arrowScale;

  // Arrows normally straddle the card edge (half outside), but on narrow viewports
  // there isn't room for that overhang — clamp so they stay fully on-screen instead of clipping.
  const arrowSize      = 40 * arrowScale;
  const leftArrowLeft  = Math.max(4, centerOffset - 20 * arrowScale);
  const rightArrowLeft = Math.min(containerW - arrowSize - 4, centerOffset + cardW - 20 * arrowScale);

  return (
    <section 
      className="w-full bg-[#EDE7DE] overflow-hidden flex flex-col mx-auto items-center"
      style={{
        paddingTop:    'clamp(40px, 4.17vw, 60px)',
        paddingBottom: 'clamp(40px, 4.17vw, 60px)',
        gap:           'clamp(16px, 1.67vw, 24px)',
      }}
    >
      {/* ══ 1 — Header ════════════════════════════════════════════════════ */}
      <div
        className="w-full mx-auto flex flex-col items-center text-center"
        style={{
          width: 'clamp(390px, 90.28vw, 1300px)',
          gap:   'clamp(10px, 1.11vw, 16px)',
        }}
      >
        <div
          className="flex flex-col items-center justify-center"
          style={{ width: 'clamp(108px, 11.11vw, 158px)', gap: 'clamp(6px, 0.69vw, 10px)' }}
        >
          {/* Badge */}
        <div
          className="flex items-center rounded-[90px] self-start"
          style={{
            paddingLeft:   'clamp(5px, 0.5vw, 7.2px)',
            paddingRight:  'clamp(5px, 0.5vw, 7.2px)',
            paddingTop:    'clamp(3.5px, 0.38vw, 5.4px)',
            paddingBottom: 'clamp(3.5px, 0.38vw, 5.4px)',
            gap:           'clamp(5px, 0.5vw, 7.2px)',
          }}
        >
          <div
            className="bg-[#334454] flex-shrink-0"
            style={{
              width:        'clamp(10px, 0.97vw, 18.6px)',
              height:       'clamp(10px, 0.97vw, 18.6px)',
              borderRadius: 'clamp(2px, 0.21vw, 4px)',
            }}
          />
          {/* Figma @1440: Geist 400, 16.2px / 19.44px, ls -0.32px, uppercase.
              vw = DESIGN_PX / 1440 × 100 → 1.125vw / 1.35vw. */}
          <span
            className="font-sans font-normal uppercase text-[#000000] flex items-center justify-center"
            style={{
              fontSize:      'clamp(12px, 1.125vw, 16.2px)',
              lineHeight:    'clamp(14px, 1.35vw, 19.44px)',
              letterSpacing: '-0.32px',
            }}
          >
            TESTIMONIALS
          </span>
        </div>

          {/* Heading */}
          <h2
            className="font-roundo font-medium capitalize text-[#1A1A1A] text-center m-0 flex items-center justify-center"
            style={{
              fontSize:      'clamp(32px, 4.17vw, 66px)',
              lineHeight:    'clamp(36.6px, 4.17vw, 60px)',
              letterSpacing: 'clamp(-0.73px, -0.06vw, -0.9px)',
              width:         'clamp(358px, 42.22vw, 648px)',
              height:        'clamp(37px, 4.17vw, 60px)'
            }}
          >
            What Our Clients Say
          </h2>

          {/* Sub-heading */}
          <p
            className="font-sans font-normal text-[#1C1C1C]/70 text-center m-0 flex items-center justify-center"
            style={{
              fontSize:      'clamp(14px, 1.39vw, 20px)',
              lineHeight:    'clamp(21px, 1.83vw, 26.4px)',
              letterSpacing: 'clamp(0px, -0.03vw, -0.44px)',
              width:         'clamp(286px, 42.22vw, 608px)',
              height:        'clamp(42px, 3.68vw, 53px)'
            }}
          >
            Explore crafted villa spaces with modern comfort built beautifully
          </p>
        </div>
      </div>

      {/* ══ 2 — Carousel ══════════════════════════════════════════════════ */}
      <div
        ref={wrapperRef}
        className="relative overflow-hidden w-full"
        style={{
          height: `${cardH}px`,
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          maskImage:       'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        {/* Sliding track */}
        <div
          className="flex"
          style={{
            alignItems: 'center',
            gap: `${gap}px`,
            transform: `translateX(${trackX}px)`,
            transition: transitionEnabled ? 'transform 900ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedTestimonials.map((item, i) => {
            const dist     = Math.abs(i - current);
            const isCenter = dist === 0;
            const opacity  = isCenter ? 1 : dist === 1 ? 0.6 : 0;
            // clip top & bottom equally so the card appears shorter without moving in the layout
            const clipPct  = isCenter ? 0 : ((1 - sideH / cardH) / 2) * 100;
            const r        = cardRadius.toFixed(2);
            // the gradient/quote/profile overlay is anchored to the card's true (unclipped) bottom edge,
            // so it has to shift up by the same amount trimmed off the bottom or it gets clipped away
            const bottomTrimPx = (clipPct / 100) * cardH;

            return (
              <div
                key={i}
                className="relative flex-shrink-0 overflow-hidden"
                style={{
                  width:      `${cardW}px`,
                  height:     `${cardH}px`,
                  clipPath:   `inset(${clipPct.toFixed(2)}% 0 ${clipPct.toFixed(2)}% 0 round ${r}px)`,
                  opacity,
                  transition: transitionEnabled ? 'clip-path 900ms cubic-bezier(0.4,0,0.2,1), opacity 900ms ease' : 'none',
                }}
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover"
                  style={{
                    transform:  isCenter ? 'scale(1)' : 'scale(1.1)',
                    transition: transitionEnabled
                      ? 'transform 900ms cubic-bezier(0.4,0,0.2,1)'
                      : 'none',
                  }}
                />

                {isMobile ? (
                  /* Bottom gradient + text block — sized to fit the full quote, however many lines it wraps to */
                  <div
                    className="absolute left-0 right-0 bottom-0 flex flex-col"
                    style={{
                      padding:    `${20.68 * mobileScale}px ${12.05 * mobileScale}px ${16 * mobileScale}px`,
                      gap:        `${10 * mobileScale}px`,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.75) 55%, transparent 100%)',
                      transform:  `translateY(-${bottomTrimPx}px)`,
                      transition: transitionEnabled ? 'transform 900ms cubic-bezier(0.4,0,0.2,1)' : 'none',
                    }}
                  >
                    <p
                      className="text-white m-0"
                      style={{
                        fontFamily:    'var(--font-geist-sans), sans-serif',
                        fontWeight:    500,
                        fontSize:      `${18.94 * mobileScale}px`,
                        lineHeight:    `${22.73 * mobileScale}px`,
                        letterSpacing: '0%',
                      }}
                    >
                      {item.quote}
                    </p>
                    <div className="flex items-center" style={{ gap: `${10 * mobileScale}px` }}>
                      <div className="flex-shrink-0 overflow-hidden" style={{ width: `${34 * mobileScale}px`, height: `${34 * mobileScale}px`, borderRadius: `${4 * mobileScale}px` }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.avatar}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div>
                        <p className="font-sans text-white m-0" style={{ fontWeight: 400, fontSize: `${15.84 * mobileScale}px`, lineHeight: `${24.11 * mobileScale}px`, letterSpacing: '0%' }}>
                          {item.name}
                        </p>
                        <p className="font-sans text-white/70 m-0" style={{ fontWeight: 500, fontSize: `${11.19 * mobileScale}px`, lineHeight: `${16.53 * mobileScale}px`, letterSpacing: '0%' }}>
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Bottom gradient */}
                    <div
                      className="absolute left-0 right-0 bottom-0"
                      style={{
                        height: `${214.02 * scale}px`,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
                        transform: `translateY(-${bottomTrimPx}px)`,
                        transition: transitionEnabled ? 'transform 900ms cubic-bezier(0.4,0,0.2,1)' : 'none',
                      }}
                    />

                    {/* Content overlay */}
                    <div
                      className="absolute left-0"
                      style={{
                        top:    `${335.99 * scale}px`,
                        height: `${214.02 * scale}px`,
                        width:  `${cardW}px`,
                        transform: `translateY(-${bottomTrimPx}px)`,
                        transition: transitionEnabled ? 'transform 900ms cubic-bezier(0.4,0,0.2,1)' : 'none',
                      }}
                    >
                      {/* Quote */}
                      <p
                        className="absolute text-white"
                        style={{
                          top:              `${51 * scale}px`,
                          left:             `${24 * scale}px`,
                          width:            `${725.76 * scale}px`,
                          height:           `${70.4 * scale}px`,
                          fontFamily:       'var(--font-geist-sans), sans-serif',
                          fontWeight:       500,
                          fontSize:         `${26.1 * scale}px`,
                          lineHeight:       `${36.4 * scale}px`,
                          overflow:         'hidden',
                          display:          '-webkit-box',
                          WebkitLineClamp:  2,
                          WebkitBoxOrient:  'vertical',
                        }}
                      >
                        {item.quote}
                      </p>

                      {/* Profile */}
                      <div
                        className="absolute flex items-center"
                        style={{
                          top:    `${142.81 * scale}px`,
                          left:   `${24 * scale}px`,
                          width:  `${752 * scale}px`,
                          height: `${47.2 * scale}px`,
                          gap:    `${12 * scale}px`,
                        }}
                      >
                        <div
                          className="flex-shrink-0 overflow-hidden"
                          style={{
                            width:        `${45 * scale}px`,
                            height:       `${45 * scale}px`,
                            borderRadius: `${5 * scale}px`,
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.avatar}
                            alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <p
                            className="font-sans text-white m-0"
                            style={{ fontWeight: 600, fontSize: `${16 * scale}px`, lineHeight: '1.3' }}
                          >
                            {item.name}
                          </p>
                          <p
                            className="font-sans text-white/70 m-0"
                            style={{ fontSize: `${13 * scale}px` }}
                          >
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Left Arrow ─────────────────────────────────────────────────── */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute z-20 flex items-center justify-center bg-[#334454] hover:bg-[#6B859E] transition-colors duration-300 border-none cursor-pointer"
          style={{
            width:        `${40 * arrowScale}px`,
            height:       `${40 * arrowScale}px`,
            borderRadius: `${7.11 * arrowScale}px`,
            top:          `${arrowTop}px`,
            left:         `${leftArrowLeft}px`,
          }}
        >
          <svg
            viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
            style={{ width: `${18 * arrowScale}px`, height: `${18 * arrowScale}px` }}
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* ── Right Arrow ────────────────────────────────────────────────── */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute z-20 flex items-center justify-center bg-[#334454] hover:bg-[#6B859E] transition-colors duration-300 border-none cursor-pointer"
          style={{
            width:        `${40 * arrowScale}px`,
            height:       `${40 * arrowScale}px`,
            borderRadius: `${7.11 * arrowScale}px`,
            top:          `${arrowTop}px`,
            left:         `${rightArrowLeft}px`,
          }}
        >
          <svg
            viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
            style={{ width: `${18 * arrowScale}px`, height: `${18 * arrowScale}px` }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ══ 3 — Learn More ════════════════════════════════════════════════
          Same button as AboutTestimonialSection / VillaPlans / TeamSection.
          At the 1440 baseline the clamps resolve to the Figma spec exactly:
          11.6vw → 167px wide, 3.61vw → 52px tall, 0.83vw → 12px radius.
          The row is the header's 1300px width (90.28vw @1440); its height is
          intrinsic so the button can keep growing past 52px on wider screens
          (3.61vw → 69.3px at 1920) without being clipped. */}
      <div
        className="flex justify-center items-center"
        style={{ width: 'clamp(390px, 90.28vw, 1300px)' }}
      >
        <button
          className="group relative flex items-center border-none cursor-pointer overflow-hidden transition-colors duration-500 bg-[#6B859E] hover:bg-[#4a6074]"
          style={{
            width:        'clamp(118.6px, 11.6vw, 222.6px)',
            height:       'clamp(36.9px, 3.61vw, 69.3px)',
            borderRadius: 'clamp(8.5px, 0.83vw, 16px)',
          }}
        >
          {/* Sliding text — centred via top:50% rather than a fixed top
                    offset: the offset only centred at the ~52px height and left
                    the label riding high once the button grew at 1920. */}
                <div
                  className="absolute overflow-hidden"
                  style={{
                    top:       '50%',
                    transform: 'translateY(-50%)',
                    left:      'clamp(10px, 1.83vw, 22px)',
                    height:    'clamp(16.3px, 1.6vw, 30.6px)',
                  }}
                >
                  <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
                    {['Learn More', 'Learn More'].map((label, i) => (
                      <span
                        key={i}
                        className="font-sans font-medium text-[#EDE7DE] whitespace-nowrap flex items-center"
                        style={{
                          height:   'clamp(16.3px, 1.6vw, 30.6px)',
                          fontSize: 'clamp(13px, 1.04vw, 20px)',
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
                    right:        'clamp(8px, 0.83vw, 16px)',
                    width:        'clamp(22px, 2.08vw, 40px)',
                    height:       'clamp(22px, 2.08vw, 40px)',
                    borderRadius: 'clamp(5px, 0.49vw, 9.3px)',
                    top:          '50%',
                    transform:    'translateY(-50%)',
                  }}
                >
                  {/* Arrow slide out */}
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
                    <svg
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className="text-[#000000]"
                      style={{ width: 'clamp(15px, 1.39vw, 26.6px)', height: 'clamp(15px, 1.39vw, 26.6px)' }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  {/* Arrow slide in */}
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
                    <svg
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className="text-[#000000]"
                      style={{ width: 'clamp(15px, 1.39vw, 26.6px)', height: 'clamp(15px, 1.39vw, 26.6px)' }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
        </button>
      </div>

    </section>
  );
};

export default TestimonialsSection;
