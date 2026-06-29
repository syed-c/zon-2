import { pillars, type ServiceItem } from "./services";
import { solutions } from "./solutions";
import { industries } from "./industries";
import { toolCategories, type ToolItem } from "./tools";
import { caseStudies, type CaseStudyItem } from "./case-studies";

export interface RelatedLink {
  label: string;
  href: string;
}

export function getRelatedContent(slug: string, type: "service" | "solution" | "industry" | "tool" | "case-study"): {
  solutions: RelatedLink[];
  industries: RelatedLink[];
  services: RelatedLink[];
  tools: RelatedLink[];
  caseStudies: RelatedLink[];
} {
  const result = { solutions: [], industries: [], services: [], tools: [], caseStudies: [] } as any;

  if (type === "service") {
    result.solutions = solutions
      .filter((s) => s.relevantServices.includes(slug))
      .map((s) => ({ label: s.name, href: `/${s.slug}` }));

    result.industries = industries
      .filter((i) => i.relevantServices.includes(slug))
      .map((i) => ({ label: i.name, href: `/${i.slug}` }));

    const pillar = pillars.find((p) => p.services.some((s) => s.slug === slug));
    if (pillar) {
      result.services = pillar.services
        .filter((s) => s.slug !== slug)
        .slice(0, 4)
        .map((s) => ({ label: s.name, href: `/${s.slug}` }));
    }

    result.tools = toolCategories
      .flatMap((c) => c.tools)
      .filter((t) => t.isMvp && !t.slug.endsWith("-checker"))
      .slice(0, 3)
      .map((t) => ({ label: t.name, href: `/${t.slug}` }));
  }

  if (type === "solution") {
    const sol = solutions.find((s) => s.slug === slug);
    if (sol) {
      result.services = sol.relevantServices.slice(0, 4).map((s) => {
        for (const p of pillars) {
          const svc = p.services.find((sv) => sv.slug === s);
          if (svc) return { label: svc.name, href: `/${svc.slug}` };
        }
        return { label: s, href: `/${s}` };
      });

      result.tools = sol.relevantTools.map((t) => {
        const tool = findTool(t);
        return { label: tool?.name || t, href: `/${t}` };
      });
    }

    result.caseStudies = caseStudies
      .filter((cs) => slug.startsWith(cs.industry.toLowerCase().replace(/\s+/g, "-")) || cs.servicesUsed.some((s) => {
        const sol = solutions.find((x) => x.slug === slug);
        return sol?.relevantServices.includes(s);
      }))
      .slice(0, 3)
      .map((cs) => ({ label: cs.client, href: `/${cs.slug}` }));
  }

  if (type === "industry") {
    const ind = industries.find((i) => i.slug === slug);
    if (ind) {
      result.services = ind.relevantServices.slice(0, 4).map((s) => {
        for (const p of pillars) {
          const svc = p.services.find((sv) => sv.slug === s);
          if (svc) return { label: svc.name, href: `/${svc.slug}` };
        }
        return { label: s, href: `/${s}` };
      });

      result.tools = ind.relevantTools.map((t) => {
        const tool = findTool(t);
        return { label: tool?.name || t, href: `/${t}` };
      });
    }

    result.caseStudies = caseStudies
      .filter((cs) => cs.industry.toLowerCase().replace(/\s+/g, "-") === slug || cs.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === slug))
      .slice(0, 3)
      .map((cs) => ({ label: cs.client, href: `/${cs.slug}` }));
  }

  if (type === "tool") {
    const tool = findTool(slug);
    if (tool) {
      const sameCat = findCategory(tool.category);
      if (sameCat) {
        result.tools = sameCat.tools
          .filter((t) => t.slug !== slug)
          .slice(0, 4)
          .map((t) => ({ label: t.name, href: `/${t.slug}` }));
      }

      result.solutions = solutions
        .filter((s) => s.relevantTools.includes(slug))
        .map((s) => ({ label: s.name, href: `/${s.slug}` }));

      result.industries = industries
        .filter((i) => i.relevantTools.includes(slug))
        .map((i) => ({ label: i.name, href: `/${i.slug}` }));
    }
  }

  if (type === "case-study") {
    const cs = caseStudies.find((c) => c.slug === slug);
    if (cs) {
      result.services = cs.servicesUsed.slice(0, 4).map((s) => {
        for (const p of pillars) {
          const svc = p.services.find((sv) => sv.slug === s);
          if (svc) return { label: svc.name, href: `/${svc.slug}` };
        }
        return { label: s, href: `/${s}` };
      });

      result.caseStudies = caseStudies
        .filter((c) => c.slug !== slug && (c.industry === cs.industry || c.category === cs.category))
        .slice(0, 3)
        .map((c) => ({ label: c.client, href: `/${c.slug}` }));
    }
  }

  return result;
}

export function getBreadcrumbs(slug: string, type?: string): { label: string; href: string }[] {
  const crumbs = [{ label: "Home", href: "/" }];

  if (type === "hub") {
    const map: Record<string, string> = {
      services: "Services",
      solutions: "Solutions",
      tools: "Tools",
      industries: "Industries",
      work: "Work",
      about: "About",
      contact: "Contact",
      team: "Team",
      careers: "Careers",
    };
    if (map[slug]) crumbs.push({ label: map[slug], href: `/${slug}` });
    return crumbs;
  }

  if (type === "service" || !type) {
    const found = findServiceInPillars(slug);
    if (found) {
      const pSlug = found.pillarSlug;
      const pName = found.pillarName;
      if (pSlug !== slug) {
        crumbs.push({ label: pName || "Services", href: `/${pSlug}` });
      } else {
        crumbs.push({ label: "Services", href: "/services" });
      }
      crumbs.push({ label: found.serviceName || slug, href: `/${slug}` });
    }
  }

  if (type === "solution") {
    const sol = solutions.find((s) => s.slug === slug);
    crumbs.push({ label: "Solutions", href: "/solutions" });
    crumbs.push({ label: sol?.name || slug, href: `/${slug}` });
  }

  if (type === "industry") {
    const ind = industries.find((i) => i.slug === slug);
    crumbs.push({ label: "Industries", href: "/industries" });
    crumbs.push({ label: ind?.name || slug, href: `/${slug}` });
  }

  if (type === "tool") {
    const tool = findTool(slug);
    crumbs.push({ label: "Tools", href: "/tools" });
    crumbs.push({ label: tool?.name || slug, href: `/${slug}` });
  }

  if (type === "case-study") {
    const cs = caseStudies.find((c) => c.slug === slug);
    crumbs.push({ label: "Work", href: "/work" });
    crumbs.push({ label: cs?.client || slug, href: `/${slug}` });
  }

  return crumbs;
}

export function getTypeForSlug(slug: string): "service" | "solution" | "industry" | "tool" | "case-study" {
  if (findServiceInPillars(slug)) return "service";
  if (solutions.find((s) => s.slug === slug)) return "solution";
  if (industries.find((i) => i.slug === slug)) return "industry";
  if (findTool(slug)) return "tool";
  if (caseStudies.find((c) => c.slug === slug)) return "case-study";
  return "service";
}

function findTool(slug: string): ToolItem | undefined {
  for (const cat of toolCategories) {
    const tool = cat.tools.find((t) => t.slug === slug);
    if (tool) return tool;
  }
  return undefined;
}

function findCategory(name: string) {
  return toolCategories.find((c) => c.name === name);
}

function findServiceInPillars(slug: string): { serviceName: string; pillarName: string; pillarSlug: string } | undefined {
  for (const p of pillars) {
    const s = p.services.find((sv) => sv.slug === slug);
    if (s) {
      const allChildren = p.services.filter((sv) => sv.slug !== slug);
      return {
        serviceName: s.name,
        pillarName: allChildren.length > 0 ? p.name : "Services",
        pillarSlug: allChildren.length > 0 ? p.slug : "services",
      };
    }
  }
  return undefined;
}
