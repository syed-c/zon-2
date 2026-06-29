export interface CaseStudyItem {
  client: string;
  slug: string;
  industry: string;
  project: string;
  result: string;
  description: string;
  category: string;
  tags: string[];
  challenge: string;
  approach: string;
  outcome: string;
  testimonial?: { quote: string; person: string; role: string };
  servicesUsed: string[];
  metrics: { label: string; value: string }[];
}

export const caseStudies: CaseStudyItem[] = [
  {
    client: "Pulse Health",
    slug: "pulse-health",
    industry: "Healthcare",
    project: "Generative Engine Optimisation for a HealthTech SaaS",
    result: "340% increase in AI-generated brand mentions",
    description:
      "Optimised Pulse Health's knowledge graph, entity schema, and content for discovery across ChatGPT, Perplexity, and Google AI Overviews. Organic traffic from AI sources grew 4.4x in four months.",
    category: "GEO & AI Search",
    tags: ["GEO", "Entity Optimisation", "Content Strategy"],
    challenge:
      "Pulse Health had strong traditional SEO but was invisible across AI-powered search platforms. Their brand was never cited by ChatGPT or Perplexity, even for queries directly related to their product category. As AI search adoption grew among their target audience of healthcare professionals, they faced a widening gap in visibility that traditional SEO couldn't close.",
    approach:
      "We conducted a full AI visibility audit across ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot. We restructured Pulse Health's entity schema, built a knowledge graph optimised for AI citation, and rewrote their content architecture to favour entity-rich, authoritative passages. We also developed a brand citation programme targeting the same sources AI platforms trust.",
    outcome:
      "Within four months, Pulse Health appeared in AI-generated responses for 340% more brand-relevant queries. Organic traffic from AI sources grew 4.4x, and they saw a measurable lift in demo requests attributed directly to AI search visibility. Their content is now consistently cited by AI platforms as a trusted source in health technology.",
    testimonial: {
      quote:
        "We were invisible in AI search. Now our prospects hear about us from ChatGPT before they ever visit our site. That's a fundamental shift in how discovery works.",
      person: "Sarah Chen",
      role: "VP of Marketing, Pulse Health",
    },
    servicesUsed: [
      "generative-engine-optimisation",
      "entity-optimisation",
      "ai-friendly-content-architecture",
      "brand-mention-development",
      "ai-search-monitoring",
      "content-strategy",
    ],
    metrics: [
      { label: "AI Brand Mentions", value: "+340%" },
      { label: "AI Organic Traffic", value: "4.4x" },
      { label: "Demo Requests from AI", value: "+210%" },
      { label: "Citations by ChatGPT", value: "47/month" },
    ],
  },
  {
    client: "Urban Spaces",
    slug: "urban-spaces",
    industry: "Real Estate",
    project: "Technical SEO & Content Cluster Strategy",
    result: "240% organic traffic increase in 6 months",
    description:
      "Complete technical SEO rebuild, Core Web Vitals optimisation, and a 120-article content cluster strategy that moved 340 keywords from page 3 to page 1 of Google.",
    category: "SEO",
    tags: ["Technical SEO", "Content Clusters", "CWV"],
    challenge:
      "Urban Spaces had a visually rich website built around high-resolution property imagery, which severely impacted load times and Core Web Vitals. Their organic traffic had plateaued for 18 months, and they were losing ground to competitors with faster, more search-friendly sites. A Google algorithm update had also devalued several of their highest-traffic pages.",
    approach:
      "We performed a comprehensive technical SEO audit covering 38,000 URLs, identifying critical issues with image optimisation, render-blocking resources, server response times, and mobile rendering. We rebuilt the site architecture around topic clusters, created 120 pillar and supporting articles, and implemented a CDN with next-gen image formats. Core Web Vitals went from failing to passing on all metrics.",
    outcome:
      "Organic traffic grew 240% over six months. Three hundred and forty keywords moved from page three to page one of Google search results. Core Web Vitals scores improved from 34/100 to 96/100 on mobile. Property inquiry form submissions increased 180% from organic traffic.",
    testimonial: {
      quote:
        "We knew the site was slow but didn't realise how much it was costing us. The rebuild turned our biggest weakness into our strongest channel.",
      person: "Rashid Al Maktoum",
      role: "Digital Director, Urban Spaces",
    },
    servicesUsed: ["technical-seo", "seo-strategy", "content-strategy", "on-page-seo", "seo-auditing", "performance-optimisation"],
    metrics: [
      { label: "Organic Traffic", value: "+240%" },
      { label: "Keywords to Page 1", value: "340" },
      { label: "CWV Score", value: "96/100" },
      { label: "Form Submissions", value: "+180%" },
    ],
  },
  {
    client: "NovaPay",
    slug: "novapay",
    industry: "Fintech",
    project: "Custom CRM & Client Portal",
    result: "68% reduction in manual processing time",
    description:
      "Built a custom CRM and client portal with automated onboarding, document management, and payment reconciliation. Replaced four disjointed tools with one unified platform.",
    category: "Custom Software",
    tags: ["CRM", "Portal", "Automation"],
    challenge:
      "NovaPay's team was managing client relationships across four separate systems: a legacy CRM for contacts, a document platform for KYC files, a payment processor for reconciliations, and spreadsheets for reporting. Staff spent 30+ hours per week manually transferring data between systems. Client onboarding took an average of 12 days due to manual document handling.",
    approach:
      "We designed and built a custom CRM and client portal on a Next.js + Node.js stack with a PostgreSQL database. The system unified contact management, automated KYC document processing with AI-powered extraction, integrated Stripe for payment reconciliation, and provided real-time dashboards. We migrated 14,000 client records and 28,000 documents into the new system.",
    outcome:
      "Manual processing time dropped 68%. Client onboarding was reduced from 12 days to 3. The finance team saved 20 hours per week on reconciliation alone. Staff NPS for the new system scored 82, and the platform has scaled to support 6 new product lines since launch.",
    testimonial: {
      quote:
        "We went from four systems and a spreadsheet nightmare to one platform that actually works the way we do. Our team got their evenings back.",
      person: "James Okonkwo",
      role: "COO, NovaPay",
    },
    servicesUsed: ["custom-crm-development", "web-applications", "api-development", "dashboard-development", "client-portals"],
    metrics: [
      { label: "Manual Processing Time", value: "-68%" },
      { label: "Client Onboarding", value: "12d → 3d" },
      { label: "Weekly Hours Saved", value: "20+" },
      { label: "System NPS", value: "82" },
    ],
  },
  {
    client: "Verdant Organics",
    slug: "verdant-organics",
    industry: "E-Commerce",
    project: "Digital PR & Authority Building Campaign",
    result: "2.8x referral traffic growth from tier-1 pubs",
    description:
      "Data-driven PR campaign that secured coverage in TechCrunch, Forbes, and Bloomberg. Generated 140+ unique domain backlinks and a 40% lift in organic keyword rankings.",
    category: "Digital PR",
    tags: ["Digital PR", "Link Building", "Media Outreach"],
    challenge:
      "Verdant Organics had a strong product and loyal customer base but virtually no external authority signals. Their backlink profile consisted of 12 low-quality directory links. Competitors with PR-driven link profiles dominated search results, and Verdant couldn't break into tier-1 publications despite having a compelling sustainability story.",
    approach:
      "We developed a data-driven PR campaign anchored on original research about consumer behaviour in sustainable purchasing. We identified and pitched 280 journalists across tier-1 publications, created interactive data visualisations and report microsites, and built a narrative around Verdant's supply chain transparency. Every pitch included proprietary data that journalists couldn't get elsewhere.",
    outcome:
      "Coverage in TechCrunch, Forbes, Bloomberg, and 18 other tier-1 publications. One hundred and forty unique domain backlinks acquired with a 92% domain rating average. Organic keyword rankings improved 40% within three months of campaign publication. Referral traffic from top-tier publishers grew 2.8x.",
    testimonial: {
      quote:
        "We had the story but didn't know how to tell it. The data-driven approach got us into publications we'd been chasing for years.",
      person: "Maya Lindstrom",
      role: "Head of Brand, Verdant Organics",
    },
    servicesUsed: ["digital-pr", "brand-mention-development", "content-strategy", "content-development", "off-page-seo"],
    metrics: [
      { label: "Referral Traffic", value: "2.8x" },
      { label: "Unique Domains", value: "140+" },
      { label: "Tier-1 Coverage", value: "21 pubs" },
      { label: "Keyword Rankings", value: "+40%" },
    ],
  },
  {
    client: "Elevate Education",
    slug: "elevate-education",
    industry: "EdTech",
    project: "Full-Funnel Paid Media Strategy",
    result: "52% lower CPA with 3x conversion rate",
    description:
      "Multi-channel paid strategy across Google, LinkedIn, and Meta, paired with landing page CRO and AI-powered audience segmentation. Scaled ad spend 4x while lowering CPA.",
    category: "Paid Media",
    tags: ["Paid Media", "CRO", "Audience Targeting"],
    challenge:
      "Elevate Education was spending $80,000 per month on paid media across Google, LinkedIn, and Meta with inconsistent results. CPA varied wildly between $120 and $340 per lead, and their landing pages had an average conversion rate of 1.8%. They had no audience segmentation strategy and couldn't attribute which channels drove qualified pipeline.",
    approach:
      "We rebuilt their paid media strategy from the ground up. We implemented AI-powered audience segmentation using first-party data, created dedicated landing pages for each audience segment with tailored messaging, and built a unified attribution model connecting ad clicks to pipeline revenue. We also introduced creative testing cycles with a structured hypothesis framework.",
    outcome:
      "CPA dropped 52% from $210 average to $101. Landing page conversion rates tripled from 1.8% to 5.4%. Ad spend was scaled from $80,000 to $320,000 per month while maintaining target CPA. Pipeline attributed to paid media grew 420% over six months.",
    testimonial: {
      quote:
        "We were burning money on ads with no idea what was working. The segmentation and attribution completely changed how we invest our marketing budget.",
      person: "David Okoro",
      role: "Head of Growth, Elevate Education",
    },
    servicesUsed: ["google-ads", "paid-social", "landing-page-optimisation", "creative-testing", "conversion-tracking", "analytics-setup"],
    metrics: [
      { label: "CPA Reduction", value: "-52%" },
      { label: "Conversion Rate", value: "1.8% → 5.4%" },
      { label: "Ad Spend Scale", value: "5x" },
      { label: "Pipeline Growth", value: "+420%" },
    ],
  },
  {
    client: "Streamline Logistics",
    slug: "streamline-logistics",
    industry: "Supply Chain",
    project: "AI Agent for Lead Qualification & Support",
    result: "190 qualified leads per month on autopilot",
    description:
      "Deployed an AI agent that triages inbound inquiries, scores readiness by intent, and books meetings into the sales calendar. Integrated with HubSpot, Slack, and the CRM.",
    category: "AI & Automation",
    tags: ["AI Agent", "Workflow Automation", "Integration"],
    challenge:
      "Streamline Logistics received 400+ inbound inquiries per month via website forms, live chat, and email, but their three-person sales team could only follow up on a fraction. There was no lead scoring system — every lead was treated equally, and the team spent hours manually triaging and routing inquiries. An estimated 60% of qualified leads were never contacted.",
    approach:
      "We built an AI agent that automatically triages every inbound inquiry, scores leads by purchase intent and fit, and routes hot leads directly to the sales calendar. The agent integrates with HubSpot for contact enrichment, Slack for real-time notifications, and their CRM for automated record creation. We also built a lead qualification dashboard that gives the team full visibility into inbound quality.",
    outcome:
      "The AI agent now handles 100% of inbound triage, qualifying 190 leads per month on autopilot. Sales team follow-up time dropped from 4 hours per day to 30 minutes. Lead-to-meeting conversion rate improved 3.4x because the team only works qualified leads. Revenue attributed to inbound grew 160%.",
    testimonial: {
      quote:
        "We had a firehose of leads and no way to drink. The AI agent turned our biggest bottleneck into our most scalable growth channel.",
      person: "Hassan Al-Rashid",
      role: "VP of Operations, Streamline Logistics",
    },
    servicesUsed: ["ai-agents", "workflow-automation", "lead-qualification-automation", "customer-support-automation", "api-development"],
    metrics: [
      { label: "Qualified Leads/Month", value: "190" },
      { label: "Follow-Up Time", value: "4h → 30min" },
      { label: "Lead-to-Meeting", value: "3.4x" },
      { label: "Inbound Revenue", value: "+160%" },
    ],
  },
  {
    client: "MedCore Analytics",
    slug: "medcore-analytics",
    industry: "Life Sciences",
    project: "Enterprise Analytics Dashboard",
    result: "94% stakeholder adoption within 2 weeks",
    description:
      "Real-time analytics dashboard aggregating clinical trial data, supply chain metrics, and regulatory milestones. Replaced six legacy spreadsheets across three departments.",
    category: "Data & Analytics",
    tags: ["Dashboard", "Data Engineering", "Visualisation"],
    challenge:
      "MedCore's clinical, supply chain, and regulatory teams each maintained their own spreadsheets with siloed data. Monthly reporting required two full-time analysts spending three weeks manually consolidating data from six sources. Decisions were made on outdated information, and the board had limited visibility into operational metrics between quarterly reports.",
    approach:
      "We built a real-time enterprise analytics dashboard on a modern data stack — Superset for visualisation, dbt for data transformation, and a cloud data warehouse as the single source of truth. We connected 14 data sources including CTMS, ERP, and EDC systems. The dashboard was designed with role-based views so each department sees relevant metrics with consistent underlying data.",
    outcome:
      "Ninety-four percent of stakeholders adopted the dashboard within two weeks of launch. Monthly reporting time dropped from three weeks to zero — automated reports replaced manual consolidation. The board gained real-time visibility into clinical milestones, supply chain status, and regulatory timelines. Three redundant analyst positions were redeployed to higher-value work.",
    testimonial: {
      quote:
        "We went from 'the numbers are somewhere in the spreadsheet' to real-time visibility for every decision-maker in the organisation. The time savings alone paid for the project in three months.",
      person: "Dr. Aisha Patel",
      role: "Chief Data Officer, MedCore Analytics",
    },
    servicesUsed: ["dashboard-development", "analytics-setup", "custom-kpi-reporting", "api-development", "data-engineering"],
    metrics: [
      { label: "Stakeholder Adoption", value: "94%" },
      { label: "Reporting Time", value: "3wk → 0" },
      { label: "Data Sources Connected", value: "14" },
      { label: "ROI Payback", value: "3 months" },
    ],
  },
  {
    client: "BuildRight",
    slug: "buildright",
    industry: "Construction",
    project: "SaaS Platform for Project Management",
    result: "$1.4M ARR within 12 months of launch",
    description:
      "End-to-end SaaS development including Next.js architecture, real-time collaboration, role-based access control, and Stripe billing. Onboarded 40+ construction firms.",
    category: "Web Development",
    tags: ["Next.js", "SaaS", "Real-Time"],
    challenge:
      "BuildRight had validated a SaaS concept for construction project management through customer interviews and a no-code MVP. They needed a production-grade platform built from scratch — real-time collaboration for job sites, role-based access for general contractors and subcontractors, Stripe billing, and the ability to onboard enterprise construction firms with complex data migration requirements.",
    approach:
      "We architected and built the entire platform on Next.js with a real-time collaboration layer, role-based access control supporting six user roles, and Stripe integration for subscription billing. We implemented a migration framework that imported project data from spreadsheets and legacy systems. The platform was built in three-month sprints with continuous deployment and weekly stakeholder demos.",
    outcome:
      "BuildRight launched on schedule and onboarded 40+ construction firms in the first year, reaching $1.4M ARR. The platform handles 12,000+ active projects with 99.97% uptime. User satisfaction scored 4.7/5 in post-onboarding surveys. The company raised a seed round at a $12M valuation within 14 months of launch.",
    testimonial: {
      quote:
        "Taking a validated concept to a production platform that enterprise firms trust is hard. ZON delivered on time, on budget, and the platform hasn't had a single critical issue since launch.",
      person: "Tom Erikson",
      role: "CEO, BuildRight",
    },
    servicesUsed: ["saas-development", "nextjs-development", "web-applications", "api-development", "ui-ux-design"],
    metrics: [
      { label: "ARR at 12 Months", value: "$1.4M" },
      { label: "Firms Onboarded", value: "40+" },
      { label: "Active Projects", value: "12,000+" },
      { label: "Uptime", value: "99.97%" },
    ],
  },
  {
    client: "Al Shafar Investment",
    slug: "al-shafar-investment",
    industry: "Real Estate",
    project: "Technical SEO & Content Overhaul with Custom CRM Integration",
    result: "47.3% organic lift in 4 months",
    description:
      "Technical SEO overhaul, content strategy, and a custom CRM platform integration that drove a 47.3% increase in organic traffic and improved lead capture across 12 property portfolios.",
    category: "SEO",
    tags: ["Technical SEO", "CRM", "Content Strategy"],
    challenge:
      "Al Shafar Investment managed 12 distinct property portfolios across the UAE, each with its own microsite and inconsistent SEO implementation. Organic traffic had declined 23% year-over-year, and lead capture was fragmented across separate contact forms with no central CRM integration. Their sales team couldn't track which properties generated the most inquiries.",
    approach:
      "We consolidated all 12 microsites under a unified architecture with proper canonicalisation and hreflang implementation. We performed a technical SEO audit resolving 400+ issues including duplicate content, broken internal links, and missing schema markup. We built a custom CRM integration that connected all lead capture points into a single pipeline with automated routing to the sales team.",
    outcome:
      "Organic traffic increased 47.3% within four months. Lead capture from organic sources grew 210%. The unified CRM gave the sales team real-time visibility into lead sources and portfolio performance. Maintenance overhead dropped 60% by eliminating redundant microsites.",
    servicesUsed: ["technical-seo", "seo-strategy", "content-strategy", "custom-crm-development", "on-page-seo", "seo-auditing"],
    metrics: [
      { label: "Organic Traffic", value: "+47.3%" },
      { label: "Lead Capture", value: "+210%" },
      { label: "Issues Resolved", value: "400+" },
      { label: "Maintenance Overhead", value: "-60%" },
    ],
  },
  {
    client: "Gulf Tech Solutions",
    slug: "gulf-tech-solutions",
    industry: "SaaS",
    project: "Paid Media & AI Lead Qualification",
    result: "190% increase in qualified demo requests",
    description:
      "Paid media, landing page optimisation, and automated lead qualification via AI that drove a 190% increase in qualified demo requests for a B2B SaaS platform.",
    category: "Paid Media",
    tags: ["Paid Media", "AI", "Lead Qualification"],
    challenge:
      "Gulf Tech Solutions had a sophisticated B2B SaaS product but was attracting high volumes of unqualified demo requests. Their sales team spent 60% of their time on demos that never converted. Paid media campaigns were optimised for volume rather than quality, and there was no lead scoring mechanism in place.",
    approach:
      "We rebuilt their paid media strategy around intent signals — targeting decision-makers with specific pain points rather than broad job titles. We redesigned landing pages with qualification questions that pre-scored leads before they reached the sales team. An AI lead scoring model was trained on historical conversion data to automatically route high-intent prospects to senior sales reps.",
    outcome:
      "Qualified demo requests increased 190%. Sales team time-wasting on unqualified leads dropped from 60% to 12%. Demo-to-close conversion rate improved 40% because reps only spoke to pre-qualified prospects. Cost per qualified lead decreased 55%.",
    servicesUsed: ["google-ads", "paid-social", "landing-page-optimisation", "lead-qualification-automation", "conversion-tracking"],
    metrics: [
      { label: "Qualified Demos", value: "+190%" },
      { label: "Sales Time Wasted", value: "60% → 12%" },
      { label: "Demo-to-Close", value: "+40%" },
      { label: "Cost per Lead", value: "-55%" },
    ],
  },
  {
    client: "Dubai Health Authority",
    slug: "dubai-health-authority",
    industry: "Healthcare",
    project: "Multi-Location GEO & Local Search Optimisation",
    result: "3.1x local search visibility improvement",
    description:
      "Multi-location GEO readiness, entity optimisation, and GBP audit with citation cleanup that improved local search visibility 3.1x across 28 facilities.",
    category: "GEO & AI Search",
    tags: ["GEO", "Local SEO", "Entity Optimisation"],
    challenge:
      "Dubai Health Authority operated 28 healthcare facilities across the emirate, but local search visibility was inconsistent. Some facilities appeared in the local pack, others were invisible. Google Business Profiles were unverified or incomplete for 11 locations. Citation data across health authority directories, Google Maps, and healthcare platforms was inconsistent, creating confusion for patients searching for nearby care.",
    approach:
      "We conducted a facility-by-facility audit of all 28 locations, fixing GBP verification issues, standardising NAP data across 40+ directories, and implementing entity schema for each facility. We developed a GEO readiness strategy optimising each location for AI-powered search platforms. We also created a citation management playbook for ongoing consistency.",
    outcome:
      "Local search visibility improved 3.1x across all 28 facilities. All locations now appear in the Google local pack for relevant service-area queries. Patient inquiries via Google Maps increased 170%. Citation consistency scored 98% across all monitored directories.",
    servicesUsed: ["local-seo", "generative-engine-optimisation", "entity-optimisation", "reputation-management", "brand-citation-readiness"],
    metrics: [
      { label: "Local Visibility", value: "3.1x" },
      { label: "Facilities Optimised", value: "28" },
      { label: "Maps Inquiries", value: "+170%" },
      { label: "Citation Consistency", value: "98%" },
    ],
  },
  {
    client: "Emerge Logistics",
    slug: "emerge-logistics",
    industry: "Supply Chain",
    project: "Full-Funnel Paid Strategy & CRO",
    result: "62% reduction in cost per acquisition",
    description:
      "Full-funnel paid strategy, conversion rate optimisation, and analytics infrastructure rebuild that reduced cost per acquisition by 62% and doubled conversion rates.",
    category: "Paid Media",
    tags: ["Paid Media", "CRO", "Analytics"],
    challenge:
      "Emerge Logistics was spending aggressively on paid search and LinkedIn to acquire B2B clients, but their cost per acquisition had climbed to $980 — unsustainable for their target customer LTV. Their analytics infrastructure was broken: tracking was incomplete, attribution was inaccurate, and they couldn't identify which channels or campaigns actually drove booked business.",
    approach:
      "We rebuilt their analytics infrastructure from the ground up — implementing proper event tracking, multi-touch attribution, and a unified data layer connecting ad platforms to their CRM. We restructured campaigns around funnel stages, created tailored landing pages for awareness, consideration, and decision-stage prospects, and implemented a CRO programme with continuous A/B testing.",
    outcome:
      "Cost per acquisition dropped 62% from $980 to $372. Overall conversion rate doubled. They gained full visibility into channel performance and customer journey. The analytics rebuild paid for itself within six weeks through budget reallocation alone.",
    servicesUsed: ["google-ads", "landing-page-optimisation", "conversion-tracking", "analytics-setup", "lead-attribution"],
    metrics: [
      { label: "Cost per Acquisition", value: "$980 → $372" },
      { label: "CPA Reduction", value: "-62%" },
      { label: "Conversion Rate", value: "2x" },
      { label: "Analytics ROI", value: "6 weeks" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudyItem | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((c) => c.slug);
}
