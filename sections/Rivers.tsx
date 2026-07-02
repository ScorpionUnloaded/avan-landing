import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { InViewTracker } from "@/components/motion/InViewTracker";
import type { Copy } from "@/content";

/**
 * The Four Rivers as an editorial ledger — numbered entries separated by
 * hairlines, the way a house records its holdings. Deliberately not cards.
 */
export function Rivers({ copy }: { copy: Copy["rivers"] }) {
  return (
    <Section id="rivers" surface="cream" labelledBy="rivers-h">
      <Reveal className="flex max-w-3xl flex-col gap-6">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <Heading id="rivers-h" level="l">
          {copy.head}
        </Heading>
        <Text size="lg" tone="soft">
          {copy.intro}
        </Text>
      </Reveal>

      <Stagger className="mt-20 border-t border-[color:var(--avan-border-hairline)]">
        {copy.cards.map((card, i) => (
          <StaggerItem key={card.title}>
            <article className="group grid gap-x-8 gap-y-4 border-b border-[color:var(--avan-border-hairline)] py-10 transition-colors duration-slow hover:bg-cream-raised/70 md:grid-cols-12 md:items-baseline md:py-12">
              <div className="flex items-baseline gap-6 md:col-span-4">
                <span className="font-mono text-caption text-bronze-500 transition-colors duration-normal group-hover:text-bronze-600">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-display-m font-medium transition-colors duration-normal group-hover:text-bronze-700">
                  {card.title}
                </h3>
              </div>
              <div className="md:col-span-5">
                <p className="font-sans text-body-lg text-[color:var(--avan-text-primary)]">
                  {card.lede}
                </p>
                <p className="mt-2 font-sans text-body text-[color:var(--avan-text-secondary)]">
                  {card.body}
                </p>
              </div>
              <p className="font-mono text-overline uppercase text-[color:var(--avan-text-eyebrow)] md:col-span-3 md:text-right">
                {card.house}
              </p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <InViewTracker event="rivers_view" />
    </Section>
  );
}
