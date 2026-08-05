// 'use client';

// import React from 'react';
// import Image from 'next/image';

// /* ─── Team data ──────────────────────────────────────────────────────── */
// const TEAM = [
//   { id: 1, name: 'John Doe', designation: 'Designation', img: 'https://i.pravatar.cc/600?img=11' },
//   { id: 2, name: 'John Doe', designation: 'Designation', img: 'https://i.pravatar.cc/600?img=14' },
//   { id: 3, name: 'John Doe', designation: 'Designation', img: 'https://i.pravatar.cc/600?img=15' },
//   { id: 4, name: 'John Doe', designation: 'Designation', img: 'https://i.pravatar.cc/600?img=52' },
//   { id: 5, name: 'John Doe', designation: 'Designation', img: 'https://i.pravatar.cc/600?img=60' },
// ];

// /* ─── Team Card ──────────────────────────────────────────────────────── */
// const TeamCard = ({ member }) => (
//   <div className="
//     relative overflow-hidden group cursor-pointer flex-shrink-0
//     w-full aspect-[379/498] rounded-[8px]
//     lg:rounded-[8.1px]
//     xl:rounded-[10.1px]
//     3xl:rounded-[11.41px]
//     2xl:rounded-[12.1px]
//     4xl:rounded-[15.2px]
//   ">
//     <Image
//       src={member.img}
//       alt={member.name}
//       fill
//       className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
//     />
//     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

//     {/* Name & Designation */}
//     <div className="
//       absolute bottom-0 left-0 right-0 flex items-end justify-center
//       pb-[13.5px] lg:pb-[13.5px] xl:pb-[16.9px] 3xl:pb-[19.01px] 2xl:pb-[20.2px] 4xl:pb-[25.3px]
//     ">
//       <div className="
//         flex flex-col items-center
//         max-w-[195px] py-[6.7px] gap-[6.7px]
//         lg:max-w-[195px] lg:py-[6.7px] lg:gap-[6.7px]
//         xl:max-w-[244px] xl:py-[8.4px] xl:gap-[8.4px]
//         3xl:max-w-[274.75px] 3xl:py-[9.51px] 3xl:gap-[9.51px]
//         2xl:max-w-[292px] 2xl:py-[10.1px] 2xl:gap-[10.1px]
//         4xl:max-w-[366px] 4xl:py-[12.6px] 4xl:gap-[12.6px]
//       ">
//         <span className="
//           font-sans font-normal text-white text-center
//           text-[14.7px] leading-[16.2px] tracking-[-0.04px]
//           lg:text-[14.7px] lg:leading-[16.2px]
//           xl:text-[18.4px] xl:leading-[20.2px] xl:tracking-[-0.05px]
//           3xl:text-[20.72px] 3xl:leading-[22.82px] 3xl:tracking-[-0.06px]
//           2xl:text-[22px] 2xl:leading-[24.3px] 2xl:tracking-[-0.06px]
//           4xl:text-[27.6px] 4xl:leading-[30.4px] 4xl:tracking-[-0.08px]
//         ">
//           {member.name}
//         </span>
//         <span className="
//           font-sans font-normal text-white/75 text-center
//           text-[8.5px] leading-[9.5px]
//           lg:text-[8.5px] lg:leading-[9.5px]
//           xl:text-[10.6px] xl:leading-[11.8px]
//           3xl:text-[11.98px] 3xl:leading-[13.31px]
//           2xl:text-[12.7px] 2xl:leading-[14.1px]
//           4xl:text-[15.9px] 4xl:leading-[17.7px]
//         ">
//           {member.designation}
//         </span>
//       </div>
//     </div>
//   </div>
// );

// /* ─── Contact CTA Card ───────────────────────────────────────────────── */
// const ContactCard = () => (
//   <div className="
//     relative overflow-hidden flex-shrink-0 bg-[#334454]
//     w-full aspect-[379/498] rounded-[8px]
//     lg:rounded-[8.1px]
//     xl:rounded-[10.1px]
//     3xl:rounded-[11.41px]
//     2xl:rounded-[12.1px]
//     4xl:rounded-[15.2px]
//   ">
//     {/* Decorative blobs */}
//     <div className="absolute -top-12 -right-12 w-[240px] h-[240px] rounded-full bg-[#4a6070]/40" />
//     <div className="absolute top-24 -right-20 w-[200px] h-[200px] rounded-full bg-[#6B859E]/30" />
//     <div className="absolute -bottom-10 left-[30%] w-[160px] h-[160px] rounded-full bg-[#4a6070]/35" />

//     {/* Heading */}
//     <div className="
//       absolute
//       top-[112.8px] left-[22.9px] w-[178.9px]
//       lg:top-[112.8px] lg:left-[22.9px] lg:w-[178.9px]
//       xl:top-[141px] xl:left-[28.6px] xl:w-[223px]
//       3xl:top-[158.49px] 3xl:left-[32.25px] 3xl:w-[251.92px]
//       2xl:top-[168.8px] 2xl:left-[34.4px] 2xl:w-[268px]
//       4xl:top-[211px] 4xl:left-[43px] 4xl:w-[335px]
//     ">
//       <h3 className="
//         font-roundo font-medium capitalize text-[#EDE7DE]
//         text-[35.5px] leading-[42.6px] tracking-[-0.64px]
//         lg:text-[35.5px] lg:leading-[42.6px] lg:tracking-[-0.64px]
//         xl:text-[44.3px] xl:leading-[53.2px] xl:tracking-[-0.8px]
//         3xl:text-[50px] 3xl:leading-[60px] 3xl:tracking-[-0.9px]
//         2xl:text-[53.3px] 2xl:leading-[64px] 2xl:tracking-[-0.96px]
//         4xl:text-[66.6px] 4xl:leading-[80px] 4xl:tracking-[-1.2px]
//       ">
//         Wanna<br />Join?<br />Contact<br />Now.
//       </h3>
//     </div>

//     {/* Button */}
//     <div className="
//       absolute
//       top-[293.9px] left-[22.9px]
//       lg:top-[293.9px] lg:left-[22.9px]
//       xl:top-[367px] xl:left-[28.6px]
//       3xl:top-[413.82px] 3xl:left-[32.25px]
//       2xl:top-[440.7px] 2xl:left-[34.4px]
//       4xl:top-[551.3px] 4xl:left-[43px]
//     ">
//       <button className="
//         group relative flex items-center bg-[#6B859E] hover:bg-[#334454] transition-colors duration-500 overflow-hidden cursor-pointer border-none
//         w-[118.6px] h-[36.9px] rounded-[8.5px]
//         lg:w-[118.6px] lg:h-[36.9px] lg:rounded-[8.5px]
//         xl:w-[148.2px] xl:h-[46.1px] xl:rounded-[10.6px]
//         3xl:w-[167px] 3xl:h-[52px] 3xl:rounded-[12px]
//         2xl:w-[177.9px] 2xl:h-[55.4px] 2xl:rounded-[12.8px]
//         4xl:w-[222.6px] 4xl:h-[69.3px] 4xl:rounded-[16px]
//       ">
//         {/* Sliding text */}
//         <div className="
//           absolute overflow-hidden
//           top-[9.9px] left-[8.5px] w-[69px] h-[16.3px]
//           lg:top-[9.9px] lg:left-[8.5px] lg:w-[69px] lg:h-[16.3px]
//           xl:top-[12.4px] xl:left-[10.7px] xl:w-[86px] xl:h-[20.4px]
//           3xl:top-[14px] 3xl:left-[12px] 3xl:w-[97px] 3xl:h-[23px]
//           2xl:top-[14.9px] 2xl:left-[12.8px] 2xl:w-[103px] 2xl:h-[24.5px]
//           4xl:top-[18.6px] 4xl:left-[16px] 4xl:w-[129px] 4xl:h-[30.6px]
//         ">
//           <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
//             <span className="
//               font-sans font-medium text-white whitespace-nowrap flex items-center
//               text-[10.6px] h-[16.3px]
//               lg:text-[10.6px] lg:h-[16.3px]
//               xl:text-[13.3px] xl:h-[20.4px]
//               3xl:text-[15px] 3xl:h-[23px]
//               2xl:text-[16px] 2xl:h-[24.5px]
//               4xl:text-[20px] 4xl:h-[30.6px]
//             ">Learn More</span>
//             <span className="
//               font-sans font-medium text-white whitespace-nowrap flex items-center
//               text-[10.6px] h-[16.3px]
//               lg:text-[10.6px] lg:h-[16.3px]
//               xl:text-[13.3px] xl:h-[20.4px]
//               3xl:text-[15px] 3xl:h-[23px]
//               2xl:text-[16px] 2xl:h-[24.5px]
//               4xl:text-[20px] 4xl:h-[30.6px]
//             ">Learn More</span>
//           </div>
//         </div>

//         {/* Arrow box */}
//         <div className="
//           absolute bg-white group-hover:bg-[#EDE7DE] transition-colors duration-500 overflow-hidden
//           right-[8.5px] w-[21.3px] h-[21.3px] rounded-[5px]
//           lg:right-[8.5px] lg:w-[21.3px] lg:h-[21.3px] lg:rounded-[5px]
//           xl:right-[10.7px] xl:w-[26.6px] xl:h-[26.6px] xl:rounded-[6.2px]
//           3xl:right-[12px] 3xl:w-[30px] 3xl:h-[30px] 3xl:rounded-[7px]
//           2xl:right-[12.8px] 2xl:w-[32px] 2xl:h-[32px] 2xl:rounded-[7.4px]
//           4xl:right-[16px] 4xl:w-[40px] 4xl:h-[40px] 4xl:rounded-[9.3px]
//         ">
//           <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="
//               text-[#6B859E] transition-colors duration-500
//               w-[10px] h-[10px] lg:w-[10px] lg:h-[10px] xl:w-[12.5px] xl:h-[12.5px]
//               3xl:w-[14px] 3xl:h-[14px] 2xl:w-[15px] 2xl:h-[15px] 4xl:w-[18.6px] 4xl:h-[18.6px]
//             ">
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="
//               text-[#6B859E] transition-colors duration-500
//               w-[10px] h-[10px] lg:w-[10px] lg:h-[10px] xl:w-[12.5px] xl:h-[12.5px]
//               3xl:w-[14px] 3xl:h-[14px] 2xl:w-[15px] 2xl:h-[15px] 4xl:w-[18.6px] 4xl:h-[18.6px]
//             ">
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </div>
//         </div>
//       </button>
//     </div>
//   </div>
// );

// /* ─── Main TeamSection ───────────────────────────────────────────────── */
// const TeamSection = () => {
//   return (
//     <section className="w-full bg-[#EDE7DE] flex justify-center">
//       <div className="
//         w-full flex flex-col lg:flex-row items-start
//         px-[20px] py-[34px] gap-[30px]
//         md:px-[40px] md:py-[40px] md:gap-[35px]
//         lg:px-[58.3px] lg:py-[33.9px] lg:gap-[14.2px]
//         xl:py-[42.4px] xl:px-[72.8px] xl:gap-[17.7px]
//         3xl:py-[47.75px] 3xl:px-[82px] 3xl:gap-[20px]
//         2xl:py-[50.9px] 2xl:px-[87.4px] 2xl:gap-[21.3px]
//         4xl:py-[63.6px] 4xl:px-[109.3px] 4xl:gap-[26.6px]
//         sm:max-w-[80%] md:max-w-[85%] lg:max-w-[90%] xl:max-w-[92%] 2xl:max-w-[92%] 3xl:max-w-[96%] 4xl:max-w-[92%]
//         mx-auto
//       ">

//         {/* ══ LEFT: Sticky Sidebar ══════════════════════════════════════ */}
//         <aside className="
//           flex-shrink-0 flex flex-col
//           w-full gap-[18.4px] pt-0
//           lg:sticky lg:w-[299.7px] lg:gap-[18.4px] lg:pt-[34.1px]
//           xl:w-[374.5px] xl:gap-[23px] xl:pt-[42.6px]
//           3xl:w-[422px] 3xl:gap-[26px] 3xl:pt-[48px]
//           2xl:w-[449.7px] 2xl:gap-[27.7px] 2xl:pt-[51.2px]
//           4xl:w-[562.6px] 4xl:gap-[34.6px] 4xl:pt-[64px]
//           lg:top-[33.9px] xl:top-[42.4px] 3xl:top-[47.75px] 2xl:top-[50.9px] 4xl:top-[63.6px]
//         ">
//           {/* Badge */}
//           <div className="
//             flex items-center
//             gap-[5.1px] lg:gap-[5.1px] xl:gap-[6.4px] 3xl:gap-[7.2px] 2xl:gap-[7.7px] 4xl:gap-[9.6px]
//           ">
//             <div className="
//               bg-[#334454] flex-shrink-0
//               w-[9.9px] h-[9.9px] rounded-[2px]
//               lg:w-[9.9px] lg:h-[9.9px] lg:rounded-[2px]
//               xl:w-[12.4px] xl:h-[12.4px] xl:rounded-[2.5px]
//               3xl:w-[14px] 3xl:h-[14px] 3xl:rounded-[3px]
//               2xl:w-[14.9px] 2xl:h-[14.9px] 2xl:rounded-[3.2px]
//               4xl:w-[18.6px] 4xl:h-[18.6px] 4xl:rounded-[4px]
//             " />
//             <span className="
//               font-sans font-normal uppercase text-[#334454]
//               text-[11.5px] leading-[13.8px] tracking-[-0.23px]
//               lg:text-[11.5px] lg:leading-[13.8px] lg:tracking-[-0.23px]
//               xl:text-[14.3px] xl:leading-[17.2px] xl:tracking-[-0.28px]
//               3xl:text-[16.2px] 3xl:leading-[19.44px] 3xl:tracking-[-0.32px]
//               2xl:text-[17.2px] 2xl:leading-[20.7px] 2xl:tracking-[-0.34px]
//               4xl:text-[21.6px] 4xl:leading-[25.9px] 4xl:tracking-[-0.43px]
//             ">
//               Our Team
//             </span>
//           </div>

//           {/* Heading */}
//           <h2 className="
//             font-roundo font-medium capitalize text-[#1A1A1A]
//             text-[36px] leading-[36px] tracking-[-0.64px] w-full
//             lg:text-[42.6px] lg:leading-[42.6px] lg:tracking-[-0.64px] lg:w-[299.7px]
//             xl:text-[53.3px] xl:leading-[53.3px] xl:tracking-[-0.8px] xl:w-[374.5px]
//             3xl:text-[60px] 3xl:leading-[60px] 3xl:tracking-[-0.9px] 3xl:w-[422px]
//             2xl:text-[64px] 2xl:leading-[64px] 2xl:tracking-[-0.96px] 2xl:w-[449.7px]
//             4xl:text-[80px] 4xl:leading-[80px] 4xl:tracking-[-1.2px] 4xl:w-[562.6px]
//           ">
//             Peoples Builds This Firm
//           </h2>

//           {/* Sub-heading */}
//           <p className="
//             font-sans font-normal text-[#334454]/75
//             text-[14.9px] leading-[18.4px] tracking-[-0.27px] w-full
//             lg:text-[14.9px] lg:leading-[18.4px] lg:tracking-[-0.27px] lg:w-[262.7px]
//             xl:text-[17.7px] xl:leading-[21.8px] xl:tracking-[-0.33px] xl:w-[328.8px]
//             3xl:text-[20px] 3xl:leading-[24.7px] 3xl:tracking-[-0.38px] 3xl:w-[370px]
//             2xl:text-[21.3px] 2xl:leading-[26.3px] 2xl:tracking-[-0.4px] 2xl:w-[394.3px]
//             4xl:text-[26.6px] 4xl:leading-[32.9px] 4xl:tracking-[-0.5px] 4xl:w-[493px]
//           ">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.
//           </p>
//         </aside>

//         {/* ══ RIGHT: 2-col photo grid ═══════════════════════════════════ */}
//         <aside className="
//           flex-shrink-0 w-full
//           lg:w-[583.5px] xl:w-[729.3px] 3xl:w-[822px] 2xl:w-[875.8px] 4xl:w-[1097.3px]
//         ">
//           <div className="
//             grid grid-cols-2
//             gap-x-[16px] gap-y-[16px]
//             lg:gap-x-[45px] lg:gap-y-[31.2px]
//             xl:gap-x-[56.2px] xl:gap-y-[39px]
//             3xl:gap-x-[63.36px] 3xl:gap-y-[44px]
//             2xl:gap-x-[67.5px] 2xl:gap-y-[46.9px]
//             4xl:gap-x-[84.5px] 4xl:gap-y-[58.6px]
//           ">
//             {TEAM.map((member) => (
//               <TeamCard key={member.id} member={member} />
//             ))}
//             {/* 6th slot: Contact CTA */}
//             <ContactCard />
//           </div>
//         </aside>

//       </div>
//     </section>
//   );
// };

// export default TeamSection;

// ----------------------------------------------------------------

'use client';

import React from 'react';
import Image from 'next/image';

/*
 * ─── CLAMP REFERENCE ────────────────────────────────────────────────────────
 *
 *  Formula : preferred_vw = (MAX_px - MIN_px) / (1920 - 375) * 100
 *  Viewport range: 375px (mobile) → 1920px (4xl)
 *
 *  Section px            : clamp(20px,   5.82vw, 109.3px)
 *  Section py            : clamp(34px,   1.91vw,  63.6px)
 *  Section gap           : clamp(16px,   0.8vw,   26.6px)  [lg+ row gap]
 *
 *  Aside left width      : clamp(299.7px,16.9vw, 562.6px)
 *  Aside left pt         : clamp(34.1px,  1.94vw, 64px)
 *  Aside left gap        : clamp(18.4px,  1.05vw, 34.6px)
 *  Aside top (sticky)    : clamp(33.9px,  1.94vw, 63.6px)
 *
 *  Aside right width     : clamp(583.5px, 33.1vw,1097.3px)
 *
 *  Badge dot size        : clamp(9.9px,   0.56vw, 18.6px)
 *  Badge dot radius      : clamp(2px,     0.13vw,   4px)
 *  Badge gap             : clamp(5.1px,   0.29vw,   9.6px)
 *  Badge font            : clamp(11.5px,  0.65vw,  21.6px)
 *  Badge lead            : clamp(13.8px,  0.78vw,  25.9px)
 *  Badge tracking        : clamp(-0.23px,-0.013vw,-0.43px)
 *
 *  Heading font          : clamp(36px,    2.85vw,  80px)
 *  Heading lead          : clamp(36px,    2.85vw,  80px)
 *  Heading tracking      : clamp(-0.64px,-0.036vw,-1.2px)
 *  Heading width (lg+)   : same as aside-left width
 *
 *  Para font             : clamp(14.9px,  0.76vw,  26.6px)
 *  Para lead             : clamp(18.4px,  0.94vw,  32.9px)
 *  Para tracking         : clamp(-0.27px,-0.015vw, -0.5px)
 *  Para width (lg+)      : clamp(262.7px,14.9vw,  493px)
 *
 *  Grid gap-x            : clamp(16px,    2.52vw,  84.5px)
 *  Grid gap-y            : clamp(16px,    1.73vw,  58.6px)
 *
 *  Card radius           : clamp(8px,     0.46vw,  15.2px)
 *  Card name font        : clamp(14.7px,  0.84vw,  27.6px)
 *  Card name lead        : clamp(16.2px,  0.92vw,  30.4px)
 *  Card desig font       : clamp(8.5px,   0.48vw,  15.9px)
 *  Card desig lead       : clamp(9.5px,   0.53vw,  17.7px)
 *  Card pb               : clamp(13.5px,  0.76vw,  25.3px)
 *  Card inner max-w      : clamp(195px,   11.1vw,  366px)
 *  Card inner py/gap     : clamp(6.7px,   0.38vw,  12.6px)
 *
 *  CTA heading top       : clamp(112.8px, 6.4vw,  211px)
 *  CTA heading left      : clamp(22.9px,  1.3vw,   43px)
 *  CTA heading width     : clamp(178.9px,10.2vw,  335px)
 *  CTA heading font      : clamp(35.5px,  2.01vw,  66.6px)
 *  CTA heading lead      : clamp(42.6px,  2.41vw,  80px)
 *  CTA heading tracking  : clamp(-0.64px,-0.036vw,-1.2px)
 *
 *  CTA btn top           : clamp(293.9px,16.7vw,  551.3px)
 *  CTA btn left          : clamp(22.9px,  1.3vw,   43px)
 *  CTA btn width         : clamp(118.6px, 6.7vw,  222.6px)
 *  CTA btn height        : clamp(36.9px,  2.1vw,   69.3px)
 *  CTA btn radius        : clamp(8.5px,   0.49vw,  16px)
 *
 *  CTA text top          : clamp(9.9px,   0.57vw,  18.6px)
 *  CTA text left         : clamp(8.5px,   0.49vw,  16px)
 *  CTA text width        : clamp(69px,    3.9vw,  129px)
 *  CTA text height       : clamp(16.3px,  0.92vw,  30.6px)
 *  CTA text font         : clamp(10.6px,  0.6vw,   20px)
 *
 *  CTA arrow right       : clamp(8.5px,   0.49vw,  16px)
 *  CTA arrow box size    : clamp(21.3px,  1.21vw,  40px)
 *  CTA arrow box radius  : clamp(5px,     0.28vw,   9.3px)
 *  CTA arrow svg size    : clamp(10px,    0.56vw,  18.6px)
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

/* ─── Team data ──────────────────────────────────────────────────────── */
const STATIC_TEAM = [
  { id: 1, name: 'John Doe', designation: 'Designation', img: '/dummyimages/8276099377b328194b10337a1dc6e4999a4103d5.png' },
  { id: 2, name: 'John Doe', designation: 'Designation', img: '/dummyimages/8276099377b328194b10337a1dc6e4999a4103d5.png' },
  { id: 3, name: 'John Doe', designation: 'Designation', img: '/dummyimages/8276099377b328194b10337a1dc6e4999a4103d5.png' },
  { id: 4, name: 'John Doe', designation: 'Designation', img: '/dummyimages/8276099377b328194b10337a1dc6e4999a4103d5.png' },
  { id: 5, name: 'John Doe', designation: 'Designation', img: '/dummyimages/8276099377b328194b10337a1dc6e4999a4103d5.png' },
];

/* ─── Shared Arrow SVG ───────────────────────────────────────────────── */
const ArrowSVG = () => (
  <svg
    viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    className="text-black"
    style={{ width: 'clamp(10px, 1.56vw, 28px)', height: 'clamp(10px, 1.56vw, 28px)' }}
  >
    <path d="M5 12h18M18 5l7 7-7 7" />
  </svg>
);

/* ─── Team Card ──────────────────────────────────────────────────────── */
const TeamCard = ({ member }) => (
  <div
    className="relative overflow-hidden group cursor-pointer flex-shrink-0 w-full aspect-[379/498]"
    style={{ borderRadius: 'clamp(8px, 0.79vw, 15.2px)' }}  // 11.4px @ 1440 → 15.2px @ 1920
  >
    <Image
      src={member.img}
      alt={member.name}
      fill
      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 39%)' }} />

    {/* Name & Designation */}
    <div
      className="absolute bottom-0 left-0 right-0 flex items-end justify-center"
      style={{ paddingBottom: 'clamp(13.5px, 1.31vw, 25.3px)' }}  // 19px @ 1440 → 25.3px @ 1920
    >
      <div
        className="flex flex-col items-center"
        style={{
          maxWidth:      'clamp(195px, 19.08vw, 366px)',    // 274.75px @ 1440 → 366px @ 1920
          paddingTop:    'clamp(6.7px, 0.66vw, 12.6px)',
          paddingBottom: 'clamp(6.7px, 0.66vw, 12.6px)',
          gap:           'clamp(6.7px, 0.66vw, 12.6px)',
        }}
      >
        <span
          className="font-sans font-normal text-white text-center"
          style={{
            fontSize:      'clamp(14.7px, 1.44vw, 27.6px)', // 20.72px @ 1440 → 27.6px @ 1920
            lineHeight:    'clamp(16.2px, 1.58vw, 30.4px)',
            letterSpacing: 'clamp(-0.04px, -0.004vw, -0.08px)',
          }}
        >
          {member.name}
        </span>
        <span
          className="font-sans font-normal text-white/75 text-center"
          style={{
            fontSize:   'clamp(8.5px, 0.83vw, 15.9px)',  // 11.98px @ 1440 → 15.9px @ 1920
            lineHeight: 'clamp(9.5px, 0.92vw, 17.7px)',
          }}
        >
          {member.designation}
        </span>
      </div>
    </div>
  </div>
);

/* ─── Contact CTA Card ───────────────────────────────────────────────── */
const ContactCard = () => (
  <div
    className="relative overflow-hidden flex-shrink-0 bg-[#334454] w-full aspect-[379/498]"
    style={{ borderRadius: 'clamp(8px, 0.79vw, 15.2px)' }}
  >
    {/* Decorative blobs */}
    <div className="absolute -top-12 -right-12 w-[240px] h-[240px] rounded-full bg-[#4a6070]/40" />
    <div className="absolute top-24 -right-20 w-[200px] h-[200px] rounded-full bg-[#6B859E]/30" />
    <div className="absolute -bottom-10 left-[30%] w-[160px] h-[160px] rounded-full bg-[#4a6070]/35" />

    {/* Heading */}
    <div
      className="absolute"
      style={{
        top:   'clamp(112.8px, 12.01vw, 271px)',    // 158.49px @ 1440 → 211px @ 1920
        left:  'clamp(22.9px, 2.24vw, 43px)',       // 32.25px @ 1440 → 43px @ 1920
        width: 'clamp(178.9px, 17.49vw, 335px)',    // 251.92px @ 1440 → 335px @ 1920
      }}
    >
      <h3
        className="font-roundo font-medium capitalize text-[#EDE7DE] m-0"
        style={{
          fontSize:      'clamp(35.5px, 3.47vw, 66.6px)', // 50px @ 1440 → 66.6px @ 1920
          lineHeight:    'clamp(42.6px, 4.17vw, 80px)',
          letterSpacing: 'clamp(-0.64px, -0.036vw, -1.2px)',
        }}
      >
        Lorum Ipsum?<br />Dolor Sit<br />Amet.
      </h3>
    </div>

    {/* Button */}
    <div
      className="absolute"
      style={{
        top:  'clamp(293.9px, 29.74vw, 591.3px)', // 413.82px @ 1440 → 551.3px @ 1920
        left: 'clamp(22.9px, 2.24vw, 43px)',
      }}
    >
      <button
        className="group relative flex items-center justify-center bg-[#6B859E] hover:bg-[#334454] transition-colors duration-500 overflow-hidden cursor-pointer border-none"
        style={{
          width:        'clamp(118.6px, 11.6vw, 222.6px)', // 167px @ 1440 → 222.6px @ 1920
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
  </div>
);

/* ─── Main TeamSection ───────────────────────────────────────────────── */
const TeamSection = ({ ourTeam }) => {
  const TEAM = ourTeam
    ? ['card1', 'card2', 'card3', 'card4', 'card5'].map((key, i) => {
        const c = ourTeam[key];
        return {
          id: i + 1,
          name: c?.name || STATIC_TEAM[i].name,
          designation: c?.designation || STATIC_TEAM[i].designation,
          img: c?.image || STATIC_TEAM[i].img,
        };
      })
    : STATIC_TEAM;
  return (
  <section className="hidden md:flex w-full bg-[#EDE7DE] justify-center">
    <div
      className="w-full flex flex-col lg:flex-row lg:items-start lg:justify-between"
      style={{
        paddingLeft:   'clamp(20px, 5.69vw, 109.3px)',
        paddingRight:  'clamp(20px, 5.69vw, 109.3px)',
        paddingTop:    'clamp(34px, 3.32vw, 63.6px)',
        paddingBottom: 'clamp(34px, 3.32vw, 63.6px)',
        gap:           'clamp(14px, 1.3vw, 26.6px)',
      }}
    >

      {/* ══ LEFT: Sticky Sidebar ════════════════════════════════════════ */}
      <aside
        className="flex-shrink-0 flex flex-col w-full lg:w-[clamp(260px,29.31vw,562.6px)] lg:sticky"
        style={{
          gap:        'clamp(18.4px, 1.81vw, 34.6px)',
          paddingTop: 'clamp(0px, 3.33vw, 64px)',
          top:        0,
          alignSelf:  'flex-start',
              borderTop: "1px solid rgba(34, 47, 48, 0.1)",
              // borderLeft: "1px solid rgba(34, 47, 48, 0.1)",
              // borderRight: "1px solid rgba(34, 47, 48, 0.1)",
              borderBottom: "none",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
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
            OUR TEAM
          </span>
        </div>

        {/* Heading + Sub-heading — side-by-side on tablet (md–lg), stacked
            in the sticky sidebar column on lg+ (original layout) */}
        <div
          className="flex flex-col md:flex-row md:items-start md:justify-between lg:flex-col w-full"
          style={{ gap: 'clamp(14px, 1.3vw, 34.6px)' }}
        >
          <h2
            className="font-roundo font-medium capitalize text-[#1A1A1A] m-0"
            style={{
              fontSize:      'clamp(36px, 4.17vw, 80px)',  // 60px @ 1440 → 80px @ 1920
              lineHeight:    'clamp(36px, 4.17vw, 80px)',
              letterSpacing: 'clamp(-0.64px, -0.078vw, -1.2px)',
            }}
          >
            Peoples Builds<br/>This Firm
          </h2>

          {/* Sub-heading */}
          <p
            className="font-sans font-normal text-[#334454]/75 m-0"
            style={{
              fontSize:      'clamp(14.9px, 1.39vw, 26.6px)', // 20px @ 1440 → 26.6px @ 1920
              lineHeight:    'clamp(18.4px, 1.72vw, 32.9px)',
              letterSpacing: 'clamp(-0.27px, -0.03vw, -0.5px)',
              maxWidth:      'clamp(262px, 26.88vw, 493px)',   // 370px @ 1440 → 493px @ 1920
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.
          </p>
        </div>
      </aside>

      {/* ══ RIGHT: 2-col photo grid ══════════════════════════════════════ */}
      <aside className="flex-shrink-0 w-full lg:w-auto">
        <div
          className="grid grid-cols-2 w-full lg:w-[clamp(300px,57.08vw,1097.3px)]"
          style={{
            columnGap: 'clamp(16px, 2.4vw, 44.5px)',      // 63.36px @ 1440 → 84.5px @ 1920
            rowGap:    'clamp(16px, 3.06vw, 58.6px)',      // 44px @ 1440 → 58.6px @ 1920
            paddingTop: 'clamp(0px, 3.33vw, 64px)',
              borderTop: "1px solid rgba(34, 47, 48, 0.1)",
              // borderLeft: "1px solid rgba(34, 47, 48, 0.1)",
              // borderRight: "1px solid rgba(34, 47, 48, 0.1)",
              borderBottom: "none",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
          }}
        >
          {TEAM.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
          <ContactCard />
        </div>
      </aside>

    </div>
  </section>
  );
};

export default TeamSection;
