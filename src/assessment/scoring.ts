import type { AssessmentAnswers, DomainScore } from "./types";
import { questionBank, serviceConfigs, urgencyValue, painSeverity, domainLabels } from "./config";
import { evaluateCondition } from "./engine";

/* ═══════════════════════════════════════════
   Helper: get answer for a question
   ═══════════════════════════════════════════ */

function a(id: string, answers: AssessmentAnswers): unknown {
  return answers[id];
}

function asArray(id: string, answers: AssessmentAnswers): string[] {
  const v = answers[id];
  return Array.isArray(v) ? v : [];
}

/* ═══════════════════════════════════════════
   DOMAIN MATURITY SCORES
   ═══════════════════════════════════════════ */

interface DomainConfig {
  questions: string[];
  weight: number;
  computeScore: (answers: AssessmentAnswers) => { score: number; evidence: string[]; strengths: string[]; gaps: string[] };
  isApplicable: (answers: AssessmentAnswers) => boolean;
}

const domainConfigs: Record<string, DomainConfig> = {
  website: {
    questions: ["websiteExists", "websiteAge", "websiteSatisfaction", "cms", "traffic", "websitePurpose"],
    weight: 1,
    computeScore(answers) {
      const evidence: string[] = [];
      const strengths: string[] = [];
      const gaps: string[] = [];
      let score = 0;

      const exists = a("websiteExists", answers);
      if (exists === "no" || exists === "building") {
        return {
          score: 0,
          evidence: ["No current website."],
          strengths: [],
          gaps: ["No website established yet."],
        };
      }

      evidence.push("Website exists.");

      const sat = a("websiteSatisfaction", answers);
      if (sat === "very" || sat === "somewhat") {
        score += 40;
        strengths.push("Current website satisfaction is positive.");
      } else if (sat === "dissatisfied" || sat === "very-dissatisfied") {
        score += 10;
        gaps.push("Website satisfaction is low — likely underperforming.");
      } else {
        score += 25;
      }

      const age = a("websiteAge", answers);
      if (age === "5+") { score += 30; strengths.push("Established website domain authority."); }
      else if (age === "3-5") { score += 20; }
      else if (age === "1-3") { score += 10; gaps.push("Relatively new website — authority still building."); }
      else { score += 5; gaps.push("Very young website — limited authority."); }

      const traf = a("traffic", answers);
      if (traf === "20k+") { score += 30; strengths.push("Strong existing traffic."); }
      else if (traf === "5k-20k") { score += 20; }
      else if (traf === "500-5k") { score += 10; gaps.push("Moderate traffic — room for growth."); }
      else if (traf === "0-500") { score += 5; gaps.push("Low traffic — significant growth opportunity."); }

      return { score: Math.min(score, 100), evidence, strengths, gaps };
    },
    isApplicable(answers) {
      return a("websiteExists", answers) === "yes";
    },
  },

  newWebsite: {
    questions: ["websiteExists", "newWebsiteGoal", "existingBrandAssets", "websiteLaunchTimeline"],
    weight: 1,
    computeScore(answers) {
      const evidence: string[] = [];
      const strengths: string[] = [];
      const gaps: string[] = [];
      let score = 0;

      evidence.push("New website opportunity identified.");

      const goals = asArray("newWebsiteGoal", answers);
      if (goals.length > 0) {
        strengths.push(`${goals.length} key function(s) identified for new website.`);
        score += 30;
      } else {
        gaps.push("Website functions not yet defined.");
      }

      const assets = a("existingBrandAssets", answers);
      if (assets === "yes") { score += 20; strengths.push("Brand assets exist — faster launch possible."); }
      else { gaps.push("Brand assets needed before website build."); }

      const timeline = a("websiteLaunchTimeline", answers);
      if (timeline === "asap" || timeline === "1-3-months") {
        score += 30;
        strengths.push("Clear launch timeline defined.");
      } else {
        gaps.push("Launch timeline not yet committed.");
      }

      score += 20;

      return { score: Math.min(score, 100), evidence, strengths, gaps };
    },
    isApplicable(answers) {
      return a("websiteExists", answers) === "no" || a("websiteExists", answers) === "building";
    },
  },

  seo: {
    questions: ["currentSeo", "seoSatisfaction", "seoScope", "traffic"],
    weight: 1,
    computeScore(answers) {
      const evidence: string[] = [];
      const strengths: string[] = [];
      const gaps: string[] = [];
      let score = 0;

      const current = a("currentSeo", answers);
      if (!current) return { score: 0, evidence: ["SEO not assessed."], strengths: [], gaps: [] };

      if (current === "inhouse") { score += 30; strengths.push("Dedicated in-house SEO resource."); }
      else if (current === "agency") { score += 25; strengths.push("Working with an SEO agency."); }
      else if (current === "freelancer") { score += 20; }
      else if (current === "none") { score += 5; gaps.push("No current SEO investment."); }
      else { score += 10; gaps.push("SEO approach unclear."); }

      const sat = a("seoSatisfaction", answers);
      if (sat !== undefined && sat !== null) {
        const satScore = Number(sat);
        if (satScore >= 8) { score += 30; strengths.push("High satisfaction with SEO results."); }
        else if (satScore >= 5) { score += 15; }
        else { score += 5; gaps.push("Low satisfaction with current SEO results."); }
      }

      const scope = asArray("seoScope", answers);
      evidence.push(`SEO scope: ${scope.length > 0 ? scope.join(", ") : "not yet defined"}.`);
      if (scope.length > 0) strengths.push(`${scope.length} SEO area(s) identified for focus.`);
      if (scope.length === 0) gaps.push("SEO focus areas not yet defined.");

      return { score: Math.min(score, 100), evidence, strengths, gaps };
    },
    isApplicable() { return true; },
  },

  geo: {
    questions: ["aiSearchChecked", "aiPlatforms"],
    weight: 1,
    computeScore(answers) {
      const evidence: string[] = [];
      const strengths: string[] = [];
      const gaps: string[] = [];
      let score = 0;

      const checked = a("aiSearchChecked", answers);
      if (!checked) return { score: 0, evidence: ["AI search readiness not assessed."], strengths: [], gaps: [] };

      if (checked === "yes-appear") { score += 60; strengths.push("Business already appears in AI search results."); }
      else if (checked === "yes-not") { score += 20; gaps.push("Checked — business does not appear in AI search results."); }
      else if (checked === "no") { score += 10; gaps.push("AI search presence not yet checked."); }
      else { score += 5; gaps.push("AI search awareness is low — significant opportunity."); }

      evidence.push(`AI search status: ${checked}.`);

      const platforms = asArray("aiPlatforms", answers);
      if (platforms.length > 0) strengths.push(`${platforms.length} relevant AI platform(s) identified.`);

      return { score: Math.min(score, 100), evidence, strengths, gaps };
    },
    isApplicable() { return true; },
  },

  local: {
    questions: ["localRelevance", "gbpStatus", "reviewCount"],
    weight: 1,
    computeScore(answers) {
      const evidence: string[] = [];
      const strengths: string[] = [];
      const gaps: string[] = [];

      if (a("localRelevance", answers) !== "yes") {
        return { score: 0, evidence: ["Local search not relevant for this business."], strengths: [], gaps: [] };
      }

      let score = 30;
      evidence.push("Local search is relevant.");

      const gbp = a("gbpStatus", answers);
      if (gbp === "verified") { score += 30; strengths.push("Google Business Profile is verified and active."); }
      else if (gbp === "unverified") { score += 10; gaps.push("Google Business Profile exists but is not verified."); }
      else if (gbp === "not-created") { score += 0; gaps.push("No Google Business Profile — significant local visibility gap."); }
      else { return { score: 0, evidence: ["Local not applicable."], strengths: [], gaps: [] }; }

      const reviews = a("reviewCount", answers);
      if (reviews === "50+") { score += 30; strengths.push("Strong review profile (50+ reviews)."); }
      else if (reviews === "10-50") { score += 20; strengths.push("Good review activity."); }
      else if (reviews === "1-10") { score += 10; gaps.push("Limited reviews — building social proof needed."); }
      else if (reviews === "0") { gaps.push("No reviews — review generation is a priority."); }

      return { score: Math.min(score, 100), evidence, strengths, gaps };
    },
    isApplicable() { return true; },
  },

  leadGeneration: {
    questions: ["monthlyLeads"],
    weight: 1,
    computeScore(answers) {
      const evidence: string[] = [];
      const strengths: string[] = [];
      const gaps: string[] = [];

      const leads = a("monthlyLeads", answers);
      if (!leads || leads === "unknown") {
        return { score: 0, evidence: ["Lead generation not assessed."], strengths: [], gaps: [] };
      }

      if (leads === "50+") { return { score: 80, evidence: ["Strong lead volume."], strengths: ["High lead volume."], gaps: ["Lead quality and conversion should be reviewed."] }; }
      if (leads === "20-50") { return { score: 60, evidence: ["Moderate lead volume."], strengths: ["Established lead flow."], gaps: ["Scaling lead volume recommended."] }; }
      if (leads === "5-20") { return { score: 35, evidence: ["Low lead volume."], strengths: [], gaps: ["Lead generation needs significant improvement."] }; }
      return { score: 15, evidence: ["Very low lead volume."], strengths: [], gaps: ["Lead generation system needs to be built."] };
    },
    isApplicable() { return true; },
  },

  automation: {
    questions: ["manualHours", "currentCrm"],
    weight: 1,
    computeScore(answers) {
      const evidence: string[] = [];
      const strengths: string[] = [];
      const gaps: string[] = [];

      const hours = a("manualHours", answers);
      if (!hours || hours === "unknown") {
        return { score: 0, evidence: ["Automation readiness not assessed."], strengths: [], gaps: [] };
      }

      const h = String(hours);
      if (h === "30+") { return { score: 80, evidence: ["Significant manual work identified."], strengths: [], gaps: ["High automation opportunity — many hours spent on manual tasks."] }; }
      if (h === "15-30") { return { score: 60, evidence: ["Substantial manual effort."], strengths: [], gaps: ["Strong automation opportunity."] }; }
      if (h === "5-15") { return { score: 40, evidence: ["Moderate manual effort."], strengths: ["Some processes may already be efficient."], gaps: ["Automation could still reduce workload."] }; }
      return { score: 20, evidence: ["Low manual effort."], strengths: ["Operations appear relatively efficient."], gaps: [] };
    },
    isApplicable() { return true; },
  },
};

/* ═══════════════════════════════════════════
   Compute all domain scores
   ═══════════════════════════════════════════ */

export function computeDomainScores(answers: AssessmentAnswers): Record<string, DomainScore> {
  const result: Record<string, DomainScore> = {};
  const relevantQIds = new Set(
    questionBank.filter((q) => !q.showWhen || evaluateCondition(q.showWhen, answers)).map((q) => q.id),
  );

  for (const [domain, config] of Object.entries(domainConfigs)) {
    if (!config.isApplicable(answers)) {
      result[domain] = {
        status: "notApplicable",
        score: null,
        confidence: 1,
        evidence: [],
        strengths: [],
        gaps: [],
      };
      continue;
    }

    const answeredDomainQs = config.questions.filter((qid) => {
      return answers[qid] !== undefined && answers[qid] !== null && answers[qid] !== "";
    });

    if (answeredDomainQs.length === 0) {
      result[domain] = {
        status: "notAssessed",
        score: null,
        confidence: 0,
        evidence: [],
        strengths: [],
        gaps: ["Not enough information to assess this domain."],
      };
      continue;
    }

    if (answeredDomainQs.length === 1 && config.questions.length > 2) {
      result[domain] = {
        status: "insufficientEvidence",
        score: null,
        confidence: 0.2,
        evidence: [],
        strengths: [],
        gaps: ["Preliminary — more information needed for a reliable assessment."],
      };
      continue;
    }

    const computed = config.computeScore(answers);
    const confidence = Math.min(1, answeredDomainQs.length / config.questions.length + 0.2);

    result[domain] = {
      status: "assessed",
      score: computed.score,
      confidence,
      evidence: computed.evidence,
      strengths: computed.strengths,
      gaps: computed.gaps,
    };
  }

  return result;
}

/* ═══════════════════════════════════════════
   User-Facing Opportunity Score
   ═══════════════════════════════════════════ */

export function computeOpportunityScore(answers: AssessmentAnswers): {
  score: number;
  label: string;
  confidence: number;
} {
  const domainScores = computeDomainScores(answers);

  /* Impact severity: sum of pain severities selected */
  const pains = asArray("pain", answers);
  const maxPainScore = pains.reduce((sum, p) => sum + (painSeverity[p] || 5), 0);
  const impactSeverity = Math.min(1, maxPainScore / 30);

  /* Capability gap: average of low domain scores */
  const assessed = Object.values(domainScores).filter((d) => d.status === "assessed" && d.score !== null);
  const avgMaturity = assessed.length > 0
    ? assessed.reduce((sum, d) => sum + (d.score || 0), 0) / assessed.length
    : 50;
  const capabilityGap = Math.min(1, (100 - avgMaturity) / 100);

  /* Goal alignment */
  const goals = asArray("goal", answers);
  const goalAlignment = goals.length > 0 ? Math.min(1, goals.length * 0.25) : 0.3;

  /* Urgency */
  const urg = a("urgency", answers);
  const urgency = urg ? Math.min(1, (urgencyValue[String(urg)] || 5) / 10) : 0.3;

  /* Scale potential: team size + business model */
  const team = a("teamSize", answers);
  const scaleMap: Record<string, number> = { "solo": 0.3, "2-10": 0.5, "11-25": 0.7, "26-50": 0.8, "51-200": 0.9, "200+": 1 };
  const scalePotential = scaleMap[String(team)] || 0.5;

  /* Feasibility */
  const blocker = a("blocker", answers);
  const feasibility = blocker === "budget" || blocker === "approval" ? 0.6 : 0.85;

  /* Evidence confidence */
  const totalQuestions = questionBank.length;
  const answeredCount = questionBank.filter((q) => {
    const val = answers[q.id];
    return val !== undefined && val !== null && val !== "";
  }).length;
  const evidenceConfidence = Math.min(1, answeredCount / Math.min(totalQuestions, 22));

  const rawScore =
    impactSeverity * 0.24 +
    capabilityGap * 0.24 +
    goalAlignment * 0.16 +
    scalePotential * 0.12 +
    urgency * 0.10 +
    feasibility * 0.08 +
    evidenceConfidence * 0.06;

  const score = Math.round(rawScore * 100);

  let label: string;
  if (score >= 80) label = "High-Impact Opportunity";
  else if (score >= 65) label = "Strong Opportunity";
  else if (score >= 45) label = "Meaningful Opportunity";
  else if (score >= 25) label = "Emerging Opportunity";
  else label = "Foundation Opportunity";

  return { score, label, confidence: evidenceConfidence };
}

/* ═══════════════════════════════════════════
   Internal Lead Qualification Score
   ═══════════════════════════════════════════ */

export function computeLeadScore(answers: AssessmentAnswers): {
  score: number;
  classification: "platinum" | "hot" | "warm" | "nurture" | "low-priority";
} {
  /* Intent strength */
  const services = asArray("services", answers);
  const intent = Math.min(1, services.length * 0.1 + (services.includes("unsure") ? 0.2 : 0));

  /* Pain severity */
  const pains = asArray("pain", answers);
  const painScore = Math.min(1, pains.reduce((s, p) => s + (painSeverity[p] || 5), 0) / 30);

  /* Urgency */
  const urg = a("urgency", answers);
  const urgency = urg ? (urgencyValue[String(urg)] || 5) / 10 : 0.3;

  /* Authority */
  const role = a("businessType", answers);
  const authorityMap: Record<string, number> = {
    owner: 1, "marketing-leader": 0.8, "ops-leader": 0.7, "sales-leader": 0.7,
    "marketing-team": 0.5, agency: 0.5, freelancer: 0.4, other: 0.3,
  };
  const authority = authorityMap[String(role)] || 0.3;

  const decision = a("decisionMaker", answers);
  const authorityFinal = decision === "yes" ? Math.max(authority, 0.7) :
    decision === "approval" ? authority * 0.6 : authority * 0.3;

  /* Budget fit */
  const budget = a("budget", answers);
  const budgetMap: Record<string, number> = {
    "25k+": 1, "10k-25k": 0.9, "5k-10k": 0.7, "3k-5k": 0.5, "1k-3k": 0.3,
    "under-1k": 0.15, guidance: 0.4, undisclosed: 0.4,
  };
  const budgetFit = budget ? (budgetMap[String(budget)] || 0.3) : 0.3;

  /* Company fit */
  const team = a("teamSize", answers);
  const companyMap: Record<string, number> = { "solo": 0.3, "2-10": 0.5, "11-25": 0.7, "26-50": 0.8, "51-200": 0.9, "200+": 1 };
  const companyFit = companyMap[String(team)] || 0.5;

  /* Strategic fit */
  const industry = a("industry", answers);
  const strategicFit = industry ? 0.6 : 0.3;

  /* Timing */
  const start = a("startTimeline", answers);
  const timingMap: Record<string, number> = { today: 1, week: 0.9, month: 0.7, quarter: 0.4, unsure: 0.2 };
  const timing = timingMap[String(start)] || 0.3;

  /* Engagement quality */
  const answered = questionBank.filter((q) => {
    const val = answers[q.id];
    return val !== undefined && val !== null && val !== "";
  }).length;
  const engagement = Math.min(1, answered / 20);

  const rawScore =
    intent * 0.18 +
    painScore * 0.14 +
    urgency * 0.14 +
    authorityFinal * 0.14 +
    budgetFit * 0.14 +
    companyFit * 0.10 +
    strategicFit * 0.08 +
    timing * 0.05 +
    engagement * 0.03;

  const score = Math.round(rawScore * 100);

  let classification: "platinum" | "hot" | "warm" | "nurture" | "low-priority";
  if (score >= 85) classification = "platinum";
  else if (score >= 70) classification = "hot";
  else if (score >= 50) classification = "warm";
  else if (score >= 30) classification = "nurture";
  else classification = "low-priority";

  return { score, classification };
}

/* ═══════════════════════════════════════════
   Confidence label
   ═══════════════════════════════════════════ */

export function getConfidenceLabel(confidence: number): "early" | "moderate" | "strong" {
  if (confidence >= 0.8) return "strong";
  if (confidence >= 0.6) return "moderate";
  return "early";
}
