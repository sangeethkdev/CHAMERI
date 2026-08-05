
'use client';

import React from 'react';
import RichText from '@/components/common/RichText';

/** Shown when the admin has not written a story description yet. */
const DEFAULT_DESCRIPTION = (
  <>
    <p style={{ margin: 0 }}>
      <strong style={{ fontWeight: 600 }}>Since 1985</strong>, Chameri has been
      dedicated to creating thoughtfully designed spaces that blend functionality,
      craftsmanship, and timeless aesthetics. With decades of experience, the company
      has built a reputation for delivering high-quality residential and commercial
      projects tailored to the unique aspirations of every client. From concept
      development to final execution, Chameri focuses on innovation, attention to
      detail, and lasting value innovation, attention to detail, and lasting value
    </p>
    <p style={{ margin: 0 }}>
      The <strong style={{ fontWeight: 600 }}>founder</strong> of Chameri established
      the company with a clear vision of combining creativity, integrity, and
      professional expertise to shape meaningful architectural experiences. Guided by
      a passion for design and a commitment to quality, the founder has played a key
      role in building strong client relationships dedication, and continuous
      innovation, the founder
    </p>
  </>
);

/**
 * AboutOriginStory
 * Design baseline : 1440px Figma canvas
 * Fluid range     : 375px → 1920px
 * Formula         : fluid_vw = (value_at_1440 / 1440) * 100
 *                   MAX      = value_at_1440 * (1920 / 1440)
 */
export default function AboutOriginStory({ story }) {
  return (
    <>
      {/* ── Mobile (iPhone 13/14-sized screens) — static stacked layout ── */}
      <section className="block md:hidden" style={{ width: '100%', backgroundColor: '#EDE7DE' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 40,
            paddingBottom: 40,
            paddingLeft: 12,
            paddingRight: 12,
            gap: 35,
          }}
        >
          {/* Pill + Heading */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7.2px',
                height: 20,
                padding: '0 7.2px',
                width: 'fit-content',
                borderRadius: 90,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '2px',
                  backgroundColor: '#334454',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: '10px',
                  lineHeight: '12px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#1A1A1A',
                  whiteSpace: 'nowrap',
                }}
              >
                origin story
              </span>
            </div>

            <h2
              style={{
                width: '100%',
                fontFamily: "var(--font-roundo, 'Roundo'), system-ui, sans-serif",
                fontWeight: 500,
                fontSize: '32px',
                lineHeight: '36.6px',
                letterSpacing: '-0.73px',
                color: '#1A1A1A',
                margin: 0,
              }}
            >
              {story?.heading || 'Elegant Spaces For Built Views Photo Frame'}
            </h2>
          </div>

          {/* Logo + Text */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Group (1).svg"
              alt="Chameri Icon"
              style={{ width: '149.87px', height: '198.72px', objectFit: 'contain' }}
            />

            {/* Rich text from the admin (About → Story Section) */}
            <RichText
              html={story?.description}
              fallback={DEFAULT_DESCRIPTION}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                fontFamily: "var(--font-geist, 'Geist'), system-ui, sans-serif",
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '21.8px',
                letterSpacing: '-0.44px',
                color: '#222F30CC',
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Desktop — existing fluid layout ── */}
      <section className="hidden md:block" style={{ width: '100%', backgroundColor: '#EDE7DE' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '1920px',
          margin: '0 auto',
          boxSizing: 'border-box',
          /* 76px @ 1440 → 76/1440*100 = 5.28vw */
          paddingTop:    'clamp(40px, 5.28vw, 96px)',
          paddingBottom: 'clamp(40px, 5.28vw, 96px)',
          /* 80px @ 1440 → 80/1440*100 = 5.56vw */
          paddingLeft:   'clamp(20px, 5.56vw, 107px)',
          paddingRight:  'clamp(20px, 5.56vw, 107px)',
          display: 'flex',
          flexDirection: 'column',
          /* 54px @ 1440 → 54/1440*100 = 3.75vw */
          gap: 'clamp(28px, 3.75vw, 72px)',
        }}
      >

        {/* ── ROW 1: Title (left) + Pill (right) ─────────────────── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            /* 16px @ 1440 → 16/1440*100 = 1.11vw */
            gap: 'clamp(12px, 1.11vw, 21px)',
            width: '100%',
          }}
        >
          {/*
            Heading
            60px @ 1440 → 60/1440*100 = 4.17vw → 80px @ 1920
            line-height 66px @ 1440 → 66/1440*100 = 4.58vw → 88px @ 1920
            letter-spacing -3.05px @ 1440 → -3.05/1440*100 = -0.212vw → -4px @ 1920
          */}
          <h2
            style={{
              fontFamily:    "var(--font-roundo, 'Roundo'), system-ui, sans-serif",
              fontWeight:    500,
              fontSize:      'clamp(28px, 4.17vw, 80px)',
              lineHeight:    'clamp(32px, 4.58vw, 88px)',
              letterSpacing: 'clamp(-1px, -0.212vw, -4px)',
              color:         '#1A1A1A',
              margin:        0,
              flex:          '1 1 300px',
              /* 668px @ 1440 → 668/1440*100 = 46.39vw → 891px @ 1920 */
              maxWidth:      'clamp(300px, 46.39vw, 891px)',
            }}
          >
            {story?.heading || 'Elegant Spaces For Built Views Photo Frame'}
          </h2>

          {/* Origin Story pill */}
          <div
            style={{
              display:    'inline-flex',
              alignItems: 'center',
              /* 6px @ 1440 → 6/1440*100 = 0.42vw */
              gap:        'clamp(4px, 0.42vw, 8px)',
              flexShrink: 0,
              marginTop:  'clamp(4px, 0.42vw, 8px)',
            }}
          >
            {/* square icon: 13px @ 1440 → 13/1440*100 = 0.9vw */}
            <div
              style={{
                width:           'clamp(10px, 0.9vw, 17px)',
                height:          'clamp(10px, 0.9vw, 17px)',
                borderRadius:    '2px',
                backgroundColor: '#334454',
                flexShrink:      0,
              }}
            />
            {/*
              pill text: 16px @ 1440 → 16/1440*100 = 1.11vw → 21px @ 1920
              letter-spacing 0.04em scales with font automatically
            */}
            <span
              style={{
                fontFamily:    "var(--font-geist, 'Geist'), system-ui, sans-serif",
                fontWeight:    400,
                fontSize:      'clamp(11px, 1.11vw, 21px)',
                lineHeight:    'clamp(13px, 1.33vw, 25px)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color:         '#1A1A1A',
                whiteSpace:    'nowrap',
              }}
            >
              origin story
            </span>
          </div>
        </div>

        {/* ── ROW 2: Image (left) + Text (right) ─────────────────── */}
        <div
          style={{
            display:    'flex',
            flexWrap:   'wrap',
            /* 138px @ 1440 → 138/1440*100 = 9.58vw → 184px @ 1920 */
            gap:        'clamp(24px, 9.58vw, 184px)',
            // alignItems: 'flex-start',
            width:      '100%',
          }}
        >
          {/*
            Left image
            298px @ 1440 → 298/1440*100 = 20.69vw → 397px @ 1920
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Group (1).svg"
            alt="Chameri Icon"
            style={{
              width:      'clamp(140px, 15.59vw, 327px)',
              height:     'auto',
              marginLeft: 'clamp(40px, 5.56vw, 80px)',
              objectFit:  'contain',
              flexShrink: 0,
            }}
          />

          {/*
            Right text block
            max-width 836px @ 1440 → 836/1440*100 = 58.06vw → 1115px @ 1920
            font-size 20px @ 1440 → 20/1440*100 = 1.39vw → 26px @ 1920
            line-height 28px @ 1440 → 28/1440*100 = 1.94vw → 37px @ 1920
            paragraph gap 24px @ 1440 → 24/1440*100 = 1.67vw → 32px @ 1920
            letter-spacing -0.44px @ 1440 → -0.44/1440*100 = -0.031vw → -0.58px @ 1920
          */}
          {/* Rich text from the admin (About → Story Section) */}
          <RichText
            html={story?.description}
            fallback={DEFAULT_DESCRIPTION}
            style={{
              flex:          '1 1 min(100%, 280px)',
              maxWidth:      'clamp(280px, 58.06vw, 1115px)',
              display:       'flex',
              flexDirection: 'column',
              gap:           'clamp(16px, 1.67vw, 32px)',
              fontFamily:    "var(--font-geist, 'Geist'), system-ui, sans-serif",
              fontWeight:    400,
              fontSize:      'clamp(14px, 1.39vw, 26px)',
              lineHeight:    'clamp(22px, 1.94vw, 37px)',
              letterSpacing: 'clamp(-0.44px, -0.031vw, -0.58px)',
              color:         '#1A1A1A',
            }}
          />
        </div>

      </div>
    </section>
    </>
  );
}
