"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedSection from "@/components/RelatedSection";
import { getBreadcrumbs } from "@/data/relations";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Target, Binoculars, Robot, Gear, Code, Rocket, Globe, MapPin,
  ChartLineUp, Lightning, ChartBar, FolderOpen, Handshake,
  ArrowRight, ArrowLineUpRight, SealCheck,
  Mouse, ArrowsDownUp, CaretRight, CaretDown, Heartbeat, Scales, Wrench,
  Sun, Building, GraduationCap, Storefront, CurrencyCircleDollar,
  MagnifyingGlass, Graph, CurrencyDollar,
} from "@phosphor-icons/react";
import { solutions as solutionData } from "@/data/solutions";
import type { SolutionItem } from "@/data/solutions";
import ShapeGrid from "@/components/ShapeGrid";

const iconMap: Record<string, React.ElementType> = {
  Target, Binoculars, Robot, Gear, Code, Rocket, Globe, MapPin,
  ChartLineUp, Lightning, ChartBar, FolderOpen, Handshake,
};

const categoryMap = [
  { label: "All Solutions", filter: [] as string[] },
  { label: "Growth", filter: ["generate-more-qualified-leads", "improve-conversion-rates"] },
  { label: "Visibility", filter: ["improve-search-visibility", "become-visible-in-ai-search"] },
  { label: "Local", filter: ["improve-local-visibility", "grow-multi-location-business"] },
  { label: "Automation", filter: ["reduce-manual-work-automation"] },
  { label: "Software", filter: ["build-custom-crm", "launch-digital-product"] },
  { label: "Web", filter: ["modernise-existing-website"] },
  { label: "Analytics", filter: ["connect-marketing-sales-data"] },
  { label: "Brand", filter: ["improve-online-reputation"] },
  { label: "Portals", filter: ["build-client-portal"] },
];

const industryData = [
  { name: "Healthcare", icon: Heartbeat, slug: "healthcare", challenges: "HIPAA compliance, patient acquisition, local visibility", solutions: "Local SEO, reputation management, content strategy" },
  { name: "Legal", icon: Scales, slug: "legal", challenges: "High competition, authority building, trust signals", solutions: "Digital PR, content marketing, SEO strategy" },
  { name: "Construction", icon: Wrench, slug: "construction", challenges: "Local dominance, project pipeline, review management", solutions: "Local SEO, paid media, CRM automation" },
  { name: "Fitness", icon: Sun, slug: "fitness", challenges: "Member retention, local competition, seasonal demand", solutions: "Social content, email automation, paid social" },
  { name: "Real Estate", icon: Building, slug: "real-estate", challenges: "Listing visibility, lead qualification, multi-location", solutions: "Website platform, CRM, local SEO" },
  { name: "SaaS", icon: Code, slug: "saas", challenges: "Product-led growth, trial conversion, churn reduction", solutions: "Analytics, automation, product development" },
  { name: "E-commerce", icon: Storefront, slug: "ecommerce", challenges: "Cart abandonment, product discovery, ROAS", solutions: "Paid media, CRO, email automation" },
  { name: "Education", icon: GraduationCap, slug: "education", challenges: "Enrollment pipeline, program visibility, reputation", solutions: "Content marketing, SEO, CRM systems" },
  { name: "Finance", icon: CurrencyCircleDollar, slug: "finance", challenges: "Trust authority, compliance, lead quality", solutions: "Digital PR, analytics, automation" },
  { name: "Hospitality", icon: Globe, slug: "hospitality", challenges: "Review volume, booking conversion, local pack", solutions: "Reputation management, local SEO, website" },
];

const processSteps = [
  { step: "01", title: "Discover", desc: "We dive deep into your business, goals, and challenges to map every opportunity.", icon: MagnifyingGlass },
  { step: "02", title: "Strategy", desc: "We design a connected growth system tailored to your market, audience, and objectives.", icon: Graph },
  { step: "03", title: "Execution", desc: "We build, launch, and optimise every component of your solution.", icon: Lightning },
  { step: "04", title: "Optimise", desc: "We analyse performance data and continuously refine for maximum impact.", icon: ArrowsDownUp },
  { step: "05", title: "Scale", desc: "We institutionalise what works and expand across channels, locations, and teams.", icon: Rocket },
];

const featuredSolutions = [
  solutionData.find(s => s.slug === "generate-more-qualified-leads"),
  solutionData.find(s => s.slug === "improve-search-visibility"),
  solutionData.find(s => s.slug === "reduce-manual-work-automation"),
  solutionData.find(s => s.slug === "launch-digital-product"),
  solutionData.find(s => s.slug === "improve-online-reputation"),
].filter(Boolean) as SolutionItem[];

const problemCards = [
  { title: "Generate More Leads", icon: Target, slug: "generate-more-qualified-leads", color: "#D4A849" },
  { title: "Increase Search Visibility", icon: Binoculars, slug: "improve-search-visibility", color: "#D4A849" },
  { title: "Automate Operations", icon: Gear, slug: "reduce-manual-work-automation", color: "#D4A849" },
  { title: "Build Software", icon: Code, slug: "build-custom-crm", color: "#D4A849" },
  { title: "Improve Reputation", icon: Handshake, slug: "improve-online-reputation", color: "#D4A849" },
  { title: "Launch a Product", icon: Rocket, slug: "launch-digital-product", color: "#D4A849" },
  { title: "Improve Conversions", icon: ChartLineUp, slug: "improve-conversion-rates", color: "#D4A849" },
  { title: "Grow Multiple Locations", icon: MapPin, slug: "grow-multi-location-business", color: "#D4A849" },
  { title: "Modernise a Website", icon: Lightning, slug: "modernise-existing-website", color: "#D4A849" },
  { title: "Connect Data", icon: ChartBar, slug: "connect-marketing-sales-data", color: "#D4A849" },
];

const insightsData = [
  { title: "How AI Is Reshaping Search & What It Means for Your Business", tag: "AI Search", readTime: "8 min", excerpt: "Discover how generative AI is fundamentally changing search behaviour and what brands need to do today to remain visible." },
  { title: "The ROI of Connected Growth vs. Point Solutions", tag: "Strategy", readTime: "6 min", excerpt: "Why siloed marketing services underperform compared to a unified growth system — and the data that proves it." },
  { title: "Why Your Current CRM Might Be Costing You More Than You Think", tag: "Software", readTime: "5 min", excerpt: "The hidden costs of off-the-shelf CRMs and how custom systems pay for themselves in productivity gains." },
  { title: "From Invisible to Dominant: A 90-Day SEO Roadmap", tag: "SEO", readTime: "7 min", excerpt: "A proven framework for taking a website from page 10 to page 1 in three months — without shortcuts." },
];

const ease = [0.32, 0.72, 0, 1] as const;

/* ─── SHARED COMPONENTS ─── */

function GiantNumber({ n, className = "" }: { n: number; className?: string }) {
  return <div className={`font-mono font-semibold text-[clamp(8rem,20vw,14rem)] leading-none select-none pointer-events-none ${className}`}>{String(n).padStart(2, "0")}</div>;
}

function PanelCard({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`relative bg-[#181818] border border-accent/30 rounded-[1.5rem] overflow-hidden ${className}`} style={style}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      {children}
    </div>
  );
}

function GlassPill({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link href={href} className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-accent/35 bg-[#181818] hover:bg-[#1E1E1E] hover:border-accent/60 transition-all duration-300 shadow-sm">
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "inset 0 0 16px rgba(212,168,73,0.08), 0 0 12px rgba(212,168,73,0.04)" }} />
      <span className="text-[13px] text-[rgba(255,255,255,0.70)] group-hover:text-white transition-colors duration-300">{children}</span>
      <ArrowLineUpRight size={11} className="text-accent/40 group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease }}>
      {children}
    </motion.div>
  );
}

function BgGrid({ id }: { id: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id={`grid-${id}`} x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
    </svg>
  );
}

function BgRadials({ position }: { position: "tl" | "br" | "tr" | "bl" | "center" }) {
  const posMap: Record<string, string> = {
    tl: "top-0 left-0", br: "bottom-0 right-0", tr: "top-0 right-0", bl: "bottom-0 left-0", center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  };
  const translate: Record<string, string> = {
    tl: "translate(-30%, -30%)", br: "translate(30%, 30%)", tr: "translate(30%, -30%)", bl: "translate(-30%, 30%)", center: ""
  };
  const pos = position === "center" ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : posMap[position];
  return (
    <div className={`absolute ${pos} w-[600px] h-[600px] pointer-events-none opacity-[0.12]`}
      style={{ background: "radial-gradient(ellipse at center, rgba(212,168,73,0.4) 0%, transparent 70%)", transform: translate[position] }}
    />
  );
}

function BgDiagonal({ id }: { id: string }) {
  return (
    <div className="absolute inset-0" style={{
      backgroundImage: `repeating-linear-gradient(45deg, rgba(212,168,73,0.004) 0px, rgba(212,168,73,0.004) 1px, transparent 1px, transparent 32px)`,
    }} />
  );
}

function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const step = Math.ceil(target / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setDisplay(target);
              clearInterval(timer);
            } else {
              setDisplay(start);
            }
          }, 16);
          observer.disconnect();
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="tabular-nums">{prefix}{display}{suffix}</span>;
}

/* ─── ILLUSTRATIONS ─── */

function IntroIllo() {
  return (
    <svg viewBox="0 0 400 320" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="intrograd" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#D4A849" stopOpacity="0.08" /><stop offset="100%" stopColor="#D4A849" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="200" cy="160" r="150" fill="url(#intrograd)" />
      <circle cx="200" cy="160" r="90" stroke="#D4A849" strokeWidth="0.5" opacity="0.15" strokeDasharray="4 6" />
      <circle cx="200" cy="160" r="60" stroke="#D4A849" strokeWidth="0.8" opacity="0.25" />
      <circle cx="200" cy="160" r="60" fill="#D4A849" fillOpacity="0.04" />
      <circle cx="200" cy="160" r="4" fill="#D4A849" opacity="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const r = 70 + Math.sin(i * 1.5) * 15;
        const x = 200 + r * Math.cos((angle * Math.PI) / 180);
        const y = 160 + r * Math.sin((angle * Math.PI) / 180);
        return <circle key={angle} cx={x} cy={y} r="2" fill="#D4A849" opacity={0.3 + i * 0.06} />;
      })}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <rect key={angle} x={195 + 130 * Math.cos((angle * Math.PI) / 180)} y={155 + 130 * Math.sin((angle * Math.PI) / 180)} width="10" height="10" rx="2" stroke="#D4A849" strokeWidth="0.5" opacity={0.25 + i * 0.05} fill="#D4A849" fillOpacity="0.03" />
      ))}
    </svg>
  );
}

function ExplorerIllo({ type }: { type: string }) {
  const opacity = 0.4;
  const isActive = (t: string) => type === t ? 0.8 : opacity;
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      {type === "growth" && (
        <>
          <rect x="20" y="20" width="160" height="100" rx="10" stroke="#D4A849" strokeWidth="0.5" opacity={isActive("growth")} fill="#D4A849" fillOpacity="0.04" />
          <path d="M40 90 L60 70 L80 80 L100 50 L120 60 L140 30 L160 40" stroke="#D4A849" strokeWidth="1.2" opacity={isActive("growth")} fill="none" />
          <circle cx="140" cy="32" r="3" fill="#D4A849" opacity={isActive("growth")} />
          <text x="45" y="115" fill="#D4A849" opacity={isActive("growth")} fontSize="8" fontFamily="monospace">+312% growth</text>
        </>
      )}
      {type === "visibility" && (
        <>
          <rect x="20" y="20" width="160" height="100" rx="10" stroke="#D4A849" strokeWidth="0.5" opacity={isActive("visibility")} fill="#D4A849" fillOpacity="0.04" />
          <rect x="30" y="32" width="140" height="8" rx="4" stroke="#D4A849" strokeWidth="0.3" opacity={isActive("visibility") * 0.5} fill="#D4A849" fillOpacity={isActive("visibility") * 0.08} />
          <rect x="30" y="44" width="100" height="6" rx="3" stroke="#D4A849" strokeWidth="0.3" opacity={isActive("visibility") * 0.3} fill="#D4A849" fillOpacity={isActive("visibility") * 0.05} />
          <rect x="30" y="54" width="120" height="6" rx="3" stroke="#D4A849" strokeWidth="0.3" opacity={isActive("visibility") * 0.25} fill="#D4A849" fillOpacity={isActive("visibility") * 0.04} />
          <text x="30" y="100" fill="#D4A849" opacity={isActive("visibility")} fontSize="7" fontFamily="monospace">POSITION 1 · 8/10 keywords</text>
        </>
      )}
      {type === "automation" && (
        <>
          <rect x="20" y="20" width="160" height="100" rx="10" stroke="#D4A849" strokeWidth="0.5" opacity={isActive("automation")} fill="#D4A849" fillOpacity="0.04" />
          <rect x="35" y="35" width="36" height="28" rx="4" stroke="#D4A849" strokeWidth="0.6" opacity={isActive("automation")} fill="#D4A849" fillOpacity="0.06" />
          <rect x="82" y="35" width="36" height="28" rx="4" stroke="#D4A849" strokeWidth="0.6" opacity={isActive("automation") * 0.8} fill="#D4A849" fillOpacity="0.06" />
          <rect x="129" y="35" width="36" height="28" rx="4" stroke="#D4A849" strokeWidth="0.6" opacity={isActive("automation") * 0.8} fill="#D4A849" fillOpacity="0.06" />
          <path d="M71 49 L82 49" stroke="#D4A849" strokeWidth="0.4" strokeDasharray="2 2" opacity={isActive("automation")} />
          <path d="M118 49 L129 49" stroke="#D4A849" strokeWidth="0.4" strokeDasharray="2 2" opacity={isActive("automation")} />
          <text x="53" y="90" fill="#D4A849" opacity={isActive("automation")} fontSize="7" fontFamily="monospace">INPUT</text>
          <text x="100" y="90" fill="#D4A849" opacity={isActive("automation")} fontSize="7" fontFamily="monospace">AI</text>
          <text x="145" y="90" fill="#D4A849" opacity={isActive("automation")} fontSize="7" fontFamily="monospace">OUTPUT</text>
        </>
      )}
      {type === "software" && (
        <>
          <rect x="20" y="20" width="160" height="100" rx="10" stroke="#D4A849" strokeWidth="0.5" opacity={isActive("software")} fill="#D4A849" fillOpacity="0.04" />
          <rect x="40" y="30" width="50" height="45" rx="5" stroke="#D4A849" strokeWidth="0.7" opacity={isActive("software")} fill="#D4A849" fillOpacity="0.06" />
          <rect x="65" y="55" width="50" height="45" rx="5" stroke="#D4A849" strokeWidth="0.6" opacity={isActive("software") * 0.7} fill="#D4A849" fillOpacity="0.04" />
          <rect x="90" y="80" width="50" height="30" rx="4" stroke="#D4A849" strokeWidth="0.5" opacity={isActive("software") * 0.5} fill="#D4A849" fillOpacity="0.03" />
          <text x="65" y="55" fill="#D4A849" opacity={isActive("software") * 0.7} fontSize="7" fontFamily="monospace">CRM</text>
          <text x="90" y="80" fill="#D4A849" opacity={isActive("software") * 0.5} fontSize="7" fontFamily="monospace">API</text>
        </>
      )}
      {["marketing", "analytics", "ai", "brand", "local"].includes(type) && (
        <>
          <rect x="20" y="20" width="160" height="100" rx="10" stroke="#D4A849" strokeWidth="0.5" opacity={isActive(type)} fill="#D4A849" fillOpacity="0.04" />
          <text x="100" y="85" textAnchor="middle" fill="#D4A849" opacity={isActive(type) * 0.5} fontSize="10" fontFamily="monospace" fontWeight="600">{type.toUpperCase()}</text>
          <circle cx="100" cy="50" r="3" fill="#D4A849" opacity={isActive(type)} />
          <circle cx="100" cy="50" r="12" stroke="#D4A849" strokeWidth="0.4" opacity={isActive(type) * 0.4} />
          <circle cx="100" cy="50" r="22" stroke="#D4A849" strokeWidth="0.3" opacity={isActive(type) * 0.25} />
        </>
      )}
    </svg>
  );
}

function ArchitectureIllo({ activeNode, onNodeHover }: { activeNode: number | null; onNodeHover: (i: number | null) => void }) {
  const nodes = [
    { x: 200, y: 60, label: "SEO", w: 42 },
    { x: 80, y: 150, label: "AI", w: 38 },
    { x: 320, y: 150, label: "ADS", w: 42 },
    { x: 140, y: 240, label: "CRM", w: 40 },
    { x: 260, y: 240, label: "DATA", w: 44 },
    { x: 200, y: 170, label: "AUTO", w: 42 },
  ];
  const edges = [
    [0, 1], [0, 2], [0, 5], [1, 3], [2, 4], [3, 4], [5, 3], [5, 4],
  ];

  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="archGlow"><stop offset="0%" stopColor="#D4A849" stopOpacity="0.15" /><stop offset="100%" stopColor="#D4A849" stopOpacity="0" /></radialGradient>
      </defs>
      <rect x="20" y="10" width="360" height="280" rx="16" stroke="#D4A849" strokeOpacity="0.08" fill="url(#archGlow)" />
      {edges.map(([from, to], i) => {
        const f = nodes[from];
        const t = nodes[to];
        const active = activeNode !== null && (activeNode === from || activeNode === to);
        return (
          <motion.line
            key={i}
            x1={f.x} y1={f.y} x2={t.x} y2={t.y}
            stroke="#D4A849"
            strokeWidth={active ? 1.2 : 0.5}
            strokeDasharray={active ? "none" : "4 4"}
            opacity={active ? 0.7 : 0.2}
            animate={activeNode !== null && active ? { opacity: [0.4, 0.7, 0.4] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        );
      })}
      {nodes.map((node, i) => {
        const active = activeNode === i;
        const connected = activeNode !== null && edges.some(([from, to]) => (from === activeNode && to === i) || (to === activeNode && from === i));
        const dim = activeNode !== null && !active && !connected;
        return (
          <motion.g
            key={i}
            onMouseEnter={() => onNodeHover(i)}
            onMouseLeave={() => onNodeHover(null)}
            style={{ cursor: "pointer" }}
            animate={{ opacity: dim ? 0.25 : 1, scale: active ? 1.15 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <circle cx={node.x} cy={node.y} r={node.w / 2} stroke="#D4A849" strokeWidth={active ? 1.8 : 1} fill={active ? "#D4A849" : "#181818"} fillOpacity={active ? 0.15 : 0.08} />
            {active && (
              <circle cx={node.x} cy={node.y} r={node.w / 2 + 6} stroke="#D4A849" strokeWidth="0.5" opacity="0.3" fill="none" />
            )}
            <text x={node.x} y={node.y + 3.5} textAnchor="middle" fill={active ? "#D4A849" : "rgba(212,168,73,0.6)"} fontSize="9" fontFamily="monospace" fontWeight={active ? "bold" : "normal"}>{node.label}</text>
          </motion.g>
        );
      })}
      <text x="200" y="294" textAnchor="middle" fill="rgba(212,168,73,0.15)" fontSize="8" fontFamily="monospace">Connected ecosystem · hover to explore</text>
    </svg>
  );
}

function ResultsChart() {
  return (
    <svg viewBox="0 0 300 120" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="chartLine" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4A849" stopOpacity="0.3" /><stop offset="100%" stopColor="#D4A849" stopOpacity="0" /></linearGradient>
      </defs>
      <path d="M10 100 L30 90 L50 95 L70 70 L90 75 L110 50 L130 55 L150 35 L170 40 L190 25 L210 30 L230 15 L250 18 L270 10 L290 12" stroke="#D4A849" strokeWidth="1.5" opacity="0.8" fill="none" />
      <path d="M10 100 L30 90 L50 95 L70 70 L90 75 L110 50 L130 55 L150 35 L170 40 L190 25 L210 30 L230 15 L250 18 L270 10 L290 12 L290 120 L10 120Z" fill="url(#chartLine)" />
      <circle cx="290" cy="12" r="3" fill="#D4A849" opacity="0.9" />
      {[0, 20, 40, 60, 80, 100].map((v) => (
        <line key={v} x1="10" y1={100 - v} x2="290" y2={100 - v} stroke="#D4A849" strokeWidth="0.2" opacity="0.08" strokeDasharray="2 4" />
      ))}
      <text x="15" y="114" fill="rgba(212,168,73,0.3)" fontSize="6" fontFamily="monospace">Start</text>
      <text x="270" y="114" fill="rgba(212,168,73,0.3)" fontSize="6" fontFamily="monospace">Now</text>
    </svg>
  );
}

/* ─── SECTION 1: INTRO ─── */
function Section1Intro() {
  const [activeFilter, setActiveFilter] = useState(0);
  const filtered = activeFilter === 0 ? solutionData : solutionData.filter(s => categoryMap[activeFilter].filter.includes(s.slug));

  return (
    <section className="relative py-28 lg:py-36 bg-ground overflow-hidden">
      <BgGrid id="intro" />
      <BgRadials position="center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7">
            <FadeIn>
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/80 mb-5 block">Discover</span>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.8rem)] tracking-[-0.035em] leading-[0.92] text-white mb-6">
                Solutions that <span className="text-accent relative">connect<span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-accent/30 rounded-full" /></span>.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8 text-sm lg:text-base">
                Not point solutions. A connected growth system where SEO feeds data into analytics,
                analytics triggers automation, and automation enables scale. Every solution engineered
                to work with every other solution.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-wrap gap-2 mb-8">
                {categoryMap.slice(0, 5).map((cat, i) => (
                  <motion.button
                    key={cat.label}
                    onClick={() => setActiveFilter(i)}
                    className={`text-[11px] font-mono tracking-wider px-4 py-2 rounded-full border transition-all duration-300 ${
                      activeFilter === i
                        ? "bg-accent/15 border-accent/50 text-accent"
                        : "border-accent/20 text-text-secondary/60 hover:border-accent/40 hover:text-text-secondary"
                    }`}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-accent/70">{i}</span>
                    </div>
                  ))}
                </div>
                <span className="text-xs font-mono text-text-secondary">
                  <span className="text-accent/80"><CountUp target={filtered.length} /></span> connected solutions
                </span>
              </div>
            </FadeIn>
          </div>
          <div className="hidden lg:block lg:col-span-4 lg:col-start-9">
            <FadeIn delay={0.15} className="relative">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/[0.03] rounded-full border border-accent/15" />
              <div className="relative">
                <IntroIllo />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 2: INTERACTIVE SOLUTION EXPLORER ─── */
function Section2Explorer() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const catKeys = categoryMap.map(c => c.label);
  const filteredSolutions = activeCategory === 0
    ? solutionData
    : solutionData.filter(s => categoryMap[activeCategory].filter.includes(s.slug));

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="explorer" />
        <BgRadials position="tl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Explore</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-12">
            Find the right <span className="text-accent">solution.</span>
          </h2>
        </FadeIn>

        {/* Mobile: horizontal scroll pills */}
        <div className="flex lg:hidden gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categoryMap.map((cat, i) => (
            <motion.button
              key={cat.label}
              onClick={() => setActiveCategory(i)}
              className={`shrink-0 text-[11px] font-mono tracking-wider px-4 py-2.5 rounded-full border transition-all duration-300 ${
                activeCategory === i ? "bg-accent/15 border-accent/50 text-accent" : "border-accent/20 text-text-secondary/60 hover:border-accent/40"
              }`}
              whileTap={{ scale: 0.96 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Desktop left nav */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-1.5">
            {categoryMap.map((cat, i) => (
              <motion.button
                key={cat.label}
                onClick={() => setActiveCategory(i)}
                className={`relative text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeCategory === i ? "bg-[#181818] border border-accent/40" : "border border-transparent hover:bg-[#181818]/50"
                }`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className={`text-[13px] font-medium ${activeCategory === i ? "text-white" : "text-text-secondary"}`}>{cat.label}</span>
                <span className={`text-[10px] font-mono block mt-0.5 ${activeCategory === i ? "text-accent/60" : "text-text-secondary/40"}`}>
                  {cat.filter.length || solutionData.length} {cat.filter.length === 1 ? "solution" : "solutions"}
                </span>
                {activeCategory === i && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent rounded-r-full" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right cards */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div layout={false} className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredSolutions.map((sol, i) => {
                  const Icon = (iconMap[sol.icon] || Target) as React.ComponentType<any>;
                  const isHovered = hoveredCard === sol.slug;
                  return (
                    <motion.div
                      key={sol.slug}
                      layout={false}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: i * 0.03, ease }}
                      onMouseEnter={() => setHoveredCard(sol.slug)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <Link href={`/${sol.slug}`} className="group block h-full">
                        <motion.div
                          className={`relative h-full bg-[#181818] border rounded-[1.25rem] p-5 transition-all duration-500 ${
                            isHovered ? "border-accent/55 shadow-lg" : "border-accent/25"
                          }`}
                          animate={{ y: isHovered ? -4 : 0 }}
                          style={{ boxShadow: isHovered ? "0 8px 32px rgba(212,168,73,0.08)" : "0 2px 20px rgba(0,0,0,0.2)" }}
                        >
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="flex items-start justify-between mb-3">
                            <Icon size={18} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-[9px] font-mono text-text-secondary/40">--</span>
                          </div>
                          <h3 className="text-sm font-medium text-white group-hover:text-accent transition-colors duration-300 mb-1.5">{sol.name}</h3>
                          <p className="text-[12px] text-text-secondary leading-relaxed line-clamp-2">{sol.description}</p>
                          <motion.span
                            className="inline-flex items-center gap-1 text-[11px] text-accent/60 mt-3"
                            animate={{ gap: isHovered ? "6px" : "4px" }}
                          >
                            Explore <ArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                          </motion.span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 3: FEATURED SOLUTIONS ─── */
function Section3Featured() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <BgRadials position="br" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Featured</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            High-impact <span className="text-accent">solutions.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-16 lg:mb-20">Every solution is a connected system — not a standalone tactic. Each one integrates multiple services, tools, and expertise.</p>
        </FadeIn>

        <div className="space-y-16 lg:space-y-28">
          {featuredSolutions.slice(0, 4).map((sol, i) => {
            const Icon = (iconMap[sol.icon] || Target) as React.ComponentType<any>;
            const isReversed = i % 2 === 1;
            const isExpanded = expandedIdx === i;

            return (
              <motion.div
                key={sol.slug}
                className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease }}
              >
                <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : ""}`}>
                  <motion.div
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setExpandedIdx(i)}
                    onMouseLeave={() => setExpandedIdx(null)}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute -inset-x-4 -inset-y-2 bg-accent/[0.02] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/[0.15] border border-accent/35 flex items-center justify-center">
                        <Icon size={18} className="text-accent" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-text-secondary/50 tracking-wider uppercase block">Solution 0{i + 1}</span>
                        <h3 className="font-display text-[clamp(1.3rem,2.2vw,1.8rem)] font-semibold text-white leading-[1.1]">{sol.name}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-[52ch] mb-6">{sol.description}</p>

                    <AnimatePresence mode="wait">
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease }}
                          className="overflow-hidden"
                        >
                          <div className="mb-6 space-y-2">
                            <span className="text-[10px] font-mono text-accent/70 tracking-wider uppercase block">Business outcome</span>
                            <div className="flex flex-wrap gap-2">
                              {["Lead generation system", "Unified qualification", "Automated nurturing", "Multi-channel attribution"].map((chip) => (
                                <span key={chip} className="text-[10px] font-mono text-accent/50 px-2.5 py-1 rounded-full border border-accent/25 bg-[#1E1E1E]">{chip}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {sol.relevantServices.slice(0, 5).map(s => (
                              <Link key={s} href={`/${s}`}
                                className="group/pill inline-flex items-center gap-1 text-[10px] font-mono text-text-secondary/50 px-3 py-1.5 rounded-full border border-accent/20 hover:border-accent/50 hover:text-accent/80 transition-all duration-300"
                              >
                                {s.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                              </Link>
                            ))}
                          </div>
                          <Link href={`/${sol.slug}`}
                            className="group/btn relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-accent/40 bg-accent/10 hover:bg-accent hover:text-ground text-sm text-accent transition-all duration-300"
                          >
                            View full solution
                            <ArrowRight size={12} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <div className="flex items-center gap-2 text-[11px] text-text-secondary/50 font-mono">
                        <Mouse size={12} />
                        <span>Hover to explore</span>
                      </div>
                    )}
                  </motion.div>
                </div>

                <div className={`hidden lg:block lg:col-span-4 ${isReversed ? "lg:order-1" : ""}`}>
                  <motion.div
                    className="relative"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`absolute -top-4 -${isReversed ? "right" : "left"}-4 w-20 h-20 bg-accent/[0.03] rounded-2xl border border-accent/15`} />
                    <PanelCard className="p-5 lg:p-6">
                      <span className="text-[9px] font-mono text-[rgba(255,255,255,0.60)] tracking-wider uppercase block mb-4">Expected ROI</span>
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-text-secondary">Lead volume</span>
                          <span className="text-[18px] font-display font-semibold text-accent leading-none">3.2<span className="text-[10px]">x</span></span>
                        </div>
                        <div className="h-px bg-accent/12" />
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-text-secondary">Cost per lead</span>
                          <span className="text-[18px] font-display font-semibold text-accent leading-none">-40<span className="text-[10px]">%</span></span>
                        </div>
                        <div className="h-px bg-accent/12" />
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-text-secondary">Time to results</span>
                          <span className="text-[18px] font-display font-semibold text-accent leading-none">60<span className="text-[10px]">d</span></span>
                        </div>
                      </div>
                    </PanelCard>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 4: BUSINESS PROBLEMS ─── */
function Section4Problems() {
  const [activeProblem, setActiveProblem] = useState<number | null>(null);

  const toggleProblem = (i: number) => {
    setActiveProblem(activeProblem === i ? null : i);
  };

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="problems" />
        <BgRadials position="tr" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">What do you need?</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            What are you trying to <span className="text-accent">achieve?</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">Select a goal and discover the precise system of services, tools, and expertise engineered to solve it.</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {problemCards.map((p, i) => {
            const Icon = p.icon;
            const isActive = activeProblem === i;
            return (
              <motion.div
                key={p.slug}
                layout={false}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04, ease }}
              >
                <div
                  onClick={() => toggleProblem(i)}
                  className="group relative cursor-pointer"
                >
                  <motion.div
                    className={`relative bg-[#181818] border rounded-[1.25rem] p-5 transition-all duration-500 ${
                      isActive ? "border-accent/60 shadow-lg" : "border-accent/25 hover:border-accent/45"
                    }`}
                    animate={{ y: isActive ? -4 : 0 }}
                    style={{ boxShadow: isActive ? "0 8px 32px rgba(212,168,73,0.08)" : "0 2px 12px rgba(0,0,0,0.2)" }}
                  >
                    <div className={`absolute inset-0 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      isActive ? "opacity-100" : ""
                    }`}
                      style={{ boxShadow: "inset 0 0 30px rgba(212,168,73,0.06)" }}
                    />
                    <div className="flex items-start justify-between mb-3">
                      <Icon size={20} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-[9px] font-mono text-accent/40">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-sm font-medium text-white group-hover:text-accent transition-colors duration-300 mb-2">{p.title}</h3>
                    <motion.div
                      animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 space-y-3">
                        <p className="text-[11px] text-text-secondary leading-relaxed">We build a complete system around this goal — combining strategy, execution, and optimisation across multiple channels.</p>
                        <Link href={`/${p.slug}`}
                          className="inline-flex items-center gap-1 text-[11px] text-accent/70 hover:text-accent transition-colors duration-300"
                        >
                          Find solution <ArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </motion.div>
                    {!isActive && (
                      <span className="text-[10px] text-text-secondary/40 font-mono mt-2 block">Click to expand</span>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 5: SOLUTION ARCHITECTURE ─── */
function Section5Architecture() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null);

  const pillarDescriptions = [
    { label: "Search & Organic Growth", desc: "Drives qualified traffic and builds domain authority that fuels every other channel." },
    { label: "GEO & AI Search", desc: "Future-proofs your visibility as search shifts from links to answers." },
    { label: "Digital PR & Brand Authority", desc: "Creates trust signals that search engines, AI models, and humans rely on." },
    { label: "Paid Media & Performance", desc: "Delivers immediate traffic and conversions while organic efforts compound." },
    { label: "Data & Analytics", desc: "Connects every channel into a single source of truth so you can measure and optimise." },
    { label: "AI & Automation", desc: "Multiplies every channel by eliminating manual work at every layer." },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="arch" />
        <BgRadials position="center" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Architecture</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Everything is <span className="text-accent">connected.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-16">Each solution is part of a connected ecosystem. Hover any node to see how every pillar feeds into every other pillar. Nothing operates in isolation.</p>
        </FadeIn>

        {/* Desktop: Animated architecture */}
        <div className="hidden lg:block relative">
          <motion.div
            className="max-w-[600px] mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <ArchitectureIllo activeNode={activeNode} onNodeHover={setActiveNode} />
          </motion.div>
          <AnimatePresence mode="wait">
            {activeNode !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-center mt-6"
              >
                <span className="text-[11px] font-mono text-accent/70">{pillarDescriptions[activeNode]?.label}</span>
                <p className="text-xs text-text-secondary mt-1 max-w-[40ch] mx-auto">{pillarDescriptions[activeNode]?.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile: Accordion */}
        <div className="lg:hidden space-y-2">
          {pillarDescriptions.map((item, i) => (
            <div key={item.label} className="bg-[#181818] border border-accent/20 rounded-xl overflow-hidden">
              <button
                onClick={() => setMobileAccordion(mobileAccordion === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-sm font-medium text-white">{item.label}</span>
                {mobileAccordion === i ? <CaretDown size={14} className="text-accent/60" /> : <CaretRight size={14} className="text-text-secondary/40" />}
              </button>
              <AnimatePresence mode="wait">
                {mobileAccordion === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                      <span className="text-[10px] text-accent/60 font-mono mt-2 block tracking-wide">Connected to all pillars</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 6: INDUSTRIES ─── */
function Section6Industries() {
  const [hoveredIndustry, setHoveredIndustry] = useState<number | null>(null);
  const [mobileIndustry, setMobileIndustry] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <BgGrid id="industries" />
      <BgRadials position="bl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Industries</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Solutions by <span className="text-accent">industry.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">Every industry has unique challenges. We tailor our connected growth system to fit your market, regulations, and competition.</p>
        </FadeIn>

        {/* Desktop: Logo tiles */}
        <div className="hidden lg:grid grid-cols-5 gap-3">
          {industryData.map((ind, i) => {
            const Icon = ind.icon;
            const isHovered = hoveredIndustry === i;
            return (
              <motion.div
                key={ind.name}
                onMouseEnter={() => setHoveredIndustry(i)}
                onMouseLeave={() => setHoveredIndustry(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04, ease }}
              >
                <Link href={`/industries`} className="group block h-full">
                  <motion.div
                    className={`relative h-full bg-[#181818] border rounded-[1.25rem] p-5 text-center transition-all duration-500 ${
                      isHovered ? "border-accent/60 shadow-lg" : "border-accent/20"
                    }`}
                    animate={{ y: isHovered ? -6 : 0 }}
                    style={{ boxShadow: isHovered ? "0 12px 40px rgba(212,168,73,0.06)" : "0 2px 12px rgba(0,0,0,0.15)" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Icon size={28} className={`mx-auto mb-3 transition-all duration-500 ${isHovered ? "text-accent scale-110" : "text-text-secondary/50"}`} />
                    <span className={`text-sm font-medium transition-colors duration-300 ${isHovered ? "text-accent" : "text-white"}`}>{ind.name}</span>
                    <AnimatePresence mode="wait">
                      {isHovered && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 space-y-2 text-left">
                            <div>
                              <span className="text-[9px] font-mono text-text-secondary/60 tracking-wider uppercase block mb-0.5">Challenges</span>
                              <span className="text-[10px] text-text-secondary">{ind.challenges}</span>
                            </div>
                            <div>
                              <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase block mb-0.5">Solutions</span>
                              <span className="text-[10px] text-accent/80">{ind.solutions}</span>
                            </div>
                            <span className="block text-[11px] text-accent/50 font-mono pt-1">View solutions →</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {!isHovered && (
                      <span className="text-[9px] font-mono text-text-secondary/30 mt-2 block">Hover to explore</span>
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: 2-column grid with hover-style tap */}
        <div className="lg:hidden grid grid-cols-2 gap-2">
          {industryData.map((ind, i) => {
            const Icon = ind.icon;
            const isExpanded = mobileIndustry === i;
            return (
              <div key={ind.name} className="bg-[#181818] border border-accent/20 rounded-xl overflow-hidden">
                <button
                  onClick={() => setMobileIndustry(mobileIndustry === i ? null : i)}
                  className="w-full p-4 text-center"
                >
                  <Icon size={22} className={`mx-auto mb-2 transition-colors duration-300 ${isExpanded ? "text-accent" : "text-text-secondary/50"}`} />
                  <span className={`text-xs font-medium ${isExpanded ? "text-accent" : "text-white"}`}>{ind.name}</span>
                </button>
                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-1.5 text-left">
                        <span className="text-[9px] font-mono text-text-secondary/60 block">{ind.challenges}</span>
                        <span className="text-[9px] font-mono text-accent/70 block">{ind.solutions}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 7: RESULTS PREVIEW ─── */
function Section7Results() {
  const [activeMetric, setActiveMetric] = useState(0);
  const metrics = [
    { label: "Organic Traffic", value: "312", suffix: "%", sub: "Average increase across clients", icon: ChartLineUp, color: "#D4A849" },
    { label: "Revenue Impact", value: "4.2", suffix: "x", sub: "Average ROAS on paid campaigns", icon: CurrencyDollar, color: "#D4A849" },
    { label: "Leads Generated", value: "180", suffix: "%", sub: "Qualified lead growth", icon: Target, color: "#D4A849" },
    { label: "Hours Saved", value: "840", suffix: "+", sub: "Per month with automation", icon: Gear, color: "#D4A849" },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="results" />
        <BgRadials position="tr" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(212,168,73,0.6) 0%, transparent 60%)" }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Results</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Outcomes that <span className="text-accent">compound.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">Connected solutions produce connected results — every channel feeds the next, every gain multiplies.</p>
        </FadeIn>

        {/* Desktop: Full layout={false} */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-3 mb-3">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              const isActive = activeMetric === i;
              return (
                <motion.div
                  key={m.label}
                  onMouseEnter={() => setActiveMetric(i)}
                  className="relative group cursor-pointer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <PanelCard className={`p-6 transition-all duration-500 ${isActive ? "border-accent/60" : ""}`}>
                    <Icon size={16} className="text-accent mb-3" />
                    <span className="text-[10px] font-mono text-[rgba(255,255,255,0.60)] tracking-wider uppercase block mb-1">{m.label}</span>
                    <span className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold text-accent leading-none block">
                      <CountUp target={parseInt(m.value)} />{m.suffix}
                    </span>
                    <span className="text-[11px] text-[rgba(255,255,255,0.50)] font-mono mt-1 block">{m.sub}</span>
                    {isActive && (
                      <div className="absolute -bottom-0.5 left-4 right-4 h-px bg-accent/40" />
                    )}
                  </PanelCard>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <PanelCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-[rgba(255,255,255,0.60)] tracking-wider uppercase">Growth Trajectory</span>
                <span className="text-[11px] text-accent font-mono">+312%</span>
              </div>
              <div className="relative h-24">
                <ResultsChart />
              </div>
            </PanelCard>
            <PanelCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-[rgba(255,255,255,0.60)] tracking-wider uppercase">Channel Distribution</span>
                <span className="text-[11px] text-accent font-mono">Optimised</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Organic Search", pct: 42 },
                  { label: "Paid Media", pct: 28 },
                  { label: "Direct & Referral", pct: 18 },
                  { label: "Social & Email", pct: 12 },
                ].map((ch) => (
                  <div key={ch.label}>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="font-mono text-[rgba(255,255,255,0.65)]">{ch.label}</span>
                      <span className="font-mono text-accent/80">{ch.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[#111] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${ch.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease }}
                        style={{ boxShadow: "0 0 6px rgba(212,168,73,0.2)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </PanelCard>
          </div>
        </div>

        {/* Mobile: Stacked cards */}
        <div className="lg:hidden space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {metrics.slice(0, 2).map((m) => {
              const Icon = m.icon;
              return (
                <PanelCard key={m.label} className="p-4">
                  <Icon size={14} className="text-accent mb-2" />
                  <span className="text-[9px] font-mono text-[rgba(255,255,255,0.60)] tracking-wider uppercase block mb-1">{m.label}</span>
                  <span className="font-display text-[1.4rem] font-semibold text-accent leading-none block"><CountUp target={parseInt(m.value)} />{m.suffix}</span>
                </PanelCard>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {metrics.slice(2, 4).map((m) => {
              const Icon = m.icon;
              return (
                <PanelCard key={m.label} className="p-4">
                  <Icon size={14} className="text-accent mb-2" />
                  <span className="text-[9px] font-mono text-[rgba(255,255,255,0.60)] tracking-wider uppercase block mb-1">{m.label}</span>
                  <span className="font-display text-[1.4rem] font-semibold text-accent leading-none block"><CountUp target={parseInt(m.value)} />{m.suffix}</span>
                </PanelCard>
              );
            })}
          </div>
          <PanelCard className="p-4">
            <span className="text-[9px] font-mono text-[rgba(255,255,255,0.60)] tracking-wider uppercase block mb-3">Growth Trajectory</span>
            <div className="relative h-16"><ResultsChart /></div>
          </PanelCard>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 8: PROCESS ─── */
function Section8Process() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="process" />
        <BgRadials position="center" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Process</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            How we <span className="text-accent">build.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-16">A proven five-phase system that takes your growth from discovery to scale — with continuous optimisation at every stage.</p>
        </FadeIn>

        {/* Desktop: Floating cards */}
        <div className="hidden lg:block relative">
          <div className="absolute top-12 bottom-12 left-1/2 w-px bg-gradient-to-b from-accent/0 via-accent/20 to-accent/0 -translate-x-1/2" />
          <div className="space-y-16 relative">
            {processSteps.map((step, i) => {
              const StepIcon = step.icon;
              const isActive = activeStep === i;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  className={`flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.7, ease }}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
                    <motion.div
                      className={`inline-block bg-[#181818] border rounded-[1.5rem] p-6 transition-all duration-500 max-w-[380px] ${
                        isActive ? "border-accent/60 shadow-lg" : "border-accent/25"
                      }`}
                      animate={{ y: isActive ? -6 : 0, scale: isActive ? 1.02 : 1 }}
                      style={{ boxShadow: isActive ? "0 12px 48px rgba(212,168,73,0.06)" : "0 4px 20px rgba(0,0,0,0.2)" }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <StepIcon size={14} className="text-accent/60" />
                        <span className="text-[10px] font-mono text-accent/60 tracking-[0.12em] uppercase">{step.step}</span>
                      </div>
                      <h3 className="font-display text-[1.3rem] font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                    </motion.div>
                  </div>

                  <motion.div
                    className="relative z-10 shrink-0"
                    animate={{ scale: isActive ? 1.3 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      isActive ? "bg-accent/20 border-accent/70 shadow-lg shadow-accent/10" : "bg-[#181818] border-accent/30"
                    }`}>
                      <span className="text-xs font-mono text-accent/80">{step.step}</span>
                    </div>
                  </motion.div>

                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Horizontal snap cards */}
        <div className="lg:hidden overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4">
          <div className="flex gap-4 w-max">
            {processSteps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  className="snap-center w-[280px] shrink-0"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                >
                  <PanelCard className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <StepIcon size={12} className="text-accent/60" />
                      <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase">{step.step}</span>
                    </div>
                    <h3 className="font-display text-[1.2rem] font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex gap-1">
                        {processSteps.map((_, j) => (
                          <div key={j} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${j === i ? "bg-accent/60" : "bg-accent/15"}`} />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono text-text-secondary/40">{i + 1} of {processSteps.length}</span>
                    </div>
                  </PanelCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 9: COMPARISON ─── */
function Section9Comparison() {
  const [activeColumn, setActiveColumn] = useState<"traditional" | "connected" | null>(null);

  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <BgGrid id="comparison" />
      <BgRadials position="tl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Comparison</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Traditional agencies vs. <span className="text-accent">connected growth.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">The difference between point solutions and a system that works together — every channel, every tool, every team.</p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-4">
          <motion.div
            onMouseEnter={() => setActiveColumn("traditional")}
            onMouseLeave={() => setActiveColumn(null)}
            animate={{ y: activeColumn === "traditional" ? -4 : 0, opacity: activeColumn === "connected" ? 0.5 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <PanelCard className="p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#222] border border-white/10 flex items-center justify-center">
                  <span className="text-sm text-text-secondary/60">×</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-white block">Traditional Agencies</span>
                  <span className="text-[11px] text-text-secondary/50 font-mono">Point solutions</span>
                </div>
              </div>
              <div className="space-y-3">
                {["Siloed service departments", "Monthly reporting with spreadsheets", "Generic strategies applied to everyone", "No integration between channels", "Manual processes and overhead", "Hard to measure true ROI"].map((item) => (
                  <motion.div key={item} className="flex items-start gap-3"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="w-5 h-5 rounded-full bg-red-900/30 border border-red-800/40 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] text-red-400">×</span>
                    </span>
                    <span className="text-sm text-text-secondary">{item}</span>
                  </motion.div>
                ))}
              </div>
            </PanelCard>
          </motion.div>

          <motion.div
            onMouseEnter={() => setActiveColumn("connected")}
            onMouseLeave={() => setActiveColumn(null)}
            animate={{ y: activeColumn === "connected" ? -4 : 0, opacity: activeColumn === "traditional" ? 0.5 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <PanelCard className="p-6 lg:p-8 border-accent/50" style={{ boxShadow: "0 0 30px rgba(212,168,73,0.06)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/40 flex items-center justify-center">
                  <SealCheck size={18} className="text-accent" />
                </div>
                <div>
                  <span className="text-sm font-medium text-white block">Connected Growth System</span>
                  <span className="text-[11px] text-accent/60 font-mono">Integrated outcomes</span>
                </div>
              </div>
              <div className="space-y-3">
                {["Unified strategy across every channel", "Real-time unified dashboards", "Custom solutions tailored to your business", "Every channel feeds every other channel", "AI-powered automation at every layer", "Clear attribution from spend to revenue"].map((item) => (
                  <motion.div key={item} className="flex items-start gap-3"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center shrink-0 mt-0.5">
                      <SealCheck size={10} className="text-accent" />
                    </span>
                    <span className="text-sm text-white">{item}</span>
                  </motion.div>
                ))}
              </div>
            </PanelCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 10: INSIGHTS ─── */
function Section10Insights() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="insights" />
        <BgRadials position="br" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Insights</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Thinking that <span className="text-accent">informs.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">Strategy, analysis, and perspectives from the team building connected growth systems every day.</p>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Featured article */}
          <motion.div className="lg:col-span-7 lg:row-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <Link href="/" className="group block h-full">
              <PanelCard className="p-6 lg:p-8 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono text-accent/60 tracking-wider uppercase">{insightsData[0].tag}</span>
                    <span className="w-1 h-1 rounded-full bg-accent/30" />
                    <span className="text-[10px] font-mono text-text-secondary/50">{insightsData[0].readTime}</span>
                  </div>
                  <h3 className="font-display text-[clamp(1.3rem,2.2vw,1.6rem)] font-semibold text-white group-hover:text-accent transition-colors duration-300 mb-4 leading-[1.1]">
                    {insightsData[0].title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-[45ch]">{insightsData[0].excerpt}</p>
                </div>
                <div className="pt-6 mt-auto relative z-10">
                  <span className="inline-flex items-center gap-1 text-xs text-accent/50 group-hover:text-accent transition-colors duration-300">
                    Read article <ArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </PanelCard>
            </Link>
          </motion.div>

          {/* Secondary articles */}
          <div className="lg:col-span-5 space-y-4">
            {insightsData.slice(1).map((insight, i) => (
              <motion.div key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <Link href="/" className="group block">
                  <PanelCard className="p-5 flex gap-4 items-start transition-all duration-300 group-hover:border-accent/40">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase">{insight.tag}</span>
                        <span className="w-0.5 h-0.5 rounded-full bg-text-secondary/30" />
                        <span className="text-[9px] font-mono text-text-secondary/40">{insight.readTime}</span>
                      </div>
                      <h4 className="text-sm font-medium text-white group-hover:text-accent transition-colors duration-300 leading-snug">{insight.title}</h4>
                    </div>
                    <ArrowRight size={12} className="text-text-secondary/30 group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 shrink-0 mt-2" />
                  </PanelCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 11: CTA ─── */
function Section11CTA() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 pointer-events-none">
        <BgDiagonal id="cta" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,168,73,0.03), transparent)" }} />
      </div>
      <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
        <motion.h2 className="font-display font-semibold text-[clamp(1.8rem,3vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
        >
          Not sure where to start?
        </motion.h2>
        <motion.p className="text-[rgba(255,255,255,0.72)] text-[15px] leading-relaxed mb-10 max-w-[42ch] mx-auto"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
        >
          Book a free discovery call. We&rsquo;ll map out the right solutions for your goals — no pitch, just a plan.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
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

/* ─── MAIN EXPORT ─── */
export function SolutionsContent() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      {/* ─── HERO / BANNER (Matching /services style) ─── */}
      <motion.section ref={heroRef} className="relative pt-36 pb-20 lg:pb-28 bg-ground overflow-hidden" style={{ opacity: heroOpacity }}>
        <div className="absolute inset-0">
          <ShapeGrid speed={0.15} squareSize={36} direction="diagonal" borderColor="#D4A849" hoverFillColor="#D4A849" shape="square" hoverTrailAmount={3} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ground/90 pointer-events-none" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 right-[10%] text-[clamp(8rem,18vw,16rem)] font-mono font-semibold text-text-primary/[0.015] leading-none select-none">13</div>
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.015]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.3), transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/15" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <motion.span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[rgba(255,255,255,0.70)] mb-5 block"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
              >
                Solutions
              </motion.span>
              <motion.h1 className="font-display font-semibold text-[clamp(2.8rem,5.5vw,5rem)] tracking-[-0.035em] leading-[0.92] text-white"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}
              >
                Engineered solutions,<br /><span className="text-accent relative">not tactics.<span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-accent/30 rounded-full" /></span>
              </motion.h1>
              <motion.p className="text-[rgba(255,255,255,0.72)] leading-relaxed max-w-[52ch] mt-5 text-sm lg:text-base"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }}
              >
                Thirteen connected solutions spanning lead generation, visibility, automation, software, and
                reputation — every single one engineered to work with every other.
              </motion.p>
            </div>

            <motion.div className="lg:col-span-4 flex justify-end"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease }}
            >
              <div className="hidden lg:flex flex-col items-end gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-px bg-accent/40" />
                  <span className="font-mono text-xs text-accent/80">{solutionData.length} solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-px bg-accent/40" />
                  <span className="font-mono text-xs text-accent/80">9 categories</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-px bg-accent/40" />
                  <span className="font-mono text-xs text-accent/80">1 growth system</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="h-px w-full bg-accent/15" />

      {/* Section 1: Editorial Intro */}
      <Section1Intro />

      {/* Section 2: Interactive Solution Explorer */}
      <Section2Explorer />

      {/* Section 3: Featured Solutions */}
      <Section3Featured />

      {/* Section 4: Business Problems */}
      <Section4Problems />

      {/* Section 5: Solution Architecture */}
      <Section5Architecture />

      {/* Section 6: Industries */}
      <Section6Industries />

      {/* Section 7: Results Preview */}
      <Section7Results />

      {/* Section 8: Process */}
      <Section8Process />

      {/* Section 9: Comparison */}
      <Section9Comparison />

      {/* Section 10: Insights */}
      <Section10Insights />

      {/* Section 11: Premium CTA */}
      <Section11CTA />

        {/* Hub interlinking */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Breadcrumbs crumbs={getBreadcrumbs("solutions", "hub")} />
          <div className="text-center mb-12">
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent">Explore More</span>
            <h2 className="font-display font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[0.95] text-text-primary mt-3">Connected Ecosystem</h2>
            <p className="text-text-secondary text-sm mt-3 max-w-[50ch] mx-auto">
              Every solution is backed by services, tools, and proven results.
            </p>
          </div>
          <RelatedSection
            groups={[
              {
                title: "Services",
                links: [
                  { label: "SEO Strategy", href: "/seo-strategy" },
                  { label: "Generative Engine Optimisation", href: "/generative-engine-optimisation" },
                  { label: "Google Ads", href: "/google-ads" },
                  { label: "AI Agents & Automation", href: "/ai-agents" },
                  { label: "All Services", href: "/services" },
                ],
              },
              {
                title: "Tools",
                links: [
                  { label: "Website SEO Audit", href: "/seo-audit" },
                  { label: "GEO Readiness Audit", href: "/geo-readiness" },
                  { label: "AI Visibility Checker", href: "/ai-visibility" },
                  { label: "Ads Cost Calculator", href: "/ads-calculator" },
                  { label: "All Tools", href: "/tools" },
                ],
              },
              {
                title: "Industries We Serve",
                links: [
                  { label: "Dental & Healthcare", href: "/dental-healthcare" },
                  { label: "E-commerce", href: "/ecommerce" },
                  { label: "SaaS & Technology", href: "/saas-technology" },
                  { label: "Real Estate", href: "/real-estate" },
                  { label: "All Industries", href: "/industries" },
                ],
              },
              {
                title: "Case Studies",
                links: [
                  { label: "Pulse Health — GEO for HealthTech", href: "/pulse-health" },
                  { label: "Urban Spaces — Real Estate SEO", href: "/urban-spaces" },
                  { label: "FitSync — SaaS Growth", href: "/fitsync" },
                  { label: "All Case Studies", href: "/work" },
                ],
              },
            ]}
          />
        </section>
    </>
  );
}
