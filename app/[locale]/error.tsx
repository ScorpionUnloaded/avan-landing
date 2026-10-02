"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { errorCopy } from "@/content/errors";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { homePath } from "@/lib/locale";
import { GemMark } from "@/components/brand/GemMark";
import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";

/**
 * A page failed to render. The house answers calmly, offers one retry and the
 * way home. The digest ties the visit to the server log without exposing
 * the error itself.
 */
export default function PageError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const params = useParams<{ locale?: string }>();
  const locale = params.locale && isLocale(params.locale) ? params.locale : defaultLocale;
  const c = errorCopy[locale];

  useEffect(() => {
    console.error("[avan] page error", error.digest ?? "");
  }, [error]);

  return (
    <main id="main">
      <section
        aria-labelledby="error-h"
        data-surface="inverse"
        className="surface-depth flex min-h-svh flex-col justify-center bg-canvas py-section text-fg"
      >
        <Container className="flex flex-col items-start gap-8">
          <GemMark className="h-16 w-auto" aria-hidden="true" title="" />
          <p className="font-sans text-overline uppercase text-eyebrow">{c.eyebrow}</p>
          <h1 id="error-h" className="font-serif text-display-l font-medium">
            {c.head}
          </h1>
          <p className="max-w-measure font-sans text-body-lg text-fg-muted">{c.body}</p>
          <div className="flex flex-wrap gap-4">
            <Button type="button" variant="hairline" onClick={() => retry()}>
              {c.retry}
            </Button>
            <Button href={homePath(locale)} variant="ghost">
              {c.home}
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
