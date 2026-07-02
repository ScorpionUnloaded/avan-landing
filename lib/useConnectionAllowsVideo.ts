"use client";

import { useEffect, useState } from "react";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

/**
 * Gates hero video autoplay on data-saver mode or a slow effective connection
 * (Network Information API — Chromium/Android only; unsupported browsers default
 * to `true`, i.e. progressive enhancement, not a blocking gate). On a false
 * result the CSS `.hero-atmosphere` layer is the designed fallback — no
 * degraded/broken UI, just a lighter one for constrained connections.
 */
export function useConnectionAllowsVideo(): boolean {
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: NetworkInformation };
    const conn = nav.connection;
    if (!conn) return;

    const evaluate = () => {
      const slow = conn.effectiveType === "slow-2g" || conn.effectiveType === "2g";
      setAllowed(!conn.saveData && !slow);
    };
    evaluate();
    conn.addEventListener?.("change", evaluate);
    return () => conn.removeEventListener?.("change", evaluate);
  }, []);

  return allowed;
}
