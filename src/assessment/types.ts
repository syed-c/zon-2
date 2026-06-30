export type AssessmentDomain =
  | "intent" | "company" | "website" | "newWebsite" | "seo" | "geo"
  | "local" | "leadGeneration" | "cro" | "paidMedia" | "social"
  | "automation" | "crm" | "branding" | "content"
  | "qualification" | "contact";

export type QuestionType =
  | "singleSelect" | "multiSelect" | "text" | "email" | "phone"
  | "url" | "number" | "currency" | "slider" | "boolean";

export interface Condition {
  operator: "equals" | "notEquals" | "includes" | "includesAny" | "includesAll"
    | "exists" | "greaterThan" | "lessThan" | "and" | "or" | "not";
  field?: string;
  value?: unknown;
  values?: unknown[];
  conditions?: Condition[];
  condition?: Condition;
}

export interface ScoringEffect {
  dimension: string;
  points: number;
}

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  value: string | number | boolean;
  scoringEffects?: ScoringEffect[];
  tags?: string[];
  exclusive?: boolean;
}

export interface QuestionNode {
  id: string;
  macroStage: number;
  domain: AssessmentDomain;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  allowSkip?: boolean;
  skipLabel?: string;
  options?: QuestionOption[];
  showWhen?: Condition;
  validate?: (value: unknown, answers: Record<string, unknown>) => string | null;
  scoringConfig?: {
    dimension: string;
    weight: number;
    optionsScore?: Record<string, number>;
  };
  invalidatesOnChange?: string[];
  estimatedSeconds: number;
  analyticsKey: string;
}

export interface DomainScore {
  status: "notApplicable" | "notAssessed" | "insufficientEvidence" | "assessed";
  score: number | null;
  confidence: number;
  evidence: string[];
  strengths: string[];
  gaps: string[];
}

export interface ServiceRecommendation {
  serviceId: string;
  priority: "primary" | "secondary" | "future";
  affinity: number;
  confidence: number;
  reasonCodes: string[];
  evidence: string[];
  dependency?: string;
}

export interface ReportFinding {
  title: string;
  status: "strength" | "priority_gap" | "opportunity";
  evidence: string[];
  implication: string;
  confidence: "early" | "moderate" | "strong";
  suggestedAction?: string;
}

export interface RoadmapPhase {
  phase: string;
  items: string[];
}

export interface GrowthOpportunityReport {
  reportVersion: string;
  businessSnapshot: Record<string, unknown>;
  userGoal: string;
  primaryPain: string;
  opportunityScore: number;
  opportunityLabel: string;
  confidenceLabel: string;
  assessedDomains: DomainScore[];
  strengths: ReportFinding[];
  priorityGaps: ReportFinding[];
  primaryRecommendations: ServiceRecommendation[];
  secondaryRecommendations: ServiceRecommendation[];
  roadmap: RoadmapPhase[];
  estimatedScope: string | null;
  expectedTimeline: string | null;
  nextBestAction: string;
  evidenceSummary: string[];
}

export interface AssessmentAnswers {
  [key: string]: unknown;
}
