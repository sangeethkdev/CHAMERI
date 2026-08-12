// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';

// const VillaPlansSection = () => {
//   const [activeTab, setActiveTab] = useState('villas');

//   return (
//     <section 
//       className="
//         w-full bg-[#EDE7DE] flex justify-center overflow-hidden
//         py-[40px] px-[20px] min-h-[600px]
//         md:py-[50px] md:px-[40px] md:min-h-[700px]
//         lg:py-[55px] lg:px-[60px] lg:min-h-[800px]
//         xl:py-[60px] xl:px-[76px] xl:min-h-[900px]
//         3xl:py-[60px] 3xl:px-[76px] 3xl:min-h-[980.92px]
//         2xl:py-[65px] 2xl:px-[80px] 2xl:min-h-[1050px]
//         4xl:py-[80px] 4xl:px-[100px] 4xl:min-h-[1300px]
//       "
//     >
//       <div 
//         className="
//           flex flex-col items-center w-full
//           gap-[12px]
//           md:gap-[14px]
//           lg:gap-[15px]
//           xl:gap-[16px] xl:max-w-[1150px]
//           3xl:gap-[17px] 3xl:max-w-[1284.9px]
//           2xl:gap-[18px] 2xl:max-w-[1370px]
//           4xl:gap-[22px] 4xl:max-w-[1710px]
//           sm:max-w-[80%]    
//           md:max-w-[85%]    
//           lg:max-w-[90%]    
//           xl:max-w-[92%]    
//           2xl:max-w-[94%]   
//           3xl:max-w-[96%]   
//           4xl:max-w-[98%]
//         "
//       >
//         <div 
//           className="
//             flex flex-col items-center justify-center w-full
//             h-[100px] gap-[8px]
//             md:h-[110px] md:gap-[10px]
//             lg:h-[115px] lg:gap-[12px]
//             xl:h-[120px] xl:gap-[14px]
//             3xl:h-[124px] 3xl:gap-[16px]
//             2xl:h-[132px] 2xl:gap-[18px]
//             4xl:h-[165px] 4xl:gap-[20px]
//           "
//         >
//           <h2 className="
//             font-roundo font-medium text-black text-center m-0
//             text-[36px] leading-[40px] tracking-[-1px]
//             md:text-[44px] md:leading-[48px] md:tracking-[-1.5px]
//             lg:text-[50px] lg:leading-[54px] lg:tracking-[-2px]
//             xl:text-[56px] xl:leading-[60px] xl:tracking-[-2.5px]
//             3xl:text-[60px] 3xl:leading-[66.14px] 3xl:tracking-[-3.05px]
//             2xl:text-[64px] 2xl:leading-[70px] 2xl:tracking-[-3.2px]
//             4xl:text-[80px] 4xl:leading-[88px] 4xl:tracking-[-4px]
//           ">
//             Luxury Villa Plans
//           </h2>
//           <p className="
//             font-sans font-normal text-black/60 text-center m-0
//             text-[14px] leading-[20px] max-w-[300px]
//             md:text-[16px] md:leading-[22px] md:max-w-[350px]
//             lg:text-[18px] lg:leading-[24px] lg:max-w-[400px]
//             xl:text-[19px] xl:leading-[25px] xl:max-w-[420px]
//             3xl:text-[20px] 3xl:leading-[26.4px] 3xl:max-w-[440px]
//             2xl:text-[22px] 2xl:leading-[28px] 2xl:max-w-[470px]
//             4xl:text-[26px] 4xl:leading-[34px] 4xl:max-w-[580px]
//           ">
//             Explore crafted villa spaces with modern comfort built beautifully
//           </p>
//         </div>

//         <div 
//           className="
//             relative w-full overflow-hidden
//             rounded-[10px] h-[400px]
//             md:rounded-[12px] md:h-[500px]
//             lg:rounded-[14px] lg:h-[600px]
//             xl:rounded-[15px] xl:h-[680px]
//             3xl:rounded-[16px] 3xl:h-[719.92px]
//             2xl:rounded-[18px] 2xl:h-[760px]
//             4xl:rounded-[22px] 4xl:h-[960px]
//             sm:max-w-[80%]    
//             md:max-w-[85%]    
//             lg:max-w-[90%]    
//             xl:max-w-[92%]    
//             2xl:max-w-[94%]   
//             3xl:max-w-[96%]   
//             4xl:max-w-[98%] 
//           "
//         >
//           <Image
//             src={activeTab === 'villas' ? "/dummyimages/Overlay.png" : "/dummyimages/Frame 2121454280.png"}
//             alt="Luxury Villa Plan"
//             fill
//             className="object-cover transition-all duration-700"
//           />

//           <div className="
//             absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center
//             top-[20px] gap-[8px] w-[95%] max-w-[387.74px]
//             md:top-[28px] md:gap-[10px]
//             lg:top-[26px] lg:gap-[9.3px] lg:w-[258px]
//             xl:top-[33px] xl:gap-[11.6px] xl:w-[323px]
//             3xl:top-[37.5px] 3xl:gap-[13px] 3xl:w-[363.5px]
//             2xl:top-[40px] 2xl:gap-[14px] 2xl:w-[387.74px]
//             4xl:top-[50px] 4xl:gap-[17.5px] 4xl:w-[484px]
//           ">
//             <button
//               onClick={() => setActiveTab('villas')}
//               className={`flex items-center justify-center transition-all border-none cursor-pointer flex-1 lg:flex-none
//                 py-[8px] px-[12px] rounded-[6px] h-[36px]
//                 md:py-[10px] md:px-[15px] md:rounded-[7px] md:h-[42px]
//                 lg:py-[8.3px] lg:px-[13px] lg:rounded-[5.5px] lg:w-[121px] lg:h-[32.5px]
//                 xl:py-[10.4px] xl:px-[16.2px] xl:rounded-[6.9px] xl:w-[151px] xl:h-[40.6px]
//                 3xl:py-[11.7px] 3xl:px-[18.2px] 3xl:rounded-[7.8px] 3xl:w-[170px] 3xl:h-[45.6px]
//                 2xl:py-[12.53px] 2xl:px-[19.49px] 2xl:rounded-[8.35px] 2xl:w-[181.9px] 2xl:h-[48.72px]
//                 4xl:py-[15.6px] 4xl:px-[24.3px] 4xl:rounded-[10.4px] 4xl:w-[227px] 4xl:h-[61px]
//                 ${activeTab === 'villas' ? 'bg-[#334454] text-white shadow-lg gap-[6px] md:gap-[8px] lg:gap-[9.3px] xl:gap-[11.6px] 3xl:gap-[13px] 2xl:gap-[13.92px] 4xl:gap-[17.4px]' : 'bg-[#6B859E] text-white/90 hover:bg-[#5b738a] gap-0'}
//               `}
//             >
//               <div 
//                 className={`bg-white transition-all duration-300 overflow-hidden rounded-[2px] flex-shrink-0
//                   h-[10px] md:h-[12px]
//                   lg:h-[9.6px] xl:h-[12px] 3xl:h-[13.5px] 2xl:h-[14.4px] 4xl:h-[18px]
//                   ${activeTab === 'villas' 
//                     ? 'w-[10px] md:w-[12px] lg:w-[9.6px] xl:w-[12px] 3xl:w-[13.5px] 2xl:w-[14.4px] 4xl:w-[18px] opacity-100' 
//                     : 'w-0 opacity-0'}
//                 `} 
//               />
//               <span className="
//                 font-sans font-normal whitespace-nowrap
//                 text-[13px] leading-[13px]
//                 md:text-[15px] md:leading-[15px]
//                 lg:text-[13px] lg:leading-[13px]
//                 xl:text-[16.2px] xl:leading-[16.2px]
//                 3xl:text-[18.2px] 3xl:leading-[18.2px]
//                 2xl:text-[19.49px] 2xl:leading-[19.49px]
//                 4xl:text-[24.3px] 4xl:leading-[24.3px]
//               ">
//                 Kiwano Villas
//               </span>
//             </button>

//             <button
//               onClick={() => setActiveTab('villaments')}
//               className={`flex items-center justify-center transition-all border-none cursor-pointer flex-1 lg:flex-none
//                 py-[8px] px-[12px] rounded-[6px] h-[36px]
//                 md:py-[10px] md:px-[13px] md:rounded-[7px] md:h-[42px]
//                 lg:py-[8.3px] lg:px-[9.3px] lg:rounded-[5.5px] lg:w-[128px] lg:h-[32.5px]
//                 xl:py-[10.4px] xl:px-[11.6px] xl:rounded-[6.9px] xl:w-[160px] xl:h-[40.6px]
//                 3xl:py-[11.7px] 3xl:px-[13px] 3xl:rounded-[7.8px] 3xl:w-[180px] 3xl:h-[45.6px]
//                 2xl:py-[12.53px] 2xl:px-[13.92px] 2xl:rounded-[8.35px] 2xl:w-[191.84px] 2xl:h-[48.72px]
//                 4xl:py-[15.6px] 4xl:px-[17.4px] 4xl:rounded-[10.4px] 4xl:w-[240px] 4xl:h-[61px]
//                 ${activeTab === 'villaments' ? 'bg-[#334454] text-white shadow-lg gap-[6px] md:gap-[8px] lg:gap-[9.3px] xl:gap-[11.6px] 3xl:gap-[13px] 2xl:gap-[13.92px] 4xl:gap-[17.4px]' : 'bg-[#6B859E] text-white/90 hover:bg-[#5b738a] gap-0'}
//               `}
//             >
//               <div 
//                 className={`bg-white transition-all duration-300 overflow-hidden rounded-[2px] flex-shrink-0
//                   h-[10px] md:h-[12px]
//                   lg:h-[9.6px] xl:h-[12px] 3xl:h-[13.5px] 2xl:h-[14.4px] 4xl:h-[18px]
//                   ${activeTab === 'villaments' 
//                     ? 'w-[10px] md:w-[12px] lg:w-[9.6px] xl:w-[12px] 3xl:w-[13.5px] 2xl:w-[14.4px] 4xl:w-[18px] opacity-100' 
//                     : 'w-0 opacity-0'}
//                 `} 
//               />
//               <span className="
//                 font-sans font-normal whitespace-nowrap
//                 text-[13px] leading-[13px]
//                 md:text-[15px] md:leading-[15px]
//                 lg:text-[13px] lg:leading-[13px]
//                 xl:text-[16.2px] xl:leading-[16.2px]
//                 3xl:text-[18.2px] 3xl:leading-[18.2px]
//                 2xl:text-[19.49px] 2xl:leading-[19.49px]
//                 4xl:text-[24.3px] 4xl:leading-[24.3px]
//               ">
//                 Kiwano Villaments
//               </span>
//             </button>
//           </div>

//           <div 
//             className="
//               absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent
//               py-[24px] rounded-[10px]
//               md:py-[28px] md:rounded-[12px]
//               lg:py-[32px] lg:rounded-[14px]
//               xl:py-[35px] xl:rounded-[15px]
//               3xl:py-[37.79px] 3xl:rounded-[15.12px]
//               2xl:py-[40px] 2xl:rounded-[18px]
//               4xl:py-[50px] 4xl:rounded-[22px]
//             "
//           >
//             <div 
//               className="
//                 flex flex-col items-center justify-end
//                 w-[300px] max-w-full gap-[12px]
//                 md:w-[350px] md:gap-[14px]
//                 lg:w-[390px] lg:gap-[16px]
//                 xl:w-[410px] xl:gap-[18px]
//                 3xl:w-[425.15px] 3xl:gap-[18.97px]
//                 2xl:w-[450px] 2xl:gap-[20px]
//                 4xl:w-[570px] 4xl:gap-[25px]
//               "
//             >
//               <div 
//                 className="
//                   flex items-center justify-center
//                   h-[60px] w-[350px]
//                   md:h-[65px] md:w-[450px]
//                   lg:h-[70px] lg:w-[500px]
//                   xl:h-[75px] xl:w-[540px]
//                   3xl:h-[79px] 3xl:w-[575.74px]
//                   2xl:h-[84px] 2xl:w-[610px]
//                   4xl:h-[105px] 4xl:w-[760px]
//                 "
//               >
//                 <p
//                   className="
//                     text-center text-white font-sans font-normal m-0 flex items-center justify-center
//                     text-[15px] leading-[1.3] w-[340px]
//                     md:text-[17px] md:leading-[1.3] md:w-[440px]
//                     lg:text-[18px] lg:leading-[1.3] lg:w-[490px]
//                     xl:text-[19px] xl:leading-[1.3] xl:w-[530px]
//                     3xl:text-[20px] 3xl:leading-[19.6px] 3xl:tracking-[-0.06px] 3xl:w-[575.03px]
//                     2xl:text-[21px] 2xl:leading-[21px] 2xl:tracking-[-0.07px] 2xl:w-[600px]
//                     4xl:text-[26px] 4xl:leading-[26px] 4xl:tracking-[-0.08px] 4xl:w-[750px]
//                   "
//                 >
//                   Discover crafted living spaces where modern design meets timeless comfort for every family with smart layouts bright views and premium details built to inspire daily today always now us
//                 </p>
//               </div>

//               <button 
//                 className="
//                   group relative flex items-center justify-center bg-[#6B859E] hover:bg-[#334454] transition-colors duration-500 overflow-hidden cursor-pointer border-none
//                   rounded-[8px] w-[130px] h-[40px]
//                   md:rounded-[10px] md:w-[140px] md:h-[45px]
//                   lg:rounded-[11px] lg:w-[150px] lg:h-[48px]
//                   xl:rounded-[11px] xl:w-[160px] xl:h-[50px]
//                   3xl:rounded-[12px] 3xl:w-[167px] 3xl:h-[52px]
//                   2xl:rounded-[13px] 2xl:w-[178px] 2xl:h-[56px]
//                   4xl:rounded-[16px] 4xl:w-[222px] 4xl:h-[69px]
//                 "
//               >
//                 {/* Sliding text container */}
//                 <div className="
//                   absolute overflow-hidden
//                   top-[11px] left-[10px] w-[80px] h-[18px]
//                   md:top-[12px] md:left-[11px] md:w-[85px] md:h-[20px]
//                   lg:top-[13px] lg:left-[11px] lg:w-[90px] lg:h-[21px]
//                   xl:top-[14px] xl:left-[11px] xl:w-[95px] xl:h-[22px]
//                   3xl:top-[14.5px] 3xl:left-[12px] 3xl:w-[97px] 3xl:h-[23px]
//                   2xl:top-[15px] 2xl:left-[13px] 2xl:w-[105px] 2xl:h-[25px]
//                   4xl:top-[19px] 4xl:left-[16px] 4xl:w-[130px] 4xl:h-[30px]
//                 ">
//                   <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
//                     <span className="
//                       font-sans font-medium text-white whitespace-nowrap flex items-center
//                       h-[18px] text-[13px]
//                       md:h-[20px] md:text-[14px]
//                       lg:h-[21px] lg:text-[14.5px]
//                       xl:h-[22px] xl:text-[15px]
//                       3xl:h-[23px] 3xl:text-[15px]
//                       2xl:h-[25px] 2xl:text-[16px]
//                       4xl:h-[30px] 4xl:text-[20px]
//                     ">
//                       Learn More
//                     </span>
//                     <span className="
//                       font-sans font-medium text-white whitespace-nowrap flex items-center
//                       h-[18px] text-[13px]
//                       md:h-[20px] md:text-[14px]
//                       lg:h-[21px] lg:text-[14.5px]
//                       xl:h-[22px] xl:text-[15px]
//                       3xl:h-[23px] 3xl:text-[15px]
//                       2xl:h-[25px] 2xl:text-[16px]
//                       4xl:h-[30px] 4xl:text-[20px]
//                     ">
//                       Learn More
//                     </span>
//                   </div>
//                 </div>

//                 {/* Arrow icon box */}
//                 <div className="
//                   absolute bg-white group-hover:bg-[#EDE7DE] transition-colors duration-500 overflow-hidden
//                   right-[8px] w-[24px] h-[24px] rounded-[5px]
//                   md:right-[10px] md:w-[26px] md:h-[26px] md:rounded-[6px]
//                   lg:right-[11px] lg:w-[28px] lg:h-[28px] lg:rounded-[6px]
//                   xl:right-[11px] xl:w-[28px] xl:h-[28px] xl:rounded-[7px]
//                   3xl:right-[12px] 3xl:w-[30px] 3xl:h-[30px] 3xl:rounded-[7px]
//                   2xl:right-[13px] 2xl:w-[32px] 2xl:h-[32px] 2xl:rounded-[8px]
//                   4xl:right-[16px] 4xl:w-[40px] 4xl:h-[40px] 4xl:rounded-[10px]
//                 ">
//                   <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="
//                       text-[#6B859E] group-hover:text-[#4a6074] transition-colors duration-500
//                       w-[12px] h-[12px]
//                       md:w-[13px] md:h-[13px]
//                       lg:w-[14px] lg:h-[14px]
//                       xl:w-[14px] xl:h-[14px]
//                       3xl:w-[14px] 3xl:h-[14px]
//                       2xl:w-[15px] 2xl:h-[15px]
//                       4xl:w-[18px] 4xl:h-[18px]
//                     ">
//                       <path d="M5 12h14M12 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                   <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="
//                       text-[#6B859E] group-hover:text-[#4a6074] transition-colors duration-500
//                       w-[12px] h-[12px]
//                       md:w-[13px] md:h-[13px]
//                       lg:w-[14px] lg:h-[14px]
//                       xl:w-[14px] xl:h-[14px]
//                       3xl:w-[14px] 3xl:h-[14px]
//                       2xl:w-[15px] 2xl:h-[15px]
//                       4xl:w-[18px] 4xl:h-[18px]
//                     ">
//                       <path d="M5 12h14M12 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VillaPlansSection;

// -------------------------------------------------------

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* The CTA follows whichever tab is showing, so "Learn More" always lands on the
   project the visitor is actually looking at. */
const TAB_ROUTES = {
  villas:     '/kiwano',
  villaments: '/kiwano-villament',
};

/*
 * ─── CLAMP REFERENCE ────────────────────────────────────────────────────────
 *
 *  Formula : preferred_vw = (MAX_px - MIN_px) / (1920 - 375) * 100
 *  Viewport range: 375px (mobile) → 1920px (4xl)
 *
 *  Section py        : clamp(40px,  2.59vw, 80px)
 *  Section px        : clamp(20px,  5.18vw, 100px)
 *  Section min-h     : clamp(600px, 45.3vw, 1300px)
 *
 *  Container gap     : clamp(12px,  0.65vw, 22px)
 *  Container max-w   : clamp(80%,   6vw + 70%, 98%)  → inline style
 *
 *  Header height     : clamp(100px, 4.19vw, 165px)
 *  Header gap        : clamp(8px,   0.78vw, 20px)
 *
 *  Heading font      : clamp(36px,  2.91vw, 80px)
 *  Heading lead      : clamp(40px,  3.1vw,  88px)
 *  Heading tracking  : clamp(-1px, -0.19vw, -4px)
 *
 *  Para font         : clamp(14px,  0.78vw, 26px)
 *  Para lead         : clamp(20px,  0.91vw, 34px)
 *  Para max-w        : clamp(300px, 18.8vw, 580px)
 *
 *  Image height      : clamp(400px, 36.8vw, 960px)
 *  Image radius      : clamp(10px,  0.78vw, 22px)
 *
 *  Tab bar top       : clamp(20px,  1.94vw, 50px)
 *  Tab bar gap       : clamp(8px,   0.59vw, 17.5px)
 *  Tab bar width     : clamp(220px, 15.6vw, 484px)
 *
 *  Tab btn height    : clamp(36px,  1.62vw, 61px)
 *  Tab btn py        : clamp(8px,   0.52vw, 15.6px)
 *  Tab btn px        : clamp(12px,  0.78vw, 24.3px)
 *  Tab btn radius    : clamp(6px,   0.27vw, 10.4px)
 *  Tab btn font      : clamp(13px,  0.72vw, 24.3px)
 *  Tab dot size      : clamp(10px,  0.52vw, 18px)
 *
 *  Overlay py        : clamp(24px,  1.68vw, 50px)
 *  Desc width        : clamp(300px, 24.2vw, 750px)
 *  Desc font         : clamp(15px,  0.71vw, 26px)
 *  Desc gap          : clamp(12px,  0.84vw, 25px)
 *
 *  CTA width         : clamp(130px, 7.11vw, 222px)
 *  CTA height        : clamp(40px,  1.88vw, 69px)
 *  CTA radius        : clamp(8px,   0.52vw, 16px)
 *  CTA font          : clamp(13px,  0.46vw, 20px)
 *  Arrow box size    : clamp(24px,  1.04vw, 40px)
 *  Arrow box radius  : clamp(5px,   0.33vw, 10px)
 *  Arrow svg size    : clamp(12px,  0.39vw, 18px)
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

const VillaPlansSection = ({ villaPlan }) => {
  const [activeTab, setActiveTab] = useState('villas');

  const tab1Label = villaPlan?.card1?.heading || 'Kiwano Villas';
  const tab2Label = villaPlan?.card2?.heading || 'Kiwano Villament';
  const tab1Description = villaPlan?.card1?.description || 'Discover crafted living spaces where modern design meets timeless comfort for every family with smart layouts bright views and premium details built to inspire daily today always now us';
  const tab2Description = villaPlan?.card2?.description || 'Discover crafted living spaces where modern design meets timeless comfort for every family with smart layouts bright views and premium details built to inspire daily today always now us';
  const tab1Image = villaPlan?.card1?.image || '/dummyimages/Overlay.png';
  const tab2Image = villaPlan?.card2?.image || '/dummyimages/Frame 2121454280.png';
  const sectionHeading = villaPlan?.heading || 'Luxury Villa Plans';
  const sectionSubheading = villaPlan?.subheading || 'Explore crafted villa spaces with modern comfort built beautifully';

  return (
    <section
      className="villa-plans-section w-full bg-[#EDE7DE] flex justify-center overflow-hidden"
      style={{
        paddingTop:    'clamp(16px, 4.17vw, 60px)',
        paddingBottom: 'clamp(40px, 4.17vw, 60px)',
        paddingLeft:   'clamp(20px, 5.28vw, 76px)',
        paddingRight:  'clamp(20px, 5.28vw, 76px)',
        minHeight:     'clamp(600px, 68.12vw, 981px)',
      }}
    >
      {/* Mobile (< 640px) needs a fixed 11px side padding to match the Figma
          390-wide frame exactly (390 - 11*2 = 368px image width). The global
          reset in globals.css (`*{padding:0}`, unlayered) beats Tailwind's
          `@layer utilities` classes, so a plain px-[11px] class silently does
          nothing here — only `!important` inline-style overrides win. */}
      <style>{`
        @media (max-width: 639px) {
          .villa-plans-section {
            padding-left: 11px !important;
            padding-right: 11px !important;
          }
        }
      `}</style>
      {/* ── Fluid content container ─────────────────────────────────────── */}
      <div
        className="flex flex-col items-center w-full"
        style={{
          gap:      'clamp(12px, 1.18vw, 17px)',
          maxWidth: 'clamp(560px, 88vw, 96%)',
        }}
      >

        {/* ══════════════════════════════════════════════════════════════
            HEADER — title + subtitle
           ══════════════════════════════════════════════════════════════ */}
        <div
          className="flex flex-col items-center justify-center w-full"
          style={{
            height: 'clamp(100px, 8.61vw, 124px)',
            gap:    'clamp(8px, 1.11vw, 16px)',
          }}
        >
          <h2
            className="font-roundo font-medium text-[#000000] text-center m-0"
            style={{
              fontSize:      'clamp(32px, 4.17vw, 60px)',
              lineHeight:    'clamp(40px, 4.59vw, 66.14px)',
              letterSpacing: 'clamp(-1.5px, -0.21vw, -3.05px)',
              width:         'clamp(300px, 31.56vw, 520px)',
            }}
          >
            {sectionHeading}
          </h2>

          <p
            className="font-sans font-normal text-[#333333] text-center m-0"
            style={{
              fontSize:   'clamp(14px, 1.39vw, 20px)',
              lineHeight: 'clamp(20px, 1.83vw, 26.4px)',
              letterSpacing: 'clamp(-0.2px, -0.03vw, -0.44px)',
              width:      'clamp(300px, 30.56vw, 440px)',
            }}
          >
            {sectionSubheading}
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            IMAGE CARD
           ══════════════════════════════════════════════════════════════ */}
        <div
          className="relative w-full overflow-hidden rounded-[8px] sm:rounded-[clamp(8px,1vw,13.12px)] h-[539px] sm:h-[clamp(400px,49.99vw,820px)]"
        >
          <Image
            src={activeTab === 'villas' ? tab1Image : tab2Image}
            alt="Luxury Villa Plan"
            fill
            className="object-cover transition-all duration-700"
          />

          {/* ── Tab Toggle Bar ─────────────────────────────────────────── */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
            style={{
              top:   'clamp(20px, 2.62vw, 37.79px)',
              gap:   'clamp(8px, 0.97vw, 14px)',
              width: 'clamp(280px, 26.93vw, 387.74px)',
            }}
          >
            {/* Kiwano Villas tab */}
            <button
              onClick={() => setActiveTab('villas')}
              className={`flex items-center justify-center transition-all border-none cursor-pointer flex-none
                ${activeTab === 'villas'
                  ? 'bg-[#334454] text-white shadow-lg'
                  : 'bg-[#6B859E] text-white/90 hover:bg-[#5b738a]'}
              `}
              style={{
                width:        'clamp(120px, 12.33vw, 170.9px)',
                height:       'clamp(36px, 3.38vw, 48.72px)',
                paddingTop:   'clamp(8px, 0.87vw, 12.53px)',
                paddingBottom:'clamp(8px, 0.87vw, 12.53px)',
                paddingLeft:  'clamp(12px, 1.35vw, 19.49px)',
                paddingRight: 'clamp(12px, 1.35vw, 19.49px)',
                borderRadius: 'clamp(6px, 0.58vw, 8.35px)',
                gap: activeTab === 'villas' ? 'clamp(6px, 0.97vw, 13.92px)' : '0',
              }}
            >
              {/* Dot indicator */}
              <div
                className="bg-white transition-all duration-300 overflow-hidden rounded-[2px] flex-shrink-0"
                style={{
                  width:   activeTab === 'villas' ? 'clamp(6px, 0.69vw, 10px)' : '0',
                  height:  'clamp(6px, 0.69vw, 10px)',
                  opacity: activeTab === 'villas' ? 1 : 0,
                }}
              />
              <span
                className="font-sans font-normal whitespace-nowrap"
                style={{ fontSize: 'clamp(13px, 1.35vw, 19.49px)', lineHeight: 1 }}
              >
                {tab1Label}
              </span>
            </button>

            {/* Kiwano Villaments tab */}
            <button
              onClick={() => setActiveTab('villaments')}
              className={`flex items-center justify-center transition-all border-none cursor-pointer flex-none
                ${activeTab === 'villaments'
                  ? 'bg-[#334454] text-white shadow-lg'
                  : 'bg-[#6B859E] text-white/90 hover:bg-[#5b738a]'}
              `}
              style={{
                width:        'clamp(140px, 14.32vw, 230.84px)',
                height:       'clamp(36px, 3.38vw, 48.72px)',
                paddingTop:   'clamp(8px, 0.87vw, 12.53px)',
                paddingBottom:'clamp(8px, 0.87vw, 12.53px)',
                paddingLeft:  'clamp(19px, 2.67vw, 26.92px)',
                paddingRight: 'clamp(16px, 2.67vw, 26.92px)',
                borderRadius: 'clamp(6px, 0.58vw, 8.35px)',
                gap: activeTab === 'villaments' ? 'clamp(6px, 0.97vw, 13.92px)' : '0',
              }}
            >
              <div
                className="bg-white transition-all duration-300 overflow-hidden rounded-[2px] flex-shrink-0"
                style={{
                  width:   activeTab === 'villaments' ? 'clamp(6px, 0.69vw, 10px)' : '0',
                  height:  'clamp(6px, 0.69vw, 10px)',
                  opacity: activeTab === 'villaments' ? 1 : 0,
                }}
              />
              <span
                className="font-sans font-normal whitespace-nowrap"
                style={{ fontSize: 'clamp(13px, 1.35vw, 19.49px)', lineHeight: 1 }}
              >
                {tab2Label}
              </span>
            </button>
          </div>

          {/* ── Overlay — description + CTA ────────────────────────────── */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent"
            style={{
              paddingTop:    'clamp(24px, 2.62vw, 37.79px)',
              paddingBottom: 'clamp(24px, 2.62vw, 37.79px)',
              borderRadius:  'clamp(10px, 1.05vw, 15.12px)',
            }}
          >
            <div
              className="flex flex-col items-center justify-end"
              style={{
                width: 'clamp(300px, 39.94vw, 575.03px)',
                gap:   'clamp(12px, 1.32vw, 18.97px)',
              }}
            >
              {/* Description text */}
              <div 
                className="flex items-center justify-center"
                style={{ height: 'clamp(79px, 5.49vw, 79px)' }}
              >
                <p
                  className="text-center text-white font-sans font-normal m-0 flex items-center"
                  style={{
                    fontSize:  'clamp(15px, 1.39vw, 20px)',
                    lineHeight: 'clamp(18px, 1.36vw, 19.6px)',
                    letterSpacing: 'clamp(-0.02px, -0.004vw, -0.06px)',
                    width:     'clamp(300px, 39.93vw, 575.03px)',
                  }}
                >
                  {activeTab === 'villas' ? tab1Description : tab2Description}
                </p>
              </div>

              {/* CTA — a link, not a button: its destination tracks the active
                  tab, so Villas goes to /kiwano and Villaments to
                  /kiwano-villament. Styling is unchanged. */}
              <Link
                href={TAB_ROUTES[activeTab]}
                aria-label={`Learn more about ${activeTab === 'villas' ? tab1Label : tab2Label}`}
                className="group relative flex items-center justify-center no-underline bg-[#6B859E] hover:bg-[#334454] transition-colors duration-500 overflow-hidden cursor-pointer border-none flex-none"
                style={{
                  borderRadius: 'clamp(8px, 0.83vw, 12px)',
                  width:        'clamp(130px, 11.6vw, 167px)',
                  height:       'clamp(40px, 3.61vw, 52px)',
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
                    {['Learn More', 'Learn More'].map((label, i) => (
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
                      style={{ width: 'clamp(15px, 1.97vw, 20px)', height: 'clamp(15px, 1.97vw, 20px)' }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  {/* Arrow slide in */}
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
                    <svg
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className="text-[#000000]"
                      style={{ width: 'clamp(15px, 1.97vw, 20px)', height: 'clamp(15px, 1.97vw, 20px)' }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillaPlansSection;
