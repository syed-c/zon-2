import type { Metadata } from "next";
import { SolutionsContent } from "./SolutionsContent";

const siteUrl = "https://zon-growth.com";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Business solutions from ZON. We combine search, AI, software, and media to solve real business problems — from lead generation to digital product launch.",
  alternates: { canonical: `${siteUrl}/solutions` },
  openGraph: {
    title: "Solutions — ZON",
    description:
      "Business solutions from ZON. We combine search, AI, software, and media to solve real business problems.",
    url: `${siteUrl}/solutions`,
  },
};

export default function SolutionsPage() {
  return <SolutionsContent />;
}
