"use client";

import Link from "next/link";
import {
  MagnifyingGlass,
  SealPercent,
  Globe,
  Code,
  Calculator,
  FileText,
  SealCheck,
} from "@phosphor-icons/react";

const toolCategories = [
  {
    name: "SEO Tools",
    tools: [
      { name: "Website SEO Audit", slug: "seo-audit", icon: MagnifyingGlass, desc: "Comprehensive technical and content SEO analysis" },
      { name: "SERP Preview", slug: "serp-preview", icon: Globe, desc: "Preview search result snippets across devices" },
      { name: "Schema Generator", slug: "schema-generator", icon: Code, desc: "Generate structured data markup for rich results" },
    ],
  },
  {
    name: "GEO & AI Search",
    tools: [
      { name: "GEO Readiness Audit", slug: "geo-readiness", icon: SealCheck, desc: "Measure AI search and generative engine readiness" },
      { name: "AI Visibility Checker", slug: "ai-visibility", icon: SealPercent, desc: "Check how your brand appears in AI platforms" },
    ],
  },
  {
    name: "Advertising & Content",
    tools: [
      { name: "Ads Cost Calculator", slug: "ads-calculator", icon: Calculator, desc: "Estimate paid search costs and ROAS" },
      { name: "Content Brief Generator", slug: "content-brief", icon: FileText, desc: "Generate data-driven content briefs" },
    ],
  },
];

export function ToolsContent() {
  return (
    <>
      <section className="pt-36 pb-20 bg-ground amber-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">
              Free Tools
            </span>
            <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.025em] leading-[1] text-text-primary mb-6">
              Audit, analyse,<br />
              <span className="text-accent">improve.</span>
            </h1>
            <p className="text-text-secondary leading-relaxed max-w-[55ch]">
              Run free audits to understand your SEO health, GEO readiness, technical
              performance and more. No sign-up required for basic results.
            </p>
          </div>
        </div>
      </section>

      {toolCategories.map((category) => (
        <section key={category.name} className="py-16 lg:py-20 border-b border-[#F2EDE6]/[0.04] last:border-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-medium text-text-primary mb-8">
              {category.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="double-bezel group"
                  >
                    <div className="double-bezel-inner p-6 group-hover:bg-surface-alt transition-all duration-300">
                      <Icon size={20} className="text-accent mb-3" />
                      <h3 className="font-display text-base font-medium text-text-primary mb-1.5 group-hover:text-accent transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
