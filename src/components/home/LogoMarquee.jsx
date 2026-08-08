// import React from 'react';
// import Image from 'next/image';

// const LogoMarquee = () => {
//   const logos = [
//     '/dummyimages/Logo.png',
//     '/dummyimages/Logo (1).png',
//     '/dummyimages/Logo (2).png',
//     '/dummyimages/Logo (3).png',
//     '/dummyimages/Logo (4).png',
//     '/dummyimages/Logo (5).png',
//     '/dummyimages/Logo (6).png',
//   ];

//   // Multiple sets for seamless scroll
//   const scrollLogos = [...logos, ...logos, ...logos, ...logos];

//   return (
//     <section className="w-full bg-[#EDE7DE] py-[60px] relative z-10 flex flex-col items-center justify-center overflow-hidden">
//       <div className="w-[1200px] h-[111px] flex items-center overflow-hidden">
//         <div className="flex animate-marquee whitespace-nowrap gap-[100px]">
//           {scrollLogos.map((logo, index) => (
//             <div key={index} className="flex-shrink-0 w-[169px] h-[30px] relative">
//               <Image
//                 src={logo}
//                 alt={`Client Logo ${index}`}
//                 fill
//                 className="object-contain grayscale opacity-100"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LogoMarquee;


'use client';

import React from 'react';
import Image from 'next/image';

const DEFAULT_LOGOS = [
  '/dummyimages/Logo.png',
  '/dummyimages/Logo (1).png',
  '/dummyimages/Logo (2).png',
  '/dummyimages/Logo (3).png',
  '/dummyimages/Logo (4).png',
  '/dummyimages/Logo (5).png',
  '/dummyimages/Logo (6).png',
];

const LogoMarquee = ({ logos: apiLogos }) => {
  const logos = (apiLogos && apiLogos.length > 0) ? apiLogos : DEFAULT_LOGOS;

  // Multiple sets for seamless scroll
  const scrollLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="w-full bg-[#EDE7DE] py-[clamp(30px,4.16vw,100px)] relative z-10 flex flex-col items-center justify-center overflow-hidden">
      {/* ── Marquee track container ─────────────────────────────────────── */}
      <div className="flex items-center overflow-hidden w-[clamp(280px,86.33vw,1700px)] h-[clamp(50px,7.7vw,160px)]">
        {/* ── Scrolling strip ──────────────────────────────────────────── */}
        <div className="flex animate-marquee whitespace-nowrap ">
          {scrollLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 relative w-[clamp(80px,12.73vw,400px)] h-[clamp(15px,3.08vw,150px)]"
            >
              <Image
                src={logo}
                alt={`Client Logo ${index}`}
                fill
                className="object-contain grayscale opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
