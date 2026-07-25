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
// standalone project pages today — route by matching the card's heading
// against them, falling back to the Kiwano Villa page.
const resolveHref = (heading = '') =>
  /villament/i.test(heading) ? '/kiwano-villament' : '/kiwano';

export default function ProjectsShowcase({ cardsSection, projects }) {
  const DATA = cardsSection?.cards?.length
    ? cardsSection.cards.map((c, i) => ({
        id: i,
        tag: c.title || PROJECTS[i % PROJECTS.length]?.tag,
        title: c.heading || PROJECTS[i % PROJECTS.length]?.title,
        description: c.subheading || PROJECTS[i % PROJECTS.length]?.description,
        image: c.image || PROJECTS[i % PROJECTS.length]?.image,
        href: resolveHref(c.heading),
      }))
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
          paddingTop: 'clamp(4px, 0.347vw, 5px)',
          paddingBottom: 'clamp(4px, 0.347vw, 5px)',
        }}
      >
        <div
          className="flex items-center flex-shrink-0"
          style={{
            gap: 'clamp(5px, 0.5vw, 7.2px)',
            borderRadius: '90px',
            paddingTop: 'clamp(4px, 0.375vw, 5.4px)',
            paddingBottom: 'clamp(4px, 0.375vw, 5.4px)',
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

      {DATA.map((project, i) => (
        <Section key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}
