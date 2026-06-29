import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact — ZON",
  description:
    "Get in touch with ZON. Tell us about your growth goals and we'll show you how search, AI and software can help.",
};

export default function ContactPage() {
  return <ContactContent />;
}
