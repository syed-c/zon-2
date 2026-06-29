"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-ground relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(600px circle at 50% 40%, rgba(212,168,73,0.04), transparent 80%)",
        }}
      />
      <div className="relative z-10 max-w-xl mx-auto px-4 text-center">
        <span className="font-mono text-[clamp(5rem,12vw,10rem)] font-semibold text-accent/20 leading-none block mb-4">
          404
        </span>
        <h1 className="font-display font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[1] text-text-primary mb-4">
          Page not <span className="text-accent">found.</span>
        </h1>
        <p className="text-text-secondary text-base max-w-[40ch] mx-auto mb-10 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
          Let&rsquo;s get you back on track.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 bg-accent text-ground pl-6 pr-2 py-2 rounded-full font-medium text-sm active:scale-[0.98] transition-transform duration-150"
          >
            Back Home
            <span className="w-7 h-7 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <ArrowRight size={14} weight="bold" />
            </span>
          </Link>
          <Link
            href="/services"
            className="text-text-secondary/60 underline underline-offset-4 hover:text-text-primary text-sm transition-colors duration-200"
          >
            View Services
          </Link>
        </div>
      </div>
    </div>
  );
}
