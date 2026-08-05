import { getHomeData } from "@/lib/api";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import LogoMarquee from "@/components/home/LogoMarquee";
import VillaPlansSection from "@/components/home/VillaPlansSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import GalleryNew from "@/components/home/GalleryNew";
import TeamSection from "@/components/home/TeamSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/common/Footer";

// Re-render this page at most once a minute so admin edits go live
// without a redeploy. Declared here (not inferred from fetch options) so the
// route always gets an ISR window.
export const revalidate = 60;

export default async function Home() {
  const home = await getHomeData();

  return (
    <main>
      <HeroSection hero={home?.hero} />

      <div className="relative z-10 bg-[#EDE7DE]">
        <AboutSection aboutUs={home?.aboutUs} />
        <LogoMarquee logos={home?.logos} />
        <VillaPlansSection villaPlan={home?.villaPlan} />
        <WhyChooseUs chooseUs={home?.chooseUs} />
        <GalleryNew gallery={home?.gallery} />
        <TeamSection ourTeam={home?.ourTeam} />
        <TestimonialsSection testimonial={home?.testimonial} />
        <FAQSection faqSection={home?.faqSection} />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
