import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

const siteUrl = "https://zon-growth.com";

export const metadata: Metadata = {
  title: "About",
  description:
    "We're a digital growth platform combining technical search, AI content systems, and custom software to turn traffic into revenue.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About — ZON",
    description:
      "We're a digital growth platform combining technical search, AI content systems, and custom software to turn traffic into revenue.",
    url: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
