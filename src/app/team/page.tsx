import type { Metadata } from "next";
import { TeamContent } from "./TeamContent";

const siteUrl = "https://zon-growth.com";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the people behind ZON — a team of search specialists, AI engineers, software developers, and growth strategists.",
  alternates: { canonical: `${siteUrl}/team` },
  openGraph: {
    title: "Our Team — ZON",
    description:
      "Meet the people behind ZON — a team of search specialists, AI engineers, software developers, and growth strategists.",
    url: `${siteUrl}/team`,
  },
};

export default function TeamPage() {
  return <TeamContent />;
}