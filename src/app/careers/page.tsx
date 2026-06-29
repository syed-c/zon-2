import type { Metadata } from "next";
import { CareersContent } from "./CareersContent";

const siteUrl = "https://zon-growth.com";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join ZON and help businesses grow through search, AI, and software. View open positions and learn what it's like to work with us.",
  alternates: { canonical: `${siteUrl}/careers` },
  openGraph: {
    title: "Careers — ZON",
    description:
      "Join ZON and help businesses grow through search, AI, and software. View open positions and learn what it's like to work with us.",
    url: `${siteUrl}/careers`,
  },
};

export default function CareersPage() {
  return <CareersContent />;
}