"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { caseStudies } from "@/data/case-studies";

gsap.registerPlugin(ScrollTrigger);

const filters = ["All", "E-Commerce", "SaaS", "Healthcare", "Legal"];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredStudies =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((s) => s.industry === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: leftColRef.current,
        start: "top 10%",
        end: "bottom bottom",
        scrub: false,
      });

      gsap.utils.toArray<HTMLElement>(".case-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 lg:py-32 bg-ground relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div ref={leftColRef} className="lg:col-span-4 self-start">
            <h2 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.025em] leading-[1] text-text-primary text-balance mb-10">
              Results that
              <br />
              speak for
              <br />
              themselves.
            </h2>

            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-[11px] font-medium tracking-[0.15em] uppercase px-3 py-1.5 rounded-full transition-all duration-300 ${
                    activeFilter === f
                      ? "bg-accent text-ground"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div ref={cardsRef} className="lg:col-span-8 space-y-6">
            {filteredStudies.map((study) => (
              <div key={study.client} className="case-card">
                <Link href={`/${study.slug}`}>
                  <div className="double-bezel">
                    <div className="double-bezel-inner p-6 lg:p-8 group">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent">
                              {study.industry}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-text-secondary/30" />
                            <span className="text-xs text-text-secondary">{study.client}</span>
                          </div>
                          <h3 className="font-mono text-xl lg:text-2xl font-medium text-text-primary mb-2">
                            {study.result}
                          </h3>
                          <p className="text-sm text-text-secondary leading-relaxed max-w-[55ch]">
                            {study.description}
                          </p>
                        </div>
                        <div className="shrink-0">
                          <span className="inline-flex items-center gap-1 text-xs text-text-secondary group-hover:text-accent transition-colors">
                            View case study
                            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
