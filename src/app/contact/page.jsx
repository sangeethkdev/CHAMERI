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
  title: "Contact Us — Chameri Premium Villa Residences",
  description:
    "Get in touch with the Chameri team. We'd love to hear about your dream home and how we can help bring it to life.",
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
