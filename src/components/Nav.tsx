"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  List, X, ArrowRight, ArrowUpRight,
  LinkedinLogo, YoutubeLogo, Sparkle,
} from "@phosphor-icons/react";
import LeadIntelligenceEngine from "@/components/LeadIntelligenceEngine";

interface NavItem {
  label: string;
  href: string;
  desc: string;
}

const navLinks: NavItem[] = [
  { label: "Services", href: "/services", desc: "What we build" },
  { label: "Solutions", href: "/solutions", desc: "How we solve growth problems" },
  { label: "Tools", href: "/tools", desc: "Free growth & marketing tools" },
  { label: "Industries", href: "/industries", desc: "Expertise by sector" },
  { label: "Work", href: "/work", desc: "Selected results & case studies" },
  { label: "About", href: "/about", desc: "How ZON works" },
  { label: "Contact", href: "/contact", desc: "Start a conversation" },
];

const pad = (n: number) => String(n + 1).padStart(2, "0");

function isActiveLink(href: string, pathname: string) {
  if (href === "/contact") return pathname === "/contact";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [engineOpen, setEngineOpen] = useState(false);
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
    if (!isMobileMenuOpen && openButtonRef.current) {
      openButtonRef.current.focus();
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ─── DESKTOP & MOBILE HEADER ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 flex justify-center px-4 transition-all duration-300 ${
          scrolled ? "pt-3" : "pt-4 sm:pt-6"
        }`}
        style={{ paddingTop: scrolled ? "12px" : undefined, zIndex: 950 }}
      >
        <div
          className={`w-full max-w-[1200px] mx-auto bg-[#111110]/80 backdrop-blur-xl border border-[#F2EDE6]/8 rounded-full px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "py-2" : "py-2.5 sm:py-3"
          }`}
        >
          <Link href="/" className="text-sm sm:text-base font-medium tracking-tight text-text-primary shrink-0">
            ZON
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setEngineOpen(true)}
            className="hidden lg:inline-flex items-center gap-2 bg-accent text-ground text-sm font-medium px-5 py-2.5 rounded-full active:scale-[0.97] transition-transform duration-150 hover:brightness-105 group shrink-0"
          >
            Start Assessment
            <span className="w-5 h-5 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
              <Sparkle size={12} weight="fill" />
            </span>
          </button>

          <button
            ref={openButtonRef}
            type="button"
            onClick={openMobileMenu}
            className="lg:hidden flex items-center justify-center text-text-primary hover:text-accent transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 rounded-lg"
            style={{ width: "44px", height: "44px" }}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <List size={22} weight="bold" />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU OVERLAY ─── */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          className="fixed inset-0 w-full lg:hidden animate-mobile-overlay"
          style={{
            zIndex: 9998,
            height: "100dvh",
            minHeight: "100svh",
            overflowY: "auto",
            overscrollBehavior: "contain",
            background: "linear-gradient(180deg, rgba(7,7,6,0.98), rgb(3,3,3))",
            color: "#f5f2eb",
          }}
        >
          {/* Grid background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(218,171,65,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(218,171,65,0.07) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "linear-gradient(to bottom, black, rgba(0,0,0,0.45) 55%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black, rgba(0,0,0,0.45) 55%, transparent)",
            }}
          />

          {/* Decorative number */}
          <div
            aria-hidden="true"
            className="fixed pointer-events-none select-none"
            style={{
              bottom: "6vh",
              right: "clamp(8px, 4vw, 24px)",
              fontSize: "clamp(7rem, 22vw, 12rem)",
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontWeight: 600,
              lineHeight: 1,
              color: "rgba(218,171,65,0.035)",
              zIndex: 0,
            }}
          >
            MENU
          </div>

          {/* Sticky top bar */}
          <div
            className="flex items-center justify-between w-full"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10000,
              minHeight: "72px",
              padding: `calc(12px + env(safe-area-inset-top, 0px)) 18px 12px`,
              borderBottom: "1px solid rgba(218,171,65,0.14)",
              background: "rgba(5,5,4,0.92)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxSizing: "border-box",
            }}
          >
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="font-display text-lg font-semibold tracking-tight"
              style={{ color: "#f5f2eb" }}
            >
              ZON
            </Link>

            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMobileMenu}
              className="inline-flex items-center justify-center mobile-menu-close-btn"
              style={{
                width: "46px",
                height: "46px",
                flex: "0 0 46px",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.035)",
                color: "#f7f4ed",
                cursor: "pointer",
                transition: "border-color 180ms ease, background-color 180ms ease, transform 180ms ease",
              }}
            >
              <X size={20} weight="bold" />
            </button>
          </div>

          {/* Content */}
          <div
            className="flex flex-col"
            style={{
              position: "relative",
              zIndex: 2,
              minHeight: "calc(100dvh - 72px)",
              padding: `26px clamp(18px, 5vw, 24px) calc(24px + env(safe-area-inset-bottom, 0px))`,
            }}
          >
            {/* Eyebrow */}
            <div
              className="flex items-center justify-between mb-3"
              style={{
                paddingLeft: "42px",
                paddingRight: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "rgba(218,171,65,0.72)",
                  textTransform: "uppercase",
                }}
              >
                Navigation
              </span>
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "rgba(245,242,235,0.3)",
                }}
              >
                01—07
              </span>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col">
              {navLinks.map((link, i) => {
                const active = isActiveLink(link.href, pathname);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    aria-current={active ? "page" : undefined}
                    className="mobile-menu-item"
                    style={{
                      "--menu-index": i,
                      position: "relative",
                      display: "grid",
                      gridTemplateColumns: "32px minmax(0, 1fr) 24px",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                      minHeight: "72px",
                      padding: "11px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.09)",
                      color: "#f4f1ea",
                      textDecoration: "none",
                      background: active
                        ? "linear-gradient(90deg, rgba(218,171,65,0.09), transparent 70%)"
                        : "transparent",
                      transition: "background 180ms ease",
                    } as React.CSSProperties}
                  >
                    {active && (
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: "-18px",
                          top: "18px",
                          bottom: "18px",
                          width: "2px",
                          borderRadius: "999px",
                          background: "#d9aa3e",
                        }}
                      />
                    )}
                    <span
                      style={{
                        alignSelf: "start",
                        paddingTop: "7px",
                        fontSize: "10px",
                        lineHeight: 1,
                        letterSpacing: "0.1em",
                        color: active
                          ? "rgba(218,171,65,0.9)"
                          : "rgba(218,171,65,0.6)",
                      }}
                    >
                      {pad(i)}
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: 0 }}>
                      <span
                        style={{
                          fontSize: "clamp(22px, 7vw, 28px)",
                          lineHeight: 1.05,
                          letterSpacing: "-0.035em",
                          fontWeight: 500,
                          color: active ? "#d9aa3e" : "#f5f2eb",
                        }}
                      >
                        {link.label}
                      </span>
                      <span
                          className="mobile-menu-desc"
                          style={{
                            fontSize: "12px",
                            lineHeight: 1.35,
                            color: "rgba(245,242,235,0.48)",
                          }}
                        >
                          {link.desc}
                        </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      weight="light"
                      aria-hidden="true"
                      className="mobile-menu-arrow"
                      style={{
                        color: active ? "#d9aa3e" : "rgba(245,242,235,0.38)",
                        transition: "transform 180ms ease, color 180ms ease",
                      }}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Primary CTA */}
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                setTimeout(() => setEngineOpen(true), 320);
              }}
              className="mobile-menu-item"
              style={{
                "--menu-index": 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                minHeight: "54px",
                marginTop: "24px",
                padding: "0 19px",
                borderRadius: "999px",
                background: "#dfb347",
                color: "#090806",
                fontSize: "14px",
                fontWeight: 650,
                border: "none",
                cursor: "pointer",
                transition: "transform 180ms ease, filter 180ms ease",
                boxSizing: "border-box",
              } as React.CSSProperties}
            >
              <span>Start Assessment</span>
              <Sparkle size={16} weight="fill" aria-hidden="true" />
            </button>

            {/* Secondary contact */}
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <a
                href="mailto:hello@zon.agency"
                onClick={closeMobileMenu}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "44px",
                  fontSize: "13px",
                  color: "rgba(245,242,235,0.5)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  textDecorationColor: "rgba(218,171,65,0.3)",
                }}
              >
                Prefer email? Contact us directly
              </a>
            </div>

            {/* Footer */}
            <div
              className="mobile-menu-footer"
              style={{
                marginTop: "auto",
                paddingTop: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* Socials */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <a
                  href="#"
                  aria-label="ZON on LinkedIn"
                  style={{ color: "rgba(245,242,235,0.5)", transition: "color 180ms ease" }}
                >
                  <LinkedinLogo size={18} weight="light" />
                </a>
                <a
                  href="#"
                  aria-label="ZON on YouTube"
                  style={{ color: "rgba(245,242,235,0.5)", transition: "color 180ms ease" }}
                >
                  <YoutubeLogo size={18} weight="light" />
                </a>
                <a
                  href="#"
                  aria-label="ZON on X"
                  style={{ color: "rgba(245,242,235,0.5)", transition: "color 180ms ease" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>

              {/* Locations */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  color: "rgba(245,242,235,0.3)",
                  letterSpacing: "0.02em",
                }}
              >
                <span>Dubai</span>
                <span aria-hidden="true" style={{ color: "rgba(218,171,65,0.4)" }}>·</span>
                <span>London</span>
                <span aria-hidden="true" style={{ color: "rgba(218,171,65,0.4)" }}>·</span>
                <span>Singapore</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <LeadIntelligenceEngine open={engineOpen} onOpenChange={setEngineOpen} />

      <style>{`
        .mobile-menu-item {
          animation: mobileMenuItemIn 260ms ease-out both;
          animation-delay: calc(var(--menu-index, 0) * 35ms);
        }
        .mobile-menu-footer {
          animation: mobileMenuItemIn 300ms ease-out both;
          animation-delay: 280ms;
        }
        .mobile-menu-item:active {
          background: rgba(218,171,65,0.07) !important;
        }
        .mobile-menu-item:active .mobile-menu-arrow {
          transform: translate(2px, -2px);
          color: #d9aa3e !important;
        }
        .mobile-menu-item:focus-visible {
          outline: 2px solid #d9aa3e;
          outline-offset: 4px;
        }
        .mobile-menu-close-btn:active {
          transform: scale(0.95) !important;
          border-color: rgba(218,171,65,0.7) !important;
          background: rgba(218,171,65,0.1) !important;
        }
        .mobile-menu-close-btn:focus-visible {
          outline: 2px solid #d9aa3e;
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .mobile-menu-item,
          .mobile-menu-footer {
            animation: none !important;
            transition: none !important;
          }
        }
        @media (max-width: 767px) and (max-height: 700px) {
          .mobile-menu-item {
            min-height: 60px !important;
            padding-top: 8px !important;
            padding-bottom: 8px !important;
          }
          .mobile-menu-desc {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
