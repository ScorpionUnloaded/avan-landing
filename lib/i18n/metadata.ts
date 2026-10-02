import type { Metadata } from "next";
import { getCopy } from "@/content";
import { isIndexable } from "@/lib/site";
import { defaultLocale, localeMeta, locales, localizedPath, type Locale } from "./config";
import { routeByKey, type RouteKey } from "./routes";

/**
 * One metadata shape for every page: canonical URL, hreflang alternates for
 * every locale plus x-default, Open Graph and Twitter cards that point at the
 * page's own URL, and the indexing policy. Relative URLs resolve against the
 * layout's metadataBase. The Open Graph image comes from each route's
 * opengraph-image file, which Next merges in.
 */
export function buildMetadata({
  locale,
  route,
  title,
  description,
  absoluteTitle = false,
  type = "website",
}: {
  locale: Locale;
  route: RouteKey;
  title: string;
  description: string;
  /** Use the title as-is instead of the "%s · AVAN Group" template. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
}): Metadata {
  const { path } = routeByKey(route);
  const site = getCopy(locale).site;
  const url = localizedPath(locale, path);
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, path)]),
  );
  languages["x-default"] = localizedPath(defaultLocale, path);
  const index = isIndexable();

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}
