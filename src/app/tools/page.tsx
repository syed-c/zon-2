import type { Metadata } from "next";
import { ToolsContent } from "./ToolsContent";

const siteUrl = "https://zon-growth.com";

export const metadata: Metadata = {
  title: "Free SEO & Digital Marketing Tools",
  description:
    "Run free SEO audits, GEO readiness checks, schema generators and more. Get actionable results without signing up.",
  alternates: { canonical: `${siteUrl}/tools` },
  openGraph: {
    title: "Free SEO & Digital Marketing Tools — ZON",
    description:
      "Run free SEO audits, GEO readiness checks, schema generators and more. Get actionable results without signing up.",
    url: `${siteUrl}/tools`,
  },
};

export default function ToolsPage() {
  return <ToolsContent />;
}
