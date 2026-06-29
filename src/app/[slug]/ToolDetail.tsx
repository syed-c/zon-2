"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MagnifyingGlass, Robot, FileText, Calculator, MapPin, SealCheck, Gear, Globe,
  ArrowRight, CheckCircle, Clock, Star, Lightning, ChartBar, ChartLineUp,
  Eye, Code, List, Graph, Target, Question,
} from "@phosphor-icons/react";
import type { ToolItem } from "@/data/tools";
import { toolCategories } from "@/data/tools";
import { getToolDetailConfig } from "@/data/tool-detail-content";
import ShapeGrid from "@/components/ShapeGrid";

const ease = [0.32, 0.72, 0, 1] as const;

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ y: 32, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const categoryIcons: Record<string, React.ComponentType<any>> = {
  "SEO Tools": MagnifyingGlass,
  "GEO & AI Search Tools": Robot,
  "Website Audit Tools": Globe,
  "Content Tools": FileText,
  "Advertising Tools": Calculator,
  "Local Marketing Tools": MapPin,
  "PR & Brand Tools": SealCheck,
  "Business & AI Tools": Gear,
};

/* ─── HERO ─── */

function HeroSection({ tool }: { tool: ToolItem }) {
  const CatIcon = categoryIcons[tool.category] || MagnifyingGlass;
  return (
    <section className="relative pt-36 pb-24 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.12]">
          <ShapeGrid speed={0.1} squareSize={36} direction="diagonal" borderColor="#D4A849" hoverFillColor="#D4A849" shape="square" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ground/90 pointer-events-none" />
        <div className="absolute top-12 right-[10%] text-[clamp(6rem,14vw,12rem)] font-mono font-semibold text-accent/[0.04] leading-none select-none pointer-events-none">01</div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.008]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.3), transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/10" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <Link href="/tools" className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4 block hover:text-accent/80 transition-colors">
            <span className="flex items-center gap-2">
              <ArrowRight size={12} className="rotate-180" />
              {tool.category}
            </span>
          </Link>
          <h1 className="font-display font-semibold text-[clamp(2.5rem,5vw,5rem)] tracking-[-0.025em] leading-[0.92] text-text-primary mb-6 max-w-4xl">
            {tool.name}
          </h1>
          <p className="text-lg text-text-secondary/80 leading-relaxed max-w-[55ch]">
            {tool.description}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── WORKSPACE ─── */

function WorkspaceSection({ tool }: { tool: ToolItem }) {
  const [input, setInput] = useState("");
  const [ran, setRan] = useState(false);
  const cfg = getToolDetailConfig(tool.slug, tool.category);

  if (!tool.isMvp) {
    return (
      <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 20%, rgba(212,168,73,0.02), transparent)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <FadeUp>
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center mx-auto mb-6">
                <Star size={28} className="text-accent" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-text-primary mb-3">Coming Soon</h2>
              <p className="text-text-secondary/60 max-w-md mx-auto mb-8">
                We&apos;re building this tool right now. It will be available for free once it passes our quality and accuracy benchmarks.
              </p>
              <div className="inline-flex items-center gap-2 text-xs text-text-secondary/40 bg-surface px-4 py-2 rounded-full border border-accent/10">
                <Clock size={14} className="text-accent" />
                <span>Estimated launch: Q3 2026</span>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px circle at 50% 30%, rgba(212,168,73,0.02), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-12">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Interactive Tool</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary mb-4">
            Try it <span className="text-accent">now.</span>
          </h2>
        </FadeUp>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12">
          <FadeUp>
            <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
              <label className="text-[10px] tracking-[0.1em] uppercase text-text-secondary/60 mb-2 block">{cfg.inputLabel}</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={cfg.inputPlaceholder}
                  className="flex-1 bg-surface border border-white/5 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent/40 transition-all"
                />
                <button
                  onClick={() => setRan(true)}
                  className="group inline-flex items-center gap-2 bg-accent text-ground px-5 py-3 rounded-xl font-medium text-sm active:scale-[0.98] transition-all duration-150 shrink-0"
                >
                  {cfg.buttonLabel}
                  <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
              <p className="text-[10px] text-text-secondary/40 mt-3">{cfg.runDescription}</p>
            </div>

            {ran && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="mt-6 p-6 rounded-[1.5rem] bg-[#181818] border border-accent/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <CheckCircle size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">Analysis Complete</p>
                      <p className="text-[10px] text-text-secondary/40">Based on your input</p>
                    </div>
                  </div>
                  <button onClick={() => setRan(false)} className="text-[9px] text-text-secondary/30 hover:text-text-secondary/60 transition-colors">Reset</button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {cfg.stats.slice(0, 3).map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-xl bg-surface/50 border border-accent/5">
                      <p className="font-mono text-lg font-semibold text-accent">{stat.stat}</p>
                      <p className="text-[8px] text-text-secondary/40 uppercase tracking-[0.05em] mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-accent/60" />
                <span className="text-[9px] text-text-secondary/40 uppercase tracking-[0.1em]">Preview</span>
              </div>
              <ToolPreview tool={tool} ran={ran} />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function ToolPreview({ tool, ran }: { tool: ToolItem; ran: boolean }) {
  const CatIcon = categoryIcons[tool.category] || MagnifyingGlass;

  if (!ran) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
        <div className="w-14 h-14 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center mb-4">
          <CatIcon size={26} className="text-accent/40" />
        </div>
        <p className="text-xs text-text-secondary/40">Enter your details and click</p>
        <p className="text-xs text-text-secondary/40">&quot;Run&quot; to see results here</p>
      </div>
    );
  }

  const isSeo = tool.category === "SEO Tools";
  const isGeo = tool.category === "GEO & AI Search Tools";
  const isAd = tool.category === "Advertising Tools";
  const isContent = tool.category === "Content Tools";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-text-secondary/40 uppercase tracking-[0.1em]">Results Overview</span>
        <span className="flex items-center gap-1 text-[9px] text-accent/60">
          <Lightning size={10} weight="fill" />
          Live
        </span>
      </div>

      {isSeo && (
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 rounded-xl bg-surface/50 border border-accent/5">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(212,168,73,0.1)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#D4A849" strokeWidth="3" strokeDasharray="97.4" strokeDashoffset="19.5" strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold text-accent">82</span>
            </div>
            <div>
              <p className="text-xs font-medium text-text-primary">Health Score</p>
              <p className="text-[9px] text-text-secondary/40 mt-1">Good — 18 issues found</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {[{ label: "Technical", score: 88, color: "bg-accent" }, { label: "Content", score: 76, color: "bg-accent/80" }, { label: "Performance", score: 71, color: "bg-accent/60" }, { label: "Links", score: 85, color: "bg-accent/90" }].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-[8px] text-text-secondary/30 w-16 shrink-0">{item.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-surface overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }} />
                </div>
                <span className="text-[9px] font-mono text-text-secondary/60 w-6 text-right">{item.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isGeo && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {["ChatGPT", "Perplexity", "AI Overviews"].map((platform) => (
              <div key={platform} className="p-3 rounded-xl bg-surface/50 border border-accent/5 text-center">
                <div className="w-2 h-2 rounded-full bg-accent mx-auto mb-1.5" />
                <p className="text-[9px] font-medium text-text-primary">{platform}</p>
                <p className="text-[8px] text-text-secondary/40 mt-0.5">{platform === "ChatGPT" ? "Cited" : platform === "Perplexity" ? "Referenced" : "Visible"}</p>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl bg-surface/50 border border-accent/5">
            <p className="text-[9px] text-text-secondary/40 mb-2">Entity Signals</p>
            <div className="flex flex-wrap gap-1.5">
              {["Schema", "Citations", "Mentions", "Reviews", "Social"].map((s) => (
                <span key={s} className="text-[8px] text-accent/70 bg-accent/5 px-2 py-0.5 rounded-full border border-accent/10">{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {isAd && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Est. Clicks", value: "2,847" },
              { label: "Est. CPC", value: "$3.42" },
              { label: "Est. Conv.", value: "142" },
              { label: "ROAS", value: "4.2x" },
            ].map((m) => (
              <div key={m.label} className="p-3 rounded-xl bg-surface/50 border border-accent/5 text-center">
                <p className="font-mono text-sm font-semibold text-accent">{m.value}</p>
                <p className="text-[8px] text-text-secondary/40 uppercase tracking-[0.05em] mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="h-16 rounded-xl bg-surface/50 border border-accent/5 flex items-end gap-1 px-2 py-1.5">
            {[35, 60, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm bg-accent/40" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      )}

      {isContent && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-accent/5">
            <div className="text-center">
              <p className="font-mono text-xl font-semibold text-accent">74</p>
              <p className="text-[7px] text-text-secondary/40 uppercase tracking-[0.05em]">Score</p>
            </div>
            <div className="flex-1 space-y-1">
              {[
                { label: "Readability", score: 82 },
                { label: "SEO Optimisation", score: 68 },
                { label: "Structure", score: 71 },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className="text-[7px] text-text-secondary/30 w-14">{item.label}</span>
                  <div className="flex-1 h-1 rounded-full bg-surface overflow-hidden">
                    <div className="h-full rounded-full bg-accent/70" style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-text-secondary/40">
            <CheckCircle size={10} className="text-accent/60" />
            <span>Keywords found: 12 of 15 target terms</span>
          </div>
        </div>
      )}

      {!isSeo && !isGeo && !isAd && !isContent && (
        <div className="grid grid-cols-2 gap-3">
          {["Analysis", "Quality", "Coverage", "Authority"].map((metric) => (
            <div key={metric} className="p-3 rounded-xl bg-surface/50 border border-accent/5 text-center">
              <p className="font-mono text-base font-semibold text-accent">{Math.floor(Math.random() * 40 + 60)}</p>
              <p className="text-[8px] text-text-secondary/40 uppercase tracking-[0.05em] mt-0.5">{metric}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── HOW IT WORKS ─── */

function StepsSection({ tool }: { tool: ToolItem }) {
  const cfg = getToolDetailConfig(tool.slug, tool.category);

  return (
    <section className="py-28 lg:py-36 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.005]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.4), transparent 70%)" }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-14">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">How It Works</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary mb-4">
            From input to <span className="text-accent">insight.</span></h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {cfg.steps.map((step, i) => (
            <FadeUp key={step.title} delay={i * 0.07}>
              <div className="relative">
                <div className="p-6 rounded-[1.25rem] bg-[#181818] border border-accent/10 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <span className="font-mono text-xs font-semibold text-accent">0{i + 1}</span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent hidden lg:block" />
                  </div>
                  <h3 className="font-display text-sm font-medium text-text-primary mb-1.5">{step.title}</h3>
                  <p className="text-[10px] text-text-secondary/50 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WHY IT MATTERS ─── */

function WhySection({ tool }: { tool: ToolItem }) {
  const cfg = getToolDetailConfig(tool.slug, tool.category);

  return (
    <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 50%, rgba(212,168,73,0.02), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-14">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Why It Matters</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary mb-4">
            Small changes, <span className="text-accent">big impact.</span></h2>
        </FadeUp>
        <div className="grid sm:grid-cols-3 gap-4">
          {cfg.stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.07}>
              <div className="p-8 rounded-[1.25rem] bg-[#181818] border border-accent/10 text-center hover:border-accent/25 transition-all duration-300">
                <p className="font-mono text-3xl lg:text-4xl font-semibold text-accent mb-2">{stat.stat}</p>
                <p className="text-[11px] text-text-secondary/60 uppercase tracking-[0.05em]">{stat.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── RECOMMENDATIONS ─── */

function RecommendationsSection({ tool }: { tool: ToolItem }) {
  const cfg = getToolDetailConfig(tool.slug, tool.category);

  const impactStyles = {
    high: { dot: "bg-accent", bg: "bg-accent/10 border-accent/25" },
    medium: { dot: "bg-accent/60", bg: "bg-accent/5 border-accent/15" },
    low: { dot: "bg-text-secondary/30", bg: "bg-surface border-accent/5" },
  };

  return (
    <section className="py-28 lg:py-36 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.005]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.4), transparent 70%)" }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-14">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Recommendations</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary mb-4">
            What to do <span className="text-accent">next.</span></h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 gap-3">
          {cfg.recommendations.map((rec, i) => {
            const styles = impactStyles[rec.impact];
            return (
              <FadeUp key={rec.title} delay={i * 0.06}>
                <div className={`p-5 rounded-[1.25rem] border transition-all duration-300 hover:-translate-y-0.5 ${styles.bg}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
                    <span className={`text-[8px] font-medium uppercase tracking-[0.1em] ${rec.impact === "high" ? "text-accent" : rec.impact === "medium" ? "text-accent/60" : "text-text-secondary/40"}`}>
                      {rec.impact === "high" ? "High Impact" : rec.impact === "medium" ? "Medium Impact" : "Low Impact"}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-medium text-text-primary mb-1">{rec.title}</h3>
                  <p className="text-[10px] text-text-secondary/50 leading-relaxed">{rec.desc}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── RELATED TOOLS ─── */

function RelatedSection({ tool }: { tool: ToolItem }) {
  const related = toolCategories
    .filter((c) => c.name === tool.category)
    .flatMap((c) => c.tools)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 50%, rgba(212,168,73,0.02), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-14">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Complete the Workflow</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary mb-4">
            More tools for <span className="text-accent">{tool.category.replace(" Tools", "").toLowerCase()}.</span></h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {related.map((t, i) => {
            const RelIcon = categoryIcons[t.category] || MagnifyingGlass;
            return (
            <FadeUp key={t.slug} delay={i * 0.05}>
              <Link
                href={`/${t.slug}`}
                className="group block p-5 rounded-[1.25rem] bg-[#181818] border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-all">
                    <RelIcon size={15} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-medium text-text-primary group-hover:text-accent transition-colors truncate">{t.name}</h3>
                    <p className="text-[8px] text-text-secondary/40 mt-0.5">{t.isMvp ? "Available Now" : "Coming Soon"}</p>
                  </div>
                </div>
                <p className="text-[9px] text-text-secondary/50 leading-relaxed line-clamp-2">{t.shortDesc}</p>
              </Link>
            </FadeUp>
            );
          })}
        </div>
        <FadeUp delay={0.2}>
          <div className="text-center mt-10">
            <Link
              href="/tools"
              className="group inline-flex items-center gap-2 bg-accent text-ground pl-6 pr-2 py-2 rounded-full font-medium text-sm active:scale-[0.98] transition-transform duration-150"
            >
              View All Tools
              <span className="w-7 h-7 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowRight size={14} weight="bold" />
              </span>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── CTA ─── */

function CTASection() {
  return (
    <section className="py-28 lg:py-32 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 0%, rgba(212,168,73,0.04), transparent)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="font-display font-semibold text-[clamp(2.5rem,5vw,5rem)] tracking-[-0.03em] leading-[0.95] text-text-primary text-balance max-w-3xl mx-auto mb-4"
        >
          Need expert help <span className="text-accent">interpreting results?</span>
        </motion.h2>
        <motion.p
          initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="text-text-secondary text-base max-w-[55ch] mx-auto mb-10"
        >
          Book a free strategy call. We&apos;ll review your results and build a custom growth plan.
        </motion.p>
        <motion.div
          initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 bg-accent text-ground pl-8 pr-3 py-3 rounded-full font-medium text-sm active:scale-[0.98] transition-transform duration-150 shadow-[0_0_30px_rgba(212,168,73,0.15)]"
          >
            Book a Free Strategy Call
            <span className="w-8 h-8 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <ArrowRight size={14} weight="bold" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── MAIN EXPORT ─── */

export function ToolDetailContent({ tool }: { tool: ToolItem }) {
  return (
    <>
      <HeroSection tool={tool} />
      <WorkspaceSection tool={tool} />
      <StepsSection tool={tool} />
      <WhySection tool={tool} />
      <RecommendationsSection tool={tool} />
      <RelatedSection tool={tool} />
      <CTASection />
    </>
  );
}
