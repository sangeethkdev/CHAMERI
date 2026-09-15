import NewNavbar from "@/components/common/NewNavbar";
import ContactPageForm from "@/components/contact/ContactPageForm";
import Footer from "@/components/common/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactLocations from "@/components/contact/ContactLocations";
import { getContactMainData } from "@/lib/api";

// Re-render this page at most once a minute so admin edits go live
// without a redeploy.
export const revalidate = 60;

export const metadata = {
  title: "Contact Chameri Builders — Thalassery, Kannur, Kerala",
  description:
    "Call +91 91889 13114, email info@chameribuilders.com, or visit our Thalassery office. Ask about Kiwano Villas and Villaments, or book a site visit today.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact Chameri Builders — Thalassery, Kannur, Kerala",
    description: "Call +91 91889 13114, email info@chameribuilders.com, or visit our Thalassery office. Ask about Kiwano Villas and Villaments, or book a site visit today.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Chameri Builders — Thalassery, Kannur, Kerala",
    description: "Call +91 91889 13114, email info@chameribuilders.com, or visit our Thalassery office. Ask about Kiwano Villas and Villaments, or book a site visit today.",
  },
};

export default async function ContactPage() {
  const data = await getContactMainData();

  return (
    <main className="min-h-screen relative">
      <NewNavbar />

      <ContactHero hero={data?.heroSection} />

      <ContactPageForm />
      <ContactLocations />


      <Footer />
    </main>
  );
}
