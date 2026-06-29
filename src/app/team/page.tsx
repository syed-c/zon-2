import type { Metadata } from "next";
import { TeamContent } from "./TeamContent";

export const metadata: Metadata = {
  title: "Our Team — ZON",
  description:
    "Meet the people behind ZON — a team of search specialists, AI engineers, software developers, and growth strategists.",
};

export default function TeamPage() {
  return <TeamContent />;
}
