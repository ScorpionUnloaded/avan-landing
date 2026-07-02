import { Nav } from "@/components/composite/Nav";
import { Colophon } from "@/sections/Colophon";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Divider } from "@/components/primitives/Divider";
import type { Copy } from "@/content";
import type { Locale } from "@/lib/locale";

type DocCopy = Copy["legal"]; // legal and privacy share this shape

/** Quiet single-column document page — the register of notices, not marketing. */
export function HouseDocument({
  copy,
  doc,
  locale,
  currentPath,
}: {
  copy: Copy;
  doc: DocCopy;
  locale: Locale;
  currentPath: string;
}) {
  return (
    <>
      <Nav copy={copy.nav} locale={locale} currentPath={currentPath} />
      <main id="main">
        <Section id="document" surface="cream" labelledBy="doc-h" className="pt-40 md:pt-48">
          <Reveal className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <Heading id="doc-h" as="h1" level="l">
              {doc.title}
            </Heading>
            <p className="font-mono text-overline uppercase text-[color:var(--avan-text-eyebrow)]">
              {doc.updated}
            </p>
            <Divider className="mt-4" />
            <dl className="mt-6 flex flex-col gap-12">
              {doc.sections.map((s) => (
                <div key={s.h} className="grid gap-3">
                  <dt className="font-serif text-display-m font-medium">{s.h}</dt>
                  <dd>
                    <Text tone="soft">{s.body}</Text>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Section>
      </main>
      <Colophon copy={copy.colophon} locale={locale} />
    </>
  );
}
