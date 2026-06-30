"use client";

import { caseStudies } from "@/data/case-studies";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

export default function FeaturedCaseStudy() {
  const study = caseStudies[0];
  return (
    <section className="hp-featured-cs-section">
      <div className="hp-featured-cs-card">
        <div className="hp-featured-cs-content">
          <span className="hp-featured-cs-tag">{study.industry}</span>
          <span className="hp-featured-cs-result">{study.result}</span>
          <p className="hp-featured-cs-desc">{study.description}</p>
          <div className="hp-featured-cs-metrics">
            {study.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="hp-featured-cs-metric">
                <span className="hp-featured-cs-metric-value">{m.value}</span>
                <span className="hp-featured-cs-metric-label">{m.label}</span>
              </div>
            ))}
          </div>
          <Link href={`/${study.slug}`} className="hp-featured-cs-link">
            View case study <ArrowRight size={12} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
