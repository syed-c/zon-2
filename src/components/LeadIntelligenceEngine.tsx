"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Check, X, Sparkle, Robot, SealCheck,
  ChartLineUp, MagnifyingGlass, Globe, Clock, Lightning,
  Buildings, Users, CurrencyCircleDollar, ChatCircle, Timer,
  FileText, Star,
} from "@phosphor-icons/react";
import { questionBank, stageLabels } from "@/assessment/config";
import type { QuestionNode, AssessmentAnswers } from "@/assessment/types";
import { resolveVisibleQuestions, invalidateDependentAnswers, calculateProgress, isQuestionAnswered, validateQuestion } from "@/assessment/engine";
import { computeDomainScores, computeOpportunityScore, getConfidenceLabel } from "@/assessment/scoring";
import { generateReport } from "@/assessment/recommendations";

const STORAGE_KEY = "zon-lead-engine-v2";

const trustItems = [
  "Personalized recommendations",
  "AI Search readiness analysis",
  "Growth opportunity report",
  "No obligation consultation",
];

const optionIcons: Record<string, React.ReactNode> = {
  seo: <MagnifyingGlass size={18} />,
  geo: <Robot size={18} />,
  website: <Globe size={18} />,
  leads: <ChartLineUp size={18} />,
  ads: <CurrencyCircleDollar size={18} />,
  automation: <Lightning size={18} />,
  crm: <Buildings size={18} />,
  branding: <Star size={18} />,
  content: <FileText size={18} />,
  unsure: <ChatCircle size={18} />,
};

function getIcon(value: string, size = 18) {
  if (optionIcons[value]) return optionIcons[value];
  return <Sparkle size={size} />;
}

/* ─── QuestionNode wrapper (old helpers removed — using assessment/engine) ─── */

/* ─── TRIGGER BUTTON ─── */

export function LeadEngineTrigger({ onClick, label = "Start Assessment" }: { onClick: () => void; label?: string }) {
  const [glowStyle, setGlowStyle] = useState("");
  useEffect(() => {
    setGlowStyle(`
      @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 8px rgba(212,168,73,0.2); }
        50% { box-shadow: 0 0 24px rgba(212,168,73,0.4); }
      }
    `);
  }, []);
  return (
    <>
      {glowStyle && <style>{glowStyle}</style>}
      <button
        onClick={onClick}
        className="group relative inline-flex items-center gap-2 bg-accent text-ground pl-6 pr-2 py-2.5 rounded-full font-medium text-sm active:scale-[0.98] transition-all duration-150 hover:brightness-105"
        style={{ animation: "pulseGlow 2s ease-in-out infinite" }}
      >
        <span>{label}</span>
        <span className="w-7 h-7 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
          <ArrowRight size={14} weight="bold" />
        </span>
      </button>
    </>
  );
}

/* ─── QUESTION OPTION CARD ─── */

function OptionCard({
  option,
  selected,
  multi,
  onToggle,
}: {
  option: { id?: string; label: string; value: string | number | boolean };
  selected: boolean;
  multi: boolean;
  onToggle: () => void;
}) {
  return (
    <label className={`assessment-option ${selected ? "is-selected" : ""}`}>
      <input
        type={multi ? "checkbox" : "radio"}
        checked={selected}
        onChange={onToggle}
        className="assessment-option-input"
        aria-label={option.label}
      />
      <span className="assessment-option-indicator">
        {multi && (
          <span className={`assessment-option-checkbox ${selected ? "is-checked" : ""}`}>
            {selected && <Check size={12} weight="bold" />}
          </span>
        )}
        {!multi && (
          <span className={`assessment-option-radio ${selected ? "is-checked" : ""}`}>
            {selected && <span className="assessment-option-dot" />}
          </span>
        )}
      </span>
      <span className="assessment-option-label">{option.label}</span>
      {!multi && selected && (
        <Check size={16} weight="bold" className="assessment-option-check-icon" />
      )}
    </label>
  );
}

/* ─── QUESTION RENDERER ─── */

function SingleQuestion({
  question,
  answers,
  onAnswer,
}: {
  question: QuestionNode;
  answers: AssessmentAnswers;
  onAnswer: (id: string, value: unknown) => void;
}) {
  const currentValue = answers[question.id];
  const multi = question.type === "multiSelect";
  const isCardType = question.type === "singleSelect" || question.type === "multiSelect";

  if (isCardType) {
    const opts = question.options || [];
    return (
      <div className={`assessment-options-grid ${opts.length <= 3 ? "assessment-options-compact" : ""}`}>
        {opts.map((opt) => {
          const selected = multi
            ? Array.isArray(currentValue) && currentValue.includes(opt.value)
            : currentValue === opt.value;
          return (
            <OptionCard
              key={opt.id}
              option={opt}
              selected={selected}
              multi={multi}
              onToggle={() => {
                if (multi) {
                  const current = Array.isArray(currentValue) ? currentValue : [];
                  if (current.includes(opt.value)) {
                    onAnswer(question.id, current.filter((v) => v !== opt.value));
                  } else {
                    onAnswer(question.id, [...current, opt.value]);
                  }
                } else {
                  onAnswer(question.id, currentValue === opt.value ? "" : opt.value);
                }
              }}
            />
          );
        })}
      </div>
    );
  }

  if (question.type === "slider") {
    const min = 1;
    const max = 10;
    const val = Number(currentValue) || Math.round((min + max) / 2);
    const pct = ((val - min) / (max - min)) * 100;
    return (
      <div className="assessment-slider-wrap">
        <div className="assessment-slider-header">
          <span className="assessment-slider-label">{min}</span>
          <span className="assessment-slider-value">{val}</span>
          <span className="assessment-slider-label">{max}</span>
        </div>
        <div className="assessment-slider-track">
          <motion.div
            className="assessment-slider-fill"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.2 }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={val}
            onChange={(e) => onAnswer(question.id, Number(e.target.value))}
            className="assessment-slider-input"
            aria-label={question.title}
          />
        </div>
      </div>
    );
  }

  /* Text, email, phone, url all behave as text-like inputs */
  const inputType = question.type === "email" ? "email" : question.type === "phone" ? "tel" : question.type === "url" ? "url" : "text";
  const autoComplete = question.id === "name" ? "name" : question.id === "email" ? "email" : question.id === "phone" ? "tel" : question.id === "websiteUrl" ? "url" : question.id === "country" ? "country-name" : "off";
  const inputMode = question.id === "phone" ? "tel" : question.id === "email" ? "email" : "text";

  const val = typeof currentValue === "string" ? currentValue : "";

  return (
    <div className="assessment-input-wrap">
      <input
        type={inputType}
        value={val}
        onChange={(e) => onAnswer(question.id, e.target.value)}
        placeholder={question.description || ""}
        className="assessment-input"
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-label={question.title}
      />
      {question.allowSkip && (
        <button
          type="button"
          onClick={() => onAnswer(question.id, "")}
          className="text-[11px] font-mono text-text-secondary/30 hover:text-text-secondary/60 mt-2 transition-colors"
        >
          {question.skipLabel || "Skip"}
        </button>
      )}
    </div>
  );
}

/* ─── SUMMARY VIEW ─── */

function SummaryView({
  answers, onClose, onSchedule,
}: {
  answers: AssessmentAnswers; onClose: () => void; onSchedule?: () => void;
}) {
  const report = useMemo(() => generateReport(answers), [answers]);
  const oppScore = report.opportunityScore;
  const oppLabel = report.opportunityLabel;

  const segments = report.roadmap;
  const primaries = report.primaryRecommendations;
  const secondaries = report.secondaryRecommendations;
  const domains = report.assessedDomains;
  const gaps = report.priorityGaps;
  const strengths = report.strengths;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="assessment-summary"
    >
      <div className="assessment-summary-header">
        <span className="assessment-summary-eyebrow">Your Assessment is Ready</span>
        <h2 className="assessment-summary-title">Growth Opportunity Report</h2>
        <p className="text-xs text-text-secondary/40 mt-2">Based on your answers</p>
      </div>

      <div className="assessment-summary-hero">
        <div className="assessment-score-ring">
          <svg className="assessment-score-svg" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
            <motion.circle
              cx="60" cy="60" r="52" fill="none" stroke="#D4A849" strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${oppScore * 3.267} 326.7`}
              initial={{ strokeDasharray: "0 326.7" }}
              animate={{ strokeDasharray: `${oppScore * 3.267} 326.7` }}
              transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
            />
          </svg>
          <div className="assessment-score-inner">
            <span className="assessment-score-num">{oppScore}</span>
            <span className="assessment-score-denom">/100</span>
          </div>
        </div>
        <div className="assessment-summary-info">
          <span className="assessment-summary-info-label">Opportunity Score</span>
          <div className="assessment-summary-info-value" style={{ color: "#D4A849" }}>{oppLabel}</div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {primaries.slice(0, 3).map((r) => (
              <span key={r.serviceId} className="text-[9px] font-mono text-accent/70 px-2 py-0.5 rounded-full border border-accent/25 bg-accent/5">{r.serviceId.replace(/-/g, " ")}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Domain scores — only assessed ones */}
      {domains.filter(d => d.status === "assessed" && d.score !== null).length > 0 && (
        <div className="assessment-metrics-grid">
          {domains.filter(d => d.status === "assessed" && d.score !== null).map((d) => (
            <div key={d.evidence[0] || Math.random().toString()} className="assessment-metric-card">
              <div className="assessment-metric-header">
                <span className="assessment-metric-label">{d.evidence[0]?.substring(0, 30) || "Domain"}</span>
              </div>
              <div className="assessment-metric-bar">
                <motion.div
                  className="assessment-metric-fill"
                  style={{ backgroundColor: (d.score || 0) >= 60 ? "#4CAF50" : (d.score || 0) >= 30 ? "#D4A849" : "#E05A4B" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${d.score || 0}%` }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
                />
              </div>
              <span className="assessment-metric-pct">{d.score}/100 — {d.strengths.length > 0 ? d.strengths[0] : d.gaps[0] || "Assessed"}</span>
            </div>
          ))}
        </div>
      )}

      {/* Not-assessed domains */}
      {domains.filter(d => d.status === "notAssessed" || d.status === "insufficientEvidence").length > 0 && (
        <div className="space-y-1.5">
          <h4 className="text-[10px] font-mono tracking-widest uppercase text-text-secondary/30">Not Assessed</h4>
          <div className="flex flex-wrap gap-2">
            {domains.filter(d => d.status === "notAssessed" || d.status === "insufficientEvidence").map((d) => (
              <span key={d.evidence[0] || ""} className="text-[10px] font-mono text-text-secondary/30 px-2 py-1 rounded-full border border-white/5 bg-white/[0.02]">
                {d.gaps[0]?.substring(0, 40) || "Insufficient information"}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Priority gaps */}
      {gaps.length > 0 && (
        <div className="assessment-recs-card">
          <h4 className="assessment-recs-title">Priority Areas</h4>
          <div className="space-y-3">
            {gaps.slice(0, 3).map((g, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                  <span className="text-xs font-medium text-text-primary">{g.title}</span>
                </div>
                <p className="text-[11px] text-text-secondary/40 pl-3.5">{g.implication}</p>
                {g.suggestedAction && (
                  <p className="text-[11px] text-accent/60 pl-3.5">→ {g.suggestedAction}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Primary recommendations */}
      {primaries.length > 0 && (
        <div className="assessment-recs-card">
          <h4 className="assessment-recs-title">Recommended Services</h4>
          <div className="space-y-2">
            {primaries.map((r, i) => (
              <div key={r.serviceId} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[8px] font-mono text-accent">{i + 1}</span>
                </span>
                <div className="min-w-0">
                  <span className="text-sm text-text-primary capitalize">{r.serviceId.replace(/-/g, " ")}</span>
                  <p className="text-[10px] text-text-secondary/40 mt-0.5">{r.evidence[0] || "Recommended based on your answers."}</p>
                  {r.dependency && <p className="text-[10px] text-accent/60 mt-0.5">Prerequisite: {r.dependency}</p>}
                </div>
              </div>
            ))}
          </div>
          {secondaries.length > 0 && (
            <div className="mt-3 pt-3 border-t border-accent/10">
              <span className="text-[9px] font-mono text-text-secondary/30 tracking-wider">Also consider</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {secondaries.map((r) => (
                  <span key={r.serviceId} className="text-[10px] text-text-secondary/40 px-2 py-0.5 rounded-full border border-white/5">
                    {r.serviceId.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-4 pt-3 border-t border-accent/10 text-xs text-text-secondary/40 mt-3">
            {report.expectedTimeline && <span>Timeline: <strong className="text-text-secondary/70">{report.expectedTimeline}</strong></span>}
            {report.estimatedScope && <span>Scope: <strong className="text-text-secondary/70">{report.estimatedScope}</strong></span>}
          </div>
        </div>
      )}

      {/* Roadmap */}
      {segments.length > 0 && (
        <div className="bg-[#181818] border border-accent/10 rounded-xl p-4 space-y-3">
          <h4 className="text-[10px] font-mono tracking-widest uppercase text-accent/60">Suggested Roadmap</h4>
          {segments.map((seg) => (
            <div key={seg.phase}>
              <span className="text-[11px] font-medium text-text-primary">{seg.phase}</span>
              <ul className="mt-1 space-y-1">
                {seg.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] text-text-secondary/50">
                    <span className="w-1 h-1 rounded-full bg-accent/40 flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="assessment-summary-actions">
        <button
          onClick={onSchedule}
          className="assessment-summary-cta"
        >
          {report.nextBestAction.includes("Book") ? report.nextBestAction.split(".")[0] : "Schedule Strategy Call"}
          <ArrowRight size={16} weight="bold" />
        </button>
        <button
          onClick={onClose}
          className="assessment-summary-close"
        >
          Close &amp; Review Later
        </button>
      </div>
    </motion.div>
  );
}

/* ─── LOADING VIEW ─── */

const loadingMessages = [
  "Analyzing your business...",
  "Reviewing your answers...",
  "Preparing recommendations...",
  "Checking opportunity signals...",
  "Generating your report...",
];

function LoadingView() {
  const [msgIdx, setMsgIdx] = useState(0);
  useEffect(() => {
    setMsgIdx(0);
    const interval = setInterval(() => {
      setMsgIdx((i) => Math.min(i + 1, loadingMessages.length - 1));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="assessment-loading"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="assessment-loading-icon"
      >
        <Sparkle size={32} className="assessment-loading-sparkle" />
      </motion.div>
      <p className="assessment-loading-text">{loadingMessages[msgIdx]}</p>
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─── */

export default function LeadIntelligenceEngine({ open, onOpenChange }: { open?: boolean; onOpenChange?: (v: boolean) => void } = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [showSummary, setShowSummary] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "restored">("idle");
  const [validationError, setValidationError] = useState<string | null>(null);

  const questionPanelRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const visibleQuestions = useMemo(() => resolveVisibleQuestions(answers), [answers]);
  const totalVisible = visibleQuestions.length;
  const currentQuestionData = visibleQuestions[currentQuestionIndex];
  const currStepId = currentQuestionData?.macroStage || 1;
  const progress = calculateProgress(visibleQuestions, answers);
  const canProceedNow = currentQuestionData
    ? (currentQuestionData.allowSkip ? true : isQuestionAnswered(currentQuestionData, answers))
    : false;
  const isLastQuestion = currentQuestionIndex >= totalVisible - 1;

  const questionsInThisStep = visibleQuestions.filter((q) => q.macroStage === currStepId);
  const questionInStepIndex = questionsInThisStep.findIndex((q) => q.id === currentQuestionData?.id);
  const questionInStepNum = questionInStepIndex + 1;
  const totalQuestionsInStep = questionsInThisStep.length;

  const oppScore = useMemo(() => computeOpportunityScore(answers), [answers]);
  const domainScores = useMemo(() => computeDomainScores(answers), [answers]);
  const assessedCount = Object.values(domainScores).filter((d) => d.status === "assessed").length;

  /* ─── Local storage restore ─── */
  useEffect(() => {
    if (!isOpen) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.answers && typeof parsed.answers === "object") {
          setAnswers(parsed.answers);
          if (typeof parsed.currentQuestionIndex === "number") {
            setCurrentQuestionIndex(parsed.currentQuestionIndex);
          }
          setSaveStatus("restored");
          setTimeout(() => setSaveStatus("idle"), 2000);
        }
      } catch {}
    }
  }, [isOpen]);

  /* ─── Clamp question index when flow changes ─── */
  useEffect(() => {
    if (totalVisible > 0 && currentQuestionIndex >= totalVisible) {
      setCurrentQuestionIndex(Math.max(0, totalVisible - 1));
    }
  }, [totalVisible, currentQuestionIndex]);

  /* ─── Clear validation error on answer ─── */
  useEffect(() => {
    if (validationError) setValidationError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, currentQuestionIndex]);

  /* ─── Body scroll lock ─── */
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
      return () => {
        document.body.style.overflow = prev;
        document.body.style.position = "";
      };
    }
  }, [isOpen]);

  /* ─── Autosave ─── */
  useEffect(() => {
    if (!isOpen || Object.keys(answers).length === 0) return;
    setSaveStatus("saving");
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentQuestionIndex }));
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 600);
    return () => clearTimeout(timer);
  }, [answers, currentQuestionIndex, isOpen]);

  /* ─── Handle keyboard ─── */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* ─── Focus management ─── */
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen, currentQuestionIndex]);

  /* ─── Scroll to top on question change ─── */
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentQuestionIndex]);

  const handleAnswer = useCallback((id: string, value: unknown) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      return invalidateDependentAnswers(id, next, visibleQuestions);
    });
  }, [visibleQuestions]);

  const handleNext = useCallback(() => {
    if (!currentQuestionData) return;
    if (!canProceedNow && !currentQuestionData.allowSkip && currentQuestionData.required) {
      setValidationError("Please complete this field to continue.");
      return;
    }
    if (!isLastQuestion) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setShowSummary(true);
        localStorage.removeItem(STORAGE_KEY);
      }, 1500);
    }
  }, [canProceedNow, currentQuestionData, isLastQuestion]);

  const handlePrev = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
    }
  }, [currentQuestionIndex]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setShowSummary(false);
    setIsGenerating(false);
    setValidationError(null);
  }, [setIsOpen]);

  const handleReset = useCallback(() => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowSummary(false);
    setIsGenerating(false);
    setValidationError(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const handleSchedule = useCallback(() => {
    handleClose();
  }, [handleClose]);

  /* ─── Render early if not open ─── */
  if (!isOpen) {
    if (open !== undefined) return null;
    return <LeadEngineTrigger onClick={() => setIsOpen(true)} />;
  }

  /* ─── Shared step segment bar ─── */
  const segmentBars = (isMobileSegment: boolean) => {
    const totalSegments = 7;
    const currentStepSeg = currStepId;
    return (
      <div className={`assessment-segments ${isMobileSegment ? "assessment-segments-mobile" : ""}`}>
        {Array.from({ length: totalSegments }).map((_, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum < currentStepSeg;
          const isCurrent = stepNum === currentStepSeg;
          return (
            <div
              key={i}
              className={`assessment-segment ${isComplete ? "is-complete" : ""} ${isCurrent ? "is-current" : ""}`}
            />
          );
        })}
      </div>
    );
  };

  const saveLabel = saveStatus === "saving" ? "Saving…" : saveStatus === "saved" ? "Saved" : saveStatus === "restored" ? "Restored" : "";

  return (
    <>
      <style>{`
        .assessment-scrollbar::-webkit-scrollbar { width: 4px; }
        .assessment-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .assessment-scrollbar::-webkit-scrollbar-thumb { background: rgba(212,168,73,0.15); border-radius: 4px; }
        .assessment-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(212,168,73,0.15) transparent; }
        .assessment-no-scrollbar::-webkit-scrollbar { display: none; }
        .assessment-no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <style>{`
        .assessment-backdrop {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(5,5,4,0.78);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        @media (max-width: 767px) {
          .assessment-backdrop { backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); background: rgba(5,5,4,0.88); }
        }
        @keyframes assessmentFadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }

        .assessment-card {
          --card-border: rgba(255,255,255,0.1);
          --card-bg: rgba(255,255,255,0.03);
          --card-selected-border: rgba(212,168,73,0.7);
          --card-selected-bg: rgba(212,168,73,0.08);
          --card-radius: 14px;
          --card-min-h: 58px;
          --card-pad: 13px 15px;
          --card-gap: 12px;
        }
        @media (min-width: 768px) {
          .assessment-card {
            --card-min-h: 64px;
            --card-pad: 16px 18px;
            --card-radius: 16px;
          }
        }
      `}</style>

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="assessment-backdrop"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ─── MODAL ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className="assessment-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="AI Growth Assessment"
      >
        {/* ─── DESKTOP VIEW ─── */}
        <div className="assessment-desktop-layout">
          {/* Header */}
          <header className="assessment-dt-header">
            <div className="assessment-dt-header-left">
              <Sparkle size={16} weight="fill" className="assessment-dt-header-icon" />
              <span className="assessment-dt-header-title">AI Growth Assessment</span>
            </div>
            <div className="assessment-dt-header-center">
              {saveLabel && (
                <span className="assessment-dt-header-save">{saveLabel}</span>
              )}
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              className="assessment-dt-close"
              aria-label="Close assessment"
            >
              <X size={16} />
            </button>
          </header>

          <div className="assessment-dt-body">
            {/* Left panel */}
            <aside className="assessment-dt-sidebar">
              <div className="assessment-dt-sidebar-top">
                <div className="assessment-dt-sidebar-heading">
                  <h3 className="assessment-dt-sidebar-title">Grow With Intelligence</h3>
                  <p className="assessment-dt-sidebar-desc">
                    Discover exactly where your business is losing visibility, leads and opportunities.
                  </p>
                </div>

                <div className="assessment-dt-sidebar-progress">
                  <div className="assessment-dt-progress-header">
                    <span className="assessment-dt-progress-label">Progress</span>
                    <span className="assessment-dt-progress-pct">{progress.percent}%</span>
                  </div>
                  <div className="assessment-dt-progress-track">
                    <motion.div
                      className="assessment-dt-progress-fill"
                      initial={false}
                      animate={{ width: `${progress.percent}%` }}
                      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                    />
                  </div>
                </div>

                <div className="assessment-dt-step-info">
                  <span className="assessment-dt-step-num">
                    Step {currStepId} of 7
                  </span>
                  {segmentBars(false)}
                  <span className="assessment-dt-step-name">{stageLabels[currStepId] || `Stage ${currStepId}`}</span>
                  {totalQuestionsInStep > 1 && (
                    <span className="assessment-dt-step-qnum">
                      Question {questionInStepNum} of {totalQuestionsInStep}
                    </span>
                  )}
                  <span className="assessment-dt-step-eta">
                    Est. {Math.max(1, totalVisible - currentQuestionIndex)} min remaining
                  </span>
                </div>

                {assessedCount > 0 && (
                  <div className="assessment-dt-sidebar-score">
                    <div className="assessment-dt-score-icon">
                      <Lightning size={16} weight="fill" />
                    </div>
                    <div>
                      <div className="assessment-dt-score-label">Opportunity Score</div>
                      <div className="assessment-dt-score-value" style={{ color: oppScore.score >= 65 ? "#D4A849" : oppScore.score >= 45 ? "#98C379" : "#8A8480" }}>
                        {oppScore.score}/100 · {oppScore.label.split(" ")[0]}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="assessment-dt-sidebar-bottom">
                {trustItems.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="assessment-dt-trust-item"
                  >
                    <SealCheck size={12} className="assessment-dt-trust-icon" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </aside>

            {/* Right panel */}
            <div ref={questionPanelRef} className="assessment-dt-panel">
              <div className="assessment-dt-panel-inner">
                {isGenerating ? (
                  <LoadingView />
                ) : showSummary ? (
                  <SummaryView answers={answers} onClose={handleClose} onSchedule={handleSchedule} />
                ) : currentQuestionData ? (
                  <motion.div
                    key={currentQuestionData.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
                    className="assessment-dt-question"
                  >
                    <span className="assessment-dt-question-step-label">{stageLabels[currStepId] || `Stage ${currStepId}`}</span>
                    <h2 className="assessment-dt-question-headline">{currentQuestionData.title}</h2>
                    {currentQuestionData.description && (
                      <p className="assessment-dt-question-subtext">{currentQuestionData.description}</p>
                    )}
                    {validationError && (
                      <p className="text-[12px] text-danger/80 mb-3 font-mono">{validationError}</p>
                    )}
                    <div className="assessment-dt-question-controls">
                      <SingleQuestion
                        question={currentQuestionData}
                        answers={answers}
                        onAnswer={handleAnswer}
                      />
                    </div>
                  </motion.div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Footer */}
          {!isGenerating && !showSummary && (
            <footer className="assessment-dt-footer">
              <div className="assessment-dt-footer-inner">
                <button
                  type="button"
                  onClick={currentQuestionIndex === 0 ? handleClose : handlePrev}
                  className={`assessment-dt-btn-back ${currentQuestionIndex === 0 ? "is-cancel" : ""}`}
                >
                  <ArrowLeft size={14} />
                  {currentQuestionIndex === 0 ? "Cancel" : "Back"}
                </button>
                <div className="assessment-dt-footer-center">
                  {saveLabel && <span className="assessment-dt-footer-save">{saveLabel}</span>}
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceedNow}
                  className={`assessment-dt-btn-next ${canProceedNow ? "" : "is-disabled"}`}
                >
                  {isLastQuestion ? (
                    <>Generate Report <Sparkle size={14} /></>
                  ) : (
                    <>Continue <ArrowRight size={14} /></>
                  )}
                </button>
              </div>
            </footer>
          )}
        </div>

        {/* ─── MOBILE VIEW ─── */}
        <div className="assessment-mobile-layout">
          {/* Header */}
          <header className="assessment-mobile-header">
            <div className="assessment-mobile-header-left">
              <Sparkle size={14} weight="fill" className="assessment-mobile-header-icon" />
              <span className="assessment-mobile-header-title">Assessment</span>
            </div>
            <div className="assessment-mobile-header-center">
              <span className="assessment-mobile-step-badge">
                Step {currStepId}/7
              </span>
            </div>
            <div className="assessment-mobile-header-right">
              {saveLabel && (
                <span className="assessment-mobile-save-label">{saveLabel}</span>
              )}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                className="assessment-mobile-close"
                aria-label="Close assessment"
              >
                <X size={18} />
              </button>
            </div>
          </header>

          {/* Progress */}
          <div className="assessment-mobile-progress">
            <div className="assessment-mobile-progress-top">
              <span className="assessment-mobile-progress-step">{stageLabels[currStepId] || `Stage ${currStepId}`}</span>
              <span className="assessment-mobile-progress-pct">{progress.percent}%</span>
            </div>
            {segmentBars(true)}
            {totalQuestionsInStep > 1 && (
              <span className="assessment-mobile-progress-qnum">
                Question {questionInStepNum} of {totalQuestionsInStep}
              </span>
            )}
          </div>

          {/* Question scroll area */}
          <div ref={scrollContainerRef} className="assessment-mobile-scroll">
            <div className="assessment-mobile-scroll-inner">
              {isGenerating ? (
                <LoadingView />
              ) : showSummary ? (
                <SummaryView answers={answers} onClose={handleClose} onSchedule={handleSchedule} />
              ) : currentQuestionData ? (
                <motion.div
                  key={currentQuestionData.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                >
                  <h2 className="assessment-mobile-headline">{currentQuestionData.title}</h2>
                  {currentQuestionData.description && (
                    <p className="assessment-mobile-subtext">{currentQuestionData.description}</p>
                  )}
                  {validationError && (
                    <p className="text-[12px] text-danger/80 mb-3 font-mono">{validationError}</p>
                  )}
                  <div className="assessment-mobile-controls">
                    <SingleQuestion
                      question={currentQuestionData}
                      answers={answers}
                      onAnswer={handleAnswer}
                    />
                  </div>
                </motion.div>
              ) : null}
            </div>
          </div>

          {/* Sticky action bar */}
          {!isGenerating && !showSummary && (
            <footer className="assessment-mobile-footer">
              <button
                type="button"
                onClick={currentQuestionIndex === 0 ? handleClose : handlePrev}
                className={`assessment-mobile-btn-back ${currentQuestionIndex === 0 ? "is-cancel" : ""}`}
              >
                <ArrowLeft size={16} />
                {currentQuestionIndex === 0 ? "Cancel" : "Back"}
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceedNow}
                className={`assessment-mobile-btn-next ${canProceedNow ? "" : "is-disabled"}`}
              >
                {isLastQuestion ? (
                  <>Generate Report <Sparkle size={16} weight="fill" /></>
                ) : (
                  <>Continue <ArrowRight size={16} /></>
                )}
              </button>
            </footer>
          )}

          {/* Summary bottom */}
          {showSummary && (
            <div className="assessment-mobile-summary-bottom">
              <button
                onClick={handleReset}
                className="assessment-mobile-reset"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* ─── STYLES ─── */}
      <style>{`
        /* ── Modal shell ── */
        .assessment-modal {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .assessment-modal > * { pointer-events: auto; }

        /* Desktop layout */
        .assessment-desktop-layout {
          display: none;
          width: 92vw;
          height: 90dvh;
          max-width: 1500px;
          max-height: 950px;
          min-height: 620px;
          background: #0E0E0D;
          border: 1px solid rgba(212,168,73,0.12);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,168,73,0.06);
          flex-direction: column;
        }

        /* Mobile layout */
        .assessment-mobile-layout {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100dvh;
          min-height: 100svh;
          background: #0E0E0D;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .assessment-desktop-layout { display: flex; }
          .assessment-mobile-layout { display: none; }
        }

        /* ── Desktop header ── */
        .assessment-dt-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
          background: #0E0E0D;
          z-index: 2;
        }
        .assessment-dt-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .assessment-dt-header-icon { color: #D4A849; }
        .assessment-dt-header-title {
          font-size: 13px;
          font-weight: 550;
          letter-spacing: -0.01em;
          color: #F2EDE6;
        }
        .assessment-dt-header-center {
          display: flex;
          align-items: center;
        }
        .assessment-dt-header-save {
          font-size: 10px;
          font-family: var(--font-mono, monospace);
          color: rgba(212,168,73,0.5);
        }
        .assessment-dt-close {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: rgba(242,237,230,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 180ms ease, background 180ms ease, color 180ms ease;
        }
        .assessment-dt-close:hover {
          border-color: rgba(212,168,73,0.4);
          background: rgba(212,168,73,0.06);
          color: #F2EDE6;
        }
        .assessment-dt-close:focus-visible {
          outline: 2px solid #D4A849;
          outline-offset: 2px;
        }

        /* ── Desktop body ── */
        .assessment-dt-body {
          display: flex;
          flex: 1;
          min-height: 0;
        }

        /* ── Desktop sidebar ── */
        .assessment-dt-sidebar {
          width: 32%;
          max-width: 380px;
          min-width: 240px;
          background: #111110;
          border-right: 1px solid rgba(255,255,255,0.05);
          padding: 24px 22px 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .assessment-dt-sidebar-top { display: flex; flex-direction: column; gap: 22px; }
        .assessment-dt-sidebar-heading { }
        .assessment-dt-sidebar-title {
          font-family: var(--font-display, serif);
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #F2EDE6;
          margin: 0 0 6px;
        }
        .assessment-dt-sidebar-desc {
          font-size: 12px;
          color: rgba(138,132,128,0.7);
          line-height: 1.5;
          margin: 0;
        }

        .assessment-dt-progress-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .assessment-dt-progress-label { font-size: 11px; color: rgba(138,132,128,0.6); }
        .assessment-dt-progress-pct { font-size: 11px; font-family: var(--font-mono, monospace); color: #D4A849; font-weight: 600; }
        .assessment-dt-progress-track {
          height: 4px;
          background: rgba(255,255,255,0.06);
          border-radius: 4px;
          overflow: hidden;
        }
        .assessment-dt-progress-fill {
          height: 100%;
          background: #D4A849;
          border-radius: 4px;
        }

        .assessment-dt-step-info { display: flex; flex-direction: column; gap: 8px; }
        .assessment-dt-step-num { font-size: 10px; font-family: var(--font-mono, monospace); color: rgba(138,132,128,0.5); }
        .assessment-dt-step-name { font-size: 14px; font-weight: 500; color: #F2EDE6; }
        .assessment-dt-step-qnum { font-size: 11px; color: rgba(138,132,128,0.5); }
        .assessment-dt-step-eta { font-size: 10px; font-family: var(--font-mono, monospace); color: rgba(138,132,128,0.35); }

        .assessment-dt-sidebar-score {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(212,168,73,0.08);
        }
        .assessment-dt-score-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(212,168,73,0.08);
          border: 1px solid rgba(212,168,73,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #D4A849;
          flex-shrink: 0;
        }
        .assessment-dt-score-label { font-size: 10px; color: rgba(138,132,128,0.5); }
        .assessment-dt-score-value { font-size: 14px; font-weight: 600; }

        .assessment-dt-sidebar-bottom { display: flex; flex-direction: column; gap: 8px; padding-top: 16px; }
        .assessment-dt-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: rgba(138,132,128,0.45);
        }
        .assessment-dt-trust-icon { color: rgba(212,168,73,0.35); flex-shrink: 0; }

        /* ── Desktop right panel ── */
        .assessment-dt-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }
        .assessment-dt-panel-inner {
          flex: 1;
          overflow-y: auto;
          padding: 32px 40px;
          display: flex;
          flex-direction: column;
        }
        .assessment-dt-question { max-width: 560px; }
        .assessment-dt-question-step-label {
          display: block;
          font-size: 10px;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(212,168,73,0.6);
          margin-bottom: 12px;
        }
        .assessment-dt-question-headline {
          font-family: var(--font-display, serif);
          font-size: clamp(1.4rem, 2.2vw, 1.8rem);
          font-weight: 600;
          letter-spacing: -0.025em;
          color: #F2EDE6;
          margin: 0 0 8px;
          line-height: 1.15;
        }
        .assessment-dt-question-subtext {
          font-size: 14px;
          color: rgba(138,132,128,0.6);
          margin: 0 0 28px;
          line-height: 1.5;
        }
        .assessment-dt-question-controls { }

        /* Desktop footer */
        .assessment-dt-footer {
          flex-shrink: 0;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 12px 20px;
          background: #0E0E0D;
        }
        .assessment-dt-footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 560px;
        }
        .assessment-dt-footer-center { display: flex; align-items: center; }
        .assessment-dt-footer-save {
          font-size: 10px;
          font-family: var(--font-mono, monospace);
          color: rgba(212,168,73,0.4);
        }
        .assessment-dt-btn-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 13px;
          color: rgba(138,132,128,0.7);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 180ms ease, background 180ms ease;
        }
        .assessment-dt-btn-back:hover { color: #F2EDE6; background: rgba(255,255,255,0.04); }
        .assessment-dt-btn-back.is-cancel { color: rgba(138,132,128,0.4); }
        .assessment-dt-btn-back.is-cancel:hover { color: rgba(242,237,230,0.6); }
        .assessment-dt-btn-back:focus-visible { outline: 2px solid #D4A849; outline-offset: 2px; }
        .assessment-dt-btn-next {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 550;
          background: #D4A849;
          color: #080807;
          border: none;
          cursor: pointer;
          transition: filter 180ms ease, transform 120ms ease;
        }
        .assessment-dt-btn-next:hover { filter: brightness(1.06); }
        .assessment-dt-btn-next:active { transform: scale(0.97); }
        .assessment-dt-btn-next.is-disabled {
          background: rgba(255,255,255,0.06);
          color: rgba(138,132,128,0.3);
          cursor: not-allowed;
        }
        .assessment-dt-btn-next.is-disabled:hover { filter: none; }
        .assessment-dt-btn-next:focus-visible { outline: 2px solid #D4A849; outline-offset: 2px; }

        /* ── Mobile header ── */
        .assessment-mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: calc(8px + env(safe-area-inset-top, 0px)) 16px 8px;
          min-height: 56px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: #0F0F0E;
          flex-shrink: 0;
          z-index: 2;
        }
        .assessment-mobile-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .assessment-mobile-header-icon { color: #D4A849; }
        .assessment-mobile-header-title {
          font-size: 13px;
          font-weight: 550;
          color: #F2EDE6;
        }
        .assessment-mobile-header-center { }
        .assessment-mobile-step-badge {
          font-size: 10px;
          font-family: var(--font-mono, monospace);
          color: rgba(212,168,73,0.6);
          background: rgba(212,168,73,0.08);
          padding: 3px 10px;
          border-radius: 999px;
          border: 1px solid rgba(212,168,73,0.12);
        }
        .assessment-mobile-header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .assessment-mobile-save-label {
          font-size: 9px;
          font-family: var(--font-mono, monospace);
          color: rgba(212,168,73,0.4);
        }
        .assessment-mobile-close {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          color: rgba(242,237,230,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 180ms ease, background 180ms ease, color 180ms ease;
        }
        .assessment-mobile-close:active {
          border-color: rgba(212,168,73,0.5);
          background: rgba(212,168,73,0.08);
          color: #F2EDE6;
        }
        .assessment-mobile-close:focus-visible {
          outline: 2px solid #D4A849;
          outline-offset: 2px;
        }

        /* ── Mobile progress ── */
        .assessment-mobile-progress {
          padding: 12px 16px 10px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          background: #0F0F0E;
          flex-shrink: 0;
          z-index: 2;
        }
        .assessment-mobile-progress-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .assessment-mobile-progress-step {
          font-size: 11px;
          font-weight: 500;
          color: rgba(242,237,230,0.7);
        }
        .assessment-mobile-progress-pct {
          font-size: 11px;
          font-family: var(--font-mono, monospace);
          color: #D4A849;
          font-weight: 600;
        }
        .assessment-mobile-progress-qnum {
          display: block;
          font-size: 9px;
          font-family: var(--font-mono, monospace);
          color: rgba(138,132,128,0.4);
          margin-top: 6px;
        }

        /* ── Segments ── */
        .assessment-segments {
          display: flex;
          gap: 4px;
        }
        .assessment-segments-mobile { gap: 3px; }
        .assessment-segment {
          height: 3px;
          flex: 1;
          border-radius: 3px;
          background: rgba(255,255,255,0.06);
          transition: background 300ms ease;
        }
        .assessment-segment.is-current { background: #D4A849; }
        .assessment-segment.is-complete { background: rgba(212,168,73,0.4); }
        .assessment-segments-mobile .assessment-segment { height: 3px; }

        /* ── Mobile scroll area ── */
        .assessment-mobile-scroll {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          padding: 22px 16px calc(100px + env(safe-area-inset-bottom, 0px));
        }
        .assessment-mobile-scroll-inner {
          display: flex;
          flex-direction: column;
        }
        .assessment-mobile-headline {
          font-family: var(--font-display, serif);
          font-size: clamp(1.3rem, 5.5vw, 1.6rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #F2EDE6;
          margin: 0 0 6px;
          line-height: 1.2;
        }
        .assessment-mobile-subtext {
          font-size: 13px;
          color: rgba(138,132,128,0.55);
          margin: 0 0 24px;
          line-height: 1.5;
        }
        .assessment-mobile-controls { }

        /* ── Mobile footer ── */
        .assessment-mobile-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px calc(12px + env(safe-area-inset-bottom, 0px));
          background: rgba(14,14,13,0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .assessment-mobile-btn-back {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 14px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(138,132,128,0.7);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
          transition: color 180ms ease, background 180ms ease, border-color 180ms ease;
        }
        .assessment-mobile-btn-back:hover { color: #F2EDE6; background: rgba(255,255,255,0.06); }
        .assessment-mobile-btn-back:active { background: rgba(255,255,255,0.04); }
        .assessment-mobile-btn-back:focus-visible { outline: 2px solid #D4A849; outline-offset: 2px; }
        .assessment-mobile-btn-back.is-cancel { color: rgba(138,132,128,0.4); border-color: rgba(255,255,255,0.04); }

        .assessment-mobile-btn-next {
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          background: #D4A849;
          color: #080807;
          border: none;
          cursor: pointer;
          transition: filter 180ms ease, transform 120ms ease, opacity 180ms ease;
        }
        .assessment-mobile-btn-next:active { transform: scale(0.97); }
        .assessment-mobile-btn-next.is-disabled {
          background: rgba(255,255,255,0.06);
          color: rgba(138,132,128,0.3);
          cursor: not-allowed;
        }
        .assessment-mobile-btn-next:focus-visible { outline: 2px solid #D4A849; outline-offset: 2px; }

        .assessment-mobile-summary-bottom {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 20;
          text-align: center;
          padding: 12px 16px calc(12px + env(safe-area-inset-bottom, 0px));
          background: rgba(14,14,13,0.96);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .assessment-mobile-reset {
          font-size: 11px;
          font-family: var(--font-mono, monospace);
          color: rgba(138,132,128,0.3);
          background: none;
          border: none;
          cursor: pointer;
          padding: 12px 20px;
          transition: color 180ms ease;
        }
        .assessment-mobile-reset:hover { color: rgba(138,132,128,0.5); }

        /* ── Option cards ── */
        .assessment-options-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        .assessment-options-compact {
          grid-template-columns: 1fr 1fr;
        }
        @media (min-width: 768px) {
          .assessment-options-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
          .assessment-options-compact { grid-template-columns: 1fr 1fr 1fr; }
        }

        .assessment-option {
          display: grid;
          grid-template-columns: 24px minmax(0, 1fr) 22px;
          align-items: center;
          gap: 12px;
          width: 100%;
          min-height: 58px;
          padding: 13px 15px;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 14px;
          background: rgba(255,255,255,0.025);
          cursor: pointer;
          transition: border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        @media (min-width: 768px) {
          .assessment-option {
            min-height: 64px;
            padding: 16px 18px;
            border-radius: 16px;
          }
          .assessment-option:hover {
            border-color: rgba(255,255,255,0.16);
            background: rgba(255,255,255,0.04);
          }
        }
        .assessment-option:active { transform: scale(0.98); }

        .assessment-option-input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
          pointer-events: none;
        }
        .assessment-option-input:focus-visible + .assessment-option-indicator .assessment-option-checkbox,
        .assessment-option-input:focus-visible + .assessment-option-indicator .assessment-option-radio {
          outline: 2px solid #D4A849;
          outline-offset: 2px;
        }

        .assessment-option-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .assessment-option-checkbox {
          width: 20px;
          height: 20px;
          border-radius: 5px;
          border: 1.5px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 180ms ease, background 180ms ease;
          color: #080807;
        }
        .assessment-option-checkbox.is-checked {
          border-color: #D4A849;
          background: #D4A849;
        }
        .assessment-option-radio {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 180ms ease;
        }
        .assessment-option-radio.is-checked {
          border-color: #D4A849;
        }
        .assessment-option-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #D4A849;
        }
        .assessment-option-label {
          font-size: 14px;
          font-weight: 450;
          color: rgba(242,237,230,0.85);
          line-height: 1.3;
        }
        @media (min-width: 768px) {
          .assessment-option-label { font-size: 14px; }
        }
        .assessment-option-check-icon {
          color: #D4A849;
          flex-shrink: 0;
        }

        .assessment-option.is-selected {
          border-color: rgba(212,168,73,0.7);
          background: rgba(212,168,73,0.07);
          box-shadow: inset 0 0 0 1px rgba(212,168,73,0.12);
        }

        /* ── Dropdown ── */
        .assessment-dropdown-wrap { position: relative; }
        .assessment-dropdown {
          width: 100%;
          height: 50px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.025);
          color: #F2EDE6;
          font-size: 15px;
          padding: 0 16px;
          appearance: none;
          cursor: pointer;
          transition: border-color 180ms ease;
        }
        .assessment-dropdown:focus { outline: none; border-color: rgba(212,168,73,0.4); }
        .assessment-dropdown option { background: #1A1A1A; color: #F2EDE6; }
        .assessment-dropdown-arrow {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%) rotate(90deg);
          color: rgba(138,132,128,0.4);
          pointer-events: none;
        }

        /* ── Slider ── */
        .assessment-slider-wrap { padding-top: 8px; }
        .assessment-slider-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .assessment-slider-label { font-size: 12px; color: rgba(138,132,128,0.5); }
        .assessment-slider-value {
          font-size: 22px;
          font-weight: 600;
          font-family: var(--font-mono, monospace);
          color: #D4A849;
        }
        .assessment-slider-track {
          position: relative;
          height: 6px;
          background: rgba(255,255,255,0.06);
          border-radius: 6px;
        }
        .assessment-slider-fill {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: #D4A849;
          border-radius: 6px;
        }
        .assessment-slider-input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        /* ── Input ── */
        .assessment-input-wrap { }
        .assessment-input {
          width: 100%;
          height: 50px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.025);
          color: #F2EDE6;
          font-size: 16px;
          padding: 0 16px;
          transition: border-color 180ms ease;
        }
        .assessment-input:focus { outline: none; border-color: rgba(212,168,73,0.4); }
        .assessment-input::placeholder { color: rgba(138,132,128,0.3); }

        /* ── Loading ── */
        .assessment-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          gap: 16px;
        }
        .assessment-loading-icon { }
        .assessment-loading-sparkle { color: #D4A849; }
        .assessment-loading-text {
          font-size: 13px;
          font-family: var(--font-mono, monospace);
          color: rgba(138,132,128,0.55);
        }

        /* ── Summary ── */
        .assessment-summary {
          max-width: 520px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .assessment-summary-header { text-align: center; }
        .assessment-summary-eyebrow {
          font-size: 10px;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(212,168,73,0.55);
        }
        .assessment-summary-title {
          font-family: var(--font-display, serif);
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1;
          color: #F2EDE6;
          margin: 8px 0 0;
        }

        .assessment-summary-hero {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.02);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .assessment-score-ring {
          position: relative;
          width: 100px;
          height: 100px;
          flex-shrink: 0;
        }
        .assessment-score-svg { width: 100%; height: 100%; }
        .assessment-score-inner {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .assessment-score-num {
          font-size: 28px;
          font-weight: 700;
          font-family: var(--font-display, serif);
          color: #F2EDE6;
          line-height: 1;
        }
        .assessment-score-denom {
          font-size: 9px;
          font-family: var(--font-mono, monospace);
          color: rgba(138,132,128,0.4);
        }
        .assessment-summary-info { }
        .assessment-summary-info-label {
          font-size: 10px;
          color: rgba(138,132,128,0.5);
          display: block;
          margin-bottom: 2px;
        }
        .assessment-summary-info-value {
          font-size: 18px;
          font-weight: 600;
        }
        .assessment-summary-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }
        .assessment-summary-tag {
          font-size: 9px;
          font-family: var(--font-mono, monospace);
          color: rgba(212,168,73,0.65);
          padding: 3px 8px;
          border-radius: 999px;
          border: 1px solid rgba(212,168,73,0.15);
          background: rgba(212,168,73,0.04);
        }

        .assessment-metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        @media (min-width: 768px) {
          .assessment-metrics-grid { grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        }
        .assessment-metric-card {
          padding: 12px 14px;
          background: rgba(255,255,255,0.02);
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .assessment-metric-header { margin-bottom: 8px; }
        .assessment-metric-label {
          font-size: 9px;
          font-family: var(--font-mono, monospace);
          color: rgba(138,132,128,0.5);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .assessment-metric-bar {
          height: 4px;
          background: rgba(255,255,255,0.06);
          border-radius: 4px;
          overflow: hidden;
        }
        .assessment-metric-fill {
          height: 100%;
          border-radius: 4px;
        }
        .assessment-metric-pct {
          font-size: 10px;
          font-family: var(--font-mono, monospace);
          color: rgba(138,132,128,0.35);
          margin-top: 4px;
          display: block;
        }

        .assessment-recs-card {
          padding: 18px 20px;
          background: rgba(255,255,255,0.02);
          border-radius: 16px;
          border: 1px solid rgba(212,168,73,0.08);
        }
        .assessment-recs-title {
          font-size: 10px;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(212,168,73,0.55);
          margin: 0 0 12px;
        }
        .assessment-recs-list { display: flex; flex-direction: column; gap: 8px; }
        .assessment-recs-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .assessment-recs-num {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(212,168,73,0.08);
          border: 1px solid rgba(212,168,73,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-family: var(--font-mono, monospace);
          color: #D4A849;
          flex-shrink: 0;
        }
        .assessment-recs-name {
          font-size: 13px;
          color: rgba(242,237,230,0.8);
        }
        .assessment-recs-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 11px;
          color: rgba(138,132,128,0.45);
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(212,168,73,0.08);
        }
        .assessment-recs-meta strong { color: rgba(242,237,230,0.6); }

        .assessment-summary-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 4px;
        }
        .assessment-summary-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          background: #D4A849;
          color: #080807;
          border: none;
          cursor: pointer;
          transition: filter 180ms ease, transform 120ms ease;
        }
        .assessment-summary-cta:active { transform: scale(0.97); }
        .assessment-summary-cta:hover { filter: brightness(1.06); }
        .assessment-summary-cta:focus-visible { outline: 2px solid #D4A849; outline-offset: 2px; }
        .assessment-summary-close {
          font-size: 12px;
          color: rgba(138,132,128,0.5);
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          transition: color 180ms ease;
        }
        .assessment-summary-close:hover { color: rgba(242,237,230,0.6); }
      `}</style>
    </>
  );
}
