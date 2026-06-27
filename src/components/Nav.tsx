"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { List, X, ArrowRight } from "@phosphor-icons/react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/#process" },
  { label: "Thinking", href: "/insights" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <div className="w-full max-w-[1200px] mx-auto bg-[#111110]/80 backdrop-blur-xl border border-[#F2EDE6]/8 rounded-full px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium tracking-tight text-text-primary">
          ZON
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/tools/seo-audit"
          className="hidden lg:inline-flex items-center gap-2 bg-accent text-ground text-sm font-medium px-5 py-2.5 rounded-full active:scale-[0.97] transition-transform duration-150 hover:brightness-105 group"
        >
          Get Free Audit
          <span className="w-5 h-5 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight size={12} weight="bold" />
          </span>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-text-primary"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <List size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 bg-ground/95 backdrop-blur-xl z-40 lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-display font-medium text-text-primary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="mt-4"
              >
                <Link
                  href="/tools/seo-audit"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 bg-accent text-ground text-sm font-medium px-6 py-3 rounded-full"
                >
                  Get Free Audit
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
