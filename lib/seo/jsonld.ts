import { getCopy } from "@/content";
import { SITE_URL } from "@/lib/site";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { routeByKey, type RouteKey } from "@/lib/i18n/routes";

/**
 * schema.org graph for a page: the house (Organization, with PFI as its
 * institutional arm), the site, the page itself and, below the home page, its
 * breadcrumb trail. Entities are linked by @id so search engines read one
 * graph rather than disconnected fragments. Only facts the site already
 * states are encoded — no invented addresses, founders or figures.
 */
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

const abs = (path: string) => new URL(path, SITE_URL).toString();

export function pageGraph({
  locale,
  route,
  name,
}: {
  locale: Locale;
  route: RouteKey;
  /** The page's own name, as shown in its <h1> or title. */
  name: string;
}) {
  const c = getCopy(locale);
  const entry = routeByKey(route);
  const url = abs(localizedPath(locale, entry.path));

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: c.site.name,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icons/icon-512.png`, width: 512, height: 512 },
      slogan: c.site.motto,
      description: c.site.description,
      subOrganization: {
        "@type": "Organization",
        name: "PFI · Pro-Finance",
        url: abs(localizedPath(locale, "/pfi")),
      },
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: SITE_URL,
      name: c.site.name,
      inLanguage: locale,
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name,
      inLanguage: locale,
      isPartOf: { "@id": SITE_ID },
      about: { "@id": ORG_ID },
      ...(entry.parent ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    },
  ];

  if (entry.parent) {
    const parent = routeByKey(entry.parent);
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: c.site.name,
          item: abs(localizedPath(locale, parent.path)),
        },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/** JSON for a <script type="application/ld+json">, safe against `</script>` breakout. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
