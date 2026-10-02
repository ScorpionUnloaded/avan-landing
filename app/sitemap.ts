import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { defaultLocale, locales, localizedPath } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";

const abs = (path: string) => new URL(path, SITE_URL).toString();

/** Every route × locale from the route table, each listing all its language versions. */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) => {
    const languages: Record<string, string> = Object.fromEntries(
      locales.map((l) => [l, abs(localizedPath(l, route.path))]),
    );
    languages["x-default"] = abs(localizedPath(defaultLocale, route.path));
    return locales.map((locale) => ({
      url: abs(localizedPath(locale, route.path)),
      lastModified: new Date(route.lastModified),
      changeFrequency: "yearly" as const,
      priority: locale === defaultLocale ? route.priority : Math.round(route.priority * 90) / 100,
      alternates: { languages },
    }));
  });
}
