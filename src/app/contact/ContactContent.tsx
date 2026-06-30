"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Rocket,
  TrendUp,
  ChartLineUp,
  Star,
  CheckCircle,
  Users,
  MagnifyingGlass,
  Gear,
  Code,
  Robot,
  PaperPlaneTilt,
  Buildings,
  CalendarBlank,
  CaretDown,
  ChatCircle,
  Handshake,
  Briefcase,
  Timer,
  ListChecks,
  FileText,
  CurrencyCircleDollar,

} from "@phosphor-icons/react";
import ShapeGrid from "@/components/ShapeGrid";
import LeadIntelligenceEngine, { LeadEngineTrigger } from "@/components/LeadIntelligenceEngine";

const ease = [0.32, 0.72, 0, 1] as const;

/* ─── Mobile CSS Variables ─── */

const mobileVars = {
  "--contact-pad": "clamp(16px, 4.8vw, 20px)",
  "--contact-section": "clamp(58px, 15vw, 80px)",
  "--contact-compact": "clamp(42px, 11vw, 60px)",
  "--contact-card-radius": "18px",
  "--contact-card-pad": "clamp(14px, 4vw, 18px)",
  "--contact-card-gap": "clamp(12px, 3.2vw, 16px)",
} as React.CSSProperties;

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
    <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.05] text-text-primary mb-6">
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

const businessTypes = [
  { id: "startup", label: "Startup", desc: "0-2 years, building foundation", icon: Rocket },
  { id: "growth", label: "Growth Stage", desc: "2-5 years, scaling traction", icon: TrendUp },
  { id: "scaling", label: "Scaling", desc: "5+ years, expanding markets", icon: ChartLineUp },
  { id: "enterprise", label: "Enterprise", desc: "Established, complex operations", icon: Buildings },
];

const goalOptions = [
  { id: "traffic", label: "Traffic", desc: "Increase organic & paid visibility", icon: MagnifyingGlass },
  { id: "leads", label: "Leads", desc: "Convert more visitors into customers", icon: Users },
  { id: "automation", label: "Automation", desc: "Automate workflows & operations", icon: Gear },
  { id: "software", label: "Software", desc: "Build custom platforms & tools", icon: Code },
  { id: "ai", label: "AI", desc: "Leverage AI agents & content systems", icon: Robot },
  { id: "revenue", label: "Revenue", desc: "Optimise pricing & monetisation", icon: CurrencyCircleDollar },
];

const blockerOptions = [
  { id: "visibility", label: "Low Visibility", desc: "Not showing up where customers search" },
  { id: "conversion", label: "Poor Conversion", desc: "Traffic isn't turning into revenue" },
  { id: "tech", label: "Technical Debt", desc: "Outdated infrastructure slowing growth" },
  { id: "team", label: "Team Capacity", desc: "Don't have the right people or skills" },
  { id: "data", label: "No Data", desc: "Making decisions without real insights" },
  { id: "strategy", label: "Unclear Strategy", desc: "No clear roadmap or growth system" },
];

const budgetRanges = [
  "Under $5K/mo",
  "$5K – $10K/mo",
  "$10K – $25K/mo",
  "$25K – $50K/mo",
  "$50K+/mo",
  "Not sure yet",
];

const journeyPaths = [
  {
    icon: ChatCircle,
    title: "Talk to an Expert",
    response: "~2 hours",
    best: "Quick questions & guidance",
    desc: "Have a specific question? Get direct answers from our strategists without any commitment.",
  },
  {
    icon: CalendarBlank,
    title: "Book Strategy Call",
    response: "~24 hours",
    best: "Deep-dive consultations",
    desc: "A 30-minute call to review your goals, run a quick audit, and map out what's possible.",
  },
  {
    icon: FileText,
    title: "Request Proposal",
    response: "~48 hours",
    best: "Detailed project plans",
    desc: "Share your brief and we'll craft a custom proposal with scope, timeline, and investment.",
  },
  {
    icon: MagnifyingGlass,
    title: "Get Free Audit",
    response: "Instant",
    best: "See exactly what's needed",
    desc: "Get a no-obligation audit of your current digital presence with actionable recommendations.",
  },
  {
    icon: Handshake,
    title: "Partnership Inquiry",
    response: "~24 hours",
    best: "Agency partnerships & referrals",
    desc: "Looking to collaborate? We're open to strategic partnerships and referral arrangements.",
  },
  {
    icon: Briefcase,
    title: "Join Our Team",
    response: "~1 week",
    best: "Career opportunities",
    desc: "Explore open roles and submit your application to join our team across 3 continents.",
  },
  {
    icon: Star,
    title: "Media Inquiry",
    response: "~4 hours",
    best: "Press, podcasts & speaking",
    desc: "For media requests, guest appearances, or conference speaking opportunities.",
  },
];

const processSteps = [
  { step: "01", title: "Submit Form", desc: "Tell us about your business, goals, and what you're looking for.", icon: PaperPlaneTilt },
  { step: "02", title: "We Review", desc: "Our team reviews your submission and prepares initial insights.", icon: MagnifyingGlass },
  { step: "03", title: "Strategy Session", desc: "A 30-minute discovery call to dive deep into your needs.", icon: CalendarBlank },
  { step: "04", title: "Growth Audit", desc: "We analyse your current digital presence and identify opportunities.", icon: ListChecks },
  { step: "05", title: "Custom Proposal", desc: "A detailed plan with scope, timeline, investment, and expected ROI.", icon: FileText },
  { step: "06", title: "Kickoff", desc: "Onboarding begins. We set up systems, dashboards, and start delivering.", icon: Rocket },
];

const consultants = [
  { name: "Omar Al-Rashid", role: "Founder & CEO", expertise: "Strategy & Growth", years: 15, industries: "SaaS, Fintech, Real Estate", languages: "English, Arabic", response: "< 2 hours", initials: "OA" },
  { name: "Lena Chen", role: "Head of SEO", expertise: "Technical SEO & GEO", years: 11, industries: "E-Commerce, Healthcare, Tech", languages: "English, Mandarin", response: "< 1 hour", initials: "LC" },
  { name: "Ravi Patel", role: "CTO", expertise: "Architecture & AI", years: 14, industries: "Fintech, SaaS, Logistics", languages: "English, Hindi", response: "< 3 hours", initials: "RP" },
  { name: "Maria Kowalski", role: "Head of Content", expertise: "Strategy & AI Content", years: 10, industries: "Healthcare, Legal, Education", languages: "English, Polish, German", response: "< 2 hours", initials: "MK" },
];

const globalLocations = [
  { city: "Dubai, UAE", region: "Middle East", flag: "🇦🇪", timezone: "GST (UTC+4)", projects: 60, status: "Online" as const },
  { city: "London, UK", region: "Europe", flag: "🇬🇧", timezone: "BST (UTC+1)", projects: 25, status: "Online" as const },
  { city: "Singapore", region: "Asia", flag: "🇸🇬", timezone: "SGT (UTC+8)", projects: 15, status: "Offline" as const },
];

const trustStats = [
  { label: "Projects Completed", value: "200+" },
  { label: "Countries Served", value: "12" },
  { label: "Revenue Influenced", value: "$12M+" },
  { label: "Clients Retained", value: "94%" },
  { label: "Years in Business", value: "7" },
  { label: "Avg Response Time", value: "2.4h" },
  { label: "Client Satisfaction", value: "96%" },
  { label: "Industries Covered", value: "10" },
];

const faqs = [
  {
    q: "How much does a typical engagement cost?",
    a: "Engagements start at $5K/mo and scale based on scope, complexity, and requirements. Most clients see ROI within 60-90 days. We'll provide a detailed proposal after understanding your needs — no hidden fees, no surprise charges.",
  },
  {
    q: "How long before we see results?",
    a: "SEO and content strategies typically show initial improvements within 4-8 weeks. AI and software projects vary by scope. We set clear milestones and provide real-time dashboards so you never have to wonder if it's working.",
  },
  {
    q: "How do we communicate?",
    a: "Weekly check-ins via Slack or your preferred channel. Monthly strategy reviews via video call. Quarterly business reviews in person or virtual. You'll have direct access to your dedicated team — no account managers, no gatekeepers.",
  },
  {
    q: "What about contracts?",
    a: "Month-to-month after the first 90 days. We earn your business every month. If we're not delivering measurable value, you're free to walk away. No long-term lock-in, no exit fees.",
  },
  {
    q: "Can you support our existing team?",
    a: "Absolutely. We partner with in-house teams across 10+ industries. Some clients use us as their full growth department. Others bring us in for specific expertise. We adapt to your operating model.",
  },
  {
    q: "What does a typical discovery call look like?",
    a: "A 30-minute conversation where we learn about your business, identify growth opportunities, and determine if we're the right fit. We'll share initial observations and outline what a partnership could look like. No pressure, no pitch.",
  },
  {
    q: "What deliverables can we expect?",
    a: "Custom dashboards with real-time metrics. Detailed strategy documents. Content calendars. Technical audit reports. Architecture diagrams. Automated workflows. Everything is documented, transferable, and designed to outlast our engagement.",
  },
  {
    q: "Do you work with businesses outside your core industries?",
    a: "Our sweet spot is B2B in healthcare, legal, SaaS, e-commerce, construction, real estate, fintech, and education. But we've worked across 10+ industries. If your business has a digital growth challenge, we'd love to explore it.",
  },
];

/* ─── HERO ─── */

function HeroSection({ onStartAssessment }: { onStartAssessment?: () => void }) {
  return (
    <section className="relative pt-36 pb-24 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.12]">
          <ShapeGrid speed={0.1} squareSize={36} direction="diagonal" borderColor="#D4A849" hoverFillColor="#D4A849" shape="square" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ground/90 pointer-events-none" />
        <div className="absolute top-12 right-[10%] text-[clamp(6rem,14vw,12rem)] font-mono font-semibold text-accent/[0.04] leading-none select-none pointer-events-none">14</div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.008]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.3), transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/10" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4 block">Contact</span>
          <h1 className="font-display font-semibold text-[clamp(2.5rem,5vw,5rem)] tracking-[-0.025em] leading-[0.92] text-text-primary mb-6 max-w-4xl">
            Let&apos;s build your <br /><span className="text-accent">growth system.</span>
          </h1>
          <p className="text-lg text-text-secondary/80 leading-relaxed max-w-[55ch]">
            Tell us about your business and we&apos;ll show you exactly how search, AI, and software can drive measurable revenue. No fluff. No pressure. Just a clear path forward.
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            {onStartAssessment && (
              <LeadEngineTrigger onClick={onStartAssessment} label="Start Assessment" />
            )}
            <a
              href="mailto:hello@zon.agency"
              className="text-sm text-text-secondary/50 underline underline-offset-4 hover:text-text-primary transition-colors duration-200"
            >
              Or email us directly
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── SECTION 1: Multi-step Consultation Form ─── */

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState<string | null>(null);
  const [improvementGoals, setImprovementGoals] = useState<string[]>([]);
  const [blockers, setBlockers] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const toggleGoal = (id: string) => {
    setImprovementGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const toggleBlocker = (id: string) => {
    setBlockers((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const canProceed = () => {
    switch (step) {
      case 0: return businessType !== null;
      case 1: return improvementGoals.length > 0;
      case 2: return blockers.length > 0;
      case 3: return name.length > 0 && email.length > 0;
      case 4: return true;
      default: return false;
    }
  };

  if (submitted) {
    return (
      <div className="p-6 lg:p-8 rounded-[1.5rem] bg-[#181818] border border-accent/25 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-accent" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-text-primary mb-3">You&apos;re all set!</h3>
        <p className="text-text-secondary/80 max-w-md mx-auto mb-6">
          Our team will review your submission and reach out within 24 hours with initial insights tailored to your business.
        </p>
        <div className="inline-flex items-center gap-2 text-xs text-text-secondary/60 bg-surface px-4 py-2 rounded-full border border-accent/10">
          <Timer size={14} className="text-accent" />
          <span>Average response time: 2.4 hours</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent">
            Step {step + 1} of {totalSteps}
          </span>
          <span className="text-[11px] text-text-secondary/40 font-mono">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1 bg-surface rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {["Business", "Goals", "Blockers", "Details", "Schedule"].map((label, i) => (
            <span
              key={label}
              className={`text-[9px] font-medium tracking-[0.1em] uppercase transition-colors duration-300 ${
                i <= step ? "text-accent" : "text-text-secondary/20"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
        >
          {step === 0 && (
            <div>
              <h3 className="font-display text-xl font-medium text-text-primary mb-2">What describes your business?</h3>
              <p className="text-sm text-text-secondary/60 mb-8">Select the stage that best fits your current situation.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {businessTypes.map((bt) => {
                  const Icon = bt.icon;
                  return (
                    <button
                      key={bt.id}
                      onClick={() => setBusinessType(bt.id)}
                      className={`p-5 sm:p-6 rounded-[1.25rem] text-left border transition-all duration-300 ${
                        businessType === bt.id
                          ? "bg-accent/10 border-accent/40 shadow-[0_0_20px_rgba(212,168,73,0.05)]"
                          : "bg-[#181818] border-accent/10 hover:border-accent/25"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 ${
                        businessType === bt.id ? "bg-accent/20 border border-accent/40" : "bg-accent/5 border border-accent/10"
                      }`}>
                        <Icon size={20} className={businessType === bt.id ? "text-accent" : "text-accent/60"} />
                      </div>
                      <h4 className="font-display text-sm font-medium text-text-primary mb-1">{bt.label}</h4>
                      <p className="text-[10px] text-text-secondary/50">{bt.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="font-display text-xl font-medium text-text-primary mb-2">What are you trying to improve?</h3>
              <p className="text-sm text-text-secondary/60 mb-8">Select all that apply. This helps us tailor our approach.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {goalOptions.map((goal) => {
                  const Icon = goal.icon;
                  const selected = improvementGoals.includes(goal.id);
                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`p-4 rounded-[1.25rem] text-left border transition-all duration-300 ${
                        selected
                          ? "bg-accent/10 border-accent/40"
                          : "bg-[#181818] border-accent/10 hover:border-accent/25"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-all duration-300 ${
                        selected ? "bg-accent/20 border border-accent/40" : "bg-accent/5 border border-accent/10"
                      }`}>
                        <Icon size={16} className={selected ? "text-accent" : "text-accent/60"} />
                      </div>
                      <h4 className="text-xs font-medium text-text-primary mb-0.5">{goal.label}</h4>
                      <p className="text-[9px] text-text-secondary/40">{goal.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-display text-xl font-medium text-text-primary mb-2">What&apos;s blocking growth?</h3>
              <p className="text-sm text-text-secondary/60 mb-8">Select the biggest challenges you&apos;re facing right now.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {blockerOptions.map((blocker) => {
                  const selected = blockers.includes(blocker.id);
                  return (
                    <button
                      key={blocker.id}
                      onClick={() => toggleBlocker(blocker.id)}
                      className={`p-5 rounded-[1.25rem] text-left border transition-all duration-300 ${
                        selected
                          ? "bg-accent/10 border-accent/40"
                          : "bg-[#181818] border-accent/10 hover:border-accent/25"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-text-primary">{blocker.label}</h4>
                        {selected && <CheckCircle size={14} className="text-accent" />}
                      </div>
                      <p className="text-[10px] text-text-secondary/50">{blocker.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-display text-xl font-medium text-text-primary mb-2">Tell us about yourself</h3>
              <p className="text-sm text-text-secondary/60 mb-8">We&apos;ll keep your details confidential and never share them.</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[10px] tracking-[0.1em] uppercase text-text-secondary/60 mb-2 block">Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-surface border border-white/5 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent/40 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.1em] uppercase text-text-secondary/60 mb-2 block">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full bg-surface border border-white/5 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent/40 transition-all"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] tracking-[0.1em] uppercase text-text-secondary/60 mb-2 block">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your company name"
                    className="w-full bg-surface border border-white/5 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent/40 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.1em] uppercase text-text-secondary/60 mb-2 block">Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-surface border border-white/5 rounded-xl px-4 py-3.5 text-sm text-text-primary focus:outline-none focus:border-accent/40 transition-all appearance-none"
                  >
                    <option value="" disabled>Select budget range</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="font-display text-xl font-medium text-text-primary mb-2">When should we schedule?</h3>
              <p className="text-sm text-text-secondary/60 mb-8">Pick a time that works for you. We&apos;ll confirm within 2 hours.</p>
              <div className="p-5 sm:p-6 rounded-[1.25rem] bg-[#181818] border border-accent/10 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <CalendarBlank size={20} className="text-accent" />
                  <h4 className="text-sm font-medium text-text-primary">What to expect</h4>
                </div>
                <ul className="space-y-2">
                  {[
                    "30-minute video call with a growth strategist",
                    "We'll review your goals and current setup",
                    "Initial observations and opportunity mapping",
                    "No pitch — just a conversation and a clear next step",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-text-secondary/60">
                      <CheckCircle size={10} className="text-accent/60 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-surface/50 border border-accent/5">
                <p className="text-[9px] font-medium tracking-[0.1em] uppercase text-text-secondary/40 mb-1">After submitting</p>
                <p className="text-xs text-text-secondary/60">Our team will review your information and send a calendar link within 2 hours during business hours. You can pick a time that works best for you.</p>
              </div>
            </div>
          )}
        </motion.div>

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          className={`text-sm text-text-secondary/50 hover:text-text-primary transition-colors duration-200 ${step === 0 ? "invisible" : ""}`}
        >
          Back
        </button>
        <div className="flex items-center gap-3">
          {step < totalSteps - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className={`group inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full font-medium text-sm transition-all duration-150 ${
                canProceed()
                  ? "bg-accent text-ground active:scale-[0.98]"
                  : "bg-surface text-text-secondary/40 cursor-not-allowed"
              }`}
            >
              Continue
              <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px ${
                canProceed() ? "bg-ground/10" : "bg-surface-alt"
              }`}>
                <ArrowRight size={14} weight="bold" />
              </span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className={`group inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full font-medium text-sm transition-all duration-150 ${
                canProceed()
                  ? "bg-accent text-ground active:scale-[0.98]"
                  : "bg-surface text-text-secondary/40 cursor-not-allowed"
              }`}
            >
              Submit
              <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px ${
                canProceed() ? "bg-ground/10" : "bg-surface-alt"
              }`}>
                <PaperPlaneTilt size={14} weight="bold" />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ConsultationSection() {
  return (
    <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px circle at 50% 20%, rgba(212,168,73,0.025), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-10 sm:mb-16">
          <SectionLabel text="Start Your Consultation" />
          <SectionTitle>Tell us about <span className="text-accent">your business.</span></SectionTitle>
          <p className="text-text-secondary/60 text-sm">A few quick questions so we can tailor our approach to your specific needs. Takes about 2 minutes.</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <MultiStepForm />
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── SECTION 2: Choose Your Journey ─── */

function JourneySection() {
  return (
    <section className="py-28 lg:py-36 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.005]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.4), transparent 70%)" }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-10 sm:mb-16">
          <SectionLabel text="Choose Your Path" />
          <SectionTitle>How would you like <span className="text-accent">to connect?</span></SectionTitle>
          <p className="text-text-secondary/60 text-sm">Different needs, different paths. Pick the one that fits best and we&apos;ll meet you there.</p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {journeyPaths.map((path, i) => {
            const Icon = path.icon;
            return (
              <FadeUp key={path.title} delay={i * 0.04}>
                <div className="group p-5 sm:p-6 rounded-[1.25rem] bg-[#181818] border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5 h-full">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-all duration-300">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <h3 className="font-display text-sm font-medium text-text-primary mb-1">{path.title}</h3>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    <span className="text-[9px] text-text-secondary/40 uppercase tracking-[0.05em]">{path.response}</span>
                  </div>
                  <p className="text-[9px] text-accent/60 uppercase tracking-[0.1em] mb-2">Best for: {path.best}</p>
                  <p className="text-[10px] text-text-secondary/50 leading-relaxed">{path.desc}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 3: What Happens Next ─── */

function ProcessSection() {
  return (
    <section className="py-28 lg:py-36 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.005]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.4), transparent 70%)" }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-10 sm:mb-16">
          <SectionLabel text="What Happens Next" />
          <SectionTitle>Your journey from first contact <span className="text-accent">to growth system.</span></SectionTitle>
          <p className="text-text-secondary/60 text-sm">No guesswork. You&apos;ll know exactly what to expect at every stage.</p>
        </FadeUp>
        <div className="relative">
          <div className="absolute left-[31px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-accent/10 to-transparent hidden sm:block" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
            {processSteps.map((p, i) => {
              const Icon = p.icon;
              return (
                <FadeUp key={p.step} delay={i * 0.06}>
                  <div className="flex gap-5 pb-10 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-[#181818] border-2 border-accent/30 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-accent" />
                      </div>
                      {i < processSteps.length - 1 && <div className="w-px flex-1 bg-accent/10 hidden sm:block" />}
                    </div>
                    <div className="pt-3">
                      <span className="text-[9px] font-mono font-semibold text-accent/60 mb-1 block">{p.step}</span>
                      <h3 className="font-display text-base font-medium text-text-primary mb-1">{p.title}</h3>
                      <p className="text-[10px] text-text-secondary/50 leading-relaxed max-w-[30ch]">{p.desc}</p>
                    </div>
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

/* ─── SECTION 5: Meet Your Consultants ─── */

function ConsultantsSection() {
  const [selectedConsultant, setSelectedConsultant] = useState<number | null>(null);
  return (
    <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px circle at 70% 30%, rgba(212,168,73,0.025), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-10 sm:mb-16">
          <SectionLabel text="Your Consultants" />
          <SectionTitle>Meet the people you&apos;ll <span className="text-accent">be working with.</span></SectionTitle>
          <p className="text-text-secondary/60 text-sm">You won&apos;t get passed around. From first contact to delivery, these are the experts who will be in the room.</p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {consultants.map((c, i) => (
            <FadeUp key={c.name} delay={i * 0.05}>
              <div
                onClick={() => setSelectedConsultant(selectedConsultant === i ? null : i)}
                className="cursor-pointer p-5 sm:p-6 rounded-[1.25rem] bg-[#181818] border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <span className="text-sm font-mono font-semibold text-accent">{c.initials}</span>
                </div>
                <h3 className="font-display text-sm font-medium text-text-primary mb-1">{c.name}</h3>
                <p className="text-[10px] text-accent/80 mb-3">{c.role}</p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] text-text-secondary/30 uppercase tracking-[0.1em]">Expertise</span>
                    <span className="text-[9px] text-text-secondary/60">{c.expertise}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] text-text-secondary/30 uppercase tracking-[0.1em]">Experience</span>
                    <span className="text-[9px] text-text-secondary/60">{c.years} years</span>
                  </div>
                </div>
                {selectedConsultant === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }} className="mt-4 pt-4 border-t border-accent/10 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-text-secondary/30 uppercase tracking-[0.1em]">Industries</span>
                      <span className="text-[9px] text-text-secondary/60">{c.industries}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-text-secondary/30 uppercase tracking-[0.1em]">Languages</span>
                      <span className="text-[9px] text-text-secondary/60">{c.languages}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-text-secondary/30 uppercase tracking-[0.1em]">Response</span>
                      <span className="text-[9px] text-accent/80">{c.response}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 6: Global Presence ─── */

function GlobalSection() {
  const [selectedLocation, setSelectedLocation] = useState<number>(0);
  return (
    <section className="py-28 lg:py-36 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.008]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.3), transparent 70%)" }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-10 sm:mb-16">
          <SectionLabel text="Global Presence" />
          <SectionTitle>We&apos;re everywhere you <span className="text-accent">need us to be.</span></SectionTitle>
          <p className="text-text-secondary/60 text-sm">Three continents. Multiple time zones. One team operating as a single growth system.</p>
        </FadeUp>
        <div className="grid lg:grid-cols-3 gap-4 mb-8">
          {globalLocations.map((loc, i) => (
            <FadeUp key={loc.city} delay={i * 0.05}>
              <div
                onClick={() => setSelectedLocation(i)}
                className={`p-5 sm:p-6 rounded-[1.25rem] border transition-all duration-300 cursor-pointer ${
                  selectedLocation === i
                    ? "bg-[#181818] border-accent/40 shadow-[0_0_20px_rgba(212,168,73,0.05)]"
                    : "bg-[#181818] border-accent/10 hover:border-accent/25"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{loc.flag}</span>
                  <div className={`flex items-center gap-1.5 text-[9px] ${loc.status === "Online" ? "text-accent" : "text-text-secondary/30"}`}>
                    <span className={`w-2 h-2 rounded-full ${loc.status === "Online" ? "bg-accent" : "bg-text-secondary/20"}`} />
                    {loc.status}
                  </div>
                </div>
                <h3 className="font-display text-base font-medium text-text-primary mb-1">{loc.city}</h3>
                <p className="text-[10px] text-text-secondary/50 mb-3">{loc.region}</p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-text-secondary/40">{loc.timezone}</span>
                  <span className="text-accent/60">{loc.projects}+ projects</span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.15}>
          <div className="p-5 sm:p-6 rounded-[1.25rem] bg-[#181818] border border-accent/10">
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

/* ─── SECTION 7: Trust Dashboard ─── */

function TrustSection() {
  return (
    <section className="py-28 lg:py-36 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 50%, rgba(212,168,73,0.025), transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl mb-10 sm:mb-16">
          <SectionLabel text="Trust Signals" />
          <SectionTitle>Our track record, <span className="text-accent">in numbers.</span></SectionTitle>
          <p className="text-text-secondary/60 text-sm">We don&apos;t do promises. We do proof.</p>
        </FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustStats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.04}>
              <StatCard label={stat.label} value={stat.value} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 8: FAQs Before Contacting ─── */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="py-28 lg:py-36 bg-ground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.005]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.4), transparent 70%)" }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 items-start">
          <FadeUp>
            <SectionLabel text="Before You Reach Out" />
            <SectionTitle>Answers to questions <span className="text-accent">you&apos;re probably asking.</span></SectionTitle>
            <p className="text-text-secondary/60 text-sm">We believe in radical transparency. If you have a question, chances are it&apos;s answered here.</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-[1.25rem] bg-[#181818] border border-accent/10 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-accent/[0.02]"
                  >
                    <span className="text-sm font-medium text-text-primary pr-4">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <CaretDown size={14} className="text-accent/60" />
                    </motion.div>
                  </button>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <div className="w-full h-px bg-accent/10 mb-4" />
                          <p className="text-xs text-text-secondary/60 leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}

                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 9: Premium CTA ─── */

function CTASection({ onStartAssessment }: { onStartAssessment?: () => void }) {
  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-[#0D0C0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 0%, rgba(212,168,73,0.06), transparent)" }} />
      <div className="absolute inset-0 opacity-[0.08]">
        <ShapeGrid speed={0.05} squareSize={48} direction="diagonal" borderColor="#D4A849" shape="square" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-4 block"
        >
          Start Building
        </motion.span>
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="font-display font-semibold text-[clamp(2.5rem,5vw,5rem)] tracking-[-0.03em] leading-[0.95] text-text-primary text-balance max-w-4xl mx-auto mb-4"
        >
          Ready to start <span className="text-accent">growing?</span>
        </motion.h2>
        <motion.p
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="text-text-secondary text-base max-w-[55ch] mx-auto mb-10"
        >
          Free audit. No commitment. First results within 60 days or we fix it.
        </motion.p>
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {onStartAssessment && (
            <LeadEngineTrigger onClick={onStartAssessment} label="Start Assessment" />
          )}
          <a
            href="mailto:hello@zon.agency"
            className="text-text-secondary/50 underline underline-offset-4 hover:text-text-primary text-sm transition-colors duration-200"
          >
            Or email us directly
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MOBILE COMPONENTS (max-width: 767px)
   ═══════════════════════════════════════════════════ */

/* ─── MOBILE HERO ─── */

function MobileHero() {
  return (
    <section className="relative overflow-hidden" style={{ padding: "clamp(108px, 28vw, 130px) 0 clamp(62px, 16vw, 82px)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.08]">
          <ShapeGrid speed={0.1} squareSize={36} direction="diagonal" borderColor="#D4A849" hoverFillColor="#D4A849" shape="square" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ground/90 pointer-events-none" />
        <div className="absolute top-12 right-[10%] text-[clamp(6rem,14vw,12rem)] font-mono font-semibold text-accent/[0.03] leading-none select-none pointer-events-none">14</div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/10" />
      </div>
      <div className="relative z-10" style={{ paddingLeft: "var(--contact-pad, 16px)", paddingRight: "var(--contact-pad, 16px)" }}>
        <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent block mb-3">Contact</span>
        <h1 className="font-display font-semibold tracking-[-0.025em] text-text-primary" style={{ fontSize: "clamp(2.2rem, 9vw, 2.75rem)", lineHeight: "1.05" }}>
          Let&apos;s build your <span className="text-accent">growth system.</span>
        </h1>
        <p className="text-text-secondary/70 leading-relaxed mt-3" style={{ fontSize: "clamp(15px, 4.2vw, 17px)", maxWidth: "45ch" }}>
          Tell us about your business and we&apos;ll show you how search, AI, and software can drive measurable revenue. No fluff. No pressure.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3" style={{ minHeight: "48px" }}>
          <button
            onClick={() => document.getElementById("mobile-assessment")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative inline-flex items-center gap-2 bg-accent text-ground pl-6 pr-2 py-2.5 rounded-full font-medium text-sm active:scale-[0.98] transition-all duration-150 hover:brightness-105"
            style={{ minHeight: "48px" }}
          >
            <span>Start Assessment</span>
            <span className="w-7 h-7 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={14} weight="bold" />
            </span>
          </button>
          <a
            href="mailto:hello@zon.agency"
            className="text-xs text-text-secondary/50 underline underline-offset-4 hover:text-text-primary transition-colors duration-200"
          >
            Or email us directly
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── MOBILE MULTI-STEP FORM ─── */

function MobileMultiStepForm() {
  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState<string | null>(null);
  const [improvementGoals, setImprovementGoals] = useState<string[]>([]);
  const [blockers, setBlockers] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const toggleGoal = (id: string) => {
    setImprovementGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const toggleBlocker = (id: string) => {
    setBlockers((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const canProceed = () => {
    switch (step) {
      case 0: return businessType !== null;
      case 1: return improvementGoals.length > 0;
      case 2: return blockers.length > 0;
      case 3: return name.length > 0 && email.length > 0;
      case 4: return true;
      default: return false;
    }
  };

  const stepNames = ["Business", "Goals", "Blockers", "Details", "Schedule"];

  if (submitted) {
    return (
      <div className="text-center" style={{ padding: "var(--contact-card-pad, 16px)" }}>
        <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={28} className="text-accent" />
        </div>
        <h3 className="font-display text-xl font-semibold text-text-primary mb-2">You&apos;re all set!</h3>
        <p className="text-text-secondary/70 text-sm mb-5" style={{ maxWidth: "30ch", margin: "0 auto" }}>
          Our team will review your submission and reach out within 24 hours with initial insights tailored to your business.
        </p>
        <div className="inline-flex items-center gap-2 text-xs text-text-secondary/60 bg-surface px-3.5 py-2 rounded-full border border-accent/10">
          <Timer size={14} className="text-accent" />
          <span>Average response time: 2.4 hours</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: step < totalSteps - 1 ? "80px" : "0" }}>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-accent">
              Step {step + 1} of {totalSteps}
            </span>
            <span className="text-[9px] bg-accent/10 text-accent/80 px-2 py-0.5 rounded-full font-mono font-medium">
              {stepNames[step]}
            </span>
          </div>
          <span className="text-[10px] text-text-secondary/40 font-mono font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-surface rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease }}
          />
        </div>
        <div className="flex gap-1 mt-2">
          {stepNames.map((label, i) => (
            <div
              key={label}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i < step ? "bg-accent/40" : i === step ? "bg-accent" : "bg-surface"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease }}
      >
        {step === 0 && (
          <div>
            <h3 className="font-display font-medium text-text-primary mb-1" style={{ fontSize: "clamp(18px, 5.5vw, 22px)" }}>What describes your business?</h3>
            <p className="text-xs text-text-secondary/60 mb-5">Select the stage that best fits your current situation.</p>
            <div className="grid grid-cols-2 gap-3">
              {businessTypes.map((bt) => {
                const Icon = bt.icon;
                const selected = businessType === bt.id;
                return (
                  <button
                    key={bt.id}
                    onClick={() => setBusinessType(bt.id)}
                    role="radio"
                    aria-checked={selected}
                    className={`rounded-[var(--contact-card-radius,18px)] text-left border transition-all duration-200 ${
                      selected
                        ? "bg-accent/10 border-accent/40"
                        : "bg-[#181818] border-accent/10 hover:border-accent/25"
                    }`}
                    style={{ padding: "var(--contact-card-pad, 14px)", minHeight: "72px" }}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 transition-all duration-200 ${
                      selected ? "bg-accent/20 border border-accent/40" : "bg-accent/5 border border-accent/10"
                    }`}>
                      <Icon size={18} className={selected ? "text-accent" : "text-accent/60"} />
                    </div>
                    <h4 className="font-display text-sm font-medium text-text-primary">{bt.label}</h4>
                    <p className="text-[10px] text-text-secondary/50 leading-relaxed mt-0.5">{bt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h3 className="font-display font-medium text-text-primary mb-1" style={{ fontSize: "clamp(18px, 5.5vw, 22px)" }}>What are you trying to improve?</h3>
            <p className="text-xs text-text-secondary/60 mb-5">Select all that apply.</p>
            <div className="grid grid-cols-2 gap-3">
              {goalOptions.map((goal) => {
                const Icon = goal.icon;
                const selected = improvementGoals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    role="checkbox"
                    aria-checked={selected}
                    className={`rounded-[var(--contact-card-radius,18px)] text-left border transition-all duration-200 ${
                      selected
                        ? "bg-accent/10 border-accent/40"
                        : "bg-[#181818] border-accent/10 hover:border-accent/25"
                    }`}
                    style={{ padding: "var(--contact-card-pad, 14px)", minHeight: "72px" }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-all duration-200 ${
                      selected ? "bg-accent/20 border border-accent/40" : "bg-accent/5 border border-accent/10"
                    }`}>
                      <Icon size={16} className={selected ? "text-accent" : "text-accent/60"} />
                    </div>
                    <h4 className="text-xs font-medium text-text-primary">{goal.label}</h4>
                    <p className="text-[10px] text-text-secondary/50 leading-relaxed mt-0.5">{goal.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="font-display font-medium text-text-primary mb-1" style={{ fontSize: "clamp(18px, 5.5vw, 22px)" }}>What&apos;s blocking growth?</h3>
            <p className="text-xs text-text-secondary/60 mb-5">Select the biggest challenges you&apos;re facing.</p>
            <div className="space-y-3">
              {blockerOptions.map((blocker) => {
                const selected = blockers.includes(blocker.id);
                return (
                  <button
                    key={blocker.id}
                    onClick={() => toggleBlocker(blocker.id)}
                    role="checkbox"
                    aria-checked={selected}
                    className={`w-full rounded-[var(--contact-card-radius,18px)] text-left border transition-all duration-200 ${
                      selected
                        ? "bg-accent/10 border-accent/40"
                        : "bg-[#181818] border-accent/10 hover:border-accent/25"
                    }`}
                    style={{ padding: "var(--contact-card-pad, 14px)", minHeight: "64px" }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-text-primary">{blocker.label}</h4>
                      {selected && <CheckCircle size={16} weight="fill" className="text-accent shrink-0 ml-2" />}
                    </div>
                    <p className="text-[10px] text-text-secondary/50 leading-relaxed mt-0.5">{blocker.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="font-display font-medium text-text-primary mb-1" style={{ fontSize: "clamp(18px, 5.5vw, 22px)" }}>Tell us about yourself</h3>
            <p className="text-xs text-text-secondary/60 mb-5">We&apos;ll keep your details confidential.</p>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] tracking-[0.1em] uppercase text-text-secondary/60 mb-1.5 block">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                  className="w-full bg-surface border border-white/5 rounded-xl px-4 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent/40 transition-all"
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.1em] uppercase text-text-secondary/60 mb-1.5 block">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  inputMode="email"
                  className="w-full bg-surface border border-white/5 rounded-xl px-4 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent/40 transition-all"
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.1em] uppercase text-text-secondary/60 mb-1.5 block">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company name"
                  autoComplete="organization"
                  className="w-full bg-surface border border-white/5 rounded-xl px-4 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent/40 transition-all"
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.1em] uppercase text-text-secondary/60 mb-1.5 block">Budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-surface border border-white/5 rounded-xl px-4 text-text-primary focus:outline-none focus:border-accent/40 transition-all appearance-none"
                  style={{ height: "50px", fontSize: "16px" }}
                >
                  <option value="" disabled>Select budget range</option>
                  {budgetRanges.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="font-display font-medium text-text-primary mb-1" style={{ fontSize: "clamp(18px, 5.5vw, 22px)" }}>When should we schedule?</h3>
            <p className="text-xs text-text-secondary/60 mb-5">We&apos;ll confirm within 2 hours.</p>
            <div className="rounded-[var(--contact-card-radius,18px)] bg-[#181818] border border-accent/10 mb-4" style={{ padding: "var(--contact-card-pad, 14px)" }}>
              <div className="flex items-center gap-2.5 mb-3">
                <CalendarBlank size={18} className="text-accent shrink-0" />
                <h4 className="text-sm font-medium text-text-primary">What to expect</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "30-minute video call with a growth strategist",
                  "We'll review your goals and current setup",
                  "Initial observations and opportunity mapping",
                  "No pitch — just a conversation and a clear next step",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-text-secondary/60">
                    <CheckCircle size={10} className="text-accent/60 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-surface/50 border border-accent/5" style={{ padding: "var(--contact-card-pad, 14px)" }}>
              <p className="text-[9px] font-medium tracking-[0.1em] uppercase text-text-secondary/40 mb-1">After submitting</p>
              <p className="text-xs text-text-secondary/60 leading-relaxed">Our team will review your information and send a calendar link within 2 hours during business hours.</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Sticky bottom navigation (steps 0-3 only) */}
      {step < totalSteps - 1 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-ground/95 backdrop-blur-lg border-t border-accent/10"
          style={{ padding: "12px var(--contact-pad, 16px)", paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))" }}
        >
          <div className="flex items-center justify-between" style={{ maxWidth: "430px", margin: "0 auto" }}>
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className={`flex items-center gap-1.5 text-sm transition-colors duration-200 ${
                step === 0 ? "text-text-secondary/30" : "text-text-secondary/60 hover:text-text-primary"
              }`}
              style={{ minHeight: "48px", padding: "0 4px" }}
              aria-label="Previous step"
            >
              <ArrowLeft size={16} />
              <span className="text-xs font-medium">Back</span>
            </button>
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className={`inline-flex items-center gap-2 font-medium text-sm rounded-full transition-all duration-150 ${
                canProceed()
                  ? "bg-accent text-ground active:scale-[0.98]"
                  : "bg-surface text-text-secondary/40 cursor-not-allowed"
              }`}
              style={{ padding: "12px 24px", minHeight: "48px" }}
            >
              Continue
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      )}

      {/* Submit button (step 4) - inline, no sticky */}
      {step === totalSteps - 1 && (
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={!canProceed()}
            className={`w-full inline-flex items-center justify-center gap-2 font-medium text-sm rounded-full transition-all duration-150 ${
              canProceed()
                ? "bg-accent text-ground active:scale-[0.98]"
                : "bg-surface text-text-secondary/40 cursor-not-allowed"
            }`}
            style={{ padding: "14px 24px", minHeight: "50px" }}
          >
            Submit
            <PaperPlaneTilt size={16} weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
}

function MobileConsultationSection() {
  return (
    <section id="mobile-assessment" className="bg-[#0D0C0B] relative overflow-hidden mobile-scroll-margin" style={{ padding: "var(--contact-section, 64px) 0" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px circle at 50% 20%, rgba(212,168,73,0.025), transparent)" }} />
      <div style={{ paddingLeft: "var(--contact-pad, 16px)", paddingRight: "var(--contact-pad, 16px)" }}>
        <div className="mb-6">
          <SectionLabel text="Start Your Consultation" />
          <h2 className="font-display font-semibold tracking-[-0.025em] leading-[1.08] text-text-primary" style={{ fontSize: "clamp(1.5rem, 8vw, 2.125rem)" }}>
            Tell us about <span className="text-accent">your business.</span>
          </h2>
          <p className="text-text-secondary/60 text-xs mt-3">A few quick questions so we can tailor our approach. Takes about 2 minutes.</p>
        </div>
        <MobileMultiStepForm />
      </div>
    </section>
  );
}

/* ─── MOBILE JOURNEY ─── */

function MobileJourneySection() {
  return (
    <section className="bg-ground relative overflow-hidden mobile-scroll-margin" style={{ padding: "var(--contact-section, 64px) 0" }}>
      <div style={{ paddingLeft: "var(--contact-pad, 16px)", paddingRight: "var(--contact-pad, 16px)" }}>
        <div className="mb-6">
          <SectionLabel text="Choose Your Path" />
          <h2 className="font-display font-semibold tracking-[-0.025em] leading-[1.08] text-text-primary" style={{ fontSize: "clamp(1.5rem, 8vw, 2.125rem)" }}>
            How would you like <span className="text-accent">to connect?</span>
          </h2>
          <p className="text-text-secondary/60 text-xs mt-3">Different needs, different paths. Pick the one that fits best.</p>
        </div>
        <div className="space-y-3">
          {journeyPaths.map((path) => {
            const Icon = path.icon;
            return (
              <div
                key={path.title}
                className="rounded-[var(--contact-card-radius,18px)] bg-[#181818] border border-accent/10"
                style={{ padding: "var(--contact-card-pad, 14px)", minHeight: "76px" }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-sm font-medium text-text-primary">{path.title}</h3>
                      <span className="text-[9px] text-text-secondary/40 uppercase tracking-[0.05em] whitespace-nowrap">{path.response}</span>
                    </div>
                    <p className="text-[10px] text-accent/60 uppercase tracking-[0.08em] mt-0.5">Best for: {path.best}</p>
                    <p className="text-[11px] text-text-secondary/50 leading-relaxed mt-1">{path.desc}</p>
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

/* ─── MOBILE PROCESS ─── */

function MobileProcessSection() {
  return (
    <section className="bg-[#0D0C0B] relative overflow-hidden mobile-scroll-margin" style={{ padding: "var(--contact-section, 64px) 0" }}>
      <div style={{ paddingLeft: "var(--contact-pad, 16px)", paddingRight: "var(--contact-pad, 16px)" }}>
        <div className="mb-6">
          <SectionLabel text="What Happens Next" />
          <h2 className="font-display font-semibold tracking-[-0.025em] leading-[1.08] text-text-primary" style={{ fontSize: "clamp(1.5rem, 8vw, 2.125rem)" }}>
            From first contact <span className="text-accent">to growth system.</span>
          </h2>
          <p className="text-text-secondary/60 text-xs mt-3">You&apos;ll know exactly what to expect at every stage.</p>
        </div>
        <div className="space-y-0">
          {processSteps.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.step} className="flex gap-3 relative" style={{ minHeight: "64px" }}>
                <div className="flex flex-col items-center shrink-0" style={{ width: "32px" }}>
                  <div className="w-8 h-8 rounded-full bg-[#181818] border border-accent/25 flex items-center justify-center">
                    <Icon size={14} className="text-accent" />
                  </div>
                  {i < processSteps.length - 1 && <div className="w-px flex-1 bg-accent/10 mt-1" />}
                </div>
                <div style={{ paddingBottom: i < processSteps.length - 1 ? "16px" : "0", paddingTop: "2px" }}>
                  <span className="text-[9px] font-mono font-semibold text-accent/60 block">{p.step}</span>
                  <h3 className="font-display text-sm font-medium text-text-primary">{p.title}</h3>
                  <p className="text-[11px] text-text-secondary/50 leading-relaxed mt-0.5" style={{ maxWidth: "32ch" }}>{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── MOBILE CONSULTANTS ─── */

function MobileConsultantsSection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  return (
    <section className="bg-ground relative overflow-hidden mobile-scroll-margin" style={{ padding: "var(--contact-section, 64px) 0" }}>
      <div style={{ paddingLeft: "var(--contact-pad, 16px)", paddingRight: "var(--contact-pad, 16px)" }}>
        <div className="mb-6">
          <SectionLabel text="Your Consultants" />
          <h2 className="font-display font-semibold tracking-[-0.025em] leading-[1.08] text-text-primary" style={{ fontSize: "clamp(1.5rem, 8vw, 2.125rem)" }}>
            Meet the people you&apos;ll <span className="text-accent">be working with.</span>
          </h2>
          <p className="text-text-secondary/60 text-xs mt-3">From first contact to delivery, these are the experts in the room.</p>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-none -mx-[var(--contact-pad,16px)]">
        <div className="flex gap-3" style={{ paddingLeft: "var(--contact-pad, 16px)", paddingRight: "var(--contact-pad, 16px)" }}>
          {consultants.map((c, i) => (
            <div
              key={c.name}
              onClick={() => setSelectedIdx(selectedIdx === i ? null : i)}
              className="shrink-0 rounded-[var(--contact-card-radius,18px)] bg-[#181818] border border-accent/10 cursor-pointer transition-all duration-200"
              style={{ width: "clamp(200px, 78vw, 260px)", padding: "var(--contact-card-pad, 14px)" }}
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-3">
                <span className="text-xs font-mono font-semibold text-accent">{c.initials}</span>
              </div>
              <h3 className="font-display text-sm font-medium text-text-primary">{c.name}</h3>
              <p className="text-[10px] text-accent/80 mb-2">{c.role}</p>
              <div className="flex items-center gap-1.5 text-[10px] text-text-secondary/50">
                <span className="text-[8px] text-text-secondary/30 uppercase tracking-[0.1em]">Exp:</span>
                <span>{c.expertise}</span>
              </div>
              {selectedIdx === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 pt-3 border-t border-accent/10 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] text-text-secondary/30 uppercase tracking-[0.1em]">Experience</span>
                    <span className="text-[10px] text-text-secondary/60">{c.years} years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] text-text-secondary/30 uppercase tracking-[0.1em]">Industries</span>
                    <span className="text-[10px] text-text-secondary/60">{c.industries}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] text-text-secondary/30 uppercase tracking-[0.1em]">Languages</span>
                    <span className="text-[10px] text-text-secondary/60">{c.languages}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] text-text-secondary/30 uppercase tracking-[0.1em]">Response</span>
                    <span className="text-[10px] text-accent/80">{c.response}</span>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MOBILE GLOBAL ─── */

function MobileGlobalSection() {
  const [selectedLoc, setSelectedLoc] = useState(0);
  return (
    <section className="bg-[#0D0C0B] relative overflow-hidden mobile-scroll-margin" style={{ padding: "var(--contact-section, 64px) 0" }}>
      <div style={{ paddingLeft: "var(--contact-pad, 16px)", paddingRight: "var(--contact-pad, 16px)" }}>
        <div className="mb-6">
          <SectionLabel text="Global Presence" />
          <h2 className="font-display font-semibold tracking-[-0.025em] leading-[1.08] text-text-primary" style={{ fontSize: "clamp(1.5rem, 8vw, 2.125rem)" }}>
            We&apos;re everywhere you <span className="text-accent">need us to be.</span>
          </h2>
          <p className="text-text-secondary/60 text-xs mt-3">Three continents. Multiple time zones. One team.</p>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-none -mx-[var(--contact-pad,16px)] mb-5">
        <div className="flex gap-3" style={{ paddingLeft: "var(--contact-pad, 16px)", paddingRight: "var(--contact-pad, 16px)" }}>
          {globalLocations.map((loc, i) => (
            <div
              key={loc.city}
              onClick={() => setSelectedLoc(i)}
              className={`shrink-0 rounded-[var(--contact-card-radius,18px)] border transition-all duration-200 cursor-pointer ${
                selectedLoc === i
                  ? "bg-[#181818] border-accent/40"
                  : "bg-[#181818] border-accent/10 hover:border-accent/25"
              }`}
              style={{ width: "clamp(200px, 84vw, 300px)", padding: "var(--contact-card-pad, 14px)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{loc.flag}</span>
                <span className="text-[9px] text-text-secondary/40">{loc.region}</span>
              </div>
              <h3 className="font-display text-sm font-medium text-text-primary">{loc.city}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-text-secondary/40">{loc.timezone}</span>
                <span className="text-[10px] text-accent/60">{loc.projects}+ projects</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ paddingLeft: "var(--contact-pad, 16px)", paddingRight: "var(--contact-pad, 16px)" }}>
        <div className="rounded-[var(--contact-card-radius,18px)] bg-[#181818] border border-accent/10" style={{ padding: "var(--contact-card-pad, 14px)" }}>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="font-mono font-semibold text-accent" style={{ fontSize: "clamp(1.1rem, 5vw, 1.5rem)" }}>12</p>
              <p className="text-[10px] text-text-secondary/60">Countries Served</p>
            </div>
            <div>
              <p className="font-mono font-semibold text-accent" style={{ fontSize: "clamp(1.1rem, 5vw, 1.5rem)" }}>4</p>
              <p className="text-[10px] text-text-secondary/60">Languages</p>
            </div>
            <div>
              <p className="font-mono font-semibold text-accent" style={{ fontSize: "clamp(1.1rem, 5vw, 1.5rem)" }}>10</p>
              <p className="text-[10px] text-text-secondary/60">Industries</p>
            </div>
            <div>
              <p className="font-mono font-semibold text-accent" style={{ fontSize: "clamp(1.1rem, 5vw, 1.5rem)" }}>3</p>
              <p className="text-[10px] text-text-secondary/60">Continents</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MOBILE TRUST ─── */

function MobileTrustSection() {
  return (
    <section className="bg-ground relative overflow-hidden mobile-scroll-margin" style={{ padding: "var(--contact-section, 64px) 0" }}>
      <div style={{ paddingLeft: "var(--contact-pad, 16px)", paddingRight: "var(--contact-pad, 16px)" }}>
        <div className="mb-6">
          <SectionLabel text="Trust Signals" />
          <h2 className="font-display font-semibold tracking-[-0.025em] leading-[1.08] text-text-primary" style={{ fontSize: "clamp(1.5rem, 8vw, 2.125rem)" }}>
            Our track record, <span className="text-accent">in numbers.</span>
          </h2>
          <p className="text-text-secondary/60 text-xs mt-3">We don&apos;t do promises. We do proof.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {trustStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[var(--contact-card-radius,18px)] bg-[#181818] border border-accent/25"
              style={{ padding: "var(--contact-card-pad, 14px)" }}
            >
              <p className="font-mono font-semibold text-accent" style={{ fontSize: "clamp(1.3rem, 6vw, 1.75rem)" }}>{stat.value}</p>
              <p className="text-[10px] text-text-secondary/60 uppercase tracking-[0.05em] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MOBILE FAQ ─── */

function MobileFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="bg-[#0D0C0B] relative overflow-hidden mobile-scroll-margin" style={{ padding: "var(--contact-section, 64px) 0" }}>
      <div style={{ paddingLeft: "var(--contact-pad, 16px)", paddingRight: "var(--contact-pad, 16px)" }}>
        <div className="mb-6">
          <SectionLabel text="Before You Reach Out" />
          <h2 className="font-display font-semibold tracking-[-0.025em] leading-[1.08] text-text-primary" style={{ fontSize: "clamp(1.5rem, 8vw, 2.125rem)" }}>
            Answers to questions <span className="text-accent">you&apos;re probably asking.</span>
          </h2>
          <p className="text-text-secondary/60 text-xs mt-3">If you have a question, chances are it&apos;s answered here.</p>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-[var(--contact-card-radius,18px)] bg-[#181818] border border-accent/10 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-center justify-between text-left transition-colors duration-200 hover:bg-accent/[0.02]"
                style={{ padding: "var(--contact-card-pad, 14px)", minHeight: "52px" }}
              >
                <span className="text-sm font-medium text-text-primary pr-3">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                >
                  <CaretDown size={14} className="text-accent/60" />
                </motion.div>
              </button>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.25, ease }}
                  className="overflow-hidden"
                >
                  <div style={{ padding: "0 var(--contact-card-pad, 14px) var(--contact-card-pad, 14px)" }}>
                    <div className="w-full h-px bg-accent/10 mb-3" />
                    <p className="text-xs text-text-secondary/60 leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MOBILE CTA ─── */

function MobileCTASection() {
  return (
    <section className="bg-[#0D0C0B] relative overflow-hidden" style={{ padding: "clamp(58px, 18vw, 84px) 0" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(600px circle at 50% 0%, rgba(212,168,73,0.06), transparent)" }} />
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <ShapeGrid speed={0.05} squareSize={48} direction="diagonal" borderColor="#D4A849" shape="square" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="relative z-10 text-center" style={{ paddingLeft: "var(--contact-pad, 16px)", paddingRight: "var(--contact-pad, 16px)" }}>
        <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent block mb-3">Start Building</span>
        <h2 className="font-display font-semibold tracking-[-0.03em] text-text-primary text-balance" style={{ fontSize: "clamp(1.8rem, 9vw, 2.75rem)", lineHeight: "0.95" }}>
          Ready to start <span className="text-accent">growing?</span>
        </h2>
        <p className="text-text-secondary/70 mt-3 mb-6" style={{ fontSize: "clamp(14px, 4vw, 16px)", maxWidth: "40ch", margin: "12px auto 24px" }}>
          Free audit. No commitment. First results within 60 days or we fix it.
        </p>
        <div className="flex flex-col items-center gap-3" style={{ minHeight: "48px" }}>
          <button
            onClick={() => document.getElementById("mobile-assessment")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative inline-flex items-center gap-2 bg-accent text-ground pl-6 pr-2 py-2.5 rounded-full font-medium text-sm active:scale-[0.98] transition-all duration-150 hover:brightness-105"
            style={{ minHeight: "48px" }}
          >
            <span>Start Assessment</span>
            <span className="w-7 h-7 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={14} weight="bold" />
            </span>
          </button>
          <a
            href="mailto:hello@zon.agency"
            className="text-xs text-text-secondary/50 underline underline-offset-4 hover:text-text-primary transition-colors duration-200"
          >
            Or email us directly
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════ */

export function ContactContent() {
  const [engineOpen, setEngineOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ─── Mobile render ─── */
  if (isMobile) {
    return (
      <div className="contact-page" style={{ ...mobileVars, overflowX: "hidden" }}>
        <style>{`
          .contact-page {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .contact-page * {
            box-sizing: border-box;
          }
          @media (prefers-reduced-motion: reduce) {
            .contact-page *, .contact-page *::before, .contact-page *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
        <LeadIntelligenceEngine open={engineOpen} onOpenChange={setEngineOpen} />
        <MobileHero />
        <MobileConsultationSection />
        <MobileJourneySection />
        <MobileProcessSection />
        <MobileConsultantsSection />
        <MobileGlobalSection />
        <MobileTrustSection />
        <MobileFAQSection />
        <MobileCTASection />
      </div>
    );
  }

  /* ─── Desktop render (unchanged) ─── */
  return (
    <>
      <LeadIntelligenceEngine open={engineOpen} onOpenChange={setEngineOpen} />
      <HeroSection onStartAssessment={() => setEngineOpen(true)} />
      <ConsultationSection />
      <JourneySection />
      <ProcessSection />
      <ConsultantsSection />
      <GlobalSection />
      <TrustSection />
      <FAQSection />
      <CTASection onStartAssessment={() => setEngineOpen(true)} />
    </>
  );
}
