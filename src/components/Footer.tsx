"use client";

import { useState } from "react";
import Link from "next/link";
import { XLogo, LinkedinLogo, YoutubeLogo, CaretDown } from "@phosphor-icons/react";

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "All Services", href: "/services" },
      { label: "Search & Organic", href: "/seo-strategy" },
      { label: "GEO & AI Search", href: "/generative-engine-optimisation" },
      { label: "Digital PR", href: "/digital-pr" },
      { label: "Paid Media", href: "/google-ads" },
      { label: "Web Development", href: "/nextjs-development" },
      { label: "AI Automation", href: "/ai-agents" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "All Industries", href: "/industries" },
      { label: "Dental & Healthcare", href: "/dental-healthcare" },
      { label: "E-commerce", href: "/ecommerce" },
      { label: "SaaS & Technology", href: "/saas-technology" },
      { label: "Real Estate", href: "/real-estate" },
      { label: "Legal Services", href: "/legal-services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "All Solutions", href: "/solutions" },
      { label: "Generate More Leads", href: "/generate-more-qualified-leads" },
      { label: "Improve Search Visibility", href: "/improve-search-visibility" },
      { label: "AI Search Visibility", href: "/become-visible-in-ai-search" },
      { label: "Build a Custom CRM", href: "/build-custom-crm" },
      { label: "Automate Manual Work", href: "/reduce-manual-work-automation" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "All Tools", href: "/tools" },
      { label: "SEO Audit", href: "/seo-audit" },
      { label: "GEO Readiness", href: "/geo-readiness" },
      { label: "SERP Preview", href: "/serp-preview-tool" },
      { label: "Schema Generator", href: "/schema-generator" },
      { label: "Ads Calculator", href: "/ads-calculator" },
    ],
  },
];

function AccordionGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden border-b border-[#F2EDE6]/[0.04] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-left"
        aria-expanded={open}
      >
        <h4 className="text-[11px] text-text-secondary tracking-widest uppercase">{title}</h4>
        <CaretDown
          size={14}
          className={`text-text-secondary/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[400px] opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-2.5">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 block py-1"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ground border-t border-[#F2EDE6]/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Desktop grid */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-16">
          <div>
            <Link href="/" className="font-display text-lg font-semibold text-text-primary tracking-tight">
              ZON
            </Link>
            <p className="text-sm text-text-secondary mt-3 max-w-[35ch]">
              A digital growth platform combining search, AI, and software to turn traffic into revenue.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors" aria-label="X / Twitter">
                <XLogo size={20} weight="light" />
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors" aria-label="LinkedIn">
                <LinkedinLogo size={20} weight="light" />
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors" aria-label="YouTube">
                <YoutubeLogo size={20} weight="light" />
              </a>
            </div>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-[11px] text-text-secondary tracking-widest uppercase mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="lg:hidden">
          <div className="mb-8">
            <Link href="/" className="font-display text-lg font-semibold text-text-primary tracking-tight">
              ZON
            </Link>
            <p className="text-sm text-text-secondary mt-2 max-w-[35ch]">
              A digital growth platform combining search, AI, and software to turn traffic into revenue.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors" aria-label="X / Twitter">
                <XLogo size={20} weight="light" />
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors" aria-label="LinkedIn">
                <LinkedinLogo size={20} weight="light" />
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors" aria-label="YouTube">
                <YoutubeLogo size={20} weight="light" />
              </a>
            </div>
          </div>
          {footerLinks.map((group) => (
            <AccordionGroup key={group.title} title={group.title} links={group.links} />
          ))}
        </div>

        <div className="mt-12 lg:mt-16 pt-6 border-t border-[#F2EDE6]/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-text-secondary text-center sm:text-left">
            &copy; {new Date().getFullYear()} ZON. Built on search, AI, and measurable results.
          </span>
          <div className="flex items-center gap-4 text-xs text-text-secondary">
            <Link href="/legal/privacy" className="hover:text-text-primary transition-colors">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
