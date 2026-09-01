// 'use client';

// import React from 'react';
// import Image from 'next/image';

// const QUICK_LINKS = ['Home', 'About Us', 'Project', 'Service', 'Gallery', 'Contact Us'];

// const SOCIALS = [
//   {
//     label: 'Instagram',
//     svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg>,
//   },
//   {
//     label: 'Facebook',
//     svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
//   },
//   {
//     label: 'YouTube',
//     svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
//   },
//   {
//     label: 'Pinterest',
//     svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z" /></svg>,
//   },
// ];

// const Footer = () => {
//   return (
//     <footer className="w-full bg-[#334454] flex justify-center overflow-hidden">
//       <div className="
//         w-full mx-auto
//         sm:max-w-[80%] md:max-w-[85%] lg:max-w-[90%] xl:max-w-[92%] 2xl:max-w-[94%] 3xl:max-w-[96%] 4xl:max-w-[98%]
//       ">

//         {/* ── Main 2-column row ─────────────────────────────────────────── */}
//         <div className="flex flex-col md:flex-row w-full border-t border-white/10">

//           {/* ══ FIRST DIV — Logo panel ══════════════════════════════════ */}
//           {/* 3xl: w=431.25, h=375.98 */}
//           <div className="
//             relative flex-shrink-0 border-b border-white/10 md:border-b-0 md:border-r border-white/10
//             w-full h-[200px]
//             md:w-[30.6%] md:h-[267.6px]
//             lg:w-[30.6%] lg:h-[267.6px]
//             xl:w-[30.6%] xl:h-[334.1px]
//             3xl:w-[431.25px] 3xl:h-[375.98px]
//             2xl:w-[459.9px] 2xl:h-[401px]
//             4xl:w-[575px] 4xl:h-[501.3px]
//           ">
//             {/* Logo — 3xl: w=138 h=183, top=96.49 left=143.63 */}
//             <div className="
//               absolute
//               w-[78px] h-[104px] top-[34.4px] left-[50%] -translate-x-1/2
//               md:translate-x-0 md:left-auto
//               md:w-[98.1px] md:h-[130.1px] md:top-[68.6px] md:left-[102.1px]
//               lg:w-[98.1px] lg:h-[130.1px] lg:top-[68.6px] lg:left-[102.1px]
//               xl:w-[122.6px] xl:h-[162.7px] xl:top-[85.7px] xl:left-[127.7px]
//               3xl:w-[138px] 3xl:h-[183px] 3xl:top-[96.49px] 3xl:left-[143.63px]
//               2xl:w-[147.2px] 2xl:h-[195.2px] 2xl:top-[102.9px] 2xl:left-[153.2px]
//               4xl:w-[184px] 4xl:h-[244px] 4xl:top-[128.6px] 4xl:left-[191.5px]
//             ">
//               <a href="/" className="relative block w-full h-full cursor-pointer transition-opacity hover:opacity-80">
//                 <Image
//                   src="/dummyimages/logo (2).svg"
//                   alt="Chameri Logo"
//                   fill
//                   className="object-contain"
//                 />
//               </a>
//             </div>
//           </div>

//           {/* ══ SECOND DIV — Links + Social ═════════════════════════════ */}
//           {/* 3xl: w=1008, h=377.48, border all */}
//           <div className="
//             relative flex-1 border border-white/10
//             h-auto
//             md:h-[267.6px]
//             lg:h-[267.6px]
//             xl:h-[334.5px]
//             3xl:h-[377.48px]
//             2xl:h-[402.4px]
//             4xl:h-[503.3px]
//           ">

//             {/* Text content box — 3xl: top=46.25, left=73, gap=89 */}
//             {/* 3 columns: Quick Links | Address | Contact Us */}
//             <div className="
//               flex flex-col sm:flex-row flex-wrap
//               pt-[25px] pl-[20px] gap-[25px]
//               md:absolute md:flex-row md:flex-nowrap
//               md:top-[32.9px] md:left-[51.9px] md:gap-[45px] md:pt-0 md:pl-0
//               lg:top-[32.9px] lg:left-[51.9px] lg:gap-[45px]
//               xl:top-[41.1px] xl:left-[64.9px] xl:gap-[56px]
//               3xl:top-[46.25px] 3xl:left-[73px] 3xl:gap-[89px]
//               2xl:top-[49.3px] 2xl:left-[77.9px] 2xl:gap-[94.9px]
//               4xl:top-[61.7px] 4xl:left-[97.3px] 4xl:gap-[118.7px]
//             ">

//               {/* Quick Links — 3xl: w=179, h=204.5, gap=25 */}
//               <div className="
//                 flex flex-col
//                 gap-[17.8px]
//                 md:gap-[17.8px]
//                 xl:gap-[22.2px]
//                 3xl:gap-[25px] 3xl:w-[179px] 3xl:h-[204.5px]
//                 2xl:gap-[26.6px]
//                 4xl:gap-[33.3px]
//               ">
//                 <h3 className="
//                   font-roundo font-medium text-white
//                   text-[14.2px]
//                   lg:text-[14.2px]
//                   xl:text-[17.7px]
//                   3xl:text-[20px]
//                   2xl:text-[21.3px]
//                   4xl:text-[26.6px]
//                 ">Quick Links</h3>
//                 <div className="
//                   flex flex-col
//                   gap-[9.9px] lg:gap-[9.9px] xl:gap-[12.4px] 3xl:gap-[14px] 2xl:gap-[14.9px] 4xl:gap-[18.6px]
//                 ">
//                   {QUICK_LINKS.map((link) => (
//                     <a
//                       key={link}
//                       href="#"
//                       className="
//                         font-sans font-normal text-[#EDE7DE]/80 hover:text-white transition-colors
//                         text-[11.3px] leading-[10.1px]
//                         lg:text-[11.3px] lg:leading-[10.1px]
//                         xl:text-[14.2px] xl:leading-[12.6px]
//                         3xl:text-[16px] 3xl:leading-[12px]
//                         2xl:text-[17px]
//                         4xl:text-[21.3px]
//                       "
//                     >
//                       {link}
//                     </a>
//                   ))}
//                 </div>
//               </div>

//               {/* Address — 3xl: w=199.29, h=113, gap=20 */}
//               <div className="
//                 flex flex-col
//                 gap-[14.2px]
//                 lg:gap-[14.2px]
//                 xl:gap-[17.7px]
//                 3xl:gap-[20px] 3xl:w-[199.29px] 3xl:h-[113px]
//                 2xl:gap-[21.3px]
//                 4xl:gap-[26.6px]
//               ">
//                 <h3 className="
//                   font-roundo font-medium text-white
//                   text-[14.2px] lg:text-[14.2px] xl:text-[17.7px] 3xl:text-[20px] 2xl:text-[21.3px] 4xl:text-[26.6px]
//                 ">Address</h3>
//                 <a
//                   href="#"
//                   className="
//                     font-sans font-normal text-[#EDE7DE]/80 hover:text-white transition-colors
//                     text-[10.6px] leading-[1.6]
//                     lg:text-[10.6px]
//                     xl:text-[13.3px]
//                     3xl:text-[15px]
//                     2xl:text-[16px]
//                     4xl:text-[20px]
//                     max-w-[141.6px] lg:max-w-[141.6px] xl:max-w-[177px] 3xl:max-w-[199.29px] 2xl:max-w-[212.4px] 4xl:max-w-[265.7px]
//                   "
//                 >
//                   #27/205, Madapeedika, Paral (PO), Thalasserry, Kannur, Kerala, 670601
//                 </a>
//               </div>

//               {/* Contact Us — 3xl: w=199.29, h=97, gap=20 */}
//               <div className="
//                 flex flex-col
//                 gap-[14.2px]
//                 lg:gap-[14.2px]
//                 xl:gap-[17.7px]
//                 3xl:gap-[20px] 3xl:w-[199.29px] 3xl:h-[97px]
//                 2xl:gap-[21.3px]
//                 4xl:gap-[26.6px]
//               ">
//                 <h3 className="
//                   font-roundo font-medium text-white
//                   text-[14.2px] lg:text-[14.2px] xl:text-[17.7px] 3xl:text-[20px] 2xl:text-[21.3px] 4xl:text-[26.6px]
//                 ">Contact Us</h3>
//                 <div className="
//                   flex flex-col
//                   gap-[7.1px] lg:gap-[7.1px] xl:gap-[8.9px] 3xl:gap-[10px] 2xl:gap-[10.6px] 4xl:gap-[13.3px]
//                 ">
//                   {['+91 91889 13114', '+91 91889 13114'].map((num, i) => (
//                     <a
//                       key={i}
//                       href="tel:+919188913114"
//                       className="
//                         font-sans font-normal text-[#EDE7DE]/80 hover:text-white transition-colors
//                         text-[10.6px] lg:text-[10.6px] xl:text-[13.3px] 3xl:text-[15px] 2xl:text-[16px] 4xl:text-[20px]
//                       "
//                     >
//                       {num}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Social Icons — 3xl: w=146 h=30 top=315 left=795.82 gap=14 */}
//             {/* bottom = 377.48 - 315 - 30 = 32.48px from bottom at 3xl */}
//             <div className="
//               flex items-center mt-[20px] ml-[20px] mb-[25px]
//               gap-[9.9px]
//               md:absolute md:mt-0 md:ml-0 md:mb-0
//               md:bottom-[23.1px] md:right-[47.1px] md:gap-[9.9px]
//               lg:bottom-[23.1px] lg:right-[47.1px] lg:gap-[9.9px]
//               xl:bottom-[28.9px] xl:right-[58.8px] xl:gap-[12.4px]
//               3xl:bottom-[32.48px] 3xl:right-[66.18px] 3xl:gap-[14px]
//               2xl:bottom-[34.6px] 2xl:right-[70.6px] 2xl:gap-[14.9px]
//               4xl:bottom-[43.3px] 4xl:right-[88.3px] 4xl:gap-[18.7px]
//             ">
//               {SOCIALS.map(({ label, svg }) => (
//                 <a
//                   key={label}
//                   href="#"
//                   aria-label={label}
//                   className="
//                     text-[#EDE7DE] hover:text-white hover:scale-110 transition-all flex items-center justify-center flex-shrink-0
//                     w-[15.6px] h-[15.2px]
//                     lg:w-[15.6px] lg:h-[15.2px]
//                     xl:w-[19.5px] xl:h-[19px]
//                     3xl:w-[22px] 3xl:h-[21.3px]
//                     2xl:w-[23.5px] 2xl:h-[22.7px]
//                     4xl:w-[29.3px] 4xl:h-[28.4px]
//                   "
//                 >
//                   {svg}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── Copyright bar ─────────────────────────────────────────────── */}
//         <div className="
//           flex justify-end items-center border-t border-white/10
//           py-[14px] lg:py-[14px] xl:py-[17px] 3xl:py-[19px] 2xl:py-[20px] 4xl:py-[25px]
//         ">
//           <a
//             href="#"
//             className="
//               font-sans font-normal text-[#EDE7DE]/80 hover:text-white transition-colors
//               text-[8.5px] lg:text-[8.5px] xl:text-[10.6px] 3xl:text-[12px] 2xl:text-[12.8px] 4xl:text-[16px]
//             "
//           >
//             © Chameri Builders pvt limited
//           </a>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;

// -----------------------------------------------

// 'use client';

// import React from 'react';
// import Image from 'next/image';

// /*
//   CLAMP FORMULA:
//   vw = (maxVal - minVal) / (maxViewport - minViewport) * 100
//   Viewport range: 375px (mobile) → 1920px (4xl)
// */

// const QUICK_LINKS = ['Home', 'About Us', 'Project', 'Service', 'Gallery', 'Contact Us'];

// const SOCIALS = [
//   {
//     label: 'Instagram',
//     svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg>,
//   },
//   {
//     label: 'Facebook',
//     svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
//   },
//   {
//     label: 'YouTube',
//     svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
//   },
//   {
//     label: 'Pinterest',
//     svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z" /></svg>,
//   },
// ];

// const Footer = () => {
//   return (
//     <footer className="w-full bg-[#334454] flex flex-col items-center overflow-hidden">
//       <div className="
//         w-full mx-auto flex flex-col items-center
//         sm:max-w-[80%] md:max-w-[85%] lg:max-w-[90%] xl:max-w-[92%] 2xl:max-w-[94%] 3xl:w-[1440px] 3xl:max-w-[1440px] 4xl:max-w-[98%]
//       ">

//         {/* ── Main 2-column row ─────────────────────────────────────────── */}
//         <div className="
//           flex flex-col md:flex-row w-full
//           border-t border-white/10
//           3xl:border-none
//         ">

//           {/* ══ FIRST DIV — Logo panel ══════════════════════════════════ */}
//           <div className="
//             relative flex-shrink-0
//             border-b border-white/10 md:border-b-0 md:border-r
//             w-full h-[200px]
//             md:w-[30.6%] md:h-[267.6px]
//             lg:w-[30.6%] lg:h-[267.6px]
//             xl:w-[30.6%] xl:h-[334.1px]
//             2xl:w-[459.9px] 2xl:h-[401px]
//             3xl:w-[432px] 3xl:h-[377.48px] 3xl:border-y-[0.75px] 3xl:border-l-[0.75px] 3xl:border-r-0 3xl:border-white/10
//             4xl:w-[575px] 4xl:h-[501.3px]
//           ">
//             {/* Logo */}
//             <div className="
//               absolute
//               w-[78px] h-[104px] top-[34.4px] left-[50%] -translate-x-1/2
//               md:translate-x-0 md:left-auto
//               md:w-[98.1px] md:h-[130.1px] md:top-[68.6px] md:left-[102.1px]
//               lg:w-[98.1px] lg:h-[130.1px] lg:top-[68.6px] lg:left-[102.1px]
//               xl:w-[122.6px] xl:h-[162.7px] xl:top-[85.7px] xl:left-[127.7px]
//               2xl:w-[147.2px] 2xl:h-[195.2px] 2xl:top-[102.9px] 2xl:left-[153.2px]
//               3xl:w-[138px] 3xl:h-[183px] 3xl:top-[96.49px] 3xl:left-[143.63px]
//               4xl:w-[184px] 4xl:h-[244px] 4xl:top-[128.6px] 4xl:left-[191.5px]
//             ">
//               <a href="/" className="relative block w-full h-full cursor-pointer transition-opacity hover:opacity-80">
//                 <Image
//                   src="/dummyimages/logo (2).svg"
//                   alt="Chameri Logo"
//                   fill
//                   className="object-contain"
//                 />
//               </a>
//             </div>
//           </div>

//           {/* ══ SECOND DIV — Links + Social ═════════════════════════════ */}
//           <div className="
//             relative flex-1
//             border-b border-white/10 md:border-none
//             h-auto
//             md:h-[267.6px]
//             lg:h-[267.6px]
//             xl:h-[334.5px]
//             2xl:h-[402.4px]
//             3xl:h-[377.48px] 3xl:w-[1008px] 3xl:border-[0.75px] 3xl:border-white/10
//             4xl:h-[503.3px]
//           ">

//             {/* Text content box */}
//             <div className="
//               flex flex-col sm:flex-row flex-wrap
//               pt-[25px] pl-[20px] gap-[25px]
//               md:absolute md:flex-row md:flex-nowrap
//               md:top-[32.9px] md:left-[51.9px] md:gap-[45px] md:pt-0 md:pl-0
//               lg:top-[32.9px] lg:left-[51.9px] lg:gap-[45px]
//               xl:top-[41.1px] xl:left-[64.9px] xl:gap-[56px]
//               2xl:top-[49.3px] 2xl:left-[77.9px] 2xl:gap-[94.9px]
//               3xl:top-[46.25px] 3xl:left-[73px] 3xl:gap-[89px]
//               4xl:top-[61.7px] 4xl:left-[97.3px] 4xl:gap-[118.7px]
//             ">

//               {/* Quick Links */}
//               <div className="
//                 flex flex-col
//                 gap-[17.8px]
//                 md:gap-[17.8px]
//                 xl:gap-[22.2px]
//                 2xl:gap-[26.6px]
//                 3xl:gap-[25px] 3xl:w-[179px] 3xl:h-[204.5px]
//                 4xl:gap-[33.3px]
//               ">
//                 <h3 className="
//                   font-roundo font-medium text-white
//                   text-[14.2px]
//                   lg:text-[14.2px]
//                   xl:text-[17.7px]
//                   2xl:text-[21.3px]
//                   3xl:text-[20px]
//                   4xl:text-[26.6px]
//                 ">Quick Links</h3>
//                 <div className="
//                   flex flex-col
//                   gap-[9.9px] lg:gap-[9.9px] xl:gap-[12.4px] 2xl:gap-[14.9px] 3xl:gap-[14px] 4xl:gap-[18.6px]
//                 ">
//                   {QUICK_LINKS.map((link) => (
//                     <a
//                       key={link}
//                       href="#"
//                       className="
//                         font-sans font-normal text-[#EDE7DE]/80 hover:text-white transition-colors
//                         text-[11.3px] leading-[10.1px]
//                         lg:text-[11.3px] lg:leading-[10.1px]
//                         xl:text-[14.2px] xl:leading-[12.6px]
//                         2xl:text-[17px]
//                         3xl:text-[16px] 3xl:leading-[12px]
//                         4xl:text-[21.3px]
//                       "
//                     >
//                       {link}
//                     </a>
//                   ))}
//                 </div>
//               </div>

//               {/* Address */}
//               <div className="
//                 flex flex-col
//                 gap-[14.2px]
//                 lg:gap-[14.2px]
//                 xl:gap-[17.7px]
//                 2xl:gap-[21.3px]
//                 3xl:gap-[20px] 3xl:w-[199.29px] 3xl:h-[113px]
//                 4xl:gap-[26.6px]
//               ">
//                 <h3 className="
//                   font-roundo font-medium text-white
//                   text-[14.2px] lg:text-[14.2px] xl:text-[17.7px] 2xl:text-[21.3px] 3xl:text-[20px] 4xl:text-[26.6px]
//                 ">Address</h3>
//                 <a
//                   href="#"
//                   className="
//                     font-sans font-normal text-[#EDE7DE]/80 hover:text-white transition-colors
//                     text-[10.6px] leading-[1.6]
//                     lg:text-[10.6px]
//                     xl:text-[13.3px]
//                     2xl:text-[16px]
//                     3xl:text-[15px]
//                     4xl:text-[20px]
//                     max-w-[141.6px] lg:max-w-[141.6px] xl:max-w-[177px] 2xl:max-w-[212.4px] 3xl:max-w-[199.29px] 4xl:max-w-[265.7px]
//                   "
//                 >
//                   #27/205, Madapeedika, Paral (PO), Thalasserry, Kannur, Kerala, 670601
//                 </a>
//               </div>

//               {/* Contact Us */}
//               <div className="
//                 flex flex-col
//                 gap-[14.2px]
//                 lg:gap-[14.2px]
//                 xl:gap-[17.7px]
//                 2xl:gap-[21.3px]
//                 3xl:gap-[20px] 3xl:w-[199.29px] 3xl:h-[97px]
//                 4xl:gap-[26.6px]
//               ">
//                 <h3 className="
//                   font-roundo font-medium text-white
//                   text-[14.2px] lg:text-[14.2px] xl:text-[17.7px] 2xl:text-[21.3px] 3xl:text-[20px] 4xl:text-[26.6px]
//                 ">Contact Us</h3>
//                 <div className="
//                   flex flex-col
//                   gap-[7.1px] lg:gap-[7.1px] xl:gap-[8.9px] 2xl:gap-[10.6px] 3xl:gap-[10px] 4xl:gap-[13.3px]
//                 ">
//                   {['+91 91889 13114', '+91 91889 13114'].map((num, i) => (
//                     <a
//                       key={i}
//                       href="tel:+919188913114"
//                       className="
//                         font-sans font-normal text-[#EDE7DE]/80 hover:text-white transition-colors
//                         text-[10.6px] lg:text-[10.6px] xl:text-[13.3px] 2xl:text-[16px] 3xl:text-[15px] 4xl:text-[20px]
//                       "
//                     >
//                       {num}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Social Icons — Fix for layout issue */}
//             <div className="
//               flex items-center mt-[20px] ml-[20px] mb-[25px]
//               gap-[9.9px]
//               md:absolute md:mt-0 md:ml-0 md:mb-0
//               md:bottom-[23.1px] md:right-[47.1px] md:gap-[9.9px]
//               lg:bottom-[23.1px] lg:right-[47.1px] lg:gap-[9.9px]
//               xl:bottom-[28.9px] xl:right-[58.8px] xl:gap-[12.4px]
//               2xl:bottom-[34.6px] 2xl:right-[70.6px] 2xl:gap-[14.9px]
//               3xl:w-[146px] 3xl:h-[30px] 3xl:top-[315px] 3xl:left-[795.82px] 3xl:gap-[14px] 3xl:bottom-auto 3xl:right-auto
//               4xl:bottom-[43.3px] 4xl:right-[88.3px] 4xl:gap-[18.7px]
//             ">
//               {SOCIALS.map(({ label, svg }) => (
//                 <a
//                   key={label}
//                   href="#"
//                   aria-label={label}
//                   className="
//                     text-[#EDE7DE] hover:text-white hover:scale-110 transition-all flex items-center justify-center flex-shrink-0
//                     w-[15.6px] h-[15.2px]
//                     lg:w-[15.6px] lg:h-[15.2px]
//                     xl:w-[19.5px] xl:h-[19px]
//                     2xl:w-[23.5px] 2xl:h-[22.7px]
//                     3xl:w-[24px] 3xl:h-[24px]
//                     4xl:w-[29.3px] 4xl:h-[28.4px]
//                   "
//                 >
//                   {svg}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── Copyright bar ─────────────────────────────────────────────── */}
//         <div className="
//           flex justify-end items-center w-full
//           border-t border-white/10 3xl:border-none
//           py-[14px] lg:py-[14px] xl:py-[17px] 2xl:py-[20px] 3xl:h-[56.41px] 4xl:py-[25px]
//         ">
//           <a
//             href="#"
//             className="
//               font-sans font-normal text-[#EDE7DE]/80 hover:text-white transition-colors
//               text-[8.5px] lg:text-[8.5px] xl:text-[10.6px] 2xl:text-[12.8px] 3xl:text-[12px] 4xl:text-[16px]
//             "
//           >
//             © Chameri Builders pvt limited
//           </a>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;

// ------------------------------------

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { socialHref } from '@/lib/socialLinks';

/*
  CLAMP FORMULA:
  vw = (maxVal - minVal) / (maxViewport - minViewport) * 100
  Viewport range: 375px (mobile) → 1920px (4xl)

  Key Figma values (at 1440px / 3xl):
  Logo panel:   w=432px  h=377.48px
  Links panel:  w=1008px h=377.48px
  Logo:         w=138px  h=183px   top=96.49px  left=143.63px
  Links top:    top=46.25px left=73px  gap=89px
  Socials:      bottom=32.48px right=66.18px  gap=14px  icon=24px
  Copyright:    py=19px  text=12px
*/

const QUICK_LINKS = [
  { label: 'Home',       href: '/'         },
  { label: 'About Us',  href: '/about'    },
  { label: 'Projects',   href: '/project-list'   },
  { label: 'Services',   href: '/services' },
  { label: 'Gallery',   href: '/gallery'  },
  { label: 'Contact Us',href: '/contact'  },
];

const SOCIALS = [
  {
    label: 'Instagram',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg>,
  },
  {
    label: 'Facebook',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
  },
  {
    label: 'YouTube',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
  },
  {
    label: 'LinkedIn',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>,
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#334454] overflow-hidden">
      <div className="w-full">

        {/* ── Main 2-column row ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row w-full border-t border-white/10">

          {/* ══ FIRST DIV — Logo panel ══════════════════════════════════
              On mobile it renders AFTER the links panel (order-2), with a
              top divider instead of the desktop's right-side border. */}
          <div
            className="footer-logo-panel relative flex-shrink-0 order-2 md:order-none w-full md:w-[30.6%]"
            style={{
              // Mobile (Figma 375 frame): 358×255 band with 0.75px #DADADA
              // rules top and bottom. 358/375 = 95.47%, centred.
              width:        '95.47%',
              marginInline: 'auto',
              height:       'clamp(255px, 68vw, 340px)',
              borderTop:    '0.75px solid #DADADA',
              borderBottom: '0.75px solid #DADADA',
            }}
          >
            {/* Logo wrapper — centred both axes on mobile (the Figma offsets
                36.09/35.91 top/bottom and 109.5/110.5 left/right are dead
                centre), absolutely placed on md+. */}
            <div
              className="footer-logo-wrap absolute"
              style={{
                width:     'clamp(138px, 36.8vw, 200px)',
                height:    'clamp(183px, 48.8vw, 265px)',
                top:       '50%',
                left:      '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Desktop geometry injected via <style> so the inline values
                  above can carry the mobile spec without an SSR mismatch. */}
              <style>{`
                @media (min-width: 768px) {
                  .footer-logo-panel {
                    width: 30.6% !important;
                    margin-inline: 0 !important;
                    height: clamp(180px, 23.5vw, 450px) !important;
                    border-top: 0 !important;
                    border-bottom: 0 !important;
                    border-right: 1px solid rgba(255,255,255,0.1) !important;
                  }
                  .footer-logo-wrap {
                    width:  clamp(78px, 9.57vw, 184px) !important;
                    height: clamp(104px, 12.7vw, 244px) !important;
                    top:    clamp(34px, 5.24vw, 118.6px) !important;
                    left:   auto !important;
                    transform: none !important;
                  }
                  .footer-logo { left: clamp(102px, 9.96vw, 191.5px) !important; transform: none !important; }
                }
              `}</style>
              <a href="/" className="footer-logo relative block w-full h-full cursor-pointer transition-opacity hover:opacity-80">
                <Image src="/dummyimages/logo (2).svg" alt="Chameri Logo" fill className="object-contain" />
              </a>
            </div>
          </div>

          {/* ══ SECOND DIV — Links + Social ═════════════════════════════
              Renders FIRST on mobile (order-1); the full box border is a
              desktop-only treatment. */}
          <div
            className="relative flex-1 order-1 md:order-none md:border md:border-white/10"
            style={{ minHeight: 'clamp(100px, 22vw, 380px)' }}
          >

            {/* md+ absolute positioning for links grid */}
            <style>{`
              @media (min-width: 768px) {
                .footer-links-grid {
                  /* Kept in normal flow (not absolute) so the panel's height
                     follows its content. While it was absolute, the panel height
                     came solely from a magic minHeight that had no relation to the
                     content, and the bottom-anchored socials overlapped the links
                     around 768-1000px. padding-bottom reserves the socials' band. */
                  padding-top:    clamp(16px, 2.3vw, 48px) !important;
                  padding-left:   clamp(51.9px, 5.05vw, 97.3px) !important;
                  padding-bottom: clamp(58px, 4.9vw, 92px) !important;
                  gap:            clamp(45px, 4.79vw, 118.7px) !important;
                }
              }
              @media (min-width: 768px) {
                .footer-socials {
                  position: absolute;
                  margin: 0 !important;
                  bottom: clamp(16px, 2vw, 38px);
                  right:  clamp(47.1px, 4.59vw, 88.3px);
                }
              }
            `}</style>

            {/* Links grid — 3 columns */}
            <div
              className="footer-links-grid flex flex-col md:flex-row flex-wrap md:flex-nowrap"
              style={{
                // maxWidth: 'clamp(1000px, 120vw, 1920px)',
                paddingTop:  'clamp(20px, 1.3vw, 25px)',
                paddingLeft: 'clamp(16px, 1.04vw, 20px)',
                gap:         'clamp(20px, 1.63vw, 25px)',
              }}
            >

              {/* Quick Links */}
              <div className="flex flex-col" style={{ gap: 'clamp(9.9px, 1.63vw, 33.3px)' }}>
                <h3
                  className="font-roundo font-medium text-white"
                  style={{ fontSize: 'clamp(18px, 1.4vw, 26.6px)' }}
                >
                  Quick Links
                </h3>
                <div className="flex flex-col" style={{ gap: 'clamp(9.9px, 0.97vw, 18.6px)' }}>
                  {QUICK_LINKS.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="font-sans font-normal text-[#FFFFFF] hover:text-[#EDE7DE]/80 transition-colors"
                      style={{
                        fontSize:   'clamp(15px, 1.11vw, 21.3px)',
                        lineHeight: 1.1,
                      }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col ml-0 md:ml-[clamp(20px,4.63vw,150px)]" style={{ gap: 'clamp(14.2px, 1.4vw, 26.6px)' }}>
                <h3
                  className="font-roundo font-medium text-white"
                  style={{ fontSize: 'clamp(18px, 1.4vw, 26.6px)' }}
                >
                  Address
                </h3>
                <a
                  href="https://www.google.com/maps?q=Chameri+Builders+%26+Developers,+27%2F205+Madapeedika,+Paral+(PO),+Thalassery,+Kannur,+Kerala+670601&ll=11.7485921,75.5322851&z=17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-normal text-[#FFFFFF] hover:text-[#EDE7DE]/80 transition-colors"
                  style={{
                    fontSize:   'clampclamp(19px, 1.11vw, 21.3px)',
                    lineHeight: 1.6,
                    maxWidth:   'clamp(261.6px, 13.82vw, 265.7px)',
                  }}
                >
                  #27/205, Madapeedika, Paral (PO), Thalasserry, Kannur, Kerala, 670601
                </a>
              </div>

              {/* Contact Us */}
              <div className="flex flex-col ml-0 md:ml-[clamp(20px,3.63vw,140px)]" style={{ gap: 'clamp(10.2px, 1vw, 20.6px)' }}>
                <h3
                  className="font-roundo font-medium text-white"
                  style={{ fontSize: 'clamp(18px, 1.4vw, 26.6px)' }}
                >
                  Contact Us
                </h3>
                <div className="flex flex-col" style={{ gap: 'clamp(7.1px, 0.69vw, 13.3px)' }}>
                  {['+91 91889 13114'].map((num, i) => (
                    <a
                      key={i}
                      href="tel:+919188913114"
                      className="font-sans font-normal text-[#FFFFFF] hover:text-[#EDE7DE]/80 transition-colors"
                      style={{ fontSize: 'clamp(15px, 1.11vw, 21.3px)' }}
                    >
                      {num}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col ml-0 md:ml-[clamp(20px,3.63vw,140px)]" style={{ gap: 'clamp(10.2px, 1vw, 20.6px)', marginTop:'clamp(6.2px, 0.5vw, 16.6px)', marginRight:'clamp(16px, 1.04vw, 20px)' }}>
                <h3
                  className="font-roundo font-medium text-white capitalize"
                  style={{ fontSize: 'clamp(18px, 1.4vw, 26.6px)', lineHeight: 1 }}
                >
                  Email
                </h3>
                <div className="flex flex-col" style={{ gap: 'clamp(7.1px, 0.69vw, 13.3px)', marginTop:'clamp(3.2px, 0.4vw, 14.6px)' }}>
                  <a
                    href="mailto:info@chameribuilders.com"
                    className="font-sans font-normal text-[#FFFFFF] hover:text-[#EDE7DE]/80 transition-colors"
                    style={{ fontSize: 'clamp(15px, 1.11vw, 21.3px)', lineHeight: 1 }}
                  >
                    info@chameribuilders.com
                  </a>
                </div>
              </div>
              </div>

              {/* Email */}
              {/* <div className="flex flex-col ml-0 md:ml-[clamp(20px,3.63vw,140px)]" style={{ gap: 'clamp(14.2px, 1.4vw, 26.6px)', marginTop:'clamp(6.2px, 0.5vw, 16.6px)', marginRight:'clamp(16px, 1.04vw, 20px)' }}>
                <h3
                  className="font-roundo font-medium text-white capitalize"
                  style={{ fontSize: 'clamp(18px, 1.4vw, 26.6px)', lineHeight: 1 }}
                >
                  Email
                </h3>
                <div className="flex flex-col" style={{ gap: 'clamp(7.1px, 0.69vw, 13.3px)', marginTop:'clamp(3.2px, 0.4vw, 14.6px)' }}>
                  <a
                    href="mailto:info@chameribuilders.com"
                    className="font-sans font-normal text-[#FFFFFF] hover:text-[#EDE7DE]/80 transition-colors"
                    style={{ fontSize: 'clamp(15px, 1.11vw, 21.3px)', lineHeight: 1 }}
                  >
                    info@chameribuilders.com
                  </a>
                </div>
              </div> */}
            </div>

            {/* Social Icons */}
            <div
              className="footer-socials flex items-center"
              style={{
                marginTop:   'clamp(16px, 1.04vw, 20px)',
                marginLeft:  'clamp(16px, 1.04vw, 20px)',
                marginBottom:'clamp(20px, 1.3vw, 25px)',
                gap:         'clamp(9.9px, 0.97vw, 18.7px)',
              }}
            >
              {SOCIALS.map(({ label, svg }) => (
                <a
                  key={label}
                  /* undefined for any profile without a URL, which renders the
                     icon unlinked instead of pointing at a dead "#". */
                  href={socialHref(label)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Chameri on ${label}`}
                  className="text-[#EDE7DE] hover:text-white hover:scale-110 transition-all flex items-center justify-center flex-shrink-0"
                  style={{
                    width:  'clamp(18.6px, 1.83vw, 29.3px)',
                    height: 'clamp(18.2px, 1.89vw, 28.4px)',
                  }}
                >
                  {svg}
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* ── Copyright bar ─────────────────────────────────────────────── */}
        <style>{`
          @media (min-width: 768px) {
            .footer-copyright { margin-right: clamp(47.1px, 4.59vw, 88.3px) !important; }
          }
        `}</style>
        <div
          className="flex justify-center md:justify-end items-center border-t border-white/10"
          style={{ padding: 'clamp(12px, 1.15vw, 21px) 0' }}
        >
          <a
            href="#"
            className="footer-copyright font-sans font-normal text-[#FFFFFF] hover:text-[#EDE7DE]/80 transition-colors"
            style={{ fontSize: 'clamp(12px, 0.83vw, 16px)' }}
          >
            © Chameri Builders & Developers
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
