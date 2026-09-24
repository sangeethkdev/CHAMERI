import KiwanoHero from '@/components/kiwano/KiwanoHero';
import KiwanoLuxuryVillas from '@/components/kiwano/KiwanoLuxuryVillas';
import Kiwano360Tour from '@/components/kiwano/Kiwano360Tour';
import KiwanoFeatures from '@/components/kiwano/KiwanoFeatures';
import KiwanoGallery from '@/components/kiwano/KiwanoGallery';
import KiwanoBrandStory from '@/components/kiwano/KiwanoBrandStory';
import KiwanoAmenities from '@/components/kiwano/KiwanoAmenities';
import KiwanoOtherProjects from '@/components/kiwano/KiwanoOtherProjects';
import Footer from '@/components/common/Footer';
import { getKiwanoData } from '@/lib/api';

// Re-render this page at most once a minute so admin edits go live
// without a redeploy. Declared here (not inferred from fetch options) so the
// route always gets an ISR window.
export const revalidate = 60;

export const metadata = {
  title: "Kiwano Villas — 4 BHK Villas in Thalassery | Chameri",
  description:
    "Nine 4 BHK villas of 2,806 sq ft on 6.59-7.01 cent plots, in Tropical Modernism style. Pool, gym, 24x7 security. K-RERA registered, ready March 2027.",
  alternates: { canonical: "/kiwano-villa" },
  openGraph: {
    type: "website",
    url: "/kiwano-villa",
    title: "Kiwano Villas — 4 BHK Villas in Thalassery | Chameri",
    description: "Nine 4 BHK villas of 2,806 sq ft on 6.59-7.01 cent plots, in Tropical Modernism style. Pool, gym, 24x7 security. K-RERA registered, ready March 2027.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiwano Villas — 4 BHK Villas in Thalassery | Chameri",
    description: "Nine 4 BHK villas of 2,806 sq ft on 6.59-7.01 cent plots, in Tropical Modernism style. Pool, gym, 24x7 security. K-RERA registered, ready March 2027.",
  },
};

export default async function KiwanoPage() {
  const kiwano = await getKiwanoData();

  return (
    <main style={{ background: '#EDE7DE', minHeight: '100vh' }}>
      <KiwanoHero hero={kiwano?.heroSection} />
      <KiwanoLuxuryVillas luxuryVillas={kiwano?.luxuryVillasSection} />
      <KiwanoFeatures features={kiwano?.featureSection} />
      <Kiwano360Tour tour360={kiwano?.tour360Section} />
      <KiwanoGallery gallery={kiwano?.gallerySection} />
      <KiwanoBrandStory brandStory={kiwano?.highlightsSection} />
      <KiwanoAmenities amenities={kiwano?.amenitiesSection} />
      <KiwanoOtherProjects otherProjects={kiwano?.otherProjectSection} />
      <Footer />
    </main>
  );
}
