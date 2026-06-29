"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Binoculars, Robot, Lightning, ChartBar, PencilCircle, Code, Gear, MagnifyingGlass, Compass, Airplane, Globe, MapPin, ShoppingCart, Buildings, BookOpenText, ShareNetwork, FileText, ChatCircleDots, Graph, Sun, Target, Rocket, SealCheck, Database, Brain, Eye, Stack, Certificate, Microphone, CurrencyCircleDollar, ChartLineUp, ChartDonut, ArrowsClockwise } from "@phosphor-icons/react";
import type { PillarData, ServiceItem } from "@/data/services";
import ShapeGrid from "@/components/ShapeGrid";
import CTA from "@/components/CTA";

function HeroBg() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 opacity-[0.12]">
        <ShapeGrid speed={0.1} squareSize={36} direction="diagonal" borderColor="#D4A849" hoverFillColor="#D4A849" shape="square" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ground/90 pointer-events-none" />
      <div className="absolute top-12 right-[10%] text-[clamp(8rem,18vw,16rem)] font-mono font-semibold text-accent/[0.04] leading-none select-none pointer-events-none">09</div>
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.008]" style={{ background: "radial-gradient(circle, rgba(212,168,73,0.3), transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/10" />
    </div>
  );
}

const pillarIcons: Record<string, React.ElementType> = {
  "search-organic-growth": Binoculars,
  "geo-ai-search": Robot,
  "digital-pr": Lightning,
  "paid-media": ChartBar,
  "social-content": PencilCircle,
  "web-development": Code,
  "ai-automation": Gear,
  "custom-software": Code,
  analytics: ChartBar,
};

const processSteps: Record<string, { step: string; title: string; desc: string }[]> = {
  "SEO Strategy": [
    { step: "01", title: "Discovery & Research", desc: "We audit your current search presence, analyse competitors, and identify market opportunities through keyword and content gap analysis." },
    { step: "02", title: "Strategy Development", desc: "We build a comprehensive SEO strategy with prioritised recommendations, resource planning, and KPI targets aligned to your business goals." },
    { step: "03", title: "Roadmap & Governance", desc: "We create a phased implementation roadmap with clear ownership, timelines, and success metrics for each initiative." },
    { step: "04", title: "Review & Adapt", desc: "We track performance against KPIs, refine the strategy based on data, and adapt to algorithm changes and market shifts." },
  ],
  "Technical SEO": [
    { step: "01", title: "Crawl Audit & Analysis", desc: "We perform a full crawl of your site to identify indexation issues, broken resources, redirect chains, and crawl budget inefficiencies." },
    { step: "02", title: "Core Web Vitals Optimisation", desc: "We analyse LCP, INP, and CLS data from CrUX and lab tools, then implement fixes for JavaScript, CSS, images, and server response times." },
    { step: "03", title: "Schema & Structure", desc: "We audit and deploy structured data markup, fix heading hierarchy issues, and optimise internal link architecture for better information flow." },
    { step: "04", title: "Monitor & Maintain", desc: "We set up ongoing crawl monitoring, log file analysis, and alerting to catch technical regressions before they impact rankings." },
  ],
  "On-Page SEO": [
    { step: "01", title: "Page-Level Audit", desc: "We audit every target page for title tags, meta descriptions, headings, content quality, keyword alignment, and internal linking." },
    { step: "02", title: "Content & Meta Optimisation", desc: "We rewrite and optimise meta data, headings, and body content to align with search intent and target keyword clusters." },
    { step: "03", title: "Internal Linking & Structure", desc: "We strengthen internal linking patterns to distribute page authority and help search engines understand content relationships." },
    { step: "04", title: "Monitor & Refine", desc: "We track ranking movements and click-through rates per page, iterating on optimisation as search patterns and competitor strategies evolve." },
  ],
  "Off-Page SEO": [
    { step: "01", title: "Backlink Profile Audit", desc: "We analyse your existing backlink profile for quality, relevance, and toxicity, identifying opportunities and risks in your link landscape." },
    { step: "02", title: "Competitor Link Analysis", desc: "We map your competitors' backlink profiles to uncover link-building opportunities and gaps in your own authority strategy." },
    { step: "03", title: "Outreach & Relationship Building", desc: "We develop link-earning assets and build relationships with relevant publishers, journalists, and industry authorities." },
    { step: "04", title: "Authority & Trust Tracking", desc: "We monitor domain authority, referring domain growth, and link acquisition velocity to measure off-page SEO impact." },
  ],
  "SEO Auditing": [
    { step: "01", title: "Comprehensive Site Crawl", desc: "We crawl your entire site to uncover technical issues, indexation problems, duplicate content, and structural weaknesses." },
    { step: "02", title: "Technical & Content Assessment", desc: "We evaluate page speed, Core Web Vitals, schema markup, content quality, keyword targeting, and user experience signals." },
    { step: "03", title: "Competitive Benchmarking", desc: "We compare your site's technical health, content depth, and authority profile against top competitors in your space." },
    { step: "04", title: "Prioritised Recommendations", desc: "We deliver a prioritised remediation roadmap with estimated effort, impact, and owner for every issue discovered." },
  ],
  "SEO Consulting": [
    { step: "01", title: "Current State Assessment", desc: "We evaluate your current SEO efforts, team capabilities, tools, and workflows to identify gaps and opportunities." },
    { step: "02", title: "Strategic Roadmap Development", desc: "We build a prioritised strategic plan with clear recommendations, resource requirements, and expected outcomes." },
    { step: "03", title: "Team Collaboration & Training", desc: "We work alongside your team through regular strategy sessions, training workshops, and ad-hoc expert guidance." },
    { step: "04", title: "Performance Review & Iteration", desc: "We conduct monthly performance reviews, refine strategies based on data, and keep your team ahead of industry changes." },
  ],
  "Keyword Research": [
    { step: "01", title: "Market & Audience Discovery", desc: "We research your industry, audience segments, and buying cycle to understand how search behaviour maps to your business." },
    { step: "02", title: "Keyword Opportunity Analysis", desc: "We generate a comprehensive keyword list using search volume, competition data, and trend analysis to identify high-value targets." },
    { step: "03", title: "Intent Mapping & Clustering", desc: "We group keywords by search intent and topic relevance, building clusters that inform content strategy and site architecture." },
    { step: "04", title: "Prioritisation & Handoff", desc: "We prioritise keywords by opportunity score and deliver a structured database ready for content planning and tracking." },
  ],
  "Content Strategy": [
    { step: "01", title: "Content Audit & Gap Analysis", desc: "We assess your existing content performance and identify gaps where high-demand topics lack adequate coverage." },
    { step: "02", title: "Topic Cluster Development", desc: "We build topic cluster architectures that establish topical authority and improve rankings across related search queries." },
    { step: "03", title: "Editorial Calendar & Governance", desc: "We create a structured content calendar with content briefs, success metrics, and editorial standards for consistent quality." },
    { step: "04", title: "Performance Measurement", desc: "We track content rankings, engagement, and conversions to refine the strategy and double down on what works." },
  ],
  "Content Development": [
    { step: "01", title: "Brief & Outline Creation", desc: "We develop detailed content briefs with target keywords, search intent, competitor examples, and structural guidance for writers." },
    { step: "02", title: "Writing & Production", desc: "We produce SEO-optimised content including articles, guides, case studies, and multimedia assets tailored to your audience." },
    { step: "03", title: "Review & Optimisation", desc: "Every piece goes through editorial review, SEO quality checks, and optimisation for readability, engagement, and ranking potential." },
    { step: "04", title: "Publishing & Distribution", desc: "We format and publish content in your CMS, optimise internal links, and coordinate distribution across relevant channels." },
  ],
  "Local SEO": [
    { step: "01", title: "Local Presence Audit", desc: "We audit your Google Business Profile, local citations, and NAP consistency across directories and platforms." },
    { step: "02", title: "GBP & Citation Optimisation", desc: "We optimise your Business Profile with complete information, categories, services, photos, and posts, and fix citation inaccuracies." },
    { step: "03", title: "Local Content & Reviews", desc: "We develop location-specific content and implement a review generation and management strategy to boost local trust signals." },
    { step: "04", title: "Local Pack Tracking", desc: "We monitor your local pack rankings, visibility trends, and competitor movements to continuously refine your local SEO approach." },
  ],
  "E-commerce SEO": [
    { step: "01", title: "Product Feed & Site Audit", desc: "We audit product pages, category structure, faceted navigation, and technical foundations for e-commerce search performance." },
    { step: "02", title: "Category & Product Optimisation", desc: "We optimise product titles, descriptions, images, reviews, and structured data to maximise visibility and click-through rates." },
    { step: "03", title: "Technical E-commerce Foundation", desc: "We fix pagination, canonicalisation, parameter handling, and site speed issues specific to large-scale e-commerce platforms." },
    { step: "04", title: "Measurement & Scaling", desc: "We track organic revenue, product page rankings, and category visibility, scaling optimisation across your full catalogue." },
  ],
  "Enterprise SEO": [
    { step: "01", title: "Stakeholder & Tech Discovery", desc: "We map your organisational structure, technology stack, and cross-functional teams to understand enterprise SEO constraints." },
    { step: "02", title: "Governance & Workflow Design", desc: "We build standardised workflows, content governance models, and communication protocols for consistent SEO at scale." },
    { step: "03", title: "Enterprise-Wide Optimisation", desc: "We implement technical fixes, content improvements, and process changes across business units with measurable impact tracking." },
    { step: "04", title: "Reporting & Executive Insights", desc: "We deliver enterprise-level reporting with executive dashboards, cross-unit performance comparisons, and board-ready insights." },
  ],
  "International SEO": [
    { step: "01", title: "Global Presence Audit", desc: "We audit your current international visibility, hreflang implementation, and country-specific ranking performance across target markets." },
    { step: "02", title: "Hreflang & Structure Setup", desc: "We configure hreflang annotations, URL structure decisions, and geo-targeting settings for correct international search serving." },
    { step: "03", title: "Multi-Language Content Strategy", desc: "We develop a content localisation strategy with native keyword research and culturally adapted messaging for each target market." },
    { step: "04", title: "Performance Across Markets", desc: "We monitor rankings, traffic, and conversions per country, adjusting strategy based on regional search trends and competitive dynamics." },
  ],
  "Website Migration SEO": [
    { step: "01", title: "Pre-Migration Audit & Planning", desc: "We document the current site structure, indexation status, and rankings, then plan every aspect of the migration to minimise risk." },
    { step: "02", title: "Staging & Redirect Testing", desc: "We build and test 301 redirect maps, validate new URLs against the old structure, and simulate the migration in a staging environment." },
    { step: "03", title: "Go-Live Monitoring & Validation", desc: "We monitor crawl behaviour, indexation, traffic, and rankings immediately post-migration to catch and resolve issues in real time." },
    { step: "04", title: "Post-Migration Recovery & Optimisation", desc: "We track recovery to baseline performance, fix residual issues, and optimise the new site structure for improved search presence." },
  ],
  "Digital PR for Search": [
    { step: "01", title: "Brand & Link Profile Audit", desc: "We assess your current brand presence, link profile, and media coverage to identify authority gaps and PR opportunities." },
    { step: "02", title: "Campaign Concept & Story Development", desc: "We create data-driven story angles, original research, and compelling narratives that journalists and publishers want to cover." },
    { step: "03", title: "Journalist Outreach & Engagement", desc: "We build targeted media lists and execute personalised outreach to secure high-authority backlinks and brand mentions." },
    { step: "04", title: "Coverage Analysis & Authority Tracking", desc: "We measure earned links, referral traffic, brand sentiment, and the direct impact on organic search authority and rankings." },
  ],
  "Search Reporting": [
    { step: "01", title: "KPI Framework & Dashboard Setup", desc: "We define your key performance indicators and build custom dashboards that connect search data to business outcomes." },
    { step: "02", title: "Data Collection & Integration", desc: "We integrate Google Search Console, Analytics, rank tracking tools, and CRM data into a unified reporting environment." },
    { step: "03", title: "Insight Generation & Reporting", desc: "We produce regular reports that interpret data, highlight trends, and deliver actionable recommendations — not just charts." },
    { step: "04", title: "Strategic Review & Optimisation", desc: "We use reporting insights to inform strategy adjustments, identify new opportunities, and continuously improve search performance." },
  ],
  "GEO & AI Search Visibility": [
    { step: "01", title: "AI Visibility Audit", desc: "We assess how your brand appears across generative engines, AI overviews, and LLM platforms." },
    { step: "02", title: "Entity & Content Strategy", desc: "Structuring your knowledge graph, entities, and content for AI discovery." },
    { step: "03", title: "Optimisation & Monitoring", desc: "Implementing changes and tracking your presence across AI search surfaces." },
    { step: "04", title: "Iterate & Scale", desc: "Continuous testing and refinement as AI search algorithms evolve." },
  ],
  "Generative Engine Optimisation": [
    { step: "01", title: "AI Visibility Assessment", desc: "We audit your current presence across ChatGPT, Perplexity, Google AI Overviews, Bing Copilot, and Gemini to establish a baseline across every major AI platform." },
    { step: "02", title: "Entity & Content Optimisation", desc: "We restructure your entity signals, knowledge graph connections, and content architecture so AI models can accurately discover and cite your brand." },
    { step: "03", title: "Brand Citation Development", desc: "We build citations and references in the sources AI platforms trust — authoritative publications, structured directories, and entity databases." },
    { step: "04", title: "Monitor & Iterate", desc: "We track your AI visibility metrics weekly and adapt your strategy as generative search platforms evolve their ranking and citation algorithms." },
  ],
  "Answer Engine Optimisation": [
    { step: "01", title: "Answer Landscape Analysis", desc: "We identify the questions and query types where answer engines feature results, mapping the answer ecosystem relevant to your industry." },
    { step: "02", title: "Content Structuring for Answers", desc: "We structure your content to be directly extractable and citable by answer engines — using clear Q&A formats, entity-rich passages, and authoritative sourcing." },
    { step: "03", title: "Authority Signal Enhancement", desc: "We strengthen the trust signals that answer engines use for source selection — entity authority, citation consistency, and content freshness." },
    { step: "04", title: "Answer Presence Tracking", desc: "We monitor answer engine citations, featured result appearances, and share of voice across every platform where answers are surfaced." },
  ],
  "AI Search Visibility Audits": [
    { step: "01", title: "Cross-Platform AI Audit", desc: "We assess your brand presence across ChatGPT, Perplexity, Google AI Overviews, Bing Copilot, and Gemini — documenting every mention, citation, and gap." },
    { step: "02", title: "Entity & Knowledge Graph Analysis", desc: "We evaluate your entity completeness, schema deployment, knowledge graph connections, and consistency across the structured data ecosystem." },
    { step: "03", title: "Content & Citation Review", desc: "We analyse your content structure, authority signals, citation sources, and their alignment with AI platform trust criteria." },
    { step: "04", title: "Prioritised Optimisation Plan", desc: "We deliver a ranked roadmap of every improvement needed for AI visibility — organised by impact, effort, and platform priority." },
  ],
  "Entity Optimisation": [
    { step: "01", title: "Entity Discovery & Mapping", desc: "We identify every entity associated with your brand — products, people, places, services — and map their attributes, relationships, and online references." },
    { step: "02", title: "Schema & Knowledge Graph Build", desc: "We deploy comprehensive structured data markup, build knowledge graph connections, and integrate with entity databases like Wikidata and Google Knowledge Graph." },
    { step: "03", title: "Entity Signal Strengthening", desc: "We build consistent entity references across the web — from your own site to third-party platforms — to reinforce what you are and what you do." },
    { step: "04", title: "Monitor & Maintain", desc: "We track entity accuracy, discover new entity opportunities, and maintain your knowledge graph as your brand and offerings evolve." },
  ],
  "Brand Citation Readiness": [
    { step: "01", title: "Citation Audit", desc: "We audit every brand citation, mention, and reference across the web — directories, social profiles, review sites, publisher mentions, and structured databases." },
    { step: "02", title: "Consistency & Coverage Plan", desc: "We standardise your NAP details, brand name, and description across all sources, and identify gaps where new citations are needed." },
    { step: "03", title: "Citation Building & Cleanup", desc: "We fix inaccuracies in existing citations and build new citations on authoritative platforms — structured directories, industry databases, and AI-trusted sources." },
    { step: "04", title: "Monitor & Protect", desc: "We continuously monitor your citation landscape with automated alerts for changes, inaccuracies, or new mention opportunities." },
  ],
  "Structured Content Planning": [
    { step: "01", title: "Content Architecture Audit", desc: "We review your existing content structure, topic coverage, entity alignment, and how effectively AI platforms can extract and cite your information." },
    { step: "02", title: "Structured Content Blueprint", desc: "We design a content architecture optimised for AI extraction — entity-rich topic clusters, structured data integration, and citation-ready formatting." },
    { step: "03", title: "Template & Governance Build", desc: "We create content templates, editorial guidelines, and governance frameworks that ensure every piece of content is structured for AI discovery." },
    { step: "04", title: "Deploy & Measure", desc: "We implement the new content structure and track AI citation performance, refining the approach based on real platform data." },
  ],
  "PR & Brand Authority": [
    { step: "01", title: "Brand Audit", desc: "We evaluate your current brand presence, media coverage, and authority signals." },
    { step: "02", title: "Story & Campaign Development", desc: "Crafting compelling narratives and data-driven campaigns that journalists want to cover." },
    { step: "03", title: "Outreach & Placement", desc: "Targeted media outreach, thought leadership placement, and link-earning execution." },
    { step: "04", title: "Measurement & Reporting", desc: "Tracking coverage, share of voice, referral traffic, and authority metrics." },
  ],
  "Digital PR": [
    { step: "01", title: "Brand & Landscape Audit", desc: "We assess your current media presence, competitor coverage landscape, and authority gaps to identify the highest-impact PR opportunities." },
    { step: "02", title: "Story & Campaign Development", desc: "We craft data-driven narratives and campaigns built around original research, proprietary data, or unique insights that journalists want to cover." },
    { step: "03", title: "Targeted Outreach & Placement", desc: "We build targeted media lists, personalise every pitch, and secure tier-1 coverage through strategic journalist relationships." },
    { step: "04", title: "Impact Measurement", desc: "We track coverage quality, earned backlinks, referral traffic, and authority growth to measure PR's direct business impact." },
  ],
  "Press Release Strategy": [
    { step: "01", title: "Newsworthiness Assessment", desc: "We evaluate your news angle for media relevance, timeliness, audience interest, and competitive context to ensure it's worth pitching." },
    { step: "02", title: "Press Release Writing", desc: "We craft a compelling release with a strong headline, multimedia assets, quotable spokesperson statements, and supporting data." },
    { step: "03", title: "Distribution & Targeting", desc: "We distribute your release to the right journalists and outlets at the optimal time, using targeted media lists and wire services strategically." },
    { step: "04", title: "Coverage Monitoring & Follow-Up", desc: "We track pickups, follow up with key journalists, and measure reach, sentiment, and engagement from every placement." },
  ],
  "Media Outreach": [
    { step: "01", title: "Media Mapping", desc: "We build a targeted media list with relevant journalists, beat reporters, editors, and industry publications that cover your space." },
    { step: "02", title: "Pitch Personalisation", desc: "We craft personalised pitches that demonstrate genuine familiarity with each journalist's coverage area, style, and audience." },
    { step: "03", title: "Outreach Execution", desc: "We execute multi-touch outreach sequences with carefully timed follow-ups that respect journalist preferences and build relationships." },
    { step: "04", title: "Relationship Nurturing", desc: "We nurture ongoing journalist relationships for repeat coverage, insider access, and long-term media partnerships." },
  ],
  "Journalist Research": [
    { step: "01", title: "Journalist Database Build", desc: "We research and compile a targeted database of journalists, editors, and influencers covering your industry, beat, and topics." },
    { step: "02", title: "Coverage Pattern Analysis", desc: "We analyse each journalist's writing style, preferred sources, topic focus, and audience engagement to inform pitch strategy." },
    { step: "03", title: "Relationship Mapping", desc: "We identify second-degree connections, past coverage patterns, and optimal pitching angles for each target journalist." },
    { step: "04", title: "Ongoing Monitoring", desc: "We track journalist moves, beat changes, new hires, and emerging coverage opportunities in real-time." },
  ],
  "Founder Positioning": [
    { step: "01", title: "Founder Narrative Development", desc: "We craft your founder's unique story, core expertise areas, and differentiated positioning angles that set them apart in their industry." },
    { step: "02", title: "Platform & Profile Optimisation", desc: "We optimise LinkedIn, personal website, speaker profiles, and bio pages for maximum authority and discoverability." },
    { step: "03", title: "Thought Leadership Placement", desc: "We secure byline articles, podcast appearances, speaking engagements, and panel invitations that build founder authority." },
    { step: "04", title: "Monitor & Amplify", desc: "We track founder mentions, share of voice, and amplify published content across relevant channels for maximum reach." },
  ],
  "Thought Leadership": [
    { step: "01", title: "Expertise & Topic Mapping", desc: "We identify your key expertise areas and the topics where your brand can establish credible, differentiated authority." },
    { step: "02", title: "Content & Platform Strategy", desc: "We develop a multi-platform thought leadership plan covering bylines, speaking engagements, social content, and media contributions." },
    { step: "03", title: "Publication & Speaking Outreach", desc: "We pitch articles to target publications, apply for speaking slots, and secure panel and keynote invitations at industry events." },
    { step: "04", title: "Authority Tracking", desc: "We measure share of voice, content engagement, speaking impact, and overall authority growth across all channels." },
  ],
  "Brand Mentions": [
    { step: "01", title: "Mention Audit", desc: "We audit every current brand mention across web, social, news, review platforms, and industry databases to establish a baseline." },
    { step: "02", title: "Brand Mention Strategy", desc: "We develop a systematic approach for earning new mentions and managing existing ones across every relevant channel." },
    { step: "03", title: "Mention Development", desc: "We actively build brand mentions through content partnerships, PR activities, directory listings, and strategic collaborations." },
    { step: "04", title: "Monitoring & Reporting", desc: "We track mention volume, sentiment, reach, source authority, and competitive mention share with ongoing reporting." },
  ],
  "Link-Earning Campaigns": [
    { step: "01", title: "Opportunity Research", desc: "We identify link-worthy topics, data stories, and digital assets that publishers, bloggers, and journalists will naturally want to reference." },
    { step: "02", title: "Asset Creation", desc: "We develop original research, interactive tools, data visualisations, or comprehensive resources built specifically to attract editorial links." },
    { step: "03", title: "Targeted Promotion", desc: "We reach out to relevant publishers, journalists, and bloggers who cover your industry with personalised pitches for each asset." },
    { step: "04", title: "Link Acquisition Tracking", desc: "We monitor earned links, referring domain authority, link velocity, and campaign ROI with real-time tracking dashboards." },
  ],
  "Reputation Management": [
    { step: "01", title: "Reputation Audit", desc: "We assess your current online reputation across review platforms, news coverage, social media, and search results." },
    { step: "02", title: "Strategy & Prioritisation", desc: "We develop a prioritised plan addressing negative content, coverage gaps, review management, and trust-building opportunities." },
    { step: "03", title: "Content & Response Execution", desc: "We deploy positive content, manage review responses, address negative coverage, and build a stronger brand narrative." },
    { step: "04", title: "Ongoing Monitoring", desc: "We provide continuous reputation monitoring with real-time alerts for emerging issues, sentiment shifts, or new mentions." },
  ],
  "Crisis Communication Support": [
    { step: "01", title: "Crisis Readiness Assessment", desc: "We evaluate your current crisis communication plans, protocols, team readiness, and potential vulnerability scenarios." },
    { step: "02", title: "Crisis Response Framework", desc: "We develop a structured response framework with approved messaging, communication channels, escalation paths, and spokesperson training." },
    { step: "03", title: "Real-Time Crisis Management", desc: "We provide active monitoring, rapid response guidance, messaging updates, and media management throughout a crisis event." },
    { step: "04", title: "Post-Crisis Analysis", desc: "We debrief the response, measure reputational impact, document lessons learned, and update protocols for future readiness." },
  ],
  "Awards and Profile Support": [
    { step: "01", title: "Award Opportunity Audit", desc: "We research relevant industry awards, rankings, recognitions, and honours that align with your brand's achievements and goals." },
    { step: "02", title: "Submission Development", desc: "We craft compelling award submissions that clearly communicate your achievements, impact metrics, and differentiation." },
    { step: "03", title: "Profile & Credential Building", desc: "We strengthen supporting credentials — case studies, testimonials, media coverage — that reinforce every submission and profile." },
    { step: "04", title: "Tracking & Leveraging", desc: "We track award results, deadlines, and outcomes, and amplify every win across your marketing and PR channels." },
  ],
  "PR Measurement": [
    { step: "01", title: "Measurement Framework Setup", desc: "We define PR KPIs, benchmarks, and reporting cadence aligned to your business goals — not just vanity metrics." },
    { step: "02", title: "Data Collection & Integration", desc: "We set up tools and processes for collecting media coverage, engagement data, share of voice, and business impact metrics." },
    { step: "03", title: "Reporting Dashboard Build", desc: "We create custom dashboards that visualise PR performance, trend analysis, and ROI in a format executives can act on." },
    { step: "04", title: "Analysis & Optimisation", desc: "We provide regular analysis of PR performance with actionable recommendations for improving coverage quality and business impact." },
  ],
  "Paid Media & Performance": [
    { step: "01", title: "Audit & Opportunity Analysis", desc: "Reviewing current campaigns, conversion data, and market positioning." },
    { step: "02", title: "Strategy & Media Plan", desc: "Channel selection, budget allocation, audience targeting, and creative direction." },
    { step: "03", title: "Launch & Optimise", desc: "Campaign setup, landing page alignment, and continuous bid and creative optimisation." },
    { step: "04", title: "Report & Scale", desc: "Transparent reporting, ROAS analysis, and scaling what works." },
  ],
  "Google Ads": [
    { step: "01", title: "Account Audit & Structure", desc: "We audit your current Google Ads account structure, campaign settings, and performance data to identify optimisation opportunities." },
    { step: "02", title: "Keyword & Audience Strategy", desc: "We develop a comprehensive keyword strategy with match types, audience segments, and negative keyword lists aligned to your goals." },
    { step: "03", title: "Campaign Build & Optimisation", desc: "We build structured campaigns with compelling ad copy, extensions, and landing page alignment, then continuously optimise bids and creatives." },
    { step: "04", title: "Performance Reporting & Scale", desc: "We track ROAS, CPA, and conversion metrics with transparent reporting, then scale what works and fix what doesn't." },
  ],
  "PPC Management": [
    { step: "01", title: "Account Audit & Health Check", desc: "We perform a full audit of your PPC accounts across Google, Bing, and other platforms to assess structure, settings, and performance." },
    { step: "02", title: "Campaign Optimisation Plan", desc: "We develop a prioritised optimisation plan covering bid strategy, ad copy, audience targeting, and landing page alignment." },
    { step: "03", title: "Ongoing Management & Optimisation", desc: "We manage campaigns day-to-day — bid adjustments, A/B testing, audience refinement, and budget allocation based on real-time performance." },
    { step: "04", title: "Reporting & Strategy Iteration", desc: "We deliver regular performance reports and adjust strategy based on conversion data, market changes, and business goals." },
  ],
  "Search Advertising": [
    { step: "01", title: "Search Landscape Analysis", desc: "We analyse your market, competitors, and search behaviour to identify high-opportunity keywords and audience segments." },
    { step: "02", title: "Campaign Architecture", desc: "We design a structured search campaign with proper keyword grouping, match types, ad extensions, and landing page mapping." },
    { step: "03", title: "Launch & Optimisation", desc: "We launch campaigns with compelling ad copy and continuous bid, budget, and creative optimisation to maximise search ROAS." },
    { step: "04", title: "Performance Monitoring", desc: "We track impression share, click-through rates, conversion data, and cost metrics with regular optimisation cadence." },
  ],
  "Display Advertising": [
    { step: "01", title: "Audience & Placement Strategy", desc: "We define target audiences, placement categories, and contextual targeting strategies based on your ideal customer profile." },
    { step: "02", title: "Creative & Format Development", desc: "We develop compelling display creatives across formats — static, responsive, video, and rich media — tailored to each audience segment." },
    { step: "03", title: "Campaign Deployment & Optimisation", desc: "We launch campaigns with structured bidding, frequency capping, and continuous optimisation based on impression and engagement data." },
    { step: "04", title: "Performance & Brand Impact", desc: "We measure reach, frequency, view-through conversions, and brand lift metrics to evaluate display's full funnel impact." },
  ],
  "Remarketing": [
    { step: "01", title: "Audience Segmentation", desc: "We segment your website visitors, past customers, and engaged users into remarketing lists based on behaviour and intent signals." },
    { step: "02", title: "Strategy & Creative Development", desc: "We develop remarketing strategies for each segment with tailored messaging, offers, and creative that matches their stage in the funnel." },
    { step: "03", title: "Campaign Setup & Optimisation", desc: "We deploy remarketing campaigns across search, display, and social with frequency management and bid optimisation for each segment." },
    { step: "04", title: "Performance Analysis & Refinement", desc: "We track lift, conversion rates, and cost per conversion by segment, refining audience definitions and creative approaches continuously." },
  ],
  "Paid Social": [
    { step: "01", title: "Platform & Audience Strategy", desc: "We select the right social platforms — Meta, LinkedIn, TikTok, X — and define audience segments based on demographics, interests, and behaviours." },
    { step: "02", title: "Creative & Content Development", desc: "We develop platform-native creative — video, static, carousel, stories — tailored to each platform's best practices and audience preferences." },
    { step: "03", title: "Campaign Management & Optimisation", desc: "We launch and manage campaigns with continuous optimisation of bidding, targeting, creative rotation, and budget allocation." },
    { step: "04", title: "Reporting & Audience Insights", desc: "We track engagement, conversion, and cost metrics while building audience insights that inform broader marketing strategy." },
  ],
  "Media Planning": [
    { step: "01", title: "Market Research & Audience Analysis", desc: "We research your target audience, market dynamics, and competitive media landscape to inform channel selection and budget allocation." },
    { step: "02", title: "Media Strategy & Plan Development", desc: "We develop a comprehensive media plan with channel mix, budget splits, audience targeting, and measurement framework." },
    { step: "03", title: "Plan Implementation & Coordination", desc: "We coordinate campaign setup across channels, ensuring consistent messaging, audience targeting, and tracking implementation." },
    { step: "04", title: "Performance Analysis & Optimisation", desc: "We track plan performance against KPIs, reallocate budget to highest-performing channels, and refine the media mix based on data." },
  ],
  "Landing Page Optimisation": [
    { step: "01", title: "Landing Page Audit & Analysis", desc: "We audit your existing landing pages for conversion performance, load speed, messaging clarity, and user experience friction points." },
    { step: "02", title: "Hypothesis Development", desc: "We develop data-driven hypotheses for improvement based on heatmaps, session recordings, form analytics, and user behaviour data." },
    { step: "03", title: "Design & Implementation", desc: "We redesign and implement landing page improvements — layout, copy, CTAs, forms, and trust signals — optimised for conversion." },
    { step: "04", title: "A/B Testing & Iteration", desc: "We run structured A/B tests, analyse results, implement winning variants, and maintain a continuous testing programme." },
  ],
  "Conversion Tracking": [
    { step: "01", title: "Tracking Audit & Gap Analysis", desc: "We audit your current tracking setup across platforms — Google Ads, Meta, LinkedIn, GA4, CRM — to identify gaps and inconsistencies." },
    { step: "02", title: "Tracking Implementation", desc: "We implement proper conversion tracking with events, goals, offline conversion imports, and cross-platform attribution alignment." },
    { step: "03", title: "Validation & Quality Assurance", desc: "We validate every tracking event, test conversion paths, and set up quality monitoring to ensure data accuracy over time." },
    { step: "04", title: "Reporting & Attribution Setup", desc: "We build dashboards that connect conversion data to campaign performance and implement attribution models that reflect your customer journey." },
  ],
  "Campaign Auditing": [
    { step: "01", title: "Full Account Audit", desc: "We conduct a comprehensive audit of your ad accounts — structure, settings, targeting, creative, landing pages, and tracking." },
    { step: "02", title: "Performance Benchmarking", desc: "We benchmark your campaign performance against industry standards, historical data, and competitive insights to identify gaps." },
    { step: "03", title: "Issue Identification & Prioritisation", desc: "We identify every issue, inefficiency, and opportunity, prioritised by potential impact on performance and ROAS." },
    { step: "04", title: "Actionable Optimisation Roadmap", desc: "We deliver a prioritised roadmap with clear recommendations, estimated impact, and implementation guidance for every finding." },
  ],
  "Budget Planning": [
    { step: "01", title: "Business Goal Alignment", desc: "We align budget planning with your business objectives — revenue targets, customer acquisition costs, and growth timelines." },
    { step: "02", title: "Channel & Campaign Budgeting", desc: "We allocate budgets across channels and campaigns based on historical performance, market opportunities, and strategic priorities." },
    { step: "03", title: "Forecast & Scenario Modelling", desc: "We build budget forecasts and scenario models that show expected outcomes at different spend levels and allocation strategies." },
    { step: "04", title: "Monitoring & Reallocation", desc: "We track actual spend against plan and recommend reallocations based on real-time performance and changing market conditions." },
  ],
  "Creative Testing": [
    { step: "01", title: "Testing Framework Setup", desc: "We establish a structured testing framework with hypotheses, success metrics, sample sizes, and testing cadence aligned to your campaign goals." },
    { step: "02", title: "Creative Variant Development", desc: "We develop creative variants — headlines, images, CTAs, formats, offers — designed to test specific hypotheses about what drives performance." },
    { step: "03", title: "Test Execution & Monitoring", desc: "We run controlled tests across channels, monitor statistical significance, and track performance differences between variants in real-time." },
    { step: "04", title: "Analysis & Implementation", desc: "We analyse test results, document learnings, implement winning variants, and feed insights into the next testing cycle." },
  ],
  "Social Media Strategy": [
    { step: "01", title: "Audit & Opportunity Analysis", desc: "We audit your current social presence, audience engagement, competitor activity, and platform performance to identify gaps and opportunities." },
    { step: "02", title: "Strategy Development", desc: "We define platform priorities, content pillars, audience segments, engagement tactics, and measurement framework aligned to business goals." },
    { step: "03", title: "Editorial Planning & Calendar", desc: "We build a structured content calendar with campaign themes, content formats, posting cadences, and cross-platform coordination." },
    { step: "04", title: "Monitor, Measure & Optimise", desc: "We track performance metrics, audience growth, engagement rates, and conversion data, then refine strategy based on real insights." },
  ],
  "Social Media Management": [
    { step: "01", title: "Account & Community Setup", desc: "We set up or audit your social profiles, ensure brand consistency, and establish community management guidelines and response protocols." },
    { step: "02", title: "Content Creation & Scheduling", desc: "We produce platform-native content, schedule posts for optimal times, and manage the daily publishing cadence across all active channels." },
    { step: "03", title: "Community Engagement & Growth", desc: "We manage comments, messages, and mentions, engage with relevant conversations, and implement growth tactics to build your audience." },
    { step: "04", title: "Reporting & Optimisation", desc: "We deliver monthly performance reports with engagement analytics, audience insights, and recommendations for continuous improvement." },
  ],
  "Social Campaigns": [
    { step: "01", title: "Campaign Strategy & Objectives", desc: "We define campaign goals, target audiences, platform selection, and key performance indicators aligned to your marketing objectives." },
    { step: "02", title: "Creative & Content Development", desc: "We develop campaign creative — visuals, copy, video, and interactive elements — tailored to each platform and audience segment." },
    { step: "03", title: "Launch & Amplification", desc: "We coordinate campaign launch across organic and paid channels, manage content distribution, and amplify reach through targeted promotion." },
    { step: "04", title: "Analysis & Optimisation", desc: "We track campaign performance in real-time, A/B test creative and messaging, and optimise based on engagement and conversion data." },
  ],
  "Content Production": [
    { step: "01", title: "Content Brief & Planning", desc: "We develop detailed content briefs aligned to strategy, including format, tone, key messages, SEO requirements, and distribution channels." },
    { step: "02", title: "Creation & Production", desc: "We produce high-quality content — articles, guides, videos, infographics, podcasts — with rigorous editing and brand alignment." },
    { step: "03", title: "Review & Approval", desc: "We manage a structured review process with stakeholder feedback, revisions, and final approval before publishing." },
    { step: "04", title: "Distribution & Performance Tracking", desc: "We publish content across channels, track performance metrics, and use insights to inform future content production." },
  ],
  "Social Content": [
    { step: "01", title: "Platform Audit & Content Audit", desc: "We review your existing social content performance, platform-specific best practices, audience preferences, and competitive content landscape." },
    { step: "02", title: "Content Strategy & Calendar", desc: "We develop a platform-specific content strategy with content pillars, format mix, posting cadence, and engagement hooks." },
    { step: "03", title: "Content Creation & Publishing", desc: "We produce and publish platform-native social content — static, video, carousel, stories, and interactive formats — optimised for each channel." },
    { step: "04", title: "Engagement Analysis & Optimisation", desc: "We track content performance by format, topic, and platform, and continuously refine the content mix based on engagement data." },
  ],
  "Video and Motion": [
    { step: "01", title: "Creative Brief & Concept Development", desc: "We develop creative concepts aligned to your brand, message, and goals — defining video format, length, tone, and distribution strategy." },
    { step: "02", title: "Pre-Production & Planning", desc: "We handle scripting, storyboarding, talent sourcing, location scouting, and production scheduling to ensure a smooth shoot." },
    { step: "03", title: "Production & Post-Production", desc: "We manage filming, animation, editing, colour grading, sound design, and motion graphics to deliver polished, on-brand video content." },
    { step: "04", title: "Distribution & Performance", desc: "We optimise video for each platform, manage publishing, and track view-through rates, engagement, and conversion impact." },
  ],
  "Email Marketing": [
    { step: "01", title: "Audience & List Strategy", desc: "We audit your email lists, segment audiences based on behaviour and preferences, and develop list growth and hygiene strategies." },
    { step: "02", title: "Campaign Strategy & Design", desc: "We design email campaigns — newsletters, nurture sequences, promotional emails, and automated workflows — with compelling copy and design." },
    { step: "03", title: "Automation & Personalisation", desc: "We set up triggered email flows, behavioural automations, dynamic content personalisation, and A/B testing frameworks." },
    { step: "04", title: "Reporting & Optimisation", desc: "We track open rates, click-through rates, conversion data, and list health, then optimise subject lines, content, and send timing." },
  ],
  "Brand Messaging": [
    { step: "01", title: "Brand Discovery & Positioning", desc: "We explore your brand values, market position, target audience, competitive landscape, and unique value proposition to inform messaging." },
    { step: "02", title: "Messaging Framework Development", desc: "We develop a structured messaging framework — core message, value propositions, brand voice guidelines, and key messages by audience." },
    { step: "03", title: "Application & Activation", desc: "We apply the messaging framework across channels — website, social, email, sales materials, advertising — ensuring consistent brand voice." },
    { step: "04", title: "Testing & Refinement", desc: "We test messaging effectiveness through A/B testing, audience research, and performance analysis, refining based on what resonates." },
  ],
  "Campaign Creative": [
    { step: "01", title: "Creative Strategy & Brief", desc: "We develop a creative strategy aligned to campaign objectives, defining the big idea, visual direction, tone, and key messages." },
    { step: "02", title: "Concept Development & Exploration", desc: "We generate multiple creative concepts, explore visual directions, and refine the strongest ideas through internal and stakeholder feedback." },
    { step: "03", title: "Production & Refinement", desc: "We produce final creative assets — visuals, copy, video, interactive elements — across all required formats and platforms." },
    { step: "04", title: "Delivery & Performance Review", desc: "We deliver final assets with platform specifications, track campaign creative performance, and document learnings for future campaigns." },
  ],
  "Copywriting": [
    { step: "01", title: "Brief & Audience Understanding", desc: "We review the content brief, target audience, brand voice guidelines, SEO requirements, and project objectives to inform the writing." },
    { step: "02", title: "Research & Outline", desc: "We conduct topic research, competitor content analysis, and keyword analysis, then develop a structured outline for approval." },
    { step: "03", title: "Writing & Editing", desc: "We write compelling copy that aligns with brand voice, optimise for SEO and readability, and undergo rigorous editing and proofreading." },
    { step: "04", title: "Delivery & Optimisation", desc: "We deliver final copy in required formats, provide revision rounds, and optimise based on performance data and stakeholder feedback." },
  ],
  "Content Systems": [
    { step: "01", title: "Audit & Requirements Gathering", desc: "We audit your current content operations — tools, workflows, roles, and processes — and define requirements for the content system." },
    { step: "02", title: "System Architecture & Tool Selection", desc: "We design the content system architecture, select appropriate tools (CMS, DAM, project management, analytics), and define integration points." },
    { step: "03", title: "Implementation & Workflow Design", desc: "We implement the content system, configure tools, design workflows and approval processes, and establish content governance guidelines." },
    { step: "04", title: "Training & Optimisation", desc: "We train your team on the new system, document processes, and continuously optimise workflows based on usage data and team feedback." },
  ],
  "Social, Content & Creative": [
    { step: "01", title: "Content Audit & Strategy", desc: "Reviewing existing content performance, audience gaps, and competitive positioning." },
    { step: "02", title: "Creative Development", desc: "Producing high-quality content, visuals, and messaging aligned with your brand." },
    { step: "03", title: "Distribution & Publishing", desc: "Multi-channel deployment across social, email, and content platforms." },
    { step: "04", title: "Analyse & Refine", desc: "Performance analysis, A/B testing, and iterative improvement." },
  ],
  "Next.js Website Development": [
    { step: "01", title: "Discovery & Technical Specification", desc: "We define project goals, technical requirements, architecture decisions, and performance benchmarks aligned to your business needs." },
    { step: "02", title: "Design & Prototyping", desc: "We create UI/UX designs, interactive prototypes, and component architecture that leverage Next.js App Router and React Server Components." },
    { step: "03", title: "Development & Integration", desc: "We build with Next.js 16, implementing routing, data fetching, SSR/ISR/SSG strategies, CMS integration, and third-party services." },
    { step: "04", title: "Testing, Deploy & Optimise", desc: "We conduct thorough testing, deploy on Vercel, and continuously monitor performance, Core Web Vitals, and conversion metrics." },
  ],
  "Corporate Websites": [
    { step: "01", title: "Discovery & Information Architecture", desc: "We analyse your brand, stakeholders, content requirements, and user needs to define site structure and navigation." },
    { step: "02", title: "Design & Brand Integration", desc: "We design a corporate site that reflects your brand identity with professional layouts, typography, and visual systems." },
    { step: "03", title: "Development & CMS Setup", desc: "We build the site with a flexible CMS, implement content models, and integrate with your existing tools and systems." },
    { step: "04", title: "Launch & Governance", desc: "We manage launch, set up content governance workflows, and provide training so your team can manage the site independently." },
  ],
  "Marketing Websites": [
    { step: "01", title: "Strategy & Conversion Architecture", desc: "We define marketing goals, target audience journeys, conversion paths, and content hierarchy to maximise engagement and leads." },
    { step: "02", title: "Design & Content Integration", desc: "We design high-impact marketing pages with persuasive layouts, compelling visuals, and integrated content that tells your story." },
    { step: "03", title: "Development & Optimisation", desc: "We build for speed, SEO, and conversion — implementing analytics, tracking, A/B testing frameworks, and marketing tool integrations." },
    { step: "04", title: "Launch & Iteration", desc: "We launch with full tracking in place, monitor performance, and iterate based on conversion data and user behaviour insights." },
  ],
  "Landing Pages": [
    { step: "01", title: "Goal Definition & Audience Mapping", desc: "We define the page goal, target audience, key message, and desired action to inform every design and content decision." },
    { step: "02", title: "Copywriting & Design", desc: "We craft persuasive copy and design a focused layout with clear hierarchy, compelling CTAs, trust signals, and minimal distractions." },
    { step: "03", title: "Development & Tracking Setup", desc: "We build the landing page for speed and mobile performance, implement conversion tracking, and integrate with your marketing tools." },
    { step: "04", title: "Testing & Optimisation", desc: "We A/B test headlines, layouts, CTAs, and offers, then iterate based on conversion data to continuously improve performance." },
  ],
  "E-commerce Development": [
    { step: "01", title: "Product Strategy & Platform Selection", desc: "We define product catalogue structure, pricing models, checkout flow requirements, and select the right e-commerce platform for your needs." },
    { step: "02", title: "Design & User Experience", desc: "We design intuitive product pages, streamlined cart and checkout flows, search and filter systems, and mobile-first shopping experiences." },
    { step: "03", title: "Development & Integration", desc: "We build the store with product management, payment gateway integration, shipping logic, inventory management, and marketing tool connections." },
    { step: "04", title: "Launch & Optimisation", desc: "We launch with full tracking, monitor conversion funnels, optimise product pages and checkout, and implement upsell/cross-sell strategies." },
  ],
  "WordPress Development": [
    { step: "01", title: "Requirements & Architecture", desc: "We define the site requirements, select appropriate WordPress architecture (traditional or headless), and plan content models and integrations." },
    { step: "02", title: "Theme Development & Design", desc: "We develop a custom WordPress theme with ACF/professional page builder, responsive design, and brand-aligned styling." },
    { step: "03", title: "Plugin Integration & Customisation", desc: "We integrate and configure plugins for SEO, performance, security, forms, e-commerce, and any required functionality." },
    { step: "04", title: "Launch, Training & Support", desc: "We launch the site, provide admin training, document workflows, and offer ongoing support and maintenance." },
  ],
  "Headless CMS Development": [
    { step: "01", title: "Content Modelling & Architecture", desc: "We design content models, define content types and relationships, and plan the API structure for headless content delivery." },
    { step: "02", title: "CMS Configuration & Setup", desc: "We set up the headless CMS (Contentful, Sanity, Strapi, or custom), configure the admin interface, and establish content workflows." },
    { step: "03", title: "Frontend Development & Integration", desc: "We build the frontend with Next.js or React, integrate with the CMS API, implement preview mode, and set up webhook-driven rebuilds." },
    { step: "04", title: "Go-Live & Content Migration", desc: "We migrate existing content, set up CI/CD pipelines, launch the site, and provide editor training on the new CMS." },
  ],
  "UI and UX Design": [
    { step: "01", title: "Research & Discovery", desc: "We conduct user research, stakeholder interviews, competitive analysis, and usability audits to understand user needs and pain points." },
    { step: "02", title: "Information Architecture & Wireframing", desc: "We create sitemaps, user flows, and wireframes that define structure, navigation, and content hierarchy." },
    { step: "03", title: "Visual Design & Prototyping", desc: "We design high-fidelity mockups and interactive prototypes with pixel-perfect UI, design systems, and accessibility compliance." },
    { step: "04", title: "Testing & Handoff", desc: "We conduct usability testing, iterate based on feedback, and deliver comprehensive design specs, assets, and developer handoff documentation." },
  ],
  "Web Applications": [
    { step: "01", title: "Product Discovery & Specification", desc: "We define product vision, user stories, technical requirements, and success metrics for your web application." },
    { step: "02", title: "Architecture & Design", desc: "We design system architecture, database schema, API structure, and UI/UX with scalability, security, and performance in mind." },
    { step: "03", title: "Agile Development & Testing", desc: "We build the application in iterative sprints with continuous testing, code reviews, and regular stakeholder demos." },
    { step: "04", title: "Deployment & Maintenance", desc: "We deploy to production with monitoring, set up CI/CD, provide documentation, and offer ongoing support and feature development." },
  ],
  "Customer Portals": [
    { step: "01", title: "User Research & Requirements", desc: "We research your customers' needs, pain points, and workflows to define the portal's functionality, features, and user experience." },
    { step: "02", title: "Design & Prototyping", desc: "We design the portal interface with intuitive navigation, personalised dashboards, self-service tools, and seamless authentication flows." },
    { step: "03", title: "Development & Integration", desc: "We build the portal with secure authentication, CRM/data integration, document management, notification systems, and analytics." },
    { step: "04", title: "Launch & Adoption", desc: "We launch with onboarding support, user training materials, and adoption tracking to ensure your customers actually use the portal." },
  ],
  "Mobile Applications": [
    { step: "01", title: "Product Strategy & Platform Decision", desc: "We define the app vision, target users, core features, and choose between native, cross-platform (React Native/Flutter), or progressive web app." },
    { step: "02", title: "Design & User Experience", desc: "We design mobile-optimised interfaces with intuitive navigation, touch interactions, and platform-specific design patterns." },
    { step: "03", title: "Development & Testing", desc: "We build the app with clean architecture, implement features, integrate APIs, and test across devices and OS versions." },
    { step: "04", title: "Deployment & Iteration", desc: "We submit to app stores, monitor crash reports and user feedback, and iterate with regular updates and feature releases." },
  ],
  "Performance Optimisation": [
    { step: "01", title: "Performance Audit & Benchmarking", desc: "We audit your site's current performance using Lighthouse, WebPageTest, Core Web Vitals, and real user monitoring data." },
    { step: "02", title: "Opportunity Analysis & Prioritisation", desc: "We identify performance bottlenecks — JavaScript, images, fonts, server response, caching — and prioritise fixes by impact." },
    { step: "03", title: "Implementation & Optimisation", desc: "We implement optimisations — code splitting, image optimisation, CDN configuration, caching strategies, and server tuning." },
    { step: "04", title: "Monitoring & Ongoing Improvement", desc: "We set up performance monitoring dashboards, establish performance budgets, and continuously optimise to maintain fast load times." },
  ],
  "Accessibility Improvement": [
    { step: "01", title: "Accessibility Audit & Assessment", desc: "We conduct a comprehensive audit using WCAG 2.2 AA standards, automated tools, manual testing, and screen reader evaluations." },
    { step: "02", title: "Issue Prioritisation & Remediation Plan", desc: "We document every accessibility issue, categorise by severity and impact, and develop a prioritised remediation roadmap." },
    { step: "03", title: "Implementation & Remediation", desc: "We fix accessibility issues — ARIA labels, keyboard navigation, colour contrast, focus management, form validation, and semantic HTML." },
    { step: "04", title: "Validation & Ongoing Compliance", desc: "We re-test to validate fixes, provide documentation, train your team on accessible practices, and set up ongoing monitoring." },
  ],
  "Websites & Digital Products": [
    { step: "01", title: "Discovery & Specification", desc: "Understanding your users, business goals, and technical requirements." },
    { step: "02", title: "Design & Prototyping", desc: "UI/UX design, wireframing, and interactive prototyping." },
    { step: "03", title: "Development & Testing", desc: "Agile development with continuous testing, QA, and performance optimisation." },
    { step: "04", title: "Launch & Support", desc: "Deployment, monitoring, and ongoing maintenance and iteration." },
  ],
  "AI Strategy": [
    { step: "01", title: "Discovery & Opportunity Mapping", desc: "We assess your business processes, data landscape, and competitive context to identify high-impact AI opportunities." },
    { step: "02", title: "Strategy & Roadmap Development", desc: "We develop an AI strategy with prioritised use cases, technology recommendations, implementation roadmap, and ROI projections." },
    { step: "03", title: "Governance & Risk Framework", desc: "We establish AI governance policies, ethical guidelines, data privacy protocols, and risk management frameworks." },
    { step: "04", title: "Implementation & Capability Building", desc: "We guide implementation of priority use cases, build internal AI capabilities, and establish ongoing measurement and iteration processes." },
  ],
  "AI Readiness Audits": [
    { step: "01", title: "Data & Infrastructure Assessment", desc: "We audit your data quality, accessibility, infrastructure, and tooling to determine readiness for AI implementation." },
    { step: "02", title: "Process & Talent Evaluation", desc: "We evaluate your existing processes, team skills, and organisational capacity to adopt and manage AI solutions." },
    { step: "03", title: "Gap Analysis & Readiness Score", desc: "We identify gaps across data, technology, process, and people dimensions, and produce a readiness score with prioritised recommendations." },
    { step: "04", title: "Action Plan & Quick Wins", desc: "We deliver a phased action plan with quick-win AI opportunities, investment estimates, and a roadmap to full AI readiness." },
  ],
  "AI Agents": [
    { step: "01", title: "Use Case Identification", desc: "We identify and prioritise the highest-value use cases for AI agents — lead qualification, customer support, workflow orchestration, data processing." },
    { step: "02", title: "Agent Architecture & Design", desc: "We design the agent architecture — goal decomposition, tool integration, memory systems, safety guardrails, and human handoff protocols." },
    { step: "03", title: "Development & Training", desc: "We build and train AI agents using appropriate models and frameworks, with custom knowledge bases, API integrations, and conversation design." },
    { step: "04", title: "Deployment & Monitoring", desc: "We deploy agents into production, monitor performance metrics, implement continuous learning loops, and refine based on real-world usage." },
  ],
  "AI Assistants": [
    { step: "01", title: "Use Case & Scope Definition", desc: "We define the assistant's purpose, target users, conversation scope, knowledge sources, and success criteria." },
    { step: "02", title: "Conversation Design & Knowledge Base", desc: "We design conversation flows, persona, tone, and build a structured knowledge base that the assistant can query accurately." },
    { step: "03", title: "Development & Integration", desc: "We build the AI assistant, integrate with your knowledge sources and tools, and implement authentication, escalation, and analytics." },
    { step: "04", title: "Testing, Launch & Optimisation", desc: "We test across scenarios, launch with monitoring, analyse conversations for quality, and continuously improve responses based on user feedback." },
  ],
  "Customer Support Automation": [
    { step: "01", title: "Support Audit & Opportunity Analysis", desc: "We analyse your support volume, ticket types, response times, CSAT scores, and identify which queries can be automated." },
    { step: "02", title: "Automation Design & Knowledge Setup", desc: "We design automated workflows — chatbots, ticket routing, auto-responses, escalation rules — and build the knowledge base for AI-powered responses." },
    { step: "03", title: "Development & Integration", desc: "We build automation solutions integrated with your support platform (Zendesk, Intercom, Freshdesk), CRM, and knowledge base." },
    { step: "04", title: "Launch, Monitor & Refine", desc: "We launch with human-in-the-loop monitoring, track deflection rates, CSAT, and response times, and refine automation rules continuously." },
  ],
  "Lead Qualification Automation": [
    { step: "01", title: "Process & Criteria Definition", desc: "We map your current lead qualification process, define ideal customer profiles, scoring criteria, and qualification rules." },
    { step: "02", title: "Automation Design & CRM Integration", desc: "We design automated lead scoring, enrichment, and routing workflows integrated with your CRM and marketing platforms." },
    { step: "03", title: "Development & AI Training", desc: "We build qualification automation with AI-powered lead scoring, intent detection, and personalised follow-up triggers." },
    { step: "04", title: "Testing & Optimisation", desc: "We test qualification accuracy, refine scoring models based on conversion data, and continuously improve lead-to-opportunity conversion rates." },
  ],
  "Workflow Automation": [
    { step: "01", title: "Workflow Audit & Process Mapping", desc: "We map your current workflows, identify bottlenecks, manual steps, and automation opportunities across teams and systems." },
    { step: "02", title: "Automation Design & Tool Selection", desc: "We design automated workflows, select appropriate tools (Zapier, Make, n8n, custom), and define trigger-action logic and approval flows." },
    { step: "03", title: "Development & Integration", desc: "We build and connect automated workflows across your tools — CRM, email, project management, billing, analytics — with error handling and logging." },
    { step: "04", title: "Deployment & Monitoring", desc: "We deploy workflows, monitor execution, handle exceptions, and continuously improve automation based on usage patterns and feedback." },
  ],
  "Document Processing": [
    { step: "01", title: "Document Audit & Requirements", desc: "We audit the types, volume, and formats of documents you process, and define extraction requirements, accuracy thresholds, and output formats." },
    { step: "02", title: "Pipeline Design & Model Selection", desc: "We design a document processing pipeline — OCR, classification, extraction, validation — and select appropriate AI models and tools." },
    { step: "03", title: "Development & Training", desc: "We build the document processing system with AI-powered extraction, custom trained models, validation rules, and human review workflows." },
    { step: "04", title: "Deployment & Optimisation", desc: "We deploy the system, monitor extraction accuracy, handle edge cases, and continuously improve models with human feedback and new data." },
  ],
  "Internal Knowledge Assistants": [
    { step: "01", title: "Knowledge Audit & Requirements", desc: "We audit your internal knowledge sources — wikis, docs, Slack, Notion, CRM — and define what the assistant needs to know and do." },
    { step: "02", title: "Knowledge Architecture & Design", desc: "We design the knowledge base architecture, chunking strategy, retrieval approach, and assistant persona aligned to your team's needs." },
    { step: "03", title: "Development & Integration", desc: "We build the internal knowledge assistant with RAG architecture, integrate with your knowledge sources, and connect to Slack, Teams, or web interface." },
    { step: "04", title: "Deployment & Knowledge Maintenance", desc: "We deploy to your team, monitor usage and answer quality, and establish processes for keeping knowledge bases current and accurate." },
  ],
  "Sales Follow-Up Automation": [
    { step: "01", title: "Sales Process & Follow-Up Audit", desc: "We audit your current sales follow-up process — timing, channels, messaging, and conversion rates at each stage." },
    { step: "02", title: "Automation Strategy & Workflow Design", desc: "We design automated follow-up sequences — email, SMS, LinkedIn — with personalisation rules, timing optimisation, and A/B testing frameworks." },
    { step: "03", title: "Development & CRM Integration", desc: "We build follow-up automation integrated with your CRM, with lead scoring triggers, personalised messaging, and multi-channel sequences." },
    { step: "04", title: "Launch, Monitor & Optimise", desc: "We launch sequences, track reply rates, meeting bookings, and conversion metrics, and continuously optimise messaging and timing." },
  ],
  "Marketing Automation": [
    { step: "01", title: "Marketing Process & Tool Audit", desc: "We audit your current marketing workflows, tools, and campaigns to identify automation opportunities across email, social, ads, and analytics." },
    { step: "02", title: "Automation Strategy & Journey Design", desc: "We design automated marketing journeys — welcome sequences, nurture campaigns, lead scoring, behavioural triggers, and multi-channel orchestration." },
    { step: "03", title: "Implementation & Integration", desc: "We implement automation in your marketing platforms (HubSpot, Marketo, ActiveCampaign), integrate with CRM, and set up tracking and attribution." },
    { step: "04", title: "Testing, Launch & Optimisation", desc: "We test every journey, launch with monitoring, A/B test subject lines and content, and optimise based on engagement and conversion data." },
  ],
  "AI Integration": [
    { step: "01", title: "Requirements & Integration Points", desc: "We identify the systems, tools, and workflows where AI can be integrated, and define technical requirements and success criteria." },
    { step: "02", title: "Solution Architecture & API Design", desc: "We design the integration architecture — AI model selection, API endpoints, data flow, security, and scalability requirements." },
    { step: "03", title: "Development & Integration", desc: "We build and integrate AI capabilities into your existing systems via APIs, SDKs, or custom middleware with proper error handling and monitoring." },
    { step: "04", title: "Testing, Deployment & Optimisation", desc: "We test integration thoroughly, deploy to production, monitor performance, and optimise AI models based on real-world usage data." },
  ],
  "Voice and Messaging Automation": [
    { step: "01", title: "Use Case & Channel Definition", desc: "We define the use cases — voice calls, SMS, WhatsApp, Messenger — and scope the automation requirements for each channel." },
    { step: "02", title: "Conversation Design & Scripting", desc: "We design conversation flows, voice scripts, messaging templates, and NLP training data for natural, effective automated interactions." },
    { step: "03", title: "Development & Platform Integration", desc: "We build voice and messaging automation with speech recognition, text-to-speech, NLP, and integrate with your CRM and backend systems." },
    { step: "04", title: "Testing, Launch & Optimisation", desc: "We test across scenarios, launch with monitoring, analyse conversation quality and completion rates, and refine based on real interactions." },
  ],
  "AI & Automation": [
    { step: "01", title: "Opportunity Assessment", desc: "Identifying processes and workflows that can benefit from AI and automation." },
    { step: "02", title: "Solution Design", desc: "Architecting AI agents, automation workflows, and integration points." },
    { step: "03", title: "Development & Integration", desc: "Building and connecting automation systems with your existing tools." },
    { step: "04", title: "Monitor & Improve", desc: "Tracking performance, accuracy, and continuously improving outcomes." },
  ],
  "Internal Business Tools": [
    { step: "01", title: "Requirements & Workflow Analysis", desc: "We analyse your team's workflows, pain points, and efficiency gaps to define the tool's requirements and success criteria." },
    { step: "02", title: "Architecture & UX Design", desc: "We design system architecture, database schema, and intuitive user interfaces tailored to your team's needs and technical environment." },
    { step: "03", title: "Development & Testing", desc: "We build the tool with agile methodology, regular demos, automated testing, and user acceptance testing to ensure it meets requirements." },
    { step: "04", title: "Deployment, Training & Support", desc: "We deploy, train your team, document processes, and provide ongoing support and feature iterations based on real usage." },
  ],
  "Client Portals": [
    { step: "01", title: "User Research & Requirements", desc: "We research your clients' needs, pain points, and self-service expectations to define portal functionality and user experience." },
    { step: "02", title: "Design & Prototyping", desc: "We design the portal with intuitive navigation, personalised dashboards, secure authentication, and seamless onboarding flows." },
    { step: "03", title: "Development & Integration", desc: "We build the portal with secure access, CRM integration, document management, notification systems, and analytics tracking." },
    { step: "04", title: "Launch & Adoption", desc: "We launch with client onboarding, training materials, adoption tracking, and continuous improvement based on usage data." },
  ],
  "Booking Platforms": [
    { step: "01", title: "Booking Logic & Requirements", desc: "We define booking rules, availability management, resource allocation, payment flows, and notification requirements." },
    { step: "02", title: "UX Design & Calendar Architecture", desc: "We design intuitive booking interfaces, calendar views, timezone handling, and multi-step booking flows with clear confirmation." },
    { step: "03", title: "Development & Payment Integration", desc: "We build the booking platform with real-time availability, payment processing, automated reminders, cancellation management, and admin controls." },
    { step: "04", title: "Testing, Launch & Optimisation", desc: "We test booking flows end-to-end, launch with monitoring, and optimise conversion rates and user experience based on booking data." },
  ],
  "Directory Platforms": [
    { step: "01", title: "Content Model & Taxonomy Design", desc: "We define the directory's content structure, listing fields, categories, search attributes, and user roles (listers, seekers, admins)." },
    { step: "02", title: "Architecture & UX Design", desc: "We design robust search and filter systems, listing submission flows, user profiles, review systems, and responsive directory layouts." },
    { step: "03", title: "Development & Search Implementation", desc: "We build the directory platform with advanced search (full-text, faceted, geospatial), listing management, ratings, and messaging." },
    { step: "04", title: "Launch, Moderation & Growth", desc: "We launch with content moderation tools, analytics dashboards, and SEO optimisation for directory discoverability." },
  ],
  "Dashboards": [
    { step: "01", title: "KPI Definition & Data Audit", desc: "We define the key metrics, data sources, update frequency, and user personas that the dashboard needs to serve." },
    { step: "02", title: "Dashboard Design & Visualisation", desc: "We design intuitive dashboard layouts with appropriate chart types, filters, drill-downs, and real-time data visualisation." },
    { step: "03", title: "Development & Data Integration", desc: "We build the dashboard with live data connections, scheduled refreshes, interactive filters, and export capabilities." },
    { step: "04", title: "Deployment & Iteration", desc: "We deploy with user training, gather feedback, and iterate on visualisations and metrics based on how the team uses the dashboard." },
  ],
  "Reporting Systems": [
    { step: "01", title: "Reporting Requirements & Data Mapping", desc: "We define reporting needs, data sources, output formats, schedule requirements, and stakeholder information needs." },
    { step: "02", title: "System Architecture & Template Design", desc: "We design the reporting system architecture — data pipelines, template engine, distribution logic — and design report templates." },
    { step: "03", title: "Development & Automation", desc: "We build the reporting system with automated data aggregation, scheduled generation, multi-format output (PDF, CSV, email), and distribution." },
    { step: "04", title: "Testing, Launch & Maintenance", desc: "We test data accuracy, launch with stakeholder validation, and maintain template updates and data source changes." },
  ],
  "API Development": [
    { step: "01", title: "API Requirements & Specification", desc: "We define API endpoints, data models, authentication methods, rate limiting, versioning strategy, and performance requirements." },
    { step: "02", title: "Architecture & Design", desc: "We design RESTful or GraphQL API architecture with clear documentation, error handling, validation, and security best practices." },
    { step: "03", title: "Development & Documentation", desc: "We build the API with comprehensive test coverage, auto-generated documentation (OpenAPI/Swagger), and developer portal setup." },
    { step: "04", title: "Deployment & Monitoring", desc: "We deploy with API gateway, rate limiting, monitoring dashboards, and provide ongoing support and version management." },
  ],
  "Third-Party Integrations": [
    { step: "01", title: "Integration Requirements & Mapping", desc: "We map the systems to integrate, define data flow direction, sync frequency, error handling, and transformation requirements." },
    { step: "02", title: "Architecture & Authentication Setup", desc: "We design integration architecture with API authentication, webhook handling, data mapping, and conflict resolution strategies." },
    { step: "03", title: "Development & Error Handling", desc: "We build integrations with robust error handling, logging, retry logic, data validation, and monitoring alerts." },
    { step: "04", title: "Testing, Deployment & Monitoring", desc: "We test end-to-end data flow, deploy with monitoring dashboards, and provide ongoing support for API changes and data issues." },
  ],
  "Data Workflows": [
    { step: "01", title: "Data Audit & Workflow Mapping", desc: "We audit your data sources, transformations, and destinations, and map the end-to-end data workflow requirements." },
    { step: "02", title: "Pipeline Architecture & Design", desc: "We design data pipeline architecture with ETL/ELT processes, data quality checks, scheduling, and scalability requirements." },
    { step: "03", title: "Development & Automation", desc: "We build data workflows with automated extraction, transformation, validation, and loading processes with error handling and logging." },
    { step: "04", title: "Deployment & Monitoring", desc: "We deploy data pipelines with scheduling, monitoring dashboards, alerting, and documentation for ongoing maintenance." },
  ],
  "Admin Panels": [
    { step: "01", title: "Admin Requirements & User Roles", desc: "We define admin user roles, permissions, required management features, data views, and workflow approval processes." },
    { step: "02", title: "UX Design & Information Architecture", desc: "We design intuitive admin interfaces with clear navigation, data tables, forms, search, and role-based access controls." },
    { step: "03", title: "Development & Business Logic", desc: "We build the admin panel with CRUD operations, bulk actions, user management, audit logging, and approval workflows." },
    { step: "04", title: "Deployment & Training", desc: "We deploy, train admin users, document processes, and provide ongoing support for feature additions and user management." },
  ],
  "Multi-Tenant Platforms": [
    { step: "01", title: "Tenancy Model & Requirements", desc: "We define the multi-tenant architecture approach (shared vs isolated), tenant isolation strategy, billing model, and onboarding flow." },
    { step: "02", title: "Architecture & Infrastructure Design", desc: "We design scalable multi-tenant architecture with data isolation, tenant provisioning, custom domain support, and infrastructure-as-code." },
    { step: "03", title: "Development & Tenant Management", desc: "We build the platform with tenant onboarding flows, billing integration, usage tracking, and self-service admin portals per tenant." },
    { step: "04", title: "Launch & Scale", desc: "We launch with monitoring, scale testing, and provide ongoing optimisation for tenant growth and feature requests." },
  ],
  "Custom Calculators and Auditing Tools": [
    { step: "01", title: "Calculation Logic & Requirements", desc: "We define the calculation or auditing logic, input parameters, rules engine, output formats, and user interaction flows." },
    { step: "02", title: "UX Design & Logic Architecture", desc: "We design intuitive input interfaces, real-time calculation feedback, result visualisation, and the underlying rules engine architecture." },
    { step: "03", title: "Development & Validation", desc: "We build the tool with accurate calculation logic, input validation, error handling, scenario saving, and export capabilities." },
    { step: "04", title: "Testing, Launch & Iteration", desc: "We test calculations thoroughly, launch with user onboarding, and iterate on logic and UX based on user feedback." },
  ],
  "Custom Software & Business Systems": [
    { step: "01", title: "Requirements Analysis", desc: "Deep dive into your workflows, pain points, and desired outcomes." },
    { step: "02", title: "Architecture & Design", desc: "System architecture, database design, and technical specification." },
    { step: "03", title: "Build & Test", desc: "Agile development with regular demos, QA, and user acceptance testing." },
    { step: "04", title: "Deploy & Maintain", desc: "Production deployment, training, documentation, and ongoing support." },
  ],
  "Dashboard Development": [
    { step: "01", title: "KPI Definition & Data Source Audit", desc: "We define the key metrics, identify data sources, and audit data availability and quality for dashboard integration." },
    { step: "02", title: "Dashboard Design & Visualisation Planning", desc: "We design dashboard layouts with appropriate chart types, filters, drill-down paths, and user-specific views." },
    { step: "03", title: "Development & Data Integration", desc: "We build dashboards with live data connections, scheduled refreshes, interactive filters, and export capabilities." },
    { step: "04", title: "Launch, Training & Iteration", desc: "We deploy with user training, gather feedback, and iterate on visualisations based on how teams use the dashboard." },
  ],
  "Search Console Reporting": [
    { step: "01", title: "Search Console Setup & Audit", desc: "We audit your Google Search Console setup, verify property access, and ensure data is complete and accurate." },
    { step: "02", title: "Reporting Framework & KPI Definition", desc: "We define the key search performance metrics — impressions, clicks, CTR, average position — and build the reporting structure." },
    { step: "03", title: "Dashboard & Report Development", desc: "We build Search Console dashboards and automated reports that surface trends, opportunities, and issues in your search performance." },
    { step: "04", title: "Ongoing Monitoring & Alerts", desc: "We set up monitoring for ranking changes, traffic drops, technical issues, and deliver regular insights with actionable recommendations." },
  ],
  "Advertising Reporting": [
    { step: "01", title: "Platform & Data Audit", desc: "We audit your advertising accounts across platforms — Google Ads, Meta, LinkedIn, etc. — and assess data completeness and accuracy." },
    { step: "02", title: "Reporting Structure & KPI Definition", desc: "We define campaign performance metrics, attribution windows, cost calculations, and reporting cadence aligned to business goals." },
    { step: "03", title: "Dashboard & Report Development", desc: "We build unified advertising dashboards and scheduled reports that consolidate data across platforms for a single source of truth." },
    { step: "04", title: "Insights & Optimisation Recommendations", desc: "We analyse performance trends, identify optimisation opportunities, and deliver actionable insights alongside the data." },
  ],
  "Lead Attribution": [
    { step: "01", title: "Attribution Requirements & Data Mapping", desc: "We map your customer journey, identify touchpoints, and define attribution requirements — channels, campaigns, interactions, and conversion paths." },
    { step: "02", title: "Model Selection & Architecture Design", desc: "We select the attribution model (first-touch, last-touch, linear, time-decay, data-driven) and design the tracking and data architecture." },
    { step: "03", title: "Implementation & Data Integration", desc: "We implement tracking across all touchpoints, integrate CRM and marketing platform data, and build the attribution engine." },
    { step: "04", title: "Reporting & Optimisation", desc: "We build attribution dashboards, analyse channel performance and ROI, and use attribution insights to optimise media mix and budget allocation." },
  ],
  "Data Warehousing": [
    { step: "01", title: "Data Audit & Warehouse Requirements", desc: "We audit your current data sources, volume, structure, and define warehouse requirements — schema, access patterns, query performance, and scalability." },
    { step: "02", title: "Architecture & Schema Design", desc: "We design the data warehouse architecture, schema design (star, snowflake, or vault), ETL/ELT pipelines, and data governance framework." },
    { step: "03", title: "Implementation & Data Migration", desc: "We build the warehouse, implement data pipelines, migrate historical data, and establish ongoing data ingestion processes." },
    { step: "04", title: "Access Setup & Optimisation", desc: "We set up role-based access, connect BI tools, implement query optimisation, and provide documentation and training for your team." },
  ],
  "Marketing Performance Dashboards": [
    { step: "01", title: "Marketing Metrics & Data Source Mapping", desc: "We define the key marketing KPIs — traffic, leads, cost per lead, ROAS, pipeline, revenue — and map all data sources." },
    { step: "02", title: "Dashboard Design & Visualisation", desc: "We design marketing-specific dashboards with funnel views, campaign comparisons, trend analysis, and drill-down to channel-level detail." },
    { step: "03", title: "Development & Multi-Source Integration", desc: "We build dashboards that pull from analytics, ads, CRM, email, and social platforms into a unified marketing performance view." },
    { step: "04", title: "Launch, Training & Optimisation", desc: "We deploy with team training, establish reporting cadence, and iterate on metrics and visualisations based on stakeholder feedback." },
  ],
  "Custom KPI Reporting": [
    { step: "01", title: "KPI Definition & Business Goal Alignment", desc: "We define the specific KPIs that matter to your business, aligned to strategic goals, and identify data sources for each metric." },
    { step: "02", title: "Report Design & Calculation Logic", desc: "We design report templates with custom calculations, data transformations, formatting, and distribution rules." },
    { step: "03", title: "Development & Automation", desc: "We build automated reports with live data, scheduled delivery, multi-format output (PDF, Excel, email), and alerting for KPI thresholds." },
    { step: "04", title: "Review & Iteration", desc: "We review reports with stakeholders, refine metrics and calculations, and maintain the reporting system as business needs evolve." },
  ],
  "Data Quality Audits": [
    { step: "01", title: "Data Source Inventory & Assessment", desc: "We inventory all your data sources, assess data quality dimensions — accuracy, completeness, consistency, timeliness, validity." },
    { step: "02", title: "Quality Analysis & Gap Identification", desc: "We analyse data quality across sources, identify gaps, duplicates, inconsistencies, and issues affecting reporting and decision-making." },
    { step: "03", title: "Remediation Plan & Implementation", desc: "We develop a prioritised remediation plan, implement fixes, data cleaning, validation rules, and automated quality checks." },
    { step: "04", title: "Ongoing Monitoring & Governance", desc: "We set up data quality monitoring dashboards, establish governance processes, and provide recommendations for maintaining data quality." },
  ],
  "Data & Analytics": [
    { step: "01", title: "Audit & Discovery", desc: "Reviewing current analytics setup, data quality, and reporting gaps." },
    { step: "02", title: "Implementation & Integration", desc: "Setting up tracking, data pipelines, and dashboard architecture." },
    { step: "03", title: "Visualisation & Reporting", desc: "Building clear, actionable dashboards and automated reporting." },
    { step: "04", title: "Optimise & Scale", desc: "Continuous refinement of tracking, reporting, and data-driven decisions." },
  ],
};

function generateDescription(name: string, pillar: string): string {
  const descs: Record<string, string> = {
    "SEO Strategy": "A comprehensive SEO strategy aligns your search efforts with business goals. We analyse your market, competitors, and current performance to build a prioritised roadmap that drives organic growth.",
    "Technical SEO": "Technical SEO ensures search engines can crawl, index, and render your website effectively. We audit your site architecture, Core Web Vitals, schema markup, and server configuration.",
    "On-Page SEO": "On-page SEO optimises individual pages to rank higher and earn more relevant traffic. We refine meta data, headings, content structure, and internal linking for maximum search visibility.",
    "Off-Page SEO": "Off-page SEO builds your site's authority and trust signals through strategic link building and brand mentions. We develop high-quality backlink profiles, manage digital PR outreach, and strengthen your domain's reputation across the web.",
    "SEO Auditing": "An SEO audit is a comprehensive examination of your website's technical health, content quality, and backlink profile. We identify issues blocking your search performance and deliver a prioritised roadmap of fixes and opportunities.",
    "SEO Consulting": "SEO consulting provides expert guidance to help your team make smarter search decisions. We evaluate your current efforts, identify highest-impact opportunities, and work alongside your in-house team to execute effectively.",
    "Keyword Research": "Keyword research uncovers the terms your audience uses to find solutions. We identify high-opportunity keywords, search intent patterns, and content gaps your competitors miss.",
    "Content Strategy": "Content strategy plans what to create, why it matters, and how it drives business results. We develop topic clusters, content calendars, and editorial frameworks aligned with search intent.",
    "Content Development": "Content development turns strategy into published assets that rank and convert. We research, write, and produce SEO-optimised articles, guides, multimedia, and supporting collateral tailored to your audience and keywords.",
    "Local SEO": "Local SEO helps your business appear in local search results and Google Maps. We optimise your Google Business Profile, local citations, and review strategy to attract nearby customers.",
    "E-commerce SEO": "E-commerce SEO drives product page rankings, category visibility, and organic revenue. We optimise product feeds, reviews, site structure, and technical foundations for online stores.",
    "Enterprise SEO": "Enterprise SEO tackles the complexity of large-scale websites with multiple stakeholders. We build governance frameworks, cross-functional workflows, and scalable optimisation systems.",
    "International SEO": "International SEO expands your organic reach across countries and languages. We manage hreflang implementation, multi-language keyword research, geo-targeting, and global site architecture to capture demand in every market.",
    "Website Migration SEO": "Website migration SEO protects your search rankings when moving domains, platforms, or site structures. We plan, test, and monitor every step to prevent traffic loss and ensure a seamless transition.",
    "Digital PR for Search": "Digital PR for search earns high-authority backlinks through data-driven stories and media campaigns. We craft newsworthy angles, build journalist relationships, and secure coverage that boosts organic rankings.",
    "Search Reporting": "Search reporting transforms raw data into clear insights and actionable recommendations. We build custom dashboards, track KPIs, and deliver regular reports that connect search performance to business outcomes.",
    "Generative Engine Optimisation": "Generative Engine Optimisation ensures your brand appears in AI-powered search results across ChatGPT, Perplexity, and Google AI Overviews. We optimise your entity signals, content architecture, and brand citations for AI discovery.",
    "Answer Engine Optimisation": "Answer Engine Optimisation positions your brand as the source AI platforms cite when answering user questions. We structure your content and authority signals to be extracted and referenced by answer engines across every major AI platform.",
    "AI Search Visibility Audits": "AI Search Visibility Audits measure how your brand appears across generative engines and AI overviews. We audit presence, entity accuracy, citation quality, and content readiness across ChatGPT, Perplexity, Google AI Overviews, and more.",
    "Entity Optimisation": "Entity Optimisation helps AI platforms understand exactly who you are and what you do. We build and strengthen your entity signals — schema, knowledge graphs, and structured references — so AI models confidently associate your brand with relevant topics.",
    "Brand Citation Readiness": "Brand Citation Readiness ensures every online mention of your brand is accurate, consistent, and discoverable by AI platforms. We audit, fix, and build citations across directories, publications, and structured data sources.",
    "Structured Content Planning": "Structured Content Planning designs your content so AI platforms can easily extract, understand, and cite it. We build topic architectures, entity-aligned structures, and citation-ready formats that maximise AI visibility.",
    "Digital PR": "Digital PR builds your brand authority through earned media coverage and quality backlinks. We craft data-driven stories and campaigns that journalists want to cover and readers want to share.",
    "Press Release Strategy": "Press Release Strategy ensures your announcements get the coverage they deserve. We craft newsworthy releases with compelling angles, target the right journalists, and time distribution for maximum pickup and media impact.",
    "Media Outreach": "Media Outreach connects your story with the journalists who matter most. We build targeted media lists, craft personalised pitches, and develop lasting relationships with the reporters covering your industry.",
    "Journalist Research": "Journalist Research builds the intelligence layer behind every successful PR campaign. We identify the right reporters, understand their beats and preferences, and uncover the angles that get your story covered.",
    "Founder Positioning": "Founder Positioning turns your leadership into a brand asset. We build your founder's public profile through strategic narratives, platform optimisation, and placement in the conversations that define your industry.",
    "Thought Leadership": "Thought Leadership establishes your brand as an authority your industry looks to. We develop strategic content, secure high-profile placements, and build influence that drives trust and business growth.",
    "Brand Mentions": "Brand Mentions systematically builds your brand's presence across the conversations that matter. We develop a scalable approach for earning quality mentions that boost authority, trust, and AI citation readiness.",
    "Link-Earning Campaigns": "Link-Earning Campaigns build high-quality backlinks through content that publishers want to reference. We create data-driven assets, original research, and compelling stories that naturally attract editorial links.",
    "Reputation Management": "Reputation Management protects and enhances how your brand appears online. We monitor mentions, manage reviews, address negative content, and build a positive digital presence that earns trust.",
    "Crisis Communication Support": "Crisis Communication Support prepares you for the moments that matter most. We develop crisis readiness frameworks, provide real-time response guidance, and protect your brand reputation when every minute counts.",
    "Awards and Profile Support": "Awards and Profile Support gets your brand the recognition it deserves. We identify relevant awards, craft compelling submissions, and build the credentials that signal industry leadership.",
    "PR Measurement": "PR Measurement connects your PR efforts to real business outcomes. We build measurement frameworks, track coverage impact, and deliver insights that prove PR's value and guide future strategy.",
    "Google Ads": "Google Ads campaigns put your business in front of high-intent searchers. We manage keyword strategy, ad copy, bid optimisation, and landing page alignment to maximise ROAS.",
    "PPC Management": "PPC Management takes the daily work of paid search off your plate. We manage bids, test ad copy, refine audiences, and optimise campaigns across Google, Bing, and other platforms to hit your target CPA and ROAS goals.",
    "Search Advertising": "Search Advertising puts your business at the top of search results when potential customers are actively looking for what you offer. We build and optimise search campaigns that capture high-intent traffic at the right cost.",
    "Display Advertising": "Display Advertising builds brand awareness and drives conversions through visual ads across the Google Display Network and programmatic platforms. We target the right audiences with compelling creatives at every funnel stage.",
    "Remarketing": "Remarketing re-engages visitors who didn't convert the first time. We serve targeted ads to people who have already shown interest — reminding them of your brand and bringing them back to complete a purchase or inquiry.",
    "Paid Social": "Paid Social drives engagement, leads, and sales through targeted advertising on Meta, LinkedIn, TikTok, and X. We create platform-native creative and precision-targeted campaigns that connect with your ideal audience.",
    "Media Planning": "Media Planning ensures every advertising dollar is allocated to the right channels, audiences, and formats. We develop data-driven media plans that maximise reach, frequency, and return on ad spend.",
    "Landing Page Optimisation": "Landing Page Optimisation turns clicks into customers. We audit, redesign, and test landing pages to improve conversion rates — optimising layout, copy, forms, and user experience for maximum performance.",
    "Conversion Tracking": "Conversion Tracking ensures you know exactly which campaigns, keywords, and ads drive real business results. We set up accurate tracking across platforms and connect ad data to your CRM for complete attribution.",
    "Campaign Auditing": "Campaign Auditing uncovers every optimisation opportunity hiding in your ad accounts. We perform deep-dive audits of structure, targeting, creative, bidding, and tracking to identify what's working and what's wasting spend.",
    "Budget Planning": "Budget Planning takes the guesswork out of media investment. We build data-driven budget models that align with your growth targets, forecast outcomes, and adapt in real-time based on campaign performance.",
    "Creative Testing": "Creative Testing removes the guesswork from ad creative decisions. We run structured experiments on headlines, images, formats, and offers — then double down on what works and cut what doesn't.",
    "Social Media Strategy": "Social Media Strategy defines the roadmap for your entire social presence. We analyse your audience, competition, and platform performance to create a data-driven strategy that aligns with your business objectives.",
    "Social Media Management": "Social Media Management handles the day-to-day running of your social channels — content creation, publishing, community engagement, and performance tracking — so you can focus on running your business.",
    "Social Campaigns": "Social Campaigns create targeted, measurable marketing initiatives across social platforms. We plan, execute, and optimise campaigns that drive engagement, leads, and conversions.",
    "Content Production": "Content Production delivers high-quality, on-brand content at scale. From blog posts and whitepapers to videos and infographics, we produce content that educates, engages, and converts your audience.",
    "Social Content": "Social Content is designed specifically for social platforms — short-form video, carousels, stories, and static posts that stop the scroll and spark engagement. We create content that fits each platform's unique format and audience.",
    "Video and Motion": "Video and Motion brings your brand to life through compelling visual storytelling. We produce everything from short-form social videos and animations to full-length brand films and product demos.",
    "Email Marketing": "Email Marketing builds direct, personalised connections with your audience through campaigns that nurture leads, retain customers, and drive revenue. We design, build, and optimise email programmes that deliver results.",
    "Brand Messaging": "Brand Messaging defines how your brand speaks to the world. We develop a cohesive messaging framework — core message, value propositions, tone of voice — that ensures consistency across every touchpoint.",
    "Campaign Creative": "Campaign Creative brings your marketing campaigns to life with compelling visuals, copy, and concepts. We develop creative that captures attention, communicates your message, and drives action.",
    "Copywriting": "Copywriting turns your brand's message into words that connect, persuade, and convert. We write everything from website copy and blog posts to ad copy, emails, and sales pages with precision and personality.",
    "Content Systems": "Content Systems streamline how you plan, create, approve, publish, and measure content. We build structured workflows, tool stacks, and governance frameworks that make content operations efficient and scalable.",
    "Next.js Website Development": "Next.js Website Development builds high-performance, SEO-optimised websites using the latest Next.js framework. We deliver fast, scalable sites with excellent developer experience and modern architecture.",
    "Corporate Websites": "Corporate Websites present your company's brand, values, and offerings in a professional, trustworthy digital presence. We build sites that communicate credibility and serve diverse stakeholder needs.",
    "Marketing Websites": "Marketing Websites are designed to attract, engage, and convert visitors into leads and customers. We build high-impact sites with compelling content, clear CTAs, and a focus on measurable results.",
    "Landing Pages": "Landing Pages are single-purpose pages designed to convert specific traffic into leads or sales. We craft focused, high-converting pages aligned to campaign goals and audience intent.",
    "E-commerce Development": "E-commerce Development builds online stores that make buying easy and enjoyable. We create seamless shopping experiences with intuitive product discovery, smooth checkout, and robust backend management.",
    "WordPress Development": "WordPress Development builds flexible, scalable websites on the world's most popular CMS. We create custom WordPress solutions that combine ease of use with professional design and performance.",
    "Headless CMS Development": "Headless CMS Development decouples content management from frontend presentation for greater flexibility and performance. We build content architectures that deliver consistent omnichannel experiences.",
    "UI and UX Design": "UI and UX Design creates digital experiences that are intuitive, accessible, and delightful. We research user needs, design seamless interfaces, and test interactions to ensure your product is easy and enjoyable to use.",
    "Web Applications": "Web Applications are powerful, browser-based tools that solve complex business problems. We build feature-rich applications with clean architecture, robust APIs, and intuitive interfaces.",
    "Customer Portals": "Customer Portals give your clients a dedicated space to access information, manage accounts, submit requests, and communicate with your team. We build portals that improve satisfaction and reduce support load.",
    "Mobile Applications": "Mobile Applications extend your digital presence to iOS and Android devices. We build native and cross-platform apps that deliver great user experiences and drive real business outcomes.",
    "Performance Optimisation": "Performance Optimisation makes your website faster, smoother, and more efficient. We audit, analyse, and optimise every layer — code, assets, server, delivery — to improve Core Web Vitals and user experience.",
    "Accessibility Improvement": "Accessibility Improvement ensures your digital products are usable by everyone, including people with disabilities. We audit, remediate, and educate to achieve WCAG compliance and inclusive design.",
    "AI Strategy": "AI Strategy defines how artificial intelligence can create value for your business. We assess opportunities, build roadmaps, and establish governance so you can adopt AI with confidence and purpose.",
    "AI Readiness Audits": "AI Readiness Audits evaluate your organisation's preparedness for AI adoption across data, technology, processes, and people. We identify gaps, score readiness, and provide a clear path forward.",
    "AI Agents": "AI Agents are autonomous systems that perceive, reason, and act to accomplish complex tasks. We design and build agents that handle lead qualification, customer support, data analysis, and workflow orchestration.",
    "AI Assistants": "AI Assistants provide conversational support for your customers, employees, or users. We build intelligent assistants that answer questions, complete tasks, and integrate with your knowledge and tools.",
    "Customer Support Automation": "Customer Support Automation uses AI and workflows to handle support queries faster and more consistently. We automate responses, routing, and resolution while maintaining human touch where it matters.",
    "Lead Qualification Automation": "Lead Qualification Automation scores, enriches, and routes leads automatically based on fit and intent. We build systems that ensure your sales team focuses on the highest-potential prospects.",
    "Workflow Automation": "Workflow Automation connects your tools and automates repetitive tasks so your team can focus on higher-value work. We design and build automated processes across your entire tech stack.",
    "Document Processing": "Document Processing uses AI to extract, classify, and validate data from documents at scale. We build systems that handle invoices, contracts, forms, and reports with high accuracy.",
    "Internal Knowledge Assistants": "Internal Knowledge Assistants give your team instant access to company knowledge. We build AI-powered assistants that answer questions from your wikis, docs, and knowledge bases inside Slack, Teams, or your intranet.",
    "Sales Follow-Up Automation": "Sales Follow-Up Automation ensures no lead falls through the cracks. We build multi-channel follow-up sequences that engage prospects with personalised messaging at the right time.",
    "Marketing Automation": "Marketing Automation streamlines and personalises your marketing across email, social, and ads. We build automated journeys that nurture leads, engage customers, and drive measurable results.",
    "AI Integration": "AI Integration embeds AI capabilities into your existing software and workflows via APIs and SDKs. We connect AI models — text, vision, speech — to your applications, tools, and data pipelines.",
    "Voice and Messaging Automation": "Voice and Messaging Automation handles phone calls, SMS, WhatsApp, and chat conversations automatically. We build systems that book appointments, answer questions, send reminders, and qualify leads across channels.",
    "Internal Business Tools": "Internal Business Tools streamline your team's operations with purpose-built software. We build tools that automate workflows, centralise data, and eliminate the manual processes that slow your business down.",
    "Client Portals": "Client Portals give your customers a dedicated space to access information, manage accounts, submit requests, and communicate with your team. We build portals that improve satisfaction and reduce support overhead.",
    "Booking Platforms": "Booking Platforms let customers schedule appointments, reserve services, and manage bookings online. We build intuitive booking systems with real-time availability, payments, and automated reminders.",
    "Directory Platforms": "Directory Platforms connect seekers with listings through powerful search and discovery. We build directories with advanced filtering, user profiles, reviews, and listing management.",
    "Dashboards": "Dashboards turn complex data into clear, actionable insights at a glance. We build custom dashboards with real-time metrics, interactive visualisations, and role-specific views for your team.",
    "Reporting Systems": "Reporting Systems automate the creation and distribution of business reports. We build systems that pull data from multiple sources, generate formatted reports, and deliver them on schedule.",
    "API Development": "API Development creates the interfaces that let your software communicate with other systems. We build secure, well-documented APIs that make your data and functionality accessible to developers.",
    "Third-Party Integrations": "Third-Party Integrations connect your tools and systems so data flows seamlessly between them. We build and maintain integrations with CRMs, ERPs, marketing platforms, payment gateways, and more.",
    "Data Workflows": "Data Workflows automate the movement and transformation of data between systems. We build pipelines that extract, clean, transform, and load your data so it's always where you need it.",
    "Admin Panels": "Admin Panels give your team control over your platform's users, content, and settings. We build intuitive admin interfaces with role-based access, audit logs, and bulk management capabilities.",
    "Multi-Tenant Platforms": "Multi-Tenant Platforms serve multiple customers (tenants) from a single codebase with isolated data. We build SaaS platforms with tenant onboarding, customisation, billing, and scalable infrastructure.",
    "Custom Calculators and Auditing Tools": "Custom Calculators and Auditing Tools automate complex calculations and compliance checks. We build interactive tools that process inputs, apply rules, and deliver accurate results in real-time.",
    "Dashboard Development": "Dashboard Development transforms raw data into clear, interactive visualisations that drive decisions. We build custom dashboards with real-time metrics, role-specific views, and actionable insights.",
    "Search Console Reporting": "Search Console Reporting turns your Google Search Console data into actionable insights. We build reports and dashboards that surface search performance trends, opportunities, and issues.",
    "Advertising Reporting": "Advertising Reporting consolidates campaign data across platforms into unified, accurate reports. We build dashboards that show true campaign performance and ROI across all channels.",
    "Lead Attribution": "Lead Attribution identifies which channels and touchpoints drive conversions and revenue. We build attribution models that reveal the real impact of every marketing investment.",
    "Data Warehousing": "Data Warehousing centralises your data from multiple sources into a single, queryable repository. We build warehouses that make your data accessible, reliable, and ready for analysis.",
    "Marketing Performance Dashboards": "Marketing Performance Dashboards give you a single-pane view of all marketing metrics — traffic, leads, costs, ROI — across every channel and campaign.",
    "Custom KPI Reporting": "Custom KPI Reporting delivers automated reports built around the metrics that matter most to your business. We build scheduled reports with custom calculations and shareable formats.",
    "Data Quality Audits": "Data Quality Audits assess the accuracy, completeness, and consistency of your data across systems. We identify issues, fix problems, and establish processes for ongoing data quality.",
    "Custom CRM Development": "Custom CRM development builds a customer management system tailored to your exact business processes. We create features, automations, and integrations that off-the-shelf solutions cannot match.",
    "SaaS Development": "SaaS development transforms your product idea into a scalable multi-tenant platform. We handle architecture, subscription billing, user management, and infrastructure.",
    "Analytics Setup": "Analytics setup ensures you collect accurate, actionable data from day one. We configure platforms, events, goals, and e-commerce tracking so you can make informed decisions.",
    "GA4 Support": "GA4 support helps you migrate, configure, and maximise Google Analytics 4. We set up events, explorations, custom dimensions, and reporting that actually drives decisions.",
  };
  return descs[name] || `${name} is a ${pillar.toLowerCase()} service that helps businesses improve performance through proven strategies and expert execution. We tailor every approach to your specific goals, market, and competitive landscape.`;
}

function generateDeliverables(name: string): string[] {
  const dels: Record<string, string[]> = {
    "SEO Strategy": ["Comprehensive SEO strategy document", "Keyword opportunity analysis", "Competitive gap assessment", "Implementation roadmap", "KPI framework and targets"],
    "Technical SEO": ["Full technical SEO audit report", "Crawl analysis and error identification", "Core Web Vitals assessment", "Schema markup recommendations", "Site structure optimisation plan"],
    "On-Page SEO": ["On-page content audit", "Meta data optimisation", "Heading and content structure recommendations", "Internal linking optimisation", "Content gap analysis"],
    "Off-Page SEO": ["Backlink profile audit", "Competitor backlink gap analysis", "Link building target list", "Outreach asset development", "Domain authority tracking"],
    "SEO Auditing": ["Full technical SEO audit", "Content quality assessment", "Backlink profile analysis", "Competitive benchmarking report", "Prioritised issue tracker"],
    "SEO Consulting": ["SEO health scorecard", "Strategic recommendations document", "Quarterly roadmap", "Team training sessions", "Executive summary reporting"],
    "Keyword Research": ["Keyword opportunity database", "Search intent analysis", "Competitive keyword gaps", "Topic cluster mapping", "Priority keyword tracking"],
    "Content Strategy": ["Content strategy document", "Topic cluster architecture", "Content calendar", "Editorial guidelines", "Performance measurement framework"],
    "Content Development": ["SEO-optimised articles and guides", "Content briefs and outlines", "Multimedia content production", "Content refresh and repurposing", "Quality assurance and fact-checking"],
    "Local SEO": ["Google Business Profile optimisation", "Local citation audit and building", "Local keyword strategy", "Review management system", "Local pack tracking"],
    "E-commerce SEO": ["Product page optimisation", "Category structure recommendations", "E-commerce technical audit", "Review and rating schema", "Shopping feed optimisation"],
    "Enterprise SEO": ["Enterprise SEO strategy", "Multi-site governance framework", "Enterprise tool selection", "Cross-functional integration plan", "Enterprise KPI reporting"],
    "International SEO": ["Hreflang implementation audit", "Multi-language keyword research", "International site structure plan", "Geo-targeting configuration", "Global performance dashboard"],
    "Website Migration SEO": ["Pre-migration audit and checklist", "Redirect mapping and testing", "Crawl and indexation monitoring", "Post-migration performance report", "Traffic and ranking validation"],
    "Digital PR for Search": ["Link-earning campaign strategy", "Journalist and media target list", "Data-driven story angles", "Press release and pitch creation", "Coverage and backlink tracking"],
    "Search Reporting": ["Custom KPI dashboard setup", "Weekly performance reports", "Search visibility tracking", "Conversion and revenue attribution", "Monthly insight presentations"],
    "Generative Engine Optimisation": ["GEO readiness assessment", "AI-friendly content architecture", "Entity and knowledge graph strategy", "Brand presence in AI platforms", "Continuous AI search monitoring"],
    "Answer Engine Optimisation": ["Answer engine presence audit", "Content structuring for answer extraction", "Authority signal enhancement plan", "Answer citation tracking dashboard", "Quarterly competitive answer analysis"],
    "AI Search Visibility Audits": ["Cross-platform AI visibility audit report", "Entity and knowledge graph analysis", "Content and citation readiness scorecard", "Competitive AI presence benchmarking", "Prioritised optimisation roadmap"],
    "Entity Optimisation": ["Entity discovery and relationship map", "Structured data deployment plan", "Knowledge graph integration guide", "Entity consistency monitoring system", "Quarterly entity health report"],
    "Brand Citation Readiness": ["Full citation audit across all platforms", "NAP consistency and coverage score", "Citation cleanup and standardisation report", "New citation opportunity list", "Ongoing citation monitoring alerts"],
    "Structured Content Planning": ["Content architecture audit and gap analysis", "AI-optimised content blueprint", "Content template and governance framework", "Structured data and entity alignment plan", "AI citation performance tracking"],
    "Digital PR": ["Comprehensive PR strategy", "Media list development", "Press release creation", "Media outreach and pitching", "Coverage and impact reports"],
    "Press Release Strategy": ["Newsworthiness assessment report", "Press release writing and editing", "Media distribution list and strategy", "Timing and embargo recommendations", "Coverage monitoring and results report"],
    "Media Outreach": ["Targeted journalist database", "Personalised pitch templates", "Multi-touch outreach sequences", "Response and coverage tracking log", "Journalist relationship management"],
    "Journalist Research": ["Industry journalist database", "Journalist coverage profile reports", "Beat and topic analysis documents", "Pitch angle recommendations", "Ongoing journalist monitoring updates"],
    "Founder Positioning": ["Founder narrative and messaging guide", "LinkedIn and social profile optimisation", "Byline article ghostwriting", "Speaking and podcast opportunity list", "Founder mention tracking dashboard"],
    "Thought Leadership": ["Thought leadership content plan", "Byline article placement and calendar", "Speaking and panel opportunity tracking", "Social amplification strategy", "Authority metrics and share of voice"],
    "Brand Mentions": ["Brand mention audit report", "Mention development strategy", "Brand mention tracking system", "Quarterly mention analysis", "Competitive mention benchmarking"],
    "Link-Earning Campaigns": ["Link opportunity research report", "Link-worthy asset development", "Outreach and promotion plan", "Earned link tracking dashboard", "Domain authority growth reporting"],
    "Reputation Management": ["Reputation audit and analysis", "Reputation management strategy", "Review response framework", "Negative content remediation plan", "Ongoing reputation monitoring"],
    "Crisis Communication Support": ["Crisis readiness assessment", "Crisis response playbook", "Message and holding statement templates", "Real-time monitoring setup", "Post-crisis analysis and recommendations"],
    "Awards and Profile Support": ["Award opportunity calendar", "Award submission writing", "Supporting case study development", "Profile and credential building", "Award win amplification plan"],
    "PR Measurement": ["PR measurement framework", "Coverage tracking dashboard", "Share of voice and sentiment analysis", "Business impact reporting", "Quarterly PR performance review"],
    "Google Ads": ["Campaign strategy and structure", "Keyword and audience research", "Ad copy and extension development", "Bid management and optimisation", "Performance tracking and reporting"],
    "PPC Management": ["Full account audit and health check", "Ongoing campaign management", "Bid and budget optimisation", "Ad copy testing and refresh", "Performance reporting and insights"],
    "Search Advertising": ["Search campaign architecture", "Keyword and match type strategy", "Ad copy and extension development", "Bid and budget management", "Search performance dashboards"],
    "Display Advertising": ["Display campaign strategy", "Audience and placement targeting", "Creative asset development", "Programmatic campaign management", "Brand lift and reach reporting"],
    "Remarketing": ["Audience segmentation strategy", "Remarketing campaign setup", "Cross-channel remarketing execution", "Frequency and exclusion management", "Lift and conversion reporting"],
    "Paid Social": ["Platform-specific campaign strategy", "Creative content development", "Audience targeting and testing", "Community engagement management", "Social ROAS and attribution reporting"],
    "Media Planning": ["Market and audience research report", "Comprehensive media plan document", "Channel mix and budget allocation", "Measurement and KPI framework", "Quarterly plan optimisation reviews"],
    "Landing Page Optimisation": ["Landing page audit and analysis", "Conversion hypothesis framework", "Page redesign and implementation", "A/B test plan and execution", "Conversion rate improvement report"],
    "Conversion Tracking": ["Tracking audit and gap analysis", "Event and goal implementation", "Offline conversion integration", "Cross-platform attribution setup", "Data quality monitoring dashboard"],
    "Campaign Auditing": ["Full account audit document", "Performance benchmarking report", "Issue prioritisation matrix", "Optimisation roadmap", "Quick-win implementation guide"],
    "Budget Planning": ["Budget planning framework", "Channel-level budget allocation", "Forecast and scenario models", "Spend tracking dashboard", "Monthly reallocation recommendations"],
    "Creative Testing": ["Testing framework and hypothesis document", "Creative variant development", "A/B test execution and monitoring", "Statistical analysis and results", "Testing insights and recommendations"],
    "Social Media Strategy": ["Social media audit and competitive analysis report", "Platform strategy and prioritisation document", "Content pillar framework and editorial calendar", "Audience persona and segmentation guide", "Measurement framework and KPI dashboard"],
    "Social Media Management": ["Profile setup and brand consistency audit", "Content calendar and publishing schedule", "Community management guidelines", "Monthly performance reports", "Audience growth and engagement analysis"],
    "Social Campaigns": ["Campaign strategy and objectives document", "Creative assets across all formats", "Campaign deployment and amplification plan", "Real-time performance tracking dashboard", "Post-campaign analysis and recommendations"],
    "Content Production": ["Content briefs and editorial calendar", "High-quality produced content assets", "SEO-optimised writing and formatting", "Stakeholder review and approval workflow", "Content performance analysis report"],
    "Social Content": ["Platform-specific content strategy", "Social content assets (static, video, carousel)", "Posting schedule and publishing", "Engagement and performance tracking", "Content optimisation recommendations"],
    "Video and Motion": ["Creative brief and treatment document", "Scripts, storyboards, and production plan", "Finished video and motion assets", "Platform-optimised exports and versions", "Performance tracking and insights report"],
    "Email Marketing": ["Email list audit and segmentation strategy", "Campaign design and copywriting", "Automated workflow and trigger setup", "Personalisation and dynamic content", "Performance reporting and optimisation"],
    "Brand Messaging": ["Brand discovery and positioning report", "Messaging framework document", "Brand voice and tone guidelines", "Key messages by audience and channel", "Messaging testing and validation results"],
    "Campaign Creative": ["Creative strategy and brief document", "Multiple concept directions and mood boards", "Final creative assets across formats", "Platform-specified asset variations", "Creative performance analysis and learnings"],
    "Copywriting": ["Content brief and research document", "SEO keyword analysis and outline", "Final copy with editing and proofreading", "Revision rounds and stakeholder review", "Performance optimisation recommendations"],
    "Content Systems": ["Content operations audit report", "System architecture and tool stack document", "Workflow design and governance framework", "Implementation and configuration", "Team training and process documentation"],
    "Next.js Website Development": ["Technical specification and architecture document", "UI/UX design and interactive prototype", "Next.js application with SSR/SSG/ISR", "CMS integration and content models", "Performance and Core Web Vitals report"],
    "Corporate Websites": ["Site architecture and sitemap", "Brand-aligned visual design", "Custom theme or template development", "CMS setup with content models", "Launch and governance documentation"],
    "Marketing Websites": ["Marketing strategy and conversion architecture", "High-fidelity page designs", "Built and optimised marketing site", "Analytics and tracking implementation", "Conversion optimisation roadmap"],
    "Landing Pages": ["Landing page strategy and brief", "Conversion-focused copy and design", "Built and optimised landing page", "Conversion tracking setup", "A/B test results and optimisation plan"],
    "E-commerce Development": ["Product strategy and platform recommendation", "Store design with mobile-optimised checkout", "Full e-commerce implementation", "Payment, shipping, and tax configuration", "Conversion funnel optimisation plan"],
    "WordPress Development": ["WordPress architecture document", "Custom theme or builder-based site", "Plugin configuration and customisation", "SEO and performance optimisation", "Admin training and support documentation"],
    "Headless CMS Development": ["Content model architecture document", "Headless CMS configuration and setup", "Frontend application with API integration", "Preview mode and webhook rebuild setup", "Content migration and editor training"],
    "UI and UX Design": ["User research and competitive analysis report", "Sitemaps, user flows, and wireframes", "High-fidelity mockups and prototypes", "Design system and component library", "Developer handoff and specification documentation"],
    "Web Applications": ["Product specification and user stories", "System architecture and database design", "Built web application with API integration", "Test coverage and QA documentation", "Deployment pipeline and monitoring setup"],
    "Customer Portals": ["User research and requirements definition", "Portal design with intuitive navigation", "Built portal with authentication and integrations", "Onboarding and training materials", "Adoption tracking and analytics setup"],
    "Mobile Applications": ["App strategy and platform recommendation", "Mobile-optimised UI/UX design", "Built native or cross-platform application", "App store submission materials", "Post-launch monitoring and iteration plan"],
    "Performance Optimisation": ["Full performance audit and benchmark report", "Prioritised optimisation roadmap", "Implemented performance improvements", "Performance monitoring dashboard", "Performance budget and governance documentation"],
    "Accessibility Improvement": ["WCAG compliance audit report", "Prioritised remediation roadmap", "Implemented accessibility fixes", "Re-test and validation report", "Team training and ongoing compliance guide"],
    "AI Strategy": ["Current state assessment and opportunity map", "AI strategy and roadmap document", "Use case prioritisation matrix", "Governance and ethical framework", "ROI projections and investment plan"],
    "AI Readiness Audits": ["Data and infrastructure audit report", "Process and talent assessment", "AI readiness scorecard", "Gap analysis and prioritised recommendations", "Phased readiness action plan"],
    "AI Agents": ["Use case analysis and prioritisation document", "Agent architecture and design specification", "Built and deployed AI agent", "Integration with existing tools and APIs", "Performance monitoring dashboard"],
    "AI Assistants": ["Use case and scope definition document", "Conversation design and knowledge base", "Built and deployed AI assistant", "Integration with communication platforms", "Quality monitoring and analytics"],
    "Customer Support Automation": ["Support audit and automation opportunity report", "Automation workflow and escalation design", "Implemented chatbot and auto-response system", "CRM and support platform integration", "Performance metrics and optimisation plan"],
    "Lead Qualification Automation": ["Lead process audit and criteria definition", "Qualification automation workflow design", "AI-powered lead scoring implementation", "CRM and marketing platform integration", "Conversion tracking and optimisation report"],
    "Workflow Automation": ["Workflow audit and process mapping document", "Automation design and tool selection", "Implemented automated workflows", "Tool integration and error handling setup", "Usage monitoring and optimisation report"],
    "Document Processing": ["Document audit and requirements specification", "Processing pipeline and model selection", "Built document processing system", "Validation and human review workflow", "Accuracy monitoring and model improvement plan"],
    "Internal Knowledge Assistants": ["Knowledge audit and source mapping", "Knowledge architecture and retrieval design", "Built internal knowledge assistant", "Slack/Teams/web interface integration", "Knowledge maintenance and optimisation guide"],
    "Sales Follow-Up Automation": ["Sales follow-up audit and analysis", "Automated sequence and workflow design", "Multi-channel follow-up implementation", "CRM integration and lead scoring setup", "Performance tracking and optimisation report"],
    "Marketing Automation": ["Marketing process audit and tool assessment", "Automated journey design document", "Marketing automation implementation", "Multi-channel campaign setup", "Performance analytics and optimisation plan"],
    "AI Integration": ["Integration requirements and scope document", "Solution architecture and API design", "AI model integration implementation", "Testing and validation report", "Production deployment and monitoring setup"],
    "Voice and Messaging Automation": ["Use case and channel definition document", "Conversation scripts and NLP training data", "Voice and messaging automation implementation", "CRM and backend system integration", "Conversation quality and analytics dashboard"],
    "Internal Business Tools": ["Requirements and workflow analysis document", "System architecture and database design", "Built and tested internal tool", "User training and process documentation", "Ongoing support and iteration plan"],
    "Client Portals": ["User research and requirements document", "Portal design with secure authentication", "Built portal with CRM integration", "Onboarding and training materials", "Adoption tracking and analytics setup"],
    "Booking Platforms": ["Booking logic and requirements specification", "UX design with calendar and payment flows", "Built booking platform with real-time availability", "Payment gateway and notification integration", "Admin dashboard and reporting system"],
    "Directory Platforms": ["Content model and taxonomy document", "Search and filter architecture design", "Built directory platform", "Listing management and moderation tools", "User profiles and review system"],
    "Dashboards": ["KPI definition and data audit report", "Dashboard design and visualisation mockups", "Built dashboard with live data integration", "Interactive filters and drill-down capabilities", "User training and iteration roadmap"],
    "Reporting Systems": ["Reporting requirements and data mapping", "Report template designs", "Built reporting system with automation", "Scheduled distribution setup", "Data accuracy validation and documentation"],
    "API Development": ["API specification and endpoint documentation", "API architecture and security design", "Built and tested API with test coverage", "Auto-generated API documentation", "Deployment with monitoring and rate limiting"],
    "Third-Party Integrations": ["Integration requirements and data mapping", "Authentication and architecture design", "Built integration with error handling", "Monitoring dashboard and alerting", "Documentation and ongoing support"],
    "Data Workflows": ["Data audit and workflow mapping document", "Pipeline architecture and design specification", "Built data pipelines with automation", "Data quality validation and monitoring", "Documentation and maintenance guide"],
    "Admin Panels": ["Admin requirements and user roles document", "Admin interface design with access controls", "Built admin panel with CRUD operations", "Audit logging and user management", "Admin training and documentation"],
    "Multi-Tenant Platforms": ["Tenancy model and architecture document", "Infrastructure-as-code setup", "Built multi-tenant platform", "Tenant onboarding and billing integration", "Monitoring and scaling documentation"],
    "Custom Calculators and Auditing Tools": ["Calculation logic and rules specification", "Tool design with input and result interfaces", "Built calculator or auditing tool", "Validation testing and accuracy report", "User guide and iteration plan"],
    "Dashboard Development": ["KPI definition and data source audit report", "Dashboard design and visualisation mockups", "Built dashboard with live data integration", "Interactive filters and drill-down setup", "User training and iteration roadmap"],
    "Search Console Reporting": ["Search Console setup and data audit", "Search performance reporting framework", "Built dashboards and automated reports", "Ranking and traffic monitoring setup", "Ongoing insights and recommendations"],
    "Advertising Reporting": ["Advertising account audit and data assessment", "Unified reporting framework and KPI definitions", "Cross-platform advertising dashboards", "Scheduled automated report delivery", "Performance insights and optimisation recommendations"],
    "Lead Attribution": ["Attribution requirements and journey map document", "Attribution model recommendation and architecture", "Multi-touch tracking implementation", "Attribution dashboards and reporting", "Channel performance and ROI analysis"],
    "Data Warehousing": ["Data source audit and warehouse requirements document", "Warehouse schema and architecture design", "Built data warehouse with data pipelines", "Data migration and historical loading", "Access setup, documentation, and training"],
    "Marketing Performance Dashboards": ["Marketing KPI definition and data source map", "Dashboard design with funnel and campaign views", "Built marketing performance dashboard", "Multi-source data integration", "Team training and reporting cadence setup"],
    "Custom KPI Reporting": ["KPI definition and business goal alignment document", "Report template and calculation design", "Built automated reporting system", "Scheduled distribution and alert setup", "Stakeholder review and iteration plan"],
    "Data Quality Audits": ["Data source inventory and assessment report", "Data quality analysis and gap identification", "Prioritised remediation plan", "Data cleaning and quality fix implementation", "Monitoring dashboard and governance documentation"],
    "Custom CRM Development": ["CRM requirements analysis", "Custom feature development", "Migration and data import", "Third-party integration", "User training and documentation"],
    "SaaS Development": ["SaaS product strategy", "Multi-tenant architecture", "Subscription billing integration", "User management system", "Scalable infrastructure setup"],
    "Analytics Setup": ["Analytics platform selection", "Tracking implementation", "Goal and event configuration", "E-commerce tracking setup", "Data quality verification"],
    "GA4 Support": ["GA4 property setup and migration", "Event configuration", "Exploration report setup", "Custom dimension setup", "Training and documentation"],
  };
  return dels[name] || [
    `Detailed ${name.toLowerCase()} plan and strategy`,
    `Current state audit and analysis`,
    `Implementation and optimisation execution`,
    `Performance tracking and reporting dashboard`,
    `Continuous improvement and support`,
  ];
}

function generateFaq(name: string): { q: string; a: string }[] {
  const faqs: Record<string, { q: string; a: string }[]> = {
    "SEO Strategy": [
      { q: "What does an SEO strategy document actually contain?", a: "An SEO strategy document includes a technical audit summary, keyword opportunity analysis, competitor gap assessment, content roadmap, and a prioritised implementation timeline with KPI targets. Every section ties directly to business outcomes — traffic, conversions, and revenue." },
      { q: "How often should an SEO strategy be updated?", a: "SEO strategies should be reviewed quarterly and revised whenever there are major algorithm updates, competitor shifts, or business changes. We build flexible roadmaps that adapt without losing momentum." },
      { q: "What's the difference between SEO strategy and execution?", a: "Strategy defines what to do and why — the roadmap, priorities, and expected outcomes. Execution is the implementation of those recommendations. We provide both, but some clients prefer to execute internally with our strategic guidance." },
    ],
    "Technical SEO": [
      { q: "What technical issues have the biggest impact on rankings?", a: "Core Web Vitals — specifically Largest Contentful Paint and Cumulative Layout Shift — significantly affect user experience and rankings. Crawlability issues, duplicate content, broken internal links, and missing schema markup are also frequent high-impact problems we find." },
      { q: "How do you approach a technical SEO audit?", a: "We start with a full crawl using tools like Screaming Frog and DeepCrawl, then analyse server logs, Core Web Vitals data from CrUX, and structured HTML to identify every technical barrier to search performance." },
      { q: "Do you need developer access to perform technical SEO?", a: "Initially we can run most diagnostics with just a crawl URL and access to Google Search Console. For deeper analysis and fixes — like server configuration, JavaScript rendering, and schema deployment — we require development or CMS access." },
    ],
    "On-Page SEO": [
      { q: "What elements do you optimise on each page?", a: "We optimise title tags, meta descriptions, heading structure, body content, image alt text, internal links, and schema markup. Every element is aligned with target keywords and search intent to maximise relevance and click-through rates." },
      { q: "How is on-page SEO different from technical SEO?", a: "On-page SEO focuses on the content and HTML of individual pages — what users and search engines see and read. Technical SEO addresses the underlying infrastructure: crawlability, site speed, indexing, and server-level configuration." },
      { q: "Does on-page optimisation still matter with AI search?", a: "Yes, more than ever. AI search models rely on clear content structure, semantic relevance, and topical authority — all of which are core on-page SEO principles. Well-optimised pages are more likely to be cited in AI-generated answers." },
    ],
    "Off-Page SEO": [
      { q: "What types of backlinks are most valuable for rankings?", a: "Editorial backlinks from authoritative, relevant sites within your industry carry the most weight. Links from high-DR domains, .edu and .gov sources, and contextually relevant placements signal genuine authority to search engines." },
      { q: "How do you earn backlinks without violating Google's guidelines?", a: "We earn links through data-driven digital PR campaigns, original research and surveys, expert commentary opportunities, and creating genuinely valuable resources that publishers want to cite. We never buy links or participate in link schemes." },
      { q: "How long does it take to build a strong backlink profile?", a: "Building a healthy backlink profile is a continuous process. Most clients see meaningful improvements in domain authority and referral traffic within 3-6 months of consistent, quality link earning efforts." },
    ],
    "SEO Auditing": [
      { q: "What does a comprehensive SEO audit cover?", a: "A full audit covers three core areas: technical infrastructure (crawlability, indexation, site speed, Core Web Vitals), on-page quality (content, keywords, meta data, internal linking), and off-page health (backlink profile, domain authority, competitor positioning)." },
      { q: "How long does an SEO audit take to complete?", a: "A thorough audit typically takes 1-3 weeks depending on site size and complexity. Enterprise sites with hundreds of thousands of pages require more time for crawl analysis, log file processing, and competitive benchmarking." },
      { q: "What do I get at the end of an SEO audit?", a: "You receive a detailed report with every issue categorised by severity, a prioritised remediation roadmap, and an executive summary that explains what needs fixing and why it matters for your search performance." },
    ],
    "SEO Consulting": [
      { q: "What does SEO consulting involve on a day-to-day basis?", a: "We conduct regular strategy sessions, review performance data, audit ongoing work, and provide expert recommendations. Consultants act as an extension of your team — available for questions, reviews, and strategic guidance as needs arise." },
      { q: "How is consulting different from managed SEO services?", a: "Consulting provides strategic direction and expert oversight while your team or another agency handles execution. Managed services include hands-on implementation. We offer both models and often start with consulting before transitioning to execution." },
      { q: "What size of business benefits most from SEO consulting?", a: "Businesses with an internal marketing team but limited SEO expertise benefit most. Consulting is ideal for companies that want to build in-house capability while getting expert guidance on priorities, strategy, and best practices." },
    ],
    "Keyword Research": [
      { q: "How do you find keywords our competitors aren't targeting?", a: "We use competitive gap analysis to identify queries your competitors rank for that you don't, combined with search intent mapping and AI-assisted opportunity discovery to uncover underserved topics with real search demand." },
      { q: "What's the difference between short-tail and long-tail keywords?", a: "Short-tail keywords are broad, high-volume terms like 'SEO services' that are extremely competitive. Long-tail keywords are more specific, lower-competition phrases like 'SEO services for e-commerce stores in London' — they convert better and are easier to rank for." },
      { q: "How many keywords do you typically research per project?", a: "For a standard project we analyse 500-2000 potential keywords, then narrow to 100-300 high-priority targets based on search volume, competition, relevance, and conversion potential. The exact number depends on your industry and site size." },
    ],
    "Content Strategy": [
      { q: "How do you decide what content to create first?", a: "We prioritise content based on a combination of search demand, business value, and competitive opportunity. Topics that bridge high-intent keywords with your products or services, and where competitors have weak content, rise to the top." },
      { q: "What is a topic cluster and why does it matter?", a: "A topic cluster is a pillar page covering a broad topic linked to multiple cluster pages targeting specific subtopics. This structure signals topical authority to search engines and improves rankings across all related queries." },
      { q: "How often should we publish new content?", a: "Quality trumps frequency. Publishing one thoroughly researched, well-optimised piece per week outperforms rushing multiple mediocre pieces. We recommend a sustainable cadence that your team can maintain without sacrificing quality." },
    ],
    "Content Development": [
      { q: "How do you ensure content is both SEO-friendly and readable?", a: "We write for humans first, then optimise for search engines. Our writers follow detailed content briefs that include target keywords, search intent, competitor analysis, and structural guidance — producing natural, engaging content that ranks." },
      { q: "What types of content do you produce?", a: "We produce blog posts, guides, whitepapers, case studies, landing pages, infographics, videos, and interactive content. Every piece is designed to serve a specific stage of the buyer journey and drive measurable outcomes." },
      { q: "Do you repurpose existing content or always create from scratch?", a: "Both. We regularly audit existing content for refresh and repurposing opportunities — updating statistics, improving optimisation, and transforming high-performing pieces into new formats like videos, infographics, or slide decks." },
    ],
    "Local SEO": [
      { q: "What's the most important factor for local search rankings?", a: "Google Business Profile optimisation is the single most impactful factor. Complete and accurate business information, regular posts, responsive Q&A, and positive reviews all directly influence local pack visibility." },
      { q: "How do reviews affect local SEO?", a: "Review quantity, recency, and average rating are significant ranking signals. We help implement systematic review generation processes and response management to build a strong review profile that boosts local rankings." },
      { q: "Can we rank in local search without a physical storefront?", a: "Yes. Service-area businesses can rank in local search by setting up a GBP with a service area rather than a physical address. Consistent NAP citations across local directories and location-specific content also play a crucial role." },
    ],
    "E-commerce SEO": [
      { q: "How do you optimise product pages for search without hurting user experience?", a: "We use structured data markup, unique product descriptions, optimised image alt text, and internal linking — all elements that enhance rather than harm UX. The key is balancing SEO requirements with clean, shoppable page design." },
      { q: "What's the biggest SEO challenge for e-commerce sites?", a: "Duplicate content from product variants, faceted navigation creating thousands of thin pages, and category pages with insufficient unique content. We solve these through canonical tags, smart parameter handling, and category page content strategies." },
      { q: "How do you handle SEO for sites with thousands of products?", a: "We implement scalable solutions: automated meta data templates, bulk schema markup, faceted navigation management with noindex or robots.txt rules, and a strong internal linking structure that distributes authority across the catalogue." },
    ],
    "Enterprise SEO": [
      { q: "How do you manage SEO across multiple websites and teams?", a: "We build a central governance framework with clear ownership, standardised workflows, and cross-team communication protocols. This ensures consistent SEO practices across business units while respecting each team's autonomy." },
      { q: "What tools do you recommend for enterprise SEO?", a: "We typically recommend BrightEdge or Conductor for rank tracking and insights, DeepCrawl or Sitebulb for technical audits, and custom dashboards built in Looker Studio or Tableau for enterprise reporting that executives can act on." },
      { q: "How do you measure SEO success at an enterprise level?", a: "Beyond organic traffic and rankings, we track share of search, brand vs. non-brand traffic split, organic revenue and conversions, search visibility across key markets, and SEO influence on the full marketing funnel." },
    ],
    "International SEO": [
      { q: "What is hreflang and why is it critical for international SEO?", a: "Hreflang is an HTML attribute that tells search engines which language and regional version of a page to serve to users. Without correct hreflang implementation, you risk duplicate content issues and serving the wrong language version in search results." },
      { q: "Should I use subdirectories, subdomains, or separate domains for different countries?", a: "Subdirectories with hreflang annotations (e.g., domain.com/fr/) are generally preferred for SEO because they consolidate domain authority. Separate country-specific domains are necessary when targeting markets with different hosting requirements." },
      { q: "How do you handle keyword research across multiple languages?", a: "We never simply translate keywords — we conduct native keyword research in each target market using local search engines, language-specific tools, and native speakers to identify the actual terms your audience uses in each country." },
    ],
    "Website Migration SEO": [
      { q: "What's the biggest risk during a website migration?", a: "Traffic loss from broken redirects and changed URL structures. Even a single percentage point of redirect errors can result in thousands of lost visits. Proper redirect mapping, staging testing, and post-launch monitoring are non-negotiable." },
      { q: "How long before SEO performance recovers after a migration?", a: "Most sites experience a 2-6 week volatility period where rankings fluctuate. If the migration is executed correctly — with proper redirects, preserved content, and technical configuration — performance typically stabilises and recovers within 60-90 days." },
      { q: "What should be in a pre-migration SEO checklist?", a: "Full site crawl and indexation baseline, complete URL mapping from old to new structure, 301 redirect plan, content inventory and migration priority, analytics and search console reconfiguration, and a rollback plan in case of critical issues." },
    ],
    "Digital PR for Search": [
      { q: "What makes a digital PR campaign link-worthy?", a: "Original data, proprietary research, expert opinions on trending topics, and interactive tools or calculators. Journalists and publishers link to content that adds unique value to their stories — not generic brand pages or product pitches." },
      { q: "How do you measure the success of a digital PR campaign?", a: "We track earned backlinks, referring domain authority, referral traffic from press coverage, brand mention sentiment, and the direct impact on organic keyword rankings. The goal is measurable authority growth, not just coverage volume." },
      { q: "How does digital PR differ from traditional PR?", a: "Digital PR focuses specifically on earning links and online coverage that improve search rankings, not just brand awareness in print or broadcast. Every campaign is designed with SEO outcomes in mind, while still delivering valuable brand exposure." },
    ],
    "Search Reporting": [
      { q: "What metrics should I track in my search reporting dashboard?", a: "Core metrics include organic traffic, keyword rankings by position, click-through rates, impression share, goal completions and conversions, organic revenue, and search visibility score. Each metric should tie to a specific business objective." },
      { q: "How often should I review search performance reports?", a: "We recommend weekly performance snapshots for tactical adjustments, monthly deep-dives for strategy evaluation, and quarterly business reviews for executive alignment. The right cadence balances data freshness with actionable insight." },
      { q: "What's the difference between a search report and a data dashboard?", a: "A report tells a story — it interprets data, highlights changes, and makes recommendations. A dashboard provides real-time visualisation of metrics without narrative. We provide both: dashboards for daily monitoring and reports for strategic decision-making." },
    ],
    "Generative Engine Optimisation": [
      { q: "How is GEO different from traditional SEO?", a: "GEO optimises your brand for AI-powered search platforms like ChatGPT and Perplexity, not just traditional search engines. While SEO focuses on rankings and click-through rates, GEO focuses on brand citations, entity signals, and content extractability for AI-generated responses." },
      { q: "Which AI platforms do you optimise for?", a: "We optimise across ChatGPT, Perplexity, Google AI Overviews, Bing Copilot, Gemini, and emerging generative platforms. Our approach is platform-agnostic — we build fundamental entity and content signals that work across all AI systems." },
      { q: "How long does it take to see results from GEO?", a: "Most clients see measurable improvements in AI citation frequency within 60-90 days of implementing our recommendations. The timeline depends on your current entity presence, content maturity, and competitive landscape." },
    ],
    "Answer Engine Optimisation": [
      { q: "What is an answer engine versus a search engine?", a: "Answer engines like ChatGPT and Perplexity generate direct responses using AI rather than returning a list of links. They cite sources within their answers — and our goal is to make your content the source they cite most." },
      { q: "How do you make content citeable by answer engines?", a: "We structure content with clear entity definitions, authoritative sourcing, Q&A formats, and semantic relationships. Answer engines favour content that is well-structured, entity-rich, and consistently cited across multiple authoritative sources." },
      { q: "Do answer engines favour certain types of content?", a: "Yes — content that directly answers specific questions, includes proprietary data or research, has clear author attribution, and comes from domains with strong entity authority is significantly more likely to be cited in AI responses." },
    ],
    "AI Search Visibility Audits": [
      { q: "What does an AI visibility audit cover?", a: "It covers your brand presence across ChatGPT, Perplexity, Google AI Overviews, Bing Copilot, and Gemini. We check for brand mentions, citation accuracy, content source quality, entity recognition, and competitive visibility." },
      { q: "How often should AI visibility be audited?", a: "AI search platforms evolve rapidly. We recommend a full audit quarterly with light-touch monitoring weekly. Changes to AI model training data, citation algorithms, or source preferences can impact your visibility overnight." },
      { q: "What do I receive after an AI visibility audit?", a: "You receive a comprehensive report showing your current presence across every major AI platform, a competitive benchmarking analysis, and a prioritised roadmap of every improvement needed to increase AI visibility." },
    ],
    "Entity Optimisation": [
      { q: "What is an entity in the context of AI search?", a: "An entity is a distinct, well-defined thing — a person, company, product, place, or concept — that AI platforms can recognise and connect. Strong entity signals help AI models understand what you are and cite you accurately." },
      { q: "How do entities affect AI search visibility?", a: "AI platforms build knowledge graphs from entities. If your brand entity is incomplete, inconsistent, or missing, AI models can't confidently associate you with relevant topics — making you invisible in AI-generated responses." },
      { q: "What's involved in entity optimisation?", a: "We map your brand's entities, deploy comprehensive schema markup, build knowledge graph connections (including Wikidata and Google Knowledge Graph), and ensure consistent entity references across every platform where your brand appears." },
    ],
    "Brand Citation Readiness": [
      { q: "What is a brand citation in AI search?", a: "A brand citation is any online reference to your business — a directory listing, a media mention, a social profile, or a structured data entry. AI platforms use these citations to verify your existence, accuracy, and authority." },
      { q: "Why do citations matter for AI search specifically?", a: "AI platforms prioritise sources that have consistent, verifiable citations across multiple authoritative locations. Inconsistent or sparse citations signal low trustworthiness to AI models, reducing your likelihood of being cited." },
      { q: "What does citation readiness involve?", a: "We audit every existing citation for accuracy and consistency, fix discrepancies, build new citations on high-authority platforms, and set up continuous monitoring to catch and correct changes immediately." },
    ],
    "Structured Content Planning": [
      { q: "What makes content structured versus unstructured?", a: "Structured content follows a predictable format with clear entity relationships, semantic hierarchy, and standardised metadata. AI platforms can extract, interpret, and cite structured content far more reliably than unstructured pages." },
      { q: "How does structured content improve AI visibility?", a: "AI models parse content by identifying entities, relationships, and factual statements. Structured content — with clear topic clusters, entity-linked passages, and semantic markup — directly feeds how AI platforms build their knowledge." },
      { q: "Do I need to restructure all my existing content?", a: "Not necessarily. We audit your existing content to identify high-value pieces that can be restructured for AI citation, then prioritise changes by impact. New content is built structured from the start using our templates and governance framework." },
    ],
    "Digital PR": [
      { q: "What makes a digital PR campaign successful?", a: "A successful digital PR campaign is built on data — original research, proprietary insights, or unique stories that journalists can't get elsewhere. Combined with targeted outreach and personalised pitching, this approach earns quality coverage and backlinks." },
      { q: "How is digital PR different from traditional PR?", a: "Digital PR focuses specifically on earning links and online coverage that improve search rankings and online authority. Every campaign is designed with measurable SEO outcomes in mind while still delivering valuable brand exposure." },
      { q: "How do you measure digital PR success?", a: "We track earned backlinks, referring domain authority, referral traffic, brand mention sentiment, and the direct impact on organic keyword rankings. The goal is measurable authority growth, not just coverage volume." },
    ],
    "Press Release Strategy": [
      { q: "When should we issue a press release?", a: "Press releases are most effective when you have genuinely newsworthy announcements — product launches, funding news, partnerships, milestone achievements, or original data releases. Not every update warrants a release." },
      { q: "How do you ensure a press release gets picked up?", a: "We focus on newsworthiness, compelling headlines, multimedia assets, and targeted distribution to the right journalists. A great release sent to the wrong people won't perform — targeting is as important as the content itself." },
      { q: "Should we use a wire service or direct outreach?", a: "Both have their place. Wire services provide broad distribution and SEO value through syndication. Direct outreach to targeted journalists drives higher-quality pickups. We use a hybrid approach depending on the announcement." },
    ],
    "Media Outreach": [
      { q: "How do you choose which journalists to contact?", a: "We build media lists based on beat relevance, publication authority, audience alignment, and past coverage patterns. Every journalist on the list has a demonstrated interest in your industry or topic area." },
      { q: "How many journalists do you typically reach out to per campaign?", a: "Quality over quantity. For most campaigns we target 20-50 carefully selected journalists with personalised pitches rather than blasting hundreds of generic emails. A well-targeted list outperforms a large one every time." },
      { q: "How do you personalise pitches at scale?", a: "We research each journalist's recent coverage, writing style, and audience before writing each pitch. Templates are used for structure only — every pitch is customised with specific references to the journalist's work." },
    ],
    "Journalist Research": [
      { q: "Why is journalist research important for PR?", a: "Journalists receive hundreds of pitches daily. The ones that get read are relevant, personalised, and timed right. Research tells you exactly what each journalist covers, how they prefer to be contacted, and what stories they're likely to pick up." },
      { q: "What information do you track about each journalist?", a: "We track beat, publication, recent articles, preferred sources, pitching style, response history, social presence, and any personalisation hooks that will make our pitches stand out." },
      { q: "How often is the journalist database updated?", a: "Journalist moves, beat changes, and new hires happen constantly. We monitor these changes in real-time and refresh our database weekly to ensure accuracy and timeliness." },
    ],
    "Founder Positioning": [
      { q: "Why does founder positioning matter for growth?", a: "Founders are the most powerful brand assets a company has. A well-positioned founder attracts media coverage, speaking invitations, partnership opportunities, and customer trust — all of which directly drive business growth." },
      { q: "How long does it take to build founder authority?", a: "Founder positioning is a long-term investment. Most founders see measurable results — media coverage, speaking invitations, social growth — within 3-6 months of consistent execution." },
      { q: "Do you work with founders who are starting from zero public presence?", a: "Absolutely. Most of our founder clients start with minimal public profile. We build from the ground up — narrative development, platform optimisation, and strategic placement starting with smaller, achievable wins." },
    ],
    "Thought Leadership": [
      { q: "What's the difference between thought leadership and content marketing?", a: "Content marketing promotes your products or services through useful content. Thought leadership establishes your expertise on industry topics regardless of your product. The best thought leadership doesn't mention your product at all." },
      { q: "Which platforms are best for thought leadership?", a: "It depends on your audience. LinkedIn and industry publications are strong for B2B thought leadership. Speaking at conferences and industry events builds deep authority. We develop a platform strategy based on where your audience engages." },
      { q: "How do you measure thought leadership impact?", a: "We track share of voice, content engagement, speaking invitations, media citations, social following growth, and direct business outcomes like inbound inquiries attributed to thought leadership content." },
    ],
    "Brand Mentions": [
      { q: "What counts as a brand mention?", a: "A brand mention is any online reference to your brand — news articles, blog posts, social media shoutouts, podcast mentions, review site entries, directory listings, and industry publication references." },
      { q: "How do brand mentions affect SEO?", a: "Brand mentions — even unlinked ones — are increasingly recognised as authority signals by search engines and AI platforms. Consistent, quality mentions across authoritative sources tell algorithms your brand is credible and relevant." },
      { q: "How many brand mentions should we aim for?", a: "Quality over quantity. One mention in a tier-1 publication is worth hundreds of low-quality directory listings. We focus on building mentions from authoritative, relevant sources in your industry." },
    ],
    "Link-Earning Campaigns": [
      { q: "What types of content earn the most links?", a: "Original research and data studies consistently earn the most links. Interactive tools, comprehensive guides, expert surveys, and industry reports also perform well. The common thread is unique value that publishers can't get elsewhere." },
      { q: "Are link-earning campaigns the same as link building?", a: "No. Link building often involves direct requests for links or outreach to site owners. Link-earning creates assets so good that publishers link to them naturally — a sustainable, scalable approach that aligns with search engine guidelines." },
      { q: "How long does it take to earn quality backlinks?", a: "Link-earning is not instant. Most campaigns start generating links within 4-8 weeks of asset publication, with momentum building over 3-6 months as the asset gets discovered and referenced by more publishers." },
    ],
    "Reputation Management": [
      { q: "What's the first step in managing online reputation?", a: "A comprehensive audit. You can't fix what you haven't measured. We assess every review platform, news mention, social conversation, and search result to understand the full picture before building a strategy." },
      { q: "Can negative search results be removed?", a: "In some cases, yes — outdated or defamatory content can be removed through legal requests or platform policies. For legitimate negative content, the strategy is to push it down with positive, authoritative content that search engines rank higher." },
      { q: "How long does reputation repair take?", a: "The timeline depends on the severity of the issue. Minor inconsistencies can be fixed in weeks. Significant reputation challenges typically require 6-12 months of consistent effort to see meaningful improvement." },
    ],
    "Crisis Communication Support": [
      { q: "What qualifies as a PR crisis?", a: "A crisis is any event that threatens your brand reputation — product recalls, security breaches, negative media attention, social media backlash, executive scandals, or regulatory issues. If it could damage trust, it's a crisis." },
      { q: "How quickly can you respond when a crisis hits?", a: "We maintain 24/7 crisis response availability. Our team can deploy within hours with holding statements, monitoring setup, and media response coordination." },
      { q: "Do we need crisis preparation if nothing is wrong?", a: "Yes. The best crisis response happens before the crisis. Having a playbook, trained spokespeople, and monitoring infrastructure in place means you can respond immediately instead of scrambling when every minute counts." },
    ],
    "Awards and Profile Support": [
      { q: "Which awards should we apply for?", a: "We focus on awards that are relevant to your industry, respected by your audience, and achievable based on your current stage. A targeted approach beats applying for hundreds of irrelevant awards." },
      { q: "How much effort is required for award submissions?", a: "Quality submissions require significant effort — compelling narratives, supporting data, case studies, and testimonials. We handle the entire process so your team can focus on running the business." },
      { q: "Do awards actually help with business growth?", a: "Yes. Awards provide third-party validation, improve brand perception, support sales conversations, attract talent, and create content opportunities. They're a signal of credibility that works across every channel." },
    ],
    "PR Measurement": [
      { q: "What metrics actually matter for PR?", a: "Beyond basic metrics like impressions and reach, we track share of voice, message penetration, sentiment trends, referral traffic from coverage, earned media value, and direct business outcomes like leads and pipeline influenced." },
      { q: "How do you connect PR activities to business results?", a: "We build integrated measurement frameworks that connect coverage to website traffic, lead generation, and revenue using tracking tools, attribution modelling, and sales data integration." },
      { q: "How often should PR performance be measured?", a: "We recommend weekly monitoring for tactical adjustments, monthly reporting for strategy evaluation, and quarterly deep-dives for executive review. The right cadence ensures you're always optimising, not just reporting." },
    ],
    "Google Ads": [
      { q: "What's the difference between Google Ads and organic SEO?", a: "Google Ads delivers paid results at the top of search results — immediate visibility for targeted keywords. SEO builds organic rankings over time. Both are essential: SEO for sustainable presence, Google Ads for immediate traffic and testing." },
      { q: "How much budget do I need for Google Ads to work?", a: "There's no minimum, but we typically recommend at least $2,000-5,000 per month to gather meaningful data and optimise effectively. The right budget depends on your industry, competition, and target CPA." },
      { q: "How long does it take to optimise a Google Ads campaign?", a: "Initial optimisation takes 4-6 weeks to gather enough data for meaningful bid adjustments and audience refinement. Ongoing optimisation is continuous — we're always testing, adjusting, and improving." },
    ],
    "PPC Management": [
      { q: "What's included in PPC management?", a: "Full account management — bid optimisation, keyword expansion, ad copy testing, audience refinement, landing page recommendations, and regular performance reporting. We handle the day-to-day so you don't have to." },
      { q: "How is managed PPC different from doing it in-house?", a: "Managed PPC brings dedicated expertise, advanced tools, cross-account insights, and continuous optimisation that's hard to maintain with an in-house generalist. We see opportunities that individual account managers often miss." },
      { q: "Which PPC platforms do you manage?", a: "We manage Google Ads, Microsoft Advertising (Bing), LinkedIn Ads, Meta Ads, TikTok Ads, and Amazon Ads. We recommend the right mix based on your business, audience, and goals." },
    ],
    "Search Advertising": [
      { q: "How is search advertising different from display advertising?", a: "Search advertising targets users actively searching for specific keywords — high intent, immediate demand. Display advertising reaches users based on interests and behaviours — more about awareness and consideration." },
      { q: "What makes a search ad campaign successful?", a: "Three things: precise keyword targeting with proper match types, compelling ad copy that matches search intent, and landing pages that deliver on the ad's promise. All three must align for optimal ROAS." },
      { q: "Should I use broad match or exact match keywords?", a: "A strategic mix. Exact match gives you control over which queries trigger your ads. Broad match with smart bidding can uncover valuable new queries. We combine both approaches with careful negative keyword management." },
    ],
    "Display Advertising": [
      { q: "Is display advertising effective for B2B?", a: "Yes, particularly for top-of-funnel awareness and mid-funnel retargeting. Programmatic display with account-based targeting and LinkedIn audience integration makes B2B display highly effective for reaching decision-makers." },
      { q: "What metrics should I track for display campaigns?", a: "Beyond CTR, track view-through conversions, impression share, frequency, reach, and brand lift. Display's value is often in assisted conversions and brand awareness — not just direct clicks." },
      { q: "How do you prevent display ad fatigue?", a: "We manage frequency caps, rotate creative variants, use responsive display ads that automatically optimise combinations, and refresh creative on a regular cadence to maintain engagement." },
    ],
    "Remarketing": [
      { q: "How soon after a visit should remarketing ads appear?", a: "Immediately — but with thoughtful frequency management. We set up remarketing with appropriate cookie windows and frequency caps to stay top-of-mind without feeling intrusive." },
      { q: "Does remarketing work for cold traffic?", a: "Remarketing by definition targets warm traffic — people who've already visited your site. For cold traffic, we recommend combining remarketing with prospecting campaigns that reach new audiences." },
      { q: "How do you segment remarketing audiences?", a: "We segment by behaviour — page visited, time on site, actions taken, items added to cart, past purchases. Each segment receives tailored messaging that matches their level of interest and intent." },
    ],
    "Paid Social": [
      { q: "Which social platform is best for advertising?", a: "It depends on your audience and goals. Meta (Facebook/Instagram) is best for broad B2C reach. LinkedIn excels for B2B targeting. TikTok works for younger audiences. We recommend platforms based on where your audience spends time." },
      { q: "How do you measure paid social ROI?", a: "We track full-funnel metrics — reach and engagement for awareness, click-through and lead form fills for consideration, and conversions and revenue for bottom-line impact. Platform-native pixels and UTM tracking ensure accurate attribution." },
      { q: "What creative formats perform best on social?", a: "Video consistently outperforms static across platforms. Short-form video (15-30 seconds) with captions, strong hooks in the first 3 seconds, and clear CTAs drives the best engagement and conversion rates." },
    ],
    "Media Planning": [
      { q: "What goes into a media plan?", a: "A comprehensive media plan includes audience analysis, channel selection and rationale, budget allocation by channel and campaign, creative format recommendations, a measurement framework with KPIs, and a timeline for launch and optimisation." },
      { q: "How often should a media plan be updated?", a: "Media plans should be reviewed monthly for budget reallocation and quarterly for strategic refinement. The core plan is a living document — it should adapt as you learn what works." },
      { q: "Do you handle media buying or just planning?", a: "Both. We develop the media plan and execute it across channels. Clients who prefer to buy media in-house can use our plans as a strategic roadmap while we remain available for guidance." },
    ],
    "Landing Page Optimisation": [
      { q: "What's the difference between landing page optimisation and CRO?", a: "Landing page optimisation focuses specifically on pages designed to convert visitors from specific campaigns. CRO is broader — it covers your entire website's conversion performance, including product pages, checkout flows, and sign-up funnels." },
      { q: "How much can landing page optimisation improve conversion rates?", a: "We typically see 30-100% improvement in conversion rates from a structured landing page optimisation programme. The exact lift depends on your starting point, traffic quality, and how many optimisation opportunities exist." },
      { q: "How do you know what to change on a landing page?", a: "We use data — heatmaps, session recordings, form analytics, scroll maps, and A/B test results — to identify exactly where users drop off and what changes will have the biggest impact." },
    ],
    "Conversion Tracking": [
      { q: "Why is conversion tracking important for paid media?", a: "Without accurate conversion tracking, you're optimising blind. You don't know which keywords, ads, or audiences drive real business value. Proper tracking lets you invest in what works and cut what doesn't." },
      { q: "What's involved in setting up conversion tracking?", a: "Platform pixel implementation, event parameter configuration, goal setup in analytics platforms, offline conversion import from your CRM, and cross-platform attribution alignment to ensure consistent measurement." },
      { q: "How do you handle cross-device and offline conversions?", a: "We use Google's cross-device reporting, enhanced conversions, and offline conversion import from your CRM to capture the full customer journey. This gives you credit for conversions that happen across devices or offline." },
    ],
    "Campaign Auditing": [
      { q: "What does a campaign audit cover?", a: "We audit account structure, campaign settings, keyword targeting, ad copy quality, audience segmentation, bid strategies, budget allocation, landing page alignment, and tracking implementation." },
      { q: "How often should campaigns be audited?", a: "We recommend a full audit quarterly, with light-touch spot checks monthly. Frequent changes in auction dynamics, audience behaviour, and platform features mean campaigns can drift from optimal without regular review." },
      { q: "What do I get from a campaign audit?", a: "A comprehensive report with every issue categorised by severity, a prioritised optimisation roadmap, quick-win recommendations you can implement immediately, and long-term strategic recommendations." },
    ],
    "Budget Planning": [
      { q: "How do you determine the right advertising budget?", a: "We start with your business goals — revenue targets, target CPA, and growth timeline — then build a bottom-up budget model based on channel performance, market benchmarks, and competitive landscape." },
      { q: "What if my budget is too small for meaningful results?", a: "We focus your limited budget on the highest-ROI channels and most efficient campaigns first. Even small budgets can drive results with proper targeting and optimisation — we just set realistic expectations." },
      { q: "How do you handle budget reallocation during a campaign?", a: "We monitor performance continuously and recommend reallocations based on data. If one channel is outperforming another by 3x, we shift budget accordingly while maintaining enough spend on underperforming channels for testing." },
    ],
    "Creative Testing": [
      { q: "How many creative variations should I test?", a: "We typically test 3-5 variants per hypothesis — enough to identify meaningful differences without fragmenting your data. Once a winner emerges, we test new variants against it in an ongoing cycle." },
      { q: "What elements of creative should I test first?", a: "Start with the elements that have the biggest impact: headlines and offers (most impactful), then images and CTAs, then format and layout. Test one variable at a time to isolate what drives the difference." },
      { q: "How long should a creative test run?", a: "Until you reach statistical significance — typically 1-3 weeks depending on traffic volume. The most common mistake is ending tests too early based on small sample sizes. Patience produces reliable results." },
    ],
    "Social Media Strategy": [
      { q: "How often should a social media strategy be updated?", a: "We recommend reviewing your social media strategy quarterly, with light-touch monthly check-ins. Platform algorithms, audience behaviour, and competitive landscapes change fast — your strategy should evolve with them." },
      { q: "What platforms should my business be on?", a: "Not every platform is right for every business. We recommend platforms based on where your target audience spends time, your content capabilities, and your business goals. Often, doing fewer platforms well beats being everywhere poorly." },
      { q: "How do you measure social media strategy success?", a: "Success looks different for every business. We define KPIs upfront — engagement, reach, traffic, leads, or direct revenue — and build dashboards that connect social activity to business outcomes." },
    ],
    "Social Media Management": [
      { q: "How much time does social media management take?", a: "Active management typically requires 10-20 hours per week per platform, depending on posting frequency, community engagement volume, and content production needs. We handle all of it so you don't have to." },
      { q: "What's included in social media management?", a: "Content creation and scheduling, community engagement, comment and message management, performance tracking, monthly reporting, and strategic recommendations. Everything needed to maintain an active, growing social presence." },
      { q: "How long until we see results from social media management?", a: "Initial engagement improvements are visible within 4-6 weeks as we optimise posting cadence and content mix. Meaningful audience growth and business impact typically emerge within 3-6 months of consistent management." },
    ],
    "Social Campaigns": [
      { q: "What's the difference between a social campaign and regular social content?", a: "Social campaigns are time-bound initiatives with specific goals — product launches, event promotion, seasonal pushes. They have dedicated budgets, paid amplification, and measurable targets. Regular content maintains ongoing presence and engagement." },
      { q: "How do you measure social campaign success?", a: "We define campaign-specific KPIs at the start — reach, engagement rate, click-through rate, lead generation, or direct conversions. We track these in real-time and provide a full post-campaign analysis." },
      { q: "What makes a social campaign go viral?", a: "Virality isn't something you can reliably engineer. We focus on creating campaigns that resonate deeply with your target audience, use compelling creative, and have clear amplification strategies — rather than chasing viral metrics." },
    ],
    "Content Production": [
      { q: "What types of content do you produce?", a: "We produce blog posts, articles, whitepapers, eBooks, case studies, infographics, videos, podcasts, social content, email content, and more. Our team covers the full spectrum from long-form thought leadership to short-form social assets." },
      { q: "How do you ensure content quality and brand alignment?", a: "Every piece goes through a structured process — detailed brief, research and outline, writing and design, internal review, stakeholder feedback, and final polish. We maintain brand guidelines and style guides to ensure consistency." },
      { q: "How much content do I need to produce?", a: "Quality over quantity. We recommend a sustainable cadence based on your audience, channels, and resources. For most B2B businesses, 2-4 high-quality pieces per month outperforms daily low-value content." },
    ],
    "Social Content": [
      { q: "What's the difference between social content and regular content?", a: "Social content is designed specifically for social platforms — shorter, more visual, platform-native formats that stop the scroll. It's less about deep dives and more about hooks, visuals, and immediate engagement." },
      { q: "How do you create content for multiple platforms?", a: "We start with a core concept or message, then adapt format, length, and creative for each platform's best practices. A single campaign idea becomes a TikTok video, Instagram carousel, LinkedIn article, and X thread — each optimised for that channel." },
      { q: "What social content formats perform best?", a: "Short-form video consistently outperforms other formats across platforms. Behind-the-scenes, educational content, user-generated content, and authentic storytelling drive the highest engagement. We test formats to find what works for your audience." },
    ],
    "Video and Motion": [
      { q: "What types of video do you produce?", a: "We produce brand films, product demos, explainer videos, social video (TikTok, Reels, Shorts), animated content, motion graphics, testimonials, event coverage, and more. From 15-second social clips to full-length corporate films." },
      { q: "How long does video production take?", a: "Timelines vary by complexity. Simple social videos can be produced in 1-2 weeks. Full brand films with pre-production, shooting, and post-production typically take 4-8 weeks. We work to your timeline and budget." },
      { q: "Do I need video production to succeed on social media?", a: "Video is increasingly essential for social media success. Platforms prioritise video content, and audiences engage more with video than static posts. That said, a mix of formats — video, static, carousel, text — is the most effective approach." },
    ],
    "Email Marketing": [
      { q: "Is email marketing still effective?", a: "Absolutely. Email marketing consistently delivers the highest ROI of any digital channel — $36 for every $1 spent. It's the most direct, personal, and measurable way to connect with your audience." },
      { q: "How do you grow an email list?", a: "We use ethical list-building strategies — lead magnets, content upgrades, gated content, website sign-up forms, social media promotion, and partnerships. We never buy lists or use spammy tactics." },
      { q: "What's the best email frequency?", a: "The right frequency depends on your audience and content. Weekly newsletters work well for most businesses. Transactional and triggered emails go when the action occurs. We test frequency to find the sweet spot for engagement and unsubscribes." },
    ],
    "Brand Messaging": [
      { q: "What's the difference between brand messaging and brand identity?", a: "Brand messaging is what you say and how you say it — your value propositions, tone of voice, key messages. Brand identity is your visual expression — logo, colours, typography. Both work together to create a cohesive brand." },
      { q: "How do you develop brand messaging?", a: "We start with deep discovery — your story, values, audience, competition, and market position. Then we craft a messaging framework that includes your core message, value propositions, brand voice, and key messages for each audience segment." },
      { q: "How do you know if brand messaging is working?", a: "We test messaging through A/B testing in campaigns, audience research and surveys, website analytics (time on page, bounce rate), and sales feedback. Effective messaging resonates, differentiates, and drives action." },
    ],
    "Campaign Creative": [
      { q: "What's included in campaign creative?", a: "Everything visual and written for a campaign — concepts, headlines, visuals, video, copy, social assets, display ads, landing page design. We produce creative that works together as a cohesive campaign across all touchpoints." },
      { q: "How do you develop campaign creative concepts?", a: "We start with a creative brief based on campaign objectives, target audience, and key messages. We explore multiple concept directions, present mood boards and rough concepts, refine based on feedback, and produce final assets." },
      { q: "Do you handle both strategy and creative execution?", a: "Yes. We develop the creative strategy — the big idea, visual direction, tone — and execute across all formats and platforms. Having strategy and execution in one team ensures cohesive, on-brief creative." },
    ],
    "Copywriting": [
      { q: "What types of copy do you write?", a: "Website copy, blog posts, articles, social media copy, email copy, ad copy (Google, social, display), landing page copy, sales pages, product descriptions, press releases, and more. We write for any channel or format." },
      { q: "How do you ensure copy is SEO-friendly?", a: "We integrate SEO best practices from the start — keyword research, natural keyword placement, meta descriptions, heading structure, internal linking. Good SEO copy is written for humans first and search engines second." },
      { q: "Do you offer copy editing and proofreading?", a: "Yes. Every piece of copy goes through rigorous editing and proofreading before delivery. We also offer standalone editing services for existing content that needs polishing or optimisation." },
    ],
    "Content Systems": [
      { q: "What is a content system?", a: "A content system is the combination of tools, workflows, roles, and processes that govern how content is planned, created, approved, published, and measured. It makes content operations scalable, efficient, and consistent." },
      { q: "What tools do you recommend for content systems?", a: "We recommend tools based on your specific needs and team size. Common stacks include Notion or Airtable for planning, a headless CMS like Contentful or Sanity for content management, and Asana or Monday.com for project management." },
      { q: "How long does it take to implement a content system?", a: "Implementation typically takes 4-8 weeks depending on complexity — system design, tool selection and setup, workflow configuration, team training, and documentation. We phase the rollout to minimise disruption." },
    ],
    "Next.js Website Development": [
      { q: "Why choose Next.js over other frameworks?", a: "Next.js offers server-side rendering, static generation, incremental static regeneration, and API routes out of the box. It gives you fast page loads, great SEO, and excellent developer experience with React." },
      { q: "Can you migrate my existing site to Next.js?", a: "Yes. We assess your current site, plan the migration incrementally, and move pages and functionality over while maintaining SEO rankings and user experience throughout the transition." },
      { q: "Do you handle hosting and deployment?", a: "We recommend and configure deployment on Vercel (for optimal Next.js performance), set up CI/CD pipelines, and manage ongoing deployments as part of our support offering." },
    ],
    "Corporate Websites": [
      { q: "What makes a corporate website different from a marketing site?", a: "Corporate sites serve multiple stakeholders — investors, media, partners, recruits — with content about company values, leadership, governance, and news. Marketing sites are focused on converting visitors into customers." },
      { q: "How do you balance corporate professionalism with engaging design?", a: "Professional doesn't mean boring. We use clean layouts, premium typography, thoughtful animation, and high-quality imagery to create corporate sites that feel trustworthy and modern." },
      { q: "Do you integrate with existing corporate systems?", a: "Yes. We integrate with CRM (Salesforce, HubSpot), HR systems (Workday, Bamboo), investor relations platforms, and content management systems to ensure your site connects with your existing tech stack." },
    ],
    "Marketing Websites": [
      { q: "How is a marketing website different from a corporate website?", a: "Marketing websites are built to drive conversions — leads, demo requests, sales. They have persuasive copy, prominent CTAs, social proof, and clear conversion paths. Corporate websites focus on information and credibility." },
      { q: "What's the typical timeline for a marketing website?", a: "A well-executed marketing website typically takes 8-12 weeks from discovery to launch. The timeline depends on complexity, number of pages, integrations, and content readiness." },
      { q: "How do you ensure a marketing website generates leads?", a: "We design every page with conversion in mind — clear value propositions, compelling CTAs, strategic content placement, trust signals, and integrated analytics and tracking to measure and iterate on performance." },
    ],
    "Landing Pages": [
      { q: "What's the difference between a landing page and a homepage?", a: "A landing page is a single-purpose page designed for a specific campaign or offer — one goal, one CTA, minimal navigation. A homepage introduces your brand and provides multiple entry points to different sections." },
      { q: "How many landing pages do I need?", a: "As many as you have distinct campaigns, offers, or audience segments. Each landing page should serve a single, specific goal. Quality and relevance matter more than quantity." },
      { q: "What makes a landing page convert?", a: "Clarity of message, alignment between ad and page, strong headline, compelling CTA, social proof, minimal distractions, fast load time, and trust signals. We test and optimise each of these elements." },
    ],
    "E-commerce Development": [
      { q: "Which e-commerce platform should I use?", a: "It depends on your needs. Shopify for simplicity and speed, WooCommerce for WordPress integration, Magento/Adobe Commerce for enterprise scale, or custom-built for unique requirements. We recommend based on your products, scale, and budget." },
      { q: "How do you handle payment gateways?", a: "We integrate with major payment providers — Stripe, PayPal, Square, and region-specific options. We also support subscription billing, multi-currency, and buy-now-pay-later services like Klarna and Afterpay." },
      { q: "How do you optimise e-commerce for conversions?", a: "We optimise product pages, streamline checkout flows, reduce cart abandonment, implement upsell and cross-sell, add social proof and reviews, and ensure mobile-first design and fast page loads." },
    ],
    "WordPress Development": [
      { q: "When should I choose WordPress over a custom build?", a: "WordPress is ideal when you need a site your team can manage independently, content is updated frequently, and you need the flexibility of thousands of plugins. Custom builds are better for complex, unique applications." },
      { q: "Is WordPress still secure?", a: "Yes, when properly maintained. We implement security best practices — regular updates, security plugins, SSL, limited user permissions, and monitoring. Security is about how you manage WordPress, not WordPress itself." },
      { q: "Can WordPress handle high-traffic sites?", a: "Absolutely. With proper hosting, caching, CDN, and optimisation, WordPress can handle millions of visitors. Many enterprise sites run on WordPress with the right architecture and infrastructure." },
    ],
    "Headless CMS Development": [
      { q: "What is headless CMS and why would I need it?", a: "A headless CMS separates content management from frontend presentation, delivering content via API. You need it when you want to publish content across multiple channels — website, mobile app, smart devices — from a single backend." },
      { q: "Which headless CMS do you recommend?", a: "We recommend based on your needs: Contentful for enterprise scale, Sanity for developer flexibility, Strapi for cost-effective self-hosting, or a custom solution for unique requirements." },
      { q: "Is headless CMS more expensive than traditional CMS?", a: "Initial build costs are typically higher, but long-term benefits — flexibility, performance, omnichannel delivery, and developer efficiency — often make it more cost-effective at scale." },
    ],
    "UI and UX Design": [
      { q: "What's the difference between UI and UX design?", a: "UX (user experience) design focuses on the overall feel and usability — research, information architecture, user flows, and testing. UI (user interface) design focuses on the visual elements — layouts, colours, typography, and interactive states." },
      { q: "Do I need both UI and UX design?", a: "Yes. Good UX without good UI feels clunky and untrustworthy. Good UI without good UX looks beautiful but frustrates users. Both are essential for a successful digital product." },
      { q: "How do you validate your designs?", a: "We validate through user testing, A/B testing, heatmaps, session recordings, and analytics. We iterate designs based on real user behaviour, not just stakeholder opinions." },
    ],
    "Web Applications": [
      { q: "What's the difference between a website and a web application?", a: "A website primarily delivers content and information. A web application provides interactive functionality — users can create, edit, and manage data. Think of a site like a brochure and an app like a tool." },
      { q: "What technologies do you use for web applications?", a: "We primarily use Next.js and React for the frontend, Node.js or Python for the backend, and PostgreSQL or MongoDB for databases. We choose the stack based on your specific requirements and scale." },
      { q: "How do you ensure web application security?", a: "We implement authentication and authorisation, input validation, data encryption, secure API design, regular security audits, and compliance with relevant standards (GDPR, SOC 2, HIPAA as needed)." },
    ],
    "Customer Portals": [
      { q: "What features can a customer portal include?", a: "Account management, document sharing, ticket/submission tracking, knowledge base, messaging, billing and invoices, analytics dashboards, and integration with your CRM and support tools." },
      { q: "How do you ensure customer portal adoption?", a: "We design for simplicity and value from day one — intuitive onboarding, clear value proposition, useful default content, and integration with existing workflows customers already use." },
      { q: "Do you integrate portals with existing systems?", a: "Yes. We integrate with CRM (Salesforce, HubSpot), support tools (Zendesk, Intercom), billing systems (Stripe, Chargebee), and any other systems your portal needs to connect with." },
    ],
    "Mobile Applications": [
      { q: "Should I build native or cross-platform?", a: "Native (Swift for iOS, Kotlin for Android) offers best performance and platform-specific features. Cross-platform (React Native, Flutter) is more cost-effective and faster to develop. We recommend based on your priorities." },
      { q: "How long does it take to build a mobile app?", a: "A basic app takes 3-4 months. A feature-rich app with backend integration, user accounts, and real-time features takes 6-12 months. We use agile development to deliver value iteratively." },
      { q: "Do you help with app store submission?", a: "Yes. We prepare all required materials — app icons, screenshots, descriptions, privacy policies — and manage the Apple App Store and Google Play Store submission process." },
    ],
    "Performance Optimisation": [
      { q: "What is a good Lighthouse score?", a: "We aim for 90+ on all Core Web Vitals metrics — Largest Contentful Paint (under 2.5s), First Input Delay (under 100ms), and Cumulative Layout Shift (under 0.1). These scores directly impact user experience and SEO." },
      { q: "Does performance optimisation affect SEO?", a: "Yes, significantly. Google uses Core Web Vitals as a ranking factor. Faster sites rank higher, have lower bounce rates, and convert better. Performance is both a user experience and SEO investment." },
      { q: "How much improvement can I expect from performance optimisation?", a: "Most sites see 30-60% improvement in load times after optimisation. Some see 2-3x improvements depending on how unoptimised the starting point is. Every second of improvement increases conversions." },
    ],
    "Accessibility Improvement": [
      { q: "What accessibility standards do you follow?", a: "We follow WCAG 2.2 AA as the minimum standard. For clients in regulated industries or with specific accessibility requirements, we also support WCAG AAA compliance." },
      { q: "Is accessibility only about screen readers?", a: "No. Accessibility covers visual (colour contrast, text size), auditory (captions, transcripts), motor (keyboard navigation, focus management), and cognitive (clear language, consistent navigation) needs." },
      { q: "What's the cost of making a site accessible?", a: "It varies dramatically. Building accessibility in from the start adds minimal cost. Retrofitting an existing site can be more expensive. We provide a detailed audit and prioritised roadmap so you can plan the investment." },
    ],
    "AI Strategy": [
      { q: "How do I know if my business is ready for AI?", a: "We assess readiness across four dimensions: data quality and accessibility, technology infrastructure, process maturity, and team capability. Many businesses are readier than they think — they just need a clear plan." },
      { q: "Do I need an AI strategy if I'm already using AI tools?", a: "Yes. Using individual AI tools without a strategy leads to fragmented adoption, security risks, and missed opportunities. A strategy ensures your AI investments align with business goals and work together coherently." },
      { q: "How long does it take to develop an AI strategy?", a: "Most AI strategy engagements take 4-8 weeks depending on business complexity and scope. We deliver a prioritised roadmap with quick wins in the first 30 days and a long-term vision." },
    ],
    "AI Readiness Audits": [
      { q: "What does an AI readiness audit cost?", a: "Cost depends on the scope and size of your organisation. We offer a standard audit package for most businesses and a more comprehensive assessment for larger or more complex organisations." },
      { q: "What happens after the audit?", a: "You get a detailed report with your readiness score, gap analysis, and prioritised action plan. We can also help you execute the recommendations if needed." },
      { q: "How long does an audit take?", a: "A standard audit takes 2-3 weeks including data collection, analysis, and reporting. The timeline depends on how many systems, teams, and processes need assessment." },
    ],
    "AI Agents": [
      { q: "What's the difference between AI agents and AI assistants?", a: "AI agents operate autonomously — they perceive, reason, and act to complete tasks without step-by-step guidance. AI assistants are conversational tools that respond to queries and follow instructions." },
      { q: "Can AI agents replace human workers?", a: "AI agents automate specific tasks and processes, not entire roles. They handle repetitive, data-intensive work so humans can focus on strategic thinking, creativity, and relationship-building." },
      { q: "How do you ensure AI agents make correct decisions?", a: "We implement guardrails, human-in-the-loop approval for critical actions, logging and audit trails, and continuous monitoring. Agents are designed to escalate uncertainty rather than guess." },
    ],
    "AI Assistants": [
      { q: "What kind of questions can an AI assistant answer?", a: "It answers questions based on the knowledge base and data sources we connect — product information, documentation, policies, FAQs, and internal knowledge. The scope is defined in the design phase." },
      { q: "How accurate are AI assistants?", a: "Accuracy depends on the quality of the knowledge base and the sophistication of the retrieval system. We typically achieve 85-95% accuracy on well-defined topics, with clear escalation paths for uncertain queries." },
      { q: "Can an AI assistant integrate with my existing tools?", a: "Yes. We integrate with Slack, Microsoft Teams, your website, CRM, knowledge bases, and internal tools. The assistant can pull data from multiple sources and trigger actions in connected systems." },
    ],
    "Customer Support Automation": [
      { q: "What percentage of support queries can be automated?", a: "Typically 40-60% of queries can be fully automated, with another 20-30% partially automated using AI-assisted responses. The exact percentage depends on your product complexity and query types." },
      { q: "Will automation hurt customer satisfaction?", a: "When done well, automation improves CSAT by providing instant responses to common queries and faster routing for complex ones. The key is knowing when to escalate to a human." },
      { q: "How do you measure support automation success?", a: "We track deflection rate, first response time, resolution time, CSAT scores for automated vs human interactions, and cost per ticket. The goal is faster, cheaper, and equally or more satisfying support." },
    ],
    "Lead Qualification Automation": [
      { q: "How accurate is AI lead qualification?", a: "AI-powered lead scoring typically achieves 80-90% accuracy in predicting conversion likelihood, compared to 50-60% for rule-based scoring. Accuracy improves over time as the model learns from conversion data." },
      { q: "What data does lead qualification automation need?", a: "It works best with historical conversion data, firmographic data (company size, industry), behavioural data (website visits, content downloads), and engagement data (email opens, meeting attendance)." },
      { q: "How long does it take to see results?", a: "Lead quality improvements are visible immediately. Accurate scoring models typically reach full effectiveness within 2-3 months as they learn from your conversion data." },
    ],
    "Workflow Automation": [
      { q: "What types of workflows can be automated?", a: "Any repetitive, rule-based process involving data entry, approvals, notifications, file transfers, or cross-tool coordination. Common examples include invoice processing, employee onboarding, and lead routing." },
      { q: "Do I need technical skills to manage automated workflows?", a: "Modern automation tools have visual builders that non-technical team members can use. For complex integrations, we handle setup and provide documentation so your team can manage day-to-day operations." },
      { q: "How much time can workflow automation save?", a: "Most teams save 20-40 hours per week per automated process. The ROI on workflow automation is typically realised within 2-4 months of implementation." },
    ],
    "Document Processing": [
      { q: "What types of documents can be processed?", a: "Invoices, purchase orders, contracts, forms, identity documents, reports, medical records, and any structured or semi-structured document. We handle PDFs, images, scanned documents, and digital files." },
      { q: "How accurate is AI document processing?", a: "Accuracy ranges from 85-99% depending on document quality, complexity, and format clarity. For most business documents, accuracy exceeds 95%. Low-confidence results can be routed for human review." },
      { q: "How long does it take to implement document processing?", a: "A standard implementation takes 4-8 weeks including model training on your documents, pipeline setup, validation workflow configuration, and integration with your existing systems." },
    ],
    "Internal Knowledge Assistants": [
      { q: "What sources can the knowledge assistant access?", a: "Any internal source — Notion, Confluence, Google Drive, SharePoint, Slack history, CRM notes, internal wikis, databases, and custom documentation. We index and connect all relevant knowledge." },
      { q: "How do you keep knowledge current?", a: "We set up automated re-indexing schedules, monitor knowledge freshness, and establish processes for knowledge owners to review and update content. Stale or conflicting information is flagged." },
      { q: "Can the assistant access confidential information?", a: "Yes, with proper authentication and permissions. We implement role-based access control so the assistant only surfaces information the user is authorised to see." },
    ],
    "Sales Follow-Up Automation": [
      { q: "How many follow-up touches should I have?", a: "Data shows 5-12 touchpoints across multiple channels (email, phone, LinkedIn, SMS) over 2-4 weeks produces the best conversion rates. We design sequences based on your industry and audience." },
      { q: "Will automated follow-ups feel impersonal?", a: "Not if done right. We use personalisation tokens, behavioural triggers, and dynamic content to make every message feel relevant. Good automation feels attentive, not robotic." },
      { q: "What metrics do you track for follow-up automation?", a: "Open rates, reply rates, meeting booking rates, unsubscribe rates, and most importantly — conversion from lead to opportunity to customer. We optimise every metric in the sequence." },
    ],
    "Marketing Automation": [
      { q: "Which marketing platform do you recommend?", a: "HubSpot for mid-market and enterprise, ActiveCampaign for small businesses, Marketo for complex B2B needs, or Klaviyo for e-commerce. We recommend based on your goals, team size, and budget." },
      { q: "How do you personalise automated marketing?", a: "We use behavioural triggers, segmentation, dynamic content, personalisation tokens, and AI-powered product recommendations. Every message is tailored to where the contact is in their journey." },
      { q: "What's the typical ROI of marketing automation?", a: "Marketing automation typically delivers 3-5x ROI within the first year through increased lead conversion, higher customer lifetime value, and significant time savings for your marketing team." },
    ],
    "AI Integration": [
      { q: "What AI capabilities can be integrated?", a: "Text (GPT, Claude, Llama), vision (image recognition, OCR), speech (transcription, text-to-speech), recommendations, search, classification, and more. We match capabilities to your use cases." },
      { q: "How complex is AI integration?", a: "It ranges from simple API calls (days) to complex custom model deployment and fine-tuning (weeks). We scope the integration based on your requirements and existing infrastructure." },
      { q: "Do I need to host my own AI models?", a: "Not necessarily. We use a mix of API-based AI services (OpenAI, Anthropic, Google) for most use cases, and self-hosted models when you need data privacy, customisation, or cost optimisation at scale." },
    ],
    "Voice and Messaging Automation": [
      { q: "What channels can be automated?", a: "Voice calls (inbound and outbound), SMS, WhatsApp, Facebook Messenger, Instagram DMs, Telegram, and web chat. We handle each channel's specific requirements and best practices." },
      { q: "How natural does automated voice sound?", a: "Modern text-to-speech is remarkably natural — indistinguishable from human speech in many cases. We use ElevenLabs, OpenAI, or Google's latest models for the most natural voice quality." },
      { q: "Can voice automation handle complex conversations?", a: "Yes, with proper design. We implement NLP, context management, escalation triggers, and fallback to human agents for situations the automation can't handle. The key is scoping the conversation flow well." },
    ],
    "Internal Business Tools": [
      { q: "What kind of internal tools do you build?", a: "Any tool that streamlines operations — project management dashboards, inventory systems, approval workflows, reporting tools, data entry interfaces, and custom CRMs for specific departments or functions." },
      { q: "How long does it take to build an internal tool?", a: "Simple tools take 4-8 weeks. More complex tools with multiple integrations and workflows take 8-16 weeks. We use agile development to deliver value incrementally." },
      { q: "Can internal tools integrate with our existing software?", a: "Yes. We integrate with your existing tech stack — CRMs, ERPs, communication tools, databases, and APIs. The tool becomes a seamless part of your ecosystem." },
    ],
    "Client Portals": [
      { q: "What features can a client portal include?", a: "Account management, document sharing, ticket submission and tracking, knowledge base, messaging, billing and invoices, analytics dashboards, and CRM integration." },
      { q: "How do you ensure client portal adoption?", a: "We design for simplicity and immediate value — intuitive onboarding, clear benefits, useful default content, and integration with existing workflows clients already use." },
      { q: "Do client portals integrate with existing systems?", a: "Yes. We integrate with CRM (Salesforce, HubSpot), support tools (Zendesk, Intercom), billing systems (Stripe, Chargebee), and other systems your clients need access to." },
    ],
    "Booking Platforms": [
      { q: "What types of booking platforms do you build?", a: "Appointment scheduling, event booking, resource reservation, class or course registration, rental booking, and service-based booking with complex availability rules." },
      { q: "How do you handle cancellations and rescheduling?", a: "We build configurable cancellation policies, automated refund or credit workflows, waitlist management, and rescheduling flows that maintain availability integrity." },
      { q: "Do you integrate with calendar systems?", a: "Yes. We integrate with Google Calendar, Outlook, iCal, and Calendly to sync bookings, prevent double-booking, and send calendar invites to customers." },
    ],
    "Directory Platforms": [
      { q: "What types of directories do you build?", a: "Business directories, professional directories, service provider marketplaces, classifieds, real estate listings, event directories, and membership directories." },
      { q: "How do you handle search and discovery?", a: "We implement full-text search, faceted filtering, geospatial search (near me), category browsing, relevance ranking, and personalised recommendations based on user behaviour." },
      { q: "How do you prevent spam and low-quality listings?", a: "We implement moderation workflows, automated spam detection, user verification, review systems, reputation scoring, and admin tools for manual quality control." },
    ],
    "Dashboards": [
      { q: "What data sources can dashboards connect to?", a: "Any source with an API — Google Analytics, CRM, databases, spreadsheets, social platforms, advertising platforms, payment processors, and custom data sources." },
      { q: "Can dashboards show real-time data?", a: "Yes. We build dashboards with real-time data streams for time-sensitive metrics and scheduled refreshes for historical data. The right approach depends on your use case." },
      { q: "Who should have access to which dashboards?", a: "We design role-based access so each team sees the metrics relevant to them — executives see high-level KPIs, managers see team performance, analysts see detailed data." },
    ],
    "Reporting Systems": [
      { q: "What formats can reports be generated in?", a: "PDF, Excel/CSV, HTML email, Google Sheets, and embedded report views in your application. We deliver reports in the format your stakeholders need." },
      { q: "How frequently can reports be automated?", a: "Any schedule you need — daily, weekly, monthly, quarterly, or triggered by specific events. Reports can be automatically distributed via email, Slack, or stored in a shared location." },
      { q: "Can reporting systems handle complex data transformations?", a: "Yes. We build data pipelines that clean, transform, aggregate, and enrich data from multiple sources before generating reports. Calculations and metrics are consistently defined." },
    ],
    "API Development": [
      { q: "REST or GraphQL — which should I use?", a: "REST is simpler, widely supported, and ideal for most use cases. GraphQL is better when clients need flexible queries, multiple data sources, or real-time subscriptions. We recommend based on your needs." },
      { q: "How do you ensure API security?", a: "We implement authentication (API keys, OAuth 2.0, JWT), rate limiting, input validation, encryption, CORS policies, and regular security audits. APIs are designed with security from the start." },
      { q: "Do you provide API documentation?", a: "Yes. We provide auto-generated OpenAPI/Swagger documentation, interactive API explorers, SDK examples, and comprehensive developer guides." },
    ],
    "Third-Party Integrations": [
      { q: "What third-party systems can you integrate with?", a: "CRMs (Salesforce, HubSpot), ERPs (NetSuite, SAP), marketing platforms (Marketo, HubSpot), payment gateways (Stripe, PayPal), communication tools (Slack, Teams), and virtually any system with an API." },
      { q: "How do you handle API changes from third parties?", a: "We build integrations with version-aware architecture, monitoring for API changes, and automated testing that catches breaking changes before they affect your data flow." },
      { q: "How long does a typical integration take?", a: "Simple integrations with well-documented APIs take 2-4 weeks. Complex integrations with custom data mapping, transformation, and bidirectional sync take 4-8 weeks." },
    ],
    "Data Workflows": [
      { q: "What's the difference between ETL and ELT?", a: "ETL (Extract, Transform, Load) transforms data before loading into the destination. ELT (Extract, Load, Transform) loads raw data first and transforms in the warehouse. We recommend based on your data volume and use case." },
      { q: "How do you ensure data quality in workflows?", a: "We implement validation at every stage — schema validation, data type checks, null handling, duplicate detection, and automated alerts for data quality issues." },
      { q: "Can data workflows run in real-time?", a: "Yes. We build both batch and streaming data pipelines. Batch for scheduled data movement, streaming for real-time data processing (Kafka, Kinesis, or similar)." },
    ],
    "Admin Panels": [
      { q: "What features does a typical admin panel include?", a: "User management, content management, analytics dashboards, order/transaction management, settings and configuration, audit logs, role-based access control, and bulk operations." },
      { q: "How do you handle user roles and permissions?", a: "We design granular role-based access control (RBAC) with configurable permissions per feature, data scope restrictions, and approval workflows for sensitive actions." },
      { q: "Can admin panels be customised per user?", a: "Yes. We build customisable dashboards, saved filters, configurable table views, and personal settings so each admin user can tailor their experience." },
    ],
    "Multi-Tenant Platforms": [
      { q: "What's the difference between shared and isolated tenancy?", a: "Shared tenancy stores all tenant data in the same database with row-level isolation — more cost-effective but less isolated. Isolated tenancy uses separate databases per tenant — more secure but more expensive at scale." },
      { q: "How do you handle tenant onboarding?", a: "We build self-service onboarding flows with automated provisioning of database schemas, custom domain setup, billing plan selection, and initial configuration wizards." },
      { q: "Can tenants customise their platform?", a: "Yes. We build configurable features — branding, custom fields, workflow rules, notification preferences, and user management — that each tenant controls from their admin panel." },
    ],
    "Custom Calculators and Auditing Tools": [
      { q: "What types of calculators do you build?", a: "Pricing calculators, ROI calculators, mortgage or loan calculators, tax calculators, compliance auditing tools, risk assessment tools, quote generators, and industry-specific calculation engines." },
      { q: "How do you ensure calculation accuracy?", a: "We implement thorough unit testing, edge case handling, manual validation against known results, and audit logging of every calculation for traceability." },
      { q: "Can tools save and compare scenarios?", a: "Yes. We build scenario saving, comparison views, history tracking, and export capabilities so users can save calculations, compare different inputs, and share results." },
    ],
    "Dashboard Development": [
      { q: "What's the difference between a dashboard and a report?", a: "Dashboards are interactive, real-time views designed for monitoring and exploration. Reports are structured, scheduled documents designed for analysis and distribution. We build both depending on your needs." },
      { q: "Can dashboards show real-time data?", a: "Yes. We build dashboards with real-time data streams for time-sensitive metrics and scheduled refreshes for historical data. The right approach depends on your use case." },
      { q: "What data sources can be connected to a dashboard?", a: "Any source with an API — Google Analytics, CRM, databases, spreadsheets, social platforms, advertising platforms, payment processors, and custom data sources." },
    ],
    "Search Console Reporting": [
      { q: "Why do I need a separate Search Console report?", a: "Search Console data is often underutilised. A dedicated report surfaces trends, opportunities, and issues that are hard to spot in the console itself — and combines it with other data for richer insights." },
      { q: "What metrics should I track in Search Console?", a: "Impressions, clicks, CTR, average position, query trends, page-level performance, country breakdowns, device performance, and Core Web Vitals from the Search Console dataset." },
      { q: "How often should Search Console reports be reviewed?", a: "Weekly for active SEO monitoring, monthly for trend analysis. We also set up alerts for significant drops in impressions or clicks that need immediate attention." },
    ],
    "Advertising Reporting": [
      { q: "Why consolidate advertising reporting across platforms?", a: "Each platform reports metrics differently. Consolidated reporting gives you a single source of truth for true campaign performance, consistent ROAS calculation, and cross-channel optimisation." },
      { q: "How do you handle discrepancies between platform reports?", a: "We establish consistent attribution rules, use platform APIs for direct data, and document any methodology differences. We can reconcile discrepancies and explain variance." },
      { q: "What metrics matter most for advertising reporting?", a: "Cost, impressions, clicks, conversions, CPA, ROAS, impression share, click-through rate, and assisted conversions. The right metrics depend on your campaign objectives." },
    ],
    "Lead Attribution": [
      { q: "Why is lead attribution important?", a: "Without attribution, you don't know which channels actually drive conversions. Attribution reveals the real ROI of every marketing investment and tells you where to allocate budget for maximum impact." },
      { q: "Which attribution model should I use?", a: "It depends on your sales cycle and goals. Data-driven attribution (Google's model) works well for most. Multi-touch models are better for longer sales cycles. We recommend based on your data and objectives." },
      { q: "How long does it take to set up attribution?", a: "Basic attribution setup takes 2-4 weeks. More sophisticated models with offline conversion data and CRM integration take 4-8 weeks. Accuracy improves over time as more data accumulates." },
    ],
    "Data Warehousing": [
      { q: "Do I need a data warehouse?", a: "If you have multiple data sources and need to run cross-source queries, generate consolidated reports, or perform advanced analytics, a data warehouse is essential. It becomes more valuable as your data grows." },
      { q: "What's the difference between a data warehouse and a database?", a: "Databases are optimised for transaction processing (OLTP) — storing and retrieving individual records. Data warehouses are optimised for analytical processing (OLAP) — aggregating and querying large volumes of data across sources." },
      { q: "Which data warehouse should I use?", a: "We recommend based on your needs: BigQuery for Google Cloud users, Snowflake for flexibility and performance, Redshift for AWS ecosystems, and Postgres-based solutions for smaller-scale needs." },
    ],
    "Marketing Performance Dashboards": [
      { q: "What's the difference between a marketing dashboard and a regular dashboard?", a: "Marketing dashboards are designed specifically for marketing KPIs — cost per lead, ROAS, funnel conversion rates, channel performance — and typically integrate data from analytics, ads, CRM, and email platforms." },
      { q: "How often should marketing dashboards update?", a: "We recommend daily refreshes for active campaigns and weekly for strategic metrics. Real-time updates are available for time-sensitive metrics like ad spend and conversions." },
      { q: "Who should use marketing dashboards?", a: "Marketing teams for day-to-day optimisation, marketing leadership for performance reviews, and executives for understanding marketing's contribution to revenue." },
    ],
    "Custom KPI Reporting": [
      { q: "What makes a good KPI report?", a: "Clear alignment with business goals, consistent definitions, appropriate visualisation, actionable insights alongside raw data, and regular delivery to the right stakeholders." },
      { q: "How many KPIs should a report include?", a: "We recommend 5-10 core KPIs per report — enough to tell the story without overwhelming. Additional metrics can be available through drill-downs or secondary reports." },
      { q: "Can reports be delivered automatically?", a: "Yes. We build automated reports that are generated and delivered on any schedule — daily, weekly, monthly — via email, Slack, or stored in a shared location." },
    ],
    "Data Quality Audits": [
      { q: "How do you measure data quality?", a: "We assess five dimensions: accuracy (is it correct?), completeness (is it all there?), consistency (is it the same across sources?), timeliness (is it current?), and validity (does it meet defined rules?)." },
      { q: "How often should data quality be audited?", a: "We recommend an initial comprehensive audit, then quarterly spot checks and continuous monitoring through automated quality checks. High-volume or critical data may need more frequent attention." },
      { q: "What causes poor data quality?", a: "Common causes include manual data entry errors, system migration issues, lack of validation rules, inconsistent formats across sources, API changes, and data decay (e.g., outdated contact information)." },
    ],
  };
  return faqs[name] || [
    { q: `What is ${name.toLowerCase()}?`, a: `${name} is a service that helps businesses improve their digital performance through proven strategies and expert execution. We tailor every approach to your specific goals and market conditions.` },
    { q: `How long does it take to see results?`, a: `Timelines vary based on your starting point and project scope. Most clients see measurable improvements within 60-90 days of implementation. We provide regular progress reporting.` },
    { q: `Do you work with businesses in my industry?`, a: `We work across healthcare, technology, e-commerce, professional services, real estate, and more. Our team adapts strategies to your specific market dynamics and competitive landscape.` },
  ];
}

const eased = { duration: 0.7, ease: [0.32, 0.72, 0, 1] as const };
const fadeUp = { initial: { y: 32, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: "-60px" as const } };

function SectionHeader({ label, title, accent }: { label: string; title: string; accent: string }) {
  return (
    <motion.div {...fadeUp} transition={eased} className="max-w-2xl mb-14">
      <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block">{label}</span>
      <h2 className="font-display font-semibold text-[clamp(2rem,3.5vw,2.8rem)] tracking-[-0.025em] leading-[1.05] text-text-primary">
        {title} <span className="text-accent">{accent}</span>
      </h2>
    </motion.div>
  );
}

function ProcessGrid({ steps }: { steps: { step: string; title: string; desc: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {steps.map((step) => (
        <motion.div key={step.step} {...fadeUp} transition={eased} className="double-bezel group">
          <div className="double-bezel-inner p-6 lg:p-8 group-hover:bg-surface-alt transition-all duration-500">
            <span className="font-display text-2xl font-semibold text-accent mb-3 block">{step.step}</span>
            <h3 className="font-display text-base font-medium text-text-primary mb-2">{step.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function DeliverablesList({ items }: { items: string[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
      {items.map((item) => (
        <motion.div key={item} {...fadeUp} transition={eased} className="flex items-start gap-3">
          <Check size={16} className="text-accent mt-1 shrink-0" weight="bold" />
          <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
        </motion.div>
      ))}
    </div>
  );
}

function FaqSection({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="max-w-3xl space-y-3">
      {items.map((item) => (
        <motion.div key={item.q} {...fadeUp} transition={eased} className="double-bezel group">
          <div className="double-bezel-inner px-6 py-5 group-hover:bg-surface-alt transition-all duration-500">
            <h3 className="font-display text-base font-medium text-text-primary mb-2">{item.q}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{item.a}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── LAYOUT: Strategy & Consulting ── */
function StrategyLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Timeline</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">60</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">days to strategy</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Avg ROI</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">312%</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">organic lift</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Target size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Starting Point</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span>Audit</span>
                  <span className="text-accent/40">→</span>
                  <span>Strategy</span>
                  <span className="text-accent/40">→</span>
                  <span>Roadmap</span>
                  <span className="text-accent/40">→</span>
                  <span>Execute</span>
                  <span className="text-accent/40">→</span>
                  <span>Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="approach." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Technical & Diagnostic ── */
function TechnicalLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  const auditAreas = [
    { icon: MagnifyingGlass, label: "Crawlability", desc: " robots.txt, sitemaps, redirect chains, orphan pages" },
    { icon: Database, label: "Indexation", desc: "Canonicals, noindex, duplicate content, coverage" },
    { icon: Rocket, label: "Core Web Vitals", desc: "LCP, INP, CLS, FID — lab and field data" },
    { icon: SealCheck, label: "Schema & Markup", desc: "Structured data, validation, rich result eligibility" },
    { icon: Gear, label: "Server Config", desc: "HSTS, caching, CDN, compression, security headers" },
    { icon: Graph, label: "Performance", desc: "Page weight, render blocking, JS/CSS optimisation" },
  ];

  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-6">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[52ch]">{description}</p>
            </div>
            <div className="hidden lg:block lg:col-span-5 lg:col-start-8">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5 mb-3">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-3">Common Issues Found</span>
                <div className="space-y-3">
                  <div><span className="text-[12px] font-mono text-text-primary">Broken redirect chains</span><div className="h-1.5 bg-surface rounded-full mt-1"><div className="h-1.5 bg-accent rounded-full" style={{width:"78%"}} /></div></div>
                  <div><span className="text-[12px] font-mono text-text-primary">Missing meta descriptions</span><div className="h-1.5 bg-surface rounded-full mt-1"><div className="h-1.5 bg-accent rounded-full" style={{width:"62%"}} /></div></div>
                  <div><span className="text-[12px] font-mono text-text-primary">Slow LCP (&gt;2.5s)</span><div className="h-1.5 bg-surface rounded-full mt-1"><div className="h-1.5 bg-accent rounded-full" style={{width:"44%"}} /></div></div>
                  <div><span className="text-[12px] font-mono text-text-primary">Missing schema markup</span><div className="h-1.5 bg-surface rounded-full mt-1"><div className="h-1.5 bg-accent rounded-full" style={{width:"71%"}} /></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Audit Areas" title="What we" accent="check." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {auditAreas.map((area) => {
              const AreaIcon = area.icon;
              return (
                <motion.div key={area.label} {...fadeUp} transition={eased} className="double-bezel group">
                  <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                      <AreaIcon size={16} className="text-accent" />
                    </div>
                    <h3 className="font-display text-sm font-medium text-text-primary mb-1.5">{area.label}</h3>
                    <p className="text-[12px] text-text-secondary leading-relaxed">{area.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Process" title="Our diagnostic" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-[#0D0C0B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Content & Editorial ── */
function ContentLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  const contentTypes = [
    { icon: FileText, label: "Blog Posts", desc: "SEO-optimised articles that rank and engage" },
    { icon: BookOpenText, label: "Guides & Whitepapers", desc: "In-depth resources that build authority" },
    { icon: ChartBar, label: "Case Studies", desc: "Proof-focused content that converts" },
    { icon: Sun, label: "Infographics", desc: "Visual assets that earn shares and links" },
  ];

  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              {contentTypes.map((t) => {
                const TIcon = t.icon;
                return (
                  <div key={t.label} className="bg-surface-alt border border-white/5 rounded-2xl p-4">
                    <TIcon size={16} className="text-accent mb-2" />
                    <span className="text-[13px] font-display font-medium text-text-primary block mb-0.5">{t.label}</span>
                    <span className="text-[11px] text-text-secondary leading-snug">{t.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Process" title="Our creation" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Authority & Outreach ── */
function AuthorityLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  const pillars = [
    { icon: ShareNetwork, label: "Link Earning", desc: "Data-driven campaigns that naturally attract high-authority backlinks from relevant publishers" },
    { icon: ChatCircleDots, label: "Media Outreach", desc: "Targeted journalist relationships and personalised pitching for earned media coverage" },
    { icon: SealCheck, label: "Brand Authority", desc: "Trust signals that tell search engines your brand is credible and worth ranking" },
  ];

  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[52ch]">{description}</p>
            </div>
            <div className="hidden lg:block lg:col-span-5 lg:col-start-8">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-4">Authority Score Breakdown</span>
                <div className="space-y-3.5">
                  <div><div className="flex justify-between text-[11px] mb-1"><span className="font-mono text-text-primary">Referring Domains</span><span className="font-mono text-accent">+47</span></div><div className="h-1.5 bg-surface rounded-full"><div className="h-1.5 bg-accent rounded-full" style={{width:"68%"}} /></div></div>
                  <div><div className="flex justify-between text-[11px] mb-1"><span className="font-mono text-text-primary">Domain Rating</span><span className="font-mono text-accent">62</span></div><div className="h-1.5 bg-surface rounded-full"><div className="h-1.5 bg-accent rounded-full" style={{width:"62%"}} /></div></div>
                  <div><div className="flex justify-between text-[11px] mb-1"><span className="font-mono text-text-primary">Link Velocity</span><span className="font-mono text-accent">+12/mo</span></div><div className="h-1.5 bg-surface rounded-full"><div className="h-1.5 bg-accent rounded-full" style={{width:"45%"}} /></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How We Build Authority" title="Three pillars of" accent="authority." />
          <div className="grid lg:grid-cols-3 gap-4">
            {pillars.map((p) => {
              const PIcon = p.icon;
              return (
                <motion.div key={p.label} {...fadeUp} transition={eased} className="double-bezel group">
                  <div className="double-bezel-inner p-6 group-hover:bg-surface-alt transition-all duration-500">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <PIcon size={18} className="text-accent" />
                    </div>
                    <h3 className="font-display text-base font-medium text-text-primary mb-2">{p.label}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Process" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-[#0D0C0B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Specialized (Local, Ecom, Enterprise, Intl, Reporting) ── */
function SpecializedLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
              <div className="flex flex-wrap gap-3">
                {siblingServices.slice(0, 3).map((s) => (
                  <Link key={s.slug} href={`/${s.slug}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/20 text-[11px] font-mono text-accent/70 hover:bg-accent/10 transition-colors">{s.name}</Link>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Clients</span>
                <span className="text-[32px] font-display font-semibold text-accent leading-none">40+</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Avg Impact</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">2.4x</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">organic traffic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Process" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Default (for non-Search services) ── */
function DefaultLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
            <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.025em] leading-[1] text-text-primary mb-6">{service.name}</h1>
            <p className="text-text-secondary leading-relaxed max-w-[55ch]">{description}</p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
            <motion.div {...fadeUp} transition={eased}>
              <div className="double-bezel">
                <div className="double-bezel-inner p-6 lg:p-8">
                  <Icon size={28} className="text-accent mb-4" />
                  <h2 className="font-display text-xl font-medium text-text-primary mb-3">{pillar.name}</h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">Part of our {pillar.name} pillar. Every service in this category works together as a connected system — not isolated tactics.</p>
                  <Link href="/services" className="inline-flex items-center gap-1 text-xs text-accent hover:brightness-110 transition-all group/link">View all services <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-0.5" /></Link>
                </div>
              </div>
            </motion.div>
            <div className="space-y-4">
              {siblingServices.slice(0, 4).map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner px-5 py-4 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: GEO Core (Generative Engine Optimisation, Answer Engine Optimisation) ── */
function GEOCoreLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">AI Platforms</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">6</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">monitored & optimised</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Citation Lift</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">+240%</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">avg AI brand mentions</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Target size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">GEO Maturity Spectrum</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Aware</span>
                  <span className="text-accent/40">→</span>
                  <span>Visible</span>
                  <span className="text-accent/40">→</span>
                  <span>Cited</span>
                  <span className="text-accent/40">→</span>
                  <span>Authoritative</span>
                  <span className="text-accent/40">→</span>
                  <span>Advocacy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: GEO Audit (AI Search Visibility Audits) ── */
function GEOAuditLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  const auditAreas = [
    { icon: Brain, label: "Entity Recognition", desc: "How well AI platforms identify your brand", val: 42 },
    { icon: Eye, label: "Citation Presence", desc: "Where and how you're cited across platforms", val: 68 },
    { icon: Database, label: "Knowledge Graph", desc: "Schema, Wikidata, and entity connections", val: 35 },
    { icon: FileText, label: "Content Extractability", desc: "How easily AI can parse your content", val: 57 },
    { icon: SealCheck, label: "Authority Signals", desc: "Trust signals AI uses for source selection", val: 44 },
  ];

  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-6">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[52ch]">{description}</p>
            </div>
            <div className="hidden lg:block lg:col-span-5 lg:col-start-8">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-4">Common Issues Found</span>
                <div className="space-y-3">
                  {auditAreas.map((area) => {
                    const AIcon = area.icon;
                    return (
                      <div key={area.label} className="flex items-center gap-2">
                        <AIcon size={12} className="text-accent shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between text-[11px] mb-0.5">
                            <span className="font-mono text-text-primary truncate">{area.label}</span>
                            <span className="font-mono text-accent shrink-0 ml-2">{area.val}%</span>
                          </div>
                          <div className="h-1.5 bg-surface rounded-full">
                            <div className="h-1.5 bg-accent rounded-full" style={{ width: `${area.val}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Audit Areas" title="What we" accent="check." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {auditAreas.map((area) => {
              const AIcon = area.icon;
              return (
                <motion.div key={area.label} {...fadeUp} transition={eased} className="double-bezel group">
                  <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                      <AIcon size={16} className="text-accent" />
                    </div>
                    <h3 className="font-display text-sm font-medium text-text-primary mb-1.5">{area.label}</h3>
                    <p className="text-[12px] text-text-secondary leading-relaxed">{area.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Process" title="Our diagnostic" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-[#0D0C0B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: GEO Structure (Entity Optimisation, Structured Content Planning) ── */
function GEOStructureLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  const structureTypes = [
    { icon: Brain, label: "Entity Schema", desc: "Distinct brand entities with clear attributes and relationships" },
    { icon: ShareNetwork, label: "Relationship Maps", desc: "How your entities connect to each other and the wider web" },
    { icon: Stack, label: "Content Clusters", desc: "Topic-aligned content groups that signal topical authority" },
    { icon: Database, label: "Knowledge Graph", desc: "Structured data integration with Wikidata and Google KG" },
  ];

  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              {structureTypes.map((t) => {
                const TIcon = t.icon;
                return (
                  <div key={t.label} className="bg-surface-alt border border-white/5 rounded-2xl p-4">
                    <TIcon size={16} className="text-accent mb-2" />
                    <span className="text-[13px] font-display font-medium text-text-primary block mb-0.5">{t.label}</span>
                    <span className="text-[11px] text-text-secondary leading-snug">{t.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Process" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: GEO Authority (Brand Citation Readiness) ── */
function GEOAuthorityLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[52ch]">{description}</p>
            </div>
            <div className="hidden lg:block lg:col-span-5 lg:col-start-8">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-4">Citation Readiness Score</span>
                <div className="space-y-3.5">
                  <div><div className="flex justify-between text-[11px] mb-1"><span className="font-mono text-text-primary">Citation Coverage</span><span className="font-mono text-accent">64%</span></div><div className="h-1.5 bg-surface rounded-full"><div className="h-1.5 bg-accent rounded-full" style={{width:"64%"}} /></div></div>
                  <div><div className="flex justify-between text-[11px] mb-1"><span className="font-mono text-text-primary">NAP Consistency</span><span className="font-mono text-accent">82%</span></div><div className="h-1.5 bg-surface rounded-full"><div className="h-1.5 bg-accent rounded-full" style={{width:"82%"}} /></div></div>
                  <div><div className="flex justify-between text-[11px] mb-1"><span className="font-mono text-text-primary">Entity Signals</span><span className="font-mono text-accent">47%</span></div><div className="h-1.5 bg-surface rounded-full"><div className="h-1.5 bg-accent rounded-full" style={{width:"47%"}} /></div></div>
                  <div><div className="flex justify-between text-[11px] mb-1"><span className="font-mono text-text-primary">Brand Mentions</span><span className="font-mono text-accent">58%</span></div><div className="h-1.5 bg-surface rounded-full"><div className="h-1.5 bg-accent rounded-full" style={{width:"58%"}} /></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: PR Campaign (Digital PR, Link-Earning Campaigns) ── */
function PRCampaignLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Avg Coverage</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">21</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">tier-1 placements per campaign</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Domain Rating</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">+18</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">avg authority growth</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Target size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Campaign Lifecycle</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Research</span>
                  <span className="text-accent/40">→</span>
                  <span>Create</span>
                  <span className="text-accent/40">→</span>
                  <span>Pitch</span>
                  <span className="text-accent/40">→</span>
                  <span>Publish</span>
                  <span className="text-accent/40">→</span>
                  <span>Measure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: PR Media (Press Release Strategy, Media Outreach, Journalist Research) ── */
function PRMediaLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Journalists</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">280+</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">targeted per campaign</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Response Rate</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">34%</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">avg pitch response</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Target size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Outreach Flow</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Research</span>
                  <span className="text-accent/40">→</span>
                  <span>Personalise</span>
                  <span className="text-accent/40">→</span>
                  <span>Reach Out</span>
                  <span className="text-accent/40">→</span>
                  <span>Follow Up</span>
                  <span className="text-accent/40">→</span>
                  <span>Nurture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: PR Positioning (Founder Positioning, Thought Leadership, Brand Mentions) ── */
function PRPositioningLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  const contentTypes = [
    { icon: BookOpenText, label: "Byline Articles", desc: "Authored pieces in tier-1 publications" },
    { icon: Microphone, label: "Speaking & Podcasts", desc: "Conference keynotes and podcast appearances" },
    { icon: ChatCircleDots, label: "Media Quotes", desc: "Expert commentary in news coverage" },
    { icon: Graph, label: "Social Authority", desc: "Platform-optimised thought leadership" },
  ];

  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              {contentTypes.map((t) => {
                const TIcon = t.icon;
                return (
                  <div key={t.label} className="bg-surface-alt border border-white/5 rounded-2xl p-4">
                    <TIcon size={16} className="text-accent mb-2" />
                    <span className="text-[13px] font-display font-medium text-text-primary block mb-0.5">{t.label}</span>
                    <span className="text-[11px] text-text-secondary leading-snug">{t.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: PR Reputation (Reputation Management, Crisis Comms, Awards, PR Measurement) ── */
function PRReputationLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-6">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[52ch]">{description}</p>
            </div>
            <div className="hidden lg:block lg:col-span-5 lg:col-start-8">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-4">Reputation Health Score</span>
                <div className="space-y-3.5">
                  <div><div className="flex justify-between text-[11px] mb-1"><span className="font-mono text-text-primary">Sentiment Score</span><span className="font-mono text-accent">74%</span></div><div className="h-1.5 bg-surface rounded-full"><div className="h-1.5 bg-accent rounded-full" style={{width:"74%"}} /></div></div>
                  <div><div className="flex justify-between text-[11px] mb-1"><span className="font-mono text-text-primary">Coverage Quality</span><span className="font-mono text-accent">68%</span></div><div className="h-1.5 bg-surface rounded-full"><div className="h-1.5 bg-accent rounded-full" style={{width:"68%"}} /></div></div>
                  <div><div className="flex justify-between text-[11px] mb-1"><span className="font-mono text-text-primary">Response Readiness</span><span className="font-mono text-accent">42%</span></div><div className="h-1.5 bg-surface rounded-full"><div className="h-1.5 bg-accent rounded-full" style={{width:"42%"}} /></div></div>
                  <div><div className="flex justify-between text-[11px] mb-1"><span className="font-mono text-text-primary">Brand Trust Index</span><span className="font-mono text-accent">56%</span></div><div className="h-1.5 bg-surface rounded-full"><div className="h-1.5 bg-accent rounded-full" style={{width:"56%"}} /></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Paid Search (Google Ads, PPC Management, Search Advertising) ── */
function PaidSearchLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Avg ROAS</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">4.2<span className="text-[16px]">x</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">across managed accounts</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Avg CPC</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">$1.85</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">across all industries</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Lightning size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Auction Insights</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Impressions</span>
                  <span className="text-accent/40">→</span>
                  <span>Clicks</span>
                  <span className="text-accent/40">→</span>
                  <span>Conversions</span>
                  <span className="text-accent/40">→</span>
                  <span>Revenue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Paid Display (Display Advertising, Remarketing, Paid Social) ── */
function PaidDisplayLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Avg CTR</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">2.8<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">display & social campaigns</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Avg ROAS</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">3.6<span className="text-[16px]">x</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">retargeting & social</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Target size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Audience Funnel</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Awareness</span>
                  <span className="text-accent/40">→</span>
                  <span>Consideration</span>
                  <span className="text-accent/40">→</span>
                  <span>Conversion</span>
                  <span className="text-accent/40">→</span>
                  <span>Retention</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Paid Strategy (Media Planning, Campaign Auditing, Budget Planning) ── */
function PaidStrategyLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Budget Efficiency</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">+35<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">avg improvement from planning</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Audit Coverage</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">12+</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">platforms & channels</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <ChartDonut size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Allocation Process</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Research</span>
                  <span className="text-accent/40">→</span>
                  <span>Plan</span>
                  <span className="text-accent/40">→</span>
                  <span>Allocate</span>
                  <span className="text-accent/40">→</span>
                  <span>Monitor</span>
                  <span className="text-accent/40">→</span>
                  <span>Reallocate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Paid Optimisation (Landing Page Optimisation, Conversion Tracking, Creative Testing) ── */
function PaidOptimisationLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Conversion Lift</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">+65<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">avg from optimisation work</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Testing Velocity</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">4<span className="text-[16px]">x</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">more tests per quarter</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <ArrowsClockwise size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Optimisation Cycle</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Audit</span>
                  <span className="text-accent/40">→</span>
                  <span>Hypothesis</span>
                  <span className="text-accent/40">→</span>
                  <span>Test</span>
                  <span className="text-accent/40">→</span>
                  <span>Learn</span>
                  <span className="text-accent/40">→</span>
                  <span>Implement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Social Strategy (Social Media Strategy, Social Media Management, Social Campaigns) ── */
function SocialStrategyLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Avg Engagement</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">4.7<span className="text-[16px]">x</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">industry benchmark increase</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Audience Growth</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">+215<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">avg follower growth per year</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <ShareNetwork size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Campaign Funnel</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Awareness</span>
                  <span className="text-accent/40">→</span>
                  <span>Consideration</span>
                  <span className="text-accent/40">→</span>
                  <span>Conversion</span>
                  <span className="text-accent/40">→</span>
                  <span>Advocacy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Content Create (Content Production, Social Content, Video and Motion) ── */
function ContentCreateLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Content Output</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">40+</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">assets produced per month</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Format Reach</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">5+</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">content formats per campaign</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <PencilCircle size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Production Workflow</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Brief</span>
                  <span className="text-accent/40">→</span>
                  <span>Create</span>
                  <span className="text-accent/40">→</span>
                  <span>Review</span>
                  <span className="text-accent/40">→</span>
                  <span>Publish</span>
                  <span className="text-accent/40">→</span>
                  <span>Measure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Brand Messaging (Brand Messaging, Campaign Creative, Copywriting) ── */
function BrandMessagingLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Brand Recall</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">+62<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">improvement with strong messaging</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Creative Velocity</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">3.5<span className="text-[16px]">x</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">faster campaign turnaround</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Compass size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Creative Process</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Discover</span>
                  <span className="text-accent/40">→</span>
                  <span>Define</span>
                  <span className="text-accent/40">→</span>
                  <span>Develop</span>
                  <span className="text-accent/40">→</span>
                  <span>Deliver</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Email Systems (Email Marketing, Content Systems) ── */
function EmailSystemsLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Avg ROI</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">$36</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">per $1 spent on email</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Efficiency Gain</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">+40<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">faster with content systems</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Gear size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">System Architecture</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Audit</span>
                  <span className="text-accent/40">→</span>
                  <span>Design</span>
                  <span className="text-accent/40">→</span>
                  <span>Build</span>
                  <span className="text-accent/40">→</span>
                  <span>Launch</span>
                  <span className="text-accent/40">→</span>
                  <span>Optimise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Website Dev (Next.js, Corporate, Marketing, Landing Pages) ── */
function WebsiteDevLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Avg Load Time</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">1.2<span className="text-[16px]">s</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">LCP across built sites</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Pages Built</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">200+</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">websites and landing pages</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Code size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Build Pipeline</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Spec</span>
                  <span className="text-accent/40">→</span>
                  <span>Design</span>
                  <span className="text-accent/40">→</span>
                  <span>Develop</span>
                  <span className="text-accent/40">→</span>
                  <span>Test</span>
                  <span className="text-accent/40">→</span>
                  <span>Deploy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Ecom CMS (E-commerce, WordPress, Headless CMS) ── */
function EcomCmsLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Avg Conv. Rate</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">3.8<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">across e-commerce builds</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">CMS Platforms</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">6+</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">supported platforms</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <ShoppingCart size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Platform Lifecycle</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Select</span>
                  <span className="text-accent/40">→</span>
                  <span>Build</span>
                  <span className="text-accent/40">→</span>
                  <span>Launch</span>
                  <span className="text-accent/40">→</span>
                  <span>Sell</span>
                  <span className="text-accent/40">→</span>
                  <span>Scale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: UX App (UI/UX Design, Web Applications, Customer Portals, Mobile Apps) ── */
function UXAppLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Usability Score</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">89</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">avg SUS after redesigned</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">User Adoption</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">+73<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">increase after launch</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <MagnifyingGlass size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Product Lifecycle</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Research</span>
                  <span className="text-accent/40">→</span>
                  <span>Design</span>
                  <span className="text-accent/40">→</span>
                  <span>Build</span>
                  <span className="text-accent/40">→</span>
                  <span>Launch</span>
                  <span className="text-accent/40">→</span>
                  <span>Iterate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Perf Access (Performance Optimisation, Accessibility Improvement) ── */
function PerfAccessLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Speed Improvement</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">+54<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">avg load time reduction</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">WCAG Coverage</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">AA</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">compliant remediation</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Rocket size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Improvement Cycle</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Audit</span>
                  <span className="text-accent/40">→</span>
                  <span>Prioritise</span>
                  <span className="text-accent/40">→</span>
                  <span>Fix</span>
                  <span className="text-accent/40">→</span>
                  <span>Verify</span>
                  <span className="text-accent/40">→</span>
                  <span>Monitor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: AI Strategy (AI Strategy, AI Readiness Audits, AI Integration) ── */
function AIStrategyLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Avg Efficiency</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">+40<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">process improvement with AI</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Quick Wins</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">3-5</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">high-impact AI opportunities</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Lightning size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Adoption Cycle</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Assess</span>
                  <span className="text-accent/40">→</span>
                  <span>Plan</span>
                  <span className="text-accent/40">→</span>
                  <span>Pilot</span>
                  <span className="text-accent/40">→</span>
                  <span>Scale</span>
                  <span className="text-accent/40">→</span>
                  <span>Monitor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: AI Agents & Assistants (AI Agents, AI Assistants, Internal Knowledge Assistants, Voice and Messaging Automation) ── */
function AIAgentsLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Automation Rate</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">85<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">avg query resolution rate</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Response Time</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">&lt;3<span className="text-[16px]">s</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">avg AI assistant response</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Robot size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Agent Lifecycle</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Define</span>
                  <span className="text-accent/40">→</span>
                  <span>Train</span>
                  <span className="text-accent/40">→</span>
                  <span>Deploy</span>
                  <span className="text-accent/40">→</span>
                  <span>Monitor</span>
                  <span className="text-accent/40">→</span>
                  <span>Improve</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: AI Automation (Customer Support, Lead Qual, Sales Follow-Up, Marketing) ── */
function AIAutomationLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Time Saved</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">30+</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">hours per week per process</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Conversion Lift</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">+35<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">with automated follow-up</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <ArrowsClockwise size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Automation Flow</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Trigger</span>
                  <span className="text-accent/40">→</span>
                  <span>Process</span>
                  <span className="text-accent/40">→</span>
                  <span>Qualify</span>
                  <span className="text-accent/40">→</span>
                  <span>Route</span>
                  <span className="text-accent/40">→</span>
                  <span>Follow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: AI Workflow (Workflow Automation, Document Processing) ── */
function AIWorkflowLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Accuracy Rate</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">95<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">document processing accuracy</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">ROI Timeline</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">2-4</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">months to payback</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Gear size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Pipeline Stages</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Input</span>
                  <span className="text-accent/40">→</span>
                  <span>Process</span>
                  <span className="text-accent/40">→</span>
                  <span>Validate</span>
                  <span className="text-accent/40">→</span>
                  <span>Output</span>
                  <span className="text-accent/40">→</span>
                  <span>Monitor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Software Dev (Custom CRM, SaaS, Internal Tools, Client Portals) ── */
function SoftwareDevLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Delivery Rate</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">95<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">on-time project delivery</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Team Size</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">2-8</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">dedicated per project</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Code size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Development Cycle</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Spec</span>
                  <span className="text-accent/40">→</span>
                  <span>Design</span>
                  <span className="text-accent/40">→</span>
                  <span>Build</span>
                  <span className="text-accent/40">→</span>
                  <span>Test</span>
                  <span className="text-accent/40">→</span>
                  <span>Deploy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Platform Tools (Booking, Directory, Multi-Tenant, Calculators) ── */
function PlatformToolsLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Time to Market</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">8-16</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">weeks typical build</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Platforms Built</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">50+</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">platforms and tools</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Stack size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Platform Lifecycle</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Idea</span>
                  <span className="text-accent/40">→</span>
                  <span>Build</span>
                  <span className="text-accent/40">→</span>
                  <span>Launch</span>
                  <span className="text-accent/40">→</span>
                  <span>Grow</span>
                  <span className="text-accent/40">→</span>
                  <span>Scale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Dashboards & Reporting (Dashboards, Reporting Systems, Admin Panels, Data Workflows) ── */
function DashboardsLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Data Sources</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">10+</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">integrated per system</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Time Saved</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">20+</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">hours per week on reporting</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <ChartBar size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Data Pipeline</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Collect</span>
                  <span className="text-accent/40">→</span>
                  <span>Transform</span>
                  <span className="text-accent/40">→</span>
                  <span>Visualise</span>
                  <span className="text-accent/40">→</span>
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: API & Integrations (API Development, Third-Party Integrations) ── */
function APIIntegrationsLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Uptime</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">99.9<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">API availability SLA</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Integrations</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">30+</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">platforms connected</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <ArrowsClockwise size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Integration Flow</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Connect</span>
                  <span className="text-accent/40">→</span>
                  <span>Map</span>
                  <span className="text-accent/40">→</span>
                  <span>Sync</span>
                  <span className="text-accent/40">→</span>
                  <span>Validate</span>
                  <span className="text-accent/40">→</span>
                  <span>Monitor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Analytics Setup (Analytics Setup, GA4 Support, Search Console Reporting) ── */
function AnalyticsSetupLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Data Accuracy</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">98<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">post-implementation</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Setup Time</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">2-4</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">weeks to full deployment</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <ChartBar size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Analytics Pipeline</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Collect</span>
                  <span className="text-accent/40">→</span>
                  <span>Validate</span>
                  <span className="text-accent/40">→</span>
                  <span>Report</span>
                  <span className="text-accent/40">→</span>
                  <span>Optimise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Dashboards & Reporting (Dashboard Development, Marketing Performance Dashboards, Custom KPI Reporting) ── */
function DataDashboardsLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Data Sources</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">12+</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">integrated per dashboard</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Report Automation</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">20+</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">hours saved per week</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <ChartLineUp size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Data Pipeline</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Source</span>
                  <span className="text-accent/40">→</span>
                  <span>Model</span>
                  <span className="text-accent/40">→</span>
                  <span>Visualise</span>
                  <span className="text-accent/40">→</span>
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Data Attribution (Conversion Tracking, Lead Attribution, Data Warehousing) ── */
function DataAttributionLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Data Accuracy</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">99<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">tracking reliability</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Attribution Clarity</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">100<span className="text-[16px]">%</span></span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">touchpoint visibility</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Graph size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Data Journey</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Capture</span>
                  <span className="text-accent/40">→</span>
                  <span>Connect</span>
                  <span className="text-accent/40">→</span>
                  <span>Attribute</span>
                  <span className="text-accent/40">→</span>
                  <span>Analyse</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ── LAYOUT: Data Audit (Advertising Reporting, Data Quality Audits) ── */
function DataAuditLayout({ service, pillar, Icon, description, deliverables, faq, process, siblingServices }: LayoutProps) {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-ground overflow-hidden">
        <HeroBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Link href="/services" className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary mb-4 block hover:text-accent transition-colors">{pillar.name}</Link>
              <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.95] text-text-primary mb-6">{service.name}</h1>
              <p className="text-text-secondary leading-relaxed max-w-[55ch] mb-8">{description}</p>
            </div>
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3">
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Data Coverage</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">10+</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">platforms per audit</span>
              </div>
              <div className="bg-surface-alt border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] font-mono text-text-secondary tracking-wider uppercase block mb-1">Issue Discovery</span>
                <span className="text-[28px] font-display font-semibold text-accent leading-none">15-25</span>
                <span className="text-[11px] text-text-secondary font-mono block mt-1">issues identified avg</span>
              </div>
              <div className="col-span-2 bg-surface-alt border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <MagnifyingGlass size={16} className="text-accent" />
                  <span className="text-[11px] font-mono text-accent tracking-wider uppercase">Audit Cycle</span>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-mono text-text-secondary">
                  <span className="text-accent">Audit</span>
                  <span className="text-accent/40">→</span>
                  <span>Analyse</span>
                  <span className="text-accent/40">→</span>
                  <span>Fix</span>
                  <span className="text-accent/40">→</span>
                  <span>Verify</span>
                  <span className="text-accent/40">→</span>
                  <span>Monitor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="How It Works" title="Our" accent="process." />
          <ProcessGrid steps={process} />
        </div>
      </section>

      {siblingServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-ground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title="Related" accent="services." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingServices.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  <motion.div {...fadeUp} transition={eased} className="double-bezel group">
                    <div className="double-bezel-inner p-5 group-hover:bg-surface-alt transition-all duration-500 flex items-center justify-between">
                      <span className="text-sm text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                      <ArrowRight size={14} className="text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-[#0D0C0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Deliverables" title="What you" accent="get." />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Questions we" accent="get asked." />
          <FaqSection items={faq} />
        </div>
      </section>

      <CTA />
    </>
  );
}

interface LayoutProps {
  service: ServiceItem;
  pillar: PillarData;
  Icon: React.ComponentType<any>;
  description: string;
  deliverables: string[];
  faq: { q: string; a: string }[];
  process: { step: string; title: string; desc: string }[];
  siblingServices: ServiceItem[];
}

const searchStrategy = new Set(["seo-strategy", "seo-consulting"]);
const searchTechnical = new Set(["technical-seo", "seo-auditing", "website-migration-seo"]);
const searchContent = new Set(["keyword-research", "content-strategy", "content-development", "on-page-seo"]);
const searchAuthority = new Set(["off-page-seo", "digital-pr-search"]);
const searchSpecialized = new Set(["local-seo", "ecommerce-seo", "enterprise-seo", "international-seo", "search-reporting"]);

const geoCore = new Set(["generative-engine-optimisation", "answer-engine-optimisation"]);
const geoAudit = new Set(["ai-search-visibility-audit"]);
const geoStructure = new Set(["entity-optimisation", "structured-content-planning"]);
const geoAuthority = new Set(["brand-citation-readiness"]);

const prCampaign = new Set(["digital-pr", "link-earning-campaigns"]);
const prMedia = new Set(["press-release-strategy", "media-outreach", "journalist-research"]);
const prPositioning = new Set(["founder-positioning", "thought-leadership", "brand-mentions"]);
const prReputation = new Set(["reputation-management", "crisis-communication", "awards-profile-support", "pr-measurement"]);

const paidSearch = new Set(["google-ads", "ppc-management", "search-advertising"]);
const paidDisplay = new Set(["display-advertising", "remarketing", "paid-social"]);
const paidStrategy = new Set(["media-planning", "campaign-auditing", "budget-planning-paid"]);
const paidOptimisation = new Set(["landing-page-optimisation", "conversion-tracking-paid", "creative-testing"]);

const socialStrategy = new Set(["social-media-strategy", "social-media-management", "social-campaigns"]);
const contentCreate = new Set(["content-production", "social-content", "video-motion"]);
const brandMessaging = new Set(["brand-messaging", "campaign-creative", "copywriting"]);
const emailSystems = new Set(["email-marketing", "content-systems"]);

const websiteDev = new Set(["nextjs-development", "corporate-websites", "marketing-websites", "landing-pages"]);
const ecomCms = new Set(["ecommerce-development", "wordpress-development", "headless-cms-development"]);
const uxApp = new Set(["ui-ux-design", "web-applications", "customer-portals", "mobile-applications"]);
const perfAccess = new Set(["performance-optimisation", "accessibility-improvement"]);

const aiStrategy = new Set(["ai-strategy", "ai-readiness-audit", "ai-integration"]);
const aiAgents = new Set(["ai-agents", "ai-assistants", "internal-knowledge-assistants", "voice-messaging-automation"]);
const aiAutomation = new Set(["customer-support-automation", "lead-qualification-automation", "sales-follow-up-automation", "marketing-automation"]);
const aiWorkflow = new Set(["workflow-automation", "document-processing"]);

const softwareDev = new Set(["custom-crm-development", "saas-development", "internal-business-tools", "client-portals"]);
const platformTools = new Set(["booking-platforms", "directory-platforms", "multi-tenant-platforms", "custom-calculators-tools"]);
const dashboards = new Set(["dashboards", "reporting-systems", "admin-panels", "data-workflows"]);
const apiIntegrations = new Set(["api-development", "third-party-integrations"]);

const analyticsSetup = new Set(["analytics-setup", "ga4-support", "search-console-reporting"]);
const dataDashboards = new Set(["dashboard-development-analytics", "marketing-performance-dashboards", "custom-kpi-reporting"]);
const dataAttribution = new Set(["conversion-tracking", "lead-attribution", "data-warehousing"]);
const dataAudit = new Set(["advertising-reporting", "data-quality-audits"]);

export function ServiceDetailContent({ service, pillar }: { service: ServiceItem; pillar: PillarData }) {
  const Icon = (pillarIcons[pillar.slug] || ChartBar) as React.ComponentType<any>;
  const description = generateDescription(service.name, pillar.name);
  const deliverables = generateDeliverables(service.name);
  const faq = generateFaq(service.name);
  const process = processSteps[service.name] || processSteps[pillar.name] || processSteps["Search & Organic Growth"];
  const siblingServices = pillar.services.filter((s) => s.slug !== service.slug);

  const layoutProps: LayoutProps = { service, pillar, Icon, description, deliverables, faq, process, siblingServices };

  if (searchStrategy.has(service.slug)) return <StrategyLayout {...layoutProps} />;
  if (searchTechnical.has(service.slug)) return <TechnicalLayout {...layoutProps} />;
  if (searchContent.has(service.slug)) return <ContentLayout {...layoutProps} />;
  if (searchAuthority.has(service.slug)) return <AuthorityLayout {...layoutProps} />;
  if (searchSpecialized.has(service.slug)) return <SpecializedLayout {...layoutProps} />;

  if (geoCore.has(service.slug)) return <GEOCoreLayout {...layoutProps} />;
  if (geoAudit.has(service.slug)) return <GEOAuditLayout {...layoutProps} />;
  if (geoStructure.has(service.slug)) return <GEOStructureLayout {...layoutProps} />;
  if (geoAuthority.has(service.slug)) return <GEOAuthorityLayout {...layoutProps} />;

  if (prCampaign.has(service.slug)) return <PRCampaignLayout {...layoutProps} />;
  if (prMedia.has(service.slug)) return <PRMediaLayout {...layoutProps} />;
  if (prPositioning.has(service.slug)) return <PRPositioningLayout {...layoutProps} />;
  if (prReputation.has(service.slug)) return <PRReputationLayout {...layoutProps} />;

  if (paidSearch.has(service.slug)) return <PaidSearchLayout {...layoutProps} />;
  if (paidDisplay.has(service.slug)) return <PaidDisplayLayout {...layoutProps} />;
  if (paidStrategy.has(service.slug)) return <PaidStrategyLayout {...layoutProps} />;
  if (paidOptimisation.has(service.slug)) return <PaidOptimisationLayout {...layoutProps} />;

  if (socialStrategy.has(service.slug)) return <SocialStrategyLayout {...layoutProps} />;
  if (contentCreate.has(service.slug)) return <ContentCreateLayout {...layoutProps} />;
  if (brandMessaging.has(service.slug)) return <BrandMessagingLayout {...layoutProps} />;
  if (emailSystems.has(service.slug)) return <EmailSystemsLayout {...layoutProps} />;

  if (websiteDev.has(service.slug)) return <WebsiteDevLayout {...layoutProps} />;
  if (ecomCms.has(service.slug)) return <EcomCmsLayout {...layoutProps} />;
  if (uxApp.has(service.slug)) return <UXAppLayout {...layoutProps} />;
  if (perfAccess.has(service.slug)) return <PerfAccessLayout {...layoutProps} />;

  if (aiStrategy.has(service.slug)) return <AIStrategyLayout {...layoutProps} />;
  if (aiAgents.has(service.slug)) return <AIAgentsLayout {...layoutProps} />;
  if (aiAutomation.has(service.slug)) return <AIAutomationLayout {...layoutProps} />;
  if (aiWorkflow.has(service.slug)) return <AIWorkflowLayout {...layoutProps} />;

  if (softwareDev.has(service.slug)) return <SoftwareDevLayout {...layoutProps} />;
  if (platformTools.has(service.slug)) return <PlatformToolsLayout {...layoutProps} />;
  if (dashboards.has(service.slug)) return <DashboardsLayout {...layoutProps} />;
  if (apiIntegrations.has(service.slug)) return <APIIntegrationsLayout {...layoutProps} />;

  if (analyticsSetup.has(service.slug)) return <AnalyticsSetupLayout {...layoutProps} />;
  if (dataDashboards.has(service.slug)) return <DataDashboardsLayout {...layoutProps} />;
  if (dataAttribution.has(service.slug)) return <DataAttributionLayout {...layoutProps} />;
  if (dataAudit.has(service.slug)) return <DataAuditLayout {...layoutProps} />;

  return <DefaultLayout {...layoutProps} />;
}
