"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

export default function CTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-[#0D0C0B] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(800px circle at 50% 0%, rgba(212,168,73,0.04), transparent)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="font-display font-semibold text-[clamp(2.25rem,5vw,5.5rem)] tracking-[-0.03em] leading-[0.95] text-text-primary text-balance max-w-4xl mx-auto mb-3 sm:mb-4"
        >
          Ready to start growing?
        </motion.h2>

        <motion.p
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
          className="text-text-secondary text-sm sm:text-base max-w-[55ch] mx-auto mb-8 sm:mb-10"
        >
          Free audit. No commitment. First results within 60 days or we fix it.
        </motion.p>

        <motion.div
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link
            href="/seo-audit"
            className="group inline-flex items-center justify-center gap-2 bg-accent text-ground px-6 sm:pl-6 sm:pr-2 py-3.5 sm:py-2.5 rounded-full font-medium text-sm active:scale-[0.98] transition-transform duration-150 w-full sm:w-auto"
          >
            Get Free Audit
            <span className="hidden sm:inline-flex w-7 h-7 rounded-full bg-ground/10 items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <ArrowRight size={14} weight="bold" />
            </span>
          </Link>
          <Link
            href="/contact"
            className="text-text-secondary/50 underline underline-offset-4 hover:text-text-primary text-sm transition-colors duration-200 py-2"
          >
            Talk to our team
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
