import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const routes = ["", "/pfi", "/legal", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.flatMap((route) => [
    {
      url: `${SITE_URL}${route || "/"}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: route === "" ? 1 : 0.6,
      alternates: {
        languages: {
          en: `${SITE_URL}${route || "/"}`,
          fr: `${SITE_URL}/fr${route}`,
        },
      },
    },
    {
      url: `${SITE_URL}/fr${route}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: route === "" ? 0.9 : 0.5,
      alternates: {
        languages: {
          en: `${SITE_URL}${route || "/"}`,
          fr: `${SITE_URL}/fr${route}`,
        },
      },
    },
  ]);
}
