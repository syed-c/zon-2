"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Binoculars, Robot, MegaphoneSimple, Lightning, PencilCircle,
  Code, Gear, Stack, ChartBar, ArrowRight, ArrowLineUpRight,
} from "@phosphor-icons/react";
import ShapeGrid from "@/components/ShapeGrid";
import { pillars as pillarData } from "@/data/services";
import type { PillarData } from "@/data/services";

const iconMap: Record<string, React.ElementType> = {
  "search-organic-growth": Binoculars,
  "geo-ai-search": Robot,
  "digital-pr": MegaphoneSimple,
  "paid-media": Lightning,
  "social-content": PencilCircle,
  "web-development": Code,
  "ai-automation": Gear,
  "custom-software": Stack,
  analytics: ChartBar,
};

const pillarDescriptions: Record<string, string> = {
  "search-organic-growth": "Complete SEO strategy from technical audits to content development and link building. Drive sustainable organic growth.",
  "geo-ai-search": "Optimise for generative engines, AI overviews and LLM-based discovery platforms. Own your brand presence in AI search.",
  "digital-pr": "Digital PR, media outreach, and brand authority campaigns that earn coverage, backlinks, and trust.",
  "paid-media": "Paid search, social, and display campaigns engineered for ROAS. From strategy to creative testing to bid optimisation.",
  "social-content": "Social media strategy, content production, and creative campaigns that build communities and drive engagement.",
  "web-development": "Next.js, headless CMS, and high-performance websites built for speed, SEO, and conversion.",
  "ai-automation": "AI agents, workflow automation, and intelligent systems that replace manual busywork with scalable processes.",
  "custom-software": "Custom CRM development, SaaS platforms, client portals, and internal tools built on modern stacks.",
  analytics: "Analytics setup, dashboards, tracking, and data systems that turn raw data into actionable decisions.",
};

const pillarOutcomes: Record<string, string[]> = {
  "search-organic-growth": ["312% avg organic lift", "Technical health score 95+", "Content-based authority"],
  "geo-ai-search": ["AI citation tracking", "LLM visibility audits", "Generative engine optimisation"],
  "digital-pr": ["Authority-building PR", "Earned media at scale", "Brand trust signals"],
  "paid-media": ["4.2x avg ROAS", "Full-funnel coverage", "Creative testing engine"],
  "social-content": ["Community growth", "Content production engine", "Cross-platform strategy"],
  "web-development": ["Sub-2s performance", "SEO-first architecture", "Conversion-optimised UX"],
  "ai-automation": ["Manual tasks removed", "Workflow intelligence", "AI agent deployment"],
  "custom-software": ["Custom CRM & portals", "SaaS platforms built", "Modern tech stacks"],
  analytics: ["Unified dashboards", "Attribution clarity", "Real-time decisions"],
};

const sectionBgs = [
  "bg-[#0A0A0A]",
  "bg-[#0D0D0C]",
  "bg-[#0A0A0A]",
  "bg-[#111110]",
  "bg-[#0A0A0A]",
  "bg-[#0D0D0C]",
  "bg-[#0A0A0A]",
  "bg-[#111110]",
  "bg-[#0A0A0A]",
];

const ease = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const pillReveal = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.025, duration: 0.35, ease },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

/* ─── PREMIUM ILLUSTRATIONS (BOOSTED: 40-55% opacity range) ─── */

function IllustrationSERP() {
  return (
    <svg viewBox="0 0 320 260" className="w-full h-full" fill="none">
      <rect x="30" y="12" width="260" height="16" rx="8" stroke="#D4A849" strokeWidth="0.5" opacity="0.25" fill="#D4A849" fillOpacity="0.04" />
      <text x="45" y="24" fill="#D4A849" opacity="0.3" fontSize="7" fontFamily="monospace">google.com/search?q=growth+strategy</text>
      <rect x="30" y="40" width="260" height="1" stroke="#D4A849" strokeWidth="0.3" opacity="0.08" />
      <text x="30" y="58" fill="#D4A849" opacity="0.2" fontSize="6" fontFamily="monospace">About 1,240,000 results (0.43 seconds)</text>
      <rect x="30" y="70" width="240" height="3" rx="1.5" fill="#D4A849" opacity="0.08" />
      <rect x="30" y="78" width="180" height="2" rx="1" fill="#D4A849" opacity="0.05" />
      <rect x="30" y="84" width="200" height="2" rx="1" fill="#D4A849" opacity="0.04" />
      <rect x="30" y="96" width="24" height="24" rx="4" fill="#D4A849" opacity="0.15" />
      <rect x="30" y="96" width="24" height="24" rx="4" stroke="#D4A849" strokeWidth="0.8" opacity="0.4" fill="#D4A849" fillOpacity="0.08" />
      <text x="38" y="111" fill="#D4A849" opacity="0.5" fontSize="9" fontFamily="monospace" fontWeight="600">1</text>
      <rect x="62" y="96" width="220" height="3" rx="1.5" fill="#D4A849" opacity="0.55" />
      <rect x="62" y="103" width="140" height="2" rx="1" fill="#D4A849" opacity="0.2" />
      <rect x="62" y="109" width="160" height="2" rx="1" fill="#D4A849" opacity="0.12" />
      <rect x="30" y="130" width="24" height="24" rx="4" stroke="#D4A849" strokeWidth="0.5" opacity="0.2" />
      <text x="38" y="145" fill="#D4A849" opacity="0.3" fontSize="9" fontFamily="monospace">2</text>
      <rect x="62" y="130" width="200" height="2.5" rx="1" fill="#D4A849" opacity="0.12" />
      <rect x="62" y="137" width="120" height="2" rx="1" fill="#D4A849" opacity="0.08" />
      <rect x="30" y="164" width="24" height="24" rx="4" stroke="#D4A849" strokeWidth="0.5" opacity="0.15" />
      <text x="38" y="179" fill="#D4A849" opacity="0.22" fontSize="9" fontFamily="monospace">3</text>
      <rect x="62" y="164" width="180" height="2.5" rx="1" fill="#D4A849" opacity="0.08" />
      <rect x="62" y="171" width="100" height="2" rx="1" fill="#D4A849" opacity="0.06" />
      <path d="M240 50 L255 55 L265 48 L275 58 L285 52 L295 62" stroke="#D4A849" strokeWidth="1.2" opacity="0.4" fill="none" />
      <circle cx="295" cy="62" r="2.5" fill="#D4A849" opacity="0.6" />
      <text x="290" y="46" fill="#D4A849" opacity="0.3" fontSize="6" fontFamily="monospace">+312%</text>
    </svg>
  );
}

function IllustrationNeural() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full" fill="none">
      {[0, 1, 2, 3].map(row =>
        [0, 1, 2, 3, 4].map(col => (
          <g key={`${row}-${col}`}>
            <circle cx={20 + col * 60} cy={20 + row * 48} r="3" fill="#D4A849" opacity={0.45 + row * 0.07} />
            {col < 4 && row < 3 && (
              <line x1={20 + col * 60} y1={20 + row * 48} x2={80 + col * 60} y2={68 + row * 48} stroke="#D4A849" strokeWidth="0.4" opacity="0.35" />
            )}
          </g>
        ))
      )}
      <text x="140" y="108" textAnchor="middle" fill="#D4A849" opacity="0.5" fontSize="11" fontFamily="monospace">GPT-CRAWL</text>
      <rect x="40" y="88" width="200" height="30" rx="4" stroke="#D4A849" strokeWidth="0.5" opacity="0.5" strokeDasharray="4 3" />
    </svg>
  );
}

function IllustrationPR() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full" fill="none">
      <circle cx="140" cy="100" r="7" fill="#D4A849" opacity="0.8" />
      <circle cx="140" cy="100" r="30" stroke="#D4A849" strokeWidth="0.7" opacity="0.55" />
      <circle cx="140" cy="100" r="55" stroke="#D4A849" strokeWidth="0.5" opacity="0.4" />
      <circle cx="140" cy="100" r="82" stroke="#D4A849" strokeWidth="0.4" opacity="0.3" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => {
        const x1 = 140 + 30 * Math.cos((angle * Math.PI) / 180);
        const y1 = 100 + 30 * Math.sin((angle * Math.PI) / 180);
        const x2 = 140 + 82 * Math.cos((angle * Math.PI) / 180);
        const y2 = 100 + 82 * Math.sin((angle * Math.PI) / 180);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4A849" strokeWidth="0.4" opacity="0.35" />;
      })}
    </svg>
  );
}

function IllustrationPaid() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full" fill="none">
      <rect x="30" y="110" width="28" height="55" rx="3" fill="#D4A849" opacity="0.45" />
      <rect x="68" y="80" width="28" height="85" rx="3" fill="#D4A849" opacity="0.55" />
      <rect x="106" y="50" width="28" height="115" rx="3" fill="#D4A849" opacity="0.7" />
      <rect x="144" y="60" width="28" height="105" rx="3" fill="#D4A849" opacity="0.6" />
      <rect x="182" y="90" width="28" height="75" rx="3" fill="#D4A849" opacity="0.5" />
      <rect x="220" y="105" width="28" height="60" rx="3" fill="#D4A849" opacity="0.4" />
      <path d="M44 105 L82 75 L120 45 L158 55 L196 85 L234 100" stroke="#D4A849" strokeWidth="1.2" opacity="0.65" fill="none" />
      <circle cx="120" cy="45" r="3.5" fill="#D4A849" opacity="0.7" />
      <text x="154" y="45" fill="#D4A849" opacity="0.5" fontSize="9" fontFamily="monospace">4.2x ROAS</text>
    </svg>
  );
}

function IllustrationContent() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full" fill="none">
      {[0, 1, 2].map(row =>
        [0, 1, 2, 3].map(col => (
          <g key={`${row}-${col}`}>
            <rect x={20 + col * 65} y={30 + row * 55} width="50" height="38" rx="6" stroke="#D4A849" strokeWidth="0.6" opacity={0.35 + row * 0.08} fill="#D4A849" fillOpacity="0.08" />
            <circle cx={30 + col * 65} cy={45 + row * 55} r="6" fill="#D4A849" opacity="0.3" />
            <line x1={42 + col * 65} y1={44 + row * 55} x2={60 + col * 65} y2={44 + row * 55} stroke="#D4A849" strokeWidth="0.5" opacity="0.4" />
            <line x1={42 + col * 65} y1={52 + row * 55} x2={55 + col * 65} y2={52 + row * 55} stroke="#D4A849" strokeWidth="0.4" opacity="0.3" />
          </g>
        ))
      )}
    </svg>
  );
}

function IllustrationWebDev() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full" fill="none">
      <rect x="50" y="30" width="180" height="120" rx="6" stroke="#D4A849" strokeWidth="0.8" opacity="0.55" />
      <rect x="50" y="30" width="180" height="18" rx="6" stroke="#D4A849" strokeWidth="0.6" opacity="0.4" fill="#D4A849" fillOpacity="0.1" />
      <circle cx="63" cy="39" r="3" fill="#D4A849" opacity="0.6" />
      <circle cx="73" cy="39" r="3" fill="#D4A849" opacity="0.5" />
      <circle cx="83" cy="39" r="3" fill="#D4A849" opacity="0.4" />
      <text x="140" y="108" textAnchor="middle" fill="#D4A849" opacity="0.45" fontSize="32" fontFamily="monospace">{"</>"}</text>
      <line x1="60" y1="68" x2="220" y2="68" stroke="#D4A849" strokeWidth="0.4" opacity="0.3" />
      <line x1="60" y1="78" x2="180" y2="78" stroke="#D4A849" strokeWidth="0.4" opacity="0.2" />
      <line x1="60" y1="88" x2="200" y2="88" stroke="#D4A849" strokeWidth="0.3" opacity="0.15" />
      <rect x="60" y="100" width="40" height="30" rx="3" stroke="#D4A849" strokeWidth="0.5" opacity="0.4" fill="#D4A849" fillOpacity="0.08" />
      <rect x="110" y="100" width="40" height="30" rx="3" stroke="#D4A849" strokeWidth="0.5" opacity="0.4" fill="#D4A849" fillOpacity="0.08" />
    </svg>
  );
}

function IllustrationAutomation() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full" fill="none">
      <rect x="20" y="75" width="48" height="36" rx="5" stroke="#D4A849" strokeWidth="0.8" opacity="0.6" fill="#D4A849" fillOpacity="0.1" />
      <rect x="116" y="30" width="48" height="36" rx="5" stroke="#D4A849" strokeWidth="0.8" opacity="0.7" fill="#D4A849" fillOpacity="0.12" />
      <rect x="212" y="75" width="48" height="36" rx="5" stroke="#D4A849" strokeWidth="0.8" opacity="0.6" fill="#D4A849" fillOpacity="0.1" />
      <rect x="116" y="130" width="48" height="36" rx="5" stroke="#D4A849" strokeWidth="0.8" opacity="0.65" fill="#D4A849" fillOpacity="0.1" />
      <path d="M68 93 L116 48" stroke="#D4A849" strokeWidth="0.6" opacity="0.5" strokeDasharray="3 2" />
      <path d="M164 48 L212 93" stroke="#D4A849" strokeWidth="0.6" opacity="0.5" strokeDasharray="3 2" />
      <path d="M212 111 L164 148" stroke="#D4A849" strokeWidth="0.6" opacity="0.4" strokeDasharray="3 2" />
      <path d="M116 148 L68 111" stroke="#D4A849" strokeWidth="0.6" opacity="0.4" strokeDasharray="3 2" />
      <text x="39" y="98" textAnchor="middle" fill="#D4A849" opacity="0.55" fontSize="7" fontFamily="monospace">INPUT</text>
      <text x="140" y="53" textAnchor="middle" fill="#D4A849" opacity="0.65" fontSize="7" fontFamily="monospace">AI</text>
      <text x="236" y="98" textAnchor="middle" fill="#D4A849" opacity="0.55" fontSize="7" fontFamily="monospace">OUTPUT</text>
    </svg>
  );
}

function IllustrationSoftware() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full" fill="none">
      <rect x="60" y="25" width="60" height="55" rx="5" stroke="#D4A849" strokeWidth="0.8" opacity="0.65" fill="#D4A849" fillOpacity="0.1" />
      <rect x="100" y="60" width="60" height="55" rx="5" stroke="#D4A849" strokeWidth="0.8" opacity="0.55" fill="#D4A849" fillOpacity="0.08" />
      <rect x="140" y="95" width="60" height="55" rx="5" stroke="#D4A849" strokeWidth="0.8" opacity="0.45" fill="#D4A849" fillOpacity="0.08" />
      <line x1="120" y1="25" x2="130" y2="60" stroke="#D4A849" strokeWidth="0.5" opacity="0.4" />
      <line x1="160" y1="60" x2="170" y2="95" stroke="#D4A849" strokeWidth="0.5" opacity="0.35" />
      <text x="90" y="58" textAnchor="middle" fill="#D4A849" opacity="0.5" fontSize="7" fontFamily="monospace">CRM</text>
      <text x="130" y="93" textAnchor="middle" fill="#D4A849" opacity="0.45" fontSize="7" fontFamily="monospace">API</text>
      <text x="170" y="128" textAnchor="middle" fill="#D4A849" opacity="0.4" fontSize="7" fontFamily="monospace">DB</text>
    </svg>
  );
}

function IllustrationAnalytics() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full" fill="none">
      <line x1="30" y1="165" x2="250" y2="165" stroke="#D4A849" strokeWidth="0.5" opacity="0.4" />
      <line x1="30" y1="165" x2="30" y2="35" stroke="#D4A849" strokeWidth="0.4" opacity="0.3" />
      <path d="M30 155 L60 140 L90 145 L120 110 L150 120 L180 75 L210 85 L240 50 L250 55" stroke="#D4A849" strokeWidth="1.5" opacity="0.7" fill="none" />
      <path d="M30 155 L60 140 L90 145 L120 110 L150 120 L180 75 L210 85 L240 50 L250 55 L250 165 L30 165Z" fill="#D4A849" fillOpacity="0.12" />
      <circle cx="120" cy="110" r="3.5" fill="#D4A849" opacity="0.7" />
      <circle cx="180" cy="75" r="3.5" fill="#D4A849" opacity="0.75" />
      <circle cx="240" cy="50" r="3.5" fill="#D4A849" opacity="0.8" />
      <text x="246" y="46" fill="#D4A849" opacity="0.55" fontSize="7" fontFamily="monospace">+47%</text>
      {[0, 1, 2, 3, 4].map(i => (
        <line key={i} x1={30 + i * 55} y1="35" x2={30 + i * 55} y2="165" stroke="#D4A849" strokeWidth="0.25" opacity="0.15" strokeDasharray="2 6" />
      ))}
    </svg>
  );
}

const pillarIllustrations: Record<string, React.ComponentType<any>> = {
  "search-organic-growth": IllustrationSERP,
  "geo-ai-search": IllustrationNeural,
  "digital-pr": IllustrationPR,
  "paid-media": IllustrationPaid,
  "social-content": IllustrationContent,
  "web-development": IllustrationWebDev,
  "ai-automation": IllustrationAutomation,
  "custom-software": IllustrationSoftware,
  analytics: IllustrationAnalytics,
};

/* ─── BACKGROUNDS (REDUCED ~60-70%) ─── */

function BgDots({ id }: { id: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <pattern id={`dots-${id}`} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="14" cy="14" r="0.4" fill="#D4A849" opacity="0.016" />
      </pattern>
      <rect width="100%" height="100%" fill={`url(#dots-${id})`} />
    </svg>
  );
}

function BgGrid({ id }: { id: string }) {
  return (
    <div className="absolute inset-0" style={{
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(212,168,73,0.006) 59px, rgba(212,168,73,0.006) 60px),
        repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(212,168,73,0.006) 59px, rgba(212,168,73,0.006) 60px)`,
    }} />
  );
}

function BgDiagonal({ id }: { id: string }) {
  return (
    <div className="absolute inset-0" style={{
      backgroundImage: `repeating-linear-gradient(45deg, rgba(212,168,73,0.004) 0px, rgba(212,168,73,0.004) 1px, transparent 1px, transparent 32px)`,
    }} />
  );
}

function BgHorizontals() {
  return (
    <div className="absolute inset-0" style={{
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(212,168,73,0.006) 79px, rgba(212,168,73,0.006) 80px)`,
    }} />
  );
}

function BgRadials({ position = "both" }: { position?: "tl" | "br" | "both" | "center" }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {(position === "tl" || position === "both") && (
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.015]"
          style={{ background: "radial-gradient(circle, rgba(212,168,73,0.2), transparent 70%)" }}
        />
      )}
      {(position === "br" || position === "both") && (
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full opacity-[0.012]"
          style={{ background: "radial-gradient(circle, rgba(212,168,73,0.15), transparent 70%)" }}
        />
      )}
      {position === "center" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.01]"
          style={{ background: "radial-gradient(circle, rgba(212,168,73,0.18), transparent 70%)" }}
        />
      )}
    </div>
  );
}

/* ─── SHARED MICRO-COMPONENTS (BOOSTED CONTRAST) ─── */

function GiantNumber({ n, className = "" }: { n: number; className?: string }) {
  return (
    <div className={`font-mono font-semibold text-[clamp(8rem,20vw,14rem)] leading-none select-none pointer-events-none ${className}`}>
      {String(n).padStart(2, "0")}
    </div>
  );
}

function GlassPill({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-accent/35 bg-[#181818] hover:bg-[#1E1E1E] hover:border-accent/60 transition-all duration-300 shadow-sm"
    >
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "inset 0 0 16px rgba(212,168,73,0.08), 0 0 12px rgba(212,168,73,0.04)" }}
      />
      <span className="text-[13px] text-[rgba(255,255,255,0.70)] group-hover:text-white transition-colors duration-300">{children}</span>
      <ArrowLineUpRight size={11} className="text-accent/40 group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function ChipTag({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-accent/35 bg-[#181818] hover:bg-[#1E1E1E] hover:border-accent/55 transition-all duration-300 shadow-sm"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent/80 transition-colors duration-300" />
      <span className="text-[12px] text-[rgba(255,255,255,0.65)] group-hover:text-white transition-colors duration-300">{children}</span>
    </Link>
  );
}

function OutcomeMetric({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
      <span className="text-[11px] text-accent/85 font-mono tracking-wide">{text}</span>
    </div>
  );
}

function SectionLabel({ icon: IconComp, index }: { icon: React.ComponentType<any>; index: number }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-8 h-8 rounded-lg bg-accent/[0.22] flex items-center justify-center ring-1 ring-accent/45">
        <IconComp size={15} className="text-accent" weight="duotone" />
      </div>
      <span className="font-mono text-[10px] text-[rgba(255,255,255,0.70)] tracking-[0.16em] uppercase">Pillar {String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

function CtaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-xs text-accent/70 hover:text-accent transition-colors duration-300 mt-5">
      {children}
      <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function PanelCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative bg-[#181818] border border-accent/30 rounded-[1.5rem] overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      {children}
    </div>
  );
}

/* ─── 9 UNIQUE PILLAR LAYOUTS ─── */

function Pillar1({ pillar, index }: { pillar: PillarData; index: number }) {
  const Icon = (iconMap[pillar.slug] || Binoculars) as React.ComponentType<any>;
  const Illo = (pillarIllustrations[pillar.slug] || IllustrationSERP) as React.ComponentType<any>;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 30%"] });
  const p = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bg = sectionBgs[index];

  const serviceGroups = [
    { label: "Strategy", services: pillar.services.filter(s => ["seo-strategy", "seo-consulting", "seo-auditing"].includes(s.slug)) },
    { label: "Technical", services: pillar.services.filter(s => ["technical-seo", "website-migration-seo", "enterprise-seo", "international-seo"].includes(s.slug)) },
    { label: "Content", services: pillar.services.filter(s => ["keyword-research", "content-strategy", "content-development", "on-page-seo"].includes(s.slug)) },
    { label: "Authority", services: pillar.services.filter(s => ["off-page-seo", "digital-pr-search", "local-seo", "ecommerce-seo"].includes(s.slug)) },
    { label: "Measurement", services: pillar.services.filter(s => ["search-reporting"].includes(s.slug)) },
  ];

  return (
    <motion.section ref={ref} id={`pillar-${pillar.slug}`} className={`relative py-16 sm:py-20 lg:py-52 scroll-mt-24 overflow-hidden ${bg}`}>
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="p1" />
        <BgRadials position="br" />
        <motion.div className="absolute -top-12 right-[8%] text-accent/[0.12]"
          style={{ opacity: p, x: useTransform(p, [0, 1], [40, 0]) }}
        >
          <GiantNumber n={index + 1} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div style={{ opacity: p, y: useTransform(p, [0, 1], [30, 0]) }}>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-10 sm:mb-16">
            <div className="lg:col-span-7">
              <FadeIn><SectionLabel icon={Icon} index={index} /></FadeIn>
              <FadeIn delay={0.05}>
                <h2 className="font-display font-semibold text-[clamp(1.75rem,4vw,3.5rem)] tracking-[-0.025em] leading-[1] text-white mb-5">
                  {pillar.name}
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-[rgba(255,255,255,0.72)] text-[15px] leading-relaxed max-w-[52ch] mb-8">{pillarDescriptions[pillar.slug]}</p>
              </FadeIn>
              <FadeIn delay={0.12}>
                <div className="flex flex-wrap gap-x-8 gap-y-1 mb-6">
                  {(pillarOutcomes[pillar.slug] ?? []).map(t => <OutcomeMetric key={t} text={t} />)}
                </div>
              </FadeIn>
            </div>
            <div className="hidden lg:flex lg:col-span-5 items-center">
              <FadeIn delay={0.1} className="relative w-full">
                <div className="absolute -top-6 -right-6 w-full max-w-[160px]">
                  <PanelCard className="p-4">
                    <span className="text-[9px] font-mono text-[rgba(255,255,255,0.70)] tracking-wider uppercase block mb-1">Domain Authority</span>
                    <span className="font-display text-[32px] font-semibold text-accent leading-none">76</span>
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="text-[9px] text-[#4CAF50] font-mono">+14</span>
                      <span className="text-[8px] text-[rgba(255,255,255,0.55)] font-mono">vs last quarter</span>
                    </div>
                  </PanelCard>
                </div>
                <div className="w-full max-w-[340px] ml-auto mt-16">
                  <Illo />
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7 space-y-6">
              {serviceGroups.filter(g => g.services.length > 0).map(group => (
                <FadeIn key={group.label} delay={0.1}>
                  <div>
                    <span className="text-[10px] font-mono text-[rgba(255,255,255,0.70)] tracking-[0.14em] uppercase mb-2.5 block">{group.label}</span>
                    <motion.div className="flex flex-wrap gap-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                      {group.services.map((svc, i) => (
                        <motion.div key={svc.slug} custom={i} variants={pillReveal}>
                          <GlassPill href={`/${svc.slug}`}>{svc.name}</GlassPill>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </FadeIn>
              ))}
              <FadeIn delay={0.15}><CtaLink href={`/${pillar.slug}`}>Explore all capabilities</CtaLink></FadeIn>
            </div>
            <div className="hidden lg:block lg:col-span-5">
              <FadeIn delay={0.15}>
                <PanelCard className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/70 animate-pulse" />
                    <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase">Search Console Snapshot</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[rgba(255,255,255,0.55)] font-mono">Impressions</span>
                      <span className="text-[11px] text-white font-mono">2.4M</span>
                    </div>
                    <div className="h-px bg-accent/12" />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[rgba(255,255,255,0.55)] font-mono">Clicks</span>
                      <span className="text-[11px] text-white font-mono">187K</span>
                    </div>
                    <div className="h-px bg-accent/12" />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[rgba(255,255,255,0.55)] font-mono">Avg CTR</span>
                      <span className="text-[11px] text-accent font-mono">7.8%</span>
                    </div>
                    <div className="h-px bg-accent/12" />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[rgba(255,255,255,0.55)] font-mono">Avg Position</span>
                      <span className="text-[11px] text-[#4CAF50] font-mono">4.2</span>
                    </div>
                  </div>
                </PanelCard>
              </FadeIn>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Pillar2({ pillar, index }: { pillar: PillarData; index: number }) {
  const Icon = (iconMap[pillar.slug] || Robot) as React.ComponentType<any>;
  const Illo = (pillarIllustrations[pillar.slug] || IllustrationNeural) as React.ComponentType<any>;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 30%"] });
  const p = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bg = sectionBgs[index];

  return (
    <motion.section ref={ref} id={`pillar-${pillar.slug}`} className={`relative py-16 sm:py-20 lg:py-52 scroll-mt-24 overflow-hidden ${bg}`}>
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="p2" />
        <BgRadials position="br" />
        <motion.div className="absolute bottom-0 right-0 text-accent/[0.12] translate-x-8 translate-y-16"
          style={{ opacity: p, scale: useTransform(p, [0, 1], [0.8, 1]) }}
        >
          <GiantNumber n={index + 1} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div className="lg:col-span-5" style={{ opacity: p, x: useTransform(p, [0, 1], [-40, 0]) }}>
            <FadeIn><SectionLabel icon={Icon} index={index} /></FadeIn>
            <FadeIn delay={0.05}>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1] text-white mb-5">{pillar.name}</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-[rgba(255,255,255,0.72)] text-[15px] leading-relaxed max-w-[46ch] mb-8">{pillarDescriptions[pillar.slug]}</p>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="flex flex-col gap-0.5 mb-8">
                {(pillarOutcomes[pillar.slug] ?? []).map(t => <OutcomeMetric key={t} text={t} />)}
              </div>
            </FadeIn>
            <motion.div className="flex flex-wrap gap-2 max-w-sm" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {pillar.services.slice(0, 6).map((svc, i) => (
                <motion.div key={svc.slug} custom={i} variants={pillReveal}>
                  <ChipTag href={`/${svc.slug}`}>{svc.name}</ChipTag>
                </motion.div>
              ))}
            </motion.div>
            <FadeIn delay={0.15}><CtaLink href={`/${pillar.slug}`}>Explore all capabilities</CtaLink></FadeIn>
          </motion.div>

          <motion.div className="lg:col-span-7" style={{ opacity: p, x: useTransform(p, [0, 1], [40, 0]) }}>
            <PanelCard className="p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                <span className="text-[10px] font-mono text-accent/60 tracking-[0.14em] uppercase">AI Visibility Dashboard</span>
              </div>
              <div className="w-full aspect-[16/9] mb-6"><Illo /></div>
              <div className="flex gap-2 flex-wrap">
                {pillar.services.slice(0, 4).map(svc => (
                  <span key={svc.slug} className="text-[10px] font-mono text-accent/50 px-2.5 py-1 rounded-full border border-accent/35 bg-[#1E1E1E]">{svc.name}</span>
                ))}
                {pillar.services.length > 4 && (
                  <span className="text-[10px] font-mono text-[rgba(255,255,255,0.4)] px-2.5 py-1">+{pillar.services.length - 4}</span>
                )}
              </div>
            </PanelCard>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/[0.04] rounded-2xl border border-accent/20 -z-10" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function Pillar3({ pillar, index }: { pillar: PillarData; index: number }) {
  const Icon = (iconMap[pillar.slug] || MegaphoneSimple) as React.ComponentType<any>;
  const Illo = (pillarIllustrations[pillar.slug] || IllustrationPR) as React.ComponentType<any>;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 30%"] });
  const p = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bg = sectionBgs[index];

  return (
    <motion.section ref={ref} id={`pillar-${pillar.slug}`} className={`relative py-16 sm:py-20 lg:py-52 scroll-mt-24 overflow-hidden ${bg}`}>
      <div className="absolute inset-0 pointer-events-none">
        <BgHorizontals />
        <BgRadials position="center" />
        <motion.div className="absolute top-1/2 -translate-y-1/2 left-[10%] text-accent/[0.12]"
          style={{ opacity: p, x: useTransform(p, [0, 1], [-20, 0]) }}
        >
          <GiantNumber n={index + 1} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <motion.div className="lg:col-span-5 lg:col-start-1" style={{ opacity: p, y: useTransform(p, [0, 1], [24, 0]) }}>
            <div className="relative max-w-[280px] mx-auto lg:mx-0">
              <div className="w-full aspect-square"><Illo /></div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181818] backdrop-blur-md border border-accent/35">
                <span className="text-[9px] font-mono text-accent/60 tracking-wider">AUTHORITY SCORE</span>
                <span className="text-[11px] font-mono text-accent font-semibold">87</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="lg:col-span-6 lg:col-start-7" style={{ opacity: p, y: useTransform(p, [0, 1], [24, 0]) }}>
            <FadeIn><SectionLabel icon={Icon} index={index} /></FadeIn>
            <FadeIn delay={0.05}>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1] text-white mb-5">{pillar.name}</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-[rgba(255,255,255,0.72)] text-[15px] leading-relaxed max-w-[46ch] mb-8">{pillarDescriptions[pillar.slug]}</p>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="flex flex-col gap-0.5 mb-8">
                {(pillarOutcomes[pillar.slug] ?? []).map(t => <OutcomeMetric key={t} text={t} />)}
              </div>
            </FadeIn>
            <motion.div className="flex flex-wrap gap-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {pillar.services.map((svc, i) => (
                <motion.div key={svc.slug} custom={i} variants={pillReveal}>
                  <GlassPill href={`/${svc.slug}`}>{svc.name}</GlassPill>
                </motion.div>
              ))}
            </motion.div>
            <FadeIn delay={0.15}><CtaLink href={`/${pillar.slug}`}>Explore all capabilities</CtaLink></FadeIn>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function Pillar4({ pillar, index }: { pillar: PillarData; index: number }) {
  const Icon = (iconMap[pillar.slug] || Lightning) as React.ComponentType<any>;
  const Illo = (pillarIllustrations[pillar.slug] || IllustrationPaid) as React.ComponentType<any>;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 30%"] });
  const p = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bg = sectionBgs[index];

  return (
    <motion.section ref={ref} id={`pillar-${pillar.slug}`} className={`relative py-16 sm:py-20 lg:py-52 scroll-mt-24 overflow-hidden ${bg}`}>
      <div className="absolute inset-0 pointer-events-none">
        <BgDiagonal id="p4" />
        <BgRadials position="br" />
        <motion.div className="absolute top-12 right-0 text-accent/[0.12] translate-x-12"
          style={{ opacity: p, x: useTransform(p, [0, 1], [60, 0]) }}
        >
          <GiantNumber n={index + 1} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div style={{ opacity: p, y: useTransform(p, [0, 1], [30, 0]) }}>
          <div className="mb-10 sm:mb-16 lg:mb-20">
            <FadeIn><SectionLabel icon={Icon} index={index} /></FadeIn>
            <FadeIn delay={0.05}>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,4vw,3.5rem)] tracking-[-0.025em] leading-[1] text-white mb-5">{pillar.name}</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-[rgba(255,255,255,0.72)] text-[15px] leading-relaxed max-w-[52ch]">{pillarDescriptions[pillar.slug]}</p>
            </FadeIn>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8">
              <FadeIn delay={0.15}>
                <div className="grid grid-cols-3 gap-px bg-accent/15 rounded-2xl overflow-hidden mb-8">
                  {(pillarOutcomes[pillar.slug] ?? []).map(t => (
                    <div key={t} className="bg-[#1E1E1E] px-5 py-4 text-center">
                      <span className="text-[11px] font-mono text-accent/70 tracking-wider">{t}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
              <motion.div className="flex flex-wrap gap-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {pillar.services.map((svc, i) => (
                  <motion.div key={svc.slug} custom={i} variants={pillReveal}>
                    <GlassPill href={`/${svc.slug}`}>{svc.name}</GlassPill>
                  </motion.div>
                ))}
              </motion.div>
              <FadeIn delay={0.2}><CtaLink href={`/${pillar.slug}`}>Explore all capabilities</CtaLink></FadeIn>
            </div>
            <div className="hidden lg:block lg:col-span-4">
              <FadeIn delay={0.2} className="relative">
                <div className="w-full aspect-[3/4] max-w-[300px] ml-auto"><Illo /></div>
                <div className="absolute top-4 -left-4 flex flex-col gap-1.5 items-end">
                  <span className="px-2.5 py-1 rounded-full bg-accent/15 border border-accent/35 text-[9px] font-mono text-accent/70 tracking-wider">ROAS</span>
                  <span className="text-[28px] font-display font-semibold text-accent/50 leading-none">4.2x</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Pillar5({ pillar, index }: { pillar: PillarData; index: number }) {
  const Icon = (iconMap[pillar.slug] || PencilCircle) as React.ComponentType<any>;
  const Illo = (pillarIllustrations[pillar.slug] || IllustrationContent) as React.ComponentType<any>;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 30%"] });
  const p = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bg = sectionBgs[index];

  return (
    <motion.section ref={ref} id={`pillar-${pillar.slug}`} className={`relative py-16 sm:py-20 lg:py-52 scroll-mt-24 overflow-hidden ${bg}`}>
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="p5" />
        <BgRadials position="tl" />
        <motion.div className="absolute -top-6 -left-8 text-accent/[0.12]"
          style={{ opacity: p, scale: useTransform(p, [0, 1], [0.85, 1]) }}
        >
          <GiantNumber n={index + 1} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div style={{ opacity: p, y: useTransform(p, [0, 1], [24, 0]) }}>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 lg:col-start-2">
              <FadeIn><SectionLabel icon={Icon} index={index} /></FadeIn>
              <FadeIn delay={0.05}>
                <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1] text-white mb-5">{pillar.name}</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-[rgba(255,255,255,0.72)] text-[15px] leading-relaxed max-w-[46ch] mb-8">{pillarDescriptions[pillar.slug]}</p>
              </FadeIn>
              <FadeIn delay={0.12}>
                <div className="flex flex-col gap-0.5 mb-8">
                  {(pillarOutcomes[pillar.slug] ?? []).map(t => <OutcomeMetric key={t} text={t} />)}
                </div>
              </FadeIn>
              <motion.div className="flex flex-wrap gap-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {pillar.services.map((svc, i) => (
                  <motion.div key={svc.slug} custom={i} variants={pillReveal}>
                    <ChipTag href={`/${svc.slug}`}>{svc.name}</ChipTag>
                  </motion.div>
                ))}
              </motion.div>
              <FadeIn delay={0.15}><CtaLink href={`/${pillar.slug}`}>Explore all capabilities</CtaLink></FadeIn>
            </div>

            <div className="lg:col-span-5">
              <FadeIn delay={0.15}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 bg-[#181818] border border-accent/30 rounded-2xl p-4 aspect-[2/1] overflow-hidden">
                    <div className="w-full h-full"><Illo /></div>
                  </div>
                  <div className="bg-[#181818] border border-accent/35 rounded-xl p-3 flex flex-col items-center justify-center">
                    <span className="text-[clamp(2rem,3vw,2.5rem)] font-display font-semibold text-accent/40 leading-none">11</span>
                    <span className="text-[9px] font-mono text-[rgba(255,255,255,0.70)] mt-1 tracking-wider">SERVICES</span>
                  </div>
                  <div className="bg-[#181818] border border-accent/35 rounded-xl p-3 flex flex-col items-center justify-center">
                    <span className="text-[clamp(2rem,3vw,2.5rem)] font-display font-semibold text-accent/40 leading-none">5</span>
                    <span className="text-[9px] font-mono text-[rgba(255,255,255,0.70)] mt-1 tracking-wider">PLATFORMS</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Pillar6({ pillar, index }: { pillar: PillarData; index: number }) {
  const Icon = (iconMap[pillar.slug] || Code) as React.ComponentType<any>;
  const Illo = (pillarIllustrations[pillar.slug] || IllustrationWebDev) as React.ComponentType<any>;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 30%"] });
  const p = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bg = sectionBgs[index];

  return (
    <motion.section ref={ref} id={`pillar-${pillar.slug}`} className={`relative py-16 sm:py-20 lg:py-52 scroll-mt-24 overflow-hidden ${bg}`}>
      <div className="absolute inset-0 pointer-events-none">
        <BgDots id="p6" />
        <BgRadials position="br" />
        <motion.div className="absolute -top-4 right-[5%] text-accent/[0.12]"
          style={{ opacity: p, y: useTransform(p, [0, 1], [-20, 0]) }}
        >
          <GiantNumber n={index + 1} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div style={{ opacity: p, y: useTransform(p, [0, 1], [30, 0]) }}>
          <div className="mb-12">
            <FadeIn><SectionLabel icon={Icon} index={index} /></FadeIn>
            <FadeIn delay={0.05}>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,4vw,3.5rem)] tracking-[-0.025em] leading-[1] text-white mb-3">{pillar.name}</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-[rgba(255,255,255,0.72)] text-[15px] leading-relaxed max-w-[52ch]">{pillarDescriptions[pillar.slug]}</p>
            </FadeIn>
          </div>

          <FadeIn delay={0.12}>
            <PanelCard>
              <div className="flex items-center gap-2 px-5 py-3 border-b border-accent/35 bg-[#1E1E1E]">
                <span className="w-2.5 h-2.5 rounded-full bg-accent/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-accent/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-accent/15" />
                <span className="ml-4 text-[10px] font-mono text-accent/40 tracking-wider">https://your-brand.com</span>
              </div>
              <div className="p-6 lg:p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <div className="flex flex-col gap-0.5 mb-6">
                      {(pillarOutcomes[pillar.slug] ?? []).map(t => <OutcomeMetric key={t} text={t} />)}
                    </div>
                    <motion.div className="flex flex-wrap gap-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                      {pillar.services.map((svc, i) => (
                        <motion.div key={svc.slug} custom={i} variants={pillReveal}>
                          <GlassPill href={`/${svc.slug}`}>{svc.name}</GlassPill>
                        </motion.div>
                      ))}
                    </motion.div>
                    <CtaLink href={`/${pillar.slug}`}>Explore all capabilities</CtaLink>
                  </div>
                  <div className="hidden lg:block">
                    <div className="w-full aspect-[4/3]"><Illo /></div>
                  </div>
                </div>
              </div>
            </PanelCard>
          </FadeIn>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Pillar7({ pillar, index }: { pillar: PillarData; index: number }) {
  const Icon = (iconMap[pillar.slug] || Gear) as React.ComponentType<any>;
  const Illo = (pillarIllustrations[pillar.slug] || IllustrationAutomation) as React.ComponentType<any>;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 30%"] });
  const p = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bg = sectionBgs[index];

  return (
    <motion.section ref={ref} id={`pillar-${pillar.slug}`} className={`relative py-16 sm:py-20 lg:py-52 scroll-mt-24 overflow-hidden ${bg}`}>
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="p7" />
        <BgRadials position="center" />
        <motion.div className="absolute -bottom-20 left-[5%] text-accent/[0.12]"
          style={{ opacity: p, x: useTransform(p, [0, 1], [-40, 0]) }}
        >
          <GiantNumber n={index + 1} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div className="lg:col-span-6" style={{ opacity: p, x: useTransform(p, [0, 1], [-30, 0]) }}>
            <FadeIn><SectionLabel icon={Icon} index={index} /></FadeIn>
            <FadeIn delay={0.05}>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1] text-white mb-5">{pillar.name}</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-[rgba(255,255,255,0.72)] text-[15px] leading-relaxed max-w-[48ch] mb-8">{pillarDescriptions[pillar.slug]}</p>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="flex flex-col gap-0.5 mb-8">
                {(pillarOutcomes[pillar.slug] ?? []).map(t => <OutcomeMetric key={t} text={t} />)}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <CtaLink href={`/${pillar.slug}`}>Explore all capabilities</CtaLink>
            </FadeIn>
          </motion.div>

          <motion.div className="lg:col-span-6" style={{ opacity: p, x: useTransform(p, [0, 1], [30, 0]) }}>
            <FadeIn delay={0.1}>
              <div className="relative">
                <div className="w-full aspect-[4/3] mb-6 max-w-[400px] ml-auto"><Illo /></div>
                <div className="absolute left-0 top-1/4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181818] backdrop-blur-md border border-accent/35">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/70 animate-pulse" />
                  <span className="text-[9px] font-mono text-accent/60 tracking-wider">AI ACTIVE</span>
                </div>
                <motion.div className="flex flex-wrap gap-2 mt-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  {pillar.services.map((svc, i) => (
                    <motion.div key={svc.slug} custom={i} variants={pillReveal}>
                      <ChipTag href={`/${svc.slug}`}>{svc.name}</ChipTag>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </FadeIn>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function Pillar8({ pillar, index }: { pillar: PillarData; index: number }) {
  const Icon = (iconMap[pillar.slug] || Stack) as React.ComponentType<any>;
  const Illo = (pillarIllustrations[pillar.slug] || IllustrationSoftware) as React.ComponentType<any>;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 30%"] });
  const p = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bg = sectionBgs[index];

  return (
    <motion.section ref={ref} id={`pillar-${pillar.slug}`} className={`relative py-16 sm:py-20 lg:py-52 scroll-mt-24 overflow-hidden ${bg}`}>
      <div className="absolute inset-0 pointer-events-none">
        <BgDiagonal id="p8" />
        <BgRadials position="tl" />
        <motion.div className="absolute top-1/3 right-[8%] text-accent/[0.12]"
          style={{ opacity: p, x: useTransform(p, [0, 1], [30, 0]) }}
        >
          <GiantNumber n={index + 1} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div style={{ opacity: p, y: useTransform(p, [0, 1], [30, 0]) }}>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6">
              <FadeIn><SectionLabel icon={Icon} index={index} /></FadeIn>
              <FadeIn delay={0.05}>
                <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1] text-white mb-5">{pillar.name}</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-[rgba(255,255,255,0.72)] text-[15px] leading-relaxed max-w-[48ch] mb-8">{pillarDescriptions[pillar.slug]}</p>
              </FadeIn>
              <FadeIn delay={0.12}>
                <div className="flex flex-col gap-0.5 mb-8">
                  {(pillarOutcomes[pillar.slug] ?? []).map(t => <OutcomeMetric key={t} text={t} />)}
                </div>
              </FadeIn>
              <motion.div className="flex flex-wrap gap-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {pillar.services.map((svc, i) => (
                  <motion.div key={svc.slug} custom={i} variants={pillReveal}>
                    <GlassPill href={`/${svc.slug}`}>{svc.name}</GlassPill>
                  </motion.div>
                ))}
              </motion.div>
              <FadeIn delay={0.15}><CtaLink href={`/${pillar.slug}`}>Explore all capabilities</CtaLink></FadeIn>
            </div>

            <div className="lg:col-span-6">
              <FadeIn delay={0.1}>
                <div className="relative">
                  <div className="absolute -bottom-3 -right-3 w-[90%] h-[90%] bg-[#1E1E1E] rounded-2xl border border-accent/20 -z-10" />
                  <div className="absolute -bottom-6 -right-6 w-[80%] h-[80%] bg-[#181818] rounded-2xl border border-accent/12 -z-20" />
                  <PanelCard className="p-6 lg:p-8">
                    <div className="w-full aspect-[4/3]"><Illo /></div>
                  </PanelCard>
                </div>
              </FadeIn>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Pillar9({ pillar, index }: { pillar: PillarData; index: number }) {
  const Icon = (iconMap[pillar.slug] || ChartBar) as React.ComponentType<any>;
  const Illo = (pillarIllustrations[pillar.slug] || IllustrationAnalytics) as React.ComponentType<any>;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 30%"] });
  const p = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bg = sectionBgs[index];

  return (
    <motion.section ref={ref} id={`pillar-${pillar.slug}`} className={`relative py-16 sm:py-20 lg:py-52 scroll-mt-24 overflow-hidden ${bg}`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(212,168,73,0.005) 79px, rgba(212,168,73,0.005) 80px)`,
        }} />
        <BgRadials position="br" />
        <motion.div className="absolute -bottom-10 right-[5%] text-accent/[0.12]"
          style={{ opacity: p, scale: useTransform(p, [0, 1], [0.7, 1]) }}
        >
          <GiantNumber n={index + 1} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div style={{ opacity: p, y: useTransform(p, [0, 1], [30, 0]) }}>
          <div className="flex items-start justify-between gap-8 mb-12 flex-wrap">
            <div className="max-w-[52ch]">
              <FadeIn><SectionLabel icon={Icon} index={index} /></FadeIn>
              <FadeIn delay={0.05}>
                <h2 className="font-display font-semibold text-[clamp(1.75rem,4vw,3.5rem)] tracking-[-0.025em] leading-[1] text-white mb-5">{pillar.name}</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-[rgba(255,255,255,0.72)] text-[15px] leading-relaxed">{pillarDescriptions[pillar.slug]}</p>
              </FadeIn>
            </div>
            <FadeIn delay={0.05} className="hidden lg:flex gap-6">
              {(pillarOutcomes[pillar.slug] ?? []).map(t => (
                <div key={t} className="flex flex-col items-center gap-1.5">
                  <span className="text-[9px] font-mono text-[rgba(255,255,255,0.70)] tracking-[0.14em] uppercase">{t.split(" ")[0]}</span>
                  <span className="text-[22px] font-display font-semibold text-accent/45 leading-none">{t.split(" ").slice(1).join(" ")}</span>
                </div>
              ))}
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <PanelCard className="mb-8">
              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                  <span className="text-[10px] font-mono text-accent/60 tracking-[0.14em] uppercase">Performance Overview</span>
                </div>
                <div className="w-full aspect-[16/7]"><Illo /></div>
              </div>
            </PanelCard>
          </FadeIn>

          <motion.div className="flex flex-wrap gap-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {pillar.services.map((svc, i) => (
              <motion.div key={svc.slug} custom={i} variants={pillReveal}>
                <GlassPill href={`/${svc.slug}`}>{svc.name}</GlassPill>
              </motion.div>
            ))}
          </motion.div>
          <FadeIn delay={0.15}><CtaLink href={`/${pillar.slug}`}>Explore all capabilities</CtaLink></FadeIn>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ─── System constellation ─── */
function SystemConstellation() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-32 overflow-hidden bg-[#0D0D0C]">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="constellation" />
        <BgRadials position="center" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-10 sm:mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">The Growth System</span>
          <h2 className="font-display font-semibold text-[clamp(1.8rem,3vw,2.8rem)] tracking-[-0.02em] leading-[1.05] text-white">
            Nine pillars,<br /><span className="text-accent">one interconnected engine.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 lg:grid-cols-9 gap-3 relative">
          {pillarData.map((pillar, i) => {
            const Icon = (iconMap[pillar.slug] || Code) as React.ComponentType<any>;
            return (
              <motion.a
                key={pillar.slug}
                href={`#pillar-${pillar.slug}`}
                className="group relative z-10 flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#181818] border border-accent/35 hover:bg-[#1E1E1E] hover:border-accent/40 transition-all duration-500"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              >
                {Icon && (
                  <div className="w-10 h-10 rounded-lg bg-accent/[0.18] flex items-center justify-center group-hover:bg-accent/25 ring-1 ring-accent/30 group-hover:ring-accent/45 transition-all duration-500">
                    <Icon size={17} className="text-accent/80 group-hover:text-accent transition-colors duration-500" weight="duotone" />
                  </div>
                )}
                <span className="text-[9px] font-medium text-[rgba(255,255,255,0.70)] group-hover:text-[rgba(255,255,255,0.8)] text-center leading-tight transition-colors duration-500">{pillar.name}</span>
                <span className="font-mono text-[8px] text-accent/60 group-hover:text-accent/80 transition-colors duration-500">{String(pillar.services.length).padStart(2, "0")}</span>
              </motion.a>
            );
          })}
        </div>

        <motion.p className="text-center text-[11px] text-accent/50 mt-10 font-mono tracking-wider" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {pillarData.reduce((a, p) => a + p.services.length, 0)} services across 9 pillars
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Amber CTA ─── */
function AmberCTA() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-36 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 pointer-events-none">
        <BgDiagonal id="cta" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,168,73,0.03), transparent)" }} />
      </div>
      <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
        <motion.h2 className="font-display font-semibold text-[clamp(1.8rem,3vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Not sure where to start?
        </motion.h2>
        <motion.p className="text-[rgba(255,255,255,0.72)] text-[15px] leading-relaxed mb-10 max-w-[42ch] mx-auto" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Book a free discovery call. We&rsquo;ll map out the right services for your goals — no pitch, just a plan.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Link href="/contact" className="group relative inline-flex items-center gap-2.5 bg-accent text-ground px-7 py-3.5 rounded-full font-semibold text-sm active:scale-[0.98] transition-all duration-200">
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: "0 0 40px rgba(212,168,73,0.5), 0 0 80px rgba(212,168,73,0.25)" }}
            />
            <span className="relative">Book a discovery call</span>
            <ArrowRight size={14} weight="bold" className="relative transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── MOBILE PILLAR ACCORDION ─── */

function MobilePillarAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [expandedChips, setExpandedChips] = useState<Set<string>>(new Set());

  const togglePillar = (slug: string) => {
    setOpenId(openId === slug ? null : slug);
    setExpandedChips(new Set());
  };

  const showAllChips = (slug: string) => {
    setExpandedChips(prev => new Set([...prev, slug]));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:hidden">
      {pillarData.map((pillar, i) => {
        const Icon = (iconMap[pillar.slug] || Binoculars) as React.ComponentType<any>;
        const Illo = (pillarIllustrations[pillar.slug] || IllustrationSERP) as React.ComponentType<any>;
        const isOpen = openId === pillar.slug;
        const outcomes = pillarOutcomes[pillar.slug] ?? [];
        const visibleChips = expandedChips.has(pillar.slug) ? pillar.services : pillar.services.slice(0, 6);
        const remaining = pillar.services.length - 6;

        return (
          <div key={pillar.slug} className="border-b border-accent/10 last:border-b-0">
            <button
              onClick={() => togglePillar(pillar.slug)}
              className="w-full flex items-center gap-3 py-4 text-left"
              style={{ minHeight: 56 }}
            >
              <div className="w-9 h-9 rounded-lg bg-accent/[0.18] flex items-center justify-center shrink-0 ring-1 ring-accent/30">
                <Icon size={15} className="text-accent" weight="duotone" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-mono text-[9px] text-accent/60 tracking-[0.16em] uppercase block">
                  Pillar {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-sm font-medium text-white block truncate">
                  {pillar.name}
                </span>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-accent/50 shrink-0"
                style={{ fontSize: 14 }}
              >
                &#709;
              </motion.span>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-6 space-y-4">
                <p className="text-[13px] text-[rgba(255,255,255,0.72)] leading-relaxed">
                  {pillarDescriptions[pillar.slug]}
                </p>

                {outcomes.length > 0 && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {outcomes.map(t => (
                      <div key={t} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-accent/70" />
                        <span className="text-[10px] text-accent/85 font-mono tracking-wide">{t}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-[#181818] border border-accent/25 rounded-xl p-4">
                  <div className="w-full aspect-[16/9]">
                    <Illo />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {visibleChips.map(svc => (
                    <Link
                      key={svc.slug}
                      href={`/${svc.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-accent/30 bg-[#181818] text-[11px] text-[rgba(255,255,255,0.65)] hover:text-white transition-colors"
                      style={{ minHeight: 44 }}
                    >
                      {svc.name}
                    </Link>
                  ))}
                  {remaining > 0 && !expandedChips.has(pillar.slug) && (
                    <button
                      onClick={(e) => { e.stopPropagation(); showAllChips(pillar.slug); }}
                      className="inline-flex items-center px-3 text-[11px] text-accent/60 hover:text-accent transition-colors"
                      style={{ minHeight: 44 }}
                    >
                      +{remaining} More
                    </button>
                  )}
                </div>

                <Link
                  href={`/${pillar.slug}`}
                  className="group inline-flex items-center gap-1.5 text-xs text-accent/70 hover:text-accent transition-colors"
                >
                  Explore all capabilities
                  <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── MAIN EXPORT ─── */
export function ServicesContent() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const layouts = [Pillar1, Pillar2, Pillar3, Pillar4, Pillar5, Pillar6, Pillar7, Pillar8, Pillar9];

  return (
    <>
      <motion.section ref={heroRef} className="relative pt-36 pb-20 lg:pb-28 bg-ground overflow-hidden" style={{ opacity: heroOpacity }}>
        <div className="absolute inset-0">
          <ShapeGrid speed={0.15} squareSize={36} direction="diagonal" borderColor="#D4A849" hoverFillColor="#D4A849" shape="square" hoverTrailAmount={3} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ground/90 pointer-events-none" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 right-[10%] text-[clamp(8rem,18vw,16rem)] font-mono font-semibold text-text-primary/[0.015] leading-none select-none">09</div>
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.015]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.3), transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/15" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <motion.span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[rgba(255,255,255,0.70)] mb-5 block" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
                Services
              </motion.span>
              <motion.h1 className="font-display font-semibold text-[clamp(2.8rem,5.5vw,5rem)] tracking-[-0.035em] leading-[0.92] text-white" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
                Everything you need<br />to <span className="text-accent relative">grow<span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-accent/30 rounded-full" /></span> digitally.
              </motion.h1>
              <motion.p className="text-[rgba(255,255,255,0.72)] leading-relaxed max-w-[52ch] mt-5 text-sm lg:text-base" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }}>
                Nine interconnected service pillars covering search, AI, software, media, and data — working together as one growth system.
              </motion.p>
            </div>

            <motion.div className="lg:col-span-4 flex justify-end" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease }}>
              <div className="hidden lg:flex flex-col items-end gap-3">
                <div className="flex items-center gap-3"><span className="w-10 h-px bg-accent/40" /><span className="font-mono text-xs text-accent/80">9 pillars</span></div>
                <div className="flex items-center gap-3"><span className="w-10 h-px bg-accent/40" /><span className="font-mono text-xs text-accent/80">{pillarData.reduce((a, p) => a + p.services.length, 0)} services</span></div>
                <div className="flex items-center gap-3"><span className="w-10 h-px bg-accent/40" /><span className="font-mono text-xs text-accent/80">1 growth system</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="h-px w-full bg-accent/15" />

      <SystemConstellation />

      <div className="h-px w-full bg-accent/15" />

      {isMobile ? (
        <MobilePillarAccordion />
      ) : (
        pillarData.map((pillar, i) => {
          const Layout = layouts[i];
          return <Layout key={pillar.slug} pillar={pillar} index={i} />;
        })
      )}

      <AmberCTA />
    </>
  );
}
