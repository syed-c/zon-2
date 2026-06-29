import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

const siteUrl = "https://zon-growth.com";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ZON. Tell us about your growth goals and we'll show you how search, AI and software can help.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact — ZON",
    description:
      "Get in touch with ZON. Tell us about your growth goals and we'll show you how search, AI and software can help.",
    url: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
