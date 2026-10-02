"use client";

import { track as vercelTrack } from "@vercel/analytics";

/** Every custom event the site records. Properties are never personal data. */
export type AvanEvent =
  | "hero_view"
  | "rivers_view"
  | "prive_view"
  | "inquiry_start"
  | "inquiry_submit";

type Props = Record<string, string | number | boolean>;

/**
 * Records a custom event in Vercel Web Analytics (cookieless). Custom events
 * need a Pro plan; without one, or off Vercel, the call is a silent no-op.
 */
export function track(event: AvanEvent, props?: Props) {
  if (typeof window === "undefined") return;
  vercelTrack(event, props);
}
