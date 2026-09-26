"use client";

/**
 * Provider-agnostic analytics shim. Swap the sink for a real provider later
 * (Plausible, PostHog, GA) without touching call sites.
 */
type AvanEvent =
  | "hero_view"
  | "rivers_view"
  | "prive_view"
  | "inquiry_start"
  | "inquiry_submit";

export function track(event: AvanEvent, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { plausible?: (e: string, o?: unknown) => void };
  if (typeof w.plausible === "function") {
    w.plausible(event, props ? { props } : undefined);
    return;
  }
  if (process.env.NODE_ENV !== "production") {
    console.debug("[avan:analytics]", event, props ?? {});
  }
}
