import { headers } from "next/headers";
import { Nav } from "@/components/composite/Nav";
import { Colophon } from "@/sections/Colophon";
import { GemMark } from "@/components/brand/GemMark";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { getCopy } from "@/content";
import { defaultLocale, isLocale, LOCALE_HEADER } from "@/lib/i18n/config";
import { homePath } from "@/lib/locale";

/** "This door doesn't open." — the house's 404, in the visitor's language. */
export default async function NotFound() {
  const raw = (await headers()).get(LOCALE_HEADER) ?? defaultLocale;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const c = getCopy(locale);

  return (
    <>
      <Nav copy={c.nav} locale={locale} currentPath="/" />
      <main id="main">
        <section
          aria-labelledby="not-found-h"
          data-surface="inverse"
          className="surface-depth flex min-h-svh flex-col justify-center bg-canvas py-section text-fg"
        >
          <Container className="flex flex-col items-start gap-8">
            <GemMark className="h-16 w-auto" aria-hidden="true" title="" />
            <Eyebrow>{c.notFound.eyebrow}</Eyebrow>
            <Heading id="not-found-h" as="h1" level="l">
              {c.notFound.head}
            </Heading>
            <Text size="lg" tone="soft">
              {c.notFound.body}
            </Text>
            <Button href={homePath(locale)} variant="hairline">
              {c.notFound.cta}
            </Button>
          </Container>
        </section>
      </main>
      <Colophon copy={c.colophon} locale={locale} />
    </>
  );
}
