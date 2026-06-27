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

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeTicker />
      <Services />
      <AuditTool />
      <CaseStudies />
      <Differentiator />
      <Process />
      <Testimonials />
      <Blog />
      <CTA />
    </>
  );
}
