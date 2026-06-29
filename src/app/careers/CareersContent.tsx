"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedSection from "@/components/RelatedSection";
import { getBreadcrumbs } from "@/data/relations";
import { motion } from "framer-motion";
import {
  Globe,
  CurrencyDollar,
  GraduationCap,
  Clock,
  Heartbeat,
  StackSimple,
  ArrowRight,
  EnvelopeSimple,
  MagnifyingGlass,
  Code,
  Robot,
  PencilCircle,
  ChartBar,
  UserCircle,
} from "@phosphor-icons/react";

const benefits = [
  { icon: Globe, title: "Remote-First Culture", desc: "Work from anywhere in the world. We're built around trust and output, not hours at a desk." },
  { icon: CurrencyDollar, title: "Competitive Salary & Equity", desc: "Top-market compensation with meaningful equity so you share in the company's success." },
  { icon: GraduationCap, title: "Learning & Development Budget", desc: "Annual budget for courses, conferences, certifications, and tools you need to grow." },
  { icon: Clock, title: "Flexible Working Hours", desc: "Async-first approach with no fixed hours. Plan your day around your most productive time." },
  { icon: Heartbeat, title: "Health & Wellness", desc: "Comprehensive health insurance, mental health support, and a wellness stipend." },
  { icon: StackSimple, title: "Growth Opportunities", desc: "Clear career progression, mentorship programs, and the chance to work on high-impact projects." },
];

const positions = [
  {
    title: "SEO Specialist",
    department: "Search",
    type: "Full-Time",
    location: "Remote",
    icon: MagnifyingGlass,
    desc: "Plan and execute technical SEO audits, on-page optimisation, and link-building strategies that drive measurable organic growth for our clients.",
  },
  {
    title: "Full-Stack Developer",
    department: "Engineering",
    type: "Full-Time",
    location: "Remote",
    icon: Code,
    desc: "Build high-performance Next.js applications, headless CMS architectures, and custom digital tools that power our clients' growth systems.",
  },
  {
    title: "AI Engineer",
    department: "Engineering",
    type: "Full-Time",
    location: "Remote",
    icon: Robot,
    desc: "Develop AI agents, LLM pipelines, and automation systems that transform how businesses handle search, content, and lead qualification.",
  },
  {
    title: "Content Strategist",
    department: "Content",
    type: "Full-Time",
    location: "Remote",
    icon: PencilCircle,
    desc: "Craft data-driven content strategies that rank in both traditional search and generative AI platforms, from brief to publication.",
  },
  {
    title: "Paid Media Manager",
    department: "Media",
    type: "Full-Time",
    location: "Remote",
    icon: ChartBar,
    desc: "Manage and optimise paid search, social, and display campaigns across Google, LinkedIn, and emerging platforms to maximise ROAS.",
  },
  {
    title: "Account Manager",
    department: "Client Success",
    type: "Full-Time",
    location: "Remote",
    icon: UserCircle,
    desc: "Serve as the primary client contact, driving strategy alignment, reporting, and relationship growth across multi-service engagements.",
  },
  {
    title: "Senior Data Analyst",
    department: "Data",
    type: "Full-Time",
    location: "Remote",
    icon: ChartBar,
    desc: "Turn complex datasets into actionable insights, build dashboards, and uncover growth opportunities through statistical analysis.",
  },
];

const steps = [
  { step: "01", title: "Apply", desc: "Submit your application and tell us why you'd be a great fit. We review every application personally." },
  { step: "02", title: "Screening Call", desc: "A casual 30-minute chat to learn about your experience, goals, and answer any questions about ZON." },
  { step: "03", title: "Skill Assessment", desc: "A practical, real-world task that reflects the work you'd actually do. No brain teasers or whiteboarding." },
  { step: "04", title: "Team Interview", desc: "Meet the team you'd work with. We discuss your approach, collaboration style, and how you solve problems." },
  { step: "05", title: "Offer", desc: "If it's a mutual fit, you'll receive a transparent offer with full details on compensation and benefits." },
];

export function CareersContent() {
  return (
    <>
      <section className="pt-36 pb-20 bg-ground amber-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">
              Careers
            </span>
            <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.025em] leading-[1] text-text-primary mb-6">
              Build the future of<br />
              <span className="text-accent">digital growth.</span>
            </h1>
            <p className="text-text-secondary leading-relaxed max-w-[55ch]">
              We&rsquo;re a lean, ambitious team building the infrastructure for modern digital growth.
              If you care about craft, output, and pushing what&rsquo;s possible in search and AI,
              you&rsquo;ll fit right in.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }}
            className="max-w-2xl mb-14"
          >
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">
              Why ZON
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-text-primary">
              Built for people who<br className="hidden sm:block" />
              <span className="text-accent">build things.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ y: 32, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }}
                  className="double-bezel group"
                >
                  <div className="double-bezel-inner p-6 lg:p-8 group-hover:bg-surface-alt transition-all duration-500">
                    <Icon size={24} className="text-accent mb-4" />
                    <h3 className="font-display text-base font-medium text-text-primary mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }}
            className="max-w-2xl mb-14"
          >
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">
              Open Positions
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-text-primary">
              Join the <span className="text-accent">team.</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {positions.map((position) => {
              const Icon = position.icon;
              return (
                <motion.div
                  key={position.title}
                  initial={{ y: 32, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }}
                >
                  <Link href="#" className="double-bezel group block">
                    <div className="double-bezel-inner p-6 lg:p-8 group-hover:bg-surface-alt transition-all duration-500">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                        <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 shrink-0">
                          <Icon size={20} className="text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-lg font-medium text-text-primary group-hover:text-accent transition-colors">
                            {position.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                            <span className="text-[11px] font-medium tracking-wide uppercase text-accent">
                              {position.department}
                            </span>
                            <span className="text-[11px] text-text-secondary/60">/</span>
                            <span className="text-xs text-text-secondary">{position.type}</span>
                            <span className="text-[11px] text-text-secondary/60">/</span>
                            <span className="text-xs text-text-secondary">{position.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <p className="hidden lg:block text-sm text-text-secondary leading-relaxed max-w-[40ch] line-clamp-2">
                            {position.desc}
                          </p>
                          <span className="inline-flex items-center gap-2 text-xs text-accent whitespace-nowrap group/link shrink-0">
                            View Position
                            <ArrowRight size={12} className="transition-transform duration-300 group-hover/link:translate-x-0.5" />
                          </span>
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

      <section className="py-20 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }}
            className="max-w-2xl mb-14"
          >
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">
              Hiring Process
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-text-primary">
              How we <span className="text-accent">hire.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step) => (
              <motion.div
                key={step.step}
                initial={{ y: 32, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }}
                className="double-bezel group"
              >
                <div className="double-bezel-inner p-6 lg:p-8 group-hover:bg-surface-alt transition-all duration-500">
                  <span className="font-display text-2xl font-semibold text-accent mb-3 block">
                    {step.step}
                  </span>
                  <h3 className="font-display text-base font-medium text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 lg:py-32 bg-ground relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(800px circle at 50% 0%, rgba(212,168,73,0.04), transparent)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }}
            className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.025em] leading-[1] text-text-primary mb-6"
          >
            Don&rsquo;t see the right role?
          </motion.h2>

          <motion.p
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.32, 0.72, 0, 1] as const }}
            className="text-text-secondary text-base max-w-[55ch] mx-auto mb-10"
          >
            We&rsquo;re always looking for talented people. Send us your CV and tell us how
            you can contribute to ZON&rsquo;s mission.
          </motion.p>

          <motion.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] as const }}
          >
            <Link
              href="mailto:careers@zon.agency"
              className="group inline-flex items-center gap-2 bg-accent text-ground pl-6 pr-2 py-2 rounded-full font-medium text-sm active:scale-[0.98] transition-transform duration-150"
            >
              Send Your CV
              <span className="w-7 h-7 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <EnvelopeSimple size={14} weight="bold" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Breadcrumbs crumbs={getBreadcrumbs("careers", "hub")} />
        <div className="text-center mb-12">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent">Explore More</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-[0.95] text-text-primary mt-3">More About ZON</h2>
        </div>
        <RelatedSection
          groups={[
            { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Team", href: "/team" }, { label: "Contact", href: "/contact" }, { label: "Our Work", href: "/work" }] },
            { title: "Services", links: [{ label: "All Services", href: "/services" }, { label: "SEO Strategy", href: "/seo-strategy" }, { label: "Generative Engine Optimisation", href: "/generative-engine-optimisation" }] },
            { title: "Solutions", links: [{ label: "All Solutions", href: "/solutions" }, { label: "Improve Search Visibility", href: "/improve-search-visibility" }, { label: "Become Visible in AI Search", href: "/become-visible-in-ai-search" }] },
          ]}
        />
      </section>
    </>
  );
}
