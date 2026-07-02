"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { track } from "@/lib/analytics";

type Event = Parameters<typeof track>[0];

/** Fires a single analytics event the first time it scrolls into view. Renders nothing visible. */
export function InViewTracker({ event }: { event: Event }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30% 0px" });
  useEffect(() => {
    if (inView) track(event);
  }, [inView, event]);
  return <span ref={ref} aria-hidden className="pointer-events-none block h-0 w-0" />;
}
