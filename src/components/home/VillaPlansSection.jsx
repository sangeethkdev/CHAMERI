

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
            sizes="(max-width: 768px) 100vw, 1200px"
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
