// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';

// const WhyChooseUs = () => {
//   const [activeCard, setActiveCard] = useState(null);

//   const cards = [
//     {
//       img: '/dummyimages/Container.png',
//       icon: (
//         <Image src="/icons/Vector.svg" alt="Design icon" width={25} height={25} />
//       ),
//       title: "Design-Driven, Modern Approach",
//       desc: "We don’t follow outdated construction templates. Every Chameri project is crafted with a modern, minimal, and premium design philosophy—blending aesthetics with functionality to create spaces that feel timeless and refined."
//     },
//     {
//       img: '/dummyimages/Container.png',
//       icon: (
//         <Image src="/icons/692885226ea01d367379ce40_Frame.svg.svg" alt="Expertise icon" width={25} height={25} />
//       ),
//       title: <>Proven Expertise <br/>& Trusted Network</>,
//       desc: "With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships."
//     },
//     {
//       img: '/dummyimages/Overlay.png',
//       icon: (
//         <Image src="/icons/healthicons_people-outline.svg" alt="People icon" width={25} height={25} />
//       ),
//       title: "Client-Centric, Seamless Experience",
//       desc: "From booking a site visit to final handover, we ensure a smooth and transparent journey. Clear communication, guided decisions, and a focus on your vision make the entire process seamless and stress-free."
//     }
//   ];

//   return (
//     <section className="
//       w-full bg-[#EDE7DE] flex flex-col items-center overflow-hidden
//       h-auto py-[40px] px-[20px] gap-[40px]
//       md:py-[50px] md:px-[40px] md:gap-[50px]
//       lg:h-[475px] lg:py-[42px] lg:px-[56px] lg:gap-[42px]
//       xl:h-[593px] xl:py-[53px] xl:px-[71px] xl:gap-[53px]
//       2xl:h-[712px] 2xl:py-[64px] 2xl:px-[85px] 2xl:gap-[64px]
//       3xl:h-[668.3px] 3xl:py-[60px] 3xl:px-[80px] 3xl:gap-[60px]
//       4xl:h-[890px] 4xl:py-[80px] 4xl:px-[106px] 4xl:gap-[80px]
//     ">
//       {/* ── Top Header Section ── */}
//       <div className="
//         w-full flex flex-col 
//         gap-[16px] lg:gap-[10.6px] xl:gap-[13.3px] 2xl:gap-[16px] 3xl:gap-[15px] 4xl:gap-[20px]
//         sm:max-w-[80%]    
//         md:max-w-[85%]    
//         lg:max-w-[82%]    
//         xl:max-w-[84%]    
//         2xl:max-w-[86%]   
//         3xl:max-w-[1280px] 3xl:w-[1280px] 3xl:h-[135.8px]
//         4xl:max-w-[88%]
//       ">
//         {/* Badge */}
//         <div className="
//           flex items-center rounded-[90px] self-start
//           px-[5px] py-[4px] gap-[5px]
//           lg:px-[5.1px] lg:py-[3.8px] lg:gap-[5.1px]
//           xl:px-[6.4px] xl:py-[4.8px] xl:gap-[6.4px]
//           2xl:px-[7.6px] 2xl:py-[5.7px] 2xl:gap-[7.6px]
//           3xl:px-[7.2px] 3xl:py-[5.4px] 3xl:gap-[7.2px] 3xl:w-[163.6px] 3xl:h-[30.8px]
//           4xl:px-[9.6px] 4xl:py-[7.2px] 4xl:gap-[9.6px]
//         ">
//           <div className="
//             bg-[#334454] 
//             w-[10px] h-[10px] rounded-[2px]
//             lg:w-[9.9px] lg:h-[9.9px] lg:rounded-[2px]
//             xl:w-[12.4px] xl:h-[12.4px] xl:rounded-[2.6px]
//             2xl:w-[14.9px] 2xl:h-[14.9px] 2xl:rounded-[3.2px]
//             3xl:w-[14px] 3xl:h-[14px] 3xl:rounded-[3px] 3xl:p-[3.6px]
//             4xl:w-[18.6px] 4xl:h-[18.6px] 4xl:rounded-[4px]
//           " />
//           <span className="
//             font-sans font-normal uppercase text-black
//             text-[12px] tracking-[-0.2px]
//             lg:text-[11.5px] lg:tracking-[-0.22px]
//             xl:text-[14.3px] xl:tracking-[-0.28px]
//             2xl:text-[17.2px] 2xl:tracking-[-0.34px]
//             3xl:text-[16.2px] 3xl:tracking-[-0.32px] 3xl:w-[128px] 3xl:h-[20px] 3xl:flex 3xl:items-center
//             4xl:text-[21.6px] 4xl:tracking-[-0.42px]
//           ">
//             WHY CHOOSE US
//           </span>
//         </div>

//         {/* Main Heading Row */}
//         <div className="
//           flex flex-col md:flex-row justify-between items-start md:items-end w-full 
//           gap-[20px] lg:gap-[35px] xl:gap-[44px] 2xl:gap-[53px] 3xl:gap-[50px] 4xl:gap-[66px]
//           3xl:h-[90px]
//         ">
//           <h2 className="
//             font-roundo font-medium text-[#1A1A1A] capitalize
//             text-[28px] leading-[32px] tracking-[-0.5px] max-w-full
//             md:text-[36px] md:leading-[40px] md:tracking-[-0.7px]
//             lg:text-[32px] lg:leading-[32px] lg:tracking-[-0.64px] lg:max-w-[364px]
//             xl:text-[40px] xl:leading-[40px] xl:tracking-[-0.8px] xl:max-w-[454px]
//             2xl:text-[48px] 2xl:leading-[48px] 2xl:tracking-[-0.96px] 2xl:max-w-[545px]
//             3xl:text-[45px] 3xl:leading-[45px] 3xl:tracking-[-0.9px] 3xl:w-[512.08px] 3xl:max-w-[512.08px] 3xl:h-[90px]
//             4xl:text-[60px] 4xl:leading-[60px] 4xl:tracking-[-1.2px] 4xl:max-w-[682px]
//           ">
//             Proven Trust Value Modern Homes Leader
//           </h2>
//           <p className="
//             font-sans font-normal text-black/60
//             text-[16px] leading-[22px] tracking-[-0.3px] max-w-[100%]
//             lg:text-[14.2px] lg:leading-[15.5px] lg:tracking-[-0.31px] lg:max-w-[396px]
//             xl:text-[17.7px] xl:leading-[19.3px] xl:tracking-[-0.39px] xl:max-w-[495px]
//             2xl:text-[21.3px] 2xl:leading-[23.2px] 2xl:tracking-[-0.46px] 2xl:max-w-[594px]
//             3xl:text-[20px] 3xl:leading-[21.8px] 3xl:tracking-[-0.44px] 3xl:w-[558px] 3xl:max-w-[558px] 3xl:h-[66px]
//             4xl:text-[26.6px] 4xl:leading-[29px] 4xl:tracking-[-0.58px] 4xl:max-w-[743px]
//           ">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.
//           </p>
//         </div>
//       </div>

//       {/* ── Feature Cards (Accordion Effect) ── */}
//       <div className="
//         w-full flex flex-col lg:flex-row justify-center
//         gap-[16px] lg:gap-[7px] xl:gap-[8.8px] 2xl:gap-[10.6px] 3xl:gap-[10px] 4xl:gap-[13.3px]
//         sm:max-w-[80%] md:max-w-[85%] lg:max-w-[82%] xl:max-w-[84%] 2xl:max-w-[86%] 3xl:max-w-[1280px] 3xl:w-[1280px] 4xl:max-w-[88%]
//         [--active-w:100%] [--inactive-w:100%] [--card-h:auto] [--card-p:24px]
//         lg:[--active-w:325.6px] lg:[--inactive-w:284.4px] lg:[--card-h:250.6px] lg:[--card-p:24px]
//         xl:[--active-w:406.7px] xl:[--inactive-w:355.2px] xl:[--card-h:313px] xl:[--card-p:30px]
//         2xl:[--active-w:488px] 2xl:[--inactive-w:426.4px] 2xl:[--card-h:475.7px] 2xl:[--card-p:40px]
//         3xl:[--active-w:458px] 3xl:[--inactive-w:400px] 3xl:[--card-h:352.5px] 3xl:[--card-p:37.5px]
//         4xl:[--active-w:610px] 4xl:[--inactive-w:533px] 4xl:[--card-h:470px] 4xl:[--card-p:50px]
//       ">
//         {cards.map((card, i) => {
//           const isActive = activeCard === i;
          
//           return (
//           <div
//             key={i}
//             onMouseEnter={() => setActiveCard(i)}
//             style={{ 
//               width: typeof window !== 'undefined' && window.innerWidth >= 1024 
//                 ? (isActive ? 'var(--active-w)' : 'var(--inactive-w)') 
//                 : '100%', 
//               height: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'var(--card-h)' : 'auto', 
//               padding: 'var(--card-p)' 
//             }}
//             className={`relative rounded-[8px] overflow-hidden transition-all duration-700 ease-in-out cursor-pointer flex-shrink-0 min-h-[300px] lg:min-h-0`}
//           >
//             {/* Background Image */}
//             <Image
//               src={card.img}
//               alt="Background"
//               fill
//               className={`object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-100'}`}
//             />
//             {/* Dark Overlay */}
//             <div className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-black/50' : 'bg-black/40'}`} />

//             {/* Content Container — centers the inner block in the card */}
//             <div className="absolute inset-0 flex items-center justify-center p-[var(--card-p)]">
//               {/* Inner content */}
//               <div className="
//                 flex flex-col
//                 w-full lg:w-[243px] xl:w-[303px] 2xl:w-[364px] 3xl:w-[342px] 4xl:w-[456px]
//                 min-h-[auto] lg:min-h-[197.3px] xl:min-h-[246px] 2xl:min-h-[295.8px] 3xl:min-h-[277.5px] 4xl:min-h-[370px]
//                 gap-[14px] lg:gap-[10px] xl:gap-[12.4px] 2xl:gap-[14.9px] 3xl:gap-[14px] 4xl:gap-[18.6px]
//               ">
//                 {/* White Icon Box */}
//                 <div className="
//                   bg-white flex items-center justify-center shadow-lg flex-shrink-0
//                   rounded-[5px] w-[40px] h-[40px] p-[6px]
//                   lg:w-[32.7px] lg:h-[32.7px] lg:rounded-[3.5px] lg:p-[4.2px]
//                   xl:w-[40.8px] xl:h-[40.8px] xl:rounded-[4.4px] xl:p-[5.3px]
//                   2xl:w-[49px] 2xl:h-[49px] 2xl:rounded-[5.3px] 2xl:p-[6.4px]
//                   3xl:w-[46px] 3xl:h-[46px] 3xl:rounded-[5px] 3xl:p-[6px]
//                   4xl:w-[61.3px] 4xl:h-[61.3px] 4xl:rounded-[6.6px] 4xl:p-[8px]
//                 ">
//                   <div className="text-[#334454] flex items-center justify-center w-full h-full">
//                     {card.icon}
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <h3 className="
//                   font-roundo font-medium text-white
//                   text-[24px] leading-[28px] tracking-[-0.5px]
//                   lg:text-[23.4px] lg:leading-[27px] lg:tracking-[-0.47px]
//                   xl:text-[29.3px] xl:leading-[33.7px] xl:tracking-[-0.58px]
//                   2xl:text-[35.1px] 2xl:leading-[40.4px] 2xl:tracking-[-0.7px]
//                   3xl:text-[33px] 3xl:leading-[37.95px] 3xl:tracking-[-0.66px] 3xl:w-[342px] 3xl:h-[77px] 3xl:flex 3xl:items-center
//                   4xl:text-[44px] 4xl:leading-[50.5px] 4xl:tracking-[-0.88px]
//                 ">
//                   {card.title}
//                 </h3>

//                 {/* Description — visible on hover */}
//                 <p className={`
//                   font-sans font-normal text-white/80 transition-opacity duration-500 delay-100
//                   lg:absolute lg:bottom-[var(--card-p)] lg:left-[var(--card-p)] lg:right-[var(--card-p)]
//                   static
//                   text-[15px] leading-[22px] tracking-[0px]
//                   lg:text-[10.6px] lg:leading-[16px]
//                   xl:text-[13.3px] xl:leading-[20px]
//                   2xl:text-[16px] 2xl:leading-[24px]
//                   3xl:text-[15px] 3xl:leading-[22.5px] 3xl:w-[342px] 3xl:h-[113px] 3xl:tracking-[0px]
//                   4xl:text-[20px] 4xl:leading-[30px]
//                   ${isActive ? 'opacity-100 relative lg:absolute' : 'opacity-0 absolute lg:absolute pointer-events-none'}
//                 `} style={{ fontFamily: 'Instrument Sans, var(--font-geist-sans), sans-serif' }}>
//                   {card.desc}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )})}
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;


// ----------------github code----------------------------

// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';

// const WhyChooseUs = () => {
//   const [activeCard, setActiveCard] = useState(null);

//   const cards = [
//     {
//       img: '/dummyimages/Container.png',
//       icon: (
//         <Image src="/icons/Vector.svg" alt="Design icon" width={25} height={25} />
//       ),
//       title: "Design-Driven, Modern Approach",
//       desc: "With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships."
//     },
//     {
//       img: '/dummyimages/Container.png',
//       icon: (
//         <Image src="/icons/692885226ea01d367379ce40_Frame.svg.svg" alt="Expertise icon" width={25} height={25} />
//       ),
//       title: "Proven Expertise & Trusted Network",
//       desc: "With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships."
//     },
//     {
//       img: '/dummyimages/Overlay.png',
//       icon: (
//         <Image src="/icons/healthicons_people-outline.svg" alt="People icon" width={25} height={25} />
//       ),
//       title: "Client-Centric, Seamless Experience",
//       desc: "With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships."
//     }
//   ];

//   return (
//     <section className="w-full h-[628px] bg-[#EDE7DE] py-[60px] px-[80px] flex flex-col items-center gap-[60px] overflow-hidden">
//       {/* ── Top Header Section ── */}
//       <div className="w-full max-w-[1280px] flex flex-col gap-6">
//         {/* Badge */}
//         <div className="flex items-center gap-[7.2px] px-[7.2px] py-[5.4px] rounded-[90px] self-start">
//           <div className="w-[14px] h-[14px] bg-[#334454] rounded-[3px]" />
//           <span className="text-[16.2px] font-sans font-normal uppercase tracking-[-0.32px] text-black">
//             WHY CHOOSE US
//           </span>
//         </div>

//         {/* Main Heading Row */}
//         <div className="flex justify-between items-end w-full gap-[50px]">
//           <h2 className="font-roundo font-medium text-[45px] leading-[45px] tracking-[-0.9px] text-[#1A1A1A] max-w-[512px] capitalize">
//             Proven Trust Value Modern Homes Leader
//           </h2>
//           <p className="font-sans font-normal text-[20px] leading-[21.8px] tracking-[-0.44px] text-black/60 max-w-[558px]">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.
//           </p>
//         </div>
//       </div>

//       {/* ── Feature Cards (Accordion Effect) ── */}
//       <div className="w-full max-w-[1280px] flex justify-center gap-[10px]">
//         {cards.map((card, i) => {
//           const isActive = activeCard === i;
          
//           return (
//           <div
//             key={i}
//             onMouseEnter={() => setActiveCard(i)}
//             style={{ width: isActive ? '458px' : '400px', height: '352.5px', padding: '37.5px' }}
//             className={`relative rounded-[8px] overflow-hidden transition-all duration-700 ease-in-out cursor-pointer flex-shrink-0`}
//           >
//             {/* Background Image */}
//             <Image
//               src={card.img}
//               alt={card.title}
//               fill
//               className={`object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-100'}`}
//             />
//             {/* Dark Overlay */}
//             <div className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-black/50' : 'bg-black/40'}`} />

//             {/* Content Container — centers the inner block in the card */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               {/* Inner content: 342×277.5 spec, gap 14px, icon→title→desc */}
//               <div className="w-[342px] min-h-[277.5px] flex flex-col gap-[14px]">
//                 {/* White Icon Box — 46×46, border-radius 5px, padding 6px */}
//                 <div className="w-[46px] h-[46px] bg-white rounded-[5px] p-[6px] flex items-center justify-center shadow-lg flex-shrink-0">
//                   <div className="text-[#334454] flex items-center justify-center w-full h-full">
//                     {card.icon}
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <h3 className="font-roundo font-medium text-[33px] leading-[37.95px] tracking-[-0.66px] text-white">
//                   {card.title}
//                 </h3>

//                 {/* Description — visible on hover */}
//                 <p className={`font-sans font-normal text-[15px] leading-[22.5px] text-white/80 transition-opacity duration-500 delay-100 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}>
//                   {card.desc}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )})}
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;


// -------------------------------------------

// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';

// /*
//   CLAMP FORMULA:
//   vw = (maxVal - minVal) / (maxViewport - minViewport) * 100
//   Viewport range: 375px (mobile) → 1920px (4xl)

//   Key Figma values (at 1440px / 3xl):
//   - Section padding V: 60px     → clamp(28px, 3.125vw, 60px)
//   - Section padding H: 80px     → clamp(16px, 4.167vw, 80px)
//   - Section gap:       60px     → clamp(28px, 3.125vw, 60px)
//   - Section height:    628px    → auto (let content define it)

//   Badge:
//   - gap/px/py:  7.2px/5.4px    → clamp(4px, 0.375vw, 7.2px)
//   - dot size:   14px            → clamp(9px, 0.729vw, 14px)
//   - text:       16.2px          → clamp(11px, 0.844vw, 16.2px)

//   Heading row:
//   - gap:        50px            → clamp(20px, 2.604vw, 50px)
//   - h2:         45px            → clamp(24px, 2.344vw, 45px)
//   - h2 max-w:   512px           → clamp(260px, 26.67vw, 512px)
//   - p:          20px            → clamp(13px, 1.042vw, 20px)
//   - p max-w:    558px           → clamp(280px, 29.063vw, 558px)

//   Cards:
//   - gap:        10px            → clamp(6px, 0.521vw, 10px)
//   - card h:     352.5px         → clamp(220px, 18.359vw, 352.5px)
//   - card pad:   37.5px          → clamp(18px, 1.953vw, 37.5px)
//   - card w collapsed: 400px    → clamp(240px, 20.833vw, 400px)
//   - card w active: 458px       → clamp(280px, 23.854vw, 458px)

//   Card content:
//   - inner w:    342px           → clamp(200px, 17.813vw, 342px)
//   - inner min-h:277.5px         → clamp(160px, 14.453vw, 277.5px)
//   - inner gap:  14px            → clamp(8px, 0.729vw, 14px)
//   - icon box:   46px            → clamp(30px, 2.396vw, 46px)
//   - icon pad:   6px             → clamp(4px, 0.313vw, 6px)
//   - title:      33px            → clamp(18px, 1.719vw, 33px)
//   - title lh:   37.95px         → clamp(21px, 1.977vw, 37.95px)
//   - desc:       15px            → clamp(11px, 0.781vw, 15px)
//   - desc lh:    22.5px          → clamp(16px, 1.172vw, 22.5px)
// */

// const WhyChooseUs = () => {
//   const [activeCard, setActiveCard] = useState(null);

//   const cards = [
//     {
//       img: '/dummyimages/Container.png',
//       icon: <Image src="/icons/Vector.svg" alt="Design icon" width={25} height={25} />,
//       title: 'Design-Driven, Modern Approach',
//       desc: 'With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships.',
//     },
//     {
//       img: '/dummyimages/Container.png',
//       icon: <Image src="/icons/692885226ea01d367379ce40_Frame.svg.svg" alt="Expertise icon" width={25} height={25} />,
//       title: 'Proven Expertise & Trusted Network',
//       desc: 'With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships.',
//     },
//     {
//       img: '/dummyimages/Overlay.png',
//       icon: <Image src="/icons/healthicons_people-outline.svg" alt="People icon" width={25} height={25} />,
//       title: 'Client-Centric, Seamless Experience',
//       desc: 'With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships.',
//     },
//   ];

//   return (
//     <section
//       className="w-full bg-[#EDE7DE] flex flex-col items-center overflow-hidden"
//       style={{
//         paddingTop:    'clamp(28px, 3.125vw, 60px)',
//         paddingBottom: 'clamp(28px, 3.125vw, 60px)',
//         paddingLeft:   'clamp(16px, 4.167vw, 80px)',
//         paddingRight:  'clamp(16px, 4.167vw, 80px)',
//         gap:           'clamp(28px, 3.125vw, 60px)',
//       }}
//     >

//       {/* ── Top Header ─────────────────────────────────────────────────── */}
//       <div
//         className="w-full max-w-[1280px] flex flex-col"
//         style={{ gap: 'clamp(12px, 1.25vw, 24px)' }}
//       >

//         {/* Badge */}
//         <div
//           className="flex items-center self-start rounded-[90px]"
//           style={{
//             gap:           'clamp(4px, 0.375vw, 7.2px)',
//             paddingLeft:   'clamp(4px, 0.375vw, 7.2px)',
//             paddingRight:  'clamp(4px, 0.375vw, 7.2px)',
//             paddingTop:    'clamp(3px, 0.281vw, 5.4px)',
//             paddingBottom: 'clamp(3px, 0.281vw, 5.4px)',
//           }}
//         >
//           <div
//             className="bg-[#334454] flex-shrink-0"
//             style={{
//               width:        'clamp(9px, 0.729vw, 14px)',
//               height:       'clamp(9px, 0.729vw, 14px)',
//               borderRadius: 'clamp(2px, 0.156vw, 3px)',
//             }}
//           />
//           <span
//             className="font-sans font-normal uppercase text-black"
//             style={{
//               fontSize:      'clamp(11px, 0.844vw, 16.2px)',
//               letterSpacing: 'clamp(-0.22px, -0.017vw, -0.32px)',
//             }}
//           >
//             WHY CHOOSE US
//           </span>
//         </div>

//         {/* Heading row */}
//         <div
//           className="flex flex-col lg:flex-row lg:justify-between lg:items-end w-full"
//           style={{ gap: 'clamp(12px, 2.604vw, 50px)' }}
//         >
//           <h2
//             className="font-roundo font-medium text-[#1A1A1A] capitalize"
//             style={{
//               fontSize:      'clamp(24px, 2.344vw, 45px)',
//               lineHeight:    1.0,
//               letterSpacing: 'clamp(-0.48px, -0.047vw, -0.9px)',
//               maxWidth:      'clamp(260px, 26.667vw, 512px)',
//             }}
//           >
//             Proven Trust Value Modern Homes Leader
//           </h2>
//           <p
//             className="font-sans font-normal text-black/60"
//             style={{
//               fontSize:      'clamp(13px, 1.042vw, 20px)',
//               lineHeight:    'clamp(15px, 1.135vw, 21.8px)',
//               letterSpacing: 'clamp(-0.26px, -0.023vw, -0.44px)',
//               maxWidth:      'clamp(280px, 29.063vw, 558px)',
//             }}
//           >
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//             tempor incididunt ut labore et dolore magna aliqua ut enim.
//           </p>
//         </div>
//       </div>

//       {/* ── Feature Cards ──────────────────────────────────────────────── */}
//       <div
//         className="w-full max-w-[1920px] flex flex-col lg:flex-row justify-center"
//         style={{ gap: 'clamp(6px, 0.521vw, 10px)' }}
//       >
//         {cards.map((card, i) => {
//           const isActive = activeCard === i;

//           return (
//             <div
//               key={i}
//               onMouseEnter={() => setActiveCard(i)}
//               onMouseLeave={() => setActiveCard(null)}
//               className="relative rounded-[8px] overflow-hidden transition-all duration-700 ease-in-out cursor-pointer flex-shrink-0"
//               style={{
//                 width:   isActive
//                   ? 'clamp(280px, 23.854vw, 458px)'
//                   : 'clamp(240px, 20.833vw, 400px)',
//                 height:   'clamp(220px, 18.359vw, 352.5px)',
//                 padding:  'clamp(18px, 1.953vw, 37.5px)',
//                 // On mobile stack to full width
//                 ...(typeof window !== 'undefined' && window.innerWidth < 1024
//                   ? { width: '100%' }
//                   : {}),
//               }}
//             >
//               {/* Background image */}
//               <Image
//                 src={card.img}
//                 alt={card.title}
//                 fill
//                 className={`object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-100'}`}
//               />

//               {/* Overlay */}
//               <div
//                 className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-black/50' : 'bg-black/40'}`}
//               />

//               {/* Card content */}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div
//                   className="flex flex-col"
//                   style={{
//                     width:     'clamp(200px, 17.813vw, 342px)',
//                     minHeight: 'clamp(160px, 14.453vw, 277.5px)',
//                     gap:       'clamp(8px, 0.729vw, 14px)',
//                   }}
//                 >
//                   {/* Icon box */}
//                   <div
//                     className="bg-white flex items-center justify-center shadow-lg flex-shrink-0"
//                     style={{
//                       width:        'clamp(30px, 2.396vw, 46px)',
//                       height:       'clamp(30px, 2.396vw, 46px)',
//                       borderRadius: 'clamp(3px, 0.26vw, 5px)',
//                       padding:      'clamp(4px, 0.313vw, 6px)',
//                     }}
//                   >
//                     <div className="text-[#334454] flex items-center justify-center w-full h-full">
//                       {card.icon}
//                     </div>
//                   </div>

//                   {/* Title */}
//                   <h3
//                     className="font-roundo font-medium text-white"
//                     style={{
//                       fontSize:      'clamp(18px, 1.719vw, 33px)',
//                       lineHeight:    'clamp(21px, 1.977vw, 37.95px)',
//                       letterSpacing: 'clamp(-0.36px, -0.034vw, -0.66px)',
//                     }}
//                   >
//                     {card.title}
//                   </h3>

//                   {/* Description — fades in on hover */}
//                   <p
//                     className={`font-sans font-normal text-white/80 transition-opacity duration-500 delay-100 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}
//                     style={{
//                       fontSize:   'clamp(11px, 0.781vw, 15px)',
//                       lineHeight: 'clamp(16px, 1.172vw, 22.5px)',
//                     }}
//                   >
//                     {card.desc}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//     </section>
//   );
// };

// export default WhyChooseUs;


// -------------new code-----------------------

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

/*
 * ─── CLAMP REFERENCE ────────────────────────────────────────────────────────
 *
 *  Formula : preferred_vw = (MAX_px - MIN_px) / (1920 - 375) * 100
 *  Viewport range: 375px (mobile) → 1920px (4xl)
 *
 *  All base values taken from the 3xl/1440px fixed design spec.
 *  MIN values chosen for comfortable mobile readability.
 *
 *  SECTION
 *  py                  : clamp(40px,   2.59vw,  80px)    [40→80]
 *  px                  : clamp(20px,   5.18vw, 106px)    [20→106]
 *  gap                 : clamp(30px,   2.59vw,  60px)    [30→60]
 *  max-w               : clamp(560px,  82.9vw,1280px)
 *
 *  HEADER gap          : clamp(14px,   0.78vw,  24px)    [14→24]
 *
 *  Badge px/py/gap     : clamp(5px,    0.47vw,   7.2px)  / clamp(3.5px,0.35vw,5.4px) / clamp(5px,0.47vw,7.2px)
 *  Badge dot size      : clamp(10px,   0.26vw,  14px)
 *  Badge dot radius    : clamp(2px,    0.065vw,  3px)
 *  Badge font          : clamp(12px,   0.27vw,  16.2px)
 *
 *  Heading row gap     : clamp(20px,   1.94vw,  50px)    [20→50]
 *  Heading font        : clamp(28px,   1.1vw,   45px)    [28→45]
 *  Heading lead        : clamp(28px,   1.1vw,   45px)
 *  Heading tracking    : clamp(-0.5px,-0.026vw,-0.9px)
 *  Heading max-w       : clamp(280px,  16.6vw, 512px)
 *
 *  Para font           : clamp(14px,   0.39vw,  20px)    [14→20]
 *  Para lead           : clamp(18px,   0.24vw,  21.8px)
 *  Para tracking       : clamp(-0.28px,-0.01vw,-0.44px)
 *  Para max-w          : clamp(300px,  16.9vw, 558px)
 *
 *  CARDS gap           : clamp(6px,    0.26vw,  10px)    [6→10]
 *  Card active w       : clamp(280px,  12.5vw, 458px)    [280→458]
 *  Card inactive w     : clamp(240px,  10.9vw, 400px)    [240→400]
 *  Card height         : clamp(220px,  9.7vw,  352.5px)  [220→352.5]
 *  Card padding        : clamp(20px,   1.13vw, 37.5px)   [20→37.5]
 *  Card radius         : clamp(6px,    0.13vw,  8px)
 *
 *  Icon box size       : clamp(32px,   0.91vw,  46px)    [32→46]
 *  Icon box radius     : clamp(3px,    0.13vw,   5px)
 *  Icon box padding    : clamp(4px,    0.13vw,   6px)
 *
 *  Inner w             : clamp(200px,  13.4vw, 342px)    [200→342]
 *  Inner min-h         : clamp(160px,   7.6vw, 277.5px)  [160→277.5]
 *  Inner gap           : clamp(10px,   0.26vw,  14px)
 *
 *  Title font          : clamp(22px,   0.71vw,  33px)    [22→33]
 *  Title lead          : clamp(26px,   0.77vw,  37.95px)
 *  Title tracking      : clamp(-0.44px,-0.014vw,-0.66px)
 *
 *  Desc font           : clamp(12px,   0.19vw,  15px)    [12→15]
 *  Desc lead           : clamp(18px,   0.29vw,  22.5px)
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

const STATIC_CARDS = [
  {
    img: '/dummyimages/Container.png',
    icon: <Image src="/icons/Vector.svg" alt="Design icon" width={25} height={25} />,
    title: 'Design-Driven, Modern Approach',
    desc: 'With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships.',
  },
  {
    img: '/dummyimages/Container.png',
    icon: <Image src="/icons/692885226ea01d367379ce40_Frame.svg.svg" alt="Expertise icon" width={25} height={25} />,
    title: 'Proven Expertise & Trusted Network',
    desc: 'With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships.',
  },
  {
    img: '/dummyimages/Overlay.png',
    icon: <Image src="/icons/healthicons_people-outline.svg" alt="People icon" width={25} height={25} />,
    title: 'Client-Centric, Seamless Experience',
    desc: 'With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships.',
  },
];

const ICONS = [
  <Image key="0" src="/icons/Vector.svg" alt="Design icon" width={25} height={25} />,
  <Image key="1" src="/icons/692885226ea01d367379ce40_Frame.svg.svg" alt="Expertise icon" width={25} height={25} />,
  <Image key="2" src="/icons/healthicons_people-outline.svg" alt="People icon" width={25} height={25} />,
];

const WhyChooseUs = ({ chooseUs }) => {
  const [activeCard, setActiveCard] = useState(1);
  const mobileCardRefs = useRef([]);

  // Mobile: reveal a card's content automatically once the user scrolls to
  // it (crosses the middle of the viewport), instead of requiring a tap.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = mobileCardRefs.current.indexOf(entry.target);
            if (idx !== -1) setActiveCard(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    mobileCardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const cards = chooseUs
    ? [chooseUs.card1, chooseUs.card2, chooseUs.card3].map((c, i) => ({
        img: c?.image || STATIC_CARDS[i].img,
        icon: ICONS[i],
        title: c?.heading || STATIC_CARDS[i].title,
        desc: c?.subheading || STATIC_CARDS[i].desc,
      }))
    : STATIC_CARDS;

  return (
    <section
      className="w-full bg-[#EDE7DE] flex flex-col items-center overflow-hidden"
      style={{
        paddingTop:    'clamp(40px, 4.17vw, 60px)',
        paddingBottom: 'clamp(40px, 4.17vw, 60px)',
        paddingLeft:   'clamp(20px, 5.56vw, 80px)',
        paddingRight:  'clamp(20px, 5.56vw, 80px)',
        gap:           'clamp(30px, 4.17vw, 60px)',
      }}
    >

      {/* ══ Top Header — desktop/tablet (>= sm) ══════════════════════════ */}
      <div
        className="hidden sm:flex w-full flex-col items-center"
        style={{
          maxWidth: 'clamp(375px, 90vw, 1920px)',
          gap:      'clamp(14px, 1.04vw, 15px)',
        }}
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
          <span
            className="font-sans font-normal uppercase text-[#334454] flex items-center justify-center"
            style={{
              fontSize:      'clamp(10px, 0.83vw, 16px)',
              letterSpacing: 'clamp(-0.24px, -0.02vw, -0.32px)',
              lineHeight:    1,
            }}
          >
            WHY CHOOSE US
          </span>
        </div>

        {/* Heading row */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-end w-full"
          style={{ height: 'clamp(60px, 6.25vw, 90px)' }}
        >
          <h2
            className="font-roundo font-medium text-[#1A1A1A] capitalize m-0 flex items-center"
            style={{
              fontSize:      'clamp(28px, 3.13vw, 58px)',
              lineHeight:    'clamp(28px, 3.13vw, 45px)',
              letterSpacing: 'clamp(-0.5px, -0.06vw, -0.9px)',
              width:         'clamp(280px, 35.56vw, 592.08px)',
              height:        'clamp(40px, 6.25vw, 90px)'
            }}
          >
            Proven Trust Value Modern Homes Leader
          </h2>

          <p
            className="font-sans font-normal text-black/60 m-0 flex items-center"
            style={{
              fontSize:      'clamp(14px, 1.39vw, 22px)',
              lineHeight:    'clamp(18px, 1.51vw, 21.8px)',
              letterSpacing: 'clamp(-0.28px, -0.03vw, -0.44px)',
              width:         'clamp(300px, 38.75vw, 558px)',
              height:        'clamp(40px, 4.58vw, 66px)'
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.
          </p>
        </div>
      </div>

      {/* ══ Top Header — mobile (< sm)
          Figma frame: 390×1115.8  padding:40/22/40/22
            Header block: 346.5×173 gap:10 → badge(20) + subblock(346.5×143 gap:6)
            Title: 346.5×74  Roundo 500 32px/36.6px ls:-0.73px
            Desc:  346.5×63  Geist 400 14px/21px
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="sm:hidden w-full flex flex-col"
        style={{ gap: 'clamp(9px, 2.564vw, 11px)' }}
      >
        {/* Badge */}
        <div
          className="flex items-center rounded-[90px]"
          style={{
            height: 'clamp(18px, 5.128vw, 22px)',
            gap:    'clamp(4px, 1.026vw, 8px)',
          }}
        >
          <div
            className="bg-[#334454] rounded-[2px] flex-shrink-0"
            style={{ width: '10px', height: '10px' }}
          />
          <span
            className="font-sans font-normal uppercase text-black flex items-center"
            style={{ fontSize: '12px', letterSpacing: '-0.24px' }}
          >
            WHY CHOOSE US
          </span>
        </div>

        {/* Title + description */}
        <div className="flex flex-col" style={{ gap: 'clamp(5px, 1.538vw, 7px)' }}>
          <h2
            className="font-roundo font-medium text-[#1A1A1A] capitalize m-0"
            style={{
              fontSize:      'clamp(29px, 8.205vw, 35px)',
              lineHeight:    'clamp(33px, 9.385vw, 40px)',
              letterSpacing: '-0.73px',
            }}
          >
            Proven Trust Value Modern Homes Leader
          </h2>
          <p
            className="font-sans font-normal text-black/60 m-0"
            style={{ fontSize: '14px', lineHeight: '21px' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.
          </p>
        </div>
      </div>

      {/* ══ Feature Cards (Accordion) — desktop/tablet (>= sm) ═══════════ */}
      <div
        className="hidden sm:flex w-full flex-col md:flex-row justify-center"
        style={{
          gap: 'clamp(6px, 0.69vw, 10px)',
        }}
      >
        {cards.map((card, i) => {
          const isActive = activeCard === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(1)}
              className="relative rounded-[8px] overflow-hidden transition-all duration-700 ease-in-out cursor-pointer flex-shrink-0"
              style={{
                width:        isActive ? 'clamp(280px, 31.81vw, 4658px)' : 'clamp(240px, 27.78vw, 600px)',
                height:       'clamp(280px, 24.48vw, 452.5px)',
                padding:      'clamp(20px, 2.6vw, 37.5px)',
                borderRadius: 'clamp(6px, 0.56vw, 8px)',
              }}
            >
              {/* Background image */}
              <Image
                src={card.img}
                alt={card.title}
                fill
                className={`object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-100'}`}
              />

              {/* Dark overlay */}
              <div
                className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-black/50' : 'bg-black/40'}`}
              />

              {/* Content */}
              <div 
                className="absolute inset-0 flex items-center justify-start"
                style={{ padding: 'clamp(20px, 2.6vw, 37.5px)' }}
              >
                <div
                  className="flex flex-col"
                  style={{
                    width:   'clamp(200px, 23.75vw, 342px)',
                    minHeight:'clamp(160px, 19.27vw, 277.5px)',
                    gap:     'clamp(10px, 0.97vw, 14px)',
                  }}
                >
                  {/* Icon box */}
                  <div
                    className="bg-[#EDE7DE] flex items-center justify-center shadow-lg flex-shrink-0"
                    style={{
                      width:        'clamp(32px, 3.19vw, 46px)',
                      height:       'clamp(32px, 3.19vw, 46px)',
                      borderRadius: 'clamp(3px, 0.35vw, 5px)',
                      padding:      'clamp(4px, 0.42vw, 6px)',
                    }}
                  >
                    <div className="text-[#334454] flex items-center justify-center w-full h-full">
                      {card.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-roundo font-medium text-white m-0 flex items-center"
                    style={{
                      fontSize:      'clamp(22px, 2.29vw, 33px)',
                      lineHeight:    'clamp(26px, 2.64vw, 37.95px)',
                      letterSpacing: 'clamp(-0.44px, -0.05vw, -0.66px)',
                      minHeight:     'clamp(50px, 5.35vw, 77px)'
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`font-sans font-normal text-white/80 transition-opacity duration-500 delay-100 pointer-events-none m-0 flex items-center ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      fontSize:   'clamp(12px, 1.04vw, 15px)',
                      lineHeight: 'clamp(18px, 1.56vw, 22.5px)',
                      minHeight:  'clamp(70px, 7.85vw, 113px)'
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ══ Feature Cards — mobile (< sm)
          Figma: cards container 360×842.8 gap:10.22 (bleeds slightly wider
          than the header block, hence the negative side margin below)
            Each card ("image" frame): 360×274.12225341796875
              padding: 28/29/28/29.48  gap:7.86  radius:6.29
              → inner content div: 305.307861328125×218.1222686767578 gap:11
                → icon: 36.157203674316406² radius:3.93 padding:4.72
                → title: 305.307861328125×60.524017333984375
                  Roundo 500 24px/29.83px ls:-0.52px
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="sm:hidden w-full flex flex-col"
        style={{
          gap:         'clamp(9px, 2.621vw, 11px)',
          marginLeft:  'clamp(-8px, -1.714vw, -6px)',
          marginRight: 'clamp(-8px, -1.714vw, -6px)',
        }}
      >
        {cards.map((card, i) => {
          const isActive = activeCard === i;
          return (
            <div
              key={i}
              ref={(el) => { mobileCardRefs.current[i] = el; }}
              className="relative overflow-hidden transition-all duration-700 ease-in-out flex-shrink-0 w-full flex flex-col"
              style={{
                height:        '316.12px',
                paddingTop:    '28px',
                paddingRight:  '29px',
                paddingBottom: '28px',
                paddingLeft:   '29.48px',
                borderRadius:  '6.29px',
                gap:           '7.86px',
              }}
            >
              {/* Background image */}
              <Image
                src={card.img}
                alt={card.title}
                fill
                className={`object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-100'}`}
              />

              {/* Dark overlay */}
              <div
                className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-black/50' : 'bg-black/40'}`}
              />

              

              {/* Inner content div — slides up on click to make room for the
                  description (it's clipped by the card's overflow-hidden
                  otherwise, since it starts anchored near the bottom). */}
              <div
                className="relative flex flex-col transition-[margin-top] duration-700 ease-in-out"
                style={{
                  width: '305.31px',
                  maxWidth: '100%',
                  minHeight: '218.12px',
                  gap: '11px',
                  marginTop: isActive ? '20px' : 'clamp(160px, 15vw, 180px)',
                }}
              >
                {/* Icon box */}
              <div
                className="relative bg-[#32445333] flex items-center justify-center shadow-lg flex-shrink-0"
                style={{ width: '36.16px', height: '36.16px', borderRadius: '3.93px', padding: '4.72px' }}
              >
                <div className="text-[#EDE7DE] flex items-center justify-center w-full h-full" >
                  {card.icon}
                </div>
              </div>

                {/* Title */}
                <h3
                  className="font-roundo font-medium text-white m-0"
                  style={{
                    width:         '305.31px',
                    maxWidth:      '100%',
                    fontSize:      '24px',
                    lineHeight:    '29.83px',
                    letterSpacing: '-0.52px',
                  }}
                >
                  {card.title}
                </h3>

                {/* Description — slides up into view with the block above, fading in on tap */}
                <p
                  className={`font-sans font-normal text-white/80 transition-opacity duration-500 delay-150 m-0 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  style={{ fontSize: '15px', lineHeight: '22px' }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
