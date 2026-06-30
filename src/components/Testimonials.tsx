"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

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

export default function Testimonials({ isHomePage }: { isHomePage?: boolean } = {}) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== active) setActive(idx);
  };

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#0F0F0D] border-y border-[#F2EDE6]/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: horizontal swipe carousel */}
        <div className="lg:hidden">
          {isHomePage ? (
            <div className="hp-testimonial-card">
              <svg className="hp-testimonial-quote-icon w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" /></svg>
              <p className="hp-testimonial-quote">&ldquo;{testimonials[active].quote}&rdquo;</p>
              <span className="hp-testimonial-author">{testimonials[active].name}</span>
              <span className="hp-testimonial-role">{testimonials[active].role}</span>
              <div className="hp-testimonial-stars">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <span key={i} className="hp-testimonial-star">&#9679;</span>
                ))}
              </div>
              <div className="hp-testimonial-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActive(i); }}
                    className={`hp-testimonial-dot ${i === active ? "active" : ""}`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4 gap-4"
              >
                {testimonials.map((t) => (
                  <div key={t.name} className="snap-center shrink-0 w-[85vw] max-w-[400px]">
                    <div className="bg-[#181818] border border-accent/25 rounded-[1.25rem] p-6 h-full">
                      <svg className="w-6 h-6 text-accent/20 mb-3" viewBox="0 0 24 24" fill="currentColor"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" /></svg>
                      <p className="text-sm text-text-secondary leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-semibold">
                          {t.initials}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-text-primary">{t.name}</div>
                          <div className="text-xs text-text-secondary">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActive(i);
                      scrollRef.current?.children[i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === active ? "bg-accent w-6" : "bg-accent/25"
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Desktop: grid + quote display */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-center">
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
                      {t.initials}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
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
          </div>
        </div>
      </div>
    </section>
  );
}
