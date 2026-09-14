// 'use client';

// import React from 'react';
// import Image from 'next/image';

// /* ─── Gallery data ───────────────────────────────────────────────────── */
// const VILLAS = [
//   { id: 1, name: 'VILLA 01', location: 'Calicut , Kerala', year: '2024', img: '/dummyimages/Frame 2121454280.webp', alt: '/dummyimages/Container.png' },
//   { id: 2, name: 'Villa 1', location: 'Calicut, Kerala', year: '2025', img: '/dummyimages/Container.png', alt: '/dummyimages/Frame 2121454280.webp' },
//   { id: 5, name: 'Villa No5', location: 'Lorum Ipsum sit', year: '2025', img: '/dummyimages/Overlay.webp', alt: '/dummyimages/Frame 2121454280.webp' },
//   { id: 6, name: 'Villa No6', location: 'Lorum Ipsum sit consit', year: '2024', img: '/dummyimages/Frame 2121454280.webp', alt: '/dummyimages/Overlay.webp' },
//   { id: 7, name: 'Villa No7', location: 'Lorum Ipsum consit', year: '2023', img: '/dummyimages/Container.png', alt: '/dummyimages/Frame 2121454280.webp' },
// ];

// /* ─── Single Gallery Card ────────────────────────────────────────────── */
// const GalleryCard = ({ villa, imageAspect }) => (
//   <div className="relative group cursor-pointer flex flex-col w-full gap-[6.5px]">

//     {/* Image wrapper */}
//     <div className="relative w-full shrink-0 rounded-[4px] overflow-hidden"
//       style={{ aspectRatio: imageAspect }}>

//       {/* Default image */}
//       <Image
//         src={villa.img} alt={villa.name} fill
//         className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-0"
//       />
//       {/* Hover image */}
//       {villa.alt && (
//         <Image
//           src={villa.alt} alt={`${villa.name} alternate`} fill
//           className="object-cover transition-all duration-700 ease-in-out opacity-0 group-hover:scale-105 group-hover:opacity-100"
//         />
//       )}
//       {/* Dark overlay on hover */}
//       <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//       {/* View Project split button — centred on mobile, left-edge on desktop */}
//       <div className="group/btn absolute top-1/2 left-1/2 -translate-x-1/2 lg:-left-[85px] lg:translate-x-0 -translate-y-1/2
//         w-[161px] h-[31px] rounded-[4px] bg-[#EDE7DE] flex items-center justify-center overflow-hidden z-50
//         shadow-sm opacity-0 invisible transition-all duration-500 group-hover:opacity-100 group-hover:visible">

//         {/* Base text */}
//         <span className="absolute z-0 font-sans text-[13px] font-medium text-[#334454]">View Project</span>

//         {/* Blue left half */}
//         <div className="absolute left-0 top-0 w-[85px] h-[31px] bg-[#6B859E] overflow-hidden rounded-l-[4px] z-10 flex items-center">
//           <span className="absolute left-0 w-[161px] text-center font-sans text-[13px] font-medium text-[#EDE7DE]">View Project</span>
//         </div>

//         {/* Left arrow box */}
//         <div className="absolute top-[5.56px] left-[6.82px] w-[19.95px] h-[19.95px] rounded-[4.43px] bg-[#EDE7DE] z-20 overflow-hidden">
//           <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover/btn:-translate-x-full">
//             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6B859E" strokeWidth="2.5" className="rotate-180"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out translate-x-full group-hover/btn:translate-x-0">
//             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6B859E" strokeWidth="2.5" className="rotate-180"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
//           </div>
//         </div>

//         {/* Right arrow box */}
//         <div className="absolute top-[5.93px] left-[133.77px] w-[19.95px] h-[19.95px] rounded-[4.43px] bg-[#334454] z-20 overflow-hidden">
//           <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover/btn:translate-x-full">
//             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EDE7DE" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out -translate-x-full group-hover/btn:translate-x-0">
//             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EDE7DE" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Caption */}
//     <div className="flex items-center justify-between px-[0.01px] w-full shrink-0">
//       <p className="font-sans text-[13px] text-[#334454]/80">
//         <span className="font-medium text-[#334454]">{villa.name}</span>
//         <span className="mx-1">—</span>
//         <span className="italic">{villa.location}</span>
//       </p>
//       <span className="font-sans text-[13px] text-[#334454]/60">{villa.year}</span>
//     </div>
//   </div>
// );

// /* ─── Learn More Button ──────────────────────────────────────────────── */
// const LearnMoreButton = () => (
//   <button className="group relative w-[167px] h-[52px] flex items-center bg-[#6B859E] hover:bg-[#334454] transition-colors duration-500 rounded-[12px] overflow-hidden cursor-pointer border-none">
//     <div className="absolute top-[14px] left-[12px] w-[97px] h-[23px] overflow-hidden">
//       <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
//         <span className="font-sans text-[15px] font-medium text-white whitespace-nowrap h-[23px] flex items-center">Learn More</span>
//         <span className="font-sans text-[15px] font-medium text-white whitespace-nowrap h-[23px] flex items-center">Learn More</span>
//       </div>
//     </div>
//     <div className="absolute right-[12px] w-[30px] h-[30px] rounded-[7px] bg-white group-hover:bg-[#EDE7DE] transition-colors duration-500 overflow-hidden">
//       <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
//         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#6B859E]"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
//       </div>
//       <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
//         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#6B859E]"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
//       </div>
//     </div>
//   </button>
// );

// /* ─── Main GallerySection ────────────────────────────────────────────── */
// const GallerySection = () => (
//   <section className="w-full bg-[#EDE7DE] overflow-hidden flex justify-center">

//     {/* ── Outer wrapper: 1440px baseline → pt/pb 60px, px 82px ───────── */}
//     <div className="
//       w-full mx-auto flex flex-col items-center
//       px-[20px]    pt-[36px]    pb-[72px]
//       md:px-[30px] md:pt-[43px] md:pb-[86px]
//       lg:px-[58.3px] lg:pt-[42.6px] lg:pb-[96px]
//       xl:px-[72.9px] xl:pt-[53.3px] xl:pb-[106.6px]
//       3xl:px-[82px]  3xl:pt-[60px]  3xl:pb-[120px]
//       2xl:px-[87.5px] 2xl:pt-[64px] 2xl:pb-[128px]
//       4xl:px-[109.3px] 4xl:pt-[80px] 4xl:pb-[160px]
//       sm:max-w-[60%] md:max-w-[70%] lg:max-w-[80%] xl:max-w-[82%] 2xl:max-w-[84%] 3xl:max-w-[86%] 4xl:max-w-[84%]
//     ">

//       {/* ── Inner wrapper: max-w 1344.51px, px 18.17px, gap 72.68px ─── */}
//       <div className="
//         w-full flex flex-col items-center shrink-0
//         px-[12.9px] gap-[51.7px]
//         md:gap-[62px]
//         lg:gap-[51.6px] lg:px-[12.9px]
//         xl:gap-[64.6px] xl:px-[16.1px]
//         3xl:gap-[72.68px] 3xl:px-[18.17px] 3xl:max-w-[1344.51px]
//         2xl:gap-[77.5px]  2xl:px-[19.4px]  2xl:max-w-[1434px]
//         4xl:gap-[96.9px]  4xl:px-[24.2px]  4xl:max-w-[1792px]
//       ">

//         {/* ══ HEADER (1254px × 132.63px) ════════════════════════════════ */}
//         <div className="w-full flex flex-col lg:flex-row items-start justify-between shrink-0 gap-6 lg:gap-0">

//           {/* Gallery badge – 102.6px wide at 3xl */}
//           <div className="flex items-center flex-shrink-0
//             gap-[5.1px]
//             lg:gap-[5.1px] lg:mt-[4.3px]
//             xl:gap-[6.4px] xl:mt-[5.3px]
//             3xl:gap-[7.2px] 3xl:mt-[6px]
//             2xl:gap-[7.7px] 2xl:mt-[6.4px]
//             4xl:gap-[9.6px] 4xl:mt-[8px]">
//             <div className="bg-[#334454] rounded-[2px] shrink-0
//               w-[9.9px]  h-[9.9px]
//               xl:w-[12.4px] xl:h-[12.4px]
//               3xl:w-[14px]  3xl:h-[14px]
//               2xl:w-[14.9px] 2xl:h-[14.9px]
//               4xl:w-[18.6px] 4xl:h-[18.6px]" />
//             <span className="font-sans font-normal uppercase text-[#334454]
//               text-[10.2px] tracking-wider
//               xl:text-[12.8px]
//               3xl:text-[14px]
//               2xl:text-[14.9px]
//               4xl:text-[18.6px]">Gallery</span>
//           </div>

//           {/* Heading + subheading – 975.6px at 3xl (77.68% of 1254px) */}
//           <div className="w-full lg:w-[77.68%] flex flex-col lg:flex-row items-start lg:items-end justify-between shrink-0 gap-6 lg:gap-0">

//             {/* Heading – 667.67px at 3xl (68.4% of 975.6px) */}
//             <h2 className="font-roundo font-medium text-[#1A1A1A] m-0
//               w-full text-[36px] leading-[1.1] tracking-[-1.5px]
//               md:text-[44px]
//               lg:w-[68.4%] lg:text-[37.9px] lg:leading-[41.8px] lg:tracking-[-1.93px]
//               xl:w-[68.4%] xl:text-[47.4px] xl:leading-[52.2px] xl:tracking-[-2.41px]
//               3xl:w-[68.4%] 3xl:text-[53.4px] 3xl:leading-[58.8px] 3xl:tracking-[-2.72px]
//               2xl:w-[68.4%] 2xl:text-[56.9px] 2xl:leading-[62.7px] 2xl:tracking-[-2.9px]
//               4xl:w-[68.4%] 4xl:text-[71.2px] 4xl:leading-[78.4px] 4xl:tracking-[-3.62px]">
//               Elegant Spaces For Built Views Photo Frame
//             </h2>

//             {/* Subheading – 264px at 3xl (27.1% of 975.6px) */}
//             <p className="font-sans font-normal text-[#334454]/70 m-0
//               w-full text-[15px] leading-[1.4]
//               lg:w-[27.1%] lg:text-[14.1px] lg:leading-[15.4px] lg:tracking-[-0.31px]
//               xl:w-[27.1%] xl:text-[17.7px] xl:leading-[19.3px] xl:tracking-[-0.39px]
//               3xl:w-[27.1%] 3xl:text-[19.9px] 3xl:leading-[21.8px] 3xl:tracking-[-0.44px]
//               2xl:w-[27.1%] 2xl:text-[21.2px] 2xl:leading-[23.2px] 2xl:tracking-[-0.47px]
//               4xl:w-[27.1%] 4xl:text-[26.5px] 4xl:leading-[29px]  4xl:tracking-[-0.58px]">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
//             </p>
//           </div>
//         </div>

//         {/* ══ GRID (1219.5px, gap 50.87px) ═════════════════════════════ */}
//         <div className="w-full flex flex-col shrink-0
//           gap-[36.2px]
//           md:gap-[43.3px]
//           lg:gap-[36.2px]
//           xl:gap-[45.2px]
//           3xl:gap-[50.87px]
//           2xl:gap-[54.3px]
//           4xl:gap-[67.8px]">

//           {/* ── ROW 1 ──────────────────────────────────────────────────
//               Left:  543.52px wide + 148.74px top-padding (self-end)
//                      → 543.52/1219.5 = 44.57% of grid
//                      top-offset: 148.74px out of 642.04px row = 23.16%
//               Right: 499.99px wide, no top offset (self-start)
//                      → 499.99/1219.5 = 41.0% of grid                  */}
//           <div className="w-full flex flex-col lg:flex-row justify-between shrink-0 gap-10 lg:gap-0">

//             {/* Left card with top spacer */}
//             <div className="w-full lg:w-[44.57%] flex flex-col">
//               {/*
//                 The spacer height = 148.74/543.52 of the card's own width.
//                 Since % padding is relative to the *parent* width in CSS,
//                 we set padding-top = (148.74/543.52) * 44.57% ≈ 12.19%
//                 of the grid row's width on desktop.
//               */}
//               <div className="hidden lg:block lg:pt-[12.19%]" />
//               <GalleryCard villa={VILLAS[0]} imageAspect="543.52 / 466.87" />
//             </div>

//             {/* Right card – no offset */}
//             <div className="w-full lg:w-[41.0%]">
//               <GalleryCard villa={VILLAS[1]} imageAspect="499.99 / 436.06" />
//             </div>
//           </div>

//           {/* ── ROW 2 ──────────────────────────────────────────────────
//               Single image, right-aligned.
//               Container: 861.45px → 861.45/1219.5 = 70.64% of grid
//               Image inside container: 646.08/861.45 = 75.0%
//               Left empty space: 1219.5-861.45 = 358.05px → flex justify-end  */}
//           <div className="w-full flex justify-end">
//             <div className="w-full lg:w-[70.64%] flex justify-end">
//               <div className="w-full lg:w-[75%]">
//                 <GalleryCard villa={VILLAS[2]} imageAspect="646.08 / 519.40" />
//               </div>
//             </div>
//           </div>

//           {/* ── ROW 3 ──────────────────────────────────────────────────
//               Left:  499.99px wide, no top offset (self-start)
//                      → 499.99/1219.5 = 41.0% of grid
//               Right: 597.55px wide + 163.52px top-padding (self-end)
//                      → 597.55/1219.5 = 48.99% of grid
//                      top-offset: (163.52/597.55) * 48.99% ≈ 13.41%      */}
//           <div className="w-full flex flex-col lg:flex-row justify-between shrink-0 gap-10 lg:gap-0">

//             {/* Left card – no offset */}
//             <div className="w-full lg:w-[41.0%]">
//               <GalleryCard villa={VILLAS[3]} imageAspect="499.99 / 436.06" />
//             </div>

//             {/* Right card with top spacer */}
//             <div className="w-full lg:w-[48.99%] flex flex-col">
//               <div className="hidden lg:block lg:pt-[13.41%]" />
//               <GalleryCard villa={VILLAS[4]} imageAspect="597.55 / 513.28" />
//             </div>
//           </div>

//           {/* ── ROW 4: Learn More button ─────────────────────────────── */}
//           <div className="w-full flex justify-center items-center shrink-0">
//             <LearnMoreButton />
//           </div>

//         </div>{/* end grid */}
//       </div>{/* end inner wrapper */}
//     </div>{/* end outer wrapper */}
//   </section>
// );

// export default GallerySection;

// -----------------------------------------------------------


// 'use client';

// import React from 'react';
// import Image from 'next/image';

// /*
//   CLAMP FORMULA:
//   vw = (maxVal - minVal) / (maxViewport - minViewport) * 100
//   Viewport range: 375px (mobile) → 1920px (4xl)

//   Key Figma values at 1440px (3xl):
//   Section padding H: 82px      → clamp(16px, 4.27vw, 82px)
//   Section padding V: 60px      → clamp(28px, 3.125vw, 60px)
//   Outer gap:        72.68px    → clamp(32px, 3.785vw, 72.68px)

//   Header:
//   - Badge text:     14px       → clamp(11px, 0.729vw, 14px)
//   - Badge dot:      14px       → clamp(9px, 0.729vw, 14px)
//   - h2:             60px       → clamp(26px, 3.125vw, 60px)
//   - h2 lh:          66.14px    → clamp(30px, 3.445vw, 66.14px)
//   - h2 ls:          -3.05px    → clamp(-1.3px, -0.159vw, -3.05px)
//   - h2 max-w:       667.67px   → clamp(280px, 34.774vw, 667.67px)
//   - p:              20px       → clamp(13px, 1.042vw, 20px)
//   - p max-w:        264px      → clamp(180px, 13.75vw, 264px)

//   Grid row gap:     50.87px    → clamp(24px, 2.649vw, 50.87px)

//   Card images (all scaled proportionally from 1440px base):
//   Row 1 left:  543.52 × 466.87 → clamp(260px, 28.31vw, 543.52px) × clamp(224px, 24.32vw, 466.87px)
//   Row 1 right: 499.99 × 436.06 → clamp(240px, 26.04vw, 499.99px) × clamp(208px, 22.71vw, 436.06px)
//   Row 2:       646.08 × 519.40 → clamp(300px, 33.65vw, 646.08px) × clamp(250px, 27.05vw, 519.40px)
//   Row 3 left:  499.99 × 436.06 → clamp(240px, 26.04vw, 499.99px) × clamp(208px, 22.71vw, 436.06px)
//   Row 3 right: 597.55 × 512.35 → clamp(280px, 31.12vw, 597.55px) × clamp(240px, 26.69vw, 512.35px)

//   Container heights (image + caption ~28px):
//   Row 1 left:  493.31px  → clamp(248px, 25.69vw, 493.31px)
//   Row 1 right: 465.13px  → clamp(234px, 24.22vw, 465.13px)
//   Row 2:       547.40px  → clamp(264px, 28.51vw, 547.40px)
//   Row 3 left:  465.13px  → clamp(234px, 24.22vw, 465.13px)
//   Row 3 right: 542.35px  → clamp(260px, 28.25vw, 542.35px)

//   Button (LearnMoreButton):
//   - w: 167px   → clamp(130px, 8.698vw, 167px)
//   - h: 52px    → clamp(40px, 2.708vw, 52px)
//   - text: 15px → clamp(12px, 0.781vw, 15px)
// */

// const VILLAS = [
//   { id: 1, name: 'VILLA 01',  location: 'Calicut , Kerala',       year: '2024', img: '/dummyimages/Frame 2121454280.webp', alt: '/dummyimages/Container.png',           side: 'left'  },
//   { id: 2, name: 'Villa 1',   location: 'Calicut, Kerala',        year: '2025', img: '/dummyimages/Container.png',        alt: '/dummyimages/Frame 2121454280.webp',    side: 'right' },
//   { id: 3, name: 'Villa No3', location: 'Calicut, Kerala',        year: '2025', img: '/dummyimages/Overlay.webp',          alt: '/dummyimages/Frame 2121454280.webp',    side: 'left'  },
//   { id: 4, name: 'Villa No4', location: 'Calicut, Kerala',        year: '2024', img: '/dummyimages/Container.png',        alt: '/dummyimages/Frame 2121454280.webp',    side: 'right' },
//   { id: 5, name: 'Villa No5', location: 'Lorum Ipsum sit',        year: '2025', img: '/dummyimages/Overlay.webp',          alt: '/dummyimages/Frame 2121454280.webp',    side: 'right' },
//   { id: 6, name: 'Villa No6', location: 'Lorum Ipsum sit consit', year: '2024', img: '/dummyimages/Frame 2121454280.webp', alt: '/dummyimages/Overlay.webp',             side: 'left'  },
//   { id: 7, name: 'Villa No7', location: 'Lorum Ipsum consit',     year: '2023', img: '/dummyimages/Container.png',        alt: '/dummyimages/Frame 2121454280.webp',    side: 'right' },
// ];

// /* ─── Gallery Card ───────────────────────────────────────────────────── */
// const GalleryCard = ({ villa, containerWidth, containerHeight, imageWidth, imageHeight }) => (
//   <div
//     className="relative group cursor-pointer flex flex-col justify-between"
//     style={{ width: containerWidth, height: containerHeight }}
//   >
//     {/* Image container */}
//     <div className="relative shrink-0" style={{ width: imageWidth, height: imageHeight }}>

//       {/* Clipped image wrapper */}
//       <div className="absolute inset-0 rounded-[4px] overflow-hidden">
//         <Image
//           src={villa.img}
//           alt={villa.name}
//           fill
//           className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-0"
//         />
//         {villa.alt && (
//           <Image
//             src={villa.alt}
//             alt={`${villa.name} alternate`}
//             fill
//             className="object-cover transition-all duration-700 ease-in-out opacity-0 group-hover:scale-105 group-hover:opacity-100"
//           />
//         )}
//         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//       </div>

//       {/* "View Project" split button */}
//       <div className="group/btn absolute top-1/2 -translate-y-1/2 z-50 transition-all duration-500 shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible"
//         style={{
//           left:         'clamp(-60px, -5.9vw, -85px)',
//           width:        'clamp(120px, 8.39vw, 161px)',
//           height:       'clamp(24px, 1.615vw, 31px)',
//           borderRadius: '4px',
//           backgroundColor: '#EDE7DE',
//           display:      'flex',
//           alignItems:   'center',
//           justifyContent: 'center',
//           overflow:     'hidden',
//         }}
//       >
//         <span
//           className="absolute z-0 font-sans font-medium text-[#334454]"
//           style={{ fontSize: 'clamp(10px, 0.677vw, 13px)' }}
//         >
//           View Project
//         </span>

//         {/* Left blue half */}
//         <div
//           className="absolute left-0 top-0 h-full bg-[#6B859E] overflow-hidden rounded-l-[4px] z-10 flex items-center"
//           style={{ width: '53%' }}
//         >
//           <span
//             className="absolute left-0 w-full text-center font-sans font-medium text-[#EDE7DE]"
//             style={{
//               fontSize: 'clamp(10px, 0.677vw, 13px)',
//               width:    'clamp(120px, 8.39vw, 161px)',
//             }}
//           >
//             View Project
//           </span>
//         </div>

//         {/* Left arrow box */}
//         <div
//           className="absolute z-20 overflow-hidden bg-[#EDE7DE]"
//           style={{
//             top:          'clamp(4px, 0.29vw, 5.56px)',
//             left:         'clamp(5px, 0.355vw, 6.82px)',
//             width:        'clamp(15px, 1.039vw, 19.95px)',
//             height:       'clamp(15px, 1.039vw, 19.95px)',
//             borderRadius: 'clamp(3px, 0.231vw, 4.43px)',
//           }}
//         >
//           <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover/btn:-translate-x-full">
//             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6B859E" strokeWidth="2.5" className="rotate-180">
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out translate-x-full group-hover/btn:translate-x-0">
//             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6B859E" strokeWidth="2.5" className="rotate-180">
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </div>
//         </div>

//         {/* Right arrow box */}
//         <div
//           className="absolute z-20 overflow-hidden bg-[#334454]"
//           style={{
//             top:          'clamp(4px, 0.309vw, 5.93px)',
//             right:        'clamp(5px, 0.355vw, 6.82px)',
//             width:        'clamp(15px, 1.039vw, 19.95px)',
//             height:       'clamp(15px, 1.039vw, 19.95px)',
//             borderRadius: 'clamp(3px, 0.231vw, 4.43px)',
//           }}
//         >
//           <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover/btn:translate-x-full">
//             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EDE7DE" strokeWidth="2.5">
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out -translate-x-full group-hover/btn:translate-x-0">
//             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EDE7DE" strokeWidth="2.5">
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Caption */}
//     <div className="flex items-center justify-between px-1 shrink-0" style={{ width: imageWidth }}>
//       <p
//         className="font-sans text-[#334454]/80"
//         style={{ fontSize: 'clamp(10px, 0.677vw, 13px)' }}
//       >
//         <span className="font-medium text-[#334454]">{villa.name}</span>
//         <span className="mx-1">—</span>
//         <span className="italic">{villa.location}</span>
//       </p>
//       <span
//         className="font-sans text-[#334454]/60"
//         style={{ fontSize: 'clamp(10px, 0.677vw, 13px)' }}
//       >
//         {villa.year}
//       </span>
//     </div>
//   </div>
// );

// /* ─── Learn More Button ──────────────────────────────────────────────── */
// const LearnMoreButton = () => (
//   <button
//     className="group relative flex items-center bg-[#6B859E] hover:bg-[#334454] transition-colors duration-500 overflow-hidden cursor-pointer border-none"
//     style={{
//       width:        'clamp(130px, 8.698vw, 167px)',
//       height:       'clamp(40px, 2.708vw, 52px)',
//       borderRadius: 'clamp(8px, 0.625vw, 12px)',
//     }}
//   >
//     {/* Sliding text */}
//     <div
//       className="absolute overflow-hidden"
//       style={{
//         top:    'clamp(10px, 0.729vw, 14px)',
//         left:   'clamp(10px, 0.625vw, 12px)',
//         width:  'clamp(76px, 5.052vw, 97px)',
//         height: 'clamp(18px, 1.198vw, 23px)',
//       }}
//     >
//       <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
//         {['Learn More', 'Learn More'].map((label, i) => (
//           <span
//             key={i}
//             className="font-sans font-medium text-white whitespace-nowrap flex items-center"
//             style={{
//               fontSize: 'clamp(12px, 0.781vw, 15px)',
//               height:   'clamp(18px, 1.198vw, 23px)',
//             }}
//           >
//             {label}
//           </span>
//         ))}
//       </div>
//     </div>

//     {/* Arrow box */}
//     <div
//       className="absolute bg-white group-hover:bg-[#EDE7DE] transition-colors duration-500 overflow-hidden"
//       style={{
//         right:        'clamp(8px, 0.625vw, 12px)',
//         width:        'clamp(22px, 1.563vw, 30px)',
//         height:       'clamp(22px, 1.563vw, 30px)',
//         borderRadius: 'clamp(5px, 0.365vw, 7px)',
//       }}
//     >
//       <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
//           className="text-[#6B859E]"
//           style={{ width: 'clamp(10px, 0.729vw, 14px)', height: 'clamp(10px, 0.729vw, 14px)' }}
//         >
//           <path d="M5 12h14M12 5l7 7-7 7" />
//         </svg>
//       </div>
//       <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
//           className="text-[#6B859E]"
//           style={{ width: 'clamp(10px, 0.729vw, 14px)', height: 'clamp(10px, 0.729vw, 14px)' }}
//         >
//           <path d="M5 12h14M12 5l7 7-7 7" />
//         </svg>
//       </div>
//     </div>
//   </button>
// );

// /* ─── Main GallerySection ────────────────────────────────────────────── */
// const GallerySection = () => (
//   <section 
//     className="w-full bg-[#EDE7DE] overflow-hidden flex flex-col items-center"
//     style={{
//       paddingTop:    'clamp(28px, 4.17vw, 60px)',
//       paddingBottom: 'clamp(28px, 4.17vw, 60px)',
//       paddingLeft:   'clamp(16px, 5.69vw, 82px)',
//       paddingRight:  'clamp(16px, 5.69vw, 82px)',
//     }}
//   >
//     <div
//       className="w-full flex flex-col items-center"
//       style={{
//         maxWidth:      'clamp(560px, 93.37vw, 1344.51px)',
//         paddingLeft:   'clamp(8px, 1.26vw, 18.17px)',
//         paddingRight:  'clamp(8px, 1.26vw, 18.17px)',
//         gap:           'clamp(32px, 5.05vw, 72.68px)'
//       }}
//     >
//       {/* ── Header ──────────────────────────────────────────────────── */}
//         <div className="w-full flex flex-col lg:flex-row lg:items-start lg:justify-between"
//           style={{ gap: 'clamp(16px, 1.25vw, 24px)' }}
//         >
//           {/* Badge */}
//           <div
//             className="flex items-center flex-shrink-0"
//             style={{ gap: 'clamp(5px, 0.375vw, 7.2px)', marginTop: 'clamp(3px, 0.313vw, 6px)' }}
//           >
//             <div
//               className="bg-[#334454] flex-shrink-0"
//               style={{
//                 width:        'clamp(9px, 0.729vw, 14px)',
//                 height:       'clamp(9px, 0.729vw, 14px)',
//                 borderRadius: 'clamp(2px, 0.156vw, 3px)',
//               }}
//             />
//             <span
//               className="font-sans font-normal uppercase text-[#334454] tracking-wider"
//               style={{ fontSize: 'clamp(11px, 0.729vw, 14px)' }}
//             >
//               Gallery
//             </span>
//           </div>

//           {/* Heading + subheading */}
//           <div
//             className="flex flex-col lg:flex-row lg:items-end lg:justify-between flex-1"
//             style={{ gap: 'clamp(16px, 2.604vw, 50px)' }}
//           >
//             <h2
//               className="font-roundo font-medium text-[#1A1A1A] m-0"
//               style={{
//                 fontSize:      'clamp(26px, 3.125vw, 60px)',
//                 lineHeight:    'clamp(30px, 3.445vw, 66.14px)',
//                 letterSpacing: 'clamp(-1.3px, -0.159vw, -3.05px)',
//                 maxWidth:      'clamp(280px, 34.774vw, 667.67px)',
//               }}
//             >
//               Elegant Spaces For Built Views Photo Frame
//             </h2>
//             <p
//               className="font-sans font-normal text-[#334454]/70 m-0"
//               style={{
//                 fontSize:      'clamp(13px, 1.042vw, 20px)',
//                 lineHeight:    'clamp(16px, 1.135vw, 21.8px)',
//                 letterSpacing: 'clamp(-0.26px, -0.023vw, -0.44px)',
//                 maxWidth:      'clamp(180px, 13.75vw, 264px)',
//               }}
//             >
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//               tempor incididunt ut labore et dolore
//             </p>
//           </div>
//         </div>

//         {/* ── Grid ────────────────────────────────────────────────────── */}
//         <div
//           className="w-full flex flex-col"
//           style={{ gap: 'clamp(24px, 2.649vw, 50.87px)' }}
//         >

//           {/* Row 1 */}
//           <div className="w-full flex flex-col lg:flex-row justify-between">
//             <div className="self-end">
//               <GalleryCard
//                 villa={VILLAS[0]}
//                 containerWidth="clamp(260px, 28.31vw, 543.52px)"
//                 containerHeight="clamp(248px, 25.69vw, 493.31px)"
//                 imageWidth="clamp(260px, 28.31vw, 543.52px)"
//                 imageHeight="clamp(224px, 24.32vw, 466.87px)"
//               />
//             </div>
//             <div className="self-start">
//               <GalleryCard
//                 villa={VILLAS[1]}
//                 containerWidth="clamp(240px, 26.04vw, 499.99px)"
//                 containerHeight="clamp(234px, 24.22vw, 465.13px)"
//                 imageWidth="clamp(240px, 26.04vw, 499.99px)"
//                 imageHeight="clamp(208px, 22.71vw, 436.06px)"
//               />
//             </div>
//           </div>

//           {/* Row 2 */}
//           <div className="w-full flex justify-end">
//             <GalleryCard
//               villa={VILLAS[4]}
//               containerWidth="clamp(300px, 33.65vw, 646.08px)"
//               containerHeight="clamp(264px, 28.51vw, 547.40px)"
//               imageWidth="clamp(300px, 33.65vw, 646.08px)"
//               imageHeight="clamp(250px, 27.05vw, 519.40px)"
//             />
//           </div>

//           {/* Row 3 */}
//           <div className="w-full flex flex-col lg:flex-row justify-between">
//             <div className="self-start">
//               <GalleryCard
//                 villa={VILLAS[5]}
//                 containerWidth="clamp(240px, 26.04vw, 499.99px)"
//                 containerHeight="clamp(234px, 24.22vw, 465.13px)"
//                 imageWidth="clamp(240px, 26.04vw, 499.99px)"
//                 imageHeight="clamp(208px, 22.71vw, 436.06px)"
//               />
//             </div>
//             <div className="self-end">
//               <GalleryCard
//                 villa={VILLAS[6]}
//                 containerWidth="clamp(280px, 31.12vw, 597.55px)"
//                 containerHeight="clamp(260px, 28.25vw, 542.35px)"
//                 imageWidth="clamp(280px, 31.12vw, 597.55px)"
//                 imageHeight="clamp(240px, 26.69vw, 512.35px)"
//               />
//             </div>
//           </div>

//           {/* Row 4 — Button */}
//           <div className="w-full flex justify-center items-center">
//             <LearnMoreButton />
//           </div>

//         </div>
//       </div>
//   </section>
// );

// export default GallerySection;
