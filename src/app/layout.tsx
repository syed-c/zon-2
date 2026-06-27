import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";

export const metadata: Metadata = {
  title: "ZON — Growth Through Search, AI & Software",
  description:
    "We combine technical search, AI content systems, and custom software to turn organic traffic into measurable revenue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-[100dvh] flex flex-col antialiased">
        <NoiseOverlay />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
