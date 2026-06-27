import type { Metadata } from "next";
import { ToolsContent } from "./ToolsContent";

export const metadata: Metadata = {
  title: "Free SEO & Digital Marketing Tools — ZON",
  description:
    "Run free SEO audits, GEO readiness checks, schema generators and more. Get actionable results without signing up.",
};

export default function ToolsPage() {
  return <ToolsContent />;
}
