import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "../../styles/tokens.css";
import "../globals.css";
import { getCopy } from "@/content";
import { SITE_URL } from "@/lib/site";
import { isLocale, locales, homePath, type Locale } from "@/lib/locale";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// Text face. The brand names Suisse Int'l; until it is licensed, Hanken Grotesk
// (variable, OFL) carries every weight through the same --font-text slot, so a
// licensed Suisse drops in by swapping this loader for next/font/local.
const sans = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-text",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
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

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getCopy(locale);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: c.site.name,
    description: c.site.description,
    url: SITE_URL,
    slogan: c.site.motto,
  };

  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
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
