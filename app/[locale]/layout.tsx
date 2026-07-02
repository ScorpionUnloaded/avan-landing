import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "../../styles/tokens.css";
import "../globals.css";
import { getCopy } from "@/content";
import { SITE_URL } from "@/lib/site";
import { isLocale, locales, homePath, type Locale } from "@/lib/locale";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// Licensed Suisse Int'l (Regular). 500 maps to the same file to avoid faux-bold
// until a Medium weight is licensed. Self-hosted via next/font/local.
const sans = localFont({
  src: [
    { path: "../fonts/SuisseIntl-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/SuisseIntl-Regular.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-suisse",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const c = getCopy(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: c.site.title, template: `%s · ${c.site.name}` },
    description: c.site.description,
    applicationName: c.site.name,
    alternates: {
      canonical: homePath(locale),
      languages: { en: "/", fr: "/fr" },
    },
    openGraph: {
      type: "website",
      url: homePath(locale),
      siteName: c.site.name,
      title: c.site.title,
      description: c.site.description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: { card: "summary_large_image", title: c.site.title, description: c.site.description },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0E1722",
  colorScheme: "light",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const c = getCopy(params.locale);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: c.site.name,
    description: c.site.description,
    url: SITE_URL,
    slogan: c.site.motto,
  };

  return (
    <html lang={params.locale} className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-cream font-sans text-body text-ftext antialiased">
        <a href="#main" className="skip-link">
          {c.nav.skip}
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
