import type { Metadata } from "next";
import { IndustriesContent } from "./IndustriesContent";

export const metadata: Metadata = {
  title: "Industries — ZON",
  description:
    "Industry-specific digital growth solutions from ZON. We help businesses across dental, legal, e-commerce, SaaS, real estate, and more.",
};

export default function IndustriesPage() {
  return <IndustriesContent />;
}
