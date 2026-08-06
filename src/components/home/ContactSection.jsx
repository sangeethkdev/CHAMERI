// 'use client';

// import React, { useState } from 'react';
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';

// const ContactSection = () => {
//   const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   /* ─── shared input style ─────────────────────────────────────────── */
//   const inputBase =
//     'font-sans font-normal text-[#334454] bg-transparent border-0 border-b border-[#334454]/35 outline-none w-full placeholder-[#334454]/40 focus:border-[#334454] transition-colors';

//   return (
//     <section className="w-full bg-[#EDE7DE] flex justify-center overflow-hidden">

//       {/* ── Outer wrapper ─────────────────────────────────────────────── */}
//       <div className="
//         w-full mx-auto flex flex-col lg:flex-row justify-between
//         px-[20px] py-[40px] gap-[40px] lg:gap-0
//         lg:pt-[56.9px] lg:pr-[62.6px] lg:pb-[36.3px] lg:pl-[56.9px]
//         xl:pt-[71.1px] xl:pr-[78.2px] xl:pb-[45.3px] xl:pl-[71.1px]
//         2xl:pt-[85.3px] 2xl:pr-[93.9px] 2xl:pb-[54.4px] 2xl:pl-[85.3px]
//         3xl:pt-[80px] 3xl:pr-[88px] 3xl:pb-[51px] 3xl:pl-[80px] 3xl:h-[739px]
//         4xl:pt-[106.6px] 4xl:pr-[117.3px] 4xl:pb-[68px] 4xl:pl-[106.6px]
//         sm:max-w-[60%] md:max-w-[70%] lg:max-w-[80%] xl:max-w-[82%] 2xl:max-w-[84%] 3xl:max-w-[1440px] 3xl:w-[1440px] 4xl:max-w-[84%]
//       ">

//         {/* ══ LEFT ════════════════════════════════════════════════════════ */}
//         <div className="
//           flex flex-col justify-between flex-shrink-0
//           w-full gap-[40px]
//           lg:w-[280px] lg:h-[362.4px] lg:gap-[0px]
//           xl:w-[350px] xl:h-[452.5px]
//           2xl:w-[479.6px] 2xl:h-[543.4px]
//           3xl:w-[450px] 3xl:h-[510px]
//           4xl:w-[599.5px] 4xl:h-[679.3px]
//         ">

//           {/* TOP — badge + description */}
//           <div className="
//             flex flex-col
//             gap-[10.6px]
//             lg:gap-[10.6px] lg:w-[319.8px]
//             xl:gap-[13.3px] xl:w-[399.7px]
//             2xl:gap-[16px] 2xl:w-[479.6px]
//             3xl:gap-[15px] 3xl:w-[450px]
//             4xl:gap-[20px] 4xl:w-[599.5px]
//           ">
//             {/* Badge */}
//             <div className="flex items-center gap-[5.1px] lg:gap-[5.1px] xl:gap-[6.4px] 2xl:gap-[7.7px] 3xl:gap-[7.2px] 4xl:gap-[9.6px]">
//               <div className="
//                 bg-[#334454] flex-shrink-0
//                 w-[9.9px] h-[9.9px] rounded-[2px]
//                 lg:w-[9.9px] lg:h-[9.9px]
//                 xl:w-[12.4px] xl:h-[12.4px] xl:rounded-[2.5px]
//                 2xl:w-[14.9px] 2xl:h-[14.9px] 2xl:rounded-[3.2px]
//                 3xl:w-[14px] 3xl:h-[14px] 3xl:rounded-[3px]
//                 4xl:w-[18.6px] 4xl:h-[18.6px] 4xl:rounded-[4px]
//               " />
//               <span className="
//                 font-sans font-normal uppercase text-[#334454] tracking-widest
//                 text-[11px] lg:text-[11px] xl:text-[12.4px] 2xl:text-[14.9px] 3xl:text-[14px] 4xl:text-[18.6px]
//               ">
//                 Contact Us
//               </span>
//             </div>

//             {/* Description */}
//             <p className="
//               font-sans font-normal text-[#334454]
//               text-[14px] leading-[19.6px] tracking-[-0.28px]
//               lg:text-[14.2px] lg:leading-[19.9px] lg:tracking-[-0.28px]
//               xl:text-[17.7px] xl:leading-[24.8px] xl:tracking-[-0.35px]
//               2xl:text-[21.3px] 2xl:leading-[29.8px] 2xl:tracking-[-0.43px]
//               3xl:text-[20px] 3xl:leading-[28px] 3xl:tracking-[-0.4px]
//               4xl:text-[26.6px] 4xl:leading-[37.3px] 4xl:tracking-[-0.53px]
//             ">
//               Lorem ipsum dolor sit amet, consectetur ipsum dolor sit amet, consecteturLorem ipsum dolor
//             </p>
//           </div>

//           {/* BOTTOM — phone + email */}
//           <div className="
//             flex flex-col
//             gap-[15.6px]
//             lg:gap-[15.6px]
//             xl:gap-[19.5px]
//             2xl:gap-[23.4px]
//             3xl:gap-[22px]
//             4xl:gap-[29.3px]
//           ">
//             {/* Phone */}
//             <div className="flex flex-col gap-[8px]">
//               <div className="flex items-center gap-[8px]">
//                 <svg
//                   viewBox="0 0 24 24" fill="none" stroke="#334454" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
//                   className="
//                     flex-shrink-0
//                     w-[12.7px] h-[12.7px]
//                     lg:w-[12.7px] lg:h-[12.7px]
//                     xl:w-[16px] xl:h-[16px]
//                     2xl:w-[19.2px] 2xl:h-[19.2px]
//                     3xl:w-[18px] 3xl:h-[18px]
//                     4xl:w-[24px] 4xl:h-[24px]
//                   "
//                 >
//                   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53 2 2 0 0 1 3.6 1.35h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
//                 </svg>
//                 <span className="
//                   font-sans font-normal text-[#334454]
//                   text-[12.7px] lg:text-[12.7px] xl:text-[16px] 2xl:text-[19.2px] 3xl:text-[18px] 4xl:text-[24px]
//                 ">Phone number</span>
//               </div>
//               <a
//                 href="tel:+919876543210"
//                 className="
//                   font-sans font-normal text-[#6B859E] hover:underline transition-all
//                   text-[11.3px] pl-[20px]
//                   lg:text-[11.3px] lg:pl-[20px]
//                   xl:text-[14.2px] xl:pl-[25px]
//                   2xl:text-[17px] 2xl:pl-[27.7px]
//                   3xl:text-[16px] 3xl:pl-[26px]
//                   4xl:text-[21.3px] 4xl:pl-[34.6px]
//                 "
//               >
//                 +91 987654321
//               </a>
//             </div>

//             {/* Email */}
//             <div className="flex flex-col gap-[8px]">
//               <div className="flex items-center gap-[8px]">
//                 <svg
//                   viewBox="0 0 24 24" fill="none" stroke="#334454" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
//                   className="
//                     flex-shrink-0
//                     w-[12.7px] h-[12.7px]
//                     lg:w-[12.7px] lg:h-[12.7px]
//                     xl:w-[16px] xl:h-[16px]
//                     2xl:w-[19.2px] 2xl:h-[19.2px]
//                     3xl:w-[18px] 3xl:h-[18px]
//                     4xl:w-[24px] 4xl:h-[24px]
//                   "
//                 >
//                   <rect width="20" height="16" x="2" y="4" rx="2"/>
//                   <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
//                 </svg>
//                 <span className="
//                   font-sans font-normal text-[#334454]
//                   text-[12.7px] lg:text-[12.7px] xl:text-[16px] 2xl:text-[19.2px] 3xl:text-[18px] 4xl:text-[24px]
//                 ">Drop us a Email at</span>
//               </div>
//               <a
//                 href="mailto:Chameri@gmail.com"
//                 className="
//                   font-sans font-normal text-[#6B859E] hover:underline transition-all
//                   text-[11.3px] pl-[20px]
//                   lg:text-[11.3px] lg:pl-[20px]
//                   xl:text-[14.2px] xl:pl-[25px]
//                   2xl:text-[17px] 2xl:pl-[27.7px]
//                   3xl:text-[16px] 3xl:pl-[26px]
//                   4xl:text-[21.3px] 4xl:pl-[34.6px]
//                 "
//               >
//                 Chameri@gmail.com
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* ══ RIGHT — form ════════════════════════════════════════════════ */}
//         <div className="
//           flex flex-col flex-shrink-0
//           w-full gap-[7.1px]
//           lg:w-[400px] lg:h-[432px] lg:gap-[7.1px]
//           xl:w-[500px] xl:h-[540px] xl:gap-[8.9px]
//           2xl:w-[676.9px] 2xl:h-[648px] 2xl:gap-[10.6px]
//           3xl:w-[635px] 3xl:h-[608px] 3xl:gap-[10px]
//           4xl:w-[846.6px] 4xl:h-[810px] 4xl:gap-[13.3px]
//         ">

//           {/* Heading */}
//           <h2 className="
//             font-roundo font-medium text-[#334454]
//             text-[28px] leading-[34px] tracking-[-0.56px]
//             lg:text-[34.1px] lg:leading-[42.6px] lg:tracking-[-0.64px]
//             xl:text-[42.6px] xl:leading-[53.3px] xl:tracking-[-0.8px]
//             2xl:text-[51.2px] 2xl:leading-[64px] 2xl:tracking-[-0.96px]
//             3xl:text-[48px] 3xl:leading-[60px] 3xl:tracking-[-0.9px]
//             4xl:text-[64px] 4xl:leading-[80px] 4xl:tracking-[-1.2px]
//           ">
//             Contact Us
//           </h2>

//           {/* Form */}
//           <form
//             onSubmit={(e) => e.preventDefault()}
//             className="
//               flex flex-col bg-[#EDE7DE] w-full
//               pt-[19.2px] pb-[19.2px] gap-[28.4px] rounded-[4.3px]
//               lg:pt-[19.2px] lg:pb-[19.2px] lg:gap-[28.4px]
//               xl:pt-[24px] xl:pb-[24px] xl:gap-[35.5px] xl:rounded-[5.3px]
//               2xl:pt-[28.8px] 2xl:pb-[28.8px] 2xl:gap-[42.6px] 2xl:rounded-[6.4px]
//               3xl:pt-[27px] 3xl:pb-[27px] 3xl:gap-[40px] 3xl:rounded-[6px]
//               4xl:pt-[36px] 4xl:pb-[36px] 4xl:gap-[53.3px] 4xl:rounded-[8px]
//             "
//           >
//             {/* Input helper class string for re-use */}
//             {/* Name */}
//             <div>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter Your Name"
//                 value={form.name}
//                 onChange={handleChange}
//                 className={`${inputBase}
//                   text-[13.4px] h-[38.4px] pb-[2.8px]
//                   lg:text-[13.4px] lg:h-[38.4px]
//                   xl:text-[14.2px] xl:h-[48px] xl:pb-[3.5px]
//                   2xl:text-[17px] 2xl:h-[57.5px]
//                   3xl:text-[16px] 3xl:h-[54px] 3xl:pb-[4px]
//                   4xl:text-[21.3px] 4xl:h-[72px] 4xl:pb-[5.3px]
//                 `}
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter Email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className={`${inputBase}
//                   text-[13.4px] h-[38.4px] pb-[2.8px]
//                   lg:text-[13.4px] lg:h-[38.4px]
//                   xl:text-[14.2px] xl:h-[48px] xl:pb-[3.5px]
//                   2xl:text-[17px] 2xl:h-[57.5px]
//                   3xl:text-[16px] 3xl:h-[54px] 3xl:pb-[4px]
//                   4xl:text-[21.3px] 4xl:h-[72px] 4xl:pb-[5.3px]
//                 `}
//               />
//             </div>

//             {/* Phone */}
//             <div className={`
//               flex items-center border-b border-[#334454]/35 bg-transparent w-full
//               h-[38.4px] lg:h-[38.4px] xl:h-[48px] 2xl:h-[57.5px] 3xl:h-[54px] 4xl:h-[72px]
//             `}>
//               <PhoneInput
//                 international
//                 defaultCountry="IN"
//                 value={form.phone}
//                 onChange={(val) => setForm({ ...form, phone: val })}
//                 placeholder="Phone number"
//                 className="contact-phone-input"
//                 style={{ width: '100%', outline: 'none' }}
//               />
//             </div>

//             {/* Message */}
//             <div>
//               <textarea
//                 name="message"
//                 placeholder="Type your message here..."
//                 value={form.message}
//                 onChange={handleChange}
//                 rows={2}
//                 className={`${inputBase} resize-none
//                   text-[13.4px] h-[38.4px] pt-[5.7px]
//                   lg:text-[13.4px] lg:h-[38.4px]
//                   xl:text-[14.2px] xl:h-[48px] xl:pt-[7.1px]
//                   2xl:text-[17px] 2xl:h-[57.5px]
//                   3xl:text-[16px] 3xl:h-[54px] 3xl:pt-[8px]
//                   4xl:text-[21.3px] 4xl:h-[72px] 4xl:pt-[10.6px]
//                 `}
//               />
//             </div>

//             {/* Submit button */}
//             <div className="flex items-center">
//               <button
//                 type="submit"
//                 className="
//                   group relative flex items-center bg-[#6B859E] hover:bg-[#334454] transition-colors duration-500 overflow-hidden cursor-pointer border-none
//                   w-[118.6px] h-[36.9px] rounded-[8.5px]
//                   lg:w-[118.6px] lg:h-[36.9px] lg:rounded-[8.5px]
//                   xl:w-[148.2px] xl:h-[46.1px] xl:rounded-[10.6px]
//                   2xl:w-[177.9px] 2xl:h-[55.4px] 2xl:rounded-[12.8px]
//                   3xl:w-[167px] 3xl:h-[52px] 3xl:rounded-[12px]
//                   4xl:w-[222.6px] 4xl:h-[69.3px] 4xl:rounded-[16px]
//                 "
//               >
//                 {/* Sliding text */}
//                 <div className="
//                   absolute overflow-hidden
//                   top-[9.9px] left-[8.5px] w-[69px] h-[16.3px]
//                   lg:top-[9.9px] lg:left-[8.5px] lg:w-[69px] lg:h-[16.3px]
//                   xl:top-[12.4px] xl:left-[10.7px] xl:w-[86px] xl:h-[20.4px]
//                   2xl:top-[14.9px] 2xl:left-[12.8px] 2xl:w-[103px] 2xl:h-[24.5px]
//                   3xl:top-[14px] 3xl:left-[12px] 3xl:w-[97px] 3xl:h-[23px]
//                   4xl:top-[18.6px] 4xl:left-[16px] 4xl:w-[129px] 4xl:h-[30.6px]
//                 ">
//                   <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
//                     <span className="
//                       font-sans font-medium text-white whitespace-nowrap flex items-center
//                       text-[10.6px] h-[16.3px]
//                       lg:text-[10.6px] lg:h-[16.3px]
//                       xl:text-[13.3px] xl:h-[20.4px]
//                       2xl:text-[16px] 2xl:h-[24.5px]
//                       3xl:text-[15px] 3xl:h-[23px]
//                       4xl:text-[20px] 4xl:h-[30.6px]
//                     ">Contact Us</span>
//                     <span className="
//                       font-sans font-medium text-white whitespace-nowrap flex items-center
//                       text-[10.6px] h-[16.3px]
//                       lg:text-[10.6px] lg:h-[16.3px]
//                       xl:text-[13.3px] xl:h-[20.4px]
//                       2xl:text-[16px] 2xl:h-[24.5px]
//                       3xl:text-[15px] 3xl:h-[23px]
//                       4xl:text-[20px] 4xl:h-[30.6px]
//                     ">Contact Us</span>
//                   </div>
//                 </div>

//                 {/* Arrow box */}
//                 <div className="
//                   absolute bg-white group-hover:bg-[#EDE7DE] transition-colors duration-500 overflow-hidden
//                   right-[8.5px] w-[21.3px] h-[21.3px] rounded-[5px]
//                   lg:right-[8.5px] lg:w-[21.3px] lg:h-[21.3px]
//                   xl:right-[10.7px] xl:w-[26.6px] xl:h-[26.6px] xl:rounded-[6.2px]
//                   2xl:right-[12.8px] 2xl:w-[32px] 2xl:h-[32px] 2xl:rounded-[7.4px]
//                   3xl:right-[12px] 3xl:w-[30px] 3xl:h-[30px] 3xl:rounded-[7px]
//                   4xl:right-[16px] 4xl:w-[40px] 4xl:h-[40px] 4xl:rounded-[9.3px]
//                 ">
//                   <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="
//                       text-[#6B859E] transition-colors duration-500
//                       w-[10px] h-[10px] lg:w-[10px] lg:h-[10px] xl:w-[12.5px] xl:h-[12.5px]
//                       2xl:w-[15px] 2xl:h-[15px] 3xl:w-[14px] 3xl:h-[14px] 4xl:w-[18.6px] 4xl:h-[18.6px]
//                     ">
//                       <path d="M5 12h14M12 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                   <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="
//                       text-[#6B859E] transition-colors duration-500
//                       w-[10px] h-[10px] lg:w-[10px] lg:h-[10px] xl:w-[12.5px] xl:h-[12.5px]
//                       2xl:w-[15px] 2xl:h-[15px] 3xl:w-[14px] 3xl:h-[14px] 4xl:w-[18.6px] 4xl:h-[18.6px]
//                     ">
//                       <path d="M5 12h14M12 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                 </div>
//               </button>
//             </div>
//           </form>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default ContactSection;


// -----------------------second---------------------

// 'use client';

// import React, { useState } from 'react';
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';

// /*
//  * ─── CLAMP REFERENCE ────────────────────────────────────────────────────────
//  *
//  *  Formula : preferred_vw = (MAX_px - MIN_px) / (1920 - 375) * 100
//  *  Viewport range: 375px (mobile) → 1920px (4xl)
//  *
//  *  OUTER WRAPPER
//  *  pt                  : clamp(40px,   4.34vw, 106.6px)
//  *  pr                  : clamp(20px,   6.28vw, 117.3px)
//  *  pb                  : clamp(40px,   2.06vw,  68px)
//  *  pl                  : clamp(20px,   5.62vw, 106.6px)
//  *  max-w               : clamp(560px,  83vw,    1440px)
//  *
//  *  LEFT COLUMN
//  *  width (lg+)         : clamp(280px,  20.3vw, 599.5px)
//  *  height (lg+)        : clamp(362.4px,20.8vw, 679.3px)
//  *  TOP block gap       : clamp(10.6px,  0.6vw,  20px)
//  *  TOP block width     : clamp(280px,  20.3vw, 599.5px)
//  *  BOTTOM block gap    : clamp(15.6px,  0.89vw, 29.3px)
//  *
//  *  Badge dot size      : clamp(9.9px,  0.56vw, 18.6px)
//  *  Badge dot radius    : clamp(2px,    0.13vw,   4px)
//  *  Badge gap           : clamp(5.1px,  0.29vw,   9.6px)
//  *  Badge font          : clamp(11px,   0.5vw,   18.6px)
//  *
//  *  Desc font           : clamp(14px,   0.81vw,  26.6px)
//  *  Desc lead           : clamp(19.6px, 1.14vw,  37.3px)
//  *  Desc tracking       : clamp(-0.28px,-0.016vw,-0.53px)
//  *
//  *  Contact icon size   : clamp(12.7px, 0.72vw,  24px)
//  *  Contact label font  : clamp(12.7px, 0.72vw,  24px)
//  *  Contact link font   : clamp(11.3px, 0.64vw,  21.3px)
//  *  Contact link pl     : clamp(20px,   0.95vw,  34.6px)
//  *
//  *  RIGHT COLUMN
//  *  width (lg+)         : clamp(400px,  28.6vw, 846.6px)
//  *  height (lg+)        : clamp(432px,  25.3vw, 810px)
//  *  gap                 : clamp(7.1px,   0.4vw,  13.3px)
//  *
//  *  Heading font        : clamp(28px,   2.32vw,  64px)
//  *  Heading lead        : clamp(34px,   2.97vw,  80px)
//  *  Heading tracking    : clamp(-0.56px,-0.042vw,-1.2px)
//  *
//  *  Form pt/pb          : clamp(19.2px,  1.1vw,  36px)
//  *  Form gap            : clamp(28.4px,  1.62vw, 53.3px)
//  *  Form radius         : clamp(4.3px,   0.24vw,  8px)
//  *
//  *  Input font          : clamp(13.4px,  0.52vw, 21.3px)
//  *  Input height        : clamp(38.4px,  2.19vw, 72px)
//  *  Input pb            : clamp(2.8px,   0.16vw,  5.3px)
//  *  Textarea pt         : clamp(5.7px,   0.32vw, 10.6px)
//  *
//  *  Btn width           : clamp(118.6px, 6.7vw, 222.6px)
//  *  Btn height          : clamp(36.9px,  2.1vw,  69.3px)
//  *  Btn radius          : clamp(8.5px,   0.49vw, 16px)
//  *  Text top            : clamp(9.9px,   0.57vw, 18.6px)
//  *  Text left           : clamp(8.5px,   0.49vw, 16px)
//  *  Text width          : clamp(69px,    3.9vw, 129px)
//  *  Text height         : clamp(16.3px,  0.92vw, 30.6px)
//  *  Text font           : clamp(10.6px,  0.6vw,  20px)
//  *  Arrow right         : clamp(8.5px,   0.49vw, 16px)
//  *  Arrow box size      : clamp(21.3px,  1.21vw, 40px)
//  *  Arrow box radius    : clamp(5px,     0.28vw,  9.3px)
//  *  Arrow svg size      : clamp(10px,    0.56vw, 18.6px)
//  *
//  * ────────────────────────────────────────────────────────────────────────────
//  */

// /* ─── Shared Arrow SVG ───────────────────────────────────────────────── */
// const ArrowSVG = () => (
//   <svg
//     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
//     className="text-[#6B859E]"
//     style={{ width: 'clamp(10px, 0.56vw, 18.6px)', height: 'clamp(10px, 0.56vw, 18.6px)' }}
//   >
//     <path d="M5 12h14M12 5l7 7-7 7" />
//   </svg>
// );

// const ContactSection = () => {
//   const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   /* shared input className — only non-sizing utilities */
//   const inputBase =
//     'font-sans font-normal text-[#334454] bg-transparent border-0 border-b border-[#334454]/35 outline-none w-full placeholder-[#334454]/40 focus:border-[#334454] transition-colors';

//   /* shared input inline style — reused for name, email, phone height, textarea */
//   const inputStyle = {
//     fontSize:      'clamp(14px, 1.11vw, 16px)',
//     height:        'clamp(33.75px, 3.75vw, 54px)',
//     paddingBottom: 'clamp(4px, 0.4vw, 6px)',
//   };

//   return (
//     <section className="w-full bg-[#EDE7DE] flex justify-center overflow-hidden">

//       {/* ── Outer wrapper ─────────────────────────────────────────────── */}
//       <div
//         className="w-full mx-auto flex flex-col md:flex-row justify-between items-start gap-[40px] md:gap-0"
//         style={{
//           width:         '100%',
//           maxWidth:      '1440px',
//           minHeight:     'clamp(400px, 51.31vw, 739px)', // 739px at 1440px
//           paddingTop:    'clamp(40px, 5.56vw, 80px)',
//           paddingRight:  'clamp(20px, 6.11vw, 88px)',
//           paddingBottom: 'clamp(40px, 3.54vw, 51px)',
//           paddingLeft:   'clamp(20px, 5.56vw, 80px)',
//         }}
//       >

//         {/* ══ LEFT ════════════════════════════════════════════════════════ */}
//         <div
//           className="flex flex-col justify-between flex-shrink-0 w-full"
//           style={{
//             width:     '100%',
//             maxWidth:  '450px', // Exact Figma width
//             minHeight: 'clamp(320px, 35.42vw, 510px)', // 510px at 1440px
//           }}
//         >

//           {/* TOP — badge + description */}
//           <div
//             className="flex flex-col"
//             style={{
//               gap:   'clamp(10px, 1.04vw, 15px)',
//               width: 'clamp(280px, 31.25vw, 450px)',
//             }}
//           >
//             {/* Badge */}
//             <div
//               className="flex items-center"
//               style={{ gap: 'clamp(5.1px, 0.29vw, 9.6px)' }}
//             >
//               <div
//                 className="bg-[#334454] flex-shrink-0"
//                 style={{
//                   width:        'clamp(10px, 0.97vw, 14px)',
//                   height:       'clamp(10px, 0.97vw, 14px)',
//                   borderRadius: 'clamp(2px, 0.21vw, 3px)',
//                 }}
//               />
//               <span
//                 className="font-sans font-normal uppercase text-[#334454] tracking-widest"
//                 style={{ fontSize: 'clamp(10px, 0.83vw, 12px)' }}
//               >
//                 Contact Us
//               </span>
//             </div>

//             {/* Description */}
//             <p
//               className="font-sans font-normal text-[#334454]"
//               style={{
//                 fontSize:      'clamp(14px, 1.39vw, 20px)',
//                 lineHeight:    '1',
//                 letterSpacing: 'clamp(-0.5px, -0.07vw, -1px)',
//               }}
//             >
//               Lorem ipsum dolor sit amet, consectetur ipsum dolor sit amet, consecteturLorem ipsum dolor
//             </p>
//           </div>

//           {/* BOTTOM — phone + email */}
//           <div
//             className="flex flex-col"
//             style={{ gap: 'clamp(14px, 1.53vw, 22px)' }}
//           >
//             {/* Phone */}
//             <div className="flex flex-col gap-[8px]">
//               <div className="flex items-center gap-[8px]">
//                 <svg
//                   viewBox="0 0 24 24" fill="none" stroke="#334454"
//                   strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
//                   className="flex-shrink-0"
//                   style={{ width: 'clamp(12.7px, 0.72vw, 24px)', height: 'clamp(12.7px, 0.72vw, 24px)' }}
//                 >
//                   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53 2 2 0 0 1 3.6 1.35h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
//                 </svg>
//                 <span
//                   className="font-sans font-normal text-[#334454]"
//                   style={{
//                     fontSize:      'clamp(14px, 1.39vw, 20px)',
//                     lineHeight:    '1',
//                     letterSpacing: 'clamp(-0.5px, -0.07vw, -1px)',
//                   }}
//                 >
//                   Phone number
//                 </span>
//               </div>
//               <a
//                 href="tel:+919876543210"
//                 className="font-sans font-normal text-[#6B859E] hover:underline transition-all"
//                 style={{
//                   fontSize:    'clamp(11.3px, 0.64vw, 21.3px)',
//                   paddingLeft: 'clamp(20px, 0.95vw, 34.6px)',
//                 }}
//               >
//                 +91 987654321
//               </a>
//             </div>

//             {/* Email */}
//             <div className="flex flex-col gap-[8px]">
//               <div className="flex items-center gap-[8px]">
//                 <svg
//                   viewBox="0 0 24 24" fill="none" stroke="#334454"
//                   strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
//                   className="flex-shrink-0"
//                   style={{ width: 'clamp(12.7px, 0.72vw, 24px)', height: 'clamp(12.7px, 0.72vw, 24px)' }}
//                 >
//                   <rect width="20" height="16" x="2" y="4" rx="2" />
//                   <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//                 </svg>
//                 <span
//                   className="font-sans font-normal text-[#334454]"
//                   style={{
//                     fontSize:      'clamp(14px, 1.39vw, 20px)',
//                     lineHeight:    '1',
//                     letterSpacing: 'clamp(-0.5px, -0.07vw, -1px)',
//                   }}
//                 >
//                   Drop us a Email at
//                 </span>
//               </div>
//               <a
//                 href="mailto:Chameri@gmail.com"
//                 className="font-sans font-normal text-[#6B859E] hover:underline transition-all"
//                 style={{
//                   fontSize:    'clamp(11.3px, 0.64vw, 21.3px)',
//                   paddingLeft: 'clamp(20px, 0.95vw, 34.6px)',
//                 }}
//               >
//                 Chameri@gmail.com
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* ══ RIGHT — form ════════════════════════════════════════════════ */}
//         <div
//           className="flex flex-col flex-shrink-0 w-full"
//           style={{
//             width:     'clamp(300px, 44.097vw, 635px)',
//             minHeight: 'clamp(380px, 42.22vw, 608px)', // 608px at 1440px
//             gap:       'clamp(6px, 0.69vw, 10px)', // 10px at 1440px
//           }}
//         >
//           {/* Heading */}
//           <h2
//             className="font-roundo font-medium text-[#334454]"
//             style={{
//               fontSize:      'clamp(40px, 4.51vw, 65px)',
//               lineHeight:    'clamp(37.5px, 4.17vw, 60px)',
//               letterSpacing: 'clamp(-0.5px, -0.06vw, -0.9px)',
//             }}
//           >
//             Contact Us
//           </h2>

//           {/* Form */}
//           <form
//             onSubmit={(e) => e.preventDefault()}
//             className="flex flex-col bg-[#EDE7DE] w-full"
//             style={{
//               paddingTop:    'clamp(17px, 1.88vw, 27px)',
//               paddingBottom: 'clamp(17px, 1.88vw, 27px)',
//               paddingLeft:   'clamp(34px, 3.82vw, 55px)',
//               paddingRight:  'clamp(34px, 3.82vw, 55px)',
//               gap:           'clamp(25px, 2.78vw, 40px)',
//               borderRadius:  'clamp(4px, 0.42vw, 6px)',
//             }}
//           >
//             {/* Name */}
//             <div>
//               <input
//                 type="text" name="name" placeholder="Enter Your Name"
//                 value={form.name} onChange={handleChange}
//                 className={inputBase} style={inputStyle}
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <input
//                 type="email" name="email" placeholder="Enter Email"
//                 value={form.email} onChange={handleChange}
//                 className={inputBase} style={inputStyle}
//               />
//             </div>

//             {/* Phone */}
//             <div
//               className="flex items-center border-b border-[#334454]/35 bg-transparent w-full"
//               style={{ height: 'clamp(33.75px, 3.75vw, 54px)' }}
//             >
//               <PhoneInput
//                 international defaultCountry="IN"
//                 value={form.phone}
//                 onChange={(val) => setForm({ ...form, phone: val })}
//                 placeholder="Phone number"
//                 className="contact-phone-input"
//                 style={{ width: '100%', outline: 'none' }}
//               />
//             </div>

//             {/* Message */}
//             <div>
//               <textarea
//                 name="message" placeholder="Type your message here..."
//                 value={form.message} onChange={handleChange}
//                 className={`${inputBase} resize-none`}
//                 style={{ ...inputStyle, height: 'clamp(68.75px, 7.64vw, 110px)', paddingTop: 'clamp(5px, 0.56vw, 8px)' }}
//               />
//             </div>

//             {/* Submit button */}
//             {/* Submit button */}
//             <div className="flex items-center">
//               <button
//                 type="submit"
//                 className="group relative flex items-center justify-center bg-[#6B859E] hover:bg-[#4a6074] transition-colors duration-500 overflow-hidden cursor-pointer border-none"
//                 style={{
//                   width:        'clamp(118.6px, 11.6vw, 167px)',
//                   height:       'clamp(36.9px, 3.61vw, 52px)',
//                   borderRadius: 'clamp(8.5px, 0.83vw, 12px)',
//                 }}
//               >
//                 {/* Sliding text */}
//                 <div
//                   className="absolute overflow-hidden"
//                   style={{
//                     top:    'clamp(10px, 1.01vw, 14.5px)',
//                     left:   'clamp(10px, 0.83vw, 12px)',
//                     width:  'clamp(70px, 6.74vw, 97px)',
//                     height: 'clamp(18px, 1.6vw, 23px)',
//                   }}
//                 >
//                   <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
//                     {['Contact Us', 'Contact Us'].map((label, i) => (
//                       <span
//                         key={i}
//                         className="font-sans font-medium text-white whitespace-nowrap flex items-center"
//                         style={{
//                           height:   'clamp(18px, 1.6vw, 23px)',
//                           fontSize: 'clamp(13px, 1.04vw, 15px)',
//                         }}
//                       >
//                         {label}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Arrow box */}
//                 <div
//                   className="absolute bg-white group-hover:bg-[#EDE7DE] transition-colors duration-500 overflow-hidden"
//                   style={{
//                     right:        'clamp(8.5px, 0.83vw, 12px)',
//                     width:        'clamp(21.3px, 2.08vw, 30px)',
//                     height:       'clamp(21.3px, 2.08vw, 30px)',
//                     borderRadius: 'clamp(5px, 0.49vw, 7px)',
//                   }}
//                 >
//                   <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
//                     <svg
//                       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
//                       className="text-[#6B859E]"
//                       style={{ width: 'clamp(10px, 0.97vw, 14px)', height: 'clamp(10px, 0.97vw, 14px)' }}
//                     >
//                       <path d="M5 12h14M12 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                   <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
//                     <svg
//                       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
//                       className="text-[#6B859E]"
//                       style={{ width: 'clamp(10px, 0.97vw, 14px)', height: 'clamp(10px, 0.97vw, 14px)' }}
//                     >
//                       <path d="M5 12h14M12 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                 </div>
//               </button>
//             </div>
//           </form>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default ContactSection;


// --------copied correct one from gallery --------------------

'use client';

import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import useContactForm from '@/hooks/useContactForm';
import FieldError, { FIELD_ERROR_COLOR } from '../common/FieldError';

/*
 * ─── CLAMP REFERENCE ────────────────────────────────────────────────────────
 *
 *  Formula : preferred_vw = (MAX_px - MIN_px) / (1920 - 375) * 100
 *  Viewport range: 375px (mobile) → 1920px (4xl)
 *
 *  OUTER WRAPPER
 *  pt                  : clamp(40px,   4.34vw, 106.6px)
 *  pr                  : clamp(20px,   6.28vw, 117.3px)
 *  pb                  : clamp(40px,   2.06vw,  68px)
 *  pl                  : clamp(20px,   5.62vw, 106.6px)
 *  max-w               : clamp(560px,  83vw,    1440px)
 *
 *  LEFT COLUMN
 *  width (lg+)         : clamp(280px,  20.3vw, 599.5px)
 *  height (lg+)        : clamp(362.4px,20.8vw, 679.3px)
 *  TOP block gap       : clamp(10.6px,  0.6vw,  20px)
 *  TOP block width     : clamp(280px,  20.3vw, 599.5px)
 *  BOTTOM block gap    : clamp(15.6px,  0.89vw, 29.3px)
 *
 *  Badge dot size      : clamp(9.9px,  0.56vw, 18.6px)
 *  Badge dot radius    : clamp(2px,    0.13vw,   4px)
 *  Badge gap           : clamp(5.1px,  0.29vw,   9.6px)
 *  Badge font          : clamp(11px,   0.5vw,   18.6px)
 *
 *  Desc font           : clamp(14px,   0.81vw,  26.6px)
 *  Desc lead           : clamp(19.6px, 1.14vw,  37.3px)
 *  Desc tracking       : clamp(-0.28px,-0.016vw,-0.53px)
 *
 *  Contact icon size   : clamp(12.7px, 0.72vw,  24px)
 *  Contact label font  : clamp(12.7px, 0.72vw,  24px)
 *  Contact link font   : clamp(11.3px, 0.64vw,  21.3px)
 *  Contact link pl     : clamp(20px,   0.95vw,  34.6px)
 *
 *  RIGHT COLUMN
 *  width (lg+)         : clamp(400px,  28.6vw, 846.6px)
 *  height (lg+)        : clamp(432px,  25.3vw, 810px)
 *  gap                 : clamp(7.1px,   0.4vw,  13.3px)
 *
 *  Heading font        : clamp(28px,   2.32vw,  64px)
 *  Heading lead        : clamp(34px,   2.97vw,  80px)
 *  Heading tracking    : clamp(-0.56px,-0.042vw,-1.2px)
 *
 *  Form pt/pb          : clamp(19.2px,  1.1vw,  36px)
 *  Form gap            : clamp(28.4px,  1.62vw, 53.3px)
 *  Form radius         : clamp(4.3px,   0.24vw,  8px)
 *
 *  Input font          : clamp(13.4px,  0.52vw, 21.3px)
 *  Input height        : clamp(38.4px,  2.19vw, 72px)
 *  Input pb            : clamp(2.8px,   0.16vw,  5.3px)
 *  Textarea pt         : clamp(5.7px,   0.32vw, 10.6px)
 *
 *  Btn width           : clamp(118.6px, 6.7vw, 222.6px)
 *  Btn height          : clamp(36.9px,  2.1vw,  69.3px)
 *  Btn radius          : clamp(8.5px,   0.49vw, 16px)
 *  Text top            : clamp(9.9px,   0.57vw, 18.6px)
 *  Text left           : clamp(8.5px,   0.49vw, 16px)
 *  Text width          : clamp(69px,    3.9vw, 129px)
 *  Text height         : clamp(16.3px,  0.92vw, 30.6px)
 *  Text font           : clamp(10.6px,  0.6vw,  20px)
 *  Arrow right         : clamp(8.5px,   0.49vw, 16px)
 *  Arrow box size      : clamp(21.3px,  1.21vw, 40px)
 *  Arrow box radius    : clamp(5px,     0.28vw,  9.3px)
 *  Arrow svg size      : clamp(10px,    0.56vw, 18.6px)
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

/* ─── Shared Arrow SVG ───────────────────────────────────────────────── */
const ArrowSVG = () => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    className="text-[#6B859E]"
    style={{ width: 'clamp(10px, 0.56vw, 18.6px)', height: 'clamp(10px, 0.56vw, 18.6px)' }}
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ContactSection = () => {
  const {
    form, errors, status, statusMessage,
    handleChange, handlePhoneChange, handleSubmit,
  } = useContactForm('Home page');

  /* shared input className — only non-sizing utilities */
  const inputBase =
    'font-geist font-regular text-[#333333CC] bg-transparent border-0 border-b border-[#000000] outline-none w-full placeholder-[#000000]/40 focus:border-[#000000] transition-colors';

  /* shared input inline style — reused for name, email, phone height, textarea */
  const inputStyle = {
    fontSize:      'clamp(14px, 1.11vw, 18px)',
    height:        'clamp(33.75px, 3.75vw, 54px)',
    paddingBottom: 'clamp(4px, 0.4vw, 6px)',
    paddingLeft:   'clamp(12px, 0.4vw, 12px)',
  };

  return (
    <section className="w-full bg-[#EDE7DE] flex justify-center overflow-hidden">

      {/* ── Outer wrapper ─────────────────────────────────────────────── */}
      <div
        className="w-full mx-auto flex flex-col lg:flex-row justify-between items-start gap-[28px] lg:gap-0"
        style={{
          width:         '100%',
          maxWidth:      'clamp(375px, 100vw, 1920px)',
          minHeight:     'clamp(400px, 51.31vw, 739px)', // 739px at 1440px
          paddingTop:    'clamp(20px, 5.56vw, 80px)',
          paddingRight:  'clamp(20px, 6.11vw, 88px)',
          paddingBottom: 'clamp(40px, 3.54vw, 51px)',
          paddingLeft:   'clamp(20px, 5.56vw, 80px)',
        }}
      >

        {/* ══ LEFT ════════════════════════════════════════════════════════
            On mobile this wrapper becomes `contents` (renders no box of its own),
            which promotes its TOP/BOTTOM children into the outer flex flow so they
            can be reordered around the form via the `order-*` classes below.
            At md+ it reverts to a normal flex column, unchanged from before. */}
        <div
          className="contents lg:flex lg:flex-col lg:justify-between flex-shrink-0 w-full"
          style={{
            width:     '100%',
            maxWidth:  'clamp(375px, 100vw, 450px)', // Exact Figma width
            minHeight: 'clamp(320px, 35.42vw, 510px)', // 510px at 1440px
          }}
        >

          {/* TOP — badge + heading (mobile only) + description — order-1 on mobile */}
          <div
            className="order-1 lg:order-none w-full pt-[28px] pb-[6px] lg:pt-0 lg:pb-0 flex flex-col gap-[7px] lg:gap-[clamp(10px,1.04vw,15px)]"
            style={{ width: 'clamp(280px, 30vw, 600px)' }}
          >
            {/* Badge */}
            <div
              className="flex items-center"
              style={{ gap: 'clamp(5.1px, 0.29vw, 9.6px)' }}
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
            Let's Talk 
          </span>
            </div>

            {/* Heading — mobile only; on md+ the heading lives next to the form below */}
            <h2
              className="lg:hidden font-roundo font-medium text-[#000000] m-0"
              style={{ fontSize: '32px', lineHeight: '36.6px', letterSpacing: '-0.73px' }}
            >
              Let's Talk 
            </h2>

            {/* Description */}
            <p
              className="font-geist font-regular text-[#1C1C1CCC] m-0 leading-[21px] lg:leading-none"
              style={{
                fontSize:      'clamp(14px, 1.739vw, 24px)',
                letterSpacing: 'clamp(-0.5px, -0.07vw, -2px)',
              }}
            >
              Schedule a site visit or request detailed 
project information. We are here to help you
every step of the way.
            </p>
          </div>

          {/* BOTTOM — phone + email — order-3 on mobile, so it renders after the form */}
          <div
            className="order-3 lg:order-none flex flex-col gap-[16px] lg:gap-[clamp(14px,1.53vw,22px)]"
          >
            {/* Phone — order-2 on mobile (renders after Email, matching the reference) */}
            <div className="order-2 lg:order-none flex flex-col gap-[8px]">
              <div className="flex items-center gap-[8px]">
                <svg
                  viewBox="0 0 24 24" fill="none" stroke="#334454"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  className="flex-shrink-0"
                  style={{ width: 'clamp(14.7px, 0.82vw, 30px)', height: 'clamp(14.7px, 0.82vw, 30px)' }}
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53 2 2 0 0 1 3.6 1.35h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span
                  className="font-sans font-normal text-[#000000]"
                  style={{
                    fontSize:      'clamp(15px, 1.39vw, 22px)',
                    lineHeight:    '1',
                    letterSpacing: 'clamp(-0.5px, -0.07vw, -1px)',
                  }}
                >
                  Phone number
                </span>
              </div>
              <a
                href="tel:+919876543210"
                className="font-sans font-normal text-[#6B859E] underline hover:text-[#000000] transition-all"
                style={{
                  fontSize:    'clamp(14px, 1.18vw, 28px)',
                  paddingLeft: 'clamp(6px, 0.55vw, 34.6px)',
                }}
              >
                +91 987654321
              </a>
            </div>

            {/* Email — order-1 on mobile (renders before Phone, matching the reference) */}
            <div className="order-1 lg:order-none flex flex-col gap-[8px]">
              <div className="flex items-center gap-[8px]">
                <svg
                  viewBox="0 0 24 24" fill="none" stroke="#334454"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  className="flex-shrink-0"
                  style={{ width: 'clamp(14.7px, 0.82vw, 26px)', height: 'clamp(14.7px, 0.82vw, 26px)' }}
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span
                  className="font-sans font-normal text-[#000000]"
                  style={{
                    fontSize:      'clamp(15px, 1.39vw, 20px)',
                    lineHeight:    '1',
                    letterSpacing: 'clamp(-0.5px, -0.07vw, -1px)',
                  }}
                >
                  Drop us a Email at
                </span>
              </div>
              <a
                href="mailto:Chameri@gmail.com"
                className="font-sans font-normal text-[#6B859E] underline hover:text-[#000000] transition-all"
                style={{
                  fontSize:    'clamp(14px, 1.14vw, 28.3px)',
                  paddingLeft: 'clamp(6px, 0.55vw, 34.6px)',
                }}
              >
                Chameri@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* ══ RIGHT — form ════════════════════════════════════════════════
            `contents` on mobile so the form can be reordered (order-2) between
            the TOP info block and the BOTTOM phone/email block above. */}
        <div className="contents lg:flex lg:flex-col flex-shrink-0 w-full"
        style={{
          maxWidth:'clamp(100px,50.097vw,1140px)'
        }}>
          {/* Heading — hidden on mobile, shown here from md+ (mobile version lives in the TOP block) */}
          <h2
            className="hidden lg:block font-roundo font-medium text-[#000000]"
            style={{
              fontSize:      'clamp(40px, 4.51vw, 65px)',
              lineHeight:    'clamp(37.5px, 4.17vw, 60px)',
              letterSpacing: 'clamp(-0.5px, -0.06vw, -0.9px)',
            }}
          >
            Contact Us
          </h2>

          {/* Form */}
          <form
            noValidate
            onSubmit={handleSubmit}
            className="order-2 lg:order-none flex flex-col bg-[#EDE7DE] w-full lg:w-[clamp(400px,48.097vw,1240px)] lg:max-w-[clamp(300px,50.097vw,1140px)] gap-[20px] lg:gap-[clamp(25px,2.78vw,40px)] px-0 lg:px-[clamp(34px,3.82vw,55px)]"
            style={{
              paddingTop:    'clamp(17px, 1.88vw, 27px)',
              paddingBottom: 'clamp(17px, 1.88vw, 27px)',
              paddingRight:  'clamp(7px, 1.88vw, 37px)',
              // paddingLeft:   'clamp(7px, 3.88vw, 17px)',
              borderRadius:  'clamp(4px, 0.42vw, 6px)',
            }}
          >
            {/* Field group — its own tighter gap on mobile; on md+ becomes `contents` so
                Name/Email/Phone/Message rejoin the form's flat flex flow, unchanged from before. */}
            <div className="flex flex-col gap-[10px] lg:contents">
              {/* Name */}
              <div>
                <input
                  type="text" name="name" placeholder="Enter Your Name *"
                  value={form.name} onChange={handleChange}
                  className={inputBase} style={errors.name ? { ...inputStyle, borderBottomColor: FIELD_ERROR_COLOR } : inputStyle}
                  required
                  aria-required="true"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'home-name-error' : undefined}
                />
                <FieldError id="home-name-error">{errors.name}</FieldError>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email" name="email" placeholder="Enter Email *"
                  value={form.email} onChange={handleChange}
                  className={inputBase} style={errors.email ? { ...inputStyle, borderBottomColor: FIELD_ERROR_COLOR } : inputStyle}
                  required
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'home-email-error' : undefined}
                />
                <FieldError id="home-email-error">{errors.email}</FieldError>
              </div>

              {/* Phone */}
              <div>
                <div
                  className="flex items-center border-b bg-transparent w-full"
                  style={{ borderBottomColor: errors.phone ? FIELD_ERROR_COLOR : '#000000', height: 'clamp(33.75px, 3.75vw, 54px)',paddingBottom: 'clamp(4px, 0.4vw, 6px)',paddingLeft:   'clamp(12px, 0.4vw, 12px)', }}
                >
                  <PhoneInput
                    international defaultCountry="IN"
                    value={form.phone}
                    onChange={handlePhoneChange}
                    placeholder="Phone number"
                    className="contact-phone-input"
                    style={{ width: '100%', outline: 'none' }}
                  />
                </div>
                <FieldError id="home-phone-error">{errors.phone}</FieldError>
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message" placeholder="Type your message here... *"
                  value={form.message} onChange={handleChange}
                  className={`${inputBase} resize-none`}
                  style={{ ...inputStyle, ...(errors.message ? { borderBottomColor: FIELD_ERROR_COLOR } : null), height: 'clamp(68.75px, 7.64vw, 110px)', paddingTop: 'clamp(5px, 0.56vw, 8px)' }}
                  required
                  aria-required="true"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'home-message-error' : undefined}
                />
                <FieldError id="home-message-error">{errors.message}</FieldError>
              </div>
            </div>

            {/* Submit button */}
            <div className="flex flex-col items-start w-full" style={{ gap: '10px' }}>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group relative flex items-center justify-center bg-[#6B859E] hover:bg-[#4a6074] transition-colors duration-500 overflow-hidden cursor-pointer border-none w-[clamp(118.6px,11.6vw,167px)] h-[clamp(36.9px,3.61vw,52px)]"
                style={{
                  borderRadius: 'clamp(8.5px, 0.83vw, 12px)',
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
                    {['Contact Us', 'Contact Us'].map((label, i) => (
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
              </button>
              {statusMessage && (
                <p
                  role="status"
                  aria-live="polite"
                  className="font-sans font-normal"
                  style={{
                    margin:     0,
                    fontSize:   'clamp(12px, 0.9vw, 14px)',
                    lineHeight: 1.4,
                    color:      status === 'error' ? FIELD_ERROR_COLOR : '#2E6B4F',
                  }}
                >
                  {statusMessage}
                </p>
              )}
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
