"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Check, X, CaretRight, Lightning,
  ChartLineUp, Sparkle, Robot, SealCheck, MagnifyingGlass, Globe,
  Clock, Star, TrendUp, Question,
} from "@phosphor-icons/react";
import steps, { calculateScores, getTotalScore, getTemperature, generateRecommendations, estimateTimeline, estimateProjectValue } from "@/data/lead-engine-config";
import type { QuestionOption } from "@/data/lead-engine-config";

const STORAGE_KEY = "zon-lead-engine-state";

const trustItems = [
  "Personalized recommendations",
  "AI Search readiness analysis",
  "Growth opportunity report",
  "No obligation consultation",
];

const triggerStyles = `
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 8px rgba(212,168,73,0.2); }
    50% { box-shadow: 0 0 24px rgba(212,168,73,0.4); }
  }
  .animate-pulse-glow {
    animation: pulseGlow 2s ease-in-out infinite;
  }
`;

/* ─── TRIGGER BUTTON ─── */

export function LeadEngineTrigger({ onClick, label = "Start Assessment" }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center gap-2 bg-accent text-ground pl-6 pr-2 py-2.5 rounded-full font-medium text-sm active:scale-[0.98] transition-all duration-150 hover:brightness-105 animate-pulse-glow"
    >
      <span>{label}</span>
      <span className="w-7 h-7 rounded-full bg-ground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
        <ArrowRight size={14} weight="bold" />
      </span>
    </button>
  );
}

/* ─── QUESTION COMPONENTS ─── */

function CardsQuestion({
  options,
  value,
  onChange,
  multi,
}: {
  options: QuestionOption[];
  value: string | string[];
  onChange: (v: string | string[]) => void;
  multi?: boolean;
}) {
  const isSelected = (opt: QuestionOption) => {
    if (multi && Array.isArray(value)) return value.includes(opt.value);
    return value === opt.value;
  };

  const toggle = (opt: QuestionOption) => {
    if (multi) {
      const current = Array.isArray(value) ? value : [];
      if (current.includes(opt.value)) {
        onChange(current.filter((v) => v !== opt.value));
      } else {
        onChange([...current, opt.value]);
      }
    } else {
      onChange(opt.value);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {options.map((opt) => {
        const selected = isSelected(opt);
        return (
          <motion.button
            key={opt.value}
            onClick={() => toggle(opt)}
            whileTap={{ scale: 0.98 }}
            className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
              selected
                ? "bg-accent/10 border border-accent/50 text-white"
                : "bg-[#1A1A1A] border border-[#2A2A2A] text-text-secondary hover:border-accent/30 hover:bg-[#222]"
            }`}
          >
            {multi && (
              <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                selected ? "bg-accent border-accent" : "border-[#3A3A3A]"
              }`}>
                {selected && <Check size={10} weight="bold" className="text-ground" />}
              </span>
            )}
            <span className="text-sm font-medium">{opt.label}</span>
            {!multi && selected && (
              <Check size={14} weight="bold" className="ml-auto text-accent flex-shrink-0" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function DropdownQuestion({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: QuestionOption[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3.5 text-sm text-text-primary appearance-none cursor-pointer focus:outline-none focus:border-accent/50 transition-colors"
      >
        <option value="" disabled>{placeholder || "Select an option"}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <CaretRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary rotate-90 pointer-events-none" />
    </div>
  );
}

function SliderQuestion({
  min, max, value, onChange,
}: {
  min: number; max: number; value: number; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-secondary/60">{min}</span>
        <span className="text-accent font-semibold text-lg">{value}</span>
        <span className="text-text-secondary/60">{max}</span>
      </div>
      <div className="relative h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-accent rounded-full"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.2 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={`Value: ${value}`}
        />
      </div>
    </div>
  );
}

function InputQuestion({
  value, onChange, placeholder,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder:text-text-secondary/30 focus:outline-none focus:border-accent/50 transition-colors"
      autoFocus
    />
  );
}

/* ─── STEP RENDERER ─── */

function StepRenderer({
  stepId,
  questions,
  answers,
  onAnswer,
}: {
  stepId: number;
  questions: any[];
  answers: Record<string, any>;
  onAnswer: (id: string, value: any) => void;
}) {
  const visible = questions.filter((q) => {
    if (q.showIf) {
      const parentValue = answers[q.showIf.stepId];
      if (Array.isArray(q.showIf.value)) {
        if (!parentValue || !q.showIf.value.some((v: string) => parentValue.includes(v))) return false;
      } else {
        if (parentValue !== q.showIf.value) return false;
      }
    }
    if (q.condition) return q.condition(answers);
    return true;
  });

  return (
    <div className="space-y-8">
      {visible.map((q, i) => (
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
        >
          <h3 className="text-lg font-display font-semibold text-text-primary mb-1">{q.headline}</h3>
          <p className="text-sm text-text-secondary/60 mb-4">{q.subtext}</p>

          {q.type === "cards" && (
            <CardsQuestion options={q.options!} value={answers[q.id] || ""} onChange={(v) => onAnswer(q.id, v)} />
          )}
          {q.type === "multi-cards" && (
            <CardsQuestion options={q.options!} value={answers[q.id] || []} onChange={(v) => onAnswer(q.id, v)} multi />
          )}
          {q.type === "dropdown" && (
            <DropdownQuestion options={q.options!} value={answers[q.id] || ""} onChange={(v) => onAnswer(q.id, v)} placeholder={q.placeholder} />
          )}
          {q.type === "slider" && (
            <SliderQuestion min={q.min!} max={q.max!} value={answers[q.id] ?? Math.round((q.min! + q.max!) / 2)} onChange={(v) => onAnswer(q.id, v)} />
          )}
          {q.type === "input" && (
            <InputQuestion value={answers[q.id] || ""} onChange={(v) => onAnswer(q.id, v)} placeholder={q.placeholder} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── SUMMARY VIEW ─── */

function SummaryView({
  answers, scores, onClose,
}: {
  answers: Record<string, any>; scores: Record<string, number>; onClose: () => void;
}) {
  const totalScore = getTotalScore(scores);
  const temp = getTemperature(totalScore);
  const recs = generateRecommendations(scores, answers);
  const timeline = estimateTimeline(recs);
  const value = estimateProjectValue(recs, scores.budgetScore || 0);
  const [showCopy, setShowCopy] = useState(false);

  const metrics = [
    { label: "AI Readiness", value: Math.min(100, Math.max(0, (scores.aiReadiness + 10) * 5)), color: scores.aiReadiness > 0 ? "#D4A849" : "#8A8480" },
    { label: "SEO Maturity", value: Math.min(100, Math.max(0, (scores.seoMaturity + 10) * 5)), color: scores.seoMaturity > 0 ? "#D4A849" : "#8A8480" },
    { label: "Website Health", value: Math.min(100, Math.max(0, (scores.websiteMaturity + 5) * 6)), color: scores.websiteMaturity > 3 ? "#D4A849" : "#8A8480" },
    { label: "Lead Potential", value: Math.min(100, Math.max(0, scores.revenueOpportunity * 10)), color: scores.revenueOpportunity > 3 ? "#D4A849" : "#8A8480" },
    { label: "Automation Potential", value: Math.min(100, Math.max(0, scores.budgetScore * 8)), color: scores.budgetScore > 3 ? "#D4A849" : "#8A8480" },
    { label: "Brand Visibility", value: Math.min(100, Math.max(0, (scores.authorityScore + 5) * 6)), color: scores.authorityScore > 3 ? "#D4A849" : "#8A8480" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-accent/60">Your Assessment is Ready</span>
        <h2 className="font-display font-semibold text-[clamp(1.8rem,3vw,2.8rem)] tracking-[-0.03em] leading-[0.95] text-text-primary mt-2">
          Growth Opportunity Report
        </h2>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-4"
      >
        <div className="relative w-28 h-28">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#2A2A2A" strokeWidth="6" />
            <motion.circle
              cx="60" cy="60" r="52" fill="none" stroke={temp.color} strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${totalScore * 3.267} 326.7`}
              initial={{ strokeDasharray: "0 326.7" }}
              animate={{ strokeDasharray: `${totalScore * 3.267} 326.7` }}
              transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-display font-bold text-white">{totalScore}</span>
            <span className="text-[9px] font-mono text-text-secondary/50">/100</span>
          </div>
        </div>
        <div className="text-left">
          <span className="text-xs font-mono text-text-secondary/50">Lead Temperature</span>
          <div className="text-xl font-display font-semibold" style={{ color: temp.color }}>{temp.label}</div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {recs.slice(0, 3).map((r) => (
              <span key={r} className="text-[9px] font-mono text-accent/70 px-2 py-0.5 rounded-full border border-accent/25 bg-accent/5">
                {r}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-2"
      >
        {metrics.map((m) => (
          <div key={m.label} className="bg-[#181818] border border-accent/15 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono text-text-secondary/50">{m.label}</span>
            </div>
            <div className="h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: m.color }}
                initial={{ width: 0 }}
                animate={{ width: `${m.value}%` }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
              />
            </div>
            <span className="text-[11px] font-mono text-text-secondary/40 mt-1 block">{m.value}%</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-[#181818] border border-accent/20 rounded-xl p-5 space-y-3"
      >
        <h4 className="text-[10px] font-mono tracking-widest uppercase text-accent/60">Recommended Services</h4>
        <div className="space-y-2">
          {recs.map((r, i) => (
            <div key={r} className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] font-mono text-accent">{i + 1}</span>
              </span>
              <span className="text-sm text-text-primary">{r}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 pt-3 border-t border-accent/10 text-xs text-text-secondary/50">
          <span>Timeline: <strong className="text-text-secondary/80">{timeline}</strong></span>
          <span>Est. Value: <strong className="text-text-secondary/80">{value}</strong></span>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <button
          onClick={() => {
            setShowCopy(true);
            setTimeout(() => setShowCopy(false), 2000);
          }}
          className="w-full py-3 bg-accent text-ground font-medium text-sm rounded-xl active:scale-[0.98] transition-transform duration-150 hover:brightness-105"
        >
          {showCopy ? "Report Copied!" : "Download My Growth Report"}
        </button>
        <button
          onClick={onClose}
          className="w-full py-3 text-text-secondary text-sm hover:text-text-primary transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─── */

export default function LeadIntelligenceEngine({ open, onOpenChange }: { open?: boolean; onOpenChange?: (v: boolean) => void } = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setAnswers(parsed.answers || {});
          setCurrentStep(parsed.step || 0);
        } catch {}
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, step: currentStep }));
    }
  }, [answers, currentStep, isOpen]);

  useEffect(() => {
    setScores(calculateScores(answers));
  }, [answers]);

  const handleAnswer = useCallback((id: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const stepConfig = steps[currentStep];
  const totalScore = getTotalScore(scores);
  const temp = getTemperature(totalScore);

  const canProceed = () => {
    const visible = stepConfig.questions.filter((q) => {
      if (q.showIf) {
        const parentValue = answers[q.showIf.stepId];
        if (Array.isArray(q.showIf.value)) {
          if (!parentValue || !q.showIf.value.some((v) => parentValue.includes(v))) return false;
        } else {
          if (parentValue !== q.showIf.value) return false;
        }
      }
      return true;
    });
    return visible.every((q) => {
      const val = answers[q.id];
      if (q.type === "multi-cards") return Array.isArray(val) && val.length > 0;
      if (q.type === "cards" || q.type === "dropdown") return !!val;
      if (q.type === "input") return val && val.trim().length > 0;
      if (q.type === "slider") return val !== undefined && val !== null;
      return true;
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
      panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setShowSummary(true);
        localStorage.removeItem(STORAGE_KEY);
      }, 1500);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(0);
    setShowSummary(false);
    setIsGenerating(false);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowSummary(false);
    setIsGenerating(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const generatingMessages = [
    "Analyzing your business...",
    "Reviewing your answers...",
    "Preparing recommendations...",
    "Checking opportunity signals...",
    "Generating your report...",
  ];
  const [genMsgIndex, setGenMsgIndex] = useState(0);

  useEffect(() => {
    if (!isGenerating) return;
    setGenMsgIndex(0);
    const interval = setInterval(() => {
      setGenMsgIndex((i) => Math.min(i + 1, generatingMessages.length - 1));
    }, 300);
    return () => clearInterval(interval);
  }, [isGenerating]);

  if (!isOpen) {
    if (open !== undefined) return null;
    return (
      <>
        <style>{triggerStyles}</style>
        <LeadEngineTrigger onClick={() => setIsOpen(true)} />
      </>
    );
  }

  const stepLabels = steps.map((s) => s.title);

  return (
    <>
      <style>{triggerStyles}</style>
      <style>{`
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(212,168,73,0.2); border-radius: 4px; }
        .scrollbar-thin { scrollbar-width: thin; scrollbar-color: rgba(212,168,73,0.2) transparent; }
      `}</style>

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        className="fixed inset-4 md:inset-[4vh] z-[101] mx-auto flex max-w-[1500px] max-h-[950px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full bg-[#0D0D0C] border border-accent/15 rounded-[1.75rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close"
          >
            <X size={14} />
          </button>

          {/* LEFT PANEL */}
          <div className="hidden md:flex flex-col w-[35%] bg-[#111110] border-r border-accent/10 p-8 justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sparkle size={16} weight="fill" className="text-accent" />
                  <span className="text-[10px] font-mono tracking-widest uppercase text-accent/60">AI Growth Assessment</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-text-primary mt-1">Grow With Intelligence</h3>
                <p className="text-xs text-text-secondary/50 mt-1 leading-relaxed">
                  Discover exactly where your business is losing visibility, leads and opportunities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-8 space-y-3"
              >
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary/50">Progress</span>
                    <span className="text-accent font-semibold font-mono">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent rounded-full"
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                    />
                  </div>
                </div>

                {/* Step indicator */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-text-secondary/40">
                    Step {currentStep + 1} of {totalSteps}
                  </span>
                  <div className="flex gap-1">
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i === currentStep ? "bg-accent" : i < currentStep ? "bg-accent/40" : "bg-[#2A2A2A]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-text-secondary/30">
                    Est. {Math.max(1, totalSteps - currentStep)} min remaining
                  </span>
                </div>

                {/* AI Status */}
                {scores && Object.keys(scores).length > 0 && (
                  <div className="flex items-center gap-2 text-[10px] font-mono text-accent/60 mt-4">
                    <Robot size={12} />
                    <span>Assessment Status: <strong className="text-accent/80">Analyzing</strong></span>
                  </div>
                )}
              </motion.div>

              {scores && Object.keys(scores).length > 0 && currentStep > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-[#181818] border border-accent/10"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <Lightning size={16} weight="fill" className="text-accent" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-text-secondary/40">Opportunity Score</div>
                    <div className="text-sm font-display font-semibold" style={{ color: temp.color }}>
                      {totalScore}/100 · {temp.label}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Trust badges */}
            <div className="space-y-2">
              {trustItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="flex items-center gap-2 text-xs text-text-secondary/40"
                >
                  <SealCheck size={12} className="text-accent/50 flex-shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div ref={panelRef} className="flex-1 flex flex-col overflow-y-auto scrollbar-thin p-6 md:p-10">
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[300px]"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkle size={32} className="text-accent" />
                    </motion.div>
                    <p className="text-sm text-text-secondary/60 mt-4 font-mono">
                      {generatingMessages[genMsgIndex]}
                    </p>
                  </motion.div>
                ) : showSummary ? (
                  <SummaryView key="summary" answers={answers} scores={scores} onClose={handleClose} />
                ) : (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {/* Mobile progress */}
                    <div className="md:hidden mb-6 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary/40">Step {currentStep + 1} of {totalSteps}</span>
                        <span className="text-accent/60 font-mono">{Math.round(progress)}%</span>
                      </div>
                      <div className="flex gap-1">
                        {steps.map((_, i) => (
                          <div key={i} className={`h-1 flex-1 rounded-full ${i === currentStep ? "bg-accent" : i < currentStep ? "bg-accent/40" : "bg-[#2A2A2A]"}`} />
                        ))}
                      </div>
                    </div>

                    {/* Step header */}
                    <div className="mb-6">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-accent/60">{stepConfig.title}</span>
                      <p className="text-xs text-text-secondary/30 mt-0.5">{stepConfig.subtitle}</p>
                    </div>

                    {/* Questions */}
                    <StepRenderer
                      stepId={currentStep}
                      questions={stepConfig.questions}
                      answers={answers}
                      onAnswer={handleAnswer}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            {!isGenerating && !showSummary && (
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-accent/5">
                <button
                  onClick={currentStep === 0 ? handleClose : handlePrev}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                    currentStep === 0
                      ? "text-text-secondary/30 hover:text-text-secondary/50"
                      : "text-text-secondary hover:text-text-primary hover:bg-[#1A1A1A]"
                  }`}
                >
                  <ArrowLeft size={14} />
                  {currentStep === 0 ? "Cancel" : "Back"}
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    canProceed()
                      ? "bg-accent text-ground hover:brightness-105 active:scale-[0.98]"
                      : "bg-[#2A2A2A] text-text-secondary/30 cursor-not-allowed"
                  }`}
                >
                  {currentStep < totalSteps - 1 ? (
                    <>Next <ArrowRight size={14} /></>
                  ) : (
                    <>Generate Report <Sparkle size={14} /></>
                  )}
                </button>
              </div>
            )}

            {/* Reset */}
            {showSummary && (
              <div className="text-center mt-4">
                <button
                  onClick={handleReset}
                  className="text-[10px] font-mono text-text-secondary/20 hover:text-text-secondary/40 transition-colors"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
