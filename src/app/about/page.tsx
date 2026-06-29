import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About — ZON",
  description:
    "We're a digital growth platform combining technical search, AI content systems, and custom software to turn traffic into revenue.",
};

export default function AboutPage() {
  return <AboutContent />;
}
