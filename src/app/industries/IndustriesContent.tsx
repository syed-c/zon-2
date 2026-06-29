"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ShapeGrid from "@/components/ShapeGrid";
import {
  ArrowRight, ArrowLineUpRight, CaretRight, CaretDown, Mouse,
  MagnifyingGlass, Graph, Lightning, SealCheck, ChartLineUp,
  CurrencyDollar, Star, Eye, Gear, Robot, ArrowArcRight, Clock,
  Users, Wrench, Building, Storefront, Globe, Handshake, PuzzlePiece,
  Circle, Plus, Heartbeat, Briefcase, CalendarBlank, Target, Scales,
  Broom, House, ShoppingCart, Sparkle, GraduationCap, MapPin, Code,
  Heart,
} from "@phosphor-icons/react";
import { industries } from "@/data/industries";
import type { IndustryItem } from "@/data/industries";

const iconMap: Record<string, React.ElementType> = {
  Heartbeat, Briefcase, CalendarBlank, Target, Scales, Broom, House,
  ShoppingCart, Sparkle, GraduationCap, MapPin, Code, Heart,
};

const ease = [0.32, 0.72, 0, 1] as const;

/* ─── CSS ANIMATIONS ─── */

const animStyles = `
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeInCard { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes fadeInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  .animate-fadeIn { animation: fadeInCard 0.5s both ease-out; }
  .animate-fadeInLeft { animation: fadeInLeft 0.4s both ease-out; }
  .animate-fadeInRight { animation: fadeInRight 0.4s both ease-out; }
`;

/* ─── EXTENDED DATA ─── */

const featuredIndustries = ["Healthcare", "Legal", "SaaS & Technology", "E-commerce"];

const industryMetrics: Record<string, {
  trafficPotential: number; competitionLevel: number; automationOpportunity: number;
  leadQuality: number; revenueImpact: number; searchDemand: number; aiVisibility: number;
}> = {
  "Dental & Healthcare": { trafficPotential: 78, competitionLevel: 82, automationOpportunity: 55, leadQuality: 88, revenueImpact: 76, searchDemand: 91, aiVisibility: 45 },
  "Business Setup & Corporate Services": { trafficPotential: 65, competitionLevel: 72, automationOpportunity: 60, leadQuality: 85, revenueImpact: 80, searchDemand: 58, aiVisibility: 50 },
  "Exhibitions & Events": { trafficPotential: 70, competitionLevel: 65, automationOpportunity: 45, leadQuality: 75, revenueImpact: 72, searchDemand: 80, aiVisibility: 35 },
  "Professional Services": { trafficPotential: 68, competitionLevel: 78, automationOpportunity: 58, leadQuality: 82, revenueImpact: 78, searchDemand: 62, aiVisibility: 48 },
  "Legal Services": { trafficPotential: 85, competitionLevel: 92, automationOpportunity: 42, leadQuality: 90, revenueImpact: 88, searchDemand: 88, aiVisibility: 52 },
  "Cleaning & Facilities": { trafficPotential: 72, competitionLevel: 80, automationOpportunity: 65, leadQuality: 70, revenueImpact: 65, searchDemand: 85, aiVisibility: 30 },
  "Real Estate": { trafficPotential: 88, competitionLevel: 88, automationOpportunity: 50, leadQuality: 80, revenueImpact: 85, searchDemand: 92, aiVisibility: 55 },
  "E-commerce": { trafficPotential: 95, competitionLevel: 95, automationOpportunity: 70, leadQuality: 75, revenueImpact: 92, searchDemand: 96, aiVisibility: 65 },
  "Hospitality": { trafficPotential: 82, competitionLevel: 78, automationOpportunity: 55, leadQuality: 78, revenueImpact: 80, searchDemand: 90, aiVisibility: 48 },
  "Education": { trafficPotential: 72, competitionLevel: 75, automationOpportunity: 52, leadQuality: 85, revenueImpact: 70, searchDemand: 78, aiVisibility: 58 },
  "Local Service Businesses": { trafficPotential: 76, competitionLevel: 84, automationOpportunity: 68, leadQuality: 72, revenueImpact: 68, searchDemand: 88, aiVisibility: 32 },
  "SaaS & Technology": { trafficPotential: 90, competitionLevel: 92, automationOpportunity: 75, leadQuality: 88, revenueImpact: 90, searchDemand: 85, aiVisibility: 78 },
  "Disability & Care Services": { trafficPotential: 60, competitionLevel: 62, automationOpportunity: 58, leadQuality: 82, revenueImpact: 72, searchDemand: 70, aiVisibility: 40 },
};

const industryFrameworks: Record<string, { step: string; title: string; desc: string }[]> = {
  "Dental & Healthcare": [
    { step: "01", title: "Local Audit", desc: "Analyse GBP presence, citation accuracy, review profile, and competitor landscape." },
    { step: "02", title: "Patient Journey", desc: "Map the full patient journey from symptoms search to booking to follow-up." },
    { step: "03", title: "Content System", desc: "Build treatment-specific landing pages, FAQs, and patient education content." },
    { step: "04", title: "Reputation Engine", desc: "Deploy review generation pipeline and response automation system." },
    { step: "05", title: "Booking Flow", desc: "Integrate online booking, automated reminders, and patient intake automation." },
  ],
  "Legal Services": [
    { step: "01", title: "Practice Area Map", desc: "Identify highest-value practice areas and map search demand by jurisdiction." },
    { step: "02", title: "Authority Foundation", desc: "Build practice-area hubs, thought leadership, and directory profiles." },
    { step: "03", title: "Digital PR Engine", desc: "Create newsworthy legal insights, media relationships, and citation strategy." },
    { step: "04", title: "Review System", desc: "Generate client reviews across Google, Yelp, and Avvo while staying compliant." },
    { step: "05", title: "Intake Automation", desc: "Deploy AI lead qualification, automated follow-up, and case management integration." },
  ],
  "SaaS & Technology": [
    { step: "01", title: "Product-Market-SEO", desc: "Map every feature, use case, and competitor to search demand." },
    { step: "02", title: "Technical Foundation", desc: "Audit site architecture, crawl efficiency, indexation, and Core Web Vitals." },
    { step: "03", title: "Content Cluster", desc: "Build topic clusters, documentation SEO, comparison pages, and thought leadership." },
    { step: "04", title: "Conversion System", desc: "Optimise trial-to-paid funnel, demo booking, and lead scoring." },
    { step: "05", title: "Scale & Defend", desc: "Expand into adjacent keywords, defend branded search, automate content production." },
  ],
  "E-commerce": [
    { step: "01", title: "Product Taxonomy", desc: "Audit information architecture, category structure, and product page hierarchy." },
    { step: "02", title: "Scale Optimisation", desc: "Optimise every product page, category page, and filter combination at scale." },
    { step: "03", title: "Feed Management", desc: "Build and optimise shopping feeds across Google, Meta, and comparison engines." },
    { step: "04", title: "Conversion Architecture", desc: "Optimise product pages, checkout flow, cart abandonment, and cross-sells." },
    { step: "05", title: "Seasonal Playbook", desc: "Build year-round content calendar, promotional strategy, and peak readiness." },
  ],
  "Business Setup & Corporate Services": [
    { step: "01", title: "Service Architecture", desc: "Map every service offering to search intent and buyer journey stage." },
    { step: "02", title: "Authority Content", desc: "Build in-depth guides, jurisdiction comparisons, and regulatory explainers." },
    { step: "03", title: "Trust Signals", desc: "Deploy client testimonials, case studies, accreditations, and media coverage." },
    { step: "04", title: "Lead Nurture", desc: "Design automated email sequences, content downloads, and consultation booking." },
    { step: "05", title: "Referral Amplification", desc: "Build partner network SEO, referral landing pages, and affiliate tracking." },
  ],
  "Exhibitions & Events": [
    { step: "01", title: "Event Foundation", desc: "Build event-specific SEO architecture, venue pages, and speaker content." },
    { step: "02", title: "Demand Capture", desc: "Target attendee search queries, speaker names, and industry-specific terms." },
    { step: "03", title: "Ticket Conversion", desc: "Optimise registration flow, early-bird offers, and email nurture sequences." },
    { step: "04", title: "Live Amplification", desc: "Deploy real-time content, social amplification, and media outreach during event." },
    { step: "05", title: "Post-Event Equity", desc: "Capture ongoing search demand with recordings, recaps, and evergreen content." },
  ],
  "Professional Services": [
    { step: "01", title: "Expertise Map", desc: "Map every service line, sector specialism, and client persona to search intent." },
    { step: "02", title: "Thought Leadership", desc: "Build authoritative content showcasing methodology, insights, and results." },
    { step: "03", title: "Digital PR", desc: "Position founders and senior team as industry voices across media and events." },
    { step: "04", title: "Client Acquisition", desc: "Design multi-channel nurture, case study library, and seamless consultation booking." },
    { step: "05", title: "Referral System", desc: "Systematise referral generation, partner co-marketing, and client advocacy." },
  ],
  "Cleaning & Facilities": [
    { step: "01", title: "Local Dominance", desc: "Optimise GBP, local citations, and service-area landing pages for every location." },
    { step: "02", title: "Review Pipeline", desc: "Deploy automated review requests, response templates, and reputation monitoring." },
    { step: "03", title: "Quote Conversion", desc: "Streamline quote requests with instant response automation and follow-up sequences." },
    { step: "04", title: "Service Pages", desc: "Build dedicated pages for every service type, each optimised for local search." },
    { step: "05", title: "Contract Retention", desc: "Implement account management portal, renewal automation, and upsell campaigns." },
  ],
  "Real Estate": [
    { step: "01", title: "Market Intelligence", desc: "Analyse local market conditions, competitor presence, and search demand patterns." },
    { step: "02", title: "Local SEO", desc: "Optimise GBP, neighbourhood pages, and agent profiles for every target area." },
    { step: "03", title: "Listing Optimisation", desc: "SEO-optimise every property listing, virtual tour, and neighbourhood guide." },
    { step: "04", title: "Lead Response", desc: "Deploy instant response automation, SMS follow-up, and automated showing scheduling." },
    { step: "05", title: "Market Authority", desc: "Build neighbourhood content hubs, market reports, and agent authority pages." },
  ],
  "Hospitality": [
    { step: "01", title: "Local Foundations", desc: "Optimise GBP, OTAs, and direct booking pages for maximum local visibility." },
    { step: "02", title: "Review Management", desc: "Build review generation system, response templates, and sentiment analysis." },
    { step: "03", title: "Direct Booking", desc: "Optimise website conversion, rate comparison pages, and exclusive direct offers." },
    { step: "04", title: "Visual Content", desc: "Produce professional photography, virtual tours, and guest experience content." },
    { step: "05", title: "Seasonal Strategy", desc: "Build year-round content calendar, promotional calendar, and demand forecasting." },
  ],
  "Education": [
    { step: "01", title: "Programme Mapping", desc: "Map every course, programme, and qualification to search demand and competition." },
    { step: "02", title: "Content Authority", desc: "Build programme pages, faculty profiles, student outcomes, and accreditation content." },
    { step: "03", title: "International Search", desc: "Optimise for international student queries, multi-language content, and visa pages." },
    { step: "04", title: "Enrolment Flow", desc: "Design application journey, prospect nurturing, and enrolment automation." },
    { step: "05", title: "Alumni Network", desc: "Leverage alumni success stories, referral programmes, and employer partnerships." },
  ],
  "Local Service Businesses": [
    { step: "01", title: "GBP Optimisation", desc: "Full Google Business Profile optimisation, categories, services, and posts." },
    { step: "02", title: "Citation Build", desc: "Build consistent citations across all relevant local directories and platforms." },
    { step: "03", title: "Review Engine", desc: "Deploy automated review generation, smart response system, and reputation analytics." },
    { step: "04", title: "Service Landing Pages", desc: "Create dedicated landing pages for every service, location, and customer type." },
    { step: "05", title: "Booking Automation", desc: "Implement online booking, instant quoting, automated reminders, and follow-up." },
  ],
  "Disability & Care Services": [
    { step: "01", title: "Compassionate SEO", desc: "Build local visibility with sensitivity to the emotional nature of care decisions." },
    { step: "02", title: "Accessibility First", desc: "Ensure every digital touchpoint meets WCAG standards and inclusive design." },
    { step: "03", title: "Trust Building", desc: "Showcase accreditations, caregiver profiles, testimonials, and regulatory compliance." },
    { step: "04", title: "Family Journey", desc: "Map and optimise the family decision journey from research to care engagement." },
    { step: "05", title: "Care Automation", desc: "Deploy online enquiry, eligibility checker, intake forms, and care coordination." },
  ],
};

const industrySolutions: Record<string, { name: string; slug: string; icon: string; desc: string }[]> = {
  "Dental & Healthcare": [
    { name: "Local SEO", slug: "local-seo", icon: "MapPin", desc: "Dominate local dental search for every treatment." },
    { name: "SEO Strategy", slug: "seo-strategy", icon: "Target", desc: "Comprehensive organic growth for practices." },
    { name: "Reputation Management", slug: "reputation-management", icon: "Star", desc: "Build patient trust through review authority." },
    { name: "Content Strategy", slug: "content-strategy", icon: "Graph", desc: "Patient education content that converts." },
    { name: "Customer Portals", slug: "customer-portals", icon: "Heart", desc: "Seamless patient booking and communication." },
    { name: "Google Ads", slug: "google-ads", icon: "Lightning", desc: "Targeted paid campaigns for new patient acquisition." },
  ],
  "Legal Services": [
    { name: "Local SEO", slug: "local-seo", icon: "MapPin", desc: "Practice-area local search dominance." },
    { name: "SEO Strategy", slug: "seo-strategy", icon: "Target", desc: "Organic visibility for high-value practice areas." },
    { name: "Content Strategy", slug: "content-strategy", icon: "Graph", desc: "Legal content that builds authority." },
    { name: "Reputation Management", slug: "reputation-management", icon: "Star", desc: "Review generation and response automation." },
    { name: "Google Ads", slug: "google-ads", icon: "Lightning", desc: "Paid search for high-intent legal queries." },
    { name: "Lead Qualification Automation", slug: "lead-qualification-automation", icon: "Robot", desc: "AI-powered client intake and qualification." },
  ],
  "SaaS & Technology": [
    { name: "SEO Strategy", slug: "seo-strategy", icon: "Target", desc: "Category-defining organic search strategy." },
    { name: "Content Strategy", slug: "content-strategy", icon: "Graph", desc: "Technical content that converts developers." },
    { name: "Technical SEO", slug: "technical-seo", icon: "Gear", desc: "Site architecture and indexation optimisation." },
    { name: "SaaS Development", slug: "saas-development", icon: "Code", desc: "Custom product and platform development." },
    { name: "Lead Qualification Automation", slug: "lead-qualification-automation", icon: "Robot", desc: "Demo booking and trial conversion automation." },
    { name: "Analytics Setup", slug: "analytics-setup", icon: "ChartLineUp", desc: "Product-led growth measurement systems." },
  ],
  "E-commerce": [
    { name: "E-commerce SEO", slug: "ecommerce-seo", icon: "ShoppingCart", desc: "Product page optimisation at any scale." },
    { name: "SEO Strategy", slug: "seo-strategy", icon: "Target", desc: "Category and brand search dominance." },
    { name: "Google Ads", slug: "google-ads", icon: "Lightning", desc: "Shopping feed and paid search optimisation." },
    { name: "Content Development", slug: "content-development", icon: "Graph", desc: "Product content and buying guide creation." },
    { name: "Performance Optimisation", slug: "performance-optimisation", icon: "Lightning", desc: "Site speed and Core Web Vitals improvement." },
    { name: "Email Marketing", slug: "email-marketing", icon: "Globe", desc: "Automated retention and reactivation flows." },
  ],
  "Business Setup & Corporate Services": [
    { name: "Content Strategy", slug: "content-strategy", icon: "Graph", desc: "Authority content for corporate decision-makers." },
    { name: "SEO Strategy", slug: "seo-strategy", icon: "Target", desc: "Organic visibility for business service queries." },
    { name: "Digital PR", slug: "digital-pr", icon: "Globe", desc: "Media coverage and industry authority building." },
    { name: "Thought Leadership", slug: "thought-leadership", icon: "Star", desc: "Founder positioning and industry insights." },
    { name: "Lead Qualification Automation", slug: "lead-qualification-automation", icon: "Robot", desc: "Automated B2B lead nurturing and scoring." },
    { name: "Google Ads", slug: "google-ads", icon: "Lightning", desc: "Targeted paid campaigns for high-value leads." },
  ],
  "Exhibitions & Events": [
    { name: "SEO Strategy", slug: "seo-strategy", icon: "Target", desc: "Event search visibility and authority building." },
    { name: "Content Development", slug: "content-development", icon: "Graph", desc: "Speaker, session, and venue content." },
    { name: "Google Ads", slug: "google-ads", icon: "Lightning", desc: "Paid campaigns for attendee acquisition." },
    { name: "Paid Social", slug: "paid-social", icon: "Users", desc: "Social campaigns targeting industry audiences." },
    { name: "Digital PR", slug: "digital-pr", icon: "Globe", desc: "Media outreach and event coverage." },
    { name: "Email Marketing", slug: "email-marketing", icon: "Clock", desc: "Nurture sequences for ticket sales." },
  ],
  "Professional Services": [
    { name: "Content Strategy", slug: "content-strategy", icon: "Graph", desc: "Expertise-driven content for client acquisition." },
    { name: "Digital PR", slug: "digital-pr", icon: "Globe", desc: "Media visibility and authority amplification." },
    { name: "SEO Strategy", slug: "seo-strategy", icon: "Target", desc: "Organic visibility for professional services." },
    { name: "Thought Leadership", slug: "thought-leadership", icon: "Star", desc: "Founder and team authority positioning." },
    { name: "Lead Qualification Automation", slug: "lead-qualification-automation", icon: "Robot", desc: "Nurture sequences for long sales cycles." },
    { name: "Client Portals", slug: "client-portals", icon: "Heart", desc: "Secure client communication and reporting." },
  ],
  "Cleaning & Facilities": [
    { name: "Local SEO", slug: "local-seo", icon: "MapPin", desc: "Service-area local search dominance." },
    { name: "Google Ads", slug: "google-ads", icon: "Lightning", desc: "Local paid campaigns for immediate leads." },
    { name: "Reputation Management", slug: "reputation-management", icon: "Star", desc: "Review generation and management at scale." },
    { name: "Workflow Automation", slug: "workflow-automation", icon: "Gear", desc: "Quote-to-booking process automation." },
    { name: "Landing Pages", slug: "landing-pages", icon: "Target", desc: "Service-specific conversion-optimised pages." },
    { name: "SEO Strategy", slug: "seo-strategy", icon: "Target", desc: "Organic growth for commercial services." },
  ],
  "Real Estate": [
    { name: "Local SEO", slug: "local-seo", icon: "MapPin", desc: "Neighbourhood and city search dominance." },
    { name: "SEO Strategy", slug: "seo-strategy", icon: "Target", desc: "Agent and agency organic visibility." },
    { name: "Google Ads", slug: "google-ads", icon: "Lightning", desc: "Paid campaigns for buyer and seller leads." },
    { name: "Content Development", slug: "content-development", icon: "Graph", desc: "Neighbourhood guides and market reports." },
    { name: "Lead Qualification Automation", slug: "lead-qualification-automation", icon: "Robot", desc: "Instant response and lead scoring." },
    { name: "Custom CRM Development", slug: "custom-crm-development", icon: "Code", desc: "Tailored lead and client management." },
  ],
  "Hospitality": [
    { name: "Local SEO", slug: "local-seo", icon: "MapPin", desc: "Local search dominance for venues." },
    { name: "SEO Strategy", slug: "seo-strategy", icon: "Target", desc: "OTA and direct booking visibility." },
    { name: "Reputation Management", slug: "reputation-management", icon: "Star", desc: "Review generation and response system." },
    { name: "Content Development", slug: "content-development", icon: "Graph", desc: "Visual content and guest experience pages." },
    { name: "Google Ads", slug: "google-ads", icon: "Lightning", desc: "Paid campaigns for direct bookings." },
    { name: "Landing Pages", slug: "landing-pages", icon: "Target", desc: "Offer-specific conversion pages." },
  ],
  "Education": [
    { name: "SEO Strategy", slug: "seo-strategy", icon: "Target", desc: "Programme and course search visibility." },
    { name: "Content Strategy", slug: "content-strategy", icon: "Graph", desc: "Educational content authority building." },
    { name: "Google Ads", slug: "google-ads", icon: "Lightning", desc: "Student acquisition paid campaigns." },
    { name: "Email Marketing", slug: "email-marketing", icon: "Globe", desc: "Prospect nurture and enrolment sequences." },
    { name: "Lead Qualification Automation", slug: "lead-qualification-automation", icon: "Robot", desc: "Enquiry response and follow-up automation." },
    { name: "International SEO", slug: "international-seo", icon: "Globe", desc: "Multi-language and multi-country optimisation." },
  ],
  "Local Service Businesses": [
    { name: "Local SEO", slug: "local-seo", icon: "MapPin", desc: "GBP optimisation and local pack domination." },
    { name: "SEO Strategy", slug: "seo-strategy", icon: "Target", desc: "Service-area organic search strategy." },
    { name: "Google Ads", slug: "google-ads", icon: "Lightning", desc: "Targeted local paid campaigns." },
    { name: "Reputation Management", slug: "reputation-management", icon: "Star", desc: "Review pipeline and response automation." },
    { name: "Booking Platforms", slug: "booking-platforms", icon: "CalendarBlank", desc: "Online scheduling and quoting system." },
    { name: "Lead Qualification Automation", slug: "lead-qualification-automation", icon: "Robot", desc: "Instant response and lead capture." },
  ],
  "Disability & Care Services": [
    { name: "Local SEO", slug: "local-seo", icon: "MapPin", desc: "Local visibility for care seekers." },
    { name: "SEO Strategy", slug: "seo-strategy", icon: "Target", desc: "Organic presence for care-related queries." },
    { name: "Content Strategy", slug: "content-strategy", icon: "Graph", desc: "Compassionate content for families." },
    { name: "Accessibility Improvement", slug: "accessibility-improvement", icon: "Heart", desc: "WCAG-compliant digital experiences." },
    { name: "Reputation Management", slug: "reputation-management", icon: "Star", desc: "Trust-building review and testimonial system." },
    { name: "Client Portals", slug: "client-portals", icon: "Heart", desc: "Secure family communication and care coordination." },
  ],
};

const industryKPIs: Record<string, { label: string; value: number; suffix: string; icon: React.ElementType }[]> = {};
const allKPIdefs = [
  { label: "Appointments Booked", key: "appointments", defaultVal: 340, suffix: "+", icon: CalendarBlank },
  { label: "Conversion Rate", key: "conversion", defaultVal: 18, suffix: "%", icon: ChartLineUp },
  { label: "Organic Traffic", key: "traffic", defaultVal: 240, suffix: "%", icon: Graph },
  { label: "Revenue Generated", key: "revenue", defaultVal: 480, suffix: "K", icon: CurrencyDollar },
  { label: "Lead Quality Score", key: "leads", defaultVal: 85, suffix: "%", icon: Star },
  { label: "Response Time", key: "response", defaultVal: 2, suffix: "min", icon: Clock },
];
industries.forEach((ind) => {
  industryKPIs[ind.name] = allKPIdefs.map((k, i) => ({
    label: k.label,
    value: [340, 18, 240, 480, 85, 2][i] + Math.floor(i * 13),
    suffix: k.suffix,
    icon: k.icon,
  }));
});

const caseStudies = [
  {
    client: "BrightCare Dental",
    industry: "Dental & Healthcare",
    problem: "A 5-location dental group was losing patients to competitors with stronger online presence and modern booking experiences.",
    solution: "We built a unified local SEO system, deployed AI-powered review generation, and created a seamless online booking platform.",
    metrics: [
      { label: "New patient bookings", value: "312", suffix: "%" },
      { label: "Online reviews", value: "840", suffix: "+" },
      { label: "Organic traffic", value: "195", suffix: "%" },
      { label: "Revenue per location", value: "2.4", suffix: "x" },
    ],
    icon: Heartbeat,
  },
  {
    client: "Premier Legal Partners",
    industry: "Legal Services",
    problem: "A mid-sized law firm struggled to compete with larger firms for high-value practice area keywords across 3 jurisdictions.",
    solution: "We created practice-area content hubs, deployed a digital PR programme for media citations, and automated client intake.",
    metrics: [
      { label: "Practice area rankings", value: "18", suffix: "× top 3" },
      { label: "Lead volume", value: "245", suffix: "%" },
      { label: "Media citations", value: "64", suffix: "" },
      { label: "Cost per lead", value: "-42", suffix: "%" },
    ],
    icon: Scales,
  },
  {
    client: "GrowthStack SaaS",
    industry: "SaaS & Technology",
    problem: "A B2B SaaS company had strong product-market fit but relied entirely on paid ads for customer acquisition.",
    solution: "We built a content-led SEO engine, optimised documentation for search, and deployed trial conversion automation.",
    metrics: [
      { label: "Organic demos", value: "410", suffix: "%" },
      { label: "Trial-to-paid", value: "38", suffix: "%" },
      { label: "SEO traffic", value: "520", suffix: "%" },
      { label: "CAC reduction", value: "54", suffix: "%" },
    ],
    icon: Code,
  },
];

const comparisonData: Record<string, {
  marketingFocus: string; primaryChannels: string; kpis: string;
  automationApproach: string; contentStrategy: string;
}> = {
  "Dental & Healthcare": {
    marketingFocus: "Local pack dominance, patient acquisition, treatment-specific SEO",
    primaryChannels: "Google Business Profile, Local Ads, Review Platforms, Social",
    kpis: "New patients, review volume, phone calls, booking rate",
    automationApproach: "Automated appointment booking, reminders, review requests, intake forms",
    contentStrategy: "Treatment pages, patient education, FAQs, before-after galleries",
  },
  "Legal Services": {
    marketingFocus: "Practice area authority, jurisdiction targeting, trust signals",
    primaryChannels: "SEO, Digital PR, LinkedIn, Google Ads (restricted)",
    kpis: "Lead quality, consultation rate, case value, firm rankings",
    automationApproach: "AI lead qualification, automated follow-up, case management integration",
    contentStrategy: "Practice area hubs, legal insights, case results, thought leadership",
  },
  "SaaS & Technology": {
    marketingFocus: "Product-led growth, category ownership, technical audience",
    primaryChannels: "SEO, Content Marketing, Product Hunt, Community, Paid",
    kpis: "MRR, trial conversion, demo rate, organic traffic, churn",
    automationApproach: "Product trials, demo booking, led scoring, content personalisation",
    contentStrategy: "Documentation, comparison pages, technical blogs, API content",
  },
  "E-commerce": {
    marketingFocus: "Product discovery, shopping feed optimisation, seasonal demand",
    primaryChannels: "Google Shopping, SEO, Paid Social, Email, Marketplaces",
    kpis: "ROAS, AOV, conversion rate, organic product traffic, cart recovery",
    automationApproach: "Feed management, dynamic pricing, cart recovery flows, personalisation",
    contentStrategy: "Product descriptions, buying guides, reviews, category content",
  },
};

const insightArticles = [
  { title: "How AI is transforming patient acquisition in healthcare", tag: "AI in Healthcare", readTime: "7 min", excerpt: "From automated appointment booking to AI-powered patient matching — the future of healthcare marketing is already here." },
  { title: "Legal SEO in 2026: What's changed and what still works", tag: "Legal Marketing", readTime: "6 min", excerpt: "Practice-area SEO is more competitive than ever. Here's our playbook for dominating local and national legal search." },
  { title: "The SaaS growth playbook: SEO + product-led motion", tag: "SaaS Growth", readTime: "8 min", excerpt: "Why the most successful SaaS companies combine content authority with product-led conversion systems." },
  { title: "E-commerce SEO at scale: optimising 10,000+ product pages", tag: "E-commerce", readTime: "5 min", excerpt: "How we optimise product pages at scale without sacrificing quality or burning out your content team." },
];

const industryColors: Record<string, string> = {
  "Dental & Healthcare": "#D4A849",
  "Legal Services": "#D4A849",
  "SaaS & Technology": "#D4A849",
  "E-commerce": "#D4A849",
};

const metricLabels = [
  { key: "trafficPotential", label: "Traffic Potential", icon: Graph },
  { key: "competitionLevel", label: "Competition Level", icon: Target },
  { key: "automationOpportunity", label: "Automation Opportunity", icon: Gear },
  { key: "leadQuality", label: "Lead Quality", icon: Star },
  { key: "revenueImpact", label: "Revenue Impact", icon: CurrencyDollar },
  { key: "searchDemand", label: "Search Demand", icon: MagnifyingGlass },
  { key: "aiVisibility", label: "AI Visibility", icon: Robot },
];

/* ─── HELPER COMPONENTS ─── */

function BgGrid({ id }: { id: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id={`grid-${id}`} x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
    </svg>
  );
}

function BgRadials({ position }: { position: "tl" | "br" | "tr" | "bl" | "center" }) {
  const posMap: Record<string, string> = {
    tl: "top-0 left-0", br: "bottom-0 right-0", tr: "top-0 right-0", bl: "bottom-0 left-0", center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  };
  const translate: Record<string, string> = {
    tl: "translate(-30%, -30%)", br: "translate(30%, 30%)", tr: "translate(30%, -30%)", bl: "translate(-30%, 30%)", center: ""
  };
  const pos = position === "center" ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : posMap[position];
  return (
    <div className={`absolute ${pos} w-[600px] h-[600px] pointer-events-none opacity-[0.12]`}
      style={{ background: "radial-gradient(ellipse at center, rgba(212,168,73,0.4) 0%, transparent 70%)", transform: translate[position] }}
    />
  );
}

function BgDots() {
  return (
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
      style={{ backgroundImage: "radial-gradient(rgba(212,168,73,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
    />
  );
}

function BgDiagonal({ id }: { id: string }) {
  return (
    <div className="absolute inset-0" style={{
      backgroundImage: `repeating-linear-gradient(45deg, rgba(212,168,73,0.004) 0px, rgba(212,168,73,0.004) 1px, transparent 1px, transparent 32px)`,
    }} />
  );
}

function PanelCard({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`relative bg-[#181818] border border-accent/30 rounded-[1.5rem] overflow-hidden ${className}`} style={style}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      {children}
    </div>
  );
}

function GlassPill({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link href={href} className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-accent/35 bg-[#181818] hover:bg-[#1E1E1E] hover:border-accent/60 transition-all duration-300 shadow-sm">
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "inset 0 0 16px rgba(212,168,73,0.08), 0 0 12px rgba(212,168,73,0.04)" }} />
      <span className="text-[13px] text-[rgba(255,255,255,0.70)] group-hover:text-white transition-colors duration-300">{children}</span>
      <ArrowLineUpRight size={11} className="text-accent/40 group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div className={className} style={{ opacity: 0, animation: `fadeInUp 0.6s ${delay}s ease-out forwards` }}>
      {children}
    </div>
  );
}

function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const step = Math.ceil(target / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setDisplay(target);
              clearInterval(timer);
            } else {
              setDisplay(start);
            }
          }, 16);
          observer.disconnect();
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="tabular-nums">{prefix}{display}{suffix}</span>;
}

/* ─── ILLUSTRATIONS ─── */

function FrameworkFlow({ steps }: { steps: { step: string; title: string; desc: string }[] }) {
  return (
    <svg viewBox="0 0 560 160" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D4A849" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D4A849" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {steps.map((step, i) => {
        const x = 40 + i * 120;
        return (
          <g key={step.step}>
            {i < steps.length - 1 && (
              <line x1={x + 32} y1="80" x2={x + 88} y2="80" stroke="#D4A849" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2" />
            )}
            <circle cx={x} cy="80" r="16" stroke="#D4A849" strokeWidth="1" fill="#181818" />
            <text x={x} y="84" textAnchor="middle" fill="#D4A849" fontSize="8" fontFamily="monospace">{step.step}</text>
            <text x={x + 32} y="74" textAnchor="middle" fill="rgba(212,168,73,0.8)" fontSize="6.5" fontFamily="monospace" fontWeight="600">{step.title}</text>
            <text x={x + 32} y="94" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace">
              {step.desc.slice(0, 35)}{step.desc.length > 35 ? ".." : ""}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── SECTION 1: INDUSTRY EXPLORER ─── */

function Section1Explorer() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const current = industries[selectedIdx];
  const Icon = (iconMap[current.icon] || Target) as React.ComponentType<any>;

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="explorer" />
        <BgRadials position="tl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Industry Explorer</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Explore your <span className="text-accent">industry.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12 lg:mb-16">
            Select an industry to see its unique challenges, recommended services, and growth potential. Each industry requires a tailored approach.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left nav list - scrollable */}
          <div className="lg:col-span-5 lg:max-h-[520px] lg:overflow-y-auto lg:pr-2 space-y-1 scrollbar-none">
            {industries.map((ind, i) => {
              const IndIcon = (iconMap[ind.icon] || Target) as React.ComponentType<any>;
              const isActive = selectedIdx === i;
              return (
                <div
                  key={ind.slug}
                  onClick={() => setSelectedIdx(i)}
                  className="group cursor-pointer animate-fadeInLeft"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <div className={`hidden lg:flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                    isActive ? "bg-[#181818] border border-accent/40" : "border border-transparent hover:bg-[#181818]/50"
                  }`}>
                    <IndIcon size={18} className={`shrink-0 transition-all duration-300 ${isActive ? "text-accent scale-110" : "text-text-secondary/50"}`} />
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm font-medium transition-colors duration-300 ${isActive ? "text-white" : "text-text-secondary"}`}>
                        {ind.name}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-mono text-accent/70 block mt-0.5">
                          {ind.relevantServices.length} solutions available
                        </span>
                      )}
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    )}
                  </div>

                  {/* Mobile accordion */}
                  <div className="lg:hidden">
                    <button
                      onClick={() => setMobileOpen(mobileOpen === i ? null : i)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                    >
                      <IndIcon size={16} className={`shrink-0 ${mobileOpen === i ? "text-accent" : "text-text-secondary/50"}`} />
                      <span className={`text-sm flex-1 ${mobileOpen === i ? "text-accent" : "text-text-secondary"}`}>{ind.name}</span>
                      {mobileOpen === i ? <CaretDown size={12} className="text-accent/60" /> : <CaretRight size={12} className="text-text-secondary/40" />}
                    </button>
                    <AnimatePresence>
                      {mobileOpen === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pl-10 space-y-3">
                            <p className="text-xs text-text-secondary leading-relaxed">{ind.description.slice(0, 120)}...</p>
                            <div>
                              <span className="text-[9px] font-mono text-accent/70 uppercase tracking-wider block mb-1">Challenges</span>
                              <ul className="space-y-1">
                                {ind.challenges.slice(0, 3).map((c) => (
                                  <li key={c} className="text-[11px] text-text-secondary flex gap-2"><span className="text-accent/50 mt-0.5">-</span>{c}</li>
                                ))}
                              </ul>
                            </div>
                            <GlassPill href={`/${ind.slug}`}>View industry</GlassPill>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right preview panel - sticky */}
          <div className="hidden lg:block lg:col-span-6 lg:col-start-7 lg:sticky lg:top-32 lg:h-fit">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease }}
              >
                <PanelCard className="p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/35 flex items-center justify-center">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-text-secondary/50 tracking-wider uppercase block">Selected Industry</span>
                      <h3 className="font-display text-lg font-semibold text-white">{current.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">{current.description}</p>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <span className="text-[9px] font-mono text-accent/70 tracking-wider uppercase block mb-2">Key Challenges</span>
                      <ul className="space-y-1.5">
                        {current.challenges.slice(0, 3).map((c) => (
                          <li key={c} className="flex items-start gap-2 text-[12px] text-text-secondary">
                            <span className="w-1 h-1 rounded-full bg-accent/50 mt-1.5 shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-accent/70 tracking-wider uppercase block mb-2">Recommended Services</span>
                      <div className="space-y-1.5">
                        {current.relevantServices.slice(0, 4).map((s) => (
                          <Link key={s} href={`/${s}`}
                            className="group/pill flex items-center gap-2 text-[12px] text-text-secondary/80 hover:text-accent transition-colors duration-200"
                          >
                            <ArrowRight size={8} className="text-accent/40 group-hover/pill:translate-x-0.5 transition-transform" />
                            {s.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-accent/15">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-1.5">
                        {current.relevantTools.slice(0, 3).map((t) => (
                          <div key={t} className="w-6 h-6 rounded-full bg-[#222] border border-accent/25 flex items-center justify-center">
                            <span className="text-[6px] font-mono text-accent/60">{t.slice(0, 2)}</span>
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-text-secondary/40">{current.relevantTools.length} tools</span>
                    </div>
                    <GlassPill href={`/${current.slug}`}>View industry</GlassPill>
                  </div>
                </PanelCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 2: FEATURED INDUSTRIES ─── */

function Section2Featured() {
  const featured = industries.filter((ind) => featuredIndustries.includes(ind.name));

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="featured" />
        <BgRadials position="br" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Featured Industries</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Industry deep <span className="text-accent">dives.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12 lg:mb-16">
            Four key industries where our connected growth approach delivers exceptional results.
          </p>
        </FadeIn>

        <div className="space-y-12 lg:space-y-24">
          {featured.map((ind, i) => {
            const IndIcon = (iconMap[ind.icon] || Target) as React.ComponentType<any>;
            const isReversed = i % 2 === 1;
            const metrics = industryMetrics[ind.name] || industryMetrics["Dental & Healthcare"];
            const metricPairs = Object.entries(metrics).slice(0, 4);

            return (
              <motion.div
                key={ind.slug}
                className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease }}
              >
                <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : ""}`}>
                  <div className="relative group hover:scale-[1.01] transition-transform duration-300 transform-gpu">
                    <div className="absolute -inset-x-4 -inset-y-2 bg-accent/[0.02] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/35 flex items-center justify-center">
                        <IndIcon size={22} className="text-accent" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-text-secondary/50 tracking-wider uppercase block">Featured Industry 0{i + 1}</span>
                        <h3 className="font-display text-[clamp(1.3rem,2.2vw,1.8rem)] font-semibold text-white leading-[1.1]">{ind.name}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-[52ch] mb-4">{ind.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-[#181818] rounded-xl p-4 border border-accent/20">
                        <span className="text-[9px] font-mono text-accent/70 tracking-wider uppercase block mb-2">Challenges</span>
                        <ul className="space-y-1">
                          {ind.challenges.slice(0, 3).map((c) => (
                            <li key={c} className="text-[11px] text-text-secondary flex gap-1.5"><span className="text-accent/40 mt-0.5">-</span>{c}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-[#181818] rounded-xl p-4 border border-accent/20">
                        <span className="text-[9px] font-mono text-accent/70 tracking-wider uppercase block mb-2">Opportunities</span>
                        <ul className="space-y-1">
                          {ind.relevantServices.slice(0, 4).map((s) => (
                            <li key={s} className="text-[11px] text-text-secondary flex gap-1.5">
                              <span className="text-accent/50 mt-0.5">+</span>
                              {s.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {metricPairs.map(([key, val]) => (
                        <span key={key} className="text-[10px] font-mono text-accent/60 px-2.5 py-1 rounded-full border border-accent/25 bg-[#1E1E1E]">
                          {key.replace(/([A-Z])/g, " $1").trim()}: {val}%
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`hidden lg:block lg:col-span-4 ${isReversed ? "lg:order-1" : ""}`}>
                  <div className="relative hover:-translate-y-1 transition-all duration-300 transform-gpu">
                    <div className={`absolute -top-4 -${isReversed ? "right" : "left"}-4 w-20 h-20 bg-accent/[0.03] rounded-2xl border border-accent/15`} />
                    <PanelCard className="p-5 lg:p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <IndIcon size={14} className="text-accent" />
                        <span className="text-[9px] font-mono text-[rgba(255,255,255,0.60)] tracking-wider uppercase">Growth Signals</span>
                      </div>
                      <div className="space-y-3">
                        {metricPairs.slice(0, 3).map(([key, val]) => (
                          <div key={key}>
                            <div className="flex justify-between text-[10px] mb-1">
                              <span className="font-mono text-text-secondary">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                              <span className="font-mono text-accent/80">{val}%</span>
                            </div>
                            <div className="h-1.5 bg-[#111] rounded-full overflow-hidden">
                              <div className="h-full bg-accent rounded-full" style={{ width: `${val}%`, boxShadow: "0 0 6px rgba(212,168,73,0.2)" }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </PanelCard>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 3: INDUSTRY CHALLENGES ─── */

function Section3Challenges() {
  const [expandedIndustry, setExpandedIndustry] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="challenges" />
        <BgRadials position="bl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Challenges</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Every industry has <span className="text-accent">hurdles.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">Explore the specific challenges each industry faces — and how we solve them.</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {industries.map((ind, i) => {
            const IndIcon = (iconMap[ind.icon] || Target) as React.ComponentType<any>;
            const isExpanded = expandedIndustry === i;
            return (
              <div
                key={ind.slug}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div
                  onClick={() => setExpandedIndustry(expandedIndustry === i ? null : i)}
                  className="group relative cursor-pointer"
                >
                  <div className={`relative bg-[#181818] border rounded-[1.25rem] p-5 transition-all duration-500 transform-gpu ${
                    isExpanded ? "border-accent/60 shadow-lg shadow-accent/5 -translate-y-1" : "border-accent/25 hover:border-accent/45 hover:-translate-y-0.5"
                  }`}>
                    <div className={`absolute inset-0 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      isExpanded ? "opacity-100" : ""
                    }`}
                      style={{ boxShadow: "inset 0 0 30px rgba(212,168,73,0.06)" }}
                    />
                    <div className="flex items-start justify-between mb-3">
                      <IndIcon size={18} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-[9px] font-mono text-accent/40">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-sm font-medium text-white group-hover:text-accent transition-colors duration-300 mb-2">{ind.name}</h3>
                    <motion.div
                      animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 space-y-2">
                        {ind.challenges.slice(0, 3).map((c, ci) => (
                          <div
                            key={c}
                            className="text-[11px] text-text-secondary leading-relaxed flex gap-2 items-start p-2 rounded-lg bg-[#1E1E1E] hover:translate-x-0.5 transition-transform duration-200"
                          >
                            <span className="text-accent/50 mt-0.5 shrink-0">0{ci + 1}</span>
                            {c}
                          </div>
                        ))}
                      </div>
                      <Link href={`/${ind.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] text-accent/70 hover:text-accent transition-colors duration-300 mt-3"
                      >
                        View solutions <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </motion.div>
                    {!isExpanded && (
                      <span className="text-[10px] text-text-secondary/40 font-mono mt-2 block">Click to see challenges</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 4: GROWTH DASHBOARD ─── */

function Section4Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const current = industries[activeTab];
  const metrics = industryMetrics[current.name] || industryMetrics["Dental & Healthcare"];

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="dashboard" />
        <BgRadials position="tr" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Growth Dashboard</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Industry growth <span className="text-accent">metrics.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">Select an industry to see its growth potential across seven key dimensions.</p>
        </FadeIn>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1.5 pb-4 mb-8 scrollbar-none">
          {industries.map((ind, i) => {
            const IndIcon = (iconMap[ind.icon] || Target) as React.ComponentType<any>;
            const isActive = activeTab === i;
            return (
              <button
                key={ind.slug}
                onClick={() => setActiveTab(i)}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border text-[11px] font-mono transition-all duration-300 active:scale-[0.96] ${
                  isActive ? "bg-accent/15 border-accent/50 text-accent" : "border-accent/20 text-text-secondary/60 hover:border-accent/40"
                }`}
              >
                <IndIcon size={12} className={isActive ? "text-accent" : "text-text-secondary/40"} />
                {ind.name.length > 16 ? ind.name.slice(0, 14) + ".." : ind.name}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
          >
            <PanelCard className="p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-mono text-text-secondary/50 tracking-wider uppercase">{current.name}</span>
                <span className="w-px h-4 bg-accent/20" />
                <span className="text-[10px] font-mono text-accent/70">Growth Potential Score: {Math.round(Object.values(metrics).reduce((a, b) => a + b, 0) / Object.values(metrics).length)}%</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {metricLabels.map((m) => {
                  const MetricIcon = m.icon;
                  const val = metrics[m.key as keyof typeof metrics] || 0;
                  return (
                    <div key={m.key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <MetricIcon size={12} className="text-accent/60" />
                          <span className="text-[11px] font-mono text-text-secondary">{m.label}</span>
                        </div>
                        <span className="text-[13px] font-mono text-accent font-semibold tabular-nums">{val}%</span>
                      </div>
                      <div className="h-2 bg-[#111] rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${val}%`, boxShadow: "0 0 8px rgba(212,168,73,0.2)" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </PanelCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── SECTION 5: INDUSTRY FRAMEWORKS ─── */

function Section5Frameworks() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const current = industries[activeIndustry];
  const defaultFramework = [
    { step: "01", title: "Discover", desc: "Analyse your market, competition, and current performance." },
    { step: "02", title: "Strategy", desc: "Design a tailored growth plan aligned to your objectives." },
    { step: "03", title: "Execute", desc: "Build, launch, and optimise each component." },
    { step: "04", title: "Measure", desc: "Track performance and identify improvement areas." },
    { step: "05", title: "Scale", desc: "Expand what works across channels and teams." },
  ];
  const steps = industryFrameworks[current.name] || defaultFramework;

  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="frameworks" />
        <BgRadials position="br" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Frameworks</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Industry-specific <span className="text-accent">roadmaps.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">Every industry requires a unique sequence of growth actions. Select an industry to see its framework.</p>
        </FadeIn>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1.5 pb-4 mb-8 scrollbar-none">
          {industries.map((ind, i) => {
            const IndIcon = (iconMap[ind.icon] || Target) as React.ComponentType<any>;
            const isActive = activeIndustry === i;
            return (
              <button
                key={ind.slug}
                onClick={() => setActiveIndustry(i)}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border text-[11px] font-mono transition-all duration-300 active:scale-[0.96] ${
                  isActive ? "bg-accent/15 border-accent/50 text-accent" : "border-accent/20 text-text-secondary/60 hover:border-accent/40"
                }`}
              >
                <IndIcon size={12} className={isActive ? "text-accent" : "text-text-secondary/40"} />
                {ind.name.length > 14 ? ind.name.slice(0, 12) + ".." : ind.name}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout">
          {/* Desktop: Timeline flow */}
          <motion.div
            key={`${current.slug}-desktop`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
              <div className="grid grid-cols-5 gap-6 relative">
                {steps.map((step, i) => (
                  <div
                    key={step.step}
                    className="relative pt-8 animate-fadeIn"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="absolute top-0 left-0 right-0 flex justify-center">
                      <div className="w-8 h-8 rounded-full bg-[#181818] border border-accent/40 flex items-center justify-center">
                        <span className="text-[10px] font-mono text-accent">{step.step}</span>
                      </div>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="absolute top-4 left-[calc(50%+1.5rem)] right-0 h-px bg-gradient-to-r from-accent/20 to-transparent" />
                    )}
                    <PanelCard className="p-5 text-center">
                      <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase block mb-1">Step {step.step}</span>
                      <h4 className="font-display text-sm font-semibold text-white mb-1">{step.title}</h4>
                      <p className="text-[11px] text-text-secondary leading-relaxed">{step.desc}</p>
                    </PanelCard>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mobile: Snap horizontal scroll */}
          <motion.div
            key={`${current.slug}-mobile`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4"
          >
            <div className="flex gap-4 w-max">
              {steps.map((step, i) => (
                <div
                  key={step.step}
                  className="snap-center w-[260px] shrink-0 animate-fadeIn"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <PanelCard className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                        <span className="text-[9px] font-mono text-accent">{step.step}</span>
                      </div>
                      <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase">Step {step.step}</span>
                    </div>
                    <h4 className="font-display text-sm font-semibold text-white mb-1">{step.title}</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-accent/15">
                      <div className="flex gap-1">
                        {steps.map((_, j) => (
                          <div key={j} className={`w-1.5 h-1.5 rounded-full transition-colors ${j === i ? "bg-accent/60" : "bg-accent/15"}`} />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono text-text-secondary/40">{i + 1} of {steps.length}</span>
                    </div>
                  </PanelCard>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── SECTION 6: RECOMMENDED SOLUTIONS ─── */

function Section6Solutions() {
  const [activeTab, setActiveTab] = useState(0);
  const current = industries[activeTab];
  const solutions = industrySolutions[current.name] || [];

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0C0B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="solutions" />
        <BgRadials position="tl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Solutions</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Solutions by <span className="text-accent">industry.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">Select an industry to see which of our solutions we recommend for its unique challenges.</p>
        </FadeIn>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1.5 pb-4 mb-8 scrollbar-none">
          {industries.map((ind, i) => {
            const IndIcon = (iconMap[ind.icon] || Target) as React.ComponentType<any>;
            const isActive = activeTab === i;
            return (
              <button
                key={ind.slug}
                onClick={() => setActiveTab(i)}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border text-[11px] font-mono transition-all duration-300 active:scale-[0.96] ${
                  isActive ? "bg-accent/15 border-accent/50 text-accent" : "border-accent/20 text-text-secondary/60 hover:border-accent/40"
                }`}
              >
                <IndIcon size={12} className={isActive ? "text-accent" : "text-text-secondary/40"} />
                {ind.name.length > 14 ? ind.name.slice(0, 12) + ".." : ind.name}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {solutions.map((sol) => {
                const SolIcon = (iconMap[sol.icon] || Target) as React.ComponentType<any>;
                return (
                  <Link key={sol.slug} href={`/${sol.slug}`} className="group block">
                    <div className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 transition-all duration-500 hover:border-accent/55 hover:-translate-y-1 transform-gpu">
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="flex items-start justify-between mb-3">
                        <SolIcon size={18} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-[9px] font-mono text-text-secondary/40">{sol.slug.slice(0, 4)}</span>
                      </div>
                      <h3 className="text-sm font-medium text-white group-hover:text-accent transition-colors duration-300 mb-1.5">{sol.name}</h3>
                      <p className="text-[12px] text-text-secondary leading-relaxed">{sol.desc}</p>
                      <span className="inline-flex items-center gap-1 text-[11px] text-accent/60 mt-3 group-hover:gap-1.5 transition-all">
                        Explore <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── SECTION 7: SUCCESS METRICS ─── */

function Section7Metrics() {
  const [activeTab, setActiveTab] = useState(0);
  const current = industries[activeTab];
  const kpis = industryKPIs[current.name] || [];

  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="metrics" />
        <BgRadials position="center" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Success Metrics</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Measurable <span className="text-accent">results.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">Key performance indicators that matter most for each industry.</p>
        </FadeIn>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1.5 pb-4 mb-8 scrollbar-none">
          {industries.map((ind, i) => {
            const IndIcon = (iconMap[ind.icon] || Target) as React.ComponentType<any>;
            const isActive = activeTab === i;
            return (
              <button
                key={ind.slug}
                onClick={() => setActiveTab(i)}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border text-[11px] font-mono transition-all duration-300 active:scale-[0.96] ${
                  isActive ? "bg-accent/15 border-accent/50 text-accent" : "border-accent/20 text-text-secondary/60 hover:border-accent/40"
                }`}
              >
                <IndIcon size={12} className={isActive ? "text-accent" : "text-text-secondary/40"} />
                {ind.name.length > 14 ? ind.name.slice(0, 12) + ".." : ind.name}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {kpis.map((kpi) => {
              const KpiIcon = kpi.icon as React.ComponentType<any>;
              return (
                <div
                  key={kpi.label}
                  className="relative bg-[#181818] border border-accent/25 rounded-[1.25rem] p-5 transition-all duration-500 hover:border-accent/55 hover:-translate-y-1 transform-gpu"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
                  <KpiIcon size={16} className="text-accent mb-2" />
                    <span className="text-[10px] font-mono text-[rgba(255,255,255,0.60)] tracking-wider uppercase block mb-1">{kpi.label}</span>
                    <span className="font-display text-[clamp(1.6rem,2.5vw,2rem)] font-semibold text-accent leading-none block">
                      <CountUp target={kpi.value} suffix={kpi.suffix} />
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── SECTION 8: CASE STUDIES ─── */

function Section8CaseStudies() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="cases" />
        <BgRadials position="bl" />
        <BgDots />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Case Studies</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Real results, real <span className="text-accent">industries.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">How we&rsquo;ve helped businesses across different industries achieve measurable growth.</p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
          {caseStudies.map((cs, i) => {
            const CaseIcon = cs.icon;
            return (
              <div
                key={cs.client}
                className="group animate-fadeIn"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <PanelCard className="p-6 h-full flex flex-col transition-all duration-500 group-hover:border-accent/50">
                  <div className="absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 40px rgba(212,168,73,0.04)" }}
                  />
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                        <CaseIcon size={16} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-accent transition-colors duration-300">{cs.client}</h3>
                        <span className="text-[10px] font-mono text-text-secondary/50">{cs.industry}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-5">
                      <div>
                        <span className="text-[9px] font-mono text-accent/70 tracking-wider uppercase block mb-1">Problem</span>
                        <p className="text-[12px] text-text-secondary leading-relaxed">{cs.problem}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-accent/70 tracking-wider uppercase block mb-1">Solution</span>
                        <p className="text-[12px] text-text-secondary leading-relaxed">{cs.solution}</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-accent/15">
                      <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase block mb-2">Results</span>
                      <div className="grid grid-cols-2 gap-2">
                        {cs.metrics.map((m) => (
                          <div key={m.label} className="bg-[#1E1E1E] rounded-lg p-2.5 text-center">
                            <span className="font-display text-[clamp(1rem,1.5vw,1.2rem)] font-semibold text-accent block leading-none">
                              <CountUp target={parseInt(m.value.replace(/\D/g, ""))} suffix={m.suffix} />
                            </span>
                            <span className="text-[8px] font-mono text-text-secondary/60 block mt-0.5">{m.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </PanelCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 9: STRATEGY COMPARISON ─── */

function Section9Comparison() {
  const compareIndustries = ["Dental & Healthcare", "Legal Services", "SaaS & Technology", "E-commerce"];
  const [selectedA, setSelectedA] = useState(0);
  const [selectedB, setSelectedB] = useState(1);

  const indA = compareIndustries[selectedA];
  const indB = compareIndustries[selectedB];
  const dataA = comparisonData[indA];
  const dataB = comparisonData[indB];

  const comparisonRows = [
    { label: "Marketing Focus", key: "marketingFocus" as const },
    { label: "Primary Channels", key: "primaryChannels" as const },
    { label: "KPIs", key: "kpis" as const },
    { label: "Automation Approach", key: "automationApproach" as const },
    { label: "Content Strategy", key: "contentStrategy" as const },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="comparison" />
        <BgRadials position="tr" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Strategy Comparison</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Why Healthcare ≠ <span className="text-accent">SaaS.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">Every industry demands a unique strategic approach. Select two industries to compare their growth strategies side by side.</p>
        </FadeIn>

        {/* Selectors */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[0, 1].map((side) => {
            const val = side === 0 ? selectedA : selectedB;
            const setVal = side === 0 ? setSelectedA : setSelectedB;
            const otherVal = side === 0 ? selectedB : selectedA;
            return (
              <div key={side}>
                <span className="text-[10px] font-mono text-text-secondary/50 tracking-wider uppercase block mb-2">Industry {side === 0 ? "A" : "B"}</span>
                <div className="flex flex-wrap gap-1.5">
                  {compareIndustries.map((name, i) => {
                    const IndIcon = (iconMap[industries.find((ind) => ind.name === name)?.icon || "Target"] || Target) as React.ComponentType<any>;
                    const isSelected = val === i;
                    const isOther = otherVal === i;
                    return (
                      <button
                        key={name}
                        onClick={() => {
                          if (i !== otherVal) setVal(i);
                        }}
                        disabled={isOther}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full border text-[11px] font-mono transition-all duration-300 active:scale-[0.96] ${
                          isSelected ? "bg-accent/15 border-accent/50 text-accent" : isOther
                            ? "border-accent/10 text-text-secondary/30 cursor-not-allowed" : "border-accent/20 text-text-secondary/60 hover:border-accent/40"
                        }`}
                      >
                        <IndIcon size={10} />
                        {name === "Dental & Healthcare" ? "Healthcare" : name === "Legal Services" ? "Legal" : name === "SaaS & Technology" ? "SaaS" : name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${selectedA}-${selectedB}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            {/* Desktop: Table layout */}
            <div className="hidden lg:block">
              <PanelCard className="overflow-hidden">
                <div className="grid grid-cols-12 divide-x divide-accent/10">
                  <div className="col-span-3 p-4 bg-[#111]">
                    <span className="text-[9px] font-mono text-text-secondary/50 tracking-wider uppercase">Dimension</span>
                  </div>
                  <div className="col-span-4 p-4 bg-[#111]">
                    <span className="text-[9px] font-mono text-accent/70 tracking-wider uppercase">{indA === "Dental & Healthcare" ? "Healthcare" : indA === "Legal Services" ? "Legal" : indA === "SaaS & Technology" ? "SaaS" : indA}</span>
                  </div>
                  <div className="col-span-4 p-4 bg-[#111] col-start-6">
                    <span className="text-[9px] font-mono text-accent/70 tracking-wider uppercase">{indB === "Dental & Healthcare" ? "Healthcare" : indB === "Legal Services" ? "Legal" : indB === "SaaS & Technology" ? "SaaS" : indB}</span>
                  </div>
                </div>
                {comparisonRows.map((row, i) => (
                  <div
                    key={row.key}
                    className="grid grid-cols-12 divide-x divide-accent/10 animate-fadeIn"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <div className="col-span-3 p-4 flex items-center">
                      <span className="text-[11px] font-medium text-white">{row.label}</span>
                    </div>
                    <div className="col-span-4 p-4 flex items-center">
                      <span className="text-[11px] text-text-secondary leading-relaxed">{dataA?.[row.key]}</span>
                    </div>
                    <div className="col-span-4 p-4 flex items-center col-start-6">
                      <span className="text-[11px] text-text-secondary leading-relaxed">{dataB?.[row.key]}</span>
                    </div>
                  </div>
                ))}
              </PanelCard>
            </div>

            {/* Mobile: Card layout */}
            <div className="lg:hidden space-y-3">
              {comparisonRows.map((row) => (
                <PanelCard key={row.key} className="p-4">
                  <span className="text-[10px] font-mono text-text-secondary/60 tracking-wider uppercase block mb-2">{row.label}</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-lg bg-[#1E1E1E]">
                      <span className="text-[9px] font-mono text-accent/60 block mb-1">{indA === "Dental & Healthcare" ? "Healthcare" : indA === "Legal Services" ? "Legal" : indA === "SaaS & Technology" ? "SaaS" : indA}</span>
                      <span className="text-[11px] text-text-secondary leading-relaxed block">{dataA?.[row.key]}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#1E1E1E]">
                      <span className="text-[9px] font-mono text-accent/60 block mb-1">{indB === "Dental & Healthcare" ? "Healthcare" : indB === "Legal Services" ? "Legal" : indB === "SaaS & Technology" ? "SaaS" : indB}</span>
                      <span className="text-[11px] text-text-secondary leading-relaxed block">{dataB?.[row.key]}</span>
                    </div>
                  </div>
                </PanelCard>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── SECTION 10: INDUSTRY NAVIGATOR ─── */

function Section10Navigator() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const current = selectedIdx !== null ? industries[selectedIdx] : industries[0];
  const CurrentIcon = (iconMap[current.icon] || Target) as React.ComponentType<any>;

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="navigator" />
        <BgRadials position="center" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Industry Navigator</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Find your <span className="text-accent">industry.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">Select an industry to preview its growth profile, challenges, and recommended solutions.</p>
        </FadeIn>

        {/* Industry grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {industries.map((ind, i) => {
            const IndIcon = (iconMap[ind.icon] || Target) as React.ComponentType<any>;
            const isHovered = selectedIdx === i;
            return (
              <div
                key={ind.slug}
                onClick={() => setSelectedIdx(i)}
                className="animate-fadeIn cursor-pointer"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div className="group block h-full">
                  <div
                    className={`relative h-full bg-[#181818] border rounded-[1.25rem] p-4 text-center transition-all duration-500 transform-gpu group-hover:-translate-y-1 ${
                      isHovered ? "border-accent/60 shadow-lg shadow-accent/5" : "border-accent/20"
                    }`}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <IndIcon size={24} className={`mx-auto mb-2 transition-all duration-500 ${isHovered ? "text-accent scale-110" : "text-text-secondary/50"}`} />
                    <span className={`text-xs font-medium leading-snug block transition-colors duration-300 ${isHovered ? "text-accent" : "text-white"}`}>
                      {ind.name.split("&")[0].trim()}
                    </span>
                    {isHovered && (
                      <span className="text-[9px] font-mono text-accent/60 block mt-1 animate-fadeIn">
                        Selected
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Preview panel - shows below grid */}
        <AnimatePresence>
          {selectedIdx !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease }}
              className="mt-8"
            >
              <PanelCard className="p-5 lg:p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                    <CurrentIcon size={22} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display text-lg font-semibold text-white">{current.name}</h3>
                      <span className="text-[10px] font-mono text-accent/60 px-2 py-0.5 rounded-full border border-accent/25">
                        {current.relevantServices.length} solutions
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-[60ch]">{current.shortDesc}</p>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <div className="flex items-center gap-2 text-[11px] text-text-secondary/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                        {current.challenges.length} challenges
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-text-secondary/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                        {current.relevantServices.length} solutions
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-text-secondary/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                        {current.relevantTools.length} tools
                      </div>
                    </div>
                  </div>
                  <GlassPill href={`/${current.slug}`}>Explore</GlassPill>
                </div>
              </PanelCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── SECTION 11: RELATED INSIGHTS ─── */

function Section11Insights() {
  return (
    <section className="relative py-24 lg:py-32 bg-ground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <BgGrid id="insights" />
        <BgRadials position="br" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">Insights</span>
          <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4">
            Industry <span className="text-accent">thinking.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-12">Perspectives, analysis, and strategies from our team working across industries every day.</p>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Featured */}
          <motion.div className="lg:col-span-7 lg:row-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="block h-full">
              <PanelCard className="p-6 lg:p-8 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono text-accent/60 tracking-wider uppercase">{insightArticles[0].tag}</span>
                    <span className="w-1 h-1 rounded-full bg-accent/30" />
                    <span className="text-[10px] font-mono text-text-secondary/50">{insightArticles[0].readTime}</span>
                  </div>
                  <h3 className="font-display text-[clamp(1.3rem,2.2vw,1.6rem)] font-semibold text-white mb-4 leading-[1.1]">
                    {insightArticles[0].title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-[45ch]">{insightArticles[0].excerpt}</p>
                </div>
                <div className="pt-6 mt-auto relative z-10">
                  <span className="inline-flex items-center gap-1 text-xs text-accent/30">
                    Read article <ArrowRight size={10} />
                  </span>
                </div>
              </PanelCard>
            </div>
          </motion.div>

          {/* Secondary */}
          <div className="lg:col-span-5 space-y-4">
            {insightArticles.slice(1).map((article, i) => (
              <div key={article.title}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="block">
                  <PanelCard className="p-5 flex gap-4 items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] font-mono text-accent/60 tracking-wider uppercase">{article.tag}</span>
                        <span className="w-0.5 h-0.5 rounded-full bg-text-secondary/30" />
                        <span className="text-[9px] font-mono text-text-secondary/40">{article.readTime}</span>
                      </div>
                      <h4 className="text-sm font-medium text-white leading-snug">{article.title}</h4>
                    </div>
                    <ArrowRight size={12} className="text-text-secondary/20 shrink-0 mt-2" />
                  </PanelCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 12: CTA ─── */

function Section12CTA() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 pointer-events-none">
        <BgDiagonal id="cta-industries" />
        <BgDots />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,168,73,0.03), transparent)" }} />
      </div>
      <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
        <motion.h2 className="font-display font-semibold text-[clamp(1.8rem,3vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-white mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
        >
          Ready to transform your industry presence?
        </motion.h2>
        <motion.p className="text-[rgba(255,255,255,0.72)] text-[15px] leading-relaxed mb-10 max-w-[42ch] mx-auto"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
        >
          Book a free discovery call. We&rsquo;ll analyse your industry, identify your biggest growth opportunities, and build a plan tailored to your market.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          <Link href="/contact" className="group relative inline-flex items-center gap-2.5 bg-accent text-ground px-7 py-3.5 rounded-full font-semibold text-sm active:scale-[0.98] transition-all duration-200">
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: "0 0 40px rgba(212,168,73,0.5), 0 0 80px rgba(212,168,73,0.25)" }}
            />
            <span className="relative">Book a discovery call</span>
            <ArrowRight size={14} weight="bold" className="relative transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── MAIN EXPORT ─── */

export function IndustriesContent() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      <style>{animStyles}</style>

      {/* ─── BANNER (matching /services style) ─── */}
      <motion.section ref={heroRef} className="relative pt-36 pb-20 lg:pb-28 bg-ground overflow-hidden" style={{ opacity: heroOpacity }}>
        <div className="absolute inset-0">
          <ShapeGrid speed={0.15} squareSize={36} direction="diagonal" borderColor="#D4A849" hoverFillColor="#D4A849" shape="square" hoverTrailAmount={3} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ground/90 pointer-events-none" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 right-[10%] text-[clamp(8rem,18vw,16rem)] font-mono font-semibold text-text-primary/[0.015] leading-none select-none">13</div>
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.015]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.3), transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/15" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <motion.span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[rgba(255,255,255,0.70)] mb-5 block"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
              >
                Industries
              </motion.span>
              <motion.h1 className="font-display font-semibold text-[clamp(2.8rem,5.5vw,5rem)] tracking-[-0.035em] leading-[0.92] text-white"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}
              >
                Industry-specific<br /><span className="text-accent relative">growth.<span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-accent/30 rounded-full" /></span>
              </motion.h1>
              <motion.p className="text-[rgba(255,255,255,0.72)] leading-relaxed max-w-[52ch] mt-5 text-sm lg:text-base"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }}
              >
                Every industry has unique challenges, search behaviour, and growth opportunities. We tailor our approach to yours.
              </motion.p>
            </div>

            <motion.div className="lg:col-span-4 flex justify-end"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease }}
            >
              <div className="hidden lg:flex flex-col items-end gap-3">
                <div className="flex items-center gap-3"><span className="w-10 h-px bg-accent/40" /><span className="font-mono text-xs text-accent/80">{industries.length} industries</span></div>
                <div className="flex items-center gap-3"><span className="w-10 h-px bg-accent/40" /><span className="font-mono text-xs text-accent/80">{industries.reduce((a, i) => a + i.relevantServices.length, 0)} services</span></div>
                <div className="flex items-center gap-3"><span className="w-10 h-px bg-accent/40" /><span className="font-mono text-xs text-accent/80">1 growth system</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="h-px w-full bg-accent/15" />

      {/* Section 1: Industry Explorer */}
      <Section1Explorer />

      {/* Section 2: Featured Industries */}
      <Section2Featured />

      {/* Section 3: Industry Challenges */}
      <Section3Challenges />

      {/* Section 4: Growth Dashboard */}
      <Section4Dashboard />

      {/* Section 5: Industry Frameworks */}
      <Section5Frameworks />

      {/* Section 6: Recommended Solutions */}
      <Section6Solutions />

      {/* Section 7: Success Metrics */}
      <Section7Metrics />

      {/* Section 8: Case Studies */}
      <Section8CaseStudies />

      {/* Section 9: Strategy Comparison */}
      <Section9Comparison />

      {/* Section 10: Industry Navigator */}
      <Section10Navigator />

      {/* Section 11: Related Insights */}
      <Section11Insights />

      {/* Section 12: CTA */}
      <Section12CTA />
    </>
  );
}
