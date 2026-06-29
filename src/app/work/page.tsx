import type { Metadata } from "next";
import { WorkContent } from "./WorkContent";

const siteUrl = "https://zon-growth.com";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Case studies and results from real campaigns. See how we've helped businesses grow through search, AI, and software.",
  alternates: { canonical: `${siteUrl}/work` },
  openGraph: {
    title: "Our Work — ZON",
    description:
      "Case studies and results from real campaigns. See how we've helped businesses grow through search, AI, and software.",
    url: `${siteUrl}/work`,
  },
};

export default function WorkPage() {
  return <WorkContent />;
}
