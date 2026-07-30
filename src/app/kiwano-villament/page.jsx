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

export const metadata = {
  title: 'Kiwano Villament — Chameri Premium Villa Residences',
  description:
    'Elegant spaces built for refined views. Experience Chameri Kiwano Villament — a scroll-driven visual journey into premium living.',
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
