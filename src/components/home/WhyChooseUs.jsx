
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
    mobileIcon: <Image src="/images/692885235bac36a9a3203cd0_Group.svg (1).svg" alt="Design icon" width={25} height={25} />,
    title: 'Design-Driven, Modern Approach',
    desc: 'With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships.',
  },
  {
    img: '/dummyimages/Container.png',
    icon: <Image src="/icons/692885226ea01d367379ce40_Frame.svg.svg" alt="Expertise icon" width={25} height={25} />,
    mobileIcon: <Image src="/images/692885226ea01d367379ce40_Frame.svg (1).svg" alt="Expertise icon" width={25} height={25} />,
    title: 'Proven Expertise & Trusted Network',
    desc: 'With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships.',
  },
  {
    img: '/dummyimages/Overlay.png',
    icon: <Image src="/icons/healthicons_people-outline.svg" alt="People icon" width={25} height={25} />,
    mobileIcon: <Image src="/images/healthicons_people-outline (1).svg" alt="People icon" width={25} height={25} />,
    title: 'Client-Centric, Seamless Experience',
    desc: 'With a portfolio of completed projects and collaborations with experienced architects, we bring proven expertise to every build. Our work speaks through real results, client satisfaction, and trusted industry partnerships.',
  },
];

// Desktop cards sit on a light beige icon box, so they keep the dark
// (#334454) stroke icons. Mobile cards sit on a dark translucent glass box,
// where those same dark icons vanish — these three are the light (#EDE7DE)
// versions made for that context.
const ICONS = [
  <Image key="0" src="/icons/Vector.svg" alt="Design icon" width={25} height={25} />,
  <Image key="1" src="/icons/692885226ea01d367379ce40_Frame.svg.svg" alt="Expertise icon" width={25} height={25} />,
  <Image key="2" src="/icons/healthicons_people-outline.svg" alt="People icon" width={25} height={25} />,
];

const MOBILE_ICONS = [
  <Image key="0" src="/images/692885235bac36a9a3203cd0_Group.svg (1).svg" alt="Design icon" width={18} height={18} />,
  <Image key="1" src="/images/692885226ea01d367379ce40_Frame.svg (1).svg" alt="Expertise icon" width={20} height={20} />,
  <Image key="2" src="/images/healthicons_people-outline (1).svg" alt="People icon" width={19} height={19} />,
];

// Shown only until the admin fills in Home → Choose Us.
const DEFAULT_HEADING = 'Proven Trust Value Modern Homes Leader';
const DEFAULT_SUBHEADING =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.';

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
        mobileIcon: MOBILE_ICONS[i],
        title: c?.heading || STATIC_CARDS[i].title,
        desc: c?.subheading || STATIC_CARDS[i].desc,
      }))
    : STATIC_CARDS;

  const heading = chooseUs?.heading || DEFAULT_HEADING;
  const subheading = chooseUs?.subheading || DEFAULT_SUBHEADING;

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
            WHY CHOOSE US
          </span>
        </div>

        {/* Heading row */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-end w-full"
          style={{ minHeight: 'clamp(60px, 6.25vw, 90px)' }}
        >
          <h2
            className="font-roundo font-medium text-[#1A1A1A] capitalize m-0 flex items-center"
            style={{
              fontSize:      'clamp(28px, 3.33vw, 60px)',
              lineHeight:    'clamp(28px, 3.13vw, 45px)',
              letterSpacing: 'clamp(-0.5px, -0.06vw, -0.9px)',
              width:         'clamp(280px, 35.56vw, 592.08px)',
              minHeight:     'clamp(40px, 6.25vw, 90px)'
            }}
          >
            {heading}
          </h2>

          <p
            className="font-sans font-normal text-black/60 m-0 flex items-center"
            style={{
              fontSize:      'clamp(14px, 1.39vw, 22px)',
              lineHeight:    'clamp(18px, 1.51vw, 21.8px)',
              letterSpacing: 'clamp(-0.28px, -0.03vw, -0.44px)',
              width:         'clamp(300px, 38.75vw, 558px)',
              minHeight:     'clamp(40px, 4.58vw, 66px)',
              whiteSpace:    'pre-line'
            }}
          >
            {subheading}
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
            {heading}
          </h2>
          <p
            className="font-sans font-normal text-black/60 m-0"
            style={{ fontSize: '14px', lineHeight: '21px', whiteSpace: 'pre-line' }}
          >
            {subheading}
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
                paddingTop:    '22px',
                paddingRight:  '24px',
                paddingBottom: '24px',
                paddingLeft:   '24px',
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
                  marginTop: isActive ? '10px' : 'clamp(130px, 15vw, 180px)',
                }}
              >
                {/* Icon box */}
<div
  className="relative flex items-center justify-center flex-shrink-0
             bg-[#32445333]
             backdrop-blur-md
             border border-white/10"
  style={{
    width: "36.16px",
    height: "36.16px",
    borderRadius: "3.93px",
    padding: "4.72px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
    WebkitBackdropFilter: "blur(12px)",
    backdropFilter: "blur(12px)",
  }}
>
  <div className="text-white flex items-center justify-center w-full h-full">
    {card.mobileIcon}
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
