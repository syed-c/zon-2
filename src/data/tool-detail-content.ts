export interface ToolStep {
  title: string;
  desc: string;
}

export interface ToolStat {
  stat: string;
  label: string;
}

export interface ToolRecommendation {
  title: string;
  desc: string;
  impact: "high" | "medium" | "low";
}

export interface ToolDetailConfig {
  inputLabel: string;
  inputPlaceholder: string;
  buttonLabel: string;
  runDescription: string;
  steps: ToolStep[];
  stats: ToolStat[];
  recommendations: ToolRecommendation[];
}

const seoDetail: Record<string, ToolDetailConfig> = {
  "seo-audit": {
    inputLabel: "Website URL",
    inputPlaceholder: "https://yourwebsite.com",
    buttonLabel: "Run Audit",
    runDescription: "Comprehensive technical and content SEO analysis. Free basic audit. Create an account to save results.",
    steps: [
      { title: "Crawl", desc: "Our crawler scans your entire site structure, following internal links and sitemaps." },
      { title: "Analyse", desc: "Each page is checked against 200+ SEO factors — technical, content, performance, and more." },
      { title: "Score", desc: "Results are weighted by impact and compiled into a prioritised action plan." },
      { title: "Recommend", desc: "Get step-by-step fixes ranked by estimated effort and potential traffic impact." },
    ],
    stats: [
      { stat: "200+", label: "Checkpoints" },
      { stat: "60s", label: "Average Scan" },
      { stat: "94%", label: "Issue Detection" },
    ],
    recommendations: [
      { title: "Fix Critical Errors First", desc: "Prioritise issues that block indexing or severely impact user experience.", impact: "high" },
      { title: "Address Content Gaps", desc: "Thin content and missing meta descriptions are quick wins with high impact.", impact: "high" },
      { title: "Optimise Core Web Vitals", desc: "Improve LCP, CLS, and FID to meet Google's page experience thresholds.", impact: "medium" },
      { title: "Strengthen Internal Linking", desc: "Distribute link equity to important pages and reduce orphan content.", impact: "medium" },
    ],
  },
  "technical-seo-checker": {
    inputLabel: "Website URL",
    inputPlaceholder: "https://yourwebsite.com",
    buttonLabel: "Check Technical Health",
    runDescription: "Analyse crawlability, indexation, Core Web Vitals, and server configuration.",
    steps: [
      { title: "Scan", desc: "We analyse robots.txt, sitemaps, and server headers to understand crawl configuration." },
      { title: "Crawl", desc: "Simulate a search engine crawl to identify indexation issues and crawl budget waste." },
      { title: "Evaluate", desc: "Core Web Vitals, mobile rendering, and technical infrastructure are assessed." },
      { title: "Report", desc: "Get a prioritised list of technical issues with clear fix instructions." },
    ],
    stats: [
      { stat: "50+", label: "Technical Checks" },
      { stat: "30s", label: "Scan Time" },
      { stat: "4.8x", label: "Avg Traffic Gain" },
    ],
    recommendations: [
      { title: "Fix Indexation Blockers", desc: "Remove noindex directives on pages that should rank.", impact: "high" },
      { title: "Optimise Crawl Budget", desc: "Consolidate low-value pages and improve internal linking structure.", impact: "high" },
      { title: "Resolve Server Errors", desc: "Fix 4xx and 5xx status codes that waste crawl budget.", impact: "high" },
      { title: "Improve Core Web Vitals", desc: "Address LCP, CLS, and INP issues for better ranking signals.", impact: "medium" },
    ],
  },
};

const defaultSeo: ToolDetailConfig = {
  inputLabel: "Website URL",
  inputPlaceholder: "https://yourwebsite.com",
  buttonLabel: "Run Audit",
  runDescription: "Free tool. Enter a URL to get started. No sign-up required for basic results.",
  steps: [
    { title: "Analyse", desc: "We process your URL through our specialised analysis engine for this specific audit type." },
    { title: "Evaluate", desc: "Results are evaluated against industry benchmarks and best practices." },
    { title: "Score", desc: "A composite score is calculated based on multiple weighted factors." },
    { title: "Recommend", desc: "Get clear, actionable recommendations ranked by potential impact." },
  ],
  stats: [
    { stat: "99.9%", label: "Uptime" },
    { stat: "< 5s", label: "Results" },
    { stat: "Free", label: "No Sign-up" },
  ],
  recommendations: [
    { title: "Review Results Thoroughly", desc: "Each finding includes context and specific fix instructions.", impact: "high" },
    { title: "Prioritise by Impact", desc: "Focus on high-impact issues first for the fastest ROI.", impact: "high" },
    { title: "Track Changes Over Time", desc: "Create an account to monitor progress and measure improvements.", impact: "medium" },
    { title: "Combine with Related Tools", desc: "Use complementary tools in this category for a complete analysis.", impact: "low" },
  ],
};

const geoDetail: Record<string, ToolDetailConfig> = {
  "geo-readiness": {
    inputLabel: "Brand Name",
    inputPlaceholder: "Your Brand or URL",
    buttonLabel: "Check Readiness",
    runDescription: "Measure how prepared your brand is for AI-powered search across ChatGPT, Perplexity, and Google AI Overviews.",
    steps: [
      { title: "Search", desc: "We search multiple AI platforms for your brand, products, and key topics." },
      { title: "Analyse", desc: "Citations, entity signals, and content structure are evaluated for AI compatibility." },
      { title: "Score", desc: "A readiness score is calculated based on how well AI systems can understand your brand." },
      { title: "Optimise", desc: "Specific actions to improve your AI search presence are recommended." },
    ],
    stats: [
      { stat: "3", label: "AI Platforms Checked" },
      { stat: "50+", label: "Signal Checks" },
      { stat: "85%", label: "Avg Improvement" },
    ],
    recommendations: [
      { title: "Add Structured Data", desc: "Schema markup helps AI platforms understand your brand entities.", impact: "high" },
      { title: "Build Entity Authority", desc: "Increase consistent citations across authoritative sources.", impact: "high" },
      { title: "Optimise for Q&A", desc: "Structure content to directly answer questions AI surfaces.", impact: "medium" },
      { title: "Monitor AI Mentions", desc: "Track how AI platforms reference your brand over time.", impact: "medium" },
    ],
  },
};

const defaultGeo: ToolDetailConfig = {
  inputLabel: "Brand or URL",
  inputPlaceholder: "Your brand name or website",
  buttonLabel: "Analyse AI Presence",
  runDescription: "Free AI search analysis. Understand how your brand appears across generative AI platforms.",
  steps: [
    { title: "Search AI Platforms", desc: "We scan multiple AI sources for your brand signals and citations." },
    { title: "Analyse Signals", desc: "Entity relationships, citation consistency, and content structure are evaluated." },
    { title: "Score", desc: "An AI readiness score is calculated based on composite signal strength." },
    { title: "Improve", desc: "Targeted recommendations help strengthen your AI search presence." },
  ],
  stats: [
    { stat: "Multi-Platform", label: "AI Search Check" },
    { stat: "< 10s", label: "Results" },
    { stat: "Free", label: "No Sign-up" },
  ],
  recommendations: [
    { title: "Strengthen Entity Signals", desc: "Consistent NAP, schema, and citations build AI trust.", impact: "high" },
    { title: "Create Q&A Content", desc: "Structure content to answer questions AI systems surface.", impact: "high" },
    { title: "Build Citation Authority", desc: "Get mentioned on authoritative sites in your industry.", impact: "medium" },
    { title: "Monitor Competitors", desc: "Track how competitors appear in AI search results.", impact: "medium" },
  ],
};

const websiteDetail: Record<string, ToolDetailConfig> = {
  "landing-page-grader": {
    inputLabel: "Landing Page URL",
    inputPlaceholder: "https://yoursite.com/landing-page",
    buttonLabel: "Grade Page",
    runDescription: "Score your landing page based on design, copy, speed, mobile experience, and conversion signals.",
    steps: [
      { title: "Analyse", desc: "Your page is analysed for design quality, copy effectiveness, and technical performance." },
      { title: "Score", desc: "A composite grade is calculated across 5 key dimensions of landing page quality." },
      { title: "Compare", desc: "Your score is benchmarked against industry best practices and top performers." },
      { title: "Improve", desc: "Specific, actionable recommendations are provided for each dimension." },
    ],
    stats: [
      { stat: "5", label: "Dimensions" },
      { stat: "50+", label: "Checkpoints" },
      { stat: "2x", label: "Avg Conversion Lift" },
    ],
    recommendations: [
      { title: "Optimise Above the Fold", desc: "Hero section clarity and speed directly impact conversion rates.", impact: "high" },
      { title: "Improve Copy Clarity", desc: "Value proposition and CTA copy should be immediately understandable.", impact: "high" },
      { title: "Speed Up Load Time", desc: "Every 100ms improvement correlates with higher conversion rates.", impact: "medium" },
      { title: "Add Social Proof", desc: "Testimonials, logos, and case studies build trust and credibility.", impact: "medium" },
    ],
  },
};

const defaultWebsite: ToolDetailConfig = {
  inputLabel: "URL to Check",
  inputPlaceholder: "https://yourwebsite.com",
  buttonLabel: "Run Check",
  runDescription: "Free technical analysis. Enter a URL to evaluate its quality and performance.",
  steps: [
    { title: "Scan", desc: "Your URL is scanned for technical quality, performance, and best practices." },
    { title: "Analyse", desc: "Multiple dimensions are evaluated against industry standards." },
    { title: "Score", desc: "Results are compiled into a comprehensive quality score." },
    { title: "Recommend", desc: "Actionable improvements are prioritised by potential impact." },
  ],
  stats: [
    { stat: "Comprehensive", label: "Analysis" },
    { stat: "< 10s", label: "Results" },
    { stat: "Free", label: "No Sign-up" },
  ],
  recommendations: [
    { title: "Address Critical Issues", desc: "Fix high-severity problems that significantly impact performance.", impact: "high" },
    { title: "Follow Best Practices", desc: "Align with web standards and industry recommendations.", impact: "high" },
    { title: "Monitor Regularly", desc: "Track changes over time to catch regressions early.", impact: "medium" },
    { title: "Test Across Devices", desc: "Ensure consistent experience across desktop, tablet, and mobile.", impact: "medium" },
  ],
};

const contentDetail: Record<string, ToolDetailConfig> = {
  "content-brief": {
    inputLabel: "Topic or Keyword",
    inputPlaceholder: "e.g., technical SEO guide",
    buttonLabel: "Generate Brief",
    runDescription: "Create a comprehensive SEO content brief with target keywords, SERP analysis, and structure recommendations.",
    steps: [
      { title: "Analyse SERP", desc: "Top-ranking pages are analysed for content patterns, structure, and keyword usage." },
      { title: "Research", desc: "Related topics, questions, and semantic terms are gathered from search data." },
      { title: "Structure", desc: "An optimised outline is generated with heading hierarchy and keyword placement." },
      { title: "Brief", desc: "A complete content brief is produced with all specifications and guidelines." },
    ],
    stats: [
      { stat: "10", label: "SERPs Analysed" },
      { stat: "< 30s", label: "Generation" },
      { stat: "68%", label: "Higher Rankings" },
    ],
    recommendations: [
      { title: "Follow the Structure", desc: "The generated heading hierarchy is based on what ranks best.", impact: "high" },
      { title: "Hit Target Word Count", desc: "Content length recommendations are based on top-ranking page analysis.", impact: "high" },
      { title: "Cover Related Questions", desc: "Including People Also Ask questions improves topical authority.", impact: "medium" },
      { title: "Use Natural Keyword Placement", desc: "Keywords should flow naturally — never force placement.", impact: "medium" },
    ],
  },
};

const defaultContent: ToolDetailConfig = {
  inputLabel: "Content or Topic",
  inputPlaceholder: "Paste content or enter a topic",
  buttonLabel: "Analyse",
  runDescription: "Free content analysis tool. Enter content or a topic to receive insights and recommendations.",
  steps: [
    { title: "Analyse", desc: "Your content is analysed for structure, quality, and SEO optimisation." },
    { title: "Score", desc: "Multiple quality dimensions are scored against best practices." },
    { title: "Compare", desc: "Results are benchmarked against top-performing content in your space." },
    { title: "Improve", desc: "Specific recommendations help strengthen your content." },
  ],
  stats: [
    { stat: "Deep", label: "Content Analysis" },
    { stat: "< 10s", label: "Results" },
    { stat: "Free", label: "No Sign-up" },
  ],
  recommendations: [
    { title: "Improve Readability", desc: "Use shorter sentences and simpler language for broader audience reach.", impact: "high" },
    { title: "Strengthen Structure", desc: "Clear heading hierarchy improves both SEO and reader experience.", impact: "high" },
    { title: "Add Relevant Media", desc: "Images, videos, and infographics increase engagement and time on page.", impact: "medium" },
    { title: "Include Internal Links", desc: "Link to related content to build topical authority and reduce bounce rate.", impact: "medium" },
  ],
};

const adDetail: Record<string, ToolDetailConfig> = {
  "ads-calculator": {
    inputLabel: "Monthly Budget",
    inputPlaceholder: "e.g., 5000",
    buttonLabel: "Calculate",
    runDescription: "Estimate your Google Ads costs, clicks, and ROAS based on keywords, industry benchmarks, and budget scenarios.",
    steps: [
      { title: "Input", desc: "Enter your budget, target keywords, and industry for benchmark data." },
      { title: "Calculate", desc: "Estimated clicks, impressions, CPC, and conversions are computed." },
      { title: "Project", desc: "ROAS projections are calculated based on conversion rates and average order value." },
      { title: "Optimise", desc: "Recommendations for budget allocation and bid strategy are provided." },
    ],
    stats: [
      { stat: "Real-Time", label: "Calculations" },
      { stat: "Industry", label: "Benchmarks" },
      { stat: "Multi-Scenario", label: "Comparison" },
    ],
    recommendations: [
      { title: "Focus on High-Intent Keywords", desc: "Commercial and transactional keywords drive the best ROAS.", impact: "high" },
      { title: "Monitor Quality Score", desc: "Higher quality scores reduce CPC and improve ad position.", impact: "high" },
      { title: "Use Negative Keywords", desc: "Filter out irrelevant traffic to reduce wasted spend.", impact: "medium" },
      { title: "Test Different Bids", desc: "Experiment with bid strategies to find the optimal balance.", impact: "medium" },
    ],
  },
  "utm-builder": {
    inputLabel: "Page URL",
    inputPlaceholder: "https://yourwebsite.com/page",
    buttonLabel: "Generate URL",
    runDescription: "Build consistent UTM-tagged URLs for your campaigns with proper naming conventions.",
    steps: [
      { title: "Enter URL", desc: "Paste the base URL you want to track." },
      { title: "Set Parameters", desc: "Add campaign source, medium, name, content, and term." },
      { title: "Generate", desc: "A properly formatted UTM URL is created instantly." },
      { title: "Copy & Use", desc: "Copy the generated URL and use it in your campaigns." },
    ],
    stats: [
      { stat: "Instant", label: "Generation" },
      { stat: "Consistent", label: "Naming" },
      { stat: "GA4-Ready", label: "Tracking" },
    ],
    recommendations: [
      { title: "Use Consistent Naming", desc: "Standardised naming conventions make reporting cleaner and more accurate.", impact: "high" },
      { title: "Always Tag External Links", desc: "Every external campaign link should have UTM parameters for proper attribution.", impact: "high" },
      { title: "Include Content Parameter", desc: "Use the content field to A/B test different creative versions.", impact: "medium" },
      { title: "Document Your Convention", desc: "Share your naming convention with the team to ensure consistency.", impact: "medium" },
    ],
  },
};

const defaultAd: ToolDetailConfig = {
  inputLabel: "Campaign Data",
  inputPlaceholder: "Enter your campaign details",
  buttonLabel: "Calculate",
  runDescription: "Free advertising calculator. Enter your campaign parameters to get instant estimates and projections.",
  steps: [
    { title: "Input", desc: "Enter your campaign parameters — budget, targets, and benchmarks." },
    { title: "Calculate", desc: "Key metrics are computed based on your inputs and industry data." },
    { title: "Visualise", desc: "Results are displayed in easy-to-understand charts and projections." },
    { title: "Optimise", desc: "Recommendations help improve campaign performance and ROAS." },
  ],
  stats: [
    { stat: "Instant", label: "Results" },
    { stat: "Industry", label: "Benchmarks" },
    { stat: "Free", label: "No Sign-up" },
  ],
  recommendations: [
    { title: "Set Clear KPIs", desc: "Define measurable goals before launching any campaign.", impact: "high" },
    { title: "Track Everything", desc: "Proper tracking and attribution are essential for optimisation.", impact: "high" },
    { title: "Test & Iterate", desc: "Continuous A/B testing improves campaign performance over time.", impact: "medium" },
    { title: "Monitor Competitors", desc: "Keep an eye on competitor ad strategies and adjust accordingly.", impact: "medium" },
  ],
};

const localDetail: Record<string, ToolDetailConfig> = {
  "local-seo-audit": {
    inputLabel: "Business Name",
    inputPlaceholder: "Your business name or URL",
    buttonLabel: "Audit Local SEO",
    runDescription: "Comprehensive local search presence analysis across Google Business Profile, citations, reviews, and local content.",
    steps: [
      { title: "Find", desc: "Your business is located across directories, maps, and local platforms." },
      { title: "Analyse", desc: "GBP completeness, citation consistency, review sentiment, and local content are evaluated." },
      { title: "Score", desc: "A local SEO health score is calculated across all presence dimensions." },
      { title: "Improve", desc: "Actionable steps to improve local search visibility are recommended." },
    ],
    stats: [
      { stat: "50+", label: "Directories" },
      { stat: "10+", label: "Signal Checks" },
      { stat: "3x", label: "Local Pack Lift" },
    ],
    recommendations: [
      { title: "Complete GBP Profile", desc: "Fill every field in your Google Business Profile for maximum visibility.", impact: "high" },
      { title: "Fix NAP Inconsistencies", desc: "Consistent name, address, and phone across all listings is critical.", impact: "high" },
      { title: "Get More Reviews", desc: "Positive reviews directly impact local pack rankings and click-through rates.", impact: "high" },
      { title: "Create Local Content", desc: "Location-specific pages and content boost local search relevance.", impact: "medium" },
    ],
  },
};

const defaultLocal: ToolDetailConfig = {
  inputLabel: "Business Info",
  inputPlaceholder: "Your business name or location",
  buttonLabel: "Check Local Presence",
  runDescription: "Free local marketing analysis. Enter your business details to evaluate your local search presence.",
  steps: [
    { title: "Search", desc: "Your business is searched across local platforms and directories." },
    { title: "Analyse", desc: "Local presence signals are evaluated for completeness and consistency." },
    { title: "Score", desc: "A local visibility score is calculated based on multiple factors." },
    { title: "Improve", desc: "Targeted recommendations help strengthen your local presence." },
  ],
  stats: [
    { stat: "Multi-Platform", label: "Local Check" },
    { stat: "< 30s", label: "Analysis" },
    { stat: "Free", label: "No Sign-up" },
  ],
  recommendations: [
    { title: "Verify All Listings", desc: "Claim and verify your business on all major platforms.", impact: "high" },
    { title: "Respond to Reviews", desc: "Engaging with reviews improves both rankings and customer trust.", impact: "high" },
    { title: "Use Local Keywords", desc: "Include location-specific terms in your content and meta data.", impact: "medium" },
    { title: "Monitor Competitors", desc: "Track competitor local strategies to identify opportunities.", impact: "medium" },
  ],
};

const prDetail: Record<string, ToolDetailConfig> = {
};

const defaultPr: ToolDetailConfig = {
  inputLabel: "Brand Name",
  inputPlaceholder: "Your brand or company name",
  buttonLabel: "Analyse Brand",
  runDescription: "Free PR and brand analysis. Enter your brand name to evaluate your media presence and authority signals.",
  steps: [
    { title: "Search", desc: "Your brand is searched across media outlets and online platforms." },
    { title: "Analyse", desc: "Mentions, sentiment, and authority signals are evaluated." },
    { title: "Score", desc: "A brand authority score is calculated based on composite signals." },
    { title: "Improve", desc: "Recommendations help strengthen your media presence and brand authority." },
  ],
  stats: [
    { stat: "Broad", label: "Media Scan" },
    { stat: "< 60s", label: "Analysis" },
    { stat: "Free", label: "No Sign-up" },
  ],
  recommendations: [
    { title: "Build Media Relationships", desc: "Cultivate connections with relevant journalists and publications.", impact: "high" },
    { title: "Monitor Regularly", desc: "Track brand mentions and sentiment to respond quickly.", impact: "high" },
    { title: "Create Newsworthy Content", desc: "Original research and data stories attract media attention.", impact: "medium" },
    { title: "Optimise Press Releases", desc: "Well-structured releases with quotes and data get better coverage.", impact: "medium" },
  ],
};

const businessDetail: Record<string, ToolDetailConfig> = {
  "ai-readiness-assessment": {
    inputLabel: "Company Name",
    inputPlaceholder: "Your company name",
    buttonLabel: "Assess Readiness",
    runDescription: "Evaluate your organisation's readiness to adopt AI across data, infrastructure, skills, and governance.",
    steps: [
      { title: "Survey", desc: "Key areas of your business are evaluated for AI readiness." },
      { title: "Analyse", desc: "Data infrastructure, team skills, and governance are assessed." },
      { title: "Score", desc: "A comprehensive AI readiness score is calculated across dimensions." },
      { title: "Roadmap", desc: "A phased AI adoption roadmap is created based on your readiness level." },
    ],
    stats: [
      { stat: "4", label: "Dimensions" },
      { stat: "40+", label: "Checkpoints" },
      { stat: "Custom", label: "Roadmap" },
    ],
    recommendations: [
      { title: "Audit Data Infrastructure", desc: "Clean, accessible data is the foundation of any AI initiative.", impact: "high" },
      { title: "Upskill Your Team", desc: "Invest in AI literacy and training across your organisation.", impact: "high" },
      { title: "Start Small", desc: "Begin with a pilot project to demonstrate value before scaling.", impact: "medium" },
      { title: "Establish Governance", desc: "Create policies for AI ethics, data privacy, and risk management.", impact: "medium" },
    ],
  },
};

const defaultBusiness: ToolDetailConfig = {
  inputLabel: "Project Details",
  inputPlaceholder: "Describe your project or requirements",
  buttonLabel: "Generate Estimate",
  runDescription: "Free business analysis tool. Enter your requirements to get estimates and recommendations.",
  steps: [
    { title: "Input", desc: "Enter your project requirements, scope, and constraints." },
    { title: "Analyse", desc: "Your inputs are evaluated against industry data and best practices." },
    { title: "Calculate", desc: "Estimates for cost, timeline, and resources are generated." },
    { title: "Plan", desc: "A recommended approach with next steps is provided." },
  ],
  stats: [
    { stat: "Data-Driven", label: "Estimates" },
    { stat: "< 30s", label: "Results" },
    { stat: "Free", label: "No Sign-up" },
  ],
  recommendations: [
    { title: "Define Clear Requirements", desc: "Well-defined scope leads to more accurate estimates.", impact: "high" },
    { title: "Consider Total Cost", desc: "Factor in maintenance, training, and ongoing costs.", impact: "high" },
    { title: "Start with MVP", desc: "A minimum viable product reduces risk and accelerates time to value.", impact: "medium" },
    { title: "Plan for Scale", desc: "Design systems that can grow with your business needs.", impact: "medium" },
  ],
};

const categoryDefaults: Record<string, ToolDetailConfig> = {
  "SEO Tools": defaultSeo,
  "GEO & AI Search Tools": defaultGeo,
  "Website Audit Tools": defaultWebsite,
  "Content Tools": defaultContent,
  "Advertising Tools": defaultAd,
  "Local Marketing Tools": defaultLocal,
  "PR & Brand Tools": defaultPr,
  "Business & AI Tools": defaultBusiness,
};

const toolOverrides: Record<string, Record<string, ToolDetailConfig>> = {
  "SEO Tools": seoDetail,
  "GEO & AI Search Tools": geoDetail,
  "Website Audit Tools": websiteDetail,
  "Content Tools": contentDetail,
  "Advertising Tools": adDetail,
  "Local Marketing Tools": localDetail,
  "PR & Brand Tools": prDetail,
  "Business & AI Tools": businessDetail,
};

export function getToolDetailConfig(slug: string, category: string): ToolDetailConfig {
  const overrides = toolOverrides[category];
  if (overrides && overrides[slug]) {
    return overrides[slug];
  }
  return categoryDefaults[category] || defaultSeo;
}
