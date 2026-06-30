import type {
  AssessmentAnswers, ServiceRecommendation, ReportFinding,
  RoadmapPhase, GrowthOpportunityReport, DomainScore,
} from "./types";
import { questionBank, serviceConfigs, domainLabels, urgencyValue } from "./config";
import { computeDomainScores, computeOpportunityScore, getConfidenceLabel, computeLeadScore } from "./scoring";
import { evaluateCondition } from "./engine";

/* ═══════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════ */

function a(id: string, answers: AssessmentAnswers): unknown { return answers[id]; }
function asArray(id: string, answers: AssessmentAnswers): string[] {
  const v = answers[id]; return Array.isArray(v) ? v : [];
}

/* ═══════════════════════════════════════════
   Service Affinity Engine
   ═══════════════════════════════════════════ */

interface ServiceAffinityResult {
  serviceId: string;
  affinity: number;
  confidence: number;
  reasonCodes: string[];
  evidence: string[];
  dependency?: string;
}

export function computeServiceAffinities(answers: AssessmentAnswers): ServiceAffinityResult[] {
  const services = asArray("services", answers);
  const pains = asArray("pain", answers);
  const goals = asArray("goal", answers);
  const details = asArray("serviceDetails", answers);
  const domains = computeDomainScores(answers);
  const isUnsure = services.includes("unsure");
  const noWebsite = a("websiteExists", answers) === "no" || a("websiteExists", answers) === "building";
  const localRelevant = a("localRelevance", answers) === "yes";
  const gbp = a("gbpStatus", answers);
  const industry = String(a("industry", answers) || "");

  const results: ServiceAffinityResult[] = [];

  for (const svc of serviceConfigs) {
    const reasonCodes: string[] = [];
    const evidence: string[] = [];
    let affinity = 0;
    let directInterestWeight = 0;
    let painMatchWeight = 0;
    let goalMatchWeight = 0;
    let maturityGapWeight = 0;
    let businessFitWeight = 0;
    let industryFitWeight = 0;

    /* Direct stated interest (25%) */
    if (services.includes(svc.id)) {
      directInterestWeight = 1;
      reasonCodes.push(`direct_interest_${svc.id}`);
      evidence.push(`Service interest expressed in initial selection.`);
    }
    if (details.includes(svc.id)) {
      directInterestWeight = Math.max(directInterestWeight, 1);
      reasonCodes.push(`detailed_interest_${svc.id}`);
      evidence.push(`Service selected in opportunity diagnosis.`);
    }
    if (isUnsure && svc.id === "lead-generation") {
      directInterestWeight = 0.5;
      reasonCodes.push("unsure_default");
    }

    /* Pain match (20%) */
    const painMatchCount = svc.relevantPains.filter((p) => pains.includes(p)).length;
    painMatchWeight = Math.min(1, painMatchCount * 0.4);
    if (painMatchWeight > 0) {
      reasonCodes.push(`pain_match_${svc.relevantPains.filter((p) => pains.includes(p)).join("_")}`);
      evidence.push(`Addresses identified business pain.`);
    }

    /* Goal alignment (18%) */
    const goalMatchCount = svc.relevantGoals.filter((g) => goals.includes(g)).length;
    goalMatchWeight = Math.min(1, goalMatchCount * 0.33);
    if (goalMatchWeight > 0) {
      reasonCodes.push(`goal_alignment_${svc.relevantGoals.filter((g) => goals.includes(g)).join("_")}`);
      evidence.push(`Aligns with stated business goal.`);
    }

    /* Maturity gap (15%) */
    for (const dom of svc.relevantDomains) {
      const ds = domains[dom];
      if (ds && ds.status === "assessed" && ds.score !== null && ds.score < 50) {
        maturityGapWeight = Math.max(maturityGapWeight, 0.7);
        reasonCodes.push(`maturity_gap_${dom}`);
        evidence.push(`${domainLabels[dom] || dom} has room for significant improvement.`);
      } else if (ds && (ds.status === "notAssessed" || ds.status === "insufficientEvidence")) {
        maturityGapWeight = Math.max(maturityGapWeight, 0.4);
        reasonCodes.push(`maturity_not_assessed_${dom}`);
      }
    }

    /* Business model fit (8%) */
    const model = String(a("businessModel", answers) || "");
    if (svc.id === "local-seo" && (model.includes("local") || localRelevant)) {
      businessFitWeight = 0.8;
      reasonCodes.push("local_business_model");
      evidence.push("Business serves local customers.");
    }
    if ((svc.id === "national-seo" || svc.id === "international-seo") && !model.includes("local")) {
      businessFitWeight = 0.6;
    }
    if (svc.id === "website-design" && noWebsite) {
      businessFitWeight = 0.9;
      reasonCodes.push("no_website_exists");
      evidence.push("No current website — new site required.");
    }
    if (svc.id === "crm-setup" && a("currentCrm", answers) === "none") {
      businessFitWeight = 0.7;
      reasonCodes.push("no_crm");
      evidence.push("No CRM currently in use.");
    }
    if (svc.id === "ai-automation" || svc.id === "reporting-automation") {
      const hours = String(a("manualHours", answers) || "");
      if (hours === "30+" || hours === "15-30") {
        businessFitWeight = 0.8;
        reasonCodes.push("high_manual_effort");
        evidence.push("Significant manual effort identified.");
      }
    }

    /* Industry fit (5%) */
    const industryMatch = svc.relevantDomains.some((d) => {
      if (d === "local" && ["legal", "healthcare", "dental", "home-services", "construction", "real-estate"].includes(industry)) return true;
      if (d === "seo" && ["saas", "ecommerce", "legal", "finance"].includes(industry)) return true;
      if (d === "automation" && ["saas", "ecommerce", "finance"].includes(industry)) return true;
      return false;
    });
    if (industryMatch) {
      industryFitWeight = 0.6;
    }

    affinity =
      directInterestWeight * 0.25 +
      painMatchWeight * 0.20 +
      goalMatchWeight * 0.18 +
      maturityGapWeight * 0.15 +
      businessFitWeight * 0.08 +
      industryFitWeight * 0.05;

    affinity = Math.round(affinity * 100);

    if (affinity > 0 || services.includes(svc.id)) {
      results.push({
        serviceId: svc.id,
        affinity,
        confidence: Math.min(1, 0.3 + affinity / 200),
        reasonCodes,
        evidence: evidence.length > 0 ? evidence : ["Not enough information to recommend this service."],
        dependency: svc.id === "local-seo" && gbp === "not-created" ? "Create and verify Google Business Profile" :
          svc.id === "website-design" ? "Define website requirements and goals" : undefined,
      });
    }
  }

  return results.sort((a, b) => b.affinity - a.affinity);
}

/* ═══════════════════════════════════════════
   Generate Recommendations
   ═══════════════════════════════════════════ */

export function generateRecommendations(answers: AssessmentAnswers): {
  primary: ServiceRecommendation[];
  secondary: ServiceRecommendation[];
} {
  const affinities = computeServiceAffinities(answers);
  const pains = asArray("pain", answers);
  const goals = asArray("goal", answers);

  const primary: ServiceRecommendation[] = [];
  const secondary: ServiceRecommendation[] = [];

  /* Sort by affinity descending */
  const sorted = [...affinities].sort((a, b) => b.affinity - a.affinity);

  /* Find services that directly address primary pain or goal */
  const painGoalDirect = sorted.filter((s) => {
    const cfg = serviceConfigs.find((c) => c.id === s.serviceId);
    if (!cfg) return false;
    return cfg.relevantPains.some((p) => pains.includes(p)) ||
      cfg.relevantGoals.some((g) => goals.includes(g));
  });

  /* Best direct match = primary #1 */
  const primaryPick = painGoalDirect.length > 0 ? painGoalDirect[0] : sorted[0];
  if (primaryPick && primaryPick.affinity >= 30) {
    primary.push({
      serviceId: primaryPick.serviceId,
      priority: "primary",
      affinity: primaryPick.affinity,
      confidence: primaryPick.confidence,
      reasonCodes: primaryPick.reasonCodes,
      evidence: primaryPick.evidence,
      dependency: primaryPick.dependency,
    });
  }

  /* Next best distinct */
  const usedIds = new Set(primary.map((p) => p.serviceId));
  const remaining = sorted.filter((s) => !usedIds.has(s.serviceId) && s.affinity >= 25);

  for (const r of remaining) {
    if (primary.length < 2) {
      primary.push({
        serviceId: r.serviceId,
        priority: "primary",
        affinity: r.affinity,
        confidence: r.confidence,
        reasonCodes: r.reasonCodes,
        evidence: r.evidence,
        dependency: r.dependency,
      });
      usedIds.add(r.serviceId);
    } else if (secondary.length < 3) {
      secondary.push({
        serviceId: r.serviceId,
        priority: "secondary",
        affinity: r.affinity,
        confidence: r.confidence,
        reasonCodes: r.reasonCodes,
        evidence: r.evidence,
      });
      usedIds.add(r.serviceId);
    }
  }

  /* Fallback: no primary found */
  if (primary.length === 0 && sorted.length > 0) {
    primary.push({
      serviceId: sorted[0].serviceId,
      priority: "primary",
      affinity: sorted[0].affinity,
      confidence: sorted[0].confidence,
      reasonCodes: sorted[0].reasonCodes,
      evidence: sorted[0].evidence,
    });
  }

  return { primary, secondary };
}

/* ═══════════════════════════════════════════
   Generate Roadmap
   ═══════════════════════════════════════════ */

export function generateRoadmap(recommendations: ServiceRecommendation[], answers: AssessmentAnswers): RoadmapPhase[] {
  const phases: RoadmapPhase[] = [];
  const serviceIds = recommendations.map((r) => r.serviceId);

  const immediateItems: string[] = [];
  const first30: string[] = [];
  const days31to90: string[] = [];
  const beyond: string[] = [];

  for (const id of serviceIds) {
    switch (id) {
      case "website-design":
      case "website-redesign":
        immediateItems.push("Define website requirements, sitemap, and content structure.");
        first30.push("Design and develop core website pages.");
        days31to90.push("Launch website and begin optimisation.");
        break;
      case "local-seo":
        immediateItems.push("Create and verify Google Business Profile.");
        first30.push("Optimise GBP with complete business information and categories.");
        days31to90.push("Build local citations and earn initial reviews.");
        break;
      case "technical-seo":
        immediateItems.push("Run technical SEO audit.");
        first30.push("Resolve priority technical issues (crawl, index, speed).");
        days31to90.push("Implement structured data and core web vitals improvements.");
        break;
      case "ai-search-geo":
        immediateItems.push("Audit current AI search presence across platforms.");
        first30.push("Build entity signals and structured data.");
        days31to90.push("Publish expert-led content optimised for AI search.");
        break;
      case "content-strategy":
        immediateItems.push("Audit existing content and identify gaps.");
        first30.push("Develop content plan aligned with search and AI goals.");
        days31to90.push("Begin publishing consistent, high-value content.");
        break;
      case "lead-generation":
        immediateItems.push("Set up lead tracking and conversion goals.");
        first30.push("Optimise key conversion paths and landing pages.");
        days31to90.push("Scale lead generation channels.");
        break;
      case "crm-setup":
        immediateItems.push("Define CRM requirements and workflow.");
        first30.push("Configure CRM and import existing contacts.");
        days31to90.push("Set up automation rules and team workflows.");
        break;
      case "ai-automation":
      case "reporting-automation":
        immediateItems.push("Audit current manual processes and tools.");
        first30.push("Build automated workflows for priority tasks.");
        days31to90.push("Integrate systems and set up reporting dashboards.");
        break;
      default:
        if (immediateItems.length < 2) immediateItems.push(`Prepare ${id.replace(/-/g, " ")} strategy.`);
        break;
    }
  }

  if (immediateItems.length > 0) phases.push({ phase: "Immediate Foundations", items: immediateItems });
  if (first30.length > 0) phases.push({ phase: "First 30 Days", items: first30 });
  if (days31to90.length > 0) phases.push({ phase: "Days 31–90", items: days31to90 });
  if (beyond.length > 0) phases.push({ phase: "Month 4 and Beyond", items: beyond });

  return phases;
}

/* ═══════════════════════════════════════════
   Generate Report
   ═══════════════════════════════════════════ */

export function generateReport(answers: AssessmentAnswers): GrowthOpportunityReport {
  const domainScores = computeDomainScores(answers);
  const oppScore = computeOpportunityScore(answers);
  const { primary, secondary } = generateRecommendations(answers);
  const roadmap = generateRoadmap([...primary, ...secondary], answers);

  /* Strengths and gaps from domains */
  const strengths: ReportFinding[] = [];
  const gaps: ReportFinding[] = [];

  for (const [domain, ds] of Object.entries(domainScores)) {
    if (ds.status !== "assessed" || ds.score === null) continue;
    if (ds.score >= 60) {
      strengths.push({
        title: domainLabels[domain] || domain,
        status: "strength",
        evidence: ds.strengths.length > 0 ? ds.strengths : [`${domainLabels[domain] || domain} appears established.`],
        implication: `This area is a current strength.`,
        confidence: getConfidenceLabel(ds.confidence),
      });
    }
    if (ds.score < 40 || ds.gaps.length > 0) {
      gaps.push({
        title: domainLabels[domain] || domain,
        status: "priority_gap",
        evidence: ds.gaps.length > 0 ? ds.gaps : [`${domainLabels[domain] || domain} needs improvement.`],
        implication: `Improving this area could create significant business impact.`,
        confidence: getConfidenceLabel(ds.confidence),
        suggestedAction: `Review and strengthen ${domainLabels[domain]?.toLowerCase() || domain}.`,
      });
    }
  }

  /* Assessed vs not-assessed domains */
  const assessedDomains = Object.entries(domainScores)
    .filter(([_, d]) => d.status === "assessed" || d.status === "notApplicable")
    .map(([_, d]) => d);

  /* Evidence summary */
  const evidenceSummary: string[] = [];
  for (const rec of [...primary, ...secondary]) {
    evidenceSummary.push(...rec.evidence);
  }
  for (const g of gaps) {
    evidenceSummary.push(...g.evidence);
  }

  /* Next best action */
  const pain = asArray("pain", answers);
  const nextAction = primary[0]
    ? `We recommend starting with ${primary[0].serviceId.replace(/-/g, " ")}. Book a discovery session to discuss next steps.`
    : pain.length > 0
      ? "Book a 30-minute discovery session to discuss your needs."
      : "Complete the assessment to receive personalised recommendations.";

  return {
    reportVersion: "2.0",
    businessSnapshot: {
      company: a("companyName", answers) || "Not provided",
      industry: a("industry", answers) || "Not provided",
      websiteStatus: a("websiteExists", answers) === "yes" ? "Exists" : 
        a("websiteExists", answers) === "no" ? "No current website" : "Building",
    },
    userGoal: String(a("goal", answers) || ""),
    primaryPain: asArray("pain", answers).join(", ") || "Not identified",
    opportunityScore: oppScore.score,
    opportunityLabel: oppScore.label,
    confidenceLabel: getConfidenceLabel(oppScore.confidence),
    assessedDomains,
    strengths,
    priorityGaps: gaps,
    primaryRecommendations: primary,
    secondaryRecommendations: secondary,
    roadmap,
    estimatedScope: computeScopeEstimate(primary, answers),
    expectedTimeline: computeTimeline(primary, answers),
    nextBestAction: nextAction,
    evidenceSummary: [...new Set(evidenceSummary)],
  };
}

function computeScopeEstimate(recommendations: ServiceRecommendation[], answers: AssessmentAnswers): string | null {
  if (recommendations.length === 0) return null;

  const hasBudget = a("budget", answers) && String(a("budget", answers)) !== "undisclosed" && String(a("budget", answers)) !== "guidance";
  const hasSize = a("teamSize", answers);
  const hasTimeline = a("startTimeline", answers);

  if (!hasBudget || !hasSize || !hasTimeline) {
    return "Scope requires review — more information needed.";
  }

  if (recommendations.length <= 2) return "Investment range will be confirmed after discovery call.";
  return "Multi-service engagement — scope and investment confirmed after strategy session.";
}

function computeTimeline(recommendations: ServiceRecommendation[], answers: AssessmentAnswers): string | null {
  if (recommendations.length === 0) return null;

  const urg = String(a("urgency", answers) || "");
  const start = String(a("startTimeline", answers) || "");

  const urgency = urgencyValue[urg] || 3;
  const startup = start === "today" || start === "week" ? "immediate" : "scheduled";

  if (recommendations.length >= 4) return "Phased multi-service transformation — typically 6–12 months.";
  if (recommendations.length >= 2) return "Typically 3–6 months for initial results.";
  return startup === "immediate" ? "Foundation work can begin within 2–4 weeks." : "Timeline confirmed after strategy session.";
}
