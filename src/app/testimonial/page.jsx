import TestimonialHero from "@/components/testimonial/TestimonialHero";
import TestimonialCarousel from "@/components/testimonial/TestimonialCarousel";
import VideoTestimonialCarousel from "@/components/testimonial/VideoTestimonialCarousel";
import Footer from "@/components/common/Footer";
import { getTestimonialsMainData } from "@/lib/api";

// Re-render this page at most once a minute so admin edits go live
// without a redeploy. Declared here (not inferred from fetch options) so the
// route always gets an ISR window.
export const revalidate = 60;

export const metadata = {
  title: "Client Reviews & Video Testimonials | Chameri Builders",
  description:
    "Doctors, directors and families in Kannur explain why they chose Chameri. Six video testimonials and a 5.0 Google review score from real homeowners.",
  alternates: { canonical: "/testimonial" },
  openGraph: {
    type: "website",
    url: "/testimonial",
    title: "Client Reviews & Video Testimonials | Chameri Builders",
    description: "Doctors, directors and families in Kannur explain why they chose Chameri. Six video testimonials and a 5.0 Google review score from real homeowners.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Reviews & Video Testimonials | Chameri Builders",
    description: "Doctors, directors and families in Kannur explain why they chose Chameri. Six video testimonials and a 5.0 Google review score from real homeowners.",
  },
};

export default async function TestimonialPage() {
  const data = await getTestimonialsMainData();

  return (
    <main className="min-h-screen bg-[#EFEDE7]" style={{ backgroundColor: "#EFEDE7" }}>
      <TestimonialHero hero={data?.heroSection} />
      <TestimonialCarousel reviews={data?.reviewsSection} />
      <VideoTestimonialCarousel reviews={data?.reviewsSection} />
      <Footer />
    </main>
  );
}
