export interface IndustryItem {
  name: string;
  slug: string;
  shortDesc: string;
  description: string;
  challenges: string[];
  relevantServices: string[];
  relevantTools: string[];
  icon: string;
}

export const industries: IndustryItem[] = [
  {
    name: "Dental & Healthcare",
    slug: "dental-healthcare",
    icon: "Heartbeat",
    shortDesc: "Digital growth for dental practices, clinics, and healthcare providers looking to attract more patients and streamline operations.",
    description: "Healthcare is one of the most competitive digital landscapes. Patients research providers online, compare reviews, and expect seamless booking experiences. We help dental practices, clinics, and healthcare groups dominate local search, manage reputation, and automate patient acquisition.",
    challenges: [
      "Highly competitive local search for every treatment type",
      "Patient acquisition increasingly driven by online reviews",
      "Complex regulations around healthcare marketing and data",
      "Multi-location practices struggle with consistent local SEO",
      "Booking and patient communication still rely on phone calls",
    ],
    relevantServices: ["local-seo", "seo-strategy", "reputation-management", "content-strategy", "customer-portals", "google-ads"],
    relevantTools: ["local-seo-audit", "seo-audit", "ads-calculator"],
  },
  {
    name: "Business Setup & Corporate Services",
    slug: "business-setup-corporate-services",
    icon: "Briefcase",
    shortDesc: "Grow your corporate services firm with targeted SEO, thought leadership, and automated client acquisition systems.",
    description: "Business setup firms, corporate service providers, and consultancy firms operate in a trust-based industry. Prospects research extensively before engaging. We build authority through content, capture demand through SEO, and convert through targeted paid media and automated follow-up.",
    challenges: [
      "Long sales cycles require sustained content engagement",
      "Authority and trust are the primary purchase drivers",
      "Competing with established firms for the same keywords",
      "Referral-dependent growth is hard to scale",
      "Multi-service offerings need clear information architecture",
    ],
    relevantServices: ["content-strategy", "seo-strategy", "digital-pr", "thought-leadership", "lead-qualification-automation", "google-ads"],
    relevantTools: ["seo-audit", "content-brief"],
  },
  {
    name: "Exhibitions & Events",
    slug: "exhibitions-events",
    icon: "CalendarBlank",
    shortDesc: "Drive attendance and visibility for exhibitions, conferences, and events through search, content, and paid media.",
    description: "Events and exhibitions face a unique challenge — they need to build visibility and drive registrations within strict timeframes. We help event organisers dominate search for event-related queries, build authority through content, and drive ticket sales through targeted campaigns.",
    challenges: [
      "Time-limited campaigns need fast indexation and ranking",
      "Competitive keywords with high cost per click",
      "Year-on-year events need preserved SEO equity",
      "Attendee acquisition requires multi-channel approach",
      "Post-event content needs to capture ongoing search demand",
    ],
    relevantServices: ["seo-strategy", "content-development", "google-ads", "paid-social", "digital-pr", "email-marketing"],
    relevantTools: ["seo-audit", "ads-calculator"],
  },
  {
    name: "Professional Services",
    slug: "professional-services",
    icon: "Target",
    shortDesc: "Help professional service firms attract better clients through authority building, search visibility, and automated intake.",
    description: "Consultants, accountants, architects, and other professional service providers win clients through reputation and trust. We build digital authority that mirrors your real-world expertise — through thought leadership content, targeted search presence, and systems that make it easy for prospects to engage.",
    challenges: [
      "Client decisions driven by trust and proven expertise",
      "Long consideration cycles require sustained nurturing",
      "Professional regulations limit some marketing approaches",
      "Referral-based growth needs digital amplification",
      "Differentiating from equally qualified competitors",
    ],
    relevantServices: ["content-strategy", "digital-pr", "seo-strategy", "thought-leadership", "lead-qualification-automation", "client-portals"],
    relevantTools: ["seo-audit", "content-brief"],
  },
  {
    name: "Legal Services",
    slug: "legal-services",
    icon: "Scales",
    shortDesc: "Dominate legal search with practice-area SEO, reputation management, and client intake automation.",
    description: "Legal is one of the most competitive and highest-value search verticals. Clients search for specific practice areas, compare firms, and make decisions based on authority signals. We help law firms own their practice areas in search, manage reputation across review platforms, and automate client intake.",
    challenges: [
      "Extremely competitive for high-value practice areas",
      "Strict advertising regulations vary by jurisdiction",
      "Client acquisition cost is high across all channels",
      "Reputation and reviews drive hiring decisions",
      "Multi-practice firms need complex site architecture",
    ],
    relevantServices: ["local-seo", "seo-strategy", "content-strategy", "reputation-management", "google-ads", "lead-qualification-automation"],
    relevantTools: ["local-seo-audit", "seo-audit"],
  },
  {
    name: "Cleaning & Facilities",
    slug: "cleaning-facilities",
    icon: "Broom",
    shortDesc: "Scale your cleaning or facilities business with local SEO, targeted ads, and automated quote systems.",
    description: "Cleaning and facilities management businesses win contracts through local presence and quick response times. We optimise for local search, build review authority, and automate the quote-to-booking process so you capture more commercial and residential clients.",
    challenges: [
      "Intense local competition for every service area",
      "Quote requests need fast response to convert",
      "Seasonal demand fluctuations require flexible marketing",
      "B2B contracts have longer sales cycles",
      "Review volume directly impacts local rankings",
    ],
    relevantServices: ["local-seo", "google-ads", "reputation-management", "workflow-automation", "landing-pages", "seo-strategy"],
    relevantTools: ["local-seo-audit", "ads-calculator"],
  },
  {
    name: "Real Estate",
    slug: "real-estate",
    icon: "House",
    shortDesc: "Dominate real estate search with local SEO, property listings optimisation, and automated lead nurturing.",
    description: "Real estate is hyper-local and hyper-competitive. Agents, agencies, and property portals compete for the same buyers, sellers, and renters. We help you own your market through local search dominance, optimised property listings, and systems that nurture leads until they're ready to transact.",
    challenges: [
      "Extreme local competition for every market",
      "Property listings need individual SEO optimisation",
      "Lead response time directly impacts conversion",
      "Seasonal market shifts require agile strategy",
      "Multi-agent offices need scalable local presence",
    ],
    relevantServices: ["local-seo", "seo-strategy", "google-ads", "content-development", "lead-qualification-automation", "custom-crm-development"],
    relevantTools: ["local-seo-audit", "seo-audit"],
  },
  {
    name: "E-commerce",
    slug: "ecommerce",
    icon: "ShoppingCart",
    shortDesc: "Grow your online store with e-commerce SEO, product feed optimisation, and conversion-focused paid media.",
    description: "E-commerce is the most competitive digital channel. Product pages, category pages, and brand pages all need individual optimisation. We help online stores drive organic traffic to product pages, optimise shopping feeds, and run profitable paid campaigns that scale with your inventory.",
    challenges: [
      "Product pages need individual SEO at scale",
      "Shopping feed optimisation requires constant management",
      "Seasonal peaks demand flexible marketing capacity",
      "Competitive pricing makes organic traffic critical for margins",
      "Site speed and mobile experience directly impact conversion",
    ],
    relevantServices: ["ecommerce-seo", "seo-strategy", "google-ads", "content-development", "performance-optimisation", "email-marketing"],
    relevantTools: ["seo-audit", "technical-seo-checker", "ads-calculator", "content-brief"],
  },
  {
    name: "Hospitality",
    slug: "hospitality",
    icon: "Sparkle",
    shortDesc: "Attract more guests with hospitality SEO, local visibility, and direct booking optimisation.",
    description: "Hotels, restaurants, and hospitality businesses live and die by their online presence. Guests research on Google, read reviews, and book directly or through OTAs. We help hospitality brands dominate local search, manage reputation, and drive direct bookings that improve margins.",
    challenges: [
      "OTA dominance makes direct booking SEO critical",
      "Review volume and sentiment directly impact bookings",
      "Local search is the primary acquisition channel",
      "Seasonal demand requires agile marketing strategy",
      "Visual content quality affects engagement and conversion",
    ],
    relevantServices: ["local-seo", "seo-strategy", "reputation-management", "content-development", "google-ads", "landing-pages"],
    relevantTools: ["local-seo-audit", "seo-audit"],
  },
  {
    name: "Education",
    slug: "education",
    icon: "GraduationCap",
    shortDesc: "Attract more students and learners with education SEO, content marketing, and automated enrolment systems.",
    description: "Education is a high-consideration, long-cycle industry. Schools, universities, and training providers compete for student attention across search, content, and paid channels. We help educational institutions build authority, capture programme-specific search demand, and automate enrolment workflows.",
    challenges: [
      "Long enrolment cycles require sustained nurturing",
      "International students need multi-language SEO",
      "Course and programme pages need individual optimisation",
      "Accreditation and regulatory requirements limit messaging",
      "Competing with established institutions for brand recognition",
    ],
    relevantServices: ["seo-strategy", "content-strategy", "google-ads", "email-marketing", "lead-qualification-automation", "international-seo"],
    relevantTools: ["seo-audit", "ads-calculator"],
  },
  {
    name: "Local Service Businesses",
    slug: "local-service-businesses",
    icon: "MapPin",
    shortDesc: "Help local service businesses get found, booked, and paid with local SEO and automated scheduling.",
    description: "Plumbers, electricians, landscapers, cleaners, and every local service business needs to be found when customers search. We build complete local visibility systems — Google Business Profile optimisation, local citations, review management, and automated booking that turns searchers into paying customers.",
    challenges: [
      "Extreme local competition for every service area",
      "Review volume directly impacts local pack rankings",
      "Quote-to-booking speed determines conversion rate",
      "Seasonal demand requires flexible marketing spend",
      "Multi-service offerings need clear local landing pages",
    ],
    relevantServices: ["local-seo", "seo-strategy", "google-ads", "reputation-management", "booking-platforms", "lead-qualification-automation"],
    relevantTools: ["local-seo-audit", "seo-audit", "ads-calculator"],
  },
  {
    name: "SaaS & Technology",
    slug: "saas-technology",
    icon: "Code",
    shortDesc: "Scale your SaaS with technical SEO, content marketing, and product-led growth systems.",
    description: "SaaS and technology companies face unique growth challenges — long sales cycles, technical audiences, and intense competition for every keyword. We help B2B and B2C SaaS companies own their category in search, build authority through technical content, and automate lead qualification.",
    challenges: [
      "Highly competitive for every product category keyword",
      "Technical audiences demand depth over promotional content",
      "Long B2B sales cycles need multi-touch nurturing",
      "Product-led growth requires search-optimised documentation",
      "Competitor content strategies evolve rapidly",
    ],
    relevantServices: ["seo-strategy", "content-strategy", "technical-seo", "saas-development", "lead-qualification-automation", "analytics-setup"],
    relevantTools: ["seo-audit", "technical-seo-checker", "content-brief"],
  },
  {
    name: "Disability & Care Services",
    slug: "disability-care-services",
    icon: "Heart",
    shortDesc: "Connect with families and care seekers through compassionate SEO, local visibility, and accessible digital experiences.",
    description: "Disability and care services help families find the support they need. This is a trust-driven, emotionally sensitive industry where search visibility directly impacts the people who need care most. We help care providers build local presence, create accessible digital experiences, and connect with families at the moment they're searching.",
    challenges: [
      "Trust and compassion are the primary purchase drivers",
      "Local search is critical for families seeking nearby care",
      "Accessibility requirements extend to digital platforms",
      "Regulatory compliance affects marketing messaging",
      "Referral networks need digital amplification",
    ],
    relevantServices: ["local-seo", "seo-strategy", "content-strategy", "accessibility-improvement", "reputation-management", "client-portals"],
    relevantTools: ["local-seo-audit", "seo-audit"],
  },
];

export function getIndustry(slug: string): IndustryItem | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return industries.map((i) => i.slug);
}
