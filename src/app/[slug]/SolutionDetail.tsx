"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Target, Binoculars, Robot, Gear, Code, Rocket, Globe, MapPin,
  ChartLineUp, Lightning, ChartBar, FolderOpen, Handshake,
  ArrowRight, ArrowLineUpRight, SealCheck, Star, Graph,
  MagnifyingGlass, ChartPie, FlowArrow, ArrowArcRight,
  ChatCircle, Files, Clock, Phone, Users, ShoppingCart,
  PuzzlePiece, Cube, Circle, Square, Triangle, Plus, X,
  CaretRight, CaretDown, Mouse, ArrowsDownUp, Heartbeat,
  Scales, Wrench, Sun, Building, GraduationCap, Storefront,
  CurrencyCircleDollar, Trophy, Eye, CurrencyDollar,
  Sparkle, ListBullets, Question, Info, DeviceMobile, Shield,
} from "@phosphor-icons/react";
import { solutions } from "@/data/solutions";
import type { SolutionItem } from "@/data/solutions";

const iconMap: Record<string, React.ElementType> = {
  Target, Binoculars, Robot, Gear, Code, Rocket, Globe, MapPin,
  ChartLineUp, Lightning, ChartBar, FolderOpen, Handshake,
  Star, Graph, MagnifyingGlass, ChartPie, FlowArrow, ArrowArcRight,
  ChatCircle, Files, Clock, Phone, Users, ShoppingCart,
  PuzzlePiece, Cube, Circle, Square, Triangle, Plus, X,
  CaretRight, CaretDown, Mouse, ArrowsDownUp, Heartbeat,
  Scales, Wrench, Sun, Building, GraduationCap, Storefront,
  CurrencyCircleDollar, Trophy, Eye, CurrencyDollar,
  Sparkle, ListBullets, Question, Info, DeviceMobile, Shield,
};

const ease = [0.32, 0.72, 0, 1] as const;

function BgGrid({ id }: { id: string }) {
  const p = "grid-" + id;
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id={p} x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={"url(#" + p + ")"} />
    </svg>
  );
}

function BgRadial({ position }: { position: "tl" | "br" | "tr" | "bl" | "center" }) {
  const posMap: Record<string, string> = {
    tl: "top-0 left-0", br: "bottom-0 right-0", tr: "top-0 right-0", bl: "bottom-0 left-0", center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  };
  const translate: Record<string, string> = {
    tl: "translate(-30%, -30%)", br: "translate(30%, 30%)", tr: "translate(30%, -30%)", bl: "translate(-30%, 30%)", center: ""
  };
  const pos = position === "center" ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : posMap[position];
  return (
    <div className={"absolute " + pos + " w-[600px] h-[600px] pointer-events-none opacity-[0.12]"}
      style={{ background: "radial-gradient(ellipse at center, rgba(212,168,73,0.4) 0%, transparent 70%)", transform: translate[position] }}
    />
  );
}

function BgDots() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: "radial-gradient(rgba(212,168,73,0.08) 0.5px, transparent 0.5px)",
      backgroundSize: "28px 28px",
    }} />
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease }}>
      {children}
    </motion.div>
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

function PanelCard({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={"relative bg-[#181818] border border-accent/30 rounded-[1.5rem] overflow-hidden " + className} style={style}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      {children}
    </div>
  );
}

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
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

/* -- HERO ILLUSTRATIONS -- */

function FunnelSVG() {
  return (
    <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="funnelGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4A849" stopOpacity="0.15" /><stop offset="100%" stopColor="#D4A849" stopOpacity="0.02" /></linearGradient>
      </defs>
      <polygon points="150,20 270,280 30,280" fill="url(#funnelGrad)" stroke="#D4A849" strokeWidth="0.8" opacity="0.6" />
      <line x1="150" y1="20" x2="150" y2="280" stroke="#D4A849" strokeWidth="0.3" strokeDasharray="4 4" opacity="0.3" />
      <line x1="30" y1="280" x2="270" y2="280" stroke="#D4A849" strokeWidth="0.3" opacity="0.3" />
      <rect x="100" y="60" width="100" height="20" rx="4" fill="#D4A849" fillOpacity="0.1" stroke="#D4A849" strokeWidth="0.4" />
      <text x="150" y="73" textAnchor="middle" fill="#D4A849" opacity="0.5" fontSize="7" fontFamily="monospace">TRAFFIC</text>
      <rect x="80" y="100" width="140" height="20" rx="4" fill="#D4A849" fillOpacity="0.08" stroke="#D4A849" strokeWidth="0.4" />
      <text x="150" y="113" textAnchor="middle" fill="#D4A849" opacity="0.4" fontSize="7" fontFamily="monospace">LEADS</text>
      <rect x="60" y="140" width="180" height="20" rx="4" fill="#D4A849" fillOpacity="0.06" stroke="#D4A849" strokeWidth="0.4" />
      <text x="150" y="153" textAnchor="middle" fill="#D4A849" opacity="0.35" fontSize="7" fontFamily="monospace">QUALIFIED</text>
      <rect x="45" y="180" width="210" height="20" rx="4" fill="#D4A849" fillOpacity="0.05" stroke="#D4A849" strokeWidth="0.4" />
      <text x="150" y="193" textAnchor="middle" fill="#D4A849" opacity="0.3" fontSize="7" fontFamily="monospace">CONVERSION</text>
      <circle cx="150" cy="250" r="16" fill="#D4A849" fillOpacity="0.08" stroke="#D4A849" strokeWidth="0.6" />
      <text x="150" y="254" textAnchor="middle" fill="#D4A849" opacity="0.5" fontSize="7" fontFamily="monospace">REVENUE</text>
    </svg>
  );
}

function SERPSVG() {
  return (
    <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
      <rect x="20" y="20" width="260" height="280" rx="12" stroke="#D4A849" strokeWidth="0.6" opacity="0.4" fill="#D4A849" fillOpacity="0.02" />
      <rect x="35" y="38" width="60" height="10" rx="3" fill="#D4A849" fillOpacity="0.12" />
      <rect x="35" y="56" width="120" height="6" rx="3" fill="#D4A849" fillOpacity="0.06" />
      <rect x="35" y="68" width="90" height="6" rx="3" fill="#D4A849" fillOpacity="0.04" />
      <rect x="35" y="90" width="230" height="36" rx="6" stroke="#D4A849" strokeWidth="0.4" opacity="0.3" fill="#D4A849" fillOpacity="0.04" />
      <rect x="45" y="99" width="80" height="8" rx="2" fill="#D4A849" fillOpacity="0.15" />
      <rect x="45" y="111" width="140" height="4" rx="2" fill="#D4A849" fillOpacity="0.06" />
      <rect x="35" y="138" width="40" height="8" rx="2" fill="#D4A849" fillOpacity="0.08" />
      <rect x="35" y="154" width="180" height="6" rx="3" fill="#D4A849" fillOpacity="0.05" />
      <rect x="35" y="166" width="160" height="6" rx="3" fill="#D4A849" fillOpacity="0.04" />
      <rect x="35" y="190" width="40" height="8" rx="2" fill="#D4A849" fillOpacity="0.08" />
      <rect x="35" y="206" width="200" height="6" rx="3" fill="#D4A849" fillOpacity="0.05" />
      <rect x="35" y="218" width="170" height="6" rx="3" fill="#D4A849" fillOpacity="0.04" />
      <rect x="35" y="242" width="40" height="8" rx="2" fill="#D4A849" fillOpacity="0.08" />
      <rect x="35" y="258" width="150" height="6" rx="3" fill="#D4A849" fillOpacity="0.05" />
      <rect x="35" y="270" width="130" height="6" rx="3" fill="#D4A849" fillOpacity="0.04" />
      <text x="150" y="304" textAnchor="middle" fill="#D4A849" opacity="0.15" fontSize="7" fontFamily="monospace">PAGE 1 - ORGANIC RESULTS</text>
    </svg>
  );
}

function NeuralSVG() {
  return (
    <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
      {[[150,30],[60,100],[240,100],[30,190],[140,190],[260,190],[80,270],[200,270],[270,270]].map((n,i) => (
        <circle key={i} cx={n[0]} cy={n[1]} r="4" fill="#D4A849" opacity={0.3+i*0.05} />
      ))}
      {[[0,1],[0,2],[1,3],[1,4],[2,5],[4,5],[4,7],[5,8],[3,6],[4,6],[6,7],[7,8],[0,4],[1,5],[3,4],[2,4]].map((e,i) => {
        const nd = [[150,30],[60,100],[240,100],[30,190],[140,190],[260,190],[80,270],[200,270],[270,270]];
        return <line key={i} x1={nd[e[0]][0]} y1={nd[e[0]][1]} x2={nd[e[1]][0]} y2={nd[e[1]][1]} stroke="#D4A849" strokeWidth={0.4+i*0.02} opacity={0.08+i*0.01} />;
      })}
      {[[150,30],[60,100],[240,100],[30,190],[140,190],[260,190],[80,270],[200,270],[270,270]].map((n,i) => (
        <circle key={i+100} cx={n[0]} cy={n[1]} r="14" stroke="#D4A849" strokeWidth="0.3" opacity="0.15" fill="none" />
      ))}
      <text x="150" y="304" textAnchor="middle" fill="#D4A849" opacity="0.12" fontSize="7" fontFamily="monospace">AI KNOWLEDGE GRAPH</text>
    </svg>
  );
}

function PipelineSVG() {
  return (
    <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
      <rect x="20" y="40" width="260" height="240" rx="12" stroke="#D4A849" strokeWidth="0.4" opacity="0.2" fill="#D4A849" fillOpacity="0.01" />
      <rect x="35" y="55" width="230" height="30" rx="6" fill="#D4A849" fillOpacity="0.08" stroke="#D4A849" strokeWidth="0.3" opacity="0.3" />
      <text x="150" y="73" textAnchor="middle" fill="#D4A849" opacity="0.6" fontSize="9" fontFamily="monospace">INPUT</text>
      <line x1="150" y1="85" x2="150" y2="100" stroke="#D4A849" strokeWidth="0.5" opacity="0.3" />
      <line x1="150" y1="100" x2="50" y2="110" stroke="#D4A849" strokeWidth="0.5" opacity="0.2" strokeDasharray="3 3" />
      <line x1="150" y1="100" x2="250" y2="110" stroke="#D4A849" strokeWidth="0.5" opacity="0.2" strokeDasharray="3 3" />
      <rect x="50" y="110" width="80" height="40" rx="6" fill="#D4A849" fillOpacity="0.06" stroke="#D4A849" strokeWidth="0.3" opacity="0.25" />
      <text x="90" y="133" textAnchor="middle" fill="#D4A849" opacity="0.4" fontSize="8" fontFamily="monospace">PROCESS</text>
      <rect x="170" y="110" width="80" height="40" rx="6" fill="#D4A849" fillOpacity="0.06" stroke="#D4A849" strokeWidth="0.3" opacity="0.25" />
      <text x="210" y="133" textAnchor="middle" fill="#D4A849" opacity="0.4" fontSize="8" fontFamily="monospace">VALIDATE</text>
      <line x1="130" y1="130" x2="170" y2="130" stroke="#D4A849" strokeWidth="0.4" opacity="0.25" />
      <line x1="90" y1="150" x2="90" y2="175" stroke="#D4A849" strokeWidth="0.5" opacity="0.3" />
      <line x1="210" y1="150" x2="210" y2="175" stroke="#D4A849" strokeWidth="0.5" opacity="0.3" />
      <rect x="60" y="175" width="180" height="30" rx="6" fill="#D4A849" fillOpacity="0.05" stroke="#D4A849" strokeWidth="0.3" opacity="0.25" />
      <text x="150" y="194" textAnchor="middle" fill="#D4A849" opacity="0.4" fontSize="8" fontFamily="monospace">OUTPUT</text>
      <line x1="150" y1="205" x2="150" y2="230" stroke="#D4A849" strokeWidth="0.5" opacity="0.3" />
      <rect x="40" y="230" width="220" height="30" rx="8" fill="#D4A849" fillOpacity="0.1" stroke="#D4A849" strokeWidth="0.5" opacity="0.4" />
      <text x="150" y="249" textAnchor="middle" fill="#D4A849" opacity="0.7" fontSize="9" fontFamily="monospace">DEPLOY</text>
    </svg>
  );
}

function ArchitectureStacksSVG() {
  return (
    <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
      <rect x="20" y="20" width="260" height="60" rx="6" fill="#D4A849" fillOpacity="0.06" stroke="#D4A849" strokeWidth="0.3" opacity="0.3" />
      <text x="150" y="50" textAnchor="middle" fill="#D4A849" opacity="0.5" fontSize="8" fontFamily="monospace">PRESENTATION LAYER</text>
      <text x="150" y="64" textAnchor="middle" fill="#D4A849" opacity="0.25" fontSize="7" fontFamily="monospace">Next.js - Tailwind - Framer</text>
      <rect x="20" y="90" width="260" height="60" rx="6" fill="#D4A849" fillOpacity="0.05" stroke="#D4A849" strokeWidth="0.3" opacity="0.25" />
      <text x="150" y="120" textAnchor="middle" fill="#D4A849" opacity="0.45" fontSize="8" fontFamily="monospace">APPLICATION LAYER</text>
      <text x="150" y="134" textAnchor="middle" fill="#D4A849" opacity="0.22" fontSize="7" fontFamily="monospace">API - Auth - Serverless</text>
      <rect x="20" y="160" width="260" height="60" rx="6" fill="#D4A849" fillOpacity="0.04" stroke="#D4A849" strokeWidth="0.3" opacity="0.2" />
      <text x="150" y="190" textAnchor="middle" fill="#D4A849" opacity="0.4" fontSize="8" fontFamily="monospace">DATA LAYER</text>
      <text x="150" y="204" textAnchor="middle" fill="#D4A849" opacity="0.2" fontSize="7" fontFamily="monospace">Database - Cache - Queue</text>
      <rect x="20" y="230" width="260" height="60" rx="6" fill="#D4A849" fillOpacity="0.03" stroke="#D4A849" strokeWidth="0.3" opacity="0.15" />
      <text x="150" y="260" textAnchor="middle" fill="#D4A849" opacity="0.35" fontSize="8" fontFamily="monospace">INFRASTRUCTURE</text>
      <text x="150" y="274" textAnchor="middle" fill="#D4A849" opacity="0.18" fontSize="7" fontFamily="monospace">Cloud - CDN - Monitoring</text>
    </svg>
  );
}

function PhasesSVG() {
  return (
    <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
      {[
        {x:30,y:20,w:240,h:50,label:"DISCOVER",sub:"Research & Audit",op:0.1},
        {x:30,y:80,w:240,h:50,label:"STRATEGY",sub:"Planning & Design",op:0.08},
        {x:30,y:140,w:240,h:50,label:"BUILD",sub:"Development & Launch",op:0.07},
        {x:30,y:200,w:240,h:50,label:"OPTIMISE",sub:"Analyse & Iterate",op:0.06},
        {x:30,y:260,w:240,h:50,label:"SCALE",sub:"Grow & Expand",op:0.05},
      ].map((p,i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="8" fill="#D4A849" fillOpacity={p.op} stroke="#D4A849" strokeWidth="0.3" opacity={0.2+i*0.03} />
          <text x={p.x+20} y={p.y+22} fill="#D4A849" opacity={0.7-i*0.06} fontSize="8" fontFamily="monospace">{`0${i+1}`}</text>
          <text x={p.x+42} y={p.y+22} fill="#D4A849" opacity={0.5-i*0.03} fontSize="9" fontFamily="monospace" fontWeight="600">{p.label}</text>
          <text x={p.x+42} y={p.y+38} fill="#D4A849" opacity={0.25} fontSize="7" fontFamily="monospace">{p.sub}</text>
          {i<4 && <line x1={p.x+p.w/2} y1={p.y+p.h} x2={p.x+p.w/2} y2={p.y+p.h+5} stroke="#D4A849" strokeWidth="0.3" opacity="0.15" />}
        </g>
      ))}
    </svg>
  );
}

function MapSVG() {
  return (
    <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
      <rect x="20" y="20" width="260" height="280" rx="16" stroke="#D4A849" strokeWidth="0.5" opacity="0.3" fill="#D4A849" fillOpacity="0.02" />
      {[{x:50,y:80,l:"LOC A"},{x:100,y:140,l:"LOC B"},{x:200,y:60,l:"LOC C"},{x:230,y:180,l:"LOC D"},{x:80,y:240,l:"LOC E"},{x:180,y:260,l:"LOC F"}].map((loc,i) => (
        <g key={i}>
          <circle cx={loc.x} cy={loc.y} r="6" fill="#D4A849" fillOpacity={0.15+i*0.02} stroke="#D4A849" strokeWidth="0.5" opacity={0.4+i*0.04} />
          <text x={loc.x+12} y={loc.y+3} fill="#D4A849" opacity={0.3+i*0.03} fontSize="7" fontFamily="monospace">{loc.l}</text>
        </g>
      ))}
      {[[0,1],[1,3],[2,3],[2,0],[1,4],[3,5],[4,5],[0,4]].map((e,i) => {
        const locs = [{x:50,y:80},{x:100,y:140},{x:200,y:60},{x:230,y:180},{x:80,y:240},{x:180,y:260}];
        return <line key={i} x1={locs[e[0]].x} y1={locs[e[0]].y} x2={locs[e[1]].x} y2={locs[e[1]].y} stroke="#D4A849" strokeWidth="0.3" opacity="0.12" strokeDasharray="3 3" />;
      })}
      <text x="150" y="304" textAnchor="middle" fill="#D4A849" opacity="0.12" fontSize="7" fontFamily="monospace">MULTI-LOCATION NETWORK</text>
    </svg>
  );
}

function LocalPackSVG() {
  return (
    <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
      <rect x="20" y="20" width="260" height="280" rx="12" stroke="#D4A849" strokeWidth="0.5" opacity="0.4" fill="#D4A849" fillOpacity="0.02" />
      <rect x="35" y="38" width="60" height="10" rx="3" fill="#D4A849" fillOpacity="0.1" />
      <rect x="35" y="56" width="100" height="5" rx="2" fill="#D4A849" fillOpacity="0.05" />
      <rect x="35" y="75" width="230" height="55" rx="6" stroke="#D4A849" strokeWidth="0.4" opacity="0.25" fill="#D4A849" fillOpacity="0.05" />
      <circle cx="55" cy="96" r="12" fill="#D4A849" fillOpacity="0.08" stroke="#D4A849" strokeWidth="0.3" opacity="0.3" />
      <text x="55" y="100" textAnchor="middle" fill="#D4A849" opacity="0.4" fontSize="8" fontFamily="monospace">M</text>
      <text x="78" y="94" fill="#D4A849" opacity="0.5" fontSize="8" fontFamily="monospace">Your Business</text>
      <text x="78" y="107" fill="#D4A849" opacity="0.25" fontSize="6" fontFamily="monospace">***** 4.9 - 128 reviews</text>
      <rect x="35" y="140" width="230" height="45" rx="6" stroke="#D4A849" strokeWidth="0.3" opacity="0.15" fill="#D4A849" fillOpacity="0.03" />
      <text x="50" y="160" fill="#D4A849" opacity="0.35" fontSize="8" fontFamily="monospace">Competitor A</text>
      <text x="50" y="173" fill="#D4A849" opacity="0.18" fontSize="6" fontFamily="monospace">****- 4.2 - 64 reviews</text>
      <rect x="35" y="193" width="230" height="45" rx="6" stroke="#D4A849" strokeWidth="0.3" opacity="0.12" fill="#D4A849" fillOpacity="0.02" />
      <text x="50" y="213" fill="#D4A849" opacity="0.3" fontSize="8" fontFamily="monospace">Competitor B</text>
      <text x="50" y="226" fill="#D4A849" opacity="0.15" fontSize="6" fontFamily="monospace">****- 4.0 - 42 reviews</text>
      <text x="150" y="268" textAnchor="middle" fill="#D4A849" opacity="0.15" fontSize="7" fontFamily="monospace">LOCAL PACK - TOP 3 RESULTS</text>
      <text x="150" y="284" textAnchor="middle" fill="#D4A849" opacity="0.1" fontSize="6" fontFamily="monospace">Google Maps Integration</text>
    </svg>
  );
}

function FunnelBarsSVG() {
  return (
    <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
      <rect x="20" y="20" width="260" height="280" rx="12" stroke="#D4A849" strokeWidth="0.5" opacity="0.3" fill="#D4A849" fillOpacity="0.01" />
      {[
        {label:"Visitors",pct:100,val:"10,000",op:0.12},
        {label:"Leads",pct:72,val:"1,200",op:0.1},
        {label:"Qualified",pct:55,val:"480",op:0.08},
        {label:"Proposal",pct:35,val:"180",op:0.06},
        {label:"Closed",pct:20,val:"72",op:0.05},
      ].map((r,i) => {
        const y = 45+i*50;
        return (
          <g key={i}>
            <text x="40" y={y+12} fill="#D4A849" opacity={0.4} fontSize="8" fontFamily="monospace">{r.label}</text>
            <rect x="40" y={y+18} width={r.pct*1.8} height="14" rx="4" fill="#D4A849" fillOpacity={r.op} stroke="#D4A849" strokeWidth="0.3" opacity={0.2} />
            <text x={Math.min(r.pct*1.8+48,250)} y={y+29} fill="#D4A849" opacity={0.35} fontSize="7" fontFamily="monospace">{r.val}</text>
            {i>0 && <line x1="40" y1={y+8} x2={40+(r.pct*1.8)/2} y2={y+8} stroke="#D4A849" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 2" />}
          </g>
        );
      })}
    </svg>
  );
}

function BeforeAfterSVG() {
  return (
    <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
      <rect x="20" y="20" width="260" height="280" rx="12" stroke="#D4A849" strokeWidth="0.5" opacity="0.3" fill="#D4A849" fillOpacity="0.01" />
      <rect x="35" y="40" width="110" height="120" rx="8" stroke="#D4A849" strokeWidth="0.4" opacity="0.2" fill="#D4A849" fillOpacity="0.03" />
      <text x="90" y="62" textAnchor="middle" fill="#D4A849" opacity="0.35" fontSize="9" fontFamily="monospace">BEFORE</text>
      <text x="90" y="85" textAnchor="middle" fill="#D4A849" opacity="0.12" fontSize="24" fontFamily="monospace">2.1%</text>
      <text x="90" y="100" textAnchor="middle" fill="#D4A849" opacity="0.2" fontSize="7" fontFamily="monospace">Conversion</text>
      <text x="90" y="125" textAnchor="middle" fill="#D4A849" opacity="0.1" fontSize="20" fontFamily="monospace">42s</text>
      <text x="90" y="140" textAnchor="middle" fill="#D4A849" opacity="0.18" fontSize="7" fontFamily="monospace">Load Time</text>
      <rect x="155" y="40" width="110" height="120" rx="8" stroke="#D4A849" strokeWidth="0.5" opacity="0.35" fill="#D4A849" fillOpacity="0.06" />
      <text x="210" y="62" textAnchor="middle" fill="#D4A849" opacity="0.6" fontSize="9" fontFamily="monospace">AFTER</text>
      <text x="210" y="85" textAnchor="middle" fill="#D4A849" opacity="0.3" fontSize="24" fontFamily="monospace">5.8%</text>
      <text x="210" y="100" textAnchor="middle" fill="#D4A849" opacity="0.4" fontSize="7" fontFamily="monospace">Conversion</text>
      <text x="210" y="125" textAnchor="middle" fill="#D4A849" opacity="0.25" fontSize="20" fontFamily="monospace">1.2s</text>
      <text x="210" y="140" textAnchor="middle" fill="#D4A849" opacity="0.35" fontSize="7" fontFamily="monospace">Load Time</text>
      <line x1="145" y1="40" x2="145" y2="160" stroke="#D4A849" strokeWidth="0.3" opacity="0.15" strokeDasharray="4 4" />
      <text x="150" y="175" textAnchor="middle" fill="#D4A849" opacity="0.1" fontSize="6" fontFamily="monospace">VS</text>
      <line x1="35" y1="178" x2="265" y2="178" stroke="#D4A849" strokeWidth="0.2" opacity="0.1" />
      {[
        {label:"Lead Quality",before:34,after:78},
        {label:"Page Speed",before:22,after:91},
        {label:"Mobile UX",before:45,after:85},
        {label:"SEO Score",before:38,after:82},
      ].map((m,i) => {
        const y = 195+i*28;
        return (
          <g key={i}>
            <text x="50" y={y+4} fill="#D4A849" opacity={0.25} fontSize="6" fontFamily="monospace">{m.label}</text>
            <rect x="50" y={y+8} width={m.before*0.85} height="6" rx="3" fill="#D4A849" fillOpacity="0.05" />
            <rect x="50" y={y+8} width={m.after*0.85} height="6" rx="3" fill="#D4A849" fillOpacity="0.15" />
          </g>
        );
      })}
    </svg>
  );
}

function DataSourcesSVG() {
  return (
    <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
      <rect x="20" y="20" width="260" height="280" rx="12" stroke="#D4A849" strokeWidth="0.5" opacity="0.3" fill="#D4A849" fillOpacity="0.01" />
      {[
        {x:60,y:45,l:"CRM",op:0.12},{x:150,y:35,l:"ADS",op:0.1},{x:240,y:45,l:"SEO",op:0.11},
        {x:40,y:110,l:"EMAIL",op:0.08},{x:150,y:100,l:"SOCIAL",op:0.09},{x:260,y:110,l:"ANALYTICS",op:0.1},
        {x:100,y:180,l:"SUPPORT",op:0.07},{x:200,y:180,l:"SALES",op:0.08},{x:150,y:250,l:"UNIFIED DATA",op:0.15},
      ].map((d,i) => {
        const isHub = i===8;
        const size = isHub ? 80 : 50;
        return (
          <g key={i}>
            <rect x={d.x-size/2} y={d.y-14} width={size} height="28" rx="6" fill="#D4A849" fillOpacity={d.op} stroke="#D4A849" strokeWidth={isHub ? 0.6 : 0.3} opacity={isHub ? 0.5 : 0.2} />
            <text x={d.x} y={d.y+4} textAnchor="middle" fill="#D4A849" opacity={isHub ? 0.7 : 0.35} fontSize={isHub ? 8 : 7} fontFamily="monospace">{d.l}</text>
            {i<8 && <line x1={d.x} y1={d.y+14} x2={150} y2={250-14} stroke="#D4A849" strokeWidth="0.3" opacity="0.08" strokeDasharray="3 3" />}
          </g>
        );
      })}
    </svg>
  );
}

function PortalUISVG() {
  return (
    <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
      <rect x="20" y="20" width="260" height="280" rx="12" stroke="#D4A849" strokeWidth="0.5" opacity="0.3" fill="#D4A849" fillOpacity="0.02" />
      <rect x="25" y="22" width="250" height="36" rx="8" fill="#D4A849" fillOpacity="0.05" stroke="#D4A849" strokeWidth="0.2" opacity="0.15" />
      <circle cx="42" cy="40" r="6" fill="#D4A849" fillOpacity="0.15" />
      <text x="58" y="44" fill="#D4A849" opacity="0.4" fontSize="8" fontFamily="monospace">Client Portal</text>
      <rect x="245" y="31" width="20" height="18" rx="4" stroke="#D4A849" strokeWidth="0.3" opacity="0.15" />
      <text x="255" y="43" textAnchor="middle" fill="#D4A849" opacity="0.2" fontSize="8" fontFamily="monospace">X</text>
      <rect x="35" y="70" width="230" height="40" rx="6" fill="#D4A849" fillOpacity="0.04" stroke="#D4A849" strokeWidth="0.3" opacity="0.12" />
      <text x="50" y="88" fill="#D4A849" opacity="0.3" fontSize="7" fontFamily="monospace">Dashboard</text>
      <text x="200" y="88" textAnchor="end" fill="#D4A849" opacity="0.18" fontSize="6" fontFamily="monospace">Last login: today</text>
      <rect x="35" y="120" width="230" height="30" rx="4" fill="#D4A849" fillOpacity="0.03" stroke="#D4A849" strokeWidth="0.2" opacity="0.08" />
      <rect x="42" y="126" width="80" height="18" rx="3" fill="#D4A849" fillOpacity="0.15" />
      <text x="82" y="139" textAnchor="middle" fill="#D4A849" opacity="0.5" fontSize="7" fontFamily="monospace">Documents</text>
      <rect x="128" y="126" width="60" height="18" rx="3" fill="#D4A849" fillOpacity="0.06" />
      <text x="158" y="139" textAnchor="middle" fill="#D4A849" opacity="0.25" fontSize="7" fontFamily="monospace">Messages</text>
      <rect x="194" y="126" width="60" height="18" rx="3" fill="#D4A849" fillOpacity="0.06" />
      <text x="224" y="139" textAnchor="middle" fill="#D4A849" opacity="0.25" fontSize="7" fontFamily="monospace">Reports</text>
      <rect x="35" y="160" width="105" height="60" rx="6" fill="#D4A849" fillOpacity="0.04" stroke="#D4A849" strokeWidth="0.3" opacity="0.1" />
      <text x="87" y="182" textAnchor="middle" fill="#D4A849" opacity="0.3" fontSize="7" fontFamily="monospace">Files</text>
      <text x="87" y="200" textAnchor="middle" fill="#D4A849" opacity="0.12" fontSize="10" fontFamily="monospace">24</text>
      <rect x="160" y="160" width="105" height="60" rx="6" fill="#D4A849" fillOpacity="0.04" stroke="#D4A849" strokeWidth="0.3" opacity="0.1" />
      <text x="212" y="182" textAnchor="middle" fill="#D4A849" opacity="0.3" fontSize="7" fontFamily="monospace">Projects</text>
      <text x="212" y="200" textAnchor="middle" fill="#D4A849" opacity="0.12" fontSize="10" fontFamily="monospace">6</text>
      <rect x="35" y="230" width="230" height="40" rx="6" fill="#D4A849" fillOpacity="0.06" stroke="#D4A849" strokeWidth="0.3" opacity="0.15" />
      <text x="150" y="252" textAnchor="middle" fill="#D4A849" opacity="0.35" fontSize="8" fontFamily="monospace">Recent Activity</text>
      <text x="150" y="263" textAnchor="middle" fill="#D4A849" opacity="0.15" fontSize="6" fontFamily="monospace">3 new files uploaded today</text>
    </svg>
  );
}

function ReputationGraphSVG() {
  return (
    <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
      <rect x="20" y="20" width="260" height="280" rx="12" stroke="#D4A849" strokeWidth="0.5" opacity="0.3" fill="#D4A849" fillOpacity="0.01" />
      <defs>
        <linearGradient id="repGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4A849" stopOpacity="0.25" /><stop offset="100%" stopColor="#D4A849" stopOpacity="0" /></linearGradient>
      </defs>
      <text x="40" y="50" fill="#D4A849" opacity="0.4" fontSize="8" fontFamily="monospace">REPUTATION SCORE</text>
      <text x="260" y="50" textAnchor="end" fill="#D4A849" opacity="0.6" fontSize="10" fontFamily="monospace">87</text>
      <path d="M40 80 L60 78 L80 85 L100 82 L120 75 L140 70 L160 65 L180 60 L200 50 L220 42 L240 38 L260 32" stroke="#D4A849" strokeWidth="1.2" opacity="0.6" fill="none" />
      <path d="M40 80 L60 78 L80 85 L100 82 L120 75 L140 70 L160 65 L180 60 L200 50 L220 42 L240 38 L260 32 L260 120 L40 120Z" fill="url(#repGrad)" />
      {[{x:40,l:"Jan"},{x:84,l:"Feb"},{x:128,l:"Mar"},{x:172,l:"Apr"},{x:216,l:"May"},{x:260,l:"Jun"}].map((m,i) => (
        <text key={i} x={m.x} y="132" textAnchor="middle" fill="#D4A849" opacity={0.15} fontSize="6" fontFamily="monospace">{m.l}</text>
      ))}
      <rect x="40" y="145" width="230" height="30" rx="6" fill="#D4A849" fillOpacity="0.04" stroke="#D4A849" strokeWidth="0.3" opacity="0.1" />
      <text x="55" y="163" fill="#D4A849" opacity="0.3" fontSize="7" fontFamily="monospace">Reviews: 128</text>
      <text x="155" y="163" textAnchor="middle" fill="#D4A849" opacity={0.25} fontSize="7" fontFamily="monospace">Rating: 4.7</text>
      <text x="255" y="163" textAnchor="end" fill="#D4A849" opacity={0.3} fontSize="7" fontFamily="monospace">-- 23%</text>
      <rect x="40" y="185" width="230" height="30" rx="6" fill="#D4A849" fillOpacity="0.03" stroke="#D4A849" strokeWidth="0.3" opacity="0.08" />
      <text x="55" y="203" fill="#D4A849" opacity={0.25} fontSize="7" fontFamily="monospace">Citations: 42</text>
      <text x="155" y="203" textAnchor="middle" fill="#D4A849" opacity={0.2} fontSize="7" fontFamily="monospace">Sentiment: 92%</text>
      <text x="255" y="203" textAnchor="end" fill="#D4A849" opacity={0.25} fontSize="7" fontFamily="monospace">-- 12%</text>
      <text x="150" y="250" textAnchor="middle" fill="#D4A849" opacity={0.1} fontSize="6" fontFamily="monospace">REPUTATION TRACKING - 6 MONTHS</text>
    </svg>
  );
}


/* -- SHARED SECTION COMPONENTS -- */

function SectionHeader({ label, title, accent, desc }: { label: string; title: string; accent: string; desc?: string }) {
  return (
    <FadeIn className="max-w-2xl mb-14">
      <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">{label}</span>
      <h2 className="font-display font-semibold text-[clamp(1.8rem,3vw,2.5rem)] tracking-[-0.025em] leading-[1.1] text-text-primary">
        {title} <span className="text-accent">{accent}</span>
      </h2>
      {desc && <p className="text-text-secondary leading-relaxed mt-4 text-sm">{desc}</p>}
    </FadeIn>
  );
}

function ExploreOtherNavigator({ currentSlug }: { currentSlug: string }) {
  const others = solutions.filter((s) => s.slug !== currentSlug);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const industryTags: Record<string, string> = {
    "generate-more-qualified-leads": "Revenue Growth",
    "improve-search-visibility": "Organic Growth",
    "become-visible-in-ai-search": "AI Readiness",
    "reduce-manual-work-automation": "Efficiency",
    "build-custom-crm": "Software",
    "launch-digital-product": "Product Dev",
    "grow-multi-location-business": "Local Scale",
    "improve-local-visibility": "Local SEO",
    "improve-conversion-rates": "CRO",
    "modernise-existing-website": "Web Dev",
    "connect-marketing-sales-data": "Analytics",
    "build-client-portal": "Client Experience",
    "improve-online-reputation": "Brand",
  };

  const timeframes: Record<string, string> = {
    "generate-more-qualified-leads": "90 days",
    "improve-search-visibility": "120 days",
    "become-visible-in-ai-search": "60 days",
    "reduce-manual-work-automation": "45 days",
    "build-custom-crm": "90 days",
    "launch-digital-product": "120 days",
    "grow-multi-location-business": "180 days",
    "improve-local-visibility": "60 days",
    "improve-conversion-rates": "60 days",
    "modernise-existing-website": "90 days",
    "connect-marketing-sales-data": "60 days",
    "build-client-portal": "90 days",
    "improve-online-reputation": "90 days",
  };

  const outcomes: Record<string, string> = {
    "generate-more-qualified-leads": "Steady pipeline of high-intent prospects",
    "improve-search-visibility": "Dominant first-page presence for key terms",
    "become-visible-in-ai-search": "Referenced by ChatGPT, Perplexity & AI Overviews",
    "reduce-manual-work-automation": "80%+ reduction in repetitive manual tasks",
    "build-custom-crm": "CRM that matches your exact sales process",
    "launch-digital-product": "Scalable digital product from concept to launch",
    "grow-multi-location-business": "Consistent visibility across every location",
    "improve-local-visibility": "Top 3 local pack for your service area",
    "improve-conversion-rates": "2-3x improvement in conversion rates",
    "modernise-existing-website": "Fast, secure, modern website built for growth",
    "connect-marketing-sales-data": "Single source of truth for revenue data",
    "build-client-portal": "Professional client experience with self-service",
    "improve-online-reputation": "Positive brand sentiment across all platforms",
  };

  const bestFors: Record<string, string> = {
    "generate-more-qualified-leads": "B2B & professional services",
    "improve-search-visibility": "Struggling organic performers",
    "become-visible-in-ai-search": "Forward-looking brands",
    "reduce-manual-work-automation": "Growing teams",
    "build-custom-crm": "Unique sales processes",
    "launch-digital-product": "Founders & product teams",
    "grow-multi-location-business": "Multi-location chains",
    "improve-local-visibility": "Local service businesses",
    "improve-conversion-rates": "High-traffic low-conversion sites",
    "modernise-existing-website": "Legacy website owners",
    "connect-marketing-sales-data": "Data-driven leaders",
    "build-client-portal": "Agencies & consultants",
    "improve-online-reputation": "Review-sensitive businesses",
  };

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={"explore-" + currentSlug} />
        <BgRadial position="br" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="Explore"
          title="Other solutions that might"
          accent="fit."
          desc="Every solution is a connected system. Choose another path to explore."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {others.map((sol, i) => {
            const Icon = (iconMap[sol.icon] || Target) as React.ComponentType<any>;
            const isHovered = hoveredCard === sol.slug;
            return (
              <motion.div
                key={sol.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03, ease }}
                onMouseEnter={() => setHoveredCard(sol.slug)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Link href={"/" + sol.slug} className="group block h-full">
                  <motion.div
                    className="relative h-full bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 transition-all duration-500 overflow-hidden"
                    animate={{ y: isHovered ? -6 : 0 }}
                    style={{ boxShadow: isHovered ? "0 12px 40px rgba(212,168,73,0.06)" : "0 2px 12px rgba(0,0,0,0.15)" }}
                  >
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ boxShadow: "inset 0 0 24px rgba(212,168,73,0.04)" }}
                      />
                    )}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex items-start justify-between mb-3">
                      <Icon size={20} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                      <div className="flex gap-1">
                        <span className="text-[8px] font-mono text-accent/60 px-1.5 py-0.5 rounded-full border border-accent/20 bg-accent/5">
                          {industryTags[sol.slug] || "Growth"}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-white group-hover:text-accent transition-colors duration-300 mb-1.5">{sol.name}</h3>
                    <p className="text-[11px] text-text-secondary leading-relaxed mb-3 line-clamp-2">{outcomes[sol.slug] || sol.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      <span className="text-[8px] font-mono text-text-secondary/40 px-2 py-0.5 rounded-full border border-accent/15">
                        {bestFors[sol.slug] || "All businesses"}
                      </span>
                      <span className="text-[8px] font-mono text-accent/40 px-2 py-0.5 rounded-full border border-accent/15">
                        {timeframes[sol.slug] || "60 days"}
                      </span>
                    </div>
                    <motion.span
                      className="inline-flex items-center gap-1 text-[10px] text-accent/60 mt-3"
                      animate={{ gap: isHovered ? "6px" : "4px" }}
                    >
                      Explore <ArrowRight size={9} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </motion.span>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MetricsDashboard({ metrics }: {
  metrics: { label: string; value: string; suffix: string; sub: string; icon: string }[];
}) {
  const [activeMetric, setActiveMetric] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={"metrics-" + (metrics[0]?.label || "default")} />
        <BgRadial position="center" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label="Dashboard" title="Performance" accent="metrics." desc="Real-time KPI tracking for your growth system." />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {metrics.map((m, i) => {
            const Icon = (iconMap[m.icon] || Target) as React.ComponentType<any>;
            const isActive = activeMetric === i;
            return (
              <motion.div
                key={m.label}
                onMouseEnter={() => setActiveMetric(i)}
                onMouseLeave={() => setActiveMetric(null)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <PanelCard className={"p-5 lg:p-6 transition-all duration-500 " + (isActive ? "border-accent/60" : "")}>
                  <Icon size={16} className="text-accent mb-3" />
                  <span className="text-[10px] font-mono text-[rgba(255,255,255,0.60)] tracking-wider uppercase block mb-1">{m.label}</span>
                  <span className="font-display text-[clamp(1.6rem,2.5vw,2.2rem)] font-semibold text-accent leading-none block">
                    <AnimatedCounter target={parseInt(m.value)} />{m.suffix}
                  </span>
                  <span className="text-[11px] text-[rgba(255,255,255,0.50)] font-mono mt-1 block">{m.sub}</span>
                </PanelCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function TimelineSection({ steps, label = "Timeline", title = "Your", accent = "roadmap." }: {
  steps: { week: string; title: string; desc: string }[];
  label?: string;
  title?: string;
  accent?: string;
}) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={"timeline-" + (steps[0]?.week || "default")} />
        <BgRadial position="bl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label={label} title={title} accent={accent} desc="A structured timeline from kickoff to results." />

        <div className="hidden lg:block relative">
          <div className="absolute top-8 bottom-8 left-[148px] w-px bg-gradient-to-b from-accent/0 via-accent/20 to-accent/0" />
          <div className="space-y-6">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <motion.div
                  key={step.week}
                  className="flex items-start gap-6 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease }}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div className="w-[120px] shrink-0 text-right">
                    <span className={"font-mono text-sm transition-colors duration-300 " + (isActive ? "text-accent" : "text-text-secondary/50")}>{step.week}</span>
                  </div>
                  <motion.div
                    className="relative z-10 shrink-0"
                    animate={{ scale: isActive ? 1.3 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={"w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500 " + (isActive ? "bg-accent/20 border-accent/70 shadow-lg shadow-accent/10" : "bg-[#181818] border-accent/30")}>
                      <div className={"w-1.5 h-1.5 rounded-full transition-colors duration-300 " + (isActive ? "bg-accent" : "bg-accent/30")} />
                    </div>
                  </motion.div>
                  <motion.div
                    className={"flex-1 bg-[#181818] border rounded-xl p-5 transition-all duration-500 " + (isActive ? "border-accent/50 shadow-lg" : "border-accent/20")}
                    animate={{ y: isActive ? -2 : 0 }}
                  >
                    <h4 className="text-sm font-medium text-white mb-1">{step.title}</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="lg:hidden space-y-3">
          {steps.map((step, i) => {
            const isActive = activeStep === i;
            return (
              <motion.div
                key={step.week}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04, ease }}
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className={"bg-[#181818] border rounded-xl p-4 transition-all duration-500 " + (isActive ? "border-accent/50" : "border-accent/20")}>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={"font-mono text-[11px] transition-colors duration-300 " + (isActive ? "text-accent" : "text-text-secondary/50")}>{step.week}</span>
                    <div className={"w-2 h-2 rounded-full transition-colors duration-300 " + (isActive ? "bg-accent" : "bg-accent/30")} />
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1">{step.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={"faq-" + (items[0]?.q?.slice(0, 10) || "default")} />
        <BgRadial position="tl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label="FAQ" title="Frequently asked" accent="questions." desc="Everything you need to know about this solution." />
        <div className="max-w-3xl mx-auto space-y-2">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03, ease }}
                className="bg-[#181818] border border-accent/20 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-4 lg:p-5 text-left"
                >
                  <span className="text-sm font-medium text-white pr-4">{item.q}</span>
                  <div className={"shrink-0 w-6 h-6 rounded-full border border-accent/30 flex items-center justify-center transition-all duration-300 " + (isOpen ? "bg-accent/20 border-accent/60" : "")}>
                    {isOpen ? <X size={10} className="text-accent/80" /> : <Plus size={10} className="text-accent/60" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 lg:px-5 pb-4 lg:pb-5">
                        <p className="text-xs lg:text-sm text-text-secondary leading-relaxed">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DeliverablesGrid({ items }: { items: { title: string; desc: string; icon: string }[] }) {
  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={"deliverables-" + (items[0]?.title || "default")} />
        <BgRadial position="tr" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label="Deliverables" title="What you" accent="receive." desc="Every engagement comes with a complete set of deliverables." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, i) => {
            const Icon = (iconMap[item.icon] || Target) as React.ComponentType<any>;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04, ease }}
                whileHover={{ y: -4 }}
              >
                <PanelCard className="p-5 lg:p-6 h-full group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </PanelCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function IndustriesGrid({ industries }: { industries: { name: string; icon: string; desc: string }[] }) {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={"industries-" + (industries[0]?.name || "default")} />
        <BgRadial position="bl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label="Industries" title="Who this" accent="helps." desc="This solution delivers specific value in these industries." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {industries.map((ind, i) => {
            const Icon = (iconMap[ind.icon] || Target) as React.ComponentType<any>;
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04, ease }}
                whileHover={{ y: -4 }}
              >
                <PanelCard className="p-5 h-full group">
                  <Icon size={24} className="text-accent/60 group-hover:text-accent transition-colors duration-300 mb-3" />
                  <h3 className="text-sm font-medium text-white mb-1">{ind.name}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{ind.desc}</p>
                </PanelCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function ConnectedServicesFlow({ services }: { services: { name: string; desc: string }[] }) {
  if (services.length === 0) return null;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={"connected-" + (services[0]?.name || "default")} />
        <BgRadial position="center" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label="System" title="Connected" accent="services." desc="How this solution integrates with our full service ecosystem." />
        <div className="relative">
          <div className="hidden lg:flex items-start justify-between gap-4">
            {services.map((svc, i) => {
              const isHovered = hoveredIndex === i;
              const isPrevHovered = hoveredIndex !== null && hoveredIndex === i - 1;
              return (
                <motion.div
                  key={svc.name}
                  className="flex-1"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease }}
                >
                  <motion.div
                    className="text-center"
                    animate={{ y: isHovered ? -4 : 0 }}
                  >
                    <div className={"relative bg-[#181818] border rounded-xl p-4 transition-all duration-500 " + (isHovered ? "border-accent/60 shadow-lg" : "border-accent/25")}>
                      <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-2">
                        <span className="text-xs font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <h4 className="text-xs font-medium text-white mb-1">{svc.name}</h4>
                      <p className="text-[10px] text-text-secondary leading-relaxed">{svc.desc}</p>
                    </div>
                  </motion.div>
                  {i < services.length - 1 && (
                    <div className="flex items-center justify-center py-2">
                      <ArrowRight size={14} className={"transition-all duration-300 " + (isHovered || isPrevHovered ? "text-accent opacity-60" : "text-text-secondary/20")} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="lg:hidden overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4">
            <div className="flex gap-4 w-max">
              {services.map((svc, i) => (
                <motion.div
                  key={svc.name}
                  className="snap-center w-[220px] shrink-0"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease }}
                >
                  <PanelCard className="p-4">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center mb-2">
                      <span className="text-xs font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h4 className="text-xs font-medium text-white mb-1">{svc.name}</h4>
                    <p className="text-[10px] text-text-secondary leading-relaxed">{svc.desc}</p>
                  </PanelCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolsShowcase({ toolSlugs }: { toolSlugs: string[] }) {
  const toolData: Record<string, { name: string; desc: string; icon: string }> = {
    "seo-audit": { name: "SEO Audit", desc: "Comprehensive site analysis with actionable recommendations.", icon: "MagnifyingGlass" },
    "ads-calculator": { name: "Ads Calculator", desc: "ROI forecasting for paid media campaigns.", icon: "CurrencyCircleDollar" },
    "content-brief": { name: "Content Brief", desc: "AI-generated content briefs for writers.", icon: "Files" },
    "technical-seo-checker": { name: "Technical SEO Checker", desc: "Identify crawl, index, and rendering issues.", icon: "Gear" },
    "serp-preview": { name: "SERP Preview", desc: "See how your listing appears in search results.", icon: "Binoculars" },
    "geo-readiness": { name: "GEO Readiness", desc: "Assess your brand's AI search discoverability.", icon: "Robot" },
    "ai-visibility": { name: "AI Visibility", desc: "Track mentions across AI platforms.", icon: "ChartLineUp" },
    "local-seo-audit": { name: "Local SEO Audit", desc: "Audit your GBP, citations, and local presence.", icon: "MapPin" },
    "landing-page-grader": { name: "Landing Page Grader", desc: "Score your landing pages for conversion potential.", icon: "ChartLineUp" },
  };

  const tools = toolSlugs.length > 0
    ? toolSlugs.map((slug) => toolData[slug]).filter(Boolean)
    : [
        { name: "Site Analyser", desc: "Deep technical and content analysis of your website.", icon: "MagnifyingGlass" },
        { name: "Speed Checker", desc: "Core Web Vitals and performance benchmarking.", icon: "Lightning" },
        { name: "Keyword Explorer", desc: "Discover high-opportunity keywords in your niche.", icon: "Binoculars" },
        { name: "Competitor Monitor", desc: "Track competitor movements and strategy changes.", icon: "ChartBar" },
        { name: "ROI Calculator", desc: "Project the ROI of your growth initiatives.", icon: "CurrencyCircleDollar" },
        { name: "Content Grader", desc: "Score your content for quality, relevance and SEO.", icon: "Files" },
      ];

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={"tools-" + (toolSlugs[0] || "generic")} />
        <BgRadial position="tr" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label="Tools" title="Free tools to" accent="get started." desc="Try these tools to begin diagnosing your current situation." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tools.map((tool, i) => {
            const Icon = (iconMap[tool.icon] || Target) as React.ComponentType<any>;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04, ease }}
                whileHover={{ y: -4 }}
              >
                <PanelCard className="p-5 h-full group">
                  <div className="flex items-start gap-3">
                    <Icon size={18} className="text-accent group-hover:scale-110 transition-transform duration-300 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-white mb-1">{tool.name}</h3>
                      <p className="text-xs text-text-secondary leading-relaxed">{tool.desc}</p>
                    </div>
                  </div>
                </PanelCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseStudyPreviews({ caseStudies: studies }: { caseStudies: { client: string; result: string; desc: string }[] }) {
  if (studies.length === 0) return null;
  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="casestudies" />
        <BgRadial position="br" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label="Case Studies" title="Real" accent="results." desc="See how we've delivered similar solutions for other businesses." />
        <div className="grid lg:grid-cols-3 gap-3">
          {studies.map((study, i) => (
            <motion.div
              key={study.client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
              whileHover={{ y: -4 }}
            >
              <PanelCard className="p-5 lg:p-6 h-full group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase">Case Study</span>
                  <span className="w-1 h-1 rounded-full bg-accent/30" />
                  <span className="text-[9px] font-mono text-text-secondary/50">{study.client}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{study.result}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{study.desc}</p>
              </PanelCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightsSection({ insights }: { insights: { title: string; tag: string; readTime: string; excerpt: string }[] }) {
  if (insights.length === 0) return null;
  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="insights" />
        <BgRadial position="bl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label="Insights" title="Related" accent="thinking." desc="Articles and guides relevant to this solution." />
        <div className="grid lg:grid-cols-3 gap-3">
          {insights.map((insight, i) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
              whileHover={{ y: -4 }}
            >
              <PanelCard className="p-5 lg:p-6 h-full group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase">{insight.tag}</span>
                  <span className="w-1 h-1 rounded-full bg-accent/30" />
                  <span className="text-[9px] font-mono text-text-secondary/50">{insight.readTime}</span>
                </div>
                <h3 className="text-sm font-medium text-white group-hover:text-accent transition-colors duration-300 mb-2 leading-snug">{insight.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{insight.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-[10px] text-accent/50 group-hover:text-accent transition-colors duration-300 mt-3">
                  Read article <ArrowRight size={9} />
                </span>
              </PanelCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,168,73,0.03), transparent)" }} />
      </div>
      <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
        <motion.h2 className="font-display font-semibold text-[clamp(1.8rem,3vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
        >
          Ready to get started?
        </motion.h2>
        <motion.p className="text-[rgba(255,255,255,0.72)] text-[15px] leading-relaxed mb-10 max-w-[42ch] mx-auto"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
        >
          Book a free discovery call. We will map out the right approach for your business - no pitch, just a plan.
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


/* -- HERO SECTION -- */

function HeroSection({ solution, visual }: { solution: SolutionItem; visual: React.ReactNode }) {
  const Icon = (iconMap[solution.icon] || Target) as React.ComponentType<any>;

  return (
    <section className="relative pt-36 pb-20 lg:pb-28 bg-ground overflow-hidden">
      <div className="absolute inset-0">
        <BgGrid id={"hero-" + solution.slug} />
        <BgRadial position="center" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/15" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.span
              className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-5 block"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              Solutions
            </motion.span>
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
            >
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/35 flex items-center justify-center">
                <Icon size={20} className="text-accent" />
              </div>
            </motion.div>
            <motion.h1
              className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.03em] leading-[0.95] text-text-primary"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease }}
            >
              {solution.name}
            </motion.h1>
            <motion.p
              className="text-text-secondary leading-relaxed max-w-[55ch] mt-5 text-sm lg:text-base"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease }}
            >
              {solution.description}
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center gap-3 mt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease }}
            >
              <GlassPill href="/contact">Book a discovery call</GlassPill>
              <GlassPill href="#process">View our process</GlassPill>
            </motion.div>
          </div>
          <motion.div
            className="hidden lg:block lg:col-span-4 lg:col-start-9"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/[0.03] rounded-2xl border border-accent/15" />
              <div className="relative bg-[#181818] border border-accent/25 rounded-[1.5rem] p-4">
                {visual}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -- PROBLEM SECTION -- */

function ProblemSection({ solution }: { solution: SolutionItem }) {
  return (
    <section className="relative py-16 lg:py-24 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={"problem-" + solution.slug} />
        <BgRadial position="tl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-7 space-y-8">
            <FadeIn>
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">The Problem</span>
              <h2 className="font-display font-semibold text-[clamp(1.8rem,3vw,2.5rem)] tracking-[-0.025em] leading-[1.1] text-text-primary mb-4">
                Why businesses <span className="text-accent">struggle.</span>
              </h2>
              <p className="text-text-secondary leading-relaxed">{solution.problem}</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Who it is for</span>
              <p className="text-text-secondary leading-relaxed">{solution.forWho}</p>
            </FadeIn>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <FadeIn delay={0.1}>
              <div className="bg-[#181818] border border-accent/25 rounded-[1.5rem] p-6 lg:p-8">
                <h3 className="font-display text-lg font-medium text-text-primary mb-6">Root Causes</h3>
                <div className="space-y-4">
                  {solution.symptoms.slice(0, 4).map((symptom, i) => (
                    <motion.div
                      key={symptom}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease }}
                    >
                      <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px] font-mono text-accent">{i + 1}</span>
                      </div>
                      <div>
                        <span className="text-xs text-text-secondary leading-relaxed">{symptom}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -- OPPORTUNITY SECTION -- */

function OpportunitySection({ metrics }: { metrics: { label: string; value: string; suffix: string; sub: string; icon: string }[] }) {
  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="opportunity" />
        <BgRadial position="br" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label="Opportunity" title="What" accent="improves." desc="The measurable impact this solution delivers for your business." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {metrics.map((m, i) => {
            const Icon = (iconMap[m.icon] || Target) as React.ComponentType<any>;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
                whileHover={{ y: -4 }}
              >
                <PanelCard className="p-5 lg:p-6 h-full group">
                  <Icon size={18} className="text-accent mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-display text-[clamp(1.6rem,2.5vw,2.2rem)] font-semibold text-accent leading-none block mb-1">
                    <AnimatedCounter target={parseInt(m.value)} />{m.suffix}
                  </span>
                  <span className="text-xs font-mono text-[rgba(255,255,255,0.60)] tracking-wider uppercase block mb-1">{m.label}</span>
                  <span className="text-[11px] text-text-secondary leading-relaxed block">{m.sub}</span>
                </PanelCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -- FRAMEWORK SECTION -- */

function FrameworkSection({ process, visual }: { process: { step: string; title: string; desc: string }[]; visual?: "timeline" | "pipeline" | "grid" | "tabs" | "cards" }) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const display = visual || "cards";

  return (
    <section id="process" className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={"framework-" + (process[0]?.step || "default")} />
        <BgRadial position="center" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label="Framework" title="Our" accent="process." desc="A proven methodology we follow for every engagement." />

        {display === "timeline" && (
          <div className="hidden lg:block relative">
            <div className="absolute top-8 bottom-8 left-1/2 w-px bg-gradient-to-b from-accent/0 via-accent/20 to-accent/0 -translate-x-1/2" />
            <div className="space-y-16">
              {process.map((step, i) => {
                const isActive = activeStep === i;
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step.step}
                    className={"flex items-center gap-8 " + (isLeft ? "flex-row" : "flex-row-reverse")}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.7, ease }}
                    onMouseEnter={() => setActiveStep(i)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <div className={"flex-1 " + (isLeft ? "text-right" : "text-left")}>
                      <motion.div
                        className={"inline-block bg-[#181818] border rounded-[1.5rem] p-6 transition-all duration-500 max-w-[380px] " + (isActive ? "border-accent/60 shadow-lg" : "border-accent/25")}
                        animate={{ y: isActive ? -6 : 0, scale: isActive ? 1.02 : 1 }}
                      >
                        <span className="text-[10px] font-mono text-accent/60 tracking-[0.12em] uppercase">{step.step}</span>
                        <h3 className="font-display text-[1.3rem] font-semibold text-white mb-2 mt-1">{step.title}</h3>
                        <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                      </motion.div>
                    </div>
                    <motion.div
                      className="relative z-10 shrink-0"
                      animate={{ scale: isActive ? 1.3 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={"w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 " + (isActive ? "bg-accent/20 border-accent/70 shadow-lg shadow-accent/10" : "bg-[#181818] border-accent/30")}>
                        <span className="text-xs font-mono text-accent/80">{step.step}</span>
                      </div>
                    </motion.div>
                    <div className="flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {display === "pipeline" && (
          <div className="hidden lg:block">
            <div className="flex items-start justify-between gap-4">
              {process.map((step, i) => {
                const isActive = activeStep === i;
                const isPrevActive = activeStep !== null && activeStep === i - 1;
                return (
                  <motion.div
                    key={step.step}
                    className="flex-1"
                    onMouseEnter={() => setActiveStep(i)}
                    onMouseLeave={() => setActiveStep(null)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease }}
                  >
                    <div className="text-center">
                      <motion.div
                        className={"inline-block bg-[#181818] border rounded-xl p-5 transition-all duration-500 " + (isActive ? "border-accent/60 shadow-lg" : "border-accent/25")}
                        animate={{ y: isActive ? -4 : 0 }}
                      >
                        <div className={"w-10 h-10 rounded-full border-2 flex items-center justify-center mx-auto mb-3 transition-all duration-500 " + (isActive ? "bg-accent/20 border-accent/70" : "bg-ground border-accent/30")}>
                          <span className="text-xs font-mono text-accent">{step.step}</span>
                        </div>
                        <h3 className="text-sm font-medium text-white mb-1">{step.title}</h3>
                        <p className="text-[11px] text-text-secondary leading-relaxed">{step.desc}</p>
                      </motion.div>
                    </div>
                    {i < process.length - 1 && (
                      <div className="flex items-center justify-center py-2">
                        <ArrowRight size={14} className={"transition-all duration-300 " + (isActive || isPrevActive ? "text-accent opacity-60" : "text-text-secondary/20")} />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {display === "grid" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {process.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease }}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                  whileHover={{ y: -4 }}
                >
                  <PanelCard className={"p-6 lg:p-8 h-full transition-all duration-500 " + (isActive ? "border-accent/60" : "")}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={"w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 " + (isActive ? "bg-accent/20 border-accent/70" : "bg-ground border-accent/30")}>
                        <span className="text-xs font-mono text-accent">{step.step}</span>
                      </div>
                      <span className="text-[10px] font-mono text-accent/60 tracking-[0.12em] uppercase">{step.step}</span>
                    </div>
                    <h3 className="font-display text-[1.2rem] font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                  </PanelCard>
                </motion.div>
              );
            })}
          </div>
        )}

        {(!display || display === "cards") && (
          <div className="grid sm:grid-cols-2 gap-4">
            {process.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease }}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                  whileHover={{ y: -4 }}
                >
                  <PanelCard className={"p-5 lg:p-6 h-full transition-all duration-500 " + (isActive ? "border-accent/60" : "")}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={"w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 " + (isActive ? "bg-accent/20 border-accent/70" : "bg-ground border-accent/30")}>
                        <span className="text-[10px] font-mono text-accent">{step.step}</span>
                      </div>
                      <span className="text-[10px] font-mono text-accent/60 tracking-[0.12em] uppercase">{step.step}</span>
                    </div>
                    <h3 className="font-display text-base font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                  </PanelCard>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="lg:hidden overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4 mt-6">
          <div className="flex gap-4 w-max">
            {process.map((step, i) => (
              <motion.div key={step.step} className="snap-center w-[260px] shrink-0"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04, ease }}
              >
                <PanelCard className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase">{step.step}</span>
                  </div>
                  <h3 className="font-display text-[1.1rem] font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                  <div className="flex gap-1 mt-3">
                    {process.map((_, j) => (
                      <div key={j} className={"w-1.5 h-1.5 rounded-full transition-colors duration-300 " + (j === i ? "bg-accent/60" : "bg-accent/15")} />
                    ))}
                  </div>
                </PanelCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* -- 13 UNIQUE SOLUTION PAGES -- */

function LeadsPage({ solution }: { solution: SolutionItem }) {
  const kpiMetrics = [
    { label: "Lead Volume", value: "312", suffix: "%", sub: "Average increase in qualified leads", icon: "Target" },
    { label: "Cost Per Lead", value: "40", suffix: "%", sub: "Reduction in acquisition cost", icon: "CurrencyCircleDollar" },
    { label: "Conversion Rate", value: "2.8", suffix: "x", sub: "Improvement in lead-to-customer", icon: "ChartLineUp" },
    { label: "Sales Time", value: "60", suffix: "%", sub: "Less time on unqualified leads", icon: "Clock" },
  ];

  const deliverables = [
    { title: "Lead Generation Strategy", desc: "Complete channel strategy document with budget allocation and KPI targets.", icon: "Files" },
    { title: "Landing Page Suite", desc: "5-7 optimised landing pages designed for conversion.", icon: "Lightning" },
    { title: "Lead Scoring Model", desc: "Automated qualification framework that routes leads to sales.", icon: "Graph" },
    { title: "Automation Workflows", desc: "Email sequences, follow-up automation, and nurture flows.", icon: "Gear" },
    { title: "Dashboard & Reporting", desc: "Real-time lead performance dashboard with attribution.", icon: "ChartBar" },
    { title: "Monthly Optimisation", desc: "Continuous A/B testing and channel performance optimisation.", icon: "ArrowsDownUp" },
  ];

  const timelineSteps = [
    { week: "Week 1", title: "Discovery & Audit", desc: "Funnel analysis, traffic audit, and lead quality assessment." },
    { week: "Week 2-3", title: "Strategy & Channel Selection", desc: "Channel selection, budget allocation, and KPI setting." },
    { week: "Week 4-6", title: "Campaign Launch", desc: "Landing pages, ad campaigns, and automation workflows go live." },
    { week: "Week 7-8", title: "Optimisation Phase", desc: "Initial data analysis, A/B testing, and performance tuning." },
    { week: "Week 9-12", title: "Scale & Refine", desc: "Budget scaling, channel expansion, and ongoing refinement." },
  ];

  const faq = [
    { q: "How long until we see lead generation results?", a: "Most clients see a measurable increase in lead volume within 4-6 weeks of campaign launch. The first 2 weeks are focused on strategy and setup, then we optimise based on real data. By week 8-10, you should see a 2-3x improvement over baseline." },
    { q: "What channels do you focus on for lead generation?", a: "We select channels based on your specific market and audience. Typically this includes organic search (SEO), paid search (Google Ads), paid social (LinkedIn/Facebook), and content marketing." },
    { q: "How do you qualify leads?", a: "We build a custom lead scoring model based on demographic, behavioural, and engagement signals. Hot leads go straight to sales, warm leads enter nurture sequences, and cold leads receive automated follow-up." },
    { q: "Do we need a CRM for this to work?", a: "A CRM helps but is not strictly required to start. We can implement lead tracking through landing page tools and form integrations first, then layer in a CRM as the system matures." },
    { q: "How do you measure lead quality?", a: "We track conversion rate by source, cost per qualified lead, lead-to-opportunity ratio, and sales cycle length by channel. Quality is measured by actual pipeline contribution." },
    { q: "Can you work with our existing marketing team?", a: "Yes. We collaborate with in-house teams and operate as an extension of your marketing department." },
    { q: "What if a channel doesn't perform?", a: "We continuously monitor channel performance and shift budget toward what is working. No channel is sacred." },
    { q: "Is this suitable for B2B businesses with long sales cycles?", a: "Absolutely. This is specifically designed for B2B and professional services. We focus on lead quality over quantity." },
  ];

  const industries = [
    { name: "B2B Services", icon: "Handshake", desc: "Professional service firms needing consistent lead flow." },
    { name: "SaaS", icon: "Code", desc: "Subscription businesses optimising trial-to-paid conversion." },
    { name: "Financial Services", icon: "CurrencyCircleDollar", desc: "High-compliance lead generation with quality scoring." },
    { name: "Healthcare", icon: "Heartbeat", desc: "Patient acquisition with referral program integration." },
  ];

  const connectedServices = [
    { name: "Search Visibility", desc: "Drives organic traffic that feeds the lead generation funnel." },
    { name: "Conversion Rate Optimisation", desc: "Optimises landing pages and forms for maximum conversion." },
    { name: "Marketing Automation", desc: "Automates lead scoring, nurturing, and follow-up." },
    { name: "Data Integration", desc: "Connects lead data across channels for attribution." },
  ];

  const insightsData = [
    { title: "The Anatomy of a High-Converting B2B Landing Page", tag: "CRO", readTime: "6 min", excerpt: "Learn the specific elements that separate top-performing B2B landing pages." },
    { title: "Lead Scoring 101: How to Prioritise Prospects", tag: "Automation", readTime: "5 min", excerpt: "A practical guide to building a lead scoring model that improves sales efficiency." },
    { title: "Why Multi-Channel Lead Generation Outperforms Single-Channel", tag: "Strategy", readTime: "7 min", excerpt: "Data showing why businesses using 3+ channels generate 4x more qualified leads." },
  ];

  return (
    <>
      <HeroSection solution={solution} visual={<FunnelSVG />} />
      <ProblemSection solution={solution} />
      <OpportunitySection metrics={kpiMetrics} />
      <ToolsShowcase toolSlugs={solution.relevantTools} />
      <FrameworkSection process={solution.process} visual="pipeline" />
      <DeliverablesGrid items={deliverables} />
      <TimelineSection steps={timelineSteps} label="Timeline" title="12-week" accent="roadmap." />
      <MetricsDashboard metrics={kpiMetrics} />
      <IndustriesGrid industries={industries} />
      <FAQSection items={faq} />
      <ConnectedServicesFlow services={connectedServices} />
      <InsightsSection insights={insightsData} />
      <ExploreOtherNavigator currentSlug={solution.slug} />
      <CTAFinal />
    </>
  );
}

function SearchVisibilityPage({ solution }: { solution: SolutionItem }) {
  const kpiMetrics = [
    { label: "Keyword Rankings", value: "85", suffix: "%", sub: "Average ranking improvement", icon: "ChartLineUp" },
    { label: "Organic Traffic", value: "200", suffix: "%", sub: "Traffic increase within 6 months", icon: "Binoculars" },
    { label: "Page 1 Keywords", value: "3.5", suffix: "x", sub: "More first-page rankings", icon: "Star" },
    { label: "Core Web Vitals", value: "92", suffix: "%", sub: "Pass rate after optimisation", icon: "Lightning" },
  ];

  const deliverables = [
    { title: "Technical SEO Audit", desc: "Complete crawl analysis with prioritised fix list.", icon: "MagnifyingGlass" },
    { title: "Content Optimisation Plan", desc: "Page-by-page content recommendations for target keywords.", icon: "Files" },
    { title: "Backlink Strategy", desc: "Authority-building plan with target publications and outreach templates.", icon: "Graph" },
    { title: "Ranking Dashboard", desc: "Real-time rank tracking with competitor benchmarking.", icon: "ChartBar" },
    { title: "Monthly Performance Reports", desc: "Comprehensive reporting with traffic, rankings, and ROI attribution.", icon: "ChartPie" },
    { title: "Technical Fixes", desc: "Implementation of Core Web Vitals, structured data, and crawl optimisation.", icon: "Gear" },
    { title: "Content Calendar", desc: "3-month editorial calendar aligned with keyword opportunities.", icon: "Clock" },
  ];

  const timelineSteps = [
    { week: "Week 1-2", title: "Full SEO Audit", desc: "Technical crawl, content analysis, and competitive benchmarking." },
    { week: "Week 3-4", title: "Strategy & Roadmap", desc: "Prioritised action plan with impact estimates for each fix." },
    { week: "Week 5-8", title: "Technical Implementation", desc: "Site speed, structured data, crawl optimisation, and index fixes." },
    { week: "Week 9-16", title: "Content & Authority", desc: "Content creation, optimisation, and backlink development." },
    { week: "Week 17-24", title: "Monitor & Scale", desc: "Ranking analysis, competitor monitoring, and strategy refinement." },
  ];

  const faq = [
    { q: "How long does SEO take to show results?", a: "Technical fixes show impact in 2-4 weeks. Content improvements take 4-8 weeks. Authority building typically requires 4-6 months to see meaningful movement." },
    { q: "What's included in the technical SEO audit?", a: "Our audit covers site architecture, crawlability, indexation status, Core Web Vitals, mobile usability, structured data, duplicate content, redirect chains, XML sitemaps, and server response codes." },
    { q: "Do you guarantee first-page rankings?", a: "No reputable SEO agency guarantees rankings. We guarantee best practices and our track record shows 85% of clients achieve first-page rankings for primary terms." },
    { q: "How do you handle algorithm updates?", a: "We monitor algorithmic changes continuously and adjust strategy accordingly using sustainable, white-hat practices." },
    { q: "Can you work around a redesign or site migration?", a: "Yes. We specialise in SEO-preserving site migrations with proper redirect mapping and content preservation." },
    { q: "What tools do you use for SEO tracking?", a: "We use Search Console, Ahrefs, Screaming Frog, and our custom ranking tracker." },
    { q: "Do I need ongoing SEO or is it a one-time fix?", a: "SEO requires ongoing investment. We recommend a minimum 6-month engagement with monthly optimisation cycles." },
    { q: "How do you measure ROI for SEO?", a: "We track organic traffic growth, keyword ranking improvements, organic lead generation, and attributed revenue." },
  ];

  const industries = [
    { name: "E-Commerce", icon: "ShoppingCart", desc: "Product pages and category optimisation for search." },
    { name: "SaaS", icon: "Code", desc: "Technical content and feature page optimisation." },
    { name: "Publishers", icon: "Files", desc: "Content strategy and authority development." },
    { name: "Professional Services", icon: "Handshake", desc: "Service page optimisation and local authority building." },
  ];

  const connectedServices = [
    { name: "Technical SEO", desc: "Foundation layer fixing crawl, index, and rendering issues." },
    { name: "Content Strategy", desc: "Content creation aligned with keyword opportunities." },
    { name: "Digital PR", desc: "Authority building through earned media and backlinks." },
    { name: "Analytics", desc: "Tracking and attribution for organic search performance." },
  ];

  const insightsData = [
    { title: "The Complete Guide to Core Web Vitals in 2026", tag: "Technical SEO", readTime: "8 min", excerpt: "Everything you need to know about Core Web Vitals and rankings impact." },
    { title: "How to Recover From a Google Algorithm Update", tag: "SEO", readTime: "6 min", excerpt: "A framework for diagnosing and recovering from ranking drops." },
    { title: "Content Clusters vs. Keyword Targeting", tag: "Content", readTime: "5 min", excerpt: "Modern SEO requires topic authority, not just individual keyword rankings." },
  ];

  return (
    <>
      <HeroSection solution={solution} visual={<SERPSVG />} />
      <ProblemSection solution={solution} />
      <OpportunitySection metrics={kpiMetrics} />
      <FrameworkSection process={solution.process} visual="timeline" />
      <DeliverablesGrid items={deliverables} />
      <TimelineSection steps={timelineSteps} label="Timeline" title="24-week" accent="roadmap." />
      <MetricsDashboard metrics={kpiMetrics} />
      <ToolsShowcase toolSlugs={solution.relevantTools} />
      <IndustriesGrid industries={industries} />
      <ConnectedServicesFlow services={connectedServices} />
      <FAQSection items={faq} />
      <InsightsSection insights={insightsData} />
      <ExploreOtherNavigator currentSlug={solution.slug} />
      <CTAFinal />
    </>
  );
}


function AIVisibilityPage({ solution }: { solution: SolutionItem }) {
  const kpiMetrics = [
    { label: "AI Mentions", value: "400", suffix: "%", sub: "Increase in AI platform citations", icon: "Robot" },
    { label: "Entity Score", value: "92", suffix: "/100", sub: "Knowledge graph completeness", icon: "Graph" },
    { label: "Brand Visibility", value: "85", suffix: "%", sub: "AI-covered topics in your niche", icon: "Binoculars" },
    { label: "Citation Growth", value: "250", suffix: "%", sub: "Brand mentions across AI sources", icon: "ChartLineUp" },
  ];

  const deliverables = [
    { title: "AI Visibility Audit", desc: "Current presence assessment across ChatGPT, Perplexity, and AI Overviews.", icon: "MagnifyingGlass" },
    { title: "Entity Map", desc: "Structured knowledge graph of your brand entities, products, and expertise areas.", icon: "PuzzlePiece" },
    { title: "Content Architecture", desc: "AI-optimised content structure designed for extraction and citation.", icon: "Files" },
    { title: "Schema Implementation", desc: "Advanced schema markup for entity recognition and knowledge graph integration.", icon: "Code" },
    { title: "Brand Citation Network", desc: "Development of authoritative brand mentions across trusted sources.", icon: "Globe" },
    { title: "AI Performance Dashboard", desc: "Monthly tracking of AI presence, citations, and competitor positioning.", icon: "ChartBar" },
  ];

  const timelineSteps = [
    { week: "Week 1-2", title: "AI Visibility Assessment", desc: "Baseline measurement across all major AI platforms." },
    { week: "Week 3-4", title: "Entity & Content Strategy", desc: "Knowledge graph design and content architecture planning." },
    { week: "Week 5-8", title: "Implementation", desc: "Schema, content restructuring, and brand citation development." },
    { week: "Week 9-12", title: "Monitoring & Optimisation", desc: "Continuous AI presence tracking and iterative improvements." },
  ];

  const faq = [
    { q: "What is GEO (Generative Engine Optimisation)?", a: "GEO is the practice of optimising your digital presence so AI-powered search engines reference your brand in their responses." },
    { q: "How is this different from traditional SEO?", a: "Traditional SEO optimises for link-based results. GEO optimises for AI-generated answers via entity-based structuring and knowledge graph integration." },
    { q: "Can you measure AI visibility?", a: "Yes. We track your presence across ChatGPT, Perplexity, Google AI Overviews, and other platforms using our proprietary AI Visibility tool." },
    { q: "How long until I see results in AI search?", a: "Content restructuring shows impact within 4-6 weeks. Full entity development requires 3-6 months." },
    { q: "What types of content perform best for AI visibility?", a: "Structured, authoritative content like long-form guides, technical documentation, research-backed articles, and FAQ content with entity markup." },
    { q: "Do I need to stop my traditional SEO efforts?", a: "No. GEO complements traditional SEO. Many signals benefit both. We integrate GEO into your existing SEO programme." },
    { q: "How do AI platforms choose which sources to cite?", a: "AI platforms prioritise sources with entity authority, consistent brand signals, high domain trust, and frequent citation by other sources." },
    { q: "Is this relevant for local businesses?", a: "Yes. Local businesses can optimise for AI-generated local recommendations increasingly common in AI responses." },
  ];

  const industries = [
    { name: "SaaS", icon: "Code", desc: "Technical products needing AI discoverability." },
    { name: "Publishing", icon: "Files", desc: "Content businesses needing citation in AI answers." },
    { name: "Professional Services", icon: "Handshake", desc: "Firms needing AI recognition for expertise." },
    { name: "E-Commerce", icon: "ShoppingCart", desc: "Product brands wanting AI recommendation inclusion." },
  ];

  const connectedServices = [
    { name: "Entity Optimisation", desc: "Structures brand knowledge for AI comprehension." },
    { name: "Content Architecture", desc: "Organises content for maximum AI extraction." },
    { name: "Brand Citation", desc: "Builds authority signals AI platforms rely on." },
    { name: "SEO Strategy", desc: "Traditional SEO foundation supporting GEO efforts." },
  ];

  const insightsData = [
    { title: "GEO vs. SEO: What's the Difference", tag: "AI Search", readTime: "7 min", excerpt: "Understanding traditional search optimisation versus generative engine optimisation." },
    { title: "How ChatGPT Chooses Sources to Cite", tag: "GEO", readTime: "6 min", excerpt: "Insights into the signals influencing AI source selection." },
    { title: "The Entity Optimisation Playbook for 2026", tag: "Strategy", readTime: "8 min", excerpt: "A practical guide to structuring your brand for AI discovery." },
  ];

  return (
    <>
      <HeroSection solution={solution} visual={<NeuralSVG />} />
      <ProblemSection solution={solution} />
      <OpportunitySection metrics={kpiMetrics} />
      <FrameworkSection process={solution.process} visual="grid" />
      <DeliverablesGrid items={deliverables} />
      <TimelineSection steps={timelineSteps} label="Timeline" title="12-week" accent="roadmap." />
      <ToolsShowcase toolSlugs={solution.relevantTools} />
      <IndustriesGrid industries={industries} />
      <ConnectedServicesFlow services={connectedServices} />
      <FAQSection items={faq} />
      <MetricsDashboard metrics={kpiMetrics} />
      <InsightsSection insights={insightsData} />
      <ExploreOtherNavigator currentSlug={solution.slug} />
      <CTAFinal />
    </>
  );
}

function AutomationPage({ solution }: { solution: SolutionItem }) {
  const kpiMetrics = [
    { label: "Hours Saved", value: "840", suffix: "+", sub: "Per month with automation", icon: "Clock" },
    { label: "Error Reduction", value: "95", suffix: "%", sub: "Fewer manual data entry errors", icon: "SealCheck" },
    { label: "Response Time", value: "80", suffix: "%", sub: "Faster customer response", icon: "Lightning" },
    { label: "Process Efficiency", value: "3.5", suffix: "x", sub: "Throughput improvement", icon: "ArrowsDownUp" },
  ];

  const deliverables = [
    { title: "Process Audit Report", desc: "Complete workflow mapping with time and cost analysis.", icon: "MagnifyingGlass" },
    { title: "Automation Blueprint", desc: "Technical design document for all automated workflows.", icon: "Files" },
    { title: "AI Agent Configuration", desc: "Deployed AI agents for support, data processing, or lead qualification.", icon: "Robot" },
    { title: "Integration Architecture", desc: "Connected systems with APIs, webhooks, and data pipelines.", icon: "Code" },
    { title: "Automation Dashboard", desc: "Real-time monitoring of automation performance and savings.", icon: "ChartBar" },
    { title: "Documentation & Training", desc: "Complete documentation and team training on new systems.", icon: "GraduationCap" },
    { title: "Monthly Optimisation", desc: "Ongoing refinement and expansion of automation coverage.", icon: "ArrowsDownUp" },
  ];

  const timelineSteps = [
    { week: "Week 1-2", title: "Process Discovery", desc: "Map current workflows and identify high-impact automation opportunities." },
    { week: "Week 3-4", title: "Solution Architecture", desc: "Design automation workflows and select appropriate AI tools." },
    { week: "Week 5-8", title: "Build & Deploy", desc: "Develop, test, and deploy automation systems." },
    { week: "Week 9-10", title: "Train & Handover", desc: "Team training and documentation of all automated processes." },
    { week: "Week 11-12", title: "Measure & Expand", desc: "Impact analysis and identification of additional automation opportunities." },
  ];

  const faq = [
    { q: "What kinds of tasks can you automate?", a: "Data entry, lead follow-up, customer support triage, document processing, reporting, notification workflows, approval chains, and email sequencing." },
    { q: "Do I need technical expertise to maintain automation?", a: "No. We build systems with monitoring and alerting built in. Most run autonomously with training provided." },
    { q: "How do AI agents fit into automation?", a: "AI agents handle complex tasks requiring judgement like responding to inquiries or extracting data from unstructured documents." },
    { q: "What is the typical ROI for automation?", a: "Most clients see full return within 3-6 months. Average client saves 840+ hours per month." },
    { q: "Can you work with our existing tools?", a: "Yes. We integrate with your CRM, email platform, project management tools, and business systems." },
    { q: "Is this suitable for small teams?", a: "Absolutely. Small teams benefit disproportionately as every hour saved represents higher percentage of capacity." },
    { q: "How do you handle errors in automated workflows?", a: "We build error handling, retry logic, and notification systems. Failures alert the right person immediately." },
    { q: "Can automation be scaled as we grow?", a: "Yes. We build modular systems that scale. Adding new workflows is straightforward." },
  ];

  const industries = [
    { name: "Professional Services", icon: "Handshake", desc: "Automating client reporting, billing, and follow-up." },
    { name: "E-Commerce", icon: "ShoppingCart", desc: "Order processing, inventory, and customer support." },
    { name: "Healthcare", icon: "Heartbeat", desc: "Patient scheduling, records processing, and compliance." },
    { name: "Real Estate", icon: "Building", desc: "Lead follow-up, listings, and client communication." },
  ];

  const connectedServices = [
    { name: "Lead Qualification", desc: "Automated scoring and routing of incoming leads." },
    { name: "Support Automation", desc: "AI-powered customer support handling common inquiries." },
    { name: "Document Processing", desc: "Automated extraction and processing of business documents." },
    { name: "CRM Integration", desc: "Automated data synchronisation across business systems." },
  ];

  const insightsData = [
    { title: "The Automation-First Approach to Scaling", tag: "Operations", readTime: "6 min", excerpt: "Why businesses that automate first grow faster and more profitably." },
    { title: "AI Agents vs. Traditional Automation", tag: "AI", readTime: "5 min", excerpt: "Understanding when to use each approach." },
    { title: "10 Processes Every Business Should Automate First", tag: "Productivity", readTime: "7 min", excerpt: "Highest-ROI automation opportunities sorted by effort." },
  ];

  return (
    <>
      <HeroSection solution={solution} visual={<PipelineSVG />} />
      <ProblemSection solution={solution} />
      <OpportunitySection metrics={kpiMetrics} />
      <MetricsDashboard metrics={kpiMetrics} />
      <FrameworkSection process={solution.process} visual="pipeline" />
      <DeliverablesGrid items={deliverables} />
      <TimelineSection steps={timelineSteps} label="Timeline" title="12-week" accent="roadmap." />
      <ToolsShowcase toolSlugs={solution.relevantTools} />
      <IndustriesGrid industries={industries} />
      <FAQSection items={faq} />
      <ConnectedServicesFlow services={connectedServices} />
      <InsightsSection insights={insightsData} />
      <ExploreOtherNavigator currentSlug={solution.slug} />
      <CTAFinal />
    </>
  );
}


function CustomCRMPage({ solution }: { solution: SolutionItem }) {
  const kpiMetrics = [
    { label: "Team Adoption", value: "94", suffix: "%", sub: "User adoption rate within 30 days", icon: "Users" },
    { label: "Sales Efficiency", value: "40", suffix: "%", sub: "Increase in sales rep productivity", icon: "ChartLineUp" },
    { label: "Data Accuracy", value: "99", suffix: "%", sub: "Automated data entry accuracy", icon: "SealCheck" },
    { label: "Time Saved", value: "15", suffix: "hrs", sub: "Per rep per week on admin tasks", icon: "Clock" },
  ];

  const deliverables = [
    { title: "Requirements Document", desc: "Complete specification of your CRM requirements and workflows.", icon: "Files" },
    { title: "Database Schema", desc: "Custom data model designed around your business entities and relationships.", icon: "Cube" },
    { title: "UI/UX Design", desc: "Complete interface design with user flows and interaction prototypes.", icon: "Lightning" },
    { title: "CRM Application", desc: "Fully functional custom CRM deployed to production.", icon: "Code" },
    { title: "API Integrations", desc: "Connections to your existing tools, email, calendar, and accounting systems.", icon: "PuzzlePiece" },
    { title: "Dashboard & Reports", desc: "Custom dashboards and reporting for sales performance metrics.", icon: "ChartBar" },
    { title: "Training & Documentation", desc: "Team training sessions and comprehensive user documentation.", icon: "GraduationCap" },
  ];

  const timelineSteps = [
    { week: "Week 1-2", title: "Requirements Analysis", desc: "Deep dive into sales process, pain points, and integration needs." },
    { week: "Week 3-4", title: "Architecture & Design", desc: "Database schema, UI/UX design, and system architecture." },
    { week: "Week 5-10", title: "Agile Development", desc: "Sprint-based development with regular demos and QA testing." },
    { week: "Week 11-12", title: "Deployment & Training", desc: "Production deployment, data migration, and team training." },
  ];

  const faq = [
    { q: "How is a custom CRM better than Salesforce or HubSpot?", a: "Custom CRMs match your exact process with no unnecessary features. You avoid per-user pricing, forced upgrades, and workaround-heavy configurations." },
    { q: "How long does it take to build a custom CRM?", a: "Typically 8-12 weeks from requirements to deployment, depending on complexity and integration requirements." },
    { q: "Can we migrate our existing data into the new CRM?", a: "Yes. We handle data migration from spreadsheets, existing CRMs, or any other data source." },
    { q: "Is the CRM mobile-friendly?", a: "Yes. We build responsive web applications that work on all devices out of the box." },
    { q: "What if we need changes after launch?", a: "We provide ongoing support and can extend the system as your needs evolve. The CRM is built on a flexible architecture." },
    { q: "Do you integrate with our existing tools?", a: "Yes. We integrate with email, calendar, accounting, marketing, and analytics tools via APIs." },
    { q: "Can multiple teams use the CRM?", a: "Yes. We build role-based access controls so sales, marketing, support, and management each see relevant data." },
    { q: "Who owns the source code?", a: "You own 100% of the source code and intellectual property. There are no licensing fees." },
  ];

  const industries = [
    { name: "Real Estate", icon: "Building", desc: "Property tracking, client management, and deal pipeline." },
    { name: "Professional Services", icon: "Handshake", desc: "Client management, project tracking, and billing integration." },
    { name: "Healthcare", icon: "Heartbeat", desc: "Patient management, appointment scheduling, and compliance." },
    { name: "Financial Services", icon: "CurrencyCircleDollar", desc: "Client portfolio management and regulatory tracking." },
  ];

  const connectedServices = [
    { name: "API Development", desc: "Custom APIs for CRM integration with your ecosystem." },
    { name: "Dashboard Development", desc: "Custom analytics and reporting dashboards." },
    { name: "Client Portals", desc: "Self-service portals connected to CRM data." },
    { name: "Automation", desc: "Automated workflows triggered by CRM events." },
  ];

  const insightsData = [
    { title: "Custom CRM vs Off-the-Shelf: The Real Cost Comparison", tag: "Software", readTime: "7 min", excerpt: "Why custom CRMs often cost less in the long run when accounting for productivity and licensing." },
    { title: "How to Design a CRM Your Team Will Actually Use", tag: "UX", readTime: "5 min", excerpt: "User adoption strategies learned from building 20+ custom CRM systems." },
    { title: "The Hidden Costs of Spreadsheet CRM", tag: "Operations", readTime: "6 min", excerpt: "What spreadsheets cost in errors, time, and missed opportunities." },
  ];

  return (
    <>
      <HeroSection solution={solution} visual={<ArchitectureStacksSVG />} />
      <ProblemSection solution={solution} />
      <OpportunitySection metrics={kpiMetrics} />
      <FrameworkSection process={solution.process} visual="pipeline" />
      <DeliverablesGrid items={deliverables} />
      <MetricsDashboard metrics={kpiMetrics} />
      <TimelineSection steps={timelineSteps} label="Timeline" title="12-week" accent="roadmap." />
      <IndustriesGrid industries={industries} />
      <FAQSection items={faq} />
      <ConnectedServicesFlow services={connectedServices} />
      <InsightsSection insights={insightsData} />
      <ToolsShowcase toolSlugs={solution.relevantTools} />
      <ExploreOtherNavigator currentSlug={solution.slug} />
      <CTAFinal />
    </>
  );
}

function LaunchProductPage({ solution }: { solution: SolutionItem }) {
  const kpiMetrics = [
    { label: "Time to Market", value: "60", suffix: "%", sub: "Faster than traditional development", icon: "Lightning" },
    { label: "Dev Velocity", value: "3.2", suffix: "x", sub: "Faster sprint delivery vs. industry avg", icon: "Rocket" },
    { label: "Quality Score", value: "96", suffix: "%", sub: "Test coverage and code quality metrics", icon: "SealCheck" },
    { label: "Scalability", value: "99.9", suffix: "%", sub: "Uptime guarantee post-launch", icon: "ChartLineUp" },
  ];

  const deliverables = [
    { title: "Product Roadmap", desc: "Strategic roadmap with milestones, features, and release planning.", icon: "Files" },
    { title: "UI/UX Design System", desc: "Complete design system with component library and interaction patterns.", icon: "Lightning" },
    { title: "Prototype & Wireframes", desc: "Interactive prototypes for user testing and stakeholder buy-in.", icon: "Graph" },
    { title: "Web Application", desc: "Full-stack production application built on modern architecture.", icon: "Code" },
    { title: "API & Documentation", desc: "Well-documented API with SDK examples for third-party integration.", icon: "PuzzlePiece" },
    { title: "Deployment Pipeline", desc: "CI/CD pipeline with automated testing, staging, and production environments.", icon: "Rocket" },
    { title: "Performance Monitoring", desc: "Real-time monitoring, alerting, and performance dashboards.", icon: "ChartBar" },
  ];

  const timelineSteps = [
    { week: "Week 1-2", title: "Product Definition", desc: "Refine requirements, define scope, and create development roadmap." },
    { week: "Week 3-4", title: "Design & Prototype", desc: "UI/UX design, wireframing, and interactive prototype validation." },
    { week: "Week 5-12", title: "Build & Iterate", desc: "Agile development with continuous deployment and testing." },
    { week: "Week 13-14", title: "Launch Preparation", desc: "Performance optimisation, security audit, and deployment preparation." },
    { week: "Week 15-16", title: "Launch & Monitor", desc: "Production launch with monitoring and post-launch support." },
  ];

  const faq = [
    { q: "What tech stack do you use for digital products?", a: "We build on modern stacks including Next.js, TypeScript, Node.js, PostgreSQL, and cloud infrastructure on AWS or Vercel." },
    { q: "Can you build an MVP quickly?", a: "Yes. We specialise in rapid MVP development with a working product in 6-8 weeks." },
    { q: "Do you handle product strategy and positioning?", a: "Yes. Our process includes product definition, market analysis, and feature prioritisation before development begins." },
    { q: "What if I already have a design in mind?", a: "Great. We can work from your existing designs or build on them. Our team provides technical feasibility guidance." },
    { q: "How do you ensure quality?", a: "Automated testing, code reviews, staging environments, and continuous integration are built into our workflow." },
    { q: "Can you scale the product after launch?", a: "Yes. We build on scalable architecture and provide ongoing development services as your user base grows." },
    { q: "Do you offer post-launch support?", a: "Yes. We provide ongoing maintenance, monitoring, and feature development after launch." },
    { q: "How do you handle user authentication and security?", a: "We implement industry-standard authentication, authorisation, data encryption, and security best practices." },
  ];

  const industries = [
    { name: "SaaS", icon: "Code", desc: "B2B and B2C SaaS platforms from concept to launch." },
    { name: "FinTech", icon: "CurrencyCircleDollar", desc: "Secure financial applications with compliance built in." },
    { name: "HealthTech", icon: "Heartbeat", desc: "Healthcare applications with regulatory compliance." },
    { name: "E-Commerce", icon: "ShoppingCart", desc: "Custom e-commerce platforms with unique business models." },
  ];

  const connectedServices = [
    { name: "Web Development", desc: "Full-stack development using modern, scalable frameworks." },
    { name: "UI/UX Design", desc: "User-centred design process for optimal product experiences." },
    { name: "API Development", desc: "Custom APIs that power your product and enable integrations." },
    { name: "Cloud Infrastructure", desc: "Scalable cloud hosting, CDN, and monitoring solutions." },
  ];

  const insightsData = [
    { title: "MVP vs. Full Product: Finding the Right Launch Strategy", tag: "Product", readTime: "6 min", excerpt: "How to decide what to build first and what can wait for later iterations." },
    { title: "The Modern Web Stack: Why Next.js Dominates in 2026", tag: "Technology", readTime: "7 min", excerpt: "Why modern frameworks are the default choice for new digital products." },
    { title: "From Zero to Launch: A 16-Week Product Timeline", tag: "Development", readTime: "8 min", excerpt: "What happens at each stage of the product development lifecycle." },
  ];

  return (
    <>
      <HeroSection solution={solution} visual={<PhasesSVG />} />
      <ProblemSection solution={solution} />
      <OpportunitySection metrics={kpiMetrics} />
      <FrameworkSection process={solution.process} visual="timeline" />
      <DeliverablesGrid items={deliverables} />
      <ToolsShowcase toolSlugs={solution.relevantTools} />
      <TimelineSection steps={timelineSteps} label="Timeline" title="16-week" accent="roadmap." />
      <MetricsDashboard metrics={kpiMetrics} />
      <IndustriesGrid industries={industries} />
      <FAQSection items={faq} />
      <ConnectedServicesFlow services={connectedServices} />
      <InsightsSection insights={insightsData} />
      <ExploreOtherNavigator currentSlug={solution.slug} />
      <CTAFinal />
    </>
  );
}


function MultiLocationPage({ solution }: { solution: SolutionItem }) {
  const kpiMetrics = [
    { label: "Location Visibility", value: "300", suffix: "%", sub: "Average visibility increase per location", icon: "Globe" },
    { label: "Local Rankings", value: "85", suffix: "%", sub: "Locations in top 3 local pack", icon: "MapPin" },
    { label: "Foot Traffic", value: "150", suffix: "%", sub: "Increase in location visits", icon: "Storefront" },
    { label: "Review Growth", value: "200", suffix: "%", sub: "Increase in Google reviews", icon: "Star" },
  ];

  const deliverables = [
    { title: "Multi-Location Audit", desc: "Complete assessment of every location's online presence.", icon: "MagnifyingGlass" },
    { title: "GBP Optimisation Suite", desc: "Optimised Google Business Profiles for every location.", icon: "MapPin" },
    { title: "Citation Management", desc: "Consistent NAP across all directories for every location.", icon: "Files" },
    { title: "Location Page Templates", desc: "Scalable location page system for your website.", icon: "Code" },
    { title: "Local Content Strategy", desc: "Location-specific content plan with local keywords.", icon: "Files" },
    { title: "Review Management System", desc: "Automated review monitoring and response system.", icon: "ChatCircle" },
    { title: "Unified Dashboard", desc: "Multi-location performance dashboard with consolidated reporting.", icon: "ChartBar" },
  ];

  const timelineSteps = [
    { week: "Week 1-2", title: "Multi-Location Audit", desc: "Assess each location's visibility, citations, and competition." },
    { week: "Week 3-4", title: "Scalable Strategy", desc: "Build templated system for location pages and citations." },
    { week: "Week 5-12", title: "Implementation at Scale", desc: "GBP optimisation, citations, location pages across all sites." },
    { week: "Week 13-16", title: "Local Advertising", desc: "Location-specific ad campaigns and budget allocation." },
    { week: "Week 17-24", title: "Monitor & Report", desc: "Location-level reporting and continuous optimisation." },
  ];

  const faq = [
    { q: "How do you manage SEO for dozens of locations?", a: "We use a scalable system with templates, automation, and centralised management so every location gets consistent optimisation." },
    { q: "What is the most important factor for multi-location SEO?", a: "Consistency. Every location needs accurate NAP information, a unique Google Business Profile, and location-specific content." },
    { q: "How do you handle locations in different cities?", a: "Each location requires local keyword targeting, local content, and local link building specific to its geographic area." },
    { q: "Can you manage existing Google Business Profiles?", a: "Yes. We audit, claim, verify, and optimise existing profiles or create new ones for unclaimed locations." },
    { q: "How do you track performance across locations?", a: "We provide a unified dashboard showing rankings, traffic, reviews, and calls for every location." },
    { q: "What about locations in different countries?", a: "We adapt strategy for each country's search engine preferences, language requirements, and local directories." },
    { q: "How long until locations see results?", a: "Initial improvements within 4-6 weeks for GBP optimisation. Full local pack dominance typically takes 3-6 months." },
    { q: "Do you create separate websites for each location?", a: "Not necessarily. We optimise location pages within your existing site or build a hub-and-spoke architecture." },
  ];

  const industries = [
    { name: "Retail Chains", icon: "Storefront", desc: "Multi-store retail locations needing local dominance." },
    { name: "Healthcare Groups", icon: "Heartbeat", desc: "Multi-practice medical groups with location-specific services." },
    { name: "Real Estate", icon: "Building", desc: "Agencies with multiple office locations." },
    { name: "Hospitality", icon: "Globe", desc: "Hotel groups and restaurant chains with regional presence." },
  ];

  const connectedServices = [
    { name: "Local SEO", desc: "Location-specific optimisation for every branch." },
    { name: "Google Ads", desc: "Location-targeted advertising campaigns." },
    { name: "Reputation Management", desc: "Centralised review management across locations." },
    { name: "Content Development", desc: "Scalable local content creation system." },
  ];

  const insightsData = [
    { title: "Scaling Local SEO: A Framework for Multi-Location Brands", tag: "Local SEO", readTime: "8 min", excerpt: "How to maintain quality while scaling SEO across 10, 50, or 100+ locations." },
    { title: "The Ultimate Guide to Google Business Profile Optimisation", tag: "GBP", readTime: "7 min", excerpt: "Every optimisation and feature you should be using for each location." },
    { title: "Why Multi-Location Businesses Need a Centralised Review Strategy", tag: "Reputation", readTime: "5 min", excerpt: "How inconsistent review management hurts multi-location brands." },
  ];

  return (
    <>
      <HeroSection solution={solution} visual={<MapSVG />} />
      <ProblemSection solution={solution} />
      <OpportunitySection metrics={kpiMetrics} />
      <FrameworkSection process={solution.process} visual="pipeline" />
      <TimelineSection steps={timelineSteps} label="Timeline" title="24-week" accent="roadmap." />
      <DeliverablesGrid items={deliverables} />
      <MetricsDashboard metrics={kpiMetrics} />
      <ToolsShowcase toolSlugs={solution.relevantTools} />
      <IndustriesGrid industries={industries} />
      <FAQSection items={faq} />
      <ConnectedServicesFlow services={connectedServices} />
      <InsightsSection insights={insightsData} />
      <ExploreOtherNavigator currentSlug={solution.slug} />
      <CTAFinal />
    </>
  );
}

function LocalVisibilityPage({ solution }: { solution: SolutionItem }) {
  const kpiMetrics = [
    { label: "Local Pack Rank", value: "1", suffix: "-3", sub: "Position in Google local pack", icon: "MapPin" },
    { label: "GBP Views", value: "400", suffix: "%", sub: "Increase in profile views", icon: "Eye" },
    { label: "Direction Requests", value: "250", suffix: "%", sub: "Increase in map directions", icon: "MapPin" },
    { label: "Phone Calls", value: "180", suffix: "%", sub: "Increase in click-to-call", icon: "Phone" },
  ];

  const deliverables = [
    { title: "Local SEO Audit", desc: "Complete GBP, citation, and local competitor analysis.", icon: "MagnifyingGlass" },
    { title: "GBP Optimisation", desc: "Fully optimised Google Business Profile with all features enabled.", icon: "MapPin" },
    { title: "Citation Cleanup", desc: "NAP consistency across all online directories and platforms.", icon: "Files" },
    { title: "Review Strategy", desc: "Review generation system and response framework.", icon: "ChatCircle" },
    { title: "Local Content", desc: "Location-specific content for your service area pages.", icon: "Files" },
    { title: "Local Link Building", desc: "Community and local business partnership link development.", icon: "Globe" },
    { title: "Monthly Reporting", desc: "Local pack tracking, review analytics, and competitor monitoring.", icon: "ChartBar" },
  ];

  const timelineSteps = [
    { week: "Week 1", title: "Local Visibility Audit", desc: "GBP audit, citation audit, review analysis, and competition benchmarking." },
    { week: "Week 2", title: "Optimisation Plan", desc: "GBP optimisation, citation cleanup, review strategy, and local content plan." },
    { week: "Week 3-4", title: "Implementation", desc: "Profile optimisation, citation building, and review management launch." },
    { week: "Week 5-8", title: "Content & Links", desc: "Local content creation and community link building." },
    { week: "Week 9-12", title: "Track & Dominate", desc: "Local pack tracking, review monitoring, and continuous optimisation." },
  ];

  const faq = [
    { q: "What is the local pack and why does it matter?", a: "The local pack is the top 3 Google Maps results shown for local searches. It drives the majority of local search clicks and foot traffic." },
    { q: "How long does it take to rank in the local pack?", a: "With proper GBP optimisation, improvements can be seen in 2-4 weeks. Sustained top-3 positioning typically takes 60-90 days." },
    { q: "What impacts local pack rankings most?", a: "Proximity, GBP completeness, review quantity and quality, citation consistency, and local content relevance." },
    { q: "How important are Google reviews?", a: "Reviews are a top ranking factor for local pack. We implement a systematic review generation and management strategy." },
    { q: "Can you help if my GBP is suspended?", a: "Yes. We handle GBP reinstatement and ensure compliance with Google's guidelines to prevent future suspensions." },
    { q: "Do I need a website for local SEO to work?", a: "A website helps significantly, but GBP optimisation alone can drive local visibility. We optimise both." },
    { q: "How do you compete against established local competitors?", a: "We identify gaps in their strategy, target underserved keywords, and build a stronger local authority profile." },
    { q: "Is local SEO a one-time effort?", a: "No. Local SEO requires ongoing maintenance. Reviews, citations, and content need continuous attention." },
  ];

  const industries = [
    { name: "Restaurants", icon: "Storefront", desc: "Local dining establishments needing walk-in traffic." },
    { name: "Legal", icon: "Scales", desc: "Law firms requiring local client acquisition." },
    { name: "Healthcare", icon: "Heartbeat", desc: "Local clinics and medical practices." },
    { name: "Trades & Services", icon: "Wrench", desc: "Plumbers, electricians, and local service providers." },
  ];

  const connectedServices = [
    { name: "Reputation Management", desc: "Review generation and response system." },
    { name: "Local Content", desc: "Service area pages and local keyword content." },
    { name: "Google Ads", desc: "Location-targeted paid search campaigns." },
    { name: "Website Optimisation", desc: "Local SEO-optimised website structure." },
  ];

  const insightsData = [
    { title: "The Local Pack Playbook: Ranking in Google's Top 3", tag: "Local SEO", readTime: "7 min", excerpt: "A step-by-step guide to dominating local search results in 2026." },
    { title: "Google Review Generation: Strategies That Actually Work", tag: "Reviews", readTime: "5 min", excerpt: "Ethical, effective ways to increase your Google review count." },
    { title: "GBP vs. Website: Where Local SEOs Should Focus", tag: "Strategy", readTime: "6 min", excerpt: "How to allocate resources between Google and your own site." },
  ];

  return (
    <>
      <HeroSection solution={solution} visual={<LocalPackSVG />} />
      <ProblemSection solution={solution} />
      <OpportunitySection metrics={kpiMetrics} />
      <FrameworkSection process={solution.process} visual="cards" />
      <DeliverablesGrid items={deliverables} />
      <TimelineSection steps={timelineSteps} label="Timeline" title="12-week" accent="roadmap." />
      <MetricsDashboard metrics={kpiMetrics} />
      <ToolsShowcase toolSlugs={solution.relevantTools} />
      <IndustriesGrid industries={industries} />
      <ConnectedServicesFlow services={connectedServices} />
      <FAQSection items={faq} />
      <InsightsSection insights={insightsData} />
      <ExploreOtherNavigator currentSlug={solution.slug} />
      <CTAFinal />
    </>
  );
}


function CROPage({ solution }: { solution: SolutionItem }) {
  const kpiMetrics = [
    { label: "Conversion Rate", value: "2.8", suffix: "x", sub: "Average improvement in conversion", icon: "ChartLineUp" },
    { label: "Revenue Per Visitor", value: "65", suffix: "%", sub: "Increase in RPV", icon: "CurrencyDollar" },
    { label: "Bounce Rate", value: "40", suffix: "%", sub: "Reduction in bounce rate", icon: "Lightning" },
    { label: "Form Completion", value: "120", suffix: "%", sub: "Increase in form submissions", icon: "Files" },
  ];

  const deliverables = [
    { title: "Conversion Audit Report", desc: "Full funnel analysis with heatmaps, recordings, and form analytics.", icon: "MagnifyingGlass" },
    { title: "A/B Test Framework", desc: "Structured testing programme with hypothesis prioritisation.", icon: "Graph" },
    { title: "Landing Page Redesigns", desc: "Data-driven redesigns of underperforming pages.", icon: "Lightning" },
    { title: "Form Optimisation", desc: "Redesigned forms with reduced friction and increased completion.", icon: "Files" },
    { title: "CRO Dashboard", desc: "Real-time conversion tracking and experiment results dashboard.", icon: "ChartBar" },
    { title: "User Flow Improvements", desc: "Optimised navigation and user flows based on behaviour data.", icon: "FlowArrow" },
    { title: "Ongoing Testing Programme", desc: "Continuous A/B/n testing with documented results and iterations.", icon: "ArrowsDownUp" },
  ];

  const timelineSteps = [
    { week: "Week 1", title: "Conversion Audit", desc: "Funnel analysis, heatmaps, recordings, and user flow mapping." },
    { week: "Week 2", title: "Hypothesis Generation", desc: "Data-driven hypotheses prioritised by impact and effort." },
    { week: "Week 3-6", title: "Implementation & Testing", desc: "Page redesigns, form optimisation, and A/B test execution." },
    { week: "Week 7-8", title: "Analysis & Scale", desc: "Result analysis, winning variant deployment, and test expansion." },
  ];

  const faq = [
    { q: "What is a good conversion rate?", a: "Average varies by industry. E-commerce averages 2-3%, B2B services 3-5%, and SaaS 5-10%. We typically improve rates by 2-3x." },
    { q: "How do you identify what to test?", a: "We use data from analytics, heatmaps, session recordings, and user feedback to identify friction points with the highest potential impact." },
    { q: "How many tests do you run simultaneously?", a: "We run multiple concurrent tests following proper statistical methodology to ensure valid results." },
    { q: "What tools do you use for CRO?", a: "We use Hotjar, Google Optimise, VWO, and custom analytics setups depending on your stack and requirements." },
    { q: "How do you ensure test results are statistically valid?", a: "We calculate required sample sizes, run tests to statistical significance (95%+), and account for multiple comparison issues." },
    { q: "Can you optimise for mobile conversions specifically?", a: "Yes. We analyse mobile-specific behaviour and optimise for mobile conversion paths separately from desktop." },
    { q: "How long does it take to see CRO results?", a: "Initial insights from audits are immediate. First test results within 2-3 weeks. Meaningful conversion improvements within 60 days." },
    { q: "Do you work with existing A/B testing tools?", a: "Yes. We can work with your existing CRO stack or recommend and implement new tools." },
  ];

  const industries = [
    { name: "E-Commerce", icon: "ShoppingCart", desc: "Cart abandonment reduction and checkout optimisation." },
    { name: "SaaS", icon: "Code", desc: "Trial-to-paid conversion and feature adoption." },
    { name: "Professional Services", icon: "Handshake", desc: "Lead form completion and consultation booking." },
    { name: "Publishing", icon: "Files", desc: "Newsletter signup and content engagement optimisation." },
  ];

  const connectedServices = [
    { name: "Landing Page Optimisation", desc: "Data-driven page redesigns for maximum conversion." },
    { name: "UI/UX Design", desc: "User-centred design reducing friction points." },
    { name: "Analytics", desc: "Conversion tracking and attribution setup." },
    { name: "Content Strategy", desc: "Messaging and copy optimisation for conversion." },
  ];

  const insightsData = [
    { title: "The CRO Playbook: 10 High-Impact Tests to Run First", tag: "CRO", readTime: "7 min", excerpt: "Start with these proven tests for the fastest conversion improvements." },
    { title: "Why Your Forms Are Leaking Customers", tag: "UX", readTime: "5 min", excerpt: "Common form friction points and how to fix them based on user behaviour data." },
    { title: "Mobile Conversion Optimisation: A Strategic Guide", tag: "Mobile", readTime: "6 min", excerpt: "Why mobile CRO requires a fundamentally different approach from desktop." },
  ];

  return (
    <>
      <HeroSection solution={solution} visual={<FunnelBarsSVG />} />
      <ProblemSection solution={solution} />
      <OpportunitySection metrics={kpiMetrics} />
      <FrameworkSection process={solution.process} visual="pipeline" />
      <DeliverablesGrid items={deliverables} />
      <TimelineSection steps={timelineSteps} label="Timeline" title="8-week" accent="roadmap." />
      <MetricsDashboard metrics={kpiMetrics} />
      <ToolsShowcase toolSlugs={solution.relevantTools} />
      <IndustriesGrid industries={industries} />
      <ConnectedServicesFlow services={connectedServices} />
      <FAQSection items={faq} />
      <InsightsSection insights={insightsData} />
      <ExploreOtherNavigator currentSlug={solution.slug} />
      <CTAFinal />
    </>
  );
}

function ModerniseWebsitePage({ solution }: { solution: SolutionItem }) {
  const kpiMetrics = [
    { label: "Page Speed", value: "92", suffix: "%", sub: "Core Web Vitals pass rate", icon: "Lightning" },
    { label: "Mobile Score", value: "95", suffix: "%", sub: "Mobile usability score", icon: "DeviceMobile" },
    { label: "SEO Preservation", value: "100", suffix: "%", sub: "Ranking preservation during migration", icon: "SealCheck" },
    { label: "Conversion Uplift", value: "60", suffix: "%", sub: "Post-migration conversion improvement", icon: "ChartLineUp" },
  ];

  const deliverables = [
    { title: "Technical Audit Report", desc: "Complete audit of current site performance, security, and SEO.", icon: "MagnifyingGlass" },
    { title: "Information Architecture", desc: "Restructured sitemap and content hierarchy for UX and SEO.", icon: "Graph" },
    { title: "UI/UX Design System", desc: "Modern design system with component library and style guide.", icon: "Lightning" },
    { title: "Next.js Application", desc: "High-performance web application built on Next.js.", icon: "Code" },
    { title: "Headless CMS", desc: "Content management system with easy editing and structured content.", icon: "Files" },
    { title: "SEO Migration Plan", desc: "Complete redirect strategy and SEO preservation during migration.", icon: "MapPin" },
    { title: "Performance Optimisation", desc: "Core Web Vitals optimisation with measurable improvements.", icon: "Rocket" },
  ];

  const timelineSteps = [
    { week: "Week 1-2", title: "Audit & Discovery", desc: "Technical, performance, content audit, and stakeholder interviews." },
    { week: "Week 3-4", title: "Design & Architecture", desc: "Information architecture, UI/UX design, and tech stack selection." },
    { week: "Week 5-10", title: "Development & Migration", desc: "Modern website build, content migration, and SEO preservation." },
    { week: "Week 11-12", title: "Launch & Optimise", desc: "Deployment, post-launch monitoring, and Core Web Vitals verification." },
  ];

  const faq = [
    { q: "How long does a website rebuild take?", a: "Typically 8-12 weeks depending on complexity, content volume, and feature requirements." },
    { q: "Will my SEO rankings be affected during migration?", a: "We implement SEO-preserving migration techniques including proper redirects, content mapping, and monitoring to minimise or eliminate ranking loss." },
    { q: "What CMS do you recommend?", a: "We recommend headless CMS solutions like Sanity, Contentful, or Strapi for flexibility, performance, and editorial experience." },
    { q: "Do you redesign or rebuild on the same platform?", a: "We typically rebuild on modern platforms (Next.js + headless CMS) for performance, security, and maintainability." },
    { q: "What happens to my existing content?", a: "We migrate all existing content, preserve URLs where possible, and restructure content architecture for better performance." },
    { q: "How do you ensure the new site is faster?", a: "We optimise images, implement code splitting, leverage CDN caching, use ISR/SSR appropriately, and follow Core Web Vitals best practices." },
    { q: "Can you add new features during the rebuild?", a: "Yes. We prioritise features as part of the project scope and build them into the new architecture." },
    { q: "Do you provide training on the new CMS?", a: "Yes. We provide team training sessions and documentation for content editors and administrators." },
  ];

  const industries = [
    { name: "Corporate", icon: "Building", desc: "Enterprise websites needing modernisation and scale." },
    { name: "E-Commerce", icon: "ShoppingCart", desc: "Online stores requiring performance and conversion optimisation." },
    { name: "Professional Services", icon: "Handshake", desc: "Service firm websites needing credibility and lead generation." },
    { name: "Publishing", icon: "Files", desc: "Content-heavy sites requiring performance and CMS flexibility." },
  ];

  const connectedServices = [
    { name: "Next.js Development", desc: "Modern React framework for high-performance websites." },
    { name: "UI/UX Design", desc: "User-centred design for optimal engagement and conversion." },
    { name: "Performance Optimisation", desc: "Core Web Vitals and speed optimisation." },
    { name: "SEO Strategy", desc: "SEO-optimised architecture and content structure." },
  ];

  const insightsData = [
    { title: "The Cost of an Outdated Website in 2026", tag: "Web Dev", readTime: "6 min", excerpt: "What slow, outdated websites are costing in lost revenue and credibility." },
    { title: "Headless CMS vs. Traditional CMS: Which is Right?", tag: "Technology", readTime: "7 min", excerpt: "A practical comparison for businesses planning a website rebuild." },
    { title: "SEO-Preserving Site Migration: A Step-by-Step Guide", tag: "SEO", readTime: "8 min", excerpt: "How to rebuild your website without losing search rankings." },
  ];

  return (
    <>
      <HeroSection solution={solution} visual={<BeforeAfterSVG />} />
      <ProblemSection solution={solution} />
      <OpportunitySection metrics={kpiMetrics} />
      <FrameworkSection process={solution.process} visual="pipeline" />
      <TimelineSection steps={timelineSteps} label="Timeline" title="12-week" accent="roadmap." />
      <DeliverablesGrid items={deliverables} />
      <MetricsDashboard metrics={kpiMetrics} />
      <ToolsShowcase toolSlugs={solution.relevantTools} />
      <IndustriesGrid industries={industries} />
      <FAQSection items={faq} />
      <ConnectedServicesFlow services={connectedServices} />
      <InsightsSection insights={insightsData} />
      <ExploreOtherNavigator currentSlug={solution.slug} />
      <CTAFinal />
    </>
  );
}


function DataConnectPage({ solution }: { solution: SolutionItem }) {
  const kpiMetrics = [
    { label: "Data Accuracy", value: "99", suffix: "%", sub: "Automated data accuracy", icon: "SealCheck" },
    { label: "Reporting Time", value: "90", suffix: "%", sub: "Reduction in manual reporting", icon: "Clock" },
    { label: "Attribution Clarity", value: "100", suffix: "%", sub: "Full channel attribution visibility", icon: "ChartBar" },
    { label: "Revenue Visibility", value: "100", suffix: "%", sub: "Real-time revenue tracking", icon: "CurrencyDollar" },
  ];

  const deliverables = [
    { title: "Data Audit Report", desc: "Complete mapping of current data sources, tracking gaps, and integration points.", icon: "MagnifyingGlass" },
    { title: "Data Architecture", desc: "Unified data model connecting marketing, sales, and revenue systems.", icon: "Cube" },
    { title: "Attribution Model", desc: "Custom attribution framework showing channel contribution to revenue.", icon: "ChartPie" },
    { title: "Unified Dashboard", desc: "Single source of truth dashboard with real-time metrics.", icon: "ChartBar" },
    { title: "Automated Reporting", desc: "Scheduled reports delivered to stakeholders with key insights.", icon: "Files" },
    { title: "API Connections", desc: "Data pipeline integrations connecting all your platforms.", icon: "PuzzlePiece" },
    { title: "Team Training", desc: "Training sessions for your team on using the new data systems.", icon: "GraduationCap" },
  ];

  const timelineSteps = [
    { week: "Week 1-2", title: "Data Audit", desc: "Map current data sources, tracking setup, and reporting gaps." },
    { week: "Week 3-4", title: "Architecture Design", desc: "Design data pipeline, attribution model, and reporting framework." },
    { week: "Week 5-8", title: "Implementation", desc: "Tracking setup, pipeline development, dashboard build, and automation." },
    { week: "Week 9-10", title: "Train & Maintain", desc: "Team training, documentation, and quality monitoring." },
  ];

  const faq = [
    { q: "What data sources can you connect?", a: "We connect CRMs, ad platforms (Google, Meta, LinkedIn), analytics tools, email platforms, payment systems, and any system with an API." },
    { q: "How do you handle data privacy and compliance?", a: "We implement data governance protocols, access controls, and ensure compliance with GDPR, CCPA, and relevant regulations." },
    { q: "Can you build a real-time dashboard?", a: "Yes. We build dashboards that update in real-time or near-real-time depending on your data sources and requirements." },
    { q: "What if our data is messy or incomplete?", a: "We clean, standardise, and enrich your data as part of the implementation process." },
    { q: "Do you integrate with our existing CRM?", a: "Yes. We connect to Salesforce, HubSpot, or custom CRMs as the central hub for your data." },
    { q: "How do you measure attribution?", a: "We build custom attribution models including first-touch, last-touch, multi-touch, and time-decay models based on your business model." },
    { q: "Is this suitable for small businesses?", a: "Yes. We right-size the solution based on your data volume and complexity. Start with core connections and expand over time." },
    { q: "How long until we have a unified view?", a: "Basic dashboard within 4 weeks. Full data integration and attribution typically takes 8-10 weeks." },
  ];

  const industries = [
    { name: "SaaS", icon: "Code", desc: "Subscription analytics and churn attribution." },
    { name: "E-Commerce", icon: "ShoppingCart", desc: "Full-funnel attribution from click to purchase." },
    { name: "Professional Services", icon: "Handshake", desc: "Pipeline tracking and lead source attribution." },
    { name: "B2B", icon: "Building", desc: "Complex sale attribution across multiple touchpoints." },
  ];

  const connectedServices = [
    { name: "Analytics Setup", desc: "Comprehensive tracking and analytics foundation." },
    { name: "Lead Attribution", desc: "Channel and campaign attribution modelling." },
    { name: "Dashboard Development", desc: "Custom dashboards for executive and team reporting." },
    { name: "Third-Party Integrations", desc: "API connections across your entire tech stack." },
  ];

  const insightsData = [
    { title: "Why Marketing and Sales Data Never Match", tag: "Analytics", readTime: "6 min", excerpt: "Common causes of data discrepancies and how to fix them at the source." },
    { title: "Attribution Modelling in the Age of Multi-Channel", tag: "Data", readTime: "7 min", excerpt: "Choosing the right attribution model for your business." },
    { title: "Building a Data-Driven Marketing Operation", tag: "Strategy", readTime: "8 min", excerpt: "How unified data transforms marketing decision-making." },
  ];

  return (
    <>
      <HeroSection solution={solution} visual={<DataSourcesSVG />} />
      <ProblemSection solution={solution} />
      <OpportunitySection metrics={kpiMetrics} />
      <FrameworkSection process={solution.process} visual="grid" />
      <DeliverablesGrid items={deliverables} />
      <TimelineSection steps={timelineSteps} label="Timeline" title="10-week" accent="roadmap." />
      <MetricsDashboard metrics={kpiMetrics} />
      <ToolsShowcase toolSlugs={solution.relevantTools} />
      <IndustriesGrid industries={industries} />
      <ConnectedServicesFlow services={connectedServices} />
      <FAQSection items={faq} />
      <InsightsSection insights={insightsData} />
      <ExploreOtherNavigator currentSlug={solution.slug} />
      <CTAFinal />
    </>
  );
}

function ClientPortalPage({ solution }: { solution: SolutionItem }) {
  const kpiMetrics = [
    { label: "Client Satisfaction", value: "95", suffix: "%", sub: "Client satisfaction score", icon: "Star" },
    { label: "Support Tickets", value: "60", suffix: "%", sub: "Reduction in support requests", icon: "ChatCircle" },
    { label: "Onboarding Speed", value: "70", suffix: "%", sub: "Faster client onboarding", icon: "Lightning" },
    { label: "File Delivery", value: "100", suffix: "%", sub: "On-time deliverable tracking", icon: "FolderOpen" },
  ];

  const deliverables = [
    { title: "Requirements Spec", desc: "Complete portal requirements based on your client workflows and needs.", icon: "Files" },
    { title: "Portal UX Design", desc: "User-centred portal design with client journey mapping.", icon: "Lightning" },
    { title: "Secure Authentication", desc: "SSO, 2FA, and role-based access control implementation.", icon: "Code" },
    { title: "Document Management", desc: "Secure file sharing, version control, and document collaboration.", icon: "FolderOpen" },
    { title: "Messaging System", desc: "In-platform messaging with notifications and conversation history.", icon: "ChatCircle" },
    { title: "Project Tracking", desc: "Project status, milestone tracking, and deliverable management.", icon: "Clock" },
    { title: "Client Reporting", desc: "Automated client reports and performance dashboards.", icon: "ChartBar" },
  ];

  const timelineSteps = [
    { week: "Week 1-2", title: "Requirements Gathering", desc: "Map client workflows, pain points, and desired portal features." },
    { week: "Week 3-4", title: "Design & Prototype", desc: "Portal UX design and interactive prototype for client feedback." },
    { week: "Week 5-10", title: "Development", desc: "Secure portal build with all features and integrations." },
    { week: "Week 11-12", title: "Launch & Training", desc: "Deployment, team training, and client onboarding." },
  ];

  const faq = [
    { q: "What features can a client portal include?", a: "Secure file sharing, messaging, project tracking, billing, reporting, calendar, task management, and custom client-specific features." },
    { q: "Is the portal secure?", a: "Yes. We implement enterprise-grade security including end-to-end encryption, SSO, 2FA, audit logging, and role-based access control." },
    { q: "Can clients access the portal on mobile?", a: "Yes. Portals are fully responsive and work on all devices including smartphones and tablets." },
    { q: "Do you integrate with our existing tools?", a: "Yes. We integrate with your CRM, project management, accounting, and communication tools via APIs." },
    { q: "How long does it take to build?", a: "Typically 8-12 weeks from requirements to launch, depending on feature complexity." },
    { q: "Can we brand the portal with our logo and colours?", a: "Yes. The portal is fully customisable with your branding, domain, and design preferences." },
    { q: "Do you provide training for our team?", a: "Yes. We provide training sessions and documentation for your team and your clients." },
    { q: "What if we need additional features later?", a: "We build the portal on a modular architecture so new features can be added easily." },
  ];

  const industries = [
    { name: "Agencies", icon: "Handshake", desc: "Client deliverable management and communication." },
    { name: "Consulting", icon: "Building", desc: "Project tracking, reporting, and client engagement." },
    { name: "Legal", icon: "Scales", desc: "Secure document sharing and case management." },
    { name: "Financial Services", icon: "CurrencyCircleDollar", desc: "Client portfolio access and secure reporting." },
  ];

  const connectedServices = [
    { name: "Custom CRM", desc: "Integration with CRM for client data synchronisation." },
    { name: "Web Applications", desc: "Custom web application development for portal features." },
    { name: "API Development", desc: "API integrations with existing business tools." },
    { name: "Admin Panels", desc: "Internal admin tools for portal management." },
  ];

  const insightsData = [
    { title: "Why Professional Services Firms Need Client Portals", tag: "Client Experience", readTime: "5 min", excerpt: "How portals improve client satisfaction and operational efficiency." },
    { title: "The ROI of Client Self-Service Portals", tag: "Business", readTime: "6 min", excerpt: "Quantifying the return on investment for client portal development." },
    { title: "Portal Security Best Practices for Service Businesses", tag: "Security", readTime: "7 min", excerpt: "Essential security features every client portal should have." },
  ];

  return (
    <>
      <HeroSection solution={solution} visual={<PortalUISVG />} />
      <ProblemSection solution={solution} />
      <OpportunitySection metrics={kpiMetrics} />
      <FrameworkSection process={solution.process} visual="pipeline" />
      <DeliverablesGrid items={deliverables} />
      <TimelineSection steps={timelineSteps} label="Timeline" title="12-week" accent="roadmap." />
      <MetricsDashboard metrics={kpiMetrics} />
      <ToolsShowcase toolSlugs={solution.relevantTools} />
      <IndustriesGrid industries={industries} />
      <ConnectedServicesFlow services={connectedServices} />
      <FAQSection items={faq} />
      <InsightsSection insights={insightsData} />
      <ExploreOtherNavigator currentSlug={solution.slug} />
      <CTAFinal />
    </>
  );
}


function ReputationPage({ solution }: { solution: SolutionItem }) {
  const kpiMetrics = [
    { label: "Review Score", value: "4.7", suffix: "/5", sub: "Average rating improvement", icon: "Star" },
    { label: "Review Volume", value: "300", suffix: "%", sub: "Increase in review count", icon: "ChatCircle" },
    { label: "Positive Sentiment", value: "92", suffix: "%", sub: "Sentiment analysis score", icon: "Heartbeat" },
    { label: "Brand Citations", value: "150", suffix: "%", sub: "Increase in brand mentions", icon: "Globe" },
  ];

  const deliverables = [
    { title: "Reputation Audit", desc: "Complete assessment of current online reputation across all platforms.", icon: "MagnifyingGlass" },
    { title: "Review Management System", desc: "Automated review monitoring, alerts, and response framework.", icon: "ChatCircle" },
    { title: "Citation Cleanup", desc: "Correction of inaccurate business information across directories.", icon: "Files" },
    { title: "Content Promotion", desc: "Positive content creation and promotion to dominate SERPs.", icon: "Globe" },
    { title: "Brand Mention Strategy", desc: "Proactive brand mention development across trusted sources.", icon: "ChartLineUp" },
    { title: "Crisis Response Plan", desc: "Prepared response framework for negative press or review crises.", icon: "Shield" },
    { title: "Monthly Reputation Reports", desc: "Comprehensive reputation tracking with sentiment analysis.", icon: "ChartBar" },
  ];

  const timelineSteps = [
    { week: "Week 1-2", title: "Reputation Audit", desc: "Assess reviews, citations, search results, and brand sentiment." },
    { week: "Week 3-4", title: "Strategy & Planning", desc: "Prioritised plan for review management, citation cleanup, and brand building." },
    { week: "Week 5-8", title: "Implementation", desc: "Review response, citation correction, positive content creation, and brand mentions." },
    { week: "Week 9-12", title: "Monitor & Maintain", desc: "Ongoing monitoring, alert systems, and continuous improvement." },
  ];

  const faq = [
    { q: "How do you handle negative reviews?", a: "We develop a response strategy that addresses concerns professionally. Not all reviews can be removed, but the right response can mitigate damage and demonstrate your commitment to customer satisfaction." },
    { q: "Can you remove negative search results?", a: "We cannot remove content we don't control, but we can push negative results down by creating and promoting positive content that ranks higher." },
    { q: "How long does reputation repair take?", a: "Review management shows results in 2-4 weeks. Pushing down negative search results typically takes 3-6 months of consistent content creation." },
    { q: "What platforms do you monitor?", a: "Google, Yelp, Trustpilot, Facebook, industry-specific review sites, and general web mentions across social media and forums." },
    { q: "How do you measure reputation improvement?", a: "We track review scores, volume, sentiment analysis, search result composition, and brand mention frequency." },
    { q: "Do you handle crisis communication?", a: "Yes. We have a crisis communication framework for managing sudden reputation threats including coordinated response and proactive messaging." },
    { q: "Can you improve my Google star rating?", a: "We implement systematic review generation strategies to increase the volume of positive reviews, which improves your overall rating." },
    { q: "Is reputation management ongoing?", a: "Yes. Reputation requires continuous monitoring and maintenance. New reviews, mentions, and content appear constantly." },
  ];

  const industries = [
    { name: "Hospitality", icon: "Storefront", desc: "Hotels and restaurants dependent on review scores." },
    { name: "Healthcare", icon: "Heartbeat", desc: "Medical practices needing trust and credibility." },
    { name: "Legal", icon: "Scales", desc: "Law firms where reputation drives client decisions." },
    { name: "Professional Services", icon: "Handshake", desc: "Service firms where trust is the primary purchase driver." },
  ];

  const connectedServices = [
    { name: "Digital PR", desc: "Positive press and media coverage development." },
    { name: "Brand Mentions", desc: "Proactive brand citation development." },
    { name: "Content Strategy", desc: "Positive content creation for SERP dominance." },
    { name: "Local SEO", desc: "Citation consistency and local reputation signals." },
  ];

  const insightsData = [
    { title: "The Financial Impact of Online Reputation", tag: "Reputation", readTime: "6 min", excerpt: "How much a one-star rating difference affects revenue across industries." },
    { title: "Responding to Negative Reviews: A Framework", tag: "Crisis Management", readTime: "5 min", excerpt: "How to respond to negative feedback professionally and effectively." },
    { title: "Building a Positive Brand Narrative Online", tag: "Brand", readTime: "7 min", excerpt: "A strategic approach to controlling your brand story in search results." },
  ];

  return (
    <>
      <HeroSection solution={solution} visual={<ReputationGraphSVG />} />
      <ProblemSection solution={solution} />
      <OpportunitySection metrics={kpiMetrics} />
      <FrameworkSection process={solution.process} visual="timeline" />
      <DeliverablesGrid items={deliverables} />
      <TimelineSection steps={timelineSteps} label="Timeline" title="12-week" accent="roadmap." />
      <MetricsDashboard metrics={kpiMetrics} />
      <ToolsShowcase toolSlugs={solution.relevantTools} />
      <IndustriesGrid industries={industries} />
      <ConnectedServicesFlow services={connectedServices} />
      <FAQSection items={faq} />
      <InsightsSection insights={insightsData} />
      <ExploreOtherNavigator currentSlug={solution.slug} />
      <CTAFinal />
    </>
  );
}

/* -- MAIN EXPORT -- */

export function SolutionDetailContent({ solution }: { solution: SolutionItem }) {
  const pages: Record<string, ({ solution }: { solution: SolutionItem }) => React.ReactNode> = {
    "generate-more-qualified-leads": LeadsPage,
    "improve-search-visibility": SearchVisibilityPage,
    "become-visible-in-ai-search": AIVisibilityPage,
    "reduce-manual-work-automation": AutomationPage,
    "build-custom-crm": CustomCRMPage,
    "launch-digital-product": LaunchProductPage,
    "grow-multi-location-business": MultiLocationPage,
    "improve-local-visibility": LocalVisibilityPage,
    "improve-conversion-rates": CROPage,
    "modernise-existing-website": ModerniseWebsitePage,
    "connect-marketing-sales-data": DataConnectPage,
    "build-client-portal": ClientPortalPage,
    "improve-online-reputation": ReputationPage,
  };
  const Page = pages[solution.slug];
  if (!Page) return null;
  return <Page solution={solution} />;
}
