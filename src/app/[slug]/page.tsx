import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceInPillar, getAllServiceSlugs } from "@/data/services";
import { getSolution, getAllSolutionSlugs } from "@/data/solutions";
import { getIndustry, getAllIndustrySlugs } from "@/data/industries";
import { getTool, getAllToolSlugs } from "@/data/tools";
import { getCaseStudy, getAllCaseStudySlugs } from "@/data/case-studies";
import { ServiceDetailContent } from "./ServiceDetail";
import { SolutionDetailContent } from "./SolutionDetail";
import { IndustryDetailContent } from "./IndustryDetail";
import { ToolDetailContent } from "./ToolDetail";
import { CaseStudyDetailContent } from "./CaseStudyDetail";

export async function generateStaticParams() {
  const serviceSlugs = getAllServiceSlugs();
  const solutionSlugs = getAllSolutionSlugs();
  const industrySlugs = getAllIndustrySlugs();
  const toolSlugs = getAllToolSlugs();
  const caseStudySlugs = getAllCaseStudySlugs();
  return [...serviceSlugs, ...solutionSlugs, ...industrySlugs, ...toolSlugs, ...caseStudySlugs].map((slug) => ({ slug }));
}

const siteUrl = "https://zon-growth.com";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceInPillar(slug);
  if (service) {
    return {
      title: `${service.service.name} — ZON Services`,
      description: `${service.service.name} service from ZON. ${service.pillar.name} expertise to help your business grow through search, AI, and software.`,
      alternates: { canonical: `${siteUrl}/${slug}` },
      openGraph: { title: `${service.service.name} — ZON Services`, description: `${service.service.name} service from ZON. ${service.pillar.name} expertise to help your business grow through search, AI, and software.`, url: `${siteUrl}/${slug}` },
    };
  }
  const solution = getSolution(slug);
  if (solution) {
    return {
      title: `${solution.name} — ZON Solutions`,
      description: solution.description,
      alternates: { canonical: `${siteUrl}/${slug}` },
      openGraph: { title: `${solution.name} — ZON Solutions`, description: solution.description, url: `${siteUrl}/${slug}` },
    };
  }
  const industry = getIndustry(slug);
  if (industry) {
    return {
      title: `${industry.name} — ZON Industries`,
      description: industry.shortDesc,
      alternates: { canonical: `${siteUrl}/${slug}` },
      openGraph: { title: `${industry.name} — ZON Industries`, description: industry.shortDesc, url: `${siteUrl}/${slug}` },
    };
  }
  const tool = getTool(slug);
  if (tool) {
    return {
      title: `${tool.name} — ZON Free Tools`,
      description: tool.shortDesc,
      alternates: { canonical: `${siteUrl}/${slug}` },
      openGraph: { title: `${tool.name} — ZON Free Tools`, description: tool.shortDesc, url: `${siteUrl}/${slug}` },
    };
  }
  const caseStudy = getCaseStudy(slug);
  if (caseStudy) {
    return {
      title: `${caseStudy.client} — ZON Case Study`,
      description: caseStudy.description,
      alternates: { canonical: `${siteUrl}/${slug}` },
      openGraph: { title: `${caseStudy.client} — ZON Case Study`, description: caseStudy.description, url: `${siteUrl}/${slug}` },
    };
  }
  return { title: "Not Found" };
}

export default async function SlugPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const service = getServiceInPillar(slug);
  if (service) {
    return <ServiceDetailContent service={service.service} pillar={service.pillar} />;
  }
  const solution = getSolution(slug);
  if (solution) {
    return <SolutionDetailContent solution={solution} />;
  }
  const industry = getIndustry(slug);
  if (industry) {
    return <IndustryDetailContent industry={industry} />;
  }
  const tool = getTool(slug);
  if (tool) {
    return <ToolDetailContent tool={tool} />;
  }
  const caseStudy = getCaseStudy(slug);
  if (caseStudy) {
    return <CaseStudyDetailContent study={caseStudy} />;
  }
  notFound();
}
