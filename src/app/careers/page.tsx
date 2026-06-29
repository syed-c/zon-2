import type { Metadata } from "next";
import { CareersContent } from "./CareersContent";

export const metadata: Metadata = {
  title: "Careers — ZON",
  description:
    "Join ZON and help businesses grow through search, AI, and software. View open positions and learn what it's like to work with us.",
};

export default function CareersPage() {
  return <CareersContent />;
}
