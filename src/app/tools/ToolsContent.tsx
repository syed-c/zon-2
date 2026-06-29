"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MagnifyingGlass,
  Robot,
  FileText,
  Calculator,
  MapPin,
  SealCheck,
  Gear,
  Globe,
  ChartBar,
  Graph,
  CheckCircle,
  Clock,
  Star,
  Lightning,
  ArrowRight,
  List,
  ChartLineUp,
  Eye,
  Code,
  Question,
  Target,
} from "@phosphor-icons/react";
import ShapeGrid from "@/components/ShapeGrid";
import CTA from "@/components/CTA";
import { toolCategories } from "@/data/tools";

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

const categoryMeta = [
  { name: "SEO Tools", icon: MagnifyingGlass, desc: "Technical audits, on-page analysis, keyword research & more" },
  { name: "GEO & AI Search Tools", icon: Robot, desc: "AI search visibility, entity optimisation, LLM readiness" },
  { name: "Website Audit Tools", icon: Globe, desc: "Performance, security, accessibility & mobile checks" },
  { name: "Content Tools", icon: FileText, desc: "Briefs, outlines, readability, topic clusters & refresh" },
  { name: "Advertising Tools", icon: Calculator, desc: "Budget planning, ROAS, CPC, UTM & campaign audit" },
  { name: "Local Marketing Tools", icon: MapPin, desc: "GBP, citations, reviews, local rankings & NAP" },
  { name: "PR & Brand Tools", icon: SealCheck, desc: "Media outreach, brand authority, reputation & crisis" },
  { name: "Business & AI Tools", icon: Gear, desc: "CRM, automation, AI readiness, cost estimators" },
];

const toolIcons: Record<string, React.ComponentType<any>> = {
  "Website SEO Audit": ChartBar,
  "Technical SEO Checker": Code,
  "SERP Preview Tool": Eye,
  "Schema Generator": FileText,
  "SEO Content Brief Generator": FileText,
  "Landing Page Grader": ChartLineUp,
  "Google Ads Cost Calculator": Calculator,
  "Local SEO Audit": MapPin,
  "GEO Readiness Audit": Robot,
  "AI Search Visibility Checker": Robot,
  "UTM Builder": List,
  "Content Gap Analyzer": MagnifyingGlass,
  "Keyword Clustering Tool": ChartLineUp,
  "Schema Validator": SealCheck,
  "Redirect Checker": ArrowRight,
  "Core Web Vitals Checker": Graph,
  "Sitemap Validator": Globe,
  "Robots.txt Checker": Code,
  "Canonical Checker": CheckCircle,
  "Internal Link Analyzer": MagnifyingGlass,
  "Broken Link Checker": Code,
  "Image Alt Text Checker": Eye,
  "Indexability Checker": MagnifyingGlass,
  "SEO Content Score": ChartLineUp,
  "Metadata Checker": Eye,
  "Keyword Density Checker": MagnifyingGlass,
  "Search Intent Classifier": Question,
  "On-Page SEO Checker": MagnifyingGlass,
  "Migration Checklist Generator": List,
  "AI Citation Readiness Tool": Robot,
  "Entity Optimisation Checker": Robot,
  "Answer Engine Audit": Robot,
  "AI Overview Readiness Checker": Robot,
  "LLM Content Analyzer": Robot,
  "Question Coverage Checker": MagnifyingGlass,
  "Brand Authority Score": Star,
  "AI Competitor Comparison": ChartLineUp,
  "Structured Data Opportunity Finder": MagnifyingGlass,
  "Website Performance Audit": Graph,
  "Mobile Experience Checker": Globe,
  "Accessibility Checker": Eye,
  "Security Header Checker": SealCheck,
  "Technology Stack Checker": Gear,
  "SSL Checker": CheckCircle,
  "Domain Health Checker": Globe,
  "Page Weight Analyzer": ChartBar,
  "Uptime Monitor": Clock,
  "Conversion Audit Tool": ChartLineUp,
  "UX Checklist Tool": List,
  "Blog Outline Generator": FileText,
  "Heading Structure Checker": MagnifyingGlass,
  "Readability Checker": FileText,
  "Repetition Checker": FileText,
  "FAQ Generator": Question,
  "Topic Cluster Generator": ChartLineUp,
  "Internal Link Anchor Generator": MagnifyingGlass,
  "Content Refresh Analyzer": Clock,
  "E-E-A-T Checklist Tool": SealCheck,
  "Location Page Planner": MapPin,
  "ROAS Calculator": Calculator,
  "Cost Per Lead Calculator": Calculator,
  "Break-Even CPC Calculator": Calculator,
  "Ad Budget Planner": Calculator,
  "Ad Copy Preview Tool": Eye,
  "Landing Page Match Checker": Eye,
  "Negative Keyword Organizer": List,
  "Search Term Classifier": MagnifyingGlass,
  "Campaign Readiness Audit": CheckCircle,
  "Google Business Profile Audit": MapPin,
  "Citation Checker": MapPin,
  "Review Response Generator": FileText,
  "Local Rank Tracker": ChartLineUp,
  "NAP Consistency Checker": CheckCircle,
  "Local Landing Page Checker": Eye,
  "Service Area Generator": MapPin,
  "GBP Category Finder": MagnifyingGlass,
  "Review Link Generator": Target,
  "Press Release Quality Checker": SealCheck,
  "Media Pitch Generator": FileText,
  "Brand Mention Monitor": Eye,
  "PR Campaign Planner": List,
  "Outreach Organiser": List,
  "Brand Authority Audit": Star,
  "Reputation Checker": Eye,
  "Crisis Response Template Generator": FileText,
  "Brand Consistency Checker": CheckCircle,
  "CRM Requirements Builder": Gear,
  "Automation Opportunity Audit": Gear,
  "AI Readiness Assessment": Robot,
  "Business Process Analyzer": ChartLineUp,
  "Lead Follow-Up Workflow Builder": Gear,
  "AI Agent Cost Calculator": Calculator,
  "Custom Software Cost Estimator": Calculator,
  "Website Project Cost Calculator": Calculator,
  "App Development Cost Calculator": Calculator,
  "Digital Growth Plan Generator": Star,
};

const defaultIcon = MagnifyingGlass;

const featuredSlugs = [
  "seo-audit",
  "technical-seo-checker",
  "serp-preview-tool",
  "schema-generator",
  "content-brief",
  "landing-page-grader",
  "ads-calculator",
  "local-seo-audit",
  "geo-readiness",
  "ai-visibility",
  "utm-builder",
];

const timeEstimate: Record<string, string> = {
  "seo-audit": "5 min",
  "technical-seo-checker": "3 min",
  "on-page-seo-checker": "2 min",
  "metadata-checker": "1 min",
  "serp-preview-tool": "1 min",
  "keyword-density-checker": "2 min",
  "search-intent-classifier": "2 min",
  "keyword-clustering-tool": "3 min",
  "broken-link-checker": "4 min",
  "schema-generator": "2 min",
  "schema-validator": "2 min",
  "redirect-checker": "1 min",
  "core-web-vitals-checker": "2 min",
  "sitemap-validator": "1 min",
  "robots-txt-checker": "1 min",
  "canonical-checker": "1 min",
  "internal-link-analyzer": "3 min",
  "image-alt-text-checker": "2 min",
  "indexability-checker": "1 min",
  "seo-content-score": "2 min",
  "migration-checklist-generator": "3 min",
  "geo-readiness": "5 min",
  "ai-visibility": "3 min",
  "ai-citation-readiness": "3 min",
  "entity-optimisation-checker": "2 min",
  "answer-engine-audit": "4 min",
  "ai-overview-readiness-checker": "2 min",
  "llm-content-analyzer": "3 min",
  "question-coverage-checker": "2 min",
  "brand-authority-score": "3 min",
  "ai-competitor-comparison": "3 min",
  "structured-data-opportunity-finder": "2 min",
  "landing-page-grader": "2 min",
  "website-performance-audit": "4 min",
  "mobile-experience-checker": "2 min",
  "accessibility-checker": "3 min",
  "security-header-checker": "1 min",
  "technology-stack-checker": "1 min",
  "ssl-checker": "1 min",
  "domain-health-checker": "2 min",
  "page-weight-analyzer": "2 min",
  "uptime-monitor": "1 min",
  "conversion-audit-tool": "4 min",
  "ux-checklist-tool": "3 min",
  "content-brief": "5 min",
  "blog-outline-generator": "3 min",
  "content-gap-analyzer": "4 min",
  "heading-structure-checker": "1 min",
  "readability-checker": "1 min",
  "repetition-checker": "1 min",
  "faq-generator": "2 min",
  "topic-cluster-generator": "3 min",
  "internal-link-anchor-generator": "2 min",
  "content-refresh-analyzer": "3 min",
  "eeat-checklist-tool": "4 min",
  "location-page-planner": "3 min",
  "ads-calculator": "2 min",
  "roas-calculator": "2 min",
  "cost-per-lead-calculator": "2 min",
  "break-even-cpc-calculator": "2 min",
  "ad-budget-planner": "3 min",
  "utm-builder": "1 min",
  "ad-copy-preview": "2 min",
  "landing-page-match-checker": "2 min",
  "negative-keyword-organizer": "3 min",
  "search-term-classifier": "2 min",
  "campaign-readiness-audit": "4 min",
  "local-seo-audit": "5 min",
  "gbp-audit": "3 min",
  "citation-checker": "3 min",
  "review-response-generator": "2 min",
  "local-rank-tracker": "2 min",
  "nap-consistency-checker": "2 min",
  "local-landing-page-checker": "2 min",
  "service-area-generator": "3 min",
  "gbp-category-finder": "1 min",
  "review-link-generator": "1 min",
  "press-release-quality-checker": "3 min",
  "media-pitch-generator": "3 min",
  "brand-mention-monitor": "2 min",
  "pr-campaign-planner": "4 min",
  "outreach-organiser": "3 min",
  "brand-authority-audit": "3 min",
  "reputation-checker": "2 min",
  "crisis-response-template": "3 min",
  "brand-consistency-checker": "3 min",
  "crm-requirements-builder": "5 min",
  "automation-opportunity-audit": "4 min",
  "ai-readiness-assessment": "5 min",
  "business-process-analyzer": "4 min",
  "lead-follow-up-workflow-builder": "3 min",
  "ai-agent-cost-calculator": "2 min",
  "custom-software-cost-estimator": "2 min",
  "website-project-cost-calculator": "2 min",
  "app-development-cost-calculator": "2 min",
  "digital-growth-plan-generator": "5 min",
};

const allTools = toolCategories.flatMap((c) => c.tools);

const featuredTools = featuredSlugs.map((slug) => allTools.find((t) => t.slug === slug)).filter(Boolean) as typeof allTools;

function getToolIcon(name: string): React.ComponentType<any> {
  return toolIcons[name] || defaultIcon;
}

function getTime(slug: string): string {
  return timeEstimate[slug] || "3 min";
}

function getDifficulty(name: string): string {
  const easy = ["SERP Preview", "Schema Generator", "UTM Builder", "Metadata Checker", "Sitemap Validator", "Robots.txt", "Canonical Checker", "SSL Checker", "Redirect Checker", "FAQ Generator", "GBP Category Finder", "Review Link Generator", "Heading Structure Checker", "Readability Checker", "Repetition Checker", "Indexability Checker", "Image Alt Text Checker", "Security Header Checker", "Domain Health Checker"];
  if (easy.some((e) => name.includes(e))) return "Beginner";
  const hard = ["Website SEO Audit", "GEO Readiness", "Content Gap Analyzer", "Topic Cluster Generator", "Content Refresh Analyzer", "E-E-A-T Checklist", "PR Campaign Planner", "Brand Authority Audit", "CRM Requirements Builder", "Automation Opportunity Audit", "AI Readiness Assessment", "Business Process Analyzer", "Campaign Readiness Audit", "Conversion Audit Tool"];
  if (hard.some((e) => name.includes(e))) return "Advanced";
  return "Intermediate";
}

function getToolCount(): number {
  return allTools.length;
}

/* ─── HERO ─── */

function HeroSection() {
  return (
    <section className="relative pt-36 pb-24 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.12]">
          <ShapeGrid speed={0.1} squareSize={36} direction="diagonal" borderColor="#D4A849" hoverFillColor="#D4A849" shape="square" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ground/90 pointer-events-none" />
        <div className="absolute top-12 right-[10%] text-[clamp(6rem,14vw,12rem)] font-mono font-semibold text-accent/[0.04] leading-none select-none pointer-events-none">{getToolCount()}</div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.008]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.3), transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/10" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4 block">Free Tools</span>
          <h1 className="font-display font-semibold text-[clamp(2.5rem,5vw,5rem)] tracking-[-0.025em] leading-[0.92] text-text-primary mb-6 max-w-4xl">
            Audit, analyse, <br /><span className="text-accent">improve.</span>
          </h1>
          <p className="text-lg text-text-secondary/80 leading-relaxed max-w-[55ch]">
            {getToolCount()} free tools to audit your SEO health, GEO readiness, technical performance, content quality, and more. No sign-up required for basic results.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── SECTION 1: Interactive Tool Explorer ─── */

function ExplorerSection() {
  const [activeCat, setActiveCat] = useState(0);

  const cat = toolCategories[activeCat];

  return (
    <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px circle at 50% 20%, rgba(212,168,73,0.02), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-12">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Browse Tools</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary mb-4">
            Find the right tool <span className="text-accent">for the job.</span>
          </h2>
        </FadeUp>
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          <FadeUp>
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
              {categoryMeta.map((meta, i) => {
                const Icon = meta.icon;
                const isActive = activeCat === i;
                return (
                  <button
                    key={meta.name}
                    onClick={() => setActiveCat(i)}
                    className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl text-left shrink-0 transition-all duration-300 ${
                      isActive
                        ? "bg-accent/10 border border-accent/30 shadow-[inset_0_1px_0_rgba(212,168,73,0.15)]"
                        : "border border-transparent hover:bg-surface"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isActive ? "bg-accent/20 border border-accent/30" : "bg-accent/5 border border-accent/10"
                    }`}>
                      <Icon size={17} className={isActive ? "text-accent" : "text-accent/60"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isActive ? "text-accent" : "text-text-primary group-hover:text-accent transition-colors"}`}>{meta.name}</p>
                      <p className="text-[9px] text-text-secondary/40 mt-0.5">{cat.tools.length} tools</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </FadeUp>
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCat}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-lg font-medium text-text-primary">{categoryMeta[activeCat].name}</h3>
                    <p className="text-xs text-text-secondary/50 mt-1">{categoryMeta[activeCat].desc}</p>
                  </div>
                  <span className="text-[10px] font-mono text-accent/80 bg-accent/5 px-3 py-1 rounded-full border border-accent/10">{cat.tools.length} tools</span>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {cat.tools.map((tool) => {
                    const Icon = getToolIcon(tool.name);
                    return (
                      <Link
                        key={tool.slug}
                        href={`/${tool.slug}`}
                        className="group p-5 rounded-[1.25rem] bg-[#181818] border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-all duration-300">
                            <Icon size={17} className="text-accent" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors truncate">{tool.name}</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[9px] text-text-secondary/40">{getTime(tool.slug)}</span>
                              <span className="w-px h-3 bg-accent/10" />
                              <span className="text-[9px] text-text-secondary/40">{getDifficulty(tool.name)}</span>
                              {tool.isMvp && (
                                <>
                                  <span className="w-px h-3 bg-accent/10" />
                                  <span className="text-[9px] text-accent/80 flex items-center gap-1">
                                    <Lightning size={8} weight="fill" />
                                    Live
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-[10px] text-text-secondary/50 leading-relaxed line-clamp-2">{tool.shortDesc}</p>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 2: Featured Tools ─── */

function FeaturedSection() {
  return (
    <section className="py-28 lg:py-36 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.005]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.4), transparent 70%)" }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-12">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-3 block">Featured</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary mb-4">
            Start with our <span className="text-accent">most popular tools.</span></h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredTools.map((tool, i) => {
            const Icon = getToolIcon(tool.name);
            return (
              <FadeUp key={tool.slug} delay={i * 0.03}>
                <Link
                  href={`/${tool.slug}`}
                  className="group block p-6 rounded-[1.25rem] bg-[#181818] border border-accent/10 hover:border-accent/35 transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                      <Icon size={19} className="text-accent" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 text-[9px] text-accent/70 bg-accent/5 px-2 py-0.5 rounded-full">
                        <Star size={8} weight="fill" />
                        <span>Popular</span>
                      </div>
                      {tool.isMvp && (
                        <div className="flex items-center gap-1 text-[9px] text-accent/70 bg-accent/5 px-2 py-0.5 rounded-full">
                          <Lightning size={8} weight="fill" />
                          <span>Live</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="font-display text-sm font-medium text-text-primary mb-1.5 group-hover:text-accent transition-colors">{tool.name}</h3>
                  <p className="text-[10px] text-text-secondary/50 leading-relaxed mb-4 line-clamp-2">{tool.shortDesc}</p>
                  <div className="flex items-center gap-3 text-[9px] text-text-secondary/40">
                    <span className="flex items-center gap-1">
                      <Clock size={9} />
                      {getTime(tool.slug)}
                    </span>
                    <span className="w-px h-3 bg-accent/10" />
                    <span>{getDifficulty(tool.name)}</span>
                  </div>
                </Link>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN EXPORT ─── */

export function ToolsContent() {
  return (
    <>
      <HeroSection />
      <ExplorerSection />
      <FeaturedSection />
      <CTA />
    </>
  );
}
