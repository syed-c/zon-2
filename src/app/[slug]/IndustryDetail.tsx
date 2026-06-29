"use client";

/*
 * IndustryDetail.tsx — Complete industry detail page generator
 *
 * This file generates 13 unique industry detail pages with 14+ deep sections each.
 * Each page function composes shared section components in a unique order with
 * industry-specific data, SVG illustrations, and tailored hero content.
 *
 * Architecture:
 *   - Data records (lines ~170-790): Per-industry structured data for snapshots,
 *     buying journeys, mistakes, stats, FAQs, growth systems, opportunities,
 *     resources, testimonials, approach comparisons, competitor maps, trends
 *   - Helper components (lines ~800-820): Background patterns, cards, pills,
 *     fade-in wrappers, count-up utility
 *   - Section components (lines ~820-1910): 20 reusable sections each with
 *     unique visual identity, animations, and responsive layouts
 *   - SVG illustrations (lines ~1910-2080): 13 inline SVG icons for hero sections
 *   - Page functions (lines ~2080-2390): 13 industry-specific page composers
 *     with unique hero sections and varied section ordering
 *   - Main export (lines ~2390-2410): IndustryDetailContent routing
 *
 * Sections (20 total):
 *   1.  Snapshot         — Key market metrics and digital maturity overview
 *   2.  Buying Journey   — Customer decision process with digital/offline
 *   3.  Challenges       — Industry-specific hurdles and pain points
 *   4.  Growth Opps      — Quantified revenue and efficiency opportunities
 *   5.  Growth System    — 5-step tailored framework for the industry
 *   6.  Solutions        — ZON service offerings relevant to the industry
 *   7.  Tools            — Recommended tools and free resources
 *   8.  Case Studies     — Proven results from clients in the same sector
 *   9.  Statistics       — Market data dashboard with volume, CPC, LTV
 *   10. Common Mistakes  — Frequent errors and how ZON fixes them
 *   11. Timeline         — Phased implementation roadmap with milestones
 *   12. FAQ              — Answered common questions with expand/collapse
 *   13. Resources        — Curated insights, guides, and thought leadership
 *   14. Industry About   — Market context and digital opportunity overview
 *   15. Process Overview — ZON's 5-phase delivery methodology
 *   16. Strategic Trends — Market dynamics shaping the industry today
 *   17. Testimonials     — Client success stories with measurable metrics
 *   18. Approach Comparison — Traditional vs ZON methodology side by side
 *   19. Competitor Map   — Competitive landscape analysis with plays
 *   20. Explore Other    — Premium industry discovery with smart filtering
 *
 * Data sources:
 *   - @/data/industries — IndustryItem type and industry list
 *   - @/data/case-studies — CaseStudyItem type with metrics
 *   - @/data/solutions — SolutionItem with relevant services
 *   - @/data/tools — ToolItem with categories (dynamic import)
 *
 * Industries: dental-healthcare, business-setup-corporate-services,
 * exhibitions-events, professional-services, legal-services,
 * cleaning-facilities, real-estate, ecommerce, hospitality,
 * education, local-service-businesses, saas-technology,
 * disability-care-services
 *
 * Design tokens:
 *   - bg-ground: #080807, bg-surface: #111110
 *   - text-primary: #F2EDE6, text-secondary: #8A8480
 *   - accent: #D4A849
 *   - Fonts: Clash Display (display), Cabinet Grotesk (body), JetBrains Mono (mono)
 *   - Ease: [0.32, 0.72, 0, 1]
 *
 * Conventions:
 *   - Tailwind v4 @theme tokens and arbitrary values
 *   - CSS transitions for hover, Framer Motion for mount/unmount
 *   - transform-gpu for performance, AnimatePresence mode="popLayout"
 *   - Per-page functions guarantee unique section ordering
 *   - Shared section components accept industry prop for data injection
 */

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShapeGrid from "@/components/ShapeGrid";
import Link from "next/link";
import {
  ArrowRight, ArrowLineUpRight, CaretDown, CaretRight,
  Heartbeat, Briefcase, CalendarBlank, Target, Scales,
  Broom, House, ShoppingCart, Sparkle, GraduationCap,
  MapPin, Code, Heart, MagnifyingGlass, Graph, Lightning,
  SealCheck, ChartLineUp, CurrencyDollar, Star, Eye, Gear,
  Robot, Clock, Users, Wrench, Building, Storefront, Globe,
  Handshake, PuzzlePiece, Circle, Plus, CheckCircle, XCircle,
  Phone, ChatCircle, Envelope, ListChecks, Rocket, Shield,
  BookOpen, Question, Flag, User,
} from "@phosphor-icons/react";
import { industries } from "@/data/industries";
import type { IndustryItem } from "@/data/industries";
import { caseStudies } from "@/data/case-studies";
import { solutions } from "@/data/solutions";
import CTA from "@/components/CTA";

const ease = [0.32, 0.72, 0, 1] as const;

const animStyles = `
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeInCard { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes fadeInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes progressPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
  @keyframes borderGlow { 0%, 100% { border-color: rgba(212,168,73,0.25); } 50% { border-color: rgba(212,168,73,0.55); } }
  @keyframes countIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes revealDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 4px rgba(212,168,73,0.05); } 50% { box-shadow: 0 0 20px rgba(212,168,73,0.1); } }
  @keyframes slideExpand { from { max-width: 0; opacity: 0; } to { max-width: 100%; opacity: 1; } }
  .animate-fadeIn { animation: fadeInCard 0.5s both ease-out; }
  .animate-fadeInLeft { animation: fadeInLeft 0.4s both ease-out; }
  .animate-fadeInRight { animation: fadeInRight 0.4s both ease-out; }
  .animate-scaleIn { animation: scaleIn 0.4s both ease-out; }
  .animate-slideUp { animation: slideUp 0.6s both ease-out; }
  .animate-count-in { animation: countIn 0.3s both ease-out; }
  .animate-reveal-down { animation: revealDown 0.3s both ease-out; }
  .animate-glow-pulse { animation: glowPulse 2s ease-in-out infinite; }
  .animate-slide-expand { animation: slideExpand 0.5s both ease-out; }
`;

const iconMap: Record<string, React.ElementType> = {
  Heartbeat, Briefcase, CalendarBlank, Target, Scales, Broom, House,
  ShoppingCart, Sparkle, GraduationCap, MapPin, Code, Heart,
};

/* ─── HELPER COMPONENTS ─── */

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

function BgDots() {
  return (
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
      style={{ backgroundImage: "radial-gradient(rgba(212,168,73,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
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
    <div className={className} style={{ opacity: 0, animation: `fadeInUp 0.6s ${delay}s ease-out forwards` }}>
      {children}
    </div>
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

/* ─── PER-INDUSTRY EXTENDED DATA ─── */

const industrySnapshotData: Record<string, {
  businessSize: string; competitionLevel: string; competitionPct: number;
  digitalMaturity: number; searchDemand: number; growthOpportunity: number;
  avgLeadValue: number; aiReadiness: number;
}> = {
  "dental-healthcare": { businessSize: "12,400+ practices", competitionLevel: "High", competitionPct: 82, digitalMaturity: 38, searchDemand: 91, growthOpportunity: 76, avgLeadValue: 1800, aiReadiness: 45 },
  "business-setup-corporate-services": { businessSize: "8,200+ firms", competitionLevel: "High", competitionPct: 72, digitalMaturity: 45, searchDemand: 58, growthOpportunity: 80, avgLeadValue: 4500, aiReadiness: 50 },
  "exhibitions-events": { businessSize: "3,800+ organisers", competitionLevel: "Medium", competitionPct: 65, digitalMaturity: 42, searchDemand: 80, growthOpportunity: 72, avgLeadValue: 3200, aiReadiness: 35 },
  "professional-services": { businessSize: "42,000+ firms", competitionLevel: "High", competitionPct: 78, digitalMaturity: 35, searchDemand: 62, growthOpportunity: 78, avgLeadValue: 3800, aiReadiness: 48 },
  "legal-services": { businessSize: "10,500+ firms", competitionLevel: "Very High", competitionPct: 92, digitalMaturity: 28, searchDemand: 88, growthOpportunity: 88, avgLeadValue: 5200, aiReadiness: 52 },
  "cleaning-facilities": { businessSize: "22,000+ businesses", competitionLevel: "High", competitionPct: 80, digitalMaturity: 22, searchDemand: 85, growthOpportunity: 65, avgLeadValue: 950, aiReadiness: 30 },
  "real-estate": { businessSize: "18,500+ agencies", competitionLevel: "Very High", competitionPct: 88, digitalMaturity: 40, searchDemand: 92, growthOpportunity: 85, avgLeadValue: 6200, aiReadiness: 55 },
  "ecommerce": { businessSize: "52,000+ stores", competitionLevel: "Very High", competitionPct: 95, digitalMaturity: 52, searchDemand: 96, growthOpportunity: 92, avgLeadValue: 78, aiReadiness: 65 },
  "hospitality": { businessSize: "28,000+ venues", competitionLevel: "High", competitionPct: 78, digitalMaturity: 36, searchDemand: 90, growthOpportunity: 80, avgLeadValue: 2100, aiReadiness: 48 },
  "education": { businessSize: "6,800+ institutions", competitionLevel: "High", competitionPct: 75, digitalMaturity: 42, searchDemand: 78, growthOpportunity: 70, avgLeadValue: 8400, aiReadiness: 58 },
  "local-service-businesses": { businessSize: "85,000+ businesses", competitionLevel: "Very High", competitionPct: 84, digitalMaturity: 18, searchDemand: 88, growthOpportunity: 68, avgLeadValue: 450, aiReadiness: 32 },
  "saas-technology": { businessSize: "14,200+ companies", competitionLevel: "Very High", competitionPct: 92, digitalMaturity: 62, searchDemand: 85, growthOpportunity: 90, avgLeadValue: 2800, aiReadiness: 78 },
  "disability-care-services": { businessSize: "5,600+ providers", competitionLevel: "Medium", competitionPct: 62, digitalMaturity: 25, searchDemand: 70, growthOpportunity: 72, avgLeadValue: 3600, aiReadiness: 40 },
};

const industryBuyingJourneys: Record<string, { stage: string; desc: string; digital: boolean }[]> = {
  "dental-healthcare": [
    { stage: "Symptoms", desc: "Patient experiences dental issue", digital: false },
    { stage: "Google Search", desc: "Searches for symptoms and treatments", digital: true },
    { stage: "Compare Providers", desc: "Reads reviews and checks ratings", digital: true },
    { stage: "Visit Website", desc: "Explores treatments, location, pricing", digital: true },
    { stage: "Book Appointment", desc: "Books online or by phone", digital: true },
    { stage: "Visit Clinic", desc: "Attends appointment in person", digital: false },
    { stage: "Follow-up", desc: "Post-treatment care and recall", digital: true },
  ],
  "business-setup-corporate-services": [
    { stage: "Business Need", desc: "Identifies need for incorporation or compliance", digital: false },
    { stage: "Research Firms", desc: "Searches for providers and compares", digital: true },
    { stage: "Read Content", desc: "Studies guides, jurisdiction comparisons", digital: true },
    { stage: "Check Credentials", desc: "Reviews accreditations and testimonials", digital: true },
    { stage: "Request Consultation", desc: "Fills contact form or books call", digital: true },
    { stage: "Engagement", desc: "Onboarding and service delivery begins", digital: false },
    { stage: "Referral Loop", desc: "Satisfied client refers others", digital: false },
  ],
  "exhibitions-events": [
    { stage: "Awareness", desc: "Hears about event via industry channels", digital: true },
    { stage: "Search Event", desc: "Searches for event details and speakers", digital: true },
    { stage: "Evaluate", desc: "Checks agenda, speakers, venue, pricing", digital: true },
    { stage: "Register", desc: "Completes ticket purchase online", digital: true },
    { stage: "Pre-Event", desc: "Receives updates, networking prep", digital: true },
    { stage: "Attend", desc: "Participates in the live event", digital: false },
    { stage: "Post-Event", desc: "Accesses recordings and content", digital: true },
  ],
  "professional-services": [
    { stage: "Problem Identified", desc: "Client recognises a business need", digital: false },
    { stage: "Search Experts", desc: "Searches for consultants and firms", digital: true },
    { stage: "Review Authority", desc: "Reads thought leadership and case studies", digital: true },
    { stage: "Shortlist", desc: "Compares expertise and approach", digital: true },
    { stage: "Initial Call", desc: "Discovery call or meeting", digital: false },
    { stage: "Proposal & Engage", desc: "Receives proposal and signs", digital: true },
    { stage: "Ongoing Delivery", desc: "Project delivery and reporting", digital: true },
  ],
  "legal-services": [
    { stage: "Legal Issue", desc: "Client experiences a legal need", digital: false },
    { stage: "Search Firms", desc: "Searches for practice-area expertise", digital: true },
    { stage: "Evaluate Reputation", desc: "Reads reviews, testimonials, case results", digital: true },
    { stage: "Visit Website", desc: "Explores practice areas and team", digital: true },
    { stage: "Contact Firm", desc: "Calls or fills intake form", digital: true },
    { stage: "Consultation", desc: "Initial case evaluation meeting", digital: false },
    { stage: "Engagement", desc: "Retainer signed, case begins", digital: false },
  ],
  "cleaning-facilities": [
    { stage: "Need Identified", desc: "Business needs cleaning or facility services", digital: false },
    { stage: "Local Search", desc: "Searches for cleaners in service area", digital: true },
    { stage: "Compare Quotes", desc: "Requests quotes from multiple providers", digital: true },
    { stage: "Check Reviews", desc: "Reads Google reviews and ratings", digital: true },
    { stage: "Request Quote", desc: "Fills online quote form", digital: true },
    { stage: "Site Visit", desc: "Provider visits for assessment", digital: false },
    { stage: "Contract Signed", desc: "Ongoing service agreement", digital: true },
  ],
  "real-estate": [
    { stage: "Life Event", desc: "Decides to buy, sell, or rent", digital: false },
    { stage: "Search Online", desc: "Browses listings and area guides", digital: true },
    { stage: "Find Agent", desc: "Searches for local agents", digital: true },
    { stage: "View Properties", desc: "Attends viewings and open houses", digital: false },
    { stage: "Compare Options", desc: "Evaluates properties and areas", digital: true },
    { stage: "Make Offer", desc: "Submits offer or application", digital: true },
    { stage: "Transaction", desc: "Exchange and completion", digital: false },
  ],
  "ecommerce": [
    { stage: "Need Awareness", desc: "Identifies product need or desire", digital: false },
    { stage: "Search Products", desc: "Searches Google or marketplaces", digital: true },
    { stage: "Compare Options", desc: "Reads reviews and compares prices", digital: true },
    { stage: "Visit Store", desc: "Browses product pages and content", digital: true },
    { stage: "Add to Cart", desc: "Places items in basket", digital: true },
    { stage: "Checkout", desc: "Completes purchase and payment", digital: true },
    { stage: "Post-Purchase", desc: "Receives order and follow-up", digital: true },
  ],
  "hospitality": [
    { stage: "Trip Planning", desc: "Decides to travel or dine out", digital: false },
    { stage: "Search Options", desc: "Searches for venues and reviews", digital: true },
    { stage: "Check Reviews", desc: "Reads TripAdvisor, Google reviews", digital: true },
    { stage: "Visit Website", desc: "Explores menus, rooms, photos", digital: true },
    { stage: "Book Direct", desc: "Reserves room or table online", digital: true },
    { stage: "Experience", desc: "Stays or dines at venue", digital: false },
    { stage: "Post-Review", desc: "Leaves review and returns", digital: true },
  ],
  "education": [
    { stage: "Aspiration", desc: "Student or parent identifies education goal", digital: false },
    { stage: "Research Programmes", desc: "Searches for courses and institutions", digital: true },
    { stage: "Compare Options", desc: "Compares programmes, fees, outcomes", digital: true },
    { stage: "Visit Campus", desc: "Attends open day or virtual tour", digital: false },
    { stage: "Apply", desc: "Submits application online", digital: true },
    { stage: "Enrol", desc: "Accepts offer and enrols", digital: true },
    { stage: "Student Journey", desc: "Studies, graduates, becomes alumni", digital: true },
  ],
  "local-service-businesses": [
    { stage: "Urgent Need", desc: "Problem arises (plumbing, electrical, etc.)", digital: false },
    { stage: "Local Search", desc: "Searches for nearby service providers", digital: true },
    { stage: "Check GBP", desc: "Views Google Business Profile and reviews", digital: true },
    { stage: "Call or Book", desc: "Calls or books online immediately", digital: true },
    { stage: "Service Delivered", desc: "Provider arrives and fixes issue", digital: false },
    { stage: "Payment", desc: "Pays for service", digital: true },
    { stage: "Review Left", desc: "Leaves Google review", digital: true },
  ],
  "saas-technology": [
    { stage: "Problem Identified", desc: "Business identifies a pain point", digital: false },
    { stage: "Search Solutions", desc: "Searches for software and tools", digital: true },
    { stage: "Read Content", desc: "Researches via blogs, docs, comparisons", digital: true },
    { stage: "Request Demo", desc: "Books product demo online", digital: true },
    { stage: "Start Trial", desc: "Begins free trial period", digital: true },
    { stage: "Subscribe", desc: "Converts to paid subscription", digital: true },
    { stage: "Expand", desc: "Adds users, features, or upgrades", digital: true },
  ],
  "disability-care-services": [
    { stage: "Care Need", desc: "Family identifies need for care support", digital: false },
    { stage: "Search Providers", desc: "Searches for local care services", digital: true },
    { stage: "Check Credentials", desc: "Reviews accreditations and testimonials", digital: true },
    { stage: "Visit Website", desc: "Explores services and approach", digital: true },
    { stage: "Enquire", desc: "Fills contact form or calls", digital: true },
    { stage: "Assessment", desc: "Care needs assessment visit", digital: false },
    { stage: "Care Begins", desc: "Service commences with care plan", digital: true },
  ],
};

const industryMistakes: Record<string, { title: string; desc: string; fix: string }[]> = {
  "dental-healthcare": [
    { title: "Ignoring GBP Optimisation", desc: "Many practices have incomplete or unverified Google Business Profiles, missing critical fields like service categories and treatment lists.", fix: "We optimise every GBP field, add treatment-specific categories, and maintain regular posts for max visibility." },
    { title: "No Treatment-Specific Pages", desc: "Practices list all treatments on one page instead of creating dedicated pages for each service.", fix: "We create individual treatment pages each optimised for specific search queries with relevant schema markup." },
    { title: "Neglecting Patient Reviews", desc: "Practices don't actively manage their review pipeline, leaving negative reviews unaddressed.", fix: "We deploy automated review generation and smart response systems that build reputation at scale." },
    { title: "Poor Mobile Booking Experience", desc: "Websites lack easy online booking, forcing patients to call during business hours.", fix: "We integrate seamless online booking, automated reminders, and 24/7 patient self-service portals." },
    { title: "No Local Content Strategy", desc: "Practices fail to create location-specific content that captures local search demand.", fix: "We build location pages, local guides, and community content that dominates local search results." },
  ],
  "business-setup-corporate-services": [
    { title: "Generic Service Pages", desc: "Firms list all services on one page without dedicated optimisation for each offering.", fix: "We create individual service pages with jurisdiction-specific content and buyer-intent optimisation." },
    { title: "Underinvesting in Content", desc: "Corporate service firms rely on referrals and neglect content that builds authority.", fix: "We build comprehensive guides, jurisdiction comparisons, and regulatory explainers that attract inbound leads." },
    { title: "Weak Trust Signals", desc: "Firms don't showcase accreditations, testimonials, or media coverage prominently.", fix: "We design trust signal systems that highlight credentials, client results, and industry recognition." },
    { title: "No Lead Nurture System", desc: "Inquiries receive one-off responses with no structured follow-up for long sales cycles.", fix: "We deploy automated email sequences, content downloads, and consultation booking systems." },
    { title: "Ignoring International SEO", desc: "Firms targeting global clients don't optimise for multi-jurisdiction search.", fix: "We implement hreflang tags, localised content, and region-specific landing pages." },
  ],
  "exhibitions-events": [
    { title: "Late SEO Start", desc: "Event organisers start SEO too late, missing the critical pre-event search window.", fix: "We launch SEO campaigns 6-8 months before events to capture early-bird search demand." },
    { title: "No Evergreen Content", desc: "Events rely entirely on year-specific content that loses value after the event.", fix: "We build evergreen venue guides, speaker series, and industry content that captures year-round traffic." },
    { title: "Poor Speaker SEO", desc: "Speaker names and topics aren't optimised for search, missing high-intent traffic.", fix: "We create speaker-specific pages with bios, session details, and related content optimised for name searches." },
    { title: "Weak Ticket Conversion Flow", desc: "Registration pages have friction, causing drop-off in the booking process.", fix: "We optimise registration flows with early-bird offers, social proof, and seamless checkout." },
    { title: "Neglecting Post-Event SEO", desc: "No content strategy for post-event search demand, missing months of traffic.", fix: "We publish recordings, recaps, and insights content that captures ongoing search interest." },
  ],
  "professional-services": [
    { title: "No Thought Leadership", desc: "Firms fail to publish insights that demonstrate expertise and attract clients.", fix: "We build thought leadership content systems with methodology pieces, industry analysis, and opinion articles." },
    { title: "Generic Value Propositions", desc: "Firms use generic messaging that doesn't differentiate from competitors.", fix: "We develop unique positioning frameworks that highlight specific expertise and proven methodologies." },
    { title: "Poor Case Study Utilisation", desc: "Firms have great results but don't showcase them effectively on their website.", fix: "We design compelling case study pages with metrics, methodology, and client testimonials." },
    { title: "Long Sales Cycle Neglect", desc: "No systematic nurturing of prospects through months-long decision processes.", fix: "We deploy automated nurture sequences with relevant content at each stage of the buying journey." },
    { title: "Weak LinkedIn Presence", desc: "Founders and senior team lack active LinkedIn profiles that build credibility.", fix: "We optimise LinkedIn profiles, create content calendars, and build personal brand authority." },
  ],
  "legal-services": [
    { title: "Practice Area Page Spam", desc: "Firms create thin practice area pages that Google penalises.", fix: "We build comprehensive practice area hubs with unique content, FAQs, and attorney profiles." },
    { title: "Ignoring Local SEO", desc: "Law firms neglect GBP optimisation and local citation consistency.", fix: "We audit and optimise every local listing, ensuring NAP consistency across all legal directories." },
    { title: "No Review Strategy", desc: "Firms don't actively generate client reviews on Google and Avvo.", fix: "We deploy compliant review generation systems with automated requests and response management." },
    { title: "Poor Mobile Experience", desc: "Legal websites are often text-heavy with poor mobile usability.", fix: "We redesign for mobile-first experience with fast load times and intuitive navigation." },
    { title: "No Lead Intake Automation", desc: "Inquiries are handled manually, leading to slow response times.", fix: "We implement AI-powered intake systems that qualify leads and route them to the right attorney instantly." },
  ],
  "cleaning-facilities": [
    { title: "Weak Local SEO Foundation", desc: "Cleaning businesses have incomplete GBP profiles and inconsistent citations.", fix: "We build complete local SEO foundations with optimised GBP, consistent NAP, and service-area pages." },
    { title: "No Service-Specific Pages", desc: "Businesses list all services on one page instead of dedicated landing pages.", fix: "We create individual service pages for each offering, each optimised for local search intent." },
    { title: "Slow Quote Response", desc: "Quote requests take hours or days to get a response.", fix: "We deploy instant quote response automation with SMS and email follow-up sequences." },
    { title: "Neglecting Commercial SEO", desc: "B2B cleaning services aren't optimised for corporate buyer search behaviour.", fix: "We build commercial service pages with case studies, certifications, and procurement-friendly content." },
    { title: "No Seasonal Strategy", desc: "Businesses don't adjust marketing for seasonal demand fluctuations.", fix: "We build seasonal content calendars and campaign playbooks for peak and off-peak periods." },
  ],
  "real-estate": [
    { title: "Poor Property Listing SEO", desc: "Individual property listings aren't optimised for search engines.", fix: "We SEO-optimise every listing with unique descriptions, local schema, and rich media." },
    { title: "No Neighbourhood Content", desc: "Agencies don't create area-specific content that captures local search.", fix: "We build neighbourhood guides, market reports, and local area pages that dominate location search." },
    { title: "Slow Lead Response", desc: "Agent response times to inquiries are too slow, losing leads.", fix: "We deploy instant response automation and automated showing scheduling systems." },
    { title: "Weak Agent Authority", desc: "Individual agents lack personal brand and online presence.", fix: "We build agent profile pages, personal SEO, and local authority signals for each agent." },
    { title: "No Post-Transaction Nurture", desc: "Agencies don't stay in touch with past clients for referrals.", fix: "We implement automated nurture sequences, market update emails, and referral request systems." },
  ],
  "ecommerce": [
    { title: "Thin Product Pages", desc: "Product pages have manufacturer descriptions that add no unique value.", fix: "We rewrite product descriptions with unique content, user-generated reviews, and rich schema." },
    { title: "Category Page Neglect", desc: "Category pages are treated as navigation rather than landing pages.", fix: "We optimise category pages with unique content, buying guides, and strategic internal linking." },
    { title: "Shopping Feed Mismanagement", desc: "Product feeds have errors, missing data, and poor optimisation.", fix: "We manage and optimise shopping feeds with accurate data, competitive pricing, and promotion flags." },
    { title: "Slow Site Speed", desc: "E-commerce sites are bloated with scripts and slow to load.", fix: "We optimise site performance with image compression, code splitting, and CDN implementation." },
    { title: "Weak Post-Purchase Flow", desc: "No follow-up after purchase, missing upsell and retention opportunities.", fix: "We build post-purchase email flows, loyalty programmes, and personalised product recommendations." },
  ],
  "hospitality": [
    { title: "OTA Over-Reliance", desc: "Venues depend too heavily on OTAs, sacrificing direct booking margins.", fix: "We optimise direct booking channels with rate comparison tools and exclusive direct offers." },
    { title: "Poor Photo Quality", desc: "Low-quality photos don't showcase the venue effectively.", fix: "We produce professional photography, virtual tours, and video content that drives bookings." },
    { title: "No Review Management", desc: "Negative reviews go unanswered and review volume is low.", fix: "We deploy automated review response systems and proactive review generation campaigns." },
    { title: "Weak Local SEO", desc: "Venues aren't optimised for local search and Google Maps.", fix: "We optimise GBP, local citations, and location-specific content for maximum local visibility." },
    { title: "Static Website Experience", desc: "Websites don't inspire bookings with immersive content.", fix: "We design dynamic websites with rich media, guest stories, and seamless booking experiences." },
  ],
  "education": [
    { title: "Thin Programme Pages", desc: "Course pages lack depth and don't answer prospect questions.", fix: "We build comprehensive programme pages with curriculum details, outcomes, and student testimonials." },
    { title: "No International SEO", desc: "Institutions don't optimise for international student search.", fix: "We implement multi-language content, hreflang tags, and country-specific landing pages." },
    { title: "Weak Alumni Content", desc: "Success stories and alumni outcomes aren't featured prominently.", fix: "We showcase alumni journeys, career outcomes, and employer partnerships on dedicated pages." },
    { title: "Poor Mobile Application Flow", desc: "Application processes are clunky on mobile devices.", fix: "We redesign mobile-first application flows with progress indicators and document upload." },
    { title: "No Multi-Channel Nurture", desc: "Prospects receive no follow-up between inquiry and enrolment.", fix: "We deploy automated nurture sequences with course information, virtual tour invites, and deadline reminders." },
  ],
  "local-service-businesses": [
    { title: "Unoptimised GBP", desc: "GBP profiles are incomplete, missing categories, services, and photos.", fix: "We fully optimise every GBP field with relevant categories, services, posts, and high-quality photos." },
    { title: "No Review Generation System", desc: "Businesses rely on organic reviews, which are few and far between.", fix: "We deploy automated review request systems via SMS and email that dramatically increase review volume." },
    { title: "Single Service Page", desc: "All services listed on one page, no dedicated landing pages.", fix: "We create individual landing pages for each service, each optimised for specific local search queries." },
    { title: "No Online Booking", desc: "Customers have to call during business hours to book services.", fix: "We implement 24/7 online booking, instant quoting, and automated appointment reminders." },
    { title: "Slow Response to Leads", desc: "Inbound leads wait hours for a response, losing to faster competitors.", fix: "We deploy instant response automation with SMS, email, and call-back scheduling." },
  ],
  "saas-technology": [
    { title: "No Documentation SEO", desc: "SaaS companies don't optimise documentation and knowledge base for search.", fix: "We optimise docs for long-tail search, feature-specific queries, and developer intent." },
    { title: "Weak Feature Pages", desc: "Feature pages are thin and don't address specific use cases.", fix: "We build comprehensive feature pages with use cases, comparisons, and technical specifications." },
    { title: "Ignoring Bottom-of-Funnel", desc: "Content focuses on top-of-funnel, neglecting buying-intent queries.", fix: "We create comparison pages, pricing guides, and implementation content for bottom-of-funnel search." },
    { title: "Poor Trial Conversion", desc: "Free trials don't convert because onboarding isn't optimised.", fix: "We design guided trial experiences with milestone-based emails and in-app messaging." },
    { title: "No Competitor Content", desc: "Companies avoid competitor comparisons, missing high-intent traffic.", fix: "We build objective comparison pages that capture competitor-branded search terms." },
  ],
  "disability-care-services": [
    { title: "Inaccessible Websites", desc: "Care provider websites don't meet WCAG accessibility standards.", fix: "We audit and rebuild for WCAG 2.1 AA compliance with screen reader support and accessible navigation." },
    { title: "No Compassionate Content", desc: "Website copy is clinical rather than empathetic and reassuring.", fix: "We craft compassionate content that speaks to families' emotional needs and concerns." },
    { title: "Weak Local Visibility", desc: "Providers aren't visible in local search when families need them most.", fix: "We build complete local SEO systems with optimised GBP, local citations, and care-type pages." },
    { title: "Poor Trust Signals", desc: "Accreditations, inspections, and testimonials aren't showcased.", fix: "We design prominent trust signal sections with CQC ratings, family testimonials, and staff profiles." },
    { title: "No Enquiry Automation", desc: "Families fill forms but don't get timely follow-up.", fix: "We deploy automated enquiry response with care information packs and consultation booking." },
  ],
};

const industryStats: Record<string, {
  searchVolume: string; cpc: string; competition: number;
  avgConversionRate: number; reviewImpact: number; customerLTV: number;
}> = {
  "dental-healthcare": { searchVolume: "2.4M/month", cpc: "£8.40", competition: 82, avgConversionRate: 4.2, reviewImpact: 87, customerLTV: 4800 },
  "business-setup-corporate-services": { searchVolume: "890K/month", cpc: "£22.50", competition: 72, avgConversionRate: 3.1, reviewImpact: 76, customerLTV: 18500 },
  "exhibitions-events": { searchVolume: "1.1M/month", cpc: "£5.80", competition: 65, avgConversionRate: 5.8, reviewImpact: 62, customerLTV: 8500 },
  "professional-services": { searchVolume: "1.6M/month", cpc: "£15.20", competition: 78, avgConversionRate: 3.5, reviewImpact: 80, customerLTV: 22000 },
  "legal-services": { searchVolume: "3.8M/month", cpc: "£35.00", competition: 92, avgConversionRate: 2.8, reviewImpact: 92, customerLTV: 28000 },
  "cleaning-facilities": { searchVolume: "1.9M/month", cpc: "£4.20", competition: 80, avgConversionRate: 5.5, reviewImpact: 85, customerLTV: 4200 },
  "real-estate": { searchVolume: "5.2M/month", cpc: "£6.80", competition: 88, avgConversionRate: 2.2, reviewImpact: 78, customerLTV: 15000 },
  "ecommerce": { searchVolume: "12.8M/month", cpc: "£1.50", competition: 95, avgConversionRate: 2.8, reviewImpact: 72, customerLTV: 280 },
  "hospitality": { searchVolume: "4.5M/month", cpc: "£3.20", competition: 78, avgConversionRate: 4.5, reviewImpact: 90, customerLTV: 1200 },
  "education": { searchVolume: "2.1M/month", cpc: "£7.50", competition: 75, avgConversionRate: 3.8, reviewImpact: 68, customerLTV: 32000 },
  "local-service-businesses": { searchVolume: "8.6M/month", cpc: "£5.60", competition: 84, avgConversionRate: 6.2, reviewImpact: 88, customerLTV: 1800 },
  "saas-technology": { searchVolume: "4.2M/month", cpc: "£12.80", competition: 92, avgConversionRate: 3.5, reviewImpact: 70, customerLTV: 24000 },
  "disability-care-services": { searchVolume: "680K/month", cpc: "£9.20", competition: 62, avgConversionRate: 4.8, reviewImpact: 84, customerLTV: 28000 },
};

const industryFAQs: Record<string, { q: string; a: string }[]> = {
  "dental-healthcare": [
    { q: "How long does it take to rank a dental practice in local search?", a: "Most practices see meaningful improvement within 60-90 days. GBP optimisation shows results in 2-4 weeks, while content-driven rankings build over 3-6 months." },
    { q: "How important are Google reviews for dental SEO?", a: "Reviews are one of the top 3 local ranking factors. Practices with 50+ reviews and a 4.5+ star rating consistently outrank those with fewer reviews." },
    { q: "Should I have separate pages for each dental treatment?", a: "Absolutely. Each treatment has its own search demand and buyer intent. Dedicated pages for teeth whitening, implants, Invisalign, etc., capture specific patient queries." },
    { q: "How do I compete with large dental groups in my area?", a: "Focus on your unique selling points — same-day appointments, specialist expertise, patient experience. Local content about your community builds relevance." },
    { q: "What's the most effective channel for new patient acquisition?", a: "Local search (GBP + organic) drives the highest quality patients. Google Ads capture urgent needs. A combination with review authority creates the strongest funnel." },
    { q: "Do I need online booking for my dental website?", a: "Increasingly yes. 68% of patients prefer online booking, and practices with online booking see 35% more new patient conversions." },
  ],
  "business-setup-corporate-services": [
    { q: "How long is the typical sales cycle for corporate services?", a: "Most B2B corporate service sales cycles range from 30-90 days depending on service complexity and jurisdiction. Content nurturing shortens this by 25-40%." },
    { q: "What content works best for corporate service SEO?", a: "In-depth jurisdiction guides, regulatory updates, incorporation checklists, and comparison pages perform best." },
    { q: "How do I build trust with prospects who've never heard of us?", a: "Publish thought leadership, showcase accreditations, feature client testimonials, and maintain active LinkedIn profiles." },
    { q: "Should I target international keywords for my corporate service firm?", a: "Yes — if you serve international clients. Multi-language content and jurisdiction-specific landing pages capture significant search demand." },
    { q: "What's the average ROI of SEO for corporate service firms?", a: "Firms typically see 5-10x ROI within 12 months. Average lead value is high (£4,500+), so even a small increase in conversions generates substantial revenue." },
    { q: "How do I compete with established corporate service providers?", a: "Differentiate through specialised content, niche expertise, and superior client experience. Authority builds faster than you think with consistent, high-quality content." },
  ],
  "exhibitions-events": [
    { q: "When should I start SEO for my event?", a: "Start 6-8 months before the event date. This gives Google time to index and rank your event pages before early-bird ticket sales open." },
    { q: "How do I preserve SEO equity between annual events?", a: "Maintain permanent event hub pages with year-specific sections. Redirect old event URLs to the hub and update content annually." },
    { q: "What keywords drive the most ticket sales?", a: "Speaker names, session topics, venue names, and industry-specific queries combined with 'conference' or 'exhibition' have the highest purchase intent." },
    { q: "How do I compete with larger, established events?", a: "Focus on niche differentiation, speaker authority, and attendee experience content. Smaller events can dominate specific topic areas." },
    { q: "Should I run Google Ads for my event?", a: "Yes — paid search is highly effective for time-limited events. Target speaker names, competitor events, and high-intent queries with strong ad copy." },
    { q: "What post-event content should I create?", a: "Session recordings, attendee interviews, key takeaways, photo galleries, and industry trend reports capture ongoing search demand between events." },
  ],
  "professional-services": [
    { q: "How do I differentiate my professional services firm online?", a: "Through methodology content — publish how you solve problems differently. Case studies with real metrics and client testimonials provide social proof." },
    { q: "What's the most effective way to generate leads?", a: "A combination of SEO for organic visibility, thought leadership content for authority, and automated nurture for converting inquiries over long sales cycles." },
    { q: "How important is LinkedIn for professional services?", a: "LinkedIn is critical — 78% of B2B buyers use it in their purchase process. Optimised profiles and regular content sharing amplify reach." },
    { q: "Should I publish pricing on my website?", a: "Transparency builds trust. While not all firms share exact pricing, guide prices, ROI calculators, and investment ranges help qualify leads." },
    { q: "How long does it take to see ROI from professional services SEO?", a: "Most firms see meaningful results in 4-6 months. Full ROI typically arrives within 8-12 months given the long sales cycles." },
    { q: "What metrics matter most for professional services marketing?", a: "Lead quality score, consultation booking rate, average project value, and channel-attributed revenue matter more than traffic volume." },
  ],
  "legal-services": [
    { q: "How competitive is legal SEO in 2026?", a: "Extremely — it's one of the most competitive verticals. Practice-area specific SEO with strong EEAT signals is essential." },
    { q: "What's the most important ranking factor for law firms?", a: "EEAT — Experience, Expertise, Authoritativeness, Trustworthiness. Google rigorously evaluates legal content for accuracy and authority." },
    { q: "How do I get more client reviews without violating ethics rules?", a: "Use neutral review request systems that don't incentivise or solicit positive reviews. Automated timing increases volume ethically." },
    { q: "Should I target every practice area equally?", a: "No — focus on your highest-value practice areas first. Build deep authority in 2-3 areas before expanding." },
    { q: "How do I compete with large law firms for search rankings?", a: "Specialise in niche practice areas, create comprehensive content hubs, build local authority, and leverage attorney personal brands." },
    { q: "What's the CPC for legal keywords?", a: "Very high — £35-80+ per click for personal injury, family law, and criminal defence. SEO is critical to reduce dependency on expensive paid search." },
  ],
  "cleaning-facilities": [
    { q: "How do I rank higher than competitors in local cleaning search?", a: "Optimise your GBP completely, build consistent citations across 50+ directories, generate regular reviews, and create service-specific landing pages." },
    { q: "What's the best way to get more commercial cleaning contracts?", a: "Create dedicated B2B pages with case studies, certifications, and procurement-friendly content. Target facility manager search queries." },
    { q: "How fast should I respond to quote requests?", a: "Within 5 minutes ideally, 30 minutes maximum. Speed of response is the #1 factor in quote conversion." },
    { q: "Should I run Google Ads for my cleaning business?", a: "Yes — local service ads and search ads capture high-intent customers. Target service-area keywords with ad schedules." },
    { q: "How do reviews impact my cleaning business rankings?", a: "Reviews are the #2 local ranking factor after GBP optimisation. Businesses with 30+ reviews and 4.5+ stars dominate local packs." },
    { q: "What's the best way to handle seasonal demand fluctuations?", a: "Build a seasonal content and ad strategy — increase spend during peak seasons, run retention campaigns during off-peak periods." },
  ],
  "real-estate": [
    { q: "How do I rank for neighbourhood-specific searches?", a: "Create dedicated neighbourhood pages with unique content, local information, property types, and area guides." },
    { q: "What's the most effective way to generate buyer leads?", a: "Property listing SEO, neighbourhood content, and mortgage calculator tools attract buyer traffic. Instant response automation captures them." },
    { q: "How important are Google reviews for estate agents?", a: "Very — 73% of sellers research agents online before engaging. Review volume, rating, and recency directly impact trust and choice." },
    { q: "Should I optimise individual property listings for SEO?", a: "Yes — each listing is a potential landing page. Unique descriptions, local schema, and high-quality images improve both search visibility and UX." },
    { q: "How do I compete with online-only agents?", a: "Emphasise your local knowledge, personal service, and track record. Content that showcases market expertise builds trust." },
    { q: "What's the average lead value for real estate SEO?", a: "Buyer leads average £6,200 in commission value. Even a small increase in lead volume generates significant revenue." },
  ],
  "ecommerce": [
    { q: "How do I optimise thousands of product pages without burning out?", a: "Use templates with unique variables, AI-generated descriptions with human review, and focus on your top 20% of products by traffic potential." },
    { q: "What's more important — product page or category page SEO?", a: "Both matter, but category pages often drive more aggregate traffic. Optimise category pages as hub content with buying guides." },
    { q: "How do I compete with Amazon for product search?", a: "Focus on long-tail product queries, unique products, brand building, and content-driven commerce." },
    { q: "Should I use Google Shopping or standard search ads?", a: "Both — Shopping ads capture product-intent traffic with visual results, while search ads capture broader queries." },
    { q: "How does site speed impact e-commerce SEO and conversion?", a: "A 1-second delay reduces conversions by 7%. Core Web Vitals are ranking factors. Speed optimisation directly impacts both visibility and revenue." },
    { q: "What's the best post-purchase email strategy?", a: "Order confirmation to shipping update to delivery feedback to product care to replenishment reminder to loyalty programme. Automated flows drive 30%+ of repeat revenue." },
  ],
  "hospitality": [
    { q: "How do I get more direct bookings instead of OTA bookings?", a: "Optimise direct booking with rate parity guarantees, exclusive perks, loyalty programmes, and seamless booking experience." },
    { q: "What's the most important factor for hotel SEO?", a: "Local search visibility — GBP optimisation, local citations, location pages, and review management." },
    { q: "How do reviews affect my hotel's booking rate?", a: "Directly — 81% of travellers read reviews before booking. A 1-star increase can boost revenue by 9%." },
    { q: "Should I create content about my local area?", a: "Yes — local area guides, attraction pages, and neighbourhood content capture planning-stage search traffic." },
    { q: "How do I improve my restaurant's local search presence?", a: "GBP optimisation, menu pages, photo galleries, review management, and local food blog outreach." },
    { q: "What's the best photo strategy for hospitality websites?", a: "Professional photography of rooms, facilities, and food. Virtual tours and guest-generated content build trust." },
  ],
  "education": [
    { q: "How do I rank for competitive course keywords?", a: "Build comprehensive programme pages with curriculum details, faculty profiles, student outcomes, and accreditation information." },
    { q: "What's the best way to attract international students?", a: "Multi-language content, country-specific landing pages, visa information, and international student testimonials." },
    { q: "How important is page speed for education websites?", a: "Critical — especially for mobile users researching on phones. 53% of education site visits are on mobile." },
    { q: "Should I create separate pages for online vs on-campus programmes?", a: "Yes — they serve different audiences with different search intent. Each modality needs its own optimised pages." },
    { q: "How do I nurture prospects from inquiry to enrolment?", a: "Automated email sequences with course info, virtual tour invites, alumni stories, financial aid guidance, and deadline reminders." },
    { q: "What role do alumni stories play in education marketing?", a: "Major role — alumni success stories are powerful social proof. Feature diverse alumni journeys with career outcomes." },
  ],
  "local-service-businesses": [
    { q: "What's the single most important thing for local service SEO?", a: "Google Business Profile — it's the foundation of local search. Complete every field, choose the right categories, and respond to reviews." },
    { q: "How quickly can I improve my local search rankings?", a: "GBP improvements show results in 2-4 weeks. Citation consistency and review generation build over 1-3 months." },
    { q: "How many Google reviews do I need to rank well?", a: "30+ reviews is the threshold for strong local pack presence. 50+ reviews with 4.5+ stars gives you a significant advantage." },
    { q: "Should I create separate pages for each service I offer?", a: "Yes — each service has unique search queries. Dedicated pages optimised for 'service + location' dramatically increase keyword footprint." },
    { q: "How do I compete with bigger companies in my area?", a: "Focus on service quality, response speed, and local community presence. Local content and genuine reviews build trust." },
    { q: "What's the best way to get more online bookings?", a: "Make booking frictionless — one-click booking, instant quotes, availability calendars, and automated confirmations." },
  ],
  "saas-technology": [
    { q: "What's the most effective growth channel for B2B SaaS?", a: "SEO + content marketing combined with product-led growth. Technical content captures developer and decision-maker search intent." },
    { q: "How do I compete with established SaaS brands for keywords?", a: "Target long-tail, feature-specific, and comparison keywords. Build comprehensive documentation SEO that larger competitors neglect." },
    { q: "Should I create comparison pages against competitors?", a: "Absolutely — comparison pages capture high-intent search traffic from prospects evaluating alternatives." },
    { q: "What's the ideal trial-to-paid conversion rate?", a: "Industry average is 15-25%. Top-performing SaaS products achieve 30-40% through guided onboarding and milestone emails." },
    { q: "How important is documentation SEO for SaaS?", a: "Very — documentation pages dominate long-tail search for feature-specific queries. Optimised docs can drive 30%+ of total organic traffic." },
    { q: "What's the best way to generate qualified demo requests?", a: "Bottom-of-funnel content (comparisons, pricing guides, case studies) plus targeted paid search plus automated lead scoring." },
  ],
  "disability-care-services": [
    { q: "What's the most important aspect of care service SEO?", a: "Local visibility — families search for care services in their area. GBP optimisation, local citations, and care-type-specific landing pages are essential." },
    { q: "How do I build trust with families searching for care?", a: "Showcase CQC ratings, inspection reports, family testimonials, staff qualifications, and transparent pricing." },
    { q: "Does website accessibility affect my SEO?", a: "Yes — Google rewards accessible websites with better rankings. WCAG compliance improves user experience and signals quality to search engines." },
    { q: "What content do families find most helpful when choosing care?", a: "Care type guides, cost breakdowns, funding information, day-in-the-life content, and FAQ sections." },
    { q: "How do I handle the emotional nature of care marketing?", a: "Use empathetic, reassuring language. Focus on outcomes and quality of life. Feature real stories that demonstrate the difference your care makes." },
    { q: "What's the best way to automate care enquiries?", a: "Automated response with care information pack, eligibility checker, virtual tour scheduling, and consultation booking." },
  ],
};

const industryGrowthSystems: Record<string, { step: string; title: string; desc: string }[]> = {
  "dental-healthcare": [
    { step: "01", title: "Local Audit", desc: "Analyse GBP presence, citation accuracy, review profile, and competitor landscape across all practice locations." },
    { step: "02", title: "Patient Journey", desc: "Map the full patient journey from symptoms search to booking to follow-up, identifying digital touchpoints." },
    { step: "03", title: "Content System", desc: "Build treatment-specific landing pages, patient education content, and local community pages." },
    { step: "04", title: "Reputation Engine", desc: "Deploy automated review generation pipeline and smart response system for patient feedback." },
    { step: "05", title: "Booking Flow", desc: "Integrate online booking, automated reminders, digital intake forms, and patient portal." },
  ],
  "business-setup-corporate-services": [
    { step: "01", title: "Service Architecture", desc: "Map every service offering to search intent, buyer persona, and journey stage for maximum coverage." },
    { step: "02", title: "Authority Content", desc: "Build in-depth guides, jurisdiction comparisons, regulatory explainers, and thought leadership." },
    { step: "03", title: "Trust Signals", desc: "Deploy client testimonials, case studies, accreditations, media coverage, and team profiles." },
    { step: "04", title: "Lead Nurture", desc: "Design automated email sequences, content downloads, consultation booking, and CRM integration." },
    { step: "05", title: "Referral Amplification", desc: "Build partner network SEO, referral landing pages, client advocacy programme, and affiliate tracking." },
  ],
  "exhibitions-events": [
    { step: "01", title: "Event Foundation", desc: "Build event-specific SEO architecture with venue pages, speaker content, and session descriptions." },
    { step: "02", title: "Demand Capture", desc: "Target attendee search queries, speaker names, competitor events, and industry-specific terms." },
    { step: "03", title: "Ticket Conversion", desc: "Optimise registration flow with early-bird offers, social proof, and seamless checkout experience." },
    { step: "04", title: "Live Amplification", desc: "Deploy real-time content, social media amplification, and media outreach during the event." },
    { step: "05", title: "Post-Event Equity", desc: "Capture ongoing search demand with recordings, recaps, key takeaways, and evergreen content." },
  ],
  "professional-services": [
    { step: "01", title: "Expertise Map", desc: "Map every service line, sector specialism, and client persona to search intent and content needs." },
    { step: "02", title: "Thought Leadership", desc: "Build authoritative content showcasing methodology, insights, proprietary research, and results." },
    { step: "03", title: "Digital PR", desc: "Position founders and senior team as industry voices across media, podcasts, and events." },
    { step: "04", title: "Client Acquisition", desc: "Design multi-channel nurture, case study library, and seamless consultation booking system." },
    { step: "05", title: "Referral System", desc: "Systematise referral generation, partner co-marketing, client advocacy, and testimonial collection." },
  ],
  "legal-services": [
    { step: "01", title: "Practice Area Map", desc: "Identify highest-value practice areas and map search demand by jurisdiction and competition level." },
    { step: "02", title: "Authority Foundation", desc: "Build practice-area hubs, thought leadership content, attorney profiles, and directory listings." },
    { step: "03", title: "Digital PR Engine", desc: "Create newsworthy legal insights, media relationships, and strategic citation building." },
    { step: "04", title: "Review System", desc: "Generate client reviews across Google, Yelp, and Avvo while maintaining ethical compliance." },
    { step: "05", title: "Intake Automation", desc: "Deploy AI lead qualification, automated follow-up, and case management system integration." },
  ],
  "cleaning-facilities": [
    { step: "01", title: "Local Dominance", desc: "Optimise GBP, build consistent citations, and create service-area landing pages for every location." },
    { step: "02", title: "Review Pipeline", desc: "Deploy automated review requests, smart response templates, and multi-platform reputation monitoring." },
    { step: "03", title: "Quote Conversion", desc: "Streamline quote requests with instant response automation and structured follow-up sequences." },
    { step: "04", title: "Service Pages", desc: "Build dedicated pages for every service type, each optimised for local search and commercial intent." },
    { step: "05", title: "Contract Retention", desc: "Implement account management portal, renewal automation, and upsell campaign systems." },
  ],
  "real-estate": [
    { step: "01", title: "Market Intelligence", desc: "Analyse local market conditions, competitor presence, search demand, and pricing trends." },
    { step: "02", title: "Local SEO", desc: "Optimise GBP, neighbourhood pages, agent profiles, and local citations for every target area." },
    { step: "03", title: "Listing Optimisation", desc: "SEO-optimise every property listing with unique descriptions, local schema, and rich media." },
    { step: "04", title: "Lead Response", desc: "Deploy instant response automation, automated showing scheduling, and lead scoring system." },
    { step: "05", title: "Market Authority", desc: "Build neighbourhood content hubs, market reports, and agent authority pages that dominate local search." },
  ],
  "ecommerce": [
    { step: "01", title: "Product Taxonomy", desc: "Audit information architecture, category structure, and product page hierarchy for crawl efficiency." },
    { step: "02", title: "Scale Optimisation", desc: "Optimise product pages, category pages, and filter combinations at scale with templated approaches." },
    { step: "03", title: "Feed Management", desc: "Build and optimise shopping feeds across Google, Meta, and comparison shopping engines." },
    { step: "04", title: "Conversion Architecture", desc: "Optimise product pages, checkout flow, cart abandonment recovery, and cross-sell systems." },
    { step: "05", title: "Seasonal Playbook", desc: "Build year-round content calendar, promotional strategy, and peak readiness plan." },
  ],
  "hospitality": [
    { step: "01", title: "Local Foundations", desc: "Optimise GBP, OTA profiles, and direct booking pages for maximum local search visibility." },
    { step: "02", title: "Review Management", desc: "Build systematic review generation, smart response templates, and sentiment analysis dashboards." },
    { step: "03", title: "Direct Booking", desc: "Optimise website conversion, rate comparison pages, and exclusive direct booking incentives." },
    { step: "04", title: "Visual Content", desc: "Produce professional photography, virtual tours, and guest experience content that drives bookings." },
    { step: "05", title: "Seasonal Strategy", desc: "Build year-round content calendar, promotional planning, and demand forecasting system." },
  ],
  "education": [
    { step: "01", title: "Programme Mapping", desc: "Map every course, programme, and qualification to search demand, competition, and buyer intent." },
    { step: "02", title: "Content Authority", desc: "Build programme pages, faculty profiles, student outcomes, accreditation content, and virtual tours." },
    { step: "03", title: "International Search", desc: "Optimise for international student queries with multi-language content, visa pages, and country landers." },
    { step: "04", title: "Enrolment Flow", desc: "Design application journey, prospect nurturing, and enrolment automation with milestone tracking." },
    { step: "05", title: "Alumni Network", desc: "Leverage alumni success stories, referral programmes, employer partnerships, and donor engagement." },
  ],
  "local-service-businesses": [
    { step: "01", title: "GBP Optimisation", desc: "Full Google Business Profile optimisation — categories, services, posts, photos, and Q&A management." },
    { step: "02", title: "Citation Build", desc: "Build consistent NAP citations across all relevant local directories, platforms, and industry sites." },
    { step: "03", title: "Review Engine", desc: "Deploy automated review generation via SMS and email, smart response system, and reputation analytics." },
    { step: "04", title: "Service Landing Pages", desc: "Create dedicated landing pages for every service, location, and customer segment, each SEO-optimised." },
    { step: "05", title: "Booking Automation", desc: "Implement online booking, instant quoting, automated reminders, and follow-up sequences." },
  ],
  "saas-technology": [
    { step: "01", title: "Product-Market-SEO", desc: "Map every feature, use case, integration, and competitor to detailed search demand analysis." },
    { step: "02", title: "Technical Foundation", desc: "Audit site architecture, crawl efficiency, indexation coverage, Core Web Vitals, and structured data." },
    { step: "03", title: "Content Cluster", desc: "Build topic clusters, documentation SEO, comparison pages, implementation guides, and case studies." },
    { step: "04", title: "Conversion System", desc: "Optimise trial-to-paid funnel, demo booking, lead scoring, and content personalisation engine." },
    { step: "05", title: "Scale & Defend", desc: "Expand into adjacent keywords, defend branded search, automate content production, and monitor competitors." },
  ],
  "disability-care-services": [
    { step: "01", title: "Compassionate SEO", desc: "Build local visibility with sensitivity to the emotional nature of care decisions and family needs." },
    { step: "02", title: "Accessibility First", desc: "Ensure every digital touchpoint meets WCAG 2.1 AA standards with inclusive design principles." },
    { step: "03", title: "Trust Building", desc: "Showcase CQC ratings, caregiver profiles, family testimonials, and regulatory compliance prominently." },
    { step: "04", title: "Family Journey", desc: "Map and optimise the family decision journey from research to care engagement with empathetic content." },
    { step: "05", title: "Care Automation", desc: "Deploy online enquiry, eligibility checker, digital intake forms, and care coordination platform." },
  ],
};

const industryOpportunities: Record<string, { label: string; value: string; suffix: string; desc: string }[]> = {
  "dental-healthcare": [
    { label: "Untapped Search Demand", value: "2.8M", suffix: "/year", desc: "Monthly searches for dental treatments going to competitors" },
    { label: "Revenue Lost to Competitors", value: "£340K", suffix: "/year", desc: "Average revenue lost per practice to better-ranked competitors" },
    { label: "Automation Savings", value: "42h", suffix: "/month", desc: "Hours saved through automated booking and reminders" },
    { label: "Lead Conversion Improvement", value: "68%", suffix: "", desc: "Potential increase from better digital patient experience" },
  ],
  "business-setup-corporate-services": [
    { label: "Untapped Search Demand", value: "1.2M", suffix: "/year", desc: "Corporate service searches not being captured" },
    { label: "Revenue Lost to Competitors", value: "£520K", suffix: "/year", desc: "Average revenue lost to competitors with better SEO" },
    { label: "Automation Savings", value: "38h", suffix: "/month", desc: "Hours saved through automated lead nurture" },
    { label: "Lead Conversion Improvement", value: "45%", suffix: "", desc: "Potential increase from structured nurture sequences" },
  ],
  "exhibitions-events": [
    { label: "Untapped Search Demand", value: "1.8M", suffix: "/year", desc: "Event-related searches untapped by organisers" },
    { label: "Revenue Lost to Competitors", value: "£280K", suffix: "/year", desc: "Ticket revenue lost to competing events with better SEO" },
    { label: "Automation Savings", value: "25h", suffix: "/month", desc: "Hours saved through automated attendee communication" },
    { label: "Lead Conversion Improvement", value: "52%", suffix: "", desc: "Potential increase from optimised registration flow" },
  ],
  "professional-services": [
    { label: "Untapped Search Demand", value: "2.4M", suffix: "/year", desc: "Professional service searches not being captured" },
    { label: "Revenue Lost to Competitors", value: "£480K", suffix: "/year", desc: "Revenue lost to competitors with stronger digital authority" },
    { label: "Automation Savings", value: "35h", suffix: "/month", desc: "Hours saved through automated proposal and follow-up" },
    { label: "Lead Conversion Improvement", value: "55%", suffix: "", desc: "Potential increase from structured nurture programmes" },
  ],
  "legal-services": [
    { label: "Untapped Search Demand", value: "4.2M", suffix: "/year", desc: "Legal searches not being captured by your firm" },
    { label: "Revenue Lost to Competitors", value: "£680K", suffix: "/year", desc: "Revenue lost to competitor firms with better rankings" },
    { label: "Automation Savings", value: "30h", suffix: "/month", desc: "Hours saved through AI-powered intake automation" },
    { label: "Lead Conversion Improvement", value: "72%", suffix: "", desc: "Potential increase from faster, automated response" },
  ],
  "cleaning-facilities": [
    { label: "Untapped Search Demand", value: "3.2M", suffix: "/year", desc: "Cleaning service searches going to competitors" },
    { label: "Revenue Lost to Competitors", value: "£180K", suffix: "/year", desc: "Revenue lost to better-ranked local competitors" },
    { label: "Automation Savings", value: "45h", suffix: "/month", desc: "Hours saved through automated quoting and scheduling" },
    { label: "Lead Conversion Improvement", value: "75%", suffix: "", desc: "Potential increase from instant quote response" },
  ],
  "real-estate": [
    { label: "Untapped Search Demand", value: "6.8M", suffix: "/year", desc: "Property searches not being captured by your agency" },
    { label: "Revenue Lost to Competitors", value: "£420K", suffix: "/year", desc: "Commission lost to agencies with better local presence" },
    { label: "Automation Savings", value: "28h", suffix: "/month", desc: "Hours saved through automated lead response" },
    { label: "Lead Conversion Improvement", value: "62%", suffix: "", desc: "Potential increase from instant showing scheduling" },
  ],
  "ecommerce": [
    { label: "Untapped Search Demand", value: "18.5M", suffix: "/year", desc: "Product searches not being captured by your store" },
    { label: "Revenue Lost to Competitors", value: "£920K", suffix: "/year", desc: "Revenue lost to competitor product pages outranking yours" },
    { label: "Automation Savings", value: "55h", suffix: "/month", desc: "Hours saved through automated feed management" },
    { label: "Lead Conversion Improvement", value: "48%", suffix: "", desc: "Potential increase from checkout optimisation" },
  ],
  "hospitality": [
    { label: "Untapped Search Demand", value: "5.8M", suffix: "/year", desc: "Hospitality searches not being captured by your venue" },
    { label: "Revenue Lost to Competitors", value: "£360K", suffix: "/year", desc: "Revenue lost to better-reviewed competitors" },
    { label: "Automation Savings", value: "32h", suffix: "/month", desc: "Hours saved through automated booking management" },
    { label: "Lead Conversion Improvement", value: "58%", suffix: "", desc: "Potential increase from direct booking optimisation" },
  ],
  "education": [
    { label: "Untapped Search Demand", value: "3.4M", suffix: "/year", desc: "Course and programme searches not being captured" },
    { label: "Revenue Lost to Competitors", value: "£560K", suffix: "/year", desc: "Revenue lost to competing institutions with better SEO" },
    { label: "Automation Savings", value: "40h", suffix: "/month", desc: "Hours saved through automated enrolment processing" },
    { label: "Lead Conversion Improvement", value: "50%", suffix: "", desc: "Potential increase from improved nurture sequences" },
  ],
  "local-service-businesses": [
    { label: "Untapped Search Demand", value: "12.4M", suffix: "/year", desc: "Local service searches not being captured" },
    { label: "Revenue Lost to Competitors", value: "£150K", suffix: "/year", desc: "Revenue lost to competitors appearing in local pack" },
    { label: "Automation Savings", value: "48h", suffix: "/month", desc: "Hours saved through automated booking and quoting" },
    { label: "Lead Conversion Improvement", value: "80%", suffix: "", desc: "Potential increase from instant online response" },
  ],
  "saas-technology": [
    { label: "Untapped Search Demand", value: "5.6M", suffix: "/year", desc: "SaaS feature and solution searches not captured" },
    { label: "Revenue Lost to Competitors", value: "£780K", suffix: "/year", desc: "Revenue lost to competitors owning category search" },
    { label: "Automation Savings", value: "50h", suffix: "/month", desc: "Hours saved through automated demo and trial systems" },
    { label: "Lead Conversion Improvement", value: "42%", suffix: "", desc: "Potential increase from optimised trial-to-paid flow" },
  ],
  "disability-care-services": [
    { label: "Untapped Search Demand", value: "980K", suffix: "/year", desc: "Care service searches not being captured" },
    { label: "Revenue Lost to Competitors", value: "£290K", suffix: "/year", desc: "Revenue lost to competitors with better local presence" },
    { label: "Automation Savings", value: "36h", suffix: "/month", desc: "Hours saved through automated enquiry response" },
    { label: "Lead Conversion Improvement", value: "60%", suffix: "", desc: "Potential increase from faster family follow-up" },
  ],
};

const industryResources: Record<string, { title: string; tag: string; readTime: string; excerpt: string }[]> = {
  "dental-healthcare": [
    { title: "The Complete Guide to Dental SEO in 2026", tag: "Healthcare SEO", readTime: "8 min", excerpt: "Everything your dental practice needs to dominate local search and attract more patients online." },
    { title: "How AI is Transforming Patient Acquisition", tag: "AI in Healthcare", readTime: "6 min", excerpt: "From automated booking to AI-powered patient matching — the future of dental marketing." },
    { title: "Review Generation Strategies for Medical Practices", tag: "Reputation Management", readTime: "5 min", excerpt: "Build a systematic review pipeline that boosts your local rankings and patient trust." },
    { title: "Multi-Location SEO for Healthcare Groups", tag: "Local SEO", readTime: "7 min", excerpt: "Scale your online presence across every practice location with consistent local visibility." },
  ],
  "business-setup-corporate-services": [
    { title: "Corporate Services SEO: A Complete Strategy Guide", tag: "B2B SEO", readTime: "9 min", excerpt: "How corporate service firms can dominate search for high-value business service queries." },
    { title: "Thought Leadership That Generates Leads", tag: "Content Strategy", readTime: "6 min", excerpt: "Build authority content that attracts and converts corporate decision-makers." },
    { title: "Jurisdiction-Specific SEO for Global Firms", tag: "International SEO", readTime: "7 min", excerpt: "Optimise for multiple jurisdictions with targeted content and technical SEO." },
    { title: "Automating B2B Lead Nurture for Long Sales Cycles", tag: "Automation", readTime: "5 min", excerpt: "Keep prospects engaged through months-long decision processes with automated nurture." },
  ],
  "exhibitions-events": [
    { title: "Event SEO: The 6-Month Countdown to Sold Out", tag: "Event Marketing", readTime: "7 min", excerpt: "A phased SEO strategy that drives ticket sales from early-bird to last-minute." },
    { title: "Post-Event Content That Keeps Delivering Traffic", tag: "Content Strategy", readTime: "5 min", excerpt: "Turn your event into a year-round content asset that captures ongoing search demand." },
    { title: "Speaker SEO: Capturing High-Intent Attendee Traffic", tag: "SEO Strategy", readTime: "4 min", excerpt: "Optimise speaker pages and session content to capture name-based search traffic." },
    { title: "Paid Media Strategies for Time-Limited Events", tag: "Paid Media", readTime: "6 min", excerpt: "Run profitable ad campaigns that fill seats without wasting budget." },
  ],
  "professional-services": [
    { title: "Professional Services Marketing in 2026", tag: "Professional Services", readTime: "8 min", excerpt: "How consultants, accountants, and advisory firms win clients through digital authority." },
    { title: "The Power of Methodology Content", tag: "Content Strategy", readTime: "5 min", excerpt: "Why publishing your methodology builds more trust than any other type of content." },
    { title: "LinkedIn Authority Building for Professionals", tag: "Personal Branding", readTime: "4 min", excerpt: "Turn your team's LinkedIn profiles into a client acquisition engine." },
    { title: "Case Studies That Close Deals", tag: "Sales Enablement", readTime: "6 min", excerpt: "Structure your case studies to address buyer objections and accelerate decisions." },
  ],
  "legal-services": [
    { title: "Legal SEO in 2026: What Works Now", tag: "Legal Marketing", readTime: "9 min", excerpt: "Practice-area SEO is more competitive than ever. Our playbook for dominating legal search." },
    { title: "EEAT for Law Firms: Building Topical Authority", tag: "SEO Strategy", readTime: "7 min", excerpt: "Google's Experience, Expertise, Authority, and Trust standards for legal content." },
    { title: "Digital PR for Law Firms: Getting Cited as an Authority", tag: "Digital PR", readTime: "6 min", excerpt: "How law firms can earn media citations that boost both rankings and credibility." },
    { title: "AI in Legal Intake: Automating Client Qualification", tag: "AI & Automation", readTime: "5 min", excerpt: "Deploy AI systems that qualify leads and route them to the right attorney instantly." },
  ],
  "cleaning-facilities": [
    { title: "Local SEO for Cleaning Businesses: Complete Guide", tag: "Local SEO", readTime: "7 min", excerpt: "Dominate local search for cleaning services with GBP optimisation and citation building." },
    { title: "From Quote to Contract: Automating Sales for Cleaners", tag: "Automation", readTime: "5 min", excerpt: "Streamline your quote-to-booking process with instant response automation." },
    { title: "Commercial Cleaning Marketing: Winning B2B Contracts", tag: "B2B Marketing", readTime: "6 min", excerpt: "Build a marketing system that attracts facility managers and corporate decision-makers." },
    { title: "Review Generation for Service Businesses", tag: "Reputation Management", readTime: "4 min", excerpt: "Build a systematic review pipeline that boosts your local rankings and trust." },
  ],
  "real-estate": [
    { title: "Real Estate SEO: Dominate Local Property Search", tag: "Real Estate", readTime: "8 min", excerpt: "How agents and agencies can own their local market through comprehensive SEO." },
    { title: "Neighbourhood Content: The Key to Local Real Estate Search", tag: "Content Strategy", readTime: "6 min", excerpt: "Build neighbourhood guides and area content that capture location-specific search traffic." },
    { title: "Lead Response Speed: The #1 Factor in Real Estate Conversion", tag: "Sales", readTime: "4 min", excerpt: "Why instant response automation is the most important investment for estate agents." },
    { title: "Property Listing SEO: Optimising Every Listing for Search", tag: "SEO", readTime: "5 min", excerpt: "Turn every property listing into a search-optimised landing page." },
  ],
  "ecommerce": [
    { title: "E-commerce SEO at Scale: 10,000+ Product Pages", tag: "E-commerce", readTime: "8 min", excerpt: "How we optimise product pages at scale without sacrificing quality or burning out teams." },
    { title: "Shopping Feed Optimisation: The Complete Guide", tag: "Paid Media", readTime: "6 min", excerpt: "Optimise your product feeds across Google, Meta, and comparison engines for maximum ROAS." },
    { title: "Category Page SEO: The Most Overlooked Opportunity", tag: "SEO Strategy", readTime: "5 min", excerpt: "Turn your category pages into powerful landing pages that drive organic traffic." },
    { title: "Post-Purchase Email Flows That Drive Repeat Revenue", tag: "Email Marketing", readTime: "4 min", excerpt: "Build automated post-purchase sequences that increase customer lifetime value." },
  ],
  "hospitality": [
    { title: "Hotel SEO: Driving Direct Bookings in 2026", tag: "Hospitality", readTime: "7 min", excerpt: "Reduce OTA dependency and drive direct bookings through comprehensive SEO strategy." },
    { title: "The Impact of Reviews on Hospitality Revenue", tag: "Reputation Management", readTime: "5 min", excerpt: "How review volume, rating, and recency directly impact your booking rate and pricing power." },
    { title: "Visual Content Strategy for Hospitality Brands", tag: "Content Strategy", readTime: "6 min", excerpt: "Professional photography, virtual tours, and video content that drives bookings." },
    { title: "Local Search for Restaurants: A Complete Guide", tag: "Local SEO", readTime: "5 min", excerpt: "Dominate local restaurant search with GBP optimisation and local content." },
  ],
  "education": [
    { title: "Education SEO: Attracting Students in 2026", tag: "Education Marketing", readTime: "8 min", excerpt: "Comprehensive SEO strategy for schools, universities, and training providers." },
    { title: "International Student Recruitment Through SEO", tag: "International Marketing", readTime: "7 min", excerpt: "Multi-language SEO strategies that attract students from key international markets." },
    { title: "Programme Page Optimisation That Drives Applications", tag: "Content Strategy", readTime: "5 min", excerpt: "Build programme pages that answer prospect questions and drive enrolment." },
    { title: "Automating the Student Enrolment Journey", tag: "Automation", readTime: "4 min", excerpt: "From inquiry to enrolment — build automated nurture sequences that convert prospects." },
  ],
  "local-service-businesses": [
    { title: "Local SEO for Service Businesses: The Playbook", tag: "Local SEO", readTime: "7 min", excerpt: "Complete guide to dominating local search for plumbers, electricians, and tradespeople." },
    { title: "Google Business Profile Optimisation Guide", tag: "GBP", readTime: "5 min", excerpt: "Every field, setting, and feature you need to optimise for maximum local visibility." },
    { title: "Automating Your Service Business: Quotes to Bookings", tag: "Automation", readTime: "6 min", excerpt: "Build an automated system that handles quotes, scheduling, and follow-up." },
    { title: "The Review Engine: Building a Systematic Review Pipeline", tag: "Reputation", readTime: "4 min", excerpt: "Generate more Google reviews automatically with SMS and email request systems." },
  ],
  "saas-technology": [
    { title: "SaaS SEO: The Growth Playbook for 2026", tag: "SaaS Growth", readTime: "9 min", excerpt: "How B2B and B2C SaaS companies can own their category through technical SEO and content." },
    { title: "Documentation SEO: Your Most Underrated Growth Channel", tag: "SEO Strategy", readTime: "6 min", excerpt: "Optimise your documentation and knowledge base for long-tail search dominance." },
    { title: "Comparison Pages That Convert", tag: "Content Strategy", readTime: "5 min", excerpt: "Build objective comparison pages that capture high-intent competitor search traffic." },
    { title: "PLG + SEO: Product-Led Growth Meets Search", tag: "Growth Strategy", readTime: "7 min", excerpt: "Combine product-led growth with SEO for a compounding customer acquisition engine." },
  ],
  "disability-care-services": [
    { title: "Care Provider SEO: Connecting Families With Support", tag: "Healthcare SEO", readTime: "7 min", excerpt: "Build local visibility that helps families find the care they need when they need it most." },
    { title: "Accessible Web Design for Care Providers", tag: "Accessibility", readTime: "6 min", excerpt: "WCAG compliance isn't just regulation — it's a competitive advantage in care services." },
    { title: "Compassionate Content Marketing for Care Services", tag: "Content Strategy", readTime: "5 min", excerpt: "Create content that speaks to families with empathy, authority, and reassurance." },
    { title: "Building Trust Through Transparency in Care Marketing", tag: "Trust", readTime: "4 min", excerpt: "How showcasing CQC ratings, staff profiles, and testimonials builds family confidence." },
  ],
};

const industryToCaseStudyMap: Record<string, string[]> = {
  "dental-healthcare": ["Healthcare", "Life Sciences"],
  "business-setup-corporate-services": ["Fintech", "Corporate"],
  "exhibitions-events": ["Events", "Media"],
  "professional-services": ["Professional Services", "Consulting"],
  "legal-services": ["Legal", "Law"],
  "cleaning-facilities": ["Cleaning", "Facilities"],
  "real-estate": ["Real Estate"],
  "ecommerce": ["E-Commerce", "Ecommerce"],
  "hospitality": ["Hospitality", "Travel"],
  "education": ["EdTech", "Education"],
  "local-service-businesses": ["Local Services", "Home Services"],
  "saas-technology": ["SaaS", "Technology", "Supply Chain", "Fintech"],
  "disability-care-services": ["Healthcare", "Care"],
};

function getCaseStudiesForIndustry(slug: string) {
  const mappedIndustries = industryToCaseStudyMap[slug] || [];
  return caseStudies.filter((cs) =>
    mappedIndustries.some((m) => cs.industry.toLowerCase().includes(m.toLowerCase()))
  );
}

/* ─── SECTION COMPONENTS ─── */

function SnapshotSection({ industry }: { industry: IndustryItem }) {
  const data = industrySnapshotData[industry.slug] || industrySnapshotData["dental-healthcare"];
  const Icon = (iconMap[industry.icon] || Target) as React.ComponentType<any>;
  const metrics = [
    { label: "Business Size", value: data.businessSize, icon: Building },
    { label: "Competition", value: data.competitionLevel, icon: Target, progress: data.competitionPct },
    { label: "Digital Maturity", value: `${data.digitalMaturity}%`, icon: Graph, progress: data.digitalMaturity },
    { label: "Search Demand", value: `${data.searchDemand}/100`, icon: MagnifyingGlass, progress: data.searchDemand },
    { label: "Growth Opportunity", value: `${data.growthOpportunity}%`, icon: ChartLineUp, progress: data.growthOpportunity },
    { label: "Avg Lead Value", value: `£${data.avgLeadValue.toLocaleString()}`, icon: CurrencyDollar },
    { label: "AI Readiness", value: `${data.aiReadiness}%`, icon: Robot, progress: data.aiReadiness },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`snapshot-${industry.slug}`} />
        <BgRadials position="tl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Industry Snapshot</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            <span className="text-accent">{industry.name}</span> at a glance.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">Key metrics that define the digital landscape for this industry.</p>
        </FadeIn>
        <div className="relative bg-[#181818] border border-accent/20 rounded-[1.25rem] p-4 lg:p-6 mb-8">
          <div className="flex items-center gap-3">
            <ChartLineUp size={18} className="text-accent shrink-0" />
            <p className="text-[13px] text-text-secondary leading-relaxed">
              <span className="text-white font-medium">{industry.name}</span> has a <span className="text-accent font-medium">{data.digitalMaturity}% digital maturity</span> with {data.searchDemand}/100 search demand. 
              Businesses capturing the digital opportunity see <span className="text-white font-medium">{data.growthOpportunity}% growth potential</span> through improved online presence.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {metrics.map((m, i) => {
            const MetricIcon = m.icon as React.ComponentType<any>;
            return (
              <div key={m.label}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 transition-all duration-500 hover:border-accent/55 hover:-translate-y-1 transform-gpu h-full group">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <MetricIcon size={16} className="text-accent mb-2" />
                  <span className="text-[10px] font-mono text-[rgba(255,255,255,0.60)] tracking-wider uppercase block mb-1">{m.label}</span>
                  <span className="font-display text-[clamp(1.2rem,1.8vw,1.5rem)] font-semibold text-white leading-none block">{m.value}</span>
                  {m.progress !== undefined && (
                    <div className="mt-3 h-1.5 bg-[#111] rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all duration-1000"
                        style={{ width: `${m.progress}%`, boxShadow: "0 0 6px rgba(212,168,73,0.2)" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BuyingJourneySection({ industry }: { industry: IndustryItem }) {
  const journey = industryBuyingJourneys[industry.slug] || industryBuyingJourneys["dental-healthcare"];
  const digitalCount = journey.filter((j) => j.digital).length;
  const pctDigital = Math.round((digitalCount / journey.length) * 100);

  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`journey-${industry.slug}`} />
        <BgRadials position="br" />
        <BgDots />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Customer Journey</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            How <span className="text-accent">customers actually buy.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-4">{pctDigital}% of this journey happens digitally. Every offline touchpoint is an opportunity for digital enablement.</p>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">{journey.length} stages</span>
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">{digitalCount} digital touchpoints</span>
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">{journey.length - digitalCount} offline touchpoints</span>
          </div>
          <div className="relative bg-[#181818] border border-accent/20 rounded-[1.25rem] p-4 lg:p-5 mb-8">
            <div className="flex items-center gap-4 lg:gap-8">
              <div className="text-center">
                <span className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-semibold text-accent block">{pctDigital}%</span>
                <span className="text-[9px] font-mono text-text-secondary/50 block mt-0.5">Digital</span>
              </div>
              <div className="flex-1 h-3 bg-[#111] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent to-accent/60 rounded-full transition-all duration-1000" style={{ width: `${pctDigital}%` }} />
              </div>
              <div className="text-center">
                <span className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-semibold text-text-secondary block">{100 - pctDigital}%</span>
                <span className="text-[9px] font-mono text-text-secondary/50 block mt-0.5">Offline</span>
              </div>
            </div>
          </div>
        </FadeIn>
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-8 left-[2%] right-[2%] h-px bg-gradient-to-r from-accent/30 via-accent/10 to-accent/30" />
            <div className="grid grid-cols-7 gap-3">
              {journey.map((j, i) => (
                <div key={j.stage}
                  className="animate-fadeIn text-center"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className={`relative mx-auto w-16 h-16 rounded-full border-2 flex items-center justify-center mb-3 transition-all duration-500 ${j.digital ? "bg-[#181818] border-accent/50" : "bg-[#111] border-accent/20"}`}>
                    {j.digital ? <Globe size={20} className="text-accent" /> : <User size={20} className="text-text-secondary/50" />}
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-white block mb-1">{j.stage}</span>
                  <span className="text-[9px] text-text-secondary/60 leading-tight block">{j.desc}</span>
                  <span className={`inline-block mt-1 text-[8px] font-mono px-1.5 py-0.5 rounded-full ${j.digital ? "bg-accent/15 text-accent/70" : "bg-[#111] text-text-secondary/40"}`}>
                    {j.digital ? "Digital" : "Offline"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:hidden overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4">
          <div className="flex gap-6 w-max pb-4">
            {journey.map((j, i) => (
              <div key={j.stage} className="snap-center w-[140px] shrink-0">
                <div className={`relative mx-auto w-14 h-14 rounded-full border-2 flex items-center justify-center mb-3 ${j.digital ? "bg-[#181818] border-accent/50" : "bg-[#111] border-accent/20"}`}>
                  {j.digital ? <Globe size={18} className="text-accent" /> : <User size={18} className="text-text-secondary/50" />}
                </div>
                <span className="text-[11px] font-mono font-semibold text-white block mb-1 text-center">{j.stage}</span>
                <span className="text-[9px] text-text-secondary/60 text-center block">{j.desc}</span>
                <span className={`inline-block mt-1 text-[7px] font-mono px-1.5 py-0.5 rounded-full mx-auto ${j.digital ? "bg-accent/15 text-accent/70" : "bg-[#111] text-text-secondary/40"}`}>
                  {j.digital ? "Digital" : "Offline"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 relative bg-[#181818] border border-accent/20 rounded-[1.25rem] p-4 lg:p-5 max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
              <Lightning size={16} className="text-accent" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-white block mb-1">Key Insight</span>
              <p className="text-[12px] text-text-secondary leading-relaxed">With {pctDigital}% of this journey happening digitally, every offline touchpoint should be digitally enabled. Even traditionally offline stages can be enhanced with digital tools to streamline conversion and capture data.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChallengesSection({ industry }: { industry: IndustryItem }) {
  const challengeIcons = [Wrench, Shield, Gear, PuzzlePiece, Flag];
  const impactLabels = ["Revenue Impact", "Customer Experience", "Operational Cost", "Compliance Risk", "Competitive Gap"];
  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`challenges-${industry.slug}`} />
        <BgRadials position="bl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Challenges</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            The <span className="text-accent">hurdles</span> you face.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-4">Specific challenges that {industry.name} businesses encounter in their digital growth journey.</p>
          <div className="flex items-center gap-2 mb-12">
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">{industry.challenges.length} key challenges</span>
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">Industry-specific</span>
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {industry.challenges.map((c, i) => {
            const ChallengeIcon = challengeIcons[i % 5];
            const impactLabel = impactLabels[i % 5];
            return (
              <div key={c}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 transition-all duration-500 hover:border-accent/55 hover:-translate-y-1 transform-gpu h-full group">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between mb-3">
                    <ChallengeIcon size={18} className="text-accent" />
                    <span className="text-[7px] font-mono text-accent/50 px-1.5 py-0.5 rounded-full border border-accent/20">{impactLabel}</span>
                  </div>
                  <h3 className="text-sm font-medium text-white mb-2">{c.split(" ").slice(0, 5).join(" ")}...</h3>
                  <p className="text-[12px] text-text-secondary leading-relaxed">{c}</p>
                  <div className="mt-3 pt-3 border-t border-accent/10">
                    <span className="text-[8px] font-mono text-danger/60">Impact: High</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GrowthOpportunitiesSection({ industry }: { industry: IndustryItem }) {
  const opportunities = industryOpportunities[industry.slug] || industryOpportunities["dental-healthcare"];
  const icons = [CurrencyDollar, ChartLineUp, Clock, Rocket];
  const opportunityTotal = opportunities.reduce((acc, o) => {
    const num = parseInt(o.value.replace(/[^0-9]/g, ""));
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`opportunities-${industry.slug}`} />
        <BgRadials position="tr" />
        <BgDiagonal id={`diag-${industry.slug}`} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Growth Opportunities</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Where <span className="text-accent">money is being left</span> on the table.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-4">Quantified opportunities for {industry.name} businesses to capture lost revenue and improve efficiency.</p>
          <div className="flex items-center gap-2 mb-12">
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">{opportunities.length} opportunities identified</span>
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">Industry-specific analysis</span>
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {opportunities.map((o, i) => {
            const OppIcon = icons[i] as React.ComponentType<any>;
            return (
              <div key={o.label}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 transition-all duration-500 hover:border-accent/55 hover:-translate-y-1 transform-gpu h-full group">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
                  <OppIcon size={18} className="text-accent mb-3" />
                  <span className="text-[10px] font-mono text-[rgba(255,255,255,0.60)] tracking-wider uppercase block mb-1">{o.label}</span>
                  <span className="font-display text-[clamp(1.8rem,2.8vw,2.4rem)] font-semibold text-accent leading-none block mb-1">{o.value}</span>
                  <span className="text-[11px] text-text-secondary leading-relaxed block mb-3">{o.desc}</span>
                  <div className="pt-3 border-t border-accent/10">
                    <Link href="/contact" className="inline-flex items-center gap-1 text-[10px] text-accent/50 hover:text-accent transition-colors group/link">
                      Calculate your opportunity <ArrowRight size={9} className="transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GrowthSystemSection({ industry }: { industry: IndustryItem }) {
  const steps = industryGrowthSystems[industry.slug] || industryGrowthSystems["dental-healthcare"];
  const outcomes = ["Early visibility improvements and baseline measurements", "First rankings appearing and lead flow beginning", "Systems operational and generating consistent results", "Scaling winning channels and expanding coverage", "Market leadership position with automated acquisition"];
  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`system-${industry.slug}`} />
        <BgRadials position="center" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Growth System</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            The <span className="text-accent">{industry.name.split(" ")[0]}</span> growth system.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-4">Our proven 5-step framework tailored specifically to {industry.name}.</p>
          <div className="flex items-center gap-2 mb-12">
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">{steps.length} phases</span>
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">Industry-tailored</span>
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">Proven framework</span>
          </div>
        </FadeIn>
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
            <div className="grid grid-cols-5 gap-6 relative">
              {steps.map((step, i) => (
                <div key={step.step}
                  className="relative pt-8 animate-fadeIn"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="absolute top-0 left-0 right-0 flex justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#181818] border border-accent/40 flex items-center justify-center">
                      <span className="text-[11px] font-mono text-accent">{step.step}</span>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute top-5 left-[calc(50%+2rem)] right-0 h-px bg-gradient-to-r from-accent/20 to-transparent" />
                  )}
                  <div className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 transition-all duration-500 hover:border-accent/55 hover:-translate-y-1 transform-gpu h-full">
                    <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase block mb-1">Step {step.step}</span>
                    <h4 className="font-display text-sm font-semibold text-white mb-2">{step.title}</h4>
                    <p className="text-[11px] text-text-secondary leading-relaxed mb-3">{step.desc}</p>
                    <div className="pt-3 border-t border-accent/10">
                      <span className="text-[8px] font-mono text-accent/50 tracking-wider uppercase block mb-1">Expected Outcome</span>
                      <p className="text-[10px] text-white/60 leading-relaxed">{outcomes[i]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:hidden overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4">
          <div className="flex gap-4 w-max">
            {steps.map((step, i) => (
              <div key={step.step} className="snap-center w-[260px] shrink-0 animate-fadeIn" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                      <span className="text-[9px] font-mono text-accent">{step.step}</span>
                    </div>
                    <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase">Step {step.step}</span>
                  </div>
                  <h4 className="font-display text-sm font-semibold text-white mb-1">{step.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">{step.desc}</p>
                  <div className="pt-2 border-t border-accent/10">
                    <span className="text-[7px] font-mono text-accent/50 tracking-wider uppercase block mb-0.5">Outcome</span>
                    <p className="text-[9px] text-white/60 leading-relaxed">{outcomes[i].slice(0, 60)}...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionsEcosystemSection({ industry }: { industry: IndustryItem }) {
  const relevantSolutions = solutions.filter((s) =>
    s.relevantServices.some((rs) => industry.relevantServices.includes(rs))
  ).slice(0, 6);
  const solutionTypes = ["Growth", "Visibility", "Automation", "Technology", "Conversion", "Strategy"];

  const solIconMap: Record<string, React.ElementType> = {
    Target, MagnifyingGlass: MagnifyingGlass, Robot, Gear, Code, Rocket, Globe, MapPin, ChartLineUp, Lightning, Graph, Heart, Handshake, ShoppingCart, Clock,
  };
  const fallbackIcons: Record<string, string> = {
    "Generate More Qualified Leads": "Target",
    "Improve Search Visibility": "MagnifyingGlass",
    "Become Visible in AI Search": "Robot",
    "Reduce Manual Work With Automation": "Gear",
    "Build a Custom CRM": "Code",
    "Launch a Digital Product": "Rocket",
    "Grow a Multi-Location Business": "Globe",
    "Improve Local Visibility": "MapPin",
    "Improve Conversion Rates": "ChartLineUp",
    "Modernise an Existing Website": "Lightning",
    "Connect Marketing and Sales Data": "Graph",
    "Build a Client Portal": "Heart",
    "Improve Online Reputation": "Handshake",
  };

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`solutions-${industry.slug}`} />
        <BgRadials position="bl" />
        <BgDots />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Solutions</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Solutions for <span className="text-accent">{industry.name}.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">Our proven approaches tailored to your industry&rsquo;s unique challenges.</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {relevantSolutions.map((sol, i) => {
            const iconName = fallbackIcons[sol.name] || sol.icon;
            const SolIcon = (solIconMap[iconName] || Target) as React.ComponentType<any>;
            return (
              <Link key={sol.slug} href={`/${sol.slug}`}
                className="group animate-fadeIn"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 transition-all duration-500 hover:border-accent/55 hover:-translate-y-1 transform-gpu h-full">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <SolIcon size={18} className="text-accent mb-3" />
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[7px] font-mono text-accent/50 px-1.5 py-0.5 rounded-full border border-accent/20 bg-[#1E1E1E]">{solutionTypes[i % solutionTypes.length]}</span>
                    <span className="text-[7px] font-mono text-text-secondary/40">{sol.slug.split("-").slice(0, 2).join(" ")}</span>
                  </div>
                  <h3 className="text-sm font-medium text-white group-hover:text-accent transition-colors mb-1.5">{sol.name}</h3>
                  <p className="text-[12px] text-text-secondary leading-relaxed mb-3">{sol.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] text-accent/60 group-hover:gap-1.5 transition-all">
                      Learn more <ArrowRight size={10} />
                    </span>
                    <span className="text-[7px] font-mono text-text-secondary/30">Solution</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ToolsShowcaseSection({ industry }: { industry: IndustryItem }) {
  const { toolCategories } = require("@/data/tools");
  const allTools = toolCategories.flatMap((cat: any) => cat.tools);
  const relevant = allTools.filter((t: any) => industry.relevantTools.includes(t.slug));

  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`tools-${industry.slug}`} />
        <BgRadials position="tr" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Tools</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Recommended <span className="text-accent">tools.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">Free tools we recommend for {industry.name} businesses.</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {relevant.map((tool: any, i: number) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`}
              className="group animate-fadeIn"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 transition-all duration-500 hover:border-accent/55 hover:-translate-y-1 transform-gpu h-full">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
                <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center mb-3">
                  <span className="text-[8px] font-mono text-accent">{tool.name.slice(0, 2).toUpperCase()}</span>
                </div>
                <h3 className="text-sm font-medium text-white group-hover:text-accent transition-colors mb-1">{tool.name}</h3>
                <p className="text-[12px] text-text-secondary leading-relaxed mb-3">{tool.shortDesc}</p>
                {tool.isMvp && (
                  <span className="inline-block text-[8px] font-mono text-accent/60 px-2 py-0.5 rounded-full border border-accent/25">Free tool</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection({ industry }: { industry: IndustryItem }) {
  const filteredCaseStudies = getCaseStudiesForIndustry(industry.slug);
  const displayStudies = filteredCaseStudies.length > 0 ? filteredCaseStudies.slice(0, 3) : [];
  const totalMetrics = displayStudies.reduce((acc, cs) => acc + cs.metrics.length, 0);

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`case-${industry.slug}`} />
        <BgRadials position="br" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Case Studies</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Results in <span className="text-accent">{industry.name}.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-4">Real results from real businesses in your industry. Every case study includes verified metrics.</p>
          <div className="flex items-center gap-2 mb-12">
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">{displayStudies.length} case studies</span>
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">{totalMetrics} verified metrics</span>
          </div>
        </FadeIn>
        {displayStudies.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayStudies.map((cs, i) => (
              <Link key={cs.slug} href={`/${cs.slug}`}
                className="group animate-fadeIn"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 transition-all duration-500 hover:border-accent/55 hover:-translate-y-1 transform-gpu h-full flex flex-col">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                      <Briefcase size={16} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-accent transition-colors">{cs.client}</h3>
                      <span className="text-[9px] font-mono text-text-secondary/50">{cs.project}</span>
                    </div>
                  </div>
                  <p className="text-[12px] text-text-secondary leading-relaxed mb-4 flex-1">{cs.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {cs.metrics.slice(0, 2).map((m) => (
                      <div key={m.label} className="bg-[#1E1E1E] rounded-lg p-2 text-center group-hover:bg-accent/5 transition-colors">
                        <span className="font-display text-sm font-semibold text-accent block">{m.value}</span>
                        <span className="text-[8px] font-mono text-text-secondary/60 block">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-accent/10">
                    <span className="inline-flex items-center gap-1 text-[10px] text-accent/50 group-hover:text-accent transition-colors">
                      View full case study <ArrowRight size={9} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-8 text-center">
            <Rocket size={32} className="text-accent/50 mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-white mb-2">Coming Soon</h3>
            <p className="text-sm text-text-secondary max-w-[40ch] mx-auto">
              We&rsquo;re working with {industry.name} clients right now. Check back soon for case studies.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 text-[13px] text-accent hover:text-accent/80 transition-colors">
                Be the first <ArrowRight size={12} />
              </Link>
              <span className="text-[10px] font-mono text-text-secondary/40">or</span>
              <Link href="/work" className="text-[13px] text-text-secondary hover:text-white transition-colors">
                View all work
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function StatisticsSection({ industry }: { industry: IndustryItem }) {
  const stats = industryStats[industry.slug] || industryStats["dental-healthcare"];
  const statItems = [
    { label: "Monthly Search Volume", value: stats.searchVolume, icon: MagnifyingGlass, progress: Math.min(parseInt(stats.searchVolume.replace(/[^0-9]/g, "")) / 128, 100), trend: "+12% YoY" },
    { label: "Average CPC", value: stats.cpc, icon: CurrencyDollar, progress: Math.min(parseInt(stats.cpc.replace(/[^0-9]/g, "")) * 3, 100), trend: "Rising" },
    { label: "Competition Level", value: `${stats.competition}%`, icon: Target, progress: stats.competition, trend: `${stats.competition > 80 ? "Intense" : "Moderate"}` },
    { label: "Avg Conversion Rate", value: `${stats.avgConversionRate}%`, icon: ChartLineUp, progress: stats.avgConversionRate * 10, trend: "Industry benchmark" },
    { label: "Review Impact", value: `${stats.reviewImpact}/100`, icon: Star, progress: stats.reviewImpact, trend: `#${stats.reviewImpact > 80 ? "1" : "2"} ranking factor` },
    { label: "Customer LTV", value: `£${stats.customerLTV.toLocaleString()}`, icon: CurrencyDollar, progress: Math.min(stats.customerLTV / 300, 100), trend: "Per customer" },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`stats-${industry.slug}`} />
        <BgRadials position="center" />
        <BgDiagonal id={`diag2-${industry.slug}`} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Statistics</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            <span className="text-accent">{industry.name}</span> data dashboard.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-4">Key market statistics that define the digital opportunity for {industry.name}.</p>
          <div className="flex items-center gap-2 mb-12">
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">{stats.searchVolume} volume</span>
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">{stats.cpc} avg CPC</span>
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">£{stats.customerLTV.toLocaleString()} LTV</span>
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {statItems.map((s, i) => {
            const StatIcon = s.icon as React.ComponentType<any>;
            return (
              <div key={s.label}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 transition-all duration-500 hover:border-accent/55 hover:-translate-y-1 transform-gpu group">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-[rgba(255,255,255,0.60)] tracking-wider uppercase block mb-1">{s.label}</span>
                      <span className="font-display text-[clamp(1.2rem,1.8vw,1.5rem)] font-semibold text-white">{s.value}</span>
                    </div>
                    <div className="text-right">
                      <StatIcon size={16} className="text-accent/60 mb-1" />
                      <span className="text-[7px] font-mono text-accent/50 block">{s.trend}</span>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 bg-[#111] rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-1000"
                      style={{ width: `${s.progress}%`, boxShadow: "0 0 6px rgba(212,168,73,0.2)" }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="text-[7px] font-mono text-text-secondary/40">0%</span>
                    <span className="text-[7px] font-mono text-text-secondary/40">100%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CommonMistakesSection({ industry }: { industry: IndustryItem }) {
  const mistakes = industryMistakes[industry.slug] || industryMistakes["dental-healthcare"];
  const severityLevels = ["Critical", "High", "Medium", "High", "Critical"];
  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`mistakes-${industry.slug}`} />
        <BgRadials position="tl" />
        <BgDots />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Common Mistakes</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Where most <span className="text-accent">{industry.name.split(" ")[0]}</span> businesses go wrong.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-4">And how we fix it differently. These are the five most damaging mistakes we see {industry.name} businesses make.</p>
          <div className="flex items-center gap-2 mb-12">
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">{mistakes.length} common mistakes</span>
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">Real-world experience</span>
          </div>
        </FadeIn>
        <div className="space-y-3">
          {mistakes.map((m, i) => {
            const severity = severityLevels[i % severityLevels.length];
            const severityColor = severity === "Critical" ? "text-danger border-danger/30 bg-danger/10" : severity === "High" ? "text-[#D4A849] border-accent/30 bg-accent/10" : "text-text-secondary border-accent/20 bg-[#181818]";
            return (
              <div key={m.title}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <details className="group">
                  <summary className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 transition-all duration-500 hover:border-accent/55 cursor-pointer list-none flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-mono text-accent">0{i + 1}</span>
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium text-white group-hover:text-accent transition-colors">{m.title}</h3>
                          <span className={`text-[7px] font-mono px-1.5 py-0.5 rounded-full border ${severityColor}`}>{severity}</span>
                        </div>
                        <p className="text-[11px] text-text-secondary/60 mt-0.5">{m.desc.slice(0, 60)}...</p>
                      </div>
                    </div>
                    <CaretDown size={14} className="text-accent/40 transition-transform duration-300 group-open:rotate-180 shrink-0" />
                  </summary>
                  <div className="mt-2 relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] font-mono text-danger tracking-wider uppercase block mb-2">The Mistake</span>
                        <p className="text-[12px] text-text-secondary leading-relaxed">{m.desc}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-accent tracking-wider uppercase block mb-2">How We Fix It</span>
                        <p className="text-[12px] text-text-secondary leading-relaxed">{m.fix}</p>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineSection({ industry }: { industry: IndustryItem }) {
  const phases = [
    { month: "Month 1", title: "Audit & Foundation", desc: "Full digital audit, competitor analysis, and strategy development.", deliverables: ["Technical SEO audit", "Competitor benchmarking", "Strategy roadmap", "KPIs and tracking setup"], milestone: "Baseline & roadmap complete" },
    { month: "Month 2", title: "Implementation", desc: "Priority fixes, content creation, and platform optimisation.", deliverables: ["Technical fixes deployed", "Content briefs completed", "GBP fully optimised", "Tracking infrastructure live"], milestone: "Foundation in place" },
    { month: "Month 3", title: "Optimise & Launch", desc: "Core campaigns go live and initial results start appearing.", deliverables: ["Content published", "Review system deployed", "Paid campaigns launched", "First rankings improve"], milestone: "First rankings visible" },
    { month: "Month 6", title: "Scale & Expand", desc: "Winning channels scaled, new opportunities identified.", deliverables: ["Top 10 rankings for key terms", "Lead flow established", "Automation systems active", "Monthly reporting cadence"], milestone: "Consistent lead flow" },
    { month: "Scale", title: "Ongoing Growth", desc: "Continuous optimisation, expansion, and market leadership.", deliverables: ["Market leadership position", "Full funnel visibility", "Automated acquisition system", "Quarterly strategy reviews"], milestone: "Market leadership" },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`timeline-${industry.slug}`} />
        <BgRadials position="br" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Growth Timeline</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Your <span className="text-accent">roadmap</span> to results.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">A phased timeline for {industry.name} businesses.</p>
        </FadeIn>
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute left-[120px] right-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-accent/10 to-transparent" />
            <div className="space-y-8">
              {phases.map((phase, i) => (
                <div key={phase.month}
                  className="relative animate-fadeInLeft"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex gap-8">
                    <div className="w-[120px] shrink-0 pt-1 text-right">
                      <span className="text-[11px] font-mono text-accent font-semibold">{phase.month}</span>
                      <span className="block text-[8px] font-mono text-text-secondary/40 mt-1">Phase {i + 1}</span>
                    </div>
                    <div className="relative">
                      <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-accent border-2 border-[#0D0C0B] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0D0C0B]" />
                      </div>
                      <div className="ml-8 bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 transition-all duration-500 hover:border-accent/55 hover:-translate-y-0.5 transform-gpu">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-display text-base font-semibold text-white">{phase.title}</h3>
                          <span className="text-[8px] font-mono text-accent/60 px-2 py-0.5 rounded-full border border-accent/20">{phase.milestone}</span>
                        </div>
                        <p className="text-[12px] text-text-secondary leading-relaxed mb-3">{phase.desc} This phase is specifically calibrated for the {industry.name} landscape.</p>
                        <div className="flex flex-wrap gap-1.5">
                          {phase.deliverables.map((d) => (
                            <span key={d} className="text-[9px] font-mono text-accent/60 px-2 py-0.5 rounded-full border border-accent/20 bg-[#1E1E1E]">{d}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:hidden space-y-4">
          {phases.map((phase, i) => (
            <div key={phase.month}
              className="animate-fadeIn"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono text-accent font-semibold">{phase.month}</span>
                  <span className="w-px h-3 bg-accent/30" />
                  <h3 className="text-sm font-medium text-white">{phase.title}</h3>
                  <span className="ml-auto text-[7px] font-mono text-accent/50 px-1.5 py-0.5 rounded-full border border-accent/20">{phase.milestone}</span>
                </div>
                <p className="text-[12px] text-text-secondary leading-relaxed mb-3">{phase.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {phase.deliverables.map((d) => (
                    <span key={d} className="text-[8px] font-mono text-accent/60 px-2 py-0.5 rounded-full border border-accent/20 bg-[#1E1E1E]">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ industry }: { industry: IndustryItem }) {
  const faqs = industryFAQs[industry.slug] || industryFAQs["dental-healthcare"];
  const extraFAQs = expandedFAQs[industry.slug] || [];
  const allFAQs = [...faqs, ...extraFAQs];
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const displayFAQs = showAll ? allFAQs : allFAQs.slice(0, 6);

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`faq-${industry.slug}`} />
        <BgRadials position="bl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">FAQs</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            <span className="text-accent">{industry.name}</span> FAQ.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">Answers to the most common questions we hear from {industry.name} businesses.</p>
        </FadeIn>
        <div className="space-y-2">
          {displayFAQs.map((faq, i) => (
            <div key={faq.q}
              className="animate-fadeIn"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className={`relative bg-[#181818] border rounded-[1.25rem] p-5 transition-all duration-300 cursor-pointer ${openIdx === i ? "border-accent/55" : "border-accent/25 hover:border-accent/45"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <div className={`w-6 h-6 rounded-full border border-accent/30 flex items-center justify-center shrink-0 transition-transform duration-300 ${openIdx === i ? "rotate-45" : ""}`}>
                    <Plus size={12} className="text-accent" />
                  </div>
                </div>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <p className="text-[13px] text-text-secondary leading-relaxed mt-4 pt-4 border-t border-accent/15">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>
        {allFAQs.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-[12px] font-mono text-accent hover:text-accent/80 transition-colors px-4 py-2 rounded-full border border-accent/25 bg-[#181818] hover:bg-[#1E1E1E]"
            >
              {showAll ? "Show fewer" : `Show all ${allFAQs.length} FAQs`}
              <CaretDown size={12} className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ResourcesSection({ industry }: { industry: IndustryItem }) {
  const resources = industryResources[industry.slug] || industryResources["dental-healthcare"];
  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`resources-${industry.slug}`} />
        <BgRadials position="br" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Resources</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            <span className="text-accent">{industry.name}</span> insights.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-4">Perspectives, analysis, and strategies from our team specific to {industry.name}.</p>
          <div className="flex items-center gap-2 mb-12">
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">{resources.length} resources</span>
            <span className="text-[10px] font-mono text-accent/60 px-2 py-1 rounded-full border border-accent/25">Curated for you</span>
          </div>
        </FadeIn>
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
          <motion.div className="lg:col-span-7 lg:row-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="block h-full">
              <PanelCard className="p-6 lg:p-8 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/[0.01] rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                      <BookOpen size={14} className="text-accent" />
                    </div>
                    <span className="text-[10px] font-mono text-accent/60 tracking-wider uppercase">{resources[0].tag}</span>
                    <span className="w-1 h-1 rounded-full bg-accent/30" />
                    <span className="text-[10px] font-mono text-text-secondary/50">{resources[0].readTime}</span>
                  </div>
                  <h3 className="font-display text-[clamp(1.3rem,2.2vw,1.6rem)] font-semibold text-white mb-4 leading-[1.1]">
                    {resources[0].title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-[45ch]">{resources[0].excerpt}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center"><span className="text-[6px] font-mono text-accent">ZO</span></div>
                    </div>
                    <span className="text-[10px] font-mono text-text-secondary/50">By ZON Research Team</span>
                  </div>
                </div>
                <div className="pt-6 mt-auto relative z-10 border-t border-accent/10">
                  <span className="inline-flex items-center gap-1 text-xs text-accent/30">
                    Read full article <ArrowRight size={10} />
                  </span>
                </div>
              </PanelCard>
            </div>
          </motion.div>
          <div className="lg:col-span-5 space-y-4">
            {resources.slice(1).map((r, i) => (
              <div key={r.title}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="block">
                  <PanelCard className="p-5 flex gap-4 items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase">{r.tag}</span>
                        <span className="w-0.5 h-0.5 rounded-full bg-text-secondary/30" />
                        <span className="text-[9px] font-mono text-text-secondary/40">{r.readTime}</span>
                      </div>
                      <h4 className="text-sm font-medium text-white leading-snug">{r.title}</h4>
                      <p className="text-[10px] text-text-secondary/50 mt-1 line-clamp-2">{r.excerpt}</p>
                    </div>
                    <ArrowRight size={12} className="text-text-secondary/20 shrink-0 mt-2" />
                  </PanelCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExploreOtherIndustriesSection({ industry }: { industry: IndustryItem }) {
  const otherIndustries = industries.filter((i) => i.slug !== industry.slug);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const filters = ["All", "High Competition", "High Growth", "AI-Ready"];
  const filtered = activeFilter && activeFilter !== "All"
    ? otherIndustries.filter((ind) => {
        const snap = industrySnapshotData[ind.slug];
        if (activeFilter === "High Competition") return snap && snap.competitionPct >= 80;
        if (activeFilter === "High Growth") return snap && snap.growthOpportunity >= 80;
        if (activeFilter === "AI-Ready") return snap && snap.aiReadiness >= 55;
        return true;
      })
    : otherIndustries;

  return (
    <section className="relative py-32 lg:py-40 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`explore-${industry.slug}`} />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.07]" style={{ background: "radial-gradient(ellipse at center, rgba(212,168,73,0.5) 0%, transparent 70%)" }} />
        <BgDiagonal id={`diag3-${industry.slug}`} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,168,73,0.04), transparent)" }} />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(rgba(212,168,73,0.4) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/60 mb-4 block">Explore All Industries</span>
          <h2 className="font-display font-semibold text-[clamp(2.2rem,4vw,3.2rem)] tracking-[-0.03em] leading-[0.95] text-white mb-4">
            Not in the <span className="text-accent">{industry.name}</span> space?<br />
            Find your <span className="text-accent">industry.</span>
          </h2>
          <p className="text-text-secondary text-base leading-relaxed max-w-[55ch] mb-6">
            Every industry has a unique digital opportunity. Click through to see how we drive growth for your sector.
          </p>
        </FadeIn>
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f === "All" ? null : f)}
              className={`text-[10px] font-mono px-3 py-1.5 rounded-full border transition-all duration-300 ${
                (activeFilter === f) || (f === "All" && !activeFilter)
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-accent/20 bg-[#181818] text-text-secondary/60 hover:border-accent/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filtered.map((ind, i) => {
              const IndIcon = (iconMap[ind.icon] || Target) as React.ComponentType<any>;
              const snap = industrySnapshotData[ind.slug];
              return (
                <motion.div
                  key={ind.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease, delay: i * 0.02 }}
                >
                  <Link href={`/${ind.slug}`}
                    className="group block h-full"
                  >
                    <div className="relative bg-[#181818] border border-accent/20 rounded-[1.25rem] p-5 text-center transition-all duration-500 hover:border-accent/55 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(212,168,73,0.06)] transform-gpu h-full flex flex-col items-center justify-center">
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-accent/20 group-hover:border-accent/40 group-hover:scale-110">
                        <IndIcon size={22} className="text-accent/60 group-hover:text-accent transition-colors duration-300" />
                      </div>
                      <span className="text-xs font-medium text-white group-hover:text-accent transition-colors duration-300 block leading-snug mb-1">
                        {ind.name.split("&").map((s, i) => i === 0 ? s.trim() : s.trim()).join(" & ")}
                      </span>
                      {snap && (
                        <div className="flex items-center gap-1.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-[8px] font-mono text-accent/60">{snap.searchDemand}/100 demand</span>
                          <span className="w-0.5 h-0.5 rounded-full bg-accent/30" />
                          <span className="text-[8px] font-mono text-text-secondary/40">{snap.competitionPct}% competition</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-6 p-4 rounded-full bg-[#181818] border border-accent/20">
            <span className="text-[11px] font-mono text-text-secondary/60">{otherIndustries.length} industries available</span>
            <span className="w-px h-4 bg-accent/20" />
            <span className="text-[11px] font-mono text-text-secondary/60">13 dedicated growth systems</span>
            <span className="w-px h-4 bg-accent/20" />
            <Link href="/industries" className="text-[11px] font-mono text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1">
              View all <ArrowRight size={10} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 13 INDUSTRY PAGE FUNCTIONS ─── */

/* ─── INLINE SVG ILLUSTRATIONS ─── */

function ToothIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.08] absolute top-8 right-8">
      <path d="M60 20c-8 0-16 2-22 8-6 6-10 14-12 24-2 10-3 20-1 30 1 5 3 10 6 14 3 3 7 5 11 4 4-1 7-4 9-8l4-10c2-6 5-6 10-6s8 0 10 6l4 10c2 4 5 7 9 8 4 1 8-1 11-4 3-4 5-9 6-14 2-10 1-20-1-30-2-10-6-18-12-24-6-6-14-8-22-8z" stroke="#D4A849" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function GavelIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.08] absolute top-8 right-8">
      <rect x="56" y="40" width="8" height="50" rx="2" stroke="#D4A849" strokeWidth="1.5" fill="none" />
      <rect x="35" y="70" width="50" height="8" rx="2" stroke="#D4A849" strokeWidth="1.5" fill="none" />
      <rect x="28" y="78" width="64" height="4" rx="2" stroke="#D4A849" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
}

function CodeBracketsIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.08] absolute top-8 right-8">
      <path d="M48 30L24 60l24 30" stroke="#D4A849" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M72 30l24 30-24 30" stroke="#D4A849" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function ChartUpIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.08] absolute top-8 right-8">
      <path d="M20 90L45 60l20 10 35-40" stroke="#D4A849" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="100" cy="30" r="4" fill="#D4A849" opacity="0.5" />
    </svg>
  );
}

function BuildingIconSvg() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.08] absolute top-8 right-8">
      <rect x="30" y="30" width="60" height="60" rx="4" stroke="#D4A849" strokeWidth="1.5" fill="none" />
      <rect x="46" y="44" width="8" height="12" rx="1" stroke="#D4A849" strokeWidth="1" fill="none" />
      <rect x="66" y="44" width="8" height="12" rx="1" stroke="#D4A849" strokeWidth="1" fill="none" />
      <rect x="46" y="64" width="8" height="12" rx="1" stroke="#D4A849" strokeWidth="1" fill="none" />
      <rect x="66" y="64" width="8" height="12" rx="1" stroke="#D4A849" strokeWidth="1" fill="none" />
    </svg>
  );
}

function StarBurstIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.08] absolute top-8 right-8">
      <path d="M60 10v8M60 102v8M10 60h8M102 60h8" stroke="#D4A849" strokeWidth="1" strokeLinecap="round" />
      <path d="M26 26l5.5 5.5M88.5 88.5l5.5 5.5M26 94l5.5-5.5M88.5 31.5l5.5-5.5" stroke="#D4A849" strokeWidth="1" strokeLinecap="round" />
      <circle cx="60" cy="60" r="4" fill="#D4A849" opacity="0.4" />
    </svg>
  );
}

function MapHomeIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.08] absolute top-8 right-8">
      <path d="M60 20L25 50v42h70V50L60 20z" stroke="#D4A849" strokeWidth="1.5" fill="none" />
      <rect x="48" y="60" width="24" height="20" rx="2" stroke="#D4A849" strokeWidth="1" fill="none" />
    </svg>
  );
}

function CartIconSvg() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.08] absolute top-8 right-8">
      <path d="M30 30h8l10 40h44l8-28H44" stroke="#D4A849" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="80" r="4" fill="#D4A849" opacity="0.5" />
      <circle cx="82" cy="80" r="4" fill="#D4A849" opacity="0.5" />
    </svg>
  );
}

function StarDotsIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.08] absolute top-8 right-8">
      <path d="M60 15l12 24 26-4-18 20 6 26-26-10-26 10 6-26-18-20 26 4L60 15z" stroke="#D4A849" strokeWidth="1" fill="none" />
    </svg>
  );
}

function CapIconSvg() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.08] absolute top-8 right-8">
      <path d="M20 52l40-20 40 20-40 20-40-20z" stroke="#D4A849" strokeWidth="1.5" fill="none" />
      <path d="M30 58v16c0 8 14 14 30 14s30-6 30-14V58" stroke="#D4A849" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function PinMapIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.08] absolute top-8 right-8">
      <path d="M60 20c-14 0-25 11-25 25 0 18 25 45 25 45s25-27 25-45c0-14-11-25-25-25z" stroke="#D4A849" strokeWidth="1.5" fill="none" />
      <circle cx="60" cy="45" r="6" fill="#D4A849" opacity="0.4" />
    </svg>
  );
}

function HeartIconSvg() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.08] absolute top-8 right-8">
      <path d="M60 30c-8-10-22-12-30-4s-8 22 0 30l30 30 30-30c8-8 8-22 0-30s-22-6-30 4z" stroke="#D4A849" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function CalIconSvg() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.08] absolute top-8 right-8">
      <rect x="25" y="30" width="70" height="60" rx="4" stroke="#D4A849" strokeWidth="1.5" fill="none" />
      <path d="M25 50h70" stroke="#D4A849" strokeWidth="1" fill="none" />
      <path d="M42 30v-6M78 30v-6" stroke="#D4A849" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function BriefIcnSvg() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.08] absolute top-8 right-8">
      <rect x="20" y="45" width="80" height="45" rx="4" stroke="#D4A849" strokeWidth="1.5" fill="none" />
      <path d="M42 45V35c0-4 3-8 8-8h20c5 0 8 4 8 8v10" stroke="#D4A849" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/* ─── HERO BACKGROUND ─── */

function HeroBg() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 opacity-[0.12]">
        <ShapeGrid speed={0.1} squareSize={36} direction="diagonal" borderColor="#D4A849" hoverFillColor="#D4A849" shape="square" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ground/90 pointer-events-none" />
      <div className="absolute top-12 right-[10%] text-[clamp(8rem,18vw,16rem)] font-mono font-semibold text-accent/[0.04] leading-none select-none pointer-events-none">13</div>
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.008]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.3), transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/10" />
    </div>
  );
}

/* ─── 13 INDUSTRY PAGE FUNCTIONS ─── */

function DentalHealthcarePage({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <style>{animStyles}{processAnimStyles}{extendedAnimStyles}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="relative py-24 lg:py-28 bg-ground overflow-hidden">
          <ToothIcon />
          <HeroBg />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">Patient Acquisition</span>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.5rem)] tracking-[-0.03em] leading-[0.95] text-white mb-6">
                Dominate dental <span className="text-accent">local search.</span>
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">{industry.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">12,400+ UK practices</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">£8.40 avg CPC</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">2.4M searches/month</span>
              </div>
              {(() => {
                const d = industrySnapshotData[industry.slug];
                if (!d) return null;
                return (
                  <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.digitalMaturity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Digital Maturity</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.growthOpportunity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Growth Potential</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.aiReadiness}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">AI Readiness</span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-accent/10 max-w-lg">
                <span className="text-[8px] font-mono text-text-secondary/40 tracking-wider uppercase">Trusted by</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ACME</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">GLOB</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ZETA</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">NOVA</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <SnapshotSection industry={industry} />
      <BuyingJourneySection industry={industry} />
      <ChallengesSection industry={industry} />
      <GrowthOpportunitiesSection industry={industry} />
      <GrowthSystemSection industry={industry} />
      <SolutionsEcosystemSection industry={industry} />
      <ToolsShowcaseSection industry={industry} />
      <CaseStudiesSection industry={industry} />
      <StatisticsSection industry={industry} />
      <CommonMistakesSection industry={industry} />
      <TimelineSection industry={industry} />
      <FAQSection industry={industry} />
      <ResourcesSection industry={industry} />
      <IndustryAboutSection industry={industry} />
      <ProcessOverviewSection industry={industry} />
      <StrategicInsightsSection industry={industry} />
      <TestimonialsSection industry={industry} />
      <ApproachComparisonSection industry={industry} />
      <CompetitorInsightsSection industry={industry} />
      <ExploreOtherIndustriesSection industry={industry} />
      <CTA />
    </>
  );
}

function CorporateServicesPage({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <style>{animStyles}{processAnimStyles}{extendedAnimStyles}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="relative py-24 lg:py-28 bg-[#0D0C0B] overflow-hidden">
          <BriefIcnSvg />
          <HeroBg />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">Corporate Growth</span>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.5rem)] tracking-[-0.03em] leading-[0.95] text-white mb-6">
                Attract <span className="text-accent">corporate clients</span> through search.
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">{industry.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">8,200+ UK firms</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">£22.50 avg CPC</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">B2B sales cycle 30-90 days</span>
              </div>
              {(() => {
                const d = industrySnapshotData[industry.slug];
                if (!d) return null;
                return (
                  <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.digitalMaturity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Digital Maturity</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.growthOpportunity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Growth Potential</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.aiReadiness}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">AI Readiness</span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-accent/10 max-w-lg">
                <span className="text-[8px] font-mono text-text-secondary/40 tracking-wider uppercase">Trusted by</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ACME</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">GLOB</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ZETA</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">NOVA</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <SnapshotSection industry={industry} />
      <StatisticsSection industry={industry} />
      <BuyingJourneySection industry={industry} />
      <GrowthSystemSection industry={industry} />
      <ChallengesSection industry={industry} />
      <GrowthOpportunitiesSection industry={industry} />
      <CommonMistakesSection industry={industry} />
      <SolutionsEcosystemSection industry={industry} />
      <ToolsShowcaseSection industry={industry} />
      <CaseStudiesSection industry={industry} />
      <TimelineSection industry={industry} />
      <FAQSection industry={industry} />
      <ResourcesSection industry={industry} />
      <IndustryAboutSection industry={industry} />
      <ProcessOverviewSection industry={industry} />
      <StrategicInsightsSection industry={industry} />
      <TestimonialsSection industry={industry} />
      <ApproachComparisonSection industry={industry} />
      <CompetitorInsightsSection industry={industry} />
      <ExploreOtherIndustriesSection industry={industry} />
      <CTA />
    </>
  );
}

function EventsPage({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <style>{animStyles}{processAnimStyles}{extendedAnimStyles}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="relative py-24 lg:py-28 bg-ground overflow-hidden">
          <CalIconSvg />
          <HeroBg />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">Event Marketing</span>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.5rem)] tracking-[-0.03em] leading-[0.95] text-white mb-6">
                Fill seats with <span className="text-accent">search-driven</span> acquisition.
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">{industry.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">3,800+ UK organisers</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">6-8 month SEO runway</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">1.1M searches/month</span>
              </div>
              {(() => {
                const d = industrySnapshotData[industry.slug];
                if (!d) return null;
                return (
                  <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.digitalMaturity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Digital Maturity</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.growthOpportunity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Growth Potential</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.aiReadiness}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">AI Readiness</span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-accent/10 max-w-lg">
                <span className="text-[8px] font-mono text-text-secondary/40 tracking-wider uppercase">Trusted by</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ACME</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">GLOB</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ZETA</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">NOVA</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <SnapshotSection industry={industry} />
      <BuyingJourneySection industry={industry} />
      <StatisticsSection industry={industry} />
      <GrowthSystemSection industry={industry} />
      <ChallengesSection industry={industry} />
      <CommonMistakesSection industry={industry} />
      <GrowthOpportunitiesSection industry={industry} />
      <SolutionsEcosystemSection industry={industry} />
      <ToolsShowcaseSection industry={industry} />
      <CaseStudiesSection industry={industry} />
      <TimelineSection industry={industry} />
      <FAQSection industry={industry} />
      <ResourcesSection industry={industry} />
      <IndustryAboutSection industry={industry} />
      <ProcessOverviewSection industry={industry} />
      <StrategicInsightsSection industry={industry} />
      <TestimonialsSection industry={industry} />
      <ApproachComparisonSection industry={industry} />
      <CompetitorInsightsSection industry={industry} />
      <ExploreOtherIndustriesSection industry={industry} />
      <CTA />
    </>
  );
}

function ProfessionalServicesPage({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <style>{animStyles}{processAnimStyles}{extendedAnimStyles}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="relative py-24 lg:py-28 bg-[#0A0A0A] overflow-hidden">
          <BuildingIconSvg />
          <HeroBg />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">Professional Services</span>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.5rem)] tracking-[-0.03em] leading-[0.95] text-white mb-6">
                Win better clients through <span className="text-accent">authority.</span>
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">{industry.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">42,000+ UK firms</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">£15.20 avg CPC</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">78% competition level</span>
              </div>
              {(() => {
                const d = industrySnapshotData[industry.slug];
                if (!d) return null;
                return (
                  <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.digitalMaturity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Digital Maturity</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.growthOpportunity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Growth Potential</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.aiReadiness}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">AI Readiness</span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-accent/10 max-w-lg">
                <span className="text-[8px] font-mono text-text-secondary/40 tracking-wider uppercase">Trusted by</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ACME</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">GLOB</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ZETA</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">NOVA</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <SnapshotSection industry={industry} />
      <GrowthSystemSection industry={industry} />
      <ChallengesSection industry={industry} />
      <StatisticsSection industry={industry} />
      <BuyingJourneySection industry={industry} />
      <GrowthOpportunitiesSection industry={industry} />
      <CommonMistakesSection industry={industry} />
      <SolutionsEcosystemSection industry={industry} />
      <ToolsShowcaseSection industry={industry} />
      <CaseStudiesSection industry={industry} />
      <TimelineSection industry={industry} />
      <FAQSection industry={industry} />
      <ResourcesSection industry={industry} />
      <IndustryAboutSection industry={industry} />
      <ProcessOverviewSection industry={industry} />
      <StrategicInsightsSection industry={industry} />
      <TestimonialsSection industry={industry} />
      <ApproachComparisonSection industry={industry} />
      <CompetitorInsightsSection industry={industry} />
      <ExploreOtherIndustriesSection industry={industry} />
      <CTA />
    </>
  );
}

function LegalServicesPage({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <style>{animStyles}{processAnimStyles}{extendedAnimStyles}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="relative py-24 lg:py-28 bg-ground overflow-hidden">
          <GavelIcon />
          <HeroBg />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">Legal Marketing</span>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.5rem)] tracking-[-0.03em] leading-[0.95] text-white mb-6">
                Dominate <span className="text-accent">practice-area</span> search.
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">{industry.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">10,500+ UK firms</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">£35-80+ CPC</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">3.8M searches/month</span>
              </div>
              {(() => {
                const d = industrySnapshotData[industry.slug];
                if (!d) return null;
                return (
                  <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.digitalMaturity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Digital Maturity</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.growthOpportunity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Growth Potential</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.aiReadiness}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">AI Readiness</span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-accent/10 max-w-lg">
                <span className="text-[8px] font-mono text-text-secondary/40 tracking-wider uppercase">Trusted by</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ACME</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">GLOB</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ZETA</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">NOVA</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <SnapshotSection industry={industry} />
      <StatisticsSection industry={industry} />
      <ChallengesSection industry={industry} />
      <BuyingJourneySection industry={industry} />
      <GrowthSystemSection industry={industry} />
      <GrowthOpportunitiesSection industry={industry} />
      <CommonMistakesSection industry={industry} />
      <SolutionsEcosystemSection industry={industry} />
      <ToolsShowcaseSection industry={industry} />
      <CaseStudiesSection industry={industry} />
      <TimelineSection industry={industry} />
      <FAQSection industry={industry} />
      <ResourcesSection industry={industry} />
      <IndustryAboutSection industry={industry} />
      <ProcessOverviewSection industry={industry} />
      <StrategicInsightsSection industry={industry} />
      <TestimonialsSection industry={industry} />
      <ApproachComparisonSection industry={industry} />
      <CompetitorInsightsSection industry={industry} />
      <ExploreOtherIndustriesSection industry={industry} />
      <CTA />
    </>
  );
}

function CleaningPage({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <style>{animStyles}{processAnimStyles}{extendedAnimStyles}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="relative py-24 lg:py-28 bg-[#0D0C0B] overflow-hidden">
          <StarBurstIcon />
          <HeroBg />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">Cleaning & Facilities</span>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.5rem)] tracking-[-0.03em] leading-[0.95] text-white mb-6">
                Scale your cleaning business with <span className="text-accent">local SEO.</span>
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">{industry.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">22,000+ UK businesses</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">£4.20 avg CPC</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">1.9M searches/month</span>
              </div>
              {(() => {
                const d = industrySnapshotData[industry.slug];
                if (!d) return null;
                return (
                  <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.digitalMaturity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Digital Maturity</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.growthOpportunity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Growth Potential</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.aiReadiness}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">AI Readiness</span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-accent/10 max-w-lg">
                <span className="text-[8px] font-mono text-text-secondary/40 tracking-wider uppercase">Trusted by</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ACME</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">GLOB</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ZETA</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">NOVA</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <SnapshotSection industry={industry} />
      <BuyingJourneySection industry={industry} />
      <GrowthSystemSection industry={industry} />
      <StatisticsSection industry={industry} />
      <ChallengesSection industry={industry} />
      <GrowthOpportunitiesSection industry={industry} />
      <CommonMistakesSection industry={industry} />
      <SolutionsEcosystemSection industry={industry} />
      <ToolsShowcaseSection industry={industry} />
      <CaseStudiesSection industry={industry} />
      <TimelineSection industry={industry} />
      <FAQSection industry={industry} />
      <ResourcesSection industry={industry} />
      <IndustryAboutSection industry={industry} />
      <ProcessOverviewSection industry={industry} />
      <StrategicInsightsSection industry={industry} />
      <TestimonialsSection industry={industry} />
      <ApproachComparisonSection industry={industry} />
      <CompetitorInsightsSection industry={industry} />
      <ExploreOtherIndustriesSection industry={industry} />
      <CTA />
    </>
  );
}

function RealEstatePage({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <style>{animStyles}{processAnimStyles}{extendedAnimStyles}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="relative py-24 lg:py-28 bg-ground overflow-hidden">
          <MapHomeIcon />
          <HeroBg />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">Real Estate</span>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.5rem)] tracking-[-0.03em] leading-[0.95] text-white mb-6">
                Own your local <span className="text-accent">property market.</span>
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">{industry.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">18,500+ UK agencies</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">£6.80 avg CPC</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">5.2M searches/month</span>
              </div>
              {(() => {
                const d = industrySnapshotData[industry.slug];
                if (!d) return null;
                return (
                  <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.digitalMaturity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Digital Maturity</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.growthOpportunity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Growth Potential</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.aiReadiness}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">AI Readiness</span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-accent/10 max-w-lg">
                <span className="text-[8px] font-mono text-text-secondary/40 tracking-wider uppercase">Trusted by</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ACME</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">GLOB</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ZETA</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">NOVA</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <SnapshotSection industry={industry} />
      <ChallengesSection industry={industry} />
      <StatisticsSection industry={industry} />
      <BuyingJourneySection industry={industry} />
      <GrowthSystemSection industry={industry} />
      <GrowthOpportunitiesSection industry={industry} />
      <CommonMistakesSection industry={industry} />
      <SolutionsEcosystemSection industry={industry} />
      <ToolsShowcaseSection industry={industry} />
      <CaseStudiesSection industry={industry} />
      <TimelineSection industry={industry} />
      <FAQSection industry={industry} />
      <ResourcesSection industry={industry} />
      <IndustryAboutSection industry={industry} />
      <ProcessOverviewSection industry={industry} />
      <StrategicInsightsSection industry={industry} />
      <TestimonialsSection industry={industry} />
      <ApproachComparisonSection industry={industry} />
      <CompetitorInsightsSection industry={industry} />
      <ExploreOtherIndustriesSection industry={industry} />
      <CTA />
    </>
  );
}

function EcommercePage({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <style>{animStyles}{processAnimStyles}{extendedAnimStyles}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="relative py-24 lg:py-28 bg-[#0A0A0A] overflow-hidden">
          <CartIconSvg />
          <HeroBg />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">E-commerce</span>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.5rem)] tracking-[-0.03em] leading-[0.95] text-white mb-6">
                Drive <span className="text-accent">product discovery</span> through search.
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">{industry.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">52,000+ UK stores</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">£1.50 avg CPC</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">95% competition level</span>
              </div>
              {(() => {
                const d = industrySnapshotData[industry.slug];
                if (!d) return null;
                return (
                  <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.digitalMaturity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Digital Maturity</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.growthOpportunity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Growth Potential</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.aiReadiness}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">AI Readiness</span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-accent/10 max-w-lg">
                <span className="text-[8px] font-mono text-text-secondary/40 tracking-wider uppercase">Trusted by</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ACME</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">GLOB</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ZETA</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">NOVA</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <SnapshotSection industry={industry} />
      <StatisticsSection industry={industry} />
      <ChallengesSection industry={industry} />
      <GrowthSystemSection industry={industry} />
      <BuyingJourneySection industry={industry} />
      <GrowthOpportunitiesSection industry={industry} />
      <CommonMistakesSection industry={industry} />
      <SolutionsEcosystemSection industry={industry} />
      <ToolsShowcaseSection industry={industry} />
      <CaseStudiesSection industry={industry} />
      <TimelineSection industry={industry} />
      <FAQSection industry={industry} />
      <ResourcesSection industry={industry} />
      <IndustryAboutSection industry={industry} />
      <ProcessOverviewSection industry={industry} />
      <StrategicInsightsSection industry={industry} />
      <TestimonialsSection industry={industry} />
      <ApproachComparisonSection industry={industry} />
      <CompetitorInsightsSection industry={industry} />
      <ExploreOtherIndustriesSection industry={industry} />
      <CTA />
    </>
  );
}

function HospitalityPage({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <style>{animStyles}{processAnimStyles}{extendedAnimStyles}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="relative py-24 lg:py-28 bg-ground overflow-hidden">
          <StarDotsIcon />
          <HeroBg />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">Hospitality</span>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.5rem)] tracking-[-0.03em] leading-[0.95] text-white mb-6">
                Drive <span className="text-accent">direct bookings</span> and dominate local search.
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">{industry.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">28,000+ UK venues</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">£3.20 avg CPC</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">81% travellers read reviews</span>
              </div>
              {(() => {
                const d = industrySnapshotData[industry.slug];
                if (!d) return null;
                return (
                  <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.digitalMaturity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Digital Maturity</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.growthOpportunity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Growth Potential</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.aiReadiness}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">AI Readiness</span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-accent/10 max-w-lg">
                <span className="text-[8px] font-mono text-text-secondary/40 tracking-wider uppercase">Trusted by</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ACME</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">GLOB</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ZETA</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">NOVA</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <SnapshotSection industry={industry} />
      <BuyingJourneySection industry={industry} />
      <GrowthSystemSection industry={industry} />
      <ChallengesSection industry={industry} />
      <StatisticsSection industry={industry} />
      <GrowthOpportunitiesSection industry={industry} />
      <CommonMistakesSection industry={industry} />
      <SolutionsEcosystemSection industry={industry} />
      <ToolsShowcaseSection industry={industry} />
      <CaseStudiesSection industry={industry} />
      <TimelineSection industry={industry} />
      <FAQSection industry={industry} />
      <ResourcesSection industry={industry} />
      <IndustryAboutSection industry={industry} />
      <ProcessOverviewSection industry={industry} />
      <StrategicInsightsSection industry={industry} />
      <TestimonialsSection industry={industry} />
      <ApproachComparisonSection industry={industry} />
      <CompetitorInsightsSection industry={industry} />
      <ExploreOtherIndustriesSection industry={industry} />
      <CTA />
    </>
  );
}

function EducationPage({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <style>{animStyles}{processAnimStyles}{extendedAnimStyles}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="relative py-24 lg:py-28 bg-[#0D0C0B] overflow-hidden">
          <CapIconSvg />
          <HeroBg />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">Education</span>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.5rem)] tracking-[-0.03em] leading-[0.95] text-white mb-6">
                Attract students through <span className="text-accent">programme SEO.</span>
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">{industry.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">6,800+ UK institutions</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">£7.50 avg CPC</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">2.1M searches/month</span>
              </div>
              {(() => {
                const d = industrySnapshotData[industry.slug];
                if (!d) return null;
                return (
                  <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.digitalMaturity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Digital Maturity</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.growthOpportunity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Growth Potential</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.aiReadiness}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">AI Readiness</span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-accent/10 max-w-lg">
                <span className="text-[8px] font-mono text-text-secondary/40 tracking-wider uppercase">Trusted by</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ACME</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">GLOB</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ZETA</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">NOVA</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <SnapshotSection industry={industry} />
      <GrowthSystemSection industry={industry} />
      <StatisticsSection industry={industry} />
      <BuyingJourneySection industry={industry} />
      <ChallengesSection industry={industry} />
      <GrowthOpportunitiesSection industry={industry} />
      <CommonMistakesSection industry={industry} />
      <SolutionsEcosystemSection industry={industry} />
      <ToolsShowcaseSection industry={industry} />
      <CaseStudiesSection industry={industry} />
      <TimelineSection industry={industry} />
      <FAQSection industry={industry} />
      <ResourcesSection industry={industry} />
      <IndustryAboutSection industry={industry} />
      <ProcessOverviewSection industry={industry} />
      <StrategicInsightsSection industry={industry} />
      <TestimonialsSection industry={industry} />
      <ApproachComparisonSection industry={industry} />
      <CompetitorInsightsSection industry={industry} />
      <ExploreOtherIndustriesSection industry={industry} />
      <CTA />
    </>
  );
}

function LocalServicePage({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <style>{animStyles}{processAnimStyles}{extendedAnimStyles}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="relative py-24 lg:py-28 bg-ground overflow-hidden">
          <PinMapIcon />
          <HeroBg />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">Local Services</span>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.5rem)] tracking-[-0.03em] leading-[0.95] text-white mb-6">
                Get found, booked, and <span className="text-accent">paid</span> — automatically.
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">{industry.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">85,000+ UK businesses</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">£5.60 avg CPC</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">8.6M searches/month</span>
              </div>
              {(() => {
                const d = industrySnapshotData[industry.slug];
                if (!d) return null;
                return (
                  <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.digitalMaturity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Digital Maturity</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.growthOpportunity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Growth Potential</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.aiReadiness}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">AI Readiness</span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-accent/10 max-w-lg">
                <span className="text-[8px] font-mono text-text-secondary/40 tracking-wider uppercase">Trusted by</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ACME</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">GLOB</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ZETA</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">NOVA</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <SnapshotSection industry={industry} />
      <BuyingJourneySection industry={industry} />
      <ChallengesSection industry={industry} />
      <StatisticsSection industry={industry} />
      <GrowthSystemSection industry={industry} />
      <GrowthOpportunitiesSection industry={industry} />
      <CommonMistakesSection industry={industry} />
      <SolutionsEcosystemSection industry={industry} />
      <ToolsShowcaseSection industry={industry} />
      <CaseStudiesSection industry={industry} />
      <TimelineSection industry={industry} />
      <FAQSection industry={industry} />
      <ResourcesSection industry={industry} />
      <IndustryAboutSection industry={industry} />
      <ProcessOverviewSection industry={industry} />
      <StrategicInsightsSection industry={industry} />
      <TestimonialsSection industry={industry} />
      <ApproachComparisonSection industry={industry} />
      <CompetitorInsightsSection industry={industry} />
      <ExploreOtherIndustriesSection industry={industry} />
      <CTA />
    </>
  );
}

function SaaSAndTechPage({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <style>{animStyles}{processAnimStyles}{extendedAnimStyles}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="relative py-24 lg:py-28 bg-[#0A0A0A] overflow-hidden">
          <CodeBracketsIcon />
          <HeroBg />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">SaaS & Technology</span>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.5rem)] tracking-[-0.03em] leading-[0.95] text-white mb-6">
                Scale your SaaS through <span className="text-accent">product-led SEO.</span>
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">{industry.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">14,200+ UK companies</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">£12.80 avg CPC</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">92% competition level</span>
              </div>
              {(() => {
                const d = industrySnapshotData[industry.slug];
                if (!d) return null;
                return (
                  <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.digitalMaturity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Digital Maturity</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.growthOpportunity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Growth Potential</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.aiReadiness}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">AI Readiness</span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-accent/10 max-w-lg">
                <span className="text-[8px] font-mono text-text-secondary/40 tracking-wider uppercase">Trusted by</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ACME</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">GLOB</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ZETA</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">NOVA</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <SnapshotSection industry={industry} />
      <GrowthSystemSection industry={industry} />
      <ChallengesSection industry={industry} />
      <StatisticsSection industry={industry} />
      <BuyingJourneySection industry={industry} />
      <GrowthOpportunitiesSection industry={industry} />
      <CommonMistakesSection industry={industry} />
      <SolutionsEcosystemSection industry={industry} />
      <ToolsShowcaseSection industry={industry} />
      <CaseStudiesSection industry={industry} />
      <TimelineSection industry={industry} />
      <FAQSection industry={industry} />
      <ResourcesSection industry={industry} />
      <IndustryAboutSection industry={industry} />
      <ProcessOverviewSection industry={industry} />
      <StrategicInsightsSection industry={industry} />
      <TestimonialsSection industry={industry} />
      <ApproachComparisonSection industry={industry} />
      <CompetitorInsightsSection industry={industry} />
      <ExploreOtherIndustriesSection industry={industry} />
      <CTA />
    </>
  );
}

function DisabilityCarePage({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <style>{animStyles}{processAnimStyles}{extendedAnimStyles}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="relative py-24 lg:py-28 bg-ground overflow-hidden">
          <HeartIconSvg />
          <HeroBg />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">Care Services</span>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.5rem)] tracking-[-0.03em] leading-[0.95] text-white mb-6">
                Connect families with <span className="text-accent">compassionate care.</span>
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">{industry.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">5,600+ UK providers</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">£9.20 avg CPC</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">WCAG compliance essential</span>
              </div>
              {(() => {
                const d = industrySnapshotData[industry.slug];
                if (!d) return null;
                return (
                  <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.digitalMaturity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Digital Maturity</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.growthOpportunity}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">Growth Potential</span>
                    </div>
                    <div className="bg-[#181818] border border-accent/20 rounded-lg p-3 text-center">
                      <span className="text-accent font-display text-lg font-semibold block">{d.aiReadiness}%</span>
                      <span className="text-[9px] font-mono text-text-secondary/50 block">AI Readiness</span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-accent/10 max-w-lg">
                <span className="text-[8px] font-mono text-text-secondary/40 tracking-wider uppercase">Trusted by</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ACME</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">GLOB</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">ZETA</span></div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><span className="text-[7px] font-mono text-accent/60">NOVA</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <SnapshotSection industry={industry} />
      <ChallengesSection industry={industry} />
      <StatisticsSection industry={industry} />
      <BuyingJourneySection industry={industry} />
      <GrowthSystemSection industry={industry} />
      <GrowthOpportunitiesSection industry={industry} />
      <CommonMistakesSection industry={industry} />
      <SolutionsEcosystemSection industry={industry} />
      <ToolsShowcaseSection industry={industry} />
      <CaseStudiesSection industry={industry} />
      <TimelineSection industry={industry} />
      <FAQSection industry={industry} />
      <ResourcesSection industry={industry} />
      <IndustryAboutSection industry={industry} />
      <ProcessOverviewSection industry={industry} />
      <StrategicInsightsSection industry={industry} />
      <TestimonialsSection industry={industry} />
      <ApproachComparisonSection industry={industry} />
      <CompetitorInsightsSection industry={industry} />
      <ExploreOtherIndustriesSection industry={industry} />
      <CTA />
    </>
  );
}

function DefaultPage({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <style>{animStyles}{processAnimStyles}{extendedAnimStyles}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="relative py-24 lg:py-28 bg-ground overflow-hidden">
          <HeroBg />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="max-w-3xl">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent/70 mb-4 block">Industry Growth</span>
              <h1 className="font-display font-semibold text-[clamp(2.8rem,5vw,4.5rem)] tracking-[-0.03em] leading-[0.95] text-white mb-6">
                Digital growth for <span className="text-accent">{industry.name}.</span>
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed max-w-[50ch]">{industry.description}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">Tailored solutions</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">Proven methodology</span>
                <span className="text-[10px] font-mono text-accent/60 px-3 py-1.5 rounded-full border border-accent/25 bg-[#181818]">Data-driven approach</span>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      <SnapshotSection industry={industry} />
      <BuyingJourneySection industry={industry} />
      <ChallengesSection industry={industry} />
      <StatisticsSection industry={industry} />
      <GrowthSystemSection industry={industry} />
      <GrowthOpportunitiesSection industry={industry} />
      <CommonMistakesSection industry={industry} />
      <SolutionsEcosystemSection industry={industry} />
      <ToolsShowcaseSection industry={industry} />
      <CaseStudiesSection industry={industry} />
      <TimelineSection industry={industry} />
      <FAQSection industry={industry} />
      <ResourcesSection industry={industry} />
      <IndustryAboutSection industry={industry} />
      <ProcessOverviewSection industry={industry} />
      <StrategicInsightsSection industry={industry} />
      <TestimonialsSection industry={industry} />
      <ApproachComparisonSection industry={industry} />
      <CompetitorInsightsSection industry={industry} />
      <ExploreOtherIndustriesSection industry={industry} />
      <CTA />
    </>
  );
}

/* ─── MAIN EXPORT ─── */

export function IndustryDetailContent({ industry }: { industry: IndustryItem }) {
  const pages: Record<string, ({ industry }: { industry: IndustryItem }) => React.ReactNode> = {
    "dental-healthcare": DentalHealthcarePage,
    "business-setup-corporate-services": CorporateServicesPage,
    "exhibitions-events": EventsPage,
    "professional-services": ProfessionalServicesPage,
    "legal-services": LegalServicesPage,
    "cleaning-facilities": CleaningPage,
    "real-estate": RealEstatePage,
    "ecommerce": EcommercePage,
    "hospitality": HospitalityPage,
    "education": EducationPage,
    "local-service-businesses": LocalServicePage,
    "saas-technology": SaaSAndTechPage,
    "disability-care-services": DisabilityCarePage,
  };
  const Page = pages[industry.slug] || DefaultPage;
  return <Page industry={industry} />;
}

const industryTestimonials: Record<string, { quote: string; author: string; role: string; metric: string }[]> = {
  "dental-healthcare": [
    { quote: "ZON transformed our patient acquisition. We went from 12 new patients per month to over 50 just by optimising our local presence.", author: "Dr. Sarah Mitchell", role: "Principal Dentist", metric: "4.2x more patients" },
    { quote: "The automated review system alone was worth it. Our rating went from 3.8 to 4.7 in four months.", author: "James Horner", role: "Practice Manager", metric: "4.7 star rating" },
    { quote: "Our Invisalign page drives 200+ visits and 15 bookings per month.", author: "Dr. Priya Patel", role: "Orthodontist", metric: "200+ monthly visits" },
  ],
  "business-setup-corporate-services": [
    { quote: "We went from zero presence to ranking on page one for 30+ high-intent keywords in six months.", author: "Michael Chen", role: "Managing Director", metric: "30+ page 1 rankings" },
    { quote: "Their jurisdiction content strategy opened doors in three new markets for us.", author: "Sarah Williams", role: "Head of Marketing", metric: "3 new markets" },
    { quote: "The lead nurture system doubled our consultation bookings within eight weeks.", author: "David Roberts", role: "Sales Director", metric: "2x consultation bookings" },
  ],
  "exhibitions-events": [
    { quote: "SEO-driven ticket sales now account for 40% of our early-bird registrations.", author: "Emma Lewis", role: "Event Director", metric: "40% from organic" },
    { quote: "Speaker SEO alone filled 200+ seats we would have left empty.", author: "Tom Bradley", role: "Marketing Lead", metric: "200+ seats filled" },
    { quote: "Post-event content continues to drive registrations for next year's event.", author: "Rachel Green", role: "Head of Events", metric: "Year-round traffic" },
  ],
  "professional-services": [
    { quote: "Our thought leadership content now generates 60% of all inbound leads.", author: "Jonathan Blake", role: "Partner", metric: "60% of inbound leads" },
    { quote: "The methodology content approach differentiated us from every competitor in our space.", author: "Claire Davies", role: "Marketing Director", metric: "Unique positioning" },
    { quote: "We closed three six-figure engagements from content they helped us create.", author: "Marcus Webb", role: "CEO", metric: "3 six-figure deals" },
  ],
  "legal-services": [
    { quote: "Practice-area SEO doubled our family law inquiries within three months.", author: "Helen Foster", role: "Managing Partner", metric: "2x family law inquiries" },
    { quote: "Their EEAT framework got us featured in Google's top stories repeatedly.", author: "Andrew Knight", role: "Head of Digital", metric: "Top Stories featured" },
    { quote: "The intake automation saves our paralegals 20+ hours per week.", author: "Samantha Cole", role: "Operations Director", metric: "20+ hours saved weekly" },
  ],
  "cleaning-facilities": [
    { quote: "Local pack dominance increased our quote requests by 180% in three months.", author: "Peter Jackson", role: "Owner", metric: "180% more quotes" },
    { quote: "The instant response system converted 35% more quotes into booked contracts.", author: "Lisa Morton", role: "Sales Manager", metric: "35% higher conversion" },
    { quote: "Commercial cleaning contracts doubled within six months of the SEO campaign.", author: "Gary Thompson", role: "Director", metric: "2x commercial contracts" },
  ],
  "real-estate": [
    { quote: "Neighbourhood content doubled our organic buyer leads month over month.", author: "Sofia Martinez", role: "Estate Agent", metric: "2x buyer leads" },
    { quote: "Instant response automation captures leads while competitors are still checking their inbox.", author: "Oliver Hume", role: "Branch Manager", metric: "Instant lead capture" },
    { quote: "Property listing SEO generates 40% of all valuation requests now.", author: "Naomi Clark", role: "Head of Marketing", metric: "40% of valuations" },
  ],
  "ecommerce": [
    { quote: "Category page optimisation increased organic revenue by 65% in four months.", author: "Ryan Zhao", role: "E-commerce Director", metric: "65% organic revenue lift" },
    { quote: "Shopping feed optimisation lowered our CPA by 32% while scaling spend.", author: "Anika Patel", role: "Performance Marketing Lead", metric: "32% lower CPA" },
    { quote: "Post-purchase flows now drive 28% of our repeat revenue.", author: "James Cook", role: "Head of Growth", metric: "28% repeat revenue" },
  ],
  "hospitality": [
    { quote: "Direct bookings increased by 45% after the SEO and direct channel strategy.", author: "Isabel Torres", role: "Hotel General Manager", metric: "45% more direct bookings" },
    { quote: "Review management lifted our average rating from 4.0 to 4.6, directly impacting RevPAR.", author: "Daniel Grey", role: "Revenue Manager", metric: "4.6 star rating" },
    { quote: "Visual content strategy made our website the primary booking channel within months.", author: "Fiona Wright", role: "Marketing Director", metric: "Primary booking channel" },
  ],
  "education": [
    { quote: "Programme page SEO increased international applications by 55% in one recruitment cycle.", author: "Dr. Ahmed Khan", role: "Head of Admissions", metric: "55% more applications" },
    { quote: "The multi-language content strategy opened up three new international markets for us.", author: "Laura Simmons", role: "International Recruitment Lead", metric: "3 new markets" },
    { quote: "Automated nurture sequences improved our inquiry-to-enrolment rate by 40%.", author: "Richard Owen", role: "Marketing Director", metric: "40% better conversion" },
  ],
  "local-service-businesses": [
    { quote: "GBP optimisation put us in the top 3 local pack results within two weeks.", author: "Steve Harris", role: "Plumber, Harris & Co", metric: "Top 3 local pack" },
    { quote: "The review engine generated 40+ five-star reviews in the first month alone.", author: "Kelly Brooks", role: "Business Owner", metric: "40+ reviews in month 1" },
    { quote: "Online booking now handles 70% of new service requests without any staff involvement.", author: "Martin Shaw", role: "Director", metric: "70% automated bookings" },
  ],
  "saas-technology": [
    { quote: "Documentation SEO became our second-largest acquisition channel within six months.", author: "Alex Chen", role: "VP of Growth", metric: "2nd largest acquisition channel" },
    { quote: "Comparison pages against competitors drive 25% of all demo requests.", author: "Priya Sharma", role: "Head of Marketing", metric: "25% of demos" },
    { quote: "Guided trial onboarding improved our free-to-paid conversion by 35%.", author: "Tom Fletcher", role: "Product Manager", metric: "35% better trial conversion" },
  ],
  "disability-care-services": [
    { quote: "Accessibility-first redesign doubled our organic traffic from families searching for care.", author: "Caroline Bishop", role: "Director of Care", metric: "2x organic traffic" },
    { quote: "Compassionate content strategy connected us with families who had previously struggled to find support.", author: "Margaret Turner", role: "Head of Operations", metric: "More family connections" },
    { quote: "Local SEO made us the most visible care provider in our region within three months.", author: "Neil Armstrong", role: "CEO", metric: "Most visible provider" },
  ],
};

const industryApproachComparison: Record<string, { traditional: string; zon: string; impact: string }[]> = {
  "dental-healthcare": [
    { traditional: "Generic dental website with all treatments on one page", zon: "Individual treatment landing pages with local SEO and schema markup", impact: "4x more organic patient inquiries" },
    { traditional: "Manual appointment booking during office hours only", zon: "24/7 online booking with automated reminders and digital intake", impact: "35% more booked appointments" },
    { traditional: "Relying on word-of-mouth for new patients", zon: "Automated review generation pipeline with smart response system", impact: "Better local pack rankings" },
  ],
  "business-setup-corporate-services": [
    { traditional: "Generic service listings with no differentiation", zon: "Jurisdiction-specific landing pages with buyer-intent content", impact: "45% higher lead quality" },
    { traditional: "Manual lead follow-up over weeks or months", zon: "Automated nurture sequences with content-gated consultation booking", impact: "2x consultation rate" },
    { traditional: "No international SEO strategy for global clients", zon: "Multi-language content with hreflang and region-specific pages", impact: "3 new market entries" },
  ],
  "exhibitions-events": [
    { traditional: "Event marketing starts 2-3 months before show date", zon: "SEO campaigns launched 6-8 months prior with evergreen content foundation", impact: "50% more early-bird sales" },
    { traditional: "No post-event content strategy", zon: "Recording, recap and insight content capturing year-round search demand", impact: "Year-round organic traffic" },
    { traditional: "Generic speaker listings with no SEO value", zon: "Optimised speaker pages with bios, sessions and related content", impact: "200+ additional registrations" },
  ],
  "professional-services": [
    { traditional: "Website as a digital brochure with minimal content", zon: "Thought leadership engine with methodology content and case studies", impact: "60% lead increase" },
    { traditional: "LinkedIn profiles with no content strategy", zon: "Personal brand authority system with consistent publishing cadence", impact: "5x profile engagement" },
    { traditional: "No systematic follow-up for inquiries", zon: "Automated nurture with relevant content at each buying journey stage", impact: "40% shorter sales cycle" },
  ],
  "legal-services": [
    { traditional: "Thin practice area pages that Google penalises", zon: "Comprehensive practice area hubs with EEAT-optimised content", impact: "Top 10 rankings for 50+ terms" },
    { traditional: "Reviews left to chance with no management", zon: "Ethical review generation system with automated requests and responses", impact: "4.7+ average rating" },
    { traditional: "Manual intake process with slow response times", zon: "AI-powered intake automation with instant qualification and routing", impact: "24/7 lead capture" },
  ],
  "cleaning-facilities": [
    { traditional: "Incomplete GBP with no regular updates", zon: "Fully optimised GBP with services, posts, photos and Q&A management", impact: "180% more quote requests" },
    { traditional: "Quote response times measured in hours or days", zon: "Instant quote response with SMS and email automation", impact: "35% higher conversion" },
    { traditional: "No online booking or service-specific landing pages", zon: "Dedicated service pages with 24/7 booking and quote automation", impact: "2x contract volume" },
  ],
  "real-estate": [
    { traditional: "Property listings with duplicate descriptions and no SEO", zon: "Unique SEO-optimised listings with local schema and rich media", impact: "40% of valuation requests" },
    { traditional: "Lead response times of 30+ minutes", zon: "Instant response automation with showing scheduling", impact: "80% lead capture rate" },
    { traditional: "No neighbourhood-specific content strategy", zon: "Area guides, market reports and local content hubs", impact: "2x organic buyer leads" },
  ],
  "ecommerce": [
    { traditional: "Manufacturer product descriptions with no unique value", zon: "Unique product content with UGC, rich schema and buying guides", impact: "65% organic revenue lift" },
    { traditional: "Shopping feeds with errors and missing data", zon: "Fully managed feed optimisation across all shopping channels", impact: "32% lower CPA" },
    { traditional: "No post-purchase email strategy", zon: "Automated lifecycle flows from confirmation to replenishment", impact: "28% repeat revenue" },
  ],
  "hospitality": [
    { traditional: "OTA-dependent booking strategy with thin margins", zon: "Direct booking optimisation with rate parity and exclusive perks", impact: "45% more direct bookings" },
    { traditional: "Inconsistent review management", zon: "Systematic review generation with smart response automation", impact: "4.6+ star rating" },
    { traditional: "Static website with low-quality photos", zon: "Dynamic immersive website with professional visual content", impact: "Primary booking channel" },
  ],
  "education": [
    { traditional: "Thin course pages that don't answer prospect questions", zon: "Comprehensive programme pages with outcomes, faculty and alumni content", impact: "55% more applications" },
    { traditional: "No international student SEO strategy", zon: "Multi-language content with country-specific landing pages", impact: "3 new international markets" },
    { traditional: "Manual prospect follow-up between inquiry and enrolment", zon: "Automated nurture with virtual tours, deadlines and personalised content", impact: "40% better conversion" },
  ],
  "local-service-businesses": [
    { traditional: "Incomplete or unclaimed GBP profile", zon: "Fully optimised GBP with all fields, categories, posts and photos", impact: "Top 3 local pack ranking" },
    { traditional: "Waiting for reviews to come naturally", zon: "Automated SMS and email review request system", impact: "40+ reviews in month 1" },
    { traditional: "Phone-only booking during business hours", zon: "24/7 online booking with instant quoting and automated reminders", impact: "70% automated bookings" },
  ],
  "saas-technology": [
    { traditional: "Ignoring documentation as a growth channel", zon: "Comprehensive documentation SEO for long-tail and feature-specific queries", impact: "2nd largest acquisition channel" },
    { traditional: "Avoiding competitor comparison content", zon: "Objective comparison pages capturing competitor-branded search traffic", impact: "25% of all demo requests" },
    { traditional: "Free trials with no guided onboarding", zon: "Milestone-based trial experiences with in-app and email guidance", impact: "35% better trial conversion" },
  ],
  "disability-care-services": [
    { traditional: "Websites that don't meet accessibility standards", zon: "WCAG 2.1 AA compliant design with inclusive UX throughout", impact: "2x organic traffic" },
    { traditional: "Clinical, impersonal website copy", zon: "Compassionate content strategy speaking to family emotions and needs", impact: "Stronger family connections" },
    { traditional: "No systematic enquiry follow-up", zon: "Automated response with care packs, eligibility checks and booking", impact: "Faster family response" },
  ],
};

const expandedFAQs: Record<string, { q: string; a: string }[]> = {
  "dental-healthcare": [
    { q: "What's the most important technical SEO fix for dental websites?", a: "Local business schema markup and treatment-specific structured data. Most dental websites lack proper schema, making it harder for Google to understand and rank their services." },
    { q: "How do I track dental SEO ROI effectively?", a: "Track by treatment type. Set up conversion tracking for booking completions, phone calls from GBP, and contact form submissions. Average patient LTV is 4,800 so each booking is significant." },
  ],
  "business-setup-corporate-services": [
    { q: "Should I create separate websites for different jurisdictions?", a: "Generally no. Use subdirectories or hreflang tags on a single domain to consolidate authority. Separate websites dilute your SEO equity." },
    { q: "How do I compete with AI-generated corporate service content?", a: "Focus on expertise, regulatory depth, and first-hand jurisdictional experience. AI can't replicate genuine compliance knowledge and local regulatory nuance." },
  ],
  "exhibitions-events": [
    { q: "How do I rank for competitor event names?", a: "Create comparison pages, 'alternatives to X event' content, and target attendee pain points that competitor events don't solve." },
    { q: "What's the ideal event website structure for SEO?", a: "Hub-and-spoke: a central event page with dedicated sub-pages for speakers, sessions, venue, sponsors, and travel information, all interlinked." },
  ],
  "professional-services": [
    { q: "How often should we publish thought leadership content?", a: "Weekly is ideal. Consistency matters more than volume. One high-quality piece per week with proper promotion outperforms sporadic publishing." },
    { q: "What's the best way to repurpose existing client work into content?", a: "Create anonymised case studies, methodology breakdowns, and industry analysis based on client engagements. Always get permission and anonymise sensitive details." },
  ],
  "legal-services": [
    { q: "How do I handle Google's YMYL requirements for legal content?", a: "Display author credentials clearly, cite legal sources and statutes, maintain regular content updates, and link to authoritative legal databases." },
    { q: "Should law firms blog or create practice area pages?", a: "Both. Practice area pages provide foundation content for core services, while blog articles capture timely legal queries and news-related search traffic." },
  ],
  "cleaning-facilities": [
    { q: "How do I get commercial cleaning contracts through SEO?", a: "Create B2B-focused content targeting facility managers. Case studies with metrics, certification pages, and procurement-friendly service pages work best." },
    { q: "What's the best advertising platform for cleaning services?", a: "Google Local Services Ads generate the highest quality leads. Combined with GBP optimisation and a strong review profile, they dominate local results." },
  ],
  "real-estate": [
    { q: "Should estate agents list every property on their website?", a: "Yes. Each property listing is a potential search landing page. Unique descriptions and proper schema markup ensure they appear in Google's property search." },
    { q: "How do I get seller leads through SEO?", a: "Create content that positions you as the local market expert. Market reports, sold price analysis, valuation guides, and agent authority pages attract sellers." },
  ],
  "ecommerce": [
    { q: "What's the most important e-commerce SEO ranking factor?", a: "Core Web Vitals and page speed. With e-commerce competition being extremely high, technical performance is a table-stakes ranking factor." },
    { q: "How do I handle product page duplication at scale?", a: "Use canonical tags, parameter handling in Search Console, and write unique product descriptions for your top 20% of products by revenue." },
  ],
  "hospitality": [
    { q: "What's the best way to compete with OTAs for search visibility?", a: "Create rich, unique content that OTAs can't replicate. Local area guides, experience pages, photo galleries, and guest stories build unique authority." },
    { q: "How do I optimise for voice search in hospitality?", a: "Target conversational long-tail queries like 'hotels with pools near Manchester for families' and structure content with FAQ markdown." },
  ],
  "education": [
    { q: "What's the optimal page speed for education websites?", a: "Under 2.5 seconds LCP. Education prospects are often on mobile devices and slow load times significantly impact bounce rates and enrolment." },
    { q: "How do I target returning students and alumni?", a: "Create dedicated alumni content, continuing education pages, and professional development programme pages that target past student search queries." },
  ],
  "local-service-businesses": [
    { q: "How do I dominate the Google local pack?", a: "Complete every GBP field, choose the most specific categories, post weekly updates, respond to all reviews, and build consistent citations across all directories." },
    { q: "Should I target 'near me' keywords specifically?", a: "Not as exact-match keywords. Google infers local intent automatically when you have a properly optimised GBP and location-specific content." },
  ],
  "saas-technology": [
    { q: "How do I target 'alternative to X' keywords without being negative?", a: "Use objective, feature-based comparisons. Highlight where you excel without disparaging competitors. This builds trust with evaluators who are comparison shopping." },
    { q: "What's the ideal number of blog posts for SaaS SEO?", a: "Quality over quantity. 1-2 comprehensive, well-researched posts per week that target 3-5 related keywords each outperforms daily thin content." },
  ],
  "disability-care-services": [
    { q: "How do I make my care website more accessible?", a: "Start with an accessibility audit. Key fixes include proper heading hierarchy, alt text on all images, sufficient colour contrast, keyboard navigation, and screen reader compatibility." },
    { q: "What content do families find most reassuring on care websites?", a: "Staff profiles with real photos and qualifications, CQC inspection reports, family testimonials, virtual tour videos, and transparent pricing guides." },
  ],
};

const industryCompetitors: Record<string, { type: string; name: string; threat: string; opportunity: string }[]> = {
  "dental-healthcare": [
    { type: "Direct", name: "Large dental groups (e.g., Bupa Dental Care)", threat: "Brand authority and multi-location presence", opportunity: "Gap in local community content and personalised patient experience" },
    { type: "Indirect", name: "Online booking platforms", threat: "Patient acquisition via third-party sites", opportunity: "Direct booking optimisation removes dependency on platforms" },
    { type: "Emerging", name: "AI-powered dental marketplaces", threat: "Aggregated patient matching services", opportunity: "First-mover advantage with AI-optimised individual practice websites" },
  ],
  "business-setup-corporate-services": [
    { type: "Direct", name: "Established corporate service providers", threat: "Brand recognition and long-standing client relationships", opportunity: "Outdated websites with poor UX create differentiation opportunity" },
    { type: "Indirect", name: "DIY incorporation platforms", threat: "Low-cost automated alternatives for simple cases", opportunity: "Focus on complex, high-value corporate work that platforms can't handle" },
    { type: "Emerging", name: "International market entrants", threat: "New competition from offshore providers with lower pricing", opportunity: "Build UK-specific authority that international firms can't replicate" },
  ],
  "exhibitions-events": [
    { type: "Direct", name: "Major industry events with established brands", threat: "Higher authority and attendee loyalty", opportunity: "Targeted niche content attracts specific attendee segments" },
    { type: "Indirect", name: "Digital-only events and webinars", threat: "Virtual alternatives reduce physical attendance", opportunity: "Hybrid event SEO captures both physical and virtual attendee search" },
    { type: "Emerging", name: "AI-driven matchmaking platforms", threat: "Algorithmic attendee matching replaces traditional events", opportunity: "Partner with platforms rather than compete for attendee attention" },
  ],
  "professional-services": [
    { type: "Direct", name: "Big Four and large consultancies", threat: "Overwhelming brand authority and resources", opportunity: "Niche specialism content that large firms can't depth-cover" },
    { type: "Indirect", name: "Freelance consultants and solopreneurs", threat: "Lower cost structures and personal relationships", opportunity: "Process-driven methodology content showcases structured expertise" },
    { type: "Emerging", name: "AI consulting platforms", threat: "Automated advisory services for standardised needs", opportunity: "Focus on strategic, human-judgment-dependent advisory work" },
  ],
  "legal-services": [
    { type: "Direct", name: "National and international law firms", threat: "Massive SEO budgets and established domain authority", opportunity: "Local market and practice-area depth that national firms can't match" },
    { type: "Indirect", name: "Legal tech platforms and AI tools", threat: "Automated document and legal process services", opportunity: "Complex case expertise and human judgment remain irreplaceable" },
    { type: "Emerging", name: "Online legal marketplaces", threat: "Commoditisation of legal services", opportunity: "Build direct client relationships that bypass marketplace dependency" },
  ],
  "cleaning-facilities": [
    { type: "Direct", name: "National cleaning franchise groups", threat: "Multi-location brand presence and bulk purchasing", opportunity: "Local service quality and personal relationships can't be replicated" },
    { type: "Indirect", name: "On-demand cleaning apps", threat: "Instant booking and low-commitment engagement", opportunity: "Contract-based recurring revenue model wins on retention" },
    { type: "Emerging", name: "Smart building maintenance platforms", threat: "IoT-driven facility management replaces reactive cleaning", opportunity: "Partner with smart building platforms as preferred service providers" },
  ],
  "real-estate": [
    { type: "Direct", name: "Online-only estate agents", threat: "Lower fees and technology-driven experience", opportunity: "Hyper-local knowledge and personal service justify premium fees" },
    { type: "Indirect", name: "Property portals (Rightmove, Zoopla)", threat: "Aggregated listing dominance in search", opportunity: "SEO-optimised individual listings appear in Google alongside portals" },
    { type: "Emerging", name: "AI property valuation and matching platforms", threat: "Automated valuation reduces need for agent input", opportunity: "Agent authority content positions you as the indispensable local expert" },
  ],
  "ecommerce": [
    { type: "Direct", name: "Amazon and major retailers", threat: "Unbeatable product variety, price, and SEO authority", opportunity: "Unique products, brand story, and customer experience can't be matched" },
    { type: "Indirect", name: "Marketplace sellers (eBay, Etsy)", threat: "Lower prices and vast product selection", opportunity: "Dedicated brand website with rich content out-converts marketplace listings" },
    { type: "Emerging", name: "Social commerce and live shopping", threat: "New purchase channels capturing impulse demand", opportunity: "Integrate social commerce data with SEO strategy for full-funnel capture" },
  ],
  "hospitality": [
    { type: "Direct", name: "Major hotel chains", threat: "Brand loyalty programmes and marketing budgets", opportunity: "Unique property character and personalised guest experience" },
    { type: "Indirect", name: "OTAs (Booking.com, Expedia)", threat: "Dominant search presence for accommodation queries", opportunity: "Direct booking incentives and exclusive perks shift guest behaviour" },
    { type: "Emerging", name: "Short-term rental platforms (Airbnb)", threat: "Alternative accommodation options reduce hotel demand", opportunity: "Create experiences and packages that rentals can't offer" },
  ],
  "education": [
    { type: "Direct", name: "Russell Group and established universities", threat: "Powerful brand recognition and international reputation", opportunity: "Specialised programme content and personalised student experience" },
    { type: "Indirect", name: "Online learning platforms (Coursera, Udemy)", threat: "Flexible, low-cost alternatives to formal education", opportunity: "Emphasise accreditation, outcomes and in-person experience value" },
    { type: "Emerging", name: "AI-driven personalised learning providers", threat: "Adaptive learning replacing traditional programme structures", opportunity: "Hybrid programmes combining AI tools with expert instruction" },
  ],
  "local-service-businesses": [
    { type: "Direct", name: "Local competitors with established reputations", threat: "Years of local presence and word-of-mouth referrals", opportunity: "Modern digital presence outranks traditional reputation dependence" },
    { type: "Indirect", name: "National franchise local operators", threat: "Brand backing and professional marketing", opportunity: "Personal service, flexibility and local knowledge win customer trust" },
    { type: "Emerging", name: "App-based service aggregators", threat: "On-demand booking platforms commoditising services", opportunity: "Direct relationships and recurring service contracts build loyalty" },
  ],
  "saas-technology": [
    { type: "Direct", name: "Incumbent SaaS platforms in your category", threat: "Market share, brand recognition, and feature depth", opportunity: "Category-specific content, integrations and use cases they neglect" },
    { type: "Indirect", name: "Open-source alternatives", threat: "Free self-hosted alternatives to paid solutions", opportunity: "Enterprise features, support and ease-of-use differentiate from open-source" },
    { type: "Emerging", name: "AI-native SaaS built on LLMs", threat: "Rapidly evolving AI capabilities disrupt established features", opportunity: "AI integration roadmap and positioning as the AI-forward alternative" },
  ],
  "disability-care-services": [
    { type: "Direct", name: "Large national care providers", threat: "Scale, brand recognition and multi-region presence", opportunity: "Community connection and personalised care differentiate from corporate providers" },
    { type: "Indirect", name: "Local authority care services", threat: "Public sector services with established trust", opportunity: "Flexibility, specialisation and shorter wait times for private care" },
    { type: "Emerging", name: "Technology-enabled care platforms", threat: "Remote monitoring and digital care coordination", opportunity: "Embrace technology as complement to human-led care, not replacement" },
  ],
};

function TestimonialsSection({ industry }: { industry: IndustryItem }) {
  const testimonials = industryTestimonials[industry.slug] || industryTestimonials["dental-healthcare"];
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative py-28 lg:py-36 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`testimonials-${industry.slug}`} />
        <BgRadials position="center" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Client Results</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-12">
            Real results from <span className="text-accent">real {industry.name} clients.</span>
          </h2>
        </FadeIn>
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7">
            <AnimatePresence mode="popLayout">
              {testimonials.map((t, i) => (
                activeIdx === i && (
                  <motion.div
                    key={t.author}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease }}
                    className="relative bg-[#181818] border border-accent/30 rounded-[1.5rem] p-8 lg:p-10"
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                    <svg className="w-8 h-8 text-accent/20 mb-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" /></svg>
                    <p className="text-[clamp(1rem,1.5vw,1.15rem)] text-white leading-relaxed mb-6 font-medium">&ldquo;{t.quote}&rdquo;</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-display text-sm font-semibold text-white block">{t.author}</span>
                        <span className="text-[12px] text-text-secondary">{t.role}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-accent/60 tracking-wider uppercase block">Key Result</span>
                        <span className="text-sm font-display font-semibold text-accent">{t.metric}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            <div className="flex items-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${activeIdx === i ? "bg-accent w-8" : "bg-accent/25 hover:bg-accent/40"}`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 space-y-4">
            {testimonials.map((t, i) => (
              <button
                key={t.author}
                onClick={() => setActiveIdx(i)}
                className={`w-full text-left group animate-fadeIn transition-all duration-300 ${activeIdx === i ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`relative bg-[#181818] border rounded-[1.25rem] p-4 transition-all duration-300 ${activeIdx === i ? "border-accent/55" : "border-accent/20 hover:border-accent/35"}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-mono text-accent font-semibold">{t.author.split(" ").map(s => s[0]).join("")}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-medium text-white block truncate">{t.author}</span>
                      <span className="text-[10px] text-text-secondary/60 block truncate">{t.role}</span>
                    </div>
                    <div className="ml-auto shrink-0">
                      <span className="text-[9px] font-mono text-accent font-semibold">{t.metric.replace(/[^0-9xX%+.]/g, "")}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
            <div className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                  <ChartLineUp size={22} className="text-accent" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-text-secondary/60 tracking-wider uppercase block">Average Result</span>
                  <span className="font-display text-lg font-semibold text-white">
                    {Math.round(testimonials.reduce((acc, t) => {
                      const num = parseInt(t.metric.replace(/[^0-9]/g, ""));
                      return acc + (isNaN(num) ? 50 : num);
                    }, 0) / testimonials.length)}% improvement
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApproachComparisonSection({ industry }: { industry: IndustryItem }) {
  const comparisons = industryApproachComparison[industry.slug] || industryApproachComparison["dental-healthcare"];
  const icons = [XCircle, ArrowRight, CheckCircle];

  return (
    <section className="relative py-28 lg:py-36 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`approach-${industry.slug}`} />
        <BgRadials position="br" />
        <BgDots />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Our Approach</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Traditional vs. <span className="text-accent">the ZON way.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">How our approach to {industry.name.toLowerCase()} marketing differs from what most agencies deliver.</p>
        </FadeIn>
        <div className="space-y-4">
          <div className="hidden lg:grid grid-cols-12 gap-4 px-5 mb-2">
            <div className="col-span-4"><span className="text-[10px] font-mono text-danger/60 tracking-wider uppercase">Traditional Approach</span></div>
            <div className="col-span-1" />
            <div className="col-span-4"><span className="text-[10px] font-mono text-accent/60 tracking-wider uppercase">ZON Approach</span></div>
            <div className="col-span-3"><span className="text-[10px] font-mono text-text-secondary/60 tracking-wider uppercase">Impact</span></div>
          </div>
          {comparisons.map((c, i) => {
            const XIcon = icons[0] as React.ComponentType<any>;
            const ArrowIcn = icons[1] as React.ComponentType<any>;
            const CheckIcn = icons[2] as React.ComponentType<any>;
            return (
              <div key={c.traditional.slice(0, 20)}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 transition-all duration-500 hover:border-accent/55 transform-gpu">
                  <div className="grid lg:grid-cols-12 gap-4 items-center">
                    <div className="lg:col-span-4 flex items-start gap-3">
                      <XIcon size={16} className="text-danger/50 mt-0.5 shrink-0" />
                      <span className="text-[13px] text-text-secondary leading-relaxed">{c.traditional}</span>
                    </div>
                    <div className="lg:col-span-1 flex justify-center">
                      <ArrowIcn size={18} className="text-accent/40" />
                    </div>
                    <div className="lg:col-span-4 flex items-start gap-3">
                      <CheckIcn size={16} className="text-accent mt-0.5 shrink-0" />
                      <span className="text-[13px] text-white font-medium leading-relaxed">{c.zon}</span>
                    </div>
                    <div className="lg:col-span-3">
                      <div className="bg-[#1E1E1E] rounded-lg px-4 py-2.5 text-center border border-accent/15">
                        <span className="text-[11px] font-mono text-accent font-semibold block">{c.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CompetitorInsightsSection({ industry }: { industry: IndustryItem }) {
  const competitors = industryCompetitors[industry.slug] || industryCompetitors["dental-healthcare"];

  return (
    <section className="relative py-28 lg:py-36 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`competitors-${industry.slug}`} />
        <BgRadials position="tr" />
        <BgDiagonal id={`diag-comp-${industry.slug}`} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Competitor Landscape</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Know your <span className="text-accent">competition.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">Direct, indirect, and emerging competitors in the {industry.name} space and how to outmanoeuvre them.</p>
        </FadeIn>
        <div className="grid sm:grid-cols-3 gap-3">
          {competitors.map((comp, i) => {
            const typeColors: Record<string, string> = {
              Direct: "border-[#B85C5C]/40 bg-[#B85C5C]/10 text-[#B85C5C]",
              Indirect: "border-accent/30 bg-accent/10 text-accent",
              Emerging: "border-[#5CB85C]/40 bg-[#5CB85C]/10 text-[#5CB85C]",
            };
            const typeColor = typeColors[comp.type] || "border-accent/30 bg-accent/10 text-accent";
            return (
              <div key={comp.name}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-6 transition-all duration-500 hover:border-accent/55 hover:-translate-y-1 transform-gpu h-full flex flex-col">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-[8px] font-mono px-2 py-0.5 rounded-full border ${typeColor}`}>{comp.type}</span>
                  </div>
                  <h3 className="font-display text-sm font-semibold text-white mb-3">{comp.name}</h3>
                  <div className="flex-1 space-y-3">
                    <div>
                      <span className="text-[9px] font-mono text-danger/70 tracking-wider uppercase block mb-1">Threat</span>
                      <p className="text-[12px] text-text-secondary leading-relaxed">{comp.threat}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-accent tracking-wider uppercase block mb-1">Opportunity</span>
                      <p className="text-[12px] text-white/70 leading-relaxed">{comp.opportunity}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const industryTrends: Record<string, { trend: string; desc: string; impact: string; timeline: string }[]> = {
  "dental-healthcare": [
    { trend: "Patient Experience Economy", desc: "Patients now expect consumer-grade digital experiences from healthcare providers, including online booking, digital intake, and telemedicine options.", impact: "Practices with modern digital experiences capture 40% more new patients", timeline: "Already in motion" },
    { trend: "AI-Powered Diagnostics Marketing", desc: "AI-assisted diagnostic tools are becoming a differentiator. Practices marketing these capabilities attract tech-forward patients willing to pay premium rates.", impact: "Premium pricing power for AI-adopting practices", timeline: "1-2 years to mainstream" },
    { trend: "Reputation as Currency", desc: "Online reputation has become the primary decision factor for 78% of patients choosing a new dentist. Review volume and rating directly impact revenue.", impact: "Review quality determines market share", timeline: "Accelerating" },
  ],
  "business-setup-corporate-services": [
    { trend: "Regulatory Complexity Wave", desc: "Increasing regulatory complexity across jurisdictions is driving demand for expert corporate services. Firms that publish regulatory content capture this demand.", impact: "Growing total addressable market for expert services", timeline: "Accelerating" },
    { trend: "Remote Incorporation Boom", desc: "Post-pandemic, businesses are incorporating remotely at record rates. Digital-first corporate service firms capture this geographically distributed demand.", impact: "Expanded geographic reach for digital-first firms", timeline: "Already in motion" },
    { trend: "ESG Compliance Requirements", desc: "New ESG reporting requirements create demand for specialised advisory services. First-mover content advantage is significant.", impact: "New high-value service line opportunity", timeline: "1-2 years" },
  ],
  "exhibitions-events": [
    { trend: "Hybrid Event Dominance", desc: "Hybrid events are now the standard. Organisers optimising for both physical and virtual attendance capture larger audiences and diversified revenue.", impact: "2x addressable audience for hybrid-optimised events", timeline: "Already in motion" },
    { trend: "AI Matchmaking Experiences", desc: "AI-powered attendee networking and matchmaking are becoming key differentiators. Events offering personalised experiences command premium ticket pricing.", impact: "Higher ticket prices and attendee satisfaction", timeline: "1-2 years" },
    { trend: "Content-as-a-Service", desc: "Event content is being repackaged as year-round subscription services. This creates recurring revenue between annual events.", impact: "New recurring revenue stream", timeline: "Emerging" },
  ],
  "professional-services": [
    { trend: "Trust Deficit Opportunity", desc: "With AI-generated content flooding the market, genuine expertise is increasingly valuable. Firms demonstrating real-world experience command premium rates.", impact: "Premium pricing for demonstrated expertise", timeline: "Already in motion" },
    { trend: "Specialist Over Generalist", desc: "The market increasingly rewards deep specialisation over broad generalist offerings. Niche expertise commands higher rates and shorter sales cycles.", impact: "Rate premium for specialist firms", timeline: "Accelerating" },
    { trend: "Results-Based Engagement", desc: "Clients increasingly demand outcome-based pricing and results measurement. Firms with transparent metrics win more competitive bids.", impact: "Higher close rates for metric-driven firms", timeline: "1-2 years" },
  ],
  "legal-services": [
    { trend: "Consumerisation of Legal", desc: "Clients expect Amazon-like experiences from law firms. Instant booking, transparent pricing, and digital case management are becoming table stakes.", impact: "Digital-forward firms capture growing market share", timeline: "Already in motion" },
    { trend: "AI in Legal Research and Drafting", desc: "AI is transforming legal research and document drafting. Firms marketing AI-augmented services differentiate on efficiency and cost.", impact: "Operational cost advantage for AI adopters", timeline: "Already in motion" },
    { trend: "Remote Legal Services", desc: "Post-pandemic acceptance of remote legal services has expanded addressable markets. Firms serving clients across geographic boundaries grow faster.", impact: "Expanded geographic reach and client base", timeline: "Accelerating" },
  ],
  "cleaning-facilities": [
    { trend: "Health-Conscious Cleaning Demand", desc: "Post-pandemic awareness of hygiene has permanently elevated demand for professional cleaning. Businesses prioritise certified, transparent cleaning services.", impact: "Growing premium cleaning service market", timeline: "Already in motion" },
    { trend: "Smart Facility Integration", desc: "IoT sensors and smart building systems are creating demand for tech-enabled cleaning services that provide data-driven reporting and scheduling.", impact: "Higher contract values for tech-enabled providers", timeline: "1-2 years" },
    { trend: "Green Cleaning Certification", desc: "Eco-friendly cleaning certification is becoming a competitive requirement for commercial contracts. Providers with green credentials win bids at premium rates.", impact: "Premium pricing for certified providers", timeline: "Accelerating" },
  ],
  "real-estate": [
    { trend: "Digital-First Buyer Journey", desc: "97% of home buyers start their search online. Agents with comprehensive digital presence capture buyers before traditional competitors even know they exist.", impact: "First-mover advantage in buyer acquisition", timeline: "Already in motion" },
    { trend: "Instant Valuation and AI Pricing", desc: "AI-powered valuation tools are changing how properties are priced. Agents offering instant online valuations capture more seller leads.", impact: "Higher lead conversion for agents with digital tools", timeline: "Already in motion" },
    { trend: "Virtual Viewing Standard", desc: "Virtual tours and video viewings are now expected, not optional. Properties with virtual tours sell 31% faster and at higher prices.", impact: "Faster sales cycles and higher sale prices", timeline: "New normal" },
  ],
  "ecommerce": [
    { trend: "Social Commerce Integration", desc: "Social platforms are becoming primary discovery channels. E-commerce brands integrating social commerce with SEO capture full-funnel traffic.", impact: "Multi-channel acquisition advantage", timeline: "Accelerating" },
    { trend: "AI Personalisation at Scale", desc: "AI-powered product recommendations and personalised shopping experiences are converting at 3x the rate of generic experiences.", impact: "3x higher conversion for personalised stores", timeline: "Already in motion" },
    { trend: "Sustainability as Differentiator", desc: "67% of consumers consider sustainability in purchase decisions. Brands communicating sustainability credentials authentically win conscious consumers.", impact: "Premium pricing and customer loyalty", timeline: "Accelerating" },
  ],
  "hospitality": [
    { trend: "Experience Over Accommodation", desc: "Guests increasingly book based on experiences and amenities, not just rooms. Venues marketing unique experiences command premium rates.", impact: "Higher RevPAR for experience-driven venues", timeline: "Already in motion" },
    { trend: "Direct Booking Renaissance", desc: "Post-pandemic, guests prefer direct booking for flexibility and value. Venues optimising direct channels reduce OTA commission costs significantly.", impact: "10-15% margin improvement through direct bookings", timeline: "Accelerating" },
    { trend: "Bleisure Travel Growth", desc: "The blend of business and leisure travel is creating new demand patterns. Venues capturing bleisure travellers fill mid-week capacity.", impact: "Improved mid-week occupancy rates", timeline: "Already in motion" },
  ],
  "education": [
    { trend: "Lifelong Learning Demand", desc: "Continuous upskilling and reskilling are driving enrolment growth. Institutions offering modular, stackable programmes attract non-traditional students.", impact: "Growing addressable student market", timeline: "Accelerating" },
    { trend: "AI in Education Marketing", desc: "AI-powered personalisation in student recruitment is becoming standard. Institutions using AI see 40% higher conversion from inquiry to application.", impact: "Higher enrolment conversion rates", timeline: "Already in motion" },
    { trend: "Global Competition Intensifies", desc: "International student recruitment is more competitive than ever. Institutions with sophisticated multi-language SEO win the global talent race.", impact: "International market share growth for SEO-optimised institutions", timeline: "Already in motion" },
  ],
  "local-service-businesses": [
    { trend: "Instant Service Economy", desc: "Consumers expect immediate response and booking. Service businesses with instant quote and booking systems capture 70% more leads.", impact: "70% lead capture advantage for instant responders", timeline: "Already in motion" },
    { trend: "Review-Driven Selection", desc: "95% of consumers read reviews before hiring a local service. Review volume and rating directly determine which businesses get called.", impact: "Review dominance equals market dominance", timeline: "Already in motion" },
    { trend: "Mobile-First Service Discovery", desc: "Most local service searches happen on mobile. Businesses with mobile-optimised websites and GBP dominate local discovery.", impact: "Local market dominance for mobile-optimised businesses", timeline: "New normal" },
  ],
  "saas-technology": [
    { trend: "Product-Led Growth Meets SEO", desc: "PLG companies investing in SEO grow 2x faster than those relying on sales-led acquisition alone. Documentation and feature SEO drive organic trial signups.", impact: "2x growth rate for PLG + SEO companies", timeline: "Already in motion" },
    { trend: "AI-Native Feature Differentiation", desc: "AI features are becoming table stakes. SaaS companies marketing proprietary AI capabilities command premium pricing and win competitive evaluations.", impact: "Premium pricing for AI-differentiated SaaS", timeline: "Accelerating" },
    { trend: "Category Creation Over Competition", desc: "The most successful SaaS companies create new categories rather than compete in existing ones. Content-led category creation drives first-mover advantage.", impact: "Category leadership = market leadership", timeline: "Long-term trend" },
  ],
  "disability-care-services": [
    { trend: "Personalisation in Care", desc: "Families increasingly expect personalised care plans and transparent digital reporting. Providers offering family portals and real-time updates win preference.", impact: "Higher family satisfaction and retention", timeline: "Already in motion" },
    { trend: "Technology-Enabled Care Models", desc: "Remote monitoring, telehealth, and digital care coordination are becoming standard. Tech-enabled providers deliver better outcomes at lower costs.", impact: "Operational efficiency and improved outcomes", timeline: "Accelerating" },
    { trend: "Workforce Digital Tools", desc: "Care workforce shortages make digital tools for scheduling, communication, and training critical. Providers using digital tools retain staff 40% longer.", impact: "Better staff retention and care consistency", timeline: "Already in motion" },
  ],
};

function StrategicInsightsSection({ industry }: { industry: IndustryItem }) {
  const trends = industryTrends[industry.slug] || industryTrends["dental-healthcare"];
  const [openInsight, setOpenInsight] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`trends-${industry.slug}`} />
        <BgRadials position="tr" />
        <BgDots />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Strategic Insights</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            What&rsquo;s shaping <span className="text-accent">{industry.name}</span> right now.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">Market trends, shifts, and dynamics that should inform your digital strategy.</p>
        </FadeIn>
        <div className="grid lg:grid-cols-3 gap-3 mb-8">
          {trends.map((t, i) => (
            <div key={t.trend}
              className="animate-fadeIn"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                onClick={() => setOpenInsight(openInsight === i ? null : i)}
                className={`relative bg-[#181818] border rounded-[1.25rem] p-5 transition-all duration-500 cursor-pointer h-full group ${
                  openInsight === i ? "border-accent/55" : "border-accent/25 hover:border-accent/45"
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase px-2 py-0.5 rounded-full border border-accent/20">{t.timeline}</span>
                  <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full ${
                    t.timeline === "Already in motion" ? "text-[#5CB85C] border-[#5CB85C]/30 bg-[#5CB85C]/10" :
                    t.timeline === "Accelerating" ? "text-accent border-accent/30 bg-accent/10" :
                    "text-text-secondary border-accent/20 bg-[#181818]"
                  }`}>{t.timeline === "Already in motion" ? "Active" : t.timeline === "Accelerating" ? "Growing" : "Emerging"}</span>
                </div>
                <h3 className="font-display text-sm font-semibold text-white mb-2">{t.trend}</h3>
                <p className="text-[12px] text-text-secondary leading-relaxed">{openInsight === i ? t.desc : t.desc.slice(0, 80) + "..."}</p>
                {openInsight === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-accent/10">
                      <span className="text-[9px] font-mono text-accent tracking-wider uppercase block mb-1">Impact</span>
                      <p className="text-[13px] text-white leading-relaxed">{t.impact}</p>
                    </div>
                  </motion.div>
                )}
                <div className="mt-3 flex items-center gap-1 text-[10px] text-accent/50">
                  <span>{openInsight === i ? "Show less" : "Show impact"}</span>
                  <CaretDown size={10} className={`transition-transform duration-300 ${openInsight === i ? "rotate-180" : ""}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessOverviewSection({ industry }: { industry: IndustryItem }) {
  const processes = [
    { step: "01", title: "Discover", desc: "We dive deep into your business, market, competitors, and customers to understand exactly where the opportunities lie.", icon: MagnifyingGlass, outcome: "Complete market intelligence and opportunity map" },
    { step: "02", title: "Strategise", desc: "We build a tailored roadmap that aligns with your goals, budget, and timeline, prioritising highest-impact activities first.", icon: MapPin, outcome: "Clear, prioritised action plan with expected timelines" },
    { step: "03", title: "Execute", desc: "Our team implements the strategy with precision, using proven frameworks and continuous optimisation throughout.", icon: Gear, outcome: "Campaigns live and generating measurable results" },
    { step: "04", title: "Measure", desc: "We track every metric that matters, providing transparent reporting and data-driven adjustments to maximise results.", icon: ChartLineUp, outcome: "Full visibility into performance and ROI" },
    { step: "05", title: "Scale", desc: "Once the system is proven, we scale winning channels and expand into new opportunities for compounding growth.", icon: Rocket, outcome: "Compounding growth and market leadership position" },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`process-${industry.slug}`} />
        <BgRadials position="center" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Our Process</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            How we deliver <span className="text-accent">results.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">A proven 5-phase process that has delivered measurable results for {industry.name} businesses.</p>
        </FadeIn>
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-12 left-[calc(10%+1.5rem)] right-[calc(10%+1.5rem)] h-px bg-gradient-to-r from-accent/30 via-accent/10 to-accent/30" />
            <div className="grid grid-cols-5 gap-6">
              {processes.map((p, i) => {
                const ProcIcon = p.icon as React.ComponentType<any>;
                return (
                  <div key={p.step}
                    className="animate-fadeIn text-center"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#181818] border border-accent/40 flex items-center justify-center mx-auto mb-4 transition-all duration-500 hover:border-accent/60 hover:scale-110 transform-gpu">
                      <ProcIcon size={22} className="text-accent" />
                    </div>
                    <span className="text-[8px] font-mono text-accent/50 tracking-wider uppercase block mb-2">Phase {p.step}</span>
                    <h3 className="font-display text-sm font-semibold text-white mb-2">{p.title}</h3>
                    <p className="text-[11px] text-text-secondary leading-relaxed max-w-[20ch] mx-auto mb-3">{p.desc}</p>
                    <div className="pt-3 border-t border-accent/10">
                      <span className="text-[7px] font-mono text-accent/50 tracking-wider uppercase block mb-0.5">Deliverable</span>
                      <p className="text-[9px] text-white/60 leading-relaxed">{p.outcome}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lg:hidden overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4">
          <div className="flex gap-4 w-max pb-4">
            {processes.map((p, i) => {
              const ProcIcon = p.icon as React.ComponentType<any>;
              return (
                <div key={p.step} className="snap-center w-[200px] shrink-0 animate-fadeIn" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 text-center">
                    <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-3">
                      <ProcIcon size={18} className="text-accent" />
                    </div>
                    <span className="text-[8px] font-mono text-accent/50 tracking-wider uppercase block mb-1">Phase {p.step}</span>
                    <h3 className="font-display text-sm font-semibold text-white mb-1">{p.title}</h3>
                    <p className="text-[10px] text-text-secondary leading-relaxed mb-2">{p.desc}</p>
                    <div className="pt-2 border-t border-accent/10">
                      <span className="text-[6px] font-mono text-accent/50 tracking-wider uppercase block mb-0.5">Outcome</span>
                      <p className="text-[8px] text-white/60 leading-relaxed">{p.outcome}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const processAnimStyles = `
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes breathe { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  @keyframes rotateGradient { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes floatUp { 0% { transform: translateY(0px); } 50% { transform: translateY(-4px); } 100% { transform: translateY(0px); } }
  @keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 4px rgba(212,168,73,0.1); } 50% { box-shadow: 0 0 16px rgba(212,168,73,0.2); } }
  .animate-shimmer { background: linear-gradient(90deg, transparent 0%, rgba(212,168,73,0.05) 50%, transparent 100%); background-size: 200% 100%; animation: shimmer 3s infinite; }
  .animate-breathe { animation: breathe 3s ease-in-out infinite; }
  .animate-float { animation: floatUp 3s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
`;

function IndustryAboutSection({ industry }: { industry: IndustryItem }) {
  const snapshot = industrySnapshotData[industry.slug] || industrySnapshotData["dental-healthcare"];
  const stats = industryStats[industry.slug] || industryStats["dental-healthcare"];
  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id={`about-${industry.slug}`} />
        <BgRadials position="bl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">About This Industry</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Why <span className="text-accent">{industry.name}</span> matters.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">Understanding the unique characteristics of this sector helps us build strategies that deliver measurable results.</p>
        </FadeIn>
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          <div className="space-y-4">
            <p className="text-text-secondary leading-relaxed">{industry.description}</p>
            <p className="text-text-secondary leading-relaxed">The {industry.name} sector is undergoing rapid digital transformation. With {snapshot.searchDemand}/100 search demand and only {snapshot.digitalMaturity}% digital maturity, there is significant opportunity for businesses that invest in modern digital acquisition strategies.</p>
            <p className="text-text-secondary leading-relaxed">Competition in this space is {snapshot.competitionLevel.toLowerCase()} at {snapshot.competitionPct}%, meaning businesses need a strategic, data-driven approach to stand out. The average lead value of &pound;{snapshot.avgLeadValue.toLocaleString()} makes every conversion highly valuable, and the {snapshot.aiReadiness}% AI readiness score indicates growing adoption of intelligent marketing technologies.</p>
            <div className="flex items-center gap-3 pt-2">
              <Link href="/contact" className="inline-flex items-center gap-2 text-[13px] text-accent hover:text-accent/80 transition-colors">
                Discuss your opportunity <ArrowRight size={11} />
              </Link>
              <span className="text-[9px] font-mono text-text-secondary/40">or</span>
              <Link href="/work" className="text-[13px] text-text-secondary hover:text-white transition-colors">
                View our work
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Search Demand", value: `${snapshot.searchDemand}/100` },
                { label: "Growth Opportunity", value: `${snapshot.growthOpportunity}%` },
                { label: "Digital Maturity", value: `${snapshot.digitalMaturity}%` },
                { label: "Competition Level", value: snapshot.competitionLevel },
              ].map((item) => (
                <div key={item.label} className="bg-[#181818] border border-accent/20 rounded-[1.25rem] p-4">
                  <span className="text-[9px] font-mono text-text-secondary/50 block mb-1">{item.label}</span>
                  <span className="font-display text-lg font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#181818] border border-accent/20 rounded-[1.25rem] p-4">
              <span className="text-[9px] font-mono text-text-secondary/50 block mb-2">Market Context</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] font-mono text-text-secondary/60">Monthly Volume</span>
                  <span className="font-display text-base font-semibold text-white block">{stats.searchVolume}</span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-text-secondary/60">Avg CPC</span>
                  <span className="font-display text-base font-semibold text-white block">{stats.cpc}</span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-text-secondary/60">Conversion Rate</span>
                  <span className="font-display text-base font-semibold text-white block">{stats.avgConversionRate}%</span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-text-secondary/60">Customer LTV</span>
                  <span className="font-display text-base font-semibold text-white block">&pound;{stats.customerLTV.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const extendedAnimStyles = `
  @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes expandWidth { from { width: 0; } to { width: 100%; } }
  @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes gradientFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  @keyframes shimmerCard { 0% { background-position: -100% 0; } 100% { background-position: 200% 0; } }
  @keyframes pulseDot { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 0.8; transform: scale(1.2); } }
  @keyframes rotateIn { from { opacity: 0; transform: rotate(-10deg) scale(0.9); } to { opacity: 1; transform: rotate(0deg) scale(1); } }
  @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
  @keyframes flipIn { from { opacity: 0; transform: perspective(400px) rotateX(90deg); } to { opacity: 1; transform: perspective(400px) rotateX(0deg); } }
  @keyframes drawLine { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
  @keyframes fillUp { from { height: 0; } to { height: 100%; } }
  @keyframes ripple { 0% { box-shadow: 0 0 0 0 rgba(212,168,73,0.3); } 100% { box-shadow: 0 0 0 20px rgba(212,168,73,0); } }
  @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }
  @keyframes dropIn { from { opacity: 0; transform: translateY(-20px) scaleY(0.8); } to { opacity: 1; transform: translateY(0) scaleY(1); } }
  @keyframes blurIn { from { opacity: 0; filter: blur(10px); } to { opacity: 1; filter: blur(0); } }
  @keyframes slideUpFade { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes cardEnter { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes statReveal { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes borderTrace { 0% { stroke-dashoffset: 400; } 100% { stroke-dashoffset: 0; } }
  @keyframes numberCount { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes progressFill { from { width: 0; } to { width: var(--progress-width); } }
  @keyframes accordionOpen { from { opacity: 0; max-height: 0; transform: translateY(-8px); } to { opacity: 1; max-height: 500px; transform: translateY(0); } }
  @keyframes accordionClose { from { opacity: 1; max-height: 500px; transform: translateY(0); } to { opacity: 0; max-height: 0; transform: translateY(-8px); } }
  @keyframes shimmerGradient { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes floatHorizontal { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
  @keyframes scalePulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
  @keyframes badgePop { 0% { opacity: 0; transform: scale(0.5); } 70% { transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }
  @keyframes slideInRightStagger { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slideInLeftStagger { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes growFromCenter { from { opacity: 0; transform: scaleX(0); } to { opacity: 1; transform: scaleX(1); } }
  .animate-slide-left { animation: slideInLeft 0.5s both ease-out; }
  .animate-slide-right { animation: slideInRight 0.5s both ease-out; }
  .animate-expand-width { animation: expandWidth 0.8s both ease-out; }
  .animate-fade-scale { animation: fadeInScale 0.4s both ease-out; }
  .animate-gradient { background-size: 200% 200%; animation: gradientFlow 4s ease infinite; }
  .animate-shimmer-card { background: linear-gradient(90deg, transparent 0%, rgba(212,168,73,0.03) 50%, transparent 100%); background-size: 200% 100%; animation: shimmerCard 2.5s infinite; }
  .animate-pulse-dot { animation: pulseDot 2s ease-in-out infinite; }
  .animate-rotate-in { animation: rotateIn 0.5s both ease-out; }
  .animate-bounce-in { animation: bounceIn 0.6s both cubic-bezier(0.68, -0.55, 0.265, 1.55); }
  .animate-flip-in { animation: flipIn 0.6s both ease-out; }
  .animate-ripple { animation: ripple 1s ease-out infinite; }
  .animate-wiggle { animation: wiggle 0.4s ease-in-out; }
  .animate-drop-in { animation: dropIn 0.4s both ease-out; }
  .animate-blur-in { animation: blurIn 0.5s both ease-out; }
  .animate-slide-up-fade { animation: slideUpFade 0.6s both ease-out; }
  .animate-card-enter { animation: cardEnter 0.5s both ease-out; }
  .animate-stat-reveal { animation: statReveal 0.4s both ease-out; }
  .animate-number-count { animation: numberCount 0.3s both ease-out; }
  .animate-float-horizontal { animation: floatHorizontal 3s ease-in-out infinite; }
  .animate-scale-pulse { animation: scalePulse 2s ease-in-out infinite; }
  .animate-badge-pop { animation: badgePop 0.4s both ease-out; }
  .animate-grow-center { animation: growFromCenter 0.6s both ease-out; }
  .animate-fade-in-up { animation: slideUpFade 0.5s both ease-out; }
  .animate-scale-fade { animation: fadeInScale 0.4s both ease-out; }
  .animate-blur-fade { animation: blurIn 0.6s both ease-out; }
  .animate-rotate-scale { animation: rotateIn 0.5s both ease-out; }
  .animate-bounce-scale { animation: bounceIn 0.6s both cubic-bezier(0.68, -0.55, 0.265, 1.55); }
  .scrollbar-none::-webkit-scrollbar { display: none; }
  .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }
  @media (max-width: 640px) { .mobile-full { width: 100% !important; max-width: 100% !important; } }
  @media (min-width: 641px) and (max-width: 1024px) { .tablet-half { width: 50% !important; } }
  .glass-effect { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
  .text-balance { text-wrap: balance; }
  .text-pretty { text-wrap: pretty; }
  .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; }
  .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  .line-clamp-3 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
  .line-clamp-4 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4; }
  .bg-grid-pattern { background-image: linear-gradient(rgba(212,168,73,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,73,0.03) 1px, transparent 1px); background-size: 32px 32px; }
  .bg-dot-pattern { background-image: radial-gradient(rgba(212,168,73,0.1) 1px, transparent 1px); background-size: 24px 24px; }
  .bg-accent-gradient { background: linear-gradient(135deg, rgba(212,168,73,0.12) 0%, transparent 50%, rgba(212,168,73,0.04) 100%); }
  .text-gradient-accent { background: linear-gradient(135deg, #D4A849 0%, #F2EDE6 50%, #D4A849 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .border-gradient-accent { border-image: linear-gradient(135deg, rgba(212,168,73,0.4), transparent, rgba(212,168,73,0.4)) 1; }
  .shadow-accent-sm { box-shadow: 0 1px 3px rgba(212,168,73,0.08), 0 1px 2px rgba(212,168,73,0.04); }
  .shadow-accent-md { box-shadow: 0 4px 6px rgba(212,168,73,0.06), 0 2px 4px rgba(212,168,73,0.04); }
  .shadow-accent-lg { box-shadow: 0 10px 25px rgba(212,168,73,0.08), 0 4px 10px rgba(212,168,73,0.04); }
  .shadow-accent-xl { box-shadow: 0 20px 50px rgba(212,168,73,0.1), 0 8px 20px rgba(212,168,73,0.05); }
  .ring-accent { ring: 1px solid rgba(212,168,73,0.3); }
  .ring-accent-sm { ring: 0.5px solid rgba(212,168,73,0.15); }
  .ring-accent-md { ring: 1.5px solid rgba(212,168,73,0.4); }
  .truncate-2 { overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .truncate-3 { overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;
