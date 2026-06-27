"use client";

import Link from "next/link";
import { XLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react";

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Search & Organic", href: "/services/seo" },
      { label: "GEO & AI Search", href: "/services/geo-ai-search" },
      { label: "Digital PR", href: "/services/digital-pr" },
      { label: "Paid Media", href: "/services/paid-media" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "AI Automation", href: "/services/ai-automation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ground border-t border-[#F2EDE6]/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
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

        <div className="mt-16 pt-6 border-t border-[#F2EDE6]/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-text-secondary">
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
