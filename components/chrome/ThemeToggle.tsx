"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { THEME_STORAGE_KEY } from "@/lib/theme/script";

type Choice = "light" | "dark" | "system";
const ORDER: Choice[] = ["system", "light", "dark"];

function read(): Choice {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

const listeners = new Set<() => void>();
function subscribe(fn: () => void) {
  listeners.add(fn);
  const onStorage = (e: StorageEvent) => e.key === THEME_STORAGE_KEY && fn();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

function apply(choice: Choice) {
  const root = document.documentElement;
  try {
    if (choice === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {}
  if (choice === "system") delete root.dataset.theme;
  else root.dataset.theme = choice;
  listeners.forEach((l) => l());
}

/**
 * Light / Dark / System (A5-1 settings pattern). One button cycles the three
 * states; the label always says what the next press does. Server-renders as
 * "system" and picks up the stored choice after hydration without a flash,
 * because the head script has already applied it to <html>.
 */
export function ThemeToggle({
  labels,
  className,
}: {
  labels: { system: string; light: string; dark: string; toggle: string };
  className?: string;
}) {
  const choice = useSyncExternalStore(subscribe, read, () => "system" as Choice);
  const next = ORDER[(ORDER.indexOf(choice) + 1) % ORDER.length];

  return (
    <button
      type="button"
      onClick={() => apply(next)}
      aria-label={`${labels.toggle}: ${labels[choice]}. ${labels[next]}`}
      title={labels[choice]}
      className={cn(
        "inline-flex size-touch items-center justify-center text-current transition-colors duration-fast hover:text-eyebrow",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        {choice === "dark" ? (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
        ) : choice === "light" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 3.5v17a8.5 8.5 0 0 0 0-17Z" fill="currentColor" stroke="none" />
          </>
        )}
      </svg>
    </button>
  );
}
