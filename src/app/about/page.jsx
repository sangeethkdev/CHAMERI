import NewNavbar from '@/components/common/NewNavbar';
import AboutHeroSection from '@/components/about/AboutHeroSection';
import AboutOriginStory from '@/components/about/AboutOriginStory';
import AboutFounderNote from '@/components/about/AboutFounderNote';
import AboutLogoSection from '@/components/about/AboutLogoSection';
import AboutSpecialSection from '@/components/about/AboutSpecialSection';
import AboutVisionMissionSection from '@/components/about/AboutVisionMissionSection';
import AboutBoardSection from '@/components/about/AboutBoardSection';
import AboutTestimonialSection from '@/components/about/AboutTestimonialSection';
import Footer from '@/components/common/Footer';
import { getAboutData } from '@/lib/api';

export const metadata = {
  title: 'About Us — Chameri Premium Villa Residences',
  description:
    'Learn about Chameri — our story, our values, and the people behind every premium villa we build. Crafting timeless villas and landmark spaces since 1985.',
};

export default async function AboutPage() {
  const about = await getAboutData();

  return (
    <main className="min-h-screen bg-[#EFEDE7] relative">
      <NewNavbar />
      <AboutHeroSection hero={about?.hero} />
      <AboutOriginStory story={about?.story} />
      <AboutFounderNote founder={about?.founder} />
      <AboutLogoSection workLogos={about?.workLogos} />
      <AboutSpecialSection specialSection={about?.specialSection} />
      <AboutVisionMissionSection vision={about?.vision} mission={about?.mission} />
      <AboutBoardSection boardSection={about?.boardSection} />
      <AboutTestimonialSection testimonialSection={about?.testimonialSection} />
      <Footer />
    </main>
  );
}
