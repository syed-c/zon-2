"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";

const auditCategories = [
  { label: "Technical SEO", bars: 3 },
  { label: "Content", bars: 4 },
  { label: "Authority", bars: 2 },
  { label: "Performance", bars: 4 },
];

export default function AuditTool({ isHomePage }: { isHomePage?: boolean } = {}) {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setScanning(true);
    setScanned(false);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2500);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-ground border-y border-[#F2EDE6]/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <h2 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.02em] leading-[1.05] text-text-primary text-balance mb-4">
              Audit your digital presence in{" "}
              <span className="text-accent">30 seconds.</span>
            </h2>
            <p className="text-text-secondary leading-relaxed max-w-[52ch] mb-6 lg:mb-8">
              Get an instant snapshot of your technical SEO, content quality, and
              authority signals. No signup, no sales call — just actionable data.
            </p>

            <form onSubmit={handleSubmit} className="mb-4">
              <div className={`${isHomePage ? "hp-audit-form-stacked lg:flex lg:flex-row" : "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0"}`}>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your website URL"
                  className={`${isHomePage ? "hp-audit-input lg:bg-surface-alt lg:border lg:border-[#F2EDE6]/8 lg:rounded-full lg:rounded-r-none lg:px-5 lg:px-6 lg:py-4 lg:text-text-primary" : "flex-1 bg-surface-alt border border-[#F2EDE6]/8 rounded-full sm:rounded-r-none px-5 sm:px-6 py-3.5 sm:py-4 text-text-primary placeholder:text-text-secondary outline-none focus:outline-[#D4A849] focus:outline-2 focus:outline-offset-0 text-sm transition-all"}`}
                  required
                />
                <button
                  type="submit"
                  className={`${isHomePage ? "hp-audit-btn lg:bg-accent lg:text-ground lg:px-6 lg:py-4 lg:rounded-full lg:rounded-l-none lg:font-medium lg:text-sm" : "bg-accent text-ground px-6 py-3.5 sm:py-4 rounded-full sm:rounded-l-none font-medium text-sm active:scale-[0.98] transition-transform duration-150 hover:brightness-105 flex items-center justify-center gap-2 z-10"}`}
                >
                  {scanning ? "Scanning..." : "Audit"}
                  <ArrowRight size={14} weight="bold" />
                </button>
              </div>
            </form>

            <div className="hp-audit-trust lg:flex lg:gap-4 lg:text-[11px] lg:text-text-secondary lg:tracking-wide">
              <span>&#10003; Free</span>
              <span>&#10003; No signup</span>
              <span>&#10003; Instant results</span>
            </div>

            {isHomePage && (
              <div className="hp-audit-preview-grid lg:hidden">
                <div className="hp-audit-preview-item">
                  <span className="hp-audit-preview-dot" />
                  <span className="hp-audit-preview-text">Technical foundation</span>
                </div>
                <div className="hp-audit-preview-item">
                  <span className="hp-audit-preview-dot" />
                  <span className="hp-audit-preview-text">Search visibility</span>
                </div>
                <div className="hp-audit-preview-item">
                  <span className="hp-audit-preview-dot" />
                  <span className="hp-audit-preview-text">AI discoverability</span>
                </div>
                <div className="hp-audit-preview-item">
                  <span className="hp-audit-preview-dot" />
                  <span className="hp-audit-preview-text">Content authority</span>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="double-bezel">
              <div className="double-bezel-inner p-8">
                  {scanning ? (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-12 gap-4"
                    >
                      <MagnifyingGlass size={32} className="text-accent animate-pulse" />
                      <span className="font-mono text-sm text-text-secondary">Scanning your site...</span>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-accent"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ) : scanned ? (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="text-center mb-8">
                        <span className="font-mono text-5xl font-medium text-text-primary">78</span>
                        <span className="font-mono text-lg text-text-secondary">/100</span>
                        <div className="text-[11px] text-text-secondary mt-1 tracking-wider uppercase">
                          Overall Score
                        </div>
                      </div>
                      <div className="space-y-3">
                        {auditCategories.map((cat) => (
                          <div key={cat.label} className="flex items-center gap-3">
                            <span className="text-xs text-text-secondary w-28 shrink-0">{cat.label}</span>
                            <div className="flex gap-1 flex-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`h-1.5 rounded-full flex-1 ${
                                    i < cat.bars ? "bg-accent" : "bg-surface-alt"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center gap-2 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
                        <span className="text-[11px] text-text-secondary">3 critical issues found</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-12"
                    >
                      <MagnifyingGlass size={32} className="text-text-secondary" weight="light" />
                      <span className="text-sm text-text-secondary mt-3">
                        Enter a URL to see your audit results
                      </span>
                    </motion.div>
                  )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
