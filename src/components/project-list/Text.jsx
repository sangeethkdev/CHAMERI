'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Text — case-study content overlay for one Section.
 * ─────────────────────────────────────────────────────────────────────────
 * Figma layout (1440px baseline, positioned relative to the section):
 *   Info block   : top:67.84  left:346.81  w:915  h:177.45  gap:17
 *   Divider      : w:915 h:1  bg:#00000099
 *   Row          : w:886 gap:124  →  [tag pill] [heading + description]
 *   Tag pill     : w:142.6 h:20  gap:7.2  radius:90
 *     square 14×14 bg:#334454 + "KIWANO VILLA" 16.2px uppercase
 *   Heading      : w:292  Roundo 500 48px  lh:102%  ls:-2px
 *   Description  : w:243  Geist 400 20px  lh:21.8px  ls:-0.44px
 *   Learn more   : 92px divider + Geist 600 10.5px uppercase + arrow SVG
 *
 * Below ~1100px the row no longer fits (pill + heading + description
 * floors already exceed the available width), so it collapses to a
 * stacked column with a translucent scrim behind it for legibility.
 *
 * Scroll-based reveal (opacity 0→1, translateY 30px→0) still fires once
 * as the section scrolls into view — Section.jsx drives that separately
 * via `revealed` state, this component only owns the content layout.
 */
export default function Text({ project }) {
  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .ptext-row     { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .ptext-right   { flex-direction: column !important; align-items: flex-start !important; width: 100% !important; gap: 12px !important; }
          .ptext-heading { width: 100% !important; font-size: clamp(24px, 5.5vw, 32px) !important; }
          .ptext-desc    { width: 100% !important; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="ptext-info fixed flex flex-col"
        style={{
          zIndex: 10,
          top: 'clamp(56px, 6.794vw, 97.84px)',
          left: 'clamp(30px, 22.779vw, 396.81px)',
          width: 'clamp(240px, 69vw, 1135px)',
          gap: 'clamp(10px, 1.181vw, 17px)',
        }}
      >
        <div style={{ width: '103%', height: '1px', background: '#00000099' }} />

        <div className="ptext-row flex items-start" style={{ gap: 'clamp(20px, 8.611vw, 124px)' }}>
          {/* Tag pill — fixed width (Figma: 142.6px) so a longer project tag
              never eats into the heading/description column's space */}
          <div
            className="flex items-center flex-shrink-0"
            style={{
              gap: 'clamp(5px, 0.5vw, 7.2px)',
              borderRadius: '90px',
              width: 'clamp(100px, 9.903vw, 136.6px)',
            }}
          >
            <span
              className="inline-block flex-shrink-0"
              style={{
                width: 'clamp(10px, 0.972vw, 14px)',
                height: 'clamp(10px, 0.972vw, 14px)',
                background: '#334454',
                borderRadius: '3px',
              }}
            />
            <span
              className="font-sans uppercase whitespace-nowrap"
              style={{
                fontWeight: 400,
                fontSize: 'clamp(12px, 1.125vw, 16.2px)',
                lineHeight: 'clamp(14px, 1.35vw, 19.44px)',
                letterSpacing: '-0.32px',
                color: '#000000',
              }}
            >
              {project.tag}
            </span>
          </div>

          {/* Heading + description, then learn-more */}
          <div className="ptext-right flex items-start" style={{ gap: 'clamp(24px, 10.625vw, 153px)' }}>
            <div
              className="ptext-desc flex flex-col flex-shrink-0"
              style={{ gap: 'clamp(8px, 0.833vw, 12px)', width: 'clamp(150px, 26.875vw, 603px)' }}
            >
              <p
                className="font-sans m-0"
                style={{
                  fontWeight: 400,
                  fontSize: 'clamp(13px, 1.389vw, 20px)',
                  lineHeight: 'clamp(15px, 1.514vw, 21.8px)',
                  letterSpacing: '-0.44px',
                  color: '#222F30CC',
                }}
              >
                {project.description}
              </p>

              {/* Visual affordance only — the whole card (Section.jsx) is
                  now the actual link, so this can't be a nested <a>. */}
              <div className="flex flex-col" style={{ gap: '4px', width: 'clamp(64px, 6.389vw, 92px)' }}>
                <span
                  className="flex items-center justify-center"
                  style={{ gap: '6px' }}
                >
                  <span
                    className="font-sans uppercase whitespace-nowrap"
                    style={{
                      fontWeight: 600,
                      fontSize: 'clamp(9px, 0.729vw, 10.5px)',
                      lineHeight: 'clamp(10px, 0.795vw, 11.45px)',
                      color: '#31444C',
                    }}
                  >
                    Learn more
                  </span>
                  <Image
                    src="/icons/SVG.svg"
                    alt=""
                    width={8}
                    height={8}
                    style={{ width: 'clamp(6px, 0.53vw, 7.63px)', height: 'auto' }}
                  />
                </span>
                <div style={{ width: '95%', height: '1px', background: '#31444C' }} />
              </div>
            </div>

            <h2
              className="ptext-heading font-roundo m-0 flex-shrink-0"
              style={{
                fontWeight: 500,
                fontSize: 'clamp(26px, 3.333vw, 48px)',
                lineHeight: '102%',
                letterSpacing: 'clamp(-1.4px, -0.139vw, -2px)',
                color: ' #212325',
                width: 'clamp(180px, 20.278vw, 292px)',
              }}
            >
              {project.title}
            </h2>
          </div>
        </div>
      </motion.div>
    </>
  );
}
