import NewNavbar from "@/components/common/NewNavbar";
import Footer from "@/components/common/Footer";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryContactUs from "@/components/gallery/GalleryContactUs";
import { getGalleryData } from "@/lib/api";

// Re-render this page at most once a minute so admin edits go live
// without a redeploy. Declared here (not inferred from fetch options) so the
// route always gets an ISR window.
export const revalidate = 60;

export const metadata = {
  title: "Gallery — Chameri Premium Villa Residences",
  description: "Explore our collection of timeless villas and landmark spaces.",
};

export default async function GalleryPage() {
  const gallery = await getGalleryData();

  return (
    <main className="min-h-screen relative bg-[#EDE7DE]">
      <NewNavbar />
      <GalleryHero heroSection={gallery?.heroSection} />
      <GalleryGrid galleryImages={gallery?.galleryImages} galleryEvents={gallery?.galleryEvents} />
      <GalleryContactUs />
      <Footer />
    </main>
  );
}
