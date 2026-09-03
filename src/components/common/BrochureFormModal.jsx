'use client';

import React, { useEffect, useState, useRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import useContactForm from '@/hooks/useContactForm';
import FieldError, { FIELD_ERROR_COLOR } from './FieldError';
import { socialHref } from '@/lib/socialLinks';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * BrochureFormModal — "Download Brochure" enquiry popup
 * ─────────────────────────────────────────────────────────────────────────────
 * The same form, fields and metric as the contact page (ContactPageForm),
 * lifted into a dialog so the Kiwano / Kiwano Villament brochure links can
 * collect an enquiry before handing over the file.
 *
 * Baseline viewport : 1440px
 * clamp() formula   : vw_value = (DESIGN_PX / 1440) × 100
 *
 * Figma frame this file reproduces:
 *   Card   1331 × 605   borderTop 1px   justify-content space-between
 *          padding 6 / 47 / 20 / 34
 *   Left    465 × 579   justify-content space-between
 *   Right   635 × 562   paddingTop 28   gap 22
 *
 *   Card   w 1331 → 92.431vw   h 605 → 42.014vw
 *          padTop 6 → 0.417vw  padRight 47 → 3.264vw
 *          padBottom 20 → 1.389vw   padLeft 34 → 2.361vw
 *   Left   w  465 → 32.292vw   h 579 → 40.208vw
 *   Right  w  635 → 44.097vw   h 562 → 39.028vw
 *          paddingTop 28 → 1.944vw   gap 22 → 1.528vw
 *
 * Success behaviour — after a successful submit the user sees "Submitted
 * successfully" for exactly 2 seconds, then it disappears. The timer is
 * cleared on unmount and re-armed per success, so closing the modal mid-toast
 * never leaves a stray timeout behind.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SOCIALS = [
  {
    label: 'Instagram',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
];

/** How long the "Submitted successfully" note stays on screen. */
const SUCCESS_TOAST_MS = 2000;

/**
 * @param {boolean}  isOpen   – controls visibility
 * @param {function} onClose  – called on backdrop click, × or Escape
 * @param {string}   source   – which page opened it, surfaced in the email
 * @param {string[]} heading  – the two heading lines
 */
export default function BrochureFormModal({
  isOpen,
  onClose,
  source = 'Brochure download',
  heading = ['Connect with us', 'To build with vision.'],
}) {
  const {
    form, errors, status,
    handleChange, handlePhoneChange, handleSubmit,
  } = useContactForm(source);

  /* Local, so this popup's 2-second note is independent of the hook's own
     persistent statusMessage (which the contact page still shows inline). */
  const [showSuccess, setShowSuccess] = useState(false);
  const timerRef = useRef(null);

  /* Lock page scroll while open.
   *
   * `overflow: hidden` on <body> alone does NOT stop touch scrolling in iOS
   * Safari — the page kept scrolling behind the popup on iPhone. The reliable
   * cross-browser lock is to take the body out of flow (`position: fixed`)
   * and hold it at its current offset with a negative `top`, then restore
   * both the styles and the scroll position on close.
   *
   * `right: 0` (rather than a width) keeps the body at viewport width once
   * fixed, so the layout doesn't reflow as the lock engages. */
  useEffect(() => {
    if (!isOpen) return undefined;

    const { body } = document;
    const scrollY = window.scrollY;
    const previous = {
      overflow: body.style.overflow,
      position: body.style.position,
      top:      body.style.top,
      left:     body.style.left,
      right:    body.style.right,
    };

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top      = `-${scrollY}px`;
    body.style.left     = '0';
    body.style.right    = '0';

    return () => {
      body.style.overflow = previous.overflow;
      body.style.position = previous.position;
      body.style.top      = previous.top;
      body.style.left     = previous.left;
      body.style.right    = previous.right;
      /* Jump back to where the user was. `instant` matters: a smooth scroll
         here would visibly rewind the page after the popup closes. */
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    };
  }, [isOpen]);

  /* Close on Escape — bound only while open, so a closed modal never swallows
     the key from anything else on the page. */
  useEffect(() => {
    if (!isOpen) return undefined;
    const handler = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  /* Clear any pending toast timer on unmount. */
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  /* Reset the toast when the modal closes, so a previous success never
     flashes on the next open. */
  useEffect(() => {
    if (isOpen) return;
    setShowSuccess(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [isOpen]);

  const onSubmit = async (e) => {
    const ok = await handleSubmit(e);
    if (!ok) return;                        // validation or send failed
    setShowSuccess(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowSuccess(false), SUCCESS_TOAST_MS);
  };

  if (!isOpen) return null;

  const inputBase =
    'font-geist font-regular text-[#333333CC] bg-transparent border-0 border-b border-[#000000] outline-none w-full placeholder-[#000000]/40 focus:border-[#000000] transition-colors';

  /* Mirrors ContactPageForm's field metric exactly so both forms read as one.
     The 16px floor also stops iOS Safari zooming the page when a field is
     focused, which it does for any input below 16px. */
  const inputStyle = {
    fontSize:      'clamp(16px, 1.11vw, 18px)',
    height:        'clamp(33.75px, 3.75vw, 54px)',
    paddingBottom: 'clamp(4px, 0.4vw, 6px)',
    paddingLeft:   'clamp(10px, 0.4vw, 12px)',
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
      style={{ padding: 'clamp(12px, 1.5vw, 24px)' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/*
       * ── CARD + CLOSE ────────────────────────────────────────────────────
       * The close button sits *outside* the card, so this wrapper is what
       * carries the card's width — the button then centres on the card's own
       * width rather than the viewport's, and stays centred under it at every
       * width. `pointer-events-none` lets backdrop clicks through the
       * wrapper's own bounds; the card and button re-enable it.
       */}
      <div
        className="relative w-full pointer-events-none"
        style={{
          maxWidth: 'clamp(320px, 92.431vw, 1331px)',
          /* The button is absolutely positioned, so it adds no height and the
             flex parent would centre the card alone — leaving the button
             hanging past centre and clipped at the bottom on a tall card.
             A bottom margin of its full footprint (gap + height) makes the
             flex parent centre the card and button together as one block. */
          marginBottom: 'calc(clamp(28px, 2.222vw, 32px) + clamp(6px, 0.694vw, 10px))',
        }}
      >

        {/*
         * Close button — centred below the card, on the backdrop.
         * `left: 50%` + `translateX(-50%)` centres it on the card; `top:
         * 100%` puts it past the bottom edge, then the gap pushes it clear.
         */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          /* Light translucent fill rather than the card's #334454/10 — that
             one was tuned for the beige card and all but vanishes now that
             the button sits on the dark backdrop. */
          className="absolute flex items-center justify-center bg-[#EDE7DE]/15 hover:bg-[#EDE7DE]/30 transition-colors cursor-pointer border-none z-10 pointer-events-auto"
          style={{
            top:          'calc(100% + clamp(6px, 0.694vw, 10px))',
            left:         '50%',
            transform:    'translateX(-50%)',
            width:        'clamp(32px, 2.522vw, 40px)',
            height:       'clamp(32px, 2.522vw, 40px)',
            borderRadius: '50%',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EDE7DE" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/*
         * ── CARD ──────────────────────────────────────────────────────────
         * w 1331 → 92.431vw   h 605 → 42.014vw as a *min*-height, so a wrapped
         * heading or a visible field error grows the card instead of clipping.
         * borderTop 1px   justify-content space-between
         * padding 6 / 47 / 20 / 34 → 0.417 / 3.264 / 1.389 / 2.361vw
         *
         * maxHeight also subtracts the close button and its gap, so on a short
         * viewport the card stops short of the button below rather than
         * pushing it off-screen.
         */}
        <div
          /* Below lg the three blocks (heading, form, contact details) flow
             in ONE column — the column wrappers become `display: contents` —
             ordered heading → form → details via `order-*`, mirroring the
             Contact page. 28px row gap matches that page; lg+ keeps the 20px
             column gap it always had. */
          className="relative bg-[#EDE7DE] w-full flex flex-col lg:flex-row lg:justify-between gap-[28px] lg:gap-[20px] overflow-y-auto animate-[brochureModalIn_0.25s_ease] pointer-events-auto"
          style={{
            minHeight:     'clamp(0px, 42.014vw, 605px)',
            maxHeight:     'calc(100vh - clamp(24px, 3vw, 48px) - clamp(28px, 2.222vw, 32px) - clamp(6px, 0.694vw, 10px))',
            borderTop:     '1px solid rgba(51, 68, 84, 0.10)',
            // borderRadius:  'clamp(4px, 0.417vw, 6px)',
            paddingTop:    'clamp(16px, 0.417vw, 6px)',
            paddingRight:  'clamp(20px, 3.264vw, 47px)',
            paddingBottom: 'clamp(20px, 1.389vw, 20px)',
            paddingLeft:   'clamp(20px, 2.361vw, 34px)',
            boxShadow:     '0 24px 64px rgba(0, 0, 0, 0.28)',
          }}
        >

        {/* ══════════════════════════════════════════════════════════════════
         * LEFT COLUMN — heading (top) + contact details and socials (bottom)
         * w 465 → 32.292vw   h 579 → 40.208vw   justify-content space-between
         * ══════════════════════════════════════════════════════════════════ */}
        {/* `contents` on mobile: this box vanishes so TOP and BOTTOM promote
            into the card's flex flow and can be ordered around the form. The
            inline sizing only takes effect at lg+, where the box returns. */}
        <div
          className="contents lg:flex lg:flex-col lg:justify-between flex-shrink-0 w-full"
          style={{
            width:      'clamp(280px, 32.292vw, 465px)',
            minHeight:  'clamp(0px, 40.208vw, 579px)',
            paddingTop: 'clamp(8px, 1.5vw, 22px)',
          }}
        >

          {/* ── TOP: badge + heading — order-1 on mobile ─────────────────── */}
          <div
            className="order-1 lg:order-none w-full pb-[6px] lg:pb-0 flex flex-col gap-[7px] lg:gap-[clamp(8px,1.111vw,16px)]"
          >

            {/* Badge — square mark + "GET IN TOUCH" */}
            <div
              className="flex items-center"
              style={{
                height: 'clamp(20px, 2.139vw, 30.8px)',
                gap:    'clamp(4px, 0.500vw, 7.2px)',
              }}
            >
              <div
                className="bg-[#334454] flex-shrink-0"
                style={{
                  width:        'clamp(9px, 0.97vw, 14px)',
                  height:       'clamp(9px, 0.97vw, 14px)',
                  borderRadius: 'clamp(2px, 0.21vw, 3px)',
                }}
              />
              <span
                className="font-sans font-normal uppercase text-[#000000] flex items-center"
                style={{
                  fontSize:      'clamp(11px, 1.125vw, 16.2px)',
                  lineHeight:    'clamp(13px, 1.35vw, 19.44px)',
                  letterSpacing: '-0.32px',
                }}
              >
                Get in touch
              </span>
            </div>

            {/* Heading — two lines, same face as the contact page, scaled to
                the 465px column rather than the page's 527px one. */}
            <div className="flex flex-col">
              {heading.map((text, i) => (
                <h2
                  key={i}
                  id={i === 0 ? 'brochure-modal-title' : undefined}
                  className="font-roundo font-medium text-[#1A1A1A] text-left"
                  style={{
                    fontSize:      'clamp(24px, 3.40vw, 49px)',
                    lineHeight:    'clamp(30px, 3.75vw, 54px)',
                    letterSpacing: 'clamp(-2.2px, -0.153vw, -1px)',
                    margin:        0,
                  }}
                >
                  {text}
                </h2>
              ))}
            </div>
          </div>

          {/* ── BOTTOM: phone, email, socials — order-3 on mobile, so it
              renders AFTER the form, as on the Contact page.
              The top margin and bottom padding exist only on the lg+
              side-by-side layout (spacing under the heading, and keeping the
              socials clear of the card's bottom edge). Stacked, the card's
              28px row gap is the only separation, so neither stacks on top
              of it as dead space. */}
          <div
            className="order-3 lg:order-none flex flex-col gap-[16px] lg:gap-[clamp(12px,1.250vw,18px)] mt-0 lg:mt-[clamp(20px,2vw,28px)] pb-0 lg:pb-[clamp(60px,5vw,78px)]"
          >

            {/* Phone + Email */}
            <div className="flex flex-col" style={{ gap: 'clamp(12px, 1.250vw, 18px)' }}>

              {/* Phone */}
              <div className="flex flex-col" style={{ gap: 'clamp(3px, 0.417vw, 6px)' }}>
                <div className="flex items-center" style={{ gap: 'clamp(4px, 0.417vw, 6px)' }}>
                  <svg
                    viewBox="0 0 24 24" fill="none"
                    stroke="#334454" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"
                    style={{
                      width:      'clamp(14px, 1.25vw, 18px)',
                      height:     'clamp(14px, 1.25vw, 18px)',
                      flexShrink: 0,
                    }}
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53 2 2 0 0 1 3.6 1.35h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span
                    className="font-geist font-normal text-[#000000]"
                    style={{ fontSize: 'clamp(13px, 1.11vw, 16px)', letterSpacing: '-0.5px' }}
                  >
                    Phone number
                  </span>
                </div>
                <a
                  href="tel:+919188913114"
                  className="font-geist font-medium text-[#6B859E] underline hover:text-[#000000] transition-colors"
                  style={{ fontSize: 'clamp(13px, 1.11vw, 16px)' }}
                >
                  +91 9188913114
                </a>
              </div>

              {/* Email */}
              <div className="flex flex-col" style={{ gap: 'clamp(3px, 0.417vw, 6px)' }}>
                <div className="flex items-center" style={{ gap: 'clamp(4px, 0.417vw, 6px)' }}>
                  <svg
                    viewBox="0 0 24 24" fill="none"
                    stroke="#334454" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"
                    style={{
                      width:      'clamp(14px, 1.25vw, 18px)',
                      height:     'clamp(14px, 1.25vw, 18px)',
                      flexShrink: 0,
                    }}
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span
                    className="font-geist font-normal text-[#000000]"
                    style={{ fontSize: 'clamp(13px, 1.11vw, 16px)', letterSpacing: '-0.5px' }}
                  >
                    Drop us an Email at
                  </span>
                </div>
                <a
                  href="mailto:info@chameribuilders.com"
                  className="font-geist font-medium text-[#6B859E] underline hover:text-[#000000] transition-colors"
                  style={{ fontSize: 'clamp(13px, 1.11vw, 16px)' }}
                >
                  info@chameribuilders.com
                </a>
              </div>
            </div>

            {/* Socials */}
            <div
              className="flex items-center"
              style={{
                gap:       'clamp(8px, 0.972vw, 14px)',
                height:    'clamp(18px, 1.528vw, 22px)',
                marginTop: 'clamp(4px, 0.694vw, 10px)',
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
                  className="text-[#000000] hover:text-[#6B859E] hover:scale-110 transition-all flex items-center justify-center flex-shrink-0"
                  style={{
                    width:  'clamp(16px, 1.389vw, 20px)',
                    height: 'clamp(16px, 1.389vw, 20px)',
                  }}
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
         * RIGHT COLUMN — form
         * w 635 → 44.097vw   h 562 → 39.028vw
         * paddingTop 28 → 1.944vw   gap 22 → 1.528vw
         * ══════════════════════════════════════════════════════════════════ */}
        {/* order-2 on mobile: sits between the heading and the contact details,
            as on the Contact page. Full width there; the fixed column width is
            lg+ only.
            `lg:justify-center` vertically centres the fields in the column
            instead of pinning them to the top — that top-pin plus a tight field
            gap is what left the large empty band under the submit button. The
            padding and gap below now mirror ContactPageForm exactly. */}
        <form
          noValidate
          onSubmit={onSubmit}
          className="order-2 lg:order-none flex flex-col lg:justify-center flex-shrink-0 w-full lg:w-[clamp(280px,44.097vw,635px)]"
          style={{
            minHeight:     'clamp(0px, 39.028vw, 562px)',
            paddingTop:    'clamp(4px, 1.875vw, 27px)',
            paddingBottom: 'clamp(4px, 1.875vw, 27px)',
            paddingLeft:   'clamp(0px, 2.519vw, 55px)',
            paddingRight:  'clamp(0px, 2.519vw, 55px)',
            gap:           'clamp(20px, 2.778vw, 40px)',
          }}
        >

          {/* ── NAME ──────────────────────────────────────────────────────── */}
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
              aria-describedby={errors.name ? 'brochure-name-error' : undefined}
            />
            <FieldError id="brochure-name-error">{errors.name}</FieldError>
          </div>

          {/* ── EMAIL ─────────────────────────────────────────────────────── */}
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
              aria-describedby={errors.email ? 'brochure-email-error' : undefined}
            />
            <FieldError id="brochure-email-error">{errors.email}</FieldError>
          </div>

          {/* ── PHONE ─────────────────────────────────────────────────────── */}
          <div>
            <div
              className="flex items-center border-b bg-transparent w-full"
              style={{
                borderBottomColor: errors.phone ? FIELD_ERROR_COLOR : '#000000',
                height:            'clamp(33.75px, 3.75vw, 54px)',
                paddingBottom:     'clamp(4px, 0.4vw, 6px)',
                paddingLeft:       'clamp(10px, 0.4vw, 12px)',
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
            <FieldError id="brochure-phone-error">{errors.phone}</FieldError>
          </div>

          {/* ── MESSAGE ───────────────────────────────────────────────────── */}
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
              aria-describedby={errors.message ? 'brochure-message-error' : undefined}
            />
            <FieldError id="brochure-message-error">{errors.message}</FieldError>
          </div>

          {/*
           * ── SUBMIT ROW ───────────────────────────────────────────────────
           * Button copy is "Contact Us" per the Figma frame; the sliding
           * label, arrow box and hover timings match the contact page button
           * so the two never drift apart.
           */}
          <div className="flex items-center" style={{ gap: 'clamp(10px, 1vw, 16px)' }}>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="group relative flex items-center justify-center bg-[#6B859E] hover:bg-[#4a6074] transition-colors duration-500 overflow-hidden cursor-pointer border-none flex-shrink-0 disabled:opacity-70 disabled:cursor-not-allowed w-[clamp(118.6px,11.6vw,167px)] h-[clamp(36.9px,3.61vw,52px)]"
              style={{ borderRadius: 'clamp(8.5px, 0.83vw, 12px)' }}
            >
              {/* Sliding text */}
              <div
                className="absolute overflow-hidden"
                style={{
                  top:    'clamp(10px, 1.01vw, 14.5px)',
                  left:   'clamp(10px, 1.83vw, 22px)',
                  width:  'clamp(74px, 6.74vw, 97px)',
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
                      {status === 'sending' ? 'Sending...' : label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow box */}
              <div
                className="absolute bg-[#EDE7DE] transition-colors duration-500 overflow-hidden"
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

            {/*
             * Success note — visible for SUCCESS_TOAST_MS, then removed.
             * Sits beside the button so its arrival doesn't shift the form,
             * and `aria-live="polite"` announces it once when it appears.
             */}
            {showSuccess && (
              <p
                role="status"
                aria-live="polite"
                className="font-sans font-medium animate-[brochureModalIn_0.2s_ease]"
                style={{
                  margin:     0,
                  fontSize:   'clamp(12px, 0.97vw, 14px)',
                  lineHeight: 1.4,
                  color:      '#2E6B4F',
                }}
              >
                Submitted successfully
              </p>
            )}

            {/* A send failure stays put — unlike success, the user must act on it. */}
            {status === 'error' && !showSuccess && (
              <p
                role="alert"
                className="font-sans font-normal"
                style={{
                  margin:     0,
                  fontSize:   'clamp(12px, 0.97vw, 14px)',
                  lineHeight: 1.4,
                  color:      FIELD_ERROR_COLOR,
                }}
              >
                Could not send your message. Please try again.
              </p>
            )}
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
