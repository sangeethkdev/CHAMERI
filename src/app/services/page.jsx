import NewNavbar from "@/components/common/NewNavbar";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesOffered from "@/components/services/ServicesOffered";
import ServicesTestimonials from "@/components/services/ServicesTestimonials";
import Footer from "@/components/common/Footer";
import { getServiceMainData } from "@/lib/api";

// Re-render this page at most once a minute so admin edits go live
// without a redeploy. Declared here (not inferred from fetch options) so the
// route always gets an ISR window.
export const revalidate = 60;

export const metadata = {
  title: "Home Handover, Care & NRI Property Management | Chameri",
  description:
    "Eight-part homeowner support: handover, maintenance, interiors, concierge, digital records, NRI property management and complimentary 10-year insurance.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    title: "Home Handover, Care & NRI Property Management | Chameri",
    description: "Eight-part homeowner support: handover, maintenance, interiors, concierge, digital records, NRI property management and complimentary 10-year insurance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Handover, Care & NRI Property Management | Chameri",
    description: "Eight-part homeowner support: handover, maintenance, interiors, concierge, digital records, NRI property management and complimentary 10-year insurance.",
  },
};

export default async function ServicesPage() {
  const service = await getServiceMainData();

  return (
    <main className="min-h-screen bg-[#EFEDE7]" style={{ backgroundColor: "#EFEDE7" }}>
      <NewNavbar />
      <ServicesHero hero={service?.heroSection} />
      <ServicesOffered cardsSection={service?.cardsSection} />
      <ServicesTestimonials testimonial={service?.testimonial} />

      <Footer />
    </main>
  );
}
