import Hero from "@/components/Hero";
import MarqueeTicker from "@/components/MarqueeTicker";
import Services from "@/components/Services";
import AuditTool from "@/components/AuditTool";
import CaseStudies from "@/components/CaseStudies";
import Differentiator from "@/components/Differentiator";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import CTA from "@/components/CTA";
import ProofStrip from "@/components/ProofStrip";
import FeaturedCaseStudy from "@/components/FeaturedCaseStudy";

export default function Home() {
  return (
    <div className="home-page">
      <Hero isHomePage />
      <div className="hp-marquee"><MarqueeTicker /></div>
      <div className="hp-proof-strip lg:hidden"><ProofStrip /></div>
      <Services isHomePage />
      <AuditTool isHomePage />
      <CaseStudies isHomePage />
      <Differentiator isHomePage />
      <Process isHomePage />
      <div className="hp-featured-case-study lg:hidden"><FeaturedCaseStudy /></div>
      <Testimonials isHomePage />
      <Blog isHomePage />
      <CTA isHomePage />
    </div>
  );
}
