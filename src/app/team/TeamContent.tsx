"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedSection from "@/components/RelatedSection";
import { getBreadcrumbs } from "@/data/relations";
import {
  ArrowRight,
  LinkedinLogo,
  XLogo,
  Handshake,
  Target,
  ChartLineUp,
  Heart,
} from "@phosphor-icons/react";

const teamMembers = [
  {
    name: "Alex Chen",
    role: "CEO & Co-Founder",
    bio: "15 years in digital growth. Previously led performance marketing at a top-tier D2C fund.",
    initials: "AC",
    linkedin: "#",
    x: "#",
  },
  {
    name: "Maya Patel",
    role: "CTO & Co-Founder",
    bio: "AI engineer turned technical leader. Built search infrastructure serving 10M+ monthly queries.",
    initials: "MP",
    linkedin: "#",
    x: "#",
  },
  {
    name: "James Okonkwo",
    role: "Head of SEO",
    bio: "SEO veteran behind multiple Forbes 500 organic growth programmes across EMEA and APAC.",
    initials: "JO",
    linkedin: "#",
    x: "#",
  },
  {
    name: "Sarah Lindqvist",
    role: "Head of Engineering",
    bio: "Full-stack architect who scaled platforms from zero to enterprise at three different startups.",
    initials: "SL",
    linkedin: "#",
    x: "#",
  },
  {
    name: "Diego Ramos",
    role: "Lead Developer",
    bio: "React and Node specialist. Builds high-performance web apps with a focus on Core Web Vitals.",
    initials: "DR",
    linkedin: "#",
    x: "#",
  },
  {
    name: "Elena Vos",
    role: "Head of Content",
    bio: "Journalist-turned-content-strategist. Her teams have driven 5x organic traffic increases.",
    initials: "EV",
    linkedin: "#",
    x: "#",
  },
  {
    name: "Riku Tanaka",
    role: "Head of Design",
    bio: "Design systems expert who blends brand identity with conversion-focused UI/UX.",
    initials: "RT",
    linkedin: "#",
    x: "#",
  },
  {
    name: "Priya Sharma",
    role: "Head of Growth",
    bio: "Data-driven growth lead. Combines paid media, PR, and CRO into measurable revenue engines.",
    initials: "PS",
    linkedin: "#",
    x: "#",
  },
];

const values = [
  {
    icon: Handshake,
    title: "Radical Transparency",
    desc: "We share results, roadmaps, and pricing openly. No hidden fees, no black-box reporting.",
  },
  {
    icon: Target,
    title: "Obsession Over Outcome",
    desc: "Every tactic ties to a business metric. If it doesn't move revenue, we don't do it.",
  },
  {
    icon: ChartLineUp,
    title: "Build, Measure, Learn",
    desc: "We iterate fast with data. Hypotheses become experiments, experiments become systems.",
  },
  {
    icon: Heart,
    title: "People First",
    desc: "Great work comes from healthy teams. We invest in growth, wellbeing, and real autonomy.",
  },
];

export function TeamContent() {
  return (
    <>
      <section className="pt-36 pb-20 bg-ground amber-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">
              Our Team
            </span>
            <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.025em] leading-[1] text-text-primary mb-6">
              People who <span className="text-accent">deliver results.</span>
            </h1>
            <p className="text-text-secondary leading-relaxed max-w-[55ch]">
              Search specialists, AI engineers, software developers, and growth
              strategists — working as one team to turn organic traffic into
              measurable revenue for our clients.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ y: 32, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.32, 0.72, 0, 1] }}
                className="double-bezel group"
              >
                <div className="double-bezel-inner p-6 lg:p-8 group-hover:bg-surface-alt transition-all duration-500 text-center">
                  <div className="w-20 h-20 mx-auto bg-surface-alt rounded-full flex items-center justify-center mb-4">
                    <span className="font-display text-xl font-semibold text-accent">
                      {member.initials}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-medium text-text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent text-sm mb-2">{member.role}</p>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href={member.linkedin}
                      className="text-text-secondary hover:text-accent transition-colors"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <LinkedinLogo size={18} />
                    </a>
                    <a
                      href={member.x}
                      className="text-text-secondary hover:text-accent transition-colors"
                      aria-label={`${member.name} on X`}
                    >
                      <XLogo size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 border-t border-[#F2EDE6]/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="mb-12"
          >
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">
              Culture
            </span>
            <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em] leading-[1.1] text-text-primary mb-4">
              How we work.
            </h2>
            <p className="text-text-secondary leading-relaxed max-w-[55ch]">
              These four principles shape every decision we make — from how we
              build client strategies to how we treat each other.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ y: 32, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
                  className="double-bezel group"
                >
                  <div className="double-bezel-inner p-6 lg:p-8 group-hover:bg-surface-alt transition-all duration-500">
                    <Icon size={24} className="text-accent mb-3" />
                    <h3 className="font-display text-base font-medium text-text-primary mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-[#0D0C0B] relative overflow-hidden">
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
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="font-display font-semibold text-[clamp(2.5rem,4vw,4rem)] tracking-[-0.025em] leading-[1] text-text-primary mb-4"
          >
            Join the team.
          </motion.h2>
          <motion.p
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
            className="text-text-secondary text-base max-w-[55ch] mx-auto mb-10"
          >
            We&rsquo;re always looking for curious, ambitious people who want to build
            the future of digital growth. If that sounds like you, we&rsquo;d love to
            hear from you.
          </motion.p>
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          >
            <Link
              href="/careers"
              className="group inline-flex items-center gap-2 bg-accent text-ground pl-6 pr-2 py-2 rounded-full font-medium text-sm active:scale-[0.98] transition-transform duration-150"
            >
              View Openings
              <span className="w-7 h-7 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowRight size={14} weight="bold" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Breadcrumbs crumbs={getBreadcrumbs("team", "hub")} />
        <div className="text-center mb-12">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent">Explore More</span>
          <h2 className="font-display font-semibold text-[clamp(1.75rem,4vw,3.5rem)] tracking-[-0.03em] leading-[0.95] text-text-primary mt-3">More About ZON</h2>
        </div>
        <RelatedSection
          groups={[
            { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "Contact", href: "/contact" }, { label: "Our Work", href: "/work" }] },
            { title: "Services", links: [{ label: "All Services", href: "/services" }, { label: "SEO Strategy", href: "/seo-strategy" }, { label: "Generative Engine Optimisation", href: "/generative-engine-optimisation" }] },
            { title: "Solutions", links: [{ label: "All Solutions", href: "/solutions" }, { label: "Improve Search Visibility", href: "/improve-search-visibility" }, { label: "Become Visible in AI Search", href: "/become-visible-in-ai-search" }] },
          ]}
        />
      </section>
    </>
  );
}
