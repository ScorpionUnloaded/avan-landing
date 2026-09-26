import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/composite/Nav";
import { Colophon } from "@/sections/Colophon";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Button } from "@/components/primitives/Button";
import { PfiCrest } from "@/components/brand/PfiCrest";
import { getCopy } from "@/content";
import { isLocale, homePath, type Locale } from "@/lib/locale";

export async function generateMetadata({ params }: PageProps<"/[locale]/pfi">): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const c = getCopy(locale).pfi.meta;
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: locale === "en" ? "/pfi" : "/fr/pfi",
      languages: { en: "/pfi", fr: "/fr/pfi" },
    },
  };
}

export default async function PfiPage({ params }: PageProps<"/[locale]/pfi">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getCopy(locale);
  const p = c.pfi;
  const institutionalCta = `${homePath(locale)}?nature=Institutional#privé`;

  return (
    <>
      <Nav copy={c.nav} locale={locale} currentPath="/pfi" />
      <main id="main">
        {/* The ceremonial register: the crest presides; the argument follows. */}
        <section
          aria-labelledby="pfi-h"
          data-surface="inverse"
          className="surface-depth flex min-h-[92svh] flex-col justify-center bg-canvas pb-section pt-32 text-fg md:pt-40"
        >
          <Container className="flex flex-col items-center gap-14 text-center">
            <PfiCrest motto={p.hero.motto} crestAlt={p.hero.crestAlt} />
            <Reveal delay={0.3} className="flex max-w-2xl flex-col items-center gap-6">
              <Eyebrow>{p.hero.eyebrow}</Eyebrow>
              <Heading id="pfi-h" as="h1" level="l">
                {p.hero.head}
              </Heading>
              <Text size="lg" tone="soft" className="text-balance">
                {p.hero.lede}
              </Text>
            </Reveal>
          </Container>
        </section>

        {/* The Standard — three practices, ledger register. */}
        <Section id="standard" surface="canvas" labelledBy="standard-h">
          <Reveal className="flex max-w-3xl flex-col gap-6">
            <Eyebrow>{p.standard.eyebrow}</Eyebrow>
            <Heading id="standard-h" level="l">
              {p.standard.head}
            </Heading>
            <Text size="lg" tone="soft">
              {p.standard.intro}
            </Text>
          </Reveal>

          <Stagger className="mt-20 border-t border-hairline">
            {p.standard.rows.map((row, i) => (
              <StaggerItem key={row.title}>
                <article className="grid gap-x-8 gap-y-4 border-b border-hairline py-10 md:grid-cols-12 md:items-baseline md:py-12">
                  <div className="flex items-baseline gap-6 md:col-span-4">
                    <span className="font-mono text-caption text-eyebrow">0{i + 1}</span>
                    <h3 className="font-serif text-display-m font-medium">{row.title}</h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="font-sans text-body-lg text-fg">
                      {row.lede}
                    </p>
                    <p className="mt-2 max-w-measure font-sans text-body text-fg-muted">
                      {row.body}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* PFI Intelligence — the systems layer. */}
        <Section id="intelligence" surface="raised" labelledBy="intelligence-h">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="flex flex-col gap-6 lg:col-span-6">
              <Eyebrow>{p.intelligence.eyebrow}</Eyebrow>
              <Heading id="intelligence-h" level="m" as="h2">
                {p.intelligence.head}
              </Heading>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-2">
              <Text size="lg" tone="soft">
                {p.intelligence.body}
              </Text>
            </Reveal>
          </div>
        </Section>

        {/* Governance — the terms of reliance. */}
        <Section id="governance" surface="canvas" labelledBy="governance-h">
          <Reveal className="flex max-w-3xl flex-col gap-6">
            <Eyebrow>{p.governance.eyebrow}</Eyebrow>
            <Heading id="governance-h" level="l">
              {p.governance.head}
            </Heading>
          </Reveal>
          <Stagger className="mt-16 grid gap-10 md:grid-cols-3">
            {p.governance.items.map((item) => (
              <StaggerItem key={item.term}>
                <dl className="flex flex-col gap-3 border-t border-hairline pt-6">
                  <dt className="font-serif text-display-m font-medium">{item.term}</dt>
                  <dd className="font-sans text-body text-fg-muted">
                    {item.line}
                  </dd>
                </dl>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* The institutional ask. */}
        <Section id="pfi-cta" surface="inverse" labelledBy="pfi-cta-h" containerClassName="text-center">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-8">
            <Heading id="pfi-cta-h" level="l">
              {p.cta.head}
            </Heading>
            <Text tone="soft" className="text-balance">
              {p.cta.body}
            </Text>
            <Button href={institutionalCta} variant="hairline">
              {p.cta.button}
            </Button>
          </Reveal>
        </Section>
      </main>
      <Colophon copy={c.colophon} locale={locale} />
    </>
  );
}
