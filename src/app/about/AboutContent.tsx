"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedSection from "@/components/RelatedSection";
import { getBreadcrumbs } from "@/data/relations";
import {
  ArrowRight, Buildings, ShoppingCart, TrendUp, ChartLineUp, Globe,
  Users, Lightning, CheckCircle, SealCheck,
  MagnifyingGlass, Gear, Code, Database, Robot, Graph,
  CurrencyCircleDollar, BookOpenText, Eye, Wrench,
  Quotes, Compass, FlowArrow,
  Lightbulb, ChartBar, MathOperations, PuzzlePiece,
  Rocket, Cube,
} from "@phosphor-icons/react";
import ShapeGrid from "@/components/ShapeGrid";
import CTA from "@/components/CTA";

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

function SectionLabel({ text }: { text: string }) {
  return <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">{text}</span>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary mb-6">
      {children}
    </h2>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5 rounded-[1.25rem] bg-[#181818] border border-accent/25 hover:border-accent/50 transition-all duration-300 hover:-translate-y-0.5">
      <p className="font-mono text-2xl lg:text-3xl font-semibold text-accent mb-1">{value}</p>
      <p className="text-[11px] text-text-secondary/60 uppercase tracking-[0.05em]">{label}</p>
    </div>
  );
}

function NumberCard({ count, label }: { count: string; label: string }) {
  return (
    <div className="p-5 rounded-[1.25rem] bg-[#181818] border border-accent/25 text-center hover:border-accent/50 transition-all duration-300">
      <p className="font-mono text-3xl lg:text-4xl font-semibold text-accent mb-1">{count}</p>
      <p className="text-[11px] text-text-secondary/60">{label}</p>
    </div>
  );
}

const principles = [
  {
    title: "Transparency",
    icon: Eye,
    desc: "No vanity metrics, no smoke and mirrors. Every report, every recommendation, every result is shared openly. Our clients see exactly what we see.",
    quote: "Trust is built in the details. We share everything — the wins, the losses, the data, the reasoning.",
    example: "Every client gets access to the same dashboards our team uses internally. No filtered reports. No edited numbers.",
  },
  {
    title: "Data Over Opinion",
    icon: ChartBar,
    desc: "Every decision starts with evidence. From keyword research to content strategy to technical architecture, we let data guide the way — not guesswork or trends.",
    quote: "Opinions are cheap. Data is expensive. We invest in the expensive stuff.",
    example: "We ran 47 A/B tests before finalising the information architecture for a client's 12,000-page site rebuild.",
  },
  {
    title: "Craft Over Speed",
    icon: Wrench,
    desc: "We optimise for quality, not velocity. Every line of code, every content piece, every campaign goes through rigorous review before it reaches a client.",
    quote: "Fast is easy. Good is hard. We choose hard because it's the only path to lasting results.",
    example: "Our average content piece goes through 4 revision cycles before publication. The result? 68% higher engagement rates.",
  },
  {
    title: "Systems Over Heroics",
    icon: PuzzlePiece,
    desc: "We build systems that scale, not campaigns that spike. Repeatable processes, automated workflows, and documented playbooks ensure consistency.",
    quote: "A win that can't be repeated isn't a win — it's luck. We engineer repeatability into everything.",
    example: "Our SEO playbook has been refined across 200+ engagements. Every new project inherits improvements from every previous one.",
  },
  {
    title: "Experimentation",
    icon: MathOperations,
    desc: "We treat every engagement as a hypothesis. Test. Measure. Learn. Iterate. The market is the final arbiter of what works.",
    quote: "If you're not failing, you're not learning fast enough. We design experiments where failure is cheap and insights are valuable.",
    example: "We allocate 15% of every engagement budget to experimental tactics that may or may not work. The learnings alone justify the investment.",
  },
  {
    title: "Long-Term Thinking",
    icon: Compass,
    desc: "We build durable digital assets that compound over time. Short-term wins are nice. Long-term dominance is the goal.",
    quote: "The best time to plant a tree was 20 years ago. The second best time is today. We build for the next decade, not the next quarter.",
    example: "A client from 2021 still sees organic traffic growth year-over-year without additional investment. That's the compounding effect of systems.",
  },
];

const teamMembers = [
  { name: "Omar Al-Rashid", role: "Founder & CEO", specialty: "Strategy & Growth", tools: "Next.js, GA4, Python", years: 15, fact: "Previously built two exit-stage startups in MENA region.", color: "from-accent/20 to-transparent" },
  { name: "Lena Chen", role: "Head of SEO", specialty: "Technical SEO & GEO", tools: "Screaming Frog, Python, BigQuery", years: 11, fact: "Speaks 4 languages and has audited 500+ websites.", color: "from-accent/15 to-transparent" },
  { name: "Ravi Patel", role: "CTO", specialty: "Architecture & AI", tools: "Next.js, Python, OpenAI, AWS", years: 14, fact: "Built a real-time bidding system that processes 2M requests/day.", color: "from-accent/20 to-transparent" },
  { name: "Sarah Mitchell", role: "Head of Design", specialty: "UI/UX & Brand", tools: "Figma, Framer, Three.js", years: 9, fact: "Designed interfaces used by 2M+ users across 3 continents.", color: "from-accent/15 to-transparent" },
  { name: "Ahmed Hassan", role: "Lead Engineer", specialty: "Full-Stack & API", tools: "Next.js, Node.js, PostgreSQL", years: 8, fact: "Opensourced 12 libraries used by 4,000+ developers.", color: "from-accent/20 to-transparent" },
  { name: "Maria Kowalski", role: "Head of Content", specialty: "Strategy & AI Content", tools: "OpenAI, Surfer, Clearscope", years: 10, fact: "Directed content strategy for 2 unicorn startups pre-IPO.", color: "from-accent/15 to-transparent" },
];

const techStack = [
  { name: "Next.js", icon: Code, count: 12 },
  { name: "TypeScript", icon: Code, count: 14 },
  { name: "Python", icon: Code, count: 9 },
  { name: "OpenAI", icon: Robot, count: 7 },
  { name: "Supabase", icon: Database, count: 5 },
  { name: "PostgreSQL", icon: Database, count: 8 },
  { name: "Vercel", icon: Lightning, count: 11 },
  { name: "Google Cloud", icon: Globe, count: 6 },
  { name: "GA4", icon: ChartLineUp, count: 15 },
  { name: "Screaming Frog", icon: MagnifyingGlass, count: 8 },
  { name: "n8n", icon: FlowArrow, count: 4 },
  { name: "HubSpot", icon: Users, count: 6 },
  { name: "Stripe", icon: CurrencyCircleDollar, count: 5 },
  { name: "Figma", icon: Eye, count: 10 },
  { name: "Framer", icon: Cube, count: 6 },
  { name: "Shopify", icon: ShoppingCart, count: 4 },
  { name: "WordPress", icon: Wrench, count: 8 },
  { name: "BigQuery", icon: Database, count: 5 },
];

const insights = [
  { title: "Why AI Search Will Replace Traditional SEO by 2027", tag: "GEO & AI Search", time: "8 min" },
  { title: "How We Built an AI Agent That Qualifies 190 Leads/Month", tag: "AI & Automation", time: "10 min" },
  { title: "The ROI of Custom Software: When to Build vs Buy", tag: "Software", time: "6 min" },
  { title: "Technical SEO Checklist for Next.js Sites", tag: "SEO", time: "12 min" },
  { title: "Paid Media Attribution That Actually Works", tag: "Paid Media", time: "7 min" },
  { title: "Digital PR for B2B: Getting Featured in Tier-1 Pubs", tag: "Digital PR", time: "9 min" },
];

const timelineData = [
  { year: "2018", title: "The Idea", desc: "Founders identified a gap between technical SEO capabilities and real business outcomes. Most agencies delivered tactics, not transformation.", detail: "50+ agency interviews revealed that 78% of clients couldn't measure the revenue impact of their SEO investment." },
  { year: "2019", title: "Founded", desc: "ZON launched in Dubai with a focus on technical SEO and content strategy that drives measurable revenue, not vanity metrics.", detail: "First office in Dubai Internet City. Team of 3. First client acquired through a cold email that included a free audit worth $5,000." },
  { year: "2020", title: "First Breakthrough", desc: "Delivered 240% organic traffic increase for a real estate client. The case study became our template for outcome-based engagements.", detail: "Revenue hit $180K. Team grew to 7. Started developing proprietary SEO automation tools." },
  { year: "2021", title: "AI Content Platform", desc: "Launched an AI-powered content automation platform. Expanded into Generative Engine Optimisation before the term existed.", detail: "Team grew to 14. Opened second office in London. Clients across 6 industries." },
  { year: "2022", title: "Software Division", desc: "Opened custom software division building CRMs, client portals, and internal tools for enterprise clients.", detail: "Revenue crossed $1M. Team of 22. Published first proprietary research on AI search behaviour." },
  { year: "2023", title: "AI & Automation", desc: "Launched AI agent development practice. Built lead qualification systems, support automation, and workflow engines for clients.", detail: "30+ AI agents deployed across client operations. Saved 12,000+ hours of manual work cumulatively." },
  { year: "2024", title: "Market Expansion", desc: "Expanded into 12 countries with clients across 10 industries. Invested heavily in R&D for AI search optimisation.", detail: "Team of 35 across 3 continents. Revenue crossed $2.4M in attributed client organic revenue." },
  { year: "2025", title: "Platform Evolution", desc: "Became a full-stack digital growth platform combining search, AI content, software, and analytics under one roof.", detail: "100+ projects delivered. 96% client satisfaction. Zero churn in enterprise segment." },
  { year: "2026", title: "The Future", desc: "Continuing to push the boundaries of what's possible at the intersection of search, AI, and custom software.", detail: "Building the next generation of AI-native growth tools. Expanding team across new disciplines." },
];

const cultureCards = [
  { title: "How Decisions Are Made", desc: "Every decision starts with data, not hierarchy. The person closest to the problem makes the call. We trust our team's judgment because we hire for it.", icon: Graph },
  { title: "How Quality Is Maintained", desc: "Every deliverable goes through a multi-stage review process. No exceptions. We'd rather delay a release than ship something mediocre.", icon: SealCheck },
  { title: "How Projects Are Reviewed", desc: "Every project ends with a retrospective. What worked. What didn't. What we'll do differently. The learnings feed back into our operating system.", icon: Lightbulb },
  { title: "How Experimentation Happens", desc: "We set aside 15% of every project budget for experiments. Some fail. Some produce breakthroughs. All of them teach us something valuable.", icon: Rocket },
];

const globalLocations = [
  { city: "Dubai, UAE", region: "Middle East", flag: "🇦🇪", projects: 60 },
  { city: "London, UK", region: "Europe", flag: "🇬🇧", projects: 25 },
  { city: "Singapore", region: "Asia", flag: "🇸🇬", projects: 15 },
];

/* ─── HERO ─── */

function HeroSection() {
  return (
    <section className="relative pt-36 pb-24 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.12]">
          <ShapeGrid speed={0.1} squareSize={36} direction="diagonal" borderColor="#D4A849" hoverFillColor="#D4A849" shape="square" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ground/90 pointer-events-none" />
        <div className="absolute top-12 right-[10%] text-[clamp(6rem,14vw,12rem)] font-mono font-semibold text-accent/[0.04] leading-none select-none pointer-events-none">08</div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.008]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.3), transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/10" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4 block">About</span>
          <h1 className="font-display font-semibold text-[clamp(2.5rem,5vw,5rem)] tracking-[-0.025em] leading-[0.92] text-text-primary mb-6 max-w-4xl">
            We believe growth <br /><span className="text-accent">is engineered, not hoped for.</span>
          </h1>
          <p className="text-lg text-text-secondary/80 leading-relaxed max-w-[55ch]">
            ZON is a digital growth platform combining technical search, AI content systems, and custom software to turn traffic into revenue. We don&apos;t do campaigns. We build growth systems.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── SECTION 1: The Philosophy ─── */

function PhilosophySection() {
  return (
    <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px circle at 50% 20%, rgba(212,168,73,0.025), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <SectionLabel text="Why We Exist" />
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2 className="font-display font-semibold text-[clamp(2rem,4vw,4rem)] tracking-[-0.03em] leading-[1] text-text-primary mb-8 text-balance">
              Most agencies sell you tactics. <br />
              <span className="text-accent">We sell outcomes.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-text-secondary leading-relaxed text-lg max-w-[65ch] mx-auto mb-8">
              We started ZON because we saw the same pattern repeating: agencies optimising for rankings while clients went out of business. Impressions don&apos;t pay bills. Revenue does.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-12">
              {[
                { label: "Strategy", desc: "Engineered for ROI" },
                { label: "Systems", desc: "Built to scale" },
                { label: "Results", desc: "Measured in revenue" },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-[#181818] border border-accent/10">
                  <p className="text-sm font-medium text-text-primary mb-1">{item.label}</p>
                  <p className="text-xs text-text-secondary/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 2: Growth Philosophy ─── */

function GrowthPhilosophySection() {
  const steps = [
    { label: "Research", icon: MagnifyingGlass, desc: "Market intelligence, competitor analysis, and opportunity mapping" },
    { label: "Systems", icon: PuzzlePiece, desc: "Repeatable processes, automation, and scalable architecture" },
    { label: "Execution", icon: Rocket, desc: "Rapid, iterative delivery with continuous quality gates" },
    { label: "Learning", icon: Lightbulb, desc: "Data analysis, retrospectives, and knowledge capture" },
    { label: "Iteration", icon: FlowArrow, desc: "Refinement, optimisation, and compounding improvements" },
    { label: "Growth", icon: TrendUp, desc: "Sustainable, scalable business impact" },
  ];
  return (
    <section className="py-28 lg:py-36 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.005]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.4), transparent 70%)" }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-16">
          <SectionLabel text="How Growth Happens" />
          <SectionTitle>Our <span className="text-accent">growth philosophy.</span></SectionTitle>
          <p className="text-text-secondary/60 text-sm">Growth is not a campaign. It&apos;s a continuous system of research, execution, learning, and iteration.</p>
        </FadeUp>
        <div className="relative">
          <div className="hidden lg:block absolute left-[15%] right-[15%] top-[35px] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeUp key={s.label} delay={i * 0.05}>
                  <div className="text-center p-5 rounded-[1.25rem] bg-[#181818] border border-accent/10 hover:border-accent/25 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-3">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <p className="font-display text-sm font-medium text-text-primary mb-1">{s.label}</p>
                    <p className="text-[10px] text-text-secondary/50 leading-relaxed">{s.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 3: What Makes Us Different ─── */

function DifferentSection() {
  const comparisons = [
    { traditional: "Vanity metrics (impressions, clicks)", us: "Business outcomes (revenue, leads, ROI)" },
    { traditional: "One-size-fits-all templates", us: "Custom systems engineered for your business" },
    { traditional: "One-off campaigns with finite impact", us: "Continuous growth with compounding returns" },
    { traditional: "Static PDF reports", us: "Real-time dashboards with actionable insights" },
    { traditional: "Black-box methodology", us: "Full transparency — you see everything we see" },
    { traditional: "Agency retains all IP", us: "You own the systems, the data, and the playbook" },
  ];
  return (
    <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px circle at 70% 50%, rgba(212,168,73,0.02), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-16">
          <SectionLabel text="The Difference" />
          <SectionTitle>Traditional Agencies <span className="text-accent">vs. ZON.</span></SectionTitle>
        </FadeUp>
        <div className="space-y-3">
          {comparisons.map((c, i) => (
            <FadeUp key={i} delay={i * 0.04}>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center p-4 rounded-xl bg-[#181818] border border-accent/5 hover:border-accent/20 transition-all duration-300">
                <div className="text-right">
                  <span className="text-sm text-red-400/60">{c.traditional}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-400/10 flex items-center justify-center">
                    <span className="text-[9px] text-red-400/60 font-mono">×</span>
                  </div>
                  <span className="text-accent/40 text-xs">→</span>
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                    <CheckCircle size={12} className="text-accent" />
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-sm text-text-primary font-medium">{c.us}</span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 4: Operating System ─── */

function OperatingSystemSection() {
  const [hoveredOS, setHoveredOS] = useState<string | null>(null);
  const systems = [
    { name: "SEO", icon: MagnifyingGlass, desc: "Technical audits, content clusters, local optimisation, and entity-based strategies that dominate search." },
    { name: "Content", icon: BookOpenText, desc: "AI-powered content systems that produce authoritative, entity-rich assets at scale." },
    { name: "AI", icon: Robot, desc: "Custom AI agents for lead qualification, support automation, and workflow optimisation." },
    { name: "Automation", icon: Gear, desc: "Workflow automation connecting CRM, marketing, sales, and operations into unified pipelines." },
    { name: "Software", icon: Code, desc: "Custom platforms — CRMs, portals, dashboards, and internal tools built for your exact workflow." },
    { name: "Analytics", icon: ChartLineUp, desc: "Real-time dashboards, multi-touch attribution, and data infrastructure that powers decisions." },
  ];
  return (
    <section className="py-28 lg:py-36 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 30% 60%, rgba(212,168,73,0.02), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-16">
          <SectionLabel text="Our Operating System" />
          <SectionTitle>How everything <span className="text-accent">connects.</span></SectionTitle>
          <p className="text-text-secondary/60 text-sm">Every department feeds into the next. SEO informs content. Content trains AI. AI powers automation. Automation feeds analytics. Analytics optimises SEO.</p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {systems.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeUp key={s.name} delay={i * 0.04}>
                <div
                  onMouseEnter={() => setHoveredOS(s.name)}
                  onMouseLeave={() => setHoveredOS(null)}
                  className={`p-6 rounded-[1.25rem] border transition-all duration-300 ${hoveredOS === s.name ? "bg-[#181818] border-accent/40 shadow-[0_0_30px_rgba(212,168,73,0.05)]" : "bg-[#181818] border-accent/10"}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{s.name}</span>
                  </div>
                  <p className="text-xs text-text-secondary/60 leading-relaxed">{s.desc}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 5: Timeline ─── */

function TimelineSection() {
  const [activeYear, setActiveYear] = useState<string>(timelineData[timelineData.length - 1].year);
  const active = timelineData.find((t) => t.year === activeYear) ?? timelineData[timelineData.length - 1];
  return (
    <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px circle at 30% 40%, rgba(212,168,73,0.02), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-16">
          <SectionLabel text="Our Journey" />
          <SectionTitle>From idea to <span className="text-accent">impact.</span></SectionTitle>
        </FadeUp>
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16">
          <FadeUp>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {timelineData.map((t) => (
                <button
                  key={t.year}
                  onClick={() => setActiveYear(t.year)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    activeYear === t.year
                      ? "bg-accent/10 border border-accent/25 shadow-[inset_0_1px_0_rgba(212,168,73,0.15)]"
                      : "hover:bg-surface border border-transparent"
                  }`}
                >
                  <span className={`font-mono text-sm font-semibold ${activeYear === t.year ? "text-accent" : "text-text-secondary/40 group-hover:text-accent/60 transition-colors"}`}>{t.year}</span>
                  <span className={`text-xs ${activeYear === t.year ? "text-accent" : "text-text-secondary group-hover:text-text-primary transition-colors"}`}>{t.title}</span>
                </button>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10 min-h-[300px]">
              <motion.div key={active.year} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-2xl font-semibold text-accent">{active.year}</span>
                  <span className="w-px h-8 bg-accent/20" />
                  <span className="font-display text-lg font-medium text-text-primary">{active.title}</span>
                </div>
                <p className="text-text-secondary leading-relaxed mb-4">{active.desc}</p>
                <div className="p-4 rounded-xl bg-surface/50 border border-accent/5">
                  <p className="text-[9px] font-medium tracking-[0.1em] uppercase text-text-secondary/40 mb-1">In detail</p>
                  <p className="text-sm text-text-secondary/70">{active.detail}</p>
                </div>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 6: Principles ─── */

function PrinciplesSection() {
  const [activePrinciple, setActivePrinciple] = useState(0);
  const p = principles[activePrinciple];
  const Icon = p.icon;
  return (
    <section className="py-28 lg:py-36 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 60% 40%, rgba(212,168,73,0.02), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-16">
          <SectionLabel text="Our Principles" />
          <SectionTitle>What we <span className="text-accent">stand for.</span></SectionTitle>
        </FadeUp>
        <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-16">
          <FadeUp>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {principles.map((pr, i) => (
                <button
                  key={pr.title}
                  onClick={() => setActivePrinciple(i)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    activePrinciple === i
                      ? "bg-accent/10 border border-accent/25"
                      : "hover:bg-surface border border-transparent"
                  }`}
                >
                  <pr.icon size={16} className={activePrinciple === i ? "text-accent" : "text-text-secondary/40 group-hover:text-accent/60 transition-colors"} />
                  <span className={`text-xs font-medium ${activePrinciple === i ? "text-accent" : "text-text-secondary group-hover:text-text-primary transition-colors"}`}>{pr.title}</span>
                </button>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Icon size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-text-primary">{p.title}</h3>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed mb-6">{p.desc}</p>
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 mb-4">
                <div className="flex gap-2">
                  <Quotes size={14} className="text-accent/30 shrink-0 mt-0.5" />
                  <p className="text-sm text-text-primary/80 italic">&ldquo;{p.quote}&rdquo;</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface/50 border border-accent/5">
                <p className="text-[9px] font-medium tracking-[0.1em] uppercase text-text-secondary/40 mb-1">Real example</p>
                <p className="text-sm text-text-secondary/70">{p.example}</p>
              </div>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 7: Numbers Dashboard ─── */

function NumbersSection() {
  return (
    <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 50%, rgba(212,168,73,0.025), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-16">
          <SectionLabel text="By the Numbers" />
          <SectionTitle>Our track record, <span className="text-accent">in numbers.</span></SectionTitle>
        </FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { count: "200+", label: "Projects Delivered" },
            { count: "12", label: "Countries Served" },
            { count: "10", label: "Industries" },
            { count: "4.2x", label: "Avg Client ROI" },
            { count: "2,400+", label: "Leads Generated" },
            { count: "1,200+", label: "Hours Automated" },
            { count: "980+", label: "Keywords Ranked" },
            { count: "96%", label: "Client Satisfaction" },
          ].map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.04}>
              <NumberCard count={stat.count} label={stat.label} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 8: Team ─── */

function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  return (
    <section className="py-28 lg:py-36 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px circle at 40% 30%, rgba(212,168,73,0.02), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-16">
          <SectionLabel text="The Team" />
          <SectionTitle>People behind <span className="text-accent">the systems.</span></SectionTitle>
          <p className="text-text-secondary/60 text-sm">Strategists, engineers, and creatives working across three continents to deliver measurable growth.</p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member, i) => (
            <FadeUp key={member.name} delay={i * 0.04}>
              <div
                onClick={() => setSelectedMember(selectedMember === i ? null : i)}
                className={`cursor-pointer p-6 rounded-[1.25rem] bg-[#181818] border transition-all duration-300 ${selectedMember === i ? "border-accent/40 -translate-y-0.5" : "border-accent/10"}`}
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.color} border border-accent/20 flex items-center justify-center mb-4`}>
                  <span className="text-lg font-mono font-semibold text-accent">{member.name.split(" ").map((n) => n[0]).join("")}</span>
                </div>
                <h3 className="font-display text-base font-medium text-text-primary mb-1">{member.name}</h3>
                <p className="text-xs text-accent/80 mb-3">{member.role}</p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-text-secondary/40 uppercase tracking-[0.1em]">Specialty</span>
                    <span className="text-[10px] text-text-secondary/70">{member.specialty}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-text-secondary/40 uppercase tracking-[0.1em]">Experience</span>
                    <span className="text-[10px] text-text-secondary/70">{member.years} years</span>
                  </div>
                </div>
                {selectedMember === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }} className="mt-4 pt-4 border-t border-accent/10">
                    <p className="text-[9px] text-text-secondary/40 uppercase tracking-[0.1em] mb-1">Tools</p>
                    <p className="text-[10px] text-text-secondary/70 mb-2">{member.tools}</p>
                    <p className="text-[9px] text-text-secondary/40 uppercase tracking-[0.1em] mb-1">Did You Know?</p>
                    <p className="text-[10px] text-text-secondary/70 italic">{member.fact}</p>
                  </motion.div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link href="/team" className="group inline-flex items-center gap-2 bg-accent text-ground pl-6 pr-2 py-2 rounded-full font-medium text-sm active:scale-[0.98] transition-transform duration-150">
              View Full Team
              <span className="w-7 h-7 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowRight size={14} weight="bold" />
              </span>
            </Link>
            <Link href="/careers" className="text-text-secondary/60 underline underline-offset-4 hover:text-text-primary text-sm transition-colors duration-200">
              Join the team
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── SECTION 9: Behind the Scenes ─── */

function BehindScenesSection() {
  const scenes = [
    { title: "Research & Analysis", icon: MagnifyingGlass, desc: "Every engagement begins with deep research. We analyse market data, competitor landscapes, customer behaviour, and technical infrastructure before writing a single line of strategy.", items: ["Market intelligence reports", "Competitor gap analysis", "Technical SEO audits", "Customer journey mapping"] },
    { title: "Design & Architecture", icon: Code, desc: "Systems are designed before they are built. Information architecture, wireframes, data models, and API contracts are documented and reviewed before development begins.", items: ["Information architecture", "System design documents", "API contracts & schemas", "Wireframes & prototypes"] },
    { title: "Development & Testing", icon: Gear, desc: "Code is written with quality gates at every stage. Automated tests, code reviews, performance benchmarks, and security audits are non-negotiable before any deployment.", items: ["Automated test suites", "Code review process", "Performance benchmarking", "Security & compliance checks"] },
    { title: "Reporting & Optimisation", icon: ChartLineUp, desc: "Once live, every system is monitored relentlessly. Dashboards track real-time performance, and optimisation cycles run continuously based on data signals.", items: ["Real-time dashboards", "Automated alerts", "Weekly optimisation cycles", "Quarterly business reviews"] },
  ];
  return (
    <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px circle at 30% 60%, rgba(212,168,73,0.02), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-16">
          <SectionLabel text="Behind the Scenes" />
          <SectionTitle>How we <span className="text-accent">actually work.</span></SectionTitle>
        </FadeUp>
        <div className="grid sm:grid-cols-2 gap-4">
          {scenes.map((scene, i) => {
            const Icon = scene.icon;
            return (
              <FadeUp key={scene.title} delay={i * 0.05}>
                <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/10 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <h3 className="font-display text-base font-medium text-text-primary">{scene.title}</h3>
                  </div>
                  <p className="text-xs text-text-secondary/60 leading-relaxed mb-4">{scene.desc}</p>
                  <ul className="space-y-1.5">
                    {scene.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-text-secondary/50">
                        <CheckCircle size={8} className="text-accent/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 10: How We Work ─── */

function HowWeWorkSection() {
  const phases = [
    { step: "01", title: "Discovery", desc: "Understand your business, market, customers, and existing infrastructure to identify highest-impact opportunities." },
    { step: "02", title: "Research", desc: "Deep dive into data — search landscapes, competitor analysis, customer behaviour, and technical audit findings." },
    { step: "03", title: "Architecture", desc: "Design the system. Information architecture, tech stack, content framework, and measurement plan before building begins." },
    { step: "04", title: "Execution", desc: "Rapid, iterative delivery with weekly stakeholder reviews, automated quality gates, and continuous deployment." },
    { step: "05", title: "Measurement", desc: "Real-time dashboards track every KPI from day one. No waiting for monthly reports to know if it's working." },
    { step: "06", title: "Iteration", desc: "Data feeds back into the system. Every week brings optimisation, refinement, and compounding improvements." },
    { step: "07", title: "Scale", desc: "What works gets systematised. Playbooks, automation, and training ensure growth continues without us in the room." },
  ];
  return (
    <section className="py-28 lg:py-36 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.005]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.4), transparent 70%)" }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-16">
          <SectionLabel text="How We Work" />
          <SectionTitle>From discovery to <span className="text-accent">scale.</span></SectionTitle>
        </FadeUp>
        <div className="relative">
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-accent/10 to-transparent hidden sm:block" />
          <div className="space-y-0">
            {phases.map((phase, i) => (
              <FadeUp key={phase.step} delay={i * 0.04}>
                <div className="flex gap-6 pb-8 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#181818] border-2 border-accent/30 flex items-center justify-center shrink-0">
                      <span className="text-xs font-mono font-semibold text-accent">{phase.step}</span>
                    </div>
                    {i < phases.length - 1 && <div className="w-px flex-1 bg-accent/10" />}
                  </div>
                  <div className="pt-2.5">
                    <h3 className="font-display text-base font-medium text-text-primary mb-1">{phase.title}</h3>
                    <p className="text-xs text-text-secondary/60 leading-relaxed max-w-lg">{phase.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 11: Technology Ecosystem ─── */

function TechEcosystemSection() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  return (
    <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px circle at 70% 40%, rgba(212,168,73,0.025), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-16">
          <SectionLabel text="Technology Ecosystem" />
          <SectionTitle>Tools we <span className="text-accent">trust.</span></SectionTitle>
          <p className="text-text-secondary/60 text-sm">Hover a technology to learn more about how we use it.</p>
        </FadeUp>
        <div className="flex flex-wrap gap-3">
          {techStack.map((t, i) => {
            const Icon = t.icon;
            return (
              <FadeUp key={t.name} delay={i * 0.02}>
                <div
                  onMouseEnter={() => setHoveredTech(t.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className={`group px-4 py-3 rounded-xl border transition-all duration-200 ${
                    hoveredTech === t.name
                      ? "bg-accent/15 border-accent/40 text-accent shadow-[0_0_20px_rgba(212,168,73,0.05)]"
                      : "bg-[#181818] border-accent/10 text-text-secondary hover:border-accent/25"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} className={hoveredTech === t.name ? "text-accent" : "text-text-secondary/60"} />
                    <span className="text-sm font-medium">{t.name}</span>
                    <span className={`ml-1 text-[10px] font-mono ${hoveredTech === t.name ? "text-accent/60" : "text-text-secondary/30"}`}>{t.count}</span>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 12: Culture ─── */

function CultureSection() {
  return (
    <section className="py-28 lg:py-36 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 30%, rgba(212,168,73,0.02), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-16">
          <SectionLabel text="Company Culture" />
          <SectionTitle>How we <span className="text-accent">operate.</span></SectionTitle>
          <p className="text-text-secondary/60 text-sm">The principles and practices that define how we work, make decisions, and deliver quality.</p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 gap-4">
          {cultureCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <FadeUp key={card.title} delay={i * 0.05}>
                <div className="p-6 rounded-[1.25rem] bg-[#181818] border border-accent/10 hover:border-accent/25 transition-all duration-300">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <h3 className="font-display text-base font-medium text-text-primary mb-2">{card.title}</h3>
                  <p className="text-xs text-text-secondary/60 leading-relaxed">{card.desc}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 13: Global Presence ─── */

function GlobalSection() {
  return (
    <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 30% 50%, rgba(212,168,73,0.02), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-16">
          <SectionLabel text="Global Presence" />
          <SectionTitle>Where we <span className="text-accent">operate.</span></SectionTitle>
        </FadeUp>
        <div className="grid sm:grid-cols-3 gap-4">
          {globalLocations.map((loc, i) => (
            <FadeUp key={loc.city} delay={i * 0.05}>
              <div className="p-6 rounded-[1.25rem] bg-[#181818] border border-accent/10 text-center hover:border-accent/25 transition-all duration-300">
                <span className="text-3xl mb-3 block">{loc.flag}</span>
                <h3 className="font-display text-base font-medium text-text-primary mb-1">{loc.city}</h3>
                <p className="text-xs text-text-secondary/60 mb-3">{loc.region}</p>
                <div className="flex items-center justify-center gap-1 text-[10px] text-text-secondary/40">
                  <Globe size={10} />
                  <span>{loc.projects}+ projects delivered</span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.2}>
          <div className="mt-8 p-6 rounded-[1.25rem] bg-[#181818] border border-accent/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-lg font-mono font-semibold text-accent">12</p>
                <p className="text-[10px] text-text-secondary/60">Countries Served</p>
              </div>
              <div>
                <p className="text-lg font-mono font-semibold text-accent">10</p>
                <p className="text-[10px] text-text-secondary/60">Industries</p>
              </div>
              <div>
                <p className="text-lg font-mono font-semibold text-accent">4</p>
                <p className="text-[10px] text-text-secondary/60">Languages</p>
              </div>
              <div>
                <p className="text-lg font-mono font-semibold text-accent">3</p>
                <p className="text-[10px] text-text-secondary/60">Continents</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── SECTION 14: Insights ─── */

function InsightsSection() {
  return (
    <section className="py-28 lg:py-36 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 70% 30%, rgba(212,168,73,0.02), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-16">
          <SectionLabel text="Insights & Learning" />
          <SectionTitle>What we&apos;re <span className="text-accent">thinking about.</span></SectionTitle>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((post, i) => (
            <FadeUp key={post.title} delay={i * 0.04}>
              <div className="p-5 rounded-[1.25rem] bg-[#181818] border border-accent/10 hover:border-accent/25 transition-all duration-300 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent">{post.tag}</span>
                  <span className="w-px h-3 bg-accent/10" />
                  <span className="text-[9px] text-text-secondary/40">{post.time}</span>
                </div>
                <h3 className="text-sm font-medium text-text-primary mb-3">{post.title}</h3>
                <span className="inline-flex items-center gap-1 text-[10px] text-accent/40">
                  <BookOpenText size={10} />
                  <span>Read</span>
                </span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 15: CTA ─── */

function CTASection() {
  return (
    <section className="py-28 lg:py-32 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 0%, rgba(212,168,73,0.06), transparent)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease }} className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4 block">
          Start Building
        </motion.span>
        <motion.h2 initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease }} className="font-display font-semibold text-[clamp(2.5rem,5vw,5rem)] tracking-[-0.03em] leading-[0.95] text-text-primary text-balance max-w-4xl mx-auto mb-4">
          Let&apos;s build something <span className="text-accent">remarkable.</span>
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

/* ─── MAIN EXPORT ─── */

export function AboutContent() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <GrowthPhilosophySection />
      <DifferentSection />
      <OperatingSystemSection />
      <TimelineSection />
      <PrinciplesSection />
      <NumbersSection />
      <TeamSection />
      <BehindScenesSection />
      <HowWeWorkSection />
      <TechEcosystemSection />
      <CultureSection />
      <GlobalSection />
      <InsightsSection />
      <CTASection />
        {/* Hub interlinking */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Breadcrumbs crumbs={getBreadcrumbs("about", "hub")} />
          <div className="text-center mb-12">
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent">Explore More</span>
            <h2 className="font-display font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[0.95] text-text-primary mt-3">Discover What We Do</h2>
            <p className="text-text-secondary text-sm mt-3 max-w-[50ch] mx-auto">
              From services and tools to solutions and proven results.
            </p>
          </div>
          <RelatedSection
            groups={[
              {
                title: "Services",
                links: [
                  { label: "SEO Strategy", href: "/seo-strategy" },
                  { label: "Generative Engine Optimisation", href: "/generative-engine-optimisation" },
                  { label: "Web Development", href: "/nextjs-development" },
                  { label: "All Services", href: "/services" },
                ],
              },
              {
                title: "Solutions",
                links: [
                  { label: "Improve Search Visibility", href: "/improve-search-visibility" },
                  { label: "Become Visible in AI Search", href: "/become-visible-in-ai-search" },
                  { label: "Build a Custom CRM", href: "/build-custom-crm" },
                  { label: "All Solutions", href: "/solutions" },
                ],
              },
              {
                title: "Tools",
                links: [
                  { label: "Website SEO Audit", href: "/seo-audit" },
                  { label: "GEO Readiness Audit", href: "/geo-readiness" },
                  { label: "Schema Generator", href: "/schema-generator" },
                  { label: "All Tools", href: "/tools" },
                ],
              },
              {
                title: "More",
                links: [
                  { label: "Our Team", href: "/team" },
                  { label: "Our Work", href: "/work" },
                  { label: "Careers", href: "/careers" },
                  { label: "Contact", href: "/contact" },
                ],
              },
            ]}
          />
        </section>
    </>
  );
}
