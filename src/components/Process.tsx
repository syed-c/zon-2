"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: "01", title: "Discover", desc: "We audit your current position across search, content, and technology. Data reveals the real opportunity, not assumptions." },
  { number: "02", title: "Strategise", desc: "A connected plan across SEO, AI, software, and paid — tailored to your growth stage, not a template." },
  { number: "03", title: "Architect", desc: "We design the systems, content architecture, and technical roadmap before writing a single line of code." },
  { number: "04", title: "Execute", desc: "Our team delivers across every channel simultaneously. SEO, content, development, and automation in parallel." },
  { number: "05", title: "Measure", desc: "Real dashboards, not vanity reports. You see exactly what changed, why it matters, and what to do next." },
  { number: "06", title: "Optimise", desc: "Continuous refinement based on performance data. We iterate fast, double down on what works, and cut what does not." },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openStep, setOpenStep] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".process-step");
      const track = trackRef.current;

      if (!panels.length || !track) return;

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + track.offsetWidth,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="process" className="relative bg-ground py-28 lg:py-0 lg:min-h-[100dvh] flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-20">
        <motion.h2
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="font-display font-semibold text-[clamp(2rem,3.5vw,3rem)] tracking-[-0.02em] leading-[1.05] text-text-primary text-balance"
        >
          From discovery to measured growth.
        </motion.h2>
      </div>

      {isMobile ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="double-bezel cursor-pointer"
              onClick={() => setOpenStep(openStep === Number(step.number) ? null : Number(step.number))}
            >
              <div className="double-bezel-inner p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] tracking-widest text-accent">{step.number}</span>
                    <h3 className="font-display text-lg font-medium text-text-primary">{step.title}</h3>
                  </div>
                  <motion.span
                    animate={{ rotate: openStep === Number(step.number) ? 180 : 0 }}
                    className="text-text-secondary text-sm"
                  >
                    &#709;
                  </motion.span>
                </div>
                <AnimatePresence mode="wait">
                  {openStep === Number(step.number) && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-text-secondary leading-relaxed mt-4 overflow-hidden"
                    >
                      {step.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div ref={trackRef} className="flex gap-6 px-[calc((100vw-1200px)/2)]" style={{ width: "max-content" }}>
          {steps.map((step) => (
            <div
              key={step.number}
              className="process-step min-w-[400px] h-full"
            >
              <div className="double-bezel h-full">
                <div className="double-bezel-inner p-10 h-full flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-sm tracking-widest text-accent">{step.number}</span>
                    <h3 className="font-display text-[28px] font-medium text-text-primary mt-4 mb-3">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[15px] text-text-secondary leading-relaxed max-w-[55ch]">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
