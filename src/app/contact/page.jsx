import NewNavbar from "@/components/common/NewNavbar";
import ContactPageForm from "@/components/contact/ContactPageForm";
import Footer from "@/components/common/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactLocations from "@/components/contact/ContactLocations";

export const metadata = {
  title: "Contact Us — Chameri Premium Villa Residences",
  description:
    "Get in touch with the Chameri team. We'd love to hear about your dream home and how we can help bring it to life.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen relative">
      <NewNavbar />

      <ContactHero />

      <ContactPageForm />
      <ContactLocations />


      <Footer />
    </main>
  );
}
