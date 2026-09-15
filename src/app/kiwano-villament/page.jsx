import KiwanoHero from '@/components/KiwanoVillament/KiwanoVHero';
import KiwanoLuxuryVillas from '@/components/KiwanoVillament/KiwanoVLuxuryVillas';
import Kiwano360Tour from '@/components/KiwanoVillament/KiwanoV360Tour';
import KiwanoFeatures from '@/components/KiwanoVillament/KiwanoVFeatures';
import KiwanoGallery from '@/components/KiwanoVillament/KiwanoVGallery';
import KiwanoBrandStory from '@/components/KiwanoVillament/KiwanoVBrandStory';
import KiwanoAmenities from '@/components/KiwanoVillament/KiwanoVAmenities';
import KiwanoOtherProjects from '@/components/KiwanoVillament/KiwanoVOtherProjects';
import Footer from '@/components/common/Footer';
import { getKiwanoVillamentData } from '@/lib/api';

// Re-render this page at most once a minute so admin edits go live
// without a redeploy. Declared here (not inferred from fetch options) so the
// route always gets an ISR window.
export const revalidate = 60;

export const metadata = {
  title: "Kiwano Villaments — 3 BHK Homes in Thalassery | Chameri",
  description:
    "Twenty-four 3 BHK villaments up to 2,362 sq ft with private gardens and up to four balconies. Villa space, apartment ease. K-RERA registered, March 2027.",
  alternates: { canonical: "/kiwano-villament" },
  openGraph: {
    type: "website",
    url: "/kiwano-villament",
    title: "Kiwano Villaments — 3 BHK Homes in Thalassery | Chameri",
    description: "Twenty-four 3 BHK villaments up to 2,362 sq ft with private gardens and up to four balconies. Villa space, apartment ease. K-RERA registered, March 2027.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiwano Villaments — 3 BHK Homes in Thalassery | Chameri",
    description: "Twenty-four 3 BHK villaments up to 2,362 sq ft with private gardens and up to four balconies. Villa space, apartment ease. K-RERA registered, March 2027.",
  },
};

export default async function KiwanoVillamentPage() {
  const kiwanoVillament = await getKiwanoVillamentData();

  return (
    <main style={{ background: '#EDE7DE', minHeight: '100vh' }}>
      <KiwanoHero hero={kiwanoVillament?.heroSection} />
      <KiwanoLuxuryVillas luxuryVillas={kiwanoVillament?.luxuryVillasSection} />
      <KiwanoFeatures features={kiwanoVillament?.featureSection} />
      <Kiwano360Tour tour360={kiwanoVillament?.tour360Section} />
      <KiwanoGallery gallery={kiwanoVillament?.gallerySection} />
      <KiwanoBrandStory brandStory={kiwanoVillament?.highlightsSection} />
      <KiwanoAmenities amenities={kiwanoVillament?.amenitiesSection} />
      <KiwanoOtherProjects otherProjects={kiwanoVillament?.otherProjectSection} />
      <Footer />
    </main>
  );
}
