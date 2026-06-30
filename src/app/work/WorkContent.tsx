"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  X,
  Heartbeat,
  Scales,
  Buildings,
  HardHat,
  House,
  Bed,
  ShoppingCart,
  GraduationCap,
  Cpu,
  Code,
  ChartLineUp,
  TrendUp,
  Globe,
  Clock,
  Users,
  Target,
  Star,
  Lightning,
  CheckCircle,
  SealCheck,
  Quotes,
  BookOpenText,
  CaretDown,
  CaretRight,
  Plus,
  MagnifyingGlass,
  ArrowLineUpRight,
} from "@phosphor-icons/react";
import CTA from "@/components/CTA";
import { caseStudies } from "@/data/case-studies";

const industryIcons: Record<string, React.ComponentType<any>> = {
  Healthcare: Heartbeat,
  "Life Sciences": Heartbeat,
  Fintech: ChartLineUp,
  Legal: Scales,
  Construction: HardHat,
  "Real Estate": House,
  "Supply Chain": Buildings,
  "E-Commerce": ShoppingCart,
  EdTech: GraduationCap,
  SaaS: Cpu,
  Technology: Cpu,
};

const industryColors: Record<string, string> = {
  Healthcare: "#D4A849",
  "Life Sciences": "#D4A849",
  Fintech: "#D4A849",
  Legal: "#D4A849",
  Construction: "#D4A849",
  "Real Estate": "#D4A849",
  "Supply Chain": "#D4A849",
  "E-Commerce": "#D4A849",
  EdTech: "#D4A849",
  SaaS: "#D4A849",
  Technology: "#D4A849",
};

function Badge({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-text-secondary bg-surface px-2.5 py-1 rounded-full border border-accent/10">
      {label}
    </span>
  );
}

const categoryExplorer = [
  { label: "All Industries", icon: Globe },
  { label: "Healthcare", icon: Heartbeat },
  { label: "Legal", icon: Scales },
  { label: "SaaS", icon: Cpu },
  { label: "Construction", icon: HardHat },
  { label: "Real Estate", icon: House },
  { label: "Hospitality", icon: Bed },
  { label: "E-Commerce", icon: ShoppingCart },
  { label: "Education", icon: GraduationCap },
  { label: "Technology", icon: Code },
  { label: "Supply Chain", icon: Buildings },
  { label: "Fintech", icon: TrendUp },
];

const processSteps = [
  { step: "01", title: "Research", desc: "Market intelligence, competitor analysis, and opportunity mapping to identify the highest-impact strategy." },
  { step: "02", title: "Market Analysis", desc: "Deep dive into audience behaviour, search landscapes, and channel performance to validate approach." },
  { step: "03", title: "Architecture", desc: "Technical foundation — information architecture, tech stack decisions, and systems design for scale." },
  { step: "04", title: "Build", desc: "Iterative development with continuous delivery, stakeholder demos, and quality gates at every milestone." },
  { step: "05", title: "Testing", desc: "Rigorous QA, performance benchmarking, A/B experimentation, and conversion validation before launch." },
  { step: "06", title: "Launch", desc: "Controlled rollout with monitoring, guardrails, and real-time performance dashboards from day one." },
  { step: "07", title: "Optimisation", desc: "Data-driven refinement — analysing results, iterating on what works, and doubling down on high-leverage channels." },
  { step: "08", title: "Scaling", desc: "Systems, playbooks, and automation that turn successful campaigns into repeatable, scalable growth engines." },
];

const outcomeCards = [
  { metric: "Reduced onboarding time by 82%", industry: "Fintech", timeline: "4 months", size: "50 employees", kpi: "Time-to-value", delta: "+82%", color: "#D4A849" },
  { metric: "Generated 1,200 qualified leads", industry: "SaaS", timeline: "6 months", size: "120 employees", kpi: "Lead volume", delta: "+190%", color: "#D4A849" },
  { metric: "Ranked #1 in 214 keywords", industry: "Real Estate", timeline: "5 months", size: "80 employees", kpi: "Keyword rankings", delta: "214", color: "#D4A849" },
  { metric: "$2.3M additional ARR", industry: "Construction", timeline: "14 months", size: "200 employees", kpi: "Annual revenue", delta: "$2.3M", color: "#D4A849" },
  { metric: "Saved 600 hours annually", industry: "Supply Chain", timeline: "3 months", size: "45 employees", kpi: "Hours saved", delta: "600h", color: "#D4A849" },
  { metric: "340% increase in AI citations", industry: "Healthcare", timeline: "4 months", size: "35 employees", kpi: "Brand mentions", delta: "+340%", color: "#D4A849" },
];

const techEcosystem = [
  { name: "Next.js", slug: "nextjs", count: 5 },
  { name: "React", slug: "react", count: 6 },
  { name: "Node.js", slug: "nodejs", count: 4 },
  { name: "Python", slug: "python", count: 3 },
  { name: "OpenAI", slug: "openai", count: 3 },
  { name: "Stripe", slug: "stripe", count: 3 },
  { name: "HubSpot", slug: "hubspot", count: 3 },
  { name: "PostgreSQL", slug: "postgresql", count: 4 },
  { name: "TypeScript", slug: "typescript", count: 6 },
  { name: "Tailwind", slug: "tailwind", count: 5 },
  { name: "Framer Motion", slug: "framer-motion", count: 3 },
  { name: "Superset", slug: "superset", count: 1 },
  { name: "dbt", slug: "dbt", count: 1 },
  { name: "WordPress", slug: "wordpress", count: 2 },
  { name: "Shopify", slug: "shopify", count: 1 },
  { name: "Google Cloud", slug: "google-cloud", count: 2 },
  { name: "AWS", slug: "aws", count: 2 },
  { name: "Vercel", slug: "vercel", count: 4 },
];

const awardMetrics = [
  { label: "Client Satisfaction", value: "96%", icon: Star },
  { label: "Client Retention", value: "100%", icon: SealCheck },
  { label: "Average ROI", value: "4.2x", icon: TrendUp },
  { label: "Industries Served", value: "10", icon: Globe },
  { label: "Countries Served", value: "12", icon: Users },
  { label: "Projects Delivered", value: "100+", icon: Lightning },
];

const industryImpactData = [
  { name: "Healthcare", projects: 2, metric: "+340%", sub: "Avg visibility increase", icon: Heartbeat },
  { name: "Legal", projects: 0, metric: "+180%", sub: "Qualified enquiries", icon: Scales },
  { name: "SaaS", projects: 1, metric: "+220%", sub: "Organic demos", icon: Cpu },
  { name: "Construction", projects: 1, metric: "+160%", sub: "Lead volume", icon: HardHat },
  { name: "Real Estate", projects: 2, metric: "+240%", sub: "Organic traffic", icon: House },
  { name: "Supply Chain", projects: 2, metric: "+190%", sub: "Lead qualification", icon: Buildings },
  { name: "E-Commerce", projects: 1, metric: "2.8x", sub: "Referral traffic", icon: ShoppingCart },
  { name: "EdTech", projects: 1, metric: "-52%", sub: "Cost per acquisition", icon: GraduationCap },
  { name: "Fintech", projects: 1, metric: "-68%", sub: "Manual processing", icon: TrendUp },
  { name: "Life Sciences", projects: 1, metric: "94%", sub: "Stakeholder adoption", icon: ChartLineUp },
];

const insights = [
  { title: "Why AI Search Will Replace Traditional SEO by 2027", slug: "ai-search-future", category: "GEO & AI Search", readTime: "8 min" },
  { title: "How to Build a Technical SEO Strategy That Scales", slug: "technical-seo-scale", category: "SEO", readTime: "12 min" },
  { title: "The ROI of Custom Software: When to Build vs Buy", slug: "custom-software-roi", category: "Software", readTime: "6 min" },
  { title: "AI Agents in Enterprise: A Practical Implementation Guide", slug: "ai-agents-guide", category: "AI & Automation", readTime: "10 min" },
  { title: "Digital PR for B2B: How to Get Featured in Tier-1 Publications", slug: "digital-pr-b2b", category: "Digital PR", readTime: "7 min" },
  { title: "Paid Media Attribution: Building a System That Actually Works", slug: "paid-media-attribution", category: "Paid Media", readTime: "9 min" },
];

export function WorkContent() {
  const [isMobile, setIsMobile] = useState(false);
  const [explorerFilter, setExplorerFilter] = useState("All Industries");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [hoveredOutcome, setHoveredOutcome] = useState<number | null>(null);
  const [showAllOutcomes, setShowAllOutcomes] = useState(false);
  const [showAllTransformations, setShowAllTransformations] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sectionRefs = {
    explorer: useRef<HTMLDivElement>(null),
    featured: useRef<HTMLDivElement>(null),
    dashboard: useRef<HTMLDivElement>(null),
    outcomes: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null),
  };

  if (isMobile) {
    return <MobileWorkPage />;
  }

  const featured = caseStudies.slice(0, 3);
  const filteredByExplorer =
    explorerFilter === "All Industries"
      ? caseStudies
      : caseStudies.filter((s) => s.industry === explorerFilter);

  const displayedOutcomes = showAllOutcomes ? outcomeCards : outcomeCards.slice(0, 3);
  const displayedTransformations = showAllTransformations ? caseStudies : caseStudies.slice(0, 4);

  const timelineData = caseStudies.map((s, i) => ({
    ...s,
    quarter: `Q${(i % 4) + 1} 202${Math.min(4, 2026 - 2020 + Math.floor(i / 4))}`,
    year: 2023 + Math.floor(i / 4),
  }));

  return (
    <>
      <div className="relative">
        <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-12 right-[10%] text-[clamp(6rem,14vw,12rem)] font-mono font-semibold text-accent/[0.03] leading-none select-none">12</div>
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.008]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.3), transparent 70%)" }} />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/10" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Our Work</span>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.025em] leading-[1] text-text-primary mb-6">
                Proof that <span className="text-accent">growth is possible.</span>
              </h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch]">
                Every project, campaign, and platform we publish includes the strategy, the execution, and the measurable business impact. No fluff. No marketing speak. Just results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 1: Interactive Portfolio Explorer */}
        <section ref={sectionRefs.explorer} className="py-16 lg:py-20 border-t border-accent/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} className="mb-12">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Explore Our Portfolio</span>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary">
                Browse by <span className="text-accent">industry.</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-12">
              <div>
                <div className="flex flex-wrap gap-2 lg:flex-col">
                  {categoryExplorer.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = explorerFilter === cat.label;
                    return (
                      <button
                        key={cat.label}
                        onClick={() => setExplorerFilter(cat.label)}
                        className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                          isActive
                            ? "bg-accent/10 border border-accent/25 shadow-[inset_0_1px_0_rgba(212,168,73,0.15)]"
                            : "hover:bg-surface border border-transparent"
                        }`}
                      >
                        <Icon size={18} className={isActive ? "text-accent" : "text-text-secondary group-hover:text-accent transition-colors"} />
                        <span className={`text-sm font-medium ${isActive ? "text-accent" : "text-text-secondary group-hover:text-text-primary transition-colors"}`}>
                          {cat.label}
                        </span>
                        <span className={`ml-auto text-[10px] font-mono ${isActive ? "text-accent/60" : "text-text-secondary/30"}`}>
                          {cat.label === "All Industries" ? caseStudies.length : caseStudies.filter((s) => s.industry === cat.label).length}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-surface/50 border border-accent/5">
                  <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-text-secondary/50 mb-2">Quick Stats</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-lg font-mono font-semibold text-accent">{caseStudies.length}</p>
                      <p className="text-[10px] text-text-secondary">Projects</p>
                    </div>
                    <div>
                      <p className="text-lg font-mono font-semibold text-accent">{new Set(caseStudies.map((s) => s.industry)).size}</p>
                      <p className="text-[10px] text-text-secondary">Industries</p>
                    </div>
                    <div>
                      <p className="text-lg font-mono font-semibold text-accent">{new Set(caseStudies.flatMap((s) => s.tags)).size}</p>
                      <p className="text-[10px] text-text-secondary">Expertise Areas</p>
                    </div>
                    <div>
                      <p className="text-lg font-mono font-semibold text-accent">{caseStudies.reduce((acc, s) => acc + s.metrics.length, 0)}</p>
                      <p className="text-[10px] text-text-secondary">Data Points</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {filteredByExplorer.map((study, index) => {
                      const Icon = industryIcons[study.industry] || Globe;
                      return (
                        <motion.div
                          key={study.slug}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.03, ease: [0.32, 0.72, 0, 1] }}
                        >
                          <Link href={`/${study.slug}`} className="block h-full group">
                            <div className="h-full p-5 rounded-[1.25rem] bg-[#181818] border border-accent/25 hover:border-accent/50 transition-all duration-300 hover:-translate-y-0.5">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <Icon size={14} className="text-accent" />
                                  <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-accent">{study.industry}</span>
                                </div>
                                <span className="text-[10px] text-text-secondary/40 font-mono">{study.client}</span>
                              </div>
                              <h3 className="font-display text-base font-medium text-text-primary mb-2 group-hover:text-accent transition-colors">{study.project}</h3>
                              <p className="font-mono text-lg font-semibold text-accent mb-3">{study.result}</p>
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {study.tags.slice(0, 3).map((tag) => (
                                  <span key={tag} className="text-[9px] font-medium tracking-[0.1em] uppercase text-text-secondary/60 bg-surface px-2 py-0.5 rounded-full border border-accent/5">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center gap-1 text-[11px] text-text-secondary/40 group-hover:text-accent/60 transition-colors">
                                <span>View case study</span>
                                <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                {filteredByExplorer.length === 0 && (
                  <div className="text-center py-12 sm:py-16 lg:py-20">
                    <p className="text-text-secondary/40">No projects in this category yet. Select another industry.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Featured Success Stories */}
        <section ref={sectionRefs.featured} className="py-12 sm:py-16 lg:py-28 bg-[#0D0C0B] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 0%, rgba(212,168,73,0.03), transparent)" }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} className="mb-12">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Featured Success Stories</span>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary">
                Our <span className="text-accent">best work.</span>
              </h2>
            </motion.div>

            <div className="space-y-8">
              {featured.map((study, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={study.slug}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.32, 0.72, 0, 1] }}
                  >
                    <Link href={`/${study.slug}`} className="block group">
                      <div className="grid lg:grid-cols-2 gap-0 rounded-[1.5rem] overflow-hidden border border-accent/10 bg-[#181818] hover:border-accent/25 transition-all duration-500">
                        <div className={`p-8 lg:p-12 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent">{study.industry}</span>
                            <span className="w-px h-4 bg-accent/20" />
                            <span className="text-xs text-text-secondary">{study.client}</span>
                          </div>
                          <h3 className="font-display text-2xl lg:text-3xl font-semibold text-text-primary mb-4 group-hover:text-accent transition-colors">{study.project}</h3>
                          <p className="font-mono text-xl lg:text-2xl font-semibold text-accent mb-4">{study.result}</p>
                          <div className="space-y-4 mb-6">
                            <div>
                              <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-text-secondary/50 mb-1">Challenge</p>
                              <p className="text-sm text-text-secondary leading-relaxed">{study.challenge.slice(0, 200)}...</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-text-secondary/50 mb-1">Approach</p>
                              <p className="text-sm text-text-secondary leading-relaxed">{study.approach.slice(0, 200)}...</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            {study.metrics.slice(0, 4).map((m, i) => (
                              <div key={i} className="p-3 rounded-xl bg-surface/50 border border-accent/5">
                                <p className="text-xs font-mono font-semibold text-accent">{m.value}</p>
                                <p className="text-[10px] text-text-secondary/60">{m.label}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {study.tags.map((tag) => (
                              <Badge key={tag} label={tag} />
                            ))}
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs text-accent/60 group-hover:text-accent transition-colors">
                            Read full case study
                            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                        <div className={`relative min-h-[300px] bg-[#121212] ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                          <div className="absolute inset-0 flex items-center justify-center p-8">
                            <div className="w-full max-w-sm">
                              <div className="p-6 rounded-2xl bg-[#181818] border border-accent/10">
                                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-text-secondary/50 mb-4">Performance Snapshot</p>
                                <div className="space-y-3">
                                  {study.metrics.map((m, i) => (
                                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-accent/5 last:border-0">
                                      <span className="text-xs text-text-secondary">{m.label}</span>
                                      <span className="text-sm font-mono font-semibold text-accent">{m.value}</span>
                                    </div>
                                  ))}
                                </div>
                                {study.testimonial && (
                                  <div className="mt-4 pt-4 border-t border-accent/10">
                                    <div className="flex gap-2">
                                      <Quotes size={16} className="text-accent/30 shrink-0 mt-0.5" />
                                      <div>
                                        <p className="text-xs text-text-secondary/70 italic leading-relaxed">&ldquo;{study.testimonial.quote.slice(0, 120)}&rdquo;</p>
                                        <p className="text-[10px] text-text-secondary/40 mt-1">{study.testimonial.person}, {study.testimonial.role}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: Results Dashboard */}
        <section ref={sectionRefs.dashboard} className="py-12 sm:py-16 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.005]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.4), transparent 70%)" }} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}>
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Results Dashboard</span>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary mb-12">
                The <span className="text-accent">numbers</span> speak for themselves.
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: "Traffic Growth", value: "+312% avg", icon: TrendUp },
                { label: "Leads Generated", value: "2,400+", icon: Users },
                { label: "Revenue Impact", value: "$3.7M+", icon: TrendUp },
                { label: "CPA Reduction", value: "-57% avg", icon: Target },
                { label: "Hours Automated", value: "1,200+", icon: Clock },
                { label: "Conversion Uplift", value: "+68% avg", icon: ChartLineUp },
                { label: "Organic Keywords", value: "980+", icon: Globe },
                { label: "Projects Completed", value: "12+", icon: CheckCircle },
                { label: "Avg ROI", value: "4.2x", icon: Lightning },
                { label: "Client Retention", value: "100%", icon: Star },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.04, ease: [0.32, 0.72, 0, 1] }}
                    className="p-5 rounded-[1.25rem] bg-[#181818] border border-accent/25 hover:border-accent/50 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icon size={20} className="text-accent/60 mb-3" />
                    <p className="font-mono text-2xl lg:text-3xl font-semibold text-accent mb-1">{stat.value}</p>
                    <p className="text-[11px] text-text-secondary/60">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: Transformation Gallery */}
        <section className="py-12 sm:py-16 lg:py-28 bg-[#0D0C0B] relative">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 30% 50%, rgba(212,168,73,0.02), transparent)" }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} className="flex items-end justify-between mb-12">
              <div>
                <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Transformation Gallery</span>
                <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary">
                  Before <span className="text-accent">&</span> After.
                </h2>
              </div>
              {!showAllTransformations && caseStudies.length > 4 && (
                <button onClick={() => setShowAllTransformations(true)} className="hidden sm:inline-flex items-center gap-1 text-xs text-accent/60 hover:text-accent transition-colors">
                  View all {caseStudies.length} projects
                  <ArrowRight size={12} />
                </button>
              )}
            </motion.div>

            <div className="space-y-6">
              {displayedTransformations.map((study, idx) => (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Link href={`/${study.slug}`} className="block group">
                    <div className="p-6 lg:p-8 rounded-[1.25rem] bg-[#181818] border border-accent/10 hover:border-accent/25 transition-all duration-300">
                      <div className="grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4 lg:gap-6">
                        <div>
                          <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-text-secondary/40 mb-1">Before</p>
                          <p className="text-sm text-text-secondary">{study.challenge.slice(0, 100)}...</p>
                        </div>
                        <div className="hidden lg:flex flex-col items-center">
                          <span className="text-[10px] font-mono text-accent/40">→</span>
                          <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent/30">Strategy</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-text-secondary/40 mb-1">Strategy</p>
                          <p className="text-sm text-text-secondary">{study.approach.slice(0, 100)}...</p>
                        </div>
                        <div className="hidden lg:flex flex-col items-center">
                          <span className="text-[10px] font-mono text-accent/40">→</span>
                          <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent/30">Result</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-text-secondary/40 mb-1">Result</p>
                          <p className="text-sm font-mono font-semibold text-accent">{study.result}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {study.metrics.slice(0, 2).map((m, i) => (
                              <span key={i} className="text-[9px] font-mono text-accent/60 bg-accent/5 px-2 py-0.5 rounded-full">{m.value}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-accent/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-text-secondary">{study.client}</span>
                          <span className="w-px h-3 bg-accent/10" />
                          <span className="text-[10px] text-text-secondary/40">{study.industry}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] text-accent/40 group-hover:text-accent transition-colors">
                          See full transformation
                          <ArrowRight size={10} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {!showAllTransformations && caseStudies.length > 4 && (
              <div className="mt-8 text-center sm:hidden">
                <button onClick={() => setShowAllTransformations(true)} className="inline-flex items-center gap-1 text-xs text-accent/60 hover:text-accent transition-colors">
                  View all {caseStudies.length} projects
                  <ArrowRight size={12} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 5: Interactive Case Study Wall */}
        <section className="py-12 sm:py-16 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} className="mb-12">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Case Study Wall</span>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary">
                Every project <span className="text-accent">tells a story.</span>
              </h2>
            </motion.div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {caseStudies.map((study, idx) => {
                const sizes = [
                  "break-inside-avoid",
                  "break-inside-avoid",
                  "break-inside-avoid",
                  "break-inside-avoid",
                ];
                return (
                  <motion.div
                    key={study.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.32, 0.72, 0, 1] }}
                    className={sizes[idx % sizes.length]}
                  >
                    <Link href={`/${study.slug}`} className="block group">
                      <div className={`p-6 rounded-[1.25rem] bg-[#181818] border border-accent/25 hover:border-accent/50 transition-all duration-300 hover:-translate-y-0.5 ${idx % 3 === 0 ? "lg:min-h-[320px]" : idx % 3 === 1 ? "" : "lg:min-h-[280px]"}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-accent">{study.industry}</span>
                          <span className="w-px h-3 bg-accent/10" />
                          <span className="text-[10px] text-text-secondary/40">{study.client}</span>
                        </div>
                        <h3 className="font-display text-lg font-medium text-text-primary mb-2 group-hover:text-accent transition-colors">{study.project}</h3>
                        <p className="font-mono text-xl font-semibold text-accent mb-3">{study.result}</p>
                        <p className="text-xs text-text-secondary/60 leading-relaxed mb-4 line-clamp-3">{study.description}</p>
                        <div className="flex items-center gap-2 text-[10px] text-text-secondary/40">
                          <span>{study.category}</span>
                          <span className="w-px h-3 bg-accent/10" />
                          <span>{study.tags.length} tags</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-accent/5">
                          <div className="flex flex-wrap gap-1">
                            {study.metrics.slice(0, 2).map((m, i) => (
                              <span key={i} className="text-[9px] font-mono text-accent/60">{m.value}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 6: Industry Impact */}
        <section className="py-12 sm:py-16 lg:py-28 bg-[#0D0C0B] relative">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 70% 30%, rgba(212,168,73,0.02), transparent)" }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} className="mb-12">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Industry Impact</span>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary">
                Proven results across <span className="text-accent">10 industries.</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {industryImpactData.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.04, ease: [0.32, 0.72, 0, 1] }}
                    className="p-5 rounded-[1.25rem] bg-[#181818] border border-accent/10 hover:border-accent/25 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={16} className="text-accent" />
                      <span className="text-sm font-medium text-text-primary">{item.name}</span>
                    </div>
                    <p className="text-2xl font-mono font-semibold text-accent mb-1">{item.metric}</p>
                    <p className="text-[11px] text-text-secondary/60 mb-3">{item.sub}</p>
                    <div className="flex items-center gap-1 text-[10px] text-text-secondary/40">
                      <span>{item.projects} project{item.projects !== 1 ? "s" : ""}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 7: What We Built — Interactive Service Ecosystem */}
        <section className="py-12 sm:py-16 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} className="mb-12">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Services in Action</span>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary">
                What <span className="text-accent">we built.</span>
              </h2>
              <p className="text-text-secondary/60 text-sm mt-3 max-w-lg">Click a service to see related projects. Everything we build is connected.</p>
            </motion.div>

            <div className="grid lg:grid-cols-[280px_1fr] gap-8">
              <div className="flex flex-wrap lg:flex-col gap-2">
                {[
                  { label: "All Services", key: null },
                  { label: "SEO", key: "SEO" },
                  { label: "GEO & AI Search", key: "GEO & AI Search" },
                  { label: "Digital PR", key: "Digital PR" },
                  { label: "Paid Media", key: "Paid Media" },
                  { label: "AI & Automation", key: "AI & Automation" },
                  { label: "Custom Software", key: "Custom Software" },
                  { label: "Data & Analytics", key: "Data & Analytics" },
                  { label: "Web Development", key: "Web Development" },
                ].map((svc) => (
                  <button
                    key={svc.label}
                    onClick={() => setSelectedService(selectedService === svc.key ? null : svc.key)}
                    className={`cursor-pointer group flex items-center gap-2 px-4 py-2.5 rounded-xl text-left transition-all duration-200 ${
                      selectedService === svc.key
                        ? "bg-accent/10 border border-accent/25"
                        : "hover:bg-surface border border-transparent"
                    }`}
                  >
                    <span className={`text-xs font-medium ${selectedService === svc.key ? "text-accent" : "text-text-secondary group-hover:text-text-primary transition-colors"}`}>
                      {svc.label}
                    </span>
                    <span className="ml-auto text-[9px] font-mono text-text-secondary/30">
                      {svc.key ? caseStudies.filter((s) => s.category === svc.key).length : caseStudies.length}
                      {selectedService === svc.key && <X size={12} className="text-accent ml-auto" />}
                    </span>
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {(selectedService ? caseStudies.filter((s) => s.category === selectedService) : caseStudies).slice(0, 6).map((study) => (
                  <Link key={study.slug} href={`/${study.slug}`} className="block group">
                    <div className="p-4 rounded-xl bg-[#181818] border border-accent/10 hover:border-accent/25 transition-all duration-200">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent">{study.industry}</span>
                      </div>
                      <h4 className="text-sm font-medium text-text-primary mb-1 group-hover:text-accent transition-colors">{study.project}</h4>
                      <p className="text-xs font-mono text-accent">{study.result}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Process Behind Every Success */}
        <section className="py-12 sm:py-16 lg:py-28 bg-[#0D0C0B] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.008]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.3), transparent 70%)" }} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} className="mb-12">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Our Process</span>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary">
                The method behind <span className="text-accent">every result.</span>
              </h2>
            </motion.div>

            <div className="relative">
              <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-accent/10 to-transparent hidden lg:block" />

              <div className="grid lg:grid-cols-4 gap-x-8 gap-y-10">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.32, 0.72, 0, 1] }}
                    className="relative pl-10 lg:pl-0"
                  >
                    <div className="hidden lg:flex items-center gap-3 mb-3">
                      <span className="text-[11px] font-mono font-semibold text-accent">{step.step}</span>
                      <div className="flex-1 h-px bg-accent/10" />
                    </div>
                    <div className="lg:hidden absolute left-0 top-1 w-[14px] h-[14px] rounded-full bg-accent/20 border-2 border-accent/40" />
                    <h3 className="font-display text-lg font-medium text-text-primary mb-2">{step.title}</h3>
                    <p className="text-xs text-text-secondary/60 leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: Client Outcomes */}
        <section ref={sectionRefs.outcomes} className="py-12 sm:py-16 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} className="flex items-end justify-between mb-12">
              <div>
                <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Client Outcomes</span>
                <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary">
                  Results that <span className="text-accent">change businesses.</span>
                </h2>
              </div>
              {!showAllOutcomes && outcomeCards.length > 3 && (
                <button onClick={() => setShowAllOutcomes(true)} className="hidden sm:inline-flex items-center gap-1 text-xs text-accent/60 hover:text-accent transition-colors">
                  View all outcomes
                  <ArrowRight size={12} />
                </button>
              )}
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedOutcomes.map((card, i) => (
                <motion.div
                  key={card.metric}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.32, 0.72, 0, 1] }}
                  onMouseEnter={() => setHoveredOutcome(i)}
                  onMouseLeave={() => setHoveredOutcome(null)}
                  className={`p-6 rounded-[1.25rem] bg-[#181818] border transition-all duration-300 ${
                    hoveredOutcome === i ? "border-accent/50 -translate-y-0.5" : "border-accent/25"
                  }`}
                >
                  <p className="font-display text-xl font-semibold text-text-primary mb-4">{card.metric}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-text-secondary/40">Industry</span>
                      <span className="text-[11px] text-text-secondary">{card.industry}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-text-secondary/40">Timeline</span>
                      <span className="text-[11px] text-text-secondary">{card.timeline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-text-secondary/40">Team Size</span>
                      <span className="text-[11px] text-text-secondary">{card.size}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-text-secondary/40">Primary KPI</span>
                      <span className="text-[11px] font-mono text-accent">{card.kpi}</span>
                    </div>
                  </div>
                  {hoveredOutcome === i && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="h-[2px] bg-accent/30 mt-4 origin-left"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {!showAllOutcomes && outcomeCards.length > 3 && (
              <div className="mt-8 text-center sm:hidden">
                <button onClick={() => setShowAllOutcomes(true)} className="inline-flex items-center gap-1 text-xs text-accent/60 hover:text-accent transition-colors">
                  View all outcomes
                  <ArrowRight size={12} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 10: Technologies Used */}
        <section className="py-12 sm:py-16 lg:py-28 bg-[#0D0C0B] relative">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 100%, rgba(212,168,73,0.02), transparent)" }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} className="mb-12">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Technology Ecosystem</span>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary">
                Tools we <span className="text-accent">trust.</span>
              </h2>
              <p className="text-text-secondary/60 text-sm mt-3 max-w-lg">Hover a technology to see which projects used it.</p>
            </motion.div>

            <div className="grid lg:grid-cols-[1fr_320px] gap-8">
              <div className="flex flex-wrap gap-3">
                {techEcosystem.map((tech) => (
                  <button
                    key={tech.slug}
                    onMouseEnter={() => setHoveredTech(tech.slug)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className={`group px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                      hoveredTech === tech.slug
                        ? "bg-accent/15 border-accent/40 text-accent"
                        : "bg-[#181818] border-accent/10 text-text-secondary hover:border-accent/25 hover:text-text-primary"
                    }`}
                  >
                    <span>{tech.name}</span>
                    <span className={`ml-2 text-[10px] font-mono ${hoveredTech === tech.slug ? "text-accent/60" : "text-text-secondary/30"}`}>
                      {tech.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-5 rounded-[1.25rem] bg-[#181818] border border-accent/10">
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-text-secondary/50 mb-3">
                  {hoveredTech ? `Projects using ${techEcosystem.find((t) => t.slug === hoveredTech)?.name}` : "Hover a technology"}
                </p>
                <div className="space-y-2">
                  {(hoveredTech
                    ? caseStudies.filter((s) =>
                        s.tags.some((t) => t.toLowerCase().includes(hoveredTech.toLowerCase())) ||
                        s.servicesUsed.some((sv) => sv.toLowerCase().includes(hoveredTech.toLowerCase())) ||
                        s.description.toLowerCase().includes(hoveredTech.toLowerCase()),
                      )
                    : []
                  ).slice(0, 4).map((study) => (
                    <Link key={study.slug} href={`/${study.slug}`} className="block group">
                      <div className="flex items-center justify-between py-1.5 border-b border-accent/5 last:border-0">
                        <span className="text-xs text-text-secondary group-hover:text-accent transition-colors">{study.client}</span>
                        <span className="text-[10px] text-text-secondary/40">{study.industry}</span>
                      </div>
                    </Link>
                  ))}
                  {hoveredTech && caseStudies.filter((s) =>
                    s.tags.some((t) => t.toLowerCase().includes(hoveredTech.toLowerCase())) ||
                    s.servicesUsed.some((sv) => sv.toLowerCase().includes(hoveredTech.toLowerCase())) ||
                    s.description.toLowerCase().includes(hoveredTech.toLowerCase()),
                  ).length === 0 && (
                    <p className="text-xs text-text-secondary/30">No matching projects</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 11: Awards / Recognition */}
        <section className="py-12 sm:py-16 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} className="mb-12">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">By the Numbers</span>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary">
                Recognition through <span className="text-accent">results.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {awardMetrics.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.04, ease: [0.32, 0.72, 0, 1] }}
                    className="p-5 rounded-[1.25rem] bg-[#181818] border border-accent/25 text-center hover:border-accent/50 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icon size={24} className="text-accent/60 mx-auto mb-3" />
                    <p className="font-mono text-2xl lg:text-3xl font-semibold text-accent mb-1">{item.value}</p>
                    <p className="text-[10px] text-text-secondary/60 uppercase tracking-[0.1em]">{item.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 12: Project Timeline */}
        <section className="py-12 sm:py-16 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} className="mb-12">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Project Timeline</span>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary">
                Our journey <span className="text-accent">in projects.</span>
              </h2>
            </motion.div>

            <div className="relative">
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/20 via-accent/5 to-transparent hidden sm:block" />

              <div className="space-y-0">
                {caseStudies.map((study, idx) => (
                  <motion.div
                    key={study.slug}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: idx * 0.03, ease: [0.32, 0.72, 0, 1] }}
                  >
                    <Link href={`/${study.slug}`} className="block group">
                      <div className="flex items-start gap-4 sm:gap-6 py-4 pl-10 sm:pl-10 relative">
                        <div className="hidden sm:flex absolute left-0 top-6 w-[10px] h-[10px] rounded-full bg-accent/15 border-2 border-accent/30 group-hover:bg-accent/30 group-hover:border-accent/60 transition-all duration-300" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] font-mono text-accent/40">{study.client}</span>
                            <span className="w-px h-3 bg-accent/10" />
                            <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent/30">{study.industry}</span>
                          </div>
                          <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">{study.project}</h3>
                          <p className="text-xs text-text-secondary/40 mt-0.5">{study.result}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {study.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-[8px] font-medium tracking-[0.1em] uppercase text-text-secondary/30 bg-surface px-2 py-0.5 rounded-full">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                    {idx < caseStudies.length - 1 && (
                      <div className="ml-[23px] sm:ml-[23px] h-px bg-accent/5" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 13: Related Insights */}
        <section className="py-12 sm:py-16 lg:py-28 bg-[#0D0C0B] relative">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 70% 50%, rgba(212,168,73,0.02), transparent)" }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} className="mb-12">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Related Insights</span>
              <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary">
                Resources to <span className="text-accent">go deeper.</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {insights.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.32, 0.72, 0, 1] }}
                >
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 14: CTA */}
        <section className="py-16 sm:py-20 lg:py-32 bg-[#0D0C0B] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 0%, rgba(212,168,73,0.06), transparent)" }} />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4 block"
            >
              Start Your Growth Story
            </motion.span>
            <motion.h2
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="font-display font-semibold text-[clamp(2.5rem,5vw,5rem)] tracking-[-0.03em] leading-[0.95] text-text-primary text-balance max-w-4xl mx-auto mb-4"
            >
              Let&apos;s build your <span className="text-accent">success story.</span>
            </motion.h2>
            <motion.p
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
              className="text-text-secondary text-base max-w-[55ch] mx-auto mb-10"
            >
              Free audit. No commitment. First results within 60 days or we fix it.
            </motion.p>
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              <Link
                href="/seo-audit"
                className="group inline-flex items-center gap-2 bg-accent text-ground pl-8 pr-3 py-3 rounded-full font-medium text-sm active:scale-[0.98] transition-transform duration-150 shadow-[0_0_30px_rgba(212,168,73,0.15)] hover:shadow-[0_0_40px_rgba(212,168,73,0.25)]"
              >
                Get Free Audit
                <span className="w-8 h-8 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                  <ArrowRight size={14} weight="bold" />
                </span>
              </Link>
              <Link
                href="/contact"
                className="text-text-secondary/50 underline underline-offset-4 hover:text-text-primary text-sm transition-colors duration-200"
              >
                Talk to our team
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}

/* ─── MOBILE SECTIONS ─── */

const mobileEase = [0.32, 0.72, 0, 1] as const;

const mobileProcessSteps = [
  { step: "01", title: "Research", desc: "Market intelligence, competitor analysis, and opportunity mapping." },
  { step: "02", title: "Analysis", desc: "Audience behaviour, search landscapes, and channel performance." },
  { step: "03", title: "Strategy", desc: "Architecture, tech decisions, and systems design." },
  { step: "04", title: "Execution", desc: "Iterative build, continuous delivery, quality gates." },
  { step: "05", title: "Scaling", desc: "Playbooks, automation, and repeatable growth engines." },
];

const mobileStatPills = [
  { label: "Projects", value: "12", icon: Lightning },
  { label: "Industries", value: "10", icon: Globe },
  { label: "Retention", value: "96%", icon: Star },
  { label: "Avg ROI", value: "4.2x", icon: TrendUp },
];

function MobileHero() {
  return (
    <section className="relative pt-28 pb-8 bg-ground overflow-hidden">
      <div className="px-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: mobileEase }}>
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-text-secondary/70 mb-3 block">Our Work</span>
          <h1 className="font-display font-semibold text-[clamp(2.375rem,9vw,2.75rem)] tracking-[-0.025em] leading-[1] text-white mb-4">
            Proof that <span className="text-accent">growth is possible.</span>
          </h1>
          <p className="text-text-secondary/80 text-[clamp(0.9375rem,2.5vw,1rem)] leading-relaxed mb-3">
            Every project, campaign, and platform we publish includes the strategy, the execution, and the measurable business impact.
          </p>
          <p className="text-text-secondary/60 text-sm leading-relaxed mb-6">
            No fluff. No marketing speak. Just results.
          </p>
          <Link href="/contact" className="group inline-flex items-center gap-2 bg-accent text-ground px-6 py-3 rounded-full font-semibold text-sm active:scale-[0.98] transition-all duration-200" style={{ minHeight: "48px" }}>
            Start your growth story
            <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
      <div className="px-5 mt-6">
        <div className="grid grid-cols-4 gap-2">
          {mobileStatPills.map((s) => {
            const SvgIcon = s.icon;
            return (
              <div key={s.label} className="bg-[#181818] border border-accent/20 rounded-xl p-2.5 text-center">
                <SvgIcon size={12} className="text-accent/60 mx-auto mb-1" />
                <span className="font-mono text-sm font-semibold text-accent block">{s.value}</span>
                <span className="text-[8px] text-text-secondary/50 block mt-0.5">{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MobileIndustryFilter({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  const cats = categoryExplorer.slice(0, 8);
  return (
    <div className="sticky top-0 z-40 bg-ground/95 backdrop-blur-lg border-b border-accent/10">
      <div className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => onSelect("All Industries")}
          className={`shrink-0 px-3.5 py-2 rounded-full border text-xs font-medium transition-all duration-200 active:scale-[0.96] ${
            selected === "All Industries" ? "bg-accent text-ground border-accent" : "bg-transparent text-text-secondary/70 border-accent/20 hover:border-accent/40"
          }`}
          style={{ minHeight: "44px" }}
        >
          All
        </button>
        {cats.filter(c => c.label !== "All Industries").map((cat) => {
          const Icon = cat.icon;
          const isActive = selected === cat.label;
          const count = cat.label === "All Industries" ? caseStudies.length : caseStudies.filter((s) => s.industry === cat.label).length;
          return (
            <button
              key={cat.label}
              onClick={() => onSelect(cat.label)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-medium transition-all duration-200 active:scale-[0.96] ${
                isActive ? "bg-accent text-ground border-accent" : "bg-transparent text-text-secondary/70 border-accent/20 hover:border-accent/40"
              }`}
              style={{ minHeight: "44px" }}
            >
              <Icon size={12} className={isActive ? "text-ground" : "text-accent/60"} />
              <span>{cat.label}</span>
              <span className={`text-[9px] font-mono ${isActive ? "text-ground/60" : "text-text-secondary/30"}`}>{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MobileProjectList({ filter }: { filter: string }) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const filtered = filter === "All Industries" ? caseStudies : caseStudies.filter((s) => s.industry === filter);

  return (
    <section className="py-[60px] bg-ground">
      <div className="px-5 mb-5">
        <h2 className="font-display font-semibold text-[clamp(1.625rem,7vw,2rem)] tracking-[-0.025em] leading-[1.08] text-white">
          {filter === "All Industries" ? "All projects" : filter}
        </h2>
      </div>
      <div className="px-5 space-y-3">
        {filtered.map((study) => {
          const Icon = industryIcons[study.industry] || Globe;
          const isExpanded = expandedSlug === study.slug;
          return (
            <motion.div
              key={study.slug}
              layout
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3 }}
            >
              <div
                onClick={() => setExpandedSlug(isExpanded ? null : study.slug)}
                className="bg-[#181818] border border-accent/20 rounded-[1.25rem] overflow-hidden cursor-pointer active:scale-[0.99] transition-transform duration-150"
              >
                <div className="p-4" style={{ minHeight: "160px" }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon size={12} className="text-accent" />
                    <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent">{study.industry}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-white mb-1">{study.project}</h3>
                  <p className="text-sm font-mono font-semibold text-accent mb-2">{study.result}</p>
                  <div className="flex flex-wrap gap-1">
                    {study.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[9px] text-text-secondary/50 bg-surface px-2 py-0.5 rounded-full border border-accent/5">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-[10px] text-accent/60">{isExpanded ? "Tap to collapse" : "Tap for details"}</span>
                    {isExpanded ? <CaretDown size={10} className="text-accent/40" /> : <CaretRight size={10} className="text-accent/40" />}
                  </div>
                </div>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.25, ease: mobileEase }}
                    className="overflow-hidden border-t border-accent/10"
                  >
                    <div className="p-4 space-y-4">
                      <div>
                        <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-text-secondary/50 mb-1 block">Challenge</span>
                        <p className="text-xs text-text-secondary/70 leading-relaxed">{study.challenge.slice(0, 160)}...</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-text-secondary/50 mb-1 block">Approach</span>
                        <p className="text-xs text-text-secondary/70 leading-relaxed">{study.approach.slice(0, 160)}...</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-text-secondary/50 mb-1 block">Results</span>
                        <div className="grid grid-cols-2 gap-2">
                          {study.metrics.slice(0, 4).map((m, i) => (
                            <div key={i} className="bg-surface/50 border border-accent/5 rounded-lg p-2.5 text-center">
                              <span className="text-xs font-mono font-semibold text-accent block">{m.value}</span>
                              <span className="text-[8px] text-text-secondary/50 block mt-0.5">{m.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Link href={`/${study.slug}`} className="group inline-flex items-center gap-1.5 text-xs text-accent/70">
                        View full case study <ArrowLineUpRight size={10} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function MobileBestWork() {
  const featured = caseStudies.slice(0, 4);
  return (
    <section className="py-[60px] bg-[#0D0C0B]">
      <div className="px-5 mb-5">
        <h2 className="font-display font-semibold text-[clamp(1.625rem,7vw,2rem)] tracking-[-0.025em] leading-[1.08] text-white mb-1">Best work</h2>
        <p className="text-text-secondary/60 text-sm">Our most impactful projects.</p>
      </div>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pl-5 pb-4">
        {featured.map((study, i) => {
          const Icon = industryIcons[study.industry] || Globe;
          return (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="snap-start shrink-0"
              style={{ width: "calc(85vw - 12px)", maxWidth: "320px" }}
            >
              <div className="bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={12} className="text-accent" />
                  <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent">{study.industry}</span>
                </div>
                <h3 className="font-display text-base font-semibold text-white mb-1">{study.project}</h3>
                <p className="text-sm font-mono font-semibold text-accent mb-2">{study.result}</p>
                <p className="text-xs text-text-secondary/60 leading-relaxed mb-4 line-clamp-2">{study.description}</p>
                <div className="mt-auto">
                  <Link href={`/${study.slug}`} className="group inline-flex items-center gap-1.5 text-xs text-accent/70">
                    Read case study <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function MobileMetrics() {
  const stats = [
    { label: "Traffic Growth", value: "+312%", icon: TrendUp },
    { label: "Leads Generated", value: "2,400+", icon: Users },
    { label: "Revenue Impact", value: "$3.7M", icon: TrendUp },
    { label: "CPA Reduction", value: "-57%", icon: Target },
    { label: "Conversion Uplift", value: "+68%", icon: ChartLineUp },
    { label: "Client Retention", value: "100%", icon: Star },
    { label: "Avg ROI", value: "4.2x", icon: Lightning },
    { label: "Projects Done", value: "12+", icon: CheckCircle },
  ];
  return (
    <section className="py-[60px] bg-ground">
      <div className="px-5 mb-5">
        <h2 className="font-display font-semibold text-[clamp(1.625rem,7vw,2rem)] tracking-[-0.025em] leading-[1.08] text-white mb-1">The numbers</h2>
        <p className="text-text-secondary/60 text-sm">Performance across every engagement.</p>
      </div>
      <div className="px-5">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => {
            const SvgIcon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-[#181818] border border-accent/20 rounded-xl p-3 flex items-center gap-3"
                style={{ minHeight: "72px" }}
              >
                <SvgIcon size={18} className="text-accent/60 shrink-0" />
                <div>
                  <span className="font-mono text-base font-semibold text-accent block leading-none">{s.value}</span>
                  <span className="text-[10px] text-text-secondary/60 block mt-0.5">{s.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MobileBeforeAfter() {
  const items = caseStudies.slice(0, 5);
  return (
    <section className="py-[60px] bg-[#0D0C0B]">
      <div className="px-5 mb-5">
        <h2 className="font-display font-semibold text-[clamp(1.625rem,7vw,2rem)] tracking-[-0.025em] leading-[1.08] text-white mb-1">Before & after</h2>
        <p className="text-text-secondary/60 text-sm">See the transformation.</p>
      </div>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pl-5 pb-4">
        {items.map((study, i) => (
          <motion.div
            key={study.slug}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="snap-start shrink-0"
            style={{ width: "calc(85vw - 12px)", maxWidth: "320px" }}
          >
            <div className="bg-[#181818] border border-accent/20 rounded-[1.25rem] overflow-hidden" style={{ minHeight: "200px" }}>
              <div className="p-4 border-b border-accent/10">
                <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-text-secondary/50 block mb-1">Before</span>
                <p className="text-xs text-text-secondary/70 leading-relaxed">{study.challenge.slice(0, 100)}...</p>
              </div>
              <div className="p-4">
                <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent/70 block mb-1">After</span>
                <p className="text-sm font-mono font-semibold text-accent mb-2">{study.result}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {study.metrics.slice(0, 3).map((m, j) => (
                    <span key={j} className="text-[9px] font-mono text-accent/60 bg-accent/5 px-2 py-0.5 rounded-full">{m.value}</span>
                  ))}
                </div>
                <Link href={`/${study.slug}`} className="group inline-flex items-center gap-1 text-[10px] text-accent/60">
                  Full story <ArrowRight size={9} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function MobileCaseStudies() {
  return (
    <section className="py-[60px] bg-ground">
      <div className="px-5 mb-5">
        <h2 className="font-display font-semibold text-[clamp(1.625rem,7vw,2rem)] tracking-[-0.025em] leading-[1.08] text-white mb-1">Case studies</h2>
        <p className="text-text-secondary/60 text-sm">Every project tells a story.</p>
      </div>
      <div className="px-5 space-y-3">
        {caseStudies.slice(0, 6).map((study, i) => {
          const isFeatured = i === 0 || i === 3;
          const Icon = industryIcons[study.industry] || Globe;
          return (
            <Link key={study.slug} href={`/${study.slug}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className={`bg-[#181818] border border-accent/20 rounded-[1.25rem] group-hover:border-accent/40 transition-all duration-200 ${
                  isFeatured ? "p-5" : "p-4"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon size={10} className="text-accent" />
                  <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-text-secondary/60">{study.industry}</span>
                  <span className="w-px h-2.5 bg-accent/10" />
                  <span className="text-[9px] text-text-secondary/40">{study.client}</span>
                </div>
                <h3 className={`font-display font-semibold text-white group-hover:text-accent transition-colors ${isFeatured ? "text-base" : "text-sm"}`}>
                  {study.project}
                </h3>
                <p className="text-xs font-mono font-semibold text-accent mt-1">{study.result}</p>
                {isFeatured && (
                  <p className="text-xs text-text-secondary/60 leading-relaxed mt-2 line-clamp-2">{study.description}</p>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function MobileIndustryResults() {
  return (
    <section className="py-[60px] bg-[#0D0C0B]">
      <div className="px-5 mb-5">
        <h2 className="font-display font-semibold text-[clamp(1.625rem,7vw,2rem)] tracking-[-0.025em] leading-[1.08] text-white mb-1">Industry impact</h2>
        <p className="text-text-secondary/60 text-sm">Results across sectors.</p>
      </div>
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none pl-5 pb-4">
        {industryImpactData.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="snap-start shrink-0"
              style={{ width: "calc(60vw - 12px)", maxWidth: "220px" }}
            >
              <div className="bg-[#181818] border border-accent/20 rounded-[1.25rem] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} className="text-accent" />
                  <span className="text-xs font-medium text-white">{item.name}</span>
                </div>
                <p className="text-xl font-mono font-semibold text-accent mb-1">{item.metric}</p>
                <p className="text-[10px] text-text-secondary/50">{item.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function MobileServicesFilter() {
  const services = [
    { label: "All", key: null },
    { label: "SEO", key: "SEO" },
    { label: "GEO & AI", key: "GEO & AI Search" },
    { label: "Digital PR", key: "Digital PR" },
    { label: "Paid Media", key: "Paid Media" },
    { label: "AI & Automation", key: "AI & Automation" },
    { label: "Software", key: "Custom Software" },
    { label: "Data & Analytics", key: "Data & Analytics" },
    { label: "Web Dev", key: "Web Development" },
  ];
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = selected ? caseStudies.filter((s) => s.category === selected) : caseStudies;

  return (
    <section className="py-[60px] bg-ground">
      <div className="px-5 mb-5">
        <h2 className="font-display font-semibold text-[clamp(1.625rem,7vw,2rem)] tracking-[-0.025em] leading-[1.08] text-white mb-1">Services in action</h2>
        <p className="text-text-secondary/60 text-sm">Filter by service type.</p>
      </div>
      <div className="flex gap-1.5 overflow-x-auto scrollbar-none px-5 pb-3">
        {services.map((svc) => (
          <button
            key={svc.label}
            onClick={() => setSelected(selected === svc.key ? null : svc.key)}
            className={`shrink-0 px-3.5 py-2 rounded-full border text-xs font-medium transition-all duration-200 active:scale-[0.96] ${
              selected === svc.key ? "bg-accent text-ground border-accent" : "bg-transparent text-text-secondary/70 border-accent/20 hover:border-accent/40"
            }`}
            style={{ minHeight: "44px" }}
          >
            {svc.label}
          </button>
        ))}
      </div>
      <div className="px-5 space-y-2">
        {filtered.slice(0, 6).map((study) => {
          const Icon = industryIcons[study.industry] || Globe;
          return (
            <Link key={study.slug} href={`/${study.slug}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25 }}
                className="bg-[#181818] border border-accent/15 rounded-xl p-3 group-hover:border-accent/30 transition-all duration-200"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={10} className="text-accent" />
                  <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent/70">{study.industry}</span>
                </div>
                <h4 className="text-sm font-medium text-white group-hover:text-accent transition-colors">{study.project}</h4>
                <p className="text-xs font-mono text-accent mt-0.5">{study.result}</p>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function MobileProcess() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="py-[60px] bg-[#0D0C0B]">
      <div className="px-5 mb-5">
        <h2 className="font-display font-semibold text-[clamp(1.625rem,7vw,2rem)] tracking-[-0.025em] leading-[1.08] text-white mb-1">Our process</h2>
        <p className="text-text-secondary/60 text-sm">The method behind every result.</p>
      </div>
      <div className="px-5 space-y-2">
        {mobileProcessSteps.map((step, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={step.step} className="bg-[#181818] border border-accent/20 rounded-[1.25rem] overflow-hidden">
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
                style={{ minHeight: "48px" }}
              >
                <span className="text-[10px] font-mono text-accent/60 font-semibold">{step.step}</span>
                <span className="text-sm font-medium text-white flex-1">{step.title}</span>
                {isOpen ? <CaretDown size={14} className="text-accent/60 shrink-0" /> : <CaretRight size={14} className="text-text-secondary/40 shrink-0" />}
              </button>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                  <div className="px-4 pb-4 pl-11">
                    <p className="text-xs text-text-secondary/70 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MobileClientResults() {
  return (
    <section className="py-[60px] bg-ground">
      <div className="px-5 mb-5">
        <h2 className="font-display font-semibold text-[clamp(1.625rem,7vw,2rem)] tracking-[-0.025em] leading-[1.08] text-white mb-1">Client outcomes</h2>
        <p className="text-text-secondary/60 text-sm">Results that change businesses.</p>
      </div>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pl-5 pb-4">
        {outcomeCards.map((card, i) => (
          <motion.div
            key={card.metric}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="snap-start shrink-0"
            style={{ width: "calc(80vw - 12px)", maxWidth: "300px" }}
          >
            <div className="bg-[#181818] border border-accent/20 rounded-[1.25rem] p-4" style={{ minHeight: "180px", maxHeight: "220px" }}>
              <p className="font-display text-base font-semibold text-white mb-2">{card.metric}</p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-text-secondary/50">Industry</span>
                  <span className="text-xs text-text-secondary/80">{card.industry}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-text-secondary/50">Timeline</span>
                  <span className="text-xs text-text-secondary/80">{card.timeline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-text-secondary/50">KPI</span>
                  <span className="text-xs font-mono text-accent">{card.kpi}</span>
                </div>
              </div>
              <p className="font-mono text-lg font-semibold text-accent mt-3">{card.delta}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function MobileTools() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const topTech = techEcosystem.sort((a, b) => b.count - a.count).slice(0, 10);
  return (
    <section className="py-[60px] bg-[#0D0C0B]">
      <div className="px-5 mb-5">
        <h2 className="font-display font-semibold text-[clamp(1.625rem,7vw,2rem)] tracking-[-0.025em] leading-[1.08] text-white mb-1">Tools we trust</h2>
        <p className="text-text-secondary/60 text-sm">Tap a technology to see related projects.</p>
      </div>
      <div className="px-5">
        <div className="flex flex-wrap gap-2 mb-4">
          {topTech.map((tech) => {
            const isSelected = selectedTech === tech.slug;
            return (
              <button
                key={tech.slug}
                onClick={() => setSelectedTech(isSelected ? null : tech.slug)}
                className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 active:scale-[0.96] ${
                  isSelected ? "bg-accent text-ground border-accent" : "bg-[#181818] text-text-secondary/70 border-accent/20 hover:border-accent/40"
                }`}
                style={{ minHeight: "36px" }}
              >
                {tech.name}
                <span className={`ml-1.5 text-[9px] font-mono ${isSelected ? "text-ground/60" : "text-text-secondary/30"}`}>{tech.count}</span>
              </button>
            );
          })}
        </div>
        {selectedTech && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181818] border border-accent/20 rounded-xl p-4">
            <p className="text-[9px] font-medium tracking-[0.1em] uppercase text-accent/70 mb-2">Projects using {techEcosystem.find((t) => t.slug === selectedTech)?.name}</p>
            <div className="space-y-1.5">
              {caseStudies.filter((s) =>
                s.tags.some((t) => t.toLowerCase().includes(selectedTech.toLowerCase())) ||
                s.servicesUsed.some((sv) => sv.toLowerCase().includes(selectedTech.toLowerCase()))
              ).slice(0, 3).map((study) => (
                <Link key={study.slug} href={`/${study.slug}`} className="block group">
                  <div className="flex items-center justify-between py-1.5 border-b border-accent/5 last:border-0">
                    <span className="text-xs text-text-secondary/80 group-hover:text-accent transition-colors">{study.client}</span>
                    <span className="text-[9px] text-text-secondary/40">{study.industry}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function MobileRecognition() {
  return (
    <section className="py-[60px] bg-ground">
      <div className="px-5 mb-5">
        <h2 className="font-display font-semibold text-[clamp(1.625rem,7vw,2rem)] tracking-[-0.025em] leading-[1.08] text-white mb-1">Recognition</h2>
        <p className="text-text-secondary/60 text-sm">By the numbers.</p>
      </div>
      <div className="px-5">
        <div className="grid grid-cols-2 gap-3">
          {awardMetrics.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-[#181818] border border-accent/20 rounded-xl p-4 text-center"
                style={{ minHeight: "80px" }}
              >
                <Icon size={18} className="text-accent/60 mx-auto mb-1.5" />
                <span className="font-mono text-lg font-semibold text-accent block leading-none">{item.value}</span>
                <span className="text-[9px] text-text-secondary/50 block mt-1 uppercase tracking-[0.08em]">{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MobileCTA() {
  return (
    <section className="py-[60px] bg-[#0D0C0B]">
      <div className="px-5 text-center">
        <h2 className="font-display font-semibold text-[clamp(1.75rem,7vw,2.25rem)] tracking-[-0.03em] leading-[1.05] text-white mb-3">
          Let&apos;s build your <span className="text-accent">success story.</span>
        </h2>
        <p className="text-text-secondary/70 text-sm leading-relaxed mb-6 max-w-[32ch] mx-auto">
          Free audit. No commitment. First results within 60 days or we fix it.
        </p>
        <Link href="/seo-audit" className="group inline-flex items-center gap-2 bg-accent text-ground pl-7 pr-2 py-2.5 rounded-full font-medium text-sm active:scale-[0.98] transition-transform duration-150" style={{ minHeight: "48px" }}>
          Get Free Audit
          <span className="w-7 h-7 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight size={12} weight="bold" />
          </span>
        </Link>
      </div>
    </section>
  );
}

function MobileWorkPage() {
  const [industryFilter, setIndustryFilter] = useState("All Industries");

  return (
    <>
      <MobileHero />
      <MobileIndustryFilter selected={industryFilter} onSelect={setIndustryFilter} />
      <MobileProjectList filter={industryFilter} />
      <MobileBestWork />
      <MobileMetrics />
      <MobileBeforeAfter />
      <MobileCaseStudies />
      <MobileIndustryResults />
      <MobileServicesFilter />
      <MobileProcess />
      <MobileClientResults />
      <MobileTools />
      <MobileRecognition />
      <MobileCTA />
    </>
  );
}
