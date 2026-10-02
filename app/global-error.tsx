"use client";

import "./globals.css";
import { useParams } from "next/navigation";
import { errorCopy } from "@/content/errors";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { homePath } from "@/lib/locale";

/**
 * Last resort: the root layout itself failed, so this renders its own
 * document. Deliberately plain — no fonts, no motion — and still in the
 * house's palette and words.
 */
export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale && isLocale(params.locale) ? params.locale : defaultLocale;
  const c = errorCopy[locale];

  return (
    <html lang={locale}>
      <body className="bg-canvas text-fg" data-surface="inverse">
        <main className="mx-auto flex min-h-svh max-w-page flex-col justify-center gap-6 px-margin">
          <p className="text-overline uppercase text-eyebrow">{c.eyebrow}</p>
          <h1 className="font-serif text-display-l font-medium">{c.head}</h1>
          <p className="max-w-measure text-body-lg text-fg-muted">{c.body}</p>
          <p className="flex gap-6 text-overline uppercase">
            <button type="button" onClick={() => retry()} className="min-h-touch underline underline-offset-4">
              {c.retry}
            </button>
            <a href={homePath(locale)} className="flex min-h-touch items-center">
              {c.home}
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
