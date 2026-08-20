

// ----------------------------------------------------------------

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
      className="object-cover object-top transition-transform duration-700 group-hover:scale-105 bg-[#6b7280]"
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
const ContactCard = ({ heading }) => (
  <div
    className="relative overflow-hidden flex-shrink-0 bg-[#334454] w-full aspect-[379/498]"
    style={{ borderRadius: 'clamp(8px, 0.79vw, 15.2px)' }}
  >
    {/* Background image */}
    <Image
      src="/images/Group%20(5).png"
      alt=""
      fill
      className="object-cover"
    />

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
          whiteSpace:    'pre-line',
        }}
      >
        {heading || 'Lorum Ipsum?\nDolor Sit\nAmet.'}
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
      {/* A link rather than a button — it navigates to the contact page, so it
          gains middle-click / open-in-new-tab and is announced as a link.
          Styling is unchanged. */}
      <Link
        href="/contact"
        aria-label="Get in touch with the Chameri team"
        className="group relative flex items-center justify-center no-underline bg-[#6B859E] hover:bg-[#334454] transition-colors duration-500 overflow-hidden cursor-pointer border-none"
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
                    {['Contact Us', 'Contact Us'].map((label, i) => (
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
      </Link>
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
              whiteSpace:    'pre-line',
            }}
          >
            {ourTeam?.heading || 'Peoples Builds\nThis Firm'}
          </h2>

          {/* Sub-heading */}
          <p
            className="font-sans font-normal text-[#1C1C1C] m-0"
            style={{
              fontSize:      'clamp(14.9px, 1.39vw, 26.6px)', // 20px @ 1440 → 26.6px @ 1920
              lineHeight:    'clamp(18.4px, 1.72vw, 32.9px)',
              letterSpacing: 'clamp(-0.27px, -0.03vw, -0.5px)',
              maxWidth:      'clamp(262px, 26.88vw, 493px)',   // 370px @ 1440 → 493px @ 1920
              whiteSpace:    'pre-line',
            }}
          >
            {ourTeam?.subheading ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.'}
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
          <ContactCard heading={ourTeam?.separateCard?.heading} />
        </div>
      </aside>

    </div>
  </section>
  );
};

export default TeamSection;
