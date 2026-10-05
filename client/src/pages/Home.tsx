import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MetricRail from "@/components/MetricRail";
import Projects from "@/components/Projects";
import AutomationTools from "@/components/AutomationTools";
import ClashDetectionDemo from "@/components/ClashDetectionDemo";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="portfolio-page">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <MetricRail />
        <Projects />
        <AutomationTools />
        <ClashDetectionDemo />
        <ExperienceTimeline />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
