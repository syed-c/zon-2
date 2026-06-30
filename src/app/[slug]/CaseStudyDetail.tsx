"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Quotes, Heartbeat, Scales, Buildings, HardHat, House, Bed,
  ShoppingCart, GraduationCap, Cpu, TrendUp, ChartLineUp, ChartBar, Globe,
  MapPin, Clock, Users, Target, Star, Lightning, CheckCircle, SealCheck,
  CaretRight, CaretDown, MagnifyingGlass, Gear, Code, Database, Robot,
  Question, Sparkle, Graph, CurrencyCircleDollar, BookOpenText, Eye,
  Wrench, Bag, ArrowLineUpRight, ListBullets, Phone, ChatCircleDots,
} from "@phosphor-icons/react";
import type { CaseStudyItem } from "@/data/case-studies";
import { caseStudies } from "@/data/case-studies";
import CTA from "@/components/CTA";
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

function NumberCard({ label, value, accent = "#D4A849" }: { label: string; value: string; accent?: string }) {
  return (
    <div className="p-5 rounded-[1.25rem] bg-[#181818] border border-accent/25 hover:border-accent/50 transition-all duration-300 hover:-translate-y-0.5">
      <p className="font-mono text-2xl lg:text-3xl font-semibold text-accent mb-1">{value}</p>
      <p className="text-[11px] text-text-secondary/60 uppercase tracking-[0.05em]">{label}</p>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-text-secondary/60 bg-surface px-2.5 py-1 rounded-full border border-accent/10">
      {label}
    </span>
  );
}

function SectionLabel({ text }: { text: string }) {
  return <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">{text}</span>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display font-semibold text-[clamp(1.8rem,3vw,2.5rem)] tracking-[-0.025em] leading-[1.1] text-text-primary mb-6">
      {children}
    </h2>
  );
}

function MiniGraph({ bars, color = "#D4A849" }: { bars: number[]; color?: string }) {
  const max = Math.max(...bars, 1);
  return (
    <div className="flex items-end gap-[3px] h-12">
      {bars.map((b, i) => (
        <div key={i} className="w-[6px] rounded-t-sm transition-all duration-500" style={{ height: `${(b / max) * 100}%`, background: color, opacity: 0.3 + (i / bars.length) * 0.7 }} />
      ))}
    </div>
  );
}

function Timeline({ months }: { months: { label: string; desc: string; active?: boolean }[] }) {
  return (
    <div className="space-y-0">
      {months.map((m, i) => (
        <div key={i} className="flex gap-4 pb-6 relative">
          <div className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full border-2 ${m.active ? "bg-accent border-accent" : "bg-transparent border-accent/30"} shrink-0 mt-1`} />
            {i < months.length - 1 && <div className="w-px flex-1 bg-accent/10" />}
          </div>
          <div>
            <p className="text-xs font-mono text-accent font-medium mb-0.5">{m.label}</p>
            <p className="text-xs text-text-secondary/60">{m.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const industryTheme: Record<string, { icon: React.ComponentType<{size?: number; className?: string}>; bgPattern: string; accent: string; visual: string }> = {
  Healthcare: { icon: Heartbeat, bgPattern: "radial-gradient(circle at 30% 20%, rgba(212,168,73,0.04), transparent 60%)", accent: "#D4A849", visual: "Patient Care" },
  Fintech: { icon: CurrencyCircleDollar, bgPattern: "radial-gradient(circle at 70% 30%, rgba(212,168,73,0.04), transparent 60%)", accent: "#D4A849", visual: "Financial Growth" },
  "Real Estate": { icon: House, bgPattern: "radial-gradient(circle at 50% 20%, rgba(212,168,73,0.04), transparent 60%)", accent: "#D4A849", visual: "Property" },
  "E-Commerce": { icon: ShoppingCart, bgPattern: "radial-gradient(circle at 40% 30%, rgba(212,168,73,0.04), transparent 60%)", accent: "#D4A849", visual: "Revenue" },
  EdTech: { icon: GraduationCap, bgPattern: "radial-gradient(circle at 60% 20%, rgba(212,168,73,0.04), transparent 60%)", accent: "#D4A849", visual: "Learning" },
  "Supply Chain": { icon: Buildings, bgPattern: "radial-gradient(circle at 30% 40%, rgba(212,168,73,0.04), transparent 60%)", accent: "#D4A849", visual: "Logistics" },
  "Life Sciences": { icon: Graph, bgPattern: "radial-gradient(circle at 70% 40%, rgba(212,168,73,0.04), transparent 60%)", accent: "#D4A849", visual: "Research" },
  Construction: { icon: HardHat, bgPattern: "radial-gradient(circle at 50% 40%, rgba(212,168,73,0.04), transparent 60%)", accent: "#D4A849", visual: "Building" },
  SaaS: { icon: Cpu, bgPattern: "radial-gradient(circle at 40% 20%, rgba(212,168,73,0.04), transparent 60%)", accent: "#D4A849", visual: "Platform" },
};

function HeroSection({ study }: { study: CaseStudyItem }) {
  const theme = getTheme(study.industry);
  const Icon = theme.icon;
  return (
    <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.12]">
          <ShapeGrid speed={0.1} squareSize={36} direction="diagonal" borderColor="#D4A849" hoverFillColor="#D4A849" shape="square" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ground/90 pointer-events-none" />
        <div className="absolute top-12 right-[10%] text-[clamp(6rem,14vw,12rem)] font-mono font-semibold text-accent/[0.04] leading-none select-none pointer-events-none">12</div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.008]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.3), transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/10" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <Link href="/work" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-6 block hover:text-accent transition-colors">← Case Studies</Link>
          <div className="flex items-center gap-3 mb-4">
            <Icon size={16} className="text-accent" />
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent">{study.industry}</span>
            <span className="w-px h-4 bg-accent/20" />
            <span className="text-[11px] text-text-secondary">{study.category}</span>
          </div>
          <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4.5rem)] tracking-[-0.025em] leading-[0.95] text-text-primary mb-4 max-w-4xl">{study.client}</h1>
          <p className="text-lg text-text-secondary/80 leading-relaxed max-w-[55ch] mb-6">{study.project}</p>
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent/10 border border-accent/25">
            <Lightning size={14} className="text-accent" />
            <span className="text-sm font-mono font-semibold text-accent">{study.result}</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function ExecutiveSummary({ study }: { study: CaseStudyItem }) {
  const items = [
    { label: "Industry", value: study.industry },
    { label: "Services", value: study.category },
    { label: "Timeline", value: "4–6 months" },
    { label: "Primary KPI", value: study.metrics[0]?.label ?? "N/A" },
    { label: "Outcome", value: study.metrics[0]?.value ?? "N/A" },
  ];
  return (
    <section className="py-12 lg:py-16 bg-[#0D0C0B] border-y border-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {items.map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-[#181818] border border-accent/10">
                <p className="text-[9px] font-medium tracking-[0.1em] uppercase text-text-secondary/40 mb-1">{item.label}</p>
                <p className="text-sm font-medium text-text-primary">{item.value}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function BusinessChallenge({ study }: { study: CaseStudyItem }) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-ground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <FadeUp>
            <SectionLabel text="The Challenge" />
            <SectionTitle>What they <span className="text-accent">faced.</span></SectionTitle>
            <p className="text-text-secondary leading-relaxed text-base">{study.challenge}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Revenue leakage",
                "Wasted team hours",
                "Manual processes",
                "Missed opportunities",
              ].slice(0, 2 + study.metrics.length % 3).map((pain) => (
                <span key={pain} className="text-[9px] font-medium tracking-[0.1em] uppercase text-red-400/60 bg-red-400/5 px-2.5 py-1 rounded-full border border-red-400/10">{pain}</span>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
              <SectionLabel text="Key Pain Points" />
              <div className="space-y-4 mt-4">
                {study.challenge.split(". ").filter(Boolean).slice(0, 4).map((point, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-2 shrink-0" />
                    <p className="text-sm text-text-secondary/70">{point.replace(/\.$/, "")}.</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function StrategyBlueprint({ study }: { study: CaseStudyItem }) {
  const steps = [
    { step: "01", title: "Discovery", desc: "Deep research into the business, market, competition, and existing performance data to identify the highest-leverage opportunities." },
    { step: "02", title: "Strategy", desc: "Building a tailored roadmap with prioritised initiatives, resource planning, and measurable KPI targets aligned to business goals." },
    { step: "03", title: "Execute", desc: "Rapid, iterative implementation with continuous delivery, weekly stakeholder reviews, and data-informed course correction." },
    { step: "04", title: "Optimise", desc: "Analysing results, refining tactics, scaling what works, and building repeatable systems for sustained growth beyond the engagement." },
  ];
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 30% 50%, rgba(212,168,73,0.02), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-14">
          <SectionLabel text="Strategy Blueprint" />
          <SectionTitle>How we <span className="text-accent">solved it.</span></SectionTitle>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <FadeUp key={s.step} delay={i * 0.05}>
              <div className="p-6 rounded-[1.25rem] bg-[#181818] border border-accent/10 h-full">
                <span className="text-[11px] font-mono font-semibold text-accent mb-3 block">{s.step}</span>
                <h3 className="font-display text-lg font-medium text-text-primary mb-2">{s.title}</h3>
                <p className="text-xs text-text-secondary/60 leading-relaxed">{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExecutionTimeline({ study }: { study: CaseStudyItem }) {
  const months = [
    { label: "Month 1", desc: "Audit, research, and strategic planning. Baseline metrics established.", active: true },
    { label: "Month 2", desc: "Initial implementation — quick wins deployed and measured.", active: true },
    { label: "Month 3", desc: "Core execution — major initiatives underway with weekly reporting.", active: true },
    { label: "Month 4", desc: "Optimisation and scaling — data-driven refinement of all channels.", active: true },
    { label: "Month 5", desc: "Systems and playbooks — repeatable processes documented and handed over.", active: false },
    { label: "Month 6", desc: "Ongoing growth — client team trained and autonomous.", active: false },
  ];
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-ground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
          <FadeUp>
            <SectionLabel text="Execution Timeline" />
            <SectionTitle>How it <span className="text-accent">unfolded.</span></SectionTitle>
            <p className="text-text-secondary leading-relaxed max-w-md">Every engagement follows a structured but flexible timeline. Here is how this project progressed from discovery to delivery.</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
              <Timeline months={months} />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function ResultsDashboard({ study }: { study: CaseStudyItem }) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 50%, rgba(212,168,73,0.015), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-14">
          <SectionLabel text="Results Dashboard" />
          <SectionTitle>The <span className="text-accent">numbers.</span></SectionTitle>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {study.metrics.map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.04}>
              <NumberCard label={m.label} value={m.value} />
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.2}>
          <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4">Performance Visualisation</p>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {study.metrics.map((m, i) => {
                const num = parseFloat(m.value.replace(/[^0-9.]/g, ""));
                const bars = Array.from({ length: 8 }, () => Math.floor(Math.random() * num * 0.15) + num * 0.05);
                return (
                  <div key={m.label} className="text-center">
                    <MiniGraph bars={bars} />
                    <p className="text-[9px] text-text-secondary/40 mt-2 truncate">{m.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function TestimonialBlock({ study }: { study: CaseStudyItem }) {
  if (!study.testimonial) return null;
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(600px circle at 30% 50%, rgba(212,168,73,0.03), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-4xl mx-auto text-center">
          <div className="p-8 lg:p-12 rounded-[1.5rem] bg-[#181818] border border-accent/10 relative">
            <Quotes size={24} className="text-accent/20 absolute top-6 left-6" />
            <blockquote className="font-display text-xl lg:text-2xl font-medium text-text-primary leading-relaxed mb-8 italic max-w-3xl mx-auto">
              &ldquo;{study.testimonial.quote}&rdquo;
            </blockquote>
            <div className="w-12 h-px bg-accent/30 mx-auto mb-6" />
            <p className="text-sm font-medium text-text-primary">{study.testimonial.person}</p>
            <p className="text-xs text-text-secondary/60">{study.testimonial.role}</p>
            <div className="flex items-center justify-center gap-1 mt-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={12} weight="fill" className="text-accent/60" />
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function TechnologyStack({ study }: { study: CaseStudyItem }) {
  const techs = [
    { name: "Next.js", slug: "nextjs", count: 5 },
    { name: "React", slug: "react", count: 6 },
    { name: "Node.js", slug: "nodejs", count: 4 },
    { name: "Python", slug: "python", count: 3 },
    { name: "OpenAI", slug: "openai", count: 3 },
    { name: "Stripe", slug: "stripe", count: 2 },
    { name: "HubSpot", slug: "hubspot", count: 3 },
    { name: "PostgreSQL", slug: "postgresql", count: 4 },
    { name: "TypeScript", slug: "typescript", count: 5 },
    { name: "Google Cloud", slug: "google-cloud", count: 2 },
    { name: "Vercel", slug: "vercel", count: 4 },
    { name: "Superset", slug: "superset", count: 1 },
    { name: "dbt", slug: "dbt", count: 1 },
    { name: "GA4", slug: "ga4", count: 3 },
    { name: "Shopify", slug: "shopify", count: 1 },
    { name: "WordPress", slug: "wordpress", count: 2 },
  ].filter((t) => study.description.toLowerCase().includes(t.name.toLowerCase()) || study.servicesUsed.some((s) => s.includes(t.slug))).slice(0, 8);
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0C0B] border-t border-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-12">
          <SectionLabel text="Technology Stack" />
          <SectionTitle>Tools we <span className="text-accent">used.</span></SectionTitle>
        </FadeUp>
        <div className="flex flex-wrap gap-3">
          {techs.map((t, i) => (
            <FadeUp key={t.slug} delay={i * 0.03}>
              <div className="group px-4 py-2.5 rounded-xl bg-[#181818] border border-accent/10 hover:border-accent/25 transition-all duration-200">
                <span className="text-sm text-text-secondary group-hover:text-accent transition-colors">{t.name}</span>
                <span className="ml-2 text-[10px] font-mono text-text-secondary/30">{t.count}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedSolutions({ study }: { study: CaseStudyItem }) {
  if (study.servicesUsed.length === 0) return null;
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-ground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-12">
          <SectionLabel text="Related Solutions" />
          <SectionTitle>Services that made <span className="text-accent">this possible.</span></SectionTitle>
          <p className="text-text-secondary/60 text-sm mt-2">Each solution was selected and tailored specifically for {study.client}&apos;s unique business challenges and industry context.</p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {study.servicesUsed.slice(0, 6).map((slug, i) => (
            <FadeUp key={slug} delay={i * 0.03}>
              <Link href={`/${slug}`} className="block group">
                <div className="p-4 rounded-xl bg-[#181818] border border-accent/10 hover:border-accent/25 transition-all duration-200 flex items-center justify-between">
                  <span className="text-sm text-text-primary group-hover:text-accent transition-colors capitalize">{slug.replace(/-/g, " ")}</span>
                  <ArrowLineUpRight size={14} className="text-text-secondary/30 group-hover:text-accent transition-colors" />
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function MoreCaseStudies({ study }: { study: CaseStudyItem }) {
  const related = caseStudies.filter((s) => s.slug !== study.slug && (s.industry === study.industry || s.category === study.category)).slice(0, 3);
  if (related.length === 0) return null;
  const Icon = industryTheme[study.industry]?.icon ?? Globe;
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0C0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-12">
          <SectionLabel text="Continue Exploring" />
          <SectionTitle>More <span className="text-accent">case studies.</span></SectionTitle>
          <p className="text-text-secondary/60 text-sm mt-2">Similar industries, similar challenges, similar results.</p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {related.map((cs, i) => (
            <FadeUp key={cs.slug} delay={i * 0.05}>
              <Link href={`/${cs.slug}`} className="block group">
                <div className="p-6 rounded-[1.25rem] bg-[#181818] border border-accent/10 hover:border-accent/25 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={12} className="text-accent" />
                    <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent">{cs.industry}</span>
                  </div>
                  <h3 className="font-display text-base font-medium text-text-primary mb-1 group-hover:text-accent transition-colors">{cs.client}</h3>
                  <p className="text-xs text-text-secondary/60 mb-3 line-clamp-2">{cs.project}</p>
                  <p className="font-mono text-sm font-semibold text-accent mb-3">{cs.result}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-accent/40 group-hover:text-accent transition-colors">
                    Read case study <ArrowRight size={10} />
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightsBlock() {
  const insights = [
    { title: "How to Measure the ROI of Digital Growth Initiatives", slug: "measure-digital-roi", category: "Analytics", readTime: "8 min" },
    { title: "Why Industry-Specific SEO Outperforms Generic Strategies", slug: "industry-specific-seo", category: "SEO", readTime: "10 min" },
    { title: "The Future of AI in Business Growth: What Works Now", slug: "ai-business-growth", category: "AI & Automation", readTime: "12 min" },
  ];
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-ground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-12">
          <SectionLabel text="Related Insights" />
          <SectionTitle>Resources to <span className="text-accent">go deeper.</span></SectionTitle>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((post, i) => (
            <FadeUp key={post.slug} delay={i * 0.04}>
              <Link href={`/${post.slug}`} className="block group">
                <div className="p-5 rounded-[1.25rem] bg-[#181818] border border-accent/10 hover:border-accent/25 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent">{post.category}</span>
                    <span className="w-px h-3 bg-accent/10" />
                    <span className="text-[9px] text-text-secondary/40">{post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">{post.title}</h3>
                  <div className="flex items-center gap-1 mt-3 text-[10px] text-accent/40 group-hover:text-accent transition-colors">
                    <BookOpenText size={10} />
                    <span>Read article</span>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 0%, rgba(212,168,73,0.06), transparent)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease }} className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4 block">
          Start Your Growth Story
        </motion.span>
        <motion.h2 initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease }} className="font-display font-semibold text-[clamp(2.5rem,5vw,5rem)] tracking-[-0.03em] leading-[0.95] text-text-primary text-balance max-w-4xl mx-auto mb-4">
          Let&apos;s build your <span className="text-accent">success story.</span>
        </motion.h2>
        <motion.p initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.05, ease }} className="text-text-secondary text-base max-w-[55ch] mx-auto mb-10">
          Free audit. No commitment. First results within 60 days or we fix it.
        </motion.p>
        <motion.div initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.1, ease }} className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/seo-audit" className="group inline-flex items-center gap-2 bg-accent text-ground pl-8 pr-3 py-3 rounded-full font-medium text-sm active:scale-[0.98] transition-transform duration-150 shadow-[0_0_30px_rgba(212,168,73,0.15)] hover:shadow-[0_0_40px_rgba(212,168,73,0.25)]">
            Get Free Audit
            <span className="w-8 h-8 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <ArrowRight size={14} weight="bold" />
            </span>
          </Link>
          <Link href="/contact" className="text-text-secondary/50 underline underline-offset-4 hover:text-text-primary text-sm transition-colors duration-200">
            Talk to our team
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── MOBILE COMPONENTS ─── */

const mobileEase = [0.32, 0.72, 0, 1] as const;

function MobileContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-4 ${className}`}>{children}</div>;
}

function MobileFadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay, ease: mobileEase }}>
      {children}
    </motion.div>
  );
}

function MobileHeroSection({ study }: { study: CaseStudyItem }) {
  const theme = getTheme(study.industry);
  const Icon = theme.icon;
  return (
    <section className="relative pt-28 pb-10 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.08]">
          <ShapeGrid speed={0.1} squareSize={36} direction="diagonal" borderColor="#D4A849" hoverFillColor="#D4A849" shape="square" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ground/90 pointer-events-none" />
        <div className="absolute top-8 right-[8%] text-[clamp(4rem,12vw,8rem)] font-mono font-semibold text-accent/[0.03] leading-none select-none pointer-events-none">12</div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/10" />
      </div>
      <MobileContainer className="relative z-10">
        <MobileFadeUp>
          <Link href="/work" className="text-[10px] font-medium tracking-[0.15em] uppercase text-text-secondary/70 mb-4 block hover:text-accent transition-colors">← Case Studies</Link>
          <div className="flex items-center gap-2.5 mb-3">
            <Icon size={14} className="text-accent shrink-0" />
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-accent">{study.industry}</span>
            <span className="w-px h-3 bg-accent/20" />
            <span className="text-[10px] text-text-secondary/70">{study.category}</span>
          </div>
          <h1 className="font-display font-semibold text-[clamp(2rem,9vw,2.75rem)] tracking-[-0.025em] leading-[1.02] text-text-primary mb-3">{study.client}</h1>
          <p className="text-[15px] text-text-secondary/80 leading-relaxed mb-5">{study.project}</p>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent/10 border border-accent/25">
            <Lightning size={12} className="text-accent shrink-0" />
            <span className="text-[13px] font-mono font-semibold text-accent leading-snug">{study.result}</span>
          </div>
        </MobileFadeUp>
      </MobileContainer>
    </section>
  );
}

function MobileExecutiveSummary({ study }: { study: CaseStudyItem }) {
  const items = [
    { label: "Industry", value: study.industry },
    { label: "Services", value: study.category },
    { label: "Timeline", value: "4–6 months" },
    { label: "Primary KPI", value: study.metrics[0]?.label ?? "N/A" },
    { label: "Outcome", value: study.metrics[0]?.value ?? "N/A" },
  ];
  return (
    <section className="py-5 bg-[#0D0C0B] border-y border-accent/5">
      <MobileContainer>
        <MobileFadeUp>
          <div className="grid grid-cols-2 gap-2.5">
            {items.map((item) => (
              <div key={item.label} className={`p-3.5 rounded-xl bg-[#181818] border border-accent/10 ${items.length % 2 && items.indexOf(item) === items.length - 1 ? "col-span-2" : ""}`}>
                <p className="text-[9px] font-medium tracking-[0.1em] uppercase text-text-secondary/40 mb-0.5">{item.label}</p>
                <p className="text-sm font-medium text-text-primary leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
        </MobileFadeUp>
      </MobileContainer>
    </section>
  );
}

function MobileBusinessChallenge({ study }: { study: CaseStudyItem }) {
  return (
    <section className="py-14 bg-ground">
      <MobileContainer>
        <MobileFadeUp>
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-accent mb-2.5 block">The Challenge</span>
          <h2 className="font-display font-semibold text-[clamp(1.5rem,6vw,1.9rem)] tracking-[-0.025em] leading-[1.1] text-text-primary mb-4">
            What they <span className="text-accent">faced.</span>
          </h2>
          <p className="text-[15px] text-text-secondary leading-relaxed mb-5">{study.challenge}</p>
          <div className="p-4 rounded-xl bg-[#181818] border border-accent/10">
            <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-accent/80 mb-3 block">Key Pain Points</span>
            <div className="space-y-3">
              {study.challenge.split(". ").filter(Boolean).slice(0, 4).map((point, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-1.5 shrink-0" />
                  <p className="text-[13px] text-text-secondary/80 leading-relaxed">{point.replace(/\.$/, "")}.</p>
                </div>
              ))}
            </div>
          </div>
        </MobileFadeUp>
      </MobileContainer>
    </section>
  );
}

function MobileStrategyBlueprint() {
  const steps = [
    { step: "01", title: "Discovery", desc: "Deep research into the business, market, competition, and existing performance data to identify the highest-leverage opportunities." },
    { step: "02", title: "Strategy", desc: "Building a tailored roadmap with prioritised initiatives, resource planning, and measurable KPI targets aligned to business goals." },
    { step: "03", title: "Execute", desc: "Rapid, iterative implementation with continuous delivery, weekly stakeholder reviews, and data-informed course correction." },
    { step: "04", title: "Optimise", desc: "Analysing results, refining tactics, scaling what works, and building repeatable systems for sustained growth beyond the engagement." },
  ];
  return (
    <section className="py-14 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(600px circle at 30% 50%, rgba(212,168,73,0.02), transparent)" }} />
      <MobileContainer className="relative z-10">
        <MobileFadeUp>
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-accent mb-2.5 block">Strategy Blueprint</span>
          <h2 className="font-display font-semibold text-[clamp(1.5rem,6vw,1.9rem)] tracking-[-0.025em] leading-[1.1] text-text-primary mb-8">
            How we <span className="text-accent">solved it.</span>
          </h2>
        </MobileFadeUp>
        <div className="relative">
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-accent/10" />
          {steps.map((s, i) => (
            <MobileFadeUp key={s.step} delay={i * 0.06}>
              <div className="relative flex gap-4 pb-8 last:pb-0">
                <div className="relative z-10 w-[30px] h-[30px] rounded-full bg-[#181818] border-2 border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono font-semibold text-accent mb-1 block">{s.step}</span>
                  <h3 className="font-display text-base font-medium text-text-primary mb-1.5">{s.title}</h3>
                  <p className="text-[13px] text-text-secondary/70 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </MobileFadeUp>
          ))}
        </div>
      </MobileContainer>
    </section>
  );
}

function MobileExecutionTimeline() {
  const months = [
    { label: "Month 1", desc: "Audit, research, and strategic planning. Baseline metrics established.", active: true },
    { label: "Month 2", desc: "Initial implementation — quick wins deployed and measured.", active: true },
    { label: "Month 3", desc: "Core execution — major initiatives underway with weekly reporting.", active: true },
    { label: "Month 4", desc: "Optimisation and scaling — data-driven refinement of all channels.", active: true },
    { label: "Month 5", desc: "Systems and playbooks — repeatable processes documented and handed over.", active: false },
    { label: "Month 6", desc: "Ongoing growth — client team trained and autonomous.", active: false },
  ];
  return (
    <section className="py-14 bg-ground">
      <MobileContainer>
        <MobileFadeUp>
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-accent mb-2.5 block">Execution Timeline</span>
          <h2 className="font-display font-semibold text-[clamp(1.5rem,6vw,1.9rem)] tracking-[-0.025em] leading-[1.1] text-text-primary mb-3">
            How it <span className="text-accent">unfolded.</span>
          </h2>
          <p className="text-[13px] text-text-secondary/70 leading-relaxed mb-6">Every engagement follows a structured but flexible timeline. Here is how this project progressed from discovery to delivery.</p>
        </MobileFadeUp>
        <div className="p-4 rounded-xl bg-[#181818] border border-accent/10">
          {months.map((m, i) => (
            <div key={i} className="flex gap-3 pb-4 last:pb-0 relative">
              <div className="flex flex-col items-center">
                <div className={`w-2.5 h-2.5 rounded-full border-2 ${m.active ? "bg-accent border-accent" : "bg-transparent border-accent/20"} shrink-0 mt-0.5`} />
                {i < months.length - 1 && <div className="w-px flex-1 bg-accent/5" />}
              </div>
              <div className="pb-2">
                <p className="text-[11px] font-mono text-accent font-medium mb-0.5">{m.label}</p>
                <p className="text-[12px] text-text-secondary/60">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </MobileContainer>
    </section>
  );
}

function MobileResultsDashboard({ study }: { study: CaseStudyItem }) {
  return (
    <section className="py-14 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(600px circle at 50% 50%, rgba(212,168,73,0.015), transparent)" }} />
      <MobileContainer className="relative z-10">
        <MobileFadeUp>
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-accent mb-2.5 block">Results Dashboard</span>
          <h2 className="font-display font-semibold text-[clamp(1.5rem,6vw,1.9rem)] tracking-[-0.025em] leading-[1.1] text-text-primary mb-6">
            The <span className="text-accent">numbers.</span>
          </h2>
        </MobileFadeUp>
        <div className="space-y-3">
          {study.metrics.map((m, i) => (
            <MobileFadeUp key={m.label} delay={i * 0.05}>
              <div className="p-4 rounded-xl bg-[#181818] border border-accent/10">
                <p className="font-mono text-xl font-semibold text-accent mb-0.5">{m.value}</p>
                <p className="text-[11px] text-text-secondary/60">{m.label}</p>
              </div>
            </MobileFadeUp>
          ))}
        </div>
      </MobileContainer>
    </section>
  );
}

function MobileTestimonial({ study }: { study: CaseStudyItem }) {
  if (!study.testimonial) return null;
  return (
    <section className="py-14 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(500px circle at 30% 50%, rgba(212,168,73,0.03), transparent)" }} />
      <MobileContainer className="relative z-10">
        <MobileFadeUp>
          <div className="p-5 rounded-xl bg-[#181818] border border-accent/10 relative">
            <Quotes size={18} className="text-accent/15 absolute top-4 left-4" />
            <blockquote className="text-base font-display font-medium text-text-primary leading-relaxed mb-5 italic pl-3">
              &ldquo;{study.testimonial.quote}&rdquo;
            </blockquote>
            <div className="w-8 h-px bg-accent/20 mb-4" />
            <p className="text-sm font-medium text-text-primary">{study.testimonial.person}</p>
            <p className="text-xs text-text-secondary/60">{study.testimonial.role}</p>
            <div className="flex gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={10} weight="fill" className="text-accent/50" />
              ))}
            </div>
          </div>
        </MobileFadeUp>
      </MobileContainer>
    </section>
  );
}

function MobileTechnologyStack({ study }: { study: CaseStudyItem }) {
  const techs = [
    { name: "Next.js", slug: "nextjs", count: 5 },
    { name: "React", slug: "react", count: 6 },
    { name: "Node.js", slug: "nodejs", count: 4 },
    { name: "Python", slug: "python", count: 3 },
    { name: "OpenAI", slug: "openai", count: 3 },
    { name: "Stripe", slug: "stripe", count: 2 },
    { name: "HubSpot", slug: "hubspot", count: 3 },
    { name: "PostgreSQL", slug: "postgresql", count: 4 },
    { name: "TypeScript", slug: "typescript", count: 5 },
    { name: "Google Cloud", slug: "google-cloud", count: 2 },
    { name: "Vercel", slug: "vercel", count: 4 },
    { name: "Superset", slug: "superset", count: 1 },
    { name: "dbt", slug: "dbt", count: 1 },
    { name: "GA4", slug: "ga4", count: 3 },
    { name: "Shopify", slug: "shopify", count: 1 },
    { name: "WordPress", slug: "wordpress", count: 2 },
  ].filter((t) => study.description.toLowerCase().includes(t.name.toLowerCase()) || study.servicesUsed.some((s) => s.includes(t.slug))).slice(0, 8);
  if (techs.length === 0) return null;
  return (
    <section className="py-14 bg-[#0D0C0B] border-t border-accent/5">
      <MobileContainer>
        <MobileFadeUp>
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-accent mb-2.5 block">Technology Stack</span>
          <h2 className="font-display font-semibold text-[clamp(1.5rem,6vw,1.9rem)] tracking-[-0.025em] leading-[1.1] text-text-primary mb-6">
            Tools we <span className="text-accent">used.</span>
          </h2>
        </MobileFadeUp>
        <div className="flex flex-wrap gap-2.5">
          {techs.map((t, i) => (
            <MobileFadeUp key={t.slug} delay={i * 0.03}>
              <div className="px-3.5 py-2 rounded-xl bg-[#181818] border border-accent/10">
                <span className="text-[13px] text-text-secondary">{t.name}</span>
                <span className="ml-1.5 text-[9px] font-mono text-text-secondary/30">{t.count}</span>
              </div>
            </MobileFadeUp>
          ))}
        </div>
      </MobileContainer>
    </section>
  );
}

function MobileRelatedSolutions({ study }: { study: CaseStudyItem }) {
  if (study.servicesUsed.length === 0) return null;
  return (
    <section className="py-14 bg-ground">
      <MobileContainer>
        <MobileFadeUp>
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-accent mb-2.5 block">Related Solutions</span>
          <h2 className="font-display font-semibold text-[clamp(1.5rem,6vw,1.9rem)] tracking-[-0.025em] leading-[1.1] text-text-primary mb-2">
            Services that made <span className="text-accent">this possible.</span>
          </h2>
          <p className="text-[13px] text-text-secondary/60 mb-5">Each solution was selected and tailored specifically for {study.client}&apos;s unique business challenges and industry context.</p>
        </MobileFadeUp>
        <div className="space-y-2.5">
          {study.servicesUsed.slice(0, 6).map((slug, i) => (
            <MobileFadeUp key={slug} delay={i * 0.04}>
              <Link href={`/${slug}`} className="block group">
                <div className="p-3.5 rounded-xl bg-[#181818] border border-accent/10 flex items-center justify-between min-h-[48px]">
                  <span className="text-sm text-text-primary group-hover:text-accent transition-colors capitalize">{slug.replace(/-/g, " ")}</span>
                  <ArrowLineUpRight size={14} className="text-text-secondary/30 group-hover:text-accent transition-colors shrink-0" />
                </div>
              </Link>
            </MobileFadeUp>
          ))}
        </div>
      </MobileContainer>
    </section>
  );
}

function MobileInsightsBlock() {
  return (
    <section className="py-14 bg-[#0D0C0B]">
      <MobileContainer>
        <MobileFadeUp>
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-accent mb-2.5 block">Related Insights</span>
          <h2 className="font-display font-semibold text-[clamp(1.5rem,6vw,1.9rem)] tracking-[-0.025em] leading-[1.1] text-text-primary mb-6">
            Resources to <span className="text-accent">go deeper.</span>
          </h2>
        </MobileFadeUp>
        <div className="space-y-3">
          {[
            { title: "How to Measure the ROI of Digital Growth Initiatives", slug: "measure-digital-roi", category: "Analytics", readTime: "8 min" },
            { title: "Why Industry-Specific SEO Outperforms Generic Strategies", slug: "industry-specific-seo", category: "SEO", readTime: "10 min" },
            { title: "The Future of AI in Business Growth: What Works Now", slug: "ai-business-growth", category: "AI & Automation", readTime: "12 min" },
          ].map((post, i) => (
            <MobileFadeUp key={post.slug} delay={i * 0.04}>
              <Link href={`/${post.slug}`} className="block group">
                <div className="p-4 rounded-xl bg-[#181818] border border-accent/10">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent">{post.category}</span>
                    <span className="w-px h-2.5 bg-accent/10" />
                    <span className="text-[9px] text-text-secondary/40">{post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors leading-snug">{post.title}</h3>
                  <div className="flex items-center gap-1 mt-3 text-[10px] text-accent/40 group-hover:text-accent transition-colors">
                    <BookOpenText size={10} />
                    <span>Read article</span>
                  </div>
                </div>
              </Link>
            </MobileFadeUp>
          ))}
        </div>
      </MobileContainer>
    </section>
  );
}

function MobileMoreCaseStudies({ study }: { study: CaseStudyItem }) {
  const related = caseStudies.filter((s) => s.slug !== study.slug && (s.industry === study.industry || s.category === study.category)).slice(0, 3);
  if (related.length === 0) return null;
  const Icon = industryTheme[study.industry]?.icon ?? Globe;
  return (
    <section className="py-14 bg-[#0D0C0B] border-t border-accent/5">
      <MobileContainer>
        <MobileFadeUp>
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-accent mb-2.5 block">Continue Exploring</span>
          <h2 className="font-display font-semibold text-[clamp(1.5rem,6vw,1.9rem)] tracking-[-0.025em] leading-[1.1] text-text-primary mb-6">
            More <span className="text-accent">case studies.</span>
          </h2>
        </MobileFadeUp>
        <div className="space-y-3">
          {related.map((cs, i) => (
            <MobileFadeUp key={cs.slug} delay={i * 0.06}>
              <Link href={`/${cs.slug}`} className="block group">
                <div className="p-4 rounded-xl bg-[#181818] border border-accent/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={10} className="text-accent shrink-0" />
                    <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent">{cs.industry}</span>
                  </div>
                  <h3 className="font-display text-sm font-medium text-text-primary mb-1 group-hover:text-accent transition-colors">{cs.client}</h3>
                  <p className="text-[12px] text-text-secondary/60 mb-2.5 line-clamp-2">{cs.project}</p>
                  <p className="font-mono text-[13px] font-semibold text-accent mb-2.5">{cs.result}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-accent/40 group-hover:text-accent transition-colors">
                    Read case study <ArrowRight size={9} />
                  </span>
                </div>
              </Link>
            </MobileFadeUp>
          ))}
        </div>
      </MobileContainer>
    </section>
  );
}

function MobileCTASection() {
  return (
    <section className="py-16 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(600px circle at 50% 0%, rgba(212,168,73,0.06), transparent)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <MobileContainer className="relative z-10 text-center">
        <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, ease: mobileEase }} className="text-[10px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">
          Start Your Growth Story
        </motion.span>
        <motion.h2 initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, ease: mobileEase }} className="font-display font-semibold text-[clamp(1.8rem,7vw,2.5rem)] tracking-[-0.03em] leading-[1.02] text-text-primary text-balance mb-3">
          Let&apos;s build your <span className="text-accent">success story.</span>
        </motion.h2>
        <motion.p initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: 0.05, ease: mobileEase }} className="text-text-secondary text-[15px] max-w-[32ch] mx-auto mb-7">
          Free audit. No commitment. First results within 60 days or we fix it.
        </motion.p>
        <motion.div initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: 0.1, ease: mobileEase }} className="flex flex-col items-center gap-4">
          <Link href="/seo-audit" className="inline-flex items-center gap-2 bg-accent text-ground pl-7 pr-3 py-3 rounded-full font-medium text-sm active:scale-[0.98] transition-transform duration-150 shadow-[0_0_30px_rgba(212,168,73,0.15)]">
            Get Free Audit
            <span className="w-7 h-7 rounded-full bg-ground/10 flex items-center justify-center">
              <ArrowRight size={12} weight="bold" />
            </span>
          </Link>
          <Link href="/contact" className="text-text-secondary/50 underline underline-offset-4 hover:text-text-primary text-sm transition-colors duration-200">
            Talk to our team
          </Link>
        </motion.div>
      </MobileContainer>
    </section>
  );
}

/* ─── CUSTOM SECTION CONFIG ─── */

type MobileVisualType = "metrics-list" | "metrics-grid" | "progress-bars" | "single-metric" | "before-after" | "publications" | "text-only";

const customSectionConfig: Record<string, {
  label: string;
  title: React.ReactNode;
  descField: "approach" | "outcome";
  visualType: MobileVisualType;
}> = {
  "pulse-health": { label: "Market Context", title: <>Healthcare <span className="text-accent">AI search.</span></>, descField: "approach", visualType: "metrics-list" },
  "urban-spaces": { label: "Our Approach", title: <>Technical SEO <span className="text-accent">at scale.</span></>, descField: "approach", visualType: "metrics-grid" },
  "al-shafar-investment": { label: "What We Delivered", title: <>Unified architecture, <span className="text-accent">unified growth.</span></>, descField: "outcome", visualType: "text-only" },
  "novapay": { label: "What We Built", title: <>Custom CRM & <span className="text-accent">client portal.</span></>, descField: "approach", visualType: "progress-bars" },
  "verdant-organics": { label: "The Campaign", title: <>Data-driven PR <span className="text-accent">at scale.</span></>, descField: "approach", visualType: "publications" },
  "elevate-education": { label: "Full-Funnel Strategy", title: <>Paid media <span className="text-accent">reimagined.</span></>, descField: "approach", visualType: "before-after" },
  "streamline-logistics": { label: "The Solution", title: <>AI agent for <span className="text-accent">lead qualification.</span></>, descField: "approach", visualType: "metrics-list" },
  "medcore-analytics": { label: "What We Built", title: <>Enterprise analytics <span className="text-accent">dashboard.</span></>, descField: "approach", visualType: "single-metric" },
  "buildright": { label: "The Build", title: <>SaaS platform <span className="text-accent">from scratch.</span></>, descField: "approach", visualType: "metrics-grid" },
  "gulf-tech-solutions": { label: "Lead Qualification", title: <>AI-powered <span className="text-accent">demo routing.</span></>, descField: "approach", visualType: "progress-bars" },
  "dubai-health-authority": { label: "The Challenge", title: <>28 facilities, <span className="text-accent">one strategy.</span></>, descField: "approach", visualType: "metrics-grid" },
  "emerge-logistics": { label: "Analytics Rebuild", title: <>A foundation for <span className="text-accent">growth.</span></>, descField: "outcome", visualType: "before-after" },
};

function MobileCustomMetricsList({ metrics }: { metrics: CaseStudyItem["metrics"] }) {
  return (
    <div className="p-4 rounded-xl bg-[#181818] border border-accent/10 mt-5">
      <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent/60 mb-3 block">Performance Metrics</span>
      <div className="space-y-3">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between py-1.5 border-b border-accent/5 last:border-0">
            <span className="text-[12px] text-text-secondary/70">{m.label}</span>
            <span className="text-sm font-mono font-semibold text-accent">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCustomMetricsGrid({ metrics }: { metrics: CaseStudyItem["metrics"] }) {
  return (
    <div className="p-4 rounded-xl bg-[#181818] border border-accent/10 mt-5">
      <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent/60 mb-3 block">Key Metrics</span>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="text-center p-3 rounded-lg bg-surface/50 border border-accent/5">
            <p className="font-mono text-base font-semibold text-accent">{m.value}</p>
            <p className="text-[10px] text-text-secondary/60 mt-0.5 leading-tight">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCustomProgressBars({ metrics }: { metrics: CaseStudyItem["metrics"] }) {
  return (
    <div className="p-4 rounded-xl bg-[#181818] border border-accent/10 mt-5">
      <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent/60 mb-3 block">System Impact</span>
      <div className="space-y-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-secondary/80">{m.label}</span>
              <span className="font-mono text-accent font-semibold">{m.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-surface overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${Math.min(100, parseFloat(m.value.replace(/[^0-9.]/g, "")) * 1.5)}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: mobileEase }} className="h-full rounded-full bg-accent/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCustomSingleMetric({ metrics }: { metrics: CaseStudyItem["metrics"] }) {
  return (
    <div className="p-5 rounded-xl bg-[#181818] border border-accent/10 mt-5 text-center">
      <p className="font-mono text-3xl font-semibold text-accent">94%</p>
      <p className="text-xs text-text-secondary/60 mt-1">Stakeholder adoption within 2 weeks</p>
      <div className="mt-3 h-2 rounded-full bg-surface overflow-hidden">
        <motion.div initial={{ width: 0 }} whileInView={{ width: "94%" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: mobileEase }} className="h-full rounded-full bg-accent/60" />
      </div>
    </div>
  );
}

function MobileCustomBeforeAfter({ metrics }: { metrics: CaseStudyItem["metrics"] }) {
  const beforeValue = metrics[0]?.value?.split("→")[0]?.trim() || "$210";
  const afterValue = metrics[0]?.value?.split("→")[1]?.trim() || "$101";
  const afterLabel = metrics[0]?.label || "Cost per Acquisition";
  const changeText = metrics[1]?.value || "52% reduction";
  return (
    <div className="p-4 rounded-xl bg-[#181818] border border-accent/10 mt-5">
      <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent/60 mb-3 block">Before & After</span>
      <div className="space-y-3">
        <div className="p-3.5 rounded-xl bg-red-400/5 border border-red-400/10">
          <p className="text-[9px] text-red-400/60 uppercase tracking-[0.1em] mb-0.5">Before</p>
          <p className="text-lg font-mono font-semibold text-red-400/60">{beforeValue}</p>
          <p className="text-[11px] text-text-secondary/40">{afterLabel}</p>
        </div>
        <div className="flex justify-center">
          <ArrowRight size={14} className="text-accent/30" />
        </div>
        <div className="p-3.5 rounded-xl bg-accent/5 border border-accent/10">
          <p className="text-[9px] text-accent/60 uppercase tracking-[0.1em] mb-0.5">After</p>
          <p className="text-lg font-mono font-semibold text-accent">{afterValue}</p>
          <p className="text-[11px] text-text-secondary/40">{changeText}</p>
        </div>
      </div>
    </div>
  );
}

function MobileCustomPublications() {
  return (
    <div className="p-4 rounded-xl bg-[#181818] border border-accent/10 mt-5">
      <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent/60 mb-3 block">Publication Impact</span>
      <div className="grid grid-cols-2 gap-2">
        {[
          { pub: "TechCrunch", impact: "Featured" },
          { pub: "Forbes", impact: "Featured" },
          { pub: "Bloomberg", impact: "Featured" },
          { pub: "18+ Others", impact: "Coverage" },
        ].map((p) => (
          <div key={p.pub} className="p-2.5 rounded-lg bg-surface/50 border border-accent/5 text-center">
            <p className="text-xs font-medium text-text-primary">{p.pub}</p>
            <p className="text-[9px] text-text-secondary/40">{p.impact}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-accent/60">
        <TrendUp size={11} />
        <span>140+ unique domains at 92% avg DR</span>
      </div>
    </div>
  );
}

function MobileCustomSection({ study }: { study: CaseStudyItem }) {
  const config = customSectionConfig[study.slug];
  if (!config) return null;
  const desc = config.descField === "approach" ? study.approach : study.outcome;
  const renderVisual = () => {
    switch (config.visualType) {
      case "metrics-list": return <MobileCustomMetricsList metrics={study.metrics} />;
      case "metrics-grid": return <MobileCustomMetricsGrid metrics={study.metrics} />;
      case "progress-bars": return <MobileCustomProgressBars metrics={study.metrics} />;
      case "single-metric": return <MobileCustomSingleMetric metrics={study.metrics} />;
      case "before-after": return <MobileCustomBeforeAfter metrics={study.metrics} />;
      case "publications": return <MobileCustomPublications />;
      case "text-only": return null;
      default: return null;
    }
  };
  return (
    <section className="py-14 bg-ground">
      <MobileContainer>
        <MobileFadeUp>
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-accent mb-2.5 block">{config.label}</span>
          <h2 className="font-display font-semibold text-[clamp(1.5rem,6vw,1.9rem)] tracking-[-0.025em] leading-[1.1] text-text-primary mb-4">{config.title}</h2>
          <p className="text-[15px] text-text-secondary leading-relaxed">{desc}</p>
          {renderVisual()}
        </MobileFadeUp>
      </MobileContainer>
    </section>
  );
}

function MobileCaseStudyPage({ study }: { study: CaseStudyItem }) {
  const withStrategy = ["pulse-health", "emerge-logistics"].includes(study.slug);
  return (
    <>
      <MobileHeroSection study={study} />
      <MobileExecutiveSummary study={study} />
      <MobileBusinessChallenge study={study} />
      {withStrategy && <MobileStrategyBlueprint />}
      <MobileCustomSection study={study} />
      <MobileResultsDashboard study={study} />
      <MobileTestimonial study={study} />
      <MobileTechnologyStack study={study} />
      <MobileRelatedSolutions study={study} />
      <MobileInsightsBlock />
      <MobileMoreCaseStudies study={study} />
      <MobileCTASection />
    </>
  );
}

/* ─── INDUSTRY-SPECIFIC PAGES ─── */

function getTheme(industry: string) {
  return industryTheme[industry] ?? industryTheme.Healthcare;
}

function appStore(study: CaseStudyItem, children: React.ReactNode) {
  return (
    <>
      <HeroSection study={study} />
      {children}
      <CTASection />
    </>
  );
}

/* Healthcare — Pulse Health */
function PulseHealthPage({ study }: { study: CaseStudyItem }) {
  const Icon = Heartbeat;
  return appStore(study, (
    <>
      <ExecutiveSummary study={study} />
      <BusinessChallenge study={study} />
      <StrategyBlueprint study={study} />
      <section className="py-12 sm:py-16 lg:py-20 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
            <FadeUp>
              <SectionLabel text="Market Context" />
              <SectionTitle>Healthcare <span className="text-accent">AI search.</span></SectionTitle>
              <p className="text-text-secondary leading-relaxed">{study.approach}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
                <div className="flex items-center gap-2 mb-4">
                  <Icon size={16} className="text-accent" />
                  <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-accent">AI Visibility Metrics</span>
                </div>
                <div className="space-y-3">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between py-2 border-b border-accent/5 last:border-0">
                      <span className="text-xs text-text-secondary">{m.label}</span>
                      <span className="text-sm font-mono font-semibold text-accent">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <ResultsDashboard study={study} />
      <TestimonialBlock study={study} />
      <TechnologyStack study={study} />
      <RelatedSolutions study={study} />
      <InsightsBlock />
      <MoreCaseStudies study={study} />
    </>
  ));
}

/* Real Estate — Urban Spaces */
function UrbanSpacesPage({ study }: { study: CaseStudyItem }) {
  return appStore(study, (
    <>
      <ExecutiveSummary study={study} />
      <BusinessChallenge study={study} />
      <section className="py-12 sm:py-16 lg:py-20 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <FadeUp>
              <SectionLabel text="Our Approach" />
              <SectionTitle>Technical SEO <span className="text-accent">at scale.</span></SectionTitle>
              <p className="text-text-secondary leading-relaxed">{study.approach}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {study.tags.map((tag) => <Badge key={tag} label={tag} />)}
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
                <SectionLabel text="Key Metrics" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="text-center p-4 rounded-xl bg-surface/50 border border-accent/5">
                      <p className="font-mono text-xl font-semibold text-accent">{m.value}</p>
                      <p className="text-[10px] text-text-secondary/60 mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <ResultsDashboard study={study} />
      <TestimonialBlock study={study} />
      <RelatedSolutions study={study} />
      <InsightsBlock />
      <MoreCaseStudies study={study} />
    </>
  ));
}

/* Real Estate — Al Shafar Investment */
function AlShafarPage({ study }: { study: CaseStudyItem }) {
  return appStore(study, (
    <>
      <ExecutiveSummary study={study} />
      <BusinessChallenge study={study} />
      <ResultsDashboard study={study} />
      <section className="py-12 sm:py-16 lg:py-20 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <SectionLabel text="What We Delivered" />
            <SectionTitle>Unified architecture, <span className="text-accent">unified growth.</span></SectionTitle>
            <p className="text-text-secondary leading-relaxed max-w-3xl">{study.outcome}</p>
          </FadeUp>
        </div>
      </section>
      <RelatedSolutions study={study} />
      <MoreCaseStudies study={study} />
    </>
  ));
}

/* Fintech — NovaPay */
function NovaPayPage({ study }: { study: CaseStudyItem }) {
  const Icon = CurrencyCircleDollar;
  return appStore(study, (
    <>
      <ExecutiveSummary study={study} />
      <BusinessChallenge study={study} />
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
            <FadeUp>
              <SectionLabel text="What We Built" />
              <SectionTitle>Custom CRM & <span className="text-accent">client portal.</span></SectionTitle>
              <p className="text-text-secondary leading-relaxed">{study.approach}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
                <div className="flex items-center gap-2 mb-4">
                  <Icon size={16} className="text-accent" />
                  <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-accent">System Impact</span>
                </div>
                <div className="space-y-4">
                  {study.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary">{m.label}</span>
                        <span className="font-mono text-accent font-semibold">{m.value}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-surface overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} className="h-full rounded-full bg-accent/60" style={{ width: `${Math.min(100, parseFloat(m.value.replace(/[^0-9.]/g, "")) * 1.5)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <ResultsDashboard study={study} />
      <TestimonialBlock study={study} />
      <TechnologyStack study={study} />
      <RelatedSolutions study={study} />
      <InsightsBlock />
      <MoreCaseStudies study={study} />
    </>
  ));
}

/* E-Commerce — Verdant Organics */
function VerdantOrganicsPage({ study }: { study: CaseStudyItem }) {
  return appStore(study, (
    <>
      <ExecutiveSummary study={study} />
      <BusinessChallenge study={study} />
      <section className="py-12 sm:py-16 lg:py-20 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <FadeUp>
              <SectionLabel text="The Campaign" />
              <SectionTitle>Data-driven PR <span className="text-accent">at scale.</span></SectionTitle>
              <p className="text-text-secondary leading-relaxed">{study.approach}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
                <SectionLabel text="Publication Impact" />
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { pub: "TechCrunch", impact: "Featured" },
                    { pub: "Forbes", impact: "Featured" },
                    { pub: "Bloomberg", impact: "Featured" },
                    { pub: "18+ Others", impact: "Coverage" },
                  ].map((p) => (
                    <div key={p.pub} className="p-3 rounded-xl bg-surface/50 border border-accent/5 text-center">
                      <p className="text-xs font-medium text-text-primary">{p.pub}</p>
                      <p className="text-[9px] text-text-secondary/40">{p.impact}</p>
                    </div>
                  ))}
                  <div className="col-span-2 mt-2 flex items-center justify-center gap-1 text-[11px] text-accent/60">
                    <TrendUp size={12} />
                    <span>140+ unique domains at 92% avg DR</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <ResultsDashboard study={study} />
      <TestimonialBlock study={study} />
      <RelatedSolutions study={study} />
      <InsightsBlock />
      <MoreCaseStudies study={study} />
    </>
  ));
}

/* EdTech — Elevate Education */
function ElevateEducationPage({ study }: { study: CaseStudyItem }) {
  return appStore(study, (
    <>
      <ExecutiveSummary study={study} />
      <BusinessChallenge study={study} />
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
            <FadeUp delay={0.1}>
              <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
                <SectionLabel text="Before & After" />
                <div className="space-y-4 mt-4">
                  <div className="p-4 rounded-xl bg-red-400/5 border border-red-400/10">
                    <p className="text-[9px] text-red-400/60 uppercase tracking-[0.1em] mb-1">Before</p>
                    <p className="text-lg font-mono font-semibold text-red-400/60">$210</p>
                    <p className="text-xs text-text-secondary/40">Avg CPA across channels</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight size={16} className="text-accent/40" />
                  </div>
                  <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                    <p className="text-[9px] text-accent/60 uppercase tracking-[0.1em] mb-1">After</p>
                    <p className="text-lg font-mono font-semibold text-accent">$101</p>
                    <p className="text-xs text-text-secondary/40">Avg CPA — 52% reduction</p>
                  </div>
                </div>
              </div>
            </FadeUp>
            <FadeUp>
              <SectionLabel text="Full-Funnel Strategy" />
              <SectionTitle>Paid media <span className="text-accent">reimagined.</span></SectionTitle>
              <p className="text-text-secondary leading-relaxed">{study.approach}</p>
            </FadeUp>
          </div>
        </div>
      </section>
      <ResultsDashboard study={study} />
      <TestimonialBlock study={study} />
      <RelatedSolutions study={study} />
      <InsightsBlock />
      <MoreCaseStudies study={study} />
    </>
  ));
}

/* Supply Chain — Streamline Logistics */
function StreamlineLogisticsPage({ study }: { study: CaseStudyItem }) {
  const Icon = Robot;
  return appStore(study, (
    <>
      <ExecutiveSummary study={study} />
      <BusinessChallenge study={study} />
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <FadeUp>
              <SectionLabel text="The Solution" />
              <SectionTitle>AI agent for <span className="text-accent">lead qualification.</span></SectionTitle>
              <p className="text-text-secondary leading-relaxed">{study.approach}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
                <div className="flex items-center gap-2 mb-4">
                  <Icon size={20} className="text-accent" />
                  <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-accent">AI Agent Performance</span>
                </div>
                <div className="space-y-3">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between py-2 border-b border-accent/5 last:border-0">
                      <span className="text-xs text-text-secondary">{m.label}</span>
                      <span className="text-sm font-mono font-semibold text-accent">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <ResultsDashboard study={study} />
      <TestimonialBlock study={study} />
      <TechnologyStack study={study} />
      <RelatedSolutions study={study} />
      <InsightsBlock />
      <MoreCaseStudies study={study} />
    </>
  ));
}

/* Life Sciences — MedCore Analytics */
function MedCoreAnalyticsPage({ study }: { study: CaseStudyItem }) {
  return appStore(study, (
    <>
      <ExecutiveSummary study={study} />
      <BusinessChallenge study={study} />
      <section className="py-12 sm:py-16 lg:py-20 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
            <FadeUp>
              <SectionLabel text="What We Built" />
              <SectionTitle>Enterprise analytics <span className="text-accent">dashboard.</span></SectionTitle>
              <p className="text-text-secondary leading-relaxed">{study.approach}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
                <SectionLabel text="Dashboard Adoption" />
                <div className="mt-4 text-center">
                  <p className="font-mono text-5xl font-semibold text-accent">94%</p>
                  <p className="text-xs text-text-secondary/60 mt-1">Stakeholder adoption within 2 weeks</p>
                  <div className="mt-4 h-2 rounded-full bg-surface overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "94%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease }} className="h-full rounded-full bg-accent/60" />
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <ResultsDashboard study={study} />
      <TestimonialBlock study={study} />
      <TechnologyStack study={study} />
      <RelatedSolutions study={study} />
      <InsightsBlock />
      <MoreCaseStudies study={study} />
    </>
  ));
}

/* Construction — BuildRight */
function BuildRightPage({ study }: { study: CaseStudyItem }) {
  return appStore(study, (
    <>
      <ExecutiveSummary study={study} />
      <BusinessChallenge study={study} />
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <FadeUp delay={0.1}>
              <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
                <SectionLabel text="SaaS Growth Metrics" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="text-center p-4 rounded-xl bg-surface/50 border border-accent/5">
                      <p className="font-mono text-lg font-semibold text-accent">{m.value}</p>
                      <p className="text-[9px] text-text-secondary/60 mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
            <FadeUp>
              <SectionLabel text="The Build" />
              <SectionTitle>SaaS platform <span className="text-accent">from scratch.</span></SectionTitle>
              <p className="text-text-secondary leading-relaxed">{study.approach}</p>
            </FadeUp>
          </div>
        </div>
      </section>
      <ResultsDashboard study={study} />
      <TestimonialBlock study={study} />
      <TechnologyStack study={study} />
      <RelatedSolutions study={study} />
      <InsightsBlock />
      <MoreCaseStudies study={study} />
    </>
  ));
}

/* SaaS — Gulf Tech Solutions */
function GulfTechSolutionsPage({ study }: { study: CaseStudyItem }) {
  return appStore(study, (
    <>
      <ExecutiveSummary study={study} />
      <BusinessChallenge study={study} />
      <section className="py-12 sm:py-16 lg:py-20 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
            <FadeUp>
              <SectionLabel text="Lead Qualification" />
              <SectionTitle>AI-powered <span className="text-accent">demo routing.</span></SectionTitle>
              <p className="text-text-secondary leading-relaxed">{study.approach}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
                <SectionLabel text="Sales Efficiency" />
                <div className="space-y-4 mt-4">
                  {study.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary">{m.label}</span>
                        <span className="font-mono text-accent font-semibold">{m.value}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-surface overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${Math.min(100, parseFloat(m.value.replace(/[^0-9.]/g, "")) * 0.8)}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} className="h-full rounded-full bg-accent/60" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <ResultsDashboard study={study} />
      <RelatedSolutions study={study} />
      <InsightsBlock />
      <MoreCaseStudies study={study} />
    </>
  ));
}

/* Healthcare — Dubai Health Authority */
function DubaiHealthAuthorityPage({ study }: { study: CaseStudyItem }) {
  const Icon = MapPin;
  return appStore(study, (
    <>
      <ExecutiveSummary study={study} />
      <BusinessChallenge study={study} />
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
            <FadeUp>
              <SectionLabel text="The Challenge" />
              <SectionTitle>28 facilities, <span className="text-accent">one strategy.</span></SectionTitle>
              <p className="text-text-secondary leading-relaxed">{study.approach}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
                <div className="flex items-center gap-2 mb-4">
                  <Icon size={16} className="text-accent" />
                  <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-accent">Local Visibility</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="text-center p-4 rounded-xl bg-surface/50 border border-accent/5">
                      <p className="font-mono text-xl font-semibold text-accent">{m.value}</p>
                      <p className="text-[9px] text-text-secondary/60 mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <ResultsDashboard study={study} />
      <RelatedSolutions study={study} />
      <MoreCaseStudies study={study} />
    </>
  ));
}

/* Supply Chain — Emerge Logistics */
function EmergeLogisticsPage({ study }: { study: CaseStudyItem }) {
  return appStore(study, (
    <>
      <ExecutiveSummary study={study} />
      <BusinessChallenge study={study} />
      <StrategyBlueprint study={study} />
      <section className="py-12 sm:py-16 lg:py-20 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
            <FadeUp>
              <SectionLabel text="Analytics Rebuild" />
              <SectionTitle>A foundation for <span className="text-accent">growth.</span></SectionTitle>
              <p className="text-text-secondary leading-relaxed">{study.outcome}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
                <SectionLabel text="Cost Efficiency" />
                <div className="mt-4 space-y-4">
                  <div className="p-4 rounded-xl bg-red-400/5 border border-red-400/10">
                    <p className="text-[9px] text-red-400/60 uppercase tracking-[0.1em] mb-1">Before CPA</p>
                    <p className="text-2xl font-mono font-semibold text-red-400/60">$980</p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight size={16} className="text-accent/40" />
                  </div>
                  <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                    <p className="text-[9px] text-accent/60 uppercase tracking-[0.1em] mb-1">After CPA</p>
                    <p className="text-2xl font-mono font-semibold text-accent">$372</p>
                    <p className="text-[10px] text-text-secondary/40 mt-1">62% reduction</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <ResultsDashboard study={study} />
      <RelatedSolutions study={study} />
      <InsightsBlock />
      <MoreCaseStudies study={study} />
    </>
  ));
}

/* ─── DISPATCHER ─── */

export function CaseStudyDetailContent({ study }: { study: CaseStudyItem }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  if (isMobile) {
    return <MobileCaseStudyPage study={study} />;
  }
  switch (study.slug) {
    case "pulse-health":
      return <PulseHealthPage study={study} />;
    case "urban-spaces":
      return <UrbanSpacesPage study={study} />;
    case "novapay":
      return <NovaPayPage study={study} />;
    case "verdant-organics":
      return <VerdantOrganicsPage study={study} />;
    case "elevate-education":
      return <ElevateEducationPage study={study} />;
    case "streamline-logistics":
      return <StreamlineLogisticsPage study={study} />;
    case "medcore-analytics":
      return <MedCoreAnalyticsPage study={study} />;
    case "buildright":
      return <BuildRightPage study={study} />;
    case "gulf-tech-solutions":
      return <GulfTechSolutionsPage study={study} />;
    case "dubai-health-authority":
      return <DubaiHealthAuthorityPage study={study} />;
    case "al-shafar-investment":
      return <AlShafarPage study={study} />;
    case "emerge-logistics":
      return <EmergeLogisticsPage study={study} />;
    default:
      return (
        <>
          <HeroSection study={study} />
          <ExecutiveSummary study={study} />
          <BusinessChallenge study={study} />
          <ResultsDashboard study={study} />
          <TestimonialBlock study={study} />
          <RelatedSolutions study={study} />
          <MoreCaseStudies study={study} />
          <CTASection />
        </>
      );
  }
}
