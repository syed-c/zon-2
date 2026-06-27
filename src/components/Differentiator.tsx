"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    number: "01",
    title: "We embed in your team, not your inbox.",
    desc: "Dedicated strategist with direct access. No account manager middle-layer, no delayed responses, no runaround.",
  },
  {
    number: "02",
    title: "Owned tech platforms. No white-label markup.",
    desc: "We build proprietary audit tools and dashboards. Every insight comes from software we control, not rebranded third-party data.",
  },
  {
    number: "03",
    title: "Direct brief to delivery. Same team, start to finish.",
    desc: "The people who scope the work execute it. No handoffs between sales, strategy, and delivery silos.",
  },
  {
    number: "04",
    title: "Measurable outcomes or we course-correct fast.",
    desc: "Real dashboards, weekly check-ins, transparent reporting. If something isnt working, we shift — not stall.",
  },
];

export default function Differentiator() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: leftRef.current,
        start: "top 10%",
        end: "bottom bottom",
        scrub: false,
      });

      const cardEls = rightRef.current?.querySelectorAll(".diff-card") as NodeListOf<HTMLElement> | undefined;
      if (cardEls) {
        gsap.fromTo(
          cardEls,
          { y: 100, opacity: 0 },
          {
            y: (i) => -(i * 40),
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 lg:py-32 bg-[#0F0F0D] border-y border-[#F2EDE6]/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div ref={leftRef} className="lg:col-span-5 self-start">
            <h2 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.025em] leading-[1] text-text-primary text-balance">
              The difference is in the connection.
            </h2>
          </div>

          <div ref={rightRef} className="lg:col-span-7 space-y-6 relative">
            {cards.map((card) => (
              <div key={card.number} className="diff-card">
                <div className="double-bezel">
                  <div className="double-bezel-inner p-8 lg:p-10">
                    <span className="font-mono text-[11px] tracking-widest text-accent mb-4 block">
                      {card.number}
                    </span>
                    <h3 className="font-display text-xl lg:text-2xl font-medium text-text-primary mb-3">
                      {card.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-[55ch]">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
