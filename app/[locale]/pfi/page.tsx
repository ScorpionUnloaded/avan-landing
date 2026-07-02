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

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
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

export default function PfiPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
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
          className="avan-dark avan-depth flex min-h-[92svh] flex-col justify-center bg-ink-950 pb-section-y-sm pt-32 text-[color:var(--avan-text-primary)] md:pt-40"
        >
          <Container className="flex flex-col items-center gap-14 text-center">
            <PfiCrest motto={p.hero.motto} crestAlt={p.hero.crestAlt} />
            <Reveal delay={0.3} className="flex max-w-2xl flex-col items-center gap-6">
              <Eyebrow>{p.hero.eyebrow}</Eyebrow>
              <Heading id="pfi-h" as="h1" level="l" className="text-cream">
                {p.hero.head}
              </Heading>
              <Text size="lg" tone="soft" className="text-balance">
                {p.hero.lede}
              </Text>
            </Reveal>
          </Container>
        </section>

        {/* The Standard — three practices, ledger register. */}
        <Section id="standard" surface="cream" labelledBy="standard-h">
          <Reveal className="flex max-w-3xl flex-col gap-6">
            <Eyebrow>{p.standard.eyebrow}</Eyebrow>
            <Heading id="standard-h" level="l">
              {p.standard.head}
            </Heading>
            <Text size="lg" tone="soft">
              {p.standard.intro}
            </Text>
          </Reveal>

          <Stagger className="mt-20 border-t border-[color:var(--avan-border-hairline)]">
            {p.standard.rows.map((row, i) => (
              <StaggerItem key={row.title}>
                <article className="grid gap-x-8 gap-y-4 border-b border-[color:var(--avan-border-hairline)] py-10 md:grid-cols-12 md:items-baseline md:py-12">
                  <div className="flex items-baseline gap-6 md:col-span-4">
                    <span className="font-mono text-caption text-bronze-500">0{i + 1}</span>
                    <h3 className="font-serif text-display-m font-medium">{row.title}</h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="font-sans text-body-lg text-[color:var(--avan-text-primary)]">
                      {row.lede}
                    </p>
                    <p className="mt-2 max-w-prose68 font-sans text-body text-[color:var(--avan-text-secondary)]">
                      {row.body}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* PFI Intelligence — the systems layer. */}
        <Section id="intelligence" surface="cream-raised" labelledBy="intelligence-h">
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
        <Section id="governance" surface="cream" labelledBy="governance-h">
          <Reveal className="flex max-w-3xl flex-col gap-6">
            <Eyebrow>{p.governance.eyebrow}</Eyebrow>
            <Heading id="governance-h" level="l">
              {p.governance.head}
            </Heading>
          </Reveal>
          <Stagger className="mt-16 grid gap-10 md:grid-cols-3">
            {p.governance.items.map((item) => (
              <StaggerItem key={item.term}>
                <dl className="flex flex-col gap-3 border-t border-[color:var(--avan-border-hairline)] pt-6">
                  <dt className="font-serif text-display-m font-medium">{item.term}</dt>
                  <dd className="font-sans text-body text-[color:var(--avan-text-secondary)]">
                    {item.line}
                  </dd>
                </dl>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* The institutional ask. */}
        <Section id="pfi-cta" surface="navy" labelledBy="pfi-cta-h" containerClassName="text-center">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-8">
            <Heading id="pfi-cta-h" level="l" className="text-cream">
              {p.cta.head}
            </Heading>
            <Text tone="soft" className="text-balance">
              {p.cta.body}
            </Text>
            <Button href={institutionalCta} variant="hairline" className="text-cream">
              {p.cta.button}
            </Button>
          </Reveal>
        </Section>
      </main>
      <Colophon copy={c.colophon} locale={locale} />
    </>
  );
}
