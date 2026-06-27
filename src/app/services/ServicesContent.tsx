"use client";

import Link from "next/link";
import {
  Binoculars,
  Robot,
  Lightning,
  Code,
  Gear,
  ChartBar,
  ArrowRight,
} from "@phosphor-icons/react";

const pillars = [
  {
    name: "Search & Organic Growth",
    slug: "seo",
    icon: Binoculars,
    desc: "Complete SEO strategy from technical audits to content development and link building.",
    services: ["SEO Strategy", "Technical SEO", "On-Page SEO", "Off-Page SEO", "Local SEO", "E-commerce SEO", "Content Strategy"],
  },
  {
    name: "GEO & AI Search",
    slug: "geo-ai-search",
    icon: Robot,
    desc: "Optimise for generative engines, AI overviews and LLM-based discovery platforms.",
    services: ["Generative Engine Optimisation", "AI Search Audits", "Entity Optimisation", "Brand Citation", "AI-Friendly Content", "LLM Content Testing"],
  },
  {
    name: "Conversion Authority",
    slug: "conversion",
    icon: Lightning,
    desc: "Digital PR, paid media, and conversion optimisation that builds trust and drives action.",
    services: ["Digital PR", "Paid Media", "Conversion Optimisation", "Landing Page Design", "CRO Audits", "A/B Testing"],
  },
  {
    name: "Web Performance",
    slug: "web-performance",
    icon: ChartBar,
    desc: "Next.js builds, Core Web Vitals optimisation, and headless CMS architecture.",
    services: ["Next.js Development", "Corporate Websites", "Performance Optimisation", "Headless CMS", "Landing Pages", "E-commerce"],
  },
  {
    name: "Web & Software Development",
    slug: "custom-software",
    icon: Code,
    desc: "Custom SaaS, portals, CRMs, and internal tools built on modern stacks.",
    services: ["Custom CRM", "SaaS Development", "Client Portals", "Admin Panels", "API Development", "Integrations"],
  },
  {
    name: "B/S Automation",
    slug: "automation",
    icon: Gear,
    desc: "Workflow automation, AI agents, and lead qualification systems that replace manual busywork.",
    services: ["AI Agents", "Workflow Automation", "Lead Qualification", "Customer Support AI", "Marketing Automation", "Document Processing"],
  },
];

export function ServicesContent() {
  return (
    <>
      <section className="pt-36 pb-20 bg-ground amber-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">
              Services
            </span>
            <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.025em] leading-[1] text-text-primary mb-6">
              Everything you need<br />
              <span className="text-accent">to grow digitally.</span>
            </h1>
            <p className="text-text-secondary leading-relaxed max-w-[55ch]">
              Six interconnected service pillars covering search, AI, software and
              media — working together as one growth system.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.slug} className="double-bezel group">
                  <div className="double-bezel-inner p-6 lg:p-8 group-hover:bg-surface-alt transition-all duration-500">
                    <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12">
                      <div>
                        <Icon size={24} className="text-accent mb-3" />
                        <h2 className="font-display text-xl font-medium text-text-primary mb-2">
                          {pillar.name}
                        </h2>
                        <p className="text-sm text-text-secondary leading-relaxed mb-4">
                          {pillar.desc}
                        </p>
                        <Link
                          href={`/services/${pillar.slug}`}
                          className="inline-flex items-center gap-1 text-xs text-accent hover:brightness-110 transition-all group/link"
                        >
                          Explore <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-0.5" />
                        </Link>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {pillar.services.map((service) => (
                          <Link
                            key={service}
                            href={`/services/${pillar.slug}/${service.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-sm text-text-secondary hover:text-text-primary px-3 py-2 rounded-lg hover:bg-surface transition-all duration-200"
                          >
                            {service}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
