import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

const siteUrl = "https://zon-growth.com";

export const metadata: Metadata = {
  title: "Digital Growth Services",
  description:
    "From SEO and GEO to AI automation and custom software. ZON offers a full range of digital growth services for ambitious businesses.",
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: "Digital Growth Services — ZON",
    description:
      "From SEO and GEO to AI automation and custom software. ZON offers a full range of digital growth services for ambitious businesses.",
    url: `${siteUrl}/services`,
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
