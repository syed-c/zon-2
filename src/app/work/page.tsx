import type { Metadata } from "next";
import { WorkContent } from "./WorkContent";

export const metadata: Metadata = {
  title: "Our Work — ZON",
  description:
    "Case studies and results from real campaigns. See how we've helped businesses grow through search, AI, and software.",
};

export default function WorkPage() {
  return <WorkContent />;
}
