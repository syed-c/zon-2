"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Ahmed Al Mansouri",
    role: "CEO, Al Shafar Investment",
    quote: "ZON transformed our entire digital presence. Their integrated approach to SEO, content and technology delivered results we had not seen with any other agency. The custom CRM alone changed how we manage leads.",
    initials: "AM",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Head of Marketing, Gulf Tech Solutions",
    quote: "The AI automation system ZON built saved our team over 40 hours per week in manual lead qualification. The ROI was immediate and continues to grow. They understood our SaaS business model intuitively.",
    initials: "SW",
    rating: 5,
  },
  {
    name: "Dr. Karim Nasr",
    role: "Director of Ops, Dubai Health Authority",
    quote: "Working with ZON on our multi-location digital strategy was a game-changer. They understood our complex compliance requirements and delivered a platform that actually works the way we do.",
    initials: "KN",
    rating: 5,
  },
  {
    name: "Lena Petrova",
    role: "VP Growth, Emerge Logistics",
    quote: "Most agencies talk about data-driven. ZON lives it. Every decision was backed by real numbers, every optimisation showed measurable impact. Our CPA dropped 62% in the first quarter.",
    initials: "LP",
    rating: 5,
  },
  {
    name: "Omar Hassan",
    role: "Founder, Nourish Ventures",
    quote: "ZON built our entire e-commerce engine from scratch — SEO foundation, content systems, conversion architecture. We launched at 92% Lighthouse and grew 340% in six months.",
    initials: "OH",
    rating: 5,
  },
];

const rotations = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg"];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-28 lg:py-32 bg-[#0F0F0D] border-y border-[#F2EDE6]/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setActive(i)}
                  className={`${
                    i === 0 ? "col-span-2 row-span-2" : i % 2 === 0 ? "col-span-1" : "col-span-1"
                  }`}
                  style={{ transform: rotations[i] }}
                >
                  <div
                    className={`rounded-2xl p-6 transition-all duration-300 ${
                      active === i
                        ? "bg-accent text-ground"
                        : "bg-surface-alt text-text-secondary hover:bg-surface"
                    }`}
                  >
                    <span
                      className={`font-display text-lg font-semibold ${
                        active === i ? "text-ground" : "text-text-primary"
                      }`}
                    >
                      {(t.initials)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="relative">
                  <span
                    className="font-display text-[12rem] leading-[0.8] text-accent/15 absolute -top-16 -left-4 select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="relative z-10">
                    <p className="text-xl leading-relaxed text-text-primary max-w-[45ch] mb-8">
                      &ldquo;{testimonials[active].quote}&rdquo;
                    </p>
                    <footer>
                      <div className="text-sm font-medium text-text-primary">
                        {testimonials[active].name}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {testimonials[active].role}
                      </div>
                      <div className="flex gap-1 mt-3">
                        {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                          <span key={i} className="text-[8px] text-accent">&#9679;</span>
                        ))}
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
