// 'use client';

// import React, { useState } from 'react';
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';

// const SOCIALS = [
//   {
//     label: 'Instagram',
//     width: 'clamp(18px, 1.6vw, 23px)', height: 'clamp(17px, 1.53vw, 22px)',
//     svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg>,
//   },
//   {
//     label: 'Facebook',
//     width: 'clamp(17px, 1.53vw, 22px)', height: 'clamp(17px, 1.53vw, 22px)',
//     svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
//   },
//   {
//     label: 'YouTube',
//     width: 'clamp(24px, 2.08vw, 30px)', height: 'clamp(24px, 2.08vw, 30px)',
//     svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
//   },
//   {
//     label: 'Pinterest',
//     width: 'clamp(23px, 2.01vw, 29px)', height: 'clamp(22px, 1.94vw, 28px)',
//     svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z" /></svg>,
//   },
//   {
//     label: 'WhatsApp',
//     width: 'clamp(22px, 1.94vw, 28px)', height: 'clamp(22px, 1.94vw, 28px)',
//     svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
//   }
// ];

// export default function ContactPageForm() {
//   const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const inputBase =
//     'font-sans font-normal text-[#334454] bg-transparent border-0 border-b border-[#334454]/35 outline-none w-full placeholder-[#334454]/40 focus:border-[#334454] transition-colors';

//   const inputStyle = {
//     fontSize: 'clamp(14px, 1.11vw, 16px)',
//     height: 'clamp(40px, 3.75vw, 54px)',
//     paddingBottom: 'clamp(4px, 0.4vw, 6px)',
//   };

//   return (
//     <section 
//       className="w-full bg-[#EDE7DE] flex justify-center border-t border-[#334454]/10 overflow-hidden"
//     >
//       <div 
//         className="flex flex-col lg:flex-row justify-between w-full mx-auto"
//         style={{
//           maxWidth: 'clamp(1200px, 100vw, 1920px)',
//           paddingTop: 'clamp(40px, 4.16vw, 60px)',
//           paddingRight: 'clamp(20px, 6.18vw, 89px)',
//           paddingBottom: 'clamp(30px, 3.54vw, 51px)',
//           paddingLeft: 'clamp(20px, 5.13vw, 74px)',
//           gap: 'clamp(40px, 4vw, 0px)', // Gap on mobile
//         }}
//       >
//         {/* ── LEFT SECTION (Connect with us) ──────────────────────────────── */}
//         <div 
//           className="flex flex-col justify-between"
//           style={{
//             width: 'clamp(300px, 36.59vw, 527px)',
//             minHeight: 'clamp(380px, 37.56vw, 541px)',
//           }}
//         >
//           {/* Inner padded container */}
//           <div 
//             className="flex flex-col justify-between h-full"
//             style={{
//               paddingTop: 'clamp(12px, 1.31vw, 19px)',
//               paddingRight: 'clamp(12px, 1.25vw, 18px)',
//               paddingBottom: 'clamp(8px, 0.83vw, 12px)',
//               paddingLeft: 'clamp(12px, 1.25vw, 18px)',
//             }}
//           >
//             {/* TOP: Badge & Heading */}
//             <div className="flex flex-col gap-4">
//               {/* Badge */}
//               <div 
//                 className="flex items-center"
//                 style={{
//                   width: 'clamp(90px, 8.13vw, 117.2px)',
//                   height: 'clamp(24px, 2.13vw, 30.8px)',
//                   gap: 'clamp(5px, 0.5vw, 7.2px)',
//                   paddingTop: 'clamp(4px, 0.37vw, 5.4px)',
//                   paddingBottom: 'clamp(4px, 0.37vw, 5.4px)',
//                   borderRadius: '90px',
//                 }}
//               >
//                 <div 
//                   className="bg-[#334454] rounded-[3px]"
//                   style={{
//                     width: 'clamp(10px, 0.97vw, 14px)',
//                     height: 'clamp(10px, 0.97vw, 14px)',
//                     padding: 'clamp(2.5px, 0.25vw, 3.6px)',
//                   }}
//                 />
//                 <span 
//                   className="font-geist font-normal text-[#334454] uppercase"
//                   style={{
//                     fontSize: 'clamp(12px, 1.12vw, 16.2px)',
//                     lineHeight: 'clamp(14px, 1.35vw, 19.44px)',
//                     letterSpacing: '-0.32px',
//                   }}
//                 >
//                   Contact us
//                 </span>
//               </div>

//               {/* Heading */}
//               <div className="flex flex-col">
//                 {['Connect with us', 'To build with vision.'].map((text, i) => (
//                   <h2 
//                     key={i}
//                     className="font-roundo font-medium text-[#1A1A1A] text-left"
//                     style={{
//                       fontSize: 'clamp(36px, 4.16vw, 60px)',
//                       lineHeight: 'clamp(42px, 4.59vw, 66.14px)',
//                       letterSpacing: 'clamp(-1.5px, -0.21vw, -3.05px)',
//                     }}
//                   >
//                     {text}
//                   </h2>
//                 ))}
//               </div>
//             </div>

//             {/* BOTTOM: Contact Details & Socials */}
//             <div 
//               className="flex flex-col"
//               style={{
//                 gap: 'clamp(12px, 1.25vw, 18px)',
//                 // marginTop: 'clamp(30px, 8vw, 0px)'
//                 marginBottom: 'clamp(30px, 2vw, 0px)'
//               }}
//             >
//               <div 
//                 className="flex flex-col"
//                 style={{ gap: 'clamp(12px, 1.25vw, 18px)' }}
//               >
//                 {/* Phone */}
//                 <div className="flex flex-col" style={{ gap: '6px' }}>
//                   <div className="flex items-center" style={{ gap: '6px' }}>
//                     <svg viewBox="0 0 24 24" fill="none" stroke="#334454" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
//                       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53 2 2 0 0 1 3.6 1.35h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
//                     </svg>
//                     <span 
//                       className="font-geist font-normal text-[#334454]"
//                       style={{ fontSize: 'clamp(14px, 1.25vw, 18px)', letterSpacing: '-1px' }}
//                     >
//                       Phone number
//                     </span>
//                   </div>
//                   <a 
//                     href="tel:+91987654321" 
//                     className="font-geist font-medium text-[#6B859E] underline hover:text-[#334454] transition-colors"
//                     style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
//                   >
//                     +91 987654321
//                   </a>
//                 </div>

//                 {/* Email */}
//                 <div className="flex flex-col" style={{ gap: '6px' }}>
//                   <div className="flex items-center" style={{ gap: '6px' }}>
//                     <svg viewBox="0 0 24 24" fill="none" stroke="#334454" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
//                       <rect width="20" height="16" x="2" y="4" rx="2"/>
//                       <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
//                     </svg>
//                     <span 
//                       className="font-geist font-normal text-[#334454]"
//                       style={{ fontSize: 'clamp(14px, 1.25vw, 18px)', letterSpacing: '-1px' }}
//                     >
//                       Drop us a Email at
//                     </span>
//                   </div>
//                   <a 
//                     href="mailto:Chameri@gmail.com" 
//                     className="font-geist font-medium text-[#6B859E] underline hover:text-[#334454] transition-colors"
//                     style={{ fontSize: 'clamp(14px, 1.25vw, 18px)' }}
//                   >
//                     Chameri@gmail.com
//                   </a>
//                 </div>
//               </div>

//               {/* Social Icons */}
//               <div 
//                 className="flex items-center"
//                 style={{ gap: 'clamp(10px, 0.97vw, 14px)', height: '30px', marginTop: '10px' }}
//               >
//                 {SOCIALS.map(({ label, width, height, svg }) => (
//                   <a
//                     key={label}
//                     href="#"
//                     aria-label={label}
//                     className="text-[#334454] hover:text-[#6B859E] hover:scale-110 transition-all flex items-center justify-center flex-shrink-0"
//                     style={{ width, height }}
//                   >
//                     {svg}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── RIGHT SECTION (Form) ────────────────────────────────────────── */}
//         <div 
//           className="flex flex-col justify-center"
//           style={{
//             width: 'clamp(320px, 44.09vw, 635px)',
//             minHeight: 'clamp(400px, 39vw, 562px)',
//             paddingTop: 'clamp(16px, 1.94vw, 28px)',
//           }}
//         >
//           <form
//             onSubmit={(e) => e.preventDefault()}
//             className="flex flex-col w-full"
//             style={{
//               paddingTop: 'clamp(16px, 1.875vw, 27px)',
//               paddingRight: 'clamp(24px, 3.81vw, 55px)',
//               paddingBottom: 'clamp(16px, 1.875vw, 27px)',
//               paddingLeft: 'clamp(24px, 3.81vw, 55px)',
//               gap: 'clamp(24px, 2.77vw, 40px)',
//               borderRadius: '6px',
//             }}
//           >
//             {/* Name */}
//             <div className="flex flex-col" style={{ gap: '8px', height: 'clamp(40px, 3.75vw, 54px)' }}>
//               <input
//                 type="text" name="name" placeholder="Enter Your Name"
//                 value={form.name} onChange={handleChange}
//                 className={inputBase} style={inputStyle}
//               />
//             </div>

//             {/* Email */}
//             <div className="flex flex-col" style={{ gap: '8px', height: 'clamp(40px, 3.75vw, 54px)' }}>
//               <input
//                 type="email" name="email" placeholder="Enter Email"
//                 value={form.email} onChange={handleChange}
//                 className={inputBase} style={inputStyle}
//               />
//             </div>

//             {/* Phone */}
//             <div 
//               className="flex items-center border-b border-[#334454]/35 bg-transparent w-full"
//               style={{ gap: '8px', height: 'clamp(40px, 3.75vw, 54px)' }}
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
//             <div className="flex flex-col" style={{ gap: '8px' }}>
//               <textarea
//                 name="message" placeholder="Type your message here..."
//                 value={form.message} onChange={handleChange}
//                 className={`${inputBase} resize-none`}
//                 style={{ ...inputStyle, height: 'clamp(80px, 7.63vw, 110px)', paddingTop: '8px' }}
//               />
//             </div>

//             {/* Submit Button */}
//             <div className="flex items-center w-full" style={{ height: '48px' }}>
//               <button
//                 type="submit"
//                 className="group relative flex items-center justify-center bg-[#6B859E] hover:bg-[#4a6074] transition-colors duration-500 overflow-hidden cursor-pointer border-none"
//                 style={{
//                   width: '159px',
//                   height: '48px',
//                   borderRadius: '12px',
//                 }}
//               >
//                 {/* Sliding text */}
//                 <div
//                   className="absolute overflow-hidden"
//                   style={{
//                     top: '12.5px',
//                     left: '12px',
//                     width: '97px',
//                     height: '23px',
//                   }}
//                 >
//                   <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
//                     {['Contact Us', 'Contact Us'].map((label, i) => (
//                       <span
//                         key={i}
//                         className="font-sans font-medium text-white whitespace-nowrap flex items-center"
//                         style={{ height: '23px', fontSize: '15px' }}
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
//                     right: '12px',
//                     width: '30px',
//                     height: '30px',
//                     borderRadius: '7px',
//                   }}
//                 >
//                   <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#6B859E]" style={{ width: '14px', height: '14px' }}>
//                       <path d="M5 12h14M12 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                   <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#6B859E]" style={{ width: '14px', height: '14px' }}>
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
// }


// ------------------------------
'use client';

import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import useContactForm from '@/hooks/useContactForm';
import FieldError, { FIELD_ERROR_COLOR } from '../common/FieldError';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ContactPageForm
 * ─────────────────────────────────────────────────────────────────────────────
 * Baseline viewport : 1440px  (3xl)
 * Fluid range       : 375px → 1920px
 *
 * clamp() formula
 *   vw_value = (DESIGN_PX / 1440) × 100
 *   result   = clamp(MOBILE_FLOOR, vw_value vw, DESKTOP_CEIL)
 *
 * Quick reference — design values used below:
 *   Section paddingTop     60px → 4.167vw    paddingBottom  51px → 3.542vw
 *   Section paddingLeft    74px → 5.139vw    paddingRight   89px → 6.181vw
 *
 *   Left col  w: 527px → 36.597vw   minH: 541px → 37.569vw
 *   Right col w: 635px → 44.097vw   minH: 562px → 39.028vw
 *
 *   Inner pad v: 19px → 1.319vw     inner pad h: 18px → 1.250vw
 *
 *   Badge  w: 117.2px → 8.139vw    h: 30.8px → 2.139vw
 *   Badge gap: 7.2px → 0.500vw     badge icon: 14px → 0.972vw
 *   Badge fontSize: 16.2px → 1.125vw
 *
 *   Heading fontSize: 60px → 4.167vw   lineHeight: 66.14px → 4.593vw
 *   Heading letterSpacing: -3.05px → -0.212vw (negative clamp)
 *
 *   Contact gap: 18px → 1.250vw
 *   Icon size: 22px → 1.528vw
 *   Label fontSize: 18px → 1.250vw
 *   Social gap: 14px → 0.972vw
 *
 *   Form paddingV: 27px → 1.875vw   form paddingH: 55px → 3.819vw
 *   Form gap: 40px → 2.778vw
 *
 *   Input height: 54px → 3.750vw    input fontSize: 16px → 1.111vw
 *   Textarea h: 110px → 7.639vw
 *
 *   Submit btn w: 159px → 11.042vw  h: 48px → 3.333vw
 *   Submit btn borderRadius: 12px → 0.833vw
 *   Submit text left: 12px → 0.833vw  top: 12.5px → 0.868vw
 *   Submit text w: 97px → 6.736vw   text h: 23px → 1.597vw
 *   Submit fontSize: 15px → 1.042vw
 *   Arrow box right: 12px → 0.833vw  w: 30px → 2.083vw  h: 30px → 2.083vw
 *   Arrow box br: 7px → 0.486vw     arrow svg: 14px → 0.972vw
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SOCIALS = [
  {
    label: 'Instagram',
    width:  'clamp(18px, 1.597vw, 26px)',
    height: 'clamp(17px, 1.528vw, 24px)',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    width:  'clamp(18px, 1.597vw, 26px)',
    height: 'clamp(17px, 1.528vw, 24px)',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    width:  'clamp(18px, 1.597vw, 26px)',
    height: 'clamp(17px, 3.628vw, 48px)',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    width:  'clamp(18px, 1.597vw, 26px)',
    height: 'clamp(17px, 1.528vw, 24px)',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    width:  'clamp(18px, 1.597vw, 26px)',
    height: 'clamp(17px, 1.528vw, 24px)',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
];

export default function ContactPageForm() {
  const {
    form, errors, status, statusMessage,
    handleChange, handlePhoneChange, handleSubmit,
  } = useContactForm('Contact page');

  const inputBase =
    'font-geist font-regular text-[#333333CC] bg-transparent border-0 border-b border-[#000000] outline-none w-full placeholder-[#000000]/40 focus:border-[#000000] transition-colors';

  /* Shared input inline style — mirrors the home ContactSection form exactly,
     so both contact forms share one field metric. paddingLeft is what insets
     the placeholder from the underline's left edge; it was missing here, so
     the placeholders sat flush against the border. */
  const inputStyle = {
    fontSize:      'clamp(16px, 1.11vw, 18px)',
    height:        'clamp(33.75px, 3.75vw, 54px)',
    paddingBottom: 'clamp(4px, 0.4vw, 6px)',
    paddingLeft:   'clamp(12px, 0.4vw, 12px)',
  };

  return (
    /*
     * ── SECTION ───────────────────────────────────────────────────────────
     * No sizing props here — full-width wrapper, overflow hidden.
     */
    <section className="w-full bg-[#EDE7DE] flex justify-center border-t border-[#334454]/10 overflow-hidden">

      {/*
       * ── CONTENT ROW ─────────────────────────────────────────────────────
       * paddingTop    60px  → 4.167vw   floor 40px  ceil 60px
       * paddingBottom 51px  → 3.542vw   floor 30px  ceil 51px
       * paddingLeft   74px  → 5.139vw   floor 20px  ceil 74px
       * paddingRight  89px  → 6.181vw   floor 20px  ceil 89px
       * gap (col↔col) 0px desktop, 28px mobile — Tailwind gap-[28px] lg:gap-0;
       * desktop spacing instead comes from `justify-between` pushing the
       * two fixed-width columns to opposite ends of the row.
       */}
      <div
        className="flex flex-col lg:flex-row justify-between w-full mx-auto gap-[14px] lg:gap-0"
        style={{
          maxWidth:      'clamp(300px, 100vw, 1920px)',
          paddingTop:    'clamp(40px, 4.167vw, 60px)',
          paddingBottom: 'clamp(30px, 3.542vw, 51px)',
          paddingLeft:   'clamp(20px, 5.139vw, 74px)',
          paddingRight:  'clamp(20px, 6.181vw, 89px)',
        }}
      >

        {/* ══════════════════════════════════════════════════════════════════
         * LEFT COLUMN — "Connect with us"
         * w:    527px → 36.597vw   floor 300px  ceil 527px
         * minH: 541px → 37.569vw   floor 380px  ceil 541px
         * ══════════════════════════════════════════════════════════════════ */}
        <div
          className="contents lg:flex lg:flex-col lg:justify-between flex-shrink-0 w-full"
          style={{
            width:     'clamp(300px, 39.597vw, 827px)',
            minHeight: 'clamp(380px, 37.569vw, 541px)',
          }}
        >

          {/*
           * Inner padded container
           * paddingTop/Bottom : 19px → 1.319vw   floor 12px  ceil 19px
           * paddingLeft/Right : 18px → 1.250vw   floor 12px  ceil 18px
           *
           * `contents` on mobile — this box (and its padding) disappears so
           * the TOP/BOTTOM blocks below promote into the outer row's flex
           * flow and can be reordered around the form via `order-*`. At
           * lg+ it reverts to a normal padded flex column, unchanged.
           */}
          <div
            className="contents lg:flex lg:flex-col lg:justify-between lg:h-full"
            style={{
              paddingTop:    'clamp(2px, 0.319vw, 6px)',
              paddingBottom: 'clamp(4px,  0.833vw, 8px)',
              paddingLeft:   'clamp(12px, 1.250vw, 18px)',
              paddingRight:  'clamp(12px, 1.250vw, 18px)',
            }}
          >

            {/* ── TOP: Badge + Heading — order-1 on mobile ─────────────── */}
            <div
              className="order-1 lg:order-none flex flex-col"
              style={{ gap: 'clamp(12px, 1.111vw, 16px)' }}
            >

              {/*
               * Badge container
               * w:    117.2px → 8.139vw   floor 90px   ceil 117.2px
               * h:     30.8px → 2.139vw   floor 24px   ceil  30.8px
               * gap:    7.2px → 0.500vw   floor  4px   ceil   7.2px
               * paddingV: 5.4px → 0.375vw floor  3px   ceil   5.4px
               * borderRadius: 90px (fully-rounded pill)
               */}
              <div
                className="flex items-center"
                style={{
                  width:         'clamp(90px, 8.139vw, 120.2px)',
                  height:        'clamp(24px, 2.139vw, 30.8px)',
                  gap:           'clamp(4px, 0.500vw, 7.2px)',
                  paddingTop:    'clamp(3px, 0.375vw, 5.4px)',
                  paddingBottom: 'clamp(3px, 0.375vw, 5.4px)',
                  borderRadius:  '90px',
                }}
              >
                {/*
                 * Badge icon
                 * w/h: 14px → 0.972vw   floor 10px  ceil 14px
                 * padding: 3.6px → 0.250vw  floor 2px  ceil 3.6px
                 * borderRadius: 3px → 0.208vw  floor 2px  ceil 3px
                 */}
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
            CONTACT US
          </span>
              </div>

              {/*
               * Heading block
               * fontSize:      60px → 4.167vw   floor 28px  ceil 60px
               * lineHeight:  66.14px → 4.593vw  floor 34px  ceil 66.14px
               * letterSpacing: -3.05px → -0.212vw (negative clamp)
               */}
              <div className="flex flex-col">
                {['Connect with us', 'To build the dream.'].map((text, i) => (
                  <h2
                    key={i}
                    className="font-roundo font-medium text-[#1A1A1A] text-left"
                    style={{
                      fontSize:      'clamp(25px, 4.167vw, 78px)',
                      lineHeight:    'clamp(34px, 4.593vw, 76.14px)',
                      letterSpacing: 'clamp(-3.05px, -0.212vw, -1.5px)',
                      margin:        0,
                    }}
                  >
                    {text}
                  </h2>
                ))}
              </div>
            </div>

            {/* ── BOTTOM: Contact details + socials — order-3 on mobile, so it renders after the form ── */}
            <div
              className="order-3 lg:order-none flex flex-col"
              style={{
                gap:          'clamp(12px, 1.250vw, 18px)',
                marginBottom: 'clamp(0px, 2.083vw, 30px)',
                maxWidth: 'clamp(400px, 40vw, 616px)',
              }}
            >

              {/* Phone + Email block */}
              <div
                className="flex flex-col"
                style={{ gap: 'clamp(12px, 1.250vw, 18px)' }}
              >

                {/* ── Phone ─────────────────────────────────────────────
                 * icon: 22px → 1.528vw   floor 16px  ceil 22px
                 * label/link fontSize: 18px → 1.250vw  floor 13px  ceil 18px
                 * icon gap: 6px → 0.417vw  floor 4px  ceil 6px
                 * row gap: 6px → 0.417vw  floor 4px  ceil 6px
                 */}
                <div
                  className="flex flex-col"
                  style={{ gap: 'clamp(4px, 0.417vw, 6px)' }}
                >
                  <div
                    className="flex items-center"
                    style={{ gap: 'clamp(4px, 0.417vw, 6px)' }}
                  >
                    <svg
                      viewBox="0 0 24 24" fill="none"
                      stroke="#334454" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round"
                      style={{
                        width:     'clamp(16px, 1.528vw, 22px)',
                        height:    'clamp(16px, 1.528vw, 22px)',
                        flexShrink: 0,
                      }}
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53 2 2 0 0 1 3.6 1.35h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span
                      className="font-geist font-normal text-[#000000]"
                      style={{
                        fontSize:      'clamp(13px, 1.250vw, 22px)',
                        letterSpacing: '-1px',
                      }}
                    >
                      Phone Number:
                    </span>
                  </div>
                  <a
                    href="tel:+91987654321"
                    className="font-geist font-medium text-[#6B859E] underline hover:text-[#000000] transition-colors"
                    style={{ fontSize: 'clamp(13px, 1.250vw, 22px)' }}
                  >
                    +91 987654321
                  </a>
                </div>

                {/* ── Email ─────────────────────────────────────────────── */}
                <div
                  className="flex flex-col"
                  style={{ gap: 'clamp(4px, 0.417vw, 6px)' }}
                >
                  <div
                    className="flex items-center"
                    style={{ gap: 'clamp(4px, 0.417vw, 6px)' }}
                  >
                    <svg
                      viewBox="0 0 24 24" fill="none"
                      stroke="#334454" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round"
                      style={{
                        width:      'clamp(16px, 1.528vw, 22px)',
                        height:     'clamp(16px, 1.528vw, 22px)',
                        flexShrink: 0,
                      }}
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span
                      className="font-geist font-normal text-[#000000]"
                      style={{
                        fontSize:      'clamp(13px, 1.250vw, 22px)',
                        letterSpacing: '-1px',
                      }}
                    >
                      Drop Us A Email At:
                    </span>
                  </div>
                  <a
                    href="mailto:Chameri@gmail.com"
                    className="font-geist font-medium text-[#6B859E] underline hover:text-[#000000] transition-colors"
                    style={{ fontSize: 'clamp(13px, 1.250vw, 22px)' }}
                  >
                    Chameri@gmail.com
                  </a>
                </div>
              </div>

              {/*
               * Social icons row
               * gap:    14px → 0.972vw   floor 8px   ceil 14px
               * height: 30px → 2.083vw   floor 22px  ceil 30px
               * marginTop: 10px → 0.694vw  floor 6px  ceil 10px
               */}
              <div
                className="flex items-center"
                style={{
                  gap:       'clamp(8px, 0.972vw, 14px)',
                  height:    'clamp(22px, 2.083vw, 30px)',
                  marginTop: 'clamp(6px, 0.694vw, 10px)',
                }}
              >
                {SOCIALS.map(({ label, width, height, svg }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="text-[#000000] hover:text-[#6B859E] hover:scale-110 transition-all flex items-center justify-center flex-shrink-0"
                    style={{ width, height }}
                  >
                    {svg}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
         * RIGHT COLUMN — Form
         * w:    635px → 44.097vw   floor 320px  ceil 635px
         * minH: 562px → 39.028vw   floor 400px  ceil 562px
         * paddingTop: 28px → 1.944vw  floor 16px  ceil 28px
         * ══════════════════════════════════════════════════════════════════ */}
        <div
          className="contents lg:flex lg:flex-col lg:justify-center flex-shrink-0 w-full"
          style={{
            width:      'clamp(320px, 44.097vw, 735px)',
            minHeight:  'clamp(400px, 39.028vw, 562px)',
            paddingTop: 'clamp(16px, 1.944vw, 28px)',
          }}
        >

          {/*
           * Form card
           * paddingTop/Bottom: 27px → 1.875vw   floor 16px  ceil 27px
           * paddingLeft/Right: 55px → 3.819vw   floor 20px  ceil 55px
           * gap (fields):      40px → 2.778vw   floor 20px  ceil 40px
           * borderRadius:       6px → 0.417vw   floor  4px  ceil  6px
           */}
          <form
            noValidate
            onSubmit={handleSubmit}
            className="order-2 lg:order-none flex flex-col w-full"
            style={{
              /* Floor dropped 16px → 4px: on mobile the 16px floor stacked on
                 top of the row gap and read as dead space above the first
                 field. At lg+ this still resolves to the same 27px. */
              paddingTop:    'clamp(4px, 1.875vw, 27px)',
              paddingBottom: 'clamp(4px, 1.875vw, 27px)',
              paddingLeft:   'clamp(0px, 2.519vw, 55px)',
              paddingRight:  'clamp(0px, 2.519vw, 55px)',
              gap:           'clamp(20px, 2.778vw, 40px)',
              borderRadius:  'clamp(4px, 0.417vw, 6px)',
            }}
          >

            {/*
             * ── NAME FIELD ─────────────────────────────────────────────
             * wrapper height: 54px → 3.750vw   floor 40px  ceil 54px
             * input height:   54px → 3.750vw   floor 40px  ceil 54px
             * input fontSize: 16px → 1.111vw   floor 13px  ceil 16px
             * paddingBottom:   6px → 0.417vw   floor  4px  ceil  6px
             */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name *"
                value={form.name}
                onChange={handleChange}
                className={inputBase}
                style={errors.name ? { ...inputStyle, borderBottomColor: FIELD_ERROR_COLOR } : inputStyle}
                required
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
              />
              <FieldError id="contact-name-error">{errors.name}</FieldError>
            </div>

            {/* ── EMAIL FIELD ──────────────────────────────────────────── */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter Email *"
                value={form.email}
                onChange={handleChange}
                className={inputBase}
                style={errors.email ? { ...inputStyle, borderBottomColor: FIELD_ERROR_COLOR } : inputStyle}
                required
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
              />
              <FieldError id="contact-email-error">{errors.email}</FieldError>
            </div>

            {/*
             * ── PHONE FIELD ────────────────────────────────────────────
             * wrapper height: 54px → 3.750vw   floor 40px  ceil 54px
             * gap:             8px → 0.556vw   floor  6px  ceil  8px
             */}
            <div>
              <div
                className="flex items-center border-b bg-transparent w-full"
                style={{ borderBottomColor: errors.phone ? FIELD_ERROR_COLOR : '#000000',
                  height:        'clamp(33.75px, 3.75vw, 54px)',
                  paddingBottom: 'clamp(4px, 0.4vw, 6px)',
                  paddingLeft:   'clamp(12px, 0.4vw, 12px)',
                }}
              >
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={form.phone}
                  onChange={handlePhoneChange}
                  placeholder="Phone number"
                  className="contact-phone-input"
                  style={{ width: '100%', outline: 'none' }}
                />
              </div>
              <FieldError id="contact-phone-error">{errors.phone}</FieldError>
            </div>

            {/*
             * ── MESSAGE FIELD ──────────────────────────────────────────
             * textarea height: 110px → 7.639vw   floor 80px  ceil 110px
             * paddingTop:        8px → 0.556vw   floor  6px  ceil   8px
             */}
            <div>
              <textarea
                name="message"
                placeholder="Type your message here... *"
                value={form.message}
                onChange={handleChange}
                className={`${inputBase} resize-none`}
                style={{
                  ...inputStyle,
                  ...(errors.message ? { borderBottomColor: FIELD_ERROR_COLOR } : null),
                  height:     'clamp(68.75px, 7.64vw, 110px)',
                  paddingTop: 'clamp(5px, 0.56vw, 8px)',
                }}
                required
                aria-required="true"
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
              />
              <FieldError id="contact-message-error">{errors.message}</FieldError>
            </div>

            {/*
             * ── SUBMIT BUTTON ROW ──────────────────────────────────────
             * row height: 48px → 3.333vw   floor 40px  ceil 48px
             *
             * Button
             *   w:            159px → 11.042vw  floor 130px  ceil 159px
             *   h:             48px →  3.333vw  floor  40px  ceil  48px
             *   borderRadius:  12px →  0.833vw  floor   8px  ceil  12px
             *
             * Sliding text container
             *   left:   12px → 0.833vw  floor  8px  ceil 12px
             *   top: 12.5px → 0.868vw  floor  9px  ceil 12.5px
             *   w:     97px → 6.736vw  floor 78px  ceil 97px
             *   h:     23px → 1.597vw  floor 18px  ceil 23px
             *   fontSize: 15px → 1.042vw  floor 12px  ceil 15px
             *
             * Arrow box
             *   right:        12px → 0.833vw  floor  8px  ceil 12px
             *   w:            30px → 2.083vw  floor 24px  ceil 30px
             *   h:            30px → 2.083vw  floor 24px  ceil 30px
             *   borderRadius:  7px → 0.486vw  floor  5px  ceil  7px
             *   svg:          14px → 0.972vw  floor 10px  ceil 14px
             */}
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
                    {['Contact us', 'Contact us'].map((label, i) => (
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
}
