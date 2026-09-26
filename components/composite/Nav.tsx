"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { AvanLockup } from "@/components/brand/AvanLockup";
import { Button } from "@/components/primitives/Button";
import { homePath, type Locale } from "@/lib/locale";
import type { Copy } from "@/content";

/**
 * @param currentPath route path without locale prefix ("" for home, "/pfi", …) —
 * used to build anchor hrefs that work cross-page and the locale-switch link.
 */
export function Nav({
  copy,
  locale,
  currentPath,
}: {
  copy: Copy["nav"];
  locale: Locale;
  currentPath: string;
}) {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const home = homePath(locale);
  // Anchors resolve against the home page; on "/" the browser treats them as
  // same-page jumps, from "/pfi" they navigate home first.
  const anchor = (hash: string) => (currentPath === "" ? hash : `${home}${hash}`);
  const other: Locale = locale === "en" ? "fr" : "en";
  const switchHref = `${other === "en" ? "" : "/fr"}${currentPath}` || "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-normal ease-standard",
        condensed
          ? "border-b border-(--avan-border-hairline) bg-cream/85 text-ftext backdrop-blur-md"
          : "border-b border-transparent bg-transparent text-cream",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-gutter-sm md:h-20 md:px-gutter">
        <a href={home} aria-label="AVAN Group — home" className="shrink-0">
          <AvanLockup gemClassName="h-7 md:h-8" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {copy.links.map((link) => (
              <li key={link.hash}>
                <a
                  href={anchor(link.hash)}
                  className="avan-underline font-mono text-overline uppercase transition-colors duration-fast hover:text-bronze-500"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={switchHref}
            aria-label={copy.localeSwitch.aria}
            className="avan-underline font-mono text-overline uppercase text-(--avan-text-eyebrow) transition-colors duration-fast hover:text-bronze-500"
          >
            {copy.localeSwitch.code}
          </a>
          <Button href={anchor(copy.cta.hash)} variant="hairline">
            {copy.cta.label}
          </Button>
        </div>

        {/* Mobile wayfinding: all links, compact and horizontally scrollable. */}
        <ul className="scrollbar-none ml-8 flex items-center gap-6 overflow-x-auto md:hidden">
          {[...copy.links, copy.cta].map((link) => (
            <li key={link.hash + link.label} className="shrink-0">
              <a
                href={anchor(link.hash)}
                className="avan-underline flex min-h-[44px] items-center whitespace-nowrap font-mono text-overline uppercase transition-colors duration-fast hover:text-bronze-500"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <a
              href={switchHref}
              aria-label={copy.localeSwitch.aria}
              className="avan-underline flex min-h-[44px] items-center whitespace-nowrap font-mono text-overline uppercase text-(--avan-text-eyebrow) transition-colors duration-fast hover:text-bronze-500"
            >
              {copy.localeSwitch.code}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
