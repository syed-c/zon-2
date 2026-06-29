export interface ToolItem {
  name: string;
  slug: string;
  category: string;
  shortDesc: string;
  description: string;
  isMvp: boolean;
}

const seoTools: ToolItem[] = [
  { name: "Website SEO Audit", slug: "seo-audit", category: "SEO Tools", shortDesc: "Comprehensive technical and content SEO analysis", description: "Scan your website for technical SEO issues, content gaps, and optimisation opportunities. Get a prioritised action plan with estimated impact.", isMvp: true },
  { name: "Technical SEO Checker", slug: "technical-seo-checker", category: "SEO Tools", shortDesc: "Analyse crawlability, indexation, and technical health", description: "Check your site's technical foundation — crawl errors, indexation status, Core Web Vitals, and server configuration.", isMvp: true },
  { name: "On-Page SEO Checker", slug: "on-page-seo-checker", category: "SEO Tools", shortDesc: "Evaluate individual page optimisation", description: "Analyse any page for meta tags, heading structure, content quality, keyword usage, and internal linking.", isMvp: false },
  { name: "Metadata Checker", slug: "metadata-checker", category: "SEO Tools", shortDesc: "Review title tags and meta descriptions", description: "Check your title tags, meta descriptions, and social meta across your site for length, quality, and duplication.", isMvp: false },
  { name: "SERP Preview Tool", slug: "serp-preview-tool", category: "SEO Tools", shortDesc: "Preview search result snippets across devices", description: "See exactly how your pages appear in search results — desktop and mobile. Preview titles, URLs, and descriptions.", isMvp: true },
  { name: "Keyword Density Checker", slug: "keyword-density-checker", category: "SEO Tools", shortDesc: "Analyse keyword usage and frequency", description: "Check keyword density and term frequency across your content to ensure natural, balanced optimisation.", isMvp: false },
  { name: "Search Intent Classifier", slug: "search-intent-classifier", category: "SEO Tools", shortDesc: "Classify keywords by search intent", description: "Determine whether a keyword is informational, navigational, commercial, or transactional for better content targeting.", isMvp: false },
  { name: "Keyword Clustering Tool", slug: "keyword-clustering-tool", category: "SEO Tools", shortDesc: "Group keywords into topical clusters", description: "Organise your keywords into semantic clusters to build topical authority and improve content structure.", isMvp: false },
  { name: "Broken Link Checker", slug: "broken-link-checker", category: "SEO Tools", shortDesc: "Find broken links on your website", description: "Scan your site for broken internal and external links that hurt user experience and SEO performance.", isMvp: false },
  { name: "Schema Generator", slug: "schema-generator", category: "SEO Tools", shortDesc: "Generate structured data markup for rich results", description: "Create schema markup for articles, FAQs, products, reviews, local business, and more. Copy-paste ready.", isMvp: true },
  { name: "Schema Validator", slug: "schema-validator", category: "SEO Tools", shortDesc: "Validate your structured data implementation", description: "Test your schema markup against Google's rich results guidelines and fix errors before deployment.", isMvp: false },
  { name: "Redirect Checker", slug: "redirect-checker", category: "SEO Tools", shortDesc: "Trace URL redirect chains", description: "Follow redirect chains to identify loops, excessive hops, and broken redirects that waste crawl budget.", isMvp: false },
  { name: "Core Web Vitals Checker", slug: "core-web-vitals-checker", category: "SEO Tools", shortDesc: "Measure LCP, FID, CLS and INP", description: "Check your site's Core Web Vitals performance across desktop and mobile with actionable improvement suggestions.", isMvp: false },
  { name: "Sitemap Validator", slug: "sitemap-validator", category: "SEO Tools", shortDesc: "Validate your XML sitemap structure", description: "Check your sitemap for errors, missing URLs, incorrect priorities, and proper formatting.", isMvp: false },
  { name: "Robots.txt Checker", slug: "robots-txt-checker", category: "SEO Tools", shortDesc: "Analyse your robots.txt configuration", description: "Check your robots.txt for blocking directives, crawl allowance, and sitemap references.", isMvp: false },
  { name: "Canonical Checker", slug: "canonical-checker", category: "SEO Tools", shortDesc: "Verify canonical URL implementation", description: "Scan for missing, conflicting, or incorrect canonical tags that cause duplicate content issues.", isMvp: false },
  { name: "Internal Link Analyzer", slug: "internal-link-analyzer", category: "SEO Tools", shortDesc: "Analyse your internal linking structure", description: "Map your internal link graph, find orphan pages, and discover link equity distribution opportunities.", isMvp: false },
  { name: "Image Alt Text Checker", slug: "image-alt-text-checker", category: "SEO Tools", shortDesc: "Review image alt attributes across your site", description: "Find missing, duplicate, or low-quality alt text on your images to improve accessibility and SEO.", isMvp: false },
  { name: "Indexability Checker", slug: "indexability-checker", category: "SEO Tools", shortDesc: "Check if your pages can be indexed", description: "Determine whether search engines can index your pages based on robots meta tags, headers, and directives.", isMvp: false },
  { name: "SEO Content Score", slug: "seo-content-score", category: "SEO Tools", shortDesc: "Score your content for SEO readiness", description: "Get a data-driven score for any piece of content based on keyword usage, structure, readability, and relevance.", isMvp: false },
  { name: "Migration Checklist Generator", slug: "migration-checklist-generator", category: "SEO Tools", shortDesc: "Generate a website migration SEO checklist", description: "Create a custom SEO migration checklist covering redirects, content mapping, tracking, and post-launch monitoring.", isMvp: false },
];

const geoTools: ToolItem[] = [
  { name: "GEO Readiness Audit", slug: "geo-readiness", category: "GEO & AI Search Tools", shortDesc: "Measure AI search and generative engine readiness", description: "Assess how prepared your brand is for AI-powered search. Get a readiness score with specific improvement actions.", isMvp: true },
  { name: "AI Search Visibility Checker", slug: "ai-visibility", category: "GEO & AI Search Tools", shortDesc: "Check how your brand appears in AI platforms", description: "See how your brand is referenced across ChatGPT, Perplexity, Google AI Overviews, and other AI platforms.", isMvp: true },
  { name: "AI Citation Readiness Tool", slug: "ai-citation-readiness", category: "GEO & AI Search Tools", shortDesc: "Evaluate your brand citation signals for AI", description: "Check your brand's citation signals that AI platforms use to discover and reference your business.", isMvp: false },
  { name: "Entity Optimisation Checker", slug: "entity-optimisation-checker", category: "GEO & AI Search Tools", shortDesc: "Analyse your entity signals for knowledge graphs", description: "Evaluate how well your entities are defined for knowledge graphs and AI platform understanding.", isMvp: false },
  { name: "Answer Engine Audit", slug: "answer-engine-audit", category: "GEO & AI Search Tools", shortDesc: "Audit your content for answer engine capture", description: "Analyse how well your content answers questions that AI systems surface in answer boxes and direct responses.", isMvp: false },
  { name: "AI Overview Readiness Checker", slug: "ai-overview-readiness-checker", category: "GEO & AI Search Tools", shortDesc: "Check readiness for Google AI Overviews", description: "Evaluate your content's likelihood of being featured in Google AI Overviews based on structure, authority, and relevance.", isMvp: false },
  { name: "LLM Content Analyzer", slug: "llm-content-analyzer", category: "GEO & AI Search Tools", shortDesc: "Analyse content for LLM compatibility", description: "Check how well your content is structured for consumption by large language models and AI training systems.", isMvp: false },
  { name: "Question Coverage Checker", slug: "question-coverage-checker", category: "GEO & AI Search Tools", shortDesc: "Find which questions your content answers", description: "Discover the questions your content answers and identify gaps in your Q&A coverage for AI platforms.", isMvp: false },
  { name: "Brand Authority Score", slug: "brand-authority-score", category: "GEO & AI Search Tools", shortDesc: "Measure your brand's AI authority signals", description: "Get a composite score of your brand's authority signals across citations, mentions, and structured data.", isMvp: false },
  { name: "AI Competitor Comparison", slug: "ai-competitor-comparison", category: "GEO & AI Search Tools", shortDesc: "Compare AI visibility against competitors", description: "See how your brand stacks up against competitors in AI search visibility and citation authority.", isMvp: false },
  { name: "Structured Data Opportunity Finder", slug: "structured-data-opportunity-finder", category: "GEO & AI Search Tools", shortDesc: "Find structured data opportunities", description: "Identify pages and content types that could benefit from additional structured data markup.", isMvp: false },
];

const websiteTools: ToolItem[] = [
  { name: "Landing Page Grader", slug: "landing-page-grader", category: "Website Audit Tools", shortDesc: "Grade your landing pages for conversion potential", description: "Get a detailed score for any landing page based on design, copy, speed, mobile experience, and conversion signals.", isMvp: true },
  { name: "Website Performance Audit", slug: "website-performance-audit", category: "Website Audit Tools", shortDesc: "Comprehensive website performance analysis", description: "Audit your site's loading performance, render blocking, caching, and overall speed with actionable fixes.", isMvp: false },
  { name: "Mobile Experience Checker", slug: "mobile-experience-checker", category: "Website Audit Tools", shortDesc: "Evaluate your mobile user experience", description: "Check mobile responsiveness, touch targets, font sizes, and viewport configuration for optimal mobile UX.", isMvp: false },
  { name: "Accessibility Checker", slug: "accessibility-checker", category: "Website Audit Tools", shortDesc: "Check WCAG accessibility compliance", description: "Scan your site for accessibility issues including contrast, ARIA labels, keyboard navigation, and screen reader support.", isMvp: false },
  { name: "Security Header Checker", slug: "security-header-checker", category: "Website Audit Tools", shortDesc: "Audit your HTTP security headers", description: "Check your security headers including HSTS, CSP, X-Frame-Options, and other critical security configurations.", isMvp: false },
  { name: "Technology Stack Checker", slug: "technology-stack-checker", category: "Website Audit Tools", shortDesc: "Identify the technology stack of any website", description: "Detect the CMS, frameworks, hosting provider, CDN, analytics tools, and other technologies a website uses.", isMvp: false },
  { name: "SSL Checker", slug: "ssl-checker", category: "Website Audit Tools", shortDesc: "Verify your SSL certificate configuration", description: "Check your SSL certificate validity, chain, cipher support, and security configuration.", isMvp: false },
  { name: "Domain Health Checker", slug: "domain-health-checker", category: "Website Audit Tools", shortDesc: "Comprehensive domain health analysis", description: "Analyse your domain's DNS configuration, email authentication, expiry status, and security settings.", isMvp: false },
  { name: "Page Weight Analyzer", slug: "page-weight-analyzer", category: "Website Audit Tools", shortDesc: "Measure your page size and resource weight", description: "Break down your page weight by resource type — HTML, CSS, JavaScript, images, and fonts — with reduction recommendations.", isMvp: false },
  { name: "Uptime Monitor", slug: "uptime-monitor", category: "Website Audit Tools", shortDesc: "Monitor your website uptime and availability", description: "Track your site's uptime, response time, and incident history with alerts for downtime events.", isMvp: false },
  { name: "Conversion Audit Tool", slug: "conversion-audit-tool", category: "Website Audit Tools", shortDesc: "Audit your conversion funnel", description: "Analyse your conversion funnel for drop-off points, friction, and optimisation opportunities.", isMvp: false },
  { name: "UX Checklist Tool", slug: "ux-checklist-tool", category: "Website Audit Tools", shortDesc: "Evaluate your site against UX best practices", description: "Run a comprehensive UX audit based on established usability heuristics and user experience best practices.", isMvp: false },
];

const contentTools: ToolItem[] = [
  { name: "SEO Content Brief Generator", slug: "content-brief", category: "Content Tools", shortDesc: "Generate data-driven content briefs", description: "Create comprehensive SEO content briefs with target keywords, structure recommendations, SERP analysis, and readability targets.", isMvp: true },
  { name: "Blog Outline Generator", slug: "blog-outline-generator", category: "Content Tools", shortDesc: "Generate SEO-optimised blog outlines", description: "Create structured blog post outlines with H2s, H3s, keyword placement, and question coverage based on SERP analysis.", isMvp: false },
  { name: "Content Gap Analyzer", slug: "content-gap-analyzer", category: "Content Tools", shortDesc: "Find content gaps in your strategy", description: "Compare your content against competitors and search demand to identify untapped topics and opportunities.", isMvp: false },
  { name: "Heading Structure Checker", slug: "heading-structure-checker", category: "Content Tools", shortDesc: "Analyse heading hierarchy on any page", description: "Check your heading structure for proper hierarchy, keyword usage, and SEO best practices.", isMvp: false },
  { name: "Readability Checker", slug: "readability-checker", category: "Content Tools", shortDesc: "Measure content readability scores", description: "Get Flesch-Kincaid, Gunning Fog, and other readability scores for any piece of content.", isMvp: false },
  { name: "Repetition Checker", slug: "repetition-checker", category: "Content Tools", shortDesc: "Find repetitive words and phrases", description: "Detect overused words, phrases, and sentence structures that reduce content quality and reader engagement.", isMvp: false },
  { name: "FAQ Generator", slug: "faq-generator", category: "Content Tools", shortDesc: "Generate FAQ schema from content", description: "Extract question-answer pairs from your content and generate FAQ structured data markup.", isMvp: false },
  { name: "Topic Cluster Generator", slug: "topic-cluster-generator", category: "Content Tools", shortDesc: "Build topical authority clusters", description: "Generate topic clusters with pillar pages and supporting content for improved topical authority.", isMvp: false },
  { name: "Internal Link Anchor Generator", slug: "internal-link-anchor-generator", category: "Content Tools", shortDesc: "Generate internal link suggestions", description: "Get intelligent internal linking suggestions with optimised anchor text based on content relationships.", isMvp: false },
  { name: "Content Refresh Analyzer", slug: "content-refresh-analyzer", category: "Content Tools", shortDesc: "Identify content that needs updating", description: "Find underperforming content that could benefit from refresh based on traffic decline, relevance, and competitor updates.", isMvp: false },
  { name: "E-E-A-T Checklist Tool", slug: "eeat-checklist-tool", category: "Content Tools", shortDesc: "Evaluate content against Google E-E-A-T", description: "Score your content and author pages against Google's Experience, Expertise, Authoritativeness, and Trustworthiness criteria.", isMvp: false },
  { name: "Location Page Planner", slug: "location-page-planner", category: "Content Tools", shortDesc: "Plan multi-location landing pages", description: "Generate location page structures with unique content suggestions for multi-location SEO strategies.", isMvp: false },
];

const adTools: ToolItem[] = [
  { name: "Google Ads Cost Calculator", slug: "ads-calculator", category: "Advertising Tools", shortDesc: "Estimate paid search costs and ROAS", description: "Estimate your Google Ads costs, clicks, and ROAS based on keywords, industry benchmarks, and budget scenarios.", isMvp: true },
  { name: "ROAS Calculator", slug: "roas-calculator", category: "Advertising Tools", shortDesc: "Calculate return on ad spend", description: "Calculate your ROAS across campaigns, channels, and time periods with profit margin and break-even analysis.", isMvp: false },
  { name: "Cost Per Lead Calculator", slug: "cost-per-lead-calculator", category: "Advertising Tools", shortDesc: "Calculate cost per lead across channels", description: "Calculate and compare your cost per lead across different advertising channels and campaigns.", isMvp: false },
  { name: "Break-Even CPC Calculator", slug: "break-even-cpc-calculator", category: "Advertising Tools", shortDesc: "Calculate your maximum profitable CPC", description: "Determine your break-even cost per click based on conversion rate, average order value, and profit margin.", isMvp: false },
  { name: "Ad Budget Planner", slug: "ad-budget-planner", category: "Advertising Tools", shortDesc: "Plan and allocate advertising budgets", description: "Plan your advertising budget across channels with reach estimates, frequency targets, and performance projections.", isMvp: false },
  { name: "UTM Builder", slug: "utm-builder", category: "Advertising Tools", shortDesc: "Build and manage UTM tracking URLs", description: "Create consistent UTM-tagged URLs for your campaigns with a builder that follows your naming conventions.", isMvp: true },
  { name: "Ad Copy Preview Tool", slug: "ad-copy-preview", category: "Advertising Tools", shortDesc: "Preview ads across placements", description: "See how your ad copy appears across Google Search, Display Network, YouTube, and social platforms.", isMvp: false },
  { name: "Landing Page Match Checker", slug: "landing-page-match-checker", category: "Advertising Tools", shortDesc: "Check ad-to-landing page alignment", description: "Evaluate how well your landing pages match your ad copy, keywords, and user intent.", isMvp: false },
  { name: "Negative Keyword Organizer", slug: "negative-keyword-organizer", category: "Advertising Tools", shortDesc: "Organise and manage negative keywords", description: "Build and maintain negative keyword lists to reduce wasted spend and improve campaign targeting.", isMvp: false },
  { name: "Search Term Classifier", slug: "search-term-classifier", category: "Advertising Tools", shortDesc: "Classify search terms by intent and relevance", description: "Automatically classify search terms as positive, negative, or observational for better campaign management.", isMvp: false },
  { name: "Campaign Readiness Audit", slug: "campaign-readiness-audit", category: "Advertising Tools", shortDesc: "Audit campaign setup before launch", description: "Check your campaign setup against best practices — targeting, budgets, tracking, extensions, and compliance.", isMvp: false },
];

const localTools: ToolItem[] = [
  { name: "Local SEO Audit", slug: "local-seo-audit", category: "Local Marketing Tools", shortDesc: "Comprehensive local search presence analysis", description: "Audit your local SEO across Google Business Profile, citations, reviews, and local content.", isMvp: true },
  { name: "Google Business Profile Audit", slug: "gbp-audit", category: "Local Marketing Tools", shortDesc: "Audit your GBP profile optimisation", description: "Check your Google Business Profile for completeness, accuracy, and optimisation opportunities.", isMvp: false },
  { name: "Citation Checker", slug: "citation-checker", category: "Local Marketing Tools", shortDesc: "Check local citation consistency", description: "Find where your business is listed online and check NAP consistency across all directories.", isMvp: false },
  { name: "Review Response Generator", slug: "review-response-generator", category: "Local Marketing Tools", shortDesc: "Generate professional review responses", description: "Create appropriate, brand-aligned responses to customer reviews — both positive and negative.", isMvp: false },
  { name: "Local Rank Tracker", slug: "local-rank-tracker", category: "Local Marketing Tools", shortDesc: "Track local search rankings", description: "Monitor your local pack rankings for key search terms across your target locations.", isMvp: false },
  { name: "NAP Consistency Checker", slug: "nap-consistency-checker", category: "Local Marketing Tools", shortDesc: "Check name, address, phone consistency", description: "Scan your online presence for NAP inconsistencies that hurt local search rankings.", isMvp: false },
  { name: "Local Landing Page Checker", slug: "local-landing-page-checker", category: "Local Marketing Tools", shortDesc: "Evaluate local landing page quality", description: "Check your location-specific pages for local SEO signals, unique content, and conversion elements.", isMvp: false },
  { name: "Service Area Generator", slug: "service-area-generator", category: "Local Marketing Tools", shortDesc: "Generate service area content", description: "Create service area pages and content for each location you serve.", isMvp: false },
  { name: "GBP Category Finder", slug: "gbp-category-finder", category: "Local Marketing Tools", shortDesc: "Find the best GBP categories", description: "Discover the most relevant Google Business Profile categories for your business type.", isMvp: false },
  { name: "Review Link Generator", slug: "review-link-generator", category: "Local Marketing Tools", shortDesc: "Generate direct review links", description: "Create direct review links for each platform to make it easy for customers to leave reviews.", isMvp: false },
];

const prTools: ToolItem[] = [
  { name: "Press Release Quality Checker", slug: "press-release-quality-checker", category: "PR & Brand Tools", shortDesc: "Evaluate press release quality", description: "Check your press release against journalistic standards, newsworthiness, and SEO best practices.", isMvp: false },
  { name: "Media Pitch Generator", slug: "media-pitch-generator", category: "PR & Brand Tools", shortDesc: "Generate personalised media pitches", description: "Create custom media pitches tailored to specific journalists, publications, and story angles.", isMvp: false },
  { name: "Brand Mention Monitor", slug: "brand-mention-monitor", category: "PR & Brand Tools", shortDesc: "Monitor brand mentions across the web", description: "Track when and where your brand is mentioned online — including unlinked mentions that are link opportunities.", isMvp: false },
  { name: "PR Campaign Planner", slug: "pr-campaign-planner", category: "PR & Brand Tools", shortDesc: "Plan and organise PR campaigns", description: "Structure your PR campaigns with timelines, target lists, key messages, and success metrics.", isMvp: false },
  { name: "Outreach Organiser", slug: "outreach-organiser", category: "PR & Brand Tools", shortDesc: "Organise media outreach efforts", description: "Track your media outreach — contacts, pitches, follow-ups, and responses in one place.", isMvp: false },
  { name: "Brand Authority Audit", slug: "brand-authority-audit", category: "PR & Brand Tools", shortDesc: "Audit your brand's authority signals", description: "Evaluate your brand's authority across mentions, backlinks, social proof, and industry recognition.", isMvp: false },
  { name: "Reputation Checker", slug: "reputation-checker", category: "PR & Brand Tools", shortDesc: "Check your online reputation status", description: "Scan your brand's online reputation across reviews, social media, news, and search results.", isMvp: false },
  { name: "Crisis Response Template Generator", slug: "crisis-response-template", category: "PR & Brand Tools", shortDesc: "Generate crisis communication templates", description: "Create crisis response templates for different scenarios — data breach, negative press, product issue, etc.", isMvp: false },
  { name: "Brand Consistency Checker", slug: "brand-consistency-checker", category: "PR & Brand Tools", shortDesc: "Check brand consistency across channels", description: "Audit your brand presentation across all digital channels for messaging, visual, and tone consistency.", isMvp: false },
];

const businessTools: ToolItem[] = [
  { name: "CRM Requirements Builder", slug: "crm-requirements-builder", category: "Business & AI Tools", shortDesc: "Build custom CRM requirements", description: "Create a tailored CRM requirements document based on your sales process, team structure, and integration needs.", isMvp: false },
  { name: "Automation Opportunity Audit", slug: "automation-opportunity-audit", category: "Business & AI Tools", shortDesc: "Find automation opportunities", description: "Analyse your workflows and processes to identify high-impact automation opportunities with ROI estimates.", isMvp: false },
  { name: "AI Readiness Assessment", slug: "ai-readiness-assessment", category: "Business & AI Tools", shortDesc: "Assess your AI readiness", description: "Evaluate your organisation's readiness to adopt AI across data, infrastructure, skills, and governance.", isMvp: false },
  { name: "Business Process Analyzer", slug: "business-process-analyzer", category: "Business & AI Tools", shortDesc: "Analyse your business processes", description: "Document and analyse your business processes to identify inefficiencies, bottlenecks, and improvement opportunities.", isMvp: false },
  { name: "Lead Follow-Up Workflow Builder", slug: "lead-follow-up-workflow-builder", category: "Business & AI Tools", shortDesc: "Build automated lead follow-up workflows", description: "Design automated lead follow-up sequences with timing, channels, and content based on lead behaviour.", isMvp: false },
  { name: "AI Agent Cost Calculator", slug: "ai-agent-cost-calculator", category: "Business & AI Tools", shortDesc: "Estimate AI agent implementation costs", description: "Calculate the estimated cost of implementing AI agents for your specific use cases and scale.", isMvp: false },
  { name: "Custom Software Cost Estimator", slug: "custom-software-cost-estimator", category: "Business & AI Tools", shortDesc: "Estimate custom software development costs", description: "Get development cost estimates for custom software projects based on features, complexity, and team requirements.", isMvp: false },
  { name: "Website Project Cost Calculator", slug: "website-project-cost-calculator", category: "Business & AI Tools", shortDesc: "Estimate website development costs", description: "Calculate estimated costs for website projects based on pages, features, design requirements, and timeline.", isMvp: false },
  { name: "App Development Cost Calculator", slug: "app-development-cost-calculator", category: "Business & AI Tools", shortDesc: "Estimate mobile app development costs", description: "Get cost estimates for mobile app development based on platform, features, design complexity, and team size.", isMvp: false },
  { name: "Digital Growth Plan Generator", slug: "digital-growth-plan-generator", category: "Business & AI Tools", shortDesc: "Generate a personalised growth plan", description: "Create a personalised digital growth plan with recommended services, tools, and next steps based on your goals.", isMvp: false },
];

export const toolCategories: { name: string; tools: ToolItem[] }[] = [
  { name: "SEO Tools", tools: seoTools },
  { name: "GEO & AI Search Tools", tools: geoTools },
  { name: "Website Audit Tools", tools: websiteTools },
  { name: "Content Tools", tools: contentTools },
  { name: "Advertising Tools", tools: adTools },
  { name: "Local Marketing Tools", tools: localTools },
  { name: "PR & Brand Tools", tools: prTools },
  { name: "Business & AI Tools", tools: businessTools },
];

export function getTool(slug: string): ToolItem | undefined {
  for (const cat of toolCategories) {
    const tool = cat.tools.find((t) => t.slug === slug);
    if (tool) return tool;
  }
  return undefined;
}

export function getAllToolSlugs(): string[] {
  return toolCategories.flatMap((cat) => cat.tools.map((t) => t.slug));
}
