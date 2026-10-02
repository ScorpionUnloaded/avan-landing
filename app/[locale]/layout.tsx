import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";
import { getCopy } from "@/content";
import { SITE_URL } from "@/lib/site";
import { isLocale, locales, type Locale } from "@/lib/locale";
import { palette, roles } from "@/lib/tokens";
import { themeScript } from "@/lib/theme/script";
import { SiteAnalytics } from "@/components/chrome/SiteAnalytics";

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

/**
 * Site-wide defaults only. Each page supplies its own title, description,
 * canonical URL, alternates and Open Graph data via lib/i18n/metadata.ts;
 * icons and the manifest come from the app/ file conventions.
 */
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
    appleWebApp: { title: c.site.name, statusBarStyle: "black-translucent" },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  // The browser chrome matches the navy hero in both themes.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: palette["ink-900"].hex },
    { media: "(prefers-color-scheme: dark)", color: roles.dark["surface-canvas"] },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getCopy(locale);
  // Per-request nonce from proxy.ts. Reading it renders every page dynamically,
  // which is what lets Next stamp the same nonce on its own scripts.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    // suppressHydrationWarning: the head script sets data-theme/data-js before
    // React hydrates; those two attributes are the only expected difference.
    <html
      lang={locale}
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-canvas font-sans text-body text-fg antialiased">
        <a href="#main" className="skip-link">
          {c.nav.skip}
        </a>
        {children}
        {process.env.VERCEL ? <SiteAnalytics /> : null}
      </body>
    </html>
  );
}
