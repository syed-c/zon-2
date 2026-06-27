import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Digital Growth Services — ZON",
  description:
    "From SEO and GEO to AI automation and custom software. ZON offers a full range of digital growth services for ambitious businesses.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
