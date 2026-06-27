"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const services = [
  "Search & Organic",
  "Technical SEO",
  "AI Content Systems",
  "Conversion Optimisation",
  "Web Development",
  "GA4 + GSC Audit",
  "Digital PR",
  "Performance",
];

export default function MarqueeTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-8 bg-[#0F0F0D] overflow-hidden border-y border-[#F2EDE6]/[0.04]">
      <div className="relative">
        <motion.div
          ref={tickerRef}
          className="flex whitespace-nowrap gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...services, ...services].map((service, i) => (
            <span
              key={`${service}-${i}`}
              className="text-sm tracking-wide text-text-secondary hover:text-accent transition-colors duration-200 cursor-default"
            >
              {service}
              <span className="inline-block mx-4 text-accent/50">&#8599;</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
