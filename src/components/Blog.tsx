"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

const posts = [
  {
    title: "How GEO Is Rewriting Search Marketing in 2026",
    category: "Guide",
    excerpt: "Generative Engine Optimisation is not a trend — it is a structural shift in how brands get discovered. Heres what changes and what does not.",
    hasImage: true,
    date: "Jun 22, 2026",
  },
  {
    title: "Technical SEO Checklist for Next.js Sites",
    category: "Article",
    excerpt: "Server rendering, metadata, structured data, and Core Web Vitals — the complete checklist for Next.js in production.",
    hasImage: false,
    date: "Jun 18, 2026",
  },
  {
    title: "AI Agents for Lead Qualification: A Practical Guide",
    category: "Research",
    excerpt: "How we built an AI agent that qualifies 40% of inbound leads before a human touches them.",
    hasImage: false,
    date: "Jun 14, 2026",
  },
  {
    title: "Dubai Local SEO: 2026 Market Analysis",
    category: "Report",
    excerpt: "Data from 200+ Dubai-based businesses on local pack visibility, GBP signals, and citation quality.",
    hasImage: false,
    date: "Jun 10, 2026",
  },
];

export default function Blog() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-ground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.02em] leading-[1.05] text-text-primary text-balance mb-8 lg:mb-16"
        >
          Latest thinking from our team.
        </motion.h2>

        <div className="space-y-6">
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="double-bezel">
              <div className="double-bezel-inner grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[calc(2rem-8px)]">
                <div className="aspect-[4/3] bg-surface-alt bg-cover bg-center grayscale-[30%] opacity-90 mix-blend-luminosity"
                  style={{ backgroundImage: "url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80)" }}
                />
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3">
                    {featured.category}
                  </span>
                  <h3 className="font-display text-[28px] font-medium text-text-primary mb-3">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-[52ch] mb-6">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-text-secondary/40">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ y: 32, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="double-bezel h-full">
                  <div className="double-bezel-inner p-6 flex flex-col gap-4 h-full">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent">
                          {post.category}
                        </span>
                        <span className="text-[11px] text-text-secondary/60">{post.date}</span>
                      </div>
                      <h3 className="font-display text-lg font-medium text-text-primary leading-snug">
                        {post.title}
                      </h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-text-secondary/40">
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
