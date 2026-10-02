import type { MetadataRoute } from "next";
import { isIndexable, SITE_URL } from "@/lib/site";

/** Production invites crawling; preview deployments close the door entirely. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
