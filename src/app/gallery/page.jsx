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
  title: "Project Gallery — Thalassery & Kannur | Chameri",
  description:
    "Photographs of Chameri villas, interiors, amenities and completed projects across Thalassery and Kannur. See the craftsmanship before you visit the site.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    url: "/gallery",
    title: "Project Gallery — Thalassery & Kannur | Chameri",
    description: "Photographs of Chameri villas, interiors, amenities and completed projects across Thalassery and Kannur. See the craftsmanship before you visit the site.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa Project Gallery — Thalassery & Kannur | Chameri",
    description: "Photographs of Chameri villas, interiors, amenities and completed projects across Thalassery and Kannur. See the craftsmanship before you visit the site.",
  },
};

export default async function GalleryPage() {
  const gallery = await getGalleryData();

  return (
    <main className="min-h-screen relative bg-[#EDE7DE]" style={{ backgroundColor: "#EDE7DE" }}>
      <NewNavbar />
      <GalleryHero heroSection={gallery?.heroSection} />
      <GalleryGrid galleryImages={gallery?.galleryImages} galleryEvents={gallery?.galleryEvents} />
      <GalleryContactUs />
      <Footer />
    </main>
  );
}
