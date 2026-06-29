export interface ServiceItem {
  name: string;
  slug: string;
}

export interface PillarData {
  name: string;
  slug: string;
  services: ServiceItem[];
}

export const pillars: PillarData[] = [
  {
    name: "Search & Organic Growth",
    slug: "search-organic-growth",
    services: [
      { name: "SEO Strategy", slug: "seo-strategy" },
      { name: "Technical SEO", slug: "technical-seo" },
      { name: "On-Page SEO", slug: "on-page-seo" },
      { name: "Off-Page SEO", slug: "off-page-seo" },
      { name: "SEO Auditing", slug: "seo-auditing" },
      { name: "SEO Consulting", slug: "seo-consulting" },
      { name: "Keyword Research", slug: "keyword-research" },
      { name: "Content Strategy", slug: "content-strategy" },
      { name: "Content Development", slug: "content-development" },
      { name: "Local SEO", slug: "local-seo" },
      { name: "E-commerce SEO", slug: "ecommerce-seo" },
      { name: "Enterprise SEO", slug: "enterprise-seo" },
      { name: "International SEO", slug: "international-seo" },
      { name: "Website Migration SEO", slug: "website-migration-seo" },
      { name: "Digital PR for Search", slug: "digital-pr-search" },
      { name: "Search Reporting", slug: "search-reporting" },
    ],
  },
  {
    name: "GEO & AI Search Visibility",
    slug: "geo-ai-search",
    services: [
      { name: "Generative Engine Optimisation", slug: "generative-engine-optimisation" },
      { name: "Answer Engine Optimisation", slug: "answer-engine-optimisation" },
      { name: "AI Search Visibility Audits", slug: "ai-search-visibility-audit" },
      { name: "Entity Optimisation", slug: "entity-optimisation" },
      { name: "Brand Citation Readiness", slug: "brand-citation-readiness" },
      { name: "Structured Content Planning", slug: "structured-content-planning" },
      { name: "Knowledge Graph Support", slug: "knowledge-graph-support" },
      { name: "AI-Friendly Content Architecture", slug: "ai-friendly-content-architecture" },
      { name: "Brand Mention Development", slug: "brand-mention-development" },
      { name: "AI Search Monitoring", slug: "ai-search-monitoring" },
      { name: "AI Overview Readiness", slug: "ai-overview-readiness" },
      { name: "LLM Content Testing", slug: "llm-content-testing" },
    ],
  },
  {
    name: "PR & Brand Authority",
    slug: "digital-pr",
    services: [
      { name: "Digital PR", slug: "digital-pr" },
      { name: "Press Release Strategy", slug: "press-release-strategy" },
      { name: "Media Outreach", slug: "media-outreach" },
      { name: "Journalist Research", slug: "journalist-research" },
      { name: "Founder Positioning", slug: "founder-positioning" },
      { name: "Thought Leadership", slug: "thought-leadership" },
      { name: "Brand Mentions", slug: "brand-mentions" },
      { name: "Link-Earning Campaigns", slug: "link-earning-campaigns" },
      { name: "Reputation Management", slug: "reputation-management" },
      { name: "Crisis Communication Support", slug: "crisis-communication" },
      { name: "Awards and Profile Support", slug: "awards-profile-support" },
      { name: "PR Measurement", slug: "pr-measurement" },
    ],
  },
  {
    name: "Paid Media & Performance",
    slug: "paid-media",
    services: [
      { name: "Google Ads", slug: "google-ads" },
      { name: "PPC Management", slug: "ppc-management" },
      { name: "Search Advertising", slug: "search-advertising" },
      { name: "Display Advertising", slug: "display-advertising" },
      { name: "Remarketing", slug: "remarketing" },
      { name: "Paid Social", slug: "paid-social" },
      { name: "Media Planning", slug: "media-planning" },
      { name: "Landing Page Optimisation", slug: "landing-page-optimisation" },
      { name: "Conversion Tracking", slug: "conversion-tracking-paid" },
      { name: "Campaign Auditing", slug: "campaign-auditing" },
      { name: "Budget Planning", slug: "budget-planning-paid" },
      { name: "Creative Testing", slug: "creative-testing" },
    ],
  },
  {
    name: "Social, Content & Creative",
    slug: "social-content",
    services: [
      { name: "Social Media Strategy", slug: "social-media-strategy" },
      { name: "Social Media Management", slug: "social-media-management" },
      { name: "Social Campaigns", slug: "social-campaigns" },
      { name: "Content Production", slug: "content-production" },
      { name: "Social Content", slug: "social-content" },
      { name: "Video and Motion", slug: "video-motion" },
      { name: "Email Marketing", slug: "email-marketing" },
      { name: "Brand Messaging", slug: "brand-messaging" },
      { name: "Campaign Creative", slug: "campaign-creative" },
      { name: "Copywriting", slug: "copywriting" },
      { name: "Content Systems", slug: "content-systems" },
    ],
  },
  {
    name: "Websites & Digital Products",
    slug: "web-development",
    services: [
      { name: "Next.js Website Development", slug: "nextjs-development" },
      { name: "Corporate Websites", slug: "corporate-websites" },
      { name: "Marketing Websites", slug: "marketing-websites" },
      { name: "Landing Pages", slug: "landing-pages" },
      { name: "E-commerce Development", slug: "ecommerce-development" },
      { name: "WordPress Development", slug: "wordpress-development" },
      { name: "Headless CMS Development", slug: "headless-cms-development" },
      { name: "UI and UX Design", slug: "ui-ux-design" },
      { name: "Web Applications", slug: "web-applications" },
      { name: "Customer Portals", slug: "customer-portals" },
      { name: "Mobile Applications", slug: "mobile-applications" },
      { name: "Performance Optimisation", slug: "performance-optimisation" },
      { name: "Accessibility Improvement", slug: "accessibility-improvement" },
    ],
  },
  {
    name: "AI & Automation",
    slug: "ai-automation",
    services: [
      { name: "AI Strategy", slug: "ai-strategy" },
      { name: "AI Readiness Audits", slug: "ai-readiness-audit" },
      { name: "AI Agents", slug: "ai-agents" },
      { name: "AI Assistants", slug: "ai-assistants" },
      { name: "Customer Support Automation", slug: "customer-support-automation" },
      { name: "Lead Qualification Automation", slug: "lead-qualification-automation" },
      { name: "Workflow Automation", slug: "workflow-automation" },
      { name: "Document Processing", slug: "document-processing" },
      { name: "Internal Knowledge Assistants", slug: "internal-knowledge-assistants" },
      { name: "Sales Follow-Up Automation", slug: "sales-follow-up-automation" },
      { name: "Marketing Automation", slug: "marketing-automation" },
      { name: "AI Integration", slug: "ai-integration" },
      { name: "Voice and Messaging Automation", slug: "voice-messaging-automation" },
    ],
  },
  {
    name: "Custom Software & Business Systems",
    slug: "custom-software",
    services: [
      { name: "Custom CRM Development", slug: "custom-crm-development" },
      { name: "SaaS Development", slug: "saas-development" },
      { name: "Internal Business Tools", slug: "internal-business-tools" },
      { name: "Client Portals", slug: "client-portals" },
      { name: "Booking Platforms", slug: "booking-platforms" },
      { name: "Directory Platforms", slug: "directory-platforms" },
      { name: "Dashboards", slug: "dashboards" },
      { name: "Reporting Systems", slug: "reporting-systems" },
      { name: "API Development", slug: "api-development" },
      { name: "Third-Party Integrations", slug: "third-party-integrations" },
      { name: "Data Workflows", slug: "data-workflows" },
      { name: "Admin Panels", slug: "admin-panels" },
      { name: "Multi-Tenant Platforms", slug: "multi-tenant-platforms" },
      { name: "Custom Calculators and Auditing Tools", slug: "custom-calculators-tools" },
    ],
  },
  {
    name: "Data & Analytics",
    slug: "analytics",
    services: [
      { name: "Analytics Setup", slug: "analytics-setup" },
      { name: "Conversion Tracking", slug: "conversion-tracking" },
      { name: "Dashboard Development", slug: "dashboard-development-analytics" },
      { name: "GA4 Support", slug: "ga4-support" },
      { name: "Search Console Reporting", slug: "search-console-reporting" },
      { name: "Advertising Reporting", slug: "advertising-reporting" },
      { name: "Lead Attribution", slug: "lead-attribution" },
      { name: "Data Warehousing", slug: "data-warehousing" },
      { name: "Marketing Performance Dashboards", slug: "marketing-performance-dashboards" },
      { name: "Custom KPI Reporting", slug: "custom-kpi-reporting" },
      { name: "Data Quality Audits", slug: "data-quality-audits" },
    ],
  },
];

export function getPillarForService(slug: string): PillarData | undefined {
  return pillars.find((p) => p.services.some((s) => s.slug === slug));
}

export function getServiceInPillar(slug: string): { pillar: PillarData; service: ServiceItem } | undefined {
  for (const pillar of pillars) {
    const service = pillar.services.find((s) => s.slug === slug);
    if (service) return { pillar, service };
  }
  return undefined;
}

export function getAllServiceSlugs(): string[] {
  return pillars.flatMap((p) => p.services.map((s) => s.slug));
}
