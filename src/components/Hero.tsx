"use client";

import { useRef, useEffect, useState, memo, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "@phosphor-icons/react";

const Beams = dynamic(() => import("@/components/Beams"), { ssr: false });

/* ------------------------------------------------------------------ */
/*  Background Layers                                                  */
/* ------------------------------------------------------------------ */

const HeroGrain = memo(function HeroGrain() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1] opacity-[0.035]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
});

function HeroGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(242, 237, 230, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(242, 237, 230, 0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        transform: "perspective(600px) rotateX(30deg)",
        transformOrigin: "bottom center",
        WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 40%)",
        maskImage: "linear-gradient(to top, transparent 0%, black 40%)",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Card 1 — Organic Traffic Growth                                    */
/* ------------------------------------------------------------------ */

function TrafficSparkline() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
    const timer = setTimeout(() => {
      path.style.transition = "stroke-dashoffset 1200ms cubic-bezier(0.32, 0.72, 0, 1) 800ms";
      path.style.strokeDashoffset = "0";
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg viewBox="0 0 240 60" className="w-full h-[60px] mt-3">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4A849" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#D4A849" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path
        d="M0 50 L30 45 L60 38 L90 42 L120 28 L150 20 L180 14 L210 8 L240 3"
        fill="none"
        stroke="#D4A849"
        strokeWidth="1.5"
        ref={pathRef}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0 50 L30 45 L60 38 L90 42 L120 28 L150 20 L180 14 L210 8 L240 3 L240 60 L0 60 Z"
        fill="url(#sparkFill)"
      />
    </svg>
  );
}

function TrafficCard() {
  return (
    <div className="bg-white/[0.025] border border-white/[0.07] p-[5px] rounded-[1.5rem] w-[280px]">
      <div className="bg-[#111110] rounded-[calc(1.5rem-5px)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] text-[#8A8480] font-medium tracking-wide">Organic Traffic</span>
          <div className="text-right">
            <span className="text-[22px] font-mono font-semibold text-accent">47.3%</span>
            <div className="text-[10px] text-emerald-400">&#8593; vs last qtr</div>
          </div>
        </div>
        <TrafficSparkline />
        <div className="flex justify-between mt-2 text-[9px] text-[#8A8480] tracking-wide font-mono">
          <span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          <span>Jul</span><span>Aug</span>
        </div>
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.06]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] text-[#8A8480]">Live</span>
          <span className="text-[10px] text-[#F2EDE6] ml-auto">Rank & Grow Campaign</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 2 — Keyword Rankings                                          */
/* ------------------------------------------------------------------ */

function RankBar({ label, position, change, width }: { label: string; position: string; change: string; width: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const timers = [300, 450, 600];
    const t = setTimeout(() => setW(width), timers[Math.floor(Math.random() * 3)]);
    return () => clearTimeout(t);
  }, [width]);

  return (
    <div className="mb-3 last:mb-0">
      <div className="text-[11px] text-[#F2EDE6] mb-1 font-medium truncate">{label}</div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-[#1A1917] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-accent h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${w}%` }}
          />
        </div>
        <span className="text-[11px] font-mono text-[#F2EDE6] font-semibold w-6 text-right">{position}</span>
        <span className="text-[10px] text-emerald-400 font-mono w-8 text-right">{change}</span>
      </div>
    </div>
  );
}

function RankingsCard() {
  return (
    <div className="bg-white/[0.025] border border-white/[0.07] p-[5px] rounded-[1.5rem] w-[230px]">
      <div className="bg-[#111110] rounded-[calc(1.5rem-5px)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <span className="text-[11px] text-[#8A8480] font-medium tracking-wide block mb-3">Keyword Rankings</span>
        <RankBar label="seo agency dubai" position="#1" change="&#8593;14" width={88} />
        <RankBar label="google ads management" position="#3" change="&#8593;9" width={70} />
        <RankBar label="organic growth agency" position="#5" change="&#8593;22" width={55} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 3 — Revenue Attribution                                       */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, duration = 1500, delay = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, duration, delay]);
  return value;
}

function RevenueCard() {
  const revenue = useCountUp(2.41, 1500, 900);

  return (
    <div className="bg-white/[0.025] border border-white/[0.07] p-[5px] rounded-[1.5rem] w-[195px]">
      <div className="bg-[#111110] rounded-[calc(1.5rem-5px)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <span className="text-[11px] text-[#8A8480] font-medium tracking-wide block">Attributed Revenue</span>
        <div className="mt-3 mb-2">
          <span className="text-[28px] font-mono font-semibold text-[#F2EDE6]">
            ${revenue.toFixed(2)}M
          </span>
          <div className="text-[10px] text-[#8A8480] font-mono">organic Q3 2025</div>
        </div>
        <svg viewBox="0 0 80 30" className="w-full h-[30px]">
          <rect x="0" y="20" width="14" height="10" rx="2" fill="#D4A849" opacity={0.3} />
          <rect x="22" y="14" width="14" height="16" rx="2" fill="#D4A849" opacity={0.5} />
          <rect x="44" y="8" width="14" height="22" rx="2" fill="#D4A849" opacity={0.7} />
          <rect x="66" y="2" width="14" height="28" rx="2" fill="#D4A849" opacity={1.0} />
        </svg>
        <div className="flex justify-between mt-1 text-[8px] text-[#8A8480] font-mono">
          <span>Q4&apos;24</span><span>Q1&apos;25</span><span>Q2&apos;25</span><span>Q3&apos;25</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG Connector Lines                                                */
/* ------------------------------------------------------------------ */

function SVGConnectors() {
  const line1Ref = useRef<SVGPathElement>(null);
  const line2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    [line1Ref, line2Ref].forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      const length = el.getTotalLength();
      el.style.strokeDasharray = String(length);
      el.style.strokeDashoffset = String(length);
      setTimeout(() => {
        el.style.transition = `stroke-dashoffset 1000ms cubic-bezier(0.32,0.72,0,1) ${1200 + i * 200}ms`;
        el.style.strokeDashoffset = "0";
      }, 50);
    });
  }, []);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: "visible" }}
    >
      <path
        ref={line1Ref}
        d="M 120 80 C 160 120, 180 140, 210 180"
        stroke="rgba(212,168,73,0.25)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        ref={line2Ref}
        d="M 200 220 C 170 280, 140 320, 120 370"
        stroke="rgba(212,168,73,0.18)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="120" cy="80" r="3" fill="#D4A849" opacity={0.4} />
      <circle cx="210" cy="180" r="3" fill="#D4A849" opacity={0.4} />
      <circle cx="120" cy="370" r="3" fill="#D4A849" opacity={0.3} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Metric Constellation — 3 cards + mouse parallax + float            */
/* ------------------------------------------------------------------ */

const cardFloatDuration = 4;

function MetricConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    },
    [mouseX, mouseY]
  );

  const card1X = useTransform(mouseX, (v) => v * 0.012);
  const card1Y = useTransform(mouseY, (v) => v * 0.012);
  const card2X = useTransform(mouseX, (v) => v * 0.022);
  const card2Y = useTransform(mouseY, (v) => v * 0.022);
  const card3X = useTransform(mouseX, (v) => v * 0.035);
  const card3Y = useTransform(mouseY, (v) => v * 0.035);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative h-[540px] w-full hidden md:block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <SVGConnectors />

      <motion.div
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1, rotate: -1.5, x: card1X, y: card1Y }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: cardFloatDuration, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: 0 }}
      >
        <motion.div
          initial={{ x: 60, y: 30, opacity: 0, filter: "blur(4px)" }}
          animate={{ x: 0, y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
        >
          <TrafficCard />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ position: "absolute", top: 160, right: 0, zIndex: 2, rotate: 1.8, x: card2X, y: card2Y }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: cardFloatDuration, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: 1.2 }}
      >
        <motion.div
          initial={{ x: 40, y: 20, opacity: 0, filter: "blur(4px)" }}
          animate={{ x: 0, y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.32, 0.72, 0, 1] }}
        >
          <RankingsCard />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ position: "absolute", bottom: 0, left: 60, zIndex: 3, rotate: -0.5, x: card3X, y: card3Y }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: cardFloatDuration, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: 2.4 }}
      >
        <motion.div
          initial={{ x: 20, y: 10, opacity: 0, filter: "blur(4px)" }}
          animate={{ x: 0, y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <RevenueCard />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Headline with Framer Motion word stagger (SplitText unavailable)   */
/* ------------------------------------------------------------------ */

const lineVariants = {
  hidden: { y: 32, opacity: 0, filter: "blur(5px)" },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: 0.35 + i * 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] as const },
  }),
};

function StaggeredHeadline() {
  return (
    <motion.h1
      className="font-display font-semibold tracking-[-0.03em] leading-[0.93]"
      style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.8rem)" }}
      initial="hidden"
      animate="visible"
    >
      <motion.span custom={0} variants={lineVariants} className="block text-[#F2EDE6] hero-line">
        Growth Through
      </motion.span>
      <motion.span custom={1} variants={lineVariants} className="block text-[#F2EDE6] hero-line">
        Search,{' '}
        <span className="inline">AI &amp;</span>
      </motion.span>
      <motion.span custom={2} variants={lineVariants} className="block text-accent hero-line">
        Software.
      </motion.span>
    </motion.h1>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Hero Section                                                  */
/* ------------------------------------------------------------------ */

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] bg-ground flex items-center overflow-hidden" id="hero">
      {/* Background layers */}
      <div className="absolute inset-0 z-0 opacity-20 md:opacity-40">
        <Beams
          beamWidth={2.5}
          beamHeight={25}
          beamNumber={16}
          lightColor="#d4a849"
          speed={1.5}
          noiseIntensity={1.2}
          scale={0.15}
          rotation={25}
        />
      </div>
      <div className="hidden md:block">
        <HeroGrid />
      </div>
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 700px 500px at 78% 45%, rgba(212,168,73,0.09), transparent),
            radial-gradient(ellipse 400px 300px at 88% 20%, rgba(212,168,73,0.06), transparent),
            radial-gradient(ellipse 900px 600px at 50% 110%, rgba(212,168,73,0.04), transparent)
          `,
        }}
      />
      <HeroGrain />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 min-h-[100dvh] flex flex-col justify-center pt-28 pb-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-[58fr_42fr] gap-8 md:gap-12 lg:gap-16 w-full items-center">
          {/* Left column */}
          <div className="max-w-[620px] text-center md:text-left mx-auto md:mx-0">
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="text-[11px] font-medium tracking-[0.18em] uppercase text-text-secondary flex items-center justify-center md:justify-start gap-2 mb-6 md:mb-8"
            >
              <span className="inline-block w-4 h-px bg-accent" />
              AI-driven growth agency
            </motion.p>

            <StaggeredHeadline />

            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.85, ease: [0.32, 0.72, 0, 1] }}
              className="text-text-secondary text-[0.9375rem] sm:text-[1rem] leading-[1.65] max-w-[50ch] mt-6 md:mt-8"
            >
              We combine technical search, AI content systems, and custom
              software to turn organic traffic into measurable revenue.
            </motion.p>

            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.95, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-8"
            >
              <div className="relative w-full sm:w-auto">
                <Link
                  href="/seo-audit"
                  className="group inline-flex items-center justify-center gap-2 bg-accent text-ground px-6 sm:pl-6 sm:pr-2 py-3 sm:py-2 rounded-full font-medium text-sm active:scale-[0.98] transition-transform duration-150 relative z-10 w-full sm:w-auto"
                >
                  Get Free Audit
                  <span className="hidden sm:inline-flex w-7 h-7 rounded-full bg-ground/10 items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                    <ArrowRight size={14} weight="bold" />
                  </span>
                </Link>
                <motion.div
                  className="absolute inset-0 rounded-full border border-accent/40 z-0"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
                />
              </div>
              <Link
                href="/work"
                className="text-text-secondary/60 underline underline-offset-4 hover:text-text-primary text-sm sm:text-base transition-colors duration-200 py-2"
              >
                See our work
              </Link>
            </motion.div>
          </div>

          {/* Right column — Metric Constellation (desktop only) */}
          <MetricConstellation />
        </div>
      </div>
    </section>
  );
}
