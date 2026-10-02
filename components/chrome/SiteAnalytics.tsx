"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/** Query strings never leave the browser: they can carry whatever a link added. */
function stripQuery<T extends { url: string }>(event: T): T {
  const url = new URL(event.url);
  url.search = "";
  return { ...event, url: url.toString() };
}

/**
 * Vercel Web Analytics and Speed Insights: cookieless, no consent banner
 * needed, and both scripts load from the site's own origin (/_vercel/*).
 * Rendered only on Vercel, where those endpoints exist.
 */
export function SiteAnalytics() {
  return (
    <>
      <Analytics beforeSend={(e: BeforeSendEvent) => stripQuery(e)} />
      <SpeedInsights beforeSend={(e) => stripQuery(e)} />
    </>
  );
}
