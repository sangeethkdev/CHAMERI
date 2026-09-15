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

// Re-render this page at most once a minute so admin edits go live
// without a redeploy. Declared here (not inferred from fetch options) so the
// route always gets an ISR window.
export const revalidate = 60;

export const metadata = {
  title: "Our Story — Building Homes in Kerala Since 1985 | Chameri",
  description:
    "Forty years of founder-led construction in Thalassery. Meet Mr. Prakasan C, the family behind Chameri Builders, and the principles that shape every villa.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: "Our Story — Building Homes in Kerala Since 1985 | Chameri",
    description: "Forty years of founder-led construction in Thalassery. Meet Mr. Prakasan C, the family behind Chameri Builders, and the principles that shape every villa.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story — Building Homes in Kerala Since 1985 | Chameri",
    description: "Forty years of founder-led construction in Thalassery. Meet Mr. Prakasan C, the family behind Chameri Builders, and the principles that shape every villa.",
  },
};

export default async function AboutPage() {
  const about = await getAboutData();

  return (
    <main className="min-h-screen bg-[#EFEDE7] relative" style={{ backgroundColor: "#EFEDE7" }}>
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
