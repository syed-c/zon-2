import type { Metadata } from "next";
import { SolutionsContent } from "./SolutionsContent";

export const metadata: Metadata = {
  title: "Solutions — ZON",
  description:
    "Business solutions from ZON. We combine search, AI, software, and media to solve real business problems — from lead generation to digital product launch.",
};

export default function SolutionsPage() {
  return <SolutionsContent />;
}
