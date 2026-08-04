'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import Section from './Section';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ProjectsShowcase — "Our Projects" scroll-reveal case-study sections
 * ─────────────────────────────────────────────────────────────────────────────
 * Each project renders as a full-screen `Section` (see Section.jsx): a
 * clip-path wipe reveal as it scrolls into view, a viewport-fixed
 * background image clipped to the section's own on-screen bounds (so it
 * appears to stay in place while the page scrolls past it), a subtle
 * ±10vh parallax drift on top, and a `Text` overlay (tag, title,
 * description, CTA) that fades/slides in once.
 *
 * Add more projects from the backend by extending the `projects` prop /
 * PROJECTS array below — each one just becomes another stacked Section.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const PROJECTS = [
  {
    id: 'kiwano-villa',
    tag: 'Kiwano Villa',
    title: 'Creating spaces that elevate life',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim adipiscing',
    image: '/dummyimages/2702c77b1fc16911ce7e388a66de1e2c5e71c658.png',
    href: '/kiwano',
  },
  {
    id: 'kiwano-villament',
    tag: 'Kiwano Villament',
    title: 'Creating spaces that elevate life',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim adipiscing',
    image: '/dummyimages/68de01d498421b4e83d9a6e24ebe57bd5e9ea354.png',
    href: '/kiwano-villament',
  },
];

// The backend doesn't store a per-card link, and the site only has two
// standalone project pages today — route by matching the card's tag
// ("Kiwano Villa" / "Kiwano Villament") against them, falling back to the
// Kiwano Villa page.
const resolveHref = (tag = '') =>
  /villament/i.test(tag) ? '/kiwano-villament' : '/kiwano';

/**
 * MobileProjectCard — one stacked card in the mobile "Our Projects" list.
 * Figma (390px baseline): card w:360 h:723 top:66 left:14 radius:3.82,
 * content block top:19 left:24.14 w:269, divider, tag pill (10×10 square +
 * 12px uppercase label), 32px/36.6 heading, 14px/21 description, then a
 * 92px-wide divider + "Learn more" link. Unlike the desktop Section, this
 * is a static (non-fixed, non-parallax) stacked card.
 */
function MobileProjectCard({ project }) {
  // Same reveal as the desktop Section (Section.jsx): the background image
  // is `position: fixed` — pinned to the viewport — so the card acts as a
  // moving window sliding across a stationary image as the page scrolls,
  // plus a ±10vh parallax drift on top. Anchoring it to the card with
  // `absolute` instead collapses that ~1570px relative sweep down to just
  // the ~128px parallax, which reads as no reveal at all.
  const scrollTarget = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-10vh', '10vh']);

  return (
    <div
      ref={scrollTarget}
      className="w-full flex justify-center"
      style={{
        paddingTop: 'clamp(10px, 2.923vw, 27px)',
        paddingBottom: 'clamp(16px, 4.154vw, 24px)',
        paddingLeft: 'clamp(10px, 3.846vw, 15px)',
        paddingRight: 'clamp(10px, 3.846vw, 15px)',
        boxSizing: 'border-box',
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: '360px',
          aspectRatio: '360 / 723',
          borderRadius: '3.82px',
          background: '#101010',
          // `overflow: hidden` alone doesn't clip `position: fixed`
          // descendants to this box — without this the pinned image paints
          // over the rest of the page. Same static clip-path Section.jsx uses.
          clipPath: 'inset(0% 0% 0% 0%)',
        }}
      >
        <div className="fixed left-0 w-full" style={{ top: '-10vh', height: '120vh', zIndex: 0 }}>
          <motion.div style={{ y }} className="relative w-full h-full">
            <Image src={project.image} alt="" fill priority sizes="100vw" className="object-cover" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute flex flex-col"
          style={{ zIndex: 2, top: '19px', left: '24.14px', width: 'calc(100% - 48.28px)', maxWidth: '269px', gap: '17px' }}
        >
          <div style={{ width: '100%', height: '1px', background: '#00000099' }} />

          <div className="flex flex-col" style={{ gap: '8px' }}>
            {/* Tag pill */}
            <div
              className="flex items-center flex-shrink-0"
              style={{ gap: '7.2px', borderRadius: '90px', paddingLeft: '2px', paddingRight: '2px', width: 'fit-content' }}
            >
              <span className="inline-block flex-shrink-0" style={{ width: '10px', height: '10px', background: '#334454' }} />
              <span
                className="font-sans uppercase whitespace-nowrap"
                style={{ fontWeight: 400, fontSize: '10px', lineHeight: '19.44px', letterSpacing: '-0.32px', color: '#000000' }}
              >
                {project.tag}
              </span>
            </div>

            {/* Heading + description + CTA */}
            <div className="flex flex-col" style={{ gap: '5px' }}>
              <h2
                className="font-roundo m-0"
                style={{ fontWeight: 500, fontSize: '32px', lineHeight: '36.6px', letterSpacing: '-0.73px', color: '#000000' }}
              >
                {project.title}
              </h2>

              <div className="flex flex-col" style={{ gap: '12px' }}>
                <p
                  className="font-sans m-0"
                  style={{ fontWeight: 400, fontSize: '14px', lineHeight: '21px', letterSpacing: 0, color: '#000000CC' }}
                >
                  {project.description}
                </p>

                <a href={project.href} className="flex flex-col no-underline" style={{ gap: '4px', width: '92px' }}>
                  <div style={{ width: '100%', height: '1px', background: '#31444C' }} />
                  <span
                    className="font-sans uppercase whitespace-nowrap flex items-center"
                    style={{ gap: '6px', fontWeight: 600, fontSize: '10.5px', lineHeight: '11.45px', color: '#31444C' }}
                  >
                    Learn more
                    <Image src="/icons/SVG.svg" alt="" width={8} height={8} style={{ width: '7.63px', height: 'auto' }} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.05) 100%)' }}
        />
      </div>
    </div>
  );
}

export default function ProjectsShowcase({ cardsSection, projects }) {
  const DATA = cardsSection?.cards?.length
    ? cardsSection.cards.map((c, i) => {
        const tag = c.title || PROJECTS[i % PROJECTS.length]?.tag;
        return {
          id: i,
          tag,
          title: c.heading || PROJECTS[i % PROJECTS.length]?.title,
          description: c.subheading || PROJECTS[i % PROJECTS.length]?.description,
          image: c.image || PROJECTS[i % PROJECTS.length]?.image,
          href: resolveHref(tag),
        };
      })
    : projects?.length
    ? projects
    : PROJECTS;

  return (
    <div className="relative w-full">
      {/*
       * "OUR PROJECTS" badge bar
       * Figma (1440 baseline): bar h:40.8 pt/pb:5 → pill w:138.2 h:30.8 pt/pb:5.4 gap:7.2
       *   square 14×14 bg:#334454 + "OUR PROJECTS" 16.2px uppercase
       */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          background: '#EDE7DE',
          paddingTop: 'clamp(6px, 1.047vw, 5px)',
          paddingBottom: 'clamp(4px, 0.347vw, 5px)',
        }}
      >
        <div
          className="flex items-center flex-shrink-0"
          style={{
            gap: 'clamp(5px, 0.5vw, 7.2px)',
            borderRadius: '90px',
            paddingTop: 'clamp(10px, 1.375vw, 15.4px)',
            paddingBottom: 'clamp(0px, 0.375vw, 2.4px)',
          }}
        >
          <span
            className="inline-block flex-shrink-0"
            style={{
              width: 'clamp(10px, 0.972vw, 14px)',
              height: 'clamp(10px, 0.972vw, 14px)',
              background: '#334454',
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
            Our Projects
          </span>
        </div>
      </div>

      {/* MOBILE — stacked static cards (390px baseline) */}
      <div className="flex md:hidden flex-col w-full" style={{ background: '#EDE7DE' }}>
        {DATA.map((project) => (
          <MobileProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* DESKTOP — full-screen parallax reveal sections */}
      <div className="hidden md:block">
        {DATA.map((project, i) => (
          <Section key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
