import type { Metadata } from "next";
import { IndustriesContent } from "./IndustriesContent";

const siteUrl = "https://zon-growth.com";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Industry-specific digital growth solutions from ZON. We help businesses across dental, legal, e-commerce, SaaS, real estate, and more.",
  alternates: { canonical: `${siteUrl}/industries` },
  openGraph: {
    title: "Industries — ZON",
    description:
      "Industry-specific digital growth solutions from ZON. We help businesses across dental, legal, e-commerce, SaaS, real estate, and more.",
    url: `${siteUrl}/industries`,
  },
};

export default function IndustriesPage() {
  return <IndustriesContent />;
}
