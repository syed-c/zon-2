"use client";

export interface QuestionOption {
  label: string;
  value: string;
  icon?: string;
  score?: Partial<ScoreDelta>;
}

export interface ScoreDelta {
  intentScore: number;
  authorityScore: number;
  urgencyScore: number;
  budgetScore: number;
  businessSize: number;
  websiteMaturity: number;
  seoMaturity: number;
  aiReadiness: number;
  revenueOpportunity: number;
}

export interface StepQuestion {
  id: string;
  headline: string;
  subtext: string;
  type: "cards" | "multi-cards" | "dropdown" | "slider" | "input" | "multi-select" | "toggle";
  options?: QuestionOption[];
  condition?: (answers: any) => boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  showIf?: { stepId: string; value: string | string[] };
}

export interface StepConfig {
  id: number;
  title: string;
  subtitle: string;
  questions: StepQuestion[];
}

const steps: StepConfig[] = [
  {
    id: 1,
    title: "Intent Detection",
    subtitle: "What brings you here today?",
    questions: [
      {
        id: "services",
        headline: "What do you need help with?",
        subtext: "Choose everything that applies to you.",
        type: "multi-cards",
        options: [
          { label: "SEO Growth", value: "seo", score: { intentScore: 10, seoMaturity: 2 } },
          { label: "AI Search / GEO", value: "geo", score: { intentScore: 15, aiReadiness: 3 } },
          { label: "Website Redesign", value: "website", score: { intentScore: 8, websiteMaturity: 4 } },
          { label: "Lead Generation", value: "leads", score: { intentScore: 12, revenueOpportunity: 3 } },
          { label: "Google Ads", value: "ads", score: { intentScore: 8, budgetScore: 4 } },
          { label: "Social Media", value: "social", score: { intentScore: 5 } },
          { label: "AI Automation", value: "automation", score: { intentScore: 15, authorityScore: 3 } },
          { label: "Custom CRM", value: "crm", score: { intentScore: 12, authorityScore: 4 } },
          { label: "Branding", value: "branding", score: { intentScore: 5, authorityScore: 2 } },
          { label: "Content Marketing", value: "content", score: { intentScore: 8, seoMaturity: 2 } },
          { label: "Not Sure", value: "unsure", score: { intentScore: 0 } },
        ],
      },
      {
        id: "businessType",
        headline: "What best describes you?",
        subtext: "This helps us tailor the experience.",
        type: "cards",
        options: [
          { label: "Business Owner", value: "owner", score: { authorityScore: 5 } },
          { label: "Marketing Manager", value: "marketing", score: { authorityScore: 3 } },
          { label: "Startup Founder", value: "startup", score: { authorityScore: 2, urgencyScore: 3 } },
          { label: "Agency Partner", value: "agency", score: { authorityScore: 4, websiteMaturity: 2 } },
          { label: "Freelancer", value: "freelancer", score: { authorityScore: 1 } },
          { label: "Enterprise Executive", value: "enterprise", score: { authorityScore: 8, budgetScore: 8 } },
          { label: "Non-profit", value: "nonprofit", score: { authorityScore: 2 } },
        ],
      },
      {
        id: "source",
        headline: "How did you hear about us?",
        subtext: "This helps us understand what's working.",
        type: "dropdown",
        options: [
          { label: "Google Search", value: "google", score: { intentScore: 3 } },
          { label: "ChatGPT / AI", value: "chatgpt", score: { intentScore: 5 } },
          { label: "LinkedIn", value: "linkedin", score: { intentScore: 2 } },
          { label: "Instagram", value: "instagram", score: { intentScore: 1 } },
          { label: "Referral", value: "referral", score: { intentScore: 5, urgencyScore: 3 } },
          { label: "YouTube", value: "youtube", score: { intentScore: 2 } },
          { label: "Advertisement", value: "ad", score: { intentScore: 1 } },
          { label: "Other", value: "other", score: { intentScore: 1 } },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Business Intelligence",
    subtitle: "Tell us about your business.",
    questions: [
      {
        id: "companyName",
        headline: "What's your company name?",
        subtext: "We'll use this to look up your online presence.",
        type: "input",
        placeholder: "Acme Inc.",
      },
      {
        id: "website",
        headline: "Do you have a website?",
        subtext: "We can analyse it for growth opportunities.",
        type: "cards",
        options: [
          { label: "Yes, I have a website", value: "yes", score: { websiteMaturity: 3 } },
          { label: "Not yet", value: "no", score: { websiteMaturity: -5 } },
          { label: "Building one now", value: "building", score: { websiteMaturity: 1 } },
        ],
      },
      {
        id: "websiteUrl",
        headline: "What's your website URL?",
        subtext: "We'll scan it for opportunities automatically.",
        type: "input",
        placeholder: "acme.com",
        showIf: { stepId: "website", value: "yes" },
      },
      {
        id: "industry",
        headline: "What industry are you in?",
        subtext: "We'll tailor recommendations to your market.",
        type: "cards",
        options: [
          { label: "Legal", value: "legal", score: { seoMaturity: 2, authorityScore: 3 } },
          { label: "Healthcare", value: "healthcare", score: { seoMaturity: 2 } },
          { label: "Construction", value: "construction", score: { seoMaturity: 1 } },
          { label: "Real Estate", value: "real-estate", score: { seoMaturity: 2 } },
          { label: "Fitness", value: "fitness", score: { seoMaturity: 1 } },
          { label: "Finance", value: "finance", score: { authorityScore: 4 } },
          { label: "Education", value: "education", score: { seoMaturity: 2 } },
          { label: "E-commerce", value: "ecommerce", score: { budgetScore: 3, websiteMaturity: 3 } },
          { label: "Restaurant", value: "restaurant", score: { seoMaturity: 1 } },
          { label: "SaaS", value: "saas", score: { budgetScore: 5, authorityScore: 3 } },
          { label: "Manufacturing", value: "manufacturing", score: { budgetScore: 4 } },
          { label: "Other", value: "other" },
        ],
      },
      {
        id: "businessSize",
        headline: "How many employees?",
        subtext: "This helps us recommend the right engagement size.",
        type: "cards",
        options: [
          { label: "Solo", value: "solo", score: { businessSize: 1 } },
          { label: "2-10", value: "small", score: { businessSize: 2 } },
          { label: "11-25", value: "medium", score: { businessSize: 3 } },
          { label: "26-50", value: "large-small", score: { businessSize: 4 } },
          { label: "51-200", value: "large", score: { businessSize: 6, budgetScore: 3 } },
          { label: "200+", value: "enterprise", score: { businessSize: 10, budgetScore: 5 } },
        ],
      },
      {
        id: "revenue",
        headline: "Monthly revenue (optional)",
        subtext: "Used to estimate project scope, not pricing.",
        type: "cards",
        options: [
          { label: "Under $10k", value: "under-10k", score: { budgetScore: 1 } },
          { label: "$10k-$50k", value: "10k-50k", score: { budgetScore: 2 } },
          { label: "$50k-$100k", value: "50k-100k", score: { budgetScore: 4 } },
          { label: "$100k-$500k", value: "100k-500k", score: { budgetScore: 6 } },
          { label: "$500k+", value: "500k-plus", score: { budgetScore: 10 } },
          { label: "Prefer not to say", value: "undisclosed" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Current Digital Presence",
    subtitle: "Let's understand where you are today.",
    questions: [
      {
        id: "currentSeo",
        headline: "Do you currently invest in SEO?",
        subtext: "Understanding your current approach helps us find gaps.",
        type: "cards",
        options: [
          { label: "No, nothing", value: "none", score: { seoMaturity: -3, revenueOpportunity: 4 } },
          { label: "In-house team", value: "inhouse", score: { seoMaturity: 5 } },
          { label: "Working with an agency", value: "agency", score: { seoMaturity: 4 } },
          { label: "Freelancer", value: "freelancer", score: { seoMaturity: 3 } },
          { label: "Not sure", value: "unsure", score: { seoMaturity: -2 } },
        ],
        showIf: { stepId: "services", value: ["seo", "geo", "content", "leads"] },
      },
      {
        id: "satisfaction",
        headline: "How satisfied are you with your current results?",
        subtext: "1 = Terrible, 10 = Absolutely crushing it.",
        type: "slider",
        min: 1,
        max: 10,
      },
      {
        id: "websiteAge",
        headline: "How old is your website?",
        subtext: "Age affects technical debt and SEO authority.",
        type: "cards",
        options: [
          { label: "Less than 1 year", value: "<1", score: { websiteMaturity: 1 } },
          { label: "1-3 years", value: "1-3", score: { websiteMaturity: 3 } },
          { label: "3-5 years", value: "3-5", score: { websiteMaturity: 4 } },
          { label: "5+ years", value: "5+", score: { websiteMaturity: 6 } },
          { label: "No website", value: "none", score: { websiteMaturity: -5 } },
        ],
      },
      {
        id: "traffic",
        headline: "Monthly website visitors?",
        subtext: "An estimate is fine.",
        type: "cards",
        options: [
          { label: "No idea", value: "unknown", score: { websiteMaturity: -2 } },
          { label: "0-500", value: "0-500", score: { websiteMaturity: 1 } },
          { label: "500-5k", value: "500-5k", score: { websiteMaturity: 3 } },
          { label: "5k-20k", value: "5k-20k", score: { websiteMaturity: 5, budgetScore: 2 } },
          { label: "20k+", value: "20k+", score: { websiteMaturity: 8, budgetScore: 3 } },
        ],
      },
      {
        id: "leads",
        headline: "How many leads do you generate per month?",
        subtext: "This helps us benchmark your current funnel.",
        type: "cards",
        options: [
          { label: "0-5", value: "0-5", score: { revenueOpportunity: 5 } },
          { label: "5-20", value: "5-20", score: { revenueOpportunity: 3 } },
          { label: "20-50", value: "20-50", score: { revenueOpportunity: 2 } },
          { label: "50+", value: "50+", score: { revenueOpportunity: 1 } },
        ],
      },
      {
        id: "aiSearchChecked",
        headline: "Have you checked if ChatGPT recommends your business?",
        subtext: "AI search is the fastest growing discovery channel.",
        type: "cards",
        options: [
          { label: "Yes, we appear", value: "yes-appear", score: { aiReadiness: 5 } },
          { label: "Yes, we don't appear", value: "yes-not", score: { aiReadiness: 1, revenueOpportunity: 5 } },
          { label: "No, never checked", value: "no", score: { aiReadiness: -3, revenueOpportunity: 4 } },
          { label: "Didn't know this existed", value: "unaware", score: { aiReadiness: -5, revenueOpportunity: 5 } },
        ],
      },
      {
        id: "gbpVerified",
        headline: "Is your Google Business Profile verified?",
        subtext: "Critical for local search visibility.",
        type: "cards",
        options: [
          { label: "Yes, verified", value: "yes", score: { seoMaturity: 3 } },
          { label: "No, not yet", value: "no", score: { seoMaturity: -2 } },
          { label: "Not applicable", value: "na" },
        ],
      },
      {
        id: "reviewCount",
        headline: "How many Google reviews do you have?",
        subtext: "Reviews influence local ranking and trust.",
        type: "cards",
        options: [
          { label: "0", value: "0", score: { authorityScore: -2 } },
          { label: "1-10", value: "1-10", score: { authorityScore: 1 } },
          { label: "10-50", value: "10-50", score: { authorityScore: 3 } },
          { label: "50+", value: "50+", score: { authorityScore: 5 } },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Pain Discovery",
    subtitle: "What's holding your business back?",
    questions: [
      {
        id: "challenges",
        headline: "What's your biggest challenge?",
        subtext: "Choose every problem that applies.",
        type: "multi-cards",
        options: [
          { label: "No rankings", value: "rankings", score: { urgencyScore: 4, seoMaturity: -2 } },
          { label: "No leads", value: "leads", score: { urgencyScore: 5, revenueOpportunity: 4 } },
          { label: "Website slow", value: "speed", score: { urgencyScore: 3, websiteMaturity: -3 } },
          { label: "Low conversions", value: "conversions", score: { urgencyScore: 4, revenueOpportunity: 3 } },
          { label: "High ad costs", value: "ad-costs", score: { urgencyScore: 3, budgetScore: 2 } },
          { label: "Poor branding", value: "branding", score: { authorityScore: -3 } },
          { label: "Can't scale", value: "scale", score: { urgencyScore: 4, businessSize: 2 } },
          { label: "Manual work", value: "manual", score: { urgencyScore: 3, revenueOpportunity: 3 } },
          { label: "AI visibility", value: "ai", score: { urgencyScore: 4, aiReadiness: -3 } },
          { label: "Not sure", value: "unsure" },
        ],
      },
      {
        id: "goal",
        headline: "What's your primary business goal?",
        subtext: "We'll align recommendations to this.",
        type: "cards",
        options: [
          { label: "More Leads", value: "leads", score: { intentScore: 5, urgencyScore: 3 } },
          { label: "More Sales", value: "sales", score: { intentScore: 6, urgencyScore: 4 } },
          { label: "Automation", value: "automation", score: { intentScore: 4 } },
          { label: "Growth", value: "growth", score: { intentScore: 5 } },
          { label: "Expansion", value: "expansion", score: { businessSize: 3 } },
          { label: "Brand Authority", value: "authority", score: { authorityScore: 5 } },
          { label: "Local Visibility", value: "local", score: { seoMaturity: 2 } },
          { label: "International", value: "international", score: { businessSize: 4 } },
        ],
      },
      {
        id: "urgency",
        headline: "When do you want to start seeing results?",
        subtext: "This helps us prioritise the right approach.",
        type: "cards",
        options: [
          { label: "Immediately", value: "immediate", score: { urgencyScore: 10 } },
          { label: "Within 2 weeks", value: "2-weeks", score: { urgencyScore: 7 } },
          { label: "Within a month", value: "month", score: { urgencyScore: 5 } },
          { label: "Just researching", value: "researching", score: { urgencyScore: 1 } },
        ],
      },
      {
        id: "blocker",
        headline: "What's stopping you from moving forward today?",
        subtext: "We've helped others with the same obstacles.",
        type: "cards",
        options: [
          { label: "Budget", value: "budget", score: { budgetScore: -3 } },
          { label: "Time", value: "time", score: { urgencyScore: 2 } },
          { label: "Knowledge", value: "knowledge", score: { intentScore: 2 } },
          { label: "Current Agency", value: "agency", score: { urgencyScore: 3 } },
          { label: "Internal Team", value: "team" },
          { label: "Need Approval", value: "approval", score: { authorityScore: -3, urgencyScore: -2 } },
          { label: "Other", value: "other" },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Opportunity Discovery",
    subtitle: "Let's identify every growth lever available.",
    questions: [
      {
        id: "serviceDetails",
        headline: "What specific areas interest you?",
        subtext: "Select everything you'd like to explore.",
        type: "multi-cards",
        options: [
          { label: "Local SEO", value: "local-seo", score: { seoMaturity: 2 } },
          { label: "National SEO", value: "national-seo", score: { seoMaturity: 2 } },
          { label: "International SEO", value: "international-seo", score: { businessSize: 3 } },
          { label: "AI Search Optimization", value: "geo", score: { aiReadiness: 3 } },
          { label: "Technical SEO", value: "technical-seo", score: { seoMaturity: 3 } },
          { label: "Content Strategy", value: "content", score: { seoMaturity: 2 } },
          { label: "Link Building", value: "backlinks", score: { seoMaturity: 2 } },
          { label: "Programmatic SEO", value: "programmatic", score: { websiteMaturity: 3 } },
          { label: "CRM Setup", value: "crm", score: { revenueOpportunity: 3 } },
          { label: "AI Chatbot", value: "chatbot", score: { aiReadiness: 3 } },
          { label: "Workflow Automation", value: "workflow", score: { revenueOpportunity: 3 } },
          { label: "Custom Development", value: "development", score: { budgetScore: 4 } },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Qualification",
    subtitle: "A few practical questions to prepare your strategy.",
    questions: [
      {
        id: "budget",
        headline: "What's your monthly marketing budget?",
        subtext: "This helps us scope the right engagement. Confidential.",
        type: "cards",
        options: [
          { label: "Under $1,000", value: "under-1k", score: { budgetScore: 1 } },
          { label: "$1,000-$3,000", value: "1k-3k", score: { budgetScore: 3 } },
          { label: "$3,000-$5,000", value: "3k-5k", score: { budgetScore: 5 } },
          { label: "$5,000-$10,000", value: "5k-10k", score: { budgetScore: 7 } },
          { label: "$10,000+", value: "10k-plus", score: { budgetScore: 10 } },
        ],
      },
      {
        id: "decisionMaker",
        headline: "Are you the decision maker?",
        subtext: "We'll tailor our follow-up accordingly.",
        type: "cards",
        options: [
          { label: "Yes, I decide", value: "yes", score: { authorityScore: 5 } },
          { label: "I need approval", value: "approval", score: { authorityScore: -3 } },
          { label: "Just researching", value: "research", score: { authorityScore: -5, urgencyScore: -3 } },
        ],
      },
      {
        id: "timeline",
        headline: "When would you like to start?",
        subtext: "We'll align our availability.",
        type: "cards",
        options: [
          { label: "Today", value: "today", score: { urgencyScore: 10 } },
          { label: "This Week", value: "week", score: { urgencyScore: 8 } },
          { label: "This Month", value: "month", score: { urgencyScore: 5 } },
          { label: "In 3 Months", value: "3-months", score: { urgencyScore: 2 } },
          { label: "Not sure yet", value: "unsure", score: { urgencyScore: 0 } },
        ],
      },
      {
        id: "preferredContact",
        headline: "How should we reach you?",
        subtext: "Your preferred communication channel.",
        type: "cards",
        options: [
          { label: "Email", value: "email" },
          { label: "WhatsApp", value: "whatsapp" },
          { label: "Phone", value: "phone" },
          { label: "Google Meet", value: "meet" },
          { label: "Zoom", value: "zoom" },
        ],
      },
      {
        id: "bestTime",
        headline: "Best time to connect?",
        subtext: "We'll schedule around you.",
        type: "cards",
        options: [
          { label: "Morning", value: "morning" },
          { label: "Afternoon", value: "afternoon" },
          { label: "Evening", value: "evening" },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Your Assessment",
    subtitle: "One last step — then we'll build your growth report.",
    questions: [
      {
        id: "name",
        headline: "What's your name?",
        subtext: "So we can personalise your report.",
        type: "input",
        placeholder: "Your full name",
      },
      {
        id: "email",
        headline: "Your email address",
        subtext: "Where we'll send your Growth Report.",
        type: "input",
        placeholder: "you@company.com",
      },
      {
        id: "phone",
        headline: "Phone number (optional)",
        subtext: "For a faster follow-up if you prefer.",
        type: "input",
        placeholder: "+1 (555) 000-0000",
      },
      {
        id: "country",
        headline: "Where are you based?",
        subtext: "We operate globally.",
        type: "input",
        placeholder: "United Kingdom",
      },
    ],
  },
];

export default steps;

export function calculateScores(answers: Record<string, any>): Record<string, number> {
  const scores: Record<string, number> = {
    intentScore: 0,
    authorityScore: 0,
    urgencyScore: 0,
    budgetScore: 0,
    businessSize: 0,
    websiteMaturity: 0,
    seoMaturity: 0,
    aiReadiness: 0,
    revenueOpportunity: 0,
  };

  const accumulate = (value: any, score?: Partial<ScoreDelta>) => {
    if (!score) return;
    for (const [key, val] of Object.entries(score)) {
      if (key in scores && typeof val === "number") {
        scores[key] += val;
      }
    }
  };

  const processField = (fieldId: string, value: any, options?: QuestionOption[]) => {
    if (!value || !options) return;
    if (Array.isArray(value)) {
      value.forEach((v: string) => {
        const opt = options.find((o) => o.value === v);
        if (opt) accumulate(v, opt.score);
      });
    } else {
      const opt = options.find((o) => o.value === value);
      if (opt) accumulate(value, opt.score);
    }
  };

  for (const step of steps) {
    for (const q of step.questions) {
      const val = answers[q.id];
      if (val !== undefined && val !== null && val !== "") {
        processField(q.id, val, q.options);
      }
    }
  }

  return scores;
}

export function getTotalScore(scores: Record<string, number>): number {
  const weights: Record<string, number> = {
    intentScore: 0.2,
    authorityScore: 0.15,
    urgencyScore: 0.2,
    budgetScore: 0.2,
    businessSize: 0.1,
    websiteMaturity: 0.05,
    seoMaturity: 0.05,
    aiReadiness: 0.05,
  };

  let total = 0;
  let maxPossible = 0;
  for (const [key, weight] of Object.entries(weights)) {
    const val = scores[key] || 0;
    total += Math.min(Math.max(val, 0), 100) * weight;
    maxPossible += 100 * weight;
  }

  return maxPossible > 0 ? Math.round((total / maxPossible) * 100) : 0;
}

export function getTemperature(score: number): { label: string; color: string } {
  if (score >= 90) return { label: "Platinum", color: "#E5C07B" };
  if (score >= 75) return { label: "Hot", color: "#D4A849" };
  if (score >= 55) return { label: "Warm", color: "#98C379" };
  if (score >= 35) return { label: "Cold", color: "#61AFEF" };
  return { label: "Nurture", color: "#8A8480" };
}

export function generateRecommendations(scores: Record<string, number>, answers: Record<string, any>): string[] {
  const recs: string[] = [];
  const services = Array.isArray(answers.services) ? answers.services : [];
  const challenges = Array.isArray(answers.challenges) ? answers.challenges : [];

  if (scores.seoMaturity < 10 || services.includes("seo") || challenges.includes("rankings")) {
    recs.push("Technical SEO");
  }
  if (scores.aiReadiness < 5 || services.includes("geo") || challenges.includes("ai")) {
    recs.push("AI Search Optimization");
  }
  if (scores.websiteMaturity < 5 || services.includes("website")) {
    recs.push("Website Performance");
  }
  if (scores.revenueOpportunity > 5 || services.includes("leads") || challenges.includes("leads") || challenges.includes("conversions")) {
    recs.push("Lead Generation Optimization");
  }
  if (services.includes("automation") || challenges.includes("manual") || challenges.includes("scale")) {
    recs.push("Workflow Automation");
  }
  if (services.includes("crm")) {
    recs.push("Custom CRM Development");
  }
  if (services.includes("ads") || challenges.includes("ad-costs")) {
    recs.push("Paid Media");
  }
  if (services.includes("content")) {
    recs.push("Content Strategy");
  }

  return recs;
}

export function estimateTimeline(recommendations: string[]): string {
  const count = recommendations.length;
  if (count <= 2) return "2-3 months";
  if (count <= 4) return "3-6 months";
  return "6-12 months";
}

export function estimateProjectValue(recommendations: string[], budgetScore: number): string {
  const base = recommendations.length * 2000;
  const multiplier = Math.max(1, budgetScore / 3);
  const total = Math.round(base * multiplier);
  if (total < 3000) return "$2,000-$5,000";
  if (total < 8000) return "$5,000-$8,000";
  if (total < 15000) return "$8,000-$15,000";
  return "$15,000+";
}
