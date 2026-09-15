import ProjectListHero from "@/components/project-list/ProjectListHero";
import ProjectsShowcase from "@/components/project-list/ProjectsShowcase";
import ProjectContactUs from "@/components/project-list/ProjectContactUs";
import SmoothScroll from "@/components/project-list/SmoothScroll";
import Footer from "@/components/common/Footer";
import { getProjectsMainData } from "@/lib/api";

// Re-render this page at most once a minute so admin edits go live
// without a redeploy. Declared here (not inferred from fetch options) so the
// route always gets an ISR window.
export const revalidate = 60;

export const metadata = {
  title: "Villa Projects in Thalassery, Kannur | Chameri Builders",
  description:
    "Explore Kiwano Villas and Kiwano Villaments in Thalassery — 4 BHK villas and 3 BHK villaments, K-RERA registered, completing March 2027. See plans and specs.",
  alternates: { canonical: "/project-list" },
  openGraph: {
    type: "website",
    url: "/project-list",
    title: "Villa Projects in Thalassery, Kannur | Chameri Builders",
    description: "Explore Kiwano Villas and Kiwano Villaments in Thalassery — 4 BHK villas and 3 BHK villaments, K-RERA registered, completing March 2027. See plans and specs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa Projects in Thalassery, Kannur | Chameri Builders",
    description: "Explore Kiwano Villas and Kiwano Villaments in Thalassery — 4 BHK villas and 3 BHK villaments, K-RERA registered, completing March 2027. See plans and specs.",
  },
};

export default async function ProjectListPage() {
  const data = await getProjectsMainData();

  return (
    <main className="min-h-screen bg-[#EFEDE7]" style={{ backgroundColor: "#EFEDE7" }}>
      <SmoothScroll />
      <ProjectListHero hero={data?.heroSection} />
      <ProjectsShowcase cardsSection={data?.cardsSection} />
      <ProjectContactUs />
      <Footer />
    </main>
  );
}
