import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";

const siteUrl = "https://zon-growth.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#080807",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ZON — Growth Through Search, AI & Software",
    template: "%s | ZON",
  },
  description:
    "We combine technical search, AI content systems, and custom software to turn organic traffic into measurable revenue.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "ZON",
    title: "ZON — Growth Through Search, AI & Software",
    description:
      "We combine technical search, AI content systems, and custom software to turn organic traffic into measurable revenue.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "ZON — Growth Through Search, AI & Software",
    description:
      "We combine technical search, AI content systems, and custom software to turn organic traffic into measurable revenue.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZON",
    url: siteUrl,
    description:
      "We combine technical search, AI content systems, and custom software to turn organic traffic into measurable revenue.",
    sameAs: ["https://x.com/zon", "https://linkedin.com/company/zon", "https://youtube.com/@zon"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ZON",
    url: siteUrl,
    description:
      "We combine technical search, AI content systems, and custom software to turn organic traffic into measurable revenue.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-[100dvh] flex flex-col antialiased" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <NoiseOverlay />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
