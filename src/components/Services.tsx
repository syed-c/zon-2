"use client";

import { motion } from "framer-motion";
import {
  Binoculars,
  Robot,
  Lightning,
  Code,
  Gear,
  ChartBar,
} from "@phosphor-icons/react";

const services = [
  {
    category: "Organic Growth",
    name: "Search & Organic",
    desc: "End-to-end SEO — technical audits, content strategy, and authority building that compounds over time.",
    metric: "47.3% avg. organic lift",
    icon: Binoculars,
    size: "large",
  },
  {
    category: "AI Systems",
    name: "SEO & AI",
    desc: "AI content briefs, entity optimisation, and generative engine readiness for the search landscape.",
    metric: "3.2x content velocity",
    icon: Robot,
    size: "tall",
  },
  {
    category: "Media",
    name: "Conversion Authority",
    desc: "Digital PR, paid media, and conversion optimisation that builds trust and drives action.",
    metric: "2.8x conversion rate",
    icon: Lightning,
    size: "small",
  },
  {
    category: "Platforms",
    name: "Web Performance",
    desc: "Next.js builds, Core Web Vitals optimisation, and headless CMS architecture.",
    metric: "98% Lighthouse score",
    icon: ChartBar,
    size: "small",
  },
  {
    category: "Engineering",
    name: "Web & Software Development",
    desc: "Custom SaaS, portals, CRMs, and internal tools built on modern stacks.",
    metric: "12 platforms shipped",
    icon: Code,
    size: "wide",
  },
  {
    category: "Automation",
    name: "B/S Automation",
    desc: "Workflow automation, AI agents, and lead qualification systems that replace manual busywork.",
    metric: "40+ hrs/week saved",
    icon: Gear,
    size: "small",
  },
];

const variants = {
  hidden: { y: 24, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const },
  },
};

function ServiceCard({ service }: { service: typeof services[0] }) {
  const Icon = service.icon;
  return (
    <motion.div variants={variants} className="double-bezel group cursor-default">
      <div className="double-bezel-inner p-6 lg:p-8 h-full flex flex-col group-hover:bg-[#1A1917] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
        {service.size === "tall" ? (
          <div className="flex flex-col h-full">
            <Icon size={48} className="text-accent mb-6" weight="light" />
            <div className="mt-auto">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary">
                {service.category}
              </span>
              <h3 className="font-display text-xl font-semibold text-text-primary mt-2 mb-2">
                {service.name}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {service.desc}
              </p>
              <span className="font-mono text-xs text-accent">{service.metric}</span>
            </div>
          </div>
        ) : (
          <>
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-2">
              {service.category}
            </span>
            <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
              {service.name}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
              {service.desc}
            </p>
            {service.size === "large" ? (
              <div className="flex items-center justify-between mt-auto">
                <span className="font-mono text-xs text-accent">{service.metric}</span>
                <Icon size={24} className="text-text-secondary" weight="light" />
              </div>
            ) : (
              <span className="font-mono text-xs text-accent">{service.metric}</span>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="py-28 lg:py-32 bg-ground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="font-display font-semibold text-[clamp(2rem,3.5vw,3rem)] tracking-[-0.02em] leading-[1.05] text-text-primary text-balance mb-16 max-w-4xl"
        >
          Every capability a growth-obsessed business requires.
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-auto grid-flow-dense"
        >
          <div className="sm:col-span-2 row-span-1">
            <ServiceCard service={services[0]} />
          </div>
          <div className="row-span-2">
            <ServiceCard service={services[1]} />
          </div>
          <div className="col-span-1">
            <ServiceCard service={services[2]} />
          </div>
          <div className="col-span-1">
            <ServiceCard service={services[3]} />
          </div>
          <div className="sm:col-span-2 col-span-1">
            <ServiceCard service={services[4]} />
          </div>
          <div className="col-span-1">
            <ServiceCard service={services[5]} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
